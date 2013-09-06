var isJuxiange = false;
var jxgNum = 1;
var jxgPage = 0;
var jsgRankCtr = false;
var itemAmount = 0;
var commissionRank = new Array();
var juxiangelistSpace = [84,69,89,89,72];
var appointError;
var itemName = new Array();
var itemRankNo = new Array();
var itemNumber = new Array();
var itemNumberLimit = new Array();
var itemValue = new Array();
function doappointUserHero(data)
{
	if(typeof(data.error) != "undefined")
	{
		appointError = data.error;
		jsgAlert(getClickObjectIndex());
	    changeMap('cityMenuLayer');		
		return;
	}
	jsgRankCtr = false;
	jsgAlertCtr = false;
	BuildingFunction.initCentrestage(doInitCentrestage);
}
function dorelieveHero(data)
{
	BuildingFunction.initCentrestage(doInitCentrestage);
}
var juxiange2ListCtr = false;
function dogetAllRank(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	itemAmount = data.itemAmount;
	for(var i = 0; i< data.rank.length; i++)
	{
		commissionRank[i] = {
				rankNo:data.rank[i].rankNo,//官职ID
				isAppointed:data.rank[i].isAppointed,//是否已册封此官职
				item:data.rank[i].item,//是否需要物品
				name:data.rank[i].name,//官职名
				heroExploit:data.rank[i].exploit,//军功
				commandNumber:data.rank[i].command//统率力		
	      }
	}
	juxiange2ListCtr = true;
	jsgRank(getClickObjectIndex());
	changeMap('cityMenuLayer');		
}
var jsgAlert = function(index)
{
	jsgAlertCtr = true;
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	
    gbox.addObject(
			{ 
				id : 'jsgAlert',
				group : 'levelMenu_4',
				tileset : 'ty_an_55',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [581,311], [856,311], [856,428],[581,428]],
				initialize : function()
				{
				},
				first : function() 
				{
				},
				myclick : function()
				{	
				   if(((693 < lastTouchMoveX) && (lastTouchMoveX < 744)) && ((383 < lastTouchMoveY) && (lastTouchMoveY < 414)))
				   {
				   	    jsgAlertCtr = false;
				   	    exit(getClickObjectIndex());
                        jsgRank(getClickObjectIndex());
						changeMap('cityMenuLayer');
				   }	
				   else
				   {
				   	   jsgAlert(getClickObjectIndex());
				       changeMap('cityMenuLayer');	
				   }			
				  					
				},
				blit : function()
				{
					 if(isDrawUI[index] && jsgAlertCtr)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'ty_an_55',
							tile : 0,
							dx :backdropX,
							dy :backdropY,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });  
					     var tempText = studyLineDesc(gbox.getBufferContext(),appointError,140);
				         for(var i= 0;i<tempText.length;i++)
				           {
						       gbox.drawDanceString(tempText[i],617, 341 + i*20,16, '#000000','#ffffff');
					       }
					     var bW1 = gbox.getImage('ty_an_06').width;
						 var bH1 = gbox.getImage('ty_an_06').height;
						 var backdropX1 = (bW - bW1)/2 + backdropX;
						 var backdropY1 = (bH - bH1)/2 + backdropY;	
						 gbox.drawImage("ty_an_06",backdropX1,backdropY1 + bH/4);
						 var txtLen = gbox.getBufferContext().measureText("返回").width;
				         var txtX = backdropX1 + (bW1 - txtLen)/2 - 3;	
				         var txtY = backdropY1 + bH/4 + 6;
				         if(((693 < touchMoveX) && (touchMoveX < 744)) && ((385 < touchMoveY) && (touchMoveY < 410)))
				         {
				         	gbox.drawImage("ty_an_07",backdropX1,backdropY1 + bH/4);
				         }
						 gbox.drawDanceString("返回",txtX, txtY,14, '#000000','#ffffff');		  
					 }						
				}
			});

};
var jsgRank = function(index)
{
	jsgRankCtr = true;
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	var bW = gbox.getImage('jxg_zjm_11').width;
	var bH = gbox.getImage('jxg_zjm_11').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	
    gbox.addObject(
			{ 
				id : 'jsgRank',
				group : 'levelMenu_3',
				tileset : 'jxg_zjm_11',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [508,236], [930,236], [930,501],[508,501]],
				initialize : function()
				{
				},
				first : function() 
				{
				},
				myclick : function()
				{
					jsgAlertCtr = false;
                    for(var i = 0; i<6; i++)
                    {
                    	if(((871 < lastTouchMoveX) && (lastTouchMoveX < 922)) && (((292 + i*27) < lastTouchMoveY) && (lastTouchMoveY < (315 + i*27))))
						{
							 if(commissionRank[i].isAppointed)
							 {
	                            jsgRank(getClickObjectIndex());
						        changeMap('cityMenuLayer');
							    									
							 }	
							 else
							 {
							 	BuildingFunction.appointUserHero(userHero[jxg2ListIndex].userHeroId,commissionRank[i].rankNo,doappointUserHero);
								juxiange(getClickObjectIndex());
								juxiangeList(getClickObjectIndex());
								juxiange2List(getClickObjectIndex());
								changeMap('cityMenuLayer');
							 	
							 }					
						}
                    }
                    if(((840 < lastTouchMoveX) && (lastTouchMoveX < 926)) && ((471 < lastTouchMoveY) && (lastTouchMoveY < 500)))
					{
							jsgRankCtr = false;
							
							exit(index);
						    juxiange(getClickObjectIndex());
						    juxiangeList(getClickObjectIndex());
						    juxiange2List(getClickObjectIndex());
						    changeMap('cityMenuLayer');	

					}
					else
					{
						jsgRank(getClickObjectIndex());
					    changeMap('cityMenuLayer');
					}						
				},
				blit : function()
				{
					 if(isDrawUI[index] && jsgRankCtr)
					 {
					    gbox.drawImage("jxg_zjm_11",backdropX,backdropY);
					    
					 	gbox.drawImage('ty_an_10',841,474);				 	
			            if(((840 < touchMoveX) && (touchMoveX < 925)) && ((472 < touchMoveY) && (touchMoveY < 500)))
			            {
			                gbox.drawImage('ty_an_09',841,474);		               
			            }
			            var strW = gbox.getTextWidth("返 回",14);
			            var strX = 841 + (84 - strW)/2;
			            var strY = 474 + (26 - 14)/2;
						gbox.drawDanceString("返 回", strX, strY,14,'#000000','#FFFFFF');
			            //绘制购买圣令按钮
			            gbox.drawImage('ty_an_10',838,245);					 	
			            if(((839 < touchMoveX) && (touchMoveX < 923)) && ((242 < touchMoveY) && (touchMoveY < 271)))
			            {
			                gbox.drawImage('ty_an_09',838,245);			               
			            }
			            var strW = gbox.getTextWidth("购买圣令",14);
			            var strX = 838 + (84 - strW)/2;
			            var strY = 245 + (26 - 14)/2;
						gbox.drawDanceString("购买圣令", strX, strY,14,'#000000','#FFFFFF');
			            ///////////////////////////////////
			            ///绘制圣令数字		
			            gbox.drawDanceString(itemAmount,777 + (55 - gbox.getBufferContext().measureText(itemAmount).width)/2,250,16,'#000000','#FFFFFF');
			            ///////////////////////////////////////////////	
			            ///绘制属性
			            for(var i =0 ; i<commissionRank.length; i++)
			            {
			            	 var txtLen = gbox.getBufferContext().measureText(commissionRank[i].name).width;
				             var txtX = 510 + (121 - txtLen)/2;
				             gbox.drawString(commissionRank[i].name,txtX,299+i*26,"#FFFFFF",12);
				             var txtLen = gbox.getBufferContext().measureText(commissionRank[i].commandNumber).width;
				             var txtX = 631 + (70 - txtLen)/2;
				             gbox.drawString(commissionRank[i].commandNumber,txtX,299+i*26,"#FFFFFF",12);
				             var txtLen = gbox.getBufferContext().measureText(commissionRank[i].heroExploit).width;
				             var txtX = 701 + (78 - txtLen)/2;
				             gbox.drawString(commissionRank[i].heroExploit,txtX,299+i*26,"#FFFFFF",12);
				             var txtLen = gbox.getBufferContext().measureText(commissionRank[i].item).width;
				             var txtX = 778 + (89 - txtLen)/2;
				             gbox.drawString(commissionRank[i].item,txtX,299+i*26,"#FFFFFF",12);
				             var okX = 867 + (61 - gbox.getImage("jxg_zjm_12").width)/2;						 
						 	 if(commissionRank[i].isAppointed)
						 	  gbox.drawImage("jxg_zjm_12",okX,296 + i*26);	
						 	 else
						 	  gbox.drawImage("jxg_zjm_22",okX,296 + i*26);	
			            }
					 }						
				}
			});

};
var juxiange = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJuxiange = true;
	isTaiyishu = false;
	isJunjichu = false;
	isJinjie = false;
	isQiansan = false;
	isJunying = false;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('jxg_zjm_01').width;
	var bH = gbox.getImage('jxg_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;        
		gbox.addObject(
			{ 
				id : 'juxiange',
				group : 'levelMenu_2',
				tileset : 'jxg_zjm_01',
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
					jsgRankCtr = false;
					if(lastTouchMoveX > 1095 && lastTouchMoveX < (1095 + 23) && lastTouchMoveY > 160 && lastTouchMoveY < (160 + 23)){
						displayDestroy();
						exit(index);
						curGroup = 'cityMenu';
						enterCityMenu(curGroup);
	                    changeMap('cityMenuLayer');	
					}
					else if(((579 < lastTouchMoveX) && (lastTouchMoveX < 662)) && ((403 < lastTouchMoveY) && (lastTouchMoveY < 428))){
						
						 if(typeof(userRank) != "undefined")
						 {
						 	if(typeof(userRank[jxgPage]) != "undefined")
						 	{
						 		if(typeof(userRankLeft[jxgPage]) != "undefined")
						 		{
						 			
						 			BuildingFunction.relieveHero(userRank[jxgPage].userHeroId,dorelieveHero);   
						 			//jsgRank(getClickObjectIndex(),1,jxgPage);
					                //changeMap('cityMenuLayer');
						 		}
						 		
						 	}
						 }
					}
					else if(((579 < lastTouchMoveX) && (lastTouchMoveX < 662)) && ((556 < lastTouchMoveY) && (lastTouchMoveY < 585))){
						
						 if(typeof(userRank) != "undefined")
						 {
						 	if(typeof(userRank[jxgPage + 1]) != "undefined")
						 	{
						 		if(typeof(userRankLeft[jxgPage + 1]) != "undefined")
						 		{
					
						 			BuildingFunction.relieveHero(userRank[jxgPage + 1].userHeroId,dorelieveHero);   
						 			//jsgRank(getClickObjectIndex(),1,(jxgPage+1));
					                //changeMap('cityMenuLayer');
						 		}
						 		
						 	}
						 }
					}
					else{
						if(typeof(userRank) != "undefined" && typeof(userRank[0]) != "undefined"){
							if(lastTouchMoveX > 778 && lastTouchMoveX < (778 + 12) && lastTouchMoveY > 586 && lastTouchMoveY < (586 + 19)){
								if(--jxgNum < 1){
									jxgNum = 1;
									jxgPage = 0;
								}else
									jxgPage -= 2;
							}
							if(lastTouchMoveX > 856 && lastTouchMoveX < (856 + 12) && lastTouchMoveY > 586 && lastTouchMoveY < (586 + 19)){
								
									if(++jxgNum > Math.ceil(userRank.length/2)){
										jxgNum = Math.ceil(userRank.length/2);
									}else{
										jxgPage += 2;
									}								
							}
						}
                        if(juxiange2ListCtr)
                        {
                        	juxiange2ListCtr = false;
                        	juxiange(getClickObjectIndex());
						    juxiangeList(getClickObjectIndex());
						    juxiange2List(getClickObjectIndex());
						    changeMap('cityMenuLayer');	
                        }
                        else
                        {
                        	commandBuildBtn(lotIndex,"建筑加速");
                        	juxiange2ListCtr = false;
                        	juxiange(getClickObjectIndex());
						    juxiangeList(getClickObjectIndex());
						    changeMap('cityMenuLayer');	
                        }
											
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isJuxiange)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'jxg_zjm_01',
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
							tileset : 'ty_an_27',
							tile : 0,
							dx :backdropX1,
							dy :backdropY1 + 6,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
					     });
					    gbox.drawImage('jxg_zjm_02',(gbox.getImage('jxg_zjm_01').width - gbox.getImage("jxg_zjm_02").width)/2 + backdropX,backdropY1);
					    gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'ty_an_18',
							tile : 0,
							dx :1095,
							dy :160,
							fliph : this.fliph,
							flipv : this.flipv,
							camera : this.camera,
							alpha : 1.0
						});					
						
					    drawBuildCommandBtn();
			            
			            if(typeof(userRank) != "undefined")
			            { 
			            	if(typeof(userRank[jxgPage]) != "undefined"){
					            if(typeof(userRankLeft[jxgPage]) != "undefined"){
					            	gbox.drawImage('jxg_zjm_07',575,276);						 	
						            if(((580 < touchMoveX) && (touchMoveX < (580 + 82))) && ((404 < touchMoveY) && (touchMoveY < (404 + 25))))
						            {
						                gbox.drawImage('ty_an_09',580,404);	               
						            } 					            	
					            	 var strW = gbox.getTextWidth("革 职",14);
							         var strX = 580 + (84 - strW)/2;
							         var strY = 404 + (26 - 14)/2;
								     gbox.drawDanceString("革 职", strX, strY,14,'#000000','#FFFFFF');
						            for(var i=0; i<4; i++){
							            gbox.drawString("" + userRankLeft[jxgPage][i],750,294 + (i*35),'#FFFFFF',12);
							            if(typeof(userRankRight[jxgPage][i]) != "undefined"){
							                gbox.drawString("" + userRankRight[jxgPage][i],949,294 + (i*35),'#FFFFFF',12);
							            }else
							            	gbox.drawString("无",949,294 + (i*35),'#FFFFFF',12);
						            }
					            }
					            
					            
					            if(typeof(userRank[jxgPage].smallheroIcon) != "undefined"){
					            	gbox.drawImage(""+userRank[jxgPage].smallheroIcon,586,288);
					            }
			            	}
			            	if(typeof(userRank[jxgPage + 1]) != "undefined"){
					            if(typeof(userRankLeft[jxgPage + 1]) != "undefined"){
					            	gbox.drawImage('jxg_zjm_07',575,430);
					            	
						            if(((580 < touchMoveX) && (touchMoveX < (580 + 82))) && ((558 < touchMoveY) && (touchMoveY < (558 + 25))))
						            {
						               gbox.drawImage('ty_an_09',580,558);		               
						            } 
					            	 var strW = gbox.getTextWidth("革 职",14);
							         var strX = 580 + (84 - strW)/2;
							         var strY = 558 + (26 - 14)/2;
								     gbox.drawDanceString("革 职", strX, strY,14,'#000000','#FFFFFF');
					            	
						            for(var i=0; i<4; i++){
							            gbox.drawString("" + userRankLeft[jxgPage + 1][i],750,448 + (i*35),'#FFFFFF',12);
							            if(typeof(userRankRight[jxgPage + 1][i]) != "undefined"){
							                gbox.drawString("" + userRankRight[jxgPage + 1][i],949,448 + (i*35),'#FFFFFF',12);
							            }else
							            	gbox.drawString("无",949,448 + (i*35),'#FFFFFF',12);
						            }
					            }
					            if(typeof(userRank[jxgPage + 1].smallheroIcon) != "undefined"){
					            	gbox.drawImage(""+userRank[jxgPage + 1].smallheroIcon,586,443);
					            }
			            	}
				            gbox.drawImage('ty_an_25',778,586);				              
				            gbox.drawImage('ty_an_24',854,586);
				           	var jxgStrW = gbox.getTextWidth("" + jxgNum,12);
				            var jxgX = 796 + (52 - jxgStrW)/2;
				            gbox.drawString("" + jxgNum,jxgX,588,'#FFFFFF',12);	
			            }
						gbox.drawTxtRect(buildCommonDesc[lotIndex],450,190,500,70,20,'#ffffff','#000000');
					 }						
				}
			});

};

//聚贤阁初始化
var userMilitaryRank = new Array();//全部官阶
var userHero = new Array();//全部武将
function doInitCentrestage(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	jxgListIndex = 0;
	userMilitaryRank = new Array();
	//1.全部官阶
	for(var i=0; i<data.rank.length; i++){
		var temp = data.rank[i];
		userMilitaryRank[i] = {
				rankNo:temp.rankNo,//主键
				name:temp.name,//官阶名
				number:temp.heroCount,//当前官阶武将数量
				numberLimit:temp.limit//数量上限
		};
	}
	
	userHero = new Array();
	//2.全部武将
	for(var i=0; i<data.hero.length; i++){
		var temp = data.hero[i];
		userHero[i] = {
				userHeroId:temp.heroId,//武将ID
				heroName:temp.toolTipInfo.heroName,//武将名
				level:temp.toolTipInfo.level,//武将等级
				exploit:temp.exploit,//军功
				rankName:temp.rank,//官阶名
				commandNumber:temp.command,//统率力
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
	if(typeof(userMilitaryRank) != "undefined")
	{
						itemName = new Array();
						itemRankNo = new Array();
						itemNumber = new Array();
						itemNumberLimit = new Array();
						itemValue = new Array();
						itemName[0] = "全部武将";
						itemValue[0] = "" + userHero.length;
							for(var i=0; i< userMilitaryRank.length; i++){
								if(typeof(userMilitaryRank[i]) != "undefined"){
									itemRankNo[i] = "" + userMilitaryRank[i].rankNo;
									itemNumber[i] = "" + userMilitaryRank[i].number;
									itemNumberLimit[i] = "" + userMilitaryRank[i].numberLimit;
									itemName[i + 1] =  "" + userMilitaryRank[i].name;
									
									if(userMilitaryRank[i].numberLimit > 0){
										itemValue[i + 1] =  "" + userMilitaryRank[i].number + "/" + userMilitaryRank[i].numberLimit;
									}else
										itemValue[i + 1] =  "" + userMilitaryRank[i].number;
									
								}
							}
	}
	juxiange(getClickObjectIndex());
	juxiangeList(getClickObjectIndex());
	juxiange2List(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}

//获取全部武将
function doGetAllUserHero(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	userHero = new Array();
	//2.全部武将
	for(var i=0; i<data.length; i++){
		var temp = data[i];
		userHero[i] = {
				userHeroId:temp.heroId,//武将ID
				heroName:temp.toolTipInfo.heroName,//武将名
				level:temp.toolTipInfo.level,//武将等级
				exploit:temp.exploit,//军功
				rankName:temp.rank,//官阶名
				commandNumber:temp.command,//统率力
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
	juxiange(getClickObjectIndex());
	juxiange2List(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}
var userRank = new Array();//官阶对应的武将
var userRankLeft = new Array();
var userRankRight = new Array();
//获取官阶对应的武将
function doGetUserkHeroByMilitaryRank(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	userRank = new Array();
	userRankLeft = new Array();
	userRankRight = new Array();
	for(var i=0; i<data.length; i++){
		var temp = data[i];
		userRank[i] = {
				userHeroId:temp.heroId,//武将ID
				heroName:temp.heroName,//武将名
				smallheroIcon:temp.icon,//武将图标
				heroLevel:temp.heroLevel,//武将等级
				heroTitle:temp.title,//武将评级
				heroSoulName:temp.heroSoul,//武魂名
				heroExploit:temp.exploit,//军功
				heroGift:temp.gift,//根骨
				militaryRankName:temp.rank,//官阶名
				commandNumber:temp.command,///统率力
				heroType : temp.heroType//武将类型
		};
		userRankLeft[i] = new Array();
		userRankLeft[i][0] = temp.heroName;//武将名
		userRankLeft[i][1] = temp.heroLevel;//武将等级
		if(userRank[i].heroType == 1)
		{
			userRankLeft[i][2] = "仙师";
		}
		if(userRank[i].heroType == 2)
		{
			userRankLeft[i][2] = "天策";
		}
		if(userRank[i].heroType == 3)
		{
			userRankLeft[i][2] = "白羽";
		}
		userRankLeft[i][3] = temp.command;//统率力
        
		userRankRight[i] = new Array();
		userRankRight[i][0] = temp.exploit;//军功
		userRankRight[i][1] = temp.militaryRankName;//武将评级
		userRankRight[i][2] = temp.heroSoul;//武魂名
		userRankRight[i][3] = temp.gift;//根骨
	}
	juxiange(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}


var jxgListIndex = 0;
var isJuxiangeList = false;
var juxiangeList = function(index)//聚贤阁列表
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJuxiangeList = true;
	gbox.addObject(
			{ 
				id : 'jxglist',
				group : 'levelMenu_2',
				tileset : 'jxg_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [360,290], [572,290], [570,600],[360,600]],
				initialize : function()
				{
					if(typeof(userMilitaryRank) != "undefined")
					{
						var itemName = new Array();
						var itemRankNo = new Array();
						var itemNumber = new Array();
						var itemNumberLimit = new Array();
						var itemValue = new Array();
						itemName[0] = "全部武将";
						itemValue[0] = "" + userHero.length;
							for(var i=0; i< userMilitaryRank.length; i++){
								if(typeof(userMilitaryRank[i]) != "undefined"){
									itemRankNo[i] = "" + userMilitaryRank[i].rankNo;
									itemNumber[i] = "" + userMilitaryRank[i].number;
									itemNumberLimit[i] = "" + userMilitaryRank[i].numberLimit;
									itemName[i + 1] =  "" + userMilitaryRank[i].name;
									
									if(userMilitaryRank[i].numberLimit > 0){
										itemValue[i + 1] =  "" + userMilitaryRank[i].number + "/" + userMilitaryRank[i].numberLimit;
									}else
										itemValue[i + 1] =  "" + userMilitaryRank[i].number;
									
								}
							}
					}
                    
					var content = new Array(itemName,itemValue);
		            var listLen = content[0].length;
		            if(listLen < 8){
		            	listLen = 8;
		            }   
		            jxgOffsetY = jxg_OffsetY = 0;
		            jxglist.init( 'jxgRect', 'jxgHitRect','jxgHitRect', 'jxgPassRect',null,content, 342, 300, 1, listLen, 34, 8, false, -63, 5 );
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					jsgRankCtr = false;
					jsgAlertCtr = false;
					if(jxglist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
					{
						if(Math.abs(jxgOffsetY) > 12)
						{
							jxgOffsetY=12*(jxgOffsetY/Math.abs(jxgOffsetY));
						}
						jxg_OffsetY = jxgOffsetY;
						jxg_BeginSlip = true;
						jxg_Time = 0;
					}else{
						jxglist.radioHandle(jxglist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
						jxgListIndex = jxglist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
						 console.log("jxgListIndex = " + jxgListIndex);
						 if(jxgListIndex == 0){
							 BuildingFunction.getAllCentrestageUserHero(doGetAllUserHero);
						 }else{
							 jxgNum = 1;
							 jxgPage = 0;
							 userRank = new Array();
							 userRankLeft = new Array();
							 userRankRight = new Array();
							 isJuxiange2List = false;
							 clearSub(getClickObjectIndex());	
							if(typeof(userMilitaryRank) != "undefined"){
							 BuildingFunction.getRankUserHero(userMilitaryRank[jxgListIndex-1].rankNo,doGetUserkHeroByMilitaryRank);
							}
						 }
						      
					}	
					
   		          	if(gbox._mouseArea(jxglist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
   		          	    jxglist.keyUp();
   		          	    
		            }
		          	if(gbox._mouseArea(jxglist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
		          		jxglist.keyDown();
		            }
		          	
					juxiange2ListCtr = false;
					juxiange(getClickObjectIndex());
					juxiangeList(getClickObjectIndex());
	                //juxiange2List(getClickObjectIndex());
					changeMap('cityMenuLayer');	
				},
		blit : function()
		{
			if(isDrawUI[index] && isJuxiangeList)
			{
				jxglist.paint( jxg_OffsetY, jxg_BeginSlip, jxg_Time );
			}
		}
	 });
};

var jxg2ListIndex = 0;
var jxg2Item = new Array();
jxg2Item[0] = "jxgbutton";
var isJuxiange2List = false;

var juxiange2List = function(index)//聚贤阁列表2
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJuxiange2List = true;
	gbox.addObject(
			{ 
				id : 'jxg2list',
				group : 'levelMenu_2',
				tileset : 'jxg_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [574,275], [1104,275], [1104,610],[574,610]],
				initialize : function()
				{
					var itemQuality = new Array();
					if(typeof(userHero) != "undefined"){
						
						var itemIcon = new Array();
						for(var i=0; i<userHero.length; i++)
						    itemIcon.push(jxg2Item);
						
						var itemName = new Array();
						var itemLevel = new Array();
						var itemExploit = new Array();
						var itemRankName = new Array();
						
						var itemCommandNumber = new Array();
							for(var i=0; i< userHero.length; i++){
								if(typeof(userHero[i]) != "undefined"){
									switch(userHero[i].toolTipInfo.quality)
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
									
									itemName[i] = userHero[i].heroName;
									itemLevel[i] = userHero[i].level;
									itemExploit[i] = userHero[i].exploit;
									itemRankName[i] = userHero[i].rankName;
									itemCommandNumber[i] = userHero[i].commandNumber;
								}
							}
							console.log("itemQuality =" + itemQuality[0]);
					}
                    
					var content = new Array(itemName,itemLevel,itemExploit,itemRankName,itemCommandNumber,itemIcon);
		            var listLen = content[0].length;
		            if(listLen < 9){
		            	listLen = 9;
		            }   
		            jxg2OffsetY = jxg2_OffsetY = 0;
		            jxg2list.init( 'jxg_zjm_04', 'jxgHit2Rect','jxgHit2Rect', 'jxgPass2Rect',itemQuality,content, 556, 279, 1, listLen, 34, 9, false, -375, 0 );
                    jxg2list._moduleName = "juxiange";
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					jsgRankCtr = false;
					jsgAlertCtr = false;
					if(jxg2list.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
					{
						if(Math.abs(jxg2OffsetY) > 12)
						{
							jxg2OffsetY=12*(jxg2OffsetY/Math.abs(jxg2OffsetY));
						}
						jxg2_OffsetY = jxg2OffsetY;
						jxg2_BeginSlip = true;
						jxg2_Time = 0;
					}else{
						jxg2list.radioHandle(jxg2list.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
						jxg2ListIndex = jxg2list.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
						for(var i =0; i<9; i++)
						{
							if(((lastTouchMoveX > 1007) && (lastTouchMoveX < 1070)) && ((lastTouchMoveY > (302 + i*34)) && (lastTouchMoveY<327 + i*34)))
							{
								BuildingFunction.getAllRank(userHero[jxg2ListIndex].userHeroId,dogetAllRank);                                  
							}
						}
					}	
					juxiange(index);
					juxiangeList(index);
	               // juxiange2List(getClickObjectIndex());
	               isDrawUI[index] = true;
	               isJuxiange2List = true;
	               if(typeof(userHero) != "undefined"){
						
						var itemIcon = new Array();
						for(var i=0; i<userHero.length; i++)
						    itemIcon.push(jxg2Item);
						
						var itemName = new Array();
						var itemLevel = new Array();
						var itemExploit = new Array();
						var itemRankName = new Array();
						var itemQuality = new Array();
						var itemCommandNumber = new Array();
							for(var i=0; i< userHero.length; i++){
								if(typeof(userHero[i]) != "undefined"){
									
									switch(userHero[i].quality)
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
									
									itemName[i] =  "" + userHero[i].heroName;
									itemLevel[i] = "" + userHero[i].level;
									itemExploit[i] = "" + userHero[i].exploit;
									itemRankName[i] = "" + userHero[i].rankName;
									itemCommandNumber[i] = "" + userHero[i].commandNumber;
									//console.log("======" + userHero[i].heroName);
								}
							}
					}
                    
					var content = new Array(itemName,itemLevel,itemExploit,itemRankName,itemCommandNumber,itemIcon);
		            var listLen = content[0].length;
		            if(listLen < 9){
		            	listLen = 9;
		            }   
		            jxg2OffsetY = jxg2_OffsetY = 0;
	                jxg2list.update(content, null, listLen); 
	                //isJuxiange2List = true;
					changeMap('cityMenuLayer');	
				},
		blit : function()
		{
			if(isDrawUI[index] && isJuxiange2List)
			{
				gbox.drawImage('jxg_zjm_03',574,276);	
				jxg2list.paint( jxg2_OffsetY, jxg2_BeginSlip, jxg2_Time );
				gbox.drawImage('jxgLine',661,299);	
				gbox.drawImage('jxgLine',729,299);	
				gbox.drawImage('jxgLine',819,299);
				gbox.drawImage('jxgLine',907,299);
				gbox.drawImage('jxgLine',980,299);
				var jxgIndex = jxg2list.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				if(typeof(userHero) != "undefined" && jxgIndex != -1)
				{
					var tempOffset = 15;
					var tempH = tooltip.computHero(gbox.getBufferContext(),userHero[jxgIndex].toolTipInfo).height;
					if((gbox.getScreenH() - touchMoveY) < tempH)	
					{
						mouseY = gbox.getScreenH() - tempH - 20;
					}
					else
					{
						mouseY = touchMoveY;
					}
					if(!jsgRankCtr)
					{
						if(touchMoveX !=0)
						   tooltip.drawHero(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,mouseY + tempOffset,userHero[jxgIndex].toolTipInfo); 
					}
                  	              
              }
			}
		}
	 });
};

