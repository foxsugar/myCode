package com.crystalcg.gamedev.util.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldier;
import com.crystalcg.gamedev.util.cache.domain.StaticSoldierTech;

/**
 * 兵种科技
 * 
 * @author xuzhongxing
 * 
 */
public class SoldierTechCache {
	private static Logger logger = LoggerFactory.getLogger(SoldierTechCache.class);
	private static Map<String, StaticSoldierTech> STORE;// 全部科技
	private static StaticSoldierTech[][] STORE_1;//全部一级科技
	private static Map<String,Map<Integer,StaticSoldierTech>> SOLDIER_TYPE_STORE;// 兵种专精科技编号-->等级-->对象
	private static Map<String, StaticSoldierTech> SOLDIER1_STORE;// 刀兵科技编号-->对象
	private static Map<String, StaticSoldierTech> SOLDIER2_STORE;// 枪兵科技编号-->对象
	private static Map<String, StaticSoldierTech> SOLDIER3_STORE;// 弓兵科技编号-->对象
	private static Map<String, StaticSoldierTech> SOLDIER4_STORE;// 骑兵科技编号-->对象
	private static Map<String, StaticSoldierTech> SOLDIER5_STORE;// 车兵科技编号-->对象
	private final static String SEPARATER = "_";
	public final static String TYPE1 = "ts0001";//刀兵
	public final static String TYPE2 = "ts0007";//枪兵
	public final static String TYPE3 = "ts0019";//弓兵
	public final static String TYPE4 = "ts0013";//骑兵
	public final static String TYPE5 = "ts0025";//车兵
	public static final int STATUS_LOCK = 0;//科技未开启状态
	public static final int STATUS_UNLOCK = 1;//科技开启未学习状态
	public static final int STATUS_STUDIED = 2;//科技开启已学习状态
	public static final int STATUS_MAX = 3;//科技开启已学习到最高级状态

	private SoldierTechCache(CacheMapper cacheMapper) {
		STORE = new LinkedHashMap<String, StaticSoldierTech>();
		STORE_1 = new StaticSoldierTech[5][];//全部一级科技
		STORE_1[0] = new StaticSoldierTech[6];
		STORE_1[1] = new StaticSoldierTech[6];
		STORE_1[2] = new StaticSoldierTech[6];
		STORE_1[3] = new StaticSoldierTech[6];
		STORE_1[4] = new StaticSoldierTech[6];
		int i1=1,i2=1,i3=1,i4=1,i5=1;//全部一级科技索引
		SOLDIER_TYPE_STORE = new HashMap<String, Map<Integer,StaticSoldierTech>>();
		SOLDIER1_STORE = new LinkedHashMap<String, StaticSoldierTech>();// 刀兵科技编号-->对象
		SOLDIER2_STORE = new LinkedHashMap<String, StaticSoldierTech>();// 枪兵科技编号-->对象
		SOLDIER3_STORE = new LinkedHashMap<String, StaticSoldierTech>();// 弓兵科技编号-->对象
		SOLDIER4_STORE = new LinkedHashMap<String, StaticSoldierTech>();// 骑兵科技编号-->对象
		SOLDIER5_STORE = new LinkedHashMap<String, StaticSoldierTech>();// 车兵科技编号-->对象
		List<StaticSoldierTech> list = cacheMapper.getStaticSoldierTech();
		String[] techNoArray;
		Map<Integer,StaticSoldierTech> typeMap;
		for (StaticSoldierTech e : list){
			STORE.put(e.getTechNo(), e);
			techNoArray = e.getTechNo().split(SEPARATER);
			if(TYPE1.equals(techNoArray[0])||
				TYPE2.equals(techNoArray[0])||
				TYPE3.equals(techNoArray[0])||
				TYPE4.equals(techNoArray[0])||
				TYPE5.equals(techNoArray[0])){
				typeMap = SOLDIER_TYPE_STORE.get(techNoArray[0]);
				if(typeMap == null){
					typeMap = new HashMap<Integer, StaticSoldierTech>();
					SOLDIER_TYPE_STORE.put(techNoArray[0], typeMap);
				}
				typeMap.put(Integer.parseInt(techNoArray[1]), e);
			}else if(e.getSoldierType() == 1){
				SOLDIER1_STORE.put(e.getTechNo(), e);
				if(e.getTechLevel() == 1){
					STORE_1[0][i1++] = e;
				}
			}else if(e.getSoldierType() == 2){
				SOLDIER2_STORE.put(e.getTechNo(), e);
				if(e.getTechLevel() == 1){
					STORE_1[1][i2++] = e;
				}
			}else if(e.getSoldierType() == 3){
				SOLDIER3_STORE.put(e.getTechNo(), e);
				if(e.getTechLevel() == 1){
					STORE_1[2][i3++] = e;
				}
			}else if(e.getSoldierType() == 4){
				SOLDIER4_STORE.put(e.getTechNo(), e);
				if(e.getTechLevel() == 1){
					STORE_1[3][i4++] = e;
				}
			}else if(e.getSoldierType() == 5){
				SOLDIER5_STORE.put(e.getTechNo(), e);
				if(e.getTechLevel() == 1){
					STORE_1[4][i5++] = e;
				}
			}
		}
		STORE_1[0][0] = SOLDIER_TYPE_STORE.get(TYPE1).get(1);
		STORE_1[1][0] = SOLDIER_TYPE_STORE.get(TYPE2).get(1);
		STORE_1[2][0] = SOLDIER_TYPE_STORE.get(TYPE3).get(1);
		STORE_1[3][0] = SOLDIER_TYPE_STORE.get(TYPE4).get(1);
		STORE_1[4][0] = SOLDIER_TYPE_STORE.get(TYPE5).get(1);
		logger.info("[done]");
	}
	
	/**
	 * 根据玩家兵种科技获取5个兵种
	 * @return
	 */
	public static List<Map<String,Object>> getUserSoldiers(List<String> userSoldierTech){
		List<Map<String,Object>> result = new ArrayList<Map<String,Object>>();
		result.add(getUserStaticSoldier(userSoldierTech, TYPE1));
		result.add(getUserStaticSoldier(userSoldierTech, TYPE2));
		result.add(getUserStaticSoldier(userSoldierTech, TYPE3));
		result.add(getUserStaticSoldier(userSoldierTech, TYPE4));
		result.add(getUserStaticSoldier(userSoldierTech, TYPE5));
		return result;
	}
	/**
	 * 根据玩家兵种科技获取5个兵种基础信息（兵种科技类型名称和等级）
	 * @return
	 */
	public static List<Integer> getBaseUserSoldiers(List<String> userSoldierTech){
		List<Integer> mapList = new ArrayList<Integer>();
		int soldier1,soldier2,soldier3,soldier4,soldier5 ;
		soldier1 = soldier2 = soldier3 = soldier4 = soldier5 = 0;
		for(String s : userSoldierTech){
			String[] array = s.split(SEPARATER);
			if(array[0].equals(TYPE1)){
				soldier1 = Integer.parseInt(array[1]);
			}else if(array[0].equals(TYPE2)){
				soldier2 = Integer.parseInt(array[1]);
			}else if(array[0].equals(TYPE3)){
				soldier3 = Integer.parseInt(array[1]);
			}else if(array[0].equals(TYPE4)){
				soldier4 = Integer.parseInt(array[1]);
			}else if(array[0].equals(TYPE5)){
				soldier5 = Integer.parseInt(array[1]);
			}
		}
		mapList.add(soldier1);
		mapList.add(soldier2);
		mapList.add(soldier3);
		mapList.add(soldier4);
		mapList.add(soldier5);
		return mapList;
	}
	/**
	 * 获取用户兵种专精
	 * @param userSoldierTech
	 * @param prefix
	 * @return
	 */
	private final static Map<String,Object> getUserStaticSoldier(List<String> userSoldierTech,String type){
		Map<Integer, StaticSoldierTech> map;
		StaticSoldierTech tech;
		StaticSoldier soldier = null;//兵种专精
		Map<String,Object> soldierMap = null;
		for(String s : userSoldierTech){
			String[] array = s.split(SEPARATER);
			if(array[0].equals(type)){
				map = SOLDIER_TYPE_STORE.get(type);
				if(map == null){
					logger.error("未知的科技");
					continue;
				}
				tech = map.get(Integer.parseInt(array[1]));
				if(tech == null){
					logger.error("未知的科技");
					continue;
				}
				soldier = SoldierCache.getSoldierByNo(tech.getSoldierNo());
				soldierMap = getTechAttr(soldier);
				soldierMap.put("canRecruit", true);
				break;
			}
		}
		if(soldier == null){
			soldier = SoldierCache.getSoldierByNo(SOLDIER_TYPE_STORE.get(type).get(1).getSoldierNo());
			soldierMap = getTechAttr(soldier);
			soldierMap.put("canRecruit", false);
		}
		SoldierTechSum sum = getSoldierTechSum(userSoldierTech,type);
		if(sum != null){
			soldierMap.putAll(sum.toMap());
		}
		return soldierMap;
	}
	
	/**
	 * 转换兵营界面需要的专精属性
	 * @param soldier
	 * @return
	 */
	private static Map<String,Object> getTechAttr(StaticSoldier soldier){
		Map<String,Object> soldierMap = new LinkedHashMap<String,Object>();
		soldierMap.put("soldierNo", soldier.getSoldierNo());
		soldierMap.put("soldierName", soldier.getSoldierName());
		soldierMap.put("soldierLevel", soldier.getSoldierLevel());
		soldierMap.put("imageName", soldier.getImageName());
		soldierMap.put("soldierDescription", soldier.getSoldierDescription());
		soldierMap.put("soldierHp", soldier.getSoldierHp());
		soldierMap.put("soldierAttack", soldier.getSoldierAttack());
		soldierMap.put("soldierHit", soldier.getSoldierHit());
		soldierMap.put("soldierCritical", soldier.getSoldierCritical());
		soldierMap.put("soldierDodge", soldier.getSoldierDodge());
		soldierMap.put("soldierDefence", soldier.getSoldierDefence());
		soldierMap.put("mobility", soldier.getMobility());
		soldierMap.put("minRange", soldier.getMinRange());
		soldierMap.put("maxRange", soldier.getMaxRange());
		soldierMap.put("needMoney", soldier.getNeedMoney());
		soldierMap.put("needFood", soldier.getNeedFood());
		soldierMap.put("needIronore", soldier.getNeedIronore());
		return soldierMap;
	}
	
	/**
	 * 根据科技编号获取兵种专精
	 * @param techNo
	 * @return
	 */
	public static StaticSoldierTech getSoldierTypeTech(String techNo){
		String[] techNoArray = techNo.split(SEPARATER);
		if( TYPE1.equals(techNoArray[0])|| //根据编号过滤兵种专精
			TYPE2.equals(techNoArray[0])||
			TYPE3.equals(techNoArray[0])||
			TYPE4.equals(techNoArray[0])||
			TYPE5.equals(techNoArray[0])){
			Map<Integer, StaticSoldierTech> temp = SOLDIER_TYPE_STORE.get(techNoArray[0]);
			if(temp != null){
				return temp.get(Integer.parseInt(techNoArray[1]));
			}
		}
		return null;
	}
	
	/**
	 * 获取兵种科技附加的属性之和
	 * @param techNos
	 * @param type
	 * @return
	 */
	public static SoldierTechSum getSoldierTechSum(List<String> techNos,String type){
		StaticSoldierTech tech = null;
		int addHealth = 0; // 研究此科技后增加的对应兵种生命值
		int addAtk = 0; // 研究此科技后增加的对应兵种攻击力
		int addDef = 0; // 研究此科技后增加的对应兵种防御力
		int addHit = 0;// 研究此科技后增加的对应兵种命中率
		int addDodge = 0; // 研究此科技后增加的对应兵种躲闪率
		int addCrt = 0; // 研究此科技后增加的对应兵种暴击率
		List<String> addSkills = null; // 研究此科技后获得兵种技能
		for(String s:techNos){
			if(TYPE1.equals(type)){
				tech = SOLDIER1_STORE.get(s);
			}else if(TYPE2.equals(type)){
				tech = SOLDIER2_STORE.get(s);
			}else if(TYPE3.equals(type)){
				tech = SOLDIER3_STORE.get(s);
			}else if(TYPE4.equals(type)){
				tech = SOLDIER4_STORE.get(s);
			}else if(TYPE5.equals(type)){
				tech = SOLDIER5_STORE.get(s);
			}
			if(tech != null){
				addHealth += tech.getAddHealth();
				addAtk += tech.getAddAtk();
				addDef += tech.getAddDef();
				addHit += tech.getAddHit();
				addDodge += tech.getAddDodge();
				addCrt += tech.getAddCrt();
				if(tech.getAddSkill() != null){
					if(addSkills == null){
						addSkills = new ArrayList<String>();
					}
					addSkills.add(tech.getAddSkill());
				}
			}
		}
		//空则返回
		if(tech == null){
			return null;
		}
		//非空处理
		String skills = null;
		if(addSkills!=null){
			skills = addSkills.toString();
			skills = skills.substring(1,skills.length());
		}
		SoldierTechSum sum = new SoldierTechSum(addHealth, addAtk, addDef, addHit, addDodge, addCrt, skills);
		return sum;
	}
	
	/**
	 * 获取用户所有科技
	 */
	public static List<List<Map<String,Object>>> getAllUserTech(List<String> techNos, double effect){
		List<List<Map<String,Object>>> techs = new LinkedList<List<Map<String,Object>>>();
		techs.add(getTechListView(STORE_1[0], SOLDIER1_STORE, techNos,TYPE1, effect));
		techs.add(getTechListView(STORE_1[1], SOLDIER2_STORE, techNos,TYPE2, effect));
		techs.add(getTechListView(STORE_1[2], SOLDIER3_STORE, techNos,TYPE3, effect));
		techs.add(getTechListView(STORE_1[3], SOLDIER4_STORE, techNos,TYPE4, effect));
		techs.add(getTechListView(STORE_1[4], SOLDIER5_STORE, techNos,TYPE5, effect));
		return techs;
	}
	
	public static List<Map<String,Object>> getUserTechByType(String techNo,List<String> techNos, double effect){
		String[] techNoArray = techNo.split(SEPARATER);
		String type = techNoArray[0];
		if(TYPE1.equals(type)){
			return getTechListView(STORE_1[0], SOLDIER1_STORE, techNos,type, effect);
		}else if(TYPE2.equals(type)){
			return getTechListView(STORE_1[1], SOLDIER2_STORE, techNos,type, effect);
		}else if(TYPE3.equals(type)){
			return getTechListView(STORE_1[2], SOLDIER3_STORE, techNos,type, effect);
		}else if(TYPE4.equals(type)){
			return getTechListView(STORE_1[3], SOLDIER4_STORE, techNos,type, effect);
		}else if(TYPE5.equals(type)){
			return getTechListView(STORE_1[4], SOLDIER5_STORE, techNos,type, effect);
		}else{
			List<Map<String,Object>> result = new LinkedList<Map<String,Object>>();
			result.add(getTechView(techNo, techNos, effect));
			return result;
		}
	}
	
	private static List<Map<String,Object>> getTechListView(StaticSoldierTech[] lvl1,Map<String, StaticSoldierTech> soldierStore,List<String> techNos,String type, double effect){
		List<Map<String,Object>> result = new LinkedList<Map<String,Object>>();
		StaticSoldierTech temp = null;
		int status;
		StaticSoldierTech next = null;
		int status_1 = STATUS_UNLOCK;//专精状态
		//专精
		for(String s : techNos){
			String[] techNoArray = s.split(SEPARATER);
			if(type.equals(techNoArray[0])){
				Map<Integer, StaticSoldierTech> m = SOLDIER_TYPE_STORE.get(techNoArray[0]);
				if(m != null){
					temp = m.get(Integer.parseInt(techNoArray[1]));
					next = m.get(Integer.parseInt(techNoArray[1])+1);
				}
			}
		}
		if(temp == null){
			temp = lvl1[0];
		}else{
			if(temp.getTechLevel() == Const.MAX_TECH_LEVEL){
				status_1 = STATUS_MAX;
			}else{
				status_1 = STATUS_STUDIED;
			}
		}
		result.add(getTechView(temp,status_1,next,effect));
		//除专精外的兵种科技
		for(int i=1;i<lvl1.length;i++){
			temp = null;
			status = STATUS_UNLOCK;
			next = null;
			for(String s : techNos){
				String[] a = s.split("_");
				if(lvl1[i].getTechNo().split("_")[0].equals(a[0])){
					temp = soldierStore.get(s);
					next = soldierStore.get(a[0]+"_"+(Integer.valueOf(a[1])+1));
					if(temp.getTechLevel() == Const.MAX_TECH_LEVEL){//暂时开放到12级，则判断为升至顶级
						status = STATUS_MAX;
					}else{
						status = STATUS_STUDIED;
					}
					break;
				}
			}
			if(status_1 == STATUS_UNLOCK){
				status = STATUS_LOCK;
			}
			if(temp == null){
				temp = lvl1[i];
			}
			result.add(getTechView(temp,status,next,effect));
		}
		return result;
	}
	
	private static Map<String,Object> getTechView(StaticSoldierTech soldierTech,int status,StaticSoldierTech next, double effect){
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("techNo", soldierTech.getTechNo());
		map.put("techName", soldierTech.getTechName());
		map.put("status", status); 
		map.put("techIcon", soldierTech.getTechIcon()); 
		if(status ==STATUS_LOCK){
			map.put("message", "未开启");
		}else if(status == STATUS_STUDIED){
			map.put("techLevel", soldierTech.getTechLevel());
			map.put("description", soldierTech.getDescription());
			map.put("nextDesc", next.getDescription());
			map.put("needTime", next == null?soldierTech.getNeedTime()*(1-effect):next.getNeedTime()*(1-effect));
		}else if(status ==STATUS_UNLOCK){
			map.put("techLevel", 0);
			map.put("description", "未学习");
			map.put("nextDesc", soldierTech.getDescription());
			map.put("needTime", soldierTech.getNeedTime()*(1-effect));
		}else if(status == STATUS_MAX){
			map.put("techLevel", soldierTech.getTechLevel());
			map.put("description", soldierTech.getDescription());
			map.put("message", "该科技已达到最高等级");
		}
		return map;
	}
	
	/**
	 * 根据编号获取科技
	 * @param techNo
	 * @return
	 */
	public static StaticSoldierTech getTech(String techNo){
		return STORE.get(techNo);
	}
	
	public static Map<String,Object> getTechView(String techNo,List<String> techNos, double effect) {
		int status = STATUS_LOCK;
		String[] array = techNo.split("_");
		StaticSoldierTech soldierTech = getTech(techNo);
		StaticSoldierTech next = null;
		if(techNos.contains(techNo)){
			String nextNo = array[0]+"_"+(Integer.valueOf(array[1])+1);
			next = getTech(nextNo);
			if(next == null){
				status = STATUS_MAX;
			}else{
				status = STATUS_STUDIED;
			}
		}else{
			if(soldierTech.getPreTech() == null){
				status = STATUS_UNLOCK;
			}else{
				String[] prearray = soldierTech.getPreTech().split("_");
				for(String s: techNos){
					String[] array1 = s.split("_");
					if(array1[0].equals(prearray[0])&&Integer.valueOf(array1[1]).intValue()>=Integer.valueOf(prearray[1]).intValue()){
						status = STATUS_UNLOCK;
						break;
					}else{
						status = STATUS_LOCK;
					}
				}
			}
		}
		return getTechView(soldierTech, status, next, effect);
	}
	
	/**
	 * 某一兵种科技效果总和
	 * @author xuzhongxing
	 *
	 */
	public static class SoldierTechSum {

		private int addHealth; // 研究此科技后增加的对应兵种生命值
		private int addAtk; // 研究此科技后增加的对应兵种攻击力
		private int addHit;// 研究此科技后增加的对应兵种命中率
		private int addCrt; // 研究此科技后增加的对应兵种暴击率
		private int addDodge; // 研究此科技后增加的对应兵种躲闪率
		private int addDef; // 研究此科技后增加的对应兵种防御力
		private String addSkills; // 研究此科技后获得兵种技能

		public SoldierTechSum(int addHealth, int addAtk, int addDef,
				int addHit, int addDodge, int addCrt, String addSkills) {
			super();
			this.addHealth = addHealth;
			this.addAtk = addAtk;
			this.addDef = addDef;
			this.addHit = addHit;
			this.addDodge = addDodge;
			this.addCrt = addCrt;
			this.addSkills = addSkills;
		}
		
		/**
		 * 
		 * @return
		 */
		public Map<String,Object> toMap(){
			Map<String,Object> m = new LinkedHashMap<String,Object>();
			m.put("addHealth", addHealth);
			m.put("addAtk", addAtk);
			m.put("addHit", addHit);
			m.put("addCrt", addCrt);
			m.put("addDodge", addDodge);
			m.put("addDef", addDef);
			return m;
		}
		
		public int getAddHealth() {
			return addHealth;
		}

		public int getAddAtk() {
			return addAtk;
		}

		public int getAddDef() {
			return addDef;
		}

		public int getAddHit() {
			return addHit;
		}

		public int getAddDodge() {
			return addDodge;
		}

		public int getAddCrt() {
			return addCrt;
		}

		public void setAddHealth(int addHealth) {
			this.addHealth = addHealth;
		}

		public void setAddAtk(int addAtk) {
			this.addAtk = addAtk;
		}

		public void setAddDef(int addDef) {
			this.addDef = addDef;
		}

		public void setAddHit(int addHit) {
			this.addHit = addHit;
		}

		public void setAddDodge(int addDodge) {
			this.addDodge = addDodge;
		}

		public void setAddCrt(int addCrt) {
			this.addCrt = addCrt;
		}

		public String getAddSkills() {
			return addSkills;
		}

		public void setAddSkills(String addSkills) {
			this.addSkills = addSkills;
		}
		
	}

}
