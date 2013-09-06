var isBaohu = false;
var isFenghuotai = false;
var cellarSet = {
	cellarFont : 14,
	resNum:5
};
var isOpen = new Array();//控制开启保护记录
var openTimeInterval = new Array();
var iniTime = 600;//初始俩小时，单位秒
var timeCnt = [0,0,0,0,0];
var drawIntTime = ["02:00:00","02:00:00","02:00:00","02:00:00","02:00:00"];

var fenghuotai = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isFenghuotai = true;
	isMinju = false;
	isJunjichu = false;
	isJinjie = false;
	isQiansan = false;
	isJunying = false;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('dj_zjm_01').width;
	var bH = gbox.getImage('dj_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2; 
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 30;		
	var fhtOffsetX = 240;
	var fhtOffsetY = -47;
		gbox.addObject(
			{ 
				id : 'fenghuotai',
				group : 'levelMenu_2',
				tileset : 'dj_zjm_01',
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
					for(var i =0; i<cellarSet.resNum; i++)
					{
						if(((984 < lastTouchMoveX) && (lastTouchMoveX < 1069)) && ((336 + i*55 < lastTouchMoveY) && (lastTouchMoveY < 361 + i*55)))
						{
							if(isOpen[i])
							{
								BuildingFunction.beginCellarProtect(resData[i].protectionNo,doBeginCellarProtect);	
//								if(openTimeInterval[i] == null)
//		                             openTimeInterval[i] = setInterval("resOpenTimer(" + iniTime + "," + i + ")",1000);
//							       isOpen[i] = false;
							}
							else
							{
								if(openTimeInterval[i] != null)
								{
									clearInterval(openTimeInterval[i]);
									timeCnt[i] = 0;
									openTimeInterval[i] = null;
									drawIntTime[i] = "";
								}	
								drawIntTime[i] = "02:00:00";
								BuildingFunction.cancelCellarProtect(resData[i].protectionNo,doCancelCellarProtect);
								isOpen[i] = true;
							}
							 
						}
					}
					if(((exitButtonCoordinate2.x < lastTouchMoveX) && (lastTouchMoveX < (exitButtonCoordinate2.x + gbox.getImage('ty_an_17').width))) && ((exitButtonCoordinate2.y < lastTouchMoveY) && (lastTouchMoveY < (exitButtonCoordinate2.y + gbox.getImage('ty_an_17').height)))){
						displayDestroy();
						exit(index);
						curGroup = 'cityMenu';
						enterCityMenu(curGroup);
	                    changeMap('cityMenuLayer');	
					}else{
						commandBuildBtn(lotIndex,"建筑加速");
						fenghuotai(getClickObjectIndex());
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isFenghuotai)
					 {
					 	gbox.drawImage('dj_zjm_01',backdropX,backdropY);
					 	gbox.drawImage('ty_an_27',backdropX + 6,backdropY + 14);
					    gbox.drawImage('dj_zjm_02',(gbox.getImage('dj_zjm_01').width - gbox.getImage("dj_zjm_02").width)/2 + backdropX,backdropY1+19);
					    gbox.drawImage('dj_zjm_03',(gbox.getImage('dj_zjm_01').width - gbox.getImage("dj_zjm_03").width)/2 + backdropX,backdropY1+19);
					    drawBuildCommandBtn();
//			            gbox.drawTxtRect(buildCommonDesc[lotIndex],450,190,500,70,20,'#ffffff','#000000');
			            gbox.drawLineBreakText(buildCommonDesc[lotIndex],450,220,0,550);
						if(((exitButtonCoordinate2.x < touchMoveX) && (touchMoveX < (exitButtonCoordinate2.x + gbox.getImage('ty_an_17').width))) && ((exitButtonCoordinate2.y < touchMoveY) && (touchMoveY < (exitButtonCoordinate2.y + gbox.getImage('ty_an_17').height))))
				        {
				        	gbox.drawImage('ty_an_17',exitButtonCoordinate2.x,exitButtonCoordinate2.y);					
					    }
					    else
					    {
						    gbox.drawImage('ty_an_18',exitButtonCoordinate2.x,exitButtonCoordinate2.y);	
					    }
						for(var i=0; i<resData.length; i++)
						{
							var displayDataW = 110;
							var lineH = 55;
							var tempTxtX = 0;
							tempTxtX = (displayDataW - gbox.getBufferContext().measureText(resData[i].resourceNum).width)/2;								             
			   			    var tempStartX = 530 + tempTxtX;			
							//gbox.drawDanceString(resData[i].resourceNum,tempStartX, 341 + i*55,cellarSet.cellarFont, '#000000','#ffffff');
							gbox.drawText(resData[i].resourceNum,tempStartX,341 + i*lineH,2);
							var tempTxtX = 0;
							tempTxtX = (129 - gbox.getBufferContext().measureText(protectLimit).width)/2;								             
			   			    var tempStartX = 662 + tempTxtX;			
//							gbox.drawDanceString(protectLimit,tempStartX, 341 + i*55,cellarSet.cellarFont, '#000000','#ffffff');
							gbox.drawText(protectLimit,tempStartX,341 + i*lineH,2);
							var tempTxtX = 0;
							tempTxtX = (129 - gbox.getBufferContext().measureText("02:00:00").width)/2;								             
			   			    var tempStartX = 807 + tempTxtX;
			   			    if(drawIntTime[i] == "00:00:00")
			   			    {
			   			    	clearInterval(openTimeInterval[i]);
								timeCnt[i] = 0;
								openTimeInterval[i] = null;
								drawIntTime[i] = "02:00:00";
								BuildingFunction.getCellarProtect(resData[i].protectionNo,doCellarProtect);
								isOpen[i] = true;
			   			    }	
			   			    else
			   			    {
//			   			    	gbox.drawDanceString(drawIntTime[i],tempStartX, 341 + i*55,cellarSet.cellarFont, '#000000','#ffffff');
			   			    	gbox.drawText(drawIntTime[i],tempStartX,341 + i*lineH,2);
			   			    }								
							var tempTxtX = (129 - gbox.getImage('ty_an_10').width)/2;
							var tempStartX = 964 + tempTxtX;
							gbox.drawImage('ty_an_10',tempStartX,337 + i*lineH);	
							if(!isOpen[i])						
								gbox.drawText("取消保护",tempStartX +(74 - gbox.getBufferContext().measureText("取消保护").width)/2,344 + i*lineH,10);
							else
								gbox.drawText("开启保护",tempStartX +(74 - gbox.getBufferContext().measureText("开启保护").width)/2,344 + i*lineH,10);
						}
					 }						
				}
			});

};

//烽火台初始界面
var protectLimit = 0;
var resData = new Array();
function doInitCellar(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	resData.splice(0,resData.length);
	for(var i=0; i<data.length -1; i++)
	{
		resData[i] = 
		{
			protectionNo : data[i].protectionNo,
			protectionTime : data[i].protectionTime,
			resourceNum : data[i].resourceNum,
		};
		if(resData[i].protectionTime != 0)
		{		
			if(openTimeInterval[i] != null)
								{
									clearInterval(openTimeInterval[i]);
									timeCnt[i] = 0;
									openTimeInterval[i] = null;
									drawIntTime[i] = "02:00:00";
								}
			if(openTimeInterval[i] == null)
			{
				var time = resData[i].protectionTime/1000;
				openTimeInterval[i] = setInterval("resOpenTimer(" + Math.ceil(time)+ "," + i + ")",1000);
				
			}   
			isOpen[i] = false;
		}
		else
		{	
			if(openTimeInterval[i] != null)
								{
									clearInterval(openTimeInterval[i]);
									timeCnt[i] = 0;
									openTimeInterval[i] = null;
									drawIntTime[i] = "02:00:00";
								}
			isOpen[i] = true;
		}
	}
	protectLimit = data[data.length - 1];
	fenghuotai(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}
var isbeginCellar = false;
function doBeginCellarProtect(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	for(var i =0; i<resData.length; i++)
	{
		if(resData[i].protectionNo == data.protectionNo)
		{
			console.log("i==" + i);
			if(data.protectionTime != 0)
			{
				if(openTimeInterval[i] != null)
				{
						clearInterval(openTimeInterval[i]);
						timeCnt[i] = 0;
						openTimeInterval[i] = null;
						drawIntTime[i] = "";
				}			
			    if(openTimeInterval[i] == null)
				{
					var time = data.protectionTime/1000;
					openTimeInterval[i] = setInterval("resOpenTimer(" + Math.ceil(time)+ "," + i + ")",1000);
					
				}  
				isOpen[i] = false;
			}
			else
			{	
				isOpen[i] = true;
			}
		}
	}
}
function doCancelCellarProtect(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
}
function doCellarProtect(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	for(var i =0; i<resData.length; i++)
	{
		if(resData[i].protectionNo == data.protectionNo)
		{
			if(data.protectionTime != 0)
			{
				if(openTimeInterval[i] != null)
				{
						clearInterval(openTimeInterval[i]);
						timeCnt[i] = 0;
						openTimeInterval[i] = null;
						drawIntTime[i] = "";
				}			
			    if(openTimeInterval[i] == null)
				{
					var time = data.protectionTime/1000;
					openTimeInterval[i] = setInterval("resOpenTimer(" + Math.ceil(time)+ "," + i + ")",1000);
					
				}  
				isOpen[i] = false;
			}
			else
			{	
				isOpen[i] = true;
			}
		}
	}
}
function resOpenTimer(initData,i)
{
	timeCnt[i] = Number(timeCnt[i] + 1);
	drawIntTime[i] = changeTimeformat((initData - timeCnt[i])*1000);
};  