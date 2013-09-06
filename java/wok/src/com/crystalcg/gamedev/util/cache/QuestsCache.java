package com.crystalcg.gamedev.util.cache;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticQuests;

public class QuestsCache {
	private static Logger logger = LoggerFactory.getLogger(EquipmentCache.class);
	private static Map<String, StaticQuests> QUESTS_STORE;
	private QuestsCache(CacheMapper cacheMapper){
		QUESTS_STORE = new HashMap<String, StaticQuests>();
		List<StaticQuests> quests = cacheMapper.getStaticQuests();
		for(StaticQuests i :quests){
			QUESTS_STORE.put(i.getItemNo(), i);
			i.setItemType(Const.TYPE_QUESTS);
		}
		logger.info("任务物品信息加载成功");
	}
	/**
	 * 通过no查找材料静态信息
	 * @param materialNo
	 * @return
	 */
	public static StaticQuests getQuestsByNo(String itemNo){
		return QUESTS_STORE.get(itemNo);
	}
	public static Collection<StaticQuests> getAllQuest(){
		return QUESTS_STORE.values();
	}
}
