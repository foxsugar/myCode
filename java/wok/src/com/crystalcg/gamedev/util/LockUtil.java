package com.crystalcg.gamedev.util;
import java.util.HashMap;
import java.util.Map;

public class LockUtil {
	private static final Map<String,Object> LOCK_MAP = new HashMap<String,Object>();
	public static Object getLock(Object first,Object second){
		String str = first.toString() + "," +second.toString();
		if(!LOCK_MAP.containsKey(str)){
			LOCK_MAP.put(str, str);
		}
		return LOCK_MAP.get(str);
	}
	public static void remove(Object first, String second) {
		String str = first.toString() + "," +second.toString();
		if(LOCK_MAP.containsKey(str)){
			LOCK_MAP.remove(str);
		}
	}
	public static boolean isExitLock(Object first,Object second){
		String str = first.toString() + "," +second.toString();
		return LOCK_MAP.containsKey(str);
	}
}
