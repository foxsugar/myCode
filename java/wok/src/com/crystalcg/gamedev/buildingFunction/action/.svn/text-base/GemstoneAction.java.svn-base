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
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;

@Controller
public class GemstoneAction {
	
	private GemstoneService gemstoneService;
	
	@RequestMapping(value="getFuseInfo")
	public @ResponseBody Map<String,Object> getFuseInfo(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		List<UserMaterial> gemstones = gemstoneService.getGemStoneInBag(characterId);
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("gemstones", changeMaterials(gemstones));
		Map<String, Object> formula = new HashMap<String,Object>();
		formula.put("factor", GemstoneService.FACTORS);
		formula.put("baseMoney", GemstoneService.FUSE_BASE_MONEY);
		retMap.put("formula", formula);
		retMap.put("successRate", GemstoneService.SUCCESS_RATE);
		return retMap;
	}

	
//	@RequestMapping(value="getGemstones")
//	public @ResponseBody List<Map<String,Object>> getGemstones(HttpSession session) throws FileNotFoundException, IOException{
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		int charId = character.getCharId();
//		List<Map<String,Object>> gemstones = gemstoneService.getUserGemstone(charId);
//		return gemstones;
//	}
	
	@RequestMapping(value="fuse")
	public @ResponseBody Map<String,Object> fuse(HttpSession session,int[] ids) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		Map<String,Object> retMap = gemstoneService.fuseGemstone(ids, characterId);
		List<UserMaterial> gemstones = gemstoneService.getGemStoneInBag(characterId);
		retMap.put("gemstones", changeMaterials(gemstones));
		return retMap;
	}
	
	private final List<Map<String, Object>> changeMaterials(List<UserMaterial> userMaterials){
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp;
		for(UserMaterial i: userMaterials){
			temp = new HashMap<String,Object>();
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(i));
			temp.put("icon", i.getMaterial().getIcon());
			temp.put("gemstoneLevel", i.getMaterial().getGemstoneLevel());
			temp.put("id", i.getId());
			temp.put("type", i.getItemType());
			temp.put("amount", i.getItemAmount());
			temp.put("no", i.getItemNo());
			retList.add(temp);
		}
		return retList;
	}

	public GemstoneService getGemstoneService() {
		return gemstoneService;
	}

	public void setGemstoneService(GemstoneService gemstoneService) {
		this.gemstoneService = gemstoneService;
	}
}
