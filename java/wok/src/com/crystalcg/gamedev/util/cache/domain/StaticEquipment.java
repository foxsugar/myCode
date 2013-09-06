package com.crystalcg.gamedev.util.cache.domain;

/**
 * 装备静态表
 * 
 * @author xuzhongxing
 * 
 */
public class StaticEquipment {
	private int id;// id
	private String equipmentNo;// 装备编号
	private String equipmentName;// 装备名称
	private int quality;// 品质
	private int equipmentType;// 装备类型 1:武器,2:头盔,3:胸甲,4:护腿,5:靴子,6:护腕
	private int weaponType;// 武器类别
	private int needLevel;// 需求武将等级
	private int sellable;// 是否可卖商店
	private int dropable;// 是否可丢弃
	private int isBop;// 是否拾取绑定
	private int price;// 出售给商店的价格
	private int heroForce;// 附加武力
	private int strategy;// 附加谋略
	private int physique;// 附加体质
	private int agility;// 附加身法
	private String specialSkill1;// 装备上附加的特殊效果1的编号
	private int skillProbability1;// 特殊效果1触发几率
	private String specialSkill2;// 装备上附加的特殊效果2的编号
	private int skillProbability2;// 特殊效果2触发几率
	private String specialSkill3;// 装备上附加的特殊效果3的编号
	private int skillProbability3;// 特殊效果3触发几率
	private String icon;// 装备图标
	private String iconLarge;// 装备大图标
	private String description;// 装备描述
	
	//数据库没有的属性
	private int itemType;
	

	public String getEquipmentNo() {
		return equipmentNo;
	}

	public String getEquipmentName() {
		return equipmentName;
	}

	public int getQuality() {
		return quality;
	}

	public int getEquipmentType() {
		return equipmentType;
	}

	public int getWeaponType() {
		return weaponType;
	}

	public int getNeedLevel() {
		return needLevel;
	}

	public int getSellable() {
		return sellable;
	}

	public int getDropable() {
		return dropable;
	}

	public int getIsBop() {
		return isBop;
	}

	public int getPrice() {
		return price;
	}

	public int getHeroForce() {
		return heroForce;
	}

	public int getStrategy() {
		return strategy;
	}

	public int getPhysique() {
		return physique;
	}

	public int getAgility() {
		return agility;
	}

	public String getSpecialSkill1() {
		return specialSkill1;
	}

	public int getSkillProbability1() {
		return skillProbability1;
	}

	public String getSpecialSkill2() {
		return specialSkill2;
	}

	public int getSkillProbability2() {
		return skillProbability2;
	}

	public String getSpecialSkill3() {
		return specialSkill3;
	}

	public int getSkillProbability3() {
		return skillProbability3;
	}

	public String getIcon() {
		return icon;
	}

	public String getIconLarge() {
		return iconLarge;
	}

	public String getDescription() {
		return description;
	}

	public void setEquipmentNo(String equipmentNo) {
		this.equipmentNo = equipmentNo;
	}

	public void setEquipmentName(String equipmentName) {
		this.equipmentName = equipmentName;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	public void setEquipmentType(int equipmentType) {
		this.equipmentType = equipmentType;
	}

	public void setWeaponType(int weaponType) {
		this.weaponType = weaponType;
	}

	public void setNeedLevel(int needLevel) {
		this.needLevel = needLevel;
	}

	public void setSellable(int sellable) {
		this.sellable = sellable;
	}

	public void setDropable(int dropable) {
		this.dropable = dropable;
	}

	public void setIsBop(int isBop) {
		this.isBop = isBop;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public void setHeroForce(int heroForce) {
		this.heroForce = heroForce;
	}

	public void setStrategy(int strategy) {
		this.strategy = strategy;
	}

	public void setPhysique(int physique) {
		this.physique = physique;
	}

	public void setAgility(int agility) {
		this.agility = agility;
	}

	public void setSpecialSkill1(String specialSkill1) {
		this.specialSkill1 = specialSkill1;
	}

	public void setSkillProbability1(int skillProbability1) {
		this.skillProbability1 = skillProbability1;
	}

	public void setSpecialSkill2(String specialSkill2) {
		this.specialSkill2 = specialSkill2;
	}

	public void setSkillProbability2(int skillProbability2) {
		this.skillProbability2 = skillProbability2;
	}

	public void setSpecialSkill3(String specialSkill3) {
		this.specialSkill3 = specialSkill3;
	}

	public void setSkillProbability3(int skillProbability3) {
		this.skillProbability3 = skillProbability3;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public void setIconLarge(String iconLarge) {
		this.iconLarge = iconLarge;
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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

}
