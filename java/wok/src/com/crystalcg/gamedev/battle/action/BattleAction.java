package com.crystalcg.gamedev.battle.action;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.battle.service.BattleService;
import com.crystalcg.gamedev.battle.service.BattleSuburbService;
import com.crystalcg.gamedev.buildingFunction.domain.UserSoldier;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.tech.domain.UserFormationTech;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.EnemyNPCCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;

@Controller
public class BattleAction {
	
	private BattleService battleService;
	private BattleSuburbService battleSuburbService;
	private WallDefensenService wallDefensenService;
	@RequestMapping(value="getMonsterInfo")
	public @ResponseBody Map<String, Object> getMonsterInfo(HttpSession session, int forceLevel, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.getMonsterInfo(forceLevel, page,character.getId());
	}
	@RequestMapping(value = "getSpecificMonster")
	public @ResponseBody Map<String, Object> getSpecificMonster(String enemyNo) throws AppException{
		StaticEnemyNPC staticEnemyNPC = EnemyNPCCache.getEnemyEntity(enemyNo);
		if(staticEnemyNPC==null){
			throw new AppException("目标野怪信息不存在");
		}
		return changeEnemyToMap(staticEnemyNPC);
	}
	@RequestMapping(value="getEnemyInfo")
	public @ResponseBody Map<String, Object> getEnemyInfo(HttpSession session, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.getEnemyInfo(character.getId(), page);
	}
//	@RequestMapping(value="getBattleReward")
//	public @ResponseBody Map<String, Object> getBattleReward(HttpSession session, String enemyNo) throws AppException{
//		return battleService.getBattleReward(enemyNo);
//	}
	
	@RequestMapping(value="getUserHeroForBattle")
	public @ResponseBody Map<String, Object> getUserHeroForBattle(HttpSession session, int page) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.getUserHeroForBattle(character.getId(), page);
	}
	@RequestMapping(value="getUserHeroInfoAfterSelect")
	public @ResponseBody Map<String, Object> getUserHeroInfoAfterSelect(HttpSession session, int[] ids, int battleType) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.getUserHeroInfoAfterSelect(ids, character.getId(),battleType);
	}
	@RequestMapping(value="cureSelectUserHero")
	public @ResponseBody List<Map<String, Object>> cureSelectUserHero(HttpSession session, int[] ids) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return filterCureHero(battleService.cureSelectUserHero(character.getId(), ids));
	}
	//获取阵法
	@RequestMapping(value="getUserFormations")
	public @ResponseBody Object getUserFormations(HttpSession session){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		List<UserFormationTech> userFormationTechs = battleService.getUserFormations(character.getId());
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> nullMap = new HashMap<String,Object>();
		nullMap.put("techNo", "");
		nullMap.put("name", "无");
		retList.add(nullMap);
		for(UserFormationTech i : userFormationTechs){
			
				retList.add(changeFormationToMap(i));	
		}
		return retList;
	}
	@RequestMapping(value="getHeroSoldierInfo")
	public @ResponseBody Map<String, Object> getHeroSoldierInfo(HttpSession session) throws AppException{
		Map<String, Object> retMap = new HashMap<String, Object>();
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		List<Map<String, Object>> userSoldierList = new ArrayList<Map<String,Object>>();
		List<UserSoldier> userSoldiers = battleService.getUserSoldierInfo(character.getId());
//		List<Map<String, Object>> soldierList = new ArrayList<Object>();
//		Map<String, Object> nullMap = new HashMap<String,Object>();
//		nullMap.put("soldierName", "无");
//		nullMap.put("soldierNo", "");
//		soldierList.add(nullMap);
		for(UserSoldier i:userSoldiers){
			userSoldierList.add(changeSoldierToMap(i));
//			soldierList.add(changeSoldierToListMap(i));
		}
		retMap.put("userHeros", battleService.getUserHeroForConfig(character.getId()));
		retMap.put("userSoldiers", userSoldierList);
//		retMap.put("soldierList", soldierList);
		return retMap;
	}
	//配兵
	@RequestMapping(value="configSoldier")
	public @ResponseBody boolean configSoldier(HttpSession session, int[] userHeroIds, String[] soldierNos, int[] amounts) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		if(battleService.configSoldier(character.getId(), userHeroIds, soldierNos, amounts)){
			return true;
		}else{
			return false;
		}
	}
	@RequestMapping(value="putOffAllSoldier")
	public @ResponseBody Map<String, Object> putOffAllSoldier(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		battleService.putOffAllSoldier(character.getId());
		return getHeroSoldierInfo(session);
	}
	@RequestMapping(value="putOnAllSoldier")
	public @ResponseBody Map<String, Object> putOnAllSoldier(HttpSession session, int[] userHeroIds, String[] soldierNos) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		battleService.putOnAllSoldier(character.getId(), userHeroIds, soldierNos);
		return getHeroSoldierInfo(session);
	}
	
	
	
	private Map<String, Object> changeFormationToMap(UserFormationTech i){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("techNo", i.getFormation().getFormationNo());
		retMap.put("name", i.getFormation().getName());
		retMap.put("level", i.getFormationTech().getTechLevel());
		retMap.put("effectDescription", i.getFormation().getEffectDescription());
		retMap.put("formationIcon", i.getFormation().getFormationIcon());
		return retMap;
	}
	/**
	 * 转成前台用户兵种信息列表
	 * @param i
	 * @return
	 */
	private Map<String, Object> changeSoldierToMap(UserSoldier i){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("soldierNo", i.getSoldierNo());
		retMap.put("soldierName", i.getSoldierName());
		retMap.put("soldierAmount", i.getSoldierAmount());
		return retMap;
	}
	
	@RequestMapping(value="getReadyToBattle")
	public @ResponseBody boolean getReadyToBattle(HttpSession session, int battleType, String userHeroIdString,
			int targetType, String targetId, String formationNo) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		battleService.getReadyToBattle(character, battleType, userHeroIdString, targetType, targetId, formationNo);
		return true;
	}
	@RequestMapping(value="getNeedBattleTime")
	public @ResponseBody Object getNeedBattleTime(HttpSession session, int targetId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		UserCharacter target = characterService.getCharacterById(targetId);
		return battleService.countTime(character, target);
	}
	
	@RequestMapping(value="selectBattleQueueDefault")
	public @ResponseBody Map<String, Object> selectBattleQueueDefault(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.selectBattleQueue(character.getId(), Const.BATTLE_SEARCH_DEFAULT_PAGE, Const.BATTLE_SEARCH_TYPE_DEFAULT);
	}
	@RequestMapping(value="selectBattleQueue")
	public @ResponseBody Map<String, Object> selectBattleQueue(HttpSession session, int page, int searchType) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.selectBattleQueue(character.getId(), page, searchType);
	}
	@RequestMapping(value="callBackBattleQueue")
	public @ResponseBody Map<String, Object> callBackBattleQueue(HttpSession session, int battleJobQueueId, int page, int searchType) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.callBackBattleQueue(battleJobQueueId, character.getId(), page, searchType);
	}
	/**
	 * 撤退军队
	 * @param session
	 * @param battleJobQueueId
	 * @param page
	 * @param searchType
	 * @return
	 * @throws AppException
	 */
	@RequestMapping(value="retreatBattleQueue")
	public @ResponseBody Map<String, Object> retreatBattleQueue(HttpSession session, int battleQueueId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.retreatBattleQueue(battleQueueId, character.getId(),false);
	}
	/**
	 * 
	 * @param session
	 * @param battleJobQueueId
	 * @param page
	 * @param searchType
	 * @param speedType 加速类型物品道具还是金币
	 * @param itemNo 使用加速物品道具编号
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException
	 */
	
	@RequestMapping(value="speedUpBattleQueue")
	public @ResponseBody Map<String, Object> speedUpBattleQueue(HttpSession session, int battleJobQueueId, int page, int searchType,int speedType,String itemNo,int confim) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.saveSpeedBattleQueue(battleJobQueueId, character.getId(), page, searchType,speedType,itemNo,confim);
	}
	
	/**
	 * 采集按钮
	 */
	@RequestMapping(value = "/isCollection")
	@ResponseBody
	public Object isCollection(HttpSession session,int x,int y){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		try {
			return battleService.isCollection(character.getId(), x, y);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		} catch (SQLException e) {
			e.printStackTrace();
		}
	   return null;
		}
	/**
	 * 判断采集武将是否合法
	 * @param userHero
	 * @return
	 */
	@RequestMapping(value = "/verificationHero")
	@ResponseBody
	public Object verificationHero(HttpSession session,int heroId){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		try {
			return battleService.verificationHero(character.getId(),heroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	/**
	 * 确认采集
	 * @param session
	 * @param heroId
	 * @param resourceNo
	 * @param x
	 * @param y
	 * @return 
	 */
	@RequestMapping(value = "/collection")
	@ResponseBody
	public Object collection(HttpSession session,String heroId,int x,int y){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		try {
			return battleService.collection(character.getId(), heroId,x, y);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 返回初始化某个城主郊区军情情况
	 * @param session
	 * @param targetId 目标城主id
	 * @return
	 * @throws AppException
	 */
	@RequestMapping(value="initSuburbBattle")
	public @ResponseBody Map<String, Object> initSuburbBattle(HttpSession session, int targetId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleSuburbService.initSuburbBattleInfo(targetId, character.getId());
	}
	
	/**
	 * 根据军队编号查询军队相关武将信息
	 * @param session
	 * @param battleId 目标城主id
	 * @return
	 * @throws AppException
	 */
	
	@RequestMapping(value="getBattleHeros")
	public @ResponseBody Object getBattleHeros(HttpSession session, int battleQueueId,int confim) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.getbattleUserHero(character.getId(),battleQueueId,confim);
	}
	/**
	 * 根据被围攻城主ID获得城郊外等待队列军队简介
	 * @param session
	 * @param targetId
	 * @return
	 * @throws AppException
	 */
	@RequestMapping(value="getWaitBattleInfo")
	public @ResponseBody Object getWaitBattleInfo(HttpSession session, int targetId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return battleService.getWaitBattleInfo(character.getId(),targetId);
	}
	
	
	
	private final List<Map<String, Object>> filterCureHero(List<UserHero> userHeros){
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp;
		for(UserHero i:userHeros){
			temp = new HashMap<String,Object>();
			temp.put("stamina", (int)i.getStamina());
			temp.put("staminaMax", (int)i.getStaminaMax());
			temp.put("mp", (int)i.getMp());
			temp.put("mpMax", (int)i.getMpMax());
		}
		return retList;
	}
	private static Map<String, Object> changeEnemyToMap(StaticEnemyNPC staticEnemyNPC){
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("level", staticEnemyNPC.getHeroLevel());
		retMap.put("force", staticEnemyNPC.getHeroForce());
		retMap.put("agility", staticEnemyNPC.getHeroAgility());
		retMap.put("strategy", staticEnemyNPC.getHeroStrategy());
		retMap.put("physique", staticEnemyNPC.getHeroPhysique());
		retMap.put("heroIcon", staticEnemyNPC.getSmallHeroIcon());
		DecimalFormat decimalFormat = new DecimalFormat("0.0");
		retMap.put("singleForce", decimalFormat.format(staticEnemyNPC.getMultiForce()));
		return retMap;
	}
	
	
	public BattleService getBattleService() {
		return battleService;
	}

	public void setBattleService(BattleService battleService) {
		this.battleService = battleService;
	}
	public BattleSuburbService getBattleSuburbService() {
		return battleSuburbService;
	}
	public void setBattleSuburbService(BattleSuburbService battleSuburbService) {
		this.battleSuburbService = battleSuburbService;
	}

	public WallDefensenService getWallDefensenService() {
		return wallDefensenService;
	}
	public void setWallDefensenService(WallDefensenService wallDefensenService) {
		this.wallDefensenService = wallDefensenService;
	}
	
}
