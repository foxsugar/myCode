package com.crystalcg.gamedev.alliance.Job;

import java.util.HashMap;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.alliance.domain.AllianceTechnology;
import com.crystalcg.gamedev.alliance.domain.AllianceTechnologyQueue;
import com.crystalcg.gamedev.alliance.service.AllianceService;
import com.crystalcg.gamedev.alliance.service.AllianceWelfareService;
import com.crystalcg.gamedev.util.ServiceLocator;

public class UpgradeAllianceTechnologyJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		AllianceTechnologyQueue at = (AllianceTechnologyQueue) dataMap.get("allianceTechnologyQueue");
		int needWealth = (Integer) dataMap.get("needWealth");
		int allianceId = (Integer)dataMap.get("allianceId");
		AllianceTechnology allianceTechnology = new AllianceTechnology();
		allianceTechnology.setAllianceId(at.getAllianceId());
		allianceTechnology.setLevel(at.getLevel());
		allianceTechnology.setTechnologyNo(at.getTechnologyNo());
		
		String[] str = (at.getTechnologyNo().split("_"));
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("allianceId", at.getAllianceId());
		String like = str[0]+"%";
//		StringBuffer sb = new StringBuffer();
//		sb.append("%");
//		sb.append(str[0]);
//		sb.append("%");
		param.put("like", like);
		param.put("technologyNo", at.getTechnologyNo());
		param.put("level", at.getLevel());
		AllianceWelfareService allianceWelfareService = (AllianceWelfareService) ServiceLocator.getSpringBean("allianceWelfareService");
		AllianceService allianceService = (AllianceService) ServiceLocator.getSpringBean("allianceService");
		if(allianceWelfareService.getAllianceTechologyInfo(allianceId, str[0])==null){
		allianceWelfareService.insertAllianceTechnology(allianceTechnology);// 插入到联盟科技表
		}else{
			allianceWelfareService.updateAllianceTechnology(param);//更新联盟科技
		}
		allianceWelfareService.deleteAllianceTechnologyQueue(at.getAllianceId(), at.getTechnologyNo());//删除联盟科技升级队列
		allianceService.updateAllianceWealth(at.getAllianceId(), -needWealth);//更新联盟财富
	}
}
