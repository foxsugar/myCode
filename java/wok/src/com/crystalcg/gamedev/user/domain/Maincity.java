package com.crystalcg.gamedev.user.domain;

import java.util.Date;

public class Maincity {
	private int id;
	private int characterId;
	private int level;
	private int experience;
	private int damagedExperience;
	private int status;
	private int x;
	private int y;
	private long money;
	private long moneyLimit;
	private long food;
	private long foodLimit;
	private long wood;
	private long woodLimit;
	private long stone;
	private long stoneLimit;
	private long ironore;
	private long ironoreLimit;
	private int people;
	private int peopleLimit;
	private int workingPeople;
	private int soldier;
	private int soldierLimit;
	private int newSoldier;
	private int newSoldierLimit;
	private int medicine;
	private int medicineLimit;
	private int popularSupport;
	private Date moneyLastIncrease;
	private Date peopleLastIncrease;
	private Date medicineLastIncrease;
	private Date cellarStartTime;
	private int cellarLastTime;
	private long cellarMoney;
	private long cellarFood;
	private long cellarWood;
	private long cellarStone;
	private long cellarIronore;
	private long cellarLimit;
	
	public int getId() {
		return id;
	}
	public int getCharacterId() {
		return characterId;
	}
	public int getLevel() {
		return level;
	}
	public int getExperience() {
		return experience;
	}
	public int getStatus() {
		return status;
	}
	public int getX() {
		return x;
	}
	public int getY() {
		return y;
	}
	public long getMoney() {
		return money;
	}
	public long getMoneyLimit() {
		return moneyLimit;
	}
	public long getFood() {
		return food;
	}
	public long getFoodLimit() {
		return foodLimit;
	}
	public long getWood() {
		return wood;
	}
	public long getWoodLimit() {
		return woodLimit;
	}
	public long getStone() {
		return stone;
	}
	public long getStoneLimit() {
		return stoneLimit;
	}
	public long getIronore() {
		return ironore;
	}
	public long getIronoreLimit() {
		return ironoreLimit;
	}
	public int getPeople() {
		return people;
	}
	public int getPeopleLimit() {
		return peopleLimit;
	}
	public int getWorkingPeople() {
		return workingPeople;
	}
	public int getSoldier() {
		return soldier;
	}
	public int getSoldierLimit() {
		return soldierLimit;
	}
	public int getNewSoldier() {
		return newSoldier;
	}
	public int getNewSoldierLimit() {
		return newSoldierLimit;
	}
	public int getMedicine() {
		return medicine;
	}
	public int getMedicineLimit() {
		return medicineLimit;
	}
	public int getPopularSupport() {
		return popularSupport;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setX(int x) {
		this.x = x;
	}
	public void setY(int y) {
		this.y = y;
	}
	public void setMoney(long money) {
		this.money = money;
	}
	public void setMoneyLimit(long moneyLimit) {
		this.moneyLimit = moneyLimit;
	}
	public void setFood(long food) {
		this.food = food;
	}
	public void setFoodLimit(long foodLimit) {
		this.foodLimit = foodLimit;
	}
	public void setWood(long wood) {
		this.wood = wood;
	}
	public void setWoodLimit(long woodLimit) {
		this.woodLimit = woodLimit;
	}
	public void setStone(long stone) {
		this.stone = stone;
	}
	public void setStoneLimit(long stoneLimit) {
		this.stoneLimit = stoneLimit;
	}
	public void setIronore(long ironore) {
		this.ironore = ironore;
	}
	public void setIronoreLimit(long ironoreLimit) {
		this.ironoreLimit = ironoreLimit;
	}
	public void setPeople(int people) {
		this.people = people;
	}
	public void setPeopleLimit(int peopleLimit) {
		this.peopleLimit = peopleLimit;
	}
	public void setWorkingPeople(int workingPeople) {
		this.workingPeople = workingPeople;
	}
	public void setSoldier(int soldier) {
		this.soldier = soldier;
	}
	public void setSoldierLimit(int soldierLimit) {
		this.soldierLimit = soldierLimit;
	}
	public void setNewSoldier(int newSoldier) {
		this.newSoldier = newSoldier;
	}
	public void setNewSoldierLimit(int newSoldierLimit) {
		this.newSoldierLimit = newSoldierLimit;
	}
	public void setMedicine(int medicine) {
		this.medicine = medicine;
	}
	public void setMedicineLimit(int medicineLimit) {
		this.medicineLimit = medicineLimit;
	}
	public void setPopularSupport(int popularSupport) {
		this.popularSupport = popularSupport;
	}
	public int getDamagedExperience() {
		return damagedExperience;
	}
	public void setDamagedExperience(int damagedExperience) {
		this.damagedExperience = damagedExperience;
	}
	public Date getPeopleLastIncrease() {
		return peopleLastIncrease;
	}
	public Date getMoneyLastIncrease() {
		return moneyLastIncrease;
	}
	public void setPeopleLastIncrease(Date peopleLastIncrease) {
		this.peopleLastIncrease = peopleLastIncrease;
	}
	public void setMoneyLastIncrease(Date moneyLastIncrease) {
		this.moneyLastIncrease = moneyLastIncrease;
	}
	public Date getCellarStartTime() {
		return cellarStartTime;
	}
	public int getCellarLastTime() {
		return cellarLastTime;
	}
	public long getCellarMoney() {
		return cellarMoney;
	}
	public void setCellarStartTime(Date cellarStartTime) {
		this.cellarStartTime = cellarStartTime;
	}
	public void setCellarLastTime(int cellarLastTime) {
		this.cellarLastTime = cellarLastTime;
	}
	public void setCellarMoney(long cellarMoney) {
		this.cellarMoney = cellarMoney;
	}
	public long getCellarFood() {
		return cellarFood;
	}
	public long getCellarWood() {
		return cellarWood;
	}
	public long getCellarStone() {
		return cellarStone;
	}
	public long getCellarIronore() {
		return cellarIronore;
	}
	public void setCellarFood(long cellarFood) {
		this.cellarFood = cellarFood;
	}
	public void setCellarWood(long cellarWood) {
		this.cellarWood = cellarWood;
	}
	public void setCellarStone(long cellarStone) {
		this.cellarStone = cellarStone;
	}
	public void setCellarIronore(long cellarIronore) {
		this.cellarIronore = cellarIronore;
	}
	public Date getMedicineLastIncrease() {
		return medicineLastIncrease;
	}
	public void setMedicineLastIncrease(Date medicineLastIncrease) {
		this.medicineLastIncrease = medicineLastIncrease;
	}
	public long getCellarLimit() {
		return cellarLimit;
	}
	public void setCellarLimit(long cellarLimit) {
		this.cellarLimit = cellarLimit;
	}
}
