
var isRadarMap = false;
var isLianmeng = false;
var isDidui = false;
var radarPoly = new Array(new Array());
var radayIndex = 0;
var radarMap = function(index){
	gbox.setRenderOrder(['worldScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isRadarMap = true
	var bW = gbox.getImage('sjdt_zjm_01').width;
	var bH = gbox.getImage('sjdt_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 25;
	var exitY = backdropY + 30;		
		gbox.addObject(
			{ 
				id : 'radarMap',
				group : 'levelMenu_1',
				tileset : 'sjdt_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					radarPoly = new Array(new Array());
				},
				first : function() 
				{

				},
				myclick : function()
				{
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23)){
						displayDestroy();
						exit(index);
				 		WorldScreen();
				        changeMap('worldScreen_Layer');
					}else{
						
						if(lastTouchMoveX > 246 && lastTouchMoveX < (246 + 18) && lastTouchMoveY > 161 && lastTouchMoveY < (161 + 18)){
							if(isLianmeng){
								isLianmeng = false;
							}else{
								World.getAlly(doAlly);
								isLianmeng = true;
							}
								
						}
						
						if(lastTouchMoveX > 246 && lastTouchMoveX < (246 + 18) && lastTouchMoveY > 195 && lastTouchMoveY < (195 + 18)){
							if(isDidui){
								isDidui = false;
							}else{
								World.getEnemy(doEnemy);
								isDidui = true;
							}	
						}
						
						radarMap(getClickObjectIndex());
						changeMap('worldScreen_Layer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isRadarMap)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'sjdt_zjm_01',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });
					    if(isLianmeng)
					    	 gbox.drawImage('sjdt_zjm_36',246,161);
					    if(isDidui)
					         gbox.drawImage('sjdt_zjm_36',246,195);
					    
					    
					    for(var i=0; i<systemCityData.length; i++){
                            var temp = systemCityData[i];
                            
					    	switch(temp.type){
					    	case 1://国都
					    		var imgW = gbox.getImage('sjdt_zjm_37').width;
					    		var imgH = gbox.getImage('sjdt_zjm_37').height;
					    		var dx = RADAR_MAP_X + getCx(temp.x,temp.y)*RADAR_X_RATE - imgW/2;
					    		var dy = RADAR_MAP_Y + getCy(temp.x,temp.y)*RADAR_Y_RATE - imgH/2;
					    		gbox.drawImage('sjdt_zjm_37',dx,dy);
					    		radarPoly[i] = [[dx,dy],[dx+imgW,dy],[dx+imgW,dy+imgH],[dx,dy+imgH]];
					    		break;
					    	case 2://名城
					    		var imgW = gbox.getImage('sjdt_zjm_24').width;
					    		var imgH = gbox.getImage('sjdt_zjm_24').height;
					    		var dx = RADAR_MAP_X + getCx(temp.x,temp.y)*RADAR_X_RATE - imgW/2;
					    		var dy = RADAR_MAP_Y + getCy(temp.x,temp.y)*RADAR_Y_RATE - imgH/2;
					    		gbox.drawImage('sjdt_zjm_24',dx,dy);
					    		radarPoly[i] = [[dx,dy],[dx+imgW,dy],[dx+imgW,dy+imgH],[dx,dy+imgH]];
					    		break;
					    	}
					    	
					    	if(gbox._mouseArea(radarPoly[i],touchMoveX,touchMoveY)){
					    		radayIndex = i;
					    	}
					    }
					    
						if(gbox._mouseArea(radarPoly[radayIndex],touchMoveX,touchMoveY)){
							var temp = systemCityData[radayIndex];
							var str_array = new Array();
							if(temp.type == 1){
					    		var imgW = gbox.getImage('sjdt_zjm_37').width;
					    		var imgH = gbox.getImage('sjdt_zjm_37').height;
								str_array[0] = "国都名: " + temp.name;//国都名
							}else{
					    		var imgW = gbox.getImage('sjdt_zjm_24').width;
					    		var imgH = gbox.getImage('sjdt_zjm_24').height;
					    		str_array[0] = "名城名: " + temp.name;//名城名
							}
							
				    		var dx = RADAR_MAP_X + getCx(temp.x,temp.y)*RADAR_X_RATE - imgW/2;
				    		var dy = RADAR_MAP_Y + getCy(temp.x,temp.y)*RADAR_Y_RATE - imgH/2;
							
							str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;//名城坐标
							
			    			var str_MaxWidth = gbox.stringArrayWidth(str_array, 8);	
			    	        var rectW = str_MaxWidth + 20;	
			    	        var rectH = str_array.length * 20;	
			    	        
							var ttX = dx + (imgW - rectW)/2;
							var ttY = dy + (imgH - rectH)/2;
			    	        
			    			var rect = new Rect(ttX,ttY,rectW,rectH);
			    			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
			    			for(var a=0; a<str_array.length; a++){
			    				 gbox.drawString(str_array[a],rect.getX() + 3,rect.getY() + 5 + (a * 20),"#FFFFFF",8);
			    			}  
						}
						
						   if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
						   {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_17',
									tile : 0,
									dx : exitX - 2,
									dy : exitY + 10,
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
									tileset : 'ty_an_18',
									tile : 0,
									dx : exitX - 2,
									dy : exitY + 10,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							    });	
						   }
					 }						
				}
			});

};

var isRadarPop = false;
var radarPop = function(index){
	gbox.setRenderOrder(['worldScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isRadarPop = true;
	var bW = gbox.getImage('sjdt_zjm_11').width;
	var bH = gbox.getImage('sjdt_zjm_11').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 20;
	var exitY = backdropY + 3;		
		gbox.addObject(
			{ 
				id : 'radarPop',
				group : 'levelMenu_1',
				tileset : 'sjdt_zjm_11',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
		            if(worldRadarDiv == null && !gbox._isIndwellDiv("worldRadarDiv","input"))
					{
							var pnX = 588;
							var pnY = 333;
							worldRadarDiv = addDivWindowBg(pnX,pnY);
							worldRadarDiv.id = 'worldRadarDiv';
							document.body.appendChild(worldRadarDiv);
							worldRadarName = document.createElement("textarea");
							worldRadarName.id = 'worldRadarDiv';
							worldRadarName.innerHTML = '';
							worldRadarName.style.opacity="0.5";
							worldRadarName.style.backgroundColor = "#272120";
							worldRadarName.style.color = "#ffffff";
							worldRadarName.style.width = '262px';
							worldRadarName.style.height = '75px';
							worldRadarName.style.maxWidth = '262px';
							worldRadarName.style.maxHeight = '75px';
							worldRadarName.style.resize= 'none';
							//mailContent.readonly= 'readonly';
							worldRadarName.disabled = 'disabled';
							worldRadarDiv.appendChild(worldRadarName);

					}
		            worldRadarName.innerHTML = "";
					 switch(worldDataType){
					 case 1://建城点
					     if(typeof(cityPoint[cityPointIndex]) != "undefined"){
					    	 var temp  = cityPoint[cityPointIndex];
							 var str_array = new Array();
								str_array[0] = "国家: " + World.countryName[temp.countryCode];//国家代号
								str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;//建城点
								str_array[2] = "地形: " + World.terrainName[temp.terrainCode];//地形代号
								
								if(temp.addFoodPercent > 0)
									str_array.push("增加粮食: +" + temp.addFoodPercent + "%");//增加粮食产量百分比
								
								if(temp.addWoodPercent > 0)
								    str_array.push("增加木材: +" + temp.addWoodPercent + "%");//增加木材产量百分比
								
								if(temp.addStonePercent > 0)
								    str_array.push("增加石料: +" + temp.addStonePercent + "%");//增加石料产量百分比
								
								if(temp.addIronstonePercent > 0)
								    str_array.push("增加铁矿: +" + temp.addIronstonePercent + "%");//增加铁矿产量百分比
						     for(var i=0; i<str_array.length; i++){
						    	 worldRadarName.innerHTML += str_array[i] + "\n";
						     }
					     }
						 
						 break;
					 case 4://资源
						 if(typeof(resources[resourcesIndex]) != "undefined"){
							 var temp = resources[resourcesIndex];
							 var str_array = new Array();
							 str_array[0] = "资源名: " + temp.name;//资源名
							 str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;
						     for(var i=0; i<str_array.length; i++){
						    	 worldRadarName.innerHTML += str_array[i] + "\n";
						     }
						 }

						 break;
					 case 5://野怪
						 if(typeof(creeps[creepsIndex]) != "undefined"){
							 var temp = creeps[creepsIndex];
							 var str_array = new Array();
							 str_array[0] = "怪物名: " + temp.name;//资源名
							 str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;
						     for(var i=0; i<str_array.length; i++){
						    	 worldRadarName.innerHTML += str_array[i] + "\n";
						     }
						 }
						 break;
					 case 6://国都
						 worldRadarName.innerHTML = "国都";
						 break;
					 case 7://名城
						 worldRadarName.innerHTML = "名城";
						 break;
					 }
		            
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(worldRadarDiv,"worldRadarDiv",588);
					/*======================================================*/	
				},
				myclick : function()
				{
					if(lastTouchMoveX > 618 && lastTouchMoveX < (618 + 62) && lastTouchMoveY > 410 && lastTouchMoveY < (410 + 35)){
						displayDestroy();
						exit(index);
				 		WorldScreen();
				        changeMap('worldScreen_Layer');
					}else
				    if(lastTouchMoveX > 768 && lastTouchMoveX < (768 + 62) && lastTouchMoveY > 410 && lastTouchMoveY < (410 + 35)){
						 switch(worldDataType){
						 case 1://建城点
							 displayDestroy();
							 exit(index);
							 WorldScreen();
							 changeMap('worldScreen_Layer');
							 var x = cityPoint[cityPointIndex].x;
							 var y = cityPoint[cityPointIndex].y;
							 World.moveCity(x,y,doMoveCity);
							 break;


						 case 4://资源
							 // by sun 
								//		加载图片
								MaidanLoadImage();		 
								isDrawUI[index] = false;
								isRadarPop = false;	
							    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					            if(worldRadarDiv != null && gbox._isIndwellDiv("worldRadarDiv","input"))
								{
									  document.body.removeChild(worldRadarDiv);  
									  worldRadarDiv = null;
								}

							 battle.isCollection(resources[resourcesIndex].x,resources[resourcesIndex].y,
						   				 function(data){
		                		   		      caijiPop(index,data);
		                		   		      //跳到指定层
		                		   		      changeMap('worldScreen_Layer');
				   						 }
				              );
		                       
							 break;

						 case 5://野怪creeps[creepsIndex]
							   World.getWorldMonster(creeps[creepsIndex].x,creeps[creepsIndex].y,
									   				 function(data){
													   if(typeof(data.error) != "undefined"){
															alert("系统提示：" + data.error);
															return;
														}
													 	//关闭当前窗口
														displayDestroy();
														exit(index);
								   						openWarpthMenu(data);
							   						 }
							   );

							 break;
						 case 6://国都

							 break;
						 case 7://名城

							 break;
						 }
					}else{
						radarPop(getClickObjectIndex());
						changeMap('worldScreen_Layer');						
					}
					
				},
				blit : function()
				{
					 if(isDrawUI[index] && isRadarPop)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'sjdt_zjm_11',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });

						    var fontW = gbox.getTextWidth("返回",14);
                            var btnX1 = 618;
						    var btnY1 = 410;
						    gbox.drawImage('ty_an_08',btnX1,btnY1);
						    var backX = btnX1 + (50 - fontW)/2 - 4;
							var backY = btnY1 + (35 - 14)/2 - 5;
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 50))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 35))))
					        {
					               gbox.drawImage('ty_an_06',btnX1,btnY1);               
					        }
							gbox.drawDanceString("返回", backX, backY,14,'#000000','#FFFFFF');	
						 
						 switch(worldDataType){
						 case 1://建城点
							    var titleW = gbox.getTextWidth("建城点",14);
							    var titleX = backdropX + (bW - titleW)/2;
							    gbox.drawDanceString("建城点", titleX, backdropY + 2,14,"#000000","#DDA66B");

							    var fontW = gbox.getTextWidth("迁城",14);
	                            var btnX1 = 768;
							    var btnY1 = 410;
							    gbox.drawImage('ty_an_08',btnX1,btnY1);
							    var backX = btnX1 + (50 - fontW)/2 - 4;
								var backY = btnY1 + (35 - 14)/2 - 5;
								if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 50))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 35))))
						        {
						               gbox.drawImage('ty_an_06',btnX1,btnY1);               
						        }
								gbox.drawDanceString("迁城", backX, backY,14,'#000000','#FFFFFF');	
								
							 break;
						 case 4://资源
							    var titleW = gbox.getTextWidth("资源",14);
							    var titleX = backdropX + (bW - titleW)/2;
							    gbox.drawDanceString("资源", titleX, backdropY + 2,14,"#000000","#DDA66B");

							    var fontW = gbox.getTextWidth("采集",14);
	                            var btnX1 = 768;
							    var btnY1 = 410;
							    gbox.drawImage('ty_an_08',btnX1,btnY1);
							    var backX = btnX1 + (50 - fontW)/2 - 4;
								var backY = btnY1 + (35 - 14)/2 - 5;
								if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 50))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 35))))
						        {
						               gbox.drawImage('ty_an_06',btnX1,btnY1);               
						        }
								gbox.drawDanceString("采集", backX, backY,14,'#000000','#FFFFFF');	
							 break;
						 case 5://野怪
							    var titleW = gbox.getTextWidth("野怪",14);
							    var titleX = backdropX + (bW - titleW)/2;
							    gbox.drawDanceString("野怪", titleX, backdropY + 2,14,"#000000","#DDA66B");

							    var fontW = gbox.getTextWidth("讨伐",14);
	                            var btnX1 = 768;
							    var btnY1 = 410;
							    gbox.drawImage('ty_an_08',btnX1,btnY1);
							    var backX = btnX1 + (50 - fontW)/2 - 4;
								var backY = btnY1 + (35 - 14)/2 - 5;
								if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 50))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 35))))
						        {
						               gbox.drawImage('ty_an_06',btnX1,btnY1);               
						        }
								gbox.drawDanceString("讨伐", backX, backY,14,'#000000','#FFFFFF');	
							 break;
						 case 6://国都

							 break;
						 case 7://名城

							 break;
						 }
					 }	

				}
			});

};



var isWorldMessage = false;
var worldMessage = function(index,msgInfo){
	gbox.setRenderOrder(['worldScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isWorldMessage = true;
	var buyOffsetY = 25;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'worldMessage',
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
				    var fontW = gbox.getTextWidth("返回",14);
					var bgW = gbox.getImage('ty_an_55').width;
					var bgH = gbox.getImage('ty_an_55').height;
				    var btnW = gbox.getImage('ty_an_10').width;
                    var btnX = backdropX + (bgW - btnW)/2;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + buyOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + buyOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						isWorldMessage = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("返回！");
					    worldScreen();
						changeMap('worldScreen_Layer');
			        }else{
			        	worldMessage(getClickObjectIndex(),msgInfo);
						changeMap('worldScreen_Layer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isWorldMessage)
					 {
						 var bgW = gbox.getImage('ty_an_55').width;
						 var bgH = gbox.getImage('ty_an_55').height;
						 gbox.drawImage('ty_an_55',backdropX,backdropY);
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - 45)/2;
//						 gbox.drawImage('quzhuTitle',titleX,backdropY);
						 gbox.drawDanceString("提示", titleX, backdropY,14,'#000000','#FFC861');
						 
						    var fontW = gbox.getTextWidth("返回",14);
						    var btnW = gbox.getImage('ty_an_10').width;
                            var btnX = backdropX + (bgW - btnW)/2;
						    var btnY = backdropY + bgH/2 + buyOffsetY;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;
							gbox.drawDanceString("返回", backX, backY,14,'#000000','#FFFFFF');	
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);
					               gbox.drawDanceString("返回", backX, backY,14,'#000000','#FFFFFF');			               
					        }	

							if(typeof(msgInfo) != 'undefined'){
								gbox._drawTxtRect(msgInfo,626,320,180,50,8,'#ffffff','#000000');
							}
					 }						
				}
			});
};

//获取世界资源
function doWorldResource(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	radarPop(getClickObjectIndex());
	changeMap('worldScreen_Layer');	
}

//获取世界怪物
function doWorldMonster(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	radarPop(getClickObjectIndex());
	changeMap('worldScreen_Layer');	
}

//获取世界国都
function doWorldCapital(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	radarPop(getClickObjectIndex());
	changeMap('worldScreen_Layer');	
}

//获取世界名城
function doWorldCity(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	radarPop(getClickObjectIndex());
	changeMap('worldScreen_Layer');	
}

/** 
 * 获取盟友
 * [{id,x,y},...]
 */
function doAlly(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	radarMap(getClickObjectIndex());
	changeMap('worldScreen_Layer');	
}
/**
 * 获取仇人
 * [{id,x,y},...]
 */
function doEnemy(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	radarMap(getClickObjectIndex());
	changeMap('worldScreen_Layer');	
}
/**
 * 获取系统城池
 * @return [{id,name,type,x,y},...]
 * type//1：国都，2：名城
 */
var systemCityData = new Array();
function doSystemCity(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	systemCityData = new Array();
	
	for(var i=0; i<data.length; i++){
		systemCityData[i] = {
				id:data[i].id,
				name:data[i].name,
				type:data[i].type,
				x:data[i].x,
				y:data[i].y,
		};
	}
	
	radarMap(getClickObjectIndex());
	changeMap('worldScreen_Layer');	
}

//迁城
function doMoveCity(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	cityChangeView[0] = false;
    cityChangeView[1] = false;
    cityChangeView[2] = true;
       displayDestroy();
	   exit(getClickObjectIndex());
	   worldMapStartX = 0;
       worldMapStartY = 0; 
       curScreenX = 0;
       curScreenY = 0;
       User.initWorld(doInitWorldData);
       envBtnCtr = false;
	   com_layer = 'worldScreen_Layer';
	   com_group = group_src = 'worldScreen';
	 var msgInfo = data.msg;
	 WorldScreen();
 	 worldMessage(getClickObjectIndex(),msgInfo);
	 changeMap('worldScreen_Layer');

}

//by sun 
function isInArea(x,y,area){
	return x>area[0]&&x<area[1]&&y>area[2]&&y<area[3];
}

//by sun 采集弹出
var isCaijiPop = false;
//可以采集的武将的id
var id4CanGo = null;
//是否已经选中武将
var isSelect = false;
//武将icon
var heroIcon_caiji = null;

var caijiPop = function(index,data)
{
	//渲染 
	gbox.setRenderOrder(['worldScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	
	isDrawUI[index] = true;
	isCaijiPop = true;

	//采集背景图
	var bW = gbox.getImage('caijiBg').width;
	var bH = gbox.getImage('caijiBg').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	
	//目标的位置
	var dextXY = [ (gbox.getScreenW() - bW)/2+100,(gbox.getScreenH() - bH)/2+35];
	//时间的位置
	var timeXY = [ (gbox.getScreenW() - bW)/2+100,(gbox.getScreenH() - bH)/2+65];
	//采集按钮位置
	var caijiButton = [695,499];
	//按钮大小
	var buttonSize = [45,20];
	//icon位置
	var iconXY = [667,312];
	 
		gbox.addObject(
			{ 
				id : 'caijiBg',
				group : 'levelMenu_2',
				tileset : 'caijiBg',
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
					//叉掉
					if(809<lastTouchMoveX&&832>lastTouchMoveX&&211<lastTouchMoveY&&226>lastTouchMoveY){
				    	//关闭窗口
			    		WorldScreen();
						 isCaijiPop = false;
			    		displayDestroy();
						exit(index);
			    		changeMap('worldScreen_Layer');
			    		return;
				    }
				    //选将
					else  if(657<lastTouchMoveX&&780>lastTouchMoveX&&298<lastTouchMoveY&&456>lastTouchMoveY){
				    	 //只能选择一个武将
				    	 generalChoiceClass.handlers.initCache(1,[]);
				    	 generalChoiceClass.handlers.confirmCallBack = function(list){
				    		 console.log(list[0]);
				    		 var hid = list[0].id ;
				    		 var icon = list[0].obj.heroIcon;
				    		 battle.verificationHero(hid, function(data){
				    			 //如果可以去武将采集
				    			 if(data){
				    				isSelect = true;
				    				//武将id
				    				id4CanGo = hid;
				    				//武将icon
				    				heroIcon_caiji = icon;
				    			 }else{
				    				 isSelect = false;
					    				//武将id
					    			id4CanGo = null;
					    			//武将id
					    			heroIcon_caiji = null;
				    			 }
				    		 	}
				    		 );
				    	 };
				    	 generalChoiceClass.handlers.closeCallBack = function(){};
				    	 generalChoiceClass.handlers.setSelectOptionVariable(-1,true);
				    	 generalChoice(getClickObjectIndex(),'worldScreen_Layer','worldScreen');
//		                 changeMap('worldScreen_Layer');
		             	warpthMenuClass.draw.changeMap();
				    	 
				    }else if(677<lastTouchMoveX&&755>lastTouchMoveX&&494<lastTouchMoveY&&514>lastTouchMoveY){//采集按钮
				    	//采集
				   // 	console.log("点中采集按钮=========================");
				   // 	console.log("id = "+id4CanGo+ "      x  = "+resources[resourcesIndex].x+"  y =   "+resources[resourcesIndex].y)
				    	if(!isSelect){
				    		alert("请先选择武将");
				    	}else{
				    		battle.collection(id4CanGo,resources[resourcesIndex].x,resources[resourcesIndex].y,function(){
//					    		console.log(data);
					    		isCaijiPop = false;
					    		displayDestroy();
								exit(index);
					    		WorldScreen();
					    		changeMap('worldScreen_Layer');
					    	});
				    	}
				    }
				    else if(isInArea(lastTouchMoveX,lastTouchMoveY,[603,832,209,523])&&!isInArea(lastTouchMoveX,lastTouchMoveY,[658,778,297,466])&&!isInArea(lastTouchMoveX,lastTouchMoveY,[678,758,496,519])){
				    	//do nothing
				    }
				    
				    WorldScreen();
			    	caijiPop(index,data);
			    	changeMap('worldScreen_Layer');
				},
				blit : function()
				{
					 if(isDrawUI[index] && isCaijiPop)
					 {
						 //背景图
						 gbox.drawImage('caijiBg',backdropX,backdropY);
						// 画字
						 gbox.drawDanceString(data.resourceName, dextXY[0], dextXY[1],12,'#000000','#FFC861');	
						 gbox.drawDanceString(data.time, timeXY[0], timeXY[1],12,'#000000','#FFC861');	
						 //采集按钮
						 //gbox.drawImage("caiji",695,499);
						 gbox.drawDanceString("采集", 695, 499,12,'#F0F0F0');	
						 //采集按钮
						 if(gbox._mouseArea([[caijiButton[0],caijiButton[1]],[caijiButton[0]+buttonSize[0],caijiButton[1]],[caijiButton[0]+buttonSize[0],caijiButton[1]+buttonSize[1]],[caijiButton[0],caijiButton[1]+buttonSize[1]]],touchMoveX,touchMoveY)){
						    	//gbox.drawImage("caiji1",caijiButton[0],caijiButton[1]);
								gbox.drawDanceString("采集", 695, 499,20,'#4840E8');	
					     }
						 //画英雄icon图片
						 if(isSelect){
//							 console.log("画英雄=====");
							 gbox.drawImage(heroIcon_caiji,iconXY[0],iconXY[1]);
						 }
						 
						 //叉图标
						 gbox.drawImage('ty_an_18',813,212);
						 //红的
						 if(gbox._mouseArea([[813,212],[834,211],[832,226],[812,225]],touchMoveX,touchMoveY)){
							 gbox.drawImage('ty_an_17',813,212);
						 }
					 }						
				}
			});
};


//打开讨伐窗口
var openWarpthMenu = function(data){
	var closeFn = function(){
		WorldScreen();
	};
	var openData = {
			id: data.enemyNo,
			name: data.enemyName,
			type: 0,
			typeLevel: data.forceLevel,
			needTime: data.needTime,
			isTargetChange: false,
			obj: data,
			close: closeFn,
			layer: 'worldScreen_Layer',
			groupBottom: 'worldScreen'
	};
	warpthMenuClass.handlers.battleOpen(openData);
};
