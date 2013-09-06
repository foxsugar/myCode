var marketCtr = true;
var marketDivName = new Array();
var marketDiv = new Array();
var marketText = new Array();
var marketIndex1 = 0;
var marketIndex2 = 0;
var ownMoney = 0;
var limtCtr;

var marketBuild = function(index)
{
	
	gbox.setRenderOrder(['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	
	var bW = gbox.getImage('jy_zjm_01').width;
	var bH = gbox.getImage('jy_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;
	marketCtr = true;
	gbox.addObject(
	{ 
		id : 'marketpage',
		group : 'levelMenu_4',
		tileset : 'jy_zjm_01',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [318,123], [1118,123], [1117,619],[318,619]],
		initialize : function()
		{	
		   
	       if(marketDivName[0] == null && !gbox._isIndwellDiv("marketDiv1","input"))
					{
						var pnX = 577;
						var pnY = 376;
						marketDivName[0] = addDivWindowBg(pnX,pnY);
						marketDivName[0].id = 'marketDiv1';
						document.body.appendChild(marketDivName[0]);
						marketDiv[0] = document.createElement("input");
						marketDiv[0].style.id = 'marketValue1';
						marketDiv[0].style.backgroundColor = '#000000';
						marketDiv[0].style.width = '80px';
						marketDiv[0].style.height = '20px';
						marketDiv[0].style.color = '#ffffff';
						marketDiv[0].value = "";
			            marketDivName[0].appendChild(marketDiv[0]);
			            
			            	
					}
		   if(marketDivName[1] == null && !gbox._isIndwellDiv("marketDiv2","input"))
					{
						var pnX = 577;
						var pnY = 430;
						marketDivName[1] = addDivWindowBg(pnX,pnY);
						marketDivName[1].id = 'marketDiv2';
						document.body.appendChild(marketDivName[1]);
						marketDiv[1] = document.createElement("input");
						marketDiv[1].style.id = 'marketValue2';
						marketDiv[1].style.backgroundColor = '#000000';
						marketDiv[1].style.width = '80px';
						marketDiv[1].style.height = '20px';
						marketDiv[1].style.color = '#ffffff';
						marketDiv[1].value = "";
			            marketDivName[1].appendChild(marketDiv[1]);
					}
			 if(marketDivName[2] == null && !gbox._isIndwellDiv("marketDiv3","input"))
					{
						var pnX = 577;
						var pnY = 481;
						marketDivName[2] = addDivWindowBg(pnX,pnY);
						marketDivName[2].id = 'marketDiv3';
						document.body.appendChild(marketDivName[2]);
						marketDiv[2] = document.createElement("input");
						marketDiv[2].style.id = 'marketValue3';
						marketDiv[2].style.backgroundColor = '#000000';
						marketDiv[2].style.width = '80px';
						marketDiv[2].style.height = '20px';
						marketDiv[2].style.color = '#ffffff';
						marketDiv[2].value = "";
			            marketDivName[2].appendChild(marketDiv[2]);
					}
			 if(marketDivName[3] == null && !gbox._isIndwellDiv("marketDiv4","input"))
					{
						var pnX = 577;
						var pnY = 533;
						marketDivName[3] = addDivWindowBg(pnX,pnY);
						marketDivName[3].id = 'marketDiv4';
						document.body.appendChild(marketDivName[3]);
						marketDiv[3] = document.createElement("input");
						marketDiv[3].style.id = 'marketValue4';
						marketDiv[3].style.backgroundColor = '#000000';
						marketDiv[3].style.width = '80px';
						marketDiv[3].style.height = '20px';
						marketDiv[3].style.color = '#ffffff';
						marketDiv[3].value = "";
			            marketDivName[3].appendChild(marketDiv[3]);
					}
			 if(marketDivName[4] == null && !gbox._isIndwellDiv("marketDiv5","input"))
					{
						var pnX = 811;
						var pnY = 543;
						marketDivName[4] = addDivWindowBg(pnX,pnY);
						marketDivName[4].id = 'marketDiv5';
						document.body.appendChild(marketDivName[4]);
						marketDiv[4] = document.createElement("input");
						marketDiv[4].style.id = 'marketValue5';
						marketDiv[4].style.backgroundColor = '#000000';
						marketDiv[4].style.width = '80px';
						marketDiv[4].style.height = '20px';
						marketDiv[4].style.color = '#ffffff';
						marketDiv[4].value = "";
			            marketDivName[4].appendChild(marketDiv[4]);
					}
			 
			
		},
		
		first : function() 
		{  
			    /*
				* 控制浏览器大小变化时DIV输入框自动适配屏幕
				*/
					adaptiveDiv(marketDivName[0],"marketDiv1",577);
					adaptiveDiv(marketDivName[1],"marketDiv2",577);
					adaptiveDiv(marketDivName[2],"marketDiv3",577);
					adaptiveDiv(marketDivName[3],"marketDiv4",577);
					adaptiveDiv(marketDivName[4],"marketDiv5",811);
				/*======================================================*/		
	           if(marketDivName[0] != null && gbox._isIndwellDiv("marketDiv1","input"))
	           {
				   marketDiv[0].value = marketDiv[0].value.replace(/\D/g,'');
				   marketDiv[1].value = marketDiv[1].value.replace(/\D/g,'');
				   marketDiv[2].value = marketDiv[2].value.replace(/\D/g,'');
				   marketDiv[3].value = marketDiv[3].value.replace(/\D/g,'');
				   marketDiv[4].value = marketDiv[4].value.replace(/\D/g,'');				    				   
	           }
           
               if(Number(marketDiv[0].value) > onlyFood)
			   {	  	   
			   	   marketDiv[0].value = onlyFood;
			   }
			   if(Number(marketDiv[1].value) > onlyWood)
			   {
			   	   marketDiv[1].value = onlyWood;
			   }
			   if(Number(marketDiv[2].value) > onlyStone)
			   {
			   	   marketDiv[2].value = onlyStone;
			   }
			   if(Number(marketDiv[3].value)> onlyIronore)
			   {
			   	   marketDiv[3].value = onlyIronore;
			   }
			   
			   if(Number(marketDiv[4].value)> limtCtr)
				{
				   	 marketDiv[4].value = limtCtr;
				}
               ownMoney  = Number(parseInt(marketDiv[0].value*sellParamArray[0]) + parseInt(marketDiv[1].value*sellParamArray[1]) + parseInt(marketDiv[2].value*sellParamArray[2]) + parseInt(marketDiv[3].value*sellParamArray[3]));
		},
		myclick : function()
		{
			if(((852 < lastTouchMoveX) && (lastTouchMoveX < 874)) && ((471 < lastTouchMoveY) && (lastTouchMoveY < 491)))
			{//select market
				if(!comboboxes['market'].isOpen){
					//下拉框选中方法
					var selected = function(){
						comboboxes['market2'].setData(eval('marketdata'+comboboxes['market2'].selected.id),'id','name',true);
						
						var s1 = comboboxes['market'].selected.id;
						switch (s1) {
							case 0:
								limtCtr = onlyFood < exchangeLimit? onlyFood:exchangeLimit;
								break;
							case 1:
								limtCtr = onlyWood < exchangeLimit? onlyWood:exchangeLimit;
								break;
							case 2:
								limtCtr = onlyStone < exchangeLimit? onlyStone:exchangeLimit;
								break;
							case 3:
								limtCtr = onlyIronore < exchangeLimit? onlyIronore:exchangeLimit;
								break;
						}
						if(Number(marketDiv[4].value)> limtCtr)
						{
						   	 marketDiv[4].value = limtCtr;
						}
						
						ownResource =(parseInt(resourceValue[comboboxes['market2'].selected.id]/resourceValue[s1]* resourceFactor)* marketDiv[4].value);
				    	
						marketBuild(index);
						changeMap('jishiScreen_Layer'); 
					};
					//绘制下拉框
					var _index = getClickObjectIndex();
					comboboxes['market'].info(
							_index,
							'formations_market1',
							'levelMenu_5',
							'jishiScreen_Layer',
							['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
							737,
							491,
							{widthType:3,isScrolling:false}
					);
					comboboxes['market'].createCombobox(selected);
					
					marketBuild(index);
					changeMap('jishiScreen_Layer'); 
				}
			}
			if(((1070 < lastTouchMoveX) && (lastTouchMoveX < 1090)) && ((471 < lastTouchMoveY) && (lastTouchMoveY < 491)))
			{//select market2
				if(!comboboxes['market2'].isOpen){
					//下拉框选中方法
					var selected = function(){
				    	
				    	marketBuild(index);
						changeMap('jishiScreen_Layer'); 
					};
					//绘制下拉框
					var _index = getClickObjectIndex();
					comboboxes['market2'].info(
							_index,
							'formations_market2',
							'levelMenu_5',
							'jishiScreen_Layer',
							['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
							954,
							491,
							{widthType:3,isScrolling:false}
					);
					comboboxes['market2'].createCombobox(selected);
					
					marketBuild(index);
					changeMap('jishiScreen_Layer'); 
				}
			}
			if(((1003 < lastTouchMoveX) && (lastTouchMoveX < 1090)) && ((575 < lastTouchMoveY) && (lastTouchMoveY < 601)))
			{//确定换购
				var s1 = comboboxes['market'].selected.id;
				var s2 = comboboxes['market2'].selected.id;
				var inputValue = marketDiv[4].value;
				if(inputValue != null && inputValue != '' && typeof(inputValue)!= 'undefined'){
					BuildingFunction.exchangeResource(s1,inputValue,s2,doExchangeResource);
				}else{
					alert('请输入数量');
				}
			}
			if(((607 < lastTouchMoveX) && (lastTouchMoveX < 691)) && ((576 < lastTouchMoveY) && (lastTouchMoveY < 599)))
			{
				var temp1;
				var temp2;
				var temp3;
				var temp4;
				if(Number(marketDiv[0].value) > 0)
				  temp1 = Number(marketDiv[0].value);
				else
				  temp1 = 0;
				if(Number(marketDiv[1].value) > 0)
				  temp2 = Number(marketDiv[1].value);
				else
				  temp2 = 0;
				if(Number(marketDiv[2].value) > 0)
				  temp3 = Number(marketDiv[2].value);
				else
				  temp3 = 0;
				if(Number(marketDiv[3].value) > 0)
				  temp4 = Number(marketDiv[3].value);
				else
				  temp4 = 0;
				BuildingFunction.sellResource(temp1,temp2,temp3,temp4,dosellResource);
			}
			 if(((exitButtonCoordinate7.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate7.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate7.y + 12 < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate7.y+gbox.getImage("ty_an_17").height)+ 12))
			{
				        marketCtr = false;
					   if(marketDivName[0] != null && gbox._isIndwellDiv("marketDiv1","input"))
						{
							  document.body.removeChild(marketDivName[0]);  
							  marketDivName[0] = null;
						}
						if(marketDivName[1] != null && gbox._isIndwellDiv("marketDiv2","input"))
						{
							document.body.removeChild(marketDivName[1]);  
							marketDivName[1] = null;
						}
						if(marketDivName[2] != null && gbox._isIndwellDiv("marketDiv3","input"))
						{
							document.body.removeChild(marketDivName[2]);  
							marketDivName[2] = null;
						}
						if(marketDivName[3] != null && gbox._isIndwellDiv("marketDiv4","input"))
						{
							document.body.removeChild(marketDivName[3]);  
							marketDivName[3] = null;
						}	
						if(marketDivName[4] != null && gbox._isIndwellDiv("marketDiv5","input"))
						{
							document.body.removeChild(marketDivName[4]);  
							marketDivName[4] = null;
						}
						exit(getClickObjectIndex());
						jishiMenu();					
						changeMap('jishiScreen_Layer'); 
						//jishiList(getClickObjectIndex());
			}
			else
			{
				marketBuild(index);
			    changeMap('jishiScreen_Layer');
			}
			

		},
		blit : function()
		{
		      if(isDrawUI[index] && marketCtr)
			   {
			   	   
				   gbox.drawImage('jy_zjm_01',backdropX,backdropY);
				   gbox.drawImage('ty_an_27',backdropX1,backdropY1 + 4);
				   gbox.drawImage('jy_zjm_08',(gbox.getImage('pmh_zjm_02').width - gbox.getImage("jy_zjm_08").width)/2 + backdropX,backdropY1+14);
				   
				   gbox.drawText(onlyFood,429,294,2);
				   gbox.drawText(onlyWood,572,294,2);
				   gbox.drawText(onlyStone,716,294,2);
				   gbox.drawText(onlyIronore,859,294,2);
				   gbox.drawText(onlyMoney,1001,294,2);
				   
				   gbox.drawText(ownMoney,447,581,2);
				   gbox.drawText(ownResource,814,581,2);
				   gbox.drawText(exchangeLimit,810,510,2);
				   gbox.drawText(comboboxes['market'].selected.txt,780,475,2);
				   gbox.drawText(comboboxes['market2'].selected.txt,997,475,2);
				   
				   var tempStr = "换购区可为君主紧急使用资源获得方便。君主可利用现有多余资源换取当前急需资源，但需要缴纳一定数量的汇率差。" + 
				   build_Level[lotIndex] + "级集市每种资源每天可换购" + exchangeLimit + "资源。";
				   
				   gbox.drawLineBreakText(tempStr,735,366,0,350);
				   
				  
				   
				   gbox.drawImage('ty_an_10',607,575);
				   if(((607 < touchMoveX) && (touchMoveX < 691)) && ((573 < touchMoveY) && (touchMoveY < 604)))
			            {
			               gbox.drawImage('ty_an_09',607,575);				 		               
			            }
			        var rW = gbox.getImage('ty_an_09').width;
					var strW = gbox.getTextWidth("确定出售",14);
					var cntX = 608 + (rW - strW)/2;
					
			        gbox.drawText("确定出售",cntX - 2,580,10);
			        gbox.drawImage('ty_an_10',1002,574);				
			        if(((1011 < touchMoveX) && (touchMoveX < 1090)) && ((572 < touchMoveY) && (touchMoveY < 602)))
			            {
			                gbox.drawImage('ty_an_09',1002,570);						 			               
			            } 
			       var strW = gbox.getTextWidth("确定换购",14);
				   var cntX = 1002 + (rW - strW)/2;
				   
			       gbox.drawText("确定换购",cntX - 2,580,10);
			       
				   if(((exitButtonCoordinate7.x < touchMoveX) && (touchMoveX < exitButtonCoordinate7.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate7.y + 12 < touchMoveY) && (touchMoveY < exitButtonCoordinate7.y+gbox.getImage("ty_an_17").height)+ 12))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate7.x,exitButtonCoordinate7.y + 12);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate7.x,exitButtonCoordinate7.y + 12);	
						   }
				   
				   gbox.drawLineBreakText(buildCommonDesc[lotIndex],450,205,0,545);
				   
				   if(comboboxes['market'].isOpen){
					   marketDivName[4].style.display="none";
				   }else{
					   marketDivName[4].style.display="";
				   }
              }
		}
	});
};
function doExchangeResource(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	if(data)
	{
		marketDiv[4].value = "";
		exchangeLimit = data.resourceCanExchange;
	}
}
function dosellResource(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	if(data)
	{
		marketDiv[0].value = "";
		marketDiv[1].value = "";
		marketDiv[2].value = "";
		marketDiv[3].value = "";
		ownMoney = 0;
	}
}

