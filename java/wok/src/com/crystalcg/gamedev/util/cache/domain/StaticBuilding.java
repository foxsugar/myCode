package com.crystalcg.gamedev.util.cache.domain;

/**
 * 建筑实体
 * 
 * @author xuzhongxing
 * 
 */
public class StaticBuilding {
	private String buildingNo;
	private String buildingName;
	private String preBuilding;
	private int buildingType;
	private long needWood;
	private long needStone;
	private long needIronore;
	private long needMoney;
	private int characterExp;
	private int cityExp;
	private int limitAmount;
	private long upgradeTime;
	private int level;
	private String image;
	private String buildingDesc;
	private String upgradeDesc;
	private String demolitionDesc;
	private int function1;
	private double functionvalue1;
	private int function2;
	private double functionvalue2;
	private int function3;
	private double functionvalue3;
	private int function4;
	private double functionvalue4;

	public String getBuildingNo() {
		return buildingNo;
	}

	public String getBuildingName() {
		return buildingName;
	}

	public String getPreBuilding() {
		return preBuilding;
	}

	public int getBuildingType() {
		return buildingType;
	}

	public long getNeedWood() {
		return needWood;
	}

	public long getNeedStone() {
		return needStone;
	}

	public long getNeedIronore() {
		return needIronore;
	}

	public long getNeedMoney() {
		return needMoney;
	}

	public int getCharacterExp() {
		return characterExp;
	}

	public int getCityExp() {
		return cityExp;
	}

	public int getLimitAmount() {
		return limitAmount;
	}
	/**
	 * 时间单位秒
	 * @return
	 */
	public long getUpgradeTime() {
		return upgradeTime;
	}

	public int getLevel() {
		return level;
	}

	public String getImage() {
		return image;
	}

	public String getBuildingDesc() {
		return buildingDesc;
	}

	public int getFunction1() {
		return function1;
	}

	public double getFunctionvalue1() {
		return functionvalue1;
	}

	public int getFunction2() {
		return function2;
	}

	public double getFunctionvalue2() {
		return functionvalue2;
	}

	public int getFunction3() {
		return function3;
	}

	public double getFunctionvalue3() {
		return functionvalue3;
	}

	public int getFunction4() {
		return function4;
	}

	public double getFunctionvalue4() {
		return functionvalue4;
	}

	public void setBuildingNo(String buildingNo) {
		this.buildingNo = buildingNo;
	}

	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}

	public void setPreBuilding(String preBuilding) {
		this.preBuilding = preBuilding;
	}

	public void setBuildingType(int buildingType) {
		this.buildingType = buildingType;
	}

	public void setNeedWood(long needWood) {
		this.needWood = needWood;
	}

	public void setNeedStone(long needStone) {
		this.needStone = needStone;
	}

	public void setNeedIronore(long needIronore) {
		this.needIronore = needIronore;
	}

	public void setNeedMoney(long needMoney) {
		this.needMoney = needMoney;
	}

	public void setCharacterExp(int characterExp) {
		this.characterExp = characterExp;
	}

	public void setCityExp(int cityExp) {
		this.cityExp = cityExp;
	}

	public void setLimitAmount(int limitAmount) {
		this.limitAmount = limitAmount;
	}

	public void setUpgradeTime(long upgradeTime) {
		this.upgradeTime = upgradeTime;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public void setBuildingDesc(String buildingDesc) {
		this.buildingDesc = buildingDesc;
	}

	public void setFunction1(int function1) {
		this.function1 = function1;
	}

	public void setFunctionvalue1(double functionvalue1) {
		this.functionvalue1 = functionvalue1;
	}

	public void setFunction2(int function2) {
		this.function2 = function2;
	}

	public void setFunctionvalue2(double functionvalue2) {
		this.functionvalue2 = functionvalue2;
	}

	public void setFunction3(int function3) {
		this.function3 = function3;
	}

	public void setFunctionvalue3(double functionvalue3) {
		this.functionvalue3 = functionvalue3;
	}

	public void setFunction4(int function4) {
		this.function4 = function4;
	}

	public void setFunctionvalue4(double functionvalue4) {
		this.functionvalue4 = functionvalue4;
	}

	public String getUpgradeDesc() {
		return upgradeDesc;
	}

	public String getDemolitionDesc() {
		return demolitionDesc;
	}

	public void setUpgradeDesc(String upgradeDesc) {
		this.upgradeDesc = upgradeDesc;
	}

	public void setDemolitionDesc(String demolitionDesc) {
		this.demolitionDesc = demolitionDesc;
	}
}
