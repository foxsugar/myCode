package com.crystalcg.gamedev.buildingFunction.domain;
/**
 * 地窖保护表
 */
import java.util.Date;

public class UserCellar {
		private int id;
		private int characterId;
		private int protectionNo;
		private int protectionAmount;
		private Date protectionTime;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public int getCharacterId() {
			return characterId;
		}
		public void setCharacterId(int characterId) {
			this.characterId = characterId;
		}
		public int getProtectionNo() {
			return protectionNo;
		}
		public void setProtectionNo(int protectionNo) {
			this.protectionNo = protectionNo;
		}
		public int getProtectionAmount() {
			return protectionAmount;
		}
		public void setProtectionAmount(int protectionAmount) {
			this.protectionAmount = protectionAmount;
		}
		public Date getProtectionTime() {
			return protectionTime;
		}
		public void setProtectionTime(Date protectionTime) {
			this.protectionTime = protectionTime;
		}
	    
}
