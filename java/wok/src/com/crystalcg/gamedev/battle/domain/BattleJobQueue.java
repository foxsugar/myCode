package com.crystalcg.gamedev.battle.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.crystalcg.gamedev.util.Const;

public class BattleJobQueue {

	private int id;
	@JsonIgnore
	private int characterId;
	private String characterName;
	private int battleType;
	@JsonIgnore
	private String heroList;
	private int userForce;
	private int targetType;
	@JsonIgnore
	private int targetId;
	@JsonIgnore
	private String targetNo;
	private String targetName;
	@JsonIgnore
	private Date arrivingTime;
	private int status;//出征状态，0前往，1到达，2返回,3战斗中，4即将战斗，5等待进入城郊
	@JsonIgnore
	private String formationNo;
	@JsonIgnore
	private int needTime;//需要时间，秒
	@JsonIgnore
	private Date backTime;//返回时间
	@JsonIgnore
	private Date backArriveTime;//返回到达时间
	@JsonIgnore
	private Date goTime;//出发时间
	

	public int getRemainTime() {
		long time = System.currentTimeMillis();
		if(status==Const.BATTLE_STATUS_TOWARD){
			return (int)((arrivingTime.getTime()-time)/1000)+1;
		}else if(status==Const.BATTLE_STATUS_WAIT){
			return 0;
		}else if(status==Const.BATTLE_STATUS_BACK){
			return (int)((backArriveTime.getTime()-time)/1000)+1;
		}else{
			return 0;
		}
	}


	public int getId() {
		return id;
	}


	public int getCharacterId() {
		return characterId;
	}


	public String getCharacterName() {
		return characterName;
	}


	public int getBattleType() {
		return battleType;
	}


	public String getHeroList() {
		return heroList;
	}


	public int getTargetType() {
		return targetType;
	}


	public int getTargetId() {
		return targetId;
	}


	public String getTargetNo() {
		return targetNo;
	}


	public String getTargetName() {
		return targetName;
	}


	public Date getArrivingTime() {
		return arrivingTime;
	}


	public int getStatus() {
		return status;
	}


	public String getFormationNo() {
		return formationNo;
	}


	public int getNeedTime() {
		return needTime;
	}


	public Date getBackTime() {
		return backTime;
	}


	public Date getBackArriveTime() {
		return backArriveTime;
	}


	public Date getGoTime() {
		return goTime;
	}


	public void setId(int id) {
		this.id = id;
	}


	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}


	public void setCharacterName(String characterName) {
		this.characterName = characterName;
	}


	public void setBattleType(int battleType) {
		this.battleType = battleType;
	}


	public void setHeroList(String heroList) {
		this.heroList = heroList;
	}


	public void setTargetType(int targetType) {
		this.targetType = targetType;
	}


	public void setTargetId(int targetId) {
		this.targetId = targetId;
	}


	public void setTargetNo(String targetNo) {
		this.targetNo = targetNo;
	}


	public void setTargetName(String targetName) {
		this.targetName = targetName;
	}


	public void setArrivingTime(Date arrivingTime) {
		this.arrivingTime = arrivingTime;
	}


	public void setStatus(int status) {
		this.status = status;
	}


	public void setFormationNo(String formationNo) {
		this.formationNo = formationNo;
	}


	public void setNeedTime(int needTime) {
		this.needTime = needTime;
	}


	public void setBackTime(Date backTime) {
		this.backTime = backTime;
	}


	public void setBackArriveTime(Date backArriveTime) {
		this.backArriveTime = backArriveTime;
	}


	public void setGoTime(Date goTime) {
		this.goTime = goTime;
	}


	public int getUserForce() {
		return userForce;
	}


	public void setUserForce(int userForce) {
		this.userForce = userForce;
	}
	@Override
	public boolean equals(Object obj) {
		if(obj == null){
			return false;
		}
		if(obj instanceof BattleJobQueue){
			if(((BattleJobQueue) obj).getId() == this.getId()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
}
