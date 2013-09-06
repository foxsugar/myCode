/**
 * 城郊战斗情况显示类
 */
var EnvironsScreenBattleClass = {};

EnvironsScreenBattleClass.store = {};
EnvironsScreenBattleClass.callBack = {};
EnvironsScreenBattleClass.handlers = {};
EnvironsScreenBattleClass.draw = {};
EnvironsScreenBattleClass.flag = {
	domesticAffairs : false,
	waitingListIsOpen : false,
	clickMenuIsOpen : false,
	promptIsOpen : false,
	armyInformationIsOpen : false,
	environsList : false
};
//部队坐标位置
EnvironsScreenBattleClass.store.position = false;
//城郊城主id
EnvironsScreenBattleClass.store.characterId = false;

//选中部队
EnvironsScreenBattleClass.store.selectedArmy = false;

//支援部队
EnvironsScreenBattleClass.store.assistArmy = {
	drawObj : false
};

//敌方部队
EnvironsScreenBattleClass.store.enemyArmy = {
	drawObj : false
};

//本方防守部队
EnvironsScreenBattleClass.store.defenseArmy = {
	drawObj : false
};
//部队动画
EnvironsScreenBattleClass.store.drawAnim = {
		assist : [],
		defense : false,
		enemy : []
};

//重置缓存
EnvironsScreenBattleClass.handlers.resetCache = function(){
	//计算部队位置
	EnvironsScreenBattleClass.draw.setPosition(worldMapStartX,worldMapStartY);
	comboboxes = {};
	EnvironsScreenBattleClass.store.statusImageList = {};
	EnvironsScreenBattleClass.store.characterId = false;
	EnvironsScreenBattleClass.store.selectedArmy = false;
};

//回调数据提示判断
EnvironsScreenBattleClass.callBack.isDataError = function(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return true;
	}else{
		return false;
	}
};

//打开等待列表回调
EnvironsScreenBattleClass.callBack.openWaitingListBack = function(data,index){
	if(EnvironsScreenBattleClass.callBack.isDataError(data))
		return;
	EnvironsScreenBattleClass.draw.waitingList(index,data);
	changeMap('environsScreen_Layer'); 
};

//进攻回调
EnvironsScreenBattleClass.callBack.goAttackBack = function(data){
	if(EnvironsScreenBattleClass.callBack.isDataError(data))
		return;
	console.log('开始攻击回调');
	console.log(data);
//	displayDestroy();
//    exit(superstratumIndex);
//    curGroup = 'cityMenu';
//    loadingImageList['BattleCrusade'].load(
//	getClickObjectIndex(),
//	function(){
//		Battle_UniversalLoadImage();										
//		Battle_CrusadeLoadImage();
//	},
//	function(){
//		multiBattle.battleJobQueueId = junqingInfo[junqingID].battleJobQueueId;
//	    multiBattle.getMultiBattleInfo(battlefield.model.doGetMultiBattleInfo);
//	},
//    true
//    );
};

//撤退回调
EnvironsScreenBattleClass.callBack.withdrawBack = function(data){
	if(EnvironsScreenBattleClass.callBack.isDataError(data))
		return;
	if(data.ishere){
		//刷新目标城主城郊
		EnvironsScreenBattleClass.handlers.goIntoEnvironsScreenBattle(EnvironsScreenBattleClass.store.characterId);
		//打开提示框
		var message = '撤退成功！';
		EnvironsScreenBattleClass.handlers.openPrompt(getClickObjectIndex(),message,
				function(){},function(){}
				);
	}else{
	//返回内城
	cityChangeView[0] = true;
    cityChangeView[1] = false;
    cityChangeView[2] = false;
    displayDestroy();
	exit(getClickObjectIndex());
	enterCityMenu('cityMenu');
	changeMap('cityMenuLayer');	
	com_layer = 'cityMenuLayer';
	com_group = group_src = 'cityMenu';
	//打开提示框
	var message = '撤退成功！返回主城';
	var fn = function(){};
	var index = getClickObjectIndex();
	EnvironsScreenBattleClass.draw.prompt(
			index,message,fn,fn,
			function(index){
				displayDestroy();
				exit(index);
				enterCityMenu('cityMenu');
				changeMap('cityMenuLayer');
			},
			'cityMenu'
			);
	changeMap('cityMenuLayer');
	}
};

//打开部队详情回调
EnvironsScreenBattleClass.callBack.openArmyInformationBack = function(data,index,id){
	if(EnvironsScreenBattleClass.callBack.isDataError(data))
		return;
	EnvironsScreenBattleClass.handlers.openArmyInformation(index, id,data);
};

//打开部队详情侦察回调
EnvironsScreenBattleClass.callBack.refreshArmyInformationBack = function(data,id){
	if(EnvironsScreenBattleClass.callBack.isDataError(data))
		return;
	return data;
};

//打开城郊(部队数据初始化) 回调函数
EnvironsScreenBattleClass.callBack.openEnvironsScreenBattleBack = function(data){
	if(EnvironsScreenBattleClass.callBack.isDataError(data))
		return;
	var store = EnvironsScreenBattleClass.store;
	
	store.enemyArmy.drawObj = data.attack;
	store.defenseArmy.drawObj = data.character;
	store.assistArmy.drawObj = data.defence;
	EnvironsScreenBattleClass.handlers.initArmy();
};

//初始化部队数据，创建部队动画对象，默认选中第一个己方部队
EnvironsScreenBattleClass.handlers.initArmy = function(){
	var store = EnvironsScreenBattleClass.store;
	store.drawAnim.assist = [];
	store.drawAnim.defense = false;
	store.drawAnim.enemy = [];
	
	var getAnimName = function(flag){
		var str = '';
		if(flag)
			str = 'mine';
		else
			str = 'enemy';
		return str;
	};
	var creatAnimObj = function(id,anim,x,y,image){
		return {
			id:id,
			anim:anim,
			x:x,
			y:y,
			polyImage:image
		};
	};
	var position = EnvironsScreenBattleClass.store.position;
	if(!store.selectedArmy){
		EnvironsScreenBattleClass.handlers.armyLoop(
			function(i){//支援方
				var p = position.assist[i];
				var anim = 'army_top_' + getAnimName(store.assistArmy.drawObj[i].isAlliance);
				var assistAnim = EnvironsScreenBattleClass.handlers.addAnimation(anim,p[0],p[1]);
				assistAnim.start();
				store.drawAnim.assist.push(creatAnimObj(store.assistArmy.drawObj[i].id,assistAnim,p[0],p[1],anim+'_focus'));
				if(store.assistArmy.drawObj[i].characterName == charName){
					if(!store.selectedArmy && !store.assistArmy.drawObj[i].battleField){
						store.selectedArmy = store.assistArmy.drawObj[i];
						EnvironsScreenBattleClass.handlers.changeAnimation(assistAnim,"selected");
					}
				}
			},
			function(){//城主
				var p = position.defense;
				var anim = 'army_top_' + getAnimName(store.defenseArmy.drawObj.isAlliance);
				var defenseAnim = EnvironsScreenBattleClass.handlers.addAnimation(anim,p[0],p[1]);
				defenseAnim.start();
				store.drawAnim.defense = creatAnimObj(store.defenseArmy.drawObj.id,defenseAnim,p[0],p[1],anim+'_focus');
				if(store.defenseArmy.drawObj.characterName == charName){
					if(!store.selectedArmy && !store.defenseArmy.drawObj.battleField){
						store.selectedArmy = store.defenseArmy.drawObj;
						EnvironsScreenBattleClass.handlers.changeAnimation(defenseAnim,"selected");
					}
				}
			},
			function(i){//进攻方
				var p = position.enemy[i];
				var anim = 'army_bottom_' + getAnimName(store.enemyArmy.drawObj[i].isAlliance);
				var enemyAnim = EnvironsScreenBattleClass.handlers.addAnimation(anim,p[0],p[1]);
				enemyAnim.start();
				store.drawAnim.enemy.push(creatAnimObj(store.enemyArmy.drawObj[i].id,enemyAnim,p[0],p[1],anim+'_focus'));
				if(store.enemyArmy.drawObj[i].characterName == charName){
					if(!store.selectedArmy && !store.enemyArmy.drawObj[i].battleField){
						store.selectedArmy = store.enemyArmy.drawObj[i];
						EnvironsScreenBattleClass.handlers.changeAnimation(enemyAnim,"selected");
					}
				}
				EnvironsScreenBattleClass.handlers.setStatusIamgeList(store.enemyArmy.drawObj[i]);
			}
		);
	}
};

//进入城郊战区
EnvironsScreenBattleClass.handlers.goIntoEnvironsScreenBattle = function(characterId){
	EnvironsScreenBattleClass.handlers.resetCache();
	suburb.openSuburbUi(function(data){doGetUserFieldInfo(data,characterId);});
};

//打开城郊(部队数据初始化)
EnvironsScreenBattleClass.handlers.openEnvironsScreenBattle = function(characterId){
	if(charId == characterId)
		EnvironsScreenBattleClass.flag.domesticAffairs = true;
	else
		EnvironsScreenBattleClass.flag.domesticAffairs = false;
	
	EnvironsScreenBattleClass.store.characterId = characterId;
	
	comboboxes = {};
    var comboboxFormations = new Combobox();
    comboboxes['battleArmy'] = comboboxFormations;
	
	User.initSuburbBattle(characterId,EnvironsScreenBattleClass.callBack.openEnvironsScreenBattleBack);
};

//打开等待列表
EnvironsScreenBattleClass.handlers.openWaitingList = function(x,y,index){
	var iW = 1100;
	var iY = 20 +  document.body.scrollTop;
	if(((iW < x) && (x < iW+156)) && ((iY < y) && (y < iY+32))){
		battle.getWaitBattleInfo(EnvironsScreenBattleClass.store.characterId,
				function(data){
			EnvironsScreenBattleClass.callBack.openWaitingListBack(data, index);
			
		});
	}
};

//获取绘制位置
EnvironsScreenBattleClass.draw.setPosition = function(mX,mY){
	var position = {
		assist:[],//支援
		defense:[],//城主
		enemy:[],//敌军
		assistPoly:[],//支援
		defensePoly:[],//本部
		enemyPoly:[]//敌军
	};
	var x = 400 - mX;
	var y = 235 - mY;
	var w = 140;
	var h = 70;
	
	//索引顺序为部队进入顺序  绘制用
	position.assist.push([x+w*2,y+h*4]);//支援方
	position.assist.push([x,y+h*2]);
	position.assist.push([x+w*3.5,y+h*3.5]);
	position.assist.push([x,y]);
	
	position.defense = [x+w,y+h*3];//城主
	
	position.enemy.push([x,y+h*6]);//进攻方
	position.enemy.push([x-w*1,y+h*5]);
	position.enemy.push([x+w*1,y+h*7]);
	position.enemy.push([x-w*1.5,y+h*6.5]);
	position.enemy.push([x-w*0.5,y+h*7.5]);
	
	//触发位置索引
	var hdl = EnvironsScreenBattleClass.handlers;
	position.assistPoly.push(hdl.getPoly(x+w*2,y+h*4,w,h));
	position.assistPoly.push(hdl.getPoly(x,y+h*2,w,h));
	position.assistPoly.push(hdl.getPoly(x+w*3.5,y+h*3.5,w,h));
	position.assistPoly.push(hdl.getPoly(x,y,w,h));
	position.defensePoly = hdl.getPoly(x+w,y+h*3,w,h);
	position.enemyPoly.push(hdl.getPoly(x,y+h*6,w,h));
	position.enemyPoly.push(hdl.getPoly(x-w*1,y+h*5,w,h));
	position.enemyPoly.push(hdl.getPoly(x+w*1,y+h*7,w,h));
	position.enemyPoly.push(hdl.getPoly(x-w*1.5,y+h*6.5,w,h));
	position.enemyPoly.push(hdl.getPoly(x-w*0.5,y+h*7.5,w,h));
	
	EnvironsScreenBattleClass.store.position = position;
};

//关闭当前窗体
EnvironsScreenBattleClass.handlers.closeWindow = function(index){
	displayDestroy();
	exit(index);
	EnvironsScreen();
    changeMap('environsScreen_Layer');
};

//部队对象循环
EnvironsScreenBattleClass.handlers.armyLoop = function(assistEvent,defenseEvent,enemyEvent){
	var store = EnvironsScreenBattleClass.store;
	//友军
	for(var i=0; i<store.assistArmy.drawObj.length; i++){
		assistEvent(i);
	}
	//城主
	if(store.defenseArmy && store.defenseArmy.drawObj){
		defenseEvent();
	}
	//敌军
	for(var i=0; i<store.enemyArmy.drawObj.length; i++){
		enemyEvent(i);
	}
};

//部队区域执行事件
EnvironsScreenBattleClass.handlers.armyEvent = function(x,y,assistEvent,defenseEvent,enemyEvent){
	var store = EnvironsScreenBattleClass.store;
	var position = EnvironsScreenBattleClass.store.position;
	EnvironsScreenBattleClass.handlers.armyLoop(
		function(index){//友军
			var poly = position.assistPoly[index];
			var p = position.assist[index];
			var obj = store.assistArmy.drawObj[index];
			if(gbox._mouseArea(poly,x,y)){
				assistEvent(index,poly,p,obj);
			}
		},
		function(){//城主
			var poly = position.defensePoly;
			var p = position.defense;
			var obj = store.defenseArmy.drawObj;
			if(gbox._mouseArea(poly,x,y)){
				defenseEvent(poly,p,obj);
			}
		},
		function(index){//敌军
			var poly = position.enemyPoly[index];
			var p = position.enemy[index];
			var obj = store.enemyArmy.drawObj[index];
			if(gbox._mouseArea(poly,x,y)){
				enemyEvent(index,poly,p,obj);
			}
		}
	);
};

//打开部队点击菜单
EnvironsScreenBattleClass.handlers.openClickMenu = function(x,y,index){
	var store = EnvironsScreenBattleClass.store;
	EnvironsScreenBattleClass.handlers.armyEvent(
		x,y,
		function(i){
			EnvironsScreenBattleClass.handlers.openClickCombobox(store.assistArmy.drawObj[i],x,y,index);
		},
		function(){
			EnvironsScreenBattleClass.handlers.openClickCombobox(store.defenseArmy.drawObj,x,y,index);
		},
		function(i){
			EnvironsScreenBattleClass.handlers.openClickCombobox(store.enemyArmy.drawObj[i],x,y,index);
		}
	);
};

//根据id获取动画对象
EnvironsScreenBattleClass.handlers.getAnimById = function(id){
	var da = EnvironsScreenBattleClass.store.drawAnim;
	var cleanAndCheckId = function(da){
		var ranim = null;
		EnvironsScreenBattleClass.handlers.changeAnimation(da.anim,'wait');
		if(da.id == id){
			ranim = da.anim;
		}
		return ranim;
	};
	var re = null;
	EnvironsScreenBattleClass.handlers.armyLoop(
		function(index){
			var an = cleanAndCheckId(da.assist[index]);
			if(an)
				re = an;
		},
		function(){
			var an = cleanAndCheckId(da.defense);
			if(an)
				re = an;
		},
		function(index){
			var an = cleanAndCheckId(da.enemy[index]);
			if(an)
				re = an;
		}
	);
	return re;
};

//展开单击菜单(下拉框)
EnvironsScreenBattleClass.handlers.openClickCombobox = function(obj,x,y,index){
	if((!EnvironsScreenBattleClass.store.selectedArmy && obj.characterName == charName && !obj.battleField) || 
		(EnvironsScreenBattleClass.store.selectedArmy.id!=obj.id && obj.characterName == charName && !obj.battleField)){
			EnvironsScreenBattleClass.store.selectedArmy = obj;
			EnvironsScreenBattleClass.handlers.changeAnimation(EnvironsScreenBattleClass.handlers.getAnimById(obj.id),"selected");
	}else{
		var list = [];
		for(var i=0; i<obj.limit.length; i++){
			switch (obj.limit[i]) {
				case 1://查看
					list.push({id:1,txt:'查看',armyId:obj.id});
					break;
				case 2://攻击
					list.push({id:2,txt:'攻击',armyId:obj.id});
					break;
				case 3://撤退
					list.push({id:3,txt:'撤退',armyId:obj.id});
					break;
			}
		}
    	comboboxes['battleArmy'].setData(list,'id','txt',true);
		//下拉框选中方法
		var selected = function(){
	    	switch (comboboxes['battleArmy'].selected.id) {
			case 1://查看
				EnvironsScreenBattleClass.handlers.goLookUp(comboboxes['battleArmy'].selected.obj.armyId);
				break;
			case 2://攻击
				EnvironsScreenBattleClass.handlers.goAttack(comboboxes['battleArmy'].selected.obj.armyId);
				break;
			case 3://撤退
				EnvironsScreenBattleClass.handlers.goWithdraw(comboboxes['battleArmy'].selected.obj.armyId);
				break;
	    	}
	    	EnvironsScreen();
		    changeMap('environsScreen_Layer');
		};
		//绘制下拉框
		comboboxes['battleArmy'].info(
				index,
				'battleArmy_combobox',
				'levelMenu_3',
				'environsScreen_Layer',
				['environsScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5'],
				x,y,
				{widthType:1,isScrolling:false}
		);
		comboboxes['battleArmy'].font_size = 13;//设置字体
		comboboxes['battleArmy'].isShowSelected = false;//设置不显示选中状态
		comboboxes['battleArmy'].textCenter = true;//设置文字居中
		comboboxes['battleArmy'].createCombobox(selected);
		EnvironsScreen();
	    changeMap('environsScreen_Layer');
	}
		
};

//攻击按钮
EnvironsScreenBattleClass.handlers.goAttack = function(id){
//	battle.beginBattleAttack(EnvironsScreenBattleClass.store.selectedArmy.id,id,EnvironsScreenBattleClass.callBack.goAttackBack);
	loadingImageList['BattleCrusade'].load(
			getClickObjectIndex(),
			function(){
				Battle_UniversalLoadImage();										
				Battle_CrusadeLoadImage();
    		},
    		function(){
				battle.beginBattleAttack(EnvironsScreenBattleClass.store.selectedArmy.id,id,battlefield.model.doGetMultiBattleInfo);
    		},
            true
	        );
};

//查看按钮
EnvironsScreenBattleClass.handlers.goLookUp = function(id){
	var index = getClickObjectIndex();
	battle.getBattleHeros(id,0,function(data){
		EnvironsScreenBattleClass.callBack.openArmyInformationBack(data, index, id);
	});
};

//撤退按钮
EnvironsScreenBattleClass.handlers.goWithdraw = function(id){
	//展开确认窗口
	var message = '执行撤退后将放弃战斗后撤离战场，是否确认撤退？';
	EnvironsScreenBattleClass.handlers.openPrompt(getClickObjectIndex(),message,
			function(){
				EnvironsScreenBattleClass.handlers.withdraw(id);
			},function(){}
			);
};

//打开部队详情
EnvironsScreenBattleClass.handlers.openArmyInformation = function(index,id,data){
	EnvironsScreenBattleClass.draw.armyInformation(index,id,data);
	changeMap('environsScreen_Layer');
};

//撤退命令
EnvironsScreenBattleClass.handlers.withdraw = function(id){
	console.log('撤退');
	battle.retreatBattleQueue(id,EnvironsScreenBattleClass.callBack.withdrawBack);
};

//打开提示窗口
EnvironsScreenBattleClass.handlers.openPrompt = function(index,message,confirmFn,cancelFn){
	EnvironsScreenBattleClass.draw.prompt(
			index,message,confirmFn,cancelFn,function(index){
				EnvironsScreenBattleClass.handlers.closeWindow(index);
			},'environsScreen'
			);
	changeMap('environsScreen_Layer');
};

//计算触发区域四点位置
EnvironsScreenBattleClass.handlers.getPoly = function(x,y,w,h){
	var poly = [];
	poly.push([x+w*0,y-h*.5]);//上
	poly.push([x+w*.5+8,y+h*0]);//右
	poly.push([x+w*0,y+h*.5]);//下
	poly.push([x-w*.5,y+h*0]);//左
	return poly;
};

//添加动画对象
EnvironsScreenBattleClass.handlers.addAnimation = function(name,x,y){
	var anim = name instanceof Animation ?name : battlefield.animationFactory.create(name);
	if(!anim){
		console.log("没有加载动画："+anim);
		return;
	}
	var offsetX = anim.offsetX || 0;
	var offsetY = anim.offsetY || 0;
	anim.ox = x + offsetX;
	anim.oy = y + offsetY;
	anim.x = anim.ox;
	anim.y = anim.oy;
	anim.loop = true;
	anim.flip = false;
	return anim;
};
//更改动画
EnvironsScreenBattleClass.handlers.changeAnimation = function(anim,name){
		anim.changeAction(name,true);
};

//更改动画坐标
EnvironsScreenBattleClass.handlers.changeAnimationXY = function(anim,x,y){
		anim.x = Math.floor(x + anim.offsetX);
		anim.y = Math.floor(y + anim.offsetY);
};

//等待列表按钮
EnvironsScreenBattleClass.draw.waitingListButton = function(x,y){
	//按钮背景
	var iW = 1100;
	var iY = 20 +  document.body.scrollTop;
	var tW = (gbox.getImage('zd_ct_04').width - gbox.getImage('zd_ct_07').width)/2;
	var tY = (gbox.getImage('zd_ct_04').height - gbox.getImage('zd_ct_07').height)/2;
	gbox.drawImage('zd_ct_04',iW,iY);
	//鼠标经过
	if(((iW < x) && (x < iW+156)) && ((iY < y) && (y < iY+32))){
		gbox.drawImage('zd_ct_05',iW,iY);
	}
	gbox.drawImage('zd_ct_07',iW+tW,iY+tY);
	//鼠标点击
	if(EnvironsScreenBattleClass.flag.waitingListIsOpen){
		gbox.drawImage('zd_ct_06',iW,iY);
		gbox.drawImage('zd_ct_08',iW+tW,iY+tY);
	}
};

//部队信息
EnvironsScreenBattleClass.draw.armyInformation = function(index,id,data){
	gbox.setRenderOrder(['environsScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	var draw = EnvironsScreenBattleClass.draw;
	var bgimage = gbox.getImage('jq_zjm_29');
	var x = (gbox.getScreenW() - bgimage.width)/2;
	var y = (gbox.getScreenH() - bgimage.height)/2;
	EnvironsScreenBattleClass.flag.armyInformationIsOpen = true;
	gbox.addObject(
			{ 
				id : 'armyInformation_1',
				group : 'levelMenu_3',
				tileset : 'jq_zjm_29',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [x,y], [x + bgimage.width,y], [x + bgimage.width,y + bgimage.height],[x,y + bgimage.height]],
				initialize : function(){},
				first : function(){},
				myclick : function()
				{
					//侦察
					if(((draw.getMoveX(766) < lastTouchMoveX) && (lastTouchMoveX < draw.getMoveX(766) + 50)) && 
						    ((draw.getMoveY(461) < lastTouchMoveY) && (lastTouchMoveY < draw.getMoveY(461) + 26))){
						if(data.status != 0){
							var message = '执行侦察将消费“侦察令”1个，确定要执行吗？';
							EnvironsScreenBattleClass.handlers.openPrompt(getClickObjectIndex(),message,
									function(){
										//执行侦察操作
										battle.getBattleHeros(id,1,function(data){
											EnvironsScreenBattleClass.handlers.openArmyInformation(getClickObjectIndex(),id,data);
										});
									},function(){}
							);
						}
					}else
					//取消
					if(((draw.getMoveX(823) < lastTouchMoveX) && (lastTouchMoveX < draw.getMoveX(823) + 50)) && 
						    ((draw.getMoveY(461) < lastTouchMoveY) && (lastTouchMoveY < draw.getMoveY(461) + 26))){
						EnvironsScreenBattleClass.handlers.closeWindow(index);
					}else{
						EnvironsScreenBattleClass.handlers.openArmyInformation(index,id,data);
					}
					
				},
				blit : function()
				{
					if(isDrawUI[index] && EnvironsScreenBattleClass.flag.armyInformationIsOpen){
						var fcolor = '#000000';
						var fontSize = 13;
						//背景
						gbox.drawImage('jq_zjm_29',draw.getMoveX(x),draw.getMoveY(y));
						//君主
						gbox.drawString(data.characterName,draw.getMoveX(609),draw.getMoveY(275),fcolor,fontSize);
						//阵型
						var formationNameStr = data.formationName;
						if(data.status != 0)
							formationNameStr = "???";
						gbox.drawString(formationNameStr,draw.getMoveX(782),draw.getMoveY(275),fcolor,fontSize);
						//绘制部队信息
						EnvironsScreenBattleClass.draw.heroListInformation(data,draw.getMoveX(561),draw.getMoveY(319),25);
						//侦察按钮
						if(data.status != 0){
							gbox.drawImage('ty_an_08',draw.getMoveX(766),draw.getMoveY(461));
							if(((draw.getMoveX(766) < touchMoveX) && (touchMoveX < draw.getMoveX(766) + 50)) && 
							    ((draw.getMoveY(461) < touchMoveY) && (touchMoveY < draw.getMoveY(461) + 26))){
								gbox.drawImage('ty_an_06',draw.getMoveX(766),draw.getMoveY(461));
							}
						}else{
							gbox.drawImage('ty_an_05',draw.getMoveX(766),draw.getMoveY(461));
						}
						gbox.drawString("侦察",draw.getMoveX(776),draw.getMoveY(467),'#FFFFFF',13);
						
						//取消按钮
						gbox.drawImage('ty_an_08',draw.getMoveX(823),draw.getMoveY(461));
						if(((draw.getMoveX(823) < touchMoveX) && (touchMoveX < draw.getMoveX(823) + 50)) && 
							    ((draw.getMoveY(461) < touchMoveY) && (touchMoveY < draw.getMoveY(461) + 26))){
								gbox.drawImage('ty_an_06',draw.getMoveX(823),draw.getMoveY(461));
						}
						gbox.drawString("取消",draw.getMoveX(833),draw.getMoveY(467),'#FFFFFF',13);
					}
				}		
			 });
};

//根据集合绘制武将信息
EnvironsScreenBattleClass.draw.heroListInformation = function(data,x,y,h){
	var list = data.heroList;
	var draw = EnvironsScreenBattleClass.draw;
	var fcolor = '#000000';
	var fontSize = 13;
	var len = list.length;
	if(data.status != 0)
		len = 5;
	for(var i=0; i<len; i++){
		var yh = y + h*i;
		//武将姓名
		var name = '';
		list[i] ? name = list[i].heroName : name = '???';
		gbox.drawString(name,draw.getCenterX(x,93,name,fontSize),yh,fcolor,fontSize);
		//等级
		var heroLevel = '';
		list[i] ? heroLevel = list[i].heroLevel : heroLevel = '???';
		gbox.drawString(heroLevel,draw.getCenterX(x+100,42,heroLevel,fontSize),yh,fcolor,fontSize);
		//类型
//		var heroType = '';
//		list[i] ? heroType = list[i].heroType : heroType = '???';
//		gbox.drawString(heroType,draw.getCenterX(x+130,54,heroType,fontSize),yh,fcolor,fontSize);
		//兵种
		var soldierType = '';
		list[i] ? soldierType = list[i].soldierType : soldierType = '???';
		gbox.drawString(soldierType,draw.getCenterX(x+145,85,soldierType,fontSize),yh,fcolor,fontSize);
		//数量
		var soldierAmount = '';
		list[i] ? soldierAmount = list[i].soldierAmount : soldierAmount = '???';
		gbox.drawString(soldierAmount,draw.getCenterX(x+145+88,75,soldierAmount,fontSize),yh,fcolor,fontSize);
	}
};

//提示窗口
EnvironsScreenBattleClass.draw.prompt = function(index,message,confirmFn,cancelFn,closeFn,groupB){
	gbox.setRenderOrder(expeditionToolClass.draw.getGroupByGroupBottom(groupB));
	isDrawUI[index] = true;
	var draw = EnvironsScreenBattleClass.draw;
	var bgimage = gbox.getImage('ty_an_55');
	var x = (gbox.getScreenW() - bgimage.width)/2;
	var y = (gbox.getScreenH() - bgimage.height)/2;
	EnvironsScreenBattleClass.flag.promptIsOpen = true;
	gbox.addObject(
			{ 
				id : 'prompt_1',
				group : 'levelMenu_5',
				tileset : 'ty_an_55',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [x,y], [x + bgimage.width,y], [x + bgimage.width,y + bgimage.height],[x,y + bgimage.height]],
				initialize : function(){},
				first : function(){},
				myclick : function()
				{
					//确定
					if(((draw.getMoveX(600) < lastTouchMoveX) && (lastTouchMoveX < draw.getMoveX(600) + 50)) && 
						    ((draw.getMoveY(390) < lastTouchMoveY) && (lastTouchMoveY < draw.getMoveY(390) + 26))){
							confirmFn();
							closeFn(index);
					}else
					//取消
					if(((draw.getMoveX(780) < lastTouchMoveX) && (lastTouchMoveX < draw.getMoveX(780) + 50)) && 
						    ((draw.getMoveY(390) < lastTouchMoveY) && (lastTouchMoveY < draw.getMoveY(390) + 26))){
							cancelFn();
							closeFn(index);
					}else{
						//刷新提示窗口
						EnvironsScreenBattleClass.handlers.openPrompt(index, message, confirmFn, cancelFn);
					}
					
				},
				blit : function()
				{
					if(isDrawUI[index] && EnvironsScreenBattleClass.flag.promptIsOpen){
						gbox.drawImage('ty_an_55',draw.getMoveX(x),draw.getMoveY(y));
						//提示窗口消息
						gbox._drawTxtRect(message,draw.getMoveX(600),draw.getMoveY(333),130,45,20,'#ffffff','#000000');
						//确定按钮
						gbox.drawImage('ty_an_08',draw.getMoveX(600),draw.getMoveY(390));
						if(((draw.getMoveX(600) < touchMoveX) && (touchMoveX < draw.getMoveX(600) + 50)) && 
						    ((draw.getMoveY(390) < touchMoveY) && (touchMoveY < draw.getMoveY(390) + 26))){
							gbox.drawImage('ty_an_06',draw.getMoveX(600),draw.getMoveY(390));
						}
						gbox.drawString("确定",draw.getMoveX(610),draw.getMoveY(396),'#FFFFFF',13);
						//取消按钮
						gbox.drawImage('ty_an_08',draw.getMoveX(780),draw.getMoveY(390));
						if(((draw.getMoveX(780) < touchMoveX) && (touchMoveX < draw.getMoveX(780) + 50)) && 
							    ((draw.getMoveY(390) < touchMoveY) && (touchMoveY < draw.getMoveY(390) + 26))){
								gbox.drawImage('ty_an_06',draw.getMoveX(780),draw.getMoveY(390));
						}
						gbox.drawString("取消",draw.getMoveX(790),draw.getMoveY(396),'#FFFFFF',13);
					}
				}		
			 });
};

//等待列表
EnvironsScreenBattleClass.draw.waitingList = function(index,data){
	gbox.setRenderOrder(['environsScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	EnvironsScreenBattleClass.flag.waitingListIsOpen = true;
	var wmCX = (gbox.getScreenW() - gbox.getImage("zd_ct_03").width)/2;
	var wmCY = (gbox.getScreenH() - gbox.getImage("zd_ct_03").height)/2;
	var wmW = gbox.getImage('zd_ct_03').width;
	var wmH = gbox.getImage('zd_ct_03').height;
	var lineHeight = 25;
	//鼠标滚动
//	MouseWheelHandler.scrollOpen([567,267,301,220]);
	MouseWheelList.draw.listSet(gbox.getBufferContext(),
			[567,267,301,220],
			lineHeight,8,
			data.length
	);
	gbox.addObject(
			{ 
				id : 'waitingList_1',
				group : 'levelMenu_2',
				tileset : 'zd_ct_03',
				x : 0,
				y : 0,
				frame : 0,
				poly : [[wmCX,wmCY], [wmCX + wmW,wmCY], [wmCX + wmW,wmCY + wmH],[wmCX,wmCY + wmH]],
				initialize : function(){},
				first : function(){},
				myclick : function()
				{					
					if(lastTouchMoveX > wmCX + wmW - gbox.getImage("ty_an_17").width  && 
							lastTouchMoveX < wmCX + wmW && 
							lastTouchMoveY > wmCY && 
							lastTouchMoveY < wmCY + gbox.getImage("ty_an_17").height){
						EnvironsScreenBattleClass.handlers.closeWindow(index);
					}else 
					if(MouseWheelList.isListArea(lastTouchMoveX,lastTouchMoveY)){
						if(MouseWheelList.isListClick(lastTouchMoveX,lastTouchMoveY)){
							var listIndex = MouseWheelList.getLineIndex(lastTouchMoveX,lastTouchMoveY);
//							var cobj = false;
							if(data[listIndex]){
//								cobj = EnvironsScreenBattleClass.list[listIndex];
								MouseWheelList.store.selectIndex = listIndex;
							}
						}
					}
				},
				blit : function()
				{
					if(isDrawUI[index] && EnvironsScreenBattleClass.flag.waitingListIsOpen){		
						gbox.drawImage('zd_ct_03',(wmCX),(wmCY));
						if((((wmCX + wmW - gbox.getImage("ty_an_17").width) < touchMoveX) && 
							(touchMoveX < (wmCX + wmW))) && 
					    	(((wmCY) < touchMoveY) && 
					    	(touchMoveY < (wmCY + gbox.getImage("ty_an_17").height))))
						{
						   	gbox.drawImage('ty_an_17',(wmCX + wmW - gbox.getImage("ty_an_17").width),(wmCY));						   	    
						}else{
						   	gbox.drawImage('ty_an_18',(wmCX + wmW - gbox.getImage("ty_an_17").width),(wmCY));	
						}
						//鼠标滚动
						MouseWheelList.listMove(touchMoveX,touchMoveY);
						
						MouseWheelList.draw.clipArea(
							function(x,y){
								EnvironsScreenBattleClass.draw.listScroll(x,y,data,lineHeight,touchMoveX,touchMoveY);	
							}
						);
//						MouseWheelHandler.scroll(touchMoveX,touchMoveY,function(e,delta){
//							console.log(delta);
//						});
					}
				}		
			 });
};
//滚动内容绘制
EnvironsScreenBattleClass.draw.listScroll = function(x,y,list,h,touchMoveX,touchMoveY){
	var draw = EnvironsScreenBattleClass.draw;
	var fcolor = '#000000';
	var lineColor = "#000000";
	var lineBGColor = "#145b7d";
	var lineSelectColor = "#2570a1";
	var fontSize = 13;
	for(var i=0; i<list.length; i++){
		var lh = y + i*h;
		var th = lh + 5;
		var ttype = '';
		if(list[i].type == 1){
			ttype = '防御方';
		}else{
			ttype = '进攻方';
		}
		if(((x < touchMoveX) && (touchMoveX < (x + 280))) && 
		    (((lh) < touchMoveY) && (touchMoveY < (lh + h)))){
			MouseWheelList.draw.moveonLine(x,lh,lineBGColor);
		}
		if(i == MouseWheelList.store.selectIndex){
			MouseWheelList.draw.moveonLine(x,lh,lineSelectColor);
		}
		//阵营
		gbox.drawString(ttype,draw.getCenterX(x,70,ttype,fontSize),th,fcolor,fontSize);
		//君主
		gbox.drawString(list[i].characterName,draw.getCenterX(x+73,101,list[i].characterName,fontSize),th,fcolor,fontSize);
		//战力
		gbox.drawString(list[i].forceAmount,draw.getCenterX(x+174,54,list[i].forceAmount,fontSize),th,fcolor,fontSize);
		//部队数
		gbox.drawString(list[i].teamAmount,draw.getCenterX(x+174+57,47,list[i].teamAmount,fontSize),th,fcolor,fontSize);
		
		MouseWheelList.draw.line(x,lh+h,302,null,lineColor);
	}
	MouseWheelList.draw.line(x+73,y,null,list.length*h,lineColor);
	MouseWheelList.draw.line(x+175,y,null,list.length*h,lineColor);
	MouseWheelList.draw.line(x+172+60,y,null,list.length*h,lineColor);
	
};

//绘制动画
EnvironsScreenBattleClass.draw.playAnimation = function(x,y){
	var store = EnvironsScreenBattleClass.store;
	var da = EnvironsScreenBattleClass.store.drawAnim;
	var position = store.position;
	
	EnvironsScreenBattleClass.handlers.armyLoop(
			function(index){//友军
				var obj = store.assistArmy.drawObj[index];
				var poly = position.assistPoly[index];
				var animObj = da.assist[index];
				var p = position.assist[index];
				EnvironsScreenBattleClass.draw.army(x,y,p,poly,animObj);
				EnvironsScreenBattleClass.draw.armyStatus(obj,p,animObj);
			},
			function(){//城主
				var obj = store.defenseArmy.drawObj;
				var poly = position.defensePoly;
				var animObj = da.defense;
				var p = position.defense;
				EnvironsScreenBattleClass.draw.army(x,y,p,poly,animObj);
				EnvironsScreenBattleClass.draw.armyStatus(obj,p,animObj);
			},
			function(index){//敌军
				var obj = store.enemyArmy.drawObj[index];
				var poly = position.enemyPoly[index];
				var animObj = da.enemy[index];
				var p = position.enemy[index];
				EnvironsScreenBattleClass.draw.army(x,y,p,poly,animObj);
				EnvironsScreenBattleClass.draw.armyStatus(obj,p,animObj);
			}
	);
};

EnvironsScreenBattleClass.store.statusImage = ['ty_an_98','ty_an_99','ty_an_100','ty_an_101','ty_an_103'];

EnvironsScreenBattleClass.store.statusImageList = {};

EnvironsScreenBattleClass.handlers.setStatusIamgeList = function(obj){
	if(obj.battleField){
		EnvironsScreenBattleClass.store.statusImageList[obj.battleField] = EnvironsScreenBattleClass.store.statusImage[obj.order-1];
	}
};

EnvironsScreenBattleClass.handlers.getStatusImage = function(obj){
	var image = null;
	if(obj.battleField){
		image = EnvironsScreenBattleClass.store.statusImageList[obj.battleField];
	}
	return image;
};

EnvironsScreenBattleClass.draw.armyStatus = function(obj,p,animObj){
	var image = EnvironsScreenBattleClass.handlers.getStatusImage(obj);
	var ofxy = EnvironsScreenBattleClass.draw.getOffsetXY(animObj.polyImage);
	if(image)
		gbox.drawImage(image,p[0]-ofxy[0]+20,p[1]-ofxy[1]-20);
};

//绘制部队
EnvironsScreenBattleClass.draw.army = function(x,y,p,poly,animObj){
	var store = EnvironsScreenBattleClass.store;
	if(store.selectedArmy && store.selectedArmy.id == animObj.id){
		gbox.drawImage('selectedArmy',p[0]-90,p[1]-120);
		EnvironsScreenBattleClass.handlers.changeAnimationXY(animObj.anim,p[0],p[1]);
		animObj.anim.draw();
	}else{
		if(gbox._mouseArea(poly,x,y)){
			var offsetXY = EnvironsScreenBattleClass.draw.getOffsetXY(animObj.polyImage);
			gbox.drawImage(animObj.polyImage,p[0]-offsetXY[0],p[1]-offsetXY[1]);
		}else{
			EnvironsScreenBattleClass.handlers.changeAnimationXY(animObj.anim,p[0],p[1]);
			animObj.anim.draw();
		}
	}
};

EnvironsScreenBattleClass.draw.getOffsetXY = function(name){
	var sr = [0,0];
	switch (name) {
		case 'army_top_mine_focus':
			sr = [52,57];
			break;
		case 'army_bottom_mine_focus':
			sr = [62,69];
			break;
		case 'army_top_enemy_focus':
			sr = [52,57];
			break;
		case 'army_bottom_enemy_focus':
			sr = [62,69];
			break;
	}
	return sr;
};

EnvironsScreenBattleClass.draw.getMoveX = function(x){
	return Number(x) - worldMapStartX;
};

EnvironsScreenBattleClass.draw.getMoveY = function(y){
	return Number(y) - worldMapStartY;
};
EnvironsScreenBattleClass.draw.getCenterX = function(x,w,text,fontSize){
	return x + (w - gbox.getTextWidth(text,fontSize))/2;
};

EnvironsScreenBattleClass.list = [
                                  {type:2,characterName:'进攻1',forceAmount:500.7,teamAmount:5},
                                  {type:2,characterName:'进攻2',forceAmount:500.7,teamAmount:5},
                                  {type:2,characterName:'进攻3',forceAmount:500.7,teamAmount:5},
                                  {type:2,characterName:'进攻4',forceAmount:500.7,teamAmount:5},
                                  {type:2,characterName:'进攻5',forceAmount:500.7,teamAmount:5},
                                  {type:2,characterName:'进攻6',forceAmount:500.7,teamAmount:5},
                                  {type:1,characterName:'支援1',forceAmount:500.7,teamAmount:5},
                                  {type:1,characterName:'支援2',forceAmount:500.7,teamAmount:5},
                                  {type:1,characterName:'支援3',forceAmount:500.7,teamAmount:5},
                                  {type:1,characterName:'支援4',forceAmount:500.7,teamAmount:5},
                                  {type:1,characterName:'支援5',forceAmount:500.7,teamAmount:5},
                                  {type:1,characterName:'支援6',forceAmount:500.7,teamAmount:5},
                                  {type:1,characterName:'支援7',forceAmount:500.7,teamAmount:5}
                                  ];