package com.crystalcg.gamedev.alliance.domain;
/**
 * 结盟申请
 * @author zhaibiao
 *
 */
public class AllianceAllyApply {
     private int id;
     private int allianceId;
     private int allianceFriendId;
     private String allianceEvent;
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
	public int getAllianceFriendId() {
		return allianceFriendId;
	}
	public void setAllianceFriendId(int allianceFriendId) {
		this.allianceFriendId = allianceFriendId;
	}
	public String getAllianceEvent() {
		return allianceEvent;
	}
	public void setAllianceEvent(String allianceEvent) {
		this.allianceEvent = allianceEvent;
	}
     
     
}
