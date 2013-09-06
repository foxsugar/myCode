package com.crystalcg.gamedev.quest.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.alliance.domain.Alliance;
import com.crystalcg.gamedev.alliance.service.AllianceService;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.buildingFunction.service.CollegeService;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.domain.UserQuests;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.dao.QuestDao;
import com.crystalcg.gamedev.quest.domain.Quest;
import com.crystalcg.gamedev.quest.domain.QuestStore;
import com.crystalcg.gamedev.quest.domain.UserDailyRecord;
import com.crystalcg.gamedev.resource.service.ResourceService;
import com.crystalcg.gamedev.tech.service.FormationTechService;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.tech.service.SoldierTechService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.RandomFunc;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.TimeUtil;
import com.crystalcg.gamedev.util.cache.QuestCache;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;
import com.crystalcg.gamedev.util.cache.domain.StaticQuest;

/**
 * 任务逻辑
 * @author jinganyang
 *
 */
public class QuestService {
	private static final int DAILY_QUEST_REPUTATION = 0;
	private static final int DAILY_QUEST_HERO = 1;
	//当前任务缓存
	public static Map<Integer, Map<Integer, List<QuestStore>>> QUEST_CACHE = new HashMap<Integer, Map<Integer, List<QuestStore>>>();
	//日常任务记录缓存
	public static Map<Integer, Map<Integer,Boolean>> QUEST_RECORD_CACHE = new HashMap<Integer, Map<Integer,Boolean>>();
	private QuestDao questDao;
	

	public void initUserQuestForNew(int characterId) throws AppException{
//		List<Quest> quests = questDao.getAllUserQuest(characterId);
		//新账号
			//插入根任务
		Quest rootQuest = new Quest(characterId, QuestCache.ROOT_QUEST, QuestCache.QUEST_STATUS_UNCOMPLETED);
		questDao.insertUserQuest(rootQuest);
//		setUserTarget(characterId, rootQuest);
//		insertQuestTypeIntoCache(characterId, rootQuest);
		//插入日常任务
		addDailyQuest(characterId,DAILY_QUEST_HERO);
		//插入声望任务
		addDailyQuest(characterId,DAILY_QUEST_REPUTATION);
		//插入日常记录
		questDao.insertDailyRecord(characterId);
	}
	
	public void initUserQuest(int characterId){
		setUserQuestIntoCache(characterId);
		setQuestRecordIntoCache(characterId);
	}
	public Quest getSpecficQuest(int characterId, int questId){
		Quest quest = questDao.getUserQuestById(questId, characterId);
		return quest;
	}
	//获取玩家当前任务
	/**
	 * 获取玩家当前任务
	 * @param characterId
	 * @return
	 */
	public Map<String, List<Map<String, Object>>> getUserQuest(int characterId) throws AppException{
		UserDailyRecord userDailyRecord = questDao.getDailyRecord(characterId);
		if(userDailyRecord==null){//老账号特殊处理，以后不用
			insertQuest(characterId, QuestCache.ROOT_QUEST);
			questDao.insertDailyRecord(characterId);
			Quest reputation = addDailyQuest(characterId, DAILY_QUEST_REPUTATION);
			Quest hero = addDailyQuest(characterId, DAILY_QUEST_HERO);
			
			insertQuestTypeIntoCache(characterId, reputation);
			insertQuestTypeIntoCache(characterId, hero);
			userDailyRecord = questDao.getDailyRecord(characterId);
		}
		List<Quest> quests = questDao.getAllUserQuest(characterId);
		return classifyUserQuest(quests, characterId,userDailyRecord);
	}
	/**
	 * 获取玩家当前任务
	 * @param characterId
	 * @return
	 */
	public Map<String, List<Map<String, Object>>> getUserQuestForIndex(int characterId) throws AppException{
		UserDailyRecord userDailyRecord = questDao.getDailyRecord(characterId);
		if(userDailyRecord==null){//老账号特殊处理，以后不用
			insertQuest(characterId, QuestCache.ROOT_QUEST);
			questDao.insertDailyRecord(characterId);
			Quest reputation = addDailyQuest(characterId, DAILY_QUEST_REPUTATION);
			Quest hero = addDailyQuest(characterId, DAILY_QUEST_HERO);
			
			insertQuestTypeIntoCache(characterId, reputation);
			insertQuestTypeIntoCache(characterId, hero);
			userDailyRecord = questDao.getDailyRecord(characterId);
		}
		List<Quest> quests = questDao.getAllUserQuest(characterId);
		return classifyUserQuest(quests, characterId,userDailyRecord);
	}
	private void insertQuest(int characterId, String questNo) throws AppException{
		Quest quest = new Quest(characterId, questNo, QuestCache.QUEST_STATUS_UNCOMPLETED);
		boolean result = setUserTarget(characterId, quest);
		if(result){
			quest.setStatus(QuestCache.QUEST_STATUS_COMPLETED);
		}
		questDao.insertUserQuest(quest);
		insertQuestTypeIntoCache(characterId, quest);//任务写入缓存
	}
	private Map<String, List<Map<String, Object>>> classifyUserQuest(List<Quest> quests, int characterId, UserDailyRecord userDailyRecord) throws AppException{
		Map<String, List<Map<String, Object>>> retMap = new HashMap<String, List<Map<String,Object>>>();
		retMap.put("mainQuest", new ArrayList<Map<String, Object>>());
		retMap.put("branchQuest", new ArrayList<Map<String, Object>>());
		retMap.put("reputationQuest", new ArrayList<Map<String, Object>>());
		retMap.put("heroQuest", new ArrayList<Map<String, Object>>());
		retMap.put("activityQuest", new ArrayList<Map<String, Object>>());
//		Map<Integer, QuestSchedule> scheduleMap = new HashMap<Integer, QuestSchedule>();
//		List<QuestSchedule> questSchedules = questDao.getAllQuestSchedule(characterId);
//		for(QuestSchedule i:questSchedules){
//			scheduleMap.put(i.getQuestId(), i);
//		}
		for(Quest i: quests){
			if(i.getStatus()!=QuestCache.QUEST_STATUS_UNACTIVATED){
				putIntoMap(retMap, i);
			}
			
		}
	
		boolean isNotSameDay = !TimeUtil.isSameDay(userDailyRecord.getUpdateDate());
		if(retMap.get("reputationQuest").isEmpty()&&isNotSameDay){
			Quest reputation = addDailyQuest(characterId, DAILY_QUEST_REPUTATION);
			retMap.get("reputationQuest").add(changeQuestIntoMap(reputation));
			if(reputation.getStatus()==QuestCache.QUEST_STATUS_UNCOMPLETED){
				insertQuestTypeIntoCache(characterId, reputation);
			}
		}
		if(retMap.get("heroQuest").isEmpty()&&isNotSameDay){
			Quest hero = addDailyQuest(characterId, DAILY_QUEST_HERO);
			retMap.get("reputationQuest").add(changeQuestIntoMap(hero));
			if(hero.getStatus()==QuestCache.QUEST_STATUS_UNCOMPLETED){
				insertQuestTypeIntoCache(characterId, hero);
			}
		}
		if(isNotSameDay){
			userDailyRecord.setHeroAmount(0);
			userDailyRecord.setReputationAmount(0);
			questDao.updateDailyRecord(userDailyRecord);
		}
		return retMap;
	}
	private final void putIntoMap(Map<String, List<Map<String, Object>>> retMap, Quest i){
//		Map<String, Object> temp = new HashMap<String, Object>();
//		
//		temp.put("id", i.getId());
//		temp.put("questName", staticQuest.getQuestName());
		switch (i.getQuestType()) {
		case QuestCache.QUEST_TYPE_MAIN:
			retMap.get("mainQuest").add(changeQuestIntoMap(i));
			break;
		case QuestCache.QUEST_TYPE_BRANCH:
			retMap.get("branchQuest").add(changeQuestIntoMap(i));
			break;
		case QuestCache.QUEST_TYPE_REPUTATION:
			retMap.get("reputationQuest").add(changeQuestIntoMap(i));
			break;
		case QuestCache.QUEST_TYPE_HERO:
			retMap.get("heroQuest").add(changeQuestIntoMap(i));
			break;
		case QuestCache.QUEST_TYPE_ACTIVITY:
			retMap.get("activityQuest").add(changeQuestIntoMap(i));
			break;

		default:
			break;
		}
	}
	private Map<String, Object> changeQuestIntoMap(Quest i){
		Map<String, Object> retMap = new HashMap<String, Object>();
		StaticQuest staticQuest = QuestCache.getQuestsByNo(i.getQuestNo());
//		if(staticQuest == null){
//			System.err.println("不存在该任务静态数据");
//			retMap.put("id", i.getId());
//			retMap.put("questName", "无");
//			return retMap;
//		}
		retMap.put("id", i.getId());
		retMap.put("questName", staticQuest.getQuestName());
		retMap.put("targetDesc", staticQuest.getTargetDesc());
		retMap.put("targetAmount", i.getTargetAmount());
		retMap.put("targetNeedAmount", staticQuest.getTargetNum());
		retMap.put("status", i.getStatus());
		return retMap;
	}
	//任务领取
	/**
	 * 任务领取
	 * @param characterId
	 * @param staticQuest已完成的任务静态数据
	 * @throws AppException 
	 */
	public void addNewQuest(int characterId, StaticQuest staticQuest) throws AppException{
		List<StaticQuest> staticQuests = QuestCache.getCommonQuestByNeedNo(staticQuest.getQuestNo());
		if(staticQuests==null){
			return ;
		}
		for(StaticQuest i:staticQuests){
//			addQuest(i, character.getLevel(), maincity.getLevel(), characterId);
			insertQuest(characterId, i.getQuestNo());
		}
	}
//	private void addQuest(StaticQuest i, int charLevel, int cityLevel, int characterId) throws AppException{
//		int needLevel = 0;
//		if(i.getNeedType()==QuestCache.QUEST_NEED_TYPE_CHARACTER_LEVEL){
//			needLevel = charLevel;
//		}else if(i.getNeedType()==QuestCache.QUEST_NEED_TYPE_CITY_LEVEL){
//			needLevel = cityLevel;
//		}else{
//			return;
//		}
//		if(needLevel<i.getNeedValue()){
//			Quest quest = new Quest(characterId, i.getQuestNo(), QuestCache.QUEST_STATUS_UNACTIVATED);
//			questDao.insertUserQuest(quest);
//		}else{
//			insertQuest(characterId, i.getQuestNo());
//		}
//	}
	//取玩家身上所有任务放入缓存
	public Map<Integer,List<QuestStore>> setUserQuestIntoCache(int characterId){
		Map<Integer,List<QuestStore>> userQuestMap = new HashMap<Integer, List<QuestStore>>();
		QUEST_CACHE.put(characterId, userQuestMap);
		List<Quest> questList = questDao.getAllUserQuest(characterId);
		for(Quest i:questList){
			if(i.getStatus()!=QuestCache.QUEST_STATUS_UNACTIVATED){
				StaticQuest staticQuest = i.getStaticQuest();
				if(userQuestMap.get(staticQuest.getTargetType())==null){
					List<QuestStore> questStores = new CopyOnWriteArrayList<QuestStore>();
					questStores.add(new QuestStore(i.getId(), i.getQuestNo()));
					userQuestMap.put(staticQuest.getTargetType(), questStores);
				}else{
					userQuestMap.get(staticQuest.getTargetType()).add(new QuestStore(i.getId(), i.getQuestNo()));
				}
			}
		}
		return userQuestMap;
	}
	/**
	 * 判断用户是否已生成缓存,用于联盟特殊处理
	 * @param characterId
	 * @return
	 */
	public boolean isUserQuestCacheExist(int characterId){
		if(QUEST_CACHE.get(characterId)==null){
			return false;
		}else{
			return true;
		}
	}
	public Map<Integer,List<QuestStore>> getUserQuestCache(int characterId){
		if(QUEST_CACHE.get(characterId)==null){
			return setUserQuestIntoCache(characterId);
		}else{
			return QUEST_CACHE.get(characterId);
		}
	}
	public boolean isUserHaveTypeQuest(int characterId, int targetType){
		Map<Integer,List<QuestStore>> userMap = getUserQuestCache(characterId);
		if(userMap.get(targetType)!=null){
			return true;
		}else{
			return false;
		}
	}
	public void insertQuestTypeIntoCache(int characterId, Quest quest){
		Map<Integer,List<QuestStore>> userMap = getUserQuestCache(characterId);
		int type = quest.getStaticQuest().getTargetType();
		if(userMap.get(type)==null){
			List<QuestStore> temp = new LinkedList<QuestStore>();
			temp.add(new QuestStore(quest.getId(), quest.getQuestNo()));
			userMap.put(type, temp);
		}else{
			userMap.get(quest.getStaticQuest().getTargetType()).add(new QuestStore(quest.getId(), quest.getQuestNo()));
		}
	}
	public void deleteQuestType(int characterId, Quest quest){
		Map<Integer,List<QuestStore>> userMap = getUserQuestCache(characterId);
		int type = quest.getStaticQuest().getTargetType();
		if(userMap.get(type)!=null){
			int index = 0;
			for(QuestStore i:userMap.get(type)){
				if(i.getQuestId()==quest.getId()){
					userMap.get(type).remove(index);
					break;
				}
				index++;
			}
		}
	}
	/**
	 * 获取所有玩家记录，并放入缓存
	 * @param characterId
	 * @return
	 */
	public Map<Integer,Boolean> setQuestRecordIntoCache(int characterId){
		Map<Integer,Boolean> recordMap = new HashMap<Integer, Boolean>();
		QUEST_RECORD_CACHE.put(characterId, recordMap);
		List<Integer> questRecord = questDao.getAllQuestRecord(characterId);
		for(int i:questRecord){
			recordMap.put(i, true);
		}
		return recordMap;
	}
	public Map<Integer,Boolean> getQuestRecordCache(int characterId){
		if(QUEST_RECORD_CACHE.get(characterId)==null){
			return setQuestRecordIntoCache(characterId);
		}else{
			return QUEST_RECORD_CACHE.get(characterId);
		}
	}
	public boolean isUserHaveCompleteQuest(int characterId, int targetType){
		Map<Integer,Boolean> userMap = getQuestRecordCache(characterId);
		if(userMap.get(targetType)!=null){
			return true;
		}else{
			return false;
		}
	}
	public void insertQuestRecordIntoCache(int characterId, int type){
		Map<Integer,Boolean> userMap = getQuestRecordCache(characterId);
		if(userMap.get(type)==null){
			userMap.put(type, true);
		}
	}
	//任务置换
	//任务提交
	public void submitQuest(int characterId, int questId) throws AppException{
		Quest quest = questDao.getUserQuestById(questId, characterId);
		if(quest==null){
			throw new AppException("要提交的任务不存在");
		}
		if(quest.getStatus()!=QuestCache.QUEST_STATUS_COMPLETED){
			throw new AppException("任务没有处于完成状态");
		}
		if(quest.getQuestType()==QuestCache.QUEST_TYPE_MAIN||quest.getQuestType()==QuestCache.QUEST_TYPE_BRANCH){//主，支线任务处理
			//开启新任务
			addNewQuest(characterId, quest.getStaticQuest());
		}else if(quest.getQuestType()==QuestCache.QUEST_TYPE_HERO){//武将日常任务处理
			UserDailyRecord userDailyRecord = questDao.getDailyRecord(characterId);
			if(userDailyRecord.getHeroAmount()<QuestCache.MAX_DAILY_AMOUNT){
				Quest hero = addDailyQuest(characterId, DAILY_QUEST_HERO);
//				if(hero.getStatus()==QuestCache.QUEST_STATUS_UNCOMPLETED){
//				}
				insertQuestTypeIntoCache(characterId, hero);
			}
		}else if(quest.getQuestType()==QuestCache.QUEST_TYPE_REPUTATION){//声望日常任务处理
			UserDailyRecord userDailyRecord = questDao.getDailyRecord(characterId);
			if(userDailyRecord.getHeroAmount()<QuestCache.MAX_DAILY_AMOUNT){
				Quest reputation = addDailyQuest(characterId, DAILY_QUEST_REPUTATION);
//				if(reputation.getStatus()==QuestCache.QUEST_STATUS_UNCOMPLETED){
//				}
				insertQuestTypeIntoCache(characterId, reputation);
			}
		}
		//删除任务和进度
		questDao.deleteUserQuest(quest.getId());
		deleteQuestType(characterId, quest);//删除缓存
//		questDao.deleteQuestSchedule(quest.getId());
		//删除相关物品
		//获得任务奖励
		
	}
	//更新任务进度
	private void updateScheduleWithoutRecord(int targetType, String targetNo, int characterId){
		Map<Integer, List<QuestStore>> userQuest = getUserQuestCache(characterId);
		if(userQuest.get(targetType)==null){
			return;
		}
		//获取需要更新的任务
		List<QuestStore> questNeedUpdate = new ArrayList<QuestStore>();
		for(QuestStore i:userQuest.get(targetType)){
			if(i.getStaticQuest().getTargetStr()==null){
				questNeedUpdate.add(i);
			}else if(i.getStaticQuest().getTargetStr().equals(targetNo)){
				questNeedUpdate.add(i);
			}
		}
		try {
			//更新任务
			for(QuestStore i:questNeedUpdate){
				Quest quest = questDao.getUserQuestById(i.getQuestId(), characterId);
				//更新进度并判断是否完成任务
				boolean isComplete = setUserTarget(characterId, quest);
				if(isComplete){
//					userQuest.get(targetType).remove(i);//完成删除缓存
					questDao.updateQuestStatus(i.getQuestId(), QuestCache.QUEST_STATUS_COMPLETED);
				}else{
					questDao.updateQuestStatus(i.getQuestId(), QuestCache.QUEST_STATUS_UNCOMPLETED);
					
				}
				questDao.updateQuestSchedule(quest);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println(e);
		}
	}
	//开启未激活任务
	public void activateQuest(int characterId, int level) throws AppException{
		List<Quest> quests = questDao.getUserQuestByStatus(characterId, QuestCache.QUEST_STATUS_UNACTIVATED);
		List<Quest> updateQuestList = new ArrayList<Quest>();
		for(Quest i:quests){
			StaticQuest staticQuest = QuestCache.getQuestsByNo(i.getQuestNo());
			if(staticQuest.getNeedValue()>level){
				continue;
			}else{
				boolean result = setUserTarget(characterId, i);
				if(result){
					i.setStatus(QuestCache.QUEST_STATUS_COMPLETED);
				}else{
					i.setStatus(QuestCache.QUEST_STATUS_UNCOMPLETED);
				}
				updateQuestList.add(i);
			}
		}
		for(Quest i:updateQuestList){
			questDao.updateQuestStatus(i.getId(),i.getStatus());
		}
		for(Quest i:updateQuestList){
			questDao.updateQuestSchedule(i);
		}
		for(Quest i:updateQuestList){
			insertQuestTypeIntoCache(characterId, i);
		}
	}
	
	
	private boolean setUserTarget(int characterId, Quest quest) throws AppException{
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		switch (staticQuest.getTargetType()) {
		case QuestTargeType.MULTI_FIGHT_ENEMY://讨伐敌人
			
			return figthEnemy(characterId, quest);
			
		case QuestTargeType.EQUIPMENT_COLLECT://收集装备
			
			return equipmentCollect(characterId, quest);
			
		case QuestTargeType.ITEM_COLLECT://收集消耗品
			
			return itemCollect(characterId, quest);
			
		case QuestTargeType.MATERIAL_COLLECT://收集材料
			
			return materialCollect(characterId, quest);
			
		case QuestTargeType.QUESTS_COLLECT://收集任务物品
			
			return questCollect(characterId, quest);
			
		case QuestTargeType.SINGLE_FIGHT_ENEMY://单挑敌人
			
			return figthEnemy(characterId, quest);
			
		case QuestTargeType.CHARACTER_LEVEL://君主等级达到
			
			return characterLevel(characterId, quest);
			
		case QuestTargeType.BUILDING_LEVEL://等级达到的建筑个数
			
			return buildingLevel(characterId, quest);
			
		case QuestTargeType.MAX_MULTI_FORCE://最高战力达到,暂时不做
			
			return maxForce(characterId, quest);
			
		case QuestTargeType.JOIN_ALLIANCE://加入联盟
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.JOIN_ALLIANCE);
			
		case QuestTargeType.ALLIANCE_LEVEL://所在联盟等级达到
			
			return allianceLevel(characterId, quest);
			
		case QuestTargeType.TOTAL_SOLDIER_AMOUNT://兵力达到
			
			return soldierAmount(characterId, quest);
			
		case QuestTargeType.WALL_DEFENCE_AMOUNT://城防总数目达到
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.CITY_LEVEL://城池等级达到
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.TECH_POINT://消耗科技点数
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.HERO_SKILL_LEVEL://武将技能等级
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.HERO_SKILL_AMOUNT://拥有技能数最多的武将的技能数量
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.EMBED_GEMSTONE:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.EMBED_GEMSTONE);
			
		case QuestTargeType.FUSE_ARTICAL:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.FUSE_ARTICAL);
			
		case QuestTargeType.EQUIPMENT_STRENGTHEN:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.EQUIPMENT_STRENGTHEN);

		case QuestTargeType.EQUIPMENT_PRODUCE:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.EQUIPMENT_PRODUCE);

		case QuestTargeType.HERO_EMPLOY:
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.CONFIG_SOLDIER:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.CONFIG_SOLDIER);

		case QuestTargeType.USE_WORLD_CHAT:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.USE_WORLD_CHAT);

		case QuestTargeType.HERO_USE_EQUIPMENT:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.HERO_USE_EQUIPMENT);

		case QuestTargeType.USE_MARCH_SPEED_UP:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.USE_MARCH_SPEED_UP);

		case QuestTargeType.ADD_FRIEND:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.ADD_FRIEND);

//		case QuestTargeType.WALL_DEFENCE:
//			
//			return setTargetWithRecord(characterId, quest, QuestTargeType.WALL_DEFENCE);

		case QuestTargeType.CURE_HERO:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.CURE_HERO);

		case QuestTargeType.ADD_HERO_POINT:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.ADD_HERO_POINT);

		case QuestTargeType.ADD_CHARACTER_POINT:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.ADD_CHARACTER_POINT);

		case QuestTargeType.APPOINT_HERO_RANK:
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.USE_HERO_MISSION:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.USE_HERO_MISSION);
			
		case QuestTargeType.USE_ALLIANCE_DONATE:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.USE_ALLIANCE_DONATE);
		case QuestTargeType.PLAN_FOOD_AMOUNT:
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.PLAN_STONE_AMOUNT:
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.PLAN_IRONORE_AMOUNT:
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.PLAN_WOOD_AMOUNT:
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.NEW_SOLDIER_AMOUNT:
			
			return updateQuestSchedulesByNewSolier(characterId, quest,staticQuest.getTargetType());
		case QuestTargeType.CONFIG_WALL_DEFENCE_HERO:
			
			return setTargetWithRecord(characterId, quest, QuestTargeType.CONFIG_WALL_DEFENCE_HERO);

		default:
			break;
		}
		return false;
	}
	/**
	 * 验证任务目标类型完成数量
	 * @param characterId 
	 * @param quest 
	 * @param targetType 目标类型 
	 * @return
	 * @throws AppException 
	 */
	private boolean updateQuestSchedulesByNewSolier(int characterId, Quest quest, int targetType) throws AppException {
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		int nowCount = 0;
		int targetNum = Integer.valueOf(staticQuest.getTargetNum());
		
		if(targetType == QuestTargeType.NEW_SOLDIER_AMOUNT){
			MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
			nowCount = maincityService.getSoldierInfo(characterId).getNewSoldier();//从数据库
		}else if(targetType == QuestTargeType.PLAN_WOOD_AMOUNT){
			ResourceService resourceService = (ResourceService)ServiceLocator.getSpringBean("resourceService");
			nowCount = resourceService.getUsedFieldByType(characterId, Const.RESOURCE_TYPE_WOOD);//从数据库
		}else if(targetType == QuestTargeType.PLAN_FOOD_AMOUNT){
			ResourceService resourceService = (ResourceService)ServiceLocator.getSpringBean("resourceService");
			nowCount = resourceService.getUsedFieldByType(characterId, Const.RESOURCE_TYPE_FOOD);//从数据库
		}else if(targetType == QuestTargeType.PLAN_STONE_AMOUNT){
			ResourceService resourceService = (ResourceService)ServiceLocator.getSpringBean("resourceService");
			nowCount = resourceService.getUsedFieldByType(characterId, Const.RESOURCE_TYPE_STONE);//从数据库
		}else if(targetType == QuestTargeType.PLAN_IRONORE_AMOUNT){
			ResourceService resourceService = (ResourceService)ServiceLocator.getSpringBean("resourceService");
			nowCount = resourceService.getUsedFieldByType(characterId, Const.RESOURCE_TYPE_IRONORE);//从数据库
		}else if(targetType == QuestTargeType.APPOINT_HERO_RANK){
			UserHeroService userHeroService = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
			nowCount = userHeroService.getRankUserHero(characterId).size();//从数据库
		}else if(targetType == QuestTargeType.HERO_EMPLOY){
			UserHeroService userHeroService = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
			nowCount = userHeroService.getUserHeroName(characterId).size();//从数据库
		}else if(targetType == QuestTargeType.HERO_SKILL_AMOUNT){
			UserHeroService userHeroService = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
			for(Map<String,Object> uh :userHeroService.getUserHeroName(characterId)){
				int skillNum = userHeroService.getHeroSkill(characterId, (Integer)uh.get("value")).size();
				if(skillNum > nowCount){
					nowCount = skillNum;
				}
			}
		}else if(targetType == QuestTargeType.HERO_SKILL_LEVEL){
			UserHeroService userHeroService = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
			CollegeService collegeService = (CollegeService)ServiceLocator.getSpringBean("collegeService");
			for(Map<String,Object> uh :userHeroService.getUserHeroName(characterId)){
				List<StaticHeroSkill> skillList = collegeService.getUserHeroSkill(characterId, (Integer)uh.get("value"));
				for(StaticHeroSkill skill:skillList){
					if(skill.getLevel() > nowCount){
						nowCount = skill.getLevel();
					}
				}
			}
		}else if(targetType == QuestTargeType.TECH_POINT){
			MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
			CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
			UserCharacter character = characterService.getCharacterById(characterId);
			if("1".equals(staticQuest.getTargetStr())){//内政
				InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
				nowCount = interiorTechService.getTechPoint(characterId);
			}else if("2".equals(staticQuest.getTargetStr())){//兵种
				SoldierTechService soldierTechService = (SoldierTechService)ServiceLocator.getSpringBean("soldierTechService");
				nowCount = soldierTechService.getUserSoldierTechPoint(characterId);
			}else if("3".equals(staticQuest.getTargetStr())){//阵法
				FormationTechService formationTechService = (FormationTechService)ServiceLocator.getSpringBean("formationTechService");
				nowCount = formationTechService.getformationTechTechPoint(characterId);
			}else{
				nowCount = (maincityService.getBaseInfo(characterId).getLevel()-1)*3 - character.getTechPoint();//从数据库
			}
		
		
		}else if(targetType == QuestTargeType.CITY_LEVEL){
			MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
			nowCount = maincityService.getBaseInfo(characterId).getLevel();//从数据库
		}else if(targetType == QuestTargeType.WALL_DEFENCE_AMOUNT){
			WallDefensenService wallDefensenService = (WallDefensenService)ServiceLocator.getSpringBean("walldefService");
			nowCount = wallDefensenService.getSumWallDefensen(characterId);//从数据库
		}
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		QuestSchedule questSchedule = new QuestSchedule(quest.getId(),null, targetNum, characterId);
//		questSchedules.add(questSchedule);
//		questDao.insertQuestSchedule(questSchedules);
		quest.setTargetAmount(nowCount);
		if(nowCount >= targetNum){
			return true;
		}
		return false;
	}

	private boolean figthEnemy(int characterId, Quest quest){
////		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
////		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		while(targetIterator.hasNext()){
//			Entry<String, Integer> targetEntry = targetIterator.next();
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), 0, characterId);
//			questSchedules.add(questSchedule);
//		}
//		questDao.insertQuestSchedule(questSchedules);
		List<QuestStore> questStores = getUserQuestCache(characterId).get(quest.getQuestType());
		if (questStores!=null) {
			for(QuestStore i:questStores){
				if(i.getQuestNo().equals(quest.getQuestNo())){//身上有该任务
					StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
					Quest userQuest = questDao.getUserQuestById(i.getQuestId(), characterId);
					userQuest.setTargetAmount(userQuest.getTargetAmount()+1);
					questDao.updateQuestSchedule(userQuest);
					return userQuest.getTargetAmount()>=staticQuest.getTargetNum();
				}
			}
		}
		return false;
	}
	private boolean equipmentCollect(int characterId, Quest quest){
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		List<UserEquipment> userEquipments = userItemService.getUserEquipmentByItemNo(staticQuest.getTargetStr(), characterId);
		int amount = userEquipments.size();
		quest.setTargetAmount(amount);
		return amount>=staticQuest.getTargetNum();
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		boolean result = true;
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		while(targetIterator.hasNext()){
//			Entry<String, Integer> targetEntry = targetIterator.next();
////			amount = amount>targetEntry.getValue()?targetEntry.getValue():amount;
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), amount, characterId);
//			questSchedules.add(questSchedule);
//			result&=(amount>=targetEntry.getValue());
//		}
//		questDao.insertQuestSchedule(questSchedules);
//		return result;
		
	}
	private boolean itemCollect(int characterId, Quest quest){
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		List<UserItem> items = userItemService.getUserItemByItemNo(staticQuest.getTargetStr(), characterId);
		int amount = 0;
		for(UserItem i: items){
			amount+=i.getItemAmount();
		}
		quest.setTargetAmount(amount);
		return amount>=staticQuest.getTargetNum();
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		boolean result = true;
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		while(targetIterator.hasNext()){
//			Entry<String, Integer> targetEntry = targetIterator.next();
////			amount = amount>targetEntry.getValue()?targetEntry.getValue():amount;
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), amount, characterId);
//			questSchedules.add(questSchedule);
//			result&=(amount>=targetEntry.getValue());
//		}
//		questDao.insertQuestSchedule(questSchedules);
		
	}
	private boolean materialCollect(int characterId, Quest quest){
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		List<UserMaterial> materials = userItemService.getUserMaterialByItemNo(staticQuest.getTargetStr(), characterId);
		int amount = 0;
		for(UserMaterial i: materials){
			amount+=i.getItemAmount();
		}
		quest.setTargetAmount(amount);
		return amount>=staticQuest.getTargetNum();
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		boolean result = true;
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		while(targetIterator.hasNext()){
//			Entry<String, Integer> targetEntry = targetIterator.next();
////			amount = amount>targetEntry.getValue()?targetEntry.getValue():amount;
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), amount, characterId);
//			questSchedules.add(questSchedule);
//			result&=(amount>=targetEntry.getValue());
//		}
//		questDao.insertQuestSchedule(questSchedules);
		
	}
	private boolean questCollect(int characterId, Quest quest){
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		List<UserQuests> quests = userItemService.getUserQuestsByItemNo(staticQuest.getTargetStr(), characterId);
		int amount = 0;
		for(UserQuests i: quests){
			amount+=i.getItemAmount();
		}
		quest.setTargetAmount(amount);
		return amount>=staticQuest.getTargetNum();
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		boolean result = true;
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		while(targetIterator.hasNext()){
//			Entry<String, Integer> targetEntry = targetIterator.next();
////			amount = amount>targetEntry.getValue()?targetEntry.getValue():amount;
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), amount, characterId);
//			questSchedules.add(questSchedule);
//			result&=(amount>=targetEntry.getValue());
//		}
//		questDao.insertQuestSchedule(questSchedules);
		
	}
	
//	private boolean singleFigthEnemy(int characterId, Quest quest){
//		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		while(targetIterator.hasNext()){
//			Entry<String, Integer> targetEntry = targetIterator.next();
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), 0, characterId);
//			questSchedules.add(questSchedule);
//		}
//		questDao.insertQuestSchedule(questSchedules);
//		return false;
//	}
	
	private boolean characterLevel(int characterId, Quest quest){
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		UserCharacter character = characterService.getCharacterById(characterId);
		int level = character.getLevel();
		quest.setTargetAmount(level);
		return level>=staticQuest.getTargetNum();
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		Entry<String, Integer> targetEntry = targetIterator.next();
////		level = level>targetEntry.getValue()?targetEntry.getValue():level;
//		QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), level, characterId);
//		questSchedules.add(questSchedule);
//		questDao.insertQuestSchedule(questSchedules);
	}
	/**
	 * 最高战力
	 * @param characterId
	 * @param quest
	 * @return
	 */
	private boolean maxForce(int characterId, Quest quest){
		return false;
	}
	private boolean buildingLevel(int characterId, Quest quest){
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		String buildingStrings[] = staticQuest.getTargetStr().split("_");
		String buildingPrefix = buildingStrings[0];
		int buildingLevel = Integer.parseInt(buildingStrings[1]);
		List<Building> buildings = buildingService.getbBuildingByPrefix(characterId, buildingPrefix);
		int amount = 0;
		for(Building i: buildings){
			if(i.getLevel()>=buildingLevel){
				amount++;
			}
		}
		quest.setTargetAmount(amount);
		return amount>=staticQuest.getTargetNum();
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		boolean result = true;
//		while (targetIterator.hasNext()) {
//			Entry<String, Integer> targetEntry = targetIterator.next();
////			amount = amount>targetEntry.getValue()?targetEntry.getValue():amount;
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), amount, characterId);
//			questSchedules.add(questSchedule);
//			result&=(amount>=targetEntry.getValue());
//		}
//		questDao.insertQuestSchedule(questSchedules);
	}
	private boolean setTargetWithRecord(int characterId, Quest quest, int questType){
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		boolean result = true;
		Map<Integer, Boolean> questRecordMap = getQuestRecordCache(characterId);
		if(questRecordMap.get(questType)!=null&&questRecordMap.get(questType)){
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), null, 1, characterId);
//			questSchedules.add(questSchedule);
			quest.setTargetAmount(1);
			questDao.updateQuestSchedule(quest);
			return true;
		}else{
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), null, 0, characterId);
//			questSchedules.add(questSchedule);
//			result = false;
			return false;
		}
//		questDao.insertQuestSchedule(questSchedules);
	}
	
	private boolean allianceLevel(int characterId, Quest quest){
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		UserCharacter character = characterService.getCharacterById(characterId);
		AllianceService allianceService = (AllianceService)ServiceLocator.getSpringBean("allianceService");
		Alliance alliance = allianceService.getAllianceById(character.getAllianceId());
		int level = alliance.getLevel();
		quest.setTargetAmount(level);
		return level>=staticQuest.getTargetNum();
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		Entry<String, Integer> targetEntry = targetIterator.next();
//		boolean result = true;
//		if(character.getAllianceId()!=0){
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), alliance.getLevel(), characterId);
//			questSchedules.add(questSchedule);
//			if(targetEntry.getValue()>alliance.getLevel()){
//				result = false;
//			}
//		}else{
//			result = false;
//			QuestSchedule questSchedule = new QuestSchedule(quest.getId(), targetEntry.getKey(), 0, characterId);
//			questSchedules.add(questSchedule);
//		}
//		questDao.insertQuestSchedule(questSchedules);
	}
	private boolean soldierAmount(int characterId, Quest quest){
		StaticQuest staticQuest = QuestCache.getQuestsByNo(quest.getQuestNo());
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		int heroSoldierSum = userHeroService.getSoldierSum(characterId);
		int soldier = maincity.getSoldier();
		int sumAmount = heroSoldierSum+soldier;
		quest.setTargetAmount(sumAmount);
		return sumAmount>=staticQuest.getTargetNum();
		
//		Iterator<Entry<String, Integer>> targetIterator = staticQuest.getTarget().entrySet().iterator();
//		Entry<String, Integer> targetEntry = targetIterator.next();
//		QuestSchedule questSchedule = new QuestSchedule(quest.getId(), null, sumAmount, characterId);
//		List<QuestSchedule> questSchedules = new ArrayList<QuestSchedule>();
//		questSchedules.add(questSchedule);
//		questDao.insertQuestSchedule(questSchedules);
	}
	
	public Quest addDailyQuest(int characterId, int dailyType) throws AppException{
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		UserCharacter character = characterService.getCharacterById(characterId);
		int level = character.getLevel();
		level/=QuestCache.LEVEL_STEP_REPUTATION_QUEST;
		level*=QuestCache.LEVEL_STEP_REPUTATION_QUEST;
		if(dailyType==DAILY_QUEST_REPUTATION){
			List<Quest> quests = questDao.getUserQuestByType(characterId, QuestCache.QUEST_TYPE_REPUTATION);
			if(quests.isEmpty()){
				//直接添加
				return addReputationQuestFirst(level, characterId);
			}else{
				//不能添加重复的
				return addReputationQuestNotFirst(level, characterId, quests.get(0).getQuestNo());
			}
		}else if(dailyType==DAILY_QUEST_HERO){
			List<Quest> quests = questDao.getUserQuestByType(characterId, QuestCache.QUEST_TYPE_HERO);
			if(quests.isEmpty()){
				//直接添加
				return addHeroQuestFirst(level, characterId);
			}else{
				//不能添加重复的
				return addHeroQuestNotFirst(level, characterId, quests.get(0).getQuestNo());
			}
		}
		return null;
		
	}
	private Quest addReputationQuestFirst(int level, int characterId) throws AppException{
		int size = QuestCache.getReputationQuestByNeedLevel(level).size();
		int index = RandomFunc.getRandomNum(size);
		StaticQuest staticQuest = QuestCache.getReputationQuestByNeedLevel(level).get(index);
		Quest quest = new Quest(characterId, staticQuest.getQuestNo(), QuestCache.QUEST_STATUS_UNCOMPLETED);
		boolean result = setUserTarget(characterId, quest);
		if(result){
			quest.setStatus(QuestCache.QUEST_STATUS_COMPLETED);
//			questDao.updateQuestStatus(quest.getId(), QuestCache.QUEST_STATUS_COMPLETED);
		}
		questDao.insertUserQuest(quest);
//		insertQuestTypeIntoCache(characterId, quest);
		return quest;
	}
	private Quest addReputationQuestNotFirst(int level, int characterId, String questNo) throws AppException{
		int size = QuestCache.getReputationQuestByNeedLevel(level).size();
		StaticQuest staticQuest;
		do{
			int index = RandomFunc.getRandomNum(size);
			staticQuest = QuestCache.getReputationQuestByNeedLevel(level).get(index);
		}while(staticQuest.getQuestNo().equals(questNo));
		Quest quest = new Quest(characterId, staticQuest.getQuestNo(), QuestCache.QUEST_STATUS_UNCOMPLETED);
		boolean result = setUserTarget(characterId, quest);
		if(result){
			quest.setStatus(QuestCache.QUEST_STATUS_COMPLETED);
//			questDao.updateQuestStatus(quest.getId(), QuestCache.QUEST_STATUS_COMPLETED);
		}
		questDao.insertUserQuest(quest);
//		insertQuestTypeIntoCache(characterId, quest);
		return quest;
	}
	private Quest addHeroQuestFirst(int level, int characterId) throws AppException{
		int size = QuestCache.getHeroQuestByNeedLevel(level).size();
		int index = RandomFunc.getRandomNum(size);
		StaticQuest staticQuest = QuestCache.getHeroQuestByNeedLevel(level).get(index);
		Quest quest = new Quest(characterId, staticQuest.getQuestNo(), QuestCache.QUEST_STATUS_UNCOMPLETED);
		boolean result = setUserTarget(characterId, quest);
		if(result){
			quest.setStatus(QuestCache.QUEST_STATUS_COMPLETED);
//			questDao.updateQuestStatus(quest.getId(), QuestCache.QUEST_STATUS_COMPLETED);
		}
		questDao.insertUserQuest(quest);
//		insertQuestTypeIntoCache(characterId, quest);
		return quest;
	}
	private Quest addHeroQuestNotFirst(int level, int characterId, String questNo) throws AppException{
		int size = QuestCache.getHeroQuestByNeedLevel(level).size();
		StaticQuest staticQuest;
		do{
			int index = RandomFunc.getRandomNum(size);
			staticQuest = QuestCache.getHeroQuestByNeedLevel(level).get(index);
		}while(staticQuest.getQuestNo().equals(questNo));
		Quest quest = new Quest(characterId, staticQuest.getQuestNo(), QuestCache.QUEST_STATUS_UNCOMPLETED);
		boolean result = setUserTarget(characterId, quest);
		if(result){
			quest.setStatus(QuestCache.QUEST_STATUS_COMPLETED);
//			questDao.updateQuestStatus(quest.getId(), QuestCache.QUEST_STATUS_COMPLETED);
		}
		questDao.insertUserQuest(quest);
//		insertQuestTypeIntoCache(characterId, quest);
		return quest;
	}
	/**
	 * 更新联盟等级，特殊处理
	 */
	public void updateAllianceLevelSchedule(List<Integer> characterIds, int allianceLevel){
		for(int characterId:characterIds){
			if(isUserQuestCacheExist(characterId)){//玩家在线
				updateQuestSchedule(QuestTargeType.ALLIANCE_LEVEL, null, characterId);
			}else{//玩家不在线
				updateQuestSchedule(QuestTargeType.ALLIANCE_LEVEL, null, characterId);
				QUEST_CACHE.remove(characterId);
			}
			
		}
	}
	/**
	 * 更新任务进度
	 * @param targetType
	 * @param targetNo
	 * @param characterId
	 * @param updateValue
	 */
	public void updateQuestSchedule(int targetType, String targetNo, int characterId){
		switch (targetType) {
		case QuestTargeType.MULTI_FIGHT_ENEMY://讨伐敌人
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.EQUIPMENT_COLLECT://收集装备
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.ITEM_COLLECT://收集消耗品
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.MATERIAL_COLLECT://收集材料
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.QUESTS_COLLECT://收集任务物品
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.SINGLE_FIGHT_ENEMY://单挑敌人
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.CHARACTER_LEVEL://君主等级达到
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.BUILDING_LEVEL://等级达到的建筑个数
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.MAX_MULTI_FORCE://最高战力达到,暂时不做
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.JOIN_ALLIANCE://加入联盟
			
			updateScheduleWithRecord(targetType, characterId);
			break;
			
		case QuestTargeType.ALLIANCE_LEVEL://所在联盟等级达到
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.TOTAL_SOLDIER_AMOUNT://兵力达到
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.WALL_DEFENCE_AMOUNT://城防总数目达到
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
//		case QuestTargeType.SPECIFIC_SOLDIER_AMOUNT://具体兵力达到
//			
//			updateScheduleWithoutRecord(targetType, targetNo, characterId);
//			break;
			
		case QuestTargeType.CITY_LEVEL://城池等级达到
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.TECH_POINT://消耗科技点数
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.HERO_SKILL_LEVEL://武将技能等级
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.HERO_SKILL_AMOUNT://拥有技能数最多的武将的技能数量
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.EMBED_GEMSTONE:
			
			updateScheduleWithRecord(targetType, characterId);
			break;
			
		case QuestTargeType.FUSE_ARTICAL:
			
			updateScheduleWithRecord(targetType, characterId);
			break;
			
		case QuestTargeType.EQUIPMENT_STRENGTHEN:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.EQUIPMENT_PRODUCE:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.HERO_EMPLOY:
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.CONFIG_SOLDIER:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.USE_WORLD_CHAT:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.HERO_USE_EQUIPMENT:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.USE_MARCH_SPEED_UP:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.ADD_FRIEND:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

//		case QuestTargeType.WALL_DEFENCE:
//			
//			updateScheduleWithRecord(targetType, characterId);
//			break;

		case QuestTargeType.CURE_HERO:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.ADD_HERO_POINT:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.ADD_CHARACTER_POINT:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		case QuestTargeType.APPOINT_HERO_RANK:
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.USE_HERO_MISSION:
			
			updateScheduleWithRecord(targetType, characterId);
			break;
			
		case QuestTargeType.USE_ALLIANCE_DONATE:
			
			updateScheduleWithRecord(targetType, characterId);
			break;
			
		case QuestTargeType.PLAN_FOOD_AMOUNT:
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.PLAN_STONE_AMOUNT:
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.PLAN_IRONORE_AMOUNT:
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.PLAN_WOOD_AMOUNT:
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.NEW_SOLDIER_AMOUNT:
			
			updateScheduleWithoutRecord(targetType, targetNo, characterId);
			break;
			
		case QuestTargeType.CONFIG_WALL_DEFENCE_HERO:
			
			updateScheduleWithRecord(targetType, characterId);
			break;

		default:
			break;
		}
	}
	
	public void updateScheduleWithRecord(int targetType, int characterId){
		if(isUserHaveCompleteQuest(characterId, targetType)){//已完成过该任务目标，直接返回，不进行任何操作
			return ;
		}else if(isUserHaveTypeQuest(characterId, targetType)){//没完成过该任务目标，并且身上有该任务
			questDao.insertQuestRecord(characterId, targetType);
			insertQuestRecordIntoCache(characterId, targetType);
			updateScheduleWithoutRecord(targetType, null, characterId);
		}else{//没完成该任务目标，并且身上没有有该任务
			questDao.insertQuestRecord(characterId, targetType);
			insertQuestRecordIntoCache(characterId, targetType);
		}
	}
	
	public QuestDao getQuestDao() {
		return questDao;
	}

	public void setQuestDao(QuestDao questDao) {
		this.questDao = questDao;
	}
}
