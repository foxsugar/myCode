package com.crystalcg.gamedev.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class ServiceLocator implements ApplicationContextAware {

	private static ServiceLocator instance = null;
	private ApplicationContext applicationContext;
	private static Map<String,Object> beans = new HashMap<String,Object>();

	public ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	public void setApplicationContext(ApplicationContext context) {
		applicationContext = context;
	}

	public static ServiceLocator createInstance() {
		if (instance == null)
			instance = new ServiceLocator();
		return instance;
	}

	public static ServiceLocator getInstance() {
		return instance;
	}

	public static ApplicationContext getContext() {
		return getInstance().getApplicationContext();
	}

	public static Object getSpringBean(String beanId) {
		Object ret = beans.get(beanId);
		if (ret != null)
			return ret;
		ret = getContext().getBean(beanId);
		if (ret != null)
			beans.put(beanId, ret);
		return ret;
	}

}