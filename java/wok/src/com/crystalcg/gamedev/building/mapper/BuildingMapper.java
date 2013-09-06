package com.crystalcg.gamedev.building.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.building.domain.Building;

/**
 * castleBuilding表 Mybatis映射接口
 * @author xuzhongxing
 *
 */
public interface BuildingMapper {
	void insertBuilding(Building building);
	void deleteBuildingByLocation(Building building);
	void updateBuildingbyLocation(Building building);
	List<Building> getAllBuildingsByCharacterId(int characterId);
	/**
	 * 通过建筑编号获取建筑个数
	 * @param characterId
	 * @param buildingNo
	 * @return
	 */
	public int getBuildingAmountByNo(Map<String, Object> param);
	Building getBuildingByLoation(Building building);
	int getPreBuildingsAmount(Building building);
	int getBuildingsAmountByPrefix(Building building);
	List<Building>  getbBuildingByPrefix(Building building);
}
