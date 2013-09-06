package com.crystalcg.gamedev.util.cache.domain;
/**
 * 联盟建筑
 * @author zhaibiao
 *
 */
public class StaticAllianceBuilding {
     private String bulidingNo;//建筑编号
     private int bulidingEffectType;//建筑效果类型
     private String bulidingName;//建筑名称
     private int effectValueMode;//效果值模式：1=数值，2=百分比
     private float effectValue;//建筑效果值
     private int needAllianceLevel;//升级所需联盟等级
     private int upgradeNeedWealth;//升级所需财富
     private int upgradeNeedTime;//升级所需时间 （单位/s）
     private String bulidingDesc;//建筑描述
	public String getBulidingNo() {
		return bulidingNo;
	}
	public void setBulidingNo(String bulidingNo) {
		this.bulidingNo = bulidingNo;
	}
	public int getBulidingEffectType() {
		return bulidingEffectType;
	}
	public void setBulidingEffectType(int bulidingEffectType) {
		this.bulidingEffectType = bulidingEffectType;
	}
	public int getEffectValueMode() {
		return effectValueMode;
	}
	public void setEffectValueMode(int effectValueMode) {
		this.effectValueMode = effectValueMode;
	}
	public float getEffectValue() {
		return effectValue;
	}
	public void setEffectValue(float effectValue) {
		this.effectValue = effectValue;
	}
	public int getUpgradeNeedWealth() {
		return upgradeNeedWealth;
	}
	public void setUpgradeNeedWealth(int upgradeNeedWealth) {
		this.upgradeNeedWealth = upgradeNeedWealth;
	}
	public int getUpgradeNeedTime() {
		return upgradeNeedTime;
	}
	public void setUpgradeNeedTime(int upgradeNeedTime) {
		this.upgradeNeedTime = upgradeNeedTime;
	}
	public String getBulidingDesc() {
		return bulidingDesc;
	}
	public void setBulidingDesc(String bulidingDesc) {
		this.bulidingDesc = bulidingDesc;
	}
	public String getBulidingName() {
		return bulidingName;
	}
	public void setBulidingName(String bulidingName) {
		this.bulidingName = bulidingName;
	}
	public int getNeedAllianceLevel() {
		return needAllianceLevel;
	}
	public void setNeedAllianceLevel(int needAllianceLevel) {
		this.needAllianceLevel = needAllianceLevel;
	}
	
     
     
}
