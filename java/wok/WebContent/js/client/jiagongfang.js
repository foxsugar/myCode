var pupItem = true;
var equBuild = true;
var gemstonesS = false;
var hechengDraw = false;
var gemstonesRef = true;
var _baoshiitem = new Array();
var _hechengProbability = new Array();
var _tempbaoshiitem = new Array();
var bs_itemInfo = new Array();
var factorArray = new Array();
var baseMoney;
var dataRev = false;
/*
 *  宝石合成初始化界面回调
 */
function doGemstones(data)
{
	dataRev = false;
	_baoshiitem.splice(0,_baoshiitem.length);
	for(var i=0; i<data.successRate.length; i++)
	{
		_hechengProbability[i] = data.successRate[i];
	}
	baseMoney = data.formula.baseMoney;
	for(var i=0;i<data.formula.factor.length;i++)
	{
		factorArray[i] = data.formula.factor[i];
	}
	for(var i=0; i<data.gemstones.length; i++)
	{
	        var temp = data.gemstones[i];
		    _baoshiitem[i] = {
			bindState:temp.toolTipInfo.isBound,
			amount:temp.amount,
			itemDescription:temp.toolTipInfo.description,
			gemstoneLevel : temp.gemstoneLevel,
			item:{itemIcon:temp.icon},
			userItemId:temp.id,
			no : temp.no,
			type : temp.type,
			toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}
		    };
		    
	}	    
	dataRev = true;
	    combiningFields.combiningNum = 0;
    	gemstonesBuild(getClickObjectIndex());
	    hcList(getClickObjectIndex());
	    changeMap('jiagongfangScreen_Layer');	
       

}
function doMaterial(data)
{
	dataRev = false;
	_baoshiitem.splice(0,_baoshiitem.length); 
	combiningFields.combiningNum = 0;
	for(var i=0; i<data.successRate.length; i++)
	{
		_hechengProbability[i] = data.successRate[i];
	}
	baseMoney = data.formula.baseMoney;
	for(var i=0;i<data.formula.factor.length;i++)
	{
		factorArray[i] = data.formula.factor[i];
	}
	for(var i=0; i<data.materials.length; i++)
	{
	        var temp = data.materials[i];
		    _baoshiitem[i] = {
			bindState:temp.toolTipInfo.isBound,
			amount:temp.amount,
			itemDescription:temp.toolTipInfo.description,
			gemstoneLevel : temp.gemstoneLevel,
			item:{itemIcon:temp.icon},
			userItemId:temp.id,
			no : temp.no,
			type : temp.type,
			toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}
		    };
		    
	}	 
	dataRev = true;
	updataCombiningList();
    gemstonesBuild(getClickObjectIndex());
	changeMap('jiagongfangScreen_Layer');	
}
var jiaGongfang = function()//绘制加工坊
{
	gbox.setRenderOrder(['jiagongfangScreen']);
	com_layer = 'jiagongfangScreen_Layer';
	com_group = group_src = 'jiagongfangScreen';
    gbox.addObject(
			{ 
				id : 'jiagongfangBg',
				group : 'jiagongfangScreen',
				tileset : 'jiagongFang',
				x : 0,
				y : 0,
				anim : man_jiagongfang,
				action : null,
				frame : 0,
				poly : [ [0,0], [1440,0], [1440,742],[0,742]],
				initialize : function()
				{	
					AnimMgr.changeAction(this, this.anim.action["man_jiagongfang"],true);
					//AnimMgr.updatePolyWithAnim(this);
				},
				first : function() 
				{	
	
				},
				myclick : function()
				{
					pupItem = false;
					equBuild = false;
				    
				    if(((lastTouchMoveX > 622) && (lastTouchMoveX < 711)) && ((lastTouchMoveY > 397) && (lastTouchMoveY<537)))
				    {
				    	 pupItem = true;
				    	 jiagongItem(0,700,422);
				    	 changeMap('jiagongfangScreen_Layer');
				    }
				    else if(((lastTouchMoveX > 11 + shineiOffset) && (lastTouchMoveX < 143 + shineiOffset)) && ((lastTouchMoveY > 118) && (lastTouchMoveY<162)))
				    {
                        isQianghuaList = false;
			            isXiangqianList = false;			    	
//				    	isDrawUI[index] = false;
				    	jiaGong = false;
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
				    else if(((lastTouchMoveX > 10 + shineiOffset) && (lastTouchMoveX < 143 + shineiOffset)) && ((lastTouchMoveY > 13) && (lastTouchMoveY<52)))
				    {
				    	if(buildList[lotIndex][1] == 'state_empty' && 
						buildList[lotIndex][13] == 'state_demolition_empty'){
							//升级
							buildUpgrade(lotIndex);
							isQianghuaList = false;
			                isXiangqianList = false;			    	
//				    	    isDrawUI[index] = false;
				    	    jiaGong = false;
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
				    }
				    else if(((lastTouchMoveX > 10 + shineiOffset) && (lastTouchMoveX < 143 + shineiOffset)) && ((lastTouchMoveY > 69) && (lastTouchMoveY<105)))
				    {
				    	if(buildList[lotIndex][1] == 'state_empty' && 
						buildList[lotIndex][13] == 'state_demolition_empty'){
							//拆除
							buildDemolition(lotIndex);
							isQianghuaList = false;
			                isXiangqianList = false;			    	
//				    	    isDrawUI[index] = false;
				    	    jiaGong = false;
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
				    }
				   
				    if(!Numbg)
					{
						if(gbox._isIndwellDiv("equipmentNumID","input")){
							document.body.removeChild(equipmentNumbg);
							equipmentNumbg = null;
						    Numbg = true;
						}
						
					}
					
				    if(isQianghuaList || isXiangqianList){
						isQianghuaList = false;
			            isXiangqianList = false;
			            jiaGong = true;
						itemName = new Array();
						userItemId = new Array();
						itemLevel = new Array();
						itemIcon = new Array();
						qhListColor = new Array();	
						stone1Info = new Array();
						stone2Info = new Array();
						stone3Info = new Array();
						stone1 = new Array();
						stone2 = new Array();
						stone3 = new Array();
						itemInfo = new Array();
						strengthenData = new Array();			            
			            clearSub(getClickObjectIndex());				    		
				    }
				},
				blit : function()
				{        
	
//					if(isDrawUI[index] && jiaGong)
//                    {                    	
					    gbox.drawImage("jiagongFang",0,0);
					    gbox.drawImage("ty_an_32",6 + shineiOffset,0);                    	
						gbox.drawImage("ty_an_39",44 + shineiOffset,22);
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 66) && (touchMoveY<105)))
						{
							 gbox.drawImage("ty_an_33",8 + shineiOffset,61);
						}
						gbox.drawImage("ty_an_40",44 + shineiOffset,75);
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 118) && (touchMoveY<163)))
						{
							gbox.drawImage("ty_an_34",5 + shineiOffset,116);							
						}
						gbox.drawImage("ty_an_36",44 + shineiOffset,131);
						if(((touchMoveX > 622) && (touchMoveX < 711)) && ((touchMoveY > 397) && (touchMoveY<537)))//装备弹出框	
						 {
						 		this.anim.image = "manAction";
								var data = {
												tile : this.frame,
												dx : 627,
												dy : 396,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0,
												
												anim : this.anim
								};
								AnimMgr.draw(gbox.getBufferContext(), data);//TODO
							  	this.frame = help.decideFrame(this.action);	
						 }	
						 else
						 {
							 gbox.drawImage("man",625,393);
						 }	 

//                    }       
				}
			});
	 //绘制公有按钮
	 drawCommonBtn('levelMenu_1','jiagongfangScreen','jiagongfangScreen_Layer');
}

var jiagongItem = function(index,tempx,tempy)//加工纺弹出条
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'jgItem',
		group : 'levelMenu_1',
		tileset : 'hc_popupMenu',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [tempx,tempy], [tempx + 84,tempy], [tempx + 84,tempy + 101],[tempx,tempy + 101]],
		initialize : function()
		{
			
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			hechengDraw = false;
			if((tempx < lastTouchMoveX && (lastTouchMoveX < (tempx + 84))) && ( tempy < lastTouchMoveY && (lastTouchMoveY< (tempy + 26))))
			{
				console.log("强化");	
				positionIndex = 0;
                typeIndex = 0;				
				BuildingFunction.getEquipmentClass(doEquipment);
			}
			else if((tempx < lastTouchMoveX && (lastTouchMoveX <(tempx + 84))) && ( (tempy + 26) < lastTouchMoveY && (lastTouchMoveY< (tempy + 52))))
			{
				console.log("合成");
				hechengDraw = true;
				BuildingFunction.getFuseInfo(doGemstones);
			}
            else if((tempx < lastTouchMoveX && (lastTouchMoveX< (tempx + 84))) && ( (tempy + 52) < lastTouchMoveY && (lastTouchMoveY< (tempy + 78))))
			{
				console.log("打造");
				equBuild = true;
				Numbg = false;
				jgref = true;
				equipSubTypeRefresh = true; 
				isDrawUI[index] = false;
			    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
				equipmentBuild(index);
				changeMap('jiagongfangScreen_Layer');
			}
            else if((tempx < lastTouchMoveX && (lastTouchMoveX< (tempx + 84))) && ( (tempy + 78) < lastTouchMoveY && (lastTouchMoveY< (tempy + 104))))
			{
				console.log("镶嵌");
				xq_positionIndex = 0;
                xq_typeIndex = 0;		
            	if(typeof(xqList) != "undefined"){
            		xqList.rectSelected = new Array();
            		xqList.mouseUpIndex = -1;
             	}
                BuildingFunction.getEmbedStoneEquipmentClass(doEmbedStoneEquipmentClass);
			}
			pupItem = false;

		},
		blit : function()
		{
			if(isDrawUI[index] && pupItem)
			{
				gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'hc_popupMenu',
									tile : 0,
									dx : tempx,
									dy : tempy,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
				if((tempx < touchMoveX && (touchMoveX < (tempx + 84))) && ( tempy < touchMoveY && (touchMoveY< (tempy + 26))))
				{
                      gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'jglight',
										tile : 0,
										dx : tempx,
										dy : tempy,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
						            }); 
						gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'qianghua',
										tile : 0,
										dx : tempx + 11,
										dy : tempy + 5,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
						            }); 
					
				}
				if((tempx < touchMoveX && (touchMoveX <(tempx + 84))) && ( (tempy + 26) < touchMoveY && (touchMoveY< (tempy + 52))))
				{
	                   
					 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'jglight',
										tile : 0,
										dx : tempx,
										dy : tempy + 26,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
						            }); 
						gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'hc_equipCombiningFont',
										tile : 0,
										dx : tempx + 11,
										dy : tempy + 31,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
						            }); 
				}
				if((tempx < touchMoveX && (touchMoveX< (tempx + 84))) && ( (tempy + 52) < touchMoveY && (touchMoveY< (tempy + 78))))
				{
	                  	gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'jglight',
										tile : 0,
										dx : tempx,
										dy : tempy + 51,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
						            }); 
						gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'dazao',
										tile : 0,
										dx : tempx + 11,
										dy : tempy + 56,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
						            }); 
				}
				if((tempx < touchMoveX && (touchMoveX< (tempx + 84))) && ( (tempy + 78) < touchMoveY && (touchMoveY< (tempy + 104))))
				{
	                 
						gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'jglight',
										tile : 0,
										dx : tempx,
										dy : tempy + 76,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
						            }); 
						gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'hc_inlayFont',
										tile : 0,
										dx : tempx + 11,
										dy : tempy + 81,
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
