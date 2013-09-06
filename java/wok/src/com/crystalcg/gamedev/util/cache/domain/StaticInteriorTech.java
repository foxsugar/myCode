package com.crystalcg.gamedev.util.cache.domain;

/**
 * 内政科技表实体
 * 
 * @author jinganyang
 * 
 */
public class StaticInteriorTech {
	private String techNo; // 科技的ID编号
	private String techName; // 科技的中文名称
//	private String preTech; // 研究此项科技所需要的前置科技(编号）
	private int needTime; // 研究此项科技所需要的时间(秒）
	private int needLevel;//需求君主等级
	private int techLevel; // 当前此项科技的级别
	private int effectType;
	private int valueType; // 1=值 2百分比
	private String effectValue;
	private String description; // 科技的文本描述
	private int techKey;//科技编号，用于客户端服务器位置同步
	private String techIcon;//科技编号，用于客户端服务器位置同步
	
	
	
	public String getNeedTimeString(){
		int hour = (int)needTime/3600;
		int second = (int)needTime%60;
		int minute = (int)(needTime - second)/60%60;
		return hour+"小时"+minute+"分"+second+"秒";
	}
	public String getTechNo() {
		return techNo;
	}

	public String getTechName() {
		return techName;
	}


	public int getNeedTime() {
		return needTime;
	}

	public int getTechLevel() {
		return techLevel;
	}

	public int getEffectType() {
		return effectType;
	}

	public int getValueType() {
		return valueType;
	}

	public String getEffectValue() {
		return effectValue;
	}

	public String getDescription() {
		return description;
	}

	public void setTechNo(String techNo) {
		this.techNo = techNo;
	}

	public void setTechName(String techName) {
		this.techName = techName;
	}


	public void setNeedTime(int needTime) {
		this.needTime = needTime;
	}

	public void setTechLevel(int techLevel) {
		this.techLevel = techLevel;
	}

	public void setEffectType(int effectType) {
		this.effectType = effectType;
	}

	public void setValueType(int valueType) {
		this.valueType = valueType;
	}

	public void setEffectValue(String effectValue) {
		this.effectValue = effectValue;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getTechKey() {
		return techKey;
	}

	public void setTechKey(int techKey) {
		this.techKey = techKey;
	}


	public String getTechEffectValue() {
		return (effectValue+(valueType==2?"%":""));
	}

	public int getNeedLevel() {
		return needLevel;
	}
	public void setNeedLevel(int needLevel) {
		this.needLevel = needLevel;
	}
	public String getTechIcon() {
		return techIcon;
	}
	public void setTechIcon(String techIcon) {
		this.techIcon = techIcon;
	}

}
