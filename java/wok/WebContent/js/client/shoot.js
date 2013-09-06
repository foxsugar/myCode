var SCREEN_W = 1439;
var SCREEN_H = 741;//460;
var serverTime;
var battleTurnTime;
var infoCtr = false;
var warfareButtonCtr =  false;
var timeSet;
var loadingImageList = [];
function startGame(){

	User.getUserInfo(doInitCharacter);

};

function setupTouch()
{
	if (isIPhone)
	{
		setEventListener(document.body);
	} else
	{
		setEventListener(gbox._screen);
	}
}

function setEventListener(obj)
{
	if (checkForTouch())
	{
		obj.addEventListener('touchmove', touchMove, false);
		obj.addEventListener('touchstart', touchStart, false);
		obj.addEventListener('touchend', touchEnd, false);
	} else
	{
		obj.addEventListener('mousedown', mouseDown, false);
		obj.addEventListener('mousemove', mouseMove, false);
		obj.addEventListener('mouseup', mouseUp, false);
		obj.addEventListener('DOMMouseScroll',scrollFunc,false); 
	}
}

function checkForTouch()
{
	var d = document.createElement("div");
	d.setAttribute("ontouchmove", "return;");
	return typeof d.ontouchmove == "function" ? true : false;
};

var touchX = 0;
var touchY = 0;
var touchStartX = 0;
var touchStartY = 0;
var touchMoveX = 0;
var touchMoveY = 0;
var lastTouchMoveX = 0;
var lastTouchMoveY = 0;
var hasTouchMoveEvent = false;
var firstClick = false;

var bTouch = false;
var iContrast = -1;

var divWindowBg;
var e3;
function drawChatDiv(x,y)
{
// 	if(gbox._isIndwellDiv("divWindowBg","input")){
//		document.body.removeChild(divWindowBg);
//		divWindowBg = null;
// 	}
	if(!gbox._isIndwellDiv("divWindowBg","input"))
	{
		divWindowBg = addDivWindowBg((x + 76),(y + 155));
		divWindowBg.id = 'divWindowBg';
		document.body.appendChild(divWindowBg);
	    e3 = document.createElement("input");
	    e3.id = 'chat_input';
	    e3.style.color = '#FFFFFF';
	    e3.style.width = '128px';
	    e3.style.background = "transparent";
	    e3.style.border = "0px solid";
	    e3.style.outline = "none";
	    e3.onkeydown=function(e){
	    	var keynum = 0;
	    	if(window.event) // IE
			{
				keynum = e.keyCode
			}
			else if(e.which) // Netscape/Firefox/Opera
			{
				keynum = e.which
			}
			if(keynum==13){
				sendMessage(com_group);
			}
		}
	    //e3.value = '蛋蛋蛋碎一地';
	    divWindowBg.appendChild(e3);
	}
}

/****
		主程序		
	****/
var maingame;
var wood = 0;
var stone = 0;
var charId ;//玩家ID
var epoch = 1;//时代
var charName;//君主姓名
var charCountry;//国家
var sex;//性别
var charImage = 'head_woman';//头像
var charLevel;//级别
var charExp;//经验
var castleLevel;//时代级别
var castleValue;//时代当前值
var charCash;//君主金钱
var expLimit;//经验峰值
var castleValueLimit;//时代经验峰值
var allianceName;//所属联盟名
var canLevelup = false;
//var realLevel;//主城的实际级别（当等级超过上限时，自动升级，但level
//var damagedExperience;//受损的繁荣度
function doCharacter(data)
{

	if(data.character == null)
	{
		RoleMenu('establishRole');
	    changeMap('roleLayer');
	}else{
		var _character = data.character;
		var _maincity = data.maincity;
		
        charId = _character.id;
		charName = _character.name;
		country = _character.countryName;
		
		charImage = _character.image;
		charLevel = _character.level;
		charExp = _character.experience;
		expLimit = _character.experienceLimit;
		allianceName = _character.allianceName;
		
		epoch = _maincity.age;
		castleLevel = _maincity.level;
		castleValue = _maincity.experience;
	    castleValueLimit = _maincity.experienceLimit;
	    canLevelup = _maincity.canLevelup;
//	    realLevel = data.maincity.realLevel;
//	    damagedExperience = data.maincity.damagedExperience;
//		charCash = data.character.cash;
//        wood = data.character.wood;
//	    stone = data.character.stone;
		connectCometServer(charId,doBattleWarn,doMailWarn,doResourceChange,doBuildingQueue,friendWarn,handleGetSimpleUserinfo,resourceUpdate);
	    Chat._fixdiv();
	    
		console.log('进入主城！！！');
		console.log(loadingImageList["age"+epoch]);
		loadingImageList["age"+epoch].load(
				getClickObjectIndex(),
 				eval("age"+epoch+"LoadImage"),
 				function(){
 					com_group = 'cityMenu';
 					com_layer = 'cityMenuLayer';
 					group_src = 'cityMenu';
 				    enterCityMenu(curGroup);
 					changeMap('cityMenuLayer');	
 				}
 		);

	}
}

function doInitCharacter(data)
{
  console.log("startGame____________________");
	if(data.character != null){
		var _character = data.character;
		var _maincity = data.maincity;
		
        charId = _character.id;
		charName = _character.name;
		charCountry = _character.countryName;
		charImage = _character.image;
		charLevel = _character.level;
		charExp = _character.experience;
		expLimit = _character.experienceLimit;
		allianceName = _character.allianceName;
		
		epoch = _maincity.age;
		castleLevel = _maincity.level;
		castleValue = _maincity.experience;
	    castleValueLimit = _maincity.experienceLimit;
	    canLevelup = _maincity.canLevelup;
	    Chat._fixdiv();
	}

		console.log("onLoad === ");
				help.akihabaraInit(
				{
					title : "王者之战",
					portrait : true,
					width : SCREEN_W,
					height : SCREEN_H,
					padmode : "none",
					zoom : 1
				});

				gbox.setAutoskip(null);
				loadingImageList['BattleCrusade']= new LoadingImage();//讨伐
				loadingImageList['BattleSingled'] = new LoadingImage();//单挑
				loadingImageList['Mail'] = new LoadingImage();//邮件
				loadingImageList['ranking'] = new LoadingImage();//排行
				loadingImageList['task'] = new LoadingImage();//任务
				loadingImageList['social'] = new LoadingImage();//社交
				loadingImageList['Military_situation'] = new LoadingImage();//军情
				loadingImageList['generals'] = new LoadingImage();//武将信息
				loadingImageList['monarch'] = new LoadingImage();//君主信息
				loadingImageList['World'] = new LoadingImage();//世界地图
				loadingImageList['ProcessingSquareAvatar'] = new LoadingImage();//加工坊
				loadingImageList['mmarket'] = new LoadingImage();//集市
				loadingImageList['tavern'] = new LoadingImage();//酒馆
				loadingImageList['foreignMuseum'] = new LoadingImage();//外务
				loadingImageList['scienceEc'] = new LoadingImage();//科教
				loadingImageList['City_wall'] = new LoadingImage();//城墙
				loadingImageList['exchequer'] = new LoadingImage();//国库
				loadingImageList['Maidan'] = new LoadingImage();//练兵场
				loadingImageList['jiaofang'] = new LoadingImage();//教坊
				loadingImageList['connoisseur'] = new LoadingImage();//聚贤阁
				loadingImageList['Military_office'] = new LoadingImage();//军机处
				loadingImageList['Cellar'] = new LoadingImage();//地窖
				loadingImageList['Houses'] = new LoadingImage();//民居
				loadingImageList['Barrack'] = new LoadingImage();//兵营
				loadingImageList['loadinto'] = new LoadingImage();//进入主城
	 			loadingImageList['age1'] = new LoadingImage();//时代1
	 			loadingImageList['age2'] = new LoadingImage();//时代2
	 			loadingImageList['age3'] = new LoadingImage();//时代3
	 			loadingImageList['age4'] = new LoadingImage();//时代4
	 			loadingImageList['age5'] = new LoadingImage();//时代5
	 			loadingImageList['Imperial_Department'] = new LoadingImage();//太医署
	 			loadingImageList['Suburbs'] = new LoadingImage();////城郊
	 			gbox.setFps(25);
	 			setupTouch();
	 			gbox.loadAll(main);
	 			
	 			//聊天开始
	 			Chat.init();
					console.log('进入主城！！！');
 					loadingImageList['loadinto'].gameLoading(
 							getClickObjectIndex(),
 			 				function(){
 			 					gbox.addImage("jdt_02","images/loadingBg/jdt_02.png");
 			 		            gbox.addTiles({id : 'jdt_02',image : 'jdt_02',tilew : 856,tileh : 38,tilerow : 1,gapx : 0,gapy : 0});
 			 		            gbox.addImage("jdt_03","images/loadingBg/jdt_03.png");
 			 		            gbox.addTiles({id : 'jdt_03',image : 'jdt_03',tilew : 787,tileh : 16,tilerow : 1,gapx : 0,gapy : 0});	
 			 					gbox.addImage("logo", "images/loadingBg/logo.jpg");
 			 					gbox.addTiles({id : 'logo',image : 'logo',tilew : 1440,tileh : 742,tilerow : 1,gapx : 0,gapy : 0});			 					
 			 					gbox.addScript('js/client/AnimData.js?v=1');
 			 					gbox.addScript('js/client/battlefieldAnimation.js?v=1');
 			 					gbox.addScript('js/client/battleAnim/summary.js?v=1');
 			 					gbox.addScript('js/client/loadImage/urbanUpgrading/age1.js?v=1');
 			 					gbox.addScript('js/client/loadImage/urbanUpgrading/age2.js?v=1');
 			 					gbox.addScript('js/client/loadImage/urbanUpgrading/age3.js?v=1');
 			 					gbox.addScript('js/client/loadImage/urbanUpgrading/age4.js?v=1');
 			 					gbox.addScript('js/client/loadImage/urbanUpgrading/age5.js?v=1');			 					
 			 					gbox.addScript('js/client/loadImage/skilIcon.js?v=1');
 			 					gbox.addScript('js/client/loadImage/propsIcon.js?v=1');
 			 					gbox.addScript('js/client/loadImage/gem.js?v=1');
 			 					gbox.addScript('js/client/loadImage/materiaIcon.js?v=1');
 			 					gbox.addScript('js/client/loadImage/Formation_Icon.js?v=1');
 			 					gbox.addScript('js/client/loadImage/Equipment_icon.js?v=1');
 			 					gbox.addScript('js/client/loadImage/Small_generals_Avatar.js?v=1');
 			 					gbox.addScript('js/client/loadImage/Great_generals_Avatar.js?v=1');
 			 					gbox.addScript('js/client/loadImage/Create_drawings.js?v=1');
 			 					gbox.addScript('js/client/loadImage/Creating_a_Role.js?v=1');
 			 					gbox.addScript('js/client/cjJiaose.js?v=1');
 							},
 			 				function(){
 								LoadScript();//加载script文件
 								
 			 					skilIconLoadImage();//技能
								propsIconLoadImage();//道具
							    gemLoadImage();//宝石
							    materiaIconLoadImage();//材料
							    Formation_IconLoadImage();//阵法
							    Equipment_iconLoadImage();//装备
							    GreatGeneralsAvatarLoadImage();//武将头像大
						        SmallGeneralsAvatarLoadImage();//武将小头像
							    Create_drawingsLoadImage();//打造图
							    Creating_a_RoleLoadImage();//创建角色 
 			 					universalLoadImage();//通用
 			 					mainInterfaceLoadImage();//主界面
 			 					eval("age"+epoch+"LoadImage")();//建筑时代
 			 					
 			 				},
 			 				function(){
 			 					if(data.character == null)
 			 					{
 			 						RoleMenu('establishRole');
 			 					    changeMap('roleLayer');
 			 					}else{
 			 						connectCometServer(charId,doBattleWarn,doMailWarn,doResourceChange,doBuildingQueue,friendWarn,handleGetSimpleUserinfo,resourceUpdate);
 	 			 					quest.getUserQuest(taskIndex.doGetUserQuestIndex);
 	 			 					com_group = 'cityMenu';
 	 			 					com_layer = 'cityMenuLayer';
 	 			 					group_src = 'cityMenu';
 	 			 				    enterCityMenu(curGroup);
 	 			 					changeMap('cityMenuLayer');	
 			 					}
 			 				},
 			 				true
 			 		);
}


/**
 * 处理建筑完成后推送的君主经验，繁荣度等信息 
 */
function handleGetSimpleUserinfo(data)
{
	var _character = data.character;
	var _maincity = data.maincity;
	
	if(charLevel!=_character.level){//角色等级不等于本地保存的等级，说明角色等级有变化，则本地经验变化需要特殊处理
		charLevel = _character.level;//更新本地等级变化
		addKingExpValue = expLimit+_character.experience - charExp;//计算经验变化
	}else{//角色等级等于本地保存的等级，说明角色等级没变化
		addKingExpValue = _character.experience - charExp;//计算经验变化
	}
	charExp = _character.experience;//更新本地角色经验
	expLimit = _character.experienceLimit;//更新本地角色经验上限
	
	
	if(castleLevel != _maincity.level){//城池等级没变化，城池经验直接处理不用特殊变化
		addCityExpValue = castleValueLimit+_maincity.experience - castleValue;//计算经验变化
	}else{
		addCityExpValue = _maincity.experience - castleValue;
	}
//		console.log(">>>>>>>" + _maincity.experience);
	epoch = _maincity.age;
	castleLevel = _maincity.level;
	castleValue = _maincity.experience;
    castleValueLimit = _maincity.experienceLimit;
    canLevelup = _maincity.canLevelup;
//    flashGameLayer();
}


//获取全部建筑数据d
var upgradeData = new Array();
var demolitionData = new Array();
var buildQueue = new Array();
var buildings = new Array();
function doGetCastleBuildings(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
    } 
	
	    for(var i = 0; i<data.buildings.length; i++)
	    {//已经建造的建筑列表
	        var temp = data.buildings[i];
	    	var location = temp.location;
	    	if(location != 27 && location != 1){
		       buildList[location][0] = 'build_end';
	    	}
	    	buuldType[location] = temp.view.img;
	    	
	    	//建造属性
	    	buildName[location] = temp.view.name;
	    	build_Level[location] = temp.level;
	    	buildCommonDesc[location] = temp.view.desc;
	    	    
	    	buildings[location] = {
	    			flag:temp.flag,
	    			level:temp.level,
	    			location:temp.location,
	    			view:{
	    				demolishTime:temp.view.demolishTime,
	    				desc:temp.view.desc,
	    				effect1:temp.view.effect1,
	    				effect2:temp.view.effect2,
	    				effect3:temp.view.effect3,
	    				effect4:temp.view.effect4,
	    				img:temp.view.img,
	    				lastValue1:temp.view.lastValue1,
	    				lastValue2:temp.view.lastValue2,
	    				lastValue3:temp.view.lastValue3,
	    				lastValue4:temp.view.lastValue4,
	    				name:temp.view.name,
	    				needIronore:temp.view.needIronore,
	    				needMoney:temp.view.needMoney,
	    				needStone:temp.view.needStone,
	    				needWood:temp.view.needWood,
	    				nextValue1:temp.view.nextValue1,
	    				nextValue2:temp.view.nextValue2,
	    				nextValue3:temp.view.nextValue3,
	    				nextValue4:temp.view.nextValue4,
	    				returnStone:temp.view.returnStone,
	    				returnWood:temp.view.returnWood,
	    				upgradeTime:temp.view.upgradeTime,
	    				value1:temp.view.value1,
	    				value2:temp.view.value2,
	    				value3:temp.view.value3,
	    				value4:temp.view.value4
	    			}
	    	};
	    	
//	    	console.log("buildings["+location+"] ==== " + buildings[location].toString());
	    }
	    
//获取可变建筑数据
	    buildQueue = new Array();
        if(data.buildQueue != null && typeof(data.buildQueue) != "undefined")	    
	    for(var i = 0; i<data.buildQueue.length; i++)
	    {//已经建造的建筑列表。
	    	buildQueue[i] = {
	    			location:data.buildQueue[i].location,
	    			status:data.buildQueue[i].status
	    	};
	    }	    		    
	    enterCityMenu(curGroup);
		changeMap('cityMenuLayer');		    
}

function doBuildings(buildData)
{
	if(typeof(buildData.error) != "undefined"){
		alert("系统提示：" + buildData.error);
		return;
    } 
	
	for(var i = 0; i<buildData.length; i++)
	{//处理当前建造中的建筑列表，返回数据还包含正在升级的建筑的级别时间等。    
		//描述信息
		for(var j=0; j<buildingID.length; j++){
			if(buildingID[j] == buildData[i].buildingId){
				        		
				//建造属性
				buildingName[j] = buildData[i].name;
				buildingLevel[j] = buildData[i].level;
				buildingCommonDesc[j] = buildData[i].commonDesc;
				buildingCurDesc[j] = buildData[i].desc; 
				buildingMoney[j] = buildData[i].money;
				buildingFood[j] = buildData[i].food;
				buildingWood[j] = buildData[i].wood;
				buildingStone[j] = buildData[i].stone;
				buildingBronze[j] = buildData[i].bronze;
				buildingTime[j] = buildData[i].time;
				buildingNeedBuildId[j] = buildData[i].time;
				buildingNeedLevel[j] = buildData[i].needBuildingLevel;
				buildingCanBuild[j] = buildData[i].canBuild;
				buildingBuilt[j] = buildData[i].built;		    	    
			}
		}
	}		
}
var resourcefood;
var resourceironore;
var resourcemoney;
var resourcestone;
var resourcewood;
var onlyFood;
var onlyIronore;
var onlyMoney;
var onlyStone;
var onlyWood;
function doBuildingQueue(data)
{
    buildingListCtr = false;
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}

	console.log(data);
	//清空历史数据
    buildingArray.splice(0,buildingArray.length);
    buildingListTimerStr.splice(0, buildingListTimerStr.length);

	for(var a = 0 ; a < data.length; a++)
	{
		var tmp = data[a];
		buildingArray[a] = {
			location:tmp.location,
			buildingName:tmp.name,
			curLevel:tmp.srclevel,
			tarLevel:tmp.destlevel,
			status:tmp.status,
			time:tmp.time,
	    };
	}
	for(var i=0; i<IntervalbuildingListArray.length; i++)
		clearInterval(IntervalbuildingListArray[i]);
	
	for(var i = 0; i<buildingArray.length;i++)
	{

		if(buildingArray[i].time >= 0)
		{
			buildingListCnt[i] = 0;
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
function doResourceChange(data)
{
	
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
    }
    onlyFood = data.food;
    onlyIronore = data.ironore;
	onlyMoney = data.money;
	onlyStone = data.stone;
	onlyWood = data.wood;
    resourcefood = "" + data.food + "/" + data.foodLimit;
    resourceironore = "" + data.ironore + "/" + data.ironoreLimit;
    resourcemoney = "" + data.money + "/" + data.moneyLimit;
    resourcestone = "" + data.stone + "/" + data.stoneLimit;
    resourcewood = "" + data.wood + "/" + data.woodLimit;
//    console.log("money == " + resourcemoney);
    
}
function doMailWarn(data)
{
	
}
function doBattleWarn(data)
{
	console.log(data);
	jq_message = true;
	jq_cnt = 0;
}

function dogetServerTime(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
    }
    serverTime = data; 
}
var friendWarnData = false;//控制时候有人申请好友
function friendWarn(data)
{
	friendWarnData = data;
}
function resourceUpdate(data)
{
	
	for(var i=0; i<data.length; i++)
	{
		switch(data[i].fieldType)
		{
			case 0:
			   foodFieldArray[data[i].fieldId] = {
	
						  fieldStatus : data[i].fieldStatus,
						  fieldType : data[i].fieldType,
						  remainTime :  0,
						  resourceValue : data[i].resourceValue 
						          
					};
			   food_Area[data[i].fieldId][10] = foodFieldArray[data[i].fieldId].fieldType;
	           food_Area[data[i].fieldId][11] = foodFieldArray[data[i].fieldId].fieldStatus;	
			   break;
			case 1:
			   woodFieldArray[data[i].fieldId] = {
	
						  fieldStatus : data[i].fieldStatus,
						  fieldType : data[i].fieldType,
						  remainTime :  0,
						  resourceValue : data[i].resourceValue 
						          
					};
			   wood_Area[data[i].fieldId][10] = woodFieldArray[data[i].fieldId].fieldType;
	           wood_Area[data[i].fieldId][11] = woodFieldArray[data[i].fieldId].fieldStatus;	
			   break;
			case 2:
			   stoneFieldArray[data[i].fieldId] = {
	
						  fieldStatus : data[i].fieldStatus,
						  fieldType : data[i].fieldType,
						  remainTime :  0,
						  resourceValue : data[i].resourceValue 
						          
					};
			   stone_Area[data[i].fieldId][10] = stoneFieldArray[data[i].fieldId].fieldType;
	           stone_Area[data[i].fieldId][11] = stoneFieldArray[data[i].fieldId].fieldStatus;	
			   break;
			case 3:
			   ironoreField[data[i].fieldId] = {
	
						  fieldStatus : data[i].fieldStatus,
						  fieldType : data[i].fieldType,
						  remainTime :  0,
						  resourceValue : data[i].resourceValue 
						          
					};
			   ferrum_Area[data[i].fieldId][11] = ironoreField[data[i].fieldId].fieldType;
	           ferrum_Area[data[i].fieldId][12] = ironoreField[data[i].fieldId].fieldStatus;	
	           ferrumComplete[i] = true;
			   break;
			   
		}
	}
	
}
function timeAdd(){
	serverTime+=1000;
}
function getRemainTime(time){
	var remainTime = parseInt((time - serverTime)/1000);
	var second = remainTime%60;
	var minute = (remainTime-second)/60%60;
	var hour = parseInt(remainTime/3600);
	//console.log("battleTurnTime ============ " + ("" + hour + ":" + minute + ":" + second));
	return "" + hour + ":" + minute + ":" + second;
}
function beginServerTime(){
	setInterval(timeAdd, 1000);
}
function main()
{
  	//cityMenu 代表的是 主城
		         
	gbox.setGroups([
			'gameplay','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5','cityMenu','Noname','commandItem','environsScreen','worldScreen','establishRole','jiaofang',
			'level_1','level_2','taiweifuScreen','jishiScreen','jiagongfangScreen','jiuguanScreen']);

	{
		beginServerTime();		
//		getUserInfo(doCharacter);
		//获取任务
		
		
		gbox.setGroupsToLayer(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'], 'cityMenuLayer');
		gbox.setGroupsToLayer(['Noname'], 'Noname_second_Layer');
		gbox.setGroupsToLayer(['establishRole'], 'roleLayer');
		gbox.setGroupsToLayer(['commandItem'], 'commandItem_Layer');//功能菜单层
		gbox.setGroupsToLayer(['environsScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'], 'environsScreen_Layer');//郊外层
		gbox.setGroupsToLayer(['worldScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'], 'worldScreen_Layer');//世界层
		gbox.setGroupsToLayer(['taiweifuScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'], 'taiweifuScreen_Layer');//太尉俯层
		gbox.setGroupsToLayer(['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'], 'jishiScreen_Layer');//集市层
		gbox.setGroupsToLayer(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'], 'jiagongfangScreen_Layer');//加工纺层
		gbox.setGroupsToLayer(['jiuguanScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'], 'jiuguanScreen_Layer');//酒馆层
		
		
	};
	
	gbox.lastTime = (new Date()).getTime();
	gbox.go();

}

var currentLayer;
var lastLayer;
function setCurrentLayer(toLayer)
{
	lastLayer = currentLayer;
	currentLayer = toLayer;
}

var toLayer;
function changeMap(toLayer)
{
	setCurrentLayer(toLayer);
	clickObjectList = [];
	gbox.setLayerShow(toLayer);
	registerLayerToList(toLayer);
}