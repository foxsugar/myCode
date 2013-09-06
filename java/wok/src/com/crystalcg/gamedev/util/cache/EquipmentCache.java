package com.crystalcg.gamedev.util.cache;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticEquipment;

public class EquipmentCache {
	private static Logger logger = LoggerFactory.getLogger(EquipmentCache.class);
	private static Map<String, StaticEquipment> EQUIPMENT_STORE;
	private EquipmentCache(CacheMapper cacheMapper){
		EQUIPMENT_STORE = new HashMap<String, StaticEquipment>();
		List<StaticEquipment> equipments = cacheMapper.getStaticEquipment();
		for(StaticEquipment i :equipments){
			EQUIPMENT_STORE.put(i.getEquipmentNo(), i);
			i.setItemType(Const.TYPE_EQUIPMENT);
		}
		logger.info("装备信息加载成功");
	}
	/**
	 * 通过no查找装备静态信息
	 * @param equipmentNo
	 * @return
	 */
	public static StaticEquipment getEquipmentByNo(String equipmentNo) throws AppException{
		StaticEquipment staticEquipment = EQUIPMENT_STORE.get(equipmentNo);
		if(staticEquipment==null){
			logger.error("EquipmentCache can not get a equipment of the NO");
			throw new AppException("不存在该编号的装备");
		}
		return staticEquipment;
	}
	/**
	 * 通过no查找装备静态信息
	 * @param equipmentNo
	 * @return
	 */
	public static Collection<StaticEquipment> getAllEquipment(){
		return EQUIPMENT_STORE.values();
	}
}
