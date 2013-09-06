package com.crystalcg.gamedev.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginFilter implements Filter {
	
	private static String[] whiteList = {
		"/wok/",
		"/wok/login",
		"/wok/register",
		"/wok/test",
		"/wok/register.html",
		"/wok/index.html",
		"/wok/css/index.css",
        "/wok/js/client/jquery.js",
        "/wok/js/severDataInterface/dataExchangeData.js",
	};
	
	private static String JS_PREFIX = "/wok/js/login/";
	private static String IMG_PREFIX = "/wok/images/login/";
	private static String TEST_PREFIX = "/wok/test";
	
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    public void doFilter(ServletRequest req, ServletResponse resp,FilterChain chain) throws IOException, ServletException {  
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;
        HttpSession session = request.getSession();
        String uri = request.getRequestURI();
        boolean isWhite = false;
        for(String s:whiteList){
        	if(s.equals(uri)){
        		isWhite = true;
        	}
        }
        if(!isWhite&&(uri.startsWith(JS_PREFIX)||uri.startsWith(IMG_PREFIX)||uri.startsWith(TEST_PREFIX))){
        	isWhite = true;
        }
        if(!isWhite&&(session.getAttribute("account")==null)){
        	System.out.println(uri+" 禁止访问");
        	if(uri.endsWith(".html")){
        		response.sendRedirect(request.getContextPath());
        	}else{
        		response.setContentType("text/html;charset=UTF-8");
        		PrintWriter writer = response.getWriter();
    			writer.write("{\"error\":\"该账号已掉线，请重新登录\"}");
    			writer.flush();
        	}
        	return;
        }
        chain.doFilter(req, resp);
    }

    @Override
    public void destroy() {
    }
}