package com.crystalcg.gamedev.Job;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
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
import com.crystalcg.gamedev.hero.domain.TavernQueue;

public class ExecuteTavernJob {
	private static Scheduler scheduler = ExecuteJob.scheduler;


	// 添加job立即执行，用在第一次造酒馆；
	public static void addJob(Class<? extends Job> clazz, String jobId, TavernQueue tavernQueue) throws AppException {
		JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobId).build();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("dataMap", tavernQueue);
		jobDetail.getJobDataMap().putAll(dataMap);
		Trigger trigger = TriggerBuilder
				.newTrigger()
				.forJob(jobDetail)
				.startNow()
				.withIdentity(jobId)
				.withSchedule(
						SimpleScheduleBuilder.simpleSchedule().repeatForever()
								.withIntervalInMinutes(tavernQueue.getCircleTime())).build();
		try {
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			throw new AppException("scheduler添加job失败");
		}
	}
	
	public static void addJobByStartTime(Class<? extends Job> clazz, String jobId, Date startTime, TavernQueue tavernQueue) throws AppException {
		try{
			if(scheduler.getJobDetail(JobKey.jobKey(jobId))!=null){
				return;
			}
		} catch(SchedulerException e){
			System.out.println(e.getMessage());
			throw new AppException("scheduler获取失败");
		}
		JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobId).build();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("dataMap", tavernQueue);
		jobDetail.getJobDataMap().putAll(dataMap);
		Trigger trigger = TriggerBuilder
				.newTrigger()
				.forJob(jobDetail)
				.startAt(startTime)
				.withIdentity(jobId)
				.withSchedule(
						SimpleScheduleBuilder.simpleSchedule().repeatForever()
								.withIntervalInMinutes(tavernQueue.getCircleTime())).build();
		try {
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			System.out.println(e.getMessage());
			throw new AppException("scheduler添加job失败");
		}
	}

	// 修改job
	/**
	 * @param jobId
	 *            触发器Id
	 * @param cycleTime
	 *            毫秒单位
	 * @throws AppException
	 */
	public static void modifyJobForCircle(String jobId, TavernQueue tavernQueue) throws AppException {
		try {
			JobDataMap changedDateMap = scheduler.getJobDetail(JobKey.jobKey(jobId)).getJobDataMap();
			((TavernQueue)changedDateMap.get("dataMap")).setCircleTime(tavernQueue.getCircleTime());
			SimpleTriggerImpl triggerNew = (SimpleTriggerImpl) scheduler
					.getTrigger(TriggerKey.triggerKey(jobId));
			triggerNew.setStartTime(tavernQueue.getNextFireTime());
			triggerNew.setRepeatInterval(tavernQueue.getCircleTime()*1000*60);
			scheduler.rescheduleJob(TriggerKey.triggerKey(jobId), triggerNew);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			throw new AppException("触发器修改失败");
		}

	}
	public static void modifyJobForStartTime(String jobId, TavernQueue tavernQueue) throws AppException {
		try {
			JobDataMap changedDateMap = scheduler.getJobDetail(JobKey.jobKey(jobId)).getJobDataMap();
			((TavernQueue)changedDateMap.get("dataMap")).setCircleTime(tavernQueue.getCircleTime());
			SimpleTriggerImpl triggerNew = (SimpleTriggerImpl) scheduler
					.getTrigger(TriggerKey.triggerKey(jobId));
			triggerNew.setStartTime(triggerNew.getNextFireTime());
			triggerNew.setRepeatInterval(tavernQueue.getCircleTime()*1000*60);
			scheduler.rescheduleJob(TriggerKey.triggerKey(jobId), triggerNew);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			throw new AppException("触发器修改失败");
		}
		
	}

	public static void deleteJob(String jobId) throws AppException {
		try {
			scheduler.deleteJob(JobKey.jobKey(jobId));
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			throw new AppException("删除Job错误，删除失败");
		}
	}
}
