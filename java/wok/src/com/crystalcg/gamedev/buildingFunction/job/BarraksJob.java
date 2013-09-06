package com.crystalcg.gamedev.buildingFunction.job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.buildingFunction.domain.UserSoldierQueue;
import com.crystalcg.gamedev.buildingFunction.service.BarracksService;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * 招募兵种
 * @author xuzhongxing
 *
 */
public class BarraksJob implements Job{

	@Override
	public void execute(JobExecutionContext context)
			throws JobExecutionException {
		UserSoldierQueue userSoldierQueue = (UserSoldierQueue) context.getJobDetail().getJobDataMap().get("userSoldierQueue");
		BarracksService barracksService = (BarracksService) ServiceLocator.getSpringBean("barracksService");
		barracksService.afterRecruitSoldier(userSoldierQueue);
	}

}
