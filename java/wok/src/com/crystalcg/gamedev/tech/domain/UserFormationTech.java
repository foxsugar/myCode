package com.crystalcg.gamedev.tech.domain;

import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.domain.StaticFormation;
import com.crystalcg.gamedev.util.cache.domain.StaticFormationTech;

public class UserFormationTech {
	private int id;
	private String techNo;
	private int characterId;
	private int techLocation;

	
	public UserFormationTech(){
		
	}
	public UserFormationTech(String techNo, int characterId, int techLocation){
		this.techNo = techNo;
		this.characterId = characterId;
		this.techLocation = techLocation;
	}
	public StaticFormationTech getFormationTech(){
		return FormationCache.getFormationTechByNo(techNo);
	}
	public StaticFormation getFormation(){
		return FormationCache.getFormationByTechNo(techNo);
	}
	
	public int getId() {
		return id;
	}
	public String getTechNo() {
		return techNo;
	}
	public int getCharacterId() {
		return characterId;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setTechNo(String techNo) {
		this.techNo = techNo;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public int getTechLocation() {
		return techLocation;
	}
	public void setTechLocation(int techLocation) {
		this.techLocation = techLocation;
	}
}
