
//武将出征窗口
var warpthMenu= function(index,layer,groupBottom)
{
	warpthMenuClass.draw.setLayer(layer);
	warpthMenuClass.draw.setGroupBottom(groupBottom);
	var group = expeditionToolClass.draw.getGroupByGroupBottom(warpthMenuClass.draw.groupBottom);
	gbox.setRenderOrder(group);
	warpthMenuClass.draw.index = index;
	isDrawUI[index] = true;
	tempX1 = (gbox.getScreenW() - gbox.getImage("cz_zjm_01").width)/2;
    tempY1= (gbox.getScreenH() - gbox.getImage("cz_zjm_01").height)/2;
    
    gbox.addObject(
			{ 
				id : 'warpth',
				group : 'levelMenu_1',
				tileset : 'cz_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [tempX1,tempY1], [tempX1 + gbox.getImage("cz_zjm_01").width,tempY1], [tempX1 + gbox.getImage("cz_zjm_01").width,tempY1+ gbox.getImage("cz_zjm_01").height],[tempX1,tempY1+ gbox.getImage("cz_zjm_01").height]],
				initialize : function()
				{
					if(warpthMenuClass.store.expeditionFormations.formations.length <= 0)
					{
						battle.getUserFormations(warpthMenuClass.handlers.selectFormationInit);
					}
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					if(lastTouchMoveX > 552 && lastTouchMoveX < 635 && lastTouchMoveY > 183 && lastTouchMoveY < 209)
					{	//选择目标
						warpthMenuClass.handlers.selectTarget();
					}
					else if(lastTouchMoveX > 417 && lastTouchMoveX < 795 && lastTouchMoveY > 248 && lastTouchMoveY < 278)
					{	//出征类型选择事件
						warpthMenuClass.handlers.addExpeditionTypeHandler(lastTouchMoveX,lastTouchMoveY);
					}
					else if(lastTouchMoveX > 356 && lastTouchMoveX < 459 && lastTouchMoveY > 370 && lastTouchMoveY < 519)
					{//武将位置1
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 0 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 0)
							warpthMenuClass.handlers.selectGeneral(0);
					}			
					else if(lastTouchMoveX > 511 && lastTouchMoveX < 612 && lastTouchMoveY > 370 && lastTouchMoveY < 519)
					{//武将位置2
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 1 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 1)
						warpthMenuClass.handlers.selectGeneral(1);
					}
					else if(lastTouchMoveX > 664 && lastTouchMoveX < 766 && lastTouchMoveY > 370 && lastTouchMoveY < 519)
					{//武将位置3
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 2 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 2)
						warpthMenuClass.handlers.selectGeneral(2);
					}
					else if(lastTouchMoveX > 819 && lastTouchMoveX < 920 && lastTouchMoveY > 370 && lastTouchMoveY < 519)
					{//武将位置4
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 3 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 3)
						warpthMenuClass.handlers.selectGeneral(3);
					}
					else if(lastTouchMoveX > 975 && lastTouchMoveX < 1075 && lastTouchMoveY > 370 && lastTouchMoveY < 519)
					{//武将位置5
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 4 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 4)
						warpthMenuClass.handlers.selectGeneral(4);
					}
					else if(lastTouchMoveX > 459 && lastTouchMoveX < 473 && lastTouchMoveY > 370 && lastTouchMoveY < 384)
					{//武将1关闭
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 0 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 0)
                          warpthMenuClass.handlers.cancelGeneral(0);
					}
					else if(lastTouchMoveX > 612 && lastTouchMoveX < 626 && lastTouchMoveY > 370 && lastTouchMoveY < 384)
					{//武将2关闭
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 1 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 1)
                          warpthMenuClass.handlers.cancelGeneral(1);
					}
					else if(lastTouchMoveX > 766 && lastTouchMoveX < 780 && lastTouchMoveY > 370 && lastTouchMoveY < 384)
					{//武将3关闭
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 2 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 2)
                          warpthMenuClass.handlers.cancelGeneral(2);
					}
					else if(lastTouchMoveX > 920 && lastTouchMoveX < 934 && lastTouchMoveY > 370 && lastTouchMoveY < 384)
					{//武将4关闭
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 3 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 3)
                          warpthMenuClass.handlers.cancelGeneral(3);
					}
					else if(lastTouchMoveX > 1076 && lastTouchMoveX < 1090 && lastTouchMoveY > 370 && lastTouchMoveY < 384)
					{//武将5关闭
						if(warpthMenuClass.store.chosenGeneral.unShow.start > 4 ||
								warpthMenuClass.store.chosenGeneral.unShow.start+warpthMenuClass.store.chosenGeneral.unShow.length-1 < 4)
                          warpthMenuClass.handlers.cancelGeneral(4);
					}
					else if(lastTouchMoveX > 436 && lastTouchMoveX < 574 && lastTouchMoveY > 284 && lastTouchMoveY < 304)
					{	//选择阵型
						if(warpthMenuClass.store.expeditionFormations.status)
							warpthMenuClass.handlers.selectFormation();
					}
					else if(lastTouchMoveX > 470 && lastTouchMoveX < 519 && lastTouchMoveY > 576 && lastTouchMoveY < 600)
					{   //换将按钮
						warpthMenuClass.handlers.changeGeneral();
					}
					else if(((408 < lastTouchMoveX) && (lastTouchMoveX < 457)) && ((576 < lastTouchMoveY) && (lastTouchMoveY < 600)))
                    {   //配兵按钮
						warpthMenuClass.handlers.allotSoldiers();
                    }
					else if(lastTouchMoveX > 346 && lastTouchMoveX < 394 && lastTouchMoveY > 576 && lastTouchMoveY < 600)
					{	//医疗按钮
						warpthMenuClass.handlers.cureGeneral();
					}
					if(lastTouchMoveX > exitButtonCoordinate.x && 
							lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width && 
							lastTouchMoveY > exitButtonCoordinate.y && 
							lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)
					{	//关闭窗体
						warpthMenuClass.handlers.close();
						curGroup = 'cityMenu';
					}
					else if(lastTouchMoveX > 1004 && lastTouchMoveX < 1086 && lastTouchMoveY > 576 && lastTouchMoveY < 600)
					{	//出征按钮
						warpthMenuClass.handlers.confirm();
					}else{//当单击事件不触发关闭当前窗体的情况下，执行窗体自身重绘
						//刷新自身
						warpthMenuClass.flag.isDrawWarpthMenu = true;
						warpthMenu(getClickObjectIndex());
				        warpthMenuClass.draw.changeMap();
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && warpthMenuClass.flag.isDrawWarpthMenu)
					 {
					 	//背景图
					 	gbox.drawImage('cz_zjm_01',tempX1,tempY1);
					 	//背景外框
					 	gbox.drawImage('cz_zjm_02',tempX1,tempY1);
					 	var titleX = tempX1 + (gbox.getImage('cz_zjm_01').width - gbox.getImage('cz_zjm_08').width)/2;
					 	//窗口标题
					 	gbox.drawImage('cz_zjm_08',titleX,130);
					 	//选择目标 start 
					 	if(warpthMenuClass.store.expedition.target.isSelectable){
						 	gbox.drawImage('ty_an_10',552,183);
	                        if(((552 < touchMoveX) && (touchMoveX < 635)) && ((183 < touchMoveY) && (touchMoveY < 209))){
	                        	gbox.drawImage('ty_an_09',552,183);
	                        }
	                       var strW = gbox.getTextWidth("选择目标",14);
				           var cntX = 552 + (gbox.getImage("ty_an_09").width - strW)/2;
				           var cntY = 183 + (gbox.getImage("ty_an_09").height - 14)/2;
				           gbox.drawText("选择目标", cntX,cntY,10);
					 	}
                        //目标名称
                        var fontW = gbox.getTextWidth(warpthMenuClass.store.expedition.target.name,14);
				 		var dx = 432 + (99 - fontW)/2;
					 	var dy = 186 + (21 - 14)/2;
                        gbox.drawText(warpthMenuClass.store.expedition.target.name, dx,dy,5);                       
                        //选择目标 end 
                        //出征行军时间
                        gbox.drawText(warpthMenuClass.store.expedition.time, 438,224,5);                        
                        //出征类型选择
                        warpthMenuClass.draw.expeditionType();
                        //阵型
                        warpthMenuClass.draw.formationDesc();
                        //绘制单挑目标信息
                        warpthMenuClass.draw.targetDesc();
						//选中武将绘制
						warpthMenuClass.draw.showSelectGeneral();
                        //不可选择状态
                        warpthMenuClass.draw.unSelectGeneral(
                        		warpthMenuClass.store.chosenGeneral.unShow.start,
                        		warpthMenuClass.store.chosenGeneral.unShow.length
                        );
                        //本方战斗力
                        warpthMenuClass.draw.force();
                        //换将
                        gbox.drawImage('ty_an_08',470,576);
						if(((470 < touchMoveX) && (touchMoveX < 519)) && ((576 < touchMoveY) && (touchMoveY < 600))){
                         	gbox.drawImage('ty_an_06',470,576);
                        }
                        var strW = gbox.getTextWidth("换将",14);
				        var cntX = 470 + (gbox.getImage("ty_an_06").width - strW)/2;
				        var cntY = 576 + (gbox.getImage("ty_an_06").height - 14)/2;
				        gbox.drawText("换将", cntX,cntY,10);
						//配兵
						gbox.drawImage('ty_an_08',408,576);
						if(((408 < touchMoveX) && (touchMoveX < 457)) && ((576 < touchMoveY) && (touchMoveY < 600))){
                         	gbox.drawImage('ty_an_06',408,576);
                        }
						var strW = gbox.getTextWidth("配兵",14);
				        var cntX = 408 + (gbox.getImage("ty_an_06").width - strW)/2;
				        var cntY = 576 + (gbox.getImage("ty_an_06").height - 14)/2;
				        gbox.drawText("配兵", cntX,cntY,10);
						//医疗
						gbox.drawImage('ty_an_08',346,576);
						if(((346 < touchMoveX) && (touchMoveX < 394)) && ((576 < touchMoveY) && (touchMoveY < 600))){
                         	gbox.drawImage('ty_an_06',346,576);
                        }
						var strW = gbox.getTextWidth("医疗",14);
				        var cntX = 346 + (gbox.getImage("ty_an_06").width - strW)/2;
				        var cntY = 576 + (gbox.getImage("ty_an_06").height - 14)/2;
				        gbox.drawText("医疗", cntX,cntY,10);
						//出征
						gbox.drawImage('ty_an_10',1004,576);
						if(((1004 < touchMoveX) && (touchMoveX < 1086)) && ((576 < touchMoveY) && (touchMoveY < 600))){
                         	gbox.drawImage('ty_an_09',1004,576);
                        }
						var strW = gbox.getTextWidth("出 征",14);
				        var cntX = 1004 + (gbox.getImage("ty_an_09").width - strW)/2;
				        var cntY = 576 + (gbox.getImage("ty_an_09").height - 14)/2;
				        gbox.drawText("出 征", cntX,cntY,10);
					    //关闭窗口
                        if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && 
                        		((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						{
						   	gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						}else{
						   	gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						}
                        //武将鼠标提示
                        warpthMenuClass.draw.generalToolTip(touchMoveX,touchMoveY);

					 }

				}
		 });
};

//武将出征类
var warpthMenuClass = {};
//数据对象
warpthMenuClass.store = {};
//回调
warpthMenuClass.callBack = {};
//窗体事件
warpthMenuClass.handlers = {};
//窗体绘制 
warpthMenuClass.draw = {};
//窗体标识符 
warpthMenuClass.flag = {
	//目标选择标识
	isSelectTarget : false,
	//当前界面是否拥有出征类型选项
	isHaveExpeditionType : false,
	//是否绘制出征窗口
	isDrawWarpthMenu : false
};

//出征窗体索引
warpthMenuClass.draw.index = 0;

//出征类型
warpthMenuClass.store.expeditionType = {
	//讨伐
	'punitive':{
		index : 0,
		//出征类型文字图片
		img : 'cz_zjm_09',
		//出征类型坐标
		x : 0,
		y : 0,
		//出征类型大小
		w : 0,
		h : 0,
		//出征类型选中状态
		isSelect : false,
		//选中执行方法
		selectedFn : function(){
			warpthMenuClass.handlers.selectPunitive(this);
		},
		//出征类型显示状态
		status : false
	},
	//单挑
	'duel':{
		index : 1,
		img : 'cz_zjm_10',
		x : 0,
		y : 0,
		w : 0,
		h : 0,
		isSelect : false,
		selectedFn : function(){
			warpthMenuClass.handlers.selectDuel(this);
		},
		status : false
	},
	//派遣
	'dispatch':{
		index : 2,
		img : 'cz_zjm_18',
		x : 0,
		y : 0,
		w : 0,
		h : 0,
		isSelect : false,
		selectedFn : function(){
			warpthMenuClass.handlers.selectDispatch(this);
		},
		status : false
	}
};

//阵型选择
warpthMenuClass.store.expeditionFormations = {
	//阵型集合
	formations : [],
	//阵型选择显示状态
	status : false,
	//阵型显示状态
	formationStatus : false
};

//出征数据
warpthMenuClass.store.expedition = {
	//目标
	target : {
		id: '',			//目标id
		name : '',		//目标名称
		type : 0,		//目标类型细分    0:敌对  1:初级势力   2:中级势力   3: 高级势力   4: 世界野怪(此类型仅用作客户端出征类型判断使用，非接口类型)
		obj : false,	//目标对象
		desc : false,	//目标详细信息
		descStatus : false,	//目标详细信息显示状态
		isSelectable : true //目标是否可选
	},
	//阵型
	formation : {
		id: '',
		name: '无',
		obj:null,
		desc : ''
	},
	//出征类型
	type : -1,
	targetType : -1,  //目标类型(物种)  0:人  1:野怪      此类型用于接口传参，服务器端的目标类型
	//行军时间
	time : ''
};

//选中武将
warpthMenuClass.store.chosenGeneral = {
	//武将集合
	generals : [],
	//可选武将个数
	generalNumber : 5,
	//本方战力
	force : 0,
	//不可选择区域
	unShow : {
		start : 0,
		length : 5
	}
};

//清空窗口缓存数据
warpthMenuClass.handlers.clearCache = function(){
	var store = warpthMenuClass.store;
	//设置出征类型为未选中和不显示
	var clearExpeditionTypes = function(o,index){
		o.status = false;
		o.isSelect = false;
		return false;
	};
	warpthMenuClass.handlers.loopExpeditionTypeAll(clearExpeditionTypes);
	//重置武将数据对象
	store.chosenGeneral = {
			generals : [],
			generalNumber : 5,
			force : 0,
			unShow : {
				start : 0,
				length : 5
			}
	};
	//重置出征对象
	store.expedition = {
			target : {
				id: '',			
				name : '',		
				type : 0,		
				obj : false,	
				desc : false,	
				descStatus : false,
				isSelectable : true
			},
			formation : {
				id: '',
				name: '无',
				obj:null,
				desc : ''
			},
			type : -1,
			targetType : -1,
			time : ''
	};
	//重置阵型对象
	store.expeditionFormations = {
			formations : [],
			status : false,
			formationStatus : false
	};
};

//清空窗口操作数据缓存
warpthMenuClass.handlers.clearSelectCache = function(){
	//清除出征类型选项
	warpthMenuClass.handlers.expeditionTypeClear();
	warpthMenuClass.store.expedition.type = -1;
	//清空阵型显示
	//清空选中项
	warpthMenuClass.store.expedition.formation.id = '';
	warpthMenuClass.store.expedition.formation.name = '无';
	warpthMenuClass.store.expedition.formation.obj = null;
	warpthMenuClass.store.expedition.formation.desc = '';
	warpthMenuClass.store.expeditionFormations.status = false;
	warpthMenuClass.store.expeditionFormations.formationStatus = false;
	//清空所选武将
	warpthMenuClass.store.chosenGeneral.generals = [];
	warpthMenuClass.store.chosenGeneral.generals = [];
	//设置武将不可选区域
	warpthMenuClass.store.chosenGeneral.unShow.start = 0;
	warpthMenuClass.store.chosenGeneral.unShow.length = 5;
	//清空不可选区域的武将
	warpthMenuClass.handlers.clearChosenGeneralByStart();
	//计算战斗力
	warpthMenuClass.store.chosenGeneral.force = 0;
};

//根据出征类型获得验证项索引
warpthMenuClass.handlers.getCheckValueByExpeditionType = function(){
	var checkValue = [0,1,2,3,4];
    //根据出征类型验证
    switch (warpthMenuClass.store.expedition.type) {
		case 0://讨伐
			checkValue = [0,1,2,3,4];
			break;
		case 1://单挑
			checkValue = [0,1,3];
			break;
		case 2://派遣
			checkValue = [0,1,2,3,4];
			break;
	}
    return checkValue;
};

//页面数值项验证
warpthMenuClass.handlers.check = function(c){
	//根据出征类型获得验证项索引
	var checkValue = [0];
	if(c)
		checkValue = c;
	else
		checkValue = warpthMenuClass.handlers.getCheckValueByExpeditionType();
	var checkIndex = 0;
	//界面错误类型
	var checkText = ['未选择目标','未选择出征类型','未选择阵型','未选择武将','有武将未配兵'];
	var status = true;
	var obj = warpthMenuClass.store.expedition;
	var cg = warpthMenuClass.store.chosenGeneral;
	
	for(var i=0; i<checkValue.length; i++){
		var k = checkValue[i];
		switch (k) {
			case 0:{//检测是否选择目标
					if(obj.target.id == ''){
						checkIndex = 0;
						status = false;
					}
					break;
				}
			case 1:{//检测是否选择类型
					if(obj.type < 0){
						checkIndex = 1;
						status = false;
					}
					break;
				}
			case 2:{//检测是否选择阵型
					if(obj.formation.id == ''){
						checkIndex = 2;
						status = false;
					}
					break;
				}
			case 3:{//检测武将
					if(cg.generals.length == 0){
						checkIndex = 3;
						status = false;
					}
					break;
				}
			case 4:{//检测武将配兵
					for(var j=0; j<cg.generals.length; j++){
						if(obj.type == 0 && cg.generals[j].soldierAmount <= 0){
							checkIndex = 4;
							break;
						}
					}
					break;
				}
			default:{
					status = true;
					break;
				}
		}
	}
	if(status)
		return -1;
	else
		return checkText[checkIndex];
};

/** 目标
 * 选择目标事件  start
 */
//目标设置参数
warpthMenuClass.handlers.setExpedition = function(id,name,targetType,type,time,isSelectable,obj){
	  var target = {};
	  target.id = id;
	  target.name = name;
	  target.obj = obj;
	  //目标类型细分   -1:盟友  0:敌对  1:初级势力   2:中级势力   3: 高级势力   4: 世界野怪
	  target.type = type;
	  target.isSelectable = isSelectable;
	  var expedition = {};
	  expedition.target = target;
	  expedition.targetType = targetType;//目标类型(物种) 1:人  0:野怪
	  expedition.time = time;
	  return expedition;
};
//设置目标对象
//@expeditionObj:{target,time}
//@time 出征时间
//@target{id,name,type,obj}
//@id 目标id
//@name 目标名称
//@type 目标类型
//@obj 目标的对象
warpthMenuClass.handlers.setTarget = function(expeditionObj){
	//重新选择目标后，页面已选数据清空
	warpthMenuClass.handlers.clearSelectCache();
	//出征对象
	var expedition = warpthMenuClass.store.expedition;
	//赋值出征对象
	expedition.target = expeditionObj.target;
	//目标类型(物种)1:人  0:野怪
	expedition.targetType = expeditionObj.targetType;
	//设置出征时间
	expedition.time = changeTimeformat(expeditionObj.time*1000);
	//根据目标势力类型，设置出征类型可选项
	var expeditionTypes = warpthMenuClass.handlers.setExpeditionTypeByTargetType(expedition.target.type);
	//出征类型显示设置
	warpthMenuClass.handlers.setExpeditionTypeStatus(expeditionTypes);
	//选择目标方法结束
	warpthMenuClass.flag.isSelectTarget = false;
};

//目标选择窗口回调
warpthMenuClass.handlers.warpthGargetCallBack = function(expedition){
	warpthMenuClass.handlers.setTarget(expedition);
	//单挑可选
	if(warpthMenuClass.store.expeditionType['duel'].status)
		//获取单挑目标数据  (单挑类型需要)
		battle.getSpecificMonster(expedition.target.id,warpthMenuClass.callBack.getTargetDesc);
};

//打开目标选择界面
warpthMenuClass.handlers.warpthGargetOpen = function(){
	//以下为打开目标选择界面
	generalAmi = false;
	multiChoice = false;
	generalChoiceDraw = false;
	warpthGargetDraw = true;
	isMonstater = true;
	choiceGargetID[0] = true;
	gargetMenu(getClickObjectIndex(),warpthMenuClass.draw.layer,warpthMenuClass.draw.groupBottom); 
	warpthMenuClass.draw.changeMap();
};

//根据目标类型设置出征类型显示
warpthMenuClass.handlers.setExpeditionTypeByTargetType = function(type){
	var expeditionTypes = [0];
	//  0:敌对  1:初级势力   2:中级势力   3: 高级势力   4: 世界野怪
	//[] 0:讨伐 1:单挑 2:派遣
	switch (type) {
		case -1://盟友
			expeditionTypes = [2];
			break;
		case 0://敌对
			expeditionTypes = [0];
			break;
		case 1://初级
			expeditionTypes = [0,1];
			break;
		case 2://中级
			expeditionTypes = [0,1];
			break;
		case 3://高级
			expeditionTypes = [0,1];
			break;
		case 4://世界
			expeditionTypes = [0];
			break;
	}
	return expeditionTypes;
};

/**
 * 选择目标事件  end
 */


/** 类型
 * 出征类型事件  start
 */
//出征类型显示设置
warpthMenuClass.handlers.setExpeditionTypeStatus = function(set){
	for(var i=0; i<set.length; i++){
		switch(set[i]){
			case 0://讨伐
				warpthMenuClass.store.expeditionType['punitive'].status = true;
				break;
			case 1://单挑
				warpthMenuClass.store.expeditionType['duel'].status = true;
				break;
			case 2://派遣
				warpthMenuClass.store.expeditionType['dispatch'].status = true;
				break;
		}
	}
};
//循环出征类型集合(显示状态)
warpthMenuClass.handlers.loopExpeditionType = function(fn){
	var myFn = function(exType,type){
		var re = false;
		if(exType.status)
			re = fn(exType,type);
		return re;
	};
	warpthMenuClass.handlers.loopExpeditionTypeAll(myFn);
};
//循环出征类型集合(全部)
warpthMenuClass.handlers.loopExpeditionTypeAll = function(fn){
	var expeditionType = warpthMenuClass.store.expeditionType;
	for(var i in expeditionType){
		if(fn(expeditionType[i],i))
			break;
	}
};
//清除出征类型显示状态
warpthMenuClass.handlers.expeditionTypeClear = function(){
	warpthMenuClass.handlers.loopExpeditionType(
			function(exType,type){
				exType.status = false;
				//清除显示状态同时会清除选中状态
				exType.isSelect = false;
				return false;
			}
	);
};

//清除出征类型(显示)选中状态
warpthMenuClass.handlers.expeditionTypeSelectClear = function(){
	warpthMenuClass.handlers.loopExpeditionType(
			function(exType,type){
				exType.isSelect = false;
				return false;
			}
	);
};

//讨伐(punitive) 选中方法 
warpthMenuClass.handlers.selectPunitive = function(obj){
//	console.log('选中讨伐！');
	//显示阵型选择 
	warpthMenuClass.store.expeditionFormations.status = true;
	//隐藏目标详细信息
	warpthMenuClass.store.expedition.target.descStatus = false;
	//设置武将不可选区域
	warpthMenuClass.store.chosenGeneral.unShow.length = 0;
	//设置武将可选数量
	warpthMenuClass.store.chosenGeneral.generalNumber = 5;
	//计算战斗力
	warpthMenuClass.handlers.countForce();
};

//单挑(duel) 选中方法
warpthMenuClass.handlers.selectDuel = function(obj){
//	console.log('选中单挑！');
	//重置阵型
	warpthMenuClass.store.expedition.formation = {id : '',name : '无',obj:null, desc : ''};
	//清空选中项
	if(comboboxes && comboboxes['warpthMenuFormations'])
		comboboxes['warpthMenuFormations'].selected = {id : '',txt : '无',obj:null};
	//隐藏阵型选择
	warpthMenuClass.store.expeditionFormations.status = false;
	//隐藏阵型信息
	warpthMenuClass.store.expeditionFormations.formationStatus = false;
	
	//显示目标详细信息
	warpthMenuClass.store.expedition.target.descStatus = true;
	//设置武将不可选区域
	warpthMenuClass.store.chosenGeneral.unShow.start = 1;
	warpthMenuClass.store.chosenGeneral.unShow.length = 4;
	//设置武将可选数量
	warpthMenuClass.store.chosenGeneral.generalNumber = 1;
	//清空不可选区域的武将
	warpthMenuClass.handlers.clearChosenGeneralByStart();
	//计算战斗力
	warpthMenuClass.handlers.countForce();

};

//派遣(Dispatch) 选中方法 
warpthMenuClass.handlers.selectDispatch = function(obj){
	console.log('派遣！');
	//显示阵型选择 
	warpthMenuClass.store.expeditionFormations.status = true;
	//隐藏目标详细信息
	warpthMenuClass.store.expedition.target.descStatus = false;
	//设置武将不可选区域
	warpthMenuClass.store.chosenGeneral.unShow.length = 0;
	//设置武将可选数量
	warpthMenuClass.store.chosenGeneral.generalNumber = 5;
	//计算战斗力
	warpthMenuClass.handlers.countForce();
};


/**
 * 出征类型事件  end
 */


/** 阵型
 * 选择阵型事件  start
 */

//根据阵型id返回阵型对象
warpthMenuClass.handlers.getFormationById = function(id){
	//返回对象
	var reObj = false;
	//如果id为空字符串，即选中项为'无'
	if(id != ''){
		var fs = warpthMenuClass.store.expeditionFormations.formations;
		//循环阵型集合，返回相同id的阵型对象
		for(var i=0; i<fs.length; i++){
			if(fs[i].techNo == id){
				reObj = fs[i];
				break;
			}
		}
	}
	return reObj;
};

//选择阵型初始化 加载阵型数据
warpthMenuClass.handlers.selectFormationInit = function(data){
	//验证返回参数
	if(warpthMenuClass.callBack.isDataError(data))
		return;
	//存放阵型集合
	var fs = warpthMenuClass.store.expeditionFormations;
	fs.formations = [];
	fs.formations = data;
	//创建下拉框对象
	comboboxes = {};
  var comboboxFormations = new Combobox();
  comboboxFormations.setData(data,'techNo','name',true);
  comboboxes['warpthMenuFormations'] = comboboxFormations;
};

//阵型选择事件
warpthMenuClass.handlers.clickFormation = function(){
	//下拉框选中方法
	var exf = warpthMenuClass.store.expedition.formation;
	exf.id = comboboxes['warpthMenuFormations'].selected.id;
	exf.name = comboboxes['warpthMenuFormations'].selected.txt;
	exf.obj = comboboxes['warpthMenuFormations'].selected.obj;
	if(exf.id != ''){
		var fdesc = warpthMenuClass.handlers.getFormationById(comboboxes['warpthMenuFormations'].selected.id);
		if(fdesc){
			//赋值阵型效果文字
			exf.desc = fdesc.effectDescription;
			//显示阵型信息
			warpthMenuClass.store.expeditionFormations.formationStatus = true;
		}
	}else{
		//隐藏阵型信息
		warpthMenuClass.store.expeditionFormations.formationStatus = false;
	}
	//刷新出征窗体
    warpthMenu(getClickObjectIndex());
    warpthMenuClass.draw.changeMap();
};

/**
 * 选择阵型事件  end
 */


/** 武将
 * 选择武将事件  start
 */

//获取选择武将id集合 返回对象集合 {id,order}
warpthMenuClass.handlers.getChosenGeneralIdList = function(isEmpty){
	var gl = warpthMenuClass.store.chosenGeneral.generals;
	var idList = [];
	for(var i=0; i<gl.length; i++){
		if(gl[i]){
			idList.push({id:gl[i].id,order:i});
		}else{
			if(isEmpty)
				idList.push({id:'',order:i});
			else
				idList.push({id:0,order:i});
		}
	}
	if(idList.length > 0)
		return idList;
	else
		return false;
};

//获取选择武将id集合 以string字符串形式返回
warpthMenuClass.handlers.getChosenGeneralIdListString = function(isEmpty){
	var gIdList = warpthMenuClass.handlers.getChosenGeneralIdList(isEmpty);
	var idStr = '';
	if(gIdList){
		for(var i=0; i<gIdList.length; i++){
			idStr += gIdList[i].id;
			idStr += ',';
		}
	}
	if(idStr.length > 0)
		idStr = idStr.substring(0, idStr.length -1);
	return idStr;
};

//从指定位置开始，清除指定个数的选中武将信息
warpthMenuClass.handlers.clearChosenGeneralByStart = function(){
	var start = warpthMenuClass.store.chosenGeneral.unShow.start;
	var length = warpthMenuClass.store.chosenGeneral.unShow.length;
	var gl = warpthMenuClass.store.chosenGeneral.generals;
	var end = start + length;
	if(end > gl.length)
		end = gl.length;
	for(var i=0; i<gl.length; i++){
		if(i>=start && i<end){
			gl[i] = false;
		}
	}
};

//设置武将选择窗口缓存数据
warpthMenuClass.handlers.setGeneralCache = function(){
	var gls = warpthMenuClass.store.chosenGeneral.generals;
	//以选中武将id集合
	var idList = [];
	for(var i=0; i<gls.length; i++){
		idList.push(gls[i].id);
	}
	//设置武将选择窗口缓存数据
	generalChoiceClass.handlers.initCache(warpthMenuClass.store.chosenGeneral.generalNumber,idList);
	//设置确定回调方法
	generalChoiceClass.handlers.confirmCallBack = warpthMenuClass.handlers.setGenerals;
	//窗口关闭回调
	generalChoiceClass.handlers.closeCallBack = function(){
		warpthMenuClass.flag.isDrawWarpthMenu = true;
		warpthMenu(getClickObjectIndex());
		warpthMenuClass.draw.changeMap();
	};
};

//更改当前选中武将集合
warpthMenuClass.handlers.setGenerals = function(list){
	var gls = warpthMenuClass.store.chosenGeneral.generals;
	for(var i=0; i<list.length; i++){
		gls[i] = list[i].obj;
	}
	//计算战斗力
	warpthMenuClass.handlers.countForce();
};

//计算战斗力
warpthMenuClass.handlers.countForce = function(){
	if(warpthMenuClass.store.expedition.type == 1){
		//单挑力
		var cgl = warpthMenuClass.store.chosenGeneral;
		if(cgl.generals[0])
			cgl.force = cgl.generals[0].singleForce;
		else
			cgl.force = 0;
	}else{
		//部队战斗力
		var idlist = warpthMenuClass.handlers.getChosenGeneralIdListString(true);
		BuildingFunction.getHeroValue(idlist,warpthMenuClass.callBack.countForceBack);
	}
	
};

/**
 * 选择武将事件  end
 */


/**
 * 窗体按钮事件(上述事件入口)  start
 */

//关闭窗体
warpthMenuClass.handlers.close = function(){
	//设置绘制标识符为false
	warpthMenuClass.flag.isDrawWarpthMenu = false;
	//清除出征界面缓存数据
	warpthMenuClass.handlers.clearCache();
	//销毁绘制标识
	displayDestroy(); 
	//退出当前窗体事件
	exit(warpthMenuClass.draw.index);
	//其它刷新操作
	warpthMenuClass.handlers.closeCallBack();
	//刷新底层
	warpthMenuClass.draw.changeMap();
};

//关闭窗体回调
//执行底层组绘制操作,如果改变底层,需要从新定义
warpthMenuClass.handlers.closeCallBack = function(){
	enterCityMenu('cityMenu');
};

//选择目标
warpthMenuClass.handlers.selectTarget = function(){
	if(warpthMenuClass.store.expedition.target.isSelectable){
		var handlers = warpthMenuClass.handlers;
		//设置目标选择界面回调
		warpthGargetClass.callBack.confirm = handlers.warpthGargetCallBack;
		//设置标识：当前为 武将出征——目标选择 操作
		warpthMenuClass.flag.isSelectTarget = true;
		//打开目标选择界面
		handlers.warpthGargetOpen();
	}
};

//选择出征类型 (类型)
warpthMenuClass.handlers.addExpeditionTypeHandler = function(x,y){
	if(warpthMenuClass.flag.isHaveExpeditionType){
		//循环函数 循环判断当前点击位置是否为出征类型
		var addHandler = function(exType,type){
			//返回值为true，则停止循环
			var re = false;
			//若点击位置是某个类型选项
			if(x > exType.x && x < (exType.x + exType.w) && 
					y > exType.y && y < (exType.y + exType.h)){
				re = true;
				//清除选中状态
				warpthMenuClass.handlers.expeditionTypeSelectClear();
				//设置当前类型为选中
				exType.isSelect = true;
				//设置出征对象中的出征类型为当前选中
				warpthMenuClass.store.expedition.type = exType.index;
				//执行该类型的选中方法
				exType.selectedFn();
			}
			return re;
		};
		//出征类型循环
		warpthMenuClass.handlers.loopExpeditionType(addHandler);
	}
};

//选择阵型
warpthMenuClass.handlers.selectFormation = function(){
	//阵型下拉框
	if(!comboboxes['warpthMenuFormations'].isOpen){
		//绘制下拉框
		var _index = getClickObjectIndex();
		comboboxes['warpthMenuFormations'].info(
				_index,
				'warpthMenuFormations_combobox1',
				'levelMenu_2',
				warpthMenuClass.draw.layer,
				expeditionToolClass.draw.getGroupByGroupBottom(warpthMenuClass.draw.groupBottom),
				436,
				306,
				{widthType:3,isScrolling:false}
		);
		comboboxes['warpthMenuFormations'].createCombobox(warpthMenuClass.handlers.clickFormation);
		warpthMenu(getClickObjectIndex());
		warpthMenuClass.draw.changeMap();
	}
};

//选择武将 (武将位置)
warpthMenuClass.handlers.selectGeneral = function(index){
	//武将位置
	var generalSeat = index;
	generalSeat == index;
	var check = warpthMenuClass.handlers.check([0,1]);
	if(check < 0){
		//设置武将选择窗口缓存数据
		warpthMenuClass.handlers.setGeneralCache();
		//设置多选可选择武将
		generalChoiceClass.handlers.setSelectOptionVariable([generalSeat],true,true);
		generalChoice(getClickObjectIndex(),warpthMenuClass.draw.layer,warpthMenuClass.draw.groupBottom);
		warpthMenuClass.draw.changeMap();
	}else{
		alert(check);
	}
};

//取消选中武将 (武将位置的叉号)
warpthMenuClass.handlers.cancelGeneral = function(index){
	var generalSeat = index;
	var gls = warpthMenuClass.store.chosenGeneral.generals;
	gls[generalSeat] = false;
	//计算战斗力
	warpthMenuClass.handlers.countForce();
};

//医疗
warpthMenuClass.handlers.cureGeneral = function(){
	var idStr = warpthMenuClass.handlers.getChosenGeneralIdListString();
	battle.cureSelectUserHero(idStr,warpthMenuClass.callBack.cureGeneralBack);
};

//配兵
warpthMenuClass.handlers.allotSoldiers = function(){
	battle.getHeroSoldierInfo(warpthMenuClass.callBack.getHeroSoldierInfoBack);
};

//更换武将 (换将)
warpthMenuClass.handlers.changeGeneral = function(){
	if(warpthMenuClass.store.chosenGeneral.unShow.start == 0 && warpthMenuClass.store.chosenGeneral.unShow.length == 5)
		return;
	//设置武将选择窗口缓存数据
	warpthMenuClass.handlers.setGeneralCache();
	//设置选中集合全部可操作
	generalChoiceClass.handlers.setSelectOptionVariable(-1,true);
	//打开换将页面
	generalChoice(getClickObjectIndex(),warpthMenuClass.draw.layer,warpthMenuClass.draw.groupBottom);
	warpthMenuClass.draw.changeMap();
};

//确定 (出征)
warpthMenuClass.handlers.confirm = function(){
    var check = warpthMenuClass.handlers.check();
    if(check < 0){
    	var ex = warpthMenuClass.store.expedition;
    	var idStr = warpthMenuClass.handlers.getChosenGeneralIdListString();
    	//单挑数据特殊处理
    	if(warpthMenuClass.store.expedition.type == 1)
    		idStr = idStr.split(',', 1).toString();
    	console.log(ex);
    	battle.getReadyToBattle(ex.type,idStr,ex.targetType,ex.target.id,ex.formation.id,warpthMenuClass.callBack.addToBattle);
    }else{
    	alert(check);
    }
};

/**
 * 窗体按钮事件  end
 */


/**
 * 窗体请求回调
 */

//回调数据提示判断
warpthMenuClass.callBack.isDataError = function(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return true;
	}else{
		return false;
	}
};

//配兵回调  (打开配兵界面)
//下面方法包含了配兵界面用到的全局变量，重构配兵方法时再修正
warpthMenuClass.callBack.getHeroSoldierInfoBack = function(data){
	if(warpthMenuClass.callBack.isDataError(data))
		return;
	
	userSoldiers = new Array();
	for(var i =0; i<data.userSoldiers.length; i++)
	{
		userSoldiers[i] = 
		{
			soldierName : data.userSoldiers[i].soldierName,
			soldierAmount : data.userSoldiers[i].soldierAmount,
			soldierNo:data.userSoldiers[i].soldierNo,
		};
	}
	userHeros = new Array();
	uhCnt = new Array();
	pbListColor = new Array();
	for(var i =0; i<data.userHeros.length; i++)
	{
		userHeros[i] = 
		{
			id : data.userHeros[i].id,
			soldierNo:data.userHeros[i].soldierNo,
			heroName:data.userHeros[i].toolTipInfo.heroName,
			quality : data.userHeros[i].toolTipInfo.quality,
			level:data.userHeros[i].toolTipInfo.level,
			soldierName:data.userHeros[i].soldierName,
			soldierAmount:data.userHeros[i].soldierAmount,
			command:data.userHeros[i].toolTipInfo.command
		};
		pbListColor[i] = qualityColor[data.userHeros[i].toolTipInfo.quality];
	}
	if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
		isChengQiang = true;
		//初始化下拉框对象、数据
		var comboboxPeibing = new Combobox();
		comboboxPeibing.data = [{id:'',txt:'无'}];
		for(var i=0; i<userSoldiers.length; i++){
				var line = userSoldiers[i];
			   	var obj = {
			 		id:line['soldierNo'],
			  		txt:line['soldierName']
			   	};
			   	comboboxPeibing.data.push(obj);
		}
		comboboxPeibing.selected = comboboxPeibing.data[0];
		comboboxes['positon_peibing'] = comboboxPeibing;
		//配兵界面关闭方法赋值
		peibingClose = function(){
			//计算战斗力
			warpthMenuClass.handlers.countForce();
			warpthMenuClass.flag.isDrawWarpthMenu = true;
			warpthMenu(getClickObjectIndex());
		};
		//打开配兵界面  
		peibingClass.handler.cleanHeroSoldierChange();
		peibing(getClickObjectIndex(),warpthMenuClass.draw.layer,warpthMenuClass.draw.groupBottom);
		warpthMenuClass.draw.changeMap();
	}else
		alert("没有可派遣的武将！");
};

//战斗力计算回调
warpthMenuClass.callBack.countForceBack = function(data){
	if(warpthMenuClass.callBack.isDataError(data))
		return;
	var cg = warpthMenuClass.store.chosenGeneral;
	//赋值战斗力
	cg.force = Number(data.toFixed(1));
};

//医疗回调
warpthMenuClass.callBack.cureGeneralBack = function(data){
	if(warpthMenuClass.callBack.isDataError(data))
		return;
	var cg = warpthMenuClass.store.chosenGeneral;
	for(var i  =0 ;i<cg.generalNumber; i++){
			if(data.hpMpList[i]!=null){
				cg.generals[i].intCurrentHp = data.hpMpList[i].currentHp;
				cg.generals[i].intCurrentMp = data.hpMpList[i].currentMp;;
			}
	}
	//赋值战斗力
	cg.force = Number(data.forceNum.toFixed(1));
};

//确定出征回调
warpthMenuClass.callBack.addToBattle = function(data){
	if(warpthMenuClass.callBack.isDataError(data))
		return;
	if(data){
		//关闭窗口
		warpthMenuClass.handlers.close();
	}
};

//获取目标具体信息回调
warpthMenuClass.callBack.getTargetDesc = function(data){
	if(warpthMenuClass.callBack.isDataError(data))
		return;
	warpthMenuClass.store.expedition.target.desc = data;
};


/**
 * 窗体绘制方法
 */

//出征窗体索引
warpthMenuClass.draw.index = 0;
warpthMenuClass.draw.groupBottom = 'cityMenu';
warpthMenuClass.draw.layer = 'cityMenuLayer';

//窗体底层参数设置
warpthMenuClass.draw.setGroupBottom = function(groupBottom){
	if(groupBottom)
		warpthMenuClass.draw.groupBottom = groupBottom;
};
//窗体layer设置
warpthMenuClass.draw.setLayer = function(layer){
	if(layer)
		warpthMenuClass.draw.layer = layer;
};

//changeMap封装
warpthMenuClass.draw.changeMap = function(){
	changeMap(warpthMenuClass.draw.layer);
};

//changeMap封装
warpthMenuClass.draw.changeMapByLayer = function(layer){
	changeMap(layer);
};

// 出征类型选项绘制
warpthMenuClass.draw.expeditionType = function(){
	//勾选图片名
	var sImg = 'ty_an_01';
	//勾选图片宽高
	var sw = gbox.getImage(sImg).width;
	var sh = gbox.getImage(sImg).height;
	//第一个选项的起始位置
	var sX = 437;
	//选项文字图片与勾选图片的间距
	var sBetweenT = 10;
	//每个选项的起始位置
	var oneX = sX;
	//两个选项之间的间距
	var betweenW = 50;
	//选项的高度
	var sY = 248;
	var drawExType = function(exType,type){
		//选项文字图片宽高
		var w = gbox.getImage(exType.img).width;
		var h = gbox.getImage(exType.img).height;
		//如果当前为选中
		if(exType.isSelect)
			sImg = 'ty_an_12';
		else
			sImg = 'ty_an_01';
		
		gbox.drawImage(sImg,oneX,sY);
		gbox.drawImage(exType.img,(oneX + sw + sBetweenT),(sY + (sh - h)));
		exType.x = oneX;
		exType.y = sY;
		exType.w = sw + sBetweenT + w;
		exType.h = sh;
		oneX += sw + sBetweenT + w + betweenW;
		warpthMenuClass.flag.isHaveExpeditionType = true;
		return false;
	};
	warpthMenuClass.handlers.loopExpeditionType(drawExType);
};
//阵型信息绘制
warpthMenuClass.draw.formationDesc = function(){
	if(warpthMenuClass.store.expeditionFormations.status){
    	//阵型选择
    	gbox.drawImage('cz_zjm_03',344,282);
    	//阵型名称
    	var fname = warpthMenuClass.store.expedition.formation.name;
    	var tW = 436 + (114 - gbox.getTextWidth(fname,14))/2;
        gbox.drawString(fname, tW,290,'#FFFFFF',11);
    }
    if(warpthMenuClass.store.expeditionFormations.formationStatus){
    	//阵型
        gbox.drawImage('cz_zjm_04',740,195);
        //阵型图
        if(warpthMenuClass.store.expedition.formation.obj)
        	gbox.drawImage(warpthMenuClass.store.expedition.formation.obj.formationIcon,795,200);
        //阵型效果背景
        gbox.drawImage('cz_zjm_05',885,195);
        //阵型名字
        //阵型效果描述
        gbox.drawString(warpthMenuClass.store.expedition.formation.name, 930,200,'#FFFFFF',14);
        var ds = warpthMenuClass.store.expedition.formation.desc;
        if(ds.length > 0){
        	var desc = ds.split(',');
        	for(var i=0; i<desc.length; i++)
        	{
        		gbox.drawText(desc[i], 910,220 + (i*20),4);
        	}
        	    
        }
    }
};

//绘制单挑目标信息
warpthMenuClass.draw.targetDesc = function(){
	var target = warpthMenuClass.store.expedition.target;
	if(target.descStatus){
		//阵型
	    gbox.drawImage('cz_zjm_11',717,200);
	    //目标头像
	    gbox.drawImage('cz_zjm_12',800,195);
	    gbox.drawImage(target.desc.heroIcon,806,199);
	    //目标信息
	    gbox.blitRect(gbox.getBufferContext(),{x:890,y:195,w:190,h:105,globalAlpha:.4,color:'#000000'});
	    var color = '#FFFFFF';
	    var font = 12;
	    //等级
	    gbox.drawText('等级',900,210,4);
	    gbox.drawText(target.desc.level,950,210,4);
	    //单挑力
	    gbox.drawText('单挑力',900,230,4);
	    gbox.drawText(target.desc.singleForce,950,230,4);
	    //武力
	    gbox.drawText('武力',900,250,4);
	    gbox.drawText(target.desc.force,950,250,4);
	    //谋略
	    gbox.drawText('谋略',1000,250,4);
	    gbox.drawText(target.desc.strategy,1050,250,4);
	    //身法
	    gbox.drawText('身法',900,270,4);
	    gbox.drawText(target.desc.agility,950,270,4);
	    //体质
	    gbox.drawText('体质',1000,270,4);
	    gbox.drawText(target.desc.physique,1050,270,4);
	}
};

//绘制武将不可选择状态
warpthMenuClass.draw.unSelectGeneral = function(start,length){
	for(var i=start; i< start + length; i++){
		var bW = i*(130+24);
		gbox.drawImage('cz_zjm_06',347 + bW,359);
		gbox.drawImage('cz_zjm_07',347 + bW,359);
	}
};

//绘制选中武将
warpthMenuClass.draw.showSelectGeneral = function(){
	var sl = warpthMenuClass.store.chosenGeneral.generals;
	for(var i = 0;i<sl.length;i++){
		if(warpthMenuClass.store.chosenGeneral.generalNumber <= i)
			break;
		if(sl[i]){
			//武将头像
	    	gbox.drawImage('' + sl[i].heroIcon,359 + i*154,377);
	    	//武将选择  叉号
	    	gbox.drawImage('cancelImage',460 + i*154,370);
		}
    }
};

//绘制战斗力(单挑力)
warpthMenuClass.draw.force = function(){
	if(warpthMenuClass.store.expedition.type == 1){
		//单挑力
		gbox.drawImage('cz_zjm_17',343,544);
	}else{
		//部队战斗力
		gbox.drawImage('cz_zjm_16',342,544);
	}
	gbox.drawText(warpthMenuClass.store.chosenGeneral.force, 428,550,4);
};

//武将鼠标提示
warpthMenuClass.draw.generalToolTip = function(x,y){
	var gl = warpthMenuClass.store.chosenGeneral.generals;
	 for(var i =0; i<gl.length;i++){
		 if(gl[i]){
			 if(gl[i].toolTipInfo){
				 if(x > 355 + (i*154) && x < 465 + (i*154) && y > 370 && y < 523){
			    		tooltip.drawHero(gbox.getImage("toolTip"),gbox.getBufferContext(),
			    				x+15,y,
			    				gl[i].toolTipInfo
		 				);
		 		 }
			 }
		 }
	}
};




/**
 * 武将出征公共工具方法类
 */
expeditionToolClass = {};
//绘制相关
expeditionToolClass.draw = {};
expeditionToolClass.draw.getGroupByGroupBottom = function(groupBottom){
	var rs = [];
	if(groupBottom == 'cityMenu')
		rs = [groupBottom,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'];
	else
		rs = [groupBottom,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'];
	return rs;
};


//出征界面打开方法(界面入口)
//注意，打开出征界面前请关闭其它窗口
warpthMenuClass.handlers.battleOpen = function(data){
	//打开前清除武将出征页面缓存数据
	warpthMenuClass.handlers.clearCache();
	//设置目标
	var expedition = warpthMenuClass.handlers.setExpedition(
		data.id,//目标id
		data.name,//目标名称
		data.type,//目标类型(物种)1:人  0:野怪
		data.typeLevel,//目标类型细分
		data.needTime,//出征时间
		data.isTargetChange,//不可更改目标
		data.obj//目标对象(目标对象本身,可选参数)
	);
	warpthMenuClass.handlers.setTarget(expedition);
	//设置关闭出征界面时需要刷新的界面
	warpthMenuClass.handlers.closeCallBack = data.close;
	warpthMenuClass.flag.isDrawWarpthMenu = true;
	//打开出征界面
	warpthMenu(getClickObjectIndex(),data.layer,data.groupBottom);
	warpthMenuClass.draw.changeMap();
};


// 屏蔽之前代码
//var orderArray = new Array();
//orderArray[0] = false;
//orderArray[1] = false;
//orderArray[2] = false;
//orderArray[3] = false;
//var warpthMenuCtr = true;
//var userInfoIndex = 0;
//var ctrUserArrayInfo = true;
//var userArrayInfo = new Array();//阵法
//var isSelcteArea = new Array();
//isSelcteArea[0] = false;
//isSelcteArea[1] = false;
//isSelcteArea[2] = false;
//isSelcteArea[3] = false;
//isSelcteArea[4] = false;
//var isUserInfo = false;
//var clickgeneralChoice = false;//当没有选择攻击方式时判断是否可以选择武将
//var paramList = false;
//var readyToBattle = false;
//
//function dogetReadyToBattle(data)
//{
//	if(typeof(data.error) != "undefined")
//	{
//		        //readyToBattle = false;
//				alert("系统提示：" + data.error);
//				return;
//	}
//	if(data)
//	{
//		
//		readyToBattle = true;
//	}
//	
//}
//function doheroParamList(data)
//{
//	if(typeof(data.error) != "undefined")
//	{
//				alert("系统提示：" + data.error);
//				return;
//	}
//	for(var i  =0 ;i<5; i++)
//	{
//			if(data.hpMpList[i]!=null)
//			{
//				isSelectGeneral[i].intCurrentHp = data.hpMpList[i].currentHp;
//				isSelectGeneral[i].intCurrentMp = data.hpMpList[i].currentMp;;
//			}
//	}
//    countForceCount = data.forceNum;
//}
//function doGetUserArrayInfo(data)
//{
//    isUserInfo = false;
//	if(typeof(data.error) != "undefined")
//	{
//				alert("系统提示：" + data.error);
//				return;
//	}
//	userArrayInfo[0] = 
//			{
//				arrayId : data[0].techNo,
//				arrayName : data[0].name,
//			};
//	if(data.length > 0)
//	{
//	         
//		for(var a = 0 ; a < data.length; a++)
//		{
//			userArrayInfo[a + 1] = 
//			{
//				arrayId : data[a].techNo,
//				arrayDescription : data[a].effectDescription,
//				arrayName : data[a].name,
//				formationIcon : data[a].formationIcon,
//				level : data[a].level,
//			};
//			
//		}
//		
//	}
//	isUserInfo = true;
//	
//}
//
//var userHeros = new Array();
//var userSoldiers = new Array();
//var pbListColor = new Array();
//var uhCnt = new Array();
//function doGetHeroSoldierInfo(data)
//{
//	if(typeof(data.error) != "undefined")
//	{
//		alert("系统提示：" + data.error);
//		return;
//	}
//	userSoldiers = new Array();
//	for(var i =0; i<data.userSoldiers.length; i++)
//	{
//		userSoldiers[i] = 
//		{
//			soldierName : data.userSoldiers[i].soldierName,
//			soldierAmount : data.userSoldiers[i].soldierAmount,
//			soldierNo:data.userSoldiers[i].soldierNo,
//		};
//	}
//	
//	uhCnt = new Array();
//	tempSoldierAmount = new Array();
//	tempOldSoldierAmount = new Array();
//	userHeros = new Array();
//	pbListColor = new Array();
//	for(var i =0; i<data.userHeros.length; i++)
//	{
//		userHeros[i] = 
//		{
//			id : data.userHeros[i].id,
//			soldierNo:data.userHeros[i].soldierNo,
//			heroName:data.userHeros[i].toolTipInfo.heroName,
//			quality : data.userHeros[i].toolTipInfo.quality,
//			level:data.userHeros[i].toolTipInfo.level,
//			soldierName:data.userHeros[i].soldierName,
//			soldierAmount:data.userHeros[i].soldierAmount,
//			command:data.userHeros[i].toolTipInfo.command
//		};
//		pbListColor[i] = qualityColor[data.userHeros[i].toolTipInfo.quality];
//	}
//	if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
//		peibing(getClickObjectIndex());
//		changeMap('cityMenuLayer');	
//	}else
//		alert("没有可派遣的武将！");
//
//}
//
//var getSoldierIndex = function(userSoldiers,soldierNo){
//	for(var j =0; j<userSoldiers.length; j++)
//	{
//		if(soldierNo == userSoldiers[j].soldierNo)
//		{
//           return j;
//		}
//	}
//	return -1;
//};
//
//var isHaveIndex = function(arr,index){
//	for(var j =0; j<arr.length; j++)
//	{
//		if(index == arr[j])
//		{
//           return true;
//		}
//	}
//	return false;
//};