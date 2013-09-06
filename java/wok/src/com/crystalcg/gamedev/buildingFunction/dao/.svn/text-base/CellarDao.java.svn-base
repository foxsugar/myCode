package com.crystalcg.gamedev.buildingFunction.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.domain.UserCellar;
import com.crystalcg.gamedev.buildingFunction.mapper.CellarMapper;

public class CellarDao {
		private CellarMapper cellarMapper;
			
		public List<UserCellar>  getAllCellarProtection(int characterId){
			return cellarMapper.getAllCellarProtection(characterId);
		}
		public void insertUserCellar(List<UserCellar> userCellar){
			cellarMapper.insertUserCellar(userCellar);
		}
		public void updateUserCellar(int characterId,int protectionNo,int protectionAmount,Date protectionTime){
			UserCellar userCellar = new UserCellar();
			userCellar.setCharacterId(characterId);
			userCellar.setProtectionAmount(protectionAmount);
			userCellar.setProtectionNo(protectionNo);
			userCellar.setProtectionTime(protectionTime);
			cellarMapper.updateUserCellar(userCellar);
		}
		public UserCellar getUserCellar(int characterId,int protectionNo){
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("characterId", characterId);
			param.put("protectionNo", protectionNo);
			return cellarMapper.getUserCellar(param);
		}
		public void deleteUserCellar(int characterId){
			cellarMapper.deleteUserCellar(characterId);
		}
		public CellarMapper getCellarMapper() {
			return cellarMapper;
		}

		public void setCellarMapper(CellarMapper cellarMapper) {
			this.cellarMapper = cellarMapper;
		}
		
}
