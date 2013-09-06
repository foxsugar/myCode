package com.crystalcg.gamedev.user.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.mapper.CharacterMapper;

public class CharacterDao {
	private CharacterMapper characterMapper;
	
	public void insertCharacter(UserCharacter character){
		characterMapper.insertCharacter(character);
	}

	public UserCharacter getCharacterById(int id){
		return characterMapper.getCharacterById(id);
	}
	
	public UserCharacter getCharacterByName(String name){
		return characterMapper.getCharacterByName(name);
	}
	public int getCharacterIdByName(String name){
		return characterMapper.getCharacterIdByName(name);
	}
	
	public CharacterMapper getCharacterMapper() {
		return characterMapper;
	}

	public void setCharacterMapper(CharacterMapper characterMapper) {
		this.characterMapper = characterMapper;
	}

	public void updateName(int characterId, String name) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("name", name);
		characterMapper.updateName(param);
	}

	public void updateCountry(int characterId, int countryId, String countryName) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("countryId", countryId);
		param.put("countryName", countryName);
		characterMapper.updateCountry(param);
	}

	public void updateGender(int characterId, String gender) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("gender", gender);
		characterMapper.updateGender(param);
	}

	public void updateImage(int characterId, String image) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("image", image);
		characterMapper.updateImage(param);
	}

	public void updateExperience(int characterId, int experience) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("experience", experience);
		characterMapper.updateExperience(param);
	}

	public void updateLevel(int characterId, int level) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("level", level);
		characterMapper.updateLevel(param);
	}
	
	public void updateCash(int characterId,int cash){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("cash", cash);
		characterMapper.updateCash(param);
	}

	public void updateTicket(int characterId, int ticket) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("ticket", ticket);
		characterMapper.updateTicket(param);
	}

	public void updateAbilityPoint(int characterId, int abilityPoint) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("abilityPoint", abilityPoint);
		characterMapper.updateAbilityPoint(param);
	}

	public void updateMilitaryStrength(int characterId, int militaryStrength) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("militaryStrength", militaryStrength);
		characterMapper.updateMilitaryStrength(param);
	}

	public void updateInternalAffairs(int characterId, int internalAffairs) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("internalAffairs", internalAffairs);
		characterMapper.updateInternalAffairs(param);
	}

	public void updateTechPoint(int characterId, int techPoint) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("techPoint", techPoint);
		characterMapper.updateTechPoint(param);
	}

	public void updateDescription(int characterId, String description) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("description", description);
		characterMapper.updateDescription(param);
	}

	public void updateAttribute(int characterId,int abilityPoint, int militaryStrength, int internalAffairs) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("abilityPoint", abilityPoint);
		param.put("militaryStrength", militaryStrength);
		param.put("internalAffairs", internalAffairs);
		characterMapper.updateAttribute(param);
	}
	public void updateLoginTime(int characterId, Date loginTime){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("loginTime", loginTime);
		characterMapper.updateLoginTime(param);
	}
	public void updateLogoutTime(int characterId, Date logoutTime){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("logoutTime", logoutTime);
		characterMapper.updateLogoutTime(param);
	}
	public void updateAlliance(int characterId,int allianceId,String allianceposition){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("allianceId", allianceId);
		param.put("allianceposition", allianceposition);
		characterMapper.updateAlliance(param);
	}
	public String getCharacterName(int id){
		return characterMapper.getCharacterName(id);
	}
	public List<Integer> getCharacterId(){
		return characterMapper.getCharacterId();
	}
}
