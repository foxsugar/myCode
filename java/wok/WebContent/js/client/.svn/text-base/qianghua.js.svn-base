var tempInfoNum = 0;
var qhInfoLocation = [
   [810,356],[972,356],
   [810,382],[972,382],
   [810,408]
];
var qianghuaItem = function(index)//强化背景
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isQianghuaList = true;
	isXiangqianList = false;
	jiaGong = true;
	gbox.addObject(
	{ 
		id : 'qh_Bg',
		group : 'levelMenu_2',
		tileset : 'jgf_zjm_34',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [320,140], [1116,140], [1116,616],[320,616]],
		initialize : function()
		{	
		},
		
		first : function() 
		{	
		},
		myclick : function()
		{
			 if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
			{//关闭按钮
				exit(index);
				itemName = new Array();
				userItemId = new Array();
				itemLevel = new Array();
				itemIcon = new Array();
//				qhListColor = new Array();	
				stone1Info = new Array();
				stone2Info = new Array();
				stone3Info = new Array();
				stone1 = new Array();
				stone2 = new Array();
				stone3 = new Array();
				itemInfo = new Array();
				strengthenData = new Array();
				jiaGong = true;				
				isQianghuaList = false;
	            isXiangqianList = false;
//				jiaGongfang();
//				changeMap('jiagongfangScreen_Layer');	
			}else{
				jiaGong = true;			
				qianghuaItem(getClickObjectIndex());
				qianghuaList(getClickObjectIndex());
				changeMap('jiagongfangScreen_Layer');
			}
		},
		blit : function()
		{
			if(isDrawUI[index] && isQianghuaList)
			{
			   
			   var ghx = (gbox.getScreenW() - gbox.getImage("jgf_zjm_34").width)/2;
			   var ghy = (gbox.getScreenH() - gbox.getImage("jgf_zjm_34").height)/2;
			   gbox.drawImage('jgf_zjm_34',ghx,ghy);
               var ghx1 = (gbox.getScreenW() - gbox.getImage("ty_an_27").width)/2;
			   var ghy1 = (gbox.getScreenH() - gbox.getImage("ty_an_27").height)/2;
			   gbox.drawImage('ty_an_27',ghx1,ghy1 + 4);
			   gbox.drawImage('jgf_zjm_35',(gbox.getImage('jgf_zjm_34').width - gbox.getImage("jgf_zjm_35").width)/2 + ghx,ghy1+12);
			   gbox.drawLineBreakText(DescriptiveText.jiagongfang.qianghua,380,210,0,705);
			   
			   if(typeof(strengthenData[0]) != "undefined" &&
			      typeof(strengthenData[0].toolTipInfo) != "undefined"){
				   var txtLen = gbox.getTextWidth("" + strengthenData[0].toolTipInfo.equipmentName, 16);
				   var txtX = 674 + (50 - txtLen)/2;
				   gbox.drawString("" + strengthenData[0].toolTipInfo.equipmentName,txtX,405,qualityColor[qhList.mouseUpIndex],16);			   	
			   	   var qhInfo = new Array();
			   	   qhInfo[0] = strengthenData[0].toolTipInfo.heroForce + "(+" + strengthenData[0].toolTipInfo.strengthenForce + ")";
			   	   qhInfo[1] = strengthenData[0].toolTipInfo.strategy + "(+" + strengthenData[0].toolTipInfo.strengthenStrategy + ")";
			   	   qhInfo[2] = strengthenData[0].toolTipInfo.agility + "(+" + strengthenData[0].toolTipInfo.strengthenAgility + ")";
			   	   qhInfo[3] = strengthenData[0].toolTipInfo.physique + "(+" + strengthenData[0].toolTipInfo.strengthenPhysique + ")";
				   gbox.drawText(""+ qhInfo[0],828,363,0);
				   gbox.drawText(""+ qhInfo[1],991,363,0);	
				   gbox.drawText(""+ qhInfo[2],828,400,0);
				   gbox.drawText(""+ qhInfo[3],991,400,0);	
			   	   //下一个强化等级
			   	   
			   	   if(typeof(strengthenData[0].maxLevel) == "undefined"){
				   	   var txtLen2 = gbox.getTextWidth("" + nextLevel, 16);		   
				       var txtX2 = 652 + (400 - txtLen2)/2;
				       gbox.drawText("" + nextLevel,txtX2,478,2);
				       
				       var infomation = "强化增幅：" + strengthenData[0].strengthenMargin + 
				                        "   强化符个数：" + strengthenData[0].strengthenTalisman; 
				       var infomation2 = "强化成功率：" + strengthenData[0].strengthenProbability + ".";
				       var reslut = "";
				       if(typeof(strengthenData[0].isSuccess) !=  "undefined"){
				       	   if(strengthenData[0].isSuccess){
				       	   	 reslut = "强化成功！";
				       	   }else
				       	     reslut = "强化失败！";
				       }
//				       var strArray = gbox.getStringsArray("" + infomation + reslut, 200,16);	
//				       //var txtLen3 = gbox.stringArrayWidth(strArray,16);	   
//				       var txtX3 = 652 + 20;//var txtX3 = 652 + (400 - txtLen3)/2 ;
//				       for(var i=0; i<strArray.length; i++){
//	                      gbox.drawString("" + strArray[i],txtX3,500 + (i * 20),'#CCCC00',16);			       	
//				       }
				       gbox.drawText(infomation,672,500,4);
				       gbox.drawText(infomation2 + '  ' + reslut,672,520,4);
			   	   }else{
				       var txtLen4 = gbox.getTextWidth(strengthenData[0].maxLevel,16);	   
				       var txtX4 = 652 + (400 - txtLen4)/2;
	                   gbox.drawText("" + strengthenData[0].maxLevel,txtX4,500,4);
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
			   //装备图标
			   if(typeof(strengthenData[0]) != "undefined" && 
			      typeof(strengthenData[0].toolTipInfo) != "undefined" ){
				   if(gbox.getImage(strengthenData[0].itemIcon) != null){
				   	  gbox.drawImage('' + strengthenData[0].itemIcon,691,365);
				   }else
				      gbox.drawImage('no_pic',688,362);
	               if(touchMoveX > 691 && touchMoveX < 726 && touchMoveY > 365 && touchMoveY < 400){
//	               	   if(typeof(tempitemInfo) != "undefined"){
//	               	   	  gbox.drawMessageObject(tempitemInfo, lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF');
//	               	   }
	               }				      
			   }			   

			}
		}
	 });

	gbox.addObject(
			{ //button1 
				id : 'qh_button1',
				group : 'levelMenu_2',
				tileset : 'jgf_zjm_34',
				x : 0,
				y : 0,
			    anim : null,
				action : null,
				frame : 0,
				poly : [[478,311],[498,311], [498,331],[478,331]],
				initialize : function()
				{
				},
				first : function() 
				{
				},
				myclick : function()
				{
					if(!comboboxes['positon_qh'].isOpen){
						//下拉框选中方法
						var selected = function(){
							if(isDone_EquipmentByPositonAndType == false){
								BuildingFunction.getEquipmentByPositonAndType(
										comboboxes['positon_qh'].selected.id,
										comboboxes['type_qh'].selected.id,
										doEquipmentByPositonAndType
								);
								isDone_EquipmentByPositonAndType = true;
							}
							qianghuaItem(getClickObjectIndex());
							changeMap('jiagongfangScreen_Layer');
						};
						//绘制下拉框
						var _index = getClickObjectIndex();
						comboboxes['positon_qh'].info(
								_index,
								'qh_combobox1',
								'levelMenu_3',
								'jiagongfangScreen_Layer',
								['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
								407,
								328,
								{widthType:2,isScrolling:false}
						);
						comboboxes['positon_qh'].createCombobox(selected);
					}
					qianghuaItem(getClickObjectIndex());
					qianghuaList(getClickObjectIndex());
                    changeMap('jiagongfangScreen_Layer');
				},
				blit : function()
				{
					if(isDrawUI[index] && isQianghuaList){
						var jfW = gbox.getTextWidth(comboboxes['positon_qh'].selected.txt,14);
						var jfX = 408 + (68 - jfW)/2;
						gbox.drawText(comboboxes['positon_qh'].selected.txt,jfX,310,10);	
//						var jfW = gbox.getTextWidth("" + positonName[positionIndex],14);
//						var jfX = 408 + (68 - jfW)/2;
//						gbox.drawString("" + positonName[positionIndex],jfX, 312,'#FFFFFF',14);
                        //gbox.drawString(typeName[typeIndex],531,310,'FFFFFF',16);						
					}
											     					
				}
			});	
			
	gbox.addObject(
			{ //button2 类型选择
				id : 'qh_button2',
				group : 'levelMenu_2',
				tileset : 'jgf_zjm_34',
				x : 0,
				y : 0,
			    anim : null,
				action : null,
				frame : 0,
				poly : [[578,311],[598,311], [598,331],[578,331]],
				initialize : function()
				{
				},
				first : function() 
				{
				},
				myclick : function()
				{
					if(!comboboxes['type_qh'].isOpen){
						//下拉框选中方法
						var selected = function(){
							if(isDone_EquipmentByPositonAndType == false){
								BuildingFunction.getEquipmentByPositonAndType(
										comboboxes['positon_qh'].selected.id,
										comboboxes['type_qh'].selected.id,
										doEquipmentByPositonAndType
								);
								isDone_EquipmentByPositonAndType = true;
							}
							qianghuaItem(getClickObjectIndex());
							changeMap('jiagongfangScreen_Layer');
						};
						//绘制下拉框
						var _index = getClickObjectIndex();
						comboboxes['type_qh'].info(
								_index,
								'qh_combobox2',
								'levelMenu_3',
								'jiagongfangScreen_Layer',
								['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
								510,
								328,
								{widthType:2,isScrolling:false}
						);
						comboboxes['type_qh'].createCombobox(selected);
					}
					qianghuaItem(getClickObjectIndex());
					qianghuaList(getClickObjectIndex());
                    changeMap('jiagongfangScreen_Layer');
				},
				blit : function()
				{
					if(isDrawUI[index] && isQianghuaList){	
						var jfW = gbox.getTextWidth("" + comboboxes['type_qh'].selected.txt,14);
						var jfX = 510 + (68 - jfW)/2;
						gbox.drawText(comboboxes['type_qh'].selected.txt,jfX,310,10);
					}		     					
				}
			});		
			
	gbox.addObject(
			{ //button3 强化按钮
				id : 'qh_button3',
				group : 'levelMenu_2',
				tileset : 'ty_an_09',
				x : 0,
				y : 0,
			    anim : null,
				action : null,
				frame : 0,
				poly : [[973,559],[1057,556], [1057,588],[973,588]],
				initialize : function()
				{
				},
				first : function() 
				{
				},
				myclick : function()
				{
					if(typeof(userItemId[qhList.mouseUpIndex]) != "undefined"){
						BuildingFunction.strengthenEquipment(userItemId[qhList.mouseUpIndex],doStrengthenEquipment);	
					}else{
						alert("请选择一个装备！");
					}
                    qianghuaItem(getClickObjectIndex());
					changeMap('jiagongfangScreen_Layer');	
				},
				blit : function()
				{
					if(isDrawUI[index] && isQianghuaList){
						gbox.drawImage('ty_an_10',973,558);
						if (mouseArea(this)) {
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'ty_an_09',
								tile : 0,
							    dx :973,
							    dy :558,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						    });	
						}
						var strW = gbox.getTextWidth("强 化",14);
				        var cntX = 973 + (gbox.getImage("ty_an_09").width - strW)/2;
				        var cntY = 558 + (gbox.getImage("ty_an_09").height - 14)/2;
			            gbox.drawText("强 化", cntX,cntY,10);		
					}									     					
				}
			});							 
};

var qianghuaList = function(index)//强化列表
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	jiaGong = true;
	isDrawUI[index] = true;
	isQianghuaList = true;
	gbox.addObject(
	{ 
		id : 'qh_List',
		group : 'levelMenu_2',
		tileset : 'jgf_zjm_34',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [350,352], [648,352], [648,595],[350,595]],
		initialize : function()
		{   
			var content = new Array(itemName,qhListlevel);
            var listLen = content[0].length;
            if(listLen < 9){
            	listLen = 9;
            }
//			guokuList.entryStartIndex = 0;
//			ghOffsetY = qh_OffsetY = 0;
			qhList.init( 'jgf_zjm_18', 'jgf_zjm_19','jgf_zjm_17', 'jgf_zjm_17',qualityColor,content, 330, 342, 1, listLen, 25, 9, false, -190, 0 );
		},
		first : function() 
		{	
		},
		myclick : function()
		{
               // console.log();
			qianghuaItem(getClickObjectIndex());
			changeMap('jiagongfangScreen_Layer');
		},
		blit : function()
		{
			if(isDrawUI[index] && isQianghuaList)
			{
			   qhList.paint( qh_OffsetY, qh_BeginSlip, qh_Time );
			}
		}
	 });
};

//1打开强化界面时，向服务器请求装备分类信息：
function doEquipment(data){
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}		
//    positonID = new Array();
//    positonName = new Array();
//    typeID = new Array();
//    typeName = new Array();
    userItemId = new Array();
    itemName = new Array();
    strengthLevel = new Array();
    itemLevel = new Array();
    qhListlevel = new Array();
//    qhListColor = new Array();
    
    //下拉框数据对象数组
    comboboxes = {};
    var comboboxPositon = new Combobox();
    comboboxPositon.setData(data.positon,'value','name');
    comboboxes['positon_qh'] = comboboxPositon;
    var comboboxType = new Combobox();
    comboboxType.setData(data.type,'value','name');
    comboboxes['type_qh'] = comboboxType;
    
	//返回三组对象数组 position,type,Equipments
//	for(var i=0; i<data.positon.length; i++){
//		var positon = data.positon[i];
//		positonID[i] = positon.value;
//		positonName[i] = positon.name;
//	}
//	
//	for(var i=0; i<data.type.length; i++){
//		var type = data.type[i];
//		typeID[i] = type.value;
//		typeName[i] = type.name;	
//	}

	for(var i=0; i<data.equipments.length; i++){
		var equipments = data.equipments[i];
		userItemId[i] = equipments.id;
		itemName[i] = equipments.equipmentName;
		strengthLevel[i] = equipments.strengthLevel;
		itemLevel[i] = equipments.quality;
		if(equipments.strengthLevel > 0){
			qhListlevel[i] = equipments.strengthLevel + "级强化";
		}else
			qhListlevel[i] = "未强化";
			
//		switch(equipments.quality){
//			case 1:
//				qhListColor[i] = '#FFFFFF';
//			break;
//			case 2:
//				qhListColor[i] = '#1EFF00';
//			break;
//			case 3:
//			    qhListColor[i] = '#0070DD';
//			break;
//			case 4:
//				qhListColor[i] = '#A335EE';
//			break;
//			case 5:
//				qhListColor[i] = '#E5CC80';
//			break;
//		}
	}	
	
	qianghuaItem(getClickObjectIndex());
	qianghuaList(getClickObjectIndex());
	changeMap('jiagongfangScreen_Layer');	
};

//2选择位置和类型后向服务器请求所有装备：
function doEquipmentByPositonAndType(data){
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}	
itemName = new Array();
userItemId = new Array();
strengthLevel = new Array();
itemLevel = new Array();
qhListlevel = new Array();
//qhListColor = new Array();	
strengthenData = new Array();
	for(var i=0; i<data.length; i++){
		var equipments = data[i];
		userItemId[i] = equipments.id;
		itemName[i] = equipments.equipmentName;
		strengthLevel[i] = equipments.strengthLevel;
		itemLevel[i] = equipments.quality;
		if(equipments.strengthLevel > 0){
			qhListlevel[i] = equipments.strengthLevel + "级强化";
		}else
			qhListlevel[i] = "未强化";
			
//		switch(equipments.quality){
//			case 1:
//				qhListColor[i] = '#FFFFFF';
//			break;
//			case 2:
//				qhListColor[i] = '#1EFF00';
//			break;
//			case 3:
//			    qhListColor[i] = '#0070DD';
//			break;
//			case 4:
//				qhListColor[i] = '#A335EE';
//			break;
//			case 5:
//				qhListColor[i] = '#E5CC80';
//			break;
//		}		 
	}
	//http://127.0.0.1:8080/wok/getEquipmentClass
	var content = new Array(itemName,qhListlevel);
            var listLen = content[0].length;
            if(listLen < 9){
            	listLen = 9;
            }
//			guokuList.entryStartIndex = 0;
//			ghOffsetY = qh_OffsetY = 0;
			qhList.init( 'jgf_zjm_18', 'jgf_zjm_19','jgf_zjm_17', 'jgf_zjm_17',qualityColor,content, 330, 342, 1, listLen, 25, 9, false, -190, 0 );
	isDone_EquipmentByPositonAndType = false;	
};

//3选择要强化的装备后，返回 装备属性，强化增幅，强化符个数，强化成功率：
function doEquipmentStrengthenInfo(data){//userItemId,callback
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
} 
var temp = data.equipment;
strengthenData = new Array();
    if(typeof(data.maxLevel) == "undefined"){
    	
		strengthenData[0] = {nextStrengthenLevel:data.strengthenInfo.nextStrengthLevel,//要强化的级别
			                 strengthenMargin:data.strengthenInfo.strengthenMargin,//强化增幅
		                     strengthenTalisman:data.strengthenInfo.needMaterialAmount,//强化符个数
		                     strengthenProbability:data.strengthenInfo.strengthenProbability,//强化成功率
		                     userItemId:data.equipment.id,//用户物品编号	  
		                     itemIcon:data.equipment.icon,//物品图标名	                  
		                     toolTipInfo:{
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
		  
		if(strengthenData[0].nextStrengthenLevel > 0)
		{
			nextLevel = strengthenData[0].nextStrengthenLevel + "级强化";
		}else
			nextLevel = "未强化";   	
    }else{
    	
		strengthenData[0] = {
			                 
			                 //nextStrengthenLevel:data.strengthenInfo.nextStrengthLevel,//要强化的级别
			                 //strengthenMargin:data.strengthenInfo.strengthenMargin,//强化增幅
		                     //strengthenTalisman:data.strengthenInfo.needMaterialAmount,//强化符个数
		                    // strengthenProbability:data.strengthenInfo.strengthenProbability,//强化成功率
		                  //装备属性
		                     maxLevel : data.maxLevel,
			                 userItemId:data.equipment.id,//用户物品编号	  
		                     itemIcon:data.equipment.icon,//物品图标名	                  
		                     toolTipInfo:{
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
    }  
                            if(typeof(temp.toolTipInfo.isBop) != "undefined")
					        {
					        	strengthenData[0].toolTipInfo.isbag = false;
					        }
					        else
					        {
					        	strengthenData[0].toolTipInfo.isbag = true;
					        }
					        if(typeof(temp.toolTipInfo.stone1) != "undefined")
					        {
					        	strengthenData[0].toolTipInfo.stone1 = true;
					        	strengthenData[0].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
					        	strengthenData[0].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
					        }
					        else
					        {
					        	strengthenData[0].toolTipInfo.stone1 = false;
					        	strengthenData[0].toolTipInfo.stoneName1 = "";
					        	strengthenData[0].toolTipInfo.stoneNameDesc1 = "";
					        }
					        if(typeof(temp.toolTipInfo.stone2) != "undefined")
					        {
					        	strengthenData[0].toolTipInfo.stone2 = true;
					        	strengthenData[0].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
					        	strengthenData[0].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
					        }
					        else
					        {
					        	strengthenData[0].toolTipInfo.stone2 = false;
					        	strengthenData[0].toolTipInfo.stoneName2 = "";
					        	strengthenData[0].toolTipInfo.stoneNameDesc2 = "";
					        }
					        if(typeof(temp.toolTipInfo.stone3) != "undefined")
					        {
					        	strengthenData[0].toolTipInfo.stone3 = true;
					        	strengthenData[0].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
					        	strengthenData[0].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
					        }
					        else
					        {
					        	strengthenData[0].toolTipInfo.stone3 = false;
					        	strengthenData[0].toolTipInfo.stoneName3 = "";
					        	strengthenData[0].toolTipInfo.stoneNameDesc3 = "";
					        }
    //tempitemInfo = qianghuaTip(strengthenData[0].equipment,strengthenData[0].toolTipInfo);
};
var nextLevel = 0;
//4强化
function doStrengthenEquipment(data){
						    if(typeof(data.error) != "undefined")
						    {
									alert("系统提示：" + data.error);
									return;
							}
							var temp = data.equipment;
						    strengthenData = new Array();
							strengthenData[0] = 
							{
								                     isSuccess:data.isSuccess,//强化是否成功
								                     nextStrengthenLevel:data.strengthenInfo.nextStrengthLevel,//要强化的级别
									                 strengthenMargin:data.strengthenInfo.strengthenMargin,//强化增幅
								                     strengthenTalisman:data.strengthenInfo.needMaterialAmount,//强化符个数
								                     strengthenProbability:data.strengthenInfo.strengthenProbability,//强化成功率
								                  //装备属性
								                     userItemId:data.equipment.id,//用户物品编号	  
								                     itemIcon:data.equipment.icon,//物品图标名	                  
								                     toolTipInfo:{
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
					        	strengthenData[0].toolTipInfo.isbag = false;
					        }
					        else
					        {
					        	strengthenData[0].toolTipInfo.isbag = true;
					        }
					        if(typeof(temp.toolTipInfo.stone1) != "undefined")
					        {
					        	strengthenData[0].toolTipInfo.stone1 = true;
					        	strengthenData[0].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
					        	strengthenData[0].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
					        }
					        else
					        {
					        	strengthenData[0].toolTipInfo.stone1 = false;
					        	strengthenData[0].toolTipInfo.stoneName1 = "";
					        	strengthenData[0].toolTipInfo.stoneNameDesc1 = "";
					        }
					        if(typeof(temp.toolTipInfo.stone2) != "undefined")
					        {
					        	strengthenData[0].toolTipInfo.stone2 = true;
					        	strengthenData[0].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
					        	strengthenData[0].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
					        }
					        else
					        {
					        	strengthenData[0].toolTipInfo.stone2 = false;
					        	strengthenData[0].toolTipInfo.stoneName2 = "";
					        	strengthenData[0].toolTipInfo.stoneNameDesc2 = "";
					        }
					        if(typeof(temp.toolTipInfo.stone3) != "undefined")
					        {
					        	strengthenData[0].toolTipInfo.stone3 = true;
					        	strengthenData[0].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
					        	strengthenData[0].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
					        }
					        else
					        {
					        	strengthenData[0].toolTipInfo.stone3 = false;
					        	strengthenData[0].toolTipInfo.stoneName3 = "";
					        	strengthenData[0].toolTipInfo.stoneNameDesc3 = "";
					        }
	var currentLevel;
	if(strengthenData[0].nextStrengthenLevel > 0)
			currentLevel = strengthenData[0].toolTipInfo.strengthenLevel + "级强化";
	else
			currentLevel = "未强化";   
	if(strengthenData[0].nextStrengthenLevel > 0){
			nextLevel = strengthenData[0].nextStrengthenLevel + "级强化";
		}else
			nextLevel = "未强化";   	 
					
    //tempitemInfo = qianghuaTip(strengthenData[0].equipment,strengthenData[0].toolTipInfo);
    //if(data.isSuccess)
    {
    	 for(var i =0; i<itemName.length; i++)
		    {
		    	if(itemName[i] == strengthenData[0].toolTipInfo.equipmentName)
		    	{
		    		if(userItemId[i] == strengthenData[0].userItemId)
		    		    qhListlevel[i] = currentLevel;
		    	}
		    }
    }
   
	var content = new Array(itemName,qhListlevel);
            var listLen = content[0].length;
            if(listLen < 9){
            	listLen = 9;
            }            
//			qhList.entryStartIndex = 0;
//			ghOffsetY = qh_OffsetY = 0;
            qhList.update(content,qualityColor,listLen);
			//qhList.init( 'qianghua_bar', 'qianghua_bar0', 'qianghua_bar0','qianghua_bar1',qhListColor,content, 330, 342, 1, listLen, 25, 9, false, -190, 0 );
}





var itemInfoStr = new Array();
var item;
var qianghuaTip = function(object,tempitem)
{
	
	//console.log("==" + tempitem);
	item = tempitem;
	switch(object.itemType)
	{
		case 1: //装备

			  var levelStr = "";
		      switch(item.itemLevel){
		        	case 1:
		        	levelStr = "白色";
		        	break;
		        	case 2:
		        	levelStr = "绿色";
		        	break;
		        	case 3:
		        	levelStr = "蓝色";
		        	break;
		        	case 4:
		        	levelStr = "紫色";
		        	break;
		        	case 5:
		        	levelStr = "橙色";
		        	break;        	        	        	
		        }
		      
		        if(typeof(object) != "undefined")//强化界面特殊处理
		        {
		        	  itemInfoStr[0] = { slides: [
								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "品级 ： " ,"res":levelStr, "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "绑定 ： " ,"res":object.bindState == 0? "未绑定":"绑定", "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "武力 ： " ,"res":item.heroForce/* == 0?item.attack : object.equipment.strengthenAttack == 0 ?item.attack:item.attack + "(" + " + " + object.equipment.strengthenAttack + ")"*/, "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "谋略 ： " ,"res":item.strategy/* == 0?item.defence: object.equipment.strengthenDefence == 0?item.defence:item.defence + "(" + " + " + object.equipment.strengthenDefence + ")"*/, "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "体质 ： " ,"res":item.physique /*== 0?item.stamina: object.equipment.strengthenStamina == 0?item.stamina:item.stamina + "(" + " + " + object.equipment.strengthenStamina + ")"*/, "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "身法 ： " ,"res":item.agility /*== 0?item.agility: object.equipment.strengthenAgility == 0?item.agility:item.agility + "(" + " + " + object.equipment.strengthenAgility + ")"*/, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "智力 ： " ,"res":item.intelligence == 0?item.intelligence:item.intelligence + "(" + " + " + object.equipment.strengthenIntelligence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "统帅 ： " ,"res":item.commandNum, "resColor": "#ffffff","color": "#ffffff"},	
											  { "name": "装备等级 ： " ,"res":item.needLevel, "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "强化等级 ： " ,"res":object.strengthLevel, "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "价格 ： " ,"res":item.salePrice, "resColor": "#ffffff","color": "#ffffff"},		
											  { "name": "插孔1 ： " ,"res":object.hole1, "resColor": "#ffffff","color": "#ffffff"},	
											  { "name": "插孔2 ： " ,"res":object.hole2, "resColor": "#ffffff","color": "#ffffff"},
											  { "name": "插孔3 ： " ,"res":object.hole3, "resColor": "#ffffff","color": "#ffffff"},	
								 ]};
		        }
		       
//		        if(typeof(object.strengthenAttack)!= "undefined")
//		        {
//		        	  itemInfoStr[0] = { slides: [
//								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
//											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "品级 ： " ,"res":levelStr, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "绑定 ： " ,"res":object.bindState == 0? "未绑定":"绑定", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "攻击 ： " ,"res":item.attack == 0?item.attack : object.strengthenAttack == 0 ?item.attack:item.attack + "(" + " + " + object.strengthenAttack + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "防御 ： " ,"res":item.defence == 0?item.defence: object.strengthenDefence == 0?item.defence:item.defence + "(" + " + " + object.strengthenDefence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "体力 ： " ,"res":item.stamina == 0?item.stamina: object.strengthenStamina == 0?item.stamina:item.stamina + "(" + " + " + object.strengthenStamina + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "敏捷 ： " ,"res":item.agility == 0?item.agility: object.strengthenAgility == 0?item.agility:item.agility + "(" + " + " + object.strengthenAgility + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "智力 ： " ,"res":item.intelligence == 0?item.intelligence:item.intelligence + "(" + " + " + object.strengthenIntelligence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "统帅 ： " ,"res":item.commandNum, "resColor": "#ffffff","color": "#ffffff"},	
//											  { "name": "装备等级 ： " ,"res":item.needLevel, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "强化等级 ： " ,"res":object.strengthLevel, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "价格 ： " ,"res":item.salePrice, "resColor": "#ffffff","color": "#ffffff"},		
//											  { "name": "插孔1 ： " ,"res":object.hole1, "resColor": "#ffffff","color": "#ffffff"},	
//											  { "name": "插孔2 ： " ,"res":object.hole2, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "插孔3 ： " ,"res":object.hole3, "resColor": "#ffffff","color": "#ffffff"},	
//								 ]};
//		        	
//		        }
			  

			    for(var a = 0; a<itemInfoStr[0].slides.length; a++)
			    {
			        
			    	if(itemInfoStr[0].slides[a].res == 0)
			    	{
			    		itemInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
		  break;
		  case 2://道具
		      
			  itemInfoStr[0] = { slides: [
								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
			    {
			        
			    	if(itemInfoStr[0].slides[a].res == 0)
			    	{
			    		itemInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
		  break;
		  case 3://材料
              
			  itemInfoStr[0] = { slides: [
								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
			    {
			        
			    	if(itemInfoStr[0].slides[a].res == 0)
			    	{
			    		itemInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
		 break;
		 case 4://任务
		      
			  itemInfoStr[0] = { slides: [
								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
			    {
			        
			    	if(itemInfoStr[0].slides[a].res == 0)
			    	{
			    		itemInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
		 break;
		 
	}
	return itemInfoStr[0];
};