var timeIntervalArray = new Array();
var initDataTime = new Array();
var updateTimeDate = new Array();
var junqingCnt = new Array();
junqingCnt[0] = 0;
junqingCnt[1] = 0;
var isJunqing = false;
var junqingCtr = true;
var junqingPage;
var junqingPages;
var junqingInfo = new Array();
var junqingInfoFinish = false;
var junqingPup = true;
var statusArray = new Array();
statusArray[0] = false;
statusArray[1] = false;
statusArray[2] = false;
statusArray[3] = false;
statusArray[4] = false;
var xiangqingCtr = false;
var junqingIdSend;
var jqSelectArray = new Array();
jqSelectArray[0] = true;
jqSelectArray[1] = false;
jqSelectArray[2] = false;
jqSelectArray[3] = false;
var pageType = [0,1,2,3];//页卡状态索引 0：所有军情 1：受到攻击 2：出征 3：支援
var timeSetInterval = new Array();
var battleQueueCnt = new Array();
var timeSetDate = new Array();
var doEnterBattleCtr = false;
var mine_wait;
var target_wait;
var mineImage;
var targetImage;
var mineDate;
var targetDate;
var battleQueueTimerStr = new Array();

var timeInterval0;
var timeInterval1;

var junqingFont = ["进入战斗","进入战区","加速","召回","详情"];
/*
 *  点击详情按钮
 */
var jqCharacterName;//军情中存储君主名
var jqFormationName;//军情中存储阵型名
var jqHeroList = new Array();//军情中查看详情时的返回信息列表
var jqStatus;
function doGetBattleHeros(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	jqCharacterName = data.characterName;
	jqFormationName = data.formationName;
	jqStatus = data.status;
	jqHeroList.splice(0, jqHeroList.length);
	for(var i =0; i<data.heroList.length; i++)
	{
		 var tempPath = data.heroList[i];
		 jqHeroList[i] = {
		 	heroLevel : tempPath.heroLevel,
		 	heroName : tempPath.heroName,
		 	heroType : tempPath.heroType,
		 	soldierAmount : tempPath.soldierAmount,
		 	soldierType : tempPath.soldierType
		 };		
	}
	xiangqingCtr = true;
	junqingXiangqing(getClickObjectIndex(),jq_Group,jq_Layer); 
	changeMap('cityMenuLayer');	
}
/*
 * 出征
 */
function doSelectBattleQueue(data)
{
	junqingInfoFinish = false;
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	junqingPage = data.page;
	junqingPages = data.pages;
	junqingInfo.splice(0,junqingInfo.length);
	for(var i = 0 ; i<data.battleJobQueueInfo.length; i++)
	{
		junqingInfo[i] = 
		{
			battleJobMessage : data.battleJobQueueInfo[i].battleJobMessage,
			battleJobQueueId : data.battleJobQueueInfo[i].id,
			battleType : data.battleJobQueueInfo[i].battleType,
			remainTime : data.battleJobQueueInfo[i].remainTime,
			status : data.battleJobQueueInfo[i].status,
			targetType : data.battleJobQueueInfo[i].targetType,
			meun : 
			{
			   operate1:data.battleJobQueueInfo[i].menu[0],
			   operate2:data.battleJobQueueInfo[i].menu[1],
			   operate3:data.battleJobQueueInfo[i].menu[2],
			   operate4:data.battleJobQueueInfo[i].menu[3],
			   operate5:data.battleJobQueueInfo[i].menu[4],
			}
		};
	}
	battleQueueTimerStr.splice(0,battleQueueTimerStr.length);
	for(var i = 0; i<timeIntervalArray.length; i++)
	{
		clearInterval(timeIntervalArray[i]);
	}
	for(var i = 0; i<junqingInfo.length;i++)
	{
		if(junqingInfo[i].remainTime > 0)
		{
			battleQueueCnt[i] = 0;
			initDataTime[i] = junqingInfo[i].remainTime;			
			timeIntervalArray[i] = setInterval("battleQueueTimer(" + initDataTime[i] +" ," +i+ ")",1000);
		}
		else
		{
		    initDataTime[i] = -1;
			battleQueueCnt[i] = -1;
			timeIntervalArray[i] = -1;
			battleQueueTimerStr[i] = "等待刷新";
		}
		
	}
	junqingInfoFinish = true;
}
/*
 *  召回
 */
function datacallBackBattleQueue(data)
{
	junqingInfoFinish = false;
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	junqingPage = data.page;
	junqingPages = data.pages;
	junqingInfo.splice(0,junqingInfo.length);
	for(var i = 0 ; i<data.battleJobQueueInfo.length; i++)
	{
		junqingInfo[i] = 
		{
			battleJobMessage : data.battleJobQueueInfo[i].battleJobMessage,
			battleJobQueueId : data.battleJobQueueInfo[i].id,
			battleType : data.battleJobQueueInfo[i].battleType,
			remainTime : data.battleJobQueueInfo[i].remainTime,
			status : data.battleJobQueueInfo[i].status,
			targetType : data.battleJobQueueInfo[i].targetType,
			meun : 
			{
			   operate1:data.battleJobQueueInfo[i].menu[0],
			   operate2:data.battleJobQueueInfo[i].menu[1],
			   operate3:data.battleJobQueueInfo[i].menu[2],
			   operate4:data.battleJobQueueInfo[i].menu[3],
			   operate5:data.battleJobQueueInfo[i].menu[4],
			}
		};
	}
	battleQueueTimerStr.splice(0,battleQueueTimerStr.length);
	for(var i = 0; i<timeIntervalArray.length; i++)
	{
		clearInterval(timeIntervalArray[i]);
	}
	for(var i = 0; i<junqingInfo.length;i++)
	{
		if(junqingInfo[i].remainTime > 0)
		{
			battleQueueCnt[i] = 0;
			initDataTime[i] = junqingInfo[i].remainTime;			
			timeIntervalArray[i] = setInterval("battleQueueTimer(" + initDataTime[i] +" ," +i+ ")",1000);
		}
		else
		{
		    initDataTime[i] = -1;
			battleQueueCnt[i] = -1;
			timeIntervalArray[i] = -1;
			battleQueueTimerStr[i] = "等待刷新";
		}
		
	}
	junqingInfoFinish = true;
}
var battlefieldUIArray = new Array();
var challengeActionArray = new Array();
var mybuffList = new Array();
var mydeBuffList = new Array();
var targetbuffList = new Array();
var targetdeBuffList = new Array();
function doEnterBattle(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
    
	targetDate = {
		agility : data.target.agility,
		intHeroForce :data.target.heroForce,
		heroName: data.target.heroName,
		intHp : data.target.hp,
		intHpMax : data.target.hpMax,
		level : data.target.level,
		location : data.target.location,
		mobility : data.target.mobility,
		intMp : data.target.mp,
		intMpMax : data.target.mpMax,
		physique : data.target.physique,
		strategy : data.target.strategy,
		waitAction : data.target.waitAction,
	};
	mineDate = {		
		agility : data.mine.agility,
		intHeroForce :data.mine.heroForce,
		heroName: data.mine.heroName,
		intHp : data.mine.hp,
		intHpMax : data.mine.hpMax,
		level : data.mine.level,
		location : data.mine.location,
		mobility : data.mine.mobility,
		intMp : data.mine.mp,
		intMpMax : data.mine.mpMax,
		physique : data.mine.physique,
		strategy : data.mine.strategy,
		waitAction : data.mine.waitAction,
	};
	//mine_wait = data.mine.heroActionForWait;
    //target_wait = data.target.heroActionForWait + "_" + targetDate.location;
    mineImage = data.mine.heroIcon;
    targetImage = data.target.smallHeroIcon;
    mine_wait = "HAFM_01_1_wait";
	target_wait = "HAFF_01_2_wait";
	for(var i = 0; i < data.mine.buffList.length; i++)
	{
		mybuffList[i] = {
			description:data.mine.buffList[i].description,//描述
			buffIcon:data.mine.buffList[i].buffIcon,//图标	
			buffAnomin:data.mine.buffList[i].buffAnomin,//特效
			remainRound:data.mine.buffList[i].remainRound ,//剩余回合
		};
	}
	for(var i = 0; i < data.mine.deBuffList.length; i++)
	{
		mydeBuffList[i] = {
			description:data.mine.deBuffList[i].description,//描述
			buffIcon:data.mine.deBuffList[i].buffIcon,//图标	
			buffAnomin:data.mine.deBuffList[i].buffAnomin,//特效
			remainRound:data.mine.deBuffList[i].remainRound ,//剩余回合
		};
	}
	for(var i = 0; i < data.target.buffList.length; i++)
	{
		targetbuffList[i] = {
			description:data.target.buffList[i].description,//描述
			buffIcon:data.target.buffList[i].buffIcon,//图标	
			buffAnomin:data.target.buffList[i].buffAnomin,//特效
			remainRound:data.target.buffList[i].remainRound ,//剩余回合
		};
	}
	for(var i = 0; i < data.target.deBuffList.length; i++)
	{
		targetdeBuffList[i] = {
			description:data.target.deBuffList[i].description,//描述
			buffIcon:data.target.deBuffList[i].buffIcon,//图标	
			buffAnomin:data.target.deBuffList[i].buffAnomin,//特效
			remainRound:data.target.deBuffList[i].remainRound ,//剩余回合
		};
	}
	warfareScene(getClickObjectIndex());
	changeMap('cityMenuLayer'); 
	
	if(gbox._isIndwellDiv("divWindowBg","input"))
	{
		document.body.removeChild(divWindowBg);
		divWindowBg = null;
 	}
}
function doselectBattleQueueDefault(data)
{
	junqingInfoFinish = false;
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	junqingPage = data.page;
	junqingPages = data.pages;
	junqingInfo.splice(0,junqingInfo.length);
	for(var i = 0 ; i<data.battleJobQueueInfo.length; i++)
	{
		junqingInfo[i] = 
		{
			battleJobMessage : data.battleJobQueueInfo[i].battleJobMessage,
			battleJobQueueId : data.battleJobQueueInfo[i].id,
			battleType : data.battleJobQueueInfo[i].battleType,
			remainTime : data.battleJobQueueInfo[i].remainTime,
			status : data.battleJobQueueInfo[i].status,
			targetType : data.battleJobQueueInfo[i].targetType,
			targetId : data.battleJobQueueInfo[i].targetId,
			meun : 
			{
			   operate1:data.battleJobQueueInfo[i].menu[0],
			   operate2:data.battleJobQueueInfo[i].menu[1],
			   operate3:data.battleJobQueueInfo[i].menu[2],
			   operate4:data.battleJobQueueInfo[i].menu[3],
			   operate5:data.battleJobQueueInfo[i].menu[4],
			}
		};
	}
	battleQueueTimerStr.splice(0,battleQueueTimerStr.length);
	for(var i = 0; i<timeIntervalArray.length; i++)
	{
		clearInterval(timeIntervalArray[i]);
	}
	for(var i = 0; i<junqingInfo.length;i++)
	{
	  
		if(junqingInfo[i].remainTime > 0)
		{
			battleQueueCnt[i] = 0;
			initDataTime[i] = junqingInfo[i].remainTime;
			timeIntervalArray[i] = setInterval("battleQueueTimer(" + initDataTime[i] +" ," +i+ ")",1000);
		}
		else
		{
		    initDataTime[i] = -1;
			battleQueueCnt[i] = -1;
			timeIntervalArray[i] = -1;
			battleQueueTimerStr[i] = "等待刷新";
		}
		
	}
	junqingInfoFinish = true;
}
function battleQueueTimer(initData,i){
	battleQueueCnt[i] = battleQueueCnt[i] + 1;
	battleQueueTimerStr[i] = changeTimeformat((initData - battleQueueCnt[i])*1000);
};
function getTime(time,i)
{
    timeSetDate[i] = getRemainTime(time);
    console.log(timeSetDate[i]);
}
var pageH = 103;
var jq_Group;
var jq_Layer;
var junqing = function(index,_group,_layer)
{
	jq_Group = _group;
	jq_Layer = _layer;
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJunqing = true;
	var bW = gbox.getImage('jq_zjm_01').width;
	var bH = gbox.getImage('jq_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 30;		    
	gbox.addObject(
			{ 
				id : 'junqing',
				group : 'levelMenu_2',
				tileset : 'jq_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					if(junqingCtr)
					{
						battle.selectBattleQueueDefault(doselectBattleQueueDefault);
						junqingCtr = false;	
					}
                   		
				},
				first : function() 
				{
					
				},
				myclick : function()
				{
					xiangqingCtr = false;
					junqingPup = false;
					if(lastTouchMoveX > 684 && lastTouchMoveX < 698 && lastTouchMoveY > 583 && lastTouchMoveY < 604)
					{
						for(var i =0 ;i<jqSelectArray.length; i++)
						{
							console.log("=============" + jqSelectArray[i]);
							if(jqSelectArray[i])
							{
								if(junqingPage >= 2)
							      battle.selectBattleQueue(junqingPage - 1,pageType[i],doSelectBattleQueue);
							    break;
							}
							
						}				
					}
					if(lastTouchMoveX > 752 && lastTouchMoveX < 767 && lastTouchMoveY > 583 && lastTouchMoveY < 604)
					{
						for(var i =0 ;i<jqSelectArray.length; i++)
						{
							if(jqSelectArray[i])
							{
								if(junqingPage < junqingPages)
							      battle.selectBattleQueue(junqingPage + 1,pageType[i],doSelectBattleQueue);
							    break;
							}
							
						}	
					}
					for(var i = 0;i < junqingInfo.length; i++ )
					{
						if(lastTouchMoveX > 1007 && lastTouchMoveX < 1075 && lastTouchMoveY > (193+i*27) && lastTouchMoveY < (215 + i*27))
						{
							junqingPup = true;
							for(var a = 0; a<statusArray.length;a++)
							{
								statusArray[a] = false;
							}	
						    statusArray[0] = junqingInfo[i].meun.operate1;
						    statusArray[1] = junqingInfo[i].meun.operate2;
						    statusArray[2] = junqingInfo[i].meun.operate3;
						    statusArray[3] = junqingInfo[i].meun.operate4;
						    statusArray[4] = junqingInfo[i].meun.operate5;
							junqingItem(getClickObjectIndex(),1056,203 + i*26,i,_group,_layer,index);
						    changeMap('cityMenuLayer');
						}
					}				
					 if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height))){
						displayDestroy();
						exit(index);
						curGroup = 'cityMenu';
					}else
					if(lastTouchMoveX > 339 && lastTouchMoveX < (339 + 27) && lastTouchMoveY > 194 && lastTouchMoveY < (194 + pageH)){
						battle.selectBattleQueue(1,pageType[0],doSelectBattleQueue);
						jqSelectArray[0] = true;
						jqSelectArray[1] = false;
						jqSelectArray[2] = false;
						jqSelectArray[3] = false;
	                }else
					if(lastTouchMoveX > 339 && lastTouchMoveX < (339 + 27) && lastTouchMoveY > (194 + pageH) && lastTouchMoveY < ((192 + pageH) + pageH)){
						battle.selectBattleQueue(1,pageType[1],doSelectBattleQueue);
						jqSelectArray[0] = false;
						jqSelectArray[1] = true;
						jqSelectArray[2] = false;
						jqSelectArray[3] = false;
	                }else
					if(lastTouchMoveX > 339 && lastTouchMoveX < (339 + 27) && lastTouchMoveY > ((192 + pageH) + pageH) && lastTouchMoveY < ((192 + pageH) + pageH) + pageH){
						battle.selectBattleQueue(1,pageType[2],doSelectBattleQueue);
						jqSelectArray[0] = false;
						jqSelectArray[1] = false;
						jqSelectArray[2] = true;
						jqSelectArray[3] = false;
	                }else
						if(lastTouchMoveX > 339 && lastTouchMoveX < (339 + 27) && lastTouchMoveY > (((192 + pageH) + pageH) + pageH) && lastTouchMoveY < (((192 + pageH) + pageH) + pageH) + pageH){
							battle.selectBattleQueue(1,pageType[3],doSelectBattleQueue);
							jqSelectArray[0] = false;
							jqSelectArray[1] = false;
							jqSelectArray[2] = false;
							jqSelectArray[3] = true;
		                }
					else{
						junqing(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);						
					}
				},
				blit : function()
				{					
					 if(isDrawUI[index] && isJunqing)
					 {
					 	gbox.drawImage('jq_zjm_01',backdropX,backdropY);
					 	gbox.drawImage('ty_an_27',backdropX,backdropY + 8);					  
					    gbox.drawImage('jq_zjm_02',(gbox.getImage('jq_zjm_01').width - gbox.getImage("jq_zjm_02").width)/2 + backdropX,backdropY);	
					 	for(var i=0; i<4; i++){
						 	if(jqSelectArray[i]){
						 		gbox.drawImage("jq_zjm_" + i,340,188 + (i*pageH));
						 	}					 		
					 	}
					     if(junqingInfoFinish)//绘制文字说明
					     {
					     	for(var i =0; i<junqingInfo.length;i++)
					     	{
					     		if(junqingInfo[i].remainTime > 0)
					     			{		 
					     				 if(typeof(battleQueueTimerStr[i]) == "undefined" || (battleQueueTimerStr[i] == "等待刷新"))
					     				 {
					     				 	gbox.drawText(junqingInfo[i].battleJobMessage + " " +"等待刷新", 388,198 + i*26,5);
					     				 }
					     				 else
					     				 {
					     				 	gbox.drawText(junqingInfo[i].battleJobMessage + " " + battleQueueTimerStr[i], 388,198 + i*26,5);
					     				 }
					     				 if(battleQueueTimerStr[i] == "00:00:00")
					     				 {
					     				 	clearInterval(timeIntervalArray[i]);
					     				 	junqingInfo[i].remainTime = 0;
					     				 	battleQueueTimerStr[i] = "等待刷新";
					     				 	timeIntervalArray[i] = -1;
					     				 	initDataTime[i] = -1;
			                                battleQueueCnt[i] = -1;
					     				 	battle.selectBattleQueueDefault(doselectBattleQueueDefault);
					     				 }
					     			}
					     			else
					     			{
					     				gbox.drawText(junqingInfo[i].battleJobMessage, 388,198 + i*26,5);
					     			}
					     		
					     		gbox.drawImage('ty_an_08',1010,191 + i*26);	
					     		var strW = gbox.getTextWidth("操作",14);
							    var strX = 1010 + (50 - strW)/2;
							    var strY = 191 + i*26 + (26 - 14)/2;
							    gbox.drawText("操作", strX, strY,10);
					     	}
					     } 
					     var strW = gbox.getTextWidth(junqingPage + "/" + junqingPages,14);
						 var cntX = 699 + (51 - strW)/2;
						 var cntY = 584 + (18 - 14)/2;   	
				         gbox.drawText(junqingPage + "/" + junqingPages,cntX,cntY,10);
				         if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						   }
						 gbox.drawImage("ty_an_25",687,585);
					     gbox.drawImage("ty_an_24",755,585);
					 }						
				}
			});

};
var timeTemp;
function changeTimeformat(timeTemp)
	{
				timeTemp = timeTemp  /1000;
				timeTemp = parseInt(timeTemp);
				var sT = '';
				var h = 0;
				var m = 0;
				var s = 0;
				while(timeTemp>=3600)
				{
					h++;
					timeTemp -= 3600;
				}
				while(timeTemp>=60)
				{
					m++;
					timeTemp -= 60;
				}
				s = timeTemp;
				h = checkTime(h);
				m = checkTime(m);
				s = checkTime(s);
				sT = h + ':' + m + ':' + s;
				return sT;
	};
function checkTime(i)
	{
		if (i<10){i="0" + i;}
		  	return i;
	};
// fightState 前往状态
var publi_junqingID = 0;
var detectStateId;//侦查ID
var junqingItem = function(index,tempx,tempy,junqingID,_group,_layer,superstratumIndex)
{
	publi_junqingID = junqingID;
	detectStateId = junqingID;
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'junqingItem',
		group : 'levelMenu_3',
		//tileset : 'junqingpup',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [tempx,tempy], [tempx + 62,tempy], [tempx + 62,tempy + 98],[tempx,tempy + 98]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			//console.log("ID ===" + junqingID);
			xiangqingCtr = false;
			for(var i = 0; i<5; i++)
			{
				if(lastTouchMoveX > tempx && lastTouchMoveX < (tempx + 62) && lastTouchMoveY > (tempy + i*20) && lastTouchMoveY < (tempy + (i+1)*20))
				{
					switch(i)
					{
						case 0:
						    if(statusArray[0])
						    {
						    	isManual = false;
						    	isWarfaceScene = true;
						    	junqingPup = false;
								console.log("进入战斗");
								startNotification = true;
								//warfareImageLoading(getClickObjectIndex());
	                            //changeMap('cityMenuLayer');
								junqingIdSend = junqingInfo[junqingID].battleJobQueueId;			
								
								if(junqingInfo[junqingID].battleType == 0)//讨伐
								{
									displayDestroy();
						            exit(superstratumIndex);
						            curGroup = 'cityMenu';
								    loadingImageList['BattleCrusade'].load(
				        			getClickObjectIndex(),
				        			function(){
										Battle_UniversalLoadImage();										
										Battle_CrusadeLoadImage();
				            		},
				            		function(){
										multiBattle.battleJobQueueId = junqingInfo[junqingID].battleJobQueueId;
									    multiBattle.getMultiBattleInfo(battlefield.model.doGetMultiBattleInfo);
				            		},
		                            true
				        	        );		
									
								}
								else//单挑
								{
								    displayDestroy();
						            exit(superstratumIndex);
						            curGroup = 'cityMenu';
								    loadingImageList['BattleSingled'].load(
				        			getClickObjectIndex(),
				        			function(){
										Battle_UniversalLoadImage();										
										BattlesingledLoadImage();
				            		},
				            		function(){
										singleBattle.enterBattle(junqingInfo[junqingID].battleJobQueueId,doEnterBattle);
				            		},
		                            true
				        	        );									
								}
						    }

							break;
						case 1:
						
						    if(statusArray[1])
						    {
						    	displayDestroy();
						        exit(superstratumIndex);
							    loadingImageList['Suburbs'].load(
								getClickObjectIndex(),
			     				SuburbsLoadImage,
			     				function(){
			     					junqingPup = false;
				                    displayDestroy();
							        exit(index);
									console.log("进入战区");
									cityChangeView[0] = false;
				                    cityChangeView[1] = true;
				                    cityChangeView[2] = false;
				                    EnvironsScreenBattleClass.handlers.goIntoEnvironsScreenBattle(junqingInfo[junqingID].targetId);
			     				}
		     		);
						    	
								//suburb.openSuburbUi(function(data){doGetUserFieldInfo(data,junqingInfo[junqingID].targetId);});	
						    }
						    
							break;
						case 2:
						    if(statusArray[2])
						    {
						    	junqingPup = false;
			                    exit(getClickObjectIndex());
								console.log("加速");
								junqing(getClickObjectIndex(),_group,_layer);
								systemSpeedup(index,"行军加速");
								changeMap(_layer);
						    }
						    	
							break;
						case 3:
						    if(statusArray[3])
						    {    	
						    	battle.callBackBattleQueue(junqingInfo[junqingID].battleJobQueueId,1,0,datacallBackBattleQueue);
						    	junqingPup = false;
			                    exit(getClickObjectIndex());
								console.log("召回");
//								junqing(getClickObjectIndex(),_group,_layer); 
//								changeMap(_layer);
						    }
						    
							break;
						case 4:
						   if(statusArray[4])
						    {
						    	junqingPup = false;
			                    exit(getClickObjectIndex());
								console.log("详情");
								battle.getBattleHeros(junqingInfo[junqingID].battleJobQueueId,0,doGetBattleHeros);
								
						    }
						    
							break;
						
					}
					isBattleFinish = false;
					jq_message = false;
					jq_cnt = 0;	
				};
			};

		},
		blit : function()
		{
			if(isDrawUI[index] && junqingPup)
			{
					for(var i=0; i<5; i++)
					{
						if(statusArray[i])
						  gbox.drawImage('ty_an_95',tempx, tempy + gbox.getImage("ty_an_95").height*i);
						else
						  gbox.drawImage('ty_an_97',tempx, tempy + gbox.getImage("ty_an_97").height*i);
						if(((tempx < touchMoveX) && (touchMoveX < tempx + 62)) && ((tempy + gbox.getImage("ty_an_95").height*i < touchMoveY) && (touchMoveY < (tempy + gbox.getImage("ty_an_95").height*i + gbox.getImage("ty_an_95").height))))
						{
							if(statusArray[i])
							 gbox.drawImage('ty_an_96',tempx, tempy + gbox.getImage("ty_an_95").height*i);
						}
						var fontW = gbox.getTextWidth(junqingFont[i],10);
					 	var dx = tempx + (62 - fontW)/2;
						var dy = tempy + gbox.getImage("ty_an_95").height*i + (20 - 10)/2;
 						gbox.drawDanceString(junqingFont[i], dx, dy,10,'#000000','#FFFFFF');
 						
					}	
//				    if(statusArray[0])
//				    {
//				    	gbox.blitTile(gbox.getBufferContext(),
//									{
//										tileset : 'jinruzhandou',
//										tile : 0,
//										dx : tempx,
//										dy : tempy,
//										fliph : this.fliph,
//										flipv : this.flipv,
//										camera : this.camera,
//										alpha : 1.0
//						            });
//				    }
//				    if(statusArray[1])
//				    {
//				    	gbox.blitTile(gbox.getBufferContext(),
//									{
//										tileset : 'jinruzhanqu',
//										tile : 0,
//										dx : tempx,
//										dy : tempy + 20,
//										fliph : this.fliph,
//										flipv : this.flipv,
//										camera : this.camera,
//										alpha : 1.0
//						            });
//				    }
//				    if(statusArray[2])
//				    {
//				    	gbox.blitTile(gbox.getBufferContext(),
//									{
//										tileset : 'jiasu',
//										tile : 0,
//										dx : tempx,
//										dy : tempy + 40,
//										fliph : this.fliph,
//										flipv : this.flipv,
//										camera : this.camera,
//										alpha : 1.0
//						            });
//				    }		
//				    if(statusArray[3])
//				    {
//				    	gbox.blitTile(gbox.getBufferContext(),
//									{
//										tileset : 'zhaohui',
//										tile : 0,
//										dx : tempx,
//										dy : tempy + 59,
//										fliph : this.fliph,
//										flipv : this.flipv,
//										camera : this.camera,
//										alpha : 1.0
//						            });
//				    }				
//				    if(statusArray[4])
//				    {
//				    	gbox.blitTile(gbox.getBufferContext(),
//									{
//										tileset : 'xiangqing',
//										tile : 0,
//										dx : tempx,
//										dy : tempy + 78,
//										fliph : this.fliph,
//										flipv : this.flipv,
//										camera : this.camera,
//										alpha : 1.0
//						            });
//				    }		
			}
		}		
	 });

};
var junqingXiangqing = function(index,_group,_layer)
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	xiangqingCtr = true;
	var bW = gbox.getImage('jq_zjm_29').width;
	var bH = gbox.getImage('jq_zjm_29').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 30;		    
	gbox.addObject(
	{ 
		id : 'xiangqing',
		group : 'levelMenu_4',
		tileset : 'jq_zjm_29',
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
			if(jqStatus == 1)
			{
				if(lastTouchMoveX > 759 && lastTouchMoveX < 811 && lastTouchMoveY > 464 && lastTouchMoveY < 490)
				{
					battle.getBattleHeros(junqingInfo[detectStateId].battleJobQueueId,1,doGetBattleHeros);
				}
			}
			if(lastTouchMoveX > 814 && lastTouchMoveX < 864 && lastTouchMoveY > 464 && lastTouchMoveY < 490)
			{
						exit(index);
						
						junqing(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);		
			}
			else{
						
						junqingXiangqing(getClickObjectIndex(),_group,_layer);
		                changeMap(_layer);				
			}   
		},
		blit : function()
		{
			if(isDrawUI[index] && xiangqingCtr)
			{
				   gbox.drawImage('jq_zjm_29',backdropX,backdropY);
				   if(jqStatus == 0)
				   {				  
				   	  gbox.drawString(jqCharacterName,614,273,"#ffffff",14);
				   	  gbox.drawString(jqFormationName,776,273,"#ffffff",14);
				   	  for(var i =0 ; i<jqHeroList.length; i++)
				   	  {
				   	  	 var fontW = gbox.getTextWidth(jqHeroList[i].heroName,14);
				   	  	 var dx = 568 + (89 - fontW)/2;
					 	 var dy = 315 + (23 - 14)/2;
				   	  	 gbox.drawString(jqHeroList[i].heroName,dx,dy + 25*i,"#ffffff",14);
				   	  	 var fontW = gbox.getTextWidth(jqHeroList[i].heroLevel,14);
				   	  	 var dx = 661 + (43 - fontW)/2;
					 	 var dy = 315 + (23 - 14)/2;
				   	  	 gbox.drawString(jqHeroList[i].heroLevel,dx,dy + 25*i ,"#ffffff",14);
				   	  	 if(jqHeroList[i].soldierType == "")
				   	  	 {
				   	  	 	 var fontW = gbox.getTextWidth("无",14);
					   	  	 var dx = 706 + (85 - fontW)/2;
						 	 var dy = 315 + (23 - 14)/2;
					   	  	 gbox.drawString("无",dx,dy,"#ffffff",14);
				   	  	 }
				   	  	 else
				   	  	 {
				   	  	 	 var fontW = gbox.getTextWidth(jqHeroList[i].soldierType,14);
					   	  	 var dx = 706 + (85 - fontW)/2;
						 	 var dy = 315 + (23 - 14)/2;
					   	  	 gbox.drawString(jqHeroList[i].soldierType,dx,dy + 25*i,"#ffffff",14);
				   	  	 }
				   	  	 var fontW = gbox.getTextWidth(jqHeroList[i].soldierAmount,14);
					   	 var dx = 794 + (75 - fontW)/2;
						 var dy = 315 + (26 - 14)/2;
					   	 gbox.drawString(jqHeroList[i].soldierAmount,dx,dy + 25*i,"#ffffff",14);
				   	  	 gbox.drawImage("ty_an_08",816,466);
				   	  	 if(((816 < touchMoveX) && (touchMoveX < 816 + gbox.getImage("ty_an_08").width)) && ((466 < touchMoveY) && (touchMoveY < 466+gbox.getImage("ty_an_08").height)))
				   	  	 {
				   	  	 	gbox.drawImage("ty_an_06",816,466);
				   	  	 }
				   	  	 var fontW = gbox.getTextWidth("返回",14);
					   	 var dx = 816 + (50 - fontW)/2;
						 var dy = 466 + (26 - 14)/2;
					   	 gbox.drawDanceString("返回",dx,dy,14,'#000000','#ffffff');
				   	  }
				   	  
				   }
				   else
				   {
				   	     gbox.drawString(jqCharacterName,614,273,"#ffffff",14);
				   	     gbox.drawString(jqFormationName,776,273,"#ffffff",14);
				   	     for(var i =0 ; i<5; i++)
				   	      {
				   	      	 var fontW = gbox.getTextWidth("???",14);
					   	  	 var dx = 568 + (89 - fontW)/2;
						 	 var dy = 315 + (23 - 14)/2;
					   	  	 gbox.drawString("???",dx,dy + 25*i,"#ffffff",14);
				   	      }
				   	     gbox.drawImage("ty_an_08",816,466);
				   	  	 if(((816 < touchMoveX) && (touchMoveX < 816 + gbox.getImage("ty_an_08").width)) && ((466 < touchMoveY) && (touchMoveY < 466+gbox.getImage("ty_an_08").height)))
				   	  	 {
				   	  	 	gbox.drawImage("ty_an_06",816,466);
				   	  	 }
				   	     var fontW = gbox.getTextWidth("返回",14);
					   	 var dx = 816 + (50 - fontW)/2;
						 var dy = 466 + (26 - 14)/2;
					   	 gbox.drawDanceString("返回",dx,dy,14,'#000000','#ffffff');
					   	 gbox.drawImage("ty_an_08",760,466);
				   	  	 if(((760 < touchMoveX) && (touchMoveX < 760 + gbox.getImage("ty_an_08").width)) && ((466 < touchMoveY) && (touchMoveY < 466+gbox.getImage("ty_an_08").height)))
				   	  	 {
				   	  	 	gbox.drawImage("ty_an_06",760,466);
				   	  	 }
					   	 var fontW = gbox.getTextWidth("侦查",14);
					   	 var dx = 760 + (50 - fontW)/2;
						 var dy = 466 + (26 - 14)/2;
					   	 gbox.drawDanceString("侦查",dx,dy,14,'#000000','#ffffff');
				   }
			}
		}		
	 });

}


