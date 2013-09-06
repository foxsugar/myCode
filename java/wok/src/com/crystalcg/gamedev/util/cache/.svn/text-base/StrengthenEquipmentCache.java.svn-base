package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.util.cache.domain.StaticStrengthenEquipment;

public class StrengthenEquipmentCache {
	private static Map<Integer,StaticStrengthenEquipment> store;
	private StrengthenEquipmentCache(CacheMapper cacheMapper){
		List<StaticStrengthenEquipment> staticStrengthenEquipments = cacheMapper.getStaticStrengthenEquipment();
		store = new HashMap<Integer, StaticStrengthenEquipment>();
		for(StaticStrengthenEquipment i :staticStrengthenEquipments){
			store.put(i.getStrengthLevel(), i);
		}
	}
	public static StaticStrengthenEquipment getEquipStrengthEntityByLevel(int strengthLevel){
		return store.get(strengthLevel);
	}
	
}
