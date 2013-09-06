var guokuItem = function(index,tempx,tempy,isUseAble,isSalePrice,isThrowAble,_group,_layer)//国库弹出条
{

	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
    var bW = 808;
	var bH = 497;
	var popStr = ["使  用","回  收","丢  弃","批量使用"];
	var flagBoolean = [isUseAble,isSalePrice,isThrowAble,false];
	var btnW = gbox.getImage('ty_an_98').width;
	var btnH = gbox.getImage('ty_an_98').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'Item',
		group : 'levelMenu_3',
		tileset : 'ty_an_98',
		x : 0,
		y : 0,
		frame : 0,
		//poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
		poly : [ [tempx,tempy], [tempx + 84,tempy], [tempx + 84,tempy + 101],[tempx,tempy + 101]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			for(var i=0; i<popStr.length; i++){
                var btnX = tempx;
                var btnY = tempy + (i*btnH);
				if(((btnX < lastTouchMoveX) && (lastTouchMoveX < (btnX + btnW))) && ((btnY < lastTouchMoveY) && (lastTouchMoveY < (btnY + btnH))))
			    {
			        switch(i){
			        case 0://使用
						if(typeof(isUseAble) == "undefined" || isUseAble == 0){
							return;
						}else
						{
							drawGkItem = true;
				            isDrawUI[index] = false;
		                    exit(getClickObjectIndex());
							if(typeof(gkData[guokuIndex]) != "undefined" && 
							   typeof(gkData[guokuIndex].toolTipInfo) != "undefined" ){
								var btnTxt = new Array();
								btnTxt[0] = "确定";
								btnTxt[1] = "取消";
			                    isShowUsePorp = true;
			                    usePorp(getClickObjectIndex(),1,"确定要使用" + gkData[guokuIndex].toolTipInfo.itemName + "吗？",btnTxt,20,_group,_layer)
								changeMap(_layer);								        	
							}
							console.log("使用");
							guoku(getClickObjectIndex(),_group,_layer); 
							changeMap(_layer);	
						}
			        	break;
			        case 1://回收
						if(typeof(isSalePrice) == "undefined" || isSalePrice == 0){
							return;
						}else{
							drawGkItem = true;
							isDrawUI[index] = false;
		                    exit(getClickObjectIndex());	
							if(typeof(gkData[guokuIndex]) != "undefined" && 
							   typeof(gkData[guokuIndex].toolTipInfo) != "undefined" ){
								BuildingFunction.sellItem(gkData[guokuIndex].id,gkData[guokuIndex].type,doDeleteUserItem);
							}                    				
							console.log("回收");
							guoku(getClickObjectIndex(),_group,_layer); 
						    changeMap(_layer);	
						}
			        	break;
			        case 2://丢弃
						if(typeof(isThrowAble) == "undefined" || isThrowAble == 0){
							return;	
						}else{
							drawGkItem = true;
				            isDrawUI[index] = false;
							exit(getClickObjectIndex());
							if(typeof(gkData[guokuIndex]) != "undefined" && 
							   typeof(gkData[guokuIndex].toolTipInfo) != "undefined" ){
								BuildingFunction.deleteUserItem(gkData[guokuIndex].id,gkData[guokuIndex].type,doDeleteUserItem);
							}
							console.log("丢弃");
							guoku(getClickObjectIndex(),_group,_layer); 
						    changeMap(_layer);			    
						}
			        	break;
			        case 3://批量使用
			        	console.log("批量使用！！！");
			        	break;
			        }
			    }
			}
		},
		blit : function()
		{
			if(isDrawUI[index] && !drawGkItem)
			{
					 for(var i=0; i<popStr.length; i++){
						 gbox.drawImage('ty_an_98',tempx,tempy + (i*btnH));
							var fontW = gbox.getTextWidth(popStr[i],14);
							var btnW = gbox.getImage('ty_an_98').width;
                         var btnX = tempx;
                         var btnY = tempy + (i*btnH);
                         if(typeof(flagBoolean) != "undefined" && flagBoolean[i] != 0)
				 		 {
	 							if(((btnX < touchMoveX) && (touchMoveX < (btnX + btnW))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + btnH))))
						        {
						               gbox.drawImage('ty_an_99',btnX,btnY);
						        }
				 		 }else{
				 			gbox.drawImage('ty_an_121',btnX,btnY);
				 		 }

							
							var dx = tempx + (btnW - fontW)/2;
							var dy = tempy + (btnH - 14)/2 + i*btnH;
							gbox.drawDanceString("" + popStr[i], dx, dy + 1,14,'#000000','#FFFFFF');
					}	
			}

		}		
	 });

}

function usePorp(index,dValue,txt,bntTxt,offsetY,_group,_layer)
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	var pW = gbox.getImage('dialogBg').width;
	var pH = gbox.getImage('dialogBg').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	
	gbox.addObject(
	{ 
		id : 'use_Porp',
		group : 'levelMenu_4',
		tileset : 'dialogBg',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		initialize : function()
		{
			if(isDrawUI[index] && isShowUsePorp && 
			   propNumbg == null && !gbox._isIndwellDiv("propNumbg","input"))
			{
				var pnX = (pX+(pW - 40)/2);
				var pnY = (pY+(pH - 20)/2) +  offsetY;
				propNumbg = addDivWindowBg(pnX,pnY);
				propNumbg.id = 'propNumbg';
				document.body.appendChild(propNumbg);
	            propNum = document.createElement("input");
	            propNum.style.id = 'e_3';
	            propNum.style.backgroundColor = '#000000';
	            propNum.style.width = '40px';
	            propNum.style.color = '#ffffff';
	            propNum.value = dValue;
	            //equipmentNum.display = block;
	            propNumbg.appendChild(propNum);
			}			
		},
		first : function() 
		{	
			/*
			* 控制浏览器大小变化时DIV输入框自动适配屏幕
			*/
			adaptiveDiv(propNumbg,"propNumbg",(pX+(pW - 40)/2));
			/*======================================================*/		
               propNum.value = propNum.value.replace(/\D/g,'');			
		},
		myclick : function()
		{ 
	
			
			
			if(gbox._mouseArea(btnPoly[0],lastTouchMoveX,lastTouchMoveY)){

//					if(propNum.value > gkData[guokuIndex].amount){
//						alert("系统提示：使用超过最大数量！");
//		                usePorp(index,propNum.value,txt,bntTxt,offsetY);		
//		                changeMap('cityMenuLayer');							
//						return;
//					}else if(propNum.value <= 0){
//						alert("系统提示：使用数量不能为空或零！");
//		                usePorp(index,propNum.value,txt,bntTxt,offsetY,_group,_layer);		
//		                changeMap(_layer);							
//						return;
//					}
//				
//				
//					if(typeof(gkData[guokuIndex]) != "undefined" &&
//					   typeof(gkData[guokuIndex].toolTipInfo) != "undefined" ){
//					       useItem(gkData[guokuIndex].id,propNum.value,doUseItem);
//					}  	
//					exit(getClickObjectIndex());			    
//					if(propNumbg != null && 
//					   typeof(propNumbg) != "undefined" &&
//					   gbox._isIndwellDiv("propNumbg","input")){
//				            document.body.removeChild(propNumbg);  
//				            propNumbg = null;  
//					}
				    isShowUsePorp = false;
					guoku(getClickObjectIndex(),_group,_layer); 
					changeMap(_layer);	
			}else if(gbox._mouseArea(btnPoly[1],lastTouchMoveX,lastTouchMoveY)){
				    exit(getClickObjectIndex());
					if(propNumbg != null && 
					   typeof(propNumbg) != "undefined" &&
					   gbox._isIndwellDiv("propNumbg","input")){
				            document.body.removeChild(propNumbg);  
				            propNumbg = null;
					} 
				    isShowUsePorp = false;
				    guoku(getClickObjectIndex(),_group,_layer); 
					changeMap(_layer);		
			}
			else{
                usePorp(index,propNum.value,txt,bntTxt,offsetY,_group,_layer);		
                changeMap(_layer);		
			}	
		},
		blit : function()
		{
			if(isDrawUI[index] && isShowUsePorp)
			{
				
				var scale = bntTxt.length;
				var dialogX = this.poly[0][0];
				var dialogY = this.poly[0][1];
				var dialogW = gbox.getImage('dialogBg').width;
				var dialogH = gbox.getImage('dialogBg').height;
				
				gbox.drawImage('dialogBg',dialogX, dialogY);
				var txtArray = gbox.getStringsArray(txt,200,16);
				var txtW = gbox.stringArrayWidth(txtArray,16);
				var tX = dialogX + (dialogW - txtW)/2;
				var tY = dialogY + (dialogH - txtArray.length * 20)/2;
				for(var a=0; a<txtArray.length; a++){	
				   gbox.drawString(txtArray[a],tX, tY + (20*a) - offsetY,"#FFFFFF",16);
				}
				
				var scaleW = (dialogW/scale);
				var imgW = gbox.getImage('xiangqian_button0').width;
				var imgH = gbox.getImage('xiangqian_button0').height;
				btnPoly = new Array(new Array()); 
				for(var i=0; i<bntTxt.length; i++){
					var imgX = dialogX + (scaleW - imgW)/2 + (scaleW * i);
					var imgY = dialogY + dialogH - imgH - offsetY;
					gbox.drawImage('xiangqian_button0',imgX,imgY);
					btnPoly[i] = [ [imgX,imgY], [imgX + imgW, imgY], [imgX + imgW,imgY + imgH],[imgX,imgY + imgH]];
					if(gbox._mouseArea(btnPoly[i],touchMoveX,touchMoveY)){
					   gbox.drawImage('xiangqian_button1',imgX,imgY);						
					}
					
					var txtW = gbox.getTextWidth(bntTxt[i],16);
					var txtX = imgX + (imgW - txtW)/2;
					var txtY = imgY + (imgH - 16)/2;
					gbox.drawString(bntTxt[i],txtX,txtY,"#FFC961",16);//#FFC961
				}				    		   
			}
		}
	 });
}

function doUseItem(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	var res = data.resourceRefreshing;
//	resourseArray = new Array();
	resourseArray[0] = res.money;
	resourseArray[1] = res.food;
	resourseArray[2] = res.wood;
	resourseArray[3] = res.stone;
	resourseArray[4] = res.bronze;
	resourseArray[6] = res.ticket;
	if(gkData[guokuIndex].amount > 1){
	var temp = data.itemRefreshing;
		gkData[guokuIndex] = {userItemId:temp.userItemId,//用户物品编号
			              itemCounts:temp.itemCounts,//物品堆叠数量
			              bindState:temp.bindState,//物品绑定状态（0：未绑定，1：绑定）
		                  //对象，物品的通用属性
			              item:{itemName:temp.item.itemName,//物品名
			                         itemDescription:temp.item.itemDescription,//物品描述信息
			                         itemIcon:temp.item.itemIcon,//物品图标名
			                         itemLevel:temp.item.itemLevel,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
			                         itemType:temp.item.itemType,//道具类型,1：装备，2：用品，3：材料，4：任务
			                         itemSubType:temp.item.itemSubType,//如果itemType=1, 1：武器，2：头盔，3：胸甲，4：护腿，5：
			                         needLevel:temp.item.needLevel,//装备该物品的最低武将等级
			                         salePrice:temp.item.salePrice,//卖店价格
			                         sumAble:temp.item.sumAble,//是否可堆叠
			                         throwAble:temp.item.throwAble,//是否可丢弃（0：否，1：是）
			                         useAble:temp.item.useAble,//是否可使用（0：否，1：是）
			                         packUseAble:temp.item.packUseAble//是否可批量使用（0：否，1：是）
		                   }
		  };
    
	}
	else{
		gkData = gkData.del(guokuIndex);
		gkListColor = gkListColor.del(guokuIndex);
		gk_itemInfo = gk_itemInfo.del(guokuIndex);
    }
	var content = new Array(gkData);
    var listLen = content[0].length/10;
    if((content[0].length%10) != 0){
        listLen = parseInt(content[0].length/10 + 1);
    }
    if(listLen < 8)
       listLen = 8;
    guokuList.update(content,gkListColor,listLen);	
}

function doDeleteUserItem(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}

	gkData = gkData.del(guokuIndex);
	gkListColor = gkListColor.del(guokuIndex);
	gk_itemInfo = gk_itemInfo.del(guokuIndex);
	var content = new Array(gkData);
    var listLen = content[0].length/10;
    if((content[0].length%10) != 0){
        listLen = parseInt(content[0].length/10 + 1);
    }
    if(listLen < 10)
        listLen = 10;  
    guokuList.update(content,gkListColor,listLen);
}

Array.prototype.del= function(n)
{     
  if(n<0)     
    return this;   
  else   
    return this.slice(0,n).concat(this.slice(n+1,this.length));   
    /**//* 
      concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。   
      　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)   
     　　　　　　组成的新数组，这中间，刚好少了第n项。   
      slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。   
    */   
}
