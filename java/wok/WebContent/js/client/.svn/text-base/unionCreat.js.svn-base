
var isUnionCreat = false;
var unionCreat = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isUnionCreat = true;	
	var bW = gbox.getImage('wwg_zjm_02').width;
	var bH = gbox.getImage('wwg_zjm_02').height;
	var backdropX = 539;
	var backdropY = 281;
		gbox.addObject(
			{ 
				id : 'unionCreat',
				group : 'levelMenu_2',
				tileset : 'wwg_zjm_02',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
                    if(isRegisterUnion)
                    {
                    	if(findUnionDiv != null)
						{
								  document.body.removeChild(findUnionDiv);  
						          findUnionDiv = null;
						}
	                     if(unionNameDiv == null && !gbox._isIndwellDiv("unionNameDiv","input"))
								{
									var pnX = 630;
									var pnY = 320;
									unionNameDiv = addDivWindowBg(pnX,pnY);
									unionNameDiv.id = 'unionNameDiv';
									document.body.appendChild(unionNameDiv);
									unionNameText = document.createElement("input");
									unionNameText.id = 'unionNameText';
									unionNameText.style.opacity="0.5";
									unionNameText.style.backgroundColor = "#272120";
									unionNameText.style.color = "#ffffff";
									unionNameText.style.width = '270px';
									unionNameText.style.height = '200px';
									unionNameText.style.maxWidth = '148px';
									unionNameText.style.maxHeight = '28px';
									unionNameText.style.background = "transparent";
									unionNameText.style.border = "0px solid";
									unionNameText.style.outline = "none";
									unionNameDiv.appendChild(unionNameText);
				
								}
								if(unionFlagDiv == null && !gbox._isIndwellDiv("unionFlagDiv","input"))
								{
									var pnX = 630;
									var pnY = 376;
									unionFlagDiv = addDivWindowBg(pnX,pnY);
									unionFlagDiv.id = 'unionFlagDiv';
									document.body.appendChild(unionFlagDiv);
									unionFlagText = document.createElement("input");
									unionFlagText.id = 'unionFlagText';
									unionFlagText.style.opacity="0.5";
									unionFlagText.style.backgroundColor = "#272120";
									unionFlagText.style.color = "#ffffff";
									unionFlagText.style.width = '270px';
									unionFlagText.style.height = '200px';
									unionFlagText.style.maxWidth = '148px';
									unionFlagText.style.maxHeight = '28px';
									unionFlagText.style.background = "transparent";
									unionFlagText.style.border = "0px solid";
									unionFlagText.style.outline = "none";
									//unionFlagText.style.
									unionFlagDiv.appendChild(unionFlagText);
				
								}
								if(unionDescribeDiv == null && !gbox._isIndwellDiv("unionDescribeDiv","input"))
								{
									var pnX = 800;
									var pnY = 330;
									unionDescribeDiv = addDivWindowBg(pnX,pnY);
									unionDescribeDiv.id = 'unionDescribeDiv';
									document.body.appendChild(unionDescribeDiv);
									unionDesText = document.createElement("textarea");
									unionDesText.id = 'unionDesText';
									unionDesText.style.opacity="0.5";
									unionDesText.style.backgroundColor = "#272120";
									unionDesText.style.color = "#cca076";
									unionDesText.style.width = '273px';
									unionDesText.style.height = '170px';
//									unionDesText.style.maxWidth = '287px';
//									unionDesText.style.maxHeight = '195px';
									unionDesText.style.background = "transparent";
									unionDesText.style.border = "0px solid";
									unionDesText.style.outline = "none";
									unionDesText.style.resize= 'none';
									unionDescribeDiv.appendChild(unionDesText);
					            }
                    }else{//搜索联盟DIV
		                   	 if(findUnionDiv == null && !gbox._isIndwellDiv("findUnionDiv","input"))
							 {
									var pnX = 590;
									var pnY = 450;
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
									findUnionName.style.maxWidth = '150px';
									findUnionName.style.maxHeight = '20px';
									findUnionName.style.outline = "none";
									findUnionDiv.appendChild(findUnionName);			
							 } 
                    }
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
                    if(selectWorM[0] && !isRegisterUnion)
                    {
                    	adaptiveDiv(findUnionDiv,"findUnionDiv",590);
                    }
					
					adaptiveDiv(unionNameDiv,"unionNameDiv",630);
					adaptiveDiv(unionFlagDiv,"unionFlagDiv",630);
					adaptiveDiv(unionDescribeDiv,"unionDescribeDiv",800);
					/*======================================================*/
				},
				myclick : function()
				{
					//点击创建联盟按钮（中间状态）
					if(isRegisterUnion)
					{
						//点击创建
						if(lastTouchMoveX > 614 && lastTouchMoveX < 700 && lastTouchMoveY > 481 && lastTouchMoveY < 506)
						{
							if(unionDescribeDiv != null)
							{
								  document.body.removeChild(unionDescribeDiv);  
						          unionDescribeDiv = null;
							}
							if(unionNameDiv != null)
							{
								  document.body.removeChild(unionNameDiv);  
						          unionNameDiv = null;
							}
							if(unionFlagDiv != null)
							{
								  document.body.removeChild(unionFlagDiv);  
						          unionFlagDiv = null;
							}
							
							var name = unionNameText.value;
							var banner = unionFlagText.value;
							var introduction = unionDesText.value;
							
							if(name == "" || typeof(name) == "undefined"){
								alert("联盟名称不能为空！");
								return;
							}
							if(banner == "" || typeof(banner) == "undefined"){
								alert("联盟旗帜不能为空！");
								return;
							} 
							if(introduction == "" || typeof(introduction) == "undefined"){
								alert("联盟描述不能为空！");
								return;
							} 
						    
							Alliance.createAlliance(name,banner,introduction,doCreateAlliance);
						    console.log("点击创建");
						}
						else//从创建联盟界面返回（初始创建联盟界面）
						if(((1082 < lastTouchMoveX) && (lastTouchMoveX < (1082  + 25))) && ((292 < lastTouchMoveY) && (lastTouchMoveY < ( 292 + 25))))
						{
							    displayDestroy();
							    exit(getClickObjectIndex());
		                     	if(findUnionDiv == null && !gbox._isIndwellDiv("findUnionDiv","input"))
								{
									var pnX = 590;
									var pnY = 450;
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
									findUnionName.style.maxWidth = '150px';
									findUnionName.style.maxHeight = '20px';
									findUnionName.style.outline = "none";
									findUnionDiv.appendChild(findUnionName);			
								}
							   isRegisterUnion = false;
							   isUnion = true;
							   isTempUnion = true;
						}
					}else{
						//查询联盟
			            if(((754 < lastTouchMoveX) && (lastTouchMoveX < 838)) && ((446 < lastTouchMoveY) && (lastTouchMoveY < 471)))
			            {
							displayDestroy();
							exit(getClickObjectIndex());
			            	Alliance.getAllAllianceByName(findUnionName.value,doGetAllAllianceByName);
			            }else
						
						//转换中间状态
						if(lastTouchMoveX > 857 && lastTouchMoveX < 940 && lastTouchMoveY > 445 && lastTouchMoveY < 470)
						{
							if(findUnionDiv != null)
							{
								  document.body.removeChild(findUnionDiv);  
						          findUnionDiv = null;
							}
							isRegisterUnion = true;
						}else
							
						//君主查询申请，邀请列表
						if(((956 < lastTouchMoveX) && (lastTouchMoveX < 1041)) && ((447 < lastTouchMoveY) && (lastTouchMoveY < 472)))
				        {
							Alliance.getAllcharacterApplication(applyPage,doetAllcharacterApplication);	               
				        }
					}
		            waiwuguan(getClickObjectIndex());
		            unionCreat(getClickObjectIndex());
		            changeMap('cityMenuLayer');	
				},
				blit : function()
				{
					 if(isDrawUI[index] && isUnionCreat)
					 {
						 //进入创建联盟界面
						 if(isRegisterUnion)
						 {
							 var fontW = gbox.getTextWidth("创建",14);
						 	gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'wwg_zjm_03',tile : 0,dx :539,dy :282,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
						    });
						    var backX = 615 + (82 - fontW)/2;
							var backY = 483 + (25 - 14)/2;
							gbox.drawImage('ty_an_10',616,483);
							if(((614 < touchMoveX) && (touchMoveX < 698)) && ((481 < touchMoveY) && (touchMoveY < 505)))
					        {
					               gbox.drawImage('ty_an_09',616,483);               
					        }	
//							gbox.drawDanceString("创建", backX, backY,14,'#000000','#FFFFFF');	
							gbox.drawText("创建", backX, backY,10);
						    var backX = 727 + (50 - fontW)/2;
							var backY = 427 + (25 - 14)/2;
							gbox.drawImage('ty_an_08',727,427);
							if(((727 < touchMoveX) && (touchMoveX < (727 + 82))) && ((428 < touchMoveY) && (touchMoveY < (428 + 25))))
					        {
					               gbox.drawImage('ty_an_06',727,427);         
					        }
//							gbox.drawDanceString("购买", backX, backY,14,'#000000','#FFFFFF');	
							gbox.drawText("购买", backX, backY,10);
//							gbox.drawDanceString("招募令", 648, 434,14,'#000000','#FFFFFF');	
							gbox.drawText("招募令", 648, 434,2);
							   if(((1082 < touchMoveX) && (touchMoveX < (1082  + 25))) && ((292 < touchMoveY) && (touchMoveY < ( 292 + 25))))
							   {
							   	    gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'ty_an_17',
										tile : 0,
										dx : 1082,
										dy : 292,
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
										dx : 1082,
										dy : 292,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
								    });	
							   }
							
						 }else{
							 //查找/创建/申请
								gbox.drawImage('wwg_zjm_02',539,281);
								var fontW = gbox.getTextWidth("查找联盟",14);
								var dx = 755 + (83 - fontW)/2;
							 	var dy = 448 + (24 - 14)/2;
							 	gbox.drawImage('ty_an_10',755,447);				 	
					            if(((754 < touchMoveX) && (touchMoveX < 838)) && ((446 < touchMoveY) && (touchMoveY < 471)))
					            {
					                gbox.drawImage('ty_an_09',755,447);               
					            }					
//					            gbox.drawDanceString("查找联盟", dx, dy,14,'#000000','#FFFFFF');	
					            gbox.drawText("查找联盟", dx, dy,10);
							 	var backX = 855 + (82 - fontW)/2;
							 	var backY = 448 + (25 - 14)/2;
							 	gbox.drawImage('ty_an_10',855,448);		
							 	if(((856 < touchMoveX) && (touchMoveX < 941)) && ((447 < touchMoveY) && (touchMoveY < 472)))
					            {
					               gbox.drawImage('ty_an_09',855,448);               
					            }	
//							 	gbox.drawDanceString("创建联盟", backX, backY,14,'#000000','#FFFFFF');
							 	gbox.drawText("创建联盟", backX, backY,10);
							 	var backX = 958 + (82 - fontW)/2 + 2;
							 	var backY = 448 + (25 - 14)/2;
							 	gbox.drawImage('ty_an_10',958,448);	
							 	if(((956 < touchMoveX) && (touchMoveX < 1041)) && ((447 < touchMoveY) && (touchMoveY < 472)))
					            {
					               gbox.drawImage('ty_an_09',958,448);               
					            }
//							 	gbox.drawDanceString("申请列表", backX, backY,14,'#000000','#FFFFFF');
							 	gbox.drawText("申请列表", backX, backY,10);
						 }						 
					 }						
				}
			});
};

function doCreateAlliance(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
   displayDestroy();
   exit(getClickObjectIndex());
   Alliance.initCharacterAlliance(dataGetAlliance);
}