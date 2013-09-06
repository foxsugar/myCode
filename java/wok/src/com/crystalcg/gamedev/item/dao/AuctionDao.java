package com.crystalcg.gamedev.item.dao;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.item.domain.Auction;
import com.crystalcg.gamedev.item.mapper.AuctionMapper;

public class AuctionDao {
	
	private AuctionMapper auctionMapper;

	/**
	 * 插入新的拍卖信息
	 * @param auction
	 */
	public void insertNewAuction(Auction auction){
		auctionMapper.insertNewAuction(auction);
	}
	/**
	 * 删除拍卖信息
	 * @param id
	 */
	public void deleteAuction(int id){
		auctionMapper.deleteAuction(id);
	}
	/**
	 * 获取自己拍卖的道具
	 * @param param
	 * @return
	 */
	public List<Auction> getMyAuctionItem(Map<String,Object> param){
		return auctionMapper.getMyAuctionItem(param);
	}
	/**
	 * 获取拍卖行的道具信息
	 * @param map
	 * @return
	 */
	public List<Auction> getItemInfoInAuction(Map<String,Object> map){
		return auctionMapper.getItemInfoInAuction(map);
	}
	/**
	 * 更新拍卖行数据，低价，出价人，出价时间
	 * @param auction
	 */
	public void updateAuctionByAuction(Auction auction){
		auctionMapper.updateAuctionByAuction(auction);
	}
	
	public int getCounts(Map<String,Object> param){
		return auctionMapper.getCounts(param);
	}

	public List<Auction> getMyBidItem(Map<String,Object> param){
		return auctionMapper.getMyBidItem(param);
	}
	
	public Auction getAuctionByAuctionId(int auctionId){
		return auctionMapper.getAuctionByAuctionId(auctionId);
	}
	
	public List<Auction> getAllAuctionItem(){
		return auctionMapper.getAllAuctionItem();
	}
	
	public AuctionMapper getAuctionMapper() {
		return auctionMapper;
	}
	public void setAuctionMapper(AuctionMapper auctionMapper) {
		this.auctionMapper = auctionMapper;
	}
}
