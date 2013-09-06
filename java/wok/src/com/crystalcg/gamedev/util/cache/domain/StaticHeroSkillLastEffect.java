package com.crystalcg.gamedev.util.cache.domain;

/**
 * 武将技能持续性效果表
 * 
 * @author xuzhongxing
 * 
 */
public class StaticHeroSkillLastEffect {
	private String effectNo;// 效果编号
	private String icon;// 效果图标
	private String description;// 效果描述
	private String animationSingle;// 技能动画单挑
	private String animationMulti;// 技能动画讨伐
	private int targetLimit;//作用目标
	private int lastTime;// 效果持续的时间（回合数） （0=瞬时 自然数=持续的回合数 
	private int coexistType;// 共存类型
	private int dispelable;// 能否净化
	private int type;// 效果类型
	private int mode;// 效果值的影响方式（1=数值，2=百分比）
	private int value;// 效果的具体值
	private int heroForce;// 武力的改变（前面添加“-”号为减少)
	private int strategy;// 谋略的改变（前面添加“-”号为减少)
	private int agility;// 身法的改变（前面添加“-”号为减少)
	private int physique;// 体质的改变（前面添加“-”号为减少)
	private int atk;// 攻击力的改变（前面添加“-”号为减少)
	private int def;// 防御力的改变（前面添加“-”号为减少)
	private int crit;// 暴击率的改变（前面添加“-”号为减少)
	private int hit;// 命中率的改变（前面添加“-”号为减少)
	private int dodge;// 闪避率的改变（前面添加“-”号为减少)
	private int mobility;// 行动力的改变（前面添加“-”号为减少)
	public String getEffectNo() {
		return effectNo;
	}
	public String getIcon() {
		return icon;
	}
	public String getDescription() {
		return description;
	}
	public int getLastTime() {
		return lastTime;
	}
	public int getCoexistType() {
		return coexistType;
	}
	public int getDispelable() {
		return dispelable;
	}
	public int getType() {
		return type;
	}
	public int getMode() {
		return mode;
	}
	public int getValue() {
		return value;
	}
	public int getHeroForce() {
		return heroForce;
	}
	public int getStrategy() {
		return strategy;
	}
	public int getAgility() {
		return agility;
	}
	public int getPhysique() {
		return physique;
	}
	public int getAtk() {
		return atk;
	}
	public int getDef() {
		return def;
	}
	public int getCrit() {
		return crit;
	}
	public int getHit() {
		return hit;
	}
	public int getDodge() {
		return dodge;
	}
	public int getMobility() {
		return mobility;
	}
	public void setEffectNo(String effectNo) {
		this.effectNo = effectNo;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setLastTime(int lastTime) {
		this.lastTime = lastTime;
	}
	public void setCoexistType(int coexistType) {
		this.coexistType = coexistType;
	}
	public void setDispelable(int dispelable) {
		this.dispelable = dispelable;
	}
	public void setType(int type) {
		this.type = type;
	}
	public void setMode(int mode) {
		this.mode = mode;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public void setHeroForce(int heroForce) {
		this.heroForce = heroForce;
	}
	public void setStrategy(int strategy) {
		this.strategy = strategy;
	}
	public void setAgility(int agility) {
		this.agility = agility;
	}
	public void setPhysique(int physique) {
		this.physique = physique;
	}
	public void setAtk(int atk) {
		this.atk = atk;
	}
	public void setDef(int def) {
		this.def = def;
	}
	public void setCrit(int crit) {
		this.crit = crit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
	public void setDodge(int dodge) {
		this.dodge = dodge;
	}
	public void setMobility(int mobility) {
		this.mobility = mobility;
	}
	public String getAnimationSingle() {
		return animationSingle;
	}
	public String getAnimationMulti() {
		return animationMulti;
	}
	public void setAnimationSingle(String animationSingle) {
		this.animationSingle = animationSingle;
	}
	public void setAnimationMulti(String animationMulti) {
		this.animationMulti = animationMulti;
	}
	public int getTargetLimit() {
		return targetLimit;
	}
	public void setTargetLimit(int targetLimit) {
		this.targetLimit = targetLimit;
	}

}
