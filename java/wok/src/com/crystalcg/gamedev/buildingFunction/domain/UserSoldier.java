package com.crystalcg.gamedev.buildingFunction.domain;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;

/**
 * 用户兵种
 * 
 * @author xuzhongxing
 * 
 */
public class UserSoldier {
	private int id;
	@JsonIgnore
	private int characterId;
	private String soldierNo;
	private int soldierAmount;

	public int getId() {
		return id;
	}

	public int getCharacterId() {
		return characterId;
	}

	public String getSoldierNo() {
		return soldierNo;
	}

	public int getSoldierAmount() {
		return soldierAmount;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}

	public void setSoldierNo(String soldierNo) {
		this.soldierNo = soldierNo;
	}

	public void setSoldierAmount(int soldierAmount) {
		this.soldierAmount = soldierAmount;
	}

	public String getSoldierName() {
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
		if(staticSoldier != null){
			return staticSoldier.getSoldierName();
		}else{
			return null;
		}
	}

}
