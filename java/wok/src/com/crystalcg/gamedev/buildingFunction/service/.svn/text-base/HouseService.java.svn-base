package com.crystalcg.gamedev.buildingFunction.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.dao.HouseDao;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ResourceMath;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * 民居
 * @author xuzhongxing
 *
 */
public class HouseService {
	
	private HouseDao houseDao;
	public Map<String,Integer> initHouse(int characterId){
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		Maincity maincity = maincityService.getMaincity(characterId);
		Map<String,Integer> retMap = new HashMap<String,Integer>();
		int peopleLimit = (int)interiorTech.getValueAfterEffect(InteriorTechEffectType.PEAPLE_LIMIT, maincity.getPeopleLimit(), characterId);
		retMap.put("peopleLimit",  peopleLimit);
		retMap.put("people", maincity.getPeople());
		retMap.put("peopleIncrease",(int)interiorTech.getValueAfterEffect(InteriorTechEffectType.PEOPLE_INCREASE_SPEED,(long)(ResourceMath.getPeopleIncrease(characterId, maincity.getPeopleLimit())*3600), characterId));
		int money = (int)interiorTech.getValueAfterEffect(InteriorTechEffectType.MONEY_VOLUME_OF_PRODUCTION, (long)ResourceMath.getMoneyIncrease(maincity.getPeople(), maincity.getLevel(), characterId)*3600, characterId);
		retMap.put("moneyIncrease",money);
		retMap.put("workingPeople",maincity.getWorkingPeople());
		retMap.put("popularSupport",maincity.getPopularSupport());
		retMap.put("popularSupportLimit", Const.POPULAR_SUPPORT_LIMIT);
		return retMap;
	}
	
//	public List<Map<String,Object>> getDefenceworks(int charId){
//		List<Map<String,Object>> ret = houseDao.getDefenceworks(charId);
//		for(Map<String,Object> m : ret){
//			m.put("upperLimit", Const.UPPER_LIMIT_PER_LEVEL);
//		}
//		return ret;
//	}
//	
//	public List<Map<String,Object>> getDefenceHero(int charId){
//		List<Map<String,Object>> ret = houseDao.getDefenceHero(charId);
//		for(Map<String,Object> m : ret){
//			m.put("curentHp", parse(m.get("curentHp")));
//			m.put("hp", parse(m.get("hp")));
//		}
//		return ret;
//	}
//	
//	public Map<String,Integer> getRiverInfo(int charId){
//		int blockedRiver = houseDao.getBlockedRiver(charId);
//		Map<String,Integer> retMap = new HashMap<String,Integer>();
//		retMap.put("needPeople", Const.RIVEL_NEED_PEOPLE);
//		retMap.put("needMoney", Const.RIVEL_NEED_MONEY);
//		retMap.put("blockedRiver", blockedRiver);
//		retMap.put("clearRiver", 100 - blockedRiver);
//		return retMap;
//	}
	
	public List<Map<String,Object>> getHeroForCollege(int charId){
		return houseDao.getHeroForCollege(charId);
	}
	public List<Map<String,Object>> getAllSkill(){
		return houseDao.getAllSkill();
	}
	public List<Map<String,Object>> getLearnedSkill(int charId,int userHeroId){
		return houseDao.getLearnedSkill(charId,userHeroId);
	}
	public List<Map<String,Object>> getCanLearnSkill(int charId,int userHeroId){
		return houseDao.getCanLearnSkill(charId,userHeroId);
	}
	public List<Map<String,Object>> getCannotLearnSkill(int charId,int userHeroId){
		return houseDao.getCannotLearnSkill(charId,userHeroId);
	}
	
//	public Map<String,Object> getAlliance(int charId){
//		Map<String,Object> ret = houseDao.getAlliance(charId);
//		if(ret==null){
//			ret = new HashMap<String,Object>();
//			ret.put("needMoney", Const.ALLIANCE_NEED_MONEY);
//		}
//		return ret;
//	}
//	
//	private int parse(Object obj){
//		if(obj==null){
//			return 0;
//		}else{
//			return ((Double)obj).intValue();
//		}
//	}

	public HouseDao getHouseDao() {
		return houseDao;
	}

	public void setHouseDao(HouseDao houseDao) {
		this.houseDao = houseDao;
	}

}
