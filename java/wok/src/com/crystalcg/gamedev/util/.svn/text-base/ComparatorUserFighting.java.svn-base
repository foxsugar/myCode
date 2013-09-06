package com.crystalcg.gamedev.util;

import java.util.Comparator;
import java.util.Map;

import net.sourceforge.pinyin4j.PinyinHelper;

public class ComparatorUserFighting implements Comparator{

	@Override
	public int compare(Object arg0, Object arg1) {
		// TODO Auto-generated method stub
	    double d = 0.0001;
//		Collator collator =Collator.getInstance(java.util.Locale.CHINA);
		@SuppressWarnings("unchecked")
		Map<String,Object> userFighting1 = (Map<String, Object>)arg0;
		@SuppressWarnings("unchecked")
		Map<String,Object> userFighting2 = (Map<String, Object>)arg1;
//		String userName1=toUTF_8((String) userFighting1.get("characterName"));
//		String userName2=toUTF_8((String) userFighting1.get("characterName"));
		String userName1=(String) userFighting1.get("characterName");
		String userName2=(String) userFighting2.get("characterName");
		int fighting = 0;
		if((Double)userFighting1.get("fighting") > (Double)userFighting2.get("fighting")){
			 fighting= 1;
		}else if(Math.abs((Double)userFighting1.get("fighting")-((Double)userFighting2.get("fighting")))<d){
			 fighting=0;
		}else{
			 fighting= -1;
		}
		if(fighting==0){	
//			char[] name1 = userName1.toCharArray();//自己
//			char[] name2 = userName2.toCharArray();//对比的
			
			return comparepingyin(userName1, userName2);
			
			
//			int size = name1.length<name2.length?name1.length:name2.length;
//			for(int i=0;i<size;i++){
//				if(name1[i]>47&&name1[i]<58&&(name2[i]<123&&name2[i]>64||(Character.toString(name2[i]).matches("[\\一-\\龥]+")))){
//					return -1;
//				}else if(name2[i]>47&&name2[i]<58&&(name1[i]<123&&name1[i]>6||(Character.toString(name1[i]).matches("[\\一-\\龥]+")))){
//					return 1;
//				}else if(name2[i]>47&&name2[i]<58&&name1[i]>47&&name1[i]<58){
//					if(name1[i]==name2[i]){
//						continue;
//					}else{
//						return compareNumber(name1[i],name2[i]);
//					}
//				}else if(name1[i]>47&&name1[i]<58&&name2[i]>47&&name2[i]<58){
//					if(name1[i]==name2[i]){
//						continue;
//					}else{
//						return compareNumber(name1[i],name2[i]);
//					}
//				}else if(Character.toString(name1[i]).matches("[\\一-\\龥]+")&&name2[i]<123&&name2[i]>64){
//					return 1;
//				}else if(Character.toString(name2[i]).matches("[\\一-\\龥]+")&&name1[i]<123&&name1[i]>64){
//					return -1;
//				}else if(Character.toString(name1[i]).matches("[\\一-\\龥]+")&&Character.toString(name2[i]).matches("[\\一-\\龥]+")){
//					//都是汉字
//					if(name1[i]==name2[i]){
//						continue;
//					}else{
//						return comparepingyin(new String(name1), new String(name2));//双方法
//					}
//				}else if(name1[i]<123&&name1[i]>64&&name2[i]<123&&name2[i]>64){
//					//都是字母
//					if(name1[i]==name2[i]){
//						continue;
//					}else{
//						return compareAlphabet(name1[i], name2[i]);
//					}
//				}
//			}
//			
//			return name1.length<name2.length?-1:1;		
//		     return collator.getCollationKey(name1.toLowerCase()).compareTo(collator.getCollationKey(name2.toLowerCase()));
	    }else{
		   return fighting;
	      }
		}
//private int compareAlphabet(char a, char b){
//	if(a>64&&a<91&&b>64&&b<91){
//		//都是大写字母
//		return a>b?-1:1;
//	}else if(a>96&&a<123&&b>96&&b<123){
//		//都是小写字母
//		return a>b?-1:1;
//	}else if(a>64&&a<91&&b>96&&b<123){
//		//a大写字母，b小写字母
//		return 1;
//	}else if(a>96&&a<123&&b>64&&b<91){
//		//a小写字母，b大写字母
//		return -1;
//	}else{
//		System.out.println("排序错误");
//		return 0;
//	}
//}
//private int compareChar(char a, char b){
//	HanyuPinyinOutputFormat pinyinFormat = new HanyuPinyinOutputFormat();
//	pinyinFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
//	pinyinFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
//	pinyinFormat.setVCharType(HanyuPinyinVCharType.WITH_V);
//	String sa = PinyinHelper.toHanyuPinyinStringArray(a)[0];
//	String sb = PinyinHelper.toHanyuPinyinStringArray(b)[0];
//	char[] sac = sa.toCharArray();
//	char[] sbc = sb.toCharArray();
//	int result = comparePinyin(sac, sbc);
//	if(result!=0){
//		return result;
//	}else{
//		return a>b?-1:1;
//	}
//}
//private int comparePinyin(char[] sac, char[] sbc){
//	int size = sac.length<sbc.length?sac.length:sbc.length;
//	for(int i=0;i<size;i++){
//		int result = comparePinyinzimu(sac[i], sbc[i]);
//		if(result!=0){
//			return result;
//		}
//	}
//	if(sac.length==sbc.length){
//		return 0;
//	}else{
//		return sac.length<sbc.length?-1:1;
//	}
//}
//private int comparePinyinzimu(char a, char b){
//	if(a==b){
//		return 0;
//	}else if(a>b){
//		return -1;
//	}else{
//		return 1;
//	}
//}
//private int compareNumber(char a,char b){
//	if(a==b){
//		return 0;
//	}else if(a>b){
//		return -1;
//	}else{
//		return 1;
//	}
//}
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

//	private static String toUTF_8(String str) {
//		try {
//			return new String(str.getBytes(),"ISO-8859-1");
//		} catch (UnsupportedEncodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return null;
//	}

}
