package com.crystalcg.gamedev.alliance.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.alliance.dao.AllianceMemberDao;
import com.crystalcg.gamedev.alliance.domain.Alliance;
import com.crystalcg.gamedev.alliance.domain.AllianceEvent;
import com.crystalcg.gamedev.alliance.domain.AllianceMember;
import com.crystalcg.gamedev.alliance.domain.ApplicationList;
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

public class AllianceMemberService {
   private static final int MAX_ALLIANCE_MEMBER_AMOUNT = 10; 
   private static final int ALLIANCE_EVENT_AMOUNT=8;
   private static final int ALLIANCE_APPLICATION_AMOUNT=7;
   
   private AllianceMemberDao allianceMemberDao;
   
   /**
    * 申请加入
    * @param characterId
    * @param allianceId
    * @throws AppException 
    */
   public void applyAllianceApplication(int characterId,int allianceId) throws AppException{
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   UserCharacter userCharacter = characterService.getCharacterById(characterId); 
	   if(userCharacter.getAllianceId() != 0){
		   throw new AppException("你当前已有联盟");
	   }
	   AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
	   Alliance alliance =  allianceService.getAllianceById(allianceId);
	   if(alliance ==null){
		   throw new AppException("你申请加入的联盟不存在");
	   }
	   if(!alliance.getCountry().equals(CountryCache.getNameById(userCharacter.getCountryId()))){// 判断联盟国家和君主国家是否相等
		   throw new AppException("你不能申请该国联盟");
	   }
	   List<ApplicationList> allianceApplication = allianceMemberDao.getApplicationIdByCharacterId(characterId);
	   int number = 0;
	   for(ApplicationList aa : allianceApplication){
		   if(aa.getAllianceId()== allianceId&&aa.getType()==1){
			   throw new AppException("你已申请加入，请等待盟主确认");
		   }
		   if(aa.getAllianceId()==allianceId&&aa.getType()==2){
			   throw new AppException("你已被邀请加入该联盟，请确认");
		   }
		   if(aa.getType()==1){
			   number+=1;
		   }
	   }
	   if(number>=5){
		   throw new AppException("你已经达到申请上限");
	   }
	   int type = 1;//申请中
	   allianceMemberDao.applyAllianceApplication(characterId,allianceId,type);
	   String event = " {"+userCharacter.getName()+"}申请加入，等待批准";
	   insertAllianceEvent(allianceId, new Date(), event);
   }
   /**
    * 君主获取申请，邀请信息
    * @param characterId
    * @param page
    * @return 
    */
   public Map<String, Object> getCharacterAllianceApplication(int characterId,int page){
//	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
	   Map<String,Object> resultMap = new HashMap<String,Object>();
	   List<Object> resultList = new ArrayList<Object>();
	   if(page < 1){
		   page = 1;
	   }
	   int amount = allianceMemberDao.getcharacterApplicationAomunt(characterId);
	   int pages = (amount-1+ALLIANCE_APPLICATION_AMOUNT)/ALLIANCE_APPLICATION_AMOUNT;
	   if(page>pages){
		   page = pages;
	   }
	   if(page==0){
		   resultMap = new HashMap<String,Object>();
	   }else{
		   List<ApplicationList> appList = allianceMemberDao.getAllCharacterApplication(characterId,(page-1)*ALLIANCE_APPLICATION_AMOUNT,ALLIANCE_APPLICATION_AMOUNT);
//		   if(appList==null){
//			   resultMap.put("info", null);
//		   }else{
			   for(ApplicationList app : appList){
				   Map<String,Object> map = new HashMap<String,Object>();
				   Alliance alliance =  allianceService.getAllianceById(app.getAllianceId());
				   map.put("allianceName", alliance.getName());
				   if(app.getType()==1){
					   map.put("type", "申请中");
				   }else{
					   map.put("type", "邀请中");
				   }
				   map.put("allianceId", alliance.getId());
				 resultList.add(map);   
			   }
			   resultMap.put("info", resultList);
//		   }
		   resultMap.put("page", page);
		   resultMap.put("pages", pages);
	   }	

	   return resultMap;
   }
   /**
    * 成员同意加入该联盟
    * @param characterId
    * @param allianceId
    * @throws AppException
    */
   public void agreedJoin(int characterId,int allianceId) throws AppException{
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   UserCharacter userCharacter = characterService.getCharacterById(characterId);
	   if(userCharacter.getAllianceId()!=0){
		   throw new AppException("你已经加入别的联盟");
	   }
	   AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
	   Alliance alliance =  allianceService.getAllianceById(allianceId);
//	   int level = alliance.getLevel();
//	   String privilegeNo="ga0007";//解散联盟的特权编号
//	   String position = userCharacter.getAlliancePosition();//君主联盟职位
//	   StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
//	   StaticAlliancePrivilege staticAlliancePrivilege =AlliancePrivilegeCache.getStaticAlliancePrivilege(privilegeNo);//获取特权表
	   StaticAllianceGrade staticAllianceGrade = AllianceGradeCache.getStaticAllianceGrade(alliance.getLevel());//当前等级的升级信息
	   
	   if(staticAllianceGrade.getMemberLimit()<= alliance.getMemberAmount()){
		   throw new AppException("联盟成员已满");
	   }
	   String alliancePosition = "of0007";//普通成员编号
	   allianceMemberDao.joinAllianceMember(characterId, allianceId);//加入联盟成员表
	   characterService.updateAlliance(characterId, allianceId, alliancePosition);//更新君主联盟状态
	   allianceMemberDao.deleteAllianceApplication(characterId,allianceId);//删除申请列表
	   String event = "{" + userCharacter.getName()+"} 加入联盟";
	   insertAllianceEvent(allianceId, new Date(), event);//插入该事件
		// 任务
		QuestService questService = (QuestService) ServiceLocator
				.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.JOIN_ALLIANCE, null,
				characterId);
   }
   /**
    * 成员拒绝和取消加入
    * @param characterId
    * @param allianceId
    */
   public void memberRefusedJoin(int characterId,int allianceId){
	   allianceMemberDao.deleteAllianceApplication(characterId,allianceId);
   }
   
   /**
    * 联盟查询申请列表
    * @param allianceId
    * @return
    * @throws AppException 
    */
   public Object getAllAllianceApplication(int characterId,int page) throws AppException{
	   Map< String ,Object> resultMap = new HashMap<String,Object>();
	   List<Object> retlist = new ArrayList<Object>();
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   MaincityService mainCityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
	   UserCharacter Character = characterService.getCharacterById(characterId);
	   
	   String privilegeNo="ga0007";//批准加入的特权编号
	   String position = Character.getAlliancePosition();//君主联盟职位
	   StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
	   StaticAlliancePrivilege staticAlliancePrivilege =AlliancePrivilegeCache.getStaticAlliancePrivilege(privilegeNo);//获取特权表
	   if(staticAlliancePosition.getAuthoLevel()>staticAlliancePrivilege.getNeedLevel()||position.equals("of0003")){
		   resultMap.put("isLight", true);
	   }else{
		   resultMap.put("isLight", false);
	   }
	   if(page < 1){
		   page = 1;
	   }
	   int amount = allianceMemberDao.getAllianceApplicationAomunt(Character.getAllianceId());
	   int pages = (amount-1+ALLIANCE_EVENT_AMOUNT)/ALLIANCE_EVENT_AMOUNT;
	   if(page>pages){
		   page = pages;
	   }
	   if(page ==0){
		   resultMap = new HashMap<String,Object>();
	   }else{
		   List<ApplicationList> allianceCharacterId = allianceMemberDao.getAllAllianceApplication(Character.getAllianceId(),(page-1)*ALLIANCE_EVENT_AMOUNT,ALLIANCE_EVENT_AMOUNT);
		   for(ApplicationList app : allianceCharacterId){
			   Map<String,Object> member = new HashMap<String,Object>();
			   if(app.getType()==1){
				   UserCharacter userCharacter = characterService.getCharacterById(app.getCharacterId()); 
//				   if(){}
				   Maincity mainCity = mainCityService.getMaincity(app.getCharacterId());
				   member.put("name", userCharacter.getName());
				   member.put("level", userCharacter.getLevel());
				   member.put("country", CountryCache.getNameById(userCharacter.getCountryId()));
				   member.put("maincitylevel", mainCity.getLevel());
				   member.put("reputation", userCharacter.getReputation());
				   member.put("CharacterId",app.getCharacterId());
				   
				   retlist.add(member);
			   }
		   }
		   resultMap.put("member", retlist);
	   }
	   resultMap.put("page", page);
	   resultMap.put("pages", pages);
	  
	return resultMap;
   }
   /**
    *批准加入该成员到联盟
    * @param characterId
    * @param allianceId
    * @param memberId
    * @throws AppException
    */
   public void joinAllianceMember(int characterId,int memberId) throws AppException{
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   UserCharacter userCharacter = characterService.getCharacterById(characterId); 
	   int userAllianceId = userCharacter.getAllianceId();
	   AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
	   Alliance alliance =  allianceService.getAllianceById(userAllianceId);
	   int num = alliance.getMemberAmount()+1;
	   if(!alliance.getCountry().equals(CountryCache.getNameById(userCharacter.getCountryId()))){// 判断联盟国家和君主国家是否相等
		   throw new AppException("该成员和联盟不在一个国家");
	   }
       String privilegeNo="ga0007";//批准加入的特权编号
	   String position = userCharacter.getAlliancePosition();//君主联盟职位
	   StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
	   StaticAlliancePrivilege staticAlliancePrivilege =AlliancePrivilegeCache.getStaticAlliancePrivilege(privilegeNo);//获取特权表
	   StaticAllianceGrade staticAllianceGrade = AllianceGradeCache.getStaticAllianceGrade(alliance.getLevel());//当前等级的升级信息
	   
	   if(staticAlliancePosition.getAuthoLevel()<staticAlliancePrivilege.getNeedLevel()){
		   throw new AppException("你没有权限操作");
	   }
	   UserCharacter memCharacter = characterService.getCharacterById(memberId); 
	   if(memCharacter.getAllianceId() != 0){
		   throw new AppException("该君主已经加入别的联盟");
	   }
	   if(staticAllianceGrade.getMemberLimit()<= alliance.getMemberAmount()){
		   throw new AppException("联盟成员已满");
	   }
	    List<Integer> allianceMemberId = allianceMemberDao.getAllAllianceMemberId(userAllianceId);
	    for(Integer allianceMember : allianceMemberId){
	    	if(allianceMember==memberId){
	    		 throw new AppException("已经有该成员");
	    	}
	    }
	    String alliancePosition = "of0007";//刚加入联盟职位为普通成员；
	    allianceMemberDao.joinAllianceMember(memberId,userAllianceId);//J加入成员
	    characterService.updateAlliance(memberId, userAllianceId, alliancePosition);//更新君主联盟状态
	    allianceMemberDao.deleteAllianceApplication(memberId,userAllianceId);//删除申请列表
	    allianceService.updateAllianceMemberNum(userAllianceId, num);
	    String event = "{" + memCharacter.getName()+"} 加入联盟";
	    insertAllianceEvent(userAllianceId, new Date(), event);//插入该事件
		// 任务
		QuestService questService = (QuestService) ServiceLocator
				.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.JOIN_ALLIANCE, null,
				characterId);
   }
   /**
    * 拒绝加入
    * @param characterId
    * @param memberId
    * @throws AppException
    */
   public void refusedJoin(int characterId,int memberId) throws AppException{
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   UserCharacter userCharacter = characterService.getCharacterById(characterId); 
	  // int userAllianceId = userCharacter.getAllianceId();
	   
	   String privilegeNo="ga0007";//批准加入的特权编号
	   String position = userCharacter.getAlliancePosition();//君主联盟职位
	   StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
	   StaticAlliancePrivilege staticAlliancePrivilege =AlliancePrivilegeCache.getStaticAlliancePrivilege(privilegeNo);//获取特权表
	   
	   if(staticAlliancePosition.getAuthoLevel()<staticAlliancePrivilege.getNeedLevel()){
		   throw new AppException("你没有权限操作");
	   }
	   allianceMemberDao.deleteAllianceApplication(memberId,userCharacter.getAllianceId());
	   String event = "{" + userCharacter.getName()+"} 拒绝加入联盟";
	   insertAllianceEvent(userCharacter.getAllianceId(), new Date(), event);//插入该事件
   }
   /**
    * 创建联盟时调用
    * @param characterId
    * @param allianceId
    */
   public void createAllianceMember(int characterId,int allianceId){
	   allianceMemberDao.joinAllianceMember(characterId, allianceId);
   }
   /**
    * 根据名称查看成员
    * @param memberName
    * @return
 * @throws AppException 
    */
   public UserCharacter getAllianceMemberByName(String memberName) throws AppException{
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   UserCharacter userCharacter = characterService.getCharacterByName(memberName);
	   if(userCharacter ==null){
		   throw new AppException("该成员不存在");
	   }
	return userCharacter;    
   }
   /**
    * 分页查询联盟成员
    * @param allianceId
    * @param page
    */
   public Object getAllAllianceMember(int characterId,int allianceId,int page){
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
	   UserCharacter userCharacter = characterService.getCharacterById(characterId);
	   
	   Map<String,Object> retMap = new HashMap<String,Object>();
	  
	   List<Object> retList = new ArrayList<Object>();
	   if(page < 1){
		   page = 1;
	   }
	   int amount = allianceMemberDao.getAllianceMemberAmount(allianceId);
	   int pages = (amount-1+MAX_ALLIANCE_MEMBER_AMOUNT)/MAX_ALLIANCE_MEMBER_AMOUNT;
	   if(page>pages){
		   page = pages;
	   }
	   List<AllianceMember> allianceMember = new ArrayList<AllianceMember>();
	   if(page == 0){
		   retMap.put("userCharacter", null);
	   }else{
		   allianceMember =  allianceMemberDao.getAllAllianceMember(allianceId,(page-1)*MAX_ALLIANCE_MEMBER_AMOUNT,MAX_ALLIANCE_MEMBER_AMOUNT);
		   for(AllianceMember member : allianceMember){
//			   int memberId = member.getCharacterId();
			   Map<String,Object> memberMap= new HashMap<String,Object>();
			   UserCharacter memberCharacter = characterService.getCharacterById(member.getCharacterId());
			   Maincity maincity = maincityService.getMaincity(member.getCharacterId());
			   StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(memberCharacter.getAlliancePosition());//获取职位等级表
			   memberMap.put("memberId", member.getCharacterId());
			   memberMap.put("name", memberCharacter.getName());
			   memberMap.put("level", memberCharacter.getLevel());
			   memberMap.put("position", staticAlliancePosition.getPositionName());//联盟职位；
			   memberMap.put("maincitylevel",maincity.getLevel());//主城等级
			   memberMap.put("prestige", memberCharacter.getReputation());//声望
			   memberMap.put("wealth", member.getWealth());//联盟财富
               memberMap.put("authoLevel",  AlliancePositionCache.getStaticAlliancePosition(memberCharacter.getAlliancePosition()).getAuthoLevel());//成员等级
               retList.add(memberMap);
		   }
		   retMap.put("memberCharacter", retList ); 
	   }
	   if(userCharacter.getAllianceId()!=0){
		   retMap.put("userCharacterAuthoLevel",  AlliancePositionCache.getStaticAlliancePosition(userCharacter.getAlliancePosition()).getAuthoLevel());
	   }
	   
	   retMap.put("page", page);
	   retMap.put("pages", pages);
	return retMap;
   }
   /**
    * 盟主禅让
    * @param characterId
    * @param allianceId
    * @param memberId
 * @throws AppException 
    */
   public void chiefDemise(int characterId,String name) throws AppException{
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   UserCharacter userCharacter =characterService.getCharacterById(characterId);//盟主
	   int allianceId = userCharacter.getAllianceId();
	   String privilegeNo="ga0002";//盟主禅让的特权编号
	   String position = userCharacter.getAlliancePosition();//君主联盟职位
	   StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
	   StaticAlliancePrivilege staticAlliancePrivilege =AlliancePrivilegeCache.getStaticAlliancePrivilege(privilegeNo);//获取特权表
	   
	   if(staticAlliancePosition.getAuthoLevel()<staticAlliancePrivilege.getNeedLevel()){
		   throw new AppException("你无权限操作");
	   }
	   UserCharacter member = characterService.getCharacterByName(name);//禅让的君主
	   if(member ==null){
		   throw new AppException("当前君主不存在，请检查君主名是否正确");
	   }
	   int memberId = member.getAllianceId();
	   if(allianceId != memberId){
		   throw new AppException("该成员和你不在一个联盟");
	   }
	   characterService.updateAlliance(characterId, allianceId, "of0007");//修改盟主为普通成员
	   characterService.updateAlliance(member.getId(), allianceId, "of0001");//修改该君主为盟主
	   allianceMemberDao.updateAllianceChief(allianceId, name);
	   String event = "盟主{"+userCharacter.getName()+"} 禅让给{"+member.getName()+"}";
	   insertAllianceEvent(allianceId,new Date(),event);
   }
   /**
    * 查询所有成员
    * @param allianceId
    * @return
    */
   public List<Integer> getAllAllianceMemberId(int allianceId){
	   return allianceMemberDao.getAllAllianceMemberId(allianceId);
   }
   /**
    * 成员退出
    * @param characterId
    * @throws AppException
    */
   public void quitAlliance(int characterId) throws AppException{
	   int allianceId = 0;//退出后联盟id为0；
	   CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	   AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
	   UserCharacter userCharacter = characterService.getCharacterById(characterId);
	   Alliance alliance = allianceService.getAllianceById(userCharacter.getAllianceId());
	   String position = userCharacter.getAlliancePosition();//君主联盟职位
	   StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
	   
	   if(staticAlliancePosition.getPositionNo().equals("of0001")){
		   throw new AppException("身为盟主不能退出");
	   }
	   
	   allianceMemberDao.deleteAllianceMember(characterId);
	   characterService.updateAlliance(characterId, allianceId, null);
	   allianceService.updateAllianceMemberNum(userCharacter.getAllianceId(), alliance.getMemberAmount()-1);
	   String event = " {"+userCharacter.getName()+"}  退出联盟";
	   insertAllianceEvent(userCharacter.getAllianceId(), new Date(), event);
   }
   /**
    * 盟主删除成员
    * @param characterId
    * @param memberId
    * @throws AppException
    */
  public void deleteAllianceMember(int characterId,int memberId) throws AppException{
//	  int allianceIid = allianceMemberDao.getWhereAllianceMember(characterId);
	  CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	  AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
	  UserCharacter userCharacter = characterService.getCharacterById(characterId); 
	  int userAllianceId = userCharacter.getAllianceId();
	  UserCharacter memberCharacter = characterService.getCharacterById(memberId); 
	  Alliance alliance = allianceService.getAllianceById(userAllianceId);
	 // StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);//获取职位等级表
	  
	  if(AlliancePositionCache.getStaticAlliancePosition(userCharacter.getAlliancePosition()).getAuthoLevel()<
		AlliancePositionCache.getStaticAlliancePosition(memberCharacter.getAlliancePosition()).getAuthoLevel()){
		  throw new AppException("你不能踢出职位高于自己的君主！！");
	  }
	  
	   if(characterId==memberId){
		   throw new AppException("不能踢出自己");
	   }
	   List<Integer> allianceMemberId = allianceMemberDao.getAllAllianceMemberId(userAllianceId);
	   Map<Object, Boolean> map  = new HashMap<Object,Boolean>();
	   map.put("isdelete", false);
	   for(int id : allianceMemberId){
		   if(id==memberId){
			   allianceMemberDao.deleteAllianceMember(memberId);
			   int allianceId = 0;//删除后联盟id为0；
			   characterService.updateAlliance(memberId, allianceId, null);//更新君主联盟信息
			   allianceService.updateAllianceMemberNum(userAllianceId, alliance.getMemberAmount()-1);//更新成员数量
			   String event = "盟主"+"  {"+userCharacter.getName()+"}    "+"删除成员"+"   {"+memberCharacter.getName()+"}";
			   insertAllianceEvent(userAllianceId, new Date(), event);
			   map.put("isdelete", true);
			   break;
		   }
	   }
	   if(!((boolean)map.get("isdelete"))){
		   throw new AppException("联盟没有该成员");
	   }
  }
  /**
   * 邀请成员加入
   * @param name
 * @throws AppException 
   */
  public void inviteMemberByName(int characterId,String name) throws AppException{
	  CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	  AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
	  UserCharacter userCharacter = characterService.getCharacterById(characterId);
	  int allianceId = userCharacter.getAllianceId();
	  Alliance alliance = allianceService.getAllianceById(allianceId);
	  UserCharacter memberCharacter = characterService.getCharacterByName(name);
	  if(alliance==null){
		  throw new AppException("你没有联盟");
	  }
	  StaticAllianceGrade staticAllianceGrade = AllianceGradeCache.getStaticAllianceGrade(alliance.getLevel());//当前等级的信息
	  if(memberCharacter == null){
		  throw new AppException("没有该君主");
	  }
	  if(memberCharacter.getAllianceId()!=0){
		  throw new AppException("该君主已有联盟，无法邀请");
	  }
	  String memberCountry = CountryCache.getNameById(memberCharacter.getCountryId());
	  if(!alliance.getCountry().equals(memberCountry)){
		  throw new AppException("该君主和你不在一个国家 , 无法邀请");
	  }
	  if(staticAllianceGrade.getMemberLimit()<=alliance.getMemberAmount()){
		  throw new AppException("当前联盟成员已达到上限，无法邀请");
	  }
	   List<ApplicationList> allianceApplication = allianceMemberDao.getApplicationByAllianceId(allianceId);  
	   for(ApplicationList aa : allianceApplication){
		   if(aa.getCharacterId()== memberCharacter.getId()&&aa.getType()==1){
			   throw new AppException("该君主已申请加入，请确认");
		   }
		   if(aa.getCharacterId()==memberCharacter.getId()&&aa.getType()==2){
			   throw new AppException("该君主已被邀请，请等待确认");
		   }
	   }
	  int type = 2;//邀请成员加入
	  allianceMemberDao.applyAllianceApplication(memberCharacter.getId(),allianceId,type);
	  String event = "{" + userCharacter.getName()+"} 邀请{"+ memberCharacter.getName()+"}加入联盟";
	   insertAllianceEvent(allianceId, new Date(), event);//插入该事件
  }
//  /**
//   * 禁言
//   * @param characterId
//   * @param memberId
// * @return 
//   * @throws AppException
//   */
//  public void closeSpeak(int characterId,int memberId) throws AppException{
//	  CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
//	  UserCharacter userCharacter = characterService.getCharacterById(characterId);
//	  UserCharacter memberCharacter = characterService.getCharacterById(memberId);
//	  
//	  if(userCharacter.getAlliancePosition()<=memberCharacter.getAlliancePosition()){
//		  throw new AppException("你不能向职位高于自己的君主禁言！！");
//	  }
//	  int speakStatus = 1;//禁言状态
//	  allianceMemberDao.uptadeAllianceMemberSpeakStatus(userCharacter.getAllianceId(), memberId, speakStatus, new Date());
//  }
///**
// *  查看禁言状态
// * @param allianceId
// * @param characterId
// * @return
// */
//  public boolean getAllianceMemberSpeakStatus(int allianceId,int characterId){
//	  int speakStatus = 1; //发言状态；
//	  long d = 42300000;//12小时*60分钟*60秒*1000毫秒；
//	  Map<String, Object> oldStatusTime = allianceMemberDao.getAllianceMemberSpeakStatusTime(allianceId, characterId);
//	  int oldstatus = (int) oldStatusTime.get("status");
//	  if(oldstatus==1){
//		  return true;
//	  }
//	  Date oldate = (Date) oldStatusTime.get("time");
//	  Date newdate =new Date();
//	  if(newdate.getTime()>=oldate.getTime()+d){
//		  allianceMemberDao.uptadeAllianceMemberSpeakStatus(allianceId, characterId, speakStatus, new Date());
//		  return true;
//	  }
//	return false;
//	  
//  }
  /**
   * 删除解散联盟队列
   * @param allianceId
   */
  public void deleteAllianceQueue(int allianceId){
	  allianceMemberDao.deleteAllianceQueue(allianceId);
  }
  /**
   * 删除联盟
   * @param allianceId
   */
  public void deleteAlliance(int allianceId){
	  allianceMemberDao.deleteAlliance(allianceId);
  }
  /**
   * 删除联盟所有成员
   * @param allianceId
   */
  public void deleteAllAllianceMember(int allianceId){
	  allianceMemberDao.deleteAllAllianceMember(allianceId);
  }
  /**
   * 获取所有联盟大事件
   * @param characterId
   * @return
   * @throws AppException 
   */
  public Map<String, Object> getAllianceEvent(int characterId,int page) throws AppException{
	  CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	  UserCharacter userCharacter = characterService.getCharacterById(characterId);
//	  if(){}
	  int allianceId = userCharacter.getAllianceId();
	  Map< String ,Object> resultMap = new HashMap<String,Object>();
	  if(page < 1){
		  page = 1;
	  }
	  int amount = allianceMemberDao.getAllianceEventAmount(allianceId);
	  int pages = (amount-1+ ALLIANCE_EVENT_AMOUNT)/ALLIANCE_EVENT_AMOUNT;
	  
	  if(page > pages){
		  page = pages;
	  }
	  List<AllianceEvent> allianceEvent = new ArrayList<AllianceEvent>();
	  if(page == 0){
		  resultMap.put("allianceEvent", null);
	  }else{
		  allianceEvent = allianceMemberDao.getAllianceEvent(allianceId ,(page-1)*ALLIANCE_EVENT_AMOUNT,ALLIANCE_EVENT_AMOUNT);
		  resultMap.put("allianceEvent", allianceEvent);
	  }
	
	  resultMap.put("page", page);
	  resultMap.put("pages", pages);
	  return resultMap;
  }
  /**
   * 更新君主联盟财富
   * @param allianceId
   * @param characterId
   * @param wealth
   */
  public void updateAllianceMemberWealth(int allianceId,int characterId,int wealth){
	  allianceMemberDao.updateAllianceMemberWealth(allianceId, characterId, wealth);
  }
  /**
   * 获取君主联盟财富
   * @param allianceId
   * @param characterId
   */
  public Integer  getAllianceMemberWealth(int allianceId,int characterId){
	  return allianceMemberDao.getAllianceMemberWealth(allianceId, characterId);
  }
  /**
   * 官员任免(官员任免按钮)
   * @param characterId
   * @param memberId
   * @return 
   * @throws AppException
   */
  public Map<String, Object> updatedPost(int characterId,int memberId) throws AppException{
	  CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	  UserCharacter userCharacter = characterService.getCharacterById(characterId);
	  UserCharacter menberCharacter = characterService.getCharacterById(memberId);
//	  if(AlliancePowerCache.getOfferset(userCharacter.getAlliancePosition())==0){
//		  throw new AppException("你没有权限操作");
//	  }
	  if(userCharacter.getAllianceId()!=menberCharacter.getAllianceId()){
		  throw new AppException("你们不在同一联盟！！！");
	  }
	  List<StaticAlliancePosition> staticAlliancePosition = AlliancePositionCache.getAllStaticAlliancePosition();//获取全部职位等级表
	  StaticAlliancePosition memberStaticAlliancePosition =AlliancePositionCache.getStaticAlliancePosition(menberCharacter.getAlliancePosition());
	  Map<String,Object> retMap = new HashMap<String,Object>();
	        retMap.put("staticAlliancePosition", staticAlliancePosition);//描述
	        retMap.put("memberName",menberCharacter.getName());//返回用户名字
	        retMap.put("memberPosition",memberStaticAlliancePosition.getPositionName() );//职位名称
	        retMap.put("userCharacterAuthoLevel",AlliancePositionCache.getStaticAlliancePosition(userCharacter.getAlliancePosition()).getAuthoLevel());
	        return retMap;
  }
 /**
  * 任命
  * @param characterId
  * @param memberId
  * @param position
  * @throws AppException
  */
  public void appointment(int characterId,int memberId, String position) throws AppException{
	  if(position.equals("of0001")){
		  throw new AppException("盟主不能别任命");
	  }
	  CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
	  UserCharacter userCharacter = characterService.getCharacterById(characterId);
	  UserCharacter memberCharacter = characterService.getCharacterById(memberId);
	  
	  StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(position);
	  StaticAlliancePosition userstaticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(userCharacter.getAlliancePosition());//获取职位等级表
	  StaticAlliancePosition memberstaticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(memberCharacter.getAlliancePosition());//获取职位等级表
	  
	  List<Integer> allianceMemberId = allianceMemberDao.getAllAllianceMemberId(userCharacter.getAllianceId());//联盟成员所有Id
	  if(userstaticAlliancePosition.getAuthoLevel()<=memberstaticAlliancePosition.getAuthoLevel()){
		  throw new AppException("你不能任命等级高于自己的君主！！！");
	  }
	  if(userstaticAlliancePosition.getAuthoLevel()<=staticAlliancePosition.getAuthoLevel()){
		  throw new AppException("你不能任命高于或等于自己的等级！！！");
	  }
	  int num = 0;
	  for(Integer allMemberId : allianceMemberId){
		  UserCharacter allMemberCharacter = characterService.getCharacterById(allMemberId);
		  StaticAlliancePosition allMemberstaticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(allMemberCharacter.getAlliancePosition());
		  if(allMemberstaticAlliancePosition.getPositionNo().equals("of0003")&&position.equals("ofo003")){
			  throw new AppException("内政官职位任免已满，任免失败");
		  }
		  if(allMemberstaticAlliancePosition.getPositionNo().equals("of0004")&&position.equals("ofo004")){
			  throw new AppException("科技官职位任免已满，任免失败");
		  }
		  if(allMemberstaticAlliancePosition.getPositionNo().equals("of0005")&&position.equals("ofo005")){
			  throw new AppException("战争官职位任免已满，任免失败");
		  }
		  if(allMemberstaticAlliancePosition.getPositionNo().equals("of0002")&&position.equals("ofo002")){
			  num+=1;
			  if(num>=2){
				  throw new AppException("副盟主职位任免已满，任免失败");
			  }
		  }
	  }
	
	  characterService.updateAlliance(memberId, memberCharacter.getAllianceId(), position);//更新君主联盟id , 职位；
	  String event = "{" + userCharacter.getName()+"} 任命{"+memberCharacter.getName()+"}为"+staticAlliancePosition.getPositionName();
	   insertAllianceEvent(userCharacter.getAllianceId(), new Date(), event);//插入该事件
  }
  
  public void insertAllianceEvent(int allianceId,Date completetime, String event){
	  allianceMemberDao.insertAllianceEvent(allianceId,completetime,event);
  }
  public List<Map<String,Object>> getAllyLocation(int characterId){
	  return allianceMemberDao.getAllyLocation(characterId);
  }
   public AllianceMemberDao getAllianceMemberDao() {
	return allianceMemberDao;
   }

   public void setAllianceMemberDao(AllianceMemberDao allianceMemberDao) { 
	this.allianceMemberDao = allianceMemberDao;
   }
   
}
