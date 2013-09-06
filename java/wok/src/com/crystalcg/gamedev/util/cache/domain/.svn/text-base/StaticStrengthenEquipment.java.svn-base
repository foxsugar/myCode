package com.crystalcg.gamedev.util.cache.domain;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.crystalcg.gamedev.util.cache.ItemCache;

/**
 * 装备强化静态表
 * @author xuzhongxing
 *
 */
public class StaticStrengthenEquipment {

	@JsonIgnore
	private int strengthLevel; // 当前强化等级
	@JsonIgnore
	private String needMaterialNo; // 需求材料编号
	private int quality;
	private int needMaterialAmount; // 需求材料数量
	private int needMoney; // 需求铜币
	@JsonIgnore
	private double successRate; // 成功率
	@JsonIgnore
	private int baseValue;
	@JsonIgnore
	private double propertyBonus;// 属性奖励
	@JsonIgnore
	private int reduceLevel;// 失败是否会掉级
	//表中没有，get方法重写
	private String needMaterialName;// 需求材料名称

	public int getStrengthLevel() {
		return strengthLevel;
	}

	public String getNeedMaterialNo() {
		return needMaterialNo;
	}

	public int getNeedMaterialAmount() {
		return needMaterialAmount;
	}

	public int getNeedMoney() {
		return needMoney;
	}

	public double getSuccessRate() {
		return successRate;
	}

	public double getPropertyBonus() {
		return propertyBonus;
	}

	public void setStrengthLevel(int strengthLevel) {
		this.strengthLevel = strengthLevel;
	}

	public void setNeedMaterialNo(String needMaterialNo) {
		this.needMaterialNo = needMaterialNo;
	}

	public void setNeedMaterialAmount(int needMaterialAmount) {
		this.needMaterialAmount = needMaterialAmount;
	}

	public void setNeedMoney(int needMoney) {
		this.needMoney = needMoney;
	}

	public void setSuccessRate(double successRate) {
		this.successRate = successRate;
	}

	public void setPropertyBonus(double propertyBonus) {
		this.propertyBonus = propertyBonus;
	}

	public int getReduceLevel() {
		return reduceLevel;
	}

	public void setReduceLevel(int reduceLevel) {
		this.reduceLevel = reduceLevel;
	}

	public String getNeedMaterialName() {
		if(needMaterialName==null){
			setNeedMaterialName(ItemCache.getItemByNo(needMaterialNo).getItemName());
		}
		return needMaterialName;
	}

	public int getQuality() {
		return quality;
	}

	public void setNeedMaterialName(String needMaterialName) {
		this.needMaterialName = needMaterialName;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	public int getNextStrengthLevel() {
		return strengthLevel + 1;
	}

	/**
	 * 获得强化增幅
	 * 
	 * @return
	 */
	public String getStrengthenMargin() {
		return (int) (propertyBonus * 100) + "%";
	}

	/**
	 * 获取成功率
	 * 
	 * @return
	 */
	public String getStrengthenProbability() {
		int strengthenProbability = (int) (successRate * 100);
		if (strengthenProbability == 0) {
			return "小于1%";
		} else {
			return strengthenProbability + "%";
		}
	}

	public int getBaseValue() {
		return baseValue;
	}

	public void setBaseValue(int baseValue) {
		this.baseValue = baseValue;
	}

}
