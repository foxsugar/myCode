 /*
 *  选择目标页卡区域
 */
var choiceGargetPoly = [
     [490,235,541,235,540,258,490,258],
     [542,235,593,236,593,258,544,258],
     [595,235,647,236,647,258,597,258],
     [648,235,702,235,702,258,650,258],
];
/*
 *  存储每个页卡的ID
 */
var choiceGargetID = new Array();
//接收野外数据
var userPrimaryForceInfo = new Array();//暴民
var enemiesArray = new Array();
var isSelectOpponent = new Array();//存储目标对象ID
//控制回调接收
var isMonstaterFinsh = false;
var isEnemiesFinsh = false;
//页数
var oppoentPage;
var oppoentPages;
//敌对势力信息回调
function datagetEnemyInfo(data)
{
	isEnemiesFinsh = false;
	enemiesArray.splice(0,enemiesArray.length);
	for(var i =0; i<data.enemies.length; i++)
	{
		enemiesArray[i] = 
		{
			enemyCountry : data.enemies[i].enemyCountry,
			enemyId : data.enemies[i].enemyId,
			enemyLeague : data.enemies[i].enemyLeague,
			enemyLevel : data.enemies[i].enemyLevel,
			enemyMaincityLevel : data.enemies[i].enemyMaincityLevel,
			enemyName : data.enemies[i].enemyName,
			needTime : data.enemies[i].needTime,
			x : data.enemies[i].x,
			y : data.enemies[i].y,
		};
	}
	oppoentPage = data.page;
	oppoentPages = data.pages;
    isEnemiesFinsh = true;
    
}
//怪物势力回调函数
function dogetMonsaterInfo(data)
{
	isMonstaterFinsh = false;
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	userPrimaryForceInfo.splice(0,userPrimaryForceInfo.length);
	for(var i =0;i<data.monster.length;i++)
	{
		userPrimaryForceInfo[i] = 
		{
			singleForceNum : data.monster[i].singleForceNum,
			multiForceNum : data.monster[i].multiForceNum,
			monsterId :  data.monster[i].enemyNo,
			monsterLevel :  data.monster[i].heroLevel,
			monsterName :  data.monster[i].enemyName,
			needTime : data.monster[i].needTime,
		};
		
	}
	oppoentPage =  data.page;
	oppoentPages =  data.pages;
	isMonstaterFinsh = true;
}
var gargetMenu= function(index,layer,groupBottom)
{
	warpthGargetClass.draw.setLayer(layer);
	warpthGargetClass.draw.setGroupBottom(groupBottom);
	var group = expeditionToolClass.draw.getGroupByGroupBottom(warpthGargetClass.draw.groupBottom);
	gbox.setRenderOrder(group);
	isDrawUI[index] = true;
	isWarpthGarget = true;
	isJiuguan = false;
	isJunying = false;
	isWjZhaomu = false;
    var bW = gbox.getImage('cz_zjm_14').width;
	var bH = gbox.getImage('cz_zjm_14').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
    gbox.addObject(
			{ 
				id : 'garget',
				group : 'levelMenu_2',
				tileset : 'cz_zjm_14',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					if(isMonstater)
					{
						battle.getMonsterInfo(1,1,dogetMonsaterInfo);
						isMonstater = false;
					}
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					  for(var i = 0; i < 4; i++)
					  {
					  	var clickPoly = [ [choiceGargetPoly[i][0],choiceGargetPoly[i][1]], [choiceGargetPoly[i][2],choiceGargetPoly[i][3]], [choiceGargetPoly[i][4],choiceGargetPoly[i][5]],[choiceGargetPoly[i][6],choiceGargetPoly[i][7]]];
					  	if(gbox._mouseArea(clickPoly,lastTouchMoveX,lastTouchMoveY))
					  	{
					  		 choiceGargetID[i] = true;		
					  		 for(var a =0; a<4; a++)
					  		 {
					  		 	 if(a != i)
					  		 	 {
					  		 	 	 choiceGargetID[a] = false;
					  		 	 }
					  		 }			  		 
					  	 }					  	
					  }
					  if(lastTouchMoveX>choiceGargetPoly[0][0] && lastTouchMoveX<choiceGargetPoly[0][2] && lastTouchMoveY>choiceGargetPoly[0][1] && lastTouchMoveY <choiceGargetPoly[0][5])	
					  {
					  	for(var a =0; a<6; a++)
					  	{
					  		isSelectOpponent[a] = false;
					  	}
					  	battle.getMonsterInfo(1,1,dogetMonsaterInfo);//暴民回调
					  }
					  if(lastTouchMoveX>choiceGargetPoly[1][0] && lastTouchMoveX<choiceGargetPoly[1][2] && lastTouchMoveY>choiceGargetPoly[1][1] && lastTouchMoveY <choiceGargetPoly[1][5])	
					  {
					  	for(var a =0; a<6; a++)
					  	{
					  		isSelectOpponent[a] = false;
					  	}
					  	battle.getMonsterInfo(2,1,dogetMonsaterInfo);//土匪回调
					  }
					  if(lastTouchMoveX>choiceGargetPoly[2][0] && lastTouchMoveX<choiceGargetPoly[2][2] && lastTouchMoveY>choiceGargetPoly[2][1] && lastTouchMoveY <choiceGargetPoly[2][5])	
					  {
					  	for(var a =0; a<6; a++)
					  	{
					  		isSelectOpponent[a] = false;
					  	}
					  	battle.getMonsterInfo(3,1,dogetMonsaterInfo);//叛军回调
					  }	
					  if(lastTouchMoveX>choiceGargetPoly[3][0] && lastTouchMoveX<choiceGargetPoly[3][2] && lastTouchMoveY>choiceGargetPoly[3][1] && lastTouchMoveY <choiceGargetPoly[3][5])	
					  {
					  	for(var a =0; a<6; a++)
					  	{
					  		isSelectOpponent[a] = false;
					  	}
					  	 battle.getEnemyInfo(1,datagetEnemyInfo);//仇人
					  }	
					  //isSelectOpponent
					  for(var i =0; i<6;i++)//记录每页选择的对手ID
					  {
					  	   if(lastTouchMoveX>491 && lastTouchMoveX<945 && lastTouchMoveY>280 + i*37 && lastTouchMoveY<317+ i*37)	
					  	   {
					  	   	 isSelectOpponent[i] = !isSelectOpponent[i];		
					  		 for(var a =0; a<6; a++)
					  		 {
					  		 	 if(a != i)
					  		 	 {
					  		 	 	 isSelectOpponent[a] = false;
					  		 	 }
					  		 }	
					  	   }
					  }
					  for(var i=0; i<4; i++)
				      {
				      	  if(choiceGargetID[i])
				      	  {
				      	  	  if(lastTouchMoveX>685 && lastTouchMoveX<700 && lastTouchMoveY>502 && lastTouchMoveY<518)	
						  	  {     
						  	  	    if(i == 3)
						  	  	    {
						  	  	    	battle.getEnemyInfo(oppoentPage - 1,datagetEnemyInfo);
						  	  	    }
						  	  	    else
						  	  	    {
						  	  	    	battle.getMonsterInfo(i + 1,oppoentPage - 1,dogetMonsaterInfo);//土匪翻页回调
						  	  	    }
						  	  	   	
						  	  }
						  	  if(lastTouchMoveX>749 && lastTouchMoveX<761 && lastTouchMoveY>502 && lastTouchMoveY<518)	
						  	  {
						  	  	    if(i == 3)
						  	  	    {
						  	  	    	battle.getEnemyInfo(oppoentPage - 1,datagetEnemyInfo);
						  	  	    }
						  	  	    else
						  	  	    {
						  	  	    	battle.getMonsterInfo(i + 1,oppoentPage + 1,dogetMonsaterInfo);//土匪翻页回调
						  	  	    }
						  	  	   	
						  	  }
				      	  }
				      }	
				      if(lastTouchMoveX>889 && lastTouchMoveX<944 && lastTouchMoveY>500 && lastTouchMoveY<521)	
				      {
				      	 isWarpthGarget = false;
						 isJiuguan = false;
					     isJunying = false;
						 isWjZhaomu = false;
				      	 tagetRecord = null;  
                         var type = 0;
                         var tagetType= 0;
                         var id = 0;
                         for(var i=0; i<choiceGargetID.length; i++)
                         {
                         	if(choiceGargetID[i])
                         	{
                         		id = i;
                         		switch(i)
                         		{
                         			case 0:                         			  
                         			case 1:                        			 
                         			case 2:
                         			  type = i+1;
                         			  tagetType = 0;
                         			  break;
                         			case 3:
                         			  type = 0;
                         			  tagetType = 1;
                         			  break;
                         		}
                         		break;
                         	}
                         }
                         if(id<3)
                         {
                         	for(var i=0; i<6; i++)
                         	{
                         		
                         		if(isSelectOpponent[i])
                         		{                        			
                         			tagetRecord = null;
                         			tagetRecord = 
		                         	{
		                         		id : userPrimaryForceInfo[i].monsterId,
		                         		tagetName : userPrimaryForceInfo[i].monsterName,
		                         		tagetType : tagetType,
		                         		type : type,
		                         		needTime : userPrimaryForceInfo[i].needTime
		                         	};		                         	
                         		}  		
                         	}                        	
                         }
                        else
                         {
                         	for(var i=0; i<6; i++)
                         	{
                         		if(isSelectOpponent[i])
                         		{
                         			tagetRecord = null;
                         			tagetRecord = 
		                         	{
		                         		id : enemiesArray[i].enemyId,
		                         		tagetName : enemiesArray[i].enemyName,
		                         		tagetType : tagetType,
		                         		type : type,
		                         		needTime : enemiesArray[i].needTime
		                         	};
                         		}
                         		
                         	}       
                         }
		                 //来着武将出征界面，目标选择操作
		                 for(var a =0; a<6; a++)
					  	 {
					  		isSelectOpponent[a] = false;
					  	 }
					     warpthGargetClass.handlers.confirm();
						 exit(index);
						 warpthMenu(index);
						 warpthGargetClass.draw.changeMap();
				      }	
				      else
				      {
				      	 gargetMenu(getClickObjectIndex());
				      }			  	  
					 
					  warpthGargetClass.draw.changeMap();

				},
				blit : function()
				{

					 if(isDrawUI[index] && isWarpthGarget)
					 {					 	
					 	 gbox.drawImage('cz_zjm_14',backdropX,backdropY);//绘制选择目标背景 
					 	 gbox.drawImage('ty_an_08',891,497);//确定按钮
					 	 if(touchMoveX>889 && touchMoveX<944 && touchMoveY>497 && touchMoveY<521)	
					 	 {
					 	 	gbox.drawImage('ty_an_06',891,497);//确定按钮
					 	 }
					 	 var fontW = gbox.getTextWidth("确定",14);
						 var dx = 891 + (50 - fontW)/2;
						 var dy = 497 + (26 - 14)/2;
						 gbox.drawText("确定", dx, dy,10);
					     for(var i=0; i<choiceGargetID.length; i++)//绘制页卡
					     {
					     	 if(choiceGargetID[i])
					     	 {
					     	 	switch(i)
					     	 	{
					     	 		case 0://暴民
					     	 		case 1://土匪
					     	 		case 2://叛军
					     	 		  if(i == 0)
					     	 		  {
					     	 		  	 gbox.drawImage('cz_zjm_21',choiceGargetPoly[0][0],choiceGargetPoly[0][1]);
					     	 		  }
					     	 		  if(i == 1)
					     	 		  {
					     	 		  	 gbox.drawImage('cz_zjm_22',choiceGargetPoly[1][0],choiceGargetPoly[1][1]);
					     	 		  }
					     	 		  if(i == 2)
					     	 		  {
					     	 		  	 gbox.drawImage('cz_zjm_24',choiceGargetPoly[2][0],choiceGargetPoly[2][1]);
					     	 		  }
					     	 		  if(isMonstaterFinsh)
					     	 		  {
					     	 		  	 
					     	 		  	 gbox.drawImage('cz_zjm_13',491,261);//绘制选择目标背景
					     	 		  	 gbox.drawImage('ty_an_25',684,500);//绘制左右翻页
					     	 		  	 gbox.drawImage('ty_an_24',750,500);//绘制左右翻页
					     	 		  	 
					     	 		  	 var fontW = gbox.getTextWidth(oppoentPage + "/" + oppoentPages,14);
									 	 var dx = 692 + (53 - fontW)/2;
										 var dy = 498 + (20 - 14)/2;
										 gbox.drawText(oppoentPage + "/" + oppoentPages, dx, dy,10);
					     	 		  	 for(var i=0; i<userPrimaryForceInfo.length; i++)
					     	 		  	 {
					     	 		  	 	 gbox.drawImage("ty_an_01",495,287+i*37);
					     	 		  	 	 if(isSelectOpponent[i])
					     	 		  	 	 {
					     	 		  	 	 	gbox.drawImage("ty_an_12",495,287+i*37);					     	 		  	 	 	
					     	 		  	 	 }
					     	 		  	 	 var fontW = gbox.getTextWidth(userPrimaryForceInfo[i].monsterName,14);
									 	     var dx = 491 + (120 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText(userPrimaryForceInfo[i].monsterName, dx, dy + i*37,15);
										     
										     var fontW = gbox.getTextWidth(userPrimaryForceInfo[i].monsterLevel,14);
									 	     var dx = 614 + (49 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText(userPrimaryForceInfo[i].monsterLevel, dx, dy + i*37,15);
										     
										     var fontW = gbox.getTextWidth(userPrimaryForceInfo[i].multiForceNum,14);
										     var dx = 665 + (77 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText(userPrimaryForceInfo[i].multiForceNum, dx, dy + i*37,15);
										     
										     var fontW = gbox.getTextWidth(userPrimaryForceInfo[i].singleForceNum,14);
										     var dx = 746 + (92 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText(userPrimaryForceInfo[i].singleForceNum, dx, dy + i*37,15);
										     
										     var fontW = gbox.getTextWidth(changeTimeformat(userPrimaryForceInfo[i].needTime*1000),14);
										     var dx = 840 + (106 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText(changeTimeformat(userPrimaryForceInfo[i].needTime*1000), dx, dy + i*37,15);
					     	 		  	 } 
					     	 		  }
					     	 		  break;					     	 	    
					     	 		case 3://仇人
					     	 		  gbox.drawImage('cz_zjm_15',491,261);//绘制选择目标背景
					     	 		  gbox.drawImage('ty_an_25',684,500);//绘制左右翻页
					     	 		  gbox.drawImage('ty_an_24',750,500);//绘制左右翻页
					     	 		  var fontW = gbox.getTextWidth(oppoentPage + "/" + oppoentPages,14);
									  var dx = 692 + (53 - fontW)/2;
									  var dy = 498 + (20 - 14)/2;
									  gbox.drawText(oppoentPage + "/" + oppoentPages, dx, dy,10);
					     	 		  gbox.drawImage('cz_zjm_23',choiceGargetPoly[3][0],choiceGargetPoly[3][1]);
					     	 		  if(isEnemiesFinsh)
					     	 		  {
					     	 		  	
					     	 		  	for(var a=0; a<enemiesArray.length; a++)
					     	 		  	 {
					     	 		  	 	 gbox.drawImage("ty_an_01",495,287+a*37);
					     	 		  	 	 if(isSelectOpponent[a])
					     	 		  	 	 {
					     	 		  	 	 	gbox.drawImage("ty_an_12",495,287+a*37);					     	 		  	 	 	
					     	 		  	 	 }
					     	 		  	 	 var fontW = gbox.getTextWidth(enemiesArray[a].enemyName,14);
									 	     var dx = 491 + (114 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText(enemiesArray[a].enemyName, dx, dy + a*37,15);
										     
										     var fontW = gbox.getTextWidth(enemiesArray[a].enemyCountry,14);
									 	     var dx = 608 + (48 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText(enemiesArray[a].enemyCountry, dx, dy + a*37,15);
										     
										     if(enemiesArray[a].enemyLeague == null)
										     {
										     	 var fontW = gbox.getTextWidth("无",14);
										         var dx = 660 + (114 - fontW)/2;
										         var dy = 281 + (35 - 14)/2;
										         gbox.drawText("无", dx, dy + a*37,15);
										     }
										     else
										     {
										     	 var fontW = gbox.getTextWidth(enemiesArray[a].enemyLeague,14);
										         var dx = 660 + (114 - fontW)/2;
										         var dy = 281 + (35 - 14)/2;
										         gbox.drawText(enemiesArray[a].enemyLeague, dx, dy + a*37,15);
										     }
										     
										     var fontW = gbox.getTextWidth("(" + enemiesArray[a].x + "," + enemiesArray[a].y + ")",14);
										     var dx = 777 + (83 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText("(" + enemiesArray[a].x + "," + enemiesArray[a].y + ")", dx, dy + a*37,15);
										     
										     var fontW = gbox.getTextWidth(changeTimeformat(enemiesArray[a].needTime*1000),14);
										     var dx = 863 + (85 - fontW)/2;
										     var dy = 281 + (35 - 14)/2;
										     gbox.drawText(changeTimeformat(enemiesArray[a].needTime*1000), dx, dy + a*37,15);
					     	 		  	 } 
					     	 		  }
					     	 		  
					     	 		  break;
					     	 	}
					     	 }
					     }
					 }				
				}
		 });
};
//目标选择界面类
var warpthGargetClass = {};
//目标选择界面回调函数
warpthGargetClass.callBack = {};
warpthGargetClass.handlers = {};
//确定按钮回调
warpthGargetClass.callBack.confirm = false;
//确定按钮方法
warpthGargetClass.handlers.confirm = function(){
	if(warpthMenuClass.flag.isSelectTarget){
		//console.log(tagetRecord);
		  var expedition = warpthMenuClass.handlers.setExpedition(
				  tagetRecord.id,//目标id
				  tagetRecord.tagetName,//目标名称
				  tagetRecord.tagetType,//目标类型(物种)1:人  0:野怪
				  tagetRecord.type,//目标类型
				  tagetRecord.needTime,//出征时间
				  true,//可更改目标
				  tagetRecord//目标对象
		  );
		  //确定方法回调
		  if(warpthGargetClass.callBack.confirm)
			  warpthGargetClass.callBack.confirm(expedition);
	}
};

warpthGargetClass.draw = {};
warpthGargetClass.draw.index = 0;
warpthGargetClass.draw.groupBottom = 'cityMenu';
warpthGargetClass.draw.layer = 'cityMenuLayer';
//changeMap封装
warpthGargetClass.draw.changeMap = function(){
	changeMap(warpthGargetClass.draw.layer);
};
//窗体底层参数设置
warpthGargetClass.draw.setGroupBottom = function(groupBottom){
	if(groupBottom)
		warpthGargetClass.draw.groupBottom = groupBottom;
};
//窗体layer设置
warpthGargetClass.draw.setLayer = function(layer){
	if(layer)
		warpthGargetClass.draw.layer = layer;
};
