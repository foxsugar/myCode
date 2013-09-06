package com.crystalcg.gamedev.util.cache.domain;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.util.cache.EquipmentCache;
import com.crystalcg.gamedev.util.cache.MaterialCache;

/**
 * 装备图样静态表
 * @author xuzhongxing
 *
 */
public class StaticProducePlan {

	private String planNo; // 图样编码
	private String productionNo; // 产品编号前缀，需要跟品级合成完整装备编号
	private String needMaterialNo; // 需要的材料编码前缀
	private int needMaterialAmount; // 需要材料个数
	private int needBaseMoney; // 需求铜币数基数
	////表中不存在，重写get方法
	public String getPlanNo() {
		return planNo;
	}

	public String getProductionNo() {
		return productionNo;
	}

	public String getNeedMaterialNo() {
		return needMaterialNo;
	}

	public int getNeedMaterialAmount() {
		return needMaterialAmount;
	}

	public int getNeedBaseMoney() {
		return needBaseMoney;
	}

	public void setPlanNo(String planNo) {
		this.planNo = planNo;
	}

	public void setProductionNo(String productionNo) {
		this.productionNo = productionNo;
	}

	public void setNeedMaterialNo(String needMaterialNo) {
		this.needMaterialNo = needMaterialNo;
	}

	public void setNeedMaterialAmount(int needMaterialAmount) {
		this.needMaterialAmount = needMaterialAmount;
	}

	public void setNeedBaseMoney(int needBaseMoney) {
		this.needBaseMoney = needBaseMoney;
	}

	/**
	 * 获取图样名称
	 * @return
	 */
	public String getPlanName() {
		return MaterialCache.getMaterialByNo(planNo).getMaterialName();
	}

	/**
	 * 获取该图样可打造的装备类型
	 * @return
	 */
	public int getProduceType() throws AppException{
		StaticEquipment equipment = EquipmentCache.getEquipmentByNo(productionNo+"_"+1);
		if(equipment == null){
			return 0;
		}
		return equipment.getEquipmentType();
	}
	/**
	 * 获取该图样可打造的装备名称
	 * @return
	 */
	public String getProduceName() throws AppException{
		StaticEquipment equipment = EquipmentCache.getEquipmentByNo(productionNo+"_"+1);
		if(equipment == null){
			return null;
		}
		return equipment.getEquipmentName();
	}

}
