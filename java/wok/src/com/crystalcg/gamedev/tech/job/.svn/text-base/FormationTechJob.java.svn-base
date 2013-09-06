package com.crystalcg.gamedev.tech.job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.tech.action.FormationTechAction;
import com.crystalcg.gamedev.tech.domain.TechQueue;
import com.crystalcg.gamedev.tech.domain.UserFormationTech;
import com.crystalcg.gamedev.tech.service.FormationTechService;
import com.crystalcg.gamedev.tech.service.InteriorTechService;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.FormationCache;
import com.crystalcg.gamedev.util.cache.domain.StaticFormationTech;

public class FormationTechJob implements Job {

	@Override
	public void execute(JobExecutionContext context)
			throws JobExecutionException {
		// TODO Auto-generated method stub
		System.err.println("**************************execute");
		FormationTechService formationTechService = (FormationTechService) ServiceLocator
				.getSpringBean("formationTechService");
		InteriorTechService techService = (InteriorTechService) ServiceLocator
				.getSpringBean("interiorTechService");
		Map<String, Object> data = context.getJobDetail().getJobDataMap();
		TechQueue userInteriorQueue = (TechQueue) data.get("userTechQueue");
		int operateType = (Integer) data.get("operateType");
		StaticFormationTech staticFormationTech = FormationCache
				.getFormationTechByNo(userInteriorQueue.getStudyTechNo());
		UserFormationTech userFormationTech = new UserFormationTech(
				staticFormationTech.getTechNo(),
				userInteriorQueue.getCharacterId(),
				staticFormationTech.getTechLocation());
		if (operateType == InteriorTechService.OPERATE_TYPE_INSERT) {
			formationTechService.addUserFormationTech(userFormationTech);
		} else if (operateType == InteriorTechService.OPERATE_TYPE_UPDATE) {
			formationTechService.updateUserFormationTech(userFormationTech);
		}
		 techService.deleteTechQueue(userInteriorQueue.getCharacterId());//删除队列表中数据，方法卸载内政科技中
		 FormationTechAction.techNoTempMap.put(userInteriorQueue.getCharacterId(), userInteriorQueue.getStudyTechNo());
	}

}
