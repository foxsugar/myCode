package com.crystalcg.gamedev.buildingFunction.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.buildingFunction.dao.PrivycouncilDao;
import com.crystalcg.gamedev.buildingFunction.domain.AffairQueue;
import com.crystalcg.gamedev.buildingFunction.job.PrivycouncilJob;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.util.ChangeHeroToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.AffairBonusCache;
import com.crystalcg.gamedev.util.cache.HeroLevelCache;
import com.crystalcg.gamedev.util.cache.domain.StaticAffairBonus;

/**
 * 军机处
 * @author xuzhongxing
 *
 */
public class PrivycouncilService {
	
	private PrivycouncilDao privycouncilDao;
	
	/**
	 * 初始化军机处界面
	 * @throws AppException 
	 */
	public Map<String,Object> initPrivycouncil(int characterId) throws AppException{
		//获取内政策略
		Collection<StaticAffairBonus> affairList = AffairBonusCache.getAllAffair();
		List<Map<String,Object>> affairView = new ArrayList<Map<String,Object>>();
		Map<String,Object> temp;
		for(StaticAffairBonus ae : affairList){
			temp = new HashMap<String, Object>();
			temp.put("affairNo", ae.getAffairNo());
			temp.put("affairName", ae.getAffairName());
			temp.put("affairdesc", ae.getAffairdesc());
			affairView.add(temp);
		}
		//获取武将信息
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> heroList = userHeroService.getAllUserHero(characterId);
		List<Map<String,Object>> heroView = new ArrayList<Map<String,Object>>();
		Map<String,Object> temp1;
		for(UserHero uh : heroList){
			temp1 = new HashMap<String,Object>();
			temp1.put("id", uh.getId());
			temp1.put("toolTipInfo", ChangeHeroToToolTip.change(uh));
			temp1.put("exp", uh.getExp()*100/HeroLevelCache.getExpLimit(uh.getLevel())+"%");
			String statusDesc = getDesc(uh.getHeroStatus());
			String eventDesc = "无";
			StaticAffairBonus ae;
			int time = 0;
			long remainedTime = 0;
			if(uh.getHeroStatus() == Const.HERO_STATUS_AFFAIR){
				AffairQueue aq = privycouncilDao.getAffairQueue(characterId,uh.getId());
				ae = AffairBonusCache.getAffairByNo(aq.getAffairNo());
				time = aq.getLastTime();
				remainedTime = aq.getStartTime().getTime() + time*1000 - System.currentTimeMillis();
				eventDesc = ae.getAffairName();
			}
			temp1.put("status", statusDesc);
			temp1.put("event", eventDesc);
			temp1.put("time", time);
			temp1.put("remainedTime", remainedTime);
			heroView.add(temp1);
		}
		
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("affair", affairView);
		retMap.put("hero", heroView);
		return retMap;
	}
	
	/**
	 * characterId 确保不会查询他人武将
	 * 查询任务进展状态 
	 */
	public Map<String,Object> getMissionStatus(int characterId,int userHeroId){
		Map<String,Object> retMap = new HashMap<String,Object>();
		//获取武将信息
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero uh = userHeroService.getUserHero(characterId, userHeroId);
		if(uh.getHeroStatus() != Const.HERO_STATUS_AFFAIR){
			retMap.put("error", "武将没有执行内政策略");
			return retMap;
		}
		AffairQueue aq = privycouncilDao.getAffairQueue(characterId, userHeroId);
		if(aq == null){
			retMap.put("error", "错误的武将状态，武将没有执行内政策略");
			return retMap;
		}else{
			StaticAffairBonus ae = AffairBonusCache.getAffairByNo(aq.getAffairNo());
			retMap.put("desc",ae.getDescription());
			return retMap;
		}
	}
	
	/**
	 * 开始任务
	 * @param characterId
	 * @param userHeroId
	 * @param affairNo
	 * @param hours
	 * @return
	 */
	public Map<String,Object> beginMission(int characterId,int[] userHeroId,String affairNo,int hours){
		Map<String,Object> status = null;
		for(int id:userHeroId){
			status = beginSingleMission(characterId, id, affairNo, hours);
			if(status==null){
				continue;
			}
			if(status.containsKey("error")){
				break;
			}
		}
		return status;
	}
	/**
	 * 开始任务,设置武将状态为修炼，同时向内政任务表中插入一条数据
	 */
	private Map<String,Object> beginSingleMission(int characterId,int userHeroId,String affairNo,int hours){
		Map<String,Object> retMap = new HashMap<String,Object>();
		//验证时间合法性
		if(hours<0 || hours>Const.AFFAIR_TIME_LIMIT){
			retMap.put("error", "执行时间为 0~"+Const.AFFAIR_TIME_LIMIT+"小时");
			return retMap;
		}
		//验证策略是否存在
		StaticAffairBonus ae = AffairBonusCache.getAffairByNo(affairNo);
		if(ae == null){
			retMap.put("error", "选择的内政策略不存在");
			return retMap;
		}
		//验证武将是否空闲,等前提条件
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero uh = userHeroService.getUserHero(characterId, userHeroId);
		if(uh == null){
			retMap.put("error", "选择的武将不存在");
			return retMap;
		}
		if(uh.getHeroStatus()== Const.HERO_STATUS_FIGHTING){
			retMap.put("error",uh.getHeroName()+"正在出征");
			return retMap;
		}
//		if(uh.getHeroStatus() == Const.HERO_STATUS_AFFAIR){
//			retMap.put("error",uh.getHeroName()+"正在执行内政策略");
//			return retMap;
//		}
		if(uh.getHeroStatus() == Const.HERO_STATUS_AFFAIR){
			return null;
		}else{
			//验证成功，修改武将状态
			uh.setHeroStatus(Const.HERO_STATUS_AFFAIR);
			userHeroService.updateHeroStatus(uh);
			//插入队列
			privycouncilDao.insertAffairQueue(characterId, userHeroId, affairNo, hours);
			//开启Job,job内为一系列可扩展方法
			Map<String,Object> data = new HashMap<String,Object>();
			data.put("characterId", characterId);
			data.put("userHeroId", userHeroId);
			data.put("affairNo", affairNo);
			//hours暂时按秒处理，便于测试
			ExecuteJob.add(PrivycouncilJob.class, data, System.currentTimeMillis()+hours*1000, characterId+"_affair_"+userHeroId);
			retMap.put("status","success");
			return retMap;
		}
	}
	
	/**
	 * 停止任务
	 * @param characterId
	 * @param userHeroId
	 * @return
	 */
	public Map<String,Object> endMission(int characterId,int[] userHeroId){
		Map<String,Object> status = null;
		for(int id:userHeroId){
			status = endSingleMission(characterId, id);
		}
		return status;
	}
	
	/**
	 * 停止任务,改变武将状态，增加经验等，删除任务表数据
	 */
	private Map<String,Object> endSingleMission(int characterId,int userHeroId){
		Map<String,Object> retMap = new HashMap<String,Object>();
		//验证武将是否空闲,等前提条件
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero uh = userHeroService.getUserHero(characterId, userHeroId);
		if(uh == null){
			retMap.put("error", "选择的武将不存在");
			return retMap;
		}
		if(uh.getHeroStatus() != Const.HERO_STATUS_AFFAIR){
			retMap.put("error",uh.getHeroName()+"没有执行内政策略");
			return retMap;
		}
		//设置武将状态为空闲
		uh.setHeroStatus(Const.HERO_STATUS_FREE);
		userHeroService.updateHeroStatus(uh);
		//从队列表删除
		privycouncilDao.deleteAffairQueue(characterId, userHeroId);
		//结束job
		ExecuteJob.cancel(characterId+"_affair_"+userHeroId);
		retMap.put("status","success");
		return retMap;
	}
	
	/**
	 * 完成任务,改变武将状态，增加经验、物品、武将等，删除任务表数据
	 */
//	void completeMission(){
		//job执行，非用户触发
		//如果用户在线，推送到客户端 
//	}
	
	/**
	 * 执行结束，删除队列
	 * @param characterId
	 * @param userHeroId
	 */
	public void delete(int characterId,int userHeroId){
		privycouncilDao.deleteAffairQueue(characterId, userHeroId);
	}
	
	private String getDesc(int status){
		switch(status){
		case Const.HERO_STATUS_FREE:
			return "空闲";
		case Const.HERO_STATUS_FIGHTING:
			return "出征";
		case Const.HERO_STATUS_AFFAIR:
			return "修炼";
		default:
			return "未知";
		}
	}
	
	public PrivycouncilDao getPrivycouncilDao() {
		return privycouncilDao;
	}

	public void setPrivycouncilDao(PrivycouncilDao privycouncilDao) {
		this.privycouncilDao = privycouncilDao;
	}
}
