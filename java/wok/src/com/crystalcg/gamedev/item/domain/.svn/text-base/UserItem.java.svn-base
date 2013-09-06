package com.crystalcg.gamedev.item.domain;

import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.ItemCache;
import com.crystalcg.gamedev.util.cache.domain.StaticItem;


/**
 * 用户物品
 */
public class UserItem extends UserCommonInfo{

	
	
	public UserItem(){
		
	}
	/**
	 * 用于拍卖行功能的构造函数
	 * @param auction
	 */
	public UserItem(Auction auction){
		itemNo = auction.getItemNo();
		itemType = auction.getItemType();
		itemSubtype = auction.getItemSubtype();
		itemAmount = auction.getItemAmount();
		isBound = Const.IS_NOT_BIND_STATE;
		itemPosition = Const.POSITION_MAIL;
	}
	/**
	 * 获取用户道具静态数据
	 * @return
	 */
	public StaticItem getItem() {
		return ItemCache.getItemByNo(itemNo);
	}
}
