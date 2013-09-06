package com.crystalcg.gamedev.tech.domain;

import com.crystalcg.gamedev.util.cache.InteriorTechCache;
import com.crystalcg.gamedev.util.cache.domain.StaticInteriorTech;

public class UserInteriorTech {
	private int id;
	private String techNo;
	private int characterId;
	private int techKey;
	
	
	public UserInteriorTech(){
		
	}
	public UserInteriorTech(String techNo, int characterId, int techKey){
		this.techNo = techNo;
		this.characterId = characterId;
		this.techKey = techKey;
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
	public StaticInteriorTech getInteriorTechEntity(){
		return InteriorTechCache.getInteriorTechByNo(techNo);
	}
	public int getTechKey() {
		return techKey;
	}
	public void setTechKey(int techKey) {
		this.techKey = techKey;
	}
}
