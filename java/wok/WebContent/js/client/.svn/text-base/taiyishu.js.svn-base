var isTaiyishu = false;
var taiyishu = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isTaiyishu = true;
	isJunjichu = false;
	isJinjie = false;
	isQiansan = false;
	isJunying = false;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('tys_zjm_01').width;
	var bH = gbox.getImage('tys_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	    
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;  
		gbox.addObject(
			{ 
				id : 'taiyishu',
				group : 'levelMenu_2',
				tileset : 'tys_zjm_01',
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
						displayDestroy();
						isJunjichuList = false;
						isTaiyishu = false;
						exit(index);
						curGroup = 'cityMenu';
						enterCityMenu(curGroup);
	                    changeMap('cityMenuLayer');	
					}
					else 
					if(((lastTouchMoveX > 1008) && (lastTouchMoveX < (1008 + 84))) && ((lastTouchMoveY > 274) && (lastTouchMoveY<(274 + 26))))
					{
						if(typeof(userHero) != "undefined"){
							BuildingFunction.cureAllUserHero(doCureAllUserHero);
						}else
							alert("全部治疗：没有可操作数据！"); 
					}else
					//
					if(MouseWheelList.isListArea(lastTouchMoveX,lastTouchMoveY)){
						if(MouseWheelList.isListClick(lastTouchMoveX,lastTouchMoveY)){
							var listIndex = MouseWheelList.getLineIndex(lastTouchMoveX,lastTouchMoveY);
							if((985 < lastTouchMoveX) && (lastTouchMoveX < (985 + 42))){
								if(typeof(userHero) != "undefined" && userHero[listIndex].canCure)
									BuildingFunction.cureUserHero(userHero[listIndex].userHeroId,doCureUserHero);
//								console.log('治疗：'+userHero[listIndex].heroName);
							}else{
								if(userHero[listIndex])
									//选中
									MouseWheelList.store.selectIndex = listIndex;
							}
							
							
						}
					}
					else{
						commandBuildBtn(lotIndex,"建筑加速");
						taiyishu(getClickObjectIndex());
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isTaiyishu)
					 {
					 	gbox.drawImage("tys_zjm_01",backdropX,backdropY);
					 	gbox.drawImage("ty_an_27",backdropX1,backdropY1 + 4);
					    gbox.drawImage('tys_zjm_02',(gbox.getImage('tys_zjm_01').width - gbox.getImage("tys_zjm_02").width)/2 + backdropX,backdropY1);
//					 	var asX = 576 + (gbox.getImage('button2').width - gbox.getImage('buyDrug').width)/2;
//					 	var asY = 274 + (gbox.getImage('button2').height - gbox.getImage('buyDrug').height)/2;
//					 	gbox.drawImage('buyDrug',asX,asY);	
					    gbox.drawImage('ty_an_10',574,273);
						if(((touchMoveX > 576) && (touchMoveX < (576 + 84))) && ((touchMoveY > 274) && (touchMoveY<(274 + 26))))
						{
							gbox.drawImage('ty_an_09',574,273);						
						}
                        var strW = gbox.getTextWidth("购买膏药",14);
			            var cntX = 574 + (gbox.getImage("ty_an_09").width - strW)/2;
			            var cntY = 273 + (gbox.getImage("ty_an_09").height - 14)/2;
			            gbox.drawDanceString("购买膏药", cntX,cntY,14,'#000000','#ffffff');	
//					 	var asX = 1008 + (gbox.getImage('button2').width - gbox.getImage('allCure').width)/2;
//					 	var asY = 274 + (gbox.getImage('button2').height - gbox.getImage('allCure').height)/2;
//					 	gbox.drawImage('allCure',asX,asY);	
			            gbox.drawImage('ty_an_10',1006,273);
						if(((touchMoveX > 1008) && (touchMoveX < (1008 + 84))) && ((touchMoveY > 274) && (touchMoveY<(274 + 26))))
						{
							gbox.drawImage('ty_an_09',1006,273);					
						}						
						var strW = gbox.getTextWidth("全部治疗",14);
			            var cntX = 1006 + (gbox.getImage("ty_an_09").width - strW)/2;
			            var cntY = 273 + (gbox.getImage("ty_an_09").height - 14)/2;
			            gbox.drawDanceString("全部治疗", cntX,cntY,14,'#000000','#ffffff');	
						if(typeof(medicineAmount) != "undefined")
						{
						     gbox.drawString("" + medicineAmount,460, 283,'#FFFFFF',14);
						}
						if(typeof(medicineLimit) != "undefined")
						{
						     gbox.drawString("/" + medicineLimit,486, 283,'#FFFFFF',14);
						}
						drawBuildCommandBtn(); 
//			            gbox.drawTxtRect(buildCommonDesc[lotIndex],450,190,500,70,20,'#ffffff','#000000');
//			            gbox.drawText(buildCommonDesc[lotIndex],450,190,0);
			            gbox.drawLineBreakText(buildCommonDesc[lotIndex],444,198,0,544);
			            if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						   }
			            
			          //鼠标滚动
						MouseWheelList.listMove(touchMoveX,touchMoveY);
						
						MouseWheelList.draw.clipArea(
							function(x,y){
								drawTaiyishuList(x,y,userHero,26,touchMoveX,touchMoveY);	
							}
						);
			            
					 }						
				}
			});
};

function drawTaiyishuList(x,y,list,h,touchMoveX,touchMoveY){
	var fcolor = '#ffffff';
	var lineColor = "#000000";
	var fontSize = 13;
	for(var i=0; i<list.length; i++){
		var lh = y + i*h;
		var th = lh + 5;
		var ix = (x+210+102+130+147)+(110 - gbox.getImage('tys_zjm_03').width)/2;
		var ih = lh + (h - gbox.getImage('tys_zjm_03').height)/2;
		
		//行底图
		gbox.drawImage('tys_zjm_07',x,lh);
		//鼠标经过行底图
		if(((x < touchMoveX) && (touchMoveX < (x + 721))) && 
		    (((lh) < touchMoveY) && (touchMoveY < (lh + h)))){
			gbox.drawImage('tys_zjm_08',x,lh);
		}
		if(MouseWheelList.store.selectIndex == i){
			gbox.drawImage('tys_zjm_09',x,lh);
		}
		//武将
		gbox.drawString(list[i].heroName,EnvironsScreenBattleClass.draw.getCenterX(x,124,list[i].heroName,fontSize),th,fcolor,fontSize);
		//等级
		gbox.drawString(list[i].level,EnvironsScreenBattleClass.draw.getCenterX(x+126,82,list[i].level,fontSize),th,fcolor,fontSize);
		//健康度
		gbox.drawString(list[i].health,EnvironsScreenBattleClass.draw.getCenterX(x+210,100,list[i].health,fontSize),th,fcolor,fontSize);
		//战斗力下降
		gbox.drawString(list[i].lostEvaluate,EnvironsScreenBattleClass.draw.getCenterX(x+210+102,128,list[i].lostEvaluate,fontSize),th,fcolor,fontSize);
		//需要消耗膏药
		gbox.drawString(list[i].needMedicine,EnvironsScreenBattleClass.draw.getCenterX(x+210+102+130,146,list[i].needMedicine,fontSize),th,fcolor,fontSize);
		//操作
		if(list[i].canCure)
			gbox.drawImage('tys_zjm_04',ix,ih);
		else
			gbox.drawImage('tys_zjm_03',ix,ih);
		//经过按钮
//		if(((ix < touchMoveX) && (touchMoveX < (ix + 42))) && 
//			    (((ih) < touchMoveY) && (touchMoveY < (ih + 21)))){
//			//if(list[i].needMedicine > 0)
//			  if(list[i].canCure)
//				gbox.drawImage('tys_zjm_04',ix,ih);
//		}
		
		MouseWheelList.draw.line(x,lh+h,721,null,lineColor);
	}
	MouseWheelList.draw.line(x+125,y,null,list.length*h,lineColor);
	MouseWheelList.draw.line(x+210,y,null,list.length*h,lineColor);
	MouseWheelList.draw.line(x+210+102,y,null,list.length*h,lineColor);
	MouseWheelList.draw.line(x+210+102+130,y,null,list.length*h,lineColor);
	MouseWheelList.draw.line(x+210+102+130+147,y,null,list.length*h,lineColor);
}

//太医署初始化
var isFristInit = true;
var medicineAmount = undefined;
var medicineLimit;
var userHero = new Array();
function doInitHospital(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	medicineAmount = undefined;
	medicineAmount = data.midecine;//膏药数量
	medicineLimit = data.medicineLimit;//数量上限
	userHero = new Array();
	//1.武将信息
	for(var i=0; i<data.hero.length; i++){
		var temp = data.hero[i];
		userHero[i] = {
				canCure:temp.canCure,//能否治疗
				userHeroId:temp.id,//武将ID
				heroName:temp.toolTipInfo.heroName,//武将名
				level:temp.toolTipInfo.level,//武将等级
				health:temp.health,//健康度
				lostEvaluate:temp.fightingCapacity,//战斗力下降
				needMedicine:temp.needMedicine,//健康度达到100%需要的膏药数
				toolTipInfo:{
					agility : temp.toolTipInfo.agility,
					command : temp.toolTipInfo.command,
					heroForce : temp.toolTipInfo.heroForce,
					heroName : temp.toolTipInfo.heroName,
					heroType : temp.toolTipInfo.heroType,
					level : temp.toolTipInfo.level,
					mp : temp.toolTipInfo.mp,
					mpMax : temp.toolTipInfo.mpMax,
					physique : temp.toolTipInfo.physique,
					quality : temp.toolTipInfo.quality,
					stamina : temp.toolTipInfo.stamina,
					staminaMax : temp.toolTipInfo.staminaMax,
					strategy : temp.toolTipInfo.strategy,	
				}
				
		};
	}
	MouseWheelList.draw.listSet(gbox.getBufferContext(),
			[361,301,721,283],
			26,10,
			userHero.length,24
	);
	taiyishu(getClickObjectIndex());
//	taiyishuList(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

function doCureAllUserHero(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	medicineAmount = undefined;
	medicineAmount = data.midecine;//膏药数量
	userHero = new Array();
	//1.武将信息
	for(var i=0; i<data.hero.length; i++){
		var temp = data.hero[i];
		userHero[i] = {
				canCure:temp.canCure,//能否治疗
				userHeroId:temp.id,//武将ID
				heroName:temp.toolTipInfo.heroName,//武将名
				level:temp.toolTipInfo.level,//武将等级
				health:temp.health,//健康度
				lostEvaluate:temp.fightingCapacity,//战斗力下降
				needMedicine:temp.needMedicine,//健康度达到100%需要的膏药数
				toolTipInfo:{
					agility : temp.toolTipInfo.agility,
					command : temp.toolTipInfo.command,
					heroForce : temp.toolTipInfo.heroForce,
					heroName : temp.toolTipInfo.heroName,
					heroType : temp.toolTipInfo.heroType,
					level : temp.toolTipInfo.level,
					mp : temp.toolTipInfo.mp,
					mpMax : temp.toolTipInfo.mpMax,
					physique : temp.toolTipInfo.physique,
					quality : temp.toolTipInfo.quality,
					stamina : temp.toolTipInfo.stamina,
					staminaMax : temp.toolTipInfo.staminaMax,
					strategy : temp.toolTipInfo.strategy,	
				}
				
		};
	}
//	if(typeof(tyslist) != "undefined"){
//		tyslist.entirelyHandle1();
//	}
	 
//	updataTaiyishu();
//	var content = new Array(itemName,itemLevel,itemHealth,itemLostEvaluate,itemNeedMedicine,itemIcon);
//    var listLen = content[0].length;
//    if(listLen < 10){
//    	listLen = 10;
//    }   
//    tyslist.update(content, null, listLen);
}

function doCureUserHero(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	medicineAmount = undefined;
	medicineAmount = data.midecine;//膏药数量
	userHero = new Array();
	//1.武将信息
	for(var i=0; i<data.hero.length; i++){
		var temp = data.hero[i];
		userHero[i] = {
				canCure:temp.canCure,//能否治疗
				userHeroId:temp.id,//武将ID
				heroName:temp.toolTipInfo.heroName,//武将名
				level:temp.toolTipInfo.level,//武将等级
				health:temp.health,//健康度
				lostEvaluate:temp.fightingCapacity,//战斗力下降
				needMedicine:temp.needMedicine,//健康度达到100%需要的膏药数
				toolTipInfo:{
					agility : temp.toolTipInfo.agility,
					command : temp.toolTipInfo.command,
					heroForce : temp.toolTipInfo.heroForce,
					heroName : temp.toolTipInfo.heroName,
					heroType : temp.toolTipInfo.heroType,
					level : temp.toolTipInfo.level,
					mp : temp.toolTipInfo.mp,
					mpMax : temp.toolTipInfo.mpMax,
					physique : temp.toolTipInfo.physique,
					quality : temp.toolTipInfo.quality,
					stamina : temp.toolTipInfo.stamina,
					staminaMax : temp.toolTipInfo.staminaMax,
					strategy : temp.toolTipInfo.strategy,	
				}
				
		};
	}

//	updataTaiyishu();
//	var content = new Array(itemName,itemLevel,itemHealth,itemLostEvaluate,itemNeedMedicine,itemIcon);
//    var listLen = content[0].length;
//    if(listLen < 10){
//    	listLen = 10;
//    }   
//    tyslist.update(content, null, listLen);
	
//    tyslist.rectSelected[tysListIndex] = false;
//	for(var j=0; j<tyslist._passIndex.length; j++){
//		if(tysListIndex == tyslist._passIndex[j]){
//			tyslist._passIndex = tyslist._passIndex.del(j);
//			tyslist._passCnt = tyslist._passIndex.length;
//		}
//	}
}
//
//
//var tysListIndex = 0;
//var tysItem = new Array();
//tysItem[0] = "cure";
//var tysItem1 = new Array();
//tysItem1[0] = "curel";
//var isTaiyishuList = false;
//var taiyishuList = function(index)//太医署列表
//{
//	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
//	isDrawUI[index] = true;
//	isTaiyishuList = true;
//	tysListIndex = -1;
//	gbox.addObject(
//			{ 
//				id : 'tyslist',
//				group : 'levelMenu_2',
//				tileset : 'tys_zjm_01',
//				x : 0,
//				y : 0,
//				frame : 0,
//				poly : [ [360,300], [1085,300], [1085,586],[360,586]],
//				initialize : function()
//				{
//					updataTaiyishu();
//					var content = new Array(itemName,itemLevel,itemHealth,itemLostEvaluate,itemNeedMedicine,itemIcon);
//		            var listLen = content[0].length;
//		            if(listLen < 10){
//		            	listLen = 10;
//		            }   
//		            console.log(content);
//		            tysOffsetY = tys_OffsetY = 0;
//		            tyslist.init( 'jjc_zjm_16','jjc_zjm_14', 'jjc_zjm_23', 'jjc_zjm_15',null,content, 342, 305, 1, listLen, 26, 10, false, -598, 0 );
//		            tyslist.fontSize = 12;
//				},
//				first : function() 
//				{	
//				},
//				myclick : function()
//				{
//					if(tyslist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
//					{
//						if(Math.abs(tysOffsetY) > 12)
//						{
//							tysOffsetY=12*(tysOffsetY/Math.abs(tysOffsetY));
//						}
//						tys_OffsetY = tysOffsetY;
//						tys_BeginSlip = true;
//						tys_Time = 0;
//						taiyishu(getClickObjectIndex());
//						updataTaiyishu();
//						changeMap('cityMenuLayer');	
//					}else{	
//						tysListIndex = tyslist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
//						console.log("tysIndex = " + tysListIndex);
//						taiyishu(getClickObjectIndex());
//						changeMap('cityMenuLayer');	
// 						if(((lastTouchMoveX > 984) && (lastTouchMoveX < (984 + 42))))
//						{
// 							if(typeof(userHero) != "undefined" && userHero[tysListIndex].canCure){
// 								BuildingFunction.cureUserHero(userHero[tysListIndex].userHeroId,doCureUserHero);
// 							}
//						}
// 						tyslist.radioHandle(tysListIndex);
//					}	
//					
//   		          	if(gbox._mouseArea(tyslist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
//   		          	    tyslist.keyUp();
//   		          	    
//		            }
//		          	if(gbox._mouseArea(tyslist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
//		          		tyslist.keyDown();
//		            }
//				},
//		blit : function()
//		{
//			
//			if(isDrawUI[index] && isTaiyishuList)
//			{
//				tyslist.paint( tys_OffsetY, tys_BeginSlip, tys_Time );
//				
////				gbox.drawImage('jjc_zjm_22',486,326);	
////				gbox.drawImage('jjc_zjm_22',571,326);	
////				gbox.drawImage('jjc_zjm_22',673,326);
////				gbox.drawImage('jjc_zjm_22',802,326);
////				gbox.drawImage('jjc_zjm_22',950,326);
//			}
//		}
//	 });
//};
//
//var updataTaiyishu = function(){
//	if(typeof(userHero) != "undefined"){
//		itemIcon = new Array();
//		itemName = new Array();
//		itemLevel = new Array();
//		itemHealth = new Array();
//		itemLostEvaluate = new Array();
//		itemNeedMedicine = new Array();
//			for(var i=0; i< userHero.length; i++){
//				if(typeof(userHero[i]) != "undefined"){
//					itemName[i] =  "" + userHero[i].heroName;
//					itemLevel[i] = "" + userHero[i].level;
//					itemHealth[i] = "" + userHero[i].health;
//					itemLostEvaluate[i] = "" + userHero[i].lostEvaluate;
//					itemNeedMedicine[i] = "" + userHero[i].needMedicine;
//					
//					if(userHero[i].canCure)
//						itemIcon.push(tysItem1);
//					else
//						itemIcon.push(tysItem);
//					
//				}
//			}
//	}
//}
