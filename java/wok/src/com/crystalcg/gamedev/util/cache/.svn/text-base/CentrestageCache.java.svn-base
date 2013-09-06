package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticCentrestage;
import com.crystalcg.gamedev.util.cache.domain.StaticRank;

/**
 * 聚贤阁
 * 
 * @author xuzhongxing
 * 
 */
public class CentrestageCache {

	private static Logger logger = LoggerFactory.getLogger(CentrestageCache.class);
	private static Map<Integer, StaticCentrestage> LEVEL_STORE;// 等级->官职数量
	private static Map<String, StaticRank> RANK_STORE;// 官职编号->官职

	private CentrestageCache(CacheMapper cacheMapper) {
		List<StaticCentrestage> levelList = cacheMapper.getStaticCentrestage();
		LEVEL_STORE = new HashMap<Integer, StaticCentrestage>();
		for (StaticCentrestage e : levelList) {
			if(LEVEL_STORE.containsKey(e.getLevel())){
				logger.error("duplicate key");
			}
			LEVEL_STORE.put(e.getLevel(), e);
		}
		List<StaticRank> rankList = cacheMapper.getStaticRank();
		RANK_STORE = new HashMap<String, StaticRank>();
		for (StaticRank e : rankList) {
			if(RANK_STORE.containsKey(e.getRankNo())){
				logger.error("duplicate key");
			}
			RANK_STORE.put(e.getRankNo(), e);
		}
		logger.info("[done]");
	}

	/**
	 * 根据编号获取官职信息
	 * 
	 * @param rankNo
	 * @return
	 */
	public static StaticRank getRankByNo(String rankNo) {
		return RANK_STORE.get(rankNo);
	}

	/**
	 * 根据建筑等级获取某官职的数量上限
	 * 
	 * @param buildingLevel
	 * @param rankNo
	 * @return
	 */
	public static int getNumLimit(int buildingLevel, String rankNo) {
		StaticCentrestage staticCentrestage = LEVEL_STORE.get(buildingLevel);
		if (staticCentrestage != null) {
			return getNumLimitByRankNo(staticCentrestage, rankNo);
		}
		return 0;
	}

	/**
	 * 获取官职展示
	 * 
	 * @param level
	 * @return
	 */
	public static List<Map<String, Object>> getRankDisplay(int level,
			Map<String, Integer> heroCount) {
		StaticCentrestage staticCentrestage = LEVEL_STORE.get(level);
		if (staticCentrestage == null) {
			return null;
		}
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for (String rankNo : RANK_STORE.keySet()) {
			result.add(setSimpleRankInfo(staticCentrestage, rankNo,heroCount.get(rankNo)));
		}
		return result;
	}

	/**
	 * 获取官职册封界面所需信息
	 * 
	 * @param level
	 * @return
	 */
	public static List<Map<String, Object>> getRankAppoint(int level,
			String heroRankNo) {
		StaticCentrestage staticCentrestage = LEVEL_STORE.get(level);
		if (staticCentrestage == null) {
			return null;
		}
		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		for (String rankNo : RANK_STORE.keySet()) {
			result.add(setRankInfo(staticCentrestage, rankNo, heroRankNo));
		}
		return result;
	}

	private static int getNumLimitByRankNo(StaticCentrestage staticCentrestage,
			String rankNo) {
		if(rankNo.equals("of0001")){
			return staticCentrestage.getRank1Num();
		}else if(rankNo.equals("of0002")){
			return staticCentrestage.getRank2Num();
		}else if(rankNo.equals("of0003")){
			return staticCentrestage.getRank3Num();
		}else if(rankNo.equals("of0004")){
			return staticCentrestage.getRank4Num();
		}else if(rankNo.equals("of0005")){
			return staticCentrestage.getRank5Num();
		}else if(rankNo.equals("of0006")){
			return staticCentrestage.getRank6Num();
		}else if(rankNo.equals("of0007")){
			return staticCentrestage.getRank7Num();
		}else{
			return 0;
		}
	}

	private static Map<String, Object> setSimpleRankInfo(
			StaticCentrestage staticCentrestage, String rankNo,
			Integer heroCount) {
		StaticRank staticRank = RANK_STORE.get(rankNo);
		Map<String, Object> temp = new HashMap<String,Object>();
		temp.put("rankNo", staticRank.getRankNo());
		temp.put("name", staticRank.getRankName());
		temp.put("heroCount", heroCount == null ? 0 : heroCount);
		temp.put("limit", getNumLimitByRankNo(staticCentrestage, rankNo));
		return temp;
	}

	private static Map<String, Object> setRankInfo(
			StaticCentrestage staticCentrestage, String rankNo,
			String heroRankNo) {
		StaticRank staticRank = RANK_STORE.get(rankNo);
		Map<String, Object> temp = new HashMap<String,Object>();
		temp.put("rankNo", staticRank.getRankNo());
		temp.put("name", staticRank.getRankName());
		temp.put("command", staticRank.getRankCommand());
		temp.put("exploit", staticRank.getNeedExploit());
		temp.put("item", staticRank.getNeedItem() == null ? "不需要" : "需要");
		temp.put("isAppointed", staticRank.getRankNo().equals(heroRankNo));
		return temp;
	}

}
