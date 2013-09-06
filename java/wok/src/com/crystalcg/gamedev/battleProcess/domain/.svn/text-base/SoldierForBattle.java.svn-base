package com.crystalcg.gamedev.battleProcess.domain;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.util.BattleMathForMulti;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.SoldierCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticFormation;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldierSkill;

public class SoldierForBattle implements Comparable<SoldierForBattle> {
	
	private int id;//武将Id，userHeroId
	private String heroName;
	private String heroIcon;
	private String smallHeroIcon;
	private String soldierName;
	private int soldierType;
	private int heroLevel;
	private int soldierAmout;
	private int soldierAmoutMax;
	private int mp;
	private int mpMax;
	private double mobility;
	private double attack;
	private double defence;
	private int attackType;
	private int armorType;
	private double criticalStrike;
	private double hit;
	private double dodge;
	private int minRange;
	private int maxRange;
	private List<SkillOjbect> soldierSkills;
	private List<BuffObject> buffs;
	private List<BuffObject> deBuffs;
	private String flag;
	/////////////
	private String locationXAndY;//X_Y标识
	private int locationX;
	private int locationY;
	private int locationId;
	private boolean dead;
	private int orderNum;
	private MultiBattleObject multiBattleObject;
	/////////////
	HeroAttribute heroAttribute;
	
	private double attackEffect;
	private double defenceEffect;
	private double criticalStrikeEffect;
	private double hitEffect;
	private double dodgeEffect;
	private double mobilityEffect;
	////////
	private double attackAdd;
	private double defenceAdd;
	private double criticalStrikeAdd;
	private double hitAdd;
	private double dodgeAdd;
	private double hpAdd;
	private double mobilityAdd;
	///////////士兵原始属性
	SoldierAttribute soldierAttribute;
	////////////
	private boolean ready;
	private int status;//状态，0，玩家正常；1，野外AI；2，玩家托管；
	private int characterId;
	
	private boolean defenceStatus;
	
	public SoldierForBattle(){
		
	}
	public SoldierForBattle(boolean dead){
		this.dead = dead;
	}
	public SoldierForBattle(UserHero userHero, List<StaticHeroSkill> staticHeroSkills, List<String> soldierSkillStrings, List<BuffObject> buffs, int y, StaticFormation
			formation){
		this.id = userHero.getId();
		this.heroName = userHero.getHeroName();
		this.heroIcon = userHero.getHeroIcon();
		this.smallHeroIcon = userHero.getSmallHeroIcon();
		StaticSoldier staticSoldier = SoldierCache.getSoldierByNo(userHero.getSoldierNo());
		this.soldierName = staticSoldier.getSoldierName();
		soldierType = staticSoldier.getSoldierType();
		this.heroLevel = userHero.getLevel();
		this.soldierAmout = userHero.getSoldierAmount();
		this.soldierAmoutMax = (int)userHero.getCommand();
		this.mp = (int)userHero.getMp();
		this.mpMax = (int)userHero.getMpMax();
//		this.mobility = staticSoldier.getMobility()+userHero.getAgility()/24;

		this.attackType = staticSoldier.getAttackType();
		this.armorType = staticSoldier.getArmorType();
		
		this.minRange = staticSoldier.getMinRange();
		this.maxRange = staticSoldier.getMaxRange();
		
		soldierSkills = new ArrayList<SkillOjbect>();
		for(StaticHeroSkill i:staticHeroSkills){
			SkillOjbect skillOjbect = new SkillOjbect(i);
			soldierSkills.add(skillOjbect);
		}
		if(buffs!=null){
			this.buffs = buffs;
		}else{
			this.buffs = new ArrayList<BuffObject>();
		}
		deBuffs = new ArrayList<BuffObject>();
		flag = String.valueOf(heroName.toCharArray()[0]);
		dead = false;
		status = Const.FIGHT_STATUS_NOT_IN_BATTLE;
		ready = false;
		characterId =userHero.getCharacterId();
		
		attackEffect=1;
		defenceEffect=1;
		criticalStrikeEffect=1;
		hitEffect=1;
		dodgeEffect=1;
		mobilityEffect=1;
		heroAttribute = new HeroAttribute(userHero);
		soldierAttribute = new SoldierAttribute(staticSoldier, soldierSkillStrings, soldierType);

		//添加武将影响
		BattleMathForMulti.computeSoldierAttribute(this);
//		soldierAttack = staticSoldier.getSoldierAttack()+userHero.getAttack();
//		soldierDefence = staticSoldier.getSoldierDefence()+userHero.getDefence();
//		soldierCriticalStrike = staticSoldier.getSoldierCritical()/Const.CHANGE_PERCENT_TO_VALUE+userHero.getCriticalStrike()/(1900+userHero.getCriticalStrike());
//		soldierHit = staticSoldier.getSoldierHit()/Const.CHANGE_PERCENT_TO_VALUE+userHero.getHit()/(1000+4.5*userHero.getHit());
//		soldierDodge = staticSoldier.getSoldierDodge()/Const.CHANGE_PERCENT_TO_VALUE+userHero.getDodge()/(8400+4.2*userHero.getDodge());
		//添加阵法影响
		setFormation(formation, y, staticSoldier);
	}
	public SoldierForBattle(StaticEnemyNPC staticEnemyNPC, StaticSoldier staticSoldier, List<BuffObject> buffs, int soldierNum, int y, StaticFormation formation){
		this.heroName = staticEnemyNPC.getEnemyName();
		this.heroIcon = staticEnemyNPC.getHeroIcon();
		this.smallHeroIcon = staticEnemyNPC.getSmallHeroIcon();
		this.soldierName = staticSoldier.getSoldierName();
		soldierType = staticSoldier.getSoldierType();
		this.heroLevel = staticEnemyNPC.getHeroLevel();
		this.soldierAmout = staticEnemyNPC.getSoldierNum();
		this.soldierAmoutMax = staticEnemyNPC.getSoldierNum();
		this.mp = staticEnemyNPC.getHeroStrategy();
		this.mpMax = staticEnemyNPC.getHeroStrategy();
		this.attackType = staticSoldier.getAttackType();
		this.armorType = staticSoldier.getArmorType();
		this.minRange = staticSoldier.getMinRange();
		this.maxRange = staticSoldier.getMaxRange();
		
		soldierSkills = new ArrayList<SkillOjbect>();
		this.buffs = new ArrayList<BuffObject>();
		deBuffs = new ArrayList<BuffObject>();
		
		this.flag = staticEnemyNPC.getFlag();
		dead = false;
	
		status = Const.FIGHT_STATUS_NPC;
		
		attackEffect=1;
		defenceEffect=1;
		criticalStrikeEffect=1;
		hitEffect=1;
		dodgeEffect=1;
		mobilityEffect=1;
		heroAttribute = new HeroAttribute(staticEnemyNPC);
		soldierAttribute = new SoldierAttribute(staticSoldier);
		BattleMathForMulti.computeSoldierAttribute(this);
		//添加阵法影响
		setFormation(formation, y, staticSoldier);
	}

	/**
	 * 通过阵法，初始化军团位置
	 * @param hero
	 * @param staticFormation
	 * @param y
	 */
	private void setFormation(StaticFormation staticFormation, int y, StaticSoldier staticSoldier){
		if(staticFormation==null){
			setLocationX(3);
			setLocationY(y);
			locationXAndY = 3+"_"+y;
			return;
		}
		try {
			Method getCoordinate = StaticFormation.class.getMethod("getCoordinate"+y);
			String[] location = ((String)getCoordinate.invoke(staticFormation)).split(",");
			int locationX = Integer.parseInt(location[0]);
			int locationY = Integer.parseInt(location[1]);
			setLocationX(locationX);
			setLocationY(locationY);
			locationXAndY = locationX+"_"+locationY;
		} catch (Exception e) {
			e.printStackTrace();
		}
		try {
			for(int i=1;i<4;i++){
				Method getApplyToSoldier = StaticFormation.class.getMethod("getApplyToSoldier"+i);
				Method getEffect = StaticFormation.class.getMethod("getEffect"+i);
				int effectSoldierType = (Integer)getApplyToSoldier.invoke(staticFormation);
				int effectValue = (Integer)getEffect.invoke(staticFormation);
				if(staticSoldier.getSoldierType()==effectSoldierType){
					double soldierAttack = soldierAttribute.getSoldierAttack();
					soldierAttack += staticSoldier.getSoldierAttack()*effectValue/Const.CHANGE_PERCENT_TO_VALUE;
					soldierAttribute.setSoldierAttack(soldierAttack);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public StaticSoldierSkill getStaticSoldierSkill() {
		return soldierAttribute.getStaticSoldierSkill();
	}
	
	public int getHp(){
		return soldierAttribute.getSoldierHp();
	}
	
	public int getId() {
		return id;
	}

	public String getHeroName() {
		return heroName;
	}

	public String getHeroIcon() {
		return heroIcon;
	}

	public String getSmallHeroIcon() {
		return smallHeroIcon;
	}

	public String getSoldierName() {
		return soldierName;
	}

	public int getSoldierAmout() {
		return soldierAmout;
	}

	public int getSoldierAmoutMax() {
		return soldierAmoutMax;
	}

	public int getMp() {
		return mp;
	}

	public int getMpMax() {
		return mpMax;
	}

	public double getMobility() {
		return mobility;
	}

	public int getAttackType() {
		return attackType;
	}

	public int getArmorType() {
		return armorType;
	}

	public int getMinRange() {
		return minRange;
	}

	public int getMaxRange() {
		return maxRange;
	}

	public List<SkillOjbect> getSoldierSkills() {
		return soldierSkills;
	}

	public List<BuffObject> getBuffs() {
		return buffs;
	}

	public List<BuffObject> getDeBuffs() {
		return deBuffs;
	}

	public int getLocationX() {
		return locationX;
	}

	public int getLocationY() {
		return locationY;
	}

	public int getLocationId() {
		return locationId;
	}

	public boolean isDead() {
		return dead;
	}

	public MultiBattleObject getMultiBattleObject() {
		return multiBattleObject;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setHeroName(String heroName) {
		this.heroName = heroName;
	}

	public void setHeroIcon(String heroIcon) {
		this.heroIcon = heroIcon;
	}

	public void setSmallHeroIcon(String smallHeroIcon) {
		this.smallHeroIcon = smallHeroIcon;
	}

	public void setSoldierName(String soldierName) {
		this.soldierName = soldierName;
	}

	public void setSoldierAmout(int soldierAmout) {
		this.soldierAmout = soldierAmout;
	}

	public void setSoldierAmoutMax(int soldierAmoutMax) {
		this.soldierAmoutMax = soldierAmoutMax;
	}

	public void setMp(int mp) {
		this.mp = mp;
	}

	public void setMpMax(int mpMax) {
		this.mpMax = mpMax;
	}

	public void setMobility(double mobility) {
		this.mobility = mobility;
	}

	public void setAttackType(int attackType) {
		this.attackType = attackType;
	}

	public void setArmorType(int armorType) {
		this.armorType = armorType;
	}

	public void setMinRange(int minRange) {
		this.minRange = minRange;
	}

	public void setMaxRange(int maxRange) {
		this.maxRange = maxRange;
	}

	public void setSoldierSkills(List<SkillOjbect> soldierSkills) {
		this.soldierSkills = soldierSkills;
	}

	public void setBuffs(List<BuffObject> buffs) {
		this.buffs = buffs;
	}

	public void setDeBuffs(List<BuffObject> deBuffs) {
		this.deBuffs = deBuffs;
	}

	public void setLocationX(int locationX) {
		this.locationX = locationX;
	}

	public void setLocationY(int locationY) {
		this.locationY = locationY;
	}

	public void setLocationId(int locationId) {
		this.locationId = locationId;
	}

	public void setDead(boolean dead) {
		this.dead = dead;
	}

	public void setMultiBattleObject(MultiBattleObject multiBattleObject) {
		this.multiBattleObject = multiBattleObject;
	}


	public int getHeroLevel() {
		return heroLevel;
	}


	public void setHeroLevel(int heroLevel) {
		this.heroLevel = heroLevel;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public double getAttackEffect() {
		return attackEffect;
	}
	public double getDefenceEffect() {
		return defenceEffect;
	}
	public double getCriticalStrikeEffect() {
		return criticalStrikeEffect;
	}
	public double getHitEffect() {
		return hitEffect;
	}
	public double getDodgeEffect() {
		return dodgeEffect;
	}
	public double getMobilityEffect() {
		return mobilityEffect;
	}
	public void setAttackEffect(double attackEffect) {
		this.attackEffect = attackEffect;
	}
	public void setDefenceEffect(double defenceEffect) {
		this.defenceEffect = defenceEffect;
	}
	public void setCriticalStrikeEffect(double criticalStrikeEffect) {
		this.criticalStrikeEffect = criticalStrikeEffect;
	}
	public void setHitEffect(double hitEffect) {
		this.hitEffect = hitEffect;
	}
	public void setDodgeEffect(double dodgeEffect) {
		this.dodgeEffect = dodgeEffect;
	}
	public void setMobilityEffect(double mobilityEffect) {
		this.mobilityEffect = mobilityEffect;
	}
	public boolean isReady() {
		return ready;
	}
	public int getStatus() {
		return status;
	}
	public void setReady(boolean ready) {
		this.ready = ready;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getCharacterId() {
		return characterId;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public int getSoldierType() {
		return soldierType;
	}
	public void setSoldierType(int soldierType) {
		this.soldierType = soldierType;
	}
	public int getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(int orderNum) {
		this.orderNum = orderNum;
	}
	public boolean isDefenceStatus() {
		return defenceStatus;
	}
	public void setDefenceStatus(boolean defenceStatus) {
		this.defenceStatus = defenceStatus;
	}
	public double getAttackAdd() {
		return attackAdd;
	}
	public double getDefenceAdd() {
		return defenceAdd;
	}
	public double getCriticalStrikeAdd() {
		return criticalStrikeAdd;
	}
	public double getHitAdd() {
		return hitAdd;
	}
	public double getDodgeAdd() {
		return dodgeAdd;
	}
	public double getHpAdd() {
		return hpAdd;
	}
	public double getMobilityAdd() {
		return mobilityAdd;
	}
	public void setAttackAdd(double attackAdd) {
		this.attackAdd = attackAdd;
	}
	public void setDefenceAdd(double defenceAdd) {
		this.defenceAdd = defenceAdd;
	}
	public void setCriticalStrikeAdd(double criticalStrikeAdd) {
		this.criticalStrikeAdd = criticalStrikeAdd;
	}
	public void setHitAdd(double hitAdd) {
		this.hitAdd = hitAdd;
	}
	public void setDodgeAdd(double dodgeAdd) {
		this.dodgeAdd = dodgeAdd;
	}
	public void setHpAdd(double hpAdd) {
		this.hpAdd = hpAdd;
	}
	public void setMobilityAdd(double mobilityAdd) {
		this.mobilityAdd = mobilityAdd;
	}
	public double getAttack() {
		return attack;
	}
	public double getDefence() {
		return defence;
	}
	public double getCriticalStrike() {
		return criticalStrike;
	}
	public double getHit() {
		return hit;
	}
	public double getDodge() {
		return dodge;
	}
	public void setAttack(double attack) {
		this.attack = attack;
	}
	public void setDefence(double defence) {
		this.defence = defence;
	}
	public void setCriticalStrike(double criticalStrike) {
		this.criticalStrike = criticalStrike;
	}
	public void setHit(double hit) {
		this.hit = hit;
	}
	public void setDodge(double dodge) {
		this.dodge = dodge;
	}
	public HeroAttribute getHeroAttribute() {
		return heroAttribute;
	}
	public SoldierAttribute getSoldierAttribute() {
		return soldierAttribute;
	}
	public void setHeroAttribute(HeroAttribute heroAttribute) {
		this.heroAttribute = heroAttribute;
	}
	public void setSoldierAttribute(SoldierAttribute soldierAttribute) {
		this.soldierAttribute = soldierAttribute;
	}
	@Override
	public int compareTo(SoldierForBattle o) {
		double thisMobility = mobility;
		double targetMobility = o.getMobility();
		if(thisMobility<targetMobility){
			return 1;
		}else if(thisMobility>targetMobility){
			return -1;
		}else if(multiBattleObject.getForceLocation()==0){
			return -1;
		}else if(o.getMultiBattleObject().getForceLocation()==0){
			return 1;
		}else if(this.locationId<o.getLocationId()){
			return -1;
		}else{
			return 0;
		}
	}
	public String getLocationXAndY() {
		return locationXAndY;
	}
	public void setLocationXAndY(String locationXAndY) {
		this.locationXAndY = locationXAndY;
	}
}
