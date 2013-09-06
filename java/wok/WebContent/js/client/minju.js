
var isMinju = false;
var minju = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isMinju = true;
	isJunjichu = false;
	isJinjie = false;
	isQiansan = false;
	isJunying = false;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('mj_zjm_01').width;
	var bH = gbox.getImage('mj_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2; 
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 30;		
		gbox.addObject(
			{ 
				id : 'minju',
				group : 'levelMenu_2',
				tileset : 'mj_zjm_01',
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
		            if(((977 < lastTouchMoveX) && (lastTouchMoveX < (977 + 82))) && ((435 < lastTouchMoveY) && (lastTouchMoveY < (435 + 25))))
		            {
		            	upPeopleIndex = 0;
						BuildingFunction.addPeople(0,0,0,doAddPeople);
		                console.log("恢复人口");
					 			               
		            }else
			        if(((977 < lastTouchMoveX) && (lastTouchMoveX < (977 + 82))) && ((570 < lastTouchMoveY) && (lastTouchMoveY < (570 + 25))))
			        {
			        	upPeopleIndex = 0;
						BuildingFunction.addPopularSupport(0,0,0,doAddPopularSupport);
			            console.log("恢复民心");
						 			               
			        }
                    
					if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height))){
						displayDestroy();
						exit(index);
						curGroup = 'cityMenu';
						enterCityMenu(curGroup);
	                    changeMap('cityMenuLayer');	
					}
					else{
						
						commandBuildBtn(lotIndex,"建筑加速");
						minju(getClickObjectIndex());
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isMinju)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'mj_zjm_01',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });
					 	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_27',
									tile : 0,
									dx :backdropX1,
									dy :backdropY1 + 4,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							     });

					    gbox.drawImage('mj_zjm_04',(gbox.getImage('mj_zjm_01').width - gbox.getImage("mj_zjm_04").width)/2 + backdropX,backdropY1);
					    drawBuildCommandBtn();
					 	
					    if(typeof(minjuData) != "undefined"){
							var bw = Math.floor(((447) * minjuData.workingPeople) / minjuData.people); 
						    
					        gbox.setClip(gbox.getBufferContext(),607,375,bw,39);
					        
					        gbox.drawImage("mj_zjm_02",607,375); 
					        
					        gbox.restoreClip(gbox.getBufferContext());	
					        
					        
					        
							var bw1 = Math.floor(((447) * minjuData.popularSupport) / minjuData.popularSupportLimit); 
						    
					        gbox.setClip(gbox.getBufferContext(),608,525,bw1,26);
					        
					        gbox.drawImage("mj_zjm_03",608,525); 
					        
					        gbox.restoreClip(gbox.getBufferContext());	
//					        gbox.drawString("" + minjuData.peopleLimit,450, 480,'#FFFFFF',16);
					        gbox.drawText("" + minjuData.peopleLimit,450, 480,2);
//					        gbox.drawString("" + minjuData.people,450, 512,'#FFFFFF',16);
					        gbox.drawText("" + minjuData.people,450, 512,2);
//					        gbox.drawString("" + minjuData.peopleIncrease,485, 546,'#FFFFFF',16);
					        gbox.drawText("" + minjuData.peopleIncrease,485, 546,2);
//					        gbox.drawString("" + minjuData.moneyIncrease,462, 580,'#FFFFFF',16);
					        gbox.drawText("" + minjuData.moneyIncrease,462, 580,2);
					        
//					        gbox.drawString("" + minjuData.workingPeople,608, 354,'#FFFFFF',16);
					        gbox.drawText("" + minjuData.workingPeople,608, 354,2);
//					        gbox.drawString("" + minjuData.freePeople,942, 354,'#FFFFFF',16);
					        gbox.drawText("" + minjuData.freePeople,942, 354,2);
					        
					        var popuStrW = gbox.getTextWidth("" + minjuData.popularSupport + "/" + minjuData.popularSupportLimit, 16);
					        var popuX = 608 + (gbox.getImage("mj_zjm_03").width - popuStrW)/2;
//					        gbox.drawString("" + minjuData.popularSupport + "/" + minjuData.popularSupportLimit,popuX, 567,'#FFFFFF',16);
					        gbox.drawText("" + minjuData.popularSupport + "/" + minjuData.popularSupportLimit,popuX, 567,2);
					    }
				 		gbox.drawImage('ty_an_10',977,435);
			            if(((977 < touchMoveX) && (touchMoveX < (977 + 82))) && ((435 < touchMoveY) && (touchMoveY < (435 + 25))))
			            {
			                gbox.drawImage('ty_an_09',977,435);
						 			               
			            }
				 		var fontW = gbox.getTextWidth("恢复人口",14);
				 		var dx = 977 + (82 - fontW)/2;
					 	var dy = 435 + (25 - 14)/2;
//					 	gbox.drawDanceString("恢复人口", dx, dy,14,'#000000','#FFFFFF');
					 	gbox.drawText("恢复人口", dx, dy,10);
				 		gbox.drawImage('ty_an_10',977,570);
			            if(((977 < touchMoveX) && (touchMoveX < (977 + 82))) && ((570 < touchMoveY) && (touchMoveY < (570 + 25))))
			            {
			                gbox.drawImage('ty_an_09',977,570);	               
			            }
				 		var fontW = gbox.getTextWidth("恢复民心",14);
				 		var dx = 977 + (82 - fontW)/2;
					 	var dy = 570 + (25 - 14)/2;
//					 	gbox.drawDanceString("恢复民心", dx, dy,14,'#000000','#FFFFFF');
					 	gbox.drawText("恢复民心", dx, dy,10);
//					    gbox.drawTxtRect(buildCommonDesc[lotIndex],450,190,290,70,20,'#ffffff','#000000');
//					 	gbox.drawText(buildCommonDesc[lotIndex],450,190,0);
					 	gbox.drawLineBreakText(buildCommonDesc[lotIndex],444,198,0,544);
					   if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						   }
					 }						
				}
			});

};

//民居弹出
var isMinjuPop = false;
var isDianjuan = true;
var isJinding = false;
var upPeopleIndex = 0;
var minjuPop = function(index,title,title1,title2,_description,_ticket,_money,_item){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isMinjuPop = true;
	var quitAllianceOffsetY = 25;
	var bW = gbox.getImage('mj_zjm_05').width;
	var bH = gbox.getImage('mj_zjm_05').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	
	var bgW = gbox.getImage('mj_zjm_05').width;
	var bgH = gbox.getImage('mj_zjm_05').height;
	 
	var upX = 0;
	var upY = 0;
		gbox.addObject(
			{ 
				id : 'minjuPop',
				group : 'levelMenu_4',
				tileset : 'mj_zjm_05',
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

                    var btnX = backdropX + 20;
				    var btnY = backdropY + bgH - 32;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH - 32;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + 25))))
			        {
						isDrawUI[index] = false;
						isMinjuPop = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
						displayDestroy();
						exit(getClickObjectIndex());
						minju(getClickObjectIndex());
						changeMap('cityMenuLayer');
						var itemNo = 0;
						if(typeof(_item[upPeopleIndex]) != 'undefined')
							itemNo = _item[upPeopleIndex].itemNo;
						
						if(title == "恢复人口")
							BuildingFunction.addPeople(speedType,itemNo,1,doAddPeople);
						else
							BuildingFunction.addPopularSupport(speedType,itemNo,1,doAddPopularSupport);
						
			            console.log("确定");
			        }else
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + 25))))
			        {
						displayDestroy();
						exit(index);
						minju(getClickObjectIndex());
	                    changeMap('cityMenuLayer');
						console.log("取消");     
			        }else{
			        	minju(getClickObjectIndex());
			        	minjuPop(getClickObjectIndex(),title,title1,title2,_description,_ticket,_money,_item);
						changeMap('cityMenuLayer');
			        }
					
					if(((570 < lastTouchMoveX) && (lastTouchMoveX < (570 + 23))) && ((352 < lastTouchMoveY) && (lastTouchMoveY < (352 + 23))))
			        {
						if(isDianjuan)
						{
							speedType = 0;
							isDianjuan = false;
						}
						else{
							speedType = 1;
							isJinding = false;
							isDianjuan = true;
						}
							
			            console.log("点卷");
			        }
					if(((726 < lastTouchMoveX) && (lastTouchMoveX < (726 + 23))) && ((352 < lastTouchMoveY) && (lastTouchMoveY < (352 + 23))))
			        {
						if(isJinding)
						{
							speedType = 0;
							isJinding = false;
						}
						else{
							speedType = 2;
							isDianjuan = false;
							isJinding = true;
						}
							
			            console.log("金锭");
			        }

					 if(typeof(_item) != 'undefined')
					 {
						 for(var i=0; i<_item.length; i++)
						 {
							 var tmpX = 580 + (i*62);
							 var tmpY = 410;
							 if(((tmpX < lastTouchMoveX) && (lastTouchMoveX < (tmpX + 30))) && ((tmpY < lastTouchMoveY) && (lastTouchMoveY < (tmpY + 30))))
						     {
								 upPeopleIndex = i;
								 speedType = 3;
								 isDianjuan = false;
								 isJinding = false;
						     }
						 }
					 }
					

				},
				blit : function()
				{
					 if(isDrawUI[index] && isMinjuPop)
					 {
						 
						 
						 var mfindex = 0;
						 gbox.drawImage('mj_zjm_05',backdropX,backdropY);
						 
						 var bgW = gbox.getImage('mj_zjm_05').width;
						 var bgH = gbox.getImage('mj_zjm_05').height;
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 
						 var strW = gbox.getTextWidth(title,14);
						 var titleX = backdropX + (bgW - strW)/2;
//						 gbox.drawDanceString(title, titleX, backdropY + 2,16,'#000000','#FFC861');
						 gbox.drawText(title, titleX, backdropY + 2,14);
						 var strW1 = gbox.getTextWidth(title1,14);
						 var t1X = 560 + (150 - strW1)/2;
						 var t1Y = 327;
//						 gbox.drawDanceString(title1, t1X, t1Y,10,'#000000','#FFC861');	
						 gbox.drawText(title1, t1X, t1Y,14);
						 var strW2 = gbox.getTextWidth(title2,14);
						 var t2X = 560 + (105 - strW2)/2;
						 var t2Y = 388;
//						 gbox.drawDanceString(title2, t2X, t2Y,10,'#000000','#FFC861');
						 gbox.drawText(title2, t2X, t2Y,14);
//						 gbox._drawTxtRect(_description,580,250,220,60,14,'#ffffff','#000000');
						 gbox.drawLineBreakText(_description,580,270,6,280);
						 if(isDianjuan)
							 gbox.drawImage('ty_an_12',570,352);
						 
						 if(isJinding)
							 gbox.drawImage('ty_an_12',726,352);
						 
						 var strW = gbox.getTextWidth(_ticket,14);
						 var ticketX = 654 + (55 - strW)/2;
//						 gbox.drawDanceString(_ticket, ticketX, 357,10,'#000000','#FFFFFF');
						 gbox.drawText(_ticket, ticketX, 357,2);
						 var strW = gbox.getTextWidth(_money,14);
						 var moneyX = 816 + (55 - strW)/2;
//						 gbox.drawDanceString(_money, moneyX, 357,10,'#000000','#FFFFFF');
						 gbox.drawText(_money, moneyX, 357,2);
						    var fontW = gbox.getTextWidth("确认",14);
                            var btnX = backdropX + 20;
						    var btnY = backdropY + bgH - 32;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);
					        }	
//							gbox.drawDanceString("确认", backX, backY,14,'#000000','#FFFFFF');
							gbox.drawText("确认", backX, backY,10);
                            var btnX1 = backdropX + bgW - 102;
						    var btnY1 = backdropY + bgH - 32;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2;
							var backY = btnY1 + (25 - 14)/2;
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);       
					        }	
//							gbox.drawDanceString("取消", backX, backY,14,'#000000','#FFFFFF');
							gbox.drawText("取消", backX, backY,10);
							 if(typeof(_item) != 'undefined')
							 {
								 for(var i=0; i<_item.length; i++)
								 {
									 upX = 581 + (i*62);
									 upY = 412;
									 gbox.drawImage(_item[i].icon,upX,upY);
									 
									 if(!isDianjuan && !isJinding)
									 {
										 var rW = gbox.getImage(_item[upPeopleIndex].icon).width;
										 var rH = gbox.getImage(_item[upPeopleIndex].icon).height;
										 gbox.strokeRect(gbox.getBufferContext(),{x:(581 + (upPeopleIndex*62)),y:upY,w:rW,h:rH,
								         globalAlpha:1,color:'#FFC861'});
									 }
									 
									 if(((upX < touchMoveX) && (touchMoveX < (upX + 30))) && ((upY < touchMoveY) && (touchMoveY < (upY + 30))))
								     {
										 mfindex = i;
								     }
									 
									 if(typeof(_item[mfindex]) != 'undefined')
									 {
										 var dX = 581 + (mfindex*62);
										 var dY = 411;
										 if(((dX < touchMoveX) && (touchMoveX < (dX + 30))) && ((dY < touchMoveY) && (touchMoveY < (dY + 30))))
									     {
											var tempOffset = 15;
											var tempH = tooltip.computMaterial(gbox.getBufferContext(),_item[mfindex].toolTipInfo).height;
											if((gbox.getScreenH() - touchMoveY) < tempH)	
											{
												mouseY = gbox.getScreenH() - tempH - 20;
											}
											else
											{
												mouseY = touchMoveY;
											}
											if(touchMoveX !=0)
												tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,mouseY + tempOffset,_item[mfindex].toolTipInfo); 
									      }
									 }

								 }
							 }
						 

					 }						
				}
			});
};

//进入民居的界面
var minjuData = undefined;
function doInitHouse(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}

	minjuData = undefined;
	minjuData = {
			peopleLimit:data.peopleLimit,//人口上限
			people:data.people,//当前人口数量
			peopleIncrease:data.peopleIncrease,//人口增长
			moneyIncrease:data.moneyIncrease,//每小时铜币增长
			workingPeople:data.workingPeople,//工作人口数量
			freePeople:data.people - data.workingPeople,//空闲人口数量
			popularSupport:data.popularSupport,//民心
			popularSupportLimit:data.popularSupportLimit,//民心上限
			
	};

	minju(getClickObjectIndex());
	changeMap('cityMenuLayer');	
	
}

//恢复人口
var speedType = 0;
var state = undefined;
function doAddPeople(data){
	if(typeof(data.error) != "undefined"){
		minju(getClickObjectIndex());
		changeMap('cityMenuLayer');
		alert("系统提示：" + data.error);
		return;
	}
	state = undefined;
	state = data.state;
    if(typeof(state) != 'undefined')
    {
    	BuildingFunction.initHouse(doInitHouse);
    	return;
    }
	
	var ticket = data.ticket;
	var money = data.money;
	var item = new Array()
	for(var i=0; i< data.item.length; i++)
	{
		var tmp = data.item[i];
		item[i] = {
				icon:tmp.icon,
				isEnough:tmp.isEnough,
				itemNo:tmp.itemNo,
				name:tmp.name,
				toolTipInfo:{
						description:tmp.tooltip.description,
						isBop:tmp.tooltip.isBop,
						itemName:tmp.tooltip.itemName,
				}
		};
	}
	
	minju(getClickObjectIndex());
	minjuPop(getClickObjectIndex(),"恢复人口","立即恢复全部人口","道具增加","恢复人口恢复人口恢复人口v恢复人口恢复人口恢复人口恢复人口恢复人口恢复人口恢复人口",money,money,item);
	changeMap('cityMenuLayer');
}

//恢复民心
function doAddPopularSupport(data){
	if(typeof(data.error) != "undefined"){
		minju(getClickObjectIndex());
		changeMap('cityMenuLayer');
		alert("系统提示：" + data.error);
		return;
	}
	state = undefined;
	state = data.state;
    if(typeof(state) != 'undefined')
    {
    	BuildingFunction.initHouse(doInitHouse);
    	return;
    }
	
	var ticket = data.ticket;
	var money = data.money;
	var item = new Array()
	for(var i=0; i< data.item.length; i++)
	{
		var tmp = data.item[i];
		item[i] = {
				icon:tmp.icon,
				isEnough:tmp.isEnough,
				itemNo:tmp.itemNo,
				name:tmp.name,
				toolTipInfo:{
						description:tmp.tooltip.description,
						isBop:tmp.tooltip.isBop,
						itemName:tmp.tooltip.itemName,
				}
		};
	}
	
	minju(getClickObjectIndex());
	minjuPop(getClickObjectIndex(),"恢复民心","立即恢复全部民心","道具恢复","恢复民心恢复民心恢复民心恢复民心恢复民心恢复民心恢复民心恢复民心恢复民心恢复民心恢复民心",money,money,item);
	changeMap('cityMenuLayer');
}