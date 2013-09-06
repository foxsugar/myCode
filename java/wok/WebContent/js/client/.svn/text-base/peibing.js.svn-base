var isPeibing = false;
var pbNum = 1;
var pbPage = 0;
var pbNum1 = 1;
var pbPage1 = 0;
var userHeros_Location = [[360,100],[460,58],[518,148],[666,183]];
var userSoldiers_Location = [[855,133],[988,95]];

var isDivOnkeyup = function(div)
{
	div.onkeyup = function()
	{
        
	};
};

var peibing = function(index,layer,groupBottom){
	peibingClass.draw.setLayer(layer);
	peibingClass.draw.setGroupBottom(groupBottom);
	var group = expeditionToolClass.draw.getGroupByGroupBottom(peibingClass.draw.groupBottom);
	gbox.setRenderOrder(group);
	isDrawUI[index] = true;
	isPeibing = true;
	var bW = gbox.getImage('peibingBG').width;
	var bH = gbox.getImage('peibingBG').height;
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
				id : 'peibing',
				group : 'levelMenu_3',
				tileset : 'peibingBG',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{
					   if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
						   
						   for(var i=pbPage; i<userHeros.length; i++){
								if(divPBNum[i] == null && !gbox._isIndwellDiv("divPBNum["+i+"]","input"))
								{
									var saX = userHeros_Location[3][0] - 18 + (userHeros_Location[3][1] - 92)/2;
									divPBNum[i] = addDivWindowBg(saX,202 + (i*32));
									divPBNum[i].id = "divPBNum["+i+"]";
									document.body.appendChild(divPBNum[i]);
									pbAuctionNum[i] = document.createElement("input");
									pbAuctionNum[i].style.backgroundColor = '#000000';
									pbAuctionNum[i].style.width = '92px';
									pbAuctionNum[i].style.color = '#ffffff';
									pbAuctionNum[i].value = userHeros[i].soldierAmount;
									//添加div input onchange,onfocus,onblur事件  
									//start
									pbAuctionNum[i].oninput = inputValueChange;
									pbAuctionNum[i].onfocus = inputOnfocus;
									pbAuctionNum[i].onblur = inputOnblur;
									//end
									divPBNum[i].appendChild(pbAuctionNum[i]);            
								}
						   }
						   		
					   }
					
				},
				first : function() 
				{		//div值更改
					   if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
						   for(var i=0; i<userHeros.length; i++){
							   
								if(divPBNum[i] != null && gbox._isIndwellDiv("divPBNum["+i+"]","input"))
								{
				                    /*
									* 控制浏览器大小变化时DIV输入框自动适配屏幕
									*/
									var saX = userHeros_Location[3][0] - 18 + (userHeros_Location[3][1] - 92)/2;
									adaptiveDiv(divPBNum[i],"divPBNum["+i+"]",saX);
								}
						   }
					   }
				}, 
				myclick : function()
				{

					if(lastTouchMoveX > 550 && lastTouchMoveX < (550 + 12) && lastTouchMoveY > 556 && lastTouchMoveY < (556 + 19)){
						//武将 上一页
						if(--pbNum < 1){
							pbNum = 1;
							pbPage = 0;
						}else
							pbPage -= 11;
					}
					if(lastTouchMoveX > 630 && lastTouchMoveX < (630 + 12) && lastTouchMoveY > 556 && lastTouchMoveY < (556 + 19)){
						//武将 下一页
						if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){		
							if(++pbNum > Math.ceil(userHeros.length/11)){
								pbNum = Math.ceil(userHeros.length/11);
							}else{
								pbPage += 11;
							}			
						}
					}
					if(lastTouchMoveX > 930 && lastTouchMoveX < (930 + 12) && lastTouchMoveY > 556 && lastTouchMoveY < (556 + 19)){
						//兵种 上一页
						if(--pbNum1 < 1){
							pbNum1 = 1;
							pbPage1 = 0;
						}else
							pbPage1 -= 11;
					}
					if(lastTouchMoveX > 1010 && lastTouchMoveX < (1010 + 12) && lastTouchMoveY > 556 && lastTouchMoveY < (556 + 19)){
						//兵种 下一页
						if(typeof(userSoldiers) != "undefined" && typeof(userSoldiers[0]) != "undefined"){		
							if(++pbNum1 > Math.ceil(userSoldiers.length/11)){
								pbNum1 = Math.ceil(userSoldiers.length/11);
							}else{
								pbPage1 += 11;
							}			
						}
					}
			        if(((361 < lastTouchMoveX) && (lastTouchMoveX < (361+84))) && ((582 < lastTouchMoveY) && (lastTouchMoveY < 597)))
			        {//全部清空操作
			        	battle.putOffAllSoldier(doPutOffAllSoldier);
			        }
			        if(((458 < lastTouchMoveX) && (lastTouchMoveX < (458+84))) && ((582 < lastTouchMoveY) && (lastTouchMoveY < 597)))
			        {//全部补满操作
			        	if((typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined")){
			        		var uhIds = new Array();
			        		var usIds = new Array();
			        		var csCnt = 0;
			        		for(var i=0; i<userHeros.length; i++){
			        			uhCnt[i] = getSoldierIndex(userSoldiers,userHeros[i].soldierNo);
								if(userHeros[i].soldierNo == null)
			        				continue;
								uhIds[csCnt] = userHeros[i].id;
								usIds[csCnt] = userHeros[i].soldierNo;
								csCnt++;
			        		}
				        	battle.putOnAllSoldier(uhIds.toString(),usIds.toString(),doPutOnAllSoldier);
			        	}  
			        }
			        if(((894 < lastTouchMoveX) && (lastTouchMoveX < 975)) && ((582 < lastTouchMoveY) && (lastTouchMoveY < 607)))
			        {// 确定按钮  配兵操作接口
			        	if((typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined")){
//				        		var uhIds = new Array();
//				        		var usIds = new Array();
//				        		var amounts = new Array();
//				        		var csCnt = 0;
//				        		for(var i=0; i<userHeros.length; i++){
//										uhCnt[i] = getSoldierIndex(userSoldiers,userHeros[i].soldierNo);
//										uhIds[csCnt] = userHeros[i].id;
//										usIds[csCnt] = userHeros[i].soldierNo;
//										amounts[csCnt] = pbAuctionNum[i].value;
//										csCnt++;
//				        		}
				        	peibingClass.handler.heroSoldierChangeListFormat();
//				        	console.log(peibingClass.store);
				        	battle.configSoldier(
				        			peibingClass.store.heroChangeList.toString(),
				        			peibingClass.store.soldierChangeList.toString(),
				        			peibingClass.store.soldierNumberChangeList.toString(),
				        			doConfigSoldier);
//				        	battle.configSoldier(uhIds.toString(),usIds.toString(),amounts.toString(),doConfigSoldier);
				        }
			        }
						   if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
							   for(var i=pbPage; i<userHeros.length; i++){
								   var uhY = 205 + ((i-pbPage)*32);
								   //统兵兵种对象
								   var _soldier;
								   //统兵兵种索引
								   var soldier_index = 0;
								   //统兵数量输入框 左箭头
								   if(pbAuctionNum[i].value != 1 && 
										   (lastTouchMoveX > 675 && lastTouchMoveX < (675 + 12) && 
												   lastTouchMoveY > uhY && lastTouchMoveY < (uhY + 19))){
									   pbAuctionNum[i].value = 0;
									   //计算输入框回零后的兵种数量变化
									   soldier_index = getSoldierIndex(userSoldiers,userHeros[i].soldierNo);
									   console.log(userHeros[i]);
									   if(userHeros[i].soldierName != '无' && userHeros[i].soldierName != null){
										   if(soldier_index == -1){
											   var onesoldier = {
														soldierName : userHeros[i].soldierName,
														soldierAmount : 0,
														soldierNo : userHeros[i].soldierNo
												};
												userSoldiers.push(onesoldier);
												setComboboxesData();
										   }
									   }
									   soldier_index = getSoldierIndex(userSoldiers,userHeros[i].soldierNo);
									   if(soldier_index != -1){
										   userSoldiers[soldier_index].soldierAmount = calculateSoldierAmount(
																						   pbAuctionNum[i].value,
																						   userHeros[i],
																						   userSoldiers[soldier_index].soldierAmount
												   										);
									   }
									 //更改配兵缓存数据
									 var obj = peibingClass.handler.creatHeroSoldierChange(i,userHeros[i].id,userHeros[i].soldierNo,pbAuctionNum[i].value);
									 peibingClass.handler.addHeroSoldierChange(obj);
									 console.log(peibingClass.store.heroSoldierChangeList);
								   }else
								   //统兵数量输入框 右箭头	   
								   if(pbAuctionNum[i].value != userHeros[i].command && (lastTouchMoveX > 795 && 
										   lastTouchMoveX < (795 + 12) && lastTouchMoveY > uhY && lastTouchMoveY < (uhY + 19))){
									   //默认最大值为武将统兵上限
									   var maxValue = userHeros[i].command;
									   soldier_index = getSoldierIndex(userSoldiers,userHeros[i].soldierNo);
									   if(soldier_index != -1)
									   {   //若当前已选择兵种，则去查看兵种剩余数量和当前已经统兵数量
										   var newValue = userSoldiers[soldier_index].soldierAmount + Number(pbAuctionNum[i].value);
										   if(newValue >= userHeros[i].command){
											   maxValue = userHeros[i].command;
										   }else{
											   maxValue = newValue;
										   }
										   _soldier = userSoldiers[soldier_index];
									   }
									   else{
										   maxValue = pbAuctionNum[i].value;
									   }
									   pbAuctionNum[i].value = maxValue;
									   if(typeof(_soldier) != "undefined"){
									   		//计算输入框值变化后的兵种数量变化
									   		_soldier.soldierAmount = calculateSoldierAmount(
													   pbAuctionNum[i].value,
													   userHeros[i],
													   _soldier.soldierAmount
			   										);
									   		//若兵种数量减少为0的时候，删除该兵种
											if(_soldier.soldierAmount == 0){
												userSoldiers.splice(soldier_index,1);
											}
									   }
									 //更改配兵缓存数据
									 var obj = peibingClass.handler.creatHeroSoldierChange(i,userHeros[i].id,userHeros[i].soldierNo,pbAuctionNum[i].value);
									 peibingClass.handler.addHeroSoldierChange(obj);
									 console.log(peibingClass.store.heroSoldierChangeList);
								   }else
								   //统兵选择
								   if(lastTouchMoveX > 640 && lastTouchMoveX < (640 + 21) && lastTouchMoveY > uhY && lastTouchMoveY < (uhY + 21)){
									   //下拉框添加
									   var heroindex = i;
									   //之前已选兵种对象
									   var oldsoldier;
									   
									   if(!comboboxes['positon_peibing'].isOpen){
										   //若之前已选择兵种
										   if(userHeros[heroindex].soldierNo != null){
											   //设置下拉框展开时的选中项为之前已选择兵种
											   comboboxes['positon_peibing'].selected = {
													   id: userHeros[heroindex].soldierNo,
													   txt: userHeros[heroindex].soldierName
											   };
											   //计算原兵种总数改变
											   soldier_index = getSoldierIndex(userSoldiers,userHeros[heroindex].soldierNo);
											   if(soldier_index != -1){
												   oldsoldier = userSoldiers[soldier_index];
											   }
											   else{
												   if(userHeros[heroindex].soldierName != '无'){
													   oldsoldier = {
																soldierName : userHeros[heroindex].soldierName,
																soldierAmount : Number(pbAuctionNum[heroindex].value),
																soldierNo : userHeros[heroindex].soldierNo
														};
												   }
											   }
										   }else{
											   //不存在则设置为第一项
											   comboboxes['positon_peibing'].selected = comboboxes['positon_peibing'].data[0];
										   }
											//下拉框选中方法
										   	//单击，将选中的兵种信息赋值给当前下拉框所对应的武将对象
											var selected = function(){
												//将原兵种总数改变
												if(typeof(oldsoldier) != 'undefined'){
													//若选中为 无
													if(comboboxes['positon_peibing'].selected.txt == '无'){
														soldier_index = getSoldierIndex(userSoldiers,oldsoldier.soldierNo);
														//若之前选中项不存在于兵种列表，添加
														if(soldier_index == -1){
															var onesoldier = {
																	soldierName : oldsoldier.soldierName,
																	soldierAmount : 0,
																	soldierNo : oldsoldier.soldierNo
															};
															userSoldiers.push(onesoldier);
															setComboboxesData();
															oldsoldier = userSoldiers[userSoldiers.length - 1];
														}
														pbAuctionNum[heroindex].value = 0;
													}
													oldsoldier.soldierAmount += Number(userHeros[heroindex].soldierAmount);
												}
												//赋值新选中的英雄属性
												userHeros[heroindex].soldierNo = comboboxes['positon_peibing'].selected.id;
												userHeros[heroindex].soldierName = comboboxes['positon_peibing'].selected.txt;
												
												//计算选中兵种变化后的兵种总数改变
												soldier_index = getSoldierIndex(userSoldiers,userHeros[heroindex].soldierNo);
												if(soldier_index != -1){
													 //计算输入框值变化后的兵种数量变化
													   if(userHeros[heroindex].soldierAmount > userSoldiers[soldier_index].soldierAmount){
														   userHeros[heroindex].soldierAmount = userSoldiers[soldier_index].soldierAmount;
													   }
													   userSoldiers[soldier_index].soldierAmount -= userHeros[heroindex].soldierAmount;
													   pbAuctionNum[heroindex].value = userHeros[heroindex].soldierAmount;
													 //若兵种数量减少为0的时候，删除该兵种
														if(userSoldiers[soldier_index].soldierAmount == 0){
															userSoldiers.splice(soldier_index,1);
														}
												}else{
													
												}
												//更改配兵缓存数据
												var obj = peibingClass.handler.creatHeroSoldierChange(heroindex,userHeros[heroindex].id,userHeros[heroindex].soldierNo,pbAuctionNum[heroindex].value);
												peibingClass.handler.addHeroSoldierChange(obj);
												console.log(peibingClass.store.heroSoldierChangeList);
												//刷新配兵界面
												peibing(getClickObjectIndex());
												peibingClass.draw.changeMap();
											};
											//绘制下拉框
											var _index = getClickObjectIndex();
											comboboxes['positon_peibing'].info(
													_index,
													'peibing_combobox1',
													'levelMenu_4',
													peibingClass.draw.layer,
													expeditionToolClass.draw.getGroupByGroupBottom(peibingClass.draw.groupBottom),
													524,
													uhY+6,
													{widthType:3,isScrolling:false}
											);
											comboboxes['positon_peibing'].createCombobox(selected);
											peibing(getClickObjectIndex());
											peibingClass.draw.changeMap();
										}
									   
								   }
							   }
							   
						   }
					
			        if(((999 < lastTouchMoveX) && (lastTouchMoveX < 1080)) && ((583 < lastTouchMoveY) && (lastTouchMoveY < 607)))
			        {//返回按钮
						displayDestroy();
						isPeibing = false;
						exit(index);
						peibingClose();
						peibingClass.draw.changeMap();
                        
			        }else 
			         if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
					{//关闭按钮
			        	console.log('关闭');
			        	displayDestroy();
						isPeibing = false;
						exit(index);
						peibingClose();
						peibingClass.draw.changeMap();
                        
					}else{
				    	isDrawUI[index] = true;
				    	isPeibing = true;
						peibing(getClickObjectIndex());
						peibingClass.draw.changeMap();
			        }
			        
				},
				blit : function()
				{
					 if(isDrawUI[index] && isPeibing)
					 {
					 	gbox.drawImage('peibingBG',backdropX,backdropY);
					 	gbox.drawImage('ty_an_27',backdropX1,backdropY1 + 4);					 	
					    gbox.drawImage('pb_zj_08',(gbox.getImage('peibingBG').width - gbox.getImage("pb_zj_08").width)/2 + backdropX,backdropY1);
				        gbox.setClip(gbox.getBufferContext(),360,200,720,350); 
					    if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
						   for(var i=pbPage; i<userHeros.length; i++){   
							   var fontW = gbox.getTextWidth(userHeros[i].heroName,14);
				 		       var dx = 359 + (97 - fontW)/2;
					 	       var dy = 198 + (31 - 14)/2;
							   gbox.drawText(userHeros[i].heroName,dx,dy + ((i-pbPage)*32),5,userHeros[i].quality);
							   var fontW = gbox.getTextWidth(userHeros[i].level,14);
				 		       var dx = 459 + (58 - fontW)/2;
					 	       var dy = 198 + (31 - 14)/2;
					 	       gbox.drawText(userHeros[i].level,dx,dy + ((i-pbPage)*32),5);
							   
							   if(userHeros[i].soldierName != null){
								    var fontW = gbox.getTextWidth(userHeros[i].soldierName,14);
				 		            var dx = 517 + (122 - fontW)/2;
					 	            var dy = 198 + (31 - 14)/2;
					 	            gbox.drawText(userHeros[i].soldierName,dx,dy + ((i-pbPage)*32),5);								   
							   } 
							   else{
								    var fontW = gbox.getTextWidth("无",14);
				 		            var dx = 517 + (122 - fontW)/2;
					 	            var dy = 198 + (31 - 14)/2;
					 	            gbox.drawText("无",dx,dy + ((i-pbPage)*32),5);	
							   }		
							   gbox.drawImage('ty_an_25',675,205 + ((i-pbPage)*32));
							   gbox.drawImage('ty_an_24',795,205 + ((i-pbPage)*32));
							   gbox.drawImage("ty_tdt_10",640,203 + ((i-pbPage)*32));
							   gbox.drawText(userHeros[i].command,812,208 + ((i-pbPage)*32),4);
						   }
						   
						   for(var i=0; i<userHeros.length; i++){
							   var divPBNumY = (202 - (pbPage * 32))  + (i * 32);
							   if(divPBNum[i] != null && gbox._isIndwellDiv("divPBNum["+(i)+"]","input"))
							   {
								   divPBNum[i].style.top = divPBNumY;
							   }
							   if(divPBNumY > 200 && divPBNumY < (200 + 350))
							   {
								   pbAuctionNum[i].style.display="";
							   }else{
								   pbAuctionNum[i].style.display="none";
							   }
						   }
					   }

						if(typeof(userSoldiers) != "undefined" && typeof(userSoldiers[0]) != "undefined"){
							
							   for(var i=pbPage1; i<userSoldiers.length; i++){
								    var fontW = gbox.getTextWidth(userSoldiers[i].soldierName,14);
				 		            var dx = 854 + (131 - fontW)/2;
					 	            var dy = 198 + (31 - 14)/2;
					 	            gbox.drawText(userSoldiers[i].soldierName,dx,dy + ((i-pbPage1)*32),5);
								    var fontW = gbox.getTextWidth(userSoldiers[i].soldierAmount,14);
				 		            var dx = 988 + (92 - fontW)/2;
					 	            var dy = 198 + (31 - 14)/2;
								    gbox.drawText(userSoldiers[i].soldierAmount,dx,dy + ((i-pbPage1)*32),5);
							   }
						}
				        gbox.restoreClip(gbox.getBufferContext());
				        
						   if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
				               if(pbNum > 1)
				               {
				               	   gbox.drawImage('ty_an_25',550,556);
				               }
				               if(pbNum < Math.ceil(userHeros.length/11))
				               {
				               	   gbox.drawImage('ty_an_24',630,556);
				               }
						       var fontW = gbox.getTextWidth((pbNum) + "/" + Math.ceil(userHeros.length/11),14);
				 		       var dx = 582 + (53 - fontW)/2;
					 	       var dy = 555 + (19 - 14)/2;
					 	       gbox.drawText((pbNum) + "/" + Math.ceil(userHeros.length/11),dx,dy,10);
						   }

							if(typeof(userSoldiers) != "undefined" && typeof(userSoldiers[0]) != "undefined"){
					            if(pbNum1 > 1)
					            {
					               	gbox.drawImage('ty_an_25',930,556);
					            }
					            if(pbNum1 < Math.ceil(userSoldiers.length/11))
					            {
					               	gbox.drawImage('ty_an_24',1010,556);
					            }
							 
							    var fontW = gbox.getTextWidth((pbNum1) + "/" + Math.ceil(userSoldiers.length/11),14);
				 		        var dx = 943 + (53 - fontW)/2;
					 	        var dy = 555 + (19 - 14)/2;
						        gbox.drawText((pbNum1) + "/" + Math.ceil(userSoldiers.length/11),dx,dy,10);
							}
							gbox.drawImage('ty_an_10',361,580);						   
				            if(((361 < touchMoveX) && (touchMoveX < (361+84))) && ((582 < touchMoveY) && (touchMoveY < 597)))
				            {
				               gbox.drawImage('ty_an_09',361,580);							 		               
				            }
				            var strW = gbox.getTextWidth("全部清空",14);
				            var cntX = 361 + (gbox.getImage("ty_an_09").width - strW)/2;
				            var cntY = 580 + (gbox.getImage("ty_an_09").height - 14)/2;
			                gbox.drawText("全部清空", cntX,cntY,10);
				            gbox.drawImage('ty_an_10',458,580);
				            if(((458 < touchMoveX) && (touchMoveX < (458+84))) && ((582 < touchMoveY) && (touchMoveY < 597)))
				            {
				               gbox.drawImage('ty_an_09',458,580);							 	               
				            }
				            var strW = gbox.getTextWidth("全部补满",14);
				            var cntX = 458 + (gbox.getImage("ty_an_09").width - strW)/2;
				            var cntY = 580 + (gbox.getImage("ty_an_09").height - 14)/2;
			                gbox.drawText("全部补满", cntX,cntY,10);
				            gbox.drawImage('ty_an_10',894,580);
				            if(((894 < touchMoveX) && (touchMoveX < 975)) && ((582 < touchMoveY) && (touchMoveY < 597)))
				            {
				               gbox.drawImage('ty_an_09',894,580);							 		               
				            }		
				            var strW = gbox.getTextWidth("确 定",14);
				            var cntX = 894 + (gbox.getImage("ty_an_09").width - strW)/2;
				            var cntY = 580 + (gbox.getImage("ty_an_09").height - 14)/2;
			                gbox.drawText("确 定", cntX,cntY,10);
			                
				            gbox.drawImage('ty_an_10',999,580);
				            if(((999 < touchMoveX) && (touchMoveX < 1080)) && ((582 < touchMoveY) && (touchMoveY < 607)))
				            {
				               gbox.drawImage('ty_an_09',999,580);							 	               
				            }
				            var strW = gbox.getTextWidth("返 回",14);
				            var cntX = 999 + (gbox.getImage("ty_an_09").width - strW)/2;
				            var cntY = 580 + (gbox.getImage("ty_an_09").height - 14)/2;
			                gbox.drawText("返 回", cntX,cntY,10);
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

//配兵全部清空操作
function doPutOffAllSoldier(data){
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	userSoldiers = new Array();
	if(typeof(data.userSoldiers) != "undefined")
	{
		for(var i =0; i<data.userSoldiers.length; i++)
		{
			userSoldiers[i] = 
			{
				soldierName : data.userSoldiers[i].soldierName,
				soldierAmount : data.userSoldiers[i].soldierAmount,
				soldierNo:data.userSoldiers[i].soldierNo,
			};
		}
	}


	userHeros = new Array();
	if(typeof(data.userHeros) != "undefined")
	{
		pbListColor = new Array();
		for(var i =0; i<data.userHeros.length; i++)
		{
			userHeros[i] = 
			{
					id : data.userHeros[i].id,
					soldierNo:data.userHeros[i].soldierNo,
					heroName:data.userHeros[i].toolTipInfo.heroName,
					quality : data.userHeros[i].toolTipInfo.quality,
					level:data.userHeros[i].toolTipInfo.level,
					soldierName:data.userHeros[i].soldierName,
					soldierAmount:data.userHeros[i].soldierAmount,
					command:data.userHeros[i].toolTipInfo.command,
			};
			pbListColor[i] = qualityColor[data.userHeros[i].toolTipInfo.quality];
		}
	}
	 for(var i=0; i<userHeros.length; i++){
			if(divPBNum[i] != null && gbox._isIndwellDiv("divPBNum["+i+"]","input"))
			{
				pbAuctionNum[i].value = 0;
			}
	}
	uhCnt = new Array();
	peibing(getClickObjectIndex());
	peibingClass.draw.changeMap();	
	alert("全部清空成功！");	
}
//配兵全部补满操作
function doPutOnAllSoldier(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	
	userSoldiers = new Array();
	if(typeof(data.userSoldiers) != "undefined")
	{
		for(var i =0; i<data.userSoldiers.length; i++)
		{
			userSoldiers[i] = 
			{
				soldierName : data.userSoldiers[i].soldierName,
				soldierAmount : data.userSoldiers[i].soldierAmount,
				soldierNo:data.userSoldiers[i].soldierNo,
			};
		}
	}


	userHeros = new Array();
	if(typeof(data.userHeros) != "undefined")
	{
		pbListColor = new Array();
		for(var i =0; i<data.userHeros.length; i++)
		{
			userHeros[i] = 
			{
				id : data.userHeros[i].id,
				soldierNo:data.userHeros[i].soldierNo,
				heroName:data.userHeros[i].toolTipInfo.heroName,
				quality : data.userHeros[i].toolTipInfo.quality,
				level:data.userHeros[i].toolTipInfo.level,
				soldierName:data.userHeros[i].soldierName,
				soldierAmount:data.userHeros[i].soldierAmount,
				command:data.userHeros[i].toolTipInfo.command,
			};
			pbListColor[i] = qualityColor[data.userHeros[i].toolTipInfo.quality];
		}
	}
	 if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
		 for(var i=0; i<userHeros.length; i++){
			if(divPBNum[i] != null && gbox._isIndwellDiv("divPBNum["+i+"]","input"))
			{
				if(userHeros[i].soldierName != null){
					pbAuctionNum[i].value = userHeros[i].soldierAmount > userHeros[i].command ? userHeros[i].soldierAmount : userHeros[i].command;
				}
			}
		 }
	 }
	 
	 for(var i=0; i<isChengQiangGen.length; i++){
			var index = getHeroIndex(userHeros,'id',isChengQiangGen[i].heroId);
			if(index >= 0 && userHeros[index].soldierName != null){
				isChengQiangGen[i].soldierName = userHeros[index].soldierName;
				isChengQiangGen[i].commandNum = pbAuctionNum[index].value;
			}
	}
	alert("全部补满成功！");	
}
//配兵操作接口
function doConfigSoldier(data){
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	alert("配兵成功！");
	//城墙配兵成功后操作执行
	if(isChengQiang){
		for(var i=0; i<isChengQiangGen.length; i++){
			var index = getHeroIndex(userHeros,'id',isChengQiangGen[i].heroId);
			if(index >= 0 && userHeros[index].soldierName != null){
				isChengQiangGen[i].soldierName = userHeros[index].soldierName;
				isChengQiangGen[i].commandNum = pbAuctionNum[index].value;
			}
		}
		//战斗力计算
		getTotalForce(isChengQiangGen);
	}
	
	if(warpthMenuClass.flag.isDrawWarpthMenu){
		var gl = warpthMenuClass.store.chosenGeneral.generals;
		for(var i=0; i<gl.length; i++){
			for(var j=0; j<userHeros.length; j++){
				if(gl[i].id == userHeros[j].id)
					gl[i].soldierAmount = userHeros[j].soldierAmount;
			}
		}
	}
	peibingClass.handler.cleanHeroSoldierChange();
}

//input oninput事件
var inputValueChange = function(e){
	//赋值this关键字: this代指Input对象本身
	var _input = this;
	//如果输入不是数字则清空输入
	_input.value = _input.value.replace(/\D/g,'');
	//获取父节点div Id 中的索引
	var _index = _input.parentNode.id.replace(/\D/g,'');
	//设置最大取值  当前英雄统兵上限
	var maxValue = userHeros[_index].command;
	//对应统兵兵种
	var soldier;
	var tempIndex = getSoldierIndex(userSoldiers,userHeros[_index].soldierNo);
	//如果当前对应的英雄有统兵
	if(tempIndex != -1){
		//赋值对应统兵兵种对象
		soldier = userSoldiers[tempIndex];
		//当前兵种总数 : 该兵种总数与当前英雄统兵数之和
		var maxSoldierAmount = Number(soldier.soldierAmount) + Number(userHeros[_index].soldierAmount);
		//如果当前兵种总数大于当前英雄统兵上限：最大值为当前英雄统兵上限
		if(maxSoldierAmount > userHeros[_index].command)
			maxValue = userHeros[_index].command;
		else//小于:最大值为当前兵种总数
			maxValue = maxSoldierAmount;
	}else{
		//若当前英雄带有兵种，并且 空闲兵种中不存在当前英雄所带兵种
		if(userHeros[_index].soldierNo){
			//创建兵种对象
			var onesoldier = {
					soldierName : userHeros[_index].soldierName,
					soldierAmount : 0,
					soldierNo : userHeros[_index].soldierNo
			};
			//将该兵种添加到空闲兵种集合中
			userSoldiers.push(onesoldier);
			setComboboxesData();
			//赋值对应兵种对象
			soldier = userSoldiers[userSoldiers.length-1];
			//最大值为当前英雄所统兵数
			maxValue = userHeros[_index].soldierAmount;
		}
	}
	//如果输入值大于最大值:输入值等于最大值
	if(_input.value > maxValue){	
		_input.value = maxValue;
	}else//输入值小于0:输入值等于0
	if(_input.value < 0)
		_input.value = 0;
	
	//若对应英雄已选择统兵兵种，兵种数量改变
	if(typeof(soldier) != 'undefined'){
		soldier.soldierAmount = calculateSoldierAmount(_input.value,userHeros[_index],soldier.soldierAmount);
		//若兵种数量减少为0的时候，删除该兵种
		if(soldier.soldierAmount == 0){
			userSoldiers.splice(tempIndex,1);
		}
	}
	//更改配兵缓存数据
	var obj = peibingClass.handler.creatHeroSoldierChange(_index,userHeros[_index].id,userHeros[_index].soldierNo,_input.value);
	peibingClass.handler.addHeroSoldierChange(obj);
	console.log(peibingClass.store.heroSoldierChangeList);
};

//更新下拉框数据
var setComboboxesData = function(){
	var data = [{id:'',txt:'无'}];
	for(var i=0; i<userSoldiers.length; i++){
		var line = userSoldiers[i];
		var obj = {
		 	id:line['soldierNo'],
		  	txt:line['soldierName']
		};
		data.push(obj);
	}
	comboboxes['positon_peibing'].setData(data,'id','txt');
};

//输入框获取焦点事件
var inputOnfocus = function(){
	//如果Value为0,设置为空
	if(this.value == 0)
		this.value = '';
};

//输入框获取焦点事件
var inputOnblur = function(){
	//如果Value为空,设置为0
	if(this.value == '')
		this.value = 0;
//	else{
//		//如果当前行为设置兵种，value设置为0
//		var _index = this.parentNode.id.replace(/\D/g,'');
//		if(getSoldierIndex(userSoldiers,userHeros[_index].soldierNo) == -1)
//			this.value = 0;
//	}
};
//计算兵种总数变化
//@inputValue 			   输入框中的值
//@userHero				   当前英雄对象
//@tempSoldierAmount     原总数
var calculateSoldierAmount = function(inputValue,userHero,tempSoldierAmount){
	if(inputValue == '') inputValue = 0;
	//计算当前英雄所统兵种的数量    总数 = 原总数 - 统兵数变化量:(输入值 - 当前统兵数)
	var soldierAmount = tempSoldierAmount - (inputValue - userHero.soldierAmount);
	//改变当前英雄统兵数量
	userHero.soldierAmount = inputValue;
	return soldierAmount;
};

var getSoldierIndex = function(userSoldiers,soldierNo){
	for(var j =0; j<userSoldiers.length; j++)
	{
		if(soldierNo == userSoldiers[j].soldierNo)
		{
           return j;
		}
	}
	return -1;
};

var peibingClose = function(){};

//配兵类
peibingClass = {};
peibingClass.store = {};
peibingClass.handler = {};
peibingClass.draw = {};
peibingClass.draw.index = 0;
peibingClass.draw.groupBottom = 'cityMenu';
peibingClass.draw.layer = 'cityMenuLayer';

peibingClass.store.heroSoldierChangeList = [];
peibingClass.store.heroChangeList = [];
peibingClass.store.soldierChangeList = [];
peibingClass.store.soldierNumberChangeList = [];

//changeMap封装
peibingClass.draw.changeMap = function(){
	changeMap(peibingClass.draw.layer);
};
//窗体底层参数设置
peibingClass.draw.setGroupBottom = function(groupBottom){
	if(groupBottom)
		peibingClass.draw.groupBottom = groupBottom;
};
//窗体layer设置
peibingClass.draw.setLayer = function(layer){
	if(layer)
		peibingClass.draw.layer = layer;
};


peibingClass.handler.loopHeroSoldierChangeList = function(fn,needBreak){
	var list = peibingClass.store.heroSoldierChangeList;
	for(var i=0; i<list.length; i++){
		var obj = list[i];
		var breakit = fn(i,obj);
		if(needBreak)
			if(breakit)
				break;
	}
};

peibingClass.handler.getHeroSoldierChangeById = function(id){
	var hsc = false;
	this.loopHeroSoldierChangeList(function(index,obj){
		var re = false;
		if(id == obj.id){
			re = true;
			hsc = obj;
		}
		return re;
	}, true);
	return hsc;
};

peibingClass.handler.creatHeroSoldierChange = function(id,heroId,soldierId,soldierNumber){
	var obj = {
		id: id,
		heroId : heroId,
		soldierId : soldierId,
		soldierNumber : soldierNumber
	}; 
	return obj;
};

peibingClass.handler.addHeroSoldierChange = function(obj){
	var hsc = this.getHeroSoldierChangeById(obj.id);
	if(hsc){
		hsc.id = obj.id;
		hsc.heroId = obj.heroId;
		hsc.soldierId = obj.soldierId;
		hsc.soldierNumber = obj.soldierNumber;
	}else{
		peibingClass.store.heroSoldierChangeList.push(obj);
	}
};

peibingClass.handler.heroSoldierChangeListFormat = function(){
	peibingClass.store.heroChangeList = [];
	peibingClass.store.soldierChangeList = [];
	peibingClass.store.soldierNumberChangeList = [];
	
	this.loopHeroSoldierChangeList(function(index,obj){
		peibingClass.store.heroChangeList.push(obj.heroId);
		peibingClass.store.soldierChangeList.push(obj.soldierId);
		peibingClass.store.soldierNumberChangeList.push(obj.soldierNumber);
	}, false);
};

peibingClass.handler.cleanHeroSoldierChange = function(){
	peibingClass.store.heroSoldierChangeList = [];
};
