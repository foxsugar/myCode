package com.crystalcg.gamedev.buildingFunction.service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;


/**
 *  宝石镶嵌
 * @author jinganyang
 *
 */
public class EmbedStoneService {
	
	public static final int EMBED_BASE_MONEY = 10000;//宝石镶嵌消费基数
	
	public List<Map<String, Object>> getUserHeroName(int characterId){
		UserHeroService userHeroService = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
		return userHeroService.getUserHeroName(characterId);
	}
	
	public List<UserEquipment> getEquipmentByPositonAndType(int position,int equipmentType,int characterId) throws AppException{
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
	public List<UserMaterial> getUserGemStone(int characterId){
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		return userItemService.getGemStoneInBag(characterId);
	}
	
	public UserEquipment getUserItem(int characterId,int equipmentId) throws AppException{
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		UserEquipment equipment = userItemService.getUserEquipmentById(equipmentId);
		if(equipment==null||equipment.getCharacterId()!=characterId||(equipment.getItemPosition()!=Const.POSITION_BAG&&equipment.getItemPosition()!=Const.POSITION_HERO)){
			throw new AppException("装备不存在");
		}
		return equipment;
	}
	
	/**
	 * 宝石镶嵌
	 * @param equipmentId
	 * @param stoneId
	 * @param holeIndex
	 * @param charId
	 * @return UserItem
	 * @throws AppException
	 */
	public UserEquipment embed(int equipmentId,int stoneId,int holeIndex,int characterId) throws AppException{
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		UserEquipment equipment = userItemService.getUserEquipmentById(equipmentId);
		UserMaterial stone = userItemService.getUserMaterialById(stoneId);
		if(stone == null){
			throw new AppException("宝石不存在");
		}
		if(equipment==null){
			throw new AppException("装备不存在");
		}
		if(equipment.getCharacterId()!= characterId){
			throw new AppException("装备不存在");
		}
		if(equipment.getItemPosition()==Const.POSITION_MAIL){
			throw new AppException("背包或武将身上无此装备");
		}
		if(stone.getItemType() != Const.TYPE_MATERIAL || stone.getMaterial().getMaterialType() != Const.SUBTYPE_STONE){
			throw new AppException("请选择一个宝石");
		}
		if(isExistType(equipment, stone)){
			throw new AppException("已存在同类别宝石");
		}
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		int needMoney = countNeedMoney(stone.getMaterial().getGemstoneLevel());
		if(maincity.getMoney()<needMoney){
			throw new AppException("铜币不足");
		}
		switch(holeIndex){
			case Const.HOLE_INDEX_ONE:
				if(equipment.getHole1()!=null){
					throw new AppException("该插孔已有宝石");
				}
				equipment.setHole1(stone.getItemNo());
			break;
			case Const.HOLE_INDEX_TWO:
				if(equipment.getHole2()!=null){
					throw new AppException("该插孔已有宝石");
				}
				equipment.setHole2(stone.getItemNo());
			break;
			case Const.HOLE_INDEX_THREE:
				if(equipment.getHole3()!=null){
					throw new AppException("该插孔已有宝石");
				}
				equipment.setHole3(stone.getItemNo());
			break;
			default:
				throw new AppException("不存在此插孔");
		}
		if(equipment.getIsBound()==Const.IS_NOT_BIND_STATE&&stone.getIsBound()==Const.IS_NOT_BIND_STATE){
			equipment.setIsBound(Const.IS_NOT_BIND_STATE);
		}else{
			equipment.setIsBound(Const.IS_BIND_STATE);
		}
		maincityService.addMoney(characterId, -needMoney);
		userItemService.updateEquipmentHole(equipment);
		if(stone.getItemAmount()>1){
			userItemService.updateUserItemAmount(stoneId, stone.getItemAmount()-1);
		}else{
			userItemService.deleteFromUserItem(stoneId);
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.EMBED_GEMSTONE, null, characterId);
		return equipment;
	}
	private boolean isExistType(UserEquipment equipment, UserMaterial stone){
		String methodName = "getStone";
		List<Integer> existType = new ArrayList<Integer>();
		try {
			for(int i=1;i<4;i++){
				Method method = UserEquipment.class.getMethod(methodName+i);
				StaticMaterial stoneHas = (StaticMaterial)method.invoke(equipment);
				if(stoneHas!=null){
					existType.add(stoneHas.getGemstoneType());
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(existType.indexOf(stone.getMaterial().getGemstoneType())==-1){
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 * 摘除宝石
	 * @param equipmentId
	 * @param holeIndex
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	public UserEquipment excise(int equipmentId,int holeIndex,int characterId) throws AppException{
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		if(userItemService.getTreasuryRemain(characterId)<=0){
			throw new AppException("背包空间不足");
		}
		UserEquipment equipment = userItemService.getUserEquipmentById(equipmentId);
		if(equipment==null){
			throw new AppException("装备不存在");
		}
		if(equipment.getCharacterId()!=characterId){
			throw new AppException("装备不存在");
		}
		if(equipment.getItemPosition()==Const.POSITION_MAIL){
			throw new AppException("背包或武将身上无此装备");
		}
		String stoneItemId;
		switch(holeIndex){
		case Const.HOLE_INDEX_ONE:
			stoneItemId = equipment.getHole1();
			if(stoneItemId==null){
				throw new AppException("该插孔没有宝石");
			}
			equipment.setHole1(null);
		break;
		case Const.HOLE_INDEX_TWO:
			stoneItemId = equipment.getHole2();
			if(equipment.getHole2()==null){
				throw new AppException("该插孔没有宝石");
			}
			equipment.setHole2(null);
		break;
		case Const.HOLE_INDEX_THREE:
			stoneItemId = equipment.getHole3();
			if(equipment.getHole3()==null){
				throw new AppException("该插孔没有宝石");
			}
			equipment.setHole3(null);
		break;
		default:
			throw new AppException("不存在此插孔");
		}
		userItemService.updateEquipmentHole(equipment);
		userItemService.addItem2character(characterId, stoneItemId, Const.TYPE_MATERIAL, equipment.getIsBound());
		return equipment;
	}
	private static int countNeedMoney(int level){
		return EMBED_BASE_MONEY*(level-1);
	}
//	public UserEquipment exciseAll(int equipmentId, int characterId) throws AppException{
//		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
//		UserEquipment equipment = userItemService.getUserEquipmentById(equipmentId);
//		if(equipment==null){
//			throw new AppException("装备不存在");
//		}
//		if(equipment.getCharacterId()!=characterId||equipment.getItemPosition()!=Const.POSITION_BAG){
//			throw new AppException("装备不存在");
//		}
//		if(equipment.getHole1()==0&&equipment.getHole2()==0&&equipment.getHole3()==0){
//			throw new AppException("该装备没有宝石");
//		}
//		if(equipment.getHole1()!=0){
//			userItemService.addItem2character(characterId, equipment.getHole1(), Const.TYPE_MATERIAL, equipment.getIsBound());
//			equipment.setHole1(0);
//		}
//		if(equipment.getHole2()!=0){
//			userItemService.addItem2character(characterId, equipment.getHole2(), Const.TYPE_MATERIAL, equipment.getIsBound());
//			equipment.setHole2(0);
//		}
//		if(equipment.getHole3()!=0){
//			userItemService.addItem2character(characterId, equipment.getHole3(), Const.TYPE_MATERIAL, equipment.getIsBound());
//			equipment.setHole3(0);
//		}
//		userItemService.updateEquipmentHole(equipment);
//		return equipment;
//	}

}
