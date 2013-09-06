package com.crystalcg.gamedev.building.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.mapper.BuildingMapper;

/**
 * 建筑数据操作类
 * 
 * @author xuzhongxing
 * 
 */
public class BuildingDao {
	private BuildingMapper buildingMapper;

	public void insertBuilding(Building building) {
		buildingMapper.insertBuilding(building);
	}

	public void deleteBuildingByLocation(int characterId, int location) {
		Building building = new Building();
		building.setCharacterId(characterId);
		building.setLocation(location);
		buildingMapper.deleteBuildingByLocation(building);

	}

	public void updateBuildingbyLocation(int characterId, int location,
			String buildingNo, int level) {
		Building building = new Building();
		building.setCharacterId(characterId);
		building.setLocation(location);
		building.setBuildingNo(buildingNo);
		building.setLevel(level);
		buildingMapper.updateBuildingbyLocation(building);
	}

	public List<Building> getAllBuildingsByCharacterId(int characterId) {
		return buildingMapper.getAllBuildingsByCharacterId(characterId);
	}

	/**
	 * 通过建筑编号获取建筑个数
	 * @param characterId
	 * @param buildingNo
	 * @return
	 */
	public int getBuildingAmountByNo(int characterId, String buildingNo){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("buildingNo", buildingNo);
		return buildingMapper.getBuildingAmountByNo(param);
	}
	public Building getBuildingByLoation(int characterId, int location) {
		Building building = new Building();
		building.setCharacterId(characterId);
		building.setLocation(location);
		return buildingMapper.getBuildingByLoation(building);
	}

	public int getPreBuildingsAmount(int characterId, String buildingNo,
			int level) {
		Building building = new Building();
		building.setCharacterId(characterId);
		building.setBuildingNo(buildingNo);
		building.setLevel(level);
		return buildingMapper.getPreBuildingsAmount(building);
	}

	public int getBuildingsAmountByPrefix(int characterId, String buildingNoPerfix) {
		Building building = new Building();
		building.setCharacterId(characterId);
		building.setBuildingNo(buildingNoPerfix);
		return buildingMapper.getBuildingsAmountByPrefix(building);
	}

	public List<Building>  getbBuildingByPrefix(int characterId, String buildingNoPerfix) {
		Building building = new Building();
		building.setCharacterId(characterId);
		building.setBuildingNo(buildingNoPerfix);
		return buildingMapper.getbBuildingByPrefix(building);
	}

	public BuildingMapper getBuildingMapper() {
		return buildingMapper;
	}

	public void setBuildingMapper(BuildingMapper buildingMapper) {
		this.buildingMapper = buildingMapper;
	}
}
