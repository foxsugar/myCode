package com.crystalcg.gamedev.util.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticAlliancePrivilege;

public class AlliancePrivilegeCache {
	private static Logger logger = LoggerFactory.getLogger(AlliancePrivilegeCache.class);
	private static Map<String, StaticAlliancePrivilege> STORE ;
	
	
	private AlliancePrivilegeCache(CacheMapper cacheMapper){
		List<StaticAlliancePrivilege> list = cacheMapper.getStaticAlliancePrivilege();
		STORE = new HashMap<String, StaticAlliancePrivilege>();
		for(StaticAlliancePrivilege e : list){
			if(STORE.containsKey(e.getPrivilegeNo())){
				logger.error("duplicate key");
			}
			STORE.put(e.getPrivilegeNo(), e);
		}
		logger.info("[done]");
	}
  /**
   * 根据编号获取
   * @param privilegeNo
   * @return
   */
	public static  StaticAlliancePrivilege  getStaticAlliancePrivilege(String privilegeNo){
		return STORE.get(privilegeNo);
	}

}
