package com.crystalcg.gamedev.buildingFunction.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.buildingFunction.service.GemstoneService;
import com.crystalcg.gamedev.buildingFunction.service.MaterialCompoundService;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;

@Controller
public class MaterialCompoundAction {
	private MaterialCompoundService materialCompoundService;
	
	@RequestMapping(value="getMaterialFuseInfo")
	public @ResponseBody Map<String,Object> getMaterialFuseInfo(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		List<UserMaterial> materials = materialCompoundService.getMaterialInBag(characterId);
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("materials", changeMaterials(materials));
		Map<String, Object> formula = new HashMap<String,Object>();
		formula.put("factor", GemstoneService.FACTORS);
		formula.put("baseMoney", GemstoneService.FUSE_BASE_MONEY);
		retMap.put("formula", formula);
		retMap.put("successRate", GemstoneService.SUCCESS_RATE);
		return retMap;
	}
	
	@RequestMapping(value="fuseMaterial")
	public @ResponseBody Map<String,Object> fuseMaterial(HttpSession session,int[] ids) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		Map<String,Object> retMap = materialCompoundService.fuseMaterial(ids, characterId);
		List<UserMaterial> materials = materialCompoundService.getMaterialInBag(characterId);
		retMap.put("materials", changeMaterials(materials));
		return retMap;
	}
	private final List<Map<String, Object>> changeMaterials(List<UserMaterial> userMaterials){
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp;
		for(UserMaterial i: userMaterials){
			temp = new HashMap<String,Object>();
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(i));
			temp.put("icon", i.getMaterial().getIcon());
			temp.put("materialLevel", i.getMaterial().getMaterialLevel());
			temp.put("id", i.getId());
			temp.put("type", i.getItemType());
			temp.put("amount", i.getItemAmount());
			temp.put("no", i.getItemNo());
			retList.add(temp);
		}
		return retList;
	}
	
	public MaterialCompoundService getMaterialCompoundService() {
		return materialCompoundService;
	}
	public void setMaterialCompoundService(
			MaterialCompoundService materialCompoundService) {
		this.materialCompoundService = materialCompoundService;
	}
}
