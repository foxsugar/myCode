package com.crystalcg.gamedev.item.domain;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.EquipmentCache;
import com.crystalcg.gamedev.util.cache.MaterialCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEquipment;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;

/**
 * 用户装备
 */
public class UserEquipment {
	private int id;// 用户装备表ID
	private int characterId;//玩家角色Id
	private String itemNo;//道具标识Id
	private int itemType;//道具类型
	private int equipmentType;//装备类型，用于排序和查询
	private int itemAmount;//道具数量
	private int strengthLevel;//强化等级
	private int isBound;//道具是否绑定
	private String hole1;//孔1
	private String hole2; //孔2
	private String hole3; //孔3
	private int itemPosition;//道具位置状态：0国库，1武将，2邮件
	private int heroUseId; //装备的武将ID
	private int strengthenForce;//武力强化值
	private int strengthenStrategy; //强化附加谋略值
	private int strengthenPhysique; //强化附加体质值
	private int strengthenAgility; //强化附加身法值
	
	public UserEquipment(){
		
	}
	/**
	 * 用于拍卖行功能
	 * @param auction
	 */
	public UserEquipment(Auction auction){
		itemNo = auction.getItemNo();
		itemType = auction.getItemType();
		equipmentType = auction.getItemSubtype();
		itemAmount = auction.getItemAmount();
		strengthLevel = auction.getStrengthLevel();
		hole1 = auction.getHole1();
		hole2 = auction.getHole2();
		hole3 = auction.getHole3();
		strengthenForce = auction.getStrengthenForce();
		strengthenStrategy = auction.getStrengthenStrategy();
		strengthenPhysique = auction.getStrengthenPhysique();
		strengthenAgility = auction.getStrengthenAgility();
		isBound = Const.IS_NOT_BIND_STATE;
		itemPosition = Const.POSITION_MAIL;
	}
	
	
	public int getId() {
		return id;
	}
	public int getCharacterId() {
		return characterId;
	}
	public int getItemType() {
		return itemType;
	}
	public int getItemAmount() {
		return itemAmount;
	}
	public int getStrengthLevel() {
		return strengthLevel;
	}
	public int getIsBound() {
		return isBound;
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
	public int getItemPosition() {
		return itemPosition;
	}
	public int getHeroUseId() {
		return heroUseId;
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
	/**
	 * 获取装备信息
	 * @return
	 */
	public StaticEquipment getEquipment() throws AppException {
		return EquipmentCache.getEquipmentByNo(itemNo);
	}
	/**
	 * 获取宝石1
	 * @return
	 */
	public StaticMaterial getStone1() {
		if(hole1!=null){
			return MaterialCache.getMaterialByNo(hole1);
		}
		return null;
	}
	/**
	 * 获取宝石2
	 * @return
	 */
	public StaticMaterial getStone2() {
		if(hole2!=null){
			return MaterialCache.getMaterialByNo(hole2);
		}
		return null;
	}
	/**
	 * 获取宝石3
	 * @return
	 */
	public StaticMaterial getStone3() {
		if(hole3!=null){
			return MaterialCache.getMaterialByNo(hole3);
		}
		return null;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public void setItemType(int itemType) {
		this.itemType = itemType;
	}
	public void setItemAmount(int itemAmount) {
		this.itemAmount = itemAmount;
	}
	public void setStrengthLevel(int strengthLevel) {
		this.strengthLevel = strengthLevel;
	}
	public void setIsBound(int isBound) {
		this.isBound = isBound;
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
	public void setItemPosition(int itemPosition) {
		this.itemPosition = itemPosition;
	}
	public void setHeroUseId(int heroUseId) {
		this.heroUseId = heroUseId;
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
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public int getEquipmentType() {
		return equipmentType;
	}
	public void setEquipmentType(int equipmentType) {
		this.equipmentType = equipmentType;
	}
	
	
}
