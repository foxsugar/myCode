package com.crystalcg.gamedev.alliance.domain;
/**
 * 
 * @author zhaibiao
 * 联盟
 */
public class Alliance {
    private  int id;
    private  String name;//名称
    private  String banner;//旗帜
    private String country;//所属国家
    private  String chief;//盟主
    private  int level;//等级
    private  int ownCountry;//拥有城郡
    private  int memberAmount;//成员数量
    private  int wealth;//财富值
    private  String bulletin;//联盟公告
    private  String introduction;//联盟介绍
    private int friendStatus;//友盟状态，0：没有，1：有
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBanner() {
		return banner;
	}
	public void setBannar(String banner) {
		this.banner = banner;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getChief() {
		return chief;
	}
	public void setChief(String chief) {
		this.chief = chief;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getOwnCountry() {
		return ownCountry;
	}
	public void setOwnCountry(int ownCountry) {
		this.ownCountry = ownCountry;
	}
	public int getMemberAmount() {
		return memberAmount;
	}
	public void setMemberAmount(int memberAmount) {
		this.memberAmount = memberAmount;
	}
	public int getWealth() {
		return wealth;
	}
	public void setWealth(int wealth) {
		this.wealth = wealth;
	}
	public String getBulletin() {
		return bulletin;
	}
	public void setBulletin(String bulletin) {
		this.bulletin = bulletin;
	}
	public String getIntroduction() {
		return introduction;
	}
	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	public int getFriendStatus() {
		return friendStatus;
	}
	public void setFriendStatus(int friendStatus) {
		this.friendStatus = friendStatus;
	}
        
}
