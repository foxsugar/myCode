package com.crystalcg.gamedev.friend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.friend.dao.FriendDao;
import com.crystalcg.gamedev.friend.domain.FriendInfo;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;

public class FriendService {
	private FriendDao friendDao;
	private static final int MAX_FRIEND_LIST_AMOUNT = 9;//申请表每页信息数
	private static final int MAX_FRIEND_AMOUNT = 11;//好友每页显示信息数
	public static final int FRIEND_TYPE_FRIEND = 0;
	public static final int FRIEND_TYPE_ENEMY = 1;
	private static final int ERROR_TYPE_COMMON = 0;//普通错误，显示文本
	private static final int ERROR_TYPE_SPECIAL = 1;//特殊错误，特殊处理
	public static final int NO_SELECTED = -1;//没有选择的好友或仇人
	public static final int FRIEND_CAPACITY = 200;//好友容量
	public static final int FRIEND_LIST_CAPACITY = 200;//好友申请列表容量
	
	
	
	
	
	/******************好友相关，其他service会调******************************/
	//判断是否是好友
	/**
	 * @param characterId 自己Id
	 * @param targetId 查询目标Id
	 * @return
	 */
	public boolean isFriend(int characterId, int targetId){
		Map<String, Integer> friend = getUserFriendByFriendId(characterId, targetId);
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_FRIEND){
			return true;
		}else{
			return false;
		}
	}
	//添加仇人
	
	
	
	
	
	
	
	/****************************************************/
	/********************社交功能相关************************/
	/****************************************************/
	
	/**
	 * 拒绝添加好友操作
	 * @param id
	 */
	public Map<String, Object> refuseFriend(int id, int characterId, int page){
		deleteFriendList(id,characterId);
		return getFriendList(characterId, page);
	}
	/**
	 * 同意添加好友操作(没有仇人)
	 * @param id
	 * @param characterId
	 * @throws AppException
	 */
	public Map<String, Object> agreeFriend(int id, int characterId, int page){
		Map<String, Integer> friendList = getFriendListById(id);
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(friendList==null||friendList.get("characterId")!=characterId){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "不存在该申请");
			retMap.put("updateFriendList", getFriendList(characterId, page));
			return retMap;
		}
		Map<String, Integer> friend = getUserFriendByFriendId(friendList.get("characterId"), friendList.get("applyId"));
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_FRIEND){
			deleteFriendList(id,characterId);//删除申请，并抛错
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "该玩家已经是您的好友");
			retMap.put("updateFriendList", getFriendList(characterId, page));
			return retMap;
		}
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_ENEMY){
			retMap.put("errorType", ERROR_TYPE_SPECIAL);
			retMap.put("error", "该玩家为您的仇人,点击确定同意添加为好友,同时将在仇人列表中删除该玩家");
			return retMap;
		}
		insertFriend(friendList.get("characterId"), friendList.get("applyId"), FRIEND_TYPE_FRIEND);
		insertFriend(friendList.get("applyId"), friendList.get("characterId"), FRIEND_TYPE_FRIEND);
		deleteFriendList(id,characterId);
		int amount = getFriendAmount(characterId, FRIEND_TYPE_FRIEND);
		int pages = (amount - 1 + MAX_FRIEND_AMOUNT)/MAX_FRIEND_AMOUNT;
		retMap.put("friendApplyList", getFriendList(characterId, page));
		retMap.put("friends", getFriends(characterId, pages, NO_SELECTED));
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.ADD_FRIEND, null, characterId);
		questService.updateQuestSchedule(QuestTargeType.ADD_FRIEND, null, friendList.get("applyId"));
		return retMap;
		
	}
	/**
	 * 同意添加好友操作(有仇人)
	 * @param id
	 * @param characterId
	 * @throws AppException
	 */
	public Map<String, Object> agreeFriendForOk(int id, int characterId, int page){
		Map<String, Integer> friendList = getFriendListById(id);
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(friendList==null||friendList.get("characterId")!=characterId){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "不存在该申请");
			retMap.put("friendList", getFriendList(characterId, page));
			return retMap;
		}
		Map<String, Integer> friend = getUserFriendByFriendId(friendList.get("characterId"), friendList.get("applyId"));
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_FRIEND){
			deleteFriendList(id,characterId);//删除申请，并抛错
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "该玩家已经是您的好友");
			retMap.put("friendList", getFriendList(characterId, page));
			return retMap;
		}
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_ENEMY){
			deleteUserFriendByFriendId(friendList.get("applyId"), friendList.get("characterId"));
		}
		insertFriend(friendList.get("characterId"), friendList.get("applyId"), FRIEND_TYPE_FRIEND);
		insertFriend(friendList.get("applyId"), friendList.get("characterId"), FRIEND_TYPE_FRIEND);
		deleteFriendList(id,characterId);
		retMap = getFriendList(characterId, page);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.ADD_FRIEND, null, characterId);
		questService.updateQuestSchedule(QuestTargeType.ADD_FRIEND, null, friendList.get("applyId"));
		return retMap;
		
	}
	/**
	 * 获取好友申请列表
	 * @param characterId
	 * @return
	 */
	public Map<String, Object> getFriendList(int characterId, int page){
		if(page<1){
			page = 1;
		}
		int pages = getFriendListPageAmount(characterId);
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(page>pages){
			page = pages;
		}
		if(pages==0){
			retMap.put("friendList", new ArrayList<Object>());
		}else{
			retMap.put("friendList", friendDao.getFriendList(characterId, MAX_FRIEND_LIST_AMOUNT, (page-1)*MAX_FRIEND_LIST_AMOUNT));
		}
		retMap.put("page", page);
		retMap.put("pages", pages);
		return retMap;
	}
	
	/**
	 * 申请好友(没有仇人)
	 * @param characterId
	 * @param friendName
	 * @throws AppException
	 */
	public Map<String, Object> addFriendList(int characterId, String friendName){
		//需添加好友提示推送代码
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		int friendId = characterService.getCharacterIdByName(friendName);
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(friendId==0){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "要添加的好友不存在");
			return retMap;
		}
		if(friendId==characterId){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "无法添加自己为好友");
			return retMap;
		}
		Map<String, Integer> friendList = getFriendListByApplyId(friendId, characterId);
		if(friendList!=null){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "正在申请中,无法重复申请");
			return retMap;
		}
		Map<String, Integer> friend = getUserFriendByFriendId(characterId, friendId);
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_FRIEND){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "该玩家已经是您的好友");
			return retMap;
		}
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_ENEMY){
			retMap.put("errorType", ERROR_TYPE_SPECIAL);
			retMap.put("error", "该玩家为您的仇人,点击确定添加为好友,同时将在仇人列表中删除该玩家");
			return retMap;
		}
		insertFriendList(friendId, characterId);
		UserComet userComet = (UserComet)ServiceLocator.getSpringBean("userComet");
		userComet.deliverToGameChannel(Const.GAME_CHANNEL_FRIEND_WARN, friendId, true);
		retMap.put("message", "申请成功,等待对方确认.");
		return retMap;
	}
	/**
	 * 申请好友(有仇人)
	 * @param characterId
	 * @param friendName
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> addFriendListForOk(int characterId, String friendName){
		//需添加好友提示推送代码
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		int friendId = characterService.getCharacterIdByName(friendName);
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(friendId==0){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "要添加的好友不存在");
			return retMap;
		}
		if(friendId==characterId){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "无法添加自己为好友");
			return retMap;
		}
		Map<String, Integer> friendList = getFriendListByApplyId(friendId, characterId);
		if(friendList!=null){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "正在申请中,无法重复申请");
			return retMap;
		}
		Map<String, Integer> friend = getUserFriendByFriendId(characterId, friendId);
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_FRIEND){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "该玩家已经是您的好友");
			return retMap;
		}
		if(friend!=null&&friend.get("friendType")==FRIEND_TYPE_ENEMY){
			deleteUserFriendByFriendId(friendId, characterId);
		}
		insertFriendList(friendId, characterId);
		retMap.put("message", "申请好友发送成功,等待对方确认.");
		UserComet userComet = (UserComet)ServiceLocator.getSpringBean("userComet");
		userComet.deliverToGameChannel(Const.GAME_CHANNEL_FRIEND_WARN, friendId, true);
		return retMap;
	}
	/**
	 * 获取好友信息
	 * @param characterId
	 * @param page
	 * @return
	 */
	public Map<String, Object> getFriends(int characterId, int page, int selectedLocation){
		if(page<1){
			page = 1;
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		int amount = getFriendAmount(characterId, FRIEND_TYPE_FRIEND);
		int pages = (amount - 1 + MAX_FRIEND_AMOUNT)/MAX_FRIEND_AMOUNT;
		if(page>pages){
			page = pages;
		}
		List<FriendInfo> userFriends;
		if(page==0){
			userFriends = new ArrayList<FriendInfo>();
		}else{
			userFriends = getUserFriends(characterId,FRIEND_TYPE_FRIEND,page,MAX_FRIEND_AMOUNT);
		}
		if(selectedLocation!=NO_SELECTED){
			userFriends.get(selectedLocation).setSelected(true);
		}
		retMap.put("page", page);
		retMap.put("pages", pages);
		retMap.put("friends", userFriends);
		return retMap;
	}
	//查找好友
	/**
	 * 查找好友
	 * @param characterId
	 * @param name
	 * @return
	 */
	public Object selectFriend(int characterId, String name){
		FriendInfo friend = selectUserFriend(characterId, FRIEND_TYPE_FRIEND, name);
		if(friend==null){
			Map<String, Object> retMap = new HashMap<String,Object>();
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "该君主不在你的好友列表中");
			return retMap;
		}
		int location = getFriendLocation(characterId, FRIEND_TYPE_FRIEND, friend.getId());
		int page = (location-1+MAX_FRIEND_AMOUNT)/MAX_FRIEND_AMOUNT;
		int selectedLocation = (location-1)%MAX_FRIEND_AMOUNT;
		return getFriends(characterId, page,selectedLocation);
	}
	
	/**
	 * 删除好友操作
	 * @param id
	 * @param characterId
	 * @param page
	 * @return
	 */
	public Map<String, Object> deleteFriend(int id, int characterId, int page){
		Map<String, Integer> friend = getUserFriendById(id);
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(friend==null||friend.get("characterId")!=characterId||friend.get("friendType")!=FRIEND_TYPE_FRIEND){
			retMap.put("error", "要删除的好友不存在");
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("userFriend", getFriends(characterId, page,NO_SELECTED));
			return retMap;
		}
		deleteUserFriendByFriendId(friend.get("friendId"), friend.get("characterId"));
		deleteUserFriendByFriendId(friend.get("characterId"), friend.get("friendId"));
		return getFriends(characterId, page,NO_SELECTED);
	}
	
	
	
	/**
	 * 删除好友表中的好友或仇人，一般用于删除仇人
	 * @param id
	 * @param characterId
	 */
	public void deleteUserFriend(int id, int characterId){
		friendDao.deleteUserFriend(id,characterId);
	}
	
	//获取仇人
	/**
	 * 获取仇人
	 * @param characterId
	 * @param page
	 * @return
	 */
	public Map<String, Object> getEnemy(int characterId, int page, int selectedLocation){
		if(page<1){
			page = 1;
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		int amount = getFriendAmount(characterId, FRIEND_TYPE_ENEMY);
		int pages = (amount - 1 + MAX_FRIEND_AMOUNT)/MAX_FRIEND_AMOUNT;
		if(page>pages){
			page = pages;
		}
		List<FriendInfo> userFriends;
		if(page==0){
			userFriends = new ArrayList<FriendInfo>();
		}else{
			userFriends = getUserFriends(characterId,FRIEND_TYPE_ENEMY,page,MAX_FRIEND_AMOUNT);
		}
		if(selectedLocation!=NO_SELECTED){
			userFriends.get(selectedLocation).setSelected(true);
		}
		retMap.put("page", page);
		retMap.put("pages", pages);
		retMap.put("friends", userFriends);
		return retMap;
	}
	//添加仇人
	/**
	 * 添加仇人
	 * @param characterId
	 * @param page
	 * @param enemyName
	 * @return
	 */
	public Map<String, Object> addEnemy(int characterId, String enemyName){
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		Map<String, Object> retMap = new HashMap<String,Object>();
		int enemyId = characterService.getCharacterIdByName(enemyName);
		if(enemyId==0){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "未找到该君主,添加仇人失败.");
			return retMap;
		}
		if(enemyId==characterId){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "无法添加自己为仇人");
			return retMap;
		}
		Map<String, Integer> friendList = getFriendListByApplyId(enemyId, characterId);
		if(friendList!=null){
			deleteFriendList(friendList.get("id"), enemyId);
		}
		Map<String, Integer> enemy = getUserFriendByFriendId(characterId, enemyId);
		if(enemy!=null&&enemy.get("friendType")==FRIEND_TYPE_ENEMY){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "该玩家已经是您的仇人,无法重复添加");
			return retMap;
		}
		if(enemy!=null&&enemy.get("friendType")==FRIEND_TYPE_FRIEND){
			retMap.put("errorType", ERROR_TYPE_SPECIAL);
			retMap.put("error", "该玩家是您的好友,确定添加仇人会将该玩家从好友列表中删除.");
			return retMap;
		}
		insertFriend(characterId, enemyId, FRIEND_TYPE_ENEMY);
		retMap.put("message", "添加仇人成功.");
		int amount = getFriendAmount(characterId, FRIEND_TYPE_ENEMY);
		int pages = (amount - 1 + MAX_FRIEND_AMOUNT)/MAX_FRIEND_AMOUNT;
		retMap.put("enemy", getEnemy(characterId, pages,NO_SELECTED));
		return retMap;
		
	}
	public Map<String, Object> addEnemyForOk(int characterId, String enemyName){
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		Map<String, Object> retMap = new HashMap<String,Object>();
		int enemyId = characterService.getCharacterIdByName(enemyName);
		if(enemyId==0){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "未找到该君主,添加仇人失败.");
			return retMap;
		}
		if(enemyId==characterId){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "无法添加自己为仇人");
			return retMap;
		}
		Map<String, Integer> friendList = getFriendListByApplyId(enemyId, characterId);
		if(friendList!=null){
			deleteFriendList(friendList.get("id"), enemyId);
		}
		Map<String, Integer> enemy = getUserFriendByFriendId(characterId, enemyId);
		if(enemy!=null&&enemy.get("friendType")==FRIEND_TYPE_ENEMY){
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "该玩家已经是您的仇人,无法重复添加");
			return retMap;
		}
		if(enemy!=null&&enemy.get("friendType")==FRIEND_TYPE_FRIEND){
			deleteUserFriendByFriendId(enemyId, characterId);
			deleteUserFriendByFriendId(characterId, enemyId);
		}
		insertFriend(characterId, enemyId, FRIEND_TYPE_ENEMY);
		retMap.put("message", "添加仇人成功.");
		int amount = getFriendAmount(characterId, FRIEND_TYPE_ENEMY);
		int pages = (amount - 1 + MAX_FRIEND_AMOUNT)/MAX_FRIEND_AMOUNT;
		retMap.put("enemy", getEnemy(characterId, pages,NO_SELECTED));
		return retMap;
		
	}
	//查找仇人
	public Object selectEnemy(int characterId, String name){
		FriendInfo enemy = selectUserFriend(characterId, FRIEND_TYPE_ENEMY, name);
		if(enemy==null){
			Map<String, Object> retMap = new HashMap<String,Object>();
			retMap.put("errorType", ERROR_TYPE_COMMON);
			retMap.put("error", "该君主不在你的好友列表中");
			return retMap;
		}
		int location = getFriendLocation(characterId, FRIEND_TYPE_ENEMY, enemy.getId());
		int page = (location-1+MAX_FRIEND_AMOUNT)/MAX_FRIEND_AMOUNT;
		int selectedLocation = (location-1)%MAX_FRIEND_AMOUNT;
		return getEnemy(characterId, page, selectedLocation);
	}
	//删除仇人,同删除好友
	public Map<String, Object> deleteEnemy(int id, int characterId, int page){
		deleteUserFriend(id, characterId);
		return getEnemy(characterId, page,NO_SELECTED);
	}
	
	/**
	 * 获取申请表总页数，非通用方法
	 * @param characterId
	 * @return
	 */
	private int getFriendListPageAmount(int characterId){
		int amount = getFriendListAmount(characterId);
		return (amount-1+MAX_FRIEND_LIST_AMOUNT)/MAX_FRIEND_LIST_AMOUNT;
	}
	/**
	 * 获取申请表申请信息数量，非通用方法
	 * @param characterId
	 * @return
	 */
	private int getFriendListAmount(int characterId){
		return friendDao.getFriendListAmount(characterId);
	}
	/**
	 * 获取好友数量
	 * @param characterId
	 * @return
	 */
	public int getFriendAmount(int characterId, int friendType){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("friendType", friendType);
		return friendDao.getFriendAmount(param);
	}
	/**
	 * 向好友列表插入
	 * @param characterId
	 * @param friendId
	 * @param friendType
	 */
	public void insertFriend(int characterId, int friendId, int friendType){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("friendId", friendId);
		param.put("friendType", friendType);
		friendDao.insertFriend(param);
	}
	/**
	 * 向申请列表插入
	 * @param characterId
	 * @param applyId
	 */
	public void insertFriendList(int characterId, int applyId){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("applyId", applyId);
		friendDao.insertFriendList(param);
	}
	public Map<String, Integer> getUserFriendById(int id){
		return friendDao.getUserFriendById(id);
	}
	public List<FriendInfo> getUserFriends(int characterId,int friendType,int page,int pageSize){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("friendType", friendType);
		param.put("page", (page-1)*pageSize);
		param.put("pageSize", pageSize);
		return friendDao.getUserFriends(param);
	}
	public void deleteFriendList(int id, int characterId){
		friendDao.deleteFriendList(id,characterId);
	}
	public Map<String, Integer> getFriendListById(int id){
		return friendDao.getFriendListById(id);
	}
	public FriendInfo selectUserFriend(int characterId, int friendType, String name){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("friendType", friendType);
		param.put("name", name);
		return friendDao.selectUserFriend(param);
	}
	public Map<String, Integer> getFriendListByApplyId(int characterId, int applyId){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("applyId", applyId);
		return friendDao.getFriendListByApplyId(param);
	}
	/**
	 * 获取好友信息，判断是否存在该好友
	 * @param param
	 * @return
	 */
	public Map<String, Integer> getUserFriendByFriendId(int characterId, int friendId){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("friendId", friendId);
		return friendDao.getUserFriendByFriendId(param);
	}
	/**
	 * 删除好友或仇人
	 * @param friendId
	 * @param characterId
	 */
	public void deleteUserFriendByFriendId(int friendId, int characterId){
		friendDao.deleteUserFriendByFriendId(friendId,characterId);
	}
	/**
	 * 获取好友或仇人位置
	 * @param param
	 * @return
	 */
	public Integer getFriendLocation(int characterId, int friendType, int id){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("friendType", friendType);
		param.put("id", id);
		return friendDao.getFriendLocation(param);
	}
	
	/**
	 * 世界地图显示全部仇人
	 * @param characterId
	 * @return
	 */
	public List<Map<String,Object>> getEnemyLocation(int characterId){
		return friendDao.getEnemyLocation(characterId);
	}

	public FriendDao getFriendDao() {
		return friendDao;
	}
	public void setFriendDao(FriendDao friendDao) {
		this.friendDao = friendDao;
	}
}
