package com.crystalcg.gamedev.user.action;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.alliance.domain.Alliance;
import com.crystalcg.gamedev.alliance.service.AllianceMemberService;
import com.crystalcg.gamedev.alliance.service.AllianceService;
import com.crystalcg.gamedev.building.Job.BuildJob;
import com.crystalcg.gamedev.building.Job.DemolitionJob;
import com.crystalcg.gamedev.building.Job.UpgradeJob;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.domain.QueueBuilding;
import com.crystalcg.gamedev.building.service.BuildQueueService;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallHero;
import com.crystalcg.gamedev.buildingFunction.job.CellarProtectJob;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.cache.BuildCache;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.newChat.ChatConstants;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.resource.service.ResourceService;
import com.crystalcg.gamedev.user.domain.Account;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.AccountService;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.CookieUtil;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.AlliancePositionCache;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.CharacterCache;
import com.crystalcg.gamedev.util.cache.CityCache;
import com.crystalcg.gamedev.util.cache.CountryCache;
import com.crystalcg.gamedev.util.cache.ImageResourceCache;
import com.crystalcg.gamedev.util.cache.RankingCache;
import com.crystalcg.gamedev.util.cache.domain.StaticAlliancePosition;
import com.crystalcg.gamedev.world.WorldService;

@Controller
public class CharacterAction {
	
	private static Logger logger = LoggerFactory.getLogger(CharacterAction.class);
	private CharacterService characterService;
	private AccountService accountService;
	private MaincityService maincityService;
	/**
	 * 获得君主、主城信息，如果没有创建角色，返回空数据
	 * @param session
	 * @return Map<String,Object>
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/getUserInfo")
	@ResponseBody
	public Map<String,Object> getUserInfo(HttpSession session,HttpServletResponse response) throws UnsupportedEncodingException,AppException {
		Account account = (Account) session.getAttribute("account");
		Map<String, Object> retMap = new HashMap<String, Object>();
		//获取角色信息
		UserCharacter character = characterService.getCharacterById(account.getLastCharacterId());
		if (account.getLastCharacterId() == 0 || character == null) {
			logger.info("该账号没有建立角色，跳转到角色创建页面。");
			return retMap;
		} else {
			session.setAttribute("character", character);
			retMap.put("character", getCharacterViewMap(character));
			//获取主城信息
			Maincity maincity = maincityService.getMaincity(character.getId());
			retMap.put("maincity", getCityViewMap(maincity));
			initLogin(maincity);
			logger.info("获取角色["+character.getName()+"]成功，跳转到主页面。");
	
			//写cookie 用户名
			Cookie userName = new Cookie("userName",URLEncoder.encode(character.getName(),"utf-8") );
			userName.setPath("/");
			
//			Cookie characterId = new Cookie(ChatConstants.CHARACTER_ID_KEY, ""+character.getId());
//			userName.setPath("/");
			//联盟
			Cookie alliceId = new Cookie(ChatConstants.ALLIANCE_ID_Key,""+character.getAllianceId());
			userName.setPath("/");
			//记录当前登录用户映射信息
			ChatConstants.CLIENT_CHAT_MAP.put(character.getName(), ""+character.getId());
			response.addCookie(userName);
//			response.addCookie(characterId);
			response.addCookie(alliceId);
			return retMap;
		}
	}
	
	private Map<String,Object> getCharacterViewMap(UserCharacter character){
		Map<String,Object> characterMap = new HashMap<String,Object>();
		AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
		Alliance alliance = allianceService.getAllianceById(character.getAllianceId());
		characterMap.put("id", character.getId());
		characterMap.put("name", character.getName());
		characterMap.put("countryName", CountryCache.getNameById(character.getCountryId()));
		characterMap.put("image", character.getImage());
		characterMap.put("level", character.getLevel());
		characterMap.put("experience", character.getExperience());
		characterMap.put("experienceLimit",CharacterCache.getExperienceLimitByLevel(character.getLevel()));
		if(alliance==null){
			characterMap.put("allianceName", "无");
		}else{
			characterMap.put("allianceName", alliance.getName());
		}
		
		return characterMap;
	}
	
	private Map<String,Object> getCityViewMap(Maincity maincity){
		Map<String,Object> maincityMap = new HashMap<String,Object>();
		maincityMap.put("level", maincity.getLevel());
		maincityMap.put("experience", maincity.getExperience());
		maincityMap.put("experienceLimit", CityCache.getExperienceLimitByLevel(maincity.getLevel()));
		int experienceLimit = CityCache.getExperienceLimitByLevel(maincity.getLevel());
		boolean canLevelup = maincity.getExperience()>=experienceLimit;
		maincityMap.put("canLevelup", canLevelup);
		maincityMap.put("age", CityCache.getAgeByLevel(maincity.getLevel()));//主城的时代
		return maincityMap;
	}
	
	/**
	 * 创建角色
	 * @param name
	 * @param gender
	 * @param image
	 * @param countryName
	 * @param session
	 * @throws AppException
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/createCharacter")
	@ResponseBody
	public Object createCharacter(
			String name,
			int gender,
			String image,
			String countryName,
			HttpSession session,HttpServletResponse response) throws AppException, UnsupportedEncodingException {
		Account account = (Account) session.getAttribute("account");
		UserCharacter lastCharacter = characterService.getCharacterById(account.getLastCharacterId());
		if(account.getLastCharacterId() !=0 && lastCharacter != null){
			logger.info("建立角色失败， 该账号已创建角色 !");
			return new ClientError("建立角色失败， 该账号已创建角色 !");
		}
		int characterId = characterService.getCharacterIdByName(name);
		if (characterId != 0) {
			logger.info("建立角色失败， 角色名[" + name + "]已存在");
			return new ClientError("建立角色失败， 角色名[" + name + "]已存在");
		}
		UserCharacter character = new UserCharacter();
		character.setAccountId(account.getId());
		character.setName(name);
		character.setGender(gender);
		character.setImage(image);
		character.setCountryId(CountryCache.getIdByName(countryName));
		//新建账号
		characterService.insertCharacter(character);
		character = characterService.getCharacterByName(name);
		//关联account
		account.setLastCharacterId(character.getId());
		accountService.updateLastCharId(account);
		initCreate(character);
//		initLogin(character);
		session.setAttribute("character", character);
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("character", getCharacterViewMap(character));
		//获取主城信息
		Maincity maincity = maincityService.getMaincity(character.getId());
		retMap.put("maincity", getCityViewMap(maincity));
		logger.info("成功创建角色: " + name);
		CookieUtil.WriteUserCookie(response, character);
		return retMap;
		//以后单独写方法
		//用户登录成功，开启酒馆时钟任务
//		userHeroService.addTavernJob(character.getCharId());
		//用户登录成功，开启服务器时间刷新
//		refreshServerTime.createTimeChannel();
		//初始化城墙
	
//		//设置x ，y 第二步
//		characterService.updataWorldCell(character.getCharId(),character.getX(),character.getY());
	}
	
	/**
	 * 获取君主信息
	 * @param session
	 */
	@RequestMapping(value="getCharacterInfo")
	@ResponseBody
	public Object getCharacterInfo(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		int characterId = character.getId();
		character = characterService.getCharacterById(characterId);
		Maincity maincity = maincityService.getMaincity(characterId);
		WallDefensenService walldefensenService = (WallDefensenService) ServiceLocator.getSpringBean("walldefService");
		UserWallHero userWallHero = walldefensenService.getBaseWallHero(characterId);
		ResourceService resourceService = (ResourceService) ServiceLocator.getSpringBean("resourceService");
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
		AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
		Alliance alliance = allianceService.getAllianceById(character.getAllianceId());
		StaticAlliancePosition staticAlliancePosition = AlliancePositionCache.getStaticAlliancePosition(character.getAlliancePosition());
       
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("vipLevel", character.getVipId());
		retMap.put("image", character.getImage());
		retMap.put("name", character.getName());
		retMap.put("level", character.getLevel());
		retMap.put("cityLevel", maincity.getLevel());
		 if(alliance==null){
	        	retMap.put("allianceName", "无");//联盟
	        }else{retMap.put("allianceName", alliance.getName());}
		retMap.put("reputation", character.getReputation());
		retMap.put("countryName", CountryCache.getNameById(character.getCountryId()));
		retMap.put("coordinate", maincity.getX()+","+maincity.getY());
		if(RankingCache.getBuildMap(characterId)==null){
			retMap.put("ranking", "暂无排名");//排名
		}else{
			retMap.put("ranking", RankingCache.getBuildMap(characterId).get("rowNum"));//排名
		}
		retMap.put("experience", character.getExperience());
		retMap.put("experienceLimit",CharacterCache.getExperienceLimitByLevel(character.getLevel()));
		int cityExperienceLimit = 0;
		for(int i=1;i<maincity.getLevel();i++){
			cityExperienceLimit += CityCache.getExperienceLimitByLevel(i);
		}
		retMap.put("cityExperience", maincity.getExperience()+cityExperienceLimit);
		retMap.put("cityExperienceLimit", CityCache.getExperienceLimitByLevel(maincity.getLevel())+cityExperienceLimit);
		retMap.put("description", character.getDescription());
		retMap.put("abilityPoint", character.getAbilityPoint());
		retMap.put("internalAffairs", character.getInternalAffairs());
		retMap.put("militaryStrength", character.getMilitaryStrength());
		retMap.put("tributaryCity", new ArrayList<Object>());
		retMap.put("freePopulation", maincity.getPeople()-maincity.getWorkingPeople());//空闲人口
		retMap.put("popular", maincity.getPopularSupport());//民心
		retMap.put("soldier", maincity.getSoldier());//总兵
		retMap.put("conflictForces", 0);//冲突势力
		if(walldefensenService.getWallDefensenAmount(characterId)==null){
			retMap.put("defensen", 0);
		}else{
			retMap.put("defensen", walldefensenService.getWallDefensenAmount(characterId));//城防总数
		}
		retMap.put("matureResources",resourceService.getUserResourceCount(characterId, Const.FIELD_STATUS_ADULTNESS));//成熟资源
		retMap.put("userHeroAmount", userHeroService.getUserHeroAmount(characterId));//获取武将总数
		if(staticAlliancePosition!=null){
			retMap.put("alliancePosition", staticAlliancePosition.getPositionName());//联盟官职
		}else{retMap.put("alliancePosition","无");}//联盟官职
		
		if(userWallHero==null){
			 retMap.put("defensenCombat", 0);//城防战力
		}else{
			retMap.put("defensenCombat", userWallHero.getWallCombat());//城防战力
		}
		   
		    
		if(allianceMemberService.getAllianceMemberWealth(character.getAllianceId(), characterId)==null){
			retMap.put("allianceWealth", 0);
		}else{
			retMap.put("allianceWealth", allianceMemberService.getAllianceMemberWealth(character.getAllianceId(), characterId));//联盟财富
		}
		return retMap;
	}
	
	/**
	 * 查看君主属性
	 * @param session
	 * @param id
	 * @return
	 */
	@RequestMapping(value="getCharacterById")
	@ResponseBody
	public Object getCharacterById(HttpSession session,int id){
		UserCharacter character = characterService.getCharacterById(id);
		if(character == null){
			return new ClientError("未知的角色");
		}
		Maincity maincity = maincityService.getMaincity(id);
		AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
		Alliance alliance = allianceService.getAllianceById(character.getAllianceId());
		if(maincity == null){
			return new ClientError("该角色没有主城");
		}
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("vipLevel", character.getVipId());
		retMap.put("image", character.getImage());
		retMap.put("name", character.getName());
		retMap.put("level", character.getLevel());
		retMap.put("cityLevel", maincity.getLevel());
		 if(alliance==null){
	        	retMap.put("allianceName", "无");//联盟
	        }else{retMap.put("allianceName", alliance.getName());};//联盟暂时没有
		retMap.put("countryName", CountryCache.getNameById(character.getCountryId()));
		retMap.put("coordinate", maincity.getX()+","+maincity.getY());
		if(RankingCache.getBuildMap(id)==null){
			retMap.put("ranking", "暂无排名");//排名
		}else{
			retMap.put("ranking", RankingCache.getBuildMap(id).get("rowNum"));//排名
		}
		retMap.put("characterId", id);//君主id
		int cityExperienceLimit = 0;
		for(int i=1;i<maincity.getLevel();i++){
			cityExperienceLimit += CityCache.getExperienceLimitByLevel(i);
		}
		retMap.put("cityExperience", maincity.getExperience()+cityExperienceLimit);
		retMap.put("description", character.getDescription());
		retMap.put("tributaryCity", new ArrayList<Object>());
		return retMap;
	}
	
	/**
	 * 更新描述
	 * @param session
	 * @param description
	 * @return
	 */
	@RequestMapping(value="updateCharacterDescription")
	@ResponseBody
	public Object updateCharacterDescription(HttpSession session,String description){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		int characterId = character.getId();
		characterService.updateDescription(characterId, description);
		Map<String,String> retMap = new HashMap<String, String>();
		retMap.put("status", "success");
		return retMap;
	}
	
	/**
	 * 分配潜能点
	 * @return
	 */
	@RequestMapping(value="updateCharacterAttribute")
	@ResponseBody
	public Object updateCharacterAttribute(HttpSession session,int addMilitaryStrength,int addInternalAffairs){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		int characterId = character.getId();
		try {
			characterService.updateAttribute(characterId, addMilitaryStrength, addInternalAffairs);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		Map<String,String> retMap = new HashMap<String, String>();
		retMap.put("status", "success");
		return retMap;
	}
	
	/**
	 * 修改君主名
	 * @param characterId
	 * @param name
	 */
	@RequestMapping(value="updateCharacterName")
	@ResponseBody
	public Object updateName(HttpSession session,String name){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		int characterId = character.getId();
		try {
			characterService.updateName(characterId,name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("status", "success");
		return retMap;
	}
	
	/**
	 * 修改所属国家
	 * @param characterId
	 * @param countryId
	 * @throws SQLException 
	 * @throws AppException 
	 */
	@RequestMapping(value="updateCharacterCountry")
	@ResponseBody
	public Object updateCountry(HttpSession session,int countryId) throws AppException, SQLException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		return characterService.updateCountry(character, countryId);
	}
	
	/**
	 * 修改君主头像
	 * @param characterId
	 * @param image
	 */
	@RequestMapping(value="updateCharacterImage")
	@ResponseBody
	public Object updateImage(HttpSession session,String imageName) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		return characterService.updateUserImage(character, imageName);
	}
	/**
	 * 获得系统(初始)头像
	 */
	@RequestMapping(value="/getSystemPic")
	@ResponseBody 
	public Object getSystemPic(){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("male", ImageResourceCache.getPicByName(Const.SEX_MAIE));
		retMap.put("female", ImageResourceCache.getPicByName(Const.SEX_FEMALE));
		return retMap;
	}
	/**
	 *根据自己性别加载所有可用头像
	 * @param session
	 * @return
	 */
	@RequestMapping(value="getAllSystemPic")
	@ResponseBody
	public Object getAllPic(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		Object obj = ImageResourceCache.getPic(character.getGender());
		return obj;
	}

	/**
	 * 城池升级
	 * @param session
	 * @return
	 */
	@RequestMapping(value="maincityLevelup")
	@ResponseBody
	public Object levelUp(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		try {
			Maincity city = maincityService.levelUp(character.getId());
			int age = CityCache.getAgeByLevel(city.getLevel());
			BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
			List<Building> list = buildingService.getAllBuildingsByCharacterId(character.getId());
			Map<Integer,String> images = new HashMap<Integer, String>();
			for(Building b: list){
				images.put(b.getLocation(), b.getView().getImg()+"_"+age);
			}
			Map<String,Object> retMap = getCityViewMap(city);
			retMap.put("images", images);
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	/**
	 * 初始化登录
	 * （创建角色成功之后 自动登录）
	 * 开启酒馆时钟，开启服务器时间刷新等
	 */
	private void initLogin(Maincity maincity) throws AppException{
		//用户登录成功，开启酒馆时钟任务
//		userHeroService.addTavernJob(character.getCharId());
		//用户登录成功，开启服务器时间刷新
//		refreshServerTime.createTimeChannel();
		//地窖job
		loadCellar(maincity);
		//建筑队列
		loadBuilding(maincity);
		//更新登录时间
		characterService.updateLoginTime(maincity.getCharacterId(), new Date());
		//初始化任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.initUserQuest(maincity.getCharacterId());
	}
	
	/**
	 * 创建角色时初始化角色信息（资源、建筑、人口、兵种、科技、城防建筑等）
	 * @param character
	 */
	private void initCreate(UserCharacter character) throws AppException{
		initBuilding(character.getId());
		maincityService.createMaincity(character.getId());
		if(!WorldService.divCoor(character.getId(), character.getCountryId())){
			logger.error("分配坐标失败");
		}
		//新角色初始化任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.initUserQuestForNew(character.getId());
	}
	
	/**
	 * 创建角色时新建太尉府、城墙
	 * @param characterId
	 */
	private void initBuilding(int characterId){
		Building official = new Building();
		official.setBuildingNo(Const.OFFICAIL_BUILDING_NO);
		official.setCharacterId(characterId);
		official.setLevel(BuildingCache.getBuildingEntityByNo(Const.OFFICAIL_BUILDING_NO).getLevel());
		official.setLocation(Const.OFFICIAL_INDEX);
		Building wall = new Building();
		wall.setBuildingNo(Const.WALL_BUILDING_NO);
		wall.setCharacterId(characterId);
		wall.setLevel(BuildingCache.getBuildingEntityByNo(Const.OFFICAIL_BUILDING_NO).getLevel());
		wall.setLocation(Const.WALL_INDEX);
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		buildingService.insertBuilding(official);
		buildingService.insertBuilding(wall);
	}
	
	/**
	 * 角色登陆时 开启地窖保护job
	 * @param characterId
	 */
	private void loadCellar(Maincity maincity){
		int characterId = maincity.getCharacterId();
		if(maincity.getCellarStartTime() == null && maincity.getCellarLastTime() == 0){
			logger.info(characterId+" 地窖没有开启保护");
		}else{
			Map<String,Object> data = new HashMap<String,Object>();
			data.put("characterId", characterId);
			if(!ExecuteJob.checkExists(characterId+"_cellarProtect")){
				ExecuteJob.add(CellarProtectJob.class, data, maincity.getCellarStartTime().getTime()+maincity.getCellarLastTime()*3600*1000, characterId+"_cellarProtect");
			}
			logger.info(characterId+" 地窖开启保护 start=" + maincity.getCellarStartTime() +",last=" + maincity.getCellarLastTime());
		}
	}
	
	/**
	 * 角色登陆时 加载未完成的建筑
	 */
	@SuppressWarnings("unchecked")
	private void loadBuilding(Maincity maincity){
		int characterId = maincity.getCharacterId();
		BuildQueueService buildQueueService = (BuildQueueService) ServiceLocator.getSpringBean("buildQueueService");
		List<QueueBuilding> list = buildQueueService.getAllQueueBuildings(characterId);
		@SuppressWarnings("rawtypes")
		Class clazz = null;
		for(QueueBuilding queueBuilding : list){
			switch(queueBuilding.getStatus()){
			case 1:
				clazz = BuildJob.class;
				break;
			case 2:
				clazz = UpgradeJob.class;
				break;
			case 3:
				clazz = DemolitionJob.class;
				break;
			default:
				logger.error(queueBuilding.getStatus()+" <--未知的建筑状态");
				return;
			}
			//传递给JOB的数据
			Map<String,Object> data = new HashMap<String, Object>();
			data.put("queueBuilding", queueBuilding);
			//更新服务器缓存
			if(BuildCache.getBuilding(characterId, queueBuilding.getLocation()) == null){
				BuildCache.setBuilding(queueBuilding,Const.BUILD_NUM);
			}
			//开启Job
			if(!ExecuteJob.checkExists(characterId+"_build_"+queueBuilding.getLocation())){
				ExecuteJob.add(clazz, data, queueBuilding.getStartTime().getTime()+queueBuilding.getTime()*1000,characterId+"_build_"+queueBuilding.getLocation());
			}
			logger.error(Const.getBuildingStatusDesc(queueBuilding.getStatus())+":"+queueBuilding.getCurrentBuildingNo()+"->"+queueBuilding.getTargetBuildingNo());
		}
	}
	/**
	 * 根据城主id判断与自己是否是同盟/联盟
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="isAlliance")
	@ResponseBody
	public Object isAlliance(HttpSession session,int targetId) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("请先登录");
		}
		UserCharacter target = characterService.getCharacterById(targetId);
		return characterService.isAlliance(target,character);
	}
//	private void setLocation(UserCharacter character){
//		int xl = 700;
//		int yl = 448;
//		Random rand = new Random();
//		Map<String , Integer> param = new HashMap<String,Object>();
//		int x;
//		int y;
//		DataEntity temp ;
//		do{
//			x = rand.nextInt(xl);
//			y = rand.nextInt(yl);
//			param.put("x", x);
//			param.put("y", y);
//			temp = characterService.getCell(param);
//		}while(temp.getX()!=0&&temp.getY()!=0);
//		character.setX(x);
//		character.setY(y);
//	}

	public CharacterService getCharacterService() {
		return characterService;
	}

	public void setCharacterService(CharacterService characterService) {
		this.characterService = characterService;
	}

	public AccountService getAccountService() {
		return accountService;
	}

	public void setAccountService(AccountService accountService) {
		this.accountService = accountService;
	}

	public MaincityService getMaincityService() {
		return maincityService;
	}

	public void setMaincityService(MaincityService maincityService) {
		this.maincityService = maincityService;
	}
	
}
