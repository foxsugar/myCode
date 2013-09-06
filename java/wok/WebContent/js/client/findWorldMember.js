/*
 * 联盟成员（zjm 2013_7_17）
 */
var fOffsetX = 90;
var isFindMember = false;
var findIndex = 0;
var findForm = [[438,245,98],[538,245,50],[590,245,90],[678,245,70],[750,245,70],[818,245,80],[896,245,85]];
var findMember = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isFindMember = true;	
	var infoOffsetY = -3;
	var bW = gbox.getImage('wwg_zjm_05').width;
	var bH = gbox.getImage('wwg_zjm_05').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 15;
	var exitY = backdropY - 2;	
		gbox.addObject(
			{ 
				id : 'findMember',
				group : 'levelMenu_3',
				tileset : 'wwg_zjm_05',
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
		               if(((682 + fOffsetX < lastTouchMoveX) && (lastTouchMoveX < (682 + 16) + fOffsetX)) && ((505 - infoOffsetY < lastTouchMoveY) && (lastTouchMoveY < (505 - infoOffsetY + 14))))//控制向右翻页
		               {
		               	   if(findPage < findPages){
			            	   if(typeof(findCharacter) != "undefined" && findCharacter.length > 0){
									Alliance.getAllAllianceMember(allianceData.allianceId,++findPage,doGetFindAllianceMember);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
		               
		               if(((662 + fOffsetX < lastTouchMoveX) && (lastTouchMoveX < (662 + 16) + fOffsetX)) && ((505 - infoOffsetY < lastTouchMoveY) && (lastTouchMoveY < (505 - infoOffsetY + 14))))//控制向左翻页
		               {
		               	   if(findPage >= 2){
			            	   if(typeof(findCharacter) != "undefined" && findCharacter.length > 0){
			            		   Alliance.getAllAllianceMember(allianceData.allianceId,--findPage,doGetFindAllianceMember);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
					
		               
		               
					 	for(var i=0; i<findCharacter.length; i++){
				 			var formX = findForm[6][0];
				 			var formY = findForm[6][1] - 5 - infoOffsetY;
				 			var formW = findForm[6][2];
				 			var formH = 25;
				 			
			 				var btnW = gbox.getImage('ty_an_06').width;
			 				var btnH = gbox.getImage('ty_an_06').height;
			 				
			 				var btnX = formX + (formW - btnW)/2;
			 				var btnY = formY + (formH - btnH)/2 + (i * 26);
			 				if(charId != findCharacter[i].memberId)
			 				{
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
						        {
									findIndex = i;
									console.log("findIndex ======= " + findIndex);
									popFind(getClickObjectIndex(),lastTouchMoveX,lastTouchMoveY);
									changeMap('cityMenuLayer');	
						        }
			 				}
					 	}
					
						if(((exitX < lastTouchMoveX) && (lastTouchMoveX < (exitX + gbox.getImage('ty_an_17').width))) && ((exitY < lastTouchMoveY) && (lastTouchMoveY < (exitY + gbox.getImage('ty_an_17').height))))
						{
							displayDestroy();
							exit(index);
							waiwuguan(getClickObjectIndex());
							
							if(selectWorM[0]){
								unionCreat(getClickObjectIndex());
							}
							changeMap('cityMenuLayer');
						}else{
							waiwuguan(getClickObjectIndex());
							findMember(getClickObjectIndex());
							changeMap('cityMenuLayer');	
						}
					 	

				},
				blit : function()
				{
					 if(isDrawUI[index] && isFindMember)
					 {
						//联盟成员绘制
					 	 var bgW = gbox.getImage('wwg_zjm_05').width;
						 var bgH = gbox.getImage('wwg_zjm_05').height;
						 gbox.drawImage('wwg_zjm_05',backdropX,backdropY);
						 
					 	 var zzW = gbox.getImage('wwg_zjm_42').width;
						 var zzH = gbox.getImage('wwg_zjm_42').height;
						 var zzX = backdropX + (zzW - bgW)/2 - 13;
						 var zzY = backdropY + (zzH - bgH)/2 - 23;
						 gbox.drawImage('wwg_zjm_42',zzX,zzY);
						 
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var fW = gbox.getTextWidth("联盟成员",14);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - fW)/2;
//						 gbox.drawImage('quzhuTitle',titleX,backdropY);
//						 gbox.drawDanceString("联盟成员", titleX, backdropY,14,'#000000','#FFC861');
						 gbox.drawText("联盟成员", titleX, backdropY,14);
					 	for(var i=0; i<findCharacter.length; i++){
					 		for(var j=0; j<findForm.length; j++){
					 			var fontW = gbox.getTextWidth(findInfo[i][j],14);
					 			var formX = findForm[j][0] - 3;
					 			var formY = findForm[j][1] - 5 - infoOffsetY;
					 			var formW = findForm[j][2];
					 			var formH = 25;
					 			
					 			if(j == findForm.length - 1){
					 				var btnW = gbox.getImage('ty_an_06').width;
					 				var btnH = gbox.getImage('ty_an_06').height;
					 				var btnX = formX + (formW - btnW)/2 + 5;
					 				var btnY = formY + (formH - btnH)/2 + (i * 26);
					 				if(charId != findCharacter[i].memberId)
					 				{
						 				gbox.drawImage('ty_an_08',btnX,btnY);
										if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
								        {
								               gbox.drawImage('ty_an_06',btnX,btnY);
								        }
					 				}else{
					 					gbox.drawImage('ty_an_05',btnX,btnY);
					 				}
						               var strW = gbox.getTextWidth("操作",14);
						               var strX = btnX + (btnW - strW)/2 - 3;
						               var strY = btnY + (btnH - 14)/2;
//						               gbox.drawDanceString("操作", strX, strY,14,'#000000','#FFFFFF');	
						               gbox.drawText("操作", strX, strY,10);
					 			}else{
								 	var dx = formX + (formW - fontW)/2;
									var dy = formY + (formH - 14)/2 + i*formH;
//									gbox.drawDanceString("" + findInfo[i][j], dx, dy,14,'#000000','#FFFFFF');
									gbox.drawText(findInfo[i][j], dx, dy,2);
					 			}

					 		}
					 	}
					 	
						//绘制翻页数字及按钮
						gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + findPage,
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 696,
								y : 507 - infoOffsetY
																
							});
	                    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "/",
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 706,
								y : 507 - infoOffsetY
																
							});
					    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + findPages,
								color : '#ffffff',
								font : 'bold 12px sans-serif',
								x : 716,
								y : 507 - infoOffsetY
																
							});
						if(findPage < findPages)
						  gbox.drawImage("ty_an_24",662 + fOffsetX  ,505 - infoOffsetY);
						if(findPage > 1)
						  gbox.drawImage("ty_an_25",682 + fOffsetX ,505 - infoOffsetY);
					    if(((exitX < touchMoveX) && (touchMoveX < (exitX + gbox.getImage('ty_an_17').width))) && ((exitY < touchMoveY) && (touchMoveY < (exitY + gbox.getImage('ty_an_17').height))))
					    {
					        	gbox.drawImage('ty_an_17',exitX,exitY);					
						}
						else
						{
							    gbox.drawImage('ty_an_18',exitX,exitY);	
						}
						
					 }						
				}
			});
};

var isPopFind = false;
var popFind = function(index,x,y){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isPopFind = true;	
	var popStr = ["申请好友","加为仇人","私  聊","邮  件"];
	var btnW = gbox.getImage('ty_an_99').width;
	var btnH = gbox.getImage('ty_an_99').height;
	
	var bW = gbox.getImage('ty_an_98').width;
	var bH = gbox.getImage('ty_an_98').height * 4;
	var backdropX = x;
	var backdropY = y;
		gbox.addObject(
			{ 
				id : 'popFind',
				group : 'levelMenu_4',
				tileset : 'ty_an_98',
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
					
					isDrawUI[index] = false;
					isPopFind = false;	
				    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
				    
					for(var i=0; i<popStr.length; i++){
                        var btnX = backdropX;
                        var btnY = backdropY + (i*btnH);
						if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
					    {
					        switch(i){
					        case 0://申请好友
					        	console.log("申请好友！！！");
					        	break;
					        case 1://加为仇人
					        	console.log("加为仇人！！！");
					        	break;
					        case 2://私聊
					        	console.log("私聊！！！");
					        	break;
					        case 3://邮件
					        	console.log("邮件！！！");
					        	break;
					        }
					    }
					}
					waiwuguan(getClickObjectIndex());
					if(selectWorM[0]){
						unionCreat(getClickObjectIndex());
					}
					findMember(index);
					changeMap('cityMenuLayer');
					
				},
				blit : function()
				{
					 if(isDrawUI[index] && isPopFind)
					 {
//						 gbox.drawImage('popMember1',backdropX,backdropY);
						 
						 for(var i=0; i<popStr.length; i++){
							var fontW = gbox.getTextWidth(popStr[i],14);
							var btnW = gbox.getImage('ty_an_98').width;
                            var btnX = backdropX;
                            var btnY = backdropY + (i*btnH);
                            
                            gbox.drawImage('ty_an_98',btnX,btnY);
                            
 							if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
					        {
					               gbox.drawImage('ty_an_99',btnX,btnY);
					        }
							var dx = backdropX + (btnW - fontW)/2;
							var dy = backdropY + (btnH - 14)/2 + i*btnH;
//							gbox.drawDanceString("" + popStr[i], dx - 2, dy,14,'#000000','#FFFFFF');
							gbox.drawText(popStr[i], dx - 2, dy,2);
						 }
					 }						
				}
			});
};

var findCharacter = new Array();
var findPage = 0;
var findPages = 0;
var userCharacterAuthoLevel = 0;
var findInfo = new Array();
var qzInfo = undefined;
function doGetFindAllianceMember(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	findPage = data.page;
	findPages = data.pages;
	userCharacterAuthoLevel = data.userCharacterAuthoLevel;
		
	if(findPages > 0 && findPage == 0)
		findPage = 1;
	else 
		findPage = findPage;
	findCharacter = new Array();
	findInfo = new Array();
    if(data.memberCharacter != null){
	    for(var i=0; i<data.memberCharacter.length; i++){
	    	var temp = data.memberCharacter[i];
	    	findCharacter[i] = 
	    	{
	    			memberId:temp.memberId,
	    			authoLevel : temp.authoLevel,
	    			level : temp.level,
	    			maincitylevel : temp.maincitylevel,
	    			name : temp.name,
	    			position : temp.position,
	    			prestige : temp.prestige,
	    			wealth : temp.wealth,
	    	};
	    	findInfo[i] = new Array();
	    	findInfo[i][0] = findCharacter[i].name;
	    	findInfo[i][1] = findCharacter[i].level;
	    	findInfo[i][2] = findCharacter[i].position;
	    	findInfo[i][3] = findCharacter[i].maincitylevel;
	    	findInfo[i][4] = findCharacter[i].prestige;
	    	findInfo[i][5] = findCharacter[i].wealth;
	    }	
    }
    else{
    	findPage = 0;
    	findPages = 0;
    }
    	
    waiwuguan(getClickObjectIndex());
	findMember(getClickObjectIndex());
	changeMap('cityMenuLayer');
}

function doApplyAllianceApplication(data)
{
	if(typeof(data.error) != "undefined")
	{
		waiwuguan(getClickObjectIndex());
		findMember(getClickObjectIndex());
		hitPop(getClickObjectIndex(), "系统提示：" + data.error);
//		alert("系统提示：" + data.error);
		return;
	}
	waiwuguan(getClickObjectIndex());
	findMember(getClickObjectIndex());
	hitPop(getClickObjectIndex(), "申请成功！");
}