package com.crystalcg.gamedev.alliance.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.alliance.domain.Alliance;
import com.crystalcg.gamedev.alliance.domain.AllianceAllyApply;
import com.crystalcg.gamedev.alliance.domain.AllianceQueue;
import com.crystalcg.gamedev.alliance.domain.AllianceUpgradeQueue;
import com.crystalcg.gamedev.alliance.mapper.AllianceMapper;

public class AllianceDao {
    private AllianceMapper allianceMapper;
 /**
  * 创建联盟
  * @param name
  * @param banner
  * @param country
  * @param chief
  * @param level
  * @param ownCountry
  * @param memberAmount
  * @param wealth
  * @param introduction
  * @param friendStatus
  */
    public void insertAlliance(String name,String banner,String country,String chief,int level,int memberAmount,String introduction,int friendStatus){
    	Alliance alliance = new Alliance();
    	alliance.setName(name);
    	alliance.setBannar(banner);
    	alliance.setCountry(country);
    	alliance.setChief(chief);
    	alliance.setLevel(level);
    	alliance.setMemberAmount(memberAmount);
    	alliance.setIntroduction(introduction);
    	alliance.setFriendStatus(friendStatus);
    	allianceMapper.insertAlliance(alliance);
    }
    /**
     * 查询所有联盟名称
     * @return
     */
    public List<String> getAllAllianceName(){
    	return allianceMapper.getAllAllianceName();
    }
    /**
     * 根据名称查询联盟
     * @param name
     * @return
     */
    public Alliance getAllAllianceByName(String name){
		return allianceMapper.getAllAllianceByName(name);
	}
    public Alliance getAllianceById(int id){
    	return allianceMapper.getAllianceById(id);
    }
    /**
     * 根据国家分页查找
     */
    public List<Alliance> getAllianceByCountry(String country,int page,int pageSize){
    	HashMap<String, Object> param = new HashMap<String,Object>();
    	param.put("country", country);
    	param.put("page", page);
    	param.put("pageSize", pageSize);
    	return allianceMapper.getAllianceByCountry(param);
    }
    public int getAllianceCountryAmount(String country){
    	return allianceMapper.getAllianceCountryAmount(country);
    }
    /**
     * 查询联盟总数量
     * @return
     */
    public int getAllAllianceAmount(){
		return allianceMapper.getAllAllianceAmount();
    }
    /**
     * 分页查询所有联盟
     * @param page
     * @param pageSize
     * @return
     */
    public List<Alliance> getAllAlliance(int page,int pageSize){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("page", page);
    	param.put("pageSize", pageSize);
		return allianceMapper.getAllAlliance(param);
    }
    /**
     * 插入联盟解散队列
     */
    public void insertAllianceQueue(AllianceQueue allianceQueue){
    	allianceMapper.insertAllianceQueue(allianceQueue);
    }
    public AllianceQueue getAllianceQueue(int allianceId){
    	return allianceMapper.getAllianceQueue(allianceId);
    }
    /**
     * 修改信息
     */
    public void changeAllianceInfo(int allianceId,String introduction,String bulletin){
    	Alliance alliance = new Alliance();
    	alliance.setId(allianceId);
    	alliance.setIntroduction(introduction);
    	alliance.setBulletin(bulletin);
    	allianceMapper.changeAllianceInfo(alliance);
    }
    /**
     * 根据联盟Id查询联盟等级
     * @param allianceId
     * @return
     */
    public int getAllianceLevel(int allianceId){
    	return allianceMapper.getAllianceLevel(allianceId);
    }
    /**
     * 更新联盟财富
     * @param allianceId
     * @param wealth
     */
    public void updateAllianceWealth(int allianceId, int wealth){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("wealth", wealth);
    	allianceMapper.updateAllianceWealth(param);
    }
    /**
     * 插入联盟升级队列
     * @param allianceUpQueue
     */
    public void insertAllianceUpQueue(AllianceUpgradeQueue allianceUpQueue){
    	allianceMapper.insertAllianceUpQueue(allianceUpQueue);
    }
    /**
     * 查看联盟升级队列
     * @param allianceId
     * @return
     */
    public AllianceUpgradeQueue getAllianceUpQueue(int allianceId){
    	return allianceMapper.getAllianceUpQueue(allianceId);
    }
    /**
     * 删除联盟升级队列
     * @param allianceId
     */
    public void deleteAllianceUpQueue(int allianceId){
    	allianceMapper.deleteAllianceUpQueue(allianceId);
    }
    /**
     * 更新联盟等级
     * @param allianceId
     * @param level
     */
    public void updateAllianceLeve(int allianceId,int level){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("level", level);
    	allianceMapper.updateAllianceLevel(param);
    }
    /**
     * 更新联盟成员数量
     * @param allianceId
     * @param num
     */
    public void updateAllianceMemberNum(int allianceId,int num){
      	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("number", num);
    	allianceMapper.updateAllianceMemberNum(param);
    }
    /**
     * 插入申请结盟表
     * @param allianceId
     * @param allianceFriendId
     * @param allianceEvent
     */
    public void insertAllianceAlly(int allianceId,int allianceFriendId,String  allianceEvent){
    	AllianceAllyApply  aaa = new AllianceAllyApply();
    	aaa.setAllianceId(allianceId);
    	aaa.setAllianceFriendId(allianceFriendId);
    	aaa.setAllianceEvent(allianceEvent);
    	allianceMapper.insertAllianceAlly(aaa);
    }
    /**
     * 获取这条申请
     * @param allianceId
     * @param allyAllianceId
     * @return
     */
    public AllianceAllyApply getAllianceAllyApply(int allianceId,int allyAllianceId){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("allyAllianceId", allyAllianceId);
    	return allianceMapper.getAllianceAllyApply(param);
    }
    /**
     * 获取联盟申请总数
     * @param allianceId
     * @return
     */
    public int getAllianceAllyApplyAmount(int allianceId){
    	return allianceMapper.getAllianceAllyApplyAmount(allianceId);
    }
    /**
     * 分页查询联盟申请表
     * @param allianceId
     * @param page
     * @param pageSize
     * @return
     */
    public List<AllianceAllyApply> getAllAllianceAllyApply(int allianceId, int page,int pageSize){
    	Map<String,Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("page", page);
    	param.put("pageSize", pageSize);
    	return allianceMapper.getAllAllianceAllyApply(param);
    }
    
    /**
     * 删除申请表
     * @param allianceId
     * @param allyAllianceId
     */
    public void deleteAllainceAllyApply(int allianceId,int allyAllianceId){
      	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("allyAllianceId", allyAllianceId);
    	allianceMapper.deleteAllainceAllyApply(param);
    }
    /**
     * 插入友盟表
     * @param allianceId
     * @param friendId
     * @param type
     */
    public void insertAllianceFriend(int allianceId,int friendId,int type){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("friendId", friendId);
    	param.put("type", type);
    	allianceMapper.insertAllianceFriend(param);
    }
    public void updateAllianceFriendStatus(int allianceId,int status){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("status", status);
    	allianceMapper.updateAllianceFriendStatus(param);
    }
	public AllianceMapper getAllianceMapper() {
		return allianceMapper;
	}

	public void setAllianceMapper(AllianceMapper allianceMapper) {
		this.allianceMapper = allianceMapper;
	}
    
}
