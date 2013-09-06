<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%String path= request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="<%=path %>/js/client/jquery.js"></script>
<script type="text/javascript" src="<%=path %>/js/severDataInterface/dataCometd.js"></script>
<script type="text/javascript" src="<%=path %>/js/client/jquery.cometd.js"></script>
<script type="text/javascript">
		var cometd = $.cometd;
		var sub;
		function connectServer(){
				cometd.configure({url:location.protocol + "//" + location.host + "/wok/cometd"});
				cometd.handshake();
				cometd.addListener('/meta/handshake', function(message){
					if(message.successful){
						sub = cometd.subscribe('/gameSystem/'+10,function(cometData){
						});
					}
				});
			console.log("连接成功");
		}
		function disconnectServer(){
			cometd.unsubscribe(sub);
			sub=null;
			console.log("删除成功");
		}
		function testSub(){
			console.log(sub);
			if(sub){
				console.log("订阅存在");
			}else{
				console.log("订阅不存在");
			}
		}
</script>
</head>
<body>
<button onclick="connectServer()">连接</button>
<button onclick="disconnectServer()">断开</button>
<button onclick="testSub()">测试</button>
</body>
</html>