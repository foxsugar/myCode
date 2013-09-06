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
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.BuildingAlgorithm;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.BuildingCache;

/**
 * 升级Job
 * 
 * @author xuzhongxing
 * 
 */
public class UpgradeJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		QueueBuilding queueBuilding = (QueueBuilding) dataMap.get("queueBuilding");
		int characterId = queueBuilding.getCharacterId();
		
		Building building = new Building();
		building.setBuildingNo(queueBuilding.getTargetBuildingNo());
		building.setCharacterId(characterId);
		building.setLevel(BuildingCache.getBuildingEntityByNo(queueBuilding.getTargetBuildingNo()).getLevel());
		building.setLocation(queueBuilding.getLocation());
		building.setTime(new Date());
		BuildQueueService buildQueueService = (BuildQueueService) ServiceLocator.getSpringBean("buildQueueService");
		//从队列表中删除
		buildQueueService.deleteQueueBuilding(characterId, queueBuilding.getLocation());
		//更新建筑表
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		buildingService.updateBuildingbyLocation(characterId, building.getLocation(), building.getBuildingNo(), building.getLevel());
		//完成升级增加人口、兵上限等
		BuildingAlgorithm.afterUpgrade(characterId, queueBuilding.getCurrentBuildingNo(),queueBuilding.getTargetBuildingNo());
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
