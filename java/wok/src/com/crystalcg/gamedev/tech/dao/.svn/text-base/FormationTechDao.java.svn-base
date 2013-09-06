package com.crystalcg.gamedev.tech.dao;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.tech.domain.UserFormationTech;
import com.crystalcg.gamedev.tech.mapper.FormationTechMapper;

public class FormationTechDao {
	private FormationTechMapper formationTechMapper;
	
	/**
	 * 获取用户阵法科技
	 * @param param
	 * @return
	 */
	public List<UserFormationTech> getUserFormationTech(Map<String, Object> param){
		return formationTechMapper.getUserFormationTech(param);
	}
	
	/**
	 * 获取用户具体的阵型科技
	 * @param param
	 * @return
	 */
	public UserFormationTech getUserFormationTechByLocation(Map<String, Object> param){
		return formationTechMapper.getUserFormationTechByLocation(param);
	}
	/**
	 * 更新用户阵型科技
	 * @param userFormationTech
	 */
	public void updateUserFormationTech(UserFormationTech userFormationTech){
		formationTechMapper.updateUserFormationTech(userFormationTech);
	}
	/**
	 * 添加用户阵型科技
	 * @param userFormationTech
	 */
	public void addUserFormationTech(UserFormationTech userFormationTech){
		formationTechMapper.addUserFormationTech(userFormationTech);
	}
	/**
	 * 删除用户阵型科技
	 * @param param
	 */
	public void deleteUserFormationTech(Map<String, Object> param){
		formationTechMapper.deleteUserFormationTech(param);
	}
	/**
	 * 获取用户所有阵法
	 * @param characterId
	 * @return
	 */
	public List<UserFormationTech> getUserFormationTechsForBattle(int characterId){
		return formationTechMapper.getUserFormationTechsForBattle(characterId);
	}
	/**
	 * 通过编号获取玩家的具体阵法科技
	 * @param param
	 * @return
	 */
	public UserFormationTech getUserFormationTechByNo(Map<String, Object> param){
		return formationTechMapper.getUserFormationTechByNo(param);
	}

	public FormationTechMapper getFormationTechMapper() {
		return formationTechMapper;
	}

	public void setFormationTechMapper(FormationTechMapper formationTechMapper) {
		this.formationTechMapper = formationTechMapper;
	}
	
}
