package com.crystalcg.gamedev.tech.action;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.tech.service.SoldierTechService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 兵种科技
 * @author xuzhongxing
 *
 */
@Controller
public class SoldierTechAction {
	
	SoldierTechService soldierTechService;
	
	/**
	 * 科教馆界面，获取全部科技
	 * @param session
	 * @return
	 */
	@RequestMapping(value="getAllSoldierTech")
	@ResponseBody
	public Object getAllSoldierTech(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return soldierTechService.getSoldierTechView(characterId);
	}
	
	/**
	 * 研究兵种科技
	 * @param session
	 * @param techNo
	 * @return
	 */
	@RequestMapping(value="researchSoldierTech")
	@ResponseBody
	public Object researchSoldierTech(HttpSession session,String techNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return soldierTechService.researchSoldierTech(characterId, techNo);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 降级兵种科技
	 * @param session
	 * @param techNo
	 * @return
	 */
	@RequestMapping(value="demoteSoldierTech")
	@ResponseBody
	public Object demoteSoldierTech(HttpSession session,String techNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return soldierTechService.demoteSoldierTech(characterId, techNo);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 获得某项科技
	 * @param session
	 * @param techNo
	 * @return
	 */
	@RequestMapping(value="getSoldierTech")
	@ResponseBody
	public Object getSoldierTech(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return soldierTechService.getSoldierTech(characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}

	public SoldierTechService getSoldierTechService() {
		return soldierTechService;
	}

	public void setSoldierTechService(SoldierTechService soldierTechService) {
		this.soldierTechService = soldierTechService;
	}
}
