package com.crystalcg.gamedev.building.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.BuildingAlgorithm;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.cache.BuildingCache;
import com.crystalcg.gamedev.util.cache.domain.StaticBuilding;

/**
 * 主城内建筑
 * @author xuzhongxing
 *
 */
public class Building {
	@JsonIgnore
	private static Logger logger = LoggerFactory.getLogger(Building.class);
	@JsonIgnore
	private int id;
	@JsonIgnore
	private int characterId;
	@JsonIgnore
	private String buildingNo;
	@JsonIgnore
	private Date time;
	
	private int location;
	private int level;//用于查找前置建筑时判断
	
	private byte flag;//标记是否可以升级、是否可以降级（ 一级城墙和一级太尉府不可降级） 0：正常，1：不可升级，2：不可降级
	private ViewData view;
	
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

	public String getBuildingNo() {
		return buildingNo;
	}

	public void setBuildingNo(String buildingNo) {
		this.buildingNo = buildingNo;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public int getLocation() {
		return location;
	}

	public void setLocation(int location) {
		this.location = location;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public byte getFlag() {
		return flag;
	}

	public void setFlag(byte flag) {
		this.flag = flag;
	}

	public ViewData getView() {
		if(view == null){
			initView();
		}
		return view;
	}

	public void setView(ViewData view) {
		this.view = view;
	}

	public void initView(){
		//当前建筑
		StaticBuilding cur = BuildingCache.getBuildingEntityByNo(buildingNo);
		if(cur == null){
			logger.error("未知的建筑编号：" + buildingNo);
			return;
		}
		view = new ViewData();
		view.name = cur.getBuildingName();
		view.img = cur.getImage();
		view.desc = cur.getBuildingDesc();
		view.effect1 = cur.getFunction1();
		view.effect2 = cur.getFunction2();
		view.effect3 = cur.getFunction3();
		view.effect4 = cur.getFunction4();
		view.value1 = cur.getFunctionvalue1();
		view.value2 = cur.getFunctionvalue2();
		view.value3 = cur.getFunctionvalue3();
		view.value4 = cur.getFunctionvalue4();
		//建筑编号拆分
		String separater = "_";
		String[] array = buildingNo.split(separater);
		String prefix = array[0];
		int level = Integer.parseInt(array[1]);
		//取上一级别建筑
		if(level < 1 || Const.WALL_BUILDING_NO.equals(buildingNo) || Const.OFFICAIL_BUILDING_NO.equals(buildingNo)){
			flag = 2;//不可拆除
		}else{
			StringBuilder sb = new StringBuilder();
			sb.append(prefix);
			sb.append(separater);
			sb.append(level - 1);
			StaticBuilding last = BuildingCache.getBuildingEntityByNo(sb.toString());
			if(last == null){
				logger.error("未知的建筑编号：" + sb.toString());
			}else{
				view.lastValue1 = last.getFunctionvalue1();
				view.lastValue2 = last.getFunctionvalue2();
				view.lastValue3 = last.getFunctionvalue3();
				view.lastValue4 = last.getFunctionvalue4();
				view.returnStone = BuildingAlgorithm.getDemolitionReturnStone(cur.getNeedStone());
				view.returnWood = BuildingAlgorithm.getDemolitionReturnWood(cur.getNeedWood());
				view.demolishTime = BuildingAlgorithm.calculateDemolitionTime(characterId, cur.getUpgradeTime());
			}
		}
		//取下一级别建筑
		if(level >= Const.MAX_BUILDING_LEVEL){
			flag = 1;//不可升级
		}else{
			StringBuilder sb = new StringBuilder();
			sb = new StringBuilder();
			sb.append(prefix);
			sb.append(separater);
			sb.append(level + 1);
			StaticBuilding next = BuildingCache.getBuildingEntityByNo(sb.toString());
			if(next == null){
				logger.error("未知的建筑编号：" + sb.toString());
			}else{
				view.nextValue1 = next.getFunctionvalue1();
				view.nextValue2 = next.getFunctionvalue2();
				view.nextValue3 = next.getFunctionvalue3();
				view.nextValue4 = next.getFunctionvalue4();
				view.needWood = next.getNeedWood();
				view.needStone = next.getNeedStone();
				view.needIronore = next.getNeedIronore();
				view.needMoney = next.getNeedMoney();
				view.upgradeTime = BuildingAlgorithm.calculateBuildTime(characterId, next.getUpgradeTime());
			}
		}
		
	}
	
	/**
	 * @author xuzhongxing
	 * 返回客户端所需数据
	 */
	public class ViewData{
		private String name;
		private String img;
		private String desc;
		//建筑的效果类型
		private int effect1;
		private int effect2;
		private int effect3;
		private int effect4;
		//当前效果值
		private double value1;
		private double value2;
		private double value3;
		private double value4;
		//上一级效果值
		private double lastValue1;
		private double lastValue2;
		private double lastValue3;
		private double lastValue4;
		//下一级效果值
		private double nextValue1;
		private double nextValue2;
		private double nextValue3;
		private double nextValue4;
		//升级消耗
		private long needWood;
		private long needStone;
		private long needIronore;
		private long needMoney;
		private long upgradeTime;
		//降级返回资源，消耗时间
		private long returnWood;
		private long returnStone;
		private long demolishTime;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getImg() {
			return img;
		}
		public void setImg(String img) {
			this.img = img;
		}
		public String getDesc() {
			return desc;
		}
		public void setDesc(String desc) {
			this.desc = desc;
		}
		public int getEffect1() {
			return effect1;
		}
		public void setEffect1(int effect1) {
			this.effect1 = effect1;
		}
		public int getEffect2() {
			return effect2;
		}
		public void setEffect2(int effect2) {
			this.effect2 = effect2;
		}
		public int getEffect3() {
			return effect3;
		}
		public void setEffect3(int effect3) {
			this.effect3 = effect3;
		}
		public int getEffect4() {
			return effect4;
		}
		public void setEffect4(int effect4) {
			this.effect4 = effect4;
		}
		public double getValue1() {
			return value1;
		}
		public void setValue1(double value1) {
			this.value1 = value1;
		}
		public double getValue2() {
			return value2;
		}
		public void setValue2(double value2) {
			this.value2 = value2;
		}
		public double getValue3() {
			return value3;
		}
		public void setValue3(double value3) {
			this.value3 = value3;
		}
		public double getValue4() {
			return value4;
		}
		public void setValue4(double value4) {
			this.value4 = value4;
		}
		public double getLastValue1() {
			return lastValue1;
		}
		public void setLastValue1(double lastValue1) {
			this.lastValue1 = lastValue1;
		}
		public double getLastValue2() {
			return lastValue2;
		}
		public void setLastValue2(double lastValue2) {
			this.lastValue2 = lastValue2;
		}
		public double getLastValue3() {
			return lastValue3;
		}
		public void setLastValue3(double lastValue3) {
			this.lastValue3 = lastValue3;
		}
		public double getLastValue4() {
			return lastValue4;
		}
		public void setLastValue4(double lastValue4) {
			this.lastValue4 = lastValue4;
		}
		public double getNextValue1() {
			return nextValue1;
		}
		public void setNextValue1(double nextValue1) {
			this.nextValue1 = nextValue1;
		}
		public double getNextValue2() {
			return nextValue2;
		}
		public void setNextValue2(double nextValue2) {
			this.nextValue2 = nextValue2;
		}
		public double getNextValue3() {
			return nextValue3;
		}
		public void setNextValue3(double nextValue3) {
			this.nextValue3 = nextValue3;
		}
		public double getNextValue4() {
			return nextValue4;
		}
		public void setNextValue4(double nextValue4) {
			this.nextValue4 = nextValue4;
		}
		public long getNeedWood() {
			return needWood;
		}
		public void setNeedWood(long needWood) {
			this.needWood = needWood;
		}
		public long getNeedStone() {
			return needStone;
		}
		public void setNeedStone(long needStone) {
			this.needStone = needStone;
		}
		public long getNeedIronore() {
			return needIronore;
		}
		public void setNeedIronore(long needIronore) {
			this.needIronore = needIronore;
		}
		public long getNeedMoney() {
			return needMoney;
		}
		public void setNeedMoney(long needMoney) {
			this.needMoney = needMoney;
		}
		public long getUpgradeTime() {
			return upgradeTime;
		}
		public void setUpgradeTime(long upgradeTime) {
			this.upgradeTime = upgradeTime;
		}
		public long getReturnWood() {
			return returnWood;
		}
		public void setReturnWood(long returnWood) {
			this.returnWood = returnWood;
		}
		public long getReturnStone() {
			return returnStone;
		}
		public void setReturnStone(long returnStone) {
			this.returnStone = returnStone;
		}
		public long getDemolishTime() {
			return demolishTime;
		}
		public void setDemolishTime(long demolishTime) {
			this.demolishTime = demolishTime;
		}
	}
	
}
