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
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.tech.action.InteriorTechAction;
import com.crystalcg.gamedev.tech.dao.InteriorTechDao;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.domain.UserInteriorTech;
import com.crystalcg.gamedev.tech.job.InteriorTechJob;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.TimeUtil;
import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.InteriorTechCache;
import com.crystalcg.gamedev.util.cache.QuestCache;
import com.crystalcg.gamedev.util.cache.SoldierTechCache;
import com.crystalcg.gamedev.util.cache.domain.StaticInteriorTech;

/**
 * 科教馆service，内政部分
 * 
 * @author jinganyang
 * 
 */
public class InteriorTechService {

	private static Logger logger = LoggerFactory
			.getLogger(InteriorTechService.class);
	private InteriorTechDao interiorTechDao;
	//private static final int SECOND_TO_MILLISECOND = 1000;
	static final String TECH_JOB_STRING = "techStudyingJob_";// quartz时钟job前缀
	public static final int OPERATE_TYPE_UPDATE = 1;// 更新操作
	public static final int OPERATE_TYPE_INSERT = 0;// 插入操作
	private static final int VALUE_TYPE_VALUE = 1;// 效果值类型，值
	private static final int VALUE_TYPE_PERCENT = 2;// 效果值类型，百分号

	public static final int TECH_STATUS_LOCK = 0;// 科技未开启状态
	public static final int TECH_STATUS_UNLOCK_UNSTUDY = 1;// 科技开启未学习状态
	public static final int TECH_STATUS_HAS_STUDIED = 2;// 科技开启已学习状态
	public static final int TECH_STATUS_HAS_STUDIED_MAX = 3;// 科技开启已学习到最高级状态

	// /////action会调用的方法/////////////////
	/**
	 * 获取玩家内政科技信息
	 * 
	 * @param characterId
	 * @return
	 */
	public Map<String, Object> getUserInteriorForView(int characterId)
			throws AppException {
//		int maxLevel = getMaxLevel(characterId);
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter character = characterService
				.getCharacterById(characterId);
		List<String> prefixOfKey = InteriorTechCache.getPrefixOfKey();
		List<UserInteriorTech> userTech = getUserInteriorInfo(characterId);
		Map<Integer, UserInteriorTech> userTechMap = new HashMap<Integer, UserInteriorTech>();
		for (UserInteriorTech i : userTech) {
			userTechMap.put(i.getTechKey(), i);
		}
		List<Map<String, Object>> techList = new ArrayList<Map<String,Object>>();
		List<String> effectList = new ArrayList<String>();
		for (int i = 0; i < prefixOfKey.size(); i++) {
			StaticInteriorTech staticInteriorTech = InteriorTechCache
					.getInteriorTechByNo(prefixOfKey.get(i) + 1);
			if (staticInteriorTech.getNeedLevel() > character.getLevel()) {// 未开启状态
				techList.add(getToolTipMap(staticInteriorTech,
						TECH_STATUS_LOCK, characterId));
				effectList.add(getNoEffectMap(staticInteriorTech));
			} else if (userTechMap.get(i) == null) {// 已开启，未学习
				techList.add(getToolTipMap(staticInteriorTech,
						TECH_STATUS_UNLOCK_UNSTUDY, characterId));
				effectList.add(getNoEffectMap(staticInteriorTech));
			} else {// 已开启，已学习，下一级和最高级两种；
				techList.add(getToolTipMap(userTechMap.get(i)
						.getInteriorTechEntity(), TECH_STATUS_HAS_STUDIED, characterId));
				effectList.add(userTechMap.get(i).getInteriorTechEntity()
						.getTechEffectValue());
			}
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("userInteriors", techList);
		retMap.put("userInteriorEffects", effectList);
		retMap.put("techPoint", character.getTechPoint());
		return retMap;
	}

	/**
	 * 非通用方法，通过状态获取对应的内政科技tooltip
	 * 
	 * @param staticInteriorTech
	 * @param status
	 * @param maxLevel
	 * @return
	 */
	public Map<String, Object> getToolTipMap(
			StaticInteriorTech staticInteriorTech, int status, int characterId) {
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("techIcon", staticInteriorTech.getTechIcon());
		switch (status) {
		case TECH_STATUS_LOCK:
			retMap.put("techStatus", TECH_STATUS_LOCK);
			retMap.put("techName", staticInteriorTech.getTechName());
			retMap.put("needLevel",
					"需求君主等级" + staticInteriorTech.getNeedLevel() + "级开启");
			return retMap;
		case TECH_STATUS_UNLOCK_UNSTUDY:
			retMap.put("techStatus", TECH_STATUS_UNLOCK_UNSTUDY);
			retMap.put("techName", staticInteriorTech.getTechName());
			retMap.put("techLevel", 0);
			retMap.put("techType", "内政");
			retMap.put("currentEffect", "未学习");
			retMap.put("nextEffect", staticInteriorTech.getDescription()
					+ staticInteriorTech.getTechEffectValue());
			retMap.put("needTime", TimeUtil.toShortString(getReduceLevelTime(staticInteriorTech.getNeedTime(), characterId)));
			return retMap;
		case TECH_STATUS_HAS_STUDIED:
			retMap.put("techName", staticInteriorTech.getTechName());
			retMap.put("techLevel", staticInteriorTech.getTechLevel() );
			retMap.put("techType", "内政");
			retMap.put("currentEffect", staticInteriorTech.getDescription()
					+ staticInteriorTech.getTechEffectValue());
			if(staticInteriorTech.getTechLevel()==Const.MAX_TECH_LEVEL){
				retMap.put("techStatus", TECH_STATUS_HAS_STUDIED_MAX);
				retMap.put("message", "该科技已达到最高等级");
				return retMap;
			} else {
				String nextNo = getNextNo(staticInteriorTech);
				StaticInteriorTech nextTech = InteriorTechCache
						.getInteriorTechByNo(nextNo);
				retMap.put("techStatus", TECH_STATUS_HAS_STUDIED);
				retMap.put(
						"nextEffect",
						nextTech.getDescription()
								+ nextTech.getTechEffectValue());
				retMap.put("needTime", TimeUtil.toShortString(getReduceLevelTime(nextTech.getNeedTime(), characterId)));
				return retMap;
			}

		default:
			logger.error("内政科技分配状态错误！interiorTech status allocate error");
			return retMap;
		}
	}

	/**
	 * 非通用方法，获取没学该科技时的影响值
	 * 
	 * @param staticInteriorTech
	 * @return
	 */
	private String getNoEffectMap(StaticInteriorTech staticInteriorTech) {
		return 0 + (staticInteriorTech.getValueType() == VALUE_TYPE_PERCENT ? "%"
				: "");
	}

	/**
	 * 升级内政科技
	 * 
	 * @param characterId
	 * @param techKey
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> levelUpInterior(int characterId, int techKey)
			throws AppException {
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter character = characterService
				.getCharacterById(characterId);
		if (character.getTechPoint() == 0) {
			throw new AppException("科技点不足");
		}
		UserInteriorTech userInteriorTech = getUserInteriorByKey(characterId,
				techKey);
		TechQueue userInteriorQueue;
		if (getTechQueue(characterId) != null) {
			throw new AppException("有科技正在研究，同一时段只能研究一种科技");
		}
		if (userInteriorTech == null) {
			StaticInteriorTech staticInteriorTech = InteriorTechCache
					.getInteriorTechByKeyAndLevel(techKey, 1);
			validateTech(character, staticInteriorTech);
			userInteriorQueue = addInteriorJob(characterId, staticInteriorTech,
					OPERATE_TYPE_INSERT);
		} else {
			if(userInteriorTech.getInteriorTechEntity().getTechLevel()==Const.MAX_TECH_LEVEL){
				throw new AppException("科技已升至最高级");
			}
			String nextNo = getNextNo(userInteriorTech.getInteriorTechEntity());
			StaticInteriorTech staticInteriorTech = InteriorTechCache
					.getInteriorTechByNo(nextNo);
			validateTech(character, staticInteriorTech);
			userInteriorQueue = addInteriorJob(characterId, staticInteriorTech,
					OPERATE_TYPE_UPDATE);
		}
		character.setTechPoint(character.getTechPoint() - 1);
		characterService.updateTechPoint(characterId, character.getTechPoint());// 扣除一点科技点
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("techPoint", character.getTechPoint());
		retMap.put("studyingTech", InteriorTechAction
				.changeToViewMapForInterior(userInteriorQueue));
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_INTERIOR, characterId);
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_TOTAL, characterId);
		return retMap;
	}


	/**
	 * 验证是否满足研究条件
	 * 
	 * @param character
	 * @param staticInteriorTech
	 * @throws AppException
	 */
	private void validateTech(UserCharacter character,
			StaticInteriorTech staticInteriorTech) throws AppException {
		if (staticInteriorTech.getNeedLevel() > character.getLevel()) {
			throw new AppException("君主等级不满足条件，需君主等级"
					+ staticInteriorTech.getNeedLevel() + "开启");
		}
		BuildingService buildingService = (BuildingService) ServiceLocator
				.getSpringBean("buildingService");
		List<Building> college = buildingService.getbBuildingByPrefix(
				character.getId(), Const.COLLEGE_BUILDING_NO_PREFIX);
		if (college.isEmpty()) {
			throw new AppException("缺少科教馆建筑");
		}
		if (InteriorTechCache.getMaxLevel(college.get(0).getLevel()) < staticInteriorTech
				.getTechLevel()) {
			throw new AppException("科教馆等级不足");
		}
	}

	/**
	 * 添加内政科技研究队列
	 * 
	 * @param characterId
	 * @param techKey
	 * @param staticInteriorTech
	 * @param operateType
	 * @return
	 */
	private TechQueue addInteriorJob(int characterId,
			StaticInteriorTech staticInteriorTech, int operateType) {
		long time = System.currentTimeMillis();
		Date completingTime = new Date(time + this.getReduceLevelTime(staticInteriorTech.getNeedTime(), characterId));
		TechQueue userInteriorQueue = addTechQueue(characterId, completingTime,
				staticInteriorTech.getTechNo());
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("userInteriorQueue", userInteriorQueue);
		data.put("operateType", operateType);
		ExecuteJob.add(InteriorTechJob.class, data, completingTime.getTime(),
				TECH_JOB_STRING + characterId);
		return userInteriorQueue;
	}

	/**
	 * 内政科技降级操作
	 * 
	 * @param characterId
	 * @param techKey
	 * @throws AppException
	 */
	public Map<String, Object> levelDownInterior(int characterId, int techKey)
			throws AppException {
		UserInteriorTech userInteriorTech = getUserInteriorByKey(characterId,
				techKey);
		if (getTechQueue(characterId) != null) {
			throw new AppException("有内政科技正在研究，内政科技研究中无法执行降级操作");
		}
		if (userInteriorTech == null) {
			throw new AppException("玩家没有研究该技能，无法执行降级");
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		if (userInteriorTech.getInteriorTechEntity().getTechLevel() == 1) {// 1级科技直接删除
			deleteInteriorTech(characterId, techKey);
			Map<String, Object> temp = new HashMap<String,Object>();
			temp.put("updateKey", userInteriorTech.getInteriorTechEntity()
					.getTechKey());
			temp.put("updateEffect", userInteriorTech.getInteriorTechEntity()
					.getValueType() == VALUE_TYPE_PERCENT ? "0%" : "0");
			temp.put(
					"updateTechInfo",
					getToolTipMap(userInteriorTech.getInteriorTechEntity(),
							InteriorTechService.TECH_STATUS_UNLOCK_UNSTUDY,
							 characterId));
			retMap.put("userInteriorTech", temp);
		} else {// 非1级科技降级
			String previousNo = getPreviousNo(userInteriorTech
					.getInteriorTechEntity());
			userInteriorTech.setTechNo(previousNo);
			updateInteriorTech(userInteriorTech);
			Map<String, Object> temp = new HashMap<String,Object>();
			temp.put("updateKey", userInteriorTech.getInteriorTechEntity()
					.getTechKey());
			temp.put("updateEffect", userInteriorTech.getInteriorTechEntity()
					.getTechEffectValue());
			temp.put(
					"updateTechInfo",
					getToolTipMap(userInteriorTech.getInteriorTechEntity(),
							InteriorTechService.TECH_STATUS_HAS_STUDIED,
							 characterId));
			retMap.put("userInteriorTech", temp);
		}
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter character = characterService
				.getCharacterById(characterId);
		character.setTechPoint(character.getTechPoint() + 1);
		characterService.updateTechPoint(characterId, character.getTechPoint());// 降级成功，增加一点科技点
		retMap.put("techPoint", character.getTechPoint());
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_INTERIOR, characterId);
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_TOTAL, characterId);
		return retMap;
	}

	/**
	 * 停止研究科技操作
	 * 
	 * @param characterId
	 * @throws AppException
	 */
	public int stopStudying(int characterId) throws AppException {
		TechQueue userInteriorQueue = getTechQueue(characterId);
		if (userInteriorQueue == null) {
			throw new AppException("不存在该内政科技队列，无法终止研究");
		}
		ExecuteJob.cancel(TECH_JOB_STRING + characterId);
		deleteTechQueue(characterId);
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter character = characterService
				.getCharacterById(characterId);
		character.setTechPoint(character.getTechPoint() + 1);
		characterService.updateTechPoint(characterId, character.getTechPoint());// 停止研究成功，增加一点科技点
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_TOTAL, characterId);
		if(InteriorTechCache.getInteriorTechByNo(userInteriorQueue.getStudyTechNo())!=null){
			questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_INTERIOR, characterId);
		}else if(FormationCache.getFormationTechByNo(userInteriorQueue.getStudyTechNo())!=null){
			questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_FORMATION, characterId);
		}else if(SoldierTechCache.getTech(userInteriorQueue.getStudyTechNo())!=null){
			questService.updateQuestSchedule(QuestTargeType.TECH_POINT, QuestCache.TECH_TARGET_SOLDIER, characterId);
		}
		return character.getTechPoint();
	}

	/**
	 * 获取内政科技影响
	 * 
	 * @param interiorTechEffectType
	 *            科技类型枚举变量
	 * @param value
	 *            科技影响的参数值
	 * @param characterId
	 *            角色Id
	 * @return
	 */
	public long getValueAfterEffect(
			InteriorTechEffectType interiorTechEffectType, long value,
			int characterId) {
		UserInteriorTech userInteriorTech = getUserInteriorByKey(characterId,
				interiorTechEffectType.getKey());
		if (userInteriorTech == null) {
			return value;
		}
		switch (interiorTechEffectType.getType()) {
		case InteriorTechEffectType.INCREASE_TYPE:

			return getIncreaseEffect(value, userInteriorTech);
		case InteriorTechEffectType.DECREASE_TYPE:

			return getDecreaseEffect(value, userInteriorTech);

		default:
			return value;
		}
	}
	/**
	 * 非通用方法，获取具体影响值，影响为减少
	 * 
	 * @param value
	 * @param userInteriorTech
	 * @return
	 */
	private long getDecreaseEffect(long value, UserInteriorTech userInteriorTech) {
		switch (userInteriorTech.getInteriorTechEntity().getValueType()) {
		case VALUE_TYPE_VALUE:
			long effectValue = Integer.parseInt(userInteriorTech
					.getInteriorTechEntity().getEffectValue());
			return value - effectValue;
		case VALUE_TYPE_PERCENT:
			double percent = Double.parseDouble(userInteriorTech
					.getInteriorTechEntity().getEffectValue()) / 100;
			return (int) (value - value * percent);

		default:
			logger.error("function getDecreaseEffect valueType error!获取科技影响值类型错误");
			return value;
		}
	}

	/**
	 * 非通用方法，获取具体影响值，影响为增加
	 * 
	 * @param value
	 * @param userInteriorTech
	 * @return
	 */
	private long getIncreaseEffect(long value, UserInteriorTech userInteriorTech) {
		switch (userInteriorTech.getInteriorTechEntity().getValueType()) {
		case VALUE_TYPE_VALUE:
			long effectValue = Integer.parseInt(userInteriorTech
					.getInteriorTechEntity().getEffectValue());
			return value + effectValue;
		case VALUE_TYPE_PERCENT:
			double percent = Double.parseDouble(userInteriorTech
					.getInteriorTechEntity().getEffectValue()) / 100;
			return (int) (value + value * percent);

		default:
			logger.error("function getDecreaseEffect valueType error!获取科技影响值类型错误");
			return value;
		}
	}

	// /////////调用dao层的方法///////////////////

	/**
	 * 添加用户内政科技研究队列
	 * 
	 * @param characterId
	 * @param completingTime
	 * @param studyTechNo
	 * @return
	 */
	public TechQueue addTechQueue(int characterId, Date completingTime,
			String studyTechNo) {
		TechQueue userInteriorQueue = new TechQueue(characterId,
				completingTime, studyTechNo);
		interiorTechDao.addTechQueue(userInteriorQueue);
		return userInteriorQueue;
	}

	/**
	 * 删除玩家内政科技队列
	 * 
	 * @param param
	 */
	public void deleteTechQueue(int characterId) {
		interiorTechDao.deleteTechQueue(characterId);
	}

	/**
	 * 添加玩家内政科技
	 * 
	 * @param characterId
	 * @param techKey
	 * @param techNo
	 */
	public void addInteriorTech(int characterId, int techKey, String techNo) {
		UserInteriorTech userInteriorTech = new UserInteriorTech(techNo,
				characterId, techKey);
		interiorTechDao.addInteriorTech(userInteriorTech);
	}

	/**
	 * 删除玩家内政科技
	 * 
	 * @param characterId
	 * @param techKey
	 */
	public void deleteInteriorTech(int characterId, int techKey) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("techKey", techKey);
		interiorTechDao.deleteInteriorTech(param);
	}

	/**
	 * 更新玩家内政科技
	 * 
	 * @param userInteriorTech
	 */
	public void updateInteriorTech(UserInteriorTech userInteriorTech) {
		interiorTechDao.updateInteriorTech(userInteriorTech);
	}

	/**
	 * 获取所有用户科内政技信息
	 * 
	 * @param characterId
	 * @return
	 */
	public List<UserInteriorTech> getUserInteriorInfo(int characterId) {
		return interiorTechDao.getUserInteriorInfo(characterId);
	}

	/**
	 * 获得用户所有兵种科技
	 * 
	 * @param characterId
	 */
	public List<String> getUserSoldierTech(int characterId) {
		return null;
	}

	/**
	 * 按位置查找用户内政科技信息
	 * 
	 * @param param
	 * @return
	 */
	public UserInteriorTech getUserInteriorByKey(int characterId, int techKey) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("techKey", techKey);
		return interiorTechDao.getUserInteriorByKey(param);
	}

	/**
	 * 通过科技编号获取玩家内政科技
	 * 
	 * @param param
	 * @return
	 */
	public UserInteriorTech getUserInteriorByNo(int characterId, String techNo) {
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("techNo", techNo);
		return interiorTechDao.getUserInteriorByNo(param);
	}

	/**
	 * 获取用户科内政技信息队列
	 * 
	 * @param characterId
	 * @return
	 */
	public TechQueue getTechQueue(int characterId) {
		return interiorTechDao.getTechQueue(characterId);
	}

	/**
	 * 非通用方法，获取下一级科技编号
	 * 
	 * @param techNo
	 * @return
	 */
	private String getNextNo(StaticInteriorTech staticInteriorTech) {
		String[] noSplit = staticInteriorTech.getTechNo().split("_");
		int level = staticInteriorTech.getTechLevel();
		level++;
		return noSplit[0] + "_" + level;
	}

	private String getPreviousNo(StaticInteriorTech staticInteriorTech) {
		String[] noSplit = staticInteriorTech.getTechNo().split("_");
		int level = staticInteriorTech.getTechLevel();
		level--;
		return noSplit[0] + "_" + level;
	}

	public InteriorTechDao getInteriorTechDao() {
		return interiorTechDao;
	}

	public void setInteriorTechDao(InteriorTechDao interiorTechDao) {
		this.interiorTechDao = interiorTechDao;
	}
	/**
	 * 
	 * @param characterId
	 * @param techNo 科技编号
	 * @param itemNo 
	 * @param speedType 
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException 
	 */
	public Map<String, Object> saveSpeedTech(int characterId, int speedType, String itemNo,int confim) throws AppException {
		Map<String, Object> map = null;
		TechQueue techQueue = getTechQueue(characterId);
		if(techQueue == null){
			throw new AppException("该科技不存在或者不在升级队列中,加速失败");
		}else if(!ExecuteJob.checkExists(InteriorTechService.TECH_JOB_STRING+characterId)){
			throw new AppException("科技升级队列异常,加速失败");
		}
		int remainTime = techQueue.getRemainTime();
		if(remainTime <= 0){
			throw new AppException("科技已经升级完成,无须加速");
		}else if(confim == 0){
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			map = userItemService.spendWindow(Const.SPEND_FUNCTION_CITY, characterId, remainTime);
			map.put("RemainTime", remainTime);//秒
			return map;
		}
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		int speedSecond = characterService.saveSpeedNow(speedType,Const.SPEND_FUNCTION_CITY,  characterId, itemNo,remainTime);
		if(speedSecond == -1){//秒cd
			ExecuteJob.modifyTavernStart(InteriorTechService.TECH_JOB_STRING+characterId, -5000);
			speedSecond = remainTime;
		}else{
			ExecuteJob.modifyTavernStart(InteriorTechService.TECH_JOB_STRING+characterId, techQueue.getCompletingTime().getTime() - speedSecond * 1000);
			techQueue.setCompletingTime(TimeUtil.add(-speedSecond, techQueue.getCompletingTime()));
			this.updateTechQueue(techQueue);
		}
		map = new HashMap<String,Object>();
		map.put("speedTime", speedSecond);
		map.put("remainTime", remainTime-speedSecond);
		map.put("state", "success");
		return map;
	}
	/**
	 * 返回添加效果后的科研研究时间(毫秒)
	 * @param sysTime 初始科研研究时间（秒）
	 * @param characterId 玩家id
	 * @return 
	 */
	public long getReduceLevelTime(long sysTime,int characterId){
		SoldierTechService soldierTechService = (SoldierTechService)ServiceLocator.getSpringBean("soldierTechService");
		sysTime = (long)(sysTime*(1-soldierTechService.getReduceLevelTime(characterId)));
		sysTime = this.getValueAfterEffect(InteriorTechEffectType.TECH_STUDY_TIME, sysTime, characterId);
		//return sysTime*1000;
		return 20000;
	}
	/**
	 * 新用户内政科技研究（完成时间）队列
	 * @param techQueue
	 */
	public void updateTechQueue(TechQueue techQueue){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", techQueue.getCharacterId());
		param.put("completeTime", techQueue.getCompletingTime());
		param.put("techNo", techQueue.getStudyTechNo());
		this.interiorTechDao.updateTechQueue(param);
	}
	/**
	 * 已消耗的内政科技点数
	 * @param characterId
	 * @return
	 */
	public int getTechPoint(int characterId){
		int nowCount = 0;
		TechQueue userInteriorQueue = getTechQueue(characterId);
		if(userInteriorQueue != null){
			nowCount = 1;
		}
		List<UserInteriorTech> userTech = getUserInteriorInfo(characterId);
		for (UserInteriorTech i : userTech) {
			nowCount += Integer.valueOf(i.getTechNo().split("_")[1]);
		}
		return nowCount;
	}
}
