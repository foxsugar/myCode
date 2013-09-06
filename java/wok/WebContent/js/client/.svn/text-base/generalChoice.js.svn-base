
var generalChoiceDraw = true;
var isSelectGeneral = new Array();
isSelectGeneral[0] = -1;
isSelectGeneral[1] = -1;
isSelectGeneral[2] = -1;
isSelectGeneral[3] = -1;
isSelectGeneral[4] = -1;
var soldierNameValue;
var generalChoice= function(index,layer,groupBottom)
{
	generalChoiceClass.draw.setLayer(layer);
	generalChoiceClass.draw.setGroupBottom(groupBottom);
	var group = expeditionToolClass.draw.getGroupByGroupBottom(generalChoiceClass.draw.groupBottom);
	gbox.setRenderOrder(group);
	isDrawUI[index] = true;
    tempX1 = (gbox.getScreenW() - gbox.getImage("cz_zjm_32").width)/2;
    tempY1= (gbox.getScreenH() - gbox.getImage("cz_zjm_32").height)/2;
    
    gbox.addObject(
			{ 
				id : 'generalChoice',
				group : 'levelMenu_3',
				tileset : 'cz_zjm_32',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [322,151], [1115,151], [1115,617],[322,617]],
				initialize : function()
				{
					if(generalChoiceClass.store.generalList.length <= 0){
						battle.getUserHeroForBattle(generalChoiceClass.store.pageInfo.nowPage,generalChoiceClass.callBack.generalInit);
					}
				},
				first : function() 
				{	
				},
				myclick : function()
				{
				   var pageInfo = generalChoiceClass.store.pageInfo;
				   //确定按钮
                   if(lastTouchMoveX > 895 && lastTouchMoveX < 977 && lastTouchMoveY > 580 && lastTouchMoveY < 614)
                   {
	                   	  //城墙 -- 城防将领 -- 换将功能 
	                   	  if(isChengQiang && changeGeneral.isChangeGeneral){
	                   		//单击武将的索引
	                   		var orderIndex = changeGeneral.orderIndex;
	                   		//健康度计算
	                   		var health = Math.floor((Number(isSelectGeneral[orderIndex].intHp)/
	                   									Number(isSelectGeneral[orderIndex].intCurrentHp))*100);
	                   		//改变城防武将对应位置的武将对象
		                   	isChengQiangGen[orderIndex] = {
		 	                       			  orderId : orderIndex + 1,
		 	                       			  heroId :  isSelectGeneral[orderIndex].id,
		 	                       	   	      heroName : isSelectGeneral[orderIndex].heroName,
		 	                       	   	      soldierName : isSelectGeneral[orderIndex].soldierNameValue,
		 	                       	   	      level : isSelectGeneral[orderIndex].level,
		 	                       	   	      intCurrentHp : isSelectGeneral[orderIndex].intCurrentHp,
		 	                       	   	      intHp : isSelectGeneral[orderIndex].intHp,
		 	                       	   	      commandNum : isSelectGeneral[orderIndex].soldierAmount,
		 	                       	   	      heroStatus : isSelectGeneral[orderIndex].heroStatus,
		 	                       	   	      health :health,
		 	                       	   	      toolTipInfo : isSelectGeneral[orderIndex].toolTipInfo
		 	                };
	                   		//清除选中状态
	                   		for(var i = 0 ; i<11; i++){
		                   	   	  isSelect[i] = false;
		                   	}
	                   		isSelectGeneral.splice(0,isSelectGeneral.length);
	                   		//战斗力计算
							getTotalForce(isChengQiangGen);
	                   		//清除城防标识
	                   		changeGeneral.isChangeGeneral = false;
	                   		isChengQiang = false;
	                   		generalChoiceDraw = false;
	                   		exit(getClickObjectIndex());
	                   		chengQiang(getClickObjectIndex());
				        	generalChoiceClass.draw.changeMap();
	                   	  }
	                   	generalChoiceClass.handlers.confirm();
                   }
                   //返回按钮
                  else if(lastTouchMoveX > 995 && lastTouchMoveX < 1084 && lastTouchMoveY > 580 && lastTouchMoveY < 614)
                   {
                	  generalChoiceClass.handlers.close();
//                   	   generalChoiceDraw = false; 
//                   	   exit(getClickObjectIndex());
//                   	   for(var i = 0 ; i<11; i++)
//                	   {
//                	   	  isSelect[i] = false;
//                	   }
//                   	   //换将 返回按钮
//	                   if(isChengQiang && changeGeneral.isChangeGeneral){
//	                	   changeGeneral.isChangeGeneral = false;
//	                	   isChengQiang = false;
//	                	   isSelectGeneral.splice(0,isSelectGeneral.length);
//	                	   chengQiang(getClickObjectIndex());
//	                   }else{
//	                	   warpthMenu(getClickObjectIndex());
//	                   }
//	                   changeMap('cityMenuLayer');
                	  //清空窗口缓存数据
                	  //关闭当前
                	  //执行回调
                   }else
                   {   //右箭头按钮  下一页
                   	   if(((lastTouchMoveX > 736) && (lastTouchMoveX < 749)) && ((lastTouchMoveY > 554) && (lastTouchMoveY<574)))
                   	   {
                   	   	       if(pageInfo.nowPage < pageInfo.totalPage)
                   	   	    	   pageInfo.nowPage = pageInfo.nowPage + 1;
					   	   	   else
					   	   		   pageInfo.nowPage = pageInfo.totalPage;
                   	   	       
					   	   	   battle.getUserHeroForBattle(pageInfo.nowPage,generalChoiceClass.callBack.generalInit);
                   	   }
                   	   //左箭头按钮 上一页
                   	   if(((lastTouchMoveX > 660) && (lastTouchMoveX < 676)) && ((lastTouchMoveY > 554) && (lastTouchMoveY<574)))
                   	   {
                   	   	       if(pageInfo.nowPage > 1)
                   	   	    	   pageInfo.nowPage = pageInfo.nowPage - 1;
					   	   	   else
					   	   		   pageInfo.nowPage = 1;
                   	   	       
					   	   	   battle.getUserHeroForBattle(pageInfo.nowPage,generalChoiceClass.callBack.generalInit);
                   	   }
                   	   //每一行单击事件
                   	   var genrals = generalChoiceClass.store.generalList;
                   	   for(var a =0; a<pageInfo.pageSize; a++){
		                  	if(typeof(genrals[a]) != "undefined"){
		                  	   if(lastTouchMoveX > 360 && lastTouchMoveX < 1081 && 
		                  			   lastTouchMoveY > (200 + a*31) && lastTouchMoveY < (231 + a*31)){
		                  		   generalChoiceClass.handlers.select(genrals[a]);
			                   }
		                  	}
		                  }
                   	   //刷新自身
                   	   generalChoice(getClickObjectIndex());
                   	   generalChoiceClass.draw.changeMap();
                   }
				},
				blit : function()
				{
					 if(isDrawUI[index] && generalChoiceClass.flag.isOpen)
					 {
						var pageInfo = generalChoiceClass.store.pageInfo;
						gbox.drawImage('cz_zjm_32',tempX1,tempY1);
						//背景外框
					 	gbox.drawImage('cz_zjm_02',tempX1-4,tempY1);
					 	var titleX = tempX1 + (gbox.getImage('cz_zjm_32').width - gbox.getImage('cz_zjm_33').width)/2;
					 	//窗口标题
					 	gbox.drawImage('cz_zjm_33',titleX,130);					 	
					    for(var i = 0; i<pageInfo.pageSize;i++)
					    {
					    	gbox.drawImage('ty_an_01',369,206 + i*31);
					    }
					    
					    gbox.drawImage('ty_an_10',894,581);
			            if(((894 < touchMoveX) && (touchMoveX < 975)) && ((586 < touchMoveY) && (touchMoveY < 611)))
			            {
			               gbox.drawImage('ty_an_09',894,581);
			            }
			            var strW = gbox.getTextWidth("确 定",14);
				        var cntX = 894 + (gbox.getImage("ty_an_09").width - strW)/2;
				        var cntY = 581 + (gbox.getImage("ty_an_09").height - 14)/2;
				        gbox.drawText("确 定", cntX,cntY,10);
					 	gbox.drawImage('ty_an_10',999,581);
			            if(((997 < touchMoveX) && (touchMoveX < 1084)) && ((586 < touchMoveY) && (touchMoveY < 611)))
			            {
			               gbox.drawImage('ty_an_09',999,581);
			            }
			            var strW = gbox.getTextWidth("返 回",14);
				        var cntX = 999 + (gbox.getImage("ty_an_09").width - strW)/2;
				        var cntY = 581 + (gbox.getImage("ty_an_09").height - 14)/2;
				        gbox.drawText("返 回", cntX,cntY,10);
					    var genrals = generalChoiceClass.store.generalList;
                        if(genrals.length > 0)
                        {
                        	var selectedList = generalChoiceClass.store.selectedList;
                        	for(var i = 0 ; i<genrals.length;i ++){
                        		var color = '#000000';
                        		//循环选中集合
                        		for(var a = 0; a<selectedList.length;a++){
                        			if(selectedList[a].status && selectedList[a].id >= 0 && typeof(selectedList[a].id) != "undefined"){
                        				if(selectedList[a].id == genrals[i].id){
                        					color = '#ffff00';
                        					gbox.drawText((a + 1), 345,209 + i*31,4);
                        					gbox.drawImage('ty_an_38',369,205 + i*32);
                        					break;
                        				}
                        			}
                        		}
	                        	var backX = 360 + (128 - gbox.getTextWidth(genrals[i].heroName,11))/2;
							 	var backY = 199 + (31 - 11)/2 +i*32;
							 	gbox.drawText(genrals[i].heroName, backX,backY,5,generalChoiceClass.store.generalList[i].toolTipInfo.quality);
								var fontW = gbox.getTextWidth((genrals[i].intCurrentHp + "/" + genrals[i].intHp),14);
				 		        var dx = 471 + (90 - fontW)/2;
					 	        var dy = 198 + (30 - 14)/2;
							 	gbox.drawText((genrals[i].intCurrentHp + "/" + genrals[i].intHp),dx,dy + i*32,2);
							 	var fontW = gbox.getTextWidth((genrals[i].intCurrentMp + "/" + genrals[i].intMp),14);
				 		        var dx = 561 + (85 - fontW)/2;
					 	        var dy = 198 + (30 - 14)/2;
							 	gbox.drawText((genrals[i].intCurrentMp + "/" + genrals[i].intMp),dx,dy + i*32,2);
							 	var fontW = gbox.getTextWidth(genrals[i].level,14);
							 	var dx = 649 + (60 - fontW)/2;
					 	        var dy = 198 + (30 - 14)/2;
					 	        gbox.drawText(genrals[i].level,dx,dy + i*32,2);
							 	var fontW = gbox.getTextWidth(genrals[i].soldierNameValue,14);
							 	var dx = 711 + (89 - fontW)/2;
					 	        var dy = 198 + (30 - 14)/2;
							 	gbox.drawText(genrals[i].soldierNameValue,dx,dy + i*32,2);
							 	var fontW = gbox.getTextWidth(genrals[i].soldierAmount,14);
							 	var dx = 803 + (104 - fontW)/2;
					 	        var dy = 198 + (30 - 14)/2;
					 	        gbox.drawText(genrals[i].soldierAmount,dx,dy + i*32,2);
					 	        var fontW = gbox.getTextWidth(genrals[i].smrname,14);
							 	var dx = 910 + (103 - fontW)/2;
					 	        var dy = 198 + (30 - 14)/2;
					 	        gbox.drawText(genrals[i].smrname,dx,dy + i*32,2);
					 	       
							 	
							 	var stext = "空闲";
							 	switch (genrals[i].heroStatus) {
									case 0:
										stext = "空闲";
										break;
									case 1:
										stext = "出征";
										break;
									case 2:
										stext = "修炼";
										break;
								}
							 	var fontW = gbox.getTextWidth(stext,14);
							 	var dx = 1015 + (66 - fontW)/2;
					 	        var dy = 198 + (30 - 14)/2;
					 	        gbox.drawText(stext,dx,dy + i*32,2);
                        	}
                        	var fontW = gbox.getTextWidth((pageInfo.nowPage + "/" + pageInfo.totalPage),14);
							var dx = 679 + (54 - fontW)/2;
					 	    var dy = 555 + (20 - 14)/2;
					 	    gbox.drawText((pageInfo.nowPage + "/" + pageInfo.totalPage),dx,dy,5);
                        	                     		                     
							gbox.drawImage('ty_an_25',665,556);
                            gbox.drawImage('ty_an_24',738,556);
                        }
					 }
				}
		 });
};


//武将选择类
var generalChoiceClass = {};
//武将选择数据
generalChoiceClass.store = {};
//武将选择事件
generalChoiceClass.handlers = {};
//武将选择回调
generalChoiceClass.callBack = {};
//武将选择标识
generalChoiceClass.flag = {
	isOpen : false
};
//数据部分 start
//武将集合
generalChoiceClass.store.generalList = [];
//多选上限
generalChoiceClass.store.selectAmount = 5;
//选中对象集合 {id,obj,status,variable}
generalChoiceClass.store.selectedList = [];
//数据翻页信息
generalChoiceClass.store.pageInfo = {
		nowPage:1,
		totalPage:1,
		pageSize:11
};
//数据部分 end
//回调部分 start
	//回调参数验证
generalChoiceClass.callBack.isDataError = function(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return true;
	}else{
		return false;
	}
};
	//窗口请求回调，用于初始化武将数据、分页数据
generalChoiceClass.callBack.generalInit = function(data){
	var store = generalChoiceClass.store;
	//验证返回参数
	if(generalChoiceClass.callBack.isDataError(data))
		return;
	//清空武将集合
	store.generalList.splice(0,store.generalList.length);
	//赋值分页信息
	store.pageInfo.nowPage = data.page;
	store.pageInfo.totalPage = data.pages;
	//赋值武将数据
	generalChoiceClass.handlers.setHeroList(data.userHeros);
};
//回调部分 end


//事件部分 start

//窗口确定回调
generalChoiceClass.handlers.confirmCallBack = function(list){};

//窗口关闭回调
generalChoiceClass.handlers.closeCallBack = function(){};

//关闭窗口
generalChoiceClass.handlers.close = function(){
	generalChoiceClass.flag.isOpen = false;
	generalChoiceClass.handlers.clearCache();
	exit(getClickObjectIndex());
	generalChoiceClass.handlers.closeCallBack();
};

//确定事件
generalChoiceClass.handlers.confirm = function(){
	generalChoiceClass.handlers.confirmCallBack(generalChoiceClass.store.selectedList);
	generalChoiceClass.handlers.close();
};

//初始化窗口缓存数据
generalChoiceClass.handlers.initCache = function(selectAmount,idList){
	//窗口打开标识
	generalChoiceClass.flag.isOpen = true;
	//设置多选上限
	generalChoiceClass.handlers.setSelectAmount(selectAmount);
	//赋值选中集合
	generalChoiceClass.handlers.setSelectListByIdList(idList);
};
//清空窗口缓存数据
generalChoiceClass.handlers.clearCache = function(){
	var store = generalChoiceClass.store;
	store.generalList = [];
	generalChoiceClass.handlers.setSelectAmount(0);
};
//循环选中集合  循环方法返回true则终止循环
generalChoiceClass.handlers.loopSelectedList = function(fn){
	var sl = generalChoiceClass.store.selectedList;
	for(var i=0; i<sl.length; i++){
		if(fn(sl[i],i))
			break;
	}
};
//单击行
generalChoiceClass.handlers.select = function(selectedObj){
//	console.log('单击行：'+ selectedObj.heroName);
	//只可选中状态为空闲和当前体力值大于20的武将
	var hp = Number(selectedObj.toolTipInfo.stamina);
	if(selectedObj.heroStatus == 0 && hp >= 20){
		var sl = generalChoiceClass.store.selectedList;
		var id = selectedObj.id;
		var isVariable = false;
		var isSelected = false;
		var isIn = false;
		var inIndex = -1;
		var select = function(o,index){
			var re = false;
			if(o.id == id){
				isVariable = o.variable;
				isSelected = o.status;
				inIndex = index;
				isIn = true;
				re = true;
			}
			return re;
		};
		generalChoiceClass.handlers.loopSelectedList(select);
		//选中集合中存在该行
		if(isIn){
			//该行可选
			if(isVariable){
				//该行为选中状态
				if(isSelected){
					//设置该行为不选中
					sl[inIndex].id = -1;
					sl[inIndex].status = false;
					sl[inIndex].obj = false;
				}//该行为未选中状态
				else{
					sl[inIndex].id = id;
					sl[inIndex].status = true;
					sl[inIndex].obj = selectedObj;
				}
			}
		}else{
			//设置选中集合中第一个为空的位置为该行武将id，并选中
			var selectIt = function(o,index){
				var re = false;
				if(o.id<0 && o.variable){
					re = true;
					o.id = id;
					o.obj = selectedObj;
					o.status = true;
				}
				return re;
			};
			generalChoiceClass.handlers.loopSelectedList(selectIt);
		}
	}
};
//设定选中集合长度
generalChoiceClass.handlers.setSelectAmount = function(am){
	var store = generalChoiceClass.store;
	var temp = 0;
	//设定多选上限值
	store.selectAmount = am;
	//制定数值大于选中集合长度
	if(store.selectedList.length > am){
		temp = store.selectedList.length - am;
		//从最后末尾删除多出部分
		store.selectedList.splice(am,temp);
	}else{
		temp = am - store.selectedList.length;
		//补满选中数组
		for(var i=0; i<temp; i++){
			store.selectedList.push({
				id : -1,
				obj : false,
				status : false,
				variable : true
			});
		}
	}
};
//设定指定选中位可选属性
//idList 武将Id集合
generalChoiceClass.handlers.setSelectListByIdList = function(idList){
	var store = generalChoiceClass.store;
	for(var i=0; i<store.selectedList.length; i++){
		if(idList[i]){
			store.selectedList[i].id = idList[i];
			store.selectedList[i].status = true;
		}
	}
};
//设定指定选中位可选属性
	//indexList 选中位索引，若值小于0，则为给选中集合所有对象改变属性[必填]
	//isVariable 选中位是否可选属性[必填]
	//isInvertOther 其它位置是否设置相反可选属性,indexList 小于0时该参数无意义 [可选]
generalChoiceClass.handlers.setSelectOptionVariable = function(indexList,isVariable,isInvertOther){
	var store = generalChoiceClass.store;
	for(var i=0; i<store.selectedList.length; i++){
		var isIn = false;
		if(indexList < 0){
			store.selectedList[i].variable = isVariable;
		}else{
			for(var j=0; j<indexList.length; j++){
				if(i == indexList[j]){
					store.selectedList[i].variable = isVariable;
					isIn = true;
					break;
				}
			}
			if(!isIn && isInvertOther){
				store.selectedList[i].variable = !isVariable;
			}
		}
	}
};
//赋值武将数据
generalChoiceClass.handlers.setHeroList = function(data){
	var store = generalChoiceClass.store;
	for(var i =0; i<data.length; i++){
		var temp = data[i];
		var smrname;
		if(temp.rankName == null){			
			smrname = "无";
		}else{
			smrname = temp.rankName;//官阶
		}
		if(temp.soldierName == null){			
			soldierNameValue = "无";
		}else{
			soldierNameValue = temp.soldierName;//统兵名称
		}
		store.generalList[i] = {
			id : temp.id,//id
			heroStatus : temp.heroStatus,//英雄状态
			intCurrentMp : temp.mp,//当前精力
			intMp : temp.mpMax,//最大精力
			soldierAmount : temp.soldierAmount,//带兵数
			singleForce : temp.singleForce,//单挑力
			heroIcon : temp.heroIcon,
			heroName : temp.toolTipInfo.heroName,
			intCurrentHp : temp.toolTipInfo.mp,
			intHp : temp.toolTipInfo.mpMax,
			command : temp.toolTipInfo.command,
			level : temp.toolTipInfo.level,
			smrname : smrname,
			soldierNameValue : soldierNameValue,
            toolTipInfo:{
					agility : temp.toolTipInfo.agility,
					command : temp.toolTipInfo.command,
					heroForce : temp.toolTipInfo.heroForce,
					heroName : temp.toolTipInfo.heroName,
					heroType : temp.toolTipInfo.heroType,
					level : temp.toolTipInfo.level,
					mp : temp.toolTipInfo.mp,
					mpMax : temp.toolTipInfo.mpMax,
					physique : temp.toolTipInfo.physique,
					quality : temp.toolTipInfo.quality,
					stamina : temp.toolTipInfo.stamina,
					staminaMax : temp.toolTipInfo.staminaMax,
					strategy : temp.toolTipInfo.strategy,	
				}
		};
		//循环选中数组,若存在id相同项，赋值
		var setObj = function(o,index){
			var re = false;
			if(o.id == store.generalList[i].id){
				re = true;
				o.obj = store.generalList[i];
			}
			return re;
		};
		generalChoiceClass.handlers.loopSelectedList(setObj);
	}
};
//事件部分 end
//绘制部分 start
generalChoiceClass.draw = {};
generalChoiceClass.draw.index = 0;
generalChoiceClass.draw.groupBottom = 'cityMenu';
generalChoiceClass.draw.layer = 'cityMenuLayer';
//changeMap封装
generalChoiceClass.draw.changeMap = function(){
	changeMap(generalChoiceClass.draw.layer);
};
//窗体底层参数设置
generalChoiceClass.draw.setGroupBottom = function(groupBottom){
	if(groupBottom)
		generalChoiceClass.draw.groupBottom = groupBottom;
};
//窗体layer设置
generalChoiceClass.draw.setLayer = function(layer){
	if(layer)
		generalChoiceClass.draw.layer = layer;
};
