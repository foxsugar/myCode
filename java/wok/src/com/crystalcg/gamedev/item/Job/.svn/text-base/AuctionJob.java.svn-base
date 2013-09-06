package com.crystalcg.gamedev.item.Job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.item.domain.Auction;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.service.AuctionService;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;


public class AuctionJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		int auctionId = (Integer)dataMap.get("auctionId");
		UserItemService us = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		AuctionService as = (AuctionService)ServiceLocator.getSpringBean("auctionService");
		Auction auction = as.getAuctionByAuctionId(auctionId);
		if(auction.getId()!=0){

			if(auction.getBidCharacterId()==0){
				int id = 0;
				if(auction.getItemType()==Const.TYPE_EQUIPMENT){
					UserEquipment userEquipment = new UserEquipment(auction);
					userEquipment.setCharacterId(auction.getCharacterId());
					id = us.insertEquipmentForAuction(userEquipment);
				}else{
					UserItem userItem = new UserItem(auction);
					userItem.setCharacterId(auction.getCharacterId());
					id = us.insertItemForAuction(userItem);
				}
				as.deleteAuctionById(auctionId);
				//发送文字邮件和附件
				as.sendItemMailForAuction(Const.CHARACTER_AUCTION_ID, auction.getCharacterId(), "拍卖"+auction.getItemName()+"失败", "由于到达拍卖时间，您拍卖的 "+auction.getItemName()+" 已经失败！",id,auction.getItemType());
				
				
			}else{
				CharacterService cs = (CharacterService)ServiceLocator.getSpringBean("characterService");
				UserCharacter buyer = cs.getCharacterById(auction.getBidCharacterId());
				
				//增加拍卖用户cash和扣除税收,并发送邮件，邮件取元宝
				double cashSellerGetDouble = auction.getBasePrice()*Const.THE_TAX_RATE;
				int cashSellerGet = (int)cashSellerGetDouble;
				int tax = auction.getBasePrice()-cashSellerGet;
//				Map<String,Object> cash = ChangeToMap.changeCashToMap(auction.getBasePrice());
//				Map<String,Object> cashTax = ChangeToMap.changeCashToMap(tax);
//				Map<String,Object> cashGet = ChangeToMap.changeCashToMap(cashSellerGet);
				as.sendCashMailForAuction(Const.CHARACTER_AUCTION_ID, auction.getCharacterId(), "拍卖"+auction.getItemName()+"成功", 
						buyer.getName()+
						" 成功的拍卖了您的 "+auction.getItemName()+"，除去 "+tax+"金 "+"的拍卖行税收，您共获得收益  "+cashSellerGet+"金。", cashSellerGet);
				
				//给买家发邮件，邮件取装备
				int id = 0;
				if(auction.getItemType()==Const.TYPE_EQUIPMENT){
					UserEquipment userEquipment = new UserEquipment(auction);
					userEquipment.setCharacterId(auction.getBidCharacterId());
					id = us.insertEquipmentForAuction(userEquipment);
				}else{
					UserItem userItem = new UserItem(auction);
					userItem.setCharacterId(auction.getBidCharacterId());
					id = us.insertItemForAuction(userItem);
				}
				as.deleteAuctionById(auctionId);
				as.sendItemMailForAuction(Const.CHARACTER_AUCTION_ID, auction.getBidCharacterId(), "拍卖"+auction.getItemName()+"成功", "您参与竞拍的 "+auction.getItemName()+" 已经成功！共计花费 "+auction.getBasePrice()+"金。",id,auction.getItemType());
			
			}
		}
		
	}

}
