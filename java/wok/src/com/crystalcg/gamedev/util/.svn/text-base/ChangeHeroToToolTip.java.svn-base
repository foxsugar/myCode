package com.crystalcg.gamedev.util;

import java.util.HashMap;
import java.util.Map;

import com.crystalcg.gamedev.hero.domain.UserHero;

public class ChangeHeroToToolTip {
	public static Map<String, Object> change(UserHero userHero){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("heroName", userHero.getHeroName());
		retMap.put("quality", userHero.getQuality());
		retMap.put("level", userHero.getLevel());
		retMap.put("heroType", userHero.getHeroType());
		retMap.put("stamina", (int)userHero.getStamina());
		retMap.put("staminaMax", (int)userHero.getStaminaMax());
		retMap.put("mp", (int)userHero.getMp());
		retMap.put("mpMax", (int)userHero.getMpMax());
		retMap.put("command", (int)userHero.getCommand());
		retMap.put("heroForce", (int)(userHero.getHeroForce()+userHero.getForceAdd()));
		retMap.put("strategy", (int)(userHero.getStrategy()+userHero.getStrategyAdd()));
		retMap.put("agility", (int)(userHero.getAgility()+userHero.getAgilityAdd()));
		retMap.put("physique", (int)(userHero.getPhysique()+userHero.getPhysiqueAdd()));
		return retMap;
	}
}
