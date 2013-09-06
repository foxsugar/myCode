package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import com.crystalcg.gamedev.util.cache.domain.StaticArticleReward;
import com.crystalcg.gamedev.util.cache.domain.StaticBattleReward;

/**
 * 战斗奖励静态信息表
 * @author jinganyang
 *
 */
public class BattleRewardCache {
	private static Logger logger = LoggerFactory.getLogger(BattleRewardCache.class);
	private static Map<String, StaticBattleReward> BATTLE_REWARD_STORE;
	private static Map<String, List<StaticArticleReward>> ARTICLE_REWARD_STORE;
	
	private BattleRewardCache(CacheMapper cacheMapper){
		BATTLE_REWARD_STORE = new HashMap<String, StaticBattleReward>();
		ARTICLE_REWARD_STORE = new HashMap<String, List<StaticArticleReward>>();
		List<StaticBattleReward> staticBattleRewards = cacheMapper.getStaticBattleReward();
		List<StaticArticleReward> staticArticleRewards = cacheMapper.getStaticArticleReward();
		for(StaticBattleReward i :staticBattleRewards){
			BATTLE_REWARD_STORE.put(i.getEnemyNo(), i);
		}
		for(StaticArticleReward i:staticArticleRewards){
			if(ARTICLE_REWARD_STORE.get(i.getItemRewardNo())==null){
				List<StaticArticleReward> j = new ArrayList<StaticArticleReward>();
				j.add(i);
				ARTICLE_REWARD_STORE.put(i.getItemRewardNo(), j);
			}else{
				ARTICLE_REWARD_STORE.get(i.getItemRewardNo()).add(i);
			}
		}
		logger.info("战斗信息加载成功");
	}
	/**
	 * 获取奖励信息
	 * @param enemyNo
	 * @return
	 */
	public static StaticBattleReward getBattleReward(String enemyNo){
		return BATTLE_REWARD_STORE.get(enemyNo);
	}
	/**
	 * 获取物品奖励信息
	 * @param itemRewardNo
	 * @return
	 */
	public static List<StaticArticleReward> getArticleReward(String itemRewardNo){
		return ARTICLE_REWARD_STORE.get(itemRewardNo);
	}

}
