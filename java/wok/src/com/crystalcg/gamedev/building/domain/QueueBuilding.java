package com.crystalcg.gamedev.building.domain;

import java.util.Date;

/**
 * 建筑队列中的建筑
 * @author xuzhongxing
 *
 */
public class QueueBuilding {
	
	private int id;
	private int characterId;
	private String currentBuildingNo;//static表中的building_no
	private String targetBuildingNo;//static表中的ID
	private int status;
	private Date startTime;
	private long time;//时间单位秒
	private int location;
	
	public int getId() {
		return id;
	}
	public int getCharacterId() {
		return characterId;
	}
	public Date getStartTime() {
		return startTime;
	}
	/**
	 * 时间单位秒
	 * @return
	 */
	public long getTime() {
		return time;
	}
	public int getLocation() {
		return location;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public void setTime(long time) {
		this.time = time;
	}
	public void setLocation(int location) {
		this.location = location;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getCurrentBuildingNo() {
		return currentBuildingNo;
	}
	public String getTargetBuildingNo() {
		return targetBuildingNo;
	}
	public void setCurrentBuildingNo(String currentBuildingNo) {
		this.currentBuildingNo = currentBuildingNo;
	}
	public void setTargetBuildingNo(String targetBuildingNo) {
		this.targetBuildingNo = targetBuildingNo;
	}
	@Override
	public String toString() {
		return "" + (startTime.getTime() + time*1000);
	}

}
