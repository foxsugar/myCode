package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticCountry;

/**
 * 国家(可存国家边界信息)
 * @author xuzhongxing
 *
 */
public class CountryCache {
	private static Logger logger = LoggerFactory.getLogger(CountryCache.class);
	private static Map<Integer,StaticCountry> STORE;
	
	private CountryCache(CacheMapper cacheMapper){
		List<StaticCountry> list = cacheMapper.getStaticCountry();
		STORE = new HashMap<Integer,StaticCountry>();
		for(StaticCountry e:list){
			if(STORE.containsKey(e.getCountryId())){
				logger.error("duplicate key");
			}
			STORE.put(e.getCountryId(),e);
		}
		logger.info("[done]");
	}
	
	public static String getNameById(int id){
		if(STORE.get(id) == null){
			return null;
		}
		String name = STORE.get(id).getCountryName();
		return name;
	}
	
	public static int getIdByName(String name){
		Iterator<StaticCountry> it = STORE.values().iterator();
		StaticCountry staticCountry;
		while(it.hasNext()){
			staticCountry = it.next();
			if(name.equals(staticCountry.getCountryName())){
				return staticCountry.getCountryId();
			}
		}
		logger.error(name+" 对应的国家id为空");
		return -1;
	}

}
