package com.crystalcg.gamedev.buildingFunction.domain;

import com.crystalcg.gamedev.util.cache.DefenceworksCache;
import com.crystalcg.gamedev.util.cache.domain.StaticDefenceworks;

/**
 * 城墙工事
 * 
 * @author zhaibiao
 *
 */
public class UserWallDefensen {
    private int id;
    private int characterId;
    private String wallDefensenNo;
    private int wallDefensenNum;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCharacterId() {
		return characterId;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	
	public String getWallDefensenNo() {
		return wallDefensenNo;
	}
	public void setWallDefensenNo(String wallDefensenNo) {
		this.wallDefensenNo = wallDefensenNo;
	}
	public int getWallDefensenNum() {
		return wallDefensenNum;
	}
	public void setWallDefensenNum(int wallDefensenNum) {
		this.wallDefensenNum = wallDefensenNum;
	}
    
	/**
	 * 获取城墙静态信息
	 * @return
	 */
	public StaticDefenceworks getDefenceworks(){
		return DefenceworksCache.getDefenceworks(wallDefensenNo);
	}
    
}
