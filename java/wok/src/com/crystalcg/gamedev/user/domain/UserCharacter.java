package com.crystalcg.gamedev.user.domain;

/**
 * 君主
 * @author xuzhongxing
 *
 */
public class UserCharacter {
	
	private int id;
	private int accountId;
	private String name;
	private int countryId;
	private int gender;
	private int level;
	private int experience;
	private int cash;//金锭（非绑定）
	private int ticket;//点卷（绑定）
	private int allianceId;
	private String alliancePosition;
	private int allianceReputation;
	private int reputation;
	private int abilityPoint;
	private int militaryStrength;
	private int internalAffairs;
	private int strategyValue;
	private int vipId;
	private int buff1;
	private int buff2;
	private int buff3;
	private int buff4;
	private int buff5;
	private int buff6;
	private int techPoint;
	private String description;
	///////
	private String image;
	/////////////////////////////////////////////////////
	public int getId() {
		return id;
	}
	public int getAccountId() {
		return accountId;
	}
	public String getName() {
		return name;
	}
	public int getCountryId() {
		return countryId;
	}
	public String getImage() {
		return image;
	}
	public int getLevel() {
		return level;
	}
	public int getExperience() {
		return experience;
	}
	public int getCash() {
		return cash;
	}
	public int getTicket() {
		return ticket;
	}
	public int getAllianceId() {
		return allianceId;
	}
	public String getAlliancePosition() {
		return alliancePosition;
	}
	public int getAllianceReputation() {
		return allianceReputation;
	}
	public int getReputation() {
		return reputation;
	}
	public int getStrategyValue() {
		return strategyValue;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public void setCash(int cash) {
		this.cash = cash;
	}
	public void setTicket(int ticket) {
		this.ticket = ticket;
	}
	public void setAllianceId(int allianceId) {
		this.allianceId = allianceId;
	}
	public void setAlliancePosition(String alliancePosition) {
		this.alliancePosition = alliancePosition;
	}
	public void setAllianceReputation(int allianceReputation) {
		this.allianceReputation = allianceReputation;
	}
	public void setReputation(int reputation) {
		this.reputation = reputation;
	}
	public void setStrategyValue(int strategyValue) {
		this.strategyValue = strategyValue;
	}
	public int getMilitaryStrength() {
		return militaryStrength;
	}
	public int getInternalAffairs() {
		return internalAffairs;
	}
	public void setMilitaryStrength(int militaryStrength) {
		this.militaryStrength = militaryStrength;
	}
	public void setInternalAffairs(int internalAffairs) {
		this.internalAffairs = internalAffairs;
	}
	public int getAbilityPoint() {
		return abilityPoint;
	}
	public void setAbilityPoint(int abilityPoint) {
		this.abilityPoint = abilityPoint;
	}
	public int getVipId() {
		return vipId;
	}
	public void setVipId(int vipId) {
		this.vipId = vipId;
	}
	public int getBuff1() {
		return buff1;
	}
	public int getBuff2() {
		return buff2;
	}
	public int getBuff3() {
		return buff3;
	}
	public int getBuff4() {
		return buff4;
	}
	public int getBuff5() {
		return buff5;
	}
	public int getBuff6() {
		return buff6;
	}
	public void setBuff1(int buff1) {
		this.buff1 = buff1;
	}
	public void setBuff2(int buff2) {
		this.buff2 = buff2;
	}
	public void setBuff3(int buff3) {
		this.buff3 = buff3;
	}
	public void setBuff4(int buff4) {
		this.buff4 = buff4;
	}
	public void setBuff5(int buff5) {
		this.buff5 = buff5;
	}
	public void setBuff6(int buff6) {
		this.buff6 = buff6;
	}
	public int getTechPoint() {
		return techPoint;
	}
	public void setTechPoint(int techPoint) {
		this.techPoint = techPoint;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
