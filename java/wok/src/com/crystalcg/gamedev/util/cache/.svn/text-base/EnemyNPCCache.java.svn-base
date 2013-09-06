package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyAi;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;

public class EnemyNPCCache {
	private static Logger logger = LoggerFactory.getLogger(EnemyNPCCache.class);
	private static Map<String, StaticEnemyNPC> STORE_BY_NO;//通过No获取具体敌人信息
	private	static Map<Integer, List<StaticEnemyNPC>> STORE_BY_LEVEL;//通过势力等级获取
	private static List<StaticEnemyNPC> WORLD_LIST;//在世界上刷的野怪 type=4
	private static Map<String, Map<Integer, List<StaticEnemyAi>>> STORE_AI;//野怪AI
	/**
	 * ai类型，单挑
	 */
	public static final int AI_TYPE_SINGLE = 1;
	/**
	 * ai类型，讨伐
	 */
	public static final int AI_TYPE_MULTI = 2;
	
	private EnemyNPCCache(CacheMapper cacheMapper){
		STORE_BY_NO = new HashMap<String, StaticEnemyNPC>();
		STORE_BY_LEVEL = new HashMap<Integer,List<StaticEnemyNPC>>();
		WORLD_LIST = new ArrayList<StaticEnemyNPC>();
		STORE_AI = new HashMap<String, Map<Integer, List<StaticEnemyAi>>>();
		List<StaticEnemyNPC> temp1 = new ArrayList<StaticEnemyNPC>();
		List<StaticEnemyNPC> temp2 = new ArrayList<StaticEnemyNPC>();
		List<StaticEnemyNPC> temp3 = new ArrayList<StaticEnemyNPC>();
		STORE_BY_LEVEL.put(1, temp1);
		STORE_BY_LEVEL.put(2, temp2);
		STORE_BY_LEVEL.put(3, temp3);
		List<StaticEnemyNPC> enemyList = cacheMapper.getStaticEnemyNPC();
		for(StaticEnemyNPC i :enemyList){
			i.setNeedTime(computeNeedTime(i.getHeroLevel()));
			STORE_BY_NO.put(i.getEnemyNo(), i);
			if(i.getForceLevel() == 4){
				WORLD_LIST.add(i);
			}
			if(STORE_BY_LEVEL.get(i.getForceLevel())==null){
				continue;
			}
			STORE_BY_LEVEL.get(i.getForceLevel()).add(i);
		}
		List<StaticEnemyAi> aiList = cacheMapper.getStaticEnemyAi();
		for(StaticEnemyAi i:aiList){
			if(STORE_AI.get(i.getAiNo())==null){
				Map<Integer,List<StaticEnemyAi>> tempMap = new HashMap<Integer,List<StaticEnemyAi>>();
				List<StaticEnemyAi> tempList = new ArrayList<StaticEnemyAi>();
				tempList.add(i);
				tempMap.put(i.getType(), tempList);
				STORE_AI.put(i.getAiNo(), tempMap);
			}else if(STORE_AI.get(i.getAiNo()).get(i.getType())==null){
				List<StaticEnemyAi> tempList = new ArrayList<StaticEnemyAi>();
				tempList.add(i);
				STORE_AI.get(i.getAiNo()).put(i.getType(), tempList);
			}else{
				STORE_AI.get(i.getAiNo()).get(i.getType()).add(i);
			}
		}
		logger.info("EnemyNPCCache has successfully loaded");
	}
	/**
	 * 获取具体野怪
	 * @param enemyNo
	 * @return
	 */
	public static StaticEnemyNPC getEnemyEntity(String enemyNo){
		return STORE_BY_NO.get(enemyNo);
	}
	/**
	 * 按势力类别获取野怪
	 * @param forceLevel
	 * @return
	 */
	public static List<StaticEnemyNPC> getEnemyListByForceLevel(int forceLevel){
		return STORE_BY_LEVEL.get(forceLevel);
	}
	
	/**
	 * 获取在世界上刷新的怪物
	 * @return
	 */
	public static List<StaticEnemyNPC> getWorldList(){
		return WORLD_LIST;
	}
	

	private int computeNeedTime(int heroLevel){
		return heroLevel*60;
	}
//	/**
//	 * 野怪讨伐战力
//	 * @param staticEnemyNPC
//	 * @return
//	 */
//	public static int computeForceNum(StaticEnemyNPC staticEnemyNPC){
//		return staticEnemyNPC.getHeroLevel()*staticEnemyNPC.getSoldierNum();
//	}
//	/**
//	 * 野怪单挑战力
//	 * @param staticEnemyNPC
//	 * @return
//	 */
//	public static int computeSingleForceNum(StaticEnemyNPC staticEnemyNPC){
//		return staticEnemyNPC.getHeroForce()+staticEnemyNPC.getHeroPhysique()+staticEnemyNPC.getHeroAgility()+staticEnemyNPC.getHeroStrategy();
//	}
	public static List<StaticEnemyAi> getSingleBattleAi(String aiNo){
//		if(STORE_AI.get(aiNo)==null){
//			return null;
//		}
		return STORE_AI.get(aiNo).get(AI_TYPE_SINGLE);
	}
	public static List<StaticEnemyAi> getMultiBattleAi(String aiNo){
		if(STORE_AI.get(aiNo)==null){
			return null;
		}
		return STORE_AI.get(aiNo).get(AI_TYPE_MULTI);
	}
}
