package com.crystalcg.gamedev.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class TimeUtil {
	/**
	 * 将毫秒转换成容易看懂的时分秒（10小时50分钟0秒）
	 * @param time 毫秒
	 * @return
	 */
	public static String toShortString(long time){
		time = time/1000;
		int hour = (int)time/3600;
		int second = (int)time%60;
		int minute = (int)(time - second)/60%60;
		return hour+"小时"+minute+"分"+second+"秒";
	}
	/**
	* 字符型日期转化util.Date型日期
	* @Param:Date 字符型日期 
	* @param format 格式:"yyyy-MM-dd" / "yyyy-MM-dd hh:mm:ss"
	* @throws Exception 
	*/
	public static Date toUtilDate(String date,String format)
	    throws Exception {
	   Date returnDate = null;
	   java.text.DateFormat df = new java.text.SimpleDateFormat(format);
	   if (date != null && (!"".equals( date )) && format != null && (!"".equals( format ))){
		   returnDate = df.parse( date );
	   }
	   return returnDate;
	}
	/**
	* 字符型日期转化成sql.Date型日期
	* @param date  字符型日期
	* @return java.sql.Date sql.Date型日期
	* @throws Exception 
	*/
	public static java.sql.Date toSqlDate(String date) throws Exception {
	   java.sql.Date returnDate = null;
	   java.text.DateFormat sdf = new java.text.SimpleDateFormat();
	   if (date != null && (!"".equals(date))) {
	      returnDate = new java.sql.Date(sdf.parse(date).getTime());
	   }
	   return returnDate;
	}
	/** 
	* util.Date型日期转化指定格式的字符串型日期
	* @param   Date    Date 
	* @param   p_format String 
	* 格式1:"yyyy-MM-dd" 
	* 格式2:"yyyy-MM-dd hh:mm:ss EE" 
	* 格式3:"yyyy年MM月dd日 hh:mm:ss EE" 
	* @return String 
	*/
	public static String toStringDate(Date date, String format ) throws Exception {
	   String result = "";
	   if ( date != null ) {
	      SimpleDateFormat sdf = new SimpleDateFormat(format);
	      result = sdf.format( date );
	   }
	   return result;
	}
	/**
	 * 返回second秒后的时间
	 * @param second（秒）
	 * @param oldDate（原时间）
	 * @return
	 */
	public static Date add(int second,Date oldDate) {
		return new Date(oldDate.getTime() + second * 1000);
	}
	
	/**
	 * 判断和当前日期是否是同一天
	 * @param date
	 * @return
	 */
	public static boolean isSameDay(Date date){
		Calendar c1=Calendar.getInstance();
		Calendar c2=Calendar.getInstance();
		c1.setTime(date);
		c2.setTime(new Date());
		if(c1.get(Calendar.YEAR)==c2.get(Calendar.YEAR)&&(c1.get(Calendar.MONTH)==c2.get(Calendar.MONTH))
		&&c1.get(Calendar.DAY_OF_MONTH)==c2.get(Calendar.DAY_OF_MONTH)){
			return true;
		}else{
			return false;
		}
	}
}
