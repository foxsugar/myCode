<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.io.File"%>
<%@ page import="noumena.game.saolchat.util.Util" %>
<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.FileNotFoundException" %>
<%@ page import="java.io.FileReader" %>
<%@ page import="java.io.IOException" %>
<%@ page import="java.util.Vector" %>
<%@ include  file="checkLogin.jsp"%>

<head>
	<title>Chat server tools</title>
</head>
<SCRIPT LANGUAGE="javascript">
	<!--
	function submitform(type)
	{
		var form = document.getElementById("form1");
		var model = document.getElementById("model");
		var df = confirm("确认开始执行命令？");
		if (df)
		{
			model.value = type;
		    form.submit();
		}
	}
	-->
</SCRIPT> 
<body>
<form id="form1" action="tools.jsp" method="POST">
<%
	request.setCharacterEncoding("UTF-8");
	
	String model = request.getParameter("model");
	String msg = "";
	String COMMAND_1 = "refresh_bannedid";

	if (model == null)
	{
		msg = "还没有命令请求";
	}
	else if (model.equals(COMMAND_1))
	{
		String bannedpath = Util.getBannedFilePath();
		Vector<Integer> newids = new Vector<Integer>();
		try
		{
			FileReader freader = new FileReader(bannedpath);
			BufferedReader breader = new BufferedReader(freader);
			try
			{
				String bannedsid = breader.readLine();
				while (bannedsid != null)
				{
					if (bannedsid.equals(""))
					{
						bannedsid = breader.readLine();
						continue;
					}
					int bannedid = Integer.parseInt(bannedsid);
					newids.add(bannedid);
					bannedsid = breader.readLine();
					msg += bannedid;
					msg += ",";
				}
				Util.setBannedIds(newids);
			}
			catch (Exception e)
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
	}

%>
	(<%=model%>)<%=msg%><p>

	<input type="button" value="刷新禁言id" onclick="submitform('<%=COMMAND_1%>')"><p>
	<input type="hidden" id="model" name="model" value="">
</form>
</body>