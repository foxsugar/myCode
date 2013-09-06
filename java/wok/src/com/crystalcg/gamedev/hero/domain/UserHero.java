package com.crystalcg.gamedev.hero.domain;

import com.crystalcg.gamedev.util.cache.CentrestageCache;
import com.crystalcg.gamedev.util.cache.SoldierCache;


/**
 * 用户武将
 * @author xuzhongxing
 */
public class UserHero {
	
	/***************永久数据****************/
	private int id;// 武将Id
	private int characterId;// 玩家Id
	private String heroName;// 武将名称
	private int heroType;//武将分类
	private int gender;// 武将性别
	private String heroIcon;// 武将头像大图标资源名
	private String smallHeroIcon;// 武将头像小图标资源名
	
	private double primaryForce;// 原始武力值，最初1级时的武力值
	private double primaryStrategy;// 原始谋略，最初1级时的谋略
	private double primaryPhysique;// 原始体力值，最初1级时的体力值
	private double primaryAgility;// 原始身法值，最初1级时的身法值
	
	private String heroAction;// 武将动作模型资源
	
	/***************随成长变化***********/
	private int level;// 等级
	private int exp;// 武将经验
	private double heroForce;// 武力
	private double strategy;// 谋略
	private double physique;// 体质
	private double agility;// 身法
	
	private int point;//潜能点
	private int forcePoint;//分配在武力上的潜能点
	private int strategyPoint;//分配在谋略上的潜能点
	private int physiquePoint;//分配在体质上的潜能点
	private int agilityPoint;//分配在身法上的潜能点
	private int quality;// 品级，影响最终属性系数
	private double gift;// 根骨，决定品级
	private String heroTitle;// 武将评级
	private int heroSoulId;// 武魂Id
	private int heroSoulGrade;// 武魂品级
	private int heroSoulExp;// 武魂经验
	
	/*************随操作变化*************/
	private String rankNo;// 武将官职
	private int exploit;// 军功
	private double stamina;// 当前体力，最小值1
	private double mp;// 当前精力
	private int heroStatus;// 武将状态,0空闲,1出征,2修炼
	private int isinWall;// 是否守城，0：否 1：是
	private String soldierNo;// 所带士兵编号
	private int soldierAmount;// 士兵数量
	
	private int logForce;//记录分配在武力上的潜能点
	private int logStrategy;//记录分配在谋略上的潜能点
	private int logPhysique;//记录分配在体质上的潜能点
	private int logAgility;//记录分配在身法上的潜能点
	
	//////////////////////////////////////////////////////////////
	//////////////////临时计算，不存数据库//////////////////////////
	private double forceAdd;// 武力附加点
	private double strategyAdd;// 智力附加点
	private double physiqueAdd;// 耐力附加点
	private double agilityAdd;// 身法附加点
	
	private double command;// 统帅（初始值+谋略计算+官职附加）
	
	private double staminaMax;// 体力上限
	private double mpMax;// 精力上限
	
	private double attack;// 攻击
	private double defence;// 防御
	private double criticalStrike;// 暴击
	private double hit;// 命中
	private double dodge;// 闪避
	private double mobility;// 闪避
	private double fighting;//临时单挑力
	private double sunFighting;//临时带兵战斗力
	
	private int heroWeapon;// 武将武器类型
	
	
	/////从静态数据获得的数据//////
	private String rankName;
	private String soldierName;

	public int getId() {
		return id;
	}

	public int getCharacterId() {
		return characterId;
	}

	public String getHeroName() {
		return heroName;
	}

	public int getGender() {
		return gender;
	}

	public String getHeroIcon() {
		return heroIcon;
	}

	public String getSmallHeroIcon() {
		return smallHeroIcon;
	}

	public int getLevel() {
		return level;
	}

	public double getHeroForce() {
		return heroForce;
	}

	public double getStrategy() {
		return strategy;
	}

	public double getPhysique() {
		return physique;
	}

	public double getAgility() {
		return agility;
	}

	public double getForceAdd() {
		return forceAdd;
	}

	public double getStrategyAdd() {
		return strategyAdd;
	}

	public double getPhysiqueAdd() {
		return physiqueAdd;
	}

	public double getAgilityAdd() {
		return agilityAdd;
	}

	public double getPrimaryForce() {
		return primaryForce;
	}

	public double getPrimaryPhysique() {
		return primaryPhysique;
	}

	public double getPrimaryAgility() {
		return primaryAgility;
	}

	public double getCommand() {
		return command;
	}

	public int getExp() {
		return exp;
	}

	public int getQuality() {
		return quality;
	}

	public double getGift() {
		return gift;
	}

	public double getStaminaMax() {
		return staminaMax;
	}

	public double getStamina() {
		return stamina;
	}

	public double getMpMax() {
		return mpMax;
	}

	public double getMp() {
		return mp;
	}

	public double getAttack() {
		return attack;
	}

	public double getDefence() {
		return defence;
	}

	public double getCriticalStrike() {
		return criticalStrike;
	}

	public double getHit() {
		return hit;
	}

	public double getDodge() {
		return dodge;
	}

	public String getHeroTitle() {
		return heroTitle;
	}

	public int getHeroStatus() {
		return heroStatus;
	}


	public int getSoldierAmount() {
		return soldierAmount;
	}

	public int getHeroSoulId() {
		return heroSoulId;
	}

	public int getHeroSoulGrade() {
		return heroSoulGrade;
	}

	public int getHeroSoulExp() {
		return heroSoulExp;
	}

	public int getExploit() {
		return exploit;
	}

	public int getIsinWall() {
		return isinWall;
	}

	public String getHeroAction() {
		return heroAction;
	}

	public int getHeroWeapon() {
		return heroWeapon;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}

	public void setHeroName(String heroName) {
		this.heroName = heroName;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public void setHeroIcon(String heroIcon) {
		this.heroIcon = heroIcon;
	}

	public void setSmallHeroIcon(String smallHeroIcon) {
		this.smallHeroIcon = smallHeroIcon;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public void setHeroForce(double heroForce) {
		this.heroForce = heroForce;
	}

	public void setStrategy(double strategy) {
		this.strategy = strategy;
	}

	public void setPhysique(double physique) {
		this.physique = physique;
	}

	public void setAgility(double agility) {
		this.agility = agility;
	}

	public void setForceAdd(double forceAdd) {
		this.forceAdd = forceAdd;
	}

	public void setStrategyAdd(double strategyAdd) {
		this.strategyAdd = strategyAdd;
	}

	public void setPhysiqueAdd(double physiqueAdd) {
		this.physiqueAdd = physiqueAdd;
	}

	public void setAgilityAdd(double agilityAdd) {
		this.agilityAdd = agilityAdd;
	}

	public void setPrimaryForce(double primaryForce) {
		this.primaryForce = primaryForce;
	}

	public void setPrimaryPhysique(double primaryPhysique) {
		this.primaryPhysique = primaryPhysique;
	}

	public void setPrimaryAgility(double primaryAgility) {
		this.primaryAgility = primaryAgility;
	}

	public void setCommand(double command) {
		this.command = command;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	public void setGift(double gift) {
		this.gift = gift;
	}

	public void setStaminaMax(double staminaMax) {
		this.staminaMax = staminaMax;
	}

	public void setStamina(double stamina) {
		this.stamina = stamina;
	}

	public void setMpMax(double mpMax) {
		this.mpMax = mpMax;
	}

	public void setMp(double mp) {
		this.mp = mp;
	}

	public void setAttack(double attack) {
		this.attack = attack;
	}

	public void setDefence(double defence) {
		this.defence = defence;
	}

	public void setCriticalStrike(double criticalStrike) {
		this.criticalStrike = criticalStrike;
	}

	public void setHit(double hit) {
		this.hit = hit;
	}

	public void setDodge(double dodge) {
		this.dodge = dodge;
	}

	public void setHeroTitle(String heroTitle) {
		this.heroTitle = heroTitle;
	}

	public void setHeroStatus(int heroStatus) {
		this.heroStatus = heroStatus;
	}


	public void setSoldierAmount(int soldierAmount) {
		this.soldierAmount = soldierAmount;
	}

	public void setHeroSoulId(int heroSoulId) {
		this.heroSoulId = heroSoulId;
	}

	public void setHeroSoulGrade(int heroSoulGrade) {
		this.heroSoulGrade = heroSoulGrade;
	}

	public void setHeroSoulExp(int heroSoulExp) {
		this.heroSoulExp = heroSoulExp;
	}

	public void setExploit(int exploit) {
		this.exploit = exploit;
	}

	public void setIsinWall(int isinWall) {
		this.isinWall = isinWall;
	}

	public void setHeroAction(String heroAction) {
		this.heroAction = heroAction;
	}

	public void setHeroWeapon(int heroWeapon) {
		this.heroWeapon = heroWeapon;
	}

	public double getPrimaryStrategy() {
		return primaryStrategy;
	}

	public void setPrimaryStrategy(double primaryStrategy) {
		this.primaryStrategy = primaryStrategy;
	}

	public String getRankNo() {
		return rankNo;
	}

	public void setRankNo(String rankNo) {
		this.rankNo = rankNo;
	}

	public int getPoint() {
		return point;
	}

	public void setPoint(int point) {
		this.point = point;
	}

	public int getLogForce() {
		return logForce;
	}

	public int getLogStrategy() {
		return logStrategy;
	}

	public int getLogPhysique() {
		return logPhysique;
	}

	public int getLogAgility() {
		return logAgility;
	}

	public void setLogForce(int logForce) {
		this.logForce = logForce;
	}

	public void setLogStrategy(int logStrategy) {
		this.logStrategy = logStrategy;
	}

	public void setLogPhysique(int logPhysique) {
		this.logPhysique = logPhysique;
	}

	public void setLogAgility(int logAgility) {
		this.logAgility = logAgility;
	}

	public int getForcePoint() {
		return forcePoint;
	}

	public int getStrategyPoint() {
		return strategyPoint;
	}

	public int getPhysiquePoint() {
		return physiquePoint;
	}

	public int getAgilityPoint() {
		return agilityPoint;
	}

	public void setForcePoint(int forcePoint) {
		this.forcePoint = forcePoint;
	}

	public void setStrategyPoint(int strategyPoint) {
		this.strategyPoint = strategyPoint;
	}

	public void setPhysiquePoint(int physiquePoint) {
		this.physiquePoint = physiquePoint;
	}

	public void setAgilityPoint(int agilityPoint) {
		this.agilityPoint = agilityPoint;
	}

	public String getRankName() {
		if(rankNo!=null){
			rankName=CentrestageCache.getRankByNo(rankNo).getRankName();
		}
		return rankName;
	}

	public String getSoldierName() {
		if(soldierNo!=null){
			soldierName = SoldierCache.getSoldierByNo(soldierNo).getSoldierName();
		}
		return soldierName;
	}

	public void setRankName(String rankName) {
		this.rankName = rankName;
	}

	public void setSoldierName(String soldierName) {
		this.soldierName = soldierName;
	}

	public String getSoldierNo() {
		return soldierNo;
	}

	public void setSoldierNo(String soldierNo) {
		this.soldierNo = soldierNo;
	}

	public int getHeroType() {
		return heroType;
	}

	public void setHeroType(int heroType) {
		this.heroType = heroType;
	}

	public double getMobility() {
		return mobility;
	}

	public void setMobility(double mobility) {
		this.mobility = mobility;
	}

	public double getFighting() {
		return fighting;
	}

	public void setFighting(double fighting) {
		this.fighting = fighting;
	}

	public double getSunFighting() {
		return sunFighting;
	}

	public void setSunFighting(double sunFighting) {
		this.sunFighting = sunFighting;
	}

}
