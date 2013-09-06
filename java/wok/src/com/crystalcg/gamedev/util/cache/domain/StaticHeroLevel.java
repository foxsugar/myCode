package com.crystalcg.gamedev.util.cache.domain;

/**
 * 武将等级信息表
 * @author xuzhongxing
 *
 */
public class StaticHeroLevel {
	private int heroLevel;// 武将等级
	private int expLimit;// 升级的需求经验
	private int poolLimit;// 经验池能储存经验数目的最大值

	public int getHeroLevel() {
		return heroLevel;
	}

	public int getExpLimit() {
		return expLimit;
	}

	public int getPoolLimit() {
		return poolLimit;
	}

	public void setHeroLevel(int heroLevel) {
		this.heroLevel = heroLevel;
	}

	public void setExpLimit(int expLimit) {
		this.expLimit = expLimit;
	}

	public void setPoolLimit(int poolLimit) {
		this.poolLimit = poolLimit;
	}

}
