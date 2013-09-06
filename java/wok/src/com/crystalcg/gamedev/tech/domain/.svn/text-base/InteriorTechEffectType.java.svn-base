package com.crystalcg.gamedev.tech.domain;

/**
 * 内政科技影响类型
 * @author jinganyang
 *
 */
public enum InteriorTechEffectType {
	
	/**
	 * 建造建筑时间缩短
	 */
	BUILDING_TIME(0,2),//建造建筑时间缩短
	/**
	 * 增加人口上限
	 */
	PEAPLE_LIMIT(1,1),//增加人口上限
	/**
	 * 增加士兵上限
	 */
	SOLDIER_LIMIT(2,1),//增加士兵上限
	/**
	 * 增加药膏增长速度
	 */
	MEDICINE_INCREASE_SPEED(3,1),//增加药膏增长速度
	/**
	 * 增加粮食基础产量
	 */
	FOOD_VOLUME_OF_PRODUCTION(4,1),//增加粮食基础产量
	/**
	 * 增加铁矿基础产量
	 */
	IRONORE_VOLUME_OF_PRODUCTION(5,1),//增加铁矿基础产量
	/**
	 * 增加木材基础产量
	 */
	WOOD_VOLUME_OF_PRODUCTION(6,1),//增加木材基础产量
	/**
	 * 增加石料基础产量
	 */
	STONE_VOLUME_OF_PRODUCTION(7,1),//增加石料基础产量
	/**
	 * 地窖保护上限提高
	 */
	CELLAR_LIMIT(8,1),//地窖保护上限提高
	/**
	 * 增加人口增长速度
	 */
	PEOPLE_INCREASE_SPEED(9,1),//增加人口增长速度
	/**
	 * 提高君主声望奖励
	 */
	REPUTATION_REWARD(10,1),//提高君主声望奖励
	/**
	 * 研究科技时间缩短
	 */
	TECH_STUDY_TIME(11,2),//研究科技时间缩短
	/**
	 * 资源生长时间缩短
	 */
	RESOURCE_HARVEST_TIME(12,2),//资源生长时间缩短
	/**
	 * 城墙工事上限提高
	 */
	CITY_DEFENCE_LIMIT(13,1),//城墙工事上限提高
	/**
	 * 增加铜币产量
	 */
	MONEY_VOLUME_OF_PRODUCTION(14,1),//增加铜币产量
	/**
	 * 增加民心恢复速度
	 */
	POPULAR_SUPPORT_RECOVER_SPEED(15,1),//增加民心恢复速度
	/**
	 * 城市繁荣度恢复速度
	 */
	CITY_EXPERIENCE_RECOVER_SPEED(-1,-1),//城市繁荣度恢复速度
	/**
	 * 训练时间
	 */
	TRAINING_TIME(-1,-1);//减少兵种训练时间
	
	public static final int INCREASE_TYPE = 1;
	public static final int DECREASE_TYPE = 2;
	private final int[] enumItem = new int[2];
	private InteriorTechEffectType(int value, int type){
		enumItem[0] = value;
		enumItem[1] = type;
	}
	public int getKey(){
		return enumItem[0];
	}
	public int getType(){
		return enumItem[1];
	}
}
