package com.crystalcg.gamedev.tech.service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.tech.action.FormationTechAction;
import com.crystalcg.gamedev.tech.action.InteriorTechAction;
import com.crystalcg.gamedev.tech.dao.SoldierTechDao;
import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.job.SoldierTechJob;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.InteriorTechCache;
import com.crystalcg.gamedev.util.cache.QuestCache;
import com.crystalcg.gamedev.util.cache.SoldierTechCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldierTech;

/**
 * 用户兵种科技
 * @author xuzhongxing
 *
 */
public class SoldierTechService {
	private SoldierTechDao soldierTechDao;
	private InteriorTechService interiorTechService;
	
	/**
	 * 科教馆界面获取全部兵种科技
	 * @param characterId
	 * @return 
	 */
	public Map<String, Object> getSoldierTechView(int characterId){
		List<String> techNos = getUserSoldierTech(characterId);
		TechQueue queue = interiorTechService.getTechQueue(characterId);
		Map<String,Object> retMap = new HashMap<String, Object>();
		if(queue!=null){
			retMap.put("studyingTech", InteriorTechAction.changeToViewMapForInterior(queue));
		}
		double effect = getReduceLevelTime(characterId);
		retMap.put("soldierTech", SoldierTechCache.getAllUserTech(techNos,effect));
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		retMap.put("techPoint", characterService.getCharacterById(characterId).getTechPoint());
		retMap.put("soldierTechBase", SoldierTechCache.getBaseUserSoldiers(this.getUserSoldierTech(characterId)));
		return retMap;
	}
	
	/**
	 * 研究兵种科技on duplicate key update dr=values(dr)
	 * @param characterId
	 * @param soldierTechNo
	 * @return 
	 * @throws AppException
	 */
	public Map<String, Object> researchSoldierTech(int characterId,String soldierTechNo) throws AppException{
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		UserCharacter character = characterService.getCharacterById(characterId);
		if(character.getTechPoint()<1){
			throw new AppException("科技点不足");
		}
		TechQueue queue = interiorTechService.getTechQueue(characterId);
		if(queue!=null){
			throw new AppException("有科技正在研究中");
		}
		StaticSoldierTech tech = SoldierTechCache.getTech(soldierTechNo);//要研究的科技
		if(tech == null){
			throw new AppException("未知的科技");
		}
		//科教馆建筑
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.COLLEGE_BUILDING_NO_PREFIX);
		if(list.isEmpty()){
			throw new AppException("请先建造科教馆");
		}
		Building building = list.get(0);//科教馆
		int maxLevel = InteriorTechCache.getMaxLevel(building.getLevel());
		String userTech = soldierTechDao.getUserSoldierTechByPrefix(characterId,soldierTechNo.split("_")[0]);//现有科技
		if(userTech==null){//研究新科技
			if(tech.getTechLevel()!=1){
				throw new AppException("请先研究1级科技");
			}
		}else if(soldierTechNo.equals(userTech)){//升级科技
			String[] array = tech.getTechNo().split("_");
			String nextNo = array[0]+"_"+(Integer.valueOf(array[1])+1);
			tech = SoldierTechCache.getSoldierTypeTech(nextNo);//要升级到的科技
			if(Integer.valueOf(array[1]) == Const.MAX_TECH_LEVEL){
				throw new AppException("该科技已经升至顶级");
			}
		}else{
			throw new AppException("错误的科技编号");
		}
		if(tech.getTechLevel()>maxLevel){
			throw new AppException("科教馆等级不足");
		}
		checkPreTech(characterId,tech);
		//扣除科技点
		characterService.updateTechPoint(characterId, character.getTechPoint()-1);
		//执行job 修改临时数据
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(System.currentTimeMillis()+interiorTechService.getReduceLevelTime(tech.getNeedTime(), characterId));
		TechQueue techQueue = new TechQueue();
		techQueue.setCharacterId(characterId);
		techQueue.setCompletingTime(c.getTime());
		techQueue.setStudyTechNo(tech.getTechNo());
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("techQueue", techQueue);
		ExecuteJob.add(SoldierTechJob.class, data, techQueue.getCompletingTime().getTime(), InteriorTechService.TECH_JOB_STRING+characterId);
		//插入队列
		interiorTechService.addTechQueue(characterId, techQueue.getCompletingTime(), techQueue.getStudyTechNo());
		Map<String,Object> retMap = InteriorTechAction.changeToViewMapForInterior(techQueue);
		retMap.put("techPoint", character.getTechPoint()-1);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_SOLDIER, characterId);
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_TOTAL, characterId);
		return retMap;
	}
	
	/**
	 * 是否满足前置科技
	 * @param tech
	 * @param userTech
	 * @return
	 * @throws AppException
	 */
	private void checkPreTech(int characterId,StaticSoldierTech tech) throws AppException{
		List<String> techNos = getUserSoldierTech(characterId);
		if(tech.getPreTech()!=null){
			boolean checkPreTech = false;//是否已研究前置科技
			String[] array = tech.getPreTech().split("_");
			for(String s:techNos){
				String[] array1 = s.split("_");
				if(array1[0].equals(array[0])&&Integer.valueOf(array1[1])>=Integer.valueOf(array[1])){
					checkPreTech = true;
					break;
				}
			}
			if(!checkPreTech){
				StaticSoldierTech pre = SoldierTechCache.getTech(tech.getPreTech());
				throw new AppException("需要"+pre.getTechName()+" "+pre.getTechLevel()+" 级");
			}
		}
	}
	
	/**
	 * 降级兵种科技
	 * @param characterId
	 * @param soldierTechNo
	 * @return 
	 * @throws AppException 
	 */
	public Map<String, Object> demoteSoldierTech(int characterId,String techNo) throws AppException{
		List<String> userTech = getUserSoldierTech(characterId);//现有科技
		if(!userTech.contains(techNo)){
			throw new AppException("未学习该科技");
		}
		String[] array = techNo.split("_");
		for(String s:userTech){
			String pre = SoldierTechCache.getTech(s).getPreTech();
			if(pre!=null){
				String[] array1 = pre.split("_");
				if(array[0].equals(array1[0])&&Integer.valueOf(array[1])<=Integer.valueOf(array1[1])){
					throw new AppException("是其他科技的前提");
				}
			}
		}
		if(1==Integer.valueOf(array[1])){//删除
			soldierTechDao.deleteTech(characterId,techNo);
			userTech.remove(techNo);
		}else{//降级
			String newNo = array[0]+"_"+(Integer.valueOf(array[1])-1);
			soldierTechDao.updateTech(characterId,techNo,newNo);
			userTech.remove(techNo);
			userTech.add(newNo);
		}
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		UserCharacter character = characterService.getCharacterById(characterId);
		characterService.updateTechPoint(characterId, character.getTechPoint()+1);
		Map<String,Object> retMap = new HashMap<String,Object>();
		double effect = getReduceLevelTime(characterId);
		List<Map<String,Object>> tech = SoldierTechCache.getUserTechByType(techNo, userTech,effect);
		retMap.put("tech", tech);
		retMap.put("techPoint", character.getTechPoint()+1);
		retMap.put("soldierTechBase", SoldierTechCache.getBaseUserSoldiers(this.getUserSoldierTech(characterId)));
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_SOLDIER, characterId);
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_TOTAL, characterId);
		return retMap;
	}
	
	/**
	 * 学习科技，插入或者更新
	 * @param characterId
	 * @param techNo
	 */
	public void learnTech(int characterId,String newNo){
		String[] array = newNo.split("_");
		if(Integer.valueOf(array[1]) == 1){
			soldierTechDao.insertTech(characterId,newNo);
		}else{
			String oldNo = array[0]+"_"+(Integer.valueOf(array[1])-1);
			soldierTechDao.updateTech(characterId, oldNo, newNo);
		}
	}
	
	/**
	 * 研究完成返回
	 * @param characterId
	 * @param techNo
	 * @return
	 * @throws AppException
	 */
	public Object getSoldierTech(int characterId) throws AppException{
		TechQueue techQueue = interiorTechService.getTechQueue(characterId);
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		if(techQueue != null){
			Map<String,Object> retMap = InteriorTechAction.changeToViewMapForInterior(techQueue);
			retMap.put("techPoint", characterService.getCharacterById(characterId).getTechPoint());
			return retMap;
		}
		List<String> list = getUserSoldierTech(characterId);
		String techNo = FormationTechAction.techNoTempMap.get(characterId);
		if(SoldierTechCache.getTech(techNo) == null){
			Map<String,Object> retMap = new HashMap<String, Object>();
			retMap.put("studyingTech", null);
			return retMap;
		}
		if(list.contains(techNo)){
			Map<String,Object> retMap = new HashMap<String,Object>();
			double effect = getReduceLevelTime(characterId);
			List<Map<String,Object>> tech = SoldierTechCache.getUserTechByType(techNo, list,effect);
			retMap.put("tech", tech);
			retMap.put("techPoint", characterService.getCharacterById(characterId).getTechPoint());
			retMap.put("soldierTechBase", SoldierTechCache.getBaseUserSoldiers(this.getUserSoldierTech(characterId)));
			return retMap;
		}
		throw new AppException("未知的科技");
	}
	/**
	 * 返回添加效果后的科研研究时间减少百分比
	 * @param characterId 玩家id
	 * @return 
	 */
	public  double getReduceLevelTime(int characterId){
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> college = buildingService.getbBuildingByPrefix(characterId, Const.COLLEGE_BUILDING_NO_PREFIX);
		if(college == null || college.isEmpty()){
			return 0;
		}
		StaticBuilding staticBuilding = BuildingCache.getBuildingEntityByNo(college.get(0).getBuildingNo());
		return Double.valueOf(staticBuilding.getFunctionvalue1())/100;
	}
	/**
	 * 获得用户已有的兵种科技
	 * @param characterId
	 * @return
	 */
	public List<String> getUserSoldierTech(int characterId) {
		return soldierTechDao.getUserSoldierTech(characterId);
	}
	/**
	 * 获得已经消耗的兵种科技点数
	 * @param characterId
	 * @return
	 */
	public int getUserSoldierTechPoint(int characterId){
		int nowCount = 0;
		TechQueue queue = interiorTechService.getTechQueue(characterId);
		if(queue!=null){
			nowCount += 1;
		}
		List<Integer> pointList = SoldierTechCache.getBaseUserSoldiers(this.getUserSoldierTech(characterId));
		for(Integer  level : pointList ){
			nowCount += level;
		}
		return nowCount;
	}
	public SoldierTechDao getSoldierTechDao() {
		return soldierTechDao;
	}

	public void setSoldierTechDao(SoldierTechDao soldierTechDao) {
		this.soldierTechDao = soldierTechDao;
	}

	public InteriorTechService getInteriorTechService() {
		return interiorTechService;
	}

	public void setInteriorTechService(InteriorTechService interiorTechService) {
		this.interiorTechService = interiorTechService;
	}

}
