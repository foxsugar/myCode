package com.crystalcg.gamedev.quest.domain;

import com.crystalcg.gamedev.util.cache.QuestCache;
import com.crystalcg.gamedev.util.cache.domain.StaticQuest;

/**
 * 玩家任务缓存
 * @author jinganyang
 *
 */
public class QuestStore {
	private int questId;
	private String questNo;
	public QuestStore(){
		
	}
	public QuestStore(int questId, String QuestNo){
		this.questId = questId;
		this.questNo = QuestNo;
	}
	public StaticQuest getStaticQuest(){
		return QuestCache.getQuestsByNo(questNo);
	}
//	public Map<String, Integer> getQuestTarget(){
//		return QuestCache.getQuestsByNo(questNo).getTarget();
//	}
	public int getQuestId() {
		return questId;
	}
	public String getQuestNo() {
		return questNo;
	}
	public void setQuestId(int questId) {
		this.questId = questId;
	}
	public void setQuestNo(String questNo) {
		this.questNo = questNo;
	}
}
