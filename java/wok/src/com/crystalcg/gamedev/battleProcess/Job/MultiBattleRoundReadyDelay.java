package com.crystalcg.gamedev.battleProcess.Job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.battleProcess.BattleProcessForMulti;
import com.crystalcg.gamedev.battleProcess.domain.MultiBattle;
import com.crystalcg.gamedev.util.ServiceLocator;

public class MultiBattleRoundReadyDelay implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		// TODO Auto-generated method stub
		Map<String, Object> data = context.getJobDetail().getJobDataMap();
		MultiBattle multiBattle=(MultiBattle)data.get("multiBattle");
		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
		battleProcessForMulti.doRoundReadyDelay(multiBattle);
	}

}
