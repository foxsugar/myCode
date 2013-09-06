package com.crystalcg.gamedev.buildingFunction.action;

import java.util.ArrayList;
import java.util.HashMap;
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
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensen;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensenQueue;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.BuildingAlgorithm;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.DefenceworksCache;
import com.crystalcg.gamedev.util.cache.domain.StaticDefenceworks;

@Controller
public class WallDefensenAction {
	
	private static Logger logger = LoggerFactory.getLogger(WallDefensenAction.class);
	private WallDefensenService walldefService;
	/**
	 * 获取城防工事
	 * 
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/getAllWallDefensen")
	@ResponseBody
	public Object getAllWallDefensen(HttpSession session) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		int characterId = character.getId();
		Map<String,Object> retMap = new HashMap<String, Object>();
		List<Object> retList = new ArrayList<Object>();
	    BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
    	List<Building> building = buildingService.getbBuildingByPrefix(characterId, Const.WALL_BUILDING_NO_PREFIX);
    	Building w = building.get(0);
	    int limit = BuildingAlgorithm.getWallDefenseLimit(w.getBuildingNo());//城墙工事上限
	    InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
	    retMap.put("limit", interiorTech.getValueAfterEffect(InteriorTechEffectType.CITY_DEFENCE_LIMIT, limit, characterId));
		List<UserWallDefensen> userWallDefensen =  walldefService.getAllWallDefensen(characterId);
     	List<StaticDefenceworks> defenceworksCache =  DefenceworksCache.getAlldefenceworks();
		for (StaticDefenceworks staticDefencenworks : defenceworksCache) {
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("entity", staticDefencenworks);
			map.put("num", 0);
			for (UserWallDefensen uwd : userWallDefensen) {
				if (staticDefencenworks.getDefenceworksNo().equals(uwd.getWallDefensenNo())) {
					map.put("num", uwd.getWallDefensenNum());
					break;
				}
			}
			retList.add(map);
		}
		retMap.put("retList", retList);		
		Map<String,Object> queuemap = new HashMap<String, Object>();
		Integer sum = walldefService.getSumWallDefensen(characterId);
		if(sum == null){
			sum = 0;
		}
		retMap.put("amount", sum);
		
		UserWallDefensenQueue uwdq = walldefService.getWallDefensenQueue(characterId);
		if(uwdq != null){
			StaticDefenceworks defencCache =  DefenceworksCache.getDefenceworks(uwdq.getNo());
			String  name = defencCache.getName();
			queuemap.put("name", name);
			int  time = (int) ((uwdq.getCompletetime().getTime()-System.currentTimeMillis())+999/1000);
			queuemap.put("time", time);
		}
		retMap.put("queue", queuemap);
		return retMap;
	}
	/**
	 * 取消建造队列
	 * @param session
	 * @param defenceworksNo
	 * @param num
	 * @return 
	 */
	@RequestMapping(value = "/removeWallDefensenQueues")
	@ResponseBody
	public Object removeWallDefensenQueue(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		int characterId = character.getId();
		try {
			Map<String,String> retMap = new HashMap<String,String>(); 
			walldefService.removeWallDefensenQueue(characterId);
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	/**
	 * 增加城防工事
	 * 
	 * @param session
	 * @param defenceworksNo
	 * @param num
	 */
	@RequestMapping(value = "/addWallDefenseNum")
	@ResponseBody
	public Object addWallDefense(HttpSession session, String defenceworksNo,int num) {
		
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		int characterId = character.getId();
		Map<String,Object> retMap = new HashMap<String, Object>();
		UserWallDefensenQueue userWallDefensenQueue = null;
		try {
			userWallDefensenQueue = walldefService.addWallDefense(characterId,defenceworksNo, num);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	    StaticDefenceworks staticDefenceworks = DefenceworksCache.getDefenceworks(userWallDefensenQueue.getNo());
		String defensenName = staticDefenceworks.getName();
		int  time = (int) (((userWallDefensenQueue.getCompletetime().getTime()-System.currentTimeMillis())+999)/1000);
	    
		retMap.put("name", defensenName);
		retMap.put("time", time);
		
		return retMap;
	}
	/**
	 * 获取城防武将
	 * 
	 * @param session
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value = "getAllWallHeros")
	@ResponseBody
	public Object getAllWallHero(HttpSession session) throws AppException {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		return walldefService.getWallHero(character.getId());
	}
	/**
	 *  计算武将战斗力
	 * @param session
	 * @param heroId
	 * @return
	 */
	@RequestMapping(value = "getHeroValue")
	@ResponseBody
	public Object getHeroValue(HttpSession session,String heroId){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		try {
			return walldefService.getHeroValue(character.getId(), heroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}

    /**
     * 更新城防武将
     * @param session
     * @param heroId
     * @return 
     */
	@RequestMapping(value = "updateWallHeros")
	@ResponseBody
	public Object updateWallHero(HttpSession session, String heroId,double wallCombat,String formationNo ) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		try {
			walldefService.saveWallHero(character.getId(), heroId,wallCombat,formationNo );
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	/**
	 * 加速城防工事
	 * @param session
	 * @param speedType 加速类型1：行军，2练兵,3建筑(具体可查看Const接口、SPEED_FUNCTION_*)
	 * @param itemNo 使用加速物品道具编号
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value = "/speedWallDefense")
	@ResponseBody
	public Object speedWallDefense(HttpSession session, int speedType, String itemNo,int confim) throws AppException {
		
		UserCharacter character = (UserCharacter) session	.getAttribute("character");
		if(character == null){
			logger.error("character = null");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
		return walldefService.saveSpeedWallDefense(character.getId(),speedType,itemNo,confim);
	}
	public void setWalldefService(WallDefensenService walldefService) {
		this.walldefService = walldefService;
	}

}
