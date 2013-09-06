package com.crystalcg.gamedev.tech.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.tech.mapper.SoldierTechMapper;

public class SoldierTechDao {
	SoldierTechMapper soldierTechMapper;
	

	public SoldierTechMapper getSoldierTechMapper() {
		return soldierTechMapper;
	}

	public void setSoldierTechMapper(SoldierTechMapper soldierTechMapper) {
		this.soldierTechMapper = soldierTechMapper;
	}

	public List<String> getUserSoldierTech(int characterId) {
		// TODO Auto-generated method stub
		return soldierTechMapper.getUserSoldierTech(characterId);
	}
	
	public String getUserSoldierTechByPrefix(int characterId,String prefix){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("prefix", prefix);
		return soldierTechMapper.getUserSoldierTechByPrefix(param);
	}

	public void deleteTech(int characterId, String techNo) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("techNo", techNo);
		soldierTechMapper.deleteTech(param);
	}

	public void updateTech(int characterId,String oldNo, String newNo) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("oldNo", oldNo);
		param.put("newNo", newNo);
		soldierTechMapper.updateTech(param);
	}

	public void insertTech(int characterId, String techNo) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("techNo", techNo);
		soldierTechMapper.insertTech(param);
	}
}
