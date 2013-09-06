package com.crystalcg.gamedev.hero.action;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.FloatUtil;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.cache.HeroLevelCache;

/**
 * 用户武将
 * @author xuzhongxing
 *
 */
@Controller
public class UserHeroAction {

	private UserHeroService userHeroService;
	final private static Map<String,String> SUCCESS = new HashMap<String, String>();
	{
		SUCCESS.put("status", "success");
	}

	/**
	 * 根据武将id获取武将
	 * @param id
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="getUserHero")
	@ResponseBody
	public Object getUserHero(HttpSession session,int id) throws AppException {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		UserHero userHero = userHeroService.getUserHero(character.getId(),id);
		if(userHero == null){
			return new ClientError("未知的武将");
		}
		HeroAlgorithm.computeAttribute(userHero);
		Map<String, Object> retMap = getViewMap(userHero);
		retMap.put("heroEquipments", userHeroService.getHeroEquipments(character.getId(), id));
		retMap.put("equipmentPage", userHeroService.getEquipmentPage(character.getId(), 1));
		retMap.put("skills", userHeroService.getHeroSkill(character.getId(), id));
		return retMap;
	}
	
	/**
	 * 按页数获取装备
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value="getEquipmentPage")
	@ResponseBody
	public Object getEquipmentPage(HttpSession session,int page) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		return userHeroService.getEquipmentPage(character.getId(), page);
	}

	/**
	 * 获取君主的全部武将
	 * @param characterId
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="getAllUserHero")
	@ResponseBody
	public Object getAllUserHero(HttpSession session) throws AppException {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		List<UserHero> list = userHeroService.getAllUserHero(character.getId());
		List<Map<String,Object>> retList = new LinkedList<Map<String,Object>>();
		for(UserHero userHero:list){
			retList.add(getListViewMap(userHero));
		}
		return retList;
	}
	
	/**
	 * 武将改名
	 * @param id
	 * @param name
	 * @throws AppException 
	 */
	@RequestMapping(value="modifyHeroName")
	@ResponseBody
	public Object modifyHeroName(HttpSession session,int id,String name){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			userHeroService.modifyHeroName(characterId,id,name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return SUCCESS;
	}
	
	/**
	 * 提升武将等级
	 * @param id
	 * @throws AppException 
	 */
	@RequestMapping(value="heroLevelup")
	@ResponseBody
	public Object heroLevelup(HttpSession session,int id) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			UserHero hero = userHeroService.levelup(characterId, id);
			return getViewMap(hero);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 为武将提升根骨
	 * @param id
	 * @throws AppException 
	 */
	@RequestMapping(value="addGift")
	@ResponseBody
	public Object addGift(HttpSession session,int id) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			UserHero hero = userHeroService.addGift(characterId, id);
			Map<String, Object> retMap = new HashMap<String,Object>();
			retMap.put("hero", getViewMap(hero));
			retMap.put("giftInfo", userHeroService.getGiftInfo(characterId, id));
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 分配潜能点
	 * @throws AppException 
	 */
	@RequestMapping(value="distributePoint")
	@ResponseBody
	public Object distributePoint(HttpSession session,int id,int force,int strategy,int physique,int agility) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			UserHero hero = userHeroService.distributePoint(characterId, id, force, strategy, physique, agility);
			return getViewMap(hero);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 洗髓（重置潜能点）
	 * @throws AppException 
	 */
	@RequestMapping(value="resetPoint")
	@ResponseBody
	public Object resetPoint(HttpSession session,int id) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			UserHero hero = userHeroService.resetPoint(characterId, id);
			return getViewMap(hero);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 武将穿戴装备（如果该位置有装备则替换）
	 * @throws AppException 
	 */
	@RequestMapping(value="addEquipment")
	@ResponseBody
	public Object addEquipment(HttpSession session,int id,int equipId,int page) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			UserHero hero = userHeroService.addEquipment(characterId, id, equipId);
			Map<String,Object> retMap = getViewMap(hero);
			retMap.put("heroEquipments", userHeroService.getHeroEquipments(character.getId(), id));
			retMap.put("equipmentPage", userHeroService.getEquipmentPage(character.getId(), page));
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 卸下装备
	 * @throws AppException 
	 */
	@RequestMapping(value="removeEquipment")
	@ResponseBody
	public Object removeEquipment(HttpSession session,int id,int equipId,int page) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			UserHero hero = userHeroService.removeEquipment(characterId, id, equipId);
			Map<String,Object> retMap = getViewMap(hero);
			retMap.put("heroEquipments", userHeroService.getHeroEquipments(character.getId(), id));
			retMap.put("equipmentPage", userHeroService.getEquipmentPage(character.getId(), page));
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 卸下全部装备
	 * @throws AppException 
	 */
	@RequestMapping(value="removeAllEquipment")
	@ResponseBody
	public Object removeAllEquipment(HttpSession session,int id,int page) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			UserHero hero = userHeroService.removeAllEquipment(characterId, id);
			Map<String,Object> retMap = getViewMap(hero);
			retMap.put("heroEquipments", userHeroService.getHeroEquipments(character.getId(), id));
			retMap.put("equipmentPage", userHeroService.getEquipmentPage(character.getId(), page));
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 更新武将体力(治疗)
	 * @param uh
	 * @throws AppException 
	 */
	@RequestMapping(value="cureHeroStamina")
	@ResponseBody
	public Object cureHeroStamina(HttpSession session,int id) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			return userHeroService.cureHeroStamina(characterId, id);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 更新武将精力(治疗)
	 * @throws AppException 
	 */
	@RequestMapping(value="updateHeroMp")
	@ResponseBody
	public Object updateHeroMp(HttpSession session,int id) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			return userHeroService.updateHeroMp(characterId, id);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 武将获得经验(放在经验池中)！仅用于测试
	 * @throws AppException 
	 */
	@RequestMapping(value="addExp")
	@ResponseBody
	public Object addExp(HttpSession session,int id,int exp) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			userHeroService.addExp(characterId, id, exp);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return null;
	}
	
	/**
	 * 解雇武将
	 * @throws AppException 
	 */
	@RequestMapping(value="fireHero")
	@ResponseBody
	public Object fireHero(HttpSession session,int id) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			userHeroService.fireHero(characterId,id);
			return userHeroService.getAllUserHero(characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 升级技能
	 * @throws AppException 
	 */
	@RequestMapping(value="upgradeHeroSkill")
	@ResponseBody
	public Object upgradeSkill(HttpSession session,int heroId,String skillNo) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			userHeroService.upgradeSkill(characterId,heroId,skillNo);
			return userHeroService.getHeroSkill(character.getId(), heroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 遗忘技能
	 * @throws AppException 
	 */
	@RequestMapping(value="forgetHeroSkill")
	@ResponseBody
	public Object forgetSkill(HttpSession session,int heroId,String skillNo) {
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			userHeroService.forgetSkill(characterId,heroId,skillNo);
			return userHeroService.getHeroSkill(character.getId(), heroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 提升根骨弹出窗口
	 * @throws AppException 
	 */
	@RequestMapping(value="getHeroGiftInfo")
	@ResponseBody
	public Object getGiftInfo(HttpSession session,int heroId){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("没有角色信息");
		}
		int characterId = character.getId();
		try {
			return userHeroService.getGiftInfo(characterId, heroId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	private Map<String,Object> getListViewMap(UserHero userHero){
		Map<String,Object> viewMap = new HashMap<String, Object>();
		viewMap.put("id", userHero.getId());
		viewMap.put("heroName", userHero.getHeroName());
		viewMap.put("quality", userHero.getQuality());
		return viewMap;
	}
	
	private Map<String,Object> getViewMap(UserHero userHero){
		Map<String,Object> viewMap = new LinkedHashMap<String, Object>();
		viewMap.put("id", userHero.getId());
		viewMap.put("smallHeroIcon", userHero.getSmallHeroIcon());
		viewMap.put("heroIcon", userHero.getHeroIcon());
		viewMap.put("heroName", userHero.getHeroName());
		viewMap.put("heroType", userHero.getHeroType());
		viewMap.put("quality", userHero.getQuality());
		viewMap.put("level", userHero.getLevel());
		viewMap.put("exp", userHero.getExp());
		viewMap.put("expLimit", HeroLevelCache.getExpLimit(userHero.getLevel()));
		viewMap.put("poolLimit", HeroLevelCache.getPoolLimit(userHero.getLevel()));
		viewMap.put("heroSoul", "无");//武魂
		viewMap.put("gift", FloatUtil.format(userHero.getGift(),1));
		viewMap.put("heroForce", (int)userHero.getHeroForce());
		viewMap.put("forceAdd", (int)userHero.getForceAdd());
		viewMap.put("strategy", (int)userHero.getStrategy());
		viewMap.put("strategyAdd", (int)userHero.getStrategyAdd());
		viewMap.put("physique", (int)userHero.getPhysique());
		viewMap.put("physiqueAdd", (int)userHero.getPhysiqueAdd());
		viewMap.put("agility", (int)userHero.getAgility());
		viewMap.put("agilityAdd", (int)userHero.getAgilityAdd());
		viewMap.put("point", userHero.getPoint());
		viewMap.put("heroTitle", userHero.getHeroTitle());
		viewMap.put("attack", (int)userHero.getAttack());
		viewMap.put("defence", (int)userHero.getDefence());
		viewMap.put("stamina", (int)userHero.getStamina());
		viewMap.put("staminaMax", (int)userHero.getStaminaMax());
		viewMap.put("mp", (int)userHero.getMp());
		viewMap.put("mpMax", (int)userHero.getMpMax());
		viewMap.put("criticalStrike", (int)userHero.getCriticalStrike());
		viewMap.put("hit", (int)userHero.getHit());
		viewMap.put("dodge", (int)userHero.getDodge());
		viewMap.put("command", (int)userHero.getCommand());
		viewMap.put("singleForce", (int)HeroAlgorithm.computeSingleForce(userHero));
		return viewMap;
	}
	
	public UserHeroService getUserHeroService() {
		return userHeroService;
	}

	public void setUserHeroService(UserHeroService userHeroService) {
		this.userHeroService = userHeroService;
	}

}
