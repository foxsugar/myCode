package com.crystalcg.gamedev.buildingFunction.domain;

import java.util.Date;

import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;

/**
 * 用户兵种队列
 * 
 * @author xuzhongxing
 * 
 */
public class UserSoldierQueue {
	private int id;
	private int characterId;
	private Date startTime;
	private long time;//ms
	private String soldierNo;
	private int amount;

	public int getId() {
		return id;
	}

	public int getCharacterId() {
		return characterId;
	}

	public Date getStartTime() {
		return startTime;
	}

	public long getTime() {
		return time;
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

	public String getSoldierNo() {
		return soldierNo;
	}

	public int getAmount() {
		return amount;
	}

	public void setSoldierNo(String soldierNo) {
		this.soldierNo = soldierNo;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getSoldierName() {
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
		if(staticSoldier != null){
			return staticSoldier.getSoldierName();
		}else{
			return null;
		}
	}

}
