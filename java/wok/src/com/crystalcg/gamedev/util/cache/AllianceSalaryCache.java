package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticAllianceSalary;

public class AllianceSalaryCache {
	private static Logger logger = LoggerFactory.getLogger(AllianceSalaryCache.class);
	private static Map<String, StaticAllianceSalary> STORE ;
	private AllianceSalaryCache(CacheMapper cacheMapper){
		List<StaticAllianceSalary> list = cacheMapper.getStaticAllianceSalary();
		STORE = new HashMap<String, StaticAllianceSalary>();
		for(StaticAllianceSalary e : list){
			if(STORE.containsKey(e.getPositionNo())){
				logger.error("duplicate key");
			}
			STORE.put(e.getPositionNo(), e);
		}
		logger.info("[done]");
	}
	public static  StaticAllianceSalary  getStaticAllianceSalary(String getPositionNo){
		
		return STORE.get(getPositionNo);
	}
}
