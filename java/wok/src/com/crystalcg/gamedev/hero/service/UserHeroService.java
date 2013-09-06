package com.crystalcg.gamedev.hero.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.buildingFunction.service.CollegeService;
import com.crystalcg.gamedev.hero.dao.UserHeroDao;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.FloatUtil;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.CentrestageCache;
import com.crystalcg.gamedev.util.cache.HeroLevelCache;
import com.crystalcg.gamedev.util.cache.HeroSkillCache;
import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;

public class UserHeroService {
	
	private UserHeroDao userHeroDao;
	//匹配数字、英文字母、汉字
	final private static Pattern pattern = Pattern.compile("[0-9a-zA-Z一-龥]{3,6}");
	final private static int PAGE_SIZE = 28;//每页装备数量
	private static final int MAX_GIFT = 30;

	public void insertUserHero(UserHero userHero) {
		userHeroDao.insertUserHero(userHero);
	}

	public UserHero getUserHero(int characterId,int id) {
		return userHeroDao.getUserHero(characterId,id);
	}
	/**
	 *  获得玩家所有武将集合(已附加所有状态属性)
	 * @param characterId
	 * @return
	 * @throws AppException
	 */
	public List<UserHero> getAllUserHero(int characterId) throws AppException {
		List<UserHero> list = userHeroDao.getAllUserHero(characterId);
		for(UserHero uh : list){
			HeroAlgorithm.computeAttribute(uh);
		}
		return list;
	}
	/**
	 * 获得玩家所有有职位的武将集合
	 * @param characterId
	 * @return
	 */
	public List<UserHero> getRankUserHero(int characterId){
		List<UserHero> list = userHeroDao.getAllUserHero(characterId);
		List<UserHero> RankHeroList = new ArrayList<UserHero>();
		for(UserHero hero:list){
			if(CentrestageCache.getRankByNo(hero.getRankNo()) == null){
				continue;
			}
			RankHeroList.add(hero);
		}
		return RankHeroList;
	}
	/**
	 * 获取用户某一官职的武将（聚贤阁）
	 * @param characterId
	 * @return
	 */
	public List<UserHero> getAllUserHeroByRankNo(int characterId,String rankNo) {
		return userHeroDao.getAllUserHeroByRankNo(characterId,rankNo);
	}
	
	/**
	 * 获取玩家拥有的武将名字
	 * @param characterId
	 * @return
	 */
	public List<Map<String, Object>> getUserHeroName(int characterId){
		return userHeroDao.getUserHeroName(characterId);
	}
	
	/**
	 * 更新武将状态
	 * @param uh
	 */
	public void updateHeroStatus(UserHero uh) {
		userHeroDao.updateHeroStatus(uh);
	}
	/**
	 * 更新武将状态
	 * @param characterId
	 * @param id
	 * @param heroStatus
	 */
	public void updateHeroStatus(int characterId, int id, int heroStatus) {
		UserHero uh = new UserHero();
		uh.setCharacterId(characterId);
		uh.setId(id);
		uh.setHeroStatus(heroStatus);
		userHeroDao.updateHeroStatus(uh);
	}
	
	/**
	 * 更新武将官职
	 * @param uh
	 */
	public void updateHeroRank(UserHero uh) {
		userHeroDao.updateHeroRank(uh);
	}
	
	/**
	 * 更新武将体力、精力
	 * @param uh
	 */
	public void updateHeroStaminaMp(UserHero uh) {
		userHeroDao.updateHeroStaminaMp(uh);
	}
	
	/**
	 * 武将改名
	 * @param id
	 * @param name
	 * @throws AppException 
	 */
	public void modifyHeroName(int characterId,int id,String name) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		if(name == null){
			throw new AppException("请输入武将名");
		}
		name = name.trim();
		if(name.equals(hero.getHeroName())){
			throw new AppException("请输入一个不同的名字");
		}
		if(name.length()<3||name.length()>6){
			throw new AppException("名字长度为3~6");
		}
		if(!validateName(name)){
			throw new AppException("名字包含非法字符");
		}
		userHeroDao.modifyHeroName(characterId,id,name);
	}
	
	/**
	 * 提升武将等级
	 * @param id
	 * @throws AppException 
	 */
	public UserHero levelup(int characterId,int id) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		int expLimit = HeroLevelCache.getExpLimit(hero.getLevel());
		if(hero.getExp()<expLimit){
			throw new AppException("经验不足");
		}
		hero.setExp(hero.getExp()-expLimit);
		hero.setLevel(hero.getLevel()+1);
		double attrs = HeroAlgorithm.getAttribute(hero.getGift());
		double unit = attrs/(hero.getPrimaryForce()+hero.getPrimaryStrategy()+hero.getPrimaryPhysique()+hero.getPrimaryAgility());
		hero.setHeroForce(hero.getHeroForce()+hero.getPrimaryForce()*unit);
		hero.setStrategy(hero.getStrategy()+hero.getPrimaryStrategy()*unit);
		hero.setPhysique(hero.getPhysique()+hero.getPrimaryPhysique()*unit);
		hero.setAgility(hero.getAgility()+hero.getPrimaryAgility()*unit);
		int quality = HeroAlgorithm.getQualityByGift(hero.getGift());
		int point = HeroAlgorithm.getPoint(quality);
		hero.setPoint(hero.getPoint()+point);
		userHeroDao.levelup(hero);
		HeroAlgorithm.computeAttribute(hero);
		return hero;
	}
	
	/**
	 * 为武将提升根骨
	 * @param id
	 * @throws AppException 
	 */
	public UserHero addGift(int characterId,int id) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		//判断消耗的材料
		//判断概率
		if(hero.getGift()>= MAX_GIFT){
			throw new AppException("已达到根骨上限，当前根骨上限为30");
		}
		hero.setGift(hero.getGift()+0.1);
		userHeroDao.addGift(characterId,id,hero.getGift());
		HeroAlgorithm.computeAttribute(hero);
		return hero;
	}
	
	/**
	 * 分配潜能点
	 * @throws AppException 
	 */
	public UserHero distributePoint(int characterId,int id,int force,int strategy,int physique,int agility) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		if(hero.getPoint()<1){
			throw new AppException("没有足够的潜能点");
		}
		int sum = force+strategy+physique+agility;
		if(sum>hero.getPoint()){
			throw new AppException("没有足够的潜能点");
		}
		if(force<0||strategy<0||physique<0||agility<0){
			throw new AppException("不能为负数");
		}
		hero.setPoint(hero.getPoint()-sum);
		hero.setForcePoint(hero.getForcePoint()+force);
		hero.setStrategyPoint(hero.getStrategyPoint()+strategy);
		hero.setPhysiquePoint(hero.getPhysiquePoint()+physique);
		hero.setAgilityPoint(hero.getAgilityPoint()+agility);
		userHeroDao.distributePoint(hero);
		HeroAlgorithm.computeAttribute(hero);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.ADD_HERO_POINT, null, characterId);
		return hero;
	}
	
	/**
	 * 洗髓（重置潜能点）
	 * @throws AppException 
	 */
	public UserHero resetPoint(int characterId,int id) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		int sum = hero.getForcePoint()+hero.getStrategyPoint()+hero.getPhysiquePoint()+hero.getAgilityPoint();
		if(sum==0){
			throw new AppException("没有分配潜能点");
		}
		//to-do
		//消耗的材料
		hero.setForcePoint(0);
		hero.setStrategyPoint(0);
		hero.setPhysiquePoint(0);
		hero.setAgilityPoint(0);
		hero.setPoint(hero.getPoint()+sum);
		userHeroDao.distributePoint(hero);
		HeroAlgorithm.computeAttribute(hero);
		return hero;
	}
	
	/**
	 * 武将穿戴装备（如果该位置有装备则替换）
	 * @throws AppException 
	 */
	public UserHero addEquipment(int characterId,int id,int equipId) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		UserEquipment ue = userItemService.getUserEquipmentById(equipId);
		if(ue == null||ue.getEquipment()==null){
			throw new AppException("未知的装备");
		}
		if(ue.getItemPosition()!=Const.POSITION_BAG){
			throw new AppException("错误的装备位置");
		}
		if(ue.getHeroUseId()!=0){
			throw new AppException("该装备已被其他武将装备");
		}
		if(ue.getEquipmentType()==1&&hero.getHeroType()!=ue.getEquipment().getWeaponType()){
			throw new AppException("该装备此武将不能装备");
		}
		
		//有原装备则替换
		List<UserEquipment> lue = userItemService.getUserEquipmentOnHero(characterId,ue.getEquipment().getEquipmentType(), id);
		for(UserEquipment e : lue){
			userItemService.heroRemoveEuipment(characterId, e.getId());
		}
		userItemService.heroAddEquipment(characterId, equipId, id);
		HeroAlgorithm.computeAttribute(hero);
		double staminaMax=hero.getStaminaMax();
		double stamina = hero.getStamina();
		if(staminaMax<stamina){
			stamina = staminaMax;
			hero.setStamina(stamina);
			hero.setMp(hero.getMp());
		}
		updateHeroStaminaMp(hero);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.HERO_USE_EQUIPMENT, null, characterId);
		return hero;
	}
	
	/**
	 * 卸下装备
	 * @throws AppException 
	 */
	public UserHero removeEquipment(int characterId,int id,int equipId) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		UserEquipment ue = userItemService.getUserEquipmentById(equipId);
		if(ue==null){
			throw new AppException("无此装备");
		}
		userItemService.heroRemoveEuipment(characterId, equipId);
		HeroAlgorithm.computeAttribute(hero);
		double staminaMax=hero.getStaminaMax();
		double stamina = hero.getStamina();
		if(staminaMax<stamina){
			stamina = staminaMax;
			hero.setStamina(stamina);
			hero.setMp(hero.getMp());
		}
		updateHeroStaminaMp(hero);
		return hero;
	}
	
	/**
	 * 卸下全部装备
	 * @throws AppException 
	 */
	public UserHero removeAllEquipment(int characterId,int id) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		userItemService.heroRemoveAllEuipment(characterId, id);
		HeroAlgorithm.computeAttribute(hero);
		double staminaMax=hero.getStaminaMax();
		double stamina = hero.getStamina();
		if(staminaMax<stamina){
			stamina = staminaMax;
			hero.setStamina(stamina);
			hero.setMp(hero.getMp());
		}
		updateHeroStaminaMp(hero);
		return hero;
	}
	
	/**
	 * 更新武将体力(治疗)
	 * @param uh
	 * @throws AppException 
	 */
	public int cureHeroStamina(int characterId,int id) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		HeroAlgorithm.computeAttribute(hero);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		int medicine = maincityService.getMaincity(characterId).getMedicine();
		int needMedicine = HeroAlgorithm.computeStaminaNeedMedicine(hero);
		if(medicine==0){
			throw new AppException("没有膏药");
		}
		double stamina;
		if(needMedicine<=medicine){
			medicine = needMedicine;
			stamina = hero.getStaminaMax();
		}else{
			medicine = 0;
			stamina = (hero.getStaminaMax()-hero.getStamina())*medicine/needMedicine+hero.getStamina();
		}
		hero.setStamina(stamina);
		maincityService.updateMedicine(characterId, medicine);
		userHeroDao.updateHeroStaminaMp(hero);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.CURE_HERO, null, characterId);
		return (int)stamina;
	}
	
	/**
	 * 更新武将精力(治疗)
	 * @throws AppException 
	 */
	public int updateHeroMp(int characterId,int id) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		HeroAlgorithm.computeAttribute(hero);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		int medicine = maincityService.getMaincity(characterId).getMedicine();
		int needMedicine = HeroAlgorithm.computeMpNeedMedicine(hero);
		if(medicine==0){
			throw new AppException("没有膏药");
		}
		double mp;
		if(needMedicine<=medicine){
			medicine = needMedicine;
			mp = hero.getMpMax();
		}else{
			medicine = 0;
			mp = (hero.getMpMax()-hero.getMp())*medicine/needMedicine+hero.getMp();
		}
		hero.setMp(mp);
		maincityService.updateMedicine(characterId, medicine);
		userHeroDao.updateHeroStaminaMp(hero);
		return (int)mp;
	}
	
	/**
	 * 武将获得经验(放在经验池中)
	 * @throws AppException 
	 */
	public void addExp(int characterId,int id,int exp) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		int poolLimit = HeroLevelCache.getPoolLimit(hero.getLevel());
		if(exp+hero.getExp()>=poolLimit){
			userHeroDao.updateExp(characterId,id,poolLimit);
		}else{
			userHeroDao.updateExp(characterId,id,exp+hero.getExp());
		}
	}
	/**
	 * 给武将加军功
	 * @throws AppException 
	 */
	public void addExploit(int characterId,int id,int exploit) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		hero.setExploit(hero.getExploit()+exploit);
		userHeroDao.updateUserHeroExploit(hero);
	}
	
	/**
	 * 获取装备页
	 * @param characterId
	 * @param page
	 * @return
	 */
	public Map<String,Object> getEquipmentPage(int characterId,int page) throws AppException{
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		Map<String,Object> retMap = new HashMap<String, Object>();
		if(userItemService == null){
			return retMap;
		}
		int amount = userItemService.getAllUserEquipmentAmountInBag(characterId);
		int pages = (amount+PAGE_SIZE-1)/PAGE_SIZE;
		if(page<1){
			page = 1;
		}
		if(page>pages){
			page = pages;
		}
		int start = (page-1)*PAGE_SIZE;
		List<UserEquipment> equipments = null;
		if(amount!=0){
			equipments = userItemService.getAllUserEquipmentByPage(characterId,start,PAGE_SIZE);
		}
		retMap.put("equipments",changeEquipment(equipments));
		retMap.put("pages", pages);
		retMap.put("page", page);
		return retMap;
	}
	
	/**
	 * 获取武将技能
	 * @param characterId
	 * @param id
	 */
	public List<Map<String,Object>> getHeroSkill(int characterId,int id){
		CollegeService collegeService = (CollegeService) ServiceLocator.getSpringBean("collegeService");
		List<Map<String,Object>> skills = null;
		if(collegeService!=null){
			skills = collegeService.getUserHeroSkills(characterId, id);
		}
		return skills;
	}
	
	/**
	 * 获取武将身上的装备
	 * @param characterId
	 * @param id
	 * @return
	 */
	public List<Map<String, Object>> getHeroEquipments(int characterId,int id) throws AppException{
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		List<UserEquipment> equipList = null;
		if(userItemService != null){
			equipList = userItemService.getUserEquipmentOnHero(characterId, 0, id);
		}
		return changeEquipment(equipList);
	}
	private final List<Map<String, Object>> changeEquipment(List<UserEquipment> equipments) throws AppException{
		if(equipments==null){
			return null;
		}
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp ;
		for(UserEquipment i:equipments){
			temp = new HashMap<String,Object>();
			temp.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(i));
			temp.put("icon", i.getEquipment().getIcon());
			temp.put("type", i.getItemType());
			temp.put("id", i.getId());
			retList.add(temp);
		}
		return retList;
	}
	/**
	 * 查询武将信息，用于出征选择武将
	 * @param characterId
	 * @param page
	 * @param pageSize
	 * @return
	 */
	public List<UserHero> getUserHeroForBattle(int characterId, int page, int pageSize){
		Map<String, Object> param = new HashMap<String,Object>();
		param.put("characterId", characterId);
		param.put("page", page);
		param.put("pageSize", pageSize);
		return userHeroDao.getUserHeroForBattle(param);
	}
	/**
	 * 获取武将信息，排除出征状态，用于配兵界面
	 * @param characterId
	 * @return
	 */
	public List<UserHero> getUserHeroWithOutBattle(int characterId){
		return userHeroDao.getUserHeroWithOutBattle(characterId);
	}
	public int getUserHeroAmount(int characterId){
		return userHeroDao.getUserHeroAmount(characterId);
	}
	
	/**
	 * 解雇武将
	 * @throws AppException 
	 */
	public void fireHero(int characterId,int id) throws AppException{
		UserHero hero = getUserHero(characterId, id);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		if(hero.getHeroStatus() != Const.HERO_STATUS_FREE){
			throw new AppException("武将不是空闲状态");
		}
		List<Map<String, Object>> equipList = getHeroEquipments(characterId, id);
		if(equipList == null){
			throw new AppException("未安装道具服务");
		}
		if(equipList.size()!=0){
			throw new AppException("请先卸下武将身上的装备");
		}
		userHeroDao.deleteHero(characterId,id);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.HERO_EMPLOY, null, characterId);
	}
	
	/**
	 * 升级技能
	 * @throws AppException 
	 */
	public void upgradeSkill(int characterId,int heroId,String skillNo) throws AppException{
		UserHero hero = getUserHero(characterId, heroId);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		StaticHeroSkill hse = HeroSkillCache.getHeroSkill(skillNo);
		if(hse == null){
			throw new AppException("未知的技能");
		}
		String[] strArray = hse.getSkillNo().split("_");
		String next = strArray[0]+"_"+(Integer.valueOf(strArray[1])+1);
		StaticHeroSkill nextHe = HeroSkillCache.getHeroSkill(next);
		if(nextHe == null){ 
			throw new AppException("该技能已经升至顶级");
		}
		if(hero.getExp()<nextHe.getUpgradeNeedExp()){
			throw new AppException("经验不足");
		}
		userHeroDao.updateExp(characterId, heroId, hero.getExp()-nextHe.getUpgradeNeedExp());
		userHeroDao.updateHeroSkill(characterId,heroId,skillNo,next);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.HERO_SKILL_LEVEL, null, characterId);
	}
	
	/**
	 * 遗忘技能
	 * @throws AppException 
	 */
	public void forgetSkill(int characterId,int heroId,String skillNo) throws AppException{
		UserHero hero = getUserHero(characterId, heroId);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		StaticHeroSkill hse = HeroSkillCache.getHeroSkill(skillNo);
		if(hse == null){
			throw new AppException("未知的技能");
		}
		userHeroDao.deleteHeroSkill(characterId,heroId,skillNo);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.HERO_SKILL_LEVEL, null, characterId);
		questService.updateQuestSchedule(QuestTargeType.HERO_SKILL_AMOUNT, null, characterId);
	}
	
	/**
	 * 提升根骨弹出窗口
	 * @throws AppException 
	 */
	public Map<String,Object> getGiftInfo(int characterId,int heroId) throws AppException{
		UserHero hero = getUserHero(characterId, heroId);
		if(hero == null){
			throw new AppException("未知的武将");
		}
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("heroName", hero.getHeroName());
		retMap.put("gift", FloatUtil.format(hero.getGift(),1));
		retMap.put("needItem", "根骨丹");
		retMap.put("amount", 10);
		retMap.put("successRate", "100%");
		return retMap;
	}
	
	/**
	 * 验证武将名字是否合法
	 * @param name
	 * @return
	 */
	private static boolean validateName(String name){
		Matcher m = pattern.matcher(name);
		return m.matches();
	}
	
	/**
	 * 获取武将配兵的总和
	 * @param characterId
	 * @return
	 */
	public int getSoldierSum(int characterId){
		Integer sum = userHeroDao.getSoldierSum(characterId);
		if(sum == null){
			return 0;
		}else{
			return sum.intValue();
		}
	}
	/**
	 * 更新武将带的兵种和数量
	 * @param userHero
	 */
	public void updateUserHeroSoldier(UserHero userHero){
		userHeroDao.updateUserHeroSoldier(userHero);
	}
	/**
	 * 根据玩家君主id和武将id字符串（用“,”分割）获得相应武将基本信息
	 * @param characterId
	 * @param HeroIdList
	 * @param viewAll 
	 * @return
	 */
	public List<Map<String,Object>> getHeroByHeroIdStr(int characterId,String HeroIdList, boolean viewAll){
		List<Map<String,Object>> userHeros = new ArrayList<Map<String,Object>>();
		if(!viewAll){
			return userHeros;
		}
    	UserHero userHero = null;
    	Map<String,Object> heroMap = null;
    	String heroType = null;
    	UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
    	for(String heroId:HeroIdList.split(",")){
    		if(!heroId.isEmpty() && !"0".equals(heroId)){
    			userHero = userHeroService.getUserHero(characterId,Integer.parseInt(heroId));
    			if(userHero != null){
    				heroMap = new HashMap<String, Object>();
    				heroMap.put("heroName", userHero.getHeroName());
    				heroMap.put("heroLevel", userHero.getLevel());
    				if(userHero.getHeroType() == Const.HERO_TYPE_IMMORTAL){
    					heroType = "仙师";
    				}else if(userHero.getHeroType() == Const.HERO_TYPE_TIANCE){
    					heroType = "天策";
    				}else{
    					heroType = "白羽";
    				}
    				heroMap.put("heroType", heroType);
    				if(userHero.getSoldierNo() != null && !userHero.getSoldierNo().isEmpty()){
    					heroMap.put("soldierType", SoldierCache.getSoldierByNo(userHero.getSoldierNo()).getSoldierName());
    				}else{
    					heroMap.put("soldierType","");
    				}
    				heroMap.put("soldierAmount", userHero.getSoldierAmount());
				    userHeros.add(heroMap);
    			}
    		}
    	}
    	return userHeros;
	}
	/**
	 * 获取全部武将
	 * @return
	 */
	public List<UserHero> getAllHero(){
		return userHeroDao.getAllHero();
	}
	public UserHeroDao getUserHeroDao() {
		return userHeroDao;
	}

	public void setUserHeroDao(UserHeroDao userHeroDao) {
		this.userHeroDao = userHeroDao;
	}

}
