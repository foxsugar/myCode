package com.crystalcg.gamedev.buildingFunction.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.buildingFunction.service.EquipDesignService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.Const;

@Controller
public class EquipDesignAction {
	private EquipDesignService equipDesignService;
	/**
	 * 客户端请求打造装备时调用的方法
	 * @param userItemIdForDesign，设计图样的userItemId
	 * @param makeCounts，打造数量
	 * @param userItemIdForSuccess，成功服道具的userItemId
	 * @param session 会话参数
	 * @return
	 */
	@RequestMapping(value="makeEquipment")
	public @ResponseBody Object makeEquipment(HttpSession session, String planNo, int materialLevel, int produceAmount) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		equipDesignService.produce(character.getId(), planNo, materialLevel, produceAmount);
		return true;
		
	}
	/**
	 * 获取游戏中的装备所有类型
	 * @param session
	 * @return
	 */
	@RequestMapping(value="getEquipSubType")
	public @ResponseBody Map<String,Object> getEquipSubTypeCanBeMade(HttpSession session){
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("equipSubType", equipDesignService.getEquipSubTypeCanBeMade());
		retMap.put("equipDefault", equipDesignService.getEquipCanBeMadeForViewByType(Integer.parseInt((String)Const.EQUIPMENT_TYPE.get(0).get("value"))));
		retMap.put("materialLevel", Const.MATERIAL_LEVEL_LIST);

		return retMap;
	}
	/**
	 * 选择装备类型，获取游戏里可打造的所有该类型装备
	 * @param subType， 装备类型
	 * @return
	 */
	@RequestMapping(value="getEquipCanBeMade")
	public @ResponseBody Object getEquipCanBeMade(int equipmentType){
			return equipDesignService.getEquipCanBeMadeForViewByType(equipmentType);
	}
	/**
	 * 选择要打造的装备，获得打造相关的信息，如需要的材料，拥有的材料等
	 * @param session
	 * @param equipSign 要打造的装备标识，即装备itemId
	 * @return
	 */
	@RequestMapping(value="getEquipMadeInfo")
	public @ResponseBody Map<String,Object> getEquipMadeInfo(HttpSession session, String planNo, int materialLevel) throws AppException{
		UserCharacter character =(UserCharacter) session.getAttribute("character");
		return equipDesignService.getProduceInfo(character.getId(), planNo, materialLevel);
	}
	public EquipDesignService getEquipDesignService() {
		return equipDesignService;
	}
	public void setEquipDesignService(EquipDesignService equipDesignService) {
		this.equipDesignService = equipDesignService;
	}

}
