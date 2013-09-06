package com.crystalcg.gamedev.serverTime;

import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Job.ExecuteJob;
import com.crystalcg.gamedev.cometD.UserComet;
import com.crystalcg.gamedev.serverTime.Job.RefreshBattleJobTime;
import com.crystalcg.gamedev.util.Const;

public class RefreshServerTime {
	private UserComet userComet;
	public static boolean isStart=false;
	
//	static{
//		try {
//			createTimeChannel();
//		} catch (AppException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
	
	public void createTimeChannel() throws AppException{
		if(!isStart){
			userComet.addServerChannel(Const.COMET_CHANNEL_SYSTEM+"time");
			String jobId = "refreshServerTime";
			JobDetail jobDetail = JobBuilder.newJob(RefreshBattleJobTime.class).withIdentity(jobId).build();
			Trigger trigger = TriggerBuilder.newTrigger().forJob(jobDetail).startNow().withIdentity(jobId).withSchedule(SimpleScheduleBuilder.repeatSecondlyForever(Const.REFRESH_CIRCLE_TIME)).build();
			try {
				ExecuteJob.scheduler.scheduleJob(jobDetail, trigger);
			} catch (Exception e) {
				System.out.println(e);
				throw new AppException("添加战场时钟失败");
			}
			isStart=true;
		}
	}

	public UserComet getUserComet() {
		return userComet;
	}

	public void setUserComet(UserComet userComet) {
		this.userComet = userComet;
	}
}
