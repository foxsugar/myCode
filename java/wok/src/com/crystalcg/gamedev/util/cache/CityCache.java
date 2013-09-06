package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticCity;

/**
 * 主城等级相关
 * @author xuzhongxing
 *
 */
public class CityCache {
	private static Logger logger = LoggerFactory.getLogger(CityCache.class);
	private static Map<Integer,StaticCity> STORE;
	private static int maxLevel;
	
	private CityCache(CacheMapper cacheMapper){
		int level = 0;
		List<StaticCity> list = cacheMapper.getStaticCity();
		STORE = new HashMap<Integer, StaticCity>();
		for(StaticCity e:list){
			if(STORE.containsKey(e.getLevel())){
				logger.error("duplicate key");
			}
			STORE.put(e.getLevel(), e);
			if(e.getLevel()>level){
				level = e.getLevel();
			}
		}
		maxLevel = level;
		logger.info("[done]");
	}
	
	/**
	 * 获取经验上限
	 * @param level 城池等级
	 * @return
	 */
	public static int getExperienceLimitByLevel(int level){
		if(STORE.get(level) == null){
			logger.error(level+" 对应的主城参数为空");
			return -1;
		}
		return STORE.get(level).getExperience();
	}
	
	/**
	 * 获取可建造数量
	 * @param level
	 * @return
	 */
	public static int getBulidingNumByLevel(int level){
		if(STORE.get(level) == null){
			logger.error(level+" 对应的主城参数为空");
			return 0;
		}
		return STORE.get(level).getBulidingNum();
	}
	
	/**
	 * 获取资源点数量
	 * @param level
	 * @return
	 */
	public static int getResourceNumByLevel(int level){
		if(STORE.get(level) == null){
			logger.error(level+" 对应的主城参数为空");
			return 0;
		}
		return STORE.get(level).getResourceNum();
	}
	
	/**
	 * 获取分城数量
	 * @param level
	 * @return
	 */
	public static int getTributaryNumByLevel(int level){
		if(STORE.get(level) == null){
			logger.error(level+" 对应的主城参数为空");
			return 0;
		}
		return STORE.get(level).getTributaryNum();
	}
	
	/**
	 * 获取所属时代
	 * @param level
	 * @return
	 */
	public static int getAgeByLevel(int level){
		if(STORE.get(level) == null){
			logger.error(level+" 对应的主城参数为空");
			if(level > maxLevel){
				return STORE.get(maxLevel).getAge();
			}else if(level<1){
				return STORE.get(1).getAge();
			}else{
				return 0;//最高时代5
			}
		}
		return STORE.get(level).getAge();
	}

	public static int getMaxLevel() {
		return maxLevel;
	}

}
