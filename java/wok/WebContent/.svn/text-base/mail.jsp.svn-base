<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="js/client/jquery.js"></script>
<script>
	function getAddressee(){
		$.ajaxPost('getAddressee',function (data){
			var select = document.getElementById("addressee");
			var nodes = select.childNodes;
			var count = nodes.length;
			for(var j=0;j<count;j++){
				select.removeChild(select.firstChild);
			}
			var option;
			for(var i=0;i<data.length;i++){
				option = document.createElement("option");
				option.value=data[i].charId;
				option.text=data[i].charName;
				select.appendChild(option);
			}
		});
	}
	function getMailList(){
		$.ajaxPost('getMailList',function (data){
			var ol = document.getElementById("mailList");
			var nodes = ol.childNodes;
			var count = nodes.length;
			for(var j=0;j<count;j++){
				ol.removeChild(ol.firstChild);
			}
			var li;
			for(var i=0;i<data.length;i++){
				li = document.createElement("li");
				li.innerHTML=data[i].id+" "+data[i].addresser+" "+data[i].title+" "+data[i].sendTime;
				ol.appendChild(li);
			}
		});
	}
	window.onload=getAddressee;
</script>
<title>王者之战</title>
</head>
<body>
	<div>
		<h4>当前角色名：${character.charName}</h4>
	</div>
	<div>
		<h4>写信：</h4>
		<form action="sendMail" method="post">
			标题:<input type="text" name="title" />&nbsp;收件人：<select id="addressee" name="addressee" ></select><br />
			正文:<br /><textarea name="content" cols="50" rows="8"></textarea><br />
			<input type="submit" value="发送"/>
		</form>
	</div>
	<div>
		<h4>邮件列表：<button onClick="getMailList()">获取邮件</button></h4>
		<table>
			<tr><th>编号</th><th>标题</th><th>发件人</th><th>时间</th></tr>
		</table>
	</div>
</body>
</html>