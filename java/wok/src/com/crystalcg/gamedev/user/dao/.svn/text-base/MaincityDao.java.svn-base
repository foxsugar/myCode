package com.crystalcg.gamedev.user.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.mapper.MaincityMapper;

public class MaincityDao {
	
	private MaincityMapper maincityMapper;

	/**
	 * 创建角色时创建主城
	 * @param characterId
	 */
	public void insertMaincity(Maincity maincity){
		maincityMapper.insertMaincity(maincity);
	}
	
	/**
	 * 获取主城基本信息和全部资源及上限
	 */
	public Maincity getMaincity(int characterId){
		return maincityMapper.getMaincity(characterId);
	}
	
	/**
	 * 获取主城基本信息和全部资源及上限
	 */
	public Maincity getBaseInfo(int characterId){
		return maincityMapper.getBaseInfo(characterId);
	}

	/**
	 * 获取全部资源和上限
	 */
	public Maincity getResource(int characterId){
		return maincityMapper.getResource(characterId);
	}
	
	/**
	 * 获取建筑所需4种资源
	 */
	public Maincity getBuildResource(int characterId){
		return maincityMapper.getBuildResource(characterId);
	}
	
	/**
	 * 更新建筑资源
	 */
	public void updateBuildResource(int characterId,long money,long wood,long stone,long ironore){
		Map<String,Number> param = new HashMap<String, Number>();
		param.put("characterId", characterId);
		param.put("money", money);
		param.put("wood", wood);
		param.put("stone", stone);
		param.put("ironore", ironore);
		maincityMapper.updateBuildResource(param);
	}
	
	/**
	 * 更新城郊资源
	 */
	public void updateSuburbsResource(int characterId,long food,long wood,long stone,long ironore){
		Map<String,Number> param = new HashMap<String, Number>();
		param.put("characterId", characterId);
		param.put("food", food);
		param.put("wood", wood);
		param.put("stone", stone);
		param.put("ironore", ironore);
		maincityMapper.updateSuburbsResource(param);
	}
	
	/**
	 * 更新繁荣度，或者提升等级,如果等级提升，推送消息
	 */
	public void updateExperience(int characterId,int experience){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("experience", experience);
		maincityMapper.updateExperience(param);
	}
	
	/**
	 * 更新等级
	 */
	public void updateRealLevel(int characterId,int realLevel){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("realLevel", realLevel);
		maincityMapper.updateRealLevel(param);
	}
	
	/**
	 * 更新状态
	 */
	public void updateStatus(int characterId,int status){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("status", status);
		maincityMapper.updateStatus(param);
	}
	
	/**
	 * 更新坐标,包括使用道具，更新世界信息 该算法写在世界操作中
	 */
	public void updateCoordinate(int characterId,int x,int y){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("x", x);
		param.put("y", y);
		maincityMapper.updateCoordinate(param);
	}
	
	/**
	 * 更新铜币 
	 * @param characterId
	 * @param money
	 * @param updateMoneyTime 需要更新铜币更新时间时传入
	 */
	public void updateMoney(int characterId,long money,Date updateMoneyTime){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("money", money);
		if(updateMoneyTime != null){
			param.put("updateMoneyTime", updateMoneyTime);
		}
		maincityMapper.updateMoney(param);
	}
	
	/**
	 * 更新粮食
	 */
	public void updateFood(int characterId,long food){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("food", food);
		maincityMapper.updateFood(param);
	}
	
	/**
	 * 更新木材
	 */
	public void updateWood(int characterId,long wood){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("wood", wood);
		maincityMapper.updateWood(param);
	}
	
	/**
	 * 更新石料
	 */
	public void updateStone(int characterId,long stone){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("stone", stone);
		maincityMapper.updateStone(param);
	}
	
	/**
	 * 更新铁锭
	 */
	public void updateIronore(int characterId,long ironore){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("ironore", ironore);
		maincityMapper.updateIronore(param);
	}
	
	/**
	 * 更新铜币上限，太尉府等级改变之后调用
	 */
	public void updateMoneyLimit(int characterId,long moneyLimit){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("moneyLimit", moneyLimit);
		maincityMapper.updateMoneyLimit(param);
	}
	
	/**
	 * 更新除铜币外的资源上限，国库等级改变之后更新
	 */
	public void updateResourceLimit(int characterId,long foodLimit,long woodLimit,long stoneLimit,long ironoreLimit){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("foodLimit", foodLimit);
		param.put("woodLimit", woodLimit);
		param.put("stoneLimit", stoneLimit);
		param.put("ironoreLimit", ironoreLimit);
		maincityMapper.updateResourceLimit(param);
	}
	
	/**
	 * 获取空闲人口
	 */
	public Maincity getFreePeople(int characterId){
		return maincityMapper.getFreePeople(characterId);
	}
	
	/**
	 * 获取人口信息，工作人口，总人口，人口上限
	 */
	public Maincity getPeopleInfo(int characterId){
		return maincityMapper.getPeopleInfo(characterId);
	}
	
	/**
	 * 更新工作人口
	 */
	public void updateWorkingPeople(int characterId,int workingPeople){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("workingPeople", workingPeople);
		maincityMapper.updateWorkingPeople(param);
	}
	
	/**
	 * 更新人口
	 */
	public void updatePeople(int characterId,int people){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("people", people);
		maincityMapper.updatePeople(param);
	}
	
	/**
	 * 更新人口
	 */
	public void updatePeopleLimit(int characterId,int peopleLimit){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("peopleLimit", peopleLimit);
		maincityMapper.updatePeopleLimit(param);
	}
	
	/**
	 * 获取兵种信息：新兵/上限，总兵/上限
	 */
	public Maincity getSoldierInfo(int characterId){
		return maincityMapper.getSoldierInfo(characterId);
	}
	
	/**
	 * 更新新兵数量
	 */
	public void updateNewSoldier(int characterId,int newSoldier){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("newSoldier", newSoldier);
		maincityMapper.updateNewSoldier(param);
	}
	
	/**
	 * 更新总兵数量 
	 */
	public void updateSoldier(int characterId,int soldier){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("soldier", soldier);
		maincityMapper.updateSoldier(param);
	}
	
	/**
	 *  更新新兵上限，总兵上限 受兵营等级数量控制
	 */
	public void updateSoldierLimit(int characterId,int soldierLimit){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("soldierLimit", soldierLimit);
		maincityMapper.updateSoldierLimit(param);
	}
	
	/**
	 * 获取膏药信息 数量/上限
	 */
	public Maincity getMedicineInfo(int characterId){
		return maincityMapper.getMedicineInfo(characterId);
	}
	
	/**
	 * 更新膏药数量
	 */
	public void updateMedicine(int characterId,int medicine){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("medicine", medicine);
		maincityMapper.updateMedicine(param);
	}
	
	/**
	 * 更新膏药上限
	 */
	public void updateMedicineLimit(int characterId,int medicineLimit){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("medicineLimit", medicineLimit);
		maincityMapper.updateMedicineLimit(param);
	}
	
	/**
	 * 更新民心
	 */
	public void updatePopularSupport(int characterId,int popularSupport){
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("popularSupport", popularSupport);
		maincityMapper.updatePopularSupport(param);
	}
	
	/**
	 * 更新地窖状态（开启保护）
	 */
	public void beginCellarProtect(int characterId,Date cellarStartTime,int cellarLastTime
			,int cellarMoney,int cellarFood,int cellarWood,int cellarStone,int cellarIronore){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("cellarStartTime", cellarStartTime);
		param.put("cellarLastTime", cellarLastTime);
		param.put("cellarMoney", cellarMoney);
		param.put("cellarFood", cellarFood);
		param.put("cellarWood", cellarWood);
		param.put("cellarStone", cellarStone);
		param.put("cellarIronore", cellarIronore);
		maincityMapper.beginCellarProtect(param);
	}
	
	/**
	 * 更新地窖状态（取消保护）
	 */
	public void cancelCellarProtect(int characterId,Date cellarStartTime,int cellarLastTime){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("cellarStartTime", cellarStartTime);
		param.put("cellarLastTime", cellarLastTime);
		maincityMapper.cancelCellarProtect(param);
	}
	
	public void updateIncreaseTime(int characterId, Date now) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("moneyLastIncrease", now);
		param.put("peopleLastIncrease", now);
		param.put("medicineLastIncrease", now);
		maincityMapper.updateIncreaseTime(param);
	}
	
	/**
	 * 获取用户全部资源和上限，用户comet推送
	 * @param characterId
	 * @return
	 */
	public Map<String, Object> getResourceForComet(int characterId){
		return maincityMapper.getResourceForComet(characterId);
	}
	
	public Maincity getHouseInfo(int characterId) {
		return maincityMapper.getHouseInfo(characterId);
	}
	
	public MaincityMapper getMaincityMapper() {
		return maincityMapper;
	}

	public void setMaincityMapper(MaincityMapper maincityMapper) {
		this.maincityMapper = maincityMapper;
	}

	public void updateNewSoldierLimit(int characterId, int newSoldierLimit) {
		Map<String,Integer> param = new HashMap<String, Integer>();
		param.put("characterId", characterId);
		param.put("newSoldierLimit", newSoldierLimit);
		maincityMapper.updateNewSoldierLimit(param);
	}
	public void updateCellarLimit(int characterId, long cellarLimit) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("cellarLimit", cellarLimit);
		maincityMapper.updateCellarLimit(param);
	}
	public void updateLevel(int characterId, int level,int exp) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("level", level);
		param.put("exp", exp);
		maincityMapper.updateLevel(param);	
	}

	public void updateSoldierAndResource(int characterId,int newSoldier, int soldier,
			long money, long food, long ironore) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("newSoldier", newSoldier);
		param.put("soldier", soldier);
		param.put("money", money);
		param.put("food", food);
		param.put("ironore", ironore);
		maincityMapper.updateSoldierAndResource(param);
	}
}
