package com.crystalcg.gamedev.tech.dao;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.domain.UserInteriorTech;
import com.crystalcg.gamedev.tech.mapper.InteriorTechMapper;

/**
 * 科教馆内政部分
 * @author jinganyang
 *
 */
public class InteriorTechDao {
	private InteriorTechMapper interiorTechMapper;
	/**
	 * 获取所有用户科内政技信息
	 * @param characterId
	 * @return
	 */
	public List<UserInteriorTech> getUserInteriorInfo(int characterId){
		return interiorTechMapper.getUserInteriorInfo(characterId);
	}
	/**
	 * 按位置查找用户内政科技信息
	 * @param param
	 * @return
	 */
	public UserInteriorTech getUserInteriorByKey(Map<String, Object> param){
		return interiorTechMapper.getUserInteriorByKey(param);
	}
	/**
	 * 通过科技编号获取玩家内政科技
	 * @param param
	 * @return
	 */
	public UserInteriorTech getUserInteriorByNo(Map<String, Object> param){
		return interiorTechMapper.getUserInteriorByNo(param);
	}
	/**
	 * 获取用户科内政技信息队列
	 * @param characterId
	 * @return
	 */
	public TechQueue getTechQueue(int characterId){
		return interiorTechMapper.getTechQueue(characterId);
	}
	/**
	 * 添加用户内政科技研究队列
	 * @param userInteriorQueue
	 * @return
	 */
	public void addTechQueue(TechQueue userInteriorQueue){
		interiorTechMapper.addTechQueue(userInteriorQueue);
	}
	/**
	 * 更新用户内政科技研究（完成时间）队列
	 * @param param
	 * @return
	 */
	public void updateTechQueue(Map<String, Object> param){
		interiorTechMapper.updateTechQueue(param);
	}
	/**
	 * 添加玩家内政科技
	 * @param param
	 */
	public void addInteriorTech(UserInteriorTech userInteriorTech){
		interiorTechMapper.addInteriorTech(userInteriorTech);
	}
	/**
	 * 删除玩家内政科技
	 * @param param
	 */
	public void deleteInteriorTech(Map<String, Object> param){
		interiorTechMapper.deleteInteriorTech(param);
	}
	/**
	 * 删除玩家内政科技队列
	 * @param param
	 */
	public void deleteTechQueue(int characterId){
		interiorTechMapper.deleteTechQueue(characterId);
	}
	/**
	 * 更新玩家内政科技
	 * @param param
	 */
	public void updateInteriorTech(UserInteriorTech userInteriorTech){
		interiorTechMapper.updateInteriorTech(userInteriorTech);
	}
	public InteriorTechMapper getInteriorTechMapper() {
		return interiorTechMapper;
	}
	public void setInteriorTechMapper(InteriorTechMapper interiorTechMapper) {
		this.interiorTechMapper = interiorTechMapper;
	}
	
}
