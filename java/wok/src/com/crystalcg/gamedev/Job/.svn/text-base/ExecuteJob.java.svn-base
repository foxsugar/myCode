package com.crystalcg.gamedev.Job;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
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
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.triggers.SimpleTriggerImpl;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.resource.domain.UserField;

/**
 * 执行建造、科技等Job
 * @author xuzhongxing
 *
 */
public class ExecuteJob {

	public static Scheduler scheduler;
	static {
		try {
			scheduler = StdSchedulerFactory.getDefaultScheduler();
			scheduler.start();
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}

	public static void add(Class<? extends Job> clazz,Map<String,Object> data,long execTime,String jobId) {
		JobDetail jobDetail = newJob(clazz).withIdentity(jobId).build();
		jobDetail.getJobDataMap().putAll(data);
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(execTime);
		Date triggerStartTime = calendar.getTime();
		Trigger trigger = newTrigger()
				.forJob(jobDetail)
				.withIdentity(jobId)
				.startAt(triggerStartTime)
				.build();
		try {
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (SchedulerException e) { 
			e.printStackTrace();
		}
	}
	/**
	 * 排行刷新计时器
	 * @param clazz
	 * @param jobId
	 * @throws Exception
	 */
	public static void ranking(Class<? extends Job> clazz,String jobId) throws Exception{	
		JobDetail jobDetail = newJob(clazz).withIdentity(jobId).build();
		CronTrigger trigger = TriggerBuilder
				.newTrigger()
				.withIdentity(jobId)
				.withSchedule( CronScheduleBuilder.cronSchedule("59 59 23 * * ?"))
				.build(); 
		try{
			scheduler.scheduleJob(jobDetail,trigger);
		}catch(SchedulerException e){
			e.printStackTrace();
		}
		
	}
	
	public static boolean cancel(String jobId){
		try {
			return scheduler.deleteJob(new JobKey(jobId));
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public static boolean checkExists(String jobId){
		try {
			return scheduler.checkExists(new JobKey(jobId));
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * 酒馆武将刷新
	 * @param clazz
	 * @param jobId
	 * @param startTime
	 * @param intervalTime
	 * @param characterId
	 * @throws AppException
	 */
	public static void addTavernJob(Class<? extends Job> clazz, String jobId, Date startTime,long intervalTime,int characterId) throws AppException {
		JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobId).build();
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("characterId", characterId);
		jobDetail.getJobDataMap().putAll(dataMap);
		Trigger trigger = TriggerBuilder
				.newTrigger()
				.forJob(jobDetail)
				.startAt(startTime)
				.withIdentity(jobId)
				.withSchedule(SimpleScheduleBuilder.simpleSchedule().repeatForever().withIntervalInMilliseconds(intervalTime))
				.build();
		try {
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 修改触发间隔（用户登录期间酒馆完成升级）
	 * @param jobId 触发器Id
	 * @param cycleTime 毫秒单位
	 * @throws AppException
	 */
	public static void modifyTavernInterval(String jobId, long intervalTime) throws AppException {
		try {
			SimpleTriggerImpl triggerNew = (SimpleTriggerImpl) scheduler.getTrigger(TriggerKey.triggerKey(jobId));
			triggerNew.setStartTime(triggerNew.getNextFireTime());
			triggerNew.setRepeatInterval(intervalTime);
			System.err.println("now"+triggerNew.getStartTime());
			scheduler.rescheduleJob(TriggerKey.triggerKey(jobId), triggerNew);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}

	}
	
	/**
	 * 周期不变，修改触发时间（用户刷新酒馆时用）
	 * @param jobId 触发器Id
	 * @param cycleTime 毫秒单位
	 * @throws AppException
	 */
	public static void modifyTavernStart(String jobId, long intervalTime) throws AppException {
		try {
			
			SimpleTriggerImpl triggerNew = (SimpleTriggerImpl) scheduler.getTrigger(TriggerKey.triggerKey(jobId));
			Calendar calendar = Calendar.getInstance();
			System.out.println(checkExists(jobId));
			calendar.setTimeInMillis(System.currentTimeMillis()+intervalTime);
			triggerNew.setStartTime(calendar.getTime());
			scheduler.rescheduleJob(TriggerKey.triggerKey(jobId), triggerNew);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}

	}
	
	/**
	 * 城郊资源更改时钟任务数据，用于城郊资源
	 * @param jobId
	 * @param index
	 */
	public static void modifySuburbResourceData(String jobId, int index){
		try {
			JobDetail jobDetail = scheduler.getJobDetail(new JobKey(jobId));
			@SuppressWarnings("unchecked")
			List<UserField> userFields = (List<UserField>)jobDetail.getJobDataMap().get("userFields");
			userFields.remove(index);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * 按秒循环执行
	 * @param clazz
	 * @param data
	 * @param IntervalTime 执行间隔时间单位秒
	 * @param JobId
	 */
	public static void addCycleJob(Class<? extends Job> clazz, Map<String, Object> data, int IntervalTime, String jobId){
		if(jobId.startsWith("system") && checkExists(jobId)){
			jobId = jobId + new Date().getTime();
		}
		JobDetail jobDetail = JobBuilder.newJob(clazz).withIdentity(jobId).build();
		if(data != null){
			jobDetail.getJobDataMap().putAll(data);
		}
		Trigger trigger = TriggerBuilder.newTrigger().forJob(jobDetail).startNow().withIdentity(jobId).withSchedule(SimpleScheduleBuilder.repeatSecondlyForever(IntervalTime)).build();
		try {
			scheduler.scheduleJob(jobDetail, trigger);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
