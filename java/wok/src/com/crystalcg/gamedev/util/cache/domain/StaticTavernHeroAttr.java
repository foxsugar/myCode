package com.crystalcg.gamedev.util.cache.domain;

/**
 * 武将属性刷新规则
 * 
 * @author xuzhongxing
 */
public class StaticTavernHeroAttr {
	private int quality;// 武将品阶
	private double minGift;// 最小根骨
	private double maxGift;// 最大根骨
	private int minAttr;// 最小属性
	private int maxAttr;// 最大属性
	private int minRate;// 最小概率 x‰
	private int maxRate;// 最大概率 x‰
	public int getQuality() {
		return quality;
	}
	public double getMinGift() {
		return minGift;
	}
	public double getMaxGift() {
		return maxGift;
	}
	public int getMinAttr() {
		return minAttr;
	}
	public int getMaxAttr() {
		return maxAttr;
	}
	public int getMinRate() {
		return minRate;
	}
	public int getMaxRate() {
		return maxRate;
	}
	public void setQuality(int quality) {
		this.quality = quality;
	}
	public void setMinGift(double minGift) {
		this.minGift = minGift;
	}
	public void setMaxGift(double maxGift) {
		this.maxGift = maxGift;
	}
	public void setMinAttr(int minAttr) {
		this.minAttr = minAttr;
	}
	public void setMaxAttr(int maxAttr) {
		this.maxAttr = maxAttr;
	}
	public void setMinRate(int minRate) {
		this.minRate = minRate;
	}
	public void setMaxRate(int maxRate) {
		this.maxRate = maxRate;
	}

}
