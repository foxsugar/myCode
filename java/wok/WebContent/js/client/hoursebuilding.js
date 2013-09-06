var jzs_tempX1 = 0;//背景坐标
var jzs_tempY1 = 0;
var jzs_tempX2 = 0;//背景框坐标
var jzs_tempY2 = 0;
var jzs_tempX3 = 0;//二级菜单名称坐标
var jzs_tempY3 = 0;
var build_Area = [
   [[429,239], [498,237], [498,310],[429,310]],
   [[541,239], [614,237], [614,310],[541,310]],
   [[652,239], [725,237], [725,310],[652,310]],
   [[755,239], [828,237], [828,310],[755,310]],
   [[853,239], [925,264], [925,310],[853,310]],
   [[966,239], [1040,237], [1040,310],[966,330]],
   [[427,358], [498,356], [498,429],[427,429]],  
   [[350,478], [420,478], [421,549],[350,549]],
   [[426,478], [498,478], [498,549],[426,549]],
   [[504,478], [575,478], [575,549],[504,549]],
   [[654,478], [726,478], [726,549],[654,549]],   
   [[755,478], [828,478], [828,549],[755,549]],   
   [[921,478], [993,478], [993,549],[921,549]],    
   [[1015,478], [1089,478], [1089,549],[1015,549]],      
];
var drawHorsebuildingSequence = ["mj","js","by","gk","wwg","kjg","jg","jxg","jf","jjc","lbc","dj","jgf","tys"];//绘制建造树的绘制顺序数组
var x = false;
var buildingCanBuild = new Array();//升级能建造
var buildingBuilt = new Array();//升级已建造
var rectIndex = 0;
var hoursebuilding= function(index)
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isHoursebuilding = true;
	tempX1 = (gbox.getScreenW() - gbox.getImage("jzs_zjm_01").width)/2;
    tempY1= (gbox.getScreenH() - gbox.getImage("jzs_zjm_01").height)/2;
    tempX2 = (gbox.getScreenW() - gbox.getImage("jzs_zjm_02").width)/2;
    tempY2= (gbox.getScreenH() - gbox.getImage("jzs_zjm_02").height)/2;
    tempX3 = (gbox.getImage('jzs_zjm_01').width - gbox.getImage("jzs_zjm_03").width)/2 + tempX1;
	var bW = gbox.getImage("jzs_zjm_01").width;
	var exitX = tempX1 + bW - 30;
	var exitY = tempY1 + 25;    
    gbox.addObject(
			{ 
				id : 'hoursebuilding' + index,
				group : 'levelMenu_1',
				tileset : 'jzs_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [315,130], [1125,130], [1125,611],[315,611]],
				initialize : function()
				{
				},
				first : function() 
				{	
				},
				myclick : function()
				{
                    if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
                    {
                    	displayDestroy();
						exit(index);
						curGroup = 'cityMenu';
						isHoursebuilding = false;
						isDrawUI[index] = false;
						clickObjectList[index].poly= [[0,0],[0,0],[0,0],[0,0]];
						enterCityMenu(curGroup);
			            changeMap('cityMenuLayer');	
					}else{
						hoursebuilding(index);
						changeMap('cityMenuLayer');	 
						curGroup = 'cityMenu';
						for(var i = 0 ; i<14; i++)
						{
						    if(typeof(getBuildingTreeArray[i].isCanBuild) != "undefined")
							if(getBuildingTreeArray[i].isCanBuild && !getBuildingTreeArray[i].isFull)
							{
								if(gbox._mouseArea(build_Area[i],lastTouchMoveX,lastTouchMoveY)){
								   if(buildList[index][0] == 'build_empty'){
								  		build_cnt[index] = 0;
								  		buildArray[index].build(getBuildingTreeArray[i].buildingNo,"" + index,true);//网络_建造
								  		buildList[index][0] = 'build_start';
								  	}		
		                    	    isHoursebuilding = false;
								  	isDrawUI[index] = false;
								  	clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];//销毁建造建筑UI控制            	
		                        }	
							}
						
						}
				}
 
				},
				blit : function()
				{
					 if(isDrawUI[index] && isHoursebuilding)
					 {
                        gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'jzs_zjm_01',tile : 0,dx :tempX1-2,dy :tempY1-2,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
					    });
					    gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'jzs_zjm_02',tile : 0,dx :tempX2,dy :tempY2 + 2,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
					    });
					     gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'jzs_zjm_03',tile : 0,dx :tempX3,dy :tempY1,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
					    });
	
					    for(var i = 0; i<drawHorsebuildingSequence.length; i++)	
					    {
					    	{
					    		if(gbox._mouseArea(build_Area[i],touchMoveX,touchMoveY) && getBuildingTreeArray[i].isCanBuild && !getBuildingTreeArray[i].isFull)
						    	{
							  	    gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'jzs_zjm_04',
										tile : 0,
										dx :build_Area[i][0][0],
									    dy :build_Area[i][0][1],
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
						    	}
					    	}
					    	
					    }
					    for(var i = 0; i<drawHorsebuildingSequence.length; i++)
					    {
					    	if(getBuildingTreeArray[i].isCanBuild)
						    	{
						    		gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : drawHorsebuildingSequence[i] + "_01",
										tile : 0,
										dx :build_Area[i][0][0] + 5,
									    dy :build_Area[i][0][1] + 4,
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
										tileset : drawHorsebuildingSequence[i]+ "_02",
										tile : 0,
										dx :build_Area[i][0][0] + 5,
									    dy :build_Area[i][0][1] + 4,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
						    	}
					    	if(getBuildingTreeArray[i].isFull)
						    	{
						    		gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : drawHorsebuildingSequence[i]+ "_03",
										tile : 0,
										dx :build_Area[i][0][0] + 5,
									    dy :build_Area[i][0][1] + 4,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
						    		
						    	}
					    }
					    for(var i =0 ;i<14; i++)
					    {
					    	if(gbox._mouseArea(build_Area[i],touchMoveX,touchMoveY))
					    	{
								 if(typeof(getBuildingTreeArray[i]) != 'undefined')
								 {
										var tempH = tooltip.computBuildingTree(gbox.getBufferContext(),getBuildingTreeArray[i]).height;
										var tempW = tooltip.width;
			                            var mouseX = 0;
			                            var mouseY = 0;
			                            var uiScreenX = gbox.getScreenW();
										if((uiScreenX - touchMoveX) < tempW)	
										{
											mouseX = uiScreenX - tempW - 20;
										}
										else
										{
											mouseX = touchMoveX;
										}
										
										var uiScreenY = gbox.getScreenH();
										if((uiScreenY - touchMoveY) < tempH)	
										{
											mouseY = uiScreenY - tempH;
										}
										else
										{
											mouseY = touchMoveY;
										}
										if(touchMoveX !=0)
										{
											tooltip.drawBuildingTree(gbox.getImage("toolTip"),gbox.getBufferContext(),mouseX,mouseY,getBuildingTreeArray[i]); 
										}
											
								 }
//								gbox.drawMessageRect(getBuildingTreeArray[i].buildingName + ":" +getBuildingTreeArray[i].desc, lastTouchMoveX,lastTouchMoveY, 200, 12, '#FFFFFF')
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

}