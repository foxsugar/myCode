package com.crystalcg.gamedev.buildingFunction.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.buildingFunction.service.CellarService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 地窖
 * @author xuzhongxing
 */
@Controller
public class CellarAction {
	
	private CellarService cellarService;
	
//	/**
//	 * 初始化地窖界面
//	 */
//	@RequestMapping(value="initCellar")
//	@ResponseBody
//	public Object initCellar(HttpSession session){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		Map<String, Object> retMap = null;
//		try {
//			retMap = cellarService.initCellar(character.getId());
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//		return retMap;
//	}
	@RequestMapping(value="initCellar")
	@ResponseBody
	public Object initCellars(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		try {
			return cellarService.initCellars(character.getId());
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 开启保护
	 */
//	@RequestMapping(value="beginCellarProtect")
//	@ResponseBody
//	public Object beginCellarProtect(Integer time,Integer money,Integer food,Integer wood,Integer stone,Integer ironore,HttpSession session){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		try {
//			cellarService.beginCellarProtect(character.getId(), time, money, food, wood, stone, ironore);
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//		Map<String,String> retMap = new HashMap<String, String>();
//		retMap.put("status", "success");
//		return retMap;
//	}
	@RequestMapping(value="beginCellarProtect")
	@ResponseBody
	public Object beginCellarProtects(HttpSession session,int protectionNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		try {
			return cellarService.beginCellarProtects(character.getId(), protectionNo);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	@RequestMapping(value="cancelCellarProtect")
	@ResponseBody
	public Object cancelCellarProtects(HttpSession session,int protectionNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		try {
			cellarService.cancelCellarProtects(character.getId(), protectionNo);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	@RequestMapping(value="getCellarProtect")
	@ResponseBody
	public Object getCellarProtect(HttpSession session,int protectionNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		return cellarService.getCellarProtect(character.getId(), protectionNo);
	}
//	/**
//	 * 取消保护
//	 */
//	@RequestMapping(value="cancelCellarProtect")
//	@ResponseBody
//	public Object cancelCellarProtect(HttpSession session){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		try {
//			cellarService.cancelCellarProtect(character.getId());
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//		Map<String,String> retMap = new HashMap<String, String>();
//		retMap.put("status", "success");
//		return retMap;
//	}

	public CellarService getCellarService() {
		return cellarService;
	}

	public void setCellarService(CellarService cellarService) {
		this.cellarService = cellarService;
	}
	
}
