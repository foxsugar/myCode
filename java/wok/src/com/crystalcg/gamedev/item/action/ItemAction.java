package com.crystalcg.gamedev.item.action;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.item.service.ItemService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 道具相关操作
 * @author jinganyang
 *
 */
@Controller
public class ItemAction {
	
	private ItemService itemService;
	private static Logger logger = LoggerFactory.getLogger(ItemAction.class);
	
	
	@RequestMapping(value="getAllArticleInfo")
	public @ResponseBody Map<String, Object> getAllItem(){
		return itemService.getAllArticles();
	}
	@RequestMapping(value="getResourceInfo")
	public @ResponseBody Maincity getBaseAndResource(HttpSession session){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return itemService.getBaseAndResource(character.getId());
	}
	@RequestMapping(value="addItem")
	public @ResponseBody boolean addItem(HttpSession session, String itemNo, int itemType) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		itemService.addItem(character.getId(), itemNo, itemType);
		return true;
	}
	@RequestMapping(value="updateResourceForTest")
	public @ResponseBody boolean updateResourceForTest(HttpSession session,int food, int wood, int stone, int ironore, int money) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		itemService.updateResourceForTest(character.getId(), food, wood, stone, ironore, money);
		return true;
	}

	public ItemService getItemService() {
		return itemService;
	}

	public void setItemService(ItemService itemService) {
		this.itemService = itemService;
	}

}
