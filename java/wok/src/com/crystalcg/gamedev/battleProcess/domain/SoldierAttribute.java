package com.crystalcg.gamedev.battleProcess.domain;

import java.util.List;

import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.SoldierSkillCache;
import com.crystalcg.gamedev.util.cache.SoldierTechCache;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldierSkill;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldierTech;

/**
 * 士兵基础属性
 * @author jinganyang
 *
 */
public class SoldierAttribute {
	private double soldierMobility;
	private double soldierAttack;
	private double soldierDefence;
	private double soldierCriticalStrike;
	private double soldierHit;
	private double soldierDodge;
	private int soldierHp;
	private StaticSoldierSkill staticSoldierSkill;//兵种技能
	public SoldierAttribute(){
		
	}
	public SoldierAttribute(StaticSoldier staticSoldier, List<String> soldierSkillStrings, int soldierType){
		soldierMobility = staticSoldier.getMobility();
		this.soldierAttack = staticSoldier.getSoldierAttack();
		this.soldierDefence = staticSoldier.getSoldierDefence();
		this.soldierCriticalStrike = (double)staticSoldier.getSoldierCritical()/Const.CHANGE_PERCENT_TO_VALUE;
		this.soldierHit = (double)staticSoldier.getSoldierHit()/Const.CHANGE_PERCENT_TO_VALUE;
		this.soldierDodge = (double)staticSoldier.getSoldierDodge()/Const.CHANGE_PERCENT_TO_VALUE;
		this.soldierHp = staticSoldier.getSoldierHp();
		//添加科技影响
		for(String j:soldierSkillStrings){
			StaticSoldierTech staticSoldierTech = SoldierTechCache.getTech(j);
			if(staticSoldierTech.getSoldierType()==soldierType){
				//添加科技影响
				if(staticSoldierTech.getAddSkill()!=null&&!staticSoldierTech.getAddSkill().equals("")){
					//如果是被动技能，添加
					staticSoldierSkill = SoldierSkillCache.getStaticSoldierSkill(staticSoldierTech.getAddSkill());
				}else if(staticSoldierTech.getValueMode()==2){
					//不是被动技能，添加属性影响
					soldierAttack*=(1+staticSoldierTech.getAddAtk()/Const.CHANGE_PERCENT_TO_VALUE);
					soldierDefence*=(1+staticSoldierTech.getAddDef()/Const.CHANGE_PERCENT_TO_VALUE);
					soldierCriticalStrike*=(1+staticSoldierTech.getAddCrt()/Const.CHANGE_PERCENT_TO_VALUE);
					soldierDodge*=(1+staticSoldierTech.getAddDodge()/Const.CHANGE_PERCENT_TO_VALUE);
					soldierHit*=(1+staticSoldierTech.getAddHit()/Const.CHANGE_PERCENT_TO_VALUE);
					soldierHp*=(1+staticSoldierTech.getAddHealth()/Const.CHANGE_PERCENT_TO_VALUE);
					
				}else if(staticSoldierTech.getValueMode()==1){
					soldierAttack+=staticSoldierTech.getAddAtk();
					soldierDefence+=staticSoldierTech.getAddDef();
					soldierCriticalStrike+=staticSoldierTech.getAddCrt()/Const.CHANGE_PERCENT_TO_VALUE;
					soldierDodge+=staticSoldierTech.getAddDodge()/Const.CHANGE_PERCENT_TO_VALUE;
					soldierHit+=staticSoldierTech.getAddHit()/Const.CHANGE_PERCENT_TO_VALUE;
					soldierHp+=staticSoldierTech.getAddHealth();
				}
			}
		}
	}
	public SoldierAttribute(StaticSoldier staticSoldier){
		soldierMobility = staticSoldier.getMobility();
		this.soldierAttack = staticSoldier.getSoldierAttack();
		this.soldierDefence = staticSoldier.getSoldierDefence();
		this.soldierCriticalStrike = (double)staticSoldier.getSoldierCritical()/Const.CHANGE_PERCENT_TO_VALUE;
		this.soldierHit = (double)staticSoldier.getSoldierHit()/Const.CHANGE_PERCENT_TO_VALUE;
		this.soldierDodge = (double)staticSoldier.getSoldierDodge()/Const.CHANGE_PERCENT_TO_VALUE;
		this.soldierHp = staticSoldier.getSoldierHp();
	}
	
	public double getSoldierMobility() {
		return soldierMobility;
	}
	public double getSoldierAttack() {
		return soldierAttack;
	}
	public double getSoldierDefence() {
		return soldierDefence;
	}
	public double getSoldierCriticalStrike() {
		return soldierCriticalStrike;
	}
	public double getSoldierHit() {
		return soldierHit;
	}
	public double getSoldierDodge() {
		return soldierDodge;
	}
	public void setSoldierMobility(double soldierMobility) {
		this.soldierMobility = soldierMobility;
	}
	public void setSoldierAttack(double soldierAttack) {
		this.soldierAttack = soldierAttack;
	}
	public void setSoldierDefence(double soldierDefence) {
		this.soldierDefence = soldierDefence;
	}
	public void setSoldierCriticalStrike(double soldierCriticalStrike) {
		this.soldierCriticalStrike = soldierCriticalStrike;
	}
	public void setSoldierHit(double soldierHit) {
		this.soldierHit = soldierHit;
	}
	public void setSoldierDodge(double soldierDodge) {
		this.soldierDodge = soldierDodge;
	}
	public int getSoldierHp() {
		return soldierHp;
	}
	public StaticSoldierSkill getStaticSoldierSkill() {
		return staticSoldierSkill;
	}
	public void setSoldierHp(int soldierHp) {
		this.soldierHp = soldierHp;
	}
	public void setStaticSoldierSkill(StaticSoldierSkill staticSoldierSkill) {
		this.staticSoldierSkill = staticSoldierSkill;
	}
}
