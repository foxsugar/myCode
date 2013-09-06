package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;

public class SoldierCache {
	private static Logger logger = LoggerFactory.getLogger(SoldierCache.class);
	private static Map<String, StaticSoldier> SOLDIER_STORE;//士兵静态数据
	
	private SoldierCache(CacheMapper cacheMapper){
		SOLDIER_STORE = new HashMap<String, StaticSoldier>();
		List<StaticSoldier> staticSoldiers = cacheMapper.getStaticSoldier();
		for(StaticSoldier e:staticSoldiers){
			SOLDIER_STORE.put(e.getSoldierNo(), e);
		}
		logger.info("[done]");
	}
	/**
	 * 通过No获得士兵静态信息
	 * @param soldierNo
	 * @return
	 */
	public static StaticSoldier getSoldierByNo(String soldierNo){
		return SOLDIER_STORE.get(soldierNo);
	}
}
