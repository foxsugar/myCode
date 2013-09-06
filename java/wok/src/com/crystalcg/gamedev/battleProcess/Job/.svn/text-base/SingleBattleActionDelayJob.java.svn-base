package com.crystalcg.gamedev.battleProcess.Job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;

import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattle;
import com.crystalcg.gamedev.util.ServiceLocator;

public class SingleBattleActionDelayJob implements Job{

	@Override
	public void execute(JobExecutionContext context) {
		System.err.println("-------------------正在执行SingleBattleActionDelayJob");
		//获取战场数据
		Map<String, Object> data = context.getJobDetail().getJobDataMap();
		SingleBattle singleBattle=(SingleBattle)data.get("singleBattle");
		
		BattleProcess bp = (BattleProcess)ServiceLocator.getSpringBean("battleProcess");
		//延时时间到，自动执行小回合结束
		bp.doSingleActionDelay(singleBattle);
	}

}
