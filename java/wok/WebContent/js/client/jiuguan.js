var isJiuguan = false;
var jiuguan = function(){
	gbox.setRenderOrder(['jiuguanScreen']);
//	gbox.setRenderOrder(['jiuguanScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	//	isDrawUI[index] = true;
	isJiuguan = true;
	isJunying = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('wjzm_zjm_05').width;
	var bH = gbox.getImage('wjzm_zjm_05').height;      
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	com_layer = 'jiuguanScreen_Layer';
	com_group = group_src = 'jiuguanScreen';
	gbox.addObject(
			{ 
				id : 'jiuguan',
				group : 'jiuguanScreen',
				tileset : 'wjzm_zjm_05',
				x : 0,
				y : 0,
				anim : lb_jiuguan,
				action : null,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{

					AnimMgr.changeAction(this, this.anim.action["lb_jiuguan"],true);					
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
							curGroup = 'cityMenu';
							envBtnCtr = false;
							//enterCityMenu('cityMenu');
							//changeMap('cityMenuLayer');	
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
							curGroup = 'cityMenu';
							envBtnCtr = false;
							//enterCityMenu('cityMenu');
							//changeMap('cityMenuLayer');	
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
						socialMessageAlertCtr = false;
						queryUnionAlertCtr = false;
						friendListCtr = false;
						socialDraw = false;
						displayDestroy();
						exit(getClickObjectIndex());
						curGroup = 'cityMenu';
						envBtnCtr = false;
						//enterCityMenu('cityMenu');
						//changeMap('cityMenuLayer');	
						enterCityMenu('cityMenu');
						changeMap('cityMenuLayer');	
						com_layer = 'cityMenuLayer';
						com_group = group_src = 'cityMenu';
		            }
                    else{
						
					    if(((lastTouchMoveX > 517) && (lastTouchMoveX < 606)) && ((lastTouchMoveY > 397) && (lastTouchMoveY<537)))
					    {
                      	   for(var i =0; i<selectStatus.length;i++)
                    	     selectStatus[i] = false;
                      	   BuildingFunction.initTavern(doTavernInfo);
                    	   wujiangZhaomuItem(getClickObjectIndex());
		                   changeMap('jiuguanScreen_Layer');                            
					    }

					}
				},
				blit : function()
				{
                        gbox.drawImage("wjzm_zjm_05",backdropX,backdropY);
						if(((touchMoveX > 517) && (touchMoveX < 606)) && ((touchMoveY > 397) && (touchMoveY<537)))//装备弹出框	
						 {
						 		this.anim.image = "wjzm_zjm_07";
								var data = {
												tile : this.frame,
												dx : 470,
												dy : 385,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0,
												
												anim : this.anim
								};
								AnimMgr.draw(gbox.getBufferContext(), data);//TODO
							  	this.frame = help.decideFrame(this.action);	
						 }	
						 else
						 {
							gbox.drawImage("wjzm_zjm_06",493,377);
						 }	 					    
					     gbox.drawImage("ty_an_32",shineiOffset+6,0);
						
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 14) && (touchMoveY<53)))
						{
							 gbox.drawImage("ty_an_33",shineiOffset + 8,9);
						}
						gbox.drawImage("ty_an_39",shineiOffset + 44,24);
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 66) && (touchMoveY<105)))
						{
							gbox.drawImage("ty_an_33",shineiOffset + 8,61);
						}
						gbox.drawImage("ty_an_40",shineiOffset + 44,77);
						if(((touchMoveX > 11 + shineiOffset) && (touchMoveX < 143 + shineiOffset)) && ((touchMoveY > 118) && (touchMoveY<163)))
						{
							 gbox.drawImage("ty_an_34",shineiOffset + 5,116);
						}
						gbox.drawImage("ty_an_36",shineiOffset + 44,131);
//					 }						
				}
			});
		 //绘制公有按钮
		 drawCommonBtn('levelMenu_1','jiuguanScreen','jiuguanScreen_Layer');
}