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
import com.crystalcg.gamedev.alliance.service.AllianceService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
@Controller
public class AllianceAction {
	private static Logger logger = LoggerFactory.getLogger(AllianceAction.class);
    private AllianceService allianceService;
    /**
     * 创建联盟
     * @param session
     * @return
     */
    @RequestMapping(value = "/createAlliance")
	@ResponseBody
    public Object createAlliance(HttpSession session,String name,String banner,String introduction){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			allianceService.createAlliance(character.getId(),name,banner,introduction);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 获取君主的联盟
     * @param session
     * @return
     */
    @RequestMapping(value = "/initCharacterAlliance")
	@ResponseBody
    public Object initCharacterAlliance(HttpSession session){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return allianceService.initCharacterAlliance(character.getId());
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 根据名称查询联盟
     * @return
     */
    @RequestMapping(value = "/getAllAllianceByName")
	@ResponseBody
    public Object getAllAllianceByName(String name){
		 try {
			return allianceService.getAllAllianceByName(name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 查询全部联盟
     * @param page
     * @return
     */
    @RequestMapping(value = "/getAllAlliance")
	@ResponseBody
    public Object getAllAlliance(int page){
    	return allianceService.getAllAlliance(page);
    }
    /**
     * 解散联盟（解散按钮）
     * @param session
     * @return
     */
    @RequestMapping(value = "/removeAlliance")
   	@ResponseBody
    public Object removeAlliance(HttpSession session){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return allianceService.removeAlliance(character.getId());
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 确认解散联盟
     * @param session
     * @param allianceId
     * @return
     */
    @RequestMapping(value = "/disbandAlliance")
	@ResponseBody
    public Object disbandAlliance(HttpSession session){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
    		Map<String,Object> retMap = new HashMap<String, Object>();
    		allianceService.disbandAlliance(character.getId());
    	    retMap.put("ok", "ok");
    	    return retMap;
		} catch (AppException e){
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 取消解散
     * @param session
     * @param allianceId
     * @return
     */
    @RequestMapping(value = "/removedisbandAlliance")
	@ResponseBody
    public Object removedisbandAlliance(HttpSession session){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			allianceService.removedisbandAlliance(character.getId());
			Map<String,Object> retMap = new HashMap<String, Object>();
    	    retMap.put("ok", "ok");
    	    return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 返回联盟公告，介绍（修改信息按钮）
     * @param session
     * @return
     */
    @RequestMapping(value = "/getAllianceInfo")
   	@ResponseBody
    public Object getAllianceInfo(HttpSession session){
       	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return allianceService.getAllianceInfo(character.getId());
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
	 * 保存修改信息
     * @return 
	 */
    @RequestMapping(value = "/changeAllianceInfo")
	@ResponseBody
    public Object changeAllianceInfo(HttpSession session, String introduction,String bulletin){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			allianceService.changeAllianceInfo(character.getId(), introduction, bulletin);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 联盟升级信息
     * @return 
     */
    @RequestMapping(value = "/allianceUpgradeInfo")
	@ResponseBody
    public Object allianceUpgradeInfo(HttpSession session){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return allianceService.allianceUpgradeInfo(character.getId());
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 联盟升级
     * @param session
     * @return 
     */
    @RequestMapping(value = "/allianceUpgrade")
	@ResponseBody
    public Object allianceUpgrade(HttpSession session){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			 allianceService.allianceUpgrade(character.getId());
			 Map<String,Object> retMap = new HashMap<String,Object>();
				retMap.put("ok", "ok");
				return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 解散联盟的时候调用
     * 该接口查看是否还存在该联盟（只限此用）
     * @param session
     * @return
     */
    @RequestMapping(value = "/isStatus")
  	@ResponseBody
    public Object isStatus(HttpSession session){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return allianceService.isStatus(character.getAllianceId());
    }
    /**
     * 根据国家名分页返回
     * @param country
     * @param page
     * @return
     */
    @RequestMapping(value = "/getAllianceByCountry")
	@ResponseBody
    public Map<String, Object> getAllianceByCountry(String countryName,int page){
    	return allianceService.getAllianceByCountry(countryName, page);
    }
//    /**
//     * 申请结盟
//     * @param session
//     * @param allyAllianceId
//     * @return
//     */
//    @RequestMapping(value = "/allianceApplication")
//   	@ResponseBody
//   public Object allianceApplication(HttpSession session,int allyAllianceId){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//    	if(character == null){
//			logger.error("character = null)");
//			return new ClientError("获取不到角色信息，请重新登录。");
//		}
//    	try {
//			allianceService.allianceApplication(character.getId(), allyAllianceId);
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//		return null;
//   }
//    /**
//     * 分页查询联盟申请表.
//     * @param session
//     * @param page
//     * @return
//     */
//    @RequestMapping(value = "/getAllAllianceAllyApply")
//   	@ResponseBody
//    public Object getAllAllianceAllyApply(HttpSession session,int page){
//    	UserCharacter character = (UserCharacter) session.getAttribute("character");
//    	if(character == null){
//			logger.error("character = null)");
//			return new ClientError("获取不到角色信息，请重新登录。");
//		}
//    	return allianceService.getAllAllianceAllyApply(character.getId(), page);
//    }
//    /**
//     * 接受申请
//     * @param session
//     * @param friendId
//     * @return
//     */
//    @RequestMapping(value = "/acceptingApplication")
//   	@ResponseBody
//    public Object acceptingApplication(HttpSession session,int friendId){
//    	UserCharacter character = (UserCharacter) session.getAttribute("character");
//    	if(character == null){
//			logger.error("character = null)");
//			return new ClientError("获取不到角色信息，请重新登录。");
//		}
//    	try {
//			allianceService.acceptingApplication(character.getId(), friendId);
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//		return null;
//    }
//    /**
//     * 拒绝申请
//     * @param session
//     * @param friendId
//     * @return
//     */
//    @RequestMapping(value = "/refuseApplication")
//   	@ResponseBody
//    public Object refuseApplication(HttpSession session,int friendId){
//    	UserCharacter character = (UserCharacter) session.getAttribute("character");
//    	if(character == null){
//			logger.error("character = null)");
//			return new ClientError("获取不到角色信息，请重新登录。");
//		}
//    	try {
//			allianceService.refuseApplication(character.getId(), friendId);
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//		return null;
//    }
	public AllianceService getAllianceService() {
		return allianceService;
	}
	public void setAllianceService(AllianceService allianceService) {
		this.allianceService = allianceService;
	}
	
    
}
