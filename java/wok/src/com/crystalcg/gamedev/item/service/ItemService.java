package com.crystalcg.gamedev.item.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.item.mapper.ItemMapper;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.EquipmentCache;
import com.crystalcg.gamedev.util.cache.ItemCache;
import com.crystalcg.gamedev.util.cache.MaterialCache;
import com.crystalcg.gamedev.util.cache.QuestCache;
import com.crystalcg.gamedev.util.cache.QuestsCache;

public class ItemService {
	
	private ItemMapper itemMapper;
	
	
	public Maincity getBaseAndResource(int characterId){
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		return maincityService.getMaincity(characterId);
	}
	
	public Map<String, Object> getAllArticles(){
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("equipments", EquipmentCache.getAllEquipment());
		retMap.put("items", ItemCache.getAllItem());
		retMap.put("materials", MaterialCache.getMaterial());
		retMap.put("quests", QuestsCache.getAllQuest());
		return retMap;
	}
	public void addItem(int characterId, String itemNo, int itemType) throws AppException{
		UserItemService userItemService =(UserItemService)ServiceLocator.getSpringBean("userItemService");
		if(userItemService.getTreasuryRemain(characterId)<=0){
			throw new AppException("背包已满");
		}
		userItemService.addItem2character(characterId, itemNo, itemType, Const.BOTH_BIND_AND_NOT_BIND);
	}
	public void updateResourceForTest(int characterId,int food, int wood, int stone, int ironore, int money) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		maincityService.updateMoney(characterId, money,null);
		maincityService.updateSuburbsResource(characterId, food, wood, stone, ironore);
	}
	
	public List<Map<String, Object>> getAllItem(){
		return itemMapper.getAllItem();
		
	}
	public List<Map<String, Object>> getAllEquipment(){
		return itemMapper.getAllEquipment();
	}
	public List<Map<String, Object>> getAllMaterial(){
		return itemMapper.getAllMaterial();
	}
	public List<Map<String, Object>> getAllQuests(){
		return itemMapper.getAllQuests();
	}
	
	public ItemMapper getItemMapper() {
		return itemMapper;
	}
	public void setItemMapper(ItemMapper itemMapper) {
		this.itemMapper = itemMapper;
	}

}
