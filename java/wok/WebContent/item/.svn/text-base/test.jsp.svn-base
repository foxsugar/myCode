<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="<%=path %>/js/client/jquery.js"></script>
<script type="text/javascript">
	function loadPage(){
		$.ajaxPost("<%=path %>/getUserInfo",doUserInfo);
		
	}
	function doResourceInfo(data){
		var moneyInfo = document.getElementById("moneyInfo");
		moneyInfo.innerHTML = "铜币("+data.moneyLimit+")";
		var foodInfo = document.getElementById("foodInfo");
		foodInfo.innerHTML = "粮食("+data.foodLimit+")";
		var woodInfo = document.getElementById("woodInfo");
		woodInfo.innerHTML = "木材("+data.woodLimit+")";
		var stoneInfo = document.getElementById("stoneInfo");
		stoneInfo.innerHTML = "石矿("+data.stoneLimit+")";
		var ironoreInfo = document.getElementById("ironoreInfo");
		ironoreInfo.innerHTML = "铁矿("+data.ironoreLimit+")";
		document.getElementById("money").value = data.money;
		document.getElementById("food").value = data.food;
		document.getElementById("wood").value = data.wood;
		document.getElementById("stone").value = data.stone;
		document.getElementById("ironore").value = data.ironore;
	}
	function doUserInfo(data){
		$.ajaxPost("<%=path %>/getAllArticleInfo",doItemList);
		$.ajaxPost("<%=path %>/getResourceInfo", doResourceInfo);
	}
	function doItemList(data){
		var testTable = document.getElementById("testTable");
		//装备
		for ( var i in data.equipments) {
			var tr = document.createElement("tr");
			var idTd = document.createElement("td");
			var noTd = document.createElement("td");
			var nameTd = document.createElement("td");
			var typeTd = document.createElement("td");
			var subtypeTd = document.createElement("td");
			var operateTd = document.createElement("td");
			var button = document.createElement("button");
			button.id = data.equipments[i].equipmentNo;
			button.value = 1;
			button.onclick = additem;
			button.innerHTML = "添加";
			operateTd.appendChild(button);
			var font = document.createElement("font");
			idTd.width = "150px";
			noTd.width = "150px";
			nameTd.width = "150px";
			typeTd.width = "150px";
			subtypeTd.width = "150px";
			operateTd.width = "150px";
			switch (data.equipments[i].quality) {
			case 1:
				font.color = "white";
				break;
			case 2:
				font.color = "green";
				break;
			case 3:
				font.color = "blue";
				break;
			case 4:
				font.color = "purple";
				break;
			case 5:
				font.color = "orange";
				break;
			case 6:
				font.color = "red";
				break;

			default:
				break;
			}
			nameTd.appendChild(font);
			font.innerHTML = data.equipments[i].equipmentName;
			idTd.innerHTML = data.equipments[i].id;
			noTd.innerHTML = data.equipments[i].equipmentNo;
			switch (data.equipments[i].itemSubtype) {
			case 1:
				subtypeTd.innerHTML = "武器";
				
				break;
			case 2:
				subtypeTd.innerHTML = "头盔";
				
				break;
			case 3:
				subtypeTd.innerHTML = "胸甲";
				
				break;
			case 4:
				subtypeTd.innerHTML = "护腿";
				
				break;
			case 5:
				subtypeTd.innerHTML = "靴子";
				
				break;
			case 6:
				subtypeTd.innerHTML = "护腕";
				
				break;

			default:
				break;
			}
			typeTd.innerHTML = "装备";
			tr.appendChild(idTd);
			tr.appendChild(noTd);
			tr.appendChild(nameTd);
			tr.appendChild(typeTd);
			tr.appendChild(subtypeTd);
			tr.appendChild(operateTd);
			testTable.appendChild(tr);
		}
		//道具
		for ( var i in data.items) {
			var tr = document.createElement("tr");
			var idTd = document.createElement("td");
			var noTd = document.createElement("td");
			var nameTd = document.createElement("td");
			var typeTd = document.createElement("td");
			var subtypeTd = document.createElement("td");
			var operateTd = document.createElement("td");
			var button = document.createElement("button");
			button.id = data.items[i].itemNo;
			button.value = 2;
			button.onclick = additem;
			button.innerHTML = "添加";
			operateTd.appendChild(button);
			var font = document.createElement("font");
			idTd.width = "150px";
			noTd.width = "150px";
			nameTd.width = "150px";
			typeTd.width = "150px";
			subtypeTd.width = "150px";
			operateTd.width = "150px";
			switch (data.items[i].quality) {
			case 1:
				font.color = "white";
				break;
			case 2:
				font.color = "green";
				break;
			case 3:
				font.color = "blue";
				break;
			case 4:
				font.color = "purple";
				break;
			case 5:
				font.color = "orange";
				break;
			case 6:
				font.color = "red";
				break;

			default:
				break;
			}
			nameTd.appendChild(font);
			font.innerHTML = data.items[i].itemName;
			idTd.innerHTML = data.items[i].id;
			noTd.innerHTML = data.items[i].itemNo;
			typeTd.innerHTML = "道具";
			subtypeTd.innerHTML = "道具";
			tr.appendChild(idTd);
			tr.appendChild(noTd);
			tr.appendChild(nameTd);
			tr.appendChild(typeTd);
			tr.appendChild(subtypeTd);
			tr.appendChild(operateTd);
			testTable.appendChild(tr);
		}
		//材料
		for ( var i in data.materials) {
			var tr = document.createElement("tr");
			var idTd = document.createElement("td");
			var noTd = document.createElement("td");
			var nameTd = document.createElement("td");
			var typeTd = document.createElement("td");
			var subtypeTd = document.createElement("td");
			var operateTd = document.createElement("td");
			var button = document.createElement("button");
			button.id = data.materials[i].materialNo;
			button.value = 3;
			button.onclick = additem;
			button.innerHTML = "添加";
			operateTd.appendChild(button);
			var font = document.createElement("font");
			idTd.width = "150px";
			noTd.width = "150px";
			nameTd.width = "150px";
			typeTd.width = "150px";
			subtypeTd.width = "150px";
			operateTd.width = "150px";
			switch (data.materials[i].quality) {
			case 1:
				font.color = "white";
				break;
			case 2:
				font.color = "green";
				break;
			case 3:
				font.color = "blue";
				break;
			case 4:
				font.color = "purple";
				break;
			case 5:
				font.color = "orange";
				break;
			case 6:
				font.color = "red";
				break;

			default:
				break;
			}
			nameTd.appendChild(font);
			font.innerHTML = data.materials[i].materialName;
			idTd.innerHTML = data.materials[i].id;
			noTd.innerHTML = data.materials[i].materialNo;
			typeTd.innerHTML = "材料";
			switch (data.materials[i].itemSubtype) {
			case 1:
				subtypeTd.innerHTML = "打造";
				break;
			case 2:
				break;
			case 3:
				subtypeTd.innerHTML = "宝石";
				break;
			case 4:
				subtypeTd.innerHTML = "其他";
				break;
			default:
				break;
			}
			tr.appendChild(idTd);
			tr.appendChild(noTd);
			tr.appendChild(nameTd);
			tr.appendChild(typeTd);
			tr.appendChild(subtypeTd);
			tr.appendChild(operateTd);
			testTable.appendChild(tr);
		}
		//任务
		for ( var i in data.quests) {
			var tr = document.createElement("tr");
			var idTd = document.createElement("td");
			var noTd = document.createElement("td");
			var nameTd = document.createElement("td");
			var typeTd = document.createElement("td");
			var subtypeTd = document.createElement("td");
			var operateTd = document.createElement("td");
			var button = document.createElement("button");
			button.id = data.quests[i].itemNo;
			button.value = 4;
			button.onclick = additem;
			button.innerHTML = "添加";
			operateTd.appendChild(button);
			var font = document.createElement("font");
			idTd.width = "150px";
			noTd.width = "150px";
			nameTd.width = "150px";
			typeTd.width = "150px";
			subtypeTd.width = "150px";
			operateTd.width = "150px";
			switch (data.quests[i].quality) {
			case 1:
				font.color = "white";
				break;
			case 2:
				font.color = "green";
				break;
			case 3:
				font.color = "blue";
				break;
			case 4:
				font.color = "purple";
				break;
			case 5:
				font.color = "orange";
				break;
			case 6:
				font.color = "red";
				break;

			default:
				break;
			}
			nameTd.appendChild(font);
			font.innerHTML = data.quests[i].itemName;
			idTd.innerHTML = data.quests[i].id;
			noTd.innerHTML = data.quests[i].itemNo;
			typeTd.innerHTML = "任务";
			subtypeTd.innerHTML = "任务";
			tr.appendChild(idTd);
			tr.appendChild(noTd);
			tr.appendChild(nameTd);
			tr.appendChild(typeTd);
			tr.appendChild(subtypeTd);
			tr.appendChild(operateTd);
			testTable.appendChild(tr);
		}
	}
	function additem(){
		$.ajaxPost("<%=path %>/addItem",{itemNo:this.id,itemType:this.value },addInfo);
	}
	function addInfo(data){
		if(data){
			console.log("添加成功");
		}
	}
	
	function updateResource(){
		$.ajaxPost("<%=path %>/updateResourceForTest",{food:$("#food").val(),wood:$("#wood").val(),stone:$("#stone").val(),ironore:$("#ironore").val(),money:$("#money").val() },updateInfo);
	}
	function updateInfo(data){
		if(data){
			console.log("修改成功");
		}
	}
</script>
</head>
<body onload="loadPage()">
	<div>
		<table border="" bgcolor="grey">
			<tr><th colspan="6" bgcolor="yellow">资源修改</th></tr>
			<tr><td id="moneyInfo" width="150px">铜币</td><td  width="150px"><input id="money"></td><td id="foodInfo"  width="150px">粮食</td><td  width="150px"><input id="food"></td><td id="woodInfo"  width="150px">木材</td><td  width="150px"><input id="wood"></td></tr>
			<tr><td id="stoneInfo">石矿</td><td><input id="stone"></td><td id="ironoreInfo">铁矿</td><td><input id="ironore"></td></tr>
			<tr><td colspan="6" align=right><button onclick="updateResource()">修改</button></td></tr>
		</table>
		</div>
		<div>
		<table border="" bgcolor="yellow" width="800px">
			<tr><th colspan="6">装备添加</th></tr>
			<tr><th width="150px">物品Id</th><th width="150px">物品NO</th><th width="150px">物品名称</th><th width="150px">物品类型</th><th width="150px">物品子类别</th><th width="150px">操作</th></tr>
		</table>
		</div>
		<div  style="overflow:auto;height:500px;width:800px" >
		<table id="testTable" border="" bgcolor="grey" >
		
		</table>
	</div>
</body>
</html>