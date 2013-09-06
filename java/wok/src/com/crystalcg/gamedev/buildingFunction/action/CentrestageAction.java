package com.crystalcg.gamedev.buildingFunction.action;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.buildingFunction.service.CentrestageService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 聚贤阁
 * @author xuzhongxing
 *
 */
@Controller
public class CentrestageAction {
	
	private CentrestageService centrestageService;

	/**
	 * 初始化聚贤阁
	 * @param session
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="initCentrestage")
	@ResponseBody
	public Map<String,Object> initCentrestage(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return centrestageService.initCentrestage(characterId);
	}
	
	/**
	 * 获取全部武将
	 * @param session
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="getAllCentrestageUserHero")
	@ResponseBody
	public List<Map<String,Object>> getAllUserHero(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return centrestageService.getAllUserHero(characterId);
	}
	
	/**
	 * 获取某一官职的武将
	 * @param session
	 * @param militaryRankId
	 * @return
	 */
	@RequestMapping(value="getRankUserHero")
	@ResponseBody
	public List<Map<String,Object>> getRankUserHero(HttpSession session,String rankNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return centrestageService.getRankUserHero(characterId, rankNo);
	}
	
	/**
	 * 获取全部官职 (任免界面)
	 * @param session
	 * @param militaryRankId
	 * @return
	 */
	@RequestMapping(value="getAllRank")
	@ResponseBody
	public Object getAllRank(HttpSession session,int userHeroId){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return centrestageService.getAllRank(characterId, userHeroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 册封武将
	 * @param session
	 * @param militaryRankId
	 * @return
	 */
	@RequestMapping(value="appointUserHero")
	@ResponseBody
	public Object appointHero(HttpSession session,int userHeroId,String rankNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			centrestageService.appointHero(characterId, userHeroId, rankNo);
			return centrestageService.getAllRank(characterId, userHeroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	/**
	 * 免除武将官职
	 * @param session
	 * @param userHeroId
	 * @return
	 */
	@RequestMapping(value="relieveHero")
	@ResponseBody
	public Object relieveHero(HttpSession session,int userHeroId){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			centrestageService.relieveHero(characterId, userHeroId);
			return centrestageService.getAllRank(characterId, userHeroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * @return the centrestageService
	 */
	public CentrestageService getCentrestageService() {
		return centrestageService;
	}

	/**
	 * @param centrestageService the centrestageService to set
	 */
	public void setCentrestageService(CentrestageService centrestageService) {
		this.centrestageService = centrestageService;
	}
	
}
