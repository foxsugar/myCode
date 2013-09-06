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
<script type="text/javascript" src="test/js/build.js"></script>
</head>
<body>
<div id="buildingList" style="float: right">
	
</div>
<div id="building">
	
</div>
	<div id="allBuildings"></div>
	<div id="buildingTree"></div>
	<div id="buildingList"></div>
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
</body>
</html>