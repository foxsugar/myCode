package com.crystalcg.gamedev.Exception;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

public class AjaxExceptionHandler implements HandlerExceptionResolver {
	
	private static final ModelAndView DEFAULT_MODELANDVIEW = new ModelAndView();
	
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		ex.printStackTrace();
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		try {
			PrintWriter writer = response.getWriter();
			if (ex instanceof AppException) {
				writer.write("{\"error\":\"" + ex.getMessage()+"\"}");
			} else {
				writer.write("{\"error\":\"服务器异常\"}");
			}
			writer.flush();
		} catch (IOException e) {
		}
		return DEFAULT_MODELANDVIEW;
	}

}
