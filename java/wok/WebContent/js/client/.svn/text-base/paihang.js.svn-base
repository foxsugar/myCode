var ispaihang = false;
var isjianshe = 1;
var isMyChoose = 0;
var backGround = "ph_zjm_01";

var paihang = function(index,_group,_layer){
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	ispaihang = true;
	var bW = gbox.getImage('ph_zjm_01').width;
	var bH = gbox.getImage('ph_zjm_01').height;
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
				id : 'paihang',
				group : 'levelMenu_2',
				tileset : 'ph_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				
				initialize : function()
				{
					 if(findUnionByName == null && !gbox._isIndwellDiv("findUnionByName","input"))
					 {
							var pnX = 614;
							var pnY = 582;
							findUnionByName = addDivWindowBg(pnX,pnY);
							findUnionByName.id = 'findUnionByName';
							document.body.appendChild(findUnionByName);
							findUnionName = document.createElement("input");
							findUnionName.id = 'findUnion1';
							findUnionName.style.opacity="0.5";
							findUnionName.style.backgroundColor = "#272120";
							findUnionName.style.color = "#ffffff";
							findUnionName.style.width = '270px';
							findUnionName.style.height = '200px';
							findUnionName.style.maxWidth = '100px';
							findUnionName.style.maxHeight = '20px';
							findUnionByName.appendChild(findUnionName);	
							Ranking.getBuildList(1,doInitRanking);
					 } 
				},
				first : function() 
				{
					adaptiveDiv(findUnionByName,"findUnionByName",614);
				},
				myclick : function()
				{	
					if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352+207))) && ((254 < lastTouchMoveY) && (lastTouchMoveY < (254+32)))){
						if(backGround=="ph_zjm_01"){
							isjianshe = 1;
//							backGround = "ph_zjm_03";
						}else{
							isjianshe = 1;
							Ranking.getBuildList(1,doInitRanking);
							backGround = "ph_zjm_01";
							console.log("君主排行");
						}
					
					}else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352+207))) && ((287 < lastTouchMoveY) && (lastTouchMoveY < (287+32)))&&backGround == "ph_zjm_01")
		            {
						if(isjianshe!=1){
						 	Ranking.getBuildList(1,doInitRanking);
			            	isjianshe = 1;
			            	isMyChoose=0;
						}
		                console.log("建设排行");	
		              
		            }else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352+207))) && ((287 < lastTouchMoveY) && (lastTouchMoveY < (287+32)))){  	 
		            	 if(!(isjianshe==6&&backGround=="ph_zjm_02")){
		            		 isjianshe = 6;
		            		 isMyChoose=0;
			            	 backGround = "ph_zjm_02";
			            	 Ranking.getAllianceList(1,dogetAllianceList);
		            	 }
				         console.log("联盟排行");
				         console.log(isjianshe);
		            }else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352 + 207))) && ((287+32 < lastTouchMoveY) && (lastTouchMoveY < (287+32+33)))&&backGround == "ph_zjm_01")
			        {
		            	if(isjianshe!=2){
		            		isjianshe = 2;
		            		isMyChoose=0;
				            Ranking.getLevelList(1,dogetLevelList);	
		            	}
			            console.log("等级排行"); 	
			       
			        }else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352 + 207))) && ((287+32 < lastTouchMoveY) && (lastTouchMoveY < (287+32+33)))){
			        	if(isjianshe!=7){
				        	isjianshe = 7;
				        	isMyChoose=0;
				            backGround = "ph_zjm_03";
				            Ranking.getAllHeroList(1,dogetHeroList);
			        	}
				        console.log("武将排行");
			        }else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352 + 207))) && ((287+32+33 < lastTouchMoveY) && (lastTouchMoveY < (287+32+33+33)))&&backGround == "ph_zjm_01"){
			        	if(isjianshe!=3){
			        		isMyChoose=0;
			        		isjianshe = 3;
				        	Ranking.getReputationList(1,dogetReputationList);
			        	}
			        	console.log("声望排行"); 
			        	
			        }else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352 + 207))) && ((287+32+33+33 < lastTouchMoveY) && (lastTouchMoveY < (287+32+33+33+33)))&&backGround == "ph_zjm_01"){
			        	if(isjianshe!=4){
			        		isMyChoose=0;
			        		isjianshe = 4;
				        	Ranking.getFightingList(1,dogetFightingList);
			        	}
			        	console.log("战力排行"); 
			        	console.log(isjianshe+"================================="); 
			        	  
			        }else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352 + 207))) && ((287+32+33+33+33< lastTouchMoveY) && (lastTouchMoveY < (287+32+33+33+33+33)))&&backGround == "ph_zjm_01"){
			        	if(isjianshe!=5){
			        		isMyChoose=0;
				        	isjianshe = 5;
				            Ranking.getRechargeList(1,dogetRechargeList);
			        	}
			        	console.log("金锭排行"); 
			        	 
			        }else if(((972 < lastTouchMoveX) && (lastTouchMoveX < (972 + 11))) && ((581< lastTouchMoveY) && (lastTouchMoveY < (581+18)))){
			        	if(page!=1){
			        		isMyChoose=0;
			        		switch(isjianshe){
				        	case 1 : Ranking.getBuildList(--page,doInitRanking);break;
				        	case 2 : Ranking.getLevelList(--page,dogetLevelList);break;
				        	case 3 : Ranking.getReputationList(--page,dogetReputationList);break;
				        	case 4 : Ranking.getFightingList(--page,dogetFightingList);break;
				        	case 5 : Ranking.getRechargeList(--page,dogetRechargeList);break;
				        	case 6 : Ranking.getAllianceList(--page,dogetAllianceList);break;
				        	case 7 : Ranking.getAllHeroList(--page,dogetHeroList);break;
				        	case 8 : Ranking.getAllUserHeroMap(--page,dogetHeroList);break;
				        	case 9 : Ranking.getAllHeroByName(findUnionName.value,--page,dogetHeroList);break;
				        	}
			        	}
			        
			        	 console.log("左翻页");  
			        }else if(((1042 < lastTouchMoveX) && (lastTouchMoveX < (1042 + 11))) && ((581< lastTouchMoveY) && (lastTouchMoveY < (581+18)))){
			        	if(page!=pages){
			        		isMyChoose=0;
			        	 	switch(isjianshe){
				        	case 1 : Ranking.getBuildList(++page,doInitRanking);break;
				        	case 2 : Ranking.getLevelList(++page,dogetLevelList);break;
				        	case 3 : Ranking.getReputationList(++page,dogetReputationList);break;
				        	case 4 : Ranking.getFightingList(++page,dogetFightingList);break;
				        	case 5 : Ranking.getRechargeList(++page,dogetRechargeList);break;
				        	case 6 : Ranking.getAllianceList(++page,dogetAllianceList);break;
				        	case 7 : Ranking.getAllHeroList(++page,dogetHeroList);break;
				        	case 8 : Ranking.getAllUserHeroMap(++page,dogetHeroList);break;
				        	case 9 : Ranking.getAllHeroByName(findUnionName.value,++page,dogetHeroList);break;	
				        	}
			        	}
			            console.log("右翻页");  
			        } else if(((824 < lastTouchMoveX) && (lastTouchMoveX < (824 + 84))) && ((579< lastTouchMoveY) && (lastTouchMoveY < (579+26)))){
			        	if(isMyChoose!=10){
				        	switch(isjianshe){
				        	case 1 : Ranking.getBuildMap(doInitRanking);
				        	isMyChoose=10;break;
				        	case 2 : Ranking.getLevelMap(dogetLevelList);
				        	isMyChoose=10;break;
				        	case 3 : Ranking.getReputation(dogetReputationList);
				        	isMyChoose=10;break;
				        	case 4 : Ranking.getfightingMap(dogetFightingList);
				        	isMyChoose=10;break;
				        	case 5 : Ranking.getRechargeMap(dogetRechargeList);
				        	isMyChoose=10;break;
				        	case 6 : Ranking.getAllianceMap(dogetAllianceList);
				        	isMyChoose=10;break;
				        	case 7 : Ranking.getAllUserHeroMap(1,dogetHeroList);
				        	isMyChoose=10; isjianshe=8;break;
				        	case 9 : Ranking.getAllUserHeroMap(1,dogetHeroList);
				        	isMyChoose=10; isjianshe=8;break;
				        	}
			        	}
			        	console.log("我的排行"); 
			        }else if(((1058 < lastTouchMoveX) && (lastTouchMoveX < (1058 + 13))) && ((581< lastTouchMoveY) && (lastTouchMoveY < (581+18)))){
			        	if(page!=pages){
			        		isMyChoose=0;
			        		switch(isjianshe){
				        	case 1 : Ranking.getBuildList(pages,doInitRanking);break;
				        	case 2 : Ranking.getLevelList(pages,dogetLevelList);break;
				        	case 3 : Ranking.getReputationList(pages,dogetReputationList);break;
				        	case 4 : Ranking.getFightingList(pages,dogetFightingList);break;
				        	case 5 : Ranking.getRechargeList(pages,dogetRechargeList);break;
				        	case 6 : Ranking.getAllianceList(pages,dogetAllianceList);break;
				        	case 7 : Ranking.getAllHeroList(pages,dogetHeroList);break;
				        	case 8 : Ranking.getAllUserHeroMap(pages,dogetHeroList);break;
				        	case 9 : Ranking.getAllHeroByName(findUnionName.value,pages,dogetHeroList);break;
				        	}
			        	}
			            console.log("最后页");
			        }else if(((955 < lastTouchMoveX) && (lastTouchMoveX < (955 + 13))) && ((581< lastTouchMoveY) && (lastTouchMoveY < (581+18)))){
			        	if(page!=1){
			        		isMyChoose=0;
			        		switch(isjianshe){
				        	case 1 : Ranking.getBuildList(1,doInitRanking);break;
				        	case 2 : Ranking.getLevelList(1,dogetLevelList);break;
				        	case 3 : Ranking.getReputationList(1,dogetReputationList);break;
				        	case 4 : Ranking.getFightingList(1,page,dogetFightingList);break;
				        	case 5 : Ranking.getRechargeList(1,dogetRechargeList);break;
				        	case 6 : Ranking.getAllianceList(1,dogetAllianceList);break;
				        	case 7 : Ranking.getAllHeroList(1,dogetHeroList);break;
				        	case 8 : Ranking.getAllUserHeroMap(1,dogetHeroList);break;
				        	case 9 : Ranking.getAllHeroByName(findUnionName.value,1,dogetHeroList);break;
				        	}
			        	}
			        
			        	console.log("最前页");
			        }else if(((726 < lastTouchMoveX) && (lastTouchMoveX < (726 + 84))) && ((579< lastTouchMoveY) && (lastTouchMoveY < (581+26)))){
			        	if(findUnionName.value!=""){
			        		  isMyChoose=0;
			        		  switch(isjianshe){
						       	case 1 : Ranking.getBuildByName(findUnionName.value,doInitRanking);break;
					        	case 2 : Ranking.getLevelByName(findUnionName.value,dogetLevelList);break;
					        	case 3 : Ranking.getReputationByName(findUnionName.value,dogetReputationList);break;
					        	case 4 : Ranking.getFightingByName(findUnionName.value,dogetFightingList);break;
					        	case 5 : Ranking.getRechargeByName(findUnionName.value,dogetRechargeList);break;
					        	case 6 : Ranking.getAllianceByName(findUnionName.value,dogetAllianceList);break;
					        	case 7 : Ranking.getAllHeroByName(findUnionName.value,1,dogetHeroList);
					        				isjianshe=9;break;
					        	case 8 : Ranking.getAllHeroByName(findUnionName.value,1,dogetHeroList);
					        				isjianshe=9;break;
					        	case 9 : Ranking.getAllHeroByName(findUnionName.value,1,dogetHeroList);
		        				            isjianshe=9;break;
					           };
			        	}
			        	console.log("根据名称查找"); 
			        }else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352 + 207))) && ((453< lastTouchMoveY) && (lastTouchMoveY < (453+32)))){
			        	  isjianshe = 6;
			        	  isMyChoose=0;
			        	  backGround = "ph_zjm_02";
			        	  Ranking.getAllianceList(1,dogetAllianceList);
			        	console.log("联盟排行");
			        }else if(((352 < lastTouchMoveX) && (lastTouchMoveX < (352 + 207))) && ((453+32< lastTouchMoveY) && (lastTouchMoveY < (453+32+32)))){
			        	 isjianshe = 7;
			        	 isMyChoose=0;
			        	 backGround = "ph_zjm_03";
			        	 Ranking.getAllHeroList(1,dogetHeroList);
			        	console.log("武将排行");
			        }else if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height))){
						displayDestroy();
						exit(index);				
//						enterCityMenu(curGroup);
						curGroup = 'cityMenu';
	                    changeMap(_layer);	
					}
					else{
						commandBuildBtn(lotIndex,"排行榜");
						paihang(getClickObjectIndex(),_group,_layer);
					    changeMap(_layer);		
					}					
				},
				blit : function(){
					 if(isDrawUI[index] && ispaihang)
					 {
					 	gbox.drawImage(backGround,backdropX,backdropY);
					 	gbox.drawImage('ty_an_27',backdropX1,backdropY1 + 4);
                         if( backGround == "ph_zjm_01"){
        					    gbox.drawImage('ph_zjm_16',352,254);
        					    if(((352 < touchMoveX) && (touchMoveX < (352 + 207))) && ((254 < touchMoveY) && (touchMoveY < (254 + 32))))
        			            {
        			                gbox.drawImage('ph_zjm_17',352,254);	               
        			            }
        					    gbox.drawImage('ph_zjm_10',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_10').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_10').height)/2);
        					    gbox.drawImage('ph_zjm_30',352,253+34);// 
        					    gbox.drawImage('ph_zjm_30',352,253+34+34);//			    
        					    gbox.drawImage('ph_zjm_30',352,253+34+34+33);//			    
        					    gbox.drawImage('ph_zjm_30',352,253+34+34+33+33);//	    
        					    gbox.drawImage('ph_zjm_30',352,253+34+34+33+33+33);//			    
        					    gbox.drawImage('ph_zjm_16',352,253+34+34+33+33+33+33);
        					    if(((352 < touchMoveX) && (touchMoveX < (352 + 207))) && ((453 < touchMoveY) && (touchMoveY < (453 + 32))))
        			            {
        			                gbox.drawImage('ph_zjm_17',352,453);	               
        			            }
        					    gbox.drawImage('ph_zjm_11',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_11').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_11').height)/2+35+33+33+33+33+33);
        					    
        					    
        					    gbox.drawImage('ph_zjm_16',352,253+34+34+33+33+33+33+33);
        					    if(((352 < touchMoveX) && (touchMoveX < (352 + 207))) && ((486 < touchMoveY) && (touchMoveY < (486 + 32))))
        			            {
        			                gbox.drawImage('ph_zjm_17',352,486);	               
        			            }
        					    gbox.drawImage('ph_zjm_13',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_13').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_13').height)/2+35+33+33+33+33+33+33);
        					    var fontW = gbox.getTextWidth("建设值",14);
						 		var dx = 351 + (207 - fontW)/2;
							 	var dy = 287 + (34 - 14)/2;
        			            gbox.drawText('建设值',dx,dy,15);
        			            var fontW = gbox.getTextWidth("等级",14);
						 		var dx = 351 + (207 - fontW)/2;
							 	var dy = 322 + (34 - 14)/2;
        			            gbox.drawText('等级',dx,dy,15);
        		                var fontW = gbox.getTextWidth("声望",14);
						 		var dx = 351 + (207 - fontW)/2;
							 	var dy = 355 + (34 - 14)/2;
        			            gbox.drawText('声望',dx,dy,15);
        			            var fontW = gbox.getTextWidth("战力",14);
						 		var dx = 351 + (207 - fontW)/2;
							 	var dy = 387 + (34 - 14)/2;
        			            gbox.drawText('战力',dx,dy,15);
        		                var fontW = gbox.getTextWidth("充值金锭",14);
						 		var dx = 351 + (207 - fontW)/2;
							 	var dy = 420 + (34 - 14)/2;
        			            gbox.drawText('充值金锭',dx,dy,15);
        		               
        		                gbox.drawImage('ty_an_01',364,292);
    			            	gbox.drawImage('ty_an_01',364,252+35+35);
    			            	gbox.drawImage('ty_an_01',364,252+35+35+35);
    			            	gbox.drawImage('ty_an_01',364,252+35+35+35+35);
    			            	gbox.drawImage('ty_an_01',364,252+35+35+35+35+35);



        					    
                         }else {
       					    gbox.drawImage('ph_zjm_16',352,254);
       					    if(((352 < touchMoveX) && (touchMoveX < (352 + 207))) && ((254 < touchMoveY) && (touchMoveY < (254 + 32))))
       			            {
       			                gbox.drawImage('ph_zjm_17',352,254);	               
       			            }
       					    gbox.drawImage('ph_zjm_10',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_10').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_10').height)/2);
       					  
    					    gbox.drawImage('ph_zjm_16',352,253+34);
    					    if(((352 < touchMoveX) && (touchMoveX < (352 + 207))) && ((287 < touchMoveY) && (touchMoveY < (287 + 32))))
    			            {
    			                gbox.drawImage('ph_zjm_17',352,253+34);	               
    			            }
    					    gbox.drawImage('ph_zjm_11',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_11').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_11').height)/2+34);
    					    
    					    gbox.drawImage('ph_zjm_16',352,253+34+34);
    					    if(((352 < touchMoveX) && (touchMoveX < (352 + 207))) && ((321 < touchMoveY) && (touchMoveY < (321 + 32))))
    			            {
    			                gbox.drawImage('ph_zjm_17',352,321);	               
    			            }
    					    gbox.drawImage('ph_zjm_13',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_13').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_13').height)/2+34+34);
     					   
                         }
                         
                        gbox.drawImage('ty_an_09',726,579);
                        var strW = gbox.getTextWidth("查  找",14);
					    var cntX = 726 + (84 - strW)/2;
					    var cntY = 579 + (26 - 14)/2;
				        gbox.drawText("查  找", cntX,cntY,10);
                         
//					    if(((844 < touchMoveX) && (touchMoveX < 928)) && ((578 < touchMoveY) && (touchMoveY < 604)))
//					    {
					    	gbox.drawImage('ty_an_09',824,579);	 
//					    }
					    var strW = gbox.getTextWidth("我的排行",14);
					    var cntX = 824 + (84 - strW)/2;
					    var cntY = 579 + (26 - 14)/2;
				        gbox.drawText("我的排行", cntX,cntY,10);
				        
				    	var bW2 = gbox.getImage('ph_zjm_19').width;
//				    	var bH2 = gbox.getImage('ph_zjm_19').height;
				        gbox.drawImage('ph_zjm_19',352+(bW-bW2)/2,144);
					    
			            
			            gbox.drawImage('ty_an_24',1042 ,581);
			            gbox.drawImage('ty_an_25',972,581);
			            
			            gbox.drawImage('ty_an_51',1058 ,581);
			            gbox.drawImage('ty_an_52',955,581);
			          

//			            console.log(isjianshe); 
			            if(isjianshe==1){
			            	gbox.drawImage('ph_zjm_18',352,252);
			            	gbox.drawImage('ph_zjm_15',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_10').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_10').height)/2);
			            	gbox.drawImage('ph_zjm_04',823,182);
			            	gbox.drawImage('ty_an_38',364,292);
//			                gbox.drawDanceString('建设值',352+(gbox.getImage('ph_zjm_30').width-gbox.getImage('ph_zjm_22').width)/2,252+(gbox.getImage('ph_zjm_30').height-gbox.getImage('ph_zjm_22').height)/2+35,14,'#000000','#ffffff');
			            }
			            if(isjianshe==2){
//			            	gbox.drawImage('ph_zjm_32',352,252+34+34);
			             	gbox.drawImage('ph_zjm_18',352,252);
			            	gbox.drawImage('ph_zjm_15',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_10').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_10').height)/2);
			            	//gbox.drawImage('ph_zjm_05',823,182);
			            	gbox.drawImage('ty_an_38',364,252+35+35);
			            }
			            if(isjianshe==3){
//			            	gbox.drawImage('ph_zjm_32',352,252+34+34+34);	 
			            	gbox.drawImage('ph_zjm_18',352,252);
			            	gbox.drawImage('ph_zjm_15',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_10').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_10').height)/2);
			            	gbox.drawImage('ph_zjm_07',823,182);
			            	gbox.drawImage('ty_an_38',364,252+35+35+35);
			            }
			            if(isjianshe==4){
//			            	gbox.drawImage('ph_zjm_32',352,252+34+34+34+34);	 
			            	gbox.drawImage('ph_zjm_18',352,252);
			            	gbox.drawImage('ph_zjm_15',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_10').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_10').height)/2);
			            	gbox.drawImage('ph_zjm_06',823,182);
			            	gbox.drawImage('ty_an_38',364,252+35+35+35+35);
			            }
			            if(isjianshe==5){
//			             	gbox.drawImage('ph_zjm_32',352,252+34+34+34+34+34);	 
			            	gbox.drawImage('ph_zjm_18',352,252);
			            	gbox.drawImage('ph_zjm_15',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_10').width)/2,252+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_10').height)/2);
			            	gbox.drawImage('ph_zjm_09',823,182);
			            	gbox.drawImage('ty_an_38',364,252+35+35+35+35+35);
			            }
			            if(isjianshe==6){
			             	gbox.drawImage('ph_zjm_18',352,287);
			            	gbox.drawImage('ph_zjm_12',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_12').width)/2,287+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_12').height)/2);
			            }
			            if(isjianshe==7){
			             	gbox.drawImage('ph_zjm_18',352,321);
			            	gbox.drawImage('ph_zjm_14',352+(gbox.getImage('ph_zjm_16').width-gbox.getImage('ph_zjm_14').width)/2,321+(gbox.getImage('ph_zjm_16').height-gbox.getImage('ph_zjm_14').height)/2);
			            }
			            if(typeof(buildData) != "undefined"&&isjianshe==1){
			            	
					        	for(var i=0; i<buildData.length;i++){
					        		    var strW = gbox.getTextWidth(buildData[i].rowNum,14);
										var cntX = 564 + (57 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(buildData[i].rowNum,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(buildData[i].country,14);
										var cntX = 623 + (46 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(buildData[i].country,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(buildData[i].name,14);
										var cntX = 672 + (148 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(buildData[i].name,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(buildData[i].numerical,14);
					        			var cntX = 823 + (100 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(buildData[i].numerical,cntX, cntY+ (i*32),2);
					        			
					        			gbox.drawImage('ty_an_66',576+200+95+70,209 + (i*32));
					        			gbox.drawImage('ty_an_57',576+200+95+100,209 + (i*32));
					        			gbox.drawImage('ty_an_76',576+200+95+130,209 + (i*32));
					        			gbox.drawImage('ty_an_62',576+200+95+160,209 + (i*32));
					        			gbox.drawImage('ty_an_65',576+200+95+190,209 + (i*32));
					        	}
					        	gbox.drawString("" + page+"/"+pages,998, 583,'#FFFFFF',16);
				        }
			            if(typeof(levelData) != "undefined"&&isjianshe==2){
				            	for(var i=0;i<levelData.length;i++){
				            		    var strW = gbox.getTextWidth(levelData[i].rowNum,14);
										var cntX = 564 + (57 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(levelData[i].rowNum,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(levelData[i].country,14);
										var cntX = 623 + (46 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(levelData[i].country,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(levelData[i].name,14);
										var cntX = 672 + (148 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(levelData[i].name,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(levelData[i].level,14);
					        			var cntX = 823 + (100 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(levelData[i].level,cntX, cntY+ (i*32),2);
					        						        			
					        			gbox.drawImage('ty_an_66',576+200+95+70,209 + (i*32));
					        			gbox.drawImage('ty_an_57',576+200+95+100,209 + (i*32));
					        			gbox.drawImage('ty_an_76',576+200+95+130,209 + (i*32));
					        			gbox.drawImage('ty_an_62',576+200+95+160,209 + (i*32));
					        			gbox.drawImage('ty_an_65',576+200+95+190,209 + (i*32));
					            	
				            	}
				            	gbox.drawString("" + page+"/"+pages,998, 583,'#FFFFFF',16);
			            }
			            if(typeof(reputationData) != "undefined"&&isjianshe==3){
			            	for(var i=0;i<reputationData.length;i++){
			            		        
			            		        var strW = gbox.getTextWidth(reputationData[i].rowNum,14);
										var cntX = 564 + (57 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(reputationData[i].rowNum,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(reputationData[i].country,14);
										var cntX = 623 + (46 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(reputationData[i].country,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(reputationData[i].name,14);
										var cntX = 672 + (148 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(reputationData[i].name,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(reputationData[i].reputation,14);
					        			var cntX = 823 + (100 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(reputationData[i].reputation,cntX, cntY+ (i*32),2);
					        			
			            		       
					        			
					        			gbox.drawImage('ty_an_66',576+200+95+70,209 + (i*32));
					        			gbox.drawImage('ty_an_57',576+200+95+100,209 + (i*32));
					        			gbox.drawImage('ty_an_76',576+200+95+130,209 + (i*32));
					        			gbox.drawImage('ty_an_62',576+200+95+160,209 + (i*32));
					        			gbox.drawImage('ty_an_65',576+200+95+190,209 + (i*32));
				            		
			            	}
			            	gbox.drawString("" + page+"/"+pages,998, 583,'#FFFFFF',16);
		                }        
			            if(typeof(fightingData) != "undefined"&&isjianshe==4){

			            	for(var i=0;i<fightingData.length;i++){
			           
					        			var strW = gbox.getTextWidth(fightingData[i].rowNum,14);
										var cntX = 564 + (57 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(fightingData[i].rowNum,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(fightingData[i].characterCountry,14);
										var cntX = 623 + (46 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(fightingData[i].characterCountry,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(fightingData[i].characterName,14);
										var cntX = 672 + (148 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(fightingData[i].characterName,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(fightingData[i].fighting,14);
					        			var cntX = 823 + (100 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(fightingData[i].fighting,cntX, cntY+ (i*32),2);
					        			
					        			gbox.drawImage('ty_an_66',576+200+95+70,209 + (i*32));
					        			gbox.drawImage('ty_an_57',576+200+95+100,209 + (i*32));
					        			gbox.drawImage('ty_an_76',576+200+95+130,209 + (i*32));
					        			gbox.drawImage('ty_an_62',576+200+95+160,209 + (i*32));
					        			gbox.drawImage('ty_an_65',576+200+95+190,209 + (i*32));
				            		
			            	}
			            	gbox.drawString("" + page+"/"+pages,998, 583,'#FFFFFF',16);
		                }
			            if(typeof(rechargeData) != "undefined"&&isjianshe==5){
			            	for(var i=0;i<rechargeData.length;i++){
			            		        var strW = gbox.getTextWidth(rechargeData[i].rowNum,14);
										var cntX = 564 + (57 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(rechargeData[i].rowNum,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(rechargeData[i].country,14);
										var cntX = 623 + (46 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(rechargeData[i].country,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(rechargeData[i].name,14);
										var cntX = 672 + (148 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(rechargeData[i].name,cntX, cntY+ (i*32),2);
					        			var strW = gbox.getTextWidth(rechargeData[i].cash,14);
					        			var cntX = 823 + (100 - strW)/2;
										var cntY = 204 + (32 - 14)/2;
					        			gbox.drawText(rechargeData[i].cash,cntX, cntY+ (i*32),2);
				            		
				        			    gbox.drawImage('ty_an_66',576+200+95+70,209 + (i*32));
					        			gbox.drawImage('ty_an_57',576+200+95+100,209 + (i*32));
					        			gbox.drawImage('ty_an_76',576+200+95+130,209 + (i*32));
					        			gbox.drawImage('ty_an_62',576+200+95+160,209 + (i*32));
					        			gbox.drawImage('ty_an_65',576+200+95+190,209 + (i*32));
			            	}
			            	gbox.drawString("" + page+"/"+pages,998, 583,'#FFFFFF',16);
		                }
					    if(typeof(allianceData) != "undefined"&&isjianshe==6){
					    	for(var i=0;i<allianceData.length;i++){
					    		 var strW = gbox.getTextWidth(allianceData[i].rowNum,14);
								 var cntX = 564 + (57 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(allianceData[i].rowNum,cntX, cntY+ (i*32),2);
			            		 var strW = gbox.getTextWidth(allianceData[i].country,14);
								 var cntX = 626 + (33 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(allianceData[i].country,cntX, cntY+ (i*32),2);
					        	 var strW = gbox.getTextWidth(allianceData[i].name,14);
								 var cntX = 662 + (118 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(allianceData[i].name,cntX, cntY+ (i*32),2);
			        			 var strW = gbox.getTextWidth(allianceData[i].chief,14);
								 var cntX = 783 + (119 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(allianceData[i].chief,cntX, cntY+ (i*32),2);
			        			 var strW = gbox.getTextWidth(allianceData[i].level,14);
								 var cntX = 905 + (36 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(allianceData[i].level,cntX, cntY+ (i*32),2);
			        			 var strW = gbox.getTextWidth(allianceData[i].amount,14);
								 var cntX = 945 + (36 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(allianceData[i].amount,cntX, cntY+ (i*32),2);
			        		     var strW = gbox.getTextWidth(allianceData[i].ownCountry,14);
								 var cntX = 986 + (36 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(allianceData[i].ownCountry,cntX, cntY+ (i*32),2);
			        			 var strW = gbox.getTextWidth(allianceData[i].wealth,14);
								 var cntX = 1024 + (78 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(allianceData[i].wealth,cntX, cntY+ (i*32),2);
			        			
			        			
			        			
		            	}
		            	gbox.drawString("" + page+"/"+pages,998, 583,'#FFFFFF',16);
					    }
					    if(typeof(heroData) != "undefined"&&isjianshe==7||isjianshe==8||isjianshe==9){
					    	for(var i=0;i<heroData.length;i++){
					    		 var strW = gbox.getTextWidth(heroData[i].rowNum,14);
								 var cntX = 563 + (70 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(heroData[i].rowNum,cntX, cntY+ (i*32),2);
					        	 
					        	 var strW = gbox.getTextWidth(heroData[i].heroName,14);
								 var cntX = 636 + (126 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(heroData[i].heroName,cntX, cntY+ (i*32),2);
					        	 
					        	 var strW = gbox.getTextWidth(heroData[i].level,14);
			            		 var cntX = 764 + (65 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(heroData[i].level,cntX, cntY+ (i*32),2);
					        	 
					        	 var strW = gbox.getTextWidth(heroData[i].fighting,14);
			        			 var cntX = 832 + (65 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(heroData[i].fighting,cntX, cntY+ (i*32),2);
					        	 
					        	 var strW = gbox.getTextWidth(heroData[i].characterName,14);
			        			 var cntX = 899 + (125 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(heroData[i].characterName,cntX, cntY+ (i*32),2);
					        	 
					        	 var strW = gbox.getTextWidth(heroData[i].characterCountry,14);
			        			 var cntX = 1028 + (74 - strW)/2;
								 var cntY = 204 + (30 - 14)/2;
					        	 gbox.drawText(heroData[i].characterCountry,cntX, cntY+ (i*32),2);
			        			
			        			
			        			
		            	}
		            	gbox.drawText(page+"/"+pages,998, 583,10);
					    }
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
};
//建设值排行
var buildData = new Array();
var buildInfo = new Array();
var page;
var pages;
function doInitRanking(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return; 
	}
    page =data.page;
    pages =data.pages;
    buildData.splice(0, buildData.length);
	for(var i=0;i<data.retList.length;i++){
			buildData[i] = {
				    name:data.retList[i].name,//君主名
				    numerical:data.retList[i].numerical,//建设值
				    rowNum:data.retList[i].rowNum,//名次
				    country:data.retList[i].country,//国家
		             };
         }
	console.log("com_group = " + com_group);
	console.log("com_layer = " + com_layer);
	paihang(getClickObjectIndex(),com_group,com_layer);
	changeMap(com_layer);	
	
}
//君主等级排行
var levelData = new Array();
function dogetLevelList(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	page = data.page;
	pages = data.pages;
	levelData.splice(0, levelData.length);
    for(var i=0;i<data.retList.length;i++){
    	levelData[i] = {
    			id:data.retList[i].id,//君主id 
    			name:data.retList[i].name,//君主名
    			level:data.retList[i].level,//等级
    			rowNum:data.retList[i].rowNum,//名次
    			country:data.retList[i].country,//国家		
    	};
   };
    
}
//声望排行
var reputationData = new Array();
function dogetReputationList(data){
	if(typeof(data.error)!="undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	page = data.page;
	pages = data.pages;
	reputationData.splice(0, reputationData.length);
	for(var i=0;i<data.retList.length;i++){
		reputationData[i] = {
				name:data.retList[i].name,//君主名
				reputation:data.retList[i].reputation,//声望
    			rowNum:data.retList[i].rowNum,//名次
    			country:data.retList[i].country,//国家	
		};
	};
};
//战力排行
var fightingData = new Array();
function dogetFightingList(data){
	if(typeof(data.error)!="undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	page = data.page;
	pages = data.pages;
	fightingData.splice(0, fightingData.length);
	//console.log("data == " + data.retList);
	//console.log("======" + data.retList.length);
	for(var i=0;i<data.retList.length;i++){
		fightingData[i] = {
				characterName:data.retList[i].characterName,//君主名
				fighting:data.retList[i].fighting,//战力
    			rowNum:data.retList[i].rowNum,//名次
    			characterCountry:data.retList[i].characterCountry,//国家	
		};
	}
}
//充值排行
var rechargeData = new Array();
function dogetRechargeList(data){
	if(typeof(data.error)!="undefined"){
		alert("系统提示" +data.error);
		return;
	};
	page = data.page;
	pages = data.pages;
	rechargeData.splice(0,rechargeData.length);
	for(var i=0;i<data.retList.length;i++){
		rechargeData[i] = {
				name:data.retList[i].name,//君主名
				cash:data.retList[i].cash,//点卷
    			rowNum:data.retList[i].rowNum,//名次
    			country:data.retList[i].country,//国家	
		};
	};
};
//联盟排行
var allianceData = new Array();
function dogetAllianceList(data){
	if(typeof(data.error)!="undefined"){
		alert("系统提示 : " +data.error);
		return;
	};
	page = data.page;
	pages = data.pages;
	allianceData.splice(0,allianceData.length);
	for(var i=0;i<data.retList.length;i++){
		allianceData[i]={
				ownCountry:data.retList[i].ownCountry,
				amount:data.retList[i].amount,
				level:data.retList[i].level,
				name:data.retList[i].name,
				wealth:data.retList[i].wealth,
				rowNum:data.retList[i].rowNum,
				chief:data.retList[i].chief,
				country:data.retList[i].country,
		};
	};
};
//武将排行
var heroData = new Array();
function dogetHeroList(data){
	if(typeof(data.error)!="undefined"){
		alert("系统提示 : " +data.error);
		return;
	};
	page = data.page;
	pages = data.pages;
	heroData.splice(0,heroData.length);
	for(var i=0;i<data.retList.length;i++){
		heroData[i]={
				characterName : data.retList[i].characterName,
				level:data.retList[i].level,
				heroName:data.retList[i].heroName,
				characterCountry:data.retList[i].characterCountry,
				fighting:data.retList[i].fighting,
				rowNum:data.retList[i].rowNum,
		};
	}
}