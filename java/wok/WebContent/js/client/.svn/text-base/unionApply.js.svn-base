/*
 * 联盟申请（zjm 2013_7_17）
 */
var applyIndex = 0;
var applyForm = [[506,309,138],[646,309,155],[800,309,130]];
var isApply = false;
var unionApply = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isApply = true;
	var infoOffsetY = 0;
	var bW = gbox.getImage('wwg_zjm_41').width;
	var bH = gbox.getImage('wwg_zjm_41').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 20;
	var exitY = backdropY - 5;		    
		gbox.addObject(
			{ 
				id : 'unionApply',
				group : 'levelMenu_3',
				tileset : 'wwg_zjm_41',
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
					
					 //翻页数字及按钮控制
		               if(((758 < lastTouchMoveX) && (lastTouchMoveX < (758 + 16) + fOffsetX)) && ((488 < lastTouchMoveY) && (lastTouchMoveY < (488 + 14))))//控制向右翻页
		               {
		               	   if(applyPage < applyPages){
			            	   if(typeof(applyCharacter) != "undefined" && applyCharacter.length > 0){
									Alliance.getAllcharacterApplication(++applyPage,doetAllcharacterApplication);	 
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
		               
		               if(((678 < lastTouchMoveX) && (lastTouchMoveX < (678 + 16))) && ((488 < lastTouchMoveY) && (lastTouchMoveY < (488 + 14))))//控制向左翻页
		               {
		               	   if(applyPage >= 2){
			            	   if(typeof(applyCharacter) != "undefined" && applyCharacter.length > 0){
			            		   Alliance.getAllcharacterApplication(--applyPage,doetAllcharacterApplication);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }

		               
			 			var formX = applyForm[2][0];
			 			var formY = applyForm[2][1] - 5;
			 			var formW = applyForm[2][2];
			 			var formH = 25;
		 				var btnW = gbox.getImage('ty_an_06').width;
		 				var btnH = gbox.getImage('ty_an_06').height;
					 	for(var i=0; i<applyCharacter.length; i++){
			 			    if(applyCharacter[i].type == "申请中"){
				 				var btnX = formX + (formW - btnW)/2;
				 				var btnY = formY + (formH - btnH)/2 + (i * 26);
				 				gbox.drawImage('ty_an_08',btnX,btnY);
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
						        {
									Alliance.memberRefusedJoin(applyCharacter[i].allianceId,doMemberRefusedJoin);
									console.log("取消");
						        }
			 			    }else{
				 				var btnX = formX + (formW/2 - btnW)/2;
				 				var btnY = formY + (formH - btnH)/2 + (i * 26);
				 				gbox.drawImage('ty_an_08',btnX,btnY);
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
						        {
									Alliance.agreedJoin(applyCharacter[i].allianceId,doAgreedJoin);
									console.log("同意");
						        }

					 			var btnX = (formX + formW/2) + (formW/2 - btnW)/2;
					 			var btnY = formY + (formH - btnH)/2 + (i * 26);
					 			gbox.drawImage('ty_an_08',btnX,btnY);
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
							    {
									Alliance.memberRefusedJoin(applyCharacter[i].allianceId,doMemberRefusedJoin);
							        console.log("拒绝");
							    }
			 			    }
					 	}
		               
		               
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
						waiwuguan(getClickObjectIndex());
						unionApply(getClickObjectIndex());
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isApply)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'wwg_zjm_41',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });
					 	
					 	for(var i=0; i<applyCharacter.length; i++){
					 		for(var j=0; j<applyForm.length; j++){
					 			var fontW = gbox.getTextWidth(applyInfo[i][j],14);
					 			var formX = applyForm[j][0];
					 			var formY = applyForm[j][1] - 5;
					 			var formW = applyForm[j][2];
					 			var formH = 26;
				 				var btnW = gbox.getImage('ty_an_06').width;
				 				var btnH = gbox.getImage('ty_an_06').height;
					 			if(j == applyForm.length - 1){
					 				
					 			    if(applyCharacter[i].type == "申请中"){
						 				var btnX = formX + (formW - btnW)/2;
						 				var btnY = formY + (formH - btnH)/2 + (i * 26);
//						 				if(charId != applyCharacter[i].memberId)
//						 				{
							 				gbox.drawImage('ty_an_08',btnX,btnY);
											if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
									        {
									               gbox.drawImage('ty_an_06',btnX,btnY);
									        }
//						 				}else{
//						 					gbox.drawImage('ty_an_07',btnX,btnY);
//						 				}
							               var strW = gbox.getTextWidth("取消",14);
							               var strX = btnX + (btnW - strW)/2;
							               var strY = btnY + (btnH - 14)/2;
//							               gbox.drawDanceString("取消", strX, strY,14,'#000000','#FFFFFF');	
							               gbox.drawText("取消", strX, strY,10);
					 			    }else{

						 				var btnX = formX + (formW/2 - btnW)/2;
						 				var btnY = formY + (formH - btnH)/2 + (i * 26);
//						 				if(charId != applyCharacter[i].memberId)
//						 				{
							 				gbox.drawImage('ty_an_08',btnX,btnY);
											if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
									        {
									               gbox.drawImage('ty_an_06',btnX,btnY);
									        }
//						 				}else{
//						 					gbox.drawImage('ty_an_07',btnX,btnY);
//						 				}
							               var strW = gbox.getTextWidth("同意",14);
							               var strX = btnX + (btnW - strW)/2;
							               var strY = btnY + (btnH - 14)/2;
							               gbox.drawDanceString("同意", strX, strY,14,'#000000','#FFFFFF');	
							               gbox.drawText("同意", strX, strY,10);
							               
							 				var btnX = (formX + formW/2) + (formW/2 - btnW)/2;
							 				var btnY = formY + (formH - btnH)/2 + (i * 26);
//							 				if(charId != applyCharacter[i].memberId)
//							 				{
								 				gbox.drawImage('ty_an_08',btnX,btnY);
												if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
										        {
										               gbox.drawImage('ty_an_06',btnX,btnY);
										        }
//							 				}else{
//							 					gbox.drawImage('ty_an_07',btnX,btnY);
//							 				}
								               var strW = gbox.getTextWidth("拒绝",14);
								               var strX = btnX + (btnW - strW)/2;
								               var strY = btnY + (btnH - 14)/2;
//								               gbox.drawDanceString("拒绝", strX, strY,14,'#000000','#FFFFFF');	
								               gbox.drawText("拒绝", strX, strY,10);
					 			    }
					 			    	
					 				

					 			}else{
								 	var dx = formX + (formW - fontW)/2;
									var dy = formY + (formH - 14)/2 + i*formH;
//									gbox.drawDanceString("" + applyInfo[i][j], dx, dy,14,'#000000','#FFFFFF');
									gbox.drawText(applyInfo[i][j], dx, dy,2);
					 			}

					 		}
					 	}
					 	
						//绘制翻页数字及按钮
						gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + applyPage,
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 710,
								y : 490
																
							});
	                    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "/",
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 718,
								y : 490
																
							});
					    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + applyPages,
								color : '#ffffff',
								font : 'bold 12px sans-serif',
								x : 726,
								y : 490
																
							});

						if(applyPage < applyPages)
							gbox.drawImage("ty_an_24",758,488);
						  
						if(applyPage > 1)
							gbox.drawImage("ty_an_25",678,488);
						
						   if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
						   {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_17',
									tile : 0,
									dx : exitX ,
									dy : exitY + 6,
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
									dx : exitX ,
									dy : exitY + 6,
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

//联盟查看申请成员列表
var applyCharacter = new Array();
var applyPage = 0;
var applyPages = 0;
var userCharacterAuthoLevel = 0;
var applyInfo = new Array();
function doetAllcharacterApplication(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	applyPage = data.page;
	applyPages = data.pages;
	userCharacterAuthoLevel = data.userCharacterAuthoLevel;
		
	if(applyPages > 0 && applyPage == 0)
		applyPage = 1;
	else 
		applyPage = applyPage;
	applyCharacter = new Array();
	applyInfo = new Array();
    if(data.info != null){
	    for(var i=0; i<data.info.length; i++){
	    	var temp = data.info[i];
	    	applyCharacter[i] = 
	    	{
	    			allianceId:temp.allianceId,
	    			allianceName : temp.allianceName,
	    			type : temp.type,
	    	};
	    	applyInfo[i] = new Array();
	    	applyInfo[i][0] = applyCharacter[i].allianceName;
	    	applyInfo[i][1] = applyCharacter[i].type;
	    }	
    }
    else{
    	applyPage = 0;
    	applyPages = 0;
    }
    	
    
	waiwuguan(getClickObjectIndex());
	unionApply(getClickObjectIndex());
	changeMap('cityMenuLayer');		
}

function doMemberRefusedJoin(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
	Alliance.getAllcharacterApplication(applyPage,doetAllcharacterApplication);
}
function doAgreedJoin(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
	displayDestroy();
	exit(getClickObjectIndex());
	Alliance.initCharacterAlliance(dataGetAlliance);
//	Alliance.getAllcharacterApplication(applyPage,doetAllcharacterApplication);
}
