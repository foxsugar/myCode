package com.crystalcg.gamedev.cometD;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CometThreadPool {
	public static ExecutorService cometPool = Executors.newFixedThreadPool(100);
	public static void addCometThread(Thread cometThread){
		cometPool.execute(cometThread);
	}
}
