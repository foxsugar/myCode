package com.crystalcg.gamedev.buildingFunction.service;

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
import com.crystalcg.gamedev.buildingFunction.dao.CellarDao;
import com.crystalcg.gamedev.buildingFunction.domain.UserCellar;
import com.crystalcg.gamedev.buildingFunction.job.CellarProtectJob;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.BuildingAlgorithm;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

/**
 * 地窖
 * @author xuzhongxing
 */
public class CellarService {
	
	private static Logger logger = LoggerFactory.getLogger(CellarService.class);
	private CellarDao cellarDao;
	/**
	 * 初始化地窖界面
	 * @throws AppException 
	 */
	public Map<String,Object> initCellar(int characterId) throws AppException{
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CELLAR_BUILDING_NO_PREFIX);
		if(list.size() == 0){
			throw new AppException("请先建造地窖");
		}
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		long limit = interiorTech.getValueAfterEffect(InteriorTechEffectType.CELLAR_LIMIT,maincity.getCellarLimit(), characterId);
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("curMoney", maincity.getMoney());
		retMap.put("curFood", maincity.getFood());
		retMap.put("curWood", maincity.getWood());
		retMap.put("curStone", maincity.getStone());
		retMap.put("curIronore", maincity.getIronore());
		retMap.put("limit",limit);
		retMap.put("timeLimit", Const.CELLAR_LAST_TIME);
		Date startTime = maincity.getCellarStartTime();
		int time = maincity.getCellarLastTime()*3600*1000;
		long remainedTime = 0;
		if(startTime!=null){
			remainedTime = startTime.getTime()+time - System.currentTimeMillis();
		}
		if(remainedTime<0){
			remainedTime = 0;
		}
		retMap.put("remainedTime", remainedTime);
		return retMap;
	}
   /**
    * 修改的初始化地窖
    * @param characterId
 * @return 
    * @throws AppException
    */
	public List<Object> initCellars(int characterId) throws AppException{
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CELLAR_BUILDING_NO_PREFIX);
		if(list.size() == 0){
			throw new AppException("请先建造地窖");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		List<Object> retList = new ArrayList<Object>();
		String cellarNo ="";
//		public static final int CELLAR_PROTECTION_WOOD=1;//木材
//		public static final int CELLAR_PROTECTION_FOOD=2;//粮食
//		public static final int CELLAR_PROTECTION_STONE=3;//石料
//		public static final int CELLAR_PROTECTION_IRONORE=4;//铁矿
//		public static final int CELLAR_PROTECTION_MONEY=5;//铜币
		for(Building cellar : list){
			cellarNo = cellar.getBuildingNo();
		}
		InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		StaticBuilding staticBuilding = BuildingCache.getBuildingEntityByNo(cellarNo);
		long limit = interiorTechService.getValueAfterEffect(InteriorTechEffectType.CELLAR_LIMIT, (int)staticBuilding.getFunctionvalue1(), characterId);//保护上限
		List<UserCellar> cellarList = cellarDao.getAllCellarProtection(characterId);//地窖保护的材料
		if(cellarList.size()!=5){
			cellarDao.deleteUserCellar(characterId);//删除垃圾数据
			Date date = new Date();
			UserCellar userCellar1 = new UserCellar();
			userCellar1.setCharacterId(characterId);
			userCellar1.setProtectionNo(1);
			userCellar1.setProtectionTime(date);
			UserCellar userCellar2 = new UserCellar();
			userCellar2.setCharacterId(characterId);
			userCellar2.setProtectionNo(2);
			userCellar2.setProtectionTime(date);
			UserCellar userCellar3 = new UserCellar();
			userCellar3.setCharacterId(characterId);
			userCellar3.setProtectionNo(3);
			userCellar3.setProtectionTime(date);
			UserCellar userCellar4 = new UserCellar();
			userCellar4.setCharacterId(characterId);
			userCellar4.setProtectionNo(4);
			userCellar4.setProtectionTime(date);
			UserCellar userCellar5 = new UserCellar();
			userCellar5.setCharacterId(characterId);
			userCellar5.setProtectionNo(5);
			userCellar5.setProtectionTime(date);
			List<UserCellar> userCellar = new ArrayList<UserCellar>();
			userCellar.add(userCellar2);
			userCellar.add(userCellar1);
			userCellar.add(userCellar3);
			userCellar.add(userCellar4);
			userCellar.add(userCellar5);
			cellarDao.insertUserCellar(userCellar);
		}
		List<UserCellar> userCellarlist = cellarDao.getAllCellarProtection(characterId);//地窖保护的材料
		for(UserCellar cellar : userCellarlist ){
			Map<String,Object> retMap = new HashMap<String, Object>();
			switch(cellar.getProtectionNo()){
			case 1 : retMap.put("resourceNum", maincity.getWood());
			            retMap.put("protectionNo", cellar.getProtectionNo());
			            if( cellar.getProtectionTime().getTime()-System.currentTimeMillis()<0){
			            	retMap.put("protectionTime",0);
			            }else{
			            	retMap.put("protectionTime", cellar.getProtectionTime().getTime()-System.currentTimeMillis());
			            }
			            break;
			case 2 : retMap.put("resourceNum", maincity.getFood());
			            retMap.put("protectionNo", cellar.getProtectionNo());
		             	if( cellar.getProtectionTime().getTime()-System.currentTimeMillis()<0){
			            	retMap.put("protectionTime",0);
			            }else{
			            	retMap.put("protectionTime", cellar.getProtectionTime().getTime()-System.currentTimeMillis());
			            }
			            break;
			case 3 : retMap.put("resourceNum", maincity.getStone());
			            retMap.put("protectionNo", cellar.getProtectionNo());
		            	if( cellar.getProtectionTime().getTime()-System.currentTimeMillis()<0){
			            	retMap.put("protectionTime",0);
			            }else{
			            	retMap.put("protectionTime", cellar.getProtectionTime().getTime()-System.currentTimeMillis());
			            }
                        break;
			case 4 : retMap.put("resourceNum", maincity.getIronore());
			          retMap.put("protectionNo", cellar.getProtectionNo());
			            if( cellar.getProtectionTime().getTime()-System.currentTimeMillis()<0){
			            	retMap.put("protectionTime",0);
			            }else{
			            	retMap.put("protectionTime", cellar.getProtectionTime().getTime()-System.currentTimeMillis());
			            }
			            break;
			case 5 : retMap.put("resourceNum", maincity.getMoney());
		            	retMap.put("protectionNo", cellar.getProtectionNo());
		            	if( cellar.getProtectionTime().getTime()-System.currentTimeMillis()<0){
			            	retMap.put("protectionTime",0);
			            }else{
			            	retMap.put("protectionTime", cellar.getProtectionTime().getTime()-System.currentTimeMillis());
			            }
                        break;
			}
			retList.add(retMap);
		}
		retList.add(limit);
		return retList;
	}
	/**
	 * 修改后的开启保护
	 * @param characterId
	 * @param ProtectionNo
	 * @throws AppException
	 */
	public Map<String, Object> beginCellarProtects(int characterId,int protectionNo) throws AppException{
		Map<String ,Object> retMap = new HashMap<String,Object>();
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CELLAR_BUILDING_NO_PREFIX);
		if(list.size() == 0){
			throw new AppException("请先建造地窖");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		String cellarNo ="";
		for(Building cellar : list){
			cellarNo = cellar.getBuildingNo();
		}
//		InteriorTechService interiorTechService = (InteriorTechService)ServiceLocator.getSpringBean("interiorTechService");
		StaticBuilding staticBuilding = BuildingCache.getBuildingEntityByNo(cellarNo);
		long limit = interiorTechService.getValueAfterEffect(InteriorTechEffectType.CELLAR_LIMIT,(int)staticBuilding.getFunctionvalue1(), characterId);
		long protectionNum=0;
		switch(protectionNo){
		case 1 : if(maincity.getWood()-limit<0){
			          protectionNum=maincity.getWood(); 
		              }
		            break;
	    case 2 :  if(maincity.getFood()-limit<0){
	    	          protectionNum=maincity.getFood();
                      }
	                 break;
	    case 3:  if(maincity.getStone()-limit<0){
	    			  protectionNum=maincity.getStone();; 
                       }
	                 break;
	    case 4:  if(maincity.getIronore()-limit<0){
	    	          protectionNum=maincity.getIronore();
                      }
	                  break;
	    case 5 :  if(maincity.getMoney()-limit<0){
	    	          protectionNum=maincity.getMoney();
                     }
	                  break;
		}
		long needMoney = BuildingAlgorithm.cellarProtectMony(limit, Const.CELLAR_LAST_TIME);
		//是否有足够铜币
		if(needMoney>maincity.getMoney()){
			throw new AppException("没有足够的铜币"); 
		}
		maincityService.addMoney(characterId,-needMoney);
		
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("characterId", characterId);
		data.put("protectionNo", protectionNo);
		Date start = new Date();
		Date date = new Date(start.getTime()+10*60*1000);//Const.CELLAR_LAST_TIME*3600*1000
		if(protectionNum!=0){
			cellarDao.updateUserCellar(characterId, protectionNo,(int)protectionNum, date);
		}else{
			cellarDao.updateUserCellar(characterId, protectionNo,(int)limit, date);
		}
		ExecuteJob.add(CellarProtectJob.class, data, start.getTime()+10*60*1000, characterId+"_cellarProtect_"+protectionNo);
		retMap.put("protectionTime",10*60*1000);
		retMap.put("protectionNo", protectionNo);
		return retMap;
	}
	/**
	 * 开启保护
	 * @throws AppException 
	 */
//	public void beginCellarProtect(int characterId,int time,int money,int food,int wood,int stone,int ironore) throws AppException{
//		if(time<=0 || time>Const.CELLAR_LAST_TIME){
//			throw new AppException("保护时间为0~"+Const.CELLAR_LAST_TIME+"小时");
//		}
//		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
//		Maincity maincity = maincityService.getMaincity(characterId);
//		//非负
//		if(money<0){
//			throw new AppException("受保护铜币不能为负数"); 
//		}
//		if(food<0){
//			throw new AppException("受保护粮食不能为负数"); 
//		}
//		if(wood<0){
//			throw new AppException("受保护木材不能为负数"); 
//		}
//		if(stone<0){
//			throw new AppException("受保护石料不能为负数"); 
//		}
//		if(ironore<0){
//			throw new AppException("受保护铁矿不能为负数"); 
//		}
//		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
//		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CELLAR_BUILDING_NO_PREFIX);
//		if(list.size() == 0){
//			throw new AppException("请先建造地窖");
//		}
//		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
//				.getSpringBean("interiorTechService");
//
//		long limit = interiorTech.getValueAfterEffect(InteriorTechEffectType.CELLAR_LIMIT, maincity.getCellarLimit(), characterId);
//		//小于上限
//		if(money>limit){
//			throw new AppException("受保护铜币超出上限"); 
//		}
//		if(food>limit){
//			throw new AppException("受保护粮食超出上限"); 
//		}
//		if(wood>limit){
//			throw new AppException("受保护木材超出上限"); 
//		}
//		if(stone>limit){
//			throw new AppException("受保护石料超出上限"); 
//		}
//		if(ironore>limit){
//			throw new AppException("受保护铁矿超出上限"); 
//		}
//		long needMoney = BuildingAlgorithm.cellarProtectMony(money+food+wood+stone+ironore, time);
//		//是否有足够铜币
//		if(needMoney>maincity.getMoney()){
//			throw new AppException("没有足够的铜币"); 
//		}
//		maincityService.updateMoney(characterId, maincity.getMoney() - needMoney);
//		Date start = new Date();
//	    maincityService.beginCellarProtect(characterId, start, time, money, food, wood, stone, ironore	);
//		
//		Map<String,Object> data = new HashMap<String,Object>();
//		data.put("characterId", characterId);
//		ExecuteJob.add(CellarProtectJob.class, data, start.getTime()+time*3600*1000, characterId+"_cellarProtect");
//	}
	/**
	 * 修改后的取消保护
	 * @param characterId
	 * @param protectionNo
	 * @throws AppException
	 */
	public void cancelCellarProtects(int characterId,int protectionNo) throws AppException{
		UserCellar userCellar = cellarDao.getUserCellar(characterId, protectionNo);
		if(userCellar.getProtectionTime().getTime()-System.currentTimeMillis()<0 || userCellar.getProtectionAmount()==0){
			throw new AppException("没有开启保护"); 
		}
		if(ExecuteJob.cancel(characterId+"_cellarProtect_"+protectionNo)){
			logger.error(characterId+"_cellarProtect job 不存在");
		}
		int protectionAmount = 0;
		Date date = new Date();
		cellarDao.updateUserCellar(characterId, protectionNo, protectionAmount,date);
		
	}
	/**
	 * 取消保护
	 * @throws AppException 
	 */
//	public void cancelCellarProtect(int characterId) throws AppException{
//		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
//		Maincity maincity = maincityService.getMaincity(characterId);
//		if(maincity.getCellarStartTime() == null || maincity.getCellarLastTime() == 0){
//			throw new AppException("没有开启保护"); 
//		}
//		if(ExecuteJob.cancel(characterId+"_cellarProtect")){
//			logger.error(characterId+"_cellarProtect job 不存在");
//		}
//		maincityService.cancelCellarProtect(characterId);
//	}
	public void updataCellar(int characterId,int protectionNo){
		BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
		List<Building> list = buildingService.getbBuildingByPrefix(characterId, Const.CELLAR_BUILDING_NO_PREFIX);
		String cellarNo ="";
		for(Building cellar : list){
			cellarNo = cellar.getBuildingNo();
		}
//		StaticBuilding staticBuilding = BuildingCache.getBuildingEntityByNo(cellarNo);
		Date date = new Date();
		cellarDao.updateUserCellar(characterId, protectionNo, 0, date);
	}
	/**
	 * 回调刷新
	 * @param characterId
	 * @param protectionNo
	 * @return
	 */
	public Map<String, Object> getCellarProtect(int characterId,int protectionNo){
		Map<String,Object> retMap = new HashMap<String,Object>();
		
		UserCellar userCellar = cellarDao.getUserCellar(characterId, protectionNo);
//		long d= userCellar.getProtectionTime().getTime()-System.currentTimeMillis();
		if( userCellar.getProtectionTime().getTime()-System.currentTimeMillis()<0){
        	retMap.put("protectionTime",0);
        }else{
        	retMap.put("protectionTime", userCellar.getProtectionTime().getTime()-System.currentTimeMillis());
        }
		retMap.put("protectionNo", protectionNo);
    	return retMap;
	}
	/**
	 * 查询君主地窖的所有保护资源列表
	 * @param characterId
	 * @return
	 */
	public List<UserCellar> getCellarProtectList(int characterId) {
		return cellarDao.getAllCellarProtection(characterId);
	}
	/////////////////////
	public void deleteCellar(int characterId){
		cellarDao.deleteUserCellar(characterId);
	}
	
	public CellarDao getCellarDao() {
		return cellarDao;
	}
	public void setCellarDao(CellarDao cellarDao) {
		this.cellarDao = cellarDao;
	}
}
