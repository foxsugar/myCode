package com.crystalcg.gamedev.battle.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battle.domain.CollectionJobQueue;
import com.crystalcg.gamedev.battle.mapper.BattleMapper;

public class BattleDao {
	private BattleMapper battleMapper;

	/**
	 * 插入战斗队列
	 * @param battleJobQueue
	 */
	public void insertBattelQueue(BattleJobQueue battleJobQueue){
		battleMapper.insertBattelQueue(battleJobQueue);
	}
	/**
	 * 更新战斗队列(只更新状态和到达时间)
	 * @param battleJobQueue
	 */
	public void updateBattelQueue(BattleJobQueue battleJobQueue){
		battleMapper.updateBattelQueue(battleJobQueue);
	}
	/**
	 * 删除战斗队列
	 * @param battleJobQueue
	 */
	public void deleteBattelQueue(BattleJobQueue battleJobQueue){
		battleMapper.deleteBattelQueue(battleJobQueue);
	}
	/**
	 * 获取玩家军情
	 * @param param
	 * @return
	 */
	public List<BattleJobQueue> selectBattleQueue(Map<String, Object> param){
		return battleMapper.selectBattleQueue(param);
	}
	/**
	 * 获取玩家军情，按类型获取
	 * @param param
	 * @return
	 */
	public List<BattleJobQueue> getBattleQueue(Map<String, Object> param){
		return battleMapper.getBattleQueue(param);
	}
	/**
	 * 获取玩家军情数量
	 * @param param
	 * @return
	 */
	public int getBattleQueueAmount(Map<String, Object> param){
		return battleMapper.getBattleQueueAmount(param);
	}
	/**
	 * 通过Id获取战斗队列
	 * @param battleJobQueueId
	 * @return
	 */
	public BattleJobQueue selectBattleQueueById(int battleJobQueueId){
		return battleMapper.selectBattleQueueById(battleJobQueueId);
	}
	
	/**
	 * 获取军情，用于城郊
	 * @param param
	 * @return
	 */
	public ConcurrentLinkedQueue<BattleJobQueue> getBattleQueueForSuburbByStatus(Map<String, Object> param){
		return battleMapper.getBattleQueueForSuburbByStatus(param);
	}
	/**
	 * 获取玩家城郊军情数量
	 * @param targetId
	 * @return
	 */
	public int getBattleAmountForSuburb(Map<String, Object> param){
		return battleMapper.getBattleAmountForSuburb(param);
	}
	
	/**
	 * 获取所有军情
	 * @return
	 */
	public List<BattleJobQueue> selectAllBattleQueue(){
		return battleMapper.selectAllBattleQueue();
	}
	/**
	 * 根据目标id和自己id以及战争类型查看所有军队队列信息（按时间升序排列（从小到大））
	 * @param param
	 * @return
	 */
	public List<BattleJobQueue> getBattleByCidAndTargetId(Map<String, Object> param) {
		return battleMapper.getBattleByCidAndTargetId(param);
	}
	/**
	 * 获取该资源
	 * @param x
	 * @param y
	 * @return
	 */
	public CollectionJobQueue getCollectionQueue(int x,int y){
		Map<String, Object> param =new HashMap<String, Object>();
		param.put("x", x);
		param.put("y", y);
		return battleMapper.getCollectionQueue(param);
	}
	/**
	 * 插入采集队列
	 */
	public void insertCollectionJobQueue(CollectionJobQueue cjq){
		battleMapper.insertCollectionJobQueue(cjq);
	}
	/**
	 * 根据行军状态获取所有军情
	 * @return
	 */
	public List<BattleJobQueue> selectAllBattleQueueByStatus(int status){
		return battleMapper.selectAllBattleQueueByStatus(status);
	}
	public BattleMapper getBattleMapper() {
		return battleMapper;
	}

	public void setBattleMapper(BattleMapper battleMapper) {
		this.battleMapper = battleMapper;
	}
	
}
