package com.crystalcg.gamedev.buildingFunction.dao;

import com.crystalcg.gamedev.buildingFunction.domain.UserMarket;
import com.crystalcg.gamedev.buildingFunction.mapper.MarketMapper;

public class MarketDao {
	private MarketMapper marketMapper;
	
	
	/**
	 * 获取集市兑换记录信息
	 * @param characterId
	 * @return
	 */
	public UserMarket getUserMarket(int characterId){
		return marketMapper.getUserMarket(characterId);
	}
	/**
	 *  更新集市兑换记录信息
	 * @param userMarket
	 */
	public void updateUserMarket(UserMarket userMarket){
		marketMapper.updateUserMarket(userMarket);
	}
	/**
	 * 删除资源兑换信息
	 * @param characterId
	 */
	public void deleteUserMarket(int characterId){
		marketMapper.deleteUserMarket(characterId);
	}
	/**
	 * 插入集市兑换记录信息
	 * @param characterId
	 */
	public void insertUserMarket(int characterId){
		marketMapper.insertUserMarket(characterId);
	}
	public MarketMapper getMarketMapper() {
		return marketMapper;
	}

	public void setMarketMapper(MarketMapper marketMapper) {
		this.marketMapper = marketMapper;
	}
}
