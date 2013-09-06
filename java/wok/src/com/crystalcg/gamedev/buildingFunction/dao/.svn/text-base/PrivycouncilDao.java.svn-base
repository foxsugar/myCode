package com.crystalcg.gamedev.buildingFunction.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.buildingFunction.domain.AffairQueue;
import com.crystalcg.gamedev.buildingFunction.mapper.PrivycouncilMapper;

public class PrivycouncilDao {

	private PrivycouncilMapper privycouncilMapper;

	public void insertAffairQueue(int characterId,int userHeroId,String affairNo,int hours) {
		AffairQueue aq = new AffairQueue();
		aq.setCharacterId(characterId);
		aq.setUserHeroId(userHeroId);
		aq.setAffairNo(affairNo);
		aq.setStartTime(new Date());
		aq.setLastTime(hours);
		privycouncilMapper.insertAffairQueue(aq);
	}

	public void deleteAffairQueue(int characterId,int userHeroId) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("userHeroId", userHeroId);
		privycouncilMapper.deleteAffairQueue(param);
	}

	public AffairQueue getAffairQueue(int characterId,int userHeroId) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("userHeroId", userHeroId);
		return privycouncilMapper.getAffairQueue(param);
	}

	public List<AffairQueue> getAllAffairQueue(int characterId) {
		return privycouncilMapper.getAllAffairQueue(characterId);
	}

	/**
	 * @return the privycouncilMapper
	 */
	public PrivycouncilMapper getPrivycouncilMapper() {
		return privycouncilMapper;
	}

	/**
	 * @param privycouncilMapper
	 *            the privycouncilMapper to set
	 */
	public void setPrivycouncilMapper(PrivycouncilMapper privycouncilMapper) {
		this.privycouncilMapper = privycouncilMapper;
	}

}
