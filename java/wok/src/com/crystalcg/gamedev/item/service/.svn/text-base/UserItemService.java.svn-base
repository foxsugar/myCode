package com.crystalcg.gamedev.item.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.item.dao.UserItemDao;
import com.crystalcg.gamedev.item.domain.ItemGiftBag;
import com.crystalcg.gamedev.item.domain.UserCommonInfo;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.domain.UserQuests;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.EquipmentCache;
import com.crystalcg.gamedev.util.cache.ItemCache;
import com.crystalcg.gamedev.util.cache.MaterialCache;
import com.crystalcg.gamedev.util.cache.QuestsCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;
import com.crystalcg.gamedev.util.cache.domain.StaticEquipment;
import com.crystalcg.gamedev.util.cache.domain.StaticGiftBox;
import com.crystalcg.gamedev.util.cache.domain.StaticItem;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;
import com.crystalcg.gamedev.util.cache.domain.StaticQuests;
import com.crystalcg.gamedev.util.cache.domain.StaticSpeedItem;

public class UserItemService {

	private UserItemDao userItemDao;
	public static Map<Integer, ItemGiftBag> ITEM_GIFT_BAG_MAP = new HashMap<Integer, ItemGiftBag>();
	private static final int OPERATE_NO_CHANGE = 0;
	private static final int OPERATE_UPDATE = 1;



////////////////////////////////国库相关////////////////////////////////////
	/**
	 * 获取玩家包内所有装备数量
	 * @param characterId
	 * @return
	 */
	public int getAllUserEquipmentAmountInBag(int characterId){
		return userItemDao.getAllUserEquipmentAmountInBag(characterId, Const.POSITION_BAG);
	}
	/**
	 * 获取玩家包内所有装备
	 * @param characterId
	 * @return
	 */
	public List<UserEquipment> getAllUserEquipmentInBag(int characterId){
		return getAllUserEquipment(characterId, Const.POSITION_BAG, Const.BOTH_BIND_AND_NOT_BIND, 0, 0);
	}
	/**
	 * 获取玩家包内所有消耗品道具
	 * @param characterId
	 * @return
	 */
	public List<UserItem> getAllUserItemInBag(int characterId){
		return getAllUserItem(characterId, Const.POSITION_BAG, Const.BOTH_BIND_AND_NOT_BIND);
	}
	/**
	 * 获取玩家包内所有材料
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getAllUserMaterialInBag(int characterId){
		return getAllUserMaterial(characterId, Const.POSITION_BAG, Const.BOTH_BIND_AND_NOT_BIND);
	}
	/**
	 * 获取玩家包内所有任务道具
	 * @param characterId
	 * @return
	 */
	public List<UserQuests> getAllUserQuestsInBag(int characterId){
		return getAllUserQuests(characterId, Const.POSITION_BAG);
	}
	
	/**
	 * 获取背包（国库）剩余容量
	 * @param characterId
	 * @return
	 */
	public int getTreasuryRemain(int characterId){
		return getArticleAmountLimit(characterId)-getArticleAmount(characterId);
	}
	
	public int getArticleAmountLimit(int characterId){
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.TREASURY_BUILDIG_NO_PREFIX);
		if(list.isEmpty()){
			return Const.PACKGE_CAPACITY;
		}
 		StaticBuilding buildingEntity = BuildingCache.getBuildingEntityByNo(list.get(0).getBuildingNo());
		return (int)buildingEntity.getFunctionvalue1()+Const.PACKGE_CAPACITY;
	}
	public int getArticleAmount(int characterId){
		return userItemDao.getArticleAmount(characterId);
	}


	/**
	 * 丢弃道具
	 * @param id
	 * @param characterId
	 * @param itemType
	 * @throws AppException
	 */
	public void deleteItemInBag(int id, int characterId, int itemType) throws AppException{
		switch (itemType) {
		case Const.TYPE_EQUIPMENT:
			UserEquipment userEquipment = getUserEquipmentById(id);
			if(userEquipment==null){
				throw new AppException("要删除的装备不存在");
			}
			if(characterId != userEquipment.getCharacterId()||userEquipment.getItemPosition()!=Const.POSITION_BAG){
				throw new AppException("要删除的装备不存在");
			}
			if(userEquipment.getEquipment().getDropable()==Const.CAN_NOT_DROP){
				throw new AppException("道具不可丢弃");
			}
			deleteFromUserEquipment(id);
			break;
		case Const.TYPE_ITEM:
			UserItem userItem = getUserItemById(id);
			if(userItem==null){
				throw new AppException("要删除的消耗品道具不存在");
			}
			if(userItem.getCharacterId()!=characterId||userItem.getItemPosition()!=Const.POSITION_BAG){
				throw new AppException("要删除的消耗品道具不存在");
			}
			if(userItem.getItem().getDropable()==Const.CAN_NOT_DROP){
				throw new AppException("道具不可丢弃");
			}
			deleteFromUserItem(id);
			break;
		case Const.TYPE_MATERIAL:
			UserMaterial userMaterial = getUserMaterialById(id);
			if(userMaterial.getCharacterId()!=characterId){
				throw new AppException("要删除的材料不存在");
			}
			if(userMaterial.getMaterial().getDropable()==Const.CAN_NOT_DROP){
				throw new AppException("道具不可丢弃");
			}
			deleteFromUserItem(id);
			break;
		case Const.TYPE_QUESTS:
			UserQuests userQuests = getUserQuestsById(id);
			if(userQuests.getCharacterId()!=characterId){
				throw new AppException("要删除的材料不存在");
			}
			if(userQuests.getQuests().getDropable()==Const.CAN_NOT_DROP){
				throw new AppException("道具不可丢弃");
			}
			deleteFromUserItem(id);
			break;

		default:
			throw new AppException("要删除的道具类型错误");
		}
	}
	/**
	 * 出售道具
	 * @param id
	 * @param itemType
	 * @param characterId
	 * @throws AppException
	 */
	public void sellItem(int id, int itemType, int characterId) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		switch (itemType) {
		case Const.TYPE_EQUIPMENT:
			UserEquipment userEquipment = getUserEquipmentById(id);
			//验证操作是否合法
			if(userEquipment==null){
				throw new AppException("要删除的装备不存在");
			}
			if(characterId != userEquipment.getCharacterId()||userEquipment.getItemPosition()!=Const.POSITION_BAG){
				throw new AppException("要删除的装备不存在");
			}
			if(userEquipment.getEquipment().getSellable()==Const.CAN_NOT_SELL){
				throw new AppException("装备不可出售");
			}else{
				//获取资源信息
				Maincity maincity = maincityService.getMaincity(characterId);
				//判断上限
				long money = userEquipment.getEquipment().getPrice();
				long moneyLimit = maincity.getMoneyLimit();
				if(money>moneyLimit){
					money = moneyLimit;
				}
				maincityService.addMoney(characterId, money);
				deleteFromUserEquipment(id);
			}
			
			break;
		case Const.TYPE_ITEM:
			UserItem userItem = getUserItemById(id);
			if(userItem==null){
				throw new AppException("要删除的消耗品道具不存在");
			}
			if(userItem.getCharacterId()!=characterId||userItem.getItemPosition()!=Const.POSITION_BAG){
				throw new AppException("要删除的消耗品道具不存在");
			}
			if(userItem.getItem().getSellable()==Const.CAN_NOT_SELL){
				throw new AppException("道具不可出售");
			}else{
				//获取资源信息
				Maincity maincity = maincityService.getMaincity(characterId);
				//判断上限
				long money = userItem.getItem().getPrice();
				long moneyLimit = maincity.getMoneyLimit();
				if(money>moneyLimit){
					money = moneyLimit;
				}
				maincityService.addMoney(characterId, money);
				deleteFromUserItem(id);
				break;
			}
		case Const.TYPE_MATERIAL:
			UserMaterial userMaterial = getUserMaterialById(id);
			if(userMaterial==null){
				throw new AppException("要删除的材料不存在");
			}
			if(userMaterial.getCharacterId()!=characterId||userMaterial.getItemPosition()!=Const.POSITION_BAG){
				throw new AppException("要删除的材料不存在");
			}
			if(userMaterial.getMaterial().getSellable()==Const.CAN_NOT_SELL){
				throw new AppException("材料不可出售");
			}else{
				//获取资源信息
				Maincity maincity = maincityService.getMaincity(characterId);
				//判断上限
				long money = userMaterial.getMaterial().getPrice();
				long moneyLimit = maincity.getMoneyLimit();
				if(money>moneyLimit){
					money = moneyLimit;
				}
				maincityService.addMoney(characterId, money);
				deleteFromUserItem(id);
				break;
			}
		case Const.TYPE_QUESTS:
			throw new AppException("任务道具不可出售");

		default:
			throw new AppException("要删除的道具类型错误");
		}
	}
	
	public void tidyBag(int characterId){
		List<UserItem> userItems = getAllUserItemInBag(characterId);
		List<UserMaterial> userMaterials = getAllUserMaterialInBag(characterId);
		Map<String, Map<String, Integer>> tempMap;
		List<Integer> deleteList;
		List<Map<String, Integer>> updateList;
		if(!userItems.isEmpty()){
			tempMap = new HashMap<String, Map<String,Integer>>();
			deleteList = new ArrayList<Integer>();
			updateList = new ArrayList<Map<String,Integer>>();
			for(UserItem i:userItems){
				writeMapAndListForUserItem(tempMap, deleteList, updateList, i);
			}
			operateMapAndList(tempMap, deleteList, updateList);
		}
		if(!userMaterials.isEmpty()){
			tempMap = new HashMap<String, Map<String,Integer>>();
			deleteList = new ArrayList<Integer>();
			updateList = new ArrayList<Map<String,Integer>>();
			for(UserMaterial i:userMaterials){
				writeMapAndListForUserMaterial(tempMap, deleteList, updateList, i);
			}
			operateMapAndList(tempMap, deleteList, updateList);
		}
	}
	private void writeMapAndListForUserItem(Map<String, Map<String, Integer>> map, List<Integer> deleteList, List<Map<String, Integer>> updateList, UserItem i){
		String key = i.getItemNo()+"_"+i.getIsBound();
		if(map.get(key)==null){
			if(i.getItemAmount()==i.getItem().getStackLimit()){
				return;
			}
			Map<String, Integer> temp = new HashMap<String, Integer>();
			temp.put("id", i.getId());
			temp.put("amount", i.getItemAmount());
			temp.put("operate", OPERATE_NO_CHANGE);
			map.put(key, temp);
		}else{
			int itemAmount = map.get(key).get("amount");
			if(itemAmount+i.getItemAmount()>i.getItem().getStackLimit()){
				map.get(key).put("amount", i.getItem().getStackLimit());
				updateList.add(map.get(key));
				Map<String, Integer> temp = new HashMap<String, Integer>();
				temp.put("id", i.getId());
				temp.put("amount", itemAmount+i.getItemAmount()-i.getItem().getStackLimit());
				temp.put("operate", OPERATE_UPDATE);
				map.put(key, temp);
			}else{
				map.get(key).put("amount", itemAmount+i.getItemAmount());
				map.get(key).put("operate", OPERATE_UPDATE);
				deleteList.add(i.getId());
			}
		}
	}
	private void operateMapAndList(Map<String, Map<String, Integer>> tempMap, List<Integer> deleteList, List<Map<String, Integer>> updateList){
		for(int i :deleteList){
			deleteFromUserItem(i);
		}
		for(Map<String, Integer> i:updateList){
			updateUserItemAmount(i.get("id"), i.get("amount"));
		}
		Iterator<Map<String, Integer>> it = tempMap.values().iterator();
		while (it.hasNext()) {
			Map<String, Integer> map = it.next();
			if(map.get("operate")==OPERATE_UPDATE){
				updateUserItemAmount(map.get("id"), map.get("amount"));
			}else{
				continue;
			}
		}
	}
	private void writeMapAndListForUserMaterial(Map<String, Map<String, Integer>> map, List<Integer> deleteList, List<Map<String, Integer>> updateList, UserMaterial i){
		if(i.getItemAmount()==i.getMaterial().getStackLimit()){
			return;
		}
		String key = i.getItemNo()+"_"+i.getIsBound();
		if(map.get(key)==null){
			Map<String, Integer> temp = new HashMap<String, Integer>();
			temp.put("id", i.getId());
			temp.put("amount", i.getItemAmount());
			temp.put("operate", OPERATE_NO_CHANGE);
			map.put(key, temp);
		}else{
			int itemAmount = map.get(key).get("amount");
			if(itemAmount+i.getItemAmount()>i.getMaterial().getStackLimit()){
				map.get(key).put("amount", i.getMaterial().getStackLimit());
				updateList.add(map.get(key));
				Map<String, Integer> temp = new HashMap<String, Integer>();
				temp.put("id", i.getId());
				temp.put("amount", itemAmount+i.getItemAmount()-i.getMaterial().getStackLimit());
				temp.put("operate", OPERATE_UPDATE);
				map.put(key, temp);
			}else{
				map.get(key).put("amount", itemAmount+i.getItemAmount());
				map.get(key).put("operate", OPERATE_UPDATE);
				deleteList.add(i.getId());
			}
		}
	}
	
	
	
	
	
	
	
	
	
	/********************************** 添加道具 *****************************************/
	
//	/**
//	 * @param characterId
//	 * @param itemId
//	 * @param itemType
//	 * @param isBound 是否绑定，0不绑定，1绑定，3绑定和不绑定，即忽略此参数，按静态表中拾取绑定属性判断,Const中有常量
//	 * @return
//	 * @throws AppException
//	 */
//	public List<Integer> addItem2character(int characterId, int itemId,int itemType, int isBound)throws AppException{
//		return addItem2character(characterId, itemId, itemType, Const.ITEM_AMOUNT_DEFAULT, Const.POSITION_BAG, isBound);
//	}
	/**
	 * 添加物品方法
	 * @param characterId 角色Id
	 * @param itemNo 物品编号
	 * @param itemType 物品类型
	 * @param isBound 是否绑定 （1. Const.BOTH_BIND_AND_NOT_BIND 忽略绑定状态，2. Const.IS_BIND_STATE 绑定，3. Const.IS_NOT_BIND_STATE 不绑定）一般都使用1.
	 * @return
	 * @throws AppException
	 */
	public List<Integer> addItem2character(int characterId, String itemNo,int itemType, int isBound)throws AppException{
		return addItem2character(characterId, itemNo, itemType, Const.ITEM_AMOUNT_DEFAULT, Const.POSITION_BAG, isBound);
	}
	
	
	/**添加物品方法重载
	 * @param itemNo
	 * @param itemType
	 * @param itemAmount
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	public List<Integer> addItem2character(String itemNo,
			int itemType,int itemAmount,int characterId) throws AppException {
		return addItem2character(characterId, itemNo, itemType, itemAmount, Const.POSITION_BAG, Const.BOTH_BIND_AND_NOT_BIND);
	}
	
	
	
	
	
	/**
	 * 给玩家角色添加道具,通过itemId添加
	 * @param characterId
	 * @param itemId
	 * @param itemType
	 * @param itemAmount
	 * @param itemPosition
	 * @param isBound//是否绑定，0不绑定，1绑定，3绑定和不绑定，即忽略此参数，按静态表中拾取绑定属性判断,Const中有常量
	 * @return
	 * @throws AppException
	 */
	public List<Integer> addItem2character(int characterId, String itemNo,
			int itemType, int itemAmount, int itemPosition, int isBound) throws AppException {
		switch (itemType) {
		case Const.TYPE_EQUIPMENT:
			StaticEquipment equipment = EquipmentCache.getEquipmentByNo(itemNo);
			if (equipment == null) {
				throw new AppException("不存在此Id的装备");
			} else {
				UserEquipment userEquipment = new UserEquipment();
				userEquipment.setCharacterId(characterId);
				userEquipment.setItemNo(itemNo);
				userEquipment.setItemType(itemType);
				userEquipment.setItemPosition(itemPosition);
				if(isBound==Const.BOTH_BIND_AND_NOT_BIND){
					userEquipment.setIsBound(equipment.getIsBop());
				}else{
					userEquipment.setIsBound(isBound);
				}
				userEquipment.setEquipmentType(equipment.getEquipmentType());
				return addEquipment(userEquipment, itemAmount);// 向数据库添加装备,返回数据Id的LIST
			}
		case Const.TYPE_ITEM:
			StaticItem item = ItemCache.getItemByNo(itemNo);
			if (item == null) {
				throw new AppException("不存在此Id的道具");
			} else {
				UserItem userItem = new UserItem();
				userItem.setCharacterId(characterId);
				userItem.setItemNo(itemNo);
				userItem.setItemType(itemType);
				userItem.setItemPosition(itemPosition);
				if(isBound==Const.BOTH_BIND_AND_NOT_BIND){
					userItem.setIsBound(item.getIsBop());
				}else{
					userItem.setIsBound(isBound);
				}
				userItem.setItemSubtype(item.getItemSubtype());
				return addItem(userItem, itemAmount);
			}
		case Const.TYPE_MATERIAL:
			StaticMaterial material = MaterialCache.getMaterialByNo(itemNo);
			if (material == null) {
				throw new AppException("不存在此Id的道具");
			} else {
				UserMaterial userMaterial = new UserMaterial();
				userMaterial.setCharacterId(characterId);
				userMaterial.setItemNo(itemNo);
				userMaterial.setItemType(itemType);
				userMaterial.setItemPosition(itemPosition);
				if(isBound==Const.BOTH_BIND_AND_NOT_BIND){
					userMaterial.setIsBound(material.getIsBop());
				}else{
					userMaterial.setIsBound(isBound);
				}
				userMaterial.setItemSubtype(material.getMaterialType());
				return addMaterial(userMaterial, itemAmount);
			}
		case Const.TYPE_QUESTS:
			StaticQuests quests = QuestsCache.getQuestsByNo(itemNo);
			if (quests == null) {
				throw new AppException("不存在此Id的道具");
			} else {
				UserQuests userQuests = new UserQuests();
				userQuests.setCharacterId(characterId);
				userQuests.setItemNo(itemNo);
				userQuests.setItemType(itemType);
				userQuests.setItemPosition(itemPosition);
				userQuests.setIsBound(Const.IS_BIND_STATE);
				return addQuests(userQuests, itemAmount);
			}

		default:
			throw new AppException("无法识别的装备类型");
		}
	}
//	/**
//	 * 给玩家角色添加道具,通过itemNo添加
//	 * @param characterId
//	 * @param itemNo
//	 * @param itemType
//	 * @param itemAmount
//	 * @param itemPosition
//	 * @param isBound//是否绑定，0不绑定，1绑定，3绑定和不绑定，即忽略此参数，按静态表中拾取绑定属性判断,Const中有常量
//	 * @return
//	 * @throws AppException
//	 */
//	public List<Integer> addItem2character(int characterId, String itemNo,
//			int itemType, int itemAmount, int itemPosition, int isBound) throws AppException {
//		switch (itemType) {
//		case Const.TYPE_EQUIPMENT:
//			Equipment equipment = getEquipmentByNo(itemNo);
//			if (equipment == null) {
//				throw new AppException("不存在此Id的装备");
//			} else {
//				UserEquipment userEquipment = new UserEquipment();
//				userEquipment.setCharacterId(characterId);
//				userEquipment.setItemId(equipment.getId());
//				userEquipment.setItemType(itemType);
//				userEquipment.setItemPosition(itemPosition);
//				if(isBound==Const.BOTH_BIND_AND_NOT_BIND){
//					userEquipment.setIsBound(equipment.getIsBop());
//				}else{
//					userEquipment.setIsBound(isBound);
//				}
//				userEquipment.setEquipment(equipment);
//				return addEquipment(userEquipment, itemAmount);// 向数据库添加装备,返回数据Id的LIST
//			}
//		case Const.TYPE_ITEM:
//			Item item = getItemByNo(itemNo);
//			if (item == null) {
//				throw new AppException("不存在此Id的道具");
//			}else if(item.getStackable()==Const.CAN_STACK&&item.getStackLimit()==0){
//				throw new AppException("道具静态信息堆叠错误");
//			}else {
//				UserItem userItem = new UserItem();
//				userItem.setCharacterId(characterId);
//				userItem.setItemId(item.getId());
//				userItem.setItemType(itemType);
//				userItem.setItemPosition(itemPosition);
//				if(isBound==Const.BOTH_BIND_AND_NOT_BIND){
//					userItem.setIsBound(item.getIsBop());
//				}else{
//					userItem.setIsBound(isBound);
//				}
//				userItem.setItem(item);
//				return addItem(userItem, itemAmount);
//			}
//		case Const.TYPE_MATERIAL:
//			Material material = getMaterialByNo(itemNo);
//			if (material == null) {
//				throw new AppException("不存在此Id的道具");
//			}else if(material.getStackable()==Const.CAN_STACK&&material.getStackLimit()==0){
//				throw new AppException("材料静态信息堆叠错误");
//			} else {
//				UserMaterial userMaterial = new UserMaterial();
//				userMaterial.setCharacterId(characterId);
//				userMaterial.setItemId(material.getId());
//				userMaterial.setItemType(itemType);
//				userMaterial.setItemPosition(itemPosition);
//				if(isBound==Const.BOTH_BIND_AND_NOT_BIND){
//					userMaterial.setIsBound(material.getIsBop());
//				}else{
//					userMaterial.setIsBound(isBound);
//				}
//				userMaterial.setMaterial(material);
//				return addMaterial(userMaterial, itemAmount);
//			}
//		case Const.TYPE_QUESTS:
//			Quests quests = getQuestsByNo(itemNo);
//			if (quests == null) {
//				throw new AppException("不存在此Id的道具");
//			}else if(quests.getStackable()==Const.CAN_STACK&&quests.getStackLimit()==0){
//				throw new AppException("任务道具静态信息堆叠错误");
//			} else {
//				UserQuests userQuests = new UserQuests();
//				userQuests.setCharacterId(characterId);
//				userQuests.setItemId(quests.getId());
//				userQuests.setItemType(itemType);
//				userQuests.setItemPosition(itemPosition);
//				userQuests.setIsBound(Const.IS_BIND_STATE);
//				userQuests.setQuests(quests);
//				return addQuests(userQuests, itemAmount);
//			}
//			
//		default:
//			throw new AppException("无法识别的装备类型");
//		}
//	}

	/**
	 * 添加装备
	 * 
	 * @param userEquipment
	 * @param itemAmount
	 * @return
	 */
	private List<Integer> addEquipment(UserEquipment userEquipment,
			int itemAmount) {
		// 需要添加判断背包是否已满的代码
		userEquipment.setItemAmount(Const.EQUIPMENT_DEFAULT_AMOUNT);
		List<Integer> retList = new ArrayList<Integer>();
		for (int i = 0; i < itemAmount; i++) {
			retList.add(addUserEquipmentToCharacter(userEquipment));
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.EQUIPMENT_COLLECT, userEquipment.getItemNo(), userEquipment.getCharacterId());
		return retList;
	}

	/**
	 * 添加消耗道具
	 * 
	 * @param userItem
	 * @param itemAmount
	 * @return
	 */
	private List<Integer> addItem(UserItem userItem, int itemAmount) {
		List<Integer> retList = new ArrayList<Integer>();
		//道具不可堆叠
		if(userItem.getItem().getStackable()!=Const.CAN_STACK){
			for(int i = 0;i<itemAmount;i++){//不可堆叠，每次添加数量为1
				retList.add(addUserItemToCharacter(userItem,1));
			}
			return retList;
		}
		// 需要添加判断背包是否已满的代码
		List<UserItem> userItems = getUserItemByItemNo(userItem.getItemNo(),
				userItem.getCharacterId(),userItem.getIsBound());//查找包内是否有该道具
		for (int i = 0; i < userItems.size(); i++) {// 如果已有的道具已经达到绑定上限，则从list中删除，因为不需要参与逻辑
			if (userItems.get(i).getItemAmount() == userItem.getItem()
					.getStackLimit()) {
				userItems.remove(i);
				i--;
			}
		}
		if (userItems.isEmpty()) {// 玩家身上没有此道具
			while (true) {
				if (itemAmount - userItem.getItem().getStackLimit() > 0) {
					retList.add(addUserItemToCharacter(userItem,userItem.getItem().getStackLimit()));
				} else {
					retList.add(addUserItemToCharacter(userItem, itemAmount));
					itemAmount=0;
					break;
				}
				itemAmount -= userItem.getItem().getStackLimit();// 总数减去已添加的数量
			}
		} else {// 玩家身上有此道具
			List<UserItem> needUpdateUserItem = new ArrayList<UserItem>();// 需要更新的道具list
			for (UserItem i : userItems) {
				int tempAmount = i.getItemAmount() + itemAmount
						- userItem.getItem().getStackLimit();// 补充拥有道具后剩余的数量
				if (tempAmount > 0) {
					itemAmount = tempAmount;
					i.setItemAmount(userItem.getItem().getStackLimit());
					needUpdateUserItem.add(i);
				} else {
					i.setItemAmount(i.getItemAmount() + itemAmount);
					needUpdateUserItem.add(i);
					itemAmount=0;
					break;
				}
			}
			for (UserItem i : needUpdateUserItem) {// 更新身上未满的道具
				updateUserItemAmount(i.getId(), i.getItemAmount());
			}
			if(itemAmount==0){
				return retList;
			}
			while (true) {// 身上有的道具已经加满，重新插入道具
				if (itemAmount - userItem.getItem().getStackLimit() > 0) {
					retList.add(addUserItemToCharacter(userItem, userItem.getItem().getStackLimit()));
				} else {
					retList.add(addUserItemToCharacter(userItem, itemAmount));
					break;
				}
				itemAmount -= userItem.getItem().getStackLimit();// 总数减去已添加的数量
			}
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.ITEM_COLLECT, userItem.getItemNo(), userItem.getCharacterId());
		return retList;
	}

	private List<Integer> addMaterial(UserMaterial userMaterial, int itemAmount) {
		List<Integer> retList = new ArrayList<Integer>();
		//道具不可堆叠
		if(userMaterial.getMaterial().getStackable()!=Const.CAN_STACK){
			for(int i = 0;i<itemAmount;i++){//不可堆叠，每次添加数量为1
				retList.add(addUserItemToCharacter(userMaterial, 1));
			}
			return retList;
		}
		// 需要添加判断背包是否已满的代码
		List<UserMaterial> userMaterials = getUserMaterialByItemNo(
				userMaterial.getItemNo(), userMaterial.getCharacterId(),userMaterial.getIsBound());
		for (int i = 0; i < userMaterials.size(); i++) {// 如果已有的道具已经达到绑定上限，则从list中删除，因为不需要参与逻辑
			if (userMaterials.get(i).getItemAmount() == userMaterial
					.getMaterial().getStackLimit()) {
				userMaterials.remove(i);
				i--;
			}
		}
		if (userMaterials.isEmpty()) {// 玩家身上没有此道具
			while (true) {
				if (itemAmount - userMaterial.getMaterial().getStackLimit() > 0) {
					retList.add(addUserItemToCharacter(userMaterial, userMaterial
									.getMaterial().getStackLimit()));
				} else {
					retList.add(addUserItemToCharacter(
							userMaterial, itemAmount));
					itemAmount=0;
					break;
				}
				itemAmount -= userMaterial.getMaterial().getStackLimit();// 总数减去已添加的数量
			}
		} else {// 玩家身上有此道具
			List<UserMaterial> needUpdateUserMaterial = new ArrayList<UserMaterial>();// 需要更新的道具list
			for (UserMaterial i : userMaterials) {
				int tempAmount = i.getItemAmount() + itemAmount
						- userMaterial.getMaterial().getStackLimit();// 补充拥有道具后剩余的数量
				if (tempAmount > 0) {
					itemAmount = tempAmount;
					i.setItemAmount(userMaterial.getMaterial().getStackLimit());
					needUpdateUserMaterial.add(i);
				} else {
					i.setItemAmount(i.getItemAmount() + itemAmount);
					needUpdateUserMaterial.add(i);
					itemAmount=0;
					break;
				}
			}
			for (UserMaterial i : needUpdateUserMaterial) {// 更新身上未满的道具
				updateUserItemAmount(i.getId(), i.getItemAmount());
			}
			if(itemAmount==0){
				return retList;
			}
			while (true) {// 身上有的道具已经加满，重新插入道具
				if (itemAmount - userMaterial.getMaterial().getStackLimit() > 0) {
					retList.add(addUserItemToCharacter(userMaterial, userMaterial
									.getMaterial().getStackLimit()));
				} else {
					retList.add(addUserItemToCharacter(
							userMaterial, itemAmount));
					break;
				}
				itemAmount -= userMaterial.getMaterial().getStackLimit();// 总数减去已添加的数量
			}
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.MATERIAL_COLLECT, userMaterial.getItemNo(), userMaterial.getCharacterId());
		return retList;
	}

	private List<Integer> addQuests(UserQuests userQuests, int itemAmount) {
		List<Integer> retList = new ArrayList<Integer>();
		//道具不可堆叠
				if(userQuests.getQuests().getStackable()!=Const.CAN_STACK){
					for(int i = 0;i<itemAmount;i++){//不可堆叠，每次添加数量为1
						retList.add(addUserItemToCharacter(userQuests, 1));
					}
					return retList;
				}
		// 需要添加判断背包是否已满的代码
		List<UserQuests> userQuestsList = getUserQuestsByItemNo(
				userQuests.getItemNo(), userQuests.getCharacterId());
		for (int i = 0; i < userQuestsList.size(); i++) {// 如果已有的道具已经达到绑定上限，则从list中删除，因为不需要参与逻辑
			if (userQuestsList.get(i).getItemAmount() == userQuests.getQuests()
					.getStackLimit()) {
				userQuestsList.remove(i);
				i--;
			}
		}
		if (userQuestsList.isEmpty()) {// 玩家身上没有此道具
			while (true) {
				if (itemAmount - userQuests.getQuests().getStackLimit() > 0) {
					retList.add(addUserItemToCharacter(
							userQuests,
							userQuests.getQuests().getStackLimit()));
				} else {
					retList.add(addUserItemToCharacter(
							userQuests,itemAmount));
					itemAmount=0;
					break;
				}
				itemAmount -= userQuests.getQuests().getStackLimit();// 总数减去已添加的数量
			}
		} else {// 玩家身上有此道具
			List<UserQuests> needUpdateUserQuests = new ArrayList<UserQuests>();// 需要更新的道具list
			for (UserQuests i : userQuestsList) {
				int tempAmount = i.getItemAmount() + itemAmount
						- userQuests.getQuests().getStackLimit();// 补充拥有道具后剩余的数量
				if (tempAmount > 0) {
					itemAmount = tempAmount;
					i.setItemAmount(userQuests.getQuests().getStackLimit());
					needUpdateUserQuests.add(i);
				} else {
					i.setItemAmount(i.getItemAmount() + itemAmount);
					needUpdateUserQuests.add(i);
					break;
				}
			}
			for (UserQuests i : needUpdateUserQuests) {// 更新身上未满的道具
				updateUserItemAmount(i.getId(), i.getItemAmount());
			}
			while (true) {// 身上有的道具已经加满，重新插入道具
				if (itemAmount - userQuests.getQuests().getStackLimit() > 0) {
					retList.add(addUserItemToCharacter(
							userQuests,userQuests.getQuests().getStackLimit()));
				} else {
					retList.add(addUserItemToCharacter(
							userQuests,itemAmount));
					break;
				}
				itemAmount -= userQuests.getQuests().getStackLimit();// 总数减去已添加的数量
			}
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.QUESTS_COLLECT, userQuests.getItemNo(), userQuests.getCharacterId());
		return retList;
	}
	
	
	
	

	
	
	
	

	/**
	 * 给玩家添加所有非装备类型的道具
	 * 
	 * @param characterId
	 * @param itemId
	 * @param itemType
	 * @param itemAmount
	 * @param isBound
	 * @param itemPosition
	 * @return
	 */
	private int addUserItemToCharacter(UserCommonInfo article, int amount) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", article.getCharacterId());
		param.put("itemNo", article.getItemNo());
		param.put("itemType", article.getItemType());
		param.put("itemAmount", amount);
		param.put("isBound", article.getIsBound());
		param.put("itemPosition", article.getItemPosition());
		param.put("itemSubtype", article.getItemSubtype());
		userItemDao.addUserItemToCharacter(param);
		return ((Long) param.get("id")).intValue();
	}

	/**
	 * 给玩家添加装备类型的道具
	 * @param userEquipment
	 * @return
	 */
	private int addUserEquipmentToCharacter(UserEquipment userEquipment) {
		userItemDao.addUserEquipmentToCharacter(userEquipment);
		return userEquipment.getId();
	}

	
	/**
	 * 获取玩家包里道具信息,忽略绑定状态
	 * @param itemNo
	 * @param characterId
	 * @return
	 */
	public List<UserEquipment> getUserEquipmentByItemNo(String itemNo, int characterId) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("itemNo", itemNo);
		param.put("characterId", characterId);
		param.put("isBound", Const.BOTH_BIND_AND_NOT_BIND);
		return userItemDao.getUserEquipmentByItemNo(param);
	}
	/**
	 * 获取玩家包里道具信息,忽略绑定状态
	 * @param itemNo
	 * @param characterId
	 * @return
	 */
	public List<UserItem> getUserItemByItemNo(String itemNo, int characterId) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("itemNo", itemNo);
		param.put("characterId", characterId);
		param.put("itemType", Const.TYPE_ITEM);
		param.put("isBound", Const.BOTH_BIND_AND_NOT_BIND);
		return userItemDao.getUserItemByItemNo(param);
	}
	/**
	 * 获取玩家包里道具信息
	 * @param itemNo
	 * @param characterId
	 * @return
	 */
	public List<UserItem> getUserItemByItemNo(String itemNo, int characterId, int isBound) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("itemNo", itemNo);
		param.put("characterId", characterId);
		param.put("itemType", Const.TYPE_ITEM);
		param.put("isBound", isBound);
		return userItemDao.getUserItemByItemNo(param);
	}

	/**
	 * 获取玩家包里的材料信息
	 * 
	 * @param itemId
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getUserMaterialByItemNo(String itemNo,
			int characterId, int isBound) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("itemNo", itemNo);
		param.put("characterId", characterId);
		param.put("itemType", Const.TYPE_MATERIAL);
		param.put("isBound", isBound);
		return userItemDao.getUserMaterialByItemNo(param);
	}
	/**
	 * 获取玩家包里的材料信息,忽略绑定状态
	 * 
	 * @param itemId
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getUserMaterialByItemNo(String itemNo,
			int characterId) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("itemNo", itemNo);
		param.put("characterId", characterId);
		param.put("itemType", Const.TYPE_MATERIAL);
		param.put("isBound", Const.BOTH_BIND_AND_NOT_BIND);
		return userItemDao.getUserMaterialByItemNo(param);
	}

	/**
	 * 获取玩家包里的任务道具信息
	 * 
	 * @param itemId
	 * @param characterId
	 * @return
	 */
	public List<UserQuests> getUserQuestsByItemNo(String itemNo, int characterId) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("itemNo", itemNo);
		param.put("characterId", characterId);
		param.put("itemType", Const.TYPE_QUESTS);
		return userItemDao.getUserQuestsByItemNo(param);
	}

	/**
	 * 更新所有非装备类型的道具的数量
	 * 
	 * @param id
	 * @param itemAmount
	 */
	public void updateUserItemAmount(int id, int itemAmount) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("id", id);
		param.put("itemAmount", itemAmount);
		userItemDao.updateUserItemAmount(param);
	}
	/**
	 * 删除user_item表中的道具，即删除玩家非装备类型的道具
	 * @param id
	 */
	public void deleteFromUserItem(int id){
		userItemDao.deleteFromUserItem(id);
	}
	/**
	 * 删除user_equipment表中的道具，即删除玩家装备类型的道具
	 * @param id
	 */
	public void deleteFromUserEquipment(int id){
		userItemDao.deleteFromUserEquipment(id);
	}
	/**
	 * 通过Id获得具体消耗品道具
	 * @param id
	 * @return
	 */
	public UserItem getUserItemById(int id){
		return userItemDao.getUserItemById(id);
	}
	/**
	 * 通过Id获得具体装备
	 * @param id
	 * @return
	 */
	public UserEquipment getUserEquipmentById(int id){
		return userItemDao.getUserEquipmentById(id);
	}
	/**
	 * 通过Id获得具体材料
	 * @param id
	 * @return
	 */
	public UserMaterial getUserMaterialById(int id){
		return userItemDao.getUserMaterialById(id);
	}
	/**
	 * 通过Id获得具体任务道具
	 * @param id
	 * @return
	 */
	public UserQuests getUserQuestsById(int id){
		return userItemDao.getUserQuestsById(id);
	}
	
	/**
	 * 获得用户装备
	 * @param characterId 角色Id
	 * @param itemPosition 道具位置，Const中有对应常量
	 * @param isBound 绑定状态，Const中有对应常量
	 * @param equipmentType 装备类型，全部为0
	 * @param heroUseId 所属英雄Id，如不需要此条件，则传0
	 * @return
	 */
	public List<UserEquipment> getAllUserEquipment(int characterId, int itemPosition, int isBound, int equipmentType, int heroUseId){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("itemPosition", itemPosition);
		param.put("isBound", isBound);
		param.put("heroUseId", heroUseId);
		param.put("equipmentType", equipmentType);
		return userItemDao.getAllUserEquipment(param);
	}
	/**
	 * 获取玩家武将身上的装备
	 * @param characterId
	 * @param heroUseId
	 * @return
	 */
	public List<UserEquipment> getUserEquipmentOnHero(int characterId, int equipmentType, int heroUseId){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("itemPosition", Const.POSITION_HERO);
		param.put("isBound", Const.BOTH_BIND_AND_NOT_BIND);
		param.put("equipmentType", equipmentType);
		param.put("heroUseId", heroUseId);
		return userItemDao.getAllUserEquipment(param);
	}
	/**
	 * 按类别获取玩家背包里的装备
	 * @param characterId
	 * @param equipmentType
	 * @return
	 */
	public List<UserEquipment> getUserequipmentInBagByType(int characterId, int equipmentType){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("itemPosition", Const.POSITION_BAG);
		param.put("isBound", Const.BOTH_BIND_AND_NOT_BIND);
		param.put("equipmentType", equipmentType);
		param.put("heroUseId", 0);//因为找包里所以忽略此条件，0为忽略
		return userItemDao.getAllUserEquipment(param);
	}
	/**
	 * 获得角色消耗品道具
	 * @param characterId角色Id
	 * @param itemPosition道具位置，Const中有对应常量
	 * @param isBound绑定状态，Const中有对应常量
	 * @return
	 */
	public List<UserItem> getAllUserItem(int characterId, int itemPosition, int isBound){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("itemPosition", itemPosition);
		param.put("isBound", isBound);
		return userItemDao.getAllUserItem(param);
	}
	/**
	 * 获得用户材料
	 * @param characterId角色Id
	 * @param itemPosition道具位置，Const中有对应常量
	 * @param isBound绑定状态，Const中有对应常量
	 * @return
	 */
	public List<UserMaterial> getAllUserMaterial(int characterId, int itemPosition, int isBound){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("itemPosition", itemPosition);
		param.put("isBound", isBound);
		return userItemDao.getAllUserMaterial(param);
	}
	/**
	 * 获得用户任务物品
	 * @param characterId角色Id
	 * @param itemPosition道具位置，Const中有对应常量
	 * @return
	 */
	public List<UserQuests> getAllUserQuests(int characterId, int itemPosition){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("itemPosition", itemPosition);
		return userItemDao.getAllUserQuests(param);
	}
	/**
	 * 向玩家插入拍卖行买到的装备，用于拍卖行功能,返回用户装备表Id
	 * @param userEquipment
	 * @return
	 */
	public int insertEquipmentForAuction(UserEquipment userEquipment){
		userItemDao.insertEquipmentForAuction(userEquipment);
		return userEquipment.getId();
	}
	/**
	 * 向玩家插入拍卖行买到的非装备类道具，用于拍卖行功能,返回用户道具表Id
	 * @param userItem
	 * @return
	 */
	public int insertItemForAuction(UserItem userItem){
		userItemDao.insertItemForAuction(userItem);
		return userItem.getId();
	}
	/**
	 * 更新装备位置
	 * @param id
	 * @param itemPostion
	 */
	public void updateUserEquipmentPosition(int id, int itemPostion){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", id);
		param.put("itemPostion", itemPostion);
		userItemDao.updateUserEquipmentPosition(param);
	}
	/**
	 * 更新非装备物品位置
	 * @param id
	 * @param itemPostion
	 */
	public void updateUserItemPostion(int id, int itemPostion){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("id", id);
		param.put("itemPostion", itemPostion);
		userItemDao.updateUserItemPostion(param);
	}
	
	///////////////////////////用于邮件取附件////////////////////////////////
	/**
	 * 用于邮件取附件功能
	 * @param articleId
	 * @param articleType
	 * @param articlePostion
	 */
	public void updateArticlePosition(int articleId, int articleType){
		switch (articleType) {
		case Const.TYPE_EQUIPMENT:
			updateUserEquipmentPosition(articleId, Const.POSITION_BAG);
			break;
		case Const.TYPE_ITEM:
			UserItem userItem = getUserItemById(articleId);
			obtainItem(userItem);
			break;
		case Const.TYPE_MATERIAL:
			UserMaterial userMaterial = getUserMaterialById(articleId);
			obtainMaterial(userMaterial);
			break;
		case Const.TYPE_QUESTS:
			updateUserItemPostion(articleId, Const.POSITION_BAG);
			break;
		default:
			break;
		}
			
	}
	/**
	 * 获得道具，用于邮件取附件功能
	 * @param userItem
	 */
	private void obtainItem(UserItem userItem){
		// 需要添加判断背包是否已满的代码
		List<UserItem> userItems = getUserItemByItemNo(userItem.getItemNo(),
				userItem.getCharacterId(),userItem.getIsBound());//查找包内是否有该道具
		int itemAmount = userItem.getItemAmount();
		for (int i = 0; i < userItems.size(); i++) {// 如果已有的道具已经达到绑定上限，则从list中删除，因为不需要参与逻辑
			if (userItems.get(i).getItemAmount() == userItem.getItem()
					.getStackLimit()) {
				userItems.remove(i);
				i--;
			}
		}
		if (userItems.isEmpty()) {// 玩家身上没有此道具
			updateUserItemPostion(userItem.getId(), Const.POSITION_BAG);
		} else {// 玩家身上有此道具
			List<UserItem> needUpdateUserItem = new ArrayList<UserItem>();// 需要更新的道具list
			for (UserItem i : userItems) {
				int tempAmount = i.getItemAmount() + itemAmount
						- userItem.getItem().getStackLimit();// 补充拥有道具后剩余的数量
				if (tempAmount > 0) {
					itemAmount = tempAmount;
					i.setItemAmount(userItem.getItem().getStackLimit());
					needUpdateUserItem.add(i);
				} else {
					i.setItemAmount(i.getItemAmount() + itemAmount);
					needUpdateUserItem.add(i);
					itemAmount=0;
					break;
				}
			}
			for (UserItem i : needUpdateUserItem) {// 更新身上未满的道具
				updateUserItemAmount(i.getId(), i.getItemAmount());
			}
			if(itemAmount==0){//数量为0，删除附件道具
				deleteFromUserItem(userItem.getId());
			}else{//数量还有余，更新附件数量和位置
				updateUserItemAmount(userItem.getId(), itemAmount);
				updateUserItemPostion(userItem.getId(), Const.POSITION_BAG);
			}
		}
	}
	/**
	 * 获得材料，用于邮件取附件功能
	 * @param userMaterial
	 */
	private void obtainMaterial(UserMaterial userMaterial){
		// 需要添加判断背包是否已满的代码
		List<UserMaterial> userMaterials = getUserMaterialByItemNo(userMaterial.getItemNo(),
				userMaterial.getCharacterId(),userMaterial.getIsBound());//查找包内是否有该道具
		int itemAmount = userMaterial.getItemAmount();
		for (int i = 0; i < userMaterials.size(); i++) {// 如果已有的道具已经达到绑定上限，则从list中删除，因为不需要参与逻辑
			if (userMaterials.get(i).getItemAmount() == userMaterial.getMaterial()
					.getStackLimit()) {
				userMaterials.remove(i);
				i--;
			}
		}
		if (userMaterials.isEmpty()) {// 玩家身上没有此道具
			updateUserItemPostion(userMaterial.getId(), Const.POSITION_BAG);
		} else {// 玩家身上有此道具
			List<UserMaterial> needUpdateUserItem = new ArrayList<UserMaterial>();// 需要更新的道具list
			for (UserMaterial i : userMaterials) {
				int tempAmount = i.getItemAmount() + itemAmount
						- userMaterial.getMaterial().getStackLimit();// 补充拥有道具后剩余的数量
				if (tempAmount > 0) {
					itemAmount = tempAmount;
					i.setItemAmount(userMaterial.getMaterial().getStackLimit());
					needUpdateUserItem.add(i);
				} else {
					i.setItemAmount(i.getItemAmount() + itemAmount);
					needUpdateUserItem.add(i);
					itemAmount=0;
					break;
				}
			}
			for (UserMaterial i : needUpdateUserItem) {// 更新身上未满的道具
				updateUserItemAmount(i.getId(), i.getItemAmount());
			}
			if(itemAmount==0){
				deleteFromUserItem(userMaterial.getId());//删除邮件附件道具
			}else{
				//更新附件数量和位置
				updateUserItemAmount(userMaterial.getId(), itemAmount);
				updateUserItemPostion(userMaterial.getId(), Const.POSITION_BAG);
			}
		}
	}
	/**
	 * 用于更新装备强化属性和强化等级，用于装备强化
	 * @param userEquipment
	 */
	public void updateEquipmentForStrength(UserEquipment userEquipment){
		userItemDao.updateEquipmentForStrength(userEquipment);
	}
	/**
	 * 查看包里所有的宝石，用于宝石合成和镶嵌
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getGemStoneInBag(int characterId){
		return userItemDao.getGemStoneInBag(characterId);
	}
	/**
	 * 查看包里所有的打造材料，用于材料合成
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getMaterialForProduceInBag(int characterId){
		return userItemDao.getMaterialForProduceInBag(characterId);
	}
	/**
	 * 更新装备镶空，用于宝石镶嵌
	 * @param userEquipment
	 */
	public void updateEquipmentHole(UserEquipment userEquipment){
		userItemDao.updateEquipmentHole(userEquipment);
	}
	
	/**
	 * 武将穿装备
	 * @param euipId
	 * @param heroId
	 */
	public void heroAddEquipment(int characterId,int equipId,int heroId){
		userItemDao.heroAddEquipment(characterId, equipId,Const.POSITION_HERO, heroId);
	}
	
	/**
	 * 武将卸下装备
	 * @param equipId
	 */
	public void heroRemoveEuipment(int characterId,int equipId){
		userItemDao.heroRemoveEuipment(characterId, equipId,Const.POSITION_BAG);
	}
	
	/**
	 * 武将卸下全部装备
	 * @param equipId
	 */
	public void heroRemoveAllEuipment(int characterId,int heroId){
		userItemDao.heroRemoveAllEuipment(characterId, heroId,Const.POSITION_BAG);
	}
	
	public UserItemDao getUserItemDao() {
		return userItemDao;
	}

	public void setUserItemDao(UserItemDao userItemDao) {
		this.userItemDao = userItemDao;
	}
	
	/**
	 * 分页查询用户背包内的装备
	 * @param characterId
	 * @param start
	 * @param pageSize
	 */
	public List<UserEquipment> getAllUserEquipmentByPage(int characterId, int start,int pageSize) {
		return userItemDao.getAllUserEquipmentByPage(characterId, Const.POSITION_BAG,start,pageSize);
	}
	
	
	/********************道具使用相关********************************/
	////////////////////////////
	public void useItem(int id, int characterId, int amount) throws AppException{
		UserItem userItem = getUserItemById(id);
		validateUserItem(userItem, characterId, amount);
		switch (userItem.getItem().getUseEffectType()) {
		case Const.USE_EFFECT_TYPE_NOTHING://道具没有效果
			
			break;
		case Const.USE_EFFECT_TYPE_GIFT_BOX://礼包
			useGiftBoxItem(userItem, amount);
			break;
		case Const.USE_EFFECT_TYPE_LAST_EFFECT://2=持续性效果道具            
			
			break;
		case Const.USE_EFFECT_TYPE_USER_BUFF://3=君主BUFF
			
			break;
		case Const.USE_EFFECT_TYPE_WOOD:// 4=木材 
			useWoodItem(userItem, amount);
			break;
		case Const.USE_EFFECT_TYPE_STONE://5=石料 
			useStoneItem(userItem, amount);
			break;
		case Const.USE_EFFECT_TYPE_FOOD://6=粮食
			useFoodItem(userItem, amount);
			break;
		case Const.USE_EFFECT_TYPE_IRONORE://7=铁锭
			useIronoreItem(userItem, amount);
			break;
		case Const.USE_EFFECT_TYPE_MONEY://8=铜币
			useMoneyItem(userItem, amount);
			break;
		case Const.USE_EFFECT_TYPE_PEOPLE://9=人口
			usePeopleItem(userItem, amount);
			break;
		case Const.USE_EFFECT_TYPE_MEDICINE://10=膏药
			useMedicineItem(userItem, amount);
			break;

		default:
			break;
		}
	}
	private void updateItemAfterUse(UserItem userItem, int amount){
		if(userItem.getItemAmount()==amount){
			deleteFromUserItem(userItem.getId());
		}else{
			updateUserItemAmount(userItem.getId(), userItem.getItemAmount()-amount);
		}
	}
	private void useGiftBoxItem(UserItem userItem, int amount) throws AppException{
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		UserCharacter character = characterService.getCharacterById(userItem.getCharacterId());
		List<StaticGiftBox> giftBoxs = ItemCache.getGiftBox(userItem.getItem().getSpecialSkill1());
		if(giftBoxs==null){
			throw new AppException("礼包信息错误");
		}
		if(character.getLevel()<giftBoxs.get(0).getNeedLevel()){
			throw new AppException("等级不足，无法使用");
		}
		if(getTreasuryRemain(userItem.getCharacterId())<giftBoxs.size()){
			throw new AppException("背包空间不足，使用礼包失败");
		}
		for(int i=0;i<amount;i++){//添加道具
			for(StaticGiftBox j:giftBoxs){
				addItem2character(userItem.getCharacterId(), j.getIncludeItemNo(), j.getIncludeItemType(), j.getIncludeItemAmount(), Const.POSITION_BAG, Const.IS_BIND_STATE);
			}
		}
		//删除或更新使用道具
		updateItemAfterUse(userItem, amount);
		
	}
	private void useWoodItem(UserItem userItem, int amount) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(userItem.getCharacterId());
		for(int i=0;i<amount;i++){//获得资源
			int addWood = Integer.parseInt(userItem.getItem().getSpecialSkill1());
			long updateWood = maincity.getWood()+addWood;
			if(updateWood>maincity.getWoodLimit()){
				maincity.setWood(maincity.getWoodLimit());
				break;
			}else{
				maincity.setWood(updateWood);
			}
		}
		maincityService.updateWood(userItem.getCharacterId(), maincity.getWood());
		//删除或更新使用道具
		updateItemAfterUse(userItem, amount);
	}
	private void useStoneItem(UserItem userItem, int amount) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(userItem.getCharacterId());
		for(int i=0;i<amount;i++){//获得资源
			int addStone = Integer.parseInt(userItem.getItem().getSpecialSkill1());
			long updateStone = maincity.getStone()+addStone;
			if(updateStone>maincity.getStoneLimit()){
				maincity.setStone(maincity.getStoneLimit());
				break;
			}else{
				maincity.setStone(updateStone);
			}
		}
		maincityService.updateStone(userItem.getCharacterId(), maincity.getStone());
		//删除或更新使用道具
		updateItemAfterUse(userItem, amount);
	}
	private void useFoodItem(UserItem userItem, int amount) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(userItem.getCharacterId());
		for(int i=0;i<amount;i++){//获得资源
			int addFood = Integer.parseInt(userItem.getItem().getSpecialSkill1());
			long updateFood = maincity.getFood()+addFood;
			if(updateFood>maincity.getFoodLimit()){
				maincity.setFood(maincity.getFoodLimit());
				break;
			}else{
				maincity.setFood(updateFood);
			}
		}
		maincityService.updateFood(userItem.getCharacterId(), maincity.getFood());
		//删除或更新使用道具
		updateItemAfterUse(userItem, amount);
	}
	private void useIronoreItem(UserItem userItem, int amount) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(userItem.getCharacterId());
		for(int i=0;i<amount;i++){//获得资源
			int addIronore = Integer.parseInt(userItem.getItem().getSpecialSkill1());
			long updateIronore = maincity.getIronore()+addIronore;
			if(updateIronore>maincity.getIronoreLimit()){
				maincity.setIronore(maincity.getIronoreLimit());
				break;
			}else{
				maincity.setIronore(updateIronore);
			}
		}
		maincityService.updateIronore(userItem.getCharacterId(), maincity.getIronore());
		//删除或更新使用道具
		updateItemAfterUse(userItem, amount);
	}
	private void useMoneyItem(UserItem userItem, int amount) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(userItem.getCharacterId());
		for(int i=0;i<amount;i++){//获得资源
			int addMoney = Integer.parseInt(userItem.getItem().getSpecialSkill1());
			long updateMoney = maincity.getMoney()+addMoney;
			if(updateMoney>maincity.getMoneyLimit()){
				maincity.setMoney(maincity.getMoneyLimit());
				break;
			}else{
				maincity.setMoney(updateMoney);
			}
		}
		maincityService.updateMoney(userItem.getCharacterId(), maincity.getMoney(),null);
		//删除或更新使用道具
		updateItemAfterUse(userItem, amount);
	}
	private void usePeopleItem(UserItem userItem, int amount) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		Maincity maincity = maincityService.getMaincity(userItem.getCharacterId());
		long peopleLimit = interiorTech.getValueAfterEffect(InteriorTechEffectType.PEAPLE_LIMIT, maincity.getPeopleLimit(), userItem.getCharacterId());
		for(int i=0;i<amount;i++){//获得资源
			int addPeople = Integer.parseInt(userItem.getItem().getSpecialSkill1());
			int updatePeople = maincity.getPeople()+addPeople;
			if(updatePeople>peopleLimit){
				maincity.setPeople((int)peopleLimit);
				break;
			}else{
				maincity.setPeople(updatePeople);
			}
		}
		maincityService.updatePeople(userItem.getCharacterId(), maincity.getPeople());
		//删除或更新使用道具
		updateItemAfterUse(userItem, amount);
	}
	private void useMedicineItem(UserItem userItem, int amount) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(userItem.getCharacterId());
		for(int i=0;i<amount;i++){//获得资源
			int addMedicine = Integer.parseInt(userItem.getItem().getSpecialSkill1());
			int updateMedicine = maincity.getMedicine()+addMedicine;
			if(updateMedicine>maincity.getMedicineLimit()){
				maincity.setMedicine(maincity.getMedicineLimit());
				break;
			}else{
				maincity.setPeople(updateMedicine);
			}
		}
		maincityService.updateMedicine(userItem.getCharacterId(), maincity.getMedicine());
		//删除或更新使用道具
		updateItemAfterUse(userItem, amount);
	}
	private void validateUserItem(UserItem userItem, int characterId, int amount) throws AppException{
		if(amount<1){
			throw new AppException("物品使用数量错误");
		}
		if(userItem==null){
			throw new AppException("不存在该道具");
		}
		if(userItem.getCharacterId()!=characterId){
			throw new AppException("不存在该道具");
		}
		if(userItem.getItemPosition()!=Const.POSITION_BAG){
			throw new AppException("不存在该道具");
		}
		if(userItem.getItem().getUseable()==Const.CAN_NOT_USE){
			throw new AppException("道具不能使用");
		}
		if(userItem.getItem().getUseable()==Const.CAN_NOT_BATCH_USE&&amount!=1){
			throw new AppException("道具不能批量使用");
		}
		if(userItem.getItemAmount()<amount){
			throw new AppException("道具数量不足");
		}
		if(userItem.getItemType()!=Const.TYPE_ITEM){
			throw new AppException("使用物品不是消耗品道具");
		}
		
	}
	/**
	 * 消耗一个物品道具(用品)
	 * @param itemNo 道具编号
	 * @param characterId
	 * @return
	 */
	public boolean useOneItem(String itemNo,int characterId){
		List<UserItem> userItems = getUserItemByItemNo(itemNo,characterId);
		//return true;
		if(userItems.isEmpty()){
			return false;
		}else{
			UserItem userItem = userItems.get(0);
			int itemAmount = userItem.getItemAmount();
			if(itemAmount==1){
				deleteFromUserItem(userItem.getId());
			}else{
				updateUserItemAmount(userItem.getId(), itemAmount-1);
			}
			return true;
		}
	}
	
	
	/**
	 * 消费对话框信息
	 * @param speedFunctionType 消费功能类型
	 * @param characterId 
	 * @param second(秒钟.人) 
	 * @return
	 * @throws AppException 
	 */
	public Map<String,Object> spendWindow(int speedFunctionType, int characterId, int second) throws AppException {
		Map<String,Object> map = new HashMap<String,Object>();
		List<Map<String,Object>> itemList = new ArrayList<Map<String,Object>>();
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		UserCharacter character  = characterService.getCharacterById(characterId);
		int money = Const.getNeedMoneyByType(speedFunctionType,second);
		Map<String,StaticSpeedItem> itemMap = Const.SPENDITEMMAP.get(speedFunctionType);
		if(itemMap == null){
			throw new AppException("参数错误");
		}
		for (String itemNo: itemMap.keySet()) { 
			Map<String,Object> item = new LinkedHashMap<String,Object>();
			StaticItem staticItem = ItemCache.getItemByNo(itemNo);
			item.put("itemNo",itemNo);
			if(staticItem != null){
				item.put("name", staticItem.getItemName());
				item.put("tooltip", ChangeArticleToToolTip.changeItemToToolTip(staticItem));
				item.put("icon", ItemCache.getItemByNo(itemNo).getIcon());
				List<UserItem> itemTemp = getUserItemByItemNo(itemNo, characterId);
				if(itemTemp == null || itemTemp.isEmpty()){
					item.put("isEnough",false);
				}else{
					item.put("isEnough",true);
				}
			}
			itemList.add(item);
		} 
		map.put("money", money);
		map.put("cash", character.getCash());
		map.put("ticket", character.getTicket());
		map.put("item",itemList);
		return map;
	}
}
