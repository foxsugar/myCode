var isJiaofang = false;
var skillTypeIndex = 0;
var skillType = new Array();
var jfSubTypeID = 0;
var jiaofang = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJiaofang = true;
	isJuxiange = false;
	isTaiyishu = false;
	isJunjichu = false;
	isJinjie = false;
	isQiansan = false;
	isJunying = false;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('jf_zjm_01').width;
	var bH = gbox.getImage('jf_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;    
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 30;	
		gbox.addObject(
			{ 
				id : 'jiaofang',
				group : 'levelMenu_2',
				tileset : 'jf_zjm_01',
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
					 if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height))){
						displayDestroy();
						isJiaoSkillfangList = false;
                        isJiaofangList = false;
						exit(index);
						curGroup = 'cityMenu';
						enterCityMenu(curGroup);
	                    changeMap('cityMenuLayer');	
					}
		            else if(((lastTouchMoveX > 987) && (lastTouchMoveX < 1070)) && ((lastTouchMoveY > 570) && (lastTouchMoveY<597)))
				    {
							 	BuildingFunction.learnSkill(jf_userHero[jfListIndex].userHeroId,jf_userSkill[jfsListIndex].id,doLearnSkill);
					}
					else{
						commandBuildBtn(lotIndex,"建筑加速");
						jiaofang(getClickObjectIndex());
						//jiaofangSkillList(getClickObjectIndex());
						//jiaofangList(getClickObjectIndex());
						changeMap('cityMenuLayer');
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isJiaofang)
					 {					 	
					    gbox.drawImage("jf_zjm_01",backdropX,backdropY);
					    gbox.drawImage("ty_an_27",backdropX1,backdropY1 + 4);
					    gbox.drawImage('jf_zjm_02',(gbox.getImage('jf_zjm_01').width - gbox.getImage("jf_zjm_02").width)/2 + backdropX,backdropY1);
					    drawBuildCommandBtn();
                        gbox.drawImage('ty_an_10',987,570);	
			            if(((988 < touchMoveX) && (touchMoveX < (988 +  82))) && ((571 < touchMoveY) && (touchMoveY < (571 + 25))))
			            {
			                gbox.drawImage('ty_an_09',987,570);	               
			            } 
			            
			            var strW = gbox.getTextWidth("学 习",14);
			            var strX = 987 + (84 - strW)/2;
			            var strY = 570 + (26 - 14)/2;
			            
						gbox.drawDanceString("学 习", strX, strY,14,'#000000','#FFFFFF');
						 if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						   }
					 }	

				}
			});

		gbox.addObject(
				{ 
					id : 'down',
					group : 'levelMenu_2',
					tileset : 'jf_zjm_01',
					x : 0,
					y : 0,
					frame : 0,
					poly : [ [1054,287], [1054 + 19,287], [1054 + 19,287 + 12],[1054,287 + 12]],
					initialize : function()
					{
					},
					first : function() 
					{
					},
					myclick : function()
					{
							 if(typeof(jf_userHero) != "undefined" && typeof(jf_userHero[jfListIndex]) != "undefined")
							 {
                                 if(!comboboxes['positon_jf'].isOpen)
                                 {
										//下拉框选中方法
										var jfTypeselected = function(){
											if(comboboxes['positon_jf'].selected.id == 0)
											{
												BuildingFunction.getCanLearnSkill(jf_userHero[jfListIndex].userHeroId,doGetCanLearnSkill);
											}
											else if(comboboxes['positon_jf'].selected.id == 1)
											{
												BuildingFunction.getCannotLearnSkill(jf_userHero[jfListIndex].userHeroId,doGetCannotLearnSkill);
											}
											jfSubTypeID = comboboxes['positon_jf'].selected.id - 1;
											jiaofang(index);
							                changeMap('cityMenuLayer');
										};
										//绘制下拉框
										var _index = index;
										comboboxes['positon_jf'].info(
												_index,
												'jfSubTypeBox',
												'levelMenu_3',
												'cityMenuLayer',
												['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
												937,
												302,
												{widthType:3,isScrolling:false}
										);
										comboboxes['positon_jf'].createCombobox(jfTypeselected);										
		    	                  }
		    	                 
							 }						 
							 jiaofang(index);
							 changeMap('cityMenuLayer');
					},
					blit : function()
					{
						 if(isDrawUI[index] && isJiaofang)
						 {  
						 	var jfX = 1054;
						 	var jfY = 280;
						 	gbox.drawImage('ty_tdt_09',jfX,jfY);	
						 	var jfW = gbox.getTextWidth("" + comboboxes['positon_jf'].selected.txt,14);
						    var jfX = 937 + (110 - jfW)/2;
						    gbox.drawString(comboboxes['positon_jf'].selected.txt,jfX, 287,'#FFFFFF',14);
						    gbox.drawTxtRect(buildCommonDesc[lotIndex],450,190,500,70,20,'#ffffff','#000000');
						 }	
					}
				});		
};
//教坊初始化
var jf_userHero = new Array();//全部武将
var jf_userSkill = new Array();//全部技能
function doInitCollege(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	jf_userHero = new Array();
	//1.全部武将
	for(var i=0; i<data.hero.length; i++){
		var temp = data.hero[i];
		jf_userHero[i] = {
				userHeroId:temp.id,//武将ID
				heroName:temp.toolTipInfo.heroName,//武将名
				quality:temp.toolTipInfo.quality,//武将品级
				toolTipInfo:{
					agility : temp.toolTipInfo.agility,
					command : temp.toolTipInfo.command,
					heroForce : temp.toolTipInfo.heroForce,
					heroName : temp.toolTipInfo.heroName,
					heroType : temp.toolTipInfo.heroType,
					level : temp.toolTipInfo.level,
					mp : temp.toolTipInfo.mp,
					mpMax : temp.toolTipInfo.mpMax,
					physique : temp.toolTipInfo.physique,
					quality : temp.toolTipInfo.quality,
					stamina : temp.toolTipInfo.stamina,
					staminaMax : temp.toolTipInfo.staminaMax,
					strategy : temp.toolTipInfo.strategy,	
				}
		};
	}
	
	jf_userSkill = new Array();
	//2.全部技能
	for(var i=0; i<data.skill.length; i++){
		var temp = data.skill[i];
		
		jf_userSkill[i] = {
				id:temp.skillNo,//技能ID
				name:temp.name,//技能名
				imageName:temp.icon,//技能图片名
				description:temp.desc,//技能描述
				needLevel:temp.needHeroLevel,//技能需要武将等级
				needItem:temp.needItem,//需要物品名
				toolTipInfo: 
				{
					coolDown : temp.toolTipInfo.coolDown,
					description : temp.toolTipInfo.description,
					level : temp.toolTipInfo.level,
					name : temp.toolTipInfo.name,
					needVnp : temp.toolTipInfo.needVnp,
				}
		};
		
	}
	skillType[0] = {
		value : 0,
		name : "可学技能"
	};
	skillType[1] = {
		value : 1,
		name : "不可学技能"
	};
    //下拉框数据对象数组
    comboboxes = {};
    var comboboxPositon = new Combobox();
    comboboxPositon.setData(skillType,'value','name');
    comboboxes['positon_jf'] = comboboxPositon;
    
	jiaofang(getClickObjectIndex());
	jiaofangSkillList(getClickObjectIndex());
	jiaofangList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}

//获取已学技能
function doGetLearnedSkill(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	jf_userSkill = new Array();
	//1.已学技能
	for(var i=0; i<data.length; i++){
		var temp = data[i];
		jf_userSkill[i] = {
				id:temp.skillNo,//技能ID
				name:temp.name,//技能名
				imageName:temp.icon,//技能图片名
				description:temp.desc,//技能描述
				needLevel:temp.needHeroLevel,//技能需要武将等级
				needItem:temp.needItem,//需要物品名
				toolTipInfo: 
				{
					coolDown : temp.toolTipInfo.coolDown,
					description : temp.toolTipInfo.description,
					level : temp.toolTipInfo.level,
					name : temp.toolTipInfo.name,
					needVnp : temp.toolTipInfo.needVnp,
				}
		};
	    
	}

	jiaofang(getClickObjectIndex());
	jiaofangSkillList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}

//获取可学技能
function doGetCanLearnSkill(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	jf_userSkill = new Array();
	//1.可学技能
	for(var i=0; i<data.length; i++){
		var temp = data[i];
		jf_userSkill[i] = {
				id:temp.skillNo,//技能ID
				name:temp.name,//技能名
				imageName:temp.icon,//技能图片名
				description:temp.desc,//技能描述
				needLevel:temp.needHeroLevel,//技能需要武将等级
				needItem:temp.needItem,//需要物品名
				toolTipInfo: 
				{
					coolDown : temp.toolTipInfo.coolDown,
					description : temp.toolTipInfo.description,
					level : temp.toolTipInfo.level,
					name : temp.toolTipInfo.name,
					needVnp : temp.toolTipInfo.needVnp,
				}
		};
		
	}

	jiaofang(getClickObjectIndex());
	jiaofangSkillList(getClickObjectIndex());
	//jiaofangList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}
function doLearnSkill(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	jf_userSkill = new Array();
	for(var i=0; i<data.length; i++){
		var temp = data[i];
		jf_userSkill[i] = {
				id:temp.skillNo,//技能ID
				name:temp.name,//技能名
				imageName:temp.icon,//技能图片名
				description:temp.desc,//技能描述
				needLevel:temp.needHeroLevel,//技能需要武将等级
				needItem:temp.needItem,//需要物品名
				toolTipInfo: 
				{
					coolDown : temp.toolTipInfo.coolDown,
					description : temp.toolTipInfo.description,
					level : temp.toolTipInfo.level,
					name : temp.toolTipInfo.name,
					needVnp : temp.toolTipInfo.needVnp,
				}
		};
		
	}

	jiaofang(getClickObjectIndex());
	jiaofangSkillList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}
//不可学技能
function doGetCannotLearnSkill(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	jf_userSkill = new Array();
	//1.不可学技能
	for(var i=0; i<data.length; i++){
		var temp = data[i];
		jf_userSkill[i] = {
				id:temp.skillNo,//技能ID
				name:temp.name,//技能名
				imageName:temp.icon,//技能图片名
				description:temp.desc,//技能描述
				needLevel:temp.needHeroLevel,//技能需要武将等级
				needItem:temp.needItem,//需要物品名
				toolTipInfo: 
				{
					coolDown : temp.toolTipInfo.coolDown,
					description : temp.toolTipInfo.description,
					level : temp.toolTipInfo.level,
					name : temp.toolTipInfo.name,
					needVnp : temp.toolTipInfo.needVnp,
				}
		};
		
	}

	jiaofang(getClickObjectIndex());
	jiaofangSkillList(getClickObjectIndex());
	//jiaofangList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}

var jfListIndex = 0;
var isJiaofangList = false;
var jiaofangList = function(index)//教坊列表
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJiaofangList = true;
	gbox.addObject(
			{ 
				id : 'jfList',
				group : 'levelMenu_2',
				tileset : 'jf_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [360,290], [572,290], [570,600],[360,600]],
				initialize : function()
				{
					if(typeof(jf_userHero) != "undefined"){
						var itemName = new Array();
						var itemQuality = new Array();
							for(var i=0; i< jf_userHero.length; i++){								
								if(typeof(jf_userHero[i]) != "undefined"){
									switch(jf_userHero[i].quality)
								  	{
											case 1:
												itemQuality[i] = '#ffffff';
											break;
											case 2:
												itemQuality[i] = '#08cc1a';
											break;
											case 3:
												itemQuality[i] = '#006cff';
											break;
											case 4:
												itemQuality[i] = '#dc00df';
											break;
											case 5:
												itemQuality[i] = '#e09900';
											break;
											case 6:
												itemQuality[i] = '#ff0000';
											break;
									}
									
									itemName[i] =  "" + jf_userHero[i].heroName;
								}
							}
					}
                    
					var content = new Array(itemName);
		            var listLen = content[0].length;
		            if(listLen < 8){
		            	listLen = 8;
		            }   
		            jfOffsetY = jf_OffsetY = 0;
		            jflist.init( 'jf_zjm_03', 'jf_zjm_04', 'jf_zjm_04','jf_zjm_05',itemQuality,content, 342, 295, 1, listLen, 34, 8, false, -30, 0 );
		            jflist.mouseUpIndex = 0;
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					if(jflist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
					{
						if(Math.abs(jfOffsetY) > 12)
						{
							jfOffsetY=12*(jfOffsetY/Math.abs(jfOffsetY));
						}
						jf_OffsetY = jfOffsetY;
						jf_BeginSlip = true;
						jf_Time = 0;
					}else{
						jflist.radioHandle(jflist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
						jfListIndex = jflist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);						
						skillTypeIndex = 0;
						comboboxes = {};
                        var comboboxPositon = new Combobox();
						comboboxPositon.setData(skillType,'value','name');
                        comboboxes['positon_jf'] = comboboxPositon;
						getCanLearnSkill(jf_userHero[jfListIndex].userHeroId,doGetCanLearnSkill);
					}	
					jiaofang(index);
					changeMap('cityMenuLayer');		
				},
		blit : function()
		{
			if(isDrawUI[index] && isJiaofangList)
			{
				jflist.paint( jf_OffsetY, jf_BeginSlip, jf_Time );
				var jfIndex = jflist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				if(typeof(jf_userHero) != "undefined" && jfIndex != -1)
				{
					var tempOffset = 15;
					var tempH = tooltip.computHero(gbox.getBufferContext(),jf_userHero[jfIndex].toolTipInfo).height;
					if((gbox.getScreenH() - touchMoveY) < tempH)	
					{
						mouseY = gbox.getScreenH() - tempH - 20;
					}
					else
					{
						mouseY = touchMoveY;
					}
					if(touchMoveX !=0)
					  tooltip.drawHero(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,jf_userHero[jfIndex].toolTipInfo);
				}
			}
		}
	 });
};


var jfsItem = new Array();
jfsItem[0] = "jngh";
var jfsListIndex = 0;
var isJiaoSkillfangList = false;
var jiaofangSkillList = function(index)//教坊技能列表
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJiaoSkillfangList = true;
	gbox.addObject(
			{ 
				id : 'jfskillList',
				group : 'levelMenu_2',
				tileset : 'jf_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [555,312], [1085,312], [1085,568],[555,568]],
				initialize : function()
				{
					if(typeof(jf_userSkill) != "undefined"){
						var skillName = new Array();
						var skillDescription = new Array();
						var skillNeedLevel = new Array();
						var skillNeedItem = new Array();
						var itemIcon = new Array();
							for(var i=0; i< jf_userSkill.length; i++){
								if(typeof(jf_userSkill[i]) != "undefined"){
									skillDescription[i] = "" + jf_userSkill[i].description;
									skillNeedLevel[i] = "" + jf_userSkill[i].needLevel;
									skillNeedItem[i] = "" + jf_userSkill[i].needItem;
									
									skillName[i] =  jf_userSkill[i].name + "：" + 
									skillDescription[i] + "需要"+skillNeedItem[i]+
									"，武将"+skillNeedLevel[i]+"级可学。";
									
									if(typeof("" + jf_userSkill[i].imageName) != "undefined" && gbox.getImage("" + jf_userSkill[i].imageName) != null){
//										itemIcon.push("" + jf_userSkill[i].imageName);
										itemIcon.push(jfsItem);
									}else
									    itemIcon.push(jfsItem);
									
								}
							}
					}

					var content = new Array(itemIcon,skillName);
		            var listLen = content[0].length;
		            if(listLen < 4){
		            	listLen = 4;
		            }   
		            jfsOffsetY = jfs_OffsetY = 0;
		            jfslist.init( 'jf_zjm_27', 'jf_zjm_25','jf_zjm_25', 'jf_zjm_26',null,content, 535, 292, 1, listLen, 64, 4, false, -257, 0 );
		            jfslist.isCenter = false;
		            jfslist._isSpace = false;
		            jfslist.itemOffsetX = 7;
		            jfslist.space = 10;
		            jfslist._moduleName = "jiaofang";
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					if(jfslist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
					{
						if(Math.abs(jfsOffsetY) > 12)
						{
							jfsOffsetY=12*(jfsOffsetY/Math.abs(jfsOffsetY));
						}
						jfs_OffsetY = jfsOffsetY;
						jfs_BeginSlip = true;
						jfs_Time = 0;
					}else{
						jfslist.radioHandle(jfslist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
						jfsListIndex = jfslist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
					}	
					jiaofang(index);
					changeMap('cityMenuLayer');	
				},
		blit : function()
		{
			if(isDrawUI[index] && isJiaoSkillfangList)
			{
				jfslist.paint( jfs_OffsetY, jfs_BeginSlip, jfs_Time );
			}
		}
	 });
};