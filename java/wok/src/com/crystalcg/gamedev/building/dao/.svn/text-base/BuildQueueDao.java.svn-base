package com.crystalcg.gamedev.building.dao;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.building.domain.QueueBuilding;
import com.crystalcg.gamedev.building.mapper.BuildQueueMapper;

/**
 * buildQueue表 Mybatis映射接口
 * @author xuzhongxing
 *
 */
public class BuildQueueDao {
	
	private BuildQueueMapper buildQueueMapper;
	
	/**
	 * 插入建筑队列
	 * @param buildQueue
	 */
	public void insertQueueBuilding(QueueBuilding queueBuilding){
		buildQueueMapper.insertQueueBuilding(queueBuilding);
	}
	
	/**
	 * 从队列中删除
	 * @param charId
	 * @param location
	 * @param randomId
	 */
	public void deleteQueueBuilding(int characterId,int location){
		QueueBuilding queueBuilding = new QueueBuilding();
		queueBuilding.setCharacterId(characterId);
		queueBuilding.setLocation(location);
		buildQueueMapper.deleteQueueBuilding(queueBuilding);
	}
	
	/**
	 * 获取
	 * @param characterId
	 * @param location
	 */
	public QueueBuilding getQueueBuilding(int characterId, int location) {
		QueueBuilding queueBuilding = new QueueBuilding();
		queueBuilding.setCharacterId(characterId);
		queueBuilding.setLocation(location);
		return buildQueueMapper.getQueueBuilding(queueBuilding);
	}
	/**
	 * 根据位置和用户更新建筑操作cd操作时间
	 * @param map
	 */
	public void updateQueueBuilding(Map<String,Object> map){
		this.buildQueueMapper.updateQueueBuilding(map);
	}
	
	/**
	 * 获取全部队列，用于服务器启动时加载未完成的任务
	 * @return
	 */
	public List<QueueBuilding> getAllQueueBuildings(int characterId){
		return buildQueueMapper.getAllQueueBuildings(characterId);
	}
	
	public BuildQueueMapper getBuildQueueMapper() {
		return buildQueueMapper;
	}
	
	public void setBuildQueueMapper(BuildQueueMapper buildQueueMapper) {
		this.buildQueueMapper = buildQueueMapper;
	}
	
}
