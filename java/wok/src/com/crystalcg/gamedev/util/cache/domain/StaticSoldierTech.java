package com.crystalcg.gamedev.util.cache.domain;

/**
 * 兵种科技表
 * 
 * @author jinganyang
 * 
 */
public class StaticSoldierTech {

	private String techNo; // 科技编号
	private String techName; // 科技的中文名称
	private String preTech; // 研究此项科技所需要的前置科技
	private int needTime; // 研究此项科技所需要的时间
	private int techLevel; // 该科技的当前级别
	private int soldierType; // 该科技对应作用的兵种类型
	private String soldierNo; // 对应的兵种编号
	private int valueMode;//效果值模式
	private int addHealth; // 研究此科技后增加的对应兵种生命值
	private int addAtk; // 研究此科技后增加的对应兵种攻击力
	private int addDef; // 研究此科技后增加的对应兵种防御力
	private int addHit;// 研究此科技后增加的对应兵种命中率
	private int addDodge; // 研究此科技后增加的对应兵种躲闪率
	private int addCrt; // 研究此科技后增加的对应兵种暴击率
	private String addSkill; // 研究此科技后获得兵种技能
	private String techIcon; // 科技的图标
	private String description; // 科技的文本描述

	public String getTechNo() {
		return techNo;
	}

	public String getTechName() {
		return techName;
	}

	public String getPreTech() {
		return preTech;
	}

	public int getNeedTime() {
		return needTime;
	}

	public int getTechLevel() {
		return techLevel;
	}

	public int getSoldierType() {
		return soldierType;
	}

	public String getSoldierNo() {
		return soldierNo;
	}

	public int getAddHealth() {
		return addHealth;
	}

	public int getAddAtk() {
		return addAtk;
	}

	public int getAddDef() {
		return addDef;
	}

	public int getAddHit() {
		return addHit;
	}

	public int getAddDodge() {
		return addDodge;
	}

	public int getAddCrt() {
		return addCrt;
	}

	public String getAddSkill() {
		return addSkill;
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

	public void setPreTech(String preTech) {
		this.preTech = preTech;
	}

	public void setNeedTime(int needTime) {
		this.needTime = needTime;
	}

	public void setTechLevel(int techLevel) {
		this.techLevel = techLevel;
	}

	public void setSoldierType(int soldierType) {
		this.soldierType = soldierType;
	}

	public void setSoldierNo(String soldierNo) {
		this.soldierNo = soldierNo;
	}

	public void setAddHealth(int addHealth) {
		this.addHealth = addHealth;
	}

	public void setAddAtk(int addAtk) {
		this.addAtk = addAtk;
	}

	public void setAddDef(int addDef) {
		this.addDef = addDef;
	}

	public void setAddHit(int addHit) {
		this.addHit = addHit;
	}

	public void setAddDodge(int addDodge) {
		this.addDodge = addDodge;
	}

	public void setAddCrt(int addCrt) {
		this.addCrt = addCrt;
	}

	public void setAddSkill(String addSkill) {
		this.addSkill = addSkill;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getValueMode() {
		return valueMode;
	}

	public void setValueMode(int valueMode) {
		this.valueMode = valueMode;
	}

	public String getTechIcon() {
		return techIcon;
	}

	public void setTechIcon(String techIcon) {
		this.techIcon = techIcon;
	}
	
}
