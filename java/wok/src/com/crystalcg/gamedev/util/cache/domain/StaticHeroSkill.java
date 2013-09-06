package com.crystalcg.gamedev.util.cache.domain;

import com.crystalcg.gamedev.util.cache.HeroSkillCache;

/**
 * 武将技能
 * 
 * @author xuzhongxing
 * 
 */
public class StaticHeroSkill {
	private String skillNo;// 技能编号
	private String name;// 技能名
	private int level;// 技能等级
	private String icon;// 技能图标
	private String animationSingle;// 技能动画
	private String animationMulti;// 技能动画
	private String heroAction;// 武将动作
	private String description;// 技能描述
	private int needHeroLevel;// 学习技能需要的武将等级
	private int type;// 技能的分类（1=单挑技 2=战阵技 3=全场合适用）
	private int dmgType;// 技能的伤害类型（1=物理型 2=计略型 3=无属性）
	private int targetLimit;// 可被施展的目标（1=敌方 2=自身 3=友方部队 4=敌我双方）
	private int skillRange;// 以被施法目标为中心的效果范围（1=1 2=5 3=9 4=13 5=全屏)
	private int effectType;// 技能效果的类型（1=伤害 2=治疗 3=持续性属性增减 4=持续性伤害/治疗 5=持续性特殊效果）
	private int effectMode;// 效果值的影响方式（1=数值，2=百分比，3=特殊效果）
	private int effectValue;// 效果的具体值
	private int needWeapon;// 装备相应类型的武器才能施展（0=无要求 1=短柄 2=长柄 3=弓）
	private int coolDown;// 技能的冷却时间（回合数）
	private int upgradeNeedExp;// 升级所需的经验
	private String upgradeNeedItem;// 升级所需的物品（编号）
	private int upgradeNeedItemNum;// 升级所需的物品数目
	private int needVnp;// 使用技能所需要耗费的精力（不足则无法使用）
	private String needItem;// 使用技能所需要耗费的材料（不足则无法使用）
	private int needItemNum;// 使用技能所需要耗费的材料数目
	private String addEffect1;// 附加的效果编号
	private int addEffectRate1;// 附加效果的触发率
	private String addEffect2;//
	private int addEffectRate2;//
	private String addEffect3;//
	private int addEffectRate3;//

	
	public StaticHeroSkillLastEffect getEffectEntity1(){
		if(addEffect1==null){
			return null;
		}else{
			return HeroSkillCache.getHeroSkillLastEffect(addEffect1);
		}
	}
	public StaticHeroSkillLastEffect getEffectEntity2(){
		if(addEffect2==null){
			return null;
		}else{
			return HeroSkillCache.getHeroSkillLastEffect(addEffect2);
		}
	}
	public StaticHeroSkillLastEffect getEffectEntity3(){
		if(addEffect3==null){
			return null;
		}else{
			return HeroSkillCache.getHeroSkillLastEffect(addEffect3);
		}
	}
	public String getSkillNo() {
		return skillNo;
	}

	public String getName() {
		return name;
	}

	public int getLevel() {
		return level;
	}

	public String getIcon() {
		return icon;
	}


	public String getDescription() {
		return description;
	}

	public int getType() {
		return type;
	}

	public int getDmgType() {
		return dmgType;
	}

	public int getTargetLimit() {
		return targetLimit;
	}

	public int getSkillRange() {
		return skillRange;
	}

	public int getEffectType() {
		return effectType;
	}

	public int getEffectMode() {
		return effectMode;
	}

	public int getEffectValue() {
		return effectValue;
	}

	public int getNeedWeapon() {
		return needWeapon;
	}

	public int getCoolDown() {
		return coolDown;
	}

	public int getUpgradeNeedExp() {
		return upgradeNeedExp;
	}

	public String getUpgradeNeedItem() {
		return upgradeNeedItem;
	}

	public int getUpgradeNeedItemNum() {
		return upgradeNeedItemNum;
	}

	public int getNeedVnp() {
		return needVnp;
	}

	public String getNeedItem() {
		return needItem;
	}

	public int getNeedItemNum() {
		return needItemNum;
	}

	public String getAddEffect1() {
		return addEffect1;
	}

	public int getAddEffectRate1() {
		return addEffectRate1;
	}

	public String getAddEffect2() {
		return addEffect2;
	}

	public int getAddEffectRate2() {
		return addEffectRate2;
	}

	public String getAddEffect3() {
		return addEffect3;
	}

	public int getAddEffectRate3() {
		return addEffectRate3;
	}

	public void setSkillNo(String skillNo) {
		this.skillNo = skillNo;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}


	public void setDescription(String description) {
		this.description = description;
	}

	public void setType(int type) {
		this.type = type;
	}

	public void setDmgType(int dmgType) {
		this.dmgType = dmgType;
	}

	public void setTargetLimit(int targetLimit) {
		this.targetLimit = targetLimit;
	}

	public void setSkillRange(int skillRange) {
		this.skillRange = skillRange;
	}

	public void setEffectType(int effectType) {
		this.effectType = effectType;
	}

	public void setEffectMode(int effectMode) {
		this.effectMode = effectMode;
	}

	public void setEffectValue(int effectValue) {
		this.effectValue = effectValue;
	}

	public void setNeedWeapon(int needWeapon) {
		this.needWeapon = needWeapon;
	}

	public void setCoolDown(int coolDown) {
		this.coolDown = coolDown;
	}

	public void setUpgradeNeedExp(int upgradeNeedExp) {
		this.upgradeNeedExp = upgradeNeedExp;
	}

	public void setUpgradeNeedItem(String upgradeNeedItem) {
		this.upgradeNeedItem = upgradeNeedItem;
	}

	public void setUpgradeNeedItemNum(int upgradeNeedItemNum) {
		this.upgradeNeedItemNum = upgradeNeedItemNum;
	}

	public void setNeedVnp(int needVnp) {
		this.needVnp = needVnp;
	}

	public void setNeedItem(String needItem) {
		this.needItem = needItem;
	}

	public void setNeedItemNum(int needItemNum) {
		this.needItemNum = needItemNum;
	}

	public void setAddEffect1(String addEffect1) {
		this.addEffect1 = addEffect1;
	}

	public void setAddEffectRate1(int addEffectRate1) {
		this.addEffectRate1 = addEffectRate1;
	}

	public void setAddEffect2(String addEffect2) {
		this.addEffect2 = addEffect2;
	}

	public void setAddEffectRate2(int addEffectRate2) {
		this.addEffectRate2 = addEffectRate2;
	}

	public void setAddEffect3(String addEffect3) {
		this.addEffect3 = addEffect3;
	}

	public void setAddEffectRate3(int addEffectRate3) {
		this.addEffectRate3 = addEffectRate3;
	}

	public int getNeedHeroLevel() {
		return needHeroLevel;
	}

	public void setNeedHeroLevel(int needHeroLevel) {
		this.needHeroLevel = needHeroLevel;
	}

	public String getHeroAction() {
		return heroAction;
	}

	public void setHeroAction(String heroAction) {
		this.heroAction = heroAction;
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

}
