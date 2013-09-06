package com.crystalcg.gamedev.buildingFunction.action;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.buildingFunction.service.PrivycouncilService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 军机处
 * @author xuzhongxing
 *
 */
@Controller
public class PrivycouncilAction {
	
	private PrivycouncilService privycouncilService;
	
	/**
	 * 获取内政信息：ID、名字、时间
	 * @throws AppException 
	 */
	@RequestMapping(value="/initPrivycouncil")
	@ResponseBody
	public Map<String, Object> initPrivycouncil(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return privycouncilService.initPrivycouncil(characterId);
	}
	
	/**
	 * 获取英雄信息：ID、名称、等级、当前经验/上限、状态、如果开启JOB返回剩余时间
	 */
	@RequestMapping(value="/getMissionStatus")
	@ResponseBody
	public Map<String, Object> getMissionStatus(HttpSession session,int userHeroId){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return privycouncilService.getMissionStatus(characterId, userHeroId);
	}
	
	/**
	 * 开启策略
	 * @param affairId 
	 * @param hours 
	 * @throws AppException 
	 */
	@RequestMapping(value="/beginMission")
	@ResponseBody
	public Map<String, Object> beginMission(HttpSession session,int[] userHeroId, String affairNo, int hours) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		Map<String,Object> retMap = privycouncilService.beginMission(characterId, userHeroId, affairNo, hours);
		retMap.put("hero", privycouncilService.initPrivycouncil(characterId));
		return retMap;
	}
	
	/**
	 * 结束策略
	 * @param affairId 
	 * @param hours 
	 * @throws AppException 
	 */
	@RequestMapping(value="/endMission")
	@ResponseBody
	public Map<String, Object> endMission(HttpSession session,int[] userHeroId) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		Map<String,Object> retMap = privycouncilService.endMission(characterId, userHeroId);
		retMap.put("hero", privycouncilService.initPrivycouncil(characterId));
		return retMap;
	}

	public PrivycouncilService getPrivycouncilService() {
		return privycouncilService;
	}

	public void setPrivycouncilService(PrivycouncilService privycouncilService) {
		this.privycouncilService = privycouncilService;
	}
	
}
