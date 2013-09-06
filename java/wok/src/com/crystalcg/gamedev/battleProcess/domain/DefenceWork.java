package com.crystalcg.gamedev.battleProcess.domain;

import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

public class DefenceWork {
	private int locationId;
	private int wallHpMax;
	private int wallHp;
	public DefenceWork(){
		
	}
	public DefenceWork(StaticBuilding staticBuilding){
		locationId = -1;
		wallHpMax = staticBuilding.getFunction1();
		wallHp = staticBuilding.getFunction1();
	}
	
	public int getWallHpMax() {
		return wallHpMax;
	}
	public int getWallHp() {
		return wallHp;
	}
	public void setWallHpMax(int wallHpMax) {
		this.wallHpMax = wallHpMax;
	}
	public void setWallHp(int wallHp) {
		this.wallHp = wallHp;
	}
	public int getLocationId() {
		return locationId;
	}
	public void setLocationId(int locationId) {
		this.locationId = locationId;
	}
}
