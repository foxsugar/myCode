package com.crystalcg.gamedev.ranking.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.alliance.domain.Alliance;
import com.crystalcg.gamedev.alliance.service.AllianceService;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.ranking.Job.RankingJob;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.RankingCache;

public class RankingService {
	static{
		try {
			ExecuteJob.ranking(RankingJob.class, "ranking");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	private static final int MAX_AMOUNT_NUM=11;//每页显示最大数量； 
	/**
	 * 建设值排行
	 * @param page
	 * @return
	 */
     public Map<String, Object> getBuildList(int page){
    	 List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	 List<Map<String,Object>> retBuildList = RankingCache.getBuildList();
    		if(page <= 0){
        		page=1;
        	}
        	int size = retBuildList.size();
        	
        	int pages = (size-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
        	int fromIndex = (page-1)*MAX_AMOUNT_NUM;
        	if(fromIndex>=size){
        		fromIndex=(pages-1)*MAX_AMOUNT_NUM;
        		page=pages;
        	}
        	int toIndex = (page*MAX_AMOUNT_NUM);
        	if(size<toIndex){
        		toIndex=size;
        	}
         for(Map<String,Object> rb : retBuildList.subList(fromIndex, toIndex)){
        	 retList.add(rb);
         }
         Map<String,Object> retMap = new HashMap<String,Object>();
         retMap.put("page", page);
         retMap.put("pages", pages);
         retMap.put("retList", retList);
         return retMap;
     }   
     /**
      * 等级排行
      * @param page
      * @return
      */
     public Map<String, Object> getLevelList(int page){
    	 List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	 List<Map<String,Object>> retLevelList = RankingCache.getLevelList();
    	 if(page <= 0){
     		page=1;
     	}
     	int size = retLevelList.size();
     	int pages = (size-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
     	int fromIndex = (page-1)*MAX_AMOUNT_NUM;
     	if(fromIndex>=size){
     		fromIndex=(pages-1)*MAX_AMOUNT_NUM;
     		page=pages;
     	}
     	int toIndex = (page*MAX_AMOUNT_NUM);
     	if(size<toIndex){
     		toIndex=size;
     	}
     	 for(Map<String,Object> rb : retLevelList.subList(fromIndex, toIndex)){
        	 retList.add(rb);
         }
         Map<String,Object> retMap = new HashMap<String,Object>();
         retMap.put("page", page);
         retMap.put("pages", pages);
         retMap.put("retList", retList);
         return retMap;
     }
     /**
      * 君主声望排行
      * @param page
      * @return
      */
     public Map<String, Object> getReputationList(int page){
    	 List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	 List<Map<String,Object>> retReputationList = RankingCache.getReputationList();
    	 if(page <= 0){
      		page=1;
      	}
      	int size = retReputationList.size();
      	int pages = (size-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
      	int fromIndex = (page-1)*MAX_AMOUNT_NUM;
      	if(fromIndex>=size){
      		fromIndex=(pages-1)*MAX_AMOUNT_NUM;
      		page=pages;
      	}
      	int toIndex = (page*MAX_AMOUNT_NUM);
      	if(size<toIndex){
      		toIndex=size;
      	}
	   	 for(Map<String,Object> rb : retReputationList.subList(fromIndex, toIndex)){
	    	 retList.add(rb);
	     }
	     Map<String,Object> retMap = new HashMap<String,Object>();
	     retMap.put("page", page);
         retMap.put("pages", pages);
         retMap.put("retList", retList);
         return retMap;
     }
     /**
      * 君主战力排行
      * @param page
      * @return
      */
     public Map<String,Object> getFightingList(int page){
    	 List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	 List<Map<String,Object>> FightingList = RankingCache.getFightingList();
    	 if(page <= 0){
      		page=1;
      	}
      	int size = FightingList.size();
      	int pages = (size-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
      	int fromIndex = (page-1)*MAX_AMOUNT_NUM;
      	if(fromIndex>=size){
      		fromIndex=(pages-1)*MAX_AMOUNT_NUM;
      		page=pages;
      	}
      	int toIndex = (page*MAX_AMOUNT_NUM);
      	if(size<toIndex){
      		toIndex=size;
      	}
	   	 for(Map<String,Object> rb : FightingList.subList(fromIndex, toIndex)){
	    	 retList.add(rb);
	     }
	   	 Map<String,Object> retMap = new HashMap<String,Object>();
	     retMap.put("page", page);
         retMap.put("pages", pages);
         retMap.put("retList", retList);
         return retMap;
     }
     /**
      * 金锭排行
      * @param page
      * @return
      */
     public Map<String, Object> getRechargeList(int page){
    	 List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	 List<Map<String,Object>> retRechargeList = RankingCache.getRechargeList();
    	 if(page <= 0){
       		page=1;
       	}
       	int size = retRechargeList.size();
       	int pages = (size-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
       	int fromIndex = (page-1)*MAX_AMOUNT_NUM;
       	if(fromIndex>=size){
       		fromIndex=(pages-1)*MAX_AMOUNT_NUM;
       		page=pages;
       	}
       	int toIndex = (page*MAX_AMOUNT_NUM);
       	if(size<toIndex){
       		toIndex=size;
       	}
       	for(Map<String,Object> rb : retRechargeList.subList(fromIndex, toIndex)){
	    	 retList.add(rb);
	     }
        Map<String,Object> retMap = new HashMap<String,Object>();
	     retMap.put("page", page);
        retMap.put("pages", pages);
        retMap.put("retList", retList);
        return retMap;
     }
     /**
      * 联盟排行
      * @param page
      * @return
      */
     public Map<String, Object> getAllianceList(int page){
    	 List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	 List<Map<String,Object>> retAllianceList = RankingCache.getAllianceList();
    		int size = retAllianceList.size();
    		if(page <= 0){
    	       		page=1;
    	       	}
           	int pages = (size-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
           	int fromIndex = (page-1)*MAX_AMOUNT_NUM;
           	if(fromIndex>=size){
           		fromIndex=(pages-1)*MAX_AMOUNT_NUM;
           		page=pages;
           	}
           	int toIndex = (page*MAX_AMOUNT_NUM);
           	if(size<toIndex){
           		toIndex=size;
           	}
         	for(Map<String,Object> rb : retAllianceList.subList(fromIndex, toIndex)){
   	    	 retList.add(rb);
   	         }
         	Map<String,Object> retMap = new HashMap<String,Object>();
   	       retMap.put("page", page);
           retMap.put("pages", pages);
           retMap.put("retList", retList);
           return retMap;
     }
     /**
      * 武将排行
      * @param page
      * @return
      */
     public  Map<String, Object> getHeroList(int page){
    	 List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	 
    	 List<Map<String,Object>> hero = RankingCache.getHeroList();
    	 int size = hero.size();
 		if(page <= 0){
 	       		page=1;
 	       	}
        	int pages = (size-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
        	int fromIndex = (page-1)*MAX_AMOUNT_NUM;
        	if(fromIndex>=size){
        		fromIndex=(pages-1)*MAX_AMOUNT_NUM;
        		page=pages;
        	}
        	int toIndex = (page*MAX_AMOUNT_NUM);
        	if(size<toIndex){
        		toIndex=size;
        	}
        	for(Map<String, Object> userHero : hero.subList(fromIndex, toIndex)){
      	    	 retList.add(userHero);
      	         }
         	Map<String,Object> retMap = new HashMap<String,Object>();
	    	    retMap.put("page", page);
	            retMap.put("pages", pages);
	            retMap.put("retList", retList);
            return retMap;
    	 
     }
     /**
      * 查询我的充值金锭排名
      * @param id
      * @return
      */
     public Map<String, Object> getRechargeMap(int id){
    	 Map<String,Object> rechargeMap = RankingCache.getRechargeMap(id);
    	 int ranking = (Integer) rechargeMap.get("rowNum");
    	 int page = (ranking-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
    	 return getRechargeList(page);
    	 
     }
     /**
      * 查询我的建设值排行
      * @param id
      * @return
      */
     public Map<String, Object> getBuildMap(int id){
    	 Map<String,Object> buildMap = RankingCache.getBuildMap(id);
    	 int ranking = (Integer) buildMap.get("rowNum");
    	 int page = (ranking-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
    	 return getBuildList(page);
    	 
     }
     /**
      * 查询我的等级排行
      * @param id
      * @return
      */
     public Map<String, Object> getLevelMap(int id){
    	 Map<String,Object> levelMap = RankingCache.getLevelMap(id);
    	 int ranking = (Integer) levelMap.get("rowNum");
    	 int page = (ranking-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
    	 return getLevelList(page);
     }
     /**
      * 查询我的声望排行
      * @param id
      * @return
      */
     public Map<String, Object> getReputation(int id){
    	 Map<String,Object> rseputationMap = RankingCache.getReputationMap(id);
    	 int ranking = (Integer) rseputationMap.get("rowNum");
    	 int page = (ranking-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
    	 return getReputationList(page);
     }
     /**
      * 查询我我的战力排行
      * @param id
      * @return
      */
     public Map<String,Object> getFightingMap(int id){
    	 Map<String,Object> fightingMap = RankingCache.getFightingMap(id);
    	 int ranking = (Integer)fightingMap.get("rowNum");
    	 int page = (ranking-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
    	 return getFightingList(page);
     }
     /**
      * 查询我的联盟排行
      * @param id
      * @return
      */
     public Map<String, Object> getAllianceMap(int id){
    	 Map<String,Object> allianceMap = RankingCache.getAllianceMap(id);
    	 int ranking = (Integer) allianceMap.get("rowNum");
    	 int page = (ranking-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
    	 return getAllianceList(page);
     }
     /**
      * 我的武将排行
      * @param id
      * @param page
      * @return
     * @throws AppException 
      */
     public Map<String, Object> getHeroMap(int id,int page) throws AppException{ 
    	 List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	 Map<String,Object> retMap = new HashMap<String,Object>();
    	 if(page <= 0){
	       		page=1;
	       	}
    	 List<Map<String,Object>> userHeroList = RankingCache.getHeroMap(id);
    	 if(userHeroList==null){
    		 throw new AppException("该君主还没有武将");
    	 }
    	 int size = userHeroList.size();
    	 int pages = (size-1+MAX_AMOUNT_NUM)/MAX_AMOUNT_NUM;
    	 int fromIndex = (page-1)*MAX_AMOUNT_NUM;
         if(fromIndex>=size){
             fromIndex=(pages-1)*MAX_AMOUNT_NUM;
             page=pages;
           }
             int toIndex = (page*MAX_AMOUNT_NUM);
             if(size<toIndex){
            	 toIndex=size;
              }
             for(Map<String, Object> userHero : userHeroList.subList(fromIndex, toIndex)){
      	    	 retList.add(userHero);
      	         }
             retMap.put("page", page);
             retMap.put("pages", pages);
             retMap.put("retList", retList);
		return  retMap;
     }
     /**
      * 根据君主名称查找充值排行
      * @param name
      * @return
     * @throws AppException 
      */
     public Map<String, Object> getRechargeByName(String name) throws AppException{
    	 return getRechargeMap(getUserCharacterId(name));	 
     }
     /**
      * 根据君主名称查找建设排行
      * @param name
      * @return
     * @throws AppException 
      */
     public Map<String, Object> getBuildByName(String name) throws AppException{
    	 return getBuildMap(getUserCharacterId(name));
     }
     /**
      * 根据君主名称查找等级排行
      * @param name
      * @return
     * @throws AppException 
      */
     public Map<String, Object> getLevelByName(String name) throws AppException{
    	 return getLevelMap(getUserCharacterId(name));
     }
     /**
      *  根据君主名称查找声望排行
      * @param name
      * @return
     * @throws AppException 
      */
     public Map<String, Object> getReputationByName(String name) throws AppException{
    	 return getReputation(getUserCharacterId(name));
     }
     /**
      * 根据名称查看君主战力排行
      * @param name
      * @return
      * @throws AppException
      */
     public Map<String,Object> getFightingByName(String name) throws AppException{
    	 return getFightingMap(getUserCharacterId(name));
     }
     /**
      * 根据君主名称查找联盟排行
      * @param name
      * @return
     * @throws AppException 
      */
     public Map<String, Object> getAllianceByName(String name) throws AppException{
    	 AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	 Alliance alliance = allianceService.getAllianceByName(name);
    	 if(alliance==null){
    		 throw new AppException("没有该联盟");
    	 }
    	 return getAllianceMap(alliance.getId());
     }
     /**
      * 根据君主名称查看君主武将
      * @param name
      * @param page
      * @return
      * @throws AppException
      */
     public Map<String, Object> getAllHeroByName(String name,int page) throws AppException{
    	 return getHeroMap(getUserCharacterId(name),page);
     }
     public int getUserCharacterId(String name) throws AppException{
    	 CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	 UserCharacter userCharacter = characterService.getCharacterByName(name);
    	 if(userCharacter==null){
    		 throw new AppException("没有该君主");
    	 }
    	 return userCharacter.getId();
     }
     
}
