package com.crystalcg.gamedev.alliance.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.alliance.Job.DisbandAllianceJob;
import com.crystalcg.gamedev.alliance.Job.UpgradeAllianceJob;
import com.crystalcg.gamedev.alliance.dao.AllianceDao;
import com.crystalcg.gamedev.alliance.domain.Alliance;
import com.crystalcg.gamedev.alliance.domain.AllianceQueue;
import com.crystalcg.gamedev.alliance.domain.AllianceUpgradeQueue;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.AllianceGradeCache;
import com.crystalcg.gamedev.util.cache.AlliancePositionCache;
import com.crystalcg.gamedev.util.cache.AlliancePrivilegeCache;
import com.crystalcg.gamedev.util.cache.CountryCache;
import com.crystalcg.gamedev.util.cache.domain.StaticAllianceGrade;
import com.crystalcg.gamedev.util.cache.domain.StaticAlliancePosition;
import com.crystalcg.gamedev.util.cache.domain.StaticAlliancePrivilege;

public class AllianceService {
	private static Logger logger = LoggerFactory
			.getLogger(AllianceService.class);
	private static final int USE_GOLD = 5000;// 消耗金币
	private static final int MAX_ALLIANCE_AMOUNT = 10;// 每页显示总数
	private static final long FORTY_EIGHT_HOUR = 172800000;// 48小时*60分钟*60秒*1000毫秒
	private static final String ALLIANCE_DISBAND = "alliance_disband";// 联盟解散
	private static final String ALLIANCE_UPGUADE_QUEUE = "alliance_UpQueue";// 联盟升级
	private AllianceDao allianceDao;

	/**
	 * 创建联盟
	 */
	public void createAlliance(int characterId, String name, String banner,
			String introduction) throws AppException {
		int nameLength = name.trim().length();
		int bannerLength = banner.trim().length();
		if (nameLength < 2 || nameLength > 6) {
			throw new AppException("名称不合法");
		}
		if (bannerLength == 0 || bannerLength > 1) {
			throw new AppException("旗帜不合法");
		}
		if (introduction.trim().length() > 200) {
			throw new AppException("联盟介绍过长");
		}
		List<String> nameList = allianceDao.getAllAllianceName();
		if (nameList != null) {
			for (String namelist : nameList) {
				if (namelist.equals(name)) {
					throw new AppException("已经有该名称的联盟");
				}
			}
		}

		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		if (userCharacter.getAllianceId() != 0) {
			throw new AppException("你已经有联盟");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator
				.getSpringBean("maincityService");
		Maincity city = maincityService.getMaincity(characterId);
		long money = city.getMoney() - USE_GOLD;
		long wood = city.getWood();
		long stone = city.getStone();
		long ironore = city.getIronore();
		if (money < 0) {
			throw new AppException("金币不足");
		}
		maincityService.updateBuildResource(characterId, money, wood, stone,
				ironore);
		String chief = userCharacter.getName();
		String country = CountryCache.getNameById(userCharacter.getCountryId());
		int friendStatus = 0;
		int level = 1;// 联盟等级；
		int memberAmount = 1;// 成员数量是 1；
		String alliancePosition = "of0001";// 创建者是盟主
		allianceDao.insertAlliance(name, banner, country, chief, level,
				memberAmount, introduction, friendStatus);// 创建联盟
		AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator
				.getSpringBean("allianceMemberService");
		Alliance alliance = allianceDao.getAllAllianceByName(name);// 根据联盟名称获取联盟
		characterService.updateAlliance(characterId, alliance.getId(),
				alliancePosition);// 改变君主联盟状态
		allianceMemberService.createAllianceMember(characterId,
				alliance.getId());// 加入到联盟成员表
		String event = " {" + name + "}联盟由{" + userCharacter.getName() + "}创建";
		allianceMemberService.insertAllianceEvent(alliance.getId(), new Date(),
				event);// 插入事件
		// 任务
		QuestService questService = (QuestService) ServiceLocator
				.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.JOIN_ALLIANCE, null,
				characterId);
	}

	/**
	 * 根据联盟名称查询联盟
	 * 
	 * @param name
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> getAllAllianceByName(String name)
			throws AppException {
		Map<String, Object> retMap = new HashMap<String, Object>();
		Alliance alliance = allianceDao.getAllAllianceByName(name);
		if (alliance == null) {
			throw new AppException("该联盟不存在");
		}
		if (alliance.getFriendStatus() == 0) {
			retMap.put("friendStatus", "否");
		}
		if (alliance.getFriendStatus() == 1) {
			retMap.put("friendStatus", "有");
		}
		retMap.put("name", alliance.getName());
		retMap.put("banner", alliance.getBanner());
		retMap.put("country", alliance.getCountry());
		retMap.put("chief", alliance.getChief());
		retMap.put("level", alliance.getLevel());
		retMap.put("owncountry", alliance.getOwnCountry());
		retMap.put("memberAmount", alliance.getMemberAmount());
		retMap.put("wealth", alliance.getWealth());
		retMap.put("bulletin", alliance.getBulletin());
		retMap.put("introduction", alliance.getIntroduction());
		retMap.put("allianceId", alliance.getId());
		return retMap;
	}

	/**
	 * 君主自己的联盟信息
	 * 
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> initCharacterAlliance(int characterId)
			throws AppException {
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		Map<String, Object> retMap = new HashMap<String, Object>();
		Alliance alliance = getAllianceById(userCharacter.getAllianceId());// 获取君主的联盟
		if (alliance == null) {
			retMap.put("isAlliance", 1);
		} else {
			String position = userCharacter.getAlliancePosition();// 君主联盟职位
			StaticAlliancePosition staticAlliancePosition = AlliancePositionCache
					.getStaticAlliancePosition(position);// 获取职位等级表
			retMap.put("isAlliance", 0);
			retMap.put("name", alliance.getName());
			retMap.put("banner", alliance.getBanner());
			retMap.put("country", alliance.getCountry());
			retMap.put("chief", alliance.getChief());
			retMap.put("level", alliance.getLevel());
			retMap.put("owncountry", alliance.getOwnCountry());
			retMap.put("memberAmount", alliance.getMemberAmount());
			retMap.put("wealth", alliance.getWealth());
			retMap.put("bulletin", alliance.getBulletin());
			retMap.put("introduction", alliance.getIntroduction());
			retMap.put("allianceId", alliance.getId());
			retMap.put("authoLevel", staticAlliancePosition.getAuthoLevel());
		}
		return retMap;
	}

	/**
	 * 根据Id查询联盟
	 * 
	 * @param id
	 * @return
	 */
	public Alliance getAllianceById(int id) {
		return allianceDao.getAllianceById(id);
	}
    public Alliance getAllianceByName(String name){
    	return allianceDao.getAllAllianceByName(name);
    }
	/**
	 * 根据国家分页查询
	 * 
	 * @return
	 */
	public Map<String, Object> getAllianceByCountry(String country, int page) {
		if (page < 1) {
			page = 1;
		}
		int amount = allianceDao.getAllianceCountryAmount(country);
		int pages = (amount - 1 + MAX_ALLIANCE_AMOUNT) / MAX_ALLIANCE_AMOUNT;
		Map<String, Object> retMap = new HashMap<String, Object>();
		if (page > pages) {
			page = pages;
		}
		List<Alliance> alliance;
		if (page == 0) {
			retMap.put("alliance", new ArrayList<Object>());
		} else {
			alliance = allianceDao.getAllianceByCountry(country, (page - 1)
					* MAX_ALLIANCE_AMOUNT, MAX_ALLIANCE_AMOUNT);
			retMap.put("alliance", alliance);
		}
		retMap.put("page", page);
		retMap.put("pages", pages);
		return retMap;
	}

	/**
	 * 获取全部联盟
	 * 
	 * @param page
	 * @return
	 */
	public Map<String, Object> getAllAlliance(int page) {
		if (page < 1) {
			page = 1;
		}
		Map<String, Object> retMap = new HashMap<String, Object>();
		int amount = allianceDao.getAllAllianceAmount();
		int pages = (amount - 1 + MAX_ALLIANCE_AMOUNT) / MAX_ALLIANCE_AMOUNT;
		if (page > pages) {
			page = pages;
		}
		List<Alliance> alliance;
		if (page == 0) {
			retMap.put("alliance", new ArrayList<Object>());
		} else {
			alliance = allianceDao.getAllAlliance((page - 1)
					* MAX_ALLIANCE_AMOUNT, MAX_ALLIANCE_AMOUNT);
			retMap.put("alliance", alliance);
		}
		// for(Alliance a : alliance){
		// if(a.getFriendStatus()==0){
		// alliance.add()
		// }
		// }
		retMap.put("page", page);
		retMap.put("pages", pages);
		return retMap;
	}

	/**
	 * 解散联盟（解散联盟按钮）
	 * 
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> removeAlliance(int characterId)
			throws AppException {
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		if (userCharacter.getAllianceId() == 0) {
			throw new AppException("你未加入任何联盟");
		}
		Map<String, Object> retMap = new HashMap<String, Object>();
		String privilegeNo = "ga0001";// 解散联盟的特权编号
		String position = userCharacter.getAlliancePosition();// 君主联盟职位
		StaticAlliancePosition staticAlliancePosition = AlliancePositionCache
				.getStaticAlliancePosition(position);// 获取职位等级表
		StaticAlliancePrivilege staticAlliancePrivilege = AlliancePrivilegeCache
				.getStaticAlliancePrivilege(privilegeNo);// 获取特权表

		AllianceQueue allianceQueue = allianceDao
				.getAllianceQueue(userCharacter.getAllianceId());
		// Alliance alliance = getAllianceById(userCharacter.getAllianceId());
		// if(alliance==null){
		// retMap.put("status", true);
		// }else{
		// alliance = getAllianceById(userCharacter.getAllianceId());
		// }
		if (staticAlliancePosition.getAuthoLevel() != staticAlliancePrivilege
				.getNeedLevel()) {
			retMap.put("isLight", false);

		} else {
			retMap.put("isLight", true);
		}

		retMap.put("needTime", 10 * 1000);
		if (allianceQueue != null) {
			retMap.put("completeTime", allianceQueue.getCompletetime()
					.getTime() - System.currentTimeMillis());
		}
		return retMap;
	}

	public boolean isStatus(int allianceId) {
		Alliance alliance = getAllianceById(allianceId);
		if (alliance == null) {
			return true;
		} else {
			isStatus(allianceId);
		}
		return false;
	}

	/**
	 * 确认解散联盟（解散按钮）
	 * 
	 * @throws AppException
	 */
	public void disbandAlliance(int characterId) throws AppException {
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		if (userCharacter.getAllianceId() == 0) {
			throw new AppException("你未加入任何联盟");
		}
		String privilegeNo = "ga0001";// 解散联盟的特权编号
		String position = userCharacter.getAlliancePosition();// 君主联盟职位
		StaticAlliancePosition staticAlliancePosition = AlliancePositionCache
				.getStaticAlliancePosition(position);// 获取职位等级表
		StaticAlliancePrivilege staticAlliancePrivilege = AlliancePrivilegeCache
				.getStaticAlliancePrivilege(privilegeNo);// 获取特权表
		if (staticAlliancePosition.getAuthoLevel() != staticAlliancePrivilege
				.getNeedLevel()) {
			throw new AppException("你没有权限操作该联盟");
		}
		AllianceQueue getallianceQueue = allianceDao
				.getAllianceQueue(userCharacter.getAllianceId());
		if (getallianceQueue != null) {
			throw new AppException("该联盟正在解散");
		}
		long d = System.currentTimeMillis() + 10 * 1000;// 需要时间 FORTY_EIGHT_HOUR
		Date date = new Date(d);
		AllianceQueue allianceQueue = new AllianceQueue();
		allianceQueue.setCompletetime(date);
		allianceQueue.setAllianceId(userCharacter.getAllianceId());
		allianceDao.insertAllianceQueue(allianceQueue);// 插入解散队列
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("allianceQueue", allianceQueue);

		ExecuteJob.add(DisbandAllianceJob.class, data, d, characterId
				+ ALLIANCE_DISBAND);
		// return FORTY_EIGHT_HOUR;
	}

	/**
	 * 取消解散
	 * 
	 * @param characterId
	 * @param allianceId
	 * @throws AppException
	 */
	public void removedisbandAlliance(int characterId) throws AppException {
		boolean isExist = ExecuteJob.cancel(characterId + ALLIANCE_DISBAND);
		if (!isExist) {
			logger.info("操作已经完成，无法取消");
			throw new AppException("操作已经完成，无法取消");
		}
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		// if(userCharacter.getAllianceId()!=allianceId){
		// throw new AppException("你不在该联盟");
		// }
		String privilegeNo = "ga0001";// 解散联盟的特权编号
		String position = userCharacter.getAlliancePosition();// 君主联盟职位
		StaticAlliancePosition staticAlliancePosition = AlliancePositionCache
				.getStaticAlliancePosition(position);// 获取职位等级表
		StaticAlliancePrivilege staticAlliancePrivilege = AlliancePrivilegeCache
				.getStaticAlliancePrivilege(privilegeNo);// 获取特权表
		if (staticAlliancePosition.getAuthoLevel() != staticAlliancePrivilege
				.getNeedLevel()) {
			throw new AppException("你没有权限操作该联盟");
		}
		AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator
				.getSpringBean("allianceMemberService");
		allianceMemberService
				.deleteAllianceQueue(userCharacter.getAllianceId());
	}

	/**
	 * 返回联盟公告，介绍（修改信息按钮）
	 * 
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> getAllianceInfo(int characterId)
			throws AppException {
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		Alliance alliance = getAllianceById(userCharacter.getAllianceId());
		if (alliance == null) {
			throw new AppException("你没有加入任何联盟");
		}
		Map<String, Object> retMap = new HashMap<String, Object>();
		String privilegeNo = "ga0004";// 修改信息的特权编号
		String position = userCharacter.getAlliancePosition();// 君主联盟职位
		StaticAlliancePosition staticAlliancePosition = AlliancePositionCache
				.getStaticAlliancePosition(position);// 获取职位等级表
		StaticAlliancePrivilege staticAlliancePrivilege = AlliancePrivilegeCache
				.getStaticAlliancePrivilege(privilegeNo);// 获取特权表
		if (staticAlliancePosition.getAuthoLevel() < staticAlliancePrivilege
				.getNeedLevel()) {
			retMap.put("isLight", false);
		} else {
			retMap.put("isLight", true);
		}
		retMap.put("bulletin", alliance.getBulletin());
		retMap.put("introduction", alliance.getIntroduction());
		return retMap;
	}

	/**
	 * 保存修改信息
	 * 
	 * @throws AppException
	 */
	public void changeAllianceInfo(int characterId, String introduction,
			String bulletin) throws AppException {
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		String privilegeNo = "ga0004";// 修改信息的特权编号
		String position = userCharacter.getAlliancePosition();// 君主联盟职位
		StaticAlliancePosition staticAlliancePosition = AlliancePositionCache
				.getStaticAlliancePosition(position);// 获取职位等级表
		StaticAlliancePrivilege staticAlliancePrivilege = AlliancePrivilegeCache
				.getStaticAlliancePrivilege(privilegeNo);// 获取特权表
		if (staticAlliancePosition.getAuthoLevel() < staticAlliancePrivilege
				.getNeedLevel()) {// 以后从静态表里去判断
			throw new AppException("你没有权限操作该联盟");
		}
		allianceDao.changeAllianceInfo(userCharacter.getAllianceId(),
				introduction, bulletin);
	}

	/**
	 * 联盟升级信息
	 * 
	 * @return
	 * @throws AppException
	 */
	public Object allianceUpgradeInfo(int characterId) throws AppException {
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		int allianceId = userCharacter.getAllianceId();
		int allianceLevel = allianceDao.getAllianceLevel(allianceId);
		Map<String, Object> retMap = new HashMap<String, Object>();

		StaticAllianceGrade nowAllianceLevel = AllianceGradeCache
				.getStaticAllianceGrade(allianceLevel);// 当前等级的升级信息

		StaticAllianceGrade nextAllianceLevel = AllianceGradeCache
				.getStaticAllianceGrade(allianceLevel + 1);// 下一等级的升级信息
		if (nextAllianceLevel == null) {
			retMap.put("isLight", false);
			retMap.put("nowLevel", allianceLevel);
			retMap.put("nowMemberLimit", nowAllianceLevel.getMemberLimit());
			retMap.put("value", "恭喜你已达到最高级");
			return retMap;
		}
		String privilegeNo = "ga0003";// 升级联盟的特权编号
		String position = userCharacter.getAlliancePosition();// 君主联盟职位
		StaticAlliancePosition staticAlliancePosition = AlliancePositionCache
				.getStaticAlliancePosition(position);// 获取职位等级表
		StaticAlliancePrivilege staticAlliancePrivilege = AlliancePrivilegeCache
				.getStaticAlliancePrivilege(privilegeNo);// 获取特权表

		Alliance alliance = getAllianceById(allianceId);
		AllianceUpgradeQueue ap = allianceDao.getAllianceUpQueue(allianceId);
		if (ap != null) {
			retMap.put("completeTime",
					ap.getCompleteTime().getTime() - System.currentTimeMillis());
			retMap.put("isLight", false);
		} else {
			if (staticAlliancePosition.getAuthoLevel() < staticAlliancePrivilege
					.getNeedLevel()
					&& alliance.getWealth() < nextAllianceLevel
							.getUpgradeNeedWealth()) {
				retMap.put("isLight", false);
			} else {
				retMap.put("isLight", true);
			}
		}
		retMap.put("nowLevel", allianceLevel);
		retMap.put("nextLevel", allianceLevel + 1);
		retMap.put("nowMemberLimit", nowAllianceLevel.getMemberLimit());
		retMap.put("nextMemberLimit", nextAllianceLevel.getMemberLimit());
		retMap.put("needWealth", nextAllianceLevel.getUpgradeNeedWealth());
		retMap.put("needTime", nextAllianceLevel.getUpgradeNeedTime() * 1000);
		return retMap;
	}

	/**
	 * 升级
	 * 
	 * @return
	 * @throws AppException
	 */
	public void allianceUpgrade(int characterId) throws AppException {
		CharacterService characterService = (CharacterService) ServiceLocator
				.getSpringBean("characterService");
		UserCharacter userCharacter = characterService
				.getCharacterById(characterId);
		String privilegeNo = "ga0003";// 升级联盟的特权编号
		String position = userCharacter.getAlliancePosition();// 君主联盟职位
		StaticAlliancePosition staticAlliancePosition = AlliancePositionCache
				.getStaticAlliancePosition(position);// 获取职位等级表
		StaticAlliancePrivilege staticAlliancePrivilege = AlliancePrivilegeCache
				.getStaticAlliancePrivilege(privilegeNo);// 获取特权表
		int allianceId = userCharacter.getAllianceId();
		if (staticAlliancePosition.getAuthoLevel() < staticAlliancePrivilege
				.getNeedLevel()) {
			throw new AppException("你没有权限升级");
		}
		AllianceUpgradeQueue ap = allianceDao.getAllianceUpQueue(allianceId);
		if (ap != null) {
			throw new AppException("你的联盟正在升级");
		}
		Alliance alliance = getAllianceById(allianceId);// 根据联盟Id获取联盟
		int allianceWealth = alliance.getWealth();// 联盟财富
		int level = alliance.getLevel() + 1;// 需要升级的等级
		StaticAllianceGrade allianceLevel = AllianceGradeCache
				.getStaticAllianceGrade(level);// 当前等级的下一等级信息
		if (allianceLevel == null) {

		}
		int needWealth = allianceLevel.getUpgradeNeedWealth();// 升级需要的财富
		int needTime = allianceLevel.getUpgradeNeedTime();// 升级需要的时间
		if (allianceWealth < needWealth) {
			throw new AppException("联盟财富不足，请捐献");
		}
		long d = System.currentTimeMillis() + needTime * 1000;// 需要的时间
		Date date = new Date(d);
		AllianceUpgradeQueue allianceUpQueue = new AllianceUpgradeQueue();
		allianceUpQueue.setAllianceId(allianceId);
		allianceUpQueue.setLevel(level);
		allianceUpQueue.setCompleteTime(date);
		updateAllianceWealth(allianceId, -needWealth);// 更新联盟财富
		allianceDao.insertAllianceUpQueue(allianceUpQueue);// 插入联盟升级队列
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("allianceUpQueue", allianceUpQueue);

		ExecuteJob.add(UpgradeAllianceJob.class, data, d, allianceId
				+ ALLIANCE_UPGUADE_QUEUE);
	}

	// /**
	// * 申请结盟
	// * @param characterId
	// * @param allyAllianceId
	// * @throws AppException
	// */
	// public void allianceApplication(int characterId,int allyAllianceId)
	// throws AppException{
	// CharacterService characterService = (CharacterService)
	// ServiceLocator.getSpringBean("characterService");
	// UserCharacter userCharacter =
	// characterService.getCharacterById(characterId);
	// int allianceId = userCharacter.getAllianceId();
	// if(AlliancePowerCache.getExpel(userCharacter.getAlliancePosition())==0){//该权限使用的是解散联盟权限；
	// throw new AppException("你没有结盟的权限");
	// }
	// Alliance alliance = getAllAllianceById(allianceId);//自己的联盟
	// Alliance allyAlliance = getAllAllianceById(allyAllianceId);//被结盟的一方
	// if(allyAlliance==null){
	// throw new AppException("该联盟不存在");
	// }
	// if(allianceDao.getAllianceAllyApply(allianceId, allyAllianceId)!=null){
	// throw new AppException("你已发出请求，请等待盟主确认");
	// }
	// String event1 = alliance.getName()+"联盟，正在向你的联盟发出申请";
	// String event2 = "你正在向"+allyAlliance.getName()+"发出申请";
	// allianceDao.insertAllianceAlly(allianceId, allyAllianceId, event2);
	// allianceDao.insertAllianceAlly(allyAllianceId, allianceId, event1);
	// }
	// /**
	// * 分页查询联盟申请表.
	// * @param characterId
	// * @param page
	// * @return
	// */
	// public Map<String, Object> getAllAllianceAllyApply(int characterId,int
	// page){
	// CharacterService characterService = (CharacterService)
	// ServiceLocator.getSpringBean("characterService");
	// UserCharacter userCharacter =
	// characterService.getCharacterById(characterId);
	// int allianceId = userCharacter.getAllianceId();
	// if(page<1){
	// page = 1;
	// }
	// Map<String, Object> retMap = new HashMap<String,Object>();
	// int amount = allianceDao.getAllianceAllyApplyAmount(allianceId);
	// int pages = (amount-1+MAX_ALLIANCE_AMOUNT)/MAX_ALLIANCE_AMOUNT;
	// if(page>pages){
	// page = pages;
	// }
	// List<AllianceAllyApply> allianceAllyApply;
	// if(page == 0){
	// retMap.put("allianceAllyApply", new ArrayList<Object>());
	// }else{
	// allianceAllyApply =allianceDao.getAllAllianceAllyApply(allianceId,
	// (page-1)*MAX_ALLIANCE_AMOUNT, MAX_ALLIANCE_AMOUNT);
	// retMap.put("allianceAllyApply", allianceAllyApply);
	// }
	// retMap.put("page", page);
	// retMap.put("pages", pages);
	// return retMap;
	// }
	// /**
	// * 接受申请
	// * @param characterId
	// * @param allyAllianceId
	// * @throws AppException
	// */
	// public void acceptingApplication(int characterId,int friendId) throws
	// AppException{
	// CharacterService characterService = (CharacterService)
	// ServiceLocator.getSpringBean("characterService");
	// UserCharacter userCharacter =
	// characterService.getCharacterById(characterId);
	// int allianceId = userCharacter.getAllianceId();
	// if(AlliancePowerCache.getExpel(userCharacter.getAlliancePosition())==0){//该权限使用的是解散联盟权限；
	// throw new AppException("你没有结盟的权限");
	// }
	// int type = 1;//此接受全是朋友
	// int status = 1;//有友盟状态
	// allianceDao.deleteAllainceAllyApply(allianceId, friendId);
	// allianceDao.deleteAllainceAllyApply(friendId, allianceId);
	// allianceDao.insertAllianceFriend(allianceId, friendId, type);
	// allianceDao.insertAllianceFriend(friendId, allianceId, type);
	// updateAllianceFriendStatus(allianceId,status);
	// updateAllianceFriendStatus(friendId,status);
	// }
	// /**
	// * 拒绝结盟
	// * @param characterId
	// * @param friendId
	// * @throws AppException
	// */
	// public void refuseApplication(int characterId, int friendId) throws
	// AppException{
	// CharacterService characterService = (CharacterService)
	// ServiceLocator.getSpringBean("characterService");
	// UserCharacter userCharacter =
	// characterService.getCharacterById(characterId);
	// int allianceId = userCharacter.getAllianceId();
	// if(AlliancePowerCache.getExpel(userCharacter.getAlliancePosition())==0){//该权限使用的是解散联盟权限；
	// throw new AppException("你没有结盟的权限");
	// }
	// allianceDao.deleteAllainceAllyApply(allianceId, friendId);
	// allianceDao.deleteAllainceAllyApply(friendId, allianceId);
	// }
	/**
	 * 更新友盟状态
	 * 
	 * @param allianceId
	 * @param status
	 */
	public void updateAllianceFriendStatus(int allianceId, int status) {
		allianceDao.updateAllianceFriendStatus(allianceId, status);
	}

	/**
	 * 更新联盟财富
	 * 
	 * @param allianceId
	 * @param wealth
	 */
	public void updateAllianceWealth(int allianceId, int wealth) {
		allianceDao.updateAllianceWealth(allianceId, wealth);
	}

	/**
	 * 更新联盟等级
	 * 
	 * @param allianceId
	 * @param level
	 */
	public void updateAllianceLevel(int allianceId, int level) {
		allianceDao.updateAllianceLeve(allianceId, level);
	}

	/**
	 * 更新联盟成员数量
	 * 
	 * @param allianceId
	 * @param num
	 */
	public void updateAllianceMemberNum(int allianceId, int num) {
		allianceDao.updateAllianceMemberNum(allianceId, num);
	}

	/**
	 * 删除联盟升级队列
	 * 
	 * @param allianceId
	 */
	public void deleteAllianceUpQueue(int allianceId) {
		allianceDao.deleteAllianceUpQueue(allianceId);
	}

	public AllianceDao getAllianceDao() {
		return allianceDao;
	}

	public void setAllianceDao(AllianceDao allianceDao) {
		this.allianceDao = allianceDao;
	}

}
