var offsetX = 32;
var offsetY = -38;
var offsetX1 = 24;
var offsetY1 = 4;
var offsetX2 = 1;
var offsetY2 = 1;
var stonetempInfoNum = 0;
var stonetempInfoArray = new Array();
var stone1InfoNum = 0;
var stone1tempInfoArray = new Array();
var stone2InfoNum = 0;
var stone2tempInfoArray = new Array();
var displayInfoNum = 0;
var displaytempInfoArray = new Array();
var xq_bigItem_poly  = [
                        [[880,435],[920,428], [920,472],[874,472]],
                        [[956,435],[995,428], [995,472],[950,472]],
                        [[1025,435],[1065,428], [1065,472],[1020,472]]
                       ];
             
var xq_but_poly  = [[[840 + offsetX,425 + offsetY],[900 + offsetX,425 + offsetY], [900 + offsetX,446 + offsetY],[840 + offsetX,446 + offsetY]],
             [[915 + offsetX,425 + offsetY],[975 + offsetX,425 + offsetY], [975 + offsetX,446 + offsetY],[915 + offsetX,446 + offsetY]],
             [[985 + offsetX,425 + offsetY],[1045 + offsetX,425 + offsetY], [1045 + offsetX,446 + offsetY],[985 + offsetX,446 + offsetY]]];
var delete_poly = [[965 + offsetX1,528 + offsetY1],[(965+84) + offsetX1,528 + offsetY1], [(965+84) + offsetX1,560 + offsetY1],[965 + offsetX,560 + offsetY1]];

var xiangqianItem = function(index)//镶嵌背景
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	var backdropX = (gbox.getScreenW() - gbox.getImage("jgf_zjm_1").width)/2;
	var backdropY = (gbox.getScreenH() - gbox.getImage("jgf_zjm_1").height)/2;
	var exitX = backdropX + gbox.getImage("jgf_zjm_1").width - 35;
	var exitY = backdropY + 30;	
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2; 	
	
	isDrawUI[index] = true;
	isQianghuaList = false;
	isXiangqianList = true;
	jiaGong = true;
	gbox.addObject(
	{ 
		id : 'xq_Bg',
		group : 'levelMenu_2',//levelMenu_4
		tileset : 'jgf_zjm_0',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [320,140], [1116,140], [1116,616],[320,616]],
		initialize : function()
		{	
		},
		
		first : function() 
		{	
		},
		myclick : function()
		{
			if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height))){
				exit(index);
				itemName = new Array();
				userItemId = new Array();
				itemLevel = new Array();
				itemIcon = new Array();
//				qhListColor = new Array();	
				stone1Info = new Array();
				stone2Info = new Array();
				stone3Info = new Array();
				stone = new Array(new Array(),new Array(),new Array());
				itemInfo = new Array();
				strengthenData = new Array();				
				jiaGong = true;				
				isQianghuaList = false;
	            isXiangqianList = false;
	            isShowBaoshiList = false;
	            isShowDislog = false
	            isShowDislog1 = false;
//				jiaGongfang();
//				changeMap('jiagongfangScreen_Layer');	
			}else{
				if(typeof(strengthenData[0]) != "undefined"){
					var btnTxt = new Array();
					btnTxt[0] = "确定";
					btnTxt[1] = "取消";
					var pW = 300;
					var pH = 200;
					var pX = (gbox.getScreenW() - pW)/2;
					var pY = (gbox.getScreenH() - pH)/2;
					var dialogPoly = [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]];
					for(var i=0; i < 3; i++){
						if (gbox._mouseArea(xq_but_poly[i],lastTouchMoveX,lastTouchMoveY)) {
							if((typeof(stone[i]) != "undefined" && typeof(stone[i][0]) != "undefined")){
                                alertDialog(index,'zhanchuDialog','levelMenu_2',"确定要摘除" + stone[i][0].toolTipInfo.materialName + "吗？",btnTxt,20)
							    changeMap('jiagongfangScreen_Layer');
							}
							holeIndex = i;
							break;
						}else
						if (gbox._mouseArea(xq_bigItem_poly[i],lastTouchMoveX,lastTouchMoveY)) {
							if(typeof(stone[i]) == "undefined" || typeof(stone[i][0]) == "undefined"){
								BuildingFunction.getUserGemStone(doAAA);
								isShowBaoshiList = true;	
							}
							holeIndex = i;
							break;
						}else{
							isShowBaoshiList = false;
							isShowDislog = false;
							isShowDislog1 = false;
						}
						   
						    
					}
//					if (gbox._mouseArea(delete_poly,lastTouchMoveX,lastTouchMoveY)) {
//						exciseAll(userItemId[xqList.mouseUpIndex],doExciseAll);
//					}						
	            }else{
	            	isShowBaoshiList = false;
	            	isShowDislog = false;
	            	isShowDislog1 = false;
//	                alert("系统提示：请先选择一个装备！");
	            }
				xiangqianItem(getClickObjectIndex());
				xiangqianList(getClickObjectIndex());
				changeMap('jiagongfangScreen_Layer');				
			}
		},
		blit : function()
		{
			if(isDrawUI[index] && isXiangqianList)
			{
			   gbox.drawImage('jgf_zjm_1',backdropX,backdropY);
			   gbox.drawImage('ty_an_27',backdropX1,backdropY1 + 4);
//			   gbox._drawTxtRect(DescriptiveText.jiagongfang.xiangqian,365,190,400,70,20,'#ffffff','#000000');
			   gbox.drawLineBreakText(DescriptiveText.jiagongfang.xiangqian,380,210,0,705);
			   
			   gbox.drawImage('jgf_zjm_2',(gbox.getImage('jgf_zjm_1').width - gbox.getImage("jgf_zjm_2").width)/2 + backdropX,backdropY1+10);
			   var buttonW = gbox.getImage('ty_an_08').width;
			   var buttonH = gbox.getImage('ty_an_08').height;
			   for(var i=0; i < 3; i++){
				   if((typeof(stone[i]) != "undefined" && typeof(stone[i][0]) != "undefined")){
				   	      gbox.drawImage('ty_an_06',xq_but_poly[i][0][0],xq_but_poly[i][0][1]);
					}else{
						  gbox.drawImage('ty_an_08',xq_but_poly[i][0][0],xq_but_poly[i][0][1]);							
					}
			   }
			   
//			   if (gbox._mouseArea(delete_poly,touchMoveX,touchMoveY)) {
//				   gbox.drawImage('ty_an_09',delete_poly[0][0],delete_poly[0][1]);
//			   }
//			   gbox.drawImage('xiangqian_txt1',delete_poly[0][0] + 13,delete_poly[0][1] + 4);
			   //bigItem1
               if(typeof(stone[0]) != "undefined" && 
                  typeof(stone[0][0]) != "undefined"){
	               if(gbox.getImage(""+stone[0][0].item.itemIcon) != null){
	               	  var img1 = stone[0][0].item.itemIcon;
	               	var imgW = gbox.getImage(""+stone[0][0].item.itemIcon).width;
				      gbox.drawImage(img1,xq_bigItem_poly[0][0][0] + (36 - imgW)/2,xq_bigItem_poly[0][0][1] + (36 - imgW)/2);
	               }
//	               else
//				      gbox.drawImage('no_pic',xq_bigItem_poly[0][0][0],xq_bigItem_poly[0][0][1]);
               
					var fontW = gbox.getTextWidth("摘除",14);
				 	var dx = xq_but_poly[0][0][0] + (50 - fontW)/2;
					var dy = xq_but_poly[1][0][1] + (26 - 14)/2;
					gbox.drawText("摘除", dx, dy,10);                 
               
               }else{
					var fontW = gbox.getTextWidth("镶嵌",14);
				 	var dx = xq_but_poly[0][0][0] + (50 - fontW)/2;
					var dy = xq_but_poly[1][0][1] + (26 - 14)/2;
					gbox.drawText("镶嵌", dx, dy,10);               	
               }
			 
			   //bigItem2  
               if(typeof(stone[1]) != "undefined" &&
                  typeof(stone[1][0]) != "undefined"){
	               if(gbox.getImage(""+stone[1][0].item.itemIcon) != null){
	               	  var img2 = stone[1][0].item.itemIcon;
	               	  var imgW = gbox.getImage(""+stone[1][0].item.itemIcon).width;
				      gbox.drawImage(img2,xq_bigItem_poly[1][0][0] + (36 - imgW)/2,xq_bigItem_poly[1][0][1] + (36 - imgW)/2);
	               }
//	               else
//				      gbox.drawImage('no_pic',xq_bigItem_poly[1][0][0],xq_bigItem_poly[1][0][1]);
					
					var fontW = gbox.getTextWidth("摘除",14);
				 	var dx = xq_but_poly[1][0][0] + (50 - fontW)/2;
					var dy = xq_but_poly[2][0][1] + (26 - 14)/2;
					gbox.drawText("摘除", dx, dy,10);                 
              
               }else{
					var fontW = gbox.getTextWidth("镶嵌",14);
				 	var dx = xq_but_poly[1][0][0] + (50 - fontW)/2;
					var dy = xq_but_poly[2][0][1] + (26 - 14)/2;
					gbox.drawText("镶嵌", dx, dy,10);                	
               }

			   //bigItem3 
               if(typeof(stone[2]) != "undefined" &&
                  typeof(stone[2][0]) != "undefined"){
               	
	               if(gbox.getImage(""+stone[2][0].item.itemIcon) != null){
	               	  var img3 = stone[2][0].item.itemIcon;
	               	 var imgW = gbox.getImage(""+stone[2][0].item.itemIcon).width;
				      gbox.drawImage(img3,xq_bigItem_poly[2][0][0] + (36 - imgW)/2,xq_bigItem_poly[2][0][1] + (36 - imgW)/2);
	               }
//	               else
//				      gbox.drawImage('no_pic',xq_bigItem_poly[2][0][0],xq_bigItem_poly[2][0][1]);
					
					var fontW = gbox.getTextWidth("摘除",14);
				 	var dx = 1016 + (50 - fontW)/2;
					var dy = 387 + (26 - 14)/2;
					gbox.drawText("摘除", dx, dy,10);                   
              
               }else{
					var fontW = gbox.getTextWidth("镶嵌",14);
				 	var dx = 1016 + (50 - fontW)/2;
					var dy = 387 + (26 - 14)/2;
					gbox.drawText("镶嵌", dx, dy,10);                   	
               }
               //镶嵌位选中状态
			   for(var i=0; i < 3; i++){
				   if (gbox._mouseArea(xq_bigItem_poly[i],touchMoveX,touchMoveY)) {
				   	      gbox.drawImage('jgf_zjm_3_',xq_bigItem_poly[i][0][0],xq_bigItem_poly[i][0][1]);
					}
			   }
			   
               for(var q=0; q<3; q++){
				   if (gbox._mouseArea(xq_bigItem_poly[q],touchMoveX,touchMoveY)) {
					   if(typeof(stone[q]) != "undefined" &&
		                  typeof(stone[q][0]) != "undefined"){
						   	switch(q){
						   		case 0:
							   	    //if(typeof(stone1Info) != "undefined")
							         // gbox.drawMessageObject(stone1Info, lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF');			   		
						   		break;
						   		case 1:
							   	   //if(typeof(stone2tempInfoArray) != "undefined")
							   	  //    gbox.drawMessageObject(stone2tempInfoArray, lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF');				   	
						   		break;
						   		case 2:
							   	   //if(typeof(stonetempInfoArray) != "undefined")
							       //   gbox.drawMessageObject(stonetempInfoArray, lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF');				   		
						   		break;
						   	}
					   }

				   }                	
               }
               //购买宝石按钮 文字图片
                gbox.drawImage('ty_an_10',961,531);
               if(((960 < touchMoveX) && (touchMoveX < (960+63))) && ((531 < touchMoveY) && (touchMoveY < (536+17))))
	            {
				    gbox.drawImage('ty_an_09',961,531);
			    }
			   var strW = gbox.getTextWidth("购买宝石",14);
			   var cntX = 961 + (gbox.getImage("ty_an_09").width - strW)/2;
			   var cntY = 531 + (gbox.getImage("ty_an_09").height - 14)/2;
			   gbox.drawText("购买宝石", cntX,cntY,10);		
			   if(typeof(strengthenData[0]) != "undefined" ){
				   //选中装备图标
				   if(gbox.getImage(strengthenData[0].iconLarge) != null){
				   	  gbox.drawImage('' + strengthenData[0].iconLarge,746,438);
				   }	
				   //选中装备名称 
				   var txtLen = gbox.getTextWidth("" + strengthenData[0].toolTipInfo.equipmentName, 16);
				   var txtX = 730 + (50 - txtLen)/2;
				   gbox.drawString("" + strengthenData[0].toolTipInfo.equipmentName,txtX,480,qualityColor[xqList.mouseUpIndex],16);					      
			   
				   if(touchMoveX > 730 && touchMoveX < 780 && touchMoveY > 428 && touchMoveY < 478){
	               	   if(typeof(itemInfo) != "undefined"){
	               	   	  //gbox.zerodrawMessageObject(displaytempInfoArray, lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF'，displaytempInfoArray.length);
	               	   	 // gbox.drawMessageObject(displaytempInfoArray, lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF');
	               	   }
	               }			   
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

	gbox.addObject(
			{ //button1
				id : 'xq_button1',
				group : 'levelMenu_2',
				tileset : 'jgf_zjm_1',
				x : 0,
				y : 0,
			    anim : null,
				action : null,
				frame : 0,
				poly : [[478,311],[498,311], [498,331],[478,331]],
				initialize : function()
				{
				},
				first : function() 
				{
				},
				myclick : function()
				{
//						var lenMax = positonName.length;
//						if(++xq_positionIndex >= lenMax){
//							xq_positionIndex = 0;
//						}						
//						
//					BuildingFunction.getEmbedStoneEquipment(positonID[xq_positionIndex],typeID[xq_typeIndex],doEmbedStoneEquipment);								
//					xiangqianItem(getClickObjectIndex());
//					changeMap('jiagongfangScreen_Layer');
					if(!comboboxes['positon_xq'].isOpen){
						//下拉框选中方法
						var selected = function(){
							BuildingFunction.getEmbedStoneEquipment(
										comboboxes['positon_xq'].selected.id,
										comboboxes['type_xq'].selected.id,
										doEmbedStoneEquipment
							);
							xiangqianItem(getClickObjectIndex());
							changeMap('jiagongfangScreen_Layer');
						};
						//绘制下拉框
						var _index = getClickObjectIndex();
						comboboxes['positon_xq'].info(
								_index,
								'xq_combobox1',
								'levelMenu_3',
								'jiagongfangScreen_Layer',
								['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
								407,
								328,
								{widthType:2,isScrolling:false}
						);
						comboboxes['positon_xq'].createCombobox(selected);
					}
					xiangqianItem(getClickObjectIndex());
					xiangqianList(getClickObjectIndex());
					changeMap('jiagongfangScreen_Layer');
				},
				blit : function()
				{
					if(isDrawUI[index] && isXiangqianList){
						if (mouseArea(this)) {
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'ty_tdt_10',
								tile : 0,
							    dx :this.poly[0][0]-2,
							    dy :this.poly[0][1]-6,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						    });	
						}else{
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'ty_tdt_09',
								tile : 0,
							    dx :this.poly[0][0]-2,
							    dy :this.poly[0][1]-6,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						    });								
						}
						var jfW = gbox.getTextWidth(comboboxes['positon_xq'].selected.txt,14);
						var jfX = 408 + (68 - jfW)/2;
						gbox.drawText(comboboxes['positon_xq'].selected.txt,jfX,310,10);
					}
											     					
				}
			});	
			
	gbox.addObject(
			{ //button2
				id : 'xq_button2',
				group : 'levelMenu_2',
				tileset : 'jgf_zjm_1',
				x : 0,
				y : 0,
			    anim : null,
				action : null,
				frame : 0,
				poly : [[578,311],[598,311], [598,331],[578,331]],
				initialize : function()
				{
				},
				first : function() 
				{
				},
				myclick : function()
				{		
//						var lenMax = typeName.length;
//						if(++xq_typeIndex >= lenMax){
//							xq_typeIndex = 0;
//						}					
//
//					BuildingFunction.getEmbedStoneEquipment(positonID[xq_positionIndex],typeID[xq_typeIndex],doEmbedStoneEquipment);					
//					xiangqianItem(getClickObjectIndex());
//					changeMap('jiagongfangScreen_Layer');	
					if(!comboboxes['type_xq'].isOpen){
						//下拉框选中方法
						var selected = function(){
							BuildingFunction.getEmbedStoneEquipment(
										comboboxes['positon_xq'].selected.id,
										comboboxes['type_xq'].selected.id,
										doEmbedStoneEquipment
							);
							xiangqianItem(getClickObjectIndex());
							changeMap('jiagongfangScreen_Layer');
						};
						//绘制下拉框
						var _index = getClickObjectIndex();
						comboboxes['type_xq'].info(
								_index,
								'xq_combobox2',
								'levelMenu_3',
								'jiagongfangScreen_Layer',
								['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
								510,
								328,
								{widthType:1,isScrolling:false}
						);
						comboboxes['type_xq'].createCombobox(selected);
					}
					xiangqianItem(getClickObjectIndex());
					xiangqianList(getClickObjectIndex());
					changeMap('jiagongfangScreen_Layer');
				},
				blit : function()
				{
					if(isDrawUI[index] && isXiangqianList){
						if (mouseArea(this)) {
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'ty_tdt_10',
								tile : 0,
							    dx :this.poly[0][0]-1,
							    dy :this.poly[0][1]-6,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						    });	
						}else{
							gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'ty_tdt_09',
								tile : 0,
							    dx :this.poly[0][0]-1,
							    dy :this.poly[0][1]-6,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						    });								
						}	
						var jfW = gbox.getTextWidth(comboboxes['type_xq'].selected.txt,14);
						var jfX = 515 + (68 - jfW)/2;
						gbox.drawText(comboboxes['type_xq'].selected.txt,jfX,310,10);
					}		     					
				}
			});		
						 
}
            
var xiangqianList = function(index)//镶嵌列表
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isXiangqianList = true;
	jiaGong = true;
	xqIndex = -1;
	gbox.addObject(
	{ 
		id : 'xq_List',
		group : 'levelMenu_2',
		tileset : 'jgf_zjm_0',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [350,352], [648,352], [648,595],[350,595]],
		initialize : function()
		{   	
			var content = new Array(itemName,itemIcon);
            var listLen = content[0].length;
            if(listLen < 9){
            	listLen = 9;
            }            
			xqList.init( 'jgf_zjm_19', 'jgf_zjm_18','jgf_zjm_18', 'jgf_zjm_17',qualityColor,content, 330, 342, 1, listLen, 25, 9, false, -190, 0 );
		    xqList.updateLevel(sroneLevels);
		    xqList.isXqList = true;
		},
		first : function() 
		{	
		},
		myclick : function()
		{	
		},
		blit : function()
		{
			if(isDrawUI[index] && isXiangqianList)
			{
			   xqList.paint( xq_OffsetY, xq_BeginSlip, xq_Time );
			}
		}
	 });
}
var _item = new Array();
    _item[0] = "baoshi0";
    _item[1] = "baoshi1";
    _item[2] = "baoshi2";
    _item[3] = "baoshi3";
    
var _item1 = new Array();
    _item1[2] = "baoshi0";
    _item1[1] = "baoshi1";
    _item1[0] = "baoshi3";
  
var _item0 = new Array();
    _item0[1] = "baoshi0";
    _item0[0] = "baoshi3"; 
    
var stoneIconArray = ["blueStone","violetStone","brownStone","redStone","greenStone","yellowStone",
                      "blueStone","violetStone","brownStone","redStone","greenStone","yellowStone"];

//1打开宝石镶嵌界面时，向服务器请求装备分类信息：
var baseMoney;
function doEmbedStoneEquipmentClass(data){
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}			
//    positonID = new Array();
//    positonName = new Array();
//    typeID = new Array();
//    typeName = new Array();
    userItemId = new Array();
    itemName = new Array();
    itemLevel = new Array();
    itemIcon = new Array();
//    qhListColor = new Array();	
	stone1Info = new Array();
	stone2Info = new Array();
	stone3Info = new Array();   
	sroneLevels = new Array();
    stone = new Array(new Array(),new Array(),new Array());
    
    //下拉框数据对象数组
    comboboxes = {};
    var comboboxPositon = new Combobox();
    comboboxPositon.setData(data.positon,'value','name');
    comboboxes['positon_xq'] = comboboxPositon;
    var comboboxType = new Combobox();
    comboboxType.setData(data.type,'value','name');
    comboboxes['type_xq'] = comboboxType;
    
	//返回三组对象数组 position,type,Equipments
    baseMoney = data.baseMoney;
//	for(var i=0; i<data.positon.length; i++){
//		var positon = data.positon[i];
//		positonID[i] = positon.value;
//		positonName[i] = positon.name;
//	}
//	
//	for(var i=0; i<data.type.length; i++){
//		var type = data.type[i];
//		typeID[i] = type.value;
//		typeName[i] = type.name;	
//	}

	for(var i=0; i<data.equipments.length; i++){
		var equipments = data.equipments[i];
		userItemId[i] = equipments.id;
		itemName[i] = equipments.equipmentName;
		itemLevel[i] = equipments.quality;
//		switch(equipments.quality){
//			case 1:
//				qhListColor[i] = '#FFFFFF';
//			break;
//			case 2:
//				qhListColor[i] = '#1EFF00';
//			break;
//			case 3:
//			    qhListColor[i] = '#0070DD';
//			break;
//			case 4:
//				qhListColor[i] = '#A335EE';
//			break;
//			case 5:
//				qhListColor[i] = '#E5CC80';
//			break;
//		}				
		sroneLevels[i] = new Array();
		var _item = new Array();
		if(equipments.stone1 != null && typeof(equipments.stone1) != "undefined"){
			_item[0] = "" + stoneIconArray[equipments.stone1.attributeType - 1];
			sroneLevels[i][0] = equipments.stone1.gemstoneLevel;
		}else
		    _item[0] = "no_baoshi";//no_baoshi		
		_item[1] = new Array();
		if(equipments.stone2 != null && typeof(equipments.stone2) != "undefined"){
			_item[1] = "" + stoneIconArray[equipments.stone2.attributeType - 1];;
			sroneLevels[i][1] = equipments.stone2.gemstoneLevel;
		}else
		    _item[1] = "no_baoshi";//no_baoshi	
		
		_item[2] = new Array();
		if(equipments.stone3 != null && typeof(equipments.stone3) != "undefined"){
			_item[2] = "" + stoneIconArray[equipments.stone3.attributeType - 1];
			console.log("=======" + _item[2]);
			sroneLevels[i][2] = equipments.stone3.gemstoneLevel;	
		}else
		    _item[2] = "no_baoshi";//no_baoshi	
		itemIcon.push(_item);				
	}	
	
	xiangqianItem(getClickObjectIndex());
	xiangqianList(getClickObjectIndex());
	changeMap('jiagongfangScreen_Layer');	
}

//2选择位置和类型后向服务器请求所有装备：
function doEmbedStoneEquipment(data){
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}	
itemName = new Array();
userItemId = new Array();
itemLevel = new Array();
itemIcon = new Array();
//qhListColor = new Array();	
stone1Info = new Array();
stone2Info = new Array();
stone3Info = new Array();
sroneLevels = new Array();
stone = new Array(new Array(),new Array(),new Array());
strengthenData = new Array();

	for(var i=0; i<data.length; i++){
		var equipments = data[i];
		userItemId[i] = equipments.id;
		itemName[i] = equipments.equipmentName;
		itemLevel[i] = equipments.quality;
		sroneLevels[i] = new Array();
		var _item = new Array();
		if(equipments.stone1 != null && typeof(equipments.stone1) != "undefined"){
			_item[0] = "" + stoneIconArray[equipments.stone1.attributeType - 1];
			sroneLevels[i][0] = equipments.stone1.gemstoneLevel;
		}else
		    _item[0] = "no_baoshi";//no_baoshi		
		_item[1] = new Array();
		if(equipments.stone2 != null && typeof(equipments.stone2) != "undefined"){
			_item[1] = "" + stoneIconArray[equipments.stone2.attributeType - 1];
			sroneLevels[i][1] = equipments.stone2.gemstoneLevel;
		}else
		    _item[1] = "no_baoshi";//no_baoshi	
		
		_item[2] = new Array();
		if(equipments.stone3 != null && typeof(equipments.stone3) != "undefined"){
			_item[2] = "" + stoneIconArray[equipments.stone3.attributeType - 1];
			sroneLevels[i][2] = equipments.stone3.gemstoneLevel;	
		}else
		    _item[2] = "no_baoshi";//no_baoshi	
		itemIcon.push(_item);	
//		sroneLevels[i] = new Array();
//		sroneLevels[i][0] = equipments.stone1.stoneLevel;	
//		sroneLevels[i][1] = equipments.stone2.stoneLevel;	
//		sroneLevels[i][2] = equipments.stone3.stoneLevel;	
									
//		switch(equipments.quality){
//			case 1:
//				qhListColor[i] = '#FFFFFF';
//			break;
//			case 2:
//				qhListColor[i] = '#1EFF00';
//			break;
//			case 3:
//			    qhListColor[i] = '#0070DD';
//			break;
//			case 4:
//				qhListColor[i] = '#A335EE';
//			break;
//			case 5:
//				qhListColor[i] = '#E5CC80';
//			break;
//		}		 
	}
	
	var content = new Array(itemName,itemIcon);
    var listLen = content[0].length;
    if(listLen < 9){
        listLen = 9;
    }
//	xqList.entryStartIndex = 0;
//	xqOffsetY = xq_OffsetY = 0;
	xqList.init( 'jgf_zjm_19', 'jgf_zjm_18','jgf_zjm_18', 'jgf_zjm_17',qualityColor,content, 330, 342, 1, listLen, 25, 9, false, -190, 0 );			
	xqList.updateLevel(sroneLevels);
	isDone_EquipmentByPositonAndType = false;	
	xqList.isXqList = true;
}
//3选择要镶嵌宝石的装备后，返回装备全部属性：
function doEquipmentInfo(data){//userItemId,callback
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}
stone1Info = new Array();
stone2Info = new Array();
stone3Info = new Array();
stone = new Array(new Array(),new Array(),new Array());
strengthenData = new Array();
sroneLevels[xqList.mouseUpIndex] = new Array();
var temp = data;
		strengthenData[0] = {//装备属性
		             iconLarge : data.icon,
		             id: data.id,
				     toolTipInfo : 
						{
							agility : temp.toolTipInfo.agility,//敏捷
							equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp.toolTipInfo.equipmentName,//名字
							equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp.toolTipInfo.heroForce,//武力
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp.toolTipInfo.physique,//体质
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp.toolTipInfo.strategy,//谋略
							strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp.toolTipInfo.weaponType,//兵器方式
							type:temp.type							
						}
		  };
    if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone1 = true;
			        	strengthenData[0].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone1 = false;
			        	strengthenData[0].toolTipInfo.stoneName1 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc1 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone2 = true;
			        	strengthenData[0].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone2 = false;
			        	strengthenData[0].toolTipInfo.stoneName2 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc2 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone3 = true;
			        	strengthenData[0].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone3 = false;
			        	strengthenData[0].toolTipInfo.stoneName3 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc3 = "";
			        }
	stone[0] = new Array();	
	if(typeof(data.stone1) != "undefined" && data.stone1 != null){
		  	var temp = data.stone1;
		  	stone[0][0] = 
			{
					 userItemId:temp.id,//用户物品编号
		             itemType:temp.type,
	                 stoneLevel:temp.gemStoneLevel,
	                 item:
	                 {
	                 	itemIcon:temp.icon,//物品图标名
	                 },
	                 toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type: temp.type
						}
	       }; 
	       if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	stone[0][0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	stone[0][0].toolTipInfo.isbag = true;
			        } 
		  	
		sroneLevels[xqList.mouseUpIndex][0] = stone[0][0].stoneLevel;	
	    //stone1Info = xiangqianTip(strengthenData[0],stone[0][0].item);
	}
	stone[1] = new Array();	  
	if(typeof(data.stone2) != "undefined" && data.stone2 != null){
		var temp = data.stone2;
		  stone[1][0] = 
			{
					 userItemId:temp.id,//用户物品编号
		             itemType:temp.type,
	                 stoneLevel:temp.gemStoneLevel,
	                 item:
	                 {
	                 	itemIcon:temp.icon,//物品图标名
	                 },
	                 toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type: temp.type
						}
	       }; 
	       if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	stone[1][0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	stone[1][0].toolTipInfo.isbag = true;
			        } 
		  	
		sroneLevels[xqList.mouseUpIndex][1] = stone[1][0].stoneLevel;		  	
	    //var item = stone[1][0];

	   // stone2tempInfoArray	= xiangqianTip(strengthenData[0],stone[1][0].item);
}		  
	stone[2] = new Array();
	if(typeof(data.stone3) != "undefined" && data.stone3 != null){
		var temp = data.stone3;
		  	stone[2][0] = 
			{
					 userItemId:temp.id,//用户物品编号
		             itemType:temp.type,
	                 stoneLevel:temp.gemStoneLevel,
	                 item:
	                 {
	                 	itemIcon:temp.icon,//物品图标名
	                 },
	                 toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type: temp.type
						}
	       }; 
	       if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	stone[2][0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	stone[2][0].toolTipInfo.isbag = true;
			        } 
		  	
		sroneLevels[xqList.mouseUpIndex][2] = stone[2][0].stoneLevel;
//	    var item = stone[2][0];
  	   // stonetempInfoArray	= xiangqianTip(strengthenData[0],stone[2][0].item);
	}
			  	  
	    itemInfo = new Array();
	    var item = strengthenData[0].item;
	    //displaytempInfoArray = xiangqianTip(strengthenData[0],strengthenData[0].item);

}

//4.获取宝石接口
function doAAA(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		isShowBaoshiList = false;
		return;
	}		

baoshiArray = new Array();
bs_itemInfo = new Array(new Array());

	for(var i=0; i<data.length; i++){
		var temp = data[i];
		
		baoshiArray[i] = 
		{
			   userItemId:temp.id,//用户物品编号
	           amount:temp.amount,//物品堆叠数量
	           stoneLevel:temp.gemStoneLevel,
	           item :
	           {
	           	  itemIcon : temp.icon
	           },	           
               toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type : temp.type
						}
			 
      }; 
      if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	baoshiArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	baoshiArray[i].toolTipInfo.isbag = true;
			        }
	  var itemInfoStr = new Array();
	  var tmp = baoshiArray[i].toolTipInfo;
        itemInfoStr[0] = "名称：" + tmp.materialName;
        itemInfoStr[1] = "描述：" + tmp.description;
        
        switch(tmp.isBound){
        case 0:
        	itemInfoStr[2] = "状态：未绑定";
        	break;
        case 1:
        	itemInfoStr[2] = "状态：绑定";
        	break;
        }
	    bs_itemInfo[i] = itemInfoStr;			
	}

	baoshiBG(getClickObjectIndex());
	baoshiList(getClickObjectIndex());
	changeMap('jiagongfangScreen_Layer');
}

//5.宝石镶嵌接口
function doEmbedStone(data){//(equipmentId,stoneId,holeIndex,callBack)
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}
stone1Info = new Array();
stone2Info = new Array();
stone3Info = new Array();
stone = new Array(new Array(),new Array(),new Array());
strengthenData = new Array();
sroneLevels[xqList.mouseUpIndex] = new Array();
var temp = data;
		strengthenData[0] = {//装备属性
		             iconLarge : data.icon,
		             id: data.id,
				     toolTipInfo : 
						{
							agility : temp.toolTipInfo.agility,//敏捷
							equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp.toolTipInfo.equipmentName,//名字
							equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp.toolTipInfo.heroForce,//武力
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp.toolTipInfo.physique,//体质
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp.toolTipInfo.strategy,//谋略
							strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp.toolTipInfo.weaponType,//兵器方式
							type:temp.type							
						}
		  };
    if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone1 = true;
			        	strengthenData[0].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone1 = false;
			        	strengthenData[0].toolTipInfo.stoneName1 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc1 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone2 = true;
			        	strengthenData[0].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone2 = false;
			        	strengthenData[0].toolTipInfo.stoneName2 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc2 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone3 = true;
			        	strengthenData[0].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone3 = false;
			        	strengthenData[0].toolTipInfo.stoneName3 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc3 = "";
			        }
	stone[0] = new Array();	
	if(typeof(data.stone1) != "undefined" && data.stone1 != null){
		  	var temp = data.stone1;
		  	stone[0][0] = 
			{
					 userItemId:temp.id,//用户物品编号
		             itemType:temp.type,
	                 stoneLevel:temp.gemStoneLevel,
	                 attributeType : temp.attributeType,
	                 item:
	                 {
	                 	itemIcon:temp.icon,//物品图标名
	                 },
	                 toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type: temp.type
						}
	       }; 
	       if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	stone[0][0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	stone[0][0].toolTipInfo.isbag = true;
			        } 
		  	
		  	
		sroneLevels[xqList.mouseUpIndex][0] = stone[0][0].stoneLevel;	
	    //stone1Info = xiangqianTip(strengthenData[0],stone[0][0].item);
	}
	stone[1] = new Array();			  
	if(typeof(data.stone2) != "undefined" && data.stone2 != null){
		var temp = data.stone2;
		  	stone[1][0] = 
			{
					 userItemId:temp.id,//用户物品编号
		             itemType:temp.type,
	                 stoneLevel:temp.gemStoneLevel,
	                 attributeType : temp.attributeType,
	                 item:
	                 {
	                 	itemIcon:temp.icon,//物品图标名
	                 },
	                 toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type: temp.type
						}
	       }; 
	       if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	stone[1][0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	stone[1][0].toolTipInfo.isbag = true;
			        } 
		  	
		sroneLevels[xqList.mouseUpIndex][1] = stone[1][0].stoneLevel;		  	
	    //var item = stone[1][0];

	   // stone2tempInfoArray	= xiangqianTip(strengthenData[0],stone[1][0].item);
}		  
	stone[2] = new Array();	
	if(typeof(data.stone3) != "undefined" && data.stone3 != null){
		var temp = data.stone3;
		  	stone[2][0] = 
			{
					 userItemId:temp.id,//用户物品编号
		             itemType:temp.type,
	                 stoneLevel:temp.gemStoneLevel,
	                 attributeType : temp.attributeType,
	                 item:
	                 {
	                 	itemIcon:temp.icon,//物品图标名
	                 },
	                 toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type: temp.type
						}
	       }; 
	       if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	stone[2][0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	stone[2][0].toolTipInfo.isbag = true;
			        } 
		  	
		sroneLevels[xqList.mouseUpIndex][2] = stone[2][0].stoneLevel;
//	    var item = stone[2][0];
//  	    stonetempInfoArray	= xiangqianTip(strengthenData[0],stone[2][0].item);
	}  	  
	    itemInfo = new Array();
	    //var item = strengthenData[0].item;
        //displaytempInfoArray = xiangqianTip(strengthenData[0],item);
         
        for(var i=0; i<userItemId.length; i++){
        	if(userItemId[i] == strengthenData[0].id){
        		var _item = new Array();
        		for(var j=0; j<3; j++){
        			_item[j] = new Array();
//        			console.log(">>>>>>" + stone[j][0]);
					if(stone[j][0] != null && typeof(stone[j][0]) != "undefined"){
						switch(j){
						case 0:
							_item[j] = "" + stoneIconArray[data.stone1.attributeType - 1];
							break;
						case 1:
							_item[j] = "" + stoneIconArray[data.stone2.attributeType - 1];
							break;
						case 2:
							_item[j] = "" + stoneIconArray[data.stone3.attributeType - 1];
							break;
						}
					}
					else
					    _item[j] = "no_baoshi";//no_baoshi	        			
        		}
        		
				itemIcon.splice(i,1,_item);	        		
        	}
        }
//        console.log("itemIcon === " + itemIcon);
			var content = new Array(itemName,itemIcon);
            var listLen = content[0].length;
            if(listLen < 9){
            	listLen = 9;
            }            
//			xqList.entryStartIndex = 0;
//			xqOffsetY = xq_OffsetY = 0;
            xqList.update(content,qualityColor,listLen);
            xqList.updateLevel(sroneLevels);
}

function doExciseStone(data){//(equipmentId,holeIndex,callBack)
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}
stone1Info = new Array();
stone2Info = new Array();
stone3Info = new Array();
stone = new Array(new Array(),new Array(),new Array());
strengthenData = new Array();
sroneLevels[xqList.mouseUpIndex] = new Array();
var temp = data;
		strengthenData[0] = {//装备属性
			                 userItemId:data.id,
			                 itemType:data.type,//物品类型			           
		                     item:
		                     {
		                     	itemIcon:temp.icon
		                     },
				        //对象，物品的通用属性
				            toolTipInfo : 
						    {
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式							
						    }	
		  };
		  if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone1 = true;
			        	strengthenData[0].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone1 = false;
			        	strengthenData[0].toolTipInfo.stoneName1 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc1 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone2 = true;
			        	strengthenData[0].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone2 = false;
			        	strengthenData[0].toolTipInfo.stoneName2 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc2 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	strengthenData[0].toolTipInfo.stone3 = true;
			        	strengthenData[0].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
			        	strengthenData[0].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
			        }
			        else
			        {
			        	strengthenData[0].toolTipInfo.stone3 = false;
			        	strengthenData[0].toolTipInfo.stoneName3 = "";
			        	strengthenData[0].toolTipInfo.stoneNameDesc3 = "";
			        }
	stone[0] = new Array();	
	if(typeof(data.stone1) != "undefined" && data.stone1 != null){
		  	var temp = data.stone1;
		  	stone[0][0] = 
			{
				     attributeType : temp.attributeType,
		             itemType:temp.type,		           
	                 stoneLevel:temp.gemStoneLevel,
	                 //对象，物品的通用属性
	                 item:
	                 {
	                 	itemIcon : temp.icon
	                 },
		             toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}						
	       };  
		  if(typeof(temp.toolTipInfo.isBop) != "undefined")
		  {
			   stone[0][0].toolTipInfo.isbag = false;
		  }
		  else
		  {
			   stone[0][0].toolTipInfo.isbag = true;
		  }	
		sroneLevels[xqList.mouseUpIndex][0] = stone[0][0].stoneLevel;	
	   // stone1Info = xiangqianTip(strengthenData[0],stone[0][0].item);
	}
	stone[1] = new Array();			  
	if(typeof(data.stone2) != "undefined" && data.stone2 != null){
		var temp = data.stone2;
		  	stone[1][0] = 
			{
				     attributeType : temp.attributeType,
		             itemType:temp.type,		           
	                 stoneLevel:temp.gemStoneLevel,
	                 //对象，物品的通用属性
	                 item:
	                 {
	                 	itemIcon : temp.icon
	                 },
		             toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}						
	       };  
		  if(typeof(temp.toolTipInfo.isBop) != "undefined")
		  {
			   stone[1][0].toolTipInfo.isbag = false;
		  }
		  else
		  {
			   stone[1][0].toolTipInfo.isbag = true;
		  }	
		sroneLevels[xqList.mouseUpIndex][1] = stone[1][0].stoneLevel;		  	
	    //var item = stone[1][0];

	   // stone2tempInfoArray	= xiangqianTip(strengthenData[0],stone[1][0].item);
}	
	stone[2] = new Array();	
	if(typeof(data.stone3) != "undefined" && data.stone3 != null){
		var temp = data.stone3;
		  	stone[2][0] = 
			{
				     attributeType : temp.attributeType,
		             itemType:temp.type,		           
	                 stoneLevel:temp.gemStoneLevel,
	                 //对象，物品的通用属性
	                 item:
	                 {
	                 	itemIcon : temp.icon
	                 },
		             toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}						
	       };  
		  if(typeof(temp.toolTipInfo.isBop) != "undefined")
		  {
			   stone[2][0].toolTipInfo.isbag = false;
		  }
		  else
		  {
			   stone[2][0].toolTipInfo.isbag = true;
		  }	
		sroneLevels[xqList.mouseUpIndex][2] = stone[2][0].stoneLevel;
//	    var item = stone[2][0];
  	   // stonetempInfoArray	= xiangqianTip(strengthenData[0],stone[2][0].item);
	}  	  	  	  
	    itemInfo = new Array();
	    var item = strengthenData[0].item;
	    //displaytempInfoArray = xiangqianTip(strengthenData[0],item);
        for(var i=0; i<userItemId.length; i++){
        	if(userItemId[i] == strengthenData[0].userItemId){
        		var _item = new Array();
        		for(var j=0; j<3; j++){
        			_item[j] = new Array();
					if(stone[j][0] != null && typeof(stone[j][0]) != "undefined"){
						switch(j){
						case 0:
							_item[j] = "" + stoneIconArray[data.stone1.attributeType - 1];
							break;
						case 1:
							_item[j] = "" + stoneIconArray[data.stone2.attributeType - 1];
							break;
						case 2:
							_item[j] = "" + stoneIconArray[data.stone3.attributeType - 1];
							break;
						}
					}
					else
					    _item[j] = "no_baoshi";//no_baoshi	        			
        		}
				itemIcon.splice(i,1,_item);	        		
        	}
        }
	    
			var content = new Array(itemName,itemIcon);
            var listLen = content[0].length;
            if(listLen < 9){
            	listLen = 9;
            }            
//			xqList.entryStartIndex = 0;
//			xqOffsetY = xq_OffsetY = 0;
            xqList.update(content,qualityColor,listLen);
            xqList.updateLevel(sroneLevels);
}
function baoshiBG(index)//宝石背景
{
	bsIndex = index;
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	jiaGong = true;
	gbox.addObject(
	{ 
		id : 'bs_bg',
		group : 'levelMenu_3',
		tileset : 'jgf_zjm_0',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [582,272], [858,272], [858,470],[582,470]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{ 
			xiangqianItem(getClickObjectIndex());
			xiangqianList(getClickObjectIndex());
			baoshiBG(index);
			changeMap('jiagongfangScreen_Layer');				

		},
		blit : function()
		{
			if(isDrawUI[index] && isShowBaoshiList)
			{

			   var xqx = (gbox.getScreenW() - gbox.getImage("jgf_zjm_0").width)/2;
			   var xqy = (gbox.getScreenH() - gbox.getImage("jgf_zjm_0").height)/2;
			   gbox.drawImage('jgf_zjm_0',xqx,xqy);   
			   gbox.drawImage('ty_an_10',756,440);
			   if (gbox._mouseArea(shangcheng_bnt_Poly,touchMoveX,touchMoveY)) {
				   gbox.drawImage('ty_an_09',756,440);
			   }
			   var strW = gbox.getTextWidth("商 城",14);
			   var strX = 755 + (84 - strW)/2 - 2;
			   var strY = 440 + (26 - 14)/2;
			   gbox.drawDanceString("商 城", strX, strY,14,'#000000','#FFFFFF');	
			  
			}
		}
	 });
}
var shangcheng_bnt_Poly = [ [770,440], [770 + 61,440], [770 + 61,440 + 26],[770,440 + 26]];

var bs_exitPoly = [ [836,285], [836 + 23,285], [836 + 23,285 + 23],[836,285 + 23]];
function baoshiList(index)//宝石列表
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	jiaGong = true;
	gbox.addObject(
	{ 
		id : 'bs_list',
		group : 'levelMenu_3',
		tileset : 'jgf_zjm_0',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [588,292], [852,292], [852,440],[588,440]],
		initialize : function()
		{
            var content = new Array(baoshiArray);
            var listLen = content[0].length/3;
            if((content[0].length%3) != 0){
            	listLen = parseInt(content[0].length/3 + 1);
            }
            if(listLen < 4)
               listLen = 4;            
			bsOffsetY = bs_OffsetY = 0;			
			bsList.init( 'jgf_zjm_3_', 'jgf_zjm_3_','jgf_zjm_3_','jgf_zjm_3_', null,content, 566, 270, 7, listLen, 36, 4, true,-83,0 );
		},
		first : function() 
		{	
		},
		myclick : function()
		{ 
			xiangqianItem(getClickObjectIndex());
			xiangqianList(getClickObjectIndex());
			baoshiBG(index);
			changeMap('jiagongfangScreen_Layer');		
		},
		blit : function()
		{
			if(isDrawUI[index] && isShowBaoshiList)
			{			   					
			   bsList.paint( bs_OffsetY, bs_BeginSlip, bs_Time );
			   var bsIndex = bsList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
               if(typeof(bs_itemInfo) != "undefined" && bsIndex != -1){
               	  //gbox.drawMessage(bs_itemInfo[bsIndex], lastTouchMoveX,lastTouchMoveY, 100, 12, '#FFFFFF');
               }					    		   
			}
		}
	 });
}

function alertDialog(index,_id,_group,txt,bntTxt,offsetY)
{
	gbox.setRenderOrder(['jiagongfangScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	
	var pW = 300;
	var pH = 180;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	isDrawUI[index] = true;
	isShowDislog = true;
	isShowDislog1 = false;
	gbox.addObject(
	{ 
		id : _id,
		group : _group,
		tileset : 'jgf_zjm_0',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{ 	
			if(gbox._mouseArea(btnPoly[0],lastTouchMoveX,lastTouchMoveY)){
				BuildingFunction.exciseStone(userItemId[xqList.mouseUpIndex],(holeIndex + 1),doExciseStone);
				exit(getClickObjectIndex());
				isShowDislog = false;
				isShowDislog1 = false;
				xiangqianItem(getClickObjectIndex());
				changeMap('jiagongfangScreen_Layer');
			}else if(gbox._mouseArea(btnPoly[1],lastTouchMoveX,lastTouchMoveY)){
				exit(getClickObjectIndex());
				isShowDislog = false;
				isShowDislog1 = false;
				xiangqianItem(getClickObjectIndex());
				changeMap('jiagongfangScreen_Layer');
			}else{
                alertDialog(index,_id,_group,txt,bntTxt,offsetY);		
                changeMap('jiagongfangScreen_Layer');		
			}	
		},
		blit : function()
		{
			if(isDrawUI[index] && isShowDislog)
			{
				
				var scale = bntTxt.length;
				var dialogX = pX;
				var dialogY = pY;
				var dialogW = 300;
				var dialogH = 180;
				
//				gbox.drawImage('dialogBg',dialogX, dialogY);
				
				var rect = new Rect(dialogX, dialogY,300,180);
				gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#000000","#BEA76E",true);
				
				var txtArray = gbox.getStringsArray(txt,200,16);
				var txtW = gbox.stringArrayWidth(txtArray,16);
				var tX = dialogX + (dialogW - txtW)/2;
				var tY = dialogY + (dialogH - txtArray.length * 20)/2;
				for(var a=0; a<txtArray.length; a++){	
				   gbox.drawString(txtArray[a],tX, tY + (20*a),"#FFFFFF",16);
				}
				
				var scaleW = (dialogW/scale);
				var imgW = gbox.getImage('ty_an_08').width;
				var imgH = gbox.getImage('ty_an_08').height;
				btnPoly = new Array(new Array()); 
				for(var i=0; i<bntTxt.length; i++){
					var imgX = dialogX + (scaleW - imgW)/2 + (scaleW * i);
					var imgY = dialogY + dialogH - imgH - offsetY;
					gbox.drawImage('ty_an_08',imgX,imgY);
					btnPoly[i] = [ [imgX,imgY], [imgX + imgW, imgY], [imgX + imgW,imgY + imgH],[imgX,imgY + imgH]];
					if(gbox._mouseArea(btnPoly[i],touchMoveX,touchMoveY)){
					   gbox.drawImage('ty_an_06',imgX,imgY);						
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

function alertDialog1(index,_id,_group,txt,bntTxt,offsetY)
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isAlertDialog1 = true;
	var pW = 300;
	var pH = 180;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	isDrawUI[index] = true;
	isShowDislog = false;
	isShowDislog1 = true;
	gbox.addObject(
	{ 
		id : _id,
		group : _group,
		tileset : 'jgf_zjm_0',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{ 	
			if(gbox._mouseArea(btnPoly[0],lastTouchMoveX,lastTouchMoveY)){
				BuildingFunction.embedStone(userItemId[xqList.mouseUpIndex],baoshiArray[bsIndex].userItemId,(holeIndex + 1),doEmbedStone);
				baoshiArray = new Array();
				exit(getClickObjectIndex());
				isShowDislog = false;
				isShowDislog1 = false;
				xiangqianItem(getClickObjectIndex());
				changeMap('jiagongfangScreen_Layer');
			}else if(gbox._mouseArea(btnPoly[1],lastTouchMoveX,lastTouchMoveY)){
				exit(getClickObjectIndex());
				isShowDislog = false;
				isShowDislog1 = false;
				xiangqianItem(getClickObjectIndex());
				changeMap('jiagongfangScreen_Layer');
			}else{
				alertDialog1(index,_id,_group,txt,bntTxt,offsetY);		
                changeMap('jiagongfangScreen_Layer');		
			}	
		},
		blit : function()
		{
			if(isDrawUI[index] && isShowDislog1)
			{
				
				var scale = bntTxt.length;
				var dialogX = pX;
				var dialogY = pY;
				var dialogW = 300;
				var dialogH = 180;
				
//				gbox.drawImage('dialogBg',dialogX, dialogY);
				var rect = new Rect(dialogX, dialogY,300,180);
				gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#000000","#BEA76E",true);
				var txtArray = gbox.getStringsArray(txt,200,16);
				var txtW = gbox.stringArrayWidth(txtArray,16);
				var tX = dialogX + (dialogW - txtW)/2;
				var tY = dialogY + (dialogH - txtArray.length * 20)/2;
				for(var a=0; a<txtArray.length; a++){	
				   gbox.drawString(txtArray[a],tX, tY + (20*a),"#FFFFFF",16);
				}
				
				var scaleW = (dialogW/scale);
				var imgW = gbox.getImage('ty_an_08').width;
				var imgH = gbox.getImage('ty_an_08').height;
				btnPoly = new Array(new Array()); 
				for(var i=0; i<bntTxt.length; i++){
					var imgX = dialogX + (scaleW - imgW)/2 + (scaleW * i);
					var imgY = dialogY + dialogH - imgH - offsetY;
					gbox.drawImage('ty_an_08',imgX,imgY);
					btnPoly[i] = [ [imgX,imgY], [imgX + imgW, imgY], [imgX + imgW,imgY + imgH],[imgX,imgY + imgH]];
					if(gbox._mouseArea(btnPoly[i],touchMoveX,touchMoveY)){
					   gbox.drawImage('ty_an_06',imgX,imgY);						
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
var itemInfoStr = new Array();
var item;
var xiangqianTip = function(object,tempitem)
{
	//console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
	//console.log("==" + tempitem);
	item = tempitem;
	switch(object.itemType)
	{
		case 1: //装备

			  var levelStr = "";
		      switch(item.itemLevel){
		        	case 1:
		        	levelStr = "白色";
		        	break;
		        	case 2:
		        	levelStr = "绿色";
		        	break;
		        	case 3:
		        	levelStr = "蓝色";
		        	break;
		        	case 4:
		        	levelStr = "紫色";
		        	break;
		        	case 5:
		        	levelStr = "橙色";
		        	break;        	        	        	
		        }
//		        if(typeof(object.equipment) != "undefined")//强化界面特殊处理
//		        {
        	  itemInfoStr[0] = { slides: [
							 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
										  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "品级 ： " ,"res":levelStr, "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "绑定 ： " ,"res":object.bindState == 0? "未绑定":"绑定", "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "武力 ： " ,"res":item.heroForce/* == 0?item.attack : object.equipment.strengthenAttack == 0 ?item.attack:item.attack + "(" + " + " + object.equipment.strengthenAttack + ")"*/, "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "谋略 ： " ,"res":item.strategy/* == 0?item.defence: object.equipment.strengthenDefence == 0?item.defence:item.defence + "(" + " + " + object.equipment.strengthenDefence + ")"*/, "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "体质 ： " ,"res":item.physique /*== 0?item.stamina: object.equipment.strengthenStamina == 0?item.stamina:item.stamina + "(" + " + " + object.equipment.strengthenStamina + ")"*/, "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "身法 ： " ,"res":item.agility /*== 0?item.agility: object.equipment.strengthenAgility == 0?item.agility:item.agility + "(" + " + " + object.equipment.strengthenAgility + ")"*/, "resColor": "#ffffff","color": "#ffffff"},
//										  { "name": "智力 ： " ,"res":item.intelligence == 0?item.intelligence:item.intelligence + "(" + " + " + object.equipment.strengthenIntelligence + ")", "resColor": "#ffffff","color": "#ffffff"},
//										  { "name": "统帅 ： " ,"res":item.commandNum, "resColor": "#ffffff","color": "#ffffff"},	
										  { "name": "装备等级 ： " ,"res":item.needLevel, "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "强化等级 ： " ,"res":object.strengthLevel, "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "价格 ： " ,"res":item.salePrice, "resColor": "#ffffff","color": "#ffffff"},		
										  { "name": "插孔1 ： " ,"res":object.hole1, "resColor": "#ffffff","color": "#ffffff"},	
										  { "name": "插孔2 ： " ,"res":object.hole2, "resColor": "#ffffff","color": "#ffffff"},
										  { "name": "插孔3 ： " ,"res":object.hole3, "resColor": "#ffffff","color": "#ffffff"},	
							 ]};
//		        }
		       
//		        if(typeof(object.strengthenAttack)!= "undefined")
//		        {
//		        	  itemInfoStr[0] = { slides: [
//								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
//											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "品级 ： " ,"res":levelStr, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "绑定 ： " ,"res":object.bindState == 0? "未绑定":"绑定", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "攻击 ： " ,"res":item.attack == 0?item.attack : object.strengthenAttack == 0 ?item.attack:item.attack + "(" + " + " + object.strengthenAttack + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "防御 ： " ,"res":item.defence == 0?item.defence: object.strengthenDefence == 0?item.defence:item.defence + "(" + " + " + object.strengthenDefence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "体力 ： " ,"res":item.stamina == 0?item.stamina: object.strengthenStamina == 0?item.stamina:item.stamina + "(" + " + " + object.strengthenStamina + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "敏捷 ： " ,"res":item.agility == 0?item.agility: object.strengthenAgility == 0?item.agility:item.agility + "(" + " + " + object.strengthenAgility + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "智力 ： " ,"res":item.intelligence == 0?item.intelligence:item.intelligence + "(" + " + " + object.strengthenIntelligence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "统帅 ： " ,"res":item.commandNum, "resColor": "#ffffff","color": "#ffffff"},	
//											  { "name": "装备等级 ： " ,"res":item.needLevel, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "强化等级 ： " ,"res":object.strengthLevel, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "价格 ： " ,"res":item.salePrice, "resColor": "#ffffff","color": "#ffffff"},		
//											  { "name": "插孔1 ： " ,"res":object.hole1, "resColor": "#ffffff","color": "#ffffff"},	
//											  { "name": "插孔2 ： " ,"res":object.hole2, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "插孔3 ： " ,"res":object.hole3, "resColor": "#ffffff","color": "#ffffff"},	
//								 ]};
//		        	
//		        }
			  

			    for(var a = 0; a<itemInfoStr[0].slides.length; a++)
			    {
			        
			    	if(itemInfoStr[0].slides[a].res == 0)
			    	{
			    		itemInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
		  break;
		  case 2://道具
		      
			  itemInfoStr[0] = { slides: [
								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
			    {
			        
			    	if(itemInfoStr[0].slides[a].res == 0)
			    	{
			    		itemInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
		  break;
		  case 3://材料
              
			  itemInfoStr[0] = { slides: [
								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
			    {
			        
			    	if(itemInfoStr[0].slides[a].res == 0)
			    	{
			    		itemInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
		 break;
		 case 4://任务
		      
			  itemInfoStr[0] = { slides: [
								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
			    {
			        
			    	if(itemInfoStr[0].slides[a].res == 0)
			    	{
			    		itemInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
		 break;
		 
	}
	return itemInfoStr[0];
};