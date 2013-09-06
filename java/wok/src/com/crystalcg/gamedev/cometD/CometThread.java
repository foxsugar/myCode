package com.crystalcg.gamedev.cometD;

import java.util.Map;

import com.crystalcg.gamedev.util.ServiceLocator;

public class CometThread extends Thread{
	public static final int COMET_PUBLISH = 1;
	public static final int COMET_DELIVER = 2;
	private int type;
	private String channelName;
	private Map<String, Object> data;
	private int characterId;
	@Override
	public void run() {
		UserComet userComet = (UserComet) ServiceLocator.getSpringBean("userComet");
		if(type==COMET_PUBLISH){
			userComet.publishToChannel(channelName, data);
			
		}else if(type==COMET_DELIVER){
			userComet.deliverToChannel(channelName, characterId, data);
		}
	}
	
	public CometThread(){
		
	}
	public CometThread(String channelName, Map<String, Object> data, int characterId){
		this.channelName = channelName;
		this.data = data;
		this.characterId = characterId;
		type = COMET_DELIVER;
	}
	public CometThread(String channelName, Map<String, Object> data){
		this.channelName = channelName;
		this.data = data;
		type = COMET_PUBLISH;
	}
	
	public String getChannelName() {
		return channelName;
	}
	public Map<String, Object> getData() {
		return data;
	}
	public int getCharacterId() {
		return characterId;
	}
	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
	public void setCharacterId(int characterId) {
		this.characterId = characterId;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

}
