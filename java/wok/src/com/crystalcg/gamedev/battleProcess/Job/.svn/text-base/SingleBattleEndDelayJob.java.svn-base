package com.crystalcg.gamedev.battleProcess.Job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattle;
import com.crystalcg.gamedev.util.ServiceLocator;

public class SingleBattleEndDelayJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		System.err.println("-------------------------执行小回合结束延时SingleBattleEndDelayJob");
		// TODO Auto-generated method stub
		//获取战场数据
		Map<String, Object> data = context.getJobDetail().getJobDataMap();
		SingleBattle singleBattle=(SingleBattle)data.get("singleBattle");
		
		//延时时间到，自动执行小回合结束
		BattleProcess bp = (BattleProcess)ServiceLocator.getSpringBean("battleProcess");
//		UserComet uc = (UserComet)ServiceLocator.getSpringBean("userComet");
		bp.doSingleEndDelay(singleBattle);
	}

}
