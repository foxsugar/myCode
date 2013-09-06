package com.crystalcg.gamedev.newChat;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
/**
 * 聊天所用的常量
 * @author liuxueliang
 *
 */
public class ChatConstants {

	/** 联盟Id **/
	public static String ALLIANCE_ID_Key = "rSiUz1ET8J56acT9zGhBdplY1C";
	/** 君主Id **/
	public static String CHARACTER_ID_KEY = "8KHDKGwPQkS2tI8Cn0E7spP9DW";
	/**国家id**/
	public static String COUNTRY_ID_KEY = "Xsi8x1Ex84fza4T9zGhBdxlY1f";
	// 用于聊天状态的维护 key:郡主名称 value:郡主id
	public static final Map<String, String> CLIENT_CHAT_MAP = new ConcurrentHashMap<String, String>();
	// 公聊聊天频道名称
	public static final String CHAT_CHANEL_NAME = "/gameSystem/chat";
	//国家
	public static final String CHAT_COUNTRY_CHANEL = "/gameSystem/countryChat";
	//联盟
	public static final String CHAT_ALLICE_CHANEL = "/gameSystem/alliceChat";
}
