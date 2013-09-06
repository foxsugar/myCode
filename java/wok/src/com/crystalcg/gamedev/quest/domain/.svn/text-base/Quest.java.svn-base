package com.crystalcg.gamedev.quest.domain;

import java.util.Date;

import com.crystalcg.gamedev.util.cache.QuestCache;
import com.crystalcg.gamedev.util.cache.domain.StaticQuest;

/**
 * 玩家任务表实体类
 * @author jinganyang
 *
 */
public class Quest {
	private int id;
	private int characterId;
	private String questNo;
	private int status; // -1未激活,0未完成,1已完成未提交,
	private int questType; // 1=主线任务 2=支线任务 3=声望任务 4=武将任务 5=活动任务,
	private int resetType; // 0=不可重置 1=日重置 2=周重置 3=月重置,
	private Date updateTime;// 任务更新时间,
	private int targetAmount;//目标数量进度

	public Quest(){
		
	}
	public Quest(int characterId, String questNo, int status){
		StaticQuest staticQuest = QuestCache.getQuestsByNo(questNo);
		this.characterId = characterId;
		this.questNo = questNo;
		this.status = status;
		questType = staticQuest.getQuestType();
		resetType = staticQuest.getResetTyp();
	}
	public StaticQuest getStaticQuest(){
		return QuestCache.getQuestsByNo(questNo);
	}
	public int getId() {
		return id;
	}

	public int getCharacterId() {
		return characterId;
	}

	public String getQuestNo() {
		return questNo;
	}

	public int getStatus() {
		return status;
	}

	public int getQuestType() {
		return questType;
	}

	public int getResetType() {
		return resetType;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}

	public void setQuestNo(String questNo) {
		this.questNo = questNo;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public void setQuestType(int questType) {
		this.questType = questType;
	}

	public void setResetType(int resetType) {
		this.resetType = resetType;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public int getTargetAmount() {
		return targetAmount;
	}
	public void setTargetAmount(int targetAmount) {
		this.targetAmount = targetAmount;
	}
}
