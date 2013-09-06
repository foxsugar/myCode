package com.crystalcg.gamedev.alliance.Job;

import java.util.List;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.alliance.domain.AllianceQueue;
import com.crystalcg.gamedev.alliance.service.AllianceMemberService;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.ServiceLocator;

public class DisbandAllianceJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		AllianceQueue allianceQueue = (AllianceQueue) dataMap.get("allianceQueue");
		int allianceId = allianceQueue.getAllianceId();//删除联盟的Id
		
	    AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
	    List<Integer> memberId = allianceMemberService.getAllAllianceMemberId(allianceId);//查询所有的联盟成员
	    CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		   
	    allianceMemberService.deleteAlliance(allianceId);//删除联盟
	    allianceMemberService.deleteAllAllianceMember(allianceId);//删除联盟成员
	    String allianceposition = "";//假设删除后的联盟职位为空
	    for(Integer id : memberId){
	    	characterService.updateAlliance(id, 0, allianceposition);
	    }    
	    allianceMemberService.deleteAllianceQueue(allianceId);//删除解散队列
	}  
}
