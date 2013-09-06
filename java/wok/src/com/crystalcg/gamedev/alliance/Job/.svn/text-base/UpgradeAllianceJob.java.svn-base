package com.crystalcg.gamedev.alliance.Job;

import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.alliance.domain.AllianceUpgradeQueue;
import com.crystalcg.gamedev.alliance.service.AllianceMemberService;
import com.crystalcg.gamedev.alliance.service.AllianceService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.util.ServiceLocator;


public class UpgradeAllianceJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		AllianceUpgradeQueue allianceUpQueue = (AllianceUpgradeQueue) dataMap.get("allianceUpQueue");
		int level = allianceUpQueue.getLevel();
		int allianceId = allianceUpQueue.getAllianceId();
		AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
		allianceService.updateAllianceLevel(allianceId, level);//更新联盟等级
		allianceService.deleteAllianceUpQueue(allianceId);//删除联盟升级队列	
		AllianceMemberService allianceMemberService = (AllianceMemberService)ServiceLocator.getSpringBean("allianceMemberService");
		List<Integer> characterIds = allianceMemberService.getAllAllianceMemberId(allianceId);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateAllianceLevelSchedule(characterIds, level);
	}
}
