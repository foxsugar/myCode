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
import com.crystalcg.gamedev.buildingFunction.service.EmbedStoneService;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;

@Controller
public class EmbedStoneAction {
	
	private EmbedStoneService embedStoneService;
	
	/**
	 * 打开镶嵌界面时，向服务器请求装备分类信息
	 * @param session
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="/getEmbedStoneEquipmentClass")
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
		List<Map<String, Object>> equipmenetPosition = embedStoneService.getUserHeroName(characterId);
		all = new HashMap<String,Object>();
		all.put("value", 0);
		all.put("name", "国库");
		equipmenetPosition.add(0, all);
		List<UserEquipment> equipments = null;
		try {
			equipments = embedStoneService.getEquipmentByPositonAndType(0, 0, characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		retMap.put("positon", equipmenetPosition);
		retMap.put("type", equipmentTypeList);
		retMap.put("baseMoney", EmbedStoneService.EMBED_BASE_MONEY);
		retMap.put("equipments", filterEquipment(equipments));
		return retMap;
	}
	
	@RequestMapping(value="/getUserGemStone")
	public @ResponseBody Object getUserGemStone(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		return changeMaterials(embedStoneService.getUserGemStone(character.getId()));
	}
	@RequestMapping(value="/getEmbedStoneEquipment")
	public @ResponseBody Object getEquipmentByPositonAndType(HttpSession session,int equipPositon,int equipType) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		List<UserEquipment> equipments = null;
		try {
			equipments = embedStoneService.getEquipmentByPositonAndType(equipPositon, equipType, characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return filterEquipment(equipments);
	}
	
	@RequestMapping(value="/getEquipmentInfo")
	public @ResponseBody Map<String, Object> getEquipmentInfo(HttpSession session,int equipmentId) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		UserEquipment equipment = embedStoneService.getUserItem(characterId,equipmentId);;
		return changeEquipment(equipment);
	}
	
	/**
	 * 镶嵌宝石
	 * @param equipmentId
	 * @param stoneId
	 * @param holeIndex
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/embedStone",method=RequestMethod.POST)
	public @ResponseBody Object embed(int equipmentId,int stoneId,int holeIndex,HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character==null){
			return new ClientError("这个账号已经掉线，请重新登录");
		}
		return changeEquipment(embedStoneService.embed(equipmentId, stoneId, holeIndex, character.getId()));
	}
	
	/**
	 * 摘除宝石
	 * @param equipmentId
	 * @param holeIndex
	 * @param session
	 * @return
	 */
	@RequestMapping(value="exciseStone",method=RequestMethod.POST)
	public @ResponseBody Object excise(int equipmentId,int holeIndex,HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character==null){
			return new ClientError("这个账号已经掉线，请重新登录");
		}
		return changeEquipment(embedStoneService.excise(equipmentId, holeIndex, character.getId()));
	}
	private List<Map<String, Object>> filterEquipment(List<UserEquipment> equipments) throws AppException{
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		Map<String, Object> temp;
		Map<String, Object> stone1;
		Map<String, Object> stone2;
		Map<String, Object> stone3;
		for(UserEquipment i :equipments){
			temp= new HashMap<String,Object>();
			temp.put("id", i.getId());
			temp.put("equipmentName", i.getEquipment().getEquipmentName());
			temp.put("quality", i.getEquipment().getQuality());
			temp.put("stone1", null);
			temp.put("stone2", null);
			temp.put("stone3", null);
			if(i.getStone1()!=null){
				stone1 = new HashMap<String,Object>();
				stone1.put("attributeType", i.getStone1().getAttributeType());
				String[] stoneNo = i.getStone1().getMaterialNo().split("_");
				stone1.put("gemstoneLevel", stoneNo[1]);
				temp.put("stone1", stone1);
			}
			if(i.getStone2()!=null){
				stone2 = new HashMap<String,Object>();
				stone2.put("attributeType", i.getStone2().getAttributeType());
				String[] stoneNo = i.getStone2().getMaterialNo().split("_");
				stone2.put("gemstoneLevel", stoneNo[1]);
				temp.put("stone2", stone2);
			}
			if(i.getStone3()!=null){
				stone3 = new HashMap<String,Object>();
				stone3.put("attributeType", i.getStone3().getAttributeType());
				String[] stoneNo = i.getStone3().getMaterialNo().split("_");
				stone3.put("gemstoneLevel", stoneNo[1]);
				temp.put("stone3", stone3);
			}
			retList.add(temp);
		}
		return retList;
	}
	
	private final Map<String, Object> changeEquipment(UserEquipment userEquipment) throws AppException{
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(userEquipment));
		retMap.put("icon", userEquipment.getEquipment().getIcon());
		retMap.put("id", userEquipment.getId());
		retMap.put("type", userEquipment.getItemType());
		if(userEquipment.getStone1()!=null){
			retMap.put("stone1", changeMaterial(userEquipment.getStone1()));
		}
		if(userEquipment.getStone2()!=null){
			retMap.put("stone2", changeMaterial(userEquipment.getStone2()));
		}
		if(userEquipment.getStone3()!=null){
			retMap.put("stone3", changeMaterial(userEquipment.getStone3()));
		}
		return retMap;
	}
	
	private final List<Map<String, Object>> changeMaterials(List<UserMaterial> userMaterials){
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		Map<String, Object> temp;
		for(UserMaterial i: userMaterials){
			temp = new HashMap<String,Object>();
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(i));
			temp.put("icon", i.getMaterial().getIcon());
			temp.put("id", i.getId());
			temp.put("type", i.getItemType());
			temp.put("amount", i.getItemAmount());
			temp.put("gemStoneLevel", i.getMaterial().getGemstoneLevel());
			retList.add(temp);
		}
		return retList;
	}
	private final Map<String, Object> changeMaterial(StaticMaterial staticMaterial){
		Map<String, Object> temp = new HashMap<String,Object>();
		temp.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(staticMaterial));
		temp.put("icon", staticMaterial.getIcon());
		temp.put("type", staticMaterial.getItemType());
		temp.put("gemStoneLevel", staticMaterial.getGemstoneLevel());
		temp.put("attributeType", staticMaterial.getAttributeType());
		return temp;
	}
	
	public EmbedStoneService getEmbedStoneService() {
		return embedStoneService;
	}

	public void setEmbedStoneService(EmbedStoneService embedStoneService) {
		this.embedStoneService = embedStoneService;
	}

}
