<%@page import="noumena.game.saolchat.util.InstanceIDDef"%>
<%@page import="noumena.game.saolchat.dwr.dwrvo.ChatMsgVO"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="noumena.game.saolchat.dwr.dwrvo.DwrGetChatVO" %>
<%@ page import="noumena.game.saolchat.model.ChatCenter" %>
<%@ page import="noumena.game.saolchat.model.ChatMsg" %>
<%@ page import="noumena.game.saolchat.util.Util" %>
<%@ page import="java.net.URLDecoder" %>
<%@ include  file="../checkLogin.jsp"%>

<head>
	<title>Chat Admin tools</title>
	<script type='text/javascript' src='../../dwr/engine.js'></script>
	<script type='text/javascript' src='../../dwr/interface/DwrChat.js'></script>
</head>
<html>

	<script type="text/javascript" language="javascript">
	newchatcontent = "";
	index = 0;
	setInterval("getchat()", 10000);
	filterwords = ["BUG","买","钻","充值","汇款","GM","客服","買","鑽","匯款"];
	function getchat()
	{
		var indexobj = document.getElementById("index");
		index = indexobj.value;
		var meta={
			callback:function(ret){self.getchatok.call(self,ret);},
			errorHandler:function(msg){self.getchaterror.call(self,msg);}
		};
		DwrChat.getAdminChat(index, meta);
	}
	function checkwords(words)
	{
		var i = 0;
		for (i = 0 ; i < filterwords.length ; i++)
		{
			if (words.toLowerCase().indexOf(filterwords[i].toLowerCase()) >= 0)
			{
				return false;
			}
		}
		return true;
	}
	function getchatok(ret)
	{
		var indexobj = document.getElementById("index");
		index = ret.maxIndex;
		indexobj.value = index;
		var i;
		var viewstr = "";
		var channelid = 0;
		var viewtime = "";
		var dateobj = new Date();
		for (i = 0 ; i < ret.msgs.length ; i++)
		{
			viewstr = "";
			dateobj.setTime(ret.msgs[i].time);
			viewtime = dateobj.getFullYear();
			viewtime += "-" + (dateobj.getMonth() + 1);
			viewtime += "-" + dateobj.getDate();
			viewtime += " " + dateobj.getHours();
			viewtime += ":" + dateobj.getMinutes();
			viewtime += ":" + dateobj.getSeconds();
			channelid = ret.msgs[i].channelId;
			if (channelid == 0x7f000001)
			{
				if (self.checkwords(ret.msgs[i].content))
				{
					viewstr += "<font color=#000000>";
				}
				else
				{
					viewstr += "<font color=#ff0000>";
				}
				viewstr += "(" + viewtime + ")";
				viewstr += ret.msgs[i].senderName;
				viewstr += "(" + ret.msgs[i].uid + ")";
				viewstr += "(" + ret.msgs[i].senderId + ")";
				viewstr += "对大家(0)说：";
				viewstr += ret.msgs[i].content;
				viewstr += "</font><br>";
			}
			else if (channelid < 0x01000000)
			{
				viewstr += "<font color=#bf00bf>";
				viewstr += "(" + viewtime + ")";
				viewstr += ret.msgs[i].senderName;
				viewstr += "(" + ret.msgs[i].uid + ")";
				viewstr += "(" + ret.msgs[i].senderId + ")";
				viewstr += "密聊(" + ret.msgs[i].channelId + ")说：";
				viewstr += ret.msgs[i].content;
				viewstr += "</font><br>";
			}
			else if (channelid >> 24 == 0x03000000 >> 24)
			{
				viewstr += "<font color=#00a228>";
				viewstr += "(" + viewtime + ")";
				viewstr += ret.msgs[i].senderName;
				viewstr += "(" + ret.msgs[i].uid + ")";
				viewstr += "(" + ret.msgs[i].senderId + ")";
				viewstr += "对联盟(" + ret.msgs[i].channelId + ")说：";
				viewstr += ret.msgs[i].content;
				viewstr += "</font><br>";
			}
			newchatcontent += viewstr;
		}
		
		var oldchatcontentobj = document.getElementById("oldchatcontent");
		if (oldchatcontentobj != null)
		{
			oldchatcontent = oldchatcontentobj.innerHTML;
			oldchatcontent = newchatcontent + oldchatcontent;
			oldchatcontentobj.innerHTML = oldchatcontent;
			newchatcontent = "";
		}
	}
	function getchaterror(ret)
	{
	}
	function sendchat(index)
	{
		var gmname = document.getElementById("gmname");
		if (index == null)
		{
			index = 0;
		}
		var content = document.getElementById("chatcontent" + index);
		if (content == null || content.value == null || content.value == "")
		{
			var errstr = "没有输入";
			if (index == 0)
			{
				errstr += "聊天内容";
			}
			else if (index == 1)
			{
				errstr += "常用1聊天内容";
			}
			else if (index == 2)
			{
				errstr += "常用2聊天内容";
			}
			else if (index == 3)
			{
				errstr += "常用3聊天内容";
			}
			else if (index == 4)
			{
				errstr += "常用4聊天内容";
			}
			alert(errstr);
			return;
		}
		var chattype = document.getElementById("chattype");
		var targetid = document.getElementById("targetid");
		var meta={
			callback:function(ret){self.sendchatok.call(self,ret);},
			errorHandler:function(msg){self.sendchaterror.call(self,msg);}
		};
		var chatcontent={
			serverId:0,
			senderId:0,
			senderName:gmname.value,
			channelId:chattype.value == 1 ? 0x7f000001 : targetid.value,
			content:content.value
		};
		DwrChat.sendChat(chatcontent, meta);
		if (index == 0)
		{
			content.value = "";
		}
	}
	function sendchatok(ret)
	{
	}
	function sendchaterror(ret)
	{
	}
	 </script>
<body onload="getchat()">

<%
	request.setCharacterEncoding("UTF-8");
	
	String str = request.getParameter("index");
	int index = 0;
	if (str == null)
	{
		str = "0";
	}
	index = Integer.parseInt(str);
	String gmname = request.getParameter("gmname");
	if (gmname == null)
	{
		gmname = "系统管理员";
	}
	str = request.getParameter("chattype");
	int chattype = 0;
	if (str == null)
	{
		str = "1";
	}
	chattype = Integer.parseInt(str);

	String chatcontent0 = request.getParameter("chatcontent0");
	if (chatcontent0 == null)
	{
		chatcontent0 = "";
	}
	String chatcontent1 = request.getParameter("chatcontent1");
	if (chatcontent1 == null)
	{
		chatcontent1 = "";
	}
	String chatcontent2 = request.getParameter("chatcontent2");
	if (chatcontent2 == null)
	{
		chatcontent2 = "";
	}
	String chatcontent3 = request.getParameter("chatcontent3");
	if (chatcontent3 == null)
	{
		chatcontent3 = "";
	}
	String chatcontent4 = request.getParameter("chatcontent4");
	if (chatcontent4 == null)
	{
		chatcontent4 = "";
	}
	String targetid = request.getParameter("targetid");
	if (targetid == null)
	{
		targetid = "0";
	}
	
	//String servername = request.getParameter("servername");
	if (servername != null)
	{
		servername = URLDecoder.decode(servername, "UTF-8");
	}
%>

<form id="form1" action="main.jsp" method="POST">
	服务器名称：<font size="10" color="0x0000ff"><%=servername%></font><br>
	目标ID：<input id="targetid" name="targetid" value="<%=targetid%>"><br>
	GM名字：
	<select id="gmname" name="gmname">
		<option <%=(gmname.equals("GM00") ? "SELECTED" : "") %> value="GM00">GM00</option>
		<option <%=(gmname.equals("GM01") ? "SELECTED" : "") %> value="GM01">GM01</option>
		<option <%=(gmname.equals("GM_雪晗") ? "SELECTED" : "") %> value="GM_雪晗">GM_雪晗</option>
		<option <%=(gmname.equals("GM_三三") ? "SELECTED" : "") %> value="GM_三三">GM_三三</option>
		<option <%=(gmname.equals("GM_1987") ? "SELECTED" : "") %> value="GM_1987">GM_1987</option>
		<option <%=(gmname.equals("GM_王小棋") ? "SELECTED" : "") %> value="GM_王小棋">GM_王小棋</option>
		<option <%=(gmname.equals("GM_Lee") ? "SELECTED" : "") %> value="GM_Lee">GM_Lee</option>
		<option <%=(gmname.equals("GM_小白") ? "SELECTED" : "") %> value="GM_小白">GM_小白</option>
		<option <%=(gmname.equals("GM08") ? "SELECTED" : "") %> value="GM08">GM08</option>
		<option <%=(gmname.equals("GM09") ? "SELECTED" : "") %> value="GM09">GM09</option>
	</select><br>
	类型：
	<select id="chattype" name="chattype">
		<option <%=(chattype==1) ? "SELECTED" : "" %> value="1">公聊</option>
		<option <%=(chattype==2) ? "SELECTED" : "" %> value="2">联盟密聊</option>
		<option <%=(chattype==3) ? "SELECTED" : "" %> value="3">玩家密聊</option>
	</select><br>
	内容：
	<input id="chatcontent0" name="chatcontent0" value="<%=chatcontent0%>" size="64"><input type="button" default value="发送" onclick="sendchat(0)"><br>
	常用1：
	<input id="chatcontent1" name="chatcontent1" value="<%=chatcontent1%>" size="64"><input type="button" value="发送" onclick="sendchat(1)"><br>
	常用2：
	<input id="chatcontent2" name="chatcontent2" value="<%=chatcontent2%>" size="64"><input type="button" value="发送" onclick="sendchat(2)"><br>
	常用3：
	<input id="chatcontent3" name="chatcontent3" value="<%=chatcontent3%>" size="64"><input type="button" value="发送" onclick="sendchat(3)"><br>
	常用4：
	<input id="chatcontent4" name="chatcontent4" value="<%=chatcontent4%>" size="64"><input type="button" value="发送" onclick="sendchat(4)"><br>
	<input type="button" value="刷新聊天内容" onclick="getchat()">
	<input type="button" value="禁言管理" onclick="window.open('ban.jsp')">
	<input type="hidden" id="issubmit" name="issubmit">
	<input type="hidden" id="index" name="index" value="<%=index%>">
</form>

	-----------------------
	<div id="oldchatcontentdiv"><span id="oldchatcontent"></span></div>

</body>
</html>