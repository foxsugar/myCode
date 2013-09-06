package com.crystalcg.gamedev.friend.domain;

import java.util.Date;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.crystalcg.gamedev.util.cache.CountryCache;

public class FriendInfo implements Comparable<FriendInfo>{
	private int id;
	private String friendName;
	@JsonIgnore
	private int friendCountryId;
	private int friendLevel;
	private String friendLeague;
	private int friendMaincityLevel;
	@JsonIgnore
	private Date loginTime;
	@JsonIgnore
	private Date logoutTime;
	private int friendId;
	@JsonIgnore
	private int friendX;
	@JsonIgnore
	private int friendY;
	@JsonIgnore
	private int mineX;
	@JsonIgnore
	private int mineY;
	private boolean selected;//选择状态，0为未选择，1选择;
	
	public int getLineTime(){
		return (int)(Math.pow((Math.pow(friendX-mineX, 2)+Math.pow(friendY-mineY, 2)), 0.5));//假的路程，以后需要计算
	}
	public String getLoginStatus(){
		if(logoutTime==null){
			return "在线";
		}
		long time = logoutTime.getTime() - loginTime.getTime();
		long timeTemp = time/1000;
//		long second = 
//		long minute = time/60000;
//		long hour = time/3600000;
//		long day = time/86400000;
//		long month = time/2592000000L;
		if(time<0){
			return "在线";  
		}
		if(timeTemp<60){
			return "少于1分钟";
		}else{
			timeTemp/=60;
		}
		if(timeTemp<60){
			return timeTemp+"分钟前";
		}else{
			timeTemp/=60;
		}
		if(timeTemp<24){
			return timeTemp+"小时前";
		}else{
			timeTemp/=24;
		}
		if(timeTemp<30){
			return timeTemp+"天前";
		}else{
			timeTemp/=30;
		}
		if(timeTemp<12){
			return timeTemp+"月前";
		}else{
			timeTemp/=12;
		}
		return timeTemp+"年前";
	}
	public int getId() {
		return id;
	}
	public String getFriendName() {
		return friendName;
	}
	public int getFriendCountryId() {
		return friendCountryId;
	}
	public int getFriendLevel() {
		return friendLevel;
	}
	public String getFriendLeague() {
		return friendLeague;
	}
	public int getFriendMaincityLevel() {
		return friendMaincityLevel;
	}
	public Date getLoginTime() {
		return loginTime;
	}
	public Date getLogoutTime() {
		return logoutTime;
	}
	public int getFriendX() {
		return friendX;
	}
	public int getFriendY() {
		return friendY;
	}
	public int getMineX() {
		return mineX;
	}
	public int getMineY() {
		return mineY;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setFriendName(String friendName) {
		this.friendName = friendName;
	}
	public void setFriendCountryId(int friendCountryId) {
		this.friendCountryId = friendCountryId;
	}
	public void setFriendLevel(int friendLevel) {
		this.friendLevel = friendLevel;
	}
	public void setFriendLeague(String friendLeague) {
		this.friendLeague = friendLeague;
	}
	public void setFriendMaincityLevel(int friendMaincityLevel) {
		this.friendMaincityLevel = friendMaincityLevel;
	}
	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}
	public void setLogoutTime(Date logoutTime) {
		this.logoutTime = logoutTime;
	}
	public void setFriendX(int friendX) {
		this.friendX = friendX;
	}
	public void setFriendY(int friendY) {
		this.friendY = friendY;
	}
	public void setMineX(int mineX) {
		this.mineX = mineX;
	}
	public void setMineY(int mineY) {
		this.mineY = mineY;
	}
	@Override
	public int compareTo(FriendInfo o) {
		// TODO Auto-generated method stub
		char[] name1 = friendName.toCharArray();//自己
		char[] name2 = o.getFriendName().toCharArray();//对比的
		int size = name1.length<name2.length?name1.length:name2.length;
		for(int i=0;i<size;i++){
			if(Character.toString(name1[i]).matches("[\\一-\\龥]+")&&name2[i]<123&&name2[i]>64){
				return 1;
			}else if(Character.toString(name2[i]).matches("[\\一-\\龥]+")&&name1[i]<123&&name1[i]>64){
				return -1;
			}else if(Character.toString(name1[i]).matches("[\\一-\\龥]+")&&Character.toString(name2[i]).matches("[\\一-\\龥]+")){
				//都是汉字
				if(name1[i]==name2[i]){
					continue;
				}else{
					return compareChar(name1[i], name2[i]);
				}
			}else if(name1[i]<123&&name1[i]>64&&name2[i]<123&&name2[i]>64){
				//都是字母
				if(name1[i]==name2[i]){
					continue;
				}else{
					return compareAlphabet(name1[i], name2[i]);
				}
			}
		}
		
		return name1.length<name2.length?-1:1;
	}
	private int compareAlphabet(char a, char b){
		if(a>64&&a<91&&b>64&&b<91){
			//都是大写字母
			return a>b?1:-1;
		}else if(a>96&&a<123&&b>96&&b<123){
			//都是小写字母
			return a>b?1:-1;
		}else if(a>64&&a<91&&b>96&&b<123){
			//a大写字母，b小写字母
			return 1;
		}else if(a>96&&a<123&&b>64&&b<91){
			//a小写字母，b大写字母
			return -1;
		}else{
			System.out.println("排序错误");
			return 0;
		}
	}
	private int compareChar(char a, char b){
		HanyuPinyinOutputFormat pinyinFormat = new HanyuPinyinOutputFormat();
		pinyinFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
		pinyinFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		pinyinFormat.setVCharType(HanyuPinyinVCharType.WITH_V);
		String sa = PinyinHelper.toHanyuPinyinStringArray(a)[0];
		String sb = PinyinHelper.toHanyuPinyinStringArray(b)[0];
		char[] sac = sa.toCharArray();
		char[] sbc = sb.toCharArray();
		int result = comparePinyin(sac, sbc);
		if(result!=0){
			return result;
		}else{
			return a>b?1:-1;
		}
	}
	private int comparePinyin(char[] sac, char[] sbc){
		int size = sac.length<sbc.length?sac.length:sbc.length;
		for(int i=0;i<size;i++){
			int result = comparePinyinzimu(sac[i], sbc[i]);
			if(result!=0){
				return result;
			}
		}
		if(sac.length==sbc.length){
			return 0;
		}else{
			return sac.length<sbc.length?-1:1;
		}
	}
	private int comparePinyinzimu(char a, char b){
		if(a==b){
			return 0;
		}else if(a>b){
			return 1;
		}else{
			return -1;
		}
	}
	public static void main(String[] args){

	}
	public int getFriendId() {
		return friendId;
	}
	public void setFriendId(int friendId) {
		this.friendId = friendId;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	public String getFriendCountry(){
		return CountryCache.getNameById(friendCountryId);
	}
}
