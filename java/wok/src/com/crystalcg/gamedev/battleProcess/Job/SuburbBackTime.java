package com.crystalcg.gamedev.battleProcess.Job;


import java.util.List;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.battleProcess.BattleProcess;


public class SuburbBackTime implements Job{
	private static Logger logger = LoggerFactory.getLogger(SuburbBackTime.class);
	@Override
	public void execute(JobExecutionContext context) {
		List<Integer> characterList = BattleProcess.getSuburBackTimeCharacterList();
		for(Integer characterid:characterList){
			try {
				BattleProcess.resetSuburbBattleBackTime(characterid);
			} catch (AppException e) {
				logger.error("SuburbBackTime:"+e.getMessage());
			}
		}
	}

}
