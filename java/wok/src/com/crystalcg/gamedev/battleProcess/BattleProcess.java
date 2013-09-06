package com.crystalcg.gamedev.battleProcess;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteBattleJob;
import com.crystalcg.gamedev.battle.Job.ReadyToBattleJob;
import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battle.service.BattleService;
import com.crystalcg.gamedev.battle.service.BattleSuburbService;
import com.crystalcg.gamedev.battleProcess.Job.SingleBattleActionDelayJob;
import com.crystalcg.gamedev.battleProcess.Job.SingleBattleEndDelayJob;
import com.crystalcg.gamedev.battleProcess.Job.SingleBattleReadyDelay;
import com.crystalcg.gamedev.battleProcess.Job.SingleBattleTurnJob;
import com.crystalcg.gamedev.battleProcess.domain.BattleData;
import com.crystalcg.gamedev.battleProcess.domain.HeroForBattle;
import com.crystalcg.gamedev.battleProcess.domain.MultiBattle;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattle;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattleObject;
import com.crystalcg.gamedev.battleProcess.domain.SkillOjbect;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallHero;
import com.crystalcg.gamedev.buildingFunction.service.CollegeService;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.mail.service.MailService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.BattleMath;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.LockUtil;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.RandomFunc;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.TimeUtil;
import com.crystalcg.gamedev.util.cache.BattleRewardCache;
import com.crystalcg.gamedev.util.cache.EnemyNPCCache;
import com.crystalcg.gamedev.util.cache.EquipmentCache;
import com.crystalcg.gamedev.util.cache.ImageResourceCache;
import com.crystalcg.gamedev.util.cache.ItemCache;
import com.crystalcg.gamedev.util.cache.MaterialCache;
import com.crystalcg.gamedev.util.cache.QuestsCache;
import com.crystalcg.gamedev.util.cache.domain.StaticArticleReward;
import com.crystalcg.gamedev.util.cache.domain.StaticBattleReward;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;
import com.crystalcg.gamedev.util.cache.domain.StaticImageResource;

/**
 * @author jinganyang 处理战场，初始化开启战场，关闭战场，用于对野外势力单挑讨伐
 */
public class BattleProcess {
	private static Logger logger = LoggerFactory.getLogger(BattleProcess.class);
	private UserComet userComet;
	private static final int BATTLE_QUEUE_LIMIT = 5;
	public static final Map<String, BattleData> BATTLE_DATA = new HashMap<String, BattleData>();// 战场缓存
	/**
	 * 玩家间征伐战场缓存
	 * 玩家出征战队编号-战斗战场（交战双方出征战队(基础数据对象)集合（2个战队））
	 */
	private static final Map<Integer,List<Map<String,Object>>> BATTLE_FEILDS = new HashMap<Integer,List<Map<String,Object>>>();
	/**
	 * 队列信息
	 * 目标（被围攻）君主id-玩家队列信息《阵营类型-队列信息集合》
	 */
	private static final Map<Integer,Map<Integer,Queue<BattleJobQueue>>> BATTLE_QUEUES = new HashMap<Integer, Map<Integer,Queue<BattleJobQueue>>>();
	/**
	 * 城郊战倒计时内存
	 * 目标（被围攻）君主id-倒计时起始时间
	 */
	private static final Map<Integer,Date> BATTLE_BACKTIME_MAP = new ConcurrentHashMap<Integer, Date>();
	/**
	 * 侦查内存信息
	 * 玩家君主id-玩家侦查过的军队编号集合
	 */
	public static Map<Integer,List<Integer>> DETECTMAP = new HashMap<Integer, List<Integer>>();
	
	/**
	 * 攻击方战队的积分列表（注:攻击方一旦失败积分清零并踢出积分列表）
	 * 被围攻君主id-积分列表《行军队伍编号--积分值》
	 */
	private static final Map<Integer,Map<Integer,Integer>> BATTLE_SCORE_MAP = new HashMap<Integer, Map<Integer,Integer>>();
	
	public static final String BATTLE_JOB_STRING_OPERATE = "battleOperateJob_";
	public static final String BATTLE_JOB_STRING_ACTION = "battleActionJob_";
	public static final String BATTLE_JOB_STRING_END = "battleEndJob_";// 回合轮转延时
	public static final String BATTLE_JOB_STRING_READY = "battleReadyJob_";// 战斗准备延时
	public static final String BATTLE_ACTION_ATTACK_STRING = "02";// 攻击
	public static final String BATTLE_ACTION_LOSE_STRING = "04";// 失败
	public static final String BATTLE_ACTION_INJURED_STRING = "03";// 受伤
	public static final String BATTLE_ACTION_WAIT_STRING = "01";// 待机
	public static final String BATTLE_ACTION_SKILL_STRING = "05";// 施法

	/**************************************************************************************/
	/************************************ 单挑相关 *********************************************/
	/**************************************************************************************/
	/**************************************************************************************/

	/*********************** 玩家操作相关 *****************************/
	/**
	 * 玩家操作，普通攻击
	 * 
	 * @param singleBattle
	 * @param characterId
	 */
	public void commonAttackOperateForSingle(SingleBattle singleBattle,
			int characterId) {
		if (!canAttackForSingleBattle(singleBattle, characterId)) {
			return;
		}
		forbidUserOperate(singleBattle);
		String jobId = BattleProcess.BATTLE_JOB_STRING_OPERATE
				+ singleBattle.getBattleId();
		if (ExecuteBattleJob.isExist(jobId)) {
			ExecuteBattleJob.deleteBattleJob(jobId);
		}
		Map<String, Object> result = BattleMath
				.commonAttackForSingleBattle(singleBattle);
		userOperateResult(result, singleBattle);
	}

	/**
	 * 技能攻击操作
	 * 
	 * @param singleBattle
	 * @param skillIndex
	 * @param characterId
	 */
	public void skillAttackForSingleBattle(SingleBattle singleBattle,
			int skillIndex, int characterId) {
		if (!canAttackForSingleBattle(singleBattle, characterId)) {
			return;
		}
		if (!validateSkill(skillIndex, singleBattle)) {
			return;
		}
		forbidUserOperate(singleBattle);
		String jobId = BattleProcess.BATTLE_JOB_STRING_OPERATE
				+ singleBattle.getBattleId();
		if (ExecuteBattleJob.isExist(jobId)) {
			ExecuteBattleJob.deleteBattleJob(jobId);
		}
		StaticHeroSkill staticHeroSkill = singleBattle.getOperateHero()
				.getHeroForBattle().getHeroSkill().get(skillIndex)
				.getStaticHeroSkill();
		Map<String, Object> result = BattleMath.skillResultForSingleBattle(
				staticHeroSkill, singleBattle);
		singleBattle.getOperateHero()
		.getHeroForBattle().getHeroSkill().get(skillIndex).setBeginRound(singleBattle.getLargeRoundAmount());
		userOperateResult(result, singleBattle);
	}

	/**
	 * 自动攻击操作
	 * 
	 * @param singleBattle
	 * @param characterId
	 * @return
	 */
	public Boolean autoAttackForSingleBattle(SingleBattle singleBattle,
			int characterId) {
		SingleBattleObject singleBattleObject = singleBattle.getAuthorityMap()
				.get(characterId);
		if (singleBattleObject == null) {
			return null;
		}
		if (canAttackForSingleBattle(singleBattle, characterId)) {
			commonAttackOperateForSingle(singleBattle, characterId);//若在操作回合点自动操作，则先执行普通攻击
		}
		if (singleBattleObject.getStatus() == Const.FIGHT_STATUS_USER) {
			singleBattleObject.setStatus(Const.FIGHT_STATUS_AUTO);
			return true;
		} else if (singleBattleObject.getStatus() == Const.FIGHT_STATUS_AUTO) {
			singleBattleObject.setStatus(Const.FIGHT_STATUS_USER);
			return false;
		} else {
			return null;
		}
	}

	/**
	 * 逃跑操作
	 * 
	 * @param singleBattle
	 * @param characterId
	 */
	public void escapeForSingleBattle(SingleBattle singleBattle, int characterId){
		if (!canAttackForSingleBattle(singleBattle, characterId)) {
			return;
		}
		forbidUserOperate(singleBattle);
		String jobId = BattleProcess.BATTLE_JOB_STRING_OPERATE
				+ singleBattle.getBattleId();
		if (ExecuteBattleJob.isExist(jobId)) {
			ExecuteBattleJob.deleteBattleJob(jobId);
		}
		singleBattle.getTargetHero().setWin(true);
		endSingleBattle(singleBattle);
	}

	/**
	 * 初始化战场，只用于对野外势力单挑
	 * 
	 * @param battleJobQueueId
	 * @param charId
	 * @throws AppException
	 */
	public void initializeSingleBattle(int battleJobQueueId, int characterId)
			throws AppException {
		BattleService battleService = (BattleService) ServiceLocator
				.getSpringBean("battleService");
		UserHeroService userHeroService = (UserHeroService) ServiceLocator
				.getSpringBean("userHeroService");
		CollegeService collegeService = (CollegeService) ServiceLocator
				.getSpringBean("collegeService");
		BattleJobQueue battleJobQueue = battleService
				.selectBattleQueueById(battleJobQueueId);
		// 验证
		if (battleJobQueue == null) {
			throw new AppException("不存在战场队列");
		}
		if (battleJobQueue.getCharacterId() != characterId) {
			throw new AppException("身份不符，无法创建战场");
		}
		if (battleJobQueue.getBattleType() != Const.BATTLE_TYPE_SINGLEBATTLE) {
			throw new AppException("初始化战场类型错误");
		}
		if (battleJobQueue.getTargetType() != Const.TARGET_TYPE_MONSTER) {
			throw new AppException("初始化战场错误，目标不是野外势力，无法初始化");
		}
		if (battleJobQueue.getStatus() != Const.BATTLE_STATUS_WAIT
				&& battleJobQueue.getStatus() != Const.BATTLE_STATUS_FIGHTING) {
			throw new AppException("战场初始化失败，还没有到达目标位置");
		}
		if (BATTLE_DATA.get(String.valueOf(battleJobQueueId)) != null) {
			return;
		}

		BattleData battleData = new BattleData();
		BATTLE_DATA.put(String.valueOf(battleJobQueueId), battleData);//将战场信息放入内存缓存
		UserHero userHero = userHeroService.getUserHero(characterId,
				Integer.parseInt(battleJobQueue.getHeroList()));// 获取武将
		HeroAlgorithm.computeAttribute(userHero);// 计算武将属性
		List<StaticHeroSkill> heroSkills = collegeService.getUserHeroSkill(
				characterId, userHero.getId());// 获取技能
		SingleBattleObject charObject = new SingleBattleObject(characterId,
				userHero, heroSkills, null, 0);// 创建玩家单挑类
		StaticEnemyNPC staticEnemyNPC = EnemyNPCCache
				.getEnemyEntity(battleJobQueue.getTargetNo());// 获取野怪静态信息
		SingleBattleObject targetObject = new SingleBattleObject(
				staticEnemyNPC, null);// 创建野怪单挑类
		SingleBattle singleBattle = new SingleBattle(battleJobQueueId,
				Const.BATTLE_ROUND_TIME, charObject, targetObject);// 创建单挑战场类
		battleData.setSingleBattle(singleBattle);
		battleData.setBattleType(Const.BATTLE_TYPE_SINGLEBATTLE);
		singleBattle.setCanEnter(true);

	}

	/**
	 * 开始战斗
	 * 
	 * @param battleJobQueueId
	 * @param characterId
	 * @throws AppException
	 */
	public void beginSingleBattle(int battleJobQueueId, int characterId)
			throws AppException {
		if (BATTLE_DATA.get(String.valueOf(battleJobQueueId)) == null) {
			throw new AppException("战斗已结束");
		}
		if (BATTLE_DATA.get(String.valueOf(battleJobQueueId)).getBattleType() != Const.BATTLE_TYPE_SINGLEBATTLE) {
			throw new AppException("开启战场类型错误");
		}
		SingleBattle singleBattle = BATTLE_DATA.get(String.valueOf(battleJobQueueId))
				.getSingleBattle();
		SingleBattleObject singleBattleObject = singleBattle.getAuthorityMap()
				.get(characterId);
		if (singleBattleObject == null) {
			throw new AppException("无权限开始战场");
		}
		if (singleBattle.isFighting()) {// 已经开始战斗，直接返回，不进行任何操作
			singleBattleObject.setStatus(Const.FIGHT_STATUS_USER);
			return;
		}
		singleBattleObject.setReady(true);// 准备完毕
		singleBattleObject.setStatus(Const.FIGHT_STATUS_USER);
		BattleService battleService = (BattleService) ServiceLocator
				.getSpringBean("battleService");
		BattleJobQueue battleJobQueue = battleService
				.selectBattleQueueById(battleJobQueueId);
		battleJobQueue.setStatus(Const.BATTLE_STATUS_FIGHTING);
		battleService.updateBattelQueue(battleJobQueue);
		if (isSingleBattleAllReady(singleBattle)) {
			singleBattle.setFighting(true);// 战斗中
			// 删除延时,如果存在
			if (ExecuteBattleJob.isExist(BATTLE_JOB_STRING_READY
					+ battleJobQueueId)) {
				ExecuteBattleJob.deleteBattleJob(BATTLE_JOB_STRING_READY
						+ battleJobQueueId);
			}
			// 开启操作
			singleBattleOperate(singleBattle);// 操作开始
		} else if (!ExecuteBattleJob.isExist(BATTLE_JOB_STRING_READY
				+ battleJobQueueId)) {
			// 开启延时，如果不存在
			addSingleDelayJob(SingleBattle.DELAY_STATUS_READY, singleBattle);
		}
	}

	/**
	 * 非通用方法，判断战场内所有玩家是否全部准备完成
	 * @param singleBattle
	 * @return
	 */
	private boolean isSingleBattleAllReady(SingleBattle singleBattle) {
		Map<Integer, SingleBattleObject> authority = singleBattle
				.getAuthorityMap();
		boolean isTrue = true;
		Iterator<SingleBattleObject> it = authority.values().iterator();
		while (it.hasNext()) {
			SingleBattleObject singleBattleObject = it.next();
			isTrue = singleBattleObject.isReady() && isTrue;
		}
		return isTrue;
	}

	/**
	 * 战斗小回合结束，清算
	 * 
	 * @param singleBattle
	 */
	public void singleBattleRoundEnd(SingleBattle singleBattle) {
		System.out.println("--------------------------------------------------------小回合结束");
		int size = singleBattle.getHeroOrder().size();
		singleBattle.setMiniRoundAmout(singleBattle.getMiniRoundAmout() + 1);
		singleBattle.setLargeRoundAmount(singleBattle.getMiniRoundAmout()
				/ size + 1);
		singleBattle.setRoundTime(Const.BATTLE_ROUND_TIME);
		
		Map<String, Object> dataMap = new HashMap<String,Object>();
		dataMap.put("battleViewType", Const.BATTLE_VIEW_TYPE_ROUND_END);
		//清算buff
		dataMap.put("battleViewInfo",
				BattleMath.buffEffectSettlement(singleBattle));
		// 重新排序
		if(singleBattle.getMiniRoundAmout()%size==0){
			singleBattle.sortHeroOrder();
		}
		setReadyToFalse(singleBattle);
		userComet.publishToBattleChannel(Const.BATTLE_MESSAGE_TYPE_VIEW,
				String.valueOf(singleBattle.getBattleId()), dataMap);
		// userOperateResult(dataMap, singleBattle);
	}

	/**
	 * 把ready置为false
	 * 
	 * @param singleBattle
	 */
	public void setReadyToFalse(SingleBattle singleBattle) {
		singleBattle.getHeroA().setReady(false);
		singleBattle.getHeroB().setReady(false);
	}

	/**
	 * 战斗操作，用于回合轮转，根据操作方状态执行对应方法
	 * @param singleBattle
	 */
	public void singleBattleOperate(SingleBattle singleBattle) {
		System.out.println("--------------------------------------------------------开始操作");
		SingleBattleObject operator = singleBattle.getOperateHero();
		if (BattleMath.getChaos(operator.getHeroForBattle()) != null) {//如果玩家身上有混乱（昏迷）状态，则直接结束操作，跳到对方操作
			// 进入小回合结束延时
			addSingleDelayJob(SingleBattle.DELAY_STATUS_ROUND_END, singleBattle);
			//小回合结束
			singleBattleRoundEnd(singleBattle);
			return;
		}
		switch (operator.getStatus()) {
		case Const.FIGHT_STATUS_USER:// 玩家手动
			fightStatusUserOperate(singleBattle);
			break;
		case Const.FIGHT_STATUS_NPC:// 野怪电脑
			fightStatusNpcOperate(singleBattle);
			break;
		case Const.FIGHT_STATUS_AUTO:// 自动战斗
			fightStatusAutoOperate(singleBattle);
			break;
		case Const.FIGHT_STATUS_SAVEAUTO:// 战斗托管
			fightStatusSaveAutoOperate();
			break;
		case Const.FIGHT_STATUS_NOT_IN_BATTLE:// 战斗不在战场
			fightStatusAutoOperate(singleBattle);
			break;

		default:
			break;
		}
	}

	/**
	 * 非通用方法，禁止玩家操作界面，用户玩家操作回合执行完操作后
	 * @param singleBattle
	 */
	private void forbidUserOperate(SingleBattle singleBattle) {
		System.out.println("--------------------------------------------------------禁止操作");
		SingleBattleObject operator = singleBattle.getOperateHero();
		Map<String, Object> pushData = new HashMap<String,Object>();
		pushData.put("canOperate", false);
		userComet.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_TURN,operator.getCharacterId(), String.valueOf(singleBattle.getBattleId()), pushData);
//				.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_TURN,
//						operator.getCharacterId(), singleBattle.getBattleId(),
//						pushData);

	}

	/**
	 * 非通用方法，到玩家操作回合时，执行的方法
	 * @param singleBattle
	 */
	private void fightStatusUserOperate(SingleBattle singleBattle) {
		System.out.println("--------------------------------------------------------可以操作");
		SingleBattleObject operator = singleBattle.getOperateHero();
		Map<String, Object> pushData = new HashMap<String,Object>();
		pushData.put("canOperate", true);
		pushData.put("operateSkill", changeSkillToMap(singleBattle));
		userComet.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_TURN,operator.getCharacterId(), String.valueOf(singleBattle.getBattleId()), pushData);
//		userComet
//				.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_TURN,
//						operator.getCharacterId(), singleBattle.getBattleId(),
//						pushData);
		Map<String, Object> battleJobData = new HashMap<String,Object>();
		battleJobData.put("singleBattle", singleBattle);
		String jobId = BATTLE_JOB_STRING_OPERATE + singleBattle.getBattleId();
		ExecuteBattleJob.addBattleActionJob(SingleBattleTurnJob.class,
				battleJobData, Const.BATTLE_SECOND, jobId,
				Const.BATTLE_ROUND_TIME);
		singleBattle.setDelayStatus(SingleBattle.DELAY_STATUS_NO_DELAY);
	}

	private List<Map<String, Object>> changeSkillToMap(SingleBattle singleBattle) {
		HeroForBattle heroForBattle = singleBattle.getOperateHero()
				.getHeroForBattle();
		boolean noSkill = false;
		if (BattleMath.getNoSkill(heroForBattle) != null) {
			noSkill = true;
		}
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp;
		for (SkillOjbect i : heroForBattle.getHeroSkill()) {
			temp = new HashMap<String,Object>();
			temp.put("skillName", i.getStaticHeroSkill().getName());
			temp.put("skillIcon", i.getStaticHeroSkill().getIcon());
			temp.put("description", i.getStaticHeroSkill().getDescription());
			temp.put("needMp", i.getStaticHeroSkill().getNeedVnp());
			if (noSkill) {
				temp.put("canUse", false);
			} else {
				temp.put("canUse", i.isCanUse(heroForBattle.getMp()));
			}
			temp.put("remainRound",
					i.getRemainRound(singleBattle.getLargeRoundAmount()));
			retList.add(temp);
		}
		return retList;
	}

	/**
	 * 非通用方法，野怪操作回合时使用的方法
	 * @param singleBattle
	 */
	private void fightStatusNpcOperate(SingleBattle singleBattle) {
		Map<String, Object> result;
		if(singleBattle.getOperateHero().getAi()!=null){
			result = BattleMath.singleBattleForAi(singleBattle);
			userOperateResult(result, singleBattle);
		}else{
			result = BattleMath
					.commonAttackForSingleBattle(singleBattle);
			userOperateResult(result, singleBattle);
		}

//		String jobId = BattleProcess.BATTLE_JOB_STRING_ACTION
//				+ singleBattle.getBattleId();
//		Map<String, Object> battleJobData = new HashMap<String,Object>();
//		battleJobData.put("singleBattle", singleBattle);
//		long date = System.currentTimeMillis();
//		Date fireTime = new Date(date + Const.BATTLE_DELAY);
//
//		ExecuteBattleJob.addBattleJob(SingleBattleActionDelayJob.class,
//				battleJobData, fireTime, jobId);
		// 野怪AI
		// 结果
	}

	/**
	 * 非通用方法，玩家在自动操作状态时，到操作回合时调用的方法，目前没有玩家AI配置，自动战斗走普通攻击
	 * @param singleBattle
	 */
	private void fightStatusAutoOperate(SingleBattle singleBattle) {
		Map<String, Object> result = BattleMath
				.commonAttackForSingleBattle(singleBattle);
		userOperateResult(result, singleBattle);

//		String jobId = BattleProcess.BATTLE_JOB_STRING_ACTION
//				+ singleBattle.getBattleId();
//		Map<String, Object> battleJobData = new HashMap<String,Object>();
//		battleJobData.put("singleBattle", singleBattle);
//		long date = System.currentTimeMillis();
//		Date fireTime = new Date(date + Const.BATTLE_DELAY);
//
//		ExecuteBattleJob.addBattleJob(SingleBattleActionDelayJob.class,
//				battleJobData, fireTime, jobId);
		// 玩家AI
		// 目前没有AI控制自动攻击
		// 结果
		// commonAttackOperateForSingle(singleBattle, characterId);
	}

	/**
	 * 自动战斗完全托管，提前配置玩家AI，目前该功能未开放
	 */
	private void fightStatusSaveAutoOperate() {
		// 玩家AI配置
		// 结果
	}

	/**
	 * 向战场频道发布回合结果的方法
	 * @param result
	 * @param singleBattle
	 */
	public void userOperateResult(Map<String, Object> result,
			SingleBattle singleBattle) {
		System.out.println("--------------------------------------------------------执行动作"+result);
		setReadyToFalse(singleBattle);
		addSingleDelayJob(SingleBattle.DELAY_STATUS_ACTION, singleBattle);
		userComet.publishToBattleChannel(Const.BATTLE_MESSAGE_TYPE_VIEW,
				String.valueOf(singleBattle.getBattleId()), result);
	}

	/**
	 * 验证技能是否合法
	 * 
	 * @param skillIndex
	 * @param singleBattleObject
	 * @return
	 */
	private boolean validateSkill(int skillIndex, SingleBattle singleBattle) {
		HeroForBattle heroForBattle = singleBattle.getOperateHero()
				.getHeroForBattle();
		int rounds = singleBattle.getLargeRoundAmount();
		if (heroForBattle.getHeroSkill().isEmpty()) {
			return false;
		}
		if (skillIndex >= heroForBattle.getHeroSkill().size()) {
			return false;
		}
		SkillOjbect skill = heroForBattle.getHeroSkill().get(skillIndex);
		if (skill.getRemainRound(rounds) != 0) {
			return false;
		}
		if (skill.getStaticHeroSkill().getNeedVnp() > heroForBattle.getMp()) {
			return false;
		}
		if (BattleMath.getNoSkill(heroForBattle) != null) {
			return false;
		}
		// 缺少武器判定
		return true;
	}

	/**
	 * 操作权限验证
	 * 
	 * @param singleBattle
	 * @param characterId
	 * @return
	 */
	private boolean canAttackForSingleBattle(SingleBattle singleBattle,
			int characterId) {
		// 权限验证
		if (singleBattle == null) {
			// throw new AppException("战斗已结束，无法进入，请去邮箱查看战斗结果");
			return false;
		}
		if (singleBattle.getAuthorityMap().get(characterId) == null) {
			return false;
		}
		if (singleBattle.getOperateHero().getCharacterId() != characterId) {
			return false;
		}
		// if(singleBattle.getHeroById(charId)==null){
		// throw new AppException("您不在次战场，无法获得战场信息");
		// return false;
		// }
		if (singleBattle.getDelayStatus() != SingleBattle.DELAY_STATUS_NO_DELAY) {
			// throw new AppException("还没有到您的回合");
			return false;
		}
		return true;
	}

	/******************* 延时执行相关 *************************/
	/**
	 * 添加战斗延时，准备延时，动画延时，回合结束延时
	 * @param delayType
	 * @param singleBattle
	 */
	public void addSingleDelayJob(int delayType, SingleBattle singleBattle) {
		String jobId;
		long date = System.currentTimeMillis();
		Date fireTime;
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("singleBattle", singleBattle);
		int delayTime = 0;
		if(isAllNotInBattle(singleBattle.getAuthorityMap())){
			delayTime = Const.BATTLE_DELAY_NOT_IN_BATTLE;
		}else{
			delayTime = Const.BATTLE_DELAY;
		}
		switch (delayType) {
		case SingleBattle.DELAY_STATUS_READY:// 战场开启延时
//			singleBattle.setFighting(true);//延时到时间，战场战斗状态设为true
			jobId = BATTLE_JOB_STRING_READY + singleBattle.getBattleId();
			fireTime = new Date(date + Const.BATTLE_DELAY_READY);
			singleBattle.setDelayStatus(SingleBattle.DELAY_STATUS_READY);
			ExecuteBattleJob.addBattleJob(SingleBattleReadyDelay.class, data,
					fireTime, jobId);
			break;
		case SingleBattle.DELAY_STATUS_ACTION:// 动画延时
			jobId = BATTLE_JOB_STRING_ACTION + singleBattle.getBattleId();
			date = System.currentTimeMillis();
			fireTime = new Date(date + delayTime);
			 singleBattle.setDelayStatus(SingleBattle.DELAY_STATUS_ACTION);
			// 动作动画延时
			ExecuteBattleJob.addBattleJob(SingleBattleActionDelayJob.class,
					data, fireTime, jobId);
			break;
		case SingleBattle.DELAY_STATUS_ROUND_END:// 小回合结束延时
			jobId = BATTLE_JOB_STRING_END + singleBattle.getBattleId();
			fireTime = new Date(date + delayTime);// 换常量 延时2秒
			singleBattle.setDelayStatus(SingleBattle.DELAY_STATUS_ROUND_END);
			ExecuteBattleJob.addBattleJob(SingleBattleEndDelayJob.class, data,
					fireTime, jobId);
			break;

		default:
			break;
		}
	}
	
	/**
	 * 是否全不在战场
	 * @param map
	 * @return
	 */
	private boolean isAllNotInBattle(Map<Integer, SingleBattleObject> map){
		for(SingleBattleObject i:map.values()){
			if(i.getStatus()==Const.FIGHT_STATUS_NOT_IN_BATTLE){
				continue;
			}else{
				return false;
			}
		}
		return true;
	}

	/**
	 * 删除战斗延时，如果玩家在延时内完成播完，执行该方法，取消延时
	 * @param singleBattle
	 */
	public void dropSingleDelay(SingleBattle singleBattle) throws AppException{
		if (!isSingleBattleAllReady(singleBattle)) {// 如果没有全部准备好，继续延时
			return;
		}
		// 删除延时时钟任务，立即执行操作
		String jobId;
		switch (singleBattle.getDelayStatus()) {
		case SingleBattle.DELAY_STATUS_READY:// 战场开启延时
			break;
		case SingleBattle.DELAY_STATUS_ACTION:// 动画延时
			jobId = BATTLE_JOB_STRING_ACTION + singleBattle.getBattleId();
			if (ExecuteBattleJob.isExist(jobId)) {
				ExecuteBattleJob.deleteBattleJob(jobId);
			}
			doSingleActionDelay(singleBattle);
			break;
		case SingleBattle.DELAY_STATUS_ROUND_END:// 小回合结束延时
			jobId = BATTLE_JOB_STRING_END + singleBattle.getBattleId();
			if (ExecuteBattleJob.isExist(jobId)) {
				ExecuteBattleJob.deleteBattleJob(jobId);
			}
			doSingleEndDelay(singleBattle);
			break;

		default:
			break;
		}
	}

	/**
	 * 操作回合quartz的Job中调用的方法
	 * @param singleBattle
	 */
	public void doSingleOperate(SingleBattle singleBattle) {
		System.out.println("--------------------------------------------------------操作倒计时  "+singleBattle.getRoundTime());
		if(isAllNotInBattle(singleBattle.getAuthorityMap())){
			forbidUserOperate(singleBattle);// 禁止玩家操作
			// 到时间普通攻击操作
			Map<String, Object> attackResult = BattleMath
					.commonAttackForSingleBattle(singleBattle);
			userOperateResult(attackResult, singleBattle);
			return;
		}
		SingleBattleObject operator = singleBattle.getOperateHero();
		if (singleBattle.getRoundTime() == 0) {
//			singleBattle.setDelayStatus(SingleBattle.DELAY_STATUS_ACTION);// 延时开启，玩家无法操作
			forbidUserOperate(singleBattle);// 禁止玩家操作
			// 到时间普通攻击操作
			Map<String, Object> attackResult = BattleMath
					.commonAttackForSingleBattle(singleBattle);
			userOperateResult(attackResult, singleBattle);
		} else {
			userComet.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_TIME, operator.getCharacterId(), String.valueOf(singleBattle.getBattleId()), singleBattle.getRoundTime());
//			userComet.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_TIME,
//					operator.getCharacterId(), singleBattle.getBattleId(),
//					singleBattle.getRoundTime());
			// //回合时间减1
			singleBattle.setRoundTime(singleBattle.getRoundTime() - 1);
		}
	}

	/**
	 * 单挑回合动画延时quartz的Job中调用的方法
	 * @param singleBattle
	 */
	public void doSingleActionDelay(SingleBattle singleBattle){
		System.err.println("-------------------正在执行doSingleActionDelay");
		// 延时时间到，自动执行小回合结束
		if (singleBattle.getHeroA().isWin() || singleBattle.getHeroB().isWin()) {
			// 执行战斗结束
			endSingleBattle(singleBattle);
			return;
		}
		// 进入小回合结束延时
		addSingleDelayJob(SingleBattle.DELAY_STATUS_ROUND_END, singleBattle);

		singleBattleRoundEnd(singleBattle);
	}

	/**
	 * 单挑回合结束延时quartz的Job中调用的方法
	 * @param singleBattle
	 */
	public void doSingleEndDelay(SingleBattle singleBattle) {
		singleBattleOperate(singleBattle);
	}

	/**
	 * 单挑回合准备阶段quartz的Job中调用的方法
	 * @param singleBattle
	 */
	public void doSingleReadyDelay(SingleBattle singleBattle) {
		singleBattle.setFighting(true);
		singleBattleOperate(singleBattle);// 操作开始
	}



	 /**
	 * 单挑战场结束
	 * @param singleBattle
	 * @param winId
	 * @param loseId
	 */
	public void endSingleBattle(SingleBattle singleBattle){
		MailService mailService = (MailService)ServiceLocator.getSpringBean("mailService");
		try {
			for (SingleBattleObject i : singleBattle.getAuthorityMap().values()) {
				Map<String, Object> data = new HashMap<String,Object>();
				data.put("isWin", i.isWin());
				//奖励信息代码
				if(i.isWin()){
					mailService.sendMail(i.getCharacterId(), Const.CHARACTER_SYSTEM_ID, "战斗胜利", "单挑"+singleBattle.getTargetHero(i.getCharacterId()).getHeroForBattle().getHeroName()+"成功");
					setBattleReward(data, i.getCharacterId(), singleBattle, i);
				}else{
					mailService.sendMail(i.getCharacterId(), Const.CHARACTER_SYSTEM_ID, "战斗失败", "单挑"+singleBattle.getTargetHero(i.getCharacterId()).getHeroForBattle().getHeroName()+"失败");
				}
				userComet.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_END,i.getCharacterId(), String.valueOf(singleBattle.getBattleId()), data);
//				userComet.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_END, i
//						.getCharacterId(), singleBattle
//						.getBattleId(), data);
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			closeBattle(singleBattle.getBattleId());
		}
		//返回出征队列
		callBackQueueForBattleEnd(singleBattle.getBattleId());
		System.out.println("战斗结束");
		// 关闭战场，删除缓存
		closeBattle(singleBattle.getBattleId());
		// 返回出征

	}
	/**
	 * 添加奖励并返回奖励信息
	 * @param data
	 * @param characterId
	 * @param singleBattle
	 * @throws AppException
	 */
	private void setBattleReward(Map<String, Object> data, int characterId, SingleBattle singleBattle, SingleBattleObject mine) throws AppException{
		SingleBattleObject singleBattleObject = singleBattle.getTargetHero(characterId);
		if(singleBattleObject.getStatus()==Const.FIGHT_STATUS_NPC){
			//获得野怪奖励
			StaticBattleReward singleBattleReward = BattleRewardCache.getBattleReward(singleBattleObject.getEnemyNo());
			List<StaticArticleReward> articleRewards = BattleRewardCache.getArticleReward(singleBattleReward.getArticleReward1());
			List<Object> articleList = new ArrayList<Object>();
			for(StaticArticleReward i:articleRewards){
				if(RandomFunc.isSuccessfulPrecision(i.getDropRate())){
					articleList.add(getArticleInfo(i));
				}
			}
			data.put("addExploit", singleBattleReward.getExploitReward());
			data.put("addExp", singleBattleReward.getExpReward());
			data.put("addFood", singleBattleReward.getFoodReward());
			data.put("addWood", singleBattleReward.getWoodReward());
			data.put("addStone", singleBattleReward.getStoneReward());
			data.put("addIronore", singleBattleReward.getIronoreReward());
			data.put("articleList", articleList);
			//更新奖励
			MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
			Maincity maincity = maincityService.getMaincity(characterId);
			long updateFood = maincity.getFood()+singleBattleReward.getFoodReward();
			long updateWood = maincity.getWood()+singleBattleReward.getWoodReward();
			long updateStone = maincity.getStone()+singleBattleReward.getStoneReward();
			long updateIronore = maincity.getIronore()+singleBattleReward.getIronoreReward();
			maincity.setFood(updateFood<maincity.getFoodLimit()?updateFood:maincity.getFoodLimit());
			maincity.setWood(updateWood<maincity.getWoodLimit()?updateWood:maincity.getWoodLimit());
			maincity.setStone(updateStone<maincity.getStoneLimit()?updateStone:maincity.getStoneLimit());
			maincity.setIronore(updateIronore<maincity.getIronoreLimit()?updateIronore:maincity.getIronoreLimit());
			maincityService.updateSuburbsResource(characterId, maincity.getFood(), maincity.getWood(), maincity.getStone(), maincity.getIronore());
			UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
			if(singleBattleReward.getExpReward()!=0){
				userHeroService.addExp(characterId, mine.getHeroForBattle().getUserheroId(), singleBattleReward.getExpReward());
			}
			if(singleBattleReward.getExploitReward()!=0){
				userHeroService.addExploit(characterId, mine.getHeroForBattle().getUserheroId(), singleBattleReward.getExploitReward());
			}
			//任务
			QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
			questService.updateQuestSchedule(QuestTargeType.BUILDING_LEVEL, singleBattleObject.getEnemyNo(), characterId);
		}else{
			//获取玩家单挑奖励，目前没开放
		}
	}
	private Object getArticleInfo(StaticArticleReward i) throws AppException{
		switch (i.getItemType()) {
		case Const.TYPE_EQUIPMENT:
			
			return EquipmentCache.getEquipmentByNo(i.getItemNo());
		case Const.TYPE_ITEM:
			
			return ItemCache.getItemByNo(i.getItemNo());
		case Const.TYPE_MATERIAL:
			
			return MaterialCache.getMaterialByNo(i.getItemNo());
		case Const.TYPE_QUESTS:
			
			return QuestsCache.getQuestsByNo(i.getItemNo());

		default:
			throw new AppException("奖励物品类型错误");
		}
	}
	public void callBackQueueForBattleEnd(int battleJobQueueId){
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		BattleJobQueue battleJobQueue = battleService.selectBattleQueueById(battleJobQueueId);
		Date date = new Date();
		battleJobQueue.setBackTime(date);
		battleJobQueue.setBackArriveTime(TimeUtil.add(battleJobQueue.getNeedTime(), date));
		battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
		battleService.updateBattelQueue(battleJobQueue);
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("battleData", battleJobQueue);
		ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data, battleJobQueue.getBackArriveTime(), BattleService.BATTLE_JOB_STRING+battleJobQueueId);
	}

	/*********************** 单挑资源 *******************************/
	/**
	 * 获取单挑资源，用于加载战场资源
	 * 
	 * @param battleJobQueueId
	 * @param battleType
	 * @return
	 * @throws AppException
	 */
	public Map<String, Object> getBattleResourceForSingle(int battleJobQueueId)
			throws AppException {
		Map<String, Object> retMap = new HashMap<String,Object>();
		SingleBattle singleBattle = BATTLE_DATA.get(String.valueOf(battleJobQueueId))
				.getSingleBattle();
		HeroForBattle heroA = singleBattle.getHeroA().getHeroForBattle();
		HeroForBattle heroB = singleBattle.getHeroB().getHeroForBattle();
		// 武将资源
		List<StaticImageResource> challengeActions = new ArrayList<StaticImageResource>();
		challengeActions.add(ImageResourceCache.getResourceByNo(heroA
				.getHeroActionWeapon() + "01"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroA
				.getHeroActionWeapon() + "02"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroA
				.getHeroActionWeapon() + "03"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroA
				.getHeroActionWeapon() + "04"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroA
				.getHeroActionWeapon() + "05"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroA
				.getHeroActionWeapon() + "06"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroA
				.getHeroActionWeapon() + "07"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroB
				.getHeroActionWeapon() + "01"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroB
				.getHeroActionWeapon() + "02"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroB
				.getHeroActionWeapon() + "03"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroB
				.getHeroActionWeapon() + "04"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroB
				.getHeroActionWeapon() + "05"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroB
				.getHeroActionWeapon() + "06"));
		challengeActions.add(ImageResourceCache.getResourceByNo(heroB
				.getHeroActionWeapon() + "07"));
		// 技能资源
		Map<String, Object> challengeAction = new HashMap<String,Object>();
		challengeAction.put("resourcePath", "challengeAction");
		challengeAction.put("resources", challengeActions);
		retMap.put("challengeAction", challengeAction);
		// 战场UI资源
		Map<String, Object> battlefieldUI = new HashMap<String,Object>();
		battlefieldUI.put("resourcePath", "battlefieldUI");
		battlefieldUI
				.put("resources", ImageResourceCache.getResourcesByType(1));
		retMap.put("battlefieldUI", battlefieldUI);

		// List<SkillOjbect> skillOjbectsA = heroA.getHeroSkill();
		// for(SkillOjbect i : skillOjbectsA){//有持续性特效需添加持续性特效
		// StaticHeroSkill j = i.getStaticHeroSkill();
		// retList.add(j.getIcon());
		// retList.add(j.getAnimationSingle());
		// retList
		// }
		// List<SkillOjbect> skillOjbectsB = heroB.getHeroSkill();
		// for(SkillOjbect i : skillOjbectsB){
		// StaticHeroSkill j = i.getStaticHeroSkill();
		// retList.add(j.getIcon());
		// retList.add(j.getAnimationSingle());
		// }
		// 缺ai技能
		// 缺buff资源
		return retMap;
	}

	
	/**
	 * 移除征战（派遣）中的一个军队队列
	 * 
	 * @param queue
	 */
	public static void removeBattleQueue(BattleJobQueue queue){
		int targetCharacterId = queue.getTargetId();//目标君主id
		initBattle(targetCharacterId);
		//阵营类型敌营/军营
		int battleCampType = queue.getBattleType() == Const.BATTLE_TYPE_SENDBATTLE ? Const.BATTLE_CAMP_FRIEND : Const.BATTLE_CAMP_ENEMY;
		if(BATTLE_QUEUES.get(targetCharacterId).get(battleCampType).contains(queue)){
			BATTLE_QUEUES.get(targetCharacterId).get(battleCampType).remove(queue);
		}
		if(queue.getStatus() == Const.BATTLE_STATUS_WAIT_FIGHT){
			int type = Const.BATTLE_CAMP_FRIEND;
			if(queue.getBattleType() == Const.BATTLE_TYPE_MULTIBATTLE){
				type = Const.BATTLE_CAMP_ENEMY;
			}
			getBattleJobQueueByType(queue.getTargetId(), type);
		}
	}
	/**
	 * 清除战场上有关军队的所有缓存信息
	 * @param queue
	 */
	public static void clearBattleFeildDataByBattleQueue(BattleJobQueue queue){
		//1.退出并更新城郊
		removeBattleQueue(queue);
		//2.退出相关战场
		BATTLE_FEILDS.remove(getOtherbattleQueueId(queue.getId()));
		System.err.println(getOtherbattleQueueId(queue.getId())+"退出战场");
		BATTLE_FEILDS.remove(queue.getId());
		System.err.println(queue.getId()+"退出战场");
		//3.删除积分
		if(BATTLE_SCORE_MAP.get(queue.getTargetId()) != null){
			BATTLE_SCORE_MAP.get(queue.getTargetId()).remove(queue.getId());
		}
	}
	/**
	 * 添加征战（派遣）待命队列
	 * @param queue 行军队列
	 */
	public static void addBattleQueue(BattleJobQueue queue){
		if(queue.getStatus() != Const.BATTLE_STATUS_WAIT){
			BattleService bs = (BattleService)ServiceLocator.getSpringBean("battleService");
			queue.setStatus(Const.BATTLE_STATUS_WAIT);
			bs.updateBattelQueue(queue);
		}
		int targetCharacterId = queue.getTargetId();//目标君主id
		initBattle(targetCharacterId);
		//阵营类型敌营/军营
		int battleCampType = queue.getBattleType() == Const.BATTLE_TYPE_SENDBATTLE ? Const.BATTLE_CAMP_FRIEND : Const.BATTLE_CAMP_ENEMY;
		if(BATTLE_QUEUES.get(targetCharacterId).get(battleCampType).contains(queue)){
			return;
		}
		BATTLE_QUEUES.get(targetCharacterId).get(battleCampType).add(queue);
	}
	/**
	 * 获得（并改变）当前军队状态（主要用于出征和派遣是否进入城郊）
	 * @param queue
	 * @throws AppException 
	 */
	public  static BattleJobQueue resetState(BattleJobQueue queue){
		if(queue == null){
			return null;
		}else if(queue.getTargetType() != Const.TARGET_TYPE_CHAR){
			return queue;
		}
		initBattle(queue.getTargetId());
		
		if(queue.getStatus() == Const.BATTLE_STATUS_WAIT){//对等待状态进行重设
			if(queue.getBattleType() == Const.BATTLE_TYPE_MULTIBATTLE){
				if(getBattleJobQueueByType(queue.getTargetId(), Const.BATTLE_CAMP_ENEMY).contains(queue)){
					queue.setStatus(Const.BATTLE_STATUS_WAIT_FIGHT);
				}
			}else{
				if(getBattleJobQueueByType(queue.getTargetId(), Const.BATTLE_CAMP_FRIEND).contains(queue)){
					queue.setStatus(Const.BATTLE_STATUS_WAIT_FIGHT);
				}
			}
		}
		return queue;
	}
	/**
	 * 获得对应城郊的军队对垒情况
	 * @param targetId
	 * @param type 1友军，2敌人
	 * @return
	 */
	public static List<BattleJobQueue> getBattleJobQueueByType(int targetId,int type){
		initBattle(targetId);
		List<BattleJobQueue> battleList = new ArrayList<BattleJobQueue>();
		int i = 1;
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		int queueLimit = BATTLE_QUEUE_LIMIT;
		if(type == Const.BATTLE_CAMP_FRIEND){
			queueLimit = BATTLE_QUEUE_LIMIT - 1;
		}
		for(BattleJobQueue battle : BATTLE_QUEUES.get(targetId).get(type)){
			if(i <= queueLimit && battle.getStatus() >= Const.BATTLE_STATUS_WAIT){
				
				if(battle.getStatus() == Const.BATTLE_STATUS_WAIT){
					if(LockUtil.isExitLock(targetId,"battleBackTimeReset")){
						synchronized (LockUtil.getLock(targetId,"battleBackTimeReset")) {
							battle.setStatus(Const.BATTLE_STATUS_WAIT_FIGHT);
							battleService.updateBattelQueue(battle);
						}
					}else{
						battle.setStatus(Const.BATTLE_STATUS_WAIT_FIGHT);
						battleService.updateBattelQueue(battle);
					}
					BATTLE_BACKTIME_MAP.put(targetId,new Date());
				}
				battleList.add(battle);
			}else if(i > queueLimit){
				break;
			}
			i++;
		}
		return battleList;
	}
	/**
	 * 根据君主id查询 自己是否正在被攻击（即是否有敌人已经兵临城下）
	 * @param targetCharacterId
	 * @return
	 */
	public static boolean isAttackeding(int targetCharacterId){
		initBattle(targetCharacterId);
		if(BATTLE_QUEUES.get(targetCharacterId).get(Const.BATTLE_CAMP_ENEMY) == null || BATTLE_QUEUES.get(targetCharacterId).get(Const.BATTLE_CAMP_ENEMY).isEmpty()){
			return false;
		}
		return true;
	}
	/**
	 * 获得等待进入城郊的军队情况
	 * @param targetId
	 * @param type 1友军，2敌人
	 * @return
	 */
	public static List<Map<String,Object>> getWaitBattleJobQueueByType(int targetId,int type){
		initBattle(targetId);
		List<Map<String,Object>> battleList = new ArrayList<Map<String,Object>>();
		Map<String,Object> map = null;
		int i = 1;
		int queueLimit = BATTLE_QUEUE_LIMIT;
		if(type == Const.BATTLE_CAMP_FRIEND){
			queueLimit = BATTLE_QUEUE_LIMIT -1;
		}
		for(BattleJobQueue battle : BATTLE_QUEUES.get(targetId).get(type)){
			if(i > queueLimit && battle.getStatus() == Const.BATTLE_STATUS_WAIT){
				map = new HashMap<String, Object>();
				map.put("type", type);
				map.put("characterName", battle.getCharacterName());
				map.put("forceAmount", battle.getUserForce());
				String[] heroList = battle.getHeroList().split(",");
				int amount = 0;
				for(String h:heroList){
					if(!h.equals("0") && !h.isEmpty()){
						amount++;
					}
				}
				map.put("teamAmount", amount);
				battleList.add(map);
			}
			i++;
		}
		return battleList;
	}
	/**
	 * 判断某个行军队列是否可以战斗（队列前五名可以战斗）
	 * @param targetCharacterId目的地君主id
	 * @param queue 战斗队列，null时表示目标君主战斗队列
	 * @throws AppException 
	 */
	public static boolean isCanfighting(int targetCharacterId,BattleJobQueue queue) throws AppException{
		initBattle(targetCharacterId);
		if(BATTLE_QUEUES.get(targetCharacterId) == null){
			throw new AppException("没有军情,无法开战");
		}
		if(queue == null){//君主是否可以战斗
			if(BATTLE_QUEUES.get(targetCharacterId).get(Const.BATTLE_CAMP_ENEMY) == null || BATTLE_QUEUES.get(targetCharacterId).get(Const.BATTLE_CAMP_ENEMY).isEmpty()){
				//没有敌军时不能战斗
				throw new AppException("没有敌军,无法开战");
			}else if(BATTLE_QUEUES.get(targetCharacterId).get(Const.BATTLE_CAMP_FRIEND) != null && !BATTLE_QUEUES.get(targetCharacterId).get(Const.BATTLE_CAMP_FRIEND).isEmpty()){
				//尚有援军没有被消灭时不能战斗
				throw new AppException("援军没有被击溃,君主暂时无法战斗");
			}
			return true;
		}else if(queue.getTargetId() != targetCharacterId){
			throw new AppException("参数错误");
		}
		//阵营类型敌营/军营
		int battleCampType = queue.getBattleType() == Const.BATTLE_TYPE_SENDBATTLE ? Const.BATTLE_CAMP_FRIEND : Const.BATTLE_CAMP_ENEMY;
		
		int queueLimit = BATTLE_QUEUE_LIMIT;
		if(battleCampType == Const.BATTLE_CAMP_FRIEND){
			queueLimit = BATTLE_QUEUE_LIMIT -1;
		}
		if(BATTLE_QUEUES.get(targetCharacterId).get(battleCampType) != null){
			int i = 1;
			for(BattleJobQueue bq : BATTLE_QUEUES.get(targetCharacterId).get(battleCampType)){
				//队列为前五名时可以战斗
				if(i > queueLimit){
					throw new AppException(queue.getCharacterName()+"的队伍暂时没有到达城郊,无法开战");
				}else if(bq.getId() == queue.getId()){
					return true;
				}
				i++;
			}
			
		}
		return false;
	}
	/**
	 * 初始化
	 * @param targetId
	 */
	private static void initBattle(Integer targetId){
		if(BATTLE_QUEUES.get(targetId) != null){
			return;
		}
		synchronized (LockUtil.getLock(targetId, "initBettle")) {
			if(BATTLE_QUEUES.get(targetId) != null){
				return;
			}
			BATTLE_QUEUES.put(targetId, new ConcurrentHashMap<Integer, Queue<BattleJobQueue> >());
			BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
			Queue<BattleJobQueue> battleQueue = battleService.getBattleQueueForSuburbByStatus(targetId, Const.BATTLE_TYPE_MULTIBATTLE);//讨伐
			if(battleQueue != null && !battleQueue.isEmpty()){
				BATTLE_QUEUES.get(targetId).put(Const.BATTLE_CAMP_ENEMY, battleQueue);
			}else{
				BATTLE_QUEUES.get(targetId).put(Const.BATTLE_CAMP_ENEMY, new ConcurrentLinkedQueue<BattleJobQueue>() );
			}
			Queue<BattleJobQueue> battleQueue2 = battleService.getBattleQueueForSuburbByStatus(targetId, Const.BATTLE_TYPE_SENDBATTLE);//派遣
			if(battleQueue2 != null && !battleQueue2.isEmpty()){
				BATTLE_QUEUES.get(targetId).put(Const.BATTLE_CAMP_FRIEND, battleQueue2);
			}else{
				BATTLE_QUEUES.get(targetId).put(Const.BATTLE_CAMP_FRIEND, new ConcurrentLinkedQueue<BattleJobQueue>() );
			}
		}
	}
	
	public void closeBattle(int battleId) {
		BATTLE_DATA.remove(String.valueOf(battleId));
	}
	/**
	 * 征战/派遣军队开始战斗
	 * @param characterId 自身君主id
	 * @param battleQueueId 行军队伍编号1（负值代表目标为收方君主-Id）
	 * @param battleQueueId2 行军队伍编号2（负值代表目标为收方君主-Id）
	 * @return
	 * @throws AppException 
	 */
	public MultiBattle beginBattleAttack(int characterId, int battleQueueId,int battleQueueId2) throws AppException {
		if(battleQueueId == battleQueueId2){
			throw new AppException("参数错误");
		}else if(battleQueueId < 0 && battleQueueId2 < 0){
			throw new AppException("参数错误");
		}
		
		//1.统一处理数值：如果有君主（负数）,则赋给battleQueueId
		int temp = battleQueueId;
		if(battleQueueId2 < 0){
			battleQueueId = battleQueueId2;
			battleQueueId2 = temp;
		}

		//2.首先判断双方军队的合法性
		int otherCharacterId = 0;//另一方军队君主id
		Integer targetChacterId = 0;//被围攻君主id
		BattleJobQueue battleQueue = null;
		BattleJobQueue battleQueue2 = null;
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		if(battleQueueId > 0){
			battleQueue = battleService.selectBattleQueueById(battleQueueId);
			if(battleQueue == null){
				throw new AppException("队伍不存在,无法战斗");
			}
			targetChacterId = battleQueue.getTargetId();
		}else{
			targetChacterId = -battleQueueId;
		}
		
		resetSuburbBattleBackTime(targetChacterId);//检查系统是否该踢人
		
		battleQueue2 = battleService.selectBattleQueueById(battleQueueId2);
		if(battleQueue2 == null){
			throw new AppException("队伍不存在,无法战斗");
		}else if(battleQueue2.getTargetId() != targetChacterId){
			throw new AppException("战斗地域参数错误,无法战斗");
		}else if(battleQueue2.getCharacterId() != characterId){
			otherCharacterId = battleQueue2.getCharacterId();
		}else if(battleQueue == null){
			otherCharacterId = targetChacterId;
		}else{
			otherCharacterId = battleQueue.getCharacterId();
		}
		if(battleQueue == null){//如果君主参战
			if(characterId != targetChacterId && characterId != battleQueue2.getCharacterId()){
				throw new AppException("战斗指挥权限错误,无法战斗");
			}
		}else{
			if(characterId != battleQueue.getCharacterId() && characterId != battleQueue2.getCharacterId()){
				throw new AppException("战斗指挥权限错误,无法战斗");
			}
		}
		//3.然后判断双方军队有没有战斗权限

		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		if(otherCharacterId == characterId){
			throw new AppException("自己的军队间权限错误,无法战斗");
		}else if(characterService.isAlliance(characterService.getCharacterById(otherCharacterId), characterService.getCharacterById(characterId))){
			throw new AppException("同盟军战斗权限错误,无法战斗");
		}
		List<Integer> limitList = new ArrayList<Integer>();
		BattleSuburbService battleSuburbService = (BattleSuburbService)ServiceLocator.getSpringBean("battleSuburbServic");
		String battleMsg ="";
		//验证第一个部队的权限
		if(battleQueue == null){
			targetChacterId = -battleQueueId;
			List<BattleJobQueue> defence = BattleProcess.getBattleJobQueueByType(targetChacterId, Const.BATTLE_CAMP_FRIEND);//友军
			limitList = battleSuburbService.getLimit(targetChacterId, -battleQueueId, defence);
			battleMsg = "援军没有被击溃,君主暂时无法参加战斗";
		}else{
			targetChacterId = battleQueue.getTargetId();
			limitList = battleSuburbService.getLimit(targetChacterId, battleQueue.getCharacterId(), null);
			battleMsg = battleQueue.getCharacterName()+"的队伍暂时无法参加战斗";
		}
		if(!limitList.contains(Const.CANATTACK)){
			throw new AppException(battleMsg);
		}
		//验证第二个部队的权限
		limitList = battleSuburbService.getLimit(targetChacterId, battleQueue2.getCharacterId(), null);
		battleMsg = battleQueue2.getCharacterName()+"的队伍暂时无法参加战斗";
		if(!limitList.contains(Const.CANATTACK)){
			throw new AppException(battleMsg);
		}
		//4.其次判断双方军队能不能战斗
		if(!BattleProcess.isCanfighting(targetChacterId, battleQueue)){
			throw new AppException(battleQueue.getCharacterName()+"队伍不满足战斗条件,无法开战");
		}
		if(!BattleProcess.isCanfighting(targetChacterId, battleQueue2)){
			throw new AppException(battleQueue2.getCharacterName()+"队伍不满足战斗条件,无法开战");
		}
		
		//5.创建战斗并枷锁(并且提前判断双方军队是否已有战斗发生)
		this.createBattleField(targetChacterId,battleQueue,battleQueue2);
		//6.给另一方发送战斗消息
		  userComet.deliverToGameChannel(Const.BATTLE_CHANNEL_TYPE_ATTACK,otherCharacterId, "");
		//7.加载战斗
		  //重新排序战队队列，battleQueue（友军/君主），battleQueue2（敌军）
		BattleJobQueue tempBattle = null;
		if(battleQueue != null){
			if(characterService.isAlliance(characterService.getCharacterById(battleQueue2.getCharacterId()), characterService.getCharacterById(targetChacterId))){
				tempBattle = battleQueue;
				battleQueue = battleQueue2;
				battleQueue2 = tempBattle;
			}
		}
		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti)ServiceLocator.getSpringBean("battleProcessForMulti");
		return battleProcessForMulti.initMultiBattleForPk(battleQueue2, battleQueue, targetChacterId);
	}
	private void createBattleField(Integer targetId,BattleJobQueue battleQueue, BattleJobQueue battleQueue2) throws AppException {
		int battleId = 0;
		synchronized (LockUtil.getLock(targetId, "createBettle")) {
			if(battleQueue == null){
				battleId = -targetId;
			}else{
				battleId = battleQueue.getId();
			}
			if(!BATTLE_FEILDS.containsKey(battleId) && !BATTLE_FEILDS.containsKey(battleQueue2.getId())){
				List<Map<String,Object>> battleField = new ArrayList<Map<String,Object>>();
				BATTLE_FEILDS.put(battleId, battleField);
				BATTLE_FEILDS.put(battleQueue2.getId(), battleField);
			}else{
				throw new AppException("战斗已经锁定,无法再次战斗");
			}
		}
		//判断倒计时是否已经系统踢人
		if(Const.BATTLE_BACKTIME_DATE.getTime() ==  BATTLE_BACKTIME_MAP.get(targetId).getTime()){
			BATTLE_FEILDS.remove(battleId);
			BATTLE_FEILDS.remove(battleQueue2.getId());
			throw new AppException("已超过最大等待时间,队伍已经返回,开战失败.");
		}
		//向战场中添加战斗双方数据
		List<Map<String,Object>> battleField = new ArrayList<Map<String,Object>>();
		Map<String,Object> battleMap = new HashMap<String, Object>();
		Map<String,Object> battleMap2 = new HashMap<String, Object>();
		WallDefensenService wallDefensenService = (WallDefensenService)ServiceLocator.getSpringBean("walldefService");
		UserWallHero wallHero = wallDefensenService.getBaseWallHero(targetId);
		double ForceAmount = 0;
		if(battleQueue == null){
			if(wallHero != null){
				ForceAmount = wallHero.getWallCombat();
			}
		}else{
			ForceAmount = battleQueue.getUserForce();
		}
		battleMap.put("id", battleId);
		battleMap.put("forceAmount", ForceAmount);
		battleMap2.put("id", battleQueue2.getId());
		battleMap2.put("forceAmount", battleQueue2.getUserForce());
		battleField.add(battleMap);
		battleField.add(battleMap2);
		BATTLE_FEILDS.get(battleId).addAll(battleField);
		BATTLE_FEILDS.get(battleQueue2.getId()).addAll(battleField);
		
		//更改队列中战斗状态
		int limit = BATTLE_QUEUE_LIMIT;
		int i = 1;
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		for(BattleJobQueue bq : BATTLE_QUEUES.get(targetId).get(Const.BATTLE_CAMP_ENEMY)){
			if(battleQueue != null && bq.getId() == battleQueue.getId()){
				bq.setStatus(Const.BATTLE_STATUS_FIGHTING);
				battleQueue = bq;
				break;
			}
			if(bq.getId() == battleQueue2.getId()){
				bq.setStatus(Const.BATTLE_STATUS_FIGHTING);
				battleQueue2 = bq;
				break;
			}
			if(i > limit){
				break;
			}
			i++;
		}
		limit = BATTLE_QUEUE_LIMIT - 1;
		i = 1;
		for(BattleJobQueue bq : BATTLE_QUEUES.get(targetId).get(Const.BATTLE_CAMP_FRIEND)){
			if(battleQueue != null && bq.getId() == battleQueue.getId()){
				bq.setStatus(Const.BATTLE_STATUS_FIGHTING);
				battleQueue = bq;
				break;
			}
			if(bq.getId() == battleQueue2.getId()){
				bq.setStatus(Const.BATTLE_STATUS_FIGHTING);
				battleQueue2 = bq;
				break;
			}
			if(i > limit){
				break;
			}
			i++;
		}
		if(battleQueue != null){
			battleService.updateBattelQueue(battleQueue);
		}
		battleService.updateBattelQueue(battleQueue2);
	}
	/**
	 * 是否在战斗中
	 * @return
	 */
	public  static boolean isFightingBybattleId(int battleId){
		return BATTLE_FEILDS.containsKey(battleId);
	}
	/**
	 * 根据一个军队编号获得与之正在战斗的另一个战队的编号（如果没有则返回0）
	 * @param battleId
	 * @return
	 */
	public static int getOtherbattleQueueId(int battleId){
		if(isFightingBybattleId(battleId)){
			Map<String,Object> map = getOtherBattleFromBattleField(battleId, true);
			return  map==null?0:(Integer)map.get("id");
		}
		return 0;
	}
	/**
	 * 在战场中根据军队编号和查询对象类型查询军队基础信息
	 * @param battleId 军队编号
	 * @param isOther 是否查询的是对方军队
	 * @return
	 */
	public static Map<String,Object> getOtherBattleFromBattleField(int battleId,boolean isOther){
		List<Map<String,Object>> battleIdList = BATTLE_FEILDS.get(battleId);
		if(battleIdList != null && !battleIdList.isEmpty()){
			for(Map<String,Object> map :battleIdList){
				int id = (Integer) map.get("id");
				if(id != battleId && isOther){
					return map;
				}else{
					return map;
				}
			}
		}
		return null;
	}
	/**
	 * 战斗结果出来以后的处理(系统调用，不提供外部接口)
	 * @param battleId 战队1的id（如果是被围攻君主则为负数即-君主id）
	 * @param battleId2 战队2的id（如果是被围攻君主则为负数即-君主id）
	 * @param winerId 胜利方战队的id（如果是被围攻君主则为负数即-君主id）
	 * @param winSoliderLoss 胜利方战队的损失兵数
	 * @param failSoliderLoss 失败方战队的损失兵数
	 * @return
	 * @throws AppException 
	 */
	public static Object getBattleOver(int battleId,int battleId2,int winerId,int winSoliderLoss,int failSoliderLoss) throws AppException{
		//先排序有小到大即battleId<battleId2
		int temp = battleId2;
		if(battleId > battleId2){
			battleId2 = battleId;
			battleId = temp;
		}
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService"); 
		BattleJobQueue battleQueue2 = battleService.selectBattleQueueById(battleId2);
		if(battleQueue2 == null){
			return null;
		}
		Integer targetId = battleQueue2.getTargetId();
		synchronized (LockUtil.getLock(battleId+","+battleId2, "BattleOver")) {
			//是否在战斗中，如果不在即战斗结束，直接返回
			if(!isFightingBybattleId(battleId)){
				return null;
			}
			
			//战斗结束奖励和修改
			if(BATTLE_SCORE_MAP.get(targetId) == null){//初始化战场积分
				BATTLE_SCORE_MAP.put(targetId, new ConcurrentHashMap<Integer, Integer>());
			}
			MailService mailService = (MailService)ServiceLocator.getSpringBean("mailService");
			if(winerId < 0){//获胜方是：被围君主id
				if(BATTLE_QUEUES.get(targetId).get(Const.BATTLE_CAMP_ENEMY).isEmpty()){//如果没有敌军则收方胜利
					//守方战斗胜利,发送系统报告
					mailService.sendMail(targetId, Const.CHARACTER_SYSTEM_ID, "战斗结果","恭喜你成功抵御下本次敌人的攻击");
					BATTLE_BACKTIME_MAP.remove(targetId);
				}//否则战斗继续待战--不需操作
				//改变失败者队伍状态撤退
				battleService.retreatBattleQueue(battleQueue2.getId(), battleQueue2.getCharacterId(),true);
				mailService.sendMail(battleQueue2.getCharacterId(), Const.CHARACTER_SYSTEM_ID, "战斗结果","很遗憾本次讨伐失败,你的队伍自动返回");
			}else{//获胜方是：普通军队
				//如果有君主参战,则君主失败，则是君主城池被攻破，攻方胜利
				if(battleId < 0){
					//胜利方加积分
					Integer cur_score = BATTLE_SCORE_MAP.get(targetId).get(battleQueue2.getId());
					cur_score = cur_score == null ? 0 : cur_score;
					int score = getScoreNum(true,failSoliderLoss,getForceNumByBattleId(battleId2),getForceNumByBattleId(battleId));
					BATTLE_SCORE_MAP.get(targetId).put(battleId2, cur_score+score);
					
					//发系统消息和奖励
					BattleAward(BATTLE_SCORE_MAP.get(targetId),targetId);
					BATTLE_SCORE_MAP.remove(targetId);
				}else{//没有君主参战
					BattleJobQueue battleQueue = battleService.selectBattleQueueById(battleId);
					//胜利方加积分
					Integer cur_score = BATTLE_SCORE_MAP.get(targetId).get(winerId);
					cur_score = cur_score == null ? 0 : cur_score;
					if(battleId == winerId){
						int score = getScoreNum(true,failSoliderLoss,getForceNumByBattleId(winerId),getForceNumByBattleId(battleId2));
						BATTLE_SCORE_MAP.get(targetId).put(winerId, score+cur_score);
						//更改胜利方军队状态
						battleQueue.setStatus(Const.BATTLE_STATUS_WAIT_FIGHT);
						battleService.updateBattelQueue(battleQueue);
						mailService.sendMail(battleQueue.getCharacterId(), Const.CHARACTER_SYSTEM_ID, "战斗结果","恭喜你,你的部队已打败对手,自动转入待战中.");
						//撤退
						battleService.retreatBattleQueue(battleQueue2.getId(), battleQueue2.getCharacterId(),true);
						mailService.sendMail(battleQueue2.getCharacterId(), Const.CHARACTER_SYSTEM_ID, "战斗结果","很遗憾,你的部队已被击溃,自动返回.");
					}else{
						int score = getScoreNum(true,failSoliderLoss,getForceNumByBattleId(winerId),getForceNumByBattleId(battleId));
						BATTLE_SCORE_MAP.get(targetId).put(winerId, score+cur_score);
						//更改胜利方军队状态
						battleQueue2.setStatus(Const.BATTLE_STATUS_WAIT_FIGHT);
						battleService.updateBattelQueue(battleQueue2);
						mailService.sendMail(battleQueue2.getCharacterId(), Const.CHARACTER_SYSTEM_ID, "战斗结果","恭喜你,你的部队已打败对手,自动转入待战中.");
						
						//撤退
						battleService.retreatBattleQueue(battleQueue.getId(), battleQueue.getCharacterId(),true);
						mailService.sendMail(battleQueue.getCharacterId(), Const.CHARACTER_SYSTEM_ID, "战斗结果","很遗憾,你的部队已被击溃,自动返回.");
					}
				}
			}
			LockUtil.remove(battleId+","+battleId2, "BattleOver");
		}
		if(BATTLE_BACKTIME_MAP.get(targetId) != null){
			BATTLE_BACKTIME_MAP.put(targetId,new Date());//重置倒计时时间
		}
		return null;
	}
	/**
	 * 根据军队编号在战场中查询该军队战力信息
	 * @param battleId2
	 * @return
	 */
	private static double getForceNumByBattleId(int battleId2) {
		if(isFightingBybattleId(battleId2)){
			return  (Double) getOtherBattleFromBattleField(battleId2, false).get("forceAmount");
		}
		return 0;
	}
	/**
	 * 根据战斗结果结算积分
	 * @param faileIsCharacter 失败方是否是君主
	 * @param failSoliderLoss  失败方损失兵数
	 * @param WinderForceAmount  胜利方原来战力
	 * @param otherForceAmount  失败方原来战力
	 * @return
	 */
	private static Integer getScoreNum(boolean faileIsCharacter, int failSoliderLoss,double WinderForceAmount,double otherForceAmount) {
		int soliderScore = failSoliderLoss/100;//消灭兵数积分
		int battleScore = 0;//战斗胜利积分
		if(faileIsCharacter){
			battleScore = 400; 
		}else if(otherForceAmount >= (double)(WinderForceAmount/5)){
			battleScore = 150; 
		}
		return soliderScore + battleScore;
	}

	/**
	 * 根据军队情况返回在该城郊是否还有更多部队
	 * @param targetId被围攻君主id
	 * @param camp阵营
	 * @param characterId 我自己君主id
	 * @return
	 */
	public static boolean isHavingMoreByBattleQueue(BattleJobQueue battleQueue){
		if(battleQueue == null){
			return false;
		}
		int targetId = battleQueue.getTargetId();
		int characterId = battleQueue.getCharacterId();
		initBattle(targetId);
		int camp = Const.BATTLE_CAMP_ENEMY;
		if(battleQueue.getBattleType() == Const.BATTLE_TYPE_SENDBATTLE){
			camp = Const.BATTLE_CAMP_FRIEND;
		}
		boolean isMore = false;
		for(BattleJobQueue battle : BATTLE_QUEUES.get(targetId).get(camp)){
			if(characterId == battle.getCharacterId()){
				isMore = true;
				break;
			}
		}
		
		return isMore;
	}
	/**
	 * 征伐胜利发放奖励和发送消息
	 * @param winerList 挑战胜利战队编号列表及对应的积分
	 * @param targetId 被攻击君主id
	 * @throws AppException 
	 */
	private static void BattleAward(Map<Integer, Integer> winerList, Integer targetId) throws AppException {
		int sumScore = 0;
		for(Integer id : winerList.keySet()){ 
			sumScore += winerList.get(id); 
		} 
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Map<Integer,Long> LossingResources = maincityService.getLossingResources(targetId);
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		MailService mailService = (MailService)ServiceLocator.getSpringBean("mailService");
		//发送奖励
		BattleJobQueue battleQueue = null;
		String title = "战斗结果";
		StringBuilder content = new StringBuilder();
		long num = 0;
		boolean isLimitTop = false;
		for(Integer id : winerList.keySet()){ 
			battleQueue = battleService.selectBattleQueueById(id);
			if(battleQueue == null){
				continue;
			}
			content.append("恭喜你的部队成功攻下").append(battleQueue.getTargetName()).append("的城池").append(",");
			num = LossingResources.get(Const.CELLAR_PROTECTION_FOOD)*winerList.get(id)/(sumScore*2);
			isLimitTop = maincityService.addFood(battleQueue.getCharacterId(), num);
			content.append("获得").append(num).append("粮食").append(isLimitTop?"(已达上限)":"").append(",");
			
			num = LossingResources.get(Const.CELLAR_PROTECTION_IRONORE)*winerList.get(id)/(sumScore*2);
			isLimitTop = maincityService.addIronore(battleQueue.getCharacterId(), num);
			content.append(num).append("铁锭").append(isLimitTop?"(已达上限)":"").append(",");

			num = LossingResources.get(Const.CELLAR_PROTECTION_STONE)*winerList.get(id)/(sumScore*2);
			isLimitTop = maincityService.addStone(battleQueue.getCharacterId(),num);
			content.append("获得").append(num).append("石料").append(isLimitTop?"(已达上限)":"").append(",");
			
			num = LossingResources.get(Const.CELLAR_PROTECTION_WOOD)*winerList.get(id)/(sumScore*2);
			isLimitTop = maincityService.addWood(battleQueue.getCharacterId(),num);
			content.append("获得").append(num).append("木材").append(isLimitTop?"(已达上限)":"").append(",");

			num = LossingResources.get(Const.CELLAR_PROTECTION_MONEY)*winerList.get(id)/(sumScore*2);
			isLimitTop = maincityService.addMoney(battleQueue.getCharacterId(),num);
			content.append("获得").append(num).append("铜币").append(isLimitTop?"(已达上限)":"").append(".你的部队已经返回.");
			
			battleService.retreatBattleQueue(battleQueue.getId(), battleQueue.getCharacterId(),true);
			
			mailService.sendMail(battleQueue.getCharacterId(), Const.CHARACTER_SYSTEM_ID, title,content.toString());
		} 
		content = new StringBuilder();
		content.append("你的城池被攻破,损失");
		num = LossingResources.get(Const.CELLAR_PROTECTION_FOOD)/2;
		maincityService.addFood(targetId, -num);
		content.append(num).append("粮食");
		
		num = LossingResources.get(Const.CELLAR_PROTECTION_IRONORE)/2;
		maincityService.addIronore(targetId, -num);
		content.append(num).append("铁锭");
		
		num = LossingResources.get(Const.CELLAR_PROTECTION_STONE)/2;
		maincityService.addStone(targetId, -num);
		content.append(num).append("石料");
		
		num = LossingResources.get(Const.CELLAR_PROTECTION_WOOD)/2;
		maincityService.addWood(targetId, -num);
		content.append(num).append("木材");
		
		num = LossingResources.get(Const.CELLAR_PROTECTION_MONEY)/2;
		maincityService.addMoney(targetId, -num);
		content.append(num).append("铜币");
		//发送消息
		mailService.sendMail(targetId, Const.CHARACTER_SYSTEM_ID, title,content.toString());
		List<BattleJobQueue> list = getBattleJobQueueByType(targetId, Const.BATTLE_CAMP_ENEMY);
		if(!list.isEmpty()){
			for(BattleJobQueue battle:list){
				if(!winerList.containsKey(battle.getId())){
					battleService.retreatBattleQueue(battle.getId(), battle.getCharacterId(),true);
					mailService.sendMail(battle.getCharacterId(), Const.CHARACTER_SYSTEM_ID, title,battle.getTargetName()+"的城池已经陷落,你的部队直接返回.");
				}
			}
		}
	}
	/**
	 * 查询当前所有君主城郊敌人有进行倒计时内存信息的君主id集合
	 * @return
	 */
	public static List<Integer> getSuburBackTimeCharacterList(){
		List<Integer> characterList = new ArrayList<Integer>();
		for(Integer characterId : BATTLE_BACKTIME_MAP.keySet()){
			characterList.add(characterId);
		}
		return characterList;
	}
	/**
	 * 查询被围攻君主城郊系统踢人倒计时时间
	 *    remainSeconds--倒计时时间
	 *    isRuning -- 倒计时是否开启
	 * @param targetCharacterId
	 * @return
	 */
	public static Map<String,Object> getSuburbBattleBackTime(int targetCharacterId){
		Map<String,Object> map = new HashMap<String, Object>();
		long remainSeconds = Const.BATTLE_BACKTIME;
		boolean isRuning = false;
		boolean isFighting = false;
		initBattle(targetCharacterId);
		List<BattleJobQueue> battleQueue = getBattleJobQueueByType(targetCharacterId, Const.BATTLE_CAMP_ENEMY);
		if(!battleQueue.isEmpty()){//有军队并且有战斗发生时候，倒计时暂停，没有军队时也暂停倒计时
			for(BattleJobQueue battle:battleQueue){
				if(isFightingBybattleId(battle.getId())){
					isFighting = true;
					break;
				}
			}
			if(!isFighting){
				isRuning = true;
				remainSeconds = remainSeconds - (new Date().getTime() - BATTLE_BACKTIME_MAP.get(targetCharacterId).getTime())/1000;
			}
		}
		map.put("remainSeconds", remainSeconds);
		map.put("isRuning", isRuning);
		return map;
	}
	/**
	 * 检查城郊战等待倒计时处理及重置
	 * @param targetCharacterId
	 * @throws AppException 
	 */
	public static void resetSuburbBattleBackTime(int targetCharacterId) throws AppException{
		Map<String,Object> map = getSuburbBattleBackTime(targetCharacterId);
		MailService mailService = (MailService)ServiceLocator.getSpringBean("mailService");
		System.err.println("=============城郊倒计时======================================");
		System.err.println("============="+targetCharacterId+"="+(Long)map.get("remainSeconds")+"("+(Boolean) map.get("isRuning")+")=============================");
		System.err.println("=============城郊倒计时======================================");
		if((Boolean) map.get("isRuning") && (Long)map.get("remainSeconds") <= 0){
			synchronized (LockUtil.getLock(targetCharacterId,"battleBackTimeReset")) {
				map = getSuburbBattleBackTime(targetCharacterId);
				if((Boolean) map.get("isRuning") && (Long)map.get("remainSeconds") <= 0){
					//倒计时为0踢人时倒计时时间重置为Const.BATTLE_BACKTIME_DATE
					BATTLE_BACKTIME_MAP.put(targetCharacterId, Const.BATTLE_BACKTIME_DATE);
					
					List<BattleJobQueue> battleQueue = getBattleJobQueueByType(targetCharacterId, Const.BATTLE_CAMP_ENEMY);
					BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
					if(!battleQueue.isEmpty()){
						for(BattleJobQueue battle:battleQueue){
							battleService.retreatBattleQueue(battle.getId(), battle.getCharacterId(),true);
							mailService.sendMail(battle.getCharacterId(), Const.CHARACTER_SYSTEM_ID, "战斗情况","在"+battle.getTargetName()+"城郊内等待时间超过最大等待时间,系统自动强制返回");
						}
					}
					LockUtil.remove(targetCharacterId,"battleBackTimeReset");
				}
			}
		}else if(!isAttackeding(targetCharacterId)){
			BATTLE_BACKTIME_MAP.remove(targetCharacterId);
		}
	}
	/**
	 * 获得战场id
	 * @param id1
	 * @param id2
	 * @return
	 */
	public static String getBattleField(int id1,int id2){
		return id1<id2?id1+","+id2:id1+","+id2;
	}
	/**
	 * 根据军队编号获得战场（虚拟）id
	 * @param battleId
	 * @return
	 */
	public static String getBattleFieldByBattleId(int battleId){
		if(isFightingBybattleId(battleId)){
			return getBattleField(battleId, getOtherbattleQueueId(battleId));
		}
		return null;
	}
	///////////////////////////////
	public UserComet getUserComet() {
		return userComet;
	}
	public void setUserComet(UserComet userComet) {
		this.userComet = userComet;
	}
}
