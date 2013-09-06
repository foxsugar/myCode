 
var guoku = function(index,_group,_layer)//国库界面
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	var bW = 808;
	var bH = 497;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2; 
	
	var exitX = backdropX + bW - 32;
	var exitY = backdropY + 27;	
	isDrawUI[index] = true;
	isShowGuokuList = true;
	gbox.addObject(
	{ 
		id : 'guokuBg',
		group : 'levelMenu_2',
		tileset : 'propWindows',
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
			if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height))){
				isShowGuokuList = false;
				isShowUsePorp = false;
				drawGkItem = true;
				displayDestroy();
				exit(index);
				curGroup = 'cityMenu';
					if(propNumbg != null && 
					   typeof(propNumbg) != "undefined" &&
					   gbox._isIndwellDiv("propNumbg","input")){
				            document.body.removeChild(propNumbg);  
				            propNumbg = null;
					}  				
			}else{
				guoku(getClickObjectIndex(),com_group,com_layer);
				var poly = [ [560,163], [1079,163], [1079,582],[560,582]];
				gkList(getClickObjectIndex(),poly,540, 183, 14, 40, 36, 10, -360, com_group,com_layer,'levelMenu_2');
				changeMap(com_layer);
				
//				  guoku(getClickObjectIndex(),com_group,com_layer);
//				  updataGuokuList();
//	        	  changeMap(com_layer);			
			}
			
			if(!drawGkItem || isShowUsePorp){
					if(propNumbg != null && 
					   typeof(propNumbg) != "undefined" &&
					   gbox._isIndwellDiv("propNumbg","input")){
				            document.body.removeChild(propNumbg);  
				            propNumbg = null;
					}  				
				isShowUsePorp = false;
				drawGkItem = true;
			}
		},
				blit : function()
				{
					 if(isDrawUI[index]&& isShowGuokuList)
					 {
	                   gbox.blitTile(gbox.getBufferContext(),
					   {
						tileset : 'propWindows',
						tile : 0,
						dx : backdropX,
						dy : backdropY,
						fliph : this.fliph,
						flipv : this.flipv,
						camera : this.camera,
						alpha : 1.0
					   }); 
					 	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_27',
									tile : 0,
									dx :backdropX1,
									dy :backdropY1 + 4,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							     });          
						  if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						   }
					    gbox.drawImage('propTitle',(gbox.getImage('propWindows').width - gbox.getImage("propTitle").width)/2 + backdropX,backdropY1);
					 }	
				}		
	 });
	gbox.addObject(
	{ 
		id : 'propWindows1',
		group : 'levelMenu_2',
		tileset : 'propWindows',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [367,217], [497,204], [502,242],[368,255]],
		initialize : function()
		{
			
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			bottonCtr[0] = true;
			for(var a = 0 ; a<5; a++)
			{
				if(a != 0)
				  bottonCtr[a] = false;
			}
			drawGkItem = true;
			BuildingFunction.getAllArticles(doAllArticlesUpdata);
			guoku(getClickObjectIndex(),com_group,com_layer);
			changeMap(com_layer);
			
		},
		blit : function()
		{
					 if(isDrawUI[index]&& isShowGuokuList)
					 {
					 	if(mouseArea(this))
					 	{
					 	  gbox.drawImage('ty_an_35',backdropX + 49,backdropY + 82);					 		
					 	}
					 	if(bottonCtr[0])
					    {
					 		gbox.drawImage('ty_an_131',backdropX + 49,backdropY + 82);
					    }
					 	gbox.drawImage('gk_zjm_23',405,220);
					 }	
		}		
	 });
	gbox.addObject(
	{ 
		id : 'propWindows2',
		group : 'levelMenu_2',
		tileset : 'propWindows',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [368,266], [499,267], [500,304],[369,304]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			bottonCtr[1] = true;
			for(var a = 0 ; a<5; a++)
			{
				if(a != 1)
				  bottonCtr[a] = false;
			}
			drawGkItem = true;
			BuildingFunction.getAllEquipment(doAllEquipment);
			guoku(getClickObjectIndex(),com_group,com_layer);
			changeMap(com_layer);
		},
		blit : function()
		{
					 if(isDrawUI[index]&& isShowGuokuList)
					 {
					 	if( mouseArea(this))
					 	{
	                      gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_33',
									tile : 0,
									dx : backdropX + 49,
									dy : backdropY + 133,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 					 		
					 	}
					 	if(bottonCtr[1])
					    {
					    	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_132',
									tile : 0,
									dx : backdropX + 49,
									dy : backdropY + 133,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
					    }
					 	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'gk_zjm_24',
									tile : 0,
									dx : 405,
									dy : 270,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
					 }	
		}		
	 });
	gbox.addObject(
	{ 
		id : 'propWindows3',
		group : 'levelMenu_2',
		tileset : 'propWindows',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [368,317], [498,317], [499,357],[366,354]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			bottonCtr[2] = true;
			for(var a = 0 ; a<5; a++)
			{
				if(a != 2)
				  bottonCtr[a] = false;
			}
			drawGkItem = true;
			BuildingFunction.getAllMaterial(doAllMaterial);
			guoku(getClickObjectIndex(),com_group,com_layer);
			changeMap(com_layer);
		},
		blit : function()
		{
					 if(isDrawUI[index]&& isShowGuokuList)
					 {
					 	if( mouseArea(this))
					 	{
	                      gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_33',
									tile : 0,
									dx : backdropX + 49,
									dy : backdropY + 188,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 					 		
					 	}
					 	if(bottonCtr[2])
					    {
					    	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_132',
									tile : 0,
									dx : backdropX + 48,
									dy : backdropY + 188,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
					    }
					 	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'gk_zjm_25',
									tile : 0,
									dx : 405,
									dy : 326,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
					 }	
		}		
	 });
	gbox.addObject(
	{ 
		id : 'propWindows4',
		group : 'levelMenu_2',
		tileset : 'propWindows',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [369,366], [500,378], [497,417],[363,404]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			bottonCtr[3] = true;
			for(var a = 0 ; a<5; a++)
			{
				if(a != 3)
				  bottonCtr[a] = false;
			}
			drawGkItem = true;
			BuildingFunction.getAllUserItem(doAllUserItem);
			guoku(getClickObjectIndex(),com_group,com_layer);
			changeMap(com_layer);
		},
		blit : function()
		{
					 if(isDrawUI[index]&& isShowGuokuList)
					 {
					 	if( mouseArea(this))
					 	{
	                      gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_34',
									tile : 0,
									dx : backdropX + 44,
									dy : backdropY + 239,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 					 		
					 	}
					 	if(bottonCtr[3])
					    {
					    	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_133',
									tile : 0,
									dx : backdropX + 44,
									dy : backdropY + 239,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
					    }
					 	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'gk_zjm_26',
									tile : 0,
									dx : 405,
									dy : 377,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
					 }	
		}		
	 });
	gbox.addObject(
	{ 
		id : 'propWindows5',
		group : 'levelMenu_2',
		tileset : 'propWindows',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [367,426], [500,426], [501,464],[368,463]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			bottonCtr[4] = true;
			for(var a = 0 ; a<5; a++)
			{
				if(a != 4)
				  bottonCtr[a] = false;
			}
			drawGkItem = true;
			BuildingFunction.getAllQuests(doAllQuests);
			guoku(getClickObjectIndex(),com_group,com_layer);
			changeMap(com_layer);
		},
		blit : function()
		{
					 if(isDrawUI[index]&& isShowGuokuList)
					 {
					 	if( mouseArea(this))
					 	{
	                      gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_33',
									tile : 0,
									dx : backdropX + 48,
									dy : backdropY + 294,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 					 		
					 	}
					 	if(bottonCtr[4])
					    {
					    	gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_132',
									tile : 0,
									dx : backdropX + 48,
									dy : backdropY + 294,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
					    }
					 	 gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'gk_zjm_27',
									tile : 0,
									dx : 405,
									dy : 433,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 	
					 }	
		}		
	 });
};

var guokuLimit;

//1装备getEquipmentForAuction
function doAllEquipment(data){
		if(typeof(data.error) != "undefined"){
			alert("系统提示：" + data.error);
			return;
		}
guokuLimit = data.limit;
gkListColor = new Array();
gkData = new Array();
gk_itemInfo = new Array(new Array);
    for(var i=0; i<data.articles.length; i++){
    	var temp = data.articles[i];
        gkData[i] = {
        	            amount : 1,//总数
						dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellAble,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//装备图标
						},
						toolTipInfo : 
						{
							agility : temp.toolTipInfo.agility,//敏捷
							equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp.toolTipInfo.equipmentName,//名字
							equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp.toolTipInfo.heroForce,//武力
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp.toolTipInfo.physique,//体质
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp.toolTipInfo.strategy,//谋略
							strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp.toolTipInfo.weaponType,//兵器方式
						}
					};
		           if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
	                if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			          gkData[i] = {
	        	            amount : 1,//总数
							dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
							id : temp.id,//装备ID
							sellAble : temp.sellAble,//是否可卖
							type : temp.type,//类型 1 装备，2道具，3材料，4任务
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								
							}
					};
					if(typeof(temp.toolTipInfo.stone1) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone1 = true;
						        	gkData[i].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone1 = false;
						        	gkData[i].toolTipInfo.stoneName1 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc1 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone2) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone2 = true;
						        	gkData[i].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone2 = false;
						        	gkData[i].toolTipInfo.stoneName2 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc2 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone3) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone3 = true;
						        	gkData[i].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone3 = false;
						        	gkData[i].toolTipInfo.stoneName3 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc3 = "";
						        }		
						
			        }
			       
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	gkData[i] = {
	        	            amount : 1,//总数
							dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
							id : temp.id,//装备ID
							sellAble : temp.sellAble,//是否可卖
							type : temp.type,//类型 1 装备，2道具，3材料，4任务
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								
							}
					    };
					    if(typeof(temp.toolTipInfo.stone1) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone1 = true;
						        	gkData[i].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone1 = false;
						        	gkData[i].toolTipInfo.stoneName1 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc1 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone2) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone2 = true;
						        	gkData[i].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone2 = false;
						        	gkData[i].toolTipInfo.stoneName2 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc2 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone3) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone3 = true;
						        	gkData[i].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone3 = false;
						        	gkData[i].toolTipInfo.stoneName3 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc3 = "";
						        }
			        }
			       
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	gkData[i] = {
	        	            amount : 1,//总数
							dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
							id : temp.id,//装备ID
							sellAble : temp.sellAble,//是否可卖
							type : temp.type,//类型 1 装备，2道具，3材料，4任务
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								
							}
					    };
					    if(typeof(temp.toolTipInfo.stone1) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone1 = true;
						        	gkData[i].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone1 = false;
						        	gkData[i].toolTipInfo.stoneName1 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc1 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone2) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone2 = true;
						        	gkData[i].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone2 = false;
						        	gkData[i].toolTipInfo.stoneName2 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc2 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone3) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone3 = true;
						        	gkData[i].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone3 = false;
						        	gkData[i].toolTipInfo.stoneName3 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc3 = "";
						        }
			        }
			       	    
         if(typeof(gkData[i].toolTipInfo.quality) != "undefined")
			 {
			 	switch(gkData[i].toolTipInfo.quality)
				 {
					case 1:
						gkListColor[i] = '#FFFFFF';
						break;
					case 2:
						gkListColor[i] = '#08cc1a';
						break;
					case 3:
						gkListColor[i] = '#006cff';
						break;
					case 4:
						gkListColor[i] = '#dc00df';
						break;
					case 5:
						gkListColor[i] = '#e09900';
						break;
					case 6:
						gkListColor[i] = '#ff0000';
						break;
				 }
			 } 
    }
	updataGuokuList();
}
//2材料
function doAllMaterial(data)
{
		if(typeof(data.error) != "undefined")
		{
			alert("系统提示：" + data.error);
			return;
		}
	guokuLimit = data.limit;
	gkListColor = new Array();
	gkData = new Array();
	gk_itemInfo = new Array(new Array);
    for(var i=0; i<data.articles.length; i++)
    {
    	var temp = data.articles[i];
	    gkData[i] = {
						amount : temp.amount,//总数
						dropable : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellable : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}
					};
		if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
	    if(typeof(gkData[i].toolTipInfo.quality) != "undefined")
			 {
			 	switch(gkData[i].toolTipInfo.quality)
				 {
					case 1:
						gkListColor[i] = '#FFFFFF';
						break;
					case 2:
						gkListColor[i] = '#08cc1a';
						break;
					case 3:
						gkListColor[i] = '#006cff';
						break;
					case 4:
						gkListColor[i] = '#dc00df';
						break;
					case 5:
						gkListColor[i] = '#e09900';
						break;
					case 6:
						gkListColor[i] = '#ff0000';
						break;
				 }
			 } 
	   
    }
	updataGuokuList();
}
//3道具
function doAllUserItem(data){
		if(typeof(data.error) != "undefined"){
			alert("系统提示：" + data.error);
			return;
		}
guokuLimit = data.limit;
gkListColor = new Array();
gkData = new Array();
gk_itemInfo = new Array(new Array);
    for(var i=0; i<data.articles.length; i++){
    	var temp = data.articles[i];
    	gkData[i] = {
						amount : temp.amount,//总数
						batchUseable : temp.batchUseable,//批量使用
						dropable : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellable : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : temp.useable,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//道具图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp.toolTipInfo.itemName,//名字
						}
		  
					};
		  if(typeof(gkData[i].toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }			
		  if(typeof(temp.toolTipInfo.quality) != "undefined")
			 {
			 	switch(gkData[i].toolTipInfo.quality)
				 {
					case 1:
						gkListColor[i] = '#FFFFFF';
						break;
					case 2:
						gkListColor[i] = '#08cc1a';
						break;
					case 3:
						gkListColor[i] = '#006cff';
						break;
					case 4:
						gkListColor[i] = '#dc00df';
						break;
					case 5:
						gkListColor[i] = '#e09900';
						break;
					case 6:
						gkListColor[i] = '#ff0000';
						break;
				 }
			 }  
    }

	updataGuokuList();
}
//4任务物品
function doAllQuests(data)
{
		if(typeof(data.error) != "undefined")
		{
			alert("系统提示：" + data.error);
			return;
		}
		guokuLimit = data.limit;
		gkListColor = new Array();
		gkData = new Array();
		gk_itemInfo = new Array(new Array);
	    for(var i=0; i<data.articles.length; i++)
	    {
	    	var temp = data.articles[i];
	    	gkData[i] = {
						amount : temp.amount,//总数
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							itemName : temp.toolTipInfo.questsName,//名称
						}
					};
		    if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
	    };      	

	   updataGuokuList();
}

//5全部
function doAllArticles(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}	
	guokuLimit = data.limit;
	gkListColor = new Array();
	gkData = new Array();
	gk_itemInfo = new Array(new Array);
	for(var i=0; i<data.articles.length; i++)
	{
		var temp = data.articles[i];
		switch(temp.type)
		{
			case 1://装备
					gkData[i] = {
						amount : 1,//总数
						dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellAble,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : 0,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//装备图标
						},
						toolTipInfo : 
						{
							agility : temp.toolTipInfo.agility,//敏捷
							equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp.toolTipInfo.equipmentName,//名字
							equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp.toolTipInfo.heroForce,//武力
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp.toolTipInfo.physique,//体质
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp.toolTipInfo.strategy,//谋略
							strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp.toolTipInfo.weaponType,//兵器方式							
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			          gkData[i] = {
	        	            amount : 1,//总数
							dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
							id : temp.id,//装备ID
							sellAble : temp.sellAble,//是否可卖
							type : temp.type,//类型 1 装备，2道具，3材料，4任务
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								
							}
					};
					if(typeof(temp.toolTipInfo.stone1) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone1 = true;
						        	gkData[i].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone1 = false;
						        	gkData[i].toolTipInfo.stoneName1 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc1 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone2) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone2 = true;
						        	gkData[i].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone2 = false;
						        	gkData[i].toolTipInfo.stoneName2 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc2 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone3) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone3 = true;
						        	gkData[i].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone3 = false;
						        	gkData[i].toolTipInfo.stoneName3 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc3 = "";
						        }		
						
			        }
			       
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	gkData[i] = {
	        	            amount : 1,//总数
							dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
							id : temp.id,//装备ID
							sellAble : temp.sellAble,//是否可卖
							type : temp.type,//类型 1 装备，2道具，3材料，4任务
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								
							}
					    };
					    if(typeof(temp.toolTipInfo.stone1) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone1 = true;
						        	gkData[i].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone1 = false;
						        	gkData[i].toolTipInfo.stoneName1 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc1 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone2) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone2 = true;
						        	gkData[i].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone2 = false;
						        	gkData[i].toolTipInfo.stoneName2 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc2 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone3) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone3 = true;
						        	gkData[i].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone3 = false;
						        	gkData[i].toolTipInfo.stoneName3 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc3 = "";
						        }
			        }
			       
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	gkData[i] = {
	        	            amount : 1,//总数
							dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
							id : temp.id,//装备ID
							sellAble : temp.sellAble,//是否可卖
							type : temp.type,//类型 1 装备，2道具，3材料，4任务
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								
							}
					    };
					    if(typeof(temp.toolTipInfo.stone1) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone1 = true;
						        	gkData[i].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone1 = false;
						        	gkData[i].toolTipInfo.stoneName1 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc1 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone2) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone2 = true;
						        	gkData[i].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone2 = false;
						        	gkData[i].toolTipInfo.stoneName2 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc2 = "";
						        }
						        if(typeof(temp.toolTipInfo.stone3) != "undefined")
						        {
						        	gkData[i].toolTipInfo.stone3 = true;
						        	gkData[i].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
						        	gkData[i].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
						        }
						        else
						        {
						        	gkData[i].toolTipInfo.stone3 = false;
						        	gkData[i].toolTipInfo.stoneName3 = "";
						        	gkData[i].toolTipInfo.stoneNameDesc3 = "";
						        }
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					gkData[i] = {
						amount : temp.amount,//总数
						batchUseable : temp.batchUseable,//批量使用
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : temp.useable,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//道具图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp.toolTipInfo.itemName,//名字
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					gkData[i] = {
						amount : temp.amount,//总数
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : 0,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
					break;
				case 4://4.任务
					gkData[i] = {
						amount : temp.amount,//总数
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							itemName : temp.toolTipInfo.questsName,//名称
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
					break;
		   }  
		   if(typeof(gkData[i].toolTipInfo.quality) != "undefined")
			 { 
				gkListColor[i] = qualityColor[gkData[i].toolTipInfo.quality - 1];
			 }    	
	}
	guoku(getClickObjectIndex(),com_group,com_layer);
	var poly = [ [560,163], [1079,163], [1079,582],[560,582]];
	gkList(getClickObjectIndex(),poly,540, 183, 14, 40, 36, 10, -360, com_group,com_layer,'levelMenu_2');
	changeMap(com_layer);
}

function doAllArticlesUpdata(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}	
	guokuLimit = data.limit;
	gkListColor = new Array();
	gkData = new Array();
	gk_itemInfo = new Array(new Array);
	for(var i=0; i<data.articles.length; i++){
		var temp = data.articles[i];
		switch(temp.type)
		{
			case 1://装备
			        
					gkData[i] = {
						amount : 1,//总数
						dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellAble,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//装备图标
						},
						toolTipInfo : 
						{
							agility : temp.toolTipInfo.agility,//敏捷
							equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp.toolTipInfo.equipmentName,//名字
							equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp.toolTipInfo.heroForce,//武力
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp.toolTipInfo.physique,//体质
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp.toolTipInfo.strategy,//谋略
							strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp.toolTipInfo.weaponType,//兵器方式
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
				    break;
				case 2://道具
					gkData[i] = {
						amount : temp.amount,//总数
						batchUseable : temp.batchUseable,//批量使用
						dropable : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellable : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : temp.useable,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//道具图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp.toolTipInfo.itemName,//名字
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					gkData[i] = {
						amount : temp.amount,//总数
						dropable : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellable : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
					break;
				case 4://4.任务
					gkData[i] = {
						amount : temp.amount,//总数
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							materialName : temp.toolTipInfo.questsName,//名称
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
					break;
		   }
		  
		   if(typeof(gkData[i].toolTipInfo.quality) != "undefined")
			 {
			 	switch(gkData[i].toolTipInfo.quality)
				 {
					case 1:
						gkListColor[i] = '#FFFFFF';
						break;
					case 2:
						gkListColor[i] = '#08cc1a';
						break;
					case 3:
						gkListColor[i] = '#006cff';
						break;
					case 4:
						gkListColor[i] = '#dc00df';
						break;
					case 5:
						gkListColor[i] = '#e09900';
						break;
					case 6:
						gkListColor[i] = '#ff0000';
						break;
				 }
			 } 
	    }
		updataGuokuList();
	}
var gkNum = 0;
var gkList = function(index,_poly,dx,dy,row,column, rectSpace, displayRow,offsetX,_group,_layer,group)//国库列表
{
	
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isShowGuokuList = true;
	var currentGroup = group;
	gbox.addObject(
	{ 
        id : 'gkList',
		group : ''+ currentGroup,
		tileset : 'qkHit',
		x : 0,
		y : 0,
		frame : 0,
		poly : _poly,
		initialize : function()
		{
			var content = new Array(gkData);
            var listLen = content[0].length/10;
            if((content[0].length%10) != 0){
            	listLen = parseInt(content[0].length/10 + 1);
            }
            if(listLen < 10)
                listLen = 10;   

			guokuList.entryStartIndex = 0;
			guokuList.init('ty_an_128', 'ty_an_129',null,'qkHit', gkListColor,content, 529, 165, 13, listLen, 42, 10, true, -360, 0);       	
			guokuList._limit = guokuLimit;
		},
		first : function() 
		{	
		},
		myclick : function()
		{
           if(isPopupBuild){//弹出菜单
              popupBuild(getClickObjectIndex(),com_group,com_layer);
              changeMap(com_layer);
           }else{
			  guoku(getClickObjectIndex(),com_group,com_layer);
			  updataGuokuList();
        	  changeMap(com_layer);
           }	
	
		},
		blit : function()
		{
			if(/*isDrawUI[index] && */isShowGuokuList)
			{				
			   guokuList.paint( gk_OffsetY, gk_BeginSlip, gk_Time );
			   var gkIndex = guokuList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
               if(typeof(gk_itemInfo) != "undefined" && gkIndex != -1){
               	//type类型 1 装备，2道具，3材料，4任务
               	  switch(gkData[gkIndex].type)
               	  {
               	  	 case 1:
               	  	 if(touchMoveX !=0)
               	  	   tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,lastTouchMoveY,gkData[gkIndex].toolTipInfo);
               	  	   break;
               	  	 case 2:
               	  	 if(touchMoveX !=0)
               	  	   tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,lastTouchMoveY,gkData[gkIndex].toolTipInfo);
               	  	   break;
               	  	 case 3:
               	  	 if(touchMoveX !=0)
               	  	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,lastTouchMoveY,gkData[gkIndex].toolTipInfo);
               	  	   break; 
               	  	 case 4:
               	  	 if(touchMoveX !=0)
               	  	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,lastTouchMoveY,gkData[gkIndex].toolTipInfo);
               	  	   break;               	  	   
               	  }
               }			   
			}
		}
	 });

};
var updataGuokuList = function(){
	if(typeof(gkData) != "undefined" && typeof(guokuList) != "undefined"){
		
		var content = new Array(gkData);
	    var listLen = content[0].length/10;
	    if((content[0].length%10) != 0){
	    	listLen = parseInt(content[0].length/10 + 1);
	    }
	    if(listLen < 10)
	        listLen = 10;   
	    else if(listLen > guokuLimit)
	    	listLen = guokuLimit;
	    guokuList.update(content, gkListColor, listLen);		
	}
};
