package com.crystalcg.gamedev.battleProcess.Job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.battleProcess.BattleProcessForMulti;
import com.crystalcg.gamedev.battleProcess.domain.MultiBattle;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * 准备延时,战场开启时
 * @author jinganyang
 *
 */
public class MultiBattleReadyDelayJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		// TODO Auto-generated method stub
		Map<String, Object> data = context.getJobDetail().getJobDataMap();
		MultiBattle multiBattle=(MultiBattle)data.get("multiBattle");
		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
		battleProcessForMulti.doReadyDelay(multiBattle);
	}

}
