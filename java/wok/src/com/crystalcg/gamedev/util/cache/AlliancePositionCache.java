package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticAlliancePosition;

public class AlliancePositionCache {
	private static Logger logger = LoggerFactory.getLogger(AlliancePositionCache.class);
	private static Map<String, StaticAlliancePosition> STORE ;
	private static List<StaticAlliancePosition> POSITION_LIST; 
	private AlliancePositionCache(CacheMapper cacheMapper){
		POSITION_LIST = cacheMapper.getStaticAlliancePosition();
		STORE = new HashMap<String, StaticAlliancePosition>();
		for(StaticAlliancePosition e : POSITION_LIST){
			if(STORE.containsKey(e.getPositionNo())){
				logger.error("duplicate key");
			}
			STORE.put(e.getPositionNo(), e);
		}
		logger.info("[done]");
	}
	/**
	 * 根据编号获取
	 * @param positionNo
	 * @return
	 */
	public static StaticAlliancePosition getStaticAlliancePosition(String positionNo){
		return STORE.get(positionNo);
	}
	/**
	 * 获取全部职位信息
	 * @return
	 */
	public static List<StaticAlliancePosition> getAllStaticAlliancePosition(){
		return POSITION_LIST;
	}
}
