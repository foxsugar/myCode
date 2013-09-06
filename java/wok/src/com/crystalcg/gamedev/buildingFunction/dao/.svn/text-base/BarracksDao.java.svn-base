package com.crystalcg.gamedev.buildingFunction.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.domain.UserSoldier;
import com.crystalcg.gamedev.buildingFunction.domain.UserSoldierQueue;
import com.crystalcg.gamedev.buildingFunction.mapper.BarracksMapper;

public class BarracksDao {
	
	private BarracksMapper barracksMapper;
	
	/**
	 * 获取已招募的各种、各等级士兵（不包含武将身上的）
	 * @param characterId
	 * @return
	 */
	public List<UserSoldier> getUserSoldier(int characterId){
		return barracksMapper.getUserSoldier(characterId);
	}
//	/**
//	 * 获取士兵，按页获取，用于配兵界面
//	 * @param param
//	 * @return
//	 */
//	public List<UserSoldier> getUserSoldierByPage(Map<String, Object> param){
//		return barracksMapper.getUserSoldierByPage(param);
//	}
//	/**
//	 * 获取玩家拥有的兵种类型数量，用于配兵翻页
//	 * @param characterId
//	 * @return
//	 */
//	public int getUserSoldierTypeAmount(int characterId){
//		return barracksMapper.getUserSoldierTypeAmount(characterId);
//	}
	/**
	 * 根据ID获取用户此兵种的数量
	 * @param characterId
	 * @return
	 */
	public Integer getUserSoldierAmount(int characterId,String soldierNo){
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("soldierNo", soldierNo);
		return barracksMapper.getUserSoldierAmount(param);
	}
	
	/**
	 * 查询招募队列
	 * @param param
	 */
	public Integer getUserSoldierQueueCount(int characterId){
		return barracksMapper.getUserSoldierQueueCount(characterId);
	}
	
	public UserSoldierQueue getUserSoldierQueue(int characterId){
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		return barracksMapper.getUserSoldierQueue(param);
	}
	
	/**
	 * 增加招募队列
	 * @param param
	 */
	public void addUserSoldierQueue(UserSoldierQueue userSoldierQueue){
		barracksMapper.addUserSoldierQueue(userSoldierQueue);
	}
	
	/**
	 * 删除招募队列
	 * @param param
	 */
	public void deleteUserSoldierQueue(int characterId,String soldierNo){
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("soldierNo", soldierNo);
		barracksMapper.deleteUserSoldierQueue(param);
	}
	
	/**
	 * 增加已招募的士兵
	 * @param param
	 */
	public void addUserSoldier(int characterId,String soldierNo,int soldierAmount){
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("soldierNo", soldierNo);
		param.put("soldierAmount", soldierAmount);
		barracksMapper.addUserSoldier(param);
	}
	
	/**
	 * 更新已招募士兵数量(当全部进阶时更新兵阶)
	 * @param param
	 */
	public void updateUserSoldier(int characterId,String soldierNo,int soldierAmount){
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("soldierNo", soldierNo);
		param.put("soldierAmount", soldierAmount);
		barracksMapper.updateUserSoldier(param);
	}
	
	/**
	 * 删除已招募士兵
	 * @param param
	 */
	public void deleteUserSoldier(int characterId,String soldierNo){
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("soldierNo", soldierNo);
		barracksMapper.deleteUserSoldier(param);
	}
//	
//	
//	
//	/**
//	 * 根据兵种编号查询用户兵种
//	 * @param param
//	 * @return
//	 */
//	public UserSoldier getUserSoldierByNo(int characterId,String soldierNo){
//		Map<String,Object> param = new HashMap<String, Object>();
//		param.put("characterId", characterId);
//		param.put("soldierNo", soldierNo);
//		return barracksMapper.getUserSoldierByNo(param);
//	}
	/**
	 * 获取所有兵种训练队列
	 * @return
	 */
	public List<UserSoldierQueue> getAllUserSoldier(){
		return barracksMapper.getAllUserSoldier();
	}
	public BarracksMapper getBarracksMapper() {
		return barracksMapper;
	}

	public void setBarracksMapper(BarracksMapper barracksMapper) {
		this.barracksMapper = barracksMapper;
	}
	/**
	 * 更新招募队列
	 * @param queue
	 */
	public void updateUserSoldierQueue(UserSoldierQueue queue) {
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("characterId", queue.getCharacterId());
		param.put("soldierNo", queue.getSoldierNo());
		param.put("amount", queue.getAmount());
		param.put("time", queue.getTime());
		barracksMapper.updateUserSoldierQueue(param);
	}
	
}
