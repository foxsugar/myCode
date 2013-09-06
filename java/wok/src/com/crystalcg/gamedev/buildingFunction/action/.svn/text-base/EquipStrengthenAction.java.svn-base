package com.crystalcg.gamedev.buildingFunction.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.buildingFunction.service.EquipStrengthenService;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.Const;

@Controller
public class EquipStrengthenAction {
	
	private EquipStrengthenService equipStrengthenService;
	
	/**
	 * 打开强化界面时，向服务器请求装备分类信息
	 * @param session
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="/getEquipmentClass",method=RequestMethod.POST)
	public @ResponseBody Object getEquipmentClass(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		Map<String,Object> retMap = new HashMap<String, Object>();
		if(character == null){
			return new ClientError("这个账号已经掉线，请重新登录");
		}
		int characterId = character.getId();
		List<Map<String,Object>> equipmentTypeList = new ArrayList<Map<String,Object>>();
		Map<String, Object> all = new HashMap<String,Object>();
		all.put("value", "0");
		all.put("name", "全部");
		equipmentTypeList.add(all);
		equipmentTypeList.addAll(Const.EQUIPMENT_TYPE);
		List<Map<String, Object>> equipmenetPosition = equipStrengthenService.getUserHeroName(characterId);
		all = new HashMap<String,Object>();
		all.put("value", 0);
		all.put("name", "国库");
		equipmenetPosition.add(0, all);
		List<UserEquipment> equipments = null;
		try {
			equipments = equipStrengthenService.getEquipmentByPositonAndType(0, 0, characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		retMap.put("positon", equipmenetPosition);
		retMap.put("type", equipmentTypeList);
		retMap.put("equipments", filterEquipment(equipments));
		return retMap;
	}
	
	@RequestMapping(value="/getEquipmentByPositonAndType",method=RequestMethod.POST)
	public @ResponseBody Object getEquipmentByPositonAndType(HttpSession session,int equipPositon,int equipType) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("这个账号已经掉线，请重新登录");
		}
		int characterId = character.getId();
		List<UserEquipment> equipments;
		try {
			equipments = equipStrengthenService.getEquipmentByPositonAndType(equipPositon, equipType, characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return filterEquipment(equipments);
	}
	
	@RequestMapping(value="/getEquipmentStrengthenInfo",method=RequestMethod.POST)
	public @ResponseBody Object getEquipmentStrengthenInfo(HttpSession session,int id) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("这个账号已经掉线，请重新登录");
		}
		int characterId = character.getId();
		Map<String, Object> strengthenInfo = null;
		strengthenInfo = equipStrengthenService.getEquipmentStrengthenInfo(characterId, id);
		return strengthenInfo;
	}
	
	@RequestMapping(value="strengthenEquipment")
	public @ResponseBody Object strengthenEquipment(int id,HttpSession httpSession){
		UserCharacter character = (UserCharacter)httpSession.getAttribute("character");
		if(character == null){
			return new ClientError("这个账号已经掉线，请重新登录");
		}
		int characterId = character.getId();
		boolean isSuccess = false;
		Map<String,Object> strengthenInfo = null;
		try {
			isSuccess = this.equipStrengthenService.strengthen(characterId, id);
			strengthenInfo = equipStrengthenService.getEquipmentStrengthenInfo(characterId, id);
			strengthenInfo.put("isSuccess", isSuccess);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return strengthenInfo;
	}
	private List<Map<String, Object>> filterEquipment(List<UserEquipment> equipment) throws AppException{
		Map<String, Object> temp;
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		for(UserEquipment i: equipment){
			temp = new HashMap<String,Object>();
			temp.put("id", i.getId());
			temp.put("equipmentName", i.getEquipment().getEquipmentName());
			temp.put("quality", i.getEquipment().getQuality());
			temp.put("strengthLevel", i.getStrengthLevel());
			retList.add(temp);
		}
		return retList;
	}
	
	public EquipStrengthenService getEquipStrengthenService() {
		return equipStrengthenService;
	}

	public void setEquipStrengthenService(
			EquipStrengthenService equipStrengthenService) {
		this.equipStrengthenService = equipStrengthenService;
	}

}
