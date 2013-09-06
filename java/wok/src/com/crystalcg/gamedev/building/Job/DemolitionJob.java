package com.crystalcg.gamedev.building.Job;

import java.util.Date;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.building.domain.Building;
import com.crystalcg.gamedev.building.domain.QueueBuilding;
import com.crystalcg.gamedev.building.service.BuildQueueService;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.cache.BuildCache;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.BuildingAlgorithm;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

/**
 * 拆除Job
 * @author xuzhongxing
 *
 */
public class DemolitionJob implements Job{
	
	@Override
	public void execute(JobExecutionContext  context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		QueueBuilding queueBuilding = (QueueBuilding) dataMap.get("queueBuilding");
		int characterId = queueBuilding.getCharacterId();
		
		StaticBuilding curEntity = BuildingCache.getBuildingEntityByNo(queueBuilding.getCurrentBuildingNo());
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		//主城全部资源及上限
		Maincity city = maincityService.getMaincity(characterId);
		//计算资源
		long wood = city.getWood() + BuildingAlgorithm.getDemolitionReturnWood(curEntity.getNeedWood());
		if(wood>city.getWoodLimit()){
			wood = city.getWoodLimit();
		}
		long stone = city.getStone() + BuildingAlgorithm.getDemolitionReturnStone(curEntity.getNeedStone());
		if(stone>city.getStoneLimit()){
			stone = city.getStoneLimit();
		}
		//更新资源
		maincityService.updateBuildResource(characterId, city.getMoney(),wood, stone, city.getIronore());
		
		BuildQueueService buildQueueService = (BuildQueueService) ServiceLocator.getSpringBean("buildQueueService");
		//从队列表中删除
		buildQueueService.deleteQueueBuilding(characterId, queueBuilding.getLocation());
		//更新建筑表
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		if(queueBuilding.getTargetBuildingNo() != null){
			Building building = new Building();
			building.setBuildingNo(queueBuilding.getTargetBuildingNo());
			building.setCharacterId(characterId);
			building.setLevel(BuildingCache.getBuildingEntityByNo(queueBuilding.getTargetBuildingNo()).getLevel());
			building.setLocation(queueBuilding.getLocation());
			buildingService.updateBuildingbyLocation(characterId, building.getLocation(), building.getBuildingNo(), building.getLevel());
			building.setTime(new Date());
		}else{
			buildingService.deleteBuildingByLocation(characterId, queueBuilding.getLocation());
		}
		//完成升级增加人口、兵上限等
		BuildingAlgorithm.afterDemolition(characterId, queueBuilding.getCurrentBuildingNo(),queueBuilding.getTargetBuildingNo());
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.BUILDING_LEVEL, queueBuilding.getTargetBuildingNo(), characterId);
		UserComet userComet = (UserComet) ServiceLocator.getSpringBean("userComet");
		userComet.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, buildingService.getBuildQueue(characterId));
		userComet.publishToGameChannel(Const.GAME_CHANNEL_BULDING_EXP, characterId, characterService.getSimpleUserInfo(characterId));
		//设置缓存中的状态
		BuildCache.removeBuilding(characterId, queueBuilding.getLocation());
	}

}
