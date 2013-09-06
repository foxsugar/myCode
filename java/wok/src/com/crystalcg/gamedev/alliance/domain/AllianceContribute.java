package com.crystalcg.gamedev.alliance.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * 联盟捐献
 * @author zhaibiao
 *
 */
public class AllianceContribute {
	@JsonIgnore
    private int id;
    private int allianceId;
    private int characterId;
    private int contributeAmount;
    private int todayAmount;
    @JsonIgnore
    private Date completeTime;
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
	public int getCharacterId() {
		return characterId;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public int getContributeAmount() {
		return contributeAmount;
	}
	public void setContributeAmount(int contributeAmount) {
		this.contributeAmount = contributeAmount;
	}
	public int getTodayAmount() {
		return todayAmount;
	}
	public void setTodayAmount(int todayAmount) {
		this.todayAmount = todayAmount;
	}
	public Date getCompleteTime() {
		return completeTime;
	}
	public void setCompleteTime(Date completeTime) {
		this.completeTime = completeTime;
	}
    
    
   
}
