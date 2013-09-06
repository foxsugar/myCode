package com.crystalcg.gamedev.ranking.action;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.ranking.service.RankingService;
import com.crystalcg.gamedev.user.domain.UserCharacter;

@Controller
public class RankingAction {
	private RankingService rankingService;
	/**
	 *  查看建设排行
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getBuildList")
	@ResponseBody
	public Object getBuildList(HttpSession session,int page){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。"); 
		}
		return rankingService.getBuildList(page);
	}
	/**
	 *  查看君主等级排行
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getLevelList")
	@ResponseBody
	public Object getLevelList(HttpSession session,int page){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getLevelList(page);
	}
	/**
	 * 查看声望排行
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getReputationList")
	@ResponseBody
	public Object getReputationList(HttpSession session,int page){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getReputationList(page);
	}
	/**
	 * 查看战力排行
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getFightingList")
	@ResponseBody
	public Object getFightingList(HttpSession session,int page){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getFightingList(page);
	}
	/**
	 * 查看充值排行
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getRechargeList")
	@ResponseBody
	public Object getRechargeList(HttpSession session,int page){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getRechargeList(page);
	}
	/**
	 * 查看联盟排行
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getAllianceList")
	@ResponseBody
	public Object getAllianceList(HttpSession session,int page){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getAllianceList(page);
	}
	/**
	 * 查看武将排行
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getAllHeroList")
	@ResponseBody
	public Object getAllHeroList(HttpSession session,int page){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getHeroList(page);
	}
	/**
	 * 查看我的充值排行
	 * @param session
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getRechargeMap")
	@ResponseBody
	public Object getRechargeMap(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getRechargeMap(character.getId());
	}
	/**
	 * 查看我的声望排行
	 * @param session
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getReputation")
	@ResponseBody
	public Object getReputation(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getReputation(character.getId());
	}
	/**
	 * 查看我的战力排行
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/getfightingMap")
	@ResponseBody
	public Object getfightingMap(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getFightingMap(character.getId());
	}
	/**
	 * 查看我的等级排行
	 * @param session
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getLevelMap")
	@ResponseBody
	public Object getLevelMap(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getLevelMap(character.getId());
	}
	/**
	 * 查看我的建设值排行
	 * @param session
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getBuildMap")
	@ResponseBody
	public Object getBuildMap(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	return rankingService.getBuildMap(character.getId());
	}
	/**
	 * 查看我的联盟排行
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/getAllianceMap")
	@ResponseBody
	public Object getAllianceMap(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	if(character.getAllianceId()==0){
    		return new ClientError("没有该联盟");
    	}
    	return rankingService.getAllianceMap(character.getAllianceId());
	}
	/**
	 * 查看我的武将排行
	 * @param session
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getAllUserHeroMap")
	@ResponseBody
    public Object getAllUserHeroMap(HttpSession session,int page){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return rankingService.getHeroMap(character.getId(), page);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
	/**
	 * 根据名称查找充值排行
	 * @param session
	 * @param name
	 * @return
	 */
	@RequestMapping(value = "/getRechargeByName")
	@ResponseBody
    public Object getRechargeByName(HttpSession session,String name){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return rankingService.getRechargeByName(name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 根据名称查找建设排行
     * @param session
     * @param name
     * @return
     */
	@RequestMapping(value = "/getBuildByName")
	@ResponseBody
    public Object getBuildByName(HttpSession session,String name){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return rankingService.getBuildByName(name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 根据名称查找等级排行
     * @param session
     * @param name
     * @return
     */
	@RequestMapping(value = "/getLevelByName")
	@ResponseBody
    public Object getLevelByName(HttpSession session,String name){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return rankingService.getLevelByName(name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
    /**
     * 根据名称查找声望排行
     * @param session
     * @param name
     * @return
     */
	@RequestMapping(value = "/getReputationByName")
	@ResponseBody
    public Object getReputationByName(HttpSession session,String name){
    	UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return rankingService.getReputationByName(name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
    }
	/**
	 * 根据名称查看战力排行
	 * @param session
	 * @param name
	 * @return
	 */
	@RequestMapping(value = "/getFightingByName")
	@ResponseBody
	public Object getFightingByName(HttpSession session,String name){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return rankingService.getFightingByName(name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	/**
	 * 根据名称查看联盟排行
	 * @param session
	 * @param name
	 * @return
	 */
	@RequestMapping(value = "/getAllianceByName")
	@ResponseBody
	public Object getAllianceByName(HttpSession session,String name){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return rankingService.getAllianceByName(name);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	/**
	 * 根据君主名称查看武将排行
	 * @param session
	 * @param name
	 * @param page
	 * @return
	 */
	@RequestMapping(value = "/getAllHeroByName")
	@ResponseBody
	public Object getAllHeroByName(HttpSession session,String name,int page){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
    	if(character == null){
			return new ClientError("获取不到角色信息，请重新登录。");
		}
    	try {
			return rankingService.getAllHeroByName(name, page);
		} catch (AppException e) {
			return new ClientError(e.getMessage());
		}
	}
	public RankingService getRankingService() {
		return rankingService;
	}

	public void setRankingService(RankingService rankingService) {
		this.rankingService = rankingService;
	}
	
}
