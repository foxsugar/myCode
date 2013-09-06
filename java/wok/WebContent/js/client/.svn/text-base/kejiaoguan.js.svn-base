var homeAffairsName = new Array();
    homeAffairsName[0] = "建造建筑时间缩短";
    homeAffairsName[1] = "民居上限增加";
    homeAffairsName[2] = "军营上限增加";
    homeAffairsName[3] = "膏药生长速度提升";
    homeAffairsName[4] = "粮食产量增加";
    homeAffairsName[5] = "铁矿产量增加";
    homeAffairsName[6] = "木材产量增加";
    homeAffairsName[7] = "石料产量增加";
    homeAffairsName[8] = "地窖保护上限提高";
    homeAffairsName[9] = "人口增长速度提高";
    homeAffairsName[10] = "君主获得声望提高";
    homeAffairsName[11] = "研究科技时间缩短";
    homeAffairsName[12] = "资源生长时间缩短";
    homeAffairsName[13] = "城墙工事上限提高";
    homeAffairsName[14] = "铜币产量增加";
    homeAffairsName[15] = "民心恢复速度提升";
var soldiersName = new Array();
    soldiersName[0] = "刀兵等级";
    soldiersName[1] = "弓兵等级";
    soldiersName[2] = "枪兵等级";
    soldiersName[3] = "骑兵等级";
    soldiersName[4] = "车兵等级";
var soldiersLevel = new Array();
    soldiersLevel[0] = "0";
    soldiersLevel[1] = "0";
    soldiersLevel[2] = "0";
    soldiersLevel[3] = "0";
    soldiersLevel[4] = "0";
var formationName = new Array();
    formationName[0] = "鹤翼之阵";
    formationName[1] = "乌云之阵";
    formationName[2] = "鱼鳞之阵";
    formationName[3] = "雁行之阵";
    formationName[4] = "玄襄之阵";
    formationName[5] = "锋矢之阵";
    formationName[6] = "长蛇之阵";
    formationName[7] = "箕型之阵";
    formationName[8] = "钩型之阵";
    formationName[9] = "偃月之阵";
    formationName[10] = "衡轭之阵";
    formationName[11] = "锥型之阵";
var formationLevel = new Array();
    formationLevel[0] = "0";
    formationLevel[1] = "0";
    formationLevel[2] = "0";
    formationLevel[3] = "0";
    formationLevel[4] = "0";
    formationLevel[5] = "0";
    formationLevel[6] = "0";
    formationLevel[7] = "0";
    formationLevel[8] = "0";
    formationLevel[9] = "0";
    formationLevel[10] = "0";
    formationLevel[11] = "0";
var isKejiaoguan = false;
var homeAffairsPage = true;//内政
var soldiersPage = false;//兵种
var formationPage = false;//阵法
var techKey = -1;
var completeStatus = new Array;//控制时间到00:00:00时回调调用
completeStatus[0] = false;
completeStatus[1] = false;
completeStatus[2] = false;
var buttonCoordinateX = [
                           [345,394],//内政按钮
                           [400,452],//兵种按钮
                           [458,509]//兵种按钮
                        ];
var buttonCoordinateY = [
                           [273,300],//内政按钮
                           [273,300],//兵种按钮
                           [273,300]//兵种按钮
                        ];  
var soldier_Area = [//兵种树形结构控制区域点
    [[611,315], [642,315], [642,347],[611,347]],
    [[697,315], [728,315], [728,347],[697,347]],
    [[783,315], [815,315], [815,347],[783,347]],
    [[870,315], [901,315], [901,347],[870,347]],
    [[956,315], [988,315], [988,347],[956,347]],
    [[1042,315], [1073,315], [1073,347],[1042,347]],
    
    [[611,377], [642,377], [642,409],[611,409]],
    [[697,377], [728,377], [728,409],[697,409]],
    [[783,377], [815,377], [815,409],[783,409]],
    [[870,377], [901,377], [901,409],[870,409]],
    [[956,377], [988,377], [988,409],[956,409]],
    [[1042,377], [1073,377], [1073,409],[1042,409]],
    
    [[611,436], [642,436], [642,469],[611,469]],
    [[697,436], [728,436], [728,469],[697,469]],
    [[783,436], [815,436], [815,469],[783,469]],
    [[870,436], [901,436], [901,469],[870,469]],
    [[956,436], [988,436], [988,469],[956,469]],
    [[1042,436], [1073,436], [1073,469],[1042,469]],
    
    [[611,497], [642,497], [642,530],[611,530]],
    [[697,497], [728,497], [728,530],[697,530]],
    [[783,497], [815,497], [815,530],[783,530]],
    [[870,497], [901,497], [901,530],[870,530]],
    [[956,497], [988,497], [988,530],[956,530]],
    [[1042,497], [1073,497], [1073,530],[1042,530]],
    
    [[611,557], [642,557], [642,589],[611,589]],
    [[697,557], [728,557], [728,589],[697,589]],
    [[783,557], [815,557], [815,589],[783,589]],
    [[870,557], [901,557], [901,589],[870,589]],
    [[956,557], [988,557], [988,589],[956,589]],
    [[1042,557], [1073,557], [1073,589],[1042,589]],
];
var homeAffairs_Area = [//内政树形结构控制区域点
   [[646,322], [676,322], [676,353],[646,353]],
   [[739,322], [768,322], [768,353],[739,353]],
   [[831,322], [860,322], [860,353],[831,353]],
   [[924,322], [954,322], [954,353],[924,353]],   
   [[739,393], [768,393], [768,423],[739,423]],
   [[831,393], [860,393], [860,423],[831,423]],
   [[924,393], [954,393], [954,423],[924,423]],
   [[1017,393], [1048,393], [1048,423],[1017,423]],  
   [[646,468], [676,468], [676,499],[646,499]],
   [[739,468], [768,468], [768,499],[739,499]],
   [[831,468], [860,468], [860,499],[831,499]],
   [[924,468], [954,468], [954,499],[924,499]],
   [[1017,468], [1048,468], [1048,499],[1017,499]],  
   [[739,546], [768,546], [768,577],[739,577]],
   [[831,546], [860,546], [860,577],[831,577]],
   [[924,546], [954,546], [954,577],[924,577]],
]; 
var formationPage_Area = [//阵法结构控制区域点
   [[607,315], [655,315], [655,362],[607,362]],
   [[607,386], [655,386], [655,431],[607,431]],
   [[607,455], [655,455], [655,502],[607,502]],
   [[607,525], [655,525], [655,571],[607,571]],
];
/*
 *  阵法降级处理回调
 */
function dolevelDownFormation(data)
{
	if(typeof(data.error) != "undefined")
	{
		kejiaoguan(getClickObjectIndex());
		kejiaoguanList(getClickObjectIndex());
		scienceStudyAlert(getClickObjectIndex(),data.error);
        changeMap('cityMenuLayer');	
		return;
	}
	techPoint = data.techPoint;
	switch(data.techForUpdate.techStatus)
		{
			case 0:
			case 1:
					userFormationTech[techKey] = 
					{
						currentEffect : data.techForUpdate.currentEffect,//当前阵法状态
						description : data.techForUpdate.description,//阵法描述
						maxLevel : data.techForUpdate.maxLevel,//可升至最高级别
						needTime : data.techForUpdate.needTime,//需要时间
						nextEffect : data.techForUpdate.nextEffect,//下一级功能描述
						smallIcon : data.techForUpdate.smallIcon,//阵法图标
						techLevel : data.techForUpdate.techLevel,//当前级别
						techName : data.techForUpdate.techName,//阵法名称
						techStatus : data.techForUpdate.techStatus,//阵法状态
						techType : data.techForUpdate.techType,//科技方式
						tooltip:{
						  	       	  name : data.techForUpdate.techName,
						  	       	  type : data.techForUpdate.techType,
						  	       	  level : data.techForUpdate.techLevel,
						  	       	  effect : data.techForUpdate.currentEffect,
						  	       	  needTime : data.techForUpdate.needTime,
						  	       	  nextEffect : data.techForUpdate.nextEffect
						  	      }
					}
			        break;
		    case 2:
					userFormationTech[techKey] = 
					{
						currentEffect : data.techForUpdate.currentEffect,//当前阵法状态
						description : data.techForUpdate.description,//阵法描述
						message : data.techForUpdate.message,//已经升到最高级描述
						smallIcon : data.techForUpdate.smallIcon,//阵法图标
						techLevel : data.techForUpdate.techLevel,//当前级别
						techName : data.techForUpdate.techName,//阵法名称
						techStatus : data.techForUpdate.techStatus,//阵法状态
						techType : data.techForUpdate.techType,//科技方式
						tooltip:{
						  	       	  name : data.techForUpdate.techName,
						  	       	  type : data.techForUpdate.techType,
						  	       	  level : data.techForUpdate.techLevel,
						  	       	  effect : data.techForUpdate.currentEffect,
						  	       	  nextEffect : data.techForUpdate.message
						  	      }
					}
			        break;
		}
		for(var i =0; i<data.userFormationTechBase.length;i++)
		{
			formationLevel[i] = data.userFormationTechBase[i];
		}
		soldiersPage = false;
		homeAffairsPage = false;
		formationPage = true;			     
		kejiaoguan(getClickObjectIndex());
		//kejiaoguanList(getClickObjectIndex());
		changeMap('cityMenuLayer');
}
/*
 * 阵法升级完成时间校对接口回调
 */
function dogetFormationStudying(data)
{
	if(typeof(data.error) != "undefined")
	{
		return;
	}
	if(learnSkillInterval != null){
		clearInterval(learnSkillInterval);
		learnSkillCnt = 0;
		learnSkillInterval = null;
		learnSkillremainTime =  "";
	}
	if(data.studyingTech == null)
	{	
		if(data.userFormationTech != null)
		{
			userFormationTech.splice(0,userFormationTech.length);
			for(var i =0; i<data.userFormationTech.length; i++)
			{
				switch(data.userFormationTech[i].techStatus)
					{
						case 0:
				        case 1:
						userFormationTech[i] = 
						{
							currentEffect : data.userFormationTech[i].currentEffect,//当前阵法状态
							description : data.userFormationTech[i].description,//阵法描述
							needTime : data.userFormationTech[i].needTime,//需要时间
							nextEffect : data.userFormationTech[i].nextEffect,//下一级功能描述
							smallIcon : data.userFormationTech[i].smallIcon,//阵法图标
							techLevel : data.userFormationTech[i].techLevel,//当前级别
							techName : data.userFormationTech[i].techName,//阵法名称
							techStatus : data.userFormationTech[i].techStatus,//阵法状态
							techType : data.userFormationTech[i].techType,//科技方式
							tooltip:{
						  	       	  name : data.userFormationTech[i].techName,
						  	       	  type : data.userFormationTech[i].techType,
						  	       	  level : data.userFormationTech[i].techLevel,
						  	       	  effect : data.userFormationTech[i].currentEffect,
						  	       	  needTime : data.userFormationTech[i].needTime,
						  	       	  nextEffect : data.userFormationTech[i].nextEffect
						  	      }
						}
				          break;
			            case 2:
						userFormationTech[i] = 
						{
							currentEffect : data.userFormationTech[i].currentEffect,//当前阵法状态
							description : data.userFormationTech[i].description,//阵法描述
							message : data.userFormationTech[i].message,//已经升到最高级描述
							smallIcon : data.userFormationTech[i].smallIcon,//阵法图标
							techLevel : data.userFormationTech[i].techLevel,//当前级别
							techName : data.userFormationTech[i].techName,//阵法名称
							techStatus : data.userFormationTech[i].techStatus,//阵法状态
							techType : data.userFormationTech[i].techType,//科技方式
							tooltip:{
						  	       	  name : data.userFormationTech[i].techName,
						  	       	  type : data.userFormationTech[i].techType,
						  	       	  level : data.userFormationTech[i].techLevel,
						  	       	  effect : data.userFormationTech[i].currentEffect,
						  	       	  nextEffect : data.userFormationTech[i].message
						  	      }
						}
				           break;
					}
			}
			
				soldiersPage = false;
				homeAffairsPage = false;
				formationPage = true; 
				kejiaoguan(getClickObjectIndex());
				//kejiaoguanList(getClickObjectIndex());
				changeMap('cityMenuLayer');
		}	
	}
	else
	{
		//userInteriors[techKey].techLevel = data.studyingTech.techLevel;
		//userInteriors[techKey].techName = data.studyingTech.techName;
		var tmpTime = data.studyingTech.remainTime;
		if(learnSkillInterval == null)
		   learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);	
	}	
	for(var i =0; i<data.userFormationTechBase.length;i++)
	{
		formationLevel[i] = data.userFormationTechBase[i];
	}
}
/*
 * 阵法升级接口回调
 */
function dolevelUpFormation(data)
{
	if(typeof(data.error) != "undefined")
	{
		kejiaoguan(getClickObjectIndex());
		kejiaoguanList(getClickObjectIndex());
		scienceStudyAlert(getClickObjectIndex(),data.error);
        changeMap('cityMenuLayer');
		return;
	}
	techPoint = data.techPoint;	
	completeStatus[2] = true;
	techNameLevel = data.studyingTech.techName;
	if(learnSkillInterval != null){
		clearInterval(learnSkillInterval);
		learnSkillCnt = 0;
		learnSkillInterval = null;
		//learnSkillInterval = "";
	}	
	var tmpTime = data.studyingTech.remainTime;
	if(learnSkillInterval == null)
	   learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);
	kejiaoguan(getClickObjectIndex());
	//kejiaoguanList(getClickObjectIndex());
	changeMap('cityMenuLayer');
}
/*
 * 阵法翻页接口回调
 */
function dogetFormationTechInfoByPage(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	userFormationTech.splice(0,userFormationTech.length);
	for(var i =0; i<data.length; i++)
	{
		switch(data[i].techStatus)
		{
			case 0:
			case 1:
					userFormationTech[i] = 
					{
						currentEffect : data[i].currentEffect,//当前阵法状态
						description : data[i].description,//阵法描述
						needTime : data[i].needTime,//需要时间
						nextEffect : data[i].nextEffect,//下一级功能描述
						smallIcon : data[i].smallIcon,//阵法图标
						techLevel : data[i].techLevel,//当前级别
						techName : data[i].techName,//阵法名称
						techStatus : data[i].techStatus,//阵法状态
						techType : data[i].techType,//科技方式
						tooltip:{
						  	       	  name :data[i].techName,
						  	       	  type : data[i].techType,
						  	       	  level : data[i].techLevel,
						  	       	  effect : data[i].currentEffect,
						  	       	  needTime : data[i].needTime,
						  	       	  nextEffect : data[i].nextEffect
						  	      }
					}
			        break;
		    case 2:
					userFormationTech[i] = 
					{
						currentEffect : data[i].currentEffect,//当前阵法状态
						description : data[i].description,//阵法描述
						message : data[i].message,//已经升到最高级描述
						smallIcon : data[i].smallIcon,//阵法图标
						techLevel : data[i].techLevel,//当前级别
						techName : data[i].techName,//阵法名称
						techStatus : data[i].techStatus,//阵法状态
						techType : data[i].techType,//科技方式
						tooltip:{
						  	       	  name : data[i].techName,
						  	       	  type : data[i].techType,
						  	       	  level : data[i].techLevel,
						  	       	  effect : data[i].currentEffect,
						  	       	  nextEffect : data[i].message
						  	      }
					}
			        break;
		}

	}
}
var ftPage=1;//阵法界面当前页
var ftPages=1;//阵法界面当前总页数
var userFormationTech = new Array();//阵法数组
/*
 *  获取所有阵法
 */
 function dogetFormationTechInfo(data)
 {
 	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	ftPage = data.page;
	ftPages = data.pages;
	techPoint = data.techPoint;
	userFormationTech.splice(0,userFormationTech.length);
	
	for(var i =0; i<data.userFormationTech.length; i++)
	{
		switch(data.userFormationTech[i].techStatus)
		{
			case 0:
			case 1:
					userFormationTech[i] = 
					{
						currentEffect : data.userFormationTech[i].currentEffect,//当前阵法状态
						description : data.userFormationTech[i].description,//阵法描述				
						needTime : data.userFormationTech[i].needTime,//需要时间
						nextEffect : data.userFormationTech[i].nextEffect,//下一级功能描述
						smallIcon : data.userFormationTech[i].smallIcon,//阵法图标
						techLevel : data.userFormationTech[i].techLevel,//当前级别
						techName : data.userFormationTech[i].techName,//阵法名称
						techStatus : data.userFormationTech[i].techStatus,//阵法状态
						techType : data.userFormationTech[i].techType,//科技方式
						tooltip:{
						  	       	  name : data.userFormationTech[i].techName,
						  	       	  type : data.userFormationTech[i].techType,
						  	       	  level : data.userFormationTech[i].techLevel,
						  	       	  effect : data.userFormationTech[i].currentEffect,
						  	       	  needTime : data.userFormationTech[i].needTime,
						  	       	  nextEffect : data.userFormationTech[i].nextEffect
						  	      }
					}
			        break;
		    case 2:
					userFormationTech[i] = 
					{
						currentEffect : data.userFormationTech[i].currentEffect,//当前阵法状态
						description : data.userFormationTech[i].description,//阵法描述
						message : data.userFormationTech[i].message,//已经升到最高级描述
						smallIcon : data.userFormationTech[i].smallIcon,//阵法图标
						techLevel : data.userFormationTech[i].techLevel,//当前级别
						techName : data.userFormationTech[i].techName,//阵法名称
						techStatus : data.userFormationTech[i].techStatus,//阵法状态
						techType : data.userFormationTech[i].techType,//科技方式
						tooltip:{
						  	       	  name : data.userFormationTech[i].techName,
						  	       	  type : data.userFormationTech[i].techType,
						  	       	  level : data.userFormationTech[i].techLevel,
						  	       	  effect : data.userFormationTech[i].currentEffect,
						  	       	  nextEffect : data.userFormationTech[i].message
						  	      }
					}
			        break;
		}

	}
	if(data.studyingTech != null)
	{
		techNameLevel = data.studyingTech.techName;
		if(learnSkillInterval != null){
			clearInterval(learnSkillInterval);
			learnSkillCnt = 0;
			learnSkillInterval = null;
		}	
		var tmpTime = data.studyingTech.remainTime;
		if(learnSkillInterval == null)
		   learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);
	}
	for(var i =0; i<data.userFormationTechBase.length;i++)
	{
		formationLevel[i] = data.userFormationTechBase[i];
	}
 }
/*
 *  兵种科技降级
 */
function dodemoteSoldierTech(data)
{
	if(typeof(data.error) != "undefined")
	{
		kejiaoguan(getClickObjectIndex());
		kejiaoguanList(getClickObjectIndex());
		scienceStudyAlert(getClickObjectIndex(),data.error);
        changeMap('cityMenuLayer');	
		return;
	}
	techPoint = data.techPoint;
	for(var a =0; a<data.tech.length; a++)
        {
        	for(b =0 ; b<soldierTech.length; b++)
        	{
        		if(data.tech[a].techName == soldierTech[b].techName)
        		{
        			switch(data.tech[a].status)
        			{
        				case 0:
				 	 	  soldierTech[b] = {
									  	       message :data.tech[a].message,//兵种描述
				 	 	  	                   status:data.tech[a].status,//兵种状态
				 	 	  	                   techIcon:data.tech[a].techIcon,//兵种图片
				 	 	  	                   techName:data.tech[a].techName,//兵种名称
									  	       techNo:data.tech[a].techNo,//兵种号
									  };
				 	 	 break;
				 	 	case 1:
				 	 	  soldierTech[b] = {
									  	          　   description :data.tech[a].description,//兵种描述
			 	 	  	　　　　　　　　　　　　 needTime:data.tech[a].needTime,//需要时间
			 	 	  	　　　　　　　　　　　　 nextDesc:data.tech[a].nextDesc,//下级描述
			 	 	  	　　　　　　　　　　　　 status:data.tech[a].status,//兵种状态
			 	 	  	　　　　　　　　　　　　 techIcon:data.tech[a].techIcon,//兵种图片
			 	 	  	　　　　　　　　　　　　 techLevel:data.tech[a].techLevel,//兵种等级	 	 	  	
								  	          　              techName:data.tech[a].techName,//科技名称
								  	           techNo:data.tech[a].techNo,//兵种名称	
								  	           tooltip:{
												  	       	  name : data.tech[a].techName,
												  	       	  type : data.tech[a].techNo,
												  	       	  level : data.tech[a].techLevel,
												  	       	  effect : data.tech[a].description,
												  	       	  nextEffect : data.tech[a].nextDesc,
												  	       	  needTime : data.tech[a].needTime,
												  	       	  type : "兵种",
												  	    }
									  };
				 	 	 break;
				 	 	case 2:
				 	 	  soldierTech[b] = {
									  	          　   description :data.tech[a].description,//兵种描述
			 	 	  	　　　　　　　　　　　　 needTime:data.tech[a].needTime,//需要时间
			 	 	  	　　　　　　　　　　　　 nextDesc:data.tech[a].nextDesc,//下降描述
			 	 	  	　　　　　　　　　　　　 status:data.tech[a].status,//兵种状态
			 	 	  	　　　　　　　　　　　　 techIcon:data.tech[a].techIcon,//兵种图片
			 	 	  	　　　　　　　　　　　　 techLevel:data.tech[a].techLevel,//兵种等级	 	 	  	
								  	          　              techName:data.tech[a].techName,//科技名称
								  	           techNo:data.tech[a].techNo,//兵种名称	
								  	            tooltip:{
												  	       	  name : data.tech[a].techName,
												  	       	  type : data.tech[a].techNo,
												  	       	  level : data.tech[a].techLevel,
												  	       	  effect : data.tech[a].description,
												  	       	  nextEffect : data.tech[a].nextDesc,
												  	       	  needTime : data.tech[a].needTime,
												  	       	  type : "兵种",
												  	    }
								  	           
									  };
				 	 	 break;
				 	 	case 3:
				 	 	  soldierTech[b] = {
									  	           description :data.tech[a].description,//兵种描述
									  	           message :data.tech[a].message,//兵种描述
				 	 	  	　　　　　　　　　　　　 status:data.tech[a].status,//兵种状态
				 	 	  	　　　　　　　　　　　　 techIcon:data.tech[a].techIcon,//兵种图片
				 	 	  	　　　　　　　　　　　　 techLevel:data.tech[a].techLevel,//兵种等级	 	 	  	
									  	          　              techName:data.tech[a].techName,//科技名称
									  	           techNo:data.tech[a].techNo,//兵种名称
									  	            tooltip:{
												  	       	  name : data.tech[a].techName,
												  	       	  type : data.tech[a].techNo,
												  	       	  level : data.tech[a].techLevel,
												  	       	  effect : data.tech[a].description,
												  	       	  nextEffect : data.tech[a].nextDesc,
												  	       	  type : "兵种",
												  	    }
									  };
				 	 	 break;
				 	 	
        			}
        		}
        	}
        }
    for(var i = 0 ;i<data.soldierTechBase.length; i++)
	 {
	 	soldiersLevel[i] = data.soldierTechBase[i];
	 }
	soldiersPage = true;
	homeAffairsPage = false;
	formationPage = false;				     
	kejiaoguan(getClickObjectIndex());
	//kejiaoguanList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}
/*
 *  兵种科技升级时间结束调用校队接口回调
 */
 function dogetSoldierTech(data)
 {
 	if(typeof(data.error) != "undefined")
	{
		kejiaoguan(getClickObjectIndex());
		kejiaoguanList(getClickObjectIndex());
		scienceStudyAlert(getClickObjectIndex(),data.error);
        changeMap('cityMenuLayer');	
		return;
	}
 	if(learnSkillInterval != null){
		clearInterval(learnSkillInterval);
		learnSkillCnt = 0;
		learnSkillInterval = null;
		learnSkillremainTime =  "";
	}
	techNameLevel = "";
	if(typeof(data.remainTime) != "undefined")
	{
		techNameLevel = data.techName;
		var tmpTime = data.remainTime;
		if(learnSkillInterval == null)
		   learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);	
	}
	else
	{
        for(var a =0; a<data.tech.length; a++)
        {
        	for(b =0 ; b<soldierTech.length; b++)
        	{
        		if(data.tech[a].techName == soldierTech[b].techName)
        		{
        			switch(data.tech[a].status)
        			{
        				case 0:
				 	 	  soldierTech[b] = {
									  	       message :data.tech[a].message,//兵种描述
				 	 	  	                   status:data.tech[a].status,//兵种状态
				 	 	  	                   techIcon:data.tech[a].techIcon,//兵种图片
				 	 	  	                   techName:data.tech[a].techName,//兵种名称
									  	       techNo:data.tech[a].techNo,//兵种号
									  };
				 	 	 break;
				 	 	case 1:
				 	 	  soldierTech[b] = {
									  	          　   description :data.tech[a].description,//兵种描述
			 	 	  	　　　　　　　　　　　　 needTime:data.tech[a].needTime,//需要时间
			 	 	  	　　　　　　　　　　　　 nextDesc:data.tech[a].nextDesc,//下级描述
			 	 	  	　　　　　　　　　　　　 status:data.tech[a].status,//兵种状态
			 	 	  	　　　　　　　　　　　　 techIcon:data.tech[a].techIcon,//兵种图片
			 	 	  	　　　　　　　　　　　　 techLevel:data.tech[a].techLevel,//兵种等级	 	 	  	
								  	          　              techName:data.tech[a].techName,//科技名称
								  	           techNo:data.tech[a].techNo,//兵种名称	
								  	           tooltip:{
												  	       	  name : data.tech[a].techName,
												  	       	  type : data.tech[a].techNo,
												  	       	  level : data.tech[a].techLevel,
												  	       	  effect : data.tech[a].description,
												  	       	  nextEffect : data.tech[a].nextDesc,
												  	       	  needTime : data.tech[a].needTime,
												  	       	  type : "兵种",
												  	    }
									  };
				 	 	 break;
				 	 	case 2:
				 	 	  soldierTech[b] = {
									  	          　   description :data.tech[a].description,//兵种描述
			 	 	  	　　　　　　　　　　　　 needTime:data.tech[a].needTime,//需要时间
			 	 	  	　　　　　　　　　　　　 nextDesc:data.tech[a].nextDesc,//下降描述
			 	 	  	　　　　　　　　　　　　 status:data.tech[a].status,//兵种状态
			 	 	  	　　　　　　　　　　　　 techIcon:data.tech[a].techIcon,//兵种图片
			 	 	  	　　　　　　　　　　　　 techLevel:data.tech[a].techLevel,//兵种等级	 	 	  	
								  	          　              techName:data.tech[a].techName,//科技名称
								  	           techNo:data.tech[a].techNo,//兵种名称	
								  	            tooltip:{
												  	       	  name : data.tech[a].techName,
												  	       	  type : data.tech[a].techNo,
												  	       	  level : data.tech[a].techLevel,
												  	       	  effect : data.tech[a].description,
												  	       	  nextEffect : data.tech[a].nextDesc,
												  	       	  needTime : data.tech[a].needTime,
												  	       	  type : "兵种",
												  	    }
								  	           
									  };
				 	 	 break;
				 	 	case 3:
				 	 	  soldierTech[b] = {
									  	           description :data.tech[a].description,//兵种描述
									  	           message :data.tech[a].message,//兵种描述
				 	 	  	　　　　　　　　　　　　 status:data.tech[a].status,//兵种状态
				 	 	  	　　　　　　　　　　　　 techIcon:data.tech[a].techIcon,//兵种图片
				 	 	  	　　　　　　　　　　　　 techLevel:data.tech[a].techLevel,//兵种等级	 	 	  	
									  	          　              techName:data.tech[a].techName,//科技名称
									  	           techNo:data.tech[a].techNo,//兵种名称
									  	            tooltip:{
												  	       	  name : data.tech[a].techName,
												  	       	  type : data.tech[a].techNo,
												  	       	  level : data.tech[a].techLevel,
												  	       	  effect : data.tech[a].description,
												  	       	  nextEffect : data.tech[a].nextDesc,
												  	       	  type : "兵种",
												  	    }
									  };
				 	 	 break;
				 	 	
        			}
        		}
        	}
        }
	}
	if(typeof(data.soldierTechBase) != "undefined")
	  for(var i = 0 ;i<data.soldierTechBase.length; i++)
	  {
	 	soldiersLevel[i] = data.soldierTechBase[i];
	  }
	techPoint = data.techPoint;
	soldiersPage = true;
	homeAffairsPage = false;
	formationPage = false;
	completeStatus[1] = true;		   
	kejiaoguan(getClickObjectIndex());
	//kejiaoguanList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
 }
/*
 * 兵种科技升级回调
 */
function doresearchSoldierTech(data)
{
	if(typeof(data.error) != "undefined")
	{
		kejiaoguan(getClickObjectIndex());
		kejiaoguanList(getClickObjectIndex());
		scienceStudyAlert(getClickObjectIndex(),data.error);	
        changeMap('cityMenuLayer');	
		return;
	}
	completeStatus[1] = true;
	techPoint = data.techPoint;
	techNameLevel = data.techName;
	if(learnSkillInterval != null){
		clearInterval(learnSkillInterval);
		learnSkillCnt = 0;
		learnSkillInterval = null;
		learnSkillremainTime =  "";
	}	
	var tmpTime = data.remainTime;
	if(learnSkillInterval == null)
	   learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);
	soldiersPage = true;
	homeAffairsPage = false;
	formationPage = false;				     
	kejiaoguan(getClickObjectIndex());
	//kejiaoguanList(getClickObjectIndex());
	changeMap('cityMenuLayer');		
}
/*
 *  获取全部兵种科技
 */
var soldierTech = new Array();
function dataGetAllSoldierTech(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	techPoint = data.techPoint;
	for(var a = 0; a<data.soldierTech.length; a++)
	 for(var b = 0; b<data.soldierTech[a].length;b++)
	 {
	 	 switch(data.soldierTech[a][b].status)
	 	 {
	 	 	case 0:
	 	 	  soldierTech[a*6+b] = {
	 	 	  	                   message :data.soldierTech[a][b].message,//兵种描述
	 	 	  	                   status:data.soldierTech[a][b].status,//兵种状态
	 	 	  	                   techIcon:data.soldierTech[a][b].techIcon,//兵种图片
	 	 	  	                   techName:data.soldierTech[a][b].techName,//兵种名称
						  	       techNo:data.soldierTech[a][b].techNo,//兵种号
						  };
	 	 	 break;
	 	 	case 1:
	 	 	  soldierTech[a*6+b] = {
	 	 	  	　　　　　　　　　　　　description :data.soldierTech[a][b].description,//兵种描述
	 	 	  	　　　　　　　　　　　　needTime:data.soldierTech[a][b].needTime,//需要时间
	 	 	  	　　　　　　　　　　　　nextDesc:data.soldierTech[a][b].nextDesc,//下降描述
	 	 	  	　　　　　　　　　　　　status:data.soldierTech[a][b].status,//兵种状态
	 	 	  	　　　　　　　　　　　　techIcon:data.soldierTech[a][b].techIcon,//兵种图片
	 	 	  	　　　　　　　　　　　　techLevel:data.soldierTech[a][b].techLevel,//兵种等级	 	 	  	
						  	          　             techName:data.soldierTech[a][b].techName,//科技名称
						  	           techNo:data.soldierTech[a][b].techNo,//兵种名称							  	      
                                       tooltip:{
												  	       	  name : data.soldierTech[a][b].techName,
												  	       	  type : data.soldierTech[a][b].techNo,
												  	       	  level : data.soldierTech[a][b].techLevel,
												  	       	  effect : data.soldierTech[a][b].description,
												  	       	  nextEffect : data.soldierTech[a][b].nextDesc,
												  	       	  needTime : data.soldierTech[a][b].needTime,
												  	       	  type : "兵种",
												  	    }
						  };
	 	 	 break;
	 	 	case 2:
	 	 	  soldierTech[a*6+b] = {
						  	           description :data.soldierTech[a][b].description,//兵种描述
	 	 	  	　　　　　　　　　　　　 needTime:data.soldierTech[a][b].needTime,//需要时间
	 	 	  	　　　　　　　　　　　　 nextDesc:data.soldierTech[a][b].nextDesc,//下降描述
	 	 	  	　　　　　　　　　　　　 status:data.soldierTech[a][b].status,//兵种状态
	 	 	  	　　　　　　　　　　　　 techIcon:data.soldierTech[a][b].techIcon,//兵种图片
	 	 	  	　　　　　　　　　　　　 techLevel:data.soldierTech[a][b].techLevel,//兵种等级	 	 	  	
						  	          　              techName:data.soldierTech[a][b].techName,//科技名称
						  	           techNo:data.soldierTech[a][b].techNo,//兵种名称	
						  	           tooltip:{
												  	       	  name : data.soldierTech[a][b].techName,
												  	       	  type : data.soldierTech[a][b].techNo,
												  	       	  level : data.soldierTech[a][b].techLevel,
												  	       	  effect : data.soldierTech[a][b].description,
												  	       	  nextEffect : data.soldierTech[a][b].nextDesc,
												  	       	  needTime : data.soldierTech[a][b].needTime,
												  	       	  type : "兵种",
												  	    }		
						  };
	 	 	 break;
	 	 	case 3:
	 	 	  soldierTech[a*6+b] = {
	 	 	  	                       description :data.soldierTech[a][b].description,//兵种描述
						  	           message :data.soldierTech[a][b].message,//兵种描述
	 	 	  	　　　　　　　　　　　　 status:data.soldierTech[a][b].status,//兵种状态
	 	 	  	　　　　　　　　　　　　 techIcon:data.soldierTech[a][b].techIcon,//兵种图片
	 	 	  	　　　　　　　　　　　　 techLevel:data.soldierTech[a][b].techLevel,//兵种等级	 	 	  	
						  	          　              techName:data.soldierTech[a][b].techName,//科技名称
						  	           techNo:data.soldierTech[a][b].techNo,//兵种名称
						  	           tooltip:{
												  	       	  name : data.soldierTech[a][b].techName,
												  	       	  type : data.soldierTech[a][b].techNo,
												  	       	  level : data.soldierTech[a][b].techLevel,
												  	       	  effect : data.soldierTech[a][b].description,
												  	       	  nextEffect : data.soldierTech[a][b].nextDesc,
												  	       	  type : "兵种",
												  	    }			
						  };
	 	 	 break;
	 	 	
	 	 }
	 }
	 if(typeof(data.studyingTech) != "undefined")
	 {
		techNameLevel = data.studyingTech.techName;
		if(learnSkillInterval != null){
			clearInterval(learnSkillInterval);
			learnSkillCnt = 0;
			learnSkillInterval = null;
		}	
		var tmpTime = data.studyingTech.remainTime;
		if(learnSkillInterval == null)
		   learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);	
	 }
	 for(var i = 0 ;i<data.soldierTechBase.length; i++)
	 {
	 	soldiersLevel[i] = data.soldierTechBase[i];
	 }
}
/*
 * 内政终止研究
 */    
 function doStopStudying(data)
 {
 	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	techNameLevel = "";
	techPoint = data;	
	if(learnSkillInterval != null){
		clearInterval(learnSkillInterval);
		learnSkillCnt = 0;
		learnSkillInterval = null;
		learnSkillremainTime =  "";
	}
 }
/*
 * 内政研究时间到达向服务器请求
 */
function dogetStudying(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	techNameLevel = "";
	if(learnSkillInterval != null){
		clearInterval(learnSkillInterval);
		learnSkillCnt = 0;
		learnSkillInterval = null;
		learnSkillremainTime =  "";
	}	
	var id = data.userInteriorTech.updateKey;
	var tempLac = data.userInteriorTech.updateTechInfo;
	if(data.studyingTech == null)
	{
		if(data.userInteriorTech != null)
		{
			userInteriorEffects[id] = data.userInteriorTech.updateEffect;	
			switch(userInteriors[id].techStatus)
					{
						case 0:
						  userInteriors[id] = {
						  	       techStatus:tempLac.techStatus,//科技状态
						  	       needLevel:tempLac.needLevel,//开启条件描述信息
						  	       techName:tempLac.techName,//科技名称
						  	       techIcon : tempLac.techIcon, //图片资源
						  };
						  break;
						case 1:
						  userInteriors[id] = {
						  	       nextEffect:tempLac.nextEffect,//下一级效果描述
						  	       techStatus:tempLac.techStatus,//科技状态类型
						  	       techIcon : tempLac.techIcon, //图片资源
						  	       needTime:tempLac.needTime,//需求时间描述
						  	       techType:tempLac.techType,//科技类型
						  	       currentEffect:tempLac.currentEffect,//当前效果描述
						  	       techLevel:tempLac.techLevel,//科技等级
						  	       techName:tempLac.techName,//科技名称
						  	       tooltip:{
						  	       	  name : tempLac.techName,
						  	       	  type : tempLac.techType,
						  	       	  level : tempLac.techLevel,
						  	       	  effect : tempLac.currentEffect,
						  	       	  needTime : tempLac.needTime,
						  	       	  nextEffect : tempLac.nextEffect
						  	       }
						  };
						  break;
						case 2:
						  userInteriors[id] = {
						  	       nextEffect:tempLac.nextEffect,//下一级效果描述
						  	       techStatus:tempLac.techStatus,//科技状态类型
						  	       techIcon : tempLac.techIcon, //图片资源
						  	       needTime:tempLac.needTime,//需求时间描述
						  	       techType:tempLac.techType,//科技类型
						  	       currentEffect:tempLac.currentEffect,//当前效果描述
						  	       techLevel:tempLac.techLevel,//科技等级
						  	       techName:tempLac.techName,//科技名称
						  	       tooltip:{
						  	       	  name : tempLac.techName,
						  	       	  type : tempLac.techType,
						  	       	  level : tempLac.techLevel,
						  	       	  effect : tempLac.currentEffect,
						  	       	  needTime : tempLac.needTime,
						  	       	  nextEffect : tempLac.nextEffect
						  	       }
						  };
						  break;
					    case 3:
						  userInteriors[id] = {
						  	       message:tempLac.message,//显示该科技已达到最高级的信息
						  	       techStatus:tempLac.techStatus,//科技状态类型
						  	       techType:tempLac.techType,//科技类型
						  	       currentEffect:tempLac.currentEffect,//当前效果影响
						  	       techLevel:tempLac.techLevel,//科技等级
						  	       techName:tempLac.techName,//科技名称
						  	       techIcon : tempLac.techIcon, //图片资源
						  	       tooltip:{
						  	       	  name : tempLac.techName,
						  	       	  type : tempLac.techType,
						  	       	  level : tempLac.techLevel,
						  	       	  effect : tempLac.currentEffect,
						  	       	  nextEffect : tempLac.message
						  	       }
						  };
						  break;
					}
				soldiersPage = false;
				homeAffairsPage = true;
				formationPage = false;			     
				kejiaoguan(getClickObjectIndex());
				//kejiaoguanList(getClickObjectIndex());
				changeMap('cityMenuLayer');
		}	
	}
	else
	{
		var tmpTime = data.studyingTech.remainTime;
		techNameLevel = data.studyingTech.techName;
		if(learnSkillInterval == null)
		   learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);	
	}
	
}
/*
 * 内政科技降级
 */
function dolevelDownInterior(data)
{
	if(typeof(data.error) != "undefined")
	{
		kejiaoguan(getClickObjectIndex());
		kejiaoguanList(getClickObjectIndex());
		scienceStudyAlert(getClickObjectIndex(),data.error);
        changeMap('cityMenuLayer');	
		return;
	}
	techPoint = data.techPoint;
	var id = data.userInteriorTech.updateKey;
	var tempLac = data.userInteriorTech.updateTechInfo;
	userInteriorEffects[id] = data.userInteriorTech.updateEffect;
	switch(userInteriors[id].techStatus)
				{
					case 0:
					  userInteriors[id] = {
					  	       techStatus:tempLac.techStatus,//科技状态
					  	       needLevel:tempLac.needLevel,//开启条件描述信息
					  	       techName:tempLac.techName,//科技名称
					  	       techIcon : tempLac.techIcon, //图片资源
					  };
					  break;
					case 1:
					  userInteriors[id] = {
					  	       nextEffect:tempLac.nextEffect,//下一级效果描述
					  	       techStatus:tempLac.techStatus,//科技状态类型
					  	       techIcon : tempLac.techIcon, //图片资源
					  	       needTime:tempLac.needTime,//需求时间描述
					  	       techType:tempLac.techType,//科技类型
					  	       currentEffect:tempLac.currentEffect,//当前效果描述
					  	       techLevel:tempLac.techLevel,//科技等级
					  	       techName:tempLac.techName,//科技名称
					  	       tooltip:{
						  	       	  name : tempLac.techName,
						  	       	  type : tempLac.techType,
						  	       	  level : tempLac.techLevel,
						  	       	  effect : tempLac.currentEffect,
						  	       	  needTime : tempLac.needTime,
						  	       	  nextEffect : tempLac.nextEffect
						  	       }
					  };
					  break;
					case 2:
					  userInteriors[id] = {
					  	       nextEffect:tempLac.nextEffect,//下一级效果描述
					  	       techStatus:tempLac.techStatus,//科技状态类型
					  	       techIcon : tempLac.techIcon, //图片资源
					  	       needTime:tempLac.needTime,//需求时间描述
					  	       techType:tempLac.techType,//科技类型
					  	       currentEffect:tempLac.currentEffect,//当前效果描述
					  	       techLevel:tempLac.techLevel,//科技等级
					  	       techName:tempLac.techName,//科技名称
					  	       tooltip:{
						  	       	  name : tempLac.techName,
						  	       	  type : tempLac.techType,
						  	       	  level : tempLac.techLevel,
						  	       	  effect : tempLac.currentEffect,
						  	       	  needTime : tempLac.needTime,
						  	       	  nextEffect : tempLac.nextEffect
						  	       }
					  };
					  break;
				    case 3:
					  userInteriors[id] = {
					  	       message:tempLac.message,//显示该科技已达到最高级的信息
					  	       techStatus:tempLac.techStatus,//科技状态类型
					  	       techType:tempLac.techType,//科技类型
					  	       currentEffect:tempLac.currentEffect,//当前效果影响
					  	       techLevel:tempLac.techLevel,//科技等级
					  	       techName:tempLac.techName,//科技名称
					  	       techIcon : tempLac.techIcon, //图片资源
					  	       tooltip:{
						  	       	  name : tempLac.techName,
						  	       	  type : tempLac.techType,
						  	       	  level : tempLac.techLevel,
						  	       	  effect : tempLac.currentEffect,
						  	       	  nextEffect : tempLac.message
						  	       }
					  };
					  break;
				}
			soldiersPage = false;
			homeAffairsPage = true;
			formationPage = false;				     
			kejiaoguan(getClickObjectIndex());
			//kejiaoguanList(getClickObjectIndex());
			changeMap('cityMenuLayer');
}
/*
 * 内政科技升级接口
 */
var techNameLevel = "";
function dolevelUpInterior(data)
{
	if(typeof(data.error) != "undefined")
	{
		kejiaoguan(getClickObjectIndex());
		kejiaoguanList(getClickObjectIndex());
		scienceStudyAlert(getClickObjectIndex(),data.error);
        changeMap('cityMenuLayer');	
		return;
	}
	completeStatus[0] = true;
	techPoint = data.techPoint;
	techNameLevel = data.studyingTech.techName;
	if(learnSkillInterval != null){
		clearInterval(learnSkillInterval);
		learnSkillCnt = 0;
		learnSkillInterval = null;
	}	
	var tmpTime = data.studyingTech.remainTime;
	if(learnSkillInterval == null)
	   learnSkillInterval = setInterval("learnSkillTimer(" + tmpTime + ")",1000);
	kejiaoguan(getClickObjectIndex());
	//kejiaoguanList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}   
function learnSkillTimer(initData){
	learnSkillremainTime = changeTimeformat((initData - learnSkillCnt)*1000);
	learnSkillCnt = learnSkillCnt + 1;
};              
var kejiaoguan = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isKejiaoguan = true;
	var bW = gbox.getImage('kjg_zjm_01').width;
	var bH = gbox.getImage('kjg_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 35;		    
		gbox.addObject(
			{ 
				id : 'kejiaoguan',
				group : 'levelMenu_2',
				tileset : 'kjg_zjm_01',
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
					
					homeAffairsSkillCtr = false;
                    if(((buttonCoordinateX[0][0] < lastTouchMoveX) && (lastTouchMoveX < buttonCoordinateX[0][1])) && ((buttonCoordinateY[0][0] < lastTouchMoveY) && (lastTouchMoveY < buttonCoordinateY[0][1])))
					{
						
						isKejiaoguanList = true;
			            kejiaoguanList(index);
						soldiersPage = false;
						homeAffairsPage = true;
                        formationPage = false;
                        completeStatus[0] = true;
                        tech.getUserInteriorForView(dataGetUserInteriorForView);
						
					}
					if(((buttonCoordinateX[1][0] < lastTouchMoveX) && (lastTouchMoveX < buttonCoordinateX[1][1])) && ((buttonCoordinateY[1][0] < lastTouchMoveY) && (lastTouchMoveY < buttonCoordinateY[1][1])))
					{
						isKejiaoguanList = true;
			            kejiaoguanList(index);
						soldiersPage = true;
						homeAffairsPage = false;
                        formationPage = false;
                        completeStatus[1] = true;
                        tech.getAllSoldierTech(dataGetAllSoldierTech);
						
					}
					if(((buttonCoordinateX[2][0] < lastTouchMoveX) && (lastTouchMoveX < buttonCoordinateX[2][1])) && ((buttonCoordinateY[2][0] < lastTouchMoveY) && (lastTouchMoveY < buttonCoordinateY[2][1])))
					{
						isKejiaoguanList = true;
			            kejiaoguanList(index);
						soldiersPage = false;
						homeAffairsPage = false;
                        formationPage = true;
                        completeStatus[2] = true;
                        tech.getFormationTechInfo(dogetFormationTechInfo);
						
					}
					if(((566 < lastTouchMoveX) && (lastTouchMoveX < 582)) && ((371 < lastTouchMoveY) && (lastTouchMoveY < 391)))
						{
							if(learnSkillremainTime != null && learnSkillremainTime !="")
							   tech.stopStudying(doStopStudying);		
						}
					if(homeAffairsPage)
					{
						for(var i = 0 ; i<userInteriors.length; i++)
						{
							if(gbox._mouseArea(homeAffairs_Area[i],lastTouchMoveX,lastTouchMoveY) && (learnSkillremainTime == null || learnSkillremainTime == ""))
							{
								  switch(userInteriors[i].techStatus)
								  {
								  	 case 1:
								  	 case 2:
								  	 case 3:
								  	    techKey = i;
								  	   	homeAffairsSkillUI(index,lastTouchMoveX,lastTouchMoveY,'cityMenu',techKey);	
			                            changeMap('cityMenuLayer');
								  	   break;
								  }
		                    }	
						}
						
					}
					if(soldiersPage)
					{
						for(var i = 0 ; i<soldier_Area.length; i++)
						{
							if(gbox._mouseArea(soldier_Area[i],lastTouchMoveX,lastTouchMoveY)&& (learnSkillremainTime == null || learnSkillremainTime == ""))
							{
								switch(soldierTech[i].status)
								  {
								  	 case 1:
								  	 case 2:
								  	 case 3:
								  	    techKey = i;
								  	   	homeAffairsSkillUI(index,lastTouchMoveX,lastTouchMoveY,'cityMenu',techKey);	
			                            changeMap('cityMenuLayer');
								  	   break;
								  }
		                    }	
						}
					}
					if(formationPage)
					{
						  if(((861 < lastTouchMoveX) && (lastTouchMoveX < 877)) && ((576 < lastTouchMoveY) && (lastTouchMoveY < 600)))//控制向右翻页
			               {
			               	   if(ftPage < ftPages)
			               	   {
			               	   	  tech.getFormationTechInfoByPage(ftPage + 1,dogetFormationTechInfoByPage);
			               	   	  ftPage = ftPage + 1;
			               	   }  	   
			               }
			               if(((788 < lastTouchMoveX) && (lastTouchMoveX < 804)) && ((576 < lastTouchMoveY) && (lastTouchMoveY < 600)))//控制向左翻页
			               {
			               	   if(ftPage >= 2)
			               	   {
			               	   	   tech.getFormationTechInfoByPage(ftPage - 1,dogetFormationTechInfoByPage);
			               	   	   ftPage = ftPage - 1;
			               	   }
			               	    
			               }
			               for(var i = 0 ; i<formationPage_Area.length; i++)
							{
								if(gbox._mouseArea(formationPage_Area[i],lastTouchMoveX,lastTouchMoveY)&& (learnSkillremainTime == null || learnSkillremainTime == ""))
								{
									switch(userFormationTech[i].techStatus)
									  {
									  	 case 0:
									  	 case 1:
									  	 case 2:
									  	    techKey = i;
									
									  	   	homeAffairsSkillUI(index,lastTouchMoveX,lastTouchMoveY,'cityMenu',techKey);	
				                            changeMap('cityMenuLayer');
									  	   break;
									  }
			                    }	
							}
					}
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23)){
						isKejiaoguanList = false;
						displayDestroy();
						exit(index);
						curGroup = 'cityMenu';
						enterCityMenu(curGroup);
	                    changeMap('cityMenuLayer');	
					}
					else{
						
				           if(learnSkillremainTime != null && learnSkillremainTime != "")
				           {
					            if(((546 < lastTouchMoveX) && (lastTouchMoveX < 564)) && ((376 < lastTouchMoveY) && (lastTouchMoveY < 394)))
					            {
					            	systemSpeedup(index,"科技研究");
					            	console.log("科技加速确认");
					            }
				           }
						
						commandBuildBtn(lotIndex,"建筑加速");
						isKejiaoguan = true;
						if(homeAffairsPage)
						{
							isKejiaoguanList = true;
						}
						kejiaoguan(index);	
			            kejiaoguanList(index);				
						changeMap('cityMenuLayer');	
					}
					
				},
				blit : function()
				{
					 if(isKejiaoguan)
					 {
					 	gbox.drawImage('kjg_zjm_01',backdropX,backdropY);
					    gbox.drawImage('ty_an_127',backdropX,backdropY);
					    gbox.drawImage('kjg_zjm_03',(gbox.getImage('kjg_zjm_01').width - gbox.getImage("kjg_zjm_03").width)/2 + backdropX,backdropY);
					    drawBuildCommandBtn();

			            gbox.drawTxtRect(buildCommonDesc[lotIndex],450,190,500,70,20,'#ffffff','#000000');
			           
			           if(learnSkillremainTime != null && learnSkillremainTime != "")
			           {
				            gbox.drawImage("ty_an_123",546,373);
				            if(((546 < touchMoveX) && (touchMoveX < 564)) && ((376 < touchMoveY) && (touchMoveY < 394)))
				            {
				               gbox.drawImage('ty_an_124',546,373);						 			               
				            }
				            gbox.drawImage("ty_an_125",565,374);
				            if(((565 < touchMoveX) && (touchMoveX < 583)) && ((376 < touchMoveY) && (touchMoveY < 394)))
				            {
				               gbox.drawImage('ty_an_126',565,374);						 			               
				            }
			           }

			            if(homeAffairsPage)
			            {
			               var okX = 343 + (53 - gbox.getImage("kjg_zjm_37").width)/2;
						   var okY = 273 + (26 - gbox.getImage("kjg_zjm_37").height)/2;				    
				           gbox.drawImage('ty_an_120',345,274);
						   var okX = 344 + (53 - gbox.getImage("kjg_zjm_37").width)/2;
						   var okY = 276 + (26 - gbox.getImage("kjg_zjm_37").height)/2;
						   gbox.drawImage("kjg_zjm_37",okX,okY);			               
			           	   gbox.drawImage("kjg_zjm_05",595,303);//绘制内政树形图			           	   		           	 	      
			           	   for(var i =0; i<userInteriors.length; i++)
			           	   {
			           	   	    switch(userInteriors[i].techStatus)
			           	   	    {
			           	   	    	case 1:
			           	   	    	 if(i < 9)
			           	   	    	 {
			           	   	    	 	gbox.drawImage('nz_kj_0' + (i+1),homeAffairs_Area[i][0][0] + 1,homeAffairs_Area[i][0][1] + 2);	
			           	   	    	 	gbox.drawImage('kjg_zjm_22',homeAffairs_Area[i][0][0] + 1,homeAffairs_Area[i][0][1] + 2);	  
			           	   	    	 }
			           	   	    	 else
			           	   	    	 {
			           	   	    	 	gbox.drawImage('nz_kj_' + (i+1),homeAffairs_Area[i][0][0]+ 1,homeAffairs_Area[i][0][1]+ 2);
			           	   	    	 	gbox.drawImage('kjg_zjm_22',homeAffairs_Area[i][0][0] + 1,homeAffairs_Area[i][0][1] + 2);	  	 
			           	   	    	 }  
			           	   	    	 break;
			           	   	    	case 2:
			           	   	    	 if(i < 9)
			           	   	    	 {
			           	   	    	 	gbox.drawImage('nz_kj_0' + (i+1),homeAffairs_Area[i][0][0] + 1,homeAffairs_Area[i][0][1] + 2);	 
			           	   	    	 }
			           	   	    	 else
			           	   	    	 {
			           	   	    	 	gbox.drawImage('nz_kj_' + (i+1),homeAffairs_Area[i][0][0]+ 1,homeAffairs_Area[i][0][1]+ 2);	 
			           	   	    	 }
			           	   	    	 break;
			           	   	    	case 3:
			           	   	    	 //gbox.drawImage('kjg_zjm_21',homeAffairs_Area[i][0][0]- 2,homeAffairs_Area[i][0][1]- 2);	
			           	   	    	 break;
			           	   	    }         
			           	   }
			           	   for(var i = 0 ; i<userInteriors.length; i++)
							{
								if(gbox._mouseArea(homeAffairs_Area[i],touchMoveX,touchMoveY))
								{
									 switch(userInteriors[i].techStatus)
									 {
									 	case 0:
									 	 //gbox.drawMessageObject(homeAffairsTip(userInteriors[i]),touchMoveX,touchMoveY, 100, 12, '#FFFFFF');
									 	 break;
									 	case 1:
									 	  tooltip.drawTech(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,userInteriors[i].tooltip);
									 	 break;
									 	case 2:
									 	  tooltip.drawTech(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,userInteriors[i].tooltip);
									 	 break;
									 	case 3:
									 	  tooltip.drawTech(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,userInteriors[i].tooltip);
									 	 break;
									 }
									 
			                    }	
							}
			            }
			            if(soldiersPage)
			            {
			               var okX = 397 + (53 - gbox.getImage("kjg_zjm_39").width)/2;
						   var okY = 273 + (26 - gbox.getImage("kjg_zjm_39").height)/2;				    
				           gbox.drawImage('ty_an_120',397,274);
						   var okX = 397 + (53 - gbox.getImage("kjg_zjm_39").width)/2;
						   var okY = 276 + (26 - gbox.getImage("kjg_zjm_39").height)/2;
						   gbox.drawImage("kjg_zjm_39",okX,okY);
			           	   gbox.drawImage("kjg_zjm_06",590,303);//绘制兵种树形图
			           	   //console.log("=====" + soldierTech.length);
			           	   for(var i =0; i<soldierTech.length; i++)
			           	   {
			           	   	    switch(soldierTech[i].status)
			           	   	    {
			           	   	    	case 1:					           	   	    	 
			           	   	    	  if(i < 9)
			           	   	    	  {
			           	   	    	 	gbox.drawImage('bz_kj_0' + (i+1),soldier_Area[i][0][0] + 1,soldier_Area[i][0][1] + 2);	
			           	   	    	  }
			           	   	    	  else
			           	   	    	  {
			           	   	    	 	gbox.drawImage('bz_kj_' + (i+1),soldier_Area[i][0][0]+ 1,soldier_Area[i][0][1]+ 2);			           	   	    	 	 	 
			           	   	    	  }  		           	   	    	 
			           	   	    	  gbox.drawImage('kjg_zjm_22',soldier_Area[i][0][0] +1,soldier_Area[i][0][1] +2);	           	   	    			           	  	    	 			           	   	    	  		        
			           	   	    	 break;
			           	   	    	case 2:
			           	   	    	 if(i < 9)
			           	   	    	  {
			           	   	    	 	gbox.drawImage('bz_kj_0' + (i+1),soldier_Area[i][0][0] + 1,soldier_Area[i][0][1] + 2);	
			           	   	    	  }
			           	   	    	  else
			           	   	    	  {
			           	   	    	 	gbox.drawImage('bz_kj_' + (i+1),soldier_Area[i][0][0]+ 1,soldier_Area[i][0][1]+ 2);			           	   	    	 	 	 
			           	   	    	  }  		
			           	   	    	 
			           	   	    	 break;
			           	   	    	case 3:
			           	   	    	 //gbox.drawImage('kjg_zjm_21',soldier_Area[i][0][0]- 1,soldier_Area[i][0][1]- 1);	
			           	   	    	 break;
			           	   	    }		           	
			           	   }
			           	   for(var i = 0 ; i<soldier_Area.length; i++)
							{
								if(gbox._mouseArea(soldier_Area[i],touchMoveX,touchMoveY))
								{
									 switch(soldierTech[i].status)
									 {
									 	case 0:
									 	 //gbox.drawMessageObject(soldiersPageTip(soldierTech[i]),touchMoveX,touchMoveY, 100, 12, '#FFFFFF');
									 	 break;
									 	case 1:
									 	var mouseY = 0;
									 	   
								    		var tempH = tooltip.computTech(gbox.getBufferContext(),soldierTech[i].tooltip).height;
								    		if((gbox.getScreenH() - touchMoveY) < tempH)	
								    		{
								    			mouseY = gbox.getScreenH() - tempH;
								    		}
								    		else
										    {
										    	mouseY = touchMoveY;
										    }
									 	 tooltip.drawTech(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,mouseY,soldierTech[i].tooltip);
									 	 break;
									 	case 2:
									 	 var mouseY = 0;
								    		var tempH = tooltip.computTech(gbox.getBufferContext(),soldierTech[i].tooltip).height;
								    		if((gbox.getScreenH() - touchMoveY) < tempH)	
								    		{
								    			mouseY = gbox.getScreenH() - tempH;
								    		}
								    		else
										    {
										    	mouseY = touchMoveY;
										    }
									 	 tooltip.drawTech(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,mouseY,soldierTech[i].tooltip);
									 	 break;
									 	case 3:
									 	    var mouseY = 0;
								    		var tempH = tooltip.computTech(gbox.getBufferContext(),soldierTech[i].tooltip).height;
								    		if((gbox.getScreenH() - touchMoveY) < tempH)	
								    		{
								    			mouseY = gbox.getScreenH() - tempH;
								    		}
								    		else
										    {
										    	mouseY = touchMoveY;
										    }
									 	 tooltip.drawTech(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,mouseY,soldierTech[i].tooltip);
									 	 break;
									 }
			                    }	
			                    
							}
			            }
			            if(formationPage)
			            {
			           	     var okX = 450 + (53 - gbox.getImage("kjg_zjm_41").width)/2;
							 var okY = 273 + (26 - gbox.getImage("kjg_zjm_41").height)/2;				    
					         gbox.drawImage('ty_an_120',450,274);
							 var okX = 450 + (53 - gbox.getImage("kjg_zjm_41").width)/2;
							 var okY = 276 + (26 - gbox.getImage("kjg_zjm_41").height)/2;
							 gbox.drawImage("kjg_zjm_41",okX,okY);
			           	     for(var i=0; i<userFormationTech.length; i++)
			           	     {
			           	     	gbox.drawImage("kjg_zjm_09",600,312+(i*70));
			           	     	//gbox.drawImage("m0001",600,303+(i*77));
			           	     }
			           	     for(var i=0; i<userFormationTech.length; i++)
			           	     {
                                gbox.drawLineBreakText(userFormationTech[i].description,669, 316 + i*70,4,400);     
			           	     }
			           	     for(var i=0; i<userFormationTech.length; i++)
			           	     {			 
			           	     	try
			           	     	{
			           	     		gbox.drawImage(userFormationTech[i].smallIcon,605,312 + i*70);
			           	     	}
			           	     	catch (e)
			           	     	{
			           	     		//gbox.drawImage("CL_HYWLTY_1",610,317 + i*70);
			           	     	}
			           	     	
			           	     }
			           	     gbox.drawImage("kjg_zjm_23",806,580);
			           	     gbox.drawString(ftPage + "/" + ftPages,821,584,'#ffffff',8);
			           	     gbox.drawImage("ty_an_25",791,580);
			           	     gbox.drawImage("ty_an_24",864,580);
			           	     for(var i = 0 ; i<formationPage_Area.length; i++)
							 {
								if(gbox._mouseArea(formationPage_Area[i],touchMoveX,touchMoveY))
								{
									 switch(userFormationTech[i].techStatus)
									 {
									 	case 0:
									 	 //gbox.drawMessageObject(formationPageTip(userFormationTech[i]),touchMoveX,touchMoveY, 100, 12, '#FFFFFF');
									 	 break;
									 	case 1:
									 	  var mouseY = 0;
								    		var tempH = tooltip.computTech(gbox.getBufferContext(),userFormationTech[i].tooltip).height;
								    		if((gbox.getScreenH() - touchMoveY) < tempH)	
								    		{
								    			mouseY = gbox.getScreenH() - tempH;
								    		}
								    		else
										    {
										    	mouseY = touchMoveY;
										    }
									 	  tooltip.drawTech(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,mouseY,userFormationTech[i].tooltip);
									 	 break;
									 	case 2:
									 	  var mouseY = 0;
								    		var tempH = tooltip.computTech(gbox.getBufferContext(),userFormationTech[i].tooltip).height;		    		
								    		if((gbox.getScreenH() - touchMoveY) < tempH)	
								    		{
								    			mouseY = gbox.getScreenH() - tempH;
								    		}
								    		else
										    {
										    	mouseY = touchMoveY;
										    }
									 	  tooltip.drawTech(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,mouseY,userFormationTech[i].tooltip);
									 	 break;
									 	
									 }
			                    }	
			                    
							 }
			            }
			            
			            gbox.drawText(techPoint,980,281,10);
			            if(learnSkillremainTime != null && learnSkillremainTime != "")
			            {
			            	gbox.drawText(techNameLevel,440,354,4);
			            	gbox.drawText(learnSkillremainTime,440,377,4);
			            }
			            if(learnSkillremainTime == "00:00:00")
			            {
			            	
			            	if(homeAffairsPage)
			            	{
			            		if(completeStatus[0])
			            		 tech.getInteriorStudying(dogetStudying);	
			            		 completeStatus[0] = false;	 
			            	}
			            	else if(soldiersPage)
			            	{
			            		if(completeStatus[1])
			            		{			   
			            	     tech.getSoldierTech(dogetSoldierTech);
			            		}
			            	    completeStatus[1] = false;	
			            	}
			            	else if(formationPage)
			            	{
			            		if(completeStatus[2])
			            	     tech.getFormationStudying(ftPage,dogetFormationStudying);
			            	    completeStatus[2] = false;	
			            	}
			            }
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

/*
 * 技能页面弹出框
 * 
*/
var kjSkillFont = ["升级","降级"];
var homeAffairsSkillCtr = false;
function homeAffairsSkillUI(index,offsetX,offsetY,_group,key)
{
	gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	var pW = gbox.getImage('ty_an_95').width;
	var pH = gbox.getImage('ty_an_95').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
    homeAffairsSkillCtr = true;
	gbox.addObject(
	{ 
		
		id : 'homeAffairsSkillUI',
		group : 'levelMenu_3',
		tileset : 'ty_an_95',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [offsetX,offsetY], [offsetX + pW, offsetY], [offsetX + pW,offsetY + 40],[offsetX,offsetY + 40]],
		initialize : function()
		{
		
		},
		first : function() 
		{			
		},
		myclick : function()
		{ 
			 if(((offsetX < lastTouchMoveX) && (lastTouchMoveX < (offsetX +pW))) && ((offsetY < lastTouchMoveY) && (lastTouchMoveY < offsetY + 18)))
			 {
			 	
			 	if(homeAffairsPage)
			 	{
			 		if(techKey != -1)
			 		    exit(getClickObjectIndex());
						homeAffairsSkillCtr = false;
						isKejiaoguanList = true;
					 	tech.levelUpInterior(techKey,dolevelUpInterior);
					 	isKejiaoguan = true;
					   
			 	}
			 	if(soldiersPage)
			 	{
			 		tech.researchSoldierTech(soldierTech[techKey].techNo,doresearchSoldierTech);
			 		isKejiaoguan = true;
					exit(getClickObjectIndex());
					homeAffairsSkillCtr = false;
					isKejiaoguanList = true;
			 	}
			 	if(formationPage)
			 	{
			 		if(techKey != -1)
			 		 tech.levelUpFormation(ftPage,techKey,dolevelUpFormation);
			 		isKejiaoguan = true;
					exit(getClickObjectIndex());
					homeAffairsSkillCtr = false;
					isKejiaoguanList = true;
			 	}
				
			 }		
			 else if(((offsetX < lastTouchMoveX) && (lastTouchMoveX < (offsetX +pW))) && ((offsetY + 20 < lastTouchMoveY) && (lastTouchMoveY < offsetY + 42)))
			 {
			 	
			 	if(homeAffairsPage)
			 	{
			 		tech.levelDownInterior(techKey,dolevelDownInterior);
				 	isKejiaoguan = true;
				    exit(getClickObjectIndex());
					homeAffairsSkillCtr = false;
					isKejiaoguanList = true;
			 	}
			 	if(soldiersPage)
			 	{
			 		tech.demoteSoldierTech(soldierTech[techKey].techNo,dodemoteSoldierTech)
			 		isKejiaoguan = true;
					exit(getClickObjectIndex());
					homeAffairsSkillCtr = false;
					isKejiaoguanList = true;
			 	}
			 	if(formationPage)
			 	{
			 		tech.levelDownFormation(ftPage,techKey,dolevelDownFormation);
			 		isKejiaoguan = true;
					exit(getClickObjectIndex());
					homeAffairsSkillCtr = false;
					isKejiaoguanList = true;
			 	}				
			 }
			 else
			 {
			 	homeAffairsSkillUI(index,offsetX,offsetY,_group,0);	
			    changeMap('cityMenuLayer');
			 }			
		},
		blit : function()
		{
			if(isDrawUI[index]&& homeAffairsSkillCtr )
			{	
			    for(var i=0; i<2; i++)
					{
						gbox.drawImage('ty_an_95',offsetX, offsetY + gbox.getImage("ty_an_95").height*i);			
						if(((offsetX < touchMoveX) && (touchMoveX < offsetX + 62)) && ((offsetY + gbox.getImage("ty_an_95").height*i < touchMoveY) && (touchMoveY < (offsetY + gbox.getImage("ty_an_95").height*i + gbox.getImage("ty_an_95").height))))
						{							
							 gbox.drawImage('ty_an_96',offsetX, offsetY + gbox.getImage("ty_an_95").height*i);
						}
						var fontW = gbox.getTextWidth(junqingFont[i],10);
					 	var dx = offsetX + (62 - fontW)/2;
						var dy = offsetY + gbox.getImage("ty_an_95").height*i + (20 - 10)/2;
 						gbox.drawText(kjSkillFont[i], dx + 13, dy,10);
 						
				}	
				//gbox.drawImage('ty_an_95',offsetX, offsetY);			    		   
			}
		}
	 });
}

var isKejiaoguanList = false;
var kejiaoguanList = function(index)//科教馆列表
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isKejiaoguanList = true;
	gbox.addObject(
			{ 
				id : 'kjgList',
				group : 'levelMenu_2',
				tileset : 'kjg_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [360,420], [590,420], [590,600],[360,600]],
				initialize : function()
				{
					if(homeAffairsPage)
					{
						var content = new Array(homeAffairsName,userInteriorEffects);
			            var listLen = content[0].length;
			            if(listLen < 7){
			            	listLen = 7;
			            }   
			            kjgOffsetY = kjg_OffsetY = 0;
			            kjglist.mouseUpIndex = -1;
			            kjglist.init( 'kjg_zjm_11', 'kjgHitRect', 'kjgHitRect','kjgPassRect',null,content, 335, 400, 1, listLen, 21, 8, false, -123, 0 );
			            kjglist.itemOffsetX = 20;
					}
					if(soldiersPage)
					{
						var content = new Array(soldiersName,soldiersLevel);
			            var listLen = content[0].length;
			            if(listLen < 7){
			            	listLen = 7;
			            }   
			            kjgOffsetY = kjg_OffsetY = 0;
			            kjglist.mouseUpIndex = -1;
			            kjglist.init( 'kjg_zjm_11', 'kjgHitRect', 'kjgHitRect','kjgPassRect',null,content, 335, 400, 1, listLen, 21, 8, false, -123, 0 );
			            kjglist.itemOffsetX = 20;
					}
					if(formationPage)
					{
						var content = new Array(formationName,formationLevel);
			            var listLen = content[0].length;
			            if(listLen < 7){
			            	listLen = 7;
			            }   
			            kjgOffsetY = kjg_OffsetY = 0;
			            kjglist.mouseUpIndex = -1;
			            kjglist.init( 'kjg_zjm_11', 'kjgHitRect', 'kjgHitRect','kjgPassRect',null,content, 335, 400, 1, listLen, 21, 8, false, -123, 0 );
			            kjglist.itemOffsetX = 20;
					}
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					homeAffairsSkillCtr = false;
					
					if(isKejiaoguanList)
					{
						if(kjglist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
						{
							if(Math.abs(kjgOffsetY) > 12)
							{
								kjgOffsetY=12*(kjgOffsetY/Math.abs(kjgOffsetY));
							}
							kjg_OffsetY = kjgOffsetY;
							kjg_BeginSlip = true;
							kjg_Time = 0;
						}else{
							kjglist.radioHandle(kjglist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
							kjgListIndex = kjglist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
							 console.log("kjgListIndex = " + kjgListIndex);
						}
						
    		          	if(gbox._mouseArea(kjglist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
    		          		kjglist.keyUp();
    		            }
    		          	if(gbox._mouseArea(kjglist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
    		          		kjglist.keyDown();
    		            }	
					}
					kejiaoguan(index);
					//kejiaoguanList(index);
					changeMap('cityMenuLayer');	
				},
		blit : function()
		{
			if(isDrawUI[index] && isKejiaoguanList)
			{
				if(homeAffairsPage)
				  gbox.drawImage('kjg_zjm_04',344,390);
				if(soldiersPage)
				  gbox.drawImage('kjg_zjm_35',344,390);
				if(formationPage)
				  gbox.drawImage('kjg_zjm_36',344,390);
				kjglist.paint( kjg_OffsetY, kjg_BeginSlip, kjg_Time );
			}
		}
	 });
};
var _isScienceStudyDraw = false;
var scienceStudyAlert = function(index,str)
{   
	var str = str;
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;    
	_isScienceStudyDraw = true;
	var pW = gbox.getImage('ty_an_55').width;
	var pH = gbox.getImage('ty_an_55').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	gbox.addObject(
	{ 
		id : 'messageAlert',
		group : 'levelMenu_4',
		tileset : 'ty_an_55',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			var cntX = pX + (gbox.getImage('ty_an_55').width -  gbox.getImage('ty_an_06').width)/2;
            if(((lastTouchMoveX > (pX + 254)) && (lastTouchMoveX < (pX + 254 + gbox.getImage('ty_an_18').width))) && ((lastTouchMoveY > (pY + 2)) && (lastTouchMoveY<(pY + 2 + gbox.getImage('ty_an_18').height))))
		    {
		         this.poly = [[0,0],[0,0],[0,0],[0,0]];
				 _isScienceStudyDraw = false;
		     }
		     else
		     {
		     	 scienceStudyAlert(getClickObjectIndex(),str);
		         changeMap('cityMenuLayer');
		     }
		     	         
		},
		blit : function()
		{
			if(isDrawUI[index] && _isScienceStudyDraw)
			{
				var dialogX = pX;
				var dialogY = pY;
				gbox.drawImage('ty_an_55',dialogX, dialogY);
				var rW = gbox.getImage('ty_an_55').width;
				var strW = gbox.getBufferContext().measureText(str).width;
				var cntX = dialogX + (rW - strW)/2;
				if(strW > rW)
				{
					var tempText = studyLineDesc(gbox.getBufferContext(),str,180);
					for(var i= 0;i<tempText.length;i++)
					{
						gbox.drawDanceString(tempText[i],619, 339 + i*20,12, '#000000','#ffffff');
					}
				}
				else
				{
					gbox.drawDanceString(str,cntX,dialogY + 53,12,'#000000','#ffffff');
				}
				gbox.drawImage('ty_an_18',dialogX + 254, dialogY + 2);
				if(((touchMoveX > (dialogX + 254)) && (touchMoveX < (dialogX + 254 + gbox.getImage('ty_an_18').width))) && ((touchMoveY > (dialogY + 2)) && (touchMoveY<(dialogY + 2 + gbox.getImage('ty_an_18').height))))
				{
					gbox.drawImage('ty_an_17',dialogX + 254, dialogY + 2);
				}			
			}
		}		
	 });
};