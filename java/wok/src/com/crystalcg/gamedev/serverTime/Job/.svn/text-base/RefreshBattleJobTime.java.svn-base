package com.crystalcg.gamedev.serverTime.Job;

import java.util.HashMap;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;

public class RefreshBattleJobTime implements Job{

	@Override
	public void execute(JobExecutionContext Context) throws JobExecutionException {
		UserComet uc = (UserComet)ServiceLocator.getSpringBean("userComet");
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("time", System.currentTimeMillis());
		uc.publishToChannel(Const.COMET_CHANNEL_SYSTEM+"time", data);
	}
	
}
