package com.crystalcg.gamedev.user.action;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.newChat.ChatConstants;
import com.crystalcg.gamedev.user.domain.Account;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.AccountService;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.CookieUtil;

/**
 * 账号相关操作
 * 
 * @author xuzhongxing
 */
@Controller
public class AccountAction {
	
	private static Logger logger = LoggerFactory.getLogger(AccountAction.class);

	private AccountService accountService;
	private CharacterService characterService;

	/**
	 * 请求登陆页面
	 * @return
	 */
	@RequestMapping(value="/")
	public String welcomeFile(){
		return "/index.html";
	}
	
	/**
	 * 注册账号
	 * @param username
	 * @param password
	 * @param session
	 * @return
	 * @throws AppException
	 */
	@RequestMapping(value = "/register")
	@ResponseBody
	public Map<String, Object> userRegister(String username, String password, HttpSession session) throws AppException{
		Account account = accountService.getAccountByName(username);// 只用用户名验证
		Map<String, Object> retMap = new HashMap<String, Object>();
		if(account != null){//用户名已存在
			retMap.put("command", "failure");
			retMap.put("desc", "用户名已存在");
			logger.info("创建用户失败，用户名["+username+"]已存在");
			return retMap;
		}
		
		try {
			accountService.insertAccount(username, password);
		} catch (Exception e) {
			retMap.put("command", "failure");
			retMap.put("desc", "创建用户时出错，请稍后再试");
			logger.info("创建用户异常，"+e.getMessage());
			return retMap;
		}
		retMap.put("command", "success");
		logger.info("创建用户["+username+"]成功");
		return retMap;
	}
	
	/**
	 * 用户登录
	 * @param username 用户名
	 * @param password  密码
	 * @param session
	 * @return Map<String, Object>
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/login")
	@ResponseBody
	public Map<String, Object> login(String username, String password, HttpSession session,HttpServletResponse response) throws AppException, UnsupportedEncodingException{
		clearSession(session);
		 
		Account account = accountService.getAccountByName(username);//只用用户名验证
		Map<String, Object> retMap = new HashMap<String, Object>();
		if (account == null) {//用户不存在
		
			retMap.put("command", "failure");
			retMap.put("desc", "用户名不存在");
			logger.info("登录失败，用户名["+username+"]不存在");
			return retMap;
		} 
		//用户存在
		if(!account.getPassword().equals(password)){
			retMap.put("command", "failure");
			retMap.put("desc", "密码错误");
			logger.info("登录失败，[" + username + "]/[" + password + "]密码错误");
			return retMap;
		}
		//账号登录成功
		accountService.updateLastLoginTime(account);
		session.setAttribute("account", account);
		retMap.put("command", "success");
		retMap.put("desc", "登录成功，跳转到主页面。");
		
		//获取角色信息
		UserCharacter character = characterService.getCharacterById(account.getLastCharacterId());
		if (character!=null) {
			CookieUtil.WriteUserCookie(response, character);
		}
		logger.info("登录成功，[" + username + "],登录成功，跳转到主页面。");
		return retMap;
	}
	
	/**
	 * 清空session内的属性
	 * @param session
	 */
	private void clearSession(HttpSession session){
		Enumeration<String> attrNames = session.getAttributeNames();
		String sessionName;
		if(attrNames == null){
			return;
		}
		while(attrNames.hasMoreElements()){ 
			sessionName = attrNames.nextElement(); 
			session.removeAttribute(sessionName);
		} 
	}

	public AccountService getAccountService() {
		return accountService;
	}

	public void setAccountService(AccountService accountService) {
		this.accountService = accountService;
	}

	public CharacterService getCharacterService() {
		return characterService;
	}

	public void setCharacterService(CharacterService characterService) {
		this.characterService = characterService;
	}

}
