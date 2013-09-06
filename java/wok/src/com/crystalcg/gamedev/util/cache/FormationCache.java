package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.util.cache.domain.StaticFormation;
import com.crystalcg.gamedev.util.cache.domain.StaticFormationTech;

public class FormationCache {
	private static int PAGES; 
	private static final int PAGE_SIZE = 4;
	private static Logger logger = LoggerFactory.getLogger(FormationCache.class);
	private static Map<String, StaticFormation> FORMATION_STORE_BY_NO;
	private static Map<String, StaticFormationTech> FORMATION_TECH_STORE_BY_NO;
	private static List<String> FORMATION_TECH_PEFIX;
	private FormationCache(CacheMapper cacheMapper){
		FORMATION_STORE_BY_NO = new HashMap<String, StaticFormation>();
		FORMATION_TECH_STORE_BY_NO = new HashMap<String, StaticFormationTech>();
		FORMATION_TECH_PEFIX = new ArrayList<String>();
		List<StaticFormation> staticFormations = cacheMapper.getStaticFormation();
		List<StaticFormationTech> staticFormationTechs = cacheMapper.getStaticFormationTech();
		for(StaticFormation i:staticFormations){
			setEffectDesc(i);
			FORMATION_STORE_BY_NO.put(i.getFormationNo(), i);
		}
		for(StaticFormationTech i:staticFormationTechs){
			FORMATION_TECH_STORE_BY_NO.put(i.getTechNo(), i);
			if(i.getTechLevel()==1){
				FORMATION_TECH_PEFIX.add(i.getTechNo().split("_")[0]);
			}
		}
		PAGES = (FORMATION_TECH_PEFIX.size() +PAGE_SIZE-1)/PAGE_SIZE;
		logger.info("formation and formationTech has successfully loaded");
	}
	
	/**
	 * 通过编号获取阵型实体
	 * @param formationNo
	 * @return
	 */
	public static StaticFormation getFormationByNo(String formationNo) throws AppException{
		StaticFormation staticFormation = FORMATION_STORE_BY_NO.get(formationNo);
		if(staticFormation ==null){
			logger.error("获取阵法静态信息失败");
			throw new AppException("获取阵法失败");
		}
		return staticFormation;
	}
	/**
	 * 通过编号获取阵型科技实体
	 * @param techNo
	 * @return
	 */
	public static StaticFormationTech getFormationTechByNo(String techNo){
		return FORMATION_TECH_STORE_BY_NO.get(techNo);
	}
	public static StaticFormation getFormationByTechNo(String techNo){
		return FORMATION_STORE_BY_NO.get(FORMATION_TECH_STORE_BY_NO.get(techNo).getFormationNo());
	}
	private static void setEffectDesc(StaticFormation i){
		String effectString = i.getEffectDescription();
		String retString = "";
		String soldier1 = getSoldierString(i.getApplyToSoldier1());
		if(i.getEffect1()>0){
			retString+=soldier1+effectString+"增加"+i.getEffect1()+"%,";
		}else{
			retString+=soldier1+effectString+"减少"+(-i.getEffect1())+"%,";
		}
		String soldier2 = getSoldierString(i.getApplyToSoldier2());
		if(i.getEffect2()>0){
			retString+=soldier2+effectString+"增加"+i.getEffect2()+"%,";
		}else{
			retString+=soldier2+effectString+"减少"+(-i.getEffect2())+"%,";
		}
		String soldier3 = getSoldierString(i.getApplyToSoldier3());
		if(i.getEffect3()>0){
			retString+=soldier3+effectString+"增加"+i.getEffect3()+"%";
		}else{
			retString+=soldier3+effectString+"减少"+(-i.getEffect3())+"%";
		}
		i.setEffectDescription(retString);
		
	}
	private static String getSoldierString(int type){
		switch (type) {
		case 1:
			
			return "刀兵";
		case 2:
			
			return "枪兵";
		case 3:
			
			return "骑兵";
		case 4:
			
			return "弓兵";
		case 5:
			
			return "投石车";

		default:
			logger.error("阵型影响的兵种类型错误");
			return "无";
		}
	}
	public static StaticFormationTech getFormationTechByLocationAndLevel(int location, int level){
		return getFormationTechByNo(FORMATION_TECH_PEFIX.get(location)+"_"+level);
	}
	public static List<String> getFormationTechPrefixByPage(int page){
		if(page != PAGES){
			return FORMATION_TECH_PEFIX.subList(PAGE_SIZE*(page-1), page*PAGE_SIZE);
		}else{
			return FORMATION_TECH_PEFIX.subList(PAGE_SIZE*(page-1), FORMATION_TECH_PEFIX.size());
		}
	}
	public static List<String> getAllFormationTechPrefix(){
		return FORMATION_TECH_PEFIX;
	}
	public static StaticFormationTech getNextTech(StaticFormationTech staticFormationTech){
		String[] strings = staticFormationTech.getTechNo().split("_");
		int level = Integer.parseInt(strings[1]);
		level++;
		return getFormationTechByNo(strings[0]+"_"+level);
	}
	public static StaticFormationTech getPreviousTech(StaticFormationTech staticFormationTech){
		String[] strings = staticFormationTech.getTechNo().split("_");
		int level = Integer.parseInt(strings[1]);
		level--;
		return getFormationTechByNo(strings[0]+"_"+level);
	}
	public static StaticFormation getNextFormation(StaticFormation staticFormation) throws AppException{
		String[] strings = staticFormation.getFormationNo().split("_");
		int level = Integer.parseInt(strings[1]);
		level++;
		return getFormationByNo(strings[0]+"_"+level);
	}
	/**
	 * 获取阵法科技页码数
	 * @return
	 */
	public static int getFormationTechPages(){
		return PAGES;
	}
	/**
	 * 获取阵法科技每页元素个数
	 * @return
	 */
	public static int getFormationTechPageSize(){
		return PAGE_SIZE;
	}
}
