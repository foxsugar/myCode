var RADAR_MAP_X = 230;
var RADAR_MAP_Y = 125;
var RADAR_MAP_W = 978;
var RADAR_MAP_H = 490;
var BASE_WIDTH = 200;
var BASE_HEIGHT = 100;
var WORLD_SIZE = 413;
var RADAR_X_RATE = RADAR_MAP_W/(BASE_WIDTH*WORLD_SIZE);
var RADAR_Y_RATE = RADAR_MAP_H/(BASE_HEIGHT*WORLD_SIZE);
var size = 4;//是基本单元（200*100）的1/4
var rx = BASE_WIDTH/size;
var ry = BASE_HEIGHT/size;
var dx = 32800;
var divBg = null;
var divBg2 = null;
var input1;
var input2;
var cityPoly = new Array(new Array());
var cityIndex = 0;
var cityPointPoly = new Array(new Array());
var cityPointIndex = 0;
var resourcesPoly = new Array(new Array());
var resourcesIndex = 0;
var creepsPoly = new Array(new Array());
var creepsIndex = 0;
var capitalPoly = new Array(new Array());
var capitalIndex = 0;
var knownCityPoly = new Array(new Array());
var knownCityIndex = 0;
var curScreenX = 0;
var curScreenY = 0;
var citySphere = [
                  [[0,2],[0,3],[2,0],[3,0],[0,-2],[0,-3],[-2,0],[-3,0]],
                  [[1,2],[2,-1],[-1,-2],[-2,1]],
                  [[2,1],[1,-2],[-2,-1],[-1,2]],
                  [[0,4],[4,0],[0,-4],[-4,0]],
                  [[1,3],[3,-1],[-1,-3],[-3,1]],
                  [[2,2],[2,-2],[-2,-2],[-2,2]],
                  [[3,1],[1,-3],[-3,-1],[-1,3]],
                  [[0,5],[5,0],[0,-5],[-5,0]],
                  [[1,4],[4,-1],[-1,-4],[-4,1]],
                  [[2,3],[3,-2],[-2,-3],[-3,2]],
                  [[3,2],[2,-3],[-3,-2],[-2,3]],
                  [[4,1],[1,-4],[-4,-1],[-1,4]],
                  [[6,0],[0,-6],[-6,0],[0,6]],
                 ];

var isHaveCollide = function(cx,cy)
{
	for(var b=0; b<mcPointX.length; b++)
	{
		for(var c=0; c<mcPointX[b].length; c++)
		{
			if(cx == mcPointX[b][c] && 
					cy == mcPointY[b][c]){
				return true;
			}
		}	
	}
	return false;
}

var mcPointX = new Array();
var mcPointY = new Array();
var commandSphere = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[-1,1],[1,-1]];
var worldDataType = 0;
var isShow_CityPoint = true;
var isShow_Res_Creep = true;
var WorldScreen = function()//绘制世界场景
{
	
	var radarW = gbox.getImage("radar").width;
	var radarH = gbox.getImage("radar").height;
	var radarX = gbox.getScreenW() - radarW;
	gbox.setRenderOrder(['worldScreen']);
		gbox.addObject(
			{ 
				id : 'world_bg',
				group : 'worldScreen',
				tileset : 'world_bg',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [gbox.getScreenW(),0], [gbox.getScreenW(),gbox.getScreenH()],[0,gbox.getScreenH()]],
				initialize : function()
				{
					com_layer = 'worldScreen_Layer';
					com_group = group_src = 'worldScreen';
					cityPoly = new Array(new Array());
					cityPointPoly = new Array(new Array());
					resourcesPoly = new Array(new Array());
					creepsPoly = new Array(new Array());
					capitalPoly = new Array(new Array());
					knownCityPoly = new Array(new Array());
					//isJunqing = false;
					xiangqingCtr = false;
					if(divBg == null && !gbox._isIndwellDiv("divBg","input"))
					{
						  divBg = addDivWindowBg('' + 1290, '' + 8);
						  divBg.id = 'divBg';
		                  input1 = document.createElement("input");
		                  input1.style.globalAlpha = 0.1;
//		                  input1.style.backgroundColor = '#000000';
		                  input1.style.color = '#FFFFFF';
//		                  input1.style.borderColor = '#5A3226';
		                  input1.style.width = '40px';
		                  input1.style.height = '16px';
		                  input1.style.background = "transparent";
		                  input1.style.border = "0px solid";
		                  input1.style.outline = "none";
		                  input1.value = '' + mcIndexX;
		                  divBg.appendChild(input1);
		                  document.body.appendChild(divBg);


						  divBg2=addDivWindowBg('' + 1350, '' + 8);
				          divBg.id = 'divBg2';
		                  input2 = document.createElement("input");
		                  input2.style.globalAlpha = 0.1;
//		                  input2.style.backgroundColor = '#000000';
		                  input2.style.color = '#FFFFFF';
//		                  input2.style.borderColor = '#5A3226';
		                  input2.style.width = '40px';
		                  input2.style.height = '16px';
		                  input2.style.background = "transparent";
		                  input2.style.border = "0px solid";
		                  input2.style.outline = "none";
		                  input2.value = '' + mcIndexY;
		                  divBg2.appendChild(input2);
		                  document.body.appendChild(divBg2);
					}
                   //console.log("aaaaaaaaa === " + gbox.getSqrt(0,200, 0, 100));
				},
				first : function() 
				{	
					this.frame = 0;
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
						   		||worldMapStartY >recordY+180
						  )
						  {
									recordX  = worldMapStartX;
									recordY  = worldMapStartY;				   	
									fromMap  = false;
						  		
						  }			
					}
					
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(divBg,"divBg",1290);
					adaptiveDiv(divBg2,"divBg2",1350);
					/*======================================================*/	
					//console.log("worldMapStartY = " + worldMapStartY);	
				},
				myclick : function()
				{
					isJunqing = false;
					xiangqingCtr = false;
                    isShowAuctionPorp = false;
					generalDrawBg = false;
					var radarPloy = [[radarX,0],[radarX + radarW,0],[radarX + radarW,radarH],[radarX,radarH]];
			        if(gbox._mouseArea(radarPloy,lastTouchMoveX,lastTouchMoveY))
			        {
						  //世界小地图
						  var circle2Poly4 = [ [1396,145],[1396 + 38,145], [1396 + 38,145 + 36],[1396,145 + 36]];
				          //是否显示建成点
						  var circle2Poly1 = [ [1255,76],[1255 + 38,76], [1255 + 38,76 + 36],[1255,76 + 36]];
				          //是否显示资源和野怪
						  var circle2Poly3 = [ [1258,111],[1258 + 38,111], [1258 + 38,111 + 36],[1258,111 + 36]];
				          
						  if(gbox._mouseArea(circle2Poly4,lastTouchMoveX,lastTouchMoveY))
				          {
							  World.getSystemCity(doSystemCity);
				          }
				          if(gbox._mouseArea(circle2Poly1,lastTouchMoveX,lastTouchMoveY))
				          {
				          	if(!isShow_CityPoint)
				          		isShow_CityPoint = true;
				          	else
				          		isShow_CityPoint = false;
				          }
				          if(gbox._mouseArea(circle2Poly3,lastTouchMoveX,lastTouchMoveY))
				          {
				          	if(!isShow_Res_Creep)
				          	    isShow_Res_Creep = true;
				          	else
				          		isShow_Res_Creep = false;
				          }
			        }else{
	                    for(var i=0; i<moveArray.length; i++){
	    	                 if(moveArray[i])
	    	                  	return;
	                    }

	    	               //建城点
	    	                if(isShow_CityPoint)
	    			    	for(var i=0; i<cityPoint.length; i++)
	    			    	{
	    		        		if(gbox._mouseArea(cityPointPoly[i],lastTouchMoveX,lastTouchMoveY))
	    		        		{
	    		        			worldDataType = 1;
	    		        			cityPointIndex = i;
	    							radarPop(getClickObjectIndex());
	    							changeMap('worldScreen_Layer');
	    			       			break;
	    	       				}  	
	    			    	}
	    			    	//玩家城池
	    				    for(var i=0; i<playerCities.length; i++)
	    				    {
	    					    var temp = playerCities[i];
	    		        		if(gbox._mouseArea(cityPoly[i],lastTouchMoveX,lastTouchMoveY))
	    		        		{
	    		        			worldDataType = 3;
	    		        			cityIndex = i;
	    			       			User.getCharacterById(temp.charId,doCharacterById);
	    			       			break;
	    	       				}
	    				    }
	    		            //资源
	    				    if(isShow_Res_Creep)
	    		    	    for(var i=0; i<resources.length; i++)
	    		    	    {
	    					    var temp = resources[i];
	    		        		if(gbox._mouseArea(resourcesPoly[i],lastTouchMoveX,lastTouchMoveY))
	    		        		{
	    		        			worldDataType = 4;
	    		        			resourcesIndex = i;
	    		        			World.getWorldResource(temp.x,temp.y,doWorldResource);
	    			       			break;
	    	       				}  	
	    			    	}
	    		    	    
	    		            //野怪
	    		    	    if(isShow_Res_Creep)
	    		    	    for(var i=0; i<creeps.length; i++)
	    		    	    {
	    					    var temp = creeps[i];
	    		        		if(gbox._mouseArea(creepsPoly[i],lastTouchMoveX,lastTouchMoveY))
	    		        		{
	    		        			worldDataType = 5;
	    		        			creepsIndex = i;
	    		        			World.getWorldMonster(temp.x,temp.y,doWorldMonster);
	    			       			break;
	    	       				}  	
	    			    	}
	    		    	    
	    		            //国都
	    		    	    for(var i=0; i<capital.length; i++)
	    		    	    {
	    					    var temp = capital[i];
	    		        		if(gbox._mouseArea(capitalPoly[i],lastTouchMoveX,lastTouchMoveY))
	    		        		{
	    		        			worldDataType = 6;
	    		        			capitalIndex = i;
	    		        			World.getWorldCapital(0,doWorldCapital);
	    			       			break;
	    	       				}  	
	    			    	}
	    		    	    
	    		            //名城
	    		    	    for(var i=0; i<knownCity.length; i++)
	    		    	    {
	    					    var temp = knownCity[i];
	    		        		if(gbox._mouseArea(knownCityPoly[i],lastTouchMoveX,lastTouchMoveY))
	    		        		{
	    		        			worldDataType = 7;
	    		        			knownCityIndex = i;
	    		        			World.getWorldCity(0,doWorldCity);
	    			       			break;
	    	       				}  	
	    			    	}
			        }
				},
				
				blit : function()
				{               
					gbox.blitRect(gbox.getBufferContext(),{x:0,y:0,w:gbox._screenw,h:gbox._screenh,globalAlpha:0,color:'#CCCCCC'});
					for(var i=-1;i<worldRow;i++)
					{
						for(var j=-1;j<worldCol;j++)
						{
							mapx = j*800-worldMapStartX%800+10;
							mapy = i*800-worldMapStartY%800+20;
							gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:mapx,dy:mapy,fliph:this.fliph,flipv:this.flipv,camera:this.camera,alpha:1.0});
			            }
					}
					

					//地形图
					for(var a = 0; a<mapData.length; a++){
							
							var tileX = -(screenX - mapData[a].x*200) - worldMapStartX;
							var tileY = -(screenY - mapData[a].y*100) - worldMapStartY;
							if(mapData[a].b != "null"){
								gbox.drawImage(mapData[a].b,tileX,tileY);
							}
					}

//					if(typeof(nationalBoundaries) != "undefined" && typeof(nationalBoundaries[0]) != "undefined")
//					{
						for(var i=0; i<nationalBoundaries.length; i++)
						{
							
							var px = getCx(nationalBoundaries[i].x,nationalBoundaries[i].y);
							var py = getCy(nationalBoundaries[i].x,nationalBoundaries[i].y);
							var cx = -(screenX - px) - worldMapStartX;
							var cy = -(screenY - py) - worldMapStartY;
							var lineType = nationalBoundaries[i].type;
							
							if((lineType & 8) != 0){
								gbox.dottedLine(gbox.getBufferContext(), cx, cy-ry, cx+rx, cy);
							}
							if((lineType & 4) != 0){
								gbox.dottedLine(gbox.getBufferContext(), cx-rx, cy, cx, cy+ry);
							}
							if((lineType & 2) != 0){
								gbox.dottedLine(gbox.getBufferContext(), cx, cy-ry, cx-rx, cy);
							}
							if((lineType & 1) != 0){
								gbox.dottedLine(gbox.getBufferContext(), cx, cy+ry, cx+rx, cy);
							}
						}
//					}
					
					//建城点
//			    	if(typeof(cityPoint) != 'undefined' && typeof(cityPoint[0]) != 'undefined')
//			    	{
						if(isShow_CityPoint)
			    	    for(var i=0; i<cityPoint.length; i++)
			    	    {
					    	    var temp = cityPoint[i];
					    	    var resName = 'sjdt_zjm_30';// + epoch;
								var cx = getCx(temp.x,temp.y);
								var cy = getCy(temp.x,temp.y);
									var offsetX = cx - (gbox.getImage("" + resName).width)/2;
									var offsetY = cy - (gbox.getImage("" + resName).height)/2;
									var cityX = offsetX - screenX - worldMapStartX;
									var cityY = offsetY - screenY - worldMapStartY;
									var polyX = cx - screenX - worldMapStartX;
									var polyY = cx - screenY - worldMapStartY;

									var leftX = 0;
									var leftY = 0;
									var upX = 0;
									var upY = 0;
									var rightX = 0;
									var rightY = 0;
									var downX = 0;
									var downY = 0;
									var titleX = 0;
									var titleY = 0;
									
									for(var a=0; a < commandSphere.length; a++){
										var setX = commandSphere[a][0];
										var setY = commandSphere[a][1];
										var x = temp.x + setX;
										var y = temp.y + setY;
										var cx = getCx(x,y);
										var cy = getCy(x,y);
										var offsetX = cx - (gbox.getImage("rhomb1").width)/2;
										var offsetY = cy - (gbox.getImage("rhomb1").height)/2;
										var csX = offsetX - screenX - worldMapStartX;
										var csY = offsetY - screenY - worldMapStartY;
//										gbox.drawImage("rhomb1",csX,csY);
										
                                        
										if(setX == -1 && setY == 1){
											leftX = csX;
											leftY = csY + 25;
										}
										
										if(setX == -1 && setY == -1){
											upX = csX + 50;
										    upY = csY;
										}
										
										if(setX == 1 && setY == -1){
											rightX = csX + 100;
										    rightY = csY + 25;
										}
										
										if(setX == 1 && setY == 1){
											downX = csX + 50;
											downY = csY + 50;
											titleX = csX;
											titleY = csY;
										}
//										gbox.drawString("x: " + commandSphere[a][0] + ", y: " + commandSphere[a][1],csX,csY,'#FFFFFF');
									}
									
									cityPointPoly[i]  = [[leftX, leftY],
											             [upX, upY],
											             [rightX, rightY],
											             [downX, downY],
											             [leftX, leftY],
									                    ];
									
									
									gbox.drawImage("" + resName,cityX,cityY);
									
									var strW = gbox.getTextWidth("建城点",16);
									var dx = titleX + (100 - strW)/2;
									var dy = titleY + (50 - 20)/2;
									gbox.drawDanceString("建城点", dx, dy,16,"#000000","#DDA66B");
									
									if(gbox._mouseArea(cityPointPoly[i],touchMoveX,touchMoveY)){
//										gbox.drawImage("" + resName + "_l",cityX,cityY);
										var str_array = new Array();
										
										str_array[0] = "国家: " + World.countryName[temp.countryCode];//国家代号
										str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;//建城点
										str_array[2] = "地形: " + (World.terrainName[temp.terrainCode] || World.terrainName[World.terrainName.length-1]);//地形代号
										
										if(temp.addFoodPercent > 0)
											str_array.push("增加粮食: +" + temp.addFoodPercent + "%");//增加粮食产量百分比
										
										if(temp.addWoodPercent > 0)
										    str_array.push("增加木材: +" + temp.addWoodPercent + "%");//增加木材产量百分比
										
										if(temp.addStonePercent > 0)
										    str_array.push("增加石料: +" + temp.addStonePercent + "%");//增加石料产量百分比
										
										if(temp.addIronstonePercent > 0)
										    str_array.push("增加铁矿: +" + temp.addIronstonePercent + "%");//增加铁矿产量百分比
										
						    			var str_MaxWidth = gbox.stringArrayWidth(str_array, 8);	
						    	        var rectW = str_MaxWidth + 20;	
						    	        var rectH = str_array.length * 20;	
						    	        
										var ttX = cityX + (gbox.getImage("" + resName).width - rectW)/2;
										var ttY = cityY + (gbox.getImage("" + resName).height - rectH)/2;
						    	        
						    			var rect = new Rect(ttX + 10,ttY + 20,rectW,rectH + 5);
						    			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
						    			for(var a=0; a<str_array.length; a++){
						    				 gbox.drawString(str_array[a],rect.getX() + 3,rect.getY() + 5 + (a * 20),"#FFFFFF",8);
						    			}  
									}
									
			    	    }
//			    	}
			    	//玩家城池
//			    	if(typeof(playerCities) != 'undefined' && typeof(playerCities[0]) != 'undefined')
//			    	{
						var playerCityIndex = 0;
			    	    for(var i=0; i<playerCities.length; i++)
			    	    {
				    	    	var temp = playerCities[i];
				    	    	var resName = temp.cityAppearance;
								var cx = getCx(temp.x,temp.y);
								var cy = getCy(temp.x,temp.y);
								var offsetX = cx - (gbox.getImage("cc_" + resName).width)/2;
								var offsetY = cy - (gbox.getImage("cc_" + resName).height)/2;
								var cityX = offsetX - screenX - worldMapStartX;
								var cityY = offsetY - screenY - worldMapStartY;

								if(cx == mainCityX && cy == mainCityY){

									for(var o =0; o < temp.sphere; o++){
										var cs = citySphere[o];
										mcPointX[o] = new Array();
										mcPointY[o] = new Array();
										for(var a=0; a < cs.length; a++){
											var x = temp.x+cs[a][0];
											var y = temp.y+cs[a][1];
											var cx = getCx(x,y);
											var cy = getCy(x,y);
											mcPointX[o][a] = cx;
											mcPointY[o][a] = cy;
											var offsetX = cx - (gbox.getImage("rhomb1").width)/2;
											var offsetY = cy - (gbox.getImage("rhomb1").height)/2;
											var csX = offsetX - screenX - worldMapStartX;
											var csY = offsetY - screenY - worldMapStartY;
											gbox.drawImage("rhomb1",csX,csY);
										}
									}
								}
								
								var leftX = 0;
								var leftY = 0;
								var upX = 0;
								var upY = 0;
								var rightX = 0;
								var rightY = 0;
								var downX = 0;
								var downY = 0;
								var titleX = 0;
								var titleY = 0;
								for(var a=0; a < commandSphere.length; a++){
									var setX = commandSphere[a][0];
									var setY = commandSphere[a][1];
									var x = temp.x + setX;
									var y = temp.y + setY;
									var cx = getCx(x,y);
									var cy = getCy(x,y);
									var offsetX = cx - (gbox.getImage("rhomb").width)/2;
									var offsetY = cy - (gbox.getImage("rhomb").height)/2;
									var csX = offsetX - screenX - worldMapStartX;
									var csY = offsetY - screenY - worldMapStartY;
//									gbox.drawImage("rhomb1",csX,csY);
									
									if(setX == -1 && setY == 1){
										leftX = csX;
										leftY = csY + 25;
									}
									
									if(setX == -1 && setY == -1){
										upX = csX + 50;
									    upY = csY;
									}
									
									if(setX == 1 && setY == -1){
										rightX = csX + 100;
									    rightY = csY + 25;
									}
									
									if(setX == 1 && setY == 1){
										downX = csX + 50;
										downY = csY + 50;
										titleX = csX;
										titleY = csY;
									}
//									gbox.drawString("x: " + commandSphere[a][0] + ", y: " + commandSphere[a][1],csX,csY,'#FFFFFF');
								}
								
								cityPoly[i]  = [[leftX, leftY],
										             [upX, upY],
										             [rightX, rightY],
										             [downX, downY],
										             [leftX, leftY],
								                ];

								//城池势力范围
								if(gbox._mouseArea(cityPoly[i],touchMoveX,touchMoveY)){
									if(cx != mainCityX && cy != mainCityY){
										for(var o =0; o < temp.sphere; o++){
											var cs = citySphere[o];
											for(var a=0; a < cs.length; a++){
												var x = temp.x+cs[a][0];
												var y = temp.y+cs[a][1];
												var cx = getCx(x,y);
												var cy = getCy(x,y);
												var offsetX = cx - (gbox.getImage("rhomb1").width)/2;
												var offsetY = cy - (gbox.getImage("rhomb1").height)/2;
												var csX = offsetX - screenX - worldMapStartX;
												var csY = offsetY - screenY - worldMapStartY;
	                                            if(isHaveCollide(cx,cy)){
	                                            	gbox.drawImage("rhomb",csX,csY);
	                                            }else
												    gbox.drawImage("rhomb1",csX,csY);
											}
										}
									}
									gbox.drawImage("cc_" + resName + "_l",cityX,cityY);
								}else{
									gbox.drawImage("cc_" + resName,cityX,cityY);
								}
								
								var strW = gbox.getTextWidth(""+temp.name,16);
								var dx = titleX + (100 - strW)/2;
								var dy = titleY + (50 - 20)/2;
								gbox.drawDanceString(""+temp.name, dx, dy,16,"#000000","#DDA66B");
			    	    }
//			    	}
			    	//资源
//			    	if(typeof(resources) != 'undefined' && typeof(resources[0]) != 'undefined')
//			    	{
			    	    if(isShow_Res_Creep)
			    	    for(var i=0; i<resources.length; i++)
			    	    {
				    	    	var temp = resources[i];
				    	    	var resName = temp.exterior;
								var cx = getCx(temp.x,temp.y);
								var cy = getCy(temp.x,temp.y);
								var offsetX = cx - (gbox.getImage("" + resName).width)/2;
								var offsetY = cy - (gbox.getImage("" + resName).height)/2;
								var cityX = offsetX - screenX - worldMapStartX;
								var cityY = offsetY - screenY - worldMapStartY;
								
								var csX = (cx - (gbox.getImage("rhomb").width)/2) - screenX - worldMapStartX;
								var csY = (cy - (gbox.getImage("rhomb").height)/2) - screenY - worldMapStartY;
//								gbox.drawImage("rhomb",csX,csY);
								
								var leftX = csX;
								var leftY = csY + 25;
								var upX = csX + 50;
								var upY = csY;
								var rightX = csX + 100;
								var rightY = csY + 25;
								var downX = csX + 50;
								var downY = csY + 50;
								var titleX = csX;
								var titleY = csY;
								resourcesPoly[i]  = [[leftX, leftY],
										             [upX, upY],
										             [rightX, rightY],
										             [downX, downY],
										             [leftX, leftY],
								                ];
								
								gbox.drawImage("" + resName,cityX,cityY);
								
								var strW = gbox.getTextWidth(""+temp.name,16);
								var dx = titleX + (100 - strW)/2;
								var dy = titleY + (150 - 20)/2;
								gbox.drawDanceString(""+temp.name, dx, dy,16,"#000000","#DDA66B");
								
								if(gbox._mouseArea(resourcesPoly[i],touchMoveX,touchMoveY)){
				//					gbox.drawImage("" + resName + "_l",cityX,cityY);
									var str_array = new Array();
									str_array[0] = "资源名: " + temp.name;//资源名
									str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;
					    			var str_MaxWidth = gbox.stringArrayWidth(str_array, 8);	
					    	        var rectW = str_MaxWidth + 20;	
					    	        var rectH = str_array.length * 20;		
									var ttX = cityX + (gbox.getImage("" + resName).width - rectW)/2;
									var ttY = cityY + (gbox.getImage("" + resName).height - rectH)/2;
					    			var rect = new Rect(ttX + 10,ttY + 20,rectW,rectH + 5);
					    			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
					    			for(var a=0; a<str_array.length; a++){
					    				 gbox.drawString(str_array[a],rect.getX() + 3,rect.getY() + 5 + (a * 20),"#FFFFFF",8);
					    			} 
								}
								
			    	    }
//			    	}
			    	//野怪
//			    	if(typeof(creeps) != 'undefined' && typeof(creeps[0]) != 'undefined')
//			    	{
			    	    
			    		var resName = new Array();
			    		if(isShow_Res_Creep)
			    	    for(var i=0; i<creeps.length; i++)
			    	    {
				    	    	var temp = creeps[i];
				    	    	resName[i] = "" + temp.exterior;
								var cx = getCx(temp.x,temp.y);
								var cy = getCy(temp.x,temp.y);
								var offsetX = cx - (gbox.getImage("" + resName[i]).width)/2;
								var offsetY = cy - (gbox.getImage("" + resName[i]).height)/2;
								var cityX = offsetX - screenX - worldMapStartX;
								var cityY = offsetY - screenY - worldMapStartY;
								
								var csX = (cx - (gbox.getImage("rhomb").width)/2) - screenX - worldMapStartX;
								var csY = (cy - (gbox.getImage("rhomb").height)/2) - screenY - worldMapStartY;
//								gbox.drawImage("rhomb",csX,csY);
								
								var leftX = csX;
								var leftY = csY + 25;
								var upX = csX + 50;
								var upY = csY;
								var rightX = csX + 100;
								var rightY = csY + 25;
								var downX = csX + 50;
								var downY = csY + 50;
								var titleX = csX;
								var titleY = csY;
								creepsPoly[i]  = [[leftX, leftY],
										             [upX, upY],
										             [rightX, rightY],
										             [downX, downY],
										             [leftX, leftY],
								                ];
								
								gbox.drawImage("" + resName[i],cityX,cityY);
								
								var strW = gbox.getTextWidth("" + temp.name,16);
								var dx = titleX + (100 - strW)/2;
								var dy = titleY + (150 - 20)/2;
								gbox.drawDanceString("" + temp.name, dx, dy,16,"#000000","#DDA66B");
								
								if(gbox._mouseArea(creepsPoly[i],touchMoveX,touchMoveY)){
									
				//					gbox.drawImage("" + resName[i] + "_l",cityX,cityY);
									var str_array = new Array();
									str_array[0] = "野怪名: " + temp.name;//野怪名
									str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;
					    			var str_MaxWidth = gbox.stringArrayWidth(str_array, 8);	
					    	        var rectW = str_MaxWidth + 20;	
					    	        var rectH = str_array.length * 20;		
									var ttX = cityX + (gbox.getImage("" + resName[i]).width - rectW)/2;
									var ttY = cityY + (gbox.getImage("" + resName[i]).height - rectH)/2;
					    			var rect = new Rect(ttX + 10,ttY + 20,rectW,rectH + 5);
					    			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
					    			for(var a=0; a<str_array.length; a++){
					    				 gbox.drawString(str_array[a],rect.getX() + 3,rect.getY() + 5 + (a * 20),"#FFFFFF",8);
					    			} 
								}

			    	    }
//			    	}
			    	
			    	//国都
//			    	if(typeof(capital) != 'undefined' && typeof(capital[0]) != 'undefined')
//			    	{
			    	    for(var i=0; i<capital.length; i++)
			    	    {
				    	    	var temp = capital[i];
				    	    	var resName = 'sjdt_zjm_26';//temp.exterior;
								var cx = getCx(temp.x,temp.y);
								var cy = getCy(temp.x,temp.y);
								var offsetX = cx - (gbox.getImage("" + resName).width)/2;
								var offsetY = cy - (gbox.getImage("" + resName).height)/2;
								var cityX = offsetX - screenX - worldMapStartX;
								var cityY = offsetY - screenY - worldMapStartY;
								var leftX = 0;
								var leftY = 0;
								var upX = 0;
								var upY = 0;
								var rightX = 0;
								var rightY = 0;
								var downX = 0;
								var downY = 0;
								var titleX = 0;
								var titleY = 0;
								for(var a=0; a < commandSphere.length; a++){
									var setX = commandSphere[a][0];
									var setY = commandSphere[a][1];
									var x = temp.x + setX;
									var y = temp.y + setY;
									var cx = getCx(x,y);
									var cy = getCy(x,y);
									var offsetX = cx - (gbox.getImage("rhomb1").width)/2;
									var offsetY = cy - (gbox.getImage("rhomb1").height)/2;
									var csX = offsetX - screenX - worldMapStartX;
									var csY = offsetY - screenY - worldMapStartY;
//									gbox.drawImage("rhomb1",csX,csY);
									
									if(setX == -1 && setY == 1){
										leftX = csX;
										leftY = csY + 25;
									}
									
									if(setX == -1 && setY == -1){
										upX = csX + 50;
									    upY = csY;
									}
									
									if(setX == 1 && setY == -1){
										rightX = csX + 100;
									    rightY = csY + 25;
									}
									
									if(setX == 1 && setY == 1){
										downX = csX + 50;
										downY = csY + 50;
										titleX = csX;
										titleY = csY;
									}
//									gbox.drawString("x: " + commandSphere[a][0] + ", y: " + commandSphere[a][1],csX,csY,'#FFFFFF');
								}
								
								capitalPoly[i]  = [[leftX, leftY],
										             [upX, upY],
										             [rightX, rightY],
										             [downX, downY],
										             [leftX, leftY],
								                ];
								
								if(gbox._mouseArea(capitalPoly[i],touchMoveX,touchMoveY)){
									gbox.drawImage("sjdt_zjm_27",cityX,cityY);
									var str_array = new Array();
									str_array[0] = "国都名: " + temp.name;//国都名
									str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;
					    			var str_MaxWidth = gbox.stringArrayWidth(str_array, 8);	
					    	        var rectW = str_MaxWidth + 20;	
					    	        var rectH = str_array.length * 20;		
									var ttX = cityX + (gbox.getImage("" + resName).width - rectW)/2;
									var ttY = cityY + (gbox.getImage("" + resName).height - rectH)/2;
					    			var rect = new Rect(ttX + 10,ttY + 20,rectW,rectH + 5);
					    			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
					    			for(var a=0; a<str_array.length; a++){
					    				 gbox.drawString(str_array[a],rect.getX() + 3,rect.getY() + 5 + (a * 20),"#FFFFFF",8);
					    			}  
								}else
									gbox.drawImage("" + resName,cityX,cityY);
								
								var strW = gbox.getTextWidth("" + temp.name,16);
								var dx = titleX + (100 - strW)/2;
								var dy = titleY + (50 - 20)/2;
								gbox.drawDanceString("" + temp.name, dx, dy,16,"#000000","#DDA66B");
			    	    }
//			    	}
			    	//名城
//			    	if(typeof(knownCity) != 'undefined' && typeof(knownCity[0]) != 'undefined')
//			    	{
			    	    for(var i=0; i<knownCity.length; i++)
			    	    {
				    	    	var temp = knownCity[i];
				    	    	var resName = 'sjdt_zjm_28';//temp.exterior;
								var cx = getCx(temp.x,temp.y);
								var cy = getCy(temp.x,temp.y);
								var offsetX = cx - (gbox.getImage("" + resName).width)/2;
								var offsetY = cy - (gbox.getImage("" + resName).height)/2;
								var cityX = offsetX - screenX - worldMapStartX;
								var cityY = offsetY - screenY - worldMapStartY;
								var leftX = 0;
								var leftY = 0;
								var upX = 0;
								var upY = 0;
								var rightX = 0;
								var rightY = 0;
								var downX = 0;
								var downY = 0;
								var titleX = 0;
								var titleY = 0;
								for(var a=0; a < commandSphere.length; a++){
									var setX = commandSphere[a][0];
									var setY = commandSphere[a][1];
									var x = temp.x + setX;
									var y = temp.y + setY;
									var cx = getCx(x,y);
									var cy = getCy(x,y);
									var offsetX = cx - (gbox.getImage("rhomb1").width)/2;
									var offsetY = cy - (gbox.getImage("rhomb1").height)/2;
									var csX = offsetX - screenX - worldMapStartX;
									var csY = offsetY - screenY - worldMapStartY;
//									gbox.drawImage("rhomb1",csX,csY);
									
									if(setX == -1 && setY == 1){
										leftX = csX;
										leftY = csY + 25;
									}
									
									if(setX == -1 && setY == -1){
										upX = csX + 50;
									    upY = csY;
									}
									
									if(setX == 1 && setY == -1){
										rightX = csX + 100;
									    rightY = csY + 25;
									}
									
									if(setX == 1 && setY == 1){
										downX = csX + 50;
										downY = csY + 50;
										titleX = csX;
										titleY = csY;
									}
//									gbox.drawString("x: " + commandSphere[a][0] + ", y: " + commandSphere[a][1],csX,csY,'#FFFFFF');
								}
								
								knownCityPoly[i]  = [[leftX, leftY],
										             [upX, upY],
										             [rightX, rightY],
										             [downX, downY],
										             [leftX, leftY],
								                ];
								
								if(gbox._mouseArea(knownCityPoly[i],touchMoveX,touchMoveY)){
									knownCityIndex = i;
									gbox.drawImage("sjdt_zjm_29",cityX,cityY);
									var str_array = new Array();
									str_array[0] = "名城名: " + temp.name;//名城名
									str_array[1] = "坐标: X: " + temp.x + ", Y: " + temp.y;
					    			var str_MaxWidth = gbox.stringArrayWidth(str_array, 8);	
					    	        var rectW = str_MaxWidth + 20;	
					    	        var rectH = str_array.length * 20;		
									var ttX = cityX + (gbox.getImage("" + resName).width - rectW)/2;
									var ttY = cityY + (gbox.getImage("" + resName).height - rectH)/2;
					    			var rect = new Rect(ttX + 10,ttY + 20,rectW,rectH + 5);
					    			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
					    			for(var a=0; a<str_array.length; a++){
					    				 gbox.drawString(str_array[a],rect.getX() + 3,rect.getY() + 5 + (a * 20),"#FFFFFF",8);
					    			}  
								}
								else
									gbox.drawImage("" + resName,cityX,cityY);
								
								var strW = gbox.getTextWidth("" + temp.name,16);
								var dx = titleX + (100 - strW)/2;
								var dy = titleY + (50 - 20)/2;
								gbox.drawDanceString("" + temp.name, dx, dy,16,"#000000","#DDA66B");
			    	    }
//			    	}
//					var mcX = -(screenX - mainCityX) - worldMapStartX;
//					var mcY = -(screenY - mainCityY) - worldMapStartY;
//					gbox.drawString("X = " + getX(mainCityX,mainCityY) + ", Y = " + getY(mainCityX,mainCityY), mcX, mcY,'#FF0000');
					if(isMapMoving){
//						var rect = new Rect(0,0,gbox.getScreenW(),gbox.getScreenH());
//						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 1,"#151513","#151513",true);
						
//				    	
					    var s1x = curScreenX - gbox.getScreenW() - worldMapStartX;
					    var s1y = curScreenY - gbox.getScreenH() - worldMapStartY;
						var rect = new Rect(s1x,s1y,gbox.getScreenW(),gbox.getScreenH());
						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 0,"#151513","#151513",true);
						
				    	var s2x = curScreenX - worldMapStartX;
				    	var s2y = curScreenY - gbox.getScreenH() - worldMapStartY;
						var rect = new Rect(s2x,s2y,gbox.getScreenW(),gbox.getScreenH());
						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 0,"#151513","#151513",true);

				    	var s3x = curScreenX + gbox.getScreenW() - worldMapStartX;
				    	var s3y = curScreenY - gbox.getScreenH() - worldMapStartY;
						var rect = new Rect(s3x,s3y,gbox.getScreenW(),gbox.getScreenH());
						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 0,"#151513","#151513",true);
						
				    	var s4x = curScreenX + gbox.getScreenW() - worldMapStartX;
				    	var s4y = curScreenY - worldMapStartY;
						var rect = new Rect(s4x,s4y,gbox.getScreenW(),gbox.getScreenH());
						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 0,"#151513","#151513",true);
						
				    	var s5x = curScreenX + gbox.getScreenW() - worldMapStartX;
				    	var s5y = curScreenY + gbox.getScreenH() - worldMapStartY;
						var rect = new Rect(s5x,s5y,gbox.getScreenW(),gbox.getScreenH());
						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 0,"#151513","#151513",true);
						
				    	var s6x = curScreenX - worldMapStartX;
				    	var s6y = curScreenY + gbox.getScreenH() - worldMapStartY;
						var rect = new Rect(s6x,s6y,gbox.getScreenW(),gbox.getScreenH());
						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 0,"#151513","#151513",true);
						
				    	var s7x = curScreenX - gbox.getScreenW() - worldMapStartX;
				    	var s7y = curScreenY + gbox.getScreenH() - worldMapStartY;
						var rect = new Rect(s7x,s7y,gbox.getScreenW(),gbox.getScreenH());
						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 0,"#151513","#151513",true);
						
				    	var s8x = curScreenX - gbox.getScreenW() - worldMapStartX;
				    	var s8y = curScreenY - worldMapStartY;
						var rect = new Rect(s8x,s8y,gbox.getScreenW(),gbox.getScreenH());
						gbox.roundRectanglePath(gbox.getBufferContext(),rect, 0,"#151513","#151513",true);
					}
					
					gbox.drawImage("radar",radarX,0);	
					
					if(typeof(points) != "undefined" && typeof(points[0]) != "undefined"){
				        gbox.setClip(gbox.getBufferContext(),1295,60,102,88);
						
						for(var i=0; i<points.length; i++){
							var px = getCx(points[i].x,points[i].y);
							var py = getCy(points[i].x,points[i].y);
							var pointsX = px - screenX - worldMapStartX;
							var pointsY = py - screenY - worldMapStartY;
							switch(points[i].tp){
							case 1://建成点
								if(isShow_CityPoint)
								gbox.drawImage("sjdt_zjm_20",1295 + pointsX/scale,60 + pointsY/scale);
								break;
							case 3://玩家城池
								gbox.drawImage("sjdt_zjm_24",1295 + pointsX/scale,60 + pointsY/scale);
								break;
							case 4://资源
								if(isShow_Res_Creep)
								gbox.drawImage("sjdt_zjm_25",1295 + pointsX/scale,60 + pointsY/scale);
								break;
							case 5://野怪
								if(isShow_Res_Creep)
								gbox.drawImage("sjdt_zjm_22",1295 + pointsX/scale,60 + pointsY/scale);
								break;
							case 6://国都
								gbox.drawImage("sjdt_zjm_19",1295 + pointsX/scale,60 + pointsY/scale);
								break;
							case 7://名城
								gbox.drawImage("sjdt_zjm_21",1295 + pointsX/scale,60 + pointsY/scale);
								break;
							}
							
//							var rect = new Rect(1300 + pointsX/scale,50 + pointsY/scale,5,5);
//							gbox.blitRect(gbox.getBufferContext(),rect);
						}
				        
				        gbox.restoreClip(gbox.getBufferContext());
					}
;
					var arrowPoly = [ [1393,9],[1393 + 24,9], [1393 + 24,9 + 17],[1393,9 + 17]];
                    if(gbox._mouseArea(arrowPoly,touchMoveX,touchMoveY))
                    {
                    	gbox.drawImage("arrow",arrowPoly[0][0] - 3,arrowPoly[0][1]);
			        }
					
					var circle1Poly = [ [1260,35],[1260 + 44,35], [1260 + 44,35 + 44],[1260,35 + 44]];
                    if(gbox._mouseArea(circle1Poly,touchMoveX,touchMoveY))
                    {
                    	gbox.drawImage("circle1",circle1Poly[0][0] - 6,circle1Poly[0][1] - 5);
			        }
                    
					var circle2Poly1 = [ [1255,76],[1255 + 38,76], [1255 + 38,76 + 36],[1255,76 + 36]];
                    if(gbox._mouseArea(circle2Poly1,touchMoveX,touchMoveY))
                    {
                    	gbox.drawImage("circle2",circle2Poly1[0][0] - 4,circle2Poly1[0][1] - 4);
			        }
                    
					var circle2Poly2 = [ [1256,78],[1256 + 38,78], [1256 + 38,78 + 36],[1256,78 + 36]];
                    if(gbox._mouseArea(circle2Poly2,touchMoveX,touchMoveY))
                    {
                    	gbox.drawImage("circle2",circle2Poly2[0][0] - 6,circle2Poly2[0][1] - 7);
                    	
			        }
                    
					var circle2Poly3 = [ [1258,111],[1258 + 38,111], [1258 + 38,111 + 36],[1258,111 + 36]];
                    if(gbox._mouseArea(circle2Poly3,touchMoveX,touchMoveY))
                    {
                    	gbox.drawImage("circle2",circle2Poly3[0][0] - 5,circle2Poly3[0][1] - 6);
			        }
                    
					var circle2Poly4 = [ [1396,145],[1396 + 38,145], [1396 + 38,145 + 36],[1396,145 + 36]];
                    if(gbox._mouseArea(circle2Poly4,touchMoveX,touchMoveY))
                    {
                    	gbox.drawImage("circle2",circle2Poly4[0][0] - 4,circle2Poly4[0][1] - 6);
			        }
                    
//					var addingPoly = [ [1398,31],[1398 + 15,31], [1398 + 15,31 + 18],[1398,31 + 18]];
//                    if(gbox._mouseArea(addingPoly,touchMoveX,touchMoveY))
//                    {
//                    	gbox.drawImage("adding",addingPoly[0][0] - 2,addingPoly[0][1] - 2);
//			        }
//                    
//					var decreasePoly = [ [1414,58],[1414 + 15,58], [1414 + 15,58 + 6],[1414,58 + 6]];
//                    if(gbox._mouseArea(decreasePoly,touchMoveX,touchMoveY))
//                    {
//                    	gbox.drawImage("decrease",decreasePoly[0][0] - 2,decreasePoly[0][1] - 2);
//			        }
				}
			});
		
			 //绘制公有按钮
			 drawCommonBtn('levelMenu_1','worldScreen','worldScreen_Layer');
};

//名城
function doGetWorldCity(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
}
//国都
function doGetWorldCapital(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
}
//野怪
function doGetWorldMonster(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
}
//资源
function doGetWorldResource(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
}
//玩家城池
function doCharacterById(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	var temp = data;
	kingData = undefined;
	kingData = {
			    militaryStrength:temp.militaryStrength,//武力
			    countryName:temp.countryName,//国家名称
			    abilityPoint:temp.abilityPoint,//潜能点
			    coordinate:temp.coordinate,//联盟
			    internalAffairs:temp.internalAffairs,//谋略
			    image:temp.image,//头像ICON
			    experienceLimit:temp.experienceLimit,//经验上限
			    cityExperienceLimit:temp.cityExperienceLimit,//城市经验上限
			    vipLevel:temp.vipLevel,//VIP等级
			    cityLevel:temp.cityLevel,//城市等级
			    allianceName:temp.allianceName,//武魂名字
			    level:temp.level,//君主等级
			    description:temp.description,//君主描述
			    name:temp.name,//君主名字
			    reputation:temp.reputation,//声望
			    cityExperience:temp.cityExperience,//城市经验
			    experience:temp.experience,//君主经验
			    ranking: temp.ranking,//排名
			    characterId : temp.characterId //君主id(派遣、讨伐使用)
               };
	
	if(typeof(kingData) != "undefined"){
		kingInfo = new Array(new Array());
		kingInfo = [
		            ["" + kingData.name,"" + kingData.level],
		            ["" + kingData.cityLevel,"" + kingData.countryName],
		            ["" + kingData.allianceName,"" + kingData.ranking],
		            ["" + kingData.coordinate,"" + kingData.cityExperience]
		];
	}
	
	junzhuInfo(getClickObjectIndex(),com_group,com_layer);
	changeMap(com_layer);
}