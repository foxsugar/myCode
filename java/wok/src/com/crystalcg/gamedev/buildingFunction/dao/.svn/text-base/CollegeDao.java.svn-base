package com.crystalcg.gamedev.buildingFunction.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.mapper.CollegeMapper;

public class CollegeDao {
	private CollegeMapper collegeMapper;
	
	public List<String> getUserHeroSkillNo(int characterId,int userHeroId){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("userHeroId", userHeroId);
		return collegeMapper.getUserHeroSkillNo(param);
	}
	
	public void insertRelHeroSkill(int characterId,int userHeroId,String heroSkillNo){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("userHeroId", userHeroId);
		param.put("heroSkillNo", heroSkillNo);
		collegeMapper.insertRelHeroSkill(param);
	}


	public CollegeMapper getCollegeMapper() {
		return collegeMapper;
	}

	public void setCollegeMapper(CollegeMapper collegeMapper) {
		this.collegeMapper = collegeMapper;
	}
}
