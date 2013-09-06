package com.crystalcg.gamedev.hero.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.mapper.UserHeroMapper;

public class UserHeroDao {

	private UserHeroMapper userHeroMapper;

	public void insertUserHero(UserHero userHero) {
		userHeroMapper.insertUserHero(userHero);
	}

	public UserHero getUserHero(int characterId,int id) {
		Map<String, Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("id", id);
		return userHeroMapper.getUserHero(param);
	}

	public List<UserHero> getAllUserHero(int characterId) {
		return userHeroMapper.getAllUserHero(characterId);
	}
	
	public List<UserHero> getAllUserHeroByRankNo(int characterId, String rankNo) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("rankNo", rankNo);
		return userHeroMapper.getAllUserHeroByRankNo(param);
	}
	
	/**
	 * 获取玩家拥有的武将名字,返回id，名字，品级
	 * @param characterId
	 * @return
	 */
	public List<Map<String, Object>> getUserHeroName(int characterId){
		return userHeroMapper.getUserHeroName(characterId);
	}
	
	public void updateHeroStatus(UserHero uh) {
		userHeroMapper.updateHeroStatus(uh);
	}
	
	public void updateHeroRank(UserHero uh) {
		userHeroMapper.updateHeroRank(uh);
	}
	
	public void updateHeroStaminaMp(UserHero uh) {
		userHeroMapper.updateHeroStaminaMp(uh);
	}


	public UserHeroMapper getUserHeroMapper() {
		return userHeroMapper;
	}

	public void setUserHeroMapper(UserHeroMapper userHeroMapper) {
		this.userHeroMapper = userHeroMapper;
	}

	public void modifyHeroName(int characterId, int id, String name) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("id", id);
		param.put("name", name);
		userHeroMapper.modifyHeroName(param);
	}

	public void levelup(UserHero hero) {
		userHeroMapper.levelup(hero);
	}

	public void addGift(int characterId, int id, double gift) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("id", id);
		param.put("gift", gift);
		userHeroMapper.addGift(param);
	}

	public void distributePoint(UserHero hero) {
		userHeroMapper.distributePoint(hero);
	}

	public void updateExp(int characterId, int id, int exp) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("id", id);
		param.put("exp", exp);
		userHeroMapper.updateExp(param);
	}
	public List<UserHero> getUserHeroForBattle(Map<String, Object> param){
		return userHeroMapper.getUserHeroForBattle(param);
	}
	/**
	 * 获取武将信息，排除出征状态，用于配兵界面
	 * @param characterId
	 * @return
	 */
	public List<UserHero> getUserHeroWithOutBattle(int characterId){
		return userHeroMapper.getUserHeroWithOutBattle(characterId);
	}
	public int getUserHeroAmount(int characterId){
		return userHeroMapper.getUserHeroAmount(characterId);
	}

	public void deleteHero(int characterId, int id) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("id", id);
		userHeroMapper.deleteHero(param);
	}

	public void updateHeroSkill(int characterId,int heroId,String skillNo,String next) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("heroId", heroId);
		param.put("skillNo", skillNo);
		param.put("next", next);
		userHeroMapper.updateHeroSkill(param);
	}

	public void deleteHeroSkill(int characterId, int heroId, String skillNo) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("heroId", heroId);
		param.put("skillNo", skillNo);
		userHeroMapper.deleteHeroSkill(param);
	}
	
	public Integer getSoldierSum(int characterId){
		return userHeroMapper.getSoldierSum(characterId);
	}
	/**
	 * 更新武将带的兵种和数量
	 * @param userHero
	 */
	public void updateUserHeroSoldier(UserHero userHero){
		userHeroMapper.updateUserHeroSoldier(userHero);
	}
	/**
	 * 更新武将军功
	 * @param userHero
	 */
	public void updateUserHeroExploit(UserHero userHero){
		userHeroMapper.updateUserHeroExploit(userHero);
	}
	public List<UserHero> getAllHero(){
		return userHeroMapper.getAllHero();
	}

}
