package com.crystalcg.gamedev.buildingFunction.action;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.buildingFunction.service.BarracksService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

/**
 * 兵营
 * @author xuzhongxing
 *
 */
@Controller
public class BarracksAction {
	
	private BarracksService barracksService;
	
	/**
	 * 进入兵营界面：新兵数/上限，统兵数/上限，当前科技兵阶，当前拥有兵数(不包含武将带兵)
	 */
	@RequestMapping(value="/initBarracks")
	@ResponseBody
	public Map<String,Object> initBarracks(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		return barracksService.initBarracks(characterId);
	}
	
	/**
	 * 招募成功：返回新的新兵数量、总兵数量（不改变上限），新增或修改当前拥有兵种,修改资源
	 * 招募失败：没有对应兵种、资源不足、达到上限
	 * @param session
	 * @param soldierNo
	 * @param amount
	 * @return
	 */
	@RequestMapping(value="/recruitSoldier")
	@ResponseBody
	public Object recruitSoldier(HttpSession session,String soldierNo,int amount){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return barracksService.recruitSoldier(characterId, soldierNo, amount);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 遣散成功：返回新的新兵数量、总兵数量（不改变上限），删除或修改当前拥有兵种,修改资源
	 * 遣散失败：没有对应兵种
	 * @param session
	 * @param soldierNo
	 * @param amount
	 * @return
	 */
	@RequestMapping(value="/dismissSoldier")
	@ResponseBody
	public Object dismissSoldier(HttpSession session,String soldierNo,int amount){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return barracksService.dismissSoldier(characterId, soldierNo, amount);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 进阶成功：增加、删除或修改当前拥有兵种,修改资源
	 * 进阶失败：没有对应兵种，资源不足
	 * @param session
	 * @param soldierNo
	 * @param amount
	 * @return
	 */
	@RequestMapping(value="/upgradeSoldier")
	@ResponseBody
	public Object upgradeSoldier(HttpSession session,String soldierNo,int amount){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return barracksService.upgradeSoldier(characterId, soldierNo, amount);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 进阶界面，每个单位消耗的资源
	 * @param soldierNo
	 * @return
	 */
	@RequestMapping(value="/upgradeSoldierResource")
	@ResponseBody
	public Object upgradeSoldierResource(HttpSession session,String soldierNo){
		try {
			return barracksService.upgradeSoldierResource(soldierNo);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 遣散界面，每个单位返回的资源
	 * @param soldierNo
	 * @return
	 */
	@RequestMapping(value="/dismissSoldierResource")
	@ResponseBody
	public Object dismissSoldierResource(HttpSession session,String soldierNo){
		try {
			return barracksService.dismissSoldierResource(soldierNo);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 取消招募
	 * @param session
	 * @param soldierNo
	 * @return
	 */
	@RequestMapping(value="/cancelRecruit")
	@ResponseBody
	public Object cancelRecruit(HttpSession session,String soldierNo){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return barracksService.cancelRecruit(characterId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	
	/**
	 * 训练新兵
	 * @param session
	 * @param soldierNo
	 * @return
	 */
	@RequestMapping(value="/recruitNewSoldier")
	@ResponseBody
	public Object recruitNewSoldier(HttpSession session,int amount){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
		try {
			return barracksService.recruitNewSoldier(characterId, amount);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	/**
	 * 加速练兵
	 * @param session
	 * @param soldierNo
	 * @param confim 操作类型（0：普通弹框，1：确定加速等）
	 * @return
	 * @throws AppException 
	 */
	@RequestMapping(value="/speedTrain")
	@ResponseBody
	public Object speedTrain(HttpSession session,String soliderNo,int speedType,String itemNo,int confim) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		return barracksService.SaveSpeedTrain(soliderNo,speedType,itemNo,character.getId(),confim);
	}
	
	public BarracksService getBarracksService() {
		return barracksService;
	}

	public void setBarracksService(BarracksService barracksService) {
		this.barracksService = barracksService;
	}
	
}
