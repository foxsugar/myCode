package com.crystalcg.gamedev.battleProcess.domain;

import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;

public class SkillOjbect {
	private StaticHeroSkill staticHeroSkill;//武将技能静态实体,静态信息，只读
	private int beginRound;//释放回合(大回合数)
	
	
	public SkillOjbect(){
		
	}
	public SkillOjbect(StaticHeroSkill staticHeroSkill){
		this.staticHeroSkill = staticHeroSkill;
		beginRound=-1;//-1回合代表没释放过
	}
	/**
	 * 获取冷却剩余回合数
	 * @param largeRoundAmount
	 * @return
	 */
	public int getRemainRound(int largeRoundAmount){
		if(beginRound==-1){
			return 0;
		}else{
			int remainRound = beginRound+staticHeroSkill.getCoolDown()-largeRoundAmount;
			return remainRound<0?0:remainRound;
		}
	}
	public boolean isCanUse(int mp){
		return mp<staticHeroSkill.getNeedVnp()?false:true;
	}
	public StaticHeroSkill getStaticHeroSkill() {
		return staticHeroSkill;
	}
	public int getBeginRound() {
		return beginRound;
	}
	public void setStaticHeroSkill(StaticHeroSkill staticHeroSkill) {
		this.staticHeroSkill = staticHeroSkill;
	}
	public void setBeginRound(int beginRound) {
		this.beginRound = beginRound;
	}
}
