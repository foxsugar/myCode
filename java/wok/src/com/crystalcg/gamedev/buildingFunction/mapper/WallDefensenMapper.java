package com.crystalcg.gamedev.buildingFunction.mapper;

import java.util.List;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensen;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensenQueue;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallHero;
import com.crystalcg.gamedev.hero.domain.UserHero;

public interface WallDefensenMapper {
/**
 * 获取所有城防工事
 * @param characterId
 * @return
 */
	List<UserWallDefensen> getAllWallDefensen(int characterId);
    Integer getWallDefensenNum(UserWallDefensen userwalldefensen);
    void  updateWallDefensenNum(UserWallDefensen userwalldefensen);
    Integer  getSumWallDefensen(int characterId);
//    List<UserWallHero> getAllWallHero(int characterId);
//    List<UserHero> getAllHero (int characterId);
//    void insertWallHero(UserWallHero userWallHero);
//    void insertWallHeros(List<UserWallHero> userWallHero);
    
    UserWallHero getWallHero(int characterId);
    
    void saveWallHero(UserWallHero userWallHero);
    
    void updateWallHero(UserWallHero userWallHero);
    
    void insertQueueWallDefens(UserWallDefensenQueue wallDefensQueue);
    void insertWallDefensen(UserWallDefensen userWallDefensen);
    void updateWallDefensen(UserWallDefensen userWallDefensen);
    void deleteWallDefensenQueue(int characterId);
    UserWallDefensenQueue getWallDefensenQueue(int characterId);
    List<String> getWallDefensenNo(int characterId);
	void updateQueueWallDefens(UserWallDefensenQueue wallDefensQueue);
}
