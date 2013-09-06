package com.crystalcg.gamedev.util.cache.domain;

/**
 * 任务道具静态表
 * 
 * @author xuzhongxing
 * 
 */
public class StaticQuests {
	private int id;// 道具id
	private String itemNo;// 道具编号
	private String itemName;// 道具名称
	private int itemType;// 物品类型
	private int quality;// 品质
	private int stackable;// 是否可堆叠
	private int stackLimit;// 最大堆叠数
	private String icon;// 道具图标
	private String description;// 道具描述
	private String iconLarge;// 任务道具大图标
	private int dropable;// 是否可丢弃
	

	public String getItemNo() {
		return itemNo;
	}

	public String getItemName() {
		return itemName;
	}

	public int getQuality() {
		return quality;
	}

	public int getStackable() {
		return stackable;
	}

	public int getStackLimit() {
		return stackLimit;
	}

	public String getIcon() {
		return icon;
	}

	public String getDescription() {
		return description;
	}

	public String getIconLarge() {
		return iconLarge;
	}

	public int getDropable() {
		return dropable;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	public void setStackable(int stackable) {
		this.stackable = stackable;
	}

	public void setStackLimit(int stackLimit) {
		this.stackLimit = stackLimit;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setIconLarge(String iconLarge) {
		this.iconLarge = iconLarge;
	}

	public void setDropable(int dropable) {
		this.dropable = dropable;
	}

	public int getItemType() {
		return itemType;
	}

	public void setItemType(int itemType) {
		this.itemType = itemType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
}
