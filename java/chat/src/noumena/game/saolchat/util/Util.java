package noumena.game.saolchat.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.TreeSet;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

/**
 * @author YPP
 * Util提供了一些常用的工具方法
 *
 */
public class Util
{
	private static Vector<String> censorwords = new Vector<String>();
	private static Vector<Integer> bannedIds = new Vector<Integer>();
	private static String getRootPath()
	{
		return Util.class.getResource("/").getPath();
	}

	public static String getCensorFilePath()
	{
		String path = Util.getRootPath();
		path += "../../assets/censor.txt";
		return path;
	}
	
	public static String getBannedFilePath()
	{
		String path = Util.getRootPath();
		path += "../../assets/banned.txt";
		return path;
	}
	
	public static String filterInvalidWords(String str)
	{
		for (String censorword : censorwords)
		{
			str = str.replaceAll("(?i)" + censorword, "***");
		}
		return str;
	}
//	public static void main(String[] args) {
//		init();
//	
//		System.out.println(filterInvalidWords("公告的东亚"));
//	}
	
	
	public static void init()
	{
		
		String censorpath = Util.getCensorFilePath();
//		int size = cen.length;
//		for(int i=0;i<size;i++){
//			censorwords.add(cen[i]);
//		}
	//	String censorpath = "d://censor.txt";
		//Charset charset = new Charset("UTF-8");
		try
		{
			//FileReader freader = new FileReader(censorpath);
			BufferedReader breader = null;
			try {
				breader = new BufferedReader(new InputStreamReader(new FileInputStream(censorpath),"UTF-8"));
			} catch (UnsupportedEncodingException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			try
			{
				String censorword = breader.readLine();
				while (censorword != null)
				{
					System.out.println(censorword);
					Util.censorwords.add(censorword);
					censorword = breader.readLine();
				}
			}
			catch (IOException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		catch (FileNotFoundException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Util.bannedIds.clear();
		Connection conn = null;
		PreparedStatement queryst = null;
		ResultSet rs = null;
		String querysql = "SELECT id,user_id,log_time,log_msg_text,success_flag FROM banlogs WHERE success_flag=1 ORDER BY log_time";
		try
		{
			conn = Util.getDBConn("java:comp/env/jdbc/Log");
			try
			{
				queryst = conn.prepareStatement(querysql);
				rs = queryst.executeQuery();
				while (rs.next())
				{
					Util.bannedIds.add(rs.getInt("user_id"));
				}
			}
			finally
			{
				if (rs != null)
				{
					rs.close();
				}
				if (queryst != null)
				{
					queryst.close();
				}
				if (conn != null)
				{
					conn.close();
				}
			}
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
//		String bannedpath = Util.getBannedFilePath();
//		try
//		{
//			FileReader freader = new FileReader(bannedpath);
//			BufferedReader breader = new BufferedReader(freader);
//			try
//			{
//				String bannedsid = breader.readLine();
//				while (bannedsid != null)
//				{
//					if (bannedsid.equals(""))
//					{
//						bannedsid = breader.readLine();
//						continue;
//					}
//					int bannedid = Integer.parseInt(bannedsid);
//					Util.bannedIds.add(bannedid);
//					bannedsid = breader.readLine();
//				}
//			}
//			catch (Exception e)
//			{
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		catch (FileNotFoundException e)
//		{
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}

	public static boolean isBanned(int id)
	{
		for (int bannedid : Util.bannedIds)
		{
			if (bannedid == id)
			{
				return true;
			}
		}
		return false;
	}

	/**
	 * ��һ������ת���ɰ���ָ����ʽ��ʾ���ַ�
	 * @param time Date������͵�ʱ��
	 * @param type
	 * 0 - ��ʾ����ʱ�䣬��ʽ����-��-�� ʱ���֣���
	 * 1 - ��ʾ��ʽ����-��-��
	 * 2 - ��ʾ��ʽ����-��
	 * 3 - ��ʾ��ʽ����-�� ʱ����
	 * @return ���ذ���Ҫ���ʽ���ַ�
	 */
	public static String date2Str(long time, int type)
	{
		Calendar cd = Calendar.getInstance();
		cd.setTimeInMillis(time);
		int year = cd.get(Calendar.YEAR);
		int month = cd.get(Calendar.MONTH) + 1;
		int day = cd.get(Calendar.DAY_OF_MONTH);
		int hour = cd.get(Calendar.HOUR_OF_DAY);
		int min = cd.get(Calendar.MINUTE);
		int sec = cd.get(Calendar.SECOND);
		String syear = Integer.toString(year);
		String smonth;
		if (month < 10)
		{
			smonth = String.format("0%d", month);
		}
		else
		{
			smonth = Integer.toString(month);
		}
		String sday;
		if (day < 10)
		{
			sday = String.format("0%d", day);
		}
		else
		{
			sday = Integer.toString(day);
		}
		String shour;
		if (hour < 10)
		{
			shour = String.format("0%d", hour);
		}
		else
		{
			shour = Integer.toString(hour);
		}
		String smin;
		if (min < 10)
		{
			smin = String.format("0%d", min);
		}
		else
		{
			smin = Integer.toString(min);
		}
		String ssec;
		if (sec < 10)
		{
			ssec = String.format("0%d", sec);
		}
		else
		{
			ssec = Integer.toString(sec);
		}
		
		switch (type)
		{
		case 0:
			//��-��-�� ʱ���֣���
			return syear + "-" + smonth + "-" + sday + " " + shour + ":" + smin + ":" + ssec;
		case 1:
			//��-��-��
			return syear + "-" + smonth + "-" + sday;
		case 2:
			//��-��
			return smonth + "-" + sday;
		case 3:
			//��-�� ʱ����
			return smonth + "-" + sday + " " + shour + ":" + smin;
		}
		return "";
	}
	
	public static void bannedUser(int kid)
	{
		Util.getBannedIds().add(kid);
	}
	
	public static void unbannedUser(int kid)
	{
		for (int i = 0 ; i < Util.getBannedIds().size() ; i++)
		{
			if (Util.getBannedIds().get(i) == kid)
			{
				Util.getBannedIds().remove(i);
				return;
			}
		}
	}
	
	public static Vector<Integer> getBannedIds()
	{
		return bannedIds;
	}

	public static void setBannedIds(Vector<Integer> bannedIds)
	{
		Util.bannedIds = bannedIds;
	}

	public static Vector<String> getCensorwords()
	{
		return censorwords;
	}

	public static void setCensorwords(Vector<String> censorwords)
	{
		Util.censorwords = censorwords;
	}
	
	public static Connection getDBConn(String dbName) throws SQLException
	{
		try
		{
			Context ctx = new InitialContext();
			DataSource ds = (DataSource) ctx.lookup(dbName);
			return ds.getConnection();
		}
		catch (Exception e)
		{
			throw new SQLException();
		}
	}

	public static void SortDwr(Vector<Object> list)
	{
		TreeSet hs = new TreeSet();
		
		for (int i = 0 ; i < list.size() ; i++)
		{
			hs.add(list.get(i));
		}
		list.clear();
		for (Object o : hs)
		{
			list.add(o);
		}
	}
}
