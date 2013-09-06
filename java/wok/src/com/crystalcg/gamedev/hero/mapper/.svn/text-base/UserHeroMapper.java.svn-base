package com.crystalcg.gamedev.hero.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.hero.domain.UserHero;

public interface UserHeroMapper {
	void insertUserHero(UserHero userHero);
	UserHero getUserHero(Map<String, Integer> param);
	List<UserHero> getAllUserHero(int characterId);
	/**
	 * 获取武将名字,返回id，名字，品级
	 * @param characterId
	 * @return
	 */
	List<Map<String, Object>> getUserHeroName(int characterId);
	void updateHeroStatus(UserHero uh);
	List<UserHero> getAllUserHeroByRankNo(Map<String, Object> param);
	void updateHeroRank(UserHero uh);
	void updateHeroStaminaMp(UserHero uh);
	void modifyHeroName(Map<String, Object> param);
	void levelup(UserHero hero);
	void addGift(Map<String, Object> param);
	void distributePoint(UserHero hero);
	void updateExp(Map<String, Object> param);
	void deleteHero(Map<String, Object> param);
	int getUserHeroAmount(int characterId);
	void updateHeroSkill(Map<String, Object> param);
	void deleteHeroSkill(Map<String, Object> param);
	/**
	 * 获取武将所配兵的总和
	 * @param characterId
	 * @return
	 */
	Integer getSoldierSum(int characterId);
	////////出征////////
	List<UserHero> getUserHeroForBattle(Map<String, Object> param);
	/**
	 * 获取武将信息，排除出征状态，用于配兵界面
	 * @param param
	 * @return
	 */
	List<UserHero> getUserHeroWithOutBattle(int characterId);
	/**
	 * 更新武将带的兵种和数量
	 * @param userHero
	 */
	void updateUserHeroSoldier(UserHero userHero);
	/**
	 * 更新武将军功
	 * @param userHero
	 */
	void updateUserHeroExploit(UserHero userHero);
	/**
	 * 获取全部
	 * @return
	 */
	List<UserHero> getAllHero();
}
