package com.crystalcg.gamedev.util.cache.domain;

public class StaticSpeedItem {
	private String itemNo;
	private int type;//加速效果类型1正向效果（缩短），-1负向效果（增加）
	private int functionType;//加速功能目标类型
	private int second;//（数值）时间单位秒
	public String getItemNo() {
		return itemNo;
	}
	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}
	public int getType() {
		return type;
	}
	/**
	 * 加速类型1正向效果（缩短），-1负向效果（增加）
	 * @param type
	 */
	public void setType(int type) {
		this.type = type;
	}
	/**
	 * 加速时间单位秒
	 * @return
	 */
	public int getSecond() {
		return second;
	}
	public void setSecond(int second) {
		this.second = second;
	}
	public int getFunctionType() {
		return functionType;
	}
	public void setFunctionType(int functionType) {
		this.functionType = functionType;
	}
}
