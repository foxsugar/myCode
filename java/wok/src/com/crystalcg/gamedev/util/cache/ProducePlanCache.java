package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.util.cache.domain.StaticProducePlan;
import com.crystalcg.gamedev.util.cache.domain.StaticProduceReward;

public class ProducePlanCache {
	private static Map<String, List<StaticProducePlan>> PRODUCE_PLAN_STORE;
//	private static Map<String, Map<String, Object>> PRODUCE_PLAN_VIEW_STORE;
	private static Map<Integer, List<Double>> PRODUCTION_RATE_STORE;//成功率
	private static Map<Integer, List<Map<String, String>>> PRODUCTION_NAME;
	private ProducePlanCache(CacheMapper cacheMapper) throws AppException{
		PRODUCE_PLAN_STORE = new HashMap<String, List<StaticProducePlan>>();
//		PRODUCE_PLAN_VIEW_STORE = new HashMap<String,Object>();
		PRODUCTION_RATE_STORE = new HashMap<Integer, List<Double>>();
		PRODUCTION_NAME = new HashMap<Integer, List<Map<String,String>>>();
		List<StaticProducePlan> staticProducePlans = cacheMapper.getStaticProducePlan();
		for(StaticProducePlan i:staticProducePlans){
			if(PRODUCE_PLAN_STORE.containsKey(i.getPlanNo())){
				PRODUCE_PLAN_STORE.get(i.getPlanNo()).add(i);
			}else{
				List<StaticProducePlan> temp = new ArrayList<StaticProducePlan>();
				temp.add(i);
				PRODUCE_PLAN_STORE.put(i.getPlanNo(), temp);
			}
		}
		Iterator<List<StaticProducePlan>> it = PRODUCE_PLAN_STORE.values().iterator();
		while (it.hasNext()) {
			StaticProducePlan i = ((List<StaticProducePlan>) it.next()).get(0);
			if(PRODUCTION_NAME.containsKey(i.getProduceType())){
				Map<String, String> temp = new HashMap<String, String>();
				temp.put("equipmentName", i.getProduceName());
				temp.put("planNo", i.getPlanNo());
				PRODUCTION_NAME.get(i.getProduceType()).add(temp);
			}else{
				List<Map<String, String>> tempList = new ArrayList<Map<String,String>>();
				Map<String, String> temp = new HashMap<String, String>();
				temp.put("equipmentName", i.getProduceName());
				temp.put("planNo", i.getPlanNo());
				tempList.add(temp);
				PRODUCTION_NAME.put(i.getProduceType(), tempList);
			}
		}
		List<StaticProduceReward> staticProduceRewards = cacheMapper.getStaticProduceReward();
		PRODUCTION_RATE_STORE = new HashMap<Integer, List<Double>>();
		List<Double> rates;
		for(StaticProduceReward i:staticProduceRewards){
			rates = new ArrayList<Double>();
			rates.add(i.getQualityRate1());
			rates.add(i.getQualityRate2());
			rates.add(i.getQualityRate3());
			rates.add(i.getQualityRate4());
			rates.add(i.getQualityRate5());
			rates.add(i.getQualityRate6());
			PRODUCTION_RATE_STORE.put(i.getMaterialLevel(), rates);
		}
	}
	/**
	 * 获取可打造的装备名称
	 * @param equipmentType
	 * @return
	 */
	public static Object getProductionName(int equipmentType){
		return PRODUCTION_NAME.get(equipmentType);
	}
	/**
	 * 获取图样所需材料
	 * @param planNo
	 * @return
	 */
	public static List<StaticProducePlan> getNeedMaterial(String planNo){
		return PRODUCE_PLAN_STORE.get(planNo);
	}
	/**
	 * 获取图样名称
	 * @param planNo
	 * @return
	 */
	public static String getPlanName(String planNo){
		return PRODUCE_PLAN_STORE.get(planNo).get(0).getPlanName();
	}
//	/**
//	 * 获取图样Id
//	 * @param planNo
//	 * @return
//	 */
//	public Integer getPlanId(String planNo){
//		return (Integer)((Map<String, Object>)((Map<String, Object>)store.get("producePlan")).get(planNo)).get("planId");
//	}
	/**
	 * 获取需要的铜币数
	 * @param planNo
	 * @param materialLevel
	 * @return
	 */
	public static int getNeedMoney(String planNo, int materialLevel){
		int moneyBase = PRODUCE_PLAN_STORE.get(planNo).get(0).getNeedBaseMoney();
		return moneyBase*materialLevel*materialLevel;
	}
	/**
	 * 获取生产概率
	 * @param materialLevel
	 * @return
	 */
	public static List<Double> getRates(int materialLevel){
		return PRODUCTION_RATE_STORE.get(materialLevel);
	}
	/**
	 * 获取可打造的装备前缀
	 * @param planNo
	 * @return
	 */
	public static String getProductionPrefix(String planNo){
		return PRODUCE_PLAN_STORE.get(planNo).get(0).getProductionNo();
	}
}
