package com.crystalcg.gamedev.buildingFunction.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.RandomFunc;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.StrengthenEquipmentCache;
import com.crystalcg.gamedev.util.cache.domain.StaticStrengthenEquipment;

/**
 * 装备强化
 * @author jinganyang
 *
 */
public class EquipStrengthenService {
	
	
	
	
	public List<Map<String, Object>> getUserHeroName(int characterId){
		UserHeroService userHeroService = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
		return userHeroService.getUserHeroName(characterId);
	}
	
	public List<UserEquipment>getEquipmentByPositonAndType(int position,int equipmentType,int characterId) throws AppException{
		if(position<0){
			throw new AppException("位置数字不合法");
		}
		if(equipmentType<0||equipmentType>Const.EQUIPMENT_TYPE.size()){
			throw new AppException("类型数字不合法");
		}
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		if(position==0){
			return userItemService.getUserequipmentInBagByType(characterId, equipmentType);
		}else{
			return userItemService.getUserEquipmentOnHero(characterId, equipmentType, position);
		}
	}
	
	
	
	/**
	 * 装备强化方法，参数：用户名、装备userItemId、强化石userItemId
	 * @param charId
	 * @param userItemId
	 * @param userItemIdForMaterial
	 * @throws AppException 
	 */
	public boolean strengthen(int characterId,int id) throws AppException{
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		boolean isSuccess = false;
		UserEquipment equipment = userItemService.getUserEquipmentById(id);
		if(equipment==null){
			throw new AppException("装备不存在");
		}
		if(equipment.getCharacterId()!=characterId){
			throw new AppException("装备不存在");
		}
		if(equipment.getItemPosition()==Const.POSITION_MAIL){
			throw new AppException("背包或武将身上无此装备");
		}
		if(equipment.getStrengthLevel()==Const.MAX_LEVEL){
			throw new AppException("已强化至最高级别");
		}
		StaticStrengthenEquipment staticStrengthenEquipment = StrengthenEquipmentCache.getEquipStrengthEntityByLevel(equipment.getStrengthLevel());
		List<UserItem> userItems = userItemService.getUserItemByItemNo(staticStrengthenEquipment.getNeedMaterialNo(), characterId);
		if(userItems.isEmpty()){
			throw new AppException("强化材料不存在");
		}
		Maincity maincity = maincityService.getMaincity(characterId);
		
		if(maincity.getMoney()<staticStrengthenEquipment.getNeedMoney()){
			throw new AppException("强化所需要的铜币不足");
		}
		if(userItems.get(0).getItemAmount()==1){
			userItemService.deleteFromUserItem(userItems.get(0).getId());
		}else if(userItems.get(0).getItemAmount()>1){
			userItemService.updateUserItemAmount(userItems.get(0).getId(), userItems.get(0).getItemAmount()-1);
		}else{
			throw new AppException("强化符数量错误["+userItems.get(0).getItemAmount()+"]");
		}
		maincityService.addMoney(characterId, -staticStrengthenEquipment.getNeedMoney());//更新铜币数
		isSuccess = RandomFunc.isSuccessful(staticStrengthenEquipment.getSuccessRate());
		if(isSuccess){//成功
			equipment.setStrengthLevel(equipment.getStrengthLevel()+1);
			equipment.setStrengthenForce((int)(equipment.getEquipment().getHeroForce()*staticStrengthenEquipment.getPropertyBonus()+1));
			equipment.setStrengthenStrategy((int)(equipment.getEquipment().getStrategy()*staticStrengthenEquipment.getPropertyBonus()+1));
			equipment.setStrengthenPhysique((int)(equipment.getEquipment().getPhysique()*staticStrengthenEquipment.getPropertyBonus()+1));
			equipment.setStrengthenAgility((int)(equipment.getEquipment().getAgility()*staticStrengthenEquipment.getPropertyBonus()+1));
			userItemService.updateEquipmentForStrength(equipment);
		}else{//失败
			if(staticStrengthenEquipment.getReduceLevel()==Const.REDUCE_LEVEL&&equipment.getStrengthLevel()!=1){//在掉级阶段，掉级
				StaticStrengthenEquipment equipStrengthEntity1 = StrengthenEquipmentCache.getEquipStrengthEntityByLevel(equipment.getStrengthLevel()-2);//需要多扣一级，因为每级放的是下一级属性
				equipment.setStrengthLevel(equipment.getStrengthLevel()-1);
				equipment.setStrengthenForce((int)(equipment.getEquipment().getHeroForce()*equipStrengthEntity1.getPropertyBonus()+1));
				equipment.setStrengthenStrategy((int)(equipment.getEquipment().getStrategy()*equipStrengthEntity1.getPropertyBonus()+1));
				equipment.setStrengthenPhysique((int)(equipment.getEquipment().getPhysique()*equipStrengthEntity1.getPropertyBonus()+1));
				equipment.setStrengthenAgility((int)(equipment.getEquipment().getAgility()*equipStrengthEntity1.getPropertyBonus()+1));
				userItemService.updateEquipmentForStrength(equipment);
			}else if(staticStrengthenEquipment.getReduceLevel()==Const.REDUCE_LEVEL){
				equipment.setStrengthLevel(equipment.getStrengthLevel()-1);
				equipment.setStrengthenForce(0);
				equipment.setStrengthenStrategy(0);
				equipment.setStrengthenPhysique(0);
				equipment.setStrengthenAgility(0);
				userItemService.updateEquipmentForStrength(equipment);
			}
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.EQUIPMENT_STRENGTHEN, null, characterId);
		return isSuccess;
	}
	
	
	public Map<String,Object> getEquipmentStrengthenInfo(int characterId,int id) throws AppException{
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		UserEquipment equipment = userItemService.getUserEquipmentById(id);
		if(equipment.getItemPosition()==Const.POSITION_MAIL){
			throw new AppException("背包内或武将身上不存在该装备");
		}
		if(equipment.getCharacterId()!=characterId){
			throw new AppException("玩家身上无此装备");
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		Map<String, Object> equipmentInfo = new HashMap<String,Object>();
		if(equipment.getStrengthLevel()==Const.MAX_LEVEL){
			equipmentInfo.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(equipment));
			equipmentInfo.put("icon", equipment.getEquipment().getIcon());
			equipmentInfo.put("type", equipment.getItemType());
			equipmentInfo.put("id", equipment.getId());
			retMap.put("equipment", equipmentInfo);
			retMap.put("maxLevel", "该装备已强化至最高级别");
			return retMap;
		}
		StaticStrengthenEquipment staticStrengthenEquipment = StrengthenEquipmentCache.getEquipStrengthEntityByLevel(equipment.getStrengthLevel());
		retMap.put("strengthenInfo", staticStrengthenEquipment);
		equipmentInfo.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(equipment));
		equipmentInfo.put("icon", equipment.getEquipment().getIcon());
		equipmentInfo.put("type", equipment.getItemType());
		equipmentInfo.put("id", equipment.getId());
		retMap.put("equipment", equipmentInfo);
		return retMap;
	}

	public static void main(String[] args){
	}
	
}
