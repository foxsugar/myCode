package com.crystalcg.gamedev.alliance.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.alliance.Job.UpgradeAllianceTechnologyJob;
import com.crystalcg.gamedev.alliance.dao.AllianceWelfareDao;
import com.crystalcg.gamedev.alliance.domain.Alliance;
import com.crystalcg.gamedev.alliance.domain.AllianceBarrack;
import com.crystalcg.gamedev.alliance.domain.AllianceContribute;
import com.crystalcg.gamedev.alliance.domain.AllianceReceive;
import com.crystalcg.gamedev.alliance.domain.AllianceSalary;
import com.crystalcg.gamedev.alliance.domain.AllianceSite;
import com.crystalcg.gamedev.alliance.domain.AllianceTechnology;
import com.crystalcg.gamedev.alliance.domain.AllianceTechnologyQueue;
import com.crystalcg.gamedev.buildingFunction.domain.UserSoldier;
import com.crystalcg.gamedev.buildingFunction.service.BarracksService;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.AllianceBuildingCache;
import com.crystalcg.gamedev.util.cache.AllianceGradeCache;
import com.crystalcg.gamedev.util.cache.AlliancePositionCache;
import com.crystalcg.gamedev.util.cache.AlliancePrivilegeCache;
import com.crystalcg.gamedev.util.cache.AllianceSalaryCache;
import com.crystalcg.gamedev.util.cache.AllianceShopingCache;
import com.crystalcg.gamedev.util.cache.EquipmentCache;
import com.crystalcg.gamedev.util.cache.ItemCache;
import com.crystalcg.gamedev.util.cache.MaterialCache;
import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.domain.StaticAllianceBuilding;
import com.crystalcg.gamedev.util.cache.domain.StaticAllianceGrade;
import com.crystalcg.gamedev.util.cache.domain.StaticAlliancePosition;
import com.crystalcg.gamedev.util.cache.domain.StaticAlliancePrivilege;
import com.crystalcg.gamedev.util.cache.domain.StaticAllianceSalary;
import com.crystalcg.gamedev.util.cache.domain.StaticAllianceShoping;
import com.crystalcg.gamedev.util.cache.domain.StaticEquipment;
import com.crystalcg.gamedev.util.cache.domain.StaticItem;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;

public class AllianceWelfareService {
    private AllianceWelfareDao allianceWelfareDao;
    private static final int MAX_ALLIANCE_AMOUNT= 10;//每页返回最大数
    private static final int ALLIANCE_SOLIER_AMOUNT=9;//每页返回联盟士兵最大数;
    private static final int ALLIANCE_CONTRIBUTE_AMOUNT=8;
    private static final String  ALLIANCE_TECHNOLOGY = "AllianceTechnology";
/**
 * 捐献资源
 * @return 
 * @throws AppException 
 */
    public Map<String, Object> donatedResources( int characterId,int money,int food,int wood,int stone,int ironore,int cash) throws AppException{
      	Map<String,Object> retMap = new HashMap<String, Object>();
    	int moneyAmount=0;
    	int cashAmount=0;
    	int foodAmount=0;
    	int woodAmount=0;
    	int stoneAmount=0;
    	int ironoreAmount=0;  	
    	int num = 0;
    	if(money+food+wood+stone+ironore+cash==0){
    		throw new AppException("请输入捐献的数量");
    	}
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId); 
    	MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
  	    Maincity city = maincityService.getMaincity(characterId);
  	    AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
  	    AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
  	    int allianceId = userCharacter.getAllianceId();
    	int oldcash = userCharacter.getCash();
    	long oldmoney = city.getMoney();
    	long oldfood = city.getFood();
    	long oldwood = city.getWood();
    	long oldstone = city.getStone();
    	long oldironore = city.getIronore();
    	if (oldcash<cash){
    		retMap.put("cash", "你的金锭不足");
    		throw new AppException("你的金锭不足");
    	}else{
    		oldcash = oldcash - cash;
    		 cashAmount = cash;
    		 num++;
    	}
    	if(oldmoney<money){
    		throw new AppException("你的铜币不足");
    		
    	}else{
    		oldmoney = oldmoney - money;
    		moneyAmount = money;
    		num++;
    	}
    	if(oldfood<food){
    		throw new AppException("你的粮食不足");
    	}else{
    		oldfood = oldfood - food;
    		foodAmount = food;
    		num++;
    	}
    	if(oldwood<wood){
    		throw new AppException("你的木材不足");
    	}else{
    		oldwood = oldwood - wood;
    		woodAmount =  wood;
    		num++;
    	}
    	if(oldstone<stone){
    		throw new AppException("你的石料不足");
    	}else{
    		oldstone = oldstone - stone;
    		stoneAmount = stone;
    		num++;
    	}
    	if(oldironore<ironore){
    		throw new AppException("你的铁矿不足");
    	}else{
    		oldironore = oldironore - ironore;
    		ironoreAmount = ironore;
    		num++;
    	}
    	if(num==6){
    		retMap.put("success", "Success");
    	}
    	int wealth = (int) Math.floor((double)ironoreAmount/640+(double)stoneAmount/840+(double)woodAmount/1000+(double)foodAmount/800+(double)moneyAmount/1500+cashAmount);
//    	int wealth = amount/10000+cashAmount*10;//捐献10000获得1财富值+1金锭*10财富
    	updateAllianceContribute(characterId,allianceId,wealth);//更新捐献表
    	allianceService.updateAllianceWealth(allianceId, wealth);//更新联盟财富
    	allianceMemberService.updateAllianceMemberWealth(allianceId, characterId, wealth);//更新君主联盟财富
    	characterService.updateCash(characterId, oldcash);//更新金锭
    	maincityService.updateFood(characterId,oldfood);//更新粮食
    	maincityService.updateBuildResource(characterId, oldmoney, oldwood, oldstone, oldironore);//更新建筑资源
    	//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.USE_ALLIANCE_DONATE, null, characterId);
		return retMap;
    }
    /**
     * 初始化联盟财富
     * @param characterId
     * @return
     * @throws AppException
     */
    public List<Object> initAllianceWealth(int characterId) throws AppException{
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
    	Alliance alliance = allianceService.getAllianceById(userCharacter.getAllianceId());
    	if(alliance==null){
    		throw new AppException("你没有加入任何联盟");
    	}
    	Map<String,Object> wealth = new HashMap<String,Object>();
    	List<Object> retList = new ArrayList<Object>();
    	List<Map<String,Object>> technologyWealth = new ArrayList<Map<String,Object>>();
    	List<Map<String,Object>> activitieWelfare = new ArrayList<Map<String,Object>>();
    	Integer memberWealth = allianceMemberService.getAllianceMemberWealth(alliance.getId(), characterId);//成员财富
    	if(memberWealth==null){
    		memberWealth=0;
    	}
    	int allianceWealth = alliance.getWealth();//联盟财富
    	wealth.put("memberWealth", memberWealth);
    	wealth.put("allianceWealth", allianceWealth);
//    	Map<String,Object> technologyWealthMap = getAllianceWelfare(characterId);//科技福利
//    	Map<String,Object> activitieWelfareMap = grantSalary(characterId);//活动福利
    	activitieWelfare.add(grantSalary(characterId));
    	technologyWealth.add(getAllianceTechnologyWelfare((alliance.getId()),"gb0001"));
    	technologyWealth.add(getAllianceTechnologyWelfare((alliance.getId()),"gb0002"));
    	retList.add(activitieWelfare);
    	retList.add(technologyWealth);
    	retList.add(wealth);
    	return retList;
    }
    /**
     * 分页返回财富排行榜
     * @param characterId
     * @param page
     * @return
     */
    public Map<String, Object> getAllAianceContribute(int characterId , int page){
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId); 
    	int allianceId = userCharacter.getAllianceId();
    	if(page<1){
    		page = 1;
    	}
    	Map<String, Object> retMap = new HashMap<String,Object>();
    	int amount = allianceWelfareDao.getAllianceContributeAmount(allianceId);
    	int pages = (amount-1+ALLIANCE_CONTRIBUTE_AMOUNT)/ALLIANCE_CONTRIBUTE_AMOUNT;
    	if(page>pages){
    		page = pages;
    	}
//    	List <AllianceContribute> allianceContribute;
    	if(page==0){
    		  retMap.put("allianceContribute", null);
    	}else{
    		List <AllianceContribute> allianceContribute = allianceWelfareDao.getAllAianceContribute(allianceId,(page-1)*ALLIANCE_CONTRIBUTE_AMOUNT , ALLIANCE_CONTRIBUTE_AMOUNT);
    		    Map<String, Object> contributeMap = null;
    		    List<Object> retlist = new ArrayList<Object>();
    		for(AllianceContribute e : allianceContribute){
                 contributeMap = new HashMap<String,Object>();
    			String characterName = characterService.getCharacterName(e.getCharacterId());
    			contributeMap.put("characterName",characterName);//君主名字
    			contributeMap.put("contributeAmount", e.getContributeAmount());
    		  	Calendar c1 = new GregorianCalendar();
    			Calendar c2 = new GregorianCalendar();
    			c1.setTime(e.getCompleteTime());
    			c2.setTime(new Date());
    			int oldDate = c1.get(Calendar.DAY_OF_YEAR);
    			int newDate = c2.get(Calendar.DAY_OF_YEAR);
    			if(oldDate!=newDate){
    			    contributeMap.put("todayAmount", 0);
    			}else{
    				contributeMap.put("todayAmount", e.getTodayAmount());
    			}
    			retlist.add(contributeMap);
    		}
    		retMap.put("retlist",retlist );
    	}
    	retMap.put("page", page);
		retMap.put("pages", pages);
	    return retMap;
    }
    /**
     * 联盟兵营（联盟兵营按钮）
     * @param characterId
     * @return
     * @throws AppException
     */
    public Map<String, Object> getAllianceBarrack(int characterId) throws AppException{
    	Map<String,Object> retMap = new HashMap<String,Object>();
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId); 
    	int allianceId = userCharacter.getAllianceId();//君主的联盟Id；
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
    	Alliance alliance = allianceService.getAllianceById(allianceId);
    	if(alliance==null){
    		throw new AppException("你没有加入任何联盟");
    	}
    	Integer memberWealth = allianceMemberService.getAllianceMemberWealth(alliance.getId(), characterId);//成员财富
    	if(memberWealth==null){
    		memberWealth=0;
    	}
//    	List<AllianceBarrack> allianceBarrack = allianceWelfareDao.getAllianceBarrack(allianceId);//联盟兵营
    	
 	   String privilegeNo="ga0017";//提取设置的特权编号
 	   String position = userCharacter.getAlliancePosition();//君主联盟职位
 	   StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
 	   StaticAlliancePrivilege staticAlliancePrivilege =AlliancePrivilegeCache.getStaticAlliancePrivilege(privilegeNo);//获取特权表
 	   
 	   if(staticAlliancePosition.getAuthoLevel()>=staticAlliancePrivilege.getNeedLevel()||position.equals("of0005")){//是否是战争官，或大于战争官的权限
 		   retMap.put("isLight", true);
 	   }else{
 		   retMap.put("isLight", false);
 	   }
    	StaticAllianceGrade staticAllianceGrade = AllianceGradeCache.getStaticAllianceGrade(alliance.getLevel());
    	
    	retMap.put("allianceBarrack", getAllianceBarrackBySoldier(allianceId,"s0001",1));//刀兵
    	AllianceReceive allianceReceive = allianceWelfareDao.getAllianceReceive(allianceId, characterId);//提取的士兵
    	if(allianceReceive==null){
    		retMap.put("receiveNum" ,0);
    	}else{
    		retMap.put("receiveNum" ,allianceReceive.getReceiveNumber());//今天提取的士兵数量
    	}
    	if(allianceWelfareDao.getAllianceSolierAmount(allianceId)==null){
    		retMap.put("solierAmount",0 );//现有士兵数量
    	}else{
    		retMap.put("solierAmount",allianceWelfareDao.getAllianceSolierAmount(allianceId));
    	}
    	AllianceSite allianceSite =allianceWelfareDao.getAllianceSite(allianceId, position);//设置表的信息
    	if(allianceSite!=null){
    		retMap.put("receiveLimit",  allianceSite.getSoldierAmount());
    	}else{
    		retMap.put("receiveLimit", 50);
    	}
    	retMap.put("userSoldier", getUserCharacterBarrack(characterId));//君主士兵
        retMap.put("memberWealth", memberWealth);//成员财富
    	retMap.put("barrackLimit", staticAllianceGrade.getBarrackLimit());//兵营上限
    	
    	return retMap;
    }
    /**
     * 君主兵营士兵
     * @param characterId
     * @return
     */
    public List<Map<String,Object>> getUserCharacterBarrack(int characterId){
    	Map<String, Object> retMap = null;
    	List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	BarracksService barracksService = (BarracksService) ServiceLocator.getSpringBean("barracksService");
    	List<UserSoldier> userSoldier = barracksService.getUserSoldier(characterId);
    	for(UserSoldier us : userSoldier){
    		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(us.getSoldierNo());
    		 retMap = new HashMap<String,Object>();
    		 retMap.put("userSoldierName", staticSoldier.getSoldierName());
    		 retMap.put("userSoldierNo", us.getSoldierNo());
    		 if(us.getSoldierAmount()!=0){
    			 retMap.put("userSoldierAmount", us.getSoldierAmount());
    		 }
    		 retList.add(retMap);
    	}
        return retList;
    }
    public Map<String, Object> getAllianceBarrackBySoldierNo(int characterId,String soldierNo,int page) throws AppException{
    	Map<String, Object> retMap = new HashMap<String,Object>();
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId); 
    	int allianceId = userCharacter.getAllianceId();//君主的联盟Id；
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
    	Alliance alliance = allianceService.getAllianceById(allianceId);
    	Integer memberWealth = allianceMemberService.getAllianceMemberWealth(alliance.getId(), characterId);//成员财富
    	if(memberWealth==null){
    		memberWealth=0;
    	}
    	AllianceReceive allianceReceive = allianceWelfareDao.getAllianceReceive(allianceId, characterId);//提取的士兵
    	if(allianceReceive==null){
    		retMap.put("receiveNum" ,0);
    	}else{
    		retMap.put("receiveNum" ,allianceReceive.getReceiveNumber());//今天提取的士兵数量
    	}
    	if(allianceWelfareDao.getAllianceSolierAmount(allianceId)==null){
    		retMap.put("solierAmount",0 );//现有士兵数量
    	}else{
    		retMap.put("solierAmount",allianceWelfareDao.getAllianceSolierAmount(allianceId));
    	}
    	AllianceSite allianceSite =allianceWelfareDao.getAllianceSite(allianceId, userCharacter.getAlliancePosition());//设置表的信息
    	if(allianceSite!=null){
    		retMap.put("receiveLimit",  allianceSite.getSoldierAmount());
    	}else{
    		retMap.put("receiveLimit", 50);
    	}
    	retMap.put("memberWealth", memberWealth);//成员财富
    	retMap.put("allianceBarrack", getAllianceBarrackBySoldier(allianceId,soldierNo,page));
    	return retMap;
    }
    /**
     * 根据兵种编号前缀返回兵种
     * @param allianceId 
     * @param soldierNo
     * @return
     * @throws AppException 
     */
    public List<Map<String,Object>> getAllianceBarrackBySoldier(int allianceId,String soldierNo,int page) throws AppException{
    	if(page<1){
    		page = 1;
    	}
    	Map<String, Object> retMap = new HashMap<String,Object>();
    	List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
    	int amount = allianceWelfareDao.getAllianceSolierCount(allianceId,soldierNo);
    	int pages = (amount-1+ALLIANCE_SOLIER_AMOUNT)/ALLIANCE_SOLIER_AMOUNT;
    	if(page>pages){
    		page = pages;
    	}
    	if(page==0){
    		retList = new ArrayList<Map<String,Object>>();
    	}else{
    		List<AllianceBarrack> allianceBarrack = allianceWelfareDao.getAllianceBarrackBySoldierNo(allianceId,soldierNo,(page-1)*ALLIANCE_SOLIER_AMOUNT,ALLIANCE_SOLIER_AMOUNT);
    		for(AllianceBarrack ab : allianceBarrack){
        		Map<String,Object> allainceBarrack = new HashMap<String,Object>();
        		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(ab.getSoldierNo());
        		allainceBarrack.put("soldierName", staticSoldier.getSoldierName());//兵种名称
        		allainceBarrack.put("soldierNo", ab.getSoldierNo());
        		double wealth =((double)staticSoldier.getNeedFood()/1000+(double)staticSoldier.getNeedIronore()/640+(double)staticSoldier.getNeedMoney()/1500)*1.2;
        		double wealth1 = ((double)staticSoldier.getNeedFood()/1000+(double)staticSoldier.getNeedIronore()/640+(double)staticSoldier.getNeedMoney()/1500)*0.8;
        		double wealth2 = (double)staticSoldier.getNeedFood()/1000+(double)staticSoldier.getNeedIronore()/640+(double)staticSoldier.getNeedMoney()/1500;
        		allainceBarrack.put("extractNeedWealth", wealth);//提取时每个兵需要的财富
        		allainceBarrack.put("donatedNeedWealth", wealth1);//捐献时每个兵需要的财富
        		allainceBarrack.put("disbandNeedWealth", wealth2);// 遣散时每个兵需要的财富
        		allainceBarrack.put("soldierAmount", ab.getAmount());//兵种数量	
        		retList.add(allainceBarrack);
        	}
    	}
    	retMap.put("page", page);  
    	retMap.put("pages", pages);
    	retList.add(retMap);

    	return retList;
    }
//    public List<Map<String,Object>> getAllianceBarrackSoldier(int characterId,String soldierNo) throws AppException{
//    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
//    	UserCharacter userCharacter = characterService.getCharacterById(characterId); 
//    	return getAllianceBarrackBySoldierNo(userCharacter.getAllianceId(),soldierNo);
//    }
    /**
     * 捐献士兵
     * @param characterId
     * @param soidierName
     * @param amount
     * @throws AppException 
     */
    public void donatedSoidier(int characterId ,String soldierNo ,int amount,int wealth) throws AppException{
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId); 
    	int allianceId = userCharacter.getAllianceId();
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
        Alliance alliance = allianceService.getAllianceById(allianceId);//联盟
    	BarracksService barracksService = (BarracksService) ServiceLocator.getSpringBean("barracksService");
    	Integer soldierAmount = barracksService.getUserSoldierAmount(characterId, soldierNo);//此编号的士兵总数
    	if(soldierAmount==null){
    		soldierAmount=0;
    	}
    	AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
    	if(soldierAmount<amount){
    		throw new AppException(soldierNo+"士兵数量不足，不能捐献");
    	}
    	AllianceBarrack allianceBarrack = allianceWelfareDao.getAllAllianceBrrack(allianceId,soldierNo);
    	// 判断士兵数量的上限
    	Integer allianceSolierAmount = allianceWelfareDao.getAllianceSolierAmount(allianceId);
    	if(allianceSolierAmount==null){
    		allianceSolierAmount=0;
    	}
    	StaticAllianceGrade staticAllianceGrade = AllianceGradeCache.getStaticAllianceGrade(alliance.getLevel());
    	int allianceSolierlimit = staticAllianceGrade.getBarrackLimit();
    	if(allianceSolierAmount>=allianceSolierlimit){
    		throw new AppException("联盟兵营士兵已满");
    	}
    	if(allianceBarrack!=null){
    		allianceWelfareDao.updataAllianceBarrack(allianceId, soldierNo, amount);
    	}else{
    		allianceWelfareDao.insertAllianceBarrack(allianceId, soldierNo, amount);
    	}
    	updateAllianceContribute(characterId,allianceId,wealth);//更新捐献表
    	allianceMemberService.updateAllianceMemberWealth(allianceId, characterId, wealth);//更新君主联盟财富
    	if(soldierAmount==amount){
    		barracksService.deleteUserSoldier(characterId, soldierNo);//删除士兵
    	}
    	barracksService.updateUserSoldier(characterId, soldierNo, soldierAmount-amount);//更新兵营士兵 数量
    }
    /**
     * 提取士兵
     * @throws AppException 
     */
    public void extractSoldiers(int characterId,String soldierNo,int amount,int wealth) throws AppException{
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
    	String alliancePosition = userCharacter.getAlliancePosition();
    	int allianceId = userCharacter.getAllianceId();
    	BarracksService barracksService = (BarracksService) ServiceLocator.getSpringBean("barracksService");//获取君主兵营
    	AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
    	
    	Integer memberAllianceWealth = allianceMemberService.getAllianceMemberWealth(allianceId, characterId);//获取君主联盟财富
        if(memberAllianceWealth==null){
        	memberAllianceWealth=0;
        }
        
    	AllianceSite allianceSite =allianceWelfareDao.getAllianceSite(allianceId, alliancePosition);//设置表的信息
    	AllianceBarrack allianceSoldier=allianceWelfareDao.getAllAllianceBrrack(allianceId, soldierNo);//联盟士兵
		AllianceReceive allianceReceive = allianceWelfareDao.getAllianceReceive(allianceId, characterId);	//获取领取数量信息
		if(allianceSoldier==null){
			throw new AppException("联盟兵营无该兵种");
		}
    	int soldierAmount = allianceSoldier.getAmount();//联盟兵营 该兵种的数量
		if(allianceSite!=null){
			int num = allianceSite.getSoldierAmount();//设置的数量
    	    if(memberAllianceWealth<wealth){
    	    	throw new AppException("你的财富值不足");
    	    }
			if(allianceReceive!=null){
		    	Calendar c1 = new GregorianCalendar();
				Calendar c2 = new GregorianCalendar();
				c1.setTime(allianceReceive.getCompleteTime());
				c2.setTime(new Date());
				int oldDate = c1.get(Calendar.DAY_OF_YEAR);
				int newDate = c2.get(Calendar.DAY_OF_YEAR);
				if(oldDate == newDate){
					if(allianceReceive.getReceiveNumber()+amount>num){
						throw new AppException("你已超过领取的数量，请明天再来");
					}
					if(soldierAmount<amount){
						throw new AppException("联盟士兵不足，请捐献");
					}
					allianceMemberService.updateAllianceMemberWealth(allianceId, characterId, -wealth);//更新君主联盟财富
					allianceWelfareDao.updataAllianceBarrack(allianceId, soldierNo, -amount);//更新联盟士兵
					if(amount==soldierAmount){
						allianceWelfareDao.deleteAllianceBarrack(allianceId, soldierNo);
					}
					Integer barrackAmount = barracksService.getUserSoldierAmount(characterId, soldierNo);
					if(barrackAmount==null){
						barracksService.addUserSoldier(characterId, soldierNo, amount);
					}else{
						barracksService.updateUserSoldier(characterId, soldierNo,barrackAmount+amount);//更新君主士兵
					}
					allianceWelfareDao.updateAllianceReceive(allianceId, characterId, allianceReceive.getReceiveNumber()+amount);//更新领取数量
				}else{
					if(amount>num){
						throw new AppException("你领取的数量过大");
					}
					if(soldierAmount<amount){
		    			throw new AppException("联盟士兵不足，请捐献");
		    		}
					allianceMemberService.updateAllianceMemberWealth(allianceId, characterId, -wealth);//更新君主联盟财富
					allianceWelfareDao.updataAllianceBarrack(allianceId, soldierNo, -amount);//更新联盟士兵
					if(amount==soldierAmount){
						allianceWelfareDao.deleteAllianceBarrack(allianceId, soldierNo);
					}
					Integer barrackAmount = barracksService.getUserSoldierAmount(characterId, soldierNo);
					if(barrackAmount==null){
						barracksService.addUserSoldier(characterId, soldierNo, amount);
					}else{
						barracksService.updateUserSoldier(characterId, soldierNo,barrackAmount+amount);//更新君主士兵
					}
					allianceWelfareDao.updateAllianceReceive(allianceId, characterId, amount);//更新领取数量
				}
			}else{
				if(amount>num){
					throw new AppException("你领取的数量过大");
				}
				if(soldierAmount<amount){
	    			throw new AppException("联盟士兵不足，请捐献");
	    		}
				allianceMemberService.updateAllianceMemberWealth(allianceId, characterId, -wealth);//更新君主联盟财富
				allianceWelfareDao.insertAllianceReceive(allianceId, characterId, amount);
				allianceWelfareDao.updataAllianceBarrack(allianceId, soldierNo, -amount);//更新联盟士兵
				if(amount==soldierAmount){
					allianceWelfareDao.deleteAllianceBarrack(allianceId, soldierNo);
				}
				Integer barrackAmount = barracksService.getUserSoldierAmount(characterId, soldierNo);
				if(barrackAmount==null){
					barracksService.addUserSoldier(characterId, soldierNo, amount);
				}else{
					barracksService.updateUserSoldier(characterId, soldierNo,barrackAmount+amount);//更新君主士兵
				}
			}
		}else{
//			Calendar c1 = new GregorianCalendar();
//			Calendar c2 = new GregorianCalendar();
//			c1.setTime(allianceReceive.getCompleteTime());
//			c2.setTime(new Date());
//			int oldDate = c1.get(Calendar.DAY_OF_YEAR);
//			int newDate = c2.get(Calendar.DAY_OF_YEAR);
//			if(oldDate==newDate){}
//			if(allianceReceive.getReceiveNumber()+amount>50){
//				throw new AppException("你已超过领取的数量，请明天再来");
//			}
			if(allianceReceive!=null){
		    	Calendar c1 = new GregorianCalendar();
				Calendar c2 = new GregorianCalendar();
				c1.setTime(allianceReceive.getCompleteTime());
				c2.setTime(new Date());
				int oldDate = c1.get(Calendar.DAY_OF_YEAR);
				int newDate = c2.get(Calendar.DAY_OF_YEAR);
				if(oldDate==newDate){
					if(allianceReceive.getReceiveNumber()+amount>50){
						throw new AppException("你已超过领取的数量，请明天再来");
					}
					if(soldierAmount<amount){
						throw new AppException("联盟士兵不足，请捐献");
					}
					allianceWelfareDao.updataAllianceBarrack(allianceId, soldierNo,-amount);//更新联盟士兵
					if(amount==soldierAmount){
						allianceWelfareDao.deleteAllianceBarrack(allianceId, soldierNo);
					}
					Integer barrackAmount = barracksService.getUserSoldierAmount(characterId, soldierNo);
					if(barrackAmount==null){
						barracksService.addUserSoldier(characterId, soldierNo, amount);
					}else{
						barracksService.updateUserSoldier(characterId, soldierNo,barrackAmount+amount);//更新君主士兵
					}
					allianceWelfareDao.updateAllianceReceive(allianceId, characterId, allianceReceive.getReceiveNumber()+amount);//更新领取数量
				}else{
					if(soldierAmount<amount){
		    			throw new AppException("联盟士兵不足，请捐献");
		    		}
					allianceWelfareDao.updataAllianceBarrack(allianceId, soldierNo,-amount);//更新联盟士兵
					if(amount==soldierAmount){
						allianceWelfareDao.deleteAllianceBarrack(allianceId, soldierNo);
					}
					Integer barrackAmount = barracksService.getUserSoldierAmount(characterId, soldierNo);
					if(barrackAmount==null){
						barracksService.addUserSoldier(characterId, soldierNo, amount);
					}else{
						barracksService.updateUserSoldier(characterId, soldierNo,barrackAmount+amount);//更新君主士兵
					}
					allianceWelfareDao.updateAllianceReceive(allianceId, characterId, amount);//更新领取数量
				}
			}else{
				if(soldierAmount<amount){
	    			throw new AppException("联盟士兵不足，请捐献");
	    		}
				allianceWelfareDao.insertAllianceReceive(allianceId, characterId, amount);//插入领取信息
				allianceWelfareDao.updataAllianceBarrack(allianceId, soldierNo,-amount);//更新联盟士兵
				if(amount==soldierAmount){
					allianceWelfareDao.deleteAllianceBarrack(allianceId, soldierNo);
				}
				Integer barrackAmount = barracksService.getUserSoldierAmount(characterId, soldierNo);
				if(barrackAmount==null){
					barracksService.addUserSoldier(characterId, soldierNo, amount);
				}else{
					barracksService.updateUserSoldier(characterId, soldierNo,barrackAmount+amount);//更新君主士兵
				}
			}
		}
    }
    /**
     *  提取设置
     * @param characterId
     * @throws AppException
     */
    public void retrievalSetting(int characterId,String alliancePosition,int amount) throws AppException{
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId); 
    	int allianceId = userCharacter.getAllianceId();    	
    	String privilegeNo = "ga0017";//提取设置的特权编号
        String position = userCharacter.getAlliancePosition();//君主联盟职位
  	    StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
  	    StaticAlliancePrivilege staticAlliancePrivilege =AlliancePrivilegeCache.getStaticAlliancePrivilege(privilegeNo);//获取特权表
  	    
    	if(staticAlliancePosition.getAuthoLevel()<staticAlliancePrivilege.getNeedLevel()&&!(staticAlliancePosition.getPositionNo().equals(staticAlliancePrivilege.getPositionLimit()))){
    		throw new AppException("你没有提取设置权限");
    	}
    	Date time = allianceWelfareDao.getAllianceSiteTime(allianceId, alliancePosition);
		if(time != null ){
			Calendar c1 = new GregorianCalendar();
			Calendar c2 = new GregorianCalendar();
			c1.setTime(time);
			c2.setTime(new Date()); 
			int oldDate = c1.get(Calendar.DAY_OF_YEAR);
			int newDate = c2.get(Calendar.DAY_OF_YEAR);
			if(oldDate==newDate){
				throw new AppException("该职位今天已经被设置");
			}else{
				allianceWelfareDao.updateAllianceSite(allianceId, alliancePosition, amount);
			}
		}else{
			allianceWelfareDao.insertAllianceSite(userCharacter.getAllianceId(), alliancePosition, amount);
		}
    }
    /**
     * 遣散联盟士兵
     * @throws AppException 
     */
    public void disbandAllianceSolier(int characterId ,String soldierNo ,int amount,int wealth) throws AppException{
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
    	int allianceId = userCharacter.getAllianceId();
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	//判断有无此权限；
    	AllianceBarrack allianceSoldier=allianceWelfareDao.getAllAllianceBrrack(allianceId, soldierNo);//联盟士兵
    	int soldierAmount = allianceSoldier.getAmount();//联盟士兵总数
    	if(soldierAmount<amount){
    		throw new AppException("联盟士兵不足");
    	}
    	if(amount==allianceSoldier.getAmount()){
    		allianceWelfareDao.deleteAllianceBarrack(allianceId, soldierNo);
    	}else{
    		allianceWelfareDao.updataAllianceBarrack(allianceId, soldierNo, -amount);//更新联盟士兵
    	}
    	allianceService.updateAllianceWealth(allianceId, wealth);//更新联盟财富
    }
    /**
     * 初始化联盟科技
     * @param characterId
     * @return 
     * @return
     * @throws AppException
     */
    public List<Map<String,Object>> initAllianceTechology(int characterId) throws AppException{
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);//获取君主信息
    	Alliance alliance = allianceService.getAllianceById(userCharacter.getAllianceId());//君主联盟信息
    	if(alliance==null){
    		throw new AppException("你没有加入任何联盟");
    	}
    	Map<String , Object> sdMap = new HashMap<String,Object>();
    	Map<String , Object> esMap = new HashMap<String,Object>();
    	List<Map<String , Object>> retList = new ArrayList<Map<String,Object>>();
    	int allianceLevel = alliance.getLevel();//联盟等级
    	int allianceWealth = alliance.getWealth();//联盟财富
    	StaticAllianceBuilding sd = AllianceBuildingCache.getStaticAllianceBuilding("gb0001_1");//兴农司科技
    	StaticAllianceBuilding es = AllianceBuildingCache.getStaticAllianceBuilding("gb0002_1");//远征驿站
        AllianceTechnology allianceTechnologySD = allianceWelfareDao.getAllianceTechologyInfo(userCharacter.getAllianceId(),Const.ALLIANCE_TECHNOLOGY_SINONDIVISION);//兴农司科技
    	AllianceTechnologyQueue allianceTechnologyQueueSD = allianceWelfareDao.getAllianceTechnologyQueue(userCharacter.getAllianceId(),Const.ALLIANCE_TECHNOLOGY_SINONDIVISION);//兴农司科技
        sdMap.put("desc", sd.getBulidingDesc());
        esMap.put("desc", es.getBulidingDesc());
    	if(allianceTechnologyQueueSD==null){
    		 if(allianceTechnologySD==null){
    	        	StaticAllianceBuilding sinonDivision = AllianceBuildingCache.getStaticAllianceBuilding("gb0001_1");
    	        	if(sinonDivision.getNeedAllianceLevel()<=allianceLevel&&sinonDivision.getUpgradeNeedWealth()<=allianceWealth){
    	    			sdMap.put("isUpgradeSinonDivision", true);
    	        	}else{ 
    	        		sdMap.put("isUpgradeSinonDivision", false);
    	        	}
    	        	sdMap.put("toolTip", allianceTechnologyToolTip(sinonDivision,allianceTechnologySD));
    	        }else{
    	        	String[] upTechnologyNo = allianceTechnologySD.getTechnologyNo().split("_");
    	    		String upNo = upTechnologyNo[0]+"_"+(Integer.parseInt(upTechnologyNo[1])+1);
    	        	StaticAllianceBuilding sinonDivision = AllianceBuildingCache.getStaticAllianceBuilding(upNo);
    	        	if(sinonDivision==null){
    	        		sdMap.put("isUpgradeSinonDivision", false);
    	        		sdMap.put("toolTip", allianceTechnologyToolTip(sinonDivision,allianceTechnologySD));
    	        	}else{
    	        		if(sinonDivision.getNeedAllianceLevel()<=allianceLevel&&sinonDivision.getUpgradeNeedWealth()<=allianceWealth){
    	        			sdMap.put("isUpgradeSinonDivision", true);
    	            	}else{
    	            		sdMap.put("isUpgradeSinonDivision", false);
    	            	}
    	            	sdMap.put("toolTip", allianceTechnologyToolTip(sinonDivision,allianceTechnologySD));
    	        	}	
    	        }
    	}else{
    		StaticAllianceBuilding sinonDivision = AllianceBuildingCache.getStaticAllianceBuilding(allianceTechnologyQueueSD.getTechnologyNo());
    		sdMap.put("isUpgradeSinonDivision", false);
    		if(allianceTechnologyQueueSD.getCompleteTime().getTime()-System.currentTimeMillis()>0){
    			sdMap.put("time", allianceTechnologyQueueSD.getCompleteTime().getTime()-System.currentTimeMillis());
    		}
    		sdMap.put("toolTip", allianceTechnologyToolTip(sinonDivision,allianceTechnologySD));
    	}
        AllianceTechnology allianceTechnologyES = allianceWelfareDao.getAllianceTechologyInfo(userCharacter.getAllianceId(),Const.ALLIANCE_TECHNOLOGY_EXPEDITIONSTATION);//远征驿科技
        AllianceTechnologyQueue allianceTechnologyQueueES = allianceWelfareDao.getAllianceTechnologyQueue(userCharacter.getAllianceId(),Const.ALLIANCE_TECHNOLOGY_EXPEDITIONSTATION);//远征驿科技
        if(allianceTechnologyQueueES==null){
        	 if(allianceTechnologyES==null){
             	StaticAllianceBuilding expeditionStation = AllianceBuildingCache.getStaticAllianceBuilding("gb0002_1");
             	if(expeditionStation.getNeedAllianceLevel()<=allianceLevel&&expeditionStation.getUpgradeNeedWealth()<=allianceWealth){
         			esMap.put("isUpgradeExpeditionStation", true);
         		}else{
         			esMap.put("isUpgradeExpeditionStation", false);
         		}
             	esMap.put("toolTip", allianceTechnologyToolTip(expeditionStation,allianceTechnologyES));
             }else{
             	String[] upTechnologyNo = allianceTechnologyES.getTechnologyNo().split("_");
         		String upNo = upTechnologyNo[0]+"_"+(Integer.parseInt(upTechnologyNo[1])+1);
         		StaticAllianceBuilding expeditionStation = AllianceBuildingCache.getStaticAllianceBuilding(upNo);
         		if(expeditionStation==null){
         			esMap.put("isUpgradeExpeditionStation", false);
         			esMap.put("toolTip", allianceTechnologyToolTip(expeditionStation,allianceTechnologyES));
         		}else{
         			if(expeditionStation.getNeedAllianceLevel()<=allianceLevel&&expeditionStation.getUpgradeNeedWealth()<=allianceWealth){
             			esMap.put("isUpgradeExpeditionStation", true);
             		}else{
             			esMap.put("isUpgradeExpeditionStation", false);
             		}
         			esMap.put("toolTip", allianceTechnologyToolTip(expeditionStation,allianceTechnologyES));
         		}
             }
        }else{
        	StaticAllianceBuilding expeditionStation = AllianceBuildingCache.getStaticAllianceBuilding(allianceTechnologyQueueES.getTechnologyNo());
        	esMap.put("isUpgradeExpeditionStation", false);
        	if(allianceTechnologyQueueES.getCompleteTime().getTime()-System.currentTimeMillis()>0){
        		esMap.put("time", allianceTechnologyQueueES.getCompleteTime().getTime()-System.currentTimeMillis());
        	}
        	esMap.put("toolTip", allianceTechnologyToolTip(expeditionStation,allianceTechnologyES));
        }
    	retList.add(esMap);
    	retList.add(sdMap);
   	return retList;
    }
    /**
     * 获取联盟科技福利
     * @return 
     * @return 
     * @throws AppException 
     */
//    public Map<String, Object> getAllianceWelfare(int characterId) throws AppException{
//    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
//    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
//    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
//    	int allianceId = userCharacter.getAllianceId();
//    	Map<String ,Object> sinonDivision = new HashMap<String,Object>();
//    	Map<String ,Object> expeditionStation = new HashMap<String,Object>();
//    	List<Map<String ,Object>> retList = new ArrayList<Object>();
//    	if(allianceId==0){
//    		throw new AppException("你没有加入任何联盟");
//    	}
//    	Alliance  alliance = allianceService.getAllianceById(allianceId);
//    	if(alliance==null){
//    		throw new AppException("该联盟不存在");
//    	}
//    	List<AllianceTechnology> allianceTechnology = allianceWelfareDao.getAllianceTechnologyList(allianceId);
//    	int size= allianceTechnology.size();
//    	if(size==0){
//    		StaticAllianceBuilding x=AllianceBuildingCache.getStaticAllianceBuilding("gb0001");
//    		StaticAllianceBuilding y=AllianceBuildingCache.getStaticAllianceBuilding("gb0002");
//    		if(x.getEffectValueMode()==1){
//    			sinonDivision.put("sinonDivision",0);
//    		}else{
//    			sinonDivision.put("sinonDivision",0);
//    		}
//    		
//    		retMap.put("expeditionStation", 0);
//    	}
//    	if(size==1){
//    		for(AllianceTechnology at : allianceTechnology){
//    			if(at.getTechnologyNo().startsWith("gb0001")){
//    				StaticAllianceBuilding x=AllianceBuildingCache.getStaticAllianceBuilding(at.getTechnologyNo());
//    				retMap.put("sinonDivision", x.getEffectValue());
//    				retMap.put("expeditionStation", 0);
//    			}
//    			if(at.getTechnologyNo().startsWith("gb0002")){
//    				StaticAllianceBuilding y=AllianceBuildingCache.getStaticAllianceBuilding(at.getTechnologyNo());
//    				retMap.put("expeditionStation", y.getEffectValue());
//    				retMap.put("sinonDivision", 0);
//    			}
//    		}
//    	}
//    	if(size==2){
//    		for(AllianceTechnology at : allianceTechnology){
//    			if(at.getTechnologyNo().startsWith("gb0001")){
//    				StaticAllianceBuilding x=AllianceBuildingCache.getStaticAllianceBuilding(at.getTechnologyNo());
//    				retMap.put("sinonDivision", x.getEffectValue());
//    			}
//    			if(at.getTechnologyNo().startsWith("gb0002")){
//    				StaticAllianceBuilding y=AllianceBuildingCache.getStaticAllianceBuilding(at.getTechnologyNo());
//    				retMap.put("expeditionStation", y.getEffectValue());
//    			}
//    		}
//    	}
//    	return retMap;
//    }
    public Map<String, Object> getAllianceTechnologyWelfare(int allianceId,String buiding){
    	Map<String,Object> retMap = new HashMap<String,Object>();
    	AllianceTechnology allianceTechnology = allianceWelfareDao.getAllianceTechnologyWelfare(allianceId, buiding);
    	if(allianceTechnology!=null){
    		StaticAllianceBuilding  staticAllianceBuilding=AllianceBuildingCache.getStaticAllianceBuilding(allianceTechnology.getTechnologyNo());
    		if(staticAllianceBuilding.getEffectValueMode()==1){
    			if(staticAllianceBuilding.getBulidingEffectType()==1){
    				retMap.put("buidingEffect","提升行军速度");
    			    retMap.put("value", staticAllianceBuilding.getEffectValue());
    			}else{
    				retMap.put("buidingEffect","增加资源产量");
    			    retMap.put("value", staticAllianceBuilding.getEffectValue());
    			}
    		}else{
    			if(staticAllianceBuilding.getBulidingEffectType()==1){
    				retMap.put("buidingEffect","提升行军速度");
    			    retMap.put("value", staticAllianceBuilding.getEffectValue()+"%");
    			}else{
    				retMap.put("buidingEffect","增加资源产量");
    			    retMap.put("value", staticAllianceBuilding.getEffectValue()+"%");
    		}
    	  }
    	}
    	return retMap;
    }
    /**
     * 升级toolTip
     * @param Technology
     * @param allianceTechnology
     * @return
     */
    public Map<String, Object> allianceTechnologyToolTip(StaticAllianceBuilding Technology,AllianceTechnology allianceTechnology){
    	Map<String,Object> retMap = new HashMap<String,Object>();
    	if(Technology==null){
    		if(allianceTechnology==null){
        		retMap.put("technologyLevel",0);
        	}else{
        		retMap.put("technologyLevel", allianceTechnology.getLevel());
        	}
    		retMap.put("technology", "你已经升至最高级，恭喜你");
//    		retMap.put("technologyName", Technology.getBulidingName());
    	}else{
    		if(allianceTechnology==null){
        		retMap.put("technologyLevel",0);
        	}else{
        		retMap.put("technologyLevel", allianceTechnology.getLevel());
        	}
    		retMap.put("technologyName", Technology.getBulidingName());
    		retMap.put("technologyNeedLevel", Technology.getNeedAllianceLevel());
    		retMap.put("technologyNeedWealth", Technology.getUpgradeNeedWealth());
    		retMap.put("technologyNeedTime", Technology.getUpgradeNeedTime());
    	}
         return retMap;
    }
    /**
     * 升级联盟科技
     * @param characterId
     * @param gbulidingno
     * @return 
     * @throws AppException 
     */
    public long upgradeAllianceTechnology(int characterId,String gbulidingno) throws AppException{
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	//AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
    	int allianceId = userCharacter.getAllianceId();
    	Alliance alliance = allianceService.getAllianceById(allianceId);//根据Id查询联盟
    	int allianceWealth = alliance.getWealth();//联盟财富;
    	long d=0;
    	
     	String privilegeNo = "ga0016";//升级科技的特权编号
        String position = userCharacter.getAlliancePosition();//君主联盟职位
  	    StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
  	    StaticAlliancePrivilege staticAlliancePrivilege =AlliancePrivilegeCache.getStaticAlliancePrivilege(privilegeNo);//获取特权表
  	    if(staticAlliancePosition.getAuthoLevel()<staticAlliancePrivilege.getNeedLevel()){
  	    	throw new AppException("你没有权限升级联盟科技");
  	    }
  	    if(staticAlliancePosition.getAuthoLevel()==staticAlliancePrivilege.getNeedLevel()){
  	    	if(!position.equals(staticAlliancePrivilege.getPositionLimit())){
  	    		throw new AppException("你没有权限升级联盟科技");
  	    	}
  	    }    
        AllianceTechnology allianceTechnology= allianceWelfareDao.getAllianceTechologyInfo(allianceId,gbulidingno);
        AllianceTechnologyQueue allianceTechnologyQueue = allianceWelfareDao.getAllianceTechnologyQueue(userCharacter.getAllianceId(),gbulidingno);
    	  if(allianceTechnology==null){
    		  if(allianceTechnologyQueue==null){
    			   StaticAllianceBuilding sat=AllianceBuildingCache.getStaticAllianceBuilding(gbulidingno+"_1");
   		       	   int needWealth = sat.getUpgradeNeedWealth();
   		           if(allianceWealth<needWealth){
   		     	   throw new AppException("联盟财富不足，无法升级");
   		           }
   		           d = System.currentTimeMillis()+sat.getUpgradeNeedTime()*1000;//需要的时间
	   		       Date date = new Date(d);
	   	           AllianceTechnologyQueue at = new AllianceTechnologyQueue();
	   	           at.setAllianceId(allianceId);
	   	           at.setLevel(1);
	   	           at.setCompleteTime(date);
	   	           at.setTechnologyNo(gbulidingno+"_1");
	   	           allianceWelfareDao.insertAllianceTechnologyQueue(at);//插入到升级队列
	   	           Map<String,Object> data = new HashMap<String, Object>();
	   	           data.put("allianceTechnologyQueue", at);
	   	           data.put("needWealth", needWealth);
	   	           data.put("allianceId", allianceId);
	   	           ExecuteJob.add(UpgradeAllianceTechnologyJob.class, data, d, allianceId+ALLIANCE_TECHNOLOGY+gbulidingno);
    		  }else{
    			  throw new AppException("该科技正在升级");
    		  }
       	
          }else{
        	  if (alliance.getLevel()<=allianceTechnology.getLevel()){
              	throw new AppException("科技等级超过联盟等级，无法升级");
              }
        	  if(allianceTechnologyQueue==null){
        		  String[] upTechnologyNo = allianceTechnology.getTechnologyNo().split("_");
           		  String upNo = upTechnologyNo[0]+"_"+(Integer.parseInt(upTechnologyNo[1])+1);
            	  StaticAllianceBuilding sat=AllianceBuildingCache.getStaticAllianceBuilding(upNo);
            	  if(sat==null){
            		  throw new AppException("该科技已经顶级");
            	  }
    		      int needWealth = sat.getUpgradeNeedWealth();
    		      if(allianceWealth<needWealth){
    		      throw new AppException("联盟财富不足，无法升级");
    		       }
    		       d = System.currentTimeMillis()+sat.getUpgradeNeedTime()*1000;//需要的时间
	   		       Date date = new Date(d);
	   	           AllianceTechnologyQueue at = new AllianceTechnologyQueue();
	   	           at.setAllianceId(allianceId);
	   	           at.setLevel(allianceTechnology.getLevel()+1);
	   	           at.setCompleteTime(date);
	   	           at.setTechnologyNo(upNo);
	   	           allianceWelfareDao.insertAllianceTechnologyQueue(at);//插入到升级队列
	   	           Map<String,Object> data = new HashMap<String, Object>();
	   	           data.put("allianceTechnologyQueue", at);
	   	           data.put("needWealth", needWealth);
	   	           data.put("allianceId", allianceId);
	   	           ExecuteJob.add(UpgradeAllianceTechnologyJob.class, data, d, allianceId+ALLIANCE_TECHNOLOGY+gbulidingno);
        	  }else{
        		  throw new AppException("该科技正在升级");
        	  }
    
          }
          
       return d-System.currentTimeMillis();
    }
    /**
     * 发放俸禄
     * @return 
     * @throws AppException 
     */
    public Map<String, Object> grantSalary(int characterId) throws AppException{
     	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	Alliance alliance = allianceService.getAllianceById(userCharacter.getAllianceId());
    	Map<String , Object> retMap = new HashMap<String,Object>();
    	retMap.put("wealthName", "联盟俸禄");
    	if(alliance==null){
    		throw new AppException("你没有加入任何联盟");
    	}
    	AllianceSalary allianceSalary = allianceWelfareDao.getAllianceSalary(characterId);
    	if(allianceSalary == null){
    		retMap.put("isReceive", true);
    	}else{
    		retMap.put("isReceive", false);
    	}
//    	if(alliance.getLevel()>=3){
    		StaticAllianceSalary staticAllianceSalary = AllianceSalaryCache.getStaticAllianceSalary(userCharacter.getAlliancePosition());
    		switch(alliance.getLevel()){
		    		case 1: retMap.put("ticket", staticAllianceSalary.getAllianceLevel1()); break;
		    		case 2: retMap.put("ticket", staticAllianceSalary.getAllianceLevel2()); break;
		    		case 3: retMap.put("ticket", staticAllianceSalary.getAllianceLevel3()); break;
		    		case 4: retMap.put("ticket", staticAllianceSalary.getAllianceLevel4()); break;
		    		case 5: retMap.put("ticket", staticAllianceSalary.getAllianceLevel5()); break;
		    		case 6: retMap.put("ticket", staticAllianceSalary.getAllianceLevel6()); break;
		    		case 7: retMap.put("ticket", staticAllianceSalary.getAllianceLevel7()); break;
    		}
//    	}else{
//			retMap.put("ticket", 0);
//		}
    	
        return retMap;
    }
    /**
     * 领取俸禄
     * @param characterId
     * @param num
     * @throws AppException 
     */
    public void receiveSalary(int characterId,int num) throws AppException{
    	AllianceSalary allianceSalary = allianceWelfareDao.getAllianceSalary(characterId);
    	if(allianceSalary!=null){
    		throw new AppException("你今天已经领取了俸禄");
    	}
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
    	characterService.updateTicket(characterId, userCharacter.getTicket()+num);
    	allianceWelfareDao.insertAllianceSalary(characterId);
    }
    public void insertAllianceTechnology(AllianceTechnology allianceTechnology){
    	allianceWelfareDao.insertAllianceTechnology(allianceTechnology);
    	}
    public void updateAllianceTechnology(Map<String,Object> param){
    	allianceWelfareDao.updateAllianceTechnology(param);
    }
    public void deleteAllianceTechnologyQueue(int allianceId,String technologyNo){
    	allianceWelfareDao.deleteAllianceTechnologyQueue(allianceId, technologyNo);
    }
    public AllianceTechnology getAllianceTechologyInfo(int allianceId,String gbulidingno){
    	return allianceWelfareDao.getAllianceTechologyInfo(allianceId,gbulidingno);
    }
    /**
     * 联盟市场
     * @param characterId
     * @return 
     * @throws AppException
     */
    public List<Object> getAllianceShoping(int characterId,int page) throws AppException{
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
//    	UserItemService userItemService =  (UserItemService) ServiceLocator.getSpringBean("userItemService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
    	AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
    	Alliance alliance = allianceService.getAllianceById(userCharacter.getAllianceId());
    	AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
    	
    	List<StaticAllianceShoping> staticAllianceShoping =  AllianceShopingCache.getAllStaticShoping();
    	if(page == 0){
    		page=1;
    	}
    	int size = staticAllianceShoping.size();
    	int pages = (size-1+MAX_ALLIANCE_AMOUNT)/MAX_ALLIANCE_AMOUNT;
    	int fromIndex = (page-1)*MAX_ALLIANCE_AMOUNT;
    	if(fromIndex/MAX_ALLIANCE_AMOUNT>size/MAX_ALLIANCE_AMOUNT){
    		fromIndex=size/MAX_ALLIANCE_AMOUNT*MAX_ALLIANCE_AMOUNT;
    		page=pages;
    	}
    	int toIndex = (page*MAX_ALLIANCE_AMOUNT);
    	if(size<toIndex){
    		toIndex=size;
    	} 
    	Map<String,Object> retMap;
    	
    	Map<String,Object> pageMap = new HashMap<String,Object>();
    	pageMap.put("page", page);
    	pageMap.put("pages", pages);
    	
    	List<Object> retList = new ArrayList<Object>();
    	if(userCharacter.getAllianceId()==0){
    		throw new AppException("你没有加入任何联盟");
    	}
    	Integer memberWealth = allianceMemberService.getAllianceMemberWealth(userCharacter.getAllianceId(), characterId);
    	if(memberWealth==null){
    		memberWealth=0;
    	}
    	pageMap.put("memberWealth", memberWealth);
    	retList.add(pageMap);
    	
    	for(StaticAllianceShoping sap : staticAllianceShoping.subList(fromIndex, toIndex)){
    		retMap = new HashMap<String,Object>();
    		Integer amount = allianceWelfareDao.getAllianceShopingSoldAmount(userCharacter.getAllianceId(), sap.getItemNo());
    		Integer buyNumber = allianceWelfareDao.getShopingAmountByCharacterId(userCharacter.getId(), sap.getItemNo());
    		if(amount == null){
    			amount=0;
    		}
    		if(buyNumber==null){
    			buyNumber=0;
    		}
    		int limit = sap.getSellLimit();
    		retMap.put("buyNumber", sap.getBuyLimit()-buyNumber);//可买数量
    		retMap.put("itemNoLevel", 1);//物品等级
    		retMap.put("remainAmount", limit-amount);//剩余数量
    		retMap.put("type", sap.getItemType());//物品类型
    		retMap.put("needWelfare", sap.getPrice());//需要财富
    		retMap.put("itemNo", sap.getItemNo());
    	    if(alliance.getLevel()>=sap.getNeedAllianceLevel()&&limit-amount!=0&&sap.getBuyLimit()-buyNumber!=0&&memberWealth>=sap.getPrice()){
    	    	retMap.put("isOpen", 1);
    	    }else{
    	    	retMap.put("isOpen", 0);
    	    }
    	    if(alliance.getLevel()<sap.getNeedAllianceLevel()){
    	    	retMap.put("isOpen", 2);
    	    	retMap.put("needAllianceLevel", sap.getNeedAllianceLevel());
    	    }
    		switch(sap.getItemType()){
    		case 1 : StaticEquipment staticEquipment = EquipmentCache.getEquipmentByNo(sap.getItemNo());
    		            retMap.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(staticEquipment));
    		            break;
    		case 2 : StaticItem staticItem = ItemCache.getItemByNo(sap.getItemNo());
    					retMap.put("toolTipInfo", ChangeArticleToToolTip.changeItemToToolTip(staticItem));
    		            break;
    		case 3 : StaticMaterial staticMaterial = MaterialCache.getMaterialByNo(sap.getItemNo());
    		            retMap.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(staticMaterial));
   		                break;
    		}
    		retList.add(retMap);
    	}
    	return retList;
    }
    /**
     * 联盟市场里购买物品
     * @param characterId
     * @param itemNo
     * @throws AppException
     */
    public void buyItem(int characterId,String itemNo) throws AppException{
    	CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
    	UserCharacter userCharacter = characterService.getCharacterById(characterId);
    	UserItemService userItemService =  (UserItemService) ServiceLocator.getSpringBean("userItemService");
    	StaticAllianceShoping staticAllianceShoping =  AllianceShopingCache.getStaticAllianceShoping(itemNo);
    	AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
    	
    	if(staticAllianceShoping == null){
    		throw new AppException("没有该物品");
    	}
    	if(userCharacter.getAllianceId()==0){
    		throw new AppException("你没有加入任何联盟");
    	}
    	Integer amount = allianceWelfareDao.getAllianceShopingSoldAmount(userCharacter.getAllianceId(), staticAllianceShoping.getItemNo());
    	if(amount==null){
    		amount=0;
    	}
    	Integer buyNumber = allianceWelfareDao.getShopingAmountByCharacterId(userCharacter.getId(), staticAllianceShoping.getItemNo());
		if(buyNumber==null){
			buyNumber=0;
    	}
		Integer memberWealth = allianceMemberService.getAllianceMemberWealth(userCharacter.getAllianceId(), characterId);
		if(memberWealth==null){
			memberWealth=0;
    	}
		if(staticAllianceShoping.getSellLimit()-amount<=0){
			throw new AppException("该物品今天已经出售完，请明天再来，亲");
		}
		if(staticAllianceShoping.getBuyLimit()-buyNumber<=0){
			throw new AppException("你已达到购买次数，请明天再来");
		}
		if(memberWealth<staticAllianceShoping.getPrice()){
			throw new AppException("你的联盟财富值不足，不能购买");
		}
		if(userItemService.getTreasuryRemain(characterId)<=0){
			throw new AppException("你的国库已满，请清理国库");
		}
		
    	userItemService.addItem2character(characterId, itemNo, staticAllianceShoping.getItemType(), Const.BOTH_BIND_AND_NOT_BIND);//添加到背包（国库）
    	int buyAmount = 1;//一次购买一件物品
    	allianceWelfareDao.insertAllianceShoping(userCharacter.getAllianceId(), characterId, itemNo, buyAmount);//插入购买信息
    	allianceMemberService.updateAllianceMemberWealth(userCharacter.getAllianceId(), characterId, -(staticAllianceShoping.getPrice()));//更新联盟财富
    	
    }
    /**
     * 更新捐献表
     * @param characterId
     * @param allianceId
     * @param amount
     */
    public void updateAllianceContribute(int characterId ,int allianceId,int amount){
    	AllianceContribute allianceContribute = allianceWelfareDao.getAianceContributeByCharacterId(allianceId, characterId);//查询有无此君主捐献
    	if(allianceContribute!=null){
    		Calendar c1 = new GregorianCalendar();
    		Calendar c2 = new GregorianCalendar();
    		Date oldate = allianceContribute.getCompleteTime();
    		c1.setTime(oldate);
    		c2.setTime(new Date());
    		int oldDate = c1.get(Calendar.DAY_OF_YEAR);
    		int newDate = c2.get(Calendar.DAY_OF_YEAR);
    		if(oldDate != newDate){
    			allianceWelfareDao.updateAllianceContribute(allianceId, characterId, allianceContribute.getContributeAmount()+amount, amount);//当天第一次捐献
    		}else{
    			allianceWelfareDao.updateAllianceContribute(allianceId, characterId, allianceContribute.getContributeAmount()+amount, allianceContribute.getTodayAmount()+amount);//当天多次捐献
    		}
    	}else{
    		allianceWelfareDao.insertAllianceContribute(allianceId, characterId, amount);//第一次捐献
    	}
    }

    
	public AllianceWelfareDao getAllianceWelfareDao() {
		return allianceWelfareDao;
	}
	public void setAllianceWelfareDao(AllianceWelfareDao allianceWelfareDao) {
		this.allianceWelfareDao = allianceWelfareDao;
	}
    
}
