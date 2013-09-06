package com.crystalcg.gamedev.item.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.item.domain.Auction;

public interface AuctionMapper {
	/**
	 * 插入新的拍卖信息
	 * @param auction
	 */
	void insertNewAuction(Auction auction);
	/**
	 * 删除拍卖信息
	 * @param id
	 */
	void deleteAuction(int id);
	/**
	 * 获取自己拍卖的道具
	 * @param param
	 * @return
	 */
	List<Auction> getMyAuctionItem(Map<String,Object> param);
	/**
	 * 获取拍卖行的道具信息
	 * @param map
	 * @return
	 */
	List<Auction> getItemInfoInAuction(Map<String,Object> map);
	/**
	 * 更新拍卖行数据，低价，出价人，出价时间
	 * @param auction
	 */
	void updateAuctionByAuction(Auction auction);
	
	int getCounts(Map<String,Object> param);

	List<Auction> getMyBidItem(Map<String,Object> param);
	
	Auction getAuctionByAuctionId(int auctionId);
	
	
	
//	void addNewAuction(Map<String,Object> param);
	List<Auction> getAllAuctionItem();
}
