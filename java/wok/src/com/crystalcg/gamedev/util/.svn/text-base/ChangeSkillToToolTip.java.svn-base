package com.crystalcg.gamedev.util;

import java.util.HashMap;
import java.util.Map;

import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;

public class ChangeSkillToToolTip {
	public static Map<String, Object> change(StaticHeroSkill staticHeroSkill){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("name", staticHeroSkill.getName());
		retMap.put("level", staticHeroSkill.getLevel());
		retMap.put("needVnp", staticHeroSkill.getNeedVnp());
		retMap.put("coolDown", staticHeroSkill.getCoolDown());
		retMap.put("description", staticHeroSkill.getDescription());
		return retMap;
	}
}	
