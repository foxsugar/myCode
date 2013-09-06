package com.crystalcg.gamedev.buildingFunction.domain;

import java.util.Date;

/**
 * 内政策略任务队列
 * 
 * @author xuzhongxing
 * 
 */
public class AffairQueue {
	private int id;//
	private int characterId;//
	private int userHeroId;// 用户武将id
	private String affairNo;// 内政策略id
	private Date startTime;// 起始时间
	private int lastTime;// 持续时间（小时)

	public int getId() {
		return id;
	}

	public int getCharacterId() {
		return characterId;
	}

	public int getUserHeroId() {
		return userHeroId;
	}

	public String getAffairNo() {
		return affairNo;
	}

	public Date getStartTime() {
		return startTime;
	}

	public int getLastTime() {
		return lastTime;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}

	public void setUserHeroId(int userHeroId) {
		this.userHeroId = userHeroId;
	}

	public void setAffairNo(String affairNo) {
		this.affairNo = affairNo;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public void setLastTime(int lastTime) {
		this.lastTime = lastTime;
	}

}
