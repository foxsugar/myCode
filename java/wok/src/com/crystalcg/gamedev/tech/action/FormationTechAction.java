package com.crystalcg.gamedev.tech.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.service.FormationTechService;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.domain.StaticFormationTech;

@Controller
public class FormationTechAction {
	private FormationTechService formationTechService;
	public static Map<Integer, String> techNoTempMap = new HashMap<Integer, String>();//暂时缓存用户编码，以后要删
	
	@RequestMapping(value="getFormationTechInfo")
	public @ResponseBody Map<String, Object> getFormationTechInfo(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return formationTechService.getFormationTechInfo(character.getId());
	}
	
	@RequestMapping(value="getFormationTechInfoByPage")
	public @ResponseBody List<Map<String, Object>> getFormationTechInfoByPage(HttpSession session,int page) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return formationTechService.getFormationTechInfoByPage(character.getId(), page);
	}
	
	@RequestMapping(value="levelUpFormation")
	public @ResponseBody Map<String, Object> levelUpFormation(HttpSession session, int page, int location) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return formationTechService.levelUpFormation(character.getId(), page, location);
	}
	@RequestMapping(value="levelDownFormation")
	public @ResponseBody Map<String, Object> levelDownFormation(HttpSession session, int page, int location) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return formationTechService.levelDownFormation(character.getId(), page, location);
	}
	@RequestMapping(value="getFormationStudying")
	public @ResponseBody Map<String, Object> getInteriorStudying(HttpSession session, int page) throws AppException{
		formationTechService.validatePageAndLocation(page, null);//验证页码
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		TechQueue userTechQueue = interiorTechService.getTechQueue(character.getId());//用内政科技里的方法，该方法为获取科技队列
		StaticFormationTech staticFormationTech = FormationCache.getFormationTechByNo(techNoTempMap.get(character.getId()));
		Map<String, Object> retMap;
		int pageSize = FormationCache.getFormationTechPageSize();
		if(userTechQueue!=null){
			retMap = new HashMap<String,Object>();
			retMap.put("studyingTech", InteriorTechAction.changeToViewMapForInterior(userTechQueue));
			retMap.put("userFormationTech", null);
		}else if(staticFormationTech!=null&&(page-1)*pageSize<=staticFormationTech.getTechLocation()&&staticFormationTech.getTechLocation()<page*pageSize){//从缓存中获取编号,刷新
			retMap = new HashMap<String,Object>();
			retMap.put("userFormationTech", formationTechService.getFormationTechInfoByPage(character.getId(), page));
			retMap.put("userFormationTechBase", formationTechService.getAllFormationTechInfo(character.getId()));
			retMap.put("studyingTech", null);
		}else if(staticFormationTech!=null){
			retMap = new HashMap<String,Object>();
			retMap.put("studyingTech", null);
			retMap.put("userFormationTechBase", formationTechService.getAllFormationTechInfo(character.getId()));
			retMap.put("userFormationTech", null);
		}else{
			retMap = new HashMap<String,Object>();
			retMap.put("studyingTech", null);
			retMap.put("userFormationTech", null);
		}
		return retMap;
	}

	public FormationTechService getFormationTechService() {
		return formationTechService;
	}

	public void setFormationTechService(FormationTechService formationTechService) {
		this.formationTechService = formationTechService;
	}
}
