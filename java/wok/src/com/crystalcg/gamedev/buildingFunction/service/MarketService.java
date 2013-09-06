package com.crystalcg.gamedev.buildingFunction.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.buildingFunction.dao.MarketDao;
import com.crystalcg.gamedev.buildingFunction.domain.UserMarket;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ResourceMath;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

public class MarketService {

	private MarketDao marketDao;

	// 获取可兑换数
	// 兑换铜币
	// 兑换资源

	/**
	 * 获取可兑换资源数
	 * 
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	public UserMarket getUserMarket(int characterId) throws AppException {
		UserMarket userMarket = marketDao.getUserMarket(characterId);
		if (userMarket == null) {//不存在集市信息，创建
			marketDao.insertUserMarket(characterId);
			userMarket = new UserMarket();
			userMarket.setCharacterId(characterId);
		}else{//存在集市兑换信息，执行清除；如果不是同一天，清空兑换信息
			clearUserMarket(userMarket);
		}
		//添加兑换上限
		setExchangeLimit(userMarket);
		return userMarket;
	}

	public UserMarket exchangeResource(int characterId, int choiceType,
			int choiceAmount, int exchangeType) throws AppException {
		if (choiceType == exchangeType) {
			throw new AppException("同种资源无法兑换");
		}
		UserMarket userMarket = marketDao.getUserMarket(characterId);
		if (userMarket == null) {
			marketDao.insertUserMarket(characterId);
			userMarket = new UserMarket();
			userMarket.setCharacterId(characterId);
		}
		clearUserMarket(userMarket);//如果不是同一天，清空兑换信息
		setExchangeLimit(userMarket);
		if (choiceAmount > userMarket.getResourceCanExchange()) {
			throw new AppException("兑换数超过兑换上限");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator
				.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		switch (choiceType) {
		case Const.RESOURCE_TYPE_FOOD:
			if (choiceAmount > maincity.getFood()) {
				throw new AppException("拥有的粮食不足");
			} else {
				maincity.setFood(maincity.getFood() - choiceAmount);
				break;
			}
		case Const.RESOURCE_TYPE_WOOD:
			if (choiceAmount > maincity.getWood()) {
				throw new AppException("拥有的木材不足");
			} else {
				maincity.setWood(maincity.getWood() - choiceAmount);
				break;
			}

		case Const.RESOURCE_TYPE_STONE:
			if (choiceAmount > maincity.getStone()) {
				throw new AppException("拥有的石矿不足");
			} else {
				maincity.setStone(maincity.getStone() - choiceAmount);
				break;
			}
		case Const.RESOURCE_TYPE_IRONORE:
			if (choiceAmount > maincity.getIronore()) {
				throw new AppException("拥有的铁矿不足");
			} else {
				maincity.setIronore(maincity.getIronore() - choiceAmount);
				break;
			}

		default:
			throw new AppException("兑换类型错误");
		}
		userMarket.setExchangeResource(userMarket.getExchangeResource()
				+ choiceAmount);
		double exchangeAmount = choiceAmount
				* ResourceMath.getRatioForMarket(choiceType, exchangeType);
		marketDao.updateUserMarket(userMarket);
		updateResource(exchangeType, (int) exchangeAmount, maincity);
		return userMarket;
	}

	public void sellResource(int characterId, int foodAmount, int woodAmount,
			int stoneAmount, int ironoreAmount) throws AppException {
		if (foodAmount == 0 && woodAmount == 0 && stoneAmount == 0
				&& ironoreAmount == 0) {
			throw new AppException("兑换资源不可以都是0");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator
				.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		if (foodAmount > maincity.getFood() || woodAmount > maincity.getWood()
				|| stoneAmount > maincity.getStone()
				|| ironoreAmount > maincity.getIronore()) {
			throw new AppException("兑换资源超过拥有数");
		}
		//long money = maincity.getMoney();
		long money = 0;
		long food = maincity.getFood();
		long wood = maincity.getWood();
		long stone = maincity.getStone();
		long ironore = maincity.getIronore();
		if (foodAmount != 0) {
			food -= foodAmount;
			money += foodAmount
					* Const.RESOURCE_SELL_VALUE.get(Const.RESOURCE_TYPE_FOOD);
		}
		if (woodAmount != 0) {
			wood -= woodAmount;
			money += woodAmount
					* Const.RESOURCE_SELL_VALUE.get(Const.RESOURCE_TYPE_WOOD);
		}
		if (stoneAmount != 0) {
			stone -= stoneAmount;
			money += stoneAmount
					* Const.RESOURCE_SELL_VALUE.get(Const.RESOURCE_TYPE_STONE);
		}
		if (ironoreAmount != 0) {
			ironore -= ironoreAmount;
			money += ironoreAmount
					* Const.RESOURCE_SELL_VALUE
							.get(Const.RESOURCE_TYPE_IRONORE);
		}
		if (money > maincity.getMoneyLimit()) {
			money = maincity.getMoneyLimit();
		}
		maincityService.addMoney(characterId, money);
		maincityService.updateSuburbsResource(characterId, food, wood, stone,
				ironore);
	}

	private void clearUserMarket(UserMarket userMarket) {
		if(!isSameDay(userMarket)){
			userMarket.setExchangeResource(0);
			marketDao.updateUserMarket(userMarket);
		}
	}

	private final boolean isSameDay(UserMarket userMarket){
		Calendar c1=Calendar.getInstance();
		Calendar c2=Calendar.getInstance();
		c1.setTime(userMarket.getUpdateTime());
		c2.setTime(new Date());
		if(c1.get(Calendar.YEAR)==c2.get(Calendar.YEAR)&&(c1.get(Calendar.MONTH)==c2.get(Calendar.MONTH))
		&&c1.get(Calendar.DAY_OF_MONTH)==c2.get(Calendar.DAY_OF_MONTH)){
			return true;
		}else{
			return false;
		}
	}

	private void updateResource(int exchangeType, int exchangeAmount,
			Maincity maincity) throws AppException {
		switch (exchangeType) {
		case Const.RESOURCE_TYPE_FOOD:
			if (maincity.getFood() + exchangeAmount > maincity.getFoodLimit()) {
				maincity.setFood(maincity.getFoodLimit());
			} else {
				maincity.setFood(maincity.getFood() + exchangeAmount);
			}
			break;
		case Const.RESOURCE_TYPE_WOOD:
			if (maincity.getWood() + exchangeAmount > maincity.getWoodLimit()) {
				maincity.setWood(maincity.getWoodLimit());
			} else {
				maincity.setWood(maincity.getWood() + exchangeAmount);
			}
			break;
		case Const.RESOURCE_TYPE_STONE:
			if (maincity.getStone() + exchangeAmount > maincity.getStoneLimit()) {
				maincity.setStone(maincity.getStoneLimit());
			} else {
				maincity.setStone(maincity.getStone() + exchangeAmount);
			}
			break;
		case Const.RESOURCE_TYPE_IRONORE:
			if (maincity.getIronore() + exchangeAmount > maincity
					.getIronoreLimit()) {
				maincity.setIronore(maincity.getIronoreLimit());
			} else {
				maincity.setIronore(maincity.getIronore() + exchangeAmount);
			}
			break;
		default:
			throw new AppException("兑换类型错误");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator
				.getSpringBean("maincityService");
		maincityService.updateSuburbsResource(maincity.getCharacterId(),
				maincity.getFood(), maincity.getWood(), maincity.getStone(),
				maincity.getIronore());

	}

	/**
	 * 添加交易上限，非通用方法
	 * 
	 * @param userMarket
	 * @return
	 * @throws AppException
	 */
	private UserMarket setExchangeLimit(UserMarket userMarket)
			throws AppException {
		BuildingService buildingService = (BuildingService) ServiceLocator
				.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(
				userMarket.getCharacterId(), Const.MARKET_BUILDING_NO_PREFIX);
		if (list.size() == 0) {
			throw new AppException("请先建造集市");
		}
		Building building = list.get(0);
		StaticBuilding entity = BuildingCache.getBuildingEntityByNo(building
				.getBuildingNo());
		userMarket
				.setExchangeLimit((int)entity.getFunctionvalue1());
		return userMarket;
	}

	public MarketDao getMarketDao() {
		return marketDao;
	}

	public void setMarketDao(MarketDao marketDao) {
		this.marketDao = marketDao;
	}
}
