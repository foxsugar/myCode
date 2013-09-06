package com.crystalcg.gamedev.alliance.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.alliance.domain.AllianceBarrack;
import com.crystalcg.gamedev.alliance.domain.AllianceContribute;
import com.crystalcg.gamedev.alliance.domain.AllianceReceive;
import com.crystalcg.gamedev.alliance.domain.AllianceSalary;
import com.crystalcg.gamedev.alliance.domain.AllianceShoping;
import com.crystalcg.gamedev.alliance.domain.AllianceSite;
import com.crystalcg.gamedev.alliance.domain.AllianceTechnology;
import com.crystalcg.gamedev.alliance.domain.AllianceTechnologyQueue;
import com.crystalcg.gamedev.alliance.mapper.AllianceMapper;

public class AllianceWelfareDao {
   private AllianceMapper allianceMapper;
   /**
    * 根据君主查询财富值
    * @param alliance
    * @param characterId
    */
   public AllianceContribute getAianceContributeByCharacterId(int allianceId,int characterId){
	   Map<String,Object> param = new HashMap<String, Object>();
	   param.put("allianceId", allianceId);
	   param.put("characterId", characterId);
	   return allianceMapper.getAianceContributeByCharacterId(param);
   }
   /**
    * 第一次捐献
    * @param allianceId
    * @param characterId
    * @param amount
    */
  public void insertAllianceContribute(int allianceId,int characterId,int amount){
	  AllianceContribute allianceContribute = new AllianceContribute();
	  allianceContribute.setAllianceId(allianceId);
	  allianceContribute.setCharacterId(characterId);
	  allianceContribute.setCompleteTime(new Date());
	  allianceContribute.setContributeAmount(amount);
	  allianceContribute.setTodayAmount(amount);
	  allianceMapper.insertAllianceContribute(allianceContribute);
  }
   /**
    * 更新捐献表
    * @param allianceId
    * @param characterId
    * @param amount
    */
  public void updateAllianceContribute(int allianceId,int characterId,int amount,int tadayAmount){
	  AllianceContribute allianceContribute = new AllianceContribute();
	  allianceContribute.setAllianceId(allianceId);
	  allianceContribute.setCharacterId(characterId);
	  allianceContribute.setCompleteTime(new Date());
	  allianceContribute.setContributeAmount(amount);
	  allianceContribute.setTodayAmount(tadayAmount);
	  allianceMapper.updateAllianceContribute(allianceContribute);
  }
  /**
   *   分页返回捐献列表
   * @param allianceId
   * @param page
   * @param pageSize
   * @return
   */
  public  List<AllianceContribute> getAllAianceContribute(int allianceId,int page, int pageSize){
	  Map<String,Object> param = new HashMap<String, Object>();
	  param.put("allianceId", allianceId);
	  param.put("page", page);
	  param.put("pageSize", pageSize);
	 return allianceMapper.getAllAianceContribute(param);
  }
  /**
   * 根据士兵编号获取联盟兵营
   * @param allianceId
   * @return
   */
  public AllianceBarrack getAllAllianceBrrack(int allianceId ,String soldierNo){
	  Map<String, Object> param = new HashMap<String,Object>();
	  param.put("allianceId", allianceId);
	  param.put("soldierNo", soldierNo);
	  return allianceMapper.getAllAllianceBarrack(param);
  }
  
  public List<AllianceBarrack> getAllianceBarrackBySoldierNo(int allianceId,String soldierNo,int page,int pageSize){
	  Map<String, Object> param = new HashMap<String,Object>();
	  String like = soldierNo+"%";
	  param.put("allianceId", allianceId);
	  param.put("like", like);
	  param.put("page", page);
	  param.put("pageSize", pageSize);
	  return allianceMapper.getAllianceBarrackBySoldierNo(param);
  }
  
  public int getAllianceContributeAmount(int allianceId){
	  return allianceMapper.getAllianceContributeAmount(allianceId);
  }
  /**
   * 插入联盟士兵兵营
   * @param allianceId
   * @param soidierNo
   * @param amount
   */
  public void insertAllianceBarrack(int allianceId,String soldierNo,int amount){
	  AllianceBarrack allianceBarrack = new AllianceBarrack();
	  allianceBarrack.setAllianceId(allianceId);
	  allianceBarrack.setSoldierNo(soldierNo);
	  allianceBarrack.setAmount(amount);
	  allianceMapper.insertAllianceBarrack(allianceBarrack);
  }
  /**
   * 更新联盟士兵兵营
   * @param allianceId
   * @param soidierNo
   * @param amount
   */
  public void updataAllianceBarrack(int allianceId,String soldierNo,int amount){
	  AllianceBarrack allianceBarrack = new AllianceBarrack();
	  allianceBarrack.setAllianceId(allianceId);
	  allianceBarrack.setSoldierNo(soldierNo);
	  allianceBarrack.setAmount(amount);
	  allianceMapper.updateAllianceBarrack(allianceBarrack);
  }
  /**
   * 删除联盟士兵
   * @param allianceId
   * @param soldierNo
   */
  public void deleteAllianceBarrack(int allianceId,String soldierNo){
	  AllianceBarrack allianceBarrack = new AllianceBarrack();
	  allianceBarrack.setAllianceId(allianceId);
	  allianceBarrack.setSoldierNo(soldierNo);
	  allianceMapper.deleteAllianceBarrack(allianceBarrack);
  }
  /**
   * 插入提取设置表
   * @param allianceId
   * @param alliancePosition
   * @param wealth
   * @param soldierAmount
   */
  public void insertAllianceSite(int allianceId,String alliancePosition,int soldierAmount){
	  AllianceSite allianceSite = new AllianceSite();
	  allianceSite.setAllianceId(allianceId);
	  allianceSite.setAlliancePosition(alliancePosition);
	  allianceSite.setSoldierAmount(soldierAmount);
//	  allianceSite.setWealth(wealth);
	  allianceMapper.insertAllianceSite(allianceSite);
  }
  /**
   * 更新提取设置表
   * @param allianceId
   * @param alliancePosition
   * @param wealth
   * @param soldierAmount
   */
  public void updateAllianceSite(int allianceId,String alliancePosition,int soldierAmount){
	  AllianceSite allianceSite = new AllianceSite();
	  allianceSite.setAllianceId(allianceId);
	  allianceSite.setAlliancePosition(alliancePosition);
	  allianceSite.setSoldierAmount(soldierAmount);
//	  allianceSite.setWealth(wealth);
	  allianceMapper.updateAllianceSite(allianceSite);
  }
  /**
   * 查询联盟士兵总数
   * @param allianceId
   * @return
   */
  public Integer getAllianceSolierAmount(int allianceId){
	  return allianceMapper.getAllianceSoldierAmount(allianceId);
  }
   /**
    * 根据士兵编号查询总数
    * @param allianceId
    * @param soldierNo
    * @return
    */
  public int getAllianceSolierCount(int allianceId,String soldierNo){
	  Map<String,Object> param = new HashMap<String,Object>();
//	  String like = soldierNo+"%";
	  param.put("like", soldierNo+"%");
	  param.put("allianceId", allianceId);
	  return allianceMapper.getAllianceSolierCount(param);
  }
  /**
   * 查询设置表总数
   * @param allianceId
   * @return
   */
  public int getAllianceSiteSoldierAmount(int allianceId){
	  return allianceMapper.getAllianceSiteSoldierAmount(allianceId);
  }
  /**
   * 查询设置表信息
   * @param allianceId
   * @param alliancePosition
   * @return
   */
  public AllianceSite getAllianceSite(int allianceId,String alliancePosition){
	  Map<String, Object> param = new HashMap<String,Object>();
	  param.put("allianceId", allianceId);
	  param.put("alliancePosition", alliancePosition);
	  return allianceMapper.getAllianceSite(param);
  }
  /**
   * 查询设置表时间
   * @param allianceId
   * @param alliancePosition
   * @return
   */
  public Date getAllianceSiteTime(int allianceId,String alliancePosition){
	  Map<String, Object> param = new HashMap<String,Object>();
	  param.put("allianceId", allianceId);
	  param.put("alliancePosition", alliancePosition);
	  return allianceMapper.getAllianceSiteTime(param);
  }
  /**
   * 插入士兵领取信息
   * @param allianceId
   * @param characterId
   * @param receiveNumber
   */
  public void insertAllianceReceive(int allianceId,int characterId,int receiveNumber){
	  AllianceReceive allianceReceive = new AllianceReceive();
	  allianceReceive.setAllianceId(allianceId);
	  allianceReceive.setCharacterId(characterId);
	  allianceReceive.setReceiveNumber(receiveNumber);
	  allianceMapper.insertAllianceReceive(allianceReceive);
  }
 /**
  * 更新领取士兵数量
  * @param allianceId
  * @param characterId
  * @param receiveNumber
  */
  public void updateAllianceReceive(int allianceId,int characterId,int receiveNumber){
	  AllianceReceive allianceReceive = new AllianceReceive();
	  allianceReceive.setAllianceId(allianceId);
	  allianceReceive.setCharacterId(characterId);
	  allianceReceive.setReceiveNumber(receiveNumber);
	  allianceMapper.updateAllianceReceive(allianceReceive);
  }
  /**
   * 获取领取士兵信息
   * @param allianceId
   * @param characterId
   * @return
   */
  public AllianceReceive getAllianceReceive(int allianceId,int characterId){
	  Map<String, Object> param = new HashMap<String,Object>();
	  param.put("allianceId", allianceId);
	  param.put("characterId", characterId);
	  return allianceMapper.getAllianceReceive(param);
  }
  /**
   * 插入联盟科技表
   * @param allianceId
   * @param level
   * @param technologyNo
   */
  public void insertAllianceTechnology(AllianceTechnology allianceTechnology){
	  allianceMapper.insertAllianceTechnology(allianceTechnology);
  }
  /**
   *  更新联盟科技
   * @param param
   */
  public void updateAllianceTechnology(Map<String,Object> param){
	  allianceMapper.updateAllianceTechnology(param);
  }
  public  AllianceTechnology getAllianceTechologyInfo(int allianceId,String technologyNo){
	  Map<String,Object> param = new HashMap<String,Object>();
	  String like = technologyNo+"%";
	  param.put("like", like);
	  param.put("allianceId", allianceId);
	  return allianceMapper.getallianceTechologyInfo(param);
  }
  /**
   * 获取该联盟科技信息
   * @param allianceId
   * @param technologyNo
   */
//  public AllianceTechnology getAllianceTechnology(int allianceId,String technologyNo){
//	  Map<String, Object> param = new HashMap<String,Object>();
//	  param.put("allianceId", allianceId);
//	  param.put("technologyNo", technologyNo);
//	  return allianceMapper.getAllianceTechnology(param);
//  }
//  /**
//   * 返回该联盟所有科技信息
//   * @param allianceId
//   * @return
//   */
  public List<AllianceTechnology> getAllianceTechnologyList(int allianceId){
	  return allianceMapper.getAllianceTechnologyList(allianceId);
  }
  public AllianceTechnology getAllianceTechnologyWelfare(int allianceId,String buildingNo){
	  Map<String, Object> param = new HashMap<String,Object>();
//	  buildingNo=buildingNo+"%";
	  param.put("allianceId", allianceId);
	  param.put("buildingNo", buildingNo+"%");
	  return allianceMapper.getAllianceTechnologyWelfare(param);
  }
  /**
   * 插入到升级队列
   * @param at
   */
  public void insertAllianceTechnologyQueue(AllianceTechnologyQueue at){
	  allianceMapper.insertAllianceTechnologyQueue(at);
  }
  /**
   * 查询联盟科技升级队列
   * @param allianceId
   * @return
   */
  public AllianceTechnologyQueue getAllianceTechnologyQueue(int allianceId,String technologyNo){
	  Map<String, Object> param = new HashMap<String,Object>();
	  String like = technologyNo+"%";
	  param.put("like", like);
	  param.put("allianceId", allianceId);
	  return allianceMapper.getAllianceTechnologyQueue(param);
  }
  /**
   * 删除联盟科技升级队列
   * @param allianceId
   * @param technologyNo
   */
  public void deleteAllianceTechnologyQueue(int allianceId,String technologyNo){
	  Map<String, Object> param = new HashMap<String,Object>();
	  param.put("allianceId", allianceId);
	  param.put("technologyNo", technologyNo);
	  allianceMapper.deleteAllianceTechnologyQueue(param);
  }
  public void insertAllianceSalary(int characterId){
	  allianceMapper.insertAllianceSalary(characterId);
  }
  public AllianceSalary getAllianceSalary(int characterId){
	  return allianceMapper.getAllianceSalary(characterId);
  }
  /**
   * 更加君主id，物品编号查询购买物品数量
   * @param allianceId
   * @param itemNo
   * @return
   */
  public Integer getAllianceShopingSoldAmount(int allianceId,String itemNo){
	  Map<String, Object> param = new HashMap<String,Object>();
	  param.put("allianceId", allianceId);
	  param.put("itemNo", itemNo);
	  return allianceMapper.getAllianceShopingSoldAmount(param);
  }
  /**
   *  根据君主id，物品编号查询购买数量
   * @param characterId
   * @param itemNo
   * @return
   */
  public Integer getShopingAmountByCharacterId(int characterId,String itemNo){
	  Map<String, Object> param = new HashMap<String,Object>();
	  param.put("characterId", characterId);
	  param.put("itemNo", itemNo);
	  return allianceMapper.getShopingAmountByCharacterId(param);
  }
  public void insertAllianceShoping(int allianceId,int characterId,String itemNo,int buyAmount){
	  AllianceShoping allianceShoping = new AllianceShoping();
	  allianceShoping.setAllianceId(allianceId);
	  allianceShoping.setCharacterId(characterId);
	  allianceShoping.setItemNo(itemNo);
	  allianceShoping.setBuyAmount(buyAmount);
	  allianceMapper.insertAllianceShoping(allianceShoping);
  }
public AllianceMapper getAllianceMapper() {
	return allianceMapper;
}

public void setAllianceMapper(AllianceMapper allianceMapper) {
	this.allianceMapper = allianceMapper;
}
   
}
