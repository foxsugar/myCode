package com.crystalcg.gamedev.achieve.service;

import java.util.HashMap;
import java.util.Map;

import com.crystalcg.gamedev.achieve.domain.UserAchieveRecord;

public class AchieveService {
	public static Map<Integer, Map<Integer,UserAchieveRecord>> achieve_record_store = new HashMap<Integer, Map<Integer,UserAchieveRecord>>();
}
