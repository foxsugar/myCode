package com.crystalcg.gamedev.util.cache.domain;

import com.crystalcg.gamedev.util.HeroAlgorithm;

/**
 * 野怪静态信息
 * 
 * @author jinganyang
 * 
 */
public class StaticEnemyNPC {

	private String enemyNo; // 野外势力编号
	private String enemyName; // 野外势力名称
	private String flag;//旗帜
	private int soldierNum; // 士兵数量
	private String soldierType1; // 兵种1编号
	private String soldierType2; // 兵种2编号
	private String soldierType3; // 兵种3编号
	private String soldierType4; // 兵种4编号
	private String soldierType5; // 兵种5编号
	private String formationNo; // 阵法类型
	private int heroLevel;// 武将等级
	private int heroForce;// 武将武力
	private int heroStrategy;// 武将谋虑
	private int heroPhysique; // 武将体质
	private int heroAgility; // 武将身法
	private String aiNo; // AI编号
	private String heroIcon; // 武将图标
	private String smallHeroIcon; // 武将小图标
	private String description; // 描述
	private int forceLevel; // 势力级别，1=初级 2=中级 3=高级
	private String heroAction; // 武将动作资源
	private String img ;//世界地图上图片资源编号
	///表中没有
	private int needTime;
	private double singleForce;//野怪单挑力
	private double multiForce;//军团战斗力

	public int getHpMax(){
		return (int)(60*heroLevel+heroPhysique/2);
	}
	public String getEnemyNo() {
		return enemyNo;
	}

	public String getEnemyName() {
		return enemyName;
	}

	public int getSoldierNum() {
		return soldierNum;
	}

	public String getSoldierType1() {
		return soldierType1;
	}

	public String getSoldierType2() {
		return soldierType2;
	}

	public String getSoldierType3() {
		return soldierType3;
	}

	public String getSoldierType4() {
		return soldierType4;
	}

	public String getSoldierType5() {
		return soldierType5;
	}

	public String getFormationNo() {
		return formationNo;
	}

	public int getHeroLevel() {
		return heroLevel;
	}

	public int getHeroForce() {
		return heroForce;
	}

	public int getHeroStrategy() {
		return heroStrategy;
	}

	public int getHeroPhysique() {
		return heroPhysique;
	}

	public int getHeroAgility() {
		return heroAgility;
	}

	public String getAiNo() {
		return aiNo;
	}

	public String getHeroIcon() {
		return heroIcon;
	}

	public String getSmallHeroIcon() {
		return smallHeroIcon;
	}

	public String getDescription() {
		return description;
	}

	public int getForceLevel() {
		return forceLevel;
	}

	public String getHeroAction() {
		return heroAction;
	}

	public void setEnemyNo(String enemyNo) {
		this.enemyNo = enemyNo;
	}

	public void setEnemyName(String enemyName) {
		this.enemyName = enemyName;
	}

	public void setSoldierNum(int soldierNum) {
		this.soldierNum = soldierNum;
	}

	public void setSoldierType1(String soldierType1) {
		this.soldierType1 = soldierType1;
	}

	public void setSoldierType2(String soldierType2) {
		this.soldierType2 = soldierType2;
	}

	public void setSoldierType3(String soldierType3) {
		this.soldierType3 = soldierType3;
	}

	public void setSoldierType4(String soldierType4) {
		this.soldierType4 = soldierType4;
	}

	public void setSoldierType5(String soldierType5) {
		this.soldierType5 = soldierType5;
	}

	public void setFormationNo(String formationNo) {
		this.formationNo = formationNo;
	}

	public void setHeroLevel(int heroLevel) {
		this.heroLevel = heroLevel;
	}

	public void setHeroForce(int heroForce) {
		this.heroForce = heroForce;
	}

	public void setHeroStrategy(int heroStrategy) {
		this.heroStrategy = heroStrategy;
	}

	public void setHeroPhysique(int heroPhysique) {
		this.heroPhysique = heroPhysique;
	}

	public void setHeroAgility(int heroAgility) {
		this.heroAgility = heroAgility;
	}

	public void setAiNo(String aiNo) {
		this.aiNo = aiNo;
	}

	public void setHeroIcon(String heroIcon) {
		this.heroIcon = heroIcon;
	}

	public void setSmallHeroIcon(String smallHeroIcon) {
		this.smallHeroIcon = smallHeroIcon;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setForceLevel(int forceLevel) {
		this.forceLevel = forceLevel;
	}

	public void setHeroAction(String heroAction) {
		this.heroAction = heroAction;
	}

	public int getNeedTime() {
		return needTime;
	}

	public void setNeedTime(int needTime) {
		this.needTime = needTime;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public double getSingleForce() {
		if(singleForce==0){
			singleForce = HeroAlgorithm.computeEnemySingleForce(this);
		}
		return singleForce;
	}
	public double getMultiForce() {
		if(multiForce==0){
			multiForce = HeroAlgorithm.computeEnemyFightingCapacity(this);
		}
		return multiForce;
	}
	public void setSingleForce(double singleForce) {
		this.singleForce = singleForce;
	}
	public void setMultiForce(double multiForce) {
		this.multiForce = multiForce;
	}
}
