package com.crystalcg.gamedev.util.cache;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticWorldCity;

public class WorldCityCache {
	private static Logger logger = LoggerFactory.getLogger(WorldCityCache.class);
	private static Map<Integer, StaticWorldCity> STORE;
	private static Map<Point,StaticWorldCity> COOR_STORE;
	private static List<StaticWorldCity> LIST_STORE_ALL;
	private static List<Map<String,Object>> LIST_STORE_ALL_SUMMARY;
	private static List<StaticWorldCity> LIST_STORE_1;
	private static List<StaticWorldCity> LIST_STORE_2;
	private static List<StaticWorldCity> LIST_STORE_3;
	private static List<StaticWorldCity> LIST_STORE_4;
	private static List<StaticWorldCity> LIST_STORE_5;
	private static List<StaticWorldCity> LIST_STORE_6;
	
	private WorldCityCache(CacheMapper cacheMapper){
		STORE = new HashMap<Integer, StaticWorldCity>();
		COOR_STORE = new HashMap<Point, StaticWorldCity>();
		LIST_STORE_ALL = new ArrayList<StaticWorldCity>();
		LIST_STORE_ALL_SUMMARY = new ArrayList<Map<String,Object>>();
		LIST_STORE_1 = new ArrayList<StaticWorldCity>();
		LIST_STORE_2 = new ArrayList<StaticWorldCity>();
		LIST_STORE_3 = new ArrayList<StaticWorldCity>();
		LIST_STORE_4 = new ArrayList<StaticWorldCity>();
		LIST_STORE_5 = new ArrayList<StaticWorldCity>();
		LIST_STORE_6 = new ArrayList<StaticWorldCity>();
		List<StaticWorldCity> list = cacheMapper.getStaticWorldCity();
		for(StaticWorldCity e : list){
			STORE.put(e.getId(), e);
			COOR_STORE.put(new Point(e.getX(), e.getY()), e);
			LIST_STORE_ALL.add(e);
			if(e.getType() == 2){
				switch(e.getCountry()){
				case 1:
					LIST_STORE_1.add(e);
					break;
				case 2:
					LIST_STORE_2.add(e);
					break;
				case 3:
					LIST_STORE_3.add(e);
					break;
				case 4:
					LIST_STORE_4.add(e);
					break;
				case 5:
					LIST_STORE_5.add(e);
					break;
				case 6:
					LIST_STORE_6.add(e);
				}
			}
		}
		Collections.shuffle(LIST_STORE_1);
		Collections.shuffle(LIST_STORE_2);
		Collections.shuffle(LIST_STORE_3);
		Collections.shuffle(LIST_STORE_4);
		Collections.shuffle(LIST_STORE_5);
		Collections.shuffle(LIST_STORE_6);
		Map<String,Object> temp;
		for(StaticWorldCity e : LIST_STORE_ALL){
			temp = new HashMap<String,Object>();
			temp.put("id", e.getId());
			temp.put("name", e.getName());
			temp.put("type", e.getType());
			temp.put("x", e.getX());
			temp.put("y", e.getY());
			LIST_STORE_ALL_SUMMARY.add(temp);
		}
		logger.info("[done]");
	}
	
	/**
	 * 根据id获取城市
	 * @param id
	 * @return
	 */
	public static StaticWorldCity getWorldCity(int id){
		return STORE.get(id);
	}
	
	/**
	 * 根据坐标获取城池
	 * @param id
	 * @return
	 */
	public static StaticWorldCity getWorldCity(int x,int y){
		return COOR_STORE.get(new Point(x, y));
	}
	
	public static List<StaticWorldCity> getRandomWorldCity(int country){
		switch(country){
		case 1:
			return LIST_STORE_1;
		case 2:
			return LIST_STORE_2;
		case 3:
			return LIST_STORE_3;
		case 4:
			return LIST_STORE_4;
		case 5:
			return LIST_STORE_5;
		case 6:
			return LIST_STORE_6;
		default:
			return null;
		}
	}
	
	/**
	 * 获取全部城池
	 * @return
	 */
	public static List<Map<String,Object>> getAllCity(){
		return LIST_STORE_ALL_SUMMARY;
	}
	
}
