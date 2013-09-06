package com.crystalcg.gamedev.util.cache;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.hero.domain.Hero;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.domain.StaticTavern;
import com.crystalcg.gamedev.util.cache.domain.StaticTavernHeroAttr;

/**
 * 酒馆刷新规则
 * 
 * @author xuzhongxing
 * 
 */
public class TavernCache {

	private static Logger logger = LoggerFactory.getLogger(TavernCache.class);
	private static Map<Integer, StaticTavern> TAVERN_STORE;// 酒馆等级->武将刷新概率
	private static Map<Integer, StaticTavernHeroAttr> HERO_ATTR_STORE;// 武将品级->属性范围
	private static String[] FAMILY_NAME;
	private static String[] MALE_FIRST_NAME;
	private static String[] FEMALE_FIRST_NAME;
	private static String[] MALE_ICON;
	private static String[] FEMALE_ICON;
	private static String[] MALE_ACTION;
	private static String[] FEMALE_ACTION;

	private TavernCache(CacheMapper cacheMapper) {
		// 酒馆
		List<StaticTavern> tavernList = cacheMapper.getStaticTavern();
		TAVERN_STORE = new HashMap<Integer, StaticTavern>();
		for (StaticTavern e : tavernList) {
			if(TAVERN_STORE.containsKey(e.getLevel())){
				logger.error("duplicate key");
			}
			TAVERN_STORE.put(e.getLevel(), e);
		}
		// 武将属性
		List<StaticTavernHeroAttr> heroAttrList = cacheMapper.getStaticTavernHeroAttr();
		HERO_ATTR_STORE = new HashMap<Integer, StaticTavernHeroAttr>();
		for (StaticTavernHeroAttr e : heroAttrList) {
			if(HERO_ATTR_STORE.containsKey(e.getQuality())){
				logger.error("duplicate key");
			}
			HERO_ATTR_STORE.put(e.getQuality(), e);
		}
		// 武将名、图片
		loadHeroResource();
		logger.info("[done]");
	}

	/**
	 * 加载武将名、图片等
	 */
	private void loadHeroResource() {
		File propRoot = new File(Const.class.getResource("/").getFile(),
				"conf/heroName.properties");
		Properties prop = new Properties();
		try {
			prop.load(new FileInputStream(propRoot));
		} catch (FileNotFoundException e) {
			logger.error("无法找到配置文件");
		} catch (IOException e) {
			logger.error("读取文件失败");
		}
		FAMILY_NAME = prop.getProperty("familyName").split(",");
		MALE_FIRST_NAME = prop.getProperty("firstNameForMale").split(",");
		FEMALE_FIRST_NAME = prop.getProperty("firstNameForFemale").split(",");
		MALE_ICON = prop.getProperty("heroIconForMale").split(",");
		FEMALE_ICON = prop.getProperty("heroIconForFemale").split(",");
		MALE_ACTION = prop.getProperty("heroActionForMale").split(",");
		FEMALE_ACTION = prop.getProperty("heroActionForFemale").split(",");
	}

	/**
	 * 获取6个武将
	 * 
	 * @param level
	 * @return
	 */
	public static List<Hero> getHero(int level) {
		List<Hero> list = new ArrayList<Hero>();
		Hero temp;
		for (int i = 0; i < Const.HERO_REFRESH_COUNTS; i++) {
			temp = createHeroByTavernLevel(level);
			temp.setId(getId(i));
			list.add(temp);
		}
		return list;
	}

	/**
	 * 根据酒馆等级创建武将
	 * 
	 * @param level
	 * @return
	 */
	private static Hero createHeroByTavernLevel(int level) {
		Hero hero = new Hero();
		Random rand = new Random();
		// 根据酒馆等级获取武将随机品质
		setHeroQuality(hero, level, rand);
		setHeroAttr(hero, rand);
		setHeroAttr1(hero, rand);
		// 设置招募所需铜币
		setHeroMoney(hero);
		return hero;
	}

	/**
	 * 设置武将品质
	 * 
	 * @param hero
	 * @param level 酒馆等级
	 * @param rand
	 */
	private static void setHeroQuality(Hero hero, int level, Random rand) {
		// 酒馆等级决定各种品质武将的刷新概率
		StaticTavern st = TAVERN_STORE.get(level);
		int sum;
		int rate = rand.nextInt(Const.BASE_HERO_RATE);
		if (rate < (sum = st.getWhiteHeroRate())) {
			hero.setQuality(Const.WHITE_QUALITY);
		} else if (rate < (sum += st.getGreenHeroRate())) {
			hero.setQuality(Const.GREEN_QUALITY);
		} else if (rate < (sum += st.getBlueHeroRate())) {
			hero.setQuality(Const.BLUE_QUALITY);
		} else if (rate < (sum += st.getPurpleHeroRate())) {
			hero.setQuality(Const.PURPLE_QUALITY);
		} else if (rate < (sum += st.getOrangeHeroRate())) {
			hero.setQuality(Const.ORANGE_QUALITY);
		} else if (rate < (sum += st.getRedHeroRate())) {
			hero.setQuality(Const.RED_QUALITY);
		}
	}

	/**
	 * 根据品级设置武将属性
	 * 
	 * @param hero
	 * @param rand
	 */
	private static void setHeroAttr(Hero hero, Random rand) {
		int base = 1000;
		StaticTavernHeroAttr ha = HERO_ATTR_STORE.get(hero.getQuality());
		hero.setRealGift(ha.getMinGift()+rand.nextDouble()*(ha.getMaxGift() - ha.getMinGift()));
		double attr = ha.getMinAttr()+rand.nextInt(ha.getMaxAttr() - ha.getMinAttr());//武将总属性值
		int[] rate = {ha.getMinRate(),ha.getMinRate(),ha.getMinRate(),ha.getMinRate()};//武将4属性概率
		int remined = base - rate[0] - rate[1] - rate[2] - rate[3];//剩余可分配属性
		int limit = ha.getMaxRate() - ha.getMinRate();//可分配属性最大限制
		int range = remined<limit?remined:limit;//随机范围
		int temp = rand.nextInt(range);//随机结果1
		rate[0]+=temp;
		remined -= temp;//剩余值减少
		range = remined<limit?remined:limit;
		temp = rand.nextInt(remined<limit?remined:limit);//随机结果2
		rate[1]+=temp;
		remined -= temp;
		range = remined<limit?remined:limit;
		temp = rand.nextInt(remined<limit?remined:limit);//随机结果3
		rate[2]+=temp;
		remined -= temp;//剩余值，最后一次不需要随机
		rate[3]+=remined;
		int [] array = unsortArray(rate);
		hero.setForce((int)(attr*array[0]/base+.5));
		hero.setStrategy((int)(attr*array[1]/base+.5));
		hero.setPhysique((int)(attr*array[2]/base+.5));
		hero.setAgility((int)(attr*array[3]/base+.5));
	}
	
	private static int[] unsortArray(int[] array){
		Random rand = new Random();
		List<Integer> indexList = new LinkedList<Integer>();
		for(int i=0;i<array.length;i++){
			indexList.add(i);
		}
		int[] copyArray = new int[array.length];
		for(int i=0;i<array.length;i++){
			int indexListIndex = rand.nextInt(indexList.size());
			int randIndex = indexList.get(indexListIndex);
			indexList.remove(indexListIndex);
			copyArray[i] = array[randIndex];
		}
		return copyArray;
	}

	/**
	 * 设置武将职业、性别、名、图片等属性
	 */
	private static void setHeroAttr1(Hero hero, Random rand) {
		int gender = rand.nextInt(2);
		int heroType = rand.nextInt(3)+1;
		String familyNameStr = FAMILY_NAME[rand.nextInt(FAMILY_NAME.length)];
		String icon;
		String smallIconPrefix = "X_";// 小图标前缀
		if (gender == Const.SEX_MAIE) {// 男
			hero.setHeroName(familyNameStr
					+ MALE_FIRST_NAME[rand.nextInt(MALE_FIRST_NAME.length)]);
			icon = MALE_ICON[rand.nextInt(MALE_ICON.length)];
			hero.setHeroAction(MALE_ACTION[rand.nextInt(MALE_ACTION.length)]);
		} else {// 女
			hero.setHeroName(familyNameStr
					+ FEMALE_FIRST_NAME[rand.nextInt(FEMALE_FIRST_NAME.length)]);
			icon = FEMALE_ICON[rand.nextInt(FEMALE_ICON.length)];
			hero.setHeroAction(FEMALE_ACTION[rand.nextInt(FEMALE_ACTION.length)]);
		}
		hero.setGender(gender);
		hero.setHeroType(heroType);
		hero.setHeroIcon(icon);
		hero.setSmallHeroIcon(smallIconPrefix + icon);

	}

	private static void setHeroMoney(Hero hero) {
		int money = (int) ((hero.getForce() + hero.getStrategy()
				+ hero.getAgility() + hero.getPhysique()) * Const.HERO_NEED_MONEY_FACTOR);
		hero.setNeedMoney(money);
	}

	private static int getId(int id) {
		long l = System.currentTimeMillis();
		StringBuilder sb = new StringBuilder();
		sb.append(l);
		sb.append(id);
		String str = sb.substring(5);
		return Integer.parseInt(str);
	}

	/**
	 * 刷新名将
	 * @param level
	 * @param baseRate
	 * @return
	 */
	@SuppressWarnings("unused")
	private Hero createBetterHero(int level, int baseRate) {
		throw new RuntimeException("该接口未开放");
		// return null;
	}
	
	public static void main(String[] args){
		for(int i=0;i<100;i++){
			System.out.println("---");
			TavernCache.setHeroAttr(new Hero(), new Random());
		}
	}

}
