package com.crystalcg.gamedev.battleProcess;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteBattleJob;
import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battle.service.BattleService;
import com.crystalcg.gamedev.battleProcess.Job.MultiBattleActionDelay;
import com.crystalcg.gamedev.battleProcess.Job.MultiBattleOperateDelay;
import com.crystalcg.gamedev.battleProcess.Job.MultiBattleReadyDelayJob;
import com.crystalcg.gamedev.battleProcess.Job.MultiBattleRoundReadyDelay;
import com.crystalcg.gamedev.battleProcess.domain.BattleData;
import com.crystalcg.gamedev.battleProcess.domain.BuffObject;
import com.crystalcg.gamedev.battleProcess.domain.DefenceWork;
import com.crystalcg.gamedev.battleProcess.domain.MultiBattle;
import com.crystalcg.gamedev.battleProcess.domain.MultiBattleObject;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattle;
import com.crystalcg.gamedev.battleProcess.domain.SkillOjbect;
import com.crystalcg.gamedev.battleProcess.domain.SoldierForBattle;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallHero;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.util.BattleMath;
import com.crystalcg.gamedev.util.BattleMathForMulti;
import com.crystalcg.gamedev.util.ChangeSkillToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.RandomFunc;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.EnemyNPCCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;

/**
 * 讨伐战斗逻辑处理
 * @author jinganyang
 *
 */
public class BattleProcessForMulti {
	public static final String MULTI_BATTLE_JOB_STRING_READY = "multiBattleReadyJob_";
	public static final String MULTI_BATTLE_JOB_STRING_START = "multiBattleStartJob_";
	public static final String MULTI_BATTLE_JOB_STRING_ROUND_READY = "multiBattleRoundReadyJob_";
	public static final String MULTI_BATTLE_JOB_STRING_OPERATE = "multiBattleOperateJob_";
	public static final String MULTI_BATTLE_JOB_STRING_ACTION = "multiBattleActionJob_";
	public static final String MULTI_BATTLE_JOB_STRING_END = "multiBattleEndJob_";
	
	private UserComet userComet;
	////////////////讨伐战场功能操作相关///////////////////////
	/**
	 * 玩家操作，普通攻击
	 * 
	 * @param singleBattle
	 * @param characterId
	 */
	public Boolean commonAttackOperateForMulti(MultiBattle multiBattle, int locationId,
			int characterId) throws AppException{
		if (!canAttackForMultiBattle(multiBattle, characterId)) {
			throw new AppException("还没有到您的操作回合");
		}
		MultiBattleObject attacker = multiBattle.getOperator().getMultiBattleObject();
		SoldierForBattle defencer = multiBattle.getLocationIdList().get(locationId);
		if(attacker.equals(defencer.getMultiBattleObject())){//不能攻击己方
			throw new AppException("不能攻击己方");
		}
//		forbidUserOperate(multiBattle);
		String jobId = MULTI_BATTLE_JOB_STRING_OPERATE
				+ multiBattle.getBattleId();
		ExecuteBattleJob.deleteBattleJob(jobId);
		Map<String, Object> result = BattleMathForMulti
				.commonAttackForSingleBattle(multiBattle.getOperator(), defencer);
		userOperateResult(result, multiBattle);
		return true;
	}
	/**
	 * 操作权限验证
	 * 
	 * @param singleBattle
	 * @param characterId
	 * @return
	 */
	public boolean canAttackForMultiBattle(MultiBattle multiBattle,
			int characterId) {
		// 权限验证
		if (multiBattle == null) {
			// throw new AppException("战斗已结束，无法进入，请去邮箱查看战斗结果");
			return false;
		}
		if (multiBattle.getAuthorityMap().get(characterId) == null) {
			return false;
		}
		if (multiBattle.getOperator().getCharacterId()!= characterId) {
			return false;
		}
		// if(singleBattle.getHeroById(charId)==null){
		// throw new AppException("您不在次战场，无法获得战场信息");
		// return false;
		// }
		if (multiBattle.getDelayStatus() != MultiBattle.DELAY_STATUS_NO_DELAY) {
			// throw new AppException("还没有到您的回合");
			return false;
		}
		return true;
	}
	
	/**
	 * 验证技能是否合法
	 * 
	 * @param skillIndex
	 * @param singleBattleObject
	 * @return
	 */
	public boolean validateSkill(int skillIndex, MultiBattle multiBattle) {
		SoldierForBattle soldierForBattle = multiBattle.getOperator();
		int rounds = multiBattle.getLargeRoundAmount();
		if (soldierForBattle.getSoldierSkills().isEmpty()) {
			return false;
		}
		if (skillIndex >= soldierForBattle.getSoldierSkills().size()) {
			return false;
		}
		SkillOjbect skill = soldierForBattle.getSoldierSkills().get(skillIndex);
		if (skill.getRemainRound(rounds) != 0) {
			return false;
		}
		if (skill.getStaticHeroSkill().getNeedVnp() > soldierForBattle.getMp()) {
			return false;
		}
		if (BattleMathForMulti.getNoSkill(soldierForBattle) != null) {
			return false;
		}
		// 缺少武器判定
		return true;
	}
	/**
	 * 验证技能释放目标是否合法
	 * 
	 * @param skillIndex
	 * @param singleBattleObject
	 * @return
	 */
	public boolean validateSkillTarget(int locationId, int skillIndex, MultiBattle multiBattle) {
		SoldierForBattle target = multiBattle.getLocationIdList().get(locationId);
		SoldierForBattle skiller = multiBattle.getOperator();
		StaticHeroSkill staticHeroSkill = skiller.getSoldierSkills().get(skillIndex).getStaticHeroSkill();
		if(staticHeroSkill.getTargetLimit()==BattleMath.TARGET_LIMIT_ENEMY){
			return !target.getMultiBattleObject().equals(skiller.getMultiBattleObject());
		}else if(staticHeroSkill.getTargetLimit()==BattleMath.TARGET_LIMIT_FRIEND){
			return target.getMultiBattleObject().equals(skiller.getMultiBattleObject());
		}else if(staticHeroSkill.getTargetLimit()==BattleMath.TARGET_LIMIT_SELF){
			return target.equals(skiller);
		}
		return false;
	}
	/**
	 * 防御
	 * @param multiBattle
	 * @param characterId
	 */
	public void defenceOperateForMulti(MultiBattle multiBattle, int characterId){
		if (!canAttackForMultiBattle(multiBattle, characterId)) {
			return;
		}
//		try {
//			Thread.sleep(3000);
//			forbidUserOperate(multiBattle);
			multiBattle.getOperator().setDefenceStatus(true);//更改防御状态
			String jobId = MULTI_BATTLE_JOB_STRING_OPERATE
					+ multiBattle.getBattleId();
			ExecuteBattleJob.deleteBattleJob(jobId);
//			Thread.sleep(3000);
			userDefenceOperateResult( multiBattle);//推送防御结果
			miniRoundEnd(multiBattle);//进入回合结束阶段
//		} catch (InterruptedException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}
	
	/**
	 * 自动攻击操作
	 * 
	 * @param singleBattle
	 * @param characterId
	 * @return
	 */
	public Boolean autoAttackForMultiBattle(MultiBattle multiBattle,
			int characterId) throws AppException{
		List<SoldierForBattle> soldierForBattles = multiBattle.getAuthorityMap()
				.get(characterId);
		if (soldierForBattles == null) {
			throw new AppException("没有控制权限");
		}
		boolean result = false;
		if (soldierForBattles.get(0).getStatus() == Const.FIGHT_STATUS_USER) {
			setSoldiersStatus(soldierForBattles, Const.FIGHT_STATUS_AUTO);
			result = true;
		} else if (soldierForBattles.get(0).getStatus() == Const.FIGHT_STATUS_AUTO) {
			setSoldiersStatus(soldierForBattles, Const.FIGHT_STATUS_USER);
			result = false;
		} else {
			throw new AppException("军团状态错误");
		}
		if (canAttackForMultiBattle(multiBattle, characterId)) {
//			forbidUserOperate(multiBattle);
			String jobId = MULTI_BATTLE_JOB_STRING_OPERATE
					+ multiBattle.getBattleId();
			ExecuteBattleJob.deleteBattleJob(jobId);
			randomAttack(multiBattle);//若在操作回合点自动操作，则先执行普通攻击
		}
		return result;
	}
	/**
	 * 逃跑操作
	 * 
	 * @param singleBattle
	 * @param characterId
	 * @return
	 */
	public void escapeForMultiBattle(MultiBattle multiBattle,
			int characterId) {
		List<SoldierForBattle> soldierForBattles = multiBattle.getAuthorityMap()
				.get(characterId);
		if (soldierForBattles == null) {
			return ;
		}
		if (canAttackForMultiBattle(multiBattle, characterId)) {
//			forbidUserOperate(multiBattle);
			String jobId = MULTI_BATTLE_JOB_STRING_OPERATE
					+ multiBattle.getBattleId();
			ExecuteBattleJob.deleteBattleJob(jobId);
			setSoldiersAllDead(soldierForBattles);
			miniRoundEnd(multiBattle);//进入结束回合
		}
	}
	private void setSoldiersAllDead(List<SoldierForBattle> soldierForBattles){
		for(SoldierForBattle i:soldierForBattles){
			i.setDead(true);
		}
	}
	
	private void randomAttack(MultiBattle multiBattle){
		List<SoldierForBattle> defencers = getTargetForCanAttack(multiBattle);
		int size = defencers.size();
		if(size==0){
			multiBattle.getOperator().setDefenceStatus(true);
			userDefenceOperateResult( multiBattle);//推送防御状态结果
			miniRoundEnd(multiBattle);
			return;
		}
		int targetNum = RandomFunc.getRandomNum(size);
		Map<String, Object> result = BattleMathForMulti
				.commonAttackForSingleBattle(multiBattle.getOperator(), defencers.get(targetNum));
		userOperateResult(result, multiBattle);
	}
	//技能攻击
	public boolean skillAttack(int locationId, int skillIndex, MultiBattle multiBattle, int characterId) throws AppException{
		if (!canAttackForMultiBattle(multiBattle, characterId)) {
			throw new AppException("没有到您的操作回合");
		}
		if (!validateSkill(skillIndex, multiBattle)) {
			throw new AppException("技能使用不合法，使用技能失败");
		}
		if(!validateSkillTarget(locationId, skillIndex, multiBattle)){
			throw new AppException("技能目标不合法，使用技能失败");
		}
//		forbidUserOperate(multiBattle);
		String jobId = MULTI_BATTLE_JOB_STRING_OPERATE
				+ multiBattle.getBattleId();
		ExecuteBattleJob.deleteBattleJob(jobId);
		SoldierForBattle target = multiBattle.getLocationIdList().get(locationId);
		StaticHeroSkill staticHeroSkill = multiBattle.getOperator().getSoldierSkills().get(skillIndex)
				.getStaticHeroSkill();
		Map<String, Object> result = BattleMathForMulti.skillResultForSingleBattle(staticHeroSkill, multiBattle, target);
		multiBattle.getOperator().getSoldierSkills().get(skillIndex).setBeginRound(multiBattle.getLargeRoundAmount());
		userOperateResult(result, multiBattle);
		return true;
	}
	
	///////////讨伐战场操作////////////////////////
	//禁止操作，暂时注掉
//	public void forbidUserOperate(MultiBattle multiBattle){
//		System.err.println("禁止操作推送开始"+new Date());
//		SoldierForBattle operator = multiBattle.getOperator();
//		Map<String, Object> pushData = new HashMap<String,Object>();
//		pushData.put("canOperate", false);
//		userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_TURN, operator.getCharacterId(), multiBattle.getBattleId(), pushData);
////		userComet.publishToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_TIME, multiBattle.getBattleId(), pushData,operator.getCharacterId());
//		System.err.println("禁止操作推送结束"+new Date());
//	}

	public void userOperateResult(Map<String, Object> result,
			MultiBattle multiBattle) {
		System.out.println("--------------------------------------------------------执行动作"+result);
//		setReadyToFalse(multiBattle);
		addMultiDelayJob(MultiBattle.DELAY_STATUS_ACTION, multiBattle);
		userComet.publishToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_VIEW,
				multiBattle.getBattleId(), result);
	}
	public void userDefenceOperateResult(MultiBattle multiBattle) {
		System.err.println("防御状态推送开始"+new Date());
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("locationId", multiBattle.getOperator().getLocationId());
		result.put("defenceStatus", multiBattle.getOperator().isDefenceStatus());
		userComet.publishToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_DEFENCE,
				multiBattle.getBattleId(), result);
//		miniRoundEnd(multiBattle);
		System.err.println("防御状态推送结束"+new Date());
	}
	private boolean setReadyToFalse(MultiBattle multiBattle){
		for(List<SoldierForBattle> i:multiBattle.getAuthorityMap().values()){
			for(SoldierForBattle j:i){
				j.setReady(false);
			}
		}
		return true;
	}
	///////////////////////讨伐战场初始化///////////////////////////
	
	/**
	 * 对玩家初始化
	 * @param battleQueueAttacker
	 * @param battleQueueDefencer
	 * @param characterId
	 * @throws AppException
	 */
	public MultiBattle initMultiBattleForPk(BattleJobQueue battleQueueAttacker, BattleJobQueue battleQueueDefencer, int characterId) throws AppException{
		if(battleQueueDefencer==null){//防守方为君主
			String battleId = BattleProcess.getBattleField(battleQueueAttacker.getId(), -characterId);
			if(BattleProcess.BATTLE_DATA.get(battleId)!=null){
				return BattleProcess.BATTLE_DATA.get(battleId).getMultiBattle();
			}
			BattleData battleData = new BattleData();
			BattleProcess.BATTLE_DATA.put(battleId, battleData);//将战场信息放入内存缓存
			MultiBattleObject playerA = new MultiBattleObject(battleQueueAttacker.getHeroList(), battleQueueAttacker.getCharacterId(), MultiBattleObject.ATTACK_LOCATION, battleQueueAttacker.getFormationNo(),battleQueueAttacker.getId(),false);
		
			WallDefensenService wallDefensenService = (WallDefensenService)ServiceLocator.getSpringBean("walldefService");
			UserWallHero wallHero = wallDefensenService.getBaseWallHero(characterId);
			MultiBattleObject playerB;
			if(wallHero==null){
				playerB = new MultiBattleObject(null, characterId, MultiBattleObject.DEFENCE_LOCATION, null,0,true);
			}else{
				playerB = new MultiBattleObject(wallHero.getHeroId(), characterId, MultiBattleObject.DEFENCE_LOCATION, wallHero.getFormationNo(),0,true);
			}
					
			MultiBattle multiBattle = new MultiBattle(playerA, playerB, battleId);
			//出手排序
			multiBattle.setOrder();
			battleData.setBattleType(Const.BATTLE_TYPE_MULTIBATTLE);
			battleData.setMultiBattle(multiBattle);
			multiBattle.setCanEnter(true);
			return multiBattle;
			
		}else{
			String battleId = BattleProcess.getBattleField(battleQueueAttacker.getId(), battleQueueDefencer.getId());
			if(BattleProcess.BATTLE_DATA.get(battleId)!=null){
				return BattleProcess.BATTLE_DATA.get(battleId).getMultiBattle();
			}
			BattleData battleData = new BattleData();
			BattleProcess.BATTLE_DATA.put(battleId, battleData);//将战场信息放入内存缓存
			MultiBattleObject playerA = new MultiBattleObject(battleQueueAttacker.getHeroList(), battleQueueAttacker.getCharacterId(), MultiBattleObject.ATTACK_LOCATION, battleQueueAttacker.getFormationNo(),battleQueueAttacker.getId(),false);
			MultiBattleObject playerB = new MultiBattleObject(battleQueueDefencer.getHeroList(), battleQueueDefencer.getCharacterId(), MultiBattleObject.DEFENCE_LOCATION, battleQueueDefencer.getFormationNo(),battleQueueDefencer.getId(),false);
					
			MultiBattle multiBattle = new MultiBattle(playerA, playerB, battleId);
			//出手排序
			multiBattle.setOrder();
			battleData.setBattleType(Const.BATTLE_TYPE_MULTIBATTLE);
			battleData.setMultiBattle(multiBattle);
			multiBattle.setCanEnter(true);
			return multiBattle;
		}
	}
	/**
	 * 初始化讨伐战场(对野怪)
	 * @param battleJobQueueId
	 * @param characterId
	 * @throws AppException
	 */
	public void initMultiBattle(BattleJobQueue battleJobQueue, int characterId) throws AppException{
		if (battleJobQueue == null) {
			throw new AppException("不存在战场队列");
		}
		if (battleJobQueue.getCharacterId() != characterId) {
			throw new AppException("身份不符，无法创建战场");
		}
		if (battleJobQueue.getBattleType() != Const.BATTLE_TYPE_MULTIBATTLE) {
			throw new AppException("初始化战场类型错误");
		}
		if (battleJobQueue.getTargetType() != Const.TARGET_TYPE_MONSTER) {//暂时没开放对玩家讨伐功能，后续删除该错误
			throw new AppException("未开放对玩家讨伐功能");
		}
		if (battleJobQueue.getStatus() != Const.BATTLE_STATUS_WAIT
				&& battleJobQueue.getStatus() != Const.BATTLE_STATUS_FIGHTING) {
			throw new AppException("战场初始化失败，还没有到达目标位置");
		}
		if (BattleProcess.BATTLE_DATA.get(String.valueOf(battleJobQueue.getId())) != null) {
			return;
		}
		BattleData battleData = new BattleData();
		BattleProcess.BATTLE_DATA.put(String.valueOf(battleJobQueue.getId()), battleData);//将战场信息放入内存缓存
		MultiBattleObject playerA = new MultiBattleObject(battleJobQueue.getHeroList(), characterId, MultiBattleObject.ATTACK_LOCATION, battleJobQueue.getFormationNo(),battleJobQueue.getId(),false);
		StaticEnemyNPC staticEnemyNPC = EnemyNPCCache.getEnemyEntity(battleJobQueue.getTargetNo());
		MultiBattleObject playerB = new MultiBattleObject(staticEnemyNPC, MultiBattleObject.DEFENCE_LOCATION, staticEnemyNPC.getFormationNo());
		MultiBattle multiBattle = new MultiBattle(playerA, playerB, String.valueOf(battleJobQueue.getId()));
		//出手排序
		multiBattle.setOrder();
		battleData.setBattleType(Const.BATTLE_TYPE_MULTIBATTLE);
		battleData.setMultiBattle(multiBattle);
		multiBattle.setCanEnter(true);
		
	}
	////////////////战斗开始/////////////////
	public void beginMultiBattle(String battleId, int characterId) throws AppException{
		if (BattleProcess.BATTLE_DATA.get(battleId) == null) {
			throw new AppException("战斗已结束");
		}
		if (BattleProcess.BATTLE_DATA.get(battleId).getBattleType() != Const.BATTLE_TYPE_MULTIBATTLE) {
			throw new AppException("开启战场类型错误");
		}
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleId)
				.getMultiBattle();
		List<SoldierForBattle>  soldierForBattles = multiBattle.getAuthorityMap()
				.get(characterId);
		if (soldierForBattles== null) {
			throw new AppException("无权限开始战场");
		}
		setSoldiersTrue(soldierForBattles);// 准备完毕
		setSoldiersStatus(soldierForBattles, Const.FIGHT_STATUS_USER);
		if (multiBattle.isFighting()) {// 已经开始战斗，直接返回，不进行任何操作
			return;
		}
		BattleService battleService = (BattleService) ServiceLocator
				.getSpringBean("battleService");
		BattleJobQueue battleJobQueueA = battleService
				.selectBattleQueueById(multiBattle.getPlayerA().getBattleJobId());
		BattleJobQueue battleJobQueueB = battleService
				.selectBattleQueueById(multiBattle.getPlayerB().getBattleJobId());
		battleJobQueueA.setStatus(Const.BATTLE_STATUS_FIGHTING);
		if(battleJobQueueB!=null){
			battleJobQueueB.setStatus(Const.BATTLE_STATUS_FIGHTING);
		}
		battleService.updateBattelQueue(battleJobQueueA);
		battleService.updateBattelQueue(battleJobQueueB);
		if (isMultiBattleAllReady(multiBattle)) {
			multiBattle.setFighting(true);// 战斗中
			// 删除延时,如果存在
			if (ExecuteBattleJob.isExist(MULTI_BATTLE_JOB_STRING_READY
					+ battleId)) {
				ExecuteBattleJob.deleteBattleJob(MULTI_BATTLE_JOB_STRING_READY
						+ battleId);
			}
			// 开启操作
			miniRoundStart(multiBattle);// 操作开始
		} else if (!ExecuteBattleJob.isExist(MULTI_BATTLE_JOB_STRING_READY
				+ battleId)) {
			// 开启延时，如果不存在
			addMultiDelayJob(MultiBattle.DELAY_STATUS_READY, multiBattle);
		}
	}
	public void setSoldiersTrue(List<SoldierForBattle> soldiers){
		for(SoldierForBattle i:soldiers){
			i.setReady(true);
		}
	}
	private void setSoldiersStatus(List<SoldierForBattle> soldiers, int status){
		for(SoldierForBattle i:soldiers){
			i.setStatus(status);
		}
	}
	private boolean isMultiBattleAllReady(MultiBattle multiBattle){
		for(List<SoldierForBattle> i:multiBattle.getAuthorityMap().values()){
			for(SoldierForBattle j:i){
				if(!j.isReady()){
					return false;
				}
			}
		}
		return true;
	}

	
	/////////////回合开始//////////////////////
	public void miniRoundStart(MultiBattle multiBattle){
//		Map<String, Object> data;
		if(isNewRound(multiBattle)){//新回合进入回合准备
			//清除死人和小回合
			cleanDeadAndMiniRound(multiBattle);
			//重新排序
			multiBattle.setOrder();
			doStartDelay(multiBattle);
			//延时
//			addMultiDelayJob(MultiBattle.DELAY_STATUS_START, multiBattle);
			//发送
//			data = roundStartMap(true, multiBattle.getLargeRoundAmount(), multiBattle.getLocationIdList());
		}else{//不是新回合，越过回合开始延时，直接进入操作回合
			miniRoundOperate(multiBattle);
			//延时
//			addMultiDelayJob(MultiBattle.DELAY_STATUS_ROUND_READY, multiBattle);
			//发送
//			data = roundStartMap(false, multiBattle.getLargeRoundAmount(), null);
		}
//		data.put("operateId", multiBattle.getOperator().getLocationId());
//		userComet.publishToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_START, multiBattle.getBattleId(), data);
	}
	private void cleanDeadAndMiniRound(MultiBattle multiBattle){
		multiBattle.setMiniRoundAmout(0);//小回合重置
		List<SoldierForBattle> order = multiBattle.getOrder();
		for(int i=0;i<order.size();i++){
			if(order.get(i).isDead()){
				order.remove(i);
				i--;
			}
		}
	}
//	private Map<String, Object> roundStartMap(boolean isNew, int roundNum, List<SoldierForBattle> locationList){
//		Map<String, Object> retMap = new HashMap<String,Object>();
//		retMap.put("isNewRound", isNew);
//		if(isNew){
//			retMap.put("roundNum", roundNum);
//			retMap.put("order", changeToOrderList(locationList));
//		}
//		return retMap;
//	}
	public List<Integer> changeToOrderList(List<SoldierForBattle> locationList){
		List<Integer> order = new ArrayList<Integer>();
		for(SoldierForBattle i:locationList){
			if(!i.isDead()){
				order.add(i.getLocationId());
			}
		}
		return order;
	}
	private boolean isNewRound(MultiBattle multiBattle){
		int miniRoundNum = multiBattle.getMiniRoundAmout();
		int size = multiBattle.getOrder().size();
		if(miniRoundNum%size==0){
			int largeRound = multiBattle.getLargeRoundAmount()+1;//大回合数增加1
			multiBattle.setLargeRoundAmount(largeRound);//更新回合数，只在此处更新大回合数
			return true;
		}else{
			return false;
		}
	}
	//////////////准备回合///////////////////////////
	public void miniRoundReady(MultiBattle multiBattle){
		Map<String, Object> pushData = new HashMap<String,Object>();
		//出手顺序，回合数
		pushData.put("order", changeToOrderList(multiBattle.getOrder()));
		pushData.put("roundNum", multiBattle.getLargeRoundAmount());
		//城防,目前没有
		pushData.put("defenceWork", null);
		//buff伤害和buff清算
		pushData.put("buffEffect", BattleMathForMulti.buffEffectSettlement(multiBattle));
		//数据更新
		pushData.put("soldierUpdate", changeToSoldierMapForUpdate(multiBattle.getLocationIdList(), multiBattle.getLargeRoundAmount()));
		//延时
		addMultiDelayJob(MultiBattle.DELAY_STATUS_ROUND_READY, multiBattle);
		//发送
		userComet.publishToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_ROUND_READY, multiBattle.getBattleId(), pushData);
	}
	private List<Map<String, Object>> changeToSoldierMapForUpdate(List<SoldierForBattle> locationList, int roundNum){
		List<Map<String, Object>> soldierList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp ;
		for(SoldierForBattle i:locationList){
			if(!i.isDead()){
				temp = new HashMap<String,Object>();
				temp.put("locationId", i.getLocationId());
				int attack = (int)i.getAttack();
				temp.put("attack", attack<0?0:attack);
				int defence = (int)i.getDefence();
				temp.put("defence", defence<0?0:defence);
				DecimalFormat decimalFormat = new DecimalFormat("0.00%");
				double dodge = i.getDodge();
				temp.put("dodge", decimalFormat.format(dodge<0?0:dodge));
				double criticalStrike = i.getCriticalStrike();
				temp.put("criticalStrike", decimalFormat.format(criticalStrike<0?0:criticalStrike));
				double hit = i.getHit();
				temp.put("hit", decimalFormat.format(hit<0?0:hit));
				int mobility = (int)(i.getMobility()*i.getMobilityEffect());
				temp.put("mobility", mobility<0?0:mobility);
				temp.put("soldierAmount", i.getSoldierAmout());
				temp.put("buff", changeToBuffMap(i.getBuffs(), roundNum));
				temp.put("debuff", changeToBuffMap(i.getDeBuffs(), roundNum));
				soldierList.add(temp);
			}
		}
		return soldierList;
	}
	private List<Map<String, Object>> changeToBuffMap(List<BuffObject> buffs, int roundNum){
		List<Map<String, Object>> buffList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp ;
		for(BuffObject i:buffs){
			temp = new HashMap<String,Object>();
			temp.put("description", i.getStaticHeroSkillLastEffect().getDescription());
			temp.put("buffIcon", i.getStaticHeroSkillLastEffect().getIcon());
			temp.put("buffAnomin", i.getStaticHeroSkillLastEffect().getAnimationMulti());
			temp.put("remainRound", i.getRemainRound(roundNum));
			buffList.add(temp);
		}
		return buffList;
	}
	///////////////操作回合/////////////////////////
	public void miniRoundOperate(MultiBattle multiBattle){
		if(ifAHasLost(multiBattle)||ifBHasLost(multiBattle)){
			miniRoundEnd(multiBattle);
			return;
		}
		if(multiBattle.getOperator().isDead()){
			miniRoundEnd(multiBattle);
			return;
		}
		//推送防御状态
		if(multiBattle.getOperator().isDefenceStatus()){
			multiBattle.getOperator().setDefenceStatus(false);
			userDefenceOperateResult(multiBattle);
		}
		if (BattleMathForMulti.getChaos(multiBattle.getOperator()) != null) {//如果玩家身上有混乱（昏迷）状态，则直接结束操作，跳到对方操作
			//小回合结束
			miniRoundEnd(multiBattle);
			return;
		}
		pushOperateInfo(multiBattle);//推送操作人信息
		switch (multiBattle.getOperator().getStatus()) {
		
		case Const.FIGHT_STATUS_USER:
			userOperate(multiBattle);
			break;
		case Const.FIGHT_STATUS_NPC:
			npcOperate(multiBattle);
			break;
		case Const.FIGHT_STATUS_AUTO:
			autoOperate(multiBattle);
			break;
		case Const.FIGHT_STATUS_SAVEAUTO:
			saveAutoOperate(multiBattle);
			break;
		case Const.FIGHT_STATUS_NOT_IN_BATTLE:
			notInBattleOperate(multiBattle);
			break;

		default:
			break;
		}
	}
	private void pushOperateInfo(MultiBattle multiBattle){
		SoldierForBattle operator = multiBattle.getOperator();
		Map<String, Object> pushData = new HashMap<String,Object>();
		pushData.put("locationId", operator.getLocationId());
		pushData.put("operateSkill", changeSkillToMap(operator,multiBattle.getLargeRoundAmount()));
		userComet.publishToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_TURN, multiBattle.getBattleId(), pushData);
	}
	private void userOperate(MultiBattle multiBattle){
//		userComet
//				.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_TURN,
//						operator.getCharacterId(), multiBattle.getBattleId(),
//						pushData);
		Map<String, Object> battleJobData = new HashMap<String,Object>();
		battleJobData.put("multiBattle", multiBattle);
		String jobId = MULTI_BATTLE_JOB_STRING_OPERATE + multiBattle.getBattleId();
		ExecuteBattleJob.addBattleActionJob(MultiBattleOperateDelay.class,
				battleJobData, Const.BATTLE_SECOND, jobId,
				Const.BATTLE_ROUND_TIME);
		multiBattle.setDelayStatus(SingleBattle.DELAY_STATUS_NO_DELAY);
	}
	private List<Map<String, Object>> changeSkillToMap(SoldierForBattle soldierForBattle, int largeRound) {
		//是否有禁言效果
//		boolean noSkill = false;
//		if (BattleMath.getNoSkill(heroForBattle) != null) {
//			noSkill = true;
//		}
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp;
		for (SkillOjbect i : soldierForBattle.getSoldierSkills()) {
			temp = new HashMap<String,Object>();
			temp.put("skillName", i.getStaticHeroSkill().getName());
			temp.put("skillIcon", i.getStaticHeroSkill().getIcon());
			temp.put("toolTip", ChangeSkillToToolTip.change(i.getStaticHeroSkill()));
//			temp.put("needMp", i.getStaticHeroSkill().getNeedVnp());
//			if (noSkill) {
//				temp.put("canUse", false);
//			} else {
				temp.put("canUse", i.isCanUse(soldierForBattle.getMp()));
//			}
			temp.put("remainRound",
					i.getRemainRound(largeRound));
			retList.add(temp);
		}
		return retList;
	}
	private void npcOperate(MultiBattle multiBattle){
		System.out.println("------------------------------------野怪出手");
		randomAttack(multiBattle);//暂时随机攻击，以后需要添加AI
	}
	private void autoOperate(MultiBattle multiBattle){
		randomAttack(multiBattle);
	}
	private void saveAutoOperate(MultiBattle multiBattle){
		randomAttack(multiBattle);
	}
	private void notInBattleOperate(MultiBattle multiBattle){
		randomAttack(multiBattle);
	}
	
	
	/////////////选择目标相关///////////////
	public List<SoldierForBattle> getTargetForSkill(MultiBattle multiBattle, int skillIndex){
		StaticHeroSkill staticHeroSkill = multiBattle.getOperator().getSoldierSkills().get(skillIndex).getStaticHeroSkill();
		List<SoldierForBattle> retList = new ArrayList<SoldierForBattle>();
		if(staticHeroSkill.getTargetLimit()==BattleMath.TARGET_LIMIT_ENEMY){
			for(SoldierForBattle i:multiBattle.getTarget()){
				if(!i.isDead()){
					retList.add(i);
				}
			}
		}else if(staticHeroSkill.getTargetLimit()==BattleMath.TARGET_LIMIT_FRIEND){
			for(SoldierForBattle i:multiBattle.getMine()){
				if(!i.isDead()){
					retList.add(i);
				}
			}
		}else if(staticHeroSkill.getTargetLimit()==BattleMath.TARGET_LIMIT_SELF){
			retList.add(multiBattle.getOperator());
		}
		return retList;
	}
	public boolean canAttackDefence(MultiBattle multiBattle){
		//看对方是否有城防，再次修正攻击范围
		DefenceWork defenceWork = multiBattle.getTargetObject().getDefenceWork();
		if(defenceWork==null){
			return false;
		}
		SoldierForBattle operator = multiBattle.getOperator();
		int locationX = operator.getLocationX();
		int minRange = operator.getMinRange();
		int maxRange = operator.getMaxRange();
		//当前军团在己方位置，修正攻击范围
		for(SoldierForBattle i:multiBattle.getMine()){
			if(locationX<i.getLocationX()&&!i.isDead()){
				minRange--;
				maxRange--;
			}
		}
		if(minRange>1){
			return false;
		}else if(maxRange>0){
			return true;
		}else{
			return false;
		}
	}
	public List<SoldierForBattle> getTargetForCanAttack(MultiBattle multiBattle){
		SoldierForBattle operator = multiBattle.getOperator();
		int locationX = operator.getLocationX();
		int minRange = operator.getMinRange();
		int maxRange = operator.getMaxRange();
		//当前军团在己方位置，修正攻击范围
		for(SoldierForBattle i:multiBattle.getMine()){
			if(locationX<i.getLocationX()&&!i.isDead()){
				minRange--;
				maxRange--;
			}
		}
		//看对方是否有城防，再次修正攻击范围
		DefenceWork defenceWork = multiBattle.getTargetObject().getDefenceWork();
		if(defenceWork!=null){
			minRange--;
			maxRange--;
		}
		List<SoldierForBattle> retList = new ArrayList<SoldierForBattle>();
		Map<Integer, List<SoldierForBattle>>  targetLocationMap = multiBattle.getTargetObject().getLocationMap();
		for(int i=5;i>0;i--){
			if(targetLocationMap.get(i)==null||isAllDead(targetLocationMap.get(i))){
				continue;
			}
			if(minRange>1){
				minRange--;
				maxRange--;
			}else if(maxRange>0){
				retList.addAll(targetLocationMap.get(i));
				minRange--;
				maxRange--;
			}else{
				break;
			}
		}
		for(int i=0;i<retList.size();i++){
			if(retList.get(i).isDead()){
				retList.remove(i);
				i--;
			}
		}
		return retList;//去掉死人
	}
	private boolean isAllDead(List<SoldierForBattle> soldierForBattles){
		for(SoldierForBattle i:soldierForBattles){
			if(!i.isDead()){
				return false;
			}
		}
		return true;
	}
	/////////////回合结束////////////////////////////
	public void miniRoundEnd(MultiBattle multiBattle){
		multiBattle.setMiniRoundAmout(multiBattle.getMiniRoundAmout()+1);//小回合数加1
		multiBattle.setRoundTime(Const.BATTLE_ROUND_TIME);//小回合数加1
		//回合结束
		try {
			if(ifAHasLost(multiBattle)||multiBattle.getLargeRoundAmount()>Const.MAX_ROUND_NUM||ifBHasLost(multiBattle)){
				processAfterBattle(multiBattle);
			}else{
				miniRoundStart(multiBattle);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println(e);
		}
	}
	private void processAfterBattle(MultiBattle multiBattle) throws AppException{
		BattleProcess battleProcess = (BattleProcess)ServiceLocator.getSpringBean("battleProcess");
		if(multiBattle.getPlayerB().getCharacterId()==0){//被攻击方为野怪
			if(ifAHasLost(multiBattle)||multiBattle.getLargeRoundAmount()>Const.MAX_ROUND_NUM){
				//B奖励
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("isWin", false);
				userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_END, multiBattle.getPlayerA().getCharacterId(), multiBattle.getBattleId(), data);
				//A失败
				System.out.println("--------------------------------A失败");
			}else if(ifBHasLost(multiBattle)){
				//A奖励
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("isWin", true);
				data.put("reward", null);
				userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_END, multiBattle.getPlayerA().getCharacterId(), multiBattle.getBattleId(), data);
				//任务
				QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
				questService.updateQuestSchedule(QuestTargeType.MULTI_FIGHT_ENEMY, multiBattle.getPlayerA().getEnemyNo(), multiBattle.getPlayerB().getCharacterId());
				//B失败
				System.out.println("--------------------------------B失败");
			}
			battleProcess.callBackQueueForBattleEnd(multiBattle.getPlayerA().getBattleJobId());
//			callBackBattleQueue(multiBattle,multiBattle.getPlayerA());
			BattleProcess.BATTLE_DATA.remove(multiBattle.getBattleId());
		}else{
			int battleId = multiBattle.getPlayerA().getBattleJobId()==0?-multiBattle.getPlayerA().getCharacterId():multiBattle.getPlayerA().getBattleJobId();
			int battleId2 = multiBattle.getPlayerB().getBattleJobId()==0?-multiBattle.getPlayerB().getCharacterId():multiBattle.getPlayerB().getBattleJobId();
			if(ifAHasLost(multiBattle)||multiBattle.getLargeRoundAmount()>Const.MAX_ROUND_NUM){
				//B奖励
				Map<String, Object> data = new HashMap<String, Object>();
				Map<String, Object> data1 = new HashMap<String, Object>();
				data.put("isWin", false);
				data.put("reward", null);
				userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_END, multiBattle.getPlayerA().getCharacterId(), multiBattle.getBattleId(), data);
				data1.put("isWin", true);
				data1.put("reward", null);
				userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_END, multiBattle.getPlayerB().getCharacterId(), multiBattle.getBattleId(), data1);
				//A失败
				System.out.println("--------------------------------A失败");
				BattleProcess.getBattleOver(battleId, battleId2, battleId2, 0, 0);
			}else if(ifBHasLost(multiBattle)){
				//A奖励
				Map<String, Object> data = new HashMap<String, Object>();
				Map<String, Object> data1 = new HashMap<String, Object>();
				data.put("isWin", true);
				data.put("reward", null);
				userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_END, multiBattle.getPlayerA().getCharacterId(), multiBattle.getBattleId(), data);
				data1.put("isWin", false);
				data1.put("reward", null);
				userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_END, multiBattle.getPlayerB().getCharacterId(), multiBattle.getBattleId(), data1);
				//B失败
				System.out.println("--------------------------------B失败");
				BattleProcess.getBattleOver(battleId, battleId2, battleId, 0, 0);
			}
//			callBackBattleQueue(multiBattle,multiBattle.getPlayerA());
			BattleProcess.BATTLE_DATA.remove(multiBattle.getBattleId());

		}
	}
//	private void callBackBattleQueue(MultiBattle multiBattle, MultiBattleObject playerA){
//		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
//		BattleJobQueue battleJobQueue = battleService.selectBattleQueueById(playerA.getBattleJobId());
//		callBackQueueForBattleEnd
//		
//		long date = System.currentTimeMillis();
//		battleJobQueue.setBackTime(new Date(date));
//		battleJobQueue.setBackArriveTime(new Date(date+battleJobQueue.getNeedTime()));
//		battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
//		battleService.updateBattelQueue(battleJobQueue);
//		Map<String, Object> data = new HashMap<String,Object>();
//		data.put("battleData", battleJobQueue);
//		ExecuteBattleJob.addBattleJob(ReadyToBattleJob.class, data, battleJobQueue.getBackArriveTime(), BattleService.BATTLE_JOB_STRING+multiBattle.getBattleId());
//	}
	private boolean ifAHasLost(MultiBattle multiBattle){
		for(SoldierForBattle i:multiBattle.getPlayerA().getHero()){
			if(i.isDead()){
				continue;
			}else{
				return false;
			}
		}
		return true;
	}
	private boolean ifBHasLost(MultiBattle multiBattle){
		for(SoldierForBattle i:multiBattle.getPlayerB().getHero()){
			if(i.isDead()){
				continue;
			}else{
				return false;
			}
		}
		return true;
	}
	
	/////////////延时相关///////////////////////
	private void addMultiDelayJob(int delayStatus, MultiBattle multiBattle) {
		setReadyToFalse(multiBattle);
		switch (delayStatus) {
		case MultiBattle.DELAY_STATUS_READY://准备战斗延时
			multiBattle.setDelayStatus(MultiBattle.DELAY_STATUS_READY);
			addReadyDelay(multiBattle,Const.BATTLE_DELAY_READY);
			break;
		case MultiBattle.DELAY_STATUS_START:
			multiBattle.setDelayStatus(MultiBattle.DELAY_STATUS_START);
			doStartDelay(multiBattle);
			break;
		case MultiBattle.DELAY_STATUS_ROUND_READY:
			multiBattle.setDelayStatus(MultiBattle.DELAY_STATUS_ROUND_READY);
			addRoundReadyDelay(multiBattle, Const.BATTLE_DELAY);
			break;
		case MultiBattle.DELAY_STATUS_ACTION:
			multiBattle.setDelayStatus(MultiBattle.DELAY_STATUS_ACTION);
			addActionDelay(multiBattle, Const.BATTLE_DELAY);
			
			break;
//		case MultiBattle.DELAY_STATUS_ROUND_END:
//			multiBattle.setDelayStatus(MultiBattle.DELAY_STATUS_ROUND_END);
//			addEndDelay(multiBattle, 1000);
//			
//			break;

		default:
			break;
		}
	}
	private void addReadyDelay(MultiBattle multiBattle, int delayTime){
		long date = System.currentTimeMillis();
		String jobId = MULTI_BATTLE_JOB_STRING_READY + multiBattle.getBattleId();
		Date fireTime = new Date(date + delayTime);
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("multiBattle", multiBattle);
		ExecuteBattleJob.addBattleJob(MultiBattleReadyDelayJob.class, data,
				fireTime, jobId);
	}
	public void doReadyDelay(MultiBattle multiBattle){
		multiBattle.setFighting(true);
		miniRoundStart(multiBattle);
	}
//	private void addStartDelay(MultiBattle multiBattle){
//		miniRoundReady(multiBattle);
//	}
	public void doStartDelay(MultiBattle multiBattle){
		miniRoundReady(multiBattle);
	}
	private void addRoundReadyDelay(MultiBattle multiBattle, int delayTime){
		long date = System.currentTimeMillis();
		String jobId = MULTI_BATTLE_JOB_STRING_ROUND_READY + multiBattle.getBattleId();
		Date fireTime = new Date(date + delayTime);
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("multiBattle", multiBattle);
		ExecuteBattleJob.addBattleJob(MultiBattleRoundReadyDelay.class, data,
				fireTime, jobId);
	}
	public void doRoundReadyDelay(MultiBattle multiBattle){
		miniRoundOperate(multiBattle);
	}
	
	private void addActionDelay(MultiBattle multiBattle, int delayTime){
		long date = System.currentTimeMillis();
		String jobId = MULTI_BATTLE_JOB_STRING_ACTION + multiBattle.getBattleId();
		Date fireTime = new Date(date + delayTime);
		Map<String, Object> data = new HashMap<String,Object>();
		data.put("multiBattle", multiBattle);
		ExecuteBattleJob.addBattleJob(MultiBattleActionDelay.class, data,
				fireTime, jobId);
	}
	public void doActionDelay(MultiBattle multiBattle){
		miniRoundEnd(multiBattle);
	}
//	private void addEndDelay(MultiBattle multiBattle, int delayTime){
//		long date = System.currentTimeMillis();
//		String jobId = MULTI_BATTLE_JOB_STRING_END + multiBattle.getBattleId();
//		Date fireTime = new Date(date + delayTime);
//		Map<String, Object> data = new HashMap<String,Object>();
//		data.put("multiBattle", multiBattle);
//		ExecuteBattleJob.addBattleJob(MultiBattleEndDelay.class, data,
//				fireTime, jobId);
//	}
//	public void doEndDelay(MultiBattle multiBattle){
//		miniRoundStart(multiBattle);
//	}
	
	
	public void doBattleOperateDelay(MultiBattle multiBattle){
		//玩家都不在战斗中
//		if(isAllNotInBattle(singleBattle.getAuthorityMap())){
//			forbidUserOperate(singleBattle);// 禁止玩家操作
//			// 到时间普通攻击操作
//			Map<String, Object> attackResult = BattleMath
//					.commonAttackForSingleBattle(singleBattle);
//			userOperateResult(attackResult, singleBattle);
//			return;
//		}
		SoldierForBattle operator = multiBattle.getOperator();
		if (multiBattle.getRoundTime() == 0) {
			userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_TIME,
					operator.getCharacterId(), multiBattle.getBattleId(),
					multiBattle.getRoundTime());
//			forbidUserOperate(multiBattle);// 禁止玩家操作
			// 到时间普通攻击操作
			randomAttack(multiBattle);
		} else {
//			userComet.publishToBattleChannel(Const.BATTLE_MESSAGE_TYPE_TIME, multiBattle.getBattleId(), multiBattle.getRoundTime(),operator.getCharacterId());
			
			userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_TIME,
					operator.getCharacterId(), multiBattle.getBattleId(),
					multiBattle.getRoundTime());
			// //回合时间减1
			multiBattle.setRoundTime(multiBattle.getRoundTime() - 1);
		}
	}
	public void dropMultiDelay(MultiBattle multiBattle){
		if(!isMultiBattleAllReady(multiBattle)){
			return ;
		}
		String jobId;
		switch (multiBattle.getDelayStatus()) {
		case MultiBattle.DELAY_STATUS_READY:
			
			break;
		case MultiBattle.DELAY_STATUS_START:
//			jobId = MULTI_BATTLE_JOB_STRING_START + multiBattle.getBattleId();
//			if (ExecuteBattleJob.isExist(jobId)) {
//				ExecuteBattleJob.deleteBattleJob(jobId);
//			}
//			doStartDelay(multiBattle);
			break;
		case MultiBattle.DELAY_STATUS_ROUND_READY:
			jobId = MULTI_BATTLE_JOB_STRING_ROUND_READY + multiBattle.getBattleId();
			ExecuteBattleJob.deleteBattleJob(jobId);
			doRoundReadyDelay(multiBattle);
			break;
		case MultiBattle.DELAY_STATUS_ACTION:
			jobId = MULTI_BATTLE_JOB_STRING_ACTION + multiBattle.getBattleId();
			ExecuteBattleJob.deleteBattleJob(jobId);
			doActionDelay(multiBattle);
			
			break;

		default:
			break;
		}
		
	}
	

	
	
	///////////////////////////////////
	public UserComet getUserComet() {
		return userComet;
	}

	public void setUserComet(UserComet userComet) {
		this.userComet = userComet;
	}
	
}
