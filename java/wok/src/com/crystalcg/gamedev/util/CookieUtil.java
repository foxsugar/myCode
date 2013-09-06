package com.crystalcg.gamedev.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import com.crystalcg.gamedev.newChat.ChatConstants;
import com.crystalcg.gamedev.user.domain.UserCharacter;

public class CookieUtil {

	
	/**
	 * 登录或者注册时写入cookie信息
	 * @throws UnsupportedEncodingException 
	 */
	public static void WriteUserCookie(HttpServletResponse response,UserCharacter character) throws UnsupportedEncodingException{
		//用户名
		Cookie userName = new Cookie("userName",URLEncoder.encode(character.getName(),"utf-8") );
		userName.setPath("/");
		//君主id
		Cookie characterId = new Cookie(ChatConstants.CHARACTER_ID_KEY, ""+character.getId());
		characterId.setPath("/");
		//国家id
		Cookie countryId = new Cookie(ChatConstants.COUNTRY_ID_KEY,""+character.getCountryId());
		userName.setPath("/");
		//联盟id
		Cookie alliceId = new Cookie(ChatConstants.ALLIANCE_ID_Key,""+character.getAllianceId());
		userName.setPath("/");
		//记录当前登录用户映射信息
		ChatConstants.CLIENT_CHAT_MAP.put(character.getName(), ""+character.getId());
		response.addCookie(characterId);
		response.addCookie(countryId);
		response.addCookie(userName);
		response.addCookie(alliceId);
		
	}
	
}
