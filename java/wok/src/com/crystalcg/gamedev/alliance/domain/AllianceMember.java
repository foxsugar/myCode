package com.crystalcg.gamedev.alliance.domain;
/**
 * l联盟成员
 */
import java.util.Date;

public class AllianceMember {
    private int id;
    private int allianceId;
    private int characterId;
    private int wealth;
    private int speakStatus;
    private Date speakStatusTime;
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
	public int getWealth() {
		return wealth;
	}
	public void setWealth(int wealth) {
		this.wealth = wealth;
	}
	public int getSpeakStatus() {
		return speakStatus;
	}
	public void setSpeakStatus(int speakStatus) {
		this.speakStatus = speakStatus;
	}
	public Date getSpeakStatusTime() {
		return speakStatusTime;
	}
	public void setSpeakStatusTime(Date speakStatusTime) {
		this.speakStatusTime = speakStatusTime;
	}
   
    
}
