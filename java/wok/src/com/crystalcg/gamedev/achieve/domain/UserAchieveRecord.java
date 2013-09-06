package com.crystalcg.gamedev.achieve.domain;

/**
 * 用户成就记录实体
 * @author jinganyang
 *
 */
public class UserAchieveRecord {
	private int id;
	private int achieveType;
	private int achieveValue;
	private int characterId;
	public int getId() {
		return id;
	}
	public int getAchieveType() {
		return achieveType;
	}
	public int getAchieveValue() {
		return achieveValue;
	}
	public int getCharacterId() {
		return characterId;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setAchieveType(int achieveType) {
		this.achieveType = achieveType;
	}
	public void setAchieveValue(int achieveValue) {
		this.achieveValue = achieveValue;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
}
