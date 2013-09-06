package com.crystalcg.gamedev.buildingFunction.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.buildingFunction.service.TavernService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 酒馆
 * 
 * @author xuzhongxing
 * 
 */
@Controller
public class TavernAction {

	private TavernService tavernService;

	/**
	 * 进入酒馆
	 */
	@RequestMapping(value="initTavern")
	@ResponseBody
	public Object initTavern(HttpSession session) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return tavernService.initTavern(characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}

	/**
	 * 招募武将
	 */
	@RequestMapping(value="recruitHero")
	@ResponseBody
	public Object recruitHero(HttpSession session,int id) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		try {
			tavernService.recruitHero(character.getId(), id);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		Map<String,String> retMap = new HashMap<String, String>();
		retMap.put("status", "success");
		return retMap;
	}

	/**
	 * 刷新武将
	 */
	@RequestMapping(value="refreshTavernHero")
	@ResponseBody
	public Object refreshTavernHero(HttpSession session) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return tavernService.refreshTavernHero(characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}

	public TavernService getTavernService() {
		return tavernService;
	}

	public void setTavernService(TavernService tavernService) {
		this.tavernService = tavernService;
	}


}
