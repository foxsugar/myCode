package com.crystalcg.gamedev.tech.mapper;

import java.util.List;
import java.util.Map;

public interface SoldierTechMapper {

	List<String> getUserSoldierTech(int characterId);
	String getUserSoldierTechByPrefix(Map<String, Object> param);

	void deleteTech(Map<String, Object> param);

	void updateTech(Map<String, Object> param);

	void insertTech(Map<String, Object> param);

}
