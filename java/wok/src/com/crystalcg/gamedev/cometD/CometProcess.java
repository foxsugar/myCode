package com.crystalcg.gamedev.cometD;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cometd.bayeux.server.ServerSession;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battle.service.BattleService;
import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.battleProcess.BattleProcessForMulti;
import com.crystalcg.gamedev.battleProcess.domain.BattleData;
import com.crystalcg.gamedev.battleProcess.domain.MultiBattle;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattle;
import com.crystalcg.gamedev.battleProcess.domain.SingleBattleObject;
import com.crystalcg.gamedev.battleProcess.domain.SoldierForBattle;
import com.crystalcg.gamedev.resource.service.ResourceService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * comet数据处理类
 * @author jinganyang
 *
 */
public class CometProcess {
	private UserComet userComet;
	
	/**
	 * 登录处理
	 * @param remote
	 * @param channelName
	 * @param data
	 * @param messageId
	 */
	public void processLogin(ServerSession remote, String channelName, Map<String, Object> data, String messageId){
		//以后需要删除，登录不需要推送资源
		long characterId = (Long)data.get("characterId");
		GameComet.CLIENT_SESSION_ID_MAP.put(remote.getId(), (int)characterId);
		GameComet.CLIENT_CHARACTER_ID_MAP.put((int)characterId, remote.getId());
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Map<String, Object> resourceData = maincityService.getResourceForComet((int)characterId);
		userComet.publishToGameChannel(Const.GAME_CHANNEL_RESOURCE_UPDATE, (int)characterId, resourceData);
//		getBayeux().getChannel(Const.COMET_CHANNEL_SYSTEM+characterId).publish(getServerSession(),ChangeToMap.changeToCometMap(Const.GAME_CHANNEL_RESOURCE_UPDATE, resourceData),null);
		System.out.println("用户登录:"+GameComet.CLIENT_SESSION_ID_MAP+"    "+"当前玩家:"+GameComet.CLIENT_SESSION_ID_MAP.size());
	}
	
	/**
	 * 对野外势力攻击
	 * @param data
	 * @throws AppException
	 */
	public void battleAttackForSingleBattle(Map<String, Object> data, int characterId) throws AppException{
		BattleProcess battleProcess = (BattleProcess) ServiceLocator.getSpringBean("battleProcess");
		String battleId = String.valueOf(data.get("battleId")); 
		SingleBattle singleBattle = BattleProcess.BATTLE_DATA.get(battleId).getSingleBattle();
		battleProcess.commonAttackOperateForSingle(singleBattle, characterId);
	}
	/**
	 * 对野外势力技能攻击
	 * @param data
	 * @throws AppException
	 */
	public void skillAttackForSingleBattle(Map<String, Object> data, int characterId) throws AppException{
		BattleProcess battleProcess = (BattleProcess) ServiceLocator.getSpringBean("battleProcess");
		long skillIndex = (Long)data.get("skillIndex");
		String battleId = String.valueOf(data.get("battleId")); 
		SingleBattle singleBattle = BattleProcess.BATTLE_DATA.get(battleId).getSingleBattle();
		battleProcess.skillAttackForSingleBattle(singleBattle, (int)skillIndex, characterId);
	}
	/**
	 * 对野外势力自动攻击
	 * @param data
	 * @throws AppException
	 */
	public void battleAutoAttackForSingleBattle(Map<String, Object> data, int characterId) throws AppException{
		BattleProcess battleProcess = (BattleProcess) ServiceLocator.getSpringBean("battleProcess");
		String battleId = String.valueOf(data.get("battleId")); 
		SingleBattle singleBattle = BattleProcess.BATTLE_DATA.get(battleId).getSingleBattle();
		Boolean result = battleProcess.autoAttackForSingleBattle(singleBattle, characterId);
		if(result!=null){
			Map<String, Object> systemData = new HashMap<String,Object>();
			systemData.put("autoAttack", result);
			userComet.deliverToBattleChannel(Const.BATTLE_MESSAGE_TYPE_AUTO_ATTACK, characterId, battleId, systemData);
		}
	}
	public void escapeForSingleBattle(Map<String, Object> data, int characterId) throws AppException{
		String battleId = String.valueOf(data.get("battleId")); 
		SingleBattle singleBattle = BattleProcess.BATTLE_DATA.get(battleId).getSingleBattle();
		BattleProcess battleProcess = (BattleProcess) ServiceLocator.getSpringBean("battleProcess");
		battleProcess.escapeForSingleBattle(singleBattle, characterId);
	}
	public void dropSingleDelay(Map<String, Object> data, int characterId) throws AppException{
		System.out.println("------------------------------------------------------------结束延时");
		BattleProcess battleProcess = (BattleProcess) ServiceLocator.getSpringBean("battleProcess");
		String battleId = String.valueOf(data.get("battleId")); 
		BattleData battleData = BattleProcess.BATTLE_DATA.get(battleId);
		if(battleData==null){
			return;
		}
		SingleBattle singleBattle = BattleProcess.BATTLE_DATA.get(battleId).getSingleBattle();
		if(singleBattle.getDelayStatus()!=SingleBattle.DELAY_STATUS_ACTION&&singleBattle.getDelayStatus()!=SingleBattle.DELAY_STATUS_ROUND_END){
			return;
		}
		SingleBattleObject singleBattleObject = singleBattle.getAuthorityMap().get(characterId);
		if(singleBattleObject!=null){
			singleBattleObject.setReady(true);
		}
		battleProcess.dropSingleDelay(singleBattle);
	}
	/**
	 * 用户下线处理相关
	 * 
	 */
	public void logoutProcess(int characterId){
		//用户掉线对战斗的处理
		battleLogoutProcess(characterId);
		//用户掉线对城郊的处理
		suburbLogoutProcess(characterId);
	}
	private final void battleLogoutProcess(int characterId){
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		List<BattleJobQueue> battleJobQueues = battleService.getBattleQueue(characterId, Const.BATTLE_STATUS_FIGHTING);
		for(BattleJobQueue i :battleJobQueues){
			BattleData battleData = BattleProcess.BATTLE_DATA.get(i.getId());
			if(battleData==null){
				continue;
			}
			if(i.getBattleType()==Const.BATTLE_TYPE_SINGLEBATTLE){
				SingleBattle singleBattle = battleData.getSingleBattle();
				singleBattle.getAuthorityMap().get(characterId).setStatus(Const.FIGHT_STATUS_NOT_IN_BATTLE);
			}else if(i.getBattleType()==Const.BATTLE_TYPE_MULTIBATTLE||i.getBattleType()==Const.BATTLE_TYPE_SENDBATTLE){
				
			}
		}
	}
	private final void suburbLogoutProcess(int characterId){
		if(ResourceService.SUBURB_UI_OPEN_STATUS.get(characterId)!=null){
			ResourceService.SUBURB_UI_OPEN_STATUS.remove(characterId);
		}
	}
	
	/*******************讨伐处理********************************************/
	
//	public void battleAttackForMultiBattle(Map<String, Object> data, int characterId){
//		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
//		long battleId = (Long)data.get("battleId");
//		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get((int)battleId).getMultiBattle();
//		if (!battleProcessForMulti.canAttackForMultiBattle(multiBattle, characterId)) {
//			return;
//		}
//		userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_SELECT, characterId, (int)battleId, changeTarget(battleProcessForMulti.getTargetForCanAttack(multiBattle)));
//	}
//	public void attackTargetForMultiBattle(Map<String, Object> data, int characterId){
//		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
//		long battleId = (Long)data.get("battleId");
//		int locationId = Integer.parseInt((String)data.get("locationId"));
//		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get((int)battleId).getMultiBattle();
//		battleProcessForMulti.commonAttackOperateForMulti(multiBattle, (int)locationId, characterId);
//	}

//	
//	public void battleAutoAttackForMultiBattle(Map<String, Object> data, int characterId) throws AppException{
//		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
//		long battleId = (Long)data.get("battleId"); 
//		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get((int)battleId).getMultiBattle();
//		Boolean result = battleProcessForMulti.autoAttackForSingleBattle(multiBattle, characterId);
//		if(result!=null){
//			Map<String, Object> systemData = new HashMap<String,Object>();
//			systemData.put("autoAttack", result);
//			userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_AUTO_ATTACK, characterId, (int)battleId, systemData);
//		}
//	}
	public void battleDefenceForMultiBattle(Map<String, Object> data, int characterId) throws AppException{
		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
		String battleId = String.valueOf(data.get("battleId")); 
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleId).getMultiBattle();
		battleProcessForMulti.defenceOperateForMulti(multiBattle, characterId);
	}
	public void battleEscapeForMultiBattle(Map<String, Object> data, int characterId) throws AppException{
		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
		String battleId = String.valueOf(data.get("battleId")); 
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleId).getMultiBattle();
		battleProcessForMulti.escapeForMultiBattle(multiBattle, characterId);
	}
//	public void battleSkillForMultiBattle(Map<String, Object> data, int characterId) throws AppException{
//		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
//		long battleId = (Long)data.get("battleId"); 
//		long skillIndex = (Long)data.get("skillIndex"); 
////		int locationId = Integer.parseInt((String)data.get("locationId")); 
//		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get((int)battleId).getMultiBattle();
//		if (!battleProcessForMulti.canAttackForMultiBattle(multiBattle, characterId)) {
//			return;
//		}
//		if (!battleProcessForMulti.validateSkill((int)skillIndex, multiBattle)) {
//			return;
//		}
////		if (!battleProcessForMulti.validateSkillTarget(locationId, skillIndex, multiBattle)) {
////			return;
////		}
//		userComet.deliverToBattleChannel(Const.MULTI_BATTLE_MESSAGE_TYPE_SELECT, characterId, (int)battleId, changeTarget(battleProcessForMulti.getTargetForSkill(multiBattle, (int)skillIndex)));
//	}
//	public void skillAttackForMultiBattle(Map<String, Object> data, int characterId) throws AppException{
//		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
//		long battleId = (Long)data.get("battleId"); 
//		long skillIndex = (Long)data.get("skillIndex"); 
//		int locationId = Integer.parseInt((String)data.get("locationId")); 
//		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get((int)battleId).getMultiBattle();
//		battleProcessForMulti.skillAttack(locationId, (int)skillIndex, multiBattle, characterId);
//	}
	public void dropMultiDelay(Map<String, Object> data, int characterId) throws AppException{
		BattleProcessForMulti battleProcessForMulti = (BattleProcessForMulti) ServiceLocator.getSpringBean("battleProcessForMulti");
		String battleId = String.valueOf(data.get("battleId")); 
		MultiBattle multiBattle = BattleProcess.BATTLE_DATA.get(battleId).getMultiBattle();
		if(multiBattle==null){
			return;
		}
		if(multiBattle.getDelayStatus()!=MultiBattle.DELAY_STATUS_ACTION&&multiBattle.getDelayStatus()!=MultiBattle.DELAY_STATUS_ROUND_READY&&multiBattle.getDelayStatus()!=MultiBattle.DELAY_STATUS_START){
			return;
		}
		List<SoldierForBattle> soldiers = multiBattle.getAuthorityMap().get(characterId);
		if(soldiers!=null){
			battleProcessForMulti.setSoldiersTrue(soldiers);
		}
		battleProcessForMulti.dropMultiDelay(multiBattle);
	}

	public UserComet getUserComet() {
		return userComet;
	}

	public void setUserComet(UserComet userComet) {
		this.userComet = userComet;
	}
}
