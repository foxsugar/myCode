package com.crystalcg.gamedev.world;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.util.cache.WorldCityCache;

/**
 * 世界上的资源、城市
 * @author xuzhongxing
 *
 */
@Controller
public class WorldAction {
	/**
	 * 获取世界资源
	 */
	@RequestMapping(value="getWorldResource")
	@ResponseBody
	public Object getWorldResource(int x, int y,HttpSession session){
		return WorldService.getResource(x, y);
	}
	/**
	 * 获取世界怪物
	 */
	@RequestMapping(value="getWorldMonster")
	@ResponseBody
	public Object getWorldMonster(int x,int y,HttpSession session){
		return WorldService.getForce(x, y);
	}
	/**
	 * 获取世界国都
	 */
	@RequestMapping(value="getWorldCapital")
	@ResponseBody
	public Object getWorldCapital(int id,HttpSession session){
		return WorldCityCache.getWorldCity(id);
	}
	/**
	 * 获取世界名城
	 */
	@RequestMapping(value="getWorldCity")
	@ResponseBody
	public Object getWorldCity(int id,HttpSession session){
		return WorldCityCache.getWorldCity(id);
	}
}
