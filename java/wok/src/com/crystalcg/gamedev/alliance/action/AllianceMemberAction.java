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
import com.crystalcg.gamedev.alliance.service.AllianceMemberService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
@Controller
public class AllianceMemberAction {
      private static Logger logger = LoggerFactory.getLogger(AllianceMemberAction.class);
      private AllianceMemberService allianceMemberService;
      /**
       * 加入申请列表
     * @return 
       */
      @RequestMapping(value = "/applyAllianceApplication")
  	  @ResponseBody
      public Object applyAllianceApplication(HttpSession session,int allianceId){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  try {
			allianceMemberService.applyAllianceApplication(character.getId(),allianceId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
		return null;
      }
      /**
       * 联盟获取申请成员
       * @return
       */
      @RequestMapping(value = "/getAllAllianceApplication")
  	  @ResponseBody
     public Object getAllAllianceApplication(HttpSession session,int page){
        UserCharacter character = (UserCharacter) session.getAttribute("character");
        if(character == null){
  			logger.error("character = null)");
  			return new ClientError("获取不到角色信息，请重新登录。");
  		}
		try {
			return allianceMemberService.getAllAllianceApplication(character.getId(),page);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
     }
      /**
       * 君主获取申请列表
       * @param session
       * @param page
       * @return
       */
      @RequestMapping(value = "/getAllcharacterApplication")
  	  @ResponseBody
      public Object getAllcharacterApplication(HttpSession session,int page){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	 return allianceMemberService.getCharacterAllianceApplication(character.getId(),page);
      }
      /**
       * 君主同意邀请加入
       * @param session
       * @param allianceId
       * @return
       */
      @RequestMapping(value = "/agreedJoin")
  	  @ResponseBody
      public Object agreedJoin(HttpSession session,int allianceId){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  try {
			allianceMemberService.agreedJoin(character.getId(), allianceId);
			Map<String,Object> retMap = new HashMap<String, Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
      }
      /**
       * 君主拒绝邀请加入
       * @param session
       * @param allianceId
       * @return
       */
      @RequestMapping(value = "/memberRefusedJoin")
  	  @ResponseBody
      public Object memberRefusedJoin(HttpSession session,int allianceId){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  allianceMemberService.memberRefusedJoin(character.getId(), allianceId);
    	  Map<String,Object> retMap = new HashMap<String, Object>();
		  retMap.put("ok", "ok");
		   return retMap;
    	  
      }
      /**
       * 加入成员列表
     * @return 
       */
      @RequestMapping(value = "/joinAllianceMember")
  	  @ResponseBody
      public Object joinAllianceMember(HttpSession session,int memberId){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  try {
			allianceMemberService.joinAllianceMember(character.getId(), memberId);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
      }
      /**
       * 拒绝加入
       * @param session
       * @param memberId
     * @return 
       */
      @RequestMapping(value = "/refusedJoin")
  	  @ResponseBody
      public Object refusedJoin(HttpSession session,int memberId){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  try {
			allianceMemberService.refusedJoin(character.getId(), memberId);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
      }
      
      /**
       * 根据名称查看成员
       * @param memberName
       * @return
       */
      @RequestMapping(value = "/getAllianceMemberByName")
  	  @ResponseBody
      public Object getAllianceMemberByName(String memberName){
    	  try {
			return allianceMemberService.getAllianceMemberByName(memberName);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
      }
      /**
       * 分页查看联盟成员
       * @param allianceId
       * @param page
       * @return
       */
      @RequestMapping(value = "/getAllAllianceMember")
  	  @ResponseBody
      public Object getAllAllianceMember(HttpSession session,int allianceId,int page){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  return allianceMemberService.getAllAllianceMember(character.getId(),allianceId, page);
      }
      /**
       *  成员退出
       * @param session
     * @return 
       */
      @RequestMapping(value = "/quitAlliance")
  	  @ResponseBody
      public Object quitAlliance(HttpSession session){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  try {
			allianceMemberService.quitAlliance(character.getId());
			Map<String,Object> retMap = new HashMap<String, Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
      }
      /**
       * 盟主删除成员
       * @param session
       * @param memberId
       * @return
       */
      @RequestMapping(value = "/deleteAllianceMember")
  	  @ResponseBody
      public Object deleteAllianceMember(HttpSession session, int memberId){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  try {
			allianceMemberService.deleteAllianceMember(character.getId(), memberId);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}  
      }
      /**
       * 盟主禅让
       * @param session
       * @param name
       * @return
       */
      @RequestMapping(value = "/chiefDemise")
  	  @ResponseBody
      public Object chiefDemise(HttpSession session,String name){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
    	  if(character == null){
    			logger.error("character = null)");
    			return new ClientError("获取不到角色信息，请重新登录。");
    		}
    	  try {
			allianceMemberService.chiefDemise(character.getId(), name);
			Map<String,Object> retMap = new HashMap<String,Object>();
			retMap.put("ok", "ok");
			return retMap;
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
      }
      /**
       * 获取联盟事件
     * @return 
       */
      @RequestMapping(value = "/getAllianceEvent")
  	  @ResponseBody
      public Object getAllianceEvent(HttpSession session,int page){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
        	if(character == null){
  			logger.error("character = null)");
  			return new ClientError("获取不到角色信息，请重新登录。");
  		}
			try {
				return allianceMemberService.getAllianceEvent(character.getId(),page);
			} catch (AppException e) {
				return new ClientError(e.getMessage());
			}
      }
//     /**
//      * 禁言
//      * @param session
//     * @return 
//      */
//      @RequestMapping(value = "/closeSpeak")
//  	  @ResponseBody
//      public Object closeSpeak(HttpSession session,int memberId){
//    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
//      	if(character == null){
//			logger.error("character = null)");
//			return new ClientError("获取不到角色信息，请重新登录。");
//		}
//      	try {
//			allianceMemberService.closeSpeak(character.getId(),memberId);
//		} catch (AppException e) {
//			return new ClientError(e.getMessage());
//		}
//		return null;
//      }
      /**
       * 邀请加入
       * @param session
       * @param name
       * @return
       */
      @RequestMapping(value = "/inviteMemberByName")
  	  @ResponseBody
      public Object inviteMemberByName(HttpSession session,String name){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
        	if(character == null){
  			logger.error("character = null)");
  			return new ClientError("获取不到角色信息，请重新登录。");
  		}
        	try {
				allianceMemberService.inviteMemberByName(character.getId(), name);
			} catch (AppException e) {
				return new ClientError(e.getMessage());
			}
			return null;
      }
      /**
       * 官员任免（任免按钮）
       * @param session
       * @param memberId
       * @return
       */
      @RequestMapping(value = "/updatedPost")
  	  @ResponseBody
      public Object updatedPost(HttpSession session,int memberId){
    	  UserCharacter character = (UserCharacter) session.getAttribute("character");
      	if(character == null){
			logger.error("character = null)");
			return new ClientError("获取不到角色信息，请重新登录。");
		}
      	try {
			return allianceMemberService.updatedPost(character.getId(), memberId);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
      }
      /**
       * 任命
       * @param session
       * @param memberId
       * @param position
       * @return
       */
      @RequestMapping(value = "/appointment")
  	  @ResponseBody
      public Object appointment(HttpSession session,int memberId,String position){
    	    UserCharacter character = (UserCharacter) session.getAttribute("character");
      	       if(character == null){
			       logger.error("character = null)");
			   return new ClientError("获取不到角色信息，请重新登录。");
		}
      	    try {
				allianceMemberService.appointment(character.getId(), memberId, position);
				 Map<String,Object> retMap = new HashMap<String,Object>();
					retMap.put("ok", "ok");
					return retMap;
			} catch (AppException e) {
				return new ClientError(e.getMessage());
			}
      }
      
	public AllianceMemberService getAllianceMemberService() {
		return allianceMemberService;
	}

	public void setAllianceMemberService(AllianceMemberService allianceMemberService) {
		this.allianceMemberService = allianceMemberService;
	}
      
}
