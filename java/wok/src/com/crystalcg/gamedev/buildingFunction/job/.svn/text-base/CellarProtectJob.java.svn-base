package com.crystalcg.gamedev.buildingFunction.job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.buildingFunction.service.CellarService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * 地窖保护时间job
 * @author xuzhongxing
 *
 */
public class CellarProtectJob implements Job{
	@Override
	public void execute(JobExecutionContext  context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		int characterId = (Integer) dataMap.get("characterId");
		int protectionNo = (Integer) dataMap.get("protectionNo");
		CellarService cellarService = (CellarService)ServiceLocator.getSpringBean("cellarService");
		cellarService.updataCellar(characterId, protectionNo);
		
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		maincityService.cancelCellarProtect(characterId);
	}
}
