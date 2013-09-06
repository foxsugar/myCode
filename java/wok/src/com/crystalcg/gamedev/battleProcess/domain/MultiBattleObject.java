package com.crystalcg.gamedev.battleProcess.domain;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.buildingFunction.service.CollegeService;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.tech.service.SoldierTechService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.EnemyNPCCache;
import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyAi;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticFormation;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;

public class MultiBattleObject {
	public static final int ATTACK_LOCATION = 0;
	public static final int DEFENCE_LOCATION = 1;
	private List<SoldierForBattle> hero;
	private Map<Integer, List<SoldierForBattle>> locationMap;//军团所在位置Map,KEY为x坐标

	private int characterId;//队长Id
	private String enemyNo;
	private List<StaticEnemyAi> ai;//玩家托管AI或野怪AI
	private boolean win;
	private int forceLocation;
	private MultiBattle multiBattle;
	private String formationNo;
	private DefenceWork defenceWork;
	private int battleJobId;
	private int totalLoss;//总损耗
	
	public MultiBattleObject(){
		
	}
	public MultiBattleObject(String heroList, int characterId, int forceLocation, String formationNo, int battleJobId, boolean hasDefence) throws AppException{//玩家初始化
		this.battleJobId = battleJobId;
		locationMap = new HashMap<Integer, List<SoldierForBattle>>();
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		CollegeService collegeService = (CollegeService) ServiceLocator.getSpringBean("collegeService");
		this.characterId = characterId;
		win = false;
		hero = new ArrayList<SoldierForBattle>();
		if(heroList ==null){
			heroList = "";
		}
		String[] heroIds = heroList.split(",");
		SoldierTechService soldierTechService = (SoldierTechService)ServiceLocator.getSpringBean("soldierTechService");
		List<String> soldierSkillStrings = soldierTechService.getUserSoldierTech(characterId);
		StaticFormation formation = null;
		if(formationNo!=null&&!formationNo.equals("")){
			formation = FormationCache.getFormationByNo(formationNo);
		}
		int y = 1;
		for(String ids:heroIds){
			if(ids.equals("")||ids.equals("0")){
//				SoldierForBattle soldierForBattle = new SoldierForBattle(true);
//				hero.add(soldierForBattle);//加入死人
//				soldierForBattle.setMultiBattleObject(this);
				y++;
			}else{
				int id = Integer.parseInt(ids);
				UserHero userHero = userHeroService.getUserHero(characterId, id);
				HeroAlgorithm.computeAttribute(userHero);
				List<StaticHeroSkill> skills = collegeService.getUserHeroSkill(characterId, id);
				SoldierForBattle soldierForBattle = new SoldierForBattle(userHero, skills, soldierSkillStrings, null, y, formation);
				y++;
				soldierForBattle.setMultiBattleObject(this);
				hero.add(soldierForBattle);
			}
		}
		this.forceLocation = forceLocation;
		this.formationNo = formationNo;
		//暂无玩家AI
		if(forceLocation==DEFENCE_LOCATION){
			//防守方，获取城防信息
		}
		//添加军团位置
		for(SoldierForBattle i:hero){
			int locationX = i.getLocationX();
			if(locationMap.get(locationX)==null){
				List<SoldierForBattle> temp = new ArrayList<SoldierForBattle>();
				temp.add(i);
				locationMap.put(locationX, temp);
			}else{
				locationMap.get(locationX).add(i);
			}
		}
		if(hasDefence){
			BuildingService buildingService = (BuildingService)ServiceLocator.getSpringBean("buildingService");
			List<Building> wall = buildingService.getbBuildingByPrefix(characterId, Const.WALL_BUILDING_NO_PREFIX);
			StaticBuilding wallStatic = BuildingCache.getBuildingEntityByNo(wall.get(0).getBuildingNo());
			defenceWork = new DefenceWork(wallStatic);
		}
		
	}


	public MultiBattleObject(StaticEnemyNPC staticEnemyNPC, int forceLocation, String formationNo) throws AppException{//野怪初始化
		locationMap = new HashMap<Integer, List<SoldierForBattle>>();
		enemyNo = staticEnemyNPC.getEnemyNo();
		win = false;
		List<StaticEnemyAi> ai = EnemyNPCCache.getMultiBattleAi(staticEnemyNPC.getAiNo());
		if(ai!=null){
			this.ai = ai;
		}
		hero = new ArrayList<SoldierForBattle>();
		int soldierNum = staticEnemyNPC.getSoldierNum();
		StaticFormation formation = FormationCache.getFormationByNo(formationNo);
		try {
			for(int i=1;i<6;i++){
				Method getSoldierType;
				getSoldierType = StaticEnemyNPC.class.getMethod("getSoldierType"+i);
				String soldierNo = (String)getSoldierType.invoke(staticEnemyNPC);
				if(soldierNo==null){
					continue;
				}
				StaticSoldier soldier = SoldierCache.getSoldierByNo(soldierNo);
				if(soldier!=null){
					SoldierForBattle soldierForBattle = new SoldierForBattle(staticEnemyNPC, soldier, null, soldierNum, i, formation);
					soldierForBattle.setMultiBattleObject(this);
					hero.add(soldierForBattle);
				}else{
					hero.add(new SoldierForBattle(true));
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.forceLocation = forceLocation;
		this.formationNo = formationNo;
		//添加军团位置
		for(SoldierForBattle i:hero){
			int locationX = i.getLocationX();
			if(locationMap.get(locationX)==null){
				List<SoldierForBattle> temp = new ArrayList<SoldierForBattle>();
				temp.add(i);
				locationMap.put(locationX, temp);
			}else{
				locationMap.get(locationX).add(i);
			}
		}
			
	}
	
	public List<SoldierForBattle> getHero() {
		return hero;
	}
	public int getCharacterId() {
		return characterId;
	}
	public String getEnemyNo() {
		return enemyNo;
	}
	public List<StaticEnemyAi> getAi() {
		return ai;
	}
	public boolean isWin() {
		return win;
	}
	public void setHero(List<SoldierForBattle> hero) {
		this.hero = hero;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public void setEnemyNo(String enemyNo) {
		this.enemyNo = enemyNo;
	}
	public void setAi(List<StaticEnemyAi> ai) {
		this.ai = ai;
	}
	public void setWin(boolean win) {
		this.win = win;
	}
	public int getForceLocation() {
		return forceLocation;
	}
	public void setForceLocation(int forceLocation) {
		this.forceLocation = forceLocation;
	}
	public MultiBattle getMultiBattle() {
		return multiBattle;
	}
	public void setMultiBattle(MultiBattle multiBattle) {
		this.multiBattle = multiBattle;
	}
	public String getFormationNo() {
		return formationNo;
	}
	public void setFormationNo(String formationNo) {
		this.formationNo = formationNo;
	}
	public DefenceWork getDefenceWork() {
		return defenceWork;
	}
	public void setDefenceWork(DefenceWork defenceWork) {
		this.defenceWork = defenceWork;
	}
	public Map<Integer, List<SoldierForBattle>> getLocationMap() {
		return locationMap;
	}
	public void setLocationMap(Map<Integer, List<SoldierForBattle>> locationMap) {
		this.locationMap = locationMap;
	}
	public int getBattleJobId() {
		return battleJobId;
	}
	public void setBattleJobId(int battleJobId) {
		this.battleJobId = battleJobId;
	}
	public int getTotalLoss() {
		return totalLoss;
	}
	public void setTotalLoss(int totalLoss) {
		this.totalLoss = totalLoss;
	}
}