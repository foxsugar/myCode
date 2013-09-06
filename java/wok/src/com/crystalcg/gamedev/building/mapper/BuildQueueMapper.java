package com.crystalcg.gamedev.building.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.building.domain.QueueBuilding;

/**
 * buildQueue表 Mybatis映射接口
 * @author xuzhongxing
 *
 */
public interface BuildQueueMapper {
	void insertQueueBuilding(QueueBuilding queueBuilding);
	void deleteQueueBuilding(QueueBuilding queueBuilding);
	QueueBuilding getQueueBuilding(QueueBuilding queueBuilding);
	List<QueueBuilding> getAllQueueBuildings(int characterId);
	void updateQueueBuilding(Map<String,Object> map);
	
}
