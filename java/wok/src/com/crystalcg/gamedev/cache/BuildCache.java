package com.crystalcg.gamedev.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.building.domain.QueueBuilding;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

/**
 * 暂时用于缓存数据，需要用memcache替换
 * @author xuzhongxing
 */
public class BuildCache {
	private static Logger logger = LoggerFactory.getLogger(BuildCache.class);
	//建筑队列，保存正在建造中的建筑Map<角色ID，Map<建筑物位置,建筑实例>>
	private static Map<Integer,Map<Integer,QueueBuilding>> USER_BUILDING = new HashMap<Integer, Map<Integer,QueueBuilding>>();
	
	/**
	 * 获取用户的建筑队列
	 * @param characterId 角色ID
	 * @return Map<Integer,CastleBuilding> 角色ID对应的建造队列
	 */
	public static Map<Integer,QueueBuilding> getBuilding(int characterId){
		return USER_BUILDING.get(characterId);
	}
	
	/**
	 * 队列是否已满
	 * @param characterId 角色ID
	 * @param buildNum 建筑排程
	 * @return boolean 满：true，不满：false
	 */
	public static boolean isBuildQueueFull(Integer characterId,int buildNum){
		Map<Integer,QueueBuilding> buildMap = USER_BUILDING.get(characterId);
		return buildMap !=null && buildMap.size()>=buildNum;
	}
	
	/**
	 * 从队列中取建筑实例
	 * @param characterId 角色ID
	 * @param location 建筑物位置
	 * @return CastleBuilding 建筑实例
	 */
	public static QueueBuilding getBuilding(Integer characterId,Integer location){
		Map<Integer,QueueBuilding> buildMap = USER_BUILDING.get(characterId);
		if(buildMap == null){
			return null;
		}
		return buildMap.get(location);
	}
	
	/**
	 * 把建筑实例放入队列
	 * @param characterId 角色ID
	 * @param location 建筑物位置
	 * @param castleBuilding 建筑实例
	 */
	public static void setBuilding(QueueBuilding buildQueue,int buildNum){
		Map<Integer,QueueBuilding> buildMap = USER_BUILDING.get(buildQueue.getCharacterId());
		if(buildMap == null){
			buildMap = new LinkedHashMap<Integer, QueueBuilding>();
		}else if(buildMap.size()>=buildNum){
			logger.warn("建筑队列已满");
			return;
		}
		USER_BUILDING.put(buildQueue.getCharacterId(), buildMap);
		buildMap.put(buildQueue.getLocation(), buildQueue);
	}
	
	/**
	 * 删除队列中的建筑(取消建造，或者建造完成后)
	 * @param characterId 角色ID
	 * @param location 建筑物位置
	 * @return 建筑实例
	 */
	public static QueueBuilding removeBuilding(Integer characterId,Integer location){
		Map<Integer,QueueBuilding> buildMap = USER_BUILDING.get(characterId);
		if(buildMap == null){
			return null;
		}
		return buildMap.remove(location);
	}
	/**
	 * comet推送建筑队列，推送结构同AJAX请求返回结构
	 * @param characterId
	 */
	public static void pushBuildingQueue(int characterId){
		Map<Integer,QueueBuilding> buildQueue = BuildCache.getBuilding(characterId);
		Map<String,List<Map<String,Object>>> retMap = new HashMap<String, List<Map<String,Object>>>();
		UserComet uc = (UserComet)ServiceLocator.getSpringBean("userComet");
		if(buildQueue == null){
			retMap.put("buildQueue", null);
			uc.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, retMap);
		}else{
			List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
			QueueBuilding queueBuilding;
			Map<String,Object> temp;
			Iterator<Integer> it = buildQueue.keySet().iterator();
			long time;
			while(it.hasNext()){
				queueBuilding = buildQueue.get(it.next());
				temp = new HashMap<String,Object>();
				StaticBuilding curEntity = BuildingCache.getBuildingEntityByNo(queueBuilding.getCurrentBuildingNo());
				StaticBuilding tarEntity = BuildingCache.getBuildingEntityByNo(queueBuilding.getTargetBuildingNo());
				temp.put("name", tarEntity.getBuildingName());
				temp.put("status",Const.getBuildingStatusDesc(queueBuilding.getStatus()));
				temp.put("curLevel", curEntity.getLevel());
				temp.put("tarLevel", tarEntity.getLevel());
				time = queueBuilding.getStartTime().getTime()+queueBuilding.getTime();
				temp.put("time", time);
				retList.add(temp);
			}
			retMap.put("buildQueue", retList);
			uc.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, retMap);
		}
	}
}
