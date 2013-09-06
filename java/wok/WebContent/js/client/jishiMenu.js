var jishiItemCtr = true;//控制集市内部场景弹出框
//var auctionDivName = new Array();
var sellParamArray = new Array();
var ownResource = 0;
var marketTitle = new Array();
marketTitle[0] = {id:0,txt:"粮食"};
marketTitle[1] = {id:1,txt:"木材"};
marketTitle[2] = {id:2,txt:"石材"};
marketTitle[3] = {id:3,txt:"铁矿"};
var marketdata0 = new Array();
marketdata0[0] = {
	id : 1,
	name: "木材",
};
marketdata0[1] = {
	id : 2,
	name: "石材",
};
marketdata0[2] = {
	id : 3,
	name: "铁矿",
};
var marketdata1 = new Array();
marketdata1[0] = {
	id : 0,
	name: "粮食",
};
marketdata1[1] = {
	id : 2,
	name: "石材",
};
marketdata1[2] = {
	id : 3,
	name: "铁矿",
};
var marketdata2 = new Array();
marketdata2[0] = {
	id : 0,
	name: "粮食",
};
marketdata2[1] = {
	id : 1,
	name: "木材",
};
marketdata2[2] = {
	id : 3,
	name: "铁矿",
};
var marketdata3 = new Array();
marketdata3[0] = {
	id : 0,
	name: "粮食",
};
marketdata3[1] = {
	id : 1,
	name: "木材",
};
marketdata3[2] = {
	id : 2,
	name: "石材",
};
var exchangeLimit = 0;
var resourceFactor;
var resourceValue = new Array();
function doGetUserMarket(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	for(var i = 0; i<data.sellParam.length; i++)
	{
		sellParamArray[i] = data.sellParam[i];
	}
	exchangeLimit = data.exchangeLimit;		
	resourceFactor = data.exchangeParam.resourceFactor;
	for(var i = 0; i<data.exchangeParam.resourceValue.length; i++)
	{
		resourceValue[i] = data.exchangeParam.resourceValue[i];
	}
	
}
var jishiMenu = function()//绘制集市
{
	gbox.setRenderOrder(['jishiScreen']);
//	gbox.setRenderOrder(['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
//    isDrawUI[index] = true;
	com_layer = 'jishiScreen_Layer';
	com_group = group_src = 'jishiScreen';
    gbox.addObject(
			{ 
				id : 'jishiMenuBg',
				group : 'jishiScreen',
				tileset : 'js_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [0,0], [1440,0], [1440,742],[0,742]],
				initialize : function()
				{
                         
				},
				first : function() 
				{	
	
				},
				myclick : function()
				{
					jishiItemCtr = false;	
					marketCtr = false;
					isPmhList = false;
					isPopupBuild = false;
					if(marketDivName[0] != null && gbox._isIndwellDiv("marketDiv1","input"))
						{
							  document.body.removeChild(marketDivName[0]);  
							  marketDivName[0] = null;
						}
						if(marketDivName[1] != null && gbox._isIndwellDiv("marketDiv2","input"))
						{
							document.body.removeChild(marketDivName[1]);  
							marketDivName[1] = null;
						}
						if(marketDivName[2] != null && gbox._isIndwellDiv("marketDiv3","input"))
						{
							document.body.removeChild(marketDivName[2]);  
							marketDivName[2] = null;
						}
						if(marketDivName[3] != null && gbox._isIndwellDiv("marketDiv4","input"))
						{
							document.body.removeChild(marketDivName[3]);  
							marketDivName[3] = null;
						}			
					if(gbox._isIndwellDiv("browseNameDiv","input"))
						{
							  document.body.removeChild(browseNameDiv);  
							  browseNameDiv = null;
						} 
				    if(gbox._isIndwellDiv("browseLevelDiv","input"))
						{
							  document.body.removeChild(browseLevelDiv);  
							  browseLevelDiv = null;
						} 
					if(gbox._isIndwellDiv("browseLevelDiv_2","input"))
						{
							  document.body.removeChild(browseLevelDiv_2);  
							  browseLevelDiv_2 = null;
						} 
					if(marketDivName[4] != null && gbox._isIndwellDiv("marketDiv5","input"))
						{
							document.body.removeChild(marketDivName[4]);  
							marketDivName[4] = null;
						}
				   	if(auctionDivName[6] != null && gbox._isIndwellDiv("diplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[6]);  
							  auctionDivName[6] = null;
						}
					if(auctionDivName[5] != null && gbox._isIndwellDiv("jingdiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[5]);  
							  auctionDivName[5] = null;
						}
					if(gbox._isIndwellDiv("auctionGoldDiv1","input"))
							{
								  document.body.removeChild(auctionDivName[0]);  
								  auctionDivName[0] = null;
							}
					if(gbox._isIndwellDiv("auctionGoldDiv2","input"))
							{
								  document.body.removeChild(auctionDivName[1]);  
								  auctionDivName[1] = null;
							}
					if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
					            document.body.removeChild(propAuctionNumbg);  
					            propAuctionNumbg = null;  				            
					}										
					if(gbox._isIndwellDiv("paidiplayPageNumDiv","input"))
					{
								  document.body.removeChild(auctionDivName[4]);  
								  auctionDivName[4] = null;
					}
	
				   	
					if(((lastTouchMoveX > 585) && (lastTouchMoveX < 650)) && ((lastTouchMoveY > 283) && (lastTouchMoveY<398)))
					{
						//创建下拉框数据
						comboboxes = {};
					    var comboboxMarket = new Combobox();
					    comboboxMarket.setData(marketTitle,'id','txt',true);
					    comboboxes['market'] = comboboxMarket;
					    
					    var comboboxMarket2 = new Combobox();
					    comboboxMarket2.setData(marketdata0,'id','name',true);
					    comboboxes['market2'] = comboboxMarket2;
					    
					    limtCtr = onlyFood < exchangeLimit? onlyFood:exchangeLimit;
						BuildingFunction.getUserMarket(doGetUserMarket);
						marketBuild(getClickObjectIndex());
						changeMap('jishiScreen_Layer');	
					} 
					if(((lastTouchMoveX > 903) && (lastTouchMoveX < 1011)) && ((lastTouchMoveY > 247) && (lastTouchMoveY<378)))
					{
						  		isPopupBuild = false;
								isShowGuokuList = false;
						  	    browseDisplay = true;
					            auctionDisplay = false;
					            jingpaiDisplay = false;
						  	    jishiItemCtr = false;
						  	    dataRef = true;
						  	    deleteArray();
						  	    for(var i = 0 ;i<4; i++)
						  	       browseButtonCtr[i] = false;
						  	    browseButtonCtr[0] = true;
								browseBuild(getClickObjectIndex());
								jishiList(getClickObjectIndex());
					            changeMap('jishiScreen_Layer');	
					} 
		            if(((1032 < lastTouchMoveX) && (lastTouchMoveX < 1440)) && ((10 < lastTouchMoveY) && (lastTouchMoveY < 58)))
		            {
						if(buildList[lotIndex][1] == 'state_empty' && 
						buildList[lotIndex][13] == 'state_demolition_empty'){
							//升级
							buildUpgrade(lotIndex);
							isJiuguan = false;
							isJunying = false;
							isWjZhaomu = false;
							isWarpthGarget = false;
//							displayDestroy();
//							exit(getClickObjectIndex());
//							enterCityMenu(curGroup);
//		                    changeMap('cityMenuLayer');	
		                    envBtnCtr = false;
		                    suburb.closeSuburbUi(docloseSuburbUi);
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
							queryUnionAlertCtr = false;
							friendListCtr = false;
							socialDraw = false;
							displayDestroy();
							exit(getClickObjectIndex());
							curGroup = 'cityMenu';
							envBtnCtr = false;
							//enterCityMenu('cityMenu');
							//changeMap('cityMenuLayer');	
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							com_layer = 'cityMenuLayer';
							com_group = group_src = 'cityMenu';
					    }else
					    	alert("状态异常：不能升级！");

		            }else
		            if(((1032 < lastTouchMoveX) && (lastTouchMoveX < (1440))) && ((67 < lastTouchMoveY) && (lastTouchMoveY < 108)))
		            {
						if(buildList[lotIndex][1] == 'state_empty' && 
						buildList[lotIndex][13] == 'state_demolition_empty'){
							//拆除
							buildDemolition(lotIndex);
							isJiuguan = false;
							isJunying = false;
							isWjZhaomu = false;
							isWarpthGarget = false;
//							displayDestroy();
//							exit(getClickObjectIndex());
//							enterCityMenu(curGroup);
//		                    changeMap('cityMenuLayer');	
		                    envBtnCtr = false;
		                    suburb.closeSuburbUi(docloseSuburbUi);
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
							queryUnionAlertCtr = false;
							friendListCtr = false;
							socialDraw = false;
							displayDestroy();
							exit(getClickObjectIndex());
							curGroup = 'cityMenu';
							envBtnCtr = false;
							//enterCityMenu('cityMenu');
							//changeMap('cityMenuLayer');	
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							com_layer = 'cityMenuLayer';
							com_group = group_src = 'cityMenu';
					    }else
					    	alert("状态异常：不能拆除！");	   

		            }else
		            if(((1032 < lastTouchMoveX) && (lastTouchMoveX < 1440)) && ((115 < lastTouchMoveY) && (lastTouchMoveY < 165)))
		            {
		            	//退出
		            	console.log("aaaaaaaaaaaaaaaaaaaaaaa");
	                    envBtnCtr = false;
	                    suburb.closeSuburbUi(docloseSuburbUi);
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
						queryUnionAlertCtr = false;
						friendListCtr = false;
						socialDraw = false;
						displayDestroy();
						exit(getClickObjectIndex());
						curGroup = 'cityMenu';
						envBtnCtr = false;
						//enterCityMenu('cityMenu');
						//changeMap('cityMenuLayer');	
						enterCityMenu('cityMenu');
						changeMap('cityMenuLayer');	
						com_layer = 'cityMenuLayer';
						com_group = group_src = 'cityMenu';
		            }
                    
				},
				blit : function()
				{        

					    gbox.drawImage('js_zjm_01',0,0);
					    gbox.drawImage('ty_an_32',shineiOffset + 6,0);						
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 14) && (touchMoveY<53)))
						{
							gbox.drawImage('ty_an_33',shineiOffset + 8,9);							
						}
						gbox.drawImage('ty_an_39',shineiOffset + 44,24);
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 66) && (touchMoveY<105)))
						{
							 gbox.drawImage('ty_an_33',shineiOffset + 8,61);	
						}
						gbox.drawImage('ty_an_40',shineiOffset + 44,77);						 
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 118) && (touchMoveY<163)))
						{
							gbox.drawImage('ty_an_34',shineiOffset + 5,116);							 
						}
						gbox.drawImage('ty_an_36',shineiOffset + 44,131);
						
//                    }       
				}
			});
	        gbox.addObject(
			{ 
				id : 'jishiMenuBg1',
				group : 'jishiScreen',
				tileset : 'js_zjm_01',
				x : 0,
				y : 0,
				anim : jsNpc1,
				action : null,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{
                    AnimMgr.changeAction(this, this.anim.action["jsNpc1Action"],true);
				},
				first : function() 
				{	
	
				},
				myclick : function()
				{
					                          
				},
				blit : function()
				{        
	                this.anim.image = "js_npc_1";
					var data = {
							tile : this.frame,
							dx : 573,
							dy : 368,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0,	
							anim : this.anim
					};
					AnimMgr.draw(gbox.getBufferContext(), data);//TODO
					this.frame = help.decideFrame(this.action);	
				}
			});
			gbox.addObject(
			{ 
				id : 'jishiMenuBg2',
				group : 'jishiScreen',
				tileset : 'js_zjm_01',
				x : 0,
				y : 0,
				anim : jsNpc2,
				action : null,
				frame : 0,
				poly : [ [0,0], [0,0], [0,0],[0,0]],
				initialize : function()
				{
                    AnimMgr.changeAction(this, this.anim.action["jsNpc2Action"],true);
				},
				first : function() 
				{	
	
				},
				myclick : function()
				{
					                          
				},
				blit : function()
				{        
	                this.anim.image = "js_npc_2";
					var data = {
							tile : this.frame,
							dx : 887,
							dy : 220,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0,	
							anim : this.anim
					};
					AnimMgr.draw(gbox.getBufferContext(), data);//TODO
					this.frame = help.decideFrame(this.action);	
				}
			});
	 //绘制公有按钮
	 drawCommonBtn('levelMenu_1','jishiScreen','jishiScreen_Layer');
}

