package com.crystalcg.gamedev.alliance.domain;

import java.util.Date;

/**
 * 提取设置
 * @author zhaibiao
 *
 */
public class AllianceSite {
    private int id;
    private int allianceId;
    private String alliancePosition;
    private int wealth;
    private int soldierAmount;
    private Date  completetime;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getAllianceId() {
		return allianceId;
	}
	public void setAllianceId(int allianceId) {
		this.allianceId = allianceId;
	}
	public String getAlliancePosition() {
		return alliancePosition;
	}
	public void setAlliancePosition(String alliancePosition) {
		this.alliancePosition = alliancePosition;
	}
	public int getWealth() {
		return wealth;
	}
	public void setWealth(int wealth) {
		this.wealth = wealth;
	}
	public int getSoldierAmount() {
		return soldierAmount;
	}
	public void setSoldierAmount(int soldierAmount) {
		this.soldierAmount = soldierAmount;
	}
	public Date getCompletetime() {
		return completetime;
	}
	public void setCompletetime(Date completetime) {
		this.completetime = completetime;
	}
	
}
