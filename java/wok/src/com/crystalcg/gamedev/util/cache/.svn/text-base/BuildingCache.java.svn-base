package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

/**
 * 建筑建造信息
 * @author xuzhongxing
 *
 */
public class BuildingCache {
	private static Logger logger = LoggerFactory.getLogger(BuildingCache.class);
	final public static int TRIBUTARY_CITY = 0;//分城建筑
	final public static int RESOURCE = 1;//资源建筑
	final public static int MAIN_CITY = 2;//主城建筑
	final public static int ALL_CITY = 3;//可在主城和分城同时建造的建筑
	final public static int START_LEVEL = 1;//建筑物的初始等级
	private static Map<String,StaticBuilding> STORE;
	private static List<StaticBuilding> BUILDING_TREE;//初始建造树
	
	private BuildingCache(CacheMapper cacheMapper){
		List<StaticBuilding> list = cacheMapper.getStaticBuilding();
		STORE = new HashMap<String,StaticBuilding>();
		BUILDING_TREE = new ArrayList<StaticBuilding>();
		for(StaticBuilding e:list){
			STORE.put(e.getBuildingNo(), e);
			if((e.getBuildingType() == BuildingCache.MAIN_CITY || e.getBuildingType() == BuildingCache.ALL_CITY)
					&& e.getLevel() == BuildingCache.START_LEVEL 
					&& !Const.OFFICAIL_BUILDING_NO.equals(e.getBuildingNo())
					&& !Const.WALL_BUILDING_NO.equals(e.getBuildingNo())){//建筑树排除太尉府、城墙
				BUILDING_TREE.add(e);
			}
		}
		logger.info("[done]");
	}
	
	public static StaticBuilding getBuildingEntityByNo(String buildingNo){
		return STORE.get(buildingNo);
	}
	
	public static List<StaticBuilding> getBuildingTree(){
		return BUILDING_TREE;
	}

}
