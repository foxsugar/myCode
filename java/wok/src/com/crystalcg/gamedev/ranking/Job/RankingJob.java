package com.crystalcg.gamedev.ranking.Job;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.CacheMapper;
import com.crystalcg.gamedev.util.cache.RankingCache;
import com.crystalcg.gamedev.util.cache.RankingMapper;

public class RankingJob implements Job{

	@Override
	public void execute(JobExecutionContext cont) throws JobExecutionException {
		// TODO Auto-generated method stub
		RankingMapper rankingMapper = (RankingMapper)ServiceLocator.getSpringBean("rankingMapper");
		RankingCache.loadData(rankingMapper);
	
	}
}
