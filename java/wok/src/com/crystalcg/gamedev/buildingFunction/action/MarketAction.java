package com.crystalcg.gamedev.buildingFunction.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.buildingFunction.domain.UserMarket;
import com.crystalcg.gamedev.buildingFunction.service.MarketService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.Const;

@Controller
public class MarketAction {
	
	private MarketService marketService;
	@RequestMapping(value="getUserMarket")
	public @ResponseBody Map<String, Object> getUserMarket(HttpSession session) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		Map<String, Object> retMap = new HashMap<String, Object>();
		UserMarket userMarket = marketService.getUserMarket(userCharacter.getId());
		retMap.put("exchangeLimit", userMarket.getResourceCanExchange());
		Map<String, Object> exchangeParam = new HashMap<String,Object>();
		exchangeParam.put("resourceValue", Const.RESOURCE_VALUE);
		exchangeParam.put("resourceFactor", Const.RESOURCE_FACTOR);
		retMap.put("exchangeParam", exchangeParam);
		retMap.put("sellParam", Const.RESOURCE_SELL_VALUE);
		return retMap;
	}
	@RequestMapping(value="exchangeResource")
	public @ResponseBody UserMarket exchangeResource(HttpSession session, int choiceType, int choiceAmount, int exchangeType) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		return marketService.exchangeResource(userCharacter.getId(), choiceType, choiceAmount, exchangeType);
	}
	@RequestMapping(value="sellResource")
	public @ResponseBody boolean sellResource(HttpSession session, int foodAmount, int woodAmount, int stoneAmount, int ironoreAmount) throws AppException{
		UserCharacter userCharacter = (UserCharacter)session.getAttribute("character");
		marketService.sellResource(userCharacter.getId(), foodAmount, woodAmount, stoneAmount, ironoreAmount);
		return true;
	}

	public MarketService getMarketService() {
		return marketService;
	}

	public void setMarketService(MarketService marketService) {
		this.marketService = marketService;
	}
}
