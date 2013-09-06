package com.crystalcg.gamedev.util.cache.domain;


/**
 * 城池等级信息表
 * 
 * @author lvxiaohui
 * 
 */
public class StaticQuest {
	private String questNo;
	private String questName;
	private int questType;//1=主线任务  2=支线任务  3=声望任务  4=武将任务  5=活动任务
	private int resetTyp;//进度重置类型:0=不可重置   1=日重置   2=周重置   3=月重置
	private int needType;//前置条件类型：1=君主等级   2=城池等级  
	private int needValue;// 
	private String needQuestNo;//前置任务编号
	private int targetType;//任务目标类型
	private String targetStr;//任务目标
	private int targetNum;//任务目标数量（等级）
	private int timeLimit;//限时
	private int monExp;//奖励君主经验
	private int copper;//奖励铜币
	private int iornbar;//奖励铁锭
	private int wood;//木材
	private int forage;//粮草
	private int credit;//声望
	private int solider;//士兵
	private int population;//人口
	private String itemNo;//奖励物品编号
	private String itemType;//奖励物品数量
	private String itemNum;//奖励物品数量
	private String questDesc;//任务文字描述
	private String targetDesc;//任务目标简要描述
	
//	private Map<String,Integer> target;//目标
	
	public String getQuestNo() {
		return questNo;
	}
	public void setQuestNo(String questNo) {
		this.questNo = questNo;
	}
	public String getQuestName() {
		return questName;
	}
	public void setQuestName(String questName) {
		this.questName = questName;
	}
	public int getQuestType() {
		return questType;
	}
	public void setQuestType(int questType) {
		this.questType = questType;
	}
	public int getResetTyp() {
		return resetTyp;
	}
	public void setResetTyp(int resetTyp) {
		this.resetTyp = resetTyp;
	}
	public int getNeedType() {
		return needType;
	}
	public void setNeedType(int needType) {
		this.needType = needType;
	}
	public String getNeedQuestNo() {
		return needQuestNo;
	}
	public void setNeedQuestNo(String needQuestNo) {
		this.needQuestNo = needQuestNo;
	}
	public int getTargetType() {
		return targetType;
	}
	public void setTargetType(int targetType) {
		this.targetType = targetType;
	}
	public int getNeedValue() {
		return needValue;
	}
	public void setNeedValue(int needValue) {
		this.needValue = needValue;
	}
	public int getTimeLimit() {
		return timeLimit;
	}
	public int getTargetNum() {
		return targetNum;
	}
	public void setTargetNum(int targetNum) {
		this.targetNum = targetNum;
	}
	public void setTimeLimit(int timeLimit) {
		this.timeLimit = timeLimit;
	}
	public int getMonExp() {
		return monExp;
	}
	public void setMonExp(int monExp) {
		this.monExp = monExp;
	}
	public int getCopper() {
		return copper;
	}
	public void setCopper(int copper) {
		this.copper = copper;
	}
	public int getIornbar() {
		return iornbar;
	}
	public void setIornbar(int iornbar) {
		this.iornbar = iornbar;
	}
	public int getWood() {
		return wood;
	}
	public void setWood(int wood) {
		this.wood = wood;
	}
	public int getForage() {
		return forage;
	}
	public void setForage(int forage) {
		this.forage = forage;
	}
	public int getCredit() {
		return credit;
	}
	public void setCredit(int credit) {
		this.credit = credit;
	}
	public int getSolider() {
		return solider;
	}
	public void setSolider(int solider) {
		this.solider = solider;
	}
	public int getPopulation() {
		return population;
	}
	public void setPopulation(int population) {
		this.population = population;
	}
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public String getItemNum() {
		return itemNum;
	}
	public void setItemNum(String itemNum) {
		this.itemNum = itemNum;
	}
	public String getQuestDesc() {
		return questDesc;
	}
	public void setQuestDesc(String questDesc) {
		this.questDesc = questDesc;
	}
	public String getTargetDesc() {
		return targetDesc;
	}
	public void setTargetDesc(String targetDesc) {
		this.targetDesc = targetDesc;
	}
	public String getTargetStr() {
		return targetStr;
	}
	public void setTargetStr(String targetStr) {
		this.targetStr = targetStr;
	}
//	/**
//	 * 获得任务目标集合
//	 * 目标类型-<目标编号-目标数值>
//	 * @return
//	 */
//	public Map<String, Integer> getTarget() {
//		return target;
//	}
//	/**
//	 * 封装任务目标
//	 */
//	public void setTarget() {
////		Map<String, Integer> targetMap = new ArrayList<>();
//		Map<String, Integer> target = new HashMap<String, Integer>();
//		if(this.getTargetStr() != null && !this.getTargetStr().isEmpty()){
//			String[] targetStr = this.getTargetStr().split(",");
//			String[] targetNum = this.getTargetNum().split(",");
//			for(int i = 0;i < targetStr.length; i++){
//				target.put(targetStr[i], Integer.parseInt(targetNum[i]));
////				targetMap.add(target);
//			}
//		}else{
//			target.put(null, Integer.parseInt(getTargetNum()));
////			targetMap.add(target);
//		}
//		this.target = target;
//	}
	public String getItemType() {
		return itemType;
	}
	public void setItemType(String itemType) {
		this.itemType = itemType;
	}
}
