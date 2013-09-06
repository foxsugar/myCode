package com.crystalcg.gamedev.item.domain;

import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.MaterialCache;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;

/**
 * 用户材料
 */
public class UserMaterial extends UserCommonInfo{
	
	public UserMaterial(){
		
	}
	public UserMaterial(StaticMaterial staticMaterial, int isBound){
		itemNo = staticMaterial.getMaterialNo();
		itemType = staticMaterial.getItemType();
		this.isBound = isBound;
	}
	public UserMaterial(Auction auction){
		itemNo = auction.getItemNo();
		itemType = auction.getItemType();
		itemAmount = auction.getItemAmount();
		isBound = Const.IS_NOT_BIND_STATE;
		itemPosition = Const.POSITION_MAIL;
	}
	/**
	 * 获取用户材料静态数据
	 * @return
	 */
	public StaticMaterial getMaterial() {
		return MaterialCache.getMaterialByNo(itemNo);
	}
}
