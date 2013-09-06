package com.crystalcg.gamedev.quest.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.quest.domain.Quest;
import com.crystalcg.gamedev.quest.domain.UserDailyRecord;

/**
 * 任务数据库接口
 * @author jinganyang
 *
 */
public interface QuestMapper {
	/**
	 * 通过Id获取玩家具体任务
	 * @param param
	 * @return
	 */
	public Quest getUserQuestById(Map<String, Object> param);
	/**
	 * 获取玩家所有任务
	 * @param characterId
	 * @return
	 */
	public List<Quest> getAllUserQuest(int characterId);
	/**
	 * 按类型获取玩家任务
	 * @param param
	 * @return
	 */
	public List<Quest> getUserQuestByType(Map<String, Object> param);
	/**
	 * 按状态获取玩家任务
	 * @param param
	 * @return
	 */
	public List<Quest> getUserQuestByStatus(Map<String, Object> param);
//	/**
//	 * 获取玩家所有任务目标进度
//	 * @param questId
//	 * @return
//	 */
//	public List<QuestSchedule> getAllQuestSchedule(int characterId);
//	/**
//	 * 获取任务目标进度
//	 * @param questId
//	 * @return
//	 */
//	public List<QuestSchedule> getQuestSchedule(int questId);
	/**
	 * 插入玩家任务
	 * @param quest
	 */
	public void insertUserQuest(Quest quest);
//	/**
//	 * 插入玩家任务进度
//	 * @param questSchedules
//	 */
//	public void insertQuestSchedule(List<QuestSchedule> questSchedules);
	/**
	 * 删除玩家任务
	 * @param id
	 */
	public void deleteUserQuest(int id);
//	/**
//	 * 删除玩家任务进度
//	 * @param id
//	 */
//	public void deleteQuestSchedule(int id);
	
	/**
	 * 更新任务状态
	 * @param quest
	 */
	public void updateQuestStatus(Map<String, Object> param);
	
	/**
	 * 更新任务完成时间
	 * @param quest
	 */
	public void updateQuestTime(Quest quest);
	/**
	 * 更新任务进度目标数量
	 * @param questSchedule
	 */
	public void updateQuestSchedule(Quest quest);
	/**
	 * 获取玩家所有任务记录
	 * @param characterId
	 * @return
	 */
	public List<Integer> getAllQuestRecord(int characterId);
	/**
	 * 插入任务记录
	 * @param param
	 */
	public void insertQuestRecord(Map<String, Object> param);
	
	/**
	 * 获取日常任务记录
	 * @param characterId
	 * @return
	 */
	public UserDailyRecord getDailyRecord(int characterId);
	/**
	 * 插入日常任务记录
	 * @param characterId
	 */
	public void insertDailyRecord(int characterId);
	/**
	 * 更新日常任务记录
	 * @param userDailyRecord
	 */
	public void updateDailyRecord(UserDailyRecord userDailyRecord);
}
