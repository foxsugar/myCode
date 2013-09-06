package com.crystalcg.gamedev.buildingFunction.job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensen;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallDefensenQueue;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;

public class WallDefensenJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		
		UserWallDefensenQueue walldefenqueue = (UserWallDefensenQueue) dataMap.get("walldefenqueue");
		String isUpdate = (String) dataMap.get("isUpdate");
		
		UserWallDefensen userWallDefensen = new UserWallDefensen();
		userWallDefensen.setCharacterId(walldefenqueue.getCharacterId());
		userWallDefensen.setWallDefensenNo(walldefenqueue.getNo());
		userWallDefensen.setWallDefensenNum(walldefenqueue.getNum());
		
		WallDefensenService walldefService = (WallDefensenService) ServiceLocator.getSpringBean("walldefService");
		//从队列中删除
		walldefService.deleteWallDefensenQueue(walldefenqueue.getCharacterId());
		//boolean isUpdate = (boolean) dataMap.get("isUpdate");
		if("1".equals(isUpdate)){
			 //更新城防工事
			walldefService.updateWallDefensen(userWallDefensen);
		}else {
			//插入城防工事
			walldefService.insertWallDefensen(userWallDefensen);
		}
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.WALL_DEFENCE_AMOUNT, null, walldefenqueue.getCharacterId());
		
	}
 
		
}
