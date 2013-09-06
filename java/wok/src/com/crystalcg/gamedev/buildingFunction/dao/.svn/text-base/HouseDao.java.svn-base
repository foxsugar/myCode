package com.crystalcg.gamedev.buildingFunction.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.mapper.HouseMapper;

public class HouseDao {
	
	private HouseMapper houseMapper;
	
	public Map<String,Integer> getPeopleInfo(int charId){
		return houseMapper.getPeopleInfo(charId);
	}
	
	public List<Map<String,Object>> getDefenceworks(int charId){
		return houseMapper.getDefenceworks(charId);
	}
	public List<Map<String,Object>> getDefenceHero(int charId){
		return houseMapper.getDefenceHero(charId);
	}
	public int getBlockedRiver(int charId){
		return houseMapper.getBlockedRiver(charId);
	}
	
	public List<Map<String,Object>> getHeroForCollege(int charId){
		return houseMapper.getHeroForCollege(charId);
	}
	public List<Map<String,Object>> getAllSkill(){
		return houseMapper.getAllSkill();
	}
	public List<Map<String,Object>> getLearnedSkill(int charId,int userHeroId){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("charId", charId);
		param.put("userHeroId", userHeroId);
		return houseMapper.getLearnedSkill(param);
	}
	public List<Map<String,Object>> getCanLearnSkill(int charId,int userHeroId){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("charId", charId);
		param.put("userHeroId", userHeroId);
		return houseMapper.getCanLearnSkill(param);
	}
	public List<Map<String,Object>> getCannotLearnSkill(int charId,int userHeroId){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("charId", charId);
		param.put("userHeroId", userHeroId);
		return houseMapper.getCannotLearnSkill(param);
	}
	
	public Map<String,Object> getAlliance(int charId){
		return houseMapper.getAlliance(charId);
	}
	
	public HouseMapper getHouseMapper() {
		return houseMapper;
	}

	public void setHouseMapper(HouseMapper houseMapper) {
		this.houseMapper = houseMapper;
	}
	
	
}
