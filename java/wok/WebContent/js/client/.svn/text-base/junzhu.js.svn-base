var isJunzhu = false;
var mlNum = 0;
var wlNum = 0;
var addInternalAffairs;
var addMilitaryStrength;

var junzhu = function(index,_group,_layer){
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	
	isDrawUI[index] = true;
	isJunzhu = true;
	isMinju = false;
	isJunjichu = false;
	isJinjie = false;
	isQiansan = false;
	isJunying = false;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('jz_zjm_01').width;
	var bH = gbox.getImage('jz_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2; 
	var exitX = backdropX + bW - 20;
	var exitY = backdropY - 5;		    
		gbox.addObject(
			{ 
				id : 'junzhu',
				group : 'levelMenu_2',
				tileset : 'jz_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
		            if(jzContentDiv == null && !gbox._isIndwellDiv("jzContentDiv","input"))
					{
							var pnX = 343;
							var pnY = 371;
							jzContentDiv = addDivWindowBg(pnX,pnY);
							jzContentDiv.id = 'jzContentDiv';
							document.body.appendChild(jzContentDiv);
							jzContent = document.createElement("textarea");
							jzContent.id = 'textarea1';
							
							if(kingData.description != null){
								jzContent.value = '' + kingData.description; 
							}else
								jzContent.value = ''; 
							
							jzContent.style.opacity="0.5";
							jzContent.style.backgroundColor = "#272120";
							jzContent.style.color = "#ffffff";
							jzContent.style.width = '344px';
							jzContent.style.height = '88px';
							jzContent.style.maxWidth = '344px';
							jzContent.style.maxHeight = '88px';
							jzContent.style.resize= 'none';
							jzContentDiv.appendChild(jzContent);

					}
				},
				first : function() 
				{
                    /*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(jzContentDiv,"jzContentDiv",343);
					/*======================================================*/		    
//					jzContent.style.display="";
				},
				myclick : function()
				{
					 if(((exitButtonCoordinate7.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate7.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate7.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate7.y+gbox.getImage("ty_an_17").height))){
						displayDestroy();
						exit(getClickObjectIndex());
						curGroup = 'cityMenu';
//						enterCityMenu(curGroup);
//	                    changeMap('cityMenuLayer');	
					}else
		            if(((438 < lastTouchMoveX) && (lastTouchMoveX < (438+28))) && ((280 < lastTouchMoveY) && (lastTouchMoveY < (280+28))))
		            {
		            	if(gbox._isIndwellDiv("jzContentDiv","input"))
		            	{
		            		document.body.removeChild(jzContentDiv);  
		            		jzContentDiv = null;
		            	}
		            	isJunzhu = true;
		            	User.getAllSystemPic(doGetAllSystemPic);
		            }
			        else
		            if(((695 < lastTouchMoveX) && (lastTouchMoveX < (695+84))) && ((180 < lastTouchMoveY) && (lastTouchMoveY < (180+26))))
		            {
		            	if(gbox._isIndwellDiv("jzContentDiv","input"))
		            	{
		            		document.body.removeChild(jzContentDiv);  
		            		jzContentDiv = null;
		            	}
		            	isJunzhu = true;
						junzhuName(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);		
		            }
		            else
			        if(((998 < lastTouchMoveX) && (lastTouchMoveX < (998+84))) && ((180 < lastTouchMoveY) && (lastTouchMoveY < (180+26))))
			        {
				    	if(gbox._isIndwellDiv("jzContentDiv","input"))
				    	{
				    		document.body.removeChild(jzContentDiv);  
				    		jzContentDiv = null;
				    	}
				    	isJunzhu = true;
						junzhuCountry(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);
				    }
			        else
		            if(((602 < lastTouchMoveX) && (lastTouchMoveX < (602+64))) && ((345 < lastTouchMoveY) && (lastTouchMoveY < (345+26))))
		            {
		            	User.updateCharacterDescription('' + jzContent.value,doUpdateCharacterDescription);
		            }else
		            if(((602 < lastTouchMoveX) && (lastTouchMoveX < (602+64))) && ((562 < lastTouchMoveY) && (lastTouchMoveY < (562+26))))
		            {
		            	User.updateCharacterAttribute(addMilitaryStrength,addInternalAffairs,doUpdateCharacterAttribute);
		            }else
		            if(((622 < lastTouchMoveX) && (lastTouchMoveX < (622+15))) && ((512 < lastTouchMoveY) && (lastTouchMoveY < (512+18))))
		            {
					    if(kingData.abilityPoint>0){
					    	kingData.abilityPoint--;
					    	kingData.internalAffairs++;
					    	addInternalAffairs++;
					    }
				    }
		            else
		            if(((622 < lastTouchMoveX) && (lastTouchMoveX < (622+15))) && ((542 < lastTouchMoveY) && (lastTouchMoveY < (542+18))))
		            {
					    if(kingData.abilityPoint>0){
					    	kingData.abilityPoint--;
					    	kingData.militaryStrength++;
					    	addMilitaryStrength++;
					    }
		            }else
		            if(((650 < lastTouchMoveX) && (lastTouchMoveX < (650+15))) && ((517 < lastTouchMoveY) && (lastTouchMoveY < (517+18))))
		            {
					    if(kingData.internalAffairs>0){
					    	kingData.abilityPoint++;
					    	kingData.internalAffairs--;
					    	addInternalAffairs--;
					    	
					    }
				    }
		            else
		            if(((650 < lastTouchMoveX) && (lastTouchMoveX < (650+15))) && ((546 < lastTouchMoveY) && (lastTouchMoveY < (546+18))))
		            {
					    if(kingData.militaryStrength>0){
					    	kingData.abilityPoint++;
					    	kingData.militaryStrength--;
					    	addMilitaryStrength--;
					    }
		            }else
			        if(((998 < lastTouchMoveX) && (lastTouchMoveX < (998+84))) && ((245 < lastTouchMoveY) && (lastTouchMoveY < (245+26))))
			        {
			        	//随机迁城
			        	World.moveRandomCity(doMoveRandomCity);
					}
					else{
						junzhu(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isJunzhu)
					 {
					 	gbox.drawImage('jz_zjm_01',backdropX,backdropY);
					 	gbox.drawImage('ty_an_27',backdropX1,backdropY1 - 8);					 	
					    gbox.drawImage('jz_zjm_02',(gbox.getImage('jz_zjm_01').width - gbox.getImage("jz_zjm_02").width)/2 + backdropX,backdropY1 - 10);    
			            if(((695 < touchMoveX) && (touchMoveX < (695+84))) && ((180 < touchMoveY) && (touchMoveY < (180+26))))
			            {
						    gbox.drawImage('ty_an_09',695,180);
					    }else
					    	gbox.drawImage('ty_an_10',695,180);
					    var fontW = gbox.getTextWidth("改 名",14);
				 		var dx = 695 + (82 - fontW)/2;
					 	var dy = 180 + (25 - 14)/2;
					 	gbox.drawText("改 名",dx,dy,10);
			            if(((998 < touchMoveX) && (touchMoveX < (998+84))) && ((180 < touchMoveY) && (touchMoveY < (180+26))))
			            {
						    gbox.drawImage('ty_an_09',998,180);
					    }else
					    	gbox.drawImage('ty_an_10',998,180);
			            var fontW = gbox.getTextWidth("更 换",14);
				 		var dx = 998 + (82 - fontW)/2;
					 	var dy = 180 + (25 - 14)/2;
					 	gbox.drawText("更 换",dx,dy,10);
			            if(((998 < touchMoveX) && (touchMoveX < (998+84))) && ((245 < touchMoveY) && (touchMoveY < (245+26))))
			            {
						    gbox.drawImage('ty_an_09',998,245);
					    }else
					    	gbox.drawImage('ty_an_10',998,245);
					    var fontW = gbox.getTextWidth("迁 城",14);
				 		var dx = 998 + (82 - fontW)/2;
					 	var dy = 245 + (25 - 14)/2;
                        gbox.drawText("迁 城",dx,dy,10);
			            if(((602 < touchMoveX) && (touchMoveX < (602+64))) && ((345 < touchMoveY) && (touchMoveY < (345+26))))
			            {
						    gbox.drawImage('ty_an_09',602,345);
					    }else
					    	gbox.drawImage('ty_an_10',602,345);
			            var fontW = gbox.getTextWidth("保 存",14);
				 		var dx = 602 + (82 - fontW)/2;
					 	var dy = 345 + (25 - 14)/2;
                        gbox.drawText("保 存",dx,dy,10);
			            if(((602 < touchMoveX) && (touchMoveX < (602+64))) && ((562 < touchMoveY) && (touchMoveY < (562+26))))
			            {
						    gbox.drawImage('ty_an_09',602,562);
					    }else
					    	gbox.drawImage('ty_an_10',602,562);
			            var fontW = gbox.getTextWidth("确 定",14);
				 		var dx = 602 + (82 - fontW)/2;
					 	var dy = 562 + (25 - 14)/2;
					 	gbox.drawText("确 定", dx, dy,10);	
					 	if(typeof(kingData) != "undefined")
					 	{
					 		gbox.drawText(kingData.internalAffairs, 590, 515,4);
					 		gbox.drawText(kingData.militaryStrength, 590, 542,4);
					 	}
					 				    
			            if(((622 < touchMoveX) && (touchMoveX < (622+15))) && ((512 < touchMoveY) && (touchMoveY < (512+18))))
			            {
						    gbox.drawImage('ty_an_13',622,512);
					    }else
					    	gbox.drawImage('ty_an_15',622,512);
			            
			            if(((622 < touchMoveX) && (touchMoveX < (622+15))) && ((542 < touchMoveY) && (touchMoveY < (542+18))))
			            {
						    gbox.drawImage('ty_an_13',622,542);
					    }else
					    	gbox.drawImage('ty_an_15',622,542);
			            
			            if(((650 < touchMoveX) && (touchMoveX < (650+15))) && ((517 < touchMoveY) && (touchMoveY < (517+18))))
			            {
						    gbox.drawImage('ty_an_14',650,517);
					    }else
					    	gbox.drawImage('ty_an_16',650,517);
			            
			            if(((650 < touchMoveX) && (touchMoveX < (650+15))) && ((546 < touchMoveY) && (touchMoveY < (546+18))))
			            {
						    gbox.drawImage('ty_an_14',650,546);
					    }else
					    	gbox.drawImage('ty_an_16',650,546);

				        if(typeof(kingInfo) != "undefined" && typeof(kingData) != "undefined"){
					        for(var i=0; i<5; i++){
					        	for(var j=0; j<2; j++){
					        		if(typeof(kingInfo[i]) != "undefined" && typeof(kingInfo[i][j]) != "undefined")
					        		{
					        			gbox.drawText(kingInfo[i][j],565 + (j * 303), 185 + (i*32),3);
					        		}
					        		
					        	}
					        }
					        
					        if(typeof(kingData) != 'undefined' && gbox.getImage(kingData.image) != null)
					        	gbox.drawImage(kingData.image,376,200); 
					        
//					        gbox.drawImage('jz_zjm_27',364,186); 
					        
				            if(((438 < touchMoveX) && (touchMoveX < (438+28))) && ((280 < touchMoveY) && (touchMoveY < (280+28))))
				            {
							    gbox.drawImage('jz_zjm_30',438,280);
						    }else
						    	gbox.drawImage('jz_zjm_29',438,280);
					        gbox.drawText(kingData.abilityPoint,630, 490,3);

							var bw1 = Math.floor(((184) * kingData.internalAffairs) / 200); 
						    
					        gbox.setClip(gbox.getBufferContext(),396,516,bw1,13);
					        
					        gbox.drawImage("jz_zjm_15",396,516); 
					        
					        gbox.restoreClip(gbox.getBufferContext());	
					        
							var bw2 = Math.floor(((184) * kingData.militaryStrength) / 200); 
						    
					        gbox.setClip(gbox.getBufferContext(),396,543,bw2,13);
					        
					        gbox.drawImage("jz_zjm_15",396,543); 
					        
					        gbox.restoreClip(gbox.getBufferContext());	
				        }
				        
				        
				        if(typeof(cityInfo) != "undefined" && typeof(cityData) != "undefined"){
					        for(var i=0; i<5; i++){
					        	for(var j=0; j<2; j++){
					        		if(typeof(cityInfo[i]) != "undefined" && typeof(cityInfo[i][j]) != "undefined")
					        		{
					        			gbox.drawText(cityInfo[i][j],800 + (j * 195), 394 + (i*40),8);

					        		}
					        		
					        	}
					        }
				        }
				        if(((exitButtonCoordinate7.x < touchMoveX) && (touchMoveX < exitButtonCoordinate7.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate7.y < touchMoveY) && (touchMoveY < exitButtonCoordinate7.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate7.x,exitButtonCoordinate7.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate7.x,exitButtonCoordinate7.y);	
						   }
					 }						
				}
			});

};

var uerIndex = 0;
var isZJTitle = false;
var jz_addCnt = 0;
var junzhuTitle = function(index,_group,_layer){
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	
	 
	isDrawUI[index] = true;
	isZJTitle = true;
	var bW = gbox.getImage('jz_zjm_26').width;
	var bH = gbox.getImage('jz_zjm_26').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 20;
	var exitY = backdropY - 6;		    
		gbox.addObject(
			{ 
				id : 'junzhuTitle',
				group : 'levelMenu_3',
				tileset : 'jz_zjm_26',
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
					jz_addCnt = 0;
				 	for(var i=0; i<4; i++)
				 	{
				 		for(var j=0; j<2; j++)
				 		{
	                        var btnX = 514 + (108 * i);
						    var btnY = 329 + (163 * j);
							if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + 25))))
					        {
								jz_addCnt = i*2+j;
								if(typeof(titlePicData[titleIndex + jz_addCnt]) != 'undefined')
								{
									isJunzhu = true;
									isZJTitle = true;
									User.updateCharacterImage(titlePicData[titleIndex + jz_addCnt].name,doUpdateCharacterImage);
								}
					        }
				 		}
				 	}

					 //翻页数字及按钮控制
		               if(((756 < lastTouchMoveX) && (lastTouchMoveX < (756 + 16))) && ((538 < lastTouchMoveY) && (lastTouchMoveY < (538 + 14))))//控制向右翻页
		               {
		            	   console.log("_________向右");
		               	   if(titlePage < titlePages){
		               		console.log("_________向右111111111111");
			            	   if(typeof(titlePicData) != "undefined" && titlePicData.length > 0){
									if(++titlePage > titlePages){
										titlePage = titlePages;
									}else{
										titleIndex += titleNum;
									}	
			            	   }else
			            		   alert("没有头像数据！");
		               	   }
		               }
		               
		               if(((672 < lastTouchMoveX) && (lastTouchMoveX < (672 + 16))) && ((538 < lastTouchMoveY) && (lastTouchMoveY < (538 + 14))))//控制向左翻页
		               {
		            	   console.log("_________向左");
		               	   if(titlePage >= 2){
		               		console.log("_________向左1111111111111");
			            	   if(typeof(titlePicData) != "undefined" && titlePicData.length > 0){
									if(--titlePage < 1){
										titlePage = 1;
										titleIndex = 0;
									}else
										titleIndex -= titleNum;
			            	   }else
			            		   alert("没有头像数据！");
		               
		               	   }
		               }
					
		               
		               
		               
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23)){
						displayDestroy();
						exit(index);
						junzhu(getClickObjectIndex(),_group,_layer);
	                    changeMap(_layer);	
					}
					else{
		            	if(gbox._isIndwellDiv("jzContentDiv","input"))
		            	{
		            		document.body.removeChild(jzContentDiv);  
		            		jzContentDiv = null;
		            	}
		            	isJunzhu = true;
						junzhuTitle(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isZJTitle)
					 {
					 	gbox.drawImage('jz_zjm_26',backdropX,backdropY);					 	
					 	var addCnt = 0;
					 	for(var i=0; i<4; i++)
					 	{
					 		for(var j=0; j<2; j++)
					 		{
					 			var tX = 515 + (110 * i);
					 			var tY = 223 + (163 * j);
					 			if(typeof(titlePicData[titleIndex + addCnt]) != 'undefined' 
					 				&& gbox.getImage("" +titlePicData[titleIndex + addCnt].name) != null)
					 			{
					 				gbox.drawImage(titlePicData[titleIndex + addCnt].name,tX,tY);
//					 				gbox.drawImage('jz_zjm_28',tX - 12,tY - 12);
					 			}
					 			      
					 			
							    var fontW = gbox.getTextWidth("使  用",14);
	                            var btnX = 514 + (109 * i);
							    var btnY = 329 + (163 * j);
							    gbox.drawImage('ty_an_10',btnX,btnY);
							    var backX = btnX + (82 - fontW)/2;
								var backY = btnY + (25 - 14)/2;
								if(typeof(titlePicData[titleIndex + addCnt]) != 'undefined')
								{
									if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
							        {
							               gbox.drawImage('ty_an_09',btnX,btnY);			               
							        }
								}else
									gbox.drawImage('ty_an_11',btnX,btnY);

								gbox.drawText("使  用", backX, backY,10);	

								addCnt++;
					 		}
					 	}
					 	
					 	
						//绘制翻页数字及按钮
						gbox.drawText(titlePage + "/" + titlePages,703,540,10);

//						if(titlePage < titlePages)
						  gbox.drawImage("ty_an_25",672,538);
//						if(dashiPage > 1)
						  gbox.drawImage("ty_an_24",756,538);
					 
						
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

var countryIndex= 0;
var isZJCountry = false;
var junzhuCountry = function(index,_group,_layer){
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	
	isDrawUI[index] = true;
	isZJCountry = true;
	var bW = gbox.getImage('jz_zjm_38').width;
	var bH = gbox.getImage('jz_zjm_38').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 20;
	var exitY = backdropY + 2;		    
		gbox.addObject(
			{ 
				id : 'junzhuCountry',
				group : 'levelMenu_3',
				tileset : 'jz_zjm_38',
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
						junzhu(getClickObjectIndex(),_group,_layer);
	                    changeMap(_layer);	
					}else
					if(((lastTouchMoveX > 836) && (lastTouchMoveX < (836 + 19))) && ((lastTouchMoveY > 392) && (lastTouchMoveY<(392 + 12))))
					{
						if(typeof(kingData) != "undefined"){
							if(++countryIndex >= World.countryName.length){
								countryIndex = 0;
							}
						}
						junzhuCountry(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);	
					}
					else
				    if(((683 < lastTouchMoveX) && (lastTouchMoveX < (683+84))) && ((418 < lastTouchMoveY) && (lastTouchMoveY < (418+26))))
				    {
				    	User.updateCharacterCountry(countryIndex,doUpdateCharacterCountry);
						displayDestroy();
						exit(index);
						junzhu(getClickObjectIndex(),_group,_layer);
	                    changeMap(_layer);	
			        }
					else{
						junzhuCountry(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isZJCountry)
					 {
					 	gbox.drawImage('jz_zjm_38',backdropX,backdropY);
					 	gbox.drawImage('ty_an_18',exitX,exitY);
			            if(((683 < touchMoveX) && (touchMoveX < (683+84))) && ((417 < touchMoveY) && (touchMoveY < (417+26))))
			            {
						    gbox.drawImage('ty_an_09',683,417);
					    }else
					    	gbox.drawImage('ty_an_10',683,417);
			            var fontW = gbox.getTextWidth("确 定",14);
				 		var dx = 683 + (82 - fontW)/2;
					 	var dy = 417 + (25 - 14)/2;
					 	gbox.drawText("确 定", dx, dy,10);

					    
					 	var jgX = 835;
					 	var jgY = 390;
					 	gbox.drawImage('ty_tdt_09',jgX,jgY);	
					 	
						if(((touchMoveX > 836) && (touchMoveX < (836 + 19))) && ((touchMoveY > 397) && (touchMoveY<(397 + 12))))
						{
							var tzX = 835;
						 	var tzY = 390;
						 	gbox.drawImage('ty_tdt_10',tzX,tzY);							
						}
						gbox.drawText(kingData.countryName,648, 394,10);
						gbox.drawText(World.countryName[countryIndex],789, 394,10);

					 }						
				}
			});

};

var updataDivName;
var updataNameDiv;
var isZJName = false;
var junzhuName = function(index,_group,_layer){
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	
	isDrawUI[index] = true;
	isZJName = true;
	var bW = gbox.getImage('jz_zjm_16').width;
	var bH = gbox.getImage('jz_zjm_16').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 20;
	var exitY = backdropY + 2;		    
		gbox.addObject(
			{ 
				id : 'junzhuName',
				group : 'levelMenu_3',
				tileset : 'jz_zjm_16',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
				  	if(updataDivName == null && !gbox._isIndwellDiv("updataNameDiv","input"))
					{
						var pnX = 668;
						var pnY = 384;
						updataDivName = addDivWindowBg(pnX,pnY);
						updataDivName.id = 'updataNameDiv';
						document.body.appendChild(updataDivName);
						updataNameDiv = document.createElement("input");
						updataNameDiv.style.id = 'updataName';
						updataNameDiv.style.backgroundColor = '#000000';
						updataNameDiv.style.width = '80px';
						updataNameDiv.style.height = '20px';
						updataNameDiv.style.color = '#ffffff';
						updataNameDiv.value = kingData.name;
						updataDivName.appendChild(updataNameDiv);
					}
					
				},
				first : function() 
				{
                    /*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(updataDivName,"updataNameDiv",668);
					/*======================================================*/		
				},
				myclick : function()
				{
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23)){
						displayDestroy();
						exit(index);
						junzhu(getClickObjectIndex(),_group,_layer);
	                    changeMap(_layer);	
					}
					else{
						junzhuName(getClickObjectIndex(),_group,_layer);
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isZJName)
					 {
					 	gbox.drawImage('jz_zjm_16',backdropX,backdropY);
					 	gbox.drawImage('ty_an_18',exitX,exitY);					  
			            if(((683 < touchMoveX) && (touchMoveX < (683+84))) && ((415 < touchMoveY) && (touchMoveY < (415+26))))
			            {
						    gbox.drawImage('ty_an_09',683,415);
					    }else
					    	gbox.drawImage('ty_an_10',683,415);
			            var fontW = gbox.getTextWidth("确定改名",14);
				 		var dx = 683 + (82 - fontW)/2;
					 	var dy = 415 + (25 - 14)/2;
//					 	gbox.drawDanceString("确定改名", dx, dy,14,'#000000','#FFFFFF');
					 	gbox.drawText("确定改名", dx, dy,10);
					 }						
				}
			});

};

var isJZMessage = false;
var jzMessage = function(index,msgInfo,_group,_layer){
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	
	isDrawUI[index] = true;
	isJZMessage = true;
	var buyOffsetY = 25;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
		gbox.addObject(
			{ 
				id : 'jzMessage',
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
				    var fontW = gbox.getTextWidth("返回",14);
					var bgW = gbox.getImage('ty_an_55').width;
					var bgH = gbox.getImage('ty_an_55').height;
				    var btnW = gbox.getImage('ty_an_10').width;
                    var btnX = backdropX + (bgW - btnW)/2;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + buyOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + buyOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						isJZMessage = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("返回！");
						isJunzhu = true;
						junzhuTitle(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);
			        }else{
			        	junzhuTitle(getClickObjectIndex(),_group,_layer);
			        	jzMessage(getClickObjectIndex(),msgInfo,_group,_layer);
						changeMap(_layer);
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isJZMessage)
					 {
						 var bgW = gbox.getImage('ty_an_55').width;
						 var bgH = gbox.getImage('ty_an_55').height;
						 gbox.drawImage('ty_an_55',backdropX,backdropY);
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - 45)/2;
						 gbox.drawText("消耗提示", titleX, backdropY,11);

						    var fontW = gbox.getTextWidth("返回",14);
						    var btnW = gbox.getImage('ty_an_10').width;
                            var btnX = backdropX + (bgW - btnW)/2;
						    var btnY = backdropY + bgH/2 + buyOffsetY;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;
							gbox.drawText("返回", backX, backY,10);	
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);
					               gbox.drawText("返回", backX, backY,10);			               
					        }	
							gbox.drawText("返回",backX, backY,10);
							if(typeof(msgInfo) != 'undefined'){
								gbox.drawLineBreakText(msgInfo,626,339,0,180);

							}
					 }						
				}
			});
};

var isFreeQCMessage = false;
var freeQCMessage = function(index,msgInfo,_group,_layer){
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	
	isDrawUI[index] = true;
	isFreeQCMessage = true;
	var buyOffsetY = 25;
	var bW = gbox.getImage('ty_an_55').width;
	var bH = gbox.getImage('ty_an_55').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2 - bH;
		gbox.addObject(
			{ 
				id : 'freeQCMessage',
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
				    var fontW = gbox.getTextWidth("返回",14);
					var bgW = gbox.getImage('ty_an_55').width;
					var bgH = gbox.getImage('ty_an_55').height;
				    var btnW = gbox.getImage('ty_an_10').width;
                    var btnX = backdropX + (bgW - btnW)/2;
				    var btnY = backdropY + bgH/2;
                    var btnX1 = backdropX + bgW - 102;
				    var btnY1 = backdropY + bgH/2;
					if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + 82))) && ((btnY + buyOffsetY < lastTouchMoveY) && (lastTouchMoveY < (btnY + buyOffsetY + 25))))
			        {
						isDrawUI[index] = false;
						isFreeQCMessage = false;	
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
					    console.log("返回！");
					    junzhu(getClickObjectIndex(),_group,_layer);
						changeMap(_layer);
			        }else{
			        	isJunzhu = true;
			        	freeQCMessage(getClickObjectIndex(),msgInfo,_group,_layer);
						changeMap(_layer);
			        }

				},
				blit : function()
				{
					 if(isDrawUI[index] && isFreeQCMessage)
					 {
						 var bgW = gbox.getImage('ty_an_55').width;
						 var bgH = gbox.getImage('ty_an_55').height;
						 gbox.drawImage('ty_an_55',backdropX,backdropY);
						 var barOffsetX = (bgW - gbox.getImage('ty_an_56').width)/2;
						 gbox.drawImage('ty_an_56',backdropX + barOffsetX,backdropY - 2);
						 var titleX = (backdropX + barOffsetX) + (gbox.getImage('ty_an_56').width - 45)/2;
						 gbox.drawText("提示", titleX, backdropY,14);
						    var fontW = gbox.getTextWidth("返回",14);
						    var btnW = gbox.getImage('ty_an_10').width;
                            var btnX = backdropX + (bgW - btnW)/2;
						    var btnY = backdropY + bgH/2 + buyOffsetY;
						    gbox.drawImage('ty_an_10',btnX,btnY);
						    var backX = btnX + (82 - fontW)/2;
							var backY = btnY + (25 - 14)/2;
							if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
					        {
					               gbox.drawImage('ty_an_09',btnX,btnY);			               
					        }	
							gbox.drawText("返回", backX, backY,10);
							if(typeof(msgInfo) != 'undefined'){
								gbox.drawLineBreakText(msgInfo,626,320,12,250);
							}
					 }						
				}
			});
};
//获取君主详细信息
function doCharacterInfo(data)
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
		            ["" + kingData.name,"" + kingData.countryName],
		            ["" + kingData.level,"" + kingData.reputation],
		            ["" + kingData.experience + "/" + kingData.experienceLimit,"" + kingData.coordinate],
		            ["" + kingData.allianceName,"" + kingData.cityLevel],
		            ["" + kingData.ranking,"" + kingData.cityExperience + "/" + kingData.cityExperienceLimit]
		];
	}
	
	cityData = undefined;
	cityData = {
			freePopulation:temp.freePopulation,//空闲人口
			popular:temp.popular,//民心
			soldier:temp.soldier,//兵力总数
			defensen:temp.defensen,//城防总数
			matureResources:temp.matureResources,//成熟资源
			conflictForces:temp.conflictForces,//冲突实力
			userHeroAmount:temp.userHeroAmount,//武将数木
			defensenCombat:temp.defensenCombat,//城池战力
			alliancePosition:temp.alliancePosition,//联盟官职
			allanceWealth:temp.allianceWealth,//联盟财富
	};
	if(typeof(cityData) != "undefined"){
		cityInfo = new Array(new Array());
		cityInfo = [
		            ["" + cityData.freePopulation,"" + cityData.popular],
		            ["" + cityData.soldier,"" + cityData.defensen],
		            ["" + cityData.matureResources,"" + cityData.conflictForces],
		            ["" + cityData.userHeroAmount,"" + cityData.defensenCombat],
		            ["" + cityData.alliancePosition,"" + cityData.allanceWealth]
		];
	}
	addInternalAffairs = 0;
	addMilitaryStrength = 0;
	
	junzhu(getClickObjectIndex(),com_group,com_layer);
    changeMap(com_layer);	
}

function doUpdateCharacterDescription(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
//	var msgInfo = data.status;
//	isJunzhu = true;
//	freeQCMessage(getClickObjectIndex(),msgInfo,com_group,com_layer);
//	changeMap(com_layer);
	alert("保存成功！" + data.status);
}

function doUpdateCharacterAttribute(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
//	var msgInfo = data.status;
//	isJunzhu = true;
//	freeQCMessage(getClickObjectIndex(),msgInfo,com_group,com_layer);
//	changeMap(com_layer);
	alert("分配潜能点成功！" + data.status);
}

function doUpdateCharacterName(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	kingData.name = updataNameDiv.value;
	charName = updataNameDiv.value;
//	var msgInfo = data.status;
//	isJunzhu = true;
//	freeQCMessage(getClickObjectIndex(),msgInfo,com_group,com_layer);
//	changeMap(com_layer);
	User.getCharacterInfo(doCharacterInfo);	
	alert("修改名字成功！" + data.status);
}
function doUpdateCharacterCountry(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	kingData.countryName = World.countryName[countryIndex];
	charCountry = World.countryName[countryIndex];
	
//	var msgInfo = data.msg;
//	isJunzhu = true;
//	freeQCMessage(getClickObjectIndex(),msgInfo,com_group,com_layer);
//	changeMap(com_layer);
//	User.getCharacterInfo(doCharacterInfo);	
	
	User.getCharacterInfo(doCharacterInfo);	
	alert("修改国家成功！" + data.status);
}

//随机迁城
function doMoveRandomCity(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	User.getCharacterInfo(doCharacterInfo);
	var msgInfo = data.msg;
	isJunzhu = true;
	freeQCMessage(getClickObjectIndex(),msgInfo,com_group,com_layer);
	changeMap(com_layer);
}

//获取所有系统头像接口（只含本身性别）
var titlePage = 1;
var titlePages = 0;
var titleIndex = 0;
var titleNum = 8;
var titlePicData = new Array();
function doGetAllSystemPic(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	if(typeof(data) != 'undefined')
	{
//		titlePicData = new Array();
		
		for(var i=0; i<data.length; i++)
		{
			var tmp = data[i];
			titlePicData[i] = {
					id:tmp.id,
					gender:tmp.gender,
					name:tmp.name,
					requirePType:tmp.requirePType,
					requirePValue:tmp.requirePValue,
					type:tmp.type,
			};
		}
		
		if(data.length%titleNum == 0){
			titlePages = Math.floor(data.length/titleNum);
		}else
			titlePages = Math.floor(data.length/titleNum) + 1;
	}else{
		titlePage = 0;
		titlePages = 0;
	}

	junzhuTitle(getClickObjectIndex(),com_group,com_layer);
	changeMap(com_layer);	
}

//更新头像接口
function doUpdateCharacterImage(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	var msgInfo = data.msg;
	isJunzhu = true;
	charImage = kingData.image = titlePicData[titleIndex + jz_addCnt].name;
	junzhuTitle(getClickObjectIndex(),com_group,com_layer);
	jzMessage(getClickObjectIndex(),msgInfo,com_group,com_layer);
	changeMap(com_layer);
}