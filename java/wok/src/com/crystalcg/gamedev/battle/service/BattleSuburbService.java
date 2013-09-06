package com.crystalcg.gamedev.battle.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.battle.domain.BattleJobQueue;
import com.crystalcg.gamedev.battleProcess.BattleProcess;
import com.crystalcg.gamedev.buildingFunction.domain.UserWallHero;
import com.crystalcg.gamedev.buildingFunction.service.WallDefensenService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;

public class BattleSuburbService {
	/*******************获取城郊军情
	 * @throws AppException ********************************/
	public Map<String, Object> initSuburbBattleInfo(int targetId,int characterId) throws AppException{
		BattleProcess.resetSuburbBattleBackTime(targetId);//处理倒计时踢人情况
		Map<String, Object> retMap = new HashMap<String,Object>();
		List<BattleJobQueue> defence = BattleProcess.getBattleJobQueueByType(targetId, Const.BATTLE_CAMP_FRIEND);//友军
		List<BattleJobQueue> attack = BattleProcess.getBattleJobQueueByType(targetId, Const.BATTLE_CAMP_ENEMY);;//敌人
		
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		UserCharacter target = characterService.getCharacterById(targetId);
		UserCharacter character = characterService.getCharacterById(characterId);
		boolean isFriend = characterService.isAlliance(target, character);
		List<Integer> limitList = this.getLimit(targetId,characterId,defence);//权限集合
		retMap.put("defence", changeToBattleMap(defence,limitList,characterId,isFriend == true,true));//友军
		retMap.put("attack", changeToBattleMap(attack,limitList,characterId,isFriend == false,false));//敌人
		retMap.put("character", changeToCharacterMap(target,defence,characterId,limitList,isFriend==true,true));//城主
		return retMap;
	}
	/**
	 * 城郊君主信息
	 * @param target 目标君主
	 * @param defence 
	 * @param characterId 自身君主id
	 * @param limitList
	 * @return
	 */
	private Object changeToCharacterMap(UserCharacter target, List<BattleJobQueue> defence, int characterId, List<Integer> limitList,boolean isAlliance, boolean isFriend) {
		if(target.getId() == characterId){
			isFriend = true;
			isAlliance = true;
		}
		Map<String,Object> temp = new HashMap<String,Object>();
		List<Integer> limit = new ArrayList<Integer>();
		temp.put("id", -target.getId());
		temp.put("characterName", target.getName());
		temp.put("order", 1);
		temp.put("isFriend", isFriend);//自己与被围攻君主的关系
		temp.put("isAlliance", isAlliance);//自己与所看部队的君主的关系
		WallDefensenService wallDefensenService = (WallDefensenService)ServiceLocator.getSpringBean("walldefService");
		UserWallHero wallHero = wallDefensenService.getBaseWallHero(target.getId());
		if(wallHero == null){
			temp.put("forceAmount", 0);
			temp.put("teamAmount", 0);
		}else{
			temp.put("forceAmount", wallHero.getWallCombat());
			temp.put("teamAmount", getTeamAmount(wallHero.getHeroId()));
		}
		limit.add(Const.CANLOOK);
		if(characterId != target.getId()){
			if(defence.isEmpty()){
				if(limitList.contains(Const.CANATTACK)){
					limit.add(Const.CANATTACK);
				}
			}
		}
//		limit.add(Const.CANAFFAIRS);
		temp.put("limit", limit);//操作权限集合
		if(BattleProcess.isFightingBybattleId(-target.getId())){
			temp.put("status", "战斗中");//队伍状态
		}else{
			temp.put("status", "待战中");//队伍状态
		}
		return temp;
	}
	/**
	 * 根据友军和敌军情况返回本军在该城郊的可操作权限集合
	 * 1：可以查看,2:可以进攻,3:可以撤退
	 * @param targetId 目标城主（事件中心城主）ID
	 * @param characterId 玩家自身id
	 * @param friends
	 * @param attack
	 * @param battleService 
	 * @return
	 * @throws AppException 
	 */
	public List<Integer> getLimit(int targetId, int characterId, List<BattleJobQueue> friends) throws AppException {
		BattleService battleService = (BattleService)ServiceLocator.getSpringBean("battleService");
		List<Integer> limitList = new ArrayList<Integer>();
		if(targetId == characterId){
			limitList.add(Const.CANLOOK);
			if(friends.isEmpty()){
				limitList.add(Const.CANATTACK);
			}
//			limitList.add(Const.CANAFFAIRS);
		}else{
			//自己的第一支队伍有没有进入城郊
			List<BattleJobQueue> battleList = battleService.getBattleByCidAndTargetId(targetId, characterId, -1);
			if(battleList.isEmpty()){
				throw new AppException("你没有军队到达，暂时没有权限查看城郊情况");
			}else if(battleList.get(0).getStatus() >= Const.BATTLE_STATUS_WAIT_FIGHT){
				limitList.add(Const.CANLOOK);
				limitList.add(Const.CANBACK);
				limitList.add(Const.CANATTACK);
			}else {
				limitList.add(Const.CANLOOK);
			}
		}
		return limitList;
	}
	/**
	 * 
	 * @param friend 军队队列
	 * @param limitList 权限集合
	 * @param characterId 自身id
	 * @param isAlliance 是否和军队同盟
	 * @param isFriend 军队和城主是否同盟
	 * @return
	 */
	private List<Map<String, Object>> changeToBattleMap(List<BattleJobQueue> friend, List<Integer> limitList, int characterId, boolean isAlliance, boolean isFriend){
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp;
		List<Integer> limit;
		int j = 1;
		if(isFriend){
			j = 2;
		}
		for(BattleJobQueue i:friend){//此处列出所有军队均有可查看，可攻击，可撤退权限
			temp = new HashMap<String,Object>();
			limit = new ArrayList<Integer>();
			temp.put("id", i.getId());
			temp.put("order", j);
			temp.put("isFriend", isFriend);//与被围攻君主的关系
			temp.put("isAlliance", isAlliance);//自己与所看部队的君主的关系
			temp.put("characterName", i.getCharacterName());
			temp.put("forceAmount", i.getUserForce());
			temp.put("teamAmount", getTeamAmount(i.getHeroList()));
			
			if(limitList.contains(Const.CANLOOK)){
				limit.add(Const.CANLOOK);
			}
			if(isAlliance){
				if(i.getCharacterId() == characterId){
					limit.add(Const.CANBACK);
				}
			}else{
				if(limitList.contains(Const.CANATTACK)){
					limit.add(Const.CANATTACK);
				}
			}
			temp.put("limit", limit);//操作权限集合
			if(i.getStatus() == Const.BATTLE_STATUS_WAIT){
				temp.put("status", "等待进入城郊");//队伍状态
			}else if(i.getStatus() == Const.BATTLE_STATUS_WAIT_FIGHT){
				temp.put("status", "城郊准备战斗");//队伍状态
			}else if(i.getStatus() == Const.BATTLE_STATUS_FIGHTING){
				temp.put("status", "战斗中");//队伍状态
				int otherId = BattleProcess.getOtherbattleQueueId(i.getId());
				String battleField = i.getId() + "," + otherId;//有大到小的顺序排
				if(otherId != 0){//战斗双方军队编号
					if(otherId > i.getId()){
						battleField = otherId + "," + i.getId();
					}
					temp.put("battleField", battleField);
				}
				
			}
			retList.add(temp);
			j++;
		}
		return retList;
	}
	/*private List<Map<String, Object>> changeToWaitMap(List<BattleJobQueue> friend){
		List<Map<String, Object>> retList = new ArrayList<Map<String,Object>>();
		Map<String, Object> temp;
		for(BattleJobQueue i:friend){
			temp = new HashMap<String,Object>();
			temp.put("id", i.getId());
			temp.put("characterName", i.getCharacterName());
			temp.put("forceAmount", i.getUserForce());
			temp.put("teamAmount", getTeamAmount(i.getHeroList()));
			temp.put("camp", i.getBattleType()==Const.BATTLE_TYPE_MULTIBATTLE?"进攻方":"防御方");
			retList.add(temp);
		}
		return retList;
	}*/
	private int getTeamAmount(String heroListString){
		String[] heroList = heroListString.split(",");
		int amount = 0;
		for(String i:heroList){
			if(!i.equals("0") && !i.isEmpty()){
				amount++;
			}
		}
		return amount;
	}
}
