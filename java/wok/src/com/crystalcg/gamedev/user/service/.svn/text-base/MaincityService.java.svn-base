package com.crystalcg.gamedev.user.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.buildingFunction.domain.UserCellar;
import com.crystalcg.gamedev.buildingFunction.service.CellarService;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.user.dao.MaincityDao;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.LockUtil;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ResourceMath;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.CityCache;
import com.crystalcg.gamedev.world.DataEntity;
import com.crystalcg.gamedev.world.WorldDao;

/**
 * @author xuzhongxing
 *
 */
public class MaincityService {
	
	private static final int MAX_CITY_LEVEL = 11;
	
	private MaincityDao maincityDao;
//	private static Logger logger = LoggerFactory.getLogger(MaincityService.class);
	/**
	 * 创建角色时创建主城
	 * @param characterId
	 */
	public void createMaincity(int characterId){
		Maincity maincity = new Maincity();
		Date now = new Date();
		maincity.setCharacterId(characterId);
//		maincity.setX(x);
//		maincity.setY(y);
		maincity.setPeopleLastIncrease(now);
		maincity.setMoneyLastIncrease(now);
		maincity.setMedicineLastIncrease(now);
		maincityDao.insertMaincity(maincity);
	}
	
	/**
	 * 获取主城
	 */
	public Maincity getMaincity(int characterId){
		Maincity maincity = maincityDao.getMaincity(characterId);
		if(maincity == null){
			return null;
		}
		//初始化时间
		Date now = new Date();
		long lastMoneyIncrease = now.getTime();
		long lastPeopleIncrease = now.getTime();
		long lastMedicineIncrease = now.getTime();
		//上次增长时间
		if(maincity.getMoneyLastIncrease() != null){
			lastMoneyIncrease = maincity.getMoneyLastIncrease().getTime();
		}
		if(maincity.getMedicineLastIncrease() != null){
			lastPeopleIncrease = maincity.getPeopleLastIncrease().getTime();
		}
		if(maincity.getPeopleLastIncrease() != null){
			lastMedicineIncrease = maincity.getMedicineLastIncrease().getTime();
		}
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		long peopleLimit = interiorTech.getValueAfterEffect(InteriorTechEffectType.PEAPLE_LIMIT, maincity.getPeopleLimit(), characterId);
//		maincity.setPeopleLimit((int)peopleLimit);
		//计算增量
		//时间
		long moneys = (now.getTime()-lastMoneyIncrease)/1000;
		long peoples = (now.getTime()-lastPeopleIncrease)/1000;
		long medicines = (now.getTime()-lastMedicineIncrease)/1000;
		//每秒增长
		double moneyps = ResourceMath.getMoneyIncrease(maincity.getPeople(), maincity.getLevel(), characterId);
		double peopleps = ResourceMath.getPeopleIncrease(characterId, (int)peopleLimit);
		double medicineps = ResourceMath.getMedicineIncrease(characterId, maincity.getMedicineLimit());
		//增量
		long moneyIncrease = (long)(moneyps*moneys);
		moneyIncrease = interiorTech.getValueAfterEffect(InteriorTechEffectType.MONEY_VOLUME_OF_PRODUCTION,moneyIncrease , characterId);
		
		long peopleIncrease = (long)(peopleps*peoples);
		peopleIncrease = interiorTech.getValueAfterEffect(InteriorTechEffectType.PEOPLE_INCREASE_SPEED, peopleIncrease, characterId);
		
		long medicineIncrease = (int)(medicineps*medicines);
		medicineIncrease = interiorTech.getValueAfterEffect(InteriorTechEffectType.MEDICINE_INCREASE_SPEED, medicineIncrease, characterId);
		//修改铜币
		if(maincity.getMoney() + moneyIncrease>maincity.getMoneyLimit()){
			maincity.setMoney(maincity.getMoneyLimit());
		}else{
			maincity.setMoney(maincity.getMoney() + moneyIncrease);
		}
		updateMoney(characterId, maincity.getMoney(),null);
		//修改人口
		if(maincity.getPeople() + peopleIncrease > peopleLimit){
			maincity.setPeople((int)peopleLimit);
		}else{
			maincity.setPeople(maincity.getPeople() + (int)peopleIncrease);
		}
		updatePeople(characterId, maincity.getPeople());
		//修改膏药
		if(maincity.getMedicine() + medicineIncrease>maincity.getMedicineLimit()){
			maincity.setMedicine(maincity.getMedicineLimit());
		}else{
			maincity.setMedicine(maincity.getMedicine() + (int)medicineIncrease);
		}
		updateMedicine(characterId, maincity.getMedicine());
		//更新时间
		updateIncreaseTime(characterId, now);
		return maincity;
	}
	
	public Maincity levelUp(int characterId) throws AppException{
		Maincity city = getMaincity(characterId);
		
		if(city == null){
			throw new AppException("未知的城池");
		}
		if(city.getLevel()==MAX_CITY_LEVEL){
			throw new AppException("城池等级已达到最高级");
		}
		int experienceLimit = CityCache.getExperienceLimitByLevel(city.getLevel());
		if(experienceLimit == -1){
			throw new AppException("不可升级");
		}
		if(city.getExperience()<experienceLimit){
			throw new AppException("经验不足");
		}
		city.setExperience(city.getExperience()-experienceLimit);
		city.setLevel(city.getLevel()+1);//等级+1
		maincityDao.updateLevel(characterId,city.getLevel(),city.getExperience());
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.CITY_LEVEL, null, characterId);
		return city;
	}
	
	/**
	 * 获取主城基本信息
	 */
	public Maincity getBaseInfo(int characterId){
		return maincityDao.getBaseInfo(characterId);
	}
////////////////////////////// 资源 /////////////////////
	/**
	 * 获取全部资源和上限
	 */
//	private Maincity getResource(int characterId){
//		return maincityDao.getResource(characterId);
//	}
	
	/**
	 * 获取建筑所需4种资源
	 */
//	private Maincity getBuildResource(int characterId){
//		return maincityDao.getBuildResource(characterId);
//	}
	
	/**
	 * 更新建筑资源
	 */
	public void updateBuildResource(int characterId,long money,long wood,long stone,long ironore){
		maincityDao.updateBuildResource(characterId, money, wood, stone, ironore);
		pushUserResource(characterId);
	}
	
	/**
	 * 更新城郊资源
	 */
	public void updateSuburbsResource(int characterId,long food,long wood,long stone,long ironore){
		maincityDao.updateSuburbsResource(characterId, food, wood, stone, ironore);
		pushUserResource(characterId);
	}
	/**
	 * 更新铜币 
	 * @param characterId
	 * @param money
	 * @param updateMoneyTime 需要更新铜币更新时间时传入
	 */
	public void updateMoney(int characterId,long money,Date updateMoneyTime){
		maincityDao.updateMoney(characterId,money,updateMoneyTime);
		pushUserResource(characterId);
	}
	
	/**
	 * 更新粮食
	 */
	public void updateFood(int characterId,long food){
		maincityDao.updateFood(characterId, food);
		pushUserResource(characterId);
	}
	
	/**
	 * 更新木材
	 */
	public void updateWood(int characterId,long wood){
		maincityDao.updateWood(characterId, wood);
		pushUserResource(characterId);
	}
	
	/**
	 * 更新石料
	 */
	public void updateStone(int characterId,long stone){
		maincityDao.updateStone(characterId, stone);
		pushUserResource(characterId);
	}
	
	/**
	 * 更新铁锭
	 */
	public void updateIronore(int characterId,long ironore){
		maincityDao.updateIronore(characterId, ironore);
		pushUserResource(characterId);
	}
	
	/**
	 * 更新铜币上限，太尉府等级改变之后调用
	 */
	public void updateMoneyLimit(int characterId,long moneyLimit){
		maincityDao.updateMoneyLimit(characterId, moneyLimit);
		pushUserResource(characterId);
	}
	
	/**
	 * 更新除铜币外的资源上限，国库等级改变之后更新
	 */
	public void updateResourceLimit(int characterId,long foodLimit,long woodLimit,long stoneLimit,long ironoreLimit){
		maincityDao.updateResourceLimit(characterId, foodLimit, woodLimit, stoneLimit, ironoreLimit);
		pushUserResource(characterId);
	}
	
	public void updateCellarLimit(int characterId,long cellarLimit){
		maincityDao.updateCellarLimit(characterId, cellarLimit);
	}
////////////////////// 城池等级 繁荣度 手动升级 /////////////////////////
	/**
	 * 更新繁荣度，或者提升等级,如果等级提升，推送消息
	 */
	public void addExperience(int characterId,int addExperience){
		Maincity maincity = getMaincity(characterId);
		maincityDao.updateExperience(characterId,addExperience+maincity.getExperience());
	}
//////////////////// 正常、被打、流亡  ////////////////////////////////
	/**
	 * 更新状态
	 */
	public void updateStatus(int characterId,int status){
		maincityDao.updateStatus(characterId, status);
	}
////////////// 世界坐标 //////////////////////////
	/**
	 * 更新坐标,包括使用道具，更新世界信息 该算法写在世界操作中
	 */
	public void updateCoordinate(int characterId,int x,int y){
		maincityDao.updateCoordinate(characterId, x, y);
	}
//////////////// 人口 /////////////////////////	
	/**
	 * 获取空闲人口
	 */
//	private Maincity getFreePeople(int characterId){
//		return maincityDao.getFreePeople(characterId);
//	}
	
	/**
	 * 获取人口信息，工作人口，总人口，人口上限
	 */
//	private Maincity getPeopleInfo(int characterId){
//		return maincityDao.getPeopleInfo(characterId);
//	}
	
	/**
	 * 更新工作人口
	 */
	public void updateWorkingPeople(int characterId,int workingPeople){
		maincityDao.updateWorkingPeople(characterId, workingPeople);
	}
	
	/**
	 * 更新人口
	 */
	public void updatePeople(int characterId,int people){
		maincityDao.updatePeople(characterId, people);
	}
	
	/**
	 * 更新人口上限
	 * @param characterId
	 * @param peopleLimit
	 */
	public void updatePeopleLimit(int characterId,int peopleLimit){
		maincityDao.updatePeopleLimit(characterId, peopleLimit);
	}
	
////////////////////// 兵种 //////////////////////////
	/**
	 * 获取兵种信息：新兵/上限，总兵/上限
	 */
	public Maincity getSoldierInfo(int characterId){
		return maincityDao.getSoldierInfo(characterId);
	}
	
	/**
	 * 更新新兵数量
	 */
	public void updateNewSoldier(int characterId,int newSoldier){
		maincityDao.updateNewSoldier(characterId, newSoldier);
	}
	
	/**
	 * 更新总兵数量 
	 */
	public void updateSoldier(int characterId,int soldier){
		maincityDao.updateSoldier(characterId, soldier);
	}
	
	/**
	 *  更新新兵上限，总兵上限 
	 */
	public void updateSoldierLimit(int characterId, int soldierLimit){
		maincityDao.updateSoldierLimit(characterId, soldierLimit);
	}
	
	public void updateNewSoldierLimit(int characterId,int newSoldierLimit){
		maincityDao.updateNewSoldierLimit(characterId,newSoldierLimit);
	}
///////////////////// 膏药 //////////////////////////
	/**
	 * 获取膏药信息 数量/上限
	 */
//	private Maincity getMedicineInfo(int characterId){
//		return maincityDao.getMedicineInfo(characterId);
//	}
	
	/**
	 * 更新膏药数量
	 */
	public void updateMedicine(int characterId,int medicine){
		maincityDao.updateMedicine(characterId, medicine);
	}
	
	/**
	 * 更新膏药上限
	 */
	public void updateMedicineLimit(int characterId,int medicineLimit){
		maincityDao.updateMedicineLimit(characterId, medicineLimit);
	}
///////////////////////// 民心 ///////////////////////////
	/**
	 * 更新民心
	 */
	public void updatePopularSupport(int characterId,int popularSupport){
		maincityDao.updatePopularSupport(characterId, popularSupport);
	}
////////////////////////////////// 综合 ///////////////////
//	private Maincity getHouseInfo(int characterId){
//		return maincityDao.getHouseInfo(characterId);
//	}
	
	/**
	 * 更新地窖状态（开启保护）
	 * @throws AppException 
	 */
	public void beginCellarProtect(int characterId,Date cellarStartTime,int cellarLastTime
			,int cellarMoney,int cellarFood,int cellarWood,int cellarStone,int cellarIronore) throws AppException{
		maincityDao.beginCellarProtect(characterId, cellarStartTime, cellarLastTime, cellarMoney, cellarFood, cellarWood, cellarStone, cellarIronore);
	}
	
	/**
	 * 更新地窖状态（取消保护）
	 */
	public void cancelCellarProtect(int characterId){
		maincityDao.cancelCellarProtect(characterId,null,0);
	}
	
	/**
	 * 更新铜币、人口、药膏时间
	 * @param characterId
	 * @param now
	 */
	public void updateIncreaseTime(int characterId,Date now){
		maincityDao.updateIncreaseTime(characterId,now);
	}

///////////////////////// 推送资源 /////////////////////////////
	/**
	 *  获取用户全部资源和上限，用于comet推送
	 * @param characterId 角色Id
	 * @return
	 */
	public Map<String, Object> getResourceForComet(int characterId){
		return maincityDao.getResourceForComet(characterId);
	}
	/**
	 * 对玩家进行资源推送，资源发生变化时调用此方法
	 * @param characterId 玩家角色Id 
	 */
	private void pushUserResource(int characterId){
		UserComet userComet = (UserComet) ServiceLocator.getSpringBean("userComet");
		userComet.publishToGameChannel(Const.GAME_CHANNEL_RESOURCE_UPDATE, characterId, getResourceForComet(characterId));
	}
	/**
	 * 迁城（无条件验证）
	 * @param targetX 目标城市x坐标
	 * @param targetY 目标城市y坐标
	 * @param character 迁城的君主
	 * @return
	 * @throws SQLException 
	 * @throws AppException 
	 */
	public boolean changeMap(int targetX,int targetY,UserCharacter character,boolean isLocal) throws SQLException, AppException{
		DataEntity data = WorldDao.getDataEntityByXY(targetX, targetY);
		if(data == null){
			throw new AppException("目标城市不存在,无法迁入");
		}else if(data.getTp() != Const.WORLD_CITY_NUSED){
			throw new AppException("目标城市已经被占用,无法迁入");
		}else if(isLocal && data.getCt() != character.getCountryId()){
			throw new AppException("目标城市不在本国中,无法迁入");
		}
		Maincity city = getBaseInfo(character.getId());
		//修改world表
		//将原来城市地址还原成建城点
		WorldDao.changeWorld(city.getX(),city.getY(), Const.WORLD_CITY_NUSED,0);
		//修改新的建城点
		WorldDao.changeWorld(targetX,targetY, Const.WORLD_CITY_USED,character.getId());
		//修改城主坐标
		updateCoordinate(character.getId(),targetX,targetY);
		return true;
	}
	
	public MaincityDao getMaincityDao() {
		return maincityDao;
	}
////////////get set//////////////////////////////////////
	public void setMaincityDao(MaincityDao maincityDao) {
		this.maincityDao = maincityDao;
	}

	public void updateSoldierAndResource(int characterId,int newSoldier, int soldier,
			long money, long food, long ironore) {
		maincityDao.updateSoldierAndResource(characterId,newSoldier, soldier, money, food, ironore);
		
	}
	/**
	 *  迁城（国内）
	 * @param character
	 * @param area数组（不定项参数，第一个it传x坐标，第二y坐标）
	 * @throws AppException 
	 * @throws SQLException 
	 */
	public Object saveMoveCity(UserCharacter character,int...area) throws AppException, SQLException {
		Map<String,String> ret = new HashMap<String, String>();
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		DataEntity selectData = new DataEntity();
		if(area.length == 0){
			if(!userItemService.useOneItem(Const.CITY_CHANGE, character.getId())){
				throw new AppException("对不起，你没有足够的迁城令，请购买");
			}
			List<DataEntity> dataList = WorldDao.getDataEntityByType(Const.WORLD_CITY_NUSED, character.getCountryId());
			selectData = dataList.get(new Random().nextInt(dataList.size()));
			ret.put("msg", "消耗迁城令一个,国家迁入成功");
		}else{
			if(!userItemService.useOneItem(Const.CITYHIGHT_CHANGE, character.getId())){
				throw new AppException("对不起，你没有足够的高级迁城令，请购买");
			}
			selectData.setX(area[0]);
			selectData.setY(area[1]);
			ret.put("msg", "消耗高级迁城令一个,国家迁入成功");
		}
		this.changeMap(selectData.getX(), selectData.getY(), character,true);
		ret.put("status", "success");
		return ret;
	}
	/**
	 * 增加人口
	 * @param characterId
	 * @param speedType 加速方式
	 * @param itemNo
	 * @param confim
	 * @return
	 * @throws AppException 
	 */
	public Object addPeople(int characterId, int speedType, String itemNo,int confim) throws AppException {
		Maincity maincity = this.getMaincity(characterId);
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		int peopleLimit = (int)interiorTech.getValueAfterEffect(InteriorTechEffectType.PEAPLE_LIMIT, maincity.getPeopleLimit(), characterId);
		int remainPeople = peopleLimit - maincity.getPeople();
		if(remainPeople <= 0){
			throw new AppException("人口已达最大值,无法继续增加人口");
		}else if(confim == 0){
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			return userItemService.spendWindow(Const.SPEND_FUNCTION_PEOPLE, characterId, remainPeople);
		}
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		int addPeople = characterService.saveSpeedNow(speedType,Const.SPEND_FUNCTION_PEOPLE,  characterId, itemNo,(int)remainPeople);
		if(addPeople == -1){//秒cd
			updatePeople(characterId, peopleLimit);
			addPeople = remainPeople;
		}else{
			updatePeople(characterId, maincity.getPeople() + addPeople);
		}
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("addPeople", addPeople);
		map.put("state", "success");
		return map;
	}
	/**
	 * 增加民心
	 * @param characterId
	 * @param speedType 加速方式
	 * @param itemNo
	 * @param confim
	 * @return
	 * @throws AppException 
	 */
	public Object addPopularSupport(int characterId, int speedType, String itemNo,int confim) throws AppException {
		Maincity maincity = this.getMaincity(characterId);
		int popularSupport = Const.POPULAR_SUPPORT_LIMIT - maincity.getPopularSupport();
		if(popularSupport <= 0){
			throw new AppException("民心已达上限,无法继续增加");
		}
		if(confim == 0){
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			return userItemService.spendWindow(Const.SPEND_FUNCTION_POPUSUP, characterId, popularSupport);
		}
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		int addSupport = characterService.saveSpeedNow(speedType,Const.SPEND_FUNCTION_POPUSUP,  characterId, itemNo,popularSupport);
		if(addSupport == -1){//秒cd
			updatePopularSupport(characterId,Const.POPULAR_SUPPORT_LIMIT);
			addSupport = popularSupport;
		}else{
			updatePeople(characterId, maincity.getPopularSupport() + addSupport);
		}
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("addSupport", addSupport);
		map.put("state", "success");
		return map;
	}
	/**
	 * 根据君主id获得该君主当前时间内可被掠夺的资源集合
	 * 资源编号---可掠夺数量
	 * @param characterId
	 * @return
	 */
	public Map<Integer,Long> getLossingResources(int characterId){
		Map<Integer,Long> resources = new HashMap<Integer, Long>();
		Maincity maincity = this.getMaincity(characterId);
		resources.put(Const.CELLAR_PROTECTION_FOOD, maincity.getFood());
		resources.put(Const.CELLAR_PROTECTION_IRONORE, maincity.getIronore());
		resources.put(Const.CELLAR_PROTECTION_STONE, maincity.getStone());
		resources.put(Const.CELLAR_PROTECTION_WOOD, maincity.getWood());
		resources.put(Const.CELLAR_PROTECTION_MONEY, maincity.getMoney());
		CellarService cellarService = (CellarService)ServiceLocator.getSpringBean("cellarService");
		List<UserCellar> protectedResource = cellarService.getCellarProtectList(characterId);
		if(protectedResource != null && !protectedResource.isEmpty()){
			Date date = new Date();
			for(UserCellar cell : protectedResource){
				if(!cell.getProtectionTime().before(date) && cell.getProtectionAmount() > 0){
					resources.put(cell.getProtectionNo(), resources.get(cell.getProtectionNo()) - cell.getProtectionAmount());
				}
			}
		}
		return resources;
	}
	/**
	 * 增加粮食，返回是否达到上限
	 * @param characterId
	 * @param food
	 * @return 
	 */
	public boolean addFood(int characterId,long food){
		Maincity maincity = this.getBaseInfo(characterId);
		long cur_Food = this.getBaseInfo(characterId).getFood();
		long limit_Food = maincity.getFoodLimit();//上限
		long now_Food = 0;
		boolean isLimitTop = false;
		if(cur_Food + food >= limit_Food){
			now_Food = limit_Food; 
			isLimitTop = true;
		}else if(cur_Food + food <= 0){
			now_Food = 0;
		}else{
			now_Food = cur_Food + food;
		}
		if(food != 0){
			this.updateFood(characterId, now_Food);
		}
		return isLimitTop;
	}
	/**
	 * 增加木材，返回是否达到上限
	 * @param characterId
	 * @param Wood
	 * @return 
	 */
	public boolean addWood(int characterId,long Wood){
		Maincity maincity = this.getBaseInfo(characterId);
		long cur_Wood = this.getBaseInfo(characterId).getWood();
		long limit_Wood = maincity.getWoodLimit();//上限
		long now_Wood = 0;
		boolean isLimitTop = false;
		if(cur_Wood + Wood >= limit_Wood){
			now_Wood = limit_Wood; 
			isLimitTop = true;
		}else if(cur_Wood + Wood <= 0){
			now_Wood = 0;
		}else{
			now_Wood = cur_Wood + Wood;
		}
		if(Wood != 0){
			this.updateWood(characterId, now_Wood);
		}
		return isLimitTop;
	}
	/**
	 * 增加石料，返回是否达到上限
	 * @param characterId
	 * @param Stone
	 * @return 
	 */
	public boolean addStone(int characterId,long Stone){
		Maincity maincity = this.getBaseInfo(characterId);
		long cur_Stone = this.getBaseInfo(characterId).getStone();
		long limit_Stone = maincity.getStoneLimit();//上限
		long now_Stone = 0;
		boolean isLimitTop = false;
		if(cur_Stone + Stone >= limit_Stone){
			now_Stone = limit_Stone; 
			isLimitTop = true;
		}else if(cur_Stone + Stone <= 0){
			now_Stone = 0;
		}else{
			now_Stone = cur_Stone + Stone;
		}
		if(Stone != 0){
			this.updateStone(characterId, now_Stone);
		}
		return isLimitTop;
	}
	/**
	 * 增加铁锭，返回是否达到上限
	 * @param characterId
	 * @param Ironore
	 * @return 
	 */
	public boolean addIronore(int characterId,long Ironore){
		Maincity maincity = this.getBaseInfo(characterId);
		long cur_Ironore = this.getBaseInfo(characterId).getIronore();
		long limit_Ironore = maincity.getIronoreLimit();//上限
		long now_Ironore = 0;
		boolean isLimitTop = false;
		if(cur_Ironore + Ironore >= limit_Ironore){
			now_Ironore = limit_Ironore; 
			isLimitTop = true;
		}else if(cur_Ironore + Ironore <= 0){
			now_Ironore = 0;
		}else{
			now_Ironore = cur_Ironore + Ironore;
		}
		if(Ironore != 0){
			this.updateIronore(characterId, now_Ironore);
		}
		return isLimitTop;
	}
	/**
	 * 增加铜币，返回是否达到上限
	 * @param characterId
	 * @param Money
	 * @return 
	 */
	public boolean addMoney(int characterId,long Money){
		Maincity maincity = this.getBaseInfo(characterId);
		long cur_Money = this.getMoney(characterId);
		long limit_Money = maincity.getMoneyLimit();//上限
		long now_Money = 0;
		boolean isLimitTop = false;
		if(cur_Money + Money >= limit_Money){
			now_Money = limit_Money; 
			isLimitTop = true;
		}else if(cur_Money + Money <= 0){
			now_Money = 0;
		}else{
			now_Money = cur_Money + Money;
		}
		if(Money != 0){
			this.updateMoney(characterId, now_Money,new Date());
		}
		return isLimitTop;
	}
	/**
	 * 获得mony总接口（5分钟向数据库更新一次）
	 * @param characterId
	 * @return
	 */
	public long getMoney(int characterId){
		Maincity maincity = this.getBaseInfo(characterId);
		long now_Money = 0;
		long cur_Money = maincity.getMoney();
		long limit_Money = maincity.getMoneyLimit();//上限
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		long difTime = 0;//距离上次money增长时间相差秒数
		//上次增长时间
		if(maincity.getMoneyLastIncrease() != null){
			difTime = (new Date().getTime() - maincity.getMoneyLastIncrease().getTime())/1000;
		}
		//每秒增长
		double moneyps = ResourceMath.getMoneyIncrease(maincity.getPeople(), maincity.getLevel(), characterId);
		//增量
		long moneyIncrease = (long)(moneyps*difTime);
		moneyIncrease = interiorTech.getValueAfterEffect(InteriorTechEffectType.MONEY_VOLUME_OF_PRODUCTION,moneyIncrease , characterId);
		now_Money = moneyIncrease + cur_Money;
		if(now_Money >= limit_Money){
			now_Money = limit_Money;
		}
		if(difTime >= 60*5){//相差大于5*60秒时更新数据库
			synchronized (LockUtil.getLock(characterId, "money")) {
				maincity = this.getBaseInfo(characterId);
				difTime = (new Date().getTime() - maincity.getMoneyLastIncrease().getTime())/1000;
				if(difTime < 60*5){
					return now_Money;
				}
				this.updateMoney(characterId, now_Money,new Date());
			}
		}
		return now_Money;
	}
}
