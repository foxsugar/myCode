<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%String path = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dth">
<html>
<head>
<style type="text/css">   
#customers   
  {   
  font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;   
  border-collapse:collapse;   
  }   
   
#customers td, #customers th    
  {   
  font-size:1em;   
  border:1px solid #98bf21;   
  padding:3px 7px 2px 7px;   
  }   
   
#customers th    
  {   
  font-size:1.1em;   
  text-align:left;   
  padding-top:5px;   
  padding-bottom:4px;   
  background-color:#A7C942;   
  color:#ffffff;   
  }   
   
#customers tr.alte td    
  {   
  color:#000000;   
  background-color:#EAF2D3;   
  }   
</style>   
<script type="text/javascript" src="<%=path%>/js/jquery.js"></script>
<script type="text/javascript">
	function addItem2character(itemId){
		$.ajaxPost('<%=path%>/addItem2character',{itemId:itemId},function(data){
			alert(data);
		}
	);
	}
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>装备</title>
</head>
<body>
	<h3>道具表  <a href="test/userItem.jsp">用户道具</a></h3>
	<table id="customers">
	<tr>
		<th id="id">操作</th>
		<th id="itemId">ID</th>
		<th id="itemName">名称</th>
		<th id="itemDescription">描述</th>
		<th id="itemIcon">图标</th>
		<th id="itemLevel">等级</th>
		<th id="itemType">类型</th>
		<th id="itemSubType">细分类型</th>
		<th id="attack">攻击</th>
		<th id="defence">防御</th>
		<th id="stamina">体力</th>
		<th id="agility">敏捷</th>
		<th id="intelligence">智力</th>
		<th id="commandNum">统率</th>
		<th id="needLevel">使用等级</th>
		<th id="useAble">使用</th>
		<th id="packUseAble">批量使用</th>
		<th id="sumAble">叠加</th>
		<th id="throwAble">丢弃</th>
		<!-- 
		<th id="salePrice">卖店价格</th>
		<th id="needCash">需要元宝</th>
		<th id="needGold">需要金锭</th>
		<th id="gold">金锭</th>
		<th id="money">铜币</th>
		<th id="food">粮食</th>
		<th id="wood">木材</th>
		<th id="bronze">青铜</th>
		<th id="stone">石头</th>
		<th id="medicine">药膏</th>
		<th id="soldierNum">新兵数</th>
		 -->
	</tr>
	<c:forEach items="${itemList}" var="item" varStatus="status">
		<tr <c:if test="${status.index%2 == 0}">class="alte"</c:if>> 
			<td><button onClick="addItem2character('${item.itemId}')">${status.index}&nbsp;获得装备</button></td>
			<td>${item.itemId}</td>
			<td>${item.itemName}</td>
			<td>${item.itemDescription}</td>
			<td>${item.itemIcon}</td>
			<td>${item.itemLevel}</td>
			<td>${item.itemType}</td>
			<td>${item.itemSubType}</td>
			<td>${item.attack}</td>
			<td>${item.defence}</td>
			<td>${item.stamina}</td>
			<td>${item.agility}</td>
			<td>${item.intelligence}</td>
			<td>${item.commandNum}</td>
			<td>${item.needLevel}</td>
			<td>${item.useAble}</td>
			<td>${item.packUseAble}</td>
			<td>${item.sumAble}</td>
			<td>${item.throwAble}</td>
			<!-- 
			<td>${item.salePrice}</td>
			<td>${item.needCash}</td>
			<td>${item.needGold}</td>
			<td>${item.gold}</td>
			<td>${item.money}</td>
			<td>${item.food}</td>
			<td>${item.wood}</td>
			<td>${item.bronze}</td>
			<td>${item.stone}</td>
			<td>${item.medicine}</td>
			<td>${item.soldierNum}</td>
			 -->
		</tr>
	</c:forEach>
	</table>
</body>
</html>