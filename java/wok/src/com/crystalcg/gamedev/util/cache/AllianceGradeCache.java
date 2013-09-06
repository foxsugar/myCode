package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticAllianceGrade;

public class AllianceGradeCache {
	private static Logger logger = LoggerFactory.getLogger(AllianceGradeCache.class);
	private static Map<Integer,StaticAllianceGrade> STORE ;
	private AllianceGradeCache(CacheMapper cacheMapper){
		List<StaticAllianceGrade> list = cacheMapper.getStaticAllianceGrade();
		STORE = new HashMap<Integer, StaticAllianceGrade>();
		for(StaticAllianceGrade e : list){
			if(STORE.containsKey(e.getAllianceLevel())){
				logger.error("duplicate key");
			}
			STORE.put(e.getAllianceLevel(), e);
		}
		logger.info("[done]");
	}
	/**
	 * 根据等级获取
	 * @param level
	 * @return
	 */
	public static StaticAllianceGrade getStaticAllianceGrade(int level){
		return STORE.get(level);
	}
}
