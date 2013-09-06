package com.crystalcg.gamedev.quest.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.quest.domain.Quest;
import com.crystalcg.gamedev.quest.domain.UserDailyRecord;
import com.crystalcg.gamedev.quest.mapper.QuestMapper;

public class QuestDao {
	private QuestMapper questMapper;

	/**
	 * 通过Id获取玩家具体任务
	 * @param id
	 * @param characterId
	 * @return
	 */
	public Quest getUserQuestById(int id, int characterId){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", id);
		param.put("characterId", characterId);
		return questMapper.getUserQuestById(param);
		
	}
	/**
	 * 获取玩家所有任务
	 * @param characterId
	 * @return
	 */
	public List<Quest> getAllUserQuest(int characterId){
		return questMapper.getAllUserQuest(characterId);
	}
	/**
	 * 按类型获取玩家任务
	 * @param characterId
	 * @param questType
	 * @return
	 */
	public List<Quest> getUserQuestByType(int characterId, int questType){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("questType", questType);
		return questMapper.getUserQuestByType(param);
	}
	/**
	 * 按状态获取玩家任务
	 * @param characterId
	 * @param status
	 * @return
	 */
	public List<Quest> getUserQuestByStatus(int characterId, int status){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("status", status);
		return questMapper.getUserQuestByStatus(param);
	}
//	/**
//	 * 获取任务目标进度
//	 * @param questId
//	 * @return
//	 */
//	public List<QuestSchedule> getAllQuestSchedule(int characterId){
//		return questMapper.getAllQuestSchedule(characterId);
//	}
//	/**
//	 * 获取任务目标进度
//	 * @param questId
//	 * @return
//	 */
//	public List<QuestSchedule> getQuestSchedule(int questId){
//		return questMapper.getQuestSchedule(questId);
//	}
	/**
	 * 插入玩家任务
	 * @param quest
	 */
	public void insertUserQuest(Quest quest){
		questMapper.insertUserQuest(quest);
	}
//	/**
//	 * 插入玩家任务进度
//	 * @param questSchedules
//	 */
//	public void insertQuestSchedule(List<QuestSchedule> questSchedules){
//		questMapper.insertQuestSchedule(questSchedules);
//	}
	/**
	 * 删除玩家任务
	 * @param id
	 */
	public void deleteUserQuest(int id){
		questMapper.deleteUserQuest(id);
	}
//	/**
//	 * 删除玩家任务进度
//	 * @param id
//	 */
//	public void deleteQuestSchedule(int id){
//		questMapper.deleteQuestSchedule(id);
//	}
	
	/**
	 * 更新任务状态
	 * @param quest
	 */
	public void updateQuestStatus(int id, int status){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", id);
		param.put("status", status);
		questMapper.updateQuestStatus(param);
	}
	/**
	 * 更新任务完成时间
	 * @param quest
	 */
	public void updateQuestTime(Quest quest){
		questMapper.updateQuestTime(quest);
	}
	/**
	 * 更新任务进度目标数量
	 * @param questSchedule
	 */
	public void updateQuestSchedule(Quest quest){
		questMapper.updateQuestSchedule(quest);
	}
	
	/**
	 * 获取玩家所有任务记录
	 * @param characterId
	 * @return
	 */
	public List<Integer> getAllQuestRecord(int characterId){
		return questMapper.getAllQuestRecord(characterId);
	}
	/**
	 * 插入任务记录
	 * @param param
	 */
	public void insertQuestRecord(int characterId, int targetType){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("targetType", targetType);
		questMapper.insertQuestRecord(param);
	}
	
	/**
	 * 获取日常任务记录
	 * @param characterId
	 * @return
	 */
	public UserDailyRecord getDailyRecord(int characterId){
		return questMapper.getDailyRecord(characterId);
	}
	/**
	 * 插入日常任务记录
	 * @param characterId
	 */
	public void insertDailyRecord(int characterId){
		questMapper.insertDailyRecord(characterId);
	}
	/**
	 * 更新日常任务记录
	 * @param userDailyRecord
	 */
	public void updateDailyRecord(UserDailyRecord userDailyRecord){
		questMapper.updateDailyRecord(userDailyRecord);
	}
	
	public QuestMapper getQuestMapper() {
		return questMapper;
	}

	public void setQuestMapper(QuestMapper questMapper) {
		this.questMapper = questMapper;
	} 
}
