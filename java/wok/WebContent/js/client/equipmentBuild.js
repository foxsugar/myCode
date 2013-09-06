var refID = 0;
var iim = 0;
var equipSubTypeID = 0;
var userEquipDesignID = 0;
var equipSubType = new Array();
var equipValue = new Array();
var equipSubTypeRefresh = true;
var equiSubName = new Array();
var itemDescription;
var weaponsArray = new Array();//武器数组
var breastplateArray = new Array();//胸甲数组
var helmetArray = new Array();//头盔数组
var leggingsArray = new Array();//护腿数组
var bootsArray = new Array();//靴子数组
var bracersArray = new Array();//护腕数组
var currentHaveArray = new Array();//当前拥有数量
var needInfoArray = new Array();//材料名称和需要数量
var successItemArray = new Array(); //辅助道具
var userEquipDesignArray = new Array();//图样信息
var makeEquipmentArray = new Array();//打造成功后信息
var finshBoolean = false;
var breastplateBoolean = false;
var helmetBoolean = false;
var leggingsBoolean = false;
var bootsBoolean = false; 
var bracersBoolean = false;
var successItemBoolean = false;
var makeEquipmentBoolean = false;
var successTuyang = false;
var touchTuyang = false;
var max = new Array();
var drawTuyang = true;
var EquipmentNum = 0;
var equipmentArray = new Array();
var productionsArray = new Array();
function doMakeEquipment(data)
{
	if(typeof(data.error) != "undefined"){
			alert("系统提示：" + data.error);
			return;
		}
	if(data)
	{
		
		for(var a = 0 ; a < currentHaveArray.length - 1; a++)
		{
			console.log("111===" + currentHaveArray[a]);
			console.log("222===" + needInfoArray[a].needItemCounts*equipmentNum.value);
			currentHaveArray[a] = currentHaveArray[a] - needInfoArray[a].needItemCounts*equipmentNum.value;
			console.log("33333===" + currentHaveArray[a]);
		}
		currentHaveArray[currentHaveArray.length - 1] = onlyMoney;
	}
	makeEquipmentBoolean = true;
}
function doMadeInfo(data)
{
    makeEquipmentArray[0] = "";
    successItemArray[0] = "";

	for(var a = 0 ; a < data.haveAmount.length; a++)
	{
		currentHaveArray[a] = data.haveAmount[a];
	}
	currentHaveArray[data.haveAmount.length] = onlyMoney;
    for(var a = 0 ; a < data.needAmount.length; a++)
	{
		needInfoArray[a] = {
							 itemName:data.needMaterialName[a],
			                 needItemCounts:data.needAmount[a],
                            };
	}
	for(var a=0; a<data.productions.length; a++)
	{
		var temp = data.productions[a];
		productionsArray[a] = 
		{
			iconLarge : temp.icon,
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
							type : temp.type							
						}
		};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	productionsArray[a].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	productionsArray[a].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			        	productionsArray[a].toolTipInfo.stone1 = true;
			        	productionsArray[a].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
			        	productionsArray[a].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
			        }
			        else
			        {
			        	productionsArray[a].toolTipInfo.stone1 = false;
			        	productionsArray[a].toolTipInfo.stoneName1 = "";
			        	productionsArray[a].toolTipInfo.stoneNameDesc1 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	productionsArray[a].toolTipInfo.stone2 = true;
			        	productionsArray[a].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
			        	productionsArray[a].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
			        }
			        else
			        {
			        	productionsArray[a].toolTipInfo.stone2 = false;
			        	productionsArray[a].toolTipInfo.stoneName2 = "";
			        	productionsArray[a].toolTipInfo.stoneNameDesc2 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	productionsArray[a].toolTipInfo.stone3 = true;
			        	productionsArray[a].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
			        	productionsArray[a].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
			        }
			        else
			        {
			        	productionsArray[a].toolTipInfo.stone3 = false;
			        	productionsArray[a].toolTipInfo.stoneName3 = "";
			        	productionsArray[a].toolTipInfo.stoneNameDesc3 = "";
			        }			
		
	}
    for(var a = 0; a<currentHaveArray.length; a++)
	{
			max[a]= parseInt(currentHaveArray[a]/needInfoArray[a].needItemCounts);
	}

	for (var i = 0; i < max.length; i++)
			{
				for (var j = i + 1; j <max.length; j++)
					{
					   if (max[i] > max[j])
					   {
					         var n;
					         n=max[j];
					         max[j]=max[i];
					         max[i] = n;
					    }
					
					  }
					
			}
	successItemBoolean = true;
}
var materialLevelArray = new Array();
function doEquipSubType(data){
	//下拉框数据对象数组
    comboboxes = {};
    
    if(data.equipSubType!=null)
    {
    	for(var a = 0 ; a< data.equipSubType.length ; a++)
	    {
	    	 equipSubType[a] = data.equipSubType[a].name;
	         equipValue[a] = data.equipSubType[a].value;
	    }
    	var comboboxPositon = new Combobox();
        comboboxPositon.setData(data.equipSubType,'value','name');
        comboboxes['equipSubType'] = comboboxPositon;
    }
    
    if(data.equipDefault!=null)
    {
    	 for(var b = 0 ; b<data.equipDefault.length; b++)
	    {
	       weaponsArray[b] = {equipmentName:data.equipDefault[b].equipmentName,
		                      planNo:data.equipDefault[b].planNo,
		                      };
	    }
    	var comboboxPositon = new Combobox();
        comboboxPositon.setData(data.equipDefault,'planNo','equipmentName');
        comboboxes['equipmentName'] = comboboxPositon;
    }
     if(data.materialLevel!=null)
     {
     	for(var c = 0; c<data.materialLevel.length; c++)
	    {
	      materialLevelArray[c] = {
	      	                  level:data.materialLevel[c].level,
		                      name:data.materialLevel[c].name,
		                      };
	    }
     	var comboboxPositon = new Combobox();
        comboboxPositon.setData(data.materialLevel,'level','name');
        comboboxes['materialLevel'] = comboboxPositon;
     }
}
function splictText(str)
{
     var text = gbox.getStringsArray(str,280,14);
	 if(text.length == 1)
	    gbox.drawString(text[0],753,340,'#ffffff',14);
	 else
	 {
		for(var a = 0 ; a<text.length; a++)
		{
			gbox.drawString(text[a],753,332 + a*16,'#ffffff',14);
		}
	 }

}
function doWeapons(data)
{
	if(comboboxes){
		if(typeof(comboboxes['equipmentName']) != "undefined"){
			comboboxes['equipmentName'].setData(data,'planNo','equipmentName');
		}
	}
}
var equipmentBuild = function(index)//装备打造
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	var bW = 808;
	var bH = 497;
	//equipSubTypeRefresh = true;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var backdropX1 = (gbox.getScreenW() - 808)/2;
	var backdropY1 = (gbox.getScreenH() - 488)/2;
	var exY = exitButtonCoordinate.y+10;
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'equipment',
		group : 'levelMenu_3',
		tileset : 'jgf_zjm_30',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],		
		initialize : function()
		{
			if(equipSubTypeRefresh)
			{
				BuildingFunction.getEquipSubType(doEquipSubType);
			}
			equipSubTypeRefresh = false;
			if(isDrawUI[index]&& equBuild && jgref)
//			if(isDrawUI[index]&& equBuild )
			{
				if(equipmentNumbg == null && !gbox._isIndwellDiv("equipmentNumID","input"))
				{
					equipmentNumbg = addDivWindowBg((backdropX+674),494);
					equipmentNumbg.id = 'equipmentNumID';
					document.body.appendChild(equipmentNumbg);
		            equipmentNum = document.createElement("input");
		            equipmentNum.style.id = 'equipmentNum';
		            equipmentNum.style.backgroundColor = '#000000';
		            equipmentNum.style.width = '40px';
		            equipmentNum.style.color = '#ffffff';		         
		            //equipmentNum.display = block;
		            equipmentNumbg.appendChild(equipmentNum);
				}
				
			}

	        
		},
		first : function() 
		{	
			 /*
			 * 控制浏览器大小变化时DIV输入框自动适配屏幕
			 */
				adaptiveDiv(equipmentNumbg,"equipmentNumID",(backdropX+674));
			 //////////////////////////////////////////////
			 equipmentNum.value = equipmentNum.value.replace(/\D/g,'');
		},
		myclick : function()
		{
			//jgref = false;
			if(((lastTouchMoveX > 1084) && (lastTouchMoveX < 1111)) && ((lastTouchMoveY > 164) && (lastTouchMoveY<189)))
			{
				    	Numbg = true;
				    	if(gbox._isIndwellDiv("equipmentNumID","input")){
							document.body.removeChild(equipmentNumbg);
							equipmentNumbg = null;
	                    }
				    
				    	isDrawUI[index] = false;
				    	equBuild = false;
						clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];	
						changeMap('jiagongfangScreen_Layer');
		    }else
		    if(((lastTouchMoveX > 540) && (lastTouchMoveX < 565)) && ((lastTouchMoveY > 332) && (lastTouchMoveY<352)))//装备部位
		    {
		    	if(!comboboxes['equipSubType'].isOpen){
						//下拉框选中方法
						var equipSubTypeselected = function(){
							BuildingFunction.getEquipCanBeMade(
									comboboxes['equipSubType'].selected.id,
									doWeapons
							);
							equipSubTypeID = comboboxes['equipSubType'].selected.id - 1;
							equipmentBuild(getClickObjectIndex());
							changeMap('jiagongfangScreen_Layer');
						};
						//绘制下拉框
						var _index = getClickObjectIndex();
						comboboxes['equipSubType'].info(
								_index,
								'equipSubTypeBox',
								'levelMenu_4',
								'jiagongfangScreen_Layer',
								['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
								472,
								352,
								{widthType:2,isScrolling:false}
						);
						comboboxes['equipSubType'].createCombobox(equipSubTypeselected);
						equipmentBuild(getClickObjectIndex());
						changeMap('jiagongfangScreen_Layer');
		    	}
		    }else
		    if(((lastTouchMoveX > 1024) && (lastTouchMoveX < 1044)) && ((lastTouchMoveY > 332) && (lastTouchMoveY<352)))//材料级别选择
		    {
		    	if(!comboboxes['materialLevel'].isOpen){
			    	//materialLevel
			    	//下拉框选中方法
					var equipmentNameselected = function(){
						userEquipDesignID = comboboxes['materialLevel'].selected.id -1;
						equipmentBuild(getClickObjectIndex());
						changeMap('jiagongfangScreen_Layer');
					};
					//绘制下拉框
					var _index = getClickObjectIndex();
					comboboxes['materialLevel'].info(
							_index,
							'materialLevelBox',
							'levelMenu_4',
							'jiagongfangScreen_Layer',
							['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
							905,
							352,
							{widthType:3,isScrolling:false}
					);
					comboboxes['materialLevel'].createCombobox(equipmentNameselected);
					equipmentBuild(getClickObjectIndex());
					changeMap('jiagongfangScreen_Layer');
		    	}
		    }else
			if(((lastTouchMoveX > 700) && (lastTouchMoveX < 723)) && ((lastTouchMoveY > 332) && (lastTouchMoveY<348)))//具体装备上箭头
				    {
						if(!comboboxes['equipmentName'].isOpen){
							//equipmentName
					    	//下拉框选中方法
							var equipmentNameselected = function(){
								equipmentBuild(getClickObjectIndex());
								changeMap('jiagongfangScreen_Layer');
							};
							//绘制下拉框
							var _index = getClickObjectIndex();
							comboboxes['equipmentName'].info(
									_index,
									'equipmentNameBox',
									'levelMenu_4',
									'jiagongfangScreen_Layer',
									['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
									585,
									352,
									{widthType:3,isScrolling:false}
							);
							comboboxes['equipmentName'].createCombobox(equipmentNameselected);
							equipmentBuild(getClickObjectIndex());
							changeMap('jiagongfangScreen_Layer');
						}
			}else
		    if(((lastTouchMoveX > 961) && (lastTouchMoveX < 1041)) && ((lastTouchMoveY > 547) && (lastTouchMoveY<570)))//合成按钮
			{
				    	if(comboboxes){
							if(typeof(comboboxes['equipmentName']) != "undefined" && 
									typeof(comboboxes['materialLevel']) != "undefined")
							{
								if(equipmentNum.value <=max[0]&& max[0]!=0)
						    	   	BuildingFunction.makeEquipment(comboboxes['equipmentName'].selected.id,
						    	   			comboboxes['materialLevel'].selected.id,
						    	   			equipmentNum.value,
						    	   			doMakeEquipment);
						    	else
						    	   	alert("材料不足");
							}
						}
				    	equipmentBuild(index);
						changeMap('jiagongfangScreen_Layer');
			}else
		     if(((lastTouchMoveX > 1046) && (lastTouchMoveX < 1072)) && ((lastTouchMoveY > 331) && (lastTouchMoveY<356)))//刷新按钮
			 {
		    	 	if(comboboxes)
		    	 		{
		    	 			if(typeof(comboboxes['equipmentName']) != "undefined" && 
								typeof(comboboxes['materialLevel']) != "undefined")
							{
		    	 				BuildingFunction.getEquipMadeInfo(
					     			comboboxes['equipmentName'].selected.id,
					     			comboboxes['materialLevel'].selected.id,
					     			doMadeInfo
		    	 				);
					     	equipmentNum.value = "";
							}
						}
		    	 	equipmentBuild(index);
					changeMap('jiagongfangScreen_Layer');
			 }else
			 {
				    equipmentBuild(index);
					changeMap('jiagongfangScreen_Layer');
			 }
		},
		
		blit : function()
		{
			if(isDrawUI[index] && equBuild)
			{
				//装备部位 文字
				var equipSubTypeName = '';
				var equipmentName = '';
				var materialLevelName = '';
				if(comboboxes){
					if(typeof(comboboxes['equipSubType']) != "undefined"){
						equipSubTypeName = comboboxes['equipSubType'].selected.txt;
					}
					if(typeof(comboboxes['equipmentName']) != "undefined"){
						equipmentName = comboboxes['equipmentName'].selected.txt;
					}
					if(typeof(comboboxes['materialLevel']) != "undefined"){
						materialLevelName = comboboxes['materialLevel'].selected.txt;
					}
				}
			   var ghx = (gbox.getScreenW() - gbox.getImage("jgf_zjm_34").width)/2;
			   var ghy = (gbox.getScreenH() - gbox.getImage("jgf_zjm_34").height)/2;
			   gbox.drawImage('jgf_zjm_30',ghx,ghy);
               var ghx1 = (gbox.getScreenW() - gbox.getImage("ty_an_27").width)/2;
			   var ghy1 = (gbox.getScreenH() - gbox.getImage("ty_an_27").height)/2;
			   gbox.drawImage('ty_an_122',ghx1,ghy1-3);		
			   
			   gbox.drawLineBreakText(DescriptiveText.jiagongfang.equipmentBuild,380,210,0,705);
			   gbox.drawImage('jgf_zjm_31',(gbox.getImage('jgf_zjm_30').width - gbox.getImage("jgf_zjm_31").width)/2 + backdropX,backdropY1+23);
				    if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && 
				    		((exY < touchMoveY) && (touchMoveY < exY+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exY);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exY);	
						   }
			    	if(((touchMoveX > 926) && (touchMoveX < 1081)) && ((touchMoveY > 542) && (touchMoveY<579)))//合成按钮
			    	 {
			    	 	gbox.drawImage("ty_an_09",960,547);
			    	 } 
			    		var strW = gbox.getTextWidth("打 造",14);
				        var cntX = 961 + (gbox.getImage("ty_an_09").width - strW)/2;
				        var cntY = 547 + (gbox.getImage("ty_an_09").height - 14)/2;
			            gbox.drawText("打 造", cntX,cntY,10);		
					 //画类别
					gbox.drawText(equipSubTypeName,500,336,10);
					//装备名称
					gbox.drawText(equipmentName,585 + (105 - gbox.getTextWidth(equipmentName,14))/2,336,10);
					//材料级别
					gbox.drawText(materialLevelName,908 + (108 - gbox.getTextWidth(materialLevelName,14))/2,336,10);
					
					gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'dz_button1',
									tile : 0,
									dx : 1052,
									dy : 328,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            }); 
					  if(((touchMoveX > 1052) && (touchMoveX < 1078)) && ((touchMoveY > 328) && (touchMoveY<354)))//刷新按钮
					  {
					  	   gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'dz_button2',
									tile : 0,
									dx : 1052,
									dy : 328,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
					            });
					  }	
					  if(successItemBoolean)
					  {
					  	     for(var a = 0 ; a < currentHaveArray.length; a++)
		                      {
		                      	   gbox.drawText(currentHaveArray[a],739 + (90 - gbox.getTextWidth(currentHaveArray[a],14))/2,470 + 25*a,0);
		                      }
		                      for(var a = 0 ; a < needInfoArray.length; a++)
		                      {
		                      	   gbox.drawText(needInfoArray[a].itemName,562 + (90 - gbox.getTextWidth(needInfoArray[a].itemName,14))/2,470 + 25*a,0);
		                      }
		                      for(var a = 0 ; a < needInfoArray.length; a++)
		                      {
		                      	   gbox.drawText(needInfoArray[a].needItemCounts,650 + (90 - gbox.getTextWidth(needInfoArray[a].needItemCounts,14))/2,470 + 25*a,0);
		                      }
		                      var equipNum = equipmentNum.value;
		                      if(successItemBoolean)
		                      {
		                      	if(equipmentNum.value != 0 && equipmentNum.value <= max[0])
			                      {
			                      	   for(var a = 0 ; a<needInfoArray.length; a++)
			                      	   {
			                      	   	       gbox.drawText(needInfoArray[a].needItemCounts * equipNum,829 + (90 - gbox.getTextWidth(needInfoArray[a].needItemCounts * equipNum,14))/2,470 + 25*a,0);
			                      	   }
			                      }
		                      }
		                      			//六个位置图片
										try
										  {
										  	  
											  	gbox.blitTile(gbox.getBufferContext(),
												{
													tileset : "" + productionsArray[0].iconLarge,
													tile : 0,
													dx : 347 + 8,
													dy : 461 + 8,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0
									            });
										  }
										  catch(e)
										  {
										  
										  	    gbox.blitTile(gbox.getBufferContext(),
												{
													tileset : "no_pic",
													tile : 0,
													dx : 347 + 8,
													dy : 461 + 8,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0
									            });
										  }
										  if(gbox.getImage(productionsArray[1].iconLarge)!=null)
										  {
											  	gbox.blitTile(gbox.getBufferContext(),
												{
													tileset : "" + productionsArray[1].iconLarge,
													tile : 0,
													dx : 412 + 8,
													dy : 461 + 8,
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
													tileset : "no_pic",
													tile : 0,
													dx : 412 + 8,
													dy : 461 + 8,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0
									            });
										  }
										  if(gbox.getImage(productionsArray[2].iconLarge)!=null)
										  {
											  	gbox.blitTile(gbox.getBufferContext(),
												{
													tileset : "" + productionsArray[2].iconLarge,
													tile : 0,
													dx : 481 + 8,
													dy : 461 + 8,
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
													tileset : "no_pic",
													tile : 0,
													dx : 481 + 8,
													dy : 461 + 8,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0
									            });
										  }
										  if(gbox.getImage(productionsArray[3].iconLarge)!=null)
										  {
											  	gbox.blitTile(gbox.getBufferContext(),
												{
													tileset : "" + productionsArray[3].iconLarge,
													tile : 0,
													dx : 347 + 8,
													dy : 530 + 8,
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
													tileset : "no_pic",
													tile : 0,
													dx : 347 + 8,
													dy : 530 + 8,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0
									            });
										  }
										  if(gbox.getImage(productionsArray[4].iconLarge)!=null)
										  {
											  	gbox.blitTile(gbox.getBufferContext(),
												{
													tileset : "" + productionsArray[4].iconLarge,
													tile : 0,
													dx : 412 + 8,
													dy : 530 + 8,
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
													tileset : "no_pic",
													tile : 0,
													dx : 412 + 8,
													dy : 530 + 8,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0
									            });
										  }
										  if(gbox.getImage(productionsArray[5].iconLarge)!=null)
										  {
											  	gbox.blitTile(gbox.getBufferContext(),
												{
													tileset : "" + productionsArray[5].iconLarge,
													tile : 0,
													dx : 481 + 8,
													dy : 530 + 8,
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
													tileset : "no_pic",
													tile : 0,
													dx : 481 + 8,
													dy : 530 + 8,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0
									            });
										  }
					 	 			  	  if(((touchMoveX > 345) && (touchMoveX < 394)) && ((touchMoveY > 460) && (touchMoveY<510)))//辅助道具
										  {

											var Item = { slides: [  
																	{ "name": "名称 ： " ,"res":productionsArray[0].equipmentName, "resColor": "#0000ff","color": "#ff0000"},     
																	{ "name": "绑定状态 ： ","res":productionsArray[0].price, "resColor": "#ffffff","color": "#ffffff"},  
																	{ "name": "描述 ： " ,"res":productionsArray[0].description,"resColor": "#ffffff", "color": "#ffffff"}
																]};
										    //gbox.drawMessageObject(Item,365,477,0,12,"#ffffff"); 
										  }
										  if(((touchMoveX > 411) && (touchMoveX < 461)) && ((touchMoveY > 460) && (touchMoveY<510)))//辅助道具
										  {

											var Item = { slides: [  
																	{ "name": "名称 ： " ,"res":productionsArray[1].toolTipInfo.equipmentName, "resColor": "#0000ff","color": "#ff0000"},     
																	{ "name": "绑定状态 ： ","res":productionsArray[1].price, "resColor": "#ffffff","color": "#ffffff"},  
																	{ "name": "描述 ： " ,"res":productionsArray[1].description,"resColor": "#ffffff", "color": "#ffffff"}
																]};
										    //gbox.drawMessageObject(Item,434,478,0,12,"#ffffff"); 
										  }
										  if(((touchMoveX > 479) && (touchMoveX < 527)) && ((touchMoveY > 460) && (touchMoveY<510)))//辅助道具
										  {

											var Item = { slides: [  
																	{ "name": "名称 ： " ,"res":productionsArray[2].equipmentName, "resColor": "#0000ff","color": "#ff0000"},     
																	{ "name": "绑定状态 ： ","res":productionsArray[2].price, "resColor": "#ffffff","color": "#ffffff"},  
																	{ "name": "描述 ： " ,"res":productionsArray[2].description,"resColor": "#ffffff", "color": "#ffffff"}
																]};
										    //gbox.drawMessageObject(Item,503,478,0,12,"#ffffff"); 
										  }
										  if(((touchMoveX > 345) && (touchMoveX < 395)) && ((touchMoveY > 529) && (touchMoveY<577)))//辅助道具
										  {

											var Item = { slides: [  
																	{ "name": "名称 ： " ,"res":productionsArray[3].equipmentName, "resColor": "#0000ff","color": "#ff0000"},     
																	{ "name": "绑定状态 ： ","res":productionsArray[3].price, "resColor": "#ffffff","color": "#ffffff"},  
																	{ "name": "描述 ： " ,"res":productionsArray[3].description,"resColor": "#ffffff", "color": "#ffffff"}
																]};
										    //gbox.drawMessageObject(Item,369,548,0,12,"#ffffff"); 
										  }
										  if(((touchMoveX > 411) && (touchMoveX < 459)) && ((touchMoveY > 529) && (touchMoveY<577)))//辅助道具
										  {

											var Item = { slides: [  
																	{ "name": "名称 ： " ,"res":productionsArray[4].equipmentName, "resColor": "#0000ff","color": "#ff0000"},     
																	{ "name": "绑定状态 ： ","res":productionsArray[4].price, "resColor": "#ffffff","color": "#ffffff"},  
																	{ "name": "描述 ： " ,"res":productionsArray[4].description,"resColor": "#ffffff", "color": "#ffffff"}
																]};
										    //gbox.drawMessageObject(Item,433,548,0,12,"#ffffff"); 
										  }
										  if(((touchMoveX > 479) && (touchMoveX < 529)) && ((touchMoveY > 529) && (touchMoveY<577)))//辅助道具
										  {

											var Item = { slides: [  
																	{ "name": "名称 ： " ,"res":productionsArray[5].equipmentName, "resColor": "#0000ff","color": "#ff0000"},     
																	{ "name": "绑定状态 ： ","res":productionsArray[5].price, "resColor": "#ffffff","color": "#ffffff"},  
																	{ "name": "描述 ： " ,"res":productionsArray[5].description,"resColor": "#ffffff", "color": "#ffffff"}
																]};
										    //gbox.drawMessageObject(Item,479,548,0,12,"#ffffff"); 
										  }
						   if(typeof(userEquipDesignArray[userEquipDesignID]) != "undefined" && drawTuyang )
			 	 			 {      
			 	 			 	    
	                                if(gbox.getImage(userEquipDesignArray[userEquipDesignID].itemIcon)!= null)
	                                {
	                                	gbox.blitTile(gbox.getBufferContext(),
										{
											tileset : "" + userEquipDesignArray[userEquipDesignID].itemIcon,
											tile : 0,
											dx : 348,
											dy : 426,
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
											tileset : 'no_pic',
											tile : 0,
											dx : 348,
											dy : 426,
											fliph : this.fliph,
											flipv : this.flipv,
											camera : this.camera,
											alpha : 1.0
							            });
	                                }

			 	 			 }

					  }					  		  
			}

		}		
	 });

}


