package com.crystalcg.gamedev.buildingFunction.mapper;

import java.util.List;
import java.util.Map;

public interface HouseMapper {
	Map<String,Integer> getPeopleInfo(int charId);
	List<Map<String,Object>> getDefenceworks(int charId);
	List<Map<String,Object>> getDefenceHero(int charId);
	int getBlockedRiver(int charId);
	List<Map<String,Object>> getHeroForCollege(int charId);
	List<Map<String,Object>> getAllSkill();
	List<Map<String,Object>> getLearnedSkill(Map<String,Integer> param);
	List<Map<String,Object>> getCanLearnSkill(Map<String,Integer> param);
	List<Map<String,Object>> getCannotLearnSkill(Map<String,Integer> param);
	Map<String,Object> getAlliance(int charId);
}
