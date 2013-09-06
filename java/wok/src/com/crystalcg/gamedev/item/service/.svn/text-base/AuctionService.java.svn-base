package com.crystalcg.gamedev.item.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.item.Job.AuctionJob;
import com.crystalcg.gamedev.item.dao.AuctionDao;
import com.crystalcg.gamedev.item.domain.Auction;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.mail.domain.Mail;
import com.crystalcg.gamedev.mail.service.MailService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;

public class AuctionService {
	private AuctionDao auctionDao;
	private UserItemService userItemService;
	public static final int NEED_LEVEL_DEFAULT = 1;

	static {
		 updateAuction(); 
	}

	/**
	 * 拍卖道具
	 * @param userItemId
	 * @param basePrice
	 * @param fixedPrice
	 * @param savingTime
	 * @param charId
	 * @return
	 * @throws AppException
	 */
	public int sellItemByAuction(int id, int itemType, int basePrice,
			int fixedPrice, int savingType, int amount, int characterId)
			throws AppException {
		switch (itemType) {
		case Const.TYPE_EQUIPMENT:
			UserEquipment userEquipment = userItemService
					.getUserEquipmentById(id);
			if (userEquipment == null) {
				throw new AppException("装备不存在");
			}
			if (userEquipment.getItemPosition() != Const.POSITION_BAG) {
				throw new AppException("背包内不存在该装备");
			}
			if (userEquipment.getCharacterId() != characterId) {
				throw new AppException("装备不存在");
			}
			if (userEquipment.getIsBound() == Const.IS_BIND_STATE) {
				throw new AppException("不能拍卖绑定装备");
			}
			if (amount != 1) {
				throw new AppException("装备不能拍卖多个");
			} else {
				MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
				Maincity seller = maincityService.getMaincity(characterId);
				long money = seller.getMoney()
						- (Integer) Const.SAVING_TIME_INFO.get(savingType).get(
								"needMoney");// 需要改，保管费跟集市等级相关
				if (money < 0) {
					throw new AppException("身上的铜币不足以支付保管费");
				}
				// 更新玩家铜币，会修改
				seller.setMoney(money);
				maincityService.updateMoney(characterId, money,null);

				// 插入新的拍卖行数据
				int savingTime = (Integer) Const.SAVING_TIME_INFO.get(
						savingType).get("value");
				Date startTime = new Date();
				Auction auction = new Auction(basePrice, fixedPrice,
						savingTime / 1000, amount, startTime);
				addNewAuction(auction, userEquipment);
				insertNewAuction(auction);
				// 开启quartz的job
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("auctionId", auction.getId());
				data.put("charId", auction.getCharacterId());
				String jobId = Const.JOB_STRING_FOR_AUCTION
						+ auction.getCharacterId() + "_" + auction.getId();
				ExecuteJob.add(AuctionJob.class, data, startTime.getTime()
						+ savingTime, jobId);
				// 删除装备
				userItemService.deleteFromUserEquipment(id);
				return 0;
			}

		case Const.TYPE_ITEM:
			UserItem userItem = userItemService.getUserItemById(id);
			if (userItem == null) {
				throw new AppException("道具不存在");
			}
			if (userItem.getItemPosition() != Const.POSITION_BAG) {
				throw new AppException("背包内不存在该道具");
			}
			if (userItem.getCharacterId() != characterId) {
				throw new AppException("道具不存在");
			}
			if (userItem.getIsBound() != Const.IS_NOT_BIND_STATE) {
				throw new AppException("绑定道具无法拍卖");
			}
			if (userItem.getItemAmount() < amount) {
				throw new AppException("要拍卖的道具数量不足");
			} else if (userItem.getItemAmount() == amount) {
				MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
				Maincity seller = maincityService.getMaincity(characterId);
				long money = (Integer) Const.SAVING_TIME_INFO.get(savingType).get(
								"needMoney");// 需要改，保管费跟集市等级相关
				if (money < 0) {
					throw new AppException("身上的铜币不足以支付保管费");
				}
				// 更新玩家铜币，会修改
				seller.setMoney(money);
				maincityService.addMoney(characterId, -money);

				// 插入新的拍卖行数据
				int savingTime = (Integer) Const.SAVING_TIME_INFO.get(
						savingType).get("value");
				Date startTime = new Date();
				Auction auction = new Auction(basePrice, fixedPrice,
						savingTime / 1000, amount, startTime);
				addNewAuction(auction, userItem);
				insertNewAuction(auction);
				// 开启quartz的job
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("auctionId", auction.getId());
				data.put("charId", auction.getCharacterId());
				String jobId = Const.JOB_STRING_FOR_AUCTION
						+ auction.getCharacterId() + "_" + auction.getId();
				ExecuteJob.add(AuctionJob.class, data, startTime.getTime()
						+ savingTime, jobId);
				// 删除道具
				userItemService.deleteFromUserItem(id);
				return 0;
			} else {
				MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
				Maincity seller = maincityService.getMaincity(characterId);
				long money = (Integer) Const.SAVING_TIME_INFO.get(savingType).get(
								"needMoney");// 需要改，保管费跟集市等级相关
				if (money < 0) {
					throw new AppException("身上的铜币不足以支付保管费");
				}
				// 更新玩家铜币，会修改
				seller.setMoney(money);
				maincityService.addMoney(characterId, -money);

				// 插入新的拍卖行数据
				int savingTime = (Integer) Const.SAVING_TIME_INFO.get(
						savingType).get("value");
				Date startTime = new Date();
				Auction auction = new Auction(basePrice, fixedPrice,
						savingTime / 1000, amount, startTime);
				addNewAuction(auction, userItem);
				insertNewAuction(auction);
				// 开启quartz的job
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("auctionId", auction.getId());
				data.put("charId", auction.getCharacterId());
				String jobId = Const.JOB_STRING_FOR_AUCTION
						+ auction.getCharacterId() + "_" + auction.getId();
				ExecuteJob.add(AuctionJob.class, data, startTime.getTime()
						+ savingTime, jobId);
				// 更新道具数量
				userItemService.updateUserItemAmount(id,
						userItem.getItemAmount() - amount);
				return userItem.getItemAmount() - amount;
			}

		case Const.TYPE_MATERIAL:
			UserMaterial userMaterial = userItemService.getUserMaterialById(id);
			if (userMaterial == null) {
				throw new AppException("装备不存在");
			}
			if (userMaterial.getItemPosition() != Const.POSITION_BAG) {
				throw new AppException("背包内不存在该装备");
			}
			if (userMaterial.getCharacterId() != characterId) {
				throw new AppException("道具不存在");
			}
			if (userMaterial.getIsBound() != Const.IS_NOT_BIND_STATE) {
				throw new AppException("绑定道具无法拍卖");
			}
			if (userMaterial.getItemAmount() < amount) {
				throw new AppException("要拍卖的道具数量不足");
			} else if (userMaterial.getItemAmount() == amount) {
				MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
				Maincity seller = maincityService.getMaincity(characterId);
				long money = (Integer) Const.SAVING_TIME_INFO.get(savingType).get(
								"needMoney");// 需要改，保管费跟集市等级相关
				if (money < 0) {
					throw new AppException("身上的铜币不足以支付保管费");
				}
				// 更新玩家铜币，会修改
				seller.setMoney(money);
				maincityService.addMoney(characterId, -money);

				// 插入新的拍卖行数据
				int savingTime = (Integer) Const.SAVING_TIME_INFO.get(
						savingType).get("value");
				Date startTime = new Date();
				Auction auction = new Auction(basePrice, fixedPrice,
						savingTime / 1000, amount, startTime);
				addNewAuction(auction, userMaterial);
				insertNewAuction(auction);
				// 开启quartz的job
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("auctionId", auction.getId());
				data.put("charId", auction.getCharacterId());
				String jobId = Const.JOB_STRING_FOR_AUCTION
						+ auction.getCharacterId() + "_" + auction.getId();
				ExecuteJob.add(AuctionJob.class, data, startTime.getTime()
						+ savingTime, jobId);
				// 删除材料
				userItemService.deleteFromUserItem(id);
				return 0;
			} else {
				MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
				Maincity seller = maincityService.getMaincity(characterId);
				long money = (Integer) Const.SAVING_TIME_INFO.get(savingType).get(
								"needMoney");// 需要改，保管费跟集市等级相关
				if (money < 0) {
					throw new AppException("身上的铜币不足以支付保管费");
				}
				// 更新玩家铜币，会修改
				seller.setMoney(money);
				maincityService.addMoney(characterId, -money);

				// 插入新的拍卖行数据
				int savingTime = (Integer) Const.SAVING_TIME_INFO.get(
						savingType).get("value");
				Date startTime = new Date();
				Auction auction = new Auction(basePrice, fixedPrice,
						savingTime / 1000, amount, startTime);
				addNewAuction(auction, userMaterial);
				insertNewAuction(auction);
				// 开启quartz的job
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("auctionId", auction.getId());
				data.put("charId", auction.getCharacterId());
				String jobId = Const.JOB_STRING_FOR_AUCTION
						+ auction.getCharacterId() + "_" + auction.getId();
				ExecuteJob.add(AuctionJob.class, data, startTime.getTime()
						+ savingTime, jobId);
				// 更新道具数量
				userItemService.updateUserItemAmount(id,
						userMaterial.getItemAmount() - amount);
				return userMaterial.getItemAmount() - amount;
			}

		default:
			throw new AppException("要拍卖的道具类型错误");
		}
	}
	

	private Auction addNewAuction(Auction auction, UserEquipment userEquipment) throws AppException {
		auction.setCharacterId(userEquipment.getCharacterId());
		auction.setItemName(userEquipment.getEquipment().getEquipmentName());
		auction.setItemNo(userEquipment.getItemNo());
		auction.setItemType(userEquipment.getItemType());
		auction.setItemSubtype(userEquipment.getEquipment().getEquipmentType());
		auction.setQuality(userEquipment.getEquipment().getQuality());
		auction.setNeedLevel(userEquipment.getEquipment().getNeedLevel());
		auction.setStrengthLevel(userEquipment.getStrengthLevel());
		auction.setHole1(userEquipment.getHole1());
		auction.setHole2(userEquipment.getHole2());
		auction.setHole3(userEquipment.getHole3());
		auction.setStrengthenForce(userEquipment.getStrengthenForce());
		auction.setStrengthenStrategy(userEquipment.getStrengthenStrategy());
		auction.setStrengthenPhysique(userEquipment.getStrengthenPhysique());
		auction.setStrengthenAgility(userEquipment.getStrengthenAgility());
		return auction;
	}

	private Auction addNewAuction(Auction auction, UserItem userItem) {
		auction.setCharacterId(userItem.getCharacterId());
		auction.setItemName(userItem.getItem().getItemName());
		auction.setItemSubtype(userItem.getItem().getItemSubtype());
		auction.setItemNo(userItem.getItemNo());
		auction.setItemType(userItem.getItemType());
		auction.setQuality(userItem.getItem().getQuality());
		auction.setNeedLevel(NEED_LEVEL_DEFAULT);//道具没有等级，默认为1
		return auction;
	}

	private Auction addNewAuction(Auction auction, UserMaterial userMaterial) {
		auction.setCharacterId(userMaterial.getCharacterId());
		auction.setItemName(userMaterial.getMaterial().getMaterialName());
		auction.setItemSubtype(userMaterial.getMaterial().getMaterialType());
		auction.setItemNo(userMaterial.getItemNo());
		auction.setItemType(userMaterial.getItemType());
		auction.setQuality(userMaterial.getMaterial().getQuality());
		auction.setNeedLevel(NEED_LEVEL_DEFAULT);
		return auction;
	}

	/**
	 * 获得自己已经拍卖的道具
	 * 
	 * @param charId
	 * @return
	 */
	public List<Auction> getMyAuctionItem(int characterId, int page) throws AppException{
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("page", (page - 1) * Const.PAGE_SIZE_MYAUCTION);
		param.put("pageSize", Const.PAGE_SIZE_MYAUCTION);
		return auctionDao.getMyAuctionItem(param);
	}



	/**
	 * 拍卖行发送道具附件信件
	 * 
	 * @param charId
	 * @param addressee
	 * @param title
	 * @param content
	 * @param itemId 用户道具表Id，即userItemId
	 * @param itemType
	 */
	public void sendItemMailForAuction(int charId, int addressee, String title,
			String content, int itemId, int itemType) {
		Mail mail = new Mail();
		mail.setAddresser(charId);
		mail.setAddressee(addressee);
		mail.setTitle(title);
		mail.setContent(content);
		mail.setAttachment1(itemId);
		mail.setAttachmentType1(itemType);
		MailService mailService = (MailService) ServiceLocator.getSpringBean("mailService");
		mailService.sendMail(mail);
	}

	/**
	 * 拍卖行发送元宝附件信件
	 * @param charId
	 * @param addressee
	 * @param title
	 * @param content
	 * @param cash
	 */
	public void sendCashMailForAuction(int charId, int addressee, String title,
			String content, int cash) {
		Mail mail = new Mail();
		mail.setAddresser(charId);
		mail.setAddressee(addressee);
		mail.setTitle(title);
		mail.setContent(content);
		mail.setCash(cash);
		MailService mailService = (MailService) ServiceLocator.getSpringBean("mailService");
		mailService.sendMail(mail);
	}

	/**
	 * 获取最大页数
	 * @param charId
	 * @param itemName
	 * @param itemLevel
	 * @param itemType
	 * @param itemSubType
	 * @return
	 */
	public int getPages(int characterId, String itemName, int quality,
			int itemType, int itemSubtype, int levelMin, int levelMax,
			int pageSize) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("itemName", "%" + itemName + "%");
		param.put("quality", quality);
		param.put("itemType", itemType);
		param.put("itemSubtype", itemSubtype);
		param.put("levelMin", levelMin);
		param.put("levelMax", levelMax);
		param.put("bidCharacterId", 0);// 此处不考虑出价人Id，所以为0,0表示条件不加入
		return (auctionDao.getCounts(param) + pageSize - 1) / pageSize;
	}

	/**
	 * 取消拍卖
	 * 
	 * @param userItemId
	 * @param charId
	 */

	public void cancelAuctionOperate(int auctionId, int characterId)
			throws AppException {
		Auction auction = getAuctionByAuctionId(auctionId);
		if (auction == null) {
			throw new AppException("1");
		}
		if (auction.getCharacterId() != characterId) {
			throw new AppException("无法对别人的道具进行操作！");
		}
		if (auction.getBidCharacterId() != 0) {
			ExecuteJob.cancel(Const.JOB_STRING_FOR_AUCTION
					+ auction.getCharacterId() + "_" + auction.getId());

			// 竞拍者拍卖失败，发送元宝邮件
			sendCashMailForAuction(Const.CHARACTER_AUCTION_ID,
					auction.getBidCharacterId(), "竞拍" + auction.getItemName()
							+ "失败",
					"由于卖主取消拍卖，您竞拍" + auction.getItemName() + "失败，返还共计  "
							+ auction.getBasePrice() + " 金。", auction.getBasePrice());

			// 向取消者发送道具和邮件
			int id = 0;
			if (auction.getItemType() == Const.TYPE_EQUIPMENT) {
				UserEquipment userEquipment = new UserEquipment(auction);
				userEquipment.setCharacterId(auction.getCharacterId());
				id = userItemService.insertEquipmentForAuction(userEquipment);
			} else {
				UserItem userItem = new UserItem(auction);
				userItem.setCharacterId(auction.getCharacterId());
				id = userItemService.insertItemForAuction(userItem);
			}
			deleteAuctionById(auctionId);
			// 发文字邮件
			sendItemMailForAuction(Const.CHARACTER_AUCTION_ID,
					auction.getCharacterId(), "取消拍卖" + auction.getItemName()
							+ "成功", "您取消拍卖 " + auction.getItemName()
							+ " 的操作已成功  ！", id, auction.getItemType());

		} else {
			ExecuteJob.cancel(Const.JOB_STRING_FOR_AUCTION
					+ auction.getCharacterId() + "_" + auction.getId());
			// 向取消者发送道具和邮件
			int id = 0;
			if (auction.getItemType() == Const.TYPE_EQUIPMENT) {
				UserEquipment userEquipment = new UserEquipment(auction);
				userEquipment.setCharacterId(auction.getCharacterId());
				id = userItemService.insertEquipmentForAuction(userEquipment);
			} else {
				UserItem userItem = new UserItem(auction);
				userItem.setCharacterId(auction.getCharacterId());
				id = userItemService.insertItemForAuction(userItem);
			}
			deleteAuctionById(auctionId);
			// 发邮件代码，文字邮件
			sendItemMailForAuction(Const.CHARACTER_AUCTION_ID,
					auction.getCharacterId(), "取消拍卖" + auction.getItemName()
							+ "成功", "您取消拍卖 " + auction.getItemName()
							+ " 的操作已成功  ！", id, auction.getItemType());
		}
	}

	/*********************** 查询相关 ****************************/

	/**
	 * 查询拍卖的道具信息
	 * @param itemName  道具名称，没有可以为""
	 * @param itemType 道具类型，
	 * @param itemSubtype 道具子类型，
	 * @param quality 道具品级
	 * @param levelMin 最小需要等级
	 * @param levelMax 最大需要等级
	 * @param page 页码数
	 * @param order 排序 0剩余时间降序，1剩余时间升序，2一口价降序，3一口价升序，4需求等级降序，5需求等级升序
	 * @return
	 */
	public List<Auction> getItemInfoInAuction(String itemName,
			int itemType, int itemSubtype, int quality, int levelMin,
			int levelMax, int page, int order) throws AppException{
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("itemName", "%" + itemName + "%");
		param.put("itemType", itemType);
		param.put("itemSubtype", itemSubtype);
		param.put("quality", quality);
		param.put("levelMin", levelMin);
		param.put("levelMax", levelMax);
		param.put("page", (page - 1) * Const.PAGE_SIZE_AUCTION);
		param.put("pageSize", Const.PAGE_SIZE_AUCTION);
		param.put("order", order);
		return auctionDao.getItemInfoInAuction(param);
	}

	/************************** 买相关 *****************************************/

	public int getPagesForBidPage(int bidCharacterId) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", 0);
		param.put("itemName", "%%");
		param.put("quality", 0);
		param.put("itemType", 0);
		param.put("itemSubtype", 0);
		param.put("levelMin", 0);
		param.put("levelMax", 0);
		param.put("bidCharacterId", bidCharacterId);
		return (auctionDao.getCounts(param) + Const.PAGE_SIZE_BID - 1) / Const.PAGE_SIZE_BID;
	}

	/**
	 * 通过竞拍拍卖的道具
	 * @param userItemId 道具Id
	 * @param bid 竞拍价格
	 * @param charId 竞拍玩家Id
	 * @return
	 * @throws AppException
	 */
	public int buyItemByAuction(int auctionId, int bid, int characterId)
			throws AppException {
		Auction auction = auctionDao.getAuctionByAuctionId(auctionId);
		if (auction == null) {
			throw new AppException("1");
		}
		if (auction.getCharacterId() == characterId) {
			throw new AppException("自己不可以竞拍自己的物品，不要乱抬价哦！");
		}
		if (auction.getBasePrice() >= bid) {
			throw new AppException("出价应该高于当前价！");
		}
		if (bid >= auction.getFixedPrice()) { // 目前，高于竞拍价如果高于一口价，以一口价方式购买
			return buyItemByFixePrice(auctionId, characterId);
		} 
		if (auction.getBidCharacterId() == characterId) {
			throw new AppException("目前没有人超过您的出价，无法再次竞价！");
		}
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		UserCharacter highPriceCharacter = characterService
				.getCharacterById(characterId);
		int highCash = highPriceCharacter.getCash();
		if (highCash < bid) {
			throw new AppException("元宝不足");
		} else {
			// 扣除用户cash代码；
			characterService.updateCash(highPriceCharacter.getId(),
					highCash - bid);
			// 返还底价玩家竞标的cash，如果有的话;
			if (auction.getBidCharacterId() != 0) {
				// 发送邮件
				sendCashMailForAuction(Const.CHARACTER_AUCTION_ID,
						auction.getBidCharacterId(),
						"竞拍" + auction.getItemName() + "失败",
						"由于有人出价超过您，您竞拍的" + auction.getItemName()
								+ "失败，现返回您的竞拍钱，共计  " + auction.getBasePrice()
								+ " 金。" ,
						auction.getBasePrice());
			}
			auction.setBasePrice(bid);
			auction.setBidCharacterId(characterId);
			auction.setBidTime(new Date());
			auctionDao.updateAuctionByAuction(auction);
			return highCash - bid; // 返回剩余元宝，用于刷新
		}
	}

	/**
	 * 通过一口价购买拍卖道具
	 * 
	 * @param userItemId
	 * @param charId
	 * @return
	 * @throws AppException
	 */
	public int buyItemByFixePrice(int auctionId, int characterId)
			throws AppException {
		Auction auction = auctionDao.getAuctionByAuctionId(auctionId);
		if (auction == null) {
			throw new AppException("1");
		}
		if (characterId == auction.getCharacterId()) {
			throw new AppException("不可以对自己拍卖的东西进行一口价操作");
		}
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		UserCharacter highPriceCharacter = characterService
				.getCharacterById(characterId);
		int highCash = highPriceCharacter.getCash();
		if (highCash < auction.getFixedPrice()) {
			throw new AppException("元宝不足");
		}
		ExecuteJob.cancel(Const.JOB_STRING_FOR_AUCTION
				+ auction.getCharacterId() + "_" + auctionId);
		// 扣除用户cash代码；
		characterService.updateCash(highPriceCharacter.getId(), highCash
				- auction.getFixedPrice());
		// 返还底价玩家竞标的cash，如果有的话;
		if (auction.getBidCharacterId() != 0) {
			// 发邮件
			sendCashMailForAuction(Const.CHARACTER_AUCTION_ID,
					auction.getBidCharacterId(),
					"竞拍" + auction.getItemName() + "失败", "由于有人出价超过您，您竞拍的"
							+ auction.getItemName() + "失败，现返回您的竞拍钱，共计  "
							+ auction.getBasePrice() + "金。", auction.getBasePrice());
		}

		double cashSellerGetDouble = auction.getFixedPrice()
				* Const.THE_TAX_RATE;
		int cashSellerGet = (int) cashSellerGetDouble;// 收益
		int tax = auction.getFixedPrice() - cashSellerGet;// 税
		// 发文字邮件，附件为元宝
		sendCashMailForAuction(Const.CHARACTER_AUCTION_ID,
				auction.getCharacterId(), "拍卖" + auction.getItemName()
						+ "成功", highPriceCharacter.getName()
						+ " 以一口价的形式竞拍了您的 " + auction.getItemName() + "，除去"
						+ tax + "金。" + "的拍卖行税收，您共获得收益  " + cashSellerGet
						+ "金。", cashSellerGet);
		//向成功者发送装备
		int id = 0;
		if (auction.getItemType() == Const.TYPE_EQUIPMENT) {
			UserEquipment userEquipment = new UserEquipment(auction);
			userEquipment.setCharacterId(characterId);
			id = userItemService.insertEquipmentForAuction(userEquipment);
		} else {
			UserItem userItem = new UserItem(auction);
			userItem.setCharacterId(characterId);
			id = userItemService.insertItemForAuction(userItem);
		}
		deleteAuctionById(auctionId);

		// 发文字邮件
		sendItemMailForAuction(
				Const.CHARACTER_AUCTION_ID,
				characterId,
				"竞拍" + auction.getItemName() + "成功",
				"您以一口价的形式竞拍" + auction.getItemName() + "成功，共计花费  "
						+ auction.getFixedPrice() + "金。", id, auction.getItemType());
		return highCash - auction.getFixedPrice();
	}

	/**
	 * 获取自己的竞价道具
	 * @param characterId
	 * @param page
	 * @return
	 */
	public List<Auction> getMyBidItem(int characterId, int page) throws AppException{
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("bidCharacterId", characterId);
		param.put("page", (page - 1) * Const.PAGE_SIZE_BID);
		param.put("pageSize", Const.PAGE_SIZE_BID);
		return auctionDao.getMyBidItem(param);
	}
	
	/**
	 * 获取所有能拍卖的装备
	 * @param characterId
	 * @return
	 */
	public List<UserEquipment> getUserEquipmentForAuction(int characterId){
		return userItemService.getAllUserEquipment(characterId, Const.POSITION_BAG, Const.IS_NOT_BIND_STATE, 0, 0);
	}
	/**
	 * 获取所有可拍卖的道具
	 * @param characterId
	 * @return
	 */
	public List<UserItem> getUserItemForAuction(int characterId){
		return userItemService.getAllUserItem(characterId, Const.POSITION_BAG, Const.IS_NOT_BIND_STATE);
	}
	/**
	 * 获取所有可拍卖的材料
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getUserMaterialForAuction(int characterId){
		return userItemService.getAllUserMaterial(characterId, Const.POSITION_BAG, Const.IS_NOT_BIND_STATE);
	}

	/**
	 * 更新拍卖行
	 * 
	 */
	public static void updateAuction() {
		AuctionService as = new AuctionService();
		as.setAuctionDao((AuctionDao) ServiceLocator
				.getSpringBean("auctionDao"));
		List<Auction> auctionInfo = as.getAllAuctionItem();
		for (Auction i : auctionInfo) {
			String jobId = Const.JOB_STRING_FOR_AUCTION
					+ i.getCharacterId() + "_" + i.getId();
			if (!ExecuteJob.checkExists(jobId)) {
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("auctionId", i.getId());
				data.put("charId", i.getCharacterId());
				ExecuteJob.add(AuctionJob.class, data, i.getStartTime()
						.getTime() + i.getSavingTime() * 1000, jobId);
			} 
		}
	}

	public Auction getAuctionByAuctionId(int auctionId) {
		return auctionDao.getAuctionByAuctionId(auctionId);
	}

	public void deleteAuctionById(int auctionId) {
		auctionDao.deleteAuction(auctionId);
	}

	public Map<String, Object> getUserItemInAuction(int charId) {
		return null;
	}

	public List<Auction> getAllAuctionItem() {
		return auctionDao.getAllAuctionItem();
	}
	
	public void insertNewAuction(Auction auction) {
		auctionDao.insertNewAuction(auction);
	}

	public UserItemService getUserItemService() {
		return userItemService;
	}

	public void setUserItemService(UserItemService userItemService) {
		this.userItemService = userItemService;
	}

	public AuctionDao getAuctionDao() {
		return auctionDao;
	}

	public void setAuctionDao(AuctionDao auctionDao) {
		this.auctionDao = auctionDao;
	}

}
