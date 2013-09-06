package com.crystalcg.gamedev.util.cache;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.hero.domain.UserHero;

public interface RankingMapper {

	List<Map<String,Object>> getBuildList();
	
	List<Map<String,Object>> getLevelList();
	
	List<Map<String,Object>> getReputationList();
	
	List<Map<String,Object>> getRechargeList();
	
	List<Map<String,Object>> getAllianceList();
    
	List<UserHero> getAllUserHero();
}
