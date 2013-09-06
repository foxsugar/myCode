package com.crystalcg.gamedev.user.action;

import java.sql.SQLException;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.MaincityService;

/**
 * 只用于测试
 * @author xuzhongxing
 *
 */
@Controller
@RequestMapping(value="maincity")
public class MaincityAction {
	
	private MaincityService maincityService;
	
	/**
	 * 获取主城基本信息和全部资源及上限
	 */
	@RequestMapping(value="getBaseInfo")
	public Maincity getBaseAndResource(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return maincityService.getMaincity(characterId);
	}

	/**
	 * 获取全部资源和上限
	 */
	@RequestMapping(value="getResource")
	public Maincity getResource(int characterId){
		return maincityService.getMaincity(characterId);
	}
	
	/**
	 * 获取建筑所需4种资源
	 */
	@RequestMapping(value="getBuildResource")
	public Maincity getBuildResource(int characterId){
		return maincityService.getMaincity(characterId);
	}
	
	/**
	 * 更新建筑资源
	 */
	@RequestMapping(value="updateBuildResource")
	public void updateBuildResource(int characterId,int money,int wood,int stone,int ironore){
		maincityService.updateBuildResource(characterId, money, wood, stone, ironore);
	}
	
	/**
	 * 更新城郊资源
	 */
	@RequestMapping(value="updateSuburbsResource")
	public void updateSuburbsResource(int characterId,int food,int wood,int stone,int ironore){
		maincityService.updateSuburbsResource(characterId, food, wood, stone, ironore);
	}
	
	/**
	 * 更新繁荣度，或者提升等级,如果等级提升，推送消息
	 */
	@Deprecated
	public void updateExperience(int characterId,int changeExp){
		////////////////
		//添加判断
//		maincityService.updateExperience(characterId, changeExp);
	}
	
	/**
	 * 更新状态
	 */
	@RequestMapping(value="updateStatus")
	public void updateStatus(int characterId,int status){
		maincityService.updateStatus(characterId, status);
	}
	
	/**
	 * 更新坐标,包括使用道具，更新世界信息 该算法写在世界操作中
	 */
	@RequestMapping(value="updateCoordinate")
	public void updateCoordinate(int characterId,int x,int y){
		maincityService.updateCoordinate(characterId, x, y);
	}
	
	/**
	 * 更新铜币
	 */
	@RequestMapping(value="updateMoney")
	public void updateMoney(int characterId,int money){
		maincityService.updateMoney(characterId, money,null);
	}
	
	/**
	 * 更新粮食
	 */
	@RequestMapping(value="updateFood")
	public void updateFood(int characterId,int food){
		maincityService.updateFood(characterId, food);
	}
	
	/**
	 * 更新木材
	 */
	@RequestMapping(value="updateWood")
	public void updateWood(int characterId,int wood){
		maincityService.updateWood(characterId, wood);
	}
	
	/**
	 * 更新石料
	 */
	@RequestMapping(value="updateStone")
	public void updateStone(int characterId,int stone){
		maincityService.updateStone(characterId, stone);
	}
	
	/**
	 * 更新铁锭
	 */
	@RequestMapping(value="updateIronore")
	public void updateIronore(int characterId,int ironore){
		maincityService.updateIronore(characterId, ironore);
	}
	
	/**
	 * 更新铜币上限，太尉府等级改变之后调用
	 */
	@RequestMapping(value="updateMoneyLimit")
	public void updateMoneyLimit(int characterId,int moneyLimit){
		maincityService.updateMoneyLimit(characterId, moneyLimit);
	}
	
	/**
	 * 更新除铜币外的资源上限，国库等级改变之后更新
	 */
	@RequestMapping(value="updateResourceLimit")
	public void updateResourceLimit(int characterId,int foodLimit,int woodLimit,int stoneLimit,int ironoreLimit){
		maincityService.updateResourceLimit(characterId, foodLimit, woodLimit, stoneLimit, ironoreLimit);
	}
	
	/**
	 * 获取空闲人口
	 */
	@RequestMapping(value="getFreePeople")
	public Maincity getFreePeople(int characterId){
		return maincityService.getMaincity(characterId);
	}
	
	/**
	 * 获取人口信息，工作人口，总人口，人口上限
	 */
	@RequestMapping(value="getPeopleInfo")
	public Maincity getPeopleInfo(int characterId){
		return maincityService.getMaincity(characterId);
	}
	
	/**
	 * 更新工作人口
	 */
	@RequestMapping(value="updateWorkingPeople")
	public void updateWorkingPeople(int characterId,int workingPeople){
		maincityService.updateWorkingPeople(characterId, workingPeople);
	}
	
	/**
	 * 更新人口
	 */
	@RequestMapping(value="updatePeople")
	public void updatePeople(int characterId,int people){
		maincityService.updatePeople(characterId, people);
	}
	/**
	 *  增加人口
	 * @param speedType 加速方式、钱还是道具
	 * @param itemNo
	 * @param confim
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="addPeople")
	@ResponseBody
	public Object addPeople(HttpSession session,int speedType,String itemNo,int confim) throws AppException{
		int characterId = ((UserCharacter) session.getAttribute("character")).getId();
		return maincityService.addPeople(characterId, speedType,itemNo,confim);
	}
	/**
	 *  增加民心
	 * @param speedType 加速方式、钱还是道具
	 * @param itemNo
	 * @param confim
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="addPopularSupport")
	@ResponseBody
	public Object addPopularSupport(HttpSession session,int speedType,String itemNo,int confim) throws AppException{
		int characterId = ((UserCharacter) session.getAttribute("character")).getId();
		return maincityService.addPopularSupport(characterId, speedType,itemNo,confim);
	}
	
	/**
	 * 获取兵种信息：新兵/上限，总兵/上限
	 */
	@RequestMapping(value="getSoldierInfo")
	public Maincity getSoldierInfo(int characterId){
		return maincityService.getMaincity(characterId);
	}
	
	/**
	 * 更新新兵数量
	 */
	@RequestMapping(value="updateNewSoldier")
	public void updateNewSoldier(int characterId,int newSoldier){
		maincityService.updateNewSoldier(characterId, newSoldier);
	}
	
	/**
	 * 更新总兵数量 
	 */
	@RequestMapping(value="updateSoldier")
	public void updateSoldier(int characterId,int soldier){
		maincityService.updateSoldier(characterId, soldier);
	}
	
	/**
	 *  更新新兵上限，总兵上限 受兵营等级数量控制
	 */
	@RequestMapping(value="updateSoldierLimit")
	public void updateSoldierLimit(int characterId,int soldierLimit){
		maincityService.updateSoldierLimit(characterId,soldierLimit);
	}
	
	/**
	 * 获取膏药信息 数量/上限
	 */
	@RequestMapping(value="getMedicineInfo")
	public Maincity getMedicineInfo(int characterId){
		return maincityService.getMaincity(characterId);
	}
	
	/**
	 * 更新膏药数量
	 */
	@RequestMapping(value="updateMedicine")
	public void updateMedicine(int characterId,int medicine){
		maincityService.updateMedicine(characterId, medicine);
	}
	
	/**
	 * 更新膏药上限
	 */
	@RequestMapping(value="updateMedicineLimit")
	public void updateMedicineLimit(int characterId,int medicineLimit){
		maincityService.updateMedicineLimit(characterId, medicineLimit);
	}
	
	/**
	 * 更新民心
	 */
	@RequestMapping(value="updatePopularSupport")
	public void updatePopularSupport(int characterId,int popularSupport){
		maincityService.updatePopularSupport(characterId, popularSupport);
	}
	/**
	 *迁城
	 * @return 
	 * @throws AppException 
	 * @throws SQLException 
	 */
	@RequestMapping(value="moveCity")
	public @ResponseBody Object moveCity(HttpSession session,int x,int y) throws AppException, SQLException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		return maincityService.saveMoveCity(character,x,y);
	}
	/**
	 *迁城
	 * @throws AppException 
	 * @throws SQLException 
	 */
	@RequestMapping(value="moveRandomCity")
	public @ResponseBody Object moveRandomCity(HttpSession session) throws AppException, SQLException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("该账号已掉线，请重新登录");
		}
		return maincityService.saveMoveCity(character);
	}
	
	public MaincityService getMaincityService() {
		return maincityService;
	}

	public void setMaincityService(MaincityService maincityService) {
		this.maincityService = maincityService;
	}
}
