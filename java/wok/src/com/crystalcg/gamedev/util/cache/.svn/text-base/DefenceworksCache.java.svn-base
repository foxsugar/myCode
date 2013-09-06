package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticDefenceworks;

/**
 * 城防工事
 * @author xuzhongxing
 *
 */
public class DefenceworksCache {
	private static Logger logger = LoggerFactory.getLogger(DefenceworksCache.class);
	private static Map<String,StaticDefenceworks> STORE;
	private static List<StaticDefenceworks> DEFENCEWORKS_LIST;
	
	private DefenceworksCache(CacheMapper cacheMapper){
		DEFENCEWORKS_LIST = cacheMapper.getStaticDefenceworks();
		STORE = new HashMap<String,StaticDefenceworks>();
		for(StaticDefenceworks e:DEFENCEWORKS_LIST){
			if(STORE.containsKey(e.getDefenceworksNo())){
				logger.error("duplicate key");
			}
			STORE.put(e.getDefenceworksNo(),e);
		}
		logger.info("[done]");
	}
	
	public static StaticDefenceworks getDefenceworks(String defenceworksNo){
		return STORE.get(defenceworksNo);
	}
	
	public static List<StaticDefenceworks> getAlldefenceworks(){
		return DEFENCEWORKS_LIST;
	}
}
