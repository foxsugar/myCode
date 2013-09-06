package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticGiftBox;
import com.crystalcg.gamedev.util.cache.domain.StaticItem;

public class ItemCache {
	private static Logger logger = LoggerFactory.getLogger(EquipmentCache.class);
	private static Map<String, StaticItem> ITEM_STORE;//消耗品道具静态信息
	private static Map<String, List<StaticGiftBox>> GIFT_STORE;//礼包静态信息
	private ItemCache(CacheMapper cacheMapper){
		ITEM_STORE = new HashMap<String, StaticItem>();
		List<StaticItem> items = cacheMapper.getStaticItem();
		for(StaticItem i :items){
			ITEM_STORE.put(i.getItemNo(), i);
			i.setItemType(Const.TYPE_ITEM);
		}
		GIFT_STORE = new HashMap<String, List<StaticGiftBox>>();
		List<StaticGiftBox> giftBoxes = cacheMapper.getStaticGiftBox();
		for(StaticGiftBox i: giftBoxes){
			if(GIFT_STORE.get(i.getGiftNo())==null){
				List<StaticGiftBox> tempList = new ArrayList<StaticGiftBox>();
				tempList.add(i);
				GIFT_STORE.put(i.getGiftNo(), tempList);
			}else{
				GIFT_STORE.get(i.getGiftNo()).add(i);
			}
		}
		logger.info("ItemCache has successfully loaded");
	}
	/**
	 * 通过no查找消耗品静态信息
	 * @param itemNo
	 * @return
	 */
	public static StaticItem getItemByNo(String itemNo){
		return ITEM_STORE.get(itemNo);
	}
	/**
	 * 通过NO查找静态礼包信息
	 * @param giftNo
	 * @return
	 */
	public static List<StaticGiftBox> getGiftBox(String giftNo){
		return GIFT_STORE.get(giftNo);
	}
	public static Collection<StaticItem> getAllItem(){
		return ITEM_STORE.values();
	}
}
