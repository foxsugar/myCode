package com.crystalcg.gamedev.user.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.user.domain.UserCharacter;


/**
 * Character表 映射类
 * @author xuzhongxing
 *
 */
public interface CharacterMapper {
	
	void insertCharacter(UserCharacter character);

	UserCharacter getCharacterById(int id);
	
	UserCharacter getCharacterByName(String name);
	/**
	 * 通过角色名字获取角色Id
	 * @param name
	 * @return
	 */
	int getCharacterIdByName(String name);

	/**
	 * 更新玩家元宝
	 * @param param
	 */
	void updateCash(Map<String, Object> param);

	void updateName(Map<String, Object> param);

	void updateCountry(Map<String, Object> param);

	void updateGender(Map<String, Object> param);

	void updateImage(Map<String, Object> param);

	void updateExperience(Map<String, Object> param);

	void updateLevel(Map<String, Object> param);

	void updateTicket(Map<String, Object> param);

	void updateAbilityPoint(Map<String, Object> param);

	void updateMilitaryStrength(Map<String, Object> param);

	void updateInternalAffairs(Map<String, Object> param);

	void updateTechPoint(Map<String, Object> param);

	void updateDescription(Map<String, Object> param);

	void updateAttribute(Map<String, Object> param);
	void updateLoginTime(Map<String, Object> param);
	void updateLogoutTime(Map<String, Object> param);
	/**
	 * 更新联盟
	 * @param param
	 */
    void updateAlliance(Map<String, Object> param);
    String getCharacterName(int id);
    List<Integer> getCharacterId();

}
