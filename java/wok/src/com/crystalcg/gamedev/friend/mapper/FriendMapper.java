package com.crystalcg.gamedev.friend.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.friend.domain.FriendInfo;

public interface FriendMapper {
	/**
	 * 向社交插入插入社交信息
	 * @param param
	 */
	void insertFriend(Map<String, Object> param);
	/**
	 * 向申请表插入申请信息
	 * @param param
	 */
	void insertFriendList(Map<String, Object> param);
	/**
	 * 获取申请信息
	 * @param param
	 * @return
	 */
	List<Map<String, Object>> getFriendList(Map<String, Object> param);
	/**
	 * 获取申请信息数量
	 * @param characterId
	 * @return
	 */
	int getFriendListAmount(int characterId);
	/**
	 * 获取好友数量
	 * @param characterId
	 * @return
	 */
	int getFriendAmount(Map<String, Object> param);
	/**
	 * 删除申请信息
	 * @param id
	 */
	void deleteFriendList(Map<String, Object> param);
	/**
	 * 通过Id获取具体申请信息
	 * @param id
	 * @return
	 */
	Map<String, Integer> getFriendListById(int id);
	/**
	 * 通过申请人Id和被申请人Id查询申请列表，用于判断是否已经申请过
	 * @param param
	 * @return
	 */
	Map<String, Integer> getFriendListByApplyId(Map<String, Object> param);
	
	/**
	 * 获取好友信息
	 * @param param
	 * @return
	 */
	List<FriendInfo> getUserFriends(Map<String, Object> param);
	/**
	 * 获取好友信息，判断是否存在该好友
	 * @param param
	 * @return
	 */
	Map<String, Integer> getUserFriendByFriendId(Map<String, Object> param);
	/**
	 * 通过id获取具体好友信息
	 * @param id
	 * @return
	 */
	Map<String, Integer> getUserFriendById(int id);
	/**
	 * 删除好友或仇人
	 * @param param
	 */
	void deleteUserFriend(Map<String, Object> param);
	/**
	 * 删除好友或仇人
	 * @param param
	 */
	void deleteUserFriendByFriendId(Map<String, Object> param);
	/**
	 * 获取具体好友或仇人
	 * @param param
	 * @return
	 */
	FriendInfo selectUserFriend(Map<String, Object> param);
	/**
	 * 获取好友或仇人位置
	 * @param param
	 * @return
	 */
	Integer getFriendLocation(Map<String, Object> param);
	
	/**
	 * 世界地图显示全部仇人
	 * @param characterId
	 * @return
	 */
	List<Map<String,Object>> getEnemyLocation(int characterId);
}
