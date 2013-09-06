package com.crystalcg.gamedev.battleProcess.domain;

import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;

public class HeroAttribute {
	
	private double forcePrimary;
	private double strategyPrimary;
	private double agilityPrimary;
	private double physiquePrimary;
	
	private double forceAdd;
	private double strategyAdd;
	private double agilityAdd;
	private double physiqueAdd;
	////////////
	private double forceEffect;
	private double strategyEffect;
	private double agilityEffect;
	private double physiqueEffect;
	
	private double mobility;
	private double attack;
	private double defence;
	private double criticalStrike;
	private double hit;
	private double dodge;
	public HeroAttribute(){
		
	}
	public HeroAttribute(UserHero userHero){
		forcePrimary = userHero.getHeroForce()+userHero.getForceAdd();
		strategyPrimary = userHero.getStrategy()+userHero.getStrategyAdd();
		agilityPrimary = userHero.getAgility()+userHero.getAgilityAdd();
		physiquePrimary = userHero.getPhysique()+userHero.getPhysiqueAdd();
		forceEffect=1;
		strategyEffect=1;
		agilityEffect=1;
		physiqueEffect=1;
		mobility = userHero.getMobility();
		attack = userHero.getAttack();
		defence = userHero.getDefence();
		criticalStrike = userHero.getCriticalStrike();
		hit = userHero.getHit();
		dodge = userHero.getDodge();
	}
	public HeroAttribute(StaticEnemyNPC staticEnemyNPC){
		forcePrimary = staticEnemyNPC.getHeroForce();
		strategyPrimary = staticEnemyNPC.getHeroStrategy();
		agilityPrimary = staticEnemyNPC.getHeroAgility();
		physiquePrimary = staticEnemyNPC.getHeroPhysique();
		forceEffect=1;
		strategyEffect=1;
		agilityEffect=1;
		physiqueEffect=1;
		mobility = HeroAlgorithm.computeMobility((double)staticEnemyNPC.getHeroAgility());
		attack = HeroAlgorithm.computeAttack(staticEnemyNPC.getHeroForce());
		defence = HeroAlgorithm.computeDefence(staticEnemyNPC.getHeroPhysique());
		criticalStrike = HeroAlgorithm.computeCriticalStrike(staticEnemyNPC.getHeroForce());
		hit = HeroAlgorithm.computeHit(staticEnemyNPC.getHeroAgility());
		dodge = HeroAlgorithm.computeDodge(staticEnemyNPC.getHeroAgility());
	}
	public double getForce() {
		double force = forcePrimary+forceAdd;
		return force<0?0:force;
	}
	public double getStrategy() {
		double strategy = strategyPrimary+strategyAdd;
		return strategy<0?0:strategy;
	}
	public double getAgility() {
		double agility = agilityPrimary+agilityAdd;
		return agility<0?0:agility;
	}
	public double getPhysique() {
		double physique = physiquePrimary+physiqueAdd;
		return physique<0?0:physique;
	}
	public double getForceEffect() {
		return forceEffect;
	}
	public double getStrategyEffect() {
		return strategyEffect;
	}
	public double getAgilityEffect() {
		return agilityEffect;
	}
	public double getPhysiqueEffect() {
		return physiqueEffect;
	}
	public double getMobility() {
		return mobility;
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
	public void setForceEffect(double forceEffect) {
		this.forceEffect = forceEffect;
	}
	public void setStrategyEffect(double strategyEffect) {
		this.strategyEffect = strategyEffect;
	}
	public void setAgilityEffect(double agilityEffect) {
		this.agilityEffect = agilityEffect;
	}
	public void setPhysiqueEffect(double physiqueEffect) {
		this.physiqueEffect = physiqueEffect;
	}
	public void setMobility(double mobility) {
		this.mobility = mobility;
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
	public double getForceAdd() {
		return forceAdd;
	}
	public double getStrategyAdd() {
		return strategyAdd;
	}
	public double getAgilityAdd() {
		return agilityAdd;
	}
	public double getPhysiqueAdd() {
		return physiqueAdd;
	}
	public void setForceAdd(double forceAdd) {
		this.forceAdd = forceAdd;
	}
	public void setStrategyAdd(double strategyAdd) {
		this.strategyAdd = strategyAdd;
	}
	public void setAgilityAdd(double agilityAdd) {
		this.agilityAdd = agilityAdd;
	}
	public void setPhysiqueAdd(double physiqueAdd) {
		this.physiqueAdd = physiqueAdd;
	}
}
