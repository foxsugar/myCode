package com.crystalcg.gamedev.item.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * 拍卖行
 */
public class Auction {

	private int id;// 拍卖行流水号
	private int basePrice; // 底价
	private int fixedPrice; // 一口价
	@JsonIgnore
	private Date startTime; // 开始拍卖时间
	@JsonIgnore
	private int savingTime; // 保管时间
	@JsonIgnore
	private Date bidTime;// 出价时间
	@JsonIgnore
	private int bidCharacterId; // 出价君主id
	@JsonIgnore
	private int characterId;// 拍卖人君主Id
	@JsonIgnore
	private String itemName; // 装备名称
	@JsonIgnore
	private String itemNo;// 物品标识Id
	@JsonIgnore
	private int itemType; // 物品类型
	@JsonIgnore
	private int itemSubtype;//物品子类型
	@JsonIgnore
	private int quality;//物品品级
	
	private int needLevel;//使用需求等级
	@JsonIgnore
	private int itemAmount;// 道具数量
	@JsonIgnore
	private int strengthLevel;// 强化等级
	@JsonIgnore
	private String hole1;// 孔1
	@JsonIgnore
	private String hole2;// 孔2
	@JsonIgnore
	private String hole3;// 孔3
	@JsonIgnore
	private int strengthenForce;// 强化附加武力值
	@JsonIgnore
	private int strengthenStrategy;// 强化附加谋略值
	@JsonIgnore
	private int strengthenPhysique;// 强化附加体质值
	@JsonIgnore
	private int strengthenAgility;// 强化附加身法值
	/////////////////// 数据库中没有 ///////////////////
	private String sellerName;//出售人名字
	private String bidName;//出价人名字
	/////////////////// EDN ////////////////////
	public Auction(){
		
	}
	public Auction(int basePrice, int fixedPrice, int savingTime, int itemAmount, Date startingTime){
		this.basePrice = basePrice;
		this.fixedPrice = fixedPrice;
		this.savingTime = savingTime;
		this.startTime = startingTime;
		this.itemAmount = itemAmount;
	}
	public int getRemainTime() {
		int remainTime = (int)(startTime.getTime()+savingTime*1000-System.currentTimeMillis())/3600000;
		return remainTime;
	}
	public int getId() {
		return id;
	}
	public int getBasePrice() {
		return basePrice;
	}
	public int getFixedPrice() {
		return fixedPrice;
	}
	public Date getStartTime() {
		return startTime;
	}
	public int getSavingTime() {
		return savingTime;
	}
	public int getBidCharacterId() {
		return bidCharacterId;
	}
	public Date getBidTime() {
		return bidTime;
	}
	public int getCharacterId() {
		return characterId;
	}
	public String getItemName() {
		return itemName;
	}
	public String getItemNo() {
		return itemNo;
	}
	public int getItemType() {
		return itemType;
	}
	public int getItemSubtype() {
		return itemSubtype;
	}
	public int getQuality() {
		return quality;
	}
	public int getNeedLevel() {
		return needLevel;
	}
	public int getItemAmount() {
		return itemAmount;
	}
	public int getStrengthLevel() {
		return strengthLevel;
	}
	public String getHole1() {
		return hole1;
	}
	public String getHole2() {
		return hole2;
	}
	public String getHole3() {
		return hole3;
	}
	public int getStrengthenForce() {
		return strengthenForce;
	}
	public int getStrengthenStrategy() {
		return strengthenStrategy;
	}
	public int getStrengthenPhysique() {
		return strengthenPhysique;
	}
	public int getStrengthenAgility() {
		return strengthenAgility;
	}
	public String getSellerName() {
		return sellerName;
	}
	public String getBidName() {
		return bidName;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setBasePrice(int basePrice) {
		this.basePrice = basePrice;
	}
	public void setFixedPrice(int fixedPrice) {
		this.fixedPrice = fixedPrice;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public void setSavingTime(int savingTime) {
		this.savingTime = savingTime;
	}
	public void setBidCharacterId(int bidCharacterId) {
		this.bidCharacterId = bidCharacterId;
	}
	public void setBidTime(Date bidTime) {
		this.bidTime = bidTime;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public void setItemType(int itemType) {
		this.itemType = itemType;
	}
	public void setItemSubtype(int itemSubtype) {
		this.itemSubtype = itemSubtype;
	}
	public void setQuality(int quality) {
		this.quality = quality;
	}
	public void setNeedLevel(int needLevel) {
		this.needLevel = needLevel;
	}
	public void setItemAmount(int itemAmount) {
		this.itemAmount = itemAmount;
	}
	public void setStrengthLevel(int strengthLevel) {
		this.strengthLevel = strengthLevel;
	}
	public void setHole1(String hole1) {
		this.hole1 = hole1;
	}
	public void setHole2(String hole2) {
		this.hole2 = hole2;
	}
	public void setHole3(String hole3) {
		this.hole3 = hole3;
	}
	public void setStrengthenForce(int strengthenForce) {
		this.strengthenForce = strengthenForce;
	}
	public void setStrengthenStrategy(int strengthenStrategy) {
		this.strengthenStrategy = strengthenStrategy;
	}
	public void setStrengthenPhysique(int strengthenPhysique) {
		this.strengthenPhysique = strengthenPhysique;
	}
	public void setStrengthenAgility(int strengthenAgility) {
		this.strengthenAgility = strengthenAgility;
	}
	public void setSellerName(String sellerName) {
		this.sellerName = sellerName;
	}
	public void setBidName(String bidName) {
		this.bidName = bidName;
	}
}
