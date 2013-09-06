package com.crystalcg.gamedev.hero.domain;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.crystalcg.gamedev.util.FloatUtil;

/**
 * 名将 临时保存酒馆武将
 * 
 * @author xuzhongxing
 * 
 */
public class Hero implements Cloneable {

	private int id;// 武将Id
	private String heroName;// 武将名称
	private int heroType;// 武将类型,1仙师，2天策，3白羽
	private int gender;// 武将性别
	private String heroIcon;// 武将头像大图标资源名
	private int force;// 原始武力值，最初1级时的武力值
	private int strategy;// 原始谋略，最初1级时的谋略
	private int physique;// 原始体力值，最初1级时的体力值
	private int agility;// 原始身法值，最初1级时的身法值
	private int quality;// 品级
	private double realGift;// 根骨
	private String gift;//显示所需根骨
	private int needMoney;// 招募武将所需铜币
	@JsonIgnore
	private String heroAction;// 武将动作资源名
	@JsonIgnore
	private String smallHeroIcon;// 武将小图标名

	public int getId() {
		return id;
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

	public int getForce() {
		return force;
	}

	public int getStrategy() {
		return strategy;
	}

	public int getPhysique() {
		return physique;
	}

	public int getAgility() {
		return agility;
	}

	public int getQuality() {
		return quality;
	}

	public int getNeedMoney() {
		return needMoney;
	}

	public String getHeroAction() {
		return heroAction;
	}

	public String getSmallHeroIcon() {
		return smallHeroIcon;
	}

	public void setId(int id) {
		this.id = id;
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

	public void setForce(int force) {
		this.force = force;
	}

	public void setStrategy(int strategy) {
		this.strategy = strategy;
	}

	public void setPhysique(int physique) {
		this.physique = physique;
	}

	public void setAgility(int agility) {
		this.agility = agility;
	}

	public void setQuality(int quality) {
		this.quality = quality;
	}

	public void setNeedMoney(int needMoney) {
		this.needMoney = needMoney;
	}

	public void setHeroAction(String heroAction) {
		this.heroAction = heroAction;
	}

	public void setSmallHeroIcon(String smallHeroIcon) {
		this.smallHeroIcon = smallHeroIcon;
	}

	public double getRealGift() {
		return realGift;
	}

	public String getGift() {
		return gift;
	}

	public void setRealGift(double realGift) {
		this.realGift = realGift;
		this.gift = FloatUtil.format(realGift, 1);
	}

	public int getHeroType() {
		return heroType;
	}

	public void setHeroType(int heroType) {
		this.heroType = heroType;
	}

}
