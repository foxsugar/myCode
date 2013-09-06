package com.crystalcg.gamedev.battleProcess.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SingleBattle {
	public static final int DELAY_STATUS_NO_DELAY = 0;//延时状态，没有延时
	public static final int DELAY_STATUS_READY = 1;//延时状态，动作延时
	public static final int DELAY_STATUS_ACTION = 2;//延时状态，动作延时
	public static final int DELAY_STATUS_ROUND_END = 3;//延时状态，回合结束清算延时
	
	private int battleId;//战场Id
	private boolean canEnter;//是否可进入
	private SingleBattleObject heroA;//进攻方
	private SingleBattleObject heroB;//防御方
	private int delayStatus;//延时类型
	private int miniRoundAmout;//小回合数,没有具体意义，用于计算大回合数
	private int largeRoundAmount;//大回合数
	private List<SingleBattleObject> heroOrder;//出手顺序
	private int roundTime;//回合时间,单位秒
	private boolean fighting;//是否战斗中
	private Map<Integer, SingleBattleObject> authorityMap;//按characterId获取单挑类
	private Map<Integer, SingleBattleObject> locationMap;//按locationId获取单挑类
	
	
	public SingleBattle(){
		
	}
	/**
	 * 对单挑战场类进行创建
	 * @param battleId
	 * @param roundTime
	 * @param heroA
	 * @param heroB
	 */
	public SingleBattle(int battleId, int roundTime, SingleBattleObject heroA, SingleBattleObject heroB){
		this.battleId = battleId;
		this.roundTime = roundTime;
		this.heroA = heroA;
		this.heroB = heroB;
		canEnter = false;
		delayStatus = DELAY_STATUS_ROUND_END;
		miniRoundAmout = 0;
		largeRoundAmount = 1;
		heroOrder = new ArrayList<SingleBattleObject>();
		authorityMap = new HashMap<Integer, SingleBattleObject>();
		locationMap = new HashMap<Integer, SingleBattleObject>();
		//写入战场权限
		if(heroA.getCharacterId()!=0){
			authorityMap.put(heroA.getCharacterId(), heroA);
		}
		if(heroB.getCharacterId()!=0){
			authorityMap.put(heroB.getCharacterId(), heroB);
		}
		locationMap.put(heroA.getHeroForBattle().getLocationId(), heroA);
		locationMap.put(heroB.getHeroForBattle().getLocationId(), heroB);
		heroOrder.add(heroA);
		heroOrder.add(heroB);
		sortHeroOrder();
//		if(heroA.getHeroForBattle().getAgility()<heroB.getHeroForBattle().getAgility()){
//			heroB.setTurn(true);
//		}else{
//			heroOrder.add(heroA);
//			heroOrder.add(heroB);
//			heroA.setTurn(true);
//		}
	}
	public void sortHeroOrder(){
		Collections.sort(heroOrder);
	}
	/**
	 * 获取执行操作的武将
	 * @return
	 */
	public SingleBattleObject getOperateHero(){
		int size = heroOrder.size();
		return heroOrder.get(miniRoundAmout%size);
	}
	/**
	 * 获取执行操作的武将
	 * @return
	 */
	public SingleBattleObject getTargetHero(){
		int size = heroOrder.size();
		return heroOrder.get((miniRoundAmout+1)%size);
	}
	/**
	 * 获取与characterId相对的武将
	 * @return
	 */
	public SingleBattleObject getTargetHero(int characterId){
		SingleBattleObject singleBattleObject = authorityMap.get(characterId);
		int location = singleBattleObject.getHeroForBattle().getLocationId();
		return locationMap.get(location^1);
	}
//	public HeroForBattle getHeroInfoByLocationId(int id){
//		if(id==Const.SINGLE_BATTLE_LOCATION_A_ID){
//			return heroA.getHeroForBattle();
//		}else if(id==Const.SINGLE_BATTLE_LOCATION_B_ID){
//			return heroB.getHeroForBattle();
//		}else{
//			return null;
//		}
//	}



	public int getBattleId() {
		return battleId;
	}



	public boolean isCanEnter() {
		return canEnter;
	}



	public SingleBattleObject getHeroA() {
		return heroA;
	}



	public SingleBattleObject getHeroB() {
		return heroB;
	}



	public int getDelayStatus() {
		return delayStatus;
	}



	public int getMiniRoundAmout() {
		return miniRoundAmout;
	}



	public int getLargeRoundAmount() {
		return largeRoundAmount;
	}



	public void setBattleId(int battleId) {
		this.battleId = battleId;
	}



	public void setCanEnter(boolean canEnter) {
		this.canEnter = canEnter;
	}



	public void setHeroA(SingleBattleObject heroA) {
		this.heroA = heroA;
	}



	public void setHeroB(SingleBattleObject heroB) {
		this.heroB = heroB;
	}



	public void setDelayStatus(int delayStatus) {
		this.delayStatus = delayStatus;
	}



	public void setMiniRoundAmout(int miniRoundAmout) {
		this.miniRoundAmout = miniRoundAmout;
	}



	public void setLargeRoundAmount(int largeRoundAmount) {
		this.largeRoundAmount = largeRoundAmount;
	}



	public List<SingleBattleObject> getHeroOrder() {
		return heroOrder;
	}



	public void setHeroOrder(List<SingleBattleObject> heroOrder) {
		this.heroOrder = heroOrder;
	}



	public int getRoundTime() {
		return roundTime;
	}



	public void setRoundTime(int roundTime) {
		this.roundTime = roundTime;
	}
	public Map<Integer, SingleBattleObject> getAuthorityMap() {
		return authorityMap;
	}
	public void setAuthorityMap(Map<Integer, SingleBattleObject> authorityMap) {
		this.authorityMap = authorityMap;
	}
	public boolean isFighting() {
		return fighting;
	}
	public void setFighting(boolean fighting) {
		this.fighting = fighting;
	}
	public Map<Integer, SingleBattleObject> getLocationMap() {
		return locationMap;
	}
	public void setLocationMap(Map<Integer, SingleBattleObject> locationMap) {
		this.locationMap = locationMap;
	}


}
