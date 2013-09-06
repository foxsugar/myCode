package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticCharacter;

/**
 * 君主等级
 * @author xuzhongxing
 *
 */
public class CharacterCache {
	private static Logger logger = LoggerFactory.getLogger(CharacterCache.class);
	private static Map<Integer, StaticCharacter> STORE;

	private CharacterCache(CacheMapper cacheMapper) {
		List<StaticCharacter> list = cacheMapper.getStaticCharacter();
		STORE = new HashMap<Integer, StaticCharacter>();
		for (StaticCharacter e : list) {
			STORE.put(e.getLevel(), e);
		}
	}

	/**
	 * 根据等级获得经验上限
	 * @param level
	 * @return
	 */
	public static int getExperienceLimitByLevel(int level) {
		if (STORE.get(level) == null) {
			logger.error(level + " 对应的君主参数为空");
			return 0;
		}
		return STORE.get(level).getExperience();
	}

	/**
	 * 根据等级获得可招募武将上限
	 * @param level
	 * @return
	 */
	public static int getHeroLimitByLevel(int level) {
		if (STORE.get(level) == null) {
			logger.error(level + " 对应的君主参数为空");
			return 0;
		}
		return STORE.get(level).getHeroLimit();
	}

}
