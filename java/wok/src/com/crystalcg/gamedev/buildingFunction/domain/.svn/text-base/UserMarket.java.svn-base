package com.crystalcg.gamedev.buildingFunction.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnore;

public class UserMarket {
	@JsonIgnore
	private int id;
	@JsonIgnore
	private int characterId; // 角色Id
	@JsonIgnore
	private int exchangeResource; // 已兑换的资源
	@JsonIgnore
	private Date updateTime;
	//////从建筑静态表中获得///////
	@JsonIgnore
	private int exchangeLimit;//兑换上限
	
	public int getId() {
		return id;
	}
	public int getCharacterId() {
		return characterId;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public int getExchangeLimit() {
		return exchangeLimit;
	}
	public void setExchangeLimit(int exchangeLimit) {
		this.exchangeLimit = exchangeLimit;
	}
	public int getExchangeResource() {
		return exchangeResource;
	}
	public void setExchangeResource(int exchangeResource) {
		this.exchangeResource = exchangeResource;
	}
	public int getResourceCanExchange() {
		return exchangeLimit-exchangeResource;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
}
