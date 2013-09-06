var commandLianmengFont = ["君主禅让","联盟升级","修改信息","联盟大事","邀请成员","批准加入","联盟解散","退出联盟"];
var isUnionInfo = false;
var chiefDemiseDiv;
var chiefDemiseText;
var unionInfo = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionInfo = true;
	var bW = gbox.getImage('wwg_zjm_04').width;
	var bH = gbox.getImage('wwg_zjm_04').height;
	var backdropX = 539;
	var backdropY = 281;
		gbox.addObject(
			{ 
				id : "unionInfo",
				group : 'levelMenu_2',
				tileset : 'wwg_zjm_04',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{

//					if(unionDescribeDiv == null && !gbox._isIndwellDiv("unionDescribeDiv","input"))
//					{
//						var pnX = 793;
//						var pnY = 318;
//						unionDescribeDiv = addDivWindowBg(pnX,pnY);
//						unionDescribeDiv.id = 'unionDescribeDiv';
//						document.body.appendChild(unionDescribeDiv);
//						unionDesText = document.createElement("textarea");
//						unionDesText.id = 'unionDesText';
//						unionDesText.style.opacity="0.5";
//						unionDesText.style.backgroundColor = "#272120";
//						unionDesText.style.color = "#ffffff";
//						unionDesText.style.width = '298px';
//						unionDesText.style.height = '120px';
//						unionDesText.style.background = "transparent";
//						unionDesText.style.border = "0px solid";
//						unionDesText.style.outline = "none";
//						unionDesText.style.resize= 'none';
//						unionDesText.disabled = 'disabled';
//						unionDescribeDiv.appendChild(unionDesText);
//		            }	 
//					
//					if(unionBulletinDiv == null && !gbox._isIndwellDiv("unionBulletinDiv","input"))
//					{
//						var pnX = 793;
//						var pnY = 478;
//						unionBulletinDiv = addDivWindowBg(pnX,pnY);
//						unionBulletinDiv.id = 'unionBulletinDiv';
//						document.body.appendChild(unionBulletinDiv);
//						unionBulletinText = document.createElement("textarea");
//						unionBulletinText.id = 'unionBulletinText';
//						unionBulletinText.style.opacity="0.5";
//						unionBulletinText.style.backgroundColor = "#272120";
//						unionBulletinText.style.color = "#ffffff";
//						unionBulletinText.style.width = '298px';
//						unionBulletinText.style.height = '116px';
//						unionBulletinText.style.background = "transparent";
//						unionBulletinText.style.border = "0px solid";
//						unionBulletinText.style.outline = "none";
//						unionBulletinText.style.resize= 'none';
//						unionBulletinText.disabled = 'disabled';
//						unionBulletinDiv.appendChild(unionBulletinText);
//		            }	 
					
             
				},
				first : function() 
				{
					//有联盟状态
//					adaptiveDiv(unionBulletinDiv,"unionBulletinDiv",793);
//					adaptiveDiv(unionDescribeDiv,"unionDescribeDiv",793);
//					
//					if(typeof(allianceData) !=  "undefined")
//				         unionDesText.innerHTML = allianceData.description;
//					
//					if(typeof(allianceData) !=  "undefined")
//						unionBulletinText.innerHTML = allianceData.bulletin;
				},
				myclick : function()
				{
					waiwuguan(getClickObjectIndex());
					unionInfo(getClickObjectIndex());
					changeMap('cityMenuLayer');	
					
					//盟主禅让
				 	if(allianceData.authoLevel >= 9)
				 	{
			            if(((560 < lastTouchMoveX) && (lastTouchMoveX < (560 + 82))) && ((485 < lastTouchMoveY) && (lastTouchMoveY < (485 + 25))))
			            {
				        	unionInfo(getClickObjectIndex());
				        	chiefDemise(getClickObjectIndex());
							changeMap('cityMenuLayer');
			            	console.log("盟主禅让");              
			            }
				 	}
				 	//联盟升级
		            if(((694 < lastTouchMoveX) && (lastTouchMoveX < (694 + 82))) && ((485 < lastTouchMoveY) && (lastTouchMoveY < (485 + 25))))
		            {
		            	Alliance.allianceUpgradeInfo(doAllianceUpgradeInfo);
		            	console.log("联盟升级");   			               
		            }
		            //修改信息
		            if(((560 < lastTouchMoveX) && (lastTouchMoveX < (560 + 82))) && ((515 < lastTouchMoveY) && (lastTouchMoveY < (515 + 25))))
		            {
		            	Alliance.getAllianceInfo(doGetAllianceInfo);
		            	console.log("修改信息");   			               
		            }
		            //联盟大事
		            if(((694 < lastTouchMoveX) && (lastTouchMoveX < (694 + 82))) && ((515 < lastTouchMoveY) && (lastTouchMoveY < (515 + 25))))
		            {
		            	Alliance.getAllianceEvent(dashiPage,doGetAllianceEvent);
		            	console.log("联盟大事"); 			               
		            }
				 	//邀请成员
		            if(((560 < lastTouchMoveX) && (lastTouchMoveX < (560 + 82))) && ((543 < lastTouchMoveY) && (lastTouchMoveY < (543 + 25))))
		            {
			        	unionInfo(getClickObjectIndex());
			        	yaoqing(getClickObjectIndex());
						changeMap('cityMenuLayer');
		            	console.log("邀请成员"); 			               
		            }
		            //批准加入
		            if(((694 < lastTouchMoveX) && (lastTouchMoveX < (694 + 82))) && ((543 < lastTouchMoveY) && (lastTouchMoveY < (543 + 25))))
		            {
		            	Alliance.getAllAllianceApplication(pizhunPage,doGetAllAllianceApplication);
		            	console.log("批准加入"); 			               
		            }	
		            //联盟解散
		            if(((560 < lastTouchMoveX) && (lastTouchMoveX < (560 + 82))) && ((572 < lastTouchMoveY) && (lastTouchMoveY < (572 + 25))))
		            {
		            	Alliance.removeAlliance(doRemoveAlliance);
		            	console.log("联盟解散"); 				               
		            }
					//退出联盟
		            if(((694 < lastTouchMoveX) && (lastTouchMoveX < (694 + 82))) && ((572 < lastTouchMoveY) && (lastTouchMoveY < (572 + 25))))
		            {
			        	quitAlliancePop(getClickObjectIndex());
						changeMap('cityMenuLayer');
                        console.log("退出联盟");               
		            }	

	
				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionInfo)
					 {
						 //联盟信息绘制
//					 		gbox.drawImage('lightBg',417,351);	
					 		gbox.drawImage('wwg_zjm_04',539,281);
					 		var fontW = gbox.getTextWidth(commandLianmengFont[0],14);
					 		
					 		var dx = 553 + (84 - fontW)/2;
						 	var dy = 485 + (26 - 14)/2;
						 	gbox.drawImage('ty_an_10',553,485);
						 	if(allianceData.authoLevel >= 9)
						 	{
					            if(((560 < touchMoveX) && (touchMoveX < (560 + 82))) && ((485 < touchMoveY) && (touchMoveY < (485 + 25))))
					            {
					                gbox.drawImage('ty_an_09',553,485);
								 			               
					            }
						 	}else
						 		gbox.drawImage('ty_an_11',553,485);
//						 	gbox.drawDanceString(commandLianmengFont[0], dx, dy,14,'#000000','#FFFFFF');	
						 	gbox.drawText(commandLianmengFont[0], dx, dy,10);
						 	var dx = 687 + (84 - fontW)/2;
						 	var dy = 485 + (26 - 14)/2;
						 	gbox.drawImage('ty_an_10',687,485);	
				            if(((694 < touchMoveX) && (touchMoveX < (694 + 82))) && ((485 < touchMoveY) && (touchMoveY < (485 + 25))))
				            {
				                gbox.drawImage('ty_an_09',687,485);	               
				            }
//				            gbox.drawDanceString(commandLianmengFont[1], dx, dy,14,'#000000','#FFFFFF');	
				            gbox.drawText(commandLianmengFont[1], dx, dy,10);
				            var dx = 553 + (84 - fontW)/2;
						 	var dy = 515 + (26 - 14)/2;
						 	gbox.drawImage('ty_an_10',553,514);
				            if(((560 < touchMoveX) && (touchMoveX < (560 + 82))) && ((515 < touchMoveY) && (touchMoveY < (515 + 25))))
				            {
				                gbox.drawImage('ty_an_09',553,514);	               
				            }
//				            gbox.drawDanceString(commandLianmengFont[2], dx, dy,14,'#000000','#FFFFFF');
				            gbox.drawText(commandLianmengFont[2], dx, dy,10);
				            var dx = 687 + (84 - fontW)/2;
						 	var dy = 515 + (26 - 14)/2;
						 	gbox.drawImage('ty_an_10',687,514);
				            if(((694 < touchMoveX) && (touchMoveX < (694 + 82))) && ((515 < touchMoveY) && (touchMoveY < (515 + 25))))
				            {
				                gbox.drawImage('ty_an_09',687,514);	               
				            }
//				            gbox.drawDanceString(commandLianmengFont[3], dx, dy,14,'#000000','#FFFFFF');
				            gbox.drawText(commandLianmengFont[3], dx, dy,10);
				            var dx = 553 + (84 - fontW)/2;
						 	var dy = 543 + (26 - 14)/2;
						 	gbox.drawImage('ty_an_10',553,543);
				            if(((560 < touchMoveX) && (touchMoveX < (560 + 82))) && ((543 < touchMoveY) && (touchMoveY < (543 + 25))))
				            {
				                gbox.drawImage('ty_an_09',553,543);       
				            }
//				            gbox.drawDanceString(commandLianmengFont[4], dx, dy,14,'#000000','#FFFFFF');
				            gbox.drawText(commandLianmengFont[4], dx, dy,10);
				            var dx = 687 + (84 - fontW)/2;
						 	var dy = 543 + (26 - 14)/2;
						 	gbox.drawImage('ty_an_10',687,543);
				            if(((694 < touchMoveX) && (touchMoveX < (694 + 82))) && ((543 < touchMoveY) && (touchMoveY < (543 + 25))))
				            {
				                gbox.drawImage('ty_an_09',687,543);          
				            }	
//				            gbox.drawDanceString(commandLianmengFont[5], dx, dy,14,'#000000','#FFFFFF');
				            gbox.drawText(commandLianmengFont[5], dx, dy,10);
				            var dx = 553+ (84 - fontW)/2;
						 	var dy = 572 + (26 - 14)/2;
						 	gbox.drawImage('ty_an_10',553,572);
				            if(((560 < touchMoveX) && (touchMoveX < (560 + 82))) && ((572 < touchMoveY) && (touchMoveY < (572 + 25))))
				            {
				                gbox.drawImage('ty_an_09',553,572);              
				            }	
//				            gbox.drawDanceString(commandLianmengFont[6], dx, dy,14,'#000000','#FFFFFF');
				            gbox.drawText(commandLianmengFont[6], dx, dy,10);
				            var dx = 687 + (84 - fontW)/2;
						 	var dy = 572 + (26 - 14)/2;
						 	gbox.drawImage('ty_an_10',687,572);
				            if(((694 < touchMoveX) && (touchMoveX < (694 + 82))) && ((572 < touchMoveY) && (touchMoveY < (572 + 25))))
				            {
				                gbox.drawImage('ty_an_09',687,572);   
				            }	
//				            gbox.drawDanceString(commandLianmengFont[7], dx, dy,14,'#000000','#FFFFFF');	
				            gbox.drawText(commandLianmengFont[7], dx, dy,10);
				            if(typeof(allianceData) != "undefined")
						 	{
//							 	gbox.drawString("" + allianceData.name,634, 300,'#FFFFFF',14);
							 	gbox.drawText("" + allianceData.name,634, 300,2);
							 	gbox.drawImage('wwg_zjm_46',750,293);
							 	var imgW = gbox.getImage('wwg_zjm_46').width;
							 	var fontW = gbox.getTextWidth(allianceData.flag,18);
							 	var flagX = 749 + (imgW - fontW)/2;
//							 	gbox.drawString("" + allianceData.flag,flagX, 298,'#FFFFFF',18);
							 	gbox.drawText(allianceData.flag,flagX, 298,2);
//							 	gbox.drawString("" + allianceData.countryName,634, 332,'#FFFFFF',14);
							 	gbox.drawText(allianceData.countryName,634, 332,2);
//							 	gbox.drawString("" + allianceData.ownerName,634, 364,'#FFFFFF',14);
							 	gbox.drawText(allianceData.ownerName,634, 364,2);
//							 	gbox.drawString("" + allianceData.level,634, 396,'#FFFFFF',14);
							 	gbox.drawText(allianceData.level,634, 396,2);
//							 	gbox.drawString("" + allianceData.curPrefectureNum,634, 428,'#FFFFFF',14);
							 	gbox.drawText(allianceData.curPrefectureNum,634, 428,2);
//							 	gbox.drawString("" + allianceData.curMumberNum,634, 460,'#FFFFFF',14);
							 	gbox.drawText(allianceData.curMumberNum,634, 460,2);
//							 	gbox.pointTxtRect(allianceData.description,800,322,180,14,'#ffffff','#000000');
							 	gbox.drawLineBreakText(allianceData.description,800,322,12,250);
							 	if(typeof(allianceData.bulletin) != 'undefined' && allianceData.bulletin != null)
							 		gbox.drawLineBreakText(allianceData.bulletin,800,482,12,250);
//							 	        gbox.pointTxtRect(allianceData.bulletin,800,482,180,14,'#ffffff','#000000');
						 	}
					 }						
				}
			});

};

//修改信息
var isEditInfo = false;
var editDescribeDiv;
var editDesText;
var editBulletinDiv;
var editBulletinText;
var editInfo = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isEditInfo = true;
	var bW = gbox.getImage('wwg_zjm_22').width;
	var bH = gbox.getImage('wwg_zjm_22').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'editInfo',
				group : 'levelMenu_4',
				tileset : 'wwg_zjm_22',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{

					if(editDescribeDiv == null && !gbox._isIndwellDiv("editDescribeDiv","input"))
					{
						var pnX = 507;
						var pnY = 240;
						
						editDescribeDiv = addDivWindowBg(pnX,pnY);
						editDescribeDiv.id = 'editDescribeDiv';
						document.body.appendChild(editDescribeDiv);
						editDesText = document.createElement("textarea");
						editDesText.id = 'editDesText';
						editDesText.style.opacity="0.5";
						editDesText.style.backgroundColor = "#272120";
						editDesText.style.color = "#cca076";
						editDesText.style.width = '421px';
						editDesText.style.height = '122px';
//						editDesText.style.background = "transparent";
//						editDesText.style.border = "0px solid";
//						editDesText.style.outline = "none";
//						editDesText.style.resize= 'none';
						if(typeof(updataIntroduction) !=  "undefined")
							  editDesText.value = updataIntroduction;
						editDescribeDiv.appendChild(editDesText);
		            }	 
					
					if(editBulletinDiv == null && !gbox._isIndwellDiv("editBulletinDiv","input"))
					{
						var pnX = 507;
						var pnY = 380;
						editBulletinDiv = addDivWindowBg(pnX,pnY);
						editBulletinDiv.id = 'editBulletinDiv';
						document.body.appendChild(editBulletinDiv);
						editBulletinText = document.createElement("textarea");
						editBulletinText.id = 'editBulletinText';
						editBulletinText.style.opacity="0.5";
						editBulletinText.style.backgroundColor = "#272120";
						editBulletinText.style.color = "#cca076";
						editBulletinText.style.width = '421px';
						editBulletinText.style.height = '100px';
//						editBulletinText.style.background = "transparent";
//						editBulletinText.style.border = "0px solid";
//						editBulletinText.style.outline = "none";
//						editBulletinText.style.resize= 'none';
						if(typeof(updataBulletin) !=  "undefined")
							editBulletinText.value = updataBulletin;
						editBulletinDiv.appendChild(editBulletinText);
		            }	 
					
             
				},
				first : function() 
				{
					//有联盟状态
					adaptiveDiv(editDescribeDiv,"editDescribeDiv",507);
					adaptiveDiv(editBulletinDiv,"editBulletinDiv",507);
				},
				myclick : function()
				{
				    var btnW = gbox.getImage('ty_an_08').width;
				    var btnH = gbox.getImage('ty_an_08').height;
					if(((811 < lastTouchMoveX) && (lastTouchMoveX < (811 + btnW))) && ((488 < lastTouchMoveY) && (lastTouchMoveY < (488 + btnH))))
			        {
						

						if(typeof(updataInfoLight) != undefined && updataInfoLight){
							displayDestroy();
							isDrawUI[index] = false;
							isEditInfo = false;	
						    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
							waiwuguan(getClickObjectIndex());
							unionInfo(getClickObjectIndex());
							changeMap('cityMenuLayer');
							//修改信息（保存）
							Alliance.changeAllianceInfo(editDesText.value,editBulletinText.value,doChangeAllianceInfo);
						}

			            console.log("保存");             
			        }else
					if(((874 < lastTouchMoveX) && (lastTouchMoveX < (874 + btnW))) && ((488 < lastTouchMoveY) && (lastTouchMoveY < (488 + btnH))))
				    {
						displayDestroy();
						isDrawUI[index] = false;
						isEditInfo = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
						waiwuguan(getClickObjectIndex());
						unionInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
						console.log("取消");              
				    }else{
						waiwuguan(getClickObjectIndex());
						unionInfo(getClickObjectIndex());
						editInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
				    }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isEditInfo)
					 {
						 //修改信息绘制
						 	gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'wwg_zjm_22',
								tile : 0,
								dx :backdropX,
								dy :backdropY,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
							});
						 	
						 	
						    var fontW = gbox.getTextWidth("保存",14);
						    var btnW = gbox.getImage('ty_an_08').width;
						    var btnH = gbox.getImage('ty_an_08').height;
                            var btnX1 = 811;
						    var btnY1 = 488;
						    gbox.drawImage('ty_an_08',btnX1,btnY1);
						    var backX = btnX1 + (btnW - fontW)/2 - 2;
							var backY = btnY1 + (25 - 14)/2;
							if(typeof(updataInfoLight) != undefined && updataInfoLight)
							{
								if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + btnW))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + btnH))))
						        {
						               gbox.drawImage('ty_an_06',btnX1,btnY1);               
						        }
							}else
								gbox.drawImage('ty_an_05',btnX1,btnY1);  

//							gbox.drawDanceString("保存", backX, backY,14,'#000000','#FFFFFF');		
							gbox.drawText("保存", backX, backY,10);
							
                            var btnX1 = 874;
						    var btnY1 = 488;
						    gbox.drawImage('ty_an_08',btnX1,btnY1);
						    var backX = btnX1 + (btnW - fontW)/2 - 2;
							var backY = btnY1 + (25 - 14)/2;
							
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + btnW))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + btnH))))
					        {
					               gbox.drawImage('ty_an_06',btnX1,btnY1);               
					        }
//							gbox.drawDanceString("取消", backX, backY,14,'#000000','#FFFFFF');	
							gbox.drawText("取消", backX, backY,10);
				     }
				}
			});

};


//联盟升级
var isUnionUpLevel = false;
var unionUpLevel = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionUpLevel = true;
	var quitAllianceOffsetY = 25;
	var bW = gbox.getImage('wwg_zjm_18').width;
	var bH = gbox.getImage('wwg_zjm_18').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 15;
	var exitY = backdropY - 5;	
		gbox.addObject(
			{ 
				id : 'unionUpLevel',
				group : 'levelMenu_4',
				tileset : 'wwg_zjm_18',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{

				},
				first : function() 
				{
					if(unionUpLevelTime !=  "等待刷新！")
					{
				        if(unionUpLevelTime == "00:00:00"){
			    			Alliance.allianceUpgradeInfo(doAllianceUpgradeInfo);
				        }
					}
				},
				myclick : function()
				{
					if(typeof(upgradeInfo) != 'undefined')
					if(unionUpLevelTime ==  "等待刷新！" && upgradeInfo.isLight)
					{
					    var fontW = gbox.getTextWidth("升  级",14);
	                    var btnX1 = backdropX + bW - 92;
					    var btnY1 = backdropY + bH - gbox.getImage('ty_an_10').height - 10;
					    gbox.drawImage('ty_an_10',btnX1,btnY1);
					    var backX = btnX1 + (82 - fontW)/2 - 2;
						var backY = btnY1 + (25 - 14)/2;
						if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + 25))))
				        {
							//确认升级
							Alliance.allianceUpgrade(doAllianceUpgrade);
							console.log("升级");
				        }
					}

					
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23))
					{
						displayDestroy();
						exit(index);
						waiwuguan(getClickObjectIndex());
						unionInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
					}
					else{
			        	unionInfo(getClickObjectIndex());
			        	unionUpLevel(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionUpLevel)
					 {
						 var strOffsetX = 150;
						 var bgW = gbox.getImage('wwg_zjm_18').width;
						 var bgH = gbox.getImage('wwg_zjm_18').height;
						 gbox.drawImage('wwg_zjm_18',backdropX,backdropY);
						 
						    var fontW = gbox.getTextWidth("升  级",14);
                            var btnX1 = backdropX + bgW - 92;
						    var btnY1 = backdropY + bgH - gbox.getImage('ty_an_10').height - 10;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2 - 2;
							var backY = btnY1 + (25 - 14)/2;
						if(typeof(upgradeInfo) != 'undefined'){
							if(unionUpLevelTime ==  "等待刷新！" && upgradeInfo.isLight)
							{
								if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
						        {
						               gbox.drawImage('ty_an_09',btnX1,btnY1);               
						        }
							}else
								gbox.drawImage('ty_an_11',btnX1,btnY1);   
							
	                        
//							gbox.drawDanceString("升  级", backX, backY,14,'#000000','#FFFFFF');	
							gbox.drawText("升  级", backX, backY,10);
//							gbox.drawDanceString(upgradeInfo.nowLevel, 458 + strOffsetX , 302, 14, '#000000', '#FFFFFF');	
							gbox.drawText(upgradeInfo.nowLevel, 458 + strOffsetX , 302,2);
//							gbox.drawDanceString(upgradeInfo.nowMemberLimit, 646 + strOffsetX, 302, 14, '#000000', '#FFFFFF');	
							gbox.drawText(upgradeInfo.nowMemberLimit, 646 + strOffsetX, 302,2);
//							gbox.drawDanceString(upgradeInfo.nextLevel, 470 + strOffsetX, 329, 14, '#000000', '#FFFFFF');	
							if(typeof(upgradeInfo.nextLevel) != 'undefined')
							gbox.drawText(upgradeInfo.nextLevel, 470 + strOffsetX, 329,2);
//							gbox.drawDanceString(upgradeInfo.nextMemberLimit, 646 + strOffsetX, 329, 14, '#000000', '#FFFFFF');	
							if(typeof(upgradeInfo.nextMemberLimit) != 'undefined')
							gbox.drawText(upgradeInfo.nextMemberLimit, 646 + strOffsetX, 329,2);
//							gbox.drawDanceString(upgradeInfo.needWealth, 488 + strOffsetX, 387, 14, '#000000', '#FF0000');	
							if(typeof(upgradeInfo.needWealth) != 'undefined')
							gbox.drawText(upgradeInfo.needWealth, 488 + strOffsetX, 387,2);
//							gbox.drawDanceString(changeTimeformat(upgradeInfo.nextMemberLimit*1000), 456 + strOffsetX, 412, 14, '#000000', '#FFFFFF');	
							if(typeof(upgradeInfo.nextMemberLimit) != 'undefined')
							gbox.drawText(changeTimeformat(upgradeInfo.nextMemberLimit*1000), 456 + strOffsetX, 412,2);
						}
							
							if(unionUpLevelTime !=  "等待刷新！")
							{
								var needTimeW = gbox.getTextWidth("联盟升级: " + unionUpLevelTime,14);
								gbox.drawImage('wwg_zjm_19',backdropX,backdropY + 104);
								var barW = gbox.getImage('wwg_zjm_19').width;
								var barH = gbox.getImage('wwg_zjm_19').height;
								var needTimeX = backdropX + (barW - needTimeW)/2;
								var needTimeY = (backdropY + 100) + (barH - 14)/2;
//								gbox.drawDanceString("联盟升级: " + unionUpLevelTime, needTimeX, needTimeY, 14, '#000000', '#FBC65F');
								gbox.drawText("联盟升级: " + unionUpLevelTime, needTimeX, needTimeY,10);
								var bw = Math.floor(((411) * (unionUpLevelCnt * 1000)) / upgradeInfo.needTime); 
							    
						        gbox.setClip(gbox.getBufferContext(),513,412,bw,10);
						        
						        gbox.drawImage("wwg_zjm_16",513,410); 
						        
						        gbox.restoreClip(gbox.getBufferContext());	
					    		
//						        if(unionUpLevelTime == "00:00:00"){
//					    			Alliance.allianceUpgradeInfo(doAllianceUpgradeInfo);
//						        }
							}
							
							
							   if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
							   {
							   	    gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_17',
										tile : 0,
										dx : exitX - 2,
										dy : exitY + 7,
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
										dy : exitY + 7,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
								    });	
							   }
							   
							   if(typeof(upValue) != 'undefined')
								   gbox.drawText(upValue, 490 + strOffsetX, 452,10);
//							       gbox.drawDanceString(upValue, 490 + strOffsetX, 452,14,'#000000','#00FF00');	
							   
					 }						
				}
			});
};

//联盟解散
var isUnionBreakup = false;
var unionBreakup = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionBreakup = true;
	var bW = gbox.getImage('wwg_zjm_20').width;
	var bH = gbox.getImage('wwg_zjm_20').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 15;
	var exitY = backdropY - 5;	
		gbox.addObject(
			{ 
				id : 'unionBreakup',
				group : 'levelMenu_4',
				tileset : 'wwg_zjm_20',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{

				},
				first : function() 
				{
					if(unionBreakupTime !=  "等待刷新！")
					{
			    		if(unionBreakupTime == "00:00:00"){ 
			    			   isRegisterUnion = false;
			    			   Alliance.removeAlliance(doRemoveAlliance);
				        }
					}
				},
				myclick : function()
				{
					if(typeof(removeInfo) != 'undefined')
					if(unionBreakupTime ==  "等待刷新！" && removeInfo.isLight)
					{
					    var fontW = gbox.getTextWidth("解  散",14);
	                    var btnX1 = backdropX + bW - 92;
					    var btnY1 = backdropY + bH - gbox.getImage('ty_an_10').height - 10;
					    gbox.drawImage('ty_an_10',btnX1,btnY1);
					    var backX = btnX1 + (82 - fontW)/2 - 2;
						var backY = btnY1 + (25 - 14)/2;
						if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + 25))))
				        {
							//确认解散
							Alliance.disbandAlliance(doDisbandAlliance);
							console.log("确认解散");
				        }
					}else{
					    var fontW = gbox.getTextWidth("取  消",14);
	                    var btnX1 = backdropX + bW - 92;
					    var btnY1 = backdropY + bH - gbox.getImage('ty_an_10').height - 10;
					    gbox.drawImage('ty_an_10',btnX1,btnY1);
					    var backX = btnX1 + (82 - fontW)/2 - 2;
						var backY = btnY1 + (25 - 14)/2;
						if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + 25))))
				        {
							//取消解散
							Alliance.removedisbandAlliance(doRemovedisbandAlliance);
							console.log("取消解散");
				        }
					}

					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23))
					{
						displayDestroy();
						exit(index);
						waiwuguan(getClickObjectIndex());
						unionInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
					}
					else{
			        	unionInfo(getClickObjectIndex());
			        	unionBreakup(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionBreakup)
					 {
						 var strOffsetX = 150;
						 var bgW = gbox.getImage('wwg_zjm_20').width;
						 var bgH = gbox.getImage('wwg_zjm_20').height;
						 gbox.drawImage('wwg_zjm_20',backdropX,backdropY);
						 
						    var fontW = gbox.getTextWidth("解  散",14);
                            var btnX1 = backdropX + bgW - 92;
						    var btnY1 = backdropY + bgH - gbox.getImage('ty_an_10').height - 10;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2 - 2;
							var backY = btnY1 + (25 - 14)/2;
							if(typeof(removeInfo) != 'undefined'){
								if(unionBreakupTime ==  "等待刷新！" && removeInfo.isLight)
								{
									if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
							        {
							               gbox.drawImage('ty_an_09',btnX1,btnY1);               
							        }
//									gbox.drawDanceString("解  散", backX, backY,14,'#000000','#FFFFFF');
									gbox.drawText("解  散", backX, backY,10);
								}else{
									if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
							        {
							               gbox.drawImage('ty_an_09',btnX1,btnY1);               
							        }
//									gbox.drawDanceString("取  消", backX, backY,14,'#000000','#FFFFFF');
									gbox.drawText("取  消", backX, backY,10);
								}
								
//								gbox._drawTxtRect("解散联盟将丢失所有联盟数据！！！",450 + strOffsetX,300,180,50,14,'#ffffff','#000000');
								gbox.drawLineBreakText("解散联盟将丢失所有联盟数据！！！",450 + strOffsetX,300,6,280);
								if(unionBreakupTime !=  "等待刷新！")
								{
									var needTimeW = gbox.getTextWidth("联盟解散: " + unionBreakupTime,14);
									gbox.drawImage('wwg_zjm_19',backdropX,backdropY + 104);
									var barW = gbox.getImage('wwg_zjm_19').width;
									var barH = gbox.getImage('wwg_zjm_19').height;
									var needTimeX = backdropX + (barW - needTimeW)/2;
									var needTimeY = (backdropY + 100) + (barH - 14)/2;
//									gbox.drawDanceString("联盟解散: " + unionBreakupTime, needTimeX, needTimeY, 14, '#000000', '#FBC65F');
									gbox.drawText("联盟解散: " + unionBreakupTime, needTimeX, needTimeY,2);
									var bw = Math.floor(((411) * (unionBreakupCnt * 1000)) / removeInfo.needTime); 
								    
							        gbox.setClip(gbox.getBufferContext(),513,412,bw,10);
							        
							        gbox.drawImage("wwg_zjm_16",513,410); 
							        
							        gbox.restoreClip(gbox.getBufferContext());	
									
//						    		if(unionBreakupTime == "00:00:00"){ 
//						    			   isRegisterUnion = false;
//						    			   Alliance.removeAlliance(doRemoveAlliance);
////						    			   Alliance.initCharacterAlliance(dataGetAlliance);
//							        }
								}
							}

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

//盟主禅让
var isChiefDemise = false;
var chiefDemise = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isChiefDemise = true;
	var chiefDemiseOffsetY = 35;
	var bW = gbox.getImage('wwg_zjm_24').width;
	var bH = gbox.getImage('wwg_zjm_24').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'hitPop',
				group : 'levelMenu_4',
				tileset : 'wwg_zjm_24',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
                    if(chiefDemiseDiv == null && !gbox._isIndwellDiv("chiefDemiseDiv","input"))
					 {
							var pnX = 710;
							var pnY = 380;
							chiefDemiseDiv = addDivWindowBg(pnX,pnY);
							chiefDemiseDiv.id = 'chiefDemiseDiv';
							document.body.appendChild(chiefDemiseDiv);
							chiefDemiseText = document.createElement("input");
							chiefDemiseText.id = 'chiefDemiseText';
							chiefDemiseText.style.opacity="0.5";
							chiefDemiseText.style.backgroundColor = "#272120";
							chiefDemiseText.style.color = "#ffffff";
							chiefDemiseText.style.width = '270px';
							chiefDemiseText.style.height = '200px';
							chiefDemiseText.style.maxWidth = '100px';
							chiefDemiseText.style.maxHeight = '20px';
							chiefDemiseDiv.appendChild(chiefDemiseText);
					 }
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(chiefDemiseDiv,"chiefDemiseDiv",710);
					/*======================================================*/
				},
				myclick : function()
				{
				    var fontW = gbox.getTextWidth("确认",14);
					var bgW = gbox.getImage('wwg_zjm_24').width;
					var bgH = gbox.getImage('wwg_zjm_24').height;
                    var btnX = backdropX + 20;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
				    
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + chiefDemiseOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + chiefDemiseOffsetY  + 25))))
			        {
						displayDestroy();
						isDrawUI[index] = false;
						isChiefDemise = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
						Alliance.chiefDemise(chiefDemiseText.value,doChiefDemise);
					    waiwuguan(getClickObjectIndex());
					    unionInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
						console.log("确认！");
			        }else
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 + chiefDemiseOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + chiefDemiseOffsetY + 25))))
			        {
						displayDestroy();
						isDrawUI[index] = false;
						isChiefDemise = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("返回！");
					    waiwuguan(getClickObjectIndex());
					    unionInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }else{
			        	unionInfo(getClickObjectIndex());
			        	chiefDemise(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isChiefDemise)
					 {
						 var bgW = gbox.getImage('wwg_zjm_24').width;
						 var bgH = gbox.getImage('wwg_zjm_24').height;
						 gbox.drawImage('wwg_zjm_24',backdropX,backdropY);
						 
						    var fontW = gbox.getTextWidth("确认",14);
                            var btnX = backdropX + 20;
						    var btnY = backdropY + bgH/2 + chiefDemiseOffsetY ;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);			               
					        }	
							gbox.drawText("确认", backX, backY,10);
                            var btnX1 = backdropX + bgW - 102;
						    var btnY1 = backdropY + bgH/2 + chiefDemiseOffsetY;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2;
							var backY = btnY1 + (25 - 14)/2;	
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);			               
					        }	
							gbox.drawText("取消", backX, backY,10);
//							gbox._drawTxtRect("盟主只能禅让本盟成员，禅让后将降级为本盟普通成员。",610,315,200,50,8,'#ffffff','#000000');
							gbox.drawLineBreakText("盟主只能禅让本盟成员，禅让后将降级为本盟普通成员。",610,330,6,220);
					 }						
				}
			});
};

//邀请成员
var yaoqingDiv;
var yaoqingText;
var isYaoqing = false;
var yaoqing = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isYaoqing = true;
	var yaoqingOffsetY = 28;
	var bW = gbox.getImage('wwg_zjm_23').width;
	var bH = gbox.getImage('wwg_zjm_23').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'yaoqing',
				group : 'levelMenu_4',
				tileset : 'wwg_zjm_23',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
                    if(yaoqingDiv == null && !gbox._isIndwellDiv("yaoqingDiv","input"))
					 {
							var pnX = 695;
							var pnY = 360;
							yaoqingDiv = addDivWindowBg(pnX,pnY);
							yaoqingDiv.id = 'yaoqingDiv';
							document.body.appendChild(yaoqingDiv);
							yaoqingText = document.createElement("input");
							yaoqingText.id = 'yaoqingText';
							yaoqingText.style.opacity="0.5";
							yaoqingText.style.backgroundColor = "#272120";
							yaoqingText.style.color = "#ffffff";
							yaoqingText.style.width = '270px';
							yaoqingText.style.height = '200px';
							yaoqingText.style.maxWidth = '100px';
							yaoqingText.style.maxHeight = '20px';
							yaoqingDiv.appendChild(yaoqingText);
					 }
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(yaoqingDiv,"yaoqingDiv",695);
					/*======================================================*/
				},
				myclick : function()
				{

					if(((602 < lastTouchMoveX) && (lastTouchMoveX < (602 + 82))) && ((398 < lastTouchMoveY) && (lastTouchMoveY < (398 + 25))))
			        {
						if(allianceData.authoLevel >= 5)
					 	{
						    if(gbox._isIndwellDiv("yaoqingDiv","input"))
							 {
								  document.body.removeChild(yaoqingDiv);  
								  yaoqingDiv = null;
							 }
							displayDestroy();
							isDrawUI[index] = false;
							isChiefDemise = false;	
						    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
							Alliance.inviteMemberByName(yaoqingText.value,doInviteMemberByName);
						    waiwuguan(getClickObjectIndex());
						    unionInfo(getClickObjectIndex());
							changeMap('cityMenuLayer');
							console.log("邀请！");
					 	}
			        }else
					if(((755 < lastTouchMoveX) && (lastTouchMoveX < (755 + 82))) && ((398 < lastTouchMoveY) && (lastTouchMoveY < (398 + 25))))
			        {
						displayDestroy();
						isDrawUI[index] = false;
						isChiefDemise = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("取消！");
					    waiwuguan(getClickObjectIndex());
					    unionInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }else{
			        	unionInfo(getClickObjectIndex());
			        	yaoqing(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isYaoqing)
					 {
						 var bgW = gbox.getImage('wwg_zjm_23').width;
						 var bgH = gbox.getImage('wwg_zjm_23').height;
						 gbox.drawImage('wwg_zjm_23',backdropX,backdropY);
						 
						    var fontW = gbox.getTextWidth("邀请",14);
                            var btnX = backdropX + 20;
						    var btnY = backdropY + bgH/2 + yaoqingOffsetY;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2 - 2;
							var backY = btnY + (25 - 14)/2;	
						 	if(allianceData.authoLevel >= 5)
						 	{
								if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
						        {
						               gbox.drawImage('ty_an_09',btnX,btnY);
						               			               
						        }
						 	}else
						 		gbox.drawImage('ty_an_11',btnX,btnY);
	
						 	gbox.drawText("邀请", backX, backY,10);
						 	
                            var btnX1 = backdropX + bgW - 102;
						    var btnY1 = backdropY + bgH/2 + yaoqingOffsetY;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2 - 2;
							var backY = btnY1 + (25 - 14)/2;
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);               
					        }
							gbox.drawText("取消", backX, backY,10);
					 }						
				}
			});
};

//退出联盟
var iQsuitAlliancePop = false;
var quitAlliancePop = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	iQsuitAlliancePop = true;
	var quitAllianceOffsetY = 25;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'hitPop',
				group : 'levelMenu_4',
				tileset : 'ty_an_55',
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
				    var fontW = gbox.getTextWidth("确认",14);
					var bgW = gbox.getImage('ty_an_55').width;
					var bgH = gbox.getImage('ty_an_55').height;
                    var btnX = backdropX + 20;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
				    
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + quitAllianceOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + quitAllianceOffsetY  + 25))))
			        {
						isDrawUI[index] = false;
						iQsuitAlliancePop = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    
					    waiwuguan(getClickObjectIndex());
					    unionInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
						Alliance.quitAlliance(doQuitAlliance);
						console.log("退出联盟确认！");
			        }else
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 + quitAllianceOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + quitAllianceOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						iQsuitAlliancePop = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("返回！");
					    waiwuguan(getClickObjectIndex());
					    unionInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }else{
			        	unionInfo(getClickObjectIndex());
			        	quitAlliancePop(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && iQsuitAlliancePop)
					 {
						 var bgW = gbox.getImage('ty_an_55').width;
						 var bgH = gbox.getImage('ty_an_55').height;
						 gbox.drawImage('ty_an_55',backdropX,backdropY);
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - 45)/2;
//						 gbox.drawDanceString("退出联盟", titleX, backdropY,14,'#000000','#FFC861');
						 gbox.drawText("退出联盟", titleX, backdropY,14);
						    var fontW = gbox.getTextWidth("确认",14);
                            var btnX = backdropX + 20;
						    var btnY = backdropY + bgH/2 + quitAllianceOffsetY ;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);			               
					        }	
							gbox.drawText("确认", backX, backY,10);
							
                            var btnX1 = backdropX + bgW - 102;
						    var btnY1 = backdropY + bgH/2 + quitAllianceOffsetY;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2;
							var backY = btnY1 + (25 - 14)/2;
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);			               
					        }	
							
							gbox.drawText("取消", backX, backY,10);
//							gbox._drawTxtRect("确认退出联盟吗？",620,328,180,50,8,'#ffffff','#000000');
							gbox.drawLineBreakText("确认退出联盟吗？",656,356,6,280);
					 }						
				}
			});
};

//联盟大事
var isUnionDashi = false;
var dashiForm = [[508,280,108],[620,280,406]];
var unionDashi = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionDashi = true;	
	var bW = gbox.getImage('wwg_zjm_25').width;
	var bH = gbox.getImage('wwg_zjm_25').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 15;
	var exitY = backdropY - 5;	
		gbox.addObject(
			{ 
				id : 'unionDashi',
				group : 'levelMenu_3',
				tileset : 'wwg_zjm_25',
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
					 //翻页数字及按钮控制
		               if(((676 < lastTouchMoveX) && (lastTouchMoveX < (676 + 16))) && ((488 < lastTouchMoveY) && (lastTouchMoveY < (488 + 14))))//控制向右翻页
		               {
		               	   if(dashiPage < dashiPages){
			            	   if(typeof(dashiCharacter) != "undefined" && dashiCharacter.length > 0){
			            		   Alliance.getAllianceEvent(++dashiPage,doGetAllianceEvent);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
		               
		               if(((595 < lastTouchMoveX) && (lastTouchMoveX < (595 + 16))) && ((488 < lastTouchMoveY) && (lastTouchMoveY < (488 + 14))))//控制向左翻页
		               {
		               	   if(dashiPage >= 2){
			            	   if(typeof(dashiCharacter) != "undefined" && dashiCharacter.length > 0){
			            		   Alliance.getAllianceEvent(--dashiPage,doGetAllianceEvent);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }

					
						if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23))
						{
							displayDestroy();
							exit(index);
							waiwuguan(getClickObjectIndex());
							unionInfo(getClickObjectIndex());
		                    changeMap('cityMenuLayer');
						}else{
							waiwuguan(getClickObjectIndex());
							unionInfo(getClickObjectIndex());
							unionDashi(getClickObjectIndex());
							changeMap('cityMenuLayer');	
						}
					 	

				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionDashi)
					 {
						//联盟成员绘制
					 	var bgW = gbox.getImage('wwg_zjm_25').width;
						 var bgH = gbox.getImage('wwg_zjm_25').height;
						 gbox.drawImage('wwg_zjm_25',backdropX,backdropY);
					 	
					 	for(var i=0; i<dashiCharacter.length; i++){
					 		for(var j=0; j<dashiForm.length; j++){
					 			var fontW = gbox.getTextWidth(dashiInfo[i][j],14);
					 			var formX = dashiForm[j][0];
					 			var formY = dashiForm[j][1];
					 			var formW = dashiForm[j][2];
					 			var formH = 25;
					 			
							 	var dx = formX + (formW - fontW)/2;
								var dy = formY + (formH - 14)/2 + i*formH;
//								gbox.drawDanceString("" + dashiInfo[i][j], formX, dy,14,'#000000','#FFFFFF');
								gbox.drawText("" + dashiInfo[i][j], formX, dy,2);
					 		}
					 	}
					 	
						//绘制翻页数字及按钮
						gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + dashiPage,
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 709,
								y : 489
																
							});
	                    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "/",
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 719,
								y : 489
																
							});
					    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + dashiPages,
								color : '#ffffff',
								font : 'bold 12px sans-serif',
								x : 729,
								y : 489
																
							});
						if(dashiPage < dashiPages)
							gbox.drawImage("ty_an_24",676,488);
						  
						if(dashiPage > 1)
							gbox.drawImage("ty_an_25",595,488);
					 
						
						   if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
						   {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_17',
									tile : 0,
									dx : exitX - 2,
									dy : exitY + 7,
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
									dy : exitY + 7,
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

var isPizhun = false;
var pizhunIndex = 0;
var pizhunForm = [[508,286,93],[603,286,48],[652,286,46],[698,286,68],[765,286,66],[830,286,102]];
var pizhun = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isPizhun = true;	
	var infoOffsetY = 80;
	var bW = gbox.getImage('wwg_zjm_26').width;
	var bH = gbox.getImage('wwg_zjm_26').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 15;
	var exitY = backdropY - 5;	
		gbox.addObject(
			{ 
				id : 'pizhun',
				group : 'levelMenu_3',
				tileset : 'wwg_zjm_26',
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
					 //翻页数字及按钮控制
		               if(((676 < lastTouchMoveX) && (lastTouchMoveX < (676 + 16))) && ((491 < lastTouchMoveY) && (lastTouchMoveY < (491 + 14))))//控制向右翻页
		               {
		               	   if(pizhunPage < pizhunPages){
			            	   if(typeof(pizhunCharacter) != "undefined" && pizhunCharacter.length > 0){
			            		   Alliance.getAllAllianceApplication(++pizhunPage,doGetAllAllianceApplication);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
		               
		               if(((595 < lastTouchMoveX) && (lastTouchMoveX < (595 + 16))) && ((491 < lastTouchMoveY) && (lastTouchMoveY < (491 + 14))))//控制向左翻页
		               {
		               	   if(pizhunPage >= 2){
			            	   if(typeof(pizhunCharacter) != "undefined" && pizhunCharacter.length > 0){
			            		   Alliance.getAllAllianceApplication(--pizhunPage,doGetAllAllianceApplication);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
					
		               
		               
					 	for(var i=0; i<pizhunCharacter.length; i++){
				 			var formX = pizhunForm[5][0];
				 			var formY = pizhunForm[5][1] - 5;
				 			var formW = pizhunForm[5][2];
				 			var formH = 25;
				 			
			 				var btnW = gbox.getImage('ty_an_06').width;
			 				var btnH = gbox.getImage('ty_an_06').height;
			 				
			 				var btnX = formX + (formW - btnW)/2;
			 				var btnY = formY + (formH - btnH)/2 + (i * 26);
			 				if(pizhunLight)
			 				{
				 				var btnX = formX + (formW/2 - btnW)/2;
				 				var btnY = formY + (formH - btnH)/2 + (i * 26);
				 				gbox.drawImage('ty_an_08',btnX,btnY);
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
						        {
									Alliance.joinAllianceMember(pizhunCharacter[i].memberId,doJoinAllianceMember);
									console.log("批准");
						        }

					 			var btnX = (formX + formW/2) + (formW/2 - btnW)/2;
					 			var btnY = formY + (formH - btnH)/2 + (i * 26);
					 			gbox.drawImage('ty_an_08',btnX,btnY);
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
							    {
									Alliance.refusedJoin(pizhunCharacter[i].memberId,doRefusedJoin)
							        console.log("拒绝");
							    }
			 				}
					 	}
					
						if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23))
						{
							displayDestroy();
							exit(index);
							waiwuguan(getClickObjectIndex());
							unionInfo(getClickObjectIndex());
							changeMap('cityMenuLayer');
						}else{
							waiwuguan(getClickObjectIndex());
							unionInfo(getClickObjectIndex());
							pizhun(getClickObjectIndex());
							changeMap('cityMenuLayer');	
						}
					 	

				},
				blit : function()
				{
					 if(isDrawUI[index] && isPizhun)
					 {
						//联盟成员绘制
					 	var bgW = gbox.getImage('wwg_zjm_26').width;
						 var bgH = gbox.getImage('wwg_zjm_26').height;
						 gbox.drawImage('wwg_zjm_26',backdropX,backdropY);
					 	
					 	for(var i=0; i<pizhunCharacter.length; i++){
					 		for(var j=0; j<pizhunForm.length; j++){
					 			var fontW = gbox.getTextWidth(pizhunInfo[i][j],14);
					 			var formX = pizhunForm[j][0];
					 			var formY = pizhunForm[j][1] - 5;
					 			var formW = pizhunForm[j][2];
					 			var formH = 25;
					 			
					 			if(j == pizhunForm.length - 1){
					 				var btnW = gbox.getImage('ty_an_06').width;
					 				var btnH = gbox.getImage('ty_an_06').height;
					 				var btnX = formX + (formW - btnW)/2;
					 				var btnY = formY + (formH - btnH)/2 + (i * 26);

					 				var btnX = formX + (formW/2 - btnW)/2;
					 				var btnY = formY + (formH - btnH)/2 + (i * 26);
					 				if(pizhunLight)
					 				{
						 				gbox.drawImage('ty_an_08',btnX,btnY);
										if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
								        {
								               gbox.drawImage('ty_an_06',btnX,btnY);
								        }
					 				}else
					 					gbox.drawImage('ty_an_05',btnX,btnY);
					 				
						               var strW = gbox.getTextWidth("批准",14);
						               var strX = btnX + (btnW - strW)/2 - 3;
						               var strY = btnY + (btnH - 14)/2;
//						               gbox.drawDanceString("批准", strX, strY,14,'#000000','#FFFFFF');	
						               gbox.drawText("批准", strX, strY,10);
						               
						 				var btnX = (formX + formW/2) + (formW/2 - btnW)/2;
						 				var btnY = formY + (formH - btnH)/2 + (i * 26);
						 				if(pizhunLight)
						 				{
							 				gbox.drawImage('ty_an_08',btnX,btnY);
											if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
									        {
									               gbox.drawImage('ty_an_06',btnX,btnY);
									        }
						 				}else
						 					gbox.drawImage('ty_an_05',btnX,btnY);
						 				
							               var strW = gbox.getTextWidth("拒绝",14);
							               var strX = btnX + (btnW - strW)/2 - 3;
							               var strY = btnY + (btnH - 14)/2;
//							               gbox.drawDanceString("拒绝", strX, strY,14,'#000000','#FFFFFF');	
							               gbox.drawText("拒绝", strX, strY,10);
					 			}else{
								 	var dx = formX + (formW - fontW)/2;
									var dy = formY + (formH - 14)/2 + i*formH;
//									gbox.drawDanceString("" + pizhunInfo[i][j], dx, dy,14,'#000000','#FFFFFF');
									gbox.drawText(pizhunInfo[i][j], dx, dy,2);
					 			}

					 		}
					 	}
					 	
						//绘制翻页数字及按钮
						gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + pizhunPage,
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 709,
								y : 491
																
							});
	                    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "/",
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 719,
								y : 491
																
							});
					    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + pizhunPages,
								color : '#ffffff',
								font : 'bold 12px sans-serif',
								x : 729,
								y : 491
																
							});
					 
						if(pizhunPage < pizhunPages)
							gbox.drawImage("ty_an_24",676,490);
						  
						if(pizhunPage > 1)
							gbox.drawImage("ty_an_25",595,490);
						
						
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

var pizhunCharacter = new Array();
var pizhunPage = 0;
var pizhunPages = 0;
var userCharacterAuthoLevel = 0;
var pizhunInfo = new Array();
var pizhunLight = false;
//批准加入
function doGetAllAllianceApplication(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	pizhunPage = data.page;
	pizhunPages = data.pages;
	pizhunLight = false;
	pizhunLight = data.isLight;
		
	if(pizhunPages > 0 && pizhunPage == 0)
		pizhunPage = 1;
	else 
		pizhunPage = pizhunPage;
	pizhunCharacter = new Array();
	pizhunInfo = new Array();
    if(data.member != null){
	    for(var i=0; i<data.member.length; i++){
	    	var temp = data.member[i];
	    	pizhunCharacter[i] = 
	    	{
	    			memberId:temp.CharacterId,
	    			level : temp.level,
	    			maincitylevel : temp.maincitylevel,
	    			name : temp.name,
	    			reputation : temp.reputation,
	    			country : temp.country,
	    	};
	    	pizhunInfo[i] = new Array();
	    	pizhunInfo[i][0] = pizhunCharacter[i].name;
	    	pizhunInfo[i][1] = pizhunCharacter[i].level;
	    	pizhunInfo[i][2] = pizhunCharacter[i].country;
	    	pizhunInfo[i][3] = pizhunCharacter[i].maincitylevel;
	    	pizhunInfo[i][4] = pizhunCharacter[i].reputation;
	    }	
    }
    else{
    	pizhunPage = 0;
    	pizhunPages = 0;
    }
    	
    waiwuguan(getClickObjectIndex());
    unionInfo(getClickObjectIndex());
	pizhun(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

//联盟退出
function doQuitAlliance(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	displayDestroy();
	exit(getClickObjectIndex());
	isRegisterUnion = false;
	Alliance.initCharacterAlliance(dataGetAlliance);
}

//联盟升级
var upgradeInfo = undefined;
var tmpTime = undefined;
var upValue = undefined;
function doAllianceUpgradeInfo(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	upValue = undefined;
	upValue = data.value;
//	upgradeInfo = undefined;
	upgradeInfo = {
			isLight:data.isLight,
			needTime:data.needTime,
			needWealth:data.needWealth,
			nextLevel:data.nextLevel,
			nextMemberLimit:data.nextMemberLimit,
			nowLevel:data.nowLevel,
			nowMemberLimit:data.nowMemberLimit,
	};
	
	if(unionUpLevelTimeInterval != null){
		clearInterval(unionUpLevelTimeInterval);
		unionUpLevelCnt = 0;
		unionUpLevelTimeInterval = null;
		unionUpLevelTime =  "等待刷新！";
	}
	
//	tmpTime = undefined;
	tmpTime = data.completeTime;
	
	if(typeof(tmpTime) != 'undefined')
	{
		console.log("【时间】 =================== " + tmpTime);
		if(unionUpLevelTimeInterval == null)
			unionUpLevelTimeInterval = setInterval("unionUpLevelTimer(" + Number(tmpTime + 1000) + ")",1000); 
	}
	
    waiwuguan(getClickObjectIndex());
    unionInfo(getClickObjectIndex());
    unionUpLevel(getClickObjectIndex());
	changeMap('cityMenuLayer');
}
//确认升级
function doAllianceUpgrade(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.allianceUpgradeInfo(doAllianceUpgradeInfo);
}

var unionUpLevelCnt = 0;
var unionUpLevelTime = "等待刷新！";
var unionUpLevelTimeInterval;
function unionUpLevelTimer(initData){
	unionUpLevelCnt = unionUpLevelCnt + 1;
	unionUpLevelTime = changeTimeformat((initData/1000 - unionUpLevelCnt)*1000);
};

//联盟解散
var removeInfo = undefined;
function doRemoveAlliance(data)
{
	if(typeof(data.error) != "undefined")
	{
		displayDestroy();
		exit(getClickObjectIndex());
		if(unionBreakupTimeInterval != null){
			clearInterval(unionBreakupTimeInterval);
			unionBreakupCnt = 0;
			unionBreakupTimeInterval = null;
			unionBreakupTime =  "等待刷新！";
		}
		Alliance.initCharacterAlliance(dataGetAlliance);
//		alert("系统提示：" + data.error);
		return;
	}
	
	removeInfo = undefined;
	removeInfo = {
			isLight:data.isLight,
			needTime:data.needTime,
			needWealth:data.needWealth,
			nextLevel:data.nextLevel,
			nextMemberLimit:data.nextMemberLimit,
			nowLevel:data.nowLevel,
			nowMemberLimit:data.nowMemberLimit,
	};
	
	if(unionBreakupTimeInterval != null){
		clearInterval(unionBreakupTimeInterval);
		unionBreakupCnt = 0;
		unionBreakupTimeInterval = null;
		unionBreakupTime =  "等待刷新！";
	}
	
	tmpTime = undefined;
	tmpTime = data.completeTime;
	if(typeof(tmpTime) != 'undefined')
	{
		console.log("【时间】 =================== " + tmpTime);
		if(unionBreakupTimeInterval == null)
			unionBreakupTimeInterval = setInterval("unionBreakupTimer(" + Number(tmpTime + 1000) + ")",1000);
	}
	
	waiwuguan(getClickObjectIndex());
	unionInfo(getClickObjectIndex());
	unionBreakup(getClickObjectIndex());
	changeMap('cityMenuLayer');

}
//确认解散
var removeInfo = undefined;
function doDisbandAlliance(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.removeAlliance(doRemoveAlliance);
}

//取消解散
var removeInfo = undefined;
function doRemovedisbandAlliance(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	displayDestroy();
	exit(getClickObjectIndex());
	if(unionBreakupTimeInterval != null){
		clearInterval(unionBreakupTimeInterval);
		unionBreakupCnt = 0;
		unionBreakupTimeInterval = null;
		unionBreakupTime =  "等待刷新！";
	}
	Alliance.initCharacterAlliance(dataGetAlliance);
}

var unionBreakupCnt = 0;
var unionBreakupTime = "等待刷新！";
var unionBreakupTimeInterval;
function unionBreakupTimer(initData){
	unionBreakupCnt = unionBreakupCnt + 1;
	unionBreakupTime = changeTimeformat((initData/1000 - unionBreakupCnt)*1000);
};

//盟主禅让
function doChiefDemise(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.initCharacterAlliance(dataGetAlliance);
}

//修改信息（保存）
function doChangeAllianceInfo(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.initCharacterAlliance(dataGetAlliance);
}

var dashiCharacter = new Array();
var dashiPage = 0;
var dashiPages = 0;
var userCharacterAuthoLevel = 0;
var dashiInfo = new Array();
//联盟大事
function doGetAllianceEvent(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	dashiPage = data.page;
	dashiPages = data.pages;
	userCharacterAuthoLevel = data.userCharacterAuthoLevel;
		
	if(dashiPages > 0 && dashiPage == 0)
		dashiPage = 1;
	else 
		dashiPage = dashiPage;
	dashiCharacter = new Array();
    if(data.allianceEvent != null){
	    for(var i=0; i<data.allianceEvent.length; i++){
	    	var temp = data.allianceEvent[i];
	    	dashiCharacter[i] = 
	    	{
	    			completetime:temp.completetime,
	    			event : temp.event,
	    	};
	    	dashiInfo[i] = new Array();
	    	dashiInfo[i][0] = changeTimeformat(dashiCharacter[i].completetime);
	    	dashiInfo[i][1] = dashiCharacter[i].event;
	    }	
    }
    else{
    	dashiPage = 0;
    	dashiPages = 0;
    }
	waiwuguan(getClickObjectIndex());
	unionInfo(getClickObjectIndex());
	unionDashi(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}

//邀请成员
function doInviteMemberByName(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
}

//批准成员加入
function doJoinAllianceMember(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.getAllAllianceApplication(pizhunPage,doGetAllAllianceApplication);
}

//拒绝成员加入
function doRefusedJoin(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.getAllAllianceApplication(pizhunPage,doGetAllAllianceApplication);
}

//修改信息
var updataIntroduction = undefined;
var updataBulletin = undefined;
var updataInfoLight = false;
function doGetAllianceInfo(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	updataIntroduction = undefined;
	updataIntroduction = data.introduction;
	updataBulletin = undefined;
	updataBulletin = data.bulletin;
	updataInfoLight = false;
	updataInfoLight = data.isLight;
	
	waiwuguan(getClickObjectIndex());
	unionInfo(getClickObjectIndex());
	editInfo(getClickObjectIndex());
	changeMap('cityMenuLayer');
}