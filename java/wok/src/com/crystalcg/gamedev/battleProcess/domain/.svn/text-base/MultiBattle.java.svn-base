package com.crystalcg.gamedev.battleProcess.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.util.Const;

/**
 * 战场类，讨伐
 * @author jinganyang
 *
 */
public class MultiBattle{
	
	public static final int DELAY_STATUS_NO_DELAY = 0;//延时状态，没有延时
	public static final int DELAY_STATUS_READY = 1;//延时状态，战长开启
	public static final int DELAY_STATUS_ACTION = 2;//延时状态，动作延时
	public static final int DELAY_STATUS_START = 3;//延时状态，回合开始清算延时
	public static final int DELAY_STATUS_ROUND_READY = 4;//延时状态，回合准备
	public static final int DELAY_STATUS_ROUND_END = 5;//延时状态，回合准备
	
	private String battleId;
	private boolean canEnter;
	private MultiBattleObject playerA;//攻击方
	private MultiBattleObject playerB;//防御方
	private int delayStatus;
	private int miniRoundAmout;//小回合数,没有具体意义，用于计算大回合数
	private int largeRoundAmount;//大回合数
	private List<SoldierForBattle> order;//出手顺序
	private int roundTime;//回合时间,单位秒
	private boolean fighting;//是否战斗中
	private Map<Integer, List<SoldierForBattle>> authorityMap;//按characterId获取单挑类
	private List<SoldierForBattle> locationIdList;//本次战斗临时Id，用于更新客户端数据
	private Map<Integer, MultiBattleObject> forceMap;//按攻防位置获取讨伐类
	private Map<Integer, String> forceCode;//位置
	
	
	public MultiBattle(){
		
	}
	public MultiBattle(MultiBattleObject playerA, MultiBattleObject playerB, String battleId){
		forceCode = new HashMap<Integer, String>();
		forceCode.put(0, "a");
		forceCode.put(1, "b");
		this.battleId = battleId;
		canEnter = false;
		this.playerA = playerA;
		playerA.setMultiBattle(this);
		this.playerB = playerB;
		playerB.setMultiBattle(this);
		delayStatus = DELAY_STATUS_READY;
		miniRoundAmout = 0;
		largeRoundAmount = 0;
		roundTime = Const.BATTLE_ROUND_TIME;
		fighting = false;
		locationIdList = new ArrayList<SoldierForBattle>();
		order = new ArrayList<SoldierForBattle>();
		locationIdList.addAll(playerA.getHero());
		locationIdList.addAll(playerB.getHero());
		order.addAll(playerA.getHero());
		order.addAll(playerB.getHero());
		authorityMap = new HashMap<Integer, List<SoldierForBattle>>();
		if(playerA.getCharacterId()!=0){
			for(SoldierForBattle i:playerA.getHero()){
				if(i.getCharacterId()==0){
					continue;
				}
				if(authorityMap.get(i.getCharacterId())==null){
					List<SoldierForBattle> tempList = new ArrayList<SoldierForBattle>();
					tempList.add(i);
					authorityMap.put(i.getCharacterId(), tempList);
				}else{
					authorityMap.get(i.getCharacterId()).add(i);
				}
			}
		}
		if(playerB.getCharacterId()!=0){
			for(SoldierForBattle i:playerB.getHero()){
				if(i.getCharacterId()==0){
					continue;
				}
				if(authorityMap.get(i.getCharacterId())==null){
					List<SoldierForBattle> tempList = new ArrayList<SoldierForBattle>();
					tempList.add(i);
					authorityMap.put(i.getCharacterId(), tempList);
				}else{
					authorityMap.get(i.getCharacterId()).add(i);
				}
			}
		}
		for(int i=0;i<locationIdList.size();i++){//初始化武将临时Id
			SoldierForBattle soldierForBattle = locationIdList.get(i);
			if(soldierForBattle==null){
				continue;
			}
			soldierForBattle.setLocationId(i);
		}
		forceMap = new HashMap<Integer, MultiBattleObject>();
		forceMap.put(MultiBattleObject.ATTACK_LOCATION, playerA);
		forceMap.put(MultiBattleObject.DEFENCE_LOCATION, playerB);
		//排序出出手顺序
		setOrder();
	}
	/**
	 * 重置出手顺序
	 */
	public void setOrder(){
		Collections.sort(order);
		int orderNum = 1;
		for(SoldierForBattle i:order){
			i.setOrderNum(orderNum);
			orderNum++;
		}
	}

	/**
	 * 获取操作人
	 * @return
	 */
	public SoldierForBattle getOperator(){
		int size = order.size();
		int number = miniRoundAmout%size;
		return order.get(number);
	}
	/**
	 * 获取当前操作人自己的军团
	 * @return
	 */
	public List<SoldierForBattle> getMine(){
		int size = order.size();
		int number = miniRoundAmout%size;
		return order.get(number).getMultiBattleObject().getHero();
		
	}
	/**
	 * 获取当前操作人自己的战斗信息类
	 * @return
	 */
	public MultiBattleObject getMineObject(){
		int size = order.size();
		int number = miniRoundAmout%size;
		return order.get(number).getMultiBattleObject();
		
	}
	/**
	 * 获取与操作人相对方的军团
	 * @return
	 */
	public List<SoldierForBattle> getTarget(){
		int size = order.size();
		int number = miniRoundAmout%size;
		MultiBattleObject multiBattleObject = order.get(number).getMultiBattleObject();
		int forceLocation = multiBattleObject.getForceLocation();
		return multiBattleObject.getMultiBattle().getForceMap().get(forceLocation^1).getHero();
		
	}
	/**
	 * 获取与操作人相对方的战斗信息类
	 * @return
	 */
	public MultiBattleObject getTargetObject(){
		int size = order.size();
		int number = miniRoundAmout%size;
		MultiBattleObject multiBattleObject = order.get(number).getMultiBattleObject();
		int forceLocation = multiBattleObject.getForceLocation();
		return multiBattleObject.getMultiBattle().getForceMap().get(forceLocation^1);
		
	}
	/**
	 * 获取己方军团
	 * @param characterId
	 * @return
	 */
	public List<SoldierForBattle> getMySoldiers(int characterId){
		if(authorityMap.get(characterId).isEmpty()){
			return authorityMap.get(characterId);
		}
		return authorityMap.get(characterId).get(0).getMultiBattleObject().getHero();
	}
	/**
	 * 获取对方军团
	 * @param characterId
	 * @return
	 */
	public List<SoldierForBattle> getOtherSoldierS(int characterId){
		if(authorityMap.get(characterId).isEmpty()){
			return playerA.getCharacterId()==characterId?playerB.getHero():playerA.getHero();
		}
		int forceLocation = authorityMap.get(characterId).get(0).getMultiBattleObject().getForceLocation();
		return forceMap.get(forceLocation^1).getHero();
	}
	
	/**
	 * 返回本方讨伐战实体对象
	 * @param characterId队长Id
	 * @return
	 */
	public MultiBattleObject getMultiBattleObjectByCharId(int characterId){
		return playerA.getCharacterId()!=characterId?playerB:playerA;
	}
	/**
	 * 返回与characterId相对方讨伐战实体对象
	 * @param characterId队长Id
	 * @return
	 */
	public MultiBattleObject getOtherMultiBattleObjectByCharId(int characterId){
		return playerA.getCharacterId()==characterId?playerB:playerA;
	}
	
	public String getBattleId() {
		return battleId;
	}
	public boolean isCanEnter() {
		return canEnter;
	}
	public MultiBattleObject getPlayerA() {
		return playerA;
	}
	public MultiBattleObject getPlayerB() {
		return playerB;
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
	public List<SoldierForBattle> getOrder() {
		return order;
	}
	public int getRoundTime() {
		return roundTime;
	}
	public boolean isFighting() {
		return fighting;
	}
	public List<SoldierForBattle> getLocationIdList() {
		return locationIdList;
	}
	public void setBattleId(String battleId) {
		this.battleId = battleId;
	}
	public void setCanEnter(boolean canEnter) {
		this.canEnter = canEnter;
	}
	public void setPlayerA(MultiBattleObject playerA) {
		this.playerA = playerA;
	}
	public void setPlayerB(MultiBattleObject playerB) {
		this.playerB = playerB;
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
	public void setOrder(List<SoldierForBattle> order) {
		this.order = order;
	}
	public void setRoundTime(int roundTime) {
		this.roundTime = roundTime;
	}
	public void setFighting(boolean fighting) {
		this.fighting = fighting;
	}
	public void setLocationIdList(List<SoldierForBattle> locationIdList) {
		this.locationIdList = locationIdList;
	}
	public Map<Integer, List<SoldierForBattle>> getAuthorityMap() {
		return authorityMap;
	}
	public Map<Integer, MultiBattleObject> getForceMap() {
		return forceMap;
	}
	public void setAuthorityMap(Map<Integer, List<SoldierForBattle>> authorityMap) {
		this.authorityMap = authorityMap;
	}
	public void setForceMap(Map<Integer, MultiBattleObject> forceMap) {
		this.forceMap = forceMap;
	}
	
}
