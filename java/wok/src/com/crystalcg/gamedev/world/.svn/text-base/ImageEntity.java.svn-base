package com.crystalcg.gamedev.world;


import java.io.DataInputStream;
import java.io.IOException;

/**
 * 图元
 * @author xuzhongxing
 *
 */
public class ImageEntity {
	
	public static final int BASE_WIDTH = 200;
	public static final int BASE_HEIGHT = 100;
	private int x;
	private int y;
	private String b;
	private String f;
	
	public void read(DataInputStream di) throws IOException{
		x = di.readInt();
		y = di.readInt();
		b = di.readUTF();
		if("null".equals(b)){//空字符串
			b = null;
		}
		di.skipBytes(8);
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}


	public void setX(int x) {
		this.x = x;
	}

	public void setY(int y) {
		this.y = y;
	}

	public String getB() {
		return b;
	}

	public String getF() {
		return f;
	}

	public void setB(String b) {
		this.b = b;
	}

	public void setF(String f) {
		this.f = f;
	}

}
