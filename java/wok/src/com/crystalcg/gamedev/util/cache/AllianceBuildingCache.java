package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticAllianceBuilding;

public class AllianceBuildingCache {
	private static Logger logger = LoggerFactory.getLogger(AllianceBuildingCache.class);
	private static Map<String , StaticAllianceBuilding> STORE ;
	
	private AllianceBuildingCache(CacheMapper cacheMapper){
		List<StaticAllianceBuilding> list = cacheMapper.getStaticAllianceBuilding();
		STORE = new HashMap<String , StaticAllianceBuilding>();
		for(StaticAllianceBuilding e :list){
			if(STORE.containsKey(e.getBulidingNo())){
				logger.error("duplicate key");
			}
			STORE.put(e.getBulidingNo(), e);
		}
	}
	/**
	 * 根据编号获取
	 * @param gbulidingno
	 * @return
	 */
	public static StaticAllianceBuilding getStaticAllianceBuilding(String bulidingNo){
		return STORE.get(bulidingNo);
	}
}
