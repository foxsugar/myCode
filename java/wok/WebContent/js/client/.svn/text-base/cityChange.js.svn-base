var cityChangeView = new Array();
cityChangeView[0] = true;
cityChangeView[1] = false;
cityChangeView[2] = false;
function docloseSuburbUi(data)
{
	
}
var drawWorldBtn = function(_group)
{
    if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	    
        gbox.addObject(
			{ 
				id : 'worldBig',
				group : 'levelMenu_1',
			    tileset : 'zjm_an_sj_1',
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
						zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_sj_1").width) + document.body.scrollLeft;
					}
					else
					{
						zim_an_bjX = (1440 - gbox.getImage("zjm_an_sj_1").width);
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
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop ;
				    this.poly = [[zim_an_bjX,zim_an_bjY],[zim_an_bjX + gbox.getImage("zjm_an_sj_1").width,zim_an_bjY],[zim_an_bjX + gbox.getImage("zjm_an_sj_1").width,zim_an_bjY + gbox.getImage("zjm_an_sj_1").height],[zim_an_bjX,zim_an_bjY + gbox.getImage("zjm_an_sj_1").height]];	
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
						zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_sj_1").width) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - gbox.getImage("zjm_an_sj_1").width);
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
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop ;
					gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_an_sj_1',
							tile : 0,
							dx :zim_an_bjX,
							dy :zim_an_bjY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   }); 

					   
				}
			});
			gbox.addObject(
			{ 
				id : 'neicheng',
				group : 'levelMenu_1',
			    tileset : 'zjm_an_sj_1',
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
						zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_sj_1").width) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - gbox.getImage("zjm_an_sj_1").width);
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
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop ;
				    //var tempZjm_an_sj_3 = zim_an_bjY + gbox.getImage("zjm_an_sj_1").height/2;
				    this.poly = [[zim_an_bjX ,zim_an_bjY + 8],[zim_an_bjX + gbox.getImage("zjm_an_sj_3").width,zim_an_bjY + 8],[zim_an_bjX + gbox.getImage("zjm_an_sj_3").width,zim_an_bjY + 34],[zim_an_bjX,zim_an_bjY + 34]];	
				},
				myclick : function()
				{
//					drawChatDiv(0,565);	
                    envBtnCtr = false;
                    suburb.closeSuburbUi(docloseSuburbUi);
                    displayDestroy();
					if(divBg != null)
					{
						input1.style.display="none"; 
						input2.style.display="none"; 
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
                    cityChangeView[0] = true;
                    cityChangeView[1] = false;
                    cityChangeView[2] = false;
					socialMessageAlertCtr = false;
					queryUnionAlertCtr= false;
					friendListCtr = false;
					socialDraw = false;
//					displayDestroy();
//					exit(getClickObjectIndex());
					curGroup = 'cityMenu';
					envBtnCtr = false;	
					enterCityMenu('cityMenu');
		            changeMap('cityMenuLayer');			            				
					com_layer = 'cityMenuLayer';
					com_group = group_src = 'cityMenu';
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
						zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_sj_1").width) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - gbox.getImage("zjm_an_sj_1").width);
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
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop ;
				    if(((touchMoveX > this.poly[0][0]) && (touchMoveX < this.poly[1][0])) && ((touchMoveY > this.poly[0][1]) && (touchMoveY<this.poly[2][1])))
				    {
				    	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_an_sj_3',
							tile : 0,
							dx :zim_an_bjX + 8,
							dy :zim_an_bjY + 10,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   }); 
				    }
				    if(cityChangeView[0])
				    {
				    	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_35',
							tile : 0,
							dx :zim_an_bjX + 8,
							dy :zim_an_bjY + 10,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   }); 
				    }
					gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_37',
							tile : 0,
							dx :zim_an_bjX + 17,
							dy :zim_an_bjY + 10,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   });

					   
				}
			});
			gbox.addObject(
			{ 
				id : 'chengjiaoButton',
				group : 'levelMenu_1',
			    tileset : 'zjm_an_sj_1',
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
						zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_sj_1").width) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - gbox.getImage("zjm_an_sj_1").width);
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
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop ;
				   // var tempZjm_an_sj_3 = zim_an_bjY + gbox.getImage("zjm_an_sj_1").height/2;
				    this.poly = [[zim_an_bjX ,zim_an_bjY + 36],[zim_an_bjX + gbox.getImage("zjm_an_sj_3").width,zim_an_bjY + 36],[zim_an_bjX + gbox.getImage("zjm_an_sj_3").width,zim_an_bjY + 61],[zim_an_bjX,zim_an_bjY + 61]];	
				},
				myclick : function()
				{
					console.log('进入城郊！！！');
					loadingImageList['Suburbs'].load(
							getClickObjectIndex(),
		     				SuburbsLoadImage,
		     				function(){
		     					displayDestroy();
		    					if(divBg != null)
		    					{
		    						input1.style.display="none"; 
		    						input2.style.display="none"; 
		    					}
		    					socialMessageAlertCtr = false;
		    					queryUnionAlertCtr = false;
		    					friendListCtr = false;
		    					socialDraw = false;
		    					
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
		    					cityChangeView[0] = false;
		                        cityChangeView[1] = true;
		                        cityChangeView[2] = false;
		    					displayDestroy();
		    					exit(getClickObjectIndex());
		    				    worldMapStartX = 0;
		    					worldMapStartY = 0;
		    	                curScreenX = 0;
		    	                curScreenY = 0;
		    					envBtnCtr = true;
		    					EnvironsScreenBattleClass.handlers.resetCache();
		    					suburb.openSuburbUi(doGetUserFieldInfo);
		    					com_layer = 'environsScreen_Layer';
		    					com_group = group_src = 'environsScreen';
		     				}
		     		);
//					suburb.openSuburbUi(doGetUserFieldInfo);
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
						zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_sj_1").width) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - gbox.getImage("zjm_an_sj_1").width);
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
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop ;
				    if(((touchMoveX > this.poly[0][0]) && (touchMoveX < this.poly[1][0])) && ((touchMoveY > this.poly[0][1]) && (touchMoveY<this.poly[2][1])))
				    {
				    	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_an_sj_3',
							tile : 0,
							dx :zim_an_bjX + 8,
							dy :zim_an_bjY + 38,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   }); 
				    }
				    if(cityChangeView[1])
				    {
				    	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_35',
							tile : 0,
							dx :zim_an_bjX + 8,
							dy :zim_an_bjY + 38,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   }); 
				    }
				    gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_36',
							tile : 0,
							dx :zim_an_bjX + 17,
							dy :zim_an_bjY + 38,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   });
				}
			});
			gbox.addObject(
			{ 
				id : 'worldButton',
				group : 'levelMenu_1',
			    tileset : 'zjm_an_sj_1',
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
						zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_sj_1").width) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - gbox.getImage("zjm_an_sj_1").width);
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
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop ;
				    //var tempZjm_an_sj_3 = zim_an_bjY + gbox.getImage("zjm_an_sj_1").height/2;
				     this.poly = [[zim_an_bjX ,zim_an_bjY + 64],[zim_an_bjX + gbox.getImage("zjm_an_sj_3").width,zim_an_bjY + 64],[zim_an_bjX + gbox.getImage("zjm_an_sj_3").width,zim_an_bjY + 90],[zim_an_bjX,zim_an_bjY + 90]];					     
					
				},
				myclick : function()
				{
					loadingImageList['World'].load(
			        			getClickObjectIndex(),
			        			WorldLoadImage,
			            		function(){
			    					displayDestroy();
			    					envBtnCtr = false;
			    					suburb.closeSuburbUi(docloseSuburbUi);
			    					if(divBg != null)
			    					{
			    						input1.style.display=""; 
			    						input2.style.display=""; 
			    					}
			                        queryUnionAlertCtr = false;
			    					socialMessageAlertCtr = false;
			    					friendListCtr = false;
			    					socialDraw = false;
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
						zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_sj_1").width) + document.body.scrollLeft ;
					}
					else
					{
						zim_an_bjX = (1440 - gbox.getImage("zjm_an_sj_1").width);
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
				    var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_sj_1").height - offsetHeigth +  document.body.scrollTop ;
				    if(((touchMoveX > this.poly[0][0]) && (touchMoveX < this.poly[1][0])) && ((touchMoveY > this.poly[0][1]) && (touchMoveY<this.poly[2][1])))
				    {
				    	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_an_sj_3',
							tile : 0,
							dx :zim_an_bjX + 8,
							dy :zim_an_bjY + 66,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   }); 
				    }
				    if(cityChangeView[2])
				    {
				    	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_35',
							tile : 0,
							dx :zim_an_bjX + 8,
							dy :zim_an_bjY + 66,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   }); 
				    }
				      gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'zjm_39',
							tile : 0,
							dx :zim_an_bjX + 17,
							dy :zim_an_bjY + 66,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					   });			   
				}
			});
};

var isJiasu = false;
var jiasuPop = function(index,title,_remainedTime,_ticket,_money,_item,_group,_layer){
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJiasu = true;
	var bW = gbox.getImage('mj_zjm_05').width;
	var bH = gbox.getImage('mj_zjm_05').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var upX = 0;
	var upY = 0;
		gbox.addObject(
			{ 
				id : 'jiasuPop',
				group : 'levelMenu_5',
				tileset : 'mj_zjm_05',
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
                    var btnX = backdropX + 20;
				    var btnY = backdropY + bH - 32;
                    var btnX1 = backdropX + bW - 102;
				    var btnY1 = backdropY + bH - 32;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + 25))))
			        {
						isDrawUI[index] = false;
						isJiasu = false;
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    curGroup = 'cityMenu';
						var itemNo = 0;
						if(typeof(_item[upPeopleIndex]) != 'undefined')
							itemNo = _item[upPeopleIndex].itemNo;
						switch(title)
						{
						case '行军加速':
							var searchType = 0;
							
							for(var i=0; i<jqSelectArray.length; i++)
							{
								if(jqSelectArray[i]){
									searchType = i;
								}
							}
							battle.speedUpBattleQueue(junqingInfo[publi_junqingID].battleJobQueueId,junqingPage,searchType,speedType,0,1,doSpeedUpBattleQueue);
					        console.log("行军加速！！");
							break;
						case '训练士兵':
							BuildingFunction.speedTrain(techSoldier[jyPassIconIndex].soldierNo,speedType,0,1,doSpeedTrain);
							console.log("训练加速！！");
							break;
						case '科技研究':
							tech.speedTech(speedType,0,1,doTech);
							console.log("科技加速！！");
							break;
						case '建筑加速':
							Building.speedBuild(buildSpeedUp_Location,speedType,itemNo,1,doSpeedBuild);
							console.log("建筑加速！！");
							break;
						case '城防工事建设':
							BuildingFunction.speedWallDefense(speedType,itemNo,1,doSpeedWallDefense);
							console.log("城防加速！！");
							break;
						}
						buildSpeedupRefresh(index,title);
			            console.log("确定加速");
			        }else
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + 25))))
			        {
						isDrawUI[index] = false;
						isJiasu = false;
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    curGroup = 'cityMenu';
					    buildSpeedupRefresh(index,title);
						console.log("取消");    
						
			        }else{
			        	
						if(((570 < lastTouchMoveX) && (lastTouchMoveX < (570 + 23))) && ((352 < lastTouchMoveY) && (lastTouchMoveY < (352 + 23))))
				        {
							speedType = 1;
							isDianjuan = true;
							isJinding = false;
				            console.log("点卷");
				        }
						if(((726 < lastTouchMoveX) && (lastTouchMoveX < (726 + 23))) && ((352 < lastTouchMoveY) && (lastTouchMoveY < (352 + 23))))
				        {
							speedType = 2;
							isDianjuan = false;
							isJinding = true;
				            console.log("金锭");
				        }

						 if(typeof(_item) != 'undefined')
						 {
							 for(var i=0; i<_item.length; i++)
							 {
								 var tmpX = 580 + (i*62);
								 var tmpY = 410;
								 if(((tmpX < lastTouchMoveX) && (lastTouchMoveX < (tmpX + 30))) && ((tmpY < lastTouchMoveY) && (lastTouchMoveY < (tmpY + 30))))
							     {
									 upPeopleIndex = i;
									 speedType = 3;
									 isDianjuan = false;
									 isJinding = false;
							     }
							 }
						 }
			        	
						buildSpeedupRefresh(index,title);
			        	jiasuPop(getClickObjectIndex(),title,_remainedTime,_ticket,_money,_item,_group,_layer);
						changeMap(_layer);
			        }
					
				},
				blit : function()
				{
					 if(isDrawUI[index] && isJiasu)
					 {
						 var mfindex = 0;
						 gbox.drawImage('mj_zjm_05',backdropX,backdropY);
						 var strW = gbox.getTextWidth(title,16);
						 var titleX = backdropX + (bW - strW)/2;
						 gbox.drawDanceString(title, titleX, backdropY + 2,16,'#000000','#FFC861');
						 var strW1 = gbox.getTextWidth("立即到达",10);
						 var t1X = 560 + (150 - strW1)/2;
						 var t1Y = 327;
						 gbox.drawDanceString("立即到达", t1X, t1Y,10,'#000000','#FFC861');	
						 var strW2 = gbox.getTextWidth("道具加速",10);
						 var t2X = 560 + (105 - strW2)/2;
						 var t2Y = 388;
						 gbox.drawDanceString("道具加速", t2X, t2Y,10,'#000000','#FFC861');
						 
						 var fontW = gbox.getTextWidth("剩余时间：" + changeTimeformat(_remainedTime),14);
						 var dx = backdropX + (bW - fontW)/2;
						 var dy = 255 + (65 - 14)/2;
						 gbox.drawDanceString("剩余时间：" + changeTimeformat(_remainedTime), dx, dy,14,'#000000','#FFFFFF');
						 
						 if(isDianjuan)
							 gbox.drawImage('ty_an_12',570,352);
						 
						 if(isJinding)
							 gbox.drawImage('ty_an_12',726,352);
						 
						 var strW = gbox.getTextWidth(_money,10);
						 var ticketX = 654 + (55 - strW)/2;
						 gbox.drawDanceString(_ticket, ticketX, 357,10,'#000000','#FFFFFF');
						 
						 var strW = gbox.getTextWidth(_money,10);
						 var moneyX = 816 + (55 - strW)/2;
						 gbox.drawDanceString(_money, moneyX, 357,10,'#000000','#FFFFFF');
						 
						    var fontW = gbox.getTextWidth("加速",14);
                            var btnX = backdropX + 20;
						    var btnY = backdropY + bH - 32;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);
					        }	
							gbox.drawDanceString("加速", backX, backY,14,'#000000','#FFFFFF');
							
                            var btnX1 = backdropX + bW - 102;
						    var btnY1 = backdropY + bH - 32;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2;
							var backY = btnY1 + (25 - 14)/2;
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);       
					        }	
							gbox.drawDanceString("取消", backX, backY,14,'#000000','#FFFFFF');
							 if(typeof(_item) != 'undefined')
							 {
								 for(var i=0; i<_item.length; i++)
								 {
									 upX = 581 + (i*62);
									 upY = 412;
									 gbox.drawImage(_item[i].icon,upX,upY);
									 
									 if(!isDianjuan && !isJinding)
									 {
										 var rW = gbox.getImage(_item[upPeopleIndex].icon).width;
										 var rH = gbox.getImage(_item[upPeopleIndex].icon).height;
										 gbox.strokeRect(gbox.getBufferContext(),{x:(581 + (upPeopleIndex*62)),y:upY,w:rW,h:rH,
								         globalAlpha:1,color:'#FFC861'});
									 }
									 
									 if(((upX < touchMoveX) && (touchMoveX < (upX + 30))) && ((upY < touchMoveY) && (touchMoveY < (upY + 30))))
								     {
										 mfindex = i;
								     }
									 
									 if(typeof(_item[mfindex]) != 'undefined')
									 {
										 var dX = 581 + (mfindex*62);
										 var dY = 411;
										 if(((dX < touchMoveX) && (touchMoveX < (dX + 30))) && ((dY < touchMoveY) && (touchMoveY < (dY + 30))))
									     {
											var tempOffset = 15;
											var tempH = tooltip.computMaterial(gbox.getBufferContext(),_item[mfindex].toolTipInfo).height;
											if((gbox.getScreenH() - touchMoveY) < tempH)	
											{
												mouseY = gbox.getScreenH() - tempH - 20;
											}
											else
											{
												mouseY = touchMoveY;
											}
											if(touchMoveX !=0)
												tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,mouseY + tempOffset,_item[mfindex].toolTipInfo); 
									      }
									 }

								 }
							 }
						 

					 }						
				}
			});
};

//建筑加速升级
function doSpeedBuild(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
//	state = undefined;
//	state = data.state;
//    if(typeof(state) != 'undefined')
//    {
//    	BuildingFunction.initHouse(doInitHouse);
//    	return;
//    }
	
	var ticket = data.ticket;
	var money = data.money;
	var RemainTime = data.RemainTime;
	var item = new Array()
    if(typeof(data.item) != 'undefined')
	for(var i=0; i< data.item.length; i++)
	{
		var tmp = data.item[i];
		item[i] = {
				icon:tmp.icon,
				isEnough:tmp.isEnough,
				itemNo:tmp.itemNo,
				name:tmp.name,
				toolTipInfo:{
						description:tmp.tooltip.description,
						isBop:tmp.tooltip.isBop,
						itemName:tmp.tooltip.itemName,
				}
		};
	}
	if(typeof(data.state) != "undefined")
	{
	    clearInterval(timeInterval[data.location]);
        upgrade_time[data.location] = "加载中！";
	    upgrade_cnt[data.location] = 0;

		Building.getBuilding(data.location,doBuilding);
	}else
	{
		speedType = 1;
		isJinding = false;
		isDianjuan = true;
		jiasuPop(getClickObjectIndex(),"建筑加速",RemainTime*1000,money,money,item,com_group,com_layer);
		changeMap(com_layer);
	}
}
//训练士兵加速
function doSpeedTrain(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
//	state = undefined;
//	state = data.state;
//    if(typeof(state) != 'undefined')
//    {
//    	BuildingFunction.initHouse(doInitHouse);
//    	return;
//    }
	
	var ticket = data.ticket;
	var money = data.money;
	var RemainTime = data.RemainTime;
	var item = new Array()
    if(typeof(data.item) != 'undefined')
	for(var i=0; i< data.item.length; i++)
	{
		var tmp = data.item[i];
		item[i] = {
				icon:tmp.icon,
				isEnough:tmp.isEnough,
				itemNo:tmp.itemNo,
				name:tmp.name,
				toolTipInfo:{
						description:tmp.tooltip.description,
						isBop:tmp.tooltip.isBop,
						itemName:tmp.tooltip.itemName,
				}
		};
	}
	if(typeof(data.state) != "undefined")
	{
		if(jyTimeInterval != null){
			clearInterval(jyTimeInterval);
			jyCnt = 0;
			jyTimeInterval = null;
			jyRemainTime =  "等待刷新！";
		}
		BuildingFunction.initBarracks(doInitBarracks);
	}else
	{
		speedType = 1;
		isJinding = false;
		isDianjuan = true;
		jiasuPop(getClickObjectIndex(),"训练士兵",RemainTime*1000,money,money,item,com_group,com_layer);
		changeMap(com_layer);
	}
}

//城防建设加速
function doSpeedWallDefense(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
//	state = undefined;
//	state = data.state;
//    if(typeof(state) != 'undefined')
//    {
//    	BuildingFunction.initHouse(doInitHouse);
//    	return;
//    }
	
	var ticket = data.ticket;
	var money = data.money;
	var item = new Array()
	if(typeof(data.item) != 'undefined')
	for(var i=0; i< data.item.length; i++)
	{
		var tmp = data.item[i];
		item[i] = {
				icon:tmp.icon,
				isEnough:tmp.isEnough,
				itemNo:tmp.itemNo,
				name:tmp.name,
				toolTipInfo:{
						description:tmp.tooltip.description,
						isBop:tmp.tooltip.isBop,
						itemName:tmp.tooltip.itemName,
				}
		};
	}
	if(typeof(data.state) != "undefined")
	{
		if(gfTimeInterval != null){
			clearInterval(gfTimeInterval);
			gfCnt = 0;
			gfTimeInterval = null;
			gfRemainTime =  "等待刷新！";
		}
		BuildingFunction.getAllWallDefensen(doDefenceworks);
	}else
	{
		speedType = 1;
		isJinding = false;
		isDianjuan = true;
		jiasuPop(getClickObjectIndex(),"城防工事建设",5000,money,money,item,com_group,com_layer);
		changeMap(com_layer);
	}
}

//行军加速
function doSpeedUpBattleQueue(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	var ticket = data.ticket;
	var money = data.money;
	var item = new Array();
	if(typeof(data.item) != 'undefined')
	for(var i=0; i< data.item.length; i++)
	{
		var tmp = data.item[i];
		item[i] = {
				icon:tmp.icon,
				isEnough:tmp.isEnough,
				itemNo:tmp.itemNo,
				name:tmp.name,
				toolTipInfo:{
						description:tmp.tooltip.description,
						isBop:tmp.tooltip.isBop,
						itemName:tmp.tooltip.itemName,
				}
		};
	}
	
	if(typeof(data.state) != "undefined")
	{
		clearInterval(timeIntervalArray[publi_junqingID]);
		junqingInfo[publi_junqingID].remainTime = 0;
		battleQueueTimerStr[publi_junqingID] = "等待刷新";
		timeIntervalArray[publi_junqingID] = -1;
		initDataTime[publi_junqingID] = -1;
        battleQueueCnt[publi_junqingID] = -1;
		var searchType = 0;
		
		for(var i=0; i<jqSelectArray.length; i++)
		{
			if(jqSelectArray[i]){
				searchType = i;
			}
		}
        
        battle.selectBattleQueue(junqingPage,searchType,doSelectBattleQueue);
	}else
	{
		speedType = 1;
		isJinding = false;
		isDianjuan = true;
		jiasuPop(getClickObjectIndex(),"行军加速",5000,money,money,item,com_group,com_layer);
		changeMap(com_layer);
	}
}
//研究科技加速
function doTech(data){
//	if(typeof(data.error) != "undefined"){
//		alert("系统提示：" + data.error);
//		return;
//	}
	
	var ticket = data.ticket;
	var money = data.money;
	var item = new Array()
	if(typeof(data.item) != 'undefined')
	for(var i=0; i< data.item.length; i++)
	{
		var tmp = data.item[i];
		item[i] = {
				icon:tmp.icon,
				isEnough:tmp.isEnough,
				itemNo:tmp.itemNo,
				name:tmp.name,
				toolTipInfo:{
						description:tmp.tooltip.description,
						isBop:tmp.tooltip.isBop,
						itemName:tmp.tooltip.itemName,
				}
		};
	}
	if(typeof(data.state) != "undefined")
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
	}else
	{
		speedType = 1;
		isJinding = false;
		isDianjuan = true;
		jiasuPop(getClickObjectIndex(),"科技研究",5000,money,money,item,com_group,com_layer);
		changeMap(com_layer);
	}
}
function backResultUI(index){
	if(isJiaofang){
		initCollege(doInitCollege);
	}
	else    	
	if(isJiaofang){
		jiaofang(getClickObjectIndex());
		jiaofangSkillList(getClickObjectIndex());
		jiaofangList(getClickObjectIndex());
		changeMap('cityMenuLayer');
	}
	else
	if(isTaiyishu){
		taiyishu(getClickObjectIndex());
		changeMap('cityMenuLayer');	
	}
	else
	if(isFenghuotai){
		fenghuotai(getClickObjectIndex());
		changeMap('cityMenuLayer');	
	}
	else
	if(isMinju){
		minju(getClickObjectIndex());
		changeMap('cityMenuLayer');	
	}
	else
	if(isJunying){
		isJinjie = false;
		isQiansan = false;
		isZM = false;
		junying(getClickObjectIndex());
		junyyingList(getClickObjectIndex());
		changeMap('cityMenuLayer');	
	}
	else
	if(isJunjichu){
    	comboboxes['Affairs'].isCreated = false;
    	isJunjichuList = true;
		junjichu(getClickObjectIndex());
		changeMap('cityMenuLayer');
	}
	else
	if(isChengQiang){
        isDefenceWorks = true;
        isSelectArray[0] = true;
        isSelectArray[1] = false;
        chengQiang(getClickObjectIndex());
		changeMap('cityMenuLayer');	
	}
	else
	if(isKejiaoguan){
		kejiaoguan(getClickObjectIndex());	
        kejiaoguanList(getClickObjectIndex());				
		changeMap('cityMenuLayer');	
	}
	else
	if(isWaiwuguan){
		waiwuguan(getClickObjectIndex());

		if(selectWorM[0])
		{

			switch(unionIndex){
			case 0://信息
				if(isUnion)
				{
					unionCreat(getClickObjectIndex());
				}else
				    unionInfo(getClickObjectIndex());
				break;
			case 1://成员
				    unionMember(getClickObjectIndex());
				break;
			case 2://福利
				unionWeal(getClickObjectIndex());
				break;
			case 3://科技
				unionSkill(getClickObjectIndex());
				break;
			case 4://兵营
				pageFlagIndex = 0;
				unionCasern(getClickObjectIndex());
				break;
			case 5://活动
				
				break;
			case 6://市场
				unionMarket(getClickObjectIndex());
				break;
			}
			
		}
		changeMap('cityMenuLayer');	
	}
	else
		flashGameLayer();
}

function buildDemolition(index){
  	console.log("________________拆除");
  	if(build_Level[index] <= 1){
	  	switch(index){
	  		case 1://城墙
	  		   alert("城墙等级1不能拆除！");
	  		return;
	  		case 27://太尉府
	  		   alert("太尉府等级1不能拆除！");
	  		return;
	  	}
    }	
  	demolition_cnt[index] = 0;
  	clearInterval(timeInterval[index]);
  	buildArray[index].demolition("" + index,true);//网络_拆除
  	buildList[index][13] = 'state_demolition_start';
}

function buildUpgrade(index){
  	if((buildList[index][0] == 'build_end' || buildList[index][0] == 'build_src') && 
	  	    buildList[index][1] == 'state_empty'){
	  		console.log("________________升级");
	  		upgrade_cnt[index] = 0;
	  		clearInterval(timeInterval[index]);
	  		buildArray[index].upgrade("" + index,true);//网络_升级
	  		buildList[index][1] = 'state_upgrade_start';
	  	}
}

function buildCancel(index){
  	//取消
	switch(buildArray[index].level_type[index]){
		case 0://建造
		    build_cnt[index] = 0;
		    build_time[index] = "加载...";
			buildList[index][0] = 'build_empty';
			clearInterval(timeInterval[index]);
		    enterCityMenu(this.group);
            changeMap('cityMenuLayer');	
		console.log("aaaaa取消建造成功！");
		break;
		case 1://升级
		    upgrade_cnt[index] = 0;
		    upgrade_time[index] = "加载...";
			buildList[index][1] = 'state_empty';
			clearInterval(timeInterval[index]);	
		    enterCityMenu(this.group);
            changeMap('cityMenuLayer');
		console.log("bbbbb取消升级成功！");
		break;	
		case 2://拆除
			demolition_cnt[index] = 0;
		    demolition_time[index] = "加载...";
			buildList[index][13] = 'state_demolition_empty';
			clearInterval(timeInterval[index]);
		    enterCityMenu(this.group);
            changeMap('cityMenuLayer');
		console.log("ccccc取消拆除成功！");
		break;												
	}	
  	console.log("________________取消");
  	buildArray[index].cancel(index);//网络_取消
}

//建筑加速确认
var buildSpeedUp_Location = 2;
function systemSpeedup(index,title){
	switch(title)
	{
	case '行军加速':
		
		var searchType = 0;
		
		for(var i=0; i<jqSelectArray.length; i++)
		{
			if(jqSelectArray[i]){
				searchType = i;
			}
		}
		
		battle.speedUpBattleQueue(junqingInfo[publi_junqingID].battleJobQueueId,junqingPage,searchType,speedType,0,0,doSpeedUpBattleQueue);
        console.log("行军加速！！");
		break;
	case '训练士兵':
		BuildingFunction.speedTrain(techSoldier[jyPassIconIndex].soldierNo,speedType,0,0,doSpeedTrain);
		console.log("训练加速！！");
		break;
	case '科技研究':
		tech.speedTech(speedType,0,0,doTech);
		console.log("科技加速！！");
		break;
	case '建筑加速':
		buildSpeedUp_Location = index;
		Building.speedBuild(buildSpeedUp_Location,speedType,0,0,doSpeedBuild);
		console.log("建筑加速！！");
		break;
	case '城防工事建设':
		BuildingFunction.speedWallDefense(speedType,0,0,doSpeedWallDefense);
		console.log("城防加速！！");
		break;
	}
	console.log("________________加速");
}

//建筑刷新返回
function buildSpeedupRefresh(index,title){
	switch(title)
	{
	case '行军加速':
		junqing(getClickObjectIndex(),com_group,com_layer);
		changeMap(com_layer);
		break;
	case '训练士兵':
		junying(getClickObjectIndex());
		junyyingList(getClickObjectIndex());
		changeMap('cityMenuLayer');	
		break;
	case '科技研究':
		kejiaoguan(index);	
        kejiaoguanList(index);				
		changeMap('cityMenuLayer');	
		break;
	case '建筑加速':
		backResultUI(index);
		break;
	case '城防工事建设':
		chengQiang(getClickObjectIndex());
	    changeMap('cityMenuLayer');
		break;
	}
}

function buildEnter(index){
    console.log("________________进入");
    switch(buildName[index]){
    case '太尉府':
     	taiweifu();
		changeMap('taiweifuScreen_Layer');	
     	break;
 	 case '加工坊':
 		loadingImageList['ProcessingSquareAvatar'].load(
    			getClickObjectIndex(),
    			ProcessingSquareAvatarLoadImage,
        		function(){
    			 	   jiaGongfang();
    			  	  changeMap('jiagongfangScreen_Layer');
        		}
    	);

 	   break;
 	case '集市':
 		loadingImageList['mmarket'].load(
    			getClickObjectIndex(),
    			mmarketLoadImage,
        		function(){
    			 	   jishiMenu();
    			       changeMap('jishiScreen_Layer');
        		}
    	);

 	   break;
 	case '酒馆':
 		loadingImageList['tavern'].load(
    			getClickObjectIndex(),
    			tavernLoadImage,
        		function(){
    				   jiuguan();
    				   changeMap('jiuguanScreen_Layer');
        		}
    	);
	
 	   break;
    	case '练兵场':
    	  //打开前清除武将出征页面缓存数据
    		loadingImageList['Maidan'].load(
        			getClickObjectIndex(),
        			MaidanLoadImage,
            		function(){
        		    	  warpthMenuClass.handlers.clearCache();
        		    	  warpthMenuClass.flag.isDrawWarpthMenu = true;
        		    	  warpthMenu(getClickObjectIndex(),'cityMenuLayer','cityMenu');
        		    	  warpthMenuClass.draw.changeMap();
            		}
        	);

          break;
    	case '教坊':
    		loadingImageList['jiaofang'].load(
        			getClickObjectIndex(),
        			jiaofangLoadImage,
            		function(){
        				initCollege(doInitCollege);
            		}
        	);
    		
    		break;
    	case '聚贤阁':
    		loadingImageList['connoisseur'].load(
        			getClickObjectIndex(),
        			connoisseurLoadImage,
            		function(){
        				BuildingFunction.initCentrestage(doInitCentrestage);
            		}
        	);
    		break;
    	case '太医署':
    		loadingImageList['Imperial_Department'].load(
    			getClickObjectIndex(),
        		Imperial_DepartmentLoadImage,
        		function(){
        			if(typeof(tyslist) != "undefined"){
        	     		tyslist.mouseUpIndex = -1;
        	     	}
        	    	BuildingFunction.initHospital(doInitHospital);
        		}
    		);
            break;
    	case '地窖':
    		loadingImageList['Cellar'].load(
        			getClickObjectIndex(),
        			celllarLoadImage,
            		function(){
        				BuildingFunction.initCellar(doInitCellar);
            		}
        	);
           break;	
    	case '民居':
    		loadingImageList['Houses'].load(
        			getClickObjectIndex(),
        			housesLoadImage,
            		function(){
        				BuildingFunction.initHouse(doInitHouse);
            		}
        		);
           break;
    	case '兵营':
    		console.log('进入兵营！！！');
    		loadingImageList['Barrack'].load(
    				getClickObjectIndex(),
    				barrackLoadImage,
     				function(){
    		    		isJunying = true;
    		    		BuildingFunction.initBarracks(doInitBarracks);
     				}
     		);
    		break;
    	case '军机处':
    		console.log('进入军机处！！！');
    		loadingImageList['Military_office'].load(
    				getClickObjectIndex(),
    				Military_officeLoadImage,
     				function(){
    		     		if(typeof(jjclist) != "undefined"){
    		     			jjclist._passCnt = 0;
    		     			jjclist._passIndex = new Array();
    		     			jjclist.rectSelected = new Array();
    		     		}
    		    		BuildingFunction.initPrivycouncil(doInitPrivycouncil);
     				}
     		);
    		break;
    	case '国库':
    		loadingImageList['exchequer'].load(
        			getClickObjectIndex(),
        			exchequerLoadImage,
            		function(){
        				for(var a= 0; a<5; a++ )
        					bottonCtr[a] = false;
        	    		BuildingFunction.getAllArticles(doAllArticles);
            		}
        	);

    		break;
      case '城墙':
    	  loadingImageList['City_wall'].load(
    			getClickObjectIndex(),
    			function(){
    				City_wallLoadImage();
    				MaidanLoadImage();
    			},
        		function(){
    		    	   isChengqiang = true;
    		           isDefenceWorks = true;
    		           isSelectArray[0] = true;
    		           isSelectArray[1] = false;
    		           chengQiang(getClickObjectIndex());
    					changeMap('cityMenuLayer');	
        		}
    	   );

    		break;  
      case '科教馆':	
    	  loadingImageList['scienceEc'].load(
      			getClickObjectIndex(),
      			scienceEcLoadImage,
          		function(){
      				tech.getUserInteriorForView(dataGetUserInteriorForView);	
          		}
      	   );
				     
			break;		
      case '外务馆':
    	  loadingImageList['foreignMuseum'].load(
        			getClickObjectIndex(),
        			foreignMuseumLoadImage,
            		function(){
        		     	  selectWorM[0] = true;
        		    	  selectWorM[1] = false;
        		     	  Alliance.initCharacterAlliance(dataGetAlliance);	
            		}
          );

    	  break;
    }
}

function commandBuildBtn(lotIndex,title)
{
    if(((1006 < lastTouchMoveX) && (lastTouchMoveX < 1090)) && ((233 < lastTouchMoveY) && (lastTouchMoveY < 258))){
			if(buildList[lotIndex][1] == 'state_empty' && 
				buildList[lotIndex][13] == 'state_demolition_empty'){
				//升级
				buildUpgrade(lotIndex);
			}else
			if(buildList[lotIndex][1] == 'state_upgrade_start' ||
				buildList[lotIndex][13] == 'state_demolition_start'){
				//取消
				buildCancel(lotIndex);
			}
		}else if(((1006 < lastTouchMoveX) && (lastTouchMoveX < 1090)) && ((197 < lastTouchMoveY) && (lastTouchMoveY < 223))){
			if(buildList[lotIndex][1] == 'state_empty' && 
				buildList[lotIndex][13] == 'state_demolition_empty'){
				//拆除
				buildDemolition(lotIndex);
			}else
			if(buildList[lotIndex][1] == 'state_upgrade_start' ||
				buildList[lotIndex][13] == 'state_demolition_start'){
				//加速
				systemSpeedup(lotIndex,title);
				
			}
       }
//    flashGameLayer();	
}

var drawBuildCommandBtn = function(){
	var tmp1Img = '拆  除';
	var tmp2Img = '升  级';
	if(buildList[lotIndex][1] == 'state_empty' && 
			buildList[lotIndex][13] == 'state_demolition_empty'){
		    tmp1Img = '拆  除';
		    tmp2Img = '升  级';
	}else
	if(buildList[lotIndex][1] == 'state_upgrade_start' ||
			buildList[lotIndex][13] == 'state_demolition_start'){
		    tmp1Img = '加  速';
		    tmp2Img = '取  消';
	}
 	
	gbox.drawImage('ty_an_10',1006,194);
    if(((1006 < touchMoveX) && (touchMoveX < 1090)) && ((197 < touchMoveY) && (touchMoveY < 223)))
    {
        gbox.drawImage('ty_an_09',1006,194);		               
    }					 	
    
    gbox.drawImage('ty_an_10',1006,230);
 	if(((1006 < touchMoveX) && (touchMoveX < 1090)) && ((233 < touchMoveY) && (touchMoveY < 258)))
    {
       gbox.drawImage('ty_an_09',1006,230);	               
    }
 	
    var fontW = gbox.getTextWidth(tmp1Img,14);
    var btnX = 1005;
    var btnY = 195;
    var backX = btnX + (82 - fontW)/2;
	var backY = btnY + (25 - 14)/2;
// 	gbox.drawDanceString(tmp1Img, backX, backY,14,'#000000','#FFFFFF');
 	gbox.drawText(tmp1Img, backX, backY,10);
    var btnX = 1005;
    var btnY = 231;
    var backX = btnX + (82 - fontW)/2;
	var backY = btnY + (25 - 14)/2;
// 	gbox.drawDanceString(tmp2Img, backX, backY,14,'#000000','#FFFFFF');
 	gbox.drawText(tmp2Img, backX, backY,10);
}