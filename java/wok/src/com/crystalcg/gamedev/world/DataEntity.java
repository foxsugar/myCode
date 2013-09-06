package com.crystalcg.gamedev.world;

public class DataEntity {

	private int x;
	private int y;
	private int tr;// 地形：0草地,1森林,2山地,3湖泊,4沙漠
	private int tp;// 地块类型：0空地，1可建城点，2玩家城池
	private int r; // 资源产量，暂时使用-->改为国家id
	private int ct;// 国家

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	public int getTr() {
		return tr;
	}

	public int getTp() {
		return tp;
	}

	public int getR() {
		return r;
	}

	public int getCt() {
		return ct;
	}

	public void setX(int x) {
		this.x = x;
	}

	public void setY(int y) {
		this.y = y;
	}

	public void setTr(int tr) {
		this.tr = tr;
	}

	public void setTp(int tp) {
		this.tp = tp;
	}

	public void setR(int r) {
		this.r = r;
	}

	public void setCt(int ct) {
		this.ct = ct;
	}

}
