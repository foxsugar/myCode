package com.crystalcg.gamedev.item.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.domain.UserQuests;




public interface UserItemMapper {
	
	/**
	 * 在用户道具表中添加道具,适用于所有非装备的道具
	 * @param userItem
	 * @return
	 */
	void addUserItemToCharacter(Map<String, Object> param);
	/**
	 * 添加装备
	 * @param userEquipment
	 */
	void addUserEquipmentToCharacter(UserEquipment userEquipment);
	
	/**
	 * 通过ItemNo获取用户装备
	 * @param param
	 * @return
	 */
	public List<UserEquipment> getUserEquipmentByItemNo(Map<String, Object> param);
	
	/**
	 * 通过ItemNo获取用户道具
	 * @param param
	 * @return
	 */
	List<UserItem> getUserItemByItemNo(Map<String, Object> param);
	/**
	 * 通过itemNo获取用户材料
	 * @param parma
	 * @return
	 */
	List<UserMaterial> getUserMaterialByItemNo(Map<String, Object> parma);
	/**
	 * 通过itemNo获取用户任务道具
	 * @param param
	 * @return
	 */
	List<UserQuests> getUserQuestsByItemNo(Map<String, Object> param);
	/**
	 * 更新所有非装备类型的道具数量
	 * @param param
	 */
	void updateUserItemAmount(Map<String, Object> param);
	/**
	 * 获取玩家所有背包内所有装备
	 * @param characterId
	 * @return
	 */
	List<UserEquipment> getAllUserEquipment(Map<String, Object> param);
	/**
	 * 获取玩家背包内所有消耗品道具
	 * @param characterId
	 * @return
	 */
	List<UserItem> getAllUserItem(Map<String, Object> param);
	/**
	 * 获取玩家背包内所有材料
	 * @param characterId
	 * @return
	 */
	List<UserMaterial> getAllUserMaterial(Map<String, Object> param);
	/**
	 * 获取玩家背包内所有任务道具
	 * @param characterId
	 * @return
	 */
	List<UserQuests> getAllUserQuests(Map<String, Object> param);
	/**
	 * 通过Id获取具体消耗品道具
	 * @param id
	 * @return
	 */
	UserItem getUserItemById(int id);
	/**
	 * 通过Id获取具体获取具体装备
	 * @param id
	 * @return
	 */
	UserEquipment getUserEquipmentById(int id);
	/**
	 * 通过Id获取具体获取具体材料
	 * @param id
	 * @return
	 */
	UserMaterial getUserMaterialById(int id);
	/**
	 * 通过Id获取具体获取具体任务道具
	 * @param id
	 * @return
	 */
	UserQuests getUserQuestsById(int id);
	/**
	 * 通过Id删除对应非装备类型的道具
	 * @param id
	 */
	void deleteFromUserItem(int id);
	/**
	 * 通过Id删除对应装备类型的道具
	 * @param id
	 */
	void deleteFromUserEquipment(int id);
	/**
	 * 给玩家插入拍卖的装备，用于拍卖行功能
	 * @param userEquipment
	 */
	void insertEquipmentForAuction(UserEquipment userEquipment);
	
	/**
	 * 给玩家插入拍卖的非装备类道具，用于拍卖行功能
	 * @param userItem
	 */
	void insertItemForAuction(UserItem userItem);
	/**
	 * 更改非装备类型的物品位置
	 * @param param
	 */
	void updateUserItemPostion(Map<String, Object> param);
	/**
	 * 更改装备位置
	 * @param param
	 */
	void updateUserEquipmentPosition(Map<String, Object> param);
	
	/**
	 * 获取包内所有物品的数量，一般用于判断背包上限
	 * @param characterId
	 * @return
	 */
	int getArticleAmount(int characterId);
	
	/**
	 * 用于更新装备强化属性和强化等级，用于装备强化
	 * @param userEquipment
	 */
	void updateEquipmentForStrength(UserEquipment userEquipment);
	
	/**
	 * 查看包里所有的宝石，用于宝石合成和镶嵌
	 * @param characterId
	 * @return
	 */
	List<UserMaterial> getGemStoneInBag(int characterId);
	/**
	 * 查看包里所有的打造材料，用于材料合成
	 * @param characterId
	 * @return
	 */
	List<UserMaterial> getMaterialForProduceInBag(int characterId);
	/**
	 * 更新装备镶空，用于宝石镶嵌
	 * @param userEquipment
	 */
	void updateEquipmentHole(UserEquipment userEquipment);
	void heroAddEquipment(Map<String, Object> param);
	void heroRemoveEuipment(Map<String, Object> param);
	void heroRemoveAllEuipment(Map<String, Object> param);
	int getAllUserEquipmentAmountInBag(Map<String, Object> param);
	List<UserEquipment> getAllUserEquipmentByPage(Map<String, Object> param);
	
	
	

}
