package com.crystalcg.gamedev.tech.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.domain.UserInteriorTech;

/**
 * 科教馆mapper，内政部分
 * @author jinganyang
 *
 */
public interface InteriorTechMapper {
	/**
	 * 获取所有用户科内政技信息
	 * @param characterId
	 * @return
	 */
	List<UserInteriorTech> getUserInteriorInfo(int characterId);
	/**
	 * 按位置查找用户内政科技信息
	 * @param param
	 * @return
	 */
	UserInteriorTech getUserInteriorByKey(Map<String, Object> param);
	/**
	 * 通过科技编号获取玩家内政科技
	 * @param param
	 * @return
	 */
	UserInteriorTech getUserInteriorByNo(Map<String, Object> param);
	/**
	 * 获取用户科技信息队列
	 * @param characterId
	 * @return
	 */
	TechQueue getTechQueue(int characterId);
	/**
	 * 添加用户科技研究队列
	 * @param userInteriorQueue
	 * @return
	 */
	void addTechQueue(TechQueue userInteriorQueue);
	/**
	 * 添加玩家科技
	 * @param param
	 */
	void addInteriorTech(UserInteriorTech userInteriorTech);
	/**
	 * 删除玩家内政科技
	 * @param param
	 */
	void deleteInteriorTech(Map<String, Object> param);
	/**
	 * 删除玩家科技队列
	 * @param param
	 */
	void deleteTechQueue(int characterId);
	/**
	 * 更新玩家内政科技
	 * @param param
	 */
	void updateInteriorTech(UserInteriorTech userInteriorTech);
	/**
	 * 更新玩家队列
	 * @param param
	 */
	void updateTechQueue(Map<String, Object> param);
	
}
