package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticImageResource;
import com.crystalcg.gamedev.util.cache.domain.StaticPic;

/**
 * 图片资源
 * @author jinganyang
 *
 */
public class ImageResourceCache {
	private static Logger logger = LoggerFactory.getLogger(ImageResourceCache.class);
	private static Map<String,StaticImageResource> STORE;
	private static Map<Integer,List<StaticImageResource>> STORE_BY_TYPE;
	private static Map<String,StaticPic> PIC_MAP;//存储头像键值对头像id-头像对象
	private static Map<Integer,List<String>> PIC_MAP_SYS;//系统-性别-头像图片名字集合
	private static Map<Integer,List<StaticPic>> PIC_MAP_ALL;//所有-性别-头像对象集合
	private ImageResourceCache(CacheMapper cacheMapper){
		STORE = new HashMap<String, StaticImageResource>();
		STORE_BY_TYPE = new HashMap<Integer, List<StaticImageResource>>();
		List<StaticImageResource> imageResourceCaches = cacheMapper.getStaticImageResources();
		for(StaticImageResource i:imageResourceCaches){
			STORE.put(i.getName(), i);
			if(STORE_BY_TYPE.get(i.getType())!=null){
				STORE_BY_TYPE.get(i.getType()).add(i);
			}else{
				List<StaticImageResource> tempList = new ArrayList<StaticImageResource>();
				tempList.add(i);
				STORE_BY_TYPE.put(i.getType(), tempList);
			}
		}
		PIC_MAP = new HashMap<String, StaticPic>();
		PIC_MAP_SYS = new HashMap<Integer, List<String>>();
		PIC_MAP_ALL = new HashMap<Integer, List<StaticPic>>();
		List<StaticPic> picList = cacheMapper.getSystemPic();
		//数据取
		for(StaticPic pic : picList){
			PIC_MAP.put(pic.getName(), pic);
			if(pic.getType() == 1){
				if(PIC_MAP_SYS.get(pic.getGender()) == null){
					PIC_MAP_SYS.put(pic.getGender(), new ArrayList<String>());
				}
				PIC_MAP_SYS.get(pic.getGender()).add(pic.getName());
			}
			if(PIC_MAP_ALL.get(pic.getGender()) == null){
				PIC_MAP_ALL.put(pic.getGender(), new ArrayList<StaticPic>());
			}
			PIC_MAP_ALL.get(pic.getGender()).add(pic);
			
		}
		logger.info("[done]");
	}
	public static StaticImageResource getResourceByNo(String name){
		return STORE.get(name);
	}
	public static List<StaticImageResource> getResourcesByType(int type){
		return STORE_BY_TYPE.get(type);
	}
	/**
	 * 获得系统头像信息
	 * @param id 
	 * @return
	 */
	public static StaticPic getPicByName(String name){
		return PIC_MAP.get(name);
	}
	/**
	 * 根据系统标示和性别获得所有头像列表
	 * @param sex 性别
	 * @return
	 */
	public static List<StaticPic> getPic(int sex){
		return PIC_MAP_ALL.get(sex);
	}
	/**
	 * 根据性别获得头像图片名称集合
	 * @param sex
	 * @return
	 */
	public static List<String> getPicByName(int sex){
		return PIC_MAP_SYS.get(sex);
	}
}
