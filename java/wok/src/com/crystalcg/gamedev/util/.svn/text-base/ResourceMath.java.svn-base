package com.crystalcg.gamedev.util;

import java.util.List;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.resource.domain.UserField;
import com.crystalcg.gamedev.user.service.CharacterService;

/**
 * 资源计算公式
 * @author jinganyang
 *
 */
public class ResourceMath {
	
	public static int getResourceAmount(UserField userField) throws AppException{
		switch (userField.getFieldType()) {
		case Const.RESOURCE_TYPE_FOOD:
			return countResource(userField.getGrowTime(), Const.FIELD_RESOURCE_BASE.get(Const.RESOURCE_TYPE_FOOD));
		case Const.RESOURCE_TYPE_WOOD:
			return countResource(userField.getGrowTime(), Const.FIELD_RESOURCE_BASE.get(Const.RESOURCE_TYPE_WOOD));
		case Const.RESOURCE_TYPE_STONE:
			return countResource(userField.getGrowTime(), Const.FIELD_RESOURCE_BASE.get(Const.RESOURCE_TYPE_STONE));
		case Const.RESOURCE_TYPE_IRONORE:
			return countResource(userField.getGrowTime(), Const.FIELD_RESOURCE_BASE.get(Const.RESOURCE_TYPE_IRONORE));

		default:
			throw new AppException("计算资源产量时，资源类型错误");
		}
	}
	
	public static int countResource(int growTime, int base) throws AppException{
		double result;
		switch (growTime) {
		case Const.FIELD_GROW_TIME_THREE_HOURS:
			result = 1.06*base*(1.02+Const.FIELD_RESOURCE_LIST.get(growTime)/(69+Const.FIELD_RESOURCE_LIST.get(growTime)))*Const.FIELD_RESOURCE_LIST.get(growTime);
			return (int)result;
		case Const.FIELD_GROW_TIME_SIX_HOURS:
			result = 1.1*base*(1.02+Const.FIELD_RESOURCE_LIST.get(growTime)/(69+Const.FIELD_RESOURCE_LIST.get(growTime)))*Const.FIELD_RESOURCE_LIST.get(growTime);
			return (int)result;
		case Const.FIELD_GROW_TIME_TWELVE_HOURS:
			result = 1.17*base*(1.02+Const.FIELD_RESOURCE_LIST.get(growTime)/(69+Const.FIELD_RESOURCE_LIST.get(growTime)))*Const.FIELD_RESOURCE_LIST.get(growTime);
			return (int)result;
		case Const.FIELD_GROW_TIME_TWENTY_FOUR_HOURS:
			result = 1.28*base*(1.02+Const.FIELD_RESOURCE_LIST.get(growTime)/(69+Const.FIELD_RESOURCE_LIST.get(growTime)))*Const.FIELD_RESOURCE_LIST.get(growTime);
			return (int)result;

		default:
			throw new AppException("计算资源产量时，时间类型错误");
		}
	}
	
	/**
	 * 人口每秒增长数量
	 * 人口每秒增加公式：   [ 人口总上限/21 *（1+君主政治/249）]/3600
	 * @param peopleLimit 
	 * @return
	 */
	public static double getPeopleIncrease(int characterId, int peopleLimit){
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		int internalAffairs = characterService.getCharacterById(characterId).getInternalAffairs();
		return peopleLimit/21.0 * (1 + internalAffairs/249) /3600;
	}
	
	/**
	 * 税收每秒的收成公式：(当前人口数*5+当前城池等级^*100)/3600(待调)
	 * @return
	 */
	public static double getMoneyIncrease(int people,int maincityLevel,int characterId){
		return (people*5+maincityLevel*maincityLevel*100)/3600.0;
	}
	
	/**
	 * 药膏生产速度（每秒）
	 * （当前药膏上限/17*太医署等级）/3600
	 * @param midicineLimit 
	 * @return
	 */
	public static double getMedicineIncrease(int characterId, int midicineLimit){
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.HOSPITAL_BUILDING_NO_PREFIX);
		int level;
		if(list.size()>0){
			level=list.get(0).getLevel();
		}else{
			level=0;
		}
		return midicineLimit/17.0*level/3600;
	}
	
	public static double getRatioForMarket(int choiceType,int exchangeType){
		return Const.RESOURCE_VALUE.get(exchangeType)/Const.RESOURCE_VALUE.get(choiceType);
	}
}
