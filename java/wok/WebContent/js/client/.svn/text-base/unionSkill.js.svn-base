/*
 * 联盟科技（zjm 2013_7_12）
 */
var isUnionSkill = false;
var unionSkill = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionSkill = true;	
	var bW = gbox.getImage('wwg_zjm_09').width;
	var bH = gbox.getImage('wwg_zjm_09').height;
	var backdropX = 539;
	var backdropY = 281;
		gbox.addObject(
			{ 
				id : 'unionSkill',
				group : 'levelMenu_2',
				tileset : 'wwg_zjm_09',
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
					waiwuguan(getClickObjectIndex());
					unionSkill(getClickObjectIndex());
					changeMap('cityMenuLayer');	
	 				var btnW = gbox.getImage('ty_an_06').width;
	 				var btnH = gbox.getImage('ty_an_06').height;
	 				var btnX = 762;
	 				var btnY = 458;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
			        {
		 				if(typeof(yuanzhengData) != 'undefined'){
		 					if(yuanzhengData.isUpgradeExpeditionStation){
		 						yzInfo = undefined;
		 						xnInfo = undefined;
		 						yzInfo = "名称：" + yuanzhengData.technologyName 
		 						         + "，需要等级：" + yuanzhengData.technologyNeedLevel
		 						         +"，需要时间：" + changeTimeformat(yuanzhengData.technologyNeedTime*1000)
		 						         +"，需要财富：" + yuanzhengData.technologyNeedWealth +  ".";
								upLevel(getClickObjectIndex(),0);
								changeMap('cityMenuLayer');
					            console.log("远征驿升级！");
		 					}
		 				}

			        }
					
	 				var btnX = 1043;
	 				var btnY = 458;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
			        {
		 				if(typeof(xingnongData) != 'undefined'){
		 					if(xingnongData.isUpgradeSinonDivision){
		 						yzInfo = undefined;
		 						xnInfo = undefined;
		 						xnInfo = "名称：" + xingnongData.technologyName 
		 						         + "，需要等级：" + xingnongData.technologyNeedLevel
		 						         +"，需要时间：" +  changeTimeformat(xingnongData.technologyNeedTime)
		 						         +"，需要财富：" + xingnongData.technologyNeedWealth + ".";
								upLevel(getClickObjectIndex(),1);
								changeMap('cityMenuLayer');
								console.log("兴农司升级！");
		 					}
		 				}
			        }
				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionSkill)
					 {
						//联盟科技绘制
					 	gbox.drawImage('wwg_zjm_09',539,281);
					 	var fontW = gbox.getTextWidth("远征驿", 16);
					 	var strX = 575 + (166 - fontW)/2;
					 	var strY = 310;
					 	if(typeof(yuanzhengData) != 'undefined')
//					 	gbox.drawDanceString("远征驿"  + " " + yuanzhengData.technologyLevel + "级" , strX, strY,16,'#000000','#FFC861');	
					 	gbox.drawText("远征驿"  + " " + yuanzhengData.technologyLevel + "级" , strX, strY,2);
					 	var strX = 862 + (166 - fontW)/2;
					 	var strY = 310;
					 	if(typeof(xingnongData) != 'undefined')
//					 	gbox.drawDanceString("兴农司"  + " " + xingnongData.technologyLevel + "级" , strX, strY,16,'#000000','#FFC861');	
					 	gbox.drawText("兴农司"  + " " + xingnongData.technologyLevel + "级" , strX, strY,2);
						if(upQradeRemainTime != "等待刷新！"){
//						 	gbox.drawDanceString("剩余时间：" + upQradeRemainTime, 590,472,14,'#000000','#FFC861');	
						 	gbox.drawText("剩余时间：" + upQradeRemainTime, 590,472,2);
				    		if(upQradeRemainTime == "00:00:00"){
				    			Alliance.initAllianceTechology(doInitAllianceTechology);
					         }	
							if(typeof(yuanzhengData) != 'undefined')
							      yuanzhengData.isUpgradeExpeditionStation = false;
						}
							
						if(upQradeRemainTime1 != "等待刷新！"){
//						 	gbox.drawDanceString("剩余时间：" + upQradeRemainTime1, 878,472,14,'#000000','#FFC861');	
						 	gbox.drawText("剩余时间：" + upQradeRemainTime1, 878,472,2);
						 	if(upQradeRemainTime1 == "00:00:00"){
				    			Alliance.initAllianceTechology(doInitAllianceTechology);
					         }	
							if(typeof(xingnongData) != 'undefined')
								xingnongData.isUpgradeSinonDivision = false;
						}
					 	
		 				var btnW = gbox.getImage('ty_an_06').width;
		 				var btnH = gbox.getImage('ty_an_06').height;
		 				var btnX = 762;
		 				var btnY = 458;
		 				gbox.drawImage('ty_an_08',btnX,btnY);
		 				
		 				if(typeof(yuanzhengData) != 'undefined'){
		 					if(yuanzhengData.isUpgradeExpeditionStation){
								if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
						        {
						               gbox.drawImage('ty_an_06',btnX,btnY);
						        }
		 					}else
			 					gbox.drawImage('ty_an_05',btnX,btnY);
		 				}
		 				
			               var strW = gbox.getTextWidth("升级",14);
			               var strX = btnX + (btnW - strW)/2;
			               var strY = btnY + (btnH - 14)/2;
//						gbox.drawDanceString("升级", strX, strY,14,'#000000','#FFFFFF');	
						gbox.drawText("升级", strX, strY,10);
		 				var btnX = 1043;
		 				var btnY = 458;
		 				gbox.drawImage('ty_an_08',btnX,btnY);
		 				
		 				if(typeof(xingnongData) != 'undefined'){
		 					if(xingnongData.isUpgradeSinonDivision){
								if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
						        {
						               gbox.drawImage('ty_an_06',btnX,btnY);
						        }
		 					}else
		 						gbox.drawImage('ty_an_05',btnX,btnY);
		 				}
		 				

			               var strW = gbox.getTextWidth("升级",14);
			               var strX = btnX + (btnW - strW)/2;
			               var strY = btnY + (btnH - 14)/2;
//						gbox.drawDanceString("升级", strX, strY,14,'#000000','#FFFFFF');	
						gbox.drawText("升级", strX, strY,10);
						if(typeof(yuanzhengData) != 'undefined'){
//							gbox._drawTxtRect(yuanzhengData.desc,550,480,200,105,14,'#ffffff','#000000');
							gbox.drawLineBreakText(yuanzhengData.desc,550,500,10,250);
						}
						if(typeof(xingnongData) != 'undefined'){
//							gbox._drawTxtRect(xingnongData.desc,830,480,200,105,14,'#ffffff','#000000');
							gbox.drawLineBreakText(xingnongData.desc,830,500,10,250);
						}
					 }						
				}
			});

};

var isUpLevel = false;
var upLevel = function(index,type){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUpLevel = true;
	var upLevelOffsetY = 25;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'upLevel' + type,
				group : 'levelMenu_4',
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
				    var fontW = gbox.getTextWidth("升级",14);
					var bgW = gbox.getImage('ty_an_55').width;
					var bgH = gbox.getImage('ty_an_55').height;
                    var btnX = backdropX + 20;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + upLevelOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + upLevelOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						isUpLevel = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    waiwuguan(getClickObjectIndex());
					    unionSkill(getClickObjectIndex());
						changeMap('cityMenuLayer');
					    if(type == 0)
					    {
					    	Alliance.upgradeAllianceTechnology('gb0002',doUpgradeAllianceTechnology);
					    	console.log("升级远征驿！");
					    }
					    else
					    {
					    	Alliance.upgradeAllianceTechnology('gb0001',doUpgradeAllianceTechnology1);
					    	console.log("升级兴农司！");
					    }
			        }else
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 + upLevelOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + upLevelOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						isUpLevel = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    waiwuguan(getClickObjectIndex());
					    unionSkill(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }else{
			        	waiwuguan(getClickObjectIndex());
						unionSkill(getClickObjectIndex());
						upLevel(getClickObjectIndex(),type);
						changeMap('cityMenuLayer');
			        }
				},
				blit : function()
				{
					 if(isDrawUI[index] && isUpLevel)
					 {
						 var bgW = gbox.getImage('ty_an_55').width;
						 var bgH = gbox.getImage('ty_an_55').height;
						 gbox.drawImage('ty_an_55',backdropX,backdropY);
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - 45)/2;
//						 gbox.drawImage('quzhuTitle',titleX,backdropY);
//						 gbox.drawDanceString("升  级", titleX, backdropY,14,'#000000','#FFC861');
						 gbox.drawText("升  级", titleX, backdropY,14);
						    var fontW = gbox.getTextWidth("升级",14);
                            var btnX = backdropX + 20;
						    var btnY = backdropY + bgH/2 + upLevelOffsetY;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2 - 2;
							var backY = btnY + (25 - 14)/2;
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);		               
					        }	
							gbox.drawText("升级", backX, backY,10);
                            var btnX1 = backdropX + bgW - 102;
						    var btnY1 = backdropY + bgH/2 + upLevelOffsetY;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2 - 2;
							var backY = btnY1 + (25 - 14)/2;	
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);			               
					        }
							gbox.drawText("取消", backX, backY,10);
							if(typeof(yzInfo) != 'undefined'){
//								gbox._drawTxtRect(yzInfo,626,320,180,50,8,'#ffffff','#000000');
								gbox.drawLineBreakText(yzInfo,626,335,10,200);
							}
							
							if(typeof(xnInfo) != 'undefined'){
//								gbox._drawTxtRect(xnInfo,626,320,180,50,8,'#ffffff','#000000');
								gbox.drawLineBreakText(xnInfo,626,335,10,200);
							}
					 }						
				}
			});
};
var yuanzhengData = undefined;
var xingnongData = undefined;
var yzInfo;
var xnInfo;
function doInitAllianceTechology(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	var tmp = data[0];
	yuanzhengData = undefined;
	yuanzhengData = {
			desc:tmp.desc,
			isUpgradeExpeditionStation:tmp.isUpgradeExpeditionStation,
			technologyLevel:tmp.toolTip.technologyLevel,
			technologyName:tmp.toolTip.technologyName,
			technologyNeedLevel:tmp.toolTip.technologyNeedLevel,
			technologyNeedTime:tmp.toolTip.technologyNeedTime,
			technologyNeedWealth:tmp.toolTip.technologyNeedWealth,
	};
	
	xingnongData = undefined;
	xingnongData = {
			desc:data[1].desc,
			isUpgradeSinonDivision:data[1].isUpgradeSinonDivision,
			technologyLevel:data[1].toolTip.technologyLevel,
			technologyName:data[1].toolTip.technologyName,
			technologyNeedLevel:data[1].toolTip.technologyNeedLevel,
			technologyNeedTime:data[1].toolTip.technologyNeedTime,
			technologyNeedWealth:data[1].toolTip.technologyNeedWealth,
	};
	
	if(upQradeRemainTimeInterval != null){
		clearInterval(upQradeRemainTimeInterval);
		upQradeRemainCnt = 0;
		upQradeRemainTimeInterval = null;
		upQradeRemainTime =  "等待刷新！";
	}	
	
	if(upQradeRemainTimeInterval1 != null){
		clearInterval(upQradeRemainTimeInterval1);
		upQradeRemainCnt1 = 0;
		upQradeRemainTimeInterval1 = null;
		upQradeRemainTime1 =  "等待刷新！";
	}	
	
    if(typeof(data[0].time) != "undefined" && data[0].time > 0){
    	var tmpTime = data[0].time;
    	console.log("【远征驿时间】 =================== " + data[0].time);
    	if(upQradeRemainTimeInterval == null)
    		upQradeRemainTimeInterval = setInterval("upQradeRemainTimer(" + Number(tmpTime + 1000) + ")",1000);	
    }
    
    if(typeof(data[1].time) != "undefined" && data[1].time > 0){
    	var tmpTime = data[1].time;
    	console.log("【兴农司时间】 =================== " + data[1].time);
    	if(upQradeRemainTimeInterval1 == null)
    		upQradeRemainTimeInterval1 = setInterval("upQradeRemainTimer1(" + Number(tmpTime + 1000) + ")",1000);	
    }
	
    waiwuguan(getClickObjectIndex());
    unionSkill(getClickObjectIndex());
	changeMap('cityMenuLayer');
}


var upQradeRemainTime = "等待刷新！";
var upQradeRemainTimeInterval;
function doUpgradeAllianceTechnology(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	var tmpTime = data;
	console.log("【时间】 =================== " + data);
	if(upQradeRemainTimeInterval == null)
		upQradeRemainTimeInterval = setInterval("upQradeRemainTimer(" + Number(tmpTime + 1000) + ")",1000);	
	
    waiwuguan(getClickObjectIndex());
    unionSkill(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

var upQradeRemainCnt = 0;
function upQradeRemainTimer(initData){
	upQradeRemainCnt = upQradeRemainCnt + 1;
	upQradeRemainTime = changeTimeformat((initData/1000 - upQradeRemainCnt)*1000);
};

var upQradeRemainTime1 = "等待刷新！";
var upQradeRemainTimeInterval1;
function doUpgradeAllianceTechnology1(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	var tmpTime = data;
	console.log("【时间】 =================== " + data);
	if(upQradeRemainTimeInterval1 == null)
		upQradeRemainTimeInterval1 = setInterval("upQradeRemainTimer1(" + Number(tmpTime + 1000) + ")",1000);	
	
    waiwuguan(getClickObjectIndex());
    unionSkill(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

var upQradeRemainCnt1 = 0;
function upQradeRemainTimer1(initData){
	upQradeRemainCnt1 = upQradeRemainCnt1 + 1;
	upQradeRemainTime1 = changeTimeformat((initData/1000 - upQradeRemainCnt1)*1000);
};


var time;
function changeTimeformat(time)
{
			time = time  /1000;
			time = parseInt(time);
			var sT = '';
			var h = 0;
			var m = 0;
			var s = 0;
			while(time>=3600)
			{
				h++;
				time -= 3600;
			}
			while(time>=60)
			{
				m++;
				time -= 60;
			}
			s = time;
			h = checkTime(h);
			m = checkTime(m);
			s = checkTime(s);
			sT = h + ':' + m + ':' + s;
			return sT;
}
function checkTime(i)
{
	if (i<10){i="0" + i;}
	  	return i
}