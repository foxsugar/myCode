package com.crystalcg.gamedev.alliance.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.alliance.domain.AllianceEvent;
import com.crystalcg.gamedev.alliance.domain.AllianceMember;
import com.crystalcg.gamedev.alliance.domain.ApplicationList;
import com.crystalcg.gamedev.alliance.mapper.AllianceMapper;

public class AllianceMemberDao {
    private AllianceMapper allianceMapper;
    /**
     * 插入申请列表
     * @param characterId
     * @param allianceId
     */
    public void applyAllianceApplication(int characterId,int allianceId ,int type){
    	ApplicationList applicationList = new ApplicationList();
    	applicationList.setAllianceId(allianceId);
    	applicationList.setCharacterId(characterId);
    	applicationList.setType(type);
    	allianceMapper.insertAllianceApplication(applicationList);
    }
    /**
     * 分页查看申请列表
     * @param allianceId
     * @return
     */
    public List<ApplicationList> getAllAllianceApplication(int allianceId, int page,int pageSize){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("page", page);
    	param.put("pageSize", pageSize);
    	param.put("allianceId", allianceId);
    	return allianceMapper.getAllAllianceApplication(param);
    }
    /**
     * 查询联盟申请列表总数
     * @param allianceId
     * @return
     */
    public int getAllianceApplicationAomunt(int allianceId){
    	return allianceMapper.getAllianceApplicationAomunt(allianceId);
    }
    /**
     * 君主申请，邀请总数
     * @param characterId
     * @return
     */
    public int getcharacterApplicationAomunt(int characterId){
    	return allianceMapper.getcharacterApplicationAomunt(characterId);
    }
    /**
     * 根据联盟查询申请表
     * @param allianceId
     * @return
     */
    public List<ApplicationList> getApplicationByAllianceId(int allianceId){
    	return allianceMapper.getApplicationByAllianceId(allianceId);
    }
    public List<ApplicationList> getApplicationIdByCharacterId(int characterId){
    	return allianceMapper.getApplicationIdByCharacterId(characterId);
    }
    
    public List<ApplicationList> getAllCharacterApplication(int characterId,int page,int pageSize){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("page", page);
    	param.put("pageSize", pageSize);
    	param.put("characterId", characterId);
    	return allianceMapper.getAllCharacterApplication(param);
    }
    /**
     * 删除申请列表
     * @param characterId
     */
    public void deleteAllianceApplication(int characterId,int allianceId){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("characterId", characterId);
    	param.put("allianceId", allianceId);
    	allianceMapper.deleteAllianceApplication(param);
    }
    /**
     * 插入联盟成员
     * @param characterId
     * @param allianceId
     */
    public void joinAllianceMember(int characterId,int allianceId){
    	AllianceMember allianceMember = new AllianceMember();
    	allianceMember.setAllianceId(allianceId);
    	allianceMember.setCharacterId(characterId);
    	allianceMapper.insertAllianceMember(allianceMember);
    }
    /**
     * 删除联盟成员
     * @param characterId
     */
    public void deleteAllianceMember(int characterId){
    	allianceMapper.deleteAllianceMember(characterId);
    }
    /**
     * 删除联盟所有成员
     * @param allianceId
     */
    public void deleteAllAllianceMember(int allianceId){
    	allianceMapper.deleteAllAllianceMember(allianceId);
    }
    /**
     * 分页查询联盟成员
     * @param allianceId
     * @return
     */
    public List<AllianceMember> getAllAllianceMember(int allianceId, int page,int pageSize){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("page", page);
    	param.put("pageSize", pageSize);
    	param.put("allianceId", allianceId);
		return allianceMapper.getAllAllianceMember(param);
    }
    /**
     * 查询联盟所有成员
     * @param allianceId
     * @return
     */
    public List<Integer>getAllAllianceMemberId(int allianceId){
    	return allianceMapper.getAllAllianceMemberId(allianceId);
    }
    /**
     * 查询成员在那个联盟
     * @param characterId
     * @return
     */
//    public int getWhereAllianceMember(int characterId){
//		return allianceMapper.getWhereAllianceMember(characterId);
//    }
    /**
     * 查询联盟成员总数
     * @return
     */
    public int getAllianceMemberAmount(int allianceId){
    	return allianceMapper.getAllianceMemberAmount(allianceId);
    }
    /**
     * 删除解散联盟队列
     * @param allianceId
     */
    public void deleteAllianceQueue(int allianceId){
    	allianceMapper.deleteAllianceQueue(allianceId);
    }
    /**
     * 删除联盟
     * @param allianceId
     */
    public void deleteAlliance(int allianceId){
    	allianceMapper.deleteAlliance(allianceId);
    }
    /**
     * 修改联盟盟主
     * @param allianceId
     * @param name
     */
    public void updateAllianceChief(int allianceId,String name){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("name", name);
    	allianceMapper.updateAllianceChief(param);
    }
    /**
     * 插入事件
     * @param allianceId
     * @param completetime
     * @param event
     */
    public void insertAllianceEvent(int allianceId,Date completetime, String event){
    	AllianceEvent alliancevent = new AllianceEvent();
    	alliancevent.setAllianceId(allianceId);
    	alliancevent.setCompletetime(completetime);
    	alliancevent.setEvent(event);
    	allianceMapper.insertAllianceEvent(alliancevent);
    }
    /**
     * 更新禁言状态
     * @param allianceId
     * @param characterId
     * @param speakStatus
     * @param speakStatusTime
     */
    public void uptadeAllianceMemberSpeakStatus(int allianceId,int characterId,int speakStatus,Date speakStatusTime){
    	AllianceMember allianceMember = new AllianceMember();
    	allianceMember.setAllianceId(allianceId);
    	allianceMember.setCharacterId(characterId);
    	allianceMember.setSpeakStatus(speakStatus);
    	allianceMember.setSpeakStatusTime(speakStatusTime);
    	allianceMapper.uptadeAllianceMemberSpeakStatus(allianceMember);
    }
    /**
     * 查看禁言状态
     * @param allianceId
     * @param characterId
     * @return
     */
    public Map<String, Object> getAllianceMemberSpeakStatusTime(int allianceId,int characterId){
    	Map<String, Integer> param = new HashMap<String, Integer>();
    	param.put("allianceId", allianceId);
    	param.put("characterId", characterId);
    	return allianceMapper.getAllianceMemberSpeakStatusTime(param);
    }
    /**
     * 分页获取所有事件
     * @param allianceId
     * @param page
     * @param pageSize
     * @return
     */
    public List<AllianceEvent> getAllianceEvent(int allianceId,int page,int pageSize){
    	Map<String,Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("page", page);
    	param.put("pageSize", pageSize);
    	return allianceMapper.getAllianceEvent(param);
    }
    /**
     * 更新君主联盟财富
     * @param allianceId
     * @param characterId
     * @param wealth
     */
    public void updateAllianceMemberWealth(int allianceId,int characterId,int wealth){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("characterId", characterId);
    	param.put("wealth", wealth);
    	allianceMapper.updateAllianceMemberWealth(param);
    }
    /**
     * 获取君主联盟财富
     * @param allianceId
     * @param characterId
     */
    public Integer  getAllianceMemberWealth(int allianceId,int characterId){
    	Map<String, Object> param = new HashMap<String,Object>();
    	param.put("allianceId", allianceId);
    	param.put("characterId", characterId);
    	return allianceMapper.getAllianceMemberWealth(param);
    }
    
    public int getAllianceEventAmount(int allianceId){
    	return allianceMapper.getAllianceEventAmount(allianceId);
    }
    
    /**
     * 世界获取全部盟友
     * @param characterId
     * @return
     */
    public List<Map<String,Object>>getAllyLocation(int characterId){
    	return allianceMapper.getAllyLocation(characterId);
    }
    
	public AllianceMapper getAllianceMapper() {
		return allianceMapper;
	}

	public void setAllianceMapper(AllianceMapper allianceMapper) {
		this.allianceMapper = allianceMapper;
	}
    
}
