package com.crystalcg.gamedev.util.cache;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ComparatorHero;
import com.crystalcg.gamedev.util.ComparatorMaxFighting;
import com.crystalcg.gamedev.util.ComparatorUserFighting;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.NumericalComparator;
import com.crystalcg.gamedev.util.ServiceLocator;

public class RankingCache {
	private static List<Map<String,Object>> BUILDLIST;
	private static List<Map<String,Object>> LEVELlIST;
	private static List<Map<String,Object>> COMBATPOWERLIST = new ArrayList<Map<String,Object>>();
	private static List<Map<String,Object>> COMBATPOWERLAST = new ArrayList<Map<String,Object>>();
	private static List<Map<String,Object>> REPUTATIONLIST;
	private static List<Map<String,Object>> RECHARGELIST;
	private static List<Map<String,Object>> ALLIANCELIST;
	private static List<UserHero> HEROLIST;
	private static List<Map<String,Object>> ALLHEROLIST = new ArrayList<Map<String,Object>>();
	private static Map<Integer,Map<String,Object>> BUILDMAP;
	private static Map<Integer,Map<String,Object>> LEVELMAP;
	private static Map<Integer,Map<String,Object>> REPUTATIONMAP;
	private static Map<Integer,Map<String,Object>> RECHARGEMAP;
	private static Map<Integer,Map<String, Object>> ALLIANCEMAP;
	private static Map<Integer,Map<String, Object>> FIGHTINGMAP = new HashMap<Integer,Map<String,Object>>();
//	private static List<Map<String,Object>> SUMFIGHTINGMAP;

	
	private RankingCache(RankingMapper rankingMapper){
		loadData(rankingMapper);
	} 

	public static void loadData(RankingMapper rankingMapper){
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		BUILDLIST = rankingMapper.getBuildList();
		LEVELlIST = rankingMapper.getLevelList();
		REPUTATIONLIST = rankingMapper.getReputationList();
		RECHARGELIST = rankingMapper.getRechargeList();
		ALLIANCELIST = rankingMapper.getAllianceList();
		HEROLIST = userHeroService.getAllHero();
		BUILDMAP = new HashMap<Integer,Map<String,Object>>();
		RECHARGEMAP = new HashMap<Integer,Map<String,Object>>();
		LEVELMAP = new HashMap<Integer,Map<String,Object>>();
	    REPUTATIONMAP =	new HashMap<Integer,Map<String,Object>>();
	    ALLIANCEMAP = new HashMap<Integer,Map<String,Object>>();
//		for(int i=0;i<BUILDLIST.size();i++){
//			Map<String,Object> build = BUILDLIST.get(i);
//			build.put("rowNum", i+1);
//			Maincity maincity = maincityService.getMaincity((Integer)build.get("id"));
//			int cityExperienceLimit = 0;
//			for(int j=1;j<maincity.getLevel();j++){
//				cityExperienceLimit += CityCache.getExperienceLimitByLevel(i);
//			}        
//			build.put("experience",(Integer)build.get("experience")+cityExperienceLimit);
//			int countryId = (Integer) build.get("country_id");
//			build.put("country", CountryCache.getNameById(countryId));
//			build.remove("country_id");
//			BUILDMAP.put((Integer)build.get("id"), build);
//		}
		for(int i=0;i<LEVELlIST.size();i++){
			Map<String,Object> level = LEVELlIST.get(i);
			level.put("rowNum", i+1);
			int countryId = (Integer) level.get("country_id");
			level.put("country", CountryCache.getNameById(countryId));
			level.remove("country_id");
			LEVELMAP.put((Integer) level.get("id"),level);
		}
		for(int i=0;i<REPUTATIONLIST.size();i++){
			Map<String,Object> reputation = REPUTATIONLIST.get(i);
			reputation.put("rowNum",i+1);
			int countryId = (Integer) reputation.get("country_id");
			reputation.put("country", CountryCache.getNameById(countryId));
			reputation.remove("country_id");
			REPUTATIONMAP.put((Integer) reputation.get("id"), reputation);
		}
		for(int i=0;i<RECHARGELIST.size();i++){
			Map<String,Object> recharge = RECHARGELIST.get(i);	 
			recharge.put("rowNum", i+1);
			int countryId = (Integer) recharge.get("country_id");
			recharge.put("country", CountryCache.getNameById(countryId));
			recharge.remove("country_id");
			RECHARGEMAP.put((Integer) recharge.get("id"), recharge);
		}
		for(int i=0;i<ALLIANCELIST.size();i++){
			Map<String,Object> alliance = ALLIANCELIST.get(i);
			alliance.put("rowNum", i+1);
			ALLIANCEMAP.put((Integer) alliance.get("id"), alliance);
		}
		for(int i=0;i<HEROLIST.size();i++){
			UserHero userHero = HEROLIST.get(i);
			try {
				HeroAlgorithm.computeAttribute(userHero);		
			} catch (AppException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			List<UserHero> heroList = new ArrayList<UserHero>();
			heroList.add(userHero);
			double sumFighting =  HeroAlgorithm.computeFightingCapacity(heroList);
			double fighting =  HeroAlgorithm.computeSingleForce(userHero);
			BigDecimal b = new   BigDecimal(fighting);    
			double f1 = b.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue(); 
			BigDecimal b1 = new   BigDecimal(sumFighting);    
			double f2 = b1.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue(); 
			userHero.setFighting(f1);
			userHero.setSunFighting(f2);
		}
		buildComparator();
		comparator();
		heroFighting();
	}
	@SuppressWarnings("unchecked")
	private static void comparator(){
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		ComparatorHero comparator=new ComparatorHero();
		  Collections.sort(HEROLIST, comparator);
		  int j = 0;
		  for(int i=HEROLIST.size()-1;i>=0;i--){
			  UserHero userHero = HEROLIST.get(i);
			  UserCharacter userCharacter = characterService.getCharacterById(userHero.getCharacterId());
			  Map<String,Object> heroMap = new HashMap<String,Object>();
			  heroMap.put("characterId", userHero.getCharacterId());
			  heroMap.put("rowNum", ++j);
			  heroMap.put("heroName", userHero.getHeroName());
			  heroMap.put("level", userHero.getLevel());
			  heroMap.put("fighting", userHero.getFighting());
			  heroMap.put("characterName",userCharacter.getName());
			  heroMap.put("characterCountry",CountryCache.getNameById(userCharacter.getCountryId()));
			  ALLHEROLIST.add(heroMap);
		  }
	}
	@SuppressWarnings("unchecked")
	private static void heroFighting(){
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		List<Integer> chauacterIdList = characterService.getCharacterId();
		ComparatorMaxFighting cmf = new ComparatorMaxFighting();
		Collections.sort(HEROLIST, cmf);
		for(Integer id : chauacterIdList){
			Map<String,Object> combatPowerMap = new HashMap<String,Object>();
			List<UserHero> userHeroList = getMaxFighting(id);
			double fighting = 0;
			UserCharacter userCharacter = characterService.getCharacterById(id);
			combatPowerMap.put("characterId", userCharacter.getId());
			combatPowerMap.put("characterCountry", CountryCache.getNameById(userCharacter.getCountryId()));
			combatPowerMap.put("characterName", userCharacter.getName());
			if(!userHeroList.isEmpty()){
				if(userHeroList.size()>5){
					for(int i=0;i<5;i++){
					    UserHero userHero = userHeroList.get(i);
						fighting += userHero.getSunFighting();
//						System.out.println( userCharacter.getName() +"  "+userHero.getHeroName()+"-------------------  "+userHero.getSunFighting());
					}
				}else{
					for(int i=0;i<userHeroList.size();i++){
						UserHero userHero = userHeroList.get(i);
						fighting += userHero.getSunFighting();
					}
				}
			}
			BigDecimal b = new   BigDecimal(fighting);    
			double f1 = b.setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue(); 
			combatPowerMap.put("fighting",f1);
			COMBATPOWERLIST.add(combatPowerMap);
		}
		ComparatorUserFighting comparator=new ComparatorUserFighting();
		  Collections.sort(COMBATPOWERLIST, comparator);
		  int rowNum=0;
		  for(int i=COMBATPOWERLIST.size()-1;i>=0;i--){
			  Map<String,Object> combatPower = COMBATPOWERLIST.get(i);
			  combatPower.put("fighting", combatPower.get("fighting"));
			  combatPower.put("rowNum", ++rowNum);
			  COMBATPOWERLAST.add(combatPower);
			  FIGHTINGMAP.put((Integer)combatPower.get("characterId"), combatPower);
		  }
	}
	/**
	 * 建设值排序
	 */
	@SuppressWarnings("unchecked")
	private static void buildComparator(){
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		for(int i=0;i<BUILDLIST.size();i++){
			Map<String,Object> build = BUILDLIST.get(i);
//			build.put("rowNum", i+1);
			Maincity maincity = maincityService.getMaincity((Integer)build.get("id"));
			int cityExperienceLimit = 0;
			for(int j=1;j<maincity.getLevel();j++){
				cityExperienceLimit += CityCache.getExperienceLimitByLevel(j);
			}        
			build.put("numerical",(Integer)build.get("experience")+cityExperienceLimit);
			build.put("country", CountryCache.getNameById((Integer) build.get("country_id")));
			build.remove("country_id");
			build.remove("experience");
//			BUILDMAP.put((Integer)build.get("id"), build);
		}
		NumericalComparator numericalComparator = new NumericalComparator();
		Collections.sort(BUILDLIST, numericalComparator);
		Collections.reverse(BUILDLIST);
//		int rowNum=0;
		for(int i=0;i<BUILDLIST.size();i++){
			Map<String,Object> build = BUILDLIST.get(i);
			build.put("rowNum", i+1);
			BUILDMAP.put((Integer)build.get("id"), build);
		}
		 
	}
	public static  List<Map<String,Object>> getBuildList(){
		return BUILDLIST;
	}
	public static Map<String, Object> getBuildMap(int id){
		return BUILDMAP.get(id);
	}
	public static List<Map<String,Object>> getLevelList(){
		return LEVELlIST;
	}
	public static Map<String, Object> getLevelMap(int id){
		return LEVELMAP.get(id);
	}
	public static List<Map<String,Object>> getFightingList(){
		return COMBATPOWERLAST;
	}
	public static List<Map<String,Object>> getReputationList(){
		return REPUTATIONLIST;
	}
	public static Map<String, Object> getFightingMap(int id){
		return FIGHTINGMAP.get(id);
	}
	public static Map<String, Object> getReputationMap(int id){
		return REPUTATIONMAP.get(id);
	}
	public static List<Map<String,Object>> getRechargeList(){
		return RECHARGELIST;
	}
	public static Map<String, Object> getRechargeMap(int id){
		return RECHARGEMAP.get(id);
	}
	public static List<Map<String,Object>> getAllianceList(){
		return ALLIANCELIST;
	}
	public static Map<String, Object> getAllianceMap(int id){
		return ALLIANCEMAP.get(id);
	}
    public static List<Map<String,Object>> getHeroList(){
    	return ALLHEROLIST;
    }
    public static List<Map<String,Object>> getHeroMap(int id){
    	List<Map<String,Object>> characterHero = new ArrayList<Map<String,Object>>();
    	for(int i=0;i<ALLHEROLIST.size();i++){
			Map<String,Object> userHero = ALLHEROLIST.get(i);
			if(id ==(Integer) userHero.get("characterId")){
				characterHero.add(userHero);
			}
		}
		return characterHero;
    }
    public static List<UserHero> getMaxFighting(int id){
    	List<UserHero> HeroMaxFighting = new ArrayList<UserHero>();
    	for(int i=HEROLIST.size()-1;i>=0;i--){
    		UserHero userHero = HEROLIST.get(i);
    		if(userHero.getCharacterId()==id){
    			HeroMaxFighting.add(userHero);
    		}
    	}
    	return HeroMaxFighting;
    }
}
