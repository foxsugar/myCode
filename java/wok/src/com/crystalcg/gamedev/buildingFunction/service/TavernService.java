package com.crystalcg.gamedev.buildingFunction.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.cache.TavernRefreshCache;
import com.crystalcg.gamedev.hero.domain.Hero;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.TavernCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

public class TavernService {
	
	private static Logger logger = LoggerFactory.getLogger(TavernService.class);
	
	/**
	 * 进入酒馆
	 * @throws AppException 
	 */
	public Map<String,Object> initTavern(int characterId) throws AppException{
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.TAVERN_BUILDIG_NO_PREFIX);
		if(list.size() == 0){
			logger.error("请先建造酒馆");
			throw new AppException("请先建造酒馆");
		}
		Building building = list.get(0);
		StaticBuilding entity = BuildingCache.getBuildingEntityByNo(building.getBuildingNo());
		int interval = (Const.BASE_TAVERN_TIME - (int)entity.getFunctionvalue1())*1000;
		long lastRefreshTime = TavernRefreshCache.getLastRefreshTime(characterId);
		long now = System.currentTimeMillis();
		List<Hero> heroList;
		Map<String,Object> retMap = new HashMap<String, Object>();
		if(lastRefreshTime == 0){
			heroList = createHeroAndSet(characterId, building.getLevel(), System.currentTimeMillis());
		}else{
			if(lastRefreshTime + interval<=now){
				lastRefreshTime = now - (now - lastRefreshTime)%interval;
				heroList = createHeroAndSet(characterId, building.getLevel(), lastRefreshTime);
			}else{
				heroList = TavernRefreshCache.getHeros(characterId);
			}
		}
		retMap.put("time", TavernRefreshCache.getLastRefreshTime(characterId) + interval - now);
		retMap.put("heros", heroList);
		retMap.put("itemAmount", getRefreshItemAmount(characterId));
		return retMap;
	}
	
	final private int getRefreshItemAmount(int characterId){
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		List<UserItem> userItems = userItemService.getUserItemByItemNo(Const.HERO_REFRESH_ITEM, characterId);
		int amount = 0;
		for(UserItem i:userItems){
			amount+=i.getItemAmount();
		}
		return amount;
	}
	
	/**
	 * 招募武将
	 * @throws AppException 
	 */
	public void recruitHero(int characterId,int id) throws AppException{
		List<Hero> heroList = TavernRefreshCache.getHeros(characterId);
		if(heroList == null){
			logger.error("未刷新武将");
			throw new AppException("未刷新武将");
		}
		Hero hero = null;
		for(Hero h :  heroList){
			if(h.getId() == id){
				hero = h;
				break;
			}
		}
		if(hero == null){
			logger.error("武将ID错误");
			throw new AppException("武将ID错误");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		if(hero.getNeedMoney()>maincity.getMoney()){
			logger.error("铜币不足");
			throw new AppException("铜币不足");
		}
		heroList.remove(hero);
		maincityService.addMoney(characterId,  -hero.getNeedMoney());

		UserHero userHero = new UserHero();
		
		userHero.setCharacterId(characterId);
		userHero.setHeroName(hero.getHeroName());
		userHero.setHeroType(hero.getHeroType());
		userHero.setGender(hero.getGender());
		userHero.setHeroIcon(hero.getHeroIcon());
		userHero.setSmallHeroIcon(hero.getSmallHeroIcon());
		userHero.setHeroForce(hero.getForce());
		userHero.setStrategy(hero.getStrategy());
		userHero.setPhysique(hero.getPhysique());
		userHero.setAgility(hero.getAgility());
		userHero.setPrimaryForce(hero.getForce());
		userHero.setPrimaryStrategy(hero.getStrategy());
		userHero.setPrimaryPhysique(hero.getPhysique());
		userHero.setPrimaryAgility(hero.getAgility());
		userHero.setQuality(hero.getQuality());
		userHero.setGift(hero.getRealGift());
		userHero.setHeroAction(hero.getHeroAction());
		HeroAlgorithm.computeAttribute(userHero);
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		userHeroService.insertUserHero(userHero);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.HERO_EMPLOY, null, characterId);
	}
	
	/**
	 * 刷新武将
	 */
	public Map<String,Object> refreshTavernHero(int characterId) throws AppException{
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.TAVERN_BUILDIG_NO_PREFIX);
		if(list.size() == 0){
			logger.error("请先建造酒馆");
			throw new AppException("请先建造酒馆");
		}
		//消耗材料
		int amount = useRefreshItem(characterId);
		//to-do
		Building building = list.get(0);
		List<Hero> heroList = createHeroAndSet(characterId, building.getLevel(), System.currentTimeMillis());
		Map<String,Object> retMap = new HashMap<String, Object>();
		StaticBuilding entity = BuildingCache.getBuildingEntityByNo(building.getBuildingNo());
		int interval = (Const.BASE_TAVERN_TIME - (int)entity.getFunctionvalue1())*1000;
		retMap.put("time", TavernRefreshCache.getLastRefreshTime(characterId) + interval - System.currentTimeMillis());
		retMap.put("heros", heroList);
		retMap.put("itemAmount", amount);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.HERO_EMPLOY, null, characterId);
		return retMap;
	}
	
	final private int useRefreshItem(int characterId) throws AppException{
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		List<UserItem> userItems = userItemService.getUserItemByItemNo(Const.HERO_REFRESH_ITEM, characterId);
		if(userItems.isEmpty()){
			throw new AppException("刷新符不足，需要武将刷新符道具");
		}
		UserItem userItem = userItems.get(0);
		int itemAmount = userItem.getItemAmount();
		if(itemAmount==1){
			userItemService.deleteFromUserItem(userItem.getId());
			userItem.setItemAmount(0);
		}else{
			userItem.setItemAmount(itemAmount-1);
			userItemService.updateUserItemAmount(userItem.getId(), itemAmount-1);
		}
		int amount = 0;
		for(UserItem i:userItems){
			amount+=i.getItemAmount();
		}
		return amount;
	}
	
	private List<Hero> createHeroAndSet(int characterId,int level,long lastRefreshTime){
		List<Hero> heros = TavernCache.getHero(level);
		TavernRefreshCache.setHeros(characterId, heros);
		TavernRefreshCache.setLastRefreshTime(characterId, lastRefreshTime);
		return heros;
	}
	
}
