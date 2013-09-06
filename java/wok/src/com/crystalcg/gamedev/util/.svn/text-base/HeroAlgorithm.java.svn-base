package com.crystalcg.gamedev.util;

import java.lang.reflect.Method;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.tech.service.SoldierTechService;
import com.crystalcg.gamedev.util.cache.CentrestageCache;
import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.SoldierTechCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;
import com.crystalcg.gamedev.util.cache.domain.StaticRank;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldierTech;

/**
 * 武将相关算法
 * 
 * @author xuzhongxing
 * 
 */
public class HeroAlgorithm {
	private static final Logger logger = LoggerFactory
			.getLogger(HeroAlgorithm.class);

	/**
	 * 计算武将属性
	 * 
	 * @param userHero
	 * @throws AppException
	 */
	public static void computeAttribute(UserHero userHero) throws AppException {
		userHero.setQuality(getQualityByGift(userHero.getGift()));
		double factor = 1 + getFactor(userHero.getGift(), userHero.getQuality());
		userHero.setHeroForce(factor
				* (userHero.getHeroForce() + userHero.getForcePoint()));
		userHero.setStrategy(factor
				* (userHero.getStrategy() + userHero.getStrategyPoint()));
		userHero.setPhysique(factor
				* (userHero.getPhysique() + userHero.getPhysiquePoint()));
		userHero.setAgility(factor
				* (userHero.getAgility() + userHero.getAgilityPoint()));
		UserItemService userItemService = (UserItemService) ServiceLocator
				.getSpringBean("userItemService");
		if (userHero.getId() != 0) {// 新招募的武将无装备
			// 武将的全部装备
			List<UserEquipment> equipList = userItemService
					.getUserEquipmentOnHero(userHero.getCharacterId(), 0,
							userHero.getId());
			for (UserEquipment ue : equipList) {
				// 设置武将武器类型
				if (ue.getEquipment().getEquipmentType() == 1) {
					userHero.setHeroWeapon(ue.getEquipment().getWeaponType());
				}
				// 增加装备属性
				addEquipmentAttribute(userHero, ue);
				// 增加宝石属性
				addStoneAttribute(userHero, ue.getStone1());
				addStoneAttribute(userHero, ue.getStone2());
				addStoneAttribute(userHero, ue.getStone3());
			}
		}
		// 计算二级属性
		userHero.setAttack(userHero.getAttack()
				+ computeAttack(userHero.getHeroForce()
						+ userHero.getForceAdd()));
		userHero.setDefence(userHero.getDefence()
				+ computeDefence(userHero.getPhysique()
						+ userHero.getPhysiqueAdd()));
		userHero.setCriticalStrike(userHero.getCriticalStrike()
				+ computeCriticalStrike(userHero.getHeroForce()
						+ userHero.getForceAdd()));
		userHero.setHit(userHero.getHit()
				+ computeHit(userHero.getAgility() + userHero.getAgilityAdd()));
		userHero.setDodge(userHero.getDodge()
				+ computeDodge(userHero.getAgility() + userHero.getAgilityAdd()));
		userHero.setMobility(computeMobility(userHero.getAgility()));
		// 计算统率
		computeCommand(userHero);
		// 计算体力、精力上限（当前值的正确性由换装、成长保证）
		userHero.setStaminaMax(100 + computeStaminaMax(userHero.getPhysique()
				+ userHero.getPhysiqueAdd()));
		userHero.setMpMax(computeMpMax(userHero.getStrategy()
				+ userHero.getStrategyAdd()));
	}

	/**
	 * 根据根骨确定品级
	 * 
	 * @param userHero
	 * @return
	 */
	public static int getQualityByGift(double gift) {
		if (gift < 2) {
			// 白色
			return 1;
		} else if (gift < 6) {
			// 绿色
			return 2;
		} else if (gift < 12) {
			// 蓝色
			return 3;
		} else if (gift < 20) {
			// 紫色
			return 4;
		} else if (gift < 30 + 1e-10) {// 精度1e-10
			// 橙色
			return 5;
		} else {
			logger.error("武将根骨超过上限 " + gift + "/" + 30);
			return 5;
		}
	}

	/**
	 * 升级时获取潜能点数
	 * 
	 * @return
	 */
	public static int getPoint(int quality) {
		switch (quality) {
		case 1:
			return 3;
		case 2:
			return 4;
		case 3:
			return 6;
		case 4:
			return 8;
		case 5:
			return 10;
		default:
			return 0;
		}
	}

	/**
	 * 升级时获取总属性点
	 * 
	 * @return
	 */
	public static double getAttribute(double gift) {
//		return (gift * Math.pow(1.22, gift / 3.5) + 50) / 5 + gift;
		return 10+gift/(0.8+0.04*gift);
	}

	public static void main(String[] args) {
		// System.out.println(getAttribute(20));
	}

	/**
	 * 属性系数,需要先确定品级
	 * 
	 * @param quality
	 * @return
	 */
	public static double getFactor(double gift, int quality) {
		double base = gift / (gift + 90);
		switch (quality) {
		case 2:
			return base + .01;
		case 3:
			return base + .02;
		case 4:
			return base + .03;
		case 5:
			return base + .05;
		default:
			return base;
		}
	}

	/**
	 * 单挑力=气血值*0.1+武力*0.4+谋略*0.25+体质*0.25+身法*0.2
	 * 战斗力=兵力*0.1+武力*1+谋略*0.7+体质*0.65+身法*0.6
	 * 
	 * 计算武将战力
	 * 
	 * @param userHero
	 * @return
	 */
	public static double computeFightingCapacity(List<UserHero> userHero) {
		if (userHero.isEmpty()) {
			return 0;
		}
		SoldierTechService soldierTechService = (SoldierTechService) ServiceLocator
				.getSpringBean("soldierTechService");
		double result = 0;
		List<String> soldierSkillStrings = soldierTechService
				.getUserSoldierTech(userHero.get(0).getCharacterId());
		try {
			for (UserHero i : userHero) {
				double strategy = i.getStrategy() + i.getStrategyAdd();
				double agility = i.getAgility() + i.getAgilityAdd();
				StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(i
						.getSoldierNo());
				if (staticSoldier == null) {
					result += i.getSoldierAmount() * .1 + i.getAttack()
							+ strategy * .7 + i.getDefence() * .65 + agility
							* .6;
				} else {
					staticSoldier = (StaticSoldier) staticSoldier.clone();
					addSoldierTechEffect(staticSoldier, soldierSkillStrings);
					result += i.getSoldierAmount()
							* .1
							+ staticSoldier.getSoldierAttack()
							+ i.getAttack()
							+ strategy
							* .7
							+ (staticSoldier.getSoldierDefence() + i
									.getDefence()) * .65 + agility * .6;
				}
			}
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	private static final void addSoldierTechEffect(StaticSoldier staticSoldier,
			List<String> soldierSkillStrings) {
		double soldierMobility = staticSoldier.getMobility();
		double soldierAttack = staticSoldier.getSoldierAttack();
		double soldierDefence = staticSoldier.getSoldierDefence();
		double soldierCriticalStrike = (double) staticSoldier
				.getSoldierCritical() / Const.CHANGE_PERCENT_TO_VALUE;
		double soldierHit = (double) staticSoldier.getSoldierHit()
				/ Const.CHANGE_PERCENT_TO_VALUE;
		double soldierDodge = (double) staticSoldier.getSoldierDodge()
				/ Const.CHANGE_PERCENT_TO_VALUE;
		double soldierHp = staticSoldier.getSoldierHp();
		// 添加科技影响
		for (String j : soldierSkillStrings) {
			StaticSoldierTech staticSoldierTech = SoldierTechCache.getTech(j);
			if (staticSoldierTech.getSoldierType() == staticSoldier
					.getSoldierType()) {
				// 添加科技影响
				if (staticSoldierTech.getValueMode() == 2) {
					// 不是被动技能，添加属性影响
					soldierAttack *= (1 + staticSoldierTech.getAddAtk()
							/ Const.CHANGE_PERCENT_TO_VALUE);
					soldierDefence *= (1 + staticSoldierTech.getAddDef()
							/ Const.CHANGE_PERCENT_TO_VALUE);
					soldierCriticalStrike *= (1 + staticSoldierTech.getAddCrt()
							/ Const.CHANGE_PERCENT_TO_VALUE);
					soldierDodge *= (1 + staticSoldierTech.getAddDodge()
							/ Const.CHANGE_PERCENT_TO_VALUE);
					soldierHit *= (1 + staticSoldierTech.getAddHit()
							/ Const.CHANGE_PERCENT_TO_VALUE);
					soldierHp *= (1 + staticSoldierTech.getAddHealth()
							/ Const.CHANGE_PERCENT_TO_VALUE);

				} else if (staticSoldierTech.getValueMode() == 1) {
					soldierAttack += staticSoldierTech.getAddAtk();
					soldierDefence += staticSoldierTech.getAddDef();
					soldierCriticalStrike += staticSoldierTech.getAddCrt()
							/ Const.CHANGE_PERCENT_TO_VALUE;
					soldierDodge += staticSoldierTech.getAddDodge()
							/ Const.CHANGE_PERCENT_TO_VALUE;
					soldierHit += staticSoldierTech.getAddHit()
							/ Const.CHANGE_PERCENT_TO_VALUE;
					soldierHp += staticSoldierTech.getAddHealth();
				}
			}
		}
		staticSoldier.setMobility((int) soldierMobility);
		staticSoldier.setSoldierAttack((int) soldierAttack);
		staticSoldier.setSoldierDefence((int) soldierDefence);
		staticSoldier
				.setSoldierCritical((int) (soldierCriticalStrike * Const.CHANGE_PERCENT_TO_VALUE));
		staticSoldier
				.setSoldierHit((int) (soldierHit * Const.CHANGE_PERCENT_TO_VALUE));
		staticSoldier
				.setSoldierDodge((int) (soldierDodge * Const.CHANGE_PERCENT_TO_VALUE));
		staticSoldier.setSoldierHp((int) soldierHp);

	}

	/**
	 * 计算武将单挑力，即单挑战力
	 * 
	 * @param userHero
	 * @return
	 */
	public static double computeSingleForce(UserHero userHero) {
		double force = userHero.getHeroForce() + userHero.getForceAdd();
		double strategy = userHero.getStrategy() + userHero.getStrategyAdd();
		double physique = userHero.getPhysique() + userHero.getPhysiqueAdd();
		double agility = userHero.getAgility() + userHero.getAgilityAdd();
		return getHeroHp(userHero) * .1 + force * .4 + strategy * .25
				+ physique * .25 + agility * .2;
	}

	/**
	 * 计算野怪战力
	 * 
	 * @param userHero
	 * @return
	 */
	public static double computeEnemyFightingCapacity(StaticEnemyNPC staticEnemyNPC) {
		double result = 0;
		double strategy = staticEnemyNPC.getHeroStrategy();
		double agility = staticEnemyNPC.getHeroAgility();
		try {
			for(int i=1;i<6;i++){
				Method getsoldierNo;
				getsoldierNo = StaticEnemyNPC.class.getMethod("getSoldierType"+i);
				String soldierNo = (String)getsoldierNo.invoke(staticEnemyNPC);
				if(soldierNo==null){
					continue;
				}
				StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(soldierNo);
				result += staticEnemyNPC.getSoldierNum() * .1
						+ staticSoldier.getSoldierAttack()
						+ computeAttack(staticEnemyNPC.getHeroForce()) + strategy * .7
						+ (staticSoldier.getSoldierDefence() + computeDefence(staticEnemyNPC.getHeroPhysique())) * .65
								+ agility * .6;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;

	}
	/**
	 * 计算野怪单挑力，即单挑战力
	 * 
	 * @param userHero
	 * @return
	 */
	public static double computeEnemySingleForce(StaticEnemyNPC staticEnemyNPC) {
		double force = staticEnemyNPC.getHeroForce() ;
		double strategy = staticEnemyNPC.getHeroStrategy();
		double physique = staticEnemyNPC.getHeroPhysique();
		double agility = staticEnemyNPC.getHeroAgility() ;
		return getEnemyHp(staticEnemyNPC) * .1 + force * .4 + strategy * .25
				+ physique * .25 + agility * .2;
	}

	/**
	 * 获取当前气血
	 * 
	 * @param userHero
	 * @return
	 */
	public static int getHeroHpMax(UserHero userHero) {
		return (int) (60 * userHero.getLevel() + userHero.getPhysique() / 2);
	}

	/**
	 * 获取最大气血
	 * 
	 * @param userHero
	 * @return
	 */
	public static int getHeroHp(UserHero userHero) {
		return (int) ((60 * userHero.getLevel() + userHero.getPhysique() / 2)
				* userHero.getStamina() / userHero.getStaminaMax());
	}
	public static int getEnemyHp(StaticEnemyNPC staticEnemyNPC){
		return (int) (60 * staticEnemyNPC.getHeroLevel() + staticEnemyNPC.getHeroPhysique() / 2);
	}

	/**
	 * 计算需要体力药膏数
	 * 
	 * @param userHero
	 * @return
	 */
	public static int computeStaminaNeedMedicine(UserHero userHero) {
		return (int) (userHero.getStaminaMax() - userHero.getStamina() + 0.5);
	}

	/**
	 * 计算需要精力药膏数
	 * 
	 * @param userHero
	 * @return
	 */
	public static int computeMpNeedMedicine(UserHero userHero) {
		return (int) (userHero.getMpMax() - userHero.getMp() + 0.5);
	}

	/**
	 * 武将附加装备属性（不包括宝石）
	 * 
	 * @param userHero
	 * @param stone
	 * @throws AppException
	 */
	final private static void addEquipmentAttribute(UserHero userHero,
			UserEquipment ue) throws AppException {
		userHero.setForceAdd(userHero.getForceAdd()
				+ ue.getEquipment().getHeroForce() + ue.getStrengthenForce());
		userHero.setStrategyAdd(userHero.getStrategyAdd()
				+ ue.getEquipment().getStrategy() + ue.getStrengthenStrategy());
		userHero.setPhysiqueAdd(userHero.getPhysiqueAdd()
				+ ue.getEquipment().getPhysique() + ue.getStrengthenPhysique());
		userHero.setAgilityAdd(userHero.getAgilityAdd()
				+ ue.getEquipment().getAgility() + ue.getStrengthenAgility());
	}

	/**
	 * 武将附加宝石属性
	 * 
	 * @param userHero
	 * @param stone
	 */
	final private static void addStoneAttribute(UserHero userHero,
			StaticMaterial stone) {
		if (userHero == null || stone == null) {
			return;
		}
		// 宝石附加的属性类型
		switch (stone.getAttributeType()) {
		case 1:// 武力
			userHero.setForceAdd(userHero.getForceAdd()
					+ stone.getAttributeValue());
			break;
		case 2:// 谋略
			userHero.setStrategyAdd(userHero.getStrategyAdd()
					+ stone.getAttributeValue());
			break;
		case 3:// 体质
			userHero.setPhysiqueAdd(userHero.getPhysiqueAdd()
					+ stone.getAttributeValue());
			break;
		case 4:// 身法
			userHero.setAgilityAdd(userHero.getAgilityAdd()
					+ stone.getAttributeValue());
			break;
		case 5:// 攻击
			userHero.setAttack(userHero.getAttack() + stone.getAttributeValue());
			break;
		case 6:// 防御
			userHero.setDefence(userHero.getDefence()
					+ stone.getAttributeValue());
			break;
		case 7:// 命中
			userHero.setHit(userHero.getHit() + stone.getAttributeValue());
			break;
		case 8:// 闪避
			userHero.setDodge(userHero.getDodge() + stone.getAttributeValue());
			break;
		case 9:// 体力
			userHero.setStaminaMax(userHero.getStaminaMax()
					+ stone.getAttributeValue());
			break;
		case 10:// 精力
			userHero.setMpMax(userHero.getMpMax() + stone.getAttributeValue());
			break;
		case 11:// 暴击
			userHero.setCriticalStrike(userHero.getCriticalStrike()
					+ stone.getAttributeValue());
			break;
		case 12:// 统率
			userHero.setCommand(userHero.getCommand()
					+ stone.getAttributeValue());
			break;
		}
	}

	/**
	 * 武力加攻击力
	 * 
	 * @param force
	 * @return
	 */
	final public static double computeAttack(double force) {
		return force;
	}

	/**
	 * 武力加暴击等级
	 * 
	 * @param force
	 * @return
	 */
	final public static double computeCriticalStrike(double force) {
		return force * .6;
	}

	/**
	 * 谋略加精力上限
	 * 
	 * @param strategy
	 * @return
	 */
	final public static double computeMpMax(double strategy) {
		return strategy;
	}

	/**
	 * 谋略加统率
	 * 
	 * @param strategy
	 * @return
	 */
	final public static void computeCommand(UserHero userHero) {
		StaticRank rankInfo = CentrestageCache
				.getRankByNo(userHero.getRankNo());// 官职
		if (rankInfo == null) {
			userHero.setCommand(userHero.getLevel()
					* 50
					+ .5*(userHero.getStrategy()
							+ userHero.getStrategyAdd()));
		} else {
			userHero.setCommand(userHero.getLevel()
					* 50
					+ .5*(userHero.getStrategy()
							+ userHero.getStrategyAdd())
					+ rankInfo.getRankCommand());
		}
	}

	/**
	 * 身法加命中等级
	 * 
	 * @param agility
	 * @return
	 */
	final public static double computeHit(double agility) {
		return agility * .5;
	}

	/**
	 * 身法加闪避等级
	 * 
	 * @param agility
	 * @return
	 */
	final public static double computeDodge(double agility) {
		return agility * .05;
	}

	/**
	 * 体质加防御
	 * 
	 * @param physique
	 * @return
	 */
	final public static double computeDefence(double physique) {
		return physique;
	}

	/**
	 * 体质加体力上限
	 * 
	 * @param physique
	 * @return
	 */
	final public static double computeStaminaMax(double physique) {
		return physique * .02;
	}

	/**
	 * 行动力
	 * 
	 * @param agility
	 * @return
	 */
	final public static double computeMobility(double agility) {
		return agility * .1;
	}
}
