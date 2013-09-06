package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticAllianceShoping;

public class AllianceShopingCache {
	private static Logger logger = LoggerFactory.getLogger(AllianceShopingCache.class);
	private static Map<String, StaticAllianceShoping> STORE ;
	private static List<StaticAllianceShoping> LIST;
	private AllianceShopingCache(CacheMapper cacheMapper){
	     LIST = cacheMapper.getStaticAllianceShoping();
		STORE = new HashMap<String, StaticAllianceShoping>();
		for(StaticAllianceShoping e : LIST){
			if(STORE.containsKey(e.getItemNo())){
				logger.error("duplicate key");
			}
			STORE.put(e.getItemNo(), e);
		}
		logger.info("[done]");
	}
	/**
	 * 根据物品编号查询
	 * @param itemNo
	 * @return
	 */
	public static StaticAllianceShoping getStaticAllianceShoping(String itemNo){
		return STORE.get(itemNo);
	}
	/**
	 * 返回所有物品
	 * @return
	 */
	public static List<StaticAllianceShoping> getAllStaticShoping(){
		return LIST;
	}
}
