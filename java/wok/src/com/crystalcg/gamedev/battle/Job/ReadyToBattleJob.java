package com.crystalcg.gamedev.battle.Job;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battle.service.BattleService;
import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.RandomFunc;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.domain.StaticWorldResource;
import com.crystalcg.gamedev.world.DataPack;
import com.crystalcg.gamedev.world.WorldService;

/**
 * 前往、返回，到达目的地后执行的操作
 * @author jinganyang
 *
 */
public class ReadyToBattleJob implements Job{

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		Map<String,Object> dataMap = context.getJobDetail().getJobDataMap();
		BattleJobQueue battleJobQueue = (BattleJobQueue) dataMap.get("battleData");

		UserComet uc = (UserComet)ServiceLocator.getSpringBean("userComet");
		BattleService bs = (BattleService)ServiceLocator.getSpringBean("battleService");
		UserHeroService us = (UserHeroService)ServiceLocator.getSpringBean("userHeroService");
		UserItemService uis = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		if(battleJobQueue.getStatus()==Const.BATTLE_STATUS_TOWARD){
			Map<String, Object> systemData = new HashMap<String, Object>();
			systemData.put("warnType", Const.BATTLE_WARN_TYPE_NORMAL);
			systemData.put("battleInfo", battleJobQueue.getId());//测试，需要删
			//更新战斗队列状态
			if(battleJobQueue.getTargetType()==Const.TARGET_TYPE_RESOURCE){
				int x = (Integer) dataMap.get("x");
				int y = (Integer) dataMap.get("y");
				DataPack dp = WorldService.getResource(x,y);
//				String materialNo = staticWorldResource.getMaterial_no();//材料编号
				StaticWorldResource staticWorldResource = dp.getStaticWorldResource();
				int num = RandomFunc.randomNum(staticWorldResource.getMaterailMinNum(),staticWorldResource.getMaterailMaxNum());//获得随机数
				try {
					uis.addItem2character(battleJobQueue.getTargetNo(),Const.TYPE_MATERIAL,num,battleJobQueue.getCharacterId());//添加物品到背包
				} catch (AppException e) {
					e.printStackTrace();
				}
				long d = battleJobQueue.getArrivingTime().getTime()-battleJobQueue.getGoTime().getTime();
				Date date = new Date(System.currentTimeMillis()+d);
				battleJobQueue.setStatus(Const.BATTLE_STATUS_BACK);
				battleJobQueue.setBackArriveTime(date);
				battleJobQueue.setBackTime(new Date());
				bs.updateBattelQueue(battleJobQueue);//更新 
				Map<String,Object> data = new HashMap<String,Object>();
				data.put("battleData", battleJobQueue);
				data.put("x", x);
				data.put("y", y);
				ExecuteJob.add(ReadyToBattleJob.class, data, System.currentTimeMillis()+d,"collection"+Const.BATTLE_STATUS_BACK+x+y);
				return;
			}
			if(battleJobQueue.getTargetType()==Const.TARGET_TYPE_CHAR){
				try {
					updateBattleJob(battleJobQueue);
				} catch (AppException e) {
					e.printStackTrace();
				}
			}else{
				battleJobQueue.setStatus(Const.BATTLE_STATUS_WAIT);
				bs.updateBattelQueue(battleJobQueue);
				uc.publishToGameChannel(Const.GAME_CHANNEL_BATTLE_WARN, battleJobQueue.getCharacterId(), systemData);
				if(battleJobQueue.getTargetType()==Const.TARGET_TYPE_CHAR&&uc.ifChannelExist(Const.COMET_CHANNEL_SYSTEM+battleJobQueue.getTargetId())){
					uc.publishToGameChannel(Const.GAME_CHANNEL_BATTLE_WARN, battleJobQueue.getTargetId(), systemData);
				}
			}
		}else if(battleJobQueue.getStatus()==Const.BATTLE_STATUS_BACK){
			if(battleJobQueue.getTargetType()==Const.TARGET_TYPE_RESOURCE){
				int x = (Integer) dataMap.get("x");
				int y = (Integer) dataMap.get("y");
				DataPack dp = WorldService.getResource(x,y);
				dp.setStatus(0);
			}
			bs.deleteBattelQueue(battleJobQueue);
			String[] userHeroIds = battleJobQueue.getHeroList().split(",");
			int characterId = battleJobQueue.getCharacterId();
			for (String i : userHeroIds) {
				int userHeroId = Integer.parseInt(i);
				if (userHeroId == 0) {
					continue;
				} else {
					us.updateHeroStatus(characterId, userHeroId, Const.HERO_STATUS_FREE);
				}
			}
		}
		
	}
	private void updateBattleJob(BattleJobQueue battleJobQueue) throws AppException{
		BattleProcess.addBattleQueue(battleJobQueue);
		BattleProcess.resetState(battleJobQueue);
	}
	
}
