<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="<%=path %>/js/client/jquery.js"></script>
<script type="text/javascript" src="<%=path %>/js/severDataInterface/dataCometd.js"></script>
<script type="text/javascript" src="<%=path %>/js/client/jquery.cometd.js"></script>
<script type="text/javascript">
	var fieldType;
	var fieldId;
	var select;
	function getUserFieldInfo() {
		$.ajaxPost("<%=path%>/getUserFieldInfo",function(a){
			console.log(select);
			if(typeof(select)=="undefined"){
				console.log("aaaaaaaaaa");
				select = document.createElement("select");
			}else{
				document.getElementById("fieldDiv").removeChild(select);
				select = document.createElement("select");
			}
			console.log(a);
			var foods = a.foodField;
			var woods = a.woodField;
			var stones = a.stoneField;
			var ferrums = a.ferrumField;
			
			var fieldDiv = document.getElementById("fieldDiv");
			select.id = "field";
			
			for ( var i in foods) {
				var option = document.createElement("option");
				option.text="食物地块"+i+"! ====状态:"+foods[i].fieldStatus;
				option.value = i;
				option.onclick = function(){
					fieldType = 0;
					var sel = document.getElementById("field");
					fieldId = sel.options[sel.options.selectedIndex].value;
					fieldIndex = $('#field').get(0).selectedIndex;
					console.log(fieldId);
					console.log(fieldType);
					console.log(fieldIndex);
				};
				select.appendChild(option);
			}
			for ( var i in woods) {
				var option = document.createElement("option");
				option.text="木材地块"+i+"! ====状态:"+woods[i].fieldStatus;
				option.value = i;
				option.onclick = function(){
					fieldType = 1;
					var sel = document.getElementById("field");
					fieldId = sel.options[sel.options.selectedIndex].value;
					fieldIndex = $('#field').get(0).selectedIndex;
					console.log(fieldId);
					console.log(fieldType);
					console.log(fieldIndex);
				};
				select.appendChild(option);
			}
			for ( var i in stones) {
				var option = document.createElement("option");
				option.text="石料地块"+i+"! ====状态:"+stones[i].fieldStatus;
				option.value = i;
				option.onclick = function(){
					fieldType = 2;
					var sel = document.getElementById("field");
					fieldId = sel.options[sel.options.selectedIndex].value;
					fieldIndex = $('#field').get(0).selectedIndex;
					console.log(fieldId);
					console.log(fieldType);
					console.log(fieldIndex);
				};
				select.appendChild(option);
			}
			for ( var i in ferrums) {
				var option = document.createElement("option");
				option.text="铁矿地块"+i+"! ====状态:"+ferrums[i].fieldStatus;
				option.value = i;
				option.onclick = function(){
					fieldType = 3;
					var sel = document.getElementById("field");
					fieldId = sel.options[sel.options.selectedIndex].value;
					fieldIndex = $('#field').get(0).selectedIndex;
					console.log(fieldId);
					console.log(fieldType);
					console.log(fieldIndex);
				};
				select.appendChild(option);
			}
			fieldDiv.appendChild(select);
		});
	}
	function plantResource(){
		$.ajaxPost("<%=path%>/plantResource",{fieldType:fieldType,fieldId:fieldId,growTime:$("#growTime option:selected").val()},function(a){
			if(a==true){
				alert("种植成功");
			}
		});
	}
	function harvestResource(){
		$.ajaxPost("<%=path%>/harvestResource",{fieldType:fieldType,fieldId:fieldId},function(a){
			console.log(a);
		});
	}
	function deleteResourceField(){
		$.ajaxPost("<%=path%>/deleteResourceField",{fieldType:fieldType,fieldId:fieldId},function(a){
			if(a==true){
				alert("整地成功");
			}
		});
	}
	function easyHarvestResource(){
		$.ajaxPost("<%=path%>/easyHarvestResource",function(a){
			console.log(a);
		});
	}
	window.onload= function(){
		console.log("连接中 ");
		var cometd = $.cometd;
		cometd.configure({url:"http://172.17.4.115:8080/wok/cometd"});
		cometd.handshake();
		cometd.addListener("/meta/handshake",function(message){
			console.log("连接中 ");
			if(message.successful){
				console.log("服务器连接成功");
				console.log('/gameSystem/'+'${character.charId}');
				cometd.subscribe('/gameSystem/'+'${character.charId}',function(cometData){
					var systemType = cometData.data.systemType;
					var data = cometData.data.systemData;
					switch (systemType) {
					case 1:
						//军情提示
						doBattleWarn(data);
						break;
					case 2:
						//战场回合轮换
						doBattleTurn(data);
						break;
					case 3:
						//战场结束
						console.log(data);
		//				doBattleEnd(data);
						break;
					default:
						break;
					}
				});
			}
		});
	}
	var userItemId = 19;
	function testItem(){
		$.ajaxPost("<%=path%>/testItem",{userItemId:userItemId},function(a){
			console.log("ssssssss");
		});
	}
</script>
</head>
<body>
	<button id="getUserFieldInfo" onclick="getUserFieldInfo()">获取用户资源块</button>
	<select id="growTime"><option value="0">3</option><option value="1">6</option><option value="2">12</option><option value="3">24</option></select>
	<button id="plantResource" onclick="plantResource()">种植</button>
	<button id="harvestResource" onclick="harvestResource()">收获</button>
	<button id="deleteResourceField" onclick="deleteResourceField()">整地</button>
	<button id="easyHarvestResource" onclick="easyHarvestResource()">一键收取</button>
	<button id="easyHarvestResource" onclick="testItem()">测试</button>
	<div id="fieldDiv"></div>
</body>
</html>