package com.crystalcg.gamedev.buildingFunction.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.buildingFunction.service.CollegeService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 教坊（武将学习技能）
 * @author xuzhongxing
 *
 */
@Controller
public class CollegeAction {
	
	private CollegeService collegeService;
	
	/**
	 * 初始化教坊
	 * @param session
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="initCollege")
	@ResponseBody
	public Map<String,Object> getHeroForCollege(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		List<Map<String,Object>> hero = collegeService.getHeroForCollege(characterId);
		List<Map<String,Object>> skill = collegeService.getAllSkill(characterId);
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("hero", hero);
		retMap.put("skill", skill);
		return retMap;
		
	}
	
	/**
	 * 获取已学技能
	 * @param session
	 * @param userHeroId
	 * @return
	 */
	@RequestMapping(value="getLearnedSkill")
	@ResponseBody
	public Object getLearnedSkill(HttpSession session,int userHeroId){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return collegeService.getLearnedSkill(characterId,userHeroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 获取可学技能
	 * @param session
	 * @param userHeroId
	 * @return
	 */
	@RequestMapping(value="getCanLearnSkill")
	@ResponseBody
	public Object getCanLearnSkill(HttpSession session,int userHeroId){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return collegeService.getCanLearnSkill(characterId,userHeroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 获取不可学技能
	 * @param session
	 * @param userHeroId
	 * @return
	 */
	@RequestMapping(value="getCannotLearnSkill")
	@ResponseBody
	public Object getCannotLearnSkill(HttpSession session,int userHeroId){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return collegeService.getCannotLearnSkill(characterId,userHeroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 学习技能 返回可学技能
	 * @param session
	 * @param userHeroId
	 * @param heroSkillId
	 * @return
	 */
	@RequestMapping(value="learnSkill")
	@ResponseBody
	public Object learnSkill(HttpSession session,int userHeroId,String heroSkillNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			collegeService.learnSkill(characterId, userHeroId, heroSkillNo);
			return collegeService.getCanLearnSkill(characterId,userHeroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}

	public CollegeService getCollegeService() {
		return collegeService;
	}

	public void setCollegeService(CollegeService collegeService) {
		this.collegeService = collegeService;
	}
}
