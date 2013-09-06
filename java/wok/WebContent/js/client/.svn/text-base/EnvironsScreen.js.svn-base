/*
 *  城郊类
 */
var ferrum_Area = [
   [575,12,643,26,615,86,549,68,524,-9,false,'state_plantType_empty','state_plantStatus_empty'],
   [657,40,721,58,707,118,631,98,595,24,false,'state_plantType_empty','state_plantStatus_empty'],
   [785,34,867,24,873,84,805,94,774,-3,true,'state_plantType_empty','state_plantStatus_empty'],
   [933,38,1017,48,1001,118,923,102,890,16,false,'state_plantType_empty','state_plantStatus_empty'],
   [63,242,159,232,169,308,93,316,73,217,true,'state_plantType_empty','state_plantStatus_empty'],
   [301,156,397,154,381,206,319,218,264,119,false,'state_plantType_empty','state_plantStatus_empty'],
   [441,162,531,168,529,232,447,222,431,136,true,'state_plantType_empty','state_plantStatus_empty'],
   [655,212,753,232,731,294,641,286,619,199,false,'state_plantType_empty','state_plantStatus_empty'],
   [819,234,885,248,865,306,791,296,767,208,false,'state_plantType_empty','state_plantStatus_empty'],
   [899,258,967,270,957,336,873,332,838,244,false,'state_plantType_empty','state_plantStatus_empty'],
   [1117,194,1193,174,1223,250,1133,264,1115,163,true,'state_plantType_empty','state_plantStatus_empty'],
   [1221,164,1309,154,1327,230,1245,232,1224,136,true,'state_plantType_empty','state_plantStatus_empty'],
];
var stone_Area = [
   [43,568,119,604,83,658,25,622,4,555,'state_plantType_empty','state_plantStatus_empty'],
   [129,614,197,638,155,686,95,658,76,593,'state_plantType_empty','state_plantStatus_empty'], 
   [193,648,267,684,217,732,173,694,146,629,'state_plantType_empty','state_plantStatus_empty'],
   [321,716,389,748,351,792,293,758,274,695,'state_plantType_empty','state_plantStatus_empty'],
   [395,754,473,790,425,838,369,794,349,731,'state_plantType_empty','state_plantStatus_empty'],
   [121,686,195,730,151,764,95,730,69,665,'state_plantType_empty','state_plantStatus_empty'],
   [203,780,265,818,221,860,171,820,152,765,'state_plantType_empty','state_plantStatus_empty'],
   [269,826,329,862,287,902,233,860,216,805,'state_plantType_empty','state_plantStatus_empty'],
   [135,818,193,854,139,898,95,856,77,798,'state_plantType_empty','state_plantStatus_empty'],
   [201,864,257,904,211,942,165,896,144,838,'state_plantType_empty','state_plantStatus_empty'],
   [65,856,103,890,69,942,21,902,-2,841,'state_plantType_empty','state_plantStatus_empty'],
   [123,896,187,936,147,974,85,938,71,876,'state_plantType_empty','state_plantStatus_empty'],
];
var wood_Area = [ 
   [1753,60,1811,90,1757,120,1697,86,1683,33,'state_plantType_empty','state_plantStatus_empty'],
   [1827,102,1833,130,1825,160,1775,126,1756,75,'state_plantType_empty','state_plantStatus_empty'],
   [1947,154,2005,184,1953,218,1891,182,1879,132,'state_plantType_empty','state_plantStatus_empty'],
   [1613,58,1669,90,1613,122,1557,92,1541,36,'state_plantType_empty','state_plantStatus_empty'],
   [1685,100,1739,128,1683,164,1627,130,1611,75,'state_plantType_empty','state_plantStatus_empty'],
   [1753,142,1815,168,1759,202,1695,168,1686,113,'state_plantType_empty','state_plantStatus_empty'],
   [1877,192,1939,226,1877,256,1827,222,1811,167,'state_plantType_empty','state_plantStatus_empty'],
   [1801,234,1865,262,1809,298,1749,258,1736,208,'state_plantType_empty','state_plantStatus_empty'],
   [1541,166,1599,194,1543,228,1493,192,1475,139,'state_plantType_empty','state_plantStatus_empty'],
   [1617,208,1679,238,1623,270,1559,236,1548,178,'state_plantType_empty','state_plantStatus_empty'],
   [1753,272,1791,306,1735,338,1669,302,1660,246,'state_plantType_empty','state_plantStatus_empty'],
   [1541,244,1601,274,1539,310,1483,272,1469,218,'state_plantType_empty','state_plantStatus_empty'],
];
var food_Area = [
    [1671,634,1768,682,1673,737,1576,683,1539,548,'state_plantType_empty','state_plantStatus_empty'],
    [1779,668,1877,738,1783,792,1693,736,1654,606,'state_plantType_empty','state_plantStatus_empty'],
    [1543,690,1639,738,1553,796,1447,740,1417,608,'state_plantType_empty','state_plantStatus_empty'],
    [1653,750,1753,800,1655,850,1567,802,1530,669,'state_plantType_empty','state_plantStatus_empty'],
    [1423,752,1521,800,1427,854,1337,800,1298,670,'state_plantType_empty','state_plantStatus_empty'],
    [1539,810,1653,862,1547,912,1451,858,1414,728,'state_plantType_empty','state_plantStatus_empty'],
    [1361,908,1459,956,1369,1008,1267,956,1235,824,'state_plantType_empty','state_plantStatus_empty'],
    [1483,964,1577,1016,1481,1070,1387,1018,1351,883,'state_plantType_empty','state_plantStatus_empty'],
    [1247,968,1345,1020,1249,1072,1145,1018,1116,887,'state_plantType_empty','state_plantStatus_empty'],
    [1359,1032,1453,1080,1365,1130,1265,1074,1233,944,'state_plantType_empty','state_plantStatus_empty'],
    [1121,1028,1219,1078,1125,1130,1031,1074,996,947,'state_plantType_empty','state_plantStatus_empty'],
    [1239,1088,1333,1140,1243,1192,1147,1140,1110,1006,'state_plantType_empty','state_plantStatus_empty'],
];
var foodTimeArray = new Array();//粮食计时器数组
var foodCnt = new Array();//计时器计数数组
var foodTimeStrArray = new Array();//粮食绘制数组
var stoneTimeArray = new Array();//石头计时器数组
var stoneCnt = new Array();//石头计时器计数数组
var stoneTimeStrArray = new Array();//石头绘制数组
var woodTimeArray = new Array();//木头计时器数组
var woodCnt = new Array();//木头计时器计数数组
var woodTimeStrArray = new Array();//木头绘制数组
var ironoreTimeArray = new Array();//矿山计时器数组
var ironoreCnt = new Array();//矿山计时器计数数组
var ironoreTimeStrArray = new Array();//矿山绘制数组
var ferrumComplete = new Array();
var harvestRemainTime = undefined;
var addResource;
var plantRemainTime = undefined;
var fieldStatus;
var fieldType;
var fieldId;

function doGetPlanInfo(data)
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
	farmlandUpMenu(getClickObjectIndex());
	changeMap('environsScreen_Layer');
}
function doEasyHarvestResource(data)//一键收取
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	/////////////////////////////////矿场	
	ironoreField = new Array();
	for(var a =0 ; a<data.resourceFieldRefresh.fieldAmount ; a++)
	{
		if(data.resourceFieldRefresh.ironoreField.length == 0)
		{
			    ironoreTimeStrArray[a] = "00:00:00";
				clearInterval(ironoreTimeArray[a]);
				ironoreField[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			   ferrum_Area[a][11] = ironoreField[a].fieldType;
               ferrum_Area[a][12] = ironoreField[a].fieldStatus;
		}
		else
		{
			 ironoreField[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			 for(var i=0; i<data.resourceFieldRefresh.ironoreField.length; i++)
			 {			 	
			 	 var id = data.resourceFieldRefresh.ironoreField[i].fieldId;
			 	 ironoreField[id] = {
							 	      fieldId : data.resourceFieldRefresh.ironoreField[i].fieldId,
									  fieldStatus : data.resourceFieldRefresh.ironoreField[i].fieldStatus,
									  fieldType : data.resourceFieldRefresh.ironoreField[i].fieldType,
									  remainTime :  data.resourceFieldRefresh.ironoreField[i].remainTime,
									  resourceValue :  0         
								};
							 clearInterval(ironoreTimeArray[id]);
							 ironoreCnt[id] = 0;
							 ironoreTimeStrArray[id] = "等待刷新";
							 ironoreTimeArray[id] = setInterval("ironoreListQueueTimer(" + ironoreField[id].remainTime +" ," +id+ ")",1000);

			 }
		    ferrum_Area[a][11] = ironoreField[a].fieldType;
	        ferrum_Area[a][12] = ironoreField[a].fieldStatus;
		}
	}

	foodFieldArray = new Array();
	for(var a =0 ; a<data.resourceFieldRefresh.fieldAmount ; a++)
	{
		if(data.resourceFieldRefresh.foodField.length == 0)
		{
			    foodTimeStrArray[a] = "00:00:00";
				clearInterval(foodTimeArray[a]);
				foodFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			   food_Area[a][10] = foodFieldArray[a].fieldType;
               food_Area[a][11] = foodFieldArray[a].fieldStatus;
		}
		else
		{
			 foodFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			 for(var i=0; i<data.resourceFieldRefresh.foodField.length; i++)
			 {
			 	 var id = data.resourceFieldRefresh.foodField[i].fieldId;
			 	 foodFieldArray[id] = {
							 	      fieldId : data.resourceFieldRefresh.foodField[i].fieldId,
									  fieldStatus : data.resourceFieldRefresh.foodField[i].fieldStatus,
									  fieldType : data.resourceFieldRefresh.foodField[i].fieldType,
									  remainTime :  data.resourceFieldRefresh.foodField[i].remainTime,
									  resourceValue :  0         
								};
							 clearInterval(foodTimeArray[id]);
							 foodCnt[id] = 0;
							 foodTimeStrArray[id] = "等待刷新";
							 foodTimeArray[id] = setInterval("foodListQueueTimer(" + foodFieldArray[id].remainTime +" ," +id+ ")",1000);

			 }
		    food_Area[a][10] = foodFieldArray[a].fieldType;
	        food_Area[a][11] = foodFieldArray[a].fieldStatus;
		}
		
		
	}
	///////////////////////////////////////////////////// 石头
	stoneFieldArray = new Array();
	for(var a =0 ; a<data.resourceFieldRefresh.fieldAmount ; a++)
	{
		if(data.resourceFieldRefresh.stoneField.length == 0)
		{
			    stoneTimeStrArray[a] = "00:00:00";
				clearInterval(stoneTimeArray[a]);
				stoneFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			   stone_Area[a][10] = stoneFieldArray[a].fieldType;
               stone_Area[a][11] = stoneFieldArray[a].fieldStatus;
		}
		else
		{
			 stoneFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			 for(var i=0; i<data.resourceFieldRefresh.stoneField.length; i++)
			 {
			 	 var id = data.resourceFieldRefresh.stoneField[i].fieldId;
			 	 stoneFieldArray[id] = {
							 	      fieldId : data.resourceFieldRefresh.stoneField[i].fieldId,
									  fieldStatus : data.resourceFieldRefresh.stoneField[i].fieldStatus,
									  fieldType : data.resourceFieldRefresh.stoneField[i].fieldType,
									  remainTime :  data.resourceFieldRefresh.stoneField[i].remainTime,
									  resourceValue :  0         
								};
							 clearInterval(stoneTimeArray[id]);
							 stoneCnt[id] = 0;
							 stoneTimeStrArray[id] = "等待刷新";
							 stoneTimeArray[id] = setInterval("stoneListQueueTimer(" + stoneFieldArray[id].remainTime +" ," +id+ ")",1000);

			 }
		    stone_Area[a][10] = stoneFieldArray[a].fieldType;
	        stone_Area[a][11] = stoneFieldArray[a].fieldStatus;
		}
	}
	/////////////////////////////////////////// 木材
	woodFieldArray = new Array();
	for(var a =0 ; a<data.resourceFieldRefresh.fieldAmount ; a++)
	{
		if(data.resourceFieldRefresh.woodField.length == 0)
		{
			    woodTimeStrArray[a] = "00:00:00";
				clearInterval(woodTimeArray[a]);
				woodFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			   wood_Area[a][10] = woodFieldArray[a].fieldType;
               wood_Area[a][11] = woodFieldArray[a].fieldStatus;
		}
		else
		{
			 woodFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			 for(var i=0; i<data.resourceFieldRefresh.woodField.length; i++)
			 {
			 	 var id = data.resourceFieldRefresh.woodField[i].fieldId;
			 	 woodFieldArray[id] = {
							 	      fieldId : data.resourceFieldRefresh.woodField[i].fieldId,
									  fieldStatus : data.resourceFieldRefresh.woodField[i].fieldStatus,
									  fieldType : data.resourceFieldRefresh.woodField[i].fieldType,
									  remainTime :  data.resourceFieldRefresh.woodField[i].remainTime,
									  resourceValue :  0         
								};
							 clearInterval(woodTimeArray[id]);
							 woodCnt[id] = 0;
							 woodTimeStrArray[id] = "等待刷新";
							 woodTimeArray[id] = setInterval("woodListQueueTimer(" + woodFieldArray[id].remainTime +" ," +id+ ")",1000);

			 }
		    wood_Area[a][10] = woodFieldArray[a].fieldType;
	        wood_Area[a][11] = woodFieldArray[a].fieldStatus;
		}
	}

	drawFood = false;
	envBtnCtr = true;
	EnvironsScreen();
	changeMap('environsScreen_Layer');
}
function doDeleteResourceField(data)//删除地块
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	if(data)
	{
		switch(growChoiceType)
		{
			case 0:
			  food_Area[growChoiceId][11] = 0;
			  break;
		    case 1:
		      wood_Area[growChoiceId][11] = 0;
		      break;
		    case 2:
		      //stone_Area[growChoiceId][10] = 0;
		      stone_Area[growChoiceId][11] = 0;
		      break;
		    case 3:
		      ferrum_Area[growChoiceId][12] = 0;
		      break;
		}
	}
	EnvironsScreen();
	changeMap('environsScreen_Layer');
}
function doPlantResource(data)//种植地块
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	fieldStatus = data.fieldStatus;
	fieldType = data.fieldType;
	fieldId = data.fieldId;
	EnvironsScreenBattleClass.handlers.resetCache();
	suburb.openSuburbUi(doGetUserFieldInfo);
}
function doHarvestResource(data)//单独收取地块资源
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	addResource = data.addResource;
  
}
var fieldAmountLen;//控制每个资源块开放块数
function doGetUserFieldInfo(data,targetCaracterId)//初始化城郊界面
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	fieldAmountLen = data.fieldAmount;
	ironoreField = new Array();
	for(var a =0 ; a < fieldAmountLen ; a ++)
	{
		if(data.ironoreField.length == 0)
		{
			    ironoreTimeStrArray[a] = "00:00:00";
				clearInterval(ironoreTimeStrArray[a]);
				ironoreField[a] = {
	
						  fieldStatus : 0,
						  fieldType : 3,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
				ferrum_Area[a][11] = ironoreField[a].fieldType;
                ferrum_Area[a][12] = ironoreField[a].fieldStatus;
		}
		else
		{
			ironoreField[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 3,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			 for(var i=0; i<data.ironoreField.length; i++)
			 {
			 	 var id = data.ironoreField[i].fieldId;
			 	 switch(data.ironoreField[i].fieldStatus)
			 	 {
			 	 	case 1:
			 	 	  ironoreField[id] = {
							 	      fieldId : data.ironoreField[i].fieldId,
									  fieldStatus : data.ironoreField[i].fieldStatus,
									  fieldType : data.ironoreField[i].fieldType,
									  remainTime :  data.ironoreField[i].remainTime,
									  resourceValue :  0         
								};
							 clearInterval(ironoreTimeArray[id]);
							 ironoreCnt[id] = 0;
							 ironoreTimeArray[id] = setInterval("ironoreListQueueTimer(" + ironoreField[id].remainTime +" ," +id+ ")",1000);
					 break;
				    case 2:
                      ironoreTimeStrArray[id] = "00:00:00";
                      clearInterval(ironoreTimeArray[id]);
			 	 	  ironoreField[id] = {
							 	      fieldId : data.ironoreField[i].fieldId,
									  fieldStatus : data.ironoreField[i].fieldStatus,
									  fieldType : data.ironoreField[i].fieldType,
									  remainTime :  0,
									  resourceValue : data.ironoreField[i].resourceValue         
								};
							 clearInterval(ironoreTimeArray[id]);
							 ironoreCnt[id] = 0;
							 ironoreTimeArray[id] = setInterval("ironoreListQueueTimer(" + ironoreField[id].remainTime +" ," +id+ ")",1000);
					 break;
			 	 }	
			 	

			 }
		    ferrum_Area[a][11] = ironoreField[a].fieldType;
            ferrum_Area[a][12] = ironoreField[a].fieldStatus;
		}
	}
	foodFieldArray = new Array();
	for(var a =0 ; a<fieldAmountLen ; a ++)
	{
		if(data.foodField.length == 0)
		{
			    foodTimeStrArray[a] = "00:00:00";
				clearInterval(foodTimeArray[a]);
				foodFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			   food_Area[a][10] = foodFieldArray[a].fieldType;
               food_Area[a][11] = foodFieldArray[a].fieldStatus;
		}
		else
		{
			 foodFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 0,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			 for(var i=0; i<data.foodField.length; i++)
			 {
			 	 var id = data.foodField[i].fieldId;
			 	 switch(data.foodField[i].fieldStatus)
			 	 {
			 	 	case 1:
			 	 	  foodFieldArray[id] = {
							 	      fieldId : data.foodField[i].fieldId,
									  fieldStatus : data.foodField[i].fieldStatus,
									  fieldType : data.foodField[i].fieldType,
									  remainTime :  data.foodField[i].remainTime,
									  resourceValue :  0         
								};
							 clearInterval(foodTimeArray[id]);
							 foodCnt[id] = 0;
							 foodTimeArray[id] = setInterval("foodListQueueTimer(" + foodFieldArray[id].remainTime +" ," +id+ ")",1000);
					 break;
				    case 2:
                      foodTimeStrArray[id] = "00:00:00";
                      clearInterval(foodTimeArray[id]);
			 	 	  foodFieldArray[id] = {
							 	      fieldId : data.foodField[i].fieldId,
									  fieldStatus : data.foodField[i].fieldStatus,
									  fieldType : data.foodField[i].fieldType,
									  remainTime :  0,
									  resourceValue : data.foodField[i].resourceValue         
								};
							 clearInterval(foodTimeArray[id]);
							 foodCnt[id] = 0;
							 foodTimeArray[id] = setInterval("foodListQueueTimer(" + foodFieldArray[id].remainTime +" ," +id+ ")",1000);
					 break;
			 	 }	
			 	

			 }
		    food_Area[a][10] = foodFieldArray[a].fieldType;
	        food_Area[a][11] = foodFieldArray[a].fieldStatus;
		}
	}
	
	stoneFieldArray = new Array();
	for(var a =0 ; a<fieldAmountLen ; a ++)
	{
		if(data.stoneField.length == 0)
		{
			    stoneTimeStrArray[a] = "00:00:00";
				clearInterval(stoneTimeStrArray[a]);
				stoneFieldArray[a] = {
	
						  fieldStatus : 0,
						  fieldType : 2,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
				 stone_Area[a][10] = stoneFieldArray[a].fieldType;
                 stone_Area[a][11] = stoneFieldArray[a].fieldStatus;
		}
		else
		{
			stoneFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 2,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			 for(var i=0; i<data.stoneField.length; i++)
			 {
			 	 var id = data.stoneField[i].fieldId;
			 	 switch(data.stoneField[i].fieldStatus)
			 	 {
			 	 	case 1:
			 	 	  stoneFieldArray[id] = {
							 	      fieldId : data.stoneField[i].fieldId,
									  fieldStatus : data.stoneField[i].fieldStatus,
									  fieldType : data.stoneField[i].fieldType,
									  remainTime :  data.stoneField[i].remainTime,
									  resourceValue :  0         
								};
							 clearInterval(stoneTimeArray[id]);
							 stoneCnt[id] = 0;
							 stoneTimeArray[id] = setInterval("stoneListQueueTimer(" + stoneFieldArray[id].remainTime +" ," +id+ ")",1000);
					 break;
				    case 2:
                      stoneTimeStrArray[id] = "00:00:00";
                      clearInterval(ironoreTimeStrArray[id]);
			 	 	  stoneFieldArray[id] = {
							 	      fieldId : data.stoneField[i].fieldId,
									  fieldStatus : data.stoneField[i].fieldStatus,
									  fieldType : data.stoneField[i].fieldType,
									  remainTime :  0,
									  resourceValue : data.stoneField[i].resourceValue         
								};
							 clearInterval(stoneTimeArray[id]);
							 stoneCnt[id] = 0;
							 stoneTimeArray[id] = setInterval("stoneListQueueTimer(" + stoneFieldArray[id].remainTime +" ," +id+ ")",1000);
					 break;
			 	 }	
			 	

			 }
		     stone_Area[a][10] = stoneFieldArray[a].fieldType;
             stone_Area[a][11] = stoneFieldArray[a].fieldStatus;
		}
	}
	woodFieldArray = new Array();
	for(var a =0 ; a<fieldAmountLen ; a ++)
	{
		if(data.woodField.length == 0)
		{
			    woodTimeStrArray[a] = "00:00:00";
				clearInterval(woodTimeStrArray[a]);
				woodFieldArray[a] = {
	
						  fieldStatus : 0,
						  fieldType : 1,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
				wood_Area[a][10] = woodFieldArray[a].fieldType;
                wood_Area[a][11] = woodFieldArray[a].fieldStatus;
		}
		else
		{
			woodFieldArray[a] = {
	                      fieldId:-1,
						  fieldStatus : 0,
						  fieldType : 1,
						  remainTime :  0,
						  resourceValue :  0 
						          
					};
			 for(var i=0; i<data.woodField.length; i++)
			 {
			 	 var id = data.woodField[i].fieldId;
			 	 switch(data.woodField[i].fieldStatus)
			 	 {
			 	 	case 1:
			 	 	  woodFieldArray[id] = {
							 	      fieldId : data.woodField[i].fieldId,
									  fieldStatus : data.woodField[i].fieldStatus,
									  fieldType : data.woodField[i].fieldType,
									  remainTime :  data.woodField[i].remainTime,
									  resourceValue :  0         
								};
							 clearInterval(woodTimeArray[id]);
							 woodCnt[id] = 0;
							 woodTimeArray[id] = setInterval("woodListQueueTimer(" + woodFieldArray[id].remainTime +" ," +id+ ")",1000);
					 break;
				    case 2:
                      woodTimeStrArray[id] = "00:00:00";
                      clearInterval(ironoreTimeStrArray[id]);
			 	 	  woodFieldArray[id] = {
							 	      fieldId : data.woodField[i].fieldId,
									  fieldStatus : data.woodField[i].fieldStatus,
									  fieldType : data.woodField[i].fieldType,
									  remainTime :  0,
									  resourceValue : data.woodField[i].resourceValue         
								};
							 clearInterval(woodTimeArray[id]);
							 woodCnt[id] = 0;
							 woodTimeArray[id] = setInterval("woodListQueueTimer(" + woodFieldArray[id].remainTime +" ," +id+ ")",1000);
					 break;
			 	 }	
			 	

			 }
		     wood_Area[a][10] = woodFieldArray[a].fieldType;
             wood_Area[a][11] = woodFieldArray[a].fieldStatus;
		}
    
	}
	drawFood = false;
	envBtnCtr = true;
	
	//城郊战斗数据初始化
	var tcid = targetCaracterId;
	if(typeof(tcid) == 'undefined' || typeof(tcid) != 'number')
		tcid = charId;
	
	EnvironsScreenBattleClass.handlers.openEnvironsScreenBattle(tcid);
	
	EnvironsScreen();
	changeMap('environsScreen_Layer');
}
var EnvironsScreen = function()//绘制城郊场景
{
	//document.body.style.cursor='wait';
	//document.body.style.cursor="url(images/mail/fdsadfasdf.jpg),default";
	    gbox.setRenderOrder(['environsScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
		gbox.addObject(
			{ 
				id : 'environs',
				group : 'environsScreen',
				tileset : 'environs',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [1440,0], [1440,742],[0,742]],
				initialize : function()
				{
					if(EnvironsScreenBattleClass.flag.domesticAffairs)
					{
					com_layer = 'environsScreen_Layer';
					com_group = group_src = 'environsScreen';
					//isJunqing = false;
					xiangqingCtr = false;
					}
				},
				first : function() 
				{	
					if(isBgMoving)
					{
						  worldMapStartX -= worldMoveX;
						  worldMapStartY -= worldMoveY;	  

						  isBgMoving = false; 
						  if(max_width==gbox.getScreenW())
						  {
						  	if(worldMapStartX<recordX-50
						   		||worldMapStartX >recordX+50
						   		||worldMapStartY <recordY-50
						   		||worldMapStartY >recordY+50
						 	 )
						 	 {
						  		recordX  = worldMapStartX;
								recordY  = worldMapStartY;				   	
								fromMap  = false;
						  		
						  	}
						  }
						  else 
						if(worldMapStartX<recordX-180
						   		||worldMapStartX >recordX+180
						   		||worldMapStartY <recordY-180
						   		||worldMapStartY >recordY+180)
						  {
									recordX  = worldMapStartX;
									recordY  = worldMapStartY;				   	
									fromMap  = false;
						  		
						  }
						  EnvironsScreenBattleClass.draw.setPosition(worldMapStartX,worldMapStartY);
					}	
				},
				myclick : function()
				{
					 isFarmland = false;
					 isJunqing = false;
					 xiangqingCtr = false;
					 isFarmlandAlert = false;
					 EnvironsScreen();
					 changeMap('environsScreen_Layer');
					 isShowAuctionPorp = false;
					 generalDrawBg = false;
					 var cX = (gbox.getScreenW() - gbox.getImage('environs').width)/2;
					 var cY = (gbox.getScreenH() - gbox.getImage('environs').height)/2;
                     var touchMoveX = lastTouchMoveX  + Math.abs(cX - worldMapStartX);
					 var touchMoveY = lastTouchMoveY  + Math.abs(cY - worldMapStartY);
					 if(EnvironsScreenBattleClass.flag.domesticAffairs)
					 {
						for(var i = 0; i < 12; i++)
						{
							//console.log(">>>>>>>>>>>");
							var food_poly = [ [food_Area[i][0],food_Area[i][1]], [food_Area[i][2],food_Area[i][3]], [food_Area[i][4],food_Area[i][5]],[food_Area[i][6],food_Area[i][7]]];
							if(gbox._mouseArea(food_poly,touchMoveX,touchMoveY))
							{
								grow_Type = 0;
								food_Id = i;
								
								if(plowMouseState)
								{
									switch(food_Area[i][11])
									{
								       case 0:
									      suburb.getPlanInfo(food_Area[i][10],doGetPlanInfo);
									      break;
								       case 2:
								          foodTimeStrArray[food_Id] = "等待刷新";
									      suburb.harvestResource(food_Id,food_Area[i][10],doHarvestResource);
									      harvestAlertMenu(getClickObjectIndex());
				                          changeMap('environsScreen_Layer'); 
									      break;
								      }
								}
								else
								{
									if(food_Area[i][11] == 1 || food_Area[i][11] == 2)
									{
										growChoiceType = grow_Type;
                                        growChoiceId = food_Id;                                   
                                        farmlandAlertMenu(getClickObjectIndex());
				                        changeMap('environsScreen_Layer');	
									}
								}

							}	

							
							var wood_poly = [ [wood_Area[i][0],wood_Area[i][1]], [wood_Area[i][2],wood_Area[i][3]], [wood_Area[i][4],wood_Area[i][5]],[wood_Area[i][6],wood_Area[i][7]]];
							if(gbox._mouseArea(wood_poly,touchMoveX,touchMoveY))
							{
								
								grow_Type = 1;
								wood_Id = i;
								if(plowMouseState)
								{
									switch(wood_Area[i][11])
									{
										case 0:
											suburb.getPlanInfo(wood_Area[i][10],doGetPlanInfo);
											break;
										case 2:
											suburb.harvestResource(wood_Id,wood_Area[i][10],doHarvestResource);
											harvestAlertMenu(getClickObjectIndex());
					                        changeMap('environsScreen_Layer'); 
											break;
								     }
								}
								else
								{
									if(wood_Area[i][11] == 1 || wood_Area[i][11] == 2)
									{
										growChoiceType = grow_Type;
                                        growChoiceId = wood_Id;
                                        farmlandAlertMenu(getClickObjectIndex());
                                        changeMap('environsScreen_Layer'); 
									}
								}						
							}
							
							var stone_poly = [ [stone_Area[i][0],stone_Area[i][1]], [stone_Area[i][2],stone_Area[i][3]], [stone_Area[i][4],stone_Area[i][5]],[stone_Area[i][6],stone_Area[i][7]]];
							if(gbox._mouseArea(stone_poly,touchMoveX,touchMoveY))
							{
								grow_Type = 2;
								stone_Id = i;
                                if(plowMouseState)
                                {
                                	switch(stone_Area[i][11])
									{
									case 0:
										suburb.getPlanInfo(stone_Area[i][10],doGetPlanInfo);
										break;
									case 2:
										suburb.harvestResource(stone_Id,stone_Area[i][10],doHarvestResource);
										harvestAlertMenu(getClickObjectIndex());
				                        changeMap('environsScreen_Layer'); 
										break;
									}
                                }
                                else
                                {
                                	if(stone_Area[i][11] == 1 || stone_Area[i][11] == 2)
									{
										growChoiceType = grow_Type;
                                        growChoiceId = stone_Id;
                                        farmlandAlertMenu(getClickObjectIndex()); 
                                        changeMap('environsScreen_Layer');
									}
                                }
								
							}		
							
							
							var ferrum_poly = [ [ferrum_Area[i][0],ferrum_Area[i][1]], [ferrum_Area[i][2],ferrum_Area[i][3]], [ferrum_Area[i][4],ferrum_Area[i][5]],[ferrum_Area[i][6],ferrum_Area[i][7]]];
							if(gbox._mouseArea(ferrum_poly,touchMoveX,touchMoveY))
							{
								grow_Type = 3;
								ferrum_Id = i;
                                if(plowMouseState)
                                {
                                	switch(ferrum_Area[i][12])
									{
									case 0:
										suburb.getPlanInfo(ferrum_Area[i][11],doGetPlanInfo);
										break;
									case 2:
										suburb.harvestResource(ferrum_Id,ferrum_Area[i][11],doHarvestResource);
									    harvestAlertMenu(getClickObjectIndex());
				                        changeMap('environsScreen_Layer'); 
										break;
									}
                                }
                                else
                                {
                                	if(ferrum_Area[i][12] == 1 || ferrum_Area[i][12] == 2)
									{
										growChoiceType = grow_Type;
                                        growChoiceId = ferrum_Id;
                                        farmlandAlertMenu(getClickObjectIndex());
                                        changeMap('environsScreen_Layer'); 
									}
                                }
								
							}	
						}
					}
						//城郊部队事件 start
						EnvironsScreenBattleClass.handlers.openWaitingList(lastTouchMoveX,lastTouchMoveY,getClickObjectIndex());
						EnvironsScreenBattleClass.handlers.openClickMenu(lastTouchMoveX,lastTouchMoveY,getClickObjectIndex());
					    //城郊部队事件 end
				},
				blit : function()
				{
					var cX = (gbox.getScreenW() - gbox.getImage('environs').width)/2;
					var cY = (gbox.getScreenH() - gbox.getImage('environs').height)/2;
					var cityX = (gbox.getScreenW() - gbox.getImage('envCity1').width)/2 + 35;
					var cityY = (gbox.getScreenH() - gbox.getImage('envCity1').height)/2 - 99;
					gbox.drawImage('environs',cX - worldMapStartX,cY - worldMapStartY);
					gbox.drawImage('envCity1',cityX - worldMapStartX,cityY - worldMapStartY);
					var moveX = touchMoveX  + Math.abs(cX - worldMapStartX);
					var moveY = touchMoveY  + Math.abs(cY - worldMapStartY);
					if(EnvironsScreenBattleClass.flag.domesticAffairs)
					{
					//////////////////////////////////////////////////////////////////////////////////////
					for(var i = 0; i<food_Area.length; i++)//粮食绘制
					{						
						switch(food_Area[i][11])
						{
							case 0://粮食地块开启状态
							   gbox.drawImage('grainOpen',food_Area[i][8] - worldMapStartX - envirousXoffset,food_Area[i][9] - worldMapStartY - envirousYoffset);
							   aniList(i,"food");
							  break;
							case 1://粮食生长中
							   gbox.drawImage('foodGreen',food_Area[i][8] - worldMapStartX - envirousXoffset + 2,food_Area[i][9] - worldMapStartY - envirousYoffset + 3);
							   var a = (food_Area[i][8] - worldMapStartX - envirousXoffset + 2) + 130;
							   var b = (food_Area[i][9] - worldMapStartY - envirousYoffset + 3) + 100;	
							   				
							   aniChoice(i,a,b,"food");
							   //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
							   if(typeof(foodTimeStrArray[i]) != "undefined" && foodTimeStrArray[i] != "00:00:00")
							   {
							     	gbox.drawTxtRect(foodTimeStrArray[i],(food_Area[i][8] - worldMapStartX - envirousXoffset + 2),(food_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 80,300,20,14,'#ffffff','#000000');
							   } 
							   else
							   {						
							       gbox.drawTxtRect("00:00:00",(food_Area[i][8] - worldMapStartX - envirousXoffset + 2),(food_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 80,300,20,14,'#ffffff','#000000');   
							   }		  
							  break;
							case 2://粮食成熟
							  gbox.drawImage('foodchengshu1',food_Area[i][8] - worldMapStartX - envirousXoffset + 2,food_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							  aniList(i,"food");
							  break;
							case 3://势力冲突
							  gbox.drawImage('influence',food_Area[i][8] - worldMapStartX - envirousXoffset + 2,food_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							  break;
						}
					}
					for(var i = 0; i<food_Area.length; i++)
					{
						var poly1 = [ [food_Area[i][0],food_Area[i][1]], [food_Area[i][2],food_Area[i][3]], [food_Area[i][4],food_Area[i][5]],[food_Area[i][6],food_Area[i][7]]];
						if(gbox._mouseArea(poly1,moveX,moveY))
						{
							
							switch(food_Area[i][11])
							{
								case 0://开启地块加亮
								    gbox.drawImage('grainOpenLight',food_Area[i][8] - worldMapStartX - envirousXoffset,food_Area[i][9] - worldMapStartY - envirousYoffset);
								  break;
								case 1://地块成长中加亮状态
								    gbox.drawImage('foodGreenLight',food_Area[i][8] - worldMapStartX - envirousXoffset + 2,food_Area[i][9] - worldMapStartY - envirousYoffset + 3);
							        if(typeof(foodTimeStrArray[i]) != "undefined" && foodTimeStrArray[i] != "00:00:00")
							        {
							             gbox.drawTxtRect(foodTimeStrArray[i],(food_Area[i][8] - worldMapStartX - envirousXoffset + 2),(food_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 80,300,20,14,'#ffffff','#000000');		  		   
							        }
							        else
							        {
							        	gbox.drawTxtRect("00:00:00",(food_Area[i][8] - worldMapStartX - envirousXoffset + 2),(food_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 80,300,20,14,'#ffffff','#000000');
							        }
								  break;
							   case 2://粮食成熟加亮
							     gbox.drawImage('foodchengshu2',food_Area[i][8] - worldMapStartX - envirousXoffset + 2,food_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							  break;
							}

					    }
					}
					/////////////////////////////////////////////////////////////////////////////////////////////////
					for(var i = 0; i<wood_Area.length; i++)//木材绘制
					{
						switch(wood_Area[i][11])
						{
							case 0://木材地块空地加亮
							  gbox.drawImage('woodOpen',wood_Area[i][8] - worldMapStartX - envirousXoffset,wood_Area[i][9] - worldMapStartY - envirousYoffset);
							  aniList(i,"wood");
							break;
							case 1://木材生长中
							  gbox.drawImage('woodshengchan1',wood_Area[i][8] - worldMapStartX - envirousXoffset + 2,wood_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							  var a = (wood_Area[i][8] - worldMapStartX - envirousXoffset + 2) + 65;
							  var b = (wood_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 5;
							  aniChoice(i,a,b,"wood");	
							  if(typeof(woodTimeStrArray[i]) != "undefined" && woodTimeStrArray[i] != "00:00:00")
									  {
									     	gbox.drawTxtRect(woodTimeStrArray[i],(wood_Area[i][8] - worldMapStartX - envirousXoffset + 2) -60,(wood_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');
									  } 
									  else
									  {						
									       gbox.drawTxtRect("00:00:00",(wood_Area[i][8] - worldMapStartX - envirousXoffset + 2) -60,(wood_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');     
									  }	
							  break;
							case 2://木材成熟
							  gbox.drawImage('woodchengshu1',wood_Area[i][8] - worldMapStartX - envirousXoffset + 2,wood_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							   aniList(i,"wood");
							  break;
							case 3://木材势力冲突
							   gbox.drawImage('woodchongtu',wood_Area[i][8] - worldMapStartX - envirousXoffset + 2,wood_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							  break;
						}
					}
					for(var i = 0; i<wood_Area.length; i++)
					{
						var poly1 = [ [wood_Area[i][0],wood_Area[i][1]], [wood_Area[i][2],wood_Area[i][3]], [wood_Area[i][4],wood_Area[i][5]],[wood_Area[i][6],wood_Area[i][7]]];
						if(gbox._mouseArea(poly1,moveX,moveY))
						{
							switch(wood_Area[i][11])
							{
								case 0://木材地块空地加亮
								  gbox.drawImage('woodOpenLight',wood_Area[i][8] - worldMapStartX - envirousXoffset,wood_Area[i][9] - worldMapStartY - envirousYoffset);
								  break;
							   case 1://木材生长中
							      gbox.drawImage('woodshengchan2',wood_Area[i][8] - worldMapStartX - envirousXoffset + 2,wood_Area[i][9] - worldMapStartY - envirousYoffset + 9);							   
							      if(typeof(woodTimeStrArray[i]) != "undefined" && woodTimeStrArray[i] != "00:00:00")
									  {
									     	gbox.drawTxtRect(woodTimeStrArray[i],(wood_Area[i][8] - worldMapStartX - envirousXoffset + 2) -60,(wood_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');
									  } 
									  else
									  {						
									       gbox.drawTxtRect("00:00:00",(wood_Area[i][8] - worldMapStartX - envirousXoffset + 2) -60,(wood_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');     
									  }	
							  break;
							  case 2://木材成熟
							     gbox.drawImage('woodchengshu2',wood_Area[i][8] - worldMapStartX - envirousXoffset + 2,wood_Area[i][9] - worldMapStartY - envirousYoffset + 9);							   							     
							  break;
							}
								
					    }
					}
					/////////////////////////////////////////////////////////////////////////////////////////////////////
					for(var i = 0; i<stone_Area.length; i++)//石头绘制
					{
						switch(stone_Area[i][11])
						{
							case 0:
							 gbox.drawImage('shitoushengzhang1',stone_Area[i][8] - worldMapStartX - envirousXoffset -1,stone_Area[i][9] - worldMapStartY - envirousYoffset + 7);							   							     							 
							  aniList(i,"stone");
							break;
							case 1://石头生长中
							 gbox.drawImage('shitoushengzhang1',stone_Area[i][8] - worldMapStartX - envirousXoffset -1,stone_Area[i][9] - worldMapStartY - envirousYoffset + 7);
							   var a = (stone_Area[i][8] - worldMapStartX - envirousXoffset + 2) + 60;
							   var b = (stone_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							   aniChoice(i,a,b,"stone");
							   if(typeof(stoneTimeStrArray[i]) != "undefined" && stoneTimeStrArray[i] != "00:00:00")
							   {
							   	     gbox.drawTxtRect(stoneTimeStrArray[i],(stone_Area[i][8] - worldMapStartX - envirousXoffset + 2) - 60,(stone_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');							  
							   }
							   else
							   {
							         gbox.drawTxtRect("00:00:00",(stone_Area[i][8] - worldMapStartX - envirousXoffset + 2)- 60,(stone_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');							  
							   }
							   
							  break;
							case 2://石头成熟
							  gbox.drawImage('shitou',stone_Area[i][8] - worldMapStartX - envirousXoffset + 60,stone_Area[i][9] - worldMapStartY - envirousYoffset + 20);							  
							  aniList(i,"stone");
							  break;
							case 3://石头势力冲突
							  gbox.drawImage('shitoushili',stone_Area[i][8] - worldMapStartX - envirousXoffset + 2,stone_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							  break;
						}
					}
					for(var i = 0; i<stone_Area.length; i++)
					{
						if(((stone_Area[i][0] < moveX) && (moveX < stone_Area[i][2])) && ((stone_Area[i][1] < moveY) && (moveY < stone_Area[i][5])))
						{
							  switch(stone_Area[i][11])
							  {
							  	 case 0:
							  	    gbox.drawImage('shitoushengzhang',stone_Area[i][8] - worldMapStartX - envirousXoffset - 2,stone_Area[i][9] - worldMapStartY - envirousYoffset + 7);
							  	  break;
							  	  case 1://石头生长中
							  	    gbox.drawImage('shitoushengzhang',stone_Area[i][8] - worldMapStartX - envirousXoffset -2,stone_Area[i][9] - worldMapStartY - envirousYoffset + 7);									
							        if(typeof(stoneTimeStrArray[i]) != "undefined" && stoneTimeStrArray[i] != "00:00:00")
									   {
									   	     gbox.drawTxtRect(stoneTimeStrArray[i],(stone_Area[i][8] - worldMapStartX - envirousXoffset + 2)- 60,(stone_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');							  
									   }
									else
									   {
									         gbox.drawTxtRect("00:00:00",(stone_Area[i][8] - worldMapStartX - envirousXoffset + 2)- 60,(stone_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');							  
									   }
							    break;
							    
							  break;
							  
							  }
								

					    }
					}
					///////////////////////////////////////////////////////////////////////////////////////////////
					for(var i = 0; i<ferrum_Area.length; i++)//矿石绘制
					{
						switch(ferrum_Area[i][12])
						{
							case 0:
							  if(!ferrum_Area[i][10])
							   {
							   	  gbox.drawImage('kuangshikaiqi2',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 10,ferrum_Area[i][9] - worldMapStartY - envirousYoffset);																   	 						     
							   }
							   else
							   {
							   	  gbox.drawImage('kuangshikaiqi3',ferrum_Area[i][8] - worldMapStartX - envirousXoffset,ferrum_Area[i][9] - worldMapStartY - envirousYoffset);							   	 						      					      
							   }
							  aniList(i,"ferrum");
							break;
							case 1://矿石生长中
							   if(!ferrum_Area[i][10])
							   {
							   	  gbox.drawImage('kuangshikaiqi2',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							      var a = (ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2) + 60;
							      var b = (ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							      aniChoice(i,a,b,"ferrum");
							   }
							   else
							   {
							   	  gbox.drawImage('kuangshikaiqi3',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							      var a = (ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2) + 60;
							      var b = (ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9);
							      aniChoice(i,a,b,"ferrum");						      
							   }
							   if(typeof(ironoreTimeStrArray[i]) != "undefined" && ironoreTimeStrArray[i] != "00:00:00")
									  {
									     	gbox.drawTxtRect(ironoreTimeStrArray[i],(ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2) -60,(ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');
									  } 
									  else
									  {						
									       gbox.drawTxtRect("00:00:00",(ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2) -60,(ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');     
									  }	
							  break;
							case 2://矿石成熟
							     if(ferrumComplete[i])
							     {
							     	gbox.drawImage('ferrumwancheng',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 30,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 20);
							        ferrumComplete[i] = false;
							     }
							     else
							     {
							     	gbox.drawImage('ferrumwancheng1',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 30,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 20);
							       ferrumComplete[i] = true;
							     }
							     aniList(i,"ferrum");
							  break;
							  case 3://矿石势力冲突
							   if(!ferrum_Area[i][10])
							      gbox.drawImage('ferrumchongtu',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9);							   
							    else
							      gbox.drawImage('ferrumchongtu2',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9);							   
							  break;
						}
					}
					for(var i = 0; i<ferrum_Area.length; i++)
					{
						if(((ferrum_Area[i][0] < moveX) && (moveX < ferrum_Area[i][2])) && ((ferrum_Area[i][1] < moveY) && (moveY < ferrum_Area[i][5])))
						{

						  switch(ferrum_Area[i][12])
						   {
						   	
						      case 0:
						          if(ferrum_Area[i][10])
									{
										gbox.drawImage('envMineLight',ferrum_Area[i][8] - worldMapStartX - envirousXoffset,ferrum_Area[i][9] - worldMapStartY - envirousYoffset);							   										
									}
									else
									{
										gbox.drawImage('envMineLightR',ferrum_Area[i][8] - worldMapStartX - envirousXoffset,ferrum_Area[i][9] - worldMapStartY - envirousYoffset);								
									}
									break;
							  case 1://矿石生长中
								   if(!ferrum_Area[i][10])
								      gbox.drawImage('ferrumkaiqi1',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9);						
								    else
								       gbox.drawImage('kuangshikaiqi4',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9);											       
							         if(typeof(ironoreTimeStrArray[i]) != "undefined" && ironoreTimeStrArray[i] != "00:00:00")
									  {
									     	gbox.drawTxtRect(ironoreTimeStrArray[i],(ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2) -60,(ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');
									  } 
									  else
									  {						
									       gbox.drawTxtRect("00:00:00",(ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 2) -60,(ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 9) + 30,300,20,14,'#ffffff','#000000');     
									  }	
							  break;
							case 2://矿石成熟
					                 gbox.drawImage('ferrumwancheng',ferrum_Area[i][8] - worldMapStartX - envirousXoffset + 30,ferrum_Area[i][9] - worldMapStartY - envirousYoffset + 20);																    
							  break;
						   }
					    }
					}
					///////////////////////////////////////////////
				    if(drawFood)
				    {
				    	gbox.drawImage('chengshu',2199 - worldMapStartX - envirousXoffset,784 - worldMapStartY - envirousYoffset);
				    }
					}
				    //城郊部队绘制 start
				    //等待列表按钮
				    EnvironsScreenBattleClass.draw.waitingListButton(touchMoveX,touchMoveY);
				    EnvironsScreenBattleClass.draw.playAnimation(touchMoveX,touchMoveY);
				    //城郊部队绘制 end
				}
			});
		if(EnvironsScreenBattleClass.flag.domesticAffairs)
		{
		 drawEnvBtn();
		}
		 //绘制公有按钮
		 drawCommonBtn('levelMenu_1','environsScreen','environsScreen_Layer');
		
};

var isFarmland = false;
var farmlandUpMenu = function(index)//绘制城郊种植弹出菜单
{
	var wmCX = (gbox.getScreenW() - gbox.getImage("FarmlandUP").width)/2;
	var wmCY = (gbox.getScreenH() - gbox.getImage("FarmlandUP").height)/2;
	var wmW = gbox.getImage('FarmlandUP').width;
	var wmH = gbox.getImage('FarmlandUP').height;
	
	isDrawUI[index] = true;
	isFarmland = true;
	gbox.addObject(
	{ 
		id : 'Farmland',
		group : 'levelMenu_1',
		tileset : 'FarmlandUP',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [wmCX,wmCY], [wmCX + wmW,wmCY], [wmCX + wmW,wmCY + wmH],[wmCX,wmCY + wmH]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{

            if(lastTouchMoveX > 927 && lastTouchMoveX < (927 + 23) && lastTouchMoveY > 280 && lastTouchMoveY < (280 + 23)){
                isFarmland = false;
				displayDestroy();
				exit(index);
                EnvironsScreen();
				changeMap('environsScreen_Layer');
            }else
            if(lastTouchMoveX > 884 && lastTouchMoveX < (884 + 50) && lastTouchMoveY > 304 && lastTouchMoveY < (304 + 26)){
            	switch(grow_Type){
            		case 0:
            			suburb.plantResource(food_Id,food_Area[food_Id][10],0,doPlantResource);
            			break;
            		case 1:
            			suburb.plantResource(wood_Id,wood_Area[wood_Id][10],0,doPlantResource);
            			break;
            		case 2:
            			suburb.plantResource(stone_Id,stone_Area[stone_Id][10],0,doPlantResource);
            			break;
            		case 3:
            			suburb.plantResource(ferrum_Id,ferrum_Area[ferrum_Id][11],0,doPlantResource);
            			break;
            	}
                isFarmland = false;
				exit(index);
                EnvironsScreen();
				changeMap('environsScreen_Layer');
        	}else
        	if(lastTouchMoveX > 884 && lastTouchMoveX < (884 + 50) && lastTouchMoveY > 348 && lastTouchMoveY < (348 + 26)){
            	switch(grow_Type){
        		case 0:
        			suburb.plantResource(food_Id,food_Area[food_Id][10],1,doPlantResource);
        			break;
        		case 1:
        			suburb.plantResource(wood_Id,wood_Area[wood_Id][10],1,doPlantResource);
        			break;
        		case 2:
        			suburb.plantResource(stone_Id,stone_Area[stone_Id][10],1,doPlantResource);
        			break;
        		case 3:
        			suburb.plantResource(ferrum_Id,ferrum_Area[ferrum_Id][11],1,doPlantResource);
        			break;
        	}
                isFarmland = false;
                exit(index);
                EnvironsScreen();
				changeMap('environsScreen_Layer');
        	}else
        	if(lastTouchMoveX > 884 && lastTouchMoveX < (884 + 50) && lastTouchMoveY > 388 && lastTouchMoveY < (388 + 26)){
            	switch(grow_Type){
        		case 0:
        			suburb.plantResource(food_Id,food_Area[food_Id][10],2,doPlantResource);
        			break;
        		case 1:
        			suburb.plantResource(wood_Id,wood_Area[wood_Id][10],2,doPlantResource);
        			break;
        		case 2:
        			suburb.plantResource(stone_Id,stone_Area[stone_Id][10],2,doPlantResource);
        			break;
        		case 3:
        			suburb.plantResource(ferrum_Id,ferrum_Area[ferrum_Id][11],2,doPlantResource);
        			break;
        	}
                isFarmland = false;
                exit(index);
                EnvironsScreen();
				changeMap('environsScreen_Layer');
        	}else
        	if(lastTouchMoveX > 884 && lastTouchMoveX < (884 + 50) && lastTouchMoveY > 432 && lastTouchMoveY < (432 + 26)){
            	switch(grow_Type){
        		case 0:
        			suburb.plantResource(food_Id,food_Area[food_Id][10],3,doPlantResource);
        			break;
        		case 1:
        			suburb.plantResource(wood_Id,wood_Area[wood_Id][10],3,doPlantResource);
        			break;
        		case 2:
        			suburb.plantResource(stone_Id,stone_Area[stone_Id][10],3,doPlantResource);
        			break;
        		case 3:
        			suburb.plantResource(ferrum_Id,ferrum_Area[ferrum_Id][11],3,doPlantResource);
        			break;
        	}
                isFarmland = false;
                exit(index);
                EnvironsScreen();
				changeMap('environsScreen_Layer');
        	}else
            {
        		isFarmlandAlert = false;
        		exit(index);
				farmlandUpMenu(getClickObjectIndex());
				changeMap('environsScreen_Layer');
            }
			
		},
		blit : function()
		{
			 if(isDrawUI[index] && isFarmland)
			 {
				    gbox.drawImage("FarmlandUP",wmCX,wmCY);
				    gbox.drawString("种植",891,307,'#FFFFFF',14);
				    gbox.drawString("种植",891,350,'#FFFFFF',14);
				    gbox.drawString("种植",891,390,'#FFFFFF',14);
				    gbox.drawString("种植",891,432,'#FFFFFF',14);
	            	if(touchMoveX > 884 && touchMoveX < (884 + 50) && touchMoveY > 303 && touchMoveY < (303 + 26)){
	            		gbox.drawImage("farmlandBtn",882,302);
	            	}else
	            	if(touchMoveX > 884 && touchMoveX < (884 + 50) && touchMoveY > 346 && touchMoveY < (346 + 26)){
	            		gbox.drawImage("farmlandBtn",882,345);
	            	}else
	            	if(touchMoveX > 884 && touchMoveX < (884 + 50) && touchMoveY > 386 && touchMoveY < (386 + 26)){
	            		gbox.drawImage("farmlandBtn",882,385);
	            	}else
	            	if(touchMoveX > 884 && touchMoveX < (884 + 50) && touchMoveY > 429 && touchMoveY < (429 + 26)){
	            		gbox.drawImage("farmlandBtn",882,427);
	            	}
	            	
	            	switch(grow_Type)
	            	{
	            		case 0:
	            		  for(var i=0; i<planInfo.length; i++)
			            	{
			            		if(i == 0)
			            		{
			            			gbox.drawImage("nc_tb_09_1",wmCX + 9,wmCY + 24);
			            			gbox.drawString("种植劣质粮食需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 23,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "粮食.",wmCX + 56, wmCY + 42,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 1)
			            		{
			            			gbox.drawImage("nc_tb_09_2",wmCX + 9,wmCY + 64);
			            			gbox.drawString("种植普通粮食需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 64,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "粮食.",wmCX + 56, wmCY + 83,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 2)
			            		{
			            			gbox.drawImage("nc_tb_09_3",wmCX + 9,wmCY + 106);
			            			gbox.drawString("种植高级粮食需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 106,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "粮食.",wmCX + 56, wmCY + 125,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 3)
			            		{
			            			gbox.drawImage("nc_tb_09_4",wmCX + 9,wmCY + 147);
			            			gbox.drawString("种植精品粮食需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 147,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "粮食.",wmCX + 56, wmCY + 166,'#FFFFFF',14);
			            			
			            		}
			            	}
	            		  break;
	            		case 1:
	            		  for(var i=0; i<planInfo.length; i++)
			            	{
			            		if(i == 0)
			            		{
			            			gbox.drawImage("nc_tb_10_1",wmCX + 9,wmCY + 24);
			            			gbox.drawString("开采劣质木材需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 23,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "木材.",wmCX + 56, wmCY + 42,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 1)
			            		{
			            			gbox.drawImage("nc_tb_10_2",wmCX + 9,wmCY + 64);
			            			gbox.drawString("开采普通木材需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56,  wmCY + 64,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "木材.",wmCX + 56,  wmCY + 83,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 2)
			            		{
			            			gbox.drawImage("nc_tb_10_3",wmCX + 9,wmCY + 106);
			            			gbox.drawString("开采高级木材需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 106,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "木材.",wmCX + 56, wmCY + 125,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 3)
			            		{
			            			gbox.drawImage("nc_tb_10_4",wmCX + 9,wmCY + 147);
			            			gbox.drawString("开采精品木材需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 147,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "木材.",wmCX + 56, wmCY + 166,'#FFFFFF',14);
			            			
			            		}
			            	}
	            		  break;
	            		  case 2:
	            		  for(var i=0; i<planInfo.length; i++)
			            	{
			            		if(i == 0)
			            		{
			            			gbox.drawImage("nc_tb_11_1",wmCX + 9,wmCY + 24);
			            			gbox.drawString("开采劣质石料需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 23,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "石料.",wmCX + 56, wmCY + 42,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 1)
			            		{
			            			gbox.drawImage("nc_tb_11_2",wmCX + 9,wmCY + 64);
			            			gbox.drawString("开采普通石料需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56,  wmCY + 64,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "石料.",wmCX + 56,  wmCY + 83,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 2)
			            		{
			            			gbox.drawImage("nc_tb_11_3",wmCX + 9,wmCY + 106);
			            			gbox.drawString("开采高级石料需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 106,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "石料.",wmCX + 56, wmCY + 125,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 3)
			            		{
			            			gbox.drawImage("nc_tb_11_4",wmCX + 9,wmCY + 147);
			            			gbox.drawString("开采精品石料需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 147,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "石料.",wmCX + 56, wmCY + 166,'#FFFFFF',14);
			            			
			            		}
			            	}
	            		  break;
	            		  case 3:
	            		  for(var i=0; i<planInfo.length; i++)
			            	{
			            		if(i == 0)
			            		{
			            			gbox.drawImage("nc_tb_12_1",wmCX + 9,wmCY + 24);
			            			gbox.drawString("开采劣质铁矿需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 23,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "铁矿.",wmCX + 56, wmCY + 42,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 1)
			            		{
			            			gbox.drawImage("nc_tb_12_2",wmCX + 9,wmCY + 64);
			            			gbox.drawString("开采普通铁矿需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56,  wmCY + 64,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "铁矿.",wmCX + 56, wmCY + 83,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 2)
			            		{
			            			gbox.drawImage("nc_tb_12_3",wmCX + 9,wmCY + 106);
			            			gbox.drawString("开采高级铁矿需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 106,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "铁矿.",wmCX + 56, wmCY + 125,'#FFFFFF',14);
			            			
			            		}
			            		if(i == 3)
			            		{
			            			gbox.drawImage("nc_tb_12_4",wmCX + 9,wmCY + 147);
			            			gbox.drawString("开采精品铁矿需要:" + planInfo[i].needPeople + "人口," + "成熟周期:" + planInfo[i].needTime + "小时",wmCX + 56, wmCY + 147,'#FFFFFF',14);
			            			gbox.drawString("可收取:" + planInfo[i].addResource + "铁矿.",wmCX + 56, wmCY + 166,'#FFFFFF',14);
			            			
			            		}
			            	}
	            		  break;
	            	}
	            	
	            	
	            	
			 }
			
		}		
	 });	
};
var harvestAlert = false;
var harvestAlertMenu = function(index)//收获前提示
{
	var wmCX = (gbox.getScreenW() - gbox.getImage("ty_an_55").width)/2;
	var wmCY = (gbox.getScreenH() - gbox.getImage("ty_an_55").height)/2;
	var wmW = gbox.getImage('ty_an_55').width;
	var wmH = gbox.getImage('ty_an_55').height;
	
	isDrawUI[index] = true;
	harvestAlert = true;
	gbox.addObject(
	{ 
		id : 'HarvestAlertMenu',
		group : 'levelMenu_2',
		tileset : 'ty_an_55',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [wmCX,wmCY], [wmCX + wmW,wmCY], [wmCX + wmW,wmCY + wmH],[wmCX,wmCY + wmH]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
   	        if(lastTouchMoveX > 697 && lastTouchMoveX < 745 && lastTouchMoveY > 392 && lastTouchMoveY < 420)
   	        {
   	        	harvestAlert = false;
                exit(index);
                EnvironsScreenBattleClass.handlers.resetCache();
                suburb.openSuburbUi(doGetUserFieldInfo);
        	}
        	else{
            	harvestAlertMenu(getClickObjectIndex());
				changeMap('environsScreen_Layer');
            }
			
		},
		blit : function()
		{
			 if(isDrawUI[index] && harvestAlert)
			 {
			 	    
				    gbox.drawImage("ty_an_55",wmCX,wmCY);
				    switch(grow_Type)
				    {
				    	case 0:
				    	gbox.drawString("收取成功：获得" + addResource + "粮食",627, 352,'#ffffff',14);
				    	foodTimeStrArray[food_Id] = "00:00:00";
				    	break;
				    	case 1:
				    	gbox.drawString("收取成功：获得" + addResource + "木材",627, 352,'#ffffff',14);
				    	woodTimeStrArray[wood_Id] = "00:00:00";
				    	break;
				    	case 2:
				    	gbox.drawString("收取成功：获得" + addResource + "石材",627, 352,'#ffffff',14);
				    	stoneTimeStrArray[stone_Id] = "00:00:00";
				    	break;
				    	case 3:
				    	gbox.drawString("收取成功：获得" + addResource + "铁矿",627, 352,'#ffffff',14);
				    	ironoreTimeStrArray[ferrum_Id] = "00:00:00";
				    	break;
				    }
				    gbox.drawImage("ty_an_08",697,394);				 
	            	if(touchMoveX > 696 && touchMoveX < 747 && touchMoveY > 393 && touchMoveY < 418){
	            		gbox.drawImage("ty_an_06",697,394);
	            	}
	            	var strW = gbox.getTextWidth("确定",14);
					var cntX = 697 + (50 - strW)/2;
					var cntY = 394 + (26 - 14)/2;
				    gbox.drawDanceString("确定", cntX,cntY,14,'#000000','#ffffff');
			 }
			
		}		
	 });	
};
var isFarmlandAlert = false;
var farmlandAlertMenu = function(index)//犁地前提示
{
	var wmCX = (gbox.getScreenW() - gbox.getImage("farmlandAlert").width)/2;
	var wmCY = (gbox.getScreenH() - gbox.getImage("farmlandAlert").height)/2;
	var wmW = gbox.getImage('farmlandAlert').width;
	var wmH = gbox.getImage('farmlandAlert').height;
	
	isDrawUI[index] = true;
	isFarmlandAlert = true;
	gbox.addObject(
	{ 
		id : 'FarmlandAlertMenu',
		group : 'levelMenu_2',
		tileset : 'farmlandAlert',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [wmCX,wmCY], [wmCX + wmW,wmCY], [wmCX + wmW,wmCY + wmH],[wmCX,wmCY + wmH]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
   	        if(lastTouchMoveX > 617 && lastTouchMoveX < 667 && lastTouchMoveY > 396 && lastTouchMoveY < (396 + 26))
   	        {
   	        	isFarmlandAlert = false;
                exit(index);
                suburb.deleteResourceField(growChoiceId,growChoiceType,doDeleteResourceField);
        	}else if(lastTouchMoveX > 768 && lastTouchMoveX < (768 + 50) && lastTouchMoveY > 396 && lastTouchMoveY < (396 + 26))
        	{
        		isFarmlandAlert = false;
                exit(index);
                EnvironsScreen();
	            changeMap('environsScreen_Layer');
        	}
        	else{
            	farmlandAlertMenu(getClickObjectIndex());
				changeMap('environsScreen_Layer');
            }
			
		},
		blit : function()
		{
			 if(isDrawUI[index] && isFarmlandAlert)
			 {
				    gbox.drawImage("farmlandAlert",wmCX,wmCY);
				    gbox.drawString(" 该作物未成熟,直接犁地不会获得资源.",wmCX + 1, wmCY + 27,'#ffffff',14);	
				    gbox.drawString(" 是否犁地?",wmCX + 95, wmCY + 55,'#ffffff',14);			   
	            	if(touchMoveX > 617 && touchMoveX < (617 + 50) && touchMoveY > 396 && touchMoveY < (396 + 26)){
	            		gbox.drawImage("ty_an_06",617,395);
	            	}else
	            	if(touchMoveX > 768 && touchMoveX < (768 + 50) && touchMoveY > 396 && touchMoveY < (396 + 26)){
	            		gbox.drawImage("ty_an_06",768,395);
	            	}
	            	var strW = gbox.getTextWidth("确定",14);
					var cntX = 617 + (50 - strW)/2;
					var cntY = 395 + (26 - 14)/2;
				    gbox.drawDanceString("确定", cntX,cntY,14,'#000000','#ffffff');
				    var strW = gbox.getTextWidth("返回",14);
					var cntX = 768 + (50 - strW)/2;
					var cntY = 395 + (26 - 14)/2;
				    gbox.drawDanceString("返回", cntX,cntY,14,'#000000','#ffffff');
			 }
			
		}		
	 });	
};
var plowMouseState = true;
var drawEnvBtn = function()
{//城郊收取与铲地按钮
	gbox.setRenderOrder(['environsScreen','levelMenu_1','levelMenu_2']);
	gbox.addObject(
	{ 
		id : 'environsBtn',
		group : 'levelMenu_1',
		tileset : 'nc_tb_05',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [1140,7], [1417,7], [1417,69],[1140,69]],
		initialize : function()
		{
		},
		first : function() 
		{	
			if(envBtnCtr)
			{
				 var tempOffset = 0;
                if(document.body.clientWidth>1440)
                {
                	tempOffset = 1440;
                }
                else 
                {
                	tempOffset = document.body.clientWidth;
                }
				if(tempOffset > 1200)
					{
						zim_an_bjX = (tempOffset - 60*2 - 40) + document.body.scrollLeft ;
					}
				else
					{
						zim_an_bjX = (1440 - 60*2 - 40) ;
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
				var zim_an_bjY = 10 +  document.body.scrollTop ;  
				this.poly = [[zim_an_bjX,zim_an_bjY],[zim_an_bjX  + 140,zim_an_bjY],[zim_an_bjX  + 140,zim_an_bjY + 60],[zim_an_bjX,zim_an_bjY + 60]];
			}
			else
			{
				this.poly = [[0,0],[0,0],[0,0],[0,0]];
			}   
		},
		myclick : function()
		{
			if(envBtnCtr)
			{
				    var tempOffset = 0;
	                if(document.body.clientWidth>1440)
	                {
	                	tempOffset = 1440;
	                }
	                else 
	                {
	                	tempOffset = document.body.clientWidth;
	                }
				    if(tempOffset > 1200)
					{
						zim_an_bjX = (tempOffset - 60*2 - 40) + document.body.scrollLeft ;
					}
				    else
					{
						zim_an_bjX = (1440 - 60*2 - 40);
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
					var zim_an_bjY = 10 +  document.body.scrollTop ; 
				if(lastTouchMoveX > (zim_an_bjX) && lastTouchMoveX < (zim_an_bjX+ 60) && lastTouchMoveY > (zim_an_bjY + 5) && lastTouchMoveY < (zim_an_bjY + 72))
				{
					suburb.easyHarvestResource(doEasyHarvestResource);
				}
				if(lastTouchMoveX > (65 + zim_an_bjX) && lastTouchMoveX < (zim_an_bjX + 140 )&& lastTouchMoveY > (zim_an_bjY + 5) && lastTouchMoveY < (zim_an_bjY + 72))
				{
					plowMouseState = !plowMouseState;
					if(!plowMouseState)
					{
						//document.body.style.cursor="url(images/mail/system.png),url(/images/mail/system.png),default";
						document.body.style.cursor = "hand";					
					}	  
					else
					{
						document.body.style.cursor="default";
					}
				}
				
				
			}
			
		},
		blit : function()
		{
			if(envBtnCtr)
			{
                var zim_an_bjX;
                var tempOffset = 0;
                if(document.body.clientWidth>1440)
                {
                	tempOffset = 1440;
                }
                else 
                {
                	tempOffset = document.body.clientWidth;
                }
				if(tempOffset > 1200)
					{
						zim_an_bjX = (tempOffset - 60*2 - 40) + document.body.scrollLeft ;
					}
				else
					{
						zim_an_bjX = (1440 - 60*2 - 40);
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
				var zim_an_bjY = 10 +  document.body.scrollTop ; 
			   gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'nc_tb_05',
							tile : 0,
							dx :zim_an_bjX,
							dy :zim_an_bjY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					    });
			    if(plowMouseState)
			    {
			    	  gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'nc_tb_01',
							tile : 0,
							dx :zim_an_bjX + 70,
							dy :zim_an_bjY,
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
							tileset : 'nc_tb_03',
							tile : 0,
							dx :zim_an_bjX + 70,
							dy :zim_an_bjY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					    });		
			    }
			  

				 if(((touchMoveX > zim_an_bjX) && (touchMoveX < (zim_an_bjX + 60))) && ((touchMoveY > (7 + zim_an_bjY) ) && (touchMoveY<(67+ zim_an_bjY))))
					{
						gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'nc_tb_06',
							tile : 0,
							dx :zim_an_bjX,
							dy :zim_an_bjY - 1,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					    });
					}
				if(((touchMoveX > (zim_an_bjX + 70)) && (touchMoveX < (zim_an_bjX + 140))) && ((touchMoveY > (7+ zim_an_bjY)) && (touchMoveY<(67+ zim_an_bjY))))
					{
						if(plowMouseState)
						{
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'nc_tb_02',
								tile : 0,
								dx :zim_an_bjX + 70,
							    dy :zim_an_bjY - 1,
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
								tileset : 'nc_tb_04',
								tile : 0,
								dx :zim_an_bjX + 70,
							    dy :zim_an_bjY - 1,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						    });
							
						}
						
					}	
			}
			  
		}		
	 });
};
/*
 *  处理动画隐藏
 */
function aniList(i,environsName)
 {
 	eval(environsName + i).isVisible = false; 
 }
 /*
 *  处理动画切换
 */
function aniChoice(i,x,y,environsName)
{
 	
 	eval(environsName + i).isVisible = true;
	eval(environsName + i).move(x,y);
	gbox.addObject(eval(environsName + i));
}
 /*
  *  粮食时间控制
  */
function foodListQueueTimer(initData,i){
	foodCnt[i] = foodCnt[i] + 1;
	foodTimeStrArray[i] = changeTimeformat((initData - foodCnt[i])*1000);
};
/*
*  石头时间控制
*/
function stoneListQueueTimer(initData,i){
	stoneCnt[i] = stoneCnt[i] + 1;
	stoneTimeStrArray[i] = changeTimeformat((initData - stoneCnt[i])*1000);
};
/*
*  木头时间控制
*/
function woodListQueueTimer(initData,i){
	woodCnt[i] = woodCnt[i] + 1;
	woodTimeStrArray[i] = changeTimeformat((initData - woodCnt[i])*1000);
};

/*
*  木头时间控制
*/
function ironoreListQueueTimer(initData,i){
	ironoreCnt[i] = ironoreCnt[i] + 1;
	ironoreTimeStrArray[i] = changeTimeformat((initData - ironoreCnt[i])*1000);
};