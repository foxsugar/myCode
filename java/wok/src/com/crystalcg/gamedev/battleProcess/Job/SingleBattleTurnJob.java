package com.crystalcg.gamedev.battleProcess.Job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattle;
import com.crystalcg.gamedev.util.ServiceLocator;

public class SingleBattleTurnJob implements Job{

//	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
//		// TODO Auto-generated method stub
		Map<String, Object> data = context.getJobDetail().getJobDataMap();
		SingleBattle singleBattle=(SingleBattle)data.get("singleBattle");
		BattleProcess bp = (BattleProcess)ServiceLocator.getSpringBean("battleProcess");
		bp.doSingleOperate(singleBattle);
	}

}
