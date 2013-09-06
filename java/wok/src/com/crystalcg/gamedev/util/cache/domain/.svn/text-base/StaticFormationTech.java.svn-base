package com.crystalcg.gamedev.util.cache.domain;

/**
 * 阵法科技表
 * @author xuzhongxing
 *
 */
public class StaticFormationTech {

	private String techNo;// 科技的ID编号
	private String techName;// 科技的中文名称
	private int needTime;// 研究此项科技所需要的时间
	private int techLevel;// 该科技的当前级别
	private String formationNo;// 研究该科技后玩家获得的阵法信息
	private int techLocation;//阵法科技位置
	private String techIcon;//阵法科技图标
	private String description;//阵法科技描述

	public String getNeedTimeString(){
		int hour = (int)needTime/3600;
		int second = (int)needTime%60;
		int minute = (int)(needTime - second)/60%60;
		return hour+"小时"+minute+"分"+second+"秒";
	}
	public String getTechNo() {
		return techNo;
	}

	public String getTechName() {
		return techName;
	}

	public int getNeedTime() {
		return needTime;
	}

	public int getTechLevel() {
		return techLevel;
	}

	public String getFormationNo() {
		return formationNo;
	}

	public void setTechNo(String techNo) {
		this.techNo = techNo;
	}

	public void setTechName(String techName) {
		this.techName = techName;
	}

	public void setNeedTime(int needTime) {
		this.needTime = needTime;
	}

	public void setTechLevel(int techLevel) {
		this.techLevel = techLevel;
	}

	public void setFormationNo(String formationNo) {
		this.formationNo = formationNo;
	}
	public int getTechLocation() {
		return techLocation;
	}
	public void setTechLocation(int techLocation) {
		this.techLocation = techLocation;
	}
	public String getTechIcon() {
		return techIcon;
	}
	public String getDescription() {
		return description;
	}
	public void setTechIcon(String techIcon) {
		this.techIcon = techIcon;
	}
	public void setDescription(String description) {
		this.description = description;
	}


}
