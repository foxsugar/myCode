package com.crystalcg.gamedev.buildingFunction.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.domain.UserCellar;

public interface CellarMapper {
	List<UserCellar> getAllCellarProtection(int characterId);//获取君主所有地窖保护
	void insertUserCellar(List<UserCellar> userCellar);
	void updateUserCellar(UserCellar userCellar);
	UserCellar getUserCellar(Map<String,Object> param);
	void deleteUserCellar(int characterId);
}
