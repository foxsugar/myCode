package com.crystalcg.gamedev.chat;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;

@Controller
public class ChatAction {
	
	private MessageStore messageStore;
	private CharacterService characterService;
	
	@RequestMapping(value="getMessage")
	@ResponseBody public List<Message> getMessage(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int charId = character.getId();
		int allianceId = character.getAllianceId();
		int countryId = character.getCountryId();
		MessageIndex messageIndex = (MessageIndex) session.getAttribute("messageIndex");
		if(messageIndex == null){
			messageIndex = new MessageIndex();
			messageStore.initIndex(countryId, allianceId, charId, messageIndex);
			session.setAttribute("messageIndex", messageIndex);
		}
		Message[] messages = messageStore.get(countryId, allianceId, charId, messageIndex);
		List<Message> l = new LinkedList<Message>();
		for(int i=0;i<messages.length;i++){
			if(messages[i].getFrom()!=charId){
				l.add(messages[i]);
			}
		}
		return l;
	}
	
	@RequestMapping(value="sendMessage")
	@ResponseBody
	public Object sendMessage(HttpSession session,byte type,String content){
		if(type == 4){
			return new ClientError("该账号没有在系统频道发送消息的权限");
		}
		if(type<0 || type>3){
			return new ClientError("未知的频道");
		}
		if(content == null || content.trim().isEmpty()){
			return new ClientError("请输入要发送的消息");
		}
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		Map<String,Object> retMap = new HashMap<String, Object>();
		Message message = new Message();
		message.setFrom(character.getId());
		message.setFromName(character.getName());
		int spaceIndex = content.indexOf(" ");
		if(content.startsWith("/")&&spaceIndex!=-1){
			message.setType((byte)3);
			String name = content.substring(1,spaceIndex);
			UserCharacter uc = characterService.getCharacterByName(name);
			content = content.substring(spaceIndex);
			if(uc == null){
				return new ClientError("不存在该角色");
			}else{
				message.setTo(uc.getId());
			}
		}else{
			message.setType(type);
		}
		if(message.getType() ==2){
			if(character.getAllianceId() == 0){
				return new ClientError("未加入联盟");
			}
			message.setTo(character.getAllianceId());
		}else if(message.getType() ==1){
			message.setTo(character.getCountryId());
		}
		message.setContent(content);
		messageStore.add(message);
		retMap.put("isSuccess", Boolean.TRUE);
		return retMap;
	}

	public CharacterService getCharacterService() {
		return characterService;
	}

	public void setCharacterService(CharacterService characterService) {
		this.characterService = characterService;
	}

	public MessageStore getMessageStore() {
		return messageStore;
	}

	public void setMessageStore(MessageStore messageStore) {
		this.messageStore = messageStore;
	}
	
}
