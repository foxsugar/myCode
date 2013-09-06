package com.crystalcg.gamedev.alliance.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.alliance.domain.Alliance;
import com.crystalcg.gamedev.alliance.domain.AllianceAllyApply;
import com.crystalcg.gamedev.alliance.domain.AllianceBarrack;
import com.crystalcg.gamedev.alliance.domain.AllianceContribute;
import com.crystalcg.gamedev.alliance.domain.AllianceEvent;
import com.crystalcg.gamedev.alliance.domain.AllianceMember;
import com.crystalcg.gamedev.alliance.domain.AllianceQueue;
import com.crystalcg.gamedev.alliance.domain.AllianceReceive;
import com.crystalcg.gamedev.alliance.domain.AllianceSalary;
import com.crystalcg.gamedev.alliance.domain.AllianceShoping;
import com.crystalcg.gamedev.alliance.domain.AllianceSite;
import com.crystalcg.gamedev.alliance.domain.AllianceTechnology;
import com.crystalcg.gamedev.alliance.domain.AllianceTechnologyQueue;
import com.crystalcg.gamedev.alliance.domain.AllianceUpgradeQueue;
import com.crystalcg.gamedev.alliance.domain.ApplicationList;

public interface AllianceMapper {
     void insertAllianceApplication(ApplicationList applicationList);
    
     int getcharacterApplicationAomunt(int characterId);
    
     List<ApplicationList> getAllCharacterApplication(Map<String, Object> param);
     
     List<ApplicationList> getApplicationByAllianceId(int allianceId);
     
     List<ApplicationList> getApplicationIdByCharacterId(int characterId);
     
     void deleteAllianceApplication(Map<String, Object> param);
 
   	 void insertAlliance(Alliance alliance);// 创建联盟

	 List<String> getAllAllianceName();// 查询所有联盟名称

	 Alliance getAllAllianceByName(String name);// 根据名称查询联盟

	 Alliance getAllianceById(int id);// 根据联盟Id查询联盟

	 List<ApplicationList> getAllAllianceApplication(Map<String, Object> param);

	 int getAllianceApplicationAomunt(int allianceId);
	
	 void updateAllianceBarrack(AllianceBarrack allianceBarrack);
	 
	 void deleteAllianceBarrack(AllianceBarrack allianceBarrack);

	 List<Integer> getAllAllianceApplicationId(int allianceId);

	 void insertAllianceMember(AllianceMember allianceMember);

	 List<AllianceMember> getAllAllianceMember(Map<String, Object> param);

	 List<Integer> getAllAllianceMemberId(int allianceId);

	 void deleteAllianceMember(int characterId);

	 int getAllAllianceAmount();

	 List<Alliance> getAllAlliance(Map<String, Object> param);

	 int getWhereAllianceMember(int characterId);

	 int getAllianceMemberAmount(int allianceId);

	 void insertAllianceQueue(AllianceQueue allianceQueue);
	
	 AllianceQueue getAllianceQueue(int allianceId);
	 
	 AllianceUpgradeQueue getAllianceUpQueue(int allianceId);

	 void deleteAllianceQueue(int allianceId);

	 void deleteAlliance(int allianceId);

	 void deleteAllAllianceMember(int allianceId);

	 void updateAllianceChief(Map<String, Object> param);

	 void changeAllianceInfo(Alliance alliance);

	 void insertAllianceEvent(AllianceEvent allianceEvent);

	 List<AllianceEvent> getAllianceEvent(Map<String, Object> param);

	 Integer getAllianceLevel(int allinceId);

	 void uptadeAllianceMemberSpeakStatus(AllianceMember allianceMember);

	 Map<String, Object> getAllianceMemberSpeakStatusTime(Map<String, Integer> param);

	 List<Alliance> getAllianceByCountry(Map<String, Object> param);

	 int getAllianceCountryAmount(String country);

	 AllianceContribute getAianceContributeByCharacterId(Map<String, Object> param);

	 void insertAllianceContribute(AllianceContribute allianceContribute);

	 void updateAllianceContribute(AllianceContribute allianceContribute);

	 List<AllianceContribute> getAllAianceContribute(Map<String, Object> param);

	 void updateAllianceWealth(Map<String, Object> param);// 更新联盟财富

	 void updateAllianceMemberWealth(Map<String, Object> param);// 更新个人联盟财富

	 Integer getAllianceMemberWealth(Map<String, Object> param);// 获取个人联盟财富

	 int getAllianceContributeAmount(int allianceId);

	 int getAllianceEventAmount(int allianceId);

	 AllianceBarrack getAllAllianceBarrack(Map<String, Object> param);
	
	 List<AllianceBarrack> getAllianceBarrackBySoldierNo(Map<String, Object> param);

	 void insertAllianceBarrack(AllianceBarrack allianceBarrack);

	 void updataAllianceBarrack(AllianceBarrack allianceBarrack);

	 void insertAllianceSite(AllianceSite allianceSite);

	 void updateAllianceSite(AllianceSite allianceSite);

	 Integer getAllianceSoldierAmount(int allianceId);// 获取联盟兵营士兵总数
	 
	 int getAllianceSolierCount(Map<String, Object> param);

	 int getAllianceSiteSoldierAmount(int allianceId);// 获取设置的士兵总数

	 Date getAllianceSiteTime(Map<String, Object> param);// 获取设置的时间

	 AllianceSite getAllianceSite(Map<String, Object> param);// 查询设置表信息

	 int getAllianceSoldier(Map<String, Object> param);// 获取联盟兵营该兵种数量
 
	 void insertAllianceReceive(AllianceReceive allianceReceive);// 插入领取士兵信息

	 void updateAllianceReceive(AllianceReceive allianceReceive);// 更新领取士兵数量

	 AllianceReceive getAllianceReceive(Map<String, Object> param);// 获取君主领取士兵信息

	 void insertAllianceTechnology(AllianceTechnology allianceTechnology);// 插入联盟科技表

	 AllianceTechnology getAllianceTechnology(Map<String, Object> param);// 获取该编号科技等级

	 void insertAllianceTechnologyQueue(AllianceTechnologyQueue at);// 插入联盟科技升级队列
	
	 AllianceTechnologyQueue getAllianceTechnologyQueue(Map<String, Object> param);//查询联盟科技升级队列

	 void deleteAllianceTechnologyQueue(Map<String, Object> param);// 删除联盟科技升级队列
 
	 void insertAllianceUpQueue(AllianceUpgradeQueue allianceUpQueue);// 插入联盟升级队列；

	 void deleteAllianceUpQueue(int allianceId);// 删除联盟升级队列

	 void updateAllianceLevel(Map<String, Object> param);// 更新联盟等级

	 void updateAllianceMemberNum(Map<String, Object> param);// 更新联盟成员数量

	 void insertAllianceAlly(AllianceAllyApply allianceAllyApply);// 插入结盟申请

	 AllianceAllyApply getAllianceAllyApply(Map<String, Object> param);// 获取该联盟申请

	 int getAllianceAllyApplyAmount(int allianceId);// 获取申请表总数

	 List<AllianceAllyApply> getAllAllianceAllyApply(Map<String, Object> param);// 分页获取申请结盟表

	 void deleteAllainceAllyApply(Map<String, Object> param);// 删除申请列表信息

	 void insertAllianceFriend(Map<String, Object> param);// 插入友盟列表

	 void updateAllianceFriendStatus(Map<String, Object> param);// 更新友盟状态
	
	/**
	 * 世界地图显示全部盟友
	 * @param characterId
	 * @return
	 */
	 List<Map<String,Object>> getAllyLocation(int characterId);
	
     AllianceTechnology getallianceTechologyInfo( Map<String,Object> param);//查看联盟科技
    
    //AllianceTechnology getAllianceTechnologyXNS(String technologyNo);//查看联盟科技兴农司
    
     void updateAllianceTechnology(Map<String,Object> param);//更新联盟科技
    
     List<AllianceTechnology> getAllianceTechnologyList(int allianceId);// 返回联盟所有科技
     
     AllianceTechnology getAllianceTechnologyWelfare(Map<String,Object> param);
    
     void insertAllianceSalary(int characterId);// 插入每天领取点券的君主
    
     AllianceSalary getAllianceSalary(int characterId);//查看君主是否领取点券
    
    Integer getAllianceShopingSoldAmount(Map<String, Object> param);
    
    Integer getShopingAmountByCharacterId(Map<String, Object> param);
    
    void insertAllianceShoping(AllianceShoping allianceShoping);
}
