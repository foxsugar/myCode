package com.crystalcg.gamedev.battle.service;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteBattleJob;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.battle.Job.ReadyToBattleJob;
import com.crystalcg.gamedev.battle.dao.BattleDao;
import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.buildingFunction.domain.UserSoldier;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallHero;
import com.crystalcg.gamedev.buildingFunction.service.BarracksService;
import com.crystalcg.gamedev.buildingFunction.service.HospitalService;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.friend.domain.FriendInfo;
import com.crystalcg.gamedev.friend.service.FriendService;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.tech.domain.UserFormationTech;
import com.crystalcg.gamedev.tech.service.FormationTechService;
import com.crystalcg.gamedev.user.dao.CharacterDao;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ChangeHeroToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.TimeUtil;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.EnemyNPCCache;
import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticFormation;
import com.crystalcg.gamedev.util.cache.domain.StaticWorldResource;
import com.crystalcg.gamedev.world.DataEntity;
import com.crystalcg.gamedev.world.DataPack;
import com.crystalcg.gamedev.world.WorldDao;
import com.crystalcg.gamedev.world.WorldService;

/**
 * 练兵场相关，出征，配兵等
 * @author jinganyang
 *
 */
public class BattleService {
	private BattleDao battleDao;
	private CharacterService characterService;
	private CharacterDao characterDao;//测试用
	
	private static final int ENEMY_PAGE_SIZE = 6;//每页信息数
	private static final int SELECT_HERO_PAGE_SIZE = 11;//选择武将页面每页显示信息数量
	public static final String BATTLE_JOB_STRING = "battle_job_";//出征Job前缀
	public static final int ATTACK_AMOUNT = 5;//进攻最大数
	public static final int DEFENCE_AMOUNT = 4;//防守最大数
//	private static final int HERO_SOLDIER_CONFIG_FOR_BATTLE_PAGESIZE = 11;//出征界面武将配配兵页面，每页显示的武将数量
	static{
		updateBattleQueue();
	}
	
	
	/**
	 * 获取野外势力信息
	 * @param forceLevel
	 * @param page
	 * @return
	 */
	public Map<String, Object> getMonsterInfo(int forceLevel, int page,int characterId){
		List<StaticEnemyNPC> monsterList = EnemyNPCCache.getEnemyListByForceLevel(forceLevel);
		if(page<1){
			page = 1;
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		int amount = monsterList.size();
		int pages = (amount - 1 + ENEMY_PAGE_SIZE)/ENEMY_PAGE_SIZE;
		if(page>pages){
			page = pages;
		}
		if(amount==0){
			retMap.put("page", page);
			retMap.put("pages", pages);
			retMap.put("monster",null);
			return retMap;
		}
		retMap.put("page", page);
		retMap.put("pages", pages);
		if(page<pages){
			retMap.put("monster", changeToMap(characterId,monsterList.subList((page-1)*ENEMY_PAGE_SIZE, page*ENEMY_PAGE_SIZE)));
		}else{
			retMap.put("monster", changeToMap(characterId,monsterList.subList((page-1)*ENEMY_PAGE_SIZE, amount)));
		}
		return retMap;
	}
	private final List<Map<String, Object>> changeToMap(int characterId,List<StaticEnemyNPC> staticEnemyNPCs){
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		Map<String, Object> temp;
		double pre = this.getReducePreTimePre(characterId);
		for(StaticEnemyNPC i:staticEnemyNPCs){
			temp = new HashMap<String,Object>();
			temp.put("enemyNo", i.getEnemyNo());
			temp.put("enemyName", i.getEnemyName());
			temp.put("heroLevel", i.getHeroLevel());
			DecimalFormat decimalFormat = new DecimalFormat("0.0");
			temp.put("multiForceNum", decimalFormat.format(i.getMultiForce()));
			temp.put("singleForceNum", decimalFormat.format(i.getSingleForce()));
			temp.put("needTime", i.getNeedTime()*(1-pre));
			retList.add(temp);
		}
		return retList;
	}
	/**
	 * 获取敌对势力信息
	 * @param characterId
	 * @param page
	 * @return
	 */
	public Map<String, Object> getEnemyInfo(int characterId, int page){
		FriendService friendService = (FriendService)ServiceLocator.getSpringBean("friendService");
		if(page<1){
			page = 1;
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		int amount = friendService.getFriendAmount(characterId, FriendService.FRIEND_TYPE_ENEMY);
		int pages = (amount - 1 + ENEMY_PAGE_SIZE)/ENEMY_PAGE_SIZE;
		if(page>pages){
			page = pages;
		}
		List<FriendInfo> userFriends = friendService.getUserFriends(characterId,FriendService.FRIEND_TYPE_ENEMY,page,ENEMY_PAGE_SIZE);
		retMap.put("page", page);
		retMap.put("pages", pages);
		retMap.put("enemies", changToMap(characterId,userFriends));
		return retMap;
	}
//	/**
//	 * 获取战斗奖励
//	 * @param enemyNo
//	 * @return
//	 */
//	public Map<String, Object> getBattleReward(String enemyNo) throws AppException{
//		Map<String, Object> retMap = new HashMap<String,Object>();
//		StaticBattleReward StaticBattleReward = BattleRewardCache.getBattleReward(enemyNo);
//		String singleBattleReward = StaticBattleReward.getArticleReward1();
//		String multiBattleReward = StaticBattleReward.getArticleReward2();
//		List<StaticArticleReward> singleRewardEntities = BattleRewardCache.getArticleReward(singleBattleReward);
//		List<StaticArticleReward> multiRewardEntities = BattleRewardCache.getArticleReward(multiBattleReward);
//		retMap.put("singleBattleReward", getArticleStaticInfo(singleRewardEntities));
//		retMap.put("multiBattleReward", getArticleStaticInfo(multiRewardEntities));
//		return retMap;
//	}
	/**
	 * 获取武将列表
	 * @param characterId
	 * @param page
	 * @return
	 * @throws AppException 
	 */
	public Map<String, Object> getUserHeroForBattle(int characterId, int page) throws AppException{
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(page<1){
			page = 1;
		}
		int pages = getUserHeroPages(characterId,SELECT_HERO_PAGE_SIZE);
		if(page>pages){
			page = pages;
		}
		if(pages==0){
			retMap.put("page", page);
			retMap.put("pages", pages);
			retMap.put("userHeros", new ArrayList<Object>());
			return retMap;
		}
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> userHeros = userHeroService.getUserHeroForBattle(characterId, (page-1)*SELECT_HERO_PAGE_SIZE, SELECT_HERO_PAGE_SIZE);
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		for(UserHero i:userHeros){
			HeroAlgorithm.computeAttribute(i);
			retList.add(getViewMap(i));
		}
		retMap.put("page", page);
		retMap.put("pages", pages);
		retMap.put("userHeros", retList);
		return retMap;
	}
	/**
	 * 获取选择后的武将战力
	 * @param ids
	 * @param characterId
	 * @param battleType
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> getUserHeroInfoAfterSelect(int ids[], int characterId, int battleType) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		validateIds(battleType, ids);
//		List<Map<String, Object>> userHeros = new ArrayList<Object>();
		List<UserHero> userHerosForForce = new ArrayList<UserHero>();
		for(int i:ids){
			if(i==0){
//				userHeros.add(null);
				continue;
			}
			UserHero userHero = userHeroService.getUserHero(characterId, i);
			if(userHero==null||userHero.getCharacterId()!=characterId){
				throw new AppException("选择的武将不存在");
			}
			if(userHero.getHeroStatus()!=Const.HERO_STATUS_FREE){
				throw new AppException("武将不是空闲状态");
			}
			HeroAlgorithm.computeAttribute(userHero);
			userHerosForForce.add(userHero);
//			userHeros.add(getViewMap(userHero));
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
//		retMap.put("userHeros", userHeros);
		if(battleType == Const.BATTLE_TYPE_SINGLEBATTLE){
			retMap.put("forceNum", computeForceNum(userHerosForForce, Const.BATTLE_TYPE_SINGLEBATTLE));
			return retMap;
		}else if(battleType ==Const.BATTLE_TYPE_GET_RESOURCE){
			return retMap;
		}else{
			retMap.put("forceNum", computeForceNum(userHerosForForce, Const.BATTLE_TYPE_MULTIBATTLE));
			return retMap;
		}
	}
	/**
	 * 非通用方法，用于验证所选武将
	 * @param battleType
	 * @param ids
	 * @throws AppException
	 */
	private void validateIds(int battleType, int[] ids) throws AppException{
		if(battleType==Const.BATTLE_TYPE_SINGLEBATTLE&&ids.length!=1){
			throw new AppException("单挑武将选择数量错误");
		}
		if(battleType ==Const.BATTLE_TYPE_GET_RESOURCE&&ids.length!=1 ){
			throw new AppException("采集武将选择数量错误");
		}
		if((battleType ==Const.BATTLE_TYPE_MULTIBATTLE||battleType ==Const.BATTLE_TYPE_SENDBATTLE)&&ids.length!=5){
			throw new AppException("武将选择数量错误");
		}
		boolean isAllZero = true;
		for(int i:ids){
			if(i==0||!isAllZero){
				continue;
			}else{
				isAllZero=false;
			}
		}
		if(isAllZero){
			throw new AppException("请选择武将");
		}
	}
	/**
	 * 非通用方法，获取所选武将的战力
	 * @param userHeros
	 * @param battleType
	 * @return
	 */
	private int computeForceNum(List<UserHero> userHeros, int battleType){
		if(battleType==Const.BATTLE_TYPE_SINGLEBATTLE){
			return (int)HeroAlgorithm.computeSingleForce(userHeros.get(0));
		}else{
			return (int)HeroAlgorithm.computeFightingCapacity(userHeros);
		}
	}
	/**
	 * 非通用方法，获取武将页码数
	 * @param characterId
	 * @param pageSize
	 * @return
	 */
	private int getUserHeroPages(int characterId, int pageSize){
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		int amount = userHeroService.getUserHeroAmount(characterId);
		return (amount-1+pageSize)/pageSize;
	}
	/**
	 * 治疗所选武将
	 * @param characterId
	 * @param ids
	 * @return
	 * @throws AppException
	 */
	public List<UserHero> cureSelectUserHero(int characterId, int[] ids) throws AppException{
		HospitalService hospitalService = (HospitalService)ServiceLocator.getSpringBean("hospitalService");
		return hospitalService.cureAllUserHero(characterId, ids); 
	}

	/**
	 * 获取用户阵法
	 * @param characterId
	 * @return
	 */
	public List<UserFormationTech> getUserFormations(int characterId){
		FormationTechService formationTechService = (FormationTechService) ServiceLocator.getSpringBean("formationTechService");
		List<UserFormationTech> userFormationTechs = formationTechService.getUserFormationTechsForBattle(characterId);
		return userFormationTechs;
	}
	/**
	 * 获取用户士兵信息
	 * @param characterId
	 * @return
	 */
	public List<UserSoldier> getUserSoldierInfo(int characterId){
		BarracksService barracksService = (BarracksService) ServiceLocator.getSpringBean("barracksService");
		return barracksService.getUserSoldier(characterId);
	}
	/**
	 * 获取武将信息，用于配兵界面
	 * @param characterId
	 * @return
	 */
	public List<Map<String, Object>> getUserHeroForConfig(int characterId) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> userHeros = userHeroService.getUserHeroWithOutBattle(characterId);
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		for(UserHero i:userHeros){
			HeroAlgorithm.computeAttribute(i);
			retList.add(getViewMapForConfig(i));
		}
		return retList;
	}

	/**
	 * 配置士兵
	 * 
	 * @param characterId
	 * @param userHeroIdList
	 * @param soldierIdList
	 * @param amountList
	 * @return
	 * @throws AppException
	 */
	public boolean configSoldier(int characterId, int[] userHeroIds,
			String[] soldierNos, int[] amounts) throws AppException {
		if(userHeroIds.length!=soldierNos.length||soldierNos.length!=amounts.length){
			throw new AppException("数组参数长度错误");
		}
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		// 获取发生配兵变动的武将信息
		List<UserHero> userHeroList = new ArrayList<UserHero>();// 玩家武将表信息
		for (int i : userHeroIds) {
			UserHero userHero = userHeroService.getUserHero(characterId, i);
			if (userHero == null) {
				throw new AppException("需要配兵的武将不存在！");
			}
			userHeroList.add(userHero);
		}
		// 获取玩家的士兵信息
		List<UserSoldier> soldierList = getUserSoldierInfo(characterId);
		//执行配兵操作
		return configSoldierOperate(characterId, userHeroList, soldierList, soldierNos, amounts);
	}
	

	/**
	 * 士兵全部清空
	 * @param characterId
	 * @return
	 */
	public boolean putOffAllSoldier(int characterId){
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		// 获取所有非出征状态的武将
		List<UserHero> userHeroList = userHeroService.getUserHeroWithOutBattle(characterId);
		// 获取玩家的士兵信息
		List<UserSoldier> soldierList = getUserSoldierInfo(characterId);
		Map<String, Integer> userSoldierInfo = new HashMap<String,Integer>();// 玩家士兵表信息
		Map<String, Integer> userSoldierInfoForOperate = new HashMap<String,Integer>();// 玩家拥有士兵表信息，用于操作
		//卸兵
		putOffSoldier(soldierList, userHeroList, userSoldierInfo, userSoldierInfoForOperate);
		updateHeroAndSoldier(characterId, userHeroList, userSoldierInfoForOperate,userSoldierInfo);
		return true;
	}
	/**
	 * 士兵全部补满
	 * @param characterId
	 * @param userHeroIds
	 * @param soldierNos
	 * @return
	 * @throws AppException
	 */
	public boolean putOnAllSoldier(int characterId, int[] userHeroIds, String[] soldierNos) throws AppException{
		if(userHeroIds.length!=soldierNos.length){
			throw new AppException("数组参数长度错误");
		}
		Map<Integer, String> idAndNoMap = new HashMap<Integer,String>();
		for(int i=0;i<userHeroIds.length;i++){
			if(SoldierCache.getSoldierByNo(soldierNos[i])==null){
				throw new AppException("士兵编号错误，或格式错误");
			}
			idAndNoMap.put(userHeroIds[i], soldierNos[i]);
		}
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		// 获取所有非出征状态的武将
		List<UserHero> userHeroList = userHeroService.getUserHeroWithOutBattle(characterId);
		// 获取玩家的士兵信息
		List<UserSoldier> soldierList = getUserSoldierInfo(characterId);
		
		Map<String, Integer> userSoldierInfo = new HashMap<String,Integer>();// 玩家士兵表信息，用于展示
		Map<String, Integer> userSoldierInfoForOperate = new HashMap<String,Integer>();// 玩家士兵表信息,用于操作
		for (UserSoldier i : soldierList) {
			userSoldierInfo.put(i.getSoldierNo(),
					i.getSoldierAmount());
			userSoldierInfoForOperate.put(i.getSoldierNo(),
					i.getSoldierAmount());
		}
		// 卸兵,同时改变士兵编号
		for (UserHero i : userHeroList) {
			HeroAlgorithm.computeCommand(i);
			if(idAndNoMap.get(i.getId())==null){//没有配兵操作，不用卸兵，不用改士兵编号
				continue;
			}
			if(i.getSoldierNo()==null){//有配兵操作，但武将身上没有兵的武将，不用卸兵，但需要写入新的变化的编号
				i.setSoldierNo(idAndNoMap.get(i.getId()).equals("")?null:idAndNoMap.get(i.getId()));//
				continue;
			}
			//有变化操作，切武将身上有兵，卸兵
			String soldierNo = i.getSoldierNo();
			int soldierAmount = i.getSoldierAmount();
			if (userSoldierInfoForOperate.get(soldierNo) == null) {
				userSoldierInfoForOperate.put(soldierNo, soldierAmount);
			} else {
				userSoldierInfoForOperate.put(soldierNo, userSoldierInfoForOperate.get(soldierNo)
						+ soldierAmount);
			}
			i.setSoldierNo(idAndNoMap.get(i.getId()).equals("")?null:idAndNoMap.get(i.getId()));
			i.setSoldierAmount(0);// 把士兵数量清零
		}
		List<UserHero> userHeroForUpdate = configSoldierForPutOnAll(userSoldierInfoForOperate, userHeroList);
		updateHeroAndSoldier(characterId, userHeroForUpdate, userSoldierInfoForOperate, userSoldierInfo);
		return true;
			
	}
	
	
	public BattleDao getBattleDao() {
		return battleDao;
	}


	public void setBattleDao(BattleDao battleDao) {
		this.battleDao = battleDao;
	}
	/**
	 * 非通用方法，卸除武将身上的士兵
	 * @param soldierList
	 * @param userHeroList
	 * @param userSoldierInfo
	 * @param userSoldierInfoForOperate
	 */
	private void putOffSoldier(List<UserSoldier> soldierList, List<UserHero> userHeroList, Map<String, Integer> userSoldierInfo, Map<String, Integer> userSoldierInfoForOperate){
		for (UserSoldier i : soldierList) {
			userSoldierInfo.put(i.getSoldierNo(),
					i.getSoldierAmount());
			userSoldierInfoForOperate.put(i.getSoldierNo(),
					i.getSoldierAmount());
		}
		// 卸兵
		for (UserHero i : userHeroList) {
			if(i.getSoldierNo()==null){//身上没有兵，不用卸兵
				continue;
			}
			String soldierNo = i.getSoldierNo();
			int soldierAmount = i.getSoldierAmount();
			if (userSoldierInfoForOperate.get(soldierNo) == null) {
				userSoldierInfoForOperate.put(soldierNo, soldierAmount);
				i.setSoldierAmount(0);// 把士兵数量清零
				i.setSoldierNo(null);//士兵编号设为null
			} else {
				userSoldierInfoForOperate.put(soldierNo, userSoldierInfoForOperate.get(soldierNo)
						+ soldierAmount);
				i.setSoldierAmount(0);// 把士兵数量清零
				i.setSoldierNo(null);//士兵编号设为null
			}
		}
	}
	private boolean configSoldierOperate(int characterId, List<UserHero> userHeroList, List<UserSoldier> soldierList, String[] soldierNos, int[] amounts) throws AppException{
		Map<String, Integer> userSoldierInfo = new HashMap<String,Integer>();// 玩家拥有士兵表信息，用于查询，不改变
		Map<String, Integer> userSoldierInfoForOperate = new HashMap<String,Integer>();// 玩家拥有士兵表信息，用于操作
		//卸兵
		putOffSoldier(soldierList, userHeroList, userSoldierInfo, userSoldierInfoForOperate);
		// 验证,并配置;操作不成功，不用写数据库;如果成功，则更新数据库
		if(CanConfigSoldier(userSoldierInfoForOperate, userHeroList, soldierNos,
				amounts)){
			// 成功，写入数据库操作，并返回
			updateHeroAndSoldier(characterId, userHeroList, userSoldierInfoForOperate,userSoldierInfo);
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.CONFIG_SOLDIER, null, characterId);
		return true;
	}
	/**
	 * 非通用方法，更新武将带兵士兵
	 * @param characterId
	 * @param userHeroList
	 * @param userSoldierInfoForOperate
	 * @param userSoldierInfo
	 */
	private void updateHeroAndSoldier(int characterId, List<UserHero> userHeroList, Map<String, Integer> userSoldierInfoForOperate, Map<String, Integer> userSoldierInfo){
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		BarracksService barracksService = (BarracksService) ServiceLocator.getSpringBean("barracksService");
		for (int i = 0; i < userHeroList.size(); i++) {
			userHeroService.updateUserHeroSoldier(userHeroList.get(i));// 更新武将带兵信息
		}
		Set<String> key = userSoldierInfoForOperate.keySet();
		for (Iterator<String> it = key.iterator(); it.hasNext();) {
			String soldierNo = it.next();
			int soldierAmount = userSoldierInfoForOperate.get(soldierNo);
			if (userSoldierInfo.get(soldierNo)!=null&&soldierAmount == 0) {
				barracksService.deleteUserSoldier(characterId, soldierNo);
			} else if(userSoldierInfo.get(soldierNo)!=null){
				barracksService.updateUserSoldier(characterId, soldierNo, soldierAmount);
			}else if(soldierAmount!=0){
				barracksService.addUserSoldier(characterId, soldierNo, soldierAmount);
			}
		}
		//更新空闲兵种数
		List<UserSoldier> soldierList = getUserSoldierInfo(characterId);
		int amount = 0;
		for(UserSoldier i:soldierList){
			amount+=i.getSoldierAmount();
		}
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		maincityService.updateSoldier(characterId, amount);
	}
	/**
	 * 非通用方法，验证是否可以配兵
	 * @param userSoldierInfo
	 * @param userHeroList
	 * @param soldierNos
	 * @param amounts
	 * @return
	 * @throws AppException
	 */
	private boolean CanConfigSoldier(Map<String, Integer> userSoldierInfo,
			List<UserHero> userHeroList, String[] soldierNos,
			int[] amounts) throws AppException {
		for (int i = 0; i < soldierNos.length; i++) {
			int amount = amounts[i];
			HeroAlgorithm.computeCommand(userHeroList.get(i));
			if(userHeroList.get(i).getCommand()<amount){
				throw new AppException("武将"+userHeroList.get(i).getHeroName()+"配兵数量超出统率，无法配兵");
			}
			String soldierNo = soldierNos[i];
			if(soldierNo==null){
				throw new AppException("不存在要配置的士兵");
			}
			if (soldierNo.equals("")) {// 士兵Id为0，怎没有给武将选择兵种
//				userHeroList.get(i).setSoldierNo(null);
				continue;
			}
			if (userSoldierInfo.get(soldierNo) == null) {
				throw new AppException("配兵错误，玩家"+SoldierCache.getSoldierByNo(soldierNo).getSoldierName()+"没有剩余，无法配置该兵");
			}
			int haveAmount = userSoldierInfo.get(soldierNo);
			if (haveAmount < amount) {
				throw new AppException("配置错误，没有足够的"+SoldierCache.getSoldierByNo(soldierNo).getSoldierName()+"可配置");// 异常错误，一般不会出现
			} else {
				userSoldierInfo.put(soldierNo, haveAmount - amount);
				userHeroList.get(i).setSoldierNo(soldierNo);
				userHeroList.get(i).setSoldierAmount(amount);
				continue;
			}
		}
		return true;
	}
	/**
	 * 非通用方法，把武将身上的士兵补满，返回需要更新的武将
	 * @param userSoldierInfoForOperate
	 * @param userHeroList
	 * @return
	 */
	private List<UserHero> configSoldierForPutOnAll(Map<String, Integer> userSoldierInfoForOperate,
			List<UserHero> userHeroList){
		List<UserHero> retList = new ArrayList<UserHero>();
		for(UserHero i:userHeroList){
			String soldierNo = i.getSoldierNo();
			if(userSoldierInfoForOperate.get(soldierNo)==null||userSoldierInfoForOperate.get(soldierNo)==0){
				retList.add(i);
				continue;
			}
			int haveAmount = userSoldierInfoForOperate.get(soldierNo);
			int command = (int)i.getCommand();//统御值，不是带兵数，需要修改
			int needAmount = command - i.getSoldierAmount();
			if(needAmount<haveAmount){//需求士兵小于拥有的士兵
				i.setSoldierAmount(command);
				userSoldierInfoForOperate.put(soldierNo, haveAmount-needAmount);
			}else{//需求士兵大于等于拥有的士兵
				i.setSoldierAmount(i.getSoldierAmount()+haveAmount);
				userSoldierInfoForOperate.put(soldierNo, 0);
			}
			retList.add(i);
		}
		return retList;
	}
	/**
	 * 非通用方法，把仇人信息转化为敌对势力信息
	 * @param userFriends
	 * @return
	 */
	private List<Map<String, Object>> changToMap(int characterId,List<FriendInfo> userFriends){
		Map<String, Object> temp;
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		double pre = this.getReducePreTimePre(characterId);
		for(FriendInfo i :userFriends){
			temp = new HashMap<String,Object>();
			temp.put("enemyId", i.getFriendId());
			temp.put("enemyName", i.getFriendName());
			temp.put("enemyCountry", i.getFriendCountry());
			temp.put("enemyLevel", i.getFriendLevel());
			temp.put("enemyLeague", i.getFriendLeague());
			temp.put("enemyMaincityLevel", i.getFriendMaincityLevel());
			temp.put("x", i.getFriendX());
			temp.put("y", i.getFriendY());
			temp.put("needTime", i.getLineTime()*(1-pre));
			retList.add(temp);
		}
		return retList;
	}
//	/**
//	 * 非通用方法，获取物品静态信息
//	 * @param param
//	 * @return
//	 */
//	private List<Object> getArticleStaticInfo(List<StaticArticleReward> param) throws AppException{
//		List<Object> retList = new ArrayList<Object>();
//		Map<String, Object> articleInfo;
//		for(StaticArticleReward i:param){
//			switch (i.getItemType()) {
//			case Const.TYPE_EQUIPMENT:
//				articleInfo = new HashMap<String,Object>();
//				StaticEquipment staticEquipment = EquipmentCache.getEquipmentByNo(i.getItemNo());
//				articleInfo.put("icon", staticEquipment.getIcon());
//				articleInfo.put("type", staticEquipment.getItemType());
//				articleInfo.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(staticEquipment));
//				retList.add(articleInfo);
//				break;
//			case Const.TYPE_ITEM:
//				articleInfo = new HashMap<String,Object>();
//				StaticItem staticItem = ItemCache.getItemByNo(i.getItemNo());
//				articleInfo.put("icon", staticItem.getIcon());
//				articleInfo.put("type", staticItem.getItemType());
//				articleInfo.put("toolTipInfo", ChangeArticleToToolTip.changeItemToToolTip(staticItem));
//				retList.add(articleInfo);
//				break;
//			case Const.TYPE_MATERIAL:
//				articleInfo = new HashMap<String,Object>();
//				StaticMaterial staticMaterial = MaterialCache.getMaterialByNo(i.getItemNo());
//				articleInfo.put("icon", staticMaterial.getIcon());
//				articleInfo.put("type", staticMaterial.getItemType());
//				articleInfo.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(staticMaterial));
//				retList.add(articleInfo);
//				break;
//			case Const.TYPE_QUESTS:
//				articleInfo = new HashMap<String,Object>();
//				StaticQuests staticQuests = QuestsCache.getQuestsByNo(i.getItemNo());
//				articleInfo.put("icon", staticQuests.getIcon());
//				articleInfo.put("type", staticQuests.getItemType());
//				articleInfo.put("toolTipInfo", ChangeArticleToToolTip.changeQuestsToToolTip(staticQuests));
//				retList.add(articleInfo);
//				break;
//
//			default:
//				break;
//			}
//		}
//		return retList;
//	}
	/**
	 * 武将配兵
	 * @param userHero
	 * @return
	 */
	private Map<String,Object> getViewMapForConfig(UserHero userHero){
		Map<String,Object> viewMap = new LinkedHashMap<String, Object>();
		viewMap.put("id", userHero.getId());
//		viewMap.put("heroName", userHero.getHeroName());
//		viewMap.put("quality", userHero.getQuality());
//		viewMap.put("level", userHero.getLevel());
		viewMap.put("soldierName", userHero.getSoldierName());
		viewMap.put("soldierNo", userHero.getSoldierNo());
		viewMap.put("soldierAmount", userHero.getSoldierAmount());
//		viewMap.put("command", (int)userHero.getCommand());//统帅值，不是统兵数量，需要改\
		SoldierCache.getSoldierByNo(userHero.getSoldierNo());
//		
//		viewMap.put("soldierAttack", SoldierCache.getSoldierByNo(userHero.getSoldierNo()).getSoldierAttack());//士兵攻击
//		viewMap.put("soldierDefence", SoldierCache.getSoldierByNo(userHero.getSoldierNo()).getSoldierDefence());//士兵防御
		viewMap.put("toolTipInfo", ChangeHeroToToolTip.change(userHero));
		return viewMap;
	}
	/**
	 * 选择武将时的返回值
	 * @param userHero
	 * @return
	 */
	private Map<String,Object> getViewMap(UserHero userHero){
		Map<String,Object> viewMap = new LinkedHashMap<String, Object>();
		viewMap.put("id", userHero.getId());
		viewMap.put("heroIcon", userHero.getHeroIcon());
//		viewMap.put("smallHeroIcon", userHero.getSmallHeroIcon());
//		viewMap.put("heroName", userHero.getHeroName());
//		viewMap.put("quality", userHero.getQuality());
//		viewMap.put("level", userHero.getLevel());
//		viewMap.put("exp", userHero.getExp());
//		viewMap.put("expLimit", HeroLevelCache.getExpLimit(userHero.getLevel()));
//		viewMap.put("poolLimit", HeroLevelCache.getPoolLimit(userHero.getLevel()));
//		viewMap.put("heroSoul", "无");//武魂
//		viewMap.put("gift", FloatUtil.format(userHero.getGift(),1));
//		viewMap.put("heroForce", (int)userHero.getHeroForce());
//		viewMap.put("forceAdd", (int)userHero.getForceAdd());
//		viewMap.put("strategy", (int)userHero.getStrategy());
//		viewMap.put("strategyAdd", (int)userHero.getStrategyAdd());
//		viewMap.put("physique", (int)userHero.getPhysique());
//		viewMap.put("physiqueAdd", (int)userHero.getPhysiqueAdd());
//		viewMap.put("agility", (int)userHero.getAgility());
//		viewMap.put("agilityAdd", (int)userHero.getAgilityAdd());
//		viewMap.put("point", userHero.getPoint());
//		viewMap.put("heroTitle", userHero.getHeroTitle());
//		viewMap.put("attack", (int)userHero.getAttack());
//		viewMap.put("defence", (int)userHero.getDefence());
//		viewMap.put("stamina", (int)userHero.getStamina());
//		viewMap.put("staminaMax", (int)userHero.getStaminaMax());
		viewMap.put("mp", (int)userHero.getMp());
		viewMap.put("mpMax", (int)userHero.getMpMax());
//		viewMap.put("criticalStrike", (int)userHero.getCriticalStrike());
//		viewMap.put("hit", (int)userHero.getHit());
//		viewMap.put("dodge", (int)userHero.getDodge());
//		viewMap.put("command", (int)userHero.getCommand());
		viewMap.put("toolTipInfo", ChangeHeroToToolTip.change(userHero));
		viewMap.put("rankName", userHero.getRankName());
		viewMap.put("soldierName", userHero.getSoldierName());
		viewMap.put("soldierAmount", userHero.getSoldierAmount());
		viewMap.put("heroStatus", userHero.getHeroStatus());
		DecimalFormat decimalFormat = new DecimalFormat("0.0");
		viewMap.put("singleForce", decimalFormat.format(HeroAlgorithm.computeSingleForce(userHero)));
		return viewMap;
	}
	




	
	
	
	
	
	
	
	/**
	 * 出征接口
	 * @param characterId
	 * @param battleType
	 * @param heroList
	 * @param targetType
	 * @param targetId
	 * @param arrayId
	 * @return
	 * @throws AppException
	 */
	public BattleJobQueue getReadyToBattle(UserCharacter character, int battleType, String userHeroIdString,
			int targetType, String targetId, String formationNo) throws AppException {
		int characterId = character.getId();
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		String[] userHeroIds = userHeroIdString.split(",");
		//验证战争类型是否正确
		this.validateBattleType(targetType,battleType, targetId,character);
		//验证是否合法
		List<UserHero> userHeros = validateUserHero(characterId, targetType, userHeroIds, battleType);
		//更新武将状态
		for (UserHero i : userHeros) {
			i.setHeroStatus(Const.HERO_STATUS_FIGHTING);
			userHeroService.updateHeroStatus(i);
		}
		UserCharacter mine = characterService.getCharacterById(characterId);
		if(mine==null){
			throw new AppException("获取玩家姓名失败，玩家不存在");
		}
		BattleJobQueue battleJobQueue = new BattleJobQueue();
		battleJobQueue.setCharacterId(characterId);
		battleJobQueue.setCharacterName(mine.getName());
		battleJobQueue.setBattleType(battleType);
		battleJobQueue.setHeroList(userHeroIdString);
		battleJobQueue.setUserForce(computeForceNum(userHeros, Const.BATTLE_TYPE_MULTIBATTLE));
		battleJobQueue.setTargetType(targetType);
		battleJobQueue.setFormationNo(formationNo);
		battleJobQueue.setStatus(Const.BATTLE_STATUS_TOWARD);
		if (targetType == Const.TARGET_TYPE_CHAR) {
			UserCharacter target = characterService.getCharacterById(Integer.parseInt(targetId));
			if(target==null){
				throw new AppException("获取目标姓名失败，目标玩家不存在");
			}
			//判断战斗类型是否正确
			if(characterService.isAlliance(target, character)){//判断是否是同盟/联盟
				if(battleType != Const.BATTLE_TYPE_SENDBATTLE){
					throw new AppException("战争类型错误");
				}
			}else{
				if(battleType != Const.BATTLE_TYPE_MULTIBATTLE){
					throw new AppException("战争类型错误");
				}
			}
			battleJobQueue.setTargetId(Integer.parseInt(targetId));
			battleJobQueue.setTargetName(target.getName());
			long currentTime = System.currentTimeMillis();
			battleJobQueue.setGoTime(new Date(currentTime));
			int time = countTime(mine, target);//需要修改，用世界通用方法，现在暂时用假方法
			battleJobQueue.setNeedTime(time/1000);
			Date fireTime = new Date(currentTime + time);
			battleJobQueue.setArrivingTime(fireTime);
		} else {
			StaticEnemyNPC target = EnemyNPCCache.getEnemyEntity(targetId);
			battleJobQueue.setTargetNo(targetId);
			battleJobQueue.setTargetName(target.getEnemyName());
			int time = (int) (target.getNeedTime()*(1-this.getReducePreTimePre(characterId)));//秒
			long currentTime = System.currentTimeMillis();
			battleJobQueue.setGoTime(new Date(currentTime));
			battleJobQueue.setNeedTime(time);
			Date fireTime = new Date(currentTime + time*1000);// 以秒为单位储存，转换成毫秒
			battleJobQueue.setArrivingTime(fireTime);
		}
		insertBattelQueue(battleJobQueue);// 插入数据库
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("battleData", battleJobQueue);
		ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data,
				battleJobQueue.getArrivingTime(), BATTLE_JOB_STRING+battleJobQueue.getId());
		return battleJobQueue;
	}
	/**
	 *校验战争类型是否正确
	 * @param targetType
	 * @param battleType 
	 * @param targetId
	 * @param character 
	 * @throws AppException 
	 */
	private void validateBattleType(int targetType, int battleType, String targetId, UserCharacter character) throws AppException {
		if(targetType==Const.TARGET_TYPE_MONSTER){//野怪
			if(battleType != Const.BATTLE_TYPE_MULTIBATTLE && battleType != Const.BATTLE_TYPE_SINGLEBATTLE){
				throw new AppException("战争类型错误");
			}
		}else if(targetType==Const.TARGET_TYPE_CHAR){//玩家
			UserCharacter target = characterService.getCharacterById(Integer.parseInt(targetId));
			if(characterService.isAlliance(target, character)){
				if(battleType != Const.BATTLE_TYPE_SENDBATTLE ){
					throw new AppException("战争类型错误");
				}
				//验证target是否可以被援助
			}else{
				if(battleType != Const.BATTLE_TYPE_MULTIBATTLE ){
					throw new AppException("战争类型错误");
				}
				//验证target是否可以被讨伐
				MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
				Maincity city = maincityService.getBaseInfo(target.getId());
				if(city.getStatus() == Const.MAIN_CITY_FREEWAR){
					throw new AppException("目标处于免战状态，暂时无法进攻");
				}else if(city.getStatus() == Const.MAIN_CITY_EXILE){
					throw new AppException("目标处于流亡状态，暂时无法进攻");
				}
				
			}
		}
	}
	/**
	 * 非通用方法，验证所选的用于出征的武将是否合法
	 * @param characterId
	 * @param targetType
	 * @param userHeroIds
	 * @param battleType
	 * @return
	 * @throws AppException
	 */
	private List<UserHero> validateUserHero(int characterId, int targetType, String[] userHeroIds, int battleType) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		if(targetType==Const.TARGET_TYPE_MONSTER&&battleType==Const.BATTLE_TYPE_SENDBATTLE){
			throw new AppException("野外势力无法派遣");
		}
		if(targetType==Const.TARGET_TYPE_CHAR&&battleType==Const.BATTLE_TYPE_SINGLEBATTLE){
			throw new AppException("敌对势力无法单挑");
		}
		if(targetType==Const.TARGET_TYPE_RESOURCE&&battleType!=Const.BATTLE_TYPE_GET_RESOURCE){
			throw new AppException("对资源目标无法进行军事操作");
		}
		if(battleType==Const.BATTLE_TYPE_SINGLEBATTLE&&userHeroIds.length!=1){
			throw new AppException("单挑武将选择数量错误");
		}
		if(battleType ==Const.BATTLE_TYPE_GET_RESOURCE&&userHeroIds.length!=1 ){
			throw new AppException("采集武将选择数量错误");
		}
		if((battleType ==Const.BATTLE_TYPE_MULTIBATTLE||battleType ==Const.BATTLE_TYPE_SENDBATTLE)&&userHeroIds.length!=5){
			throw new AppException("武将选择数量错误");
		}
		List<UserHero> userHeroList = new ArrayList<UserHero>();
		for (String i : userHeroIds) {
			int userHeroId = Integer.parseInt(i);
			if (userHeroId == 0) {
				continue;
			}
			UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
			if(userHero==null){
				throw new AppException("选择的武将不存在");
			}
			userHeroList.add(userHero);
		}
		if(userHeroList.isEmpty()){
			throw new AppException("武将不能为空，请选择武将");
		}
		for(UserHero i:userHeroList){
			if (i.getHeroStatus() != Const.HERO_STATUS_FREE) {
				throw new AppException("武将不是空闲，无法出征");
			}
			
		}
		for(UserHero i:userHeroList){
			if (i.getSoldierNo() == null&&battleType!=Const.BATTLE_TYPE_SINGLEBATTLE) {
				throw new AppException("武将必须要配置兵种");
			}else if(i.getStamina() < 20){
				throw new AppException("武将"+i.getHeroName()+"体力值不足,无法出征");
			}			
		} 
		for(UserHero i:userHeroList){
			if (i.getSoldierAmount() == 0&&battleType!=Const.BATTLE_TYPE_SINGLEBATTLE) {
				throw new AppException("武将带兵数量为0，无法出征");
			}
			
		}
		return userHeroList;
	}
	/**
	 * 非通用方法，用于计算路程时间，用的假方法需要修改(毫秒)
	 * @param mine
	 * @param target
	 * @return
	 */
	public int countTime(UserCharacter mine, UserCharacter target){
		return 20000;
	}
	
	
	
	
	
	
	
	
	
	/************dao******************/
	
	/**
	 * 插入战斗队列
	 * @param battleJobQueue
	 */
	public void insertBattelQueue(BattleJobQueue battleJobQueue){
		battleDao.insertBattelQueue(battleJobQueue);
	}
	/**
	 * 更新战斗队列(只更新状态和到达时间)
	 * @param battleJobQueue
	 */
	public void updateBattelQueue(BattleJobQueue battleJobQueue){
		battleDao.updateBattelQueue(battleJobQueue);
	}
	/**
	 * 删除战斗队列
	 * @param battleJobQueue
	 */
	public void deleteBattelQueue(BattleJobQueue battleJobQueue){
		battleDao.deleteBattelQueue(battleJobQueue);
	}
	/**
	 * 获取玩家城郊有关军情队列（状态不是前往和返回）
	 * @param targetId 被攻击的城主Id
	 * @param battleType 战斗队列类型 -1表示忽略战斗队列类型
	 * @return
	 */
	public ConcurrentLinkedQueue<BattleJobQueue> getBattleQueueForSuburbByStatus(int targetId, int battleType){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("targetId", targetId);
		param.put("battleType", battleType);
		return battleDao.getBattleQueueForSuburbByStatus(param);
	}
	/**
	 * 获取玩家城郊军情数量
	 * @param targetId
	 * @return
	 */
	/*public int getBattleAmountForSuburb(int targetId, int battleType, int status){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("targetId", targetId);
		param.put("battleType", battleType);
		param.put("status", status);
		return battleDao.getBattleAmountForSuburb(param);
	}*/
	/*********************************** 出征界面 ********************************************************/

	/**
	 * 召回部队
	 * @param battleJobQueueId
	 * @param characterId
	 * @param page
	 * @param searchType
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> callBackBattleQueue(int battleJobQueueId, int characterId, int page, int searchType) throws AppException{
		/*BattleJobQueue battleJobQueue = selectBattleQueueById(battleJobQueueId);
		if(battleJobQueue==null||battleJobQueue.getCharacterId()!=characterId){
			throw new AppException("战斗队列不存在");
		}
		int status = battleJobQueue.getStatus();
		switch (status) {
		case Const.BATTLE_STATUS_TOWARD:
			long date = System.currentTimeMillis();
			battleJobQueue.setBackTime(new Date(date));
			battleJobQueue.setBackArriveTime(new Date(2*date-battleJobQueue.getGoTime().getTime()));
			battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
			updateBattelQueue(battleJobQueue);
			Map<String, Object> data = new HashMap<String,Object>();
			data.put("battleData", battleJobQueue);
			ExecuteBattleJob.deleteBattleJob(BATTLE_JOB_STRING+battleJobQueueId);
			System.out.println(battleJobQueue.getBackArriveTime()+"------"+battleJobQueue.getBackArriveTime().getTime());
			ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data, battleJobQueue.getBackArriveTime(), BATTLE_JOB_STRING+battleJobQueueId);
			return selectBattleQueue(characterId, page, searchType);
		case Const.BATTLE_STATUS_WAIT:
			date = System.currentTimeMillis();
			battleJobQueue.setBackTime(new Date(date));
			battleJobQueue.setBackArriveTime(new Date(date+battleJobQueue.getNeedTime()));
			battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
			updateBattelQueue(battleJobQueue);
			data = new HashMap<String,Object>();
			data.put("battleData", battleJobQueue);
			ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data, battleJobQueue.getBackArriveTime(), BATTLE_JOB_STRING+battleJobQueueId);
			return selectBattleQueue(characterId, page, searchType);
		case Const.BATTLE_STATUS_BACK:
			throw new AppException("部队已经再返回途中");
			//少个状态，战斗中
		default:
			throw new AppException("返回状态异常");
		}*/
		this.retreatBattleQueue(battleJobQueueId, characterId,false);
		return selectBattleQueue(characterId, page, searchType);
	}
	
	/**
	 * 查看玩家军情
	 * @param characterId
	 * @param targetId
	 * @param targetType
	 * @return
	 */
	public Map<String, Object> selectBattleQueue(int characterId, int page, int searchType) throws AppException{
		int pages = countBattleQueuePages(characterId, searchType);
		if(page>pages){
			page = pages;
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("page", (page-1)*Const.BATTLE_SEARCH_PAGES);
		param.put("pageSize", Const.BATTLE_SEARCH_PAGES);
		param.put("searchType", searchType);
		retMap.put("pages", pages);
		retMap.put("page", page);
		retMap.put("battleJobQueueInfo", changeToReturnMap(battleDao.selectBattleQueue(param), characterId));
		return retMap;
	}
	private List<Map<String, Object>> changeToReturnMap(List<BattleJobQueue> param, int characterId) throws AppException{
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		for(BattleJobQueue i:param){
			Map<String, Object> retMap = new HashMap<String,Object>();
			String message="";
			BattleProcess.resetState(i);
			switch (i.getStatus()) {
			case Const.BATTLE_STATUS_TOWARD:
				message = getMessageForToward(i, characterId);
				break;
			case Const.BATTLE_STATUS_WAIT:
				message = getMessageForWait(i, characterId);
				break;
			case Const.BATTLE_STATUS_BACK:
				message = getMessageForBack(i, characterId);
				break;
			case Const.BATTLE_STATUS_FIGHTING:
				message = getMessageForFight(i, characterId);
				break;
			/*case Const.BATTLE_STATUS_WILL_FIGHT:
				message = getMessageForWillFight(i, characterId);
				break;*/
			case Const.BATTLE_STATUS_WAIT_FIGHT:
				message = getMessageForWaitFight(i, characterId);
				break;
			default:
				throw new AppException("军情状态错误");
			}
			retMap.put("id", i.getId());
			retMap.put("battleJobMessage", message);
			retMap.put("remainTime", i.getRemainTime());
			retMap.put("targetType", i.getTargetType());
			retMap.put("targetId", i.getTargetId());
			retMap.put("status", i.getStatus());
			retMap.put("menu", Const.getBattleMenu(characterId == i.getCharacterId(),i.getStatus(), i.getTargetType()));
			retMap.put("battleType", i.getBattleType());
			retList.add(retMap);
		}
		return retList;
	}
	private String getMessageForToward(BattleJobQueue i, int characterId){
		if(i.getBattleType()==Const.BATTLE_TYPE_SENDBATTLE){
			if(i.getCharacterId()==characterId){
				return "您的部队正在向"+i.getTargetName()+"发起支援，到达目的地需要";
			}else{
//				i.setBattleType(Const.BATTLE_TYPE_BE_SENDBATTLE);
				return i.getCharacterName() + "的部队正在向你的城池发起支援，到达目的地需要";
			}
		}else{
			if(i.getTargetType()==Const.TARGET_TYPE_MONSTER){
				if(i.getBattleType()==Const.BATTLE_TYPE_SINGLEBATTLE){
					return "你的部队正在向"+i.getTargetName()+"发起单挑，到达目的地需要";
				}else{
					return "你的部队正在向"+i.getTargetName()+"发起讨伐，到达目的地需要";
				}
			}else{
				if(i.getCharacterId()==characterId){
					return "你的部队正在向"+i.getTargetName()+"发起讨伐，到达目的地需要";
				}else{
					//i.setBattleType(Const.BATTLE_TYPE_BE_MULTIBATTLE);
					return i.getCharacterName()+"向你的城池发起讨伐，到达目的地需要";
				}
			}
		}
	}
	private String getMessageForWaitFight(BattleJobQueue i, int characterId){
		if(i.getTargetType()==Const.TARGET_TYPE_CHAR){
			if(i.getCharacterId()==characterId){
				return "你的部队已到达"+i.getTargetName()+"城郊，准备进入战斗。";
			}else{
				if(i.getBattleType()==Const.BATTLE_TYPE_MULTIBATTLE){
					//i.setBattleType(Const.BATTLE_TYPE_BE_MULTIBATTLE);
					return i.getCharacterName()+"向你的城池发起讨伐，已到达城郊，准备进入战斗。";
				}else{
					//i.setBattleType(Const.BATTLE_TYPE_BE_SENDBATTLE);
					return i.getCharacterName()+"的部队已到达你的城郊，准备进入战斗。";
				}
			}
		}else{
			return "你的部队已到达"+i.getTargetName()+"营地，正在等待进入战斗。";
		}
	}
	private String getMessageForBack(BattleJobQueue i, int characterId){
		if(i.getCharacterId()==characterId){
			return "你的部队正在返程途中，回到驻地需要";
		}else{
			/*if(i.getBattleType()==Const.BATTLE_TYPE_SENDBATTLE){
				//i.setBattleType(Const.BATTLE_TYPE_BE_SENDBATTLE);
			}else{
				//i.setBattleType(Const.BATTLE_TYPE_BE_MULTIBATTLE);
			}*/
			return i.getCharacterName()+"的部队正在返程途中，回到驻地需要";
		}
	}
	private String getMessageForFight(BattleJobQueue i, int characterId){
		//利用倒计时时间判断军情
		int second = 0;//待完成
		if(second  > 0 && i.getTargetType() == Const.TARGET_TYPE_CHAR){
			return getMessageForWillFight(i, characterId);
		}
		if(i.getBattleType()==Const.BATTLE_TYPE_SENDBATTLE&&i.getCharacterId()!=characterId){
			//i.setBattleType(Const.BATTLE_TYPE_BE_SENDBATTLE);
			return i.getCharacterName()+"的部队正在战斗中…";
		}else{
			return "你的部队正在战斗中…";
		}
	}
	private String getMessageForWait(BattleJobQueue i, int characterId){
		if(i.getTargetType() == Const.TARGET_TYPE_MONSTER){
			return this.getMessageForWaitFight(i, characterId);
		}
		if(i.getCharacterId()==characterId){
			return "你的部队已到达"+i.getTargetName()+"城郊，正在队列中…";
		}else{
			if(i.getBattleType()==Const.BATTLE_TYPE_MULTIBATTLE){
				//i.setBattleType(Const.BATTLE_TYPE_BE_MULTIBATTLE);
				return i.getCharacterName()+"向你的城池发起讨伐，已到达城郊，正在队列中…";
			}else{
				//i.setBattleType(Const.BATTLE_TYPE_BE_SENDBATTLE);
				return i.getCharacterName()+"的部队已到达你的城郊，正在队列中…";
			}
		}
	}
	private String getMessageForWillFight(BattleJobQueue i, int characterId){
		if(i.getCharacterId()==characterId){
			return "你的部队已到达"+i.getTargetName()+"城郊，有人向你发起进攻，即将进入战斗…";
		}else{
			if(i.getBattleType()==Const.BATTLE_TYPE_SENDBATTLE){
			//	i.setBattleType(Const.BATTLE_TYPE_BE_SENDBATTLE);
				return i.getCharacterName()+"的部队即将进入战斗…";
			}else{
				//i.setBattleType(Const.BATTLE_TYPE_BE_MULTIBATTLE);
				return i.getCharacterName()+"向你的城池发起讨伐，已到达城郊，正在发起进攻，即将进入战斗…";
			}
		}
	}
	
	
	private int countBattleQueuePages(int characterId, int searchType){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("searchType", searchType);
		int counts = battleDao.getBattleQueueAmount(param);
		return (counts-1)/Const.BATTLE_SEARCH_PAGES+1;
	}
	/**
	 * 根据队列id获得队列信息
	 * @param battleJobQueueId
	 * @return
	 */
	public BattleJobQueue selectBattleQueueById(int battleJobQueueId){
		BattleJobQueue battleQueue = battleDao.selectBattleQueueById(battleJobQueueId);
		if(battleQueue == null){
			return null;
		}else if(battleQueue.getTargetType() == Const.TARGET_TYPE_CHAR){
			battleQueue = BattleProcess.resetState(battleQueue);
		}
		return battleQueue;
	}
	
	private static void updateBattleQueue(){
		BattleDao battleDao = (BattleDao) ServiceLocator.getSpringBean("battleDao");
		List<BattleJobQueue> battleJobQueues = battleDao.selectAllBattleQueue();
		for(BattleJobQueue i:battleJobQueues){
			if(!ExecuteBattleJob.isExist(BATTLE_JOB_STRING+i.getId())){
				Map<String, Object> data = new HashMap<String,Object>();
				data.put("battleData", i);
				if(i.getStatus()==Const.BATTLE_STATUS_TOWARD){
					ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data,
							i.getArrivingTime(), BATTLE_JOB_STRING+i.getId());
				}else if(i.getStatus()==Const.BATTLE_STATUS_BACK){
					ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data,
							i.getBackArriveTime(), BATTLE_JOB_STRING+i.getId());
				}
			}
		}
	}
	
	/**
	 * 获取玩家军情，按类型获取,目前用户下线或用户退出切换战斗状态
	 * @param param
	 * @return
	 */
	public List<BattleJobQueue> getBattleQueue(int characterId, int status){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("status", status);
		return battleDao.getBattleQueue(param);
	}
	public List<BattleJobQueue> selectAllBattleQueue(){
		return battleDao.selectAllBattleQueue();
	}
	/**
	 * 返回添加效果后的行军时间减少百分比
	 * @param characterId
	 * @return
	 */
	private final double getReducePreTimePre(int characterId){
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> college = buildingService.getbBuildingByPrefix(characterId, Const.COLLEGE_BUILDING_NO_PREFIX);
		if(college == null || college.isEmpty()){
			return 0;
		}
		StaticBuilding staticBuilding = BuildingCache.getBuildingEntityByNo(college.get(0).getBuildingNo());
		return Double.valueOf(staticBuilding.getFunctionvalue1())/100;
	}
	/**
	 * 加速行军
	 * @param battleJobQueueId
	 * @param id
	 * @param page
	 * @param searchType
	 * @param itemNo 
	 * @param speedType 加速类型
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException 
	 */
	public Map<String, Object> saveSpeedBattleQueue(int battleJobQueueId, int characterId,int page, int searchType, int speedType, String itemNo,int confim) throws AppException {
		Map<String, Object> retMap = null;
		BattleJobQueue battleJobQueue = selectBattleQueueById(battleJobQueueId);
		if(battleJobQueue==null||battleJobQueue.getCharacterId() != characterId){
			throw new AppException("战斗队列不存在,加速失败");
		}else if(!ExecuteBattleJob.isExist(BATTLE_JOB_STRING+battleJobQueueId)){
			throw new AppException("队列已经完成,无须加速");
		}
		int status = battleJobQueue.getStatus();
		if(status != Const.BATTLE_STATUS_TOWARD && status != Const.BATTLE_STATUS_BACK){//行军
			throw new AppException("战斗队列当前所处状态不能加速");
		}
		int second = battleJobQueue.getRemainTime();
		int minMinute = 9;//行军(目标为玩家间)时限制时间（分）
		int speedTime = 0;//加速时间（秒）
		boolean isMoney = false;
		if(status == Const.BATTLE_STATUS_TOWARD && battleJobQueue.getTargetType() == Const.TARGET_TYPE_CHAR){
			if(second <= minMinute*60){
				throw new AppException("行军队列到达目标地点时间低于"+minMinute+"分钟,不能加速");
			}else if(confim == 0){
				UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
				retMap = userItemService.spendWindow(Const.SPEND_FUNCTION_MARCH, characterId, second - minMinute*1000);
				retMap.put("RemainTime", second);//秒
				return retMap;
			}
			speedTime = characterService.saveSpeedNow(speedType,Const.SPEND_FUNCTION_MARCH, characterId, itemNo, second - minMinute*60);
			if(speedTime == -1){//直接秒cd
				Date newDate = TimeUtil.add(minMinute*60,new Date());
				battleJobQueue.setArrivingTime(newDate);
				updateBattelQueue(battleJobQueue);
				ExecuteBattleJob.modifyBattleJob(newDate,BATTLE_JOB_STRING+battleJobQueueId);
				speedTime = second - minMinute*60;
				isMoney = true;
			}
		}else{
			if(second <= 0){
				throw new AppException("行军队列已经到达目标地点,不能加速");
			}else if(confim == 0){
				UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
				retMap = userItemService.spendWindow(Const.SPEND_FUNCTION_MARCH, characterId, second);
				retMap.put("RemainTime", second);//秒
				return retMap;
			}
			speedTime = characterService.saveSpeedNow(speedType,Const.SPEND_FUNCTION_MARCH,characterId, itemNo, second);
			if(speedTime == -1){//直接秒cd
				//ExecuteBattleJob.modifyBattleJob(new Date(),BATTLE_JOB_STRING+battleJobQueueId);
				ExecuteBattleJob.doExecute(BATTLE_JOB_STRING+battleJobQueueId);
				speedTime = second;
				isMoney = true;
			}
		}
		if(!isMoney){
			Date newDate = null;
			if(status == Const.BATTLE_STATUS_TOWARD){
				newDate = TimeUtil.add(-speedTime,battleJobQueue.getArrivingTime());
				battleJobQueue.setArrivingTime(newDate);
			}else{
				newDate = TimeUtil.add(-speedTime, battleJobQueue.getBackArriveTime());
				battleJobQueue.setBackArriveTime(newDate);
			}
			updateBattelQueue(battleJobQueue);
			ExecuteBattleJob.modifyBattleJob(newDate, BATTLE_JOB_STRING+battleJobQueueId);
		}
		retMap = selectBattleQueue(characterId, page, searchType);
		retMap.put("speedTime", speedTime);
		retMap.put("remainTime", second-speedTime);
		retMap.put("state", "success");
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.USE_MARCH_SPEED_UP, null, characterId);
		return retMap;
	}
	/**
	 * 根据目标君主id和自己君主id以及战争类型查看所有军队队列信息（按时间升序排列（从小到大））
	 * @param targetId
	 * @param characterId
	 * @param battleType 战斗队列类型 -1表示忽略战斗队列类型
	 * @return
	 */
	public List<BattleJobQueue> getBattleByCidAndTargetId(int targetId, int characterId,int battleType){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("targetId", targetId);
		param.put("characterId", characterId);
		param.put("battleType", battleType);
		return battleDao.getBattleByCidAndTargetId(param);
	}
	/**
	 * 根据行军id查询该行军队伍中的武将数据列表
	 * @param battleId
	 * @param battleQueueId 
	 * @param confim 
	 * @return
	 * @throws AppException 
	 */
	public Object getbattleUserHero(int characterId, int battleQueueId,int confim) throws AppException {
		Map<String, Object> map = new HashMap<String, Object>();
		boolean viewAll = true;
		int otherCharacterId = 0;//对方军队拥有者的君主id
		int targetCharacterId = 0;//被围攻者君主的id
		String characterName = "";
		String formationName = "无";
		String formationNum = "";
		String heroList = "";
		BattleJobQueue battle = null;
		UserCharacter targetCharacter = null;
		if(battleQueueId < 0){
			otherCharacterId = -battleQueueId;
			targetCharacterId = -battleQueueId;
			WallDefensenService wallDefensenService = (WallDefensenService) ServiceLocator.getSpringBean("walldefService");
			UserWallHero wallHeros = wallDefensenService.getBaseWallHero(otherCharacterId);
	    	if(wallHeros != null){
	    		heroList = wallHeros.getHeroId();
	    		formationNum = wallHeros.getFormationNo();
	    	}
	    	targetCharacter = characterService.getCharacterById(otherCharacterId);
		}else{
			battle = battleDao.selectBattleQueueById(battleQueueId);
			if(battle == null){
				throw new AppException("队伍不存在,无法查看");
			}
			otherCharacterId = battle.getCharacterId();
			targetCharacterId = battle.getTargetId();
			targetCharacter = characterService.getCharacterById(otherCharacterId);
			heroList = battle.getHeroList();
			formationNum = battle.getFormationNo();
		}
		if(otherCharacterId != characterId){//不是自己的队伍
			/*if((battle.getStatus() < Const.BATTLE_STATUS_WAIT_FIGHT)){
				throw new AppException("队伍不在城郊,无法查看");
			}*/
			BattleSuburbService battleSuburbService = (BattleSuburbService) ServiceLocator.getSpringBean("battleSuburbServic");
			if(targetCharacterId != characterId && !battleSuburbService.getLimit(targetCharacterId, characterId, null).contains(Const.CANLOOK)){
				throw new AppException("你没有队伍在城郊,暂时无法查看");
			}
			UserCharacter character = characterService.getCharacterById(characterId);
			if(!characterService.isAlliance(character, targetCharacter)){
				//没有使用过侦查令牌
				if(BattleProcess.DETECTMAP.get(character.getId()) == null || !BattleProcess.DETECTMAP.get(character.getId()).contains(battleQueueId)){
					viewAll = false;
					if(confim == 1){
						//消耗道具
						UserItemService  userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
						if(userItemService.useOneItem(Const.BATTLE_DETECT, characterId)){
							if(BattleProcess.DETECTMAP.get(character.getId()) == null){
								BattleProcess.DETECTMAP.put(character.getId(), new ArrayList<Integer>());
							}
							BattleProcess.DETECTMAP.get(character.getId()).add(battleQueueId);
							viewAll = true;
							map.put("msg","消耗一个侦察令");
						}else{
							throw new AppException("侦查失败,缺少侦察令");
						}
					}
				}
			}
			
		}
    	UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
    	map.put("heroList", userHeroService.getHeroByHeroIdStr(otherCharacterId,heroList,viewAll));
    	characterName = targetCharacter.getName();
    	map.put("characterName", characterName);
    	StaticFormation formation = FormationCache.getFormationByNo(formationNum);
		if(formation != null){
			formationName = formation.getName();
		}
    	map.put("formationName", formationName);
    	if(viewAll){
    		map.put("status", 0);
    	}else{
    		map.put("status", 1);
    	}
    	return map;
	}
	/**
	 * 撤退军队
	 * @param battleQueueId
	 * @param characterId
	 * @param isIgnoreStatus 是否忽略军队状态强制撤退
	 * @return
	 * @throws AppException 
	 */
	public Map<String, Object> retreatBattleQueue(int battleQueueId, int characterId,boolean isIgnoreStatus) throws AppException {
		BattleJobQueue battleJobQueue = selectBattleQueueById(battleQueueId);
		if(battleJobQueue==null||battleJobQueue.getCharacterId()!=characterId){
			throw new AppException("战斗队列不存在");
		}
		Map<String, Object> retMap = new HashMap<String, Object>();
		int status = battleJobQueue.getStatus();
		Date date = new Date();
		switch (status) {
		case Const.BATTLE_STATUS_TOWARD:
			battleJobQueue.setBackTime(date);
			battleJobQueue.setBackArriveTime(new Date(2*date.getTime()-battleJobQueue.getGoTime().getTime()));
			battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
			updateBattelQueue(battleJobQueue);
			Map<String, Object> data = new HashMap<String,Object>();
			data.put("battleData", battleJobQueue);
			ExecuteBattleJob.deleteBattleJob(BATTLE_JOB_STRING+battleQueueId);
			ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data, battleJobQueue.getBackArriveTime(), BATTLE_JOB_STRING+battleQueueId);
			retMap.put("status", "succ");
			return retMap;
		case Const.BATTLE_STATUS_WAIT:
			battleJobQueue.setBackTime(date);
			battleJobQueue.setBackArriveTime(TimeUtil.add(battleJobQueue.getNeedTime(), date));
			battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
			updateBattelQueue(battleJobQueue);
			data = new HashMap<String,Object>();
			data.put("battleData", battleJobQueue);
			ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data, battleJobQueue.getBackArriveTime(), BATTLE_JOB_STRING+battleQueueId);
			retMap.put("status", "succ");
			return retMap;
		case Const.BATTLE_STATUS_BACK:
			throw new AppException("部队已经再返回途中");
		case Const.BATTLE_STATUS_WAIT_FIGHT:
			battleJobQueue.setBackTime(date);
			battleJobQueue.setBackArriveTime(TimeUtil.add(battleJobQueue.getNeedTime(), date));
			battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
			updateBattelQueue(battleJobQueue);
			data = new HashMap<String,Object>();
			data.put("battleData", battleJobQueue);
			ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data, battleJobQueue.getBackArriveTime(), BATTLE_JOB_STRING+battleQueueId);
			//清除相关战场数据
			BattleProcess.clearBattleFeildDataByBattleQueue(battleJobQueue);
			retMap.put("status", "succ");
			retMap.put("ishere", BattleProcess.isHavingMoreByBattleQueue(battleJobQueue));
			return retMap;
		case Const.BATTLE_STATUS_FIGHTING:
			if(!isIgnoreStatus){
				throw new AppException("正在战斗中的部队不能撤退");
			}
			battleJobQueue.setBackTime(date);
			battleJobQueue.setBackArriveTime(TimeUtil.add(battleJobQueue.getNeedTime(), date));
			battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
			updateBattelQueue(battleJobQueue);
			data = new HashMap<String,Object>();
			data.put("battleData", battleJobQueue);
			ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data, battleJobQueue.getBackArriveTime(), BATTLE_JOB_STRING+battleQueueId);
			if(battleJobQueue.getTargetType() == Const.TARGET_TYPE_CHAR){
				//清除相关战场数据
				BattleProcess.clearBattleFeildDataByBattleQueue(battleJobQueue);
			}
			retMap.put("status", "succ");
			return retMap;
		default:
			throw new AppException("返回状态异常");
		}
	}
	/**
	 * 该资源是否能采集及采集信息
	 * @param x
	 * @param y
	 * @throws AppException 
	 * @throws SQLException 
	 */
	public Map<String, Object> isCollection(int characterId,int x,int y) throws AppException, SQLException{
		DataPack dp = WorldService.getResource(x,y);
		if(dp == null){
			throw new AppException("该位置没有资源");
		}
		if(dp.getStatus()!=0){
			throw new AppException("该资源已经被开采");
		}
		Map<String,Object> retMap = new HashMap<String,Object>();
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		DataEntity dataEntity =WorldDao.getDataEntityByXY(x, y);
		UserCharacter userCharacter=characterService.getCharacterById(characterId);
		Maincity maincity = maincityService.getBaseInfo(characterId);
		int maincityX =maincity.getX();
		int maincityY = maincity.getY();
		int distance = Math.abs(maincityX - x)+Math.abs(maincityY-y);//物理距离
		long second = 0;
		if(dataEntity.getCt()==userCharacter.getCountryId()){
			second =  (long) Math.ceil((600+35000*Math.pow((distance/792), 1.66)));
		}else{
			second =  (long) Math.ceil((7200+80000*Math.pow(distance/1648, 1.66)));
		}
		retMap.put("resourceName", dp.getStaticWorldResource().getName());
		retMap.put("time", second*1000);
		return retMap;
	}
	/**
	 * 验证武将是否合法
	 * @param userHero
	 * @throws AppException 
	 */
	public boolean verificationHero(int characterId ,int heroId) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, heroId);
		if(userHero.getHeroStatus()!=Const.HERO_STATUS_FREE){
			throw new AppException("该武将处于繁忙状态，无法指派");
		}
		if(userHero.getStamina()<15){
			throw new AppException("武将的体力值不足");
		}
		return true;
	}
	/**
	 * 采集相关
	 * @return 
	 * @throws AppException 
	 * @throws SQLException 
	 */
	public Map<String, Object> collection(int characterId,String heroId,int x,int y) throws AppException, SQLException{
		DataPack dp = WorldService.getResource(x,y);
		if(dp.getStatus()!=0){
			throw new AppException("该资源已经被开采");
		}
		StaticWorldResource staticWorldResource = dp.getStaticWorldResource();
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> building = buildingService.getbBuildingByPrefix(characterId, Const.PROCESS_BUILDING_NO_PREFIX);//获取加工坊建筑
		StaticBuilding staticBuilding =BuildingCache.getBuildingEntityByNo(building.get(0).getBuildingNo());
		int needLevel = (int) staticBuilding.getFunctionvalue1();
		if(staticWorldResource.getLevel()>needLevel){
			throw new AppException("你不能采集该资源，请提升加工坊等级");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		UserHeroService us = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
		UserCharacter mine = characterService.getCharacterById(characterId);
		DataEntity dataEntity =WorldDao.getDataEntityByXY(x, y);
		UserCharacter userCharacter=characterService.getCharacterById(characterId);
		Maincity maincity = maincityService.getBaseInfo(characterId);
		int maincityX =maincity.getX();
		int maincityY = maincity.getY();
		int distance = Math.abs(maincityX - x)+Math.abs(maincityY-y);//物理距离
		@SuppressWarnings("unused")
		long second = 0;
		if(dataEntity.getCt()==userCharacter.getCountryId()){
			second =  (long) Math.ceil((600+35000*Math.pow((distance/792), 1.66)));
		}else{
			second =  (long) Math.ceil((7200+80000*Math.pow(distance/1648, 1.66)));
		}
		long d = System.currentTimeMillis()+20*1000;
		Date date = new Date(d);
		BattleJobQueue battleJobQueue = new BattleJobQueue();
		battleJobQueue.setCharacterId(characterId);
		battleJobQueue.setCharacterName(mine.getName());
		battleJobQueue.setBattleType(Const.BATTLE_TYPE_GET_RESOURCE);
		battleJobQueue.setHeroList(heroId);
		battleJobQueue.setTargetType(Const.TARGET_TYPE_RESOURCE);
		battleJobQueue.setStatus(Const.BATTLE_STATUS_TOWARD);
		battleJobQueue.setGoTime(new Date());
		battleJobQueue.setArrivingTime(date);
		battleJobQueue.setTargetNo(staticWorldResource.getMaterial_no());
		battleJobQueue.setTargetName(staticWorldResource.getName());
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("battleData", battleJobQueue);
		data.put("x", x);
		data.put("y", y);
		us.updateHeroStatus(characterId, Integer.parseInt(heroId), Const.HERO_STATUS_FIGHTING);//更新武将状态
		insertBattelQueue(battleJobQueue);// 插入数据库
		dp.setStatus(1);
		ExecuteJob.add(ReadyToBattleJob.class, data, d, BATTLE_JOB_STRING+"collection"+Const.BATTLE_STATUS_TOWARD+x+y);
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("data", dp);
		retMap.put("time", d-System.currentTimeMillis());
		return retMap;
	}
	
	public CharacterService getCharacterService() {
		return characterService;
	}
	public void setCharacterService(CharacterService characterService) {
		this.characterService = characterService;
	}
	public CharacterDao getCharacterDao() {
		return characterDao;
	}
	public void setCharacterDao(CharacterDao characterDao) {
		this.characterDao = characterDao;
	}
	/**
	 * 解散行军队伍
	 * @param battle
	 */
	public void dissolveBattleQueue(BattleJobQueue battle){
		if(battle == null){
			return;
		}
		deleteBattelQueue(battle);
		UserHeroService us = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
		String[] userHeroIds = battle.getHeroList().split(",");
		int characterId = battle.getCharacterId();
		for (String h : userHeroIds) {
			int userHeroId = Integer.parseInt(h);
			if (userHeroId == 0) {
				continue;
			} else {
				us.updateHeroStatus(characterId, userHeroId, Const.HERO_STATUS_FREE);
			}
		}
	}
	/**
	 * 根据被围攻城主ID获得城郊外等待队列军队简介
	 * @param characterId
	 * @param targetId 
	 * @return
	 * @throws AppException 
	 */
	public Object getWaitBattleInfo(int characterId, int targetId) throws AppException {
		if(characterId != targetId){
			BattleSuburbService battleSuburbService = (BattleSuburbService) ServiceLocator.getSpringBean("battleSuburbServic");
			if(!battleSuburbService.getLimit(targetId, characterId, null).contains(Const.CANLOOK)){
				throw new AppException("你没有队伍在城郊,暂时无法查看");
			}
		}
		List<Map<String,Object>> defence = BattleProcess.getWaitBattleJobQueueByType(targetId, Const.BATTLE_CAMP_FRIEND);
		List<Map<String,Object>> attack = BattleProcess.getWaitBattleJobQueueByType(targetId, Const.BATTLE_CAMP_ENEMY);
		List<Map<String,Object>> allBattlist = new ArrayList<Map<String,Object>>();
		allBattlist.addAll(attack);
		allBattlist.addAll(defence);
		return allBattlist;
	}
	/**
	 * 根据状态获得所有军情
	 * @param status
	 * @return
	 */
	public List<BattleJobQueue> getAllBattleQueueByStatus(int status){
		return battleDao.selectAllBattleQueueByStatus(status);
	}
}
