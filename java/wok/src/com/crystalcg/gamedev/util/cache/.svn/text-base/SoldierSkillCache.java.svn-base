package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticSoldierSkill;

/**
 * 兵种技能静态信息
 * @author jinganyang
 *
 */
public class SoldierSkillCache {
	private static Map<String, StaticSoldierSkill> SOLDIER_SKILL_STORE;
	private static Logger logger = LoggerFactory.getLogger(SoldierSkillCache.class);
	private SoldierSkillCache(CacheMapper cacheMapper) {
		SOLDIER_SKILL_STORE = new HashMap<String, StaticSoldierSkill>();
		List<StaticSoldierSkill> staticSoldierSkills = cacheMapper.getStaticSoldierSkill();
		for(StaticSoldierSkill i:staticSoldierSkills){
			SOLDIER_SKILL_STORE.put(i.getSkillNo(), i);
		}
		logger.info("SoldierSkillCache has successfully loaded");
	}
	/**
	 * 获取兵种技能实体
	 * @param skillNo
	 * @return
	 */
	public static StaticSoldierSkill getStaticSoldierSkill(String skillNo){
		return SOLDIER_SKILL_STORE.get(skillNo);
	}
}
