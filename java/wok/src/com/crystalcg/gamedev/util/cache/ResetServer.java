package com.crystalcg.gamedev.util.cache;

import java.util.List;

import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battle.service.BattleService;
import com.crystalcg.gamedev.battleProcess.Job.SuburbBackTime;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;


/**
 * 服务器重启后数据处理类
 * @author lvxh
 *
 */
public class ResetServer {
	static{
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		List<BattleJobQueue> qList1 = battleService.getAllBattleQueueByStatus(Const.BATTLE_STATUS_WAIT_FIGHT);
		if(qList1 != null && !qList1.isEmpty()){
			for(BattleJobQueue b:qList1){
				battleService.dissolveBattleQueue(b);
			}
		}
		List<BattleJobQueue> qList2 = battleService.getAllBattleQueueByStatus(Const.BATTLE_STATUS_FIGHTING);
		if(qList2 != null && !qList2.isEmpty()){
			for(BattleJobQueue b:qList2){
				battleService.dissolveBattleQueue(b);
			}
		}
		//添加城郊倒计时任务
		ExecuteJob.addCycleJob(SuburbBackTime.class, null, 10, "system_sub_backtime");
	}

}
