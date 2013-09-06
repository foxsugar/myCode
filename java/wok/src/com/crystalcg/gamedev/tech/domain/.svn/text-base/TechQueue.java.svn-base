package com.crystalcg.gamedev.tech.domain;

import java.util.Date;

/**
 * 用户科技升级队列表
 * @author jinganyang
 *
 */
public class TechQueue {

	private int id;
	private int   characterId;
	private Date  completingTime;
	private String  studyTechNo;
	
	public TechQueue(){
		
	}
	public TechQueue(int characterId, Date completingTime, String studyTechNo){
		this.characterId = characterId;
		this.completingTime = completingTime;
		this.studyTechNo = studyTechNo;
	}
	public int getId() {
		return id;
	}
	public int getCharacterId() {
		return characterId;
	}
	public Date getCompletingTime() {
		return completingTime;
	}
	public String getStudyTechNo() {
		return studyTechNo;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public void setCompletingTime(Date completingTime) {
		this.completingTime = completingTime;
	}
	public void setStudyTechNo(String studyTechNo) {
		this.studyTechNo = studyTechNo;
	}
	public int getRemainTime(){
		long time = (completingTime.getTime() - System.currentTimeMillis()+999)/1000;//向上取整
		if(time<=0){
			time = 1;
		}
		return (int)time;
	}


}
