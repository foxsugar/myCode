package com.crystalcg.gamedev.buildingFunction.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ChangeHeroToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.HeroAlgorithm;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * 太医署
 * @author xuzhongxing
 *
 */
public class HospitalService {
	
	/**
	 * 初始化太医署
	 * @param characterId
	 * @return
	 * @throws AppException 
	 */
	public Map<String,Object> initHospital(int characterId) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> userHeroList = userHeroService.getAllUserHero(characterId);
		List<Map<String,Object>> retList = new ArrayList<Map<String,Object>>();
		for(UserHero userHero : userHeroList){
			retList.add(getViewMap(userHero));
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("midecine", maincity.getMedicine());
		retMap.put("medicineLimit", maincity.getMedicineLimit());
		retMap.put("hero", retList);
		return retMap;
	}
	
	/**
	 * 治疗武将
	 * @throws AppException 
	 */
	public void cureUserHero(int characterId,int userHeroId) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
		//验证武将存在
		if(userHero == null){
			throw new AppException("未知的武将");
		}
		//验证武将状态
		if(userHero.getHeroStatus() == Const.HERO_STATUS_FIGHTING){
			throw new AppException(userHero.getHeroName()+"正在战斗");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		int medicine = maincity.getMedicine();
		if(medicine==0){
			throw new AppException("没有膏药");
		}
		cure(userHero, maincity);
		//update userhero
		userHeroService.updateHeroStaminaMp(userHero);
		//update maincity
		//TO-DO
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.CURE_HERO, null, characterId);
	}
	
	/**
	 * 全部治疗
	 * @throws AppException 
	 */
	public void cureAllUserHero(int characterId) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> userHeroList = userHeroService.getUserHeroWithOutBattle(characterId);
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		int medicine = maincity.getMedicine();
		if(medicine==0){
			throw new AppException("没有膏药");
		}
		
		for(UserHero userHero : userHeroList){
			if(userHero != null && userHero.getHeroStatus() == Const.HERO_STATUS_FREE){
				cure(userHero, maincity);
				userHeroService.updateHeroStaminaMp(userHero);
			}
		}
		//update maincity
		//TO-DO
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.CURE_HERO, null, characterId);
	}
	/**
	 * 治疗要选择的武将，用于出征界面医疗功能
	 * @param characterId
	 * @param ids
	 * @return
	 * @throws AppException
	 */
	public List<UserHero> cureAllUserHero(int characterId, int[] ids) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> userHeroList = new ArrayList<UserHero>();
		if(ids.length==0){
			throw new AppException("请选择武将");
		}
		for(int i:ids){
			if(i==0){
				userHeroList.add(null);
				continue;
			}
			UserHero userHero = userHeroService.getUserHero(characterId, i);
			if(userHero==null){
				throw new AppException("要治疗的武将不存在");
			}
			if(userHero.getHeroStatus() == Const.HERO_STATUS_FIGHTING){
				throw new AppException(userHero.getHeroName()+"正在战斗");
			}
			userHeroList.add(userHero);
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		int medicine = maincity.getMedicine();
		if(medicine==0){
			throw new AppException("没有膏药");
		}
		for(UserHero userHero : userHeroList){
			if(userHero!=null){
				cure(userHero, maincity);
				userHeroService.updateHeroStaminaMp(userHero);
			}
		}
		//update maincity
		//TO-DO
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.CURE_HERO, null, characterId);
		return userHeroList;
	}
	
	private void cure(UserHero userHero,Maincity maincity) throws AppException{
		int medicine = maincity.getMedicine();
		HeroAlgorithm.computeAttribute(userHero);
		int staminaNeedMedicine = HeroAlgorithm.computeStaminaNeedMedicine(userHero);
		int mpNeedMedicine = HeroAlgorithm.computeMpNeedMedicine(userHero);
		//加体力
		if(staminaNeedMedicine>medicine){
			double addStatmina = (userHero.getStaminaMax() - userHero.getStamina())*medicine/staminaNeedMedicine;
			userHero.setStamina(userHero.getStamina()+addStatmina);
			medicine = 0;
		}else{
			userHero.setStamina(userHero.getStaminaMax());
			medicine -=staminaNeedMedicine;
		}
		//加精力
		if(mpNeedMedicine>medicine){
			double addMp = (userHero.getMpMax() - userHero.getMp())*medicine/mpNeedMedicine;
			userHero.setMp(userHero.getMp()+addMp);
			medicine = 0;
		}else{
			userHero.setMp(userHero.getMpMax());
			medicine -= mpNeedMedicine;
		}
		maincity.setMedicine(medicine);
	}
	
	/**
	 * 计算武将需要返回的数据
	 * @param userHero
	 * @return
	 */
	private Map<String,Object> getViewMap(UserHero userHero){
		Map<String,Object> viewMap = new HashMap<String, Object>();
		int stamina = (int)(userHero.getStamina()/userHero.getStaminaMax()*100);
		int mp = (int)(userHero.getMp()/userHero.getMpMax()*100);
		String fightingCapacity;//损耗的属性
		if(stamina>=50){
			fightingCapacity = 0+"%";
		}else{
			fightingCapacity =(int)((50-stamina))+"%";
		}
		int needMedicine = HeroAlgorithm.computeStaminaNeedMedicine(userHero)+HeroAlgorithm.computeMpNeedMedicine(userHero);
		viewMap.put("id", userHero.getId());
		viewMap.put("toolTipInfo", ChangeHeroToToolTip.change(userHero));
		viewMap.put("health", stamina+"%/"+mp+"%");
		viewMap.put("fightingCapacity", fightingCapacity);
		viewMap.put("needMedicine", needMedicine);
		viewMap.put("canCure",userHero.getHeroStatus()!=Const.HERO_STATUS_FIGHTING);//战斗状态不可治疗
		return viewMap;
	}
	
}
