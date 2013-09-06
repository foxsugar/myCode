package com.crystalcg.gamedev.battle.mapper;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battle.domain.CollectionJobQueue;

public interface BattleMapper {
//	List<Map<String, Object>> getUserArrayName(int charId);//获取玩家拥有的阵法名称
//	List<Map<String, Object>> getMonsterInfo(int monsterType);//获取怪物信息;
//	List<Map<String, Object>> getUserArray(int charId);//获取玩家拥有的阵法,目前缺少sql配置，表建好后需要添加;
//	List<Map<String, Object>> getUserSoldierInfo(int charId);//获取玩家的士兵信息;
//	List<Map<String, Object>> getSoldierList(int charId);//获取玩家的士兵信息,用于配兵
//	int getSoldierAmount(int charId);//获取玩家拥有士兵种类的个数，用于翻页
//	void updateSoldierAmount(Map<String, Object> param);// 更新士兵数量，用于配兵
//	void deleteUserSoldier(Map<String, Object> param);//删除士兵，用于配兵
//	Map<String, Object> getMonsterInfoByMonsterId(int monsterId);//获取野外怪物具体信息,需要改
//	Map<String, Object> getRewardItem(int itemId);//获得奖励道具
//	List<HeroForBattle> getSingleMonsterHeroByMonsterId();//通过monsterId获取野外势力单挑英雄信息
//	Soldier getSoldierInfoBySoldierId(int soldierId);//获取兵种信息
	
	
//	List<BattleJobQueue> selectAllBattleQueue();//获取所有玩家军情，写入缓存
	///////战场队列相关///////
	/**
	 * 插入战斗队列
	 * @param battleJobQueue
	 */
	void insertBattelQueue(BattleJobQueue battleJobQueue);//插入战斗队列
	/**
	 * 更新战斗队列(只更新状态和到达时间)
	 * @param battleJobQueue
	 */
	void updateBattelQueue(BattleJobQueue battleJobQueue);//更新战斗队列(只更新状态和到达时间)
	/**
	 * 删除战斗队列
	 * @param battleJobQueue
	 */
	void deleteBattelQueue(BattleJobQueue battleJobQueue);//删除战斗队列
	/**
	 * 获取玩家军情
	 * @param param
	 * @return
	 */
	List<BattleJobQueue> selectBattleQueue(Map<String, Object> param);//获取玩家军情
	/**
	 * 获取玩家军情，按类型获取
	 * @param param
	 * @return
	 */
	List<BattleJobQueue> getBattleQueue(Map<String, Object> param);
	/**
	 * 获取玩家军情数量
	 * @param param
	 * @return
	 */
	int getBattleQueueAmount(Map<String, Object> param);//获取玩家军情数量
	/**
	 * 通过Id获取战斗队列
	 * @param battleJobQueueId
	 * @return
	 */
	BattleJobQueue selectBattleQueueById(int battleJobQueueId);//通过Id获取战斗队列
	/**
	 * 获取军情，按状态，用于城郊
	 * @param param
	 * @return
	 */
	ConcurrentLinkedQueue<BattleJobQueue> getBattleQueueForSuburbByStatus(Map<String, Object> param);
	/**
	 * 获取玩家城郊军情数量
	 * @param targetId
	 * @return
	 */
	int getBattleAmountForSuburb(Map<String, Object> param);
	/**
	 * 获取所有军情
	 * @return
	 */
	List<BattleJobQueue> selectAllBattleQueue();
	/**
	 * 根据目标id和自己id以及战争类型查看所有军队队列信息（按时间升序排列（从小到大））
	 * @param param
	 * @return
	 */
	List<BattleJobQueue> getBattleByCidAndTargetId(Map<String, Object> param);
	/**
	 *获取该资源
	 * @return
	 */
	CollectionJobQueue getCollectionQueue(Map<String, Object> param);
	/**
	 * 插入采集队列
	 * @param cjq
	 */
	void insertCollectionJobQueue(CollectionJobQueue cjq);
	/**
	 * 根据行军状态获取所有军情
	 * @param status
	 * @return
	 */
	List<BattleJobQueue> selectAllBattleQueueByStatus(int status);
}
