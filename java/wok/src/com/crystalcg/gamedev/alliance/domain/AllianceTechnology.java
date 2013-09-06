package com.crystalcg.gamedev.alliance.domain;
 /**
  * 联盟科技
  * @author zhaibiao
  *
  */
public class AllianceTechnology {
        private int id;
        private int allianceId;
        private String technologyNo;
        private int level;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public int getAllianceId() {
			return allianceId;
		}
		public void setAllianceId(int allianceId) {
			this.allianceId = allianceId;
		}
		public String getTechnologyNo() {
			return technologyNo;
		}
		public void setTechnologyNo(String technologyNo) {
			this.technologyNo = technologyNo;
		}
		public int getLevel() {
			return level;
		}
		public void setLevel(int level) {
			this.level = level;
		}
        
}
