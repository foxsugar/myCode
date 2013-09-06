package com.crystalcg.gamedev.buildingFunction.dao;

import java.util.List;


import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensen;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensenQueue;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallHero;
import com.crystalcg.gamedev.buildingFunction.mapper.WallDefensenMapper;

public class WallDefensenDao {
	private WallDefensenMapper walldefMapper;

	/**
	 * 获取城防工事
	 * 
	 * @param characterId
	 * @return
	 */
	public List<UserWallDefensen> getAllWallDefensen(int characterId) {

		return walldefMapper.getAllWallDefensen(characterId);
	}

	/**
	 * 获取城防工事数量
	 * 
	 * @param characterId
	 * @param defenceworksNo
	 * @return
	 */
	public Integer getWallDefensenNum(int characterId, String defenceworksNo) {
		UserWallDefensen userwalldefensen = new UserWallDefensen();
		userwalldefensen.setCharacterId(characterId);
		userwalldefensen.setWallDefensenNo(defenceworksNo);
		return walldefMapper.getWallDefensenNum(userwalldefensen);
	}
	/**
	 * 获取城防工事总数量
	 * @param characterId
	 * @return
	 */
	public Integer getSumWallDefensen(int characterId){
		return walldefMapper.getSumWallDefensen(characterId);
	}
	
	public List<String> getWallDefensenNo(int characterId){
		return walldefMapper.getWallDefensenNo(characterId);
	}
	/**
	 * 增加城防工事数量
	 * 
	 * @param characterId
	 * @param defenceworksNo
	 * @param num
	 */
	public void addWallDefensenNum(int characterId, String defenceworksNo,int num) {
		UserWallDefensen userwalldefensen = new UserWallDefensen();
		userwalldefensen.setCharacterId(characterId);
		userwalldefensen.setWallDefensenNo(defenceworksNo);
		userwalldefensen.setWallDefensenNum(num);
		walldefMapper.updateWallDefensenNum(userwalldefensen);
	}
	/**
	 * 插入城防工事
	 * @param userWallDefensen
	 */
	public void insertWallDefensen(UserWallDefensen userWallDefensen){
		walldefMapper.insertWallDefensen(userWallDefensen);
	}
 /**
  * 更新城防工事
  * @param userWallDefensen
  */
	public void updateWallDefensen(UserWallDefensen userWallDefensen){
		walldefMapper.updateWallDefensen(userWallDefensen);
	}
	
	/**
	 * 获取城防将领
	 * 
	 * @param characterId
	 * @return
	 */
//	public List<UserWallHero> getAllWallHero(int characterId) {
//		return walldefMapper.getAllWallHero(characterId);
//	}


	/**
	 * 修改城防英雄
	 * 
	 * @param characterId
	 * @param heroId
	 * @param orderId
	 */
//	public void insertWallHero(int characterId, int heroId, int orderId) {
//		UserWallHero userWallHero = new UserWallHero();
//		userWallHero.setCharacterId(characterId);
//		userWallHero.setOrderId(orderId);
//		userWallHero.setHeroId(heroId);
//		walldefMapper.insertWallHero(userWallHero);
//	}
	
  /**
   * 插入建造队列
   * @param wallDefensQueue
   */
	public void insertQueueWallDefens(UserWallDefensenQueue wallDefensQueue){
		walldefMapper.insertQueueWallDefens(wallDefensQueue);
	}
	
	public void deleteQueueWallDefens(int characterId){
		walldefMapper.deleteWallDefensenQueue(characterId);
	}
	public void updateQueueWallDefens(UserWallDefensenQueue wallDefensQueue){
		walldefMapper.updateQueueWallDefens(wallDefensQueue);
	}
   /**
    * 获取建造队列
    * @param characterId
    * @return
    */
	public  UserWallDefensenQueue getWallDefensenQueue(int characterId){
		return walldefMapper.getWallDefensenQueue(characterId);
	}
	/**
	 * 删除建造队列
	 * @param characterId
	 */
	public void deleteWallDefensenQueue(int characterId){
		walldefMapper.deleteWallDefensenQueue(characterId);
	}
	/**
	 * 插入 、更新将领
	 * @param userWallHero
	 */
//	public void insertWallHeros(List<UserWallHero> userWallHero){
//		walldefMapper.insertWallHeros(userWallHero);
//	}
	
	/**
	 * 获取该君主的城防武将
	 * @param characterId
	 * @return
	 */
	public UserWallHero getWallHero(int characterId){
		return walldefMapper.getWallHero(characterId);
	}
	 /**
	  * 保存城防将领
	  * @param userWallHero
	  */
	public void saveWallHero(UserWallHero userWallHero){
		walldefMapper.saveWallHero(userWallHero);
	}
	/**
	 * 更新城防武将
	 * @param userWallHero
	 */
	public void updateWallHero(UserWallHero userWallHero){
		walldefMapper.updateWallHero(userWallHero);
	}
	public void setWalldefMapper(WallDefensenMapper walldefMapper) {
		this.walldefMapper = walldefMapper;
	}

}
