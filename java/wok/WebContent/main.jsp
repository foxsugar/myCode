<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript" src="js/exchangeData.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">

	function C_Param(c_time, c_location) {

		this.c_time = c_time;
		this.c_location = c_location;
		this.interval = null;
	};

	Clock = {};
	Clock.intervalFunction = function(c_param) {
		c_param.c_time -= 1000;
		if (c_param.c_time <= 0) {
			window.clearInterval(c_param.interval);
		}
		var div = document.getElementById("div" + c_param.c_location);
		if (div == null) {
			div = document.createElement("div");
			div.id = "div" + c_param.c_location;
			document.getElementById("log").appendChild(div);
		}
		div.innerHTML = c_param.c_time;
		getAllBuildings(doGetAllBuildings);
	};
	Clock.start = function(c_param) {
		c_param.interval = window.setInterval(function() {
			Clock.intervalFunction(c_param)
		}, 1000);
	};
	function doGetAllBuildings(data) {
		var castleBuildings = data.castleBuildings;
		var buildingList = data.buildingList;
		var str = "城内建筑为：<br />";
		if (castleBuildings != null) {
			for ( var i = 0; i < castleBuildings.length; i++) {
				str += castleBuildings[i].buildingEntity.name + ",等级 "
						+ castleBuildings[i].level + " 位置："
						+ castleBuildings[i].location + "<br />";
			}
		}
		if (buildingList != null) {
			str += "建造队列为：<br />";
			for ( var j = 0; j < buildingList.length; j++) {
				str += buildingList[j].buildingEntity.name + ",等级 "
						+ buildingList[j].level + " 位置："
						+ castleBuildings[j].location + "...<br />";
			}
		}
		$("allBuildings").innerHTML = str;
		if (data.error != null) {
			$("allBuildings").innerHTML = data.error;
		}
	}
	
	function doGetBuildingTree(data) {
		var str = "建筑树为：<br />";
		if (data != null) {
			for ( var i = 0; i < data.length; i++) {
				str += data[i].name + ",可建造： "
				+ data[i].canBuild + " 已建造："
				+ data[i].built + " <br />";
			}
		}
		$("buildingTree").innerHTML = str;
		if (data.error != null) {
			$("buildingTree").innerHTML = data.error;
		}
	}
	
	function build() {
		Building.build($("buildName").value, $("buildLocation").value, doBuild);
	}
	function doBuild(data) {
		var content = $("log").innerHTML;
		if (data.error != null) {
			$("log").innerHTML += data.error + "<br />";
		} else {
			new Clock.start(new C_Param(data.building.remainedTime, $("buildLocation").value));
			content += "位置：" + data.building.location + "，开始建造 "
					+ data.building.buildingEntity.name + "，耗时："
					+ data.building.remainedTime + "ms 建筑物为："
					+ data.building.buildingId + "<br />";
			$("log").innerHTML = content;
		}
	}
	function upgrade() {
		Building.upgrade($("buildLocation").value, doUpgrade);
	}
	function doUpgrade(data) {
		var content = $("log").innerHTML;
		if (data.error != null) {
			$("log").innerHTML += data.error + "<br />";
		} else {
			new Clock.start(new C_Param(data.building.remainedTime, $("buildLocation").value));
			content += "位置：" + data.building.location + "，开始升级 "
					+ data.building.buildingEntity.name + " 到 "
					+ data.building.level + " 级，耗时："
					+ data.building.remainedTime + "ms<br />";
			$("log").innerHTML = content;
		}
	}
	function demolition() {
		Building.demolition($("buildLocation").value, doDemolition);
	}
	function doDemolition(data) {
		var content = $("log").innerHTML;
		if (data.error != null) {
			new Clock.start(new C_Param(data.building.remainedTime, $("buildLocation").value));
			$("log").innerHTML += data.error + "<br />";
		} else {
			content += "位置：" + data.building.location + "，开始拆除 "
					+ data.building.buildingEntity.name + "，耗时："
					+ data.building.remainedTime + "ms<br />";
			$("log").innerHTML = content;
		}
	}
	function cancel() {
		Building.cancel($("buildLocation").value, doCancel);
	}
	function doCancel(data) {
		var content = $("log").innerHTML;
		if (data.error != null) {
			$("log").innerHTML += data.error + "<br />";
		} else {
			content += "位置：" + data.buildingEntity.name.location + "，取消 "
					+ data.building.buildingEntity.name + "<br />";
			$("log").innerHTML = content;
		}
	}
	function doGetBuildingList(data){
		var str = "";
		for(var i=0;i<data.length;i++){
			str+=data[i].startTime+"<br />";
		}
		$("buildingList").innerHTML += str;
	}
</script>

<title>王者之战</title>
</head>
<body>
	<div>
		<h2>登录账号为：${account.acName}</h2>
		账号详细信息：${account}
	</div>
	<div>
		<h2>角色名：${character.charName}</h2>
		角色详细信息：${character}
	</div>
<hr />
	<c:forEach items="${characterList}" var="ch">
		${ch}<br />
	</c:forEach>
<hr />
	<div id="allBuildings"></div>
	<div id="buildingTree"></div>
	<div style="background-color: green;" id="buildingList">dfd</div>
<hr />
	<div id="log"></div>
<hr />
	<button onClick="getAllBuildings(doGetAllBuildings)">获取所有建筑</button>
	<button onClick="getBuildingTree(doGetBuildingTree)">获取建筑树</button>
	<button onClick="getBuildingList(doGetBuildingList)">获取建筑队列</button>
	<button onClick="build()">建造</button>
	<button onClick="upgrade()">升级</button>
	<button onClick="demolition()">拆除</button>
	<button onClick="cancel()">取消</button><br />
	名称：<select id="buildName" >
			<option value="10110003">民居</option>
			<option value="10110004">兵营</option>
			<option value="10110005">科教馆</option>
			<option value="10110006">集市</option>
			<option value="10110007">国库</option>
			<option value="10110008">外务馆</option>
			<option value="10110009">加工坊</option>
			<option value="10110010">酒馆</option>
			<option value="10110011">聚贤阁</option>
			<option value="10110012">修炼馆</option>
			<option value="10110013">烽火台</option>
			<option value="10110014">练兵场</option>
			<option value="10110015">医馆</option>
			<option value="10110016">教坊</option>
			<option value="10110001">太尉府</option>
			<option value="10110002">城墙</option>
		</select><br />
	位置: <input id="buildLocation" type="text" />
<hr />
	<form action="getUserInfo" method="post">
		<input type="submit" />
	</form>
<a href="charactertest.html">角色功能测试</a>
<a href="getAllItem">物品表操作</a>
<a href="mail.jsp">邮件</a>
</body>
</html>