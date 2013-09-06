package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticInteriorTech;

/**
 * 科技静态信息
 * @author jinganyang
 *
 */
public class InteriorTechCache {
	
	private static Logger logger = LoggerFactory.getLogger(InteriorTechCache.class);
	private static Map<String, StaticInteriorTech> INTERIOR_TECH_STORE;//内政科技实体
	private static List<String> PREFIX_OF_KEY; //通过Key取科技编号前缀;
	
	private InteriorTechCache(CacheMapper cacheMapper){
		INTERIOR_TECH_STORE = new HashMap<String, StaticInteriorTech>();
		PREFIX_OF_KEY = new ArrayList<String>();
		List<StaticInteriorTech> staticInteriorTechs = cacheMapper.getStaticInteriroTech();
		for(StaticInteriorTech i: staticInteriorTechs){
			INTERIOR_TECH_STORE.put(i.getTechNo(), i);
//			getEffectDesc(i);
			if(i.getTechLevel()==1){
				PREFIX_OF_KEY.add(i.getTechNo().split("_")[0]+"_");
			}
		}
		logger.info("InteriorTechCache has successfully loaded");
	}
//	private void getEffectDesc(StaticInteriorTech i){
//		switch (i.getEffectType()) {
//		case 1:
//			i.setTechEffectDesc("提高人口上限");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//		case 2:
//			i.setTechEffectDesc("提高士兵上限");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//		case 3:
//			i.setTechEffectDesc("提高城防上限");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 4:
//			i.setTechEffectDesc("增加城池繁荣值的恢复速度");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 5:
//			i.setTechEffectDesc("增加人口的增长速度");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 6:
//			i.setTechEffectDesc("增加药膏的增长速度");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 7:
//			i.setTechEffectDesc("减少建筑时间和城防生产时间");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 8:
//			i.setTechEffectDesc("减少训练时间");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 9:
//			i.setTechEffectDesc("减少资源成熟时间");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 10:
//			i.setTechEffectDesc("奖励获得声望的系数");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 11:
//			i.setTechEffectDesc("增加铜币产量");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 12:
//			i.setTechEffectDesc("增加木材产量（基础）");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 13:
//			i.setTechEffectDesc("增加石料产量（基础）");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 14:
//			i.setTechEffectDesc("提高人口上限");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 15:
//			i.setTechEffectDesc("增加铁锭产量(基础）");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 16:
//			i.setTechEffectDesc("地窖的保护资源数目");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 17:
//			i.setTechEffectDesc("减少科研时间");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		case 18:
//			i.setTechEffectDesc("民心恢复速度");
//			i.setTechEffectValue(i.getEffectValue()+(i.getValueType()==2?"%":""));
//			break;
//			
//		default:
//			logger.error("interior tech effect type error");
//			break;
//		}
//	}
	/**
	 * 通过No获取内政科技静态实体
	 * @param techNo
	 * @return
	 */
	public static StaticInteriorTech getInteriorTechByNo(String techNo){
		return INTERIOR_TECH_STORE.get(techNo);
	}
	public static List<String> getPrefixOfKey(){
		return PREFIX_OF_KEY;
	}
	public static StaticInteriorTech getInteriorTechByKeyAndLevel(int techKey, int techLevel){
		return getInteriorTechByNo(PREFIX_OF_KEY.get(techKey)+techLevel);
	}
	public static int getMaxLevel(int collegeLevel){
		return (collegeLevel+1)/2;
	}
	
}
