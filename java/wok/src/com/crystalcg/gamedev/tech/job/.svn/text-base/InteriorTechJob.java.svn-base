package com.crystalcg.gamedev.tech.job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.tech.action.FormationTechAction;
import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.domain.UserInteriorTech;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.InteriorTechCache;

public class InteriorTechJob implements Job {

	@Override
	public void execute(JobExecutionContext context)
			throws JobExecutionException {
		// TODO Auto-generated method stub
		InteriorTechService techService = (InteriorTechService) ServiceLocator
				.getSpringBean("interiorTechService");
		Map<String, Object> data = context.getJobDetail().getJobDataMap();
		TechQueue userInteriorQueue = (TechQueue) data
				.get("userInteriorQueue");
		int operateType = (Integer) data.get("operateType");
		if (operateType == InteriorTechService.OPERATE_TYPE_INSERT) {
			techService.addInteriorTech(userInteriorQueue.getCharacterId(),
					InteriorTechCache.getInteriorTechByNo(userInteriorQueue.getStudyTechNo()).getTechKey(),
					userInteriorQueue.getStudyTechNo());
		} else if (operateType == InteriorTechService.OPERATE_TYPE_UPDATE) {
			UserInteriorTech userInteriorTech = new UserInteriorTech(
					userInteriorQueue.getStudyTechNo(),
					userInteriorQueue.getCharacterId(),
					InteriorTechCache.getInteriorTechByNo(userInteriorQueue.getStudyTechNo()).getTechKey());
			techService.updateInteriorTech(userInteriorTech);
		}
		techService.deleteTechQueue(userInteriorQueue.getCharacterId());
		FormationTechAction.techNoTempMap.put(userInteriorQueue.getCharacterId(), userInteriorQueue.getStudyTechNo());
	}

}
