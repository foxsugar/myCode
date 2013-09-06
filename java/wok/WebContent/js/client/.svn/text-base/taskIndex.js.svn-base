var isTaskIndexOpen = true;
/** ************任务索引导航*********************** */
var taskIndexStatic = {
	buttonStatusCommon : 1,
	buttonStatusOver : 2,
	buttonStatusSelected : 3,
	buttonStatusUnselected : 4,
	submitButtonCommon : 1,
	submitButtonOver : 2,
	submitButtonForbid : 3,
};
var taskIndex = {
	taskIndexTitle : "任 务",
	taskIndexTitleBody : "bolder 18px 黑体",
	taskIndexTitleColor : "#e09900",
	taskIndexX : 1185,
	taskIndexY : 100,
	taskIndexWidth : 254,//273
	taskIndexHeight : 286,
	backgroudColor : "rgba(0,0,0,.6)",
	borderColor : "#aa7d52",
	mainBody : "bolder 18px 黑体",
	mainColor : "#e09900",
	subTitleBody : "14px 微软雅黑",
	subTitleColor : "#ffda89",
	subContentBody : "12px 宋体",
	subContentColor : "#ffffff",
	openButton : "ty_an_136",
	closeButton : "ty_an_137",
	showButton : "zjm_ltk_08",
	hideButton : "zjm_ltk_07",
	submitButtonCommon : "zjm_48",
	submitButtonOver : "zjm_49",
	submitButtonForbid : "zjm_50",
	minSpace : 9,
	maxSpace : 12,
	offsetY : 0,
	screenWidth:1440,//屏幕宽度
	limitScreenWidth:1200,//自适应最小屏幕宽度
};
taskIndex.initMain = function() {
	taskIndex.data = new Array();
	var mainQuest = {
		name : "主线",
		buttonStatus : taskIndexStatic.buttonStatusSelected,
	};
	taskIndex.data.push(mainQuest);
	var branchQuest = {
		name : "支线",
		buttonStatus : taskIndexStatic.buttonStatusSelected,
	};
	taskIndex.data.push(branchQuest);
	var mainQuest = {
		name : "声望",
		buttonStatus : taskIndexStatic.buttonStatusSelected,
	};
	taskIndex.data.push(mainQuest);
	var mainQuest = {
		name : "武将",
		buttonStatus : taskIndexStatic.buttonStatusSelected,
	};
	taskIndex.data.push(mainQuest);
	var mainQuest = {
		name : "活动",
		buttonStatus : taskIndexStatic.buttonStatusSelected,
	};
	taskIndex.data.push(mainQuest);
};
taskIndex.initMain();
taskIndex.initListBegin = function(){
	taskIndex.listBeginX = taskIndex.taskIndexX + 2;
	taskIndex.listBeginY = taskIndex.taskIndexY + 28;
};
taskIndex.initSubmitBegin = function(){
	taskIndex.submitButtonX = taskIndex.taskIndexX + taskIndex.taskIndexWidth
	- 22 - gbox.getImage(taskIndex.submitButtonCommon).width;
};
taskIndex.init = function() {
	taskIndex.initListBegin();
	var showHideButtonWidth = gbox.getImage(taskIndex.showButton).width;
	var showHideButtonHeight = gbox.getImage(taskIndex.showButton).height;
	taskIndex.showHideButtonX = taskIndex.taskIndexX + taskIndex.taskIndexWidth
			- showHideButtonWidth - 2;
	taskIndex.showHideButtonY = taskIndex.taskIndexY + 2;
	taskIndex.showHideButtonArea = [
			[ taskIndex.showHideButtonX, taskIndex.showHideButtonY ],
			[ taskIndex.showHideButtonX + showHideButtonWidth,
					taskIndex.showHideButtonY ],
			[ taskIndex.showHideButtonX + showHideButtonWidth,
					taskIndex.showHideButtonY + showHideButtonHeight ],
			[ taskIndex.showHideButtonX,
					taskIndex.showHideButtonY + showHideButtonHeight ] ];
	taskIndex.area = [
			[ taskIndex.taskIndexX, taskIndex.taskIndexY ],
			[ taskIndex.taskIndexX + taskIndex.taskIndexWidth,
					taskIndex.taskIndexY ],
			[ taskIndex.taskIndexX + taskIndex.taskIndexWidth,
					taskIndex.taskIndexY + taskIndex.taskIndexHeight ],
			[ taskIndex.taskIndexX,
					taskIndex.taskIndexY + taskIndex.taskIndexHeight ] ];
	taskIndex.initSubmitBegin();
};

taskIndex.clickShowHideButton = function(x, y) {
	var xMin = taskIndex.showHideButtonArea[0][0];
	var yMin = taskIndex.showHideButtonArea[0][1];
	var xMax = taskIndex.showHideButtonArea[2][0];
	var yMax = taskIndex.showHideButtonArea[2][1];
	if (x > xMin && x < xMax && y > yMin && y < yMax) {
		isTaskIndexOpen ^= true;
		if (isTaskIndexOpen) {
			MouseWheelHandler.scrollClose();
			quest.getUserQuest(taskIndex.doGetUserQuestIndex);
		} else {
// 	    	clickObjectList[92].poly = [[0,0],[0,0],[0,0],[0,0]];
			MouseWheelHandler.scrollClose();
			taskIndex.openTaskIndex(com_group, com_layer);
			// taskIndex.closeTaskIndex();
		}
	}
};
/**
 * 打开任务追踪UI
 */
taskIndex.openTaskIndex = function(_group, _layer)// 任务对象
{
	var area = new Array();
	area.push(taskIndex.taskIndexX);
	area.push(taskIndex.taskIndexY);
	area.push(taskIndex.taskIndexWidth);
	area.push(taskIndex.taskIndexHeight);
	MouseWheelHandler.scrollOpen(area);
	if (_group == 'cityMenu') {
		gbox.setRenderOrder([ _group, 'level_1', 'level_2', 'levelMenu_1',
				'levelMenu_2', 'levelMenu_3', 'levelMenu_4', 'levelMenu_5' ]);
	} else
		gbox.setRenderOrder([ _group, 'levelMenu_1', 'levelMenu_2',
				'levelMenu_3', 'levelMenu_4', 'levelMenu_5' ]);
	// isDrawUI[index] = true;
	// isTaksUI = true;
	taskIndex.init();
	var object = gbox.getObject("level_2","taskIndex");
	if (object!=null) {
		if(isTaskIndexOpen){
			object.poly = taskIndex.area;
		}else{
			object.poly = taskIndex.showHideButtonArea;
		}
		return;
	}else{
		gbox.addObject({
			id : 'taskIndex',
			group : 'level_2',
			// tileset : taskObject.taskMainUI,
			// x : 0,
			// y : 0,
			// frame : 0,
			poly : taskIndex.area,
			initialize : function() {
			},
			first : function() {
			},
			myclick : function() {
				// taskObject.clickForMainUI(lastTouchMoveX, lastTouchMoveY, index,
				// _group);
				// changeMap(_layer);
				// console.log(taskIndex.area);
				console.log("bbbbbbbbbbbbbbbbbbbb");
				console.log("aaaaaaaaaaaaa");
				taskIndex.clickShowHideButton(lastTouchMoveX, lastTouchMoveY);
				taskIndex.clickList(lastTouchMoveX, lastTouchMoveY);
				curGroup = 'cityMenu';
			},
			blit : function() {
				if (isTaskIndexOpen) {
					MouseWheelHandler.scroll(touchMoveX, touchMoveY,
							taskIndex.listMouseWheel);
					taskIndex.screenAdaptive();
					taskIndex.mouseMove(touchMoveX, touchMoveY);
					taskIndex.drawOpenStatus();
				} else {
					taskIndex.drawCloseStatus();
				}
			}
		});
	}
};
taskIndex.drawOpenStatus = function() {
	var ctx = gbox.getBufferContext();
	ctx.save();
	// ctx.globalAlpha = 1;
	// 绘制背景
	ctx.fillStyle = taskIndex.backgroudColor;
	ctx.fillRect(taskIndex.taskIndexX, taskIndex.taskIndexY,
			taskIndex.taskIndexWidth, taskIndex.taskIndexHeight);
	// 绘制边框
	ctx.strokeStyle = taskIndex.borderColor;
	ctx.strokeRect(taskIndex.taskIndexX, taskIndex.taskIndexY,
			taskIndex.taskIndexWidth, taskIndex.taskIndexHeight);
	// 画标题
	ctx.textBaseline = "top";// 文字顶部对齐
	ctx.textAlign = "center";
	ctx.fillStyle = taskIndex.taskIndexTitleColor;
	ctx.font = taskIndex.taskIndexTitleBody;
	var x = taskIndex.taskIndexX + taskIndex.taskIndexWidth / 2;
	var y = taskIndex.taskIndexY + 3;
	ctx.fillText(taskIndex.taskIndexTitle, x >> 0, y >> 0);
	ctx.restore();
	taskIndex.drawList(ctx);
	gbox.drawImage(taskIndex.hideButton, taskIndex.showHideButtonArea[0][0],
			taskIndex.showHideButtonArea[0][1]);
};

/**
 * 点击列表控制
 */
taskIndex.clickList = function(clickX, clickY) {
//	taskIndex.init();
	var x = taskIndex.listBeginX;
	var y = taskIndex.listBeginY+taskIndex.offsetY;
	var closeOpenButtonWidth = gbox.getImage(taskIndex.closeButton).width;
	var closeOpenButtonHeight = gbox.getImage(taskIndex.closeButton).height;
	var submitButtonWidth = gbox.getImage(taskIndex.submitButtonCommon).width;
	var submitButtonHeight = gbox.getImage(taskIndex.submitButtonCommon).height;
	for ( var i = 0; i < taskIndex.data.length; i++) {
		if (taskIndex.data[i].info == null
				|| taskIndex.data[i].info.length == 0) {
			continue;
		}
		if (clickX > x && clickX < x + closeOpenButtonWidth && clickY > y
				&& clickY < y + closeOpenButtonHeight) {// 加减号按钮
			if(taskIndex.data[i].buttonStatus ==taskIndexStatic.buttonStatusSelected){
				taskIndex.data[i].buttonStatus =taskIndexStatic.buttonStatusUnselected;
			}else{
				taskIndex.data[i].buttonStatus =taskIndexStatic.buttonStatusSelected;
			}
		}
		y += 20;
		y += taskIndex.maxSpace;
		if (taskIndex.data[i].buttonStatus == taskIndexStatic.buttonStatusSelected) {
			for ( var j = 0; j < taskIndex.data[i].info.length; j++) {
				var data = taskIndex.data[i].info[j];
				if (clickX > taskIndex.submitButtonX
						&& clickX < taskIndex.submitButtonX + submitButtonWidth
						&& clickY > y
						&& clickY < y + submitButtonHeight
						&& data.status == 1) {// 完成按钮
					//提交操作
					quest.submitQuest(data.id,taskObject.doSubmitQuest);
//					taskObject.
				}

				y += 14;
				y += taskIndex.minSpace;
				y += 12;
				y += taskIndex.maxSpace;
			}
		}
	}
};
/**
 * 鼠标移动控制
 */
taskIndex.mouseMove = function(mouseX, mouseY) {
//	taskIndex.init();
	var x = taskIndex.listBeginX;
	var y = taskIndex.listBeginY+taskIndex.offsetY;
	var closeOpenButtonWidth = gbox.getImage(taskIndex.closeButton).width;
	var closeOpenButtonHeight = gbox.getImage(taskIndex.closeButton).height;
	var submitButtonWidth = gbox.getImage(taskIndex.submitButtonCommon).width;
	var submitButtonHeight = gbox.getImage(taskIndex.submitButtonCommon).height;
	for ( var i = 0; i < taskIndex.data.length; i++) {
		if (taskIndex.data[i].info == null
				|| taskIndex.data[i].info.length == 0) {
			continue;
		}
		if (mouseX > x && mouseX < x + closeOpenButtonWidth && mouseY > y
				&& mouseY < y + closeOpenButtonHeight) {// 加减号按钮

		}
		y += 20;
		y += taskIndex.maxSpace;
		if (taskIndex.data[i].buttonStatus == taskIndexStatic.buttonStatusSelected) {// 画子任务
			for ( var j = 0; j < taskIndex.data[i].info.length; j++) {
				var data = taskIndex.data[i].info[j];
				if (mouseX > taskIndex.submitButtonX
						&& mouseX < taskIndex.submitButtonX + submitButtonWidth
						&& mouseY > y
						&& mouseY < y + submitButtonHeight
						&& data.status == 1) {// 完成按钮

					data.buttonStatus = taskIndexStatic.submitButtonOver;
				} else if (data.status == 1) {
					data.buttonStatus = taskIndexStatic.submitButtonCommon;
				}

				y += 14;
				y += taskIndex.minSpace;
				y += 12;
				y += taskIndex.maxSpace;
			}
		}
	}
};
/*
 *  屏幕自适应
 */
taskIndex.screenAdaptive = function()
{
	 var tempOffsetWidth=0;
	 if(document.body.clientWidth >= taskIndex.screenWidth)
	      tempOffsetWidth = taskIndex.screenWidth;
	 else
	      tempOffsetWidth = document.body.clientWidth;
	 if(tempOffsetWidth > taskIndex.limitScreenWidth)
		   taskIndex.taskIndexX = (tempOffsetWidth - taskIndex.taskIndexWidth) + document.body.scrollLeft ;
	 else
		   taskIndex.taskIndexX = taskIndex.screenWidth - taskIndex.taskIndexWidth;
	taskIndex.openTaskIndex(com_group,com_layer);	   
//     var tempOffsetHeight = 0;    
//	 if(document.body.clientHeight > gbox.getScreenH())
//			tempOffsetHeight = document.body.clientHeight - gbox.getScreenH();
//	 else
//			tempOffsetHeight = 0;
//	 taskIndex.taskIndexY = document.body.clientHeight - tempOffsetHeight +  document.body.scrollTop;
}; 
taskIndex.drawCloseStatus = function() {
	gbox.drawImage(taskIndex.showButton, taskIndex.showHideButtonArea[0][0],
			taskIndex.showHideButtonArea[0][1]);
};
taskIndex.drawList = function(ctx) {
//	taskIndex.init();
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(taskIndex.listBeginX, taskIndex.listBeginY);
	ctx.lineTo(taskIndex.taskIndexX+taskIndex.taskIndexWidth, taskIndex.listBeginY);
	ctx.lineTo(taskIndex.taskIndexX+taskIndex.taskIndexWidth, taskIndex.taskIndexY+taskIndex.taskIndexHeight);
	ctx.lineTo(taskIndex.listBeginX, taskIndex.taskIndexY+taskIndex.taskIndexHeight);
	ctx.closePath();
	ctx.clip();
	ctx.textBaseline = "top";// 文字顶部对齐
	ctx.textAlign = "left";
	var x = taskIndex.listBeginX;
	var y = taskIndex.listBeginY+taskIndex.offsetY;
	for ( var i = 0; i < taskIndex.data.length; i++) {
		if (taskIndex.data[i].info == null
				|| taskIndex.data[i].info.length == 0) {
			continue;
		}
		if (taskIndex.data[i].buttonStatus == taskIndexStatic.buttonStatusSelected) {
			gbox.drawImage(taskIndex.closeButton, x, y);
		} else {
			gbox.drawImage(taskIndex.openButton, x, y);
		}
		var width = gbox.getImage(taskIndex.openButton).width;
		ctx.fillStyle = taskIndex.mainColor;
		ctx.font = taskIndex.mainBody;
		ctx.fillText(taskIndex.data[i].name, (x + width + 5)>>0, y>>0);
		y += 20;
		y += taskIndex.maxSpace;
		if (taskIndex.data[i].buttonStatus == taskIndexStatic.buttonStatusSelected) {// 画子任务
			for ( var j = 0; j < taskIndex.data[i].info.length; j++) {
				var data = taskIndex.data[i].info[j];
				ctx.fillStyle = taskIndex.subTitleColor;
				ctx.font = taskIndex.subTitleBody;
				ctx.fillText(data.questName, (x + width + 5)>>0, y>>0);

				taskIndex.drawSubmitButton(data, taskIndex.submitButtonX, y,
						ctx);
				ctx.fillStyle = taskIndex.subContentColor;
				ctx.font = taskIndex.subContentBody;
				y += 14;
				y += taskIndex.minSpace;
				var subButtonWidth = gbox.getImage(taskIndex.submitButtonForbid).width;
				ctx.textBaseline = "top";// 文字顶部对齐
				ctx.textAlign = "center";
				ctx.fillText(data.targetAmount+"/"+data.targetNeedAmount, (taskIndex.submitButtonX+subButtonWidth/2)>>0, (y+1)>>0);
				ctx.textBaseline = "top";// 文字顶部对齐
				ctx.textAlign = "left";
				ctx.fillText(data.targetDesc, (x + width + 5)>>0, y>>0);
				y += 12;
				y += taskIndex.maxSpace;
			}
		}
	}
	
	ctx.restore();
};
taskIndex.drawSubmitButton = function(data, x, y, ctx) {
	if (data.status == 0) {
		gbox.drawImage(taskIndex.submitButtonForbid, x, y);
	} else if (data.status == 1 && (typeof (data.buttonStatus) == "undefined"
			|| data.buttonStatus == taskIndexStatic.submitButtonCommon)) {
		gbox.drawImage(taskIndex.submitButtonCommon, x, y);
	} else if (data.status == 1
			&& data.buttonStatus == taskIndexStatic.submitButtonOver) {
		gbox.drawImage(taskIndex.submitButtonOver, x, y);
	}
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	var width = gbox.getImage(taskIndex.submitButtonForbid).width;
	var height = gbox.getImage(taskIndex.submitButtonForbid).height;
	ctx.fillStyle = taskIndex.subContentColor;
	ctx.font = taskIndex.subContentBody;
	ctx.fillText("完成", (x + width / 2)>>0, (y + height / 2)>>0);

};
// 接数据
taskIndex.getUserQuestForIndex = function(data) {
	taskIndex.data[0].info = data.mainQuest;
	taskIndex.data[1].info = data.branchQuest;
	taskIndex.data[2].info = data.reputationQuest;
	taskIndex.data[3].info = data.heroQuest;
	taskIndex.data[4].info = data.activityQuest;
};
taskIndex.doGetUserQuestIndex = function(data) {// 打开任务界面的回调
	taskIndex.getUserQuestForIndex(data);// 初始化任务列表
	console.log("com_group == " + com_group);
	console.log("com_layer == " + com_layer);
	taskIndex.openTaskIndex(com_group, com_layer);
	
};

// ////////////
/**
 * 鼠标滚轮事件回调
 */
taskIndex.listMouseWheel = function(event, delta){
	var temp = taskIndex.offsetY + delta * 7;
	console.log("aaaaa"+temp);
	if (temp > 0) {
		taskIndex.offsetY = 0;
	} 
//	else if (temp > listInfo.listStartHeigthMax) {
//		listInfo.startPaintHeight = listInfo.listStartHeigthMax;
//	}
	else {
		taskIndex.offsetY = temp;
	};
};
