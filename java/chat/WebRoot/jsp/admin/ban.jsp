<%@page import="noumena.game.saolchat.util.InstanceIDDef"%>
<%@page import="noumena.game.saolchat.dwr.dwrvo.ChatMsgVO"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="noumena.game.saolchat.dwr.dwrvo.DwrGetChatVO" %>
<%@ page import="noumena.game.saolchat.model.ChatCenter" %>
<%@ page import="noumena.game.saolchat.model.ChatMsg" %>
<%@ page import="noumena.game.saolchat.util.Util" %>

<%@ page import="java.sql.*"%>

<head>
	<title>Chat Admin tools</title>
	<!-- link calendar files  -->
	<script language="JavaScript" src="calendar_db.js"></script>
	<link rel="stylesheet" href="calendar.css">
</head>
<html>

	<SCRIPT LANGUAGE="javascript">
	<!--
	function submitform(type, id, kid)
	{
		var form = document.getElementById("form1");
		var model = document.getElementById("issubmit");
		var unbandid = document.getElementById("unbandid");
		var banreason = document.getElementById("banreason");
		var targetid = document.getElementById("targetid");
		var starttime = document.getElementById("starttime");
		var endtime = document.getElementById("endtime");
		model.value = type;
		unbandid.value = id;
		unbandkid.value = kid;
		
		if (type == 0)
		{
			//重置
			targetid.value = "";
			starttime.value = "";
			endtime.value = "";
			banreason.value = "";
		}
		else if (type == 1)
		{
			//查询，直接提交
			form.submit();
		}
		else if (type == 2)
		{
			//解禁玩家，确认后提交
			var df = confirm("确认解禁玩家" + kid + "？");
			if (df)
			{
			    form.submit();
			}
		}
		else if (type == 3)
		{
			//禁言，确认后提交
			if (targetid.value == "" || banreason.value == "")
			{
				alert("禁言玩家KID和禁言原因必填！");
			}
			else
			{
				var df = confirm("确认禁言玩家" + targetid.value + "？");
				if (df)
				{
				    form.submit();
				}
			}
		}
	}
	-->
	</SCRIPT> 
	
<body>

<%
	request.setCharacterEncoding("UTF-8");

	String issubmit = request.getParameter("issubmit");
	String targetid = request.getParameter("targetid");
	if (targetid == null)
	{
		targetid = "";
	}
	String starttime = request.getParameter("starttime");
	if (starttime == null)
	{
		starttime = "";
	}
	String endtime = request.getParameter("endtime");
	if (endtime == null)
	{
		endtime = "";
	}
	String unbandid = request.getParameter("unbandid");
	if (unbandid == null)
	{
		unbandid = "";
	}
	String unbandkid = request.getParameter("unbandkid");
	if (unbandkid == null)
	{
		unbandkid = "";
	}
	String banreason = request.getParameter("banreason");
	if (banreason == null)
	{
		banreason = "";
	}
	String querysql = "";
	String updatesql = "";
	Vector<Integer> ids = new Vector<Integer>();
	Vector<Integer> kids = new Vector<Integer>();
	Vector<String> times = new Vector<String>();
	Vector<String> notes = new Vector<String>();
	Vector<Integer> status = new Vector<Integer>();
	Vector<String> endtimes = new Vector<String>();
	int count = 0;
	Connection conn = null;
	PreparedStatement queryst = null;
	PreparedStatement updatest = null;
	ResultSet rs = null;
	try
	{
		conn = Util.getDBConn("java:comp/env/jdbc/Log");
		String ret = "";
	
		if (issubmit != null && issubmit.equals("1"))
		{
			if (targetid != null && !targetid.equals(""))
			{
				querysql = "SELECT id,user_id,log_time,log_msg,log_msg_text,success_flag FROM banlogs WHERE user_id=? ORDER BY log_time";
				queryst = conn.prepareStatement(querysql);
				queryst.setInt(1, Integer.parseInt(targetid));
			}
			else
			{
				if (starttime != null && endtime != null && !starttime.equals("") && !endtime.equals(""))
				{
					querysql = "SELECT id,user_id,log_time,log_msg,log_msg_text,success_flag FROM banlogs WHERE log_time>? AND log_time<? ORDER BY log_time";
					queryst = conn.prepareStatement(querysql);
					queryst.setString(1, starttime);
					queryst.setString(2, endtime);
				}
				else if (starttime != null && !starttime.equals(""))
				{
					querysql = "SELECT id,user_id,log_time,log_msg,log_msg_text,success_flag FROM banlogs WHERE log_time>? ORDER BY log_time";
					queryst = conn.prepareStatement(querysql);
					queryst.setString(1, starttime);
				}
				else if (endtime != null && !endtime.equals(""))
				{
					querysql = "SELECT id,user_id,log_time,log_msg,log_msg_text,success_flag FROM banlogs WHERE log_time<? ORDER BY log_time";
					queryst = conn.prepareStatement(querysql);
					queryst.setString(1, endtime);
				}
				else
				{
					querysql = "SELECT id,user_id,log_time,log_msg,log_msg_text,success_flag FROM banlogs WHERE success_flag=1 ORDER BY log_time";
					queryst = conn.prepareStatement(querysql);
				}
			}
		}
		else if (issubmit != null && issubmit.equals("2"))
		{
			if (unbandid != null && !unbandid.equals(""))
			{
				Util.unbannedUser(Integer.parseInt(unbandkid));
				
				updatesql = "UPDATE banlogs SET success_flag=0,log_msg=NOW() WHERE id=?";
				updatest = conn.prepareStatement(updatesql);
				updatest.setInt(1, Integer.parseInt(unbandid));
				updatest.executeUpdate();
				updatest.close();
			}
			querysql = "SELECT id,user_id,log_time,log_msg,log_msg_text,success_flag FROM banlogs WHERE success_flag=1 ORDER BY log_time";
			queryst = conn.prepareStatement(querysql);
			
			ret = "解禁成功！";
%>

		<SCRIPT LANGUAGE="javascript">alert("<%=ret %>");</script>

<%
		}
		else if (issubmit != null && issubmit.equals("3"))
		{
			if (targetid != null && !targetid.equals(""))
			{
				int id = Integer.parseInt(targetid);
				if (Util.isBanned(id))
				{
					//已经禁言
					ret = "该玩家已经禁言！";
				}
				else
				{
					Util.bannedUser(id);
					
					updatesql = "INSERT INTO banlogs (user_id,log_msg_text,success_flag,log_time) VALUES (?,?,1,NOW())";
					updatest = conn.prepareStatement(updatesql);
					updatest.setInt(1, id);
					updatest.setString(2, banreason);
					updatest.executeUpdate();
					updatest.close();
					
					ret = "禁言成功！";
				}
			}
			querysql = "SELECT id,user_id,log_time,log_msg,log_msg_text,success_flag FROM banlogs WHERE success_flag=1 ORDER BY log_time";
			queryst = conn.prepareStatement(querysql);
%>

		<SCRIPT LANGUAGE="javascript">alert("<%=ret %>");</script>

<%
		}
		else
		{
			querysql = "SELECT id,user_id,log_time,log_msg,log_msg_text,success_flag FROM banlogs WHERE success_flag=1 ORDER BY log_time";
			queryst = conn.prepareStatement(querysql);
		}
	
		rs = queryst.executeQuery();
		while (rs.next())
		{
			ids.add(rs.getInt("id"));
			kids.add(rs.getInt("user_id"));
			times.add(rs.getString("log_time"));
			notes.add(rs.getString("log_msg_text"));
			status.add(rs.getInt("success_flag"));
			endtimes.add(rs.getString("log_msg"));
			count++;
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
		if (updatest != null)
		{
			updatest.close();
		}
		if (conn != null)
		{
			conn.close();
		}
	}
%>

<form id="form1" name="form1" action="ban.jsp" method="POST">
	KID：<input id="targetid" name="targetid" value="<%=targetid%>"><br>
	起始时间（包括）：<input id="starttime" name="starttime" value="<%=starttime%>">
<script language="JavaScript">
	new tcal ({
		// form name
		'formname': 'form1',
		// input name
		'controlname': 'starttime'
	});
</script>
	<br>
	结束时间（不包括）：<input id="endtime" name="endtime" value="<%=endtime%>">
<script language="JavaScript">
	new tcal ({
		// form name
		'formname': 'form1',
		// input name
		'controlname': 'endtime'
	});
</script>
	<br>
	禁言原因：<input id="banreason" name="banreason" value="<%=banreason%>" size="80"><br>
	<input type="button" value="重置" onclick="submitform(0, 0)">
	<input type="button" value="查询" onclick="submitform(1, 0)">
	<input type="button" value="禁言" onclick="submitform(3, 0)">
	<input type="button" value="返回" onclick="location.href='main.jsp'">

	<table border="1"><tbody>
		<tr bgcolor="#00ffff">
			<td>KID</td>
			<td>禁言时间</td>
			<td>禁言原因</td>
			<td>解禁时间</td>
		</tr>

<%
	for (int i = 0 ; i < count ; i++)
	{
%>

		<tr>
			<td><%=kids.get(i) %></td>
			<td><%=times.get(i) %></td>
			<td><%=notes.get(i) %></td>
			<td>

<%
		if (status.get(i) == 1)
		{
%>

			<input type="button" value="解禁" onclick="submitform(2, <%=ids.get(i) %>, <%=kids.get(i) %>)">

<%
		}
		else
		{
%>

			<%=endtimes.get(i) %>

<%
		}
%>
			</td>
		</tr>

<%
	}
%>

	</tbody></table>
	
	<input type="hidden" id="issubmit" name="issubmit">
	<input type="hidden" id="unbandid" name="unbandid">
	<input type="hidden" id="unbandkid" name="unbandkid">
</form>
</body>
</html>