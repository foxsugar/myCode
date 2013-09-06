package com.crystalcg.gamedev.buildingFunction.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.util.ChangeHeroToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.CentrestageCache;
import com.crystalcg.gamedev.util.cache.domain.StaticRank;

public class CentrestageService {
	
	/**
	 * 初始化聚贤阁
	 * @param session
	 * @return
	 * @throws AppException 
	 */
	public Map<String,Object> initCentrestage(int characterId) throws AppException{
		Map<String,Object> retMap = new HashMap<String,Object>();
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CENTRESTAGE_BUILDING_NO_PREFIX);
		if(list.size() == 0){
			retMap.put("error", "请先建造聚贤阁");
			return retMap;
		}
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> userHeroList = userHeroService.getAllUserHero(characterId);
		List<Map<String,Object>> retHeroList = new ArrayList<Map<String, Object>>();
		StaticRank tempRank;
		Map<String,Object> tempHero;
		Map<String,Integer> heroCount = new HashMap<String,Integer>();
		for(UserHero uh : userHeroList){
			tempHero = new HashMap<String,Object>();
			tempHero.put("heroId", uh.getId());
			tempHero.put("toolTipInfo", ChangeHeroToToolTip.change(uh));
//			tempHero.put("heroLevel", uh.getLevel());
			tempHero.put("exploit", uh.getExploit());
			tempRank = CentrestageCache.getRankByNo(uh.getRankNo());
			if(tempRank == null){
				tempHero.put("rank", "无");
				tempHero.put("command", 0);
			}else{
				tempHero.put("rank", tempRank.getRankName());
				tempHero.put("command", tempRank.getRankCommand());
				Integer num = heroCount.get(uh.getRankNo());
				if(num == null){
					heroCount.put(uh.getRankNo(), 1);
				}else{
					heroCount.put(uh.getRankNo(), ++num);
				}
			}
			retHeroList.add(tempHero);
		}
		List<Map<String,Object>> rankList = CentrestageCache.getRankDisplay(list.get(0).getLevel(), heroCount);
		retMap.put("hero", retHeroList);
		retMap.put("rank", rankList);
		return retMap;
	}
	
	/**
	 * 获取全部武将
	 * @param session
	 * @return
	 * @throws AppException 
	 */
	public List<Map<String,Object>> getAllUserHero(int characterId) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> userHeroList = userHeroService.getAllUserHero(characterId);
		List<Map<String,Object>> retHeroList = new ArrayList<Map<String, Object>>();
		StaticRank tempRank;
		Map<String,Object> tempHero;
		for(UserHero uh : userHeroList){
			tempHero = new HashMap<String,Object>();
			tempHero.put("heroId", uh.getId());
			tempHero.put("toolTipInfo", ChangeHeroToToolTip.change(uh));
//			tempHero.put("heroName", uh.getHeroName());
//			tempHero.put("heroLevel", uh.getLevel());
			tempHero.put("exploit", uh.getExploit());
			tempRank = CentrestageCache.getRankByNo(uh.getRankNo());
			if(tempRank == null){
				tempHero.put("rank", "无");
				tempHero.put("command", 0);
			}else{
				tempHero.put("rank", tempRank.getRankName());
				tempHero.put("command", tempRank.getRankCommand());
			}
			retHeroList.add(tempHero);
		}
		return retHeroList;
	}
	
	/**
	 * 获取某一官职的武将
	 * @param session
	 * @param militaryRankId
	 * @return
	 */
	public List<Map<String,Object>> getRankUserHero(int characterId,String rankNo){
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> userHeroList = userHeroService.getAllUserHeroByRankNo(characterId, rankNo);
		List<Map<String,Object>> retHeroList = new ArrayList<Map<String, Object>>();
		StaticRank tempRank;
		Map<String,Object> tempHero;
		for(UserHero uh : userHeroList){
			tempHero = new HashMap<String,Object>();
			tempHero.put("icon", uh.getSmallHeroIcon());
			tempHero.put("heroId", uh.getId());
			tempHero.put("heroName", uh.getHeroName());
			tempHero.put("heroLevel", uh.getLevel());
			tempHero.put("exploit", uh.getExploit());
			tempHero.put("heroType", uh.getHeroType());
			if(uh.getHeroSoulId() == 0){
				tempHero.put("heroSoul", "无");
			}else{
				tempHero.put("heroSoul", "武魂名");//加入武魂后修改此处
			}
			tempHero.put("gift", (int)uh.getGift());
			tempRank = CentrestageCache.getRankByNo(uh.getRankNo());
			if(tempRank == null){
				tempHero.put("rank", "无");
				tempHero.put("command", 0);
			}else{
				tempHero.put("rank", tempRank.getRankName());
				tempHero.put("command", tempRank.getRankCommand());
			}
			retHeroList.add(tempHero);
		}
		return retHeroList;
	}
	
	/**
	 * 获取全部官职 (任免界面)
	 * @param session
	 * @param militaryRankId
	 * @return
	 * @throws AppException 
	 */
	public Map<String,Object> getAllRank(int characterId,int userHeroId) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
		if(userHero == null){
			throw new AppException("武将不存在");
		}
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CENTRESTAGE_BUILDING_NO_PREFIX);
		if(list.size() == 0){
			throw new AppException("请先建造聚贤阁");
		}
		Map<String,Object> retMap = new HashMap<String,Object>();
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		List<UserItem> itemList = userItemService.getUserItemByItemNo(Const.HERO_APPOINT_ITEM, characterId);
		int itemAmount = 0;
		for(UserItem i : itemList){
			itemAmount+=i.getItemAmount();
		}
		retMap.put("itemAmount", itemAmount);//圣令数量
		retMap.put("rank", CentrestageCache.getRankAppoint(list.get(0).getLevel(), userHero.getRankNo()));
		return retMap;
	}
	
	/**
	 * 册封武将
	 * @param session
	 * @param militaryRankId
	 * @return
	 * @throws AppException 
	 */
	public void appointHero(int characterId,int userHeroId,String rankNo) throws AppException{
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CENTRESTAGE_BUILDING_NO_PREFIX);
		if(list.size() == 0){
			throw new AppException("请先建造聚贤阁");
		}
		StaticRank rank = CentrestageCache.getRankByNo(rankNo);
		if(rank==null){
			throw new AppException("所选择的官职不存在");
		}
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
		if(userHero == null){
			throw new AppException("武将不存在");
		}
		if(userHero.getExploit()<rank.getNeedExploit()){
			throw new AppException(userHero.getHeroName()+"军功不足,无法满足当前操作");
		}
		List<UserHero> userHeroList = userHeroService.getAllUserHeroByRankNo(characterId, rankNo);
		if(userHeroList.size()>= CentrestageCache.getNumLimit(list.get(0).getLevel(), rankNo)){
			throw new AppException("任命的武将数量超出上限");
		}
		/////////////消耗材料/////////////
		if(rank.getNeedItem()!=null){
			UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
			List<UserItem> itemList = userItemService.getUserItemByItemNo(Const.HERO_APPOINT_ITEM, characterId);
			if(itemList.isEmpty()){
				throw new AppException("圣令数量不足");
			}
			//更新道具
			if(itemList.get(0).getItemAmount()==1){
				userItemService.deleteFromUserItem(itemList.get(0).getId());
			}else{
				userItemService.updateUserItemAmount(itemList.get(0).getId(), itemList.get(0).getItemAmount()-1);
			}
		}
		userHero.setRankNo(rankNo);
		userHeroService.updateHeroRank(userHero);
		HeroAlgorithm.computeAttribute(userHero);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.APPOINT_HERO_RANK, rankNo, characterId);
	}
	/**
	 * 免除武将官职
	 * @param session
	 * @param userHeroId
	 * @return
	 * @throws AppException 
	 */
	public void relieveHero(int characterId,int userHeroId) throws AppException{
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CENTRESTAGE_BUILDING_NO_PREFIX);
		if(list.size() == 0){
			throw new AppException("请先建造聚贤阁");
		}
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
		if(userHero == null){
			throw new AppException("武将不存在");
		}
		String rankNo = userHero.getRankNo();
		userHero.setRankNo(null);
		userHeroService.updateHeroRank(userHero);
		HeroAlgorithm.computeAttribute(userHero);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.APPOINT_HERO_RANK, rankNo, characterId);
	}
	
}
