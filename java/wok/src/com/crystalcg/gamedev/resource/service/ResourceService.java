package com.crystalcg.gamedev.resource.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.resource.Job.ResourceGrowingJob;
import com.crystalcg.gamedev.resource.domain.UserField;
import com.crystalcg.gamedev.resource.mapper.ResourceMapper;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ResourceMath;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * 城郊资源
 * @author jinganyang
 *
 */
public class ResourceService {
	/**
	 * 城郊UI用户开启状态缓存
	 */
	public static Map<Integer, Boolean> SUBURB_UI_OPEN_STATUS = new HashMap<Integer, Boolean>();
	public static Map<Integer, Boolean> RESOURCE_JOB = new HashMap<Integer, Boolean>();
	ResourceMapper resourceMapper;
	MaincityService maincityService;

	//缺少势力冲突对资源的影响代码
	// 获取种植资源静态信息，时间，收成，需要人口等
	public List<Map<String, Object>> getPlanInfo(int fieldType)
			throws AppException {
		Map<String, Object> planInfo;
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		switch (fieldType) {
		case Const.RESOURCE_TYPE_FOOD:
			for (int i = 0; i < Const.FIELD_RESOURCE_LIST.size(); i++) {
				planInfo = new HashMap<String,Object>();
				planInfo.put("needPeople",
						Const.FIELD_RESOURCE_NEED_PEOPLE_LIST.get(i));
				planInfo.put("needTime", Const.FIELD_RESOURCE_LIST.get(i));
				planInfo.put("addResource", ResourceMath
						.countResource(i, Const.FIELD_RESOURCE_BASE
								.get(Const.RESOURCE_TYPE_FOOD)));
				retList.add(planInfo);
			}
			return retList;
		case Const.RESOURCE_TYPE_WOOD:
			for (int i = 0; i < Const.FIELD_RESOURCE_LIST.size(); i++) {
				planInfo = new HashMap<String,Object>();
				planInfo.put("needPeople",
						Const.FIELD_RESOURCE_NEED_PEOPLE_LIST.get(i));
				planInfo.put("needTime", Const.FIELD_RESOURCE_LIST.get(i));
				planInfo.put("addResource", ResourceMath
						.countResource(i, Const.FIELD_RESOURCE_BASE
								.get(Const.RESOURCE_TYPE_WOOD)));
				retList.add(planInfo);
			}
			return retList;
		case Const.RESOURCE_TYPE_STONE:
			for (int i = 0; i < Const.FIELD_RESOURCE_LIST.size(); i++) {
				planInfo = new HashMap<String,Object>();
				planInfo.put("needPeople",
						Const.FIELD_RESOURCE_NEED_PEOPLE_LIST.get(i));
				planInfo.put("needTime", Const.FIELD_RESOURCE_LIST.get(i));
				planInfo.put("addResource", ResourceMath.countResource(i,
						Const.FIELD_RESOURCE_BASE
								.get(Const.RESOURCE_TYPE_STONE)));
				retList.add(planInfo);
			}
			return retList;
		case Const.RESOURCE_TYPE_IRONORE:
			for (int i = 0; i < Const.FIELD_RESOURCE_LIST.size(); i++) {
				planInfo = new HashMap<String,Object>();
				planInfo.put("needPeople",
						Const.FIELD_RESOURCE_NEED_PEOPLE_LIST.get(i));
				planInfo.put("needTime", Const.FIELD_RESOURCE_LIST.get(i));
				planInfo.put("addResource", ResourceMath.countResource(i,
						Const.FIELD_RESOURCE_BASE
								.get(Const.RESOURCE_TYPE_IRONORE)));
				retList.add(planInfo);
			}
			return retList;

		default:
			throw new AppException("资源类型错误");
		}

	}

	// 获取资源块信息
	/**
	 * 获取玩家地块信息
	 * 
	 * @param userCharacter
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> getUserFieldInfo(
			int characterId) throws AppException {
		List<UserField> userFields = getUserFieldByCharId(characterId);
		if(RESOURCE_JOB.get(characterId)==null){//玩家未开启过城郊资源时钟任务
			resourceJobOpen(userFields,characterId);
		}
//		if (userFields.size() == 0) {// 第一次进入城郊，添加地块
//			Maincity maincity = maincityService.getMaincity(characterId);
//			addResourceFieldFirst(maincity.getCharacterId(),
//					maincity.getLevel());
//			userFields = getUserFieldByCharId(characterId);
//		}
		
		
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("fieldAmount", getUserFieldAmount(characterId));
		retMap.put("foodField", new ArrayList<Map<String, Object>>());
		retMap.put("woodField", new ArrayList<Map<String, Object>>());
		retMap.put("stoneField", new ArrayList<Map<String, Object>>());
		retMap.put("ironoreField", new ArrayList<Map<String, Object>>());
		for (UserField i : userFields) {
			switch (i.getFieldType()) {
			case Const.RESOURCE_TYPE_FOOD:
				((List)retMap.get("foodField")).add(changeFieldToMap(i));
				break;
			case Const.RESOURCE_TYPE_WOOD:
				((List)retMap.get("woodField")).add(changeFieldToMap(i));
				break;
			case Const.RESOURCE_TYPE_STONE:
				((List)retMap.get("stoneField")).add(changeFieldToMap(i));
				break;
			case Const.RESOURCE_TYPE_IRONORE:
				((List)retMap.get("ironoreField")).add(changeFieldToMap(i));
				break;
			default:
				break;
			}
		}
		SUBURB_UI_OPEN_STATUS.put(characterId, true);
		return retMap;
	}
	/**
	 * 非通用方法，获取玩家当前可开启的地块数目
	 * @param characterId
	 * @return
	 */
	private int getUserFieldAmount(int characterId){
		Maincity maincity = maincityService.getMaincity(characterId);
		return maincity.getLevel()+1;
	}
	
	/**
	 * 非通用方法，关服后重新开启地块任务
	 * @param characterId
	 */
	private void resourceJobOpen(List<UserField> userFields, int characterId){
		long currentTime = System.currentTimeMillis();
		Map<Long,List<UserField>> dataMap = new HashMap<Long, List<UserField>>();
		for(UserField i:userFields){
			if(i.getFieldStatus()==Const.FIELD_STATUS_GROWING){
				updateFieldStatusAndAddJob(i, currentTime, dataMap);
			}
		}
		for(List<UserField> data:dataMap.values()){
			Map<String, Object> jobData = new HashMap<String,Object>();
			jobData.put("userFields", data);
			ExecuteJob.add(ResourceGrowingJob.class, jobData, data.get(0).getHarvestTime().getTime(), "resourceGrow" + data.get(0).getId());
		}
		RESOURCE_JOB.put(characterId, true);
	}
	private final void updateFieldStatusAndAddJob(UserField i, long currentTime, Map<Long,List<UserField>> dataMap){
		if(i.getHarvestTime().getTime()<currentTime){//修改状态
			i.setFieldStatus(Const.FIELD_STATUS_ADULTNESS);
			updateResourceField(i);
		}else{//添加时钟任务
			if(dataMap.get(i.getHarvestTime().getTime())==null){
				List<UserField> tempList = new ArrayList<UserField>();
				tempList.add(i);
				dataMap.put(i.getHarvestTime().getTime(), tempList);
			}else{
				dataMap.get(i.getHarvestTime().getTime()).add(i);
			}
		}
	}

	/**
	 * 调整返回数据
	 * 
	 * @param userField
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> changeFieldToMap(UserField userField)
			throws AppException {
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("fieldId", userField.getFieldId());
		switch (userField.getFieldStatus()) {
		case Const.FIELD_STATUS_NULL:
			retMap.put("fieldType", userField.getFieldType());
			retMap.put("fieldStatus", userField.getFieldStatus());
			return retMap;
		case Const.FIELD_STATUS_GROWING:
			// retMap.put("fieldId", userField.getFieldId());
			retMap.put("fieldType", userField.getFieldType());
			retMap.put("fieldStatus", userField.getFieldStatus());
			retMap.put("remainTime", changeToRemainTime(userField
					.getHarvestTime().getTime()));
			return retMap;
		case Const.FIELD_STATUS_ADULTNESS:
			// retMap.put("fieldId", userField.getFieldId());
			retMap.put("fieldType", userField.getFieldType());
			retMap.put("fieldStatus", userField.getFieldStatus());
			retMap.put("resourceValue", ResourceMath.getResourceAmount(userField));
			return retMap;
		case Const.FIELD_STATUS_EFFECT:
			// retMap.put("fieldId", userField.getFieldId());
			retMap.put("fieldType", userField.getFieldType());
			retMap.put("fieldStatus", userField.getFieldStatus());
			return retMap;
			// case Const.FIELD_STATUS_WILL_OPEN:
			// retMap.put("fieldId", userField.getFieldId());
			// retMap.put("fieldType", userField.getFieldType());
			// retMap.put("fieldStatus", userField.getFieldStatus());
			// return retMap;

		default:
			throw new AppException("资源地块状态错误");
		}
	}

	public long changeToRemainTime(long time) {
		long currentTime = System.currentTimeMillis();
		long remainTime = (time - currentTime) / 1000+1;
		return remainTime;
	}

//	// 添加资源块
//	/**
//	 * 城池升级时调用，在从来没有进入过城郊的情况下，不添加
//	 * 
//	 * @param characterId
//	 * @param castleLevel
//	 */
//	public void addResourceField(int characterId, int castleLevel) {
//		List<UserField> userFields = getUserFieldByCharId(characterId);
//		if (userFields.size() != 0) {// 城郊没有数据不添加
//			addNewResourceField(characterId, castleLevel,
//					Const.RESOURCE_TYPE_FOOD, Const.FIELD_STATUS_NULL);
//			addNewResourceField(characterId, castleLevel,
//					Const.RESOURCE_TYPE_WOOD, Const.FIELD_STATUS_NULL);
//			addNewResourceField(characterId, castleLevel,
//					Const.RESOURCE_TYPE_STONE, Const.FIELD_STATUS_NULL);
//			addNewResourceField(characterId, castleLevel,
//					Const.RESOURCE_TYPE_IRONORE, Const.FIELD_STATUS_NULL);
//		}
//	}
//
//	// 需要按数值公式修改
//	public void addResourceFieldFirst(int characterId, int castleLevel) {
//		// 1级开两个，以后每升级开一个
//		for (int i = 0; i <= castleLevel; i++) {
//			addNewResourceField(characterId, i, Const.RESOURCE_TYPE_FOOD,
//					Const.FIELD_STATUS_NULL);
//			addNewResourceField(characterId, i, Const.RESOURCE_TYPE_WOOD,
//					Const.FIELD_STATUS_NULL);
//			addNewResourceField(characterId, i, Const.RESOURCE_TYPE_STONE,
//					Const.FIELD_STATUS_NULL);
//			addNewResourceField(characterId, i, Const.RESOURCE_TYPE_IRONORE,
//					Const.FIELD_STATUS_NULL);
//		}
//	}

	// 种植资源块
	/**
	 * 种植资源
	 * 
	 * @param characterId
	 * @param fieldId
	 * @param fieldType
	 * @param growTime
	 * @throws AppException
	 */
	public Map<String, Object> plantResource(int characterId, int fieldId,
			int fieldType, int growTime) throws AppException {
		Map<String, Object> data = new HashMap<String,Object>();
		UserField userField = getSpecificUserField(characterId, fieldId,
				fieldType);
		if (userField != null) {
			throw new AppException("资源块不是空地，无法种植");
		}
		int amount = getUserFieldAmount(characterId);
		if(fieldId>amount-1){
			throw new AppException("该地块还未开启");
		}
		Maincity maincity = maincityService.getMaincity(characterId);
		int people = maincity.getPeople();
		int workingPeople = maincity.getWorkingPeople();
		if (people - workingPeople
				- Const.FIELD_RESOURCE_NEED_PEOPLE_LIST.get(growTime) < 0) {
			throw new AppException("空闲人口不足，无法种植");
		} else {// 更新繁忙人口
			maincityService.updateWorkingPeople(characterId, workingPeople
					+ Const.FIELD_RESOURCE_NEED_PEOPLE_LIST.get(growTime));
		}
		long harvestTime = this.getResourceTime(growTime, characterId) ;
		userField = addNewResourceField(characterId, fieldId, fieldType, Const.FIELD_STATUS_GROWING,growTime,new Date(harvestTime));
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		switch (fieldType) {
		case Const.RESOURCE_TYPE_FOOD:
			questService.updateQuestSchedule(QuestTargeType.PLAN_FOOD_AMOUNT, null, characterId);
			
			break;
		case Const.RESOURCE_TYPE_WOOD:
			questService.updateQuestSchedule(QuestTargeType.PLAN_WOOD_AMOUNT, null, characterId);
			
			break;
		case Const.RESOURCE_TYPE_STONE:
			questService.updateQuestSchedule(QuestTargeType.PLAN_STONE_AMOUNT, null, characterId);
			
			break;
		case Const.RESOURCE_TYPE_IRONORE:
			questService.updateQuestSchedule(QuestTargeType.PLAN_IRONORE_AMOUNT, null, characterId);
			
			break;

		default:
			break;
		}
		List<UserField> userFields = new ArrayList<UserField>();
		userFields.add(userField);
		data.put("userFields", userFields);
		ExecuteJob.add(ResourceGrowingJob.class, data, harvestTime,
				"resourceGrow" + userField.getId());
		return changeFieldToMap(userField);
	}

	// 收获资源块
	/**
	 * 收获资源
	 * 
	 * @param characterId
	 * @param fieldId
	 * @param fieldType
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> harvestResource(int characterId, int fieldId,
			int fieldType) throws AppException {
		UserField userField = getSpecificUserField(characterId, fieldId,
				fieldType);
		// ExecuteJob.cancel("resourceGrow"+userField.getId());
		// 判断操作是否合法
		if (userField == null) {
			throw new AppException("该地块为空地");
		}
		if (userField.getFieldStatus() != Const.FIELD_STATUS_ADULTNESS) {
			throw new AppException("资源还没有成熟");
		}
		Map<String, Object> data = new HashMap<String,Object>();
		// 更改地块状态
		userField.setFieldStatus(Const.FIELD_STATUS_GROWING);
		long harvestTime = this.getResourceTime(userField.getGrowTime(), characterId);
		userField.setHarvestTime(new Date(harvestTime));
		updateResourceField(userField);
		List<UserField> userFields = new ArrayList<UserField>();
		userFields.add(userField);
		data.put("userFields", userFields);
		// 开启成长job
		ExecuteJob.add(ResourceGrowingJob.class, data, harvestTime,
				"resourceGrow" + userField.getId());
		// 添加资源，返回资源增加数，和成熟时间
		Map<String, Object> retMap = new HashMap<String,Object>();
		Maincity maincity = maincityService.getMaincity(characterId);
		int addResourceAmount = ResourceMath.getResourceAmount(userField);
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		switch (userField.getFieldType()) {
		case Const.RESOURCE_TYPE_FOOD:// 添加粮食并返回
			// userCharacter.setFood(userCharacter.getFood()+addResourceAmount);
			addResourceAmount = (int)interiorTech.getValueAfterEffect(InteriorTechEffectType.FOOD_VOLUME_OF_PRODUCTION, (long)addResourceAmount, characterId);
			maincity.setFood(maincity.getFood() + addResourceAmount);
			maincityService.updateFood(
					characterId,
					maincity.getFood() < maincity.getFoodLimit() ? maincity
							.getFood() : maincity.getFoodLimit());
			retMap.put("addResource", addResourceAmount);
			retMap.put("remainTime", changeToRemainTime(harvestTime));
			break;
		case Const.RESOURCE_TYPE_WOOD:
			// userCharacter.setWood(userCharacter.getWood()+addResourceAmount);
			addResourceAmount = (int)interiorTech.getValueAfterEffect(InteriorTechEffectType.WOOD_VOLUME_OF_PRODUCTION, (long)addResourceAmount, characterId);
			maincity.setWood(maincity.getWood() + addResourceAmount);
			maincityService.updateWood(
					characterId,
					maincity.getWood() < maincity.getWoodLimit() ? maincity
							.getWood() : maincity.getWoodLimit());
			retMap.put("addResource", addResourceAmount);
			retMap.put("remainTime", changeToRemainTime(harvestTime));
			break;
		case Const.RESOURCE_TYPE_STONE:
			// userCharacter.setStone(userCharacter.getStone()+addResourceAmount);
			addResourceAmount = (int)interiorTech.getValueAfterEffect(InteriorTechEffectType.STONE_VOLUME_OF_PRODUCTION, (long)addResourceAmount, characterId);
			maincity.setStone(maincity.getStone() + addResourceAmount);
			maincityService.updateStone(
					characterId,
					maincity.getStone() < maincity.getStoneLimit() ? maincity
							.getStone() : maincity.getStoneLimit());
			retMap.put("addResource", addResourceAmount);
			retMap.put("remainTime", changeToRemainTime(harvestTime));
			break;
		case Const.RESOURCE_TYPE_IRONORE:
			// userCharacter.setBronze(userCharacter.getBronze()+addResourceAmount);
			addResourceAmount = (int)interiorTech.getValueAfterEffect(InteriorTechEffectType.IRONORE_VOLUME_OF_PRODUCTION, (long)addResourceAmount, characterId);
			maincity.setIronore(maincity.getIronore() + addResourceAmount);
			maincityService
					.updateIronore(
							characterId,
							maincity.getIronore() < maincity.getIronoreLimit() ? maincity
									.getIronore() : maincity.getIronoreLimit());
			retMap.put("addResource", addResourceAmount);
			retMap.put("remainTime", changeToRemainTime(harvestTime));
			break;

		default:
			throw new AppException("资源类型错误，添加资源失败");
		}
		return retMap;
	}

	/**
	 * 一键收取
	 * 
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> easyHarvestResource(int characterId)
			throws AppException {
		List<UserField> userFields = getUserFieldByCharIdAndStatus(characterId,
				Const.FIELD_STATUS_ADULTNESS);
		if (userFields.size() == 0) {
			throw new AppException("无资源可收");
		} else {
			Maincity maincity = maincityService.getMaincity(characterId);
			long food = 0;
			long wood = 0;
			long stone = 0;
			long ironore = 0;
			for (UserField i : userFields) {
				// 更改地块状态
				i.setFieldStatus(Const.FIELD_STATUS_GROWING);
				long harvestTime = this.getResourceTime(i.getGrowTime(), characterId);
				i.setHarvestTime(new Date(harvestTime));
				switch (i.getFieldType()) {
				case Const.RESOURCE_TYPE_FOOD:
					food += ResourceMath.getResourceAmount(i);
					break;
				case Const.RESOURCE_TYPE_WOOD:
					wood += ResourceMath.getResourceAmount(i);
					break;
				case Const.RESOURCE_TYPE_STONE:
					stone += ResourceMath.getResourceAmount(i);
					break;
				case Const.RESOURCE_TYPE_IRONORE:
					ironore += ResourceMath.getResourceAmount(i);
					break;

				default:
					throw new AppException("资源类型错误，添加资源失败");
				}
			}
			// 开启成长job
			InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
					.getSpringBean("interiorTechService");
			food = interiorTech.getValueAfterEffect(InteriorTechEffectType.FOOD_VOLUME_OF_PRODUCTION, food, characterId);
			wood = interiorTech.getValueAfterEffect(InteriorTechEffectType.WOOD_VOLUME_OF_PRODUCTION, wood, characterId);
			stone = interiorTech.getValueAfterEffect(InteriorTechEffectType.STONE_VOLUME_OF_PRODUCTION, stone, characterId);
			ironore = interiorTech.getValueAfterEffect(InteriorTechEffectType.IRONORE_VOLUME_OF_PRODUCTION, ironore, characterId);
			addBatchJob(userFields,characterId);
			maincity.setFood(maincity.getFood() + food);
			maincity.setWood(maincity.getWood() + wood);
			maincity.setStone(maincity.getStone() + stone);
			maincity.setIronore(ironore + maincity.getIronore());
			maincityService
					.updateSuburbsResource(
							characterId,
							maincity.getFood() < maincity.getFoodLimit() ? maincity
									.getFood() : maincity.getFoodLimit(),
							maincity.getWood() < maincity.getWoodLimit() ? maincity
									.getWood() : maincity.getWoodLimit(),
							maincity.getStone() < maincity.getStoneLimit() ? maincity
									.getStone() : maincity.getStoneLimit(),
							maincity.getIronore() < maincity.getIronoreLimit() ? maincity
									.getIronore() : maincity.getIronoreLimit());
			//更新地块
			updateResources(userFields);
			Map<String, Object> retMap = new HashMap<String,Object>();
			Map<String, Object> resourceAddMap = new HashMap<String,Object>();
			resourceAddMap.put("foodAdd", food);
			resourceAddMap.put("woodAdd", wood);
			resourceAddMap.put("stoneAdd", stone);
			resourceAddMap.put("ironoreAdd", ironore);
			retMap.put("resourceFieldRefresh", getUserFieldInfo(characterId));
			retMap.put("resourceAdd", resourceAddMap);
			return retMap;
		}
	}
	
	private void updateResources(List<UserField> userFields){
		for(UserField i:userFields){
			updateResourceField(i);
		}
	}
	
	private void addBatchJob(List<UserField> userFields,int characterId) throws AppException{
		List<UserField> threeHours = new LinkedList<UserField>();
		List<UserField> sixHours = new LinkedList<UserField>();
		List<UserField> twelveHours = new LinkedList<UserField>();
		List<UserField> twentyFourHours = new LinkedList<UserField>();
		for(UserField i:userFields){
			switch (i.getGrowTime()) {//生长时间类型，以后需要换常量
			case 0:
				threeHours.add(i);
				break;
			case 1:
				sixHours.add(i);
				break;
			case 2:
				twelveHours.add(i);
				break;
			case 3:
				twentyFourHours.add(i);
				break;

			default:
				throw new AppException("时间类型错误");
			}
		}
		if(!threeHours.isEmpty()){
			Map<String, Object> threeHoursMap = new HashMap<String,Object>();
			threeHoursMap.put("userFields", threeHours);
			// 开启成长job
			long harvestTime = this.getResourceTime(threeHours.get(0).getGrowTime(), characterId);
			setBatchKey(threeHours, threeHours.get(0).getId());
			ExecuteJob.add(ResourceGrowingJob.class, threeHoursMap, harvestTime,
					Const.JOB_STRING_FOR_PLAN_RESOURCE + threeHours.get(0).getId());
		}
		if(!sixHours.isEmpty()){
			Map<String, Object> sixHoursMap = new HashMap<String,Object>();
			sixHoursMap.put("userFields", sixHours);
			// 开启成长job
			long harvestTime = this.getResourceTime(sixHours.get(0).getGrowTime(), characterId);
			setBatchKey(sixHours, sixHours.get(0).getId());
			ExecuteJob.add(ResourceGrowingJob.class, sixHoursMap, harvestTime,
					Const.JOB_STRING_FOR_PLAN_RESOURCE + sixHours.get(0).getId());
		}
		if(!twelveHours.isEmpty()){
			Map<String, Object> twelveHoursMap = new HashMap<String,Object>();
			twelveHoursMap.put("userFields", twelveHours);
			// 开启成长job
			long harvestTime = this.getResourceTime(twelveHours.get(0).getGrowTime(), characterId);
			setBatchKey(twelveHours, twelveHours.get(0).getId());
			ExecuteJob.add(ResourceGrowingJob.class, twelveHoursMap, harvestTime,
					Const.JOB_STRING_FOR_PLAN_RESOURCE + twelveHours.get(0).getId());
		}
		if(!twentyFourHours.isEmpty()){
			Map<String, Object> twentyFourHoursMap = new HashMap<String,Object>();
			twentyFourHoursMap.put("userFields", twentyFourHours);
			// 开启成长job
			long harvestTime = this.getResourceTime(twentyFourHours.get(0).getGrowTime(), characterId);
			setBatchKey(twentyFourHours, twentyFourHours.get(0).getId());
			ExecuteJob.add(ResourceGrowingJob.class, twentyFourHoursMap, harvestTime,
					Const.JOB_STRING_FOR_PLAN_RESOURCE + twentyFourHours.get(0).getId());
		}
	}
	
	private void setBatchKey(List<UserField> userFields, int batchKey){
		for(UserField i:userFields){
			i.setBatchKey(batchKey);
		}
	}

	// 整地
	/**
	 * 整地（删除地块资源）
	 * 
	 * @param characterId
	 * @param fieldId
	 * @param fieldType
	 * @throws AppException
	 */
	public void deleteResourceField(int characterId, int fieldId, int fieldType)
			throws AppException {
		UserField userField = getSpecificUserField(characterId, fieldId,
				fieldType);
		if (userField == null||userField.getFieldStatus() == Const.FIELD_STATUS_EFFECT) {
			throw new AppException("当前地块状态无法执行整地操作");
		}
		Maincity maincity = maincityService.getMaincity(characterId);
		if (userField.getFieldStatus() == Const.FIELD_STATUS_GROWING) {
			stopResourceJob(userField);
//			userField.setFieldStatus(Const.FIELD_STATUS_NULL);
//			updateResourceField(userField);
			resourceMapper.deleteResource(userField);
			// 更新工作人口
			maincityService.updateWorkingPeople(
					characterId,
					maincity.getWorkingPeople()
							- Const.FIELD_RESOURCE_NEED_PEOPLE_LIST
									.get(userField.getGrowTime()));
		} else if (userField.getFieldStatus() == Const.FIELD_STATUS_ADULTNESS) {
//			userField.setFieldStatus(Const.FIELD_STATUS_NULL);
//			updateResourceField(userField);
			resourceMapper.deleteResource(userField);
			// 更新工作人口
			maincityService.updateWorkingPeople(
					characterId,
					maincity.getWorkingPeople()
							- Const.FIELD_RESOURCE_NEED_PEOPLE_LIST
									.get(userField.getGrowTime()));
		} else {
			throw new AppException("资源块状态错误，整地操作执行失败");
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		switch (fieldType) {
		case Const.RESOURCE_TYPE_FOOD:
			questService.updateQuestSchedule(QuestTargeType.PLAN_FOOD_AMOUNT, null, characterId);
			
			break;
		case Const.RESOURCE_TYPE_WOOD:
			questService.updateQuestSchedule(QuestTargeType.PLAN_WOOD_AMOUNT, null, characterId);
			
			break;
		case Const.RESOURCE_TYPE_STONE:
			questService.updateQuestSchedule(QuestTargeType.PLAN_STONE_AMOUNT, null, characterId);
			
			break;
		case Const.RESOURCE_TYPE_IRONORE:
			questService.updateQuestSchedule(QuestTargeType.PLAN_IRONORE_AMOUNT, null, characterId);
			
			break;

		default:
			break;
		}
	}
	
	private final void stopResourceJob(UserField userField) throws AppException{
		if(userField.getBatchKey()==0){
			ExecuteJob.cancel(Const.JOB_STRING_FOR_PLAN_RESOURCE
					+ userField.getId());
		}else{
			List<UserField> sameTimeField = getUserFieldWithSameTime(userField.getCharacterId(), userField.getBatchKey());
			if(sameTimeField.isEmpty()){
				throw new AppException("查询地块错误");
			}
			int i=0;
			int index = 0;
			for(UserField uf:sameTimeField){
				if(uf.getId()==userField.getId()){
					index = i;
					break;
				}
				i++;
			}
			ExecuteJob.modifySuburbResourceData(Const.JOB_STRING_FOR_PLAN_RESOURCE+sameTimeField.get(0).getId(), index);
			
		}
	}

	// 更新资源块
	/**
	 * 插入新的资源块
	 * 
	 * @param characterId
	 * @param fieldId
	 * @param fieldType
	 * @param fieldStatus
	 */
	public UserField addNewResourceField(int characterId, int fieldId,
			int fieldType, int fieldStatus, int growTime, Date harvestTime) {
		UserField userField = new UserField();
		userField.setCharacterId(characterId);
		userField.setFieldId(fieldId);
		userField.setFieldType(fieldType);
		userField.setFieldStatus(fieldStatus);
		userField.setGrowTime(growTime);
		userField.setHarvestTime(harvestTime);
		resourceMapper.insertNewField(userField);
		return userField;
	}

	/**
	 * 更新资源块信息
	 * 
	 * @param userField
	 */
	public void updateResourceField(UserField userField) {
		resourceMapper.updateResourceField(userField);
	}
	/**
	 * 根据地块获得当前地块的收获时间
	 * @param index
	 * @param characterId
	 * @return
	 */
	private final long getResourceTime(int index,int characterId){
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		long harvestTime = System.currentTimeMillis()
				+ interiorTech.getValueAfterEffect(InteriorTechEffectType.RESOURCE_HARVEST_TIME, Const.FIELD_RESOURCE_LIST.get(index)* Const.CHANGE_MINUTE_TO_MILLISECOND_test, characterId);
		return harvestTime;
	}
	/**
	 * 获取玩家资源块信息
	 * 
	 * @param characterId
	 * @return
	 */
	public List<UserField> getUserFieldByCharId(int characterId) {
		return resourceMapper.getUserFieldByCharId(characterId);
	}
	/**
	 * 根据种植类型返回该种植类型已使用的地块数量
	 * @param characterId
	 * @param type
	 * @return
	 */
	public int getUsedFieldByType(int characterId,int type){
		List<UserField> userFields = this.getUserFieldByCharId(characterId);
		if (userFields == null || userFields.isEmpty()) {
			return 0;
		}
		int sum = 0;
		for (UserField i : userFields) {
			if(type != i.getFieldType()){
				continue;
			}
			if(i.getFieldStatus() == Const.FIELD_STATUS_GROWING || i.getFieldStatus() == Const.FIELD_STATUS_ADULTNESS){
				sum++;
			}
		}
		return sum;
	}
	public UserField getSpecificUserField(int characterId, int fieldId,
			int fieldType) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("fieldId", fieldId);
		param.put("fieldType", fieldType);
		return resourceMapper.getSpecificUserField(param);
	}
	public List<UserField> getUserFieldWithSameTime(int characterId, int batchKey) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("batchKey", batchKey);
		return resourceMapper.getUserFieldWithSameTime(param);
	}

	public List<UserField> getUserFieldByCharIdAndStatus(int characterId,
			int fieldStatus) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("fieldStatus", fieldStatus);
		return resourceMapper.getUserFieldByCharIdAndStatus(param);
	}
    public int getUserResourceCount(int characterId,int fieldStatus){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("characterId", characterId);
    	param.put("fieldStatus", fieldStatus);
    	return resourceMapper.getUserResourceCount(param);
    	
    }
    
	public ResourceMapper getResourceMapper() {
		return resourceMapper;
	}

	public void setResourceMapper(ResourceMapper resourceMapper) {
		this.resourceMapper = resourceMapper;
	}

	public MaincityService getMaincityService() {
		return maincityService;
	}

	public void setMaincityService(MaincityService maincityService) {
		this.maincityService = maincityService;
	}
}
