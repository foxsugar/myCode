var jjcRectPoly = new Array(new Array());
var jjcSelected = new Array();
var jjcSelectPoly = new Array(new Array());
var isJjcSelected = false;
var jjcIndex = 0;
var isJunjichu = false;
var jjcIds = new Array();
var neizhengIndex = 0;
var affairDesc = '';
var junjichu = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJunjichu = true;
	isJjcChakan = false;
	isJinjie = false;
	isQiansan = false;
	isJunying = false;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('jjc_zjm_01').width;
	var bH = gbox.getImage('jjc_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;    
	
		gbox.addObject(
			{ 
				id : 'junjichu',
				group : 'levelMenu_2',
				tileset : 'jjc_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					if(divjunjichuNum == null && !gbox._isIndwellDiv("divjunjichuNum","input"))
					{
						divjunjichuNum = addDivWindowBg(789,458);
						divjunjichuNum.id = 'divjunjichuNum';
						document.body.appendChild(divjunjichuNum);
						jjcAuctionNum = document.createElement("input");
						jjcAuctionNum.style.id = 'divjunjichuNum';
						jjcAuctionNum.style.backgroundColor = '#000000';
						jjcAuctionNum.style.width = '48px';
						jjcAuctionNum.style.color = '#ffffff';
						jjcAuctionNum.value = 24;
						jjcAuctionNum.oninput = jjcInputValueChange;
						divjunjichuNum.appendChild(jjcAuctionNum);            
					}
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(divjunjichuNum,"divjunjichuNum",790);
					/*======================================================*/		
				},
				myclick : function()
				{
					if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
					{//关闭
						displayDestroy();
						isJunjichuList = false;
						isJunjichu = false;
						exit(index);
						curGroup = 'cityMenu';
						enterCityMenu(curGroup);
	                    changeMap('cityMenuLayer');	
					}else 
					if(((lastTouchMoveX > 360) && (lastTouchMoveX < (360 + 50))) && ((lastTouchMoveY > 576) && (lastTouchMoveY<(576 + 26))))
					{//全选
						jjclist.entirelyHandle();
					}else 
					if(((lastTouchMoveX > 412) && (lastTouchMoveX < (412 + 50))) && ((lastTouchMoveY > 576) && (lastTouchMoveY<(576 + 26))))
					{//取消
						jjclist.entirelyHandle1();
					}else 							
					if(((lastTouchMoveX > 434) && (lastTouchMoveX < (551 + 19))) && ((lastTouchMoveY > 464) && (lastTouchMoveY<(464 + 12))))
					{//选择操作下拉
						//阵型下拉框
						if(!comboboxes['Affairs'].isCreated){
							//下拉框选中方法
							var selected = function(){
								var oneAffair = getAffairByAffairNo(comboboxes['Affairs'].selected.id);
								affairDesc = oneAffair.affairdesc;
						    	junjichu(getClickObjectIndex());
						    	isJunjichuList = true;
								changeMap('cityMenuLayer');
							};
							//绘制下拉框
							var _index = getClickObjectIndex();
							comboboxes['Affairs'].info(
									_index,
									'affairs_combobox1',
									'levelMenu_3',
									'cityMenuLayer',
									['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
									434,
									478,
									{widthType:3,isScrolling:false}
							);
							comboboxes['Affairs'].createCombobox(selected);
						}else{
							comboboxes['Affairs'].closeCombobox();
						}
						junjichu(getClickObjectIndex());
						isJunjichuList = true;
						changeMap('cityMenuLayer');
					}else
					if(((lastTouchMoveX > 482) && (lastTouchMoveX < (482 + 84))) && ((lastTouchMoveY > 576) && (lastTouchMoveY<(576 + 26))))
					{//全部中止
						var end_uhId = new Array();
						if(typeof(hero) != "undefined"){
							
							for(var i=0; i<hero.length; i++){
								if(hero[i].heroStatus != "空闲" || hero[i].time>0)
									end_uhId.push(hero[i].userHeroId); 
							}
							if(typeof(end_uhId) != "undefined" && end_uhId.length > 0)
								BuildingFunction.endMission(end_uhId.toString(),doAllendMission);
							else
								alert("全部停止：没有正在执行的政策数据！"); 
						}else
							alert("全部停止：没有可操作数据！");   
					}else
		            if(((997 < lastTouchMoveX) && (lastTouchMoveX < (997+84))) && ((576 < lastTouchMoveY) && (lastTouchMoveY < (576+26))))
		            {//确定
						if(MouseWheelPanelObj['jjc_mouse'].store.multipleChoiceIndex.length>0){
							var begin_uhId = new Array();
							for(var i=0; i<MouseWheelPanelObj['jjc_mouse'].store.multipleChoiceIndex.length; i++){
								begin_uhId.push(hero[Number(MouseWheelPanelObj['jjc_mouse'].store.multipleChoiceIndex[i])].userHeroId);
							}
							BuildingFunction.beginMission(begin_uhId.toString(),
									comboboxes['Affairs'].selected.id,
			                        jjcAuctionNum.value,
			                        doBeginMission);
						}else
							alert("确定策略：没有可操作数据！"); 
		            }else
					if(((766 < lastTouchMoveX) && (lastTouchMoveX < (766+12))) && ((462 < lastTouchMoveY) && (lastTouchMoveY < (462+19))))
					{//左箭头
						jjcAuctionNum.value = 1;
			        }else
			        if(((847 < lastTouchMoveX) && (lastTouchMoveX < (847+12))) && ((462 < lastTouchMoveY) && (lastTouchMoveY < (462+19))))
					{//右箭头
			        	jjcAuctionNum.value = 24;
			        	
			        }else 
			        if(MouseWheelPanelObj['jjc_mouse'].tool.isInArea(lastTouchMoveX,lastTouchMoveY))
			        {//点击在列表区域
			        	MouseWheelPanelObj['jjc_mouse'].tool.select(
			        			lastTouchMoveX,lastTouchMoveY,
			        			function(dataIndex,mx,my){
			        				var isClick = false;
			        				if(hero[dataIndex].time > 0){
				        				var ckX = MouseWheelPanelObj['jjc_mouse'].store.x+584+10;
				        				var zzX = ckX+gbox.getImage("jjc_zjm_06").width+10;
				        				if((ckX < mx) && (mx < (ckX + gbox.getImage("jjc_zjm_06").width)))
				        				{//查看
				        					console.log('查看');
				        					isClick = true;
											BuildingFunction.getMissionStatus(hero[dataIndex].userHeroId,function(data){
												doGetMissionStatus(data,dataIndex);
											});
				        				}else 
				        				if((zzX < mx) && (mx < (zzX + gbox.getImage("jjc_zjm_07").width)))
				        				{//中止
				        					isClick = true;
				        					console.log('中止');
											jjcZhongzhi(getClickObjectIndex(),dataIndex);
						                 	changeMap('cityMenuLayer');	
				        				}
				        			}
			        				return isClick;
			        			}
			        	);
			        }else{
			        	commandBuildBtn(lotIndex,"建筑加速");
			        	comboboxes['Affairs'].isCreated = false;
			        	isJunjichuList = true;
						junjichu(getClickObjectIndex());
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isJunjichu)
					 {
					    gbox.drawImage("jjc_zjm_01",backdropX,backdropY);
					    gbox.drawImage("ty_an_27",backdropX1,backdropY1 + 4);
					    gbox.drawImage('jjc_zjm_02',(gbox.getImage('jjc_zjm_01').width - gbox.getImage("jjc_zjm_02").width)/2 + backdropX,backdropY1+14);
			            //绘制选择品质左右选择按钮 
			            gbox.drawImage('ty_an_25',766,462);
			            gbox.drawImage('ty_an_24',847,462);
			            //确定按钮 
			            gbox.drawImage('ty_an_10',997,576);
						if(((touchMoveX > 997) && (touchMoveX < (997+84))) && ((touchMoveY > 576) && (touchMoveY<(576 + 26))))
						{
							gbox.drawImage('ty_an_09',997,576);						
						}
						
					 	var strW = gbox.getTextWidth("确 定",14);
			            var strX = 997 + (84 - strW)/2;
			            var strY = 576 + (26 - 14)/2;
						gbox.drawText("确 定", strX, strY,10);	

					 	//全选按钮
					 	gbox.drawImage('ty_an_08',360,576);	
						if(((touchMoveX > 360) && (touchMoveX < (360 + 50))) && ((touchMoveY > 576) && (touchMoveY<(576 + 26))))
						{
							gbox.drawImage('ty_an_06',360,576);						
						}
					 	var strW = gbox.getTextWidth("全选",14);
			            var strX = 360 + (50 - strW)/2;
			            var strY = 576 + (26 - 14)/2;
						gbox.drawText("全选", strX, strY,10);	
						
					 	//取消按钮
					 	gbox.drawImage('ty_an_08',412,576);	
						if(((touchMoveX > 412) && (touchMoveX < (412 + 50))) && ((touchMoveY > 576) && (touchMoveY<(576 + 26))))
						{
							gbox.drawImage('ty_an_06',412,576);						
						}
						
					    var strW = gbox.getTextWidth("取消",14);
			            var strX = 412 + (50 - strW)/2;
			            var strY = 576 + (26 - 14)/2;
						gbox.drawText("取消", strX, strY,10);	

					 	//中止按钮
					 	gbox.drawImage('ty_an_10',482,576);	
						if(((touchMoveX > 482) && (touchMoveX < (482 + 84))) && ((touchMoveY > 576) && (touchMoveY<(576 + 26))))
						{
							gbox.drawImage('ty_an_09',482,576);						
						}
						
					 	var strW = gbox.getTextWidth("全部中止",14);
			            var strX = 482 + (84- strW)/2;
			            var strY = 576 + (26 - 14)/2;
						gbox.drawText("全部中止", strX, strY,10);		
						
					 	var jgX = 551;
					 	var jgY = 458;
					 	gbox.drawImage('ty_tdt_09',jgX,jgY);	
					 	
						if(((touchMoveX > 551) && (touchMoveX < (551 + 19))) && ((touchMoveY > 464) && (touchMoveY<(464 + 12))))
						{
							var tzX = 551;
						 	var tzY = 458;
						 	gbox.drawImage('ty_tdt_10',tzX,tzY);							
						}
						
						if(comboboxes && comboboxes['Affairs']){
							var text = comboboxes['Affairs'].selected.txt;
							var iW = gbox.getTextWidth("" + text,14);
							var iX = 436 + (112 - iW)/2;
							gbox.drawText("" + text,iX, 464,10);
						}
						
						//内政事件描述
						gbox.drawLineBreakText(affairDesc,380,490,2,660);
						drawBuildCommandBtn();

						gbox.drawLineBreakText(buildCommonDesc[lotIndex],550,210,0,600);
					    if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						   }
					    //显示输入框
					    if(((touchMoveX > 360) && (touchMoveX < 1084)) && ((touchMoveY > 456) && (touchMoveY < 569)))
						{
					    	divjunjichuNum.style.display="";
						}
					    if(MouseWheelPanelObj['jjc_mouse'])
					    	MouseWheelPanelObj['jjc_mouse'].draw.clipArea(touchMoveX,touchMoveY,drawJJCList,drawJJCtoolTip);
					    
					 }						
				}
			});

};

var drawJJCList = function(mx,my,store,tool){
	var lineColor = "#000000";
	var onlineColor = 'rgba(54,107,104,.8)';
	var selecedlineColor = 'rgba(95,23,31,.7)';
	var h = store.lineHeight;
	var getCW = function(x,w,str){
		return Math.floor(x+(w-gbox.getTextWidth(str,14))/2);
	};
	//绘制列分隔线
	tool.line(store.x+148,store.y,null,store.totalLine*h,lineColor);
	tool.line(store.x+196,store.y,null,store.totalLine*h,lineColor);
	tool.line(store.x+286,store.y,null,store.totalLine*h,lineColor);
	tool.line(store.x+374,store.y,null,store.totalLine*h,lineColor);
	tool.line(store.x+476,store.y,null,store.totalLine*h,lineColor);
	tool.line(store.x+584,store.y,null,store.totalLine*h,lineColor);
	
	for(var i=0; i<store.totalLine; i++){
		var lh = store.y + i*h;
		var th = lh + 5;
		
		gbox.drawImage('ty_an_01',store.x+5,lh+2);	
		//鼠标经过行底图
		if(((store.x < mx) && (mx < (store.x + store.area[2]))) && 
		    (((lh) < my) && (my < (lh + h)))){
			tool.moveonLine(store.x,lh,onlineColor);
			gbox.drawImage('ty_an_04',store.x+5,lh+2);
		}
		
		//鼠标选中底图
		for(var j=0; j<store.multipleChoiceIndex.length; j++){
			if(store.multipleChoiceIndex[j] == i){
				tool.moveonLine(store.x,lh,selecedlineColor);
				gbox.drawImage('ty_an_12',store.x+5,lh+2);
			}
		}
		
		gbox.drawText(hero[i].heroName,getCW(store.x,148,hero[i].heroName),th,2);
		gbox.drawText(hero[i].level,getCW(store.x+148,48,hero[i].level),th,2);
		//获得经验值
		var nexp = '';
		if(typeof(hero[i].heroNeedExp) == "undefined" ||
				Math.ceil(hero[i].heroNeedExp) <= 0){
			nexp = "0%";
		}else
			nexp = Math.ceil((hero[i].exp/hero[i].heroNeedExp) * 100) + "%";
		gbox.drawText(nexp,getCW(store.x+196,90,nexp),th,2);
		
		//状态
		var status = '';
		if(typeof(hero[i].heroStatus) != "undefined")
			status = "" + hero[i].heroStatus;
		else
			status = "空闲";
		gbox.drawText(status,getCW(store.x+286,88,status),th,2);
		
		gbox.drawText(hero[i].event,getCW(store.x+374,102,hero[i].event),th,2);
		
		//剩余时间
		var timeStr = '';
		if(typeof(hero[i].remainedTime) != "undefined"){
			timeStr = "" + changeTimeformat(hero[i].remainedTime);
		}else{
			timeStr = "00:00:00";
		}
		gbox.drawText(timeStr,getCW(store.x+476,108,timeStr),th,2);
		//操作
		//查看
		var ck = 'jjc_zjm_06';
		var zz = 'jjc_zjm_07';
		if(hero[i].time > 0){
			ck = 'jjc_zjm_04';
			zz = 'jjc_zjm_05';
		}
		var ckX = store.x+584+10;
		var ckY = lh+3;
		gbox.drawImage(ck,ckX,ckY);
		//中止
		var zzX = ckX+gbox.getImage(zz).width+10;
		var zzY = lh+3;
		gbox.drawImage(zz,zzX,zzY);
		//绘制行分隔线
		tool.line(store.x,lh+h,700,null,lineColor);
	}
};


var drawJJCtoolTip = function(mx,my,store,tool){
	var h = store.lineHeight;
	for(var i=0; i<store.totalLine; i++){
		var lh = store.y + i*h;
		//鼠标经过行底图
		if(((store.x < mx) && (mx < (store.x + store.area[2]))) && 
		    (((lh) < my) && (my < (lh + h)))){
			if(my >=store.area[1] && my <= store.area[1]+store.area[3]){
				if(hero[i].toolTipInfo){
					var mouseY = 0;
					//计算提示框高度
		    		var tempH = tooltip.computHero(gbox.getBufferContext(),hero[i].toolTipInfo).height;
		    		//设置提示框位置不会超出画面
		    		if((gbox.getScreenH() - my) < tempH)	
		    			mouseY = gbox.getScreenH() - tempH;
		    		else
				    	mouseY = my;
		    		//绘制提示框
					tooltip.drawHero(gbox.getImage("toolTip"),gbox.getBufferContext(),
								mx+15,mouseY,
								hero[i].toolTipInfo
						);
					//根据提示框坐标设置input遮挡隐藏 
					if(gbox.intersectRect(789,458,48,20,mx + 15,my,222,tempH)){
							divjunjichuNum.style.display="none";
		               }
		               else{
		            	   divjunjichuNum.style.display="";
		               }
	
				}
			}
		}
	}
};


//处理回调中的data数据
var hero = new Array();
var internarAffairs = new Array();
var dataHandler = function(data){
	if(isDataError(data))
		return;
	var timers = new Array();
	hero = new Array();
	internarAffairs = new Array();
	//1.武将信息
	for(var i=0; i<data.hero.length; i++){
		var temp = data.hero[i];
		hero[i] = {
				event:temp.event,
				userHeroId:temp.id,//武将ID
				heroName:temp.toolTipInfo.heroName,//武将名
				level:temp.toolTipInfo.level,//武将等级
				exp:temp.exp,//武将当前等级经验
				heroStatus:temp.status,//武将状态
				time:temp.time,//执行时间（h）
				remainedTime:temp.remainedTime,//已用时间（ms）
				toolTipInfo:{
					agility : temp.toolTipInfo.agility,
					command : temp.toolTipInfo.command,
					heroForce : temp.toolTipInfo.heroForce,
					heroName : temp.toolTipInfo.heroName,
					heroType : temp.toolTipInfo.heroType,
					level : temp.toolTipInfo.level,
					mp : temp.toolTipInfo.mp,
					mpMax : temp.toolTipInfo.mpMax,
					physique : temp.toolTipInfo.physique,
					quality : temp.toolTipInfo.quality,
					stamina : temp.toolTipInfo.stamina,
					staminaMax : temp.toolTipInfo.staminaMax,
					strategy : temp.toolTipInfo.strategy
				}
		};
		if(temp.time > 0 && temp.remainedTime > 0){
			timers.push(hero[i]);
		}
	}
	//倒计时处理
	var objList = new Array();
	for(var t=0; t<timers.length; t++){
		objList.push({
			startNumber:timers[t].remainedTime,
			obj : timers[t]
		});
	}
	if(timers.length > 0){
		var timerList = new Countdown();
		timerList.setCountList(objList,1000,
				function(o){
					o.obj.remainedTime = o.startNumber;
				},
				function(o){
					o.obj.time = 0;
					o.obj.event = '无';
				},
				function(){
				}
		);
	}
	//2.内政
	for(var i=0; i<data.affair.length; i++){
		var temp1 = data.affair[i];
		internarAffairs[i] = {
				affairNo:temp1.affairNo,	//内政主键
				name:temp1.affairName,		//内政名
				affairdesc:temp1.affairdesc //事件描述
		};
	}
	affairDesc = internarAffairs[0].affairdesc;
};
//回调数据提示判断
var isDataError = function(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return true;
	}else{
		return false;
	}
};
//根据内政主键，在内政对象集合中查找相应对象
var getAffairByAffairNo = function(id){
	var re = null;
	for(var i=0; i<internarAffairs.length; i++){
		if(internarAffairs[i].affairNo == id)
			re = internarAffairs[i];
	}
	return re;
};
//初始化军机处界面
function doInitPrivycouncil(data){
	dataHandler(data);
	
	//选择操作(内政)下拉框
	comboboxes = {};
    var comboboxAffairs = new Combobox();
    comboboxAffairs.setData(data.affair,'affairNo','affairName');
    comboboxes['Affairs'] = comboboxAffairs;
    
    MouseWheelPanelObj = {};
    MouseWheelPanelObj['jjc_mouse'] = new MouseWheelPanel();
    //参数意义  context对象,整个绘制区域(包括表头和滚动条区域),数据对象,显示行数,行高,表头高,滚动条区域宽度,滚动条宽度,是否多选
    MouseWheelPanelObj['jjc_mouse'].draw.info(
    		gbox.getBufferContext(),
    		[361,276,721,181],
    		hero,6,26,24,22,16,true
    );
    var can = $('canvas');
    console.log(can[0]);
	junjichu(getClickObjectIndex());
//	junjichuList(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

function doEndMission(data,dataIndex){//结束策略
		dataHandler(data.hero);
		MouseWheelPanelObj['jjc_mouse'].setTotalLine(hero.length);
		//取消当前选中
		MouseWheelPanelObj['jjc_mouse'].tool.unSelect(dataIndex);
//		jjclist.rectSelected[jjcListIndex] = false;
//		for(var j=0; j<jjclist._passIndex.length; j++){
//			if(jjcListIndex == jjclist._passIndex[j]){
//				jjclist._passIndex = jjclist._passIndex.del(j);
//				jjclist._passCnt = jjclist._passIndex.length;
//			}
//		}
}

var passIndex = new Array();
function doAllendMission(data){//结束策略
	dataHandler(data.hero);
	MouseWheelPanelObj['jjc_mouse'].setTotalLine(hero.length);
	MouseWheelPanelObj['jjc_mouse'].tool.unSelectAll();
}

function doBeginMission(data){//开启策略
	dataHandler(data.hero);
	MouseWheelPanelObj['jjc_mouse'].setTotalLine(hero.length);
}

function doGetMissionStatus(data,dataIndex){//获取策略完成描述
	if(isDataError(data))
		return;
	var affairInfo = data.desc;
	jjcChakan(getClickObjectIndex(),dataIndex,affairInfo);
	changeMap('cityMenuLayer');	
}

var isJjcChakan = false;
//查看提示窗口
var jjcChakan = function(index,dataIndex,affairInfo){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJjcChakan = true;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bx = backdropX + (gbox.getImage('ty_an_55').width - gbox.getImage('ty_an_06').width)/2;
    gbox.addObject(
    		{ 
    			id : 'jujichuChakan',
    			group : 'levelMenu_3',
    			tileset : 'ty_an_55',
    			x : 0,
    			y : 0,
    			frame : 0,
    			poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
    			initialize : function()
    			{

    			},
    			first : function() 
    			{

    			},
    			myclick : function()
    			{
					if(((lastTouchMoveX > bx) && (lastTouchMoveX < (bx + gbox.getImage('ty_an_06').width))) && 
							((lastTouchMoveY > 395) && (lastTouchMoveY<(395 + gbox.getImage('ty_an_06').height))))
					{
						isJjcChakan = false;
    					exit(getClickObjectIndex());
    					junjichu(getClickObjectIndex());
                        changeMap('cityMenuLayer');	
    				}else{
    					jjcChakan(getClickObjectIndex(),dataIndex,affairInfo);
    					changeMap('cityMenuLayer');						
    				}
    			},
    			blit : function()
    			{
    				 if(isDrawUI[index] && isJjcChakan)
    				 {
    					gbox.drawImage('ty_an_55',backdropX,backdropY);
    					gbox.drawImage('ty_an_08',bx,395);
						if(((touchMoveX > bx) && (touchMoveX < (bx + gbox.getImage('ty_an_06').width))) && 
								((touchMoveY > 395) && (touchMoveY<(395 + gbox.getImage('ty_an_06').height))))
						{
							gbox.drawImage('ty_an_06',bx,395);						
						}
					 	var iW = gbox.getTextWidth('确定',14);
						var iX = bx + (gbox.getImage('ty_an_06').width - iW)/2;
					 	gbox.drawText('确定',iX,400,10);
					 	
					 	if(typeof(affairInfo) != 'undefined')
					 	      gbox.drawText(affairInfo,600,335,2);
    				 }						
    			}
    		});
};


var isJjcZhongzhi = false;
//中止提示窗口
var jjcZhongzhi = function(index,dataIndex){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJjcZhongzhi = true;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
    gbox.addObject(
    		{ 
    			id : 'jujichuZhongzhi',
    			group : 'levelMenu_3',
    			tileset : 'ty_an_55',
    			x : 0,
    			y : 0,
    			frame : 0,
    			poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
    			initialize : function()
    			{

    			},
    			first : function() 
    			{

    			},
    			myclick : function()
    			{
					if(((lastTouchMoveX > 618) && (lastTouchMoveX < (618 + 50))) && ((lastTouchMoveY > 395) && (lastTouchMoveY<(395 + 26))))
					{
						if(typeof(hero[dataIndex]) != "undefined"){
							if(hero[dataIndex].time > 0){
								BuildingFunction.endMission(hero[dataIndex].userHeroId,function(data){
									doEndMission(data,dataIndex);
								});
							} 
						}
//    					displayDestroy();
						isJjcZhongzhi = false;
						exit(getClickObjectIndex());
    					junjichu(getClickObjectIndex());
                        changeMap('cityMenuLayer');	
    				}else
					if(((lastTouchMoveX > 769) && (lastTouchMoveX < (769 + 50))) && ((lastTouchMoveY > 395) && (lastTouchMoveY<(395 + 26))))
					{
						isJjcZhongzhi = false;
						exit(getClickObjectIndex());
    					junjichu(getClickObjectIndex());
                        changeMap('cityMenuLayer');	
					}
    				else{
    					jjcZhongzhi(getClickObjectIndex(),dataIndex);
    					changeMap('cityMenuLayer');						
    				}
    			},
    			blit : function()
    			{
    				 if(isDrawUI[index] && isJjcZhongzhi)
    				 {
    					gbox.drawImage('ty_an_55',backdropX,backdropY);
    					gbox.drawImage('ty_an_08',618,395);	
						if(((touchMoveX > 618) && (touchMoveX < (618 + 50))) && ((touchMoveY > 395) && (touchMoveY<(395 + 26))))
						{
							gbox.drawImage('ty_an_06',618,395);						
						}
					 	var iW = gbox.getTextWidth('中止',14);
						var iX = 618 + (gbox.getImage('ty_an_06').width - iW)/2;
					 	gbox.drawText('中止',iX,400,10);
					 	
					 	gbox.drawImage('ty_an_08',769,395);
						if(((touchMoveX > 769) && (touchMoveX < (769 + 50))) && ((touchMoveY > 395) && (touchMoveY<(395 + 26))))
						{
							gbox.drawImage('ty_an_06',769,395);						
						}
					 	var iW = gbox.getTextWidth('返回',14);
						var iX = 769 + (gbox.getImage('ty_an_06').width - iW)/2;
					 	gbox.drawText('返回',iX,400,10);
					 	
					 	//操作中止按钮显示提示
					 	var centext = new Array();
					 	centext[0] = "武将：" + hero[dataIndex].heroName;
					 	centext[1] = "停止内政：" + hero[dataIndex].event;
					 	var txtX = backdropX + (gbox.getImage('ty_an_55').width - gbox.getTextWidth(centext[0],14))/2;
					 	gbox.drawText(centext[0],txtX,335,2);
					 	var txtX2 = backdropX + (gbox.getImage('ty_an_55').width - gbox.getTextWidth(centext[1],14))/2;
					 	gbox.drawText(centext[1],txtX2,335+20,2);
    				 }						
    			}
    		});
};

var jjcInputValueChange = function(e){
	this.value = this.value.replace(/\D/g,'');
	if(this.value > 24)
		this.value = 24;
	if(this.value < 1)
		this.value = 1;
};


//	var jjcBtnItem = new Array();
//	    jjcBtnItem[0] = "mobuttonl";
//	var jjcBtnGrayItem = new Array();
//	    jjcBtnGrayItem[0] = "mobutton";
//	var itemIcon = new Array();
//	var jjcRect = "jjc_zjm_16";
//
//	var itemName = new Array();
//	var itemScale  = new Array();
//	var itemLevel = new Array();
//	var itemExp = new Array();
//	var itemState = new Array();
//	var itemStartTime = new Array();
//	var itemEndTime = new Array();
//    
//    var itemEvent = new Array();
//    var jyItem = new Array();
//    jyItem[0] = "jyitem";
//    
//    var itemHealth = new Array();
//    var itemLostEvaluate = new Array();
//    var itemNeedMedicine = new Array();
    
//    var isJunjichuList = false;
//    var junjichuList = function(index)//军机处列表
//    {
//    	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
//    	isDrawUI[index] = true;
//    	isJunjichuList = true;
//    	jjcListIndex = -1;
//    	gbox.addObject(
//    			{ 
//    				id : 'jjclist',
//    				group : 'levelMenu_2',
//    				tileset : 'jjc_zjm_01',
//    				x : 0,
//    				y : 0,
//    				frame : 0,
//    				poly : [ [360,300], [1085,300], [1085,454],[360,454]],
//    				initialize : function()
//    				{
//    					itemIcon = new Array();
//    					itemName = new Array();
//    					itemLevel = new Array();
//    					itemExp = new Array();
//    					itemState = new Array();
//    					itemStartTime = new Array();
//    					itemEndTime = new Array();
//    					itemEvent = new Array();//事件名称
//    					if(typeof(hero) != "undefined"){
//    							for(var i=0; i< hero.length; i++){
//    								if(typeof(hero[i]) != "undefined"){
//    									itemName[i] =  "" + hero[i].heroName;
//    									itemLevel[i] = "" + hero[i].level;
//    									
//    									if(typeof(hero[i].heroNeedExp) == "undefined" ||
//    											Math.ceil(hero[i].heroNeedExp) <= 0){
//    										itemExp[i] = "0%";
//    									}else
//    									    itemExp[i] = Math.ceil((hero[i].exp/hero[i].heroNeedExp) * 100) + "%";
//    									
//    									if(typeof(hero[i].heroStatus) != "undefined"){
//    										itemState[i] = "" + hero[i].heroStatus;
//    									}else{
//    										itemState[i] = "空闲";
//    									}
//    									if(typeof(hero[i].time) != "undefined"){
//    										itemStartTime[i] = "" + changeTimeformat(hero[i].time*3600000);
//    									}else{
//    										itemStartTime[i] = "00:00:00";
//    									}
//    									if(typeof(hero[i].remainedTime) != "undefined"){
//    										itemEndTime[i] = "" + changeTimeformat(hero[i].remainedTime);
//    									}else{
//    										itemEndTime[i] = "00:00:00";
//    									}
//    									
//    									if(hero[i].time > 0){
//    										itemIcon.push(jjcBtnItem);
//    									}else
//    										itemIcon.push(jjcBtnGrayItem);
//    									
//    									itemEvent[i] = hero[i].event;
//    								}
//    								
//    							}
//    					}
//    					var content = new Array(itemName,itemLevel,itemExp,itemState,itemEvent,itemEndTime,itemIcon);
//    		            var listLen = content[0].length;
//    		            if(listLen < 6){
//    		            	listLen = 6;
//    		            }   
//    		            jjcOffsetY = jjc_OffsetY = 0;
//    		            jjclist.init( jjcRect, 'jjc_zjm_14', 'jjc_zjm_23', 'jjc_zjm_15',null,content, 342, 279, 1, listLen, 26, 6, false, -598, 0 );
//    		            jjclist.fontSize = 12;
//    				},
//    				first : function() 
//    				{	
//    				},
//    				myclick : function()
//    				{
//    					comboboxes['Affairs'].isCreated = false;
//    					isJunjichuList = true;
//    					junjichu(getClickObjectIndex());
//    					if(jjclist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1 /*&& jjclist._passIndex[jjclist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY)] == -1*/)
//    					{
//    						if(Math.abs(jjcOffsetY) > 12)
//    						{
//    							jjcOffsetY=12*(jjcOffsetY/Math.abs(jjcOffsetY));
//    						}
//    						jjc_OffsetY = jjcOffsetY;
//    						jjc_BeginSlip = true;
//    						jjc_Time = 0;
//        					junjichu(getClickObjectIndex());
////        					updataJunjichu();
//    						changeMap('cityMenuLayer');		
//    					}else{
//    						
//    						jjcListIndex = jjclist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
//    						console.log("jjcIndex = " + jjcListIndex);
//        					junjichu(getClickObjectIndex());
////        					updataJunjichu();
//    						changeMap('cityMenuLayer');		
//    						if(((lastTouchMoveX > 969) && (lastTouchMoveX < (969 + 42))))
//    						{
//								if(typeof(hero[jjcListIndex]) != "undefined"){
//									if(hero[jjcListIndex].time > 0){
//										BuildingFunction.getMissionStatus(hero[jjcListIndex].userHeroId,doGetMissionStatus);
//									}
//								}
//    						}else
//        					if(((lastTouchMoveX > 1015) && (lastTouchMoveX < (1015 + 42))))
//        					{
//								if(typeof(hero[jjcListIndex]) != "undefined"){
//									if(hero[jjcListIndex].time > 0){
//										jjcZhongzhi(getClickObjectIndex());
//			                 			changeMap('cityMenuLayer');	
//									}
//								}
//        					}
//    						else
//    						{
//    							jjclist.mulripleHandle(jjcListIndex);
//    						}
//    					}	
//    		          	if(gbox._mouseArea(jjclist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
//    		          		jjclist.keyUp();
//    		            }
//    		          	if(gbox._mouseArea(jjclist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
//    		          		jjclist.keyDown();
//    		            }
//    				},
//    		blit : function()
//    		{
//    			
//    			if(isDrawUI[index] && isJunjichuList)
//    			{
//    				jjclist.paint( jjc_OffsetY, jjc_BeginSlip, jjc_Time );
//    				
//    				gbox.drawImage('jjc_zjm_22',507,276);	
//    				gbox.drawImage('jjc_zjm_22',556,276);	
//    				gbox.drawImage('jjc_zjm_22',645,276);
//    				gbox.drawImage('jjc_zjm_22',733,276);
//    				gbox.drawImage('jjc_zjm_22',835,276);
//    				gbox.drawImage('jjc_zjm_22',942,276);
//    				
    				
//    			}
//    		}
//    	 });
//    };
//    
//var updataJunjichu = function()
//{
//	itemIcon = new Array();
//	itemName = new Array();
//	itemLevel = new Array();
//	itemExp = new Array();
//	itemState = new Array();
//	itemStartTime = new Array();
//	itemEndTime = new Array();
//	itemEvent = new Array();//事件名称
//	if(typeof(hero) != "undefined"){
//			for(var i=0; i< hero.length; i++){
//				if(typeof(hero[i]) != "undefined"){
//					itemName[i] =  "" + hero[i].heroName;
//					itemLevel[i] = "" + hero[i].level;
//					
//					if(typeof(hero[i].heroNeedExp) == "undefined" ||
//							Math.ceil(hero[i].heroNeedExp) <= 0){
//						itemExp[i] = "0%";
//					}else
//					    itemExp[i] = Math.ceil((hero[i].exp/hero[i].heroNeedExp) * 100) + "%";
//					
//					if(typeof(hero[i].heroStatus) != "undefined"){
//						itemState[i] = "" + hero[i].heroStatus;
//					}else{
//						itemState[i] = "空闲";
//					}
//					if(typeof(hero[i].time) != "undefined"){
//						itemStartTime[i] = "" + changeTimeformat(hero[i].time*3600000);
//					}else{
//						itemStartTime[i] = "00:00:00";
//					}
//					if(typeof(hero[i].remainedTime) != "undefined"){
//						itemEndTime[i] = "" + changeTimeformat(hero[i].remainedTime);
//					}else{
//						itemEndTime[i] = "00:00:00";
//					}
//					
//					if(hero[i].time > 0){
//						itemIcon.push(jjcBtnItem);
//					}else
//						itemIcon.push(jjcBtnGrayItem);
//					
//					itemEvent[i] = hero[i].event;
//				}
//			}
//	}
//	var content = new Array(itemName,itemLevel,itemExp,itemState,itemEvent,itemEndTime,itemIcon);
//    var listLen = content[0].length;
//    if(listLen < 6){
//    	listLen = 6;
//    }
//	
//    jjclist.update(content, null, listLen);
//};
//    