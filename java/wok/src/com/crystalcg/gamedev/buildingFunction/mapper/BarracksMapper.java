package com.crystalcg.gamedev.buildingFunction.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.domain.UserSoldier;
import com.crystalcg.gamedev.buildingFunction.domain.UserSoldierQueue;

/**
 * 兵营
 * @author xuzhongxing
 *
 */
public interface BarracksMapper {
	
	List<UserSoldier> getUserSoldier(int characterId);
//	/**
//	 * 获取士兵，按页获取
//	 * @param param
//	 * @return
//	 */
//	List<UserSoldier> getUserSoldierByPage(Map<String, Object> param);
//	/**
//	 * 获取玩家拥有的兵种类型数量，用于配兵翻页
//	 * @param characterId
//	 * @return
//	 */
//	int getUserSoldierTypeAmount(int characterId);
	Integer getUserSoldierAmount(Map<String, Object> param);
	Integer getUserSoldierQueueCount(int characterId);
	void addUserSoldierQueue(UserSoldierQueue userSoldierQueue);
	UserSoldierQueue getUserSoldierQueue(Map<String, Object> param);
	void deleteUserSoldierQueue(Map<String, Object> param);
	void addUserSoldier(Map<String,Object> param);
	void updateUserSoldier(Map<String,Object> param);
	void deleteUserSoldier(Map<String,Object> param);
	List<UserSoldierQueue> getAllUserSoldier();
//	void getUserSoldier(int characterId);
//	UserSoldier getUserSoldierByNo(Map<String,Object> param);
	void updateUserSoldierQueue(Map<String, Object> param);
}
