package com.crystalcg.gamedev.alliance.domain;
/**
 * 联盟兵营
 * @author zhaibiao
 *
 */
public class AllianceBarrack {
   private int id;
   private int allianceId;
   private String soldierNo;
   private int amount;
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
public String getSoldierNo() {
	return soldierNo;
}
public void setSoldierNo(String soldierNo) {
	this.soldierNo = soldierNo;
}
public int getAmount() {
	return amount;
}
public void setAmount(int amount) {
	this.amount = amount;
}

}
