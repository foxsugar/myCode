package com.crystalcg.gamedev.util.cache;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticAffairBonus;

/**
 * 内政奖励
 * 
 * @author xuzhongxing
 * 
 */
public class AffairBonusCache {
	private static Logger logger = LoggerFactory.getLogger(AffairBonusCache.class);
	private static Map<String, StaticAffairBonus> STORE;// 内政编号-->对象

	private AffairBonusCache(CacheMapper cacheMapper) {
		STORE = new LinkedHashMap<String, StaticAffairBonus>();
		List<StaticAffairBonus> list = cacheMapper.getStaticAffairBonus();
		for (StaticAffairBonus e : list) {
			if (STORE.containsKey(e.getAffairNo())) {
				logger.error("duplicate key");
			}
			STORE.put(e.getAffairNo(), e);
		}
		logger.info("[done]");
	}

	/**
	 * 获取全部内政策略
	 * 
	 * @return
	 */
	public static Collection<StaticAffairBonus> getAllAffair() {
		return STORE.values();
	}

	/**
	 * 根据编号获取内政策略
	 * 
	 * @param affairNo
	 * @return
	 */
	public static StaticAffairBonus getAffairByNo(String affairNo) {
		return STORE.get(affairNo);
	}

}
