/*
 * 联盟兵营（zjm 2013_7_17）
 */
var casernTiquDiv;
var casernTiquText;
var casernJuanxianDiv;
var casernJuanxianText;
var isUnionCasern = false;
var pageFlagIndex = 0;
var soldierIndex = 0;
var barIndex = 0;
var pageFlagName = ["刀兵","枪兵","弓兵","骑兵","车兵"];
var soldierNo = ["s0001","s0002","s0003","s0004","s0005"];
var guanzhi = ["盟主","副盟主","内政官","科技官","战争官","精英","普通成员"];
var guanzhiNo = ["of0001","of0002","of0003","of0004","of0005","of0006","of0007"];
var unionCasern = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	var pageFlagX = 540;
	var pageFlagY = 325;
	isDrawUI[index] = true;
	isUnionCasern = true;	
	var bW = gbox.getImage('wwg_zjm_07').width;
	var bH = gbox.getImage('wwg_zjm_07').height;
	var backdropX = 539;
	var backdropY = 281;
		gbox.addObject(
			{ 
				id : 'unionCasern',
				group : 'levelMenu_2',
				tileset : 'wwg_zjm_07',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					if(casernTiquDiv == null && !gbox._isIndwellDiv("casernTiquDiv","input"))
					{
						var pnX = 982;
						var pnY = 349;
						casernTiquDiv = addDivWindowBg(pnX,pnY);
						casernTiquDiv.id = 'casernTiquDiv';
						document.body.appendChild(casernTiquDiv);
						casernTiquText = document.createElement("input");
						casernTiquText.id = 'casernTiquText';
						casernTiquText.style.opacity="0.5";
						casernTiquText.style.backgroundColor = "#272120";
						casernTiquText.style.color = "#ffffff";
						casernTiquText.style.width = '270px';
						casernTiquText.style.height = '200px';
						casernTiquText.style.maxWidth = '81px';
						casernTiquText.style.maxHeight = '20px';
						casernTiquText.style.background = "transparent";
						casernTiquText.style.border = "0px solid";
						casernTiquText.style.outline = "none";
						casernTiquText.value = 1;
						//unionFlagText.style.
						casernTiquDiv.appendChild(casernTiquText);
	
					}
					
					if(casernJuanxianDiv == null && !gbox._isIndwellDiv("casernJuanxianDiv","input"))
					{
						var pnX = 982;
						var pnY = 499;
						casernJuanxianDiv = addDivWindowBg(pnX,pnY);
						casernJuanxianDiv.id = 'casernJuanxianDiv';
						document.body.appendChild(casernJuanxianDiv);
						casernJuanxianText = document.createElement("input");
						casernJuanxianText.id = 'casernJuanxianText';
						casernJuanxianText.style.opacity="0.5";
						casernJuanxianText.style.backgroundColor = "#272120";
						casernJuanxianText.style.color = "#ffffff";
						casernJuanxianText.style.width = '270px';
						casernJuanxianText.style.height = '200px';
						casernJuanxianText.style.maxWidth = '81px';
						casernJuanxianText.style.maxHeight = '20px';
						casernJuanxianText.style.background = "transparent";
						casernJuanxianText.style.border = "0px solid";
						casernJuanxianText.style.outline = "none";
						casernJuanxianText.value = 1;
						//unionFlagText.style.
						casernJuanxianDiv.appendChild(casernJuanxianText);
	
					}
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(casernTiquDiv,"casernTiquDiv",982);
					adaptiveDiv(casernJuanxianDiv,"casernJuanxianDiv",982);
					/*======================================================*/
					
					casernTiquText.value = casernTiquText.value.replace(/\D/g,'');
					if(casernTiquText.value >= receiveLimit - receiveNum)
						casernTiquText.value = receiveLimit - receiveNum;
					casernJuanxianText.value = casernJuanxianText.value.replace(/\D/g,'');
					
					if(typeof(userSoldier) != 'undefined' && typeof(userSoldier[soldierIndex]) != 'undefined')
					if(casernJuanxianText.value >= userSoldier[soldierIndex].userSoldierAmount)
					    casernJuanxianText.value = userSoldier[soldierIndex].userSoldierAmount;	
				},
				myclick : function()
				{

		            //提取左箭头
					if(((960 < lastTouchMoveX) && (lastTouchMoveX < (960 + 16))) && ((351 < lastTouchMoveY) && (lastTouchMoveY < (351 + 16))))
			        {
						casernTiquText.value = 1;
			        }
					
		            //提取左箭头
					if(((1070 < lastTouchMoveX) && (lastTouchMoveX < (1070 + 16))) && ((351 < lastTouchMoveY) && (lastTouchMoveY < (351 + 16))))
			        {
						casernTiquText.value = receiveLimit - receiveNum;	
			        }
					
                    var btnX = 1047;
				    var btnY = 405;
				    //提取士兵
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 50))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + 26))))
			        {
						
						var tiquWeal = Math.ceil(casernTiquText.value * allianceBarrack[barIndex].extractNeedWealth);
						if(isNaN(tiquWeal))
							tiquWeal = 0;
						Alliance.extractSoldiers(allianceBarrack[barIndex].soldierNo,casernTiquText.value,tiquWeal,doExtractSoldiers);  
						
			        }
					
		            //捐献左箭头
					if(((960 < lastTouchMoveX) && (lastTouchMoveX < (960 + 16))) && ((501 < lastTouchMoveY) && (lastTouchMoveY < (501 + 16))))
			        {
						casernJuanxianText.value = 1;
			        }
					
		            //捐献左箭头
					if(((1070 < lastTouchMoveX) && (lastTouchMoveX < (1070 + 16))) && ((501 < lastTouchMoveY) && (lastTouchMoveY < (501 + 16))))
			        {
						casernJuanxianText.value = userSoldier[soldierIndex].userSoldierAmount;	
			        }
		            
                    var btnX = 1045;
				    var btnY = 573;
				     //捐献士兵
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 50))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + 26))))
			        {
						var juanxianWeal = Math.ceil(casernJuanxianText.value * allianceBarrack[barIndex].donatedNeedWealth);
						if(isNaN(juanxianWeal))
							juanxianWeal = 0;
						Alliance.donatedSoidier(userSoldier[soldierIndex].userSoldierNo,casernJuanxianText.value,juanxianWeal,doDonatedSoidier);            
			        }
					
                    var btnX = 766;
				    var btnY = 290;	
					if(isByLight)
					{
						if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + 25))))
				        {
							unionCasern(getClickObjectIndex());
				        	tiquShezhi(getClickObjectIndex());
							changeMap('cityMenuLayer');             
				        }
					}
					
					for(var i=0; i<5; i++)
					{
						var strW = gbox.getTextWidth(pageFlagName[i],14);
						var strX = pageFlagX + (53-strW)/2 + (i*53);
						var strY = pageFlagY;
						if(((strX < lastTouchMoveX) && (lastTouchMoveX < (strX + 53))) && ((strY < lastTouchMoveY) && (lastTouchMoveY < (strY + 22))))
				        {
							barIndex = 0;
							pageFlagIndex = i;
							Alliance.getAllianceBarrackBySoldierNo(soldierNo[pageFlagIndex],byPage,doGetAllianceBarrackBySoldierNo);
							console.log("" + pageFlagName[i]);
				        }
					}
					for(var i=0; i<allianceBarrack.length-1; i++)
					{
						var barW = gbox.getImage('wwg_zjm_43').width;
						var barH = gbox.getImage('wwg_zjm_43').height;
						var barX = 542;
						var barY = 352 + (i*barH);
						
						if(((barX < lastTouchMoveX) && (lastTouchMoveX < (barX + barW))) && ((barY < lastTouchMoveY) && (lastTouchMoveY < (barY + barH))))
				        {
							barIndex = i;
				        }
						
					    var btnW = gbox.getImage('ty_an_08').width;
					    var btnH = gbox.getImage('ty_an_08').height;
                        var btnX = 812;
					    var btnY = 352 + (i * 25);
						if(isByLight)
						{
							if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
					        {
					        	unionCasern(getClickObjectIndex());
					        	qiansanSolier(getClickObjectIndex());
								changeMap('cityMenuLayer');
								console.log("遣散士兵");
					        }
						}
						
					}
					
					 //翻页数字及按钮控制
		               if(((748 < lastTouchMoveX) && (lastTouchMoveX < (748 + 16))) && ((583 < lastTouchMoveY) && (lastTouchMoveY < (583 + 14))))//控制向右翻页
		               {
		               	   if(byPage < byPages){
			            	   if(typeof(allianceBarrack) != "undefined" && allianceBarrack.length > 0){
			            		   Alliance.getAllianceBarrackBySoldierNo(soldierNo[pageFlagIndex],++byPage,doGetAllianceBarrackBySoldierNo);
			            	   }else
			            		   alert("没有兵种数据！");
		               	   }
		               }
		               
		               if(((665 < lastTouchMoveX) && (lastTouchMoveX < (665 + 16))) && ((583 < lastTouchMoveY) && (lastTouchMoveY < (583 + 14))))//控制向左翻页
		               {
		               	   if(byPage >= 2){
			            	   if(typeof(allianceBarrack) != "undefined" && allianceBarrack.length > 0){
			            		   Alliance.getAllianceBarrackBySoldierNo(soldierNo[pageFlagIndex],--byPage,doGetAllianceBarrackBySoldierNo);
			            	   }else
			            		   alert("没有兵种数据！");
		               	   }
		               }
		               
						if(((1068 < lastTouchMoveX) && (lastTouchMoveX < (1068 + 22))) && ((458 < lastTouchMoveY) && (lastTouchMoveY < (458 + 22))))
				        {
							if(typeof(userSoldier) != 'undefined' && userSoldier.length > 0)
							{
								if(++soldierIndex > userSoldier.length-1)
									soldierIndex = 0;
								
							}

				        }
		               
		            waiwuguan(getClickObjectIndex());
					unionCasern(getClickObjectIndex());
					changeMap('cityMenuLayer');	
				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionCasern)
					 {
						//联盟科技绘制
					 	gbox.drawImage('wwg_zjm_07',539,281);
					    var fontW = gbox.getTextWidth("提取设置",14);
					    var btnW = gbox.getImage('ty_an_10').width;
					    var btnH = 25;
                        var btnX = 766;
					    var btnY = 290;
					    gbox.drawImage('ty_an_10',btnX,btnY);
					    var backX = btnX + (btnW - fontW)/2;
						var backY = btnY + (btnH - 14)/2;	
						if(isByLight)
						{
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);               
					        }
						}else
							gbox.drawImage('ty_an_11',btnX,btnY);

//						gbox.drawDanceString("提取设置", backX, backY,14,'#000000','#FFFFFF');	
						gbox.drawText("提取设置", backX, backY,10);
					    var fontW = gbox.getTextWidth("提取",14);
					    var btnW = gbox.getImage('ty_an_08').width;
					    var btnH = 25;
                        var btnX = 1047;
					    var btnY = 405;
					    gbox.drawImage('ty_an_08',btnX,btnY);
					    var backX = btnX + (btnW - fontW)/2;
						var backY = btnY + (btnH - 14)/2;	
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
				        {
				               gbox.drawImage('ty_an_06',btnX,btnY);               
				        }
//						gbox.drawDanceString("提取", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("提取", backX, backY,10);
                        var btnX = 1045;
					    var btnY = 573;
					    gbox.drawImage('ty_an_08',btnX,btnY);
					    var backX = btnX + (btnW - fontW)/2;
						var backY = btnY + (btnH - 14)/2;	
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
				        {
				               gbox.drawImage('ty_an_06',btnX,btnY);               
				        }
//						gbox.drawDanceString("捐献", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("捐献", backX, backY,10);
						for(var i=0; i<5; i++){
							var strW = gbox.getTextWidth(pageFlagName[i],14);
							var strX = pageFlagX + (53-strW)/2 + (i*53);
							var strY = pageFlagY + (22 - 14)/2 + 2;
//							gbox.drawDanceString(pageFlagName[i], strX, strY,12,'#000000','#FFFFFF');
							gbox.drawText(pageFlagName[i], strX, strY,2);
							if(i == pageFlagIndex)
							{
								var pageFlagLightX = pageFlagX + (i*53);
								var pageFlagLightY = pageFlagY - 5;
								gbox.drawImage('ty_an_120',pageFlagLightX,pageFlagLightY);
//								gbox.drawDanceString(pageFlagName[i], strX, strY - 3,14,'#000000','#FFFFFF');
								gbox.drawText(pageFlagName[i], strX, strY - 3,2);
							}
						}

//						gbox.drawDanceString(solierAmount + "/" + barrackLimit, 625, 295,14,'#000000','#FFFFFF');
						gbox.drawText(solierAmount + "/" + barrackLimit, 625, 295,2);
						for(var i=0; i<allianceBarrack.length-1; i++)
						{
							var barW = gbox.getImage('wwg_zjm_44').width;
							var barH = gbox.getImage('wwg_zjm_44').height;
							var barX = 542;
							var barY = 352 + (i*barH);
							
							if(((barX < touchMoveX) && (touchMoveX < (barX + barW))) && ((barY < touchMoveY) && (touchMoveY < (barY + barH))))
					        {
								gbox.drawImage('wwg_zjm_44',barX,barY);
					        }
							
							if(i == barIndex){
								gbox.drawImage('wwg_zjm_43',barX,barY);
							}
//							gbox.drawDanceString(allianceBarrack[i].soldierName, 566, 358 + (i * 25),14,'#000000','#FFFFFF');
							gbox.drawText(allianceBarrack[i].soldierName, 566, 358 + (i * 25),2);
//							gbox.drawDanceString(allianceBarrack[i].soldierAmount, 698, 358 + (i * 25),14,'#000000','#FFFFFF');
							gbox.drawText(allianceBarrack[i].soldierAmount, 698, 358 + (i * 25),2);
						    var fontW = gbox.getTextWidth("遣散",14);
                            var btnX = 812;
						    var btnY = 352 + (i * 25);
						    var btnW = gbox.getImage('ty_an_08').width;
						    var btnH = gbox.getImage('ty_an_08').height;
						    gbox.drawImage('ty_an_08',btnX,btnY);
						    var backX = btnX + (btnW - fontW)/2 - 2;
							var backY = btnY + (btnH - 14)/2;
							
							if(isByLight)
							{
								if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
						        {
						               gbox.drawImage('ty_an_06',btnX,btnY);               
						        }
							}else
								gbox.drawImage('ty_an_05',btnX,btnY);

//							gbox.drawDanceString("遣散", backX, backY,14,'#000000','#FFFFFF');
							gbox.drawText("遣散", backX, backY,10);
						}
						
//						gbox.drawDanceString(memberWealth, 949, 297,14,'#000000','#FFFFFF');
						gbox.drawText(memberWealth, 949, 297,2);
//						gbox.drawDanceString(receiveNum + "/" + receiveLimit, 949, 322,14,'#000000','#FFFFFF');
						gbox.drawText(receiveNum + "/" + receiveLimit, 949, 322,2);
						if(typeof(allianceBarrack[barIndex]) != 'undefined')
						{
							var tmpNum = Math.ceil(casernTiquText.value * allianceBarrack[barIndex].extractNeedWealth);
							if(isNaN(tmpNum))
								tmpNum = 0;
//							gbox.drawDanceString(tmpNum, 978, 383,14,'#000000','#FFFFFF');
							gbox.drawText(tmpNum, 978, 383,2);
							var tmpNum1 = Math.ceil(casernJuanxianText.value * allianceBarrack[barIndex].donatedNeedWealth);
							if(isNaN(tmpNum1))
								tmpNum1 = 0;
							gbox.drawText(tmpNum1, 978, 545,2);
						}
						if(typeof(userSoldier) != 'undefined' && userSoldier.length > 0)
						{
							var strW = gbox.getTextWidth(userSoldier[soldierIndex].soldierName,14);
							var strX = 950 + (118 - strW)/2;
							var strY = 460;
//							gbox.drawDanceString(userSoldier[soldierIndex].userSoldierName, strX, strY,14,'#000000','#FFFFFF');	
							gbox.drawText(userSoldier[soldierIndex].userSoldierName, strX, strY,2);
						}else{
							var strW = gbox.getTextWidth("暂无兵种",14);
							var strX = 950 + (118 - strW)/2;
							var strY = 460;
//							gbox.drawDanceString("暂无兵种", strX, strY,14,'#000000','#FFFFFF');
							gbox.drawText("暂无兵种", strX, strY,2);
						}
						var rect = new Rect(693,582,38,18);
						gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#000000","#000000",true);
						
						//绘制翻页数字及按钮
						gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + byPage,
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 698,
								y : 585
																
							});
	                    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "/",
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 709,
								y : 585
																
							});
					    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + byPages,
								color : '#ffffff',
								font : 'bold 12px sans-serif',
								x : 719,
								y : 585
																
							});
						if(byPage < byPages)
						  gbox.drawImage("ty_an_24",748,583);
						if(byPage > 1)
						  gbox.drawImage("ty_an_25",665,583);
			               //绘制选择品质左右选择按钮
			            gbox.drawImage('ty_an_25',960,351);
			            gbox.drawImage('ty_an_24',1070,351);
			            
			            gbox.drawImage('ty_an_25',960,501);
			            gbox.drawImage('ty_an_24',1070,501);
					 }						
				}
			});
};


//提取设置
var guanzhiIndex = 0;
var isTiquShezhi = false;
var tiquSetDiv;
var tiquSetText;
var tiquShezhi = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isTiquShezhi = true;
	var quitAllianceOffsetY = 25;
	var bW = gbox.getImage('wwg_zjm_28').width;
	var bH = gbox.getImage('wwg_zjm_28').height;
	var backdropX = (gbox.getScreenW() - bW)/2 - 150;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 15;
	var exitY = backdropY - 5;	
		gbox.addObject(
			{ 
				id : 'tiquShezhi',
				group : 'levelMenu_4',
				tileset : 'wwg_zjm_28',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
                    if(tiquSetDiv == null && !gbox._isIndwellDiv("tiquSetDiv","input"))
					 {
							var pnX = 698;
							var pnY = 354;
							tiquSetDiv = addDivWindowBg(pnX,pnY);
							tiquSetDiv.id = 'tiquSetDiv';
							document.body.appendChild(tiquSetDiv);
							tiquSetText = document.createElement("input");
							tiquSetText.id = 'tiquSetText';
							tiquSetText.style.opacity="0.5";
							tiquSetText.style.backgroundColor = "#272120";
							tiquSetText.style.color = "#ffffff";
							tiquSetText.style.width = '270px';
							tiquSetText.style.height = '200px';
							tiquSetText.style.maxWidth = '50px';
							tiquSetText.style.maxHeight = '20px';
							tiquSetText.value = 1;
							tiquSetDiv.appendChild(tiquSetText);
					 }
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(tiquSetDiv,"tiquSetDiv",698);
					/*======================================================*/
					
					tiquSetText.value = tiquSetText.value.replace(/\D/g,'');
					if(tiquSetText.value >= solierAmount)
						tiquSetText.value = solierAmount;
				},
				myclick : function()
				{
					
		            //提取设置左箭头
					if(((677 < lastTouchMoveX) && (lastTouchMoveX < (677 + 16))) && ((355 < lastTouchMoveY) && (lastTouchMoveY < (355 + 16))))
			        {
						tiquSetText.value = 0;
			        }
					
		            //提取设置左箭头
					if(((757 < lastTouchMoveX) && (lastTouchMoveX < (757 + 16))) && ((355 < lastTouchMoveY) && (lastTouchMoveY < (355 + 16))))
			        {
						tiquSetText.value = solierAmount;	
			        }
					
					if(((489 < lastTouchMoveX) && (lastTouchMoveX < (489 + 22))) && ((352 < lastTouchMoveY) && (lastTouchMoveY < (352 + 22))))
			        {
						if(++guanzhiIndex > guanzhi.length-1)
							guanzhiIndex = 0;
			        }
					
                    var btnX1 = 693;
				    var btnY1 = 397;
				    //提取设置（确定）
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + 25))))
			        {
						displayDestroy();
						isDrawUI[index] = false;
						isTiquShezhi = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
						waiwuguan(getClickObjectIndex());
						unionCasern(getClickObjectIndex());
						changeMap('cityMenuLayer');
						pageFlagIndex = 0;
						Alliance.retrievalSetting(guanzhiNo[guanzhiIndex], tiquSetText.value, doRetrievalSetting);             
			        }
					
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23))
					{
						displayDestroy();
						exit(index);
						waiwuguan(getClickObjectIndex());
						unionCasern(getClickObjectIndex());
						changeMap('cityMenuLayer');
					}
					else{
						unionCasern(getClickObjectIndex());
			        	tiquShezhi(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isTiquShezhi)
					 {
						 var bgW = gbox.getImage('wwg_zjm_28').width;
						 var bgH = gbox.getImage('wwg_zjm_28').height;
						 gbox.drawImage('wwg_zjm_28',backdropX,backdropY);
						 
						    var fontW = gbox.getTextWidth("确  认",14);
                            var btnX1 = 693;
						    var btnY1 = 397;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2 - 2;
							var backY = btnY1 + (25 - 14)/2;
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);               
					        }
//							gbox.drawDanceString("确  认", backX, backY,14,'#000000','#FFFFFF');	
							gbox.drawText("确  认", backX, backY,10);
							for(var i=0; i<guanzhi.length; i++)
							{
								var gzStrW = gbox.getTextWidth(guanzhi[i],14);
								var gzX = 372 + (116 - gzStrW)/2;
								var gzY = 354;
								if(i == guanzhiIndex)
									gbox.drawText(guanzhi[i], gzX, gzY,2);
//								     gbox.drawDanceString(guanzhi[i], gzX, gzY,14,'#000000','#FFFFFF');
							}
							
							   if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
							   {
							   	    gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_17',
										tile : 0,
										dx : exitX -2 ,
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
										dx : exitX -2,
										dy : exitY + 7,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
								    });	
							   }
							   
					            gbox.drawImage('ty_an_25',677,355);
					            gbox.drawImage('ty_an_24',757,355);
					 }						
				}
			});
};

//遣散士兵
var isQiansanSolier = false;
var qiansanSolierDiv;
var qiansanSolierText;
var qiansanSolier = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isQiansanSolier = true;
	var chiefDemiseOffsetY = 35;
	var bW = gbox.getImage('wwg_zjm_45').width;
	var bH = gbox.getImage('wwg_zjm_45').height;
	var backdropX = (gbox.getScreenW() - bW)/2 - 80;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'qiansanSolier',
				group : 'levelMenu_4',
				tileset : 'wwg_zjm_45',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
                    if(qiansanSolierDiv == null && !gbox._isIndwellDiv("qiansanSolierDiv","input"))
					 {
							var pnX = 630;
							var pnY = 364;
							qiansanSolierDiv = addDivWindowBg(pnX,pnY);
							qiansanSolierDiv.id = 'qiansanSolierDiv';
							document.body.appendChild(qiansanSolierDiv);
							qiansanSolierText = document.createElement("input");
							qiansanSolierText.id = 'qiansanSolierText';
							qiansanSolierText.style.opacity="0.5";
							qiansanSolierText.style.backgroundColor = "#272120";
							qiansanSolierText.style.color = "#ffffff";
							qiansanSolierText.style.width = '270px';
							qiansanSolierText.style.height = '200px';
							qiansanSolierText.style.maxWidth = '50px';
							qiansanSolierText.style.maxHeight = '20px';
							qiansanSolierText.value = 1;
							qiansanSolierDiv.appendChild(qiansanSolierText);
					 }
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(qiansanSolierDiv,"qiansanSolierDiv",630);
					/*======================================================*/
					qiansanSolierText.value = qiansanSolierText.value.replace(/\D/g,'');
					if(typeof(allianceBarrack[barIndex]) != 'undefined')
					if(qiansanSolierText.value >= allianceBarrack[barIndex].soldierAmount)
						qiansanSolierText.value = allianceBarrack[barIndex].soldierAmount;
				},
				myclick : function()
				{
					
		            //遣散左箭头
					if(((610 < lastTouchMoveX) && (lastTouchMoveX < (610 + 16))) && ((366 < lastTouchMoveY) && (lastTouchMoveY < (366 + 16))))
			        {
						qiansanSolierText.value = 1;
			        }
					
		            //遣散左箭头
					if(((686 < lastTouchMoveX) && (lastTouchMoveX < (686 + 16))) && ((366 < lastTouchMoveY) && (lastTouchMoveY < (366 + 16))))
			        {
						qiansanSolierText.value = allianceBarrack[barIndex].soldierAmount;
			        }
				    var fontW = gbox.getTextWidth("确认",14);
					var bgW = gbox.getImage('wwg_zjm_45').width;
					var bgH = gbox.getImage('wwg_zjm_45').height;
                    var btnX = backdropX + 20;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
				    
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + chiefDemiseOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + chiefDemiseOffsetY  + 25))))
			        {
						displayDestroy();
						isDrawUI[index] = false;
						isQiansanSolier = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    
					    //遣散财富值
					    var qiansanWealth = 0;
					    if(qiansanSolierText.value >= 100)
					    {
					    	qiansanWealth = Math.ceil(allianceBarrack[barIndex].disbandNeedWealth * qiansanSolierText.value);
					        if(isNaN(qiansanWealth)){
					        	qiansanWealth = 0;
					        }
					    }
					    //确认遣散
					    Alliance.disbandAllianceSolier(allianceBarrack[barIndex].soldierNo,qiansanSolierText.value,qiansanWealth,doDisbandAllianceSolier);
					    if(qiansanSolierText.value >= allianceBarrack[barIndex].soldierAmount)
					          barIndex = 0;
					    waiwuguan(getClickObjectIndex());
					    unionCasern(getClickObjectIndex());
						changeMap('cityMenuLayer');
						console.log("确认遣散！");
			        }else
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 + chiefDemiseOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + chiefDemiseOffsetY + 25))))
			        {
						displayDestroy();
						isDrawUI[index] = false;
						isQiansanSolier = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("返回！");
					    waiwuguan(getClickObjectIndex());
					    unionCasern(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }else{
			        	unionCasern(getClickObjectIndex());
			        	qiansanSolier(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isQiansanSolier)
					 {
						 var bgW = gbox.getImage('wwg_zjm_45').width;
						 var bgH = gbox.getImage('wwg_zjm_45').height;
						 gbox.drawImage('wwg_zjm_45',backdropX,backdropY);
						 
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
//							gbox._drawTxtRect("每遣散100名士兵还X财富值。遣散士兵低于100名，不能返还财富值。",535,300,180,50,8,'#ffffff','#000000');
							gbox.drawLineBreakText("每遣散100名士兵还X财富值。遣散士兵低于100名，不能返还财富值。",535,300,6,280);
						    var qiansanWealth = 0;
						    if(qiansanSolierText.value >= 100)
						    {
						    	qiansanWealth = Math.ceil(allianceBarrack[barIndex].disbandNeedWealth * qiansanSolierText.value);
						        if(isNaN(qiansanWealth)){
						        	qiansanWealth = 0;
						        }
						    }
							
//							gbox.drawDanceString(qiansanWealth, 626, 387,14,'#000000','#FFFFFF');
							gbox.drawText(qiansanWealth, 626, 387,2);
				            gbox.drawImage('ty_an_25',610,366);
				            gbox.drawImage('ty_an_24',686,366);
					 }						
				}
			});
};


//查看联盟兵营
var solierAmount = 0;
var barrackLimit = 0;
var memberWealth = 0;
var solierAmount = 0;
var receiveNum = 0;
var receiveLimit = 0;
var isByLight = false;
var allianceBarrack = new Array();
var userSoldier = new Array();
var byPage = undefined;
var byPages = undefined;
function doGetAllianceBarrack(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	solierAmount = 100;//data.solierAmount;
	barrackLimit = data.barrackLimit;
	memberWealth = data.memberWealth;
	solierAmount = data.solierAmount;
	isByLight = data.isLight;
	receiveNum = data.receiveNum;
	receiveLimit = data.receiveLimit;
	allianceBarrack = new Array();
	byPage = undefined;
	byPages = undefined;
	if(data.allianceBarrack != null && typeof(data.allianceBarrack) != 'undefined'){
		for(var i=0; i < data.allianceBarrack.length; i++)
		{
			var tmp = data.allianceBarrack[i];
			
			allianceBarrack[i] = {
					soldierNo:tmp.soldierNo,
					soldierName:tmp.soldierName,
					soldierAmount:tmp.soldierAmount,
					extractNeedWealth:tmp.extractNeedWealth,//提取
					donatedNeedWealth:tmp.donatedNeedWealth,//捐献
					disbandNeedWealth:tmp.disbandNeedWealth,//遣散
			};
			
			if(i == data.allianceBarrack.length-1)
			{
				byPage = tmp.page;
				byPages = tmp.pages;
				if(byPages > 0 && byPage == 0)
					byPage = 1;
				else 
					byPage = byPage;
			}
		}
	}else{
		byPage = 0;
		byPages = 0;
	}
	
	userSoldier = new Array();
	for(var i=0; i<data.userSoldier.length; i++)
	{
		var tmp = data.userSoldier[i];
		userSoldier[i] = {
				userSoldierNo:tmp.userSoldierNo,
				userSoldierName:tmp.userSoldierName,
				userSoldierAmount:tmp.userSoldierAmount,
		};
	}
	waiwuguan(getClickObjectIndex());
	unionCasern(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

//根据兵种编号前缀返回兵种
function doGetAllianceBarrackBySoldierNo(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
	solierAmount = data.solierAmount;
	memberWealth = data.memberWealth;
	solierAmount = data.solierAmount;
	receiveNum = data.receiveNum;
	receiveLimit = data.receiveLimit;
	
	allianceBarrack = new Array();
	byPage = undefined;
	byPages = undefined;
	if(data.allianceBarrack != null && typeof(data.allianceBarrack) != 'undefined'){
		for(var i=0; i < data.allianceBarrack.length; i++)
		{
			var tmp = data.allianceBarrack[i];
			
			allianceBarrack[i] = {
					soldierNo:tmp.soldierNo,
					soldierName:tmp.soldierName,
					soldierAmount:tmp.soldierAmount,
					extractNeedWealth:tmp.extractNeedWealth,//提取
					donatedNeedWealth:tmp.donatedNeedWealth,//捐献
					disbandNeedWealth:tmp.disbandNeedWealth,//遣散
			};
			
			if(i == data.allianceBarrack.length-1)
			{
				byPage = tmp.page;
				byPages = tmp.pages;
				if(byPages > 0 && byPage == 0)
					byPage = 1;
				else 
					byPage = byPage;
			}
		}
	}else{
		byPage = 0;
		byPages = 0;
	}
}

//遣散士兵
function doDisbandAllianceSolier(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.getAllianceBarrackBySoldierNo(soldierNo[pageFlagIndex],byPage,doGetAllianceBarrackBySoldierNo);
}

//提取士兵
function doExtractSoldiers(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.getAllianceBarrackBySoldierNo(soldierNo[pageFlagIndex],byPage,doGetAllianceBarrackBySoldierNo);
	barIndex = 0;
}
//提取设置
function doRetrievalSetting(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	Alliance.getAllianceBarrackBySoldierNo(soldierNo[pageFlagIndex],byPage,doGetAllianceBarrackBySoldierNo);
}
//捐献士兵
function doDonatedSoidier(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
//	console.log("userSoldier[soldierIndex].userSoldierNo.substring(0,5) ===== " + userSoldier[soldierIndex].userSoldierNo.substring(0,5));
	for(var i=0; i<soldierNo.length; i++)
	{
		if(soldierNo[i] == userSoldier[soldierIndex].userSoldierNo.substring(0,5)){
			pageFlagIndex = i;
			console.log("pageFlagIndex ===== " + pageFlagIndex);
		}
	}
	
	Alliance.getAllianceBarrackBySoldierNo(soldierNo[pageFlagIndex],byPage,doGetAllianceBarrackBySoldierNo);
	barIndex = 0;


}

