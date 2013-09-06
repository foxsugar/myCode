package com.crystalcg.gamedev.buildingFunction.action;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.buildingFunction.service.HospitalService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 太医署
 * @author xuzhongxing
 *
 */
@Controller
public class HospitalAction {
	
	private HospitalService hospitalService;
	
	@RequestMapping(value="initHospital")
	@ResponseBody
	public Object initHospital(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return hospitalService.initHospital(characterId);
	}
	
	@RequestMapping(value="cureUserHero")
	@ResponseBody
	public Object cureUserHero(HttpSession session,int userHeroId) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			hospitalService.cureUserHero(characterId, userHeroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return hospitalService.initHospital(characterId);
	}
	
	@RequestMapping(value="cureAllUserHero")
	@ResponseBody
	public Object cureAllUserHero(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			hospitalService.cureAllUserHero(characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return hospitalService.initHospital(characterId);
	}

	public HospitalService getHospitalService() {
		return hospitalService;
	}

	public void setHospitalService(HospitalService hospitalService) {
		this.hospitalService = hospitalService;
	}

}
