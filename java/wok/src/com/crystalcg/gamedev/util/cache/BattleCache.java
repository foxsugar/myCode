package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.util.cache.domain.StaticBattleHurt;

/**
 * 战斗相关缓存
 * @author jinganyang
 *
 */
public class BattleCache {
	
	private static Map<String, StaticBattleHurt> store;
	private BattleCache(CacheMapper cacheMapper){
		store = new HashMap<String, StaticBattleHurt>();
		List<StaticBattleHurt> staticBattleHurts = cacheMapper.getStaticBattleHurt();//讨伐战斗伤害补正
		for(StaticBattleHurt i:staticBattleHurts){
			store.put(i.getHurtNo(), i);
		}
	}
	public static StaticBattleHurt getStaticBattleHurt(String hurtNo){
		return store.get(hurtNo);
	}
}
