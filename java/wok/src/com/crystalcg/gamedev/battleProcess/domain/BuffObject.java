package com.crystalcg.gamedev.battleProcess.domain;

import com.crystalcg.gamedev.util.BattleMath;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkillLastEffect;

public class BuffObject {
	StaticHeroSkillLastEffect staticHeroSkillLastEffect;
	private int beginRound;//释放回合(大回合数)
	private int absorbHurt;
	private int hurt;//每回合伤害，临时值
	public BuffObject(){
		
	}
	public BuffObject(int beginRound, StaticHeroSkillLastEffect staticHeroSkillLastEffect, int hurt){
		this.beginRound = beginRound;
		this.staticHeroSkillLastEffect= staticHeroSkillLastEffect;
		this.hurt = hurt;
		if(staticHeroSkillLastEffect.getType()==BattleMath.BUFF_EFFECT_TYPE_REDUCE_HURT){
			absorbHurt = staticHeroSkillLastEffect.getValue();
		}
	}
	public StaticHeroSkillLastEffect getStaticHeroSkillLastEffect() {
		return staticHeroSkillLastEffect;
	}
	public int getBeginRound() {
		return beginRound;
	}
	public void setStaticHeroSkillLastEffect(
			StaticHeroSkillLastEffect staticHeroSkillLastEffect) {
		this.staticHeroSkillLastEffect = staticHeroSkillLastEffect;
	}
	public void setBeginRound(int beginRound) {
		this.beginRound = beginRound;
	}
	
	/**
	 * 获取冷却剩余回合数
	 * @param largeRoundAmount
	 * @return
	 */
	public int getRemainRound(int largeRoundAmount){
		int remainRound = beginRound+staticHeroSkillLastEffect.getLastTime()-largeRoundAmount;
		return remainRound<0?0:remainRound;
	}
	public int getAbsorbHurt() {
		return absorbHurt;
	}
	public void setAbsorbHurt(int absorbHurt) {
		this.absorbHurt = absorbHurt;
	}
	public int getHurt() {
		return hurt;
	}
	public void setHurt(int hurt) {
		this.hurt = hurt;
	}
}
