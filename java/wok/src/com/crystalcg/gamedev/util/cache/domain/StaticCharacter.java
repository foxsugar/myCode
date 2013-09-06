package com.crystalcg.gamedev.util.cache.domain;

/**
 * 君主等级信息表
 * 
 * @author xuzhongxing
 * 
 */
public class StaticCharacter {
	private int level;// 君主等级
	private int experience;// 升级的需求经验
	private int heroLimit;// 在该等级下最多能招募的武将

	public int getLevel() {
		return level;
	}

	public int getExperience() {
		return experience;
	}

	public int getHeroLimit() {
		return heroLimit;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	public void setHeroLimit(int heroLimit) {
		this.heroLimit = heroLimit;
	}

}
