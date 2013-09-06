package com.crystalcg.gamedev.util;

import java.util.HashMap;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.domain.UserQuests;
import com.crystalcg.gamedev.util.cache.domain.StaticEquipment;
import com.crystalcg.gamedev.util.cache.domain.StaticItem;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;
import com.crystalcg.gamedev.util.cache.domain.StaticQuests;

public class ChangeArticleToToolTip {
	public static Map<String, Object> changeEquipmentToToolTip(UserEquipment userEquipment) throws AppException{
		Map<String, Object> retMap = new HashMap<String,Object>();
		StaticEquipment staticEquipment = userEquipment.getEquipment();
		/////toolTip相关///////////////////
		retMap.put("equipmentName", staticEquipment.getEquipmentName());
		retMap.put("quality", staticEquipment.getQuality());
		retMap.put("strengthenLevel", userEquipment.getStrengthLevel());
		retMap.put("equipmentType", staticEquipment.getEquipmentType());
		retMap.put("weaponType", staticEquipment.getWeaponType());
		retMap.put("needLevel", staticEquipment.getNeedLevel());
		retMap.put("heroForce", staticEquipment.getHeroForce());
		retMap.put("strategy", staticEquipment.getStrategy());
		retMap.put("physique", staticEquipment.getPhysique());
		retMap.put("agility", staticEquipment.getAgility());
		retMap.put("strengthenForce", userEquipment.getStrengthenForce());
		retMap.put("strengthenStrategy", userEquipment.getStrengthenStrategy());
		retMap.put("strengthenPhysique", userEquipment.getStrengthenPhysique());
		retMap.put("strengthenAgility", userEquipment.getStrengthenAgility());
		if(userEquipment.getStone1()!=null){
			Map<String, Object> stone1 = new HashMap<String,Object>();
			stone1.put("stoneName", userEquipment.getStone1().getMaterialName());
			stone1.put("stoneNameDesc", userEquipment.getStone1().getGemstoneDescription());
			retMap.put("stone1", stone1);
		}
		if(userEquipment.getStone2()!=null){
			Map<String, Object> stone2 = new HashMap<String,Object>();
			stone2.put("stoneName", userEquipment.getStone2().getMaterialName());
			stone2.put("stoneNameDesc", userEquipment.getStone2().getGemstoneDescription());
			retMap.put("stone2", stone2);
		}
		if(userEquipment.getStone3()!=null){
			Map<String, Object> stone3 = new HashMap<String,Object>();
			stone3.put("stoneName", userEquipment.getStone3().getMaterialName());
			stone3.put("stoneNameDesc", userEquipment.getStone3().getGemstoneDescription());
			retMap.put("stone1", stone3);
		}
		retMap.put("equipmentDesc", staticEquipment.getDescription());
		retMap.put("isBound", userEquipment.getIsBound());
		/////操作相关/////////////
		return retMap;
	}
	public static Map<String, Object> changeEquipmentToToolTip(StaticEquipment staticEquipment) throws AppException{
		Map<String, Object> retMap = new HashMap<String,Object>();
		/////toolTip相关///////////////////
		retMap.put("equipmentName", staticEquipment.getEquipmentName());
		retMap.put("quality", staticEquipment.getQuality());
		retMap.put("equipmentType", staticEquipment.getEquipmentType());
		retMap.put("weaponType", staticEquipment.getWeaponType());
		retMap.put("needLevel", staticEquipment.getNeedLevel());
		retMap.put("heroForce", staticEquipment.getHeroForce());
		retMap.put("strategy", staticEquipment.getStrategy());
		retMap.put("physique", staticEquipment.getPhysique());
		retMap.put("agility", staticEquipment.getAgility());
		retMap.put("equipmentDesc", staticEquipment.getDescription());
		retMap.put("isBop", staticEquipment.getIsBop());
		return retMap;
	}
	public static Map<String, Object> changeItemToToolTip(UserItem userItem){
		Map<String, Object> retMap = new HashMap<String,Object>();
		StaticItem staticItem = userItem.getItem();
		retMap.put("itemName", staticItem.getItemName());
		retMap.put("isBound", userItem.getIsBound());
		retMap.put("description", staticItem.getDescription());
		return retMap;
	}
	public static Map<String, Object> changeItemToToolTip(StaticItem staticItem){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("itemName", staticItem.getItemName());
		retMap.put("isBop", staticItem.getIsBop());
		retMap.put("description", staticItem.getDescription());
		return retMap;
	}
	public static Map<String, Object> changeMaterialToToolTip(UserMaterial userMaterial){
		Map<String, Object> retMap = new HashMap<String,Object>();
		StaticMaterial staticMaterial = userMaterial.getMaterial();
		retMap.put("materialName", staticMaterial.getMaterialName());
		retMap.put("quality", staticMaterial.getQuality());
		retMap.put("materialType", staticMaterial.getMaterialType());
		retMap.put("isBound", userMaterial.getIsBound());
		retMap.put("description", staticMaterial.getDescription());
		return retMap;
	}
	public static Map<String, Object> changeMaterialToToolTip(StaticMaterial staticMaterial){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("materialName", staticMaterial.getMaterialName());
		retMap.put("quality", staticMaterial.getQuality());
		retMap.put("materialType", staticMaterial.getMaterialType());
		retMap.put("isBop", staticMaterial.getIsBop()); 
		retMap.put("description", staticMaterial.getDescription());
		return retMap;
	}
	public static Map<String, Object> changeQuestsToToolTip(UserQuests userQuests){
		Map<String, Object> retMap = new HashMap<String,Object>();
		StaticQuests staticQuests = userQuests.getQuests();
		retMap.put("questsName", staticQuests.getItemName());
		retMap.put("description", staticQuests.getDescription());
		return retMap;
	}
	public static Map<String, Object> changeQuestsToToolTip(StaticQuests staticQuests){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("questsName", staticQuests.getItemName());
		retMap.put("description", staticQuests.getDescription());
		return retMap;
	}
}
