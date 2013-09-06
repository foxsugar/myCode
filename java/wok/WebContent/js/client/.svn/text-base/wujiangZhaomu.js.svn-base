var tempX1 = 0;
var tempY1 = 0;
var iniBgX = 246;
var iniBgY = 200;
var secX = 385;
var secY = 565;
var font1X = 265;
var font1Y = 495;
var font2X = 680;
var font2Y = 495;
var fontBg1X = 210;
var fontBg1Y = 492;
var fontBg2X = 650;
var botton1X = 419;
var botton2X = 570;
var botton1Y = 581;
var botton2Y = 621;
var rebotton1X = 936;
var rebotton2X = 1012;
var chatFont = 11;
var selectStatus = new Array();
selectStatus[0] = false;
selectStatus[1] = false;
selectStatus[2] = false;
selectStatus[3] = false;
selectStatus[4] = false;
selectStatus[5] = false;
var heroIndex = -1;
var isWjZhaomu = true;
var wujiangZhaomuItem= function(index)
{
	gbox.setRenderOrder(['jiuguanScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isWjZhaomu = true;
	isWarpthGarget = false;
	//isJiuguan = false;
	isJunying = false;
	
	
	var bW = gbox.getImage('wjzm_zjm_01').width;
	var bH = gbox.getImage('wjzm_zjm_01').height;
	tempX1 = (gbox.getScreenW() - bW)/2;
    tempY1= (gbox.getScreenH() - bH)/2;
    
	var bW1 = gbox.getImage('ty_an_130').width;
	var bH1 = gbox.getImage('ty_an_130').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;  
    gbox.addObject(
			{ 
				id : 'wujianzhaomu',
				group : 'levelMenu_2',
				tileset : 'wjzm_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [tempX1,tempY1], [tempX1 + gbox.getImage("wjzm_zjm_01").width,tempY1], [tempX1 + gbox.getImage("wjzm_zjm_01").width,tempY1+ gbox.getImage("wjzm_zjm_01").height],[tempX1,tempY1+ gbox.getImage("wjzm_zjm_01").height]],
				initialize : function()
				{
				},
				first : function() 
				{	
				},
				myclick : function()
				{
					
					if(((exitButtonCoordinate5.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate5.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate5.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate5.y+gbox.getImage("ty_an_17").height)))
					{
						isWjZhaomu = false;
						isWarpthGarget = false;
						isJiuguan = false;
						isJunying = false;
						exit(getClickObjectIndex());
						if(heroTimeInterval != null){
							clearInterval(heroTimeInterval);
							heroCnt = 0;
							heroTimeInterval = null;
							remainTime =  "等待刷新！";
						}
						jiuguan();
	                    changeMap('jiuguanScreen_Layer');	
					}
					else{

					      for(var i = 0; i<6; i++)
					      {
					      	 if(((lastTouchMoveX > (iniBgX + i*158)) && (lastTouchMoveX < (secX + i*160))) && ((lastTouchMoveY > iniBgY) && (lastTouchMoveY<secY)))
						      {
					      		   heroIndex = i;
						      	   selectStatus[i] = true;
						      	   for(var a = 0; a < selectStatus.length; a++)
						      	   {
						      	   	   if(a!=i)
						      	   	   {
						      	   	   	  selectStatus[a] = false;
						      	   	   }
						      	   }
						      	   
						      }
					      }
					      
						  if(((lastTouchMoveX > rebotton1X) && (lastTouchMoveX < (rebotton1X + 84))) && ((lastTouchMoveY > botton1Y) && (lastTouchMoveY<(botton1Y+26))))
						   {
					    	  if(heroIndex >= 0){
					    		  BuildingFunction.recruitHero(heroData[heroIndex].id,doEmployHero);//招募
					    	  }else
					    		 alert("先选择要招募的武将！");
					      }else
					      if(((lastTouchMoveX > botton1X) && (lastTouchMoveX < (botton1X + 84))) && ((lastTouchMoveY > botton1Y) && (lastTouchMoveY<(botton1Y+26))))						  
						  {
							  BuildingFunction.refreshTavernHero(doRefreshHeroList);//武将刷新
					      }	
					      
					      wujiangZhaomuItem(getClickObjectIndex());
					      changeMap('jiuguanScreen_Layer');					      
					}		
				},
				blit : function()
				{
					 if(isDrawUI[index] && isWjZhaomu)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'wjzm_zjm_01',tile : 0,dx :tempX1,dy :tempY1,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
					    });
					    gbox.drawText("铜币:" + haveMoney,250,165,10);
					    gbox.drawText("刷新时间:" + remainTime,1018,165,10);					 	
			    		if(remainTime == "00:00:00"){
			    			getTavernInfo(doTavernInfo);
				         }
				        gbox.drawImage("ty_an_130",backdropX1,backdropY1);						    
					    gbox.drawImage('wjzm_zjm_03',(gbox.getImage('wjzm_zjm_01').width - gbox.getImage("wjzm_zjm_03").width)/2 + tempX1,tempY1 + 18);
					    gbox.drawImage("ty_an_10",botton1X,botton1Y);
					    if(((touchMoveX > botton1X) && (touchMoveX < (botton1X + 84))) && ((touchMoveY > botton1Y) && (touchMoveY<(botton1Y+26))))
					    {
					    	gbox.drawImage("ty_an_09",botton1X,botton1Y);	
					    }
                        var strW = gbox.getTextWidth("武将刷新",14);
			            var strX = botton1X + (84 - strW)/2;
			            var strY = botton1Y + (26 - 14)/2;
						gbox.drawText("武将刷新",strX,strY,10);
						gbox.drawText("武将刷新卡:" + haveRefreshCard,299,590,10);							
					    gbox.drawImage("ty_an_10",rebotton1X,botton1Y);
						 if(((touchMoveX > rebotton1X) && (touchMoveX < (rebotton1X + 84))) && ((touchMoveY > botton1Y) && (touchMoveY<(botton1Y+26))))
						 {
						 	gbox.drawImage("ty_an_09",rebotton1X,botton1Y);
						 }
						 var strW = gbox.getTextWidth("招 募",14);
			             var strX = rebotton1X + (84 - strW)/2;
			             var strY = botton1Y + (26 - 14)/2;
						 gbox.drawText("招 募",strX,strY,10);
						    for(var i = 0; i<6; i++) 
						    {
						    	if(selectStatus[i])
						    	{
						    		gbox.drawImage('wjzm_zjm_04',iniBgX+ i*162,iniBgY);						    		
						    	}
						    	
						    	if(heroData[i] != null && typeof(heroData) != "undefined" && 
						    		typeof(heroData[i]) != "undefined"){
						    		gbox.drawImage("" + heroData[i].heroIcon,265 + (i*163),222);
						    		var fontW = gbox.getTextWidth(heroData[i].needMoney,14);
							 		var dx = 272 + (86 - fontW)/2;
								 	var dy = 525 + (28 - 14)/2;								 	
								 	gbox.drawText(heroData[i].needMoney,dx + (i*162),dy,5);
						    		gbox.drawText("姓名：",270 + (i*162),375,12);						    	
						    		gbox.drawText(heroData[i].heroName,310 + (i*162),375,7,heroData[i].quality);
					                gbox.drawText("武力：",270 + (i*162),395,12);
					                gbox.drawText(heroData[i].heroForce,310 + (i*162),395,2);
					                gbox.drawText("谋略：",270 + (i*162),415,12);
					                gbox.drawText(heroData[i].intelligence,310 + (i*162),415,2);
					                gbox.drawText("体质：",270 + (i*162),435,12);
					                gbox.drawText(heroData[i].stamina,310 + (i*162),435,2);
					                gbox.drawText("敏捷：",270 + (i*162),455,12);
					                gbox.drawText(heroData[i].agility,310 + (i*162),455,2);
					                gbox.drawText("根骨：" ,270 + (i*162),475,12);
					                gbox.drawText(heroData[i].gift,310 + (i*162),475,2);
						    		
						    		//武将类型图标添加
						    		var heroTypeIcon = "wj_zjm_79";
						    		switch(heroData[i].heroType){
						    			case 1://仙师
						    				heroTypeIcon = "wj_zjm_81";
						    				break;
						    			case 2://天策
						    				heroTypeIcon = "wj_zjm_80";
						    				break;
						    			case 3://白羽
						    				heroTypeIcon = "wj_zjm_79";
						    				break;
						    		}
						    		gbox.drawImage(heroTypeIcon,(265 + (i*163)),222);						    		
						    		if(typeof(heroSoul) != "undefined" && 
						    			typeof(heroSoul[i]) != "undefined" && 
						    				heroSoul[i] != null){				    		
							    		gbox.drawText("武魂：" ,270 + (i*162),495,12);
							    		gbox.drawText(heroSoul[i].name,310 + (i*162),495,2,heroSoul[i].quality);
//							    		gbox.drawString(heroSoul[i].name, 310 + (i*162),495,heroSoulColor[i],chatFont + 2);	
//							    		gbox.drawString("(+" + (heroData[i].forceAdd) + ")", 330 + (i*162),395,'#FFFFFF',chatFont);				    		
//							    		gbox.drawString("(+" + heroData[i].intelligenceAdd + ")", 330 + (i*162),415,'#FFFFFF',chatFont);
//							    		gbox.drawString("(+" + heroData[i].staminaAdd + ")", 330 + (i*162),435,'#FFFFFF',chatFont);
//							    		gbox.drawString("(+" + heroData[i].agilityAdd + ")", 330 + (i*162),455,'#FFFFFF',chatFont);						    		
						    		}else{
							    		gbox.drawText("武魂：" ,270 + (i*162),495,12);
							    		gbox.drawText("无",310 + (i*162),495,2);						    			
						    		}
						    		
						    		
						    	}
						    }	
						    
						    for(var i=0; i<6; i++){
						    	if(heroData[i] != null && typeof(heroData) != "undefined" && 
						    			typeof(heroData[i]) != "undefined"){
						    		if(typeof(heroSoul) != "undefined" && 
							    			typeof(heroSoul[i]) != "undefined" && 
							    				heroSoul[i] != null){					    		
						    		var nameW = gbox.getTextWidth("" + heroSoul[i].name,14);
						    		var ttX = 310 + (i*162);
						    		
						    		if(((touchMoveX > ttX) && (touchMoveX < ttX + nameW)) && ((touchMoveY > 498) && (touchMoveY < 508))){
							    		if(typeof(heroSoulInfo) != "undefined" && 
								    			typeof(heroSoulInfo[i]) != "undefined"){
							    			
							    			if(i == 5)
							    				ttX = 230 + (i*162);
							    			
							    			var str_MaxWidth = gbox.stringArrayWidth(heroSoulInfo[i], 12);	
							    	        var rectW = str_MaxWidth + 20;	
							    	        var rectH = heroSoulInfo[i].length * 20;					
							    			var rect = new Rect(ttX + 10,488 + 20,rectW,rectH + 10);
							    			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
							    			for(var j=0; j<heroSoulInfo[i].length; j++){
							    				if(j == 0){
							    					gbox.drawString(heroSoulInfo[i][j],rect.getX() + 3,rect.getY() + 5 + (j * 20),heroSoulColor[i],chatFont);
//							    					gbox.drawString("姓名:",rect.getX() + 3,rect.getY() + 5 + (j * 20),"#FFFFFF",chatFont);
							    					gbox.drawText("姓名:",rect.getX() + 3,rect.getY() + 5 + (j * 20),2);		
							    				}else
							    					gbox.drawText(heroSoulInfo[i][j],rect.getX() + 3,rect.getY() + 5 + (j * 20),2);		
//							    				    gbox.drawString(heroSoulInfo[i][j],rect.getX() + 3,rect.getY() + 5 + (j * 20),"#FFFFFF",chatFont);
							    			} 								    			
							    		}
						    		}
						    	}
						       }
						    }
						    if(((exitButtonCoordinate5.x < touchMoveX) && (touchMoveX < exitButtonCoordinate5.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate5.y < touchMoveY) && (touchMoveY < exitButtonCoordinate5.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate5.x,exitButtonCoordinate5.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate5.x,exitButtonCoordinate5.y);	
						   }
					 }
				}
		 });
};