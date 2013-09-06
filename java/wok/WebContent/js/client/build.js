/*
	* 建筑类
	* author:张建民
*/
    function buildClass(){
    	buildClass.prototype.level_type = new Array();
    }
    
    buildClass.prototype.initAni = function(index){
		    //动画
			gbox.addObject(
					{ 
						id : 'bg' + index,
						group : 'cityMenu',
						tileset : 'building',
						x : 0,
						y : 0,
						anim : artisan_action,
						action : null,
						frame : 0,
						poly : [ [0,0], [0,0], [0,0],[0,0]],
						initialize : function()
						{
							AnimMgr.changeAction(this, this.anim.action["artisanAction"],true);
							AnimMgr.updatePolyWithAnim(this);
						},
						first : function() 
						{		  
						},
						myclick : function()
						{
						},
						blit : function()
						{
						}
			});    	
    };
    
	buildClass.prototype.drawBuildAin = function(){
		//Ani
		var index = this.result_location;
		var buildAni = gbox.getObject('cityMenu','bg' + index);	    			
		buildAni.anim.image = "building";
		var data = {
			tile : buildAni.frame,
			dx : buildList[index][8] + 7  ,
			dy : buildList[index][3] - 30 ,

			fliph : buildAni.fliph,
			flipv : buildAni.flipv,
			camera : buildAni.camera,
			alpha : 1.0,
			anim : buildAni.anim
		};
		AnimMgr.draw(gbox.getBufferContext(), data);
		buildAni.frame = help.decideFrame(buildAni.action);

	};
	    
    buildClass.prototype.buildResult = function(index){
		this.result_location = index;
	};
	
	buildClass.prototype.getResult = function(index){
			switch(buildClass.prototype.level_type[index]){
				case 0://建造
				    clearInterval(timeInterval[index]);
				    build_time[index] = "加载中！";
				    build_cnt[index] = 0;
//					demolition_upgrade[index] = false;
//		            cancel_speed[index] = false;
//		            isDrawUI[index] = false;
//					clickObjectList[index].poly = [[0,0],[0,0],[0,0],[0,0]];
					Building.getBuilding(index,doBuilding);						
				break;
				case 1://升级
				    clearInterval(timeInterval[index]);
                    upgrade_time[index] = "加载中！";
				    upgrade_cnt[index] = 0;
//					demolition_upgrade[index] = false;
//		            cancel_speed[index] = false;
//		            isDrawUI[index] = false;
//					clickObjectList[index].poly = [[0,0],[0,0],[0,0],[0,0]];	
					Building.getBuilding(index,doBuilding);			    
				break;
				case 2://拆除
				    console.log("wo cao ni daye ");
					console.log("________________拆除");
				    clearInterval(timeInterval[index]);
                    demolition_time[index] = "加载中！";
                    demolition_cnt[index] = 0;
//					demolition_upgrade[index] = false;
//		            cancel_speed[index] = false;
//		            isDrawUI[index] = false;
//					clickObjectList[index].poly = [[0,0],[0,0],[0,0],[0,0]];  
					Building.getBuilding(index,doBuilding);	                  
				break;				
			}
	};
	
    var buildArray = new Array();
    for(var i=1; i<28; i++){
    	buildArray[i] = new buildClass();
    }
    

    buildClass.prototype.build = function (buildID,location){
    	buildClass.prototype.buildLocation = location;
    	buildClass.prototype.level_type[location] = 0;
    	buildClass.prototype.initAni(location);
    	buildArray[location].buildResult(location);
		Building.build(buildID,location,doBuild);
	};
	
	function doBuild(data){
		if(typeof(data.error) != "undefined"){
		   var index = buildClass.prototype.buildLocation;
		    build_cnt[index] = 0;
		    build_time[index] = "加载...";
			buildList[index][0] = 'build_empty';
			clearInterval(timeInterval[index]);
			enterCityMenu(this.group);
			changeMap('cityMenuLayer');
			console.log("取消建造成功");
		   alert("系统提示：" + data.error);
		   return;
		} 	
           //已经建造的建筑列表。 
            var temp = data;
//	    	var id = temp.buildingId;
//	    	var level = temp.level;
//	    	var resId = id * 100 + level;
	    	var location = temp.location;
		  	
	    	buildLocation = location;
	    	console.log("【建造消位置】 =================== " + location);
//		    buuldType[location] = resId;3
//         
//	    	//描述信息
//	    	var temp1 = temp.buildingEntity;
//	    	//建造属性
//	    	buildName[location] = temp1.name;
//	    	buildLevel[location] = temp1.level;
//	    	buildCommonDesc[location] = temp1.commonDesc;
//	    	buildCurDesc[location] = temp1.desc;
//	    	    
//	    	//升级属性
//	    	upNextDesc[location] = temp1.nextDesc;
//	    	upMoney[location] = temp1.money;
//	    	upFood[location] = temp1.food;
//	    	upWood[location] = temp1.wood;
//	    	upStone[location] = temp1.stone;
//	    	upBronze[location] = temp1.bronze;
//	    	upTime[location] = temp1.time;
//	    	upNeedBuildId[location] = temp1.time;
//	    	upNeedLevel[location] = temp1.needBuildingLevel;
//	    	upCanBuild[location] = temp1.canBuild;
//	    	upBuilt[location] = temp1.built;
//	    	startTime = new Date().getTime();
		var tmpTime = temp.remainedTime;
//		if(tmpTime % 1000 != 0)
//			tmpTime = tmpTime + 2000;
		console.log("【建造消耗时间】 =================== " + temp.remainedTime);
        timeInterval[location] = setInterval("timer(" + tmpTime +",0,"+location+")",tmpTime);
	}

	buildClass.prototype.upgrade = function(location){
		buildClass.prototype.upgradeLocation = location;
		buildClass.prototype.level_type[location] = 1;
		buildArray[location].buildResult(location);
		Building.upgrade(location,doUpgrade);
	};
	function doUpgrade(data){
		if(typeof(data.error) != "undefined"){
			var index = buildClass.prototype.upgradeLocation;
			upgrade_cnt[index] = 0;
			upgrade_time[index] = "加载...";
			buildList[index][1] = 'state_empty';
			clearInterval(timeInterval[index]);
			enterCityMenu(this.group);
			changeMap('cityMenuLayer');
			console.log("取消升级成功");
			alert("系统提示：" + data.error);	
		   return;
		}
		var tmpTime = data.remainedTime;
//		if(tmpTime % 1000 != 0)
//			tmpTime = tmpTime + 2000;
		console.log("【升级消耗时间】 =================== " + data.remainedTime);
        timeInterval[data.location] = setInterval("timer(" + tmpTime +",1,"+data.location+")",tmpTime);
	}

	buildClass.prototype.demolition = function(location){
		buildClass.prototype.demolitionLocation = location;
		buildClass.prototype.level_type[location] = 2;
		buildArray[location].buildResult(location);
		Building.demolition(location,doDemolition);
	};
	
	function doDemolition(data){
		if(typeof(data.error) != "undefined"){
		   var index = buildClass.prototype.demolitionLocation;
		   if(index == 1 || index == 13){
			   buildList[index][0] = 'build_src';
		   }
			demolition_cnt[index] = 0;
			demolition_time[index] = "加载...";
			buildList[index][13] = 'state_demolition_empty';
			clearInterval(timeInterval[index]);
			enterCityMenu(this.group);
			changeMap('cityMenuLayer');
			console.log("1111取消拆除成功");
		   alert("系统提示：" + data.error);
		   return;
		}
		var tmpTime = data.remainedTime;
		console.log("【拆除消耗时间】 =================== " + data.remainedTime);
        timeInterval[data.location] = setInterval("timer(" + tmpTime +",2,"+data.location+")",tmpTime);
	}

	buildClass.prototype.cancel = function(Location){
		Building.cancel(Location,doCancel);
	};
	function doCancel(data){
		if(typeof(data.error) != "undefined"){
			alert("系统提示：" + data.error);
			return;
	    }						  		
	}
	function isDone(index){
		Building.isDone("" + index,doIsDone);
	}
	
	function doIsDone(){
		
	}
	
	function timer(initData,type,index)
	{
	    build_cnt[index] = 0;
	    console.log("timer+++++++++++++++++++++++++");
	    buildClass.prototype.getResult(index);
	};
	
	var time;
	function changeTimeformat(time)
	{
				time = time/1000;
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
//		if (i<10){i="0" + i;}
//		  	return i;
	}
	function createAudio()
	{
	}

function doBuilding(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
        switch(data.key){
        case 1://地块索引为空
 		   var index = data.location;
//	    	if(demolition_time[index] == "加载中！"){
	    	    if(index != 27 && index != 1 
	    	    		&& typeof(clickObjectList[houseBuildIndex[index]]) != 'undefined'){
				    if(isInitialize(clickObjectList[houseBuildIndex[index]].poly)){
				    	clickObjectList[houseBuildIndex[index]].poly = [[0,0],[0,0],[0,0],[0,0]];
				    }
				    build_cnt[index] = 0;
				    build_time[index] = "加载...";
					buildList[index][0] = 'build_empty';
					clearInterval(timeInterval[index]);
					buildCommonDesc[index] = "建筑建造地块!";
					buildList[index][13] = 'state_demolition_empty';
		    		buuldType[index] = undefined;
			    	buildName[index] = undefined;
			    	build_Level[index] = undefined;
			    	buildings[index] = undefined;
			    	console.log("拆除地块为空！！！");
	    		}
//	    	}
	    	    gbox.setGroupsToLayer(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'], 'cityMenuLayer');
	    	    flashGameLayer();
//        	alert("地块索引为空");
        	return;
        case 2://进行中
        	var temp = data.value;
        	var location = temp.location;
			switch(buildClass.prototype.level_type[location]){
				case 0://建造
					if(typeof(temp.remainedTime) != "undefined"){
						var tmpTime = temp.remainedTime;
					    if(tmpTime == 0)
					    	tmpTime = 500;
						console.log("【建造冗余时间】 =================== " + tmpTime);
				        timeInterval[location] = setInterval("timer(" + tmpTime +",0,"+location+")",tmpTime);						
					}
				break;
				case 1://升级
					if(typeof(temp.remainedTime) != "undefined"){
						var tmpTime = temp.remainedTime;
					    if(tmpTime == 0)
					    	tmpTime = 500;
						console.log("【升级冗余时间】 =================== " + tmpTime);
				        timeInterval[location] = setInterval("timer(" + tmpTime +",1,"+location+")",tmpTime);
					}
				break;
				case 2://拆除
					if(typeof(temp.remainedTime) != "undefined"){
						var tmpTime = temp.remainedTime;
					    if(tmpTime == 0)
					    	tmpTime = 500;
						console.log("【拆除冗余时间】 =================== " + tmpTime);
				        timeInterval[location] = setInterval("timer(" + tmpTime +",2,"+ location+")",tmpTime);
					}
			}
        	break;
        case 3://正常建造
        	var temp = data.value;
        	var location = temp.location;
			switch(buildClass.prototype.level_type[location]){
				case 0://建造
					buildList[location][0] = 'build_end';
			    	flashGameLayer();
					console.log("建造完成！");	
				break;
				case 1://升级
				    buildList[location][1] = 'state_empty';
				    var bAniX = buildList[location][2] - 165;
				    var bAniY = buildList[location][3] - 160;
				    //太尉俯
				    if(location == 27)
				    {
				    	bAniX = 1000;
				    	bAniY = -30;
				    }
				    //城墙
				    if(location == 1)
				    {
				    	bAniX = 100;
				    	bAniY = 400;
				    }
				    buildArray[location].aniDisplay(location, bAniX,bAniY);
				    flashGameLayer();
					console.log("升级完成！");	
				break;
				case 2://拆除
					buildCommonDesc[location] = "建筑建造地块!";//build_Level.del(location);
					buildName[location] = undefined;
					build_Level[location] = undefined;
					buildList[location][13] = 'state_demolition_empty';
					console.log("拆除完成！");	
				break;				
			}	    	
        	break;
        }
        
        
        if(typeof(data.value) != 'undefined')
        {
    		var temp = data.value;
    		
            if(typeof(temp.view) != 'undefined')
            {
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
            	
            	//描述信息
        		buuldType[location] = temp.view.img;
            	//建造属性
            	buildName[location] = temp.view.name;
            	build_Level[location] = temp.level;
            	buildCommonDesc[location] = temp.view.desc;
            }
        }
        

}

function flashGameLayer()
{

	switch(getCurrentLayer())
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
}

Array.prototype.del= function(n)
{     
  if(n<0)     
    return this;   
  else   
    return this.slice(0,n).concat(this.slice(n+1,this.length));   
    /**//* 
      concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。   
      　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)   
     　　　　　　组成的新数组，这中间，刚好少了第n项。   
      slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。   
    */   
};

/*
 *  动画显示
 */
var buildUpAni = new Array();
buildClass.prototype.aniDisplay = function(location,x,y)
{
	buildUpAni[location] = EnvironsScreenBattleClass.handlers.addAnimation("buildUpLevel",x,y);
	buildUpAni[location].loop = false;
	buildUpAni[location].start();
}