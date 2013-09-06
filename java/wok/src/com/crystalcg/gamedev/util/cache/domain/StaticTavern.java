package com.crystalcg.gamedev.util.cache.domain;

/**
 * 酒馆武将刷新规则
 * 
 * @author xuzhongxing
 * 
 */
public class StaticTavern {

	private int level;// 酒馆等级
	private int whiteHeroRate;// 刷新出白色将领的概率
	private int greenHeroRate;// 刷新出绿色将领的概率
	private int blueHeroRate;// 刷新出蓝色将领的概率
	private int purpleHeroRate;// 刷新出紫色将领的概率
	private int orangeHeroRate;// 刷新出橙色将领的概率
	private int redHeroRate;// 刷新出红色将领的概率

	public int getLevel() {
		return level;
	}

	public int getWhiteHeroRate() {
		return whiteHeroRate;
	}

	public int getGreenHeroRate() {
		return greenHeroRate;
	}

	public int getBlueHeroRate() {
		return blueHeroRate;
	}

	public int getPurpleHeroRate() {
		return purpleHeroRate;
	}

	public int getOrangeHeroRate() {
		return orangeHeroRate;
	}

	public int getRedHeroRate() {
		return redHeroRate;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public void setWhiteHeroRate(int whiteHeroRate) {
		this.whiteHeroRate = whiteHeroRate;
	}

	public void setGreenHeroRate(int greenHeroRate) {
		this.greenHeroRate = greenHeroRate;
	}

	public void setBlueHeroRate(int blueHeroRate) {
		this.blueHeroRate = blueHeroRate;
	}

	public void setPurpleHeroRate(int purpleHeroRate) {
		this.purpleHeroRate = purpleHeroRate;
	}

	public void setOrangeHeroRate(int orangeHeroRate) {
		this.orangeHeroRate = orangeHeroRate;
	}

	public void setRedHeroRate(int redHeroRate) {
		this.redHeroRate = redHeroRate;
	}

}
