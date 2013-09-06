package com.crystalcg.gamedev.util;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.battleProcess.domain.BuffObject;
import com.crystalcg.gamedev.battleProcess.domain.HeroAttribute;
import com.crystalcg.gamedev.battleProcess.domain.MultiBattle;
import com.crystalcg.gamedev.battleProcess.domain.SoldierForBattle;
import com.crystalcg.gamedev.util.cache.BattleCache;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkillLastEffect;

/**
 * 战斗讨伐相关计算
 * 
 * @author jinganyang
 * 
 */
public class BattleMathForMulti {
	
	/**
	 * 攻击范围，1格
	 */
	private static final int SKILL_RANGE_ONE =1;
	/**
	 * 攻击范围，5格
	 */
	private static final int SKILL_RANGE_FIVE =2;
	/**
	 * 攻击范围，9格
	 */
	private static final int SKILL_RANGE_NINE =3;
	/**
	 * 攻击范围，13格
	 */
	private static final int SKILL_RANGE_THIRTEEN =4;
	/**
	 * 攻击范围，全屏
	 */
	private static final int SKILL_RANGE_ALL =5;

	// //////////属性计算相关//////////////////////////////////
	/**
	 * 军团属性计算
	 * @param soldierForBattle
	 */
	public static void computeSoldierAttribute(SoldierForBattle soldierForBattle) {
		soldierForBattle.setAttack(computeAttack(soldierForBattle));
		soldierForBattle.setDefence(computeDefence(soldierForBattle));
		soldierForBattle
				.setCriticalStrike(computeCriticalStrike(soldierForBattle));
		soldierForBattle.setHit(computeHit(soldierForBattle));
		soldierForBattle.setDodge(computeDodge(soldierForBattle));
		soldierForBattle.setMobility(computeMobility(soldierForBattle));
	}

	/**
	 * 计算攻击
	 * @param soldierForBattle
	 * @return
	 */
	private static double computeAttack(SoldierForBattle soldierForBattle) {
		return (soldierForBattle.getSoldierAttribute().getSoldierAttack()
				+ soldierForBattle.getHeroAttribute().getAttack() + soldierForBattle
					.getAttackAdd()) * soldierForBattle.getAttackEffect();
	}

	/**
	 * 计算防御
	 * @param soldierForBattle
	 * @return
	 */
	private static double computeDefence(SoldierForBattle soldierForBattle) {
		return (soldierForBattle.getSoldierAttribute().getSoldierDefence()
				+ soldierForBattle.getHeroAttribute().getDefence() + soldierForBattle
					.getDefenceAdd()) * soldierForBattle.getDefenceEffect();
	}

	/**
	 * 计算暴击率
	 * @param soldierForBattle
	 * @return
	 */
	private static double computeCriticalStrike(
			SoldierForBattle soldierForBattle) {
		//兵种暴击率
		double criticalStrike = soldierForBattle.getSoldierAttribute().getSoldierCriticalStrike();
		//暴击等级
		double criticalStrikeLevel = soldierForBattle.getHeroAttribute().getCriticalStrike();
		return (
				criticalStrike+ criticalStrikeLevel
				/ (19 + criticalStrikeLevel) + soldierForBattle
					.getCriticalStrikeAdd())
				* soldierForBattle.getCriticalStrikeEffect();
	}

	/**
	 * 计算命中率
	 * @param soldierForBattle
	 * @return
	 */
	private static double computeHit(SoldierForBattle soldierForBattle) {
		//兵种命中率
		double soldierHit = soldierForBattle.getSoldierAttribute().getSoldierHit(); 
		//命中等级
		double hitLevel = soldierForBattle.getHeroAttribute().getHit();
		return (soldierHit
				+ hitLevel
				/ (10 + 4.5 * hitLevel) + soldierForBattle
					.getHitAdd()) * soldierForBattle.getHitEffect();
	}

	/**
	 * 计算闪避率
	 * @param soldierForBattle
	 * @return
	 */
	private static double computeDodge(SoldierForBattle soldierForBattle) {
		return (soldierForBattle.getSoldierAttribute().getSoldierDodge()
				+ soldierForBattle.getHeroAttribute().getDodge()
				/ (84 + 4.2 * soldierForBattle.getHeroAttribute().getDodge()) + soldierForBattle
					.getDodgeAdd()) * soldierForBattle.getDodgeEffect();
	}

	/**
	 * 计算行动力
	 * @param soldierForBattle
	 * @return
	 */
	private static double computeMobility(SoldierForBattle soldierForBattle) {
		return (soldierForBattle.getSoldierAttribute().getSoldierMobility()
				+ soldierForBattle.getHeroAttribute().getMobility() + soldierForBattle
					.getMobilityAdd()) * soldierForBattle.getMobilityEffect();
	}

	// /////////普通攻击相关/////////////////////////
	/**
	 * 是否命中
	 * 
	 * @param soldierForBattle
	 * @return
	 */
	public static boolean isHit(SoldierForBattle soldierForBattle) {
		return RandomFunc.isSuccessful(soldierForBattle.getHit()<0?0:soldierForBattle.getHit());
	}

	/**
	 * 是否是否闪避
	 * 
	 * @param soldierForBattle
	 * @return
	 */
	public static boolean isMiss(SoldierForBattle soldierForBattle) {
		return RandomFunc.isSuccessful(soldierForBattle.getDodge()<0?0:soldierForBattle.getDodge());
	}

	/**
	 * 是否暴击
	 * 
	 * @param soldierForBattle
	 * @return
	 */
	public static boolean isCriticalStrike(SoldierForBattle soldierForBattle) {
		return RandomFunc.isSuccessful(soldierForBattle.getCriticalStrike()<0?0:soldierForBattle.getCriticalStrike());
	}

	/**
	 * 伤害值
	 * 
	 * @param soldierForBattle
	 * @return
	 */
	public static double hurtValue(SoldierForBattle attacker,
			SoldierForBattle defencer) {
		//攻击人攻击力
		double attackValue = attacker.getAttack() < 0 ? 0 : attacker
				.getAttack();
		//被攻击人防御力
		double defenceValue = defencer.getDefence()< 0 ? 0 : defencer
				.getDefence();
		//获取伤害补正
		double hurtOffset = (double)BattleCache.getStaticBattleHurt(
				attacker.getAttackType() + "-" + defencer.getArmorType())
				.getValue() / 100;
		//计算伤害值
		double hurtValue = attacker.getSoldierAmout() * attackValue
				* hurtOffset*0.25*defenceValue/(5*attacker.getHeroLevel() + 0.25*defenceValue);
		if(defencer.isDefenceStatus()){
			hurtValue*=.7;
		}
		return hurtValue;
	}

	/**
	 * 暴击伤害值
	 * 
	 * @param heroForBattle
	 * @return
	 */
	public static double criticalHurtValue(SoldierForBattle attacker,
			SoldierForBattle defencer) {
		double hurtValue = hurtValue(attacker, defencer)*1.25;
		return hurtValue;
	}

	// ////////////////普通攻击////////////////////////////////////////////
	/**
	 * 普通攻击操作(玩家和电脑通用)
	 * 
	 * @param singleBattle
	 * @return
	 */
	public static Map<String, Object> commonAttackForSingleBattle(
			SoldierForBattle attacker, SoldierForBattle defencer) {
		Map<String, Object> dataMap = new HashMap<String,Object>();
		dataMap.put("battleViewType", Const.BATTLE_VIEW_TYPE_NORMAL);
		Map<String, Object> battleViewInfo = new HashMap<String,Object>();
		// battleViewInfo.put("attackPersonAction",
		// attack.getHeroActionWeapon()+BattleProcess.BATTLE_ACTION_ATTACK_STRING);询问客户端需要什么动作
		battleViewInfo.put("attackPersonId", attacker.getLocationId());
		battleViewInfo.put("defencePersonId", defencer.getLocationId());
		dataMap.put("battleViewInfo", battleViewInfo);
		// 查看是否有无敌状态
		if (getGod(defencer) != null) {
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_GOD);
		}
		// 攻击方是否命中
		if (!isHit(attacker)) {
			// 未命中
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_MISS);
		}
		// 防御方是否闪避
		if (isMiss(defencer)) {
			// 闪避
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_DODGE);
		}
		// 攻击方是否暴击
		if (isCriticalStrike(attacker)) {
			// 暴击
			int hurt = (int)criticalHurtValue(attacker, defencer);
			// 扣伤害
			// battleViewInfo.put("defencePersonHurt", -hurt);
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_CRITICAL);
			setHurtType(defencer, -hurt, battleViewInfo);
			// //清除被攻击
			deleteBuffByLastTime(defencer,BattleMath.BUFF_LAST_TIME_NEXT_BE_ATTACKED);

		} else {
			int hurt = (int)hurtValue(attacker, defencer);
			// 扣伤害
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_HIT);
			setHurtType(defencer, -hurt, battleViewInfo);
			// 清除被攻击,缺少代码
			deleteBuffByLastTime(defencer,BattleMath.BUFF_LAST_TIME_NEXT_BE_ATTACKED);
			// deleteBuffByLastTime(singleBattle.getTargetHero().getHeroForBattle(),
			// BUFF_LAST_TIME_NEXT_BE_ATTACKED);
			// return结果
			// dataMap.put("testHp",
			// singleBattle.getHeroA().getHeroForBattle().getHp());
		}
		//清除攻击下次攻击buff,缺少代码
		deleteBuffByLastTime(attacker,BattleMath.BUFF_LAST_TIME_NEXT_ATTACK);
		int roundNum = defencer.getMultiBattleObject().getMultiBattle().getLargeRoundAmount();
		battleViewInfo.put("attackerUpdate", changeToSoldierMapForUpdate(attacker, roundNum));
		battleViewInfo.put("defencerUpdate",changeToSoldierMapForUpdate(defencer, roundNum));
		return dataMap;
	}

	/**
	 * 为普通攻击结果附加伤害类型，是否吸收
	 * 
	 * @param singleBattle
	 * @param targetHero
	 * @param effectValue
	 * @param battleViewInfo
	 */
	private static final void setHurtType(SoldierForBattle targetHero,
			int effectValue, Map<String, Object> battleViewInfo) {
		BuffObject absorbHurtBuff = getAbsorbHurt(targetHero);
		if (effectValue < 0 && absorbHurtBuff != null) {
			int hurt = absorbHurt(targetHero, absorbHurtBuff, effectValue);// 吸收伤害，并返回吸收后的值
			if (hurt < 0) {// 破盾
				int soldierAmountChange = changeHurtToAmount(hurt, targetHero);
				battleViewInfo.put("defenceAmountHurt", soldierAmountChange);
				battleViewInfo.put("defencePersonHurtType",
						BattleMath.HURT_RESULT_NORMAL);
				changeSoildierAmount(targetHero, soldierAmountChange);// 改变目标兵数
				battleViewInfo.put("isDefenceDead", isDefencerDead(targetHero));
			} else {// 未破盾
				int soldierAmountChange = changeHurtToAmount(effectValue,
						targetHero);
				battleViewInfo.put("defenceAmountHurt", soldierAmountChange);
				battleViewInfo.put("defencePersonHurtType",
						BattleMath.HURT_RESULT_ABSORB);
				battleViewInfo.put("isDefenceDead", isDefencerDead(targetHero));
			}
		} else {
			int soldierAmountChange = changeHurtToAmount(effectValue,
					targetHero);
			battleViewInfo.put("defenceAmountHurt", soldierAmountChange);
			battleViewInfo.put("defencePersonHurtType",
					BattleMath.HURT_RESULT_NORMAL);
			changeSoildierAmount(targetHero, soldierAmountChange);// 改变目标兵数
			battleViewInfo.put("isDefenceDead", isDefencerDead(targetHero));
		}
	}

	/**
	 * 查看目标是否死亡，如果死亡，将目标死亡属性设为true
	 * 
	 * @param soldierForBattle
	 * @return
	 */
	private static final boolean isDefencerDead(
			SoldierForBattle soldierForBattle) {
		if (soldierForBattle.getSoldierAmout() == 0) {
			soldierForBattle.setDead(true);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 将影响数值转化为士兵数
	 * 
	 * @param effect
	 * @param defencer
	 * @return
	 */
	private static final int changeHurtToAmount(int effect,
			SoldierForBattle defencer) {
		int amount = (int) (effect / defencer.getHp());
		if(amount==0){
			return effect>0?1:-1;
		}else{
			return amount;
		}
	}


	/**
	 * 更新目标兵数
	 * 
	 * @param heroForBattle
	 * @param changeHpAmount
	 */
	private static void changeSoildierAmount(SoldierForBattle soldierForBattle,
			int changeSoldierAmount) {
		int currentAmount = soldierForBattle.getSoldierAmout()
				+ changeSoldierAmount;
		if (currentAmount > 0) {
			soldierForBattle.setSoldierAmout(currentAmount > soldierForBattle
					.getSoldierAmoutMax() ? soldierForBattle
					.getSoldierAmoutMax() : currentAmount);
		} else {
			soldierForBattle.setSoldierAmout(0);
		}
	}
	/////////////////////////////////////////////////////
	/////////////////////技能相关///////////////////////////
	/////////////////////////////////////////////////////
	
	
	
	//使用技能相关
	
	
	/**
	 * 使用技能结果
	 * @param staticHeroSkill
	 * @param singleBattle
	 * @return
	 */
	public static Map<String, Object> skillResultForSingleBattle(StaticHeroSkill staticHeroSkill, MultiBattle multiBattle, SoldierForBattle targetPerson){
		SoldierForBattle skillPerson = multiBattle.getOperator();
		skillPerson.setMp(skillPerson.getMp()-staticHeroSkill.getNeedVnp());//扣除mp
		return enemyResultForMulti(staticHeroSkill, multiBattle, targetPerson);
	}
	/**
	 * 非通用方法，用于获取具体的技能影响结果
	 * @param staticHeroSkill
	 * @param skillHeroObject
	 * @param targetHeroObject
	 * @param singleBattle
	 * @return
	 */
	private static Map<String, Object> enemyResultForMulti(StaticHeroSkill staticHeroSkill, MultiBattle multiBattle, SoldierForBattle targetPerson){
		SoldierForBattle skillPerson = multiBattle.getOperator();
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("battleViewType", Const.BATTLE_VIEW_TYPE_SKILL);
		Map<String, Object> battleViewInfo = new HashMap<String,Object>();
		battleViewInfo.put("skillName", staticHeroSkill.getName());
//		battleViewInfo.put("skillerAction", skillHero.getHeroActionWeapon()+staticHeroSkill.getHeroAction());
		battleViewInfo.put("skillerAnimation", staticHeroSkill.getAnimationMulti());
		battleViewInfo.put("skillerExpend", staticHeroSkill.getNeedVnp());
		battleViewInfo.put("skillerId", skillPerson.getLocationId());
		retMap.put("battleViewInfo", battleViewInfo);
		//获取目标
		List<SoldierForBattle> targets = getTargets(staticHeroSkill, targetPerson);
		List<Map<String, Object>> targetsMap = getTargetsResult(staticHeroSkill, targets, skillPerson, multiBattle.getLargeRoundAmount());
		battleViewInfo.put("targets", targetsMap);
		return retMap;
	}
	final private static List<SoldierForBattle> getTargets(StaticHeroSkill staticHeroSkill, SoldierForBattle target){
		List<SoldierForBattle> retList = new ArrayList<SoldierForBattle>();
		switch (staticHeroSkill.getSkillRange()) {
		case SKILL_RANGE_ONE:
			retList.add(target);
			return retList;
		case SKILL_RANGE_FIVE:
			retList.addAll(getFiveTarget(target));
			return retList;
		case SKILL_RANGE_NINE:
			retList.addAll(getNineTarget(target));
			return retList;
		case SKILL_RANGE_THIRTEEN:
			retList.addAll(getThirteenTarget(target));
			return retList;
		case SKILL_RANGE_ALL:
			retList.addAll(target.getMultiBattleObject().getHero());
			return retList;

		default:
			retList.add(target);
			return retList;
		}
	}
	final private static List<SoldierForBattle> getFiveTarget(SoldierForBattle target){
		int targetX = target.getLocationX();
		int targetY = target.getLocationY();
		Map<String, Boolean> param = new HashMap<String,Boolean>();
		param.put(targetX+"_"+targetY, true);
		param.put((targetX-1)+"_"+targetY, true);
		param.put((targetX+1)+"_"+targetY, true);
		param.put(targetX+"_"+(targetY-1), true);
		param.put(targetX+"_"+(targetY+1), true);
		List<SoldierForBattle> retList = new ArrayList<SoldierForBattle>();
		for(SoldierForBattle i:target.getMultiBattleObject().getHero()){
			if(param.get(i.getLocationXAndY())!=null&&!i.isDead()){
				retList.add(i);
			}
		}
		return retList;
	}
	final private static List<SoldierForBattle> getNineTarget(SoldierForBattle target){
		int targetX = target.getLocationX();
		int targetY = target.getLocationY();
		Map<String, Boolean> param = new HashMap<String,Boolean>();
		param.put(targetX+"_"+targetY, true);
		param.put(targetX+"_"+(targetY-1), true);
		param.put(targetX+"_"+(targetY+1), true);
		param.put((targetX-1)+"_"+targetY, true);
		param.put((targetX-1)+"_"+(targetY-1), true);
		param.put((targetX-1)+"_"+(targetY+1), true);
		param.put((targetX+1)+"_"+targetY, true);
		param.put((targetX+1)+"_"+(targetY+1), true);
		param.put((targetX+1)+"_"+(targetY-1), true);
		List<SoldierForBattle> retList = new ArrayList<SoldierForBattle>();
		for(SoldierForBattle i:target.getMultiBattleObject().getHero()){
			if(param.get(i.getLocationXAndY())!=null&&!i.isDead()){
				retList.add(i);
			}
		}
		return retList;
	}
	final private static List<SoldierForBattle> getThirteenTarget(SoldierForBattle target){
		int targetX = target.getLocationX();
		int targetY = target.getLocationY();
		Map<String, Boolean> param = new HashMap<String,Boolean>();
		param.put(targetX+"_"+targetY, true);
		param.put(targetX+"_"+(targetY-1), true);
		param.put(targetX+"_"+(targetY+1), true);
		param.put((targetX-1)+"_"+targetY, true);
		param.put((targetX-1)+"_"+(targetY-1), true);
		param.put((targetX-1)+"_"+(targetY+1), true);
		param.put((targetX+1)+"_"+targetY, true);
		param.put((targetX+1)+"_"+(targetY+1), true);
		param.put((targetX+1)+"_"+(targetY-1), true);
		param.put((targetX+2)+"_"+targetY, true);
		param.put((targetX-2)+"_"+targetY, true);
		param.put(targetX+"_"+(targetY+2), true);
		param.put(targetX+"_"+(targetY-2), true);
		List<SoldierForBattle> retList = new ArrayList<SoldierForBattle>();
		for(SoldierForBattle i:target.getMultiBattleObject().getHero()){
			if(param.get(i.getLocationXAndY())!=null&&!i.isDead()){
				retList.add(i);
			}
		}
		return retList;
	}
	final private static List<Map<String, Object>> getTargetsResult(StaticHeroSkill staticHeroSkill, List<SoldierForBattle> targets, SoldierForBattle skiller, int roundNum){
		List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();
		Map<String, Object> temp ;
		for(SoldierForBattle i:targets){
			temp = getSkillResult(staticHeroSkill, skiller, i, roundNum);
			retList.add(temp);
		}
		List<StaticHeroSkillLastEffect> effects = skillHasMineLimitBuff(staticHeroSkill);
		if(isSkillerInTargets(targets, skiller)||effects.isEmpty()){//目标里有施法者,或技能带没有有给自己加的buff效果
			return retList;
		}else{
			temp = new HashMap<String,Object>();
//			Map<String, Object> battleViewInfo = new HashMap<String,Object>();
			temp.put("locationId", skiller.getLocationId());
			BuffObject godBuff = getGod(skiller); 
			double hurt = setMineEffect(staticHeroSkill,effects, skiller, roundNum);
			if(hurt<0&&godBuff!=null){
				temp.put("battleViewResult", Const.BATTLE_VIEW_RESULT_GOD);
//				temp.put("targetInfo", changeToSoldierMapForUpdate(skiller, roundNum));//用于更新数据
			}else{
				temp.put("battleViewResult", Const.BATTLE_VIEW_RESULT_HIT);
				setTargetValueEffect(skiller, (int)hurt, temp);
//				temp.put("battleHurtInfo", battleViewInfo);
				temp.put("targetInfo", changeToSoldierMapForUpdate(skiller, roundNum));//用于更新数据
			}
			retList.add(temp);
		}
		return retList;
		
	}

	final private static List<StaticHeroSkillLastEffect> skillHasMineLimitBuff(StaticHeroSkill staticHeroSkill){
		List<StaticHeroSkillLastEffect> effects = new ArrayList<StaticHeroSkillLastEffect>();
		if(staticHeroSkill.getAddEffectRate1()!=0&&staticHeroSkill.getEffectEntity1()!=null&&RandomFunc.isSuccessfulForSkill(staticHeroSkill.getAddEffectRate1())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect1 = staticHeroSkill.getEffectEntity1();
			effects.add(staticHeroSkillLastEffect1);
		}
		if(staticHeroSkill.getAddEffectRate2()!=0&&staticHeroSkill.getEffectEntity2()!=null&&RandomFunc.isSuccessfulForSkill(staticHeroSkill.getAddEffectRate2())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect2 = staticHeroSkill.getEffectEntity2();
			effects.add(staticHeroSkillLastEffect2);
		}
		if(staticHeroSkill.getAddEffectRate3()!=0&&staticHeroSkill.getEffectEntity3()!=null&&RandomFunc.isSuccessfulForSkill(staticHeroSkill.getAddEffectRate3())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect3 = staticHeroSkill.getEffectEntity3();
			effects.add(staticHeroSkillLastEffect3);
		}
		List<StaticHeroSkillLastEffect> effectsForMine = new ArrayList<StaticHeroSkillLastEffect>();
		for(StaticHeroSkillLastEffect i:effects){
			 if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF){
				 effectsForMine.add(i);
			 }
		}
		return effectsForMine;
	}
	final private static double setMineEffect(StaticHeroSkill staticHeroSkill, List<StaticHeroSkillLastEffect> effectsForMine, SoldierForBattle skiller, int largeRoundNum){
		double hurt = 0;
		for(StaticHeroSkillLastEffect i:effectsForMine){
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				if(i.getType()==BattleMath.BUFF_EFFECT_TYPE_LAST_HURT){
					hurt+=computeLastSkillHurtForMulti(staticHeroSkill,i, skiller, skiller);
				}else if(i.getType()==BattleMath.BUFF_EFFECT_TYPE_LAST_CURE){
					hurt+=computeLastSkillRecoverForMulti(i, skiller, skiller);
				}
			}else{
				buffEffect(staticHeroSkill,i, skiller, skiller, largeRoundNum);
			}
		}
		return hurt;
	}
	final private static boolean isSkillerInTargets(List<SoldierForBattle> targets, SoldierForBattle skiller){
		for(SoldierForBattle i:targets){
			if(i.equals(skiller)){
				return true;
			}
		}
		return false;
	}
	final private static Map<String, Object> getSkillResult(StaticHeroSkill staticHeroSkill, SoldierForBattle skiller,SoldierForBattle target, int largeRoundNum){
		Map<String, Object> retMap = new HashMap<String,Object>();
		double targetEffectValue = 0;
		//初始化瞬时的技能持续性效果返回值
//		Map<Integer, Integer> effectResultMap = new HashMap<String,Object>();
		
		
		BuffObject godBuff = getGod(target);
		retMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_HIT);
//		Map<String, Object> battleViewInfo = new HashMap<String,Object>();
		retMap.put("locationId", target.getLocationId());
		switch (staticHeroSkill.getEffectType()) {
		case BattleMath.EFFECT_TYPE_HURT:
			if(godBuff!=null){//对于伤害类技能，如果目标身上挂有无敌，则直接无效返回
				retMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_GOD);
				return retMap;
			}
			//技能伤害
			targetEffectValue = computeSkillHurtForMulti(staticHeroSkill, skiller, target);
			//效果伤害,只算对目标
			targetEffectValue += computeImmediatelySkillHurt(staticHeroSkill, skiller, target);
			//攻击技能清除攻击和被攻击buff
			deleteBuffByLastTime(skiller, BattleMath.BUFF_LAST_TIME_NEXT_ATTACK);
			deleteBuffByLastTime(target, BattleMath.BUFF_LAST_TIME_NEXT_BE_ATTACKED);
			//添加buff
			addBuffResult(staticHeroSkill, skiller, target, largeRoundNum);
			break;
		case BattleMath.EFFECT_TYPE_CURE:
			//计算技能治疗
			targetEffectValue = computeSkillRecoverForMulti(staticHeroSkill, skiller, target);
			//计算效果治疗,只计算对目标的
			targetEffectValue += computeImmediatelySkillHurt(staticHeroSkill, skiller, target);
			//添加buff
			addBuffResult(staticHeroSkill, skiller, target, largeRoundNum);
			break;
		case BattleMath.EFFECT_TYPE_LAST_SKILL:
			addBuffResult(staticHeroSkill, skiller, target, largeRoundNum);
			//属性变化操作
			break;
		case BattleMath.EFFECT_TYPE_LAST_HURT:
			
			addBuffResult(staticHeroSkill, skiller, target, largeRoundNum);
			break;
		case BattleMath.EFFECT_TYPE_LAST_SPECIAL:
			//目前没有，询问数值处理方式
			addBuffResult(staticHeroSkill, skiller, target, largeRoundNum);
			break;
		case BattleMath.EFFECT_TYPE_CLEAN:
			//目前没有，询问数值处理方式
			cleanBuff(staticHeroSkill.getEffectValue(), target);
			break;
		case BattleMath.EFFECT_TYPE_DISPEL:
			//目前没有，询问数值处理方式
			dispelBuff(staticHeroSkill.getEffectValue(), target);
			break;
			
		default:
			break;
		}
//		//给结果添加伤害或治疗，包括技能自身效果值和附加效果效果值
//		if(skillHeroObject.equals(targetHeroObject)){//buff有效果
//			//施法目标就是自己，则不管特殊效果是对目标还是对自己影响，都算作对目标的影响,自己的影响变成0
//			int effectValue = (int)(targetEffectValue+effectResultMap.get(BUFF_TARGET_LIMIT_TARGET)+effectResultMap.get(BUFF_TARGET_LIMIT_SELF));
//			setTargetValueEffect(singleBattle,targetHero, effectValue, battleViewInfo);
//			battleViewInfo.put("skillerEffectValue", 0);//因为目标是自己，效果给目标或给自己是一样的，所以，此处都放在目标上，自己为0
//			battleViewInfo.put("skillerEffectType", BattleMath.HURT_RESULT_NORMAL);
//		}else{
//			int targetValue =(int) targetEffectValue+effectResultMap.get(BUFF_TARGET_LIMIT_TARGET);
//			int skillerValue = (int)effectResultMap.get(BUFF_TARGET_LIMIT_SELF);
//			setTargetValueEffect(singleBattle,targetHero, targetValue, battleViewInfo);
//			setSkillerEffect(skillHero, skillerValue, battleViewInfo);
//		}
		setTargetValueEffect(target, (int)targetEffectValue, retMap);
//		retMap.putAll(battleViewInfo);
//		retMap.put("battleHurtInfo", battleViewInfo);
		retMap.put("targetInfo", changeToSoldierMapForUpdate(target, largeRoundNum));//用于更新数据
//		List<Integer> hpUpdate = new ArrayList<Object>();
//		hpUpdate.add(singleBattle.getHeroA().getHeroForBattle().getHp());
//		hpUpdate.add(singleBattle.getHeroB().getHeroForBattle().getHp());
//		battleViewInfo.put("hpUpdate", hpUpdate);
//		List<Integer> mpUpdate = new ArrayList<Object>();
//		mpUpdate.add(singleBattle.getHeroA().getHeroForBattle().getMp());
//		mpUpdate.add(singleBattle.getHeroB().getHeroForBattle().getMp());
//		battleViewInfo.put("mpUpdate", mpUpdate);
		return retMap;
	}
	/**
	 * 为技能释放结果附加伤害类型，是否吸收，用于技能释放者
	 * @param targetHero
	 * @param effectValue
	 * @param battleViewInfo
	 */
	private static void setTargetValueEffect(SoldierForBattle target, int effectValue, Map<String, Object> battleViewInfo){
		BuffObject absorbHurtBuff = getAbsorbHurt(target);
		if(effectValue<0&&absorbHurtBuff!=null){
			int hurt = absorbHurt(target, absorbHurtBuff, effectValue);
			if(hurt<0){
				int amount = changeSkillHurtToAmount(hurt, target);
				battleViewInfo.put("effectValue", amount);
				battleViewInfo.put("effectType", BattleMath.HURT_RESULT_NORMAL);
				changeSoildierAmount(target, amount);//改变目标士兵数
				battleViewInfo.put("isDead", isDefencerDead(target));
//				changeHeroHp(targetHero, hurt);//改变目标血量
			}else{
				int amount = changeSkillHurtToAmount(effectValue, target);
				battleViewInfo.put("effectValue", amount);
				battleViewInfo.put("effectType", BattleMath.HURT_RESULT_ABSORB);
				battleViewInfo.put("isDead", isDefencerDead(target));
			}
		}else{
			int amount = changeSkillHurtToAmount(effectValue, target);
			battleViewInfo.put("effectValue", amount);
			battleViewInfo.put("effectType", BattleMath.HURT_RESULT_NORMAL);
			changeSoildierAmount(target, amount);//改变目标士兵数
			battleViewInfo.put("isDead", isDefencerDead(target));
		}
	}
	
	//持续性效果清算相关
	
	/**
	 * 持续性效果清算，并返回结果
	 * @param singleBattle
	 * @return
	 */
	public static List<Map<String, Object>> buffEffectSettlement(MultiBattle multiBattle){
		List<Map<String, Object>> heros = new ArrayList<Map<String, Object>>();
		Map<String, Object> temp;
		for(SoldierForBattle i: multiBattle.getLocationIdList()){
			if(i.isDead()){
				continue;
			}
			int effectValue = getBuffEffectValue(i);
			if(effectValue!=0){
				temp = new HashMap<String,Object>();
				temp.put("locationId", i.getLocationId());
				int amount = changeSkillHurtToAmount(effectValue, i);
				setTargetValueEffect(i, amount, temp);
//				changeSoildierAmount(i, amount);
				heros.add(temp);
			}
		}
		buffCleaningForRoundReady(multiBattle);//清除过期buff
		return heros;
	}
	
	/**
	 * 获取buff伤害或治疗的影响值，用于每回合结束
	 * @param hero
	 * @return
	 */
	public static int getBuffEffectValue(SoldierForBattle soldierForBattle){
		int heroHurtValue=0;
		for(int i=0;i<soldierForBattle.getBuffs().size();i++){
			BuffObject buffObject = soldierForBattle.getBuffs().get(i);
			heroHurtValue+=buffObject.getHurt();
		}
		for(int i=0;i<soldierForBattle.getDeBuffs().size();i++){
			BuffObject buffObject = soldierForBattle.getDeBuffs().get(i);
			heroHurtValue+=buffObject.getHurt();
		}
		return heroHurtValue;
	}
	
	/**
	 * buff清除，用于回合结束
	 * @param singleBattle
	 */
	public static void buffCleaningForRoundReady(MultiBattle multiBattle){
		for(SoldierForBattle i:multiBattle.getLocationIdList()){
			if(i.isDead()){
				continue;
			}
			for(int j=0;j<i.getBuffs().size();j++){
				BuffObject buffObject = i.getBuffs().get(j);
				if(buffObject.getStaticHeroSkillLastEffect().getLastTime()<0){
					continue;
				}else if(buffObject.getRemainRound(multiBattle.getLargeRoundAmount())==0){
					removeBuff(j, i);
				}
			}
			for(int k=0;k<i.getDeBuffs().size();k++){
				BuffObject buffObject = i.getDeBuffs().get(k);
				if(buffObject.getStaticHeroSkillLastEffect().getLastTime()<0){
					continue;
				}else if(buffObject.getRemainRound(multiBattle.getLargeRoundAmount())==0){
					removeDeBuff(k, i);
				}
			}
		}
	}
	
	//技能持续效果操作相关
	
	/**
	 * 净化持续性效果，非通用
	 * @param cleanAmount
	 * @param targetHeroObject
	 */
	private static void cleanBuff(int cleanAmount, SoldierForBattle target){
		int hasClean = 0;
		List<BuffObject> debuffs = target.getDeBuffs();
		for(int i=0;i<debuffs.size();i++){
			BuffObject buffObject = debuffs.get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getDispelable()==BattleMath.CAN_CLEAN){
				if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，删掉时需要恢复属性影响
					subtractBuffChangeValue(target, buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
				}
				debuffs.remove(i);
				i--;
				hasClean++;
			}
			if(hasClean>=cleanAmount){
				break;
			}
		}
	}
	
	/**
	 * 驱散持续性效果，非通用
	 * @param cleanAmount
	 * @param targetHeroObject
	 */
	private static void dispelBuff(int cleanAmount, SoldierForBattle target){
		int hasClean = 0;
		List<BuffObject> buffs = target.getBuffs();
		for(int i=0;i<buffs.size();i++){
			BuffObject buffObject = buffs.get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getDispelable()==BattleMath.CAN_CLEAN){
				if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，删掉时需要恢复属性影响
					subtractBuffChangeValue(target, buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
				}
				buffs.remove(i);
				i--;
				hasClean++;
			}
			if(hasClean>=cleanAmount){
				break;
			}
		}
	}
	
	/**
	 * 按持续时间清除buff,用于清除攻击和被攻击类型的buff
	 * @param heroForBattle
	 * @param buffLastTime
	 */
	public static void deleteBuffByLastTime(SoldierForBattle soldierForBattle, int buffLastTime){
		List<BuffObject> buffs = soldierForBattle.getBuffs();
		List<BuffObject> deBuffs = soldierForBattle.getDeBuffs();
		for(int i=0;i<buffs.size();i++){
			if(buffs.get(i).getStaticHeroSkillLastEffect().getLastTime()==buffLastTime){
				removeBuff(i, soldierForBattle);
			}
		}
		for(int i=0;i<deBuffs.size();i++){
			if(deBuffs.get(i).getStaticHeroSkillLastEffect().getLastTime()==buffLastTime){
				removeDeBuff(i, soldierForBattle);
			}
		}
	}
	
	/**
	 * 清除所有减益buff
	 * @param heroForBattle
	 */
	private static void removeAllDeBuff(SoldierForBattle soldierForBattle){
		soldierForBattle.getDeBuffs().removeAll(soldierForBattle.getDeBuffs());
	}
	
	/**
	 * 清除buff
	 * @param i
	 * @param heroForBattle
	 */
	private static void removeBuff(int i, SoldierForBattle soldierForBattle){
		List<BuffObject> buffs = soldierForBattle.getBuffs();
		if(isPropertyEffect(buffs.get(i).getStaticHeroSkillLastEffect())){
			subtractBuffChangeValue(soldierForBattle, buffs.get(i).getStaticHeroSkillLastEffect());//清除buff影响的属性
		}
		buffs.remove(i);
	}
	/**
	 * 清除deBuff
	 * @param i
	 * @param heroForBattle
	 */
	private static void removeDeBuff(int i, SoldierForBattle soldierForBattle){
		List<BuffObject> buffs = soldierForBattle.getDeBuffs();
		if(isPropertyEffect(buffs.get(i).getStaticHeroSkillLastEffect())){
			subtractBuffChangeValue(soldierForBattle, buffs.get(i).getStaticHeroSkillLastEffect());//清除debuff影响的属性
		}
		buffs.remove(i);
	}
	
	/**
	 * 非通用方法，查看是否是影响属性的buff
	 * @param staticHeroSkillLastEffect
	 * @return
	 */
	private static boolean isPropertyEffect(StaticHeroSkillLastEffect staticHeroSkillLastEffect){
		if(staticHeroSkillLastEffect.getType()==BattleMath.BUFF_EFFECT_TYPE_UP_PROPERTY||staticHeroSkillLastEffect.getType()==BattleMath.BUFF_EFFECT_TYPE_DOWN_PROPERTY){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 减buff并改变属性
	 * @param heroForBattle
	 * @param buff
	 */
	public static void subtractBuffChangeValue(SoldierForBattle soldierForBattle, StaticHeroSkillLastEffect buff){
		HeroAttribute heroAttribute = soldierForBattle.getHeroAttribute();
		if(buff.getMode()==BattleMath.SKILL_MODE_VALUE){
			//一级属性改变 改变武将属性
			if(buff.getHeroForce()!=0){
				double currentForce = heroAttribute.getForce();
				heroAttribute.setForceAdd(heroAttribute.getForceAdd()-buff.getHeroForce());
				double forceAfterEffect = heroAttribute.getForce();
				double forceChange = computeCurrentAttribute(currentForce, forceAfterEffect, heroAttribute.getForceEffect());
				//一级属性变化影响武将二级属性
				double heroAttackChange = HeroAlgorithm.computeAttack(forceChange);
				heroAttribute.setAttack(heroAttribute.getAttack()+heroAttackChange);
				double heroCriticalStrikeChange = HeroAlgorithm.computeCriticalStrike(forceChange);
				heroAttribute.setCriticalStrike(heroAttribute.getCriticalStrike()+heroCriticalStrikeChange);
			}
			if(buff.getAgility()!=0){
				double currentAgility = heroAttribute.getAgility();
				heroAttribute.setAgilityAdd(heroAttribute.getAgilityAdd()-buff.getAgility());
				double agilityAfterEffect = heroAttribute.getAgility();
				double agilityChange = computeCurrentAttribute(currentAgility, agilityAfterEffect, heroAttribute.getAgilityEffect());
				//一级属性变化影响武将二级属性
				double heroDodgeChange = HeroAlgorithm.computeDodge(agilityChange);
				heroAttribute.setDodge(heroAttribute.getDodge()+heroDodgeChange);
				double heroHitChange = HeroAlgorithm.computeHit(agilityChange);
				heroAttribute.setHit(heroAttribute.getHit()+heroHitChange);
				double heroMobilityChange = HeroAlgorithm.computeMobility(agilityChange);
				heroAttribute.setMobility(heroAttribute.getMobility()+heroMobilityChange);
			}
			if(buff.getStrategy()!=0){
				heroAttribute.setStrategyAdd(heroAttribute.getStrategyAdd()-buff.getStrategy());
			}
			if(buff.getPhysique()!=0){
				double currentPhysique = heroAttribute.getPhysique();
				heroAttribute.setPhysiqueAdd(heroAttribute.getPhysiqueAdd()-buff.getPhysique());
				double physiqueAfterEffect = heroAttribute.getPhysique();
				double physiqueChange = computeCurrentAttribute(currentPhysique, physiqueAfterEffect, heroAttribute.getPhysiqueEffect());
				//一级属性变化影响武将二级属性
				double heroDefenceChange = HeroAlgorithm.computeDefence(physiqueChange);
				heroAttribute.setDefence(heroAttribute.getDefence()+heroDefenceChange);
			}
			
			
			//二级属性改变
			soldierForBattle.setAttackAdd(soldierForBattle.getAttackAdd()-buff.getAtk());
			soldierForBattle.setDefenceAdd(soldierForBattle.getDefenceAdd()-buff.getDef());
			soldierForBattle.setDodgeAdd(soldierForBattle.getDodgeAdd()-buff.getDodge());
			soldierForBattle.setHitAdd(soldierForBattle.getHitAdd()-buff.getHit());
			soldierForBattle.setCriticalStrikeAdd(soldierForBattle.getCriticalStrikeAdd()-buff.getCrit());
			soldierForBattle.setMobilityAdd(soldierForBattle.getMobilityAdd()-buff.getMobility());
		}else if(buff.getMode()==BattleMath.SKILL_MODE_PERCENT){
			double addForce = (double)buff.getHeroForce()/100;
			double addAgility = (double)buff.getAgility()/100;
			double addStrategy = (double)buff.getStrategy()/100;
			double addPhysique = (double)buff.getPhysique()/100;
			//改变武将属性影响率
			heroAttribute.setForceEffect(heroAttribute.getForceEffect()-addForce);
			heroAttribute.setAgilityEffect(heroAttribute.getAgilityEffect()-addAgility);
			heroAttribute.setStrategyEffect(heroAttribute.getStrategyEffect()-addStrategy);
			heroAttribute.setPhysiqueEffect(heroAttribute.getPhysiqueEffect()-addPhysique);
			//转化为二级属性
			
			double heroAttackChange = HeroAlgorithm.computeAttack(heroAttribute.getForce()*addForce);
			heroAttribute.setAttack(heroAttribute.getAttack()-heroAttackChange);
			double heroDefenceChange = HeroAlgorithm.computeDefence(heroAttribute.getPhysique()*addPhysique);
			heroAttribute.setDefence(heroAttribute.getDefence()-heroDefenceChange);
			double heroDodgeChange = HeroAlgorithm.computeDodge(heroAttribute.getAgility()*addAgility);
			heroAttribute.setDodge(heroAttribute.getDodge()-heroDodgeChange);
			double heroHitChange = HeroAlgorithm.computeHit(heroAttribute.getAgility()*addAgility);
			heroAttribute.setHit(heroAttribute.getHit()-heroHitChange);
			double heroCriticalStrikeChange = HeroAlgorithm.computeCriticalStrike(heroAttribute.getForce()*addForce);
			heroAttribute.setCriticalStrike(heroAttribute.getCriticalStrike()-heroCriticalStrikeChange);
			double heroMobilityChange = HeroAlgorithm.computeMobility(heroAttribute.getAgility()*addAgility);
			heroAttribute.setMobility(heroAttribute.getMobility()-heroMobilityChange);
			
			//二级属性改变
			soldierForBattle.setAttackEffect(soldierForBattle.getAttackEffect()-(double)buff.getAtk()/100);
			soldierForBattle.setDefenceEffect(soldierForBattle.getDefenceEffect()-(double)buff.getDef()/100);
			soldierForBattle.setDodgeEffect(soldierForBattle.getDodgeEffect()-(double)buff.getDodge()/100);
			soldierForBattle.setHitEffect(soldierForBattle.getHitEffect()-(double)buff.getHit()/100);
			soldierForBattle.setCriticalStrikeEffect(soldierForBattle.getCriticalStrikeEffect()-(double)buff.getCrit()/100);
			soldierForBattle.setMobilityEffect(soldierForBattle.getMobilityEffect()-(double)buff.getMobility()/100);
		}
		computeSoldierAttribute(soldierForBattle);
	}
	private static double computeCurrentAttribute(double current, double afterEffect, double percent){
		return (afterEffect - current)*percent;
	}
	/**
	 * 加buff并改变属性
	 * @param heroForBattle
	 * @param buff
	 */
	public static void addBuffChangeValue(SoldierForBattle soldierForBattle, StaticHeroSkillLastEffect buff){
		HeroAttribute heroAttribute = soldierForBattle.getHeroAttribute();
		if(buff.getMode()==BattleMath.SKILL_MODE_VALUE){
			//一级属性改变 改变武将属性
			if(buff.getHeroForce()!=0){
				double currentForce = heroAttribute.getForce();
				heroAttribute.setForceAdd(heroAttribute.getForceAdd()+buff.getHeroForce());
				double forceAfterEffect = heroAttribute.getForce();
				double forceChange = computeCurrentAttribute(currentForce, forceAfterEffect, heroAttribute.getForceEffect());
				//一级属性变化影响武将二级属性
				double heroAttackChange = HeroAlgorithm.computeAttack(forceChange);
				heroAttribute.setAttack(heroAttribute.getAttack()+heroAttackChange);
				double heroCriticalStrikeChange = HeroAlgorithm.computeCriticalStrike(forceChange);
				heroAttribute.setCriticalStrike(heroAttribute.getCriticalStrike()+heroCriticalStrikeChange);
			}
			if(buff.getAgility()!=0){
				double currentAgility = heroAttribute.getAgility();
				heroAttribute.setAgilityAdd(heroAttribute.getAgilityAdd()+buff.getAgility());
				double agilityAfterEffect = heroAttribute.getAgility();
				double agilityChange = computeCurrentAttribute(currentAgility, agilityAfterEffect, heroAttribute.getAgilityEffect());
				//一级属性变化影响武将二级属性
				double heroDodgeChange = HeroAlgorithm.computeDodge(agilityChange);
				heroAttribute.setDodge(heroAttribute.getDodge()+heroDodgeChange);
				double heroHitChange = HeroAlgorithm.computeHit(agilityChange);
				heroAttribute.setHit(heroAttribute.getHit()+heroHitChange);
				double heroMobilityChange = HeroAlgorithm.computeMobility(agilityChange);
				heroAttribute.setMobility(heroAttribute.getMobility()+heroMobilityChange);
			}
			if(buff.getStrategy()!=0){
				heroAttribute.setStrategyAdd(heroAttribute.getStrategyAdd()+buff.getStrategy());
			}
			if(buff.getPhysique()!=0){
				double currentPhysique = heroAttribute.getPhysique();
				heroAttribute.setPhysiqueAdd(heroAttribute.getPhysiqueAdd()+buff.getPhysique());
				double physiqueAfterEffect = heroAttribute.getPhysique();
				double physiqueChange = computeCurrentAttribute(currentPhysique, physiqueAfterEffect, heroAttribute.getPhysiqueEffect());
				//一级属性变化影响武将二级属性
				double heroDefenceChange = HeroAlgorithm.computeDefence(physiqueChange);
				heroAttribute.setDefence(heroAttribute.getDefence()+heroDefenceChange);
			}
			
			
			//二级属性改变
			soldierForBattle.setAttackAdd(soldierForBattle.getAttackAdd()+buff.getAtk());
			soldierForBattle.setDefenceAdd(soldierForBattle.getDefenceAdd()+buff.getDef());
			soldierForBattle.setDodgeAdd(soldierForBattle.getDodgeAdd()+buff.getDodge());
			soldierForBattle.setHitAdd(soldierForBattle.getHitAdd()+buff.getHit());
			soldierForBattle.setCriticalStrikeAdd(soldierForBattle.getCriticalStrikeAdd()+buff.getCrit());
			soldierForBattle.setMobilityAdd(soldierForBattle.getMobilityAdd()+buff.getMobility());
		}else if(buff.getMode()==BattleMath.SKILL_MODE_PERCENT){
			double addForce = (double)buff.getHeroForce()/100;
			double addAgility = (double)buff.getAgility()/100;
			double addStrategy = (double)buff.getStrategy()/100;
			double addPhysique = (double)buff.getPhysique()/100;
			//改变武将属性影响率
			heroAttribute.setForceEffect(heroAttribute.getForceEffect()+addForce);
			heroAttribute.setAgilityEffect(heroAttribute.getAgilityEffect()+addAgility);
			heroAttribute.setStrategyEffect(heroAttribute.getStrategyEffect()+addStrategy);
			heroAttribute.setPhysiqueEffect(heroAttribute.getPhysiqueEffect()+addPhysique);
			//转化为二级属性
			
			double heroAttackChange = HeroAlgorithm.computeAttack(heroAttribute.getForce()*addForce);
			heroAttribute.setAttack(heroAttribute.getAttack()+heroAttackChange);
			double heroDefenceChange = HeroAlgorithm.computeDefence(heroAttribute.getPhysique()*addPhysique);
			heroAttribute.setDefence(heroAttribute.getDefence()+heroDefenceChange);
			double heroDodgeChange = HeroAlgorithm.computeDodge(heroAttribute.getAgility()*addAgility);
			heroAttribute.setDodge(heroAttribute.getDodge()+heroDodgeChange);
			double heroHitChange = HeroAlgorithm.computeHit(heroAttribute.getAgility()*addAgility);
			heroAttribute.setHit(heroAttribute.getHit()+heroHitChange);
			double heroCriticalStrikeChange = HeroAlgorithm.computeCriticalStrike(heroAttribute.getForce()*addForce);
			heroAttribute.setCriticalStrike(heroAttribute.getCriticalStrike()+heroCriticalStrikeChange);
			double heroMobilityChange = HeroAlgorithm.computeMobility(heroAttribute.getAgility()*addAgility);
			heroAttribute.setMobility(heroAttribute.getMobility()+heroMobilityChange);
			
			//二级属性改变
			soldierForBattle.setAttackEffect(soldierForBattle.getAttackEffect()+(double)buff.getAtk()/100);
			soldierForBattle.setDefenceEffect(soldierForBattle.getDefenceEffect()+(double)buff.getDef()/100);
			soldierForBattle.setDodgeEffect(soldierForBattle.getDodgeEffect()+(double)buff.getDodge()/100);
			soldierForBattle.setHitEffect(soldierForBattle.getHitEffect()+(double)buff.getHit()/100);
			soldierForBattle.setCriticalStrikeEffect(soldierForBattle.getCriticalStrikeEffect()+(double)buff.getCrit()/100);
			soldierForBattle.setMobilityEffect(soldierForBattle.getMobilityEffect()+(double)buff.getMobility()/100);
		}
		computeSoldierAttribute(soldierForBattle);
	}
	//获得技能伤害相关
	
	/**
	 * 将影响数值转化为士兵数
	 * 
	 * @param effect
	 * @param defencer
	 * @return
	 */
	private static final int changeSkillHurtToAmount(int effect,
			SoldierForBattle defencer) {
		int amount = (int) (effect / defencer.getHp());
		if(effect==0){
			return amount;
		}else if(effect>0){
			return amount==0?1:amount;
		}else{
			return amount==0?-1:amount;
		}
	}
	
	/**
	 * 计算技能伤害值
	 * @param staticHeroSkill
	 * @param skillHero
	 * @param targetHero
	 * @return
	 */
	private static double computeSkillHurtForMulti(StaticHeroSkill staticHeroSkill, SoldierForBattle skiller,SoldierForBattle targetHero){
		if(staticHeroSkill.getEffectMode()==BattleMath.SKILL_MODE_VALUE){
			if(staticHeroSkill.getDmgType()==BattleMath.SKILL_DAMAGE_TYPE_PHYSICAL){
				double attackValue = skiller.getAttack();
				double defenceValue = targetHero.getDefence();
				int level = targetHero.getHeroLevel();
				return -attackValue*(1+(double)staticHeroSkill.getEffectValue()/100)*(1-.25*defenceValue/(5*level+.25*defenceValue));
			}else if(staticHeroSkill.getDmgType()==BattleMath.SKILL_DAMAGE_TYPE_MAGIC){
				double heroStrategy = skiller.getHeroAttribute().getStrategy()*skiller.getHeroAttribute().getStrategyEffect();
				return -heroStrategy*(1+(double)staticHeroSkill.getEffectValue()/100);
				
			}else{
				return 0;
			}
		}else if(staticHeroSkill.getEffectMode()==BattleMath.SKILL_MODE_PERCENT){
			return -targetHero.getHp()*targetHero.getSoldierAmout()*staticHeroSkill.getEffectValue()/100;
		}else{
			return 0;
		}
	}
	
	/**
	 * 计算技能治疗值
	 * @param staticHeroSkill
	 * @param skillHero
	 * @param targetHero
	 * @return
	 */
	private static double computeSkillRecoverForMulti(StaticHeroSkill staticHeroSkill, SoldierForBattle skiller, SoldierForBattle target){
		if(staticHeroSkill.getEffectMode()==BattleMath.SKILL_MODE_VALUE){
			
			return staticHeroSkill.getEffectValue();
		}else if(staticHeroSkill.getEffectMode()==BattleMath.SKILL_MODE_PERCENT){
			return staticHeroSkill.getEffectValue()*target.getHp()*target.getSoldierAmoutMax()/100;
		}else{
			return 0;
		}
	}
	
	/**
	 * 非通用方法，计算触发瞬时效果的影响值
	 * @param staticHeroSkill
	 * @param skillHero
	 * @param targetHero
	 * @return
	 */
	private static double computeImmediatelySkillHurt(StaticHeroSkill staticHeroSkill, SoldierForBattle skillHero, SoldierForBattle targetHero){
		List<StaticHeroSkillLastEffect> effects = new ArrayList<StaticHeroSkillLastEffect>();
		if(isImmediatelySkill(staticHeroSkill.getAddEffectRate1(),staticHeroSkill.getEffectEntity1())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect1 = staticHeroSkill.getEffectEntity1();
			effects.add(staticHeroSkillLastEffect1);
		}
		if(isImmediatelySkill(staticHeroSkill.getAddEffectRate2(),staticHeroSkill.getEffectEntity2())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect2 = staticHeroSkill.getEffectEntity2();
			effects.add(staticHeroSkillLastEffect2);
		}
		if(isImmediatelySkill(staticHeroSkill.getAddEffectRate3(),staticHeroSkill.getEffectEntity3())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect3 = staticHeroSkill.getEffectEntity3();
			effects.add(staticHeroSkillLastEffect3);
		}
		double hurt = 0;
		for(StaticHeroSkillLastEffect i:effects){
			if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){//瞬时效果作用目标为目标
				if(i.getType()==BattleMath.BUFF_EFFECT_TYPE_LAST_HURT){
					hurt+=computeLastSkillHurtForMulti(staticHeroSkill,i, skillHero, targetHero);
				}else if(i.getType()==BattleMath.BUFF_EFFECT_TYPE_LAST_CURE){
					hurt+=computeLastSkillRecoverForMulti(i, skillHero, targetHero);
				}
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF&&skillHero.equals(targetHero)){//瞬时效果作用目标为自己，并且目标就是自己
				if(i.getType()==BattleMath.BUFF_EFFECT_TYPE_LAST_HURT){
					hurt+=computeLastSkillHurtForMulti(staticHeroSkill,i, skillHero, targetHero);
				}else if(i.getType()==BattleMath.BUFF_EFFECT_TYPE_LAST_CURE){
					hurt+=computeLastSkillRecoverForMulti(i, skillHero, targetHero);
				}
			}
		}
		return hurt;
	}
	/**
	 * 非通用方法，判断是否是瞬时技能并触发
	 * @param rate
	 * @param staticHeroSkillLastEffect
	 * @return
	 */
	private static boolean isImmediatelySkill(int rate, StaticHeroSkillLastEffect staticHeroSkillLastEffect){
		if(rate==0){
			return false;
		}
		if(staticHeroSkillLastEffect==null){
			return false;
		}
		if(!RandomFunc.isSuccessfulForSkill(rate)){
			return false;
		}
		if(staticHeroSkillLastEffect.getLastTime()!=BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
			return false;
		}
		return true;
	}
	
	/**
	 * 计算持续性效果伤害值
	 * @param staticHeroSkillLastEffect
	 * @param skillHero
	 * @param targetHero
	 * @return
	 */
	private static double computeLastSkillHurtForMulti(StaticHeroSkill staticHeroSkill, StaticHeroSkillLastEffect staticHeroSkillLastEffect, SoldierForBattle skiller, SoldierForBattle targetHero){
		int lastTime = staticHeroSkillLastEffect.getLastTime();
		if(staticHeroSkillLastEffect.getMode()==BattleMath.SKILL_MODE_VALUE){
			if(staticHeroSkill.getDmgType()==BattleMath.SKILL_DAMAGE_TYPE_PHYSICAL){
				double attackValue = skiller.getAttack();
				double defenceValue = targetHero.getDefence();
				int level = targetHero.getHeroLevel();
				return -attackValue*(1+(double)staticHeroSkillLastEffect.getValue()/100)*(1-.25*defenceValue/(5*level+.25*defenceValue))/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			}else if(staticHeroSkill.getDmgType()==BattleMath.SKILL_DAMAGE_TYPE_MAGIC){
				double heroStrategy = skiller.getHeroAttribute().getStrategy()*skiller.getHeroAttribute().getStrategyEffect();
				return -heroStrategy*(1+(double)staticHeroSkillLastEffect.getValue()/100)/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
				
			}else{
				return 0;
			}
		}else if(staticHeroSkillLastEffect.getMode()==BattleMath.SKILL_MODE_PERCENT){
			return -targetHero.getHp()*targetHero.getSoldierAmout()*staticHeroSkillLastEffect.getValue()/100/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
		}else if(staticHeroSkillLastEffect.getMode()==BattleMath.SKILL_MODE_HERO_PROPERTY){
			HeroAttribute skillHero = skiller.getHeroAttribute();
			switch(staticHeroSkillLastEffect.getValue()){
			case BattleMath.SKILL_MODE_HERO_PROPERTY_FORCE:
				double heroForce = skillHero.getForce()*skillHero.getForceEffect();
				heroForce = heroForce<0?0:heroForce;
				return -heroForce/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			case BattleMath.SKILL_MODE_HERO_PROPERTY_STRATEGY:
				double strategy = skillHero.getStrategy()*skillHero.getStrategyEffect();
				strategy = strategy<0?0:strategy;
				return -strategy/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			case BattleMath.SKILL_MODE_HERO_PROPERTY_AGILITY:
				double agility = skillHero.getAgility()*skillHero.getAgilityEffect();
				agility = agility<0?0:agility;
				return -agility/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			case BattleMath.SKILL_MODE_HERO_PROPERTY_PHYSIQUE:
				double physique = skillHero.getPhysique()*skillHero.getPhysiqueEffect();
				physique = physique<0?0:physique;
				return -physique/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			default:
				return 0;
			}
		}
		else{
			return 0;
		}
	}
	
	/**
	 * 计算持续性效果治疗值
	 * @param staticHeroSkillLastEffect
	 * @param skillHero
	 * @param targetHero
	 * @return
	 */
	private static double computeLastSkillRecoverForMulti(StaticHeroSkillLastEffect staticHeroSkillLastEffect, SoldierForBattle skiller, SoldierForBattle target){
		int lastTime = staticHeroSkillLastEffect.getLastTime();
		if(staticHeroSkillLastEffect.getMode()==BattleMath.SKILL_MODE_VALUE){
			return (double)staticHeroSkillLastEffect.getValue()/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
		}else if(staticHeroSkillLastEffect.getMode()==BattleMath.SKILL_MODE_PERCENT){
			return target.getHp()*target.getSoldierAmoutMax()*staticHeroSkillLastEffect.getValue()/100/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
		}else if(staticHeroSkillLastEffect.getMode()==BattleMath.SKILL_MODE_HERO_PROPERTY){
			HeroAttribute skillHero = skiller.getHeroAttribute();
			switch(staticHeroSkillLastEffect.getValue()){
			case BattleMath.SKILL_MODE_HERO_PROPERTY_FORCE:
				double heroForce = skillHero.getForce()*skillHero.getForceEffect();
				heroForce = heroForce<0?0:heroForce;
				return heroForce/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			case BattleMath.SKILL_MODE_HERO_PROPERTY_STRATEGY:
				double strategy = skillHero.getStrategy()*skillHero.getStrategyEffect();
				strategy = strategy<0?0:strategy;
				return strategy/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			case BattleMath.SKILL_MODE_HERO_PROPERTY_AGILITY:
				double agility = skillHero.getAgility()*skillHero.getAgilityEffect();
				agility = agility<0?0:agility;
				return agility/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			case BattleMath.SKILL_MODE_HERO_PROPERTY_PHYSIQUE:
				double physique = skillHero.getPhysique()*skillHero.getPhysiqueEffect();
				physique = physique<0?0:physique;
				return physique/(lastTime==BattleMath.BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
			default:
				return 0;
			}
		}
		else{
			return 0;
		}
	}
	
	//获得技能效果相关
	
	/**
	 * 获取持续性禁言效果
	 * @param heroForBattle
	 * @return
	 */
	public static BuffObject getNoSkill(SoldierForBattle soldierForBattle){
		for(BuffObject i:soldierForBattle.getBuffs()){
			if(i.getStaticHeroSkillLastEffect().getType()==BattleMath.BUFF_EFFECT_TYPE_NO_SKILL){
				return i;
			}
		}
		return null;
	}
	
	/**
	 * 获取持续性混乱效果
	 * @param heroForBattle
	 * @return
	 */
	public static BuffObject getChaos(SoldierForBattle soldierForBattle){
		for(BuffObject i:soldierForBattle.getDeBuffs()){
			if(i.getStaticHeroSkillLastEffect().getType()==BattleMath.BUFF_EFFECT_TYPE_CHAOS){
				return i;
			}
		}
		return null;
	}
	
	/**
	 * 获取持续性无敌效果
	 * @param heroForBattle
	 * @return
	 */
	public static BuffObject getGod(SoldierForBattle soldierForBattle){
		for(BuffObject i:soldierForBattle.getBuffs()){
			if(i.getStaticHeroSkillLastEffect().getType()==BattleMath.BUFF_EFFECT_TYPE_GOD){
				return i;
			}
		}
		return null;
	}
	
	/**
	 * 获取持续性吸收伤害效果
	 * 
	 * @param heroForBattle
	 * @return
	 */
	public static BuffObject getAbsorbHurt(SoldierForBattle soldierForBattle) {
		for (BuffObject i : soldierForBattle.getBuffs()) {
			if (i.getStaticHeroSkillLastEffect().getType() == BattleMath.BUFF_EFFECT_TYPE_REDUCE_HURT) {
				return i;
			}
		}
		return null;
	}

	/**
	 * 返回吸收伤害后，魔法盾的剩余血量
	 * 
	 * @param heroForBattle
	 * @param buffObject
	 * @param hurt
	 * @return
	 */
	private static int absorbHurt(SoldierForBattle soldierForBattle,
			BuffObject buffObject, int hurt) {
		hurt += buffObject.getAbsorbHurt();
		if (hurt > 0) {
			buffObject.setAbsorbHurt(hurt);
		} else {
			soldierForBattle.getBuffs().remove(buffObject);
		}
		return hurt;
	}
	
	/**
	 * 为目标添加持续性效果
	 * @param staticHeroSkill
	 * @param skillHeroObject
	 * @param targetHeroObject
	 * @param largeRoundNum
	 */
	private static void addBuffResult(StaticHeroSkill staticHeroSkill, SoldierForBattle skiller, SoldierForBattle target, int largeRoundNum){
		List<StaticHeroSkillLastEffect> effects = new ArrayList<StaticHeroSkillLastEffect>();
		if(staticHeroSkill.getAddEffectRate1()!=0&&staticHeroSkill.getEffectEntity1()!=null&&RandomFunc.isSuccessfulForSkill(staticHeroSkill.getAddEffectRate1())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect1 = staticHeroSkill.getEffectEntity1();
			effects.add(staticHeroSkillLastEffect1);
		}
		if(staticHeroSkill.getAddEffectRate2()!=0&&staticHeroSkill.getEffectEntity2()!=null&&RandomFunc.isSuccessfulForSkill(staticHeroSkill.getAddEffectRate2())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect2 = staticHeroSkill.getEffectEntity2();
			effects.add(staticHeroSkillLastEffect2);
		}
		if(staticHeroSkill.getAddEffectRate3()!=0&&staticHeroSkill.getEffectEntity3()!=null&&RandomFunc.isSuccessfulForSkill(staticHeroSkill.getAddEffectRate3())){
			StaticHeroSkillLastEffect staticHeroSkillLastEffect3 = staticHeroSkill.getEffectEntity3();
			effects.add(staticHeroSkillLastEffect3);
		}
		for(StaticHeroSkillLastEffect i:effects){
			 buffEffect(staticHeroSkill,i, skiller, target, largeRoundNum);//添加
		}
	}
	/**
	 * 非通用方法，按buff类别添加buff影响
	 * @param i
	 * @param skillHeroObject
	 * @param targetHeroObject
	 * @param largeRoundNum
	 */
	private static void buffEffect(StaticHeroSkill staticHeroSkill, StaticHeroSkillLastEffect i, SoldierForBattle skiller, SoldierForBattle target, int largeRoundNum){
		BuffObject godBuff = getGod(target);
		switch (i.getType()) {
		
		case BattleMath.BUFF_EFFECT_TYPE_LAST_HURT:
			if(godBuff!=null){
				break;
			}
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				break;
//				hurt+=computeLastSkillHurt(i, skillHeroObject.getHeroForBattle(), targetHeroObject.getHeroForBattle());
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){
				double value = computeLastSkillHurtForMulti(staticHeroSkill,i, skiller, target);
				addDeBuff(target, i, largeRoundNum,(int)value);
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF&&skiller.equals(target)){
				double value = computeLastSkillHurtForMulti(staticHeroSkill,i, skiller, target);
				addDeBuff(skiller, i, largeRoundNum,(int)value);
			}
			
			break;
		case BattleMath.BUFF_EFFECT_TYPE_LAST_CURE:
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				break;
//				hurt+=computeLastSkillRecover(i, skillHeroObject.getHeroForBattle(), targetHeroObject.getHeroForBattle());
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){
				double value = computeLastSkillRecoverForMulti(i, skiller, target);
				addBuff(target, i, largeRoundNum,(int)value);
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF&&skiller.equals(target)){
				double value = computeLastSkillRecoverForMulti(i, skiller, target);
				addBuff(skiller, i, largeRoundNum,(int)value);
			}
			break;
		case BattleMath.BUFF_EFFECT_TYPE_UP_PROPERTY:
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){
				addBuff(target, i, largeRoundNum,0);//0为没有伤害和治疗效果
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF&&skiller.equals(target)){
				addBuff(skiller, i, largeRoundNum,0);
			}
			break;
		case BattleMath.BUFF_EFFECT_TYPE_DOWN_PROPERTY:
			if(godBuff!=null){
				break;
			}
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){
				addDeBuff(target, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF&&skiller.equals(target)){
				addDeBuff(skiller, i, largeRoundNum,0);
			}
			break;
		case BattleMath.BUFF_EFFECT_TYPE_CLEAN:
			cleanBuff(i.getValue(), target);
			//净化
			break;
		case BattleMath.BUFF_EFFECT_TYPE_DISPEL:
			dispelBuff(i.getValue(), target);
			//驱散
			break;
		case BattleMath.BUFF_EFFECT_TYPE_CHAOS:
			if(godBuff!=null){
				break;
			}
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){
				addDeBuff(target, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF&&skiller.equals(target)){
				addDeBuff(skiller, i, largeRoundNum,0);
			}
			break;
		case BattleMath.BUFF_EFFECT_TYPE_NO_SKILL:
			if(godBuff!=null){
				break;
			}
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){
				addDeBuff(target, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF&&skiller.equals(target)){
				addDeBuff(skiller, i, largeRoundNum,0);
			}
			break;
		case BattleMath.BUFF_EFFECT_TYPE_REDUCE_HURT:
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){
				addBuff(target, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF){
				addBuff(skiller, i, largeRoundNum,0);
			}
			break;
		case BattleMath.BUFF_EFFECT_TYPE_GOD:
			if(i.getLastTime()==BattleMath.BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_TARGET){
				removeAllDeBuff(target);//清除所有debuff
				addBuff(target, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BattleMath.BUFF_TARGET_LIMIT_SELF&&skiller.equals(target)){
				removeAllDeBuff(skiller);//清除所有debuff
				addBuff(skiller, i, largeRoundNum,0);
			}
			break;

		default:
			break;
		}
//		return hurt;
	}
	/**
	 * 添加deBuff
	 * @param targetHeroObject
	 * @param staticHeroSkillLastEffect
	 * @param largeRoundNum
	 * @param hurt
	 */
	private static void addDeBuff(SoldierForBattle target, StaticHeroSkillLastEffect staticHeroSkillLastEffect, int largeRoundNum, int hurt){
		List<BuffObject> deBuffs = target.getDeBuffs();
		BuffObject newDeBuff = new BuffObject(largeRoundNum, staticHeroSkillLastEffect,hurt);
		//同类型顶掉
		for(int i=0;i<deBuffs.size();i++){
			BuffObject buffObject = deBuffs.get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getCoexistType()==staticHeroSkillLastEffect.getCoexistType()){
				if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，顶掉时需要恢复属性影响
					subtractBuffChangeValue(target, buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
				}
				if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
					addBuffChangeValue(target, staticHeroSkillLastEffect);//添加buff
				}
				deBuffs.set(i, newDeBuff);
				return;
			}
		}
		//不存在同类型
		if(deBuffs.size()<BattleMath.MAX_BUFF_AMOUNT){
			if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
				addBuffChangeValue(target, staticHeroSkillLastEffect);//添加buff
			}
			deBuffs.add(newDeBuff);
		}else{
			BuffObject buffObject = deBuffs.get(0);
			if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，顶掉时需要恢复属性影响
				subtractBuffChangeValue(target, buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
			}
			if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
				addBuffChangeValue(target, staticHeroSkillLastEffect);//添加buff
			}
			deBuffs.remove(0);
			deBuffs.add(newDeBuff);
		}
			
	}
	private static void addBuff(SoldierForBattle target, StaticHeroSkillLastEffect staticHeroSkillLastEffect, int largeRoundNum, int hurt){
		List<BuffObject> buffs = target.getBuffs();
		BuffObject newBuff = new BuffObject(largeRoundNum, staticHeroSkillLastEffect,hurt);
		//同类型顶掉
		for(int i=0;i<buffs.size();i++){
			BuffObject buffObject = buffs.get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getCoexistType()==staticHeroSkillLastEffect.getCoexistType()){
				if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，顶掉时需要恢复属性影响
					subtractBuffChangeValue(target, buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
				}
				if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
					addBuffChangeValue(target, staticHeroSkillLastEffect);//添加buff
				}
				buffs.set(i, newBuff);
				return;
			}
		}
		//不存在同类型
		if(buffs.size()<BattleMath.MAX_BUFF_AMOUNT){
			if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
				addBuffChangeValue(target, staticHeroSkillLastEffect);//添加buff
			}
			buffs.add(newBuff);
		}else{
			BuffObject buffObject = buffs.get(0);
			if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，顶掉时需要恢复属性影响
				subtractBuffChangeValue(target, buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
			}
			if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
				addBuffChangeValue(target, staticHeroSkillLastEffect);//添加buff
			}
			buffs.remove(0);
			buffs.add(newBuff);
		}
	}
	
	/////////////数据格式整理相关/////////////////
	private static final Map<String, Object> changeToSoldierMapForUpdate(SoldierForBattle i, int roundNum){
		Map<String, Object> temp = new HashMap<String,Object>();
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
		return temp;
	}
	private static final List<Map<String, Object>> changeToBuffMap(List<BuffObject> buffs, int roundNum){
		List<Map<String, Object>> buffList = new ArrayList<Map<String, Object>>();
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
}
