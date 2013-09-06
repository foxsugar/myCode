package com.crystalcg.gamedev.user.mapper;

import java.util.Map;

import com.crystalcg.gamedev.user.domain.Maincity;

public interface MaincityMapper {
	/**
	 * 创建角色时创建主城
	 * @param characterId
	 */
	public void insertMaincity(Maincity maincity);
	/**
	 * 获取主城基本信息和全部资源及上限
	 */
	public Maincity getMaincity(int characterId);
	/**
	 * 获取主城基本信息和全部资源及上限
	 */
	public Maincity getBaseInfo(int characterId);
	/**
	 * 获取全部资源和上限
	 */
	public Maincity getResource(int characterId);
	/**
	 * 获取建筑所需4种资源
	 */
	public Maincity getBuildResource(int characterId);
	/**
	 * 更新建筑资源
	 */
	public void updateBuildResource(Map<String,Number> param);
	/**
	 * 更新城郊资源
	 */
	public void updateSuburbsResource(Map<String,Number> param);
	/**
	 * 更新繁荣度
	 */
	public void updateExperience(Map<String,Integer> param);
	/**
	 * 更新城池等级
	 */
	public void updateRealLevel(Map<String,Integer> param);
	/**
	 * 更新状态
	 */
	public void updateStatus(Map<String,Integer> param);
	/**
	 * 更新坐标 x y
	 */
	public void updateCoordinate(Map<String,Integer> param);
	/**
	 * 更新铜币
	 */
	public void updateMoney(Map<String,Object> param);
	/**
	 * 更新粮食
	 */
	public void updateFood(Map<String,Object> param);
	/**
	 * 更新木材
	 */
	public void updateWood(Map<String,Object> param);
	/**
	 * 更新石料
	 */
	public void updateStone(Map<String,Object> param);
	/**
	 * 更新铁锭
	 */
	public void updateIronore(Map<String,Object> param);
	/**
	 * 更新铜币上限，受太尉府等级控制
	 */
	public void updateMoneyLimit(Map<String,Object> param);
	/**
	 * 更新除铜币外的资源上限，受国库等级控制
	 */
	public void updateResourceLimit(Map<String,Object> param);
	/**
	 * 获取空闲人口
	 */
	public Maincity getFreePeople(int characterId);
	/**
	 * 获取人口信息，工作人口，总人口，人口上限，民心
	 */
	public Maincity getPeopleInfo(int characterId);
	/**
	 * 更新工作人口
	 */
	public void updateWorkingPeople(Map<String,Integer> param);
	/**
	 * 更新人口
	 */
	public void updatePeople(Map<String,Integer> param);
	/**
	 * 更新人口上限
	 */
	public void updatePeopleLimit(Map<String,Integer> param);
	/**
	 * 获取兵种信息：新兵/上限，总兵/上限
	 */
	public Maincity getSoldierInfo(int characterId);
	/**
	 * 更新新兵数量
	 */
	public void updateNewSoldier(Map<String,Integer> param);
	/**
	 * 更新总兵数量 
	 */
	public void updateSoldier(Map<String,Integer> param);
	/**
	 *  更新新兵上限，总兵上限 受兵营等级数量控制
	 */
	public void updateSoldierLimit(Map<String,Integer> param);
	/**
	 * 获取膏药信息 数量/上限
	 */
	public Maincity getMedicineInfo(int characterId);
	/**
	 * 更新膏药数量
	 */
	public void updateMedicine(Map<String,Integer> param);
	/**
	 * 更新膏药上限
	 */
	public void updateMedicineLimit(Map<String,Integer> param);
	/**
	 * 获取民心
	 */
	public Maincity getPopularSupport(int characterId);
	/**
	 * 更新民心
	 */
	public void updatePopularSupport(Map<String,Integer> param);
	/**
	 * 更新地窖状态（开启保护）
	 */
	public void beginCellarProtect(Map<String,Object> param);
	/**
	 * 更新地窖状态（取消保护）
	 */
	public void cancelCellarProtect(Map<String,Object> param);
	/**
	 * 获取用户全部资源和上限，用户comet推送
	 * @param characterId角色Id
	 * @return
	 */
	public Map<String, Object> getResourceForComet(int characterId);
	
	public Maincity getHouseInfo(int characterId);
	public void updateIncreaseTime(Map<String, Object> param);
	public void updateNewSoldierLimit(Map<String, Integer> param);
	public void updateCellarLimit(Map<String, Object> param);
	public void updateLevel(Map<String, Object> param);
	public void updateSoldierAndResource(Map<String, Object> param);
}
