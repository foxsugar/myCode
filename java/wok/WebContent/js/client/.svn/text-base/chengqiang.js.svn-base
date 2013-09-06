var isSelectArray = new Array();
isSelectArray[0] = true;
isSelectArray[1] = false;
isSelectArray[2] = false;
var isItemArray = new Array();
isItemArray[0] = false;
isItemArray[1] = false;
isItemArray[2] = false;
isItemArray[3] = false;
isItemArray[4] = false;
isItemArray[5] = false;
var isChengQiangGen = new Array();
var isChengQiang = false;
//换将参数对象
var changeGeneral = {  
	isChangeGeneral : false, 
	orderIndex : -1,			 //武将次序索引 0开始
	selectId : -1				 //单击武将Id
};
//选择武将对象
var selectGeneral = {
	isSelectGeneral : false,
	heroes : new Array()     //武将在城防界面的武将id集合
};
//部队战斗力
var totalForce = 0;
//城墙耐久
var wallDurable = 0;
//选中阵型
var formation = {
	id : '',
	text : '无',
	obj : null
};
var isDefenceWorks = true;
var chengfangArray = new Array();
var chengfangData = false;
var chengfangDefenceData = false;
var soldierAmo;
var allRiver;
var blockedRiver;
var needMoney;
var needPeople;
var chengfangRiverInfo = false;
var gfListIndex = 0;
var gfTimeInterval = null;
var cqArea = [
              [[587,286],[663,286],[663,361],[587,361]],
              [[774,286],[847,286],[847,361],[774,361]],
              [[961,286],[1035,286],[1035,361],[961,361]],
              [[588,407],[661,407],[661,481],[588,481]],
              [[961,407],[1034,407],[1034,481],[961,481]],
             ];
var chengQiang = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isChengqiang = true;
	var bW = gbox.getImage('cq_zjm_00').width;
	var bH = gbox.getImage('cq_zjm_00').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2; 
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 30;	
	 var rectW = gbox.getImage('cq_zjm_07').width;
 	 var rectH = gbox.getImage('cq_zjm_07').height;
		gbox.addObject(
			{ 
				id : 'chengqiang',
				group : 'levelMenu_2',
				tileset : 'cq_zjm_00',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					if(isDefenceWorks)
					{
						if(divGFNum == null && !gbox._isIndwellDiv("divGFNum","input"))
						{
							divGFNum = addDivWindowBg(1004,534);
							divGFNum.id = 'divGFNum';
							document.body.appendChild(divGFNum);
							gfAuctionNum = document.createElement("input");
							gfAuctionNum.style.id = 'divjunjichuNum';
							gfAuctionNum.style.backgroundColor = '#000000';
							gfAuctionNum.style.width = '60px';
							gfAuctionNum.style.color = '#ffffff';
							gfAuctionNum.value = 1;
							divGFNum.appendChild(gfAuctionNum);            
						}
						
						BuildingFunction.getAllWallDefensen(dogetDefenceworks);
						isDefenceWorks = false;
					}
					
				},
				first : function() 
				{
					
                    /*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(divGFNum,"divGFNum",1004);
					/*======================================================*/	
					if(divGFNum != null && gbox._isIndwellDiv("divGFNum","input"))
					     gfAuctionNum.value = gfAuctionNum.value.replace(/\D/g,'');
				
					if(typeof(cfInfo) != "undefined"){
		    			if(gfAuctionNum.value > (cfInfo.limit - cfInfo.amount)){	
		    				gfAuctionNum.value = (cfInfo.limit - cfInfo.amount);
		    			}else
		    			if(gfAuctionNum.value < 0)
		    				gfAuctionNum.value = 0;
					}
					if(gfRemainTime ==  "00:00:00"){
						if(gfTimeInterval != null){
							clearInterval(gfTimeInterval);
							gfCnt = 0;
							gfTimeInterval = null;
							gfRemainTime =  "等待刷新！";
						}
						BuildingFunction.getAllWallDefensen(doDefenceworks);
					}
					
				},
				myclick : function()
				{
					if(((384 < lastTouchMoveX) && (lastTouchMoveX < 517)) && ((305 < lastTouchMoveY) && (lastTouchMoveY < 355)))
					{
						isSelectArray[0] = true;
						for(var i = 0 ; i<isSelectArray.length; i++)
						{
							if(i!=0)
							{
								isSelectArray[i] = false;
							}else
								BuildingFunction.getAllWallDefensen(dogetDefenceworks);
						}
					}else
					if(((384 < lastTouchMoveX) && (lastTouchMoveX < 517)) && ((374 < lastTouchMoveY) && (lastTouchMoveY < 414)))
					{
						isSelectArray[1] = true;
						for(var i = 0 ; i<isSelectArray.length; i++)
						{
							if(i!=1)
							{
								isSelectArray[i] = false;
							}else{
								BuildingFunction.getAllWallHeros(dogetDefenceHero);
								
								chengQiang(getClickObjectIndex());
							    changeMap('cityMenuLayer');
							}
								
						}
					}else
					if(isSelectArray[0])
					{

				    	if(gfRemainTime != "等待刷新！"){
				            if(((850 < lastTouchMoveX) && (lastTouchMoveX < (850 + 18))) && ((496 < lastTouchMoveY) && (lastTouchMoveY < (496 + 18))))
				            {
					               systemSpeedup(index,'城防工事建设');
					               console.log("城防加速");
				            }
				            
				            if(((877 < lastTouchMoveX) && (lastTouchMoveX < (877 + 18))) && ((496 < lastTouchMoveY) && (lastTouchMoveY < (496 + 18))))
				            {
					               BuildingFunction.removeWallDefensenQueues(doRemoveWallDefensenQueues);
					               console.log("城防取消");
				            }
				    	}
						
						if(((587 < lastTouchMoveX) && (lastTouchMoveX < 663)) && ((286 < lastTouchMoveY) && (lastTouchMoveY < 361)))
						{
							isItemArray[0] = true;
							for(var i = 0 ; i<isItemArray.length; i++)
							{
								if(i!=0)
								{
									isItemArray[i] = false;
								}else{
									gfListIndex = i;
								}
							}
						}else
						if(((774 < lastTouchMoveX) && (lastTouchMoveX < 847)) && ((286 < lastTouchMoveY) && (lastTouchMoveY < 361)))
						{
							isItemArray[1] = true;
							for(var i = 0 ; i<isItemArray.length; i++)
							{
								if(i!=1)
								{
									isItemArray[i] = false;
								}else{
									gfListIndex = i;
								}
							}
						}else
						if(((961 < lastTouchMoveX) && (lastTouchMoveX < 1035)) && ((286 < lastTouchMoveY) && (lastTouchMoveY < 361)))
						{
							isItemArray[2] = true;
							for(var i = 0 ; i<isItemArray.length; i++)
							{
								if(i!=2)
								{
									isItemArray[i] = false;
								}else{
									gfListIndex = i;
								}
							}
						}else
						if(((588 < lastTouchMoveX) && (lastTouchMoveX < 661)) && ((407 < lastTouchMoveY) && (lastTouchMoveY < 481)))
						{
							isItemArray[3] = true;
							for(var i = 0 ; i<isItemArray.length; i++)
							{
								if(i!=3)
								{
									isItemArray[i] = false;
								}else{
									gfListIndex = i;
								}
							}
						}else
						if(((961 < lastTouchMoveX) && (lastTouchMoveX < 1034)) && ((407 < lastTouchMoveY) && (lastTouchMoveY < 481)))
						{
							isItemArray[4] = true;
							for(var i = 0 ; i<isItemArray.length; i++)
							{
								if(i!=4)
								{
									isItemArray[i] = false;
								}else{
									gfListIndex = i;
								}
							}
						}else
						if(lastTouchMoveX > 988 && lastTouchMoveX < (1002) && lastTouchMoveY > 536 && lastTouchMoveY < (556)){
				    		gfAuctionNum.value = 1;   
				    		BuildingFunction.getAllWallDefensen(dogetDefenceworks);
				    	}else 
				    	if(lastTouchMoveX > 1064 && lastTouchMoveX < (1078) && lastTouchMoveY > 536 && lastTouchMoveY < (556)){
				    		if(typeof(cfInfo) != "undefined"){
				    			if(gfAuctionNum.value <= cfInfo.limit){
				    				gfAuctionNum.value = cfInfo.limit;				    				
				    			}else{
				    				gfAuctionNum.value = 1;
				    				alert("超出建造上限！");
				    			}

				    		}
				    		BuildingFunction.getAllWallDefensen(dogetDefenceworks);
				    	}else//确定按钮
						if(((lastTouchMoveX > 995) && (lastTouchMoveX < 1046)) && ((lastTouchMoveY > 568) && (lastTouchMoveY<596)))
						{	
				    		if(typeof(chengfangArray) != "undefined" &&
				    				typeof(chengfangArray[gfListIndex]) != "undefined"){
				    			
				    			if(gfAuctionNum.value <= cfInfo.limit){	
				    				BuildingFunction.addWallDefenseNum(chengfangArray[gfListIndex].id,gfAuctionNum.value,doAddWallDefenseNum);
				    			}else{
				    				gfAuctionNum.value = 1;
				    				alert("超出建造上限！");
				    			}
				    		}
				    		console.log("建造确定");
				    	}else
				    	if(gfRemainTime != "等待刷新！" && ((892 < lastTouchMoveX) && (lastTouchMoveX < (892 + 18))) && ((498 < lastTouchMoveY) && (lastTouchMoveY < (498 + 18))))
				        {
				        	BuildingFunction.removeWallDefensenQueues(doRemoveWallDefensenQueues);
				        }	

					}else
					if(isSelectArray[1])
					{
						if(((595 < lastTouchMoveX) && (lastTouchMoveX < 678)) && ((286 < lastTouchMoveY) && (lastTouchMoveY < 312)))
						{
							setDataForGeneralChoice();
							generalChoiceClass.handlers.setSelectOptionVariable(-1,true);
							//打开多选界面
							generalChoice(getClickObjectIndex(),'cityMenuLayer','cityMenu');
			                changeMap('cityMenuLayer');	
							
						}else 
						if(((lastTouchMoveX > 773) && (lastTouchMoveX < 856)) && ((lastTouchMoveY > 288) && (lastTouchMoveY < 311)))
						{//配兵
							 isChengQiang = true;
							 battle.getHeroSoldierInfo(assignSoldiers);
						}else
					 	if(((lastTouchMoveX > 946) && (lastTouchMoveX < 1029)) && ((lastTouchMoveY > 288) && (lastTouchMoveY < 311)))
					 	{
					 		//保存
					 		var tempHeroID = '';
					 		for(var i=0; i< isChengQiangGen.length; i++)
					 		{
					 			if(isChengQiangGen[i].heroId == 0)
					 				tempHeroID += '';
					 			else
					 				tempHeroID += isChengQiangGen[i].heroId;
					 			tempHeroID += ',';
					 		}
					 		if(tempHeroID != null && tempHeroID.length > 0) 
					 			tempHeroID = tempHeroID.substring(0,tempHeroID.length-1);
					 		var formationNo = 0;
					 		if(comboboxes && comboboxes['formations'])
					 			formationNo = comboboxes['formations'].selected.id;
					 		else
					 			formationNo = '';
//					 		console.log('参数： tempHeroID = ' + tempHeroID + 
//					 				    '\ntotalForce = ' + totalForce +
//					 				    '\nformationNo = ' + formationNo);
					 		BuildingFunction.updateWallHeros(tempHeroID,totalForce,formationNo,doUpdateWallHeros);
					 	}else
						if(((lastTouchMoveX > 719) && (lastTouchMoveX < 854)) && ((lastTouchMoveY > 543) && (lastTouchMoveY < 559)))
						{
							//阵型下拉框
							if(!comboboxes['formations'].isOpen){
								//下拉框选中方法
								var selected = function(){
									formation.id = comboboxes['formations'].selected.id;
							    	formation.text = comboboxes['formations'].selected.txt;
							    	formation.obj = comboboxes['formations'].selected.obj;
									chengQiang(getClickObjectIndex());
								    changeMap('cityMenuLayer');
								};
								//绘制下拉框
								var _index = getClickObjectIndex();
								comboboxes['formations'].info(
										_index,
										'formations_combobox1',
										'levelMenu_4',
										'cityMenuLayer',
										['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
										718,
										560,
										{widthType:3,isScrolling:false}
								);
								comboboxes['formations'].createCombobox(selected);
								chengQiang(getClickObjectIndex());
							    changeMap('cityMenuLayer');
							}	
						}
						
						for(var i=0; i<isChengQiangGen.length; i++)
						{
							if(((995 < lastTouchMoveX) && (lastTouchMoveX < (995+42))) && (((350 + (i*30)) < lastTouchMoveY) && (lastTouchMoveY < ((350 + (i*30)) + 21))))
							{//换将
								setDataForGeneralChoice();
								generalChoiceClass.handlers.setSelectOptionVariable([i],true,true);
								//打开多选界面
								generalChoice(getClickObjectIndex(),'cityMenuLayer','cityMenu');
				                changeMap('cityMenuLayer');
							}else
							if( isChengQiangGen[i].heroId !=0 && ((1042 < lastTouchMoveX) && (lastTouchMoveX < (1042+42))) && (((350 + (i*30)) < lastTouchMoveY) && (lastTouchMoveY < ((350 + (i*30)) + 21))))
							{
								if(typeof(isChengQiangGen[i]) != "undefined")
								{
									isChengQiangGen[i].heroId = 0;
									isChengQiangGen[i].orderId = i+1;
									isChengQiangGen[i].heroName = "无";
									isChengQiangGen[i].soldierName = "无";
									isChengQiangGen[i].level = 0;
									isChengQiangGen[i].commandNum = 0;
									isChengQiangGen[i].heroStatus = 0;
									isChengQiangGen[i].health = 0;
									//战斗力计算
									getTotalForce(isChengQiangGen);
								}
							}							
						}
						chengQiang(getClickObjectIndex());
					    changeMap('cityMenuLayer');
					}
					
					if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height))){
							displayDestroy();
							exit(index);
							isChengqiang = false;
							curGroup = 'cityMenu';
							enterCityMenu(curGroup);
		                    changeMap('cityMenuLayer');	
					}
					else
					{
						commandBuildBtn(lotIndex,"建筑加速");
						chengQiang(getClickObjectIndex());
					    changeMap('cityMenuLayer');
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isChengqiang)
					 {
					 	 gbox.drawImage('cq_zjm_00',backdropX,backdropY);
					 	 gbox.drawImage('ty_an_27',backdropX1,backdropY1 + 4);			
					     gbox.drawImage('cq_zjm_12',(gbox.getImage('cq_zjm_00').width - gbox.getImage("cq_zjm_12").width)/2 + backdropX,backdropY1);
					     if(((touchMoveX > 382) && (touchMoveX < 513)) && ((touchMoveY > 309) && (touchMoveY<353)))
					     {
					     	 gbox.drawImage('ty_an_131',380,308);
					     }
					     if(((touchMoveX > 382) && (touchMoveX < 513)) && ((touchMoveY > 375) && (touchMoveY<414)))
					     {
					     	 gbox.drawImage('ty_an_132',380,369);
					     }
					     drawBuildCommandBtn();
					     if(isSelectArray[0])
					      {
					    	gfAuctionNum.style.display="";
					     	 gbox.drawImage('ty_an_35',380,308);
					     	 gbox.drawImage('cq_zjm_03',536,276);
					    	
					    	if(typeof(cfInfo) != 'undefined'){
					    		if(typeof(cfInfo.limit) != 'undefined')
					    			gbox.drawText(cfInfo.limit, 775,415,2);
					    		if(typeof(cfInfo.amount) != 'undefined')
					    			gbox.drawText(cfInfo.amount, 775,438,2);
					    		if(typeof(cfInfo.queue.name) != 'undefined'){ 
					    			gbox.drawText(cfInfo.queue.name, 775,465,2);
					    		}else
					    			gbox.drawText("无", 775,465,2);
					    	}
					    	gbox.drawText(gfRemainTime, 775,497,2);
					    	
					    	if(gfRemainTime != "等待刷新！"){
					            gbox.drawImage("ty_an_123",850,496);
					            if(((850 < touchMoveX) && (touchMoveX < (850 + 18))) && ((496 < touchMoveY) && (touchMoveY < (496 + 18))))
					            {
					               gbox.drawImage('ty_an_124',850,496);						 			               
					            }
					            gbox.drawImage("ty_an_125",877,496);
					            if(((877 < touchMoveX) && (touchMoveX < (877 + 18))) && ((496 < touchMoveY) && (touchMoveY < (496 + 18))))
					            {
					               gbox.drawImage('ty_an_126',877,496);						 			               
					            }
					    	}
					    	
					     	 if(chengfangData)
					     	 	 {
						     		if(cfInfo.limit > 0){
										var jtW = Math.floor(((84) * chengfangArray[0].amount) / (cfInfo.limit - cfInfo.amount)); 
								        gbox.setClip(gbox.getBufferContext(),585,375,jtW,15);
								        gbox.drawImage("cq_zjm_04",585,381);
								        gbox.restoreClip(gbox.getBufferContext());
						     		}
						     		
					     	 	 	 var backX = 581 + (88 - gbox.getTextWidth("檑木",11))/2;
									 var backY = 368;
						     	 	 gbox.drawText("檑木", backX,backY,10);
						     		
					     	 	 	 var backX = 581 + (88 - gbox.getTextWidth(chengfangArray[0].amount,11))/2;
									 var backY = 385;
//						     	 	 gbox.drawString(chengfangArray[0].amount, backX,backY,'#ffffff',11);
						     	 	 gbox.drawText(chengfangArray[0].amount, backX,backY,6);
						     	 	 
						     	 	 if(cfInfo.limit > 0){
										var tsW = Math.floor(((84) * chengfangArray[1].amount) / (cfInfo.limit - cfInfo.amount)); 
									    gbox.setClip(gbox.getBufferContext(),769,375,tsW,15);
									    gbox.drawImage("cq_zjm_04",769,381);
									    gbox.restoreClip(gbox.getBufferContext());
						     	 	 }
						     	 	 
						     	 	 var backX = 766 + (88 - gbox.getTextWidth("抛石",11))/2;
									 var backY = 368;
						     	 	 gbox.drawText("抛石", backX,backY,10);
						     	 	 
						     	 	 var backX = 766 + (88 - gbox.getTextWidth(chengfangArray[1].amount,11))/2;
									 var backY = 385;
//						     	 	 gbox.drawString(chengfangArray[1].amount, backX,backY,'#ffffff',11);
						     	 	 gbox.drawText(chengfangArray[1].amount, backX,backY,6);
						     	 	
						     	 	 if(cfInfo.limit > 0){
										var mzW = Math.floor(((84) * chengfangArray[2].amount) / (cfInfo.limit - cfInfo.amount)); 
									    gbox.setClip(gbox.getBufferContext(),958,375,mzW,15);
									    gbox.drawImage("cq_zjm_04",958,381);
									    gbox.restoreClip(gbox.getBufferContext());
						     	 	 }
						     	 	 
						     	 	 var backX = 952 + (88 - gbox.getTextWidth("拒马",11))/2;
									 var backY = 368;
						     	 	 gbox.drawText("拒马", backX,backY,10);
						     	 	 
						     	 	 var backX = 952 + (88 - gbox.getTextWidth(chengfangArray[2].amount,11))/2;
									 var backY = 385;
//						     	 	 gbox.drawString(chengfangArray[2].amount, backX,backY,'#ffffff',11);
						     	 	 gbox.drawText(chengfangArray[2].amount, backX,backY,6);
						     	 	 
						     	 	 if(cfInfo.limit > 0){
										var gmW = Math.floor(((84) * chengfangArray[3].amount) / (cfInfo.limit - cfInfo.amount)); 
									    gbox.setClip(gbox.getBufferContext(),585,495,gmW,15);
									    gbox.drawImage("cq_zjm_04",585,500);
									    gbox.restoreClip(gbox.getBufferContext());
						     	 	 }
						     	 	 
						     	 	 var backX = 581 + (88 - gbox.getTextWidth("箭矢",11))/2;
									 var backY = 486;
						     	 	 gbox.drawText("箭矢", backX,backY,10);
						     	 	 
						     	 	 var backX = 581 + (88 - gbox.getTextWidth(chengfangArray[3].amount,11))/2;
									 var backY = 501;
//						     	 	 gbox.drawString(chengfangArray[3].amount, backX,backY,'#ffffff',11);
						     	 	 gbox.drawText(chengfangArray[3].amount, backX,backY,6);
						     	 	 
						     	 	 if(cfInfo.limit > 0){
											var xjW = Math.floor(((84) * chengfangArray[4].amount) / (cfInfo.limit - cfInfo.amount)); 
										    gbox.setClip(gbox.getBufferContext(),956,495,xjW,15);
										    gbox.drawImage("cq_zjm_04",956,500);
										    gbox.restoreClip(gbox.getBufferContext());
						     	 	 }
						     	 	 
						     	 	 var backX = 952 + (88 - gbox.getTextWidth("地陷",11))/2;
									 var backY = 486;
									 gbox.drawText("地陷", backX,backY,10);
						     	 	 
						     	 	 var backX = 952 + (88 - gbox.getTextWidth(chengfangArray[4].amount,11))/2;
									 var backY = 501;
//						     	 	 gbox.drawString(chengfangArray[4].amount, backX,backY,'#ffffff',11);
						     	 	 gbox.drawText(chengfangArray[4].amount, backX,backY,6);
					     	 	 }

							 if(((touchMoveX > 588) && (touchMoveX < (588+rectW))) && ((touchMoveY > 288) && (touchMoveY<(288+rectH))))
							 {
								gbox.drawImage('cq_zjm_07',588,288);
							 							
							 }
							 if(((touchMoveX > 773) && (touchMoveX < (773+rectW))) && ((touchMoveY > 288) && (touchMoveY<(288+rectH))))
							 {
								gbox.drawImage('cq_zjm_07',773,288);
							 							
							 }
							 if(((touchMoveX > 961) && (touchMoveX < (961+rectW))) && ((touchMoveY > 288) && (touchMoveY<(288+rectH))))
							 {
								gbox.drawImage('cq_zjm_07',961,288);
							 							
							 }
							 if(((touchMoveX > 588) && (touchMoveX < (588+rectW))) && ((touchMoveY > 407) && (touchMoveY<(407+rectH))))
							 {
								gbox.drawImage('cq_zjm_07',588,407);
							 							
							 }
							 if(((touchMoveX > 962) && (touchMoveX < (962+rectW))) && ((touchMoveY > 407) && (touchMoveY<(407+rectH))))
							 {
								gbox.drawImage('cq_zjm_07',962,407);
							 							
							 }
					     	 if(isItemArray[0])
					     	 {
					     	 	 gbox.drawImage('cq_zjm_05',588,288);
					     	 	 if(typeof(chengfangArray[0]) != "undefined")
					     	 	 {
//					     	 	 	gbox.drawString(chengfangArray[0].seleName + ": 攻击 +" + chengfangArray[0].atk, 598,530,'#000000',14);
					     	 	 	gbox.drawText(chengfangArray[0].seleName + ": 攻击 +" + chengfangArray[0].atk, 598,530,0);
					     	 	 	var str_MaxWidth = gbox.stringArrayWidth(needResArray[0], 14);
					     	 	 	for(var i=0; i<needResArray[0].length; i++){
//					     	 	 		gbox.drawString(needResArray[0][i] + "", 595 + (i*(str_MaxWidth+10)),556,'#000000',14);
					     	 	 		gbox.drawText(needResArray[0][i] + "", 595 + (i*(str_MaxWidth+10)),556,0);
					     	 	 	}
//					     	 	 	gbox.drawString( changeTimeformat((chengfangArray[0].produceTime * gfAuctionNum.value) * 1000), 625,584,'#000000',14);
					     	 	 	gbox.drawText( changeTimeformat((chengfangArray[0].produceTime * gfAuctionNum.value) * 1000), 625,584,0);
					     	 	 }
					     	 	 
					     	 }
					     	 if(isItemArray[1])
					     	 {
					     	 	 gbox.drawImage('cq_zjm_05',773,288);
					     	 	 if(typeof(chengfangArray[1]) != "undefined")
					     	 	 {
//					     	 	 	gbox.drawString(chengfangArray[1].seleName + ": 攻击 +" + chengfangArray[1].atk, 598,530,'#000000',14);
					     	 	 	gbox.drawText(chengfangArray[1].seleName + ": 攻击 +" + chengfangArray[1].atk, 598,530,0);
					     	 	 	var str_MaxWidth = gbox.stringArrayWidth(needResArray[1], 14);
					     	 	 	for(var i=0; i<needResArray[1].length; i++){
//					     	 	 		gbox.drawString(needResArray[1][i] + "", 595 + (i*(str_MaxWidth+10)),556,'#000000',14);
					     	 	 		gbox.drawText(needResArray[1][i] + "", 595 + (i*(str_MaxWidth+10)),556,0);
					     	 	 	}
//					     	 	 	gbox.drawString( changeTimeformat((chengfangArray[1].produceTime * gfAuctionNum.value) * 1000), 625,584,'#000000',14);
					     	 	 	gbox.drawText( changeTimeformat((chengfangArray[1].produceTime * gfAuctionNum.value) * 1000), 625,584,0);
					     	 	 }
					     	 }
					     	 if(isItemArray[2])
					     	 {
					     	 	 gbox.drawImage('cq_zjm_05',961,288);
					     	 	 if(typeof(chengfangArray[2]) != "undefined")
					     	 	 {
//					     	 	 	gbox.drawString(chengfangArray[2].seleName + ": 攻击 +" + chengfangArray[2].atk, 598,530,'#000000',14);
					     	 	 	gbox.drawText(chengfangArray[2].seleName + ": 攻击 +" + chengfangArray[2].atk, 598,530,0);
					     	 	 	var str_MaxWidth = gbox.stringArrayWidth(needResArray[2], 14);
					     	 	 	for(var i=0; i<needResArray[2].length; i++){
//					     	 	 		gbox.drawString(needResArray[2][i] + "", 595 + (i*(str_MaxWidth+10)),556,'#000000',14);
					     	 	 		gbox.drawText(needResArray[2][i], 595 + (i*(str_MaxWidth+10)),556,0);
					     	 	 	}
//					     	 	 	gbox.drawString( changeTimeformat((chengfangArray[2].produceTime * gfAuctionNum.value) * 1000), 625,584,'#000000',14);
					     	 	 	gbox.drawText( changeTimeformat((chengfangArray[2].produceTime * gfAuctionNum.value) * 1000), 625,584,0);
					     	 	 }
					     	 }
					     	 if(isItemArray[3])
					     	 {
					     	 	 gbox.drawImage('cq_zjm_05',588,407);
					     	 	 if(typeof(chengfangArray[3]) != "undefined")
					     	 	 {
//					     	 	 	gbox.drawString(chengfangArray[3].seleName + ": 攻击 +" + chengfangArray[3].atk, 598,530,'#000000',14);
					     	 	 	gbox.drawText(chengfangArray[3].seleName + ": 攻击 +" + chengfangArray[3].atk, 598,530,0);
					     	 	 	var str_MaxWidth = gbox.stringArrayWidth(needResArray[3], 14);
					     	 	 	for(var i=0; i<needResArray[0].length; i++){
//					     	 	 		gbox.drawString(needResArray[3][i] + "", 595 + (i*(str_MaxWidth+10)),556,'#000000',14);
					     	 	 		gbox.drawText(needResArray[3][i], 595 + (i*(str_MaxWidth+10)),556,0);
					     	 	 	}
//					     	 	 	gbox.drawString( changeTimeformat((chengfangArray[3].produceTime * gfAuctionNum.value) * 1000), 625,584,'#000000',14);
					     	 	 	gbox.drawText( changeTimeformat((chengfangArray[3].produceTime * gfAuctionNum.value) * 1000), 625,584,0);
					     	 	 }
					     	 }
					     	 if(isItemArray[4])
					     	 {
					     	 	 gbox.drawImage('cq_zjm_05',962,407);
					     	 	 if(typeof(chengfangArray[4]) != "undefined")
					     	 	 {
//					     	 	 	gbox.drawString(chengfangArray[4].seleName + ": 攻击 +" + chengfangArray[4].atk, 598,530,'#000000',14);
					     	 	 	gbox.drawText(chengfangArray[4].seleName + ": 攻击 +" + chengfangArray[4].atk, 598,530,0);
					     	 	 	var str_MaxWidth = gbox.stringArrayWidth(needResArray[4], 14);
					     	 	 	for(var i=0; i<needResArray[4].length; i++){
//					     	 	 		gbox.drawString(needResArray[4][i] + "", 595 + (i*(str_MaxWidth+10)),556,'#000000',14);
					     	 	 		gbox.drawText(needResArray[4][i] + "", 595 + (i*(str_MaxWidth+10)),556,0);
					     	 	 	}
//					     	 	 	gbox.drawString( changeTimeformat((chengfangArray[4].produceTime * gfAuctionNum.value) * 1000), 625,584,'#000000',14);
					     	 	 	gbox.drawText(changeTimeformat((chengfangArray[4].produceTime * gfAuctionNum.value) * 1000), 625,584,0);
					     	 	 }
					     	 }

					     	 gbox.drawImage('ty_an_25',990,537);
					     	 gbox.drawImage('ty_an_24',1066,537);
					     	 gbox.drawImage('ty_an_10',997,572);
							 if(((touchMoveX > 995) && (touchMoveX < 1080)) && ((touchMoveY > 568) && (touchMoveY<598)))
							 {
								gbox.drawImage('ty_an_09',997,572);
							 							
							 }
							  var strW = gbox.getTextWidth("确 定",14);
							  var strX = 997 + (84 - strW)/2;
							  var strY = 572 + (26 - 14)/2;
							  gbox.drawText("确 定", strX, strY,10);
							 
                             for(var i=0; i<tooltipInfo.length; i++){
							    if(gbox._mouseArea(cqArea[i],touchMoveX,touchMoveY))
							    {
									 if(typeof(tooltipInfo[i]) != 'undefined')
									 {
											var tempH = tooltip.computBuildingTree(gbox.getBufferContext(),tooltipInfo[i]).height;
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
											
											var uiScreenY = 520;
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
												tooltip.drawBuildingTree(gbox.getImage("toolTip"),gbox.getBufferContext(),mouseX,mouseY,tooltipInfo[i]); 
											}
												
									 }
								}
							 }
					     }
					     if(isSelectArray[1])
					     {
							 gfAuctionNum.style.display="none";
					     	 gbox.drawImage('ty_an_33',380,369);
					     	 gbox.drawImage('cq_zjm_06',536,276);
					     	gbox.drawImage('ty_an_10',597,288);
					     	 if(((touchMoveX > 597) && (touchMoveX < 678)) && ((touchMoveY > 288) && (touchMoveY<311)))
					 	     {
					 	     	gbox.drawImage('ty_an_09',597,288);
					 	     }
					     	gbox.drawImage('ty_an_10',773,288);
					 	     if(((touchMoveX > 773) && (touchMoveX < 856)) && ((touchMoveY > 288) && (touchMoveY<311)))
					 	     {
					 	     	gbox.drawImage('ty_an_09',773,288);
					 	     }
					 	    gbox.drawImage('ty_an_10',947,288);
					 	     if(((touchMoveX > 947) && (touchMoveX < 1029)) && ((touchMoveY > 288) && (touchMoveY<311)))
					 	     {
					 	     	gbox.drawImage('ty_an_09',947,288);
					 	     }
					 	     var fontW = gbox.getTextWidth("选择武将",14);
					     	 var tzX = 597 + (84 - fontW)/2;
					 	     var tzY = 288 + (26 - 14)/2;
					 	     gbox.drawText("选择武将", tzX, tzY,10);	

					 	     var fontW = gbox.getTextWidth("配  兵",14);
					 	     var tzX = 773 + (84 - fontW)/2;
					 	     var tzY = 288 + (26 - 14)/2;
					 	     gbox.drawText("配  兵", tzX, tzY,10);	
					 	     var tzX = 947 + (84 - fontW)/2;
					 	     var tzY = 288 + (26 - 14)/2;
					 	     gbox.drawText("保  存", tzX, tzY,10);	
					 	    //绘制部队战斗力
					 	    gbox.drawText(totalForce, 720,517,2); 
					 	    //绘制阵型图
					 	    if(formation.id != '' && typeof(formation.id) != "undefined"){
					 	    	if(formation.obj)
					 	    		gbox.drawImage(formation.obj.formationIcon,995,519);
					 	    	gbox.drawText(formation.text, 725,545,2);
					 	    }else{
					 	    	gbox.drawText('无', 725,545,2);
					 	    }
					 	    
					 	    //绘制城墙耐久度
					 	    gbox.drawText(wallDurable, 720,573,2);
					 	    	
					 	     for(var i =0; i<isChengQiangGen.length;i++)
					 	     {
					 	     	if(typeof(isChengQiangGen[i]) != "undefined" && chengfangDefenceData)
						 	     {
						 	     	var backX = 539 + (55 - gbox.getTextWidth(isChengQiangGen[i].orderId,11))/2;
								 	var backY = 344 + (35 - 11)/2 + i*30;
						 	     	gbox.drawText(isChengQiangGen[i].orderId, backX,backY,2);
						 	     	var backX = 595 + (76 - gbox.getTextWidth(isChengQiangGen[i].heroName,11))/2;
								 	var backY = 344 + (35 - 11)/2+ i*30;
						 	     	gbox.drawText(isChengQiangGen[i].heroName, backX,backY,5,isChengQiangGen[i].toolTipInfo.quality);
						 	     	var backX = 672 + (71 - gbox.getTextWidth(isChengQiangGen[i].soldierName,11))/2;
								 	var backY = 344 + (35 - 11)/2+ i*30;
						 	     	gbox.drawText(isChengQiangGen[i].soldierName, backX,backY,2);
						 	     	var backX = 746 + (56 - gbox.getTextWidth(isChengQiangGen[i].level,11))/2;
								 	var backY = 344 + (35 - 11)/2+ i*30;
						 	     	gbox.drawText(isChengQiangGen[i].level, backX,backY,2);
						 	     	var backX = 802 + (76 - gbox.getTextWidth(isChengQiangGen[i].health,11))/2;
								 	var backY = 344 + (35 - 11)/2+ i*30;
						 	     	gbox.drawText((isChengQiangGen[i].health), backX,backY,2);
						 	     	var backX = 881 + (54 - gbox.getTextWidth(isChengQiangGen[i].commandNum,11))/2;
								 	var backY = 344 + (35 - 11)/2+ i*30;
						 	     	gbox.drawText(isChengQiangGen[i].commandNum, backX,backY,2);
						 	     	var backX = 936 + (55 - gbox.getTextWidth(getGeneralStatus(isChengQiangGen[i].heroStatus,11)))/2;
								 	var backY = 344 + (35 - 11)/2+ i*30;
						 	     	gbox.drawText(getGeneralStatus(isChengQiangGen[i].heroStatus), backX,backY,2);
						 	     	var tzX = 995 + (89 - gbox.getImage('cq_zjm_10').width)/2;
							 	    var tzY = 350 + (21 - gbox.getImage('cq_zjm_10').height)/2;
							 	    if(isChengQiangGen[i].heroId !=0)
							 	        gbox.drawImage('cq_zjm_10',tzX,tzY + i*30);
							 	    else
							 	    	gbox.drawImage('cq_zjm_11',tzX,tzY + i*30);
						 	     }
					 	     }
					 	     //武将鼠标提示
					 	    for(var i =0; i<isChengQiangGen.length;i++){
					 	    	if(typeof(isChengQiangGen[i]) != "undefined" && chengfangDefenceData){
					 	    		if(isChengQiangGen[i].toolTipInfo && isChengQiangGen[i].heroId != 0){
					 	    			if(touchMoveX > 539 && touchMoveX < 993 && touchMoveY > (344 + (i*30)) && touchMoveY < (344 + (i*30) + 30)){
					 	    				if(touchMoveX !=0)
						 	    				tooltip.drawHero(gbox.getImage("toolTip"),gbox.getBufferContext(),
						 	    						touchMoveX+15,touchMoveY,
						 	    						isChengQiangGen[i].toolTipInfo
					 	    				);
							 			}
					 	    		}
					 	    	}
							}
	
					     }		
					     gbox.drawImage("cq_zjm_13", 412,324,18);	
					     gbox.drawImage("cq_zjm_14", 412,386,18);
					     
					     gbox.drawLineBreakText(buildCommonDesc[lotIndex],444,198,0,544);
					     
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

};

 
function doUpdateWallHeros(data)
{
//	console.log('保存成功！');
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	alert("保存成功！");
	chengfangRiverInfo = false;
}

function dogetRiverInfo(data)
{
	chengfangRiverInfo = false;
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	allRiver = data.blockedRiver;
	blockedRiver = data.clearRiver;
	needMoney = data.needMoney;
	needPeople = data.needPeople;
	chengfangRiverInfo = true;
}

var wallHeros = new Array();
function doGetAllWallHeros(data){
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	wallHeros = new Array();
	for(var i=0; i<data.length; i++){
		wallHeros[i] = {
				orderId:data[i].orderId,
				heroName:data[i].heroName,
				level:data[i].level,
				soldierName:data[i].soldierName,
				soldierAmount:data[i].soldierAmount,
				heroStatus:data[i].heroStatus,
				health:data[i].health,
		};
	}
}
function dogetDefenceHero(data)
{
	chengfangDefenceData = false;
	if(typeof(data.error) != "undefined")
	{
		alert("!!!系统提示：" + data.error);
		return;
	}
	//英雄集合
	var heroes = data.heroList;
	//部队战斗力
    totalForce = data.wallCombat;
    //初始化选中阵型
    if(data.FormationNo)
    	formation.id = data.FormationNo;
    if(data.formationName)
    	formation.text = data.formationName;
	
	wallDurable = data.defensen;
	isChengQiangGen = new Array();
	
	for(var i=0; i<5; i++){
		if(heroes.length == 0 || typeof(heroes[i]) == "undefined")
		{
		     isChengQiangGen[i] = {
		    		  heroId : 0,
		    		  orderId : i+1,
		              heroName : "无",
		              soldierName : "无",
		              level : 0,
		              commandNum : 0,
		              heroStatus : 0,
		              health : 0,
		              toolTipInfo : {}
		       };
		}else{
			var heroName = heroes[i].heroName;
			var soldierName = heroes[i].soldierName;
			var tempTip = heroes[i].ToolTipInfo;
			if(heroes[i].heroName == null){
				heroName = '无';
			}
			if(heroes[i].soldierName == null){
				soldierName = '无';
			}
			if(heroes[i].ToolTipInfo == null){
				tempTip = {};
			}
			isChengQiangGen[i] = {
		    		  heroId:heroes[i].heroId,
		    		  orderId:i+1,
		              heroName : heroName,
		              soldierName : soldierName,
		              level : heroes[i].heroLevel,
		              commandNum : heroes[i].soldierAmount,
		              heroStatus : heroes[i].heroStatus,
		              health:heroes[i].heroHealth,
		              toolTipInfo : tempTip
		     };
		}
	}
	//战斗力计算
	getTotalForce(isChengQiangGen);
	//加载阵型数据
	battle.getUserFormations(chengqiangZhenxing);
	chengfangDefenceData = true;
}
//阵型回调
var chengqiangZhenxing = function(data){
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	comboboxes = {};
    var comboboxFormations = new Combobox();
    if(comboboxes && comboboxes['formations']){
    	formation.id = comboboxes['formations'].selected.id;
    	formation.text = comboboxes['formations'].selected.txt;
    	formation.obj = comboboxes['formations'].selected.obj;
    }
    comboboxFormations.setData(data,'techNo','name',true);
    comboboxes['formations'] = comboboxFormations;
    comboboxes['formations'].selected = {
			   id: formation.id,
			   txt: formation.text,
			   obj: formation.obj
	 };
};

var cfInfo = undefined;
var needResArray = new Array();
var tooltipInfo = new Array();
function dogetDefenceworks(data)
{
	chengfangData = false;
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	
	cfInfo = undefined;
	cfInfo = {
			amount:data.amount,//总兵数
			limit:data.limit,//总兵上限
			queue:{
				name:data.queue.name,
				time:data.queue.time,
            }
	};
	tooltipInfo.splice(0,tooltipInfo.length);
	for(var i =0; i<data.retList.length; i++)
	{
		chengfangArray[i] = 
		{
			amount : data.retList[i].num,
			atk:data.retList[i].entity.atk,
			seleName : data.retList[i].entity.name,
			needWood:data.retList[i].entity.needWood,
			needStone:data.retList[i].entity.needStone,
			needIronore:data.retList[i].entity.needIronore,
			description:data.retList[i].entity.description,
			id:data.retList[i].entity.defenceworksNo,
			produceTime:data.retList[i].entity.produceTime,
		};
		
		needResArray[i] = new Array();
		if(typeof(chengfangArray[i].needWood) != 'undefined' && chengfangArray[i].needWood > 0)
		    needResArray[i].push(" 木材: " + Number(chengfangArray[i].needWood * gfAuctionNum.value) + " ");
		if(typeof(chengfangArray[i].needStone) != 'undefined' && chengfangArray[i].needStone > 0)
			needResArray[i].push(" 石料: " + Number(chengfangArray[i].needStone * gfAuctionNum.value) + " ");
		if(typeof(chengfangArray[i].needIronore) != 'undefined' && chengfangArray[i].needIronore > 0)
			needResArray[i].push(" 铁矿: " + Number(chengfangArray[i].needIronore * gfAuctionNum.value) + " ");
		
		tooltipInfo[i] = {
				buildingName:chengfangArray[i].seleName,
				desc:chengfangArray[i].description
		};
	}

	chengfangData = true;
	chengQiang(getClickObjectIndex());
    changeMap('cityMenuLayer');
}


function doDefenceworks(data)
{
	chengfangData = false;
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	
	cfInfo = undefined;
	cfInfo = {
			amount:data.amount,//总兵数
			limit:data.limit,//总兵上限
			queue:{
				name:data.queue.name,
				time:data.queue.time,
            }
	};
	tooltipInfo.splice(0,tooltipInfo.length);
	for(var i =0; i<data.retList.length; i++)
	{
		chengfangArray[i] = 
		{
			amount : data.retList[i].num,
			atk:data.retList[i].entity.atk,
			seleName : data.retList[i].entity.name,
			needWood:data.retList[i].entity.needWood,
			needStone:data.retList[i].entity.needStone,
			needIronore:data.retList[i].entity.needIronore,
			description:data.retList[i].entity.description,
			id:data.retList[i].entity.defenceworksNo,
			produceTime:data.retList[i].entity.produceTime,
		};
		
		needResArray[i] = new Array();
		if(typeof(chengfangArray[i].needWood) != 'undefined' && chengfangArray[i].needWood > 0)
		    needResArray[i].push(" 木材: " + Number(chengfangArray[i].needWood * gfAuctionNum.value));
		if(typeof(chengfangArray[i].needStone) != 'undefined' && chengfangArray[i].needStone > 0)
			needResArray[i].push(" 石头: " + Number(chengfangArray[i].needStone * gfAuctionNum.value));
		if(typeof(chengfangArray[i].needIronore) != 'undefined' && chengfangArray[i].needIronore > 0)
			needResArray[i].push(" 矿石: " + Number(chengfangArray[i].needIronore * gfAuctionNum.value));

		tooltipInfo[i] = {
				buildingName:chengfangArray[i].seleName,
				desc:chengfangArray[i].description
		};
		
	}

	if(typeof(cfInfo.queue.time) != 'undefined'){
		var tmpTime = cfInfo.queue.time;
		console.log("【城防建造冗余时间】 =================== " + tmpTime);
		if(gfTimeInterval == null)
		    gfTimeInterval = setInterval("GFTimer(" + tmpTime + ")",1000);
	}else{
		if(gfTimeInterval != null){
			clearInterval(gfTimeInterval);
			gfCnt = 0;
			gfTimeInterval = null;
			gfRemainTime =  "等待刷新！";
		}
	}
	chengfangData = true;
	if(!isChengQiang){
		enterCityMenu('cityMenu');	
		changeMap('cityMenuLayer');	
		return;
	}
	chengQiang(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}

function doRemoveWallDefensenQueues(data){
	if(gfTimeInterval != null){
		clearInterval(gfTimeInterval);
		gfCnt = 0;
		gfTimeInterval = null;
		gfRemainTime =  "等待刷新！";
	}
}

function doAddWallDefenseNum(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	cfInfo.queue.name = data.name;
	cfInfo.queue.time = data.time;
	
	if(gfTimeInterval != null){
		clearInterval(gfTimeInterval);
		gfCnt = 0;
		gfTimeInterval = null;
		gfRemainTime =  "等待刷新！";
	}
	console.log("【剩余时间】 =================== " + data.time);//剩余时间
	if(gfTimeInterval == null)
	    gfTimeInterval = setInterval("GFTimer(" + data.time + ")",1000);
	chengQiang(getClickObjectIndex());
    changeMap('cityMenuLayer');
}

var gfCnt = 0;
var gfRemainTime = "等待刷新！";
function GFTimer(initData){
	if(initData > 0){
		gfCnt = gfCnt + 1;
	}else
		gfCnt = 0;
	if(initData <= 0){
		gfRemainTime = "等待刷新！";
	}else
		gfRemainTime = changeTimeformat((initData - gfCnt)*1000);
};

var assignSoldiers = function(data){
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	userSoldiers = new Array();
	for(var i =0; i<data.userSoldiers.length; i++)
	{
		userSoldiers[i] = 
		{
			soldierName : data.userSoldiers[i].soldierName,
			soldierAmount : data.userSoldiers[i].soldierAmount,
			soldierNo:data.userSoldiers[i].soldierNo,
		};
	}
	uhCnt = new Array();
	userHeros = new Array();
	pbListColor = new Array();
	for(var i =0; i<data.userHeros.length; i++)
	{
		userHeros[i] = 
		{
			id : data.userHeros[i].id,
			soldierNo:data.userHeros[i].soldierNo,
			heroName:data.userHeros[i].toolTipInfo.heroName,
			quality : data.userHeros[i].toolTipInfo.quality,
			level:data.userHeros[i].toolTipInfo.level,
			soldierName:data.userHeros[i].soldierName,
			soldierAmount:data.userHeros[i].soldierAmount,
			command:data.userHeros[i].toolTipInfo.command
		};
		pbListColor[i] = qualityColor[data.userHeros[i].toolTipInfo.quality];
	}
	if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
		isChengQiang = true;
		//初始化下拉框对象、数据
		var comboboxPeibing = new Combobox();
		comboboxPeibing.data = [{id:'',txt:'无'}];
		for(var i=0; i<userSoldiers.length; i++){
				var line = userSoldiers[i];
			   	var obj = {
			 		id:line['soldierNo'],
			  		txt:line['soldierName']
			   	};
			   	comboboxPeibing.data.push(obj);
		}
		comboboxPeibing.selected = comboboxPeibing.data[0];
		comboboxes['positon_peibing'] = comboboxPeibing;
		//配兵界面关闭方法赋值
		peibingClose = function(){
			isChengQiang = false;
			battle.getUserFormations(chengqiangZhenxing);
            chengQiang(getClickObjectIndex());
		};
		//打开配兵界面
		peibingClass.handler.cleanHeroSoldierChange();
		peibing(getClickObjectIndex(),'cityMenuLayer','cityMenu');
		changeMap('cityMenuLayer');	
	}else
		alert("没有可派遣的武将！");
};

//根据thisidList的顺序，通过fn方法设置generalList中同id的对象.
var setOrdersById = function(list1,list2,list1Id,list2Id,fn,fn2){
	for(var i=0; i<list1.length; i++){
		var isInList2 = false;
		for(var j=0; j<list2.length; j++){
			var temp1 = list1[i];
			var temp2 = list2[j];
			if(temp1[list1Id] == temp2[list2Id]){
				fn(i,j);
				isInList2 = true;
				break;
			}
		}
		if(!isInList2){
			if(typeof(fn2) != "undefined")
				fn2(i,j);
		}
	}
};

//根据英雄id查询英雄在制定集合中的索引
//-1 为不存在
var getHeroIndex = function(list,idstr,userHeroId){
	var is = false;
	var index = 0;
	for(var i=0; i<list.length; i++){
		var listone = list[i];
		  if(typeof(listone) != 'undefined'){
			  if(listone[idstr] == userHeroId){
				  is = true;
				  index = i;
				  break;
			  }
		  }
	}
	if(is){
		return index;
	}else{
		return -1;
	}
};

//获取部队战斗力
var getTotalForce = function(list){
	var idlist = '';
	totalForce = 0;
	for(var i=0; i<list.length; i++){
		if(typeof(list[i]) != "undefined" && list[i].heroId != 0){
			idlist += list[i].heroId;
			idlist += ',';
		}
	}
	if(idlist.length > 0){
		idlist = idlist.substring(0, idlist.length-1);
		BuildingFunction.getHeroValue(idlist,function(data){
			if(typeof(data.error) != "undefined")
			{
				alert("系统提示：" + data.error);
				return;
			}
			totalForce = Number(data.toFixed(1));
		});
	}
};

//部队战斗力计算
//@list 英雄对象集合
var calculateTotalForce = function(list){
	totalForce = 0;
	for(var i=0; i<list.length; i++){
		if(typeof(list[i]) != "undefined" && list[i].heroId != 0){
			totalForce += forceCalculate(list[i]);
		}
	}
	totalForce = Number(totalForce.toFixed(1));
};

//单英雄部队战斗力计算
//@hero 英雄对象 
var forceCalculate = function(hero){
	//计算公式：战斗力=兵力*0.1+总攻击力*1+武将谋略*0.7+总防御力*0.65+武将身法*0.6
	var force = 
	(hero.toolTipInfo.strategy*.7) +        						 //谋略 
	(hero.toolTipInfo.agility*.6) +         						 //身法
	(hero.commandNum*.1) +			        						 //兵力
	((hero.toolTipInfo.heroForce*1 + (hero.soldierAttack||0)*1)*.1) +     //总攻击力  (武将攻击力(武力*1) + 兵种攻击力)
	((hero.toolTipInfo.physique*1 + (hero.soldierDefence||0)*1)*.65);     //总防御力  (武将防御力(体质*1) + 兵种防御力)
	//四舍五入 保留一位小数
	force = Number(force.toFixed(1));
//	console.log(hero.heroName + '的战斗力 : ' + force);
	return force;
};

var setDataForGeneralChoice = function(){
	//以选中武将id集合
	var idList = [];
	for(var i=0; i<isChengQiangGen.length; i++){
		idList.push(isChengQiangGen[i].heroId);
	}
	//设置武将选择窗口缓存数据
	generalChoiceClass.handlers.initCache(5,idList);
	//设置确定回调方法
	generalChoiceClass.handlers.confirmCallBack = function(list){
		for(var i=0; i<list.length; i++){
			if(list[i].obj){
				var temp = list[i].obj;
				//健康度计算
           		var health = Math.floor((Number(temp.intHp)/Number(temp.intCurrentHp))*100);
				isChengQiangGen[i] = {
                			  orderId : i + 1,
                			  heroId :  temp.id,
                	   	      heroName : temp.heroName,
                	   	      soldierName : temp.soldierNameValue,
                	   	      level : temp.level,
                	   	      intCurrentHp : temp.intCurrentHp,
                	   	      intHp : temp.intHp,
                	   	      commandNum : temp.soldierAmount,
                	   	      heroStatus : temp.heroStatus,
                	   	      health :health,
                	   	      toolTipInfo : temp.toolTipInfo
				};
			}else{
				isChengQiangGen[i].heroId = 0;
				isChengQiangGen[i].orderId = i+1;
				isChengQiangGen[i].heroName = "无";
				isChengQiangGen[i].soldierName = "无";
				isChengQiangGen[i].level = 0;
				isChengQiangGen[i].commandNum = 0;
				isChengQiangGen[i].heroStatus = 0;
				isChengQiangGen[i].health = 0;
			}
		}
		//战斗力计算
		getTotalForce(isChengQiangGen);
	};
	//窗口关闭回调
	generalChoiceClass.handlers.closeCallBack = function(){
		isChengQiang = false;
		selectGeneral.isSelectGeneral = false;
		chengQiang(getClickObjectIndex());
	    changeMap('cityMenuLayer');
	};
};

function doRemoveWallDefensenQueues(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	if(gfTimeInterval != null){
		clearInterval(gfTimeInterval);
		gfCnt = 0;
		gfTimeInterval = null;
		gfRemainTime =  "等待刷新！";
	}
    isDefenceWorks = true;
    isSelectArray[0] = true;
    isSelectArray[1] = false;
    chengQiang(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}

