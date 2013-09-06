package com.crystalcg.gamedev.util;

import java.util.Comparator;
import java.util.Map;

import net.sourceforge.pinyin4j.PinyinHelper;

public class NumericalComparator implements Comparator{

	@Override
	public int compare(Object arg0, Object arg1) {
		// TODO Auto-generated method stub
		@SuppressWarnings("unchecked")
		Map<String,Object> userFighting1 = (Map<String, Object>)arg0;
		@SuppressWarnings("unchecked")
		Map<String,Object> userFighting2 = (Map<String, Object>)arg1;
		String userName1=(String) userFighting1.get("name");
		String userName2=(String) userFighting2.get("name");
		int sequence = 0;
		if((Integer)userFighting1.get("numerical") > (Integer)userFighting2.get("numerical")){
			sequence= 1;
		}else if((Integer)userFighting1.get("numerical")==(Integer)userFighting2.get("numerical")){
			sequence=0;
		}else{
			sequence= -1;
		}
		if(sequence==0){	
			return comparepingyin(userName1, userName2);
		}else{
			return sequence;
		}
	}
	
	private int comparepingyin(String o1,String o2){
		 for (int i = 0; i < o1.length() && i < o2.length(); i++) { 

	         int codePoint1 = o1.charAt(i);
	         int codePoint2 = o2.charAt(i); 

	         if (Character.isSupplementaryCodePoint(codePoint1)
	                 || Character.isSupplementaryCodePoint(codePoint2)) {
	             i++;
	         } 
	         if (codePoint1 != codePoint2) {
	             if (Character.isSupplementaryCodePoint(codePoint1)
	                     || Character.isSupplementaryCodePoint(codePoint2)) {
	            	 if(codePoint1 - codePoint2>0){
	               	  return -1;
	                }else if(codePoint1 - codePoint2==0){
	               	  return 0;
	                }else{
	               	  return 1;
	                }
	             } 

	             String pinyin1 = pinyin((char) codePoint1);
	             String pinyin2 = pinyin((char) codePoint2); 

	             if (pinyin1 != null && pinyin2 != null) { // 两个字符都是汉字
	                 if (!pinyin1.equals(pinyin2)) {
	                      int falg = pinyin1.compareTo(pinyin2);
	                      if(falg>0){
	                    	  return -1;
	                      }else if(falg<0){
	                    	  return 1;
	                      }else{
	                    	  return 0;
	                      }
	                 }
	             } else {
	                  if(codePoint1 - codePoint2>0){
	                	  return -1;
	                 }else if(codePoint1 - codePoint2==0){
	                	  return 0;
	                 }else{
	                	  return 1;
	                 }
	             }
	         }
	     }
	     return o1.length() - o2.length();
	 } 

	 /**
	  * 字符的拼音，多音字就得到第一个拼音。不是汉字，就return null。
	  */
	 private String pinyin(char c) {
	     String[] pinyins = PinyinHelper.toHanyuPinyinStringArray(c);
	     if (pinyins == null) {
	         return null;
	     }
	     return pinyins[0];
	 }

}
