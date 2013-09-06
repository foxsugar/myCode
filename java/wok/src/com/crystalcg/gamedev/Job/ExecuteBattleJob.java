package com.crystalcg.gamedev.Job;

import java.util.Date;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;
import org.quartz.impl.triggers.SimpleTriggerImpl;

import com.crystalcg.gamedev.Exception.AppException;

public class ExecuteBattleJob {
	private static Scheduler scheduler = ExecuteJob.scheduler;
	/**
	 * 单次执行
	 * @param clazz
	 * @param data
	 * @param fireTime
	 * @param jobId
	 * @throws AppException
	 */
	public static void addBattleJob(Class<? extends Job> clazz,Map<String, Object> data, Date fireTime, String jobId){
		if(isExist(jobId)){
			jobId +="_1";
		}
		System.out.println("-----------------------------------------------------添加延时 "+fireTime+clazz.getName()+"     "+jobId);
		JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobId).build();
		jobDetail.getJobDataMap().putAll(data);
		Trigger trigger = TriggerBuilder.newTrigger().forJob(jobDetail).startAt(fireTime).withIdentity(jobId).build();
		try {
			System.err.println();
			System.out.println(scheduler.getCurrentlyExecutingJobs());
			System.out.println(scheduler.getJobGroupNames());
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (Exception e) {
			System.out.println(e);
//			throw new AppException("添加战斗时钟任务失败");
		}
		System.out.println("-----------------------------------------------------添加延时成功");
		
	}
	/**
	 * 按秒循环执行
	 * @param clazz
	 * @param data
	 * @param circleTime 单位秒
	 * @param JobId
	 * @throws AppException
	 */
	public static void addBattleActionJob(Class<? extends Job> clazz, Map<String, Object> data, int circleTime, String jobId, int roundTime){
		if(isExist(jobId)){
			jobId +="_1";
		}
		JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobId).build();
		jobDetail.getJobDataMap().putAll(data);
		Trigger trigger = TriggerBuilder.newTrigger().forJob(jobDetail).startNow().withIdentity(jobId).withSchedule(SimpleScheduleBuilder.repeatSecondlyForTotalCount(roundTime+1, circleTime)).build();
		try {
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (Exception e) {
			System.out.println(e);
//			throw new AppException("添加战场时钟失败");
		}
	}
	public static void modifyBattleJob(Date fireTime, String jobId){
		try {
			SimpleTriggerImpl simpleTriggerImpl = (SimpleTriggerImpl)scheduler.getTrigger(TriggerKey.triggerKey(jobId));
			simpleTriggerImpl.setNextFireTime(fireTime);
			scheduler.rescheduleJob(TriggerKey.triggerKey(jobId), simpleTriggerImpl);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static boolean isExist(String jobId){
		try {
			return scheduler.checkExists(new JobKey(jobId));
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
	public static void deleteBattleJob(String jobId){
		try {
			if(isExist(jobId)){
				scheduler.deleteJob(JobKey.jobKey(jobId));
			}else if(isExist(jobId+"_1")){
				scheduler.deleteJob(JobKey.jobKey(jobId+"_1"));
			}
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			System.out.println(e);
//			throw new AppException("删除战场时钟失败");
		}
	}
	/**
	 * 立即执行任务,并不删除原来任务
	 * @param jobId
	 */
	public static void doExecuteOnly(String jobId){
		try {
			if(isExist(jobId)){
				scheduler.triggerJob(JobKey.jobKey(jobId));
			}
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 立即执行任务,并删除原来任务
	 * @param jobId
	 */
	public static void doExecute(String jobId){
		try {
			if(isExist(jobId)){
				scheduler.triggerJob(JobKey.jobKey(jobId));
				scheduler.unscheduleJob(new TriggerKey(jobId));
			}
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}
}
