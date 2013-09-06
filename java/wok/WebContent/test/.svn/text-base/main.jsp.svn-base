<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>王者之战</title>
<base href="/wok/">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/exchangeData.js"></script>
<script type="text/javascript">
	var accDisplay = false;
	var charDisplay = false;
	function showAcc(){
		var accInfo = document.getElementById("accInfo");
		var a_b = document.getElementById("a_b");
		if(accDisplay){
			accInfo.style.display="none";
			a_b.innerHTML="+";
			accDisplay=false;
		}else{
			accInfo.style.display="block";
			a_b.innerHTML="-";
			accDisplay=true;
		}
	}
	function showChar(){
		var charInfo = document.getElementById("charInfo");
		var c_b = document.getElementById("c_b");
		if(charDisplay){
			charInfo.style.display="none";
			c_b.innerHTML="+";
			charDisplay=false;
		}else{
			charInfo.style.display="block";
			c_b.innerHTML="-";
			charDisplay=true;
		}
	}
</script>
</head>
<body>
	<div>
		账号：${account.acName}
		<button onClick="showAcc()" id="a_b">+</button><br />
		<div id="accInfo" style="display:none">
		<table border="1">
			<tr>
				<th>ID:</th><td>${account.acId}</td>
			</tr>
			<tr>
				<th>密码：</th><td>${account.acPassword}</td>
			</tr>
			<tr>
				<th>创建时间：</th><td>${account.createTime}</td>
			</tr>
			<tr>
				<th>上次登录时间：</th><td>${account.lastLoginTime}</td>
			</tr>
			<tr>
				<th>上次登录角色ID：</th><td>${account.lastCharId}</td>
			<tr>
				<th>状态：</th><td>${account.status}</td>
			</tr>
		</table>
		</div>
		君主：${character.charName}&nbsp;等级：${character.level}&nbsp;经验：${character.exp}<button onClick="showChar()" id="c_b">+</button><br />
		&nbsp;&nbsp;粮食：${character.food}&nbsp;木材：${character.wood}&nbsp;石料:${character.stone}&nbsp;青铜：${character.bronze}<br />
		&nbsp;&nbsp;元宝：${character.cash}&nbsp;点券：${character.ticket}&nbsp;铜币：${character.money}&nbsp;新兵：${character.army}&nbsp;人口：${character.people}
		<div id="charInfo" style="display:none">
			<table border="1">
			<tr>
				<th>ID:</th><td>${character.charId}</td>
			</tr>
			<tr>
				<th>国家：</th><td>${character.country}</td>
			</tr>
			<tr>
				<th>性别：</th><td>${character.sex}</td>
			</tr>
			<tr>
				<th>头像：</th><td>${character.image}</td>
			</tr>
			<tr>
				<th>状态：</th><td>${character.status}</td>
			<tr>
				<th>账号ID：</th><td>${character.acId}</td>
			</tr>
		</table>
		</div>
	</div>
<a href="test/building.jsp">建筑</a>
<a href="test/character.html">角色</a>
<a href="getAllItem">国库</a>
<a href="test/mail.jsp">邮件</a>
<a href="#">加工坊</a>
<a href="#">拍卖行</a>
<a href="#">酒馆</a>
<a href="test/chat.jsp">聊天</a>
</body>
</html>