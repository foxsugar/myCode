/** **********任务系统************ */
//任务窗口开启控制
var isTaksUI = false;
var isTaskList = false;
// 定义任务对象
var taskObject = {};
//任务静态信息
var taskStatic = {
		submitButtonCommon : 0,
		submitButtonOver : 1,
		submitButtonForbid : 2,
		taskStatusComplete:1,
		taskStatusUncomplete:0,
		taskResetNone:0
};




/*****************************************************************/
/********************以下为任务主UI相关************************/
/*****************************************************************/

/**
 * 初始化任务主界面本地数据
 */
taskObject.initTaskObject = function() {
	taskObject.taskMainUI = 'rw_zjm_01';// 任务主界面
	taskObject.taskMainBorder = 'ty_an_27';// 任务边框
	taskObject.taskTitle = 'rw_zjm_12';// 任务标题
	taskObject.titleWidth = gbox.getImage(taskObject.taskTitle).width;// 任务标题宽度
	taskObject.widthOftaskUI = gbox.getImage(taskObject.taskMainUI).width;// 任务主UI宽度
	taskObject.heightOftaskUI = gbox.getImage(taskObject.taskMainUI).height;// 任务主UI高度
	taskObject.taskX = (gbox.getScreenW() - taskObject.widthOftaskUI) / 2;// 任务界面起始点X
	taskObject.taskY = (gbox.getScreenH() - taskObject.heightOftaskUI) / 2;// 任务界面起始点Y
	taskObject.buttonImage = "ty_an_10";// 按钮图片
	taskObject.buttonOverImage = "ty_an_09";// 按钮掠过图片
	taskObject.buttonForbidImage = "ty_an_11";// 按钮图片
	taskObject.buttonWidth = gbox.getImage(taskObject.buttonImage).width;//按钮宽度
	taskObject.buttonHeight = gbox.getImage(taskObject.buttonImage).height;//按钮高度
	taskObject.submitButton = "任务完成";// 任务提交
	taskObject.submitStatus = taskStatic.submitButtonCommon;// 任务提交
	taskObject.submitButtonX = taskObject.taskX+700;// 任务提交x
	taskObject.submitButtonY = taskObject.taskY+455;// 任务提交Y
	taskObject.resetButton = "任务置换";// 任务置换
	taskObject.resetStatus = taskStatic.submitButtonCommon;// 任务置换
	taskObject.resetButtonX = taskObject.taskX+590;// 任务提交x
	taskObject.resetButtonY = taskObject.taskY+455;// 任务提交Y
	taskObject.exitButton = "ty_an_18";//退出按钮图标
	taskObject.exitButtonOver = "ty_an_17";//退出按钮图标掠过
	taskObject.exitButtonWidth = gbox.getImage(taskObject.exitButton).width;//退出按钮图标宽度
	taskObject.exitButtonHeight = gbox.getImage(taskObject.exitButton).height;//退出按钮图标高度
	taskObject.exitButtonStatus = taskStatic.submitButtonCommon;//退出按钮图标掠过
	taskObject.exitButtonX = taskObject.taskX+786;
	taskObject.exitButtonY = taskObject.taskY+38;
	taskObject.taskArea = [
			[ taskObject.taskX, taskObject.taskY ],
			[ taskObject.taskX + taskObject.widthOftaskUI, taskObject.taskY ],
			[ taskObject.taskX + taskObject.widthOftaskUI,
					taskObject.taskY + taskObject.heightOftaskUI ],
			[ taskObject.taskX, taskObject.taskY + taskObject.heightOftaskUI ] ];
};

/**
 * 打开任务主UI
 */
taskObject.openTaskUI = function(index, _group, _layer)// 任务对象
{
	var area = new Array();
	area.push(taskObject.taskX);
	area.push(taskObject.taskY);
	area.push(taskObject.widthOftaskUI);
	area.push(taskObject.heightOftaskUI);
	MouseWheelHandler.scrollOpen(area);
	if (_group == 'cityMenu') {
		gbox.setRenderOrder([ _group, 'level_1', 'level_2', 'levelMenu_1',
				'levelMenu_2', 'levelMenu_3', 'levelMenu_4', 'levelMenu_5' ]);
	} else
		gbox.setRenderOrder([ _group, 'levelMenu_1', 'levelMenu_2',
				'levelMenu_3', 'levelMenu_4', 'levelMenu_5' ]);
	isDrawUI[index] = true;
	isTaksUI = true;
	gbox
			.addObject({
				id : 'taskMain',
				group : 'levelMenu_1',
				tileset : taskObject.taskMainUI,
				x : 0,
				y : 0,
				frame : 0,
				poly : taskObject.taskArea,
				initialize : function() {
				},
				first : function() {
				},
				myclick : function() {
					taskObject.clickForMainUI(lastTouchMoveX, lastTouchMoveY,index,_group);
					changeMap(_layer);
				},
				blit : function() {
					if (isDrawUI[index] && isTaksUI) {
						taskObject.moveForMainUI();
						taskObject.paintMainUI();
						MouseWheelHandler.scroll(touchMoveX, touchMoveY,
								taskObject.listMouseWheel);
					}
				}
			});
};
/**
 * 任务主UI画方法
 */
taskObject.paintMainUI = function() {
	// 画任务主界面
	gbox.drawImage(taskObject.taskMainUI, taskObject.taskX, taskObject.taskY);
	// 画任务边框
	gbox.drawImage(taskObject.taskMainBorder, taskObject.taskX,
			taskObject.taskY + 10);
	// 画任务题目
	gbox.drawImage(taskObject.taskTitle, taskObject.taskX
			+ taskObject.widthOftaskUI / 2 - taskObject.titleWidth / 2,
			taskObject.taskY+20);
	//画退出按钮
	if(taskObject.exitButtonStatus==taskStatic.submitButtonCommon){
		gbox.drawImage(taskObject.exitButton, taskObject.exitButtonX,
				taskObject.exitButtonY);
	}else{
		gbox.drawImage(taskObject.exitButtonOver, taskObject.exitButtonX,
				taskObject.exitButtonY);
	}

	taskObject.paintQuestInfo(taskObject.description, taskObject.taskX + 400,
			taskObject.taskY + 80,320);
	taskObject.paintQuestInfo(taskObject.targetDescription+"  "+(taskObject.targetAmount>taskObject.targetNeedAmount?taskObject.targetNeedAmount:taskObject.targetAmount)+"/"+taskObject.targetNeedAmount, taskObject.taskX + 400,
			taskObject.taskY + 280,320);
	switch (taskObject.submitStatus) {
	case taskStatic.submitButtonCommon:
		gbox.drawImage(taskObject.buttonImage,taskObject.submitButtonX,taskObject.submitButtonY);
		break;
	case taskStatic.submitButtonOver:
		gbox.drawImage(taskObject.buttonOverImage,taskObject.submitButtonX,taskObject.submitButtonY);
		break;
	case taskStatic.submitButtonForbid:
		gbox.drawImage(taskObject.buttonForbidImage,taskObject.submitButtonX,taskObject.submitButtonY);
		break;
	default:
		break;
	}
	gbox.drawText(taskObject.submitButton,taskObject.submitButtonX+14,taskObject.submitButtonY+5,10);
//	gbox.drawString(taskObject.submitButton,taskObject.submitButtonX+14,taskObject.submitButtonY+5,'#ffffff');
	switch (taskObject.resetStatus) {
	case taskStatic.submitButtonCommon:
		gbox.drawImage(taskObject.buttonImage,taskObject.resetButtonX,taskObject.resetButtonY);
		gbox.drawText(taskObject.resetButton,taskObject.resetButtonX+14,taskObject.resetButtonY+5,10);
		//gbox.drawString(taskObject.resetButton,taskObject.resetButtonX+14,taskObject.resetButtonY+5,'#ffffff');
		break;
	case taskStatic.submitButtonOver:
		gbox.drawImage(taskObject.buttonOverImage,taskObject.resetButtonX,taskObject.resetButtonY);
		gbox.drawText(taskObject.resetButton,taskObject.resetButtonX+14,taskObject.resetButtonY+5,10);
		//gbox.drawString(taskObject.resetButton,taskObject.resetButtonX+14,taskObject.resetButtonY+5,'#ffffff');
		break;
		
	default:
		break;
	}
};
/**
 * 任务主UI鼠标移动改变状态方法
 */
taskObject.moveForMainUI = function(){
	if(touchMoveX>taskObject.exitButtonX&&touchMoveX<taskObject.exitButtonX+taskObject.exitButtonWidth&&touchMoveY>taskObject.exitButtonY&&touchMoveY<taskObject.exitButtonY+taskObject.exitButtonHeight){
		taskObject.exitButtonStatus = taskStatic.submitButtonOver;
	}else{
		taskObject.exitButtonStatus = taskStatic.submitButtonCommon;
	}
	if(touchMoveX>taskObject.submitButtonX&&touchMoveX<taskObject.submitButtonX+taskObject.buttonWidth&&touchMoveY>taskObject.submitButtonY&&touchMoveY<taskObject.submitButtonY+taskObject.buttonHeight&&taskObject.submitStatus!=taskStatic.submitButtonForbid){
		taskObject.submitStatus =taskStatic.submitButtonOver;
	}else if(taskObject.submitStatus!=taskStatic.submitButtonForbid){
		taskObject.submitStatus =taskStatic.submitButtonCommon;
	}
	if(touchMoveX>taskObject.resetButtonX&&touchMoveX<taskObject.resetButtonX+taskObject.buttonWidth&&touchMoveY>taskObject.resetButtonY&&touchMoveY<taskObject.resetButtonY+taskObject.buttonHeight&&taskObject.resetStatus!=taskStatic.submitButtonForbid){
		taskObject.resetStatus =taskStatic.submitButtonOver;
	}else if(taskObject.resetStatus!=taskStatic.submitButtonForbid){
		taskObject.resetStatus =taskStatic.submitButtonCommon;
	}
};
/**
 * 任务主UI鼠标点击操作，改变相应状态
 */
taskObject.clickForMainUI = function(x,y,index,curGroup){
	var listInfo = taskObject.listInfo;
	if(x>taskObject.submitButtonX&&x<taskObject.submitButtonX+taskObject.buttonWidth&&y>taskObject.submitButtonY&&y<taskObject.submitButtonY+taskObject.buttonHeight&&taskObject.submitStatus!=taskStatic.submitButtonForbid){
		console.log("提交操作");
		//提交操作
		quest.submitQuest(listInfo.listSubClickTemp.id,taskObject.doSubmitQuest);
	}
	if(x>taskObject.resetButtonX&&x<taskObject.resetButtonX+taskObject.buttonWidth&&y>taskObject.resetButtonY&&y<taskObject.resetButtonY+taskObject.buttonHeight&&taskObject.resetStatus!=taskStatic.submitButtonForbid){
		//重置操作
		console.log("重置操作");
//		taskObject.resetStatus =taskStatic.submitButtonOver;
	}
	
	if(x>taskObject.exitButtonX&&x<taskObject.exitButtonX+taskObject.exitButtonWidth&&y>taskObject.exitButtonY&&y<taskObject.exitButtonY+taskObject.exitButtonHeight){
		displayDestroy();
		exit(index);
//		enterCityMenu(curGroup);
		curGroup = 'cityMenu';
		changeMap(com_layer);	
//		console.log("task_________________exit ==== " + curGroup);
	}
};

taskObject.doSubmitQuest = function(data){
	if(isTaskIndexOpen){//更新任务追踪
		taskIndex.getUserQuestForIndex(data);
	}
	if(isTaksUI){//更新任务UI
		var listInfo = taskObject.listInfo;
		taskObject.updateListInfo(data);//刷新任务list
		var main = null;
		var sub = null;
		for ( var i = 0; i < listInfo.mainListInfo.length; i++) {
			var mainListInfo = listInfo.mainListInfo[i];
			for ( var j = 0; j < mainListInfo.subMembers.length; j++) {
				if(mainListInfo.subMembers[j].status==taskStatic.taskStatusComplete){
					main = listInfo.mainListInfo[i];
					sub = mainListInfo.subMembers[j];
					break;
				}
			}
			if(sub!=null){
				break;
			}
		}
		if(sub!=null){
			listInfo.listMainClickTemp=main;
			listInfo.listSubClickTemp=sub;
			quest.getSpecficQuest(sub.id, taskObject.doSpecificClickForSubmit);
		}else{
			//初始化
//		listInfo.listMainClickTemp=listInfo.mainListInfo[0];
//		listInfo.listSubClickTemp=listInfo.mainListInfo[0].subMembers[0];
			quest.getSpecficQuest(listInfo.mainListInfo[0].subMembers[0].id, taskObject.doSpecificClickForSubmit);
		}
	}
};



/*****************************************************************/
/********************以下为任务列表相关************************/
/*****************************************************************/

/**
 * 打开任务列表
 */
taskObject.openTaskList = function(index, _group, _layer) {

	if (_group == 'cityMenu') {
		gbox.setRenderOrder([ 'cityMenu', 'level_1', 'level_2', 'levelMenu_1',
				'levelMenu_2', 'levelMenu_3', 'levelMenu_4', 'levelMenu_5' ]);
	} else
		gbox.setRenderOrder([ _group, 'levelMenu_1', 'levelMenu_2',
				'levelMenu_3', 'levelMenu_4', 'levelMenu_5' ]);
	isDrawUI[index] = true;
	isTaskList = true;
	gbox.addObject({
		id : 'taskList',
		group : 'levelMenu_1',
		tileset : 'rw_zjm_21',
		x : 0,
		y : 0,
		frame : 0,
		poly : taskObject.getAreaForControl(),
		initialize : function() {
			// 初始化数组信息
		},
		first : function() {
			taskObject.clickScrollQuest();
		},
		myclick : function() {
			taskObject.clickQuest(lastTouchMoveX, lastTouchMoveY);
			changeMap(_layer);
		},
		blit : function() {
			if (isDrawUI[index] && isTaskList) {
				taskObject.listMoveControl();
				taskObject.paintList();
			}
		}
	});
};
/**
 * 更新任务列表信息
 */
taskObject.updateListInfo = function(data){
	var mainListInfo = new Array();
	var mainQuestList = null;
	mainQuestList = new Array();
	for ( var i = 0; i < data.mainQuest.length; i++) {
		var mainQuest = {
			id : data.mainQuest[i].id,
			name : data.mainQuest[i].questName,
			status : data.mainQuest[i].status,
			selectedStatus : 0
		};
		mainQuestList.push(mainQuest);
	}
	mainListInfo.push({
		mainMember : "rw_zjm_03",// 主页卡文字图片
		mainMemberSelected : "rw_zjm_02",// 主页卡文字图片选择后
		selectedStatus : 0,
		subMembers : mainQuestList
	// 主页卡下的子页卡
	});
	mainQuestList = new Array();
	for ( var i = 0; i < data.branchQuest.length; i++) {
		var branchQuest = {
			id : data.branchQuest[i].id,
			name : data.branchQuest[i].questName,
			status : data.branchQuest[i].status,
			selectedStatus : 0
		};
		mainQuestList.push(branchQuest);
	}
	mainListInfo.push({
		mainMember : "rw_zjm_04",
		mainMemberSelected : "rw_zjm_05",
		selectedStatus : 0,
		subMembers : mainQuestList
	});
	mainQuestList = new Array();
	for ( var i = 0; i < data.reputationQuest.length; i++) {
		var reputationQuest = {
			id : data.reputationQuest[i].id,
			name : data.reputationQuest[i].questName,
			status : data.reputationQuest[i].status,
			selectedStatus : 0
		};
		mainQuestList.push(reputationQuest);
	}
	mainListInfo.push({
		mainMember : "rw_zjm_08",
		mainMemberSelected : "rw_zjm_09",
		selectedStatus : 0,
		subMembers : mainQuestList
	});
	mainQuestList = new Array();
	for ( var i = 0; i < data.heroQuest.length; i++) {
		var heroQuest = {
			id : data.heroQuest[i].id,
			name : data.heroQuest[i].questName,
			status : data.heroQuest[i].status,
			selectedStatus : 0
		};
		mainQuestList.push(heroQuest);
	}
	mainListInfo.push({
		mainMember : "rw_zjm_10",
		mainMemberSelected : "rw_zjm_11",
		selectedStatus : 0,
		subMembers : mainQuestList
	});
	mainQuestList = new Array();
	for ( var i = 0; i < data.activityQuest.length; i++) {
		var activityQuest = {
			id : data.activityQuest[i].id,
			name : data.activityQuest[i].questName,
			status : data.activityQuest[i].status,
			selectedStatus : 0
		};
		mainQuestList.push(activityQuest);
	}
	mainListInfo.push({
		mainMember : "rw_zjm_06",
		mainMemberSelected : "rw_zjm_07",
		selectedStatus : 0,
		subMembers : mainQuestList
	});
	mainListInfo[0].selectedStatus = 2;
	taskObject.listInfo.listMainClickTemp = mainListInfo[0];// 储存点击操作的主页卡信息
	if (mainListInfo[0].subMembers.length != 0) {
		mainListInfo[0].subMembers[0].selectedStatus = 2;
		taskObject.listInfo.listSubClickTemp = mainListInfo[0].subMembers[0];// 储存点击操作的子页卡信息
	}
	taskObject.listInfo.mainListInfo = mainListInfo;
};
/**
 * 初始化任务列表
 */
taskObject.initListInfo = function(data) {
	console.log("初始化任务列表");
	if(typeof(taskObject.listInfo)=="undefined"||taskObject.listInfo==null){
		taskObject.listInfo = {// 定义任务列表信息对象
				mainOptionSelect : "rw_zjm_20",// 主页卡背景选择
				mainOptionOver : "rw_zjm_19",// 主页卡背景掠过
				mainOptionCommon : "rw_zjm_21",// 主页卡背景普通
				mainOptionHeight : gbox.getImage("rw_zjm_20").height,// 主页卡高度
				mainOptionWidth : gbox.getImage("rw_zjm_20").width,// 主页卡宽度
				subOptionSelect : "rw_zjm_22",// 子页卡背景选择
				subOptionOver : "rw_zjm_22",// 子页卡背景掠过
				subOptionCommon : "rw_zjm_23",// 子页卡背景普通
				subOptionHeight : gbox.getImage("rw_zjm_22").height,// 子页卡高度
				subOptionWidth : gbox.getImage("rw_zjm_22").width,// 子页卡宽度
				selectOption : "ty_an_01",// 选项框图标
				selectOptionSelected : "ty_an_12",// 选项框被选择了图标
				listX : taskObject.taskX + 36,// list放置的X坐标
				listY : taskObject.taskY + 130,// list放置的Y坐标
				scrollPositionX : taskObject.taskX + 36
				+ gbox.getImage("rw_zjm_20").width + 2,// 拖动条位置X
				scrollHeight : gbox.getImage("rw_zjm_20").height * 11
				- gbox.getImage("ty_tdt_07").height * 2,// 拖动条空白处高度，即滚动条最大高度
				scrollWidth : gbox.getImage("ty_tdt_07").width,// 拖动条宽度
				scrollTop : 'ty_tdt_04',// 拖动条上部位置
				scrollBottom : gbox.getImage("ty_tdt_04").height,// 拖动条上部高度
				scrollCenter : 'ty_tdt_05',// 拖动条中部
				scrollCenterHeight : gbox.getImage("ty_tdt_05").height,// 拖动条中部高度
				scrollBottom : 'ty_tdt_06',// 拖动条底部
				scrollBottomHeight : gbox.getImage("ty_tdt_06").height,// 拖动条底部高度
				upButton : 'ty_tdt_07',// 滚动条向上点击按钮
				upButtonOver : 'ty_tdt_08',// 滚动条向上点击按钮掠过
				upButtonStatus : 0,// 滚动条向上点击按钮状态
				upButtonX : taskObject.taskX + 36 + gbox.getImage("rw_zjm_20").width,// 滚动条向上按钮位置X
				upButtonY : taskObject.taskY + 130,// 滚动条向上按钮位置Y
				buttonWidth : gbox.getImage("ty_tdt_07").width,// 向上向下按钮宽度
				buttonHeight : gbox.getImage("ty_tdt_07").height,// 向上向下按钮高度
				downButton : 'ty_tdt_09',
				downButtonOver : 'ty_tdt_10',
				downButtonStatus : 0,
				downButtonX : taskObject.taskX + 36 + gbox.getImage("rw_zjm_20").width,
				downButtonY : taskObject.taskY + 130
				+ gbox.getImage("rw_zjm_20").height * 11
				- gbox.getImage("ty_tdt_07").height,
				listHeight : gbox.getImage("rw_zjm_20").height * 11,
				startPaintHeight : 0
				// list信息开始画的起始高度
		};
	}
	taskObject.updateListInfo(data);
	taskObject.countListHeight();
};
/**
 * 任务列表画方法
 */
taskObject.paintList = function() {
	var clipArea = taskObject.getAreaForControl();
	var ctx = gbox.getBufferContext();
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(clipArea[0][0], clipArea[0][1]);
	ctx.lineTo(clipArea[1][0], clipArea[1][1]);
	ctx.lineTo(clipArea[2][0], clipArea[2][1]);
	ctx.lineTo(clipArea[3][0], clipArea[3][1]);
	ctx.closePath();
	ctx.clip();
	var x = taskObject.listInfo.listX;
	var y = taskObject.listInfo.listY - taskObject.listInfo.startPaintHeight;
	var listInfo = taskObject.listInfo;
	if (listInfo.upButtonStatus == 1) {
		gbox.drawImage(listInfo.upButtonOver, listInfo.upButtonX,
				listInfo.upButtonY);
	} else {
		gbox.drawImage(listInfo.upButton, listInfo.upButtonX,
				listInfo.upButtonY);
	}
	if (listInfo.downButtonStatus == 1) {
		gbox.drawImage(listInfo.downButtonOver, listInfo.downButtonX,
				listInfo.downButtonY);
	} else {
		gbox.drawImage(listInfo.downButton, listInfo.downButtonX,
				listInfo.downButtonY);
	}
	for ( var i = 0; i < listInfo.mainListInfo.length; i++) {
		switch (listInfo.mainListInfo[i].selectedStatus) {
		case 0:
			gbox.drawImage(listInfo.mainOptionCommon, x, y);
			gbox.drawImageCenter(listInfo.mainListInfo[i].mainMember, x, y, x
					+ listInfo.mainOptionWidth, y + listInfo.mainOptionHeight);
			y += listInfo.mainOptionHeight;
			break;
		case 1:
			gbox.drawImage(listInfo.mainOptionOver, x, y);
			gbox.drawImageCenter(listInfo.mainListInfo[i].mainMember, x, y, x
					+ listInfo.mainOptionWidth, y + listInfo.mainOptionHeight);
			y += listInfo.mainOptionHeight;
			break;
		case 2:
			gbox.drawImage(listInfo.mainOptionSelect, x, y);
			gbox.drawImageCenter(listInfo.mainListInfo[i].mainMemberSelected,
					x, y, x + listInfo.mainOptionWidth, y
							+ listInfo.mainOptionHeight);
			y += listInfo.mainOptionHeight;
			y = taskObject._paintSubList(listInfo.mainListInfo[i].subMembers,
					x, y);
			break;

		default:
			break;
		}
	}
	taskObject.paintScroll();
	ctx.restore();
};
/**
 * 非通用方法，画任务列表子信息
 */
taskObject._paintSubList = function(subList, x, y) {
	var listInfo = taskObject.listInfo;
	for ( var i = 0; i < subList.length; i++) {
		// console.log(subList[i].name);
		switch (subList[i].selectedStatus) {
		case 0:
			gbox.drawImage(listInfo.subOptionCommon, x, y);
			gbox.drawImage(listInfo.selectOption, x + 4, y + 4);
			gbox.drawText(subList[i].name, x + 25, y + 7,12);
			//gbox.drawString(subList[i].name, x + 25, y + 7, '#000000');
			// gbox.drawImage(listInfo);
			break;
		case 1:
			gbox.drawImage(listInfo.subOptionOver, x, y);
			gbox.drawImage(listInfo.selectOption, x + 4, y + 4);
			gbox.drawText(subList[i].name, x + 25, y + 7,12);
			//gbox.drawString(subList[i].name, x + 25, y + 7, '#000000');
			// gbox.drawImage(listInfo);

			break;
		case 2:
			gbox.drawImage(listInfo.subOptionOver, x, y);
			gbox.drawImage(listInfo.selectOptionSelected, x + 4, y + 4);
			gbox.drawText(subList[i].name, x + 25, y + 7,12);
			//gbox.drawString(subList[i].name, x + 25, y + 7, '#000000');

			break;

		default:
			break;
		}
		y += taskObject.listInfo.subOptionHeight;
	}
	return y;
};
/**
 * 画拖动条
 */
taskObject.paintScroll = function() {

	var listInfo = taskObject.listInfo;
	if (listInfo.scrollCurrentHeight != 0) {
		var x = listInfo.scrollPositionX;
		var y = listInfo.upButtonY + listInfo.buttonHeight
				+ listInfo.startPaintHeight / listInfo.listStartHeigthMax
				* (listInfo.scrollHeight - listInfo.scrollCurrentHeight);
		gbox.drawImage(listInfo.scrollTop, x, y);
		y += listInfo.scrollBottomHeight;
		for ( var i = 0; i < listInfo.scrollCenterAmount; i++) {
			gbox.drawImage(listInfo.scrollCenter, x, y);
			y += listInfo.scrollCenterHeight;
		}
		gbox.drawImage(listInfo.scrollBottom, x, y);
	};
};
/**
 * 获取任务列表的控制区域
 */
taskObject.getAreaForControl = function() {
	var xMin = taskObject.listInfo.listX;
	var xMax = taskObject.listInfo.listX + taskObject.listInfo.mainOptionWidth
			+ taskObject.listInfo.buttonWidth;
	var yMin = taskObject.listInfo.listY;
	var yMax = taskObject.listInfo.listY + taskObject.listInfo.listHeight;
	return [ [ xMin, yMin ], [ xMax, yMin ], [ xMax, yMax ], [ xMin, yMax ] ];
};
/**
 * 鼠标滚轮事件回调
 */
taskObject.listMouseWheel = function(event, delta) {
	var listInfo = taskObject.listInfo;
	var temp = listInfo.startPaintHeight - delta * 6;
	if (temp < 0) {
		listInfo.startPaintHeight = 0;
	} else if (temp > listInfo.listStartHeigthMax) {
		listInfo.startPaintHeight = listInfo.listStartHeigthMax;
	} else {
		listInfo.startPaintHeight = temp;
	};
};
/**
 * 任务列表鼠标移动（移动某区域，改变状态某区域状态）
 */
taskObject.listMoveControl = function() {
	var listInfo = taskObject.listInfo;
	var yMin = listInfo.listY;
	var yMax = listInfo.listY - listInfo.startPaintHeight;
	if (touchMoveX > listInfo.upButtonX
			&& touchMoveX < listInfo.upButtonX + listInfo.buttonWidth
			&& touchMoveY > listInfo.upButtonY
			&& touchMoveY < listInfo.upButtonY + listInfo.buttonHeight
			&& listInfo.listCurrentHeight > listInfo.listHeight) {
		listInfo.upButtonStatus = 1;
	} else {
		listInfo.upButtonStatus = 0;
	}
	if (touchMoveX > listInfo.downButtonX
			&& touchMoveX < listInfo.downButtonX + listInfo.buttonWidth
			&& touchMoveY > listInfo.downButtonY
			&& touchMoveY < listInfo.downButtonY + listInfo.buttonHeight
			&& listInfo.listCurrentHeight > listInfo.listHeight) {
		listInfo.downButtonStatus = 1;
	} else {
		listInfo.downButtonStatus = 0;
	}
	for ( var i = 0; i < listInfo.mainListInfo.length; i++) {
		yMax += listInfo.mainOptionHeight;
		if (listInfo.mainListInfo[i].selectedStatus == 2) {
			yMin = yMax;
			for ( var j = 0; j < listInfo.mainListInfo[i].subMembers.length; j++) {
				yMax += listInfo.subOptionHeight;
				if (touchMoveX > listInfo.listX
						&& touchMoveX < listInfo.listX
								+ listInfo.mainOptionWidth
						&& touchMoveY > yMin
						&& touchMoveY < yMax
						&& listInfo.mainListInfo[i].subMembers[j].selectedStatus != 2) {
					listInfo.mainListInfo[i].subMembers[j].selectedStatus = 1;
				} else if (listInfo.mainListInfo[i].subMembers[j].selectedStatus == 1) {
					listInfo.mainListInfo[i].subMembers[j].selectedStatus = 0;
				}
				yMin = yMax;
			}
			;
		} else {
			if (touchMoveX > listInfo.listX
					&& touchMoveX < listInfo.listX + listInfo.mainOptionWidth
					&& touchMoveY > yMin && touchMoveY < yMax) {
				listInfo.mainListInfo[i].selectedStatus = 1;
			} else if (listInfo.mainListInfo[i].selectedStatus == 1) {
				listInfo.mainListInfo[i].selectedStatus = 0;
			}
			yMin = yMax;
		}
		;
	}
	;
};
/**
 * 点击任务列表滚轮，目前未成熟，需要改进
 */
taskObject.clickScrollQuest = function() {
	// console.log("x --"+touchStartX+"y --"+touchStartY);
	var listInfo = taskObject.listInfo;
	var x = listInfo.scrollPositionX;
	var xMax = x + listInfo.scrollWidth;
	if (touchMoveX < x || touchMoveX > xMax
			|| touchMoveY > listInfo.downButtonY
			|| touchMoveY < listInfo.upButtonY + listInfo.buttonHeight) {
		// console.log("释放");
		return;
	}
	var y = listInfo.upButtonY + listInfo.buttonHeight
			+ listInfo.startPaintHeight / listInfo.listStartHeigthMax
			* (listInfo.scrollHeight - listInfo.scrollCurrentHeight);
	var yScrollMin = listInfo.upButtonY + listInfo.buttonHeight;
	var yScrollMax = listInfo.downButtonY - listInfo.scrollCurrentHeight;
	var yMax = y + listInfo.scrollCurrentHeight;
	if (touchStartX > x && touchStartX < xMax && touchStartY > y
			&& touchStartY < yMax && touchMoveY < listInfo.downButtonY
			&& touchMoveY > listInfo.upButtonY + listInfo.buttonHeight) {// 滚动条拖动
		var offset = touchStartY - touchMoveY;
		var offsetY = y - offset;
		if (offsetY < yScrollMin) {
			offsetY = yScrollMin;
		}
		if (offsetY > yScrollMax) {
			offsetY = yScrollMax;
		}
		// 修改startPaintHeight
		var startPaintHeight = listInfo.listStartHeigthMax
				* (offsetY - listInfo.upButtonY - listInfo.buttonHeight)
				/ (listInfo.scrollHeight - listInfo.scrollCurrentHeight);
		listInfo.startPaintHeight = startPaintHeight;
	}
};
/**
 * 点击任务列表，按返回状态改变画法状态；1获取具体任务，不改变任务list长度；3点选主主页卡，改变任务list长度；4取消点击主页卡，改变list长度；
 */
taskObject.clickQuest = function(x, y) {
	var listInfo = taskObject.listInfo;
	var result = taskObject.listClickControl(x, y);// 更新点击的临时记录数据
	if (result == 1) {
		var id = listInfo.listSubClickTemp.id;
		quest.getSpecficQuest(id, taskObject.doSpecificClick);
	} else if (result == 3) {
		taskObject.changeListClickStatus(listInfo.listMainClickTemp, 2,
				listInfo.listSubClickTemp, 2);// 改变list表的选择状态
		taskObject.countListHeight();// 计算长度
	} else if (result == 4) {
		taskObject.changeListClickStatus(listInfo.listMainClickTemp, 0,
				listInfo.listSubClickTemp, 2);// 改变list表的选择状态
		taskObject.countListHeight();// 计算长度
	}
	;
};
/**
 * 获取具体任务信息回调
 */
taskObject.doSpecificClick = function(data) {
	var listInfo = taskObject.listInfo;
	// 赋值
	taskObject.targetDescription = data.targetDesc;
	taskObject.description = data.description;
	taskObject.targetAmount = data.targetAmount;
	taskObject.targetNeedAmount = data.targetNeedAmount;
	taskObject.status = data.status;
	taskObject.resetType = data.resetType;
	//改变提交按钮状态
	taskObject._setButtonStatus();
	taskObject.changeListClickStatus(listInfo.listMainClickTemp, 2,
			listInfo.listSubClickTemp, 2);// 改变list表的选择状态
};
/**
 * 获取具体任务的回调，用于点击“完成任务”按钮后
 */
taskObject.doSpecificClickForSubmit = function(data){
	taskObject.doSpecificClick(data);
	taskObject.countListHeight();
};
/**
 * 点击任务list控制，并返回点击操作的状态，1点选具体任务即子页卡，2无任何状态，3点选未选中的主页卡，4点选选中的主页卡
 */
taskObject.listClickControl = function(x, y) {
	var listInfo = taskObject.listInfo;
	var yMin = listInfo.listY;
	var yMax = listInfo.listY - listInfo.startPaintHeight;
	if (x > listInfo.upButtonX && x < listInfo.upButtonX + listInfo.buttonWidth
			&& y > listInfo.upButtonY
			&& y < listInfo.upButtonY + listInfo.buttonHeight){
		if (listInfo.startPaintHeight != 0) {
			var temp = listInfo.startPaintHeight - 20;
			listInfo.startPaintHeight = temp < 0 ? 0 : temp;
		}
		;
	}
	if (x > listInfo.downButtonX
			&& x < listInfo.downButtonX + listInfo.buttonWidth
			&& y > listInfo.downButtonY
			&& y < listInfo.downButtonY + listInfo.buttonHeight) {
		if (listInfo.startPaintHeight != listInfo.listStartHeigthMax) {
			var temp = listInfo.startPaintHeight + 20;
			listInfo.startPaintHeight = temp > listInfo.listStartHeigthMax ? listInfo.listStartHeigthMax
					: temp;
		}
		;
	}
	for ( var i = 0; i < listInfo.mainListInfo.length; i++) {
		yMax += listInfo.mainOptionHeight;
		if (x > listInfo.listX && x < listInfo.listX + listInfo.mainOptionWidth
				&& y > yMin && y < yMax) {
			if (listInfo.mainListInfo[i].selectedStatus == 2) {
				listInfo.listMainClickTemp = listInfo.mainListInfo[i];
				// 更新长度
				return 4;
			} else {
				listInfo.listMainClickTemp = listInfo.mainListInfo[i];
				// 更新长度
				return 3;
				// tempSub =
				// typeof(listInfo.mainListInfo[i].subMembers[0])!="undefined"?listInfo.mainListInfo[i].subMembers[0]:null;
			}
			;
		} else {
			// yMin+=listInfo.mainOptionHeight;
			// yMax+=listInfo.mainOptionHeight;
			yMin = yMax;
			if (listInfo.mainListInfo[i].selectedStatus == 2) {
				for ( var j = 0; j < listInfo.mainListInfo[i].subMembers.length; j++) {
					yMax += listInfo.subOptionHeight;
					if (x > listInfo.listX
							&& x < listInfo.listX + listInfo.mainOptionWidth
							&& y > yMin && y < yMax) {
						// listInfo.listMainClickTemp =
						// listInfo.mainListInfo[i];
						listInfo.listSubClickTemp = listInfo.mainListInfo[i].subMembers[j];
						return 1;
						// 获取任务信息
					}
					yMin = yMax;
				}
				;
			}
			;
		}
		;
	}
	;
	return 2;
};
taskObject.countListHeight = function() {
	var listInfo = taskObject.listInfo;
	var yMin = listInfo.listY;
	var yMax = listInfo.listY;
	var needHeight = 0;
	for ( var i = 0; i < listInfo.mainListInfo.length; i++) {
		if (listInfo.mainListInfo[i].selectedStatus == 2) {
			needHeight = yMax - yMin;
			yMax += listInfo.mainOptionHeight;
			for ( var j = 0; j < listInfo.mainListInfo[i].subMembers.length; j++) {
				yMax += listInfo.subOptionHeight;
			}
			;
		} else {
			yMax += listInfo.mainOptionHeight;
		}
	}
	;
	listInfo.listCurrentHeight = yMax - yMin;
	// 产生滚动条状态，为画滚动条服务
	if (listInfo.listCurrentHeight > listInfo.listHeight) {
		listInfo.listStartHeigthMax = listInfo.listCurrentHeight
				- listInfo.listHeight;
		var scrollHeight = listInfo.listHeight / listInfo.listCurrentHeight
				* listInfo.scrollHeight;
		var scollCenterAmount = 0;
		var scrollCurrentHeight = listInfo.scrollBottomHeight
				+ listInfo.scrollBottomHeight;
		while (scrollCurrentHeight + listInfo.scrollCenterHeight < scrollHeight) {
			scrollCurrentHeight += listInfo.scrollCenterHeight;
			scollCenterAmount++;
		}
		listInfo.scrollCenterAmount = scollCenterAmount;
		listInfo.scrollCurrentHeight = scrollCurrentHeight;
	} else {
		listInfo.listStartHeigthMax = 0;
		listInfo.scrollCenterAmount = 0;
		listInfo.scrollCurrentHeight = 0;
		listInfo.startPaintHeight = 0;
	}
	;
	listInfo.startPaintHeight = needHeight < listInfo.listStartHeigthMax ? needHeight
			: listInfo.listStartHeigthMax;
};
/**
 * 改变任务list里的主页卡子页卡选择状态
 */
taskObject.changeListClickStatus = function(mainClick, mainStatus, subClick,
		subStatus) {
	taskObject._clearListStatus();// 清空状态
	// 赋值状态
	mainClick.selectedStatus = mainStatus;
	subClick.selectedStatus = subStatus;

};
/**
 * 非通用方法，清除任务list里的主页卡子页卡选择状态
 */
taskObject._clearListStatus = function() {
	var listInfo = taskObject.listInfo;
	for ( var i = 0; i < listInfo.mainListInfo.length; i++) {
		listInfo.mainListInfo[i].selectedStatus = 0;
		for ( var j = 0; j < listInfo.mainListInfo[i].subMembers.length; j++) {
			listInfo.mainListInfo[i].subMembers[j].selectedStatus = 0;
		}
		;
	}
	;
};
/**
 * 打开任务界面的回调
 */
taskObject.doOpenUI = function(data) {// 打开任务界面的回调
	if (typeof (taskObject.taskMainUI) == "undefined") {
		taskObject.initTaskObject();// 初始化任务UI
	}
	taskObject.initListInfo(data);// 初始化任务列表
	quest.getSpecficQuest(taskObject.listInfo.mainListInfo[0].subMembers[0].id,
			function(questData) {
		//接数据
				taskObject.targetDescription = questData.targetDesc;
				taskObject.description = questData.description;
				taskObject.targetAmount = questData.targetAmount;
				taskObject.targetNeedAmount = questData.targetNeedAmount;
				taskObject.resetType = questData.resetType;
				taskObject.status = questData.status;
				
				taskObject._setButtonStatus();
				taskObject.countListHeight();
				console.log(taskObject);
				taskObject.openTaskUI(getClickObjectIndex(), com_group,
						com_layer);
				taskObject.openTaskList(getClickObjectIndex(), com_group,
						com_layer);
				changeMap(com_layer);
			});
};
/**
 * 非通用方法，设置任务按钮状态
 */
taskObject._setButtonStatus = function(){
	if(taskObject.status==taskStatic.taskStatusUncomplete){//改变按钮状态
		taskObject.submitStatus = taskStatic.submitButtonForbid;
	}else if(taskObject.status==taskStatic.taskStatusComplete){
		taskObject.submitStatus = taskStatic.submitButtonCommon;
	}
	if(taskObject.resetType==taskStatic.taskResetNone){//改变按钮状态
		taskObject.resetStatus = taskStatic.submitButtonForbid;
	}else{
		taskObject.resetStatus = taskStatic.submitButtonCommon;
	}
};

/**
 * 画任务详细信息
 */
taskObject.paintQuestInfo = function(str, x, y, lineWidth) {
	if (str == null) {
		return;
	}
	var ctx = gbox.getBufferContext();
	var charWidth = ctx.measureText(str.charAt(0)).width;// 单字体宽度
	var firstLineWidth = lineWidth - charWidth * 2;
	var begin = 0;
	var arr = new Array();
	if (ctx.measureText(str).width < firstLineWidth) {
		arr.push(str);
	} else {
		var sumWidth = 0;
		var width = firstLineWidth;
		for ( var i = 0; i < str.length; i++) {
			sumWidth += ctx.measureText(str.charAt(i)).width;
			if (sumWidth > width + 5) {// 可以有5像素的越界
				arr.push(str.substring(begin, i));
				begin = i--;
				sumWidth = 0;
				if (width != lineWidth) {
					width = lineWidth;
				}
				;
			}
			;
		}
		arr.push(str.substring(begin, str.length));
	}
	for ( var i = 0; i < arr.length; i++) {
		if (i == 0) {
		    gbox.drawLineBreakText(arr[i],x, y,5,375);
			//gbox.drawString(arr[i], x + charWidth * 2, y, "#000000");
		} else {
			gbox.drawLineBreakText(arr[i],x, y,5,375);
			//gbox.drawString(arr[i], x, y, "#000000");
		}
		y += 20;
	}
	;
};
