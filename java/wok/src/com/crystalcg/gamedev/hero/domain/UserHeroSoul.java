package com.crystalcg.gamedev.hero.domain;

import org.codehaus.jackson.annotate.JsonIgnore;

public class UserHeroSoul {

	private int heroSoulId;
	private String name;
	@JsonIgnore
	private String description;
	@JsonIgnore
	private String time;
	private int heroSoulForce;
	private int heroSoulIntelligence;
	private int heroSoulAgility;
	private int heroSoulStamina;
	@JsonIgnore
	private int totalPoint;
	private int heroSoulGrade;
	@JsonIgnore
	private int heroSoulExp;
	@JsonIgnore
	private int heroSoulNeedExp;
	@JsonIgnore
	private int heroSoulIcon;
	
	public int getHeroSoulId() {
		return heroSoulId;
	}
	public String getName() {
		return name;
	}
	public String getDescription() {
		return description;
	}
	public String getTime() {
		return time;
	}

	public int getTotalPoint() {
		return totalPoint;
	}

	public int getHeroSoulExp() {
		return heroSoulExp;
	}
	public void setHeroSoulId(int heroSoulId) {
		this.heroSoulId = heroSoulId;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setTime(String time) {
		this.time = time;
	}

	public void setTotalPoint(int totalPoint) {
		this.totalPoint = totalPoint;
	}

	public void setHeroSoulExp(int heroSoulExp) {
		this.heroSoulExp = heroSoulExp;
	}
	public int getHeroSoulNeedExp() {
		return heroSoulNeedExp;
	}
	public void setHeroSoulNeedExp(int heroSoulNeedExp) {
		this.heroSoulNeedExp = heroSoulNeedExp;
	}
	public int getHeroSoulForce() {
		return heroSoulForce;
	}
	public int getHeroSoulIntelligence() {
		return heroSoulIntelligence;
	}
	public int getHeroSoulAgility() {
		return heroSoulAgility;
	}
	public int getHeroSoulStamina() {
		return heroSoulStamina;
	}
	public int getHeroSoulGrade() {
		return heroSoulGrade;
	}
	public void setHeroSoulForce(int heroSoulForce) {
		this.heroSoulForce = heroSoulForce;
	}
	public void setHeroSoulIntelligence(int heroSoulIntelligence) {
		this.heroSoulIntelligence = heroSoulIntelligence;
	}
	public void setHeroSoulAgility(int heroSoulAgility) {
		this.heroSoulAgility = heroSoulAgility;
	}
	public void setHeroSoulStamina(int heroSoulStamina) {
		this.heroSoulStamina = heroSoulStamina;
	}
	public void setHeroSoulGrade(int heroSoulGrade) {
		this.heroSoulGrade = heroSoulGrade;
	}
	public int getHeroSoulIcon() {
		return heroSoulIcon;
	}
	public void setHeroSoulIcon(int heroSoulIcon) {
		this.heroSoulIcon = heroSoulIcon;
	}
	
	
}
