package com.crystalcg.gamedev.battleProcess.domain;


public class BattleData {
	private int battleType;
	private SingleBattle singleBattle;
	private MultiBattle multiBattle;
	
	public int getBattleType(){
		return battleType;
	}
	public SingleBattle getSingleBattle() {
		return singleBattle;
	}
	public MultiBattle getMultiBattle() {
		return multiBattle;
	}
	public void setBattleType(int battleType) {
		this.battleType = battleType;
	}
	public void setSingleBattle(SingleBattle singleBattle) {
		this.singleBattle = singleBattle;
	}
	public void setMultiBattle(MultiBattle multiBattle) {
		this.multiBattle = multiBattle;
	}
}
