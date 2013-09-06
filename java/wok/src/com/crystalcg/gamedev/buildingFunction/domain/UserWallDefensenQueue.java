package com.crystalcg.gamedev.buildingFunction.domain;

import java.util.Date;

public class UserWallDefensenQueue {
	private int id;
	private int characterId;
	private String no;
	private Date completetime;
	private int num;
	
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
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public Date getCompletetime() {
		return completetime;
	}
	public void setCompletetime(Date completetime) {
		this.completetime = completetime;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	
	
}
