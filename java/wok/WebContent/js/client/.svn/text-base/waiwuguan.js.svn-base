var wwgIndex = 0;
var waiwuguan = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	wwgIndex = index;
	isWaiwuguan = true;
	var bW = gbox.getImage('wwg_zjm_01').width;
	var bH = gbox.getImage('wwg_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2; 
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 30;		    
		gbox.addObject(
			{ 
				id : 'wwg',
				group : 'levelMenu_2',
				tileset : 'wwg_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					if(selectWorM[1])
                  	 if(findUnionDiv == null && !gbox._isIndwellDiv("findUnionDiv","input"))
					 {
							var pnX = 566;
							var pnY = 578;
							findUnionDiv = addDivWindowBg(pnX,pnY);
							findUnionDiv.id = 'findUnionDiv';
							document.body.appendChild(findUnionDiv);
							findUnionName = document.createElement("input");
							findUnionName.id = 'findUnion1';
							findUnionName.style.opacity="0.5";
							findUnionName.style.backgroundColor = "#272120";
							findUnionName.style.color = "#ffffff";
							findUnionName.style.width = '270px';
							findUnionName.style.height = '200px';
							findUnionName.style.maxWidth = '100px';
							findUnionName.style.maxHeight = '20px';
//							findUnionName.style.outline = "none";
							findUnionDiv.appendChild(findUnionName);			
					 } 
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					if(selectWorM[1])
					   adaptiveDiv(findUnionDiv,"findUnionDiv",566);
					/*======================================================*/
				},
				myclick : function()
				{
					//我的信息（页卡）
					if(lastTouchMoveX > 361 && lastTouchMoveX < 384 && lastTouchMoveY > 317 && lastTouchMoveY < 425)
					{
						displayDestroy();
						exit(getClickObjectIndex());
						selectWorM[0] = true;
						selectWorM[1] = false;
						waiwuguan(getClickObjectIndex());
						
						switch(unionIndex){
						case 0://信息
	                    	Alliance.initCharacterAlliance(dataGetAlliance);
							break;
						case 1://成员
							Alliance.getAllAllianceMember(charOfallianceId,memberPage,doGetAllAllianceMember); 
							break;
						case 2://福利
							Alliance.initAllianceWealth(doInitAllianceWealth);	
							break;
						case 3://科技
							Alliance.initAllianceTechology(doInitAllianceTechology);	
							break;
						case 4://兵营
							pageFlagIndex = 0;
							Alliance.getAllianceBarrack(doGetAllianceBarrack);
							break;
						case 5://活动
							
							break;
						case 6://市场
							Alliance.getAllianceShoping(page,doGetAllianceShoping);
							break;
						}
						changeMap('cityMenuLayer');
				}else
					//世界联盟（页卡）
					if(lastTouchMoveX > 361 && lastTouchMoveX < 384 && lastTouchMoveY > 459 && lastTouchMoveY < 560)
					{
						displayDestroy();
						exit(getClickObjectIndex());
						selectWorM[0] = false;
						selectWorM[1] = true;
	                   	 if(findUnionDiv == null && !gbox._isIndwellDiv("findUnionDiv","input"))
						 {
								var pnX = 566;
								var pnY = 578;
								findUnionDiv = addDivWindowBg(pnX,pnY);
								findUnionDiv.id = 'findUnionDiv';
								document.body.appendChild(findUnionDiv);
								findUnionName = document.createElement("input");
								findUnionName.id = 'findUnion1';
								findUnionName.style.opacity="0.5";
								findUnionName.style.backgroundColor = "#272120";
								findUnionName.style.color = "#ffffff";
								findUnionName.style.width = '270px';
								findUnionName.style.height = '200px';
								findUnionName.style.maxWidth = '100px';
								findUnionName.style.maxHeight = '20px';
//								findUnionName.style.outline = "none";
								findUnionDiv.appendChild(findUnionName);			
						 } 

						Alliance.getAllianceByCountry(countryName[countryIndex],worldPage,doGetAllianceByCountry);
					}else
					
					//我的信息(控制子项)
					if(selectWorM[0] && !isUnion)
					{
						for(var j=0; j<myLianmengFont.length; j++)
						if(lastTouchMoveX > 416 && lastTouchMoveX < 497 && lastTouchMoveY > 330 + (j*35) && lastTouchMoveY < (330 + (j*35) + 21))
						{
							for(var i = 0; i<myLianmengFont.length; i++)
							{
								if(i!=j){
									unionInformation[i] = false;
								}
								else
								{
									displayDestroy();
									exit(getClickObjectIndex());
									unionIndex = i;
									switch(unionIndex){
									case 0://信息
										waiwuguan(getClickObjectIndex());
					                    Alliance.initCharacterAlliance(dataGetAlliance);
									 	changeMap('cityMenuLayer');
										break;
									case 1://成员
										Alliance.getAllAllianceMember(charOfallianceId,memberPage,doGetAllAllianceMember);
										break;
									case 2://福利
										Alliance.initAllianceWealth(doInitAllianceWealth);	
										break;
									case 3://科技
										Alliance.initAllianceTechology(doInitAllianceTechology);	
										break;
									case 4://兵营
										pageFlagIndex = 0;
										Alliance.getAllianceBarrack(doGetAllianceBarrack);
										break;
									case 5://活动
										
										break;
									case 6://市场
										Alliance.getAllianceShoping(page,doGetAllianceShoping);
										break;
									}

									unionInformation[i] = true;
								}
							}
						}
					}else
					
					//世界联盟(控制子项)
					if(selectWorM[1])
					{
						for(var j=0; j<5; j++)
						if(lastTouchMoveX > 416 && lastTouchMoveX < 497 && lastTouchMoveY > 350 + (j*35) && lastTouchMoveY < 371 + (j*35))
						{
							for(var i = 0; i<5; i++)
							{
								if(i!=j)
								 worldInformation[i] = false;
								else{
									countryIndex = i;
									worldInformation[i] = true;
									Alliance.getAllianceByCountry(countryName[i],worldPage,doGetAllianceByCountry);
								}
								 
								
							}
						}
						
						 //翻页数字及按钮控制
			               if(((1017 < lastTouchMoveX) && (lastTouchMoveX < 1017 + 16)) && ((580 < lastTouchMoveY) && (lastTouchMoveY < (580 + 14))))
			               {//控制向右翻页
			               	   if(worldPage < worldPages){
				            	   if(typeof(worldCharacter) != "undefined" && worldCharacter.length > 0){
				            		   Alliance.getAllianceByCountry(countryName[countryIndex],++worldPage,doGetAllianceByCountry);
				            	   }else
				            		   alert("没有成员数据！");
			               	   }
			               }
			               
			               if(((935 < lastTouchMoveX) && (lastTouchMoveX < 935 + 16)) && ((578 < lastTouchMoveY) && (lastTouchMoveY < (578 + 14))))
			               {//控制向左翻页
			               	   if(worldPage >= 2){
				            	   if(typeof(worldCharacter) != "undefined" && worldCharacter.length > 0){
				            		   Alliance.getAllianceByCountry(countryName[countryIndex],--worldPage,doGetAllianceByCountry);
				            	   }else
				            		   alert("没有成员数据！");
			               	   }
			               }
			               
						 	for(var i=0; i<worldCharacter.length; i++){
					 			var formX = worldForm[6][0];
					 			var formY = worldForm[6][1] - 5;
					 			var formW = worldForm[6][2];
					 			var formH = 25;
					 			
				 				var btnW = gbox.getImage('ty_an_06').width;
				 				var btnH = gbox.getImage('ty_an_06').height;
				 				
				 				var btnX = formX + (formW - btnW)/2;
				 				var btnY = formY + (formH - btnH)/2 + (i * 26);
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
						        {
									worldIndex = i;
									Alliance.getAllAllianceByName(worldCharacter[i].name,doGetAllAllianceByName);
//									popMember(getClickObjectIndex(),lastTouchMoveX,lastTouchMoveY);
//									changeMap('cityMenuLayer');	
						        }
						 	}
						 	
						 	//名称查询联盟
				            if(((685 < lastTouchMoveX) && (lastTouchMoveX < 685 + 82)) && ((575 < lastTouchMoveY) && (lastTouchMoveY < 575 + 25)))
				            {
				            	Alliance.getAllAllianceByName(findUnionName.value,doGetAllAllianceByName);	               
				            }
					}
					
					//退出外务馆
					if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
					{
						displayDestroy();
						exit(index);
						curGroup = 'cityMenu';
						enterCityMenu(curGroup);
	                    changeMap('cityMenuLayer');	
					}else
					{//重绘
						if(((1006 < lastTouchMoveX) && (lastTouchMoveX < 1090)) && ((233 < lastTouchMoveY) && (lastTouchMoveY < 258)))
						{
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
							}else 
							if(((1006 < lastTouchMoveX) && (lastTouchMoveX < 1090)) && ((197 < lastTouchMoveY) && (lastTouchMoveY < 223)))
							{
								if(buildList[lotIndex][1] == 'state_empty' && 
									buildList[lotIndex][13] == 'state_demolition_empty'){
									//拆除
									buildDemolition(lotIndex);
								}else
								if(buildList[lotIndex][1] == 'state_upgrade_start' ||
									buildList[lotIndex][13] == 'state_demolition_start'){
									//加速
									systemSpeedup(lotIndex,"建筑加速");
								}
				            }
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
				},
				blit : function()
				{
					 if(isDrawUI[index] && isWaiwuguan)
					 {

					 	gbox.drawImage('wwg_zjm_01',backdropX-2,backdropY-1);
					 	gbox.drawImage('ty_an_27',backdropX1,backdropY1 + 6);
					    gbox.drawImage('wwg_zjm_31',(gbox.getImage('wwg_zjm_01').width - gbox.getImage("wwg_zjm_31").width)/2 + backdropX,backdropY1);
					    drawBuildCommandBtn();
					 	//绘制我的信息（控制子项）
						if(selectWorM[0])
						{
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'wwg_zjm_11',tile : 0,dx :360,dy :314,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
						    });
							if(!isUnion)
							{
								var fontW = gbox.getTextWidth("联盟信息",14);
						    	for(var i = 0; i<myLianmengFont.length; i++)
							 	{
							 		gbox.drawImage('wwg_zjm_30',417,330 + i*35);	
								 	if(unionInformation[i])
								 	{
								 		gbox.drawImage('wwg_zjm_29',417,330 + i*35);
								 	}
								 	var dx = 417 + (82 - fontW)/2;
									var dy = 330 + (21 - 14)/2 + i*35;
//									gbox.drawDanceString(myLianmengFont[i], dx, dy,14,'#000000','#FFFFFF');
									gbox.drawText(myLianmengFont[i], dx, dy,8);
							 	}
							}

						}
						//绘制世界联盟（控制子项）
						if(selectWorM[1])
						{
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'wwg_zjm_12',tile : 0,dx :360,dy :450,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
						    });
							gbox.drawImage('wwg_zjm_08',539,281);
							var fontW = gbox.getTextWidth("隋",14);
							for(var i = 0; i<5; i++)
							{
								gbox.drawImage('wwg_zjm_30',417,351 + i*35);	
								if(worldInformation[i])
								{
									gbox.drawImage('wwg_zjm_29',417,351 + + i*35);
								}
												
								var dx = 416 + (82 - fontW)/2;
								var dy = 350 + (21 - 14)/2 + (i*35);
//								gbox.drawDanceString(countryName[i], dx, dy,14,'#000000','#FFFFFF');
								gbox.drawText(countryName[i], dx, dy,8);
							}	
							
						 	for(var i=0; i<worldCharacter.length; i++){
						 		for(var j=0; j<worldForm.length; j++){
						 			var fontW = gbox.getTextWidth(worldInfo[i][j],14);
						 			var formX = worldForm[j][0];
						 			var formY = worldForm[j][1] - 5;
						 			var formW = worldForm[j][2];
						 			var formH = 26;
						 			
						 			if(j == worldForm.length - 1){
						 				var btnW = gbox.getImage('ty_an_06').width;
						 				var btnH = gbox.getImage('ty_an_06').height;
						 				var btnX = formX + (formW - btnW)/2;
						 				var btnY = formY + (formH - btnH)/2 + (i * 27);
						 				gbox.drawImage('ty_an_08',btnX,btnY);
										if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
								        {
								               gbox.drawImage('ty_an_06',btnX,btnY);
								        }
							               var strW = gbox.getTextWidth("查看",14);
							               var strX = btnX + (btnW - strW)/2 - 2;
							               var strY = btnY + (btnH - 14)/2;
//							               gbox.drawDanceString("查看", strX, strY,14,'#000000','#FFFFFF');	
							               gbox.drawText("查看", strX, strY,10);
						 			}else{
									 	var dx = formX + (formW - fontW)/2;
										var dy = formY + (formH - 14)/2 + i*formH;
//										gbox.drawDanceString("" + worldInfo[i][j], dx, dy,14,'#000000','#FFFFFF');
										gbox.drawText("" + worldInfo[i][j], dx, dy,2);
						 			}

						 		}
						 	}
						 	
							//绘制翻页数字及按钮
							gbox.blitSystemText(gbox.getBufferContext(),
								{
									text : "" + worldPage,
									color : '#FFFFFF',
									font : 'bold 12px sans-serif',
									x : 708 + 260,
									y : 581
																	
								});
		                    gbox.blitSystemText(gbox.getBufferContext(),
								{
									text : "/",
									color : '#FFFFFF',
									font : 'bold 12px sans-serif',
									x : 719 + 260,
									y : 581
																	
								});
						    gbox.blitSystemText(gbox.getBufferContext(),
								{
									text : "" + worldPages,
									color : '#ffffff',
									font : 'bold 12px sans-serif',
									x : 729 + 260,
									y : 581
																	
								});
							if(worldPage < worldPages)
							  gbox.drawImage("ty_an_24",1017,580);
							if(worldPage > 1)
							  gbox.drawImage("ty_an_25",1035,580);
							
							var fontW = gbox.getTextWidth("查找联盟",14);
							var dx = 680 + (82 - fontW)/2 + 1;
						 	var dy = 574 + (25 - 14)/2 + 2;
						 	gbox.drawImage('ty_an_10',680,575);				 	
				            if(((680 < touchMoveX) && (touchMoveX < 680 + 82)) && ((575 < touchMoveY) && (touchMoveY < 575 + 25)))
				            {
				                gbox.drawImage('ty_an_09',680,575); 
				            }
//				            gbox.drawDanceString("查找联盟", dx, dy,14,'#000000','#FFFFFF');
				            gbox.drawText("查找联盟", dx, dy,10);
						}
						if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						   }
//						   gbox.drawTxtRect(buildCommonDesc[lotIndex],450,190,290,70,20,'#ffffff','#000000');
//						   gbox.drawText(buildCommonDesc[lotIndex],450,190,0);
						   gbox.drawLineBreakText(buildCommonDesc[lotIndex],444,198,0,544);
					 }						
				}
			});

};

var isKInfo = false;
var worldAllianceInfo = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isKInfo = true;
	var infoOffsetY = 0;
	var bW = gbox.getImage('wwg_zjm_37').width;
	var bH = gbox.getImage('wwg_zjm_37').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 16;
	var exitY = backdropY - 7;		    
		gbox.addObject(
			{ 
				id : 'worldAllianceInfo',
				group : 'levelMenu_3',
				tileset : 'wwg_zjm_37',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					if(findUnionDiv != null)
					{
						  document.body.removeChild(findUnionDiv);  
				          findUnionDiv = null;
					}
				},
				first : function() 
				{
				},
				myclick : function()
				{
		            if(((573 < lastTouchMoveX) && (lastTouchMoveX < 573 + 82)) && ((482 - infoOffsetY < lastTouchMoveY) && (lastTouchMoveY < (482 - infoOffsetY) + 25)))
		            {//查看成员
						isDrawUI[index] = false;
						isKInfo = false;	
					    clickObjectList[index].poly= [[0,0],[0,0],[0,0],[0,0]];
						displayDestroy();
						exit(getClickObjectIndex());
						waiwuguan(getClickObjectIndex());
						if(selectWorM[0]){
							unionCreat(getClickObjectIndex());
						}
						changeMap('cityMenuLayer');
		            	Alliance.getAllAllianceMember(allianceData.allianceId,findPage,doGetFindAllianceMember);
		            	console.log("查看成员!!!");
		            }else
		            if(((778 < lastTouchMoveX) && (lastTouchMoveX < 783 + 82)) && ((482 - infoOffsetY < lastTouchMoveY) && (lastTouchMoveY < (482 - infoOffsetY) + 25)))
		            {//申请加入 
						isDrawUI[index] = false;
						isKInfo = false;	
					    clickObjectList[index].poly= [[0,0],[0,0],[0,0],[0,0]];
						displayDestroy();
						exit(getClickObjectIndex());
						waiwuguan(getClickObjectIndex());
						if(selectWorM[0]){
							unionCreat(getClickObjectIndex());
						}
						changeMap('cityMenuLayer');
		            	Alliance.applyAllianceApplication(allianceData.allianceId,doApplyAllianceApplication);
		            	console.log("申请加入!!!");
		            }else
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23)){
						displayDestroy();
						exit(index);
						waiwuguan(getClickObjectIndex());
						
						if(selectWorM[0]){
							unionCreat(getClickObjectIndex());
						}
						
				        changeMap('cityMenuLayer');
					}
					else{
//						selectWorM[0] = false;
//						selectWorM[1] = true;
						waiwuguan(getClickObjectIndex());
						worldAllianceInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isKInfo)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'wwg_zjm_37',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });
					 
				        if(typeof(allianceInfo) != "undefined" && typeof(allianceData) != "undefined"){
					        for(var i=0; i<4; i++){
					        	for(var j=0; j<2; j++){
//					        		gbox.drawString("" + allianceInfo[i][j],623 + (j * 180), (266 - infoOffsetY) + (i*25),'#FFFFFF',12);
					        		gbox.drawText("" + allianceInfo[i][j],623 + (j * 180), (266 - infoOffsetY) + (i*25),2);
					        	}
					        }
//					        gbox.pointTxtRect(allianceData.introduction,558,395,200,16,'#ffffff','#000000');
					        gbox.drawLineBreakText(allianceData.introduction,558,395,12,250);
//					        gbox._drawTxtRect(allianceData.introduction,558,370 - infoOffsetY,300,100,16,'#ffffff','#000000');
				        }
				        
				        
						var fontW = gbox.getTextWidth("查看成员",14);
						var dx = 571 + (84 - fontW)/2;
					 	var dy = 481 + (26 - 14)/2 - infoOffsetY;
					 	gbox.drawImage('ty_an_10',572,481 - infoOffsetY);			 	
			            if(((573 < touchMoveX) && (touchMoveX < 573 + 82)) && ((482 - infoOffsetY < touchMoveY) && (touchMoveY < (482 - infoOffsetY) + 25)))
			            {
			                gbox.drawImage('ty_an_09',572,481 - infoOffsetY);
			            }
//			            gbox.drawDanceString("查看成员", dx, dy,14,'#000000','#FFFFFF');	
			            gbox.drawText("查看成员", dx, dy,10);
						var dx = 781 + (84 - fontW)/2;
					 	var dy = 481 + (26 - 14)/2 - infoOffsetY;
					 	gbox.drawImage('ty_an_10',782,481 - infoOffsetY);				 	
			            if(((778 < touchMoveX) && (touchMoveX < 783 + 82)) && ((482 - infoOffsetY < touchMoveY) && (touchMoveY < (482 - infoOffsetY) + 25)))
			            {
			                gbox.drawImage('ty_an_09',782,481 - infoOffsetY);     
			            }
//			            gbox.drawDanceString("申请加入", dx, dy,14,'#000000','#FFFFFF');	
			            gbox.drawText("申请加入", dx, dy,10);
			            
						   if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
						   {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_17',
									tile : 0,
									dx : exitX - 2,
									dy : exitY + 10,
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
									tileset : 'ty_an_18',
									tile : 0,
									dx : exitX - 2,
									dy : exitY + 10,
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

//世界联盟信息
var allianceData = undefined;
var allianceInfo = new Array(new Array());
function doGetAllAllianceByName(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	var temp = data;
	allianceData = undefined;
	allianceData = {
			allianceId:temp.allianceId,
			banner:temp.banner,
			bulletin:temp.bulletin,
			chief:temp.chief,
			country:temp.country,
			introduction:temp.introduction,
			level:temp.level,
			memberAmount:temp.memberAmount,
			name:temp.name,
			owncountry:temp.owncountry,
			wealth:temp.wealth,
    };
	
	if(typeof(allianceData) != "undefined"){
		allianceInfo = new Array(new Array());
		allianceInfo = [
		            ["" + allianceData.name,"" + allianceData.chief],
		            ["" + allianceData.country,"" + allianceData.banner],
		            ["" + allianceData.level,"" + allianceData.wealth],
		            ["" + allianceData.owncountry,"" + allianceData.memberAmount]
		];
	}
    worldAllianceInfo(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}


var charOfallianceId = undefined;
var charAuthoLevel = undefined;
function dataGetAlliance(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
	allianceData = undefined;
	allianceData = 
	{
		allianceId:data.allianceId,
		authoLevel:data.authoLevel,
		capacity : data.capacity,
		countryName : data.country,
		curMumberNum : data.memberAmount,
		curPrefectureNum : data.owncountry,
		flag : data.banner,
		level : data.level,
		name : data.name,
		ownerName : data.chief,
		description : data.introduction,//描述
		bulletin : data.bulletin,//公告
	};
	charOfallianceId = undefined;
	charOfallianceId = allianceData.allianceId;
	charAuthoLevel = undefined;
	charAuthoLevel = allianceData.authoLevel;
	
//    displayDestroy();
//    exit(getClickObjectIndex());
	waiwuguan(getClickObjectIndex());
	for(var i=0; i<myLianmengFont.length; i++){
	unionInformation[i] = false;
    }
    unionInformation[0] = true;
    
    unionIndex = 0;
    
	if(data.isAlliance == 1)
	{
		isUnion = true;
		unionCreat(getClickObjectIndex());
		console.log("creat=====================");
	}
	else{
		isUnion = false;
		unionInfo(getClickObjectIndex());
		console.log("Info=====================");
	}

	changeMap('cityMenuLayer');
}

var worldCharacter = new Array();
var worldPage = 0;
var worldPages = 0;
var userCharacterAuthoLevel = 0;
var worldInfo = new Array();
var qzInfo = undefined;
function doGetAllianceByCountry(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	worldPage = data.page;
	worldPages = data.pages;
	userCharacterAuthoLevel = data.userCharacterAuthoLevel;
		
	if(worldPages > 0 && worldPage == 0)
		worldPage = 1;
	else 
		worldPage = worldPage;
	worldCharacter = new Array();
	worldInfo = new Array();
    if(data.alliance != null){
	    for(var i=0; i<data.alliance.length; i++){
	    	var temp = data.alliance[i];
	    	worldCharacter[i] = 
	    	{
	    			banner:temp.banner,
	    			bulletin : temp.bulletin,
	    			chief : temp.chief,
	    			country : temp.country,
	    			friendStatus : temp.friendStatus,
	    			id : temp.id,
	    			introduction : temp.introduction,
	    			level : temp.level,
	    			memberAmount : temp.memberAmount,
	    			name : temp.name,
	    			ownCountry : temp.ownCountry,
	    			wealth : temp.wealth,
	    	};
	    	worldInfo[i] = new Array();
	    	worldInfo[i][0] = worldCharacter[i].name;
	    	worldInfo[i][1] = worldCharacter[i].level;
	    	worldInfo[i][2] = worldCharacter[i].chief;
	    	worldInfo[i][3] = worldCharacter[i].memberAmount;
	    	worldInfo[i][4] = worldCharacter[i].ownCountry;
	    	worldInfo[i][5] = worldCharacter[i].wealth;
	    }	
    }
    else{
    	worldPage = 0;
    	worldPages = 0;
    }
    	
    waiwuguan(getClickObjectIndex());
	changeMap('cityMenuLayer');
}