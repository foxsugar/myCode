<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>讨伐测试</title>
<link href="<%=path %>/css/multiBattle.css" rel="stylesheet" type="text/css" > 
<script type="text/javascript" src="<%=path %>/js/client/jquery.js"></script>
<script type="text/javascript" src="<%=path %>/js/severDataInterface/dataCometd.js"></script>
<script type="text/javascript" src="<%=path %>/js/client/jquery.cometd.js"></script>
<script type="text/javascript">
//接口部分
var battleSubScribe;
var battleSubScribeMine;
var isCommonAttackButton = false;//用于记录是否点击了攻击按钮
var isSkillAttackButton = -1;//用于记录已选择的技能位置
var cometd = $.cometd;
	function beginSingleBattle(battleJobQueueId,battleStart,battleRoundReady,battleTurn,battleTargetSelect,battleTime,battleAutoAttack,battleView,battleDefence){
		multiBattleSubScribeMine = $.cometd.subscribe('/battleSystem/'+battleJobQueueId,function(cometData){
			var battleMessageType = cometData.data.battleMessageType;
			var battleMessageData = cometData.data.battleMessageData;
			console.log(battleMessageType+"-----------"+new Date());
			console.log(battleMessageData);
			switch (battleMessageType) {
			case 1:
				battleStart(battleMessageData);
				break;
			case 2:
				battleRoundReady(battleMessageData);
				cometd.unsubscribe(battleSubScribe);
				cometd.unsubscribe(battleSubScribeMine);
				break;
			case 3:
				break;
				battleTurn(battleMessageData);
			case 4:
				battleTargetSelect(battleMessageData);
				break;
			case 5:
				battleTime(battleMessageData);
				break;
			case 6:
				battleAutoAttack(battleMessageData);
				break;
			case 7:
				battleView(battleMessageData);
				break;
			case 8:
				battleDefence(battleMessageData);
				break;
		
			default:
				break;
			}
		});
		var battleListener = null;
		battleListener = $.cometd.addListener('/meta/subscribe', function(message){
			console.log("aaaaaaaaaaaaaa");
			if(message.successful){
				console.log("收到订阅成功");
				console.log(message.subscription);
				if(message.subscription=='/battleSystem/'+battleJobQueueId){
					console.log("战斗开启");
					$.ajaxPost('<%=path %>/beginMultiBattle',{battleJobQueueId:battleJobQueueId},function(data){
						console.log("删除监听器");
						cometd.removeListener(battleListener);
					});
				}
			}
		});
	}
	//普通攻击选择目标接口
	function normalAttackForMultiBattle(battleJobQueueId){
		$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'10' });
	}
	//普通攻击攻击目标接口
	function attackTargetForMultiBattle(battleJobQueueId,locationId){
		$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'11',locationId:locationId });
	}
	//自动攻击接口
	function autoAttackForMultiBattle(battleJobQueueId){
		$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'12'});
	}
	//防御接口
	function defenceForMultiBattle(battleJobQueueId){
		$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'13'});
	}
	//逃跑接口
	function escapeForMultiBattle(battleJobQueueId){
		$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'14'});
	}
	//释放技能选择目标接口
	function skillForMultiBattle(battleJobQueueId,skillIndex){
		$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'15',skillIndex:Number(skillIndex)});
	}
	//释放技能攻击目标接口
	function skillAttackForMultiBattle(battleJobQueueId,skillIndex,locationId){
		$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'16',skillIndex:Number(skillIndex), locationId:locationId });
	}
	//播放完动画接口
	function viewEndForMultiBattle(){
		$.cometd.publish('/service', { battleId: Number($('#battleIdInput').val()),channelType:'17'});
	}


//本页功能
	
function battleStart(data){
	clearOrder();//清除点亮
	if(data.isNewRound){
		document.getElementById("round").innerHTML = "当前回合数:"+data.roundNum;
		for(var i = 0;i<data.order.length;i++){
			getSoldierByLocationId(data.order[i].locationId).orderNum = data.order[i].orderNum;//按locationId即战斗临时Id取本地数据
		}
	}
	getSoldierByLocationId(data.operateId).turn = true;
	writeInfo();//重绘
}
function clearOrder(){//把所有本地数据的是否操作属性设为false，用于取消点亮
	for(var i = 0 ;i<soldierInfo.length;i++){
		soldierInfo[i].turn = false;
	}
}
function battleRoundReady(data){//新回合准备回合，buff伤害，城防伤害，更新武将信息等
	console.log("更新前台数据");
	for ( var i = 0; i < data.soldierUpdate.length; i++) {
		updateSoldier(data.soldierUpdate[i]);
	}
	//buff伤害
// 	for(var i = 0;i<data.)
	//writeInfo();
}
function updateSoldier(data){//更新军团信息
	var soldier = getSoldierByLocationId(data.locationId);
	soldier.attack = data.attack;
	soldier.defence = data.defence;
	soldier.dodge = data.dodge;
	soldier.criticalStrike = data.criticalStrike;
	soldier.hit = data.hit;
	soldier.mobility = data.mobility;
	soldier.soldierAmount = data.soldierAmount;
	soldier.buff = data.buff;
	soldier.debuff = data.debuff;
}
	function battleTurn(data){
		var attackButton = document.getElementById("attackButton");
		var escapeButton = document.getElementById("escapeButton");
		var defenceButton = document.getElementById("defenceButton");
		if(data.canOperate){
			attackButton.disabled="";
			escapeButton.disabled="";
			defenceButton.disabled="";
			var skills = data.operateSkill;
			createSkillButton(skills);
			//console.log(data);
		}else{
			//document.getElementById("time").innerHTML = "";
			attackButton.disabled="disabled";
			escapeButton.disabled="disabled";
			defenceButton.disabled="disabled";
			var skills = document.getElementById("skillTd").childNodes;
			for ( var i = 0; i < skills.length; i++) {
				document.getElementById("skillTd").removeChild(skills[i]);
				i--;
			}
			clearSelect();
			writeInfo();
			var time = document.getElementById("time");
			if(time.firstChild){
				time.removeChild(time.firstChild);
			}
			isCommonAttackButton = false;
			isSkillAttackButton = -1;
		}
	}
	function createSkillButton(skills){
			
		var skillDiv = document.getElementById("skillTd");
		for ( var i = 0; i < skills.length; i++) {
		    var button =	document.createElement("button");
		    button.id = "skill"+i;
		   console.log(skills[i].skillName);
		    button.innerHTML=skills[i].skillName;
		    button.value=i;
		    button.title = skills[i].description;
		    button.onclick=skillButtonClick;
		    skillDiv.appendChild(button);
		    if(!skills[i].canUse){
			    button.disabled="disabled";
		    }else if(skills[i].remainRound!=0){
		    	button.innerHTML=skills[i].skillName+"cd:"+skills[i].remainRound;
		    	button.disabled="disabled";
		    }else{
		    	button.disabled="";
		    }
		}
	}
	function battleTargetSelect(data){
		clearSelect();
		for ( var i = 0; i < data.length; i++) {
			getSoldierByLocationId(data[i]).canSelect = true;
		}
		writeInfo();
	}
	function clearSelect(){
		for(var i = 0 ;i<soldierInfo.length;i++){
			soldierInfo[i].canSelect = false;
		}
	}

	function battleTime(data){
		document.getElementById("time").innerHTML = data;
	}
	function battleAutoAttack(data){
		var autoAttackButton = document.getElementById("autoAttackButton");
		if(data.autoAttack){
			autoAttackButton.innerHTML = "手动攻击";
		}else{
			autoAttackButton.innerHTML = "自动攻击";
		}
// 		console.log(data);
	}
	function battleView(data){
		var result = "";
		if(data.battleViewType==1){//攻击
		//战斗结果
		//删除死人
			result = commonAttackShow(data);

		}else if(data.battleViewType==2){//技能
		//战斗结果
		//删除死人
			result = skillAttackShow(data);
		}
		resultShow(result);
	}
	function commonAttackShow(data){//普通攻击信息展示
		var result = "";
		if(data.battleViewInfo.isDefenceDead){
			var soldier = getSoldierByLocationId(data.battleViewInfo.defencePersonId);
			var attackSoldier = getSoldierByLocationId(data.battleViewInfo.attackPersonId);
			var order = document.getElementById(soldier.flagLocation);
			if(order.firstChild){
				order.removeChild(order.firstChild);
			}
			var location = document.getElementById(soldier.location);
			console.log(order.firstChild);
			if(location.firstChild){
				location.removeChild(location.firstChild);
			}
			deleteSoldierByLocationId(data.battleViewInfo.defencePersonId);
			result +=attackSoldier.heroName+"   攻击   "+soldier.heroName+" !! 结果:"+soldier.heroName+" 受到"+data.battleViewInfo.defenceAmountHurt+"伤害,死亡溃败";
		}else if(data.battleViewResult==1){
			var soldier = getSoldierByLocationId(data.battleViewInfo.defencePersonId);
			var attackSoldier = getSoldierByLocationId(data.battleViewInfo.attackPersonId);
			soldier.soldierAmount = data.battleViewInfo.defenceAmountUpdate;
			if(data.battleViewInfo.defencePersonHurtType==1){
				result +=attackSoldier.heroName+"   攻击   "+soldier.heroName+" !! 结果: 命中对 "+soldier.heroName+" 造成"+data.battleViewInfo.defenceAmountHurt+"伤害";
			}else if(data.battleViewInfo.defencePersonHurtType==2){
				result +=attackSoldier.heroName+"   攻击   "+soldier.heroName+" !! 结果: 命中对 "+soldier.heroName+" 造成"+data.battleViewInfo.defenceAmountHurt+"伤害(吸收)";
			}
		}else if(data.battleViewResult==2){
			var soldier = getSoldierByLocationId(data.battleViewInfo.defencePersonId);
			var attackSoldier = getSoldierByLocationId(data.battleViewInfo.attackPersonId);
			soldier.soldierAmount = data.battleViewInfo.defenceAmountUpdate;
			if(data.battleViewInfo.defencePersonHurtType==1){
				result +=attackSoldier.heroName+"   攻击   "+soldier.heroName+" !! 结果: 命中对 "+soldier.heroName+" 造成"+data.battleViewInfo.defenceAmountHurt+"暴击伤害";
			}else if(data.battleViewInfo.defencePersonHurtType==2){
				result +=attackSoldier.heroName+"   攻击   "+soldier.heroName+" !! 结果: 命中对 "+soldier.heroName+" 造成"+data.battleViewInfo.defenceAmountHurt+"暴击伤害(吸收)";
			}
		}else if(data.battleViewResult==3){
			var soldier = getSoldierByLocationId(data.battleViewInfo.defencePersonId);
			var attackSoldier = getSoldierByLocationId(data.battleViewInfo.attackPersonId);
			soldier.soldierAmount = data.battleViewInfo.defenceAmountUpdate;
			result +=attackSoldier.heroName+"   攻击   "+soldier.heroName+" !! 结果:  "+soldier.heroName+" 闪避";
		}else if(data.battleViewResult==4){
			var soldier = getSoldierByLocationId(data.battleViewInfo.defencePersonId);
			var attackSoldier = getSoldierByLocationId(data.battleViewInfo.attackPersonId);
			soldier.soldierAmount = data.battleViewInfo.defenceAmountUpdate;
			result +=attackSoldier.heroName+"   攻击   "+soldier.heroName+" !! 结果:  未命中 ";
		}else if(data.battleViewResult==5){
			var soldier = getSoldierByLocationId(data.battleViewInfo.defencePersonId);
			var attackSoldier = getSoldierByLocationId(data.battleViewInfo.attackPersonId);
			soldier.soldierAmount = data.battleViewInfo.defenceAmountUpdate;
			result +=attackSoldier.heroName+"   攻击   "+soldier.heroName+" !! 结果: "+soldier.heroName+" 免疫";
		}
		return result;
	}

	function skillAttackShow(data){
		var result = "";
		var skillSoldier = getSoldierByLocationId(data.battleViewInfo.skillerId);
		result += skillSoldier.heroName+"施放"+data.battleViewInfo.skillName+"对  ";
		for(var i = 0;i<data.battleViewInfo.targets.length;i++){
			updateSoldier(data.battleViewInfo.targets[i].targetInfo);//更新本地数据
			var target = getSoldierByLocationId(data.battleViewInfo.targets[i].battleHurtInfo.locationId);
			if(data.battleViewInfo.targets[i].battleHurtInfo.isDead){
				result+=target.heroName+"造成 " + data.battleViewInfo.targets[i].battleHurtInfo.effectValue+"伤害，"+target.heroName+"死亡!!  ";
			}else if(data.battleViewInfo.targets[i].battleViewResult==1){
				if(data.battleViewInfo.targets[i].battleHurtInfo.effectValue>0){
					result+=target.heroName+"造成 "+data.battleViewInfo.targets[i].battleHurtInfo.effectValue+" 治疗效果!!";
				}else if(data.battleViewInfo.targets[i].battleHurtInfo.effectValue<0){
					if(data.battleViewInfo.targets[i].battleHurtInfo.effectType==1){
						result+=target.heroName+"造成 "+data.battleViewInfo.targets[i].battleHurtInfo.effectValue+" 伤害!!";
					}else if(data.battleViewInfo.targets[i].battleHurtInfo.effectType==2){
						result+=target.heroName+"造成 "+data.battleViewInfo.targets[i].battleHurtInfo.effectValue+" 伤害(吸收)!!";
					}
				}
			}else if(data.battleViewInfo.targets[i].battleViewResult==5){
				result+=target.heroName+"没有伤害，"+target.heroName+"免疫了!!";
			}
		}
		return result;
	}
	
	function battleDefence(data){
		getSoldierByLocationId(data.locationId).defenceStatus = data.defenceStatus;
		writeInfo();
	}
	
//按键
function commonAttack(){//点击目标,对目标攻击
	attackTargetForMultiBattle(Number($('#battleIdInput').val()) , this.value);
}
function skillAttack(){//点击目标，对目标攻击
	skillAttackForMultiBattle(Number($('#battleIdInput').val()),isSkillAttackButton,this.value);
}
function attackButtonClick(){//点击攻击按钮
	isSkillAttackButton = -1;
	normalAttackForMultiBattle(Number($('#battleIdInput').val()));
	isCommonAttackButton = true;
}
function skillButtonClick(){//点击技能按钮
	isCommonAttackButton = false;
	skillForMultiBattle(Number($('#battleIdInput').val()), this.value);
	isSkillAttackButton = this.value;
}
function autoAttackButtonClick(){
	autoAttackForMultiBattle(Number($('#battleIdInput').val()));
}
function defenceButtonClick(){
	defenceForMultiBattle(Number($('#battleIdInput').val()));
}
function escapeButtonClick(){
	escapeForMultiBattle(Number($('#battleIdInput').val()));
}

function startBattle(){
	console.log($('#battleIdInput').val());
	beginSingleBattle($('#battleIdInput').val(), battleStart, battleRoundReady, battleTurn, battleTargetSelect, battleTime, battleAutoAttack, battleView,battleDefence);
}
function connectComet(){
	cometd.configure({url:"http://172.17.4.70:8080/wok/cometd"});
	cometd.handshake();
	cometd.addListener('/meta/handshake', function(message){
		if(message.successful){
			console.log("连接comet成功"+'${character.id}');
			cometd.publish('/login',{charId:Number('${character.id}')});
		}
	});
}
var soldierInfo = new Array();//本地临时数据,一个数组
function getMulti(){
	$.ajaxPost('<%=path%>/enterMultiBattle',{battleJobQueueId:$('#battleIdInput').val()},function(data){
		var soldier;//data.mine为自己的数据
		for ( var i = 0; i < data.mine.length; i++) {
			soldier = {
					locationId:data.mine[i].locationId,	//位置Id，为本地数据的身份标识
					mp:data.mine[i].mp,//军团mp
					mpMax:data.mine[i].mpMax,	//mp最大值
					soldierName:data.mine[i].soldierName,	//士兵名称
					soldierType:data.mine[i].soldierType,	//士兵类型
					heroName:data.mine[i].heroName,	//武将名称
					heroLevel:data.mine[i].heroLevel,//武将等级
					heroIcon:data.mine[i].heroIcon,	//武将图标
					smallHeroIcon:data.mine[i].smallHeroIcon,//武将小图标
					soldierAmount:data.mine[i].soldierAmount,	//士兵数量
					soldierAmountMax:data.mine[i].soldierAmountMax,	//士兵数量最大值
					orderNum:data.mine[i].orderNum,	//出手顺序
					locationX:data.mine[i].locationX,	//X坐标
					locationY:data.mine[i].locationY,	//y坐标
					criticalStrike:data.mine[i].criticalStrike,	//暴击率
					dodge:data.mine[i].dodge,	//闪避率
					hit:data.mine[i].hit,	//命中率
					defence:data.mine[i].defence,//防御	
					attack:data.mine[i].attack,	//攻击
					mobility:data.mine[i].mobility,	//行动力
					flag:data.mine[i].flag,//旗帜
					buff:data.mine[i].buff,//增益效果
					debuff:data.mine[i].debuff,//减益效果
					defenceStatus:data.mine[i].defenceStatus,//是否处于防御状态
					
					///////以下为本地按需求创建的临时数据///////
					flagLocation:"mine"+(i+1),//旗帜标识，只是本测试页使用，在本测试页中为军团旗帜标签的ID
					location:"mine"+data.mine[i].locationY+"_"+data.mine[i].locationX,//位置标识，只是本测试页使用，在本测试页中为军团位置标签的ID
					turn:false,//是否到操作回合，初始化为false
					canSelect:false//是否可选择,初始化为false
			};
			soldierInfo.push(soldier);
		}
		for ( var i = 0; i < data.target.length; i++) {
			soldier = {
					locationId:data.target[i].locationId,	//位置Id，为本地数据的身份标识
					mp:data.target[i].mp,//军团mp
					mpMax:data.target[i].mpMax,	//mp最大值
					soldierName:data.target[i].soldierName,	//士兵名称
					soldierType:data.target[i].soldierType,	//士兵类型
					heroName:data.target[i].heroName,	//武将名称
					heroLevel:data.target[i].heroLevel,//武将等级
					heroIcon:data.target[i].heroIcon,	//武将图标
					smallHeroIcon:data.target[i].smallHeroIcon,//武将小图标
					soldierAmount:data.target[i].soldierAmount,	//士兵数量
					soldierAmountMax:data.target[i].soldierAmountMax,	//士兵数量最大值
					orderNum:data.target[i].orderNum,	//出手顺序
					locationX:data.target[i].locationX,	//X坐标
					locationY:data.target[i].locationY,	//y坐标
					criticalStrike:data.target[i].criticalStrike,	//暴击率
					dodge:data.target[i].dodge,	//闪避率
					hit:data.target[i].hit,	//命中率
					defence:data.target[i].defence,//防御	
					attack:data.target[i].attack,	//攻击
					mobility:data.target[i].mobility,	//行动力
					flag:data.target[i].flag,//旗帜
					buff:data.target[i].buff,//增益效果
					debuff:data.target[i].debuff,//减益效果
					defenceStatus:data.target[i].defenceStatus,//是否处于防御状态
					
					///////以下为本地按需求创建的临时数据///////
					flagLocation:"target"+(i+1),//旗帜标识，只是本测试页使用，在本测试页中为军团旗帜标签的ID
					location:"target"+data.target[i].locationY+"_"+data.target[i].locationX,//位置标识，只是本测试页使用，在本测试页中为军团位置标签的ID
					turn:false,//是否到操作回合，初始化为false
					canSelect:false//是否可选择,初始化为false
			};
			soldierInfo.push(soldier);
		}
		writeInfo();
	});
}
function writeInfo(){//重绘数据
// 		console.log(soldierInfo);
		for ( var i = 0; i < soldierInfo.length; i++) {
			var font = document.createElement("font");
			if(soldierInfo[i].turn){
				font.color = "red";
			}
			font.innerHTML = ""+soldierInfo[i].flag+" "+soldierInfo[i].orderNum;
			var order =  document.getElementById(soldierInfo[i].flagLocation);
// 			console.log(order.firstChild);
			if(order.firstChild){
				order.removeChild(order.firstChild);
			}
			order.appendChild(font);
// 			console.log(soldierInfo);
			var button = document.createElement("button");
			var font1 = document.createElement("font");
			if(soldierInfo[i].canSelect){
				font1.color = "orange";
				if(isCommonAttackButton){
					button.onclick = commonAttack;
				}else if(isSkillAttackButton!=-1){
					button.onclick = skillAttack;
				}
			}else if(soldierInfo[i].turn){
				font1.color = "red";
			}
			if(soldierInfo[i].defenceStatus){
				font1.innerHTML = soldierInfo[i].heroName+"(防)";
			}else{
				font1.innerHTML = soldierInfo[i].heroName;
			}
			button.appendChild(font1);
			button.id = soldierInfo[i].location+"button";
			button.onmouseover = mouseOverEvent;
			button.value = soldierInfo[i].locationId;
			var location = document.getElementById(soldierInfo[i].location);
			if(location.firstChild){
				location.removeChild(location.firstChild);
			}
			location.appendChild(button);
			
		}
}
function mouseOverEvent(){
	var soldier = getSoldierByLocation(this.id);
// 	console.log(soldier);
	var str = "";
	str +="姓名:"+ soldier.heroName+" \r\n";
	str += "等级:"+soldier.heroLevel+" \r\n";
	str += "兵种:"+soldier.soldierName+" \r\n";
	str += "士兵数量:"+soldier.soldierAmount+"/"+soldier.soldierAmountMax+" \r\n";
	str += "攻击:"+soldier.attack+" \r\n";
	str += "防御:"+soldier.defence+" \r\n";
	str += "暴击:"+soldier.criticalStrike+" \r\n";
	str += "闪避:"+soldier.dodge+" \r\n";
	str += "命中:"+soldier.hit+" \r\n";
	str += "机动:"+soldier.mobility+" \r\n";
	str += "----------------buff----------------- \r\n";
	for ( var i = 0; i < soldier.buff.length; i++) {
		str+=soldier.buff[i].description+"---"+soldier.buff[i].remainRound+"\r\n";
	}
	str += "---------------debuff---------------- \r\n";
	for ( var i = 0; i < soldier.debuff.length; i++) {
		str+=soldier.debuff[i].description+"---"+soldier.debuff[i].remainRound+"\r\n";
	}
	this.title = str;
}
function getSoldierByLocation(id){//按位置获取军团信息，在本测试页用于鼠标经过目标(按钮标签)时显示信息
	for ( var i = 0; i < soldierInfo.length; i++) {
		if(soldierInfo[i].location+"button"==id){
			return soldierInfo[i];
		};
	};
}
function getSoldierByLocationId(id){//按locationId获取军团
	for ( var i = 0; i < soldierInfo.length; i++) {
		if(soldierInfo[i].locationId==id){
			return soldierInfo[i];
		};
	};
}
function deleteSoldierByLocationId(id){//删除军团
	for ( var i = 0; i < soldierInfo.length; i++) {
		if(soldierInfo[i].locationId==id){
			soldierInfo.splice(i,1);
		};
	};
}
function resultShow(result){//结果展示
	document.getElementById("resultShow").innerHTML = result;
}

</script>
</head>
<body>
战场Id：<input id="battleIdInput">
<button id="connect" onclick="connectComet()">连接</button>
<button id="getMulti" onclick="getMulti()">获取</button>
<button id="startBattle" onclick="startBattle()">开启</button>
<table border="">
<tr><td><button id="attackButton" onclick="attackButtonClick()" disabled="disabled">攻击</button></td><td><button id="autoAttackButton" onclick="autoAttackButtonClick()">自动攻击</button></td>
<td><button id="defenceButton" onclick="defenceButtonClick()" disabled="disabled">防御</button></td>
<td><button id="escapeButton" onclick="escapeButtonClick()" disabled="disabled">逃跑</button></td>
</tr>
<tr><td id="skillTd" colspan="4" height="25px" width="400px"><div id="targetDiv"></div></td></tr>

</table>
<table id="formationTable" border="">
<tr><td height="30px" id="round" colspan="11" align="center"></td></tr>
<tr><td height="30px" id="time" colspan="11" align="center"></td></tr>
	<tr><td  id="mine1" class="formation" ></td><td  id="mine2"  class="formation" ></td><td id="mine3"   class="formation"></td><td  id="mine4"   class="formation"></td><td  id="mine5"  class="formation"></td> <td rowspan="6" width="20px"></td> 
	<td id="target1"   class="formation"></td><td id="target2" class="formation"></td><td id="target3" class="formation"></td><td id="target4" class="formation"></td><td  id="target5" class="formation"></td></tr>
	<tr><td id="mine1_1"  class="formation" ></td><td id="mine1_2"  class="formation"></td><td id="mine1_3"  class="formation"></td><td id="mine1_4"  class="formation"></td><td id="mine1_5"  class="formation"></td> 
	<td id="target1_1" class="formation"></td><td id="target1_2"  class="formation"></td><td id="target1_3"  class="formation"></td><td id="target1_4"  class="formation"></td><td id="target1_5"  class="formation"></td></tr>
	
	<tr><td id="mine2_1"  class="formation" ></td><td id="mine2_2"  class="formation"></td><td id="mine2_3"  class="formation"></td><td id="mine2_4"  class="formation"></td><td id="mine2_5"  class="formation"></td> 
	<td id="target2_1" class="formation"></td><td id="target2_2"  class="formation"></td><td id="target2_3"  class="formation"></td><td id="target2_4"  class="formation"></td><td id="target2_5"  class="formation"></td></tr>
	
	<tr><td id="mine3_1"  class="formation" ></td><td id="mine3_2"  class="formation"></td><td id="mine3_3"  class="formation"></td><td id="mine3_4"  class="formation"></td><td id="mine3_5"  class="formation"></td> 
	<td id="target3_1" class="formation"></td><td id="target3_2"  class="formation"></td><td id="target3_3"  class="formation"></td><td id="target3_4"  class="formation"></td><td id="target3_5"  class="formation"></td></tr>
	
	<tr><td id="mine4_1"  class="formation" ></td><td id="mine4_2"  class="formation"></td><td id="mine4_3"  class="formation"></td><td id="mine4_4"  class="formation"></td><td id="mine4_5"  class="formation"></td> 
	<td id="target4_1" class="formation"></td><td id="target4_2"  class="formation"></td><td id="target4_3"  class="formation"></td><td id="target4_4"  class="formation"></td><td id="target4_5"  class="formation"></td></tr>
	
	<tr><td id="mine5_1"  class="formation" ></td><td id="mine5_2"  class="formation"></td><td id="mine5_3"  class="formation"></td><td id="mine5_4"  class="formation"></td><td id="mine5_5"  class="formation"></td> 
	<td id="target5_1" class="formation"></td><td id="target5_2"  class="formation"></td><td id="target5_3"  class="formation"></td><td id="target5_4"  class="formation"></td><td id="target5_5"  class="formation"></td></tr>
	
	
</table>
<div id="resultShow" ></div>

</body>
</html>