package com.crystalcg.gamedev.util.cache.domain;

/**
 * 消耗品道具表
 * 
 * @author xuzhongxing
 * 
 */
public class StaticItem {
	private int id;
	private String itemNo;// 道具ID号
	private String itemName;// 道具名称
	private int itemSubtype;// 物品子类别
	private int useEffectType;//消耗品使用类别
	private int quality;// 品质
	private int useable;// 能否使用
	private int batchUseable;// 是否可批量使用
	private int sellable;// 可否卖商店
	private int price;// 卖商店价格
	private int stackable;// 可否堆叠
	private int stackLimit;// 最大堆叠数
	private int dropable;// 可否被丢弃
	private int isBop;// 是否拾取绑定
	private String specialSkill1;// 特殊效果1
	private String specialSkill2;// 特殊效果2
	private String specialSkill3;// 特殊效果3
	private String icon;// 道具图标
	private String description;// 道具描述

	//数据库没有的属性
	private int itemType;
		
	public String getItemNo() {
		return itemNo;
	}

	public String getItemName() {
		return itemName;
	}

	public int getItemSubtype() {
		return itemSubtype;
	}

	public int getQuality() {
		return quality;
	}

	public int getUseable() {
		return useable;
	}

	public int getBatchUseable() {
		return batchUseable;
	}

	public int getSellable() {
		return sellable;
	}

	public int getPrice() {
		return price;
	}

	public int getStackable() {
		return stackable;
	}

	public int getStackLimit() {
		return stackLimit;
	}

	public int getDropable() {
		return dropable;
	}

	public int getIsBop() {
		return isBop;
	}

	public String getSpecialSkill1() {
		return specialSkill1;
	}

	public String getSpecialSkill2() {
		return specialSkill2;
	}

	public String getSpecialSkill3() {
		return specialSkill3;
	}

	public String getIcon() {
		return icon;
	}

	public String getDescription() {
		return description;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public void setItemSubtype(int itemSubtype) {
		this.itemSubtype = itemSubtype;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	public void setUseable(int useable) {
		this.useable = useable;
	}

	public void setBatchUseable(int batchUseable) {
		this.batchUseable = batchUseable;
	}

	public void setSellable(int sellable) {
		this.sellable = sellable;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public void setStackable(int stackable) {
		this.stackable = stackable;
	}

	public void setStackLimit(int stackLimit) {
		this.stackLimit = stackLimit;
	}

	public void setDropable(int dropable) {
		this.dropable = dropable;
	}

	public void setIsBop(int isBop) {
		this.isBop = isBop;
	}

	public void setSpecialSkill1(String specialSkill1) {
		this.specialSkill1 = specialSkill1;
	}

	public void setSpecialSkill2(String specialSkill2) {
		this.specialSkill2 = specialSkill2;
	}

	public void setSpecialSkill3(String specialSkill3) {
		this.specialSkill3 = specialSkill3;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getItemType() {
		return itemType;
	}

	public void setItemType(int itemType) {
		this.itemType = itemType;
	}

	public int getUseEffectType() {
		return useEffectType;
	}

	public void setUseEffectType(int useEffectType) {
		this.useEffectType = useEffectType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


}
