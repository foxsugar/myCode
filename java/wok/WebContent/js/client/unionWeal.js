/*
 * 联盟福利（zjm 2013_7_12）
 */
var shiwuDiv = null;
var shiwuText;
var woodDiv = null;
var woodText;
var stoneDiv = null;
var stoneText;
var steelDiv = null;
var steelText;
var moneyDiv = null;
var moneyText;
var goldDiv = null;
var goldText;
var isUnionWeal = false;
var unionWeal = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionWeal = true;	
	var bW = gbox.getImage('wwg_zjm_06').width;
	var bH = gbox.getImage('wwg_zjm_06').height;
	var backdropX = 539;
	var backdropY = 281;
		gbox.addObject(
			{ 
				id : "unionWeal",
				group : 'levelMenu_2',
				tileset : 'wwg_zjm_06',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
	                if(shiwuDiv == null && !gbox._isIndwellDiv("shiwuDiv","input"))
					{
						var pnX = 582;
						var pnY = 538;
						shiwuDiv = addDivWindowBg(pnX,pnY);
						shiwuDiv.id = 'shiwuDiv';
						document.body.appendChild(shiwuDiv);
						shiwuText = document.createElement("input");
						shiwuText.id = 'shiwuText';
						shiwuText.style.opacity="0.5";
						shiwuText.style.backgroundColor = "#272120";
						shiwuText.style.color = "#ffffff";
						shiwuText.style.width = '270px';
						shiwuText.style.height = '200px';
						shiwuText.style.maxWidth = '30px';
						shiwuText.style.maxHeight = '28px';
						shiwuText.style.background = "transparent";
						shiwuText.style.fontSize="14px";
						shiwuText.style.fontFamily="宋体";
						
						shiwuText.style.border = "0px solid";
						shiwuText.style.outline = "none";
						shiwuText.value = 1;
						shiwuDiv.appendChild(shiwuText);
		
					}
	                if(woodDiv == null && !gbox._isIndwellDiv("woodDiv","input"))
					{
						var pnX = 582;
						var pnY = 538;
						woodDiv = addDivWindowBg(pnX,pnY);
						woodDiv.id = 'woodDiv';
						document.body.appendChild(woodDiv);
						woodText = document.createElement("input");
						woodText.id = 'woodText';
						woodText.style.opacity="0.5";
						woodText.style.backgroundColor = "#272120";
						woodText.style.color = "#ffffff";
						woodText.style.width = '270px';
						woodText.style.height = '200px';
						woodText.style.maxWidth = '30px';
						woodText.style.maxHeight = '28px';
						woodText.style.background = "transparent";
						woodText.style.fontSize="14px";
						woodText.style.fontFamily="宋体";
						
						woodText.style.border = "0px solid";
						woodText.style.outline = "none";
						woodText.value = 1;
						woodDiv.appendChild(woodText);
		
					}
                    if(stoneDiv == null && !gbox._isIndwellDiv("stoneDiv","input"))
					{
						var pnX = 768;
						var pnY = 538;
						stoneDiv = addDivWindowBg(pnX,pnY);
						stoneDiv.id = 'stoneDiv';
						document.body.appendChild(stoneDiv);
						stoneText = document.createElement("input");
						stoneText.id = 'stoneText';
						stoneText.style.opacity="0.5";
						stoneText.style.backgroundColor = "#272120";
						stoneText.style.color = "#ffffff";
						stoneText.style.width = '270px';
						stoneText.style.height = '200px';
						stoneText.style.maxWidth = '30px';
						stoneText.style.maxHeight = '28px';
						stoneText.style.background = "transparent";
						stoneText.style.fontSize="14px";
						stoneText.style.fontFamily="宋体";
						
						stoneText.style.border = "0px solid";
						stoneText.style.outline = "none";
						stoneText.value = 1;
						stoneDiv.appendChild(stoneText);
	
					}
	                if(steelDiv == null && !gbox._isIndwellDiv("steelDiv","input"))
					{
						var pnX = 862;
						var pnY = 538;
						steelDiv = addDivWindowBg(pnX,pnY);
						steelDiv.id = 'steelDiv';
						document.body.appendChild(steelDiv);
						steelText = document.createElement("input");
						steelText.id = 'steelText';
						steelText.style.opacity="0.5";
						steelText.style.backgroundColor = "#272120";
						steelText.style.color = "#ffffff";
						steelText.style.width = '270px';
						steelText.style.height = '200px';
						steelText.style.maxWidth = '30px';
						steelText.style.maxHeight = '28px';
						steelText.style.background = "transparent";
						steelText.style.fontSize="14px";
						steelText.style.fontFamily="宋体";
						
						steelText.style.border = "0px solid";
						steelText.style.outline = "none";
						steelText.value = 1;
						steelDiv.appendChild(steelText);
					}
	                if(moneyDiv == null && !gbox._isIndwellDiv("moneyDiv","input"))
					{
						var pnX = 955;
						var pnY = 538;
						moneyDiv = addDivWindowBg(pnX,pnY);
						moneyDiv.id = 'moneyDiv';
						document.body.appendChild(moneyDiv);
						moneyText = document.createElement("input");
						moneyText.id = 'moneyText';
						moneyText.style.opacity="0.5";
						moneyText.style.backgroundColor = "#272120";
						moneyText.style.color = "#ffffff";
						moneyText.style.width = '270px';
						moneyText.style.height = '200px';
						moneyText.style.maxWidth = '30px';
						moneyText.style.maxHeight = '28px';
						moneyText.style.background = "transparent";
						moneyText.style.fontSize="14px";
						moneyText.style.fontFamily="宋体";
						
						moneyText.style.border = "0px solid";
						moneyText.style.outline = "none";
						moneyText.value = 1;
						moneyDiv.appendChild(moneyText);
					}
	                if(goldDiv == null && !gbox._isIndwellDiv("goldDiv","input"))
					{
						var pnX = 1052;
						var pnY = 538;
						goldDiv = addDivWindowBg(pnX,pnY);
						goldDiv.id = 'goldDiv';
						document.body.appendChild(goldDiv);
						goldText = document.createElement("input");
						goldText.id = 'goldText';
						goldText.style.opacity="0.5";
						goldText.style.backgroundColor = "#272120";
						goldText.style.color = "#ffffff";
						goldText.style.width = '270px';
						goldText.style.height = '200px';
						goldText.style.maxWidth = '30px';
						goldText.style.maxHeight = '28px';
						goldText.style.background = "transparent";
						goldText.style.fontSize="14px";
						goldText.style.fontFamily="宋体";
						
						goldText.style.border = "0px solid";
						goldText.style.outline = "none";
						goldText.value = 1;
						goldDiv.appendChild(goldText);
					}
	                
					wealList(getClickObjectIndex());
					consumeList(getClickObjectIndex());
					changeMap('cityMenuLayer');	
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(shiwuDiv,"shiwuDiv",582);
					shiwuText.value = shiwuText.value.replace(/\D/g,'');
					if(shiwuText.value.length > 6){
						shiwuText.value = 100000;
					}
					adaptiveDiv(woodDiv,"woodDiv",676);
					woodText.value = woodText.value.replace(/\D/g,'');
					if(woodText.value.length > 6){
						woodText.value = 100000;
					}
					adaptiveDiv(stoneDiv,"stoneDiv",768);
					stoneText.value = stoneText.value.replace(/\D/g,'');
					if(stoneText.value.length > 6){
						stoneText.value = 100000;
					}
					adaptiveDiv(steelDiv,"steelDiv",862);
					steelText.value = steelText.value.replace(/\D/g,'');
					if(steelText.value.length > 6){
						steelText.value = 100000;
					}
					adaptiveDiv(moneyDiv,"moneyDiv",955);
					moneyText.value = moneyText.value.replace(/\D/g,'');
					if(moneyText.value.length > 6){
						moneyText.value = 100000;
					}
					adaptiveDiv(goldDiv,"goldDiv",1052);
					goldText.value = goldText.value.replace(/\D/g,'');
					if(goldText.value.length > 6){
						goldText.value = 100000;
					}
					/*======================================================*/

				},
				myclick : function()
				{
	 				var btnW = gbox.getImage('ty_an_06').width;
	 				var btnH = gbox.getImage('ty_an_06').height;
	 				var btnX = 1048;
	 				var btnY = 572;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
			        {
						Alliance.donatedResources(moneyText.value*10000,
								                  shiwuText.value*10000,
								                  woodText.value*10000,
								                  stoneText.value*10000,
								                  steelText.value*10000,
								                  goldText.value,doDonatedResources);
			        }
                    
					//捐献排行
	 				var btnW = gbox.getImage('ty_an_09').width;
	 				var btnH = gbox.getImage('ty_an_09').height;
	 				var btnX = 544;
	 				var btnY = 572;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
			        {
						Alliance.getAllAianceContribute(rankingPage,doGetAllAianceContribute);
			        }
					
					//领取按钮
	 				if(isReceive[consumeIndex])
	 				{
		 				var btnX = 1048;
		 				var btnY = 456;
		 				gbox.drawImage('ty_an_08',btnX,btnY);
						if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
				        {
							Alliance.receiveSalary(ticket[consumeIndex],doReceiveSalary);
				        }
	 				}
					
				    waiwuguan(getClickObjectIndex());
				    unionWeal(getClickObjectIndex());
					changeMap('cityMenuLayer');
				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionWeal)
					 {
						//联盟科技绘制
					 	gbox.drawImage('wwg_zjm_06',539,281);
		 				var btnW = gbox.getImage('ty_an_06').width;
		 				var btnH = gbox.getImage('ty_an_06').height;
		 				var btnX = 1048;
		 				var btnY = 572;
		 				gbox.drawImage('ty_an_08',btnX,btnY);
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
				        {
				               gbox.drawImage('ty_an_06',btnX,btnY);
				        }
			               var strW = gbox.getTextWidth("捐献",14);
			               var strX = btnX + (btnW - strW)/2;
			               var strY = btnY + (btnH - 14)/2;
//						gbox.drawDanceString("捐献", strX, strY,14,'#000000','#FFFFFF');	
						gbox.drawText("捐献", strX, strY,10);
						
		 				var btnW = gbox.getImage('ty_an_09').width;
		 				var btnH = gbox.getImage('ty_an_09').height;
		 				var btnX = 544;
		 				var btnY = 572;
		 				gbox.drawImage('ty_an_10',btnX,btnY);
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);
				        }
			               var strW = gbox.getTextWidth("捐献排行",14);
			               var strX = btnX + (btnW - strW)/2 + 1;
			               var strY = btnY + (btnH - 14)/2;
//						gbox.drawDanceString("捐献排行", strX, strY,14,'#000000','#FFFFFF');	
						gbox.drawText("捐献排行", strX, strY,10);
//						gbox.drawDanceString(allianceWealth, 732, 579,14,'#000000','#FFFFFF');
						gbox.drawText(allianceWealth, 732, 579,2);
//						gbox.drawDanceString(memberWealth, 952, 579,14,'#000000','#FFFFFF');
						gbox.drawText(memberWealth, 952, 579,2);
		 				var btnW = gbox.getImage('ty_an_06').width;
		 				var btnH = gbox.getImage('ty_an_06').height;
		 				var btnX = 1048;
		 				var btnY = 456;
		 				gbox.drawImage('ty_an_08',btnX,btnY);
		 				if(isReceive[consumeIndex])
		 				{
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
					        {
					               gbox.drawImage('ty_an_06',btnX,btnY);
					        }
		 				}else
		 					gbox.drawImage('ty_an_05',btnX,btnY);

			               var strW = gbox.getTextWidth("领取",14);
			               var strX = btnX + (btnW - strW)/2;
			               var strY = btnY + (btnH - 14)/2;
//						gbox.drawDanceString("领取", strX, strY,14,'#000000','#FFFFFF');	
						gbox.drawText("领取", strX, strY,10);
					 }						
				}
			});
};
//无偿福利列表
var isWealList = false;
var wealList = function(index)
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isWealList = true;
	gbox.addObject(
	{ 
		id : 'wealList',
		group : 'levelMenu_2',
		tileset : 'wwg_zjm_06',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [542,306], [705,306], [705,488],[542,488]],
		initialize : function()
		{
            var content = new Array(expeditionStation);
            var listLen = content[0].length;
            if(listLen < 7){
            	listLen = 7;
            } 
            wealOffsetY = weal_OffsetY = 0;
			weallist.init( 'wwg_zjm_34', 'wwg_zjm_34','wwg_zjm_34', 'wwg_zjm_34', null,content, 520, 285, 1, listLen, 25, 7, false, -48,-2);
			weallist.isCenter = false;
		},
		first : function() 
		{	
		},
		myclick : function()
		{
		    waiwuguan(getClickObjectIndex());
		    unionWeal(getClickObjectIndex());
			changeMap('cityMenuLayer');
		},
		blit : function()
		{
			if(isDrawUI[index] && isWealList)
			{
				if(!isNaN(expeditionStation))
				weallist.paint( weal_OffsetY, weal_BeginSlip, weal_Time );
			}
		}
	 });
};

//消耗福利列表
var isConsumeList = false;
var consumeList = function(index)
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isConsumeList = true;
	gbox.addObject(
	{ 
		id : 'consumeList',
		group : 'levelMenu_2',
		tileset : 'wwg_zjm_06',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [695,306], [1108,306], [1108,463],[695,463]],
		initialize : function()
		{
            var content = new Array(ticketInfo);
            var listLen = content[0].length;
            if(listLen < 6){
            	listLen = 6;
            } 
            consumeOffsetY = consume_OffsetY = 0;
            consumelist.init( 'wwg_zjm_35', 'wwg_zjm_38','wwg_zjm_38', 'wwg_zjm_39', null,content, 675, 285, 1, listLen, 25, 6, false, -295,-2);
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			if(consumelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(consumeOffsetY) > 12)
				{
					consumeOffsetY=12*(consumeOffsetY/Math.abs(consumeOffsetY));
				}
				consume_OffsetY = consumeOffsetY;
				consume_BeginSlip = true;
				consume_Time = 0;
			}else{
				consumeIndex = consumelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				console.log("consumeIndex ===== " + consumeIndex);
				consumelist.radioHandle(consumeIndex);
			}	
			
          	if(gbox._mouseArea(consumelist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		consumelist.keyUp();
            }
          	if(gbox._mouseArea(consumelist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		consumelist.keyDown();
            }
			
		    waiwuguan(getClickObjectIndex());
		    unionWeal(getClickObjectIndex());
			changeMap('cityMenuLayer');
		},
		blit : function()
		{
			if(isDrawUI[index] && isConsumeList)
			{
				consumelist.paint( consume_OffsetY, consume_BeginSlip, consume_Time );
			}
		}
	 });
};

var isWealDonate = false;
var wealDonate = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isWealDonate = true;
	var buyOffsetY = 25;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'wealDonate',
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
				    var fontW = gbox.getTextWidth("确定",14);
					var bgW = gbox.getImage('ty_an_55').width;
					var bgH = gbox.getImage('ty_an_55').height;
				    var btnW = gbox.getImage('ty_an_10').width;
                    var btnX = backdropX + (bgW - btnW)/2;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + buyOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + buyOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						isWealDonate = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("确定！");
					    waiwuguan(getClickObjectIndex());
					    unionWeal(getClickObjectIndex());
						changeMap('cityMenuLayer');
						Alliance.initAllianceWealth(doInitAllianceWealth);
			        }else{
			        	unionWeal(getClickObjectIndex());
			        	wealDonate(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isWealDonate)
					 {
						 var bgW = gbox.getImage('ty_an_55').width;
						 var bgH = gbox.getImage('ty_an_55').height;
						 gbox.drawImage('ty_an_55',backdropX,backdropY);
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - 45)/2;
//						 gbox.drawImage('quzhuTitle',titleX,backdropY);
//						 gbox.drawDanceString("继续捐献", titleX, backdropY,14,'#000000','#FFC861');
						 gbox.drawText("继续捐献", titleX, backdropY,14);
						    var fontW = gbox.getTextWidth("确定",14);
						    var btnW = gbox.getImage('ty_an_10').width;
                            var btnX = backdropX + (bgW - btnW)/2;
						    var btnY = backdropY + bgH/2 + buyOffsetY;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);			               
					        }	
							gbox.drawText("确定", backX, backY,10);
							if(typeof(wealDonateInfo) != 'undefined'){
//								gbox._drawTxtRect(wealDonateInfo,626,320,180,50,8,'#ffffff','#000000');
								var fontW = gbox.getTextWidth(wealDonateInfo,14);
								var btnX = backdropX + (bgW - fontW)/2;
								gbox.drawLineBreakText(wealDonateInfo,btnX,340,6,280);
							}
					 }						
				}
			});
};

//捐献排名
var isDonateRanking = false;
var rankingForm = [[560,280,48],[608,280,105],[713,280,105],[818,280,62]];
var donateRanking = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isDonateRanking = true;	
	var bW = gbox.getImage('wwg_zjm_40').width;
	var bH = gbox.getImage('wwg_zjm_40').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 15;
	var exitY = backdropY - 5;	
		gbox.addObject(
			{ 
				id : 'donateRanking',
				group : 'levelMenu_3',
				tileset : 'wwg_zjm_40',
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
		               if(((756 < lastTouchMoveX) && (lastTouchMoveX < (756 + 16))) && ((484 < lastTouchMoveY) && (lastTouchMoveY < (484 + 14))))//控制向右翻页
		               {
		               	   if(rankingPage < rankingPages){
			            	   if(typeof(rankingCharacter) != "undefined" && rankingCharacter.length > 0){
									Alliance.getAllAllianceMember(allianceData.allianceId,++rankingPage,doGetAllAllianceMember);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
		               
		               if(((666 < lastTouchMoveX) && (lastTouchMoveX < (666 + 16))) && ((484 < lastTouchMoveY) && (lastTouchMoveY < (484 + 14))))//控制向左翻页
		               {
		               	   if(rankingPage >= 2){
			            	   if(typeof(rankingCharacter) != "undefined" && rankingCharacter.length > 0){
			               		   Alliance.getAllAllianceMember(allianceData.allianceId,--rankingPage,doGetAllAllianceMember);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }

					
						if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23))
						{
							displayDestroy();
							exit(index);
							waiwuguan(getClickObjectIndex());
							unionWeal(getClickObjectIndex());
		                    changeMap('cityMenuLayer');
						}else{
							waiwuguan(getClickObjectIndex());
							unionWeal(getClickObjectIndex());
							donateRanking(getClickObjectIndex());
							changeMap('cityMenuLayer');	
						}
					 	

				},
				blit : function()
				{
					 if(isDrawUI[index] && isDonateRanking)
					 {
						//联盟成员绘制
					 	var bgW = gbox.getImage('wwg_zjm_40').width;
						 var bgH = gbox.getImage('wwg_zjm_40').height;
						 gbox.drawImage('wwg_zjm_40',backdropX,backdropY);
					 	
					 	for(var i=0; i<rankingCharacter.length; i++){
					 		for(var j=0; j<rankingForm.length; j++){
					 			var fontW = gbox.getTextWidth(rankingInfo[i][j],14);
					 			var formX = rankingForm[j][0];
					 			var formY = rankingForm[j][1] - 5;
					 			var formW = rankingForm[j][2];
					 			var formH = 26;
					 			
							 	var dx = formX + (formW - fontW)/2;
								var dy = formY + (formH - 14)/2 + i*formH;
//								gbox.drawDanceString("" + rankingInfo[i][j], dx, dy,14,'#000000','#FFFFFF');
								gbox.drawText(rankingInfo[i][j], dx, dy,2);
					 		}
					 	}
					 	
						//绘制翻页数字及按钮
						gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + rankingPage,
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 702,
								y : 486
																
							});
	                    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "/",
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 712,
								y : 486
																
							});
					    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + rankingPages,
								color : '#ffffff',
								font : 'bold 12px sans-serif',
								x : 722,
								y : 486
																
							});
						if(rankingPage < rankingPages)
						  gbox.drawImage("ty_an_25",666,484);
						if(rankingPage > 1)
						  gbox.drawImage("ty_an_24",756,484);
					 
						
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

var isReceive = new Array();
var ticket = new Array();
var ticketInfo = new Array();
var expeditionStation = new Array();
var allianceWealth;
var memberWealth;
//联盟福利回掉
function doInitAllianceWealth(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	isReceive = new Array();
	ticket = new Array();
	ticketInfo = new Array();
	for(var i=0; i<data[0].length; i++)
	{
		isReceive[i] = data[0][i].isReceive;
		ticket[i] = data[0][i].ticket;
		ticketInfo[i] = data[0][i].wealthName + data[0][i].ticket;
	}
	expeditionStation = new Array();
	for(var i=0; i<data[1].length; i++)
	{
		expeditionStation[i] = data[1][i].buidingEffect + data[1][i].value;
	}
	
	allianceWealth = data[2].allianceWealth;
	memberWealth = data[2].memberWealth;
	unionWeal(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

//捐献
var wealDonateInfo = undefined;
function doDonatedResources(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	wealDonateInfo = "";
	if(data.food != 'undefined' && data.food != null)
		wealDonateInfo += ""+"粮食  ";
	if(data.wood != 'undefined' && data.wood != null)
		wealDonateInfo += ""+"木材  ";
	if(data.stone != 'undefined' && data.stone != null)
		wealDonateInfo += ""+"石料  ";
	if(data.ironore != 'undefined' && data.ironore != null)
		wealDonateInfo += ""+"铁矿  ";
	if(data.money != 'undefined' && data.money != null)
		wealDonateInfo += ""+"铜币  ";
	if(data.cash != 'undefined' && data.cash != null)
		wealDonateInfo += ""+"金锭  ";
	
	if(wealDonateInfo == ""){
		wealDonateInfo = "捐献成功！！！"
	}else
	    wealDonateInfo += "资源不足！未捐献。";
	
	waiwuguan(getClickObjectIndex());
	unionWeal(getClickObjectIndex());
	wealDonate(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

//领取
function doReceiveSalary(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
	Alliance.initAllianceWealth(doInitAllianceWealth);
}

var rankingCharacter = new Array();
var rankingPage = 0;
var rankingPages = 0;
var userCharacterAuthoLevel = 0;
var rankingInfo = new Array();
//捐献排行
function doGetAllAianceContribute(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	rankingPage = data.page;
	rankingPages = data.pages;
	userCharacterAuthoLevel = data.userCharacterAuthoLevel;
		
	if(rankingPages > 0 && rankingPage == 0)
		rankingPage = 1;
	else 
		rankingPage = rankingPage;
	rankingCharacter = new Array();
    if(data.retlist != null){
	    for(var i=0; i<data.retlist.length; i++){
	    	var temp = data.retlist[i];
	    	rankingCharacter[i] = 
	    	{
	    			characterName:temp.characterName,
	    			contributeAmount : temp.contributeAmount,
	    			todayAmount : temp.todayAmount,
	    	};
	    	rankingInfo[i] = new Array();
	    	rankingInfo[i][0] = i + 1;
	    	rankingInfo[i][1] = rankingCharacter[i].characterName;
	    	rankingInfo[i][2] = rankingCharacter[i].contributeAmount;
	    	rankingInfo[i][3] = rankingCharacter[i].todayAmount;
	    }	
    }
    else{
    	rankingPage = 0;
    	rankingPages = 0;
    }
    	
	waiwuguan(getClickObjectIndex());
	unionWeal(getClickObjectIndex());
	donateRanking(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}