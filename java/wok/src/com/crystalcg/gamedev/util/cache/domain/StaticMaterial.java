package com.crystalcg.gamedev.util.cache.domain;

import com.crystalcg.gamedev.util.Const;

/**
 * 材料静态表
 * 
 * @author xuzhongxing
 * 
 */
public class StaticMaterial {
	private int id;// 材料编号
	private String materialNo;// 材料编号
	private String materialName;// 材料名称
	private int materialType;// 材料类别
	private int quality;// 品质
	private int sellable;// 是否可卖商店
	private int price;// 出售给商店的价格
	private int stackable;// 是否可堆叠
	private int stackLimit;// 最大堆叠数
	private int isBop;// 是否拾取绑定
	private int dropable;// 是否可丢弃
	private String icon;// 装备图标
	private String description;// 装备描述
	private String iconLarge;// 材料大图标
	private int gemstoneType;// 宝石类型，3玉石，2星石，1晶石，0不是宝石
	private int attributeType;// 宝石附加的属性类型，1武力，2谋虑，3体质，4身法，5攻击，6防御，7命中，8闪避，9体力，10精力，11暴击，12统率
	private int attributeValue;// 宝石属性值
	private String gemstoneDescription;// 宝石描述
	
	//表中不存在，后生成的属性
	private int gemstoneLevel;
	private int materialLevel;//打造材料等级
	private int itemType;

	public String getMaterialNo() {
		return materialNo;
	}

	public String getMaterialName() {
		return materialName;
	}

	public int getMaterialType() {
		return materialType;
	}

	public int getQuality() {
		return quality;
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

	public int getIsBop() {
		return isBop;
	}

	public int getDropable() {
		return dropable;
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

	public int getGemstoneType() {
		return gemstoneType;
	}

	public int getAttributeType() {
		return attributeType;
	}

	public int getAttributeValue() {
		return attributeValue;
	}

	public String getGemstoneDescription() {
		return gemstoneDescription;
	}

	public void setMaterialNo(String materialNo) {
		this.materialNo = materialNo;
	}

	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}

	public void setMaterialType(int materialType) {
		this.materialType = materialType;
	}

	public void setQuality(int quality) {
		this.quality = quality;
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

	public void setIsBop(int isBop) {
		this.isBop = isBop;
	}

	public void setDropable(int dropable) {
		this.dropable = dropable;
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

	public void setGemstoneType(int gemstoneType) {
		this.gemstoneType = gemstoneType;
	}

	public void setAttributeType(int attributeType) {
		this.attributeType = attributeType;
	}

	public void setAttributeValue(int attributeValue) {
		this.attributeValue = attributeValue;
	}

	public void setGemstoneDescription(String gemstoneDescription) {
		this.gemstoneDescription = gemstoneDescription;
	}

	public int getGemstoneLevel() {
		if(gemstoneLevel==0&&materialType==Const.MATERIAL_TYPE_STONE){
			String[] split = materialNo.split("_");
			int length = split.length;
			setGemstoneLevel(Integer.parseInt(split[length-1]));
		}
		return gemstoneLevel;
	}
	
	public int getMaterialLevel(){
		if(materialLevel==0&&materialType==Const.MATERIAL_TYPE_MATERIAL_FOR_PRODUCE){
			String[] split = materialNo.split("_");
			int length = split.length;
			setMaterialLevel(Integer.parseInt(split[length-1]));
		}
		return materialLevel;
		
	}

	public void setGemstoneLevel(int gemstoneLevel) {
		this.gemstoneLevel = gemstoneLevel;
	}

	public int getItemType() {
		return itemType;
	}

	public void setItemType(int itemType) {
		this.itemType = itemType;
	}

	public void setMaterialLevel(int materialLevel) {
		this.materialLevel = materialLevel;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
}
