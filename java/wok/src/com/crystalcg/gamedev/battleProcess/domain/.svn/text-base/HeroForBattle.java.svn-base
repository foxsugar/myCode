package com.crystalcg.gamedev.battleProcess.domain;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;

public class HeroForBattle{
	@JsonIgnore
	private int userheroId;//武将id
	private String heroName;//武将名称
	private String heroIcon;//武将大图标
	private String smallHeroIcon;//武将小图标
	@JsonIgnore
	private String heroAction;
	
	@JsonIgnore
	private String heroActionWeapon;
	private String heroActionForWait;
	
	
	private double heroForce;//武力
	private double physique;//体质
	private double agility;//身法
	private double strategy;//谋略
	private int level;//等级
	private int quality;//品级
	private double attack;// 攻击
	private double defence;// 防御
	private double criticalStrike;// 暴击
	private double hit;// 命中
	private double dodge;// 闪避
	private double mobility;//行动力
	
	/////buff附加的属性/////
	private double heroForceEffect;//武力
	private double physiqueEffect;//体质
	private double agilityEffect;//身法
	private double strategyEffect;//谋略
	private double attackEffect;// 攻击
	private double defenceEffect;// 防御
	private double criticalStrikeEffect;// 暴击
	private double hitEffect;// 命中
	private double dodgeEffect;// 闪避
	private double mobilityEffect;//行动力
	
	private double stamina;//耐力
	private double staminaMax;//耐力最大值
	private int hp;
	private int hpMax;
	private int mp;
	private int mpMax;
	
	private int locationId;//武将位置Id
	private List<SkillOjbect> heroSkill;
	private List<BuffObject> buff;
	private List<BuffObject> deBuff;


	public HeroForBattle(){
		
	}
	/**
	 * 玩家信息构造;
	 * @param userHero
	 * @param staticHeroSkills
	 * @param buffs
	 */
	public HeroForBattle(UserHero userHero, List<StaticHeroSkill> staticHeroSkills, List<BuffObject> buffs,int locationId){
		userheroId = userHero.getId();
		heroName = userHero.getHeroName();
		heroIcon = userHero.getHeroIcon();
		smallHeroIcon = userHero.getSmallHeroIcon();
		heroAction = userHero.getHeroAction();
		heroForce = userHero.getHeroForce()+userHero.getForceAdd();
		physique = userHero.getPhysique()+userHero.getPhysiqueAdd();
		agility = userHero.getAgility()+userHero.getAgilityAdd();
		strategy = userHero.getStrategy()+userHero.getStrategyAdd();
		level = userHero.getLevel();
		quality = userHero.getQuality();
		attack = userHero.getAttack();
		defence = userHero.getDefence();
		criticalStrike = userHero.getCriticalStrike();
		hit = userHero.getHit();
		dodge = userHero.getDodge();
		mobility = userHero.getAgility()/24;
		stamina = userHero.getStamina();
		staminaMax = userHero.getStaminaMax();
		hp = HeroAlgorithm.getHeroHp(userHero);
		hpMax = HeroAlgorithm.getHeroHpMax(userHero);
		mp = (int)userHero.getMp();
		mpMax = (int)userHero.getMpMax();
		level = userHero.getLevel();
		heroSkill = new ArrayList<SkillOjbect>();
		buff = new ArrayList<BuffObject>();
		deBuff = new ArrayList<BuffObject>();
		heroActionWeapon = heroAction+"_"+(userHero.getHeroWeapon()==0?1:userHero.getHeroWeapon())+"_";
		heroActionForWait = heroActionWeapon+BattleProcess.BATTLE_ACTION_WAIT_STRING;
		this.locationId = locationId;
		SkillOjbect skill;
		if(staticHeroSkills!=null){
			for(StaticHeroSkill i:staticHeroSkills){
				skill = new SkillOjbect(i);
				heroSkill.add(skill);
			}
		}
		if(buffs != null){
			
		}
		heroForceEffect=1;//武力
		physiqueEffect=1;//体质
		agilityEffect=1;//身法
		strategyEffect=1;//谋略
		attackEffect=1;// 攻击
		defenceEffect=1;// 防御
		criticalStrikeEffect=1;// 暴击
		hitEffect=1;// 命中
		dodgeEffect=1;// 闪避
		mobilityEffect=1;//行动力
	}
	/**
	 * 野怪信息构造
	 * @param staticEnemyNPC
	 * @param staticHeroSkills
	 * @param buffs
	 */
	public HeroForBattle(StaticEnemyNPC staticEnemyNPC, List<StaticHeroSkill> staticHeroSkills, List<BuffObject> buffs){
		heroName = staticEnemyNPC.getEnemyName();
		heroIcon = staticEnemyNPC.getHeroIcon();
		smallHeroIcon = staticEnemyNPC.getSmallHeroIcon();
		heroAction = staticEnemyNPC.getHeroAction();
		heroActionWeapon = staticEnemyNPC.getHeroAction();
		heroActionForWait = staticEnemyNPC.getHeroAction()+BattleProcess.BATTLE_ACTION_WAIT_STRING;
		heroForce = staticEnemyNPC.getHeroForce();
		physique = staticEnemyNPC.getHeroPhysique();
		agility = staticEnemyNPC.getHeroAgility();
		strategy = staticEnemyNPC.getHeroStrategy();
		level = staticEnemyNPC.getHeroLevel();
		attack = heroForce;
		defence = physique;
		criticalStrike = heroForce*0.1;
		hit = agility;
		dodge = 0.2*agility;
		mobility = (double)staticEnemyNPC.getHeroAgility()/24;
		hp = staticEnemyNPC.getHpMax();
		hpMax = staticEnemyNPC.getHpMax();
		mp = (int)strategy;
		mpMax = (int)strategy;
		level = staticEnemyNPC.getHeroLevel();
		heroSkill = new ArrayList<SkillOjbect>();
		buff = new ArrayList<BuffObject>();
		deBuff = new ArrayList<BuffObject>();
		locationId = 1;//野怪处于1位置
		SkillOjbect skill;
		if(staticHeroSkills!=null){
			for(StaticHeroSkill i:staticHeroSkills){
				skill = new SkillOjbect(i);
				heroSkill.add(skill);
			}
		}
		if(buffs != null){
			
		}
		heroForceEffect=1;//武力
		physiqueEffect=1;//体质
		agilityEffect=1;//身法
		strategyEffect=1;//谋略
		attackEffect=1;// 攻击
		defenceEffect=1;// 防御
		criticalStrikeEffect=1;// 暴击
		hitEffect=1;// 命中
		dodgeEffect=1;// 闪避
		mobilityEffect=1;//行动力
	}
//	public void addBuff(int beginRound, StaticHeroSkillLastEffect staticHeroSkillLastEffect, int hurt){
//		BuffObject buffObject = new BuffObject(beginRound,staticHeroSkillLastEffect);
//		buff.add(buffObject);
//	}
//	public void deleteBuff(int i){
//		buff.remove(i);
//	}
	public int getUserheroId() {
		return userheroId;
	}
	public String getHeroName() {
		return heroName;
	}
	public String getHeroIcon() {
		return heroIcon;
	}
	public String getSmallHeroIcon() {
		return smallHeroIcon;
	}
	public String getHeroAction() {
		return heroAction;
	}
	public String getHeroActionWeapon() {
		return heroActionWeapon;
	}
	public String getHeroActionForWait() {
		return heroActionForWait;
	}
	public double getHeroForce() {
		return heroForce;
	}
	public double getPhysique() {
		return physique;
	}
	public double getAgility() {
		return agility;
	}
	public double getStrategy() {
		return strategy;
	}
	public int getLevel() {
		return level;
	}
	public int getQuality() {
		return quality;
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
	public double getMobility() {
		return mobility;
	}
	public double getHeroForceEffect() {
		return heroForceEffect;
	}
	public double getPhysiqueEffect() {
		return physiqueEffect;
	}
	public double getAgilityEffect() {
		return agilityEffect;
	}
	public double getStrategyEffect() {
		return strategyEffect;
	}
	public double getAttackEffect() {
		return attackEffect;
	}
	public double getDefenceEffect() {
		return defenceEffect;
	}
	public double getCriticalStrikeEffect() {
		return criticalStrikeEffect;
	}
	public double getHitEffect() {
		return hitEffect;
	}
	public double getDodgeEffect() {
		return dodgeEffect;
	}
	public double getMobilityEffect() {
		return mobilityEffect;
	}
	public double getStamina() {
		return stamina;
	}
	public double getStaminaMax() {
		return staminaMax;
	}
	public int getHp() {
		return hp;
	}
	public int getHpMax() {
		return hpMax;
	}
	public int getMp() {
		return mp;
	}
	public int getMpMax() {
		return mpMax;
	}
	public int getLocationId() {
		return locationId;
	}
	public List<SkillOjbect> getHeroSkill() {
		return heroSkill;
	}
	public List<BuffObject> getBuff() {
		return buff;
	}
	public List<BuffObject> getDeBuff() {
		return deBuff;
	}
	public void setUserheroId(int userheroId) {
		this.userheroId = userheroId;
	}
	public void setHeroName(String heroName) {
		this.heroName = heroName;
	}
	public void setHeroIcon(String heroIcon) {
		this.heroIcon = heroIcon;
	}
	public void setSmallHeroIcon(String smallHeroIcon) {
		this.smallHeroIcon = smallHeroIcon;
	}
	public void setHeroAction(String heroAction) {
		this.heroAction = heroAction;
	}
	public void setHeroActionWeapon(String heroActionWeapon) {
		this.heroActionWeapon = heroActionWeapon;
	}
	public void setHeroActionForWait(String heroActionForWait) {
		this.heroActionForWait = heroActionForWait;
	}
	public void setHeroForce(double heroForce) {
		this.heroForce = heroForce;
	}
	public void setPhysique(double physique) {
		this.physique = physique;
	}
	public void setAgility(double agility) {
		this.agility = agility;
	}
	public void setStrategy(double strategy) {
		this.strategy = strategy;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public void setQuality(int quality) {
		this.quality = quality;
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
	public void setMobility(double mobility) {
		this.mobility = mobility;
	}
	public void setHeroForceEffect(double heroForceEffect) {
		this.heroForceEffect = heroForceEffect;
	}
	public void setPhysiqueEffect(double physiqueEffect) {
		this.physiqueEffect = physiqueEffect;
	}
	public void setAgilityEffect(double agilityEffect) {
		this.agilityEffect = agilityEffect;
	}
	public void setStrategyEffect(double strategyEffect) {
		this.strategyEffect = strategyEffect;
	}
	public void setAttackEffect(double attackEffect) {
		this.attackEffect = attackEffect;
	}
	public void setDefenceEffect(double defenceEffect) {
		this.defenceEffect = defenceEffect;
	}
	public void setCriticalStrikeEffect(double criticalStrikeEffect) {
		this.criticalStrikeEffect = criticalStrikeEffect;
	}
	public void setHitEffect(double hitEffect) {
		this.hitEffect = hitEffect;
	}
	public void setDodgeEffect(double dodgeEffect) {
		this.dodgeEffect = dodgeEffect;
	}
	public void setMobilityEffect(double mobilityEffect) {
		this.mobilityEffect = mobilityEffect;
	}
	public void setStamina(double stamina) {
		this.stamina = stamina;
	}
	public void setStaminaMax(double staminaMax) {
		this.staminaMax = staminaMax;
	}
	public void setHp(int hp) {
		this.hp = hp;
	}
	public void setHpMax(int hpMax) {
		this.hpMax = hpMax;
	}
	public void setMp(int mp) {
		this.mp = mp;
	}
	public void setMpMax(int mpMax) {
		this.mpMax = mpMax;
	}
	public void setLocationId(int locationId) {
		this.locationId = locationId;
	}
	public void setHeroSkill(List<SkillOjbect> heroSkill) {
		this.heroSkill = heroSkill;
	}
	public void setBuff(List<BuffObject> buff) {
		this.buff = buff;
	}
	public void setDeBuff(List<BuffObject> deBuff) {
		this.deBuff = deBuff;
	}

//	@Override
//	public Object clone() throws CloneNotSupportedException {
//		// TODO Auto-generated method stub
//		return super.clone();
//	}

	
}
