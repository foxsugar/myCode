package com.crystalcg.gamedev.building.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.building.dao.BuildQueueDao;
import com.crystalcg.gamedev.building.domain.QueueBuilding;

/**
 * buildQueue表 Mybatis映射接口
 * @author xuzhongxing
 *
 */
public class BuildQueueService {
	
	private BuildQueueDao buildQueueDao;

	/**
	 * 插入建筑队列
	 * @param buildQueue
	 */
	public void insertQueueBuilding(QueueBuilding queueBuilding){
		buildQueueDao.insertQueueBuilding(queueBuilding);
	}
	
	/**
	 * 从队列中删除
	 * @param charId
	 * @param location
	 * @param randomId
	 */
	public void deleteQueueBuilding(int characterId,int location){
		buildQueueDao.deleteQueueBuilding(characterId,location);
	}
	
	/**
	 * 从队列中删除
	 * @param charId
	 * @param location
	 * @param randomId
	 */
	public QueueBuilding getQueueBuilding(int characterId,int location){
		return buildQueueDao.getQueueBuilding(characterId,location);
	}
	/**
	 * 根据位置和用户更新建筑操作cd操作时间
	 * @param queueBuilding
	 */
	public void updateQueueBuilding(QueueBuilding queueBuilding) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("time", queueBuilding.getTime());
		map.put("characterId", queueBuilding.getCharacterId());
		map.put("location", queueBuilding.getLocation());
		this.buildQueueDao.updateQueueBuilding(map);
	}
	/**
	 * 获取全部队列，用于角色登陆时加载未完成的任务
	 * @return
	 */
	public List<QueueBuilding> getAllQueueBuildings(int characterId){
		return buildQueueDao.getAllQueueBuildings(characterId);
	}
	
	public BuildQueueDao getBuildQueueDao() {
		return buildQueueDao;
	}

	public void setBuildQueueDao(BuildQueueDao buildQueueDao) {
		this.buildQueueDao = buildQueueDao;
	}
}
