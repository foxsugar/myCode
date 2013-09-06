package com.crystalcg.gamedev.buildingFunction.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.RandomFunc;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.EquipmentCache;
import com.crystalcg.gamedev.util.cache.MaterialCache;
import com.crystalcg.gamedev.util.cache.ProducePlanCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEquipment;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;
import com.crystalcg.gamedev.util.cache.domain.StaticProducePlan;

/**
 * 装备打造
 * @author jinganyang
 *
 */
public class EquipDesignService {

	// private final static int COUNTS_ONE=1;

	/**
	 * 获取游戏中装备的类别
	 * 
	 * @return 返回装备所有类别，如头盔，胸甲，武器等
	 */
	public List<Map<String, Object>> getEquipSubTypeCanBeMade() {
		return Const.EQUIPMENT_TYPE;
	}

	/**
	 * 获取所有可打造的装备,用于装备展示
	 * 
	 * @param subType
	 *            装备类型
	 * @return 返回该类型的所有能打造的装备信息，如名称，描述，属性等
	 */
	public Object getEquipCanBeMadeForViewByType(int subType) {
		return ProducePlanCache.getProductionName(subType);
	}

	/**
	 * 获取打造信息
	 * @param characterId
	 * @param planNo
	 * @param materialLevel
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> getProduceInfo(int characterId, String planNo,
			int materialLevel) throws AppException {
		UserItemService userItemService = (UserItemService) ServiceLocator
				.getSpringBean("userItemService");
		List<StaticProducePlan> needMaterials = ProducePlanCache.getNeedMaterial(planNo);
		if (needMaterials.isEmpty()) {
			throw new AppException("请选择正确的装备");
		}
		List<String> needMaterialName = new ArrayList<String>();
		List<Object> needAmount = new ArrayList<Object>();
		List<Integer> haveAmount = new ArrayList<Integer>();
		// 需求和拥有材料信息
		for (StaticProducePlan i : needMaterials) {
			StaticMaterial needMaterial = MaterialCache.getMaterialByNo(i.getNeedMaterialNo() + "_" + materialLevel);
			List<UserMaterial> haveMaterials = userItemService
					.getUserMaterialByItemNo(needMaterial.getMaterialNo(), characterId,
							Const.BOTH_BIND_AND_NOT_BIND);
			needMaterialName.add(needMaterial.getMaterialName());
			needAmount.add(i.getNeedMaterialAmount());
				int amount = 0;
			for (UserMaterial j : haveMaterials) {
				amount += j.getItemAmount();
			}
			haveAmount.add(amount);
		}
		List<UserMaterial> havePlan = userItemService.getUserMaterialByItemNo(
				planNo, characterId, Const.BOTH_BIND_AND_NOT_BIND);
		int planAmount = 0;
		for (UserMaterial i : havePlan) {
			planAmount += i.getItemAmount();
		}
		needMaterialName.add(ProducePlanCache.getPlanName(planNo));
		needAmount.add(1);// 每次需要消耗1个图样
		haveAmount.add(planAmount);
		// 需求铜币信息
		needMaterialName.add("铜币");
		needAmount.add(ProducePlanCache.getNeedMoney(planNo,
				materialLevel));
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("needMaterialName", needMaterialName);
		retMap.put("needAmount", needAmount);
		retMap.put("haveAmount", haveAmount);
		String prefix = ProducePlanCache.getProductionPrefix(planNo);
		List<StaticEquipment> produces = new ArrayList<StaticEquipment>();
		//获取图样1到6品装备
		produces.add(EquipmentCache.getEquipmentByNo(prefix+"_"+1));
		produces.add(EquipmentCache.getEquipmentByNo(prefix+"_"+2));
		produces.add(EquipmentCache.getEquipmentByNo(prefix+"_"+3));
		produces.add(EquipmentCache.getEquipmentByNo(prefix+"_"+4));
		produces.add(EquipmentCache.getEquipmentByNo(prefix+"_"+5));
		produces.add(EquipmentCache.getEquipmentByNo(prefix+"_"+6));
		retMap.put("productions", getProductionMap(produces));
		return retMap;
	}
	
	/**
	 * 打造
	 * @param characterId
	 * @param planNo
	 * @param materialLevel
	 * @param produceAmount
	 * @return
	 * @throws AppException
	 */
	public List<Integer> produce(int characterId, String planNo, int materialLevel, int produceAmount) throws AppException{
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		if(userItemService.getTreasuryRemain(characterId)<produceAmount){
			throw new AppException("背包空间不足");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		List<StaticProducePlan> needMaterials = ProducePlanCache.getNeedMaterial(planNo);
		Maincity maincity = maincityService.getMaincity(characterId);
		if (needMaterials.isEmpty()) {
			throw new AppException("请选择正确的装备");
		}
		List<Integer> needAmount = new ArrayList<Integer>();
		List<Integer> haveAmount = new ArrayList<Integer>();
		List<List<UserMaterial>> haveMaterials = new ArrayList<List<UserMaterial>>();
		// 需求和拥有材料信息
		for (StaticProducePlan i : needMaterials) {
			StaticMaterial needMaterial = MaterialCache.getMaterialByNo(i.getNeedMaterialNo() + "_" + materialLevel);
			List<UserMaterial> haveMaterial = userItemService
					.getUserMaterialByItemNo(needMaterial.getMaterialNo(), characterId,
							Const.BOTH_BIND_AND_NOT_BIND);
			haveMaterials.add(haveMaterial);
			needAmount.add(i.getNeedMaterialAmount());
			if (haveMaterial.isEmpty()) {
				throw new AppException("材料不足");
			} else {
				int amount = 0;
				for (UserMaterial j : haveMaterial) {
					amount += j.getItemAmount();
				}
				haveAmount.add(amount);
			}
		}
		// 需求和拥有图样信息
		List<UserMaterial> havePlan = userItemService.getUserMaterialByItemNo(
				planNo, characterId, Const.BOTH_BIND_AND_NOT_BIND);
		haveMaterials.add(havePlan);
		if(havePlan.isEmpty()){
			throw new AppException("图样不足");
		}
		int planAmount = 0;
		for (UserMaterial i : havePlan) {
			planAmount += i.getItemAmount();
		}
		needAmount.add(1);// 每次需要消耗1个图样
		haveAmount.add(planAmount);
		// 需求铜币数
		needAmount.add(ProducePlanCache.getNeedMoney(planNo,materialLevel));
		//验证
		if(!validateAmount(needAmount, haveAmount, produceAmount, maincity)){
			throw new AppException("材料不足，无法打造");
		}
		List<Integer> quality = produceOperate(havePlan, produceAmount, ProducePlanCache.getRates(materialLevel), ProducePlanCache.getProductionPrefix(planNo), characterId);
		updateUserMaterial(needAmount, haveMaterials, produceAmount, maincity);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.EQUIPMENT_PRODUCE, null, characterId);
		return quality;
	}
	
	
	/**
	 * 验证材料数量
	 * @param needAmount
	 * @param haveAmount
	 * @param produceAmount
	 * @param maincity
	 * @return
	 */
	private boolean validateAmount(List<Integer> needAmount, List<Integer> haveAmount, int produceAmount, Maincity maincity){
		for(int i=0;i<haveAmount.size();i++){
			if(haveAmount.get(i)<needAmount.get(i)*produceAmount){
				return false;
			}
		}
		if(maincity.getMoney()<needAmount.get(needAmount.size()-1)*produceAmount){
			return false;
		}
		return true;
		
	}
	/**
	 * 非通用方法，制造装备
	 * @param havePlan
	 * @param produceAmount
	 * @param rates
	 * @param productionNo
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	private List<Integer> produceOperate(List<UserMaterial> havePlan, int produceAmount, List<Double> rates, String productionNo, int characterId) throws AppException{
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		int bindAmount = 0;
		int notBindAmount = 0;
		for(UserMaterial i:havePlan){
			if(i.getItemAmount()<produceAmount){
				produceAmount-=i.getItemAmount();
				if(i.getIsBound()==Const.IS_BIND_STATE){
					bindAmount+=i.getItemAmount();
				}else{
					notBindAmount+=i.getItemAmount();
				}
			}else{
				if(i.getIsBound()==Const.IS_BIND_STATE){
					bindAmount+=produceAmount;
				}else{
					notBindAmount+=produceAmount;
				}
				break;
			}
		}
		List<Integer> qualities = new ArrayList<Integer>();
		for(int i=0;i<bindAmount+notBindAmount;i++){
			qualities.add(RandomFunc.whichQuility(rates.get(0), rates.get(1), rates.get(2), rates.get(3), rates.get(4), rates.get(5)));
		}
		for(int i=0;i<bindAmount;i++){
			userItemService.addItem2character(characterId, productionNo+"_"+qualities.get(i), Const.TYPE_EQUIPMENT, Const.IS_BIND_STATE);
		}
		for(int i=0;i<notBindAmount;i++){
			userItemService.addItem2character(characterId, productionNo+"_"+qualities.get(bindAmount+i), Const.TYPE_EQUIPMENT, Const.IS_NOT_BIND_STATE);
		}
		return qualities;
	}
	/**
	 * 非通用方法，更新用户包内材料
	 * @param needAmount
	 * @param haveMaterials
	 * @param produceAmount
	 * @param maincity
	 */
	private void updateUserMaterial(List<Integer> needAmount, List<List<UserMaterial>> haveMaterials, int produceAmount, Maincity maincity){
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		List<UserMaterial> needUpdate = new ArrayList<UserMaterial>();
		for(int i=0;i<haveMaterials.size();i++){
			int needTotalAmount = needAmount.get(i)*produceAmount;
			List<UserMaterial> materials = haveMaterials.get(i);
			for(UserMaterial j :materials){
				if(j.getItemAmount()<needTotalAmount){
					needTotalAmount -= j.getItemAmount();
					j.setItemAmount(0);
					needUpdate.add(j);
				}else{
					j.setItemAmount(j.getItemAmount()-needTotalAmount);
					needUpdate.add(j);
					break;
				}
			}
		}
		for(UserMaterial i:needUpdate){
			if(i.getItemAmount()==0){
				userItemService.deleteFromUserItem(i.getId());
			}else{
				userItemService.updateUserItemAmount(i.getId(), i.getItemAmount());
			}
		}
		maincityService.addMoney(maincity.getCharacterId(), -needAmount.get(needAmount.size()-1)*produceAmount);
	}


	private List<Map<String, Object>> getProductionMap(
			List<StaticEquipment> equipments) throws AppException{
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		Map<String, Object> production;
		for (int i = 0; i < equipments.size(); i++) {
			production = new HashMap<String,Object>();
			production.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(equipments.get(i)));
			production.put("type", equipments.get(i).getItemType());
			production.put("icon", equipments.get(i).getIcon());
			retList.add(production);
		}
		return retList;
	}


}
