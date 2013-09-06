package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticQuest;
import com.crystalcg.gamedev.util.cache.domain.StaticQuests;
/**
 * 任务
 * @author lvxiaohui
 *
 */
public class QuestCache {
	
	public static final String TECH_TARGET_TOTAL = "0";
	public static final String TECH_TARGET_INTERIOR = "1";
	public static final String TECH_TARGET_SOLDIER = "2";
	public static final String TECH_TARGET_FORMATION = "3";
	public static final int LEVEL_STEP_HERO_QUEST = 10;
	public static final int LEVEL_STEP_REPUTATION_QUEST = 10;
	public static final int MAX_DAILY_AMOUNT = 5;
	public static final String ROOT_QUEST = "q0001";
	//1=主线任务  2=支线任务  3=声望任务  4=武将任务  5=活动任务
	public static final int QUEST_TYPE_MAIN = 1;
	public static final int QUEST_TYPE_BRANCH = 2;
	public static final int QUEST_TYPE_REPUTATION = 3;
	public static final int QUEST_TYPE_HERO = 4;
	public static final int QUEST_TYPE_ACTIVITY = 5;
	
	public static final int QUEST_NEED_TYPE_CHARACTER_LEVEL = 1;
	public static final int QUEST_NEED_TYPE_CITY_LEVEL = 2;
	//进度重置类型:0=不可重置   1=日重置   2=周重置   3=月重置
	//前置条件类型：1=君主等级   2=城池等级  
	//任务信息初始化
	//-1未激活,0未完成,1已完成未提交,2已完成已提交
	public static int QUEST_STATUS_UNACTIVATED = -1;
	public static int QUEST_STATUS_UNCOMPLETED = 0;
	public static int QUEST_STATUS_COMPLETED = 1;
	public static int QUEST_STATUS_COMPLETED_AND_SUBMIT = 2;
	
	private static Logger logger = LoggerFactory.getLogger(EquipmentCache.class);
	private static Map<String, StaticQuest> QUEST_MAP;
	private static Map<Integer, List<StaticQuest>> QUEST_LEVEL_MAP_FOR_REPUTATION;
	private static Map<Integer, List<StaticQuest>> QUEST_LEVEL_MAP_FOR_HERO;
	private static Map<String, List<StaticQuest>> QUEST_NEED_MAP;
	private QuestCache(CacheMapper cacheMapper){
		QUEST_MAP = new HashMap<String, StaticQuest>();
		QUEST_LEVEL_MAP_FOR_REPUTATION =new HashMap<Integer, List<StaticQuest>>();
		QUEST_LEVEL_MAP_FOR_HERO =new HashMap<Integer, List<StaticQuest>>();
		QUEST_NEED_MAP = new HashMap<String, List<StaticQuest>>();
		List<StaticQuest> quests = cacheMapper.getStaticQuest();
		for(StaticQuest q :quests){
//			q.setTarget();
			QUEST_MAP.put(q.getQuestNo(),q);
			addQuestIntoMap(q);
			
		}
		logger.info("任务物品信息加载成功");
	}
	private static void addQuestIntoMap(StaticQuest q){
		switch (q.getQuestType()) {
		case QUEST_TYPE_MAIN:
			addCommonQuest(q, QUEST_NEED_MAP);
			break;
		case QUEST_TYPE_BRANCH:
			addCommonQuest(q, QUEST_NEED_MAP);
			break;
		case QUEST_TYPE_REPUTATION:
			addReputationQuest(q, QUEST_LEVEL_MAP_FOR_REPUTATION);
			break;
		case QUEST_TYPE_HERO:
			addHeroQuest(q, QUEST_LEVEL_MAP_FOR_HERO);
			break;
		case QUEST_TYPE_ACTIVITY:
			
			break;

		default:
			break;
		}
	}
	private static void addReputationQuest(StaticQuest q, Map<Integer, List<StaticQuest>> map){
		if(map.get(q.getNeedValue())==null){
			List<StaticQuest> staticQuests = new ArrayList<StaticQuest>();
			staticQuests.add(q);
			map.put(q.getNeedValue(), staticQuests);
		}else{
			map.get(q.getNeedValue()).add(q);
		}
	}
	private static void addHeroQuest(StaticQuest q, Map<Integer, List<StaticQuest>> map){
		if(map.get(q.getNeedValue())==null){
			List<StaticQuest> staticQuests = new ArrayList<StaticQuest>();
			staticQuests.add(q);
			map.put(q.getNeedValue(), staticQuests);
		}else{
			map.get(q.getNeedValue()).add(q);
		}
	}
	private static void addCommonQuest(StaticQuest q, Map<String, List<StaticQuest>> map){
		if(map.get(q.getNeedQuestNo())==null){
			List<StaticQuest> staticQuests = new ArrayList<StaticQuest>();
			staticQuests.add(q);
			map.put(q.getNeedQuestNo(), staticQuests);
		}else{
			map.get(q.getNeedQuestNo()).add(q);
		}
	}
	/**
	 * 通过no查找材料静态信息
	 * @param materialNo
	 * @return
	 */
	public static StaticQuest getQuestsByNo(String questNo){
		return QUEST_MAP.get(questNo);
	}
	/**
	 *获取游戏内所有任务
	 * @return
	 */
	public static Map<String, StaticQuest> getQuest(){
		return QUEST_MAP;
	}
	/**
	 * 获取该等级范围内的所有武将任务
	 * @param level
	 * @return
	 */
	public static List<StaticQuest> getHeroQuestByNeedLevel(int level){
		return QUEST_LEVEL_MAP_FOR_HERO.get(level);
	}
	/**
	 * 获取该等级范围内的所有声望任务
	 * @param level
	 * @return
	 */
	public static List<StaticQuest> getReputationQuestByNeedLevel(int level){
		return QUEST_LEVEL_MAP_FOR_REPUTATION.get(level);
	}
	/**
	 * 获取以该任务编号为前置的所有任务
	 * @param questNo
	 * @return
	 */
	public static List<StaticQuest> getCommonQuestByNeedNo(String questNo){
		return QUEST_NEED_MAP.get(questNo);
	}
	
}
