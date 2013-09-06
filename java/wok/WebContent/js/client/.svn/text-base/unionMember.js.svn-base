/*
 * 联盟成员（zjm 2013_7_12）
 */
var mOffsetX = 90;
var isUnionMember = false;
var memberIndex = 0;
var memberForm = [[542,320,98],[640,320,50],[690,320,90],[780,320,70],[850,320,70],[920,320,80],[1000,320,85]];
var unionMember = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionMember = true;	
	var bW = gbox.getImage('wwg_zjm_05').width;
	var bH = gbox.getImage('wwg_zjm_05').height;
	var backdropX = 539;
	var backdropY = 281;
		gbox.addObject(
			{ 
				id : "unionMember",
				group : 'levelMenu_2',
				tileset : 'wwg_zjm_05',
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
		               if(((748 + mOffsetX < lastTouchMoveX) && (lastTouchMoveX < (748 + 16) + mOffsetX)) && ((580 < lastTouchMoveY) && (lastTouchMoveY < (580 + 14))))//控制向右翻页
		               {
		               	   if(memberPage < memberPages){
			            	   if(typeof(memberCharacter) != "undefined" && memberCharacter.length > 0){
									Alliance.getAllAllianceMember(charOfallianceId,++memberPage,doGetAllAllianceMember);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
		               
		               if(((675 + mOffsetX < lastTouchMoveX) && (lastTouchMoveX < (675 + 16) + mOffsetX)) && ((580 < lastTouchMoveY) && (lastTouchMoveY < (580 + 14))))//控制向左翻页
		               {
		               	   if(memberPage >= 2){
			            	   if(typeof(memberCharacter) != "undefined" && memberCharacter.length > 0){
			               		   Alliance.getAllAllianceMember(charOfallianceId,--memberPage,doGetAllAllianceMember);
			            	   }else
			            		   alert("没有成员数据！");
		               	   }
		               }
					
		               
		               
					 	for(var i=0; i<memberCharacter.length; i++){
				 			var formX = memberForm[6][0];
				 			var formY = memberForm[6][1] - 5;
				 			var formW = memberForm[6][2];
				 			var formH = 25;
				 			
			 				var btnW = gbox.getImage('ty_an_06').width;
			 				var btnH = gbox.getImage('ty_an_06').height;
			 				
			 				var btnX = formX + (formW - btnW)/2;
			 				var btnY = formY + (formH - btnH)/2 + (i * 26);
			 				if( charId != memberCharacter[i].memberId)
//			 						&& charAuthoLevel >= memberCharacter[i].authoLevel)
			 				{
								if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
						        {
									memberIndex = i;
									popMember(getClickObjectIndex(),lastTouchMoveX,lastTouchMoveY);
									changeMap('cityMenuLayer');	
						        }
			 				}
					 	}
					 	
					 	for(var i=0; i<memberCharacter.length; i++){
				 			var formX = memberForm[0][0];
				 			var formY = memberForm[0][1] - 5;
				 			var formW = memberForm[0][2];
				 			var formH = 25;
				 			
			 				var btnW = gbox.getImage('ty_an_06').width;
			 				var btnH = gbox.getImage('ty_an_06').height;
			 				
			 				var btnX = formX + (formW - btnW)/2;
			 				var btnY = formY + (formH - btnH)/2 + (i * 26);
							if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
					        {
								User.getCharacterById(memberCharacter[i].memberId,doCharacterByInfo);	
								changeMap('cityMenuLayer');	
					        }
					 	}
					waiwuguan(getClickObjectIndex());
					unionMember(getClickObjectIndex());
					changeMap('cityMenuLayer');	
				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionMember)
					 {
						//联盟成员绘制
					 	gbox.drawImage('wwg_zjm_05',539,281);
					 	
					 	for(var i=0; i<memberCharacter.length; i++){
					 		for(var j=0; j<memberForm.length; j++){
					 			var fontW = gbox.getTextWidth(memberInfo[i][j],14);
					 			var formX = memberForm[j][0];
					 			var formY = memberForm[j][1] - 5;
					 			var formW = memberForm[j][2];
					 			var formH = 26;
					 			
					 			if(j == memberForm.length - 1){
					 				var btnW = gbox.getImage('ty_an_06').width;
					 				var btnH = gbox.getImage('ty_an_06').height;
					 				var btnX = formX + (formW - btnW)/2;
					 				var btnY = formY + (formH - btnH)/2 + (i * 26);
					 				if(charId != memberCharacter[i].memberId )
//					 						&& charAuthoLevel >= memberCharacter[i].authoLevel)
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
						               var strX = btnX + (btnW - strW)/2 - 2;
						               var strY = btnY + (btnH - 14)/2;
//						               gbox.drawDanceString("操作", strX, strY,14,'#000000','#FFFFFF');	
						               gbox.drawText("操作", strX, strY,10);
					 			}else{
								 	var dx = formX + (formW - fontW)/2;
									var dy = formY + (formH - 14)/2 + i*formH;
//									gbox.drawDanceString("" + memberInfo[i][j], dx, dy,14,'#000000','#FFFFFF');
									gbox.drawText("" + memberInfo[i][j], dx, dy,2);
					 			}

					 		}
					 	}
					 	
						//绘制翻页数字及按钮
						gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + memberPage,
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 708 + mOffsetX,
								y : 582
																
							});
	                    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "/",
								color : '#FFFFFF',
								font : 'bold 12px sans-serif',
								x : 719 + mOffsetX,
								y : 582
																
							});
					    gbox.blitSystemText(gbox.getBufferContext(),
							{
								text : "" + memberPages,
								color : '#ffffff',
								font : 'bold 12px sans-serif',
								x : 729 + mOffsetX,
								y : 582
																
							});
						if(memberPage < memberPages)
						  gbox.drawImage("ty_an_24",758 + mOffsetX,580);
						if(memberPage > 1)
						  gbox.drawImage("ty_an_25",675 + mOffsetX,580);
					 	
					 }						
				}
			});
};

var isMemberFindInfo = false;
var memberFindInfo = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isMemberFindInfo = true;
	var bW = gbox.getImage('ckjz_zjm_01').width;
	var bH = gbox.getImage('ckjz_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 20;
	var exitY = backdropY - 6;		    
		gbox.addObject(
			{ 
				id : 'memberFindInfo',
				group : 'levelMenu_3',
				tileset : 'ckjz_zjm_01',
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
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23)){
						displayDestroy();
						exit(index);
						waiwuguan(getClickObjectIndex());
						unionMember(getClickObjectIndex());
						changeMap('cityMenuLayer');
					}
					else{
						unionMember(getClickObjectIndex());
						memberFindInfo(getClickObjectIndex());
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isMemberFindInfo)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'ckjz_zjm_01',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });
					    var fontW = gbox.getTextWidth("加为好友",14);
                        var btnX = 496;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY); 
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("加为好友", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("加为好友", backX, backY,10);
                        var btnX = 585;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);   
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("联盟邀请", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("联盟邀请", backX, backY,10);
                        var btnX = 675;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("发动进攻", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("发动进攻", backX, backY,10);
                        var btnX = 765;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);   
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("发送信息", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("发送信息", backX, backY,10);
                        var btnX = 857;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						gbox.drawImage('ty_an_10',btnX,btnY);  
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
//						gbox.drawDanceString("标为仇人", backX, backY,14,'#000000','#FFFFFF');
						gbox.drawText("标为仇人", backX, backY,10);
				        if(typeof(kingInfo) != "undefined" && typeof(kingData) != "undefined"){
					        for(var i=0; i<4; i++){
					        	for(var j=0; j<2; j++){
//					        		gbox.drawString("" + kingInfo[i][j],572 + (j * 168), 252 + (i*33),'#000000',16);
					        		gbox.drawText("" + kingInfo[i][j],572 + (j * 168), 252 + (i*33),2);
					        	}
					        }
					        
					        
					        gbox.drawImage(kingData.image,848,268); 
					        
//					        gbox.drawTxtRect(kingData.description,500,396,410,70,16,'#ffffff','#000000');
					        gbox.drawLineBreakText(kingData.description,500,396,6,280);
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
					 }						
				}
			});

};
//查看成员信息
function doCharacterByInfo(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	var temp = data;
	kingData = undefined;
	kingData = {
			    militaryStrength:temp.militaryStrength,//武力
			    countryName:temp.countryName,//国家名称
			    abilityPoint:temp.abilityPoint,//潜能点
			    coordinate:temp.coordinate,//联盟
			    internalAffairs:temp.internalAffairs,//谋略
			    image:temp.image,//头像ICON
			    experienceLimit:temp.experienceLimit,//经验上限
			    cityExperienceLimit:temp.cityExperienceLimit,//城市经验上限
			    vipLevel:temp.vipLevel,//VIP等级
			    cityLevel:temp.cityLevel,//城市等级
			    allianceName:temp.allianceName,//武魂名字
			    level:temp.level,//君主等级
			    description:temp.description,//君主描述
			    name:temp.name,//君主名字
			    reputation:temp.reputation,//声望
			    cityExperience:temp.cityExperience,//城市经验
			    experience:temp.experience,//君主经验
			    ranking: temp.ranking,//排名
               };
	
	if(typeof(kingData) != "undefined"){
		kingInfo = new Array(new Array());
		kingInfo = [
		            ["" + kingData.name,"" + kingData.level],
		            ["" + kingData.cityLevel,"" + kingData.countryName],
		            ["" + kingData.allianceName,"" + kingData.ranking],
		            ["" + kingData.coordinate,"" + kingData.cityExperience]
		];
	}
	
	unionMember(getClickObjectIndex());
	memberFindInfo(getClickObjectIndex());
	changeMap('cityMenuLayer');
}


var isPopMember = false;
var popMember = function(index,x,y){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isPopMember = true;	
	var popStr = ["任  免","驱  逐","派  遣","私  聊","邮  件"];
	var btnW = gbox.getImage('ty_an_99').width;
	var btnH = gbox.getImage('ty_an_99').height;
	
	var bW = gbox.getImage('ty_an_98').width;
	var bH = gbox.getImage('ty_an_98').height * 5;
	var backdropX = x;
	var backdropY = y;
		gbox.addObject(
			{ 
				id : 'popMember',
				group : 'levelMenu_3',
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
//					displayDestroy();
//					exit(index);
//					enterCityMenu(curGroup);
//                    changeMap('cityMenuLayer');	
//                    console.log("1111111111111111");
					isDrawUI[index] = false;
					isPopMember = false;	
				    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					for(var i=0; i<popStr.length; i++){
                        var btnX = backdropX;
                        var btnY = backdropY + (i*btnH);
						if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
					    {
					        switch(i){
					        case 0://任免
					        	 if(charAuthoLevel > memberCharacter[memberIndex].authoLevel)
					 			 {
					        		Alliance.updatedPost(memberCharacter[memberIndex].memberId,doUpdatedPost);
		   			 				console.log("任免！！！");
					 			 }
					        	break;
					        case 1://驱逐
					        	if(charAuthoLevel > memberCharacter[memberIndex].authoLevel)
					 			 {
			 						qzInfo = undefined;
			 						qzInfo = "成员名称：" + memberCharacter[memberIndex].name 
			 						         + "，等级：" + memberCharacter[memberIndex].level
			 						         +"，职位：" + memberCharacter[memberIndex].position
			 						         +"，城池等级：" + memberCharacter[memberIndex].maincitylevel
			 						         +"，需要财富：" + memberCharacter[memberIndex].wealth +  ".";
					        		
		   			 				waiwuguan(getClickObjectIndex());
		   			 				unionMember(getClickObjectIndex());
		   							expel(getClickObjectIndex(),x,y);
		   							changeMap('cityMenuLayer');
		   							console.log("驱逐！！！");
					 			 }
					        	break;
					        case 2://派遣
					        	console.log("派遣！！！");
					        	console.log("关闭当前窗口！！！");
					        	
					        	//关闭当前窗口
//					        	displayDestroy();
//					        	exit(index);
					        	//dispatchOpen(memberCharacter[memberIndex]);
					        	break;
					        case 3://私聊
					        	console.log("私聊！！！");
					        	break;
					        case 4://邮件
					        	console.log("邮件！！！");
					        	break;
					        }
					    }
					}

				},
				blit : function()
				{
					 if(isDrawUI[index] && isPopMember)
					 {
						 
						 for(var i=0; i<popStr.length; i++){
							gbox.drawImage('ty_an_98',backdropX,backdropY + (i * gbox.getImage('ty_an_98').height) );
							var fontW = gbox.getTextWidth(popStr[i],14);
							var fontW = gbox.getTextWidth(popStr[i],14);
							var btnW = gbox.getImage('ty_an_98').width;
                            var btnX = backdropX;
                            var btnY = backdropY + (i*btnH);
                            
                            if(charAuthoLevel > memberCharacter[memberIndex].authoLevel)
				 			 {
	 							if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
						        {
						               gbox.drawImage('ty_an_99',btnX,btnY);
						        }
				 			 }else{
				 				 if(i > 1){
			 						if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
								    {
								       gbox.drawImage('ty_an_99',btnX,btnY);
								    }
				 				 }else{
				 					gbox.drawImage('ty_an_121',btnX,btnY);
				 				 }
				 			 }

							
							var dx = backdropX + (btnW - fontW)/2;
							var dy = backdropY + (btnH - 14)/2 + i*btnH;
//							gbox.drawDanceString("" + popStr[i], dx, dy,14,'#000000','#FFFFFF');
							gbox.drawText(popStr[i], dx, dy,2);
						 }
					 }						
				}
			});
};

var appointmentIndex = 0;
var isAppointment = false;
var appointment = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isAppointment = true;
	var form = [[503,276,78],[590,266,240]];
	var bW = gbox.getImage('wwg_zjm_27').width;
	var bH = gbox.getImage('wwg_zjm_27').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 23;
	var exitY = backdropY - 8;	
		gbox.addObject(
			{ 
				id : 'appointment',
				group : 'levelMenu_4',
				tileset : 'wwg_zjm_27',
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
					

					for(var i=0; i<staticAlliancePosition.length; i++){
						 if(i != 0){
							 var btnW = gbox.getImage('ty_an_08').width;
							 var btnH = gbox.getImage('ty_an_08').height;
								var btnX = 856 + (76 - btnW)/2;
								var btnY = 276 + (35 - btnH)/2 + (i*36);
						        if(userCharacterAuthoLevel > staticAlliancePosition[i].authoLevel)
						        {
									if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
								    {
										appointmentIndex = i;
										isDrawUI[index] = false;
										isAppointment = false;	
									    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
										Alliance.appointment(memberCharacter[memberIndex].memberId,staticAlliancePosition[i].positionNo,doAppointment);
									    waiwuguan(getClickObjectIndex());
									    unionMember(getClickObjectIndex());
										changeMap('cityMenuLayer');
										console.log("确认任免！");
								        return;
								    }
						        }
						 }

					 }
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23))
					{
						displayDestroy();
						exit(index);
						waiwuguan(getClickObjectIndex());
						unionMember(getClickObjectIndex());
	                    changeMap('cityMenuLayer');	
					}else{
						unionMember(getClickObjectIndex());
						appointment(getClickObjectIndex());
						changeMap('cityMenuLayer');	
					}

				},
				blit : function()
				{
					 if(isDrawUI[index] && isAppointment)
					 {
						 gbox.drawImage('wwg_zjm_27',backdropX,backdropY);
//						 gbox.drawDanceString(memberName, 588, 234,14,'#000000','#FFFFFF');
						 gbox.drawText(memberName, 588, 234,2);
//						 gbox.drawDanceString(memberPosition, 815, 234,14,'#000000','#FFFFFF');
						 gbox.drawText(memberPosition, 815, 234,2);
						 var fontW = gbox.getTextWidth("任免",14);
						 var btnW = gbox.getImage('ty_an_08').width;
						 var btnH = gbox.getImage('ty_an_08').height;
						 
						if(typeof(staticAlliancePosition) != 'undefined')
						for(var i=0; i<staticAlliancePosition.length; i++){
							 var strW = gbox.getTextWidth(allianceInfo[i][0],12);
							 var formX = form[0][0];
							 var formY = form[0][1];
							 var formW = form[0][2];
							 var formH = 36;
							 var dx = formX + (formW - strW)/2;
						     var dy = formY + (formH - 14)/2 + (i*36);
//							 gbox.drawDanceString(allianceInfo[i][0], dx, dy,14,'#000000','#FFFFFF');
							 gbox.drawText(allianceInfo[i][0], dx, dy,2);
//							 gbox._drawTxtRect(allianceInfo[i][1],form[1][0],form[1][1] + (i*36),form[1][2],36,12,'#ffffff','#000000');
							 gbox.drawLineBreakText(allianceInfo[i][1],form[1][0],form[1][1] + (i*36),form[1][2],36,6,280);
							 if(i != 0){
									var btnX = 856 + (76 - btnW)/2;
									var btnY = 276 + (35 - btnH)/2 + (i*36);
									gbox.drawImage('ty_an_08',btnX,btnY);
									var backX = btnX + (btnW - fontW)/2 - 3;
							        var backY = btnY + (btnH - 14)/2;
							        if(userCharacterAuthoLevel > staticAlliancePosition[i].authoLevel)
							        {
										if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
									    {
									        gbox.drawImage('ty_an_06',btnX,btnY);		               
									    }
							        }else
							        	gbox.drawImage('ty_an_05',btnX,btnY);	

//									gbox.drawDanceString("任免", backX, backY,14,'#000000','#FFFFFF');	
									gbox.drawText("任免", backX, backY,10);
							 }

						 }
						 
						   if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
						   {
							   gbox.drawImage('ty_an_17',exitX - 2,exitY + 10);	
						   }
						   else
						   {
							   gbox.drawImage('ty_an_18',exitX - 2,exitY + 10);	
						   }
					 }						
				}
			});
};

var isExpel = false;
var expel = function(index,x,y){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isExpel = true;
	var expelOffsetY = 25;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'expel',
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
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + expelOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + expelOffsetY  + 25))))
			        {
						isDrawUI[index] = false;
						isExpel = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("驱逐确认！");
					    waiwuguan(getClickObjectIndex());
						unionMember(getClickObjectIndex());
						changeMap('cityMenuLayer');
					    Alliance.deleteAllianceMember(memberCharacter[memberIndex].memberId,doDeleteAllianceMember);
			        }else
					if(((btnX1 < lastTouchMoveX) && (lastTouchMoveX < (btnX1 + 82))) && ((btnY1 + expelOffsetY  < lastTouchMoveY) && (lastTouchMoveY < (btnY1 + expelOffsetY  + 25))))
			        {
						isDrawUI[index] = false;
						isExpel = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    waiwuguan(getClickObjectIndex());
						unionMember(getClickObjectIndex());
						changeMap('cityMenuLayer');
			        }else{
						unionMember(getClickObjectIndex());
						expel(getClickObjectIndex(),x,y);
						changeMap('cityMenuLayer');
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isExpel)
					 {
						 var bgW = gbox.getImage('ty_an_55').width;
						 var bgH = gbox.getImage('ty_an_55').height;
						 gbox.drawImage('ty_an_55',backdropX,backdropY);
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - 45)/2;
//						 gbox.drawImage('quzhuTitle',titleX,backdropY);
//						 gbox.drawDanceString("驱  逐", titleX, backdropY,14,'#000000','#FFC861');
						 gbox.drawText("驱  逐", titleX, backdropY,14);
						    var fontW = gbox.getTextWidth("确认",14);
                            var btnX = backdropX + 20;
						    var btnY = backdropY + bgH/2 + expelOffsetY ;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;	
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);			               
					        }	
							gbox.drawText("确认", backX, backY,10);
                            var btnX1 = backdropX + bgW - 102;
						    var btnY1 = backdropY + bgH/2 + expelOffsetY;
						    gbox.drawImage('ty_an_10',btnX1,btnY1);
						    var backX = btnX1 + (82 - fontW)/2;
							var backY = btnY1 + (25 - 14)/2;	
							if(((btnX1 < touchMoveX) && (touchMoveX < (btnX1 + 82))) && ((btnY1 < touchMoveY) && (touchMoveY < (btnY1 + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX1,btnY1);			               
					        }
							gbox.drawText("取消", backX, backY,10);
							if(typeof(qzInfo) != 'undefined'){
								gbox.drawLineBreakText(qzInfo,626,320,6,280);
//								gbox._drawTxtRect(qzInfo,626,320,180,50,8,'#ffffff','#000000');
							}
					 }						
				}
			});
};

var memberCharacter = new Array();
var memberPage = 0;
var memberPages = 0;
var userCharacterAuthoLevel = 0;
var memberInfo = new Array();
var qzInfo = undefined;
function doGetAllAllianceMember(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	memberPage = data.page;
	memberPages = data.pages;
	userCharacterAuthoLevel = data.userCharacterAuthoLevel;
		
	if(memberPages > 0 && memberPage == 0)
		memberPage = 1;
	else 
		memberPage = memberPage;
	memberCharacter = new Array();
	memberInfo = new Array();
    if(data.memberCharacter != null){
	    for(var i=0; i<data.memberCharacter.length; i++){
	    	var temp = data.memberCharacter[i];
	    	memberCharacter[i] = 
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
	    	memberInfo[i] = new Array();
	    	memberInfo[i][0] = memberCharacter[i].name;
	    	memberInfo[i][1] = memberCharacter[i].level;
	    	memberInfo[i][2] = memberCharacter[i].position;
	    	memberInfo[i][3] = memberCharacter[i].maincitylevel;
	    	memberInfo[i][4] = memberCharacter[i].prestige;
	    	memberInfo[i][5] = memberCharacter[i].wealth;
	    }	
    }
    else{
    	memberPage = 0;
    	memberPages = 0;
    }
    	
    waiwuguan(getClickObjectIndex());
	unionMember(getClickObjectIndex());
	changeMap('cityMenuLayer');
}
var memberName;
var memberPosition;
var userCharacterAuthoLevel;
var staticAlliancePosition = new Array();
var allianceInfo = new Array();
function doUpdatedPost(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	memberName = data.memberName;
	memberPosition = data.memberPosition;
	userCharacterAuthoLevel = data.userCharacterAuthoLevel;
	staticAlliancePosition = new Array();
	for(var i=0; i<data.staticAlliancePosition.length; i++){
		var tmp = data.staticAlliancePosition[i];
		staticAlliancePosition[i] = {
				authoLevel:tmp.authoLevel,
				positionDesc:tmp.positionDesc,
				positionName:tmp.positionName,
				positionNo:tmp.positionNo,
		};
		allianceInfo[i] = new Array();
		allianceInfo[i][0] = staticAlliancePosition[i].positionName;
		allianceInfo[i][1] = staticAlliancePosition[i].positionDesc;
	}
	
	waiwuguan(getClickObjectIndex());
	unionMember(getClickObjectIndex());
	appointment(getClickObjectIndex());
	changeMap('cityMenuLayer');		
}

function doAppointment(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
	Alliance.getAllAllianceMember(charOfallianceId,memberPage,doGetAllAllianceMember);
		
}


function doDeleteAllianceMember(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	
	Alliance.getAllAllianceMember(allianceData.allianceId,memberPage,doGetAllAllianceMember);
}

//派遣界面打开
var dispatchOpen = function (obj){
	//关闭当前窗口
//	displayDestroy();
//	exit(index);
//	displayDestroy();
//	exit(getClickObjectIndex());
	
	var closeFn = function(){
		enterCityMenu('cityMenu');
	};
	var openData = {
			id: obj.memberId,
			name: obj.name,
			type: 1,
			typeLevel: -1,
			needTime: 0,
			isTargetChange: false,
			obj: obj,
			close: closeFn,
			layer: 'cityMenuLayer',
			groupBottom: 'cityMenu'
	};
	//获取出征所需时间
	battle.getNeedBattleTime(obj.memberId,function(data){
		if(typeof(data.error) != "undefined"){
			alert("系统提示：" + data.error);
			return;
		}
		openData.needTime = data;
		warpthMenuClass.handlers.battleOpen(openData);
	});
};