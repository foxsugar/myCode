package com.crystalcg.gamedev.building.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.domain.QueueBuilding;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.cache.BuildCache;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.BuildingAlgorithm;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.CityCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

/**
 * 建筑物的建造、升级、拆除、取消操作
 * @author xuzhongxing
 */
@Controller
public class BuildingAction {
	
	/**
	 * service实例 spring注入
	 */
	private BuildingService buildingService;
	
	private static Logger logger = LoggerFactory.getLogger(BuildingAction.class);
	private static final String separator = "_";//建筑图片名分隔符
	
	/**
	 * 获取所有建筑和建筑队列
	 * @param session
	 */
	@RequestMapping(value="/getAllBuildings")
	@ResponseBody
	public Object getAllBuildings(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		
		List<Building> buildings = buildingService.getAllBuildingsByCharacterId(character.getId());
		//修改图片名，添加时代
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(character.getId());
		int age = CityCache.getAgeByLevel(maincity.getLevel());
		StringBuilder sb;
		for(Building b : buildings){
			sb = new StringBuilder(b.getView().getImg());
			sb.append(BuildingAction.separator);
			sb.append(age);
			b.getView().setImg(sb.toString());
		}
		
		Map<Integer,QueueBuilding> buildQueue = BuildCache.getBuilding(character.getId());
		if(buildQueue != null){
			List<Map<String,Object>> buildQueueList = new ArrayList<Map<String,Object>>();
			Iterator<QueueBuilding> it = buildQueue.values().iterator();
			QueueBuilding qb;
			Map<String,Object> temp;
			while(it.hasNext()){
				qb = it.next();
				temp = new HashMap<String,Object>();
				temp.put("location", qb.getLocation());
				temp.put("status", Const.getBuildingStatusDesc(qb.getStatus()));
				buildQueueList.add(temp);
			}
			retMap.put("buildQueue", buildQueueList);
		}else{
			retMap.put("buildQueue", null);
		}
		retMap.put("buildings", buildings);
		logger.info("获取所有建筑和建筑队列");
		return retMap;
	}
	
	/**
	 * 获取建筑队列（按起始时间排序放到客户端）
	 * @param session
	 */
	@RequestMapping(value="/getBuildQueue")
	@ResponseBody
	public Object getBuildQueue(HttpSession session) throws Exception{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		Map<Integer,QueueBuilding> buildQueue = BuildCache.getBuilding(character.getId());
		Map<String,List<Map<String,Object>>> retMap = new HashMap<String, List<Map<String,Object>>>();
		if(buildQueue == null){
			retMap.put("buildQueue", null);
			return retMap;
		}
		List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
		QueueBuilding queueBuilding;
		Map<String,Object> temp;
		Iterator<Integer> it = buildQueue.keySet().iterator();
		long time;
		while(it.hasNext()){
			queueBuilding = buildQueue.get(it.next());
			temp = new HashMap<String,Object>();
			StaticBuilding curEntity = BuildingCache.getBuildingEntityByNo(queueBuilding.getCurrentBuildingNo());
			StaticBuilding tarEntity = BuildingCache.getBuildingEntityByNo(queueBuilding.getTargetBuildingNo());
			temp.put("name", tarEntity.getBuildingName());
			temp.put("status",Const.getBuildingStatusDesc(queueBuilding.getStatus()));
			temp.put("curLevel", curEntity.getLevel());
			temp.put("tarLevel", tarEntity.getLevel());
			time = queueBuilding.getStartTime().getTime()+queueBuilding.getTime();
			temp.put("time", time);
			retList.add(temp);
		}
		retMap.put("buildQueue", retList);
		return retMap;
	}
	
	/**
	 * 获取建造树
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value="/getBuildingTree")
	@ResponseBody
	public Object getBuildingTree(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		List<Building> buildings = buildingService.getAllBuildingsByCharacterId(character.getId());
		List<StaticBuilding> builingTree = BuildingCache.getBuildingTree();
		List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String,Object> retMap;
		int num;//这种类型的建筑个数
		boolean isCanBuild;//是否满足前提条件
		Building b;
		String prefix;
		String prefix1;
		int level1;
		String prefix2;
		int level2;
		String[] tempStr;
		for(int i=0;i<builingTree.size();i++){
			//初始建筑树种的建筑
			StaticBuilding be = builingTree.get(i);
			//初始化判断条件
			num = 0;
			isCanBuild = false;
			//没有前置建筑，（即城墙）
			if(be.getPreBuilding() == null){
				logger.error(be.getBuildingNo()+"没有前置建筑");
				continue;
			}
			prefix = be.getBuildingNo().split(BuildingAction.separator)[0];
			//前置建筑
			tempStr = be.getPreBuilding().split(BuildingAction.separator);
			prefix1 = tempStr[0];
			level1 = Integer.parseInt(tempStr[1]);
			for(int j=0;j<buildings.size();j++){
				//已经建造好的建筑
				b = buildings.get(j);
				tempStr = b.getBuildingNo().split(BuildingAction.separator);
				prefix2 = tempStr[0];
				level2 = Integer.parseInt(tempStr[1]);
				if(prefix2.equals(prefix1)){
					if(level2 >= level1){
						isCanBuild = true;
					}
				}
				if(prefix.equals(prefix2)){
					num++;
				}
			}
			retMap = new HashMap<String,Object>();
			retMap.put("image",be.getImage());
			retMap.put("isFull",num>=be.getLimitAmount());//是否已经建满，建筑数量大于等于限制数量
			retMap.put("isCanBuild",isCanBuild);//是否可建造，满足前置建筑
			retMap.put("buildingName",be.getBuildingName());
			retMap.put("desc",be.getBuildingDesc());
			retMap.put("buildingNo",be.getBuildingNo());
			retList.add(retMap);
		}
		logger.info("获取建造树: size="+retList.size());
		return retList;
	}  
	
	/**
	 * 建造
	 * @param name 建筑物名字
	 * @param buildingId buildingNo
	 * @param location 在城池中的位置
	 * @param session 
	 * @return
	 */
	@RequestMapping(value = "/build")
	@ResponseBody
	public Object build(String buildingNo,int location,HttpSession session) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		QueueBuilding queueBuilding = null;
		try {
			queueBuilding = buildingService.build(character.getId(),location,buildingNo);
		} catch (AppException e) {
			logger.error("建造出错: "+e.getMessage());
			return new ClientError(e.getMessage());
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("location", queueBuilding.getLocation());
		retMap.put("remainedTime", BuildingAlgorithm.formatTime(queueBuilding));
		retMap.put("buildingQueue", this.getBuildingList(session));
		logger.info("位置 "+location + " 建造返回");
		return retMap;
	}
	
	/**
	 * 升级
	 * @param location 建筑物在城池中的位置
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/upgrade")
	@ResponseBody
	public Object upgrade (int location,HttpSession session) {
		logger.info("升级参数：location="+location);
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character == null)");
			return new ClientError("获取不到角色信息，请重新登录");
		}
		QueueBuilding queueBuilding = null;
		try{
			queueBuilding = buildingService.upgrade(character.getId(), location);
		}catch(AppException e){
			return new ClientError(e.getMessage());
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("location", queueBuilding.getLocation());
		retMap.put("remainedTime", BuildingAlgorithm.formatTime(queueBuilding));
		retMap.put("buildingQueue", this.getBuildingList(session));
		return retMap;
	}
	
	/**
	 * 拆除
	 * @param location 建筑物在城池中的位置
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/demolition")
	@ResponseBody
	public Object demolition (int location,HttpSession session) {
		logger.info("拆除参数: location="+location);
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录");
		}
		QueueBuilding queueBuilding = null;
		try {
			queueBuilding = buildingService.demolition(character.getId(),location);
			logger.info("拆除 "+location);
		} catch (AppException e) {
			logger.info(location + "拆除异常： "+e.getMessage());
			return new ClientError(e.getMessage());
		}
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("location", queueBuilding.getLocation());
		retMap.put("remainedTime", BuildingAlgorithm.formatTime(queueBuilding));
		retMap.put("buildingQueue", this.getBuildingList(session));
		return retMap;
	}
	
	/**
	 * 取消
	 * @param location 建筑物在城池中的位置
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/cancel")
	@ResponseBody
	public Object cancel (int location,HttpSession session) {
		logger.info("取消：location="+location);
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录");
		}
		try {
			buildingService.cancel(character.getId(), location);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return null;
	}
	
	/**
	 * 建造、升级、拆除动作，向服务器请求建造状态，或建筑状态
	 * @param session
	 * @param location
	 */
	@RequestMapping(value="/getBuilding")
	@ResponseBody
	public Object getBuilding(HttpSession session,int location) throws Exception{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		int characterId = character.getId();
		
		QueueBuilding queueBuilding = BuildCache.getBuilding(characterId, location);
		Map<String,Object> retMap = new HashMap<String, Object>();
		int key;
		if(queueBuilding == null){
			Building building = buildingService.getBuildingByLoation(characterId, location);
			if(building == null){
				key = 1;
				retMap.put("location", location);
				retMap.put("value", null);
			}else{
				key = 3;
				MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
				Maincity maincity = maincityService.getMaincity(character.getId());
				int age = CityCache.getAgeByLevel(maincity.getLevel());
				StringBuilder sb;
				sb = new StringBuilder(building.getView().getImg());
				sb.append(BuildingAction.separator);
				sb.append(age);
				building.getView().setImg(sb.toString());
				retMap.put("value", building);
			}
		}else{
			key = 2;
			Map<String,Object> tempMap = new HashMap<String, Object>();
			tempMap.put("location", queueBuilding.getLocation());
			tempMap.put("remainedTime", BuildingAlgorithm.formatTime(queueBuilding));
			retMap.put("value", tempMap);
		}
		retMap.put("key", key);
		return retMap;
	}
	
	/**
	 * 获取建筑队列
	 * @param session
	 * @return
	 */
	@RequestMapping(value="getBuildingList")
	@ResponseBody
	public Object getBuildingList(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		return buildingService.getBuildQueue(character.getId());
	}
	/**
	 * 升级
	 * @param location 建筑物在城池中的位置
	 * @param session
	 * @param speedType 加速类型1：行军，2练兵,3建筑(具体可查看Const接口、SPEED_FUNCTION_*)
	 * @param itemNo 使用加速物品道具编号
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="speedBuild")
	@ResponseBody
	public Object speedBuild(int location,HttpSession session,int speedType,String itemNo,int confim) throws AppException {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		return buildingService.saveSpeedBuild(character.getId(),location,speedType,itemNo,confim);
	}

	public BuildingService getBuildingService() {
		return buildingService;
	}

	public void setBuildingService(BuildingService buildingService) {
		this.buildingService = buildingService;
	}

}
