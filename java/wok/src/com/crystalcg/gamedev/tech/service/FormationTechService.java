package com.crystalcg.gamedev.tech.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.tech.action.InteriorTechAction;
import com.crystalcg.gamedev.tech.dao.FormationTechDao;
import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.domain.UserFormationTech;
import com.crystalcg.gamedev.tech.job.FormationTechJob;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.TimeUtil;
import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.InteriorTechCache;
import com.crystalcg.gamedev.util.cache.QuestCache;
import com.crystalcg.gamedev.util.cache.domain.StaticFormation;
import com.crystalcg.gamedev.util.cache.domain.StaticFormationTech;

public class FormationTechService {
	private FormationTechDao formationTechDao;
	private static Logger logger = LoggerFactory.getLogger(FormationTechService.class);
	private static final int TECH_STATUS_UNSTUDIED = 0;//科技未学习状态
	private static final int TECH_STATUS_HAS_STUDIED = 1;//科技已学习状态
	private static final int TECH_STATUS_HAS_STUDIED_MAX = 2;//科技已学习到最高级状态
	private static final int DEFAULT_PAGE = 1;//默认页数为1
	//private static final int SECOND_TO_MILLISECOND = 1000;
	
	
	/**
	 * 获取阵法科技信息，默认第一页
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> getFormationTechInfo(int characterId) throws AppException{
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		UserCharacter character = characterService.getCharacterById(characterId);
		Map<String, Object> retMap = new HashMap<String,Object>();
		TechQueue techQueue = interiorTechService.getTechQueue(characterId);
		if(techQueue==null){
			retMap.put("studyingTech", null);
		}else{
			retMap.put("studyingTech", InteriorTechAction.changeToViewMapForInterior(techQueue));
		}
		retMap.put("techPoint", character.getTechPoint());
		retMap.put("userFormationTech", getFormationTechInfoByPage(characterId, DEFAULT_PAGE));
		retMap.put("userFormationTechBase", getAllFormationTechInfo(characterId));
		retMap.put("page", DEFAULT_PAGE);
		retMap.put("pages", FormationCache.getFormationTechPages());
		return retMap;
	}
	/**
	 * 阵法科技翻页
	 * @param characterId
	 * @param page
	 * @return
	 * @throws AppException
	 */
	public List<Map<String, Object>> getFormationTechInfoByPage(int characterId,int page) throws AppException{
		validatePageAndLocation(page, null);
//		int maxLevel = getMaxLevel(characterId);
		List<UserFormationTech> userFormationTechs = getUserFormationTechByPage(characterId, page);
		Map<String, UserFormationTech> userFormationTechMap = new HashMap<String,UserFormationTech>();
		for(UserFormationTech i:userFormationTechs){
			userFormationTechMap.put(i.getTechNo().split("_")[0], i);
		}
		List<String> formationTechPrefix = FormationCache.getFormationTechPrefixByPage(page);
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		for(String i :formationTechPrefix){
			if(userFormationTechMap.get(i)==null){
				//未学习
				retList.add(changeToToolTip(characterId,FormationCache.getFormationByTechNo(i+"_"+1), FormationCache.getFormationTechByNo(i+"_"+1), TECH_STATUS_UNSTUDIED));
			}else{
				//已学习
				UserFormationTech userFormationTech = userFormationTechMap.get(i);
				retList.add(changeToToolTip(characterId,userFormationTech.getFormation(), userFormationTech.getFormationTech(), TECH_STATUS_HAS_STUDIED));
			}
		}
		return retList;
	}
	/**
	 * 所有阵法科技
	 * @param characterId
	 * @param page
	 * @return
	 * @throws AppException
	 */
	public List<Integer> getAllFormationTechInfo(int characterId) throws AppException{
		List<UserFormationTech> userFormationTechs = formationTechDao.getUserFormationTechsForBattle(characterId);
		Map<String, UserFormationTech> userFormationTechMap = new HashMap<String,UserFormationTech>();
		for(UserFormationTech i:userFormationTechs){
			userFormationTechMap.put(i.getTechNo().split("_")[0], i);
		}
		List<String> formationTechPrefix = FormationCache.getAllFormationTechPrefix();
		List<Integer> retList = new ArrayList<Integer>();
		for(String i :formationTechPrefix){
			if(userFormationTechMap.get(i)!=null){
				UserFormationTech userFormationTech = userFormationTechMap.get(i);
				StaticFormationTech staticFormationTech = userFormationTech.getFormationTech();
				retList.add(staticFormationTech.getTechLevel());
			}else{
				retList.add(0);
			}
		}
		return retList;
	}
//	/**
//	 * 非通用方法，获取最高可升级数
//	 * @param characterId
//	 * @return
//	 * @throws AppException
//	 */
//	private int getMaxLevel(int characterId) throws AppException{
//		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
//		List<Building> college = buildingService.getbBuildingByPrefix(characterId, Const.COLLEGE_BUILDING_NO_PREFIX);
//		if(college.isEmpty()){
//			throw new AppException("缺少科教馆建筑");
//		}
//		return InteriorTechCache.getMaxLevel(college.get(0).getLevel());
//	}
	/**
	 * 非通用方法，转化前台信息，用于tooltip
	 * @param characterId
	 * @param staticFormation
	 * @param staticFormationTech
	 * @param status
	 * @param maxLevel
	 * @return
	 */
	private Map<String, Object> changeToToolTip(int characterId,StaticFormation staticFormation, StaticFormationTech staticFormationTech, int status) throws AppException{
		Map<String, Object> retMap = new HashMap<String,Object>();
		InteriorTechService interiorTechService = (InteriorTechService) ServiceLocator.getSpringBean("interiorTechService");
		retMap.put("smallIcon", staticFormationTech.getTechIcon());
		switch (status) {
		case TECH_STATUS_UNSTUDIED:
			retMap.put("techStatus", TECH_STATUS_UNSTUDIED);
			retMap.put("techName", staticFormationTech.getTechName());
			retMap.put("techLevel", 0);
//			retMap.put("maxLevel", "当前最高可升至"+maxLevel+"级");
			retMap.put("techType", "阵法");
			retMap.put("currentEffect", "未学习");
			retMap.put("nextEffect", staticFormation.getEffectDescription());
			retMap.put("needTime", TimeUtil.toShortString(interiorTechService.getReduceLevelTime(staticFormationTech.getNeedTime(), characterId)));
			retMap.put("description", staticFormation.getDescription());
			return retMap;
		case TECH_STATUS_HAS_STUDIED:
			retMap.put("techName", staticFormationTech.getTechName());
			retMap.put("techLevel", staticFormationTech.getTechLevel());
			retMap.put("techType", "阵法");
			retMap.put("currentEffect", staticFormation.getEffectDescription());
			retMap.put("description", staticFormation.getDescription());
//			retMap.put("smallIcon", staticFormation.getFormationSmallIcon());
			StaticFormation nextFormation = FormationCache.getNextFormation(staticFormation);
			StaticFormationTech nextTech = FormationCache.getNextTech(staticFormationTech);
			if(staticFormationTech.getTechLevel()==Const.MAX_TECH_LEVEL){
				retMap.put("techStatus", TECH_STATUS_HAS_STUDIED_MAX);
				retMap.put("message", "该科技已达到最高等级");
				return retMap;
			}else{
//				retMap.put("maxLevel", "当前最高可升至"+maxLevel+"级");
				retMap.put("techStatus", TECH_STATUS_HAS_STUDIED);
				retMap.put("nextEffect", nextFormation.getEffectDescription());
				retMap.put("needTime", TimeUtil.toShortString(interiorTechService.getReduceLevelTime(nextTech.getNeedTime(), characterId)));
				return retMap;
			}

		default:
			logger.error("阵法科技分配状态错误！formationTech status allocate error");
			return retMap;
		}
		
	}
	
	/**
	 * 升级阵法科技
	 * @param characterId
	 * @param page
	 * @param location
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> levelUpFormation(int characterId, int page, int location) throws AppException{
		int pageSize = FormationCache.getFormationTechPageSize();
		validatePageAndLocation(page, location);
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		UserCharacter character = characterService.getCharacterById(characterId);
		if(character.getTechPoint()==0){
			throw new AppException("科技点不足");
		}
		TechQueue userInteriorQueue;
		if(interiorTechService.getTechQueue(characterId)!=null){
			throw new AppException("有科技正在研究，同一时段只能研究一种科技");
		}
		UserFormationTech userFormationTech = getUserFormationTechByLocation(characterId, (page-1)*pageSize+location);
		if(userFormationTech==null){
			StaticFormationTech staticFormationTech = FormationCache.getFormationTechByLocationAndLevel((page-1)*pageSize+location, 1);
			validateTech(character, staticFormationTech);
			userInteriorQueue = addFormationJob(characterId, staticFormationTech, InteriorTechService.OPERATE_TYPE_INSERT);
		}else{
			if(userFormationTech.getFormationTech().getTechLevel()==Const.MAX_TECH_LEVEL){
				throw new AppException("科技已升至最高级");
			}
			StaticFormationTech staticFormationTech = FormationCache.getNextTech(userFormationTech.getFormationTech());
			validateTech(character, staticFormationTech);
			userInteriorQueue = addFormationJob(characterId, staticFormationTech, InteriorTechService.OPERATE_TYPE_UPDATE);
		}
		character.setTechPoint(character.getTechPoint()-1);
		characterService.updateTechPoint(characterId, character.getTechPoint());//扣除一点科技点
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("techPoint", character.getTechPoint());
		retMap.put("studyingTech", InteriorTechAction.changeToViewMapForInterior(userInteriorQueue));
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_FORMATION, characterId);
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_TOTAL, characterId);
		return retMap;
	}
	/**
	 * 非通用方法验证科教馆等级是否满足研究条件
	 * @param character
	 * @param staticInteriorTech
	 * @throws AppException
	 */
	private void validateTech(UserCharacter character, StaticFormationTech staticFormationTech) throws AppException{
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> college = buildingService.getbBuildingByPrefix(character.getId(), Const.COLLEGE_BUILDING_NO_PREFIX);
		if(college.isEmpty()){
			throw new AppException("缺少科教馆建筑");
		}
		if(InteriorTechCache.getMaxLevel(college.get(0).getLevel())<staticFormationTech.getTechLevel()){//判断是否可升级，对于科教馆的等级需求同内政科技
			throw new AppException("科教馆等级不足");
		}
	}
	/**
	 * 添加阵法科技研究队列
	 * @param characterId 玩家id
	 * @param techKey
	 * @param staticInteriorTech
	 * @param operateType
	 * @return
	 */
	private TechQueue addFormationJob(int characterId, StaticFormationTech staticFormationTech, int operateType){
		InteriorTechService interiorTechService = (InteriorTechService) ServiceLocator.getSpringBean("interiorTechService");
		long time = System.currentTimeMillis();
		Date completingTime = new Date(time + interiorTechService.getReduceLevelTime(staticFormationTech.getNeedTime(), characterId));
		TechQueue userInteriorQueue = interiorTechService.addTechQueue(characterId, completingTime, staticFormationTech.getTechNo());
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("userTechQueue", userInteriorQueue);
		data.put("operateType", operateType);
		ExecuteJob.add(FormationTechJob.class, data, completingTime.getTime(), InteriorTechService.TECH_JOB_STRING+characterId);
		return userInteriorQueue;
	}

	
	/**
	 * 阵法科技降级操作
	 * @param characterId
	 * @param techKey
	 * @throws AppException
	 */
	public Map<String, Object> levelDownFormation(int characterId, int page, int location) throws AppException{
		int pageSize = FormationCache.getFormationTechPageSize();
		validatePageAndLocation(page, location);
		InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		UserFormationTech userFormationTech = getUserFormationTechByLocation(characterId, (page-1)*pageSize+location);
		if(interiorTechService.getTechQueue(characterId)!=null){
			throw new AppException("有内政科技正在研究，内政科技研究中无法执行降级操作");
		}
		if(userFormationTech==null){
			throw new AppException("玩家没有研究该技能，无法执行降级");
		}
//		int maxLevel = getMaxLevel(characterId);
		Map<String, Object> techAfterUpdated;
		if(userFormationTech.getFormationTech().getTechLevel()==1){//1级科技直接删除
			deleteUserFormationTech(characterId, (page-1)*pageSize+location);
			techAfterUpdated = changeToToolTip(characterId,userFormationTech.getFormation(), userFormationTech.getFormationTech(), TECH_STATUS_UNSTUDIED);
		}else{//非1级科技降级
			String previousNo = FormationCache.getPreviousTech(userFormationTech.getFormationTech()).getTechNo();
			userFormationTech.setTechNo(previousNo);
			updateUserFormationTech(userFormationTech);
			techAfterUpdated = changeToToolTip(characterId,userFormationTech.getFormation(), userFormationTech.getFormationTech(), TECH_STATUS_HAS_STUDIED);
		}
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		UserCharacter character = characterService.getCharacterById(characterId);
		character.setTechPoint(character.getTechPoint()+1);
		characterService.updateTechPoint(characterId, character.getTechPoint());//降级成功，增加一点科技点
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("techPoint", character.getTechPoint());
		retMap.put("userFormationTechBase", getAllFormationTechInfo(characterId));
		retMap.put("techForUpdate", techAfterUpdated);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_FORMATION, characterId);
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_TOTAL, characterId);
		return retMap;
	}
	/**
	 * 获取用户阵法科技
	 * @param characterId
	 * @param page
	 * @return
	 */
	private List<UserFormationTech> getUserFormationTechByPage(int characterId, int page){
		int pageSize = FormationCache.getFormationTechPageSize();
		return getUserFormationTech(characterId, pageSize*(page-1), page*pageSize);
	}
	/**
	 * 获取用户科技点
	 * @param characterId
	 * @return
	 */
	public int getTechPoint(int characterId){
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		return characterService.getCharacterById(characterId).getTechPoint();
	}
	/**
	 * 验证页码和位置是否符合规范
	 * @param page
	 * @param location
	 * @return
	 * @throws AppException
	 */
	public boolean validatePageAndLocation(Integer page, Integer location) throws AppException{
		int pages = FormationCache.getFormationTechPages();
		int pageSize = FormationCache.getFormationTechPageSize();
		int maxLocation = pageSize-1;
		if(page!=null&&(page<1||page>pages)){
			throw new AppException("页码错误");
		}
		if(location!=null&&(location<0||location>maxLocation)){
			throw new AppException("位置错误");
		}
		return true;
	}
	
	
	
/////////////dao层////////////
	/**
	 * 获取用户所有阵法
	 * @param characterId
	 * @return
	 */
	public List<UserFormationTech> getUserFormationTechsForBattle(int characterId){
		return formationTechDao.getUserFormationTechsForBattle(characterId);
	}
	/**
	 * 通过编号获取玩家的具体阵法科技
	 * @param param
	 * @return
	 */
	public UserFormationTech getUserFormationTechByNo(int characterId, String techNo){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("techNo", techNo);
		return formationTechDao.getUserFormationTechByNo(param);
	}
	/**
	 * 按位置范围获取玩家阵法科技
	 * @param characterId
	 * @param techLocationMin
	 * @param techLocationMax
	 * @return
	 */
	public List<UserFormationTech> getUserFormationTech(int characterId, int techLocationMin, int techLocationMax){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("techLocationMax", techLocationMax);
		param.put("techLocationMin", techLocationMin);
		return formationTechDao.getUserFormationTech(param);
	}
	/**
	 * 获取用户具体的阵型科技
	 * @param param
	 * @return
	 */
	public UserFormationTech getUserFormationTechByLocation(int characterId, int techLoaction){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("techLoaction", techLoaction);
		return formationTechDao.getUserFormationTechByLocation(param);
	}
	/**
	 * 更新用户阵型科技
	 * @param userFormationTech
	 */
	public void updateUserFormationTech(UserFormationTech userFormationTech){
		formationTechDao.updateUserFormationTech(userFormationTech);
	}
	/**
	 * 添加用户阵型科技
	 * @param userFormationTech
	 */
	public void addUserFormationTech(UserFormationTech userFormationTech){
		formationTechDao.addUserFormationTech(userFormationTech);
	}
	/**
	 * 删除用户阵型科技
	 * @param param
	 */
	public void deleteUserFormationTech(int characterId, int techLoaction){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("techLocation", techLoaction);
		formationTechDao.deleteUserFormationTech(param);
	}
	public FormationTechDao getFormationTechDao() {
		return formationTechDao;
	}

	public void setFormationTechDao(FormationTechDao formationTechDao) {
		this.formationTechDao = formationTechDao;
	}
	/**
	 * 获得已经使用的阵法科技点数
	 * @param characterId
	 * @return
	 * @throws AppException 
	 */
	public int getformationTechTechPoint(int characterId) throws AppException {
		int nowCount = 0;
		InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		TechQueue techQueue = interiorTechService.getTechQueue(characterId);
		if(techQueue!=null){
			nowCount += 1;
		}
		for(Integer level : getAllFormationTechInfo(characterId)){
			nowCount += level;
		}
		return nowCount;
	}
}
