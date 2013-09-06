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
import com.crystalcg.gamedev.buildingFunction.dao.WallDefensenDao;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensen;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensenQueue;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallHero;
import com.crystalcg.gamedev.buildingFunction.job.WallDefensenJob;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.BuildingAlgorithm;
import com.crystalcg.gamedev.util.ChangeHeroToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.TimeUtil;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.DefenceworksCache;
import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;
import com.crystalcg.gamedev.util.cache.domain.StaticDefenceworks;
import com.crystalcg.gamedev.util.cache.domain.StaticFormationTech;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;

public class WallDefensenService {
	
	private static Logger logger = LoggerFactory.getLogger(BuildingService.class);
     private WallDefensenDao walldefDao;
    private static final String WALL_DEFENSEN = "walldefensen";
     
     /**
      * 获取城防工事
      * @param characterId
      * @return
      */
     public List<UserWallDefensen> getAllWallDefensen(int characterId){
    	 return walldefDao.getAllWallDefensen(characterId);
    	 
     }
     /**
      * 获取队列信息
      * @param characterId
      * @return
      */
     public UserWallDefensenQueue getWallDefensenQueue(int characterId){
    	 return walldefDao.getWallDefensenQueue(characterId);
     }
     
     public Integer getSumWallDefensen(int characterId){
 		return walldefDao.getSumWallDefensen(characterId);
 	}

	/**
     * 增加工事
     * @param characterId
     * @param defenceworksNo
     * @param num
	 * @throws AppException 
     */
     public UserWallDefensenQueue  addWallDefense(int characterId,String defenceworksNo,int num) throws AppException{
    	 String isUpdate = "0";//判断死否有该城防工事
    	 Integer  sum = walldefDao.getSumWallDefensen(characterId);   //获取城防工事总数量
    	 if(sum == null){
    		 sum = 0;
    	 }
    	 Integer amount = walldefDao.getWallDefensenNum(characterId, defenceworksNo);//获取单个城防工事数量
    	 if(amount == null){		
 		  amount = 0;
    	 }
    	  StaticDefenceworks staticDefenceworks = DefenceworksCache.getDefenceworks(defenceworksNo);//获取城防工事
    	   
    	  MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
    	  Maincity city = maincityService.getMaincity(characterId);
    	  
    	  BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
    	  List<Building> building = buildingService.getbBuildingByPrefix(characterId, Const.WALL_BUILDING_NO_PREFIX);
    	  Building w = building.get(0);
    	  long limit = BuildingAlgorithm.getWallDefenseLimit(w.getBuildingNo());//城墙工事上限
    	  InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
  				.getSpringBean("interiorTechService");
    	  limit = interiorTech.getValueAfterEffect(InteriorTechEffectType.CITY_DEFENCE_LIMIT, limit, characterId);
    	  if(staticDefenceworks == null){
    			logger.info("编号错误");
    			throw new AppException("编号错误");
    		}
    	  if(num<=0){
    		  logger.info("数量非法");
  			   throw new AppException("数量非法");
    	  } 
    	  //是否有城防工事正在建造
    		if(getWallDefensenQueue(characterId) != null){
    	 	  logger.info("建筑队列已满");
    			throw new AppException("建筑队列已满");
    		}
    	  //判断增加数量 是否大于 （上限 - 已有数量）
    	 if(num + sum>limit){
    		   throw new AppException("建造数量过大");
    	 }
  
		 //验证资源是否够用
    	 long money = city.getMoney();
    	 long wood = city.getWood() - staticDefenceworks.getNeedWood()*num;
    	 long stone = city.getStone() - staticDefenceworks.getNeedStone()*num;
    	 long ironore = city.getIronore() - staticDefenceworks.getNeedIronore()*num;
    	 
     	 if(wood < 0){
     		 throw new AppException("木材不足");
     	 }
   	     if(stone < 0){
    		 throw new AppException("石料不足");
   	      }
   	     if(ironore < 0){
   	    	 throw new AppException("铁矿不足");
       	  } 
    	 //减去使用的资源
    	 maincityService.updateBuildResource(characterId,  money, wood, stone, ironore);
    	 //队列实体类
    	UserWallDefensenQueue walldefenqueue = new UserWallDefensenQueue();
    	walldefenqueue.setCharacterId(characterId);
    	
    	List<String> wallDefensenNo = walldefDao.getWallDefensenNo(characterId);
    	for(String wfdNo : wallDefensenNo){
    		if(defenceworksNo.equals(wfdNo)){
    			isUpdate = "1";
    			break;
    		}
    	}	
        long d= System.currentTimeMillis()+(staticDefenceworks.getProduceTime()*1000)*num;
        Date date = new Date(d);  
       walldefenqueue.setCompletetime(date);
       walldefenqueue.setNo(defenceworksNo);
       walldefenqueue.setNum(num);
    	 //插入建造队列表
    	Map<String,Object> data = new HashMap<String, Object>();
		data.put("walldefenqueue", walldefenqueue);
	    data.put("isUpdate", isUpdate);
    	walldefDao.insertQueueWallDefens(walldefenqueue);
    	//开启job
    	ExecuteJob.add(WallDefensenJob.class, data, d,characterId + WallDefensenService.WALL_DEFENSEN);
    	 //返回正在建造信息
    	return walldefenqueue;
     }
	/**
      * 更新城防工事
      * @param userWallDefensen
      */
     public void updateWallDefensen(UserWallDefensen userWallDefensen){
    	 walldefDao.updateWallDefensen(userWallDefensen);
     }
     /**
      * 插入城防工事
      * @param userWallDefensen
      */
     public void insertWallDefensen(UserWallDefensen userWallDefensen){
    	 walldefDao.insertWallDefensen(userWallDefensen);
 	}
   /**
    * 获取城防将领
    * @param characterId
    * @return
    * @throws AppException 
    */
//     public Object getAllWallHero(int characterId) throws AppException{
//       List<UserWallHero> listuswh =  new ArrayList<UserWallHero>(); 
//  	   List<UserWallHero> list =  walldefDao.getAllWallHero(characterId);
//  	   String stingList = "aaa,aaa" ;
//  	   String[] aa = stingList.split(",");
//  	   for()
//
//  	   UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
//  	   
//  	     for(UserWallHero uw : list){
//  	    	UserWallHero uwh = new UserWallHero(); 
//  	    	
//  	    	 if(uw.getHeroId() == 0){
//  	    		 uwh.setOrderId(uw.getOrderId());
//  	    		 
//  	    		 listuswh.add(uwh);
//  	    	 }
//  	    	 if(uw.getHeroId() != 0){
//  	    		UserHero hero = userHeroService.getUserHero(characterId, uw.getHeroId()); 
//  	  	    	HeroAlgorithm.computeAttribute(hero);
//  	  	    	uwh.setToolTipInfo(ChangeHeroToToolTip.change(hero));
//  	  	        uwh.setHeroId(uw.getHeroId());//将领ID
//  	  	        uwh.setOrderId(uw.getOrderId());// 将领次序
//  	  	        uwh.setHeroName(hero.getHeroName());// 名字
//  	  	        
//  	  	        StaticSoldier ss = SoldierCache.getSoldierByNo(hero.getSoldierNo());
//  	  	        
////  	  	        uwh.setSoldierNo(hero.getSoldierNo());//兵种编号
//  	  	        if(ss==null){
//  	  	            uwh.setSoldierName("无");//兵种名称
//  	  	        }else{
//  	  	        	uwh.setSoldierName(ss.getSoldierName());//兵种名称
//  	  	        	uwh.setSoldierAttack(ss.getSoldierAttack());
//  	  	        	uwh.setSoldierDefence(ss.getSoldierDefence());
//  	  	        }  
//  	  	        uwh.setLevel( hero.getLevel());//将领等级
//       	        int ee = (int) Math.floor(hero.getStamina()/hero.getStaminaMax()*100);
//  	  	        uwh.setHealth((int)Math.floor(hero.getStamina()/hero.getStaminaMax()*100));//健康度
//  	  	        uwh.setSoldierAmount(hero.getSoldierAmount());//士兵总量
//  	  	        
//  	  	      if(hero.getHeroStatus()==Const.HERO_STATUS_FREE){
//  		        	uwh.setHeroStatus("空闲");
//  		        }
//  		        if(hero.getHeroStatus()==Const.HERO_STATUS_FIGHTING){
//  		        	uwh.setHeroStatus("出征");
//  		        }
//  		        if(hero.getHeroStatus()==Const.HERO_STATUS_AFFAIR){
//  		        	uwh.setHeroStatus("修炼");// 修炼状态
//  		        }  
//  	  	       listuswh.add(uwh);
//  	    	 }
//  	     }
//  	   return listuswh;   
//     }
   public Map<String, Object> getWallHero(int characterId) throws AppException{
	   UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
	   BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
	   Map<String,Object> retMap = new HashMap<String,Object>();
	   UserWallHero wallHero = walldefDao.getWallHero(characterId);
	   List<Map<String,Object>> heroList = new ArrayList<Map<String,Object>>();
	   if(wallHero==null){
		   
	   }else{
		   String hero = wallHero.getHeroId();
		   String[] heroId = hero.split(",");
		   for(String wallhero : heroId){
			   if(wallhero.isEmpty()){
			   }else{
				   Map<String,Object> heroMap = new HashMap<String, Object>();
				   UserHero userHero = userHeroService.getUserHero(characterId,Integer.parseInt(wallhero)); 
				   if(userHero!=null){
					   HeroAlgorithm.computeAttribute(userHero);
					   StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(userHero.getSoldierNo());
					   heroMap.put("heroId", userHero.getId());
					   heroMap.put("heroName", userHero.getHeroName());
					   heroMap.put("heroLevel", userHero.getLevel());
					   heroMap.put("soldierAmount", userHero.getSoldierAmount());
					   heroMap.put("heroHealth", (int)Math.floor(userHero.getStamina()/userHero.getStaminaMax()*100));
					   heroMap.put("ToolTipInfo", ChangeHeroToToolTip.change(userHero));
					   if(staticSoldier!=null){
						   heroMap.put("soldierName", staticSoldier.getSoldierName());
//						   heroMap.put("soldierAttack", staticSoldier.getSoldierAttack());
//						   heroMap.put("soldierDefence", staticSoldier.getSoldierDefence());
					   }	 
					   switch(userHero.getHeroStatus()){
					   case Const.HERO_STATUS_FREE : heroMap.put("heroStatus", "空闲");
					   case Const.HERO_STATUS_FIGHTING : heroMap.put("heroStatus", "出征");
					   case Const.HERO_STATUS_AFFAIR : heroMap.put("heroStatus", "修炼");
					   }
					   heroList.add(heroMap);
				   }
			}
		   }	   
		   retMap.put("wallCombat", wallHero.getWallCombat());
		   if(!wallHero.getFormationNo().isEmpty()){
			   StaticFormationTech staticFormationTech = FormationCache.getFormationTechByNo(wallHero.getFormationNo());
			   if(staticFormationTech!=null){
				   retMap.put("formationName", staticFormationTech.getTechName());
				   retMap.put("smallIcon",staticFormationTech.getTechIcon());
				   retMap.put("FormationNo", wallHero.getFormationNo());
			   }
		   }
	   }
	   List<Building> building = buildingService.getbBuildingByPrefix(characterId, Const.WALL_BUILDING_NO_PREFIX);
	   StaticBuilding staticBuilding = null;
	   for(Building b:building){
		   staticBuilding = BuildingCache.getBuildingEntityByNo(b.getBuildingNo());
	   }
	   retMap.put("defensen", staticBuilding.getFunctionvalue1());
	   retMap.put("heroList", heroList);
	  return retMap;
   }
  /**
   * 计算城防战力
   * @param characterId
   * @param hero
 * @return 
   * @throws AppException
   */
   public double getHeroValue(int characterId ,String hero) throws AppException {
	   UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
	   List<UserHero> userHeroList = new ArrayList<UserHero>();
//	   double value=0;
	   String[] heroId = hero.split(",");
	   for(String uh : heroId){
		   if(!uh.isEmpty()){ 
			   UserHero userHero = userHeroService.getUserHero(characterId,Integer.parseInt(uh)); 
			   HeroAlgorithm.computeAttribute(userHero);
			   if(userHero!=null){
				   userHeroList.add(userHero);
			   }
		   }
	   }
	   return HeroAlgorithm.computeFightingCapacity(userHeroList);
   }
   
    /**
     * 更新守城将领
     * @param characterId
     * @param heroId
     */
//	public void updateWallHeros(int characterId,int[] heroId){
//		
//		 List<UserWallHero> userWallHero = new ArrayList<UserWallHero>();
//    	 for(int i = 0;i<heroId.length;i++){
//    		 UserWallHero wh = new UserWallHero();
//    		 wh.setCharacterId(characterId);
//    		 wh.setHeroId(heroId[i]);
//    		 wh.setOrderId(i+1);
//    		 userWallHero.add(wh);
//    	 }
// 			 walldefDao.insertWallHeros(userWallHero); 
//    }
	
	/**
	 * 修改城防保存武将
	 * @param characterId
	 * @param heroId
	 * @throws AppException 
	 */
	public void saveWallHero(int characterId,String heroId,double  wallCombat,String formationNo ) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserWallHero WallHero = walldefDao.getWallHero(characterId);
		UserWallHero userWallHero = new UserWallHero();
		String[] hero = heroId.split(",");
		for(String uh :hero){
			 if(!uh.isEmpty()){
				   UserHero userHero = userHeroService.getUserHero(characterId,Integer.parseInt(uh)); 
			       if(userHero==null){
			    	   throw new AppException("你没有该武将");
			       }
			       if(userHero.getSoldierNo()==null&&userHero.getSoldierAmount()==0){
			    	   throw new AppException(userHero.getHeroName()+"没有选择配兵");
			       }
			   }
		}
		userWallHero.setCharacterId(characterId);
		userWallHero.setHeroId(heroId);
		userWallHero.setFormationNo(formationNo);
		userWallHero.setWallCombat(wallCombat);
		if(WallHero==null){
			walldefDao.saveWallHero(userWallHero);
		}else{
			walldefDao.updateWallHero(userWallHero);
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.CONFIG_WALL_DEFENCE_HERO, null, characterId);
	}
	/**
	 *取消建造对列
	 * @param characterId
	 * @throws AppException 
	 */
	public void removeWallDefensenQueue(int characterId) throws AppException{
		//取消JOB
				boolean isExist = ExecuteJob.cancel(characterId+WallDefensenService.WALL_DEFENSEN);
				if(!isExist){
					logger.info("操作已经完成，无法取消");
					throw new AppException("操作已经完成，无法取消");
				}
				UserWallDefensenQueue UserWallDefensenQueue = walldefDao.getWallDefensenQueue(characterId);
				 int num = UserWallDefensenQueue.getNum();
			   StaticDefenceworks staticDefenceworks = DefenceworksCache.getDefenceworks(UserWallDefensenQueue.getNo());
			   MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		       Maincity city = maincityService.getMaincity(characterId);
		       long money = city.getMoney();
		       long wood = city.getWood() +staticDefenceworks.getNeedWood()*num;
		       long stone = city.getStone() +staticDefenceworks.getNeedStone()*num;
		       long ironore = city.getIronore() + staticDefenceworks.getNeedIronore()*num;
		    	if(money>city.getMoneyLimit()){
					money = city.getMoneyLimit();
				}
				if(wood>city.getWoodLimit()){
					wood = city.getWoodLimit();
				}
				if(stone>city.getStoneLimit()){
					stone = city.getStoneLimit();
				}
				if(ironore>city.getIronoreLimit()){
					ironore = city.getIronoreLimit();
				}
			   walldefDao.deleteWallDefensenQueue(characterId);
		       maincityService.updateBuildResource(characterId,  money, wood, stone, ironore);
		
	}
	public Integer getWallDefensenAmount(int characterId){
			return walldefDao.getSumWallDefensen(characterId);
	}

    /**
     * 删除队列
     * @param characterId
     */
     public void deleteWallDefensenQueue(int characterId){
    	 walldefDao.deleteWallDefensenQueue(characterId);
     }
     /**
      * 加速城防
      * @param characterId
      * @param speedType 加速类型1：行军，2练兵,3建筑(具体可查看Const接口、SPEED_FUNCTION_*)
      * @param itemNo 使用加速物品道具编号
	  * @param confim 操作类型（0：普通弹框，1：确定加速等）
      * @return
      * @throws AppException 
      */
 	public Object saveSpeedWallDefense(int characterId, int speedType, String itemNo,int confim) throws AppException {
 		Map<String, Object> retMap = null;
 		UserWallDefensenQueue wallDefensenQueue = this.getWallDefensenQueue(characterId);
 		if(wallDefensenQueue == null){
 			throw new AppException("没有正在建设的城防工事,不需要加速");
 		}else if(!ExecuteJob.checkExists(characterId + WallDefensenService.WALL_DEFENSEN)){
 			throw new AppException("城防工事队列异常,加速失败");
 		}
 		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
 		int remainSecond = (int) ((wallDefensenQueue.getCompletetime().getTime() - new Date().getTime()+999)/1000);
 		if(remainSecond <= 0){
 			throw new AppException("城防工事队列升级完成,无须加速");
 		}else  if(confim == 0){
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			retMap = userItemService.spendWindow(Const.SPEND_FUNCTION_CITY, characterId, remainSecond);
			retMap.put("RemainTime", remainSecond);//秒
			return retMap;
		}
 		int speedTime = characterService.saveSpeedNow(speedType,Const.SPEND_FUNCTION_CITY, characterId, itemNo, remainSecond);
 		if(speedTime == -1){//秒cd
 			ExecuteJob.modifyTavernStart(characterId + WallDefensenService.WALL_DEFENSEN, -500);
 			speedTime = remainSecond;
 		}else{
 			wallDefensenQueue.setCompletetime(TimeUtil.add(-speedTime, wallDefensenQueue.getCompletetime()));
 			walldefDao.updateQueueWallDefens(wallDefensenQueue);
 			ExecuteJob.modifyTavernStart(characterId + WallDefensenService.WALL_DEFENSEN, -500);
 		}
 		retMap = new HashMap<String,Object>();
		retMap.put("speedTime", speedTime);//时间（秒）
		retMap.put("remainTime", remainSecond-speedTime);
		retMap.put("state", "success");
		return retMap;
	}
 	/**
 	 * 获得基本城防数据
 	 * @param characterId
 	 * @return
 	 */
    public UserWallHero getBaseWallHero(int characterId){
    	return walldefDao.getWallHero(characterId);
    }
	public void setWalldefDao(WallDefensenDao walldefDao) {
		this.walldefDao = walldefDao;
	}
     
}
