function checkForTouch()
{
	var d = document.createElement("div");
	d.setAttribute("ontouchmove", "return;");
	return typeof d.ontouchmove == "function" ? true : false;
};
var tempX = 0;
var touchX = 0;
var touchY = 0;
var touchStartX = 0;
var touchStartY = 0;
var touchMoveX = 0;
var touchMoveY = 0;
var worldMoveX = 0;
var worldMoveY = 0;
var lastTouchMoveX = 0;
var lastTouchMoveY = 0;
var hasTouchMoveEvent = false;
var firstClick = false;

var bTouch = false;
var iContrast = -1;
var oldContrast;
var curGroup = 'cityMenu';
var oldGroup = 'cityMenu';
var layerID;
var oldLayer = 'cityMenuLayer';

function touchStart(event)
{
	setTimeout(function()
			{
				window.scrollTo(0, 1);
			}, 10);
		  if(typeof(closedragmove)=='undefined'){
			event.preventDefault();
			event.stopPropagation();
		  }
		  
		   var pos_x = event.touches[0].offsetX?(event.touches[0].offsetX):event.touches[0].pageX-document.getElementById("canvas").offsetLeft;
			var pos_y = event.touches[0].offsetY?(event.touches[0].offsetY):event.touches[0].pageY-document.getElementById("canvas").offsetTop;
		   
			var touchPos =
			{
				x : pos_x,
				y : pos_y
			};

			if (navigator.userAgent.toLowerCase().indexOf ('iphone') > 0 && window.devicePixelRatio==2)
			{
				if (inith == 746||inith==744)
				{
					
					touchPos.x /= 1.8;
					touchPos.y /= 1.8;
					touchPos.x = parseInt(touchPos.x);
					touchPos.y = parseInt(touchPos.y);
					touchPos.x -= 16;
					touchPos.y += 1;
					touchPos.x+=88;
					 
				} else
				{
					
					touchPos.x /= 2;
					touchPos.y /= 2;
					touchPos.x+=88;
					
				}
			}

			isTouchX = touchPos.x;
			isTouchY = touchPos.y;
			touchStartX = touchPos.x;
			touchStartY = touchPos.y;

			firstClick = true;

			bTouch = true;
			downTouch();
}

function touchEnd(event)
{
	 isBgMoving = false;
	 isMapMoving = false;
	 if(typeof(closedragmove)=='undefined')
			event.preventDefault();
			touchMoveX = touchMoveY = 0;
			touch();

			bTouch = false;
}

function touchMove(event)
{
	  console.log("touchMove");
	  isBgMoving = true;
	  isMapMoving = true;
	  if(typeof(closedragmove)=='undefined')
			event.preventDefault();
			
			hasTouchMoveEvent = true;

		    var pos_x = event.touches[0].offsetX?(event.touches[0].offsetX):event.touches[0].pageX-document.getElementById("canvas").offsetLeft;
			var pos_y = event.touches[0].offsetY?(event.touches[0].offsetY):event.touches[0].pageY-document.getElementById("canvas").offsetTop;
			var touchPos =
			{
				x : pos_x,
				y : pos_y
			};
			
			if (navigator.userAgent.toLowerCase().indexOf ('iphone') > 0 && window.devicePixelRatio==2)
			{
				if (inith == 746||inith==744)
				{
					
					touchPos.x /= 1.8;
					touchPos.y /= 1.8;
					touchPos.x = parseInt(touchPos.x);
					touchPos.y = parseInt(touchPos.y);
					touchPos.x -= 16;
					touchPos.y += 1;
					touchPos.x+=88;
				} else
				{
					
					touchPos.x /= 2;
					touchPos.y /= 2;
					touchPos.x+=80;
				}
			}
			
			if (firstClick)
			{
				touchMoveX = touchPos.x - touchStartX;
				touchMoveY = touchPos.y - touchStartY;
				firstClick = false;
			} else
			{
				touchMoveX = touchPos.x - lastTouchMoveX;
				touchMoveY = touchPos.y - lastTouchMoveY;
			}
			lastTouchMoveX = touchPos.x;
			lastTouchMoveY = touchPos.y;

			touchMoveX = touchMoveX * touchSpeed;
			touchMoveY = touchMoveY * touchSpeed;
};

var mouseClick = false;

function mouseDown(event)
{
    var pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("canvas").offsetLeft;
	var pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("canvas").offsetTop;
	moveArray = new Array();
	mouseClick = true;
	touchStartX = pos_x;//event.pageX;
	touchStartY = pos_y;//event.pageY;
	firstClick = true;
	bTouch = true;
	downTouch();
	   if(isListCommand('kjgList'))
       {
//	       	if(gbox._mouseArea(kjglist.listPoly,touchMoveX,touchMoveY)){ 
				pointerDraggedY = pos_y;
				kjgOffsetY = 0;
				kjg_OffsetY = kjgOffsetY;
				kjg_BeginSlip=false;
//	       	}
	    }
	   if(isListCommand('chatList'))
       {
//	       	if(gbox._mouseArea(chatlist.listPoly,touchMoveX,touchMoveY)){ 
				pointerDraggedY = pos_y;
				chatOffsetY = 0;
				chat_OffsetY = chatOffsetY;
				chat_BeginSlip=false;
//	       	}
	    }
	   if(isListCommand('bs_list'))
       {
//	       	if(gbox._mouseArea(bsList.listPoly,touchMoveX,touchMoveY)){ 
				pointerDraggedY = pos_y;
				bsOffsetY = 0;
				bs_OffsetY = bsOffsetY;
				bs_BeginSlip=false;
//	       	}
	    }
	   if(isListCommand('jfskillList'))
       {
			pointerDraggedY = pos_y;
			jfsOffsetY = 0;
			jfs_OffsetY = jfsOffsetY;
			jfs_BeginSlip=false;
	    }
	   if(isListCommand('jfList'))
       {
			pointerDraggedY = pos_y;
			jfOffsetY = 0;
			jf_OffsetY = jfOffsetY;
			jf_BeginSlip=false;
	    }
	   if(isListCommand('jxg2list'))
       {
			pointerDraggedY = pos_y;
			jxg2OffsetY = 0;
			jxg2_OffsetY = jxg2OffsetY;
			jxg2_BeginSlip=false;
	    }
	   if(isListCommand('jxglist'))
       {
			pointerDraggedY = pos_y;
			jxgOffsetY = 0;
			jxg_OffsetY = jxgOffsetY;
			jxg_BeginSlip=false;
	    }
	   if(isListCommand('tyslist'))
       {
//		   if(gbox._mouseArea(tyslist.listPoly,touchMoveX,touchMoveY)){ 
				pointerDraggedY = pos_y;
				tysOffsetY = 0;
				tys_OffsetY = tysOffsetY;
				tys_BeginSlip=false;
//		   }
	    }
	   if(isListCommand('jjclist'))
       {
//		   if(gbox._mouseArea(jjclist.listPoly,touchMoveX,touchMoveY)){ 
				pointerDraggedY = pos_y;
				jjcOffsetY = 0;
				jjc_OffsetY = jjcOffsetY;
				jjc_BeginSlip=false;
//		   }
	    }
	   if(isListCommand('bylist'))
       {
			pointerDraggedY = pos_y;
			jyOffsetY = 0;
			jy_OffsetY = jyOffsetY;
			jy_BeginSlip=false;
	    }
	   
	   if(isListCommand('xq_List'))
       {
			pointerDraggedY = pos_y;
			xqOffsetY = 0;
			xq_OffsetY = xqOffsetY;
			xq_BeginSlip=false;
	    }
	   if(isListCommand('hehceng_List'))
       {
       	
			pointerDraggedY = pos_y;
			hechengOffsetY = 0;
			hecheng_OffsetY = hechengOffsetY;
			hecheng_BeginSlip=false;
	    }
	   if(isListCommand('test_List'))
       {
       	
			pointerDraggedY = pos_y;
			testOffsetY = 0;
			test_OffsetY = testOffsetY;
			test_BeginSlip=false;
			//testListDrg = false;
	    }
       if(isListCommand('qh_List'))
       {
			pointerDraggedY = pos_y;
			qhOffsetY = 0;
			qh_OffsetY = qhOffsetY;
			qh_BeginSlip=false;
	    }		
       if(isListCommand('equipList'))
       {
			pointerDraggedY = pos_y;
			equipOffsetY = 0;
			equip_OffsetY = equipOffsetY;
			equip_BeginSlip=false;
	    }	
	   if(isListCommand('pmhList'))
       {
//	       	if(gbox._mouseArea(guokuList.listPoly,touchMoveX,touchMoveY)){ 
				pointerDraggedY = pos_y;
				gkOffsetY = 0;
				gk_OffsetY = gkOffsetY;
				gk_BeginSlip=false;
//	       	}
	    }	
	   if(isListCommand('pmhList'))
       {
//	       	if(gbox._mouseArea(guokuList.listPoly,touchMoveX,touchMoveY)){ 
				pointerDraggedY = pos_y;
				pmhOffsetY = 0;
				pmh_OffsetY = pmhOffsetY;
				pmh_BeginSlip=false;
//	       	}
	    }
	   
       if(isListCommand('wjList'))
       {
			pointerDraggedY = pos_y;
			wjOffsetY = 0;
			wj_OffsetY = wjOffsetY;
			wj_BeginSlip=false;
	    }	
       
	   if(isListBarCommand('wealList'))
	   {
			pointerDraggedY = pos_y;
			wealOffsetY = 0;
			weal_OffsetY = wealOffsetY;
			weal_BeginSlip=false;
	   }
	   
	   if(isListBarCommand('consumeList'))
	   {
			pointerDraggedY = pos_y;
			consumeOffsetY = 0;
			consume_OffsetY = consumeOffsetY;
			consume_BeginSlip=false;
	   }
	   
	   
       if(isListCommand('customFace_list'))
       {
			pointerDraggedY = pos_y;
			customFaceOffsetY = 0;
			customFace_OffsetY = customFaceOffsetY;
			customFace_BeginSlip=false;
	   }
};

window.onmouseout = function () 
{ 
	
    if(isListCommand('world_bg'))
    {
    	mouseClick = false;
    	isBgMoving = false;
    	isMapMoving = false;
    	curScreenX = worldMapStartX;
    	curScreenY = worldMapStartY;
    	moveArray.push(isBgMoving);
    	touchMoveX = touchMoveY = 0;
    	
    	var sX = Number(parseInt(screenX + worldMapStartX/* + lastTouchMoveX*/));
		var sY = Number(parseInt(screenY + worldMapStartY/* + lastTouchMoveY*/));
		User.getWorldData(sX,sY,doWorldData);
		console.log("浏览器失去了焦点!");
    }
}

var gkAllID = 0;
var gkAllX = 0;
var gkAllY = 0;
var gkUseAble = 0;
var gkSalePrice = 0;
var gkThrowAble = 0;
var oldWorldMapStartX = 0;
var oldWorldMapStartY = 0;
function mouseUp(event)
{
	mouseClick = false;
	isBgMoving = false;
	isMapMoving = false;
	curScreenX = worldMapStartX;
	curScreenY = worldMapStartY;
	moveArray.push(isBgMoving);
	touchMoveX = touchMoveY = 0;
	
	//判断如果划动距离小于5，则认为没有划动
//	if((Math.abs(lastTouchMoveX - touchStartX) >= 1) || (Math.abs(lastTouchMoveY - touchStartY) >= 1)) {
//		worldMapStartX = 0;
//		worldMapStartY = 0;
//	}
    if(isListCommand('radarMap'))
    {
	    for(var i=0; i<systemCityData.length; i++){
            var temp = systemCityData[i];
            if(gbox._mouseArea(radarPoly[i],lastTouchMoveX,lastTouchMoveY))
            {
          	  console.log("世界小地图(建筑)定位");
              displayDestroy();
			  exit(getClickObjectIndex());
			  worldMapStartX = 0;
              worldMapStartY = 0; 
              curScreenX = 0;
              curScreenY = 0;
              input1.value = '' + temp.x;
              input2.value = '' + temp.y;
          	  var mcX = getCx(Number(temp.x),Number(temp.y));
          	  var mcY = getCy(Number(temp.x),Number(temp.y));
          	  screenX = mcX - gbox.getScreenW()/2;
          	  screenY = mcY - gbox.getScreenH()/2;
              var sX = Number(parseInt(screenX));
      		  var sY = Number(parseInt(screenY));
      		  User.getWorldData(sX,sY,doWorldData);
            }
	    }
    }
    if(isListCommand('world_bg'))
    {

          //我的城池
		  var circle1Poly = [ [1260,35],[1260 + 44,35], [1260 + 44,35 + 44],[1260,35 + 44]];
          if(gbox._mouseArea(circle1Poly,lastTouchMoveX,lastTouchMoveY))
          {
        	  console.log("我的城池");
              displayDestroy();
			  exit(getClickObjectIndex());
	          worldMapStartX = worldMapStartY = 0;
	          var mcX = getCx(Number(mcIndexX),Number(mcIndexY));
	          var mcY = getCy(Number(mcIndexX),Number(mcIndexY));
	          screenX = mcX - gbox.getScreenW()/2;
	          screenY = mcY - gbox.getScreenH()/2;
	          var sX = Number(parseInt(screenX));
	    	  var sY = Number(parseInt(screenY));
	    	  User.getWorldData(sX,sY,doWorldData);
          }
          
    	  //雷达定位
		  var arrowPoly = [ [1394,8],[1394 + 24,8], [1394 + 24,8 + 17],[1394,8 + 17]];
          if(gbox._mouseArea(arrowPoly,lastTouchMoveX,lastTouchMoveY))
          {
        	  console.log("雷达定位");
        	  worldMapStartX = worldMapStartY = 0;
        	  var mcX = getCx(Number(input1.value),Number(input2.value));
        	  var mcY = getCy(Number(input1.value),Number(input2.value));
        	  screenX = mcX - gbox.getScreenW()/2;
        	  screenY = mcY - gbox.getScreenH()/2;
          	  var sX = Number(parseInt(screenX));
    		  var sY = Number(parseInt(screenY));
    		  User.getWorldData(sX,sY,doWorldData);
          }else{
        	  if(worldMapStartX != oldWorldMapStartX || worldMapStartY != worldMapStartY)
        	  {
              	  var sX = Number(parseInt(screenX + worldMapStartX));
        		  var sY = Number(parseInt(screenY + worldMapStartY));
        		  User.getWorldData(sX,sY,doWorldData);
        	  }
        	  oldWorldMapStartX = worldMapStartX;
        	  oldWorldMapStartY = worldMapStartY;
          }
    }
	//chatList	
    if(isListCommand('chatList'))
    {
			if(chatlist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(chatOffsetY) > 12)
				{
					chatOffsetY=12*(chatOffsetY/Math.abs(chatOffsetY));
				}
				chat_OffsetY = chatOffsetY;
				chat_BeginSlip = true;
				chat_Time = 0;

			}else{
				chatlist.radioHandle(chatlist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
				console.log("chatIndex = " + chatlist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
			}	
          	if(gbox._mouseArea(chatlist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		chatlist.keyUp();
            }
          	if(gbox._mouseArea(chatlist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		chatlist.keyDown();
            }
    }	
       if(isListCommand('bs_list'))
       {
			if(bsList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(bsOffsetY) > 12)
				{
					bsOffsetY=12*(bsOffsetY/Math.abs(bsOffsetY));
				}
				bs_OffsetY = bsOffsetY;
				bs_BeginSlip = true;
				bs_Time = 0;

			}else{
                 bsIndex = bsList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY)
                 console.log("bsIndex = " + bsIndex);
				 xqListIndex = getClickObjectIndex();
				 bsList.radioHandle(bsIndex);	
                 isShowDislog = true;
                 

//				 BuildingFunction.embedStone(userItemId[xqList.mouseUpIndex],baoshiArray[bsList.mouseUpIndex].userItemId,(holeIndex + 1),doEmbedStone);
				exit(bsIndex);
				isShowBaoshiList = false;
                var money = (baoshiArray[bsIndex].stoneLevel - 1) * baseMoney;
				var btnTxt = new Array();
				btnTxt[0] = "确定";
				btnTxt[1] = "取消";
				alertDialog1(getClickObjectIndex(),'xiangqianDialog','levelMenu_5',"需要铜币："+money+"\n确定要镶嵌" + baoshiArray[bsIndex].toolTipInfo.materialName + "吗？",btnTxt,20);
                changeMap('cityMenuLayer');
			}	
			xiangqianItem(getClickObjectIndex());
			var content = new Array(itemName,itemIcon);
            var listLen = content[0].length;
            if(listLen < 9){
            	listLen = 9;
            }   
			xqList.update(content, qhListColor, listLen);
			changeMap('jiagongfangScreen_Layer');
			
          	if(gbox._mouseArea(bsList.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		bsList.keyUp();
            }
          	if(gbox._mouseArea(bsList.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		bsList.keyDown();
            }
       }	
       
//       if(isListCommand('jjclist'))
//       {
//			if(jjclist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
//			{
//				if(Math.abs(jjcOffsetY) > 12)
//				{
//					jjcOffsetY=12*(jjcOffsetY/Math.abs(jjcOffsetY));
//				}
//				jjc_OffsetY = jjcOffsetY;
//				jjc_BeginSlip = true;
//				jjc_Time = 0;
//
//			}else{
//				jjclist.radioHandle(jjclist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
//				console.log("jjcIndex = " + jjclist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
//
//			}	
//
//       }
       
       if(isListCommand('xq_List'))
       {
			if(xqList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(xqOffsetY) > 12)
				{
					xqOffsetY=12*(xqOffsetY/Math.abs(xqOffsetY));
				}
				xq_OffsetY = xqOffsetY;
				xq_BeginSlip = true;
				xq_Time = 0;

			}else{
				 xqIndex = xqList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				 console.log("xqIndex = " + xqIndex);
				 BuildingFunction.getEquipmentInfo(userItemId[xqIndex],doEquipmentInfo);
				if(isShowBaoshiList || isShowDislog){
		            isShowBaoshiList = false;
		            isShowDislog = false;
					baoshiArray = new Array();
					bs_itemInfo = new Array(new Array());			            
			        clearSub(getClickObjectIndex());				    		
				 }	
				
				xqList.radioHandle(xqIndex);
			}	
//			jiaGong = true;
//			xiangqianItem(getClickObjectIndex());
//			var content = new Array(itemName,itemIcon);
//            var listLen = content[0].length;
//            if(listLen < 9){
//            	listLen = 9;
//            }   
//			xqList.update(content, qhListColor, listLen);
//			changeMap('jiagongfangScreen_Layer');
          	if(gbox._mouseArea(xqList.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		xqList.keyUp();
            }
          	if(gbox._mouseArea(xqList.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		xqList.keyDown();
            }
       }
       if(isListCommand('hecheng_List'))
       {
       	   
			if(hechengList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(hechengOffsetY) > 12)
				{
					hechengOffsetY=12*(hechengOffsetY/Math.abs(hechengOffsetY));
				}
				hecheng_OffsetY = hechengOffsetY;
				hecheng_BeginSlip = true;
				hecheng_Time = 0;

			}else{
				
				 hechengList.radioHandle(hechengList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
				 //getEquipmentStrengthenInfo(userItemId[qhList.mouseUpIndex],doEquipmentStrengthenInfo);
				 console.log("hechengList = " + hechengList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
			}	
          	if(gbox._mouseArea(hechengList.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		hechengList.keyUp();
            }
          	if(gbox._mouseArea(hechengList.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		hechengList.keyDown();
            }
       }			
	   if(isListCommand('test_List'))
       {
       	   
			if(testList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(testOffsetY) > 12)
				{
					testOffsetY=12*(testOffsetY/Math.abs(testOffsetY));
				}
				test_OffsetY = testOffsetY;
				test_BeginSlip = true;
				test_Time = 0;
                jsindex_1 = -1;
			}else{
				
				 testList.radioHandle(testList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
				 //getEquipmentStrengthenInfo(userItemId[qhList.mouseUpIndex],doEquipmentStrengthenInfo);
				 jsindex_1 = testList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				 testList.mouseUpIndex = testList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				 console.log("testList = " + testList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
			}	
          	if(gbox._mouseArea(testList.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		testList.keyUp();
            }
          	if(gbox._mouseArea(testList.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		testList.keyDown();
            }
       }	
       if(isListCommand('qh_List'))
       {
       	    //console.log("===========" + qhList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
			if(qhList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(qhOffsetY) > 12)
				{
					qhOffsetY=12*(qhOffsetY/Math.abs(qhOffsetY));
				}
				qh_OffsetY = qhOffsetY;
				qh_BeginSlip = true;
				qh_Time = 0;

			}else{
				 qhList.radioHandle(qhList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
				 BuildingFunction.getEquipmentStrengthenInfo(userItemId[qhList.mouseUpIndex],doEquipmentStrengthenInfo);
				 console.log("qhIndex = " + qhList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
			}	
//			jiaGong = true;
//			qianghuaItem(getClickObjectIndex());
//			var content = new Array(itemName,qhListlevel);
//            var listLen = content[0].length;
//            if(listLen < 9){
//            	listLen = 9;
//            }
//			qhList.update(content, qhListColor, listLen);
//			changeMap('jiagongfangScreen_Layer');
			
          	if(gbox._mouseArea(qhList.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		qhList.keyUp();
            }
          	if(gbox._mouseArea(qhList.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		qhList.keyDown();
            }
       }	
       if(isListCommand('equipList'))
       {
			if(zhuangbeiList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(equipOffsetY) > 12)
				{
					equipOffsetY=12*(equipOffsetY/Math.abs(equipOffsetY));
				}
				equip_OffsetY = equipOffsetY;
				equip_BeginSlip = true;
				equip_Time = 0;

			}else{
				zhuangbeiList.radioHandle(zhuangbeiList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
				 console.log("equipIndex = " + zhuangbeiList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
			}	
          	if(gbox._mouseArea(zhuangbeiList.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		zhuangbeiList.keyUp();
            }
          	if(gbox._mouseArea(zhuangbeiList.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		zhuangbeiList.keyDown();
            }
       }
       if(isListCommand('gkList'))
       {
			if(guokuList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(gkOffsetY) > 12)
				{
					gkOffsetY=12*(gkOffsetY/Math.abs(gkOffsetY));
				}
				gk_OffsetY = gkOffsetY;
				gk_BeginSlip = true;
				gk_Time = 0;
				if(isPopupBuild){//拍卖行
				    isShowAuctionPorp = false;
					if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
					    document.body.removeChild(propAuctionNumbg);  
					    propAuctionNumbg = null;  
					}
				}else{//国库
					drawGkItem = true;
					isShowUsePorp = false;
					if(propNumbg != null && gbox._isIndwellDiv("propNumbg","input")){
					    document.body.removeChild(propNumbg);  
					    propNumbg = null; 
					} 					
				}
			
			}else{
				guokuIndex = guokuList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
                guokuList.radioHandle(guokuList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
                if(isPopupBuild){//拍卖行
					if(typeof(gkData[guokuIndex]) != "undefined" && 
					   typeof(gkData[guokuIndex].item) != "undefined" ){
						if(gkData[guokuIndex].itemCounts <= 1){
							isPopupBuild = false;
							isShowGuokuList = false;
							var eIndex = (getClickObjectIndex() - 1);
							isDrawUI[eIndex] = false;
	                        clickObjectList[eIndex].poly = [[0,0],[0,0],[0,0],[0,0]];
	                        isDrawUI[getClickObjectIndex()] = false;
	                        clickObjectList[getClickObjectIndex()].poly = [[0,0],[0,0],[0,0],[0,0]];
//							clearSub(popupIndex);
                            contValue = 0;
							if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
							    document.body.removeChild(propAuctionNumbg);  
							    propAuctionNumbg = null;  
							}                            						
						}else{
							var btnTxt = new Array();
							btnTxt[0] = "上拍";
							btnTxt[1] = "取消";
							console.log(">>>>>>>>>>>" + gkData[guokuIndex].toolTipInfo.type);
							
		                    auctionPorp(getClickObjectIndex(),1,"确定要上拍" + gkData[guokuIndex].toolTipInfo.itemName + "吗？",btnTxt,20);						
						}
						        	
					}				            
                }else
                {//国库
	 		        if(typeof(gkData[guokuIndex]) != "undefined" && 
					   typeof(gkData[guokuIndex].toolTipInfo) != "undefined" ){
				        drawGkItem = false;
				        isShowUsePorp = false;
						if(propNumbg != null && 
						   typeof(propNumbg) != "undefined" &&
						   gbox._isIndwellDiv("propNumbg","input")){
					            document.body.removeChild(propNumbg);  
					            propNumbg = null;  
						} 
					    console.log(" ========= " +gkData[guokuIndex].useable);		
					    console.log(" =========>>> " +gkData[guokuIndex].sellAble);	
					    console.log(" =========<< " +gkData[guokuIndex].dropAble);			        
				        guokuItem(getClickObjectIndex(),
				                  lastTouchMoveX,lastTouchMoveY,
				                  gkData[guokuIndex].useable,
				                  gkData[guokuIndex].sellAble,
				                  gkData[guokuIndex].dropAble,group_src,getCurrentLayer());	
				        console.log("完成guokuItem__index ========= " + getClickObjectIndex());	
					} 			              	
                }

			    console.log("guokuIndex = " + guokuIndex);
			}
          	if(gbox._mouseArea(guokuList.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		guokuList.keyUp();
            }
          	if(gbox._mouseArea(guokuList.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		guokuList.keyDown();
            }
       }
       
	   if(isListCommand('pmhList'))
       {
       	    //console.log(">>>>>>>>" + pmh_List.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
			if(pmh_List.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(pmhOffsetY) > 12)
				{
					pmhOffsetY=12*(pmhOffsetY/Math.abs(pmhOffsetY));
				}
				pmh_OffsetY = pmhOffsetY;
				pmh_BeginSlip = true;
				pmh_Time = 0;
				if(isPopupBuild){//拍卖行
				    isShowAuctionPorp = false;
					if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
					    document.body.removeChild(propAuctionNumbg);  
					    propAuctionNumbg = null;  
					}
				}else{//国库
					drawGkItem = true;
					isShowUsePorp = false;
					if(propNumbg != null && gbox._isIndwellDiv("propNumbg","input")){
					    document.body.removeChild(propNumbg);  
					    propNumbg = null; 
					} 					
				}
			
			}else{
				pmhIndex = pmh_List.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				pmh_List.radioHandle(pmh_List.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));	
               if(isPopupBuild){//拍卖行
					if(typeof(gkData[pmhIndex]) != "undefined" && 
					   typeof(gkData[pmhIndex].item) != "undefined" ){
						if(gkData[pmhIndex].itemCounts <= 1){
							isPopupBuild = false;
							isShowGuokuList = false;
							var eIndex = (getClickObjectIndex() - 1);
							isDrawUI[eIndex] = false;
	                        clickObjectList[eIndex].poly = [[0,0],[0,0],[0,0],[0,0]];
	                        isDrawUI[getClickObjectIndex()] = false;
	                        clickObjectList[getClickObjectIndex()].poly = [[0,0],[0,0],[0,0],[0,0]];
//							clearSub(popupIndex);
                           contValue = 0;
							if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
							    document.body.removeChild(propAuctionNumbg);  
							    propAuctionNumbg = null;  
							}                            						
						}else{
							var btnTxt = new Array();
							btnTxt[0] = "上拍";
							btnTxt[1] = "取消";	
							//console.log("====" + gkData[pmhIndex].type);					
							switch(gkData[pmhIndex].type)
							{
								case 1:
								   auctionPorp(getClickObjectIndex(),1,"确定要上拍" + gkData[pmhIndex].toolTipInfo.equipmentName + "吗？",btnTxt,20);
								   break;	
								case 3:
								   auctionPorp(getClickObjectIndex(),1,"确定要上拍" + gkData[pmhIndex].toolTipInfo.materialName + "吗？",btnTxt,20);
								   break;
								case 2:
								   auctionPorp(getClickObjectIndex(),1,"确定要上拍" + gkData[pmhIndex].toolTipInfo.materialName + "吗？",btnTxt,20);
								   break;					
							}
						}
						        	
					}				            
               }
			    console.log("pmhIndex = " + pmhIndex);
			}
			
          	if(gbox._mouseArea(pmh_List.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		pmh_List.keyUp();
            }
          	if(gbox._mouseArea(pmh_List.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		pmh_List.keyDown();
            }
      
       }
       
       if(isListCommand('wjList'))
       {

			if(wujiangList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(wjOffsetY) > 12)
				{
					wjOffsetY=12*(wjOffsetY/Math.abs(wjOffsetY));
				}
				wj_OffsetY = wjOffsetY;
				wj_BeginSlip = true;
				wj_Time = 0;
				drawInfo = false; 
			}else{
				var index;
				wujiangList.radioHandle(wujiangList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));				
				index = wujiangList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				wjId = 	wujiangList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				Hero.getUserHero(heroArray[index].userHeroId,dogetUserHero);
			}	

          	if(gbox._mouseArea(wujiangList.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		wujiangList.keyUp();
            }
          	if(gbox._mouseArea(wujiangList.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		wujiangList.keyDown();
            }
       }

	   if(isListBarCommand('wealList'))
	   {
			if(weallist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(wealOffsetY) > 12)
				{
					wealOffsetY=12*(wealOffsetY/Math.abs(wealOffsetY));
				}
				weal_OffsetY = wealOffsetY;
				weal_BeginSlip = true;
				weal_Time = 0;
			}else{
				wealIndex = weallist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				console.log("wealIndex = " + wealIndex);
				weallist.radioHandle(wealIndex);
			}	
			
          	if(gbox._mouseArea(weallist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		weallist.keyUp();
            }
          	if(gbox._mouseArea(weallist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
          		weallist.keyDown();
            }
	   }
//	   if(isListBarCommand('consumeList'))
//	   {
//			if(consumelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
//			{
//				if(Math.abs(consumeOffsetY) > 12)
//				{
//					consumeOffsetY=12*(consumeOffsetY/Math.abs(consumeOffsetY));
//				}
//				consume_OffsetY = consumeOffsetY;
//				consume_BeginSlip = true;
//				consume_Time = 0;
//			}else{
//				consumeIndex = consumelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
//				console.log("consumeIndex ===== " + consumeIndex);
//				consumelist.radioHandle(consumeIndex);
//			}	
//			
//          	if(gbox._mouseArea(consumelist.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
//          		consumelist.keyUp();
//            }
//          	if(gbox._mouseArea(consumelist.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
//          		consumelist.keyDown();
//            }
//	   }
	   
	   
       if(isListCommand('customFace_list'))
       {
			if(customFacelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == -1)
			{
				if(Math.abs(customFaceOffsetY) > 12)
				{
					customFaceOffsetY=12*(customFaceOffsetY/Math.abs(customFaceOffsetY));
				}
				customFace_OffsetY = customFaceOffsetY;
				customFace_BeginSlip = true;
				customFace_Time = 0;
			}else{
				
				 var tmpTxt = "";
				if(customFacelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) <= 9)
				 	tmpTxt = "#0" + customFacelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY)
				 else
				 	tmpTxt = "#" + customFacelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY)
				 
				 e3.focus();
				 e3.value += tmpTxt;
				 console.log("customFaceList = " + customFacelist.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));
			}	
       }
	touch();
	bTouch = false;
};

var pointerDraggedY;
function mouseMove(event)
{
	var pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("canvas").offsetLeft;
	var pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("canvas").offsetTop;

		hasTouchMoveEvent = true;

		if (firstClick)
		{
			touchMoveX = pos_x - touchStartX;
			touchMoveY = pos_y - touchStartY;
			firstClick = false;
		} else
		{
			touchMoveX = pos_x - lastTouchMoveX;
			touchMoveY = pos_y - lastTouchMoveY;
		}
		lastTouchMoveX = pos_x;
		lastTouchMoveY = pos_y;
		touchMoveX = touchMoveX;// * 2;
		touchMoveY = touchMoveY;// * 2;
		worldMoveX = touchMoveX;
		worldMoveY = touchMoveY;
		touchMoveY = pos_y;
		touchMoveX = pos_x;	
		
	if (mouseClick)
	{
	       if(isListCommand('kjgList'))
	       {
//	       	if(gbox._mouseArea(kjglist.listPoly,touchMoveX,touchMoveY)){ 
	       	  kjgOffsetY = pos_y - pointerDraggedY;
		      pointerDraggedY = pos_y;
		      kjg_OffsetY = kjgOffsetY;
//	       	}
	       }
	       if(isListCommand('chatList'))
	       {
	       	if(gbox._mouseArea(chatlist.listPoly,touchMoveX,touchMoveY)){ 
	       		chatOffsetY = pos_y - pointerDraggedY;
		        pointerDraggedY = pos_y;
		        chat_OffsetY = chatOffsetY;
	       	}
	       }		
       if(isListCommand('bs_list'))
       {
       	if(gbox._mouseArea(bsList.listPoly,touchMoveX,touchMoveY)){ 
       	  bsOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  bs_OffsetY = bsOffsetY;
       	}
       }	
       if(isListCommand('jxg2list'))
       {
    	  jxg2OffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
	      jxg2_OffsetY = jxg2OffsetY;
       }
       if(isListCommand('jfskillList'))
       {
    	  jfsOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
	      jfs_OffsetY = jfsOffsetY;
       }       
       if(isListCommand('jfList'))
       {
    	  jfOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
	      jf_OffsetY = jfOffsetY;
       }
       if(isListCommand('jxglist'))
       {
    	  jxgOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
	      jxg_OffsetY = jxgOffsetY;
       }
       if(isListCommand('tyslist'))
       {
//    	   if(gbox._mouseArea(tyslist.listPoly,touchMoveX,touchMoveY)){ 
	    	  tysOffsetY = pos_y - pointerDraggedY;
		      pointerDraggedY = pos_y;
		      tys_OffsetY = tysOffsetY;
//    	   }
       }
       if(isListCommand('jjclist'))
       {
//    	   if(gbox._mouseArea(jjclist.listPoly,touchMoveX,touchMoveY)){ 
	    	  jjcOffsetY = pos_y - pointerDraggedY;
		      pointerDraggedY = pos_y;
		      jjc_OffsetY = jjcOffsetY;
//    	   }
       }
       if(isListCommand('bylist'))
       {
//    	   if(gbox._mouseArea(jylist.listPoly,touchMoveX,touchMoveY)){ 
    	    	  jyOffsetY = pos_y - pointerDraggedY;
    		      pointerDraggedY = pos_y;
    		      jy_OffsetY = jyOffsetY;
//    	   }

       }
       
       if(isListCommand('xq_List'))
       {
       	  xqOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  xq_OffsetY = xqOffsetY;
       }	
       if(isListCommand('hecheng_List'))
       {
       	  hechengOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  hecheng_OffsetY = hechengOffsetY;
       }	
       if(isListCommand('test_List'))
       {
       	  testOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  test_OffsetY = testOffsetY;
		  //testListDrg = true;
       }		
       if(isListCommand('qh_List'))
       {
       	  qhOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  qh_OffsetY = qhOffsetY;
       }				
       if(isListCommand('equipList'))
       {
       	  equipOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  equip_OffsetY = equipOffsetY;
       }
       if(isListCommand('gkList'))
       {
       	if(gbox._mouseArea(guokuList.listPoly,touchMoveX,touchMoveY)){ 
       	  gkOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  gk_OffsetY = gkOffsetY;
       	}
       }
	   if(isListCommand('pmhList'))
       {
	       	if(gbox._mouseArea(pmh_List.listPoly,touchMoveX,touchMoveY)){ 
	           pmhOffsetY = pos_y - pointerDraggedY;
	  	       pointerDraggedY = pos_y;
	  		   pmh_OffsetY = pmhOffsetY;
	        }
       }
       
       if(isListCommand('wjList'))
       {
       	  wjOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  wj_OffsetY = wjOffsetY;
       }
       
       if(isListCommand('wealList'))
       {
    	  wealOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
	      weal_OffsetY = wealOffsetY;
       } 
       
       if(isListCommand('consumeList'))
       {
    	   consumeOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
	      consume_OffsetY = consumeOffsetY;
       } 
       
       if(isListCommand('customFace_list'))
       {
       	  customFaceOffsetY = pos_y - pointerDraggedY;
	      pointerDraggedY = pos_y;
		  customFace_OffsetY = customFaceOffsetY;
       }   

		//判断如果划动距离小于5，则认为没有划动
		if((Math.abs(lastTouchMoveX - touchStartX) < 5) && (Math.abs(lastTouchMoveY - touchStartY) < 5)) {
			hasTouchMoveEvent = false;
		}
	    isBgMoving = true; 
	    isMapMoving = true;
	    moveArray.push(isBgMoving);
	}
	
	 if(getCurrentLayer() == 'environsScreen_Layer' )
	{
		 ambitW = (gbox.getScreenW() - gbox.getImage('environs').width)/2;
		 ambitH = (gbox.getScreenH() - gbox.getImage('environs').height)/2;
	     if(worldMapStartX<ambitW) worldMapStartX = ambitW;
		 if(worldMapStartY<ambitH) worldMapStartY = ambitH;
		 if(worldMapStartX>-ambitW) worldMapStartX  = -ambitW;
		 if(worldMapStartY>-ambitH) worldMapStartY  = -ambitH;			
    }
	
};

//对象是否被初始化(zjm 2012.03.20)
var isInitialize = function(poly)
{
	  for(var i = 0; i < poly.length; i++){
	    for(var j = 0; j < poly.length; j++){
	       if(poly[i][j] > 1)
	         return true;
	    }
	  }
	    return false;
};



//是否是列表控制(zjm 2012.03.21)
var curListIndex = 0;
var isListCommand = function(oid){
	for(var i = clickObjectList.length - 1; i>=0; i--)
	{
      if(tool.pointInPoly([touchStartX, touchStartY], clickObjectList[i].poly)){
      	if ( iContrast == i ){
      		for(var j = clickObjectList.length - 1; j>=0; j--)
			{
                 if( j == i && clickObjectList[j].id == oid )
					return true;
                 
			}
      	}

      }
	}
	return false;
}

var isListBarCommand = function(oid){
	for(var i = clickObjectList.length - 1; i>=0; i--)
	{
      if(tool.pointInPoly([touchMoveX, touchMoveY], clickObjectList[i].poly)){
//      	if ( iContrast == i ){
      		for(var j = clickObjectList.length - 1; j>=0; j--)
			{
                 if( j == i && clickObjectList[j].id == oid )
					return true;
                 
			}
//      	}

      }
	}
	return false;
}

function getCurrentLayer(){
	return layerID;
}

//动态获得点击对象索引(zjm 2012.03.21)
function getClickObjectIndex()
{
	
	for(var i = clickObjectList.length - 1; i>=0; i--)
	{
		if (tool.pointInPoly([touchStartX, touchStartY], clickObjectList[i].poly))
		{
			return i;
		}
	}
}
/*
* UI模块系统推出
* (zjm 2012.06.21)
*/
function exit(index){
	if(typeof(clickObjectList) != "undefined"){
		if(typeof(clickObjectList[index]) != "undefined"){
			isDrawUI[index] = false;
			clickObjectList[index].poly = [[0,0],[0,0],[0,0],[0,0]];
		}
		for(var i = clickObjectList.length - 1; i>=0; i--){
			
			if(i >= iContrast){
			   if(isInitialize(clickObjectList[i].poly)){			
			        isDrawUI[i] = false;
					clickObjectList[i].poly = [[0,0],[0,0],[0,0],[0,0]];	
			   }
			   
			   if(i == iContrast){
					break;
			   }				
			}
		}
    }
}


//function clickTimer(loopTime)
//{
//	//console.log("useTime ========= " + (new Date().getTime()-loopTime));
//	if((new Date().getTime()-loopTime)>300)
//	{
//		loopTime = new Date().getTime();
//		clearInterval(timeInterval);
//		timeInterval = null;
//	}
//	//console.log("timeInterval ========= " + timeInterval);
//};
//
//var timeInterval = null;

function touch()
{   
	if (hasTouchMoveEvent == false)
	{
		touchX = touchStartX;
		touchY = touchStartY;
		processTouch();
	} else
	{
		for(var i = clickObjectList.length - 1; i>=0; i--){
			if (tool.pointInPoly([lastTouchMoveX, lastTouchMoveY], clickObjectList[i].poly))
			{
				if ( iContrast == i )//判断点击索引 
				{
						if(oldLayer != layerID)//切层刷屏
						{
							for(var j = clickObjectList.length - 1; j>=0; j--)
						 	{
							 	isDrawUI[j] = false;
						 	}
						}
						
				 	    for(var j = clickObjectList.length - 1; j>=0; j--)
				 	    {

				 	    	if( j != i ){//除了当前UI打开，其它UI一律关闭 (同组唯一性)
	                             for(var a = uiGroupList.length - 1; a>=0; a--){
									  if(uiGroupList[a] != curGroup){
										  
	                                       if(clickObjectList[j].group == uiGroupList[a]){//筛选组 
	                                        		//console.log("初始化【"+j+"】 = " + isInitialize(clickObjectList[j].poly));
	                                        		
	                                        	if( isInitialize(clickObjectList[j].poly)){
//	                                        		console.log("销毁【"+uiGroupList[a]+"】 【"+j+"】");
	                                        		displayDestroy();
	                                        		isDrawUI[j] = false;
											 	    clickObjectList[j].poly = [[0,0],[0,0],[0,0],[0,0]];	
	                                        	}		                                        		
								 	       }
									   }else
										   break;
								}
				 	    		
					 	    		if(clickObjectList[j].group == curGroup)
					 	    		{//筛选同组 （保持唯一性）
					 	    			if(clickObjectList[j].id != 'bs_list' &&
					 	    			   clickObjectList[j].id != 'xq_List' &&
					 	    			   clickObjectList[j].id != 'xq_Bg' &&
					 	    			   clickObjectList[j].id != 'xq_button1' &&
					 	    			   clickObjectList[j].id != 'xq_button2' &&
					 	    			   clickObjectList[j].id != 'qh_List' &&
					 	    			   clickObjectList[j].id != 'qh_Bg' &&
					 	    			   clickObjectList[j].id != 'qh_button1' &&
					 	    			   clickObjectList[j].id != 'qh_button2' &&
					 	    			   clickObjectList[j].id != 'qh_button3' &&
					 	    			   clickObjectList[j].id != 'equipList' && 
					 	    			   clickObjectList[j].id != 'wjList' &&
					 	    			   clickObjectList[j].id != 'gkList' &&
					 	    			   clickObjectList[j].id != 'guokuBg' &&
					 	    			  clickObjectList[j].id != 'propWindows1' &&
					 	    			  clickObjectList[j].id != 'propWindows2' &&
					 	    			  clickObjectList[j].id != 'propWindows3' &&
					 	    			  clickObjectList[j].id != 'propWindows4' &&
					 	    			  clickObjectList[j].id != 'propWindows5' &&
					 	    			   clickObjectList[j].id != 'hecheng_List' &&
					 	    			   clickObjectList[j].id != 'pmhList' &&
					 	    			   clickObjectList[j].id != 'test_List' &&
					 	    			   clickObjectList[j].id != 'customFace_list' &&
					 	    			   clickObjectList[j].id != 'bylist' &&
					 	    			   clickObjectList[j].id != 'jjclist' &&
					 	    			   clickObjectList[j].id != 'tyslist' &&
					 	    			  // clickObjectList[j].id != 'jxglist' &&
					 	    			   clickObjectList[j].id != 'jfList' &&
					 	    			   clickObjectList[j].id != 'jfskillList' &&
					 	    			   clickObjectList[j].id != 'jxg2list' &&
					 	    			   clickObjectList[j].id != 'down' &&
					 	    			   clickObjectList[j].id != 'neizheng' &&
					 	    			   clickObjectList[j].id != 'chatList' &&
					 	    			   clickObjectList[j].id != 'worldCityData' &&
					 	    			   clickObjectList[j].id != 'popupPage' &&
					 	    			   clickObjectList[j].id != 'pmhList' &&
					 	    			   clickObjectList[j].id != 'kjgList' &&
					 	    			   clickObjectList[j].id != 'wwg' &&
					 	    			   clickObjectList[j].id != 'unionCreat' &&
					 	    			   clickObjectList[j].id != 'unionInfo' &&
					 	    			   clickObjectList[j].id != 'unionMember' &&
					 	    			   clickObjectList[j].id != 'unionSkill' &&
					 	    			   clickObjectList[j].id != 'unionWeal' &&
					 	    			   clickObjectList[j].id != 'wealList' &&
					 	    			   clickObjectList[j].id != 'consumeList' &&
					 	    			   clickObjectList[j].id != 'unionCasern' &&
					 	    			   clickObjectList[j].id != 'unionMarket' &&
					 	    			  clickObjectList[j].id != 'taskList' &&
					 	    			 clickObjectList[j].id != 'taskMain' 
					 	    			 ){
					 	    				isDrawUI[j] = false;
							 	    	    clickObjectList[j].poly = [[0,0],[0,0],[0,0],[0,0]];
                                           break;
					 	    			}

					 	    		}
					 	    }
				 	    }
						
						 switch(layerID){
						 	case 'cityMenuLayer'://主城layer
						 	    //底层刷新（保证layer最低层刷新控制 ）
						        enterCityMenu('cityMenu');
						        changeMap('cityMenuLayer');	
						 	    break;
						 	case 'environsScreen_Layer'://城郊layer						 		
								EnvironsScreen();
								changeMap('environsScreen_Layer');
						 	    break;
						 	case 'worldScreen_Layer'://世界layer						 	
						 		WorldScreen();
						        changeMap('worldScreen_Layer');
						 	    break;
						 	case 'taiweifuScreen_Layer'://太尉俯layer						 	
						 	    taiweifu();
						        changeMap('taiweifuScreen_Layer');
						 	    break;
						 	case 'jiuguanScreen_Layer'://酒馆layer						 	
						 	    jiuguan();
						        changeMap('jiuguanScreen_Layer');
						 	    break;
						 	    
						 	case 'jishiScreen_Layer'://集市layer						 	
						 	    jishiMenu();
						        changeMap('jishiScreen_Layer');
						 	    break;
						 	    
						 	case 'jiagongfangScreen_Layer'://加工纺layer						 	
						 	    jiaGongfang();
						        changeMap('jiagongfangScreen_Layer');
						 	    break;
						 }
	                     
						 console.log('生成【'+ curGroup +'】【'+ i +'】');
						 clickObjectList[i].myclick();
					break;
				}
			}
			
		}
	}
	hasTouchMoveEvent = false;
	oldContrast = iContrast;
	iContrast = -1;
	oldGroup = curGroup;
	oldLayer = layerID;
	console.log("lastTouchMoveX === " + lastTouchMoveX + ", lastTouchMoveY === " + lastTouchMoveY);
};

function downTouch()
{
	for(var i = clickObjectList.length - 1; i>=0; i--)
	{
		if (tool.pointInPoly([touchStartX, touchStartY], clickObjectList[i].poly))
		{
			 //console.log('我的 输出【'+ i +'】');
			iContrast = i;
			curGroup = clickObjectList[i].group;
			return;
		}
	}
}
function processTouch()
{
	for(var i = clickObjectList.length - 1; i>=0; i--)
	{
		if (tool.pointInPoly([touchX, touchY], clickObjectList[i].poly))
		{
			clickObjectList[i].myclick();
			return;
		}
	}
};

/** 注册当前层 */
var uiGroupList;
function registerLayerToList(layerId)
{
	layerID = layerId;
	var g = gbox.getGroupsInLayer(layerId);
	uiGroupList = g;
	for ( var i in g)
	{
		if (gbox.getGroupShow(g[i]) == 1)
		{
			var o = gbox.getObjectsInGroup(g[i]);
			for ( var j in o)
			{
				try
				{
					if (typeof (o[j]) != 'undefined')
					{
						if (o[j].poly.length > 0)
						{
							clickObjectList.push(o[j]);
						}
					}
				} catch (e)
				{
					/*alert(o[j] + ' ' + e.toString());*/
				}
			}
		}
	}
};

function clearSub(index){
	for(var i = clickObjectList.length - 1; i>=0; i--){
		if(i > index){
		   if(isInitialize(clickObjectList[i].poly)){
		        isDrawUI[i] = false;
				clickObjectList[i].poly = [[0,0],[0,0],[0,0],[0,0]];	
		   }				
		}
	}
};

function displayDestroy(){
	isTaskList = false;
	isFarmland = false;
	isTaksUI = false;
	isCaijiPop = false;
	isJiasu = false;
	isHoursebuilding = false;
	isMemberFindInfo = false;
	isMinjuPop = false;
	isWorldMessage = false;
	isFreeQCMessage = false;
	isJZMessage = false;
	isQiansanSolier = false;
	isTiquShezhi = false;
	isPizhun = false;
	isYaoqing = false;
	isUnionDashi = false;
	isEditInfo = false;
	isChiefDemise = false;
	isUnionBreakup = false;
	isUnionUpLevel = false;
	isApply = false;
	isDonateRanking = false;
	iQsuitAlliancePop = false;
	isFindMember = false;
	isPopFind = false;
	isWealDonate = false;
	isKInfo = false;
	isMarketBuy = false;
	isUpLevel = false;
	isConsumeList = false;
	isWealList = false;
	isExpel = false;
	isAppointment = false;
	isPopMember = false;
	isWaiwuguan = false;
	isUnionMarket = false;
	isUnionCasern = false;
	isUnionSkill = false;
	isUnionWeal = false;
	isUnionMember = false;
	isUnionInfo = false;
	isUnionCreat = false;
	socialDraw = false;
	//socialDraw = false;
	isShowGuokuList = false;
	isShowUsePorp = false;
	isZJInfo = false;
	isJjcChakan = false;
	isChengQiang = false;
	isKejiaoguan = false;
	isInbox = false;
	isTaiweifu = false;
	isJinjie = false;
	isQiansan = false;
	isJunjichu = false;
	isJunjichuList = false;
	isJunying = false;
	isJiuguan = false;
	isWjZhaomu = false;
	isWarpthGarget = false;
	isMinju = false;
	isTaiyishu = false;
	isJuxiange = false;
	isJuxiangeList = false;
	isJuxiange2List = false;
	isJyList = false;
	isJiaofang = false;
	isTaiyishu = false;
	//isJiaoSkillfangList = false;
	//isJiaofangList = false;
	isTaiyishuList = false;
	isMinju = false;	
	isFenghuotai = false;
	isJunzhu = false;
	isZJTitle = false;
	isZJCountry = false;
	isZJName = false;
	isPeibing = false;
	isWorldCityData = false;
	//generalDrawBg = false;
	//generalsSkillCtr = false;
	isJunqing = false;
	isRadarMap = false;
	isRadarPop = false; 
	//武将出征界面
	warpthMenuClass.flag.isDrawWarpthMenu = false;
	//城郊等待列表
	EnvironsScreenBattleClass.flag.waitingListIsOpen = false;
	EnvironsScreenBattleClass.flag.clickMenuIsOpen = false;
	EnvironsScreenBattleClass.flag.promptIsOpen = false;
	EnvironsScreenBattleClass.flag.armyInformationIsOpen = false;
	//删除canvas的鼠标滚动监听
	MouseWheelList.clearSet();
	if(MouseWheelPanelObj){
		for(var i in MouseWheelPanelObj){
			if(MouseWheelPanelObj[i].clearSet)
				MouseWheelPanelObj[i].clearSet();
		}
	}
	
	LoadingPanel.isOpen = false;
	
	isXiangqianList = false;
	isQianghuaList = false;
	isPmhList = false;
	marketCtr = false;
	jishiItemCtr = false;
	isPmhList = false;
	jishiItemCtr = false;
	isPopupBuild = false;
	isShowAuctionPorp =false;
	isInbox = false;
	_isScienceStudyDraw = false;
//	isKejiaoguanList = false;
	friendListCtr = false;
	ispaihang = false;
//	isChatItem = false;
	
	//by sun  采集的英雄控制
	if(isCaijiPop==false){
		isSelect = false;
		id4CanGo = null;
		heroIcon_caiji = null;
	}
	

	if(upQradeRemainTimeInterval != null){
		clearInterval(upQradeRemainTimeInterval);
		upQradeRemainCnt = 0;
		upQradeRemainTimeInterval = null;
		upQradeRemainTime =  "等待刷新！";
	}	
	
	if(upQradeRemainTimeInterval1 != null){
		clearInterval(upQradeRemainTimeInterval1);
		upQradeRemainCnt1 = 0;
		upQradeRemainTimeInterval1 = null;
		upQradeRemainTime1 =  "等待刷新！";
	}	
	
	for(var i=0; i<demolition_upgrade.length; i++){
		demolition_upgrade[i] = false;
	}
	for(var i=0; i<cancel_speed.length; i++){
		cancel_speed[i] = false;
	}
	
	if(typeof(userHeros) != "undefined" && typeof(userHeros[0]) != "undefined"){
		for(var i=pbPage; i<userHeros.length; i++){
		    if(divPBNum[i] != null && gbox._isIndwellDiv("divPBNum["+i+"]","input"))
			{
			   document.body.removeChild(divPBNum[i]);  
			   divPBNum[i] = null;  	
			}
		}
	}
	if(gbox._isIndwellDiv("equipmentNumID","input")){
							document.body.removeChild(equipmentNumbg);
							equipmentNumbg = null;
						    Numbg = true;
						}
    if(findFriendDiv != null && gbox._isIndwellDiv("findFriendDiv","input"))
	{
        document.body.removeChild(findFriendDiv);  
        findFriendDiv = null;  
	}
	
    if(addFriendDiv != null && gbox._isIndwellDiv("addFriendDiv","input"))
	{
        document.body.removeChild(addFriendDiv);  
        addFriendDiv = null;  
	}
    if(findUnionByName != null && gbox._isIndwellDiv("findUnionByName","input"))
	{
        document.body.removeChild(findUnionByName);  
        findUnionByName = null;  
	}
	if(divGFNum != null && gbox._isIndwellDiv("divGFNum","input")){
        document.body.removeChild(divGFNum);  
        divGFNum = null;  				            
    }
	 if(gbox._isIndwellDiv("mailContentDiv","input"))
						{
							
							  document.body.removeChild(mailContentDiv);  
							  mailContentDiv = null;
						} 
					//	console.log("========= " + gbox._isIndwellDiv("viewNameDiv","input"));
					if(gbox._isIndwellDiv("viewNameDiv","input"))
						{
							  document.body.removeChild(viewNameDiv);  
							  viewNameDiv = null;
						} 
					if(gbox._isIndwellDiv("receiveNameDiv","input"))
						{
							
							  document.body.removeChild(receiveNameDiv);  
							  receiveNameDiv = null;
						} 
	if(gbox._isIndwellDiv("titleNameDiv","input"))
						{
							  document.body.removeChild(titleNameDiv);  
							  titleNameDiv = null;
							  
							
						} 
				    if(gbox._isIndwellDiv("mailContentDiv","input"))
						{
							
							  document.body.removeChild(mailContentDiv);  
							  mailContentDiv = null;
						} 
	if(gbox._isIndwellDiv("jzContentDiv","input"))
	{
		document.body.removeChild(jzContentDiv);  
		jzContentDiv = null;
	} 	
	if(divjunjichuNum != null && gbox._isIndwellDiv("divjunjichuNum","input")){
        document.body.removeChild(divjunjichuNum);  
        divjunjichuNum = null;  				            
    }
	if(divjyxunNum != null && gbox._isIndwellDiv("divjyxunNum","input")){
        document.body.removeChild(divjyxunNum);  
        divjyxunNum = null;  				            
    }
	if(divjinjieNum != null && gbox._isIndwellDiv("divjinjieNum","input")){
        document.body.removeChild(divjinjieNum);  
        divjinjieNum = null;  				            
    }
    if(learnSkillInterval != null)
		{
			clearInterval(learnSkillInterval);
			learnSkillCnt = 0;
			learnSkillInterval =  null;
		}	
	if(divQiansanNum != null && gbox._isIndwellDiv("divQiansanNum","input")){
        document.body.removeChild(divQiansanNum);  
        divQiansanNum = null;  				            
    }
	
	if(divZMNum != null && gbox._isIndwellDiv("divZMNum","input")){
        document.body.removeChild(divZMNum);  
        divZMNum = null;  				            
    }
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

						if(updataDivName != null && gbox._isIndwellDiv("updataNameDiv","input"))
						{
							  document.body.removeChild(updataDivName);  
							  updataDivName = null;
						}
			            if(worldRadarDiv != null && gbox._isIndwellDiv("worldRadarDiv","input"))
						{
							  document.body.removeChild(worldRadarDiv);  
							  worldRadarDiv = null;
						}
					   //下拉框对象销毁 start
						if(comboboxes){
							for(var i in comboboxes){
							    comboboxes[i].isOpen = false;
							}
						}
						//下拉框对象销毁 end
			            
						if(unionDescribeDiv != null)
						{
							  document.body.removeChild(unionDescribeDiv);  
					          unionDescribeDiv = null;
						}
						if(unionBulletinDiv != null)
						{
							  document.body.removeChild(unionBulletinDiv);  
							  unionBulletinDiv = null;
						}
						if(unionNameDiv != null)
						{
							  document.body.removeChild(unionNameDiv);  
					          unionNameDiv = null;
						}
						if(unionFlagDiv != null)
						{
							  document.body.removeChild(unionFlagDiv);  
					          unionFlagDiv = null;
						}
						
						if(findUnionDiv != null)
						{
							  document.body.removeChild(findUnionDiv);  
					          findUnionDiv = null;
						}
		                if(shiwuDiv != null)
						{
							  document.body.removeChild(shiwuDiv);  
							  shiwuDiv = null;
						}
		                if(woodDiv != null)
						{
							  document.body.removeChild(woodDiv);  
							  woodDiv = null;
						}
		                if(stoneDiv != null)
						{
							  document.body.removeChild(stoneDiv);  
							  stoneDiv = null;
						}
		                if(steelDiv != null)
						{
							  document.body.removeChild(steelDiv);  
							  steelDiv = null;
						}
		                if(moneyDiv != null)
						{
							  document.body.removeChild(moneyDiv);  
							  moneyDiv = null;
						}
		                if(goldDiv != null)
						{
							  document.body.removeChild(goldDiv);  
							  goldDiv = null;
						}
						if(gbox._isIndwellDiv("browseNameDiv","input"))
						{
							  document.body.removeChild(browseNameDiv);  
							  browseNameDiv = null;
						} 
				    if(gbox._isIndwellDiv("browseLevelDiv","input"))
						{
							  document.body.removeChild(browseLevelDiv);  
							  browseLevelDiv = null;
						} 
					if(gbox._isIndwellDiv("browseLevelDiv_2","input"))
						{
							  document.body.removeChild(browseLevelDiv_2);  
							  browseLevelDiv_2 = null;
						} 
				   	if(auctionDivName[6] != null && gbox._isIndwellDiv("diplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[6]);  
							  auctionDivName[6] = null;
						}
					if(auctionDivName[5] != null && gbox._isIndwellDiv("jingdiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[5]);  
							  auctionDivName[5] = null;
						}
				if(gbox._isIndwellDiv("auctionGoldDiv1","input"))
						{
							  document.body.removeChild(auctionDivName[0]);  
							  auctionDivName[0] = null;
						}
				if(gbox._isIndwellDiv("auctionGoldDiv2","input"))
						{
							  document.body.removeChild(auctionDivName[1]);  
							  auctionDivName[1] = null;
						}
				if(gbox._isIndwellDiv("auctionSilverDiv1","input"))
						{
							  document.body.removeChild(auctionDivName[2]);  
							  auctionDivName[2] = null;
						}
				if(gbox._isIndwellDiv("auctionSilverDiv2","input"))
						{
							  document.body.removeChild(auctionDivName[3]);  
							  auctionDivName[3] = null;
						}	
				if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
				            document.body.removeChild(propAuctionNumbg);  
				            propAuctionNumbg = null;  				            
					}											
				if(gbox._isIndwellDiv("paidiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[4]);  
							  auctionDivName[4] = null;
						}
				
			    if(gbox._isIndwellDiv("chiefDemiseDiv","input"))
				 {
					  document.body.removeChild(chiefDemiseDiv);  
					  chiefDemiseDiv = null;
				 }
			    if(gbox._isIndwellDiv("editDescribeDiv","input"))
				 {
					  document.body.removeChild(editDescribeDiv);  
					  editDescribeDiv = null;
				 }
			    
			    if(gbox._isIndwellDiv("editBulletinDiv","input"))
				 {
					  document.body.removeChild(editBulletinDiv);  
					  editBulletinDiv = null;
				 }
			    if(gbox._isIndwellDiv("yaoqingDiv","input"))
				 {
					  document.body.removeChild(yaoqingDiv);  
					  yaoqingDiv = null;
				 }
			    if(gbox._isIndwellDiv("casernTiquDiv","input"))
				 {
					  document.body.removeChild(casernTiquDiv);  
					  casernTiquDiv = null;
				 }
			    if(gbox._isIndwellDiv("casernJuanxianDiv","input"))
				 {
					  document.body.removeChild(casernJuanxianDiv);  
					  casernJuanxianDiv = null;
				 }
			    
			    if(gbox._isIndwellDiv("qiansanSolierDiv","input"))
				 {
					  document.body.removeChild(qiansanSolierDiv);  
					  qiansanSolierDiv = null;
				 }
			    
			    if(gbox._isIndwellDiv("tiquSetDiv","input"))
				{
					  document.body.removeChild(tiquSetDiv);  
					  tiquSetDiv = null;
				}
}


/*********************** 
* 函数：判断滚轮滚动方向 
* 作者：zjm 
* 参数：event 
* 返回：滚轮方向 1：向上 -1：向下 
*************************/ 
function scrollFunc(e){
	e=e || window.event; 
    if(e.wheelDelta){//IE/Opera/Chrome 
//        console.log("e.wheelDelta(IE/Opera/Chrome) === " + e.wheelDelta);
    	
        if(isListBarCommand('kjgList'))
        {
        	kjg_OffsetY = e.wheelDelta;
        }else
        if(isListBarCommand('chatList'))
        {
            chat_OffsetY = e.wheelDelta;
        }else
        if(isListBarCommand('bs_list'))
        {
        	bs_OffsetY = e.wheelDelta;
        }else
        if(isListBarCommand('jfskillList'))
        {
        	jfs_OffsetY = e.wheelDelta;
        }else
        if(isListBarCommand('jfList'))
        {
            jf_OffsetY = e.wheelDelta;
        }else
        if(isListBarCommand('jxg2list'))
        {
        	jxg2_OffsetY = e.wheelDelta;
        }else
     	if(isListBarCommand('jxglist'))
        {
     		jxg_OffsetY = e.wheelDelta;   
        }else
        if(isListBarCommand('tyslist'))
        {
        	tys_OffsetY = e.wheelDelta;
        }else
        if(isListBarCommand('jjclist'))
        {
        	jjc_OffsetY = e.wheelDelta;
        }else
     	if(isListBarCommand('bylist'))
        {
     		by_OffsetY = e.wheelDelta;  
        }else
     	   if(isListBarCommand('xq_List'))
           {
     		  xq_OffsetY = e.wheelDelta; 
    	   }else
    	   if(isListBarCommand('hehceng_List'))
           {
    		   hecheng_OffsetY = e.wheelDelta; 
    	    }else
    	   if(isListBarCommand('test_List'))
           {
           	   hecheng_OffsetY = e.wheelDelta; 
    	   }else
           if(isListBarCommand('qh_List'))
           {
        	   qh_OffsetY = e.wheelDelta; 
    	    }else		
           if(isListBarCommand('equipList'))
           {
        	   equip_OffsetY = e.wheelDelta; 
    	    }else	
    	   if(isListBarCommand('gkList'))
           {
    		   gk_OffsetY = e.wheelDelta;
    	    }else	
           if(isListBarCommand('wjList'))
           {
        	   wj_OffsetY = e.wheelDelta;
    	    }else
    	   if(isListBarCommand('wealList'))
    	   {
    	       weal_OffsetY = e.wheelDelta;
    	   }else
           if(isListBarCommand('consumeList'))
           {
        	   consume_OffsetY = e.wheelDelta;
           }else
           if(isListBarCommand('customFace_list'))
           {
        	   customFace_OffsetY = e.wheelDelta;
    	   }
    }else if(e.detail){//Firefox 
//    	console.log("e.detail(Firefox)=== " + e.detail);
        if(isListBarCommand('kjgList'))
        {
        	kjg_OffsetY = -(e.detail);
        }else
        if(isListBarCommand('chatList'))
        {
            chat_OffsetY = -(e.detail);
        }else
        if(isListBarCommand('bs_list'))
        {
        	bs_OffsetY = -(e.detail);
        }else
        if(isListBarCommand('jfskillList'))
        {
        	jfs_OffsetY = -(e.detail);
        }else
        if(isListBarCommand('jfList'))
        {
            jf_OffsetY = -(e.detail);
        }else
        if(isListBarCommand('jxg2list'))
        {
        	jxg2_OffsetY = -(e.detail);
        }else
     	if(isListBarCommand('jxglist'))
        {
     		jxg_OffsetY = -(e.detail);
        }else
        if(isListBarCommand('tyslist'))
        {
        	tys_OffsetY = -(e.detail);
        }else
        if(isListBarCommand('jjclist'))
        {
        	jjc_OffsetY = -(e.detail);
        }else
     	if(isListBarCommand('bylist'))
        {
     		by_OffsetY = -(e.detail);
        }else
     	   if(isListBarCommand('xq_List'))
           {
     		  xq_OffsetY = -(e.detail);
    	    }else
    	   if(isListBarCommand('hehceng_List'))
           {
    		   hecheng_OffsetY = -(e.detail);
    	    }else
    	   if(isListBarCommand('test_List'))
           {
           	   hecheng_OffsetY = -(e.detail);
    	   }else
           if(isListBarCommand('qh_List'))
           {
        	   qh_OffsetY = -(e.detail);
    	    }else		
           if(isListBarCommand('equipList'))
           {
        	   equip_OffsetY = -(e.detail);
    	    }else	
    	   if(isListBarCommand('gkList'))
           {
    		   gk_OffsetY = -(e.detail);
    	    }else	
           if(isListBarCommand('wjList'))
           {
        	   wj_OffsetY = -(e.detail);
    	    }else
    	   if(isListBarCommand('wealList'))
    	   {
    		   weal_OffsetY = -(e.detail);
    	   }else
           if(isListBarCommand('consumeList'))
           {
               consume_OffsetY = -(e.detail);
           }else
           if(isListBarCommand('customFace_list'))
           {
        	   customFace_OffsetY = -(e.detail);
    	   }
    } 
} 
