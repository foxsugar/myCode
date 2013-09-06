/*
 * 联盟市场（zjm 2013_7_12）
 */
var mOffsetX = 90;
var isUnionMarket = false;
var marketIndex = 0;
var fIndex = -1;
var marketForm = [[542,320,98],[640,320,50],[690,320,90],[786,320,127],[913,320,70],[982,320,105]];
var unionMarket = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionMarket = true;	
	var bW = gbox.getImage('wwg_zjm_10').width;
	var bH = gbox.getImage('wwg_zjm_10').height;
	var backdropX = 539;
	var backdropY = 281;
	var dx = 0;
	var dy = 0;
		gbox.addObject(
			{ 
				id : 'unionMarket',
				group : 'levelMenu_2',
				tileset : 'wwg_zjm_10',
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
		               if(((758 + mOffsetX < lastTouchMoveX) && (lastTouchMoveX < (758 + 16) + mOffsetX)) && ((580 < lastTouchMoveY) && (lastTouchMoveY < (580 + 14))))//控制向右翻页
		               {
		               	   if(marketPage < marketPages){
			            	   if(typeof(marketCharacter) != "undefined" && marketCharacter.length > 0){
			            		   Alliance.getAllianceShoping(++marketPage,doGetAllianceShoping);
			            	   }else
			            		   alert("没有市场数据！");
		               	   }
		               }
		               
		               if(((675 + mOffsetX < lastTouchMoveX) && (lastTouchMoveX < (675 + 16) + mOffsetX)) && ((580 < lastTouchMoveY) && (lastTouchMoveY < (580 + 14))))//控制向左翻页
		               {
		               	   if(marketPage >= 2){
			            	   if(typeof(marketCharacter) != "undefined" && marketCharacter.length > 0){
			            		   Alliance.getAllianceShoping(--marketPage,doGetAllianceShoping);
			            	   }else
			            		   alert("没有市场数据！");
		               	   }
		               }
					 	for(var i=0; i<marketCharacter.length; i++){
				 			var formX = marketForm[5][0];
				 			var formY = marketForm[5][1] - 5;
				 			var formW = marketForm[5][2];
				 			var formH = 25;
				 			
			 				var btnW = gbox.getImage('ty_an_06').width;
			 				var btnH = gbox.getImage('ty_an_06').height;
			 				
			 				var btnX = formX + (formW - btnW)/2;
			 				var btnY = formY + (formH - btnH)/2 + (i * 26);
			 				console.log("marketCharacter["+i+"].isOpen ===== " + marketCharacter[i].isOpen);
			 				switch(marketCharacter[i].isOpen){

			 				case 1://点亮
				 				gbox.drawImage('ty_an_08',btnX,btnY);
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
						        {
									marketIndex = i;
									console.log("marketIndex ===== " + marketIndex);
			 						mInfo = undefined;
			 						mInfo = "物品名称：" + marketCharacter[marketIndex].itemName 
			 						         + "，等级：" + marketCharacter[marketIndex].itemNoLevel
			 						         +"，剩余数量：" + marketCharacter[marketIndex].remainAmount
			 						         +"，出售价格：" + marketCharacter[marketIndex].needWelfare
			 						         +"，可购数量：" + marketCharacter[marketIndex].buyNumber +  ".";
						        	marketBuy(getClickObjectIndex());
									changeMap('cityMenuLayer');
						        }
			 					break;
			 				}
					 	}
					 		
					waiwuguan(getClickObjectIndex());
					unionMarket(getClickObjectIndex());
					changeMap('cityMenuLayer');	
				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionMarket)
					 {
						 
						 
						//联盟成员绘制
					 	gbox.drawImage('wwg_zjm_10',539,281);
					 	
					 	
						//绘制翻页数字及按钮
						gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + marketPage,
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 708 + mOffsetX,
								y : 581
																
							});
	                    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "/",
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 719 + mOffsetX,
								y : 581
																
							});
					    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + marketPages,
								color : '#ffffff',
								font : 'bold 12px sans-serif',
								x : 729 + mOffsetX,
								y : 581
																
							});
						if(marketPage < marketPages)
						  gbox.drawImage("ty_an_24",758 + mOffsetX,580);
						if(marketPage > 1)
						  gbox.drawImage("ty_an_25",675 + mOffsetX,580);
						
//						gbox.drawDanceString("我的财富：" + memberWealth, 550, 580,14,'#000000','#FFFFFF');	
						gbox.drawText("我的财富：" + memberWealth, 550, 580,2);
					 	for(var i=0; i<marketCharacter.length; i++){
					 		for(var j=0; j<marketForm.length; j++){
					 			var fontW = gbox.getTextWidth(marketInfo[i][j],14);
					 			var formX = marketForm[j][0];
					 			var formY = marketForm[j][1] - 5;
					 			var formW = marketForm[j][2];
					 			var formH = 26;
					 			
					 			if(j == marketForm.length - 1){
					 				var btnW = gbox.getImage('ty_an_06').width;
					 				var btnH = gbox.getImage('ty_an_06').height;
					 				var btnX = formX + (formW - btnW)/2;
					 				var btnY = formY + (formH - btnH)/2 + (i * 26);
					 				
					 				switch(marketCharacter[i].isOpen){
					 				case 0://灰按钮
					 					gbox.drawImage('ty_an_05',btnX,btnY);
							               var strW = gbox.getTextWidth("购买",14);
							               var strX = btnX + (btnW - strW)/2 - 2;
							               var strY = btnY + (btnH - 14)/2;
//							               gbox.drawDanceString("购买", strX, strY,14,'#000000','#FFFFFF');	
							               gbox.drawText("购买", strX, strY,10);
							               break;
					 				case 1://点亮
						 				gbox.drawImage('ty_an_08',btnX,btnY);
										if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
								        {
								               gbox.drawImage('ty_an_06',btnX,btnY);
								        }
							               var strW = gbox.getTextWidth("购买",14);
							               var strX = btnX + (btnW - strW)/2 - 2;
							               var strY = btnY + (btnH - 14)/2;
//							               gbox.drawDanceString("购买", strX, strY,14,'#000000','#FFFFFF');	
							               gbox.drawText("购买", strX, strY,10);
							               break;
					 				case 2://不可购买
							               var strW = gbox.getTextWidth("不可购买",14);
							               var strX = btnX + (btnW - strW)/2;
							               var strY = btnY + (btnH - 14)/2;
//							               gbox.drawDanceString("不可购买", strX, strY,14,'#000000','#FFFFFF');	
							               gbox.drawText("不可购买", strX, strY,10);
							               break;
					 				}

					 			}else{

								 	dx = formX + (formW - fontW)/2;
									dy = formY + (formH - 14)/2 + i*formH;
//									gbox.drawDanceString("" + marketInfo[i][j], dx, dy,14,'#000000','#FFFFFF');
									gbox.drawText("" + marketInfo[i][j], dx, dy,2);
									if(((dx < touchMoveX) && (touchMoveX < (dx + fontW))) && ((dy < touchMoveY) && (touchMoveY < (dy + 25))))
							        {
										fIndex = i;
//										console.log("fIndex ============ " + fIndex);
							        }
					 			}
					 			
					 		}
					 		
							if(typeof(marketCharacter) != "undefined")
							{
					 			var formX = marketForm[0][0];
					 			var formY = marketForm[0][1] - 5;
					 			var formW = marketForm[0][2];
					 			var formH = 26;
							 	dx = formX + (formW - fontW)/2;
								dy = formY + (formH - 14)/2 + fIndex*formH;
								
								if(((dx < touchMoveX) && (touchMoveX < (dx + fontW))) && ((dy < touchMoveY) && (touchMoveY < (dy + 25))))
						        {
									var tempOffset = 15;
									var tempH = tooltip.computMaterial(gbox.getBufferContext(),marketCharacter[fIndex].toolTipInfo).height;
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
								
									var uiScreenY = gbox.getScreenH();
									if((uiScreenY - touchMoveY) < tempH)	
									{
										mouseY = uiScreenY - tempH - 20;
									}
									else
									{
										mouseY = touchMoveY;
									}
									if(touchMoveX !=0)
										tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,mouseY + tempOffset,marketCharacter[fIndex].toolTipInfo); 
						        }           
			              }
					 	}

					 }						
				}
			});
};

var isMarketBuy = false;
var marketBuy = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isMarketBuy = true;
	var buyOffsetY = 25;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'marketBuy',
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
				    var fontW = gbox.getTextWidth("购买",14);
					var bgW = gbox.getImage('ty_an_55').width;
					var bgH = gbox.getImage('ty_an_55').height;
                    var btnX = backdropX + 20;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + buyOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + buyOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						isMarketBuy = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("购买确认！");
					    waiwuguan(getClickObjectIndex());
					    unionMarket(getClickObjectIndex());
						changeMap('cityMenuLayer');
						console.log("===================== " + marketCharacter[marketIndex].itemNo);
						Alliance.allianceShopingbuyItem(marketCharacter[marketIndex].itemNo,doAllianceShopingbuyItem);
			        }else
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 + buyOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + buyOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						isMarketBuy = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    waiwuguan(getClickObjectIndex());
					    unionMarket(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }else{
			        	unionMarket(getClickObjectIndex());
			        	marketBuy(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isMarketBuy)
					 {
						 var bgW = gbox.getImage('ty_an_55').width;
						 var bgH = gbox.getImage('ty_an_55').height;
						 gbox.drawImage('ty_an_55',backdropX,backdropY);
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - 45)/2;
//						 gbox.drawImage('quzhuTitle',titleX,backdropY);
//						 gbox.drawDanceString("购  买", titleX, backdropY,14,'#000000','#FFC861');
						 gbox.drawText("购  买", titleX, backdropY,14);
						    var fontW = gbox.getTextWidth("购买",14);
                            var btnX = backdropX + 20;
						    var btnY = backdropY + bgH/2 + buyOffsetY;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2 - 2;
							var backY = btnY + (25 - 14)/2;	
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);			               
					        }	
							gbox.drawText("购买", backX, backY,10);
                            var btnX1 = backdropX + bgW - 102;
						    var btnY1 = backdropY + bgH/2 + buyOffsetY;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2 - 2;
							var backY = btnY1 + (25 - 14)/2;	
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);			               
					        }
							gbox.drawText("取消", backX, backY,10);
							if(typeof(mInfo) != 'undefined'){
//								gbox._drawTxtRect(mInfo,626,320,180,50,8,'#ffffff','#000000');
								gbox.drawLineBreakText(mInfo,616,340,6,220);
							}
					 }						
				}
			});
};

var marketCharacter = new Array();
var marketPage = 0;
var marketPages = 0;
var memberWealth = 0;
var marketInfo = new Array();
var mInfo = undefined;
function doGetAllianceShoping(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	marketPage = data[0].page;
	marketPages = data[0].pages;
	memberWealth = data[0].memberWealth;
		
	if(marketPages > 0 && marketPage == 0)
		marketPage = 1;
	else 
		marketPage = marketPage;
	
	marketCharacter = new Array();
    if(data.length > 0){
	    for(var i=1; i<data.length; i++){
    		var temp = data[i];
	    	marketCharacter[i-1] = 
	    	{
	    		buyNumber:temp.buyNumber,
	    		isOpen : temp.isOpen,
	    		itemNoLevel : temp.itemNoLevel,
	    		needWelfare : temp.needWelfare,
	    		remainAmount : temp.remainAmount,
	    		type : temp.type,
	    		itemNo:temp.itemNo,
    			description:temp.toolTipInfo.description,
    			isBop:temp.toolTipInfo.isBop,
    			itemName:temp.toolTipInfo.itemName,
    			
				toolTipInfo:{
	    			description:temp.toolTipInfo.description,
	    			isBop:temp.toolTipInfo.isBop,
	    			itemName:temp.toolTipInfo.itemName,
				}
	    	};
	    	
	    	var mIndex = i - 1;
	    	marketInfo[mIndex] = new Array();
	    	marketInfo[mIndex][0] = marketCharacter[mIndex].itemName;
	    	marketInfo[mIndex][1] = marketCharacter[mIndex].itemNoLevel;
	    	marketInfo[mIndex][2] = marketCharacter[mIndex].remainAmount;
	    	marketInfo[mIndex][3] = marketCharacter[mIndex].needWelfare + " / " + memberWealth;
	    	marketInfo[mIndex][4] = marketCharacter[mIndex].buyNumber;
	    }	
	    

	    
    }
    else
    	marketPage = 0;
    
    waiwuguan(getClickObjectIndex());
    unionMarket(getClickObjectIndex());
	changeMap('cityMenuLayer');
}
function doAllianceShopingbuyItem(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
	Alliance.getAllianceShoping(page,doGetAllianceShoping);
}
