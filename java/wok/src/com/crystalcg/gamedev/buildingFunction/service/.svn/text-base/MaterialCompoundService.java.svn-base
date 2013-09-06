package com.crystalcg.gamedev.buildingFunction.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.RandomFunc;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.MaterialCache;
import com.crystalcg.gamedev.util.cache.domain.StaticMaterial;

/**
 * 材料合成,合成规则同宝石合成，所以，使用宝石合成的静态信息
 * @author jinganyang
 *
 */
public class MaterialCompoundService {
	
	public static final int MAX_MATERIAL_LEVEL = 10;
	/**
	 * 材料合成操作
	 * @param ids
	 * @param characterId
	 * @throws AppException
	 */
	public Map<String, Object> fuseMaterial(int[] ids, int characterId) throws AppException{
		int baseAmount = ids.length;
		if(baseAmount>GemstoneService.MAX_AMOUNT||baseAmount<GemstoneService.MIN_AMOUNT){
			throw new AppException("材料数量错误");
		}
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		if(userItemService.getTreasuryRemain(characterId)<=0){
			throw new AppException("背包空间不足");
		}
		Map<Integer, Map<String, Integer>> params = new HashMap<Integer, Map<String,Integer>>();
		Map<String, Integer> temp;
		for(int i:ids){//判断是否是同一组材料
			if(params.get(i)==null){
				temp = new HashMap<String, Integer>();
				temp.put("id", i);
				temp.put("amount", 1);//第一次插入，数量为1
				params.put(i, temp);
			}else{
				params.get(i).put("amount", params.get(i).get("amount")+1);
			}
		}
		Iterator<Map<String, Integer>> it = params.values().iterator();
		List<UserMaterial> userMaterials = new ArrayList<UserMaterial>();
		String itemNo = null;
		int isBound = Const.IS_NOT_BIND_STATE;
		int materialLevel = 0;
		int needMoney = 0;
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		while(it.hasNext()){
			Map<String, Integer> param = it.next();
			UserMaterial userMaterial = userItemService.getUserMaterialById(param.get("id"));
			//验证材料
			validateMaterial(param, userMaterial, characterId);
			if(materialLevel==0){
				materialLevel = userMaterial.getMaterial().getMaterialLevel();
				needMoney = GemstoneService.countNeedMont(ids.length, materialLevel);
				if(maincity.getMoney()<needMoney){
					throw new AppException("铜币不足");
				}
			}
			if(itemNo==null){
				itemNo = userMaterial.getItemNo();
			}else if(!itemNo.equals(userMaterial.getItemNo())){
				throw new AppException("合成材料必须是同一种");
			}
			if(userMaterial.getIsBound()!=isBound&&isBound==Const.IS_NOT_BIND_STATE){
				isBound = Const.IS_BIND_STATE;
			}
			userMaterial.setItemAmount(userMaterial.getItemAmount()-param.get("amount"));
			userMaterials.add(userMaterial);
		}
		//更新铜币
		maincityService.addMoney(characterId,-needMoney);
		return produceAndUpdateMaterial(userMaterials, baseAmount, isBound);
	}
	/**
	 * 验证所选宝石条件
	 * @param param
	 * @param userMaterial
	 * @param characterId
	 * @throws AppException
	 */
	private void validateMaterial(Map<String, Integer> param, UserMaterial userMaterial, int characterId) throws AppException{
		if(userMaterial == null){
			throw new AppException("材料不存在");
		}
		if(userMaterial.getCharacterId()!=characterId){
			throw new AppException("材料不存在");
		}
		if(userMaterial.getItemPosition()!=Const.POSITION_BAG){
			throw new AppException("材料不存在");
		}
		if(userMaterial.getItemType() != Const.TYPE_MATERIAL || userMaterial.getMaterial().getMaterialType() != Const.MATERIAL_TYPE_MATERIAL_FOR_PRODUCE){
			throw new AppException("请选择一个材料");
		}
		if(userMaterial.getItemAmount()<param.get("amount")){
			throw new AppException("材料数量不足");
		}
		if(userMaterial.getMaterial().getMaterialLevel()==MAX_MATERIAL_LEVEL){
			throw new AppException("材料等级已达到最高级");
		}
	}
	/**
	 * 非通用方法，扣除合成宝石，如果合成成功添加新宝石
	 * @param userMaterials
	 * @param baseAmount
	 * @param isBound
	 * @throws AppException
	 */
	private final Map<String, Object> produceAndUpdateMaterial(List<UserMaterial> userMaterials, int baseAmount, int isBound) throws AppException{
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		for(UserMaterial i:userMaterials){
			if(i.getItemAmount()==0){
				userItemService.deleteFromUserItem(i.getId());
			}else{
				userItemService.updateUserItemAmount(i.getId(), i.getItemAmount());
			}
		}
		Double compoundRate = Const.GEMSTONE_COMPOUND_RATE_MAP.get(baseAmount);
		if(compoundRate==null){
			throw new AppException("材料合成基数错误");
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		//任务
		QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
		questService.updateQuestSchedule(QuestTargeType.FUSE_ARTICAL, null, userMaterials.get(0).getCharacterId());
		if(RandomFunc.isSuccessful(compoundRate)){
			String itemNo=userMaterials.get(0).getMaterial().getMaterialNo();
			int characterId = userMaterials.get(0).getCharacterId();
			String[] itemNoSplit = itemNo.split("_");
			int gemstoneLevel = Integer.valueOf(itemNoSplit[1]);
			String newItemNo = itemNoSplit[0]+"_"+(gemstoneLevel+1);
			userItemService.addItem2character(characterId, newItemNo, Const.TYPE_MATERIAL, 1, 0, isBound);
			StaticMaterial material = MaterialCache.getMaterialByNo(newItemNo);
			UserMaterial userMaterial = new UserMaterial(material,isBound);
			retMap.put("isSuccess", true);
			retMap.put("successMaterial", changeMaterial(userMaterial));
			return retMap;
		}else{
			retMap.put("isSuccess", false);
			return retMap;
		}
		
	}
	
	
	/**
	 * 获得包内宝石
	 * @param charId
	 * @return
	 */
	public List<UserMaterial> getMaterialInBag(int characterId){
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		return userItemService.getMaterialForProduceInBag(characterId);
	}
	private final Map<String, Object> changeMaterial(UserMaterial userMaterial){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("icon", userMaterial.getMaterial().getIcon());
		retMap.put("type", userMaterial.getItemType());
		retMap.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(userMaterial));
		return retMap;
	}
}
