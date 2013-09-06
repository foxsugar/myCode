package com.crystalcg.gamedev.chat;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class MessageStore {
	
	private MessageQueue world;
	private MessageQueue system;
	private Map<String,MessageQueue> country;
	private Map<String,MessageQueue> alliance;
	private Map<String,MessageQueue> personal;
	final private static String prex_country = "c";
	final private static String prex_alliance = "a";
	final private static String prex_personal = "p";

	public MessageStore(){
		world = new MessageQueue();
		system = new MessageQueue();
		country = new HashMap<String,MessageQueue>();
		for(int i=0;i<=6;i++){
			country.put(prex_country+i, new MessageQueue());
		}
		alliance = new HashMap<String,MessageQueue>();
		personal = new HashMap<String,MessageQueue>();
	}
	
	public void initIndex(int countryId,int allianceId,int charId,MessageIndex index){
		index.setWorldIndex(world.getEnd());
		index.setSystemIndex(system.getEnd());
		index.setCountryIndex( country.get(prex_country+countryId).getEnd());
		MessageQueue alliance_queue = alliance.get(prex_alliance+allianceId);
		if(alliance_queue!=null){
			index.setAllianceIndex(alliance_queue.getEnd());
		}
		MessageQueue personal_queue = personal.get(prex_personal+charId);
		if(personal_queue!=null){
			index.setPersonalIndex(personal_queue.getEnd());
		}
	}
	
	public Message[] get(int countryId,int allianceId,int charId,MessageIndex index){
		ModifyIndex worldIndex = new ModifyIndex(index.getWorldIndex());
		ModifyIndex systemIndex = new ModifyIndex(index.getSystemIndex());
		ModifyIndex countryIndex = new ModifyIndex(index.getCountryIndex());
		ModifyIndex allianceIndex = new ModifyIndex(index.getAllianceIndex());
		ModifyIndex personalIndex = new ModifyIndex(index.getPersonalIndex());
		Message[] world_message = world.get(worldIndex);
		Message[] system_message = system.get(systemIndex);
		Message[] country_message = country.get(prex_country+countryId).get(countryIndex);
		Message[] alliance_message = null;
		Message[] personal_message = null;
		MessageQueue alliance_queue = alliance.get(prex_alliance+allianceId);
		if(alliance_queue!=null){
			alliance_message = alliance_queue.get(allianceIndex);
		}
		MessageQueue personal_queue = personal.get(prex_personal+charId);
		if(personal_queue!=null){
			personal_message = personal_queue.get(personalIndex);
		}
		
		Message[] all = new Message[world_message.length+system_message.length+country_message.length+(alliance_message==null?0:alliance_message.length)+(personal_message==null?0:personal_message.length)];
		int desPos = 0;
		if(world_message.length!=0){
			System.arraycopy(world_message, 0, all, desPos, world_message.length);
			desPos += world_message.length;
		}
		if(system_message.length!=0){
			System.arraycopy(system_message, 0, all, desPos, system_message.length);
			desPos += system_message.length;
		}
		if(country_message.length!=0){
			System.arraycopy(country_message, 0, all, desPos, country_message.length);
			desPos += country_message.length;
		}
		if(alliance_message!=null&&alliance_message.length!=0){
			System.arraycopy(alliance_message, 0, all, desPos, alliance_message.length);
			desPos += alliance_message.length;
		}
		if(personal_message!=null&&personal_message.length!=0){
			System.arraycopy(personal_message, 0, all, desPos, personal_message.length);
		}
		
		Arrays.sort(all);
		index.setAllianceIndex(allianceIndex.getIndex());
		index.setCountryIndex(countryIndex.getIndex());
		index.setPersonalIndex(personalIndex.getIndex());
		index.setWorldIndex(worldIndex.getIndex());
		return all;
	}
	
	public void add(Message message){
		switch(message.getType()){
			case 0:
				world.add(message);
				break;
			case 1:
				country.get(prex_country+message.getTo()).add(message);
				break;
			case 2:
				MessageQueue amq = alliance.get(prex_alliance+message.getTo());
				if(amq == null){
					amq = addToAlliance(message.getTo());
				}
				amq.add(message);
				break;
			case 3:
				MessageQueue pmq = personal.get(prex_personal+message.getTo());
				if(pmq == null){
					pmq = addToPersonal(message.getTo());
				}
				pmq.add(message);
				break;
		}
	}
	
	public void addSystemMessage(String msg){
		byte sysType = 4;
		Message message = new Message();
		message.setContent(msg);
		message.setFrom(-1);
		message.setFromName("系统");
		message.setType(sysType);
		system.add(message);
	}
	
	private MessageQueue addToAlliance(int allianceId){
		MessageQueue e = new MessageQueue();
		alliance.put(prex_alliance+allianceId,e);
		return e;
	}
	
	private MessageQueue addToPersonal(int targetCharId){
		MessageQueue e = new MessageQueue();
		personal.put(prex_personal+targetCharId,e);
		return e;
	}
	
}
