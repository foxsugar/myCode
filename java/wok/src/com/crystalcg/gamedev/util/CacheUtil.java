package com.crystalcg.gamedev.util;

import java.io.IOException;
import java.net.SocketAddress;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import net.spy.memcached.AddrUtil;
import net.spy.memcached.MemcachedClient;

public class CacheUtil {
	
	private static CacheClient client;
	
	private static boolean available;
	
	private static String[] addrs = {
		"172.17.4.104:11211",
		"172.17.4.103:11211",
		"172.17.0.117:11211"
	};
	
	static {
		try {
			List<String> addrList = Arrays.asList(addrs);
			client = new CacheClient(new MemcachedClient(AddrUtil.getAddresses(addrList)));
			Map<SocketAddress,Map<String,String>> statMap = client.getStats();
			Iterator<Entry<SocketAddress,Map<String,String>>> it = statMap.entrySet().iterator();
			while(it.hasNext()){
				if(!it.next().getValue().isEmpty()){
					available = true;
					break;
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			System.err.println("缓存服务器连接失败!");
		}
	}
	
	public static CacheClient getClient(){
		if(available){
			return client;
		}
		return null;
	}
	
	public static void main(String[] args){
		getClient().replace("hello", args[0]);
		System.out.println(getClient().get("hello"));
	}
	
}
