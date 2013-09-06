package com.crystalcg.gamedev.tech.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.quartz.SchedulerException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.InteriorTechCache;
import com.crystalcg.gamedev.util.cache.SoldierTechCache;
import com.crystalcg.gamedev.util.cache.domain.StaticFormationTech;
import com.crystalcg.gamedev.util.cache.domain.StaticInteriorTech;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldierTech;

/**
 * 科教馆，内政部分
 * 
 * @author jinganyang
 * 
 */
@Controller
public class InteriorTechAction {
	private InteriorTechService interiorTechService;

	@RequestMapping(value = "getUserInteriorForView")
	public @ResponseBody
	Map<String, Object> getUserInteriorForView(HttpSession session)
			throws AppException {
		UserCharacter character = (UserCharacter) session
				.getAttribute("character");
		Map<String, Object> retMap = interiorTechService
				.getUserInteriorForView(character.getId());
		TechQueue userInteriorQueue = interiorTechService
				.getTechQueue(character.getId());
		if (userInteriorQueue != null) {
			retMap.put("studyingTech",
					changeToViewMapForInterior(userInteriorQueue));
		} else {
			retMap.put("studyingTech", null);
		}
		return retMap;
	}

	@RequestMapping(value = "levelUpInterior")
	public @ResponseBody
	Map<String, Object> levelUpInterior(HttpSession session, int techKey)
			throws AppException {
		UserCharacter character = (UserCharacter) session
				.getAttribute("character");
		return interiorTechService.levelUpInterior(character.getId(), techKey);
	}

	@RequestMapping(value = "levelDownInterior")
	public @ResponseBody
	Map<String, Object> levelDownInterior(HttpSession session, int techKey)
			throws AppException {
		UserCharacter character = (UserCharacter) session
				.getAttribute("character");
		return interiorTechService.levelDownInterior(character.getId(), techKey);
	}

	@RequestMapping(value = "stopStudying")
	public @ResponseBody
	int stopStudying(HttpSession session) throws AppException {
		UserCharacter character = (UserCharacter) session
				.getAttribute("character");
		return interiorTechService.stopStudying(character.getId());
	}

	@RequestMapping(value = "getInteriorStudying")
	public @ResponseBody
	Map<String, Object> getInteriorStudying(HttpSession session)
			throws AppException {
		UserCharacter character = (UserCharacter) session
				.getAttribute("character");
		TechQueue userInteriorQueue = interiorTechService
				.getTechQueue(character.getId());
		StaticInteriorTech staticInteriorTech = InteriorTechCache
				.getInteriorTechByNo(FormationTechAction.techNoTempMap
						.get(character.getId()));
		Map<String, Object> retMap;
		if (userInteriorQueue != null) {
			retMap = new HashMap<String,Object>();
			retMap.put("studyingTech",
					changeToViewMapForInterior(userInteriorQueue));
			retMap.put("userInteriorTech", null);
		} else if (staticInteriorTech != null) {// 从缓存中获取编号,刷新
		// retMap =
		// interiorTechService.getUserInteriorForView(character.getId());
			retMap = new HashMap<String,Object>();
			Map<String, Object> temp = new HashMap<String,Object>();
			temp.put("updateKey", staticInteriorTech.getTechKey());
			temp.put("updateEffect", staticInteriorTech.getTechEffectValue());
			temp.put("updateTechInfo", interiorTechService.getToolTipMap(
					staticInteriorTech,
					InteriorTechService.TECH_STATUS_HAS_STUDIED,character.getId()));
			retMap.put("studyingTech", null);
			retMap.put("userInteriorTech", temp);
		} else {
			retMap = new HashMap<String,Object>();
			retMap.put("studyingTech", null);
			retMap.put("userInteriorTech", null);
		}
		return retMap;
	}

	/**
	 * 用于将科技队列转换成前台数据，内政，兵种，阵法通用;
	 * 
	 * @param i
	 * @return
	 */
	public static Map<String, Object> changeToViewMapForInterior(TechQueue i) {
		Map<String, Object> retMap = new HashMap<String,Object>();
		StaticInteriorTech staticInteriorTech = InteriorTechCache
				.getInteriorTechByNo(i.getStudyTechNo());
		StaticSoldierTech staticSoldierTech = SoldierTechCache
				.getTech(i.getStudyTechNo());
		StaticFormationTech staticFormationTech = FormationCache
				.getFormationTechByNo(i.getStudyTechNo());
		String techName;
		int techLevel;
		if(staticInteriorTech!=null){
			techName = staticInteriorTech.getTechName();
			techLevel = staticInteriorTech.getTechLevel();
		} else if (staticSoldierTech != null) {
			techName = staticSoldierTech.getTechName();
			techLevel = staticSoldierTech.getTechLevel();
		} else if (staticFormationTech != null) {
			techName = staticFormationTech.getTechName();
			techLevel = staticFormationTech.getTechLevel();
		} else {
			techName = "无";
			techLevel = 0;
		}
		
		retMap.put("techName", techName);
		retMap.put("techLevel", techLevel);
		retMap.put("remainTime", i.getRemainTime());
		retMap.put("techNo", i.getStudyTechNo());
		return retMap;
	}
	/**
	 * 
	 * @param session
	 * @param techNo 科技编号
	 * @param speedType 加速类型1：行军，2练兵,3建筑(具体可查看Const接口、SPEED_FUNCTION_*)
	 * @param itemNo 使用加速物品道具编号
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException
	 * @throws SchedulerException 
	 */
	@RequestMapping(value = "speedTech")
	public @ResponseBody
	Map<String, Object> speedTech(HttpSession session/*, String techNo*/,int speedType,String itemNo,int confim)
			throws AppException, SchedulerException {
		UserCharacter character = (UserCharacter) session
				.getAttribute("character");
		return interiorTechService.saveSpeedTech(character.getId(),speedType,itemNo,confim);
	}
	public InteriorTechService getInteriorTechService() {
		return interiorTechService;
	}

	public void setInteriorTechService(InteriorTechService interiorTechService) {
		this.interiorTechService = interiorTechService;
	}
}
