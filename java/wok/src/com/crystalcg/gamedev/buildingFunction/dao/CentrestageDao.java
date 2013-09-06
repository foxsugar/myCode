package com.crystalcg.gamedev.buildingFunction.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.mapper.CentrestageMapper;

public class CentrestageDao {
	
	private CentrestageMapper centrestageMapper;

	public List<Map<String,Object>> getAllUserMilitaryRank(int charId){
		return centrestageMapper.getAllUserMilitaryRank(charId);
	}
	
	public List<Map<String,Object>> getAllUserHero(int charId){
		return centrestageMapper.getAllUserHero(charId);
	}
	
	public List<Map<String,Object>> getUserkHeroByMilitaryRank(int charId,int militaryRankId){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("charId", charId);
		param.put("militaryRankId", militaryRankId);
		return centrestageMapper.getUserkHeroByMilitaryRank(param);
	}
	
	/**
	 * @return the centrestageMapper
	 */
	public CentrestageMapper getCentrestageMapper() {
		return centrestageMapper;
	}

	/**
	 * @param centrestageMapper the centrestageMapper to set
	 */
	public void setCentrestageMapper(CentrestageMapper centrestageMapper) {
		this.centrestageMapper = centrestageMapper;
	}
}
