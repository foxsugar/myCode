package com.crystalcg.gamedev.util;

/**
 * 浮点数格式转换
 * @author xuzhongxing
 *
 */
public class FloatUtil {
	
	/**
	 * @param doubleValue
	 * @param suffixLength
	 * @return
	 */
	public static String format(double doubleValue,int suffixLength){
		String str = String.valueOf(doubleValue);
		int dotIndex = str.indexOf(".");
		if(dotIndex == -1){
			return str;
		}
		if(str.length()<=dotIndex+suffixLength){
			return str;
		}
		if(doubleValue-(int)doubleValue<Math.pow(10, - suffixLength)){
			str = str.substring(0, dotIndex);
		}else{
			str = str.substring(0, dotIndex+suffixLength+1);
		}
		return str;
	}
	
	
	public static void main(String[] args){
		System.out.println(FloatUtil.format(0.1011000, 2));
	}
}
