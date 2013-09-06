package com.crystalcg.gamedev.util;

import java.net.SocketAddress;
import java.util.Map;

import net.spy.memcached.MemcachedClient;

public class CacheClient{
	
	private MemcachedClient client;
	private static final int EXP = 60480; //7天*24小时*60分钟*60秒

	public CacheClient(MemcachedClient client){
		this.client = client;
	}
	
	public void add(String key,Object o){
		client.add(key, EXP, o);
	}
	
	public Object get(String key){
		return client.get(key);
	}
	
	public void replace(String key,Object o){
		client.replace(key, EXP, o);
	}
	
	public void delete(String key){
		client.delete(key);
	}
	
	public Map<SocketAddress, Map<String, String>> getStats(){
		return client.getStats();
	}

}
