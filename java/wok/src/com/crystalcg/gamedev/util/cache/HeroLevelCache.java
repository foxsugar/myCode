package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticHeroLevel;

/**
 * 武将等级相关信息
 * @author xuzhongxing
 *
 */
public class HeroLevelCache {


	private static Logger logger = LoggerFactory.getLogger(HeroLevelCache.class);
	private static Map<Integer, StaticHeroLevel> STORE;

	private HeroLevelCache(CacheMapper cacheMapper) {
		List<StaticHeroLevel> list = cacheMapper.getStaticHeroLevel();
		STORE = new HashMap<Integer, StaticHeroLevel>();
		for (StaticHeroLevel e : list) {
			if(STORE.containsKey(e.getHeroLevel())){
				logger.error("duplicate key");
			}
			STORE.put(e.getHeroLevel(), e);
		}
		logger.info("[done]");
	}

	

	/**
	 * 获取该等级的经验上限
	 * @param heroLevel
	 * @return
	 */
	public static int getExpLimit(int heroLevel) {
		StaticHeroLevel levelInfo = STORE.get(heroLevel);
		if(levelInfo == null){
			logger.error("没有等级["+heroLevel+"]对应的数据");
			return 1;
		}
		return levelInfo.getExpLimit();
	}

	/**
	 * 获取该等级的经验池上限
	 * @param heroLevel
	 * @return
	 */
	public static int getPoolLimit(int heroLevel) {
		StaticHeroLevel levelInfo = STORE.get(heroLevel);
		if(levelInfo == null){
			logger.error("没有等级["+heroLevel+"]对应的数据");
			return Integer.MAX_VALUE;
		}
		return levelInfo.getPoolLimit();
	}

}
