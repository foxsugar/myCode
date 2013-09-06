var curBuildIndex = 1;
var buildLevel = 0;
var buildState = 0;
var id = 0 ;
var buildIndex = 0;
var buildDescIndex = 2;
var jiaGong = true;
var drawFood = false;
var envBtnCtr = false;
var startX = 0;
var startY = 0;
var farmerAni_desNode = [[385,80],[686,232]];
var liyuanbaAni_desNode = [[292,55],[725,265],[356,445]];
var hashtableTest = new Hashtable();
var showChat = new Array();
showChat[0] = true;
var chatIndex = 0;
var group_src = 'cityMenu';
var bubingAni_desNode = [
	[920,70],[1260,255]];

var girl_desNode = [
    [720,315],[390,480]];

var bubingAni1_desNode = [
	[130,540],[190,580]
];

var shinvAni_desNode = [
	[915,353],[1124,466]
];
var cellX = 200;
var cellY = 100;
var farmerAni = new roleClass();
var liyuanbaAni = new roleClass();
var bubingAni = new roleClass();
var bubingAni1 = new roleClass();
var shinvAni = new roleClass();
var girlAni = new roleClass();
var resourseArray = new Array();
var buildingArray = new Array();
var allianceData;
var moneyUnion;
var ironoreField = new Array();
var foodFieldArray = new Array();
var stoneFieldArray = new Array();
var woodFieldArray = new Array();
var envirousXoffset = 289;
var envirousYoffset = 327;
var food_Id = 0;
var wood_Id = 0;
var ferrum_Id = 0;
var stone_Id = 0;
var grow_Type = 0;


var needPeople;
var needTime;
var addResource;
var planInfo = new Array();
var growChoiceType;
var growChoiceId;
var getBuildingTreeArray = new Array;
var techPoint;//科教馆技能点数
var userInteriorEffects = new Array();//科教馆内政百分比
var userInteriors = new Array();//科技馆内政对象数组
var learnSkillInterval = null;
var learnSkillCnt = 0;
var learnSkillTime = "等待刷新！";
var learnSkillremainTime = "";
/*
 *  社交初始化回调 
 */
var getFriendsDefaultArray = new Array();
var getFriendsDefaultPage = 1;
var getFriendsDefaultPages = 1;
var friendCnt = 0;
function datagetFriendsDefault(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	getFriendsDefaultPage = data.page;
	getFriendsDefaultPages = data.pages;
	getFriendsDefaultArray.splice(0,getFriendsDefaultArray.length);
	if(data.friends.length > 0)
	{
		
		for(var i =0; i<data.friends.length; i++)
		{
			getFriendsDefaultArray[i] = {
				friendId : data.friends[i].friendId,//君主ID
				friendCountry : data.friends[i].friendCountry,//国家名称
				friendLeague : data.friends[i].friendLeague,//联盟
				friendLevel : data.friends[i].friendLevel,//等级
				friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
				friendName : data.friends[i].friendName,//君主名称
				id : data.friends[i].id,//id
				lineTime : data.friends[i].lineTime,//路程
				loginStatus : data.friends[i].loginStatus,//上线状态
				selected : data.friends[i].selected,//搜索ID
				color: "#000000"
			};
		}	
	 }
	socialMessageAlertCtr = false;
	queryUnionAlertCtr = false;
	social(getClickObjectIndex(),com_group,com_layer);
	changeMap(com_layer);
}
function dataGetUserInteriorForView(data)//进入科教馆回调
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	techPoint = data.techPoint;
	if(data.studyingTech!=null)
	{
		if(learnSkillInterval != null)
		{
			clearInterval(learnSkillInterval);
			learnSkillCnt = 0;
			learnSkillInterval =  null;
		}	
		var tmpTime = data.studyingTech.remainTime;
		techNameLevel = data.studyingTech.techName;
		if(learnSkillInterval == null)
		{
			learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);	
		}
		   
	}
	else
	{
		//if(learnSkillInterval != null)
		{
			clearInterval(learnSkillInterval);
			learnSkillCnt = 0;
			learnSkillInterval = null;
			learnSkillremainTime = null;
		}	
	}
	for(var i = 0; i<data.userInteriorEffects.length; i++)
	{
		userInteriorEffects[i] = data.userInteriorEffects[i];
	}
	for(var i =0; i<data.userInteriors.length; i++)
	{
		switch(data.userInteriors[i].techStatus)
		{
			case 0:
			  userInteriors[i] = {
			  	       techStatus:data.userInteriors[i].techStatus,//科技状态
			  	       needLevel:data.userInteriors[i].needLevel,//开启条件描述信息
			  	       techName:data.userInteriors[i].techName,//科技名称
			  	       techIcon : data.userInteriors[i].techIcon //图片资源
			  };
			  break;
			case 1:
			  userInteriors[i] = {
			  	       nextEffect:data.userInteriors[i].nextEffect,//下一级效果描述
			  	       techStatus:data.userInteriors[i].techStatus,//科技状态类型
			  	       techIcon : data.userInteriors[i].techIcon, //图片资源
			  	       needTime:data.userInteriors[i].needTime,//需求时间描述
			  	       techType:data.userInteriors[i].techType,//科技类型
			  	       currentEffect:data.userInteriors[i].currentEffect,//当前效果描述
			  	       techLevel:data.userInteriors[i].techLevel,//科技等级
			  	       techName:data.userInteriors[i].techName,//科技名称
			  	       tooltip:{
			  	       	  name : data.userInteriors[i].techName,
			  	       	  type : data.userInteriors[i].techType,
			  	       	  level : data.userInteriors[i].techLevel,
			  	       	  effect : data.userInteriors[i].currentEffect,
			  	       	  needTime : data.userInteriors[i].needTime,
			  	       	  nextEffect : data.userInteriors[i].nextEffect
			  	       }
			  };
			  break;
			case 2:
			  userInteriors[i] = {
			  	       nextEffect:data.userInteriors[i].nextEffect,//下一级效果描述
			  	       techStatus:data.userInteriors[i].techStatus,//科技状态类型
			  	       techIcon : data.userInteriors[i].techIcon, //图片资源
			  	       needTime:data.userInteriors[i].needTime,//需求时间描述
			  	       techType:data.userInteriors[i].techType,//科技类型
			  	       currentEffect:data.userInteriors[i].currentEffect,//当前效果描述
			  	       techLevel:data.userInteriors[i].techLevel,//科技等级
			  	       techName:data.userInteriors[i].techName,//科技名称
			  	       tooltip:{
			  	       	  name : data.userInteriors[i].techName,
			  	       	  type : data.userInteriors[i].techType,
			  	       	  level : data.userInteriors[i].techLevel,
			  	       	  effect : data.userInteriors[i].currentEffect,
			  	       	  needTime : data.userInteriors[i].needTime,
			  	       	  nextEffect : data.userInteriors[i].nextEffect
			  	       }
			  };
			  break;
		    case 3:
			  userInteriors[i] = {
			  	       message:data.userInteriors[i].message,//显示该科技已达到最高级的信息
			  	       techStatus:data.userInteriors[i].techStatus,//科技状态类型
			  	       techType:data.userInteriors[i].techType,//科技类型
			  	       currentEffect:data.userInteriors[i].currentEffect,//当前效果影响
			  	       techLevel:data.userInteriors[i].techLevel,//科技等级
			  	       techName:data.userInteriors[i].techName,//科技名称
			  	       techIcon : data.userInteriors[i].techIcon, //图片资源
			  	       tooltip:{
			  	       	  name : data.userInteriors[i].techName,
			  	       	  type : data.userInteriors[i].techType,
			  	       	  level : data.userInteriors[i].techLevel,
			  	       	  effect : data.userInteriors[i].currentEffect,
			  	       	  nextEffect : data.userInteriors[i].message
			  	       }
			  };
			  break;
		}
	}
	soldiersPage = false;
	homeAffairsPage = true;
	formationPage = false;				     
	kejiaoguan(getClickObjectIndex());
	kejiaoguanList(getClickObjectIndex());
	changeMap('cityMenuLayer');
}
function doGetBuildingTree(data)//建造数回调函数
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	for(var i = 0; i<data.length; i++)
	{
		switch(data[i].image)
		{
			case 'mj':
			 getBuildingTreeArray[0] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		   case 'js':
			 getBuildingTreeArray[1] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		   case 'by':
			 getBuildingTreeArray[2] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		   case 'gk':
			 getBuildingTreeArray[3] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		  case 'wwg':
			 getBuildingTreeArray[4] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		  case 'kjg':
			 getBuildingTreeArray[5] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		   case 'jg':
			 getBuildingTreeArray[6] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		  case 'jxg':
			 getBuildingTreeArray[7] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		  case 'jf':
			 getBuildingTreeArray[8] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		 case 'jjc':
			 getBuildingTreeArray[9] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		  case 'lbc':
			 getBuildingTreeArray[10] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		 case 'dj':
			 getBuildingTreeArray[11] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		  case 'jgf':
			 getBuildingTreeArray[12] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		 case 'tys':
			 getBuildingTreeArray[13] = {
                 buildingName : data[i].buildingName,
                 buildingNo : data[i].buildingNo,
                 desc : data[i].desc,
                 isCanBuild : data[i].isCanBuild,
                 isFull : data[i].isFull,
			 };
			 break;
		}
		
	}
	hoursebuilding(getClickObjectIndex());
	changeMap('cityMenuLayer');		
}


function doPlantResource(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	planInfo = new Array();
	for(var i=0; i<data.length; i++){
		planInfo[i] =  {needPeople:data[i].needPeople,
				        needTime:data[i].needTime,
				        addResource:data[i].addResource
		};
	}
}

//function doCharacterResource(data)
//{
//	resourseArray[0] = data.money;
//	resourseArray[1] = data.food;
//	resourseArray[2] = data.wood;
//	resourseArray[3] = data.stone;
//	resourseArray[4] = data.bronze;
//	resourseArray[5] = data.cash;
//	resourseArray[6] = data.ticket;
//}
var buildingListCtr = false;
var buildingListCnt = new Array();
var buildingListTime = new Array();
var IntervalbuildingListArray = new Array();
var buildingListTimerStr = new Array();
function doBuildingList(data)
{
	//console.log("aaaaaaaaaaaaaaaaaaaaa");
    buildingListCtr = false;
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	//清空历史数据
    buildingArray.splice(0,buildingArray.length);
    buildingListTimerStr.splice(0, buildingListTimerStr.length);
    
	for(var a = 0 ; a < data.length; a++)
	{
		buildingArray[a] = {
				                location:data[a].location,
								buildingName:data[a].name,
					            curLevel:data[a].srclevel,
					            tarLevel:data[a].destlevel,
					            status:data[a].status,
					            time:data[a].time,
		                     };
	}
	
	for(var i=0; i<IntervalbuildingListArray.length; i++)
		clearInterval(IntervalbuildingListArray[i]);
	
	for(var i = 0; i<buildingArray.length;i++)
	{
	    console.log("time == " + buildingArray[i].time);
		if(buildingArray[i].time > 0)
		{
			
			buildingListCnt[i] = -1;
			buildingListTime[i] = buildingArray[i].time;
			buildingListTimerStr[i] = changeTimeformat(Math.ceil(buildingListTime[i]/1000)*1000);
			IntervalbuildingListArray[i] = setInterval("buildingListQueueTimer(" + Math.ceil(buildingListTime[i]/1000) +" ," +i+ ")",1000);
			
		}
		else
		{
		    buildingListTime[i] = -1;
			buildingListCnt[i] = -1;
			IntervalbuildingListArray[i] = -1;
			buildingListTimerStr[i] = "等待刷新";
		}
		
	}
	buildingListCtr = true;
}
function buildingListQueueTimer(initData,i){
	buildingListCnt[i] = buildingListCnt[i] + 1;
	buildingListTimerStr[i] = changeTimeformat((initData - buildingListCnt[i])*1000);
};
function addDivWindowBg(x,y){

	var bg=document.createElement("div");
	bg.style.display="block";
	bg.style.position = 'absolute';
	bg.style.width="0px";
	bg.style.height="0px";
	bg.style.top= y;
	bg.style.left=x;
	bg.style.textAlign="TOP";
	bg.style.verticalAlign="TOP";
	//bg.style.backgroundRepeat="no-repeat";
	bg.style.backgroundColor='#FFFF00';
	bg.style.backgroundPosition = "0px 0px";
	return bg;
}
var buildPoly;
function buildDesc( index )
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2']);	
	gbox.addObject(
			{ 
				id : 'desc' + index,
				group : 'level_2',
				tileset : 'cjt_' + epoch,
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{
				},
				first : function() 
				{		  
				},
				myclick : function()
				{
				},
				blit : function()
				{
					if(curGroup == 'cityMenu' && !isHoursebuilding)
				    {
						buildPoly = [ [buildList[index][2],buildList[index][3]],[buildList[index][4],buildList[index][5]], [buildList[index][6],buildList[index][7]],[buildList[index][8],buildList[index][9]]];
						if(typeof(buildings[index]) != "undefined"){
				        	if(gbox._mouseArea(buildPoly,touchMoveX,touchMoveY)){
//				        		console.log("buildings["+index+"] ==== " + buildings[index]);
								 if(typeof(buildings[index]) != 'undefined'/* && !demolition_upgrade[index] && !cancel_speed[index]*/)
								 {
										var tempOffset = 15;
										var tempH = tooltip.computBuilding(gbox.getBufferContext(),buildings[index].view).height;
	                                    var tempW = tooltip.width;
	                                    var mouseX = 0;
	                                    var mouseY = 0;
	                                    
	                					var offsetHeigth = 0;
	                					if(document.body.clientHeight > gbox.getScreenH())
	                					{
	                					    offsetHeigth = document.body.clientHeight - gbox.getScreenH();
	                					} 
	                					else
	                					{
	                					  	offsetHeigth = 0;
	                					}
	                                    var curScreenH = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
	                                        
	                                        
	    								if((touchMoveY + tempH) > (curScreenH))	
	    								{
	    									mouseY = curScreenH - tempH - 20;
	    								}
	    								else
	    								{
	    									mouseY = touchMoveY;
	    								}
										if((gbox.getScreenW() - touchMoveX) < tempW)	
										{
											mouseX = gbox.getScreenW() - tempW - 40;
										}
										else
										{
											mouseX = touchMoveX;
										}
										
										if(touchMoveX !=0)
										{
											tooltip.drawBuilding(gbox.getImage("toolTip"),gbox.getBufferContext(),mouseX + tempOffset,mouseY + tempOffset,buildings[index]); 
										}
											
								 }						    
				        	}
				        }else{
				        	
				        	if(gbox._mouseArea(buildPoly,touchMoveX,touchMoveY))	
				        	{
				        		tooltip.drawLineDesc(gbox.getBufferContext(),touchMoveX,touchMoveY,"建筑建造地块!");
				        	}
				        		
				        }	
				    }
	       
				}
			});
}

function buildCue( index )
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
		
	gbox.addObject(
			{ 
				id : 'cue' + index,
				group : 'level_1',
				tileset : 'cjt_' + epoch,
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{
				},
				first : function() 
				{		  
				},
				myclick : function()
				{
				},
				blit : function()
				{
					if(typeof(buildName) != "undefined" && 
							   typeof(build_Level) != "undefined" &&
							   typeof(buildName[index]) != "undefined" && 
							   typeof(build_Level[index]) != "undefined"){
		                    //绘制建筑名字也等级
						    drawBuildTitle('' + buuldType[index],""+buildName[index],""+build_Level[index],buildList[index][8],buildList[index][3]);		
					}
					
					if(index == buildList.length-1)
					{
						for(var i=1; i<28; i++)
						{
							if(typeof(buildUpAni[i]) != 'undefined')
							{
								buildUpAni[i].draw();
							}
						}
					}
						
				}
			});
}

var drawBuildTitle = function(bImg,bn,bl,bx,by){
    var strLen = gbox.getTextWidth(bn,8);
    var rectLen = strLen + 10;
    var timeX = 0;
    var timeY = by - 35;	
    
    if(bImg != null){
    	timeX = bx + (gbox.getImage('' + bImg).width - strLen)/2;
    }else
    	timeX = bx;

    
    //var data = {x:timeX,y:timeY,w:rectLen,h:22,globalAlpha:0.6,color:'#000000'};
    //gbox.blitRect(gbox.getBufferContext(),data);
    if(bn.length == 2)
    {
    	 gbox.drawImage("ty_an_134",timeX,timeY);
         gbox.drawImage("ty_tdt_12",timeX + rectLen,timeY);
//         gbox.drawString(bn,timeX + 5,timeY + 5,"#FFFFFF",13);
         gbox.drawText(bn,timeX + 5,timeY + 5,10);
    }
    else
    {
    	gbox.drawImage("ty_an_135",timeX,timeY);
        gbox.drawImage("ty_tdt_12",timeX + rectLen,timeY);
//        gbox.drawString(bn,timeX + 5,timeY + 5,"#FFFFFF",13);
        gbox.drawText(bn,timeX + 5,timeY + 5,10);
    } 
    var titleX = timeX - gbox.getImage('ty_tdt_11').width;
    var titleY = timeY;
    gbox.drawImage("ty_tdt_11",titleX,titleY);
    var levelLen = gbox.getTextWidth(""+bl,13);
    var levelX = titleX + (gbox.getImage('ty_tdt_11').width - levelLen)/2;
    var tmpX = levelX;
    if(bl > 9){
    	tmpX = levelX - 2;
    }
//    gbox.drawString(""+bl,tmpX,titleY + (gbox.getImage('ty_tdt_11').height - 16)/2 + 1,"#FFFFFF",12);
    gbox.drawText(bl,tmpX,titleY + (gbox.getImage('ty_tdt_11').height - 16)/2 + 1,10);
}


var drawMap = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	
            gbox.addObject(
			{ 
				id : 'big_map',
				group : 'levelMenu_1',
				tileset : 'bigmap',
				x : 0,
				y : 0,
				frame : 0,
				
				poly : [ [0,0], [791,0], [791,518],[0,518]],
				initialize : function()
				{
					
				},
				first : function() 
				{
					
				},
				myclick : function()
				{
					drawMap(index);
					changeMap('cityMenuLayer');
					
				},
				blit : function()
				{
					if(isDrawUI[index]){
						
					}

				}
			});
}

function addCityBg()
{
	
	gbox.addObject(
			{ 
				id : 'bg',//主城背景 
				group : 'cityMenu',
				tileset : 'cjt_' + epoch,
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{
                     $(".chatDiv").show();
					 for(var i = 0; i<24; i++)
					 {
					 	drawArcArray[i] = false;
					 	//secNum[i] = 0;
					 }
					 //console.log("====>>" + gbox.imageIsLoaded("testLoading"));
                    
				},
				first : function() 
				{		  
				},
				myclick : function()
				{
					
				},
				blit : function()
				{
					gbox.blitFade(gbox.getBufferContext(),
								{
									alpha : 1
								});// 清屏
					
					gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'cjt_' + epoch,
									tile : 0,
									dx : this.x,
									dy : this.y,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					  });
				}
			});
}	

function addCityTitle(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	   	   gbox.addObject(
			{ 
				id : 'title' + index,//地块索引 
				group : 'cityMenu',
				tileset : 'cjt_' + epoch,
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [buildList[index][2],buildList[index][3]],[buildList[index][4],buildList[index][5]], [buildList[index][6],buildList[index][7]],[buildList[index][8],buildList[index][9]]],
				initialize : function()
				{	
				},
				first : function() 
				{
					
				},
				myclick : function() 
				{
                    for(var i=0; i<28; i++){
                   	 var lotPoly = [ [buildList[i][2],buildList[i][3]],[buildList[i][4],buildList[i][5]], [buildList[i][6],buildList[i][7]],[buildList[i][8],buildList[i][9]]];
                   	 if(gbox._mouseArea(lotPoly,lastTouchMoveX,lastTouchMoveY)){
                   		lotIndex = i;
                   	 }
                    }
					
					curBuildIndex = index;
					if(buildList[index][0] == 'build_empty' && 
					   buildList[index][1] == 'state_empty'&& 
					   buildList[index][13] == 'state_demolition_empty'){
						    Building.getBuildingTree(doGetBuildingTree);
					}else{
						isHoursebuilding = false;
						if(index == 27){
							var lx = (buildList[index][8] + ((394 - 200)/2));
							var ly = buildList[index][3];
							if(buildList[index][0] == 'build_src'){
								if(buildList[index][1] == 'state_empty'){
									demolition_upgrade_Menu(lx,ly,index);	
								}else if(buildList[index][1] == 'state_upgrade_start'){
									cancel_speed_Menu(lx,ly,index);
								}
							}else if(buildList[index][13] == 'state_demolition_start'){
								cancel_speed_Menu(lx,ly,index);
							}						
						}else{
							var lx = (buildList[index][8] + ((156 - 200)/2));
						    var ly = buildList[index][3];
						    cancel_speed_Menu(lx,ly,index);
						}						
						changeMap('cityMenuLayer');
					}
				},
				blit : function()
				{
					if(buildList[index][0] == 'build_empty')
					{
						if(index != 27){
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'kd_' + epoch,
								tile : 0,
								dx :buildList[index][8],
								dy :buildList[index][3] - titleMapOffset,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
							 });						
						}	
					}
					if(index == 27){
						if(typeof(buuldType[index]) != "undefined")
							gbox.blitTile(gbox.getBufferContext(),
							{
										tileset : 'twf_' + epoch,
										tile : 0,
										dx :buildList[index][8] - 31,
										dy :buildList[index][3] - 85,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
							});							
					}
		             drawLightArea(this,index,buildList[index][8],buildList[index][3] - titleMapOffset);
					    		if(buildList[index][0] == 'build_start'){
					    			//Ani
	                               buildArray[index].drawBuildAin();

							 		var timeX = buildList[index][8] + 25;
									var timeY = buildList[index][3] + 30;
									if(typeof(build_time[index]) != "加载...")
									      gbox.drawMessageRect("建造中．．．" /*+ build_time[index]*/, timeX,timeY, 140, 12, '#FF9900');                              
					    		}
					    		
					    if(index == 27){
						    //升级
				    		if(buildList[index][1] == 'state_upgrade_start'){
				    			
					    		var timeX = buildList[index][8] + 25;
								var timeY = buildList[index][3] + 30;
								if(typeof(upgrade_time[index]) != "加载...")
//									tooltip.drawLineDesc(gbox.getBufferContext(),timeX,timeY,"升级中．．．");
					    		       gbox.drawMessageRect("升级中．．．" /*+ upgrade_time[index]*/, timeX,timeY, 140, 12, '#FF9900'); 
//					    		if(upgrade_time[index] == "00:00:00"){
//					    			
//					    			//网络
//					    			     upgrade_cnt[index] = 0;
//	                                     buildArray[index].getResult(index);	
//						         }		    				
						     }	
						     
						     //拆除
				    		if(buildList[index][13] == 'state_demolition_start'){
					    		var timeX = buildList[index][8] + 25;
								var timeY = buildList[index][3] + 30;
								if(typeof(demolition_time[index]) != "加载...")
//									tooltip.drawLineDesc(gbox.getBufferContext(),timeX,timeY,"拆除中．．．");
								        gbox.drawMessageRect("拆除中．．．" /*+ demolition_time[index]*/, timeX,timeY, 140, 12, '#FF9900');
//					    		if(demolition_time[index] == "00:00:00"){
//					    			
//					    			//网络
//					    			     demolition_cnt[index] = 0;
//	                                     buildArray[index].getResult(index);
//	                                     buildList[index][0] = "build_src";
//						         }		
						     }					    	
					    }
					    
				}
			});	
}


var timeX = 0;
var timeY = 0;
var b27;
function enterCityMenu(_group){
    
    //initCity();
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
    //gbox.setRenderOrder([_group,]);
    addCityBg();
	gbox.addObject(
			{ 
				id : 'cityWall',//主城 
				group : 'cityMenu',
				tileset : 'cjt_' + epoch,
				x : 0,
				y : 0,
				frame : 0,
				
				poly : [ [0,0], [1440,0], [1440,742],[0,742]],
				initialize : function()
				{
					if(isAllBuildings){

						Building.getAllBuildings(doGetCastleBuildings);
						isAllBuildings = false;
					}

					if(propNumbg != null && 
						typeof(propNumbg) != "undefined" &&
						gbox._isIndwellDiv("propNumbg","input")){
						document.body.removeChild(propNumbg);  
						propNumbg = null; 
					}
					if(afreshNameDiv != null && gbox._isIndwellDiv("afreshNameDiv","input")){
				            document.body.removeChild(afreshNameDiv);  
				            afreshNameDiv = null;  
					}
					
					 setInterval("onResize()",100);
				},
				first : function() 
				{
					if(
						((touchMoveX > 6 && touchMoveX < 234) && (touchMoveY > 396 && touchMoveY < 543)) ||
					    ((touchMoveX > 286&& touchMoveX < 370) && (touchMoveY > 548 && touchMoveY < 646))
					    || ((touchMoveX > 337&& touchMoveX < 476) && (touchMoveY > 585 && touchMoveY < 709))
					   || ((touchMoveX > 1022&& touchMoveX < 1186) && (touchMoveY > 607 && touchMoveY < 733))
					   || ((touchMoveX > 1175&& touchMoveX < 1249) && (touchMoveY > 578 && touchMoveY < 672))
					   || ((touchMoveX > 1251&& touchMoveX < 1400) && (touchMoveY > 472&&touchMoveY < 589)))
					{						
						cityWallLight = true;
					}
					else
					{
						cityWallLight = false;
					}
				},
				myclick : function()
				{
					if(buildList[curBuildIndex][0] != 'build_empty'){
						demolition_upgrade = new Array();
						cancel_speed = new Array();						
					}
                    wujiangList.mouseUpIndex = -1;
					drawInfo = false;
					sendMailDraw = false;
					//武将出征界面
					warpthMenuClass.flag.isDrawWarpthMenu = false;
					isFrist = false;
					isChengqiang = false;
					isWaiwuguan = false;
					isJunqing = false;
					socialDraw = false;
					drawGkItem = false;
					isefoundUnion = false;
					isShowAuctionPorp = false;
					isShowGuokuList = false;
					generalDrawBg = false;
					generalsSkillCtr = false;
					socialMessageAlertCtr = false;
					queryUnionAlertCtr = false;
					friendListCtr = false;
					renwuCtr = false;
					isWarpthGarget = false;
					isJuxiange2List = false;
					
					if(unionNameDiv != null)
					{
						  document.body.removeChild(unionNameDiv);  
				          unionNameDiv = null;
					}					
					if(findFriendDiv != null)
					{
						  document.body.removeChild(findFriendDiv);  
				          findFriendDiv = null;
					}
					if(addFriendDiv != null)
					{
						  document.body.removeChild(addFriendDiv);  
				          addFriendDiv = null;
					}
					if(unionFlagDiv != null)
					{
						  document.body.removeChild(unionFlagDiv);  
				          unionFlagDiv = null;
					}					
					if(unionDescribeDiv != null)
					{
						  document.body.removeChild(unionDescribeDiv);  
				          unionDescribeDiv = null;
					}
					if(findUnionDiv != null)
					{
						  document.body.removeChild(findUnionDiv);  
					      findUnionDiv = null;
					}
					if(heroTimeInterval != null){
						clearInterval(heroTimeInterval);
						heroCnt = 0;
						heroTimeInterval = null;
						remainTime =  "等待刷新！";
					}					
					
					if(gbox._isIndwellDiv("titleNameDiv","input"))
						{
							  document.body.removeChild(titleNameDiv);  
							  titleNameDiv = null;
							  
							
						} 
				    if(gbox._isIndwellDiv("mailContentDiv","input"))
						{
							
							  document.body.removeChild(mailContentDiv);  
							  mailContentDiv = null;
						} 
					//	console.log("========= " + gbox._isIndwellDiv("viewNameDiv","input"));
					if(gbox._isIndwellDiv("viewNameDiv","input"))
						{
							  document.body.removeChild(viewNameDiv);  
							  viewNameDiv = null;
						} 
					if(gbox._isIndwellDiv("receiveNameDiv","input"))
						{
							
							  document.body.removeChild(receiveNameDiv);  
							  receiveNameDiv = null;
						} 
				//销毁DIV    
				if(divjyxunNum != null && gbox._isIndwellDiv("divjyxunNum","input")){
			            document.body.removeChild(divjyxunNum);  
			            divjyxunNum = null;  				            
				}  	
					
				if(divjunjichuNum != null && gbox._isIndwellDiv("divjunjichuNum","input")){
			            document.body.removeChild(divjunjichuNum);  
			            divjunjichuNum = null;  				            
				}
				
				if(divjinjieNum != null && gbox._isIndwellDiv("divjinjieNum","input")){
		            document.body.removeChild(divjinjieNum);  
		            divjinjieNum = null;  				            
			    }
				
				if(divQiansanNum != null && gbox._isIndwellDiv("divQiansanNum","input")){
		            document.body.removeChild(divQiansanNum);  
		            divQiansanNum = null;  				            
			    }
				    

					sendMailDraw = false;
					viewMailDraw = false;

                    //城墙点击区域
					if(
					   ((lastTouchMoveX > 254&& lastTouchMoveX < 358) && (lastTouchMoveY > 471&&lastTouchMoveY < 546))|| ((lastTouchMoveX > 286&& lastTouchMoveX < 370) && (lastTouchMoveY > 548&&lastTouchMoveY < 646))
					   || ((lastTouchMoveX > 1251&& lastTouchMoveX < 1400) && (lastTouchMoveY > 472&&lastTouchMoveY < 589))
					   || ((lastTouchMoveX > 0&& lastTouchMoveX < 102) && (lastTouchMoveY > 105&&lastTouchMoveY < 153)))
					{
							var lx = lastTouchMoveX - 88;
							var ly = lastTouchMoveY;
							lotIndex = 1;
							if(buildList[1][0] == 'build_src'){
								if(buildList[1][1] == 'state_empty' && buildList[1][13] == 'state_demolition_empty'){
									demolition_upgrade_Menu(lx,ly,1);	
								}else if(buildList[1][1] == 'state_upgrade_start'){
									cancel_speed_Menu(lx,ly,1);
								}
							}else if(buildList[1][13] == 'state_demolition_start'){
								cancel_speed_Menu(lx,ly,1);
							}
							timeX = lastTouchMoveX;
							timeY = lastTouchMoveY;	
							enterCityMenu('cityMenu');
			                changeMap('cityMenuLayer');							
					}
					else{
				        isDrawUI[1] = false;
//						clickObjectList[1].poly = [[0,0],[0,0],[0,0],[0,0]];
					}
					
					isHoursebuilding = false;
				},
				blit : function()
				{
					
					if(currentLayer == 'cityMenuLayer')
					{
						if(typeof(buildName) != "undefined" && 
							   typeof(build_Level) != "undefined"){
							
						   if(typeof(buildName[1]) != "undefined" &&
						      typeof(build_Level[1]) != "undefined"){
							   
							   drawBuildTitle(null,""+buildName[1],""+build_Level[1],240,480);
							   drawBuildTitle(null,""+buildName[1],""+build_Level[1],1281,480);
							   drawBuildTitle(null,""+buildName[1],""+build_Level[1],1252,12);
//							   
//						        gbox.drawMessageRect(build_Level[1] + "级  " + buildName[1], 240,493, 100, 12, '#FFFF00');
//
//						        gbox.drawMessageRect(build_Level[1] + "级  " + buildName[1], 1281,519, 100, 12, '#FFFF00');	
//
//						        gbox.drawMessageRect(build_Level[1] + "级  " + buildName[1], 1252,12, 100, 12, '#FFFF00');		
						   }				        				        
						}
						    //升级
				    		if(buildList[1][1] == 'state_upgrade_start'){
				    			if(typeof(upgrade_time[1] != "加载..."))
					    		     gbox.drawMessageRect("升级中．．．" /*+ upgrade_time[1]*/, timeX,timeY, 140, 12, '#FF9900'); 
//					    		if(upgrade_time[1] == "00:00:00"){
//					    			
//					    			//网络
//					    			     upgrade_cnt[1] = 0;
//	                                     buildArray[1].getResult(1);
//						         }		    				
						     }	
						     
						     //拆除
				    		if(buildList[1][13] == 'state_demolition_start'){
				    			if(typeof(demolition_time[1] != "加载..."))
								     gbox.drawMessageRect("拆除中．．．" /*+ demolition_time[1]*/, timeX,timeY, 140, 12, '#FF9900');
//					    		if(demolition_time[1] == "00:00:00"){
//					    			
//					    			//网络			    			
//					    			     demolition_cnt[1] = 0;
//	                                     buildArray[1].getResult(1);	
//	                                     buildList[1][0] = 'build_src';
//						         }		    				
						     }	
				    		
				    		
							if(cityWallLight)
							{
								gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'cq_'+epoch+'_l',
									tile : 0,
									dx :0,
									dy :0,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							   }); 
								if(curGroup == 'cityMenu' && !isHoursebuilding)
							    {
									 if(typeof(buildings[1]) != 'undefined' && !demolition_upgrade[1] && !cancel_speed[1])
									 {
											if(((lastTouchMoveX > 286&& lastTouchMoveX < 370) && (lastTouchMoveY > 548&&lastTouchMoveY < 646)))
											{
												tooltip.drawBuilding(gbox.getImage("toolTip"),gbox.getBufferContext(),298,485,buildings[1]);
											}
											if(((lastTouchMoveX > 1251&& lastTouchMoveX < 1400) && (lastTouchMoveY > 472&&lastTouchMoveY < 589)))
											{
												tooltip.drawBuilding(gbox.getImage("toolTip"),gbox.getBufferContext(),1120,466,buildings[1]); 
											}
												
									 }
							    } 
							}
					}
							
				}
			});
	
	if(currentLayer == 'cityMenuLayer')
	{
		for(var i = 2; i<buildList.length; i++)
		{
			if( buildList[i][0] == 'build_end'){
			    houseBuild(buuldType[i],i);
			}else
			    addCityTitle(i);
		}          
	    if(isInitRoleAni){
	    	farmerAni.init(getClickObjectIndex(),'cityMenu',"农民",farmer,"farmer",385,80,farmerAni_desNode,0.5,"LEFT_DOWN",false);
		    //liyuanbaAni.init(getClickObjectIndex(),'cityMenu',"李元霸",liyuanba,"liyuanba",292,55,liyuanbaAni_desNode,0.5,"RIGHT_DOWN",false);
		    bubingAni.init(getClickObjectIndex(),'cityMenu',"步兵甲",bubing,"bubing",920,65,bubingAni_desNode,1,"LEFT_UP",false);
		    bubingAni1.init(getClickObjectIndex(),'cityMenu',"步兵乙",bubing,"bubing",130,600,bubingAni1_desNode,1,"RIGHT_DOWN",false);
		    shinvAni.init(getClickObjectIndex(),'cityMenu',"侍女",shinv,"shinv",850,333,shinvAni_desNode,1,"RIGHT_DOWN",false);    	
		    girlAni.init(getClickObjectIndex(),'cityMenu',"小叶子",girl,"girl",988,165,girl_desNode,1,"LEFT_DOWN",false);    	
		    isInitRoleAni = false;
	    }	
	    gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	    drawCommonBtn('levelMenu_1','cityMenu','cityMenuLayer');
	    for(var i = 2; i<buildList.length; i++){
	    	buildCue( i );
	    	buildDesc( i );
	    }
	    //重绘任务追踪
	    taskIndex.openTaskIndex(com_group, com_layer);
	}

}

var isCustomFace = function(a, b){
	for (var i = 0; i < 9; i++) {
		var tmp = "";
		if(i <= 9)
			tmp = "0" + i;
		else
			tmp = "" + i;
					
		
		if(a == ('' + parseInt(tmp/10)) && b == ('' + (tmp%10))){
			chatValue = Math.round(a+b);
			return true;
		}
		    
	}
	return false;
}

var drawSendText = function(txt,x,y){
			var t = 0;
			for (var j = 0; j < txt.length; j++) {
				if (txt.charAt(j) == '#' && isCustomFace(txt.charAt(j + 1), txt.charAt(j + 2))) {
				    gbox.drawImage("customface" + (chatValue),  x + t, y - 8);
				    t += 24;
				    j+=2;
				}else{
					gbox.drawString("" + txt.charAt(j), x + t, y, '#FFFF00');
					t += 16;
				}
				    
			}
}

var jq_message = false;
var jq_cnt = 0;
var jq_cnt1 = 5;

var addCityExpValue = 0;
var addCityCnt = 0;
var taskItem = function(_group,_layer)//底部任务条控制
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
        gbox.addObject(
			{ 
				id : 'taskItem',
				group : 'levelMenu_1',
				tileset : 'zjm_an_bj',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{	
 
				},
				first : function() 
				{	
					
					  var zim_an_bjX;
					  var tempOffset=0;
	                  if(document.body.clientWidth > 1440)
	                    {
	                    	tempOffset = 1440;
	                    }
	                  else
	                    {
	                    	tempOffset = document.body.clientWidth;
	                    }
					  if(tempOffset > 1200)
						{
							zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
						}
					  else
						{
							zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
						}
					  var offsetHeigth = 0;
					  if(document.body.clientHeight > gbox.getScreenH())
					  {
					       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					  } 
					  else
					  {
					  	   offsetHeigth = 0;
					  }
	                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
	                  this.poly  = [[zim_an_bjX,zim_an_bjY],[zim_an_bjX + 551,zim_an_bjY],[zim_an_bjX + 551,zim_an_bjY + 65],[zim_an_bjX,zim_an_bjY + 65]];
	                  
				},
				myclick : function()
				{
				},
				blit : function()
				{
					
					  var zim_an_bjX;
					  var tempOffset=0;
	                  if(document.body.clientWidth > 1440)
	                    {
	                    	tempOffset = 1440;
	                    }
	                  else
	                    {
	                    	tempOffset = document.body.clientWidth;
	                    }
					  if(tempOffset > 1200)
						{
							zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
						}
					  else
						{
							zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
						}
					  var offsetHeigth = 0;
					  if(document.body.clientHeight > gbox.getScreenH())
					  {
					       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					  } 
					  else
					  {
					  	   offsetHeigth = 0;
					  }
	                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;	                  
					  gbox.blitTile(gbox.getBufferContext(),
                      {
                                   tileset : 'zjm_an_bj',
                                   tile : 0,
                                   dx :zim_an_bjX + 4,
                                   dy :zim_an_bjY,
                                   fliph : this.fliph,
                                   flipv : this.flipv,
                                   camera : this.camera,
                                   alpha : 1.0
                      }); 
				}
			});
		   gbox.addObject(//调用武将界面按钮
			{ 
				id : 'taskItem1',
				group : 'levelMenu_1',
				tileset : 'zjm_an_bj',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{
				},
				first : function() 
				{	
					  var zim_an_bjX;
					  var tempOffset=0;
	                  if(document.body.clientWidth > 1440)
	                    {
	                    	tempOffset = 1440;
	                    }
	                  else
	                    {
	                    	tempOffset = document.body.clientWidth;
	                    }
					  if(tempOffset > 1200)
						{
							zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
						}
					  else
						{
							zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
						}
					  var offsetHeigth = 0;
					  if(document.body.clientHeight > gbox.getScreenH())
					  {
					       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					  } 
					  else
					  {
					  	   offsetHeigth = 0;
					  }
	                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
	                  this.poly  = [[zim_an_bjX + 50,zim_an_bjY],[(zim_an_bjX + 111),zim_an_bjY],[(zim_an_bjX + 111),(zim_an_bjY + 70)],[zim_an_bjX + 50,(zim_an_bjY + 70)]];
				},
				myclick : function()
				{
					loadingImageList['generals'].load(
			        			getClickObjectIndex(),
			        			generalsLoadImage,
			            		function(){
			    					ctrResh = true;
			    					isJunqing = false;
			    					drawGkItem = false;
			    					renwuCtr = false;
			    					isShowGuokuList = false;
			    					//heroSkill.splice(0,heroSkill.length);

			    					generalsItem(getClickObjectIndex(),_group,_layer);//getClickObjectIndex()
			    					wjList(getClickObjectIndex(),_group,_layer); 

			    					roundX = -36;
			                        roundY = -36;
			    					changeMap(_layer);	
			            		}
			        );

				},
				blit : function()
				{
					  var zim_an_bjX;
					  var tempOffset=0;
	                  if(document.body.clientWidth > 1440)
	                    {
	                    	tempOffset = 1440;
	                    }
	                  else
	                    {
	                    	tempOffset = document.body.clientWidth;
	                    }
					  if(tempOffset > 1200)
						{
							zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
						}
					  else
						{
							zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2  ;
						}
					  var offsetHeigth = 0;
					  if(document.body.clientHeight > gbox.getScreenH())
					  {
					       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					  } 
					  else
					  {
					  	   offsetHeigth = 0;
					  }
	                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
				      if((((zim_an_bjX+59)< touchMoveX) && (touchMoveX < (zim_an_bjX+59 + 55))) && ((zim_an_bjY < touchMoveY) && (touchMoveY < zim_an_bjY + 60)))
				      {
				   	    gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_an_wj_d',tile : 0,dx :zim_an_bjX+62,dy :zim_an_bjY - 15,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
						});
				      }
				      else
				      {
				   	    gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_an_wj_x',tile : 0,dx :zim_an_bjX+67,dy :zim_an_bjY - 6,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
						});
				      }
				}
			    });

			    gbox.addObject(
				{ 
					id : 'taskItem2',
					group : 'levelMenu_1',
					tileset : 'zjm_an_bj',
					x : 0,
					y : 0,
					frame : 0,
					poly : [ [0,0], [0 ,0], [0,0],[0,0]],
					initialize : function()
					{	
	
					},
					first : function() 
					{	
							var zim_an_bjX;
							var tempOffset=0;
			                if(document.body.clientWidth > 1440)
			                    {
			                    	tempOffset = 1440;
			                    }
			                else
			                    {
			                    	tempOffset = document.body.clientWidth;
			                    }
						    if(tempOffset > 1200)
							{
								zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
							}
						    else
							{
								zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2 ;
							}
						  var offsetHeigth = 0;
						  if(document.body.clientHeight > gbox.getScreenH())
						  {
						       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
						  } 
						  else
						  {
						  	   offsetHeigth = 0;
						  }
		                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
		                  this.poly  = [[zim_an_bjX + 112,zim_an_bjY],[(zim_an_bjX + 173),zim_an_bjY],[(zim_an_bjX + 173),(zim_an_bjY + 70)],[zim_an_bjX + 112,(zim_an_bjY + 70)]];
					},
					myclick : function()
					{
						loadingImageList['Military_situation'].load(
				        			getClickObjectIndex(),
				        			Military_situationLoadImage,
				            		function(){
										renwuCtr = false;
										isShowAuctionPorp = false;
									    generalDrawBg = false;
									    drawGkItem = false;
										junqingCtr = true;
										isShowGuokuList = false;
				                        junqing(getClickObjectIndex(),_group,_layer);//getClickObjectIndex()
									    changeMap(_layer);	
				            		}
				        	   );
					},
					blit : function()
					{
	                      var zim_an_bjX;
	                      var tempOffset=0;
			              if(document.body.clientWidth > 1440)
			                    {
			                    	tempOffset = 1440;
			                    }
			              else
			                    {
			                    	tempOffset = document.body.clientWidth;
			                    }
						  if(tempOffset > 1200)
							{
								zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
							}
						  else
							{
								zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2  ;
							}
						  var offsetHeigth = 0;
						  if(document.body.clientHeight > gbox.getScreenH())
						  {
						       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
						  } 
						  else
						  {
						  	   offsetHeigth = 0;
						  }
		                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
					      if((((zim_an_bjX+128)< touchMoveX) && (touchMoveX < (zim_an_bjX+128 + 55))) && ((zim_an_bjY < touchMoveY) && (touchMoveY < zim_an_bjY + 60)))
					      {
					   	    gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'zjm_an_jq_d',tile : 0,dx :zim_an_bjX+127,dy :zim_an_bjY - 15,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
							});
					      }
					      else
					      {
					   	    gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'zjm_an_jq_x',tile : 0,dx :zim_an_bjX+128,dy :zim_an_bjY - 6,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
							});
					      }
					     

					}
				    });
				    gbox.addObject(
					{ 
						id : 'taskItem3',
						group : 'levelMenu_1',
						tileset : 'zjm_an_bj',
						x : 0,
						y : 0,
						frame : 0,
						poly : [ [0,0], [0 ,0], [0,0],[0,0]],
						initialize : function()
						{	
		
						},
						first : function() 
						{
							  var zim_an_bjX;
							  var tempOffset=0;
				              if(document.body.clientWidth > 1440)
				                    {
				                    	tempOffset = 1440;
				                    }
				              else
				                    {
				                    	tempOffset = document.body.clientWidth;
				                    }
							  if(tempOffset > 1200)
								{
									zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
								}
							  else
								{
									zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2 ;
								}
							  var offsetHeigth = 0;
							  if(document.body.clientHeight > gbox.getScreenH())
							  {
							       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
							  } 
							  else
							  {
							  	   offsetHeigth = 0;
							  }
			                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
			                  this.poly  = [[zim_an_bjX + 174,zim_an_bjY],[(zim_an_bjX + 235),zim_an_bjY],[(zim_an_bjX + 235),(zim_an_bjY + 70)],[zim_an_bjX + 174,(zim_an_bjY + 70)]];
						},
						myclick : function()
						{
							loadingImageList['exchequer'].load(
				        			getClickObjectIndex(),
				        			exchequerLoadImage,
				            		function(){
										renwuCtr = false;
										isJunqing = false;
										isShowAuctionPorp = false;
								        generalDrawBg = false;
										for(var a= 0; a<5; a++ )
											bottonCtr[a] = false;
										BuildingFunction.getAllArticles(doAllArticles);	
				            		}
				        	   );
						},
						blit : function()
						{
							  var zim_an_bjX;
							  var tempOffset=0;
				              if(document.body.clientWidth > 1440)
				                    {
				                    	tempOffset = 1440;
				                    }
				              else
				                    {
				                    	tempOffset = document.body.clientWidth;
				                    }
							  if(tempOffset > 1200)
								{
									zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
								}
							  else
								{
									zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2  ;
								}
							  var offsetHeigth = 0;
							  if(document.body.clientHeight > gbox.getScreenH())
							  {
							       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
							  } 
							  else
							  {
							  	   offsetHeigth = 0;
							  }
			                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
						      if((((zim_an_bjX+190)< touchMoveX) && (touchMoveX < (zim_an_bjX+190 + 55))) && ((zim_an_bjY < touchMoveY) && (touchMoveY < zim_an_bjY + 60)))
						      {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_gk_d',tile : 0,dx :zim_an_bjX+188,dy :zim_an_bjY - 15,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
								});
						      }
						      else
						      {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_gk_x',tile : 0,dx :zim_an_bjX+187,dy :zim_an_bjY - 6,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
								});
						      }
						}
					    });
					/*
					 *  调用社交界面
					 */
					gbox.addObject(
					{ 
						id : 'taskItem4',
						group : 'levelMenu_1',
						tileset : 'zjm_an_bj',
						x : 0,
						y : 0,
						frame : 0,
						poly : [ [0,0], [0 ,0], [0,0],[0,0]],
						initialize : function()
						{	
		
						},
						first : function() 
						{	
							  var zim_an_bjX;
							  var tempOffset=0;
				              if(document.body.clientWidth > 1440)
				                    {
				                    	tempOffset = 1440;
				                    }
				              else
				                    {
				                    	tempOffset = document.body.clientWidth;
				                    }
							  if(tempOffset > 1200)
								{
									zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
								}
							  else
								{
									zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2  ;
								}
							  var offsetHeigth = 0;
							  if(document.body.clientHeight > gbox.getScreenH())
							  {
							       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
							  } 
							  else
							  {
							  	   offsetHeigth = 0;
							  }
			                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
			                  this.poly  = [[zim_an_bjX + 236,zim_an_bjY],[(zim_an_bjX + 297),zim_an_bjY],[(zim_an_bjX + 297),(zim_an_bjY + 70)],[zim_an_bjX + 236,(zim_an_bjY + 70)]];

						},
						myclick : function()
						{
							loadingImageList['social'].load(
				        			getClickObjectIndex(),
				        			socialLoadImage,
				            		function(){
										isJunqing = false;
										isShowAuctionPorp = false;
									    generalDrawBg = false;
									    drawGkItem = false;
									    isShowGuokuList= false;
									    renwuCtr = false;
									    socialFriendPage = true;
			                            sociaEnemyPage = false;
									    friend.getFriendsDefault(datagetFriendsDefault); 
										friendWarnData = false;	
				            		}
				        	   );	
						},
						blit : function()
						{
						      var zim_an_bjX;
						      var tempOffset=0;
				              if(document.body.clientWidth > 1440)
				                    {
				                    	tempOffset = 1440;
				                    }
				              else
				                    {
				                    	tempOffset = document.body.clientWidth;
				                    }
							  if(tempOffset > 1200)
								{
									zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
								}
							  else
								{
									zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2 ;
								}
							  var offsetHeigth = 0;
							  if(document.body.clientHeight > gbox.getScreenH())
							  {
							       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
							  } 
							  else
							  {
							  	   offsetHeigth = 0;
							  }
			                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
						     
						  if(friendWarnData)
					      {
					      	  friendCnt = friendCnt + 1;
					      	  if(friendCnt%15 == 0)
					      	  {
					      	  	 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'zjm_an_sj_d',tile : 0,dx :zim_an_bjX+243,dy :zim_an_bjY - 15,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									});
					      	  }
					      	  else
					      	  {
					      	  	  gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'zjm_an_sj_x',tile : 0,dx :zim_an_bjX+243,dy :zim_an_bjY - 6,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									});
					      	  }
					      }
					      else
					      {
					      	   if((((zim_an_bjX+250)< touchMoveX) && (touchMoveX < (zim_an_bjX+250 + 55))) && ((zim_an_bjY < touchMoveY) && (touchMoveY < zim_an_bjY + 60)))
						      {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_sj_d',tile : 0,dx :zim_an_bjX+243,dy :zim_an_bjY - 15,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
								});
						      }
						      else
						      {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_sj_x',tile : 0,dx :zim_an_bjX+243,dy :zim_an_bjY - 6,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
								});
						      }
					      }
						
						}
					    });
					 gbox.addObject(
					 { 
						id : 'taskItem5',
						group : 'levelMenu_1',
						tileset : 'zjm_an_bj',
						x : 0,
						y : 0,
						frame : 0,
						poly : [ [0,0], [0 ,0], [0,0],[0,0]],
						initialize : function()
						{	
		
						},
						first : function() 
						{	
							  var zim_an_bjX;
							  var tempOffset=0;
				              if(document.body.clientWidth > 1440)
				                    {
				                    	tempOffset = 1440;
				                    }
				              else
				                    {
				                    	tempOffset = document.body.clientWidth;
				                    }
							  if(tempOffset > 1200)
								{
									zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
								}
							  else
								{
									zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2  ;
								}
							  var offsetHeigth = 0;
							  if(document.body.clientHeight > gbox.getScreenH())
							  {
							       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
							  } 
							  else
							  {
							  	   offsetHeigth = 0;
							  }
			                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
			                  this.poly  = [[zim_an_bjX + 298,zim_an_bjY],[(zim_an_bjX + 359),zim_an_bjY],[(zim_an_bjX + 359),(zim_an_bjY + 70)],[zim_an_bjX + 298,(zim_an_bjY + 70)]];
						},
						myclick : function()
						{
							loadingImageList['task'].load(
				        			getClickObjectIndex(),
				        			taskLoadImage,
				            		function(){
										isJunqing = false;
										isShowAuctionPorp = false;
									    generalDrawBg = false;
									    drawGkItem = false;
									    renwuCtr = true; 
									    isShowGuokuList= false;
									    quest.getUserQuest(taskObject.doOpenUI);
										changeMap(_layer);
				            		}
				        	   );

						},
						blit : function()
						{
						      var zim_an_bjX;
						      var tempOffset=0;
				              if(document.body.clientWidth > 1440)
				                    {
				                    	tempOffset = 1440;
				                    }
				              else
				                    {
				                    	tempOffset = document.body.clientWidth;
				                    }
							  if(tempOffset > 1200)
								{
									zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
								}
							  else
								{
									zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
								}
							  var offsetHeigth = 0;
							  if(document.body.clientHeight > gbox.getScreenH())
							  {
							       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
							  } 
							  else
							  {
							  	   offsetHeigth = 0;
							  }
			                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
						      if((((zim_an_bjX+312)< touchMoveX) && (touchMoveX < (zim_an_bjX+312 + 55))) && ((zim_an_bjY < touchMoveY) && (touchMoveY < zim_an_bjY + 60)))
						      {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_rw_d',tile : 0,dx :zim_an_bjX+300,dy :zim_an_bjY - 15,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
								});
						      }
						      else
						      {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_rw_x',tile : 0,dx :zim_an_bjX+300,dy :zim_an_bjY - 6,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
								});
						      }
						}
					    });
					gbox.addObject(
					 { 
						id : 'taskItem6',
						group : 'levelMenu_1',
						tileset : 'zjm_an_bj',
						x : 0,
						y : 0,
						frame : 0,
						poly : [ [0,0], [0 ,0], [0,0],[0,0]],
						initialize : function()
						{	
		
						},
						first : function() 
						{	
							 var zim_an_bjX;
							 var tempOffset=0;
				              if(document.body.clientWidth > 1440)
				                    {
				                    	tempOffset = 1440;
				                    }
				              else
				                    {
				                    	tempOffset = document.body.clientWidth;
				                    }
							  if(tempOffset > 1200)
								{
									zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
								}
							  else
								{
									zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
								}
							  var offsetHeigth = 0;
							  if(document.body.clientHeight > gbox.getScreenH())
							  {
							       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
							  } 
							  else
							  {
							  	   offsetHeigth = 0;
							  }
			                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
			                  this.poly  = [[zim_an_bjX + 360,zim_an_bjY],[(zim_an_bjX + 421),zim_an_bjY],[(zim_an_bjX + 421),(zim_an_bjY + 70)],[zim_an_bjX + 360,(zim_an_bjY + 70)]];
						},
						myclick : function()
						{
							loadingImageList['ranking'].load(
				        			getClickObjectIndex(),
				        			rankingLoadImage,
				            		function(){
										isJunqing = false;
										isShowGuokuList = false;
										isShowAuctionPorp = false;
									    generalDrawBg = false;
									    drawGkItem = false;
									    renwuCtr = false;
									    paihang(getClickObjectIndex(),_group,_layer);
										changeMap(_layer);
				            		}
				        	   );
							

//						    paihang(getClickObjectIndex());
//						    Ranking.getBuildList(0);
						},
						blit : function()
						{
						     var zim_an_bjX;
						     var tempOffset=0;
				              if(document.body.clientWidth > 1440)
				                    {
				                    	tempOffset = 1440;
				                    }
				              else
				                    {
				                    	tempOffset = document.body.clientWidth;
				                    }
							  if(tempOffset > 1200)
								{
									zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
								}
							  else
								{
									zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
								}
							  var offsetHeigth = 0;
							  if(document.body.clientHeight > gbox.getScreenH())
							  {
							       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
							  } 
							  else
							  {
							  	   offsetHeigth = 0;
							  }
			                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
						      if((((zim_an_bjX+371)< touchMoveX) && (touchMoveX < (zim_an_bjX+371 + 55))) && ((zim_an_bjY < touchMoveY) && (touchMoveY < zim_an_bjY + 60)))
						      {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_px_d',tile : 0,dx :zim_an_bjX+358,dy :zim_an_bjY - 15,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
								});
						      }
						      else
						      {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_px_x',tile : 0,dx :zim_an_bjX+358,dy :zim_an_bjY - 6,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
								});
						      }
						}
					    });
					    gbox.addObject(
					    { 
							id : 'taskItem7',
							group : 'levelMenu_1',
							tileset : 'zjm_an_bj',
							x : 0,
							y : 0,
							frame : 0,
							poly : [ [0,0], [0 ,0], [0,0],[0,0]],
							initialize : function()
							{	
			
							},
							first : function() 
							{	
								  var zim_an_bjX;
								  var tempOffset=0;
					              if(document.body.clientWidth > 1440)
					                    {
					                    	tempOffset = 1440;
					                    }
					              else
					                    {
					                    	tempOffset = document.body.clientWidth;
					                    }
								  if(tempOffset > 1200)
									{
										zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
									}
								  else
									{
										zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
									}
								  var offsetHeigth = 0;
								  if(document.body.clientHeight > gbox.getScreenH())
								  {
								       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
								  } 
								  else
								  {
								  	   offsetHeigth = 0;
								  }
				                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
				                  this.poly  = [[zim_an_bjX + 422,zim_an_bjY],[(zim_an_bjX + 483),zim_an_bjY],[(zim_an_bjX + 483),(zim_an_bjY + 70)],[zim_an_bjX + 422,(zim_an_bjY + 70)]];
							
							},
							myclick : function()
							{
								isJunqing = false;
								isShowAuctionPorp = false;
							    generalDrawBg = false;
							    drawGkItem = false;
							    renwuCtr = false; 
							    isShowGuokuList = false;		
							},
							blit : function()
							{
								  var zim_an_bjX;
								  var tempOffset=0;
					              if(document.body.clientWidth > 1440)
					                    {
					                    	tempOffset = 1440;
					                    }
					              else
					                    {
					                    	tempOffset = document.body.clientWidth;
					                    }
								  if(tempOffset > 1200)
									{
										zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
									}
								  else
									{
										zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2 ;
									}
								  var offsetHeigth = 0;
								  if(document.body.clientHeight > gbox.getScreenH())
								  {
								       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
								  } 
								  else
								  {
								  	   offsetHeigth = 0;
								  }
				                  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
							      if((((zim_an_bjX+426)< touchMoveX) && (touchMoveX < (zim_an_bjX+426 + 55))) && ((zim_an_bjY < touchMoveY) && (touchMoveY < zim_an_bjY + 60)))
							      {
							   	    gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'zjm_an_sz_d',tile : 0,dx :zim_an_bjX+412,dy :zim_an_bjY - 15,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									});
							      }
							      else
							      {
							   	    gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'zjm_an_sz_x',tile : 0,dx :zim_an_bjX+412,dy :zim_an_bjY - 6,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									});
							      }
							}
					    });
					    gbox.addObject(
					    { 
							id : 'taskItem8',
							group : 'levelMenu_1',
							tileset : 'zjm_an_bj',
							x : 0,
							y : 0,
							frame : 0,
							poly : [ [0,0], [0 ,0], [0,0],[0,0]],
							initialize : function()
							{	
							},
							first : function() 
							{	  
					            if(gbox.getObject(eval(cityLevel).group,"cityLevel") == null)
								{
									 gbox.addObject(eval(cityLevel));	
								}	
							},
							myclick : function()
							{
								isJunqing = false;
								isShowAuctionPorp = false;
							    generalDrawBg = false;
							    drawGkItem = false;
							    renwuCtr = false; 
							    isShowGuokuList = false;	
							},
							blit : function()
							{
								      var zim_an_bjX;
									  var tempOffset=0;
									  if(document.body.clientWidth > 1440)
											{
											      tempOffset = 1440;
											}
									  else
											{
											     tempOffset = document.body.clientWidth;
											}
									  if(tempOffset> 1200)
										{
											zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
										}
									  else
										{
											zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
										}
									  var offsetHeigth = 0;
									  if(document.body.clientHeight > gbox.getScreenH())
									  {
									       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
									  } 
									  else
									  {
									  	   offsetHeigth = 0;
									  }
									  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
									  gbox.blitTile(gbox.getBufferContext(),
									  {
											tileset : 'zjm_an_cssj',tile : 0,dx :zim_an_bjX + 550,dy :zim_an_bjY - 3,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									  });
									  var dx=0;
									  if(castleLevel >=10)
									  {
									  	dx = zim_an_bjX + gbox.getImage("zjm_an_bj").width + (80 - gbox.getBufferContext().measureText(castleLevel).width)/2;
									  }
									  else
									  {
									  	dx = zim_an_bjX + gbox.getImage("zjm_an_bj").width + (89 - gbox.getBufferContext().measureText(castleLevel).width)/2;
									  } 
									  var dy = zim_an_bjY - (gbox.getImage("zjm_an_cssj").height-gbox.getImage("zjm_an_bj").height)- 80 + (gbox.getImage("zjm_an_bj").height - 20)/2 + 64;			
									  gbox.drawDanceString(castleLevel, dx, dy,28,'#000000','#00FF00');
								      if(!canLevelup){
						                 eval(cityLevel).isVisible = false;  
			                          }
			                          else
			                          {
			                          	 eval(cityLevel).isVisible = true;
			                          }
								      
								      
										if(((zim_an_bjX + 50 < touchMoveX) && (touchMoveX < (zim_an_bjX + 50 + 435))) && ((zim_an_bjY + 60 < touchMoveY) && (touchMoveY < (zim_an_bjY + 60 + 6))))
								        {
											var tempOffset = 15;
											var tempH = 30;
				                            var tempW = tooltip.width;
				                            var mouseX = 0;
				                            var mouseY = 0;
											if((gbox.getScreenW() - touchMoveX) < tempW)	
											{
												mouseX = gbox.getScreenW() - tempW - 40;
											}
											else
											{
												mouseX = touchMoveX;
											}
											
											if(((zim_an_bjY + 66) - touchMoveY) < tempH)	
											{
												mouseY = (zim_an_bjY + 66) - tempH - 20;
											}
											else
											{
												mouseY = touchMoveY;
											}
											if(touchMoveX !=0)
											tooltip.drawLineDesc(gbox.getBufferContext(),mouseX + tempOffset,mouseY + tempOffset,"城池经验值：" + castleValue + " / " + castleValueLimit); 
								        }
					                      var zjm_frd_1X = zim_an_bjX + (gbox.getImage("zjm_an_bj").width - gbox.getImage("zjm_frd_1").width)/2;
										  var zjm_frd_1Y = zim_an_bjY + (gbox.getImage("zjm_an_bj").height - gbox.getImage("zjm_frd_1").height);
										    if(addCityExpValue != 0)
										    {
										    	if(++addCityCnt < 30)
										    	{
										    		var fontW = gbox.getTextWidth(addCityExpValue,30);
										    		var addCEX = 918;
										    		if(addCityExpValue > 0){
										    			gbox.drawDanceString( "+" + addCityExpValue, addCEX,zim_an_bjY + 20,30,'#000000','#00FF00');
										    		}
										    		else
										    		{
										    			gbox.drawDanceString( addCityExpValue, addCEX,zim_an_bjY + 20 ,30,'#000000','#FF0000');
										    		}
										    	}
										    	else{
										    		addCityCnt = 0;
										    		addCityExpValue = 0;
										    	}	
										    }
										  
										  var bw = Math.floor(((gbox.getImage("zjm_jyt_2").width) * castleValue) / castleValueLimit); 
										  gbox.drawImage("zjm_jyt_2",zjm_frd_1X,zjm_frd_1Y); 
										  gbox.setClip(gbox.getBufferContext(),zjm_frd_1X,zjm_frd_1Y,bw,gbox.getImage("zjm_frd_1").height);
										  gbox.drawImage("zjm_jyt_3",zjm_frd_1X,zjm_frd_1Y); 
										  gbox.restoreClip(gbox.getBufferContext());
										  gbox.drawImage("zjm_frd_1",zjm_frd_1X,zjm_frd_1Y);
			 }
			 });
};

function doMaincityLevelup(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	console.log("城市升级成功！");
	epoch = data.age;
	castleLevel = data.level;
	castleValue = data.experience;
    castleValueLimit = data.experienceLimit;
    canLevelup = data.canLevelup;

    for(var i=0; i<28; i++){
    	if(typeof(buuldType[i]) != "undefined")
    	    buuldType[i] = data.images[i];
    }
    
    
	console.log('升级主城！！！');
	console.log(loadingImageList["age"+epoch]);
	loadingImageList["age"+epoch].load(
			getClickObjectIndex(),
				eval("age"+epoch+"LoadImage"),
				function(){
			    switch(layerID){
			    case 'cityMenuLayer':
			        enterCityMenu(curGroup);
			    	changeMap('cityMenuLayer');
			    	break;
			    case 'environsScreen_Layer':
					EnvironsScreen();
					changeMap('environsScreen_Layer');
			    	break;
			    case 'worldScreen_Layer':
			 		WorldScreen();
			        changeMap('worldScreen_Layer');
			    	break;
			    case 'taiweifuScreen_Layer':
			     	taiweifu();
					changeMap('taiweifuScreen_Layer');	
			    	break;
			    case 'jiafongfangScreen_Layer':
			  	   jiaGongfang();
			       changeMap('jiafongfangScreen_Layer');
			    	break;
			    case 'jishiScreen_Layer':
			  	   jishiMenu();
			       changeMap('jishiScreen_Layer');
			    	break;
			    case 'jiuguanScreen_Layer':
						jiuguan();
			 			changeMap('jiuguanScreen_Layer');
			    	break;
			    }
				}
	);
}


var CommandItem = function(index,_group,_layer)//底部功能条
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	    isDrawUI[index] = true;
			//test
			gbox.addObject(
			{ 
				id : 'test'+ index,
				group : 'levelMenu_1',
				tileset : 'zjm_an_bj',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [720,225], [774,225], [774,274],[720,274]],
				initialize : function()
				{	

				},
				first : function() 
				{	
				},
				myclick : function()
				{
					CommandItem(index,_group,_layer);
					testLevel(getClickObjectIndex(),633,422);
				    changeMap(_layer);

				},
				blit : function()
				{
				}
			});
			
			
			gbox.addObject(
			{ 
				id : 'exit'+ index,
				group : 'levelMenu_1',
				tileset : 'ty_an_18',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [1290,70], [1290 + 23,70], [1290 + 23,70 + 23],[1290,70 + 23]],
				initialize : function()
				{	

				},
				first : function() 
				{	
				},
				myclick : function()
				{
					CommandItem(index,_group,_layer);
					testLevel2(getClickObjectIndex());
					changeMap(_layer);
				},
				blit : function()
				{
					 if(isDrawUI[index])
					 {
					    gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'ty_an_18',
							tile : 0,
							dx :1290,
							dy :70,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					    });
					 }	
				}
			});
};

var testLevel = function(index)
{
	isDrawUI[index] = true;
			//资源显示窗口
			var desX = (gbox.getScreenW() - gbox.getImage("chat").width)/2;
			var desY = (gbox.getScreenH() - gbox.getImage("chat").height)/2;
			var desW = gbox.getImage("chat").width;
			var desH = gbox.getImage("chat").height;
			gbox.addObject(
			{ 
				
				id : 'AttributeWin_test' + index,//任务条
				group : 'levelMenu_2',
				tileset : 'chat',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [desX,desY], [desX+desW,desY], [desX+desW,desY+desH],[desX,desY+desH]],
				initialize : function()
				{	
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					
				},
				blit : function()
				{
					 if(isDrawUI[index])
					 {
						gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'chat',
							tile : 0,
							dx :desX,
							dy :desY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     }); 
					  }
					
				}
			});
}
var testLevel2 = function(index)
{
	      isDrawUI[index] = true;
			//资源显示窗口
			var desX = (gbox.getScreenW() - gbox.getImage("attributeNum").width)/2;
			var desY = (gbox.getScreenH() - gbox.getImage("attributeNum").height)/2;
			var desW = gbox.getImage("attributeNum").width;
			var desH = gbox.getImage("attributeNum").height;
			gbox.addObject(
			{ 
				
				id : 'AttributeWin_attributeNum' + index,//任务条
				group : 'levelMenu_2',
				tileset : 'attributeNum',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [desX,desY], [desX+desW,desY], [desX+desW,desY+desH],[desX,desY+desH]],
				initialize : function()
				{	
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					
				},
				blit : function()
				{
					 if(isDrawUI[index])
					 {
						gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'attributeNum',
							tile : 0,
							dx :desX,
							dy :desY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     }); 
					  }
					
				}
			});
}

var drawTaskItem = function(x1,y1,x2,y2,a,b)//画底部功能条
{
	 gbox.blitTile(gbox.getBufferContext(),
            {
                   tileset : a,
		           tile : 0,
		           dx :x1,
		           dy :y1,
		           fliph : this.fliph,
		           flipv : this.flipv,
		           camera : this.camera,
		           alpha : 1.0
		     }); 
	 gbox.blitTile(gbox.getBufferContext(),
		     {
		            tileset : b,
		            tile : 0,
		            dx :x2,
		            dy :y2,
		            fliph : this.fliph,
		            flipv : this.flipv,
		            camera : this.camera,
		            alpha : 1.0
		      }); 
};
var drawWorldRrightBtn = function(_group,_layer)//资源UI
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	       gbox.addObject(
			{ 
				id : 'rebg',
				group : 'levelMenu_1',
				tileset : 'zjm_an_zy',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{	
				},
				first : function() 
				{	
					var zim_an_bjX;
					var tempOffset=0;
					if(document.body.clientWidth > 1440)
							{
							      tempOffset = 1440;
							}
					else
							{
							     tempOffset = document.body.clientWidth;
							}
					if(tempOffset > 1200)
					{
						zim_an_bjX = (tempOffset - 185) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - 185);
					}
					var offsetHeigth = 0;
					if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
					else
					{
							offsetHeigth = 0;
					}
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
				    if(resCtr || bulidingCtr)
				       this.poly = [[zim_an_bjX,zim_an_bjY],[zim_an_bjX + 185,zim_an_bjY],[zim_an_bjX + 185,zim_an_bjY + 202],[zim_an_bjX,zim_an_bjY + 202]];	
				    else 
				       this.poly = [[0,0],[0,0],[0,0],[0,0]];
				},
				myclick : function()
				{
					
                     var zim_an_bjX;
				     var tempOffset=0;
					 if(document.body.clientWidth > 1440)
					 {
						tempOffset = 1440;
					 }
					 else
					 {
						tempOffset = document.body.clientWidth;
					 }
					 if(tempOffset  > 1200)
					 {
						zim_an_bjX = (tempOffset  - 185) + document.body.scrollLeft ;
					 }
					 else
					 {
						zim_an_bjX = (1440 - 185);
					 }
					 var offsetHeigth = 0;
					 if(document.body.clientHeight > gbox.getScreenH())
					 {
						offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					 } 
					 else
					 {
						offsetHeigth = 0;
					 }
					 var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
					 var zim_an_bjX_build;
					 var tempOffset=0;
					 if(document.body.clientWidth > 1440)
					 {
						tempOffset = 1440;
					 }
					 else
					 {
						tempOffset = document.body.clientWidth;
					 }
					 if(tempOffset > 1200)
					 {
						zim_an_bjX_build = (tempOffset - 254) + document.body.scrollLeft ;
				     }
					else
					{
						zim_an_bjX_build = (1440 - 254);
					}
					var offsetHeigth = 0;
					if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
					else
					{
							offsetHeigth = 0;
					}         
				    var zim_an_bjY_build = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
				    if(buildingListCtr)
				    {
				     	for(var i = 0; i<buildingArray.length; i++)
				     	{
				     		var speedUpX = zim_an_bjX_build + 168;
							var strY = zim_an_bjY_build + 20 + i*20;
				     		if(((speedUpX < lastTouchMoveX) && (lastTouchMoveX < speedUpX + gbox.getImage("ty_an_123").width + 6)) && ((strY-3 < lastTouchMoveY) && (lastTouchMoveY < strY-3 + gbox.getImage("ty_an_125").height)))
				     		{
				     			systemSpeedup(buildingArray[i].location,"建筑加速");

				     		}
				     		var cancleX = zim_an_bjX_build + 198;
				     		if(((cancleX < lastTouchMoveX) && (lastTouchMoveX < cancleX + gbox.getImage("ty_an_123").width)) && ((strY-3 < lastTouchMoveY) && (lastTouchMoveY < strY-3 + gbox.getImage("ty_an_125").height)))
				     		{
				     			buildCancel(buildingArray[i].location);

				     		}
				     	}
				    }
				},
				blit : function()
				{       
					 var zim_an_bjX;
				     var tempOffset=0;
					 if(document.body.clientWidth > 1440)
					 {
						tempOffset = 1440;
					 }
					 else
					 {
						tempOffset = document.body.clientWidth;
					 }
					 if(tempOffset  > 1200)
					 {
						zim_an_bjX = (tempOffset  - 185) + document.body.scrollLeft ;
					 }
					 else
					 {
						zim_an_bjX = (1440 - 185);
					 }
					 var offsetHeigth = 0;
					 if(document.body.clientHeight > gbox.getScreenH())
					 {
						offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					 } 
					 else
					 {
						offsetHeigth = 0;
					 }
					 var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
					 var zim_an_bjX_build;
					 
					 gbox.drawImage('zjm_18',zim_an_bjX + 160,zim_an_bjY);
					 var tempOffset=0;
					 if(document.body.clientWidth > 1440)
					 {
						tempOffset = 1440;
					 }
					 else
					 {
						tempOffset = document.body.clientWidth;
					 }
					 if(tempOffset > 1200)
					 {
						zim_an_bjX_build = (tempOffset - 254) + document.body.scrollLeft ;
				     }
					else
					{
						zim_an_bjX_build = (1440 - 254);
					}
					var offsetHeigth = 0;
					if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
					else
					{
							offsetHeigth = 0;
					}
					
				    var zim_an_bjY_build = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
                    if(resCtr)//绘制拥有资源数量以及最大数量
					{						
//					    gbox.drawImage('zjm_zy_bj',zim_an_bjX,zim_an_bjY);
					    
						var rect = new Rect(zim_an_bjX,zim_an_bjY,185,202);
						gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#000000","#BEA76E",true);
					    
					    gbox.drawImage('zjm_zy01_ls',zim_an_bjX + 15,zim_an_bjY + 10);
					    gbox.drawImage('zjm_zy02_ml',zim_an_bjX + 15,zim_an_bjY + 50);
					    gbox.drawImage('zjm_zy03_sc',zim_an_bjX + 15,zim_an_bjY + 90);
					    gbox.drawImage('zjm_zy04_tk',zim_an_bjX + 15,zim_an_bjY + 130);
					    gbox.drawImage('zjm_zy05_tb',zim_an_bjX + 15,zim_an_bjY + 170);
						gbox.drawDanceString(resourcefood, zim_an_bjX + 50, zim_an_bjY + 20,10,'#000000','#FFFFFF');
						gbox.drawDanceString(resourcewood, zim_an_bjX + 50, zim_an_bjY + 60,10,'#000000','#FFFFFF');
                        gbox.drawDanceString(resourcestone, zim_an_bjX + 50, zim_an_bjY + 100,10,'#000000','#FFFFFF');
                        gbox.drawDanceString(resourceironore, zim_an_bjX + 50, zim_an_bjY + 140,10,'#000000','#FFFFFF');
                        gbox.drawDanceString(resourcemoney, zim_an_bjX + 50, zim_an_bjY + 180,10,'#000000','#FFFFFF');

					}else if(bulidingCtr)
					{
//						gbox.drawImage('zjm_dlzy_bj_02',zim_an_bjX_build,zim_an_bjY_build);	
						
						var rect = new Rect(zim_an_bjX_build,zim_an_bjY_build,254,202);
						gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#000000","#BEA76E",true);
					    if(buildingListCtr)
					    {
//					    	console.log("--------------------"+buildingArray.length);
					    	for(var i = 0; i<buildingArray.length; i++)
						    {
						      if(buildingArray[i].time >= 0)
						      {     
							      	if(typeof(buildingListTimerStr[i]) != "undefined" && (Math.ceil(buildingArray[i].time/1000) > 0))
							      	{
			     		
							      		var str = buildingArray[i].buildingName + " " + 
							      		          buildingArray[i].curLevel + "-" + 
							      		          buildingArray[i].tarLevel + " " + 
							      		          buildingListTimerStr[i] + " " + 
							      		          buildingArray[i].status;
							      		
							      		var strX = zim_an_bjX_build;
							      		var strY = zim_an_bjY_build + 20 + i*20;
							      		gbox.drawDanceString(str, strX, strY,11,'#000000','#00FF00');
							      		gbox.drawImage("ty_an_123",zim_an_bjX_build + 178,strY-3);
							      		gbox.drawImage("ty_an_125",zim_an_bjX_build + 198,strY-3);
							      		var speedUpX = zim_an_bjX_build + 178;
								        if(((speedUpX < touchMoveX) && (touchMoveX < speedUpX + gbox.getImage("ty_an_123").width)) && ((strY-3 < touchMoveY) && (touchMoveY < strY-3 + gbox.getImage("ty_an_125").height)))
								            {
								              gbox.drawImage("ty_an_124",zim_an_bjX_build + 178,strY-3);			 			               
								            }
								        var cancleX = zim_an_bjX_build + 198;
								        if(((cancleX < touchMoveX) && (touchMoveX < cancleX + gbox.getImage("ty_an_125").width)) && ((strY-3 < touchMoveY) && (touchMoveY < strY-3 + gbox.getImage("ty_an_125").height)))
								            {
								               gbox.drawImage("ty_an_126",zim_an_bjX_build + 198,strY-3);
								            }
							      	}
							      		
							        if(buildingListTimerStr[i] == "00:00:00")
						     		{
						     			buildingListTime[i] = -1;
				                        buildingListCnt[i] = -1;
						     			buildingArray[i].time = 0;
						     			buildingListTimerStr[i] = "等待刷新";
						     			clearInterval(IntervalbuildingListArray[i]);
				                        Building.getBuildingList(doBuildingList);
						     		}	
						      }						      
						    }
					    }
					  }						 

	
				}
			});
				//建造
           
     		gbox.addObject(
			{ 
				id : 'build',
				group : 'levelMenu_1',
				tileset : 'zjm_an_zy',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{	
				},
				first : function() 
				{	
					 var zim_an_bjX;
					 var tempOffset=0;
					 if(document.body.clientWidth > 1440)
							{
							      tempOffset = 1440;
							}
					 else
							{
							     tempOffset = document.body.clientWidth;
							}
					if(tempOffset > 1200)
					{
						zim_an_bjX = (tempOffset - 185) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - 185);
					}
					var offsetHeigth = 0;
					if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
					else
					{
							offsetHeigth = 0;
					}
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
				    var tempJzY = zim_an_bjY + gbox.getImage("zjm_an_jz").height/4 + 100;
				    var tempJzX = zim_an_bjX + 185 - gbox.getImage("zjm_an_jz").width;
				     this.poly = [[tempJzX,tempJzY],[tempJzX + gbox.getImage("zjm_an_jz").width,tempJzY],[tempJzX + gbox.getImage("zjm_an_jz").width,tempJzY + gbox.getImage("zjm_an_jz").height],[tempJzX,tempJzY + gbox.getImage("zjm_an_jz").height]];
				},
				myclick : function()
				{	
					bulidingCtr = !bulidingCtr;
					curGroup = 'cityMenu';
//					if(!bulidingCtr)
//						curGroup = 'cityMenu';
					
					resCtr = false;				
					Building.getBuildingList(doBuildingList);								
				},
				blit : function()
				{
					var zim_an_bjX;
					 var tempOffset=0;
					 if(document.body.clientWidth > 1440)
					 {
						tempOffset = 1440;
					 }
					 else
					 {
						tempOffset = document.body.clientWidth;
					 }
					if(tempOffset > 1200)
					{
						zim_an_bjX = (tempOffset - 185) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - 185);
					}
					var offsetHeigth = 0;
					if(document.body.clientHeight > gbox.getScreenH())
					{
						offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
					else
					{
						offsetHeigth = 0;
					}

				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
				    var tempJzY = zim_an_bjY + gbox.getImage("zjm_an_jz").height/4 + 100;
				    var tempJzX = zim_an_bjX + 185 - gbox.getImage("zjm_an_jz").width;
					if(((this.poly[0][0] < touchMoveX) && (touchMoveX < this.poly[1][0])) && ((this.poly[0][1] < touchMoveY) && (touchMoveY < this.poly[2][1])))
						 {
							 	gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'zjm_an_jz_01',
										tile : 0,
										dx :tempJzX,
								        dy :tempJzY,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
								   }); 
						 }
						 else
						 {
						 		gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'zjm_an_jz',
									tile : 0,
									dx :tempJzX,
								    dy :tempJzY,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							   }); 
						 }
				}
			});

			//资源
			gbox.addObject(
			{ 
				id : 'resources',
				group : 'levelMenu_1',
				tileset : 'zjm_an_zy',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{	
				},
				first : function() 
				{	
					var zim_an_bjX;
					 var tempOffset=0;
					 if(document.body.clientWidth > 1440)
							{
							      tempOffset = 1440;
							}
					 else
							{
							     tempOffset = document.body.clientWidth;
							}
					if(tempOffset > 1200)
					{
						zim_an_bjX = (tempOffset - 185) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - 185);
					}
					var offsetHeigth = 0;
					if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
					else
					{
							offsetHeigth = 0;
					}
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
				    var tempJzY = zim_an_bjY + gbox.getImage("zjm_an_jz").height/4 + 20;
				    var tempJzX = zim_an_bjX + 185 - gbox.getImage("zjm_an_jz").width;
				    this.poly = [[tempJzX,tempJzY],[tempJzX + gbox.getImage("zjm_an_jz").width,tempJzY],[tempJzX + gbox.getImage("zjm_an_jz").width,tempJzY + gbox.getImage("zjm_an_jz").height],[tempJzX,tempJzY + gbox.getImage("zjm_an_jz").height]];	
				},
				myclick : function()
				{
					resCtr = !resCtr;
					curGroup = 'cityMenu';
//					if(!resCtr)
//						curGroup = 'cityMenu';
					
					bulidingCtr  = false;
					//getCharacterResource(doCharacterResource);
				},
				blit : function()
				{
                    var zim_an_bjX;
                    var tempOffset=0;
					 if(document.body.clientWidth > 1440)
							{
							      tempOffset = 1440;
							}
					 else
							{
							     tempOffset = document.body.clientWidth;
							}
					if(tempOffset > 1200)
					{
						zim_an_bjX = (tempOffset - 185) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - 185);
					}
					var offsetHeigth = 0;
					if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
					else
					{
							offsetHeigth = 0;
					}
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop - 202 ;
				    var tempJzY = zim_an_bjY + gbox.getImage("zjm_an_jz").height/4 + 20;
				    
				    var tempJzX = zim_an_bjX + 185 - gbox.getImage("zjm_an_jz").width;
						if(((this.poly[0][0] < touchMoveX) && (touchMoveX < this.poly[1][0])) && ((this.poly[0][1] < touchMoveY) && (touchMoveY < this.poly[2][1])))
						{
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'zjm_an_zy_01',
								tile : 0,
								dx :tempJzX,
								dy :tempJzY,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						   }); 
						}
						else
						{
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'zjm_an_zy',
								tile : 0,
								dx :tempJzX,
								dy :tempJzY,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						   }); 
						}
				}
			});
};
var addKingExpValue = 0;
var zim_an_bjY;
var addkingCnt = 0;
var drawCommonBtn = function(_curGroup,_group,_layer){
	  //绘制 聊天菜单 
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
    //chatInfo = new Array();
    //chatMenu(0,575,_group,_layer);

   //画 头像属性
    
	gbox.addObject(
	{ 
		id : 'headItem',//任务条
		group : _curGroup,
		tileset : 'zjm_jztx_1',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [], [], [],[]],
		initialize : function()
		{	
//			chatList(_group);
		},
		first : function() 
		{	
			var zim_an_bjX = 0 + document.body.scrollLeft ;
			var offsetHeigth = 0;
			if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
			else
					{
							offsetHeigth = 0;
					}
			zim_an_bjY = 0 +  document.body.scrollTop ;
			this.poly = [[zim_an_bjX,zim_an_bjY],[zim_an_bjX +gbox.getImage("zjm_jztx_1").width, zim_an_bjY],[zim_an_bjX +gbox.getImage("zjm_jztx_1").width,zim_an_bjY + gbox.getImage("zjm_jztx_1").height],[zim_an_bjX,zim_an_bjY + gbox.getImage("zjm_jztx_1").height]];
		},
		myclick : function()
		{
			var zim_an_bjX = 0 +  document.body.scrollLeft ;
			if((lastTouchMoveX > (6 + zim_an_bjX) && lastTouchMoveX < (94 + zim_an_bjX)) && (lastTouchMoveY > zim_an_bjY && lastTouchMoveY < (zim_an_bjY + 88)))
			{
				loadingImageList['monarch'].load(
		        			getClickObjectIndex(),
		        			monarchLoadImage,
		            		function(){
		        				User.getCharacterInfo(doCharacterInfo);
		            		}
		          );
			}else
			    curGroup = 'cityMenu';
		},
		blit : function()
		{
			var zim_an_bjX = 0 + document.body.scrollLeft ;
			var offsetHeigth = 0;
			if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
			else
					{
							offsetHeigth = 0;
					}
			var zim_an_bjY = 0 +  document.body.scrollTop ;
		    if(typeof(gbox.getImage("" + charImage)) != "undefined")
		    {
			   gbox.drawImage(charImage,zim_an_bjX + 27,zim_an_bjY + 24); 
		    }
		    else
		    {
		    	gbox.drawImage("js_roleBright",zim_an_bjX + 27,zim_an_bjY + 24);
		    }
		
		    gbox.drawImage("zjm_jztx_1",zim_an_bjX,zim_an_bjY);
		    gbox.drawImage("zjm_jztx_3",zim_an_bjX + 29,zim_an_bjY + 85);
		    //显示君主经验
		    if(addKingExpValue != 0)
		    {
		    	if(++addkingCnt < 30){
		    		var fontW = gbox.getTextWidth(addKingExpValue,30);
		    		var addKEX = 30 + (75 - fontW)/2;
		    		if(addKingExpValue > 0){
		    			gbox.drawDanceString( "+" + addKingExpValue, addKEX,zim_an_bjY + 75,30,'#000000','#00FF00');
		    		}
		    		else{
		    			gbox.drawDanceString( addKingExpValue, addKEX,zim_an_bjY + 75,30,'#000000','#FF0000');
		    		}
		    			
		    	}
		    	else{
			    	addkingCnt = 0;
			    	addKingExpValue = 0;
		    	}	
		    }
		    
			var limitValue = expLimit;
			var bh = Math.floor(((81) * charExp) / limitValue); 		    
	        gbox.setClip(gbox.getBufferContext(),zim_an_bjX + 29,zim_an_bjY+85,bh,31);	        
	        gbox.drawImage("zjm_jztx_2",zim_an_bjX + 29,zim_an_bjY + 85);         
	        gbox.restoreClip(gbox.getBufferContext());
	        
	        gbox.drawString(charName, zim_an_bjX + 190, zim_an_bjY + 25, "#FFFFFF", 12);	
			switch(charCountry)
			{
				case "夏":
				 gbox.drawImage("zjm_47",zim_an_bjX + 106, zim_an_bjY + 19); 
				 break;
				case "楚":
				 gbox.drawImage("zjm_43",zim_an_bjX + 106, zim_an_bjY + 19); 
				 break;
				case "梁":
				 gbox.drawImage("zjm_44",zim_an_bjX + 106, zim_an_bjY + 19); 
				 break;
				case "隋":
				 gbox.drawImage("zjm_45",zim_an_bjX + 106, zim_an_bjY + 19); 
				 break;
			    case "魏":
				 gbox.drawImage("zjm_46",zim_an_bjX + 106, zim_an_bjY + 19); 
				 break;
				
			}
			gbox.drawString(allianceName, zim_an_bjX + 190, zim_an_bjY + 54, "#FFFFFF", 12);
			
			//gbox.drawString(charLevel, zim_an_bjX + 25, zim_an_bjY + 26, "#ffffff", 13);
			var strW = gbox.getTextWidth(charLevel,14);
			var cntX = zim_an_bjX + 17 + (31 - strW)/2;
			var cntY = zim_an_bjY + 20 + (28 - 14)/2;
			gbox.drawDanceString(charLevel, cntX,cntY,14,'#000000','#ffffff');
			
			if(((zim_an_bjX + 40 < touchMoveX) && (touchMoveX < (zim_an_bjX + 40 + 70))) && ((zim_an_bjY + 92 < touchMoveY) && (touchMoveY < (zim_an_bjY + 92 + 24))))
	        {
				var tempOffset = 15;
				var tempH = tooltip.body_fontSize + tooltip.line_space*2;
                var tempW = tooltip.width;
                var mouseX = 0;
                var mouseY = 0;
				if((gbox.getScreenW() - touchMoveX) < tempW)	
				{
					mouseX = gbox.getScreenW() - tempW - 40;
				}
				else
				{
					mouseX = touchMoveX;
				}
				
				if((gbox.getScreenH() - touchMoveY) < tempH)	
				{
					mouseY = gbox.getScreenH() - tempH - 20;
				}
				else
				{
					mouseY = touchMoveY;
				}
				if(touchMoveX !=0)
				tooltip.drawLineDesc(gbox.getBufferContext(),mouseX + tempOffset,mouseY + tempOffset,"君主经验值：" + charExp + " / " + expLimit); 
	        }
		}
	});
	 //画内外城选择BOTTON
	drawWorldBtn(_group);
	

	// 人物头像功能飘动框1
	gbox.addObject(
	{ 
		id : 'commandBody_1',
		group : 'levelMenu_1',
		tileset : 'hit',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [0,0], [0,0], [0,0],[0,0]],
		initialize : function()
		{	
		},
		first : function() 
		{	
			var zim_an_bjX = 0 + document.body.scrollLeft ;
			var offsetHeigth = 0;
			if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
			else
					{
							offsetHeigth = 0;
					}
			var zim_an_bjY = 0 +  document.body.scrollTop ;
			this.poly = [ [130 + zim_an_bjX,79 + zim_an_bjY], [161+ zim_an_bjX,79+ zim_an_bjY], [161+ zim_an_bjX,113+ zim_an_bjY],[130+ zim_an_bjX,113+ zim_an_bjY]];			
		},
		myclick : function()
		{

		},
		blit : function()
		{
			if (mouseArea(this)) {
				gbox.blitTile(gbox.getBufferContext(),
				{
					tileset : 'hit',
					tile : 0,
					dx :this.poly[0][0],
					dy :this.poly[0][1],
					fliph : this.fliph,
					flipv : this.flipv,
					camera : this.camera,
					alpha : 1.0
			    }); 
			};
		}
	});
	
	// 人物头像功能飘动框2
	gbox.addObject(
	{ 
		id : 'commandBody_2',
		group : 'levelMenu_1',
		tileset : 'hit',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [0,0], [0,0], [0,0],[0,0]],
		initialize : function()
		{	
		},
		first : function() 
		{	
			var zim_an_bjX = 0 + document.body.scrollLeft ;
			var offsetHeigth = 0;
			if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
			else
					{
							offsetHeigth = 0;
					}
			var zim_an_bjY = 0 +  document.body.scrollTop ;
			this.poly = [ [zim_an_bjX + 168,zim_an_bjY +79], [zim_an_bjX + 202,zim_an_bjY +79], [zim_an_bjX + 202,zim_an_bjY +113],[zim_an_bjX + 168,zim_an_bjY +113]];
		},
		myclick : function()
		{
			chatIndex = 4;
		},
		blit : function()
		{
			if (mouseArea(this)) {
				gbox.blitTile(gbox.getBufferContext(),
				{
					tileset : 'hit',
					tile : 0,
					dx :this.poly[0][0],
					dy :this.poly[0][1],
					fliph : this.fliph,
					flipv : this.flipv,
					camera : this.camera,
					alpha : 1.0
			    }); 
			};
		}
	});

	// 人物头像功能飘动框3
	gbox.addObject(
	{ 
		id : 'commandBody_3',
		group : 'levelMenu_1',
		tileset : 'hit',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [0,0], [0,0], [0,0],[0,0]],
		initialize : function()
		{	
		},
		first : function() 
		{	
			var zim_an_bjX = 0 + document.body.scrollLeft ;
			var offsetHeigth = 0;
			if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
			else
					{
							offsetHeigth = 0;
					}
			var zim_an_bjY = 0 +  document.body.scrollTop ;
			this.poly = [ [zim_an_bjX + 207,zim_an_bjY + 79], [zim_an_bjX + 238,zim_an_bjY + 79], [zim_an_bjX + 238,zim_an_bjY + 113],[zim_an_bjX + 207,zim_an_bjY + 113]];
		},
		myclick : function()
		{
	    	loadingImageList['Mail'].load(
	        			getClickObjectIndex(),
	        			mailLoadImage,
	            		function(){
	        				console.log("邮件");
	        				MailFunction.getMailList(1,3,doMailList);
	        				//sendMailDraw = true;
	        				mailIds = new Array();
	        				Inbox(getClickObjectIndex(),_group,_layer);
	        				changeMap(_layer);
	            		}
	        );

		},
		blit : function()
		{
			if (mouseArea(this)) {
				gbox.blitTile(gbox.getBufferContext(),
				{
					tileset : 'hit',
					tile : 0,
					dx :this.poly[0][0],
					dy :this.poly[0][1],
					fliph : this.fliph,
					flipv : this.flipv,
					camera : this.camera,
					alpha : 1.0
			    }); 
			};
		}
	});
	
	// 人物头像功能飘动框4
	gbox.addObject(
	{ 
		id : 'commandBody_4',
		group : 'levelMenu_1',
		tileset : 'hit',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [0,0], [0,0], [0,0],[0,0]],
		initialize : function()
		{	
		},
		first : function() 
		{	
			var zim_an_bjX = 0 + document.body.scrollLeft ;
			var offsetHeigth = 0;
			if(document.body.clientHeight > gbox.getScreenH())
					{
							offsetHeigth = document.body.clientHeight - gbox.getScreenH();
					} 
			else
					{
							offsetHeigth = 0;
					}
			var zim_an_bjY = 0 +  document.body.scrollTop ;
			this.poly = [ [zim_an_bjX + 244,zim_an_bjY + 79], [zim_an_bjX + 278,zim_an_bjY + 79], [zim_an_bjX + 278,zim_an_bjY + 113],[zim_an_bjX + 244,zim_an_bjY + 113]];
		},
		myclick : function()
		{
			chatIndex = 4;				
		},
		blit : function()
		{
			if (mouseArea(this)) {
				gbox.blitTile(gbox.getBufferContext(),
				{
					tileset : 'hit',
					tile : 0,
					dx :this.poly[0][0],
					dy :this.poly[0][1],
					fliph : this.fliph,
					flipv : this.flipv,
					camera : this.camera,
					alpha : 1.0
			    }); 
			};
		}
	});
 
   taskItem(_group,_layer);
   drawWorldRrightBtn(_group,_layer);
};



var intersectRect = function(){
  	if(worldMapStartX>=-100 && worldMapStartY>=-100 && 
  		worldMapStartX<=2000 && worldMapStartY<=2000) 
  	    return true;
  	return false;
}

var screenX = 0;//屏幕左上角相对整个地图左上角的偏移（px）
var screenY = 0;
var mainCityX = 0;//玩家城池的位置（px）
var mainCityY = 0;
var mapData;//地图背景图片数据
var cityPoint;//建城点
var playerCities;//玩家城池
var resources;//资源
var creeps;//野怪
var capital;//国都
var knownCity;//名城
var nationalBoundaries;//国界线
var radarData;//雷达图数据
var points;
var scale = 15;
var creepsResImg = new Array()
var creepCnt = 0;
var mcIndexX = 0;
var mcIndexY = 0;
var doInitWorldData = function(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	mainCityX = data.cityX;
	mainCityY = data.cityY;
//	console.log("000000000___mainCityX ========== " + mainCityX + ", mainCityY ===========" + mainCityY);
    screenX = mainCityX - gbox.getScreenW()/2;
    screenY = mainCityY - gbox.getScreenH()/2;
//    console.log("0000000000___screenX ========== " + screenX + ", screenY ===========" + screenY);
    creepCnt = 0;
    mapData = new Array();//地图数据
    for(var i=0; i< data.image.length; i++)
    {
    	
    		var temp = data.image[i];
    		mapData[i] = {
				x:temp.x,
				y:temp.y,
				b:temp.b,
				f:temp.f
    		};
    } 

    cityPoint = new Array();
    playerCities = new Array();
    resources = new Array();
    creeps = new Array();
    capital = new Array();
    knownCity = new Array();
    var tmp_city_data = eval(data.cityData);
    for(var i=0; i<tmp_city_data.length-1; i++)
    {
    	var temp_data = tmp_city_data[i];
    	var type = temp_data[0];//地块类型(1.建城点,3.玩家城池,4.资源,5.野怪,6.国都,7.名城)
    	switch(type)
    	{
		case 1://建城点
			var temp = {
            			landType:temp_data[0],//地块类型（1）
            			x:temp_data[1],//x坐标
            			y:temp_data[2],//y坐标
            			countryCode:temp_data[3],//国家代号
            			terrainCode:temp_data[4],//地形代号
            			addFoodPercent:temp_data[5],//增加粮食产量百分比
            			addWoodPercent:temp_data[6],//增加木材产量百分比
            			addStonePercent:temp_data[7],//增加石料产量百分比
            			addIronstonePercent:temp_data[8]//增加铁矿产量百分比
    	    	};
				cityPoint.push(temp);
    		break;
    	case 3://玩家城池
    		var temp = {
                		landType:temp_data[0],//地块类型（1）
                		x:temp_data[1],//x坐标
                		y:temp_data[2],//y坐标
                		charId:temp_data[3],//君主id（用于点击查询）
                		name:temp_data[4],//君主名（绘制）
                		sphere:temp_data[5],//势力范围
                		cityAppearance:temp_data[6],//城池外观（对应 1-5编号的图片）
            	};
    		
			var cx = getCx(temp.x,temp.y);
			var cy = getCy(temp.x,temp.y);
    		if(cx == mainCityX && cy == mainCityY)
    		{
    			mcIndexX = temp.x;
    			mcIndexY = temp.y;
    		}
    		
        	playerCities.push(temp);
    		break;
    	case 4://资源
    		var temp = {
                    	landType:temp_data[0],//地块类型（1）
                    	x:temp_data[1],//x坐标
                    	y:temp_data[2],//y坐标
                    	name:temp_data[3],//资源名
                    	exterior:temp_data[4],//外观
                };
            resources.push(temp);
    		break;
    	case 5://野怪
    		var temp =  {
                       landType:temp_data[0],//地块类型（1）
                       x:temp_data[1],//x坐标
                       y:temp_data[2],//y坐标
                       name:temp_data[3],//野怪名
                       exterior:temp_data[4],//外观
                };
    		creepsResImg[creepCnt++] = "" + temp.exterior;
            creeps.push(temp);
    		break;
    	case 6://国都
    		var temp =  {
                       landType:temp_data[0],//地块类型（1）
                       x:temp_data[1],//x坐标
                       y:temp_data[2],//y坐标
                       name:temp_data[3],//国都名
                       exterior:temp_data[4],//外观
                };
            capital.push(temp);
    		break;
    	case 7://名城
    		var temp = {
                        landType:temp_data[0],//地块类型（1）
                        x:temp_data[1],//x坐标
                        y:temp_data[2],//y坐标
                        name:temp_data[3],//名城名
                        exterior:temp_data[4],//外观
                };
            knownCity.push(temp);
    		break;
    	}
    }
    
    nationalBoundaries = new Array();//国界线
	var tmpIndex = 0;
	var _line_data =  tmp_city_data[tmp_city_data.length-1];
    for(var a=0; a < _line_data.length; a+=3)
    {
    	nationalBoundaries[tmpIndex++] = {
                x:_line_data[a],//x坐标
                y:_line_data[a+1],//y坐标
                type:_line_data[a+2],//国界线类型（8：上方，4：下方，2：左边，1：右边）
        };
    }  
	
	points = new Array();
	var pointCnt = 0;
	var tempPoints = eval(data.radarData.points);
	for(var i=0; i<tempPoints.length; i+=3)
	{
		points[pointCnt++] = {  x:tempPoints[i],
		                      y:tempPoints[i+1],
		                      tp:tempPoints[i+2],
		};
	} 
	
	var temp = data.radarData;
	radarData = {  width:temp.width,
			       height:temp.height,
			       startX:temp.startX,
			       startY:temp.startY,
			       points:temp.points
			    };
	
	WorldScreen();
    changeMap('worldScreen_Layer');
}

var doWorldData = function(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	mainCityX = data.cityX;
	mainCityY = data.cityY;
//    screenX = mainCityX - gbox.getScreenW()/2;
//    screenY = mainCityY - gbox.getScreenH()/2;
    
    creepCnt = 0;
    mapData = new Array();//地图数据
    for(var i=0; i< data.image.length; i++)
    {
    	
    		var temp = data.image[i];
    		mapData[i] = {
				x:temp.x,
				y:temp.y,
				b:temp.b,
				f:temp.f
    		};
    } 

    cityPoint = new Array();
    playerCities = new Array();
    resources = new Array();
    creeps = new Array();
    capital = new Array();
    knownCity = new Array();
    var tmp_city_data = eval(data.cityData);
    for(var i=0; i<tmp_city_data.length-1; i++)
    {
    	var temp_data = tmp_city_data[i];
    	var type = temp_data[0];//地块类型(1.建城点,3.玩家城池,4.资源,5.野怪,6.国都,7.名城)
    	
    	switch(type)
    	{
		case 1://建城点
			var temp = {
            			landType:temp_data[0],//地块类型（1）
            			x:temp_data[1],//x坐标
            			y:temp_data[2],//y坐标
            			countryCode:temp_data[3],//国家代号
            			terrainCode:temp_data[4],//地形代号
            			addFoodPercent:temp_data[5],//增加粮食产量百分比
            			addWoodPercent:temp_data[6],//增加木材产量百分比
            			addStonePercent:temp_data[7],//增加石料产量百分比
            			addIronstonePercent:temp_data[8]//增加铁矿产量百分比
    	    	};
				cityPoint.push(temp);
    		break;
    	case 3://玩家城池
    		var temp = {
                		landType:temp_data[0],//地块类型（1）
                		x:temp_data[1],//x坐标
                		y:temp_data[2],//y坐标
                		charId:temp_data[3],//君主id（用于点击查询）
                		name:temp_data[4],//君主名（绘制）
                		sphere:temp_data[5],//势力范围
                		cityAppearance:temp_data[6],//城池外观（对应 1-5编号的图片）
            	};
        	playerCities.push(temp);
    		break;
    	case 4://资源
    		var temp = {
                    	landType:temp_data[0],//地块类型（1）
                    	x:temp_data[1],//x坐标
                    	y:temp_data[2],//y坐标
                    	name:temp_data[3],//资源名
                    	exterior:temp_data[4],//外观
                };
            resources.push(temp);
    		break;
    	case 5://野怪
    		var temp =  {
                       landType:temp_data[0],//地块类型（1）
                       x:temp_data[1],//x坐标
                       y:temp_data[2],//y坐标
                       name:temp_data[3],//野怪名
                       exterior:temp_data[4],//外观
                };
    		creepsResImg[creepCnt++] = 'sjdt_zjm_32'/* + Number(1 + Math.round(Math.random()*2))*/;
            creeps.push(temp);
    		break;
    	case 6://国都
    		var temp =  {
                       landType:temp_data[0],//地块类型（1）
                       x:temp_data[1],//x坐标
                       y:temp_data[2],//y坐标
                       name:temp_data[3],//国都名
                       exterior:temp_data[4],//外观
                };
            capital.push(temp);
    		break;
    	case 7://名城
    		var temp = {
                        landType:temp_data[0],//地块类型（1）
                        x:temp_data[1],//x坐标
                        y:temp_data[2],//y坐标
                        name:temp_data[3],//名城名
                        exterior:temp_data[4],//外观
                };
            knownCity.push(temp);
    		break;
    	}
    }
    
    nationalBoundaries = new Array();//国界线
	var tmpIndex = 0;
	var _line_data =  tmp_city_data[tmp_city_data.length-1];
    for(var a=0; a < _line_data.length; a+=3)
    {
    	nationalBoundaries[tmpIndex++] = {
                x:_line_data[a],//x坐标
                y:_line_data[a+1],//y坐标
                type:_line_data[a+2],//国界线类型（8：上方，4：下方，2：左边，1：右边）
        };
    }  
	
	points = new Array();
	var pointCnt = 0;
	var tempPoints = eval(data.radarData.points);
	for(var i=0; i<tempPoints.length; i+=3)
	{
		points[pointCnt++] = {  x:tempPoints[i],
		                      y:tempPoints[i+1],
		                      tp:tempPoints[i+2],
		};
	} 
	
	var temp = data.radarData;
	radarData = {  width:temp.width,
			       height:temp.height,
			       startX:temp.startX,
			       startY:temp.startY,
			       points:temp.points,
			    };
	WorldScreen();
    changeMap('worldScreen_Layer');
}

var isZJInfo = false;
var junzhuInfo = function(index,com_group,com_layer){
	if(com_group == 'cityMenu'){
		gbox.setRenderOrder([com_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([com_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isZJInfo = true;
	var bW = gbox.getImage('ckjz_zjm_01').width;
	var bH = gbox.getImage('ckjz_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 20;
	var exitY = backdropY - 6;		    
		gbox.addObject(
			{ 
				id : 'junzhuInfo',
				group : 'levelMenu_1',
				tileset : 'ckjz_zjm_01',
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
				
					 if(((exitButtonCoordinateMiddle.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinateMiddle.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinateMiddle.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinateMiddle.y + gbox.getImage("ty_an_17").height))){
						displayDestroy();
						exit(index);
						switch(com_layer)
						{
							case 'cityMenuLayer':
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								break;
							case 'environsScreen_Layer':
								EnvironsScreen();
								changeMap('environsScreen_Layer');
								break;
							case 'worldScreen_Layer':
						 		WorldScreen();
						        changeMap('worldScreen_Layer');
								break;
							case 'jiagongfangScreen_Layer':
		                      	jiaGongfang();
		                        changeMap('jiagongfangScreen_Layer');
								break;
							case 'taiweifuScreen_Layer':
	                          	taiweifu();
	                     		changeMap('taiweifuScreen_Layer');	
								break;
							case 'jishiScreen_Layer':
		                      	jishiMenu();
		                        changeMap('jishiScreen_Layer');
								break;
							case 'jiuguanScreen_Layer':
		                     	jiuguan();
		                     	changeMap('jiuguanScreen_Layer');	
								break;
								
						}
					}else // 讨伐&派遣
					if(((675 < lastTouchMoveX) && (lastTouchMoveX < (675 + 82))) && 
							((488 < lastTouchMoveY) && (lastTouchMoveY < (488 + 25)))){
						if(charId == kingData.characterId){
							alert('出征目标不能是自己');
							return;
						}else{
							//查询是否是盟友
							Alliance.isAlliance(kingData.characterId,function(data){
						    	if(typeof(data.error) != "undefined"){
						    		alert("系统提示：" + data.error);
						    		return;
						    	}
						    	//关闭当前窗口
						    	displayDestroy();
						    	exit(index);
						    	//打开武将出征界面
						    	doBattleInWorld(data,kingData);
						    });
						}
					}else{
						junzhuInfo(getClickObjectIndex(),com_group,com_layer);
						changeMap(com_layer);						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isZJInfo)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'ckjz_zjm_01',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });
					    var fontW = gbox.getTextWidth("加为好友",14);
                        var btnX = 496;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("加为好友", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("加为好友", backX, backY,10);
                        var btnX = 585;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);  
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("联盟邀请", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("联盟邀请", backX, backY,10);
                        var btnX = 675;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("发动进攻", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("发动进攻", backX, backY,10);
                        var btnX = 766;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("发送信息", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("发送信息", backX, backY,10);
                        var btnX = 857;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("标为仇人", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("标为仇人", backX, backY,10);
				        if(typeof(kingInfo) != "undefined" && typeof(kingData) != "undefined"){
					        for(var i=0; i<4; i++){
					        	for(var j=0; j<2; j++){
//					        		gbox.drawString("" + kingInfo[i][j],572 + (j * 168), 252 + (i*33),'#000000',16);
					        		gbox.drawText(kingInfo[i][j],572 + (j * 168), 252 + (i*33),3);
					        	}
					        }
					    if(typeof(gbox.getImage(kingData.image)) != "undefined")
					           gbox.drawImage(kingData.image,847,269); 				        
                        if(kingData.description!=null)
                        {
//                        	gbox.pointTxtRect(kingData.description,505,396,275,16,'#ffffff','#000000');
                        	gbox.drawLineBreakText(kingData.description,505,396,12,250);
                        }					     
				        }
				        
						   if(((exitButtonCoordinateMiddle.x < touchMoveX) && (touchMoveX < exitButtonCoordinateMiddle.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinateMiddle.y < touchMoveY) && (touchMoveY < exitButtonCoordinateMiddle.y + gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinateMiddle.x,exitButtonCoordinateMiddle.y);						   	   
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinateMiddle.x,exitButtonCoordinateMiddle.y);	
						   }
					 }						
				}
			});

};

var cancelSpeedForm = ["取消","进入","加速"];
var cancel_speed_Menu = function(x,y,index)//取消_加速
{
	exit(index);
	demolition_upgrade = new Array();
	cancel_speed = new Array();
	isDrawUI[index] = true;
	cancel_speed[index] = true;
	demolition_upgrade[index] = false;
	var btnW = gbox.getImage('ty_an_06').width;
	var btnH = gbox.getImage('ty_an_06').height;
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	gbox.addObject(
			{ 
				id : 'cancel_speed' + index,
				group : 'levelMenu_1',
				tileset : 'ty_an_08',
				x : 0,
				y : 0,
			    anim : null,
				action : null,
				frame : 0,
				poly : [ [x,y], [x + 177,y], [x + 177,y + 26],[x,y + 26]],
				initialize : function()
				{
					cancel_speed[index] = true;
				    enterCityMenu('cityMenu');
				    changeMap('cityMenuLayer');	
				},
				first : function() 
				{	

				},
				myclick : function()
				{
						  if((lastTouchMoveX > x && lastTouchMoveX < (x + btnW)) && (lastTouchMoveY > y && lastTouchMoveY< (y + 26)))
						  {
							 buildCancel(index);
						  	 isDrawUI[index] = false;
						  	 clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];	
						  	curGroup = 'cityMenu';
						  }else 
						  if((lastTouchMoveX > x + btnW && lastTouchMoveX < (x + btnW*2)) && (lastTouchMoveY > y && lastTouchMoveY< (y + 26)))
						  {//进入
								     isDrawUI[index] = false;
								  	 clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];	
			                         console.log("________________进入");
			                         if(index == 27)
			                        	 return;
			                         cancel_speed[index] = false;
			                         buildEnter(index);
						  }else 
						  if((lastTouchMoveX > x + btnW*2 && lastTouchMoveX < (x + btnW*3)) && (lastTouchMoveY > y && lastTouchMoveY< (y + 26)))
						  {//加速	
						  	 systemSpeedup(index,"建筑加速");
						  	 isDrawUI[index] = false;
						  	 clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];	
						  	 console.log("________________加速");
						  }
						  
				},
				blit : function()
				{
				  if(isDrawUI[index] && cancel_speed[index]){ 
//					 if(buildList[index][0] != 'build_empty' || buildList[index][0] != 'build_src')
//					 {
					  if(!isHoursebuilding /*&& !generalDrawBg && !isJunqing*/)
					  {

							for(var i=0; i<cancelSpeedForm.length; i++)
							{
								gbox.blitTile(gbox.getBufferContext(),
										{
											tileset : 'ty_an_08',
											tile : 0,
											dx :x + (i * btnW),
											dy :y,
											fliph : this.fliph,
											flipv : this.flipv,
											camera : this.camera,
											alpha : 1.0
										});
								
								var btnX = x + (i*btnW);
								var btnY = y;
								if(index == 27){
									if(i == 1){
										gbox.drawImage('ty_an_05',btnX,btnY);
									}else
									if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
								    {
								        gbox.drawImage('ty_an_06',btnX,btnY);
								    }
								}else{
									if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
							        {
							            gbox.drawImage('ty_an_06',btnX,btnY);
							        }
								}
					               var strW = gbox.getTextWidth(cancelSpeedForm[i],14);
					               var strX = btnX + (btnW - strW)/2 - 2;
					               var strY = btnY + (btnH - 14)/2;
					               gbox.drawDanceString(cancelSpeedForm[i], strX, strY,14,'#000000','#FFFFFF');	
								
							}
					  }	
//					  }		
				   }
				}
			});

}
var upqradeForm = ["拆除","进入","升级"];
var demolition_upgrade_Menu = function(x,y,index)//拆除_升级
{
    exit(index);
	demolition_upgrade = new Array();
	cancel_speed = new Array();
	isDrawUI[index] = true;
	demolition_upgrade[index] = true;
	cancel_speed[index] = false;
	var btnW = gbox.getImage('ty_an_06').width;
	var btnH = gbox.getImage('ty_an_06').height;
	var buildToolTipIndex;
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	gbox.addObject(
			{ 
				id : 'levelMenu' + index,
				group : 'levelMenu_1',
				tileset : 'ty_an_08',
				x : 0,
				y : 0,
			    anim : null,
				action : null,
				frame : 0,
				poly : [ [x,y], [x + 177,y], [x + 177,y + 26],[x,y + 26]],
				initialize : function()
				{	
					demolition_upgrade[index] = true;				
				    enterCityMenu('cityMenu');
				    changeMap('cityMenuLayer');	
				},
				first : function() 
				{	

				},
				myclick : function()
				{
						  if((lastTouchMoveX > x && lastTouchMoveX < (x + btnW)) && (lastTouchMoveY > y && lastTouchMoveY< (y + 26)))
						  {//拆除
							buildDemolition(index);		  	
						  	isDrawUI[index] = false;
						  	clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
						  	curGroup = 'cityMenu';
						  }else 
						  if((lastTouchMoveX > x + btnW && lastTouchMoveX < (x + btnW*2)) && (lastTouchMoveY > y && lastTouchMoveY< (y + 26)))
						  {//进入
							 isDrawUI[index] = false;
							 clickObjectList[index].poly= [[0,0],[0,0],[0,0],[0,0]];
	                         console.log("________________进入");
	                         if(index == 27)
	                        	 return;
	                         demolition_upgrade[index] = false;
	                         buildEnter(index);
						  
						  }else 
						  if((lastTouchMoveX > x + btnW*2 && lastTouchMoveX < (x + btnW*3)) && (lastTouchMoveY > y && lastTouchMoveY< (y + 26)))
						  {//升级
							 buildUpgrade(index);
						  	 isDrawUI[index] = false;
						  	 clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
						  	curGroup = 'cityMenu';
						  }	
				},
				blit : function()
				{
				  if(isDrawUI[index] && demolition_upgrade[index]){
//					 if(buildList[index][0] != 'build_empty' || buildList[index][0] != 'build_src')
//					 {
					 	//console.log("==" + demolition_upgrade[index]);
					  if(!isHoursebuilding/* && !generalDrawBg && !isJunqing*/)
					  {
							for(var i=0; i<upqradeForm.length; i++)
							{
								gbox.blitTile(gbox.getBufferContext(),
										{
											tileset : 'ty_an_08',
											tile : 0,
											dx :x + (i * btnW),
											dy :y,
											fliph : this.fliph,
											flipv : this.flipv,
											camera : this.camera,
											alpha : 1.0
										});
								
								var btnX = x + (i*btnW);
								var btnY = y;
								
								if(index == 27){
									if(i == 1){
										gbox.drawImage('ty_an_05',btnX,btnY);
									}else
									if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
								    {
								        gbox.drawImage('ty_an_06',btnX,btnY);
								    }
								}else{
									if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
							        {
							            gbox.drawImage('ty_an_06',btnX,btnY);
							        }
								}
					               var strW = gbox.getTextWidth(upqradeForm[i],14);
					               var strX = btnX + (btnW - strW)/2 - 2;
					               var strY = btnY + (btnH - 14)/2;
					               gbox.drawDanceString(upqradeForm[i], strX, strY,14,'#000000','#FFFFFF');  
							}
							
							
							for(var i=0; i<upqradeForm.length; i++)
							{
								var btnX = x + (i*btnW);
								var btnY = y;
								if(typeof(buildings[index]) != 'undefined')
								{	 
									if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
							        {
										 if(i == 0)//拆除Tooltip
										 {
												var tempOffset = 15;
												var tempH = tooltip.computDemolish(gbox.getBufferContext(),buildings[index]).height;
			                                    var tempW = tooltip.width;
			                                    var mouseX = 0;
			                                    var mouseY = 0;
												if((gbox.getScreenW() - touchMoveX) < tempW)	
												{
													mouseX = gbox.getScreenW() - tempW - 40;
												}
												else
												{
													mouseX = touchMoveX;
												}
												
												if((gbox.getScreenH() - touchMoveY) < tempH)	
												{
													mouseY = gbox.getScreenH() - tempH - 20;
												}
												else
												{
													mouseY = touchMoveY;
												}
												if(touchMoveX !=0)
												{
													tooltip.drawDemolish(gbox.getImage("toolTip"),gbox.getBufferContext(),mouseX + tempOffset,mouseY + tempOffset,buildings[index]); 
												} 
										 }else
									     if(i == 2)//升级Tooltip
									     {
												var tempOffset = 15;
												var tempH = tooltip.computUpgrade(gbox.getBufferContext(),buildings[index]).height;
			                                    var tempW = tooltip.width;
			                                    var mouseX = 0;
			                                    var mouseY = 0;
												if((gbox.getScreenW() - touchMoveX) < tempW)	
												{
													mouseX = gbox.getScreenW() - tempW - 40;
												}
												else
												{
													mouseX = touchMoveX;
												}
												
												if((gbox.getScreenH() - touchMoveY) < tempH)	
												{
													mouseY = gbox.getScreenH() - tempH - 20;
												}
												else
												{
													mouseY = touchMoveY;
												}
												if(touchMoveX !=0)
												{
													tooltip.drawUpgrade(gbox.getImage("toolTip"),gbox.getBufferContext(),mouseX + tempOffset,mouseY + tempOffset,buildings[index]); 
												} 
									     }
							        }

												
								}     

							}
					  }
	
	
//					  }	
				   }
				}
			});
}


var bfun_MenuButtonDown = function(obj)
{

	if (bTouch === true)
	{
		if (tool.pointInPoly([ touchStartX, touchStartY ], obj.poly))
		{
			return true;
		}
	}

	return false;

};

function drawLightArea(content,index,x,y)//画地块加亮区域
{
	
	if(mouseArea(content))
		{
			drawArcArray[index] = true;
		}
	else
		{
			drawArcArray[index] = false;
		}
	
	if(drawArcArray[index])
	{	
 			
		if(index == 27){
				gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'twf_' + epoch + '_l',
							tile : 0,
							dx :buildList[index][8] - 31,
							dy :buildList[index][3] - 85,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
						});				
		}
		else{
			if(buildList[index][0] == 'build_empty'){
				gbox.blitTile(gbox.getBufferContext(),
				{
					tileset : 'kd_' + epoch + '_l',
					tile : 0,
					dx :x,
					dy :y,
					fliph : this.fliph,
					flipv : this.flipv,
					camera : this.camera,
					alpha : 1.0
				});
			}
			
		}
		
//		if(typeof(buildCommonDesc[index]) == "undefined"){
//			gbox.drawMessageRect("建筑建造地块!", lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF');
//		}else{
//			gbox.drawMessageRect(buildCommonDesc[index], lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF');
//		}
			
	}	
}
var mouseArea = function(obj)
{
		if (tool.pointInPoly([ touchMoveX, touchMoveY ], obj.poly))
			{
				return true;
			}
	    return false;
};

var poressArea = function(obj)
{
		if (tool.pointInPoly([ lastTouchMoveX, lastTouchMoveY ], obj.poly))
			{
				return true;
			}
	    return false;
};

var drawTimer = function(tex,x,y,color)
{
	 gbox.blitSystemText(gbox.getBufferContext(),
			{
				text : text,
				color : '#ffff00',
				font : 'bold 20px sans-serif',
				x : x,
			    y : y
												
			});	
};
/*
 * type //建筑类型
 * index //坐标索引
 */

var houseBuild = function(type,index)
{   
	var version = "?v=1";
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	gbox.addObject(
			{ //主城建筑物
				id : 'house' + index,
				group : 'cityMenu',
				tileset : 'cjt_' + epoch,
				x : 0,
				y : 0,
			    anim : null,
				action : null,
				frame : 0,
				poly : [ [buildList[index][2],buildList[index][3]],[buildList[index][4],buildList[index][5]], [buildList[index][6],buildList[index][7]],[buildList[index][8],buildList[index][9]]],
				initialize : function()
				{//处理轮询主城地块建筑查找资源创建与否（重新加载）
//					if(gbox.getImage("house" + buuldType[index]) == null){
//						gbox.addImage("house" + buuldType[index], "images/cityArchitecture/house"+ buuldType[index] +".png"+version);
//						gbox.addTiles({id : "house" + buuldType[index],image :"house" + buuldType[index],tilew : 156,tileh : 160,tilerow : 1,gapx : 0,gapy : 0});
//						gbox.addImage("houseLight" + buuldType[index], "images/cityArchitecture/houseLight"+ buuldType[index] +".png"+version);
//						gbox.addTiles({id : "houseLight" + buuldType[index],image :"houseLight" + buuldType[index],tilew : 156,tileh : 160,tilerow : 1,gapx : 0,gapy : 0});	  
//				    }
				},
				first : function() 
				{

				},
				myclick : function()
				{
                    for(var i=0; i<28; i++){
                      	 var lotPoly = [ [buildList[i][2],buildList[i][3]],[buildList[i][4],buildList[i][5]], [buildList[i][6],buildList[i][7]],[buildList[i][8],buildList[i][9]]];
                      	 if(gbox._mouseArea(lotPoly,lastTouchMoveX,lastTouchMoveY)){
                      		lotIndex = i;
                      	}
                    }
					
					curBuildIndex = index;
					houseBuildIndex[index] = getClickObjectIndex();
					var houseImageW = gbox.getImage(buuldType[index]).width;
					var hitBtnW = gbox.getImage('ty_an_08').width * 3;
					var lx = (buildList[index][8] + ((houseImageW - hitBtnW)/2));
					var ly = buildList[index][3];
					//console.log("houseBuild___buildList["+index+"][0] ===== " + buildList[index][0]);
					if(buildList[index][0] == 'build_end'){

						if(buildList[index][1] == 'state_empty' && 
						   buildList[index][13] == 'state_demolition_empty'){
							demolition_upgrade_Menu(lx,ly,index);	
						}else
						if(buildList[index][1] == 'state_upgrade_start' ||
						   buildList[index][13] == 'state_demolition_start'){
							cancel_speed_Menu(lx,ly,index);
						}
					}
					changeMap('cityMenuLayer');	
				},
				blit : function()
				{
					if(buildList[index][0] != 'build_empty' && buildList[index][0] != 'build_start'){
						
						if(index != 27){
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'kd_' + epoch,
								tile : 0,
								dx :buildList[index][8],
								dy :buildList[index][3] - titleMapOffset,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
							 });						
						}
						
						if (mouseArea(this)) {
							if(index != 27 && index != 1 && 
									   typeof(buuldType[index]) != "undefined"){
								gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : '' + buuldType[index] + '_l',
									tile : 0,
									dx :buildList[index][8],
									dy :buildList[index][3] - hourseMapOffset,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							    });	
							}
							buildDescIndex = index;
						}else{
							drawArcArray[index] = false;
							if(index != 27 && index != 1 && 
							   typeof(buuldType[index]) != "undefined"){
								gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : '' + buuldType[index],
									tile : 0,
									dx :buildList[index][8],
									dy :buildList[index][3] - hourseMapOffset,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							    }); 								
							}

						};	
//						var timeX = buildList[index][8] + 25;
//						var timeY = buildList[index][3] - 35;
//						if(typeof(buildName) != "undefined" && 
//						   typeof(build_Level) != "undefined" &&
//						   typeof(buildName[index]) != "undefined" && 
//						   typeof(build_Level[index]) != "undefined")
//							gbox.drawMessageRect(build_Level[index] + "级  " + buildName[index], timeX,timeY, 100, 12, '#FFFF00');

					}

					    //升级
			    		if(buildList[index][1] == 'state_upgrade_start'){
			    			
				    		var timeX = buildList[index][8] + 25;
							var timeY = buildList[index][3] + 30;
							if(typeof(upgrade_time[index]) != "加载...")
//								tooltip.drawLineDesc(gbox.getBufferContext(),timeX,timeY,"升级中．．．");
				    		      gbox.drawMessageRect("升级中．．．" /*+ upgrade_time[index]*/, timeX,timeY, 140, 12, '#FF9900'); 
//				    		if(upgrade_time[index] == "00:00:00"){
//				    			//网络
//				    			     upgrade_cnt[index] = 0;
//                                     buildArray[index].getResult(index);
//					         }		    				
					     }	
					     //拆除
			    		if(buildList[index][13] == 'state_demolition_start'){
				    		var timeX = buildList[index][8] + 25;
							var timeY = buildList[index][3] + 30;
							if(typeof(demolition_time[index]) != "加载...")
//								tooltip.drawLineDesc(gbox.getBufferContext(),timeX,timeY,"拆除中．．．");
							     gbox.drawMessageRect("拆除中．．．" /*+ demolition_time[index]*/, timeX,timeY, 140, 12, '#FF9900');
//				    		if(demolition_time[index] == "00:00:00"){
//				    			//网络
//				    			     demolition_cnt[index] = 0;
//                                     buildArray[index].getResult(index);                              
//					         }		    				
					     }	
				}
			});	
}
var status = 0;

/////////////////////////////////////////////////
var font_size = 8;

var game_ui_x = 0;//10;//ui 起始点x

var game_ui_y = 0;//5;//ui 起始点y

////////////////////////////////////////////////

var debug = false;//

//1.进入酒馆调用的接口：getTavernInfo
var heroTimeInterval = null;
var heroCnt = 0;
var remainTime = "等待刷新！";
var haveMoney = 0;
var haveRefreshCard = 0;//武将刷新卡数量
var heroData = new Array();
var heroSoul = new Array();
var heroSoulInfo = new Array();
var heroQualityColor = new Array();//武将品级色彩列表
var heroSoulColor = new Array();//武魂品级色彩列表
function doTavernInfo(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	haveRefreshCard = data.itemAmount;
	heroData = new Array();
	heroQualityColor = new Array();
	
	heroSoul = new Array();
	heroSoulInfo = new Array();	
	heroSoulColor = new Array();
	for(var i=0; i<data.heros.length; i++){
		var temp = data.heros[i];
		
		if(typeof(data.heros[i]) != "undefined" && 
				data.heros[i] != null){
		heroData[i] = {
			       id:temp.id,
			       heroName:temp.heroName,
			       heroIcon:temp.heroIcon,
			       gender:temp.gender,
			       heroForce:temp.force,
			       intelligence:temp.strategy,
			       stamina:temp.physique,
			       agility:temp.agility,
//			       forceAdd:temp.forceAdd,
//			       intelligenceAdd:temp.intelligenceAdd,
//			       staminaAdd:temp.staminaAdd,
//			       agilityAdd:temp.agilityAdd,
//			       attack:temp.attack,
//			       hp:temp.hp,
//			       criticalStrike:temp.criticalStrike,
//			       defence:temp.defence,
//			       mp:temp.mp,
//			       hit:temp.hit,
			       quality:temp.quality,
//			       forcePercent:temp.forcePercent,
//			       intelligencePercent:temp.intelligencePercent,
//			       staminaPercent:temp.staminaPercent,
//			       agilityPercent:temp.agilityPercent,
//			       heroSoulId:temp.heroSoulId,
			       needMoney:temp.needMoney,
			       heroType:temp.heroType,
			       gift:temp.gift
		};
		
		if(typeof(temp.heroSoul) != "undefined" && 
				temp.heroSoul != null){
		       heroSoul[i] = {
			       name:temp.heroSoul.name,
			       description:temp.heroSoul.description,
			       time:temp.heroSoul.time,
			       heroForce:temp.heroSoul.heroSoulForce,
			       intelligence:temp.heroSoul.heroSoulIntelligence,
			       agility:temp.heroSoul.heroSoulAgility,
			       stamina:temp.heroSoul.heroSoulStamina,
			       totalPoint:temp.heroSoul.totalPoint,
			       heroSoulGrade:temp.heroSoul.heroSoulGrade
	           };
//		    console.log("quality ============ " + temp.heroSoul.heroSoulGrade);
		    heroSoulInfo[i] = new Array();
		    heroSoulInfo[i][0] = "姓名:" + heroSoul[i].name;
		    heroSoulInfo[i][1] = "描述:" + heroSoul[i].description;
		    heroSoulInfo[i][2] = "时代:" + heroSoul[i].time;
		    heroSoulInfo[i][3] = "武力:" + heroSoul[i].heroForce;
		    heroSoulInfo[i][4] = "策略:" + heroSoul[i].intelligence;
		    heroSoulInfo[i][5] = "身法:" + heroSoul[i].agility;
		    heroSoulInfo[i][6] = "耐力:" + heroSoul[i].stamina;
		    heroSoulInfo[i][7] = "总点数:" + heroSoul[i].totalPoint;
		    
		    
			switch(heroSoul[i].heroSoulGrade)
		  	{
					case 1:
						heroSoulColor[i] = '#FFFFFF';
					break;
					case 2:
						heroSoulColor[i] = '#1EFF00';
					break;
					case 3:
						heroSoulColor[i] = '#0070DD';
					break;
					case 4:
						heroSoulColor[i] = '#A335EE';
					break;
					case 5:
						heroSoulColor[i] = '#E5CC80';
					break;
			}		    
		}

		
		switch(heroData[i].quality)
	  	{
				case 1:
					heroQualityColor[i] = '#FFFFFF';
				break;
				case 2:
					heroQualityColor[i] = '#1EFF00';
				break;
				case 3:
					heroQualityColor[i] = '#0070DD';
				break;
				case 4:
					heroQualityColor[i] = '#A335EE';
				break;
				case 5:
					heroQualityColor[i] = '#E5CC80';
				break;
		}
	  }
	}
	haveMoney = onlyMoney;
	
	if(heroTimeInterval != null){
		clearInterval(heroTimeInterval);
		heroCnt = 0;
		heroTimeInterval = null;
		remainTime =  "等待刷新！";
	}	
	for(var a = 0; a < selectStatus.length; a++)
  	   	selectStatus[a] = false;
	heroIndex = -1; 	
	
	var tmpTime = data.time;
	console.log("【招募时间】 =================== " + data.time);
	if(heroTimeInterval == null)
	   heroTimeInterval = setInterval("ZMTimer(" + tmpTime + ")",1000);	
}

//refreshHeroList//武将刷新
function doRefreshHeroList(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	haveRefreshCard = data.itemAmount;
	heroData = new Array();
	heroQualityColor = new Array();
	
	heroSoul = new Array();
	heroSoulInfo = new Array();	
	heroSoulColor = new Array();
	for(var i=0; i<data.heros.length; i++){
		var temp = data.heros[i];
		
		if(typeof(data.heros[i]) != "undefined" && 
				data.heros[i] != null){
		heroData[i] = {
			       id:temp.id,
			       heroName:temp.heroName,
			       heroIcon:temp.heroIcon,
			       gender:temp.gender,
			       heroForce:temp.force,
			       intelligence:temp.strategy,
			       stamina:temp.physique,
			       agility:temp.agility,
//			       forceAdd:temp.forceAdd,
//			       intelligenceAdd:temp.intelligenceAdd,
//			       staminaAdd:temp.staminaAdd,
//			       agilityAdd:temp.agilityAdd,
//			       attack:temp.attack,
//			       hp:temp.hp,
//			       criticalStrike:temp.criticalStrike,
//			       defence:temp.defence,
//			       mp:temp.mp,
//			       hit:temp.hit,
			       quality:temp.quality,
//			       forcePercent:temp.forcePercent,
//			       intelligencePercent:temp.intelligencePercent,
//			       staminaPercent:temp.staminaPercent,
//			       agilityPercent:temp.agilityPercent,
//			       heroSoulId:temp.heroSoulId,
			       needMoney:temp.needMoney,
			       heroType:temp.heroType,
			       gift:temp.gift
		};
		if(typeof(temp.heroSoul) != "undefined" && 
				temp.heroSoul != null){
		       heroSoul[i] = {
			       name:temp.heroSoul.name,
			       description:temp.heroSoul.description,
			       time:temp.heroSoul.time,
			       heroForce:temp.heroSoul.heroSoulForce,
			       intelligence:temp.heroSoul.heroSoulIntelligence,
			       agility:temp.heroSoul.heroSoulAgility,
			       stamina:temp.heroSoul.heroSoulStamina,
			       totalPoint:temp.heroSoul.totalPoint,
			       quality:temp.heroSoul.heroSoulGrade
	           };	
		    heroSoulInfo[i] = new Array();
		    heroSoulInfo[i][0] = "姓名:" + heroSoul[i].name;
		    heroSoulInfo[i][1] = "描述:" + heroSoul[i].description;
		    heroSoulInfo[i][2] = "时代:" + heroSoul[i].time;
		    heroSoulInfo[i][3] = "武力:" + heroSoul[i].heroForce;
		    heroSoulInfo[i][4] = "策略:" + heroSoul[i].intelligence;
		    heroSoulInfo[i][5] = "身法:" + heroSoul[i].agility;
		    heroSoulInfo[i][6] = "耐力:" + heroSoul[i].stamina;
		    heroSoulInfo[i][7] = "总点数:" + heroSoul[i].totalPoint;
		    
		    
			switch(heroSoul[i].quality)
		  	{
					case 1:
						heroSoulColor[i] = '#FFFFFF';
					break;
					case 2:
						heroSoulColor[i] = '#1EFF00';
					break;
					case 3:
						heroSoulColor[i] = '#0070DD';
					break;
					case 4:
						heroSoulColor[i] = '#A335EE';
					break;
					case 5:
						heroSoulColor[i] = '#E5CC80';
					break;
			}		    
		}

		
		switch(heroData[i].quality)
	  	{
				case 1:
					heroQualityColor[i] = '#FFFFFF';
				break;
				case 2:
					heroQualityColor[i] = '#1EFF00';
				break;
				case 3:
					heroQualityColor[i] = '#0070DD';
				break;
				case 4:
					heroQualityColor[i] = '#A335EE';
				break;
				case 5:
					heroQualityColor[i] = '#E5CC80';
				break;
		}
	  }
	}
	haveMoney = onlyMoney;
	
	if(heroTimeInterval != null){
		clearInterval(heroTimeInterval);
		heroCnt = 0;
		heroTimeInterval = null;
		remainTime =  "等待刷新！";
	}	
	for(var a = 0; a < selectStatus.length; a++)
  	   	selectStatus[a] = false;
	heroIndex = -1; 	
	
	var tmpTime = data.time;
	console.log("【招募时间】 =================== " + data.time);
	if(heroTimeInterval == null)
	   heroTimeInterval = setInterval("ZMTimer(" + tmpTime + ")",1000);	
}

//employHero//招募
function doEmployHero(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	if(data.status == "success"){
		heroData[heroIndex] = null;
		alert("招募成功！");
	}
	
//	heroData = new Array();
//	heroQualityColor = new Array();
//	
//	heroSoul = new Array();
//	heroSoulInfo = new Array();	
//	heroSoulColor = new Array();
//	
//	
//	
//	for(var i=0; i<data.heros.length; i++){
//		var temp = data.heros[i];
//		
//		if(typeof(data.heros[i]) != "undefined" && 
//				data.heros[i] != null){
//		heroData[i] = {
//			       id:temp.id,
//			       heroName:temp.heroName,
//			       heroIcon:temp.heroIcon,
//			       gender:temp.gender,
//			       heroForce:temp.force,
//			       intelligence:temp.strategy,
//			       stamina:temp.physique,
//			       agility:temp.agility,
////			       forceAdd:temp.forceAdd,
////			       intelligenceAdd:temp.intelligenceAdd,
////			       staminaAdd:temp.staminaAdd,
////			       agilityAdd:temp.agilityAdd,
////			       attack:temp.attack,
////			       hp:temp.hp,
////			       criticalStrike:temp.criticalStrike,
////			       defence:temp.defence,
////			       mp:temp.mp,
////			       hit:temp.hit,
//			       quality:temp.quality,
////			       forcePercent:temp.forcePercent,
////			       intelligencePercent:temp.intelligencePercent,
////			       staminaPercent:temp.staminaPercent,
////			       agilityPercent:temp.agilityPercent,
////			       heroSoulId:temp.heroSoulId,
//			       needMoney:temp.needMoney,
//			       gift:temp.gift
//		};
//		if(typeof(temp.heroSoul) != "undefined" && 
//				temp.heroSoul != null){
//		       heroSoul[i] = {
//			       name:temp.heroSoul.name,
//			       description:temp.heroSoul.description,
//			       time:temp.heroSoul.time,
//			       heroForce:temp.heroSoul.heroSoulForce,
//			       intelligence:temp.heroSoul.heroSoulIntelligence,
//			       agility:temp.heroSoul.heroSoulAgility,
//			       stamina:temp.heroSoul.heroSoulStamina,
//			       totalPoint:temp.heroSoul.totalPoint,
//			       quality:temp.heroSoul.heroSoulGrade
//	           };	
//		    heroSoulInfo[i] = new Array();
//		    heroSoulInfo[i][0] = "姓名:" + heroSoul[i].name;
//		    heroSoulInfo[i][1] = "描述:" + heroSoul[i].description;
//		    heroSoulInfo[i][2] = "时代:" + heroSoul[i].time;
//		    heroSoulInfo[i][3] = "武力:" + heroSoul[i].heroForce;
//		    heroSoulInfo[i][4] = "策略:" + heroSoul[i].intelligence;
//		    heroSoulInfo[i][5] = "身法:" + heroSoul[i].agility;
//		    heroSoulInfo[i][6] = "耐力:" + heroSoul[i].stamina;
//		    heroSoulInfo[i][7] = "总点数:" + heroSoul[i].totalPoint;
//		    
//		    
//			switch(heroSoul[i].quality)
//		  	{
//					case 1:
//						heroSoulColor[i] = '#FFFFFF';
//					break;
//					case 2:
//						heroSoulColor[i] = '#1EFF00';
//					break;
//					case 3:
//						heroSoulColor[i] = '#0070DD';
//					break;
//					case 4:
//						heroSoulColor[i] = '#A335EE';
//					break;
//					case 5:
//						heroSoulColor[i] = '#E5CC80';
//					break;
//			}		    
//		}
//
//		
//		switch(heroData[i].quality)
//	  	{
//				case 1:
//					heroQualityColor[i] = '#FFFFFF';
//				break;
//				case 2:
//					heroQualityColor[i] = '#1EFF00';
//				break;
//				case 3:
//					heroQualityColor[i] = '#0070DD';
//				break;
//				case 4:
//					heroQualityColor[i] = '#A335EE';
//				break;
//				case 5:
//					heroQualityColor[i] = '#E5CC80';
//				break;
//		}
//	  }
//	}
	haveMoney = onlyMoney;
	
//	if(heroTimeInterval != null){
//		clearInterval(heroTimeInterval);
//		heroCnt = 0;
//		heroTimeInterval = null;
//		remainTime =  "等待刷新！";
//	}	
//	for(var a = 0; a < selectStatus.length; a++)
//  	   	selectStatus[a] = false;
//	heroIndex = -1; 	
//	
//	var tmpTime = data.time;
//	console.log("【招募时间】 =================== " + data.time);
//	if(heroTimeInterval == null)
//	   heroTimeInterval = setInterval("ZMTimer(" + tmpTime + ")",1000);	
}


function ZMTimer(initData){
	heroCnt = heroCnt + 1;
	remainTime = changeTimeformat((initData/1000 - heroCnt)*1000);
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

function getX(cx,cy){
	return ((cx-dx)/rx+cy/ry-1)/2;
}

function getY(cx,cy){
	return (cy/ry-(cx-dx)/rx-1)/2;
}

function getCx(x,y){
	return (x-y)*rx+dx;
}

function getCy(x,y){
	return (x+y+1)*ry;
}

var isWindowOnScroll = false;
window.onscroll=function(){
    if(document.body.clientWidth > 1200)
			    	{
			    		chatBX = document.body.scrollLeft;
			    	}
			    	else
			    	{
			    		chatBX = 0 ;
			    	}
			    	var offsetHeigth = 0;
			    	if(document.body.clientHeight > gbox.getScreenH())
			    	{
			    			offsetHeigth = document.body.clientHeight - gbox.getScreenH();
			    	} 
			    	else
			    	{
			    			offsetHeigth = 0;
			    	}
	chatBY = document.body.clientHeight  - 193 - offsetHeigth +  document.body.scrollTop ;
	if(gbox._isIndwellDiv("divWindowBg","input"))
		divWindowBg.style.top= chatBY + 168;
	chatlist.updateLocation((chatBX -19),chatBY + 30,chatBY-1);
	isWindowOnScroll = true;
}

var oldClientW;
var oldClientH;
function isUpClientScreen(){
	if(oldClientW != document.body.clientWidth || oldClientH != document.body.clientHeight){
		oldClientW = document.body.clientWidth;
		oldClientH = document.body.clientHeight;
		isWindowOnScroll = true;
		return true;
	}else
		isWindowOnScroll = false;
	
	return false;
}

function onResize(){ 
//    if(isUpClientScreen()){ 
    		if(document.body.clientWidth > 1200)
			    	{
			    		chatBX = document.body.scrollLeft;
			    	}
			    	else
			    	{
			    		chatBX = 0 ;
			    	}
			    	var offsetHeigth = 0;
			    	if(document.body.clientHeight > gbox.getScreenH())
			    	{
			    			offsetHeigth = document.body.clientHeight - gbox.getScreenH();
			    	} 
			    	else
			    	{
			    			offsetHeigth = 0;
			    	}
		chatBY = document.body.clientHeight  - 193 - offsetHeigth +  document.body.scrollTop;
		
		if(gbox._isIndwellDiv("divWindowBg","input"))
			divWindowBg.style.top= chatBY + 168;
		chatlist.updateLocation((chatBX -19),chatBY + 30,chatBY-1);
		//console.log("====" + curGroup);
//    	switch(getCurrentLayer()){
//    	case 'cityMenuLayer':
//    		    if(group_src == 'cityMenu'){
//	    			if(gbox._isIndwellDiv("divWindowBg","input"))
//	    				divWindowBg.style.top= chatBY + 168;
//	    		}
//	    		break;
//    	case 'environsScreen_Layer'://城郊layer
//    		if(group_src == 'environsScreen'){
//    			if(gbox._isIndwellDiv("divWindowBg","input"))
//    				divWindowBg.style.top= chatBY + 168;
//    		}
//    		break;
//    	case 'worldScreen_Layer'://世界layer
//    		if(group_src == 'worldScreen'){
//    			if(gbox._isIndwellDiv("divWindowBg","input"))
//    				divWindowBg.style.top= chatBY + 168;
//    		}
//    		break;
//    	}
//    }
}
var equipList = function(index,_group,_layer)//道具列表
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
//	gbox.addObject(
//	{ 
//		id : 'equipList',
//		group : 'levelMenu_1',
//		tileset : 'propBg',
//		x : 0,
//		y : 0,
//		frame : 0,
//		poly : [ [880,450], [1162,473], [1162,585],[902,585]],
//		initialize : function()
//		{
//            var _item2 = new Array();
//			var _item = new Array();
//			for(var i=0; i<25; i++)
//			{
//				_item[i] = new Array();
//                _item[i][0] = "equip1001";
//				_item2.push(_item[i]);
//			}
//			
//			var content = new Array(_item2);
//			equipOffsetY = equip_OffsetY = 0;
//			zhuangbeiList.init('propBg', 'qkHit','qkHit','propBg1', null, content, 880, 450, 5, 20, 50, 3, true, -70, 0);
//		},
//		first : function() 
//		{	
//		},
//		myclick : function()
//		{
//			generalsItem(getClickObjectIndex(),_group,_layer);
//			changeMap(_layer);
//		},
//		blit : function()
//		{
//			if(isDrawUI[index])
//			{
//			   zhuangbeiList.paint( equip_OffsetY, equip_BeginSlip, equip_Time );
//			}
//		}
//	 });
	 
 //人物属性
		 gbox.addObject(
			{ 
				id : 'attributePic',
				group : 'levelMenu_1',
				tileset : 'attributePic',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{	

				},
				first : function() 
				{	
				},
				myclick : function()
				{
					
				},
				blit : function()
				{
					if(isDrawUI[index])
					{
						gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'attributePic',
										tile : 0,
										dx :tempX + 680 ,
										dy :tempY + 77,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
								    }); 
					gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'titleBar',
										tile : 0,
										dx :tempX + 733,
										dy :tempY + 344,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
								    });
					gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'equipmentFont',
										tile : 0,
										dx :tempX + 723 + 58,
										dy :tempY + 345,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
								    });
				}
					
				}
			});
	    
};

//var customFaceList = function(index)//表情列表
//{
//	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
//	isDrawUI[index] = true;
//	gbox.addObject(
//	{ 
//		id : 'customFace_list',
//		group : 'levelMenu_1',
//		tileset : 'propBg1',
//		x : 0,
//		y : 0,
//		frame : 0,
//		poly : [ [285,545], [435,545], [435,742],[285,742]],
//		initialize : function()
//		{
//            var _item2 = new Array();
//			var _item = new Array();
//			for(var i=0; i<12; i++)
//			{
//				_item[i] = new Array();
//                _item[i][0] = "customface" + i;
//				_item2.push(_item[i]);
//			}
//			
//            var content = new Array(_item2);
//            var listLen = _item2.length/3;
//            if((_item2.length%3) != 0){
//            	listLen = parseInt(_item2.length/3 + 1);
//            }
//			customFaceOffsetY = customFace_OffsetY = 0;			
//			customFacelist.init( 'propBg1', 'qkHit','qkHit','qkHit', null,content, 270, 525, 3, listLen, 50, 4, true,45,0 );
//		},
//		first : function() 
//		{	
//		},
//		myclick : function()
//		{
//
//		},
//		blit : function()
//		{
//			if(isDrawUI[index])
//			{					
//			   customFacelist.paint( customFace_OffsetY, customFace_BeginSlip, customFace_Time );
//			}
//		}
//	
//	 });
//}

//执行讨伐或者派遣
var doBattleInWorld = function(data,kingData){
	var typeLevel = 0;
	if(data)
		typeLevel = -1;
	var closeFn = function(){
		WorldScreen();
	};
	var openData = {
			id: kingData.characterId,
			name: kingData.name,
			type: 1,
			typeLevel: typeLevel,
			needTime: 0,
			isTargetChange: false,
			obj: kingData,
			close: closeFn,
			layer: 'worldScreen_Layer',
			groupBottom: 'worldScreen'
	};
	//获取出征所需时间
	battle.getNeedBattleTime(kingData.characterId,function(data){
		if(typeof(data.error) != "undefined"){
			alert("系统提示：" + data.error);
			return;
		}
		openData.needTime = data;
		warpthMenuClass.handlers.battleOpen(openData);
	});
};
