package com.crystalcg.gamedev.tech.domain;

/**
 * 用户兵种科技
 * @author xuzhongxing
 *
 */
public class UserSoldierTech {
	private int id;
	private int characterId;// 角色id
	private String techNo;// 兵种科技id

	public int getId() {
		return id;
	}

	public int getCharacterId() {
		return characterId;
	}

	public String getTechNo() {
		return techNo;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}

	public void setTechNo(String techNo) {
		this.techNo = techNo;
	}
}
