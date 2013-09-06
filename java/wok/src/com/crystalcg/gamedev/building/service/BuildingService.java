package com.crystalcg.gamedev.building.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.building.Job.BuildJob;
import com.crystalcg.gamedev.building.Job.DemolitionJob;
import com.crystalcg.gamedev.building.Job.UpgradeJob;
import com.crystalcg.gamedev.building.dao.BuildingDao;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.domain.QueueBuilding;
import com.crystalcg.gamedev.buildingFunction.service.CellarService;
import com.crystalcg.gamedev.cache.BuildCache;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.BuildingAlgorithm;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.CityCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

/**
 * 建筑物服务类
 * @author xuzhongxing
 *
 */
public class BuildingService {
	
	private static Logger logger = LoggerFactory.getLogger(BuildingService.class);
	private BuildingDao buildingDao;
	private BuildQueueService buildQueueService;
	private static final int build_status = 1;
	private static final int upgrade_status = 2;
	private static final int demolition_status = 3;
	
	/**
	 * 获取某个位置的建筑
	 * @param characterId 君主ID
	 * @param location 位置
	 * @return
	 */
	public Building getBuildingByLoation(int characterId,int location){
		return buildingDao.getBuildingByLoation(characterId, location);
	}
	
	/**
	 * 通过建筑编号获取建筑个数
	 * @param characterId
	 * @param buildingNo
	 * @return
	 */
	public int getBuildingAmountByNo(int characterId, String buildingNo){
		return buildingDao.getBuildingAmountByNo(characterId, buildingNo);
	}
	/**
	 * 获取角色的所有建筑
	 * @param characterId 君主ID
	 * @return
	 */
	public List<Building> getAllBuildingsByCharacterId(int characterId){
		return buildingDao.getAllBuildingsByCharacterId(characterId);
	}
	
	/**
	 * 建造建筑
	 * @param character
	 * @param location
	 * @param building
	 * @return
	 * @throws AppException 
	 */
	public QueueBuilding build(int characterId,int location,String buildingNo) throws AppException {
		
		if(BuildCache.isBuildQueueFull(characterId, Const.BUILD_NUM)){
			logger.info("建筑队列已满");
			throw new AppException("建筑队列已满");
		}
		
		if(BuildCache.getBuilding(characterId, location) != null){
			logger.info("已经开始建造");
			throw new AppException("已经开始建造");
		}
		//要建造的建筑实体
		StaticBuilding entity = BuildingCache.getBuildingEntityByNo(buildingNo);
		//只能建造等级是1的建筑
		if(entity.getLevel() != 1){
			logger.info("只能建造一级建筑");
			throw new AppException("只能建造一级建筑");
		}
		
		if(getBuildingByLoation(characterId, location) != null){
			logger.info("该位置已有建筑");
			throw new AppException("该位置已有建筑");
		}
		
		//主城建筑相关资源
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity city = maincityService.getMaincity(characterId);
		
		List<Building> allBuilding = getAllBuildingsByCharacterId(characterId);
		int level = city.getLevel();
		int numLimit = CityCache.getBulidingNumByLevel(city.getLevel());
		if(allBuilding.size()+getBuildingQueueAmount(characterId)>=numLimit){
			logger.info(level+"级主城最多能建造"+numLimit+"个建筑");
			throw new AppException(level+"级主城最多能建造"+numLimit+"个建筑");
		}
		
		//验证资源
		if(city.getMoney() < entity.getNeedMoney()){
			logger.info("铜币不足");
			throw new AppException("铜币不足");
		}
		if(city.getWood() < entity.getNeedWood()){
			logger.info("木材不足");
			throw new AppException("木材不足");
		}
		if(city.getStone() < entity.getNeedStone()){
			logger.info("石料不足");
			throw new AppException("石料不足");
		}
		if(city.getIronore() < entity.getNeedIronore()){
			logger.info("铁矿不足");
			throw new AppException("铁矿不足");
		}
		StaticBuilding preEntity = BuildingCache.getBuildingEntityByNo(entity.getPreBuilding());
		//再次检查前提建筑
		if(!checkPreCondition(characterId,preEntity)){
			logger.info("需要"+preEntity.getBuildingName()+preEntity.getLevel()+"级");
			throw new AppException("需要"+preEntity.getBuildingName()+preEntity.getLevel()+"级");
		}
		//验证数量
		if(isBuilt(characterId, entity.getBuildingNo(), entity.getLimitAmount())){
			logger.info(entity.getBuildingName()+"最多只能建造"+entity.getLimitAmount()+"个");
			throw new AppException(entity.getBuildingName()+"最多只能建造"+entity.getLimitAmount()+"个");
		}

		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		//建造消耗时间
		long time = BuildingAlgorithm.calculateBuildTime(characterId,interiorTech.getValueAfterEffect(InteriorTechEffectType.BUILDING_TIME,entity.getUpgradeTime(), characterId));
		//建筑队列
		QueueBuilding queueBuilding = new QueueBuilding();
		queueBuilding.setCharacterId(characterId);
		queueBuilding.setLocation(location);
		queueBuilding.setStartTime(new Date());
		queueBuilding.setStatus(BuildingService.build_status);
		queueBuilding.setTargetBuildingNo(entity.getBuildingNo());
		queueBuilding.setTime(time);
		//传递给JOB的数据
		Map<String,Object> data = new HashMap<String, Object>();
		data.put("queueBuilding", queueBuilding);
		//更新资源
		maincityService.updateBuildResource(characterId, city.getMoney()-entity.getNeedMoney(), city.getWood()-entity.getNeedWood(),
				city.getStone()-entity.getNeedStone(), city.getIronore()-entity.getNeedIronore());
		//更新服务器缓存
		BuildCache.setBuilding(queueBuilding,Const.BUILD_NUM);
		//插入DB建筑队列表
		buildQueueService.insertQueueBuilding(queueBuilding);
		//开启Job
		ExecuteJob.add(BuildJob.class, data, queueBuilding.getStartTime().getTime()+queueBuilding.getTime()*1000,characterId+"_build_"+location);
		UserComet userComet = (UserComet) ServiceLocator.getSpringBean("userComet");
		userComet.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, getBuildQueue(characterId));
		return queueBuilding;
	}
	private int getBuildingQueueAmount(int characterId){
		int amount = 0;
		if (BuildCache.getBuilding(characterId)==null) {
			return amount;
		}
		Iterator<QueueBuilding> it = BuildCache.getBuilding(characterId).values().iterator();
		while (it.hasNext()) {
			QueueBuilding queueBuilding = it.next();
			if(queueBuilding.getStatus()==build_status) amount++;
		}
		return amount;
	}
	
	/**
	 * 升级建筑
	 * @param character
	 * @param location
	 * @param building
	 * @return
	 * @throws AppException 
	 */
	public QueueBuilding upgrade(int characterId, int location) throws AppException {
		//取该位置的建筑
		Building building = getBuildingByLoation(characterId, location);
		if(building == null){
			logger.error("该位置没有建筑！");
			throw new AppException("该位置没有建筑！");
		}
		
		if(BuildCache.isBuildQueueFull(characterId, Const.BUILD_NUM)){
			logger.info("建筑队列已满");
			throw new AppException("建筑队列已满");
		}
		
		if(BuildCache.getBuilding(characterId, location) != null){
			logger.info("已经开始升级");
			throw new AppException("已经开始升级");
		}
		//获取要升级到的建筑实体
		String[] curbuilidngNoArray = building.getBuildingNo().split("_");
		String tarNo = curbuilidngNoArray[0]+"_"+(Integer.parseInt(curbuilidngNoArray[1])+1);
		StaticBuilding tarEntity = BuildingCache.getBuildingEntityByNo(tarNo);
		if(tarEntity == null){
			logger.info("已经升至顶级");
			throw new AppException("已经升至顶级");
		}
		//主城基本信息（需要建筑相关资源、主城等级）
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity city = maincityService.getMaincity(characterId);
		
		//验证资源
		if(city.getMoney() < tarEntity.getNeedMoney()){
			logger.info("铜币不足");
			throw new AppException("铜币不足");
		}
		if(city.getWood() < tarEntity.getNeedWood()){
			logger.info("木材不足");
			throw new AppException("木材不足");
		}
		if(city.getStone() < tarEntity.getNeedStone()){
			logger.info("石料不足");
			throw new AppException("石料不足");
		}
		if(city.getIronore() < tarEntity.getNeedIronore()){
			logger.info("铁矿不足");
			throw new AppException("铁矿不足");
		}
		StaticBuilding preEntity = BuildingCache.getBuildingEntityByNo(tarEntity.getPreBuilding());
		//再次检查前提建筑
		if(!checkPreCondition(characterId,preEntity)){
			logger.info("需要"+preEntity.getBuildingName()+preEntity.getLevel()+"级");
			throw new AppException("需要"+preEntity.getBuildingName()+preEntity.getLevel()+"级");
		}
		//城池等级约束
		if(!checkLevel(tarEntity.getLevel(), city)){
			logger.info("主城等级不足");
			throw new AppException("主城等级不足");
		}

		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		//升级消耗时间
		long time = BuildingAlgorithm.calculateBuildTime(characterId,interiorTech.getValueAfterEffect(InteriorTechEffectType.BUILDING_TIME, tarEntity.getUpgradeTime(), characterId));
		//建筑队列
		QueueBuilding queueBuilding = new QueueBuilding();
		queueBuilding.setCharacterId(characterId);
		queueBuilding.setLocation(location);
		queueBuilding.setStartTime(new Date());
		queueBuilding.setStatus(BuildingService.upgrade_status);
		queueBuilding.setCurrentBuildingNo(building.getBuildingNo());
		queueBuilding.setTargetBuildingNo(tarEntity.getBuildingNo());
		queueBuilding.setTime(time);
		//传递给JOB的数据
		Map<String,Object> data = new HashMap<String, Object>();
		data.put("queueBuilding", queueBuilding);
		//更新资源
		maincityService.updateBuildResource(characterId, city.getMoney()-tarEntity.getNeedMoney(), city.getWood()-tarEntity.getNeedWood(),
				city.getStone()-tarEntity.getNeedStone(), city.getIronore()-tarEntity.getNeedIronore());
		//更新服务器缓存
		BuildCache.setBuilding(queueBuilding,Const.BUILD_NUM);
		//插入DB建筑队列表
		buildQueueService.insertQueueBuilding(queueBuilding);
		//开启Job
		ExecuteJob.add(UpgradeJob.class, data, queueBuilding.getStartTime().getTime()+queueBuilding.getTime()*1000,characterId+"_build_"+location);
		UserComet userComet = (UserComet) ServiceLocator.getSpringBean("userComet");
		userComet.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, getBuildQueue(characterId));
		return queueBuilding;
	}
	
	/**
	 * 拆除建筑
	 * @param character
	 * @param location
	 * @param building
	 * @return
	 */
	public QueueBuilding demolition(int characterId, int location) throws AppException {
		// 取该位置的建筑
		Building building = getBuildingByLoation(characterId, location);
		if (building == null) {
			logger.error("该位置没有建筑！");
			throw new AppException("该位置没有建筑！");
		}
		//一级太尉府不可拆除
		if(Const.OFFICAIL_BUILDING_NO.equals(building.getBuildingNo())){
			logger.error("一级太尉府不可拆除");
			throw new AppException("一级太尉府不可拆除");
		}
		//一级城墙不可拆除
		if(Const.WALL_BUILDING_NO.equals(building.getBuildingNo())){
			logger.error("一级城墙不可拆除");
			throw new AppException("一级城墙不可拆除");
		}

		if (BuildCache.isBuildQueueFull(characterId, Const.BUILD_NUM)) {
			logger.info("建筑队列已满");
			throw new AppException("建筑队列已满");
		}

		if (BuildCache.getBuilding(characterId, location) != null) {
			logger.info("该建筑正在拆除中");
			throw new AppException("该建筑正在拆除中");
		}
		CellarService cellarService = (CellarService)ServiceLocator.getSpringBean("cellarService");
		//拆除地窖一级的时候，删保护数据
		if(building.getBuildingNo().equals("c0011_1")){
			cellarService.deleteCellar(characterId);
		}
		//当前建筑实体
		StaticBuilding curEntity = BuildingCache.getBuildingEntityByNo(building.getBuildingNo());
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		// 拆除消耗时间
		long time = BuildingAlgorithm.calculateDemolitionTime(characterId,interiorTech.getValueAfterEffect(InteriorTechEffectType.BUILDING_TIME, curEntity.getUpgradeTime(), characterId));
		// 建筑队列
		QueueBuilding queueBuilding = new QueueBuilding();
		queueBuilding.setCharacterId(characterId);
		queueBuilding.setLocation(location);
		queueBuilding.setStartTime(new Date());
		queueBuilding.setStatus(BuildingService.demolition_status);
		queueBuilding.setCurrentBuildingNo(building.getBuildingNo());
		//上一级建筑实体
		String[] curbuilidngNoArray = building.getBuildingNo().split("_");
		if(Integer.parseInt(curbuilidngNoArray[1])>1){//等于1时拆为空地，无上一级实体
			String tarNo = curbuilidngNoArray[0] + "_" + (Integer.parseInt(curbuilidngNoArray[1]) - 1);
			StaticBuilding tarEntity = BuildingCache.getBuildingEntityByNo(tarNo);
			queueBuilding.setTargetBuildingNo(tarEntity.getBuildingNo());
		}
		queueBuilding.setTime(time);
		// 传递给JOB的数据
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("queueBuilding", queueBuilding);
		// 更新服务器缓存
		BuildCache.setBuilding(queueBuilding, Const.BUILD_NUM);
		// 插入DB建筑队列表
		buildQueueService.insertQueueBuilding(queueBuilding);
		// 开启Job
		ExecuteJob.add(DemolitionJob.class, data, queueBuilding.getStartTime()
				.getTime() + queueBuilding.getTime() * 1000, characterId + "_build_"
				+ location);
		UserComet userComet = (UserComet) ServiceLocator.getSpringBean("userComet");
		userComet.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, getBuildQueue(characterId));
		return queueBuilding;
	}

	/**
	 * 取消建造、拆除,此处要考虑多线程同步问题
	 * @param character
	 * @param location
	 * @return 
	 * @throws AppException 
	 */
	public void cancel(int characterId, int location) throws AppException{
		//取消JOB
		boolean isExist = ExecuteJob.cancel(characterId+"_build_"+location);
		if(!isExist){
			logger.info("操作已经完成，无法取消");
			throw new AppException("操作已经完成，无法取消");
		}
		QueueBuilding queueBuilding = buildQueueService.getQueueBuilding(characterId, location);
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		//返回建造、升级资源
		if(BuildingService.build_status==queueBuilding.getStatus() 
				||BuildingService.upgrade_status==queueBuilding.getStatus()){
			
			StaticBuilding tarEntity = BuildingCache.getBuildingEntityByNo(queueBuilding.getTargetBuildingNo());
			long money = maincity.getMoney() + tarEntity.getNeedMoney();
			long wood = maincity.getWood() + tarEntity.getNeedWood();
			long stone = maincity.getStone() + tarEntity.getNeedStone();
			long ironore = maincity.getIronore() + tarEntity.getNeedIronore();
			if(money>maincity.getMoneyLimit()){
				money = maincity.getMoneyLimit();
			}
			if(wood>maincity.getWoodLimit()){
				wood = maincity.getWoodLimit();
			}
			if(stone>maincity.getStoneLimit()){
				stone = maincity.getStoneLimit();
			}
			if(ironore>maincity.getIronoreLimit()){
				ironore = maincity.getIronoreLimit();
			}
			maincityService.updateBuildResource(characterId, money, wood, stone, ironore);
		}
		//从建筑队列表中删除
		buildQueueService.deleteQueueBuilding(characterId, location);
		//从队列中删除
		BuildCache.removeBuilding(characterId, location);
		UserComet userComet = (UserComet) ServiceLocator.getSpringBean("userComet");
		userComet.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, getBuildQueue(characterId));
	}
	
	/**
	 * 检测前提建筑条件（非通用方法）
	 * @return
	 */
	private boolean checkPreCondition(int characterId,StaticBuilding entity){
		//null为不需要前提条件
		if(entity==null){
			return true;
		}
		int amount = buildingDao.getPreBuildingsAmount(characterId, entity.getBuildingNo().split("_")[0], entity.getLevel());
		return amount>0;
	}
	
	/**
	 * 验证建造的建筑个数
	 * @param characterId
	 * @param buildingId
	 * @param numLimit
	 * @return
	 */
	private boolean isBuilt(int characterId,String buildingNo,int numLimit){
		//建造编号前缀
		String buidlingNoPrefix = buildingNo.split("_")[0];
		//已经建造好的建筑数量(同一类)
		int buildingNum = buildingDao.getBuildingsAmountByPrefix(characterId, buidlingNoPrefix);
		//加上建造中的建筑数量(同一类)
		if(BuildCache.getBuilding(characterId)!=null){
			Iterator<QueueBuilding> it = BuildCache.getBuilding(characterId).values().iterator();
			while(it.hasNext()){
				if(it.next().getTargetBuildingNo().contains(buidlingNoPrefix)){
					buildingNum ++;
				}
			}
		}
		return buildingNum>=numLimit;
	}
	
	/**
	 * 升级时建筑物等级受城池等级约束
	 * true:可升级，false：不可升级
	 * @param tarLevel
	 * @param maincity
	 * @return
	 */
	private boolean checkLevel(int tarLevel,Maincity maincity){
		return tarLevel<=(maincity.getLevel()*2+1);
	}
	
	/**
	 * 增加一个建筑
	 * @param Building
	 */
	public void insertBuilding(Building building){
		buildingDao.insertBuilding(building);
	}
	
	/**
	 * 删除某个位置的建筑
	 * @param Building
	 */
	public void deleteBuildingByLocation(int characterId,int location){
		buildingDao.deleteBuildingByLocation(characterId, location);
	}
	
	/**
	 * 更新某个位置的建筑
	 * @param Building
	 */
	public void updateBuildingbyLocation(int characterId,int location,String buildingNo,int level){
		buildingDao.updateBuildingbyLocation(characterId, location, buildingNo, level);
	}
	
	/**
	 * 根据类型（前缀）获取建筑
	 * @param characterId
	 * @param prefix
	 * @return
	 */
	public List<Building>  getbBuildingByPrefix(int characterId,String prefix){
		return buildingDao.getbBuildingByPrefix(characterId,prefix);
	}
	
	public BuildQueueService getBuildQueueService() {
		return buildQueueService;
	}

	public void setBuildQueueService(BuildQueueService buildQueueService) {
		this.buildQueueService = buildQueueService;
	}

	public BuildingDao getBuildingDao() {
		return buildingDao;
	}

	public void setBuildingDao(BuildingDao buildingDao) {
		this.buildingDao = buildingDao;
	}
	/**
	 * 加速建筑升级
	 * @param location
	 * @param speedType
	 * @param itemNo
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException 
	 */
	public Object saveSpeedBuild(int characterId,int location, int speedType, String itemNo,int confim) throws AppException {
		Map<String, Object> retMap = null;
		QueueBuilding queueBuilding = BuildCache.getBuilding(characterId, location);
		if(queueBuilding == null){
			throw new AppException("建筑队列不存在,加速失败");
		}else if(!ExecuteJob.checkExists(characterId+"_build_"+location)){
			throw new AppException("建筑队列异常,加速失败");
		}
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		int RemainTime = (int)(BuildingAlgorithm.formatTime(queueBuilding))/1000;
		if(RemainTime <= 0){
			throw new AppException("建筑队列已经完成操作,无须加速");
		}else if(confim == 0){
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			retMap = userItemService.spendWindow(Const.SPEND_FUNCTION_CITY,characterId, RemainTime);
			retMap.put("RemainTime", RemainTime);//秒
			return retMap;
		}
		
		int speedTime = characterService.saveSpeedNow(speedType,Const.SPEND_FUNCTION_CITY, characterId, itemNo, RemainTime);
		if(speedTime == -1){//秒cd
			queueBuilding.setTime(0);
//			buildQueueService.updateQueueBuilding(queueBuilding);
			ExecuteJob.modifyTavernStart(characterId+"_build_"+location,0);
			speedTime = RemainTime;
		}else{
			queueBuilding.setTime(queueBuilding.getTime() - speedTime*1000);
			buildQueueService.updateQueueBuilding(queueBuilding);
			ExecuteJob.modifyTavernStart(characterId+"_build_"+location,queueBuilding.getStartTime().getTime() + queueBuilding.getTime());
		}
		retMap = new HashMap<String,Object>();
		retMap.put("speedTime", speedTime);
		retMap.put("location", location);
		retMap.put("remainTime", RemainTime-speedTime);
		retMap.put("state", "success");
//		//从队列中删除
//		BuildCache.removeBuilding(characterId, location);
		UserComet userComet = (UserComet) ServiceLocator.getSpringBean("userComet");
		userComet.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, getBuildQueue(characterId));
		return retMap;
	}
	
	public Object getBuildQueue(int characterId){
		Map<Integer,QueueBuilding> buildQueue = BuildCache.getBuilding(characterId);
		List<Map<String,Object>> buildQueueList = new ArrayList<Map<String,Object>>();
		if(buildQueue != null){
			Iterator<QueueBuilding> it = buildQueue.values().iterator();
			QueueBuilding qb;
			Map<String,Object> temp;
			StaticBuilding src;
			StaticBuilding dest;
			String name;
			while(it.hasNext()){
				qb = it.next();
				src = BuildingCache.getBuildingEntityByNo(qb.getCurrentBuildingNo());
				dest = BuildingCache.getBuildingEntityByNo(qb.getTargetBuildingNo());
				if(src != null){
					name = src.getBuildingName();
				}else if(dest != null){
					name = dest.getBuildingName();
				}else{
					name = null;
				}
				temp = new HashMap<String,Object>();
				temp.put("location", qb.getLocation());
				temp.put("name", name);
				temp.put("status", Const.getBuildingStatusDesc(qb.getStatus()));
				temp.put("srclevel", src == null?0:src.getLevel());
				temp.put("destlevel", dest == null?0:dest.getLevel());
				temp.put("time",BuildingAlgorithm.formatTime(qb));
				buildQueueList.add(temp);
			}
		}
		return buildQueueList;
	}
}

