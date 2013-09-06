package com.crystalcg.gamedev.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.hero.domain.Hero;

/**
 * 暂时用于缓存数据，需要用memcache替换
 * @author xuzhongxing
 */
public class TavernRefreshCache {
//	private static Logger logger = LoggerFactory.getLogger(TavernHeroCache.class);
	//角色id<-->酒馆刷新武将
	private static Map<Integer,List<Hero>> USER_TAVERN = new HashMap<Integer,List<Hero>> ();
	private static Map<Integer,Long> USER_REFRESH_TIME = new HashMap<Integer,Long> ();
	
	/**
	 * 获取用户的当前刷新武将
	 * @param characterId
	 * @return
	 */
	public static List<Hero> getHeros(int characterId){
		return USER_TAVERN.get(characterId);
	}
	
	/**
	 * 设置用户当前刷新武将
	 * @param characterId
	 * @param heros
	 */
	public static void setHeros(int characterId,List<Hero> heros){
		USER_TAVERN.put(characterId, heros);
	}
	
	/**
	 * 获取用户酒馆上次刷新时间
	 * @param characterId
	 * @return
	 */
	public static long getLastRefreshTime (int characterId){
		Long lastRefreshTime = USER_REFRESH_TIME.get(characterId);
		if(lastRefreshTime == null){
			return 0;
		}else{
			return lastRefreshTime.longValue();
		}
	}
	
	/**
	 * 当job停止时设置最后一次刷新时间
	 * @param characterId
	 * @param heros
	 */
	public static void setLastRefreshTime(int characterId,long refreshTime){
		USER_REFRESH_TIME.put(characterId, refreshTime);
	}
	
	public static void main(String[] args){
		System.out.println(TavernRefreshCache.getLastRefreshTime(0));
	}
	
	
}
