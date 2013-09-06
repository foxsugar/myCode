package com.crystalcg.gamedev.util.cache;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkillLastEffect;

/**
 * 武将技能
 * @author xuzhongxing
 *
 */
public class HeroSkillCache {

	private static Logger logger = LoggerFactory.getLogger(HeroSkillCache.class);
	private static Map<String,StaticHeroSkill> STORE;
	private static Map<String,StaticHeroSkillLastEffect> STORE_EFFECT;
	
	private HeroSkillCache(CacheMapper cacheMapper){
		List<StaticHeroSkill> list = cacheMapper.getStaticHeroSkill();
		STORE = new HashMap<String, StaticHeroSkill>();
		STORE_EFFECT = new HashMap<String, StaticHeroSkillLastEffect>();
		for (StaticHeroSkill e : list) {
			if(STORE.containsKey(e.getSkillNo())){
				logger.error("duplicate key");
			}
			STORE.put(e.getSkillNo(), e);
		}
		List<StaticHeroSkillLastEffect> listEffects = cacheMapper.getStaticHeroSkillLastEffect();
		for(StaticHeroSkillLastEffect i:listEffects){
			STORE_EFFECT.put(i.getEffectNo(), i);
		}
		logger.info("[done]");
	}
	
	
	/**
	 * 获取全部武将技能
	 * @return
	 */
	public static Collection<StaticHeroSkill> getAllHeroSill(){
		return STORE.values();
	}
	
	/**
	 * 根据编码获取某个技能
	 * @param skillNo
	 * @return
	 */
	public static StaticHeroSkill getHeroSkill(String skillNo){
		return STORE.get(skillNo);
	}
	/**
	 * 获取持续性效果
	 * @param effectNo
	 * @return
	 */
	public static StaticHeroSkillLastEffect getHeroSkillLastEffect(String effectNo){
		return STORE_EFFECT.get(effectNo);
	}
	
}
