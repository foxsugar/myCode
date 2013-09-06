package com.crystalcg.gamedev.item.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.domain.UserQuests;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.cache.domain.StaticEquipment;
import com.crystalcg.gamedev.util.cache.domain.StaticItem;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;
import com.crystalcg.gamedev.util.cache.domain.StaticQuests;

/**
 * 道具相关操作
 * @author jinganyang
 *
 */
@Controller
public class UserItemAction {
	
	private UserItemService userItemService;
	private Logger logger = LoggerFactory.getLogger(UserItemAction.class);
//	获取道具
	
	@RequestMapping(value="getAllArticles")
	public @ResponseBody Object getAllArticles(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("获取不到账号信息，请重新登录");
			return new ClientError("获取不到账号信息，请重新登录");
		}
		List<Object> retList = new ArrayList<Object>();
		retList.addAll(changeEquipment(userItemService.getAllUserEquipmentInBag(character.getId())));
		retList.addAll(changeItem(userItemService.getAllUserItemInBag(character.getId())));
		retList.addAll(changeMaterial(userItemService.getAllUserMaterialInBag(character.getId())));
		retList.addAll(changeQuests(userItemService.getAllUserQuestsInBag(character.getId())));
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("articles", retList);
		retMap.put("limit", userItemService.getArticleAmountLimit(character.getId()));
		return retMap;
	}
	
	
	/**
	 * 获取国库内所有装备
	 * @param session
	 * @return
	 */
	@RequestMapping(value="getAllEquipment")
	public @ResponseBody Object getAllEquipment(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("获取不到账号信息，请重新登录");
			return new ClientError("获取不到账号信息，请重新登录");
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("articles", changeEquipment(userItemService.getAllUserEquipmentInBag(character.getId())));
		retMap.put("limit", userItemService.getArticleAmountLimit(character.getId()));
		return retMap;
	}
	
	/**
	 * 获取国库内所有材料
	 * @param session
	 * @return
	 */
	@RequestMapping(value="getAllMaterial")
	public @ResponseBody Object getAllMaterial(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("获取不到账号信息，请重新登录");
			return new ClientError("获取不到账号信息，请重新登录");
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("articles", changeMaterial(userItemService.getAllUserMaterialInBag(character.getId())));
		retMap.put("limit", userItemService.getArticleAmountLimit(character.getId()));
		return retMap;
	}
	
	/**
	 * 获取所有道具
	 * @param session
	 * @return
	 */
	@RequestMapping(value="getAllUserItem")
	public @ResponseBody Object getAllUserItem(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("获取不到账号信息，请重新登录");
			return new ClientError("获取不到账号信息，请重新登录");
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("articles", changeItem(userItemService.getAllUserItemInBag(character.getId())));
		retMap.put("limit", userItemService.getArticleAmountLimit(character.getId()));
		return retMap;
	}
	
	
	/**
	 * 获取任务物品
	 * @param session
	 * @return
	 */
	@RequestMapping(value="getAllQuests")
	public @ResponseBody Object getAllQuests(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("获取不到账号信息，请重新登录");
			return new ClientError("获取不到账号信息，请重新登录");
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("articles", changeQuests(userItemService.getAllUserQuestsInBag(character.getId())));
		retMap.put("limit", userItemService.getArticleAmountLimit(character.getId()));
		return retMap;
	}
	
	@RequestMapping(value="useItem")
	public @ResponseBody Object useItem(int id, int amount, HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		userItemService.useItem(id, character.getId(), amount);
		return getAllUserItem(session);
	}
	
	@RequestMapping(value="deleteUserItem")
	public @ResponseBody boolean deleteUserItem(int id, int itemType, HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		userItemService.deleteItemInBag(id, character.getId(), itemType);
		return true;
	}
//	卖道具
	@RequestMapping(value="sellItem")
	public @ResponseBody boolean sellItem(int id, int itemType,HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		userItemService.sellItem(id, itemType, character.getId());
		return true;
	}
	@RequestMapping(value="tidyBag")
	public @ResponseBody Object tidyBag(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		userItemService.tidyBag(character.getId());
		List<Object> retList = new ArrayList<Object>();
		retList.addAll(userItemService.getAllUserEquipmentInBag(character.getId()));
		retList.addAll(userItemService.getAllUserItemInBag(character.getId()));
		retList.addAll(userItemService.getAllUserMaterialInBag(character.getId()));
		retList.addAll(userItemService.getAllUserQuestsInBag(character.getId()));
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("articles", retList);
		retMap.put("limit", userItemService.getArticleAmountLimit(character.getId()));
		return retMap;
	}
	@RequestMapping(value="addItem2character")
	public @ResponseBody boolean addItem2character(HttpSession session, String itemNo,
			int itemType, int itemAmount, int itemPosition, int isBound) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		userItemService.addItem2character(character.getId(), itemNo, itemType, itemAmount, itemPosition, isBound);
		return true;
	}

	
	public UserItemService getUserItemService() {
		return userItemService;
	}

	public void setUserItemService(UserItemService userItemService) {
		this.userItemService = userItemService;
	}
	private final List<Map<String, Object>> changeEquipment(List<UserEquipment> userEquipments) throws AppException{
		Map<String, Object> temp;
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		for(UserEquipment i:userEquipments){
			temp = new HashMap<String,Object>();
			temp.put("id", i.getId());
			temp.put("type", i.getItemType());
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(i));
			StaticEquipment staticEquipment = i.getEquipment();
			temp.put("dropAble", staticEquipment.getDropable());
			temp.put("sellAble", staticEquipment.getSellable());
			temp.put("icon", staticEquipment.getIcon());
			retList.add(temp);
		}
		return retList;
	}
	private final List<Map<String, Object>> changeItem(List<UserItem> userItems){
		Map<String, Object> temp;
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		for(UserItem i:userItems){
			temp = new HashMap<String,Object>();
			temp.put("id", i.getId());
			temp.put("type", i.getItemType());
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeItemToToolTip(i));
			StaticItem staticItem = i.getItem();
			temp.put("icon", staticItem.getIcon());
			temp.put("dropable", staticItem.getDropable());
			temp.put("sellable", staticItem.getSellable());
			temp.put("useable", staticItem.getUseable());
			temp.put("batchUseable", staticItem.getBatchUseable());
			temp.put("amount", i.getItemAmount());
			retList.add(temp);
		}
		return retList;
	}
	private final List<Map<String, Object>> changeMaterial(List<UserMaterial> userMaterials) throws AppException{
		Map<String, Object> temp;
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		for(UserMaterial i:userMaterials){
			temp = new HashMap<String,Object>();
			temp.put("id", i.getId());
			temp.put("type", i.getItemType());
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(i));
			StaticMaterial staticMaterial = i.getMaterial();
			temp.put("icon", staticMaterial.getIcon());
			temp.put("dropable", staticMaterial.getDropable());
			temp.put("sellable", staticMaterial.getSellable());
			temp.put("amount", i.getItemAmount());
			retList.add(temp);
		}
		return retList;
	}
	private final List<Map<String, Object>> changeQuests(List<UserQuests> userQuests){
		Map<String, Object> temp;
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		for(UserQuests i:userQuests){
			temp = new HashMap<String,Object>();
			temp.put("id", i.getId());
			temp.put("type", i.getItemType());
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeQuestsToToolTip(i));
			StaticQuests staticQuests = i.getQuests();
			temp.put("icon", staticQuests.getIcon());
			temp.put("dropable", staticQuests.getDropable());
			temp.put("amount", i.getItemAmount());
			retList.add(temp);
		}
		return retList;
	}
}
