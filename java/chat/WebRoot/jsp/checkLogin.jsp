<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.io.InputStream"%>
<%@ page import="java.net.URL"%>
<%@ page import="java.net.URLConnection"%>
<%@ page import="java.io.InputStreamReader"%>
<%@ page import="java.io.BufferedReader"%>

<%
	request.setCharacterEncoding("UTF-8");
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragrma","no-cache");
	response.setDateHeader("Expires",0);
	
	String raddr = request.getRemoteAddr();
	
	String errorMsg = "请先登陆掌魔MIS";
	Boolean isLoginLocal = (Boolean)session.getAttribute("isLoginLocal");
	
	//接收参数
	String id = request.getParameter("serverid");
	String language = request.getParameter("language");
	if (language == null)
	{
		language = "SC";
	}
	int serverid = -1;
	if (id != null)
	{
		serverid = Integer.parseInt(id);
	}
	String servername="UNKNOW";
	switch (serverid)
	{
	case 0:
		servername = "宙斯";
		break;
	case 1:
		servername = "赫拉";
		break;
	case 2:
		servername = "波塞冬";
		break;
	case 3:
		servername = "哈得斯";
		break;
	case 4:
		servername = "德墨忒耳";
		break;
	case 5:
		servername = "德墨忒耳2";
		break;
	case 103:
		servername = "Test服";
		break;
	case 104:
		servername = "本地服";
		break;
	default:
		servername = "UNKNOW";
		break;
	}
	String misUrl = request.getParameter("misurl");
	String misUserId = request.getParameter("misuserid");
	String misUserName = request.getParameter("misusername");
	String misCheckId = request.getParameter("mischeckid");
	
	String needlogin = request.getParameter("login");
	if (needlogin == null)
	{
		needlogin = "1";
	}
	String misParm = "login=" + needlogin + "&language="+language+"&sname="+servername+"&serverid="+serverid+"&misurl="+misUrl+"&misuserid="+misUserId+"&mischeckid="+misCheckId+"&misusername="+misUserName;
	
	if (!needlogin.equals("0808"))
	{
		//调用mis系统提供的用户登陆验证的servlet
		String loginStatus = "";
		if (raddr.equals("127.0.0.1"))
		{
			//isLoginLocal = true;
		}
		if(isLoginLocal==null)
		{
			if(misUrl==null)
			{
%>

				<script>
					alert("请先登陆掌魔MIS");
				</script>
			
<%	
				return;
			} 
		
			try
			{
				URL url = new URL(misUrl+"CheckUser?misuserid="+misUserId+"&mischeckid="+misCheckId);
				URLConnection uc = url.openConnection();
				InputStreamReader input = new InputStreamReader(uc.getInputStream());
				BufferedReader in = new BufferedReader(input);
				String inputLine;
				
				while ((inputLine = in.readLine()) != null)
				{
					loginStatus+=inputLine;
				}
				in.close();
			}
			catch(Exception e)
			{
				throw new Exception(e);
			}
			
		}
		else
		{
			loginStatus = "2";
		}
		//System.out.println("loginStatus="+loginStatus);
		//登陆状态决定页面走向
		if(loginStatus.equals("0"))
		{
			session.setAttribute("isLoginLocal",true);
			session.setAttribute("misurl",misUrl);
			session.setAttribute("misUserId",misUserId);
			session.setAttribute("misUserName",misUserName);
			session.setAttribute("misCheckId",misCheckId);
			//out.println("misUserName=" + misUserName);
		}
		else if(loginStatus.equals("1"))
		{
			if(misUrl != null)
			{
				response.sendRedirect(misUrl);
			}
			else
			{
				throw new Exception(errorMsg);
			}
		}
	}
%>