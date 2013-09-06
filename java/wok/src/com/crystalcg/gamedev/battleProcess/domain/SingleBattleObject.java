package com.crystalcg.gamedev.battleProcess.domain;

import java.util.List;

import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.EnemyNPCCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyAi;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;



/**
 * @author jinganyang
 *单挑类
 */
public class SingleBattleObject implements Comparable<SingleBattleObject>{
	private HeroForBattle heroForBattle;
	private boolean ready;
	private int status;//状态，0，玩家正常；1，野外AI；2，玩家托管；
	private int characterId;
	private String enemyNo;
//	private boolean turn;//是否处在操作回合
	private List<StaticEnemyAi> ai;//玩家托管AI或野怪AI
	private boolean win;
	
	
	public SingleBattleObject(){
		
	}
	/**
	 * 玩家单挑类构造
	 * @param characterId
	 * @param userHero
	 * @param staticHeroSkills
	 * @param buffs
	 */
	public SingleBattleObject(int characterId, UserHero userHero, List<StaticHeroSkill> staticHeroSkills, List<BuffObject> buffs, int locationId){
		this.characterId = characterId;
		heroForBattle = new HeroForBattle(userHero, staticHeroSkills, buffs,locationId);
		status = Const.FIGHT_STATUS_NOT_IN_BATTLE;
		ready = false;
		win = false;
//		turn = false;
	}
	/**
	 * 野怪单挑类构造
	 * @param staticEnemyNPC
	 * @param buffs
	 */
	public SingleBattleObject(StaticEnemyNPC staticEnemyNPC, List<BuffObject> buffs){
		this.characterId = 0;
		enemyNo = staticEnemyNPC.getEnemyNo();
		heroForBattle = new HeroForBattle(staticEnemyNPC, null, buffs);
		status = Const.FIGHT_STATUS_NPC;
		ready = false;
		win = false;
//		turn = false;
		List<StaticEnemyAi> ai = EnemyNPCCache.getSingleBattleAi(staticEnemyNPC.getAiNo());
		if(ai!=null){
			this.ai = ai;
		}
	}
	public HeroForBattle getHeroForBattle() {
		return heroForBattle;
	}
	public boolean isReady() {
		return ready;
	}
	public int getStatus() {
		return status;
	}
	public int getCharacterId() {
		return characterId;
	}
//	public boolean isTurn() {
//		return turn;
//	}
	public void setHeroForBattle(HeroForBattle heroForBattle) {
		this.heroForBattle = heroForBattle;
	}
	public void setReady(boolean ready) {
		this.ready = ready;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
//	public void setTurn(boolean turn) {
//		this.turn = turn;
//	}
	public String getEnemyNo() {
		return enemyNo;
	}
	public void setEnemyNo(String enemyNo) {
		this.enemyNo = enemyNo;
	}
	public boolean isWin() {
		return win;
	}
	public void setWin(boolean win) {
		this.win = win;
	}
	@Override
	public int compareTo(SingleBattleObject o) {
		// TODO Auto-generated method stub
		double thisMobility = heroForBattle.getMobility()*heroForBattle.getMobilityEffect();
		double targetMobility = o.getHeroForBattle().getMobility()*o.getHeroForBattle().getMobilityEffect();
		if(thisMobility<targetMobility){
			return 1;
		}else if(thisMobility>targetMobility){
			return -1;
		}else if(heroForBattle.getLocationId()==0){
			return -1;
		}else{
			return 1;
		}
	}
	public List<StaticEnemyAi> getAi() {
		return ai;
	}
	public void setAi(List<StaticEnemyAi> ai) {
		this.ai = ai;
	}


	
}
