package com.crystalcg.gamedev.user.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.dao.CharacterDao;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.CharacterCache;
import com.crystalcg.gamedev.util.cache.CityCache;
import com.crystalcg.gamedev.util.cache.CountryCache;
import com.crystalcg.gamedev.util.cache.ImageResourceCache;
import com.crystalcg.gamedev.util.cache.domain.StaticPic;
import com.crystalcg.gamedev.util.cache.domain.StaticSpeedItem;
import com.crystalcg.gamedev.world.DataEntity;
import com.crystalcg.gamedev.world.WorldDao;

/**
 * 君主表
 * @author xuzhongxing
 *
 */
public class CharacterService {
	private CharacterDao characterDao;
	
	/**
	 * 新建角色时插入君主表数据
	 * @param character
	 */
	public void insertCharacter(UserCharacter character) {
		characterDao.insertCharacter(character);
	}

	/**
	 * 根据ID获取全部君主信息
	 * @param id
	 * @return
	 */
	public UserCharacter getCharacterById(int id) {
		return characterDao.getCharacterById(id);
	}

	/**
	 * 根据名字获取全部君主信息
	 * @param name
	 * @return
	 */
	public UserCharacter getCharacterByName(String name) {
		return characterDao.getCharacterByName(name);
	}

	/**
	 * 根据名字获取君主id
	 * @param name
	 * @return
	 */
	public int getCharacterIdByName(String name){
		return characterDao.getCharacterIdByName(name);
	}
	
	
	/**
	 * 修改君主名
	 * @param characterId
	 * @param name
	 * @throws AppException 
	 */
	public void updateName(int characterId,String name) throws AppException{
		if(characterDao.getCharacterIdByName(name) != 0){
			throw new AppException("君主名已存在");
		}
		characterDao.updateName(characterId,name);
	}
	
	/**
	 * 修改所属国家
	 * @param characterId
	 * @param countryId
	 * @throws AppException 
	 * @throws SQLException 
	 */
	public Map<String,Object> updateCountry(UserCharacter character,int countryId) throws AppException, SQLException{
		if(character.getCountryId() == countryId){
			throw new AppException("你已经在该国家了");
		}
		String countryName = CountryCache.getNameById(countryId);
		if(countryName == null){
			throw new AppException("错误的国家");
		}
		if(character.getAllianceId()!=0){
			throw new AppException("你已经加入联盟，不能更换国家");
		}
		List<DataEntity> dataList = WorldDao.getDataEntityByType(Const.WORLD_CITY_NUSED, countryId);
		List<DataEntity> dataList2 = WorldDao.getDataEntityByType(Const.WORLD_CITY_USED, countryId);
		if(dataList2.size()*100/(dataList.size()+dataList2.size()) > 70){//人满为患
			throw new AppException("该国人满为患，无法迁入");
		}else{
			Map<String,Object> retMap = new HashMap<String,Object>();
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			boolean isSucc = userItemService.useOneItem(Const.COUNTRY_CHANGE, character.getId());
			if(!isSucc){
				throw new AppException("缺少户籍更换令,国家迁入失败");
			}else{
				MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
				DataEntity selectData = dataList.get(new Random().nextInt(dataList.size()));
				//更换土地占有信息
				isSucc = maincityService.changeMap(selectData.getX(), selectData.getY(),character,false);
				if(isSucc){
					characterDao.updateCountry(character.getId(),countryId,countryName);
					character.setCountryId(countryId);
					retMap.put("status", "success");
					retMap.put("msg", "消耗户籍更换令一个,国家迁入成功");
				}
			}
				return retMap;
		}
	}
	
	/**
	 * 修改君主性别
	 * @param characterId
	 * @param gender
	 */
	public void updateGender(int characterId,String gender){
		characterDao.updateGender(characterId,gender);
	}
	
	public Map<String, Object> updateUserImage(UserCharacter character,String imageName) throws AppException{
		Map<String,Object> retMap = new HashMap<String,Object>();
		StaticPic pic =  ImageResourceCache.getPicByName(imageName);
		if(pic == null){
			throw new AppException("不存在该头像");
		}else if(pic.getGender() != character.getGender()){
			throw new AppException("非法参数,性别不符不能使用该头像");
		}else if(pic.getRequirePType() == 1 && character.getVipId() < pic.getRequirePValue()){
			throw new AppException("该头像限于vip"+pic.getRequirePValue()+"级以上使用");
		}else{
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			if(!userItemService.useOneItem(Const.PIC_CHANGE, character.getId())){
				throw new AppException("更换头像失败,你没有足够的易容卡");
			}else{
				updateImage(character.getId(), pic.getName());
				retMap.put("status", "success");
				retMap.put("msg", "消耗道具易容卡一个,更换头像成功");
			}
		}
		
		return retMap;
	}
	
	/**
	 * 修改君主头像
	 * @param characterId
	 * @param image
	 */
	public void updateImage(int characterId,String image){
		characterDao.updateImage(characterId,image);
	}
	
	/**
	 * 修改君主经验
	 * @param characterId
	 * @param addExperience 经验增量
	 */
	public void addExperience(int characterId,int addExperience){
		UserCharacter character = getCharacterById(characterId);
		int experienceLimit = CharacterCache.getExperienceLimitByLevel(character.getLevel());
		if(addExperience+character.getExperience()>=experienceLimit){
			characterDao.updateLevel(characterId,character.getLevel()+1);//升1级
			updateAbilityPoint(characterId,character.getAbilityPoint()+2);//潜能点+2
			updateTechPoint(characterId,character.getTechPoint()+3);//科技点+3
			addExperience(characterId, addExperience-experienceLimit);
			//任务
			QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
			questService.updateQuestSchedule(QuestTargeType.CHARACTER_LEVEL, null, characterId);
		}else{
			characterDao.updateExperience(characterId,addExperience+character.getExperience());
		}
	}
	
	/**
	 * 修改君主元宝
	 * @param characterId
	 * @param cash
	 */
	public void updateCash(int characterId,int cash){
		characterDao.updateCash(characterId, cash);
	}
	
	/**
	 * 修改君主点券
	 * @param characterId
	 * @param ticket
	 */
	public void updateTicket(int characterId,int ticket){
		characterDao.updateTicket(characterId, ticket);
	}
	
	/**
	 * 修改君主潜能点
	 * @param characterId
	 * @param abilityPoint
	 */
	public void updateAbilityPoint(int characterId,int abilityPoint){
		characterDao.updateAbilityPoint(characterId, abilityPoint);
	}
	
	/**
	 * 修改君主科技点
	 * @param characterId
	 * @param i
	 */
	public void updateTechPoint(int characterId, int techPoint) {
		characterDao.updateTechPoint(characterId, techPoint);
	}
	
	/**
	 * 修改君主描述
	 * @param characterId
	 * @param description
	 */
	public void updateDescription(int characterId, String description) {
		characterDao.updateDescription(characterId, description);
	}
	
	/**
	 * 分配潜能点
	 * @param characterId
	 * @param addMilitaryStrength
	 * @param addInternalAffairs
	 * @throws AppException 
	 */
	public void updateAttribute(int characterId, int addMilitaryStrength, int addInternalAffairs) throws AppException {
		UserCharacter character = getCharacterById(characterId);
		if(addMilitaryStrength+addInternalAffairs>character.getAbilityPoint()){
			throw new AppException("没有足够的潜能点");
		}
		if(character.getMilitaryStrength()+addMilitaryStrength<0){
			throw new AppException("没有足够的武力");
		}
		if(character.getInternalAffairs()+addInternalAffairs<0){
			throw new AppException("没有足够的谋略");
		}
		characterDao.updateAttribute(characterId, character.getAbilityPoint()-addMilitaryStrength-addInternalAffairs,
				character.getMilitaryStrength()+addMilitaryStrength, character.getInternalAffairs()+addInternalAffairs);
	}
	
//	public void updateallianceId;
//	public void updatealliancePosition;
//	public void updateallianceReputation;
//	public void updatereputation;

	/**
	 * 君主武力每加1点，消耗1点潜能点
	 * @param characterId
	 */
	public void addMilitaryStrength(int characterId,int num){
		UserCharacter character = getCharacterById(characterId);
		if(character.getAbilityPoint()>=num){
			updateAbilityPoint(characterId, character.getAbilityPoint()-num);
		}
		characterDao.updateMilitaryStrength(characterId,character.getMilitaryStrength()+num);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.ADD_CHARACTER_POINT, null, characterId);
	}
	
	/**
	 * 君主内政每加1，消耗1点潜能点
	 * @param characterId
	 */
	public void addInternalAffairs(int characterId,int num){
		UserCharacter character = getCharacterById(characterId);
		if(character.getAbilityPoint()>=num){
			updateAbilityPoint(characterId, character.getAbilityPoint()-num);
		}
		characterDao.updateInternalAffairs(characterId,character.getMilitaryStrength()+num);
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.ADD_CHARACTER_POINT, null, characterId);
	}
	
//	public void updatestrategyValue;//修改内政策略值
	
	/**
	 * 修改vip等级
	 */
	public void updatevipLevel(){
		
	}
	
	/**
	 * 更新登录时间
	 * @param characterId
	 * @param loginTime
	 */
	public void updateLoginTime(int characterId, Date loginTime){
		characterDao.updateLoginTime(characterId, loginTime);
	}
	/**
	 * 更新登出时间
	 * @param characterId
	 * @param logoutTime
	 */
	public void updateLogoutTime(int characterId, Date logoutTime){
		characterDao.updateLogoutTime(characterId, logoutTime);
	}
////////////////////////联盟////////////////////////////////
     /**
      *  更新联盟、联盟职位
      * @param characterId
      * @param allianceId
      * @param allianceposition
      */
    public void updateAlliance(int characterId,int allianceId,String alliancePosition){
    	characterDao.updateAlliance(characterId, allianceId, alliancePosition);
    }
    /**
     * 获取君主名
     * @param id
     * @return
     */
    public String getCharacterName(int id){
    	return characterDao.getCharacterName(id);
    }
    /**
     * 获取全部君主Id
     * @return
     */
    public List<Integer> getCharacterId(){
    	return characterDao.getCharacterId();
    }
//////////////////////建筑完成时返回经验变化///////////////////
    
    public Map<String,Object> getSimpleUserInfo(int characterId){
    	Map<String,Object> retMap = new HashMap<String, Object>();
    	UserCharacter character = getCharacterById(characterId);
		retMap.put("character", getCharacterViewMap(character));
		//获取主城信息
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(character.getId());
		retMap.put("maincity", getCityViewMap(maincity));
		return retMap;
    }
    
    private Map<String,Object> getCharacterViewMap(UserCharacter character){
		Map<String,Object> characterMap = new HashMap<String,Object>();
		characterMap.put("level", character.getLevel());
		characterMap.put("experience", character.getExperience());
		characterMap.put("experienceLimit",CharacterCache.getExperienceLimitByLevel(character.getLevel()));
		return characterMap;
	}
	
	private Map<String,Object> getCityViewMap(Maincity maincity){
		Map<String,Object> maincityMap = new HashMap<String,Object>();
		maincityMap.put("level", maincity.getLevel());
		maincityMap.put("experience", maincity.getExperience());
		maincityMap.put("experienceLimit", CityCache.getExperienceLimitByLevel(maincity.getLevel()));
		int experienceLimit = CityCache.getExperienceLimitByLevel(maincity.getLevel());
		boolean canLevelup = maincity.getExperience()>=experienceLimit;
		maincityMap.put("canLevelup", canLevelup);
		maincityMap.put("age", CityCache.getAgeByLevel(maincity.getLevel()));//主城的时代
		return maincityMap;
	}	
	
	public CharacterDao getCharacterDao() {
		return characterDao;
	}

	public void setCharacterDao(CharacterDao characterDao) {
		this.characterDao = characterDao;
	}
	/**
	 * 加速模块
	 * @param speedType 加速类型
	 * @param speedFunctionType 加速功能类型
	 * @param characterId 
	 * @param itemNo 加速符编号
	 * @param oldTime 当前所需时间（秒）
	 * @return 返回 -1表示直接完成，其他则表示返回加速缩短时间（秒）
	 * @throws AppException
	 */
	public int saveSpeedNow(int speedType,int speedFunctionType,int characterId,String itemNo,int oldTime) throws AppException{
		UserCharacter character = this.getCharacterById(characterId);
		int money = Const.getNeedMoneyByType(speedFunctionType, oldTime);//根据公式获得所需金锭
		if(speedType == Const.MONEY_GOLD){
			if(character.getCash() < money){
				throw new AppException("国库金锭不足,加速失败.");
			}
			//修改数据库减去金锭
			this.updateCash(characterId, character.getCash() - money);
			return -1;
		}else if(speedType == Const.MONEY_BGOLD){
			if(character.getTicket() < money){
				throw new AppException("国库点券不足,加速失败.");
			}
			//修改数据库减去金锭
			this.updateTicket(characterId, character.getTicket() - money);
			return -1;
		}else{
			Map<String,StaticSpeedItem> itemMap = Const.SPENDITEMMAP.get(speedFunctionType);
			if(itemMap == null){
				throw new AppException("加速符类型错误");
			}
			StaticSpeedItem item = itemMap.get(itemNo);
			if(item == null){
				throw new AppException("加速符不存在");
			}
			UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
			if(!userItemService.useOneItem(itemNo, characterId)){
				throw new AppException("加速符不足,加速失败");
			}
			if(item.getSecond() >= oldTime){
				return -1;
			}else{
				return item.getSecond();
			}
		}
	}
	/**
	 * 是否是同盟(自己对自己是同盟)
	 * @param target 
	 * @param character
	 * @return
	 * @throws AppException 
	 */
	public boolean isAlliance(UserCharacter target,UserCharacter character) throws AppException {
		if(target == null || character == null){
//			throw new AppException("城主不存在");
		}else if(character.getId() == target.getId()){
			return true;
		}else if(character.getAllianceId() != 0 && character.getAllianceId() == target.getAllianceId()){//是否是同盟
			return true;
		}/*else if(true){//是否是联盟
			
		}*/
		return false;
	}
}
