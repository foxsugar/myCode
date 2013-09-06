package com.crystalcg.gamedev.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.battleProcess.action.BattleProcessAction;
import com.crystalcg.gamedev.battleProcess.domain.BuffObject;
import com.crystalcg.gamedev.battleProcess.domain.HeroForBattle;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattle;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattleObject;
import com.crystalcg.gamedev.util.cache.HeroSkillCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyAi;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkillLastEffect;

/**
 * 单挑战斗计算相关
 * @author jinganyang
 *
 */
public class BattleMath {
	
	public static Logger logger = LoggerFactory.getLogger(BattleMath.class);
	/**
	 * 目标限制，敌人
	 */
	public static final int TARGET_LIMIT_ENEMY = 1;
	/**
	 * 目标限制，自己
	 */
	public static final int TARGET_LIMIT_SELF = 2;
	/**
	 * 目标限制，友方
	 */
	public static final int TARGET_LIMIT_FRIEND = 3;
	/**
	 * 目标限制，所有
	 */
	public static final int TARGET_LIMIT_BOTH_SELF_AND_OTHER = 4;
	
	/**
	 * 持续性效果目标，对方
	 */
	public static final int BUFF_TARGET_LIMIT_TARGET = 1;
	/**
	 * 持续性效果目标，己方
	 */
	public static final int BUFF_TARGET_LIMIT_SELF = 2;
	
	/**
	 * 技能类型，伤害
	 */
	public static final int EFFECT_TYPE_HURT = 1;
	/**
	 * 技能类型，治疗
	 */
	public static final int EFFECT_TYPE_CURE = 2;
	/**
	 * 技能类型，持续属性增减
	 */
	public static final int EFFECT_TYPE_LAST_SKILL = 3;
	/**
	 * 技能类型，持续伤害、治疗
	 */
	public static final int EFFECT_TYPE_LAST_HURT = 4;
	/**
	 * 技能类型，特殊
	 */
	public static final int EFFECT_TYPE_LAST_SPECIAL = 5;
	/**
	 * 技能类型，净化己方
	 */
	public static final int EFFECT_TYPE_CLEAN = 6;
	/**
	 * 技能类型，驱散敌方
	 */
	public static final int EFFECT_TYPE_DISPEL = 7;

	
	/**
	 * buff效果，持续伤害
	 */
	public static final int BUFF_EFFECT_TYPE_LAST_HURT = 1;
	/**
	 * buff效果，持续治疗
	 */
	public static final int BUFF_EFFECT_TYPE_LAST_CURE = 2;
	/**
	 * buff效果，持续属性提升
	 */
	public static final int BUFF_EFFECT_TYPE_UP_PROPERTY = 3;
	/**
	 * buff效果，持续属性减少
	 */
	public static final int BUFF_EFFECT_TYPE_DOWN_PROPERTY = 4;
	/**
	 * buff效果，净化
	 */
	public static final int BUFF_EFFECT_TYPE_CLEAN = 5;
	/**
	 * buff效果，驱散
	 */
	public static final int BUFF_EFFECT_TYPE_DISPEL = 6;
	/**
	 * buff效果，混乱
	 */
	public static final int BUFF_EFFECT_TYPE_CHAOS = 7;
	/**
	 * buff效果，沉默
	 */
	public static final int BUFF_EFFECT_TYPE_NO_SKILL = 8;
	/**
	 * buff效果，持续伤害
	 */
	public static final int BUFF_EFFECT_TYPE_REDUCE_HURT = 9;
	/**
	 * buff效果，持续无敌
	 */
	public static final int BUFF_EFFECT_TYPE_GOD = 10;

	/**
	 * 技能影响值类型，普通值
	 */
	public static final int SKILL_MODE_VALUE = 1;
	/**
	 * 技能影响值类型，百分比
	 */
	public static final int SKILL_MODE_PERCENT = 2;
	/**
	 * 技能影响值类型，按武将属性
	 */
	public static final int SKILL_MODE_HERO_PROPERTY = 3;

	/**
	 * 技能影响值类型按武将属性，武力
	 */
	public static final int SKILL_MODE_HERO_PROPERTY_FORCE = 1;
	/**
	 * 技能影响值类型按武将属性，谋略
	 */
	public static final int SKILL_MODE_HERO_PROPERTY_STRATEGY = 2;
	/**
	 * 技能影响值类型按武将属性，身法
	 */
	public static final int SKILL_MODE_HERO_PROPERTY_AGILITY = 3;
	/**
	 * 技能影响值类型按武将属性，体质
	 */
	public static final int SKILL_MODE_HERO_PROPERTY_PHYSIQUE = 4;
	
	/**
	 * 最大buff数，增减益分开算
	 */
	public static final int MAX_BUFF_AMOUNT = 4;
	
	/**
	 * 持续性效果能驱散
	 */
	public static final int CAN_CLEAN = 1;
	/**
	 * 持续性效果不能驱散
	 */
	public static final int CAN_NOT_CLEAN = 0;
	
	/**
	 * 持续性效果持续时间，立即
	 */
	public static final int BUFF_LAST_TIME_IMMEDIATELY = 0;
	/**
	 * 持续性效果持续时间，下次攻击
	 */
	public static final int BUFF_LAST_TIME_NEXT_ATTACK = -1;
	/**
	 * 持续性效果持续时间，下次被攻击
	 */
	public static final int BUFF_LAST_TIME_NEXT_BE_ATTACKED = -2;
	/**
	 * 持续性效果持续时间，魔法盾类破盾
	 */
	public static final int BUFF_LAST_TIME_ABSORB_HURT = -3;
	
	/**
	 * 伤害结果，普通，直接显示数值
	 */
	public static final int HURT_RESULT_NORMAL = 1;
	/**
	 * 伤害结果，普通，显示数值后面加“吸收”
	 */
	public static final int HURT_RESULT_ABSORB = 2;
	/**
	 * 伤害结果，普通，显示“免疫”
	 */
	public static final int HURT_RESULT_GOD = 3;
	
	/**
	 * 单挑伤害值前除以的系数，临时算法
	 */
	public static final double SINGLE_HURT_FACTOR = 9.8;
	
	/**
	 * 技能伤害类型物理伤害
	 */
	public static final int SKILL_DAMAGE_TYPE_PHYSICAL = 1;
	/**
	 * 技能伤害类型谋略伤害
	 */
	public static final int SKILL_DAMAGE_TYPE_MAGIC = 2;
	
	/**
	 * 是否命中
	 * @param heroForBattle
	 * @return
	 */
	public static boolean isHit(HeroForBattle heroForBattle){
		double hit = heroForBattle.getHit()*heroForBattle.getHitEffect();
		double hitPercent = 0.75+hit/(10000+45*hit);
		return RandomFunc.isSuccessful(hitPercent);
	}
	/**
	 * 是否是否闪避
	 * @param heroForBattle
	 * @return
	 */
	public static boolean isMiss(HeroForBattle heroForBattle){
		double dodge = heroForBattle.getDodge()*heroForBattle.getDodgeEffect();
		double dodgePercent = dodge/(6400+22*dodge);
		return RandomFunc.isSuccessful(dodgePercent);
	}
	/**
	 * 是否暴击
	 * @param heroForBattle
	 * @return
	 */
	public static boolean isCriticalStrike(HeroForBattle heroForBattle){
		double criticalStrike = heroForBattle.getCriticalStrike()*heroForBattle.getCriticalStrikeEffect();
		double criticalStrikePercent = criticalStrike/(1900+criticalStrike);
		return RandomFunc.isSuccessful(criticalStrikePercent);
	}
	/**
	 * 伤害值
	 * @param heroForBattle
	 * @return
	 */
	public static int hurtValue(HeroForBattle attack, HeroForBattle defence){
		double attackValue = attack.getAttack()*attack.getAttackEffect()<0?0:attack.getAttack()*attack.getAttackEffect();
		double defenceValue = defence.getDefence()*defence.getDefenceEffect()<0?0:defence.getDefence()*defence.getDefenceEffect();
		double hurtValue = attackValue*(1- defenceValue/(Math.pow(defence.getLevel(), 2)+defenceValue))+1;
		return (int)hurtValue;
	}
	/**
	 * 暴击伤害值
	 * @param heroForBattle
	 * @return
	 */
	public static int criticalHurtValue(HeroForBattle attack, HeroForBattle defence){
		double attackValue = attack.getAttack()*attack.getAttackEffect()<0?0:attack.getAttack()*attack.getAttackEffect();
		double defenceValue = defence.getDefence()*defence.getDefenceEffect()<0?0:defence.getDefence()*defence.getDefenceEffect();
		double hurtValue = attackValue*(1- defenceValue/(Math.pow(defence.getLevel(), 2)+defenceValue))*1.25;
		return (int)hurtValue;
	}
	/**
	 * 使用技能结果
	 * @param staticHeroSkill
	 * @param singleBattle
	 * @return
	 */
	public static Map<String, Object> skillResultForSingleBattle(StaticHeroSkill staticHeroSkill, SingleBattle singleBattle){
		SingleBattleObject skillPerson = singleBattle.getOperateHero();
		skillPerson.getHeroForBattle().setMp(skillPerson.getHeroForBattle().getMp()-staticHeroSkill.getNeedVnp());//扣除mp
		Map<String, Object> retMap = null;
		switch (staticHeroSkill.getTargetLimit()) {
		case TARGET_LIMIT_ENEMY:
			retMap = enemyResultForSingle(staticHeroSkill, skillPerson, singleBattle.getTargetHero(), singleBattle);
			break;
		case TARGET_LIMIT_SELF:
			retMap = enemyResultForSingle(staticHeroSkill, skillPerson, skillPerson, singleBattle);
			break;
		case TARGET_LIMIT_FRIEND:
			retMap = enemyResultForSingle(staticHeroSkill, skillPerson, skillPerson, singleBattle);
			break;
		case TARGET_LIMIT_BOTH_SELF_AND_OTHER:
			
			break;

		default:
			break;
		}
		return retMap;
	}
	/**
	 * 持续性效果清算，并返回结果
	 * @param singleBattle
	 * @return
	 */
	public static Map<String, Object> buffEffectSettlement(SingleBattle singleBattle){
		int size = singleBattle.getHeroOrder().size();
		List<Map<String, Object>> heros = new ArrayList<Map<String, Object>>();
		Map<String, Object> battleViewInfo = new HashMap<String,Object>();
		if(singleBattle.getMiniRoundAmout()%size==0){
			//清算buff，更新武将数据,发送回合数等
			int hurtA = BattleMath.getBuffEffectValue(singleBattle.getHeroA().getHeroForBattle());
			int hurtB = BattleMath.getBuffEffectValue(singleBattle.getHeroB().getHeroForBattle());
			Map<String, Object> heroA = changeHeroToMapForUpdate(singleBattle.getHeroA().getHeroForBattle(), singleBattle.getLargeRoundAmount(),hurtA);
			Map<String, Object> heroB = changeHeroToMapForUpdate(singleBattle.getHeroB().getHeroForBattle(), singleBattle.getLargeRoundAmount(),hurtB);
			setRoundEndHurtType(singleBattle.getHeroA().getHeroForBattle(), hurtA, heroA);//添加伤害或治疗结果
			setRoundEndHurtType(singleBattle.getHeroB().getHeroForBattle(), hurtB, heroB);//添加伤害或治疗结果
			heros.add(heroA);
			heros.add(heroB);
			battleViewInfo.put("heros", heros);//发送武将信息，用于更新属性，血等
			battleViewInfo.put("round", singleBattle.getLargeRoundAmount());//发送回合数
			BattleMath.buffCleaningForRoundEnd(singleBattle);//清除过期buff
		}else{
			//发送武将数据
			Map<String, Object> heroA = changeHeroToMapForUpdate(singleBattle.getHeroA().getHeroForBattle(), singleBattle.getLargeRoundAmount(),0);
			Map<String, Object> heroB = changeHeroToMapForUpdate(singleBattle.getHeroB().getHeroForBattle(), singleBattle.getLargeRoundAmount(),0);
			setRoundEndHurtType(singleBattle.getHeroA().getHeroForBattle(), 0, heroA);//没有到回合结束，添加伤害或治疗为0的结果
			setRoundEndHurtType(singleBattle.getHeroB().getHeroForBattle(), 0, heroB);//没有到回合结束，添加伤害或治疗为0的结果
			heros.add(heroA);
			heros.add(heroB);
			battleViewInfo.put("heros", heros);//发送武将信息，用于更新属性，血等
			battleViewInfo.put("round", singleBattle.getLargeRoundAmount());//发送回合数
		}
		return battleViewInfo;
	}
	private static Map<String, Object> changeHeroToMapForUpdate(HeroForBattle heroForBattle, int largeRoundNum, int hurt){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("heroForce", (int)(heroForBattle.getHeroForce()*heroForBattle.getHeroForceEffect()<0?0:heroForBattle.getHeroForce()*heroForBattle.getHeroForceEffect()));
		retMap.put("strategy", (int)(heroForBattle.getStrategy()*heroForBattle.getStrategyEffect()<0?0:heroForBattle.getStrategy()*heroForBattle.getStrategyEffect()));
		retMap.put("agility", (int)(heroForBattle.getAgility()*heroForBattle.getAgilityEffect()<0?0:heroForBattle.getAgility()*heroForBattle.getAgilityEffect()));
		retMap.put("physique", (int)(heroForBattle.getPhysique()*heroForBattle.getPhysiqueEffect()<0?0:heroForBattle.getPhysique()*heroForBattle.getPhysiqueEffect()));
		retMap.put("hp", heroForBattle.getHp());
		retMap.put("mp", heroForBattle.getMp());
		List<Map<String, Object>> buffs = BattleProcessAction.changeBuffToMap(heroForBattle.getBuff(), largeRoundNum);
		List<Map<String, Object>> deBuffs = BattleProcessAction.changeBuffToMap(heroForBattle.getDeBuff(), largeRoundNum);
		retMap.put("buffs", buffs);
		retMap.put("deBuffs", deBuffs);
		retMap.put("hurt", hurt);
		return retMap;
	}
	/**
	 * buff清除，用于回合结束
	 * @param singleBattle
	 */
	public static void buffCleaningForRoundEnd(SingleBattle singleBattle){
		HeroForBattle heroA = singleBattle.getHeroA().getHeroForBattle();
		HeroForBattle heroB = singleBattle.getHeroB().getHeroForBattle();
		for(int i=0;i<heroA.getBuff().size();i++){
			BuffObject buffObject = heroA.getBuff().get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getLastTime()<0){
				continue;
			}else if(buffObject.getRemainRound(singleBattle.getLargeRoundAmount())==0){
				removeBuff(i, heroA);
			}
		}
		for(int i=0;i<heroA.getDeBuff().size();i++){
			BuffObject buffObject = heroA.getDeBuff().get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getLastTime()<0){
				continue;
			}else if(buffObject.getRemainRound(singleBattle.getLargeRoundAmount())==0){
				removeDeBuff(i, heroA);
			}
		}
		for(int i=0;i<heroB.getBuff().size();i++){
			BuffObject buffObject = heroB.getBuff().get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getLastTime()<0){
				continue;
			}else if(buffObject.getRemainRound(singleBattle.getLargeRoundAmount())==0){
				removeBuff(i, heroB);
			}
		}
		for(int i=0;i<heroB.getDeBuff().size();i++){
			BuffObject buffObject = heroB.getDeBuff().get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getLastTime()<0){
				continue;
			}else if(buffObject.getRemainRound(singleBattle.getLargeRoundAmount())==0){
				removeDeBuff(i, heroB);
			}
		}
	}
	/**
	 * 按持续时间清除buff,用于清除攻击和被攻击类型的buff
	 * @param heroForBattle
	 * @param buffLastTime
	 */
	public static void deleteBuffByLastTime(HeroForBattle heroForBattle, int buffLastTime){
		List<BuffObject> buffs = heroForBattle.getBuff();
		List<BuffObject> deBuffs = heroForBattle.getDeBuff();
		for(int i=0;i<buffs.size();i++){
			if(buffs.get(i).getStaticHeroSkillLastEffect().getLastTime()==buffLastTime){
				removeBuff(i, heroForBattle);
			}
		}
		for(int i=0;i<deBuffs.size();i++){
			if(deBuffs.get(i).getStaticHeroSkillLastEffect().getLastTime()==buffLastTime){
				removeDeBuff(i, heroForBattle);
			}
		}
	}
	/**
	 * 获取持续性吸收伤害效果
	 * @param heroForBattle
	 * @return
	 */
	public static BuffObject getAbsorbHurt(HeroForBattle heroForBattle){
		for(BuffObject i:heroForBattle.getBuff()){
			if(i.getStaticHeroSkillLastEffect().getType()==BUFF_EFFECT_TYPE_REDUCE_HURT){
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
	public static BuffObject getGod(HeroForBattle heroForBattle){
		for(BuffObject i:heroForBattle.getBuff()){
			if(i.getStaticHeroSkillLastEffect().getType()==BUFF_EFFECT_TYPE_GOD){
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
	public static BuffObject getChaos(HeroForBattle heroForBattle){
		for(BuffObject i:heroForBattle.getDeBuff()){
			if(i.getStaticHeroSkillLastEffect().getType()==BUFF_EFFECT_TYPE_CHAOS){
				return i;
			}
		}
		return null;
	}
	/**
	 * 获取持续性禁言效果
	 * @param heroForBattle
	 * @return
	 */
	public static BuffObject getNoSkill(HeroForBattle heroForBattle){
		for(BuffObject i:heroForBattle.getDeBuff()){
			if(i.getStaticHeroSkillLastEffect().getType()==BUFF_EFFECT_TYPE_NO_SKILL){
				return i;
			}
		}
		return null;
	}
	/**
	 * 返回吸收伤害后，魔法盾的剩余血量
	 * @param heroForBattle
	 * @param buffObject
	 * @param hurt
	 * @return
	 */
	private static int absorbHurt(HeroForBattle heroForBattle, BuffObject buffObject, int hurt){
		hurt+=buffObject.getAbsorbHurt();
		if(hurt>0){
			buffObject.setAbsorbHurt(hurt);
		}else{
			heroForBattle.getBuff().remove(buffObject);
		}
		return hurt;
	}
	/**
	 * 清除buff
	 * @param i
	 * @param heroForBattle
	 */
	private static void removeBuff(int i, HeroForBattle heroForBattle){
		List<BuffObject> buffs = heroForBattle.getBuff();
		if(isPropertyEffect(buffs.get(i).getStaticHeroSkillLastEffect())){
			subtractBuffChangeValue(heroForBattle, buffs.get(i).getStaticHeroSkillLastEffect());//清除buff影响的属性
		}
		buffs.remove(i);
	}
	/**
	 * 清除deBuff
	 * @param i
	 * @param heroForBattle
	 */
	private static void removeDeBuff(int i, HeroForBattle heroForBattle){
		List<BuffObject> buffs = heroForBattle.getDeBuff();
		if(isPropertyEffect(buffs.get(i).getStaticHeroSkillLastEffect())){
			subtractBuffChangeValue(heroForBattle, buffs.get(i).getStaticHeroSkillLastEffect());//清除debuff影响的属性
		}
		buffs.remove(i);
	}
	/**
	 * 获取buff伤害或治疗的影响值，用于每回合结束
	 * @param hero
	 * @return
	 */
	public static int getBuffEffectValue(HeroForBattle hero){
		int heroHurtValue=0;
		for(int i=0;i<hero.getBuff().size();i++){
			BuffObject buffObject = hero.getBuff().get(i);
			heroHurtValue+=buffObject.getHurt();
		}
		for(int i=0;i<hero.getDeBuff().size();i++){
			BuffObject buffObject = hero.getDeBuff().get(i);
			heroHurtValue+=buffObject.getHurt();
		}
		return heroHurtValue;
	}
	/**
	 * 非通用方法，用于获取具体的技能影响结果
	 * @param staticHeroSkill
	 * @param skillHeroObject
	 * @param targetHeroObject
	 * @param singleBattle
	 * @return
	 */
	private static Map<String, Object> enemyResultForSingle(StaticHeroSkill staticHeroSkill, SingleBattleObject skillHeroObject, SingleBattleObject targetHeroObject, SingleBattle singleBattle){
		HeroForBattle skillHero = skillHeroObject.getHeroForBattle();
		HeroForBattle targetHero = targetHeroObject.getHeroForBattle();
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("battleViewType", Const.BATTLE_VIEW_TYPE_SKILL);
		Map<String, Object> battleViewInfo = new HashMap<String,Object>();
		battleViewInfo.put("skillName", staticHeroSkill.getName());
		battleViewInfo.put("skillerAction", skillHero.getHeroActionWeapon()+staticHeroSkill.getHeroAction());
		battleViewInfo.put("skillerAnimation", staticHeroSkill.getAnimationSingle());
		battleViewInfo.put("skillerExpend", staticHeroSkill.getNeedVnp());
		battleViewInfo.put("skillerId", skillHero.getLocationId());
		battleViewInfo.put("targetId", targetHero.getLocationId());
		retMap.put("battleViewInfo", battleViewInfo);
		int targetEffectValue = 0;
		//初始化瞬时的技能持续性效果返回值
		Map<Integer, Integer> effectResultMap = new HashMap<Integer, Integer>();
		effectResultMap.put(BUFF_TARGET_LIMIT_SELF, 0);
		effectResultMap.put(BUFF_TARGET_LIMIT_TARGET, 0);

		BuffObject godBuff = getGod(targetHero);
		retMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_HIT);
		switch (staticHeroSkill.getEffectType()) {
		case EFFECT_TYPE_HURT:
			if(godBuff!=null){//对于伤害类技能，如果目标身上挂有无敌，则直接无效返回
				retMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_GOD);
				return retMap;
			}
			//技能伤害
			targetEffectValue = computeSkillHurtForSingle(staticHeroSkill, skillHero, targetHero);
			//效果伤害
			effectResultMap = computeImmediatelySkillHurt(staticHeroSkill, skillHero, targetHero);
			//攻击技能清除攻击和被攻击buff
			deleteBuffByLastTime(skillHero, BUFF_LAST_TIME_NEXT_ATTACK);
			deleteBuffByLastTime(targetHero, BUFF_LAST_TIME_NEXT_BE_ATTACKED);
			//添加buff
			addBuffResult(staticHeroSkill, skillHeroObject, targetHeroObject, singleBattle.getLargeRoundAmount());
			break;
		case EFFECT_TYPE_CURE:
			//计算技能治疗
			targetEffectValue = computeSkillRecoverForSingle(staticHeroSkill, skillHero, targetHero);
			//计算效果治疗
			effectResultMap = computeImmediatelySkillHurt(staticHeroSkill, skillHero, targetHero);
			//添加buff
			addBuffResult(staticHeroSkill, skillHeroObject, targetHeroObject, singleBattle.getLargeRoundAmount());
			break;
		case EFFECT_TYPE_LAST_SKILL:
			 addBuffResult(staticHeroSkill, skillHeroObject, targetHeroObject, singleBattle.getLargeRoundAmount());
			//属性变化操作
			break;
		case EFFECT_TYPE_LAST_HURT:
			
			addBuffResult(staticHeroSkill, skillHeroObject, targetHeroObject, singleBattle.getLargeRoundAmount());
			break;
		case EFFECT_TYPE_LAST_SPECIAL:
			//目前没有，询问数值处理方式
			addBuffResult(staticHeroSkill, skillHeroObject, targetHeroObject, singleBattle.getLargeRoundAmount());
			break;
		case EFFECT_TYPE_CLEAN:
			//目前没有，询问数值处理方式
			cleanBuff(staticHeroSkill.getEffectValue(), targetHeroObject);
			break;
		case EFFECT_TYPE_DISPEL:
//			battleViewInfo.put("targetEffectValue", hurt);//具体伤害需要公式
			//目前没有，询问数值处理方式
			dispelBuff(staticHeroSkill.getEffectValue(), targetHeroObject);
			break;

		default:
			break;
		}
		//给结果添加伤害或治疗，包括技能自身效果值和附加效果效果值
		if(skillHeroObject.equals(targetHeroObject)){//buff有效果
			//施法目标就是自己，则不管特殊效果是对目标还是对自己影响，都算作对目标的影响,自己的影响变成0
			int effectValue = (int)(targetEffectValue+effectResultMap.get(BUFF_TARGET_LIMIT_TARGET)+effectResultMap.get(BUFF_TARGET_LIMIT_SELF));
			setTargetValueEffect(singleBattle,targetHero, effectValue, battleViewInfo);
			battleViewInfo.put("skillerEffectValue", 0);//因为目标是自己，效果给目标或给自己是一样的，所以，此处都放在目标上，自己为0
			battleViewInfo.put("skillerEffectType", HURT_RESULT_NORMAL);
		}else{
			int targetValue =(int) targetEffectValue+effectResultMap.get(BUFF_TARGET_LIMIT_TARGET);
			int skillerValue = (int)effectResultMap.get(BUFF_TARGET_LIMIT_SELF);
			setTargetValueEffect(singleBattle,targetHero, targetValue, battleViewInfo);
			setSkillerEffect(skillHero, skillerValue, battleViewInfo);
		}
		List<Integer> hpUpdate = new ArrayList<Integer>();
		hpUpdate.add(singleBattle.getHeroA().getHeroForBattle().getHp());
		hpUpdate.add(singleBattle.getHeroB().getHeroForBattle().getHp());
		battleViewInfo.put("hpUpdate", hpUpdate);
		List<Integer> mpUpdate = new ArrayList<Integer>();
		mpUpdate.add(singleBattle.getHeroA().getHeroForBattle().getMp());
		mpUpdate.add(singleBattle.getHeroB().getHeroForBattle().getMp());
		battleViewInfo.put("mpUpdate", mpUpdate);
		
		return retMap;
	}
	/**
	 * 为技能释放结果附加伤害类型，是否吸收，用于技能释放者
	 * @param targetHero
	 * @param effectValue
	 * @param battleViewInfo
	 */
	private static void setSkillerEffect(HeroForBattle targetHero, int effectValue, Map<String, Object> battleViewInfo){
		BuffObject absorbHurtBuff = getAbsorbHurt(targetHero);
		if(effectValue<0&&absorbHurtBuff!=null){
			int hurt = absorbHurt(targetHero, absorbHurtBuff, effectValue);
			if(hurt<0){
				battleViewInfo.put("skillerEffectValue", hurt);
				battleViewInfo.put("skillerEffectType", HURT_RESULT_NORMAL);
				changeHeroHp(targetHero, hurt);//改变目标血量
			}else{
				battleViewInfo.put("skillerEffectValue", effectValue);
				battleViewInfo.put("skillerEffectType", HURT_RESULT_ABSORB);
			}
		}else{
			battleViewInfo.put("skillerEffectValue", effectValue);
			battleViewInfo.put("skillerEffectType", HURT_RESULT_NORMAL);
			changeHeroHp(targetHero, effectValue);//改变目标血量
		}
	}
	/**
	 * 为技能释放结果附加伤害类型，是否吸收，用于目标
	 * @param singleBattle
	 * @param targetHero
	 * @param effectValue
	 * @param battleViewInfo
	 */
	private static void setTargetValueEffect(SingleBattle singleBattle, HeroForBattle targetHero, int effectValue, Map<String, Object> battleViewInfo){
		BuffObject absorbHurtBuff = getAbsorbHurt(targetHero);
		if(effectValue<0){
			if(absorbHurtBuff!=null){
				int hurt = absorbHurt(targetHero, absorbHurtBuff, effectValue);
				if(hurt<0){//有受伤动作
					battleViewInfo.put("targetEffectValue", hurt);
					battleViewInfo.put("targetEffectType", HURT_RESULT_NORMAL);
					changeHeroHp(targetHero, hurt);//改变目标血量
					battleViewInfo.put("targetEffectAction", getDefenceAction(singleBattle,targetHero));
				}else{
					battleViewInfo.put("targetEffectValue", effectValue);
					battleViewInfo.put("targetEffectType", HURT_RESULT_ABSORB);
				}
			}else{//有受伤动作
				battleViewInfo.put("targetEffectValue", effectValue);
				battleViewInfo.put("targetEffectType", HURT_RESULT_NORMAL);
				changeHeroHp(targetHero, effectValue);//改变目标血量
				battleViewInfo.put("targetEffectAction", getDefenceAction(singleBattle,targetHero));
			}
		}else{//没有受伤动作
			battleViewInfo.put("targetEffectValue", effectValue);
			battleViewInfo.put("targetEffectType", HURT_RESULT_NORMAL);
			changeHeroHp(targetHero, effectValue);//改变目标血量
		}
		
	}
	/**
	 * 为普通攻击结果附加伤害类型，是否吸收
	 * @param singleBattle
	 * @param targetHero
	 * @param effectValue
	 * @param battleViewInfo
	 */
	private static void setHurtType(SingleBattle singleBattle,HeroForBattle targetHero, int effectValue, Map<String, Object> battleViewInfo){
		BuffObject absorbHurtBuff = getAbsorbHurt(targetHero);
		if(effectValue<0&&absorbHurtBuff!=null){
			int hurt = absorbHurt(targetHero, absorbHurtBuff, effectValue);
			if(hurt<0){
				battleViewInfo.put("defencePersonHurt", hurt);
				battleViewInfo.put("defencePersonHurtType", HURT_RESULT_NORMAL);
				changeHeroHp(targetHero, hurt);//改变目标血量
				battleViewInfo.put("defencePersonAction", getDefenceAction(singleBattle,targetHero));
			}else{
				battleViewInfo.put("defencePersonHurt", effectValue);
				battleViewInfo.put("defencePersonHurtType", HURT_RESULT_ABSORB);
			}
		}else{
			battleViewInfo.put("defencePersonHurt", effectValue);
			battleViewInfo.put("defencePersonHurtType", HURT_RESULT_NORMAL);
			changeHeroHp(targetHero, effectValue);//改变目标血量
			battleViewInfo.put("defencePersonAction", getDefenceAction(singleBattle,targetHero));
		}
	}
	/**
	 * 为回合结束结果附加伤害类型，是否吸收
	 * @param singleBattle
	 * @param targetHero
	 * @param effectValue
	 * @param battleViewInfo
	 */
	private static void setRoundEndHurtType(HeroForBattle targetHero, int effectValue, Map<String, Object> hero){
		BuffObject absorbHurtBuff = getAbsorbHurt(targetHero);
		if(effectValue<0&&absorbHurtBuff!=null){
			int hurt = absorbHurt(targetHero, absorbHurtBuff, effectValue);
			if(hurt<0){
				hero.put("hurt", hurt);
				hero.put("hurtType", HURT_RESULT_NORMAL);
				if(targetHero.getHp()+hurt>0){
					changeHeroHp(targetHero, hurt);//改变目标血量
				}else{
					changeHeroHp(targetHero, 1-targetHero.getHp());//持续性伤害不能至死，留1滴血
				}
			}else{
				hero.put("hurt", effectValue);
				hero.put("hurtType", HURT_RESULT_ABSORB);
			}
		}else{
			hero.put("hurt", effectValue);
			hero.put("hurtType", HURT_RESULT_NORMAL);
			if(targetHero.getHp()+effectValue>0){
				changeHeroHp(targetHero, effectValue);//改变目标血量
			}else{
				changeHeroHp(targetHero, 1-targetHero.getHp());//持续性伤害不能至死，留1滴血
			}
		}
	}
	private static void changeHeroHp(HeroForBattle heroForBattle, int changeHpAmount){
		int currentHpTarget = heroForBattle.getHp()+changeHpAmount;
		if(currentHpTarget>0){
			heroForBattle.setHp(currentHpTarget>heroForBattle.getHpMax()?heroForBattle.getHpMax():currentHpTarget);
		}else{
			heroForBattle.setHp(0);
		}
	}
	/**
	 * 驱散持续性效果，非通用
	 * @param cleanAmount
	 * @param targetHeroObject
	 */
	private static void dispelBuff(int cleanAmount, SingleBattleObject targetHeroObject){
		int hasClean = 0;
		List<BuffObject> buffs = targetHeroObject.getHeroForBattle().getBuff();
		for(int i=0;i<buffs.size();i++){
			BuffObject buffObject = buffs.get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getDispelable()==CAN_CLEAN){
				if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，删掉时需要恢复属性影响
					subtractBuffChangeValue(targetHeroObject.getHeroForBattle(), buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
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
	 * 净化持续性效果，非通用
	 * @param cleanAmount
	 * @param targetHeroObject
	 */
	private static void cleanBuff(int cleanAmount, SingleBattleObject targetHeroObject){
		int hasClean = 0;
		List<BuffObject> debuffs = targetHeroObject.getHeroForBattle().getDeBuff();
		for(int i=0;i<debuffs.size();i++){
			BuffObject buffObject = debuffs.get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getDispelable()==CAN_CLEAN){
				if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，删掉时需要恢复属性影响
					subtractBuffChangeValue(targetHeroObject.getHeroForBattle(), buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
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
	 * 非通用方法，计算瞬时效果影响值
	 * @param staticHeroSkill
	 * @param skillHero
	 * @param targetHero
	 * @return
	 */
	private static Map<Integer, Integer> computeImmediatelySkillHurt(StaticHeroSkill staticHeroSkill, HeroForBattle skillHero, HeroForBattle targetHero){
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
		Map<Integer, Integer> effectResultMap = new HashMap<Integer,Integer>();
		int targetHurt = 0;
		int selfHurt = 0;
		for(StaticHeroSkillLastEffect i:effects){
			if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				if(i.getType()==BUFF_EFFECT_TYPE_LAST_HURT){
					selfHurt+=computeLastSkillHurtForSingle(i, skillHero, targetHero);
				}else if(i.getType()==BUFF_EFFECT_TYPE_LAST_CURE){
					selfHurt+=computeLastSkillRecoverForSingle(i, skillHero, targetHero);
				}
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				if(i.getType()==BUFF_EFFECT_TYPE_LAST_HURT){
					targetHurt+=computeLastSkillHurtForSingle(i, skillHero, targetHero);
				}else if(i.getType()==BUFF_EFFECT_TYPE_LAST_CURE){
					targetHurt+=computeLastSkillRecoverForSingle(i, skillHero, targetHero);
				}
			}
		}
		effectResultMap.put(BUFF_TARGET_LIMIT_TARGET, targetHurt);
		effectResultMap.put(BUFF_TARGET_LIMIT_SELF, selfHurt);
		return effectResultMap;
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
		if(staticHeroSkillLastEffect.getLastTime()!=BUFF_LAST_TIME_IMMEDIATELY){
			return false;
		}
		return true;
	}
	/**
	 * 为目标添加持续性效果
	 * @param staticHeroSkill
	 * @param skillHeroObject
	 * @param targetHeroObject
	 * @param largeRoundNum
	 */
	private static void addBuffResult(StaticHeroSkill staticHeroSkill, SingleBattleObject skillHeroObject, SingleBattleObject targetHeroObject, int largeRoundNum){
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
			 buffEffect(i, skillHeroObject, targetHeroObject, largeRoundNum);//添加
		}
	}
	/**
	 * 非通用方法，按buff类别添加buff影响
	 * @param i
	 * @param skillHeroObject
	 * @param targetHeroObject
	 * @param largeRoundNum
	 */
	private static void buffEffect(StaticHeroSkillLastEffect i, SingleBattleObject skillHeroObject, SingleBattleObject targetHeroObject, int largeRoundNum){
		BuffObject godBuff = getGod(targetHeroObject.getHeroForBattle());
		switch (i.getType()) {
		
		case BUFF_EFFECT_TYPE_LAST_HURT:
			if(godBuff!=null){
				break;
			}
			if(i.getLastTime()==BUFF_LAST_TIME_IMMEDIATELY){
				break;
//				hurt+=computeLastSkillHurt(i, skillHeroObject.getHeroForBattle(), targetHeroObject.getHeroForBattle());
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				int value = computeLastSkillHurtForSingle(i, skillHeroObject.getHeroForBattle(), targetHeroObject.getHeroForBattle());
				addDeBuff(targetHeroObject, i, largeRoundNum,value);
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				int value = computeLastSkillHurtForSingle(i, skillHeroObject.getHeroForBattle(), targetHeroObject.getHeroForBattle());
				addDeBuff(skillHeroObject, i, largeRoundNum,value);
			}
			
			break;
		case BUFF_EFFECT_TYPE_LAST_CURE:
			if(i.getLastTime()==BUFF_LAST_TIME_IMMEDIATELY){
				break;
//				hurt+=computeLastSkillRecover(i, skillHeroObject.getHeroForBattle(), targetHeroObject.getHeroForBattle());
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				int value = computeLastSkillRecoverForSingle(i, skillHeroObject.getHeroForBattle(), targetHeroObject.getHeroForBattle());
				addBuff(targetHeroObject, i, largeRoundNum,value);
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				int value = computeLastSkillRecoverForSingle(i, skillHeroObject.getHeroForBattle(), targetHeroObject.getHeroForBattle());
				addBuff(skillHeroObject, i, largeRoundNum,value);
			}
			break;
		case BUFF_EFFECT_TYPE_UP_PROPERTY:
			if(i.getLastTime()==BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				addBuff(targetHeroObject, i, largeRoundNum,0);//0为没有伤害和治疗效果
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				addBuff(skillHeroObject, i, largeRoundNum,0);
			}
			break;
		case BUFF_EFFECT_TYPE_DOWN_PROPERTY:
			if(godBuff!=null){
				break;
			}
			if(i.getLastTime()==BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				addDeBuff(targetHeroObject, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				addDeBuff(skillHeroObject, i, largeRoundNum,0);
			}
			break;
		case BUFF_EFFECT_TYPE_CLEAN:
			cleanBuff(i.getValue(), targetHeroObject);
			//净化
			break;
		case BUFF_EFFECT_TYPE_DISPEL:
			dispelBuff(i.getValue(), targetHeroObject);
			//驱散
			break;
		case BUFF_EFFECT_TYPE_CHAOS:
			if(godBuff!=null){
				break;
			}
			if(i.getLastTime()==BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				addDeBuff(targetHeroObject, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				addDeBuff(skillHeroObject, i, largeRoundNum,0);
			}
			break;
		case BUFF_EFFECT_TYPE_NO_SKILL:
			if(godBuff!=null){
				break;
			}
			if(i.getLastTime()==BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				addDeBuff(targetHeroObject, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				addDeBuff(skillHeroObject, i, largeRoundNum,0);
			}
			break;
		case BUFF_EFFECT_TYPE_REDUCE_HURT:
			if(i.getLastTime()==BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				addBuff(targetHeroObject, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				addBuff(skillHeroObject, i, largeRoundNum,0);
			}
			break;
		case BUFF_EFFECT_TYPE_GOD:
			if(i.getLastTime()==BUFF_LAST_TIME_IMMEDIATELY){
				break;
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_TARGET){
				removeAllDeBuff(targetHeroObject.getHeroForBattle());//清除所有debuff
				addBuff(targetHeroObject, i, largeRoundNum,0);
			}else if(i.getTargetLimit()==BUFF_TARGET_LIMIT_SELF){
				removeAllDeBuff(skillHeroObject.getHeroForBattle());//清除所有debuff
				addBuff(skillHeroObject, i, largeRoundNum,0);
			}
			break;

		default:
			break;
		}
//		return hurt;
	}
	/**
	 * 清除所有减益buff
	 * @param heroForBattle
	 */
	private static void removeAllDeBuff(HeroForBattle heroForBattle){
		heroForBattle.getDeBuff().removeAll(heroForBattle.getDeBuff());
	}
	private static void addBuff(SingleBattleObject targetHeroObject, StaticHeroSkillLastEffect staticHeroSkillLastEffect, int largeRoundNum, int hurt){
		List<BuffObject> buffs = targetHeroObject.getHeroForBattle().getBuff();
		BuffObject newBuff = new BuffObject(largeRoundNum, staticHeroSkillLastEffect,hurt);
		//同类型顶掉
		for(int i=0;i<buffs.size();i++){
			BuffObject buffObject = buffs.get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getCoexistType()==staticHeroSkillLastEffect.getCoexistType()){
				if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，顶掉时需要恢复属性影响
					subtractBuffChangeValue(targetHeroObject.getHeroForBattle(), buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
				}
				if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
					addBuffChangeValue(targetHeroObject.getHeroForBattle(), staticHeroSkillLastEffect);//添加buff
				}
				buffs.set(i, newBuff);
				return;
			}
		}
		//不存在同类型
		if(buffs.size()<MAX_BUFF_AMOUNT){
			if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
				addBuffChangeValue(targetHeroObject.getHeroForBattle(), staticHeroSkillLastEffect);//添加buff
			}
			buffs.add(newBuff);
		}else{
			BuffObject buffObject = buffs.get(0);
			if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，顶掉时需要恢复属性影响
				subtractBuffChangeValue(targetHeroObject.getHeroForBattle(), buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
			}
			if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
				addBuffChangeValue(targetHeroObject.getHeroForBattle(), staticHeroSkillLastEffect);//添加buff
			}
			buffs.remove(0);
			buffs.add(newBuff);
		}
		
	}
	/**
	 * 非通用方法，查看是否是影响属性的buff
	 * @param staticHeroSkillLastEffect
	 * @return
	 */
	private static boolean isPropertyEffect(StaticHeroSkillLastEffect staticHeroSkillLastEffect){
		if(staticHeroSkillLastEffect.getType()==BUFF_EFFECT_TYPE_UP_PROPERTY||staticHeroSkillLastEffect.getType()==BUFF_EFFECT_TYPE_DOWN_PROPERTY){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 添加deBuff
	 * @param targetHeroObject
	 * @param staticHeroSkillLastEffect
	 * @param largeRoundNum
	 * @param hurt
	 */
	private static void addDeBuff(SingleBattleObject targetHeroObject, StaticHeroSkillLastEffect staticHeroSkillLastEffect, int largeRoundNum, int hurt){
		List<BuffObject> deBuffs = targetHeroObject.getHeroForBattle().getDeBuff();
		BuffObject newDeBuff = new BuffObject(largeRoundNum, staticHeroSkillLastEffect,hurt);
		//同类型顶掉
		for(int i=0;i<deBuffs.size();i++){
			BuffObject buffObject = deBuffs.get(i);
			if(buffObject.getStaticHeroSkillLastEffect().getCoexistType()==staticHeroSkillLastEffect.getCoexistType()){
				if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，顶掉时需要恢复属性影响
					subtractBuffChangeValue(targetHeroObject.getHeroForBattle(), buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
				}
				if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
					addBuffChangeValue(targetHeroObject.getHeroForBattle(), staticHeroSkillLastEffect);//添加buff
				}
				deBuffs.set(i, newDeBuff);
				return;
			}
		}
		//不存在同类型
		if(deBuffs.size()<MAX_BUFF_AMOUNT){
			if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
				addBuffChangeValue(targetHeroObject.getHeroForBattle(), staticHeroSkillLastEffect);//添加buff
			}
			deBuffs.add(newDeBuff);
		}else{
			BuffObject buffObject = deBuffs.get(0);
			if(isPropertyEffect(buffObject.getStaticHeroSkillLastEffect())){//老buff是属性影响，顶掉时需要恢复属性影响
				subtractBuffChangeValue(targetHeroObject.getHeroForBattle(), buffObject.getStaticHeroSkillLastEffect());//去掉相同的buff
			}
			if(isPropertyEffect(staticHeroSkillLastEffect)){//新buff是属性影响，顶掉时需要增加属性影响
				addBuffChangeValue(targetHeroObject.getHeroForBattle(), staticHeroSkillLastEffect);//添加buff
			}
			deBuffs.remove(0);
			deBuffs.add(newDeBuff);
		}
			
	}
	
	/**
	 * 计算技能伤害值
	 * @param staticHeroSkill
	 * @param skillHero
	 * @param targetHero
	 * @return
	 */
	private static int computeSkillHurtForSingle(StaticHeroSkill staticHeroSkill, HeroForBattle skillHero, HeroForBattle targetHero){
		if(staticHeroSkill.getEffectMode()==SKILL_MODE_VALUE){
			return -(int)(staticHeroSkill.getEffectValue()/SINGLE_HURT_FACTOR);
		}else if(staticHeroSkill.getEffectMode()==SKILL_MODE_PERCENT){
			return -targetHero.getHp()*staticHeroSkill.getEffectValue()/100;
		}else{
			return 0;
		}
	}
	/**
	 * 计算持续性效果伤害值
	 * @param staticHeroSkillLastEffect
	 * @param skillHero
	 * @param targetHero
	 * @return
	 */
	private static int computeLastSkillHurtForSingle(StaticHeroSkillLastEffect staticHeroSkillLastEffect, HeroForBattle skillHero, HeroForBattle targetHero){
		int lastTime = staticHeroSkillLastEffect.getLastTime();
		if(staticHeroSkillLastEffect.getMode()==SKILL_MODE_VALUE){
			return -(int)(staticHeroSkillLastEffect.getValue()/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
		}else if(staticHeroSkillLastEffect.getMode()==SKILL_MODE_PERCENT){
			return -targetHero.getHp()*staticHeroSkillLastEffect.getValue()/100/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
		}else if(staticHeroSkillLastEffect.getMode()==SKILL_MODE_HERO_PROPERTY){
			switch(staticHeroSkillLastEffect.getValue()){
			case SKILL_MODE_HERO_PROPERTY_FORCE:
				double heroForce = skillHero.getHeroForce()*skillHero.getHeroForceEffect()<0?0:skillHero.getHeroForce()*skillHero.getHeroForceEffect();
				return -(int)(heroForce/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
			case SKILL_MODE_HERO_PROPERTY_STRATEGY:
				double strategy = skillHero.getStrategy()*skillHero.getStrategyEffect()<0?0:skillHero.getStrategy()*skillHero.getStrategyEffect();
				return -(int)(strategy/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
			case SKILL_MODE_HERO_PROPERTY_AGILITY:
				double agility = skillHero.getAgility()*skillHero.getAgilityEffect()<0?0:skillHero.getAgility()*skillHero.getAgilityEffect();
				return -(int)(agility/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
			case SKILL_MODE_HERO_PROPERTY_PHYSIQUE:
				double physique = skillHero.getPhysique()*skillHero.getPhysiqueEffect()<0?0:skillHero.getPhysique()*skillHero.getPhysiqueEffect();
				return -(int)(physique/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
			default:
				return 0;
			}
		}
		else{
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
	private static int computeSkillRecoverForSingle(StaticHeroSkill staticHeroSkill, HeroForBattle skillHero, HeroForBattle targetHero){
		if(staticHeroSkill.getEffectMode()==SKILL_MODE_VALUE){
			
			return (int)(staticHeroSkill.getEffectValue()/SINGLE_HURT_FACTOR);
		}else if(staticHeroSkill.getEffectMode()==SKILL_MODE_PERCENT){
			return staticHeroSkill.getEffectValue()*targetHero.getHpMax()/100;
		}else{
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
	private static int computeLastSkillRecoverForSingle(StaticHeroSkillLastEffect staticHeroSkillLastEffect, HeroForBattle skillHero, HeroForBattle targetHero){
		int lastTime = staticHeroSkillLastEffect.getLastTime();
		if(staticHeroSkillLastEffect.getMode()==SKILL_MODE_VALUE){
			return (int)(staticHeroSkillLastEffect.getValue()/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
		}else if(staticHeroSkillLastEffect.getMode()==SKILL_MODE_PERCENT){
			return targetHero.getHpMax()*staticHeroSkillLastEffect.getValue()/100/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime);
		}else if(staticHeroSkillLastEffect.getMode()==SKILL_MODE_HERO_PROPERTY){
			switch(staticHeroSkillLastEffect.getValue()){
			case SKILL_MODE_HERO_PROPERTY_FORCE:
				double heroForce = skillHero.getHeroForce()*skillHero.getHeroForceEffect()<0?0:skillHero.getHeroForce()*skillHero.getHeroForceEffect();
				return (int)(heroForce/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
			case SKILL_MODE_HERO_PROPERTY_STRATEGY:
				double strategy = skillHero.getStrategy()*skillHero.getStrategyEffect()<0?0:skillHero.getStrategy()*skillHero.getStrategyEffect();
				return (int)(strategy/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
			case SKILL_MODE_HERO_PROPERTY_AGILITY:
				double agility = skillHero.getAgility()*skillHero.getAgilityEffect()<0?0:skillHero.getAgility()*skillHero.getAgilityEffect();
				return (int)(agility/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
			case SKILL_MODE_HERO_PROPERTY_PHYSIQUE:
				double physique = skillHero.getPhysique()*skillHero.getPhysiqueEffect()<0?0:skillHero.getPhysique()*skillHero.getPhysiqueEffect();
				return (int)(physique/(lastTime==BUFF_LAST_TIME_IMMEDIATELY?1:lastTime)/SINGLE_HURT_FACTOR);
			default:
				return 0;
			}
		}
		else{
			return 0;
		}
	}
	//////////////////普通攻击////////////////////////////////////////////
	/**
	 * 普通攻击操作(玩家和电脑通用)
	 * @param singleBattle
	 * @return
	 */
	public static Map<String, Object> commonAttackForSingleBattle(SingleBattle singleBattle){
		HeroForBattle attack = singleBattle.getOperateHero().getHeroForBattle();
		HeroForBattle defence = singleBattle.getTargetHero().getHeroForBattle();
		Map<String, Object> dataMap = new HashMap<String,Object>();
		dataMap.put("battleViewType", Const.BATTLE_VIEW_TYPE_NORMAL);
		Map<String, Object> battleViewInfo = new HashMap<String,Object>();
		battleViewInfo.put("attackPersonAction", attack.getHeroActionWeapon()+BattleProcess.BATTLE_ACTION_ATTACK_STRING);
		battleViewInfo.put("attackPersonId", attack.getLocationId());
		battleViewInfo.put("defencePersonId", defence.getLocationId());
		dataMap.put("battleViewInfo", battleViewInfo);
		//清除攻击下次攻击buff
		deleteBuffByLastTime(singleBattle.getOperateHero().getHeroForBattle(), BUFF_LAST_TIME_NEXT_ATTACK);
		if(getGod(singleBattle.getTargetHero().getHeroForBattle())!=null){
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_GOD);
			return dataMap;
		}
		if(!BattleMath.isHit(attack)){
			//未命中
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_MISS);
			//return结果
			return dataMap;
		}
		if(BattleMath.isMiss(attack)){
			//闪避
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_DODGE);
			//return结果
			return dataMap;
		}
		if(BattleMath.isCriticalStrike(attack)){
			//暴击
			int hurt = BattleMath.criticalHurtValue(attack, defence);
			//扣伤害
//			battleViewInfo.put("defencePersonHurt", -hurt);
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_CRITICAL);
			setHurtType(singleBattle,defence, -hurt, battleViewInfo);
			//清除攻击
			deleteBuffByLastTime(singleBattle.getTargetHero().getHeroForBattle(), BUFF_LAST_TIME_NEXT_BE_ATTACKED);
			List<Integer> hpUpdate = new ArrayList<Integer>();
			hpUpdate.add(singleBattle.getHeroA().getHeroForBattle().getHp());
			hpUpdate.add(singleBattle.getHeroB().getHeroForBattle().getHp());
			battleViewInfo.put("hpUpdate", hpUpdate);
			//return结果
			return dataMap;
		}else{
			int hurt = BattleMath.hurtValue(attack, defence);
			//扣伤害
			dataMap.put("battleViewResult", Const.BATTLE_VIEW_RESULT_HIT);
			setHurtType(singleBattle,defence, -hurt, battleViewInfo);
			//清除攻击
			deleteBuffByLastTime(singleBattle.getTargetHero().getHeroForBattle(), BUFF_LAST_TIME_NEXT_BE_ATTACKED);
			List<Integer> hpUpdate = new ArrayList<Integer>();
			hpUpdate.add(singleBattle.getHeroA().getHeroForBattle().getHp());
			hpUpdate.add(singleBattle.getHeroB().getHeroForBattle().getHp());
			battleViewInfo.put("hpUpdate", hpUpdate);
			//return结果
//			dataMap.put("testHp", singleBattle.getHeroA().getHeroForBattle().getHp());
			return dataMap;
		}
	}
	/**
	 * 加buff并改变属性
	 * @param heroForBattle
	 * @param buff
	 */
	public static void addBuffChangeValue(HeroForBattle heroForBattle, StaticHeroSkillLastEffect buff){
		if(buff.getMode()==SKILL_MODE_VALUE){
			//改变武将属性
			heroForBattle.setHeroForce(heroForBattle.getHeroForce()+buff.getHeroForce());
			heroForBattle.setAgility(heroForBattle.getAgility()+buff.getAgility());
			heroForBattle.setStrategy(heroForBattle.getStrategy()+buff.getStrategy());
			heroForBattle.setPhysique(heroForBattle.getPhysique()+buff.getPhysique());
			
			heroForBattle.setAttack(heroForBattle.getAttack()+buff.getHeroForce()*heroForBattle.getHeroForceEffect()+buff.getAtk());
			heroForBattle.setDefence(heroForBattle.getDefence()+buff.getPhysique()*heroForBattle.getPhysiqueEffect()+buff.getDef());
			heroForBattle.setDodge(heroForBattle.getDodge()+buff.getAgility()*.2*heroForBattle.getAgilityEffect()+buff.getDodge());
			heroForBattle.setHit(heroForBattle.getHit()+buff.getAgility()*heroForBattle.getAgilityEffect()+buff.getHit());
			heroForBattle.setCriticalStrike(heroForBattle.getCriticalStrike()+buff.getHeroForce()*.1*heroForBattle.getHeroForceEffect()+buff.getCrit());
			heroForBattle.setMobility(heroForBattle.getMobility()+buff.getAgility()/24*heroForBattle.getAgilityEffect()+buff.getMobility());
		}else if(buff.getMode()==SKILL_MODE_PERCENT){
			double addForce = buff.getHeroForce()/100;
			double addAgility = buff.getAgility()/100;
			double addStrategy = buff.getStrategy()/100;
			double addPhysique = buff.getPhysique()/100;
			//改变武将属性影响率
			heroForBattle.setHeroForceEffect(heroForBattle.getHeroForceEffect()+addForce);
			heroForBattle.setAgilityEffect(heroForBattle.getAgilityEffect()+addAgility);
			heroForBattle.setStrategyEffect(heroForBattle.getStrategyEffect()+addStrategy);
			heroForBattle.setPhysiqueEffect(heroForBattle.getPhysiqueEffect()+addPhysique);
			//转化为二级属性
			heroForBattle.setAttack(heroForBattle.getAttack()+heroForBattle.getHeroForce()*addForce);
			heroForBattle.setDefence(heroForBattle.getDefence()+heroForBattle.getPhysique()*addPhysique);
			heroForBattle.setDodge(heroForBattle.getDodge()+heroForBattle.getAgility()*.2*addAgility);
			heroForBattle.setHit(heroForBattle.getHit()+heroForBattle.getAgility()*addAgility);
			heroForBattle.setCriticalStrike(heroForBattle.getCriticalStrike()+heroForBattle.getHeroForce()*.1*addForce);
			heroForBattle.setMobility(heroForBattle.getMobility()+heroForBattle.getAgility()/24*addAgility);
			
			heroForBattle.setAttackEffect(heroForBattle.getAttackEffect()+buff.getAtk()/100);
			heroForBattle.setDefenceEffect(heroForBattle.getDefenceEffect()+buff.getDef()/100);
			heroForBattle.setDodgeEffect(heroForBattle.getDodgeEffect()+buff.getDodge()/100);
			heroForBattle.setHitEffect(heroForBattle.getHitEffect()+buff.getHit()/100);
			heroForBattle.setCriticalStrikeEffect(heroForBattle.getCriticalStrikeEffect()+buff.getCrit()/100);
			heroForBattle.setMobilityEffect(heroForBattle.getMobilityEffect()+buff.getMobility()/100);
			
		}
	}
	/**
	 * 减buff并改变属性
	 * @param heroForBattle
	 * @param buff
	 */
	public static void subtractBuffChangeValue(HeroForBattle heroForBattle, StaticHeroSkillLastEffect buff){
		if(buff.getMode()==SKILL_MODE_VALUE){
			//改变武将属性
			heroForBattle.setHeroForce(heroForBattle.getHeroForce()-buff.getHeroForce());
			heroForBattle.setAgility(heroForBattle.getAgility()-buff.getAgility());
			heroForBattle.setStrategy(heroForBattle.getStrategy()-buff.getStrategy());
			heroForBattle.setPhysique(heroForBattle.getPhysique()-buff.getPhysique());
			
			heroForBattle.setAttack(heroForBattle.getAttack()-buff.getHeroForce()*heroForBattle.getHeroForceEffect()-buff.getAtk());
			heroForBattle.setDefence(heroForBattle.getDefence()-buff.getPhysique()*heroForBattle.getPhysiqueEffect()-buff.getDef());
			heroForBattle.setDodge(heroForBattle.getDodge()-buff.getAgility()*.2*heroForBattle.getAgilityEffect()-buff.getDodge());
			heroForBattle.setHit(heroForBattle.getHit()-buff.getAgility()*heroForBattle.getAgilityEffect()-buff.getHit());
			heroForBattle.setCriticalStrike(heroForBattle.getCriticalStrike()-buff.getHeroForce()*.1*heroForBattle.getHeroForceEffect()-buff.getCrit());
			heroForBattle.setMobility(heroForBattle.getMobility()-buff.getAgility()/24*heroForBattle.getAgilityEffect()-buff.getMobility());
		}else if(buff.getMode()==SKILL_MODE_PERCENT){
			double addForce = buff.getHeroForce()/100;
			double addAgility = buff.getAgility()/100;
			double addStrategy = buff.getStrategy()/100;
			double addPhysique = buff.getPhysique()/100;
			//改变武将属性影响率
			heroForBattle.setHeroForceEffect(heroForBattle.getHeroForceEffect()-addForce);
			heroForBattle.setAgilityEffect(heroForBattle.getAgilityEffect()-addAgility);
			heroForBattle.setStrategyEffect(heroForBattle.getStrategyEffect()-addStrategy);
			heroForBattle.setPhysiqueEffect(heroForBattle.getPhysiqueEffect()-addPhysique);
			//转化为二级属性
			heroForBattle.setAttack(heroForBattle.getAttack()-heroForBattle.getHeroForce()*addForce);
			heroForBattle.setDefence(heroForBattle.getDefence()-heroForBattle.getPhysique()*addPhysique);
			heroForBattle.setDodge(heroForBattle.getDodge()-heroForBattle.getAgility()*.2*addAgility);
			heroForBattle.setHit(heroForBattle.getHit()-heroForBattle.getAgility()*addAgility);
			heroForBattle.setCriticalStrike(heroForBattle.getCriticalStrike()-heroForBattle.getHeroForce()*.1*addForce);
			heroForBattle.setMobility(heroForBattle.getMobility()-heroForBattle.getAgility()/24*addAgility);
			
			heroForBattle.setAttackEffect(heroForBattle.getAttackEffect()-buff.getAtk()/100);
			heroForBattle.setDefenceEffect(heroForBattle.getDefenceEffect()-buff.getDef()/100);
			heroForBattle.setDodgeEffect(heroForBattle.getDodgeEffect()-buff.getDodge()/100);
			heroForBattle.setHitEffect(heroForBattle.getHitEffect()-buff.getHit()/100);
			heroForBattle.setCriticalStrikeEffect(heroForBattle.getCriticalStrikeEffect()-buff.getCrit()/100);
			heroForBattle.setMobilityEffect(heroForBattle.getMobilityEffect()-buff.getMobility()/100);
			
		}
	}
	/**
	 * 获取被攻击方动作，是失败还是受伤
	 * @param singleBattle
	 * @param heroForBattle
	 * @return
	 */
	private static String getDefenceAction(SingleBattle singleBattle, HeroForBattle heroForBattle){
		if(heroForBattle.getHp()==0){
			singleBattle.getLocationMap().get(heroForBattle.getLocationId()^1).setWin(true);
			return heroForBattle.getHeroActionWeapon()+BattleProcess.BATTLE_ACTION_LOSE_STRING;
		}else{
			return heroForBattle.getHeroActionWeapon()+BattleProcess.BATTLE_ACTION_INJURED_STRING;
		}
	}
	
	/*****************野怪AI处理**************************************/
	public static final int ROUND_NUM = 1;
	public static final int FRIEND_HP = 2;
	public static final int ENEMY_DEBUFF = 3;
	public static final int FRIEND_DEBUFF_CAN_CLEAN = 4;
	public static final int ENEMY_BUFF_CAN_DISPEL = 5;
	public static final int MY_MP = 6;
	public static final int FRIEND_SOLDIER_AMOUNT = 7;
	public static final int RANDOM_NUM = 8;
	
	public static final int CONDITION_TYPE_NUM = 1;
	public static final int CONDITION_TYPE_PERCENT = 2;
	public static final int CONDITION_TYPE_SPECIAL = 3;

	public static final int ACTION_SKILL = 1;
	public static final int ACTION_ATTACK = 2;
	public static final int ACTION_ESCAPE = 3;
	public static final int ACTION_DEFENCE = 4;
	
	
	private static final Random rand = new Random();
	
	/**
	 * 执行单挑AI
	 * @param singleBattle
	 * @return
	 */
	public static Map<String, Object> singleBattleForAi(SingleBattle singleBattle){
		List<StaticEnemyAi> selectAis = new ArrayList<StaticEnemyAi>();
		for(StaticEnemyAi i:singleBattle.getOperateHero().getAi()){//获取AI，并筛选符合条件的AI
			StaticEnemyAi staticEnemyAi= selectAi(singleBattle, i);
			if(staticEnemyAi!=null){
				selectAis.add(staticEnemyAi);
			}
		}
		StaticEnemyAi ai;
		if(selectAis.isEmpty()){//没有符合条件的AI，执行普通攻击操作
			return commonAttackForSingleBattle(singleBattle);
		}else{//有符合的，随机抽取一个
			int size = selectAis.size();
			ai = selectAis.get(rand.nextInt(size));
		}
		return processAi(singleBattle, ai);//执行AI
	}
	/**
	 * 非通用方法，选择符合条件的AI
	 * @param singleBattle
	 * @param staticEnemyAi
	 * @return
	 */
	private static StaticEnemyAi selectAi(SingleBattle singleBattle, StaticEnemyAi staticEnemyAi){
		switch (staticEnemyAi.getCondition()) {
		case ROUND_NUM:
			
			return selectRoundNum(singleBattle, staticEnemyAi);
			
		case FRIEND_HP:
			
			return selectFriendHp(singleBattle, staticEnemyAi);
			
		case ENEMY_DEBUFF:
			
			return selectEnemyDebuff(singleBattle, staticEnemyAi);
			
		case FRIEND_DEBUFF_CAN_CLEAN:
			
			return selectFriendDebuffCanClean(singleBattle, staticEnemyAi);

		case ENEMY_BUFF_CAN_DISPEL:
			
			return selectEnemybuffCanDispel(singleBattle, staticEnemyAi);
			
		case MY_MP:
			
			return selectMyMp(singleBattle, staticEnemyAi);
			
		case FRIEND_SOLDIER_AMOUNT:
			
			return null;
			
		case RANDOM_NUM:
			
			return null;

		default:
			return null;
		}
	}
	/**
	 * 非通用方法，按回合数选择
	 * @param singleBattle
	 * @param staticEnemyAi
	 * @return
	 */
	private static StaticEnemyAi selectRoundNum(SingleBattle singleBattle, StaticEnemyAi staticEnemyAi){
		if(staticEnemyAi.getConditionType()!=CONDITION_TYPE_NUM){
			logger.error("StaticEnemyAi condition error, condition now is roundNum,and conditionType is not num");
			return null;
		}
		int conditionValue = Integer.parseInt(staticEnemyAi.getConditionValue());
		if(singleBattle.getLargeRoundAmount() ==conditionValue){
			return staticEnemyAi;
		}
		return null;
	}
	/**
	 * 非通用方法，按友方血值选择
	 * @param singleBattle
	 * @param staticEnemyAi
	 * @return
	 */
	private static StaticEnemyAi selectFriendHp(SingleBattle singleBattle, StaticEnemyAi staticEnemyAi){
		if(staticEnemyAi.getConditionType()==CONDITION_TYPE_SPECIAL){
			logger.error("StaticEnemyAi condition error, condition now is friendHp,and conditionType is special");
			return null;
		}
		int conditionValue = Integer.parseInt(staticEnemyAi.getConditionValue());
		if(staticEnemyAi.getConditionType()==CONDITION_TYPE_NUM){
			if(singleBattle.getOperateHero().getHeroForBattle().getHp()<=conditionValue){
				return staticEnemyAi;
			}
		}else if(staticEnemyAi.getConditionType()==CONDITION_TYPE_PERCENT){
			double percent = singleBattle.getOperateHero().getHeroForBattle().getHp()*100/singleBattle.getOperateHero().getHeroForBattle().getHpMax();
			if(percent<=conditionValue){
				return staticEnemyAi;
			}
		}
		return null;
	}
	/**
	 * 非通用方法，按敌方debuff选择
	 * @param singleBattle
	 * @param staticEnemyAi
	 * @return
	 */
	private static StaticEnemyAi selectEnemyDebuff(SingleBattle singleBattle, StaticEnemyAi staticEnemyAi){
		if(staticEnemyAi.getConditionType()!=CONDITION_TYPE_SPECIAL){
			logger.error("StaticEnemyAi condition error, condition now is enemyDebuff,and conditionType is not special");
			return null;
		}
		String conditionValue = staticEnemyAi.getConditionValue();
		for(BuffObject i :singleBattle.getTargetHero().getHeroForBattle().getDeBuff()){
			if(i.getStaticHeroSkillLastEffect().getEffectNo().equals(conditionValue)){
				return staticEnemyAi;
			}
		}
		return null;
	}
	/**
	 * 非通用方法，按友方有可净化deBuff选择
	 * @param singleBattle
	 * @param staticEnemyAi
	 * @return
	 */
	private static StaticEnemyAi selectFriendDebuffCanClean(SingleBattle singleBattle, StaticEnemyAi staticEnemyAi){
		for(BuffObject i :singleBattle.getOperateHero().getHeroForBattle().getDeBuff()){
			if(i.getStaticHeroSkillLastEffect().getDispelable()==CAN_CLEAN){
				return staticEnemyAi;
			}
		}
		return null;
	}
	/**
	 * 非通用方法，按敌方有可驱散buff选择
	 * @param singleBattle
	 * @param staticEnemyAi
	 * @return
	 */
	private static StaticEnemyAi selectEnemybuffCanDispel(SingleBattle singleBattle, StaticEnemyAi staticEnemyAi){
		for(BuffObject i :singleBattle.getOperateHero().getHeroForBattle().getBuff()){
			if(i.getStaticHeroSkillLastEffect().getDispelable()==CAN_CLEAN){
				return staticEnemyAi;
			}
		}
		return null;
	}
	/**
	 * 非通用方法，按自己的mp选择
	 * @param singleBattle
	 * @param staticEnemyAi
	 * @return
	 */
	private static StaticEnemyAi selectMyMp(SingleBattle singleBattle, StaticEnemyAi staticEnemyAi){
		if(staticEnemyAi.getConditionType()==CONDITION_TYPE_SPECIAL){
			logger.error("StaticEnemyAi condition error, condition now is myMp,and conditionType is special");
			return null;
		}
		int conditionValue = Integer.parseInt(staticEnemyAi.getConditionValue());
		if(staticEnemyAi.getConditionType()==CONDITION_TYPE_NUM){
			if(singleBattle.getOperateHero().getHeroForBattle().getMp()<=conditionValue){
				return staticEnemyAi;
			}
		}else if(staticEnemyAi.getConditionType()==CONDITION_TYPE_PERCENT){
			double percent = singleBattle.getOperateHero().getHeroForBattle().getMp()*100/singleBattle.getOperateHero().getHeroForBattle().getMpMax();
			if(percent<=conditionValue){
				return staticEnemyAi;
			}
		}
		return null;
	}
	/**
	 * 处理Ai，按AI的行动处理
	 * @param singleBattle
	 * @param ai
	 * @return
	 */
	private static Map<String, Object> processAi(SingleBattle singleBattle, StaticEnemyAi ai){
		switch (ai.getAction()) {
		case ACTION_ATTACK:
			return commonAttackForSingleBattle(singleBattle);
		case ACTION_SKILL:
			StaticHeroSkill staticHeroSkill = HeroSkillCache.getHeroSkill(ai.getActionValue());
			if(staticHeroSkill.getNeedVnp()>singleBattle.getOperateHero().getHeroForBattle().getMp()){
				return commonAttackForSingleBattle(singleBattle);
			}else{
				return skillResultForSingleBattle(staticHeroSkill, singleBattle);
			}
		case ACTION_ESCAPE:
			singleBattle.getTargetHero().setWin(true);
			return commonAttackForSingleBattle(singleBattle);
		case ACTION_DEFENCE://单挑没有防御，防御时做普通攻击处理
			
			return commonAttackForSingleBattle(singleBattle);

		default:
			return commonAttackForSingleBattle(singleBattle);
		}
	}
	/**
	 * 行军时间
	 * @return
	 */
	public static int marchTime(){
		
		return 0;
	}
	
}
