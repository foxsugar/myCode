/*
 * 兵营
 */
var isJunying = false;
var jyPassIconIndex = 0;
var xunValue = 1;
var jyListIndex = 0;
var jyTimeInterval = null;
 var jyItem = ["jyitem"];
var junying = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJunying = true;
	isJyList = true;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	var bW = gbox.getImage('by_zjm_01').width;
	var bH = gbox.getImage('by_zjm_01').height;
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
				id : 'junying',
				group : 'levelMenu_2',
				tileset : 'by_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					if(divjyxunNum == null && !gbox._isIndwellDiv("divjyxunNum","input"))
					{
						divjyxunNum = addDivWindowBg(953,565);
						divjyxunNum.id = 'divjyxunNum';
						document.body.appendChild(divjyxunNum);
						jyAuctionNum = document.createElement("input");
						jyAuctionNum.style.id = 'jyxunNum';
						jyAuctionNum.style.backgroundColor = '#000000';
						jyAuctionNum.style.width = '52px';
						jyAuctionNum.style.color = '#ffffff';
						jyAuctionNum.value = xunValue;
			            divjyxunNum.appendChild(jyAuctionNum);            
					}
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(divjyxunNum,"divjyxunNum",953);
					/*======================================================*/		
					jyAuctionNum.value = jyAuctionNum.value.replace(/\D/g,'');
					xunValue = jyAuctionNum.value;
					
					if(jyRemainTime ==  "00:00:00"){
						if(jyTimeInterval != null){
							clearInterval(jyTimeInterval);
							jyCnt = 0;
							jyTimeInterval = null;
							jyRemainTime =  "等待刷新！";
						}
						BuildingFunction.initBarracks(doInitBarracks);
					}
				},
				myclick : function()
				{
			    	if(lastTouchMoveX > 932 && lastTouchMoveX < (932 + 12) && lastTouchMoveY > 570 && lastTouchMoveY < (570 + 19)){
			    		xunValue = 1;
			    		jyAuctionNum.value = 1;   
				        junying(getClickObjectIndex());
				        junyyingList(getClickObjectIndex());
				        changeMap('cityMenuLayer');
			    	}else 
			    	if(lastTouchMoveX > 1012 && lastTouchMoveX < (1012 + 12) && lastTouchMoveY > 570 && lastTouchMoveY < (570 + 19)){
			    		if(typeof(summaryData) != "undefined" && 
			    				  typeof(techSoldier) != "undefined" &&
			    				  typeof(techSoldier[jyPassIconIndex]) != "undefined"){
			    			
			    			if(resourceData.money > techSoldier[jyPassIconIndex].needMoney && 
			    			   resourceData.food > techSoldier[jyPassIconIndex].needFood &&
			    			   resourceData.ferrum > techSoldier[jyPassIconIndex].needIronore &&
			    			   
			    			   summaryData.newSoldier > jyAuctionNum.value ){
					    		var R1 = new Array();
					    		var needMoney = 1;
					    		if(techSoldier[jyPassIconIndex].needMoney <=0)
					    			needMoney = 1;
					    		else
					    			needMoney = techSoldier[jyPassIconIndex].needMoney;
					    		
					    		R1[0] = resourceData.money/needMoney;
					    		
					    		var needFood = 1;
					    		if(techSoldier[jyPassIconIndex].needFood <=0)
					    			needFood = 1;
					    		else
					    			needFood = techSoldier[jyPassIconIndex].needFood;
					    		R1[1] = resourceData.food/needFood;
					    		
					    		var needIronore = 1;
					    		if(techSoldier[jyPassIconIndex].needIronore <=0)
					    			needIronore = 1;
					    		else
					    			needIronore = techSoldier[jyPassIconIndex].needIronore;
					    		
					    		R1[2] = resourceData.ferrum/needIronore;
					    		
					    		if(xunValue <= 0)
					    			xunValue = 1;
					    		
					    		R1[3] = summaryData.newSoldier/xunValue;	
					    		jyAuctionNum.value = BubbleSort2(R1);	
					    		xunValue = jyAuctionNum.value;				    				
			    			}else{
					    		xunValue = 1;
					    		jyAuctionNum.value = 1;
//			    				alert("超出训练数量上限！");
			    			}
			    		}
				        junying(getClickObjectIndex());
				        junyyingList(getClickObjectIndex());
				        changeMap('cityMenuLayer');
			    	}else
			    	if(((lastTouchMoveX > 1041) && (lastTouchMoveX < 1092)) && ((lastTouchMoveY > 567) && (lastTouchMoveY<593)))
			    	{
			    		if(typeof(summaryData) != "undefined" && 
			    				  typeof(techSoldier) != "undefined" &&
			    				  typeof(techSoldier[jyPassIconIndex]) != "undefined"){
			    			//console.log("(summaryData.army + xunValue) ================= " + (parseInt(summaryData.army) + parseInt(xunValue)));
			    			if((parseInt(summaryData.army) + parseInt(xunValue)) <= summaryData.armyLimit){
			    				BuildingFunction.recruitSoldier(techSoldier[jyPassIconIndex].soldierNo,jyAuctionNum.value,doRecruitSoldier);
			    			}else{
			    				xunValue = jyAuctionNum.value = (parseInt(summaryData.armyLimit) - parseInt(summaryData.army));
			    				if(xunValue <= 0){
			    					xunValue = jyAuctionNum.value = 1;
			    				}
//			    				alert("超出总兵数上限！");
			    			}
			    		}
				        junying(getClickObjectIndex());
				        junyyingList(getClickObjectIndex());
				        changeMap('cityMenuLayer');
			    		
			    	}else
				    if(((485 < lastTouchMoveX) && (lastTouchMoveX < (485+15))) && ((377 < lastTouchMoveY) && (lastTouchMoveY < (377+18))))
				    {
				        junying(getClickObjectIndex());
				        junyyingList(getClickObjectIndex());
				        zhaomu(getClickObjectIndex());
				        changeMap('cityMenuLayer');
					}else	
					  if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
					  {
							displayDestroy();
							
							if(jyTimeInterval != null){
								clearInterval(jyTimeInterval);
								jyCnt = 0;
								jyTimeInterval = null;
								jyRemainTime =  "等待刷新！";
							}
							
							exit(index);
							curGroup = 'cityMenu';
							enterCityMenu(curGroup);
		                    changeMap('cityMenuLayer');	
					   }
			           else
					   {
					    	if(jyRemainTime != "等待刷新！"){
					            if(((487 < lastTouchMoveX) && (lastTouchMoveX < (487 + 18))) && ((347 < lastTouchMoveY) && (lastTouchMoveY < (347 + 18))))
					            {
					            	systemSpeedup(index,"训练士兵");
                                    console.log("兵营加速");       
					            }
					            if(((509 < lastTouchMoveX) && (lastTouchMoveX < (509 + 18))) && ((348 < lastTouchMoveY) && (lastTouchMoveY < (348 + 18))))
					            {
					            	BuildingFunction.cancelRecruit(doCancelRecruit);
					            	console.log("取消");  
					            }
					    	}
			        	   commandBuildBtn(lotIndex,"建筑加速");
								if(divjinjieNum != null && gbox._isIndwellDiv("divjinjieNum","input")){
						            document.body.removeChild(divjinjieNum);  
						            divjinjieNum = null;  				            
							    }
								if(divQiansanNum != null && gbox._isIndwellDiv("divQiansanNum","input")){
						            document.body.removeChild(divQiansanNum);  
						            divQiansanNum = null;  				            
							    }
								if(divZMNum != null && gbox._isIndwellDiv("divZMNum","input")){
							        document.body.removeChild(divZMNum);  
							        divZMNum = null;  				            
							    }
								
				    			if(lastTouchMoveX > (548 + (0*110)) && lastTouchMoveX < ((548 + (0*110)) + 96) && lastTouchMoveY > 286 && lastTouchMoveY < (286 + 131)){
				    				jyPassIconIndex = 0;
				    			}
					    		if(lastTouchMoveX > (548 + (1*110)) && lastTouchMoveX < ((548 + (1*110)) + 96) && lastTouchMoveY > 286 && lastTouchMoveY < (286 + 131)){
					    			jyPassIconIndex = 1;
					    		}
						    	if(lastTouchMoveX > (548 + (2*110)) && lastTouchMoveX < ((548 + (2*110)) + 96) && lastTouchMoveY > 286 && lastTouchMoveY < (286 + 131)){
						    		jyPassIconIndex = 2;
						    	}	
						    	if(lastTouchMoveX > (548 + (3*110)) && lastTouchMoveX < ((548 + (3*110)) + 96) && lastTouchMoveY > 286 && lastTouchMoveY < (286 + 131)){
						    		jyPassIconIndex = 3;
						    	}
						    	if(lastTouchMoveX > (548 + (4*110)) && lastTouchMoveX < ((548 + (4*110)) + 96) && lastTouchMoveY > 286 && lastTouchMoveY < (286 + 131)){
						    		jyPassIconIndex = 4;
						    	}
								
								isJinjie = false;
								isQiansan = false;
								isZM = false;
								junying(getClickObjectIndex());
								junyyingList(getClickObjectIndex());
								changeMap('cityMenuLayer');		
						 }
			    	
			        
				},
				blit : function()
				{
					 if(isDrawUI[index]/* && isJyList */&& isJunying)
					 {
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'by_zjm_01',
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
									dy :backdropY1 +2,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							     });
					    gbox.drawImage('by_zjm_02',(gbox.getImage('by_zjm_01').width - gbox.getImage("by_zjm_02").width)/2 + backdropX,backdropY1);
					    if(typeof(summaryData) != "undefined"){
						    gbox.drawText(summaryData.newSoldier + "/" + summaryData.newSoldierLimit,414,373,2);
						    gbox.drawText(summaryData.army + "/" + summaryData.armyLimit,414,400,2);		
		    				gbox.drawText(summaryData.newSoldier,1028,539,8);
		    				
						    var fontW4 = gbox.getTextWidth(xunValue,12);
						    var xvX4 = 931 + (80 - fontW4)/2;
		    				if(xunValue <= summaryData.newSoldier){
		    					gbox.drawText(xunValue,xvX4,539,8,2);
		    				}else{
		    					gbox.drawText(xunValue,xvX4,539,8,6);
		    				}
					    }
                        var xCoord = [560,671,779,890,999];
					    if(typeof(techSoldier) != "undefined"){
					    	for(var i=0; i<techSoldier.length; i++){
					    		if(typeof(techSoldier[i]) != "undefined"){
					    			gbox.drawImage(techSoldier[i].imageName,xCoord[i],292);
					    			gbox.drawText( techSoldier[i].soldierName,xCoord[i] + 12,388,13);
						    		if(!techSoldier[i].canRecruit){
						    	        var rectW = 70;		
						    	        var rectH = 94;					
						    			var rect = new Rect(xCoord[i],292,rectW,rectH);
						    			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
						    		}
					    		}
					    	}
					    	if(typeof(train) != 'undefined' && typeof(train.soldierName) != 'undefined'){
					    		gbox.drawText(train.soldierName,414,317,2);
					    	}else
					    		gbox.drawText("无",414,317,2);
					    	
					    	gbox.drawText(jyRemainTime,414,344,2);
					    	
					    	if(jyRemainTime != "等待刷新！"){
					            gbox.drawImage("ty_an_123",487,342);
					            if(((487 < touchMoveX) && (touchMoveX < (487 + 18))) && ((342 < touchMoveY) && (touchMoveY < (342 + 18))))
					            {
					               gbox.drawImage('ty_an_124',487,342);						 			               
					            }
					            gbox.drawImage("ty_an_125",509,343);
					            if(((509 < touchMoveX) && (touchMoveX < (509 + 18))) && ((343 < touchMoveY) && (touchMoveY < (343 + 18))))
					            {
					               gbox.drawImage('ty_an_126',509,343);						 			               
					            }
					    	}
					    	
			    			if(techSoldier[jyPassIconIndex] != null && 
			    					typeof(techSoldier[jyPassIconIndex]) != "undefined")
			    			{
			    				gbox.drawImage("by_zjm_13",552 + (jyPassIconIndex*110),286);
			    				//兵种属性
			    				//兵种名称
			    				gbox.drawText(techSoldier[jyPassIconIndex].soldierName,596,453,8);
			    				//生命
			    				if(typeof(techSoldier[jyPassIconIndex].addHealth) != 'undefined' && techSoldier[jyPassIconIndex].addHealth > 0){
			    					gbox.drawText(techSoldier[jyPassIconIndex].soldierHp + "( +"+techSoldier[jyPassIconIndex].addHealth+")",596,482,8,6);
			    				}
			    				gbox.drawText(techSoldier[jyPassIconIndex].soldierHp,596,482,8);
			    				//攻击
			    				if(typeof(techSoldier[jyPassIconIndex].addAtk) != 'undefined' && techSoldier[jyPassIconIndex].addAtk > 0){
			    					gbox.drawText(techSoldier[jyPassIconIndex].soldierAttack + "( +"+techSoldier[jyPassIconIndex].addAtk+")",596,512,8,6);
			    				}
			    				gbox.drawText(techSoldier[jyPassIconIndex].soldierAttack,596,512,8);

			    				//命中
			    				if(typeof(techSoldier[jyPassIconIndex].addHit) != 'undefined' && techSoldier[jyPassIconIndex].addHit > 0){
			    					gbox.drawText(techSoldier[jyPassIconIndex].soldierHit + "( +"+techSoldier[jyPassIconIndex].addHit+")",596,541,8,6);
			    				}
			    				gbox.drawText(techSoldier[jyPassIconIndex].soldierHit,596,541,8);
			    				
			    				//回避
			    				if(typeof(techSoldier[jyPassIconIndex].addDodge) != 'undefined' && techSoldier[jyPassIconIndex].addDodge > 0){
			    					gbox.drawText(techSoldier[jyPassIconIndex].soldierDodge + "( +"+techSoldier[jyPassIconIndex].addDodge+")",596,570,8,6);
			    				}
			    				gbox.drawText(techSoldier[jyPassIconIndex].soldierDodge,596,570,8);
			    				
			    				//等级
			    				gbox.drawText(techSoldier[jyPassIconIndex].soldierLevel,748,453,8);

			    				//防御
			    				if(typeof(techSoldier[jyPassIconIndex].addDef) != 'undefined' && techSoldier[jyPassIconIndex].addDef > 0){
			    					gbox.drawText(techSoldier[jyPassIconIndex].soldierDefence + "( +"+techSoldier[jyPassIconIndex].addDef+")",748,482,8,6);
			    				}
			    				gbox.drawText(techSoldier[jyPassIconIndex].soldierDefence,748,482,8);

			    				//射程
			    				gbox.drawText(techSoldier[jyPassIconIndex].minRange + "/" + techSoldier[jyPassIconIndex].maxRange,748,512,8);
			    				//暴击
			    				if(typeof(techSoldier[jyPassIconIndex].addCrt) != 'undefined' && techSoldier[jyPassIconIndex].addCrt > 0){
			    					gbox.drawText(techSoldier[jyPassIconIndex].soldierCritical + "( +"+techSoldier[jyPassIconIndex].addCrt+")",748,541,8);
			    				}
			    				gbox.drawText(techSoldier[jyPassIconIndex].soldierCritical,748,541,8);
			    				//机动
			    				gbox.drawText(techSoldier[jyPassIconIndex].mobility,748,570,8);
			    				
			    				
			    				//兵种消耗的资源
							    if(typeof(resourceData) != "undefined"){
							    	//说明
							    	gbox.drawText("铜币",882,453,8);
				    				gbox.drawText("粮食",882,482,8);
				    				gbox.drawText("铁矿",882,511,8);
				    				gbox.drawText("新兵",882,539,8);
							    	//(当前资源)
				    				gbox.drawText(resourceData.money,1028,453,8);
				    				gbox.drawText(resourceData.food,1028,482,8);
				    				gbox.drawText(resourceData.ferrum,1028,511,8);
				    				//（消耗资源）
				    				var curMoney = (techSoldier[jyPassIconIndex].needMoney * xunValue);
				    				var curFood = (techSoldier[jyPassIconIndex].needFood * xunValue);
				    				var curFerrum = (techSoldier[jyPassIconIndex].needIronore * xunValue);
				    				
								    var fontW1 = gbox.getTextWidth(curMoney,12);
								    var xvX1 = 931 + (80 - fontW1)/2;
				    				if(curMoney <= resourceData.money){
				    					gbox.drawText( curMoney,xvX1,453,8,2);
				    				}else{
				    					gbox.drawText(curMoney ,xvX1,453,8,6);
				    				}
								    var fontW2 = gbox.getTextWidth(curFood,12);
								    var xvX2 = 931 + (80 - fontW2)/2;
				    				if(curFood <= resourceData.food){
				    					gbox.drawText(curFood,xvX2,482,8,2);
				    				}else{
				    					gbox.drawText(curFood,xvX2,482,8,6);
				    				}				    				
                                    
								    var fontW3 = gbox.getTextWidth(curFerrum,12);
								    var xvX3 = 931 + (80 - fontW3)/2;
				    				if(curFerrum <= resourceData.ferrum){
				    					gbox.drawText(curFerrum,xvX3,511,8,2);
				    				}else{
				    					gbox.drawText(curFerrum,xvX3,511,8,6);
				    				}
							    }
			    			}
					    }
					    
			               //绘制选择品质左右选择按钮
			            gbox.drawImage('ty_an_25',932,570);
			            gbox.drawImage('ty_an_24',1012,570);
                        //绘制训练按
			            gbox.drawImage('ty_an_08',1040,565);
                        if(((touchMoveX > 1041) && (touchMoveX < 1092)) && ((touchMoveY > 566) && (touchMoveY<594)))
		                {
		               	    gbox.drawImage('ty_an_06',1040,565);
		                }       
		                var strW = gbox.getTextWidth("训练",14);
					    var cntX = 1040 + (gbox.getImage("ty_an_06").width - strW)/2;
					    var cntY = 565 + (gbox.getImage("ty_an_06").height - 14)/2;
				        gbox.drawText("训练", cntX,cntY,10);
						drawBuildCommandBtn();  
			            
					    for(var i=0; i<5; i++){
					    		if(typeof(techSoldier) != "undefined" && 
						    			typeof(techSoldier[i]) != "undefined"){	
					    			
					    		var nameW = gbox.getTextWidth(techSoldier[i].soldierDescription,14);
					    		var ttX = 548 + (i*110);
					    		
					    		if(((touchMoveX > ttX) && (touchMoveX < ttX + 96)) && ((touchMoveY > 286) && (touchMoveY < 286 + 131)))
					    		{
					    			tooltip.drawLineDesc(gbox.getBufferContext(),touchMoveX,touchMoveY,techSoldier[i].soldierDescription);	
					    		}
					    	}
					    }
					    
			            if(gbox.isInRect(487,371,"ty_an_13"))
			            {
						    gbox.drawImage('ty_an_13',487,371);
					    }else
					    	gbox.drawImage('ty_an_15',487,371);
			            
					    gbox.drawLineBreakText(buildCommonDesc[lotIndex],444,195,0,528);
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

}
function doCancelRecruit(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	if(typeof(data.summary) != 'undefined'){
		summaryData = undefined;
		var temp = data.summary;
		summaryData = {
				army:temp.soldier,//总兵数
			    armyLimit:temp.soldierLimit,//总兵上限
			    newSoldier:temp.newSoldier,//新兵数
			    newSoldierLimit:temp.newSoldierLimit//新兵上限
		};
	}
	if(typeof(data.resource) != 'undefined'){
		resourceData = undefined;
		var temp3 = data.resource;
		resourceData = {
				money:temp3.money,//铜币
				food:temp3.food,//粮食
				ferrum:temp3.ironore//铁矿
		};
	}
	
	if(jyTimeInterval != null){
		clearInterval(jyTimeInterval);
		jyCnt = 0;
		jyTimeInterval = null;
		jyRemainTime =  "等待刷新！";
	}
}
function doRecruitNewSoldier(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	//1.新/总 兵数/上限
	if(typeof(data.summary) != 'undefined'){
		summaryData = undefined;
		var temp = data.summary;
		summaryData = {
				army:temp.soldier,//总兵数
			    armyLimit:temp.soldierLimit,//总兵上限
			    newSoldier:temp.newSoldier,//新兵数
			    newSoldierLimit:temp.newSoldierLimit//新兵上限
		};
	}

	//2.用户所拥有的兵种
	if(typeof(data.userSoldier) != 'undefined'){
		userSoldier = new Array();
		for(var i=0; i<data.userSoldier.length; i++){
			var temp1 = data.userSoldier[i];
			userSoldier[i] = {
					soldierId:temp1.id,//可用于招募、进阶或遣散的参数
					soldierName:temp1.soldierName,//兵种名字
					soldierAmount:temp1.soldierAmount,//该兵种数量
					soldierNo:temp1.soldierNo//新兵上限
			};
			//console.log("userSoldier[i].soldierName ===== " + userSoldier[i].soldierName);
		}
	}

    if(typeof(data.techSoldier) != 'undefined'){
    	techSoldier = new Array();
    	//3.用户可招募、进阶到的兵种
    	for(var i=0; i<data.techSoldier.length; i++){
    		var temp2 = data.techSoldier[i];
    		techSoldier[i] = {
    				addAtk:temp2.addAtk,
    				addCrt:temp2.addCrt,
    				addDef:temp2.addDef,
    				addDodge:temp2.addDodge,
    				addHealth:temp2.addHealth,
    				addHit:temp2.addHit,
    				armorType:temp2.armorType,//护甲类型
    				attackType:temp2.attackType,//攻击类型
    				canRecruit:temp2.canRecruit,//是否可招募
    				imageName:temp2.imageName,//兵种图片资源名
    				maxRange:temp2.maxRange,//最大攻击距离
    				minRange:temp2.minRange,//最小攻击距离
    				mobility:temp2.mobility,//兵种机动性
    				needFood:temp2.needFood,//消耗粮食
    				needIronore:temp2.needIronore,//消耗铁矿
    				needMoney:temp2.needMoney,//消耗铜币
    				soldierAttack:temp2.soldierAttack,//攻击
    				soldierCritical:temp2.soldierCritical,//兵种暴击
    				soldierDefence:temp2.soldierDefence,//防御
    				soldierDescription:temp2.soldierDescription,//兵种描述
    				soldierDodge:temp2.soldierDodge,//兵种闪避
    				soldierHit:temp2.soldierHit,//兵种命中
    				soldierHp:temp2.soldierHp,//兵种血值
    				soldierName:temp2.soldierName,//兵种名字
    				soldierNo:temp2.soldierNo,//兵种编号
    				soldierLevel:temp2.soldierLevel,//兵种等级
//    				soldierSkill:temp2.soldierSkill,//兵种技能编号
//    				soldierType:temp2.soldierType,//兵种类型
//    				train:temp2.train,//当前训练
    		};
    	}    	
    }

	
	//4.兵种相关的资源
	if(typeof(data.resource) != 'undefined'){
		resourceData = undefined;
		var temp3 = data.resource;
		resourceData = {
				money:temp3.money,//铜币
				food:temp3.food,//粮食
				ferrum:temp3.ironore//铁矿
		};
	}

	train = undefined;
	if(typeof(data.train) != 'undefined'){
		train = {
				soldierName:data.train.soldierName,
				soldierNo:data.train.soldierNo,
		};
		if(jyTimeInterval != null){
			clearInterval(jyTimeInterval);
			jyCnt = 0;
			jyTimeInterval = null;
			jyRemainTime =  "等待刷新！";
		}
		
		console.log("【剩余时间】 =================== " + data.train.remainedTime);//剩余时间
		if(jyTimeInterval == null)
			jyTimeInterval = setInterval("JYTimer(" + data.train.remainedTime + ")",1000);		
	}	
	junying(getClickObjectIndex());
	junyyingList(getClickObjectIndex());
    changeMap('cityMenuLayer');	
}

//进阶士兵(所需资源)
var upgradeResourceData = new Array();
function doUpgradeSoldierResource(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	upgradeResourceData = new Array();
	upgradeResourceData[0] = {
			money:data.money,//铜币
			food:data.food,//粮食
			ferrum:data.ironore//铁矿
	};

	jinjie(getClickObjectIndex());
    changeMap('cityMenuLayer');
}

//遣散士兵(所需资源)
function doDismissSoldierResource(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	upgradeResourceData = new Array();
	upgradeResourceData[0] = {
			money:data.money,//铜币
			food:data.food,//粮食
			ferrum:data.ironore//铁矿
	};

	qiansan(getClickObjectIndex());	
    changeMap('cityMenuLayer');
}
var divZMNum;
var isZM = false;
var zhaomu = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isZM = true;
	isJinjie = false;
	isQiansan = false;
	var bW = gbox.getImage('by_zjm_17').width;
	var bH = gbox.getImage('by_zjm_17').height;
	var bX1 = (gbox.getScreenW() - bW)/2;
	var bY1 = (gbox.getScreenH() - bH)/2;
	var exitX = bX1 + bW - 24;
	var exitY = bY1 + 2;	  
    
	var zmOffsetX = -4;
	var zmOffsetY = -4;
		gbox.addObject(
			{ 
				id : 'zhaomu',
				group : 'levelMenu_3',
				tileset : 'by_zjm_17',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [580,310],[858,310],[858,431],[580,431]],
				initialize : function()
				{

					if(divZMNum == null && !gbox._isIndwellDiv("divZMNum","input"))
					{
						divZMNum = addDivWindowBg(702 + zmOffsetX,386 + zmOffsetY);
						divZMNum.id = 'divZMNum';
						document.body.appendChild(divZMNum);
						zmAuctionNum = document.createElement("input");
						zmAuctionNum.style.id = 'divZMNum';
						zmAuctionNum.style.backgroundColor = '#000000';
						zmAuctionNum.style.width = '52px';
						zmAuctionNum.style.color = '#ffffff';
						zmAuctionNum.value = 1;
						divZMNum.appendChild(zmAuctionNum);            
					}					
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(divZMNum,"divZMNum",702);
					/*======================================================*/		
					zmAuctionNum.value = zmAuctionNum.value.replace(/\D/g,'');
					if(typeof(summaryData) != "undefined"){
		    			if(zmAuctionNum.value > summaryData.newSoldierLimit){	
		    				zmAuctionNum.value = summaryData.newSoldierLimit;
		    			}
					}
				},
				myclick : function()
				{
					if(((lastTouchMoveX > exitX) && (lastTouchMoveX < exitX + gbox.getImage("ty_an_18").width)) && ((lastTouchMoveY > exitY) && (lastTouchMoveY<exitY+ gbox.getImage("ty_an_18").height))){
						isZM = false;
						isJinjie = false;
						isQiansan = false;
						if(divZMNum != null && gbox._isIndwellDiv("divZMNum","input")){
				            document.body.removeChild(divZMNum);  
				            divZMNum = null;  				            
					    }
						exit(getClickObjectIndex());
						junying(getClickObjectIndex());
						junyyingList(getClickObjectIndex());
					    changeMap('cityMenuLayer');		
					}else{
					    	if(lastTouchMoveX > 682 + zmOffsetX && lastTouchMoveX < (682 + 12 + zmOffsetX) && lastTouchMoveY > 390 + zmOffsetY && lastTouchMoveY < (390 + 19 + zmOffsetY)){
					    		zmAuctionNum.value = 1;   
					    	}
					    	if(lastTouchMoveX > 765 + zmOffsetX && lastTouchMoveX < (765 + 12 + zmOffsetX) && lastTouchMoveY > 390 + zmOffsetY && lastTouchMoveY < (390 + 19 + zmOffsetY)){
					    		if(typeof(summaryData) != "undefined"){
					    			
					    			if(summaryData.newSoldierLimit >= zmAuctionNum.value ){	
					    				zmAuctionNum.value = summaryData.newSoldierLimit - summaryData.newSoldier;					    				
					    			}else{
					    				zmAuctionNum.value = 1;
//					    				alert("超出该兵种数量上限！");
					    			}
	
					    		}
					    	}
					    	//确定按钮
					    	if(((lastTouchMoveX > 794 + zmOffsetX) && (lastTouchMoveX < 845 + zmOffsetX)) && ((lastTouchMoveY > 385 + zmOffsetY) && (lastTouchMoveY<410 + zmOffsetY))){		
					    		if(typeof(summaryData) != "undefined"){
					    			if(zmAuctionNum.value <= summaryData.newSoldierLimit){	
					                    BuildingFunction.recruitNewSoldier(zmAuctionNum.value,doRecruitNewSoldier);
					    			}else{
					    				zmAuctionNum.value = 1;
//					    				alert("超出新兵数量上限！");
					    			}
					    		}
					    		console.log("亲兵招募");
					    	}
					    	zhaomu(getClickObjectIndex());
							changeMap('cityMenuLayer');		
				    	}	
				},
				blit : function()
				{
					 if(isDrawUI[index] && isZM)
					 {
					   gbox.drawImage("by_zjm_17",580,310);
					   if(((touchMoveX > exitX) && (touchMoveX < exitX + gbox.getImage("ty_an_18").width)) && ((touchMoveY > exitY) && (touchMoveY<exitY+ gbox.getImage("ty_an_18").height)))//确定按钮	
					 	{
					 		gbox.drawImage("ty_an_17",exitX,exitY);
					 	}
					 	else
					 	{
					 		gbox.drawImage("ty_an_18",exitX,exitY);
					 	}
                       if(((touchMoveX > 794 + zmOffsetX) && (touchMoveX < 845 + zmOffsetX)) && ((touchMoveY > 382 + zmOffsetY) && (touchMoveY<407 + zmOffsetY)))//确定按钮	
			               {
			               	    gbox.drawImage('ty_an_06',790,380);
			               }       
			            var strW = gbox.getTextWidth("确定",14);
						var cntX = 794 + zmOffsetX + (gbox.getImage("ty_an_06").width - strW)/2;
						var cntY = 385 + zmOffsetY + (gbox.getImage("ty_an_06").height - 14)/2;
					    gbox.drawText("确定", cntX,cntY,5);
						
			            //绘制选择品质左右选择按钮
			            gbox.drawImage('ty_an_25',684 + zmOffsetX,390 + zmOffsetY);
			            gbox.drawImage('ty_an_24',765 + zmOffsetX,390 + zmOffsetY);
					 }						
				}
			});

};

var isJinjie = false;
var jinjie = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJinjie = true;
	isQiansan = false;
	isPeibing = false;
	isZM = false;
	var bW = gbox.getImage("by_zjm_20").width;
	var bH = gbox.getImage("by_zjm_20").height;
	var bX1 = (gbox.getScreenW() - bW)/2;
	var bY1 = (gbox.getScreenH() - bH)/2;
	var exitX = bX1 + bW - 19;
	var exitY = bY1+1;	  
    
	var jjOffsetX = -5;
	var jjOffsetY = -24;
		gbox.addObject(
			{ 
				id : 'jinjie',
				group : 'levelMenu_3',
				tileset : 'by_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [580,310],[858,310],[858,431],[580,431]],
				initialize : function()
				{
					if(divQiansanNum != null && gbox._isIndwellDiv("divQiansanNum","input")){
			            document.body.removeChild(divQiansanNum);  
			            divQiansanNum = null;  				            
				    }
					
					if(divjinjieNum == null && !gbox._isIndwellDiv("divjinjieNum","input"))
					{
						divjinjieNum = addDivWindowBg(702 + jjOffsetX,386 + jjOffsetY);
						divjinjieNum.id = 'divjinjieNum';
						document.body.appendChild(divjinjieNum);
						jjAuctionNum = document.createElement("input");
						jjAuctionNum.style.id = 'divjunjichuNum';
						jjAuctionNum.style.backgroundColor = '#000000';
						jjAuctionNum.style.width = '52px';
						jjAuctionNum.style.color = '#ffffff';
						jjAuctionNum.value = 1;
						divjinjieNum.appendChild(jjAuctionNum);            
					}					
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(divjinjieNum,"divjinjieNum",702);
					/*======================================================*/		
					jjAuctionNum.value = jjAuctionNum.value.replace(/\D/g,'');
					if(typeof(userSoldier) != "undefined" &&
		    				  typeof(userSoldier[jyListIndex]) != "undefined"){
		    			if(jjAuctionNum.value > userSoldier[jyListIndex].soldierAmount){	
		    				jjAuctionNum.value = userSoldier[jyListIndex].soldierAmount;
		    			}else
			    			if(jjAuctionNum.value < 0)
			    				jjAuctionNum.value = 0;
					}
				},
				myclick : function()
				{
					if(((lastTouchMoveX > exitX) && (lastTouchMoveX < exitX + gbox.getImage("ty_an_18").width)) && ((lastTouchMoveY > exitY) && (lastTouchMoveY<exitY+ gbox.getImage("ty_an_18").height))){
						isZM = false;
						isJinjie = false;
						isQiansan = false;
						if(divjinjieNum != null && gbox._isIndwellDiv("divjinjieNum","input")){
				            document.body.removeChild(divjinjieNum);  
				            divjinjieNum = null;  				            
					    }
						exit(getClickObjectIndex());
						junying(getClickObjectIndex());
						junyyingList(getClickObjectIndex());
						changeMap('cityMenuLayer');	
					}else{
				    	if(lastTouchMoveX > 682 + jjOffsetX && lastTouchMoveX < (682 + 12 + jjOffsetX) && lastTouchMoveY > 390 + jjOffsetY && lastTouchMoveY < (390 + 19 + jjOffsetY)){
				    		jjAuctionNum.value = 1;   
				    	}else 
				    	if(lastTouchMoveX > 765 + jjOffsetX && lastTouchMoveX < (765 + 12 + jjOffsetX) && lastTouchMoveY > 390 + jjOffsetY && lastTouchMoveY < (390 + 19 + jjOffsetY)){
				    		if(typeof(summaryData) != "undefined" && 
				    				  typeof(userSoldier) != "undefined" &&
				    				  typeof(userSoldier[jyListIndex]) != "undefined"){
				    			
				    			if(userSoldier[jyListIndex].soldierAmount >= jjAuctionNum.value ){	
				    				jjAuctionNum.value = userSoldier[jyListIndex].soldierAmount;					    				
				    			}else{
				    				jjAuctionNum.value = 1;
//				    				alert("超出该兵种数量上限！");
				    			}

				    		}
				    	}else//确定按钮
				    	if(((lastTouchMoveX > 794 + jjOffsetX) && (lastTouchMoveX < 845 + jjOffsetX)) && ((lastTouchMoveY > 385 + jjOffsetY) && (lastTouchMoveY<410 + jjOffsetY))){		
				    		if(typeof(summaryData) != "undefined" && 
				    				  typeof(userSoldier) != "undefined" &&
				    				  typeof(userSoldier[jyListIndex]) != "undefined"){
				    			
				    			if(jjAuctionNum.value <= userSoldier[jyListIndex].soldierAmount){	
				                    BuildingFunction.upgradeSoldier(userSoldier[jyListIndex].soldierNo,jjAuctionNum.value,doUpgradeSoldier);
				    			}else{
				    				jjAuctionNum.value = 1;
//				    				alert("超出该兵种数量上限！");
				    			}
				    		}
				    		console.log("进阶士兵");
				    	}
				    	jinjie(getClickObjectIndex());
						changeMap('cityMenuLayer');	
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isJinjie)
					 {
					    gbox.drawImage("by_zjm_20",580,310);
					 	if(((touchMoveX > exitX) && (touchMoveX < exitX + gbox.getImage("ty_an_18").width)) && ((touchMoveY > exitY) && (touchMoveY<exitY+ gbox.getImage("ty_an_18").height)))//确定按钮	
					 	{
					 		gbox.drawImage("ty_an_17",exitX,exitY);
					 	}
					 	else
					 	{
					 		gbox.drawImage("ty_an_18",exitX,exitY);
					 	}
                       //绘制进阶按钮
					   if(((touchMoveX > 794 + jjOffsetX) && (touchMoveX < 845 + jjOffsetX)) && ((touchMoveY > 382 + jjOffsetY) && (touchMoveY<407 + jjOffsetY)))//确定按钮	
		               {
		               	    gbox.drawImage('ty_an_06',793 + jjOffsetX,385 + jjOffsetY);
		               }       
		               var strW = gbox.getTextWidth("确定",14);
					   var cntX = 793 + jjOffsetX + (gbox.getImage("ty_an_06").width - strW)/2;
					   var cntY = 385 + jjOffsetY + (gbox.getImage("ty_an_06").height - 14)/2;
				       gbox.drawText("确定", cntX,cntY,5);
			               //绘制选择品质左右选择按钮
			            gbox.drawImage('ty_an_25',686 + jjOffsetX,390 + jjOffsetY);
			            gbox.drawImage('ty_an_24',764 + jjOffsetX,390 + jjOffsetY);
			            
			    		if(typeof(upgradeResourceData) != "undefined" && typeof(upgradeResourceData[0]) != "undefined"){
			    			
				            var ferrumW = gbox.getTextWidth(upgradeResourceData[0].ferrum,6);
				            var fX = 690 + (40 - ferrumW)/2;
				            gbox.drawText(upgradeResourceData[0].ferrum,fX + jjOffsetX, 430 + jjOffsetY,6);
				            var foodW = gbox.getTextWidth(upgradeResourceData[0].food,6);
				            var feX = 750 + (40 - foodW)/2;
				            gbox.drawText(upgradeResourceData[0].food,feX + jjOffsetX, 430 + jjOffsetY,6);
				            var mW = gbox.getTextWidth(upgradeResourceData[0].money,6);
				            var mX = 810 + (40 - mW)/2;
				            gbox.drawText(upgradeResourceData[0].money,mX + jjOffsetX, 430 + jjOffsetY,6);				            
			    		}
					 }						
				}
			});

};


//进阶士兵(确定)
function doUpgradeSoldier(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	//1.新/总 兵数/上限
	if(typeof(data.summary) != 'undefined'){
		summaryData = undefined;
		var temp = data.summary;
		summaryData = {
				army:temp.soldier,//总兵数
			    armyLimit:temp.soldierLimit,//总兵上限
			    newSoldier:temp.newSoldier,//新兵数
			    newSoldierLimit:temp.newSoldierLimit//新兵上限
		};
	}

	//2.用户所拥有的兵种
	if(typeof(data.userSoldier) != 'undefined'){
		userSoldier = new Array();
		for(var i=0; i<data.userSoldier.length; i++){
			var temp1 = data.userSoldier[i];
			userSoldier[i] = {
					soldierId:temp1.id,//可用于招募、进阶或遣散的参数
					soldierName:temp1.soldierName,//兵种名字
					soldierAmount:temp1.soldierAmount,//该兵种数量
					soldierNo:temp1.soldierNo//新兵上限
			};
			//console.log("userSoldier[i].soldierName ===== " + userSoldier[i].soldierName);
		}
	}

    if(typeof(data.techSoldier) != 'undefined'){
    	techSoldier = new Array();
    	//3.用户可招募、进阶到的兵种
    	for(var i=0; i<data.techSoldier.length; i++){
    		var temp2 = data.techSoldier[i];
    		techSoldier[i] = {
    				addAtk:temp2.addAtk,
    				addCrt:temp2.addCrt,
    				addDef:temp2.addDef,
    				addDodge:temp2.addDodge,
    				addHealth:temp2.addHealth,
    				addHit:temp2.addHit,
    				armorType:temp2.armorType,//护甲类型
    				attackType:temp2.attackType,//攻击类型
    				canRecruit:temp2.canRecruit,//是否可招募
    				imageName:temp2.imageName,//兵种图片资源名
    				maxRange:temp2.maxRange,//最大攻击距离
    				minRange:temp2.minRange,//最小攻击距离
    				mobility:temp2.mobility,//兵种机动性
    				needFood:temp2.needFood,//消耗粮食
    				needIronore:temp2.needIronore,//消耗铁矿
    				needMoney:temp2.needMoney,//消耗铜币
    				soldierAttack:temp2.soldierAttack,//攻击
    				soldierCritical:temp2.soldierCritical,//兵种暴击
    				soldierDefence:temp2.soldierDefence,//防御
    				soldierDescription:temp2.soldierDescription,//兵种描述
    				soldierDodge:temp2.soldierDodge,//兵种闪避
    				soldierHit:temp2.soldierHit,//兵种命中
    				soldierHp:temp2.soldierHp,//兵种血值
    				soldierName:temp2.soldierName,//兵种名字
    				soldierNo:temp2.soldierNo,//兵种编号
//    				soldierLevel:temp2.soldierLevel,//兵种等级
//    				soldierSkill:temp2.soldierSkill,//兵种技能编号
//    				soldierType:temp2.soldierType,//兵种类型
//    				train:temp2.train,//当前训练
    		};
    	}    	
    }

	
	//4.兵种相关的资源
	if(typeof(data.resource) != 'undefined'){
		resourceData = undefined;
		var temp3 = data.resource;
		resourceData = {
				money:temp3.money,//铜币
				food:temp3.food,//粮食
				ferrum:temp3.ironore//铁矿
		};
	}

	train = undefined;
	if(typeof(data.train) != 'undefined'){
		train = {
				soldierName:data.train.soldierName,
				soldierNo:data.train.soldierNo,
		};
		if(jyTimeInterval != null){
			clearInterval(jyTimeInterval);
			jyCnt = 0;
			jyTimeInterval = null;
			jyRemainTime =  "等待刷新！";
		}
		
		console.log("【剩余时间】 =================== " + data.train.remainedTime);//剩余时间
		if(jyTimeInterval == null)
			jyTimeInterval = setInterval("JYTimer(" + data.train.remainedTime + ")",1000);		
	}
	if(typeof(userSoldier) != "undefined"){
		var itemIcon = new Array();
		for(var i=0; i<userSoldier.length; i++)
		    itemIcon.push(jyItem);
		
		itemName = new Array();
		itemValue = new Array();
			for(var i=0; i< userSoldier.length; i++){
				if(typeof(userSoldier[i]) != "undefined"){
					itemName[i] =  userSoldier[i].soldierName;
					itemValue[i] = userSoldier[i].soldierAmount;
				}
			}
			
			var content = new Array(itemName,itemValue,itemIcon);
		    var listLen = content[0].length;
		    if(listLen < 5){
		    	listLen = 5;
		    }   
		    jyOffsetY = jy_OffsetY = 0;
		    jylist.update(content,null,listLen);
//		    jylist.init( 'jyRect', 'jyHitRect', 'jyPassRect','jyPassRect',null,content, 320, 425, 1, listLen, 27, 5, false, -75, 0 );
		    jylist.itemOffsetX = -3;
		    jylist.fontSize = 12;
	}
	

	junying(getClickObjectIndex());
	junyyingList(getClickObjectIndex());
	changeMap('cityMenuLayer');		
}
var isQiansan = false;
var qiansan = function(index){
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJinjie = false;
	isQiansan = true;
	isZM = false;
	isPeibing = false;
	var bW = gbox.getImage('by_zjm_19').width;
	var bH = gbox.getImage('by_zjm_19').height;
	var bX = (gbox.getScreenW() - bW)/2;
	var bY = (gbox.getScreenH() - bH)/2;
	var exitX = bX + bW - 19;
	var exitY = bY + 1;	
	var qsOffsetX = -2;
	var qsOffsetY = -5;
		gbox.addObject(
			{ 
				id : 'qiansan',
				group : 'levelMenu_3',
				tileset : 'by_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [580,310],[858,310],[858,431],[580,431]],
				initialize : function()
				{
					if(divQiansanNum == null && !gbox._isIndwellDiv("divQiansanNum","input"))
					{
						if(divjinjieNum != null && gbox._isIndwellDiv("divjinjieNum","input")){
				            document.body.removeChild(divjinjieNum);  
				            divjinjieNum = null;  				            
					    }
						divQiansanNum = addDivWindowBg(702 + qsOffsetX,364 + qsOffsetY);
						divQiansanNum.id = 'divQiansanNum';
						document.body.appendChild(divQiansanNum);
						qsAuctionNum = document.createElement("input");
						qsAuctionNum.style.id = 'divQiansanNum';
						qsAuctionNum.style.backgroundColor = '#000000';
						qsAuctionNum.style.width = '52px';
						qsAuctionNum.style.color = '#ffffff';
						qsAuctionNum.value = 1;
						divQiansanNum.appendChild(qsAuctionNum);            
					}						
				},
				first : function() 
				{
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(divQiansanNum,"divQiansanNum",702);
					/*======================================================*/	
					qsAuctionNum.value = qsAuctionNum.value.replace(/\D/g,'');
					
					if(typeof(userSoldier) != "undefined" &&
		    				  typeof(userSoldier[jyListIndex]) != "undefined"){
		    			if(qsAuctionNum.value > userSoldier[jyListIndex].soldierAmount){	
		    				qsAuctionNum.value = userSoldier[jyListIndex].soldierAmount;
		    			}else
		    			if(qsAuctionNum.value < 0){
		    				qsAuctionNum.value = 0;
		    			}
					}
					
				},
				myclick : function()
				{
					if(((lastTouchMoveX > exitX) && (lastTouchMoveX < exitX + gbox.getImage("ty_an_18").width)) && ((lastTouchMoveY > exitY) && (lastTouchMoveY<exitY+ gbox.getImage("ty_an_18").height))){
						isZM = false;
						isJinjie = false;
						isQiansan = false;
						if(divQiansanNum != null && gbox._isIndwellDiv("divQiansanNum","input")){
				            document.body.removeChild(divQiansanNum);  
				            divQiansanNum = null;  				            
					    }
						exit(getClickObjectIndex());
						junying(getClickObjectIndex());
						junyyingList(getClickObjectIndex());
						changeMap('cityMenuLayer');	
					}else{
						
				    	if(lastTouchMoveX > 682 + qsOffsetX && lastTouchMoveX < (682 + 12 + qsOffsetX) && lastTouchMoveY > 368 + qsOffsetY && lastTouchMoveY < (368 + 19 + qsOffsetY)){
				    		qsAuctionNum.value = 1;   
				    	}else 
				    	if(lastTouchMoveX > 762 + qsOffsetX && lastTouchMoveX < (762 + 12 + qsOffsetX) && lastTouchMoveY > 368 + qsOffsetY && lastTouchMoveY < (368 + 19 + qsOffsetY)){
				    		if(typeof(summaryData) != "undefined" && 
				    				  typeof(userSoldier) != "undefined" &&
				    				  typeof(userSoldier[jyListIndex]) != "undefined"){
				    			if(qsAuctionNum.value <= userSoldier[jyListIndex].soldierAmount){
				    				qsAuctionNum.value = userSoldier[jyListIndex].soldierAmount;				    				
				    			}else{
				    				qsAuctionNum.value = 1;
//				    				alert("超出该兵种数量上限！");
				    			}

				    		}
				    	}else//确定按钮
				    	if(((lastTouchMoveX > 794 + qsOffsetX) && (lastTouchMoveX < 845 + qsOffsetX)) && ((lastTouchMoveY > 361 + qsOffsetY) && (lastTouchMoveY<385 + qsOffsetY))){		
				    		if(typeof(summaryData) != "undefined" && 
				    				  typeof(userSoldier) != "undefined" &&
				    				  typeof(userSoldier[jyListIndex]) != "undefined"){
				    			
				    			if(qsAuctionNum.value <= userSoldier[jyListIndex].soldierAmount){	
				                    BuildingFunction.dismissSoldier(userSoldier[jyListIndex].soldierNo,qsAuctionNum.value,doDismissSoldier);
				    			}else{
				    				qsAuctionNum.value = 1;
//				    				alert("超出该兵种数量上限！");
				    			}
				    		}
				    		console.log("遣散士兵");
				    	}
						qiansan(getClickObjectIndex());
						changeMap('cityMenuLayer');						
					}
				},
				blit : function()
				{
					 if(isDrawUI[index] && isQiansan)
					 {
					    gbox.drawImage("by_zjm_19",580,310);
					 	if(((touchMoveX > exitX) && (touchMoveX < exitX + gbox.getImage("ty_an_18").width)) && ((touchMoveY > exitY) && (touchMoveY<exitY+ gbox.getImage("ty_an_18").height)))//确定按钮	
					 	{
					 		gbox.drawImage("ty_an_17",exitX,exitY);
					 	}
					 	else
					 	{
					 		gbox.drawImage("ty_an_18",exitX,exitY);
					 	}
                        if(((touchMoveX > 792 + qsOffsetX) && (touchMoveX < 845 + qsOffsetX)) && ((touchMoveY > 361 + qsOffsetY) && (touchMoveY<385 + qsOffsetY)))//确定按钮	
			               {
			               	    gbox.drawImage('ty_an_06',792,359);
			               }       
			            var strW = gbox.getTextWidth("确定",14);
						var cntX = 792 + (gbox.getImage("ty_an_06").width - strW)/2;
						var cntY = 359 + (gbox.getImage("ty_an_06").height - 14)/2;
					    gbox.drawText("确定", cntX,cntY,5);
			               //绘制选择品质左右选择按钮
			            gbox.drawImage('ty_an_25',686 + qsOffsetX,368 + qsOffsetY);
			            gbox.drawImage('ty_an_24',761 + qsOffsetX,368 + qsOffsetY);
			            
			            if(typeof(upgradeResourceData) != "undefined" && typeof(upgradeResourceData[0]) != "undefined"){
				            var ferrumW = gbox.getTextWidth(upgradeResourceData[0].ferrum,6);
				            var fX = 690 + (40 - ferrumW)/2;
				            gbox.drawText(upgradeResourceData[0].ferrum,fX + qsOffsetX, 409 + qsOffsetY,6);
				            var foodW = gbox.getTextWidth(upgradeResourceData[0].food,6);
				            var feX = 750 + (40 - foodW)/2;
				            gbox.drawText(upgradeResourceData[0].food,feX + qsOffsetX, 409 + qsOffsetY,6);
				            var mW = gbox.getTextWidth(upgradeResourceData[0].money,6);
				            var mX = 810 + (40 - mW)/2;
				            gbox.drawText(upgradeResourceData[0].money,mX + qsOffsetX, 409 + qsOffsetY,6);
				            
			    		}
					 }						
				}
			});

};

//招募士兵
var train = undefined;
function doRecruitSoldier(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	//1.新/总 兵数/上限
	if(typeof(data.summary) != 'undefined'){
		summaryData = undefined;
		var temp = data.summary;
		summaryData = {
				army:temp.soldier,//总兵数
			    armyLimit:temp.soldierLimit,//总兵上限
			    newSoldier:temp.newSoldier,//新兵数
			    newSoldierLimit:temp.newSoldierLimit//新兵上限
		};
	}

	//2.用户所拥有的兵种
	if(typeof(data.userSoldier) != 'undefined'){
		userSoldier = new Array();
		for(var i=0; i<data.userSoldier.length; i++){
			var temp1 = data.userSoldier[i];
			userSoldier[i] = {
					soldierId:temp1.id,//可用于招募、进阶或遣散的参数
					soldierName:temp1.soldierName,//兵种名字
					soldierAmount:temp1.soldierAmount,//该兵种数量
					soldierNo:temp1.soldierNo//新兵上限
			};
			//console.log("userSoldier[i].soldierName ===== " + userSoldier[i].soldierName);
		}
	}

    if(typeof(data.techSoldier) != 'undefined'){
    	techSoldier = new Array();
    	//3.用户可招募、进阶到的兵种
    	for(var i=0; i<data.techSoldier.length; i++){
    		var temp2 = data.techSoldier[i];
    		techSoldier[i] = {
    				addAtk:temp2.addAtk,
    				addCrt:temp2.addCrt,
    				addDef:temp2.addDef,
    				addDodge:temp2.addDodge,
    				addHealth:temp2.addHealth,
    				addHit:temp2.addHit,
    				armorType:temp2.armorType,//护甲类型
    				attackType:temp2.attackType,//攻击类型
    				canRecruit:temp2.canRecruit,//是否可招募
    				imageName:temp2.imageName,//兵种图片资源名
    				maxRange:temp2.maxRange,//最大攻击距离
    				minRange:temp2.minRange,//最小攻击距离
    				mobility:temp2.mobility,//兵种机动性
    				needFood:temp2.needFood,//消耗粮食
    				needIronore:temp2.needIronore,//消耗铁矿
    				needMoney:temp2.needMoney,//消耗铜币
    				soldierAttack:temp2.soldierAttack,//攻击
    				soldierCritical:temp2.soldierCritical,//兵种暴击
    				soldierDefence:temp2.soldierDefence,//防御
    				soldierDescription:temp2.soldierDescription,//兵种描述
    				soldierDodge:temp2.soldierDodge,//兵种闪避
    				soldierHit:temp2.soldierHit,//兵种命中
    				soldierHp:temp2.soldierHp,//兵种血值
    				soldierName:temp2.soldierName,//兵种名字
    				soldierNo:temp2.soldierNo,//兵种编号
    				soldierLevel:temp2.soldierLevel,//兵种等级
//    				soldierSkill:temp2.soldierSkill,//兵种技能编号
//    				soldierType:temp2.soldierType,//兵种类型
//    				train:temp2.train,//当前训练
    		};
    	}    	
    }

	
	//4.兵种相关的资源
	if(typeof(data.resource) != 'undefined'){
		resourceData = undefined;
		var temp3 = data.resource;
		resourceData = {
				money:temp3.money,//铜币
				food:temp3.food,//粮食
				ferrum:temp3.ironore//铁矿
		};
	}
	train = undefined;
	if(typeof(data.train) != 'undefined'){
		train = {
				soldierName:data.train.soldierName,
				soldierNo:data.train.soldierNo,
		};
		
		if(jyTimeInterval != null){
			clearInterval(jyTimeInterval);
			jyCnt = 0;
			jyTimeInterval = null;
			jyRemainTime =  "等待刷新！";
		}
		
		console.log("【剩余时间】 =================== " + data.train.remainedTime);//剩余时间
		if(jyTimeInterval == null)
			jyTimeInterval = setInterval("JYTimer(" + data.train.remainedTime + ")",1000);		
	}

	if(typeof(userSoldier) != "undefined"){
		var jyItemName = new Array();
		var jyItemValue = new Array();
		var itemIcon = new Array();
		for(var i=0; i<userSoldier.length; i++)
		    itemIcon.push(jyItem);

			for(var i=0; i< userSoldier.length; i++){
				if(typeof(userSoldier[i]) != "undefined"){
					jyItemName[i] =  userSoldier[i].soldierName;
					jyItemValue[i] = userSoldier[i].soldierAmount;
				}
			}
			
			var content = new Array(jyItemName,jyItemValue,itemIcon);
		    var listLen = content[0].length;
		    if(listLen < 5){
		    	listLen = 5;
		    }   
		    jyOffsetY = jy_OffsetY = 0;
		    jylist.update(content,null,listLen);
//		    jylist.init( 'jyRect', 'jyHitRect', 'jyPassRect','jyPassRect',null,content, 320, 425, 1, listLen, 27, 5, false, -75, 0 );
		    jylist.itemOffsetX = -3;
		    jylist.fontSize = 12;
	}
}
//招募士兵
function doDismissSoldier(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}

	//1.新/总 兵数/上限
	if(typeof(data.summary) != 'undefined'){
		summaryData = undefined;
		var temp = data.summary;
		summaryData = {
				army:temp.soldier,//总兵数
			    armyLimit:temp.soldierLimit,//总兵上限
			    newSoldier:temp.newSoldier,//新兵数
			    newSoldierLimit:temp.newSoldierLimit//新兵上限
		};
	}

	//2.用户所拥有的兵种
	if(typeof(data.userSoldier) != 'undefined'){
		userSoldier = new Array();
		for(var i=0; i<data.userSoldier.length; i++){
			var temp1 = data.userSoldier[i];
			userSoldier[i] = {
					soldierId:temp1.id,//可用于招募、进阶或遣散的参数
					soldierName:temp1.soldierName,//兵种名字
					soldierAmount:temp1.soldierAmount,//该兵种数量
					soldierNo:temp1.soldierNo//新兵上限
			};
			//console.log("userSoldier[i].soldierName ===== " + userSoldier[i].soldierName);
		}
	}

    if(typeof(data.techSoldier) != 'undefined'){
    	techSoldier = new Array();
    	//3.用户可招募、进阶到的兵种
    	for(var i=0; i<data.techSoldier.length; i++){
    		var temp2 = data.techSoldier[i];
    		techSoldier[i] = {
    				addAtk:temp2.addAtk,
    				addCrt:temp2.addCrt,
    				addDef:temp2.addDef,
    				addDodge:temp2.addDodge,
    				addHealth:temp2.addHealth,
    				addHit:temp2.addHit,
    				armorType:temp2.armorType,//护甲类型
    				attackType:temp2.attackType,//攻击类型
    				canRecruit:temp2.canRecruit,//是否可招募
    				imageName:temp2.imageName,//兵种图片资源名
    				maxRange:temp2.maxRange,//最大攻击距离
    				minRange:temp2.minRange,//最小攻击距离
    				mobility:temp2.mobility,//兵种机动性
    				needFood:temp2.needFood,//消耗粮食
    				needIronore:temp2.needIronore,//消耗铁矿
    				needMoney:temp2.needMoney,//消耗铜币
    				soldierAttack:temp2.soldierAttack,//攻击
    				soldierCritical:temp2.soldierCritical,//兵种暴击
    				soldierDefence:temp2.soldierDefence,//防御
    				soldierDescription:temp2.soldierDescription,//兵种描述
    				soldierDodge:temp2.soldierDodge,//兵种闪避
    				soldierHit:temp2.soldierHit,//兵种命中
    				soldierHp:temp2.soldierHp,//兵种血值
    				soldierName:temp2.soldierName,//兵种名字
    				soldierNo:temp2.soldierNo,//兵种编号
    				soldierLevel:temp2.soldierLevel,//兵种等级
//    				soldierSkill:temp2.soldierSkill,//兵种技能编号
//    				soldierType:temp2.soldierType,//兵种类型
//    				train:temp2.train,//当前训练
    		};
    	}    	
    }

	
	//4.兵种相关的资源
	if(typeof(data.resource) != 'undefined'){
		resourceData = undefined;
		var temp3 = data.resource;
		resourceData = {
				money:temp3.money,//铜币
				food:temp3.food,//粮食
				ferrum:temp3.ironore//铁矿
		};
	}

	train = undefined;
	if(typeof(data.train) != 'undefined'){
		train = {
				soldierName:data.train.soldierName,
				soldierNo:data.train.soldierNo,
		};
		
		if(jyTimeInterval != null){
			clearInterval(jyTimeInterval);
			jyCnt = 0;
			jyTimeInterval = null;
			jyRemainTime =  "等待刷新！";
		}
		
		console.log("【剩余时间】 =================== " + data.train.remainedTime);//剩余时间
		if(jyTimeInterval == null)
			jyTimeInterval = setInterval("JYTimer(" + data.train.remainedTime + ")",1000);		
	}
	var jyItemName = new Array();
	var jyItemValue = new Array();
	if(typeof(userSoldier) != "undefined"){
		var itemIcon = new Array();
		for(var i=0; i<userSoldier.length; i++)
		    itemIcon.push(jyItem);

			for(var i=0; i< userSoldier.length; i++){
				if(typeof(userSoldier[i]) != "undefined"){
					jyItemName[i] =  userSoldier[i].soldierName;
					jyItemValue[i] = userSoldier[i].soldierAmount;
				}
			}
			
			var content = new Array(jyItemName,jyItemValue,itemIcon);
		    var listLen = content[0].length;
		    if(listLen < 5){
		    	listLen = 5;
		    }   
		    jyOffsetY = jy_OffsetY = 0;
		    jylist.update(content, null, listLen);
//		    jylist.init( 'jyRect', 'jyHitRect', 'jyPassRect','jyPassRect',null,content, 320, 425, 1, listLen, 27, 5, false, -75, 0 );
		    jylist.itemOffsetX = -3;
		    jylist.fontSize = 12;
	}
	

	junying(getClickObjectIndex());
	junyyingList(getClickObjectIndex());
	changeMap('cityMenuLayer');		
}

//打开兵营界面
function doInitBarracks(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	//1.新/总 兵数/上限
	if(typeof(data.summary) != 'undefined'){
		summaryData = undefined;
		var temp = data.summary;
		summaryData = {
				army:temp.soldier,//总兵数
			    armyLimit:temp.soldierLimit,//总兵上限
			    newSoldier:temp.newSoldier,//新兵数
			    newSoldierLimit:temp.newSoldierLimit//新兵上限
		};
	}

	//2.用户所拥有的兵种
	if(typeof(data.userSoldier) != 'undefined'){
		userSoldier = new Array();
		for(var i=0; i<data.userSoldier.length; i++){
			var temp1 = data.userSoldier[i];
			userSoldier[i] = {
					soldierId:temp1.id,//可用于招募、进阶或遣散的参数
					soldierName:temp1.soldierName,//兵种名字
					soldierAmount:temp1.soldierAmount,//该兵种数量
					soldierNo:temp1.soldierNo//新兵上限
			};
			//console.log("userSoldier[i].soldierName ===== " + userSoldier[i].soldierName);
		}
	}

    if(typeof(data.techSoldier) != 'undefined'){
    	techSoldier = new Array();
    	//3.用户可招募、进阶到的兵种
    	for(var i=0; i<data.techSoldier.length; i++){
    		var temp2 = data.techSoldier[i];
    		techSoldier[i] = {
    				addAtk:temp2.addAtk,
    				addCrt:temp2.addCrt,
    				addDef:temp2.addDef,
    				addDodge:temp2.addDodge,
    				addHealth:temp2.addHealth,
    				addHit:temp2.addHit,
    				armorType:temp2.armorType,//护甲类型
    				attackType:temp2.attackType,//攻击类型
    				canRecruit:temp2.canRecruit,//是否可招募
    				imageName:temp2.imageName,//兵种图片资源名
    				maxRange:temp2.maxRange,//最大攻击距离
    				minRange:temp2.minRange,//最小攻击距离
    				mobility:temp2.mobility,//兵种机动性
    				needFood:temp2.needFood,//消耗粮食
    				needIronore:temp2.needIronore,//消耗铁矿
    				needMoney:temp2.needMoney,//消耗铜币
    				soldierAttack:temp2.soldierAttack,//攻击
    				soldierCritical:temp2.soldierCritical,//兵种暴击
    				soldierDefence:temp2.soldierDefence,//防御
    				soldierDescription:temp2.soldierDescription,//兵种描述
    				soldierDodge:temp2.soldierDodge,//兵种闪避
    				soldierHit:temp2.soldierHit,//兵种命中
    				soldierHp:temp2.soldierHp,//兵种血值
    				soldierName:temp2.soldierName,//兵种名字
    				soldierNo:temp2.soldierNo,//兵种编号
    				soldierLevel:temp2.soldierLevel,//兵种等级
//    				soldierSkill:temp2.soldierSkill,//兵种技能编号
//    				soldierType:temp2.soldierType,//兵种类型
//    				train:temp2.train,//当前训练
    		};
    	}    	
    }

	
	//4.兵种相关的资源
	if(typeof(data.resource) != 'undefined'){
		resourceData = undefined;
		var temp3 = data.resource;
		resourceData = {
				money:temp3.money,//铜币
				food:temp3.food,//粮食
				ferrum:temp3.ironore//铁矿
		};
	}

	train = undefined;
	if(typeof(data.train) != 'undefined'){
		train = {
				soldierName:data.train.soldierName,
				soldierNo:data.train.soldierNo,
		};
		if(jyTimeInterval != null){
			clearInterval(jyTimeInterval);
			jyCnt = 0;
			jyTimeInterval = null;
			jyRemainTime =  "等待刷新！";
		}
		
		console.log("【剩余时间】 =================== " + data.train.remainedTime);//剩余时间
		if(jyTimeInterval == null)
			jyTimeInterval = setInterval("JYTimer(" + data.train.remainedTime + ")",1000);		
	}
	
	console.log("isJunying ============ " + isJunying);
	if(!isJunying){
		enterCityMenu('cityMenu');	
		changeMap('cityMenuLayer');	
		return;
	}
	
	junying(getClickObjectIndex());
	junyyingList(getClickObjectIndex());
	changeMap('cityMenuLayer');	
}
var jyCnt = 0;
var jyRemainTime = "等待刷新！";
function JYTimer(initData){
	if(initData > 0){
		jyCnt = jyCnt + 1;
	}else
		jyCnt = 0;
	
	if(initData <= 0){
	   jyRemainTime = "等待刷新！";
	}else
       jyRemainTime = changeTimeformat((initData/1000 - jyCnt)*1000);
};
var time;
function changeTimeformat(time)
{
			time = time  /1000;
			time = parseInt(time);
			var sT = '';
			var h = 0;
			var m = 0;
			var s = 0;
			while(time>=3600)
			{
				h++;
				time -= 3600;
			}
			while(time>=60)
			{
				m++;
				time -= 60;
			}
			s = time;
			h = checkTime(h);
			m = checkTime(m);
			s = checkTime(s);
			sT = h + ':' + m + ':' + s;
			return sT;
}
function checkTime(i)
{
	if (i<10){i="0" + i;}
	  	return i
}
var R1=new Array();
R1[1]=35;
R1[2]=55;
R1[3]=65;
R1[4]=20;
R1[5]=30;
R1[6]=25;
R1[7]=0;
R1[8]=7;
R1[9]=5;
R1[10]=3;
//var R2=new Array(35,55,65,20,30,25,0,7,5,3);
var R3=new Array(35,55,65,20,30,25,0,7,5,3);

function BubbleSort1()
{
         var n=R1.length-1;
         for(var i=1;i<n;i++)
         {
             var flag=false;
             for(var j=n-1;j>=i;j--)
             {
                 var temp;
                 if(R1[j+1]<R1[j])
                 {
                     temp=R1[j+1];
                     R1[j+1]=R1[j];
                     R1[j]=temp;
                 }
                 flag=true;
             }
             console.log("R1["+i+"] ======= " + R1[i]);
             if(!flag) return;        
         }
}

function BubbleSort2(R2)
{
         var n=R2.length;
         for(var i=0;i<n-1;i++)
         {
             var flag=false;
             for(var j=n-2;j>=i;j--)
             {
                 var temp;
                 if(R2[j+1]<R2[j])
                 {
                     temp=R2[j+1];
                     R2[j+1]=R2[j];
                     R2[j]=temp;
                 }
                 flag=true;
             }
             if(!flag) return;        
         }
         return R2[0];
}
function BubbleSort3()
{
         var n=R3.length;
         for(var i=0;i<n-1;i++)
         {
             var flag=false;
             for(var j=n-1;j>i;j--)
             {
                 var temp;
                 if(R3[j]<R3[j-1])
                 {
                     temp=R3[j];
                     R3[j]=R3[j-1];
                     R3[j-1]=temp;
                 }
                 flag=true;
             }
             console.log("R3["+i+"] ======= " + R3[i]);
             if(!flag) return;        
         }
}  

var isJyList = false;
var jyItemName = new Array();
var jyItemValue = new Array();
var junyyingList = function(index)//军营列表
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isJyList = true;
	gbox.addObject(
	{ 
		id : 'bylist',
		group : 'levelMenu_3',
		tileset : 'by_zjm_01',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [310,395], [540,395], [540,595],[310,595]],
		initialize : function()
		{
			if(typeof(userSoldier) != "undefined"){
				var itemIcon = new Array();
				for(var i=0; i<userSoldier.length; i++)
				    itemIcon.push(jyItem);
				
				jyItemName = new Array();
				jyItemValue = new Array();
					for(var i=0; i< userSoldier.length; i++){
						if(typeof(userSoldier[i]) != "undefined"){
							jyItemName[i] =  userSoldier[i].soldierName;
							jyItemValue[i] = userSoldier[i].soldierAmount;
						}
						
					}
			}
			
			var content = new Array(jyItemName,jyItemValue,itemIcon);
            var listLen = content[0].length;
            if(listLen < 5){
            	listLen = 5;
            }   
            jyOffsetY = jy_OffsetY = 0;
            jylist.init( 'jyRect', 'jyHitRect', 'jyPassRect','jyPassRect',null,content, 320, 425, 1, listLen, 29, 5, true, -77, 0 );
            jylist.itemOffsetX = -3;
            jylist.fontSize = 12;
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			if(jylist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(jyOffsetY) > 12)
				{
					jyOffsetY=12*(jyOffsetY/Math.abs(jyOffsetY));
				}
				jy_OffsetY = jyOffsetY;
				jy_BeginSlip = true;
				jy_Time = 0;

			}else{
				
                jylist.radioHandle(jylist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
                jyListIndex = jylist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				 console.log("jyIndex = " + jyListIndex);
	    		if(typeof(summaryData) != "undefined" && 
	    				  typeof(userSoldier) != "undefined" &&
	    				  typeof(userSoldier[jyListIndex]) != "undefined"){
	    		    if(lastTouchMoveX > 472 && lastTouchMoveX < 499){
	    		    	BuildingFunction.upgradeSoldierResource(userSoldier[jyListIndex].soldierNo,doUpgradeSoldierResource);
	    			 }else
	    			 if(lastTouchMoveX > 502 && lastTouchMoveX < 528){
	    				 BuildingFunction.dismissSoldierResource(userSoldier[jyListIndex].soldierNo,doDismissSoldierResource);		
	    			 }
	    		}
			}	
          	if(gbox._mouseArea(jylist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		jylist.keyUp();
            }
          	if(gbox._mouseArea(jylist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		jylist.keyDown();
            }
			junying(getClickObjectIndex());
		    changeMap('cityMenuLayer');
		},
		blit : function()
		{
			
			if(isDrawUI[index] && isJyList && isJunying)
			{
				jylist.paint( jy_OffsetY, jy_BeginSlip, jy_Time );
			}
		}
	 });
}
