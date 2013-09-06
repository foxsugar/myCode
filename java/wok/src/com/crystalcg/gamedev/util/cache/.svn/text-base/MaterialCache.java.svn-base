package com.crystalcg.gamedev.util.cache;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;

public class MaterialCache {
	private static Logger logger = LoggerFactory.getLogger(EquipmentCache.class);
	private static Map<String, StaticMaterial> MATERIAL_STORE;
	private MaterialCache(CacheMapper cacheMapper){
		MATERIAL_STORE = new HashMap<String, StaticMaterial>();
		List<StaticMaterial> materials = cacheMapper.getStaticMaterial();
		for(StaticMaterial i :materials){
			MATERIAL_STORE.put(i.getMaterialNo(), i);
			i.setItemType(Const.TYPE_MATERIAL);
		}
		logger.info("材料信息加载成功");
	}
	/**
	 * 通过no查找材料静态信息
	 * @param materialNo
	 * @return
	 */
	public static StaticMaterial getMaterialByNo(String materialNo){
		return MATERIAL_STORE.get(materialNo);
	}
	/**
	 * 通过no查找材料静态信息
	 * @param materialNo
	 * @return
	 */
	public static Collection<StaticMaterial> getMaterial(){
		return MATERIAL_STORE.values();
	}
}
