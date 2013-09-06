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
			Clock.intervalFunction(c_param);
		}, 1000);
	};
	
	function doGetAllBuildings(data) {
		var castleBuildings = data.castleBuildings;
		var buildingList = data.buildingList;
		var div_building = document.getElementById("building");
		var count = div_building.childNodes.length;
		for(var j=0;j<count;j++){
			div_building.removeChild(div_building.firstChild);
		}
		if (castleBuildings != null) {
			var ol = document.createElement("ol");
			var li;
			for(var ii = 1;ii<=27;ii++){
				li = document.createElement("li");
				li.id="li_"+ii;
				li.innerHTML = "<button>建造</button>";
				ol.appendChild(li);
			}
			div_building.appendChild(ol);
			for ( var i = 0; i < castleBuildings.length; i++) {
				document.getElementById("li_"+castleBuildings[i].location).innerHTML = castleBuildings[i].buildingEntity.name+"("+castleBuildings[i].level+")"+
				"<div id='div_"+castleBuildings[i].location+"' style='display:inline'><button onClick='_demolition("+castleBuildings[i].location+")'>拆除</button>" +
				"<button onClick='_upgrade("+castleBuildings[i].location+")'>升级</button></div>";
			}
		}
		if (buildingList != null) {
			for ( var j = 0; j < buildingList.length; j++) {
			}
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
		document.getElementById("buildingTree").innerHTML = str;
		if (data.error != null) {
			document.getElementById("buildingTree").innerHTML = data.error;
		}
	}
	
	function build() {
		Building.build(document.getElementById("buildName").value, document.getElementById("buildLocation").value, doBuild);
	}
	function doBuild(data) {
		var content = document.getElementById("log").innerHTML;
		if (data.error != null) {
			document.getElementById("log").innerHTML += data.error + "<br />";
		} else {
			new Clock.start(new C_Param(data.building.remainedTime, document.getElementById("buildLocation").value));
			content += "位置：" + data.building.location + "，开始建造 "
					+ data.building.buildingEntity.name + "，耗时："
					+ data.building.remainedTime + "ms 建筑物为："
					+ data.building.buildingId + "<br />";
			document.getElementById("log").innerHTML = content;
		}
	}
	function upgrade() {
		Building.upgrade(document.getElementById("buildLocation").value, doUpgrade);
	}
	function doUpgrade(data) {
		var content = document.getElementById("log").innerHTML;
		if (data.error != null) {
			document.getElementById("log").innerHTML += data.error + "<br />";
		} else {
			new Clock.start(new C_Param(data.building.remainedTime, document.getElementById("buildLocation").value));
			content += "位置：" + data.building.location + "，开始升级 "
					+ data.building.buildingEntity.name + " 到 "
					+ data.building.level + " 级，耗时："
					+ data.building.remainedTime + "ms<br />";
			document.getElementById("log").innerHTML = content;
		}
	}
	function demolition() {
		Building.demolition(document.getElementById("buildLocation").value, doDemolition);
	}
	function doDemolition(data) {
		var content = document.getElementById("log").innerHTML;
		if (data.error != null) {
			new Clock.start(new C_Param(data.building.remainedTime, document.getElementById("buildLocation").value));
			document.getElementById("log").innerHTML += data.error + "<br />";
		} else {
			content += "位置：" + data.building.location + "，开始拆除 "
					+ data.building.buildingEntity.name + "，耗时："
					+ data.building.remainedTime + "ms<br />";
			document.getElementById("log").innerHTML = content;
		}
	}
	function cancel() {
		Building.cancel(document.getElementById("buildLocation").value, doCancel);
	}
	function doCancel(data) {
		var content = document.getElementById("log").innerHTML;
		if (data.error != null) {
			document.getElementById("log").innerHTML += data.error + "<br />";
		} else {
			content += "位置：" + data.buildingEntity.name.location + "，取消 "
					+ data.building.buildingEntity.name + "<br />";
			document.getElementById("log").innerHTML = content;
		}
	}
	function doGetBuildingList(data){
		var str = "";
		for(var i=0;i<data.length;i++){
			str+=data[i].startTime+"<br />";
		}
		document.getElementById("buildingList").innerHTML += str;
	}
