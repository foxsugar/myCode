package com.crystalcg.gamedev.item.action;

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
import com.crystalcg.gamedev.item.domain.Auction;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.service.AuctionService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticEquipment;
import com.crystalcg.gamedev.util.cache.domain.StaticItem;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;

@Controller
public class AuctionAction {
	private AuctionService auctionService;
	
	/****************************拍卖部分**********************************/
	@RequestMapping(value="sellItemByAuction")
	public @ResponseBody Map<String,Object> sellItemByAuction(int id,int itemType, int basePrice,int fixedPrice,int savingTime, int amount,HttpSession session) throws AppException {
		if(savingTime!=0&&savingTime!=1&&savingTime!=2){
			throw new AppException("保管时间错误！");
		}
		if(basePrice<Const.AUCTION_MIN_BASE_PRICE){
			throw new AppException("底价不能少于"+Const.AUCTION_MIN_BASE_PRICE+"!");
		}
		if(basePrice>=fixedPrice){
			throw new AppException("一口价必须高于底价！");
		}
		if(basePrice==0){
			throw new AppException("底价不能为0！");
		}
		if(fixedPrice==0){
			throw new AppException("一口价不能为0！");
		}
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		int change = auctionService.sellItemByAuction(id, itemType, basePrice, fixedPrice, savingTime, amount,character.getId());
		Map<String,Object> retMap = new HashMap<String, Object>();
		int pages = auctionService.getPages(character.getId(), "", 0, 0, 0, 0, 0, Const.PAGE_SIZE_MYAUCTION);
		retMap.put("pages", pages);
		if(pages==0){
			retMap.put("page", 0);
			retMap.put("userAuctionItem", null);
		}else{
			retMap.put("page", Const.DEFAULT_PAGE);
			List<Map<String,Object>> auctionItem = addStaticInfo(auctionService.getMyAuctionItem(character.getId(),Const.DEFAULT_PAGE));//参数1为显示第1页
			retMap.put("userAuctionItem", auctionItem);
		}
		retMap.put("auctionItemRefresh", change);
		return retMap;
	}
	@RequestMapping(value="getMyAuctionItemInfo")
	public @ResponseBody Map<String,Object> getMyAuctionItem(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("savingTimeInfo", Const.SAVING_TIME_INFO);
		retMap.put("cashUserHave", character.getCash());
		int pages = auctionService.getPages(character.getId(), "", 0, 0, 0, 0, 0, Const.PAGE_SIZE_MYAUCTION);//参数0为全部
		retMap.put("pages", pages);
		if(pages==0){
			retMap.put("page", 0);
			retMap.put("userAuctionItem", null);
		}else{
			retMap.put("page", Const.DEFAULT_PAGE);
			List<Map<String,Object>> auctionItem = addStaticInfo(auctionService.getMyAuctionItem(character.getId(),Const.DEFAULT_PAGE));//参数1为显示第1页
			retMap.put("userAuctionItem", auctionItem);
		}
		return retMap;
	}
	@RequestMapping(value="getMyAuctionItemByPage")
	public @ResponseBody Map<String,Object> getMyAuctionItemByPage(HttpSession session,int page) throws AppException{
		if(page<1){
			throw new AppException("请求页码错误！");
		}
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		Map<String,Object> retMap = new HashMap<String, Object>();
		int pages = auctionService.getPages(character.getId(), "", 0, 0, 0, 0, 0, Const.PAGE_SIZE_MYAUCTION);//参数0为全部
		if(page>pages){
			page = pages;
		}
		if(pages!=0){
			retMap.put("pages", pages);
			retMap.put("page", page);
			List<Map<String,Object>> auctionItem = addStaticInfo(auctionService.getMyAuctionItem(character.getId(),page));
			retMap.put("userAuctionItem",auctionItem);
			return retMap;
		}else{
			retMap.put("pages", pages);
			retMap.put("page", page);
			retMap.put("userAuctionItem", null);
			return retMap;
		}
	}
	@RequestMapping(value="cancelAuctionOperate")
	public @ResponseBody Map<String,Object> cancelAuctionOperate(int auctionId, int page, HttpSession session) throws AppException{
		if(page<1){
			throw new AppException("请求页码错误！");
		}
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		Map<String,Object> retMap = new HashMap<String, Object>();
		try{
			this.auctionService.cancelAuctionOperate(auctionId, character.getId());
		}catch (AppException e) {
			// TODO: handle exception
			if(e.getMessage()=="1"){
				retMap.put("warn", "该物品不存在！可能已经到时间或被拍走！");
				int pages = auctionService.getPages(character.getId(), "", 0, 0, 0, 0, 0, Const.PAGE_SIZE_MYAUCTION);//参数0为全部,或不考虑该条件
				if(page>pages){
					page = pages;
				}
				if(pages!=0){
					List<Map<String,Object>> auctionItem = addStaticInfo(auctionService.getMyAuctionItem(character.getId(), page));
					retMap.put("userAuctionItem", auctionItem);
					retMap.put("page", page);
					retMap.put("pages", pages);
					return retMap;
				}else{
					retMap.put("userAuctionItem", null);
					retMap.put("page", page);
					retMap.put("pages", pages);
					return retMap;
				}
			}else{
				throw e;
			}
		}
		int pages = auctionService.getPages(character.getId(), "", 0, 0, 0, 0, 0, Const.PAGE_SIZE_MYAUCTION);//参数0为全部,或不考虑该条件
		if(page>pages){
			page = pages;
		}
		if(pages!=0){
			List<Map<String,Object>> auctionItem = addStaticInfo(auctionService.getMyAuctionItem(character.getId(), page));
			retMap.put("userAuctionItem", auctionItem);
			retMap.put("page", page);
			retMap.put("pages", pages);
			return retMap;
		}else{
			retMap.put("userAuctionItem", null);
			retMap.put("page", page);
			retMap.put("pages", pages);
			return retMap;
		}
	}

	
	/***************************查询部分*****************************/
	@RequestMapping(value="getAuctionInfo")
	public @ResponseBody Map<String,Object> getAuctionInfo(HttpSession session){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("cashUserHave", character.getCash());
		retMap.put("itemType", Const.AUCTION_ITEM_TYPE);
		retMap.put("itemSubType", Const.ALL_SUBTYPE_IN_AUCTION);
		return retMap;
		
	}
	
	
	@RequestMapping(value="getItemInfoInAuction" ,method = RequestMethod.POST)
	public @ResponseBody Map<String,Object> getItemInfoInAuction(String itemName,int itemType,int itemSubtype,int quality,int levelMax , int levelMin , HttpSession session) throws AppException{
		Map<String,Object> retMap = new HashMap<String, Object>();
		Map<String,Object> selectCondition = new HashMap<String, Object>();
		selectCondition.put("itemName", itemName);
		selectCondition.put("itemType", itemType);
		selectCondition.put("itemSubtype", itemSubtype);
		selectCondition.put("quality", quality);
		selectCondition.put("levelMax", levelMax);
		selectCondition.put("levelMin", levelMin);
		selectCondition.put("order", Const.DEFAULT_ORDER);
		session.setAttribute("selectCondition", selectCondition);
		int pages = auctionService.getPages(0, itemName, quality, itemType, itemSubtype, levelMin , levelMax, Const.PAGE_SIZE_AUCTION);
		retMap.put("pages", pages);
		if(pages==0){
			retMap.put("page", 0);
			retMap.put("ItemInfoInAuction", null);
		}else{
			retMap.put("page", Const.DEFAULT_PAGE);
			retMap.put("ItemInfoInAuction", addStaticInfo(auctionService.getItemInfoInAuction( itemName, itemType, itemSubtype, quality, levelMin ,  levelMax , Const.DEFAULT_PAGE,Const.DEFAULT_ORDER)));
		}
		return retMap;
	}
	@RequestMapping(value="getAuctionItemByOrder")
	public @ResponseBody Map<String,Object> getAuctionItemByOrder(int order,HttpSession session) throws AppException{
		Map<String,Object> retMap = new HashMap<String, Object>();
		Map<String,Object> param = (Map<String,Object>)session.getAttribute("selectCondition");
		if(param!=null){
			param.put("order", order);
			int pages = auctionService.getPages(0, (String)param.get("itemName"), (Integer)param.get("quality"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax"), Const.PAGE_SIZE_AUCTION);
			retMap.put("pages", pages);
			if(pages==0){
				retMap.put("page", 0);
				retMap.put("ItemInfoInAuction", null);
			}else{
				retMap.put("page", Const.DEFAULT_PAGE);
				retMap.put("ItemInfoInAuction", addStaticInfo(auctionService.getItemInfoInAuction( (String)param.get("itemName"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("quality"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax")  , Const.DEFAULT_PAGE,order)));
			}
		}
		return retMap;
	}
	@RequestMapping(value="getAuctionItemByPage")
	public @ResponseBody Map<String,Object> getAuctionItemByPage(int page,HttpSession session) throws AppException{
		if(page<1){
			throw new AppException("请求页码错误！");
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		Map<String,Object> param = (Map<String,Object>)session.getAttribute("selectCondition");
		
		if(param!=null){
			int pages = auctionService.getPages(0, (String)param.get("itemName"), (Integer)param.get("quality"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax"), Const.PAGE_SIZE_AUCTION);
			if(pages<page){
				page=pages;
			}
			if(pages!=0){
				retMap.put("ItemInfoInAuction", addStaticInfo(auctionService.getItemInfoInAuction( (String)param.get("itemName"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("quality"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax")  , page, (Integer)param.get("order"))));
				retMap.put("pages", pages);
				retMap.put("page", page);
			}else{
				retMap.put("ItemInfoInAuction", null);
				retMap.put("pages", pages);
				retMap.put("page", page);
			}
		}
		return retMap;
	}
	
	@RequestMapping(value="buyItemByAuction")
	public @ResponseBody Map<String,Object> buyItemByAuction(int auctionId,int bid, int page, HttpSession session) throws AppException{
		if(page<1){
			throw new AppException("请求页码错误！");
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		Map<String,Object> param = (Map<String,Object>)session.getAttribute("selectCondition");
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		int cashRefresh = character.getCash();
		try{
			int cashReturn = this.auctionService.buyItemByAuction(auctionId, bid, character.getId());
			cashRefresh = cashReturn;
		}catch (AppException e) {
			// TODO: handle exception
			if(e.getMessage()=="1"){
				retMap.put("warn", "该物品不存在！可能已经到时间或被拍走！");
				character.setCash(cashRefresh);
				retMap.put("cashRefresh", cashRefresh);
				if(param!=null){
					int pages = auctionService.getPages(0, (String)param.get("itemName"), (Integer)param.get("quality"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax"), Const.PAGE_SIZE_AUCTION);
					if(pages<page){
						page=pages;
					}
					if(pages!=0){
						retMap.put("ItemInfoInAuction", addStaticInfo(auctionService.getItemInfoInAuction( (String)param.get("itemName"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("quality"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax")  , page, (Integer)param.get("order"))));
						retMap.put("pages", pages);
						retMap.put("page", page);
					}else{
						retMap.put("ItemInfoInAuction", null);
						retMap.put("pages", pages);
						retMap.put("page", page);
					}
				}
				return retMap;
			}else{
				throw e;
			}
		}
		character.setCash(cashRefresh);
		retMap.put("cashRefresh", cashRefresh);
		if(param!=null){
			int pages = auctionService.getPages(0, (String)param.get("itemName"), (Integer)param.get("quality"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax"), Const.PAGE_SIZE_AUCTION);
			if(pages<page){
				page=pages;
			}
			if(pages!=0){
				retMap.put("ItemInfoInAuction", addStaticInfo(auctionService.getItemInfoInAuction( (String)param.get("itemName"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("quality"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax")  , page, (Integer)param.get("order"))));
				retMap.put("pages", pages);
				retMap.put("page", page);
			}else{
				retMap.put("ItemInfoInAuction", null);
				retMap.put("pages", pages);
				retMap.put("page", page);
			}
		}
		return retMap;
	}
	@RequestMapping(value="buyItemByFixePrice")
	public @ResponseBody Map<String,Object> buyItemByFixePrice(int auctionId, int page, HttpSession session) throws AppException{
		if(page<1){
			throw new AppException("请求页码错误！");
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		Map<String,Object> param = (Map<String,Object>)session.getAttribute("selectCondition");
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		int cashRefresh = character.getCash();
		try{
			int cashReturn = this.auctionService.buyItemByFixePrice(auctionId, character.getId());
			cashRefresh = cashReturn;
		}catch (AppException e) {
			// TODO: handle exception
			if(e.getMessage()=="1"){
				retMap.put("warn", "该物品不存在！可能已经到时间或被拍走！");
				character.setCash(cashRefresh);
				retMap.put("cashRefresh", cashRefresh);
				if(param!=null){
					int pages = auctionService.getPages(0, (String)param.get("itemName"), (Integer)param.get("quality"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax"), Const.PAGE_SIZE_AUCTION);
					if(pages<page){
						page=pages;
					}
					if(pages!=0){
						retMap.put("ItemInfoInAuction", addStaticInfo(auctionService.getItemInfoInAuction( (String)param.get("itemName"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("quality"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax")  , page, (Integer)param.get("order"))));
						retMap.put("pages", pages);
						retMap.put("page", page);
					}else{
						retMap.put("ItemInfoInAuction", null);
						retMap.put("pages", pages);
						retMap.put("page", page);
					}
				}
				return retMap;
			}else{
				throw e;
			}
			
		}
		character.setCash(cashRefresh);
		retMap.put("cashRefresh", cashRefresh);
		if(param!=null){
			int pages = auctionService.getPages(0, (String)param.get("itemName"), (Integer)param.get("quality"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax"), Const.PAGE_SIZE_AUCTION);
			if(pages<page){
				page=pages;
			}
			if(pages!=0){
				retMap.put("ItemInfoInAuction", addStaticInfo(auctionService.getItemInfoInAuction( (String)param.get("itemName"), (Integer)param.get("itemType"), (Integer)param.get("itemSubtype"), (Integer)param.get("quality"), (Integer)param.get("levelMin") , (Integer)param.get("levelMax")  , page, (Integer)param.get("order"))));
				retMap.put("pages", pages);
				retMap.put("page", page);
			}else{
				retMap.put("ItemInfoInAuction", null);
				retMap.put("pages", pages);
				retMap.put("page", page);
			}
		}
		return retMap;
	}
	@RequestMapping(value="buyItemByFixedPriceInBidPage")
	public @ResponseBody Map<String,Object> buyItemByFixedPriceInBidPage(int auctionId, int page, HttpSession session) throws AppException{
		if(page<1){
			throw new AppException("请求页码错误！");
		}
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		Map<String,Object> retMap = new HashMap<String, Object>();
		int cashRefresh = character.getCash();
		try{
			int cashReturn = this.auctionService.buyItemByFixePrice(auctionId, character.getId());
			cashRefresh = cashReturn;
		}catch (AppException e) {
			// TODO: handle exception
			if(e.getMessage() == "1"){
				retMap.put("warn", "该物品不存在！可能已经到时间或被拍走！");
				character.setCash(cashRefresh);
				retMap.put("cashRefresh", cashRefresh);
				int pages = auctionService.getPagesForBidPage(character.getId());
				if(pages<page){
					page=pages;
				}
				if(pages!=0){
					retMap.put("myBidItem", addStaticInfo(auctionService.getMyBidItem(character.getId(), page)));
					retMap.put("page", page);
					retMap.put("pages", pages);
				}else{
					character.setCash(cashRefresh);
					retMap.put("cashRefresh", cashRefresh);
					retMap.put("myBidItem", null);
					retMap.put("page", page);
					retMap.put("pages", pages);
				}
				return retMap;
			}else{
				throw e;
			}
		}
		character.setCash(cashRefresh);
		retMap.put("cashRefresh", cashRefresh);
		int pages = auctionService.getPagesForBidPage(character.getId());
		if(pages<page){
			page=pages;
		}
		if(pages!=0){
			retMap.put("myBidItem", addStaticInfo(auctionService.getMyBidItem(character.getId(), page)));
			retMap.put("page", page);
			retMap.put("pages", pages);
		}else{
			character.setCash(cashRefresh);
			retMap.put("cashRefresh", cashRefresh);
			retMap.put("myBidItem", null);
			retMap.put("page", page);
			retMap.put("pages", pages);
		}
		return retMap;
	}
	
	@RequestMapping(value="getMyBidItemInfo")
	public @ResponseBody Map<String , Object> getMyBidItem(HttpSession session) throws AppException{
		Map<String,Object> retMap = new HashMap<String, Object>();
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		int pages = auctionService.getPagesForBidPage(character.getId());
		retMap.put("pages", pages);
		if(pages==0){
			retMap.put("page", 0);
			retMap.put("myBidItem", null);
		}else{
			retMap.put("page", Const.DEFAULT_PAGE);
			retMap.put("myBidItem", addStaticInfo(auctionService.getMyBidItem(character.getId(), Const.DEFAULT_PAGE)));
		}
		retMap.put("cashUserHave", character.getCash());
		return retMap;
	}
	@RequestMapping(value="getMyBidItemByPage")
	public @ResponseBody Map<String , Object> getMyBidItemByPage(int page,HttpSession session) throws AppException{
		if(page<1){
			throw new AppException("请求页码错误！");
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		int pages = auctionService.getPagesForBidPage(character.getId());
		if(pages<page){
			page=pages;
		}
		if(pages!=0){
			retMap.put("myBidItem", addStaticInfo(auctionService.getMyBidItem(character.getId(), page)));
			retMap.put("pages", pages);
			retMap.put("page", page);
		}else{
			retMap.put("myBidItem", null);
			retMap.put("pages", pages);
			retMap.put("page", page);
		}
		return retMap;
	}
	@RequestMapping(value="getEquipmentForAuction")
	public @ResponseBody Object getEquipmentForAuction(HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return changeEquipment(auctionService.getUserEquipmentForAuction(character.getId()));
	}
	@RequestMapping(value="getItemForAuction")
	public @ResponseBody Object getItemForAuction(HttpSession session){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return changeItem(auctionService.getUserItemForAuction(character.getId()));
	}
	@RequestMapping(value="getMaterialForAuction")
	public @ResponseBody Object getMaterialForAuction(HttpSession session){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return changeMaterial(auctionService.getUserMaterialForAuction(character.getId()));
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
			temp.put("amount", i.getItemAmount());
			retList.add(temp);
		}
		return retList;
	}
	private final List<Map<String, Object>> changeMaterial(List<UserMaterial> userMaterials){
		Map<String, Object> temp;
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		for(UserMaterial i:userMaterials){
			temp = new HashMap<String,Object>();
			temp.put("id", i.getId());
			temp.put("type", i.getItemType());
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(i));
			StaticMaterial staticMaterial = i.getMaterial();
			temp.put("icon", staticMaterial.getIcon());
			temp.put("amount", i.getItemAmount());
			retList.add(temp);
		}
		return retList;
	}
	
	/**
	 * 给拍卖道具附加静态信息
	 * 
	 * @param auctions
	 * @return
	 */
	private final List<Map<String, Object>> addStaticInfo(List<Auction> auctions) throws AppException{
		Map<String, Object> auctionInfo;
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		for (Auction i : auctions) {
			auctionInfo = new HashMap<String,Object>();
			switch (i.getItemType()) {
			case Const.TYPE_EQUIPMENT:
				UserEquipment userEquipment = new UserEquipment(i);
				Map<String, Object> equipmentInfo = new HashMap<String,Object>();
				equipmentInfo.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(userEquipment));
				equipmentInfo.put("icon", userEquipment.getEquipment().getIcon());
				equipmentInfo.put("type", userEquipment.getItemType());
				auctionInfo.put("itemInfo", equipmentInfo);
				auctionInfo.put("auctionInfo", i);
				break;
			case Const.TYPE_ITEM:
				UserItem userItem = new UserItem(i);
				Map<String, Object> itemInfo = new HashMap<String,Object>();
				itemInfo.put("toolTipInfo", ChangeArticleToToolTip.changeItemToToolTip(userItem));
				itemInfo.put("icon", userItem.getItem().getIcon());
				itemInfo.put("type", userItem.getItemType());
				itemInfo.put("amount", userItem.getItemAmount());
				auctionInfo.put("itemInfo", itemInfo);
				auctionInfo.put("auctionInfo", i);
				break;
			case Const.TYPE_MATERIAL:
				UserMaterial userMaterial = new UserMaterial(i);
				Map<String, Object> materialInfo = new HashMap<String,Object>();
				materialInfo.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(userMaterial));
				materialInfo.put("icon", userMaterial.getMaterial().getIcon());
				materialInfo.put("type", userMaterial.getItemType());
				materialInfo.put("amount", userMaterial.getItemAmount());
				auctionInfo.put("itemInfo", materialInfo);
				auctionInfo.put("auctionInfo", i);
				break;

			default:
				break;
			}
			retList.add(auctionInfo);
		}
		return retList;

	}
	

	public AuctionService getAuctionService() {
		return auctionService;
	}

	public void setAuctionService(AuctionService auctionService) {
		this.auctionService = auctionService;
	}
}
