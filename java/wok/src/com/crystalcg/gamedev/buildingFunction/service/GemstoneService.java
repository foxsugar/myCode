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
 * 宝石合成
 * @author jinganyang
 *
 */
public class GemstoneService {
	
	
	public static final int MIN_AMOUNT = 3;
	public static final int MAX_AMOUNT = 5;
	public static final List<Integer> SUCCESS_RATE = new ArrayList<Integer>() ;
	public static final List<Double> FACTORS = new ArrayList<Double>();
	public static final Map<Integer,Double> FACTOR_MAP = new HashMap<Integer,Double>();
	public static final int FUSE_BASE_MONEY = 1000;
	public static final int MAX_GEMSTONE_LEVEL = 7;
	
	static{
		getSuccessRate();
	}
	
	
	/**
	 * 合成宝石操作
	 * @param ids
	 * @param characterId
	 * @throws AppException
	 */
	public Map<String, Object> fuseGemstone(int[] ids, int characterId) throws AppException{
		int baseAmount = ids.length;
		if(baseAmount>MAX_AMOUNT||baseAmount<MIN_AMOUNT){
			throw new AppException("宝石数量错误");
		}
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		if(userItemService.getTreasuryRemain(characterId)<=0){
			throw new AppException("背包空间不足");
		}
		Map<Integer, Map<String, Integer>> params = new HashMap<Integer, Map<String,Integer>>();
		Map<String, Integer> temp;
		for(int i:ids){
			if(params.get(i)==null){
				temp = new HashMap<String,Integer>();
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
		int gemstoneLevel = 0;
		int needMoney = 0;
		MaincityService maincityService = (MaincityService)ServiceLocator.getSpringBean("maincityService");
		Maincity maincity = maincityService.getMaincity(characterId);
		while(it.hasNext()){
			Map<String, Integer> param = it.next();
			UserMaterial userMaterial = userItemService.getUserMaterialById(param.get("id"));
			validateMaterial(param, userMaterial, characterId);
			if(gemstoneLevel==0){
				gemstoneLevel = userMaterial.getMaterial().getGemstoneLevel();
				needMoney = countNeedMont(ids.length, gemstoneLevel);
				if(maincity.getMoney()<needMoney){
					throw new AppException("铜币不足");
				}
			}
			if(itemNo==null){
				itemNo = userMaterial.getItemNo();
			}else if(!itemNo.equals(userMaterial.getItemNo())){
				throw new AppException("合成宝石必须要同一种宝石");
			}
			if(userMaterial.getIsBound()!=isBound&&isBound==Const.IS_NOT_BIND_STATE){
				isBound = Const.IS_BIND_STATE;
			}
			userMaterial.setItemAmount(userMaterial.getItemAmount()-param.get("amount"));
			userMaterials.add(userMaterial);
		}
		//更新铜币
		maincityService.addMoney(characterId, -needMoney);
		return produceAndUpdateGemstone(userMaterials, baseAmount, isBound);
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
			throw new AppException("宝石不存在");
		}
		if(userMaterial.getCharacterId()!=characterId){
			throw new AppException("宝石不存在");
		}
		if(userMaterial.getItemPosition()!=Const.POSITION_BAG){
			throw new AppException("宝石不存在");
		}
		if(userMaterial.getItemType() != Const.TYPE_MATERIAL || userMaterial.getMaterial().getMaterialType() != Const.SUBTYPE_STONE){
			throw new AppException("请选择一个宝石");
		}
		if(userMaterial.getItemAmount()<param.get("amount")){
			throw new AppException("宝石数量不足");
		}
		if(userMaterial.getMaterial().getGemstoneLevel()==MAX_GEMSTONE_LEVEL){
			throw new AppException("宝石等级已达到最高级");
		}
	}
	/**
	 * 非通用方法，扣除合成宝石，如果合成成功添加新宝石
	 * @param userMaterials
	 * @param baseAmount
	 * @param isBound
	 * @throws AppException
	 */
	private Map<String, Object> produceAndUpdateGemstone(List<UserMaterial> userMaterials, int baseAmount, int isBound) throws AppException{
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
			throw new AppException("宝石合成基数错误");
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
			retMap.put("successGemstone", changeStone(userMaterial));
			return retMap;
		}else{
			retMap.put("isSuccess", false);
			return retMap;
		}
	}
	
	
	/**
	 * 获取成功率
	 * @return
	 */
	public static void getSuccessRate(){
		Iterator<Double> it = Const.GEMSTONE_COMPOUND_RATE_MAP.values().iterator();
		while (it.hasNext()) {
			double rate =  it.next()*100;
			SUCCESS_RATE.add((int)rate);
		}
		FACTORS.add(0.1);
		FACTORS.add(0.5);
		FACTORS.add(1.0);
		FACTOR_MAP.put(3, 0.1);
		FACTOR_MAP.put(4, 0.5);
		FACTOR_MAP.put(5, 1.0);
	}
	
	/**
	 * 获得包内宝石
	 * @param charId
	 * @return
	 */
	public List<UserMaterial> getGemStoneInBag(int characterId){
		UserItemService userItemService = (UserItemService)ServiceLocator.getSpringBean("userItemService");
		return userItemService.getGemStoneInBag(characterId);
	}
	public static int countNeedMont(int amount, int level){
		double factor = FACTOR_MAP.get(amount);
		double money = FUSE_BASE_MONEY*Math.pow(2, level)*factor;
		return (int)money;
	}
	private final Map<String, Object> changeStone(UserMaterial userMaterial){
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("icon", userMaterial.getMaterial().getIcon());
		retMap.put("type", userMaterial.getItemType());
		retMap.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(userMaterial));
		return retMap;
	}
}
