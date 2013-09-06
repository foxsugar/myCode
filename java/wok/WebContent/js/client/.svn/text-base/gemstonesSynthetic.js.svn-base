/*
 *  合成界面需要字段
 */
var combiningFields = 
{
	 combiningNum : 0,//合成材料计数，最大值为5
	 tempNo:"",//存储每个材料的中间ID
	 combiningMaxBasicvalue : 5,//当前合成最大基数
	 displayCombiningID: "",//需要合成的材料ID
	 displayCombiningIndex:-1,//需要合成的材料在数组中得索引
	 combiningBottonX:956,//合成按钮X
	 combiningBottonY:554,//合成按钮Y
};
var gemstoneCombining = true;
var displayCombiningArray = [[761,350],[845,421],[815,506],[715,505],[677,421]];//保存需要合成的材料属性
var combiningBottonPoly = [[946,553],[1029,552],[1029,577],[946,577]];//合成按钮区域控制
var sendArray = new Array();//向服务器发送ID数组
var combiningSucceedData;//接收合成成功后数据返回
var combiningText = new Array();//绘制合成功能介绍文本
var hengchengFinish = false;

function dofuse(data)
{
        if(typeof(data.error) != "undefined")
        {
			alert("系统提示：" + data.error);
			return;
		}
        combiningFields.combiningNum = 0;
        sendArray.splice(0,sendArray.length);
        _baoshiitem.splice(0,_baoshiitem.length);
	    for(var i=0; i<data.gemstones.length; i++)
				{
				        var temp = data.gemstones[i];
					    _baoshiitem[i] = {
						bindState:temp.toolTipInfo.isBound,
						amount:temp.amount,
						itemDescription:temp.toolTipInfo.description,
						gemstoneLevel : temp.gemstoneLevel,
						item:{itemIcon:temp.icon},
						userItemId:temp.id,
						no : temp.no,
						type : temp.type,
						toolTipInfo : 
									{
										description : temp.toolTipInfo.description,//描述
										isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
										materialName : temp.toolTipInfo.materialName,//名字
										materialType : temp.toolTipInfo.materialType,//材料方式
										quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									}
					    };
					    
				}			
        if((_baoshiitem.length) < 4)
		{
		     displayColumn = 1;
		}
		else
		{
			 displayColumn = _baoshiitem.length/4 + 1;
		}
		var content = new Array(_baoshiitem);
		hechengOffsetY = hecheng_OffsetY = 0;
		hechengList.mouseUpIndex = -1;
	    hechengList.init('ty_an_128', 'hit','hit','hit', null,content, 372, 310, 6, parseInt(displayColumn), 36, 7, true, -74, 0);
	    hechengList.isItemCountZero = true;
	    if(data.isSuccess)
	    {
	    	 hengchengFinish = true;
	    	 combiningSucceedData = 
	    	 {
						item:{itemIcon:data.successGemstone.icon},
						type:data.successGemstone.type,
						toolTipInfo : 
									{
										description : data.successGemstone.toolTipInfo.description,//描述
										isBound : data.successGemstone.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
										materialName : data.successGemstone.toolTipInfo.materialName,//名字
										materialType : data.successGemstone.toolTipInfo.materialType,//材料方式
										quality : data.successGemstone.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									}
			};
	    }
	    gemstonesBuild(getClickObjectIndex());
	    //hcList(getClickObjectIndex());
	    changeMap('jiagongfangScreen_Layer');	
}
function doMaterialfuse(data)
{
        if(typeof(data.error) != "undefined")
        {
			alert("系统提示：" + data.error);
			return;
		}
        combiningFields.combiningNum = 0;
        sendArray.splice(0,sendArray.length);
        _baoshiitem.splice(0,_baoshiitem.length);
	    for(var i=0; i<data.materials.length; i++)
				{
				        var temp = data.materials[i];
					    _baoshiitem[i] = {
						bindState:temp.toolTipInfo.isBound,
						amount:temp.amount,
						itemDescription:temp.toolTipInfo.description,
						gemstoneLevel : temp.gemstoneLevel,
						item:{itemIcon:temp.icon},
						userItemId:temp.id,
						no : temp.no,
						type : temp.type,
						toolTipInfo : 
									{
										description : temp.toolTipInfo.description,//描述
										isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
										materialName : temp.toolTipInfo.materialName,//名字
										materialType : temp.toolTipInfo.materialType,//材料方式
										quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									}
					    };
					    
				}			
        if((_baoshiitem.length) < 4)
		{
		     displayColumn = 1;
		}
		else
		{
			 displayColumn = _baoshiitem.length/4 + 1;
		}
		var content = new Array(_baoshiitem);
		hechengOffsetY = hecheng_OffsetY = 0;
		hechengList.mouseUpIndex = -1;
	    hechengList.init('ty_an_128', 'hit','hit','hit', null,content, 372, 310, 6, parseInt(displayColumn), 36, 7, true, -74, 0);
	    hechengList.isItemCountZero = true;
	    if(data.isSuccess)
	    {
	    	 hengchengFinish = true;
	    	 combiningSucceedData = 
	    	 {
						item:{itemIcon:data.successMaterial.icon},
						type:data.successMaterial.type,
						toolTipInfo : 
									{
										description : data.successMaterial.toolTipInfo.description,//描述
										isBound : data.successMaterial.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
										materialName : data.successMaterial.toolTipInfo.materialName,//名字
										materialType : data.successMaterial.toolTipInfo.materialType,//材料方式
										quality : data.successMaterial.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									}
			};
	    }
	    gemstonesBuild(getClickObjectIndex());
	    //hcList(getClickObjectIndex());
	    changeMap('jiagongfangScreen_Layer');	
}

var gemstonesBuild = function(index)
{
	
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
    var bW = 748;
	var bH = 496;
	isDrawUI[index] = true;
	var bW = gbox.getImage('jgf_zjm_01').width;
	var bH = gbox.getImage('jgf_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('jgf_zjm_09').width;
	var bH1 = gbox.getImage('jgf_zjm_09').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2; 
	gbox.addObject(
	{ 
		id : 'hecheng',
		group : 'levelMenu_4',
		tileset : 'jgf_zjm_01',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [348,141], [1090,141], [1088,617],[347,617]],
		initialize : function()
		{	
		},
		
		first : function() 
		{	
		},
		myclick : function()
		{
			if(lastTouchMoveX > 380 && (lastTouchMoveX < 430)&& (lastTouchMoveY > 300) && (lastTouchMoveY<327))//选择宝石合成或者材料合成
			{
				gemstoneCombining = true;
				hengchengFinish = false;
				BuildingFunction.getFuseInfo(doGemstones);
			}
			if(lastTouchMoveX > 433 && (lastTouchMoveX < 483)&& (lastTouchMoveY > 300) && (lastTouchMoveY<327))//选择宝石合成或者材料合成
			{
				gemstoneCombining = false;
				hengchengFinish = false;
				BuildingFunction.getMaterialFuseInfo(doMaterial);
			}
			if(lastTouchMoveX > combiningBottonPoly[0][0] && (lastTouchMoveX < combiningBottonPoly[1][0])&& (lastTouchMoveY > combiningBottonPoly[0][1]) && (lastTouchMoveY<combiningBottonPoly[2][1]))//合成按钮控制
			{
				if(gemstoneCombining)
				{
					 BuildingFunction.fuse(sendArray.toString(),dofuse);
				} 
				else
				{
					 BuildingFunction.fuseMaterial(sendArray.toString(),doMaterialfuse);
				}				   
				sendArray.splice(0,sendArray.length);
			}
			 if(((exitButtonCoordinate4.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate4.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate4.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate4.y+gbox.getImage("ty_an_17").height)))
			 {
			 	hechengDraw = false;
			 	exit(index);
			 }
			 else
			 {
			 	gemstonesBuild(getClickObjectIndex());
	            changeMap('jiagongfangScreen_Layer');
			 }
				
		},
		blit : function()
		{
			if(isDrawUI[index] && hechengDraw)
			{
			   var xqx = (gbox.getScreenW() - bW)/2;
			   var xqy = (gbox.getScreenH() - bH)/2;
			   var tempOffset = 15;
			   gbox.drawImage('jgf_zjm_01',xqx,xqy);
			   gbox.drawImage('jgf_zjm_09',backdropX1,backdropY1 + 4);
			   gbox.drawImage('jgf_zjm_10',(gbox.getImage('jgf_zjm_01').width - gbox.getImage("jgf_zjm_10").width)/2 + backdropX,backdropY1+16);
			   if(gemstoneCombining)
			   {
			   	   gbox.drawImage('ty_an_120',381,301);
			   	   gbox.drawImage('jgf_zjm_48',387,304);
			   }
			   else
			   {
			   	   gbox.drawImage('ty_an_120',435,301);
			   	   gbox.drawImage('jgf_zjm_50',442,304);
			   }
			   for(var i =0; i<combiningFields.combiningNum; i++)
			   {
			   	     if(combiningFields.displayCombiningIndex != -1)
			   	     {
			   	     	 gbox.drawImage(_baoshiitem[combiningFields.displayCombiningIndex].item.itemIcon,displayCombiningArray[i][0],displayCombiningArray[i][1]);
			   	     }
			   	   
			   }
			   for(var i =0; i<combiningFields.combiningNum; i++)
			   {
			   	     var tempX = gbox.getImage(_baoshiitem[combiningFields.displayCombiningIndex].item.itemIcon).width + displayCombiningArray[i][0];
			   	     var tempY = gbox.getImage(_baoshiitem[combiningFields.displayCombiningIndex].item.itemIcon).height + displayCombiningArray[i][1];
			   	     if(touchMoveX > displayCombiningArray[i][0] && (touchMoveX < tempX)&& (touchMoveY > displayCombiningArray[i][1]) && (touchMoveY<tempY))//合成部分显示ToolTip
			   	     {
			   	     	if(touchMoveX !=0)
			   	     	  tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,_baoshiitem[combiningFields.displayCombiningIndex].toolTipInfo);
			   	     }	
			   }
			   if(touchMoveX > combiningBottonPoly[0][0] && (touchMoveX < combiningBottonPoly[1][0])&& (touchMoveY > combiningBottonPoly[0][1]) && (touchMoveY<combiningBottonPoly[2][1]))//合成按钮绘制
			   	{
			   	     	gbox.drawImage("ty_an_09",combiningBottonPoly[0][0] - 1 ,combiningBottonPoly[0][1]- 1);
			   	}
			   	var strW = gbox.getTextWidth("合 成",14);
				var cntX = combiningBottonPoly[0][0] - 1 + (gbox.getImage("ty_an_09").width - strW)/2;
				var cntY = combiningBottonPoly[0][1]- 1 + (gbox.getImage("ty_an_09").height - 14)/2;
			    gbox.drawText("合 成", cntX,cntY,10);		
			   if(hengchengFinish)
			   {
			   	   gbox.drawImage(combiningSucceedData.item.itemIcon,762,427);	
			   	   if(touchMoveX > 758 && (touchMoveX < 795)&& (touchMoveY > 421) && (touchMoveY<461))//成功之后绘制
				   {
				   	 if(touchMoveX !=0)
				   	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + 15,touchMoveY + 15,combiningSucceedData.toolTipInfo);
				   }
			   }
			   switch(combiningFields.combiningNum)
			   {
			   	   case 3:
			   	     gbox.drawString(_hechengProbability[0] + "%",1001,505,"#FFC961",16);//#FFC961
			   	     gbox.drawString("3",986,438,"#FFC961",16);//#FFC961
			   	     gbox.drawString(baseMoney*(2<<(_baoshiitem[hlIndex].gemstoneLevel))*factorArray[0],712,567,'#ffffff',10);
			   	    break;
			   	   case 4:
			   	     gbox.drawString(_hechengProbability[1]+ "%",1001,505,"#FFC961",16);//#FFC961
			   	     gbox.drawString("4",986,438,"#FFC961",16);//#FFC961
			   	     gbox.drawString(baseMoney*(2<<(_baoshiitem[hlIndex].gemstoneLevel))*factorArray[1],712,567,'#ffffff',10);
			   	    break;
			   	   case 5:
			   	     gbox.drawString(_hechengProbability[2]+ "%",1001,505,"#FFC961",16);//#FFC961
			   	     gbox.drawString("5",986,438,"#FFC961",16);//#FFC961
			   	     gbox.drawString(baseMoney*(2<<(_baoshiitem[hlIndex].gemstoneLevel))*factorArray[2],712,567,'#ffffff',10);
			   	    break;
			   	   
			   }
//			    var tempStr = "低等级的材料、宝石可以合成高等级，君主可自由选择合成基数，最少需要3个同样同等级物品合成，最大支持5个合成。合成基数随着合成材料的数量变化。";
//		        combiningText = combiningLineDesc(gbox.getBufferContext(),tempStr);
//		        for(var i= 0;i<combiningText.length;i++)
//		        {
//				       gbox.drawDanceString(combiningText[i],411, 215 + i*20,16, '#000000','#ffffff');
//			    }
			   gbox.drawLineBreakText(DescriptiveText.jiagongfang.gemstonesSynthetic,400,210,0,660);
			    if(((exitButtonCoordinate4.x < touchMoveX) && (touchMoveX < exitButtonCoordinate4.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate4.y < touchMoveY) && (touchMoveY < exitButtonCoordinate4.y+gbox.getImage("ty_an_17").height)))
				{
					 gbox.drawImage('ty_an_17',exitButtonCoordinate4.x,exitButtonCoordinate4.y);						   	    
				}
				else
				{
					gbox.drawImage('ty_an_18',exitButtonCoordinate4.x,exitButtonCoordinate4.y);	
				}
			}
		}
	 });
}

var hcList = function(index)
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'hecheng_List',
		group : 'levelMenu_4',
		tileset : 'jgf_zjm_01',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [391,329], [606,331], [606,581],[391,581]],
		initialize : function()
		{   
           	   if((_baoshiitem.length) < 4)
				{
					displayColumn = 1;
				}
				else
				{
					displayColumn = _baoshiitem.length/4 + 1;
				}

				var content = new Array(_baoshiitem);
				hechengOffsetY = hecheng_OffsetY = 0;
				hechengList.mouseUpIndex = -1;
                hechengList.init('ty_an_128', 'hit','hit','hit', null,content, 372, 310, 6, parseInt(displayColumn), 36, 7, true, -74, 0);
			    hechengList.isItemCountZero = true;
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			hengchengFinish = false;
			//console.log(">>>>>>>>" + hechengDraw);
		    hlIndex = hechengList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY); 
		    if(hlIndex != -1)
		    {
		    	if( (_baoshiitem[hlIndex].no == combiningFields.tempNo) || (combiningFields.tempNo == ""))//区分不同材料计数操作		    
			    {		    	 
			    	 if(combiningFields.combiningNum <= combiningFields.combiningMaxBasicvalue - 1)//计数要小于当前的最大合成基数
			    	 {
			    	 	if(_baoshiitem[hlIndex].amount > 0)
			    	 	{
			    	 		combiningFields.combiningNum = combiningFields.combiningNum + 1;
			    	 		sendArray.push(_baoshiitem[hlIndex].userItemId);
			    	 		_baoshiitem[hlIndex].amount = _baoshiitem[hlIndex].amount - 1;
			    	 	} 
			    	 	else
			    	 	{
			    	 		_baoshiitem[hlIndex].amount = 0;			    
			    	 		
			    	 	}
			    	 }   
					 combiningFields.displayCombiningID = _baoshiitem[hlIndex].no;
					 combiningFields.displayCombiningIndex = hlIndex;		
			    }
			    else
			    {			
			    	 sendArray.splice(0,sendArray.length);
			    	 if(typeof(_baoshiitem[combiningFields.displayCombiningIndex]) != "undefined")
			    	 _baoshiitem[combiningFields.displayCombiningIndex].amount =_baoshiitem[combiningFields.displayCombiningIndex].amount + combiningFields.combiningNum;
			    	 combiningFields.combiningNum = 1;//切换不同物品清1 
			    	 sendArray.push(_baoshiitem[hlIndex].userItemId);
			    	 if(_baoshiitem[hlIndex].amount > 0)
			    	 _baoshiitem[hlIndex].amount = _baoshiitem[hlIndex].amount - 1;
			    	 combiningFields.displayCombiningIndex = hlIndex;
			    }
			    combiningFields.tempNo = _baoshiitem[hlIndex].no;//保存材料中间ID
		    }
		    
			gemstonesBuild(index);
			changeMap('jiagongfangScreen_Layer');	
			
		},
		blit : function()
		{
			if(isDrawUI[index] && hechengDraw)
			{
				var tempOffset = 15;
                hechengList.paint( hecheng_OffsetY, hecheng_BeginSlip,hecheng_Time );
                var bsIndex = hechengList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
                if(typeof(_baoshiitem) != "undefined" && bsIndex != -1){
                  switch(_baoshiitem[bsIndex].type)
                  {
                  	 case 3:
                  	     if(touchMoveX !=0)
                  	   	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,_baoshiitem[bsIndex].toolTipInfo);
                  	   break;
                  }
               }
			}
		}
	 });
}
var updataCombiningList = function(){
	if(typeof(_baoshiitem) != "undefined" && typeof(_baoshiitem) != "undefined"){
		
		if((_baoshiitem.length) < 4)
		{
			displayColumn = 1;
		}
		else
		{
			displayColumn = _baoshiitem.length/4 + 1;
		}
		var content = new Array(_baoshiitem);
		hechengOffsetY = hecheng_OffsetY = 0;
		hechengList.mouseUpIndex = -1;
	    hechengList.update(content, "", parseInt(displayColumn));		
	}
};
function combiningLineDesc(ctx,str)
{
    ctx.font = tooltip.body;
    var lineWidth = 450;
//  var firstLineWidth = lineWidth - tooltip.tab_space;
    var firstLineWidth = lineWidth;
    var begin = 0;
    var arr = new Array();
    if(ctx.measureText(str).width<firstLineWidth){
        arr.push(str);
    }else{
        var sumWidth=0;
        var width = firstLineWidth;
        for(var i=0;i<str.length;i++){
            sumWidth+=ctx.measureText(str.charAt(i)).width;
            if(sumWidth>width+5){//可以有5像素的越界
                arr.push(str.substring(begin,i));
                begin = i--;
                sumWidth = 0;
                if(width != lineWidth){
                    width = lineWidth;
                }
            }
        }
        arr.push(str.substring(begin,str.length));
    }
    return arr;
}