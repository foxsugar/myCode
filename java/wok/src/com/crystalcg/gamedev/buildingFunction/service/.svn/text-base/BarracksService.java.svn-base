package com.crystalcg.gamedev.buildingFunction.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.buildingFunction.dao.BarracksDao;
import com.crystalcg.gamedev.buildingFunction.domain.UserSoldier;
import com.crystalcg.gamedev.buildingFunction.domain.UserSoldierQueue;
import com.crystalcg.gamedev.buildingFunction.job.BarraksJob;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.tech.domain.InteriorTechEffectType;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.tech.service.SoldierTechService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.SoldierTechCache;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldierTech;

/**
 * 兵营内的一些操作，不包含战斗死亡。建造、拆除、升级完不在此处
 * @author xuzhongxing
 *
 */
/**
 * @author xuzhongxing
 *
 */
public class BarracksService {
	static{
		//开服加载士兵训练任务
		addAllUserSoldierJob();
	}
	
	private BarracksDao barracksDao;
//	private static Logger logger = LoggerFactory.getLogger(BarracksService.class);
	
	/**
	 * 进入兵营界面：新兵数/上限，统兵数/上限，当前科技兵阶，当前拥有兵数(不包含武将带兵)
	 */
	public Map<String,Object> initBarracks(int characterId){
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		//科技
		SoldierTechService soldierTechService = (SoldierTechService) ServiceLocator.getSpringBean("soldierTechService");
		List<String> userSoldierTechNo = soldierTechService.getUserSoldierTech(characterId);
		List<Map<String,Object>> techSoldier = SoldierTechCache.getUserSoldiers(userSoldierTechNo);
		//用户现有兵种
		List<UserSoldier> userSoldier = barracksDao.getUserSoldier(characterId);
		//正在训练信息
		Map<String,Object> train = new HashMap<String,Object>();
		UserSoldierQueue queue = getUserSoldierQueue(characterId);
		if(queue == null){
			train.put("soldierNo", null);
			train.put("soldierName", "无");
			train.put("remainedTime", 0);
		}else{
			train.put("soldierNo", queue.getSoldierNo());
			train.put("soldierName", queue.getSoldierName());
			long remainedTime = queue.getStartTime().getTime()+queue.getTime()-System.currentTimeMillis();
			if(remainedTime<0){
				remainedTime = 0;
			}
			train.put("remainedTime", remainedTime);
		}
		//返回值
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("summary", getSummaryView(maincity,characterId));
		retMap.put("resource", getResourceView(maincity));
		retMap.put("userSoldier", userSoldier);
		retMap.put("techSoldier", techSoldier);
		retMap.put("train", train);
		return retMap;
	}
	
	/**
	 * 兵种数量/上限
	 * @param maincity
	 * @return
	 */
	private Map<String,Long> getSummaryView(Maincity maincity,int characterId){
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		Map<String,Long> summary = new HashMap<String, Long>();
		summary.put("soldier", (long) maincity.getSoldier());
		summary.put("soldierLimit", interiorTech.getValueAfterEffect(InteriorTechEffectType.SOLDIER_LIMIT,  maincity.getSoldierLimit(), characterId) );
		summary.put("newSoldier",  (long)maincity.getNewSoldier());
		summary.put("newSoldierLimit", (long) maincity.getNewSoldierLimit());
		return summary;
	}
	
	/**
	 * 资源
	 * @param maincity
	 * @return
	 */
	private Map<String,Long> getResourceView(Maincity maincity){
		Map<String,Long> resource = new HashMap<String, Long>();
		resource.put("money", maincity.getMoney());
		resource.put("food", maincity.getFood());
		resource.put("ironore", maincity.getIronore());
		return resource;
	}
	
	/**
	 * 招募成功：返回新的新兵数量、总兵数量（不改变上限），新增或修改当前拥有兵种,修改资源
	 * 招募失败：没有对应兵种、资源不足、达到上限
	 * @param session
	 * @param soldierId
	 * @param amount
	 * @return
	 */
	public Map<String,Object> recruitSoldier(int characterId,String soldierNo,int amount) throws AppException{
		if(amount<=0){
			throw new AppException("请输入要招募士兵的数量");
		}
		if(soldierNo == null){
			throw new AppException("请选择要招募的兵种");
		}
		if(!isResearcheTech(characterId, soldierNo)){
			throw new AppException("请在科教馆研究相应的兵种专精");
		}
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
		if(staticSoldier == null){
			throw new AppException("未知的兵种");
		}
		if(barracksDao.getUserSoldierQueueCount(characterId)!=0){
			throw new AppException("有兵种正在招募中");
		}
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		int newSoldier = maincity.getNewSoldier() - amount;
		long money = maincity.getMoney() - staticSoldier.getNeedMoney()*amount;
		long food = maincity.getFood() - staticSoldier.getNeedFood()*amount;
		long ironore = maincity.getIronore() - staticSoldier.getNeedIronore()*amount;
		if(newSoldier<0){
			throw new AppException("新兵不足");
		}
		if(money<0){
			throw new AppException("铜币不足");
		}
		if(food<0){
			throw new AppException("粮食不足");
		}
		if(ironore<0){
			throw new AppException("铁矿不足");
		}
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		int heroSoldierSum = userHeroService.getSoldierSum(characterId);
		int soldier = maincity.getSoldier()+amount;
		InteriorTechService interiorTech = (InteriorTechService)ServiceLocator
				.getSpringBean("interiorTechService");
		long soldierLimit = interiorTech.getValueAfterEffect(InteriorTechEffectType.SOLDIER_LIMIT,  maincity.getSoldierLimit(), characterId);
		if(soldier+heroSoldierSum > soldierLimit){
			throw new AppException("超过总兵上限");
		}
		maincity.setMoney(money);
		maincity.setFood(food);
		maincity.setIronore(ironore);
		maincity.setNewSoldier(newSoldier);
		//扣除资源
		maincityService.updateSoldierAndResource(characterId,newSoldier,maincity.getSoldier(),money,food,ironore);
		UserSoldierQueue userSoldierQueue = new UserSoldierQueue();
		userSoldierQueue.setCharacterId(characterId);
		userSoldierQueue.setSoldierNo(soldierNo);
		userSoldierQueue.setAmount(amount);
		userSoldierQueue.setStartTime(new Date());
		userSoldierQueue.setTime(staticSoldier.getTrainTime()*amount*1000);//时间（ms）
		barracksDao.addUserSoldierQueue(userSoldierQueue);
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("userSoldierQueue", userSoldierQueue);
		ExecuteJob.add(BarraksJob.class, data, userSoldierQueue.getStartTime().getTime()+userSoldierQueue.getTime(), characterId+"_recruitSoldier");
		Map<String,Object> train = new HashMap<String,Object>();
		train.put("soldierNo", userSoldierQueue.getSoldierNo());
		train.put("soldierName", userSoldierQueue.getSoldierName());
		train.put("remainedTime", userSoldierQueue.getTime());
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("train", train);
		retMap.put("summary", getSummaryView(maincity,characterId));
		retMap.put("resource", getResourceView(maincity));
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.NEW_SOLDIER_AMOUNT, null, characterId);
		return retMap;
	}
	
	private boolean isResearcheTech(int characterId,String soldierNo){
		SoldierTechService soldierTechService = (com.crystalcg.gamedev.tech.service.SoldierTechService) ServiceLocator.getSpringBean("soldierTechService");
		List<String> techNo = soldierTechService.getUserSoldierTech(characterId);
		boolean flag = false;
		StaticSoldierTech tech;
		for(String s : techNo){
			tech = SoldierTechCache.getSoldierTypeTech(s);
			if(tech!=null&&soldierNo.equals(tech.getSoldierNo())){
				flag = true;
				break;
			}
		}
		return flag;
	}
	
	/**
	 * job执行时调用
	 * @param userSoldierQueue
	 */
	public void afterRecruitSoldier(UserSoldierQueue userSoldierQueue){
		int characterId = userSoldierQueue.getCharacterId();
		String soldierNo = userSoldierQueue.getSoldierNo();
		//删除队列
		barracksDao.deleteUserSoldierQueue(characterId,soldierNo);
		//现有的该兵种数量
		Integer amount = barracksDao.getUserSoldierAmount(characterId, soldierNo);
		//插入或者更新用户兵种
		if(amount == null){
			barracksDao.addUserSoldier(characterId, soldierNo, userSoldierQueue.getAmount());
		}else{
			barracksDao.updateUserSoldier(characterId, soldierNo, amount+userSoldierQueue.getAmount());
		}
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		int soldier = maincity.getSoldier()+userSoldierQueue.getAmount();
//		int soildierLimit = maincity.getSoldierLimit();
//		if(soldier>soildierLimit){
//			soldier = soildierLimit;
//		}
		maincityService.updateSoldier(characterId, soldier);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TOTAL_SOLDIER_AMOUNT, null, characterId);
	}
	
	/**
	 * 遣散单位士兵返回的资源
	 * @param soldierNo
	 * @throws AppException
	 */
	public Map<String,Integer> dismissSoldierResource(String soldierNo) throws AppException{
		if(soldierNo == null){
			throw new AppException("请选择兵种");
		}
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
		if(staticSoldier == null){
			throw new AppException("未知的兵种");
		}
		Map<String, Integer> retMap = new HashMap<String, Integer>();
		retMap.put("money", staticSoldier.getNeedMoney());
		retMap.put("food", staticSoldier.getNeedFood());
		retMap.put("ironore", staticSoldier.getNeedIronore());
		return retMap;
	}
	
	/**
	 * 遣散成功：返回新的新兵数量、总兵数量（不改变上限），删除或修改当前拥有兵种,修改资源
	 * 遣散失败：没有对应兵种
	 * @param session
	 * @param soldierId
	 * @param amount
	 * @return
	 */
	public Map<String,Object> dismissSoldier(int characterId,String soldierNo,int amount) throws AppException{
		if(amount<=0){
			throw new AppException("请输入遣散数量");
		}
		if(soldierNo == null){
			throw new AppException("请选择兵种");
		}
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
		if(staticSoldier == null){
			throw new AppException("未知的兵种");
		}
		//当前兵种的数量
		Integer currentAmount = barracksDao.getUserSoldierAmount(characterId, soldierNo);
		if(currentAmount == null){
			throw new AppException("没有招募该兵种");
		}
		if(currentAmount<amount){
			throw new AppException("没有足够的士兵");
		}
		//主城资源信息
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		if(maincity.getSoldier() < amount){
			throw new AppException("主城内没有足够的士兵");
		}
		//计算资源
		long money = maincity.getMoney()+staticSoldier.getNeedMoney()*amount;
		if(money > maincity.getMoneyLimit()){
			money = maincity.getMoneyLimit();
		}
		long food = maincity.getFood()+staticSoldier.getNeedFood()*amount;
		if(food > maincity.getFoodLimit()){
			food = maincity.getFoodLimit();
		}
		long ironore = maincity.getIronore()+staticSoldier.getNeedIronore()*amount;
		if(ironore > maincity.getIronoreLimit()){
			ironore = maincity.getIronoreLimit();
		}
		int newSoldier = maincity.getNewSoldier()+amount;
		if(newSoldier > maincity.getNewSoldierLimit()){
			newSoldier = maincity.getNewSoldierLimit();
		}
		maincity.setMoney(money);
		maincity.setFood(food);
		maincity.setIronore(ironore);
		maincity.setNewSoldier(newSoldier);
		maincity.setSoldier(maincity.getSoldier() - amount);
		if(amount == currentAmount){
			barracksDao.deleteUserSoldier(characterId, soldierNo);
		}else{
			barracksDao.updateUserSoldier(characterId, soldierNo, currentAmount-amount);
		}
		//更新主城信息
		maincityService.updateSoldierAndResource(characterId,maincity.getNewSoldier(),maincity.getSoldier(),money,food,ironore);
		//用户现有兵种
		List<UserSoldier> userSoldier = barracksDao.getUserSoldier(characterId);
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("summary", getSummaryView(maincity,characterId));
		retMap.put("resource", getResourceView(maincity));
		retMap.put("userSoldier", userSoldier);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.TOTAL_SOLDIER_AMOUNT, null, characterId);
		questService.updateQuestSchedule(QuestTargeType.NEW_SOLDIER_AMOUNT, null, characterId);
		return retMap;
	}
	/**
	 * 进阶界面，每个单位消耗的资源 和 目标兵阶
	 * @param soldierId
	 * @return
	 * @throws AppException 
	 */
	public Map<String,Integer> upgradeSoldierResource(String soldierNo) throws AppException{
		if(soldierNo == null){
			throw new AppException("请选择兵种");
		}
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
		if(staticSoldier == null){
			throw new AppException("未知的兵种");
		}
		Map<String, Integer> retMap = new HashMap<String, Integer>();
		retMap.put("money", staticSoldier.getNeedMoney());
		retMap.put("food", staticSoldier.getNeedFood());
		retMap.put("ironore", staticSoldier.getNeedIronore());
		return retMap;
	}
	
	/**
	 * 进阶成功：增加、删除或修改当前拥有兵种,修改资源
	 * 进阶失败：没有对应兵种，资源不足
	 * @param session
	 * @param soldierId
	 * @param amount
	 * @return
	 * @throws AppException 
	 */
	public Map<String,Object> upgradeSoldier(int characterId,String soldierNo,int amount) throws AppException{
		if(amount<=0){
			throw new AppException("请输入进阶数量");
		}
		if(soldierNo == null){
			throw new AppException("请选择兵种");
		}
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
		if(staticSoldier == null){
			throw new AppException("未知的兵种");
		}
		String[] soldierNoArray = soldierNo.split("_");
		//下一等级兵种编号
		String nextNo = soldierNoArray[0]+"_"+(Integer.valueOf(soldierNoArray[1])+1);
		//当前兵种的数量
		Integer currentAmount = barracksDao.getUserSoldierAmount(characterId, soldierNo);
		//下一阶兵种的数量
		Integer nextAmount = barracksDao.getUserSoldierAmount(characterId, nextNo);
		if(currentAmount == null){
			throw new AppException("没有招募该兵种");
		}
		if(currentAmount<amount){
			throw new AppException("没有足够的士兵");
		}
		StaticSoldier next = SoldierCache.getSoldierByNo(nextNo);
		if(next == null){
			throw new AppException("已达兵种最高等级");
		}
		if(!isResearcheTech(characterId, nextNo)){
			throw new AppException("请在科教馆研究相应的兵种专精");
		}
		//主城资源信息
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		if(maincity.getSoldier() < amount){
			throw new AppException("主城内没有足够的士兵");
		}
		//计算资源
		long money = maincity.getMoney() - staticSoldier.getNeedMoney()*amount;
		long food = maincity.getFood() - staticSoldier.getNeedFood()*amount;
		long ironore = maincity.getIronore() - staticSoldier.getNeedIronore()*amount;
		if(money<0){
			throw new AppException("铜币不足");
		}
		if(food<0){
			throw new AppException("粮食不足");
		}
		if(ironore<0){
			throw new AppException("铁矿不足");
		}
		maincity.setMoney(money);
		maincity.setFood(food);
		maincity.setIronore(ironore);
		//更新主城信息
		maincityService.updateSoldierAndResource(characterId,maincity.getNewSoldier(),maincity.getSoldier(),money,food,ironore);
		if(amount == currentAmount){//全部进阶
			barracksDao.deleteUserSoldier(characterId, soldierNo);
		}else{//部分进阶
			barracksDao.updateUserSoldier(characterId, soldierNo, currentAmount-amount);
		}
		if(nextAmount == null){//无下一阶兵
			barracksDao.addUserSoldier(characterId, nextNo, amount);
		}else{//有下一阶兵
			barracksDao.updateUserSoldier(characterId, nextNo, nextAmount+amount);
		}
		//用户现有兵种
		List<UserSoldier> userSoldier = barracksDao.getUserSoldier(characterId);
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("summary", getSummaryView(maincity,characterId));
		retMap.put("resource", getResourceView(maincity));
		retMap.put("userSoldier", userSoldier);
		return retMap;
	}
	
	/**
	 * 取消招募
	 * @throws AppException 
	 */
	public Map<String,Object> cancelRecruit(int characterId) throws AppException{
		UserSoldierQueue userSoldierQueue = getUserSoldierQueue(characterId);
		if(userSoldierQueue == null){
			throw new AppException("没有训练中的兵种");
		}
		String soldierNo = userSoldierQueue.getSoldierNo();
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
		if(staticSoldier == null){
			throw new AppException("未知的兵种");
		}
		//停止job
		ExecuteJob.cancel(characterId+"_recruitSoldier");
		//删除队列
		barracksDao.deleteUserSoldierQueue(characterId, soldierNo);
		int amount = userSoldierQueue.getAmount();
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		//计算资源
		long money = maincity.getMoney()+staticSoldier.getNeedMoney()*amount;
		if(money > maincity.getMoneyLimit()){
			money = maincity.getMoneyLimit();
		}
		long food = maincity.getFood()+staticSoldier.getNeedFood()*amount;
		if(food > maincity.getFoodLimit()){
			food = maincity.getFoodLimit();
		}
		long ironore = maincity.getIronore()+staticSoldier.getNeedIronore()*amount;
		if(ironore > maincity.getIronoreLimit()){
			ironore = maincity.getIronoreLimit();
		}
		int newSoldier = maincity.getNewSoldier()+amount;
		if(newSoldier > maincity.getNewSoldierLimit()){
			newSoldier = maincity.getNewSoldierLimit();
		}
		maincity.setMoney(money);
		maincity.setFood(food);
		maincity.setIronore(ironore);
		maincity.setNewSoldier(newSoldier);
		//修改资源
		maincityService.updateSoldierAndResource(characterId, newSoldier, maincity.getSoldier(), money, food, ironore);
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("summary", getSummaryView(maincity,characterId));
		retMap.put("resource", getResourceView(maincity));
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.NEW_SOLDIER_AMOUNT, null, characterId);
		return retMap;
	}
	
	/**
	 * 训练新兵
	 * @throws AppException 
	 */
	public Map<String,Object> recruitNewSoldier(int characterId,int amount) throws AppException{
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		int freePeople = maincity.getPeople() - maincity.getWorkingPeople();
		if(freePeople<amount){
			throw new AppException("人口不足");
		}
		if(maincity.getNewSoldier()+amount>maincity.getNewSoldierLimit()){
			throw new AppException("超过新兵上限");
		}
		maincity.setNewSoldier(maincity.getNewSoldier()+amount);
		maincityService.updatePeople(characterId, maincity.getPeople() - amount);
		maincityService.updateNewSoldier(characterId, maincity.getNewSoldier());
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("summary", getSummaryView(maincity,characterId));
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.NEW_SOLDIER_AMOUNT, null, characterId);
		return retMap;
	}
	/**
	 * 获取用户所拥有的兵种
	 * @param characterId
	 * @return
	 */
	public List<UserSoldier> getUserSoldier(int characterId){
		return barracksDao.getUserSoldier(characterId);
	}

	public void deleteUserSoldier(int characterId,String soldierNo){
		barracksDao.deleteUserSoldier(characterId, soldierNo);
	}
	public void updateUserSoldier(int characterId, String soldierNo, int soldierAmount){
		barracksDao.updateUserSoldier(characterId, soldierNo, soldierAmount);
	}
	/**
	 * 增加已招募的士兵
	 * @param param
	 */
	public void addUserSoldier(int characterId,String soldierNo,int soldierAmount){
		barracksDao.addUserSoldier(characterId, soldierNo, soldierAmount);
	}
	public Integer getUserSoldierAmount(int characterId,String soldierNo){
		return barracksDao.getUserSoldierAmount(characterId, soldierNo);
	}
	public BarracksDao getBarracksDao() {
		return barracksDao;
	}

	public void setBarracksDao(BarracksDao barracksDao) {
		this.barracksDao = barracksDao;
	}
	private static void addAllUserSoldierJob(){
		BarracksDao barracksDao = (BarracksDao)ServiceLocator.getSpringBean("barracksDao");
		List<UserSoldierQueue> userSoldierQueues = barracksDao.getAllUserSoldier();
		Map<String,Object> data;
		for(UserSoldierQueue i:userSoldierQueues){
			data = new HashMap<String,Object>();
			data.put("userSoldierQueue", i);
			ExecuteJob.add(BarraksJob.class, data, i.getStartTime().getTime()+i.getTime(), i.getCharacterId()+"_recruitSoldier");
		}
	}
	/**
	 * 获取所有兵种训练队列
	 * @return
	 */
	public List<UserSoldierQueue> getAllUserSoldier(){
		return barracksDao.getAllUserSoldier();
	}
	/**
	 * 练兵加速
	 * @param soliderNo 
	 * @param speedType 加速道具类型
	 * @param itemNo 加速道具编号
	 * @param characterId 
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException 
	 */
	public Object SaveSpeedTrain(String soliderNo, int speedType, String itemNo, int characterId,int confim) throws AppException {
		UserSoldierQueue queue = getUserSoldierQueue(characterId);
		Map<String,Object> retMap = null;
		if(queue == null){
			throw new AppException("当前没有训练中的兵种,加速失败");
		}else if(!ExecuteJob.checkExists(characterId+"_recruitSoldier")){
			throw new AppException("招募兵种异常,加速失败");
		}
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		int remainTime = (int) ((queue.getTime() - new Date().getTime() + queue.getStartTime().getTime()+999)/1000);
		if(remainTime <= 0){
			throw new AppException("已经招募完成,不需要加速");
		}else if(confim == 0){
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			retMap = userItemService.spendWindow(Const.SPEND_FUNCTION_TRAIN, characterId, remainTime);
			retMap.put("RemainTime", remainTime);//秒
			return retMap;
		}
		int speedSecond = characterService.saveSpeedNow(speedType,Const.SPEND_FUNCTION_TRAIN, characterId, itemNo,remainTime);
		if(speedSecond == -1){//立即完成
			ExecuteJob.modifyTavernStart(characterId+"_recruitSoldier",-5000);
			speedSecond = remainTime;
		}else{
			queue.setTime(queue.getTime() -speedSecond*1000);
			barracksDao.updateUserSoldierQueue(queue);
			ExecuteJob.modifyTavernStart(characterId+"_recruitSoldier", queue.getStartTime().getTime() + queue.getTime());
		}
		retMap = new HashMap<String,Object>();
		retMap.put("speedTime", speedSecond);
		retMap.put("remainTime", remainTime-speedSecond);
		retMap.put("state", "success");
		return retMap;
	}
	/**
	 * 查询玩家练兵队列
	 * @param characterId
	 * @return
	 */
	public UserSoldierQueue getUserSoldierQueue(int characterId){
		return barracksDao.getUserSoldierQueue(characterId);
	}
//	public void getUserSoldier(int characterId){
//		barracksDao
//	}
}
