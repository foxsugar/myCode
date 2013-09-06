package com.crystalcg.gamedev.buildingFunction.action;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.buildingFunction.service.HouseService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 民居
 * @author xuzhongxing
 *
 */
@Controller
public class HouseAction {
	
	private HouseService houseService;
	
	@RequestMapping(value="initHouse")
	@ResponseBody
	public Map<String,Integer> initHouse(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return houseService.initHouse(characterId);
	}
	
//	@RequestMapping(value="getDefenceworks")
//	@ResponseBody
//	public List< Map<String,Object>> getDefenceworks(HttpSession session){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		int charId = character.getId();
//		return houseService.getDefenceworks(charId);
//	}
//	
//	@RequestMapping(value="getDefenceHero")
//	@ResponseBody
//	public List<Map<String,Object>> getDefenceHero(HttpSession session){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		int charId = character.getId();
//		return houseService.getDefenceHero(charId);
//	}
//	
//	@RequestMapping(value="getRiverInfo")
//	@ResponseBody
//	public Map<String,Integer> getRiverInfo(HttpSession session){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		int charId = character.getId();
//		return houseService.getRiverInfo(charId);
//	}
//	
//	@RequestMapping(value="initAlliance")
//	@ResponseBody
//	public Map<String,Object> initAlliance(HttpSession session){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		int charId = character.getId();
//		return houseService.getAlliance(charId);
//	}

	public HouseService getHouseService() {
		return houseService;
	}

	public void setHouseService(HouseService houseService) {
		this.houseService = houseService;
	}
	
	
}
