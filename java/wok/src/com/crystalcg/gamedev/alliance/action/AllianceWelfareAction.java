package com.crystalcg.gamedev.alliance.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.alliance.service.AllianceWelfareService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
@Controller
public class AllianceWelfareAction {
	private static Logger logger = LoggerFactory.getLogger(AllianceWelfareAction.class);
    private AllianceWelfareService allianceWelfareService;
/**
 * 捐献资源
 * @return 
 */
    @RequestMapping(value = "/donatedResources")
	@ResponseBody
    public Object donatedResources(HttpSession session,int money,int food,int wood,int stone,int ironore,int cash){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return allianceWelfareService.donatedResources(character.getId(), money, food, wood, stone, ironore, cash);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 初始化联盟财富
     * @param session
     * @return
     */
    @RequestMapping(value = "/initAllianceWealth")
 	@ResponseBody
    public Object initAllianceWealth(HttpSession session){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return allianceWelfareService.initAllianceWealth(character.getId());
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     *  分页返回财富排行榜
     * @param session
     * @param page
     * @return
     */
    @RequestMapping(value = "/getAllAianceContribute")
	@ResponseBody
    public Object getAllAianceContribute(HttpSession session,int page){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return allianceWelfareService.getAllAianceContribute(character.getId(), page);
    }
    /**
     * 返回联盟兵营信息
     * @param session
     * @return
     */
    @RequestMapping(value = "/getAllianceBarrack")
   	@ResponseBody
    public Object getAllianceBarrack(HttpSession session){
     	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return allianceWelfareService.getAllianceBarrack(character.getId());
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 根据兵种编号前缀返回兵种
     * @param session
     * @param soldierNo
     * @return
     */
    @RequestMapping(value = "/getAllianceBarrackBySoldierNo")
   	@ResponseBody
    public Object getAllianceBarrackBySoldierNo(HttpSession session,String soldierNo,int page){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return allianceWelfareService.getAllianceBarrackBySoldierNo(character.getId(), soldierNo,page);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 捐献士兵
     * @param session
     * @param soidierName
     * @param amount
     * @return
     */
    @RequestMapping(value = "/donatedSoidier")
   	@ResponseBody
    public Object donatedSoidier(HttpSession session,String soldierNo,int amount,int wealth){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character==null){
    		logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
    	}
    	try {
			allianceWelfareService.donatedSoidier(character.getId(), soldierNo, amount,wealth);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 提取士兵
     * @param session
     * @param soldierNo
     * @param amount
     * @return
     */
    @RequestMapping(value = "/extractSoldiers")
   	@ResponseBody
    public Object extractSoldiers(HttpSession session,String soldierNo,int amount,int wealth){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character==null){
    		logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
    	}
    	try {
			allianceWelfareService.extractSoldiers(character.getId(), soldierNo, amount,wealth);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 遣散士兵
     * @param session
     * @param soldierNo
     * @param amount
     * @return
     */
    @RequestMapping(value = "/disbandAllianceSolier")
   	@ResponseBody
    public Object disbandAllianceSolier(HttpSession session,String soldierNo,int amount,int wealth){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character==null){
    		logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
    	}
    	try {
			allianceWelfareService.disbandAllianceSolier(character.getId(), soldierNo, amount,wealth);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
 
    /**
     * 提取设置
     * @return 
     */
    @RequestMapping(value = "/retrievalSetting")
   	@ResponseBody
    public Object retrievalSetting(HttpSession session,String alliancePosition,int amount){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character==null){
    		logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
    	}
    	try {
			allianceWelfareService.retrievalSetting(character.getId(), alliancePosition,amount);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 初始化联盟科技
     * @param session
     * @return
     */
    @RequestMapping(value = "/initAllianceTechology")
   	@ResponseBody
    public Object initAllianceTechology(HttpSession session) {
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	
		try {
			return allianceWelfareService.initAllianceTechology(character.getId());
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
  /**
   * 升级联盟科技
   * @param session
   * @param gbulidingno
   * @return
   */
    @RequestMapping(value = "/upgradeAllianceTechnology")
   	@ResponseBody
    public Object upgradeAllianceTechnology(HttpSession session,String gbulidingno){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character==null){
    		logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
    	}
    	try {
    		return allianceWelfareService.upgradeAllianceTechnology(character.getId(), gbulidingno);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}	
    }
    /**
     * 查看联盟福利
     * @param session
     * @return
     */
//    @RequestMapping(value = "/getAllianceWelfare")
//   	@ResponseBody
//    public Object getAllianceWelfare(HttpSession session){
//    	UserCharacter character = (UserCharacter) session.getAttribute("character");
//    	try {
//			return allianceWelfareService.getAllianceWelfare(character.getId());
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//    }
    /**
     * 发放俸禄
     * @param session
     * @return
     */
//    @RequestMapping(value = "/grantSalary")
//   	@ResponseBody
//    public Object grantSalary(HttpSession session){
//    	UserCharacter character = (UserCharacter) session.getAttribute("character");
//    	if(character==null){
//    		logger.error("character = null)");
//			return new ClientError("获取不到角色信息，请重新登录。");
//    	}
//    	try {
//			return allianceWelfareService.grantSalary(character.getId());
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//    }
    /**
     * 领取俸禄
     * @param session
     * @param num
     * @return
     */
    @RequestMapping(value = "/receiveSalary")
   	@ResponseBody
    public Object receiveSalary(HttpSession session,int num){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character==null){
    		logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
    	}
    	try {
			allianceWelfareService.receiveSalary(character.getId(), num);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     *  联盟市场
     * @param session
     * @return
     */
    @RequestMapping(value = "/getAllianceShoping")
   	@ResponseBody
    public Object getAllianceShoping(HttpSession session,int page){
     	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character==null){
    		logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
    	}
    	try {
			return allianceWelfareService.getAllianceShoping(character.getId(),page);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 联盟市场购买物品
     * @param session
     * @param itemNo
     * @return
     */
    @RequestMapping(value = "/allianceShopingbuyItem")
   	@ResponseBody
    public Object allianceShopingbuyItem(HttpSession session,String itemNo){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character==null){
    		logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
    	}
    	try {
			allianceWelfareService.buyItem(character.getId(), itemNo);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
	public AllianceWelfareService getAllianceWelfareService() {
		return allianceWelfareService;
	}
	public void setAllianceWelfareService(AllianceWelfareService allianceWelfareService) {
		this.allianceWelfareService = allianceWelfareService;
	}
    
}
