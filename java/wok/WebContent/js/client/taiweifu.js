
var isTaiweifu = false;
var taiweifu = function(){
	gbox.setRenderOrder(['taiweifuScreen']);
	var bW = gbox.getImage('taiweifuBG').width;
	var bH = gbox.getImage('taiweifuBG').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 30;		
	com_layer = 'taiweifuScreen_Layer';
	com_group = group_src = 'taiweifuScreen';
		gbox.addObject(
			{ 
				id : 'chengxiang',
				group : 'taiweifuScreen',
				tileset : 'taiweifuBG',
				x : 0,
				y : 0,
				anim : chengxiang,
				action : null,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					AnimMgr.changeAction(this, this.anim.action["chengxiang"],true);
				},
				first : function() 
				{

				},
				myclick : function()
				{
		            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((10 < lastTouchMoveY) && (lastTouchMoveY < (10 + 53))))
		            {
						if(buildList[lotIndex][1] == 'state_empty' && 
						buildList[lotIndex][13] == 'state_demolition_empty'){
							//升级
							buildUpgrade(lotIndex);
							isJiuguan = false;
							isJunying = false;
							isWjZhaomu = false;
							isWarpthGarget = false;
		                    envBtnCtr = false;
		                    suburb.closeSuburbUi(docloseSuburbUi);
							if(divBg != null)
							{
								input1.style.display="none"; 
								input2.style.display="none"; 
							}
		                    if(findFriendDiv != null)
							{
								  document.body.removeChild(findFriendDiv);  
						          findFriendDiv = null;
							}
							if(addFriendDiv != null)
							{
								  document.body.removeChild(addFriendDiv);  
						          addFriendDiv = null;
							} 
		                    cityChangeView[0] = true;
		                    cityChangeView[1] = false;
		                    cityChangeView[2] = false;
							socialMessageAlertCtr = false;
							queryUnionAlertCtr = false;
							friendListCtr = false;
							socialDraw = false;
							displayDestroy();
							exit(getClickObjectIndex());
							envBtnCtr = false;
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							com_layer = 'cityMenuLayer';
							com_group = group_src = 'cityMenu';
					    }else
					    	alert("状态异常：不能升级！");

		            }else
		            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((63 < lastTouchMoveY) && (lastTouchMoveY < (63 + 53))))
		            {
						if(buildList[lotIndex][1] == 'state_empty' && 
						buildList[lotIndex][13] == 'state_demolition_empty'){
							//拆除
							buildDemolition(lotIndex);
							isJiuguan = false;
							isJunying = false;
							isWjZhaomu = false;
							isWarpthGarget = false;
//							displayDestroy();
//							exit(getClickObjectIndex());
//							enterCityMenu(curGroup);
//		                    changeMap('cityMenuLayer');	
		                    envBtnCtr = false;
		                    suburb.closeSuburbUi(docloseSuburbUi);
							if(divBg != null)
							{
								input1.style.display="none"; 
								input2.style.display="none"; 
							}
		                    if(findFriendDiv != null)
							{
								  document.body.removeChild(findFriendDiv);  
						          findFriendDiv = null;
							}
							if(addFriendDiv != null)
							{
								  document.body.removeChild(addFriendDiv);  
						          addFriendDiv = null;
							} 
		                    cityChangeView[0] = true;
		                    cityChangeView[1] = false;
		                    cityChangeView[2] = false;
							socialMessageAlertCtr = false;
							queryUnionAlertCtr = false;
							friendListCtr = false;
							socialDraw = false;
							displayDestroy();
							exit(getClickObjectIndex());
							envBtnCtr = false;
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							com_layer = 'cityMenuLayer';
							com_group = group_src = 'cityMenu';
					    }else
					    	alert("状态异常：不能拆除！");	   

		            }else
		            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((117 < lastTouchMoveY) && (lastTouchMoveY < (117 + 53))))
		            {
		            	//退出
	                    envBtnCtr = false;
	                    suburb.closeSuburbUi(docloseSuburbUi);
						if(divBg != null)
						{
							input1.style.display="none"; 
							input2.style.display="none"; 
						}
	                    if(findFriendDiv != null)
						{
							  document.body.removeChild(findFriendDiv);  
					          findFriendDiv = null;
						}
						if(addFriendDiv != null)
						{
							  document.body.removeChild(addFriendDiv);  
					          addFriendDiv = null;
						} 
	                    cityChangeView[0] = true;
	                    cityChangeView[1] = false;
	                    cityChangeView[2] = false;
	                    queryUnionAlertCtr = false;
						socialMessageAlertCtr = false;
						friendListCtr = false;
						socialDraw = false;
						displayDestroy();
						exit(getClickObjectIndex());
						envBtnCtr = false;
						enterCityMenu('cityMenu');
						changeMap('cityMenuLayer');	
						enterCityMenu('cityMenu');
						changeMap('cityMenuLayer');	
						com_layer = 'cityMenuLayer';
						com_group = group_src = 'cityMenu';
		            }
				},
				blit : function()
				{
					//console.log("isDrawUI["+index+"] ========== " + isDrawUI[index]);
					
//					 if(isDrawUI[index] && isTaiweifu)
//					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'taiweifuBG',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });
					 	
					    gbox.blitTile(gbox.getBufferContext(),
								{
											tileset : 'ty_an_18',
											tile : 0,
											dx :exitX,
											dy :exitY,
											fliph : this.fliph,
											flipv : this.flipv,
											camera : this.camera,
											alpha : 1.0
						});	 	
					    
						if(((touchMoveX > 517) && (touchMoveX < 606)) && ((touchMoveY > 397) && (touchMoveY<537)))//装备弹出框	
						 {
						 		this.anim.image = "chengxiang";
								var data = {
												tile : this.frame,
												dx : 740,
												dy : 375,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0,
												anim : this.anim
								};
								AnimMgr.draw(gbox.getBufferContext(), data);
							  	this.frame = help.decideFrame(this.action);	
						 }	
						 else
						 {
						 		this.anim.image = "chengxiang";
								var data = {
												tile : 15,
												dx : 740,
												dy : 375,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0,
												anim : this.anim
								};
								
								AnimMgr.draw(gbox.getBufferContext(), data);
							  	this.frame = help.decideFrame(this.action);	
						 }
			
					    
						gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_32',
									tile : 0,
									dx : shineiOffset + 6,
									dy :0,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
								});
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 14) && (touchMoveY<53)))
						{
							 gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_33',
									tile : 0,
									dx :shineiOffset + 8,
									dy :9,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
								});	
						}
						gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'twf_shengji',
									tile : 0,
									dx :shineiOffset + 39,
									dy :24,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
								});	
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 66) && (touchMoveY<105)))
						{
							 gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_33',
									tile : 0,
									dx :shineiOffset + 8,
									dy :61,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
								});	
						}
						gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'twf_chaichu',
									tile : 0,
									dx :shineiOffset + 39,
									dy :77,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
								});	
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 118) && (touchMoveY<163)))
						{
							 gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_34',
									tile : 0,
									dx :shineiOffset + 5,
									dy :116,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
								});	
						}
						gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_36',
									tile : 0,
									dx :shineiOffset + 44,
									dy :131,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
								});	
				}
			});
		
		
		
		gbox.addObject(
				{ 
					id : 'jiangjun',
					group : 'taiweifuScreen',
					tileset : 'taiweifuBG',
					x : 0,
					y : 0,
					anim : jiangjun,
					action : null,
					frame : 0,
					poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
					initialize : function()
					{
						AnimMgr.changeAction(this, this.anim.action["jiangjun"],true);
					},
					first : function() 
					{

					},
					myclick : function()
					{
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((10 < lastTouchMoveY) && (lastTouchMoveY < (10 + 53))))
			            {
							if(buildList[lotIndex][1] == 'state_empty' && 
							buildList[lotIndex][13] == 'state_demolition_empty'){
								//升级
								buildUpgrade(lotIndex);
								isJiuguan = false;
								isJunying = false;
								isWjZhaomu = false;
								isWarpthGarget = false;
//								displayDestroy();
//								exit(getClickObjectIndex());
//								enterCityMenu(curGroup);
//			                    changeMap('cityMenuLayer');	
			                    envBtnCtr = false;
			                    suburb.closeSuburbUi(docloseSuburbUi);
								if(divBg != null)
								{
									input1.style.display="none"; 
									input2.style.display="none"; 
								}
			                    if(findFriendDiv != null)
								{
									  document.body.removeChild(findFriendDiv);  
							          findFriendDiv = null;
								}
								if(addFriendDiv != null)
								{
									  document.body.removeChild(addFriendDiv);  
							          addFriendDiv = null;
								} 
			                    cityChangeView[0] = true;
			                    cityChangeView[1] = false;
			                    cityChangeView[2] = false;
								socialMessageAlertCtr = false;
								queryUnionAlertCtr = false;
								friendListCtr = false;
								socialDraw = false;
								displayDestroy();
								exit(getClickObjectIndex());
								envBtnCtr = false;
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								com_layer = 'cityMenuLayer';
								com_group = group_src = 'cityMenu';
						    }else
						    	alert("状态异常：不能升级！");

			            }else
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((63 < lastTouchMoveY) && (lastTouchMoveY < (63 + 53))))
			            {
							if(buildList[lotIndex][1] == 'state_empty' && 
							buildList[lotIndex][13] == 'state_demolition_empty'){
								//拆除
								buildDemolition(lotIndex);
								isJiuguan = false;
								isJunying = false;
								isWjZhaomu = false;
								isWarpthGarget = false;
//								displayDestroy();
//								exit(getClickObjectIndex());
//								enterCityMenu(curGroup);
//			                    changeMap('cityMenuLayer');	
			                    envBtnCtr = false;
			                    suburb.closeSuburbUi(docloseSuburbUi);
								if(divBg != null)
								{
									input1.style.display="none"; 
									input2.style.display="none"; 
								}
			                    if(findFriendDiv != null)
								{
									  document.body.removeChild(findFriendDiv);  
							          findFriendDiv = null;
								}
								if(addFriendDiv != null)
								{
									  document.body.removeChild(addFriendDiv);  
							          addFriendDiv = null;
								} 
			                    cityChangeView[0] = true;
			                    cityChangeView[1] = false;
			                    cityChangeView[2] = false;
								socialMessageAlertCtr = false;
								queryUnionAlertCtr = false;
								friendListCtr = false;
								socialDraw = false;
								displayDestroy();
								exit(getClickObjectIndex());
								envBtnCtr = false;
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								com_layer = 'cityMenuLayer';
								com_group = group_src = 'cityMenu';
						    }else
						    	alert("状态异常：不能拆除！");	   

			            }else
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((117 < lastTouchMoveY) && (lastTouchMoveY < (117 + 53))))
			            {
			            	//退出
		                    envBtnCtr = false;
		                    suburb.closeSuburbUi(docloseSuburbUi);
							if(divBg != null)
							{
								input1.style.display="none"; 
								input2.style.display="none"; 
							}
		                    if(findFriendDiv != null)
							{
								  document.body.removeChild(findFriendDiv);  
						          findFriendDiv = null;
							}
							if(addFriendDiv != null)
							{
								  document.body.removeChild(addFriendDiv);  
						          addFriendDiv = null;
							} 
		                    cityChangeView[0] = true;
		                    cityChangeView[1] = false;
		                    cityChangeView[2] = false;
		                    queryUnionAlertCtr = false;
							socialMessageAlertCtr = false;
							friendListCtr = false;
							socialDraw = false;
							displayDestroy();
							exit(getClickObjectIndex());
							envBtnCtr = false;
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							com_layer = 'cityMenuLayer';
							com_group = group_src = 'cityMenu';
			            }
					},
					blit : function()
					{
						//console.log("isDrawUI["+index+"] ========== " + isDrawUI[index]);
						
//						 if(isDrawUI[index] && isTaiweifu)
//						 {
//						 	gbox.blitTile(gbox.getBufferContext(),
//							{
//								tileset : 'taiweifuBG',
//								tile : 0,
//								dx :backdropX,
//								dy :backdropY,
//								fliph : this.fliph,
//								flipv : this.flipv,
//								camera : this.camera,
//								alpha : 1.0
//						     });
						 	
						    gbox.blitTile(gbox.getBufferContext(),
									{
												tileset : 'ty_an_18',
												tile : 0,
												dx :exitX,
												dy :exitY,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0
							});	 	
						    
							if(((touchMoveX > 517) && (touchMoveX < 606)) && ((touchMoveY > 397) && (touchMoveY<537)))//装备弹出框	
							 {
							 		this.anim.image = "jiangjun";
									var data = {
													tile : this.frame,
													dx : 570,
													dy : 285,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0,
													anim : this.anim
									};
									AnimMgr.draw(gbox.getBufferContext(), data);
								  	this.frame = help.decideFrame(this.action);	
							 }	
							 else
							 {
							 		this.anim.image = "jiangjun";
									var data = {
													tile : 14,
													dx : 570,
													dy : 285,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0,
													anim : this.anim
									};
									
									AnimMgr.draw(gbox.getBufferContext(), data);
								  	this.frame = help.decideFrame(this.action);	
							 }
				
						    
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_32',
										tile : 0,
										dx : shineiOffset + 6,
										dy :0,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 14) && (touchMoveY<53)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_33',
										tile : 0,
										dx :shineiOffset + 8,
										dy :9,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'twf_shengji',
										tile : 0,
										dx :shineiOffset + 39,
										dy :24,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 66) && (touchMoveY<105)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_33',
										tile : 0,
										dx :shineiOffset + 8,
										dy :61,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'twf_chaichu',
										tile : 0,
										dx :shineiOffset + 39,
										dy :77,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 118) && (touchMoveY<163)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_34',
										tile : 0,
										dx :shineiOffset + 5,
										dy :116,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_36',
										tile : 0,
										dx :shineiOffset + 44,
										dy :131,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
					}
				});
		
		//=======================3
		gbox.addObject(
				{ 
					id : 'wenguan',
					group : 'taiweifuScreen',
					tileset : 'taiweifuBG',
					x : 0,
					y : 0,
					anim : wenguan,
					action : null,
					frame : 0,
					poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
					initialize : function()
					{
						AnimMgr.changeAction(this, this.anim.action["wenguan"],true);
					},
					first : function() 
					{

					},
					myclick : function()
					{
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((10 < lastTouchMoveY) && (lastTouchMoveY < (10 + 53))))
			            {
							if(buildList[lotIndex][1] == 'state_empty' && 
							buildList[lotIndex][13] == 'state_demolition_empty'){
								//升级
								buildUpgrade(lotIndex);
								isJiuguan = false;
								isJunying = false;
								isWjZhaomu = false;
								isWarpthGarget = false;
//								displayDestroy();
//								exit(getClickObjectIndex());
//								enterCityMenu(curGroup);
//			                    changeMap('cityMenuLayer');	
			                    envBtnCtr = false;
			                    suburb.closeSuburbUi(docloseSuburbUi);
								if(divBg != null)
								{
									input1.style.display="none"; 
									input2.style.display="none"; 
								}
			                    if(findFriendDiv != null)
								{
									  document.body.removeChild(findFriendDiv);  
							          findFriendDiv = null;
								}
								if(addFriendDiv != null)
								{
									  document.body.removeChild(addFriendDiv);  
							          addFriendDiv = null;
								} 
			                    cityChangeView[0] = true;
			                    cityChangeView[1] = false;
			                    cityChangeView[2] = false;
								socialMessageAlertCtr = false;
								queryUnionAlertCtr = false;
								friendListCtr = false;
								socialDraw = false;
								displayDestroy();
								exit(getClickObjectIndex());
								envBtnCtr = false;
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								com_layer = 'cityMenuLayer';
								com_group = group_src = 'cityMenu';
						    }else
						    	alert("状态异常：不能升级！");

			            }else
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((63 < lastTouchMoveY) && (lastTouchMoveY < (63 + 53))))
			            {
							if(buildList[lotIndex][1] == 'state_empty' && 
							buildList[lotIndex][13] == 'state_demolition_empty'){
								//拆除
								buildDemolition(lotIndex);
								isJiuguan = false;
								isJunying = false;
								isWjZhaomu = false;
								isWarpthGarget = false;
//								displayDestroy();
//								exit(getClickObjectIndex());
//								enterCityMenu(curGroup);
//			                    changeMap('cityMenuLayer');	
			                    envBtnCtr = false;
			                    suburb.closeSuburbUi(docloseSuburbUi);
								if(divBg != null)
								{
									input1.style.display="none"; 
									input2.style.display="none"; 
								}
			                    if(findFriendDiv != null)
								{
									  document.body.removeChild(findFriendDiv);  
							          findFriendDiv = null;
								}
								if(addFriendDiv != null)
								{
									  document.body.removeChild(addFriendDiv);  
							          addFriendDiv = null;
								} 
			                    cityChangeView[0] = true;
			                    cityChangeView[1] = false;
			                    cityChangeView[2] = false;
								socialMessageAlertCtr = false;
								queryUnionAlertCtr = false;
								friendListCtr = false;
								socialDraw = false;
								displayDestroy();
								exit(getClickObjectIndex());
								envBtnCtr = false;
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								com_layer = 'cityMenuLayer';
								com_group = group_src = 'cityMenu';
						    }else
						    	alert("状态异常：不能拆除！");	   

			            }else
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((117 < lastTouchMoveY) && (lastTouchMoveY < (117 + 53))))
			            {
			            	//退出
		                    envBtnCtr = false;
		                    suburb.closeSuburbUi(docloseSuburbUi);
							if(divBg != null)
							{
								input1.style.display="none"; 
								input2.style.display="none"; 
							}
		                    if(findFriendDiv != null)
							{
								  document.body.removeChild(findFriendDiv);  
						          findFriendDiv = null;
							}
							if(addFriendDiv != null)
							{
								  document.body.removeChild(addFriendDiv);  
						          addFriendDiv = null;
							} 
		                    cityChangeView[0] = true;
		                    cityChangeView[1] = false;
		                    cityChangeView[2] = false;
		                    queryUnionAlertCtr = false;
							socialMessageAlertCtr = false;
							friendListCtr = false;
							socialDraw = false;
							displayDestroy();
							exit(getClickObjectIndex());
							envBtnCtr = false;
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							com_layer = 'cityMenuLayer';
							com_group = group_src = 'cityMenu';
			            }
					},
					blit : function()
					{
						//console.log("isDrawUI["+index+"] ========== " + isDrawUI[index]);
						
//						 if(isDrawUI[index] && isTaiweifu)
//						 {
//						 	gbox.blitTile(gbox.getBufferContext(),
//							{
//								tileset : 'taiweifuBG',
//								tile : 0,
//								dx :backdropX,
//								dy :backdropY,
//								fliph : this.fliph,
//								flipv : this.flipv,
//								camera : this.camera,
//								alpha : 1.0
//						     });
						 	
						    gbox.blitTile(gbox.getBufferContext(),
									{
												tileset : 'ty_an_18',
												tile : 0,
												dx :exitX,
												dy :exitY,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0
							});	 	
						    
							if(((touchMoveX > 517) && (touchMoveX < 606)) && ((touchMoveY > 397) && (touchMoveY<537)))//装备弹出框	
							 {
							 		this.anim.image = "wenguan";
									var data = {
													tile : this.frame,
													dx : 580,
													dy : 485,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0,
													anim : this.anim
									};
									AnimMgr.draw(gbox.getBufferContext(), data);
								  	this.frame = help.decideFrame(this.action);	
						 }	
							 else
							 {
							 		this.anim.image = "wenguan";
									var data = {
													tile : 1,
													dx : 580,
													dy : 485,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0,
													anim : this.anim
									};
									
									AnimMgr.draw(gbox.getBufferContext(), data);
								  	this.frame = help.decideFrame(this.action);	
							 }
				
						    
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_32',
										tile : 0,
										dx : shineiOffset + 6,
										dy :0,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 14) && (touchMoveY<53)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_33',
										tile : 0,
										dx :shineiOffset + 8,
										dy :9,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'twf_shengji',
										tile : 0,
										dx :shineiOffset + 39,
										dy :24,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 66) && (touchMoveY<105)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_33',
										tile : 0,
										dx :shineiOffset + 8,
										dy :61,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'twf_chaichu',
										tile : 0,
										dx :shineiOffset + 39,
										dy :77,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 118) && (touchMoveY<163)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_34',
										tile : 0,
										dx :shineiOffset + 5,
										dy :116,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_36',
										tile : 0,
										dx :shineiOffset + 44,
										dy :131,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
					}
				});
		
		
		
		gbox.addObject(
				{ 
					id : 'wujiang',
					group : 'taiweifuScreen',
					tileset : 'taiweifuBG',
					x : 0,
					y : 0,
					anim : wujiang,
					action : null,
					frame : 0,
					poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
					initialize : function()
					{
						AnimMgr.changeAction(this, this.anim.action["wujiang"],true);
					},
					first : function() 
					{

					},
					myclick : function()
					{
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((10 < lastTouchMoveY) && (lastTouchMoveY < (10 + 53))))
			            {
							if(buildList[lotIndex][1] == 'state_empty' && 
							buildList[lotIndex][13] == 'state_demolition_empty'){
								//升级
								buildUpgrade(lotIndex);
								isJiuguan = false;
								isJunying = false;
								isWjZhaomu = false;
								isWarpthGarget = false;
//								displayDestroy();
//								exit(getClickObjectIndex());
//								enterCityMenu(curGroup);
//			                    changeMap('cityMenuLayer');	
			                    envBtnCtr = false;
			                    suburb.closeSuburbUi(docloseSuburbUi);
								if(divBg != null)
								{
									input1.style.display="none"; 
									input2.style.display="none"; 
								}
			                    if(findFriendDiv != null)
								{
									  document.body.removeChild(findFriendDiv);  
							          findFriendDiv = null;
								}
								if(addFriendDiv != null)
								{
									  document.body.removeChild(addFriendDiv);  
							          addFriendDiv = null;
								} 
			                    cityChangeView[0] = true;
			                    cityChangeView[1] = false;
			                    cityChangeView[2] = false;
								socialMessageAlertCtr = false;
								queryUnionAlertCtr = false;
								friendListCtr = false;
								socialDraw = false;
								displayDestroy();
								exit(getClickObjectIndex());
								envBtnCtr = false;
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								com_layer = 'cityMenuLayer';
								com_group = group_src = 'cityMenu';
						    }else
						    	alert("状态异常：不能升级！");

			            }else
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((63 < lastTouchMoveY) && (lastTouchMoveY < (63 + 53))))
			            {
							if(buildList[lotIndex][1] == 'state_empty' && 
							buildList[lotIndex][13] == 'state_demolition_empty'){
								//拆除
								buildDemolition(lotIndex);
								isJiuguan = false;
								isJunying = false;
								isWjZhaomu = false;
								isWarpthGarget = false;
//								displayDestroy();
//								exit(getClickObjectIndex());
//								enterCityMenu(curGroup);
//			                    changeMap('cityMenuLayer');	
			                    envBtnCtr = false;
			                    suburb.closeSuburbUi(docloseSuburbUi);
								if(divBg != null)
								{
									input1.style.display="none"; 
									input2.style.display="none"; 
								}
			                    if(findFriendDiv != null)
								{
									  document.body.removeChild(findFriendDiv);  
							          findFriendDiv = null;
								}
								if(addFriendDiv != null)
								{
									  document.body.removeChild(addFriendDiv);  
							          addFriendDiv = null;
								} 
			                    cityChangeView[0] = true;
			                    cityChangeView[1] = false;
			                    cityChangeView[2] = false;
								socialMessageAlertCtr = false;
								queryUnionAlertCtr = false;
								friendListCtr = false;
								socialDraw = false;
								displayDestroy();
								exit(getClickObjectIndex());
								envBtnCtr = false;
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								com_layer = 'cityMenuLayer';
								com_group = group_src = 'cityMenu';
						    }else
						    	alert("状态异常：不能拆除！");	   

			            }else
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((117 < lastTouchMoveY) && (lastTouchMoveY < (117 + 53))))
			            {
			            	//退出
		                    envBtnCtr = false;
		                    suburb.closeSuburbUi(docloseSuburbUi);
							if(divBg != null)
							{
								input1.style.display="none"; 
								input2.style.display="none"; 
							}
		                    if(findFriendDiv != null)
							{
								  document.body.removeChild(findFriendDiv);  
						          findFriendDiv = null;
							}
							if(addFriendDiv != null)
							{
								  document.body.removeChild(addFriendDiv);  
						          addFriendDiv = null;
							} 
		                    cityChangeView[0] = true;
		                    cityChangeView[1] = false;
		                    cityChangeView[2] = false;
		                    queryUnionAlertCtr = false;
							socialMessageAlertCtr = false;
							friendListCtr = false;
							socialDraw = false;
							displayDestroy();
							exit(getClickObjectIndex());
							envBtnCtr = false;
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							com_layer = 'cityMenuLayer';
							com_group = group_src = 'cityMenu';
			            }
					},
					blit : function()
					{
						//console.log("isDrawUI["+index+"] ========== " + isDrawUI[index]);
						
//						 if(isDrawUI[index] && isTaiweifu)
//						 {
//						 	gbox.blitTile(gbox.getBufferContext(),
//							{
//								tileset : 'taiweifuBG',
//								tile : 0,
//								dx :backdropX,
//								dy :backdropY,
//								fliph : this.fliph,
//								flipv : this.flipv,
//								camera : this.camera,
//								alpha : 1.0
//						     });
						 	
						    gbox.blitTile(gbox.getBufferContext(),
									{
												tileset : 'ty_an_18',
												tile : 0,
												dx :exitX,
												dy :exitY,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0
							});	 	
						    
							if(((touchMoveX > 517) && (touchMoveX < 606)) && ((touchMoveY > 397) && (touchMoveY<537)))//装备弹出框	
							 {
							 		this.anim.image = "wujiang";
									var data = {
													tile : this.frame,
													dx : 405,
													dy : 375,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0,
													anim : this.anim
									};
									AnimMgr.draw(gbox.getBufferContext(), data);
								  	this.frame = help.decideFrame(this.action);	
						 }	
							 else
							 {
							 		this.anim.image = "wujiang";
									var data = {
													tile : 0,
													dx : 405,
													dy : 375,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0,
													anim : this.anim
									};
									
									AnimMgr.draw(gbox.getBufferContext(), data);
								  	this.frame = help.decideFrame(this.action);	
							 }
				
						    
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_32',
										tile : 0,
										dx : shineiOffset + 6,
										dy :0,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 14) && (touchMoveY<53)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_33',
										tile : 0,
										dx :shineiOffset + 8,
										dy :9,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'twf_shengji',
										tile : 0,
										dx :shineiOffset + 39,
										dy :24,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 66) && (touchMoveY<105)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_33',
										tile : 0,
										dx :shineiOffset + 8,
										dy :61,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'twf_chaichu',
										tile : 0,
										dx :shineiOffset + 39,
										dy :77,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 118) && (touchMoveY<163)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_34',
										tile : 0,
										dx :shineiOffset + 5,
										dy :116,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_36',
										tile : 0,
										dx :shineiOffset + 44,
										dy :131,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
					}
				});
		
		gbox.addObject(
				{ 
					id : 'nanwanjia2',
					group : 'taiweifuScreen',
					tileset : 'taiweifuBG',
					x : 0,
					y : 0,
					anim : nanwanjia2,
					action : null,
					frame : 0,
					poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
					initialize : function()
					{
						AnimMgr.changeAction(this, this.anim.action["nanwanjia2"],true);
					},
					first : function() 
					{

					},
					myclick : function()
					{
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((10 < lastTouchMoveY) && (lastTouchMoveY < (10 + 53))))
			            {
							if(buildList[lotIndex][1] == 'state_empty' && 
							buildList[lotIndex][13] == 'state_demolition_empty'){
								//升级
								buildUpgrade(lotIndex);
								isJiuguan = false;
								isJunying = false;
								isWjZhaomu = false;
								isWarpthGarget = false;
//								displayDestroy();
//								exit(getClickObjectIndex());
//								enterCityMenu(curGroup);
//			                    changeMap('cityMenuLayer');	
			                    envBtnCtr = false;
			                    suburb.closeSuburbUi(docloseSuburbUi);
								if(divBg != null)
								{
									input1.style.display="none"; 
									input2.style.display="none"; 
								}
			                    if(findFriendDiv != null)
								{
									  document.body.removeChild(findFriendDiv);  
							          findFriendDiv = null;
								}
								if(addFriendDiv != null)
								{
									  document.body.removeChild(addFriendDiv);  
							          addFriendDiv = null;
								} 
			                    cityChangeView[0] = true;
			                    cityChangeView[1] = false;
			                    cityChangeView[2] = false;
								socialMessageAlertCtr = false;
								queryUnionAlertCtr = false;
								friendListCtr = false;
								socialDraw = false;
								displayDestroy();
								exit(getClickObjectIndex());
								envBtnCtr = false;
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								com_layer = 'cityMenuLayer';
								com_group = group_src = 'cityMenu';
						    }else
						    	alert("状态异常：不能升级！");

			            }else
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((63 < lastTouchMoveY) && (lastTouchMoveY < (63 + 53))))
			            {
							if(buildList[lotIndex][1] == 'state_empty' && 
							buildList[lotIndex][13] == 'state_demolition_empty'){
								//拆除
								buildDemolition(lotIndex);
								isJiuguan = false;
								isJunying = false;
								isWjZhaomu = false;
								isWarpthGarget = false;
//								displayDestroy();
//								exit(getClickObjectIndex());
//								enterCityMenu(curGroup);
//			                    changeMap('cityMenuLayer');	
			                    envBtnCtr = false;
			                    suburb.closeSuburbUi(docloseSuburbUi);
								if(divBg != null)
								{
									input1.style.display="none"; 
									input2.style.display="none"; 
								}
			                    if(findFriendDiv != null)
								{
									  document.body.removeChild(findFriendDiv);  
							          findFriendDiv = null;
								}
								if(addFriendDiv != null)
								{
									  document.body.removeChild(addFriendDiv);  
							          addFriendDiv = null;
								} 
			                    cityChangeView[0] = true;
			                    cityChangeView[1] = false;
			                    cityChangeView[2] = false;
								socialMessageAlertCtr = false;
								queryUnionAlertCtr = false;
								friendListCtr = false;
								socialDraw = false;
								displayDestroy();
								exit(getClickObjectIndex());
								envBtnCtr = false;
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								enterCityMenu('cityMenu');
								changeMap('cityMenuLayer');	
								com_layer = 'cityMenuLayer';
								com_group = group_src = 'cityMenu';
						    }else
						    	alert("状态异常：不能拆除！");	   

			            }else
			            if(((0 + shineiOffset < lastTouchMoveX) && (lastTouchMoveX < (0 + shineiOffset + 139))) && ((117 < lastTouchMoveY) && (lastTouchMoveY < (117 + 53))))
			            {
			            	//退出
		                    envBtnCtr = false;
		                    suburb.closeSuburbUi(docloseSuburbUi);
							if(divBg != null)
							{
								input1.style.display="none"; 
								input2.style.display="none"; 
							}
		                    if(findFriendDiv != null)
							{
								  document.body.removeChild(findFriendDiv);  
						          findFriendDiv = null;
							}
							if(addFriendDiv != null)
							{
								  document.body.removeChild(addFriendDiv);  
						          addFriendDiv = null;
							} 
		                    cityChangeView[0] = true;
		                    cityChangeView[1] = false;
		                    cityChangeView[2] = false;
		                    queryUnionAlertCtr = false;
							socialMessageAlertCtr = false;
							friendListCtr = false;
							socialDraw = false;
							displayDestroy();
							exit(getClickObjectIndex());
							envBtnCtr = false;
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							enterCityMenu('cityMenu');
							changeMap('cityMenuLayer');	
							com_layer = 'cityMenuLayer';
							com_group = group_src = 'cityMenu';
			            }
					},
					blit : function()
					{
						//console.log("isDrawUI["+index+"] ========== " + isDrawUI[index]);
						
//						 if(isDrawUI[index] && isTaiweifu)
//						 {
//						 	gbox.blitTile(gbox.getBufferContext(),
//							{
//								tileset : 'taiweifuBG',
//								tile : 0,
//								dx :backdropX,
//								dy :backdropY,
//								fliph : this.fliph,
//								flipv : this.flipv,
//								camera : this.camera,
//								alpha : 1.0
//						     });
						 	
						    gbox.blitTile(gbox.getBufferContext(),
									{
												tileset : 'ty_an_18',
												tile : 0,
												dx :exitX,
												dy :exitY,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0
							});	 	
						    
							if(((touchMoveX > 517) && (touchMoveX < 606)) && ((touchMoveY > 397) && (touchMoveY<537)))//装备弹出框	
							 {
							 		this.anim.image = "nanwanjia2";
									var data = {
													tile : this.frame,
													dx : 880,
													dy : 145,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0,
													anim : this.anim
									};
									AnimMgr.draw(gbox.getBufferContext(), data);
								  	this.frame = help.decideFrame(this.action);	
						 }	
							 else
							 {
							 		this.anim.image = "nanwanjia2";
									var data = {
													tile : 21,
													dx : 880,
													dy : 145,
													fliph : this.fliph,
													flipv : this.flipv,
													camera : this.camera,
													alpha : 1.0,
													anim : this.anim
									};
									
									AnimMgr.draw(gbox.getBufferContext(), data);
								  	this.frame = help.decideFrame(this.action);	
							 }
				
						    
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_32',
										tile : 0,
										dx : shineiOffset + 6,
										dy :0,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 14) && (touchMoveY<53)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_33',
										tile : 0,
										dx :shineiOffset + 8,
										dy :9,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'twf_shengji',
										tile : 0,
										dx :shineiOffset + 39,
										dy :24,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 66) && (touchMoveY<105)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_33',
										tile : 0,
										dx :shineiOffset + 8,
										dy :61,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'twf_chaichu',
										tile : 0,
										dx :shineiOffset + 39,
										dy :77,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 118) && (touchMoveY<163)))
							{
								 gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_34',
										tile : 0,
										dx :shineiOffset + 5,
										dy :116,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
							}
							gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_36',
										tile : 0,
										dx :shineiOffset + 44,
										dy :131,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
					}
				});
		
	
		
		
		
		
		 //绘制公有按钮
		drawCommonBtn('levelMenu_1','taiweifuScreen','taiweifuScreen_Layer');
		
	
		 

		
};