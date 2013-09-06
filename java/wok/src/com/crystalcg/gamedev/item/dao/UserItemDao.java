package com.crystalcg.gamedev.item.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.domain.UserQuests;
import com.crystalcg.gamedev.item.mapper.UserItemMapper;

public class UserItemDao {
	private UserItemMapper userItemMapper;

	/**
	 * 在用户道具表中添加道具,适用于所有非装备的道具
	 * @param userItem
	 * @return
	 */
	public void addUserItemToCharacter(Map<String, Object> param){
		userItemMapper.addUserItemToCharacter(param);
	}
	/**
	 * 添加装备
	 * @param userEquipment
	 */
	public void addUserEquipmentToCharacter(UserEquipment userEquipment){
		userItemMapper.addUserEquipmentToCharacter(userEquipment);
	}
	/**
	 * 通过ItemNo获取用户装备
	 * @param param
	 * @return
	 */
	public List<UserEquipment> getUserEquipmentByItemNo(Map<String, Object> param){
		return userItemMapper.getUserEquipmentByItemNo(param);
	}
	/**
	 * 通过ItemNo获取用户道具
	 * @param param
	 * @return
	 */
	public List<UserItem> getUserItemByItemNo(Map<String, Object> param){
		return userItemMapper.getUserItemByItemNo(param);
	}
	/**
	 * 通过itemId获取用户材料
	 * @param parma
	 * @return
	 */
	public List<UserMaterial> getUserMaterialByItemNo(Map<String, Object> parma){
		return userItemMapper.getUserMaterialByItemNo(parma);
	}
	/**
	 * 通过itemId获取用户任务道具
	 * @param param
	 * @return
	 */
	public List<UserQuests> getUserQuestsByItemNo(Map<String, Object> param){
		return userItemMapper.getUserQuestsByItemNo(param);
	}
	/**
	 * 更新所有非装备类型的道具数量
	 * @param param
	 */
	public void updateUserItemAmount(Map<String, Object> param){
		userItemMapper.updateUserItemAmount(param);
	}
	/**
	 * 获取玩家所有背包内所有装备
	 * @param characterId
	 * @return
	 */
	public List<UserEquipment> getAllUserEquipment(Map<String, Object> param){
		return userItemMapper.getAllUserEquipment(param);
	}
	/**
	 * 获取玩家背包内所有消耗品道具
	 * @param characterId
	 * @return
	 */
	public List<UserItem> getAllUserItem(Map<String, Object> param){
		return userItemMapper.getAllUserItem(param);
	}
	/**
	 * 获取玩家背包内所有材料
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getAllUserMaterial(Map<String, Object> param){
		return userItemMapper.getAllUserMaterial(param);
	}
	/**
	 * 获取玩家背包内所有任务道具
	 * @param characterId
	 * @return
	 */
	public List<UserQuests> getAllUserQuests(Map<String, Object> param){
		return userItemMapper.getAllUserQuests(param);
	}
	/**
	 * 通过Id获取具体消耗品道具
	 * @param id
	 * @return
	 */
	public UserItem getUserItemById(int id){
		return userItemMapper.getUserItemById(id);
	}
	/**
	 * 通过Id获取具体获取具体装备
	 * @param id
	 * @return
	 */
	public UserEquipment getUserEquipmentById(int id){
		return userItemMapper.getUserEquipmentById(id);
	}
	/**
	 * 通过Id获取具体获取具体材料
	 * @param id
	 * @return
	 */
	public UserMaterial getUserMaterialById(int id){
		return userItemMapper.getUserMaterialById(id);
	}
	/**
	 * 通过Id获取具体获取具体任务道具
	 * @param id
	 * @return
	 */
	public UserQuests getUserQuestsById(int id){
		return userItemMapper.getUserQuestsById(id);
	}
	/**
	 * 通过Id删除对应非装备类型的道具
	 * @param id
	 */
	public void deleteFromUserItem(int id){
		userItemMapper.deleteFromUserItem(id);
	}
	/**
	 * 通过Id删除对应装备类型的道具
	 * @param id
	 */
	public void deleteFromUserEquipment(int id){
		userItemMapper.deleteFromUserEquipment(id);
	}
	/**
	 * 给玩家插入拍卖的装备，用于拍卖行功能
	 * @param userEquipment
	 */
	public void insertEquipmentForAuction(UserEquipment userEquipment){
		userItemMapper.insertEquipmentForAuction(userEquipment);
	}
	
	/**
	 * 给玩家插入拍卖的非装备类道具，用于拍卖行功能
	 * @param userItem
	 */
	public void insertItemForAuction(UserItem userItem){
		userItemMapper.insertItemForAuction(userItem);
	}
	/**
	 * 更改非装备类型的物品位置
	 * @param param
	 */
	public void updateUserItemPostion(Map<String, Object> param){
		userItemMapper.updateUserItemPostion(param);
	}
	/**
	 * 更改装备位置
	 * @param param
	 */
	public void updateUserEquipmentPosition(Map<String, Object> param){
		userItemMapper.updateUserEquipmentPosition(param);
	}
	
	public int getArticleAmount(int characterId){
		return userItemMapper.getArticleAmount(characterId);
	}
	/**
	 * 用于更新装备强化属性和强化等级，用于装备强化
	 * @param userEquipment
	 */
	public void updateEquipmentForStrength(UserEquipment userEquipment){
		userItemMapper.updateEquipmentForStrength(userEquipment);
	}
	/**
	 * 查看包里所有的宝石，用于宝石合成和镶嵌
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getGemStoneInBag(int characterId){
		return userItemMapper.getGemStoneInBag(characterId);
	}
	/**
	 * 查看包里所有的打造材料，用于材料合成
	 * @param characterId
	 * @return
	 */
	public List<UserMaterial> getMaterialForProduceInBag(int characterId){
		return userItemMapper.getMaterialForProduceInBag(characterId);
	}
	/**
	 * 更新装备镶空，用于宝石镶嵌
	 * @param userEquipment
	 */
	public void updateEquipmentHole(UserEquipment userEquipment){
		userItemMapper.updateEquipmentHole(userEquipment);
	}
	public UserItemMapper getUserItemMapper() {
		return userItemMapper;
	}

	public void setUserItemMapper(UserItemMapper userItemMapper) {
		this.userItemMapper = userItemMapper;
	}
	public void heroAddEquipment(int characterId, int equipId,int position, int heroId) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("equipId", equipId);
		param.put("position", position);
		param.put("heroId", heroId);
		userItemMapper.heroAddEquipment(param);
	}
	public void heroRemoveEuipment(int characterId,int equipId,int position) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("equipId", equipId);
		param.put("position", position);
		userItemMapper.heroRemoveEuipment(param);
	}
	public void heroRemoveAllEuipment(int characterId,int heroId,int position) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("heroId", heroId);
		param.put("position", position);
		userItemMapper.heroRemoveAllEuipment(param);
	}
	
	public int getAllUserEquipmentAmountInBag(int characterId,
			int position) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("position", position);
		return userItemMapper.getAllUserEquipmentAmountInBag(param);
	}
	public List<UserEquipment> getAllUserEquipmentByPage(int characterId, int position,
			int start, int pageSize) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("position", position);
		param.put("start", start);
		param.put("pageSize", pageSize);
		return userItemMapper.getAllUserEquipmentByPage(param);
	}
}
