package com.crystalcg.gamedev.util;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;


public class ChangeToMap {
	public static Map<String, Object> changeObjectToMap(Object object){
		Field[] fields = object.getClass().getDeclaredFields();
		Map<String, Object> retMap = new HashMap<String, Object>();
		for(Field i:fields){
			i.setAccessible(true);
			try {
				if(i.getType().equals(double.class)){
					double temp = (Double)i.get(object);
					retMap.put(i.getName(), (int)temp);
				}else{
					retMap.put(i.getName(), i.get(object));
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return retMap;
	}
	/**
	 * 转化成COMETD普通系统频道数据Map格式
	 * @param systemType
	 * @param data
	 * @return
	 */
	public static Map<String, Object> changeToCometMap(int systemType, Object data){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("systemType", systemType);
		retMap.put("systemData", data);
		return retMap;
	}
	/**
	 * 转化成COMETD的战斗频道数据Map格式
	 * @param systemType
	 * @param data
	 * @return
	 */
	public static Map<String, Object> changeToBattleCometMap(int systemType, Object data){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("battleMessageType", systemType);
		retMap.put("battleMessageData", data);
		return retMap;
	}
//	/**
//	 * 将元宝转化为金，银
//	 * @param cash
//	 * @return
//	 */
//	public static Map<String, Object> changeCashToMap(int cash){
//		if(cash==0){
//			return null;
//		}else{
//			Map<String, Object> retMap = new HashMap<String,Object>();
//			retMap.put("silver", cash%Const.SILVER_TO_GOLD);
//			retMap.put("gold", (int)cash/Const.SILVER_TO_GOLD);
//			return retMap;
//		}
//	}
}
