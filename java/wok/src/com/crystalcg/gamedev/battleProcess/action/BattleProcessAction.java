package com.crystalcg.gamedev.battleProcess.action;

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
import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battle.service.BattleService;
import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.battleProcess.BattleProcessForMulti;
import com.crystalcg.gamedev.battleProcess.domain.BuffObject;
import com.crystalcg.gamedev.battleProcess.domain.HeroForBattle;
import com.crystalcg.gamedev.battleProcess.domain.MultiBattle;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattle;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattleObject;
import com.crystalcg.gamedev.battleProcess.domain.SkillOjbect;
import com.crystalcg.gamedev.battleProcess.domain.SoldierForBattle;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.CountryCache;

@Controller
public class BattleProcessAction {
	private static final int MINE_LOCATION=0;//自己位置标识
	private static final int TARGET_LOCATION=1;//对方位置标识
	
	private BattleProcess battleProcess;
	private BattleProcessForMulti battleProcessForMulti;
	
	@RequestMapping(value="enterBattle")
	public @ResponseBody Map<String, Object> enterBattle(HttpSession session, int battleJobQueueId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		battleProcess.initializeSingleBattle(battleJobQueueId, character.getId());
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("resource", battleProcess.getBattleResourceForSingle(battleJobQueueId));
		SingleBattle singleBattle = BattleProcess.BATTLE_DATA.get(battleJobQueueId).getSingleBattle();
		int largeRoundNum = singleBattle.getLargeRoundAmount();
		retMap.put("mine", changeToMapForEnter(singleBattle.getAuthorityMap().get(character.getId()),largeRoundNum,MINE_LOCATION));
		retMap.put("target", changeToMapForEnter(singleBattle.getTargetHero(character.getId()),largeRoundNum,TARGET_LOCATION));
		return retMap;
	}
	
	
	@RequestMapping(value="enterMultiBattle")
	public @ResponseBody Map<String, Object> enterMultiBattle(HttpSession session, int battleJobQueueId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		BattleJobQueue battleJobQueue = battleService.selectBattleQueueById(battleJobQueueId);
		String battleId = null;
		if(battleJobQueue.getTargetType()==Const.TARGET_TYPE_MONSTER){
			battleId = String.valueOf(battleJobQueueId);
			battleProcessForMulti.initMultiBattle(battleJobQueue, character.getId());
		}else if(battleJobQueue.getTargetType()==Const.TARGET_TYPE_CHAR){
			//初始化玩家战场
			battleId = BattleProcess.getBattleFieldByBattleId(battleJobQueueId);
		}else{
			throw new AppException("军情目标类型错误，与所进战场不符");
		}
		return changeMultiBattle(BattleProcess.BATTLE_DATA.get(battleId).getMultiBattle(), character.getId());
		
//		SingleBattle singleBattle = BattleProcess.BATTLE_DATA.get(battleJobQueueId).getSingleBattle();
//		int largeRoundNum = singleBattle.getLargeRoundAmount();
//		retMap.put("mine", changeToMapForEnter(singleBattle.getAuthorityMap().get(character.getId()),largeRoundNum));
//		retMap.put("target", changeToMapForEnter(singleBattle.getTargetHero(character.getId()),largeRoundNum));
	}
	@RequestMapping(value="beginMultiBattle")
	public @ResponseBody boolean beginMultiBattle(HttpSession session, int battleJobQueueId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		BattleJobQueue battleJobQueue = battleService.selectBattleQueueById(battleJobQueueId);
//		battleProcessForMulti.initMultiBattle(battleJobQueueId, character.getId());
		String battleId = null;
		if(battleJobQueue.getTargetType()==Const.TARGET_TYPE_MONSTER){
			battleId = String.valueOf(battleJobQueueId);
		}else if(battleJobQueue.getTargetType()==Const.TARGET_TYPE_CHAR){
			//初始化玩家战场
			battleId = BattleProcess.getBattleFieldByBattleId(battleJobQueueId);
		}else{
			throw new AppException("军情目标类型错误，与所进战场不符");
		}
		battleProcessForMulti.beginMultiBattle(battleId, character.getId());
		
		return true;
	}
	@RequestMapping(value="removeBattle")
	public @ResponseBody Map<String, Object> removeBattle(HttpSession session, String battleJobQueueId) throws AppException{
//		UserCharacter character = (UserCharacter)session.getAttribute("character");
		BattleProcess.BATTLE_DATA.remove(battleJobQueueId);
//		SingleBattle singleBattle = BattleProcess.BATTLE_DATA.get(battleJobQueueId).getSingleBattle();
//		int largeRoundNum = singleBattle.getLargeRoundAmount();
//		retMap.put("mine", changeToMapForEnter(singleBattle.getAuthorityMap().get(character.getId()),largeRoundNum));
//		retMap.put("target", changeToMapForEnter(singleBattle.getTargetHero(character.getId()),largeRoundNum));
		return null;
	}
	@RequestMapping(value="beginSingleBattle")
	public @ResponseBody boolean beginSingleBattle(HttpSession session, int battleJobQueueId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		battleProcess.beginSingleBattle(battleJobQueueId, character.getId());
		return true;
	}
	/**
	 * 征战/派遣军队开始战斗
	 * @param session
	 * @param battleQueueId 行军队伍编号1（负值代表目标为收方君主-Id）
	 * @param battleQueueId2 行军队伍编号2（负值代表目标为收方君主-Id）
	 * @return
	 * @throws AppException
	 */
	@RequestMapping(value="beginBattleAttack")
	public @ResponseBody Map<String, Object> beginBattleAttack(HttpSession session, int battleQueueId,int battleQueueId2) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return changeMultiBattle(battleProcess.beginBattleAttack(character.getId(),battleQueueId,battleQueueId2),character.getId());
	}
	
	
	
	@RequestMapping(value="normalAttackForMultiBattle")
	public @ResponseBody Object normalAttackForMultiBattle(HttpSession session, String battleJobQueueId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		if(BattleProcess.BATTLE_DATA.get(battleJobQueueId)==null){
			throw new AppException("战斗不存在或已结束");
		}
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleJobQueueId).getMultiBattle();
		if(multiBattle==null){
			throw new AppException("释放场景不正确");
		}
		if (!battleProcessForMulti.canAttackForMultiBattle(multiBattle, character.getId())) {
			throw new AppException("还没有到您的操作回合");
		}
		return changeTarget(battleProcessForMulti.getTargetForCanAttack(multiBattle));
	}
	@RequestMapping(value="attackTargetForMultiBattle")
	public @ResponseBody Object attackTargetForMultiBattle(HttpSession session, String battleJobQueueId, int locationId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		if(BattleProcess.BATTLE_DATA.get(battleJobQueueId)==null){
			throw new AppException("战斗不存在或已结束");
		}
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleJobQueueId).getMultiBattle();
		if(multiBattle==null){
			throw new AppException("释放场景不正确");
		}
		return battleProcessForMulti.commonAttackOperateForMulti(multiBattle, (int)locationId, character.getId());
	}
	@RequestMapping(value="autoAttackForMultiBattle")
	public @ResponseBody Object autoAttackForMultiBattle(HttpSession session, String battleJobQueueId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		if(BattleProcess.BATTLE_DATA.get(battleJobQueueId)==null){
			throw new AppException("战斗不存在或已结束");
		}
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleJobQueueId).getMultiBattle();
		if(multiBattle==null){
			throw new AppException("释放场景不正确");
		}
		return battleProcessForMulti.autoAttackForMultiBattle(multiBattle, character.getId());
	}
	@RequestMapping(value="skillForMultiBattle")
	public @ResponseBody Object skillForMultiBattle(HttpSession session, String battleJobQueueId,int skillIndex) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		if(BattleProcess.BATTLE_DATA.get(battleJobQueueId)==null){
			throw new AppException("战斗不存在或已结束");
		}
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleJobQueueId).getMultiBattle();
		if(multiBattle==null){
			throw new AppException("释放场景不正确");
		}
		if (!battleProcessForMulti.canAttackForMultiBattle(multiBattle, character.getId())) {
			throw new AppException("还没有到您的操作回合");
		}
		if (!battleProcessForMulti.validateSkill((int)skillIndex, multiBattle)) {
			throw new AppException("技能使用非法，使用失败");
		}
		return changeTarget(battleProcessForMulti.getTargetForSkill(multiBattle, (int)skillIndex));
	}
	@RequestMapping(value="skillAttackForMultiBattle")
	public @ResponseBody Object skillAttackForMultiBattle(HttpSession session, String battleJobQueueId,int skillIndex, int locationId) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		if(BattleProcess.BATTLE_DATA.get(battleJobQueueId)==null){
			throw new AppException("战斗不存在或已结束");
		}
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleJobQueueId).getMultiBattle();
		if(multiBattle==null){
			throw new AppException("释放场景不正确");
		}
		return battleProcessForMulti.skillAttack(locationId, (int)skillIndex, multiBattle, character.getId());
	}

	private final List<Integer> changeTarget(List<SoldierForBattle> soldierForBattles){
		List<Integer> retList = new ArrayList<Integer>();
		for(SoldierForBattle i:soldierForBattles){
			retList.add(i.getLocationId());
		}
		return retList;
	}
	
	private final Map<String, Object> changeMultiBattle(MultiBattle multiBattle, int characterId){
		Map<String, Object> retMap = new HashMap<String,Object>();
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		UserCharacter mine = characterService.getCharacterById(characterId);
		retMap.put("battleId", multiBattle.getBattleId());
		retMap.put("roundNum", multiBattle.getLargeRoundAmount()==0?1:multiBattle.getLargeRoundAmount());
		retMap.put("order", battleProcessForMulti.changeToOrderList(multiBattle.getOrder()));
		retMap.put("mineIcon", mine.getImage());
		retMap.put("mineLevel", mine.getLevel());
		retMap.put("mineCountry", CountryCache.getNameById(mine.getCountryId()));
		int targetId = multiBattle.getMultiBattleObjectByCharId(characterId).getCharacterId();
		if(targetId!=0){
			UserCharacter target = characterService.getCharacterById(targetId);
			retMap.put("targetIcon", target.getImage());
			retMap.put("targetLevel", target.getLevel());
			retMap.put("targetCountry", CountryCache.getNameById(target.getCountryId()));
		}
		retMap.put("mine", changeSoldier(multiBattle.getMySoldiers(characterId),true));
		retMap.put("target", changeSoldier(multiBattle.getOtherSoldierS(characterId),false));
		return retMap;
	}
	private final List<Map<String, Object>> changeSoldier(List<SoldierForBattle> soldiers, boolean isMine){
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp ;
		List<Map<String, Object>> skillList ;
		for(SoldierForBattle i:soldiers){
			skillList = new ArrayList<Map<String,Object>>();
			if(i.isDead()){
				continue;
			}
			temp = new HashMap<String,Object>();
			temp.put("heroName", i.getHeroName());
			temp.put("heroIcon", i.getHeroIcon());
			temp.put("smallHeroIcon", i.getSmallHeroIcon());
			temp.put("soldierName", i.getSoldierName());
			temp.put("soldierType", i.getSoldierType());
			temp.put("heroLevel", i.getHeroLevel());
			temp.put("soldierAmount", i.getSoldierAmout());
			temp.put("soldierAmountMax", i.getSoldierAmoutMax());
			temp.put("mp", i.getMp());
			temp.put("mpMax", i.getMpMax());
			int attack = (int)i.getAttack();
			temp.put("attack", attack<0?0:attack);
			int defence = (int)i.getDefence();
			temp.put("defence", defence<0?0:defence);
			DecimalFormat decimalFormat = new DecimalFormat("0.00%");
			temp.put("criticalStrike", decimalFormat.format(i.getCriticalStrike()<0?0:i.getCriticalStrike()));
			temp.put("hit", decimalFormat.format(i.getHit()<0?0:i.getHit()));
			temp.put("dodge", decimalFormat.format(i.getDodge()<0?0:i.getDodge()));
			temp.put("locationId", i.getLocationId());
			temp.put("locationX", i.getLocationX());
			temp.put("locationY", i.getLocationY());
			temp.put("mobility", i.getMobility()<0?0:i.getMobility());
			temp.put("orderNum", i.getOrderNum());
			temp.put("flag", i.getFlag());
			temp.put("buff", i.getBuffs());
			temp.put("debuff", i.getDeBuffs());
			temp.put("defenceStatus", i.isDefenceStatus());
			if(isMine){
				Map<String, Object> skillTemp;
				for (SkillOjbect j : i.getSoldierSkills()) {
					skillTemp = new HashMap<String,Object>();
					skillTemp.put("skillName", j.getStaticHeroSkill().getName());
					skillTemp.put("skillIcon", j.getStaticHeroSkill().getIcon());
					skillTemp.put("name", j.getStaticHeroSkill().getName());
					skillTemp.put("level", j.getStaticHeroSkill().getLevel());
					skillTemp.put("needVnp", j.getStaticHeroSkill().getNeedVnp());
					skillTemp.put("coolDown", j.getStaticHeroSkill().getCoolDown());
					skillTemp.put("description", j.getStaticHeroSkill().getDescription());
					skillList.add(skillTemp);
				}
				temp.put("skills", skillList);
			}
			retList.add(temp);
		}
		return retList;
	}
	private static Map<String, Object> changeToMapForEnter(SingleBattleObject singleBattleObject, int largeRoundNum, int location){
		HeroForBattle heroForBattle = singleBattleObject.getHeroForBattle();
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("heroIcon", heroForBattle.getHeroIcon());
		retMap.put("smallHeroIcon", heroForBattle.getSmallHeroIcon());
		retMap.put("heroName", heroForBattle.getHeroName());
		retMap.put("level", heroForBattle.getLevel());
//		retMap.put("heroActionForWait", heroForBattle.getHeroActionForWait());
		retMap.put("heroForce", (int)(heroForBattle.getHeroForce()*heroForBattle.getHeroForceEffect()));
		retMap.put("physique", (int)(heroForBattle.getPhysique()*heroForBattle.getPhysiqueEffect()));
		retMap.put("strategy", (int)(heroForBattle.getStrategy()*heroForBattle.getStrategyEffect()));
		retMap.put("agility", (int)(heroForBattle.getAgility()*heroForBattle.getAgilityEffect()));
		retMap.put("hp", heroForBattle.getHp());
		retMap.put("hpMax", heroForBattle.getHpMax());
		retMap.put("mp", heroForBattle.getMp());
		retMap.put("mpMax", heroForBattle.getMpMax());
		retMap.put("mobility", (int)heroForBattle.getMobility());
		retMap.put("location", (int)heroForBattle.getLocationId());
		retMap.put("buffList", changeBuffToMap(singleBattleObject.getHeroForBattle().getBuff(), largeRoundNum));//
		retMap.put("deBuffList", changeBuffToMap(singleBattleObject.getHeroForBattle().getDeBuff(), largeRoundNum));//
		retMap.put("waitAction", heroForBattle.getHeroActionForWait()+"_"+location);//
		retMap.put("attackAction", heroForBattle.getHeroActionWeapon()+BattleProcess.BATTLE_ACTION_ATTACK_STRING+"_"+location);//
		retMap.put("hurtAction", heroForBattle.getHeroActionWeapon()+BattleProcess.BATTLE_ACTION_ATTACK_STRING+"_"+location);//
		retMap.put("skillAction", heroForBattle.getHeroActionWeapon()+BattleProcess.BATTLE_ACTION_SKILL_STRING+"_"+location);//
		retMap.put("loseAction", heroForBattle.getHeroActionWeapon()+BattleProcess.BATTLE_ACTION_LOSE_STRING+"_"+location);//
		return retMap;
	}
	public static List<Map<String, Object>> changeBuffToMap(List<BuffObject> buffs, int largeRoundNum){
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp;
		for( BuffObject i :buffs){
			temp = new HashMap<String,Object>();
			temp.put("description", i.getStaticHeroSkillLastEffect().getDescription());
			temp.put("buffIcon", i.getStaticHeroSkillLastEffect().getIcon());
			temp.put("buffAnomin", i.getStaticHeroSkillLastEffect().getAnimationSingle());
			temp.put("remainRound", i.getRemainRound(largeRoundNum));
			retList.add(temp);
		}
		return retList;
	}
	public BattleProcess getBattleProcess() {
		return battleProcess;
	}

	public void setBattleProcess(BattleProcess battleProcess) {
		this.battleProcess = battleProcess;
	}
	public BattleProcessForMulti getBattleProcessForMulti() {
		return battleProcessForMulti;
	}
	public void setBattleProcessForMulti(BattleProcessForMulti battleProcessForMulti) {
		this.battleProcessForMulti = battleProcessForMulti;
	}
}
