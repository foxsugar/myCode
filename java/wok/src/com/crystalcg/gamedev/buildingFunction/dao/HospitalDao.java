package com.crystalcg.gamedev.buildingFunction.dao;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.mapper.HospitalMapper;

public class HospitalDao {
	
	private HospitalMapper hospitalMapper;
	
	public List<Map<String,Object>> getHeroInHospital(int charId){
		return hospitalMapper.getHeroInHospital(charId);
	}
//	int cureHero(int charId,int heroId){
//		
//	}
	public int getMedicineNumber(int charId){
		return hospitalMapper.getMedicineNumber(charId);
	}

	public HospitalMapper getHospitalMapper() {
		return hospitalMapper;
	}

	public void setHospitalMapper(HospitalMapper hospitalMapper) {
		this.hospitalMapper = hospitalMapper;
	}
}
