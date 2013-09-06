package com.crystalcg.gamedev.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.cache.domain.StaticSpeedItem;

/**
 * 常量信息
 * @author xuzhongxing
 *
 */
public class Const {
	
	private static Logger logger = LoggerFactory.getLogger(Const.class);
	
	/***************************科技相关******************/
	public static final int MAX_TECH_LEVEL = 12;
	/////////////////游戏流通货币/////////////////
	/**点卷(绑定)*****/
	public static final int MONEY_BGOLD  = 1;
	/***金锭****/
	public static final int MONEY_GOLD  = 2;
	///////性别//////////////////////////////////////////////////
	/**男*****/
	public static final int SEX_MAIE  = 1;
	/**女*****/
	public static final int SEX_FEMALE  = 0;
	////////////////////////////////////////////////////////////
	/////                    主城建筑                                              /////
	////////////////////////////////////////////////////////////
	public static final String OFFICAIL_BUILDING_NO = "c0001_1";//一级太尉府编号
	public static final String WALL_BUILDING_NO = "c0012_1";//一级城墙编号
	
	public static final String CELLAR_BUILDING_NO_PREFIX = "c0011";//地窖编号前缀
	public static final String TAVERN_BUILDIG_NO_PREFIX = "c0015";//酒馆编号前缀
	public static final String WALL_BUILDING_NO_PREFIX = "c0012";//城墙编号前缀
	public static final String CENTRESTAGE_BUILDING_NO_PREFIX= "c0016";//聚贤阁编号前缀
	public static final String TREASURY_BUILDIG_NO_PREFIX = "c0018";//国库编号前缀
	public static final String MARKET_BUILDING_NO_PREFIX = "c0004";//集市编号前缀
	public static final String HOSPITAL_BUILDING_NO_PREFIX = "c0019";//太医署编号前缀
	public static final String COLLEGE_BUILDING_NO_PREFIX = "c0009";//科教馆编号前缀
	/*** 主城状态:正常*/
	public static final int MAIN_CITY_NORMAL = 0;
	/*** 主城状态:被围攻*/
	public static final int MAIN_CITY_ATTACKED = 1;
	/*** 主城状态:流亡*/
	public static final int MAIN_CITY_EXILE = 2;
	/*** 主城状态:免战*/
	public static final int MAIN_CITY_FREEWAR = 3;
	
	public static final String  PROCESS_BUILDING_NO_PREFIX ="c0010";//加工坊前缀
	/**练兵场编号前缀*/
	public static final String ENEMY_BUILDING_NO_PREFIX = "c0014";
	public static final int OFFICIAL_INDEX = 27;//太尉府索引
	public static final int WALL_INDEX = 1;//城墙索引
	public static final int BUILD_NUM = 3;//建筑队列基础容量
	
	public static final int PACKGE_CAPACITY  = 40;//背包初始容量
	
	public static final int CELLAR_LAST_TIME  = 2;//地窖最长保护时间（小时）
	
	public static final int POPULAR_SUPPORT_LIMIT = 100;//民心上限
	
	public static final int AFFAIR_TIME_LIMIT = 24;//内政策略时间上限
	
	public static final int MAX_BUILDING_LEVEL = 23;//建筑目前最高级别
	
	public static final int MAX_MAIN_CITY_LEVEL = 11;//主城目前最高级别
	
	public static final int HERO_TYPE_IMMORTAL = 1;//仙师
	
	public static final int HERO_TYPE_TIANCE = 2;//天策
	
	public static final int HREO_TYPE_BAIYU = 3;//白羽
	
	///////////////////////////酒馆//////////////////////////////////
	public static final int HERO_NEED_MONEY_FACTOR = 1000;//招募武将需要的铜币基数
	public static final int HERO_REFRESH_COUNTS = 6;//酒馆刷新武将个数
	public static final String TAVERN_FLAG = "_tavern";//酒馆job标志
	public static final int BASE_HERO_RATE = 1000000;//酒馆刷新武将概率的除数
	public static final int BASE_TAVERN_TIME = 6*3600;//酒馆刷新武将的基础时间(秒)
	public static final int MIN_TAVERN_TIME = 10;//酒馆刷新武将的最短时间(秒)
	
	//////////////////////////武将////////////////////////////////
	public static final int WHITE_QUALITY = 1;//白色武将
	public static final int GREEN_QUALITY = 2;//绿色武将
	public static final int BLUE_QUALITY = 3;//蓝色武将
	public static final int PURPLE_QUALITY = 4;//紫色武将
	public static final int ORANGE_QUALITY = 5;//橙色武将
	public static final int RED_QUALITY = 6;//红色武将
	
	/***************************************道具常量*********************************************************/
	public final static String HERO_REFRESH_ITEM = "i8002";//刷新符
	public final static String HERO_APPOINT_ITEM = "i8004";//圣令，用于武将册封
	public final static int POSITION_BAG = 0;//位置在包裹
	public final static int POSITION_HERO = 1;//位置在武将
	public final static int POSITION_MAIL = 2;//位置在邮件
	/**头像更换道具**/
	public final static String PIC_CHANGE = "i8004";
	
	/**更换国家所需道具**/
	public final static String COUNTRY_CHANGE = "i8004";
	
	/**更换城市（本国）所需道具**/
	public final static String CITY_CHANGE = "i8004";
	/**更换城市（本国）所需高级道具**/
	public final static String CITYHIGHT_CHANGE = "i8004";
	//////////////////////加速道具/////////////////////////////////////////
	/**疾速军(效果最好)***/
	public final static String SPEND_UP_MARCH_MAX = "i6005_3";
	/**疾驰军(效果中等)***/
	public final static String SPEND_UP_MARCH_MID = "i6005_2";
	/**疾行军(效果最小)***/
	public final static String SPEND_UP_MARCH_MIN = "i6005_1";
	
	/**兵研宗师(效果最好)***/
	public final static String SPEND_UP_TRAIN_MAX = "i6004_3";
	/**兵研大师(效果中等)***/
	public final static String SPEND_UP_TRAIN_MID = "i6004_2";
	/**兵研学徒(效果最小)***/
	public final static String SPEND_UP_TRAIN_MIN = "i6004_1";
	
	/**神工卷轴(效果最好)***/
	public final static String SPEND_UP_LEVEL1 = "i6003_4";
	/**精工卷轴(效果中等)***/
	public final static String SPEND_UP_LEVEL2 = "i6003_3";
	/**优工卷轴(效果中等)***/
	public final static String SPEND_UP_LEVEL3 = "i6003_2";
	/**普工卷轴(效果最小)***/
	public final static String SPEND_UP_LEVEL4 = "i6003_1";
	/**
	 * 增加民心道具
	 */
	public final static String SPEND_UP_POPUSUP_MIN = "i6004_1";
	public final static String SPEND_UP_POPUSUP_MID = "i6004_1";
	public final static String SPEND_UP_POPUSUP_MAX = "i6004_1";
	/**
	 * 增加人口
	 */
	public final static String SPEND_UP_PEOPLE_MIN = "i6004_1";
	public final static String SPEND_UP_PEOPLE_MID = "i6004_2";
	public final static String SPEND_UP_PEOPLE_MAX = "i6004_3";
	/**
	 * 侦查消耗道具
	 */
	public final static String BATTLE_DETECT = "i8009";
	
	/**
	 * 消费类型-加速道具集合
	 * 加速符(消费道具)集合-：道具编号-加速符对象
	 */
	public static final Map<Integer,Map<String,StaticSpeedItem>> SPENDITEMMAP = new HashMap<Integer,Map<String,StaticSpeedItem>>();
	
	/*****行军加速符类型（消费类型1）***/
	public final static int SPEND_FUNCTION_MARCH = 1;
	/*****练兵加速符类型（消费类型2）***/
	public final static int SPEND_FUNCTION_TRAIN = 2;
	/*****建筑,科技,城防加速符类型(统称城市)（消费类型3）***/
	public final static int SPEND_FUNCTION_CITY = 3;
	/*****增加民心（消费类型3）***/
	public final static int SPEND_FUNCTION_POPUSUP = 4;
	/*****增加人口（消费类型3）***/
	public final static int SPEND_FUNCTION_PEOPLE = 5;
	
	
	public final static int ITEM_AMOUNT_DEFAULT = 1;//添加道具默认数量
	
	/////////加工坊/////////////
	public static final int REDUCE_LEVEL = 1;//失败掉强化等级
	public static final int MAX_LEVEL=15;//最高强化等级15
	public static final int MATERIAL_TYPE_STONE=3;//材料类别，宝石
	public static final int MATERIAL_TYPE_MATERIAL_FOR_PRODUCE = 1;//材料子类别打造材料
	
	////////宝石合成//////
	public static final Map<Integer,Double> GEMSTONE_COMPOUND_RATE_MAP = new HashMap<Integer,Double>();//宝石合成成功率，key为合成基数
	
	public static final int ALL_TYPE=0;//所有类型时是0
	public static final int TYPE_EQUIPMENT = 1;//装备
	public static final int TYPE_ITEM = 2;//用品
	public static final int TYPE_MATERIAL = 3;//材料
	public static final int TYPE_QUESTS = 4;//任务
	public static final int SUBTYPE_BOOK_OF_SKILL=5;//技能书在用品中的子类别
	
	public static final int HOLE_INDEX_ONE = 1;//装备插孔索引
	public static final int HOLE_INDEX_TWO = 2;//装备插孔索引
	public static final int HOLE_INDEX_THREE = 3;//装备插孔索引
	
	public static final int SUBTYPE_STONE = 3;//材料子类别宝石
	public static final int SUBTYPE_WEAPON = 1;//武器装备子类别
	public static final int SUBTYPE_BODY = 2;//身体装备子类别
	
	public static final int ADD_SUCCESS_ITEM = 10130101;//增加成功率的道具ID
	public static final int ADD_SUCCESS_ITEM_VALUE = 10;//目前增加的成功率为10
	
	public static final boolean USE_CACHE = true;//是否使用缓存
	
	public static final int USE_EFFECT_TYPE_NOTHING=0;//道具没有效果
	public static final int USE_EFFECT_TYPE_GIFT_BOX=1;//礼包
	public static final int USE_EFFECT_TYPE_LAST_EFFECT=2;//2=持续性效果道具            
	public static final int USE_EFFECT_TYPE_USER_BUFF=3;//3=君主BUFF
	public static final int USE_EFFECT_TYPE_WOOD=4;// 4=木材 
	public static final int USE_EFFECT_TYPE_STONE=5;//5=石料 
	public static final int USE_EFFECT_TYPE_FOOD=6;//6=粮食
	public static final int USE_EFFECT_TYPE_IRONORE=7;//7=铁锭
	public static final int USE_EFFECT_TYPE_MONEY=8;//8=铜币
	public static final int USE_EFFECT_TYPE_PEOPLE=9;//9=人口
	public static final int USE_EFFECT_TYPE_MEDICINE=10;//10=膏药
	
	
	public static final int IS_BIND_STATE = 1;//绑定状态
	public static final int IS_NOT_BIND_STATE = 0;//不绑定状态
	public static final int BOTH_BIND_AND_NOT_BIND = 3;//忽略绑定状态
	public static final int CAN_DROP = 1;//物品可丢弃
	public static final int CAN_NOT_DROP = 0;//物品不可丢弃
	public static final int CAN_SELL = 1;//物品可出售
	public static final int CAN_NOT_SELL = 0;//物品不可出售
	public static final int CAN_STACK = 1;//物品不可出售
	public static final int CAN_USE = 1;//物品可使用
	public static final int CAN_NOT_USE = 0;//物品不可使用
	public static final int CAN_BATCH_USE = 1;//物品可使用
	public static final int CAN_NOT_BATCH_USE = 0;//物品不可使用
	
	public static final int EQUIPMENT_TYPE_WEAPON = 1;//武器类型
	
	public static final int EQUIPMENT_DEFAULT_AMOUNT = 1;//装备默认添加数量
	public static final List<Map<String, Object>> MATERIAL_LEVEL_LIST = new ArrayList<Map<String, Object>>();//材料等级表
	
	
	/********************************邮件相关****************************************/
	
//	public static final int MAIL_ADDRESSER_TYPE_SYSTEM = 0;//邮件发送人类型，系统发送
//	public static final int MAIL_ADDRESSER_TYPE_CHARACTER = 1;//邮件发送人类型，玩家发送
	public static final int MAIL_HAS_ATTACHMENT = 1;//邮件发送人类型，玩家发送
	public static final int MAIL_HAS_NOT_ATTACHMENT = 0;//邮件发送人类型，玩家发送
	public static final int MAIL_NOT_READ_STATUS = 0;//邮件状态，未读
	public static final int MAIL_READ_STATUS = 1;//邮件状态，已读
	public static final int MAIL_BOTH_STATUS = 2;//邮件发送人类型，玩家发送
	public static final int CHARACTER_SYSTEM_ID = -1;//系统角色Id
	public static final int CHARACTER_AUCTION_ID = -2;//拍卖行角色Id
	
	
	/*******************************拍卖行*********************************/
	
//	public static final int AUCTION_MAIL_ID = -2;//拍卖行id，作为为发件人用;
	public static final int AUCTION_MIN_BASE_PRICE = 10;//拍卖行最低底价
	public static final double THE_TAX_RATE = 0.9;//拍卖行税率，目前做10%的税收;
	public static final int PAGE_SIZE_BID = 9;
	public static final int PAGE_SIZE_AUCTION = 8;
	public static final int PAGE_SIZE_MYAUCTION = 9;
	public static final int DEFAULT_PAGE = 1;
	public static final int DEFAULT_ORDER = -1;
	public static final int SILVER_TO_GOLD = 100;//100银等于1金
	public static final List<Map<String,Object>> SAVING_TIME_INFO = new ArrayList<Map<String,Object>>();
	
	public static final List<Map<String,Object>> EQUIPMENT_TYPE = new ArrayList<Map<String, Object>>();
	public static final List<Map<String,Object>> MATERIAL_TYPE = new ArrayList<Map<String, Object>>();
	public static final List<Map<String,Object>> ITEM_TYPE = new ArrayList<Map<String, Object>>();
	public static final List<Map<String,Object>> AUCTION_ITEM_TYPE = new ArrayList<Map<String, Object>>();
	public static final Map<String,Object> ALL_SUBTYPE_IN_AUCTION = new HashMap<String, Object>();
	
	//兵种
	public static final double DISMISS_SOLDIER = .5;//遣散返回资源 = 招募资源*此系数
	public static final double UPGRADE_SOLDIER = .5;//进阶消耗资源 = 下一阶消耗资源*此系数
	
	public static final int HERO_STATUS_FREE = 0;//武将状态，空闲状态
	public static final int HERO_STATUS_FIGHTING = 1;//武将状态，出征状态
	public static final int HERO_STATUS_AFFAIR = 2;//武将状态，执行内政策略
	
	/**********************************地窖***********************************************/
	public static final int CELLAR_PROTECTION_WOOD=1;//木材
	public static final int CELLAR_PROTECTION_FOOD=2;//粮食
	public static final int CELLAR_PROTECTION_STONE=3;//石料
	public static final int CELLAR_PROTECTION_IRONORE=4;//铁矿
	public static final int CELLAR_PROTECTION_MONEY=5;//铜币
	
	
	/*************************出征，战斗*****************************************************/
	public static final int PRIMARY_FORCE = 1;//初级势力;
	public static final int SECONDARY_FORCE = 2;//中级势力;
	public static final int SENIOR_FORCE = 3;//高级势力;
//	public static final int HERO_CONFIG_FOR_BATTLE_PAGESIZE = 11;//出征界面武将配置页面，每页显示的武将数量
	public static final int HERO_CONFIG_FOR_BATTLE_DEFAULTPAGE = 1;//出征界面武将配置页面，默认显示的页码（第1页）
//	public static final int HERO_SOLDIER_CONFIG_FOR_BATTLE_PAGESIZE = 11;//出征界面武将配置页面，每页显示的武将数量
	public static final int HERO_SOLDIER_CONFIG_FOR_BATTLE_DEFAULTPAGE = 1;//出征界面武将配置页面，默认显示的页码（第1页）
	public static final int MONSTER_DEFAULTPAGE = 1;//出征界面武将配置页面，默认显示的页码（第1页）
	public static final int MONSTER_PAGESIZE = 9;//出征界面武将配置页面，默认显示的页码（第1页）
	
	/////////////////////城郊队伍可执行权限//////////////////////////
	public static final int CANLOOK = 1;//可以查看
	public static final int CANATTACK = 2;//可以攻击
	public static final int CANBACK = 3;//可以撤退
	/**
	 * 阵营类型友军
	 */
	public static final int BATTLE_CAMP_FRIEND = 1;
	/**
	 * 阵营类型敌人
	 */
	public static final int BATTLE_CAMP_ENEMY = 2;
	/**
	 * 倒计时时间秒（倒计时时间到没有进攻则系统自动踢出）
	 */
	public static final int BATTLE_BACKTIME = 300;
	
	/**系统开始踢人时自动设置的校验时间1970---*/
	public static final Date BATTLE_BACKTIME_DATE = new Date(0);
	
	
	public static final int NO_BATTLE_TYPE = -1;//忽略出征类型
	public static final int BATTLE_TYPE_MULTIBATTLE = 0;//讨伐
	public static final int BATTLE_TYPE_SINGLEBATTLE = 1;//单挑
	public static final int BATTLE_TYPE_SENDBATTLE = 2;//派遣
	//public static final int BATTLE_TYPE_BE_MULTIBATTLE = 3;//被讨伐
	//public static final int BATTLE_TYPE_BE_SENDBATTLE = 4;//被支援
	public static final int BATTLE_TYPE_GET_RESOURCE = 5;//采集资源
	/**野怪***/
	public static final int TARGET_TYPE_MONSTER = 0;//目标类型，野怪
	/**玩家***/
	public static final int TARGET_TYPE_CHAR = 1;//目标类型，玩家
	/**资源***/
	public static final int TARGET_TYPE_RESOURCE = 2;//目标类型，资源
	public static final int MONSTER_ID = 0;//野外势力Id
	
	/******出征状态，前往****/
	public static final int BATTLE_STATUS_TOWARD = 0;//
	/******出征状态，返回****/
	public static final int BATTLE_STATUS_BACK = 1;//
	/******出征状态，到达开始等待****/
	public static final int BATTLE_STATUS_WAIT = 2;//
//	public static final int BATTLE_STATUS_WILL_FIGHT = 4;//
	/******出征状态，进入城郊（准备战斗）****/
	public static final int BATTLE_STATUS_WAIT_FIGHT = 3;//
	/******出征状态，战斗中****/
	public static final int BATTLE_STATUS_FIGHTING = 4;//
	
	public static final int FIGHT_STATUS_USER = 0;//战斗，玩家手动
	public static final int FIGHT_STATUS_NPC = 1;//战斗，野外电脑
	public static final int FIGHT_STATUS_AUTO = 2;//战斗，自动战斗
	public static final int FIGHT_STATUS_SAVEAUTO = 3;//战斗，托管
	public static final int FIGHT_STATUS_NOT_IN_BATTLE = 4;//战斗，不在战场
//	public static final int FIGHT_STATUS_ESCAPING = 4;//战斗，逃跑
	
	public static final int SINGLE_BATTLE_LOCATION_A_ID = 0;//位置A的Id
	public static final int SINGLE_BATTLE_LOCATION_B_ID = 1;//位置A的Id
	
	public static final int BATTLE_SEARCH_TYPE_ALL = 0;//军情查询类型，所有类型
	public static final int BATTLE_SEARCH_TYPE_DEFENCE = 1;//军情查询类型，受攻击
	public static final int BATTLE_SEARCH_TYPE_ATTACK = 2;//军情查询类型，出征攻击别人
	public static final int BATTLE_SEARCH_TYPE_SEND = 3;//军情查询类型，派遣支援
	public static final int BATTLE_SEARCH_TYPE_DEFAULT = 0;//军情,默认类型
	public static final int BATTLE_SEARCH_PAGES = 15;//军情,最大行数
	public static final int BATTLE_SEARCH_DEFAULT_PAGE = 1;//军情,默认显示页数
	
	public static final int BATTLE_SECOND = 1;//多少秒发送一次，一秒

	
	
	public static final int BATTLE_HERO_TYPE_PLAYER = 0;//战场里战斗对象类型，玩家
	public static final int BATTLE_HERO_TYPE_AI = 1;//战场里战斗对象类型，电脑
	
	
	/************************************资源****************************************/
	
	public static final int RESOURCE_TYPE_FOOD = 0;//资源类型，粮食
	public static final int RESOURCE_TYPE_WOOD = 1;//资源类型，木材
	public static final int RESOURCE_TYPE_STONE = 2;//资源类型，石料
	public static final int RESOURCE_TYPE_IRONORE = 3;//资源类型，铁矿
	public static final int FIELD_STATUS_NULL = 0;
	public static final int FIELD_STATUS_GROWING = 1;
	public static final int FIELD_STATUS_ADULTNESS = 2;//成熟
	public static final int FIELD_STATUS_EFFECT = 3;
	public static final int FIELD_STATUS_WILL_OPEN = 4;
	public static final List<Integer> FIELD_RESOURCE_LIST = new ArrayList<Integer>();//地块成长时间
	public static final List<Integer> FIELD_RESOURCE_NEED_PEOPLE_LIST = new ArrayList<Integer>();//地块需求人口
	public static final List<Integer> FIELD_RESOURCE_BASE = new ArrayList<Integer>();//地块资源产出基数
	public static final int FIELD_GROW_TIME_THREE_HOURS = 0;
	public static final int FIELD_GROW_TIME_SIX_HOURS = 1;
	public static final int FIELD_GROW_TIME_TWELVE_HOURS = 2;
	public static final int FIELD_GROW_TIME_TWENTY_FOUR_HOURS = 3;
	
	/*************************** 集市相关************************************/
	
	public static final List<Integer> RESOURCE_VALUE = new ArrayList<Integer>();//资源价值，用于集市资源兑换
	public static final double RESOURCE_FACTOR = 1.0;//资源价值，用于集市资源兑换
	public static final List<Double> RESOURCE_SELL_VALUE = new ArrayList<Double>();//资源出售系数，用于集市资源出售
	
	
	/***********************comet************************************/
	
	public static final String COMET_CHANNEL_SYSTEM = "/gameSystem/";
	public static final String COMET_CHANNEL_BATTLE = "/battleSystem/";
	
	//控制频道(战斗)
	public static final int BATTLE_CHANNEL_TYPE_ATTACK = 1;//战斗频道控制，攻击
	public static final int BATTLE_CHANNEL_TYPE_AUTOATTACK = 2;//战斗频道控制，自动攻击
	public static final int BATTLE_CHANNEL_TYPE_ESCAPE = 3;//战斗频道控制，逃跑
	public static final int BATTLE_CHANNEL_TYPE_SKILL = 4;//战斗频道控制，放技能
	public static final int BATTLE_CHANNEL_TYPE_HAS_READY = 5;//战斗频道控制，播放完毕，删除延时
	
	public static final int MULTIBATTLE_CHANNEL_TYPE_ATTACK = 10;//战斗频道控制，攻击(目标选择)
	public static final int MULTIBATTLE_CHANNEL_TYPE_ATTACK_TARGET = 11;//战斗频道控制，攻击(目标攻击)
	public static final int MULTIBATTLE_CHANNEL_TYPE_AUTOATTACK = 12;//战斗频道控制，自动攻击
	public static final int MULTIBATTLE_CHANNEL_TYPE_DEFENCE = 13;//战斗频道控制，防御
	public static final int MULTIBATTLE_CHANNEL_TYPE_ESCAPE = 14;//战斗频道控制，逃跑
	public static final int MULTIBATTLE_CHANNEL_TYPE_SKILL = 15;//战斗频道控制，放技能（目标选择）
	public static final int MULTIBATTLE_CHANNEL_TYPE_SKILL_TARGET = 16;//战斗频道控制，放技能（攻击目标）
	public static final int MULTIBATTLE_CHANNEL_TYPE_HAS_READY = 17;//战斗频道控制，播放完毕，删除延时
	
	//系统频道
	public static final int GAME_CHANNEL_BATTLE_WARN = 1;//战斗提示
	public static final int GAME_CHANNEL_MAIL_WARN = 2;//邮件提示
	public static final int GAME_CHANNEL_RESOURCE_UPDATE = 3;//资源更新
	public static final int GAME_CHANNEL_BUILDING_QUEUE = 4;//建筑队列
	public static final int GAME_CHANNEL_FRIEND_WARN = 5;//好友提示
	public static final int GAME_CHANNEL_BULDING_EXP = 6;//经验
	public static final int GAME_CHANNEL_SUBURB = 7;//城郊
	
	//战斗频道
	public static final int BATTLE_MESSAGE_TYPE_TURN = 1;//战斗回合轮换
	public static final int BATTLE_MESSAGE_TYPE_END = 2;//战斗结束
	public static final int BATTLE_MESSAGE_TYPE_TIME = 3;//战斗时间
	public static final int BATTLE_MESSAGE_TYPE_AUTO_ATTACK = 4;//自动战斗
	public static final int BATTLE_MESSAGE_TYPE_VIEW = 5;//战斗动画

	//战斗展示频道相关
	public static final int BATTLE_VIEW_TYPE_NORMAL = 1;//战斗展示类型，普通攻击
	public static final int BATTLE_VIEW_TYPE_SKILL = 2;//战斗展示类型，技能
	public static final int BATTLE_VIEW_TYPE_ROUND_END = 3;//战斗展示回合结束
	
	public static final int BATTLE_VIEW_RESULT_HIT = 1;//攻击结果命中
	public static final int BATTLE_VIEW_RESULT_CRITICAL = 2;//攻击结果暴击
	public static final int BATTLE_VIEW_RESULT_DODGE = 3;//攻击结果闪避
	public static final int BATTLE_VIEW_RESULT_MISS = 4;//攻击结果未命中
	public static final int BATTLE_VIEW_RESULT_GOD = 5;//攻击结果免疫
//	public static final int BATTLE_VIEW_RESULT_LOSE = 3;//攻击结果失败
	
	public static final int BATTLE_DELAY = 4000;//服务器延时，正常情况
	public static final int BATTLE_DELAY_START = 500;//服务器开始，正常情况
	public static final int BATTLE_DELAY_NOT_IN_BATTLE = 300;//服务器延时，战场快速进行情况
	public static final int BATTLE_DELAY_READY = 5000;//服务器延时
	public static final int BATTLE_WAIT = 1000;//服务器延时,重新唤起时间
	public static final int BATTLE_ROUND_TIME = 15;//每回合时间，秒
	
	public static final int BATTLE_WARN_TYPE_NORMAL = 0;//军情闪光，普通提示
	public static final int BATTLE_WARN_TYPE_SPECIAL = 1;//军情闪光，特殊提示
	
	
	
	///////////讨伐//////////////
	
	public static final int MAX_ROUND_NUM = 30;//最大回合数
	//战斗频道
	public static final int MULTI_BATTLE_MESSAGE_TYPE_START = 1;//战斗回合开始
	public static final int MULTI_BATTLE_MESSAGE_TYPE_ROUND_READY = 2;//战斗回合准备阶段
	public static final int MULTI_BATTLE_MESSAGE_TYPE_TURN = 3;//战斗回合轮换
	public static final int MULTI_BATTLE_MESSAGE_TYPE_SELECT = 4;//目标选择
	public static final int MULTI_BATTLE_MESSAGE_TYPE_TIME = 5;//战斗时间
	public static final int MULTI_BATTLE_MESSAGE_TYPE_AUTO_ATTACK = 6;//自动战斗
	public static final int MULTI_BATTLE_MESSAGE_TYPE_VIEW = 7;//战斗动画
	public static final int MULTI_BATTLE_MESSAGE_TYPE_DEFENCE = 8;//防御状态
	public static final int MULTI_BATTLE_MESSAGE_TYPE_END = 9;//战斗结束
	
	/***************************服务器时间刷新***************************************/
	public static final int REFRESH_CIRCLE_TIME = 5;//服务器刷新频率，单位秒
	
	
	
	/*********************************时间相关**********************************/
	public static final int CHANGE_MINUTE_TO_MILLISECOND = 60000;
	public static final int CHANGE_MINUTE_TO_MILLISECOND_test = 5000;
	public static final String JOB_STRING_FOR_AUCTION = "auctionJob_";
	public static final String JOB_STRING_FOR_PLAN_RESOURCE = "resourceGrow_";
	
	/////////////////计算相关///////////////////////
	public static final int CHANGE_PERCENT_TO_VALUE = 100;
	
	/******************************联盟相关************************************/
	public static final String ALLIANCE_TECHNOLOGY_SINONDIVISION = "gb0001";//兴农司科技编号前缀；
	public static final String ALLIANCE_TECHNOLOGY_EXPEDITIONSTATION = "gb0002";// 远征驿科技编号；
	
	///////////////////////////土地类型/////////////////////////////////////
	/**空地**/
	public static final int WORLD_NULL = 0;
	/**建城点**/
	public static final int WORLD_CITY_NUSED = 1;
	/**玩家城池**/
	public static final int WORLD_CITY_USED = 3;

	
	static{
		Map<String,Object> temp;
		temp = new HashMap<String, Object>();
		temp.put("value", "1");
		temp.put("name", "武器");
		EQUIPMENT_TYPE.add(temp);
		temp = new HashMap<String, Object>();
		temp.put("value", "2");
		temp.put("name", "头盔");
		EQUIPMENT_TYPE.add(temp);
		temp = new HashMap<String, Object>();
		temp.put("value", "3");
		temp.put("name", "胸甲");
		EQUIPMENT_TYPE.add(temp);
		temp = new HashMap<String, Object>();
		temp.put("value", "4");
		temp.put("name", "护腿");
		EQUIPMENT_TYPE.add(temp);
		temp = new HashMap<String, Object>();
		temp.put("value", "5");
		temp.put("name", "靴子");
		EQUIPMENT_TYPE.add(temp);
		temp = new HashMap<String, Object>();
		temp.put("value", "6");
		temp.put("name", "护腕");
		EQUIPMENT_TYPE.add(temp);
		ALL_SUBTYPE_IN_AUCTION.put("equipment", EQUIPMENT_TYPE);
		
		Map<String,Object> temp1;
		temp1 = new HashMap<String, Object>();
		temp1.put("needMoney", 10);
		temp1.put("value", 43200000);
		SAVING_TIME_INFO.add(temp1);
		temp1 = new HashMap<String, Object>();
		temp1.put("needMoney", 20);
		temp1.put("value", 86400000);
		SAVING_TIME_INFO.add(temp1);
		temp1 = new HashMap<String, Object>();
		temp1.put("needMoney", 40);
		temp1.put("value", 172800000);
		SAVING_TIME_INFO.add(temp1);
		
		
		Map<String,Object> temp2;
		temp2 = new HashMap<String, Object>();
		temp2.put("name", "打造材料");
		temp2.put("value", 1);
		MATERIAL_TYPE.add(temp2);
		temp2 = new HashMap<String, Object>();
		temp2.put("name", "图样");
		temp2.put("value", 2);
		MATERIAL_TYPE.add(temp2);
		temp2 = new HashMap<String, Object>();
		temp2.put("name", "宝石");
		temp2.put("value", 3);
		MATERIAL_TYPE.add(temp2);
		temp2 = new HashMap<String, Object>();
		temp2.put("name", "其他");
		temp2.put("value", 4);
		MATERIAL_TYPE.add(temp2);
		ALL_SUBTYPE_IN_AUCTION.put("material", MATERIAL_TYPE);
		
		Map<String,Object> temp3;
		temp3 = new HashMap<String, Object>();
		temp3.put("name", "功能道具");
		temp3.put("value", 1);
		ITEM_TYPE.add(temp3);
		temp3 = new HashMap<String, Object>();
		temp3.put("name", "强化道具");
		temp3.put("value", 2);
		ITEM_TYPE.add(temp3);
		temp3 = new HashMap<String, Object>();
		temp3.put("name", "技能书");
		temp3.put("value", 3);
		ITEM_TYPE.add(temp3);
		temp3 = new HashMap<String, Object>();
		temp3.put("name", "资源");
		temp3.put("value", 4);
		ITEM_TYPE.add(temp3);
		ALL_SUBTYPE_IN_AUCTION.put("item", ITEM_TYPE);
		
		Map<String,Object> temp4;
		temp4 = new HashMap<String, Object>();
		temp4.put("value", 1);
		temp4.put("name", "装备");
		AUCTION_ITEM_TYPE.add(temp4);
		temp4 = new HashMap<String, Object>();
		temp4.put("value", 3);
		temp4.put("name", "材料");
		AUCTION_ITEM_TYPE.add(temp4);
		temp4 = new HashMap<String, Object>();
		temp4.put("value", 2);
		temp4.put("name", "道具");
		AUCTION_ITEM_TYPE.add(temp4);
		FIELD_RESOURCE_LIST.add(3);
		FIELD_RESOURCE_LIST.add(6);
		FIELD_RESOURCE_LIST.add(12);
		FIELD_RESOURCE_LIST.add(24);
		FIELD_RESOURCE_NEED_PEOPLE_LIST.add(50);
		FIELD_RESOURCE_NEED_PEOPLE_LIST.add(100);
		FIELD_RESOURCE_NEED_PEOPLE_LIST.add(200);
		FIELD_RESOURCE_NEED_PEOPLE_LIST.add(300);
		FIELD_RESOURCE_BASE.add(4000);//粮食
		FIELD_RESOURCE_BASE.add(5000);//木材
		FIELD_RESOURCE_BASE.add(4200);//石料
		FIELD_RESOURCE_BASE.add(3200);//铁
		RESOURCE_VALUE.add(100);//粮食
		RESOURCE_VALUE.add(100);//木材
		RESOURCE_VALUE.add(100);//石料
		RESOURCE_VALUE.add(100);//铁矿
		RESOURCE_SELL_VALUE.add(0.7);//粮食
		RESOURCE_SELL_VALUE.add(0.8);//木材
		RESOURCE_SELL_VALUE.add(0.8);//石料
		RESOURCE_SELL_VALUE.add(0.9);//铁矿
		GEMSTONE_COMPOUND_RATE_MAP.put(3, 0.5);
		GEMSTONE_COMPOUND_RATE_MAP.put(4, 0.7);
		GEMSTONE_COMPOUND_RATE_MAP.put(5, 1.0);
		
		//材料等级
		Map<String, Object> temp5;
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "1级材料");
		temp5.put("level", 1);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "2级材料");
		temp5.put("level", 2);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "3级材料");
		temp5.put("level", 3);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "4级材料");
		temp5.put("level", 4);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "5级材料");
		temp5.put("level", 5);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "6级材料");
		temp5.put("level", 6);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "7级材料");
		temp5.put("level", 7);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "8级材料");
		temp5.put("level", 8);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "9级材料");
		temp5.put("level", 9);
		MATERIAL_LEVEL_LIST.add(temp5);
		temp5 = new HashMap<String,Object>();
		temp5.put("name", "10级材料");
		temp5.put("level", 10);
		MATERIAL_LEVEL_LIST.add(temp5);
		
		
		add(SPEND_FUNCTION_MARCH,1, 5*60, SPEND_UP_MARCH_MIN);
		add(SPEND_FUNCTION_MARCH,1, 10*60, SPEND_UP_MARCH_MID);
		add(SPEND_FUNCTION_MARCH,1, 30*60, SPEND_UP_MARCH_MAX);
		add(SPEND_FUNCTION_TRAIN,1, 30*60, SPEND_UP_TRAIN_MIN);
		add(SPEND_FUNCTION_TRAIN,1, 60*60, SPEND_UP_TRAIN_MID);
		add(SPEND_FUNCTION_TRAIN,1, 3*60*60, SPEND_UP_TRAIN_MAX);
		add(SPEND_FUNCTION_CITY,1, 10*60, SPEND_UP_LEVEL4);
		add(SPEND_FUNCTION_CITY,1, 60*60, SPEND_UP_LEVEL3);
		add(SPEND_FUNCTION_CITY,1, 6*60*60, SPEND_UP_LEVEL2);
		add(SPEND_FUNCTION_CITY,1, 24*60*60, SPEND_UP_LEVEL1);
		
		add(SPEND_FUNCTION_POPUSUP,1, 10, SPEND_UP_POPUSUP_MIN);
		add(SPEND_FUNCTION_POPUSUP,1, 30, SPEND_UP_POPUSUP_MID);
		add(SPEND_FUNCTION_POPUSUP,1, 50, SPEND_UP_POPUSUP_MAX);
		add(SPEND_FUNCTION_PEOPLE,1, 1000, SPEND_UP_PEOPLE_MIN);
		add(SPEND_FUNCTION_PEOPLE,1, 3000, SPEND_UP_PEOPLE_MID);
		add(SPEND_FUNCTION_PEOPLE,1, 5000, SPEND_UP_PEOPLE_MAX);
	}

	/**
	 * 根据建筑状态标志获取状态描述
	 * @param status
	 * @return
	 */
	public static  String getBuildingStatusDesc(int status){
		String ret = null;
		switch(status){
		case 1:
			ret = "建造中";
			break;
		case 2:
			ret = "升级中";
			break;
		case 3:
			ret = "拆除中";
			break;
		default:
			logger.error(status+"--未知的建造状态");	
		}
		return ret;
	}
	/**
	 * 
	 * @param functionType 消费类型
	 * @param type 正负效果
	 * @param value 道具加速值
	 * @param itemNum 道具编号
	 * @param item 新道具
	 */
	private static void add(int functionType,int type,int value,String itemNum){
		StaticSpeedItem item = new StaticSpeedItem();
		item.setFunctionType(functionType);
		item.setType(type);
		item.setItemNo(itemNum);
		item.setSecond(value);
		if (SPENDITEMMAP.get(functionType) == null){
			SPENDITEMMAP.put(functionType,new LinkedHashMap<String,StaticSpeedItem>());
		}
		SPENDITEMMAP.get(functionType).put(itemNum, item);
		
	}
	/**
	 * 加速消费公式
	 * @param type 加速方式
	 * @param second 剩余时间（秒）
	 * @return
	 */
	public static  int getNeedMoneyByType(int type,int second){
		int money = 0;
		if(type == SPEND_FUNCTION_CITY){
			second = (second+59)/60;
			money = (second*5+2)/3;
		}else if(type == SPEND_FUNCTION_MARCH){
			second = (second+59)/60;
			money = second * 2;
		}else if(type == SPEND_FUNCTION_TRAIN){
			second = (second+59)/60;
		}else if(type == SPEND_FUNCTION_PEOPLE){
			money = second;
		}else if(type == SPEND_FUNCTION_POPUSUP){
			money = second;
		}
		return money;
	}
	/**
	 * 根据等级查询等级层次
	 * @param level
	 * @return
	 */
	public static Integer getMyLevel(int level) {
		int l = 0;
		while(level > l*10){
			l++;
		}
		return l;
	}
	/**
	 * 军情菜单
	 * 军情类型表示集合字符串：
	 * （战斗类型，状态，目标类型）str-<所显示菜单索引-是否可点击>>》
	 */
	private static Map<String,Map<Integer,Boolean>> BATTLE_MENU = new HashMap<String, Map<Integer,Boolean>>();
	/**
	 * 根据军情战斗类型和军队状态返回可显示（执行）的菜单索引列表
	 * @param isMine 是否是自己的军队
	 * @param battleType
	 * @param status
	 * @return
	 */
	public static Map<Integer,Boolean> getBattleMenu(boolean isMine, int status,int targetType){
		int i = isMine ? 1:0;
		String str = i + ","+status +"," + targetType;
		Map<Integer,Boolean> menuMap = new HashMap<Integer, Boolean>();
		if(BATTLE_MENU.containsKey(str)){
			menuMap = BATTLE_MENU.get(str);
		}else{
			menuMap = getBattleEnum(isMine,status,targetType);
			BATTLE_MENU.put(str, menuMap);
		}
		return menuMap;
	}
	/**
	 * 枚举菜单
	 * @param isMine 
	 * @param battleType
	 * @param status
	 * @param targetType
	 * @return
	 */
	private static Map<Integer,Boolean> getBattleEnum(boolean isMine, int status,int targetType) {
		Map<Integer,Boolean> menu = new LinkedHashMap<Integer, Boolean>();
		menu.put(0, false);//进入战斗
		menu.put(1, false);//进入战区
		menu.put(2, false);//加速
		menu.put(3, false);//召回
		menu.put(4, false);//详情
		if(status == BATTLE_STATUS_TOWARD){
			menu.put(2, true);//加速
			menu.put(3, true);//召回
			menu.put(4, true);//详情
		}else if(status == BATTLE_STATUS_BACK){
			menu.put(2, true);//加速
			menu.put(4, true);//详情
		}else if(status == BATTLE_STATUS_WAIT){
			if(targetType == TARGET_TYPE_MONSTER){
				menu.put(0, true);
				menu.put(3, true);//召回
				menu.put(4, true);//详情
			}else{
				menu.put(1, true);//进入战区
				menu.put(3, true);//召回
				menu.put(4, true);//详情
			}
		}else if(status == BATTLE_STATUS_WAIT_FIGHT){
			menu.put(1, true);//进入战区
			menu.put(3, true);//召回
			menu.put(4, true);//详情
		}else if(status == BATTLE_STATUS_FIGHTING){
			menu.put(0, true);//进入战斗
			menu.put(4, true);//详情
		}
		if(!isMine){
			menu.put(2, false);//加速
			menu.put(3, false);//召回
		}
		return menu;
	}
}
