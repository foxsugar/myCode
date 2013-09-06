package com.crystalcg.gamedev.friend.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.friend.domain.FriendInfo;
import com.crystalcg.gamedev.friend.mapper.FriendMapper;

public class FriendDao {
	private FriendMapper friendMapper;
	
	/**
	 * 获取好友信息
	 * @param param
	 * @return
	 */
	public List<FriendInfo> getUserFriends(Map<String, Object> param){
		return friendMapper.getUserFriends(param);
	}
	/**
	 * 获取具体好友或仇人
	 * @param param
	 * @return
	 */
	public FriendInfo selectUserFriend(Map<String, Object> param){
		return friendMapper.selectUserFriend(param);
	}
	/**
	 * 通过Id获取具体申请信息
	 * @param id
	 * @return
	 */
	public Map<String, Integer> getFriendListById(int id){
		return friendMapper.getFriendListById(id);
	}
	/**
	 * 删除申请信息
	 * @param id
	 */
	public void deleteFriendList(int id, int characterId){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("id", id);
		param.put("characterId", characterId);
		friendMapper.deleteFriendList(param);
	}
	/**
	 * 向社交插入插入社交信息
	 * @param param
	 */
	public void insertFriend(Map<String, Object> param){
		friendMapper.insertFriend(param);
	}
	/**
	 * 向申请表插入申请信息
	 * @param param
	 */
	public void insertFriendList(Map<String, Object> param){
		friendMapper.insertFriendList(param);
	}
	/**
	 * 获取申请信息
	 * @param characterId
	 * @param pageSize
	 * @param page
	 * @return
	 */
	public List<Map<String, Object>> getFriendList(int characterId, int pageSize, int page){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("pageSize", pageSize);
		param.put("page", page);
		return friendMapper.getFriendList(param);
	}
	/**
	 * 通过申请人Id和被申请人Id查询申请列表，用于判断是否已经申请过
	 * @param param
	 * @return
	 */
	public Map<String, Integer> getFriendListByApplyId(Map<String, Object> param){
		return friendMapper.getFriendListByApplyId(param);
	}
	/**
	 * 获取申请信息数量
	 * @param characterId
	 * @return
	 */
	
	public int getFriendListAmount(int characterId){
		return friendMapper.getFriendListAmount(characterId);
	}
	/**
	 * 获取好友数量
	 * @param characterId
	 * @return
	 */
	public int getFriendAmount(Map<String, Object> param){
		return friendMapper.getFriendAmount(param);
	}
	/**
	 * 通过id获取具体好友信息
	 * @param id
	 * @return
	 */
	public Map<String, Integer> getUserFriendById(int id){
		return friendMapper.getUserFriendById(id);
	}
	/**
	 * 获取好友信息，判断是否存在该好友
	 * @param param
	 * @return
	 */
	public Map<String, Integer> getUserFriendByFriendId(Map<String, Object> param){
		return friendMapper.getUserFriendByFriendId(param);
	}
	/**
	 * 删除好友或仇人
	 * @param id
	 * @param characterId
	 */
	public void deleteUserFriend(int id, int characterId){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("id", id);
		param.put("characterId", characterId);
		friendMapper.deleteUserFriend(param);
	}
	/**
	 * 删除好友或仇人
	 * @param friendId
	 * @param characterId
	 */
	public void deleteUserFriendByFriendId(int friendId, int characterId){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("friendId", friendId);
		param.put("characterId", characterId);
		friendMapper.deleteUserFriendByFriendId(param);
	}
	/**
	 * 获取好友或仇人位置
	 * @param param
	 * @return
	 */
	public Integer getFriendLocation(Map<String, Object> param){
		return friendMapper.getFriendLocation(param);
	}
	
	/**
	 * 世界地图显示全部仇人
	 * @param characterId
	 * @return
	 */
	public List<Map<String,Object>> getEnemyLocation(int characterId){
		return friendMapper.getEnemyLocation(characterId);
	}
	
	
	public void setFriendMapper(FriendMapper friendMapper) {
		this.friendMapper = friendMapper;
	}
	
	public FriendMapper getFriendMapper() {
		return friendMapper;
	}

}
