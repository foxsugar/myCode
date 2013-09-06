package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticWorldResource;

public class WorldResourceCache {
	private static Logger logger = LoggerFactory.getLogger(WorldResourceCache.class);
	private static Map<Integer, StaticWorldResource> STORE;
	private static List<StaticWorldResource> LIST_STORE;
	
	private WorldResourceCache(CacheMapper cacheMapper){
		STORE = new HashMap<Integer, StaticWorldResource>();
		LIST_STORE = cacheMapper.getStaticWorldResource();
		for(StaticWorldResource e:LIST_STORE){
			STORE.put(e.getId(), e);
		}
		logger.info("[done]");
	}
	
	/**
	 * 根据id获取资源
	 * @param id
	 * @return
	 */
	public static StaticWorldResource getWorldResource(int id){
		return STORE.get(id);
	}
	
	public static List<StaticWorldResource> getList(){
		return LIST_STORE;
	}
}
