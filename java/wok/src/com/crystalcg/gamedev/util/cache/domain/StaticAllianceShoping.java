package com.crystalcg.gamedev.util.cache.domain;
/**
 * 联盟市场
 * @author zhaibiao
 *
 */
public class StaticAllianceShoping {
		private String shopingNo;
		private String itemNo;
		private int itemType;
		private int needAllianceLevel;
		private int sellLimit;
		private int price;
		private int buyLimit;
		public String getShopingNo() {
			return shopingNo;
		}
		public void setShopingNo(String shopingNo) {
			this.shopingNo = shopingNo;
		}
		public String getItemNo() {
			return itemNo;
		}
		public void setItemNo(String itemNo) {
			this.itemNo = itemNo;
		}
		public int getItemType() {
			return itemType;
		}
		public void setItemType(int itemType) {
			this.itemType = itemType;
		}
		public int getNeedAllianceLevel() {
			return needAllianceLevel;
		}
		public void setNeedAllianceLevel(int needAllianceLevel) {
			this.needAllianceLevel = needAllianceLevel;
		}
		public int getSellLimit() {
			return sellLimit;
		}
		public void setSellLimit(int sellLimit) {
			this.sellLimit = sellLimit;
		}
		public int getPrice() {
			return price;
		}
		public void setPrice(int price) {
			this.price = price;
		}
		public int getBuyLimit() {
			return buyLimit;
		}
		public void setBuyLimit(int buyLimit) {
			this.buyLimit = buyLimit;
		}
		
}
