package com.crystalcg.gamedev.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.building.domain.QueueBuilding;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

public class BuildingAlgorithm {
	
	private static Logger logger = LoggerFactory.getLogger(BuildingAlgorithm.class);
	
	/**
	 * 计算建筑时间(建造、升级)
	 * @param time
	 * @return
	 */
	public static long calculateBuildTime(int characterId,long time){
		//建筑时间关联君主政治属性
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		UserCharacter character = characterService.getCharacterById(characterId);
		long retTime = time * (1 - character.getInternalAffairs()/(character.getInternalAffairs()+845));
		if(retTime <= 0){
			retTime = 1;
		}
		return 15;
	}
	
	/**
	 * 计算拆除时间
	 * @param time
	 * @return
	 */
	public static long calculateDemolitionTime(int characterId,long time){
		long retTime = (long)(calculateBuildTime(characterId, time) *.124);
		if(retTime <= 0){
			retTime = 1;
		}
		return 2;
	}
	
	/**
	 * 计算拆除返回的木材
	 * @param wood
	 * @return
	 */
	public static long getDemolitionReturnWood(long wood){
		return (long)(wood*.12);
	}
	
	/**
	 * 计算拆除返回的石料
	 * @param stone
	 * @return
	 */
	public static long getDemolitionReturnStone(long stone){
		return (long)(stone*.09);
	}
	
	/**
	 * 建造完之后处理
	 * @param characterId
	 * @param be
	 */
	public static void afterBuild(int characterId,String tarBuildingNo){
		logger.info("建造完 "+tarBuildingNo+" " +characterId);
		StaticBuilding tarEntity = BuildingCache.getBuildingEntityByNo(tarBuildingNo);
		if(tarEntity.getFunction1() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,tarEntity.getFunction1(),0,tarEntity.getFunctionvalue1());
		}
		if(tarEntity.getFunction2() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,tarEntity.getFunction2(),0,tarEntity.getFunctionvalue2());
		}
		if(tarEntity.getFunction3() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,tarEntity.getFunction3(),0,tarEntity.getFunctionvalue3());
		}
		if(tarEntity.getFunction4() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,tarEntity.getFunction4(),0,tarEntity.getFunctionvalue4());
		}
		//加繁荣度和经验
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		maincityService.addExperience(characterId, tarEntity.getCityExp());
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		characterService.addExperience(characterId, tarEntity.getCharacterExp());
	}
	
	/**
	 * 升级完之后处理
	 * @param characterId
	 * @param be
	 */
	public static void afterUpgrade(int characterId,String curBuildingNo,String tarBuildingNo){
		logger.info("升级完 "+curBuildingNo+" " +characterId);
		StaticBuilding curEntity = BuildingCache.getBuildingEntityByNo(curBuildingNo);
		StaticBuilding tarEntity = BuildingCache.getBuildingEntityByNo(tarBuildingNo);
		if(tarEntity.getFunction1() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,tarEntity.getFunction1(),curEntity.getFunctionvalue1(),tarEntity.getFunctionvalue1());
		}
		if(tarEntity.getFunction2() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,tarEntity.getFunction2(),curEntity.getFunctionvalue2(),tarEntity.getFunctionvalue2());
		}
		if(tarEntity.getFunction3() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,tarEntity.getFunction3(),curEntity.getFunctionvalue3(),tarEntity.getFunctionvalue3());
		}
		if(tarEntity.getFunction4() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,tarEntity.getFunction4(),curEntity.getFunctionvalue4(),tarEntity.getFunctionvalue4());
		}
		//加繁荣度和经验
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		maincityService.addExperience(characterId, tarEntity.getCityExp());
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		characterService.addExperience(characterId, tarEntity.getCharacterExp());
	}
	
	/**
	 * 拆除完之后处理
	 * @param characterId
	 * @param be
	 */
	public static void afterDemolition(int characterId,String curBuildingNo,String tarBuildingNo){
		logger.info("拆除完 "+curBuildingNo+" " +characterId);
		StaticBuilding curEntity = BuildingCache.getBuildingEntityByNo(curBuildingNo);
		StaticBuilding tarEntity = BuildingCache.getBuildingEntityByNo(tarBuildingNo);//有可能拆到0
		if(curEntity.getFunction1() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,curEntity.getFunction1(),curEntity.getFunctionvalue1(),tarEntity==null?0:tarEntity.getFunctionvalue1());
		}
		if(curEntity.getFunction2() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,curEntity.getFunction2(),curEntity.getFunctionvalue2(),tarEntity==null?0:tarEntity.getFunctionvalue2());
		}
		if(curEntity.getFunction3() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,curEntity.getFunction3(),curEntity.getFunctionvalue3(),tarEntity==null?0:tarEntity.getFunctionvalue3());
		}
		if(curEntity.getFunction4() != 0){
			BuildingAlgorithm.doAfterBuild(characterId,curEntity.getFunction4(),curEntity.getFunctionvalue4(),tarEntity==null?0:tarEntity.getFunctionvalue4());
		}
		//扣繁荣度和经验
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		maincityService.addExperience(characterId, -curEntity.getCityExp());
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		characterService.addExperience(characterId, -curEntity.getCharacterExp());
	}
	
	/**
	 * 获取城防工事数量上限
	 * @param buildingNo
	 * @return
	 */
	public static int getWallDefenseLimit(String buildingNo){
		StaticBuilding sb = BuildingCache.getBuildingEntityByNo(buildingNo);
		if(sb == null){
			return 0;
		}
		if(sb.getFunction1() == 13){
			return (int)sb.getFunctionvalue1();
		}
		if(sb.getFunction2() == 13){
			return (int)sb.getFunctionvalue2();
		}
		if(sb.getFunction3() == 13){
			return (int)sb.getFunctionvalue3();
		}
		if(sb.getFunction4() == 13){
			return (int)sb.getFunctionvalue4();
		}
		return 0;
	}
	
	private static void doAfterBuild(int characterId, int function, double value1 ,double value2){
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		long v1;
		long v2;
		if(value1 < 1e-6){
			v1 = 0;
		}else{
			v1 = (long)value1;
		}
		if(value2 < 1e-6){
			v2 = 0;
		}else{
			v2 = (long)value2;
		}
		long v = v2 - v1;
		switch(function){
		case 1://
			break;
		case 2://
			break;
		case 3://
			break;
		case 4://
			break;
		case 5://
			break;
		case 6://提供新兵上限
			maincityService.updateNewSoldierLimit(characterId, (int)(maincity.getNewSoldierLimit()+v));
			break;
		case 7://提供士兵上限
			maincityService.updateSoldierLimit(characterId, (int)(maincity.getSoldierLimit()+v));
			break;
		case 8://提供人口上限
			maincityService.updatePeopleLimit(characterId, (int)(maincity.getPeopleLimit()+v));
			break;
		case 9://交易资源的上限

		case 10://能提供的物品格
			break;
		case 11://能储存的资源量最大值
			maincityService.updateResourceLimit(characterId, maincity.getFoodLimit()+v, 
					maincity.getWoodLimit()+v, maincity.getStoneLimit()+v, maincity.getIronoreLimit()+v);
			break;
		case 12://能保护的资源值
			maincityService.updateCellarLimit(characterId, maincity.getCellarLimit()+v);
			break;
		case 13://城防上限
			break;
		case 14://减少武将刷新时间
			break;
		case 15://存储铜币的上限
			maincityService.updateMoneyLimit(characterId, maincity.getMoneyLimit()+v);
			break;
		case 16://提供药膏的上限
			maincityService.updateMedicineLimit(characterId, (int)(maincity.getMedicineLimit()+v));
			break;
		case 17://减少自身行军时间
			break;
		case 18://减少友军行军时间
			break;
		default://没有这种类型
			logger.error("未识别的建筑特效类型");
			break;
		}
	}
	
	/**
	 * 地窖保管费用 =资源保护总量/105 *保护时间(小时)
	 * @return
	 */
	public static long cellarProtectMony(long sum,int time){
		return (sum+104)/105*time;
	}
	/*
	 * 格式化 建造、拆除、升级 所需时间(ms)
	 * @param queueBuilding
	 * @return
	 */
	public static long formatTime(QueueBuilding queueBuilding) {
		// 时间向上取整
		long remainedTime = queueBuilding.getStartTime().getTime() + queueBuilding.getTime() * 1000 - System.currentTimeMillis();
		// 时间不能为负
		if (remainedTime < 0) {
			remainedTime = 0;
		}
		return remainedTime;
	}
}
