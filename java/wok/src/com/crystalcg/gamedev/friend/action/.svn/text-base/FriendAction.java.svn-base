package com.crystalcg.gamedev.friend.action;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.friend.service.FriendService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
@Controller
public class FriendAction {
	private FriendService friendService;
	private static final int DEFAULT_PAGE = 1;

	@RequestMapping(value="addFriendList")
	public @ResponseBody Map<String, Object> addFriendList(HttpSession session, String friendName) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.addFriendList(character.getId(), friendName);
	}
	@RequestMapping(value="addFriendListForOk")
	public @ResponseBody Map<String, Object> addFriendListForOk(HttpSession session, String friendName) throws AppException{
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.addFriendListForOk(character.getId(), friendName);
	}
	@RequestMapping(value="getFriendListDefault")
	public @ResponseBody Map<String, Object> getFriendListDefault(HttpSession session){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.getFriendList(character.getId(), DEFAULT_PAGE);
	}
	@RequestMapping(value="getFriendListByPage")
	public @ResponseBody Map<String, Object> getFriendListByPage(HttpSession session, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.getFriendList(character.getId(), page);
	}
	@RequestMapping(value="agreeFriend")
	public @ResponseBody Map<String, Object> agreeFriend(HttpSession session, int id, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.agreeFriend(id, character.getId(),page);
	}
	@RequestMapping(value="agreeFriendForOk")
	public @ResponseBody Map<String, Object> agreeFriendForOk(HttpSession session, int id, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.agreeFriendForOk(id, character.getId(),page);
	}
	@RequestMapping(value="refuseFriend")
	public @ResponseBody Map<String, Object> refuseFriend(HttpSession session, int id, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.refuseFriend(id, character.getId(),page);
	}
	@RequestMapping(value="getFriendsDefault")
	public @ResponseBody Map<String, Object> getFriendsDefault(HttpSession session){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.getFriends(character.getId(), DEFAULT_PAGE,FriendService.NO_SELECTED);
	}
	@RequestMapping(value="getFriendsByPage")
	public @ResponseBody Map<String, Object> getFriendsByPage(HttpSession session, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.getFriends(character.getId(), page,FriendService.NO_SELECTED);
	}
	@RequestMapping(value="selectFriend")
	public @ResponseBody Object selectFriend(HttpSession session, String name){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.selectFriend(character.getId(), name);
	}
	@RequestMapping(value="deleteFriend")
	public @ResponseBody Map<String, Object> deleteFriend(HttpSession session, int id, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.deleteFriend(id, character.getId(), page);
	}
	
	
	
	@RequestMapping(value="addEnemy")
	public @ResponseBody Map<String, Object> addEnemy(HttpSession session, String enemyName){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.addEnemy(character.getId(), enemyName);
	}
	@RequestMapping(value="addEnemyForOk")
	public @ResponseBody Map<String, Object> addEnemyForOk(HttpSession session, String enemyName){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.addEnemyForOk(character.getId(), enemyName);
	}
	@RequestMapping(value="selectEnemy")
	public @ResponseBody Object selectEnemy(HttpSession session, String enemyName){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.selectEnemy(character.getId(), enemyName);
	}
	@RequestMapping(value="deleteEnemy")
	public @ResponseBody Object deleteEnemy(HttpSession session, int id, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.deleteEnemy(id, character.getId(), page);
	}
	@RequestMapping(value="getEnemyDefault")
	public @ResponseBody Object getEnemyDefault(HttpSession session){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.getEnemy(character.getId(), DEFAULT_PAGE,FriendService.NO_SELECTED);
	}
	@RequestMapping(value="getEnemyByPage")
	public @ResponseBody Object getEnemyByPage(HttpSession session, int page){
		UserCharacter character = (UserCharacter)session.getAttribute("character");
		return friendService.getEnemy(character.getId(), page,FriendService.NO_SELECTED);
	}
	
	
	public FriendService getFriendService() {
		return friendService;
	}

	public void setFriendService(FriendService friendService) {
		this.friendService = friendService;
	}
}
