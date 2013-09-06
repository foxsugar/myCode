package com.crystalcg.gamedev.tech.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.tech.action.FormationTechAction;
import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.tech.service.SoldierTechService;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * 兵种科技job
 * @author xuzhongxing
 *
 */
public class SoldierTechJob implements Job {

	@Override
	public void execute(JobExecutionContext context)
			throws JobExecutionException {
		TechQueue techQueue = (TechQueue) context.getJobDetail().getJobDataMap().get("techQueue");
		//删除队列
		InteriorTechService interiorTechService = (InteriorTechService) ServiceLocator.getSpringBean("interiorTechService");
		interiorTechService.deleteTechQueue(techQueue.getCharacterId());
		//插入兵种科技表
		SoldierTechService soldierTechService = (SoldierTechService) ServiceLocator.getSpringBean("soldierTechService");
		soldierTechService.learnTech(techQueue.getCharacterId(), techQueue.getStudyTechNo());
		FormationTechAction.techNoTempMap.put(techQueue.getCharacterId(), techQueue.getStudyTechNo());
	}

}
