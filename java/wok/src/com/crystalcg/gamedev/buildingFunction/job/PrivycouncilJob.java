package com.crystalcg.gamedev.buildingFunction.job;

import java.util.Map;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.buildingFunction.service.PrivycouncilService;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.AffairBonusCache;
import com.crystalcg.gamedev.util.cache.domain.StaticAffairBonus;

/**
 * 军机处 内政策略
 * @author xuzhongxing
 *
 */
public class PrivycouncilJob implements Job{
	private static Logger logger = LoggerFactory.getLogger(PrivycouncilJob.class);
	@Override
	public void execute(JobExecutionContext  context) throws JobExecutionException {
		Map<String,Object> data = context.getJobDetail().getJobDataMap();
		int characterId = (Integer) data.get("characterId");
		int userHeroId = (Integer)data.get("userHeroId");
		String affairNo = (String)data.get("affairNo");
		//更新武将状态
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero uh = userHeroService.getUserHero(characterId, userHeroId);
		uh.setHeroStatus(Const.HERO_STATUS_FREE);
		userHeroService.updateHeroStatus(uh);
		//删除队列
		PrivycouncilService privycouncilService = (PrivycouncilService)ServiceLocator.getSpringBean("privycouncilService");
		privycouncilService.delete(characterId, userHeroId);
		StaticAffairBonus ae = AffairBonusCache.getAffairByNo(affairNo);
		try {
			userHeroService.addExp(characterId, userHeroId, ae.getAddHeroExp());
		} catch (AppException e) {
			logger.error("武将已删除");
		}
		System.out.println("affair done");
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.USE_HERO_MISSION, null, characterId);
	}
}
