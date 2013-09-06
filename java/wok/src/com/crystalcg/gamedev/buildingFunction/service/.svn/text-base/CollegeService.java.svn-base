package com.crystalcg.gamedev.buildingFunction.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.buildingFunction.dao.CollegeDao;
import com.crystalcg.gamedev.hero.domain.UserHero;
import com.crystalcg.gamedev.hero.service.UserHeroService;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.util.ChangeHeroToToolTip;
import com.crystalcg.gamedev.util.ChangeSkillToToolTip;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.HeroSkillCache;
import com.crystalcg.gamedev.util.cache.ItemCache;
import com.crystalcg.gamedev.util.cache.QuestCache;
import com.crystalcg.gamedev.util.cache.domain.StaticHeroSkill;

/**
 * 教坊
 * @author xuzhongxing
 *
 */
public class CollegeService {
	
	private static Logger logger = LoggerFactory.getLogger(CollegeService.class);
	private CollegeDao collegeDao;
	
	/**
	 * 获取君主的所有武将
	 * @param characterId
	 * @return
	 * @throws AppException 
	 */
	public List<Map<String, Object>> getHeroForCollege(int characterId) throws AppException {
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<UserHero> heros = userHeroService.getAllUserHero(characterId);
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		Map<String, Object> temp;
		for(UserHero uh : heros){
			temp = new HashMap<String, Object>();
			temp.put("id", uh.getId());
			temp.put("toolTipInfo", ChangeHeroToToolTip.change(uh));
			list.add(temp);
		}
		return list;
	}
	
	/**
	 * 获取全部一级技能
	 * @return
	 * @throws AppException 
	 */
	public List<Map<String,Object>> getAllSkill(int characterId) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		List<UserHero> heros = userHeroService.getAllUserHero(characterId);
		if(heros.size()==0){
			return list;
		}
		
		UserHero userHero = heros.get(0);
		
//		Collection<StaticHeroSkill> heroSkillList = HeroSkillCache.getAllHeroSill();
//		for(StaticHeroSkill hse : heroSkillList){
//			//只显示一级技能
//			if(hse.getLevel() == 1){
//				list.add(getViewMap(hse));
//			}
//		}
        	list = getCanLearnSkill(characterId,userHero.getId());
		return list;
	}
	
	/**
	 * 获取已学一级技能
	 * @param characterId
	 * @param userHeroId
	 * @return
	 * @throws AppException
	 */
	public List<Map<String,Object>> getLearnedSkill(int characterId,int userHeroId) throws AppException{
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		Collection<StaticHeroSkill> heroSkillList = HeroSkillCache.getAllHeroSill();
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
		if(userHero == null){
			logger.error("请求的武将不存在");
			throw new AppException("请求的武将不存在");
		}
		List<String> skillNoList = collegeDao.getUserHeroSkillNo(characterId,userHeroId);
		for(StaticHeroSkill hse : heroSkillList){
			for(String s: skillNoList){
				//只取1级技能
				if(hse.getSkillNo().equals(s.split("_")[0]+"_1")){
					list.add(getViewMap(hse));
				}
			}
		}
		return list;
	}
	
	/**获取符合武将等级的可学技能
	 * @param characterId
	 * @param userHeroId
	 * @return
	 * @throws AppException
	 */
	public List<Map<String,Object>> getCanLearnSkill(int characterId,int userHeroId) throws AppException{
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		Collection<StaticHeroSkill> heroSkillList = HeroSkillCache.getAllHeroSill();
		List<String> skillNoList = collegeDao.getUserHeroSkillNo(characterId,userHeroId);
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
		if(userHero == null){
			logger.error("请求的武将不存在");
			throw new AppException("请求的武将不存在");
		}
		for(StaticHeroSkill hse : heroSkillList){
			
			if(userHero.getHeroType()==hse.getNeedWeapon()||hse.getNeedWeapon()==4){//判断武将的科学技能
				
				if(hse.getNeedHeroLevel()<=userHero.getLevel() && hse.getLevel() == 1){
					boolean isLearned = false;
					loop:
					for(String s : skillNoList){			
							if(hse.getSkillNo().contains(s.split("_")[0])){
								isLearned = true;
								break loop;
							}
					}
					if(!isLearned){
						list.add(getViewMap(hse));
					}
				}
			}
		
		}
		return list;
	}
	
	/**
	 * 获取大于武将等级的技能
	 * @param characterId
	 * @param userHeroId
	 * @return
	 * @throws AppException
	 */
	public List<Map<String,Object>> getCannotLearnSkill(int characterId,int userHeroId) throws AppException{
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		Collection<StaticHeroSkill> heroSkillList = HeroSkillCache.getAllHeroSill();
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
		if(userHero == null){
			logger.error("请求的武将不存在");
			throw new AppException("请求的武将不存在");
		}
		for(StaticHeroSkill hse : heroSkillList){
			if(userHero.getHeroType()==hse.getNeedWeapon()||hse.getNeedWeapon()==4){
				
				if(hse.getNeedHeroLevel()>userHero.getLevel() && hse.getLevel() == 1){
					list.add(getViewMap(hse));
				}
			}
		
		}
		return list;
	}
	
	/**
	 * 学习技能
	 * @param characterId
	 * @param userHeroId
	 * @param heroSkillId
	 * @throws AppException
	 */
	public void learnSkill(int characterId,int userHeroId,String skillNo) throws AppException{
		UserHeroService userHeroService = (UserHeroService) ServiceLocator.getSpringBean("userHeroService");
		UserHero userHero = userHeroService.getUserHero(characterId, userHeroId);
		if(userHero == null){
			logger.error("请求的武将不存在");
			throw new AppException("请求的武将不存在");
		}
		StaticHeroSkill hse = HeroSkillCache.getHeroSkill(skillNo);
		if(hse == null){
			logger.error("请求的技能不存在");
			throw new AppException("请求的技能不存在");
		}
		List<String> skillNoList = collegeDao.getUserHeroSkillNo(characterId,userHeroId);
		if(skillNoList.contains(hse.getSkillNo())){
			logger.error("该技能已学会");
			throw new AppException("该技能已学会");
		}
		if(userHero.getHeroType()!=hse.getNeedWeapon()&&hse.getNeedWeapon()!=4){
			logger.error("该武将不能学习此技能");
			throw new AppException("该武将不能学习此技能");
		}
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		List<UserItem> bookList = userItemService.getUserItemByItemNo(hse.getUpgradeNeedItem(), characterId);
		if(bookList.size() == 0){
			logger.error("缺少技能书："+hse.getUpgradeNeedItem());
			throw new AppException("缺少技能书："+hse.getUpgradeNeedItem());
		}
		UserItem book1 = bookList.get(0);
		if(book1.getItemAmount() == 1){
			userItemService.deleteFromUserItem(book1.getId());
		}else{
			userItemService.updateUserItemAmount(book1.getId(), book1.getItemAmount()-1);
		}
		collegeDao.insertRelHeroSkill(characterId, userHeroId, hse.getSkillNo());
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.HERO_SKILL_AMOUNT, null, characterId);
		questService.updateQuestSchedule(QuestTargeType.HERO_SKILL_LEVEL, null, characterId);
	}
	
	/**
	 * 获得武将所学的技能，用于武将信息界面
	 * @param characterId
	 * @param userHeroId
	 * @return
	 */
	public List<Map<String,Object>> getUserHeroSkills(int characterId,int userHeroId){
		List<String> list = collegeDao.getUserHeroSkillNo(characterId, userHeroId);
		List<Map<String,Object>> skills = new ArrayList<Map<String, Object>>();
		Map<String,Object> temp;
		String[] nextNoArray;
		String nextNo;
		StaticHeroSkill shs;
		for(String no : list){
			shs = HeroSkillCache.getHeroSkill(no);
			if(shs == null){
				logger.error("未知的技能 "+no);
				continue;
			}
			temp = new HashMap<String,Object>();
			temp.put("skillNo", shs.getSkillNo());
			temp.put("icon", shs.getIcon());
			temp.put("toolTipInfo", ChangeSkillToToolTip.change(shs));
			nextNoArray = shs.getSkillNo().split("_");
			nextNo = nextNoArray[0]+"_"+(Integer.valueOf(nextNoArray[1])+1);
			shs = HeroSkillCache.getHeroSkill(nextNo);
			if(shs!=null){
				temp.put("isMaxLevel", false);
				temp.put("nextDescription", shs.getDescription());
				temp.put("needExp", shs.getUpgradeNeedExp());
			}else{
				temp.put("isMaxLevel", true);
			}
			skills.add(temp);
		}
		return skills;
	}
	/**
	 * 获取武将所拥有的所有技能，目前用于战斗
	 * @param characterId
	 * @param userHeroId
	 * @return
	 */
	public List<StaticHeroSkill> getUserHeroSkill(int characterId,int userHeroId){
		List<String> list = collegeDao.getUserHeroSkillNo(characterId, userHeroId);
		List<StaticHeroSkill> retList = new ArrayList<StaticHeroSkill>();
		StaticHeroSkill shs;
		for(String no : list){
			shs = HeroSkillCache.getHeroSkill(no);
			if(shs == null){
				logger.error("未知的技能 "+no);
				continue;
			}
			retList.add(shs);
		}
		return retList;
	}
	/**
	 * 返回技能静态表中用于客户端展示的字段
	 * @param hse
	 * @return
	 */
	private Map<String,Object> getViewMap(StaticHeroSkill hse){
		Map<String,Object> temp = new HashMap<String, Object>();
		temp.put("skillNo", hse.getSkillNo());
		temp.put("name", hse.getName());
		temp.put("icon", hse.getIcon());
		temp.put("desc", hse.getDescription());
		temp.put("needItem", ItemCache.getItemByNo(hse.getUpgradeNeedItem()).getItemName());
		temp.put("needHeroLevel", hse.getNeedHeroLevel());
		temp.put("toolTipInfo", ChangeSkillToToolTip.change(hse));
		return temp;
	}
	
	public CollegeDao getCollegeDao() {
		return collegeDao;
	}
	
	public void setCollegeDao(CollegeDao collegeDao) {
		this.collegeDao = collegeDao;
	}

}
