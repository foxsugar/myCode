package com.crystalcg.gamedev.tech.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.tech.domain.UserFormationTech;

public interface FormationTechMapper {
	List<UserFormationTech> getUserFormationTech(Map<String, Object> param);
	/**
	 * 获取用户具体的阵型科技
	 * @param param
	 * @return
	 */
	UserFormationTech getUserFormationTechByLocation(Map<String, Object> param);
	/**
	 * 更新用户阵型科技
	 * @param userFormationTech
	 */
	void updateUserFormationTech(UserFormationTech userFormationTech);
	/**
	 * 添加用户阵型科技
	 * @param userFormationTech
	 */
	void addUserFormationTech(UserFormationTech userFormationTech);
	/**
	 * 删除用户阵型科技
	 * @param param
	 */
	void deleteUserFormationTech(Map<String, Object> param);
	/**
	 * 获取用户所有阵法
	 * @param characterId
	 * @return
	 */
	List<UserFormationTech> getUserFormationTechsForBattle(int characterId);
	/**
	 * 通过编号获取玩家的具体阵法科技
	 * @param param
	 * @return
	 */
	UserFormationTech getUserFormationTechByNo(Map<String, Object> param);
}
