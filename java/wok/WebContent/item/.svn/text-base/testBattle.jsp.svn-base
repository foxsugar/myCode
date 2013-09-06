<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="<%=path %>/js/client/jquery.js"></script>
<script type="text/javascript" src="<%=path %>/js/severDataInterface/dataCometd.js"></script>
<script type="text/javascript" src="<%=path %>/js/client/jquery.cometd.js"></script>
<script type="text/javascript">
//战场频道订阅
var battleSubScribe;
var battleSubScribeMine;
var cometd = $.cometd;
var battleInfo = {};
function init(){//初始化本地数据
	battleInfo.heroInfo = new Array();
	var heroA = {};
	heroA.name = "";
	heroA.level = 0;
	heroA.icon = "";
	heroA.smallIcon = "";
	heroA.hp = 0;
	heroA.hpMax = 0;
	heroA.mp = 0;
	heroA.mpMax = 0;
	heroA.force = 0;
	heroA.stategy = 0;
	heroA.agility = 0;
	heroA.physique = 0;
	battleInfo.heroInfo.push(heroA);
	var heroB = {};
	heroB.name = "";
	heroB.level = 0;
	heroB.icon = "";
	heroB.smallIcon = "";
	heroB.hp = 0;
	heroB.hpMax = 0;
	heroB.mp = 0;
	heroB.mpMax = 0;
	heroB.force = 0;
	heroB.stategy = 0;
	heroB.agility = 0;
	heroB.physique = 0;
	battleInfo.heroInfo.push(heroB);
	battleInfo.rounds = 1;//回合初始化为1;
	battleInfo.mineId=0;//己方信息存放位置Id
	battleInfo.targetId=0;//对方信息存放位置Id
	battleInfo.locationA=0;//位置0，永远屏幕左边
	battleInfo.locationB=1;//位置1，永远屏幕右边
}
function writeData(){//显示数据
	var locationA = 0;
	var locationB = 1;
	document.getElementById("heroName1").innerHTML = battleInfo.heroInfo[locationA].name;
	document.getElementById("heroLevel1").innerHTML = battleInfo.heroInfo[locationA].level;
	document.getElementById("heroIcon1").innerHTML = battleInfo.heroInfo[locationA].icon;
	document.getElementById("smallHeroIcon1").innerHTML = battleInfo.heroInfo[locationA].smallIcon;
	document.getElementById("hp1").innerHTML = ""+battleInfo.heroInfo[locationA].hp+"/"+battleInfo.heroInfo[0].hpMax;
	document.getElementById("mp1").innerHTML = ""+battleInfo.heroInfo[locationA].mp+"/"+battleInfo.heroInfo[0].mpMax;
	document.getElementById("heroForce1").innerHTML = battleInfo.heroInfo[locationA].force;
	document.getElementById("stategy1").innerHTML = battleInfo.heroInfo[locationA].stategy;
	document.getElementById("agility1").innerHTML = battleInfo.heroInfo[locationA].agility;
	document.getElementById("physique1").innerHTML = battleInfo.heroInfo[locationA].physique;
	///////////////
	document.getElementById("heroName2").innerHTML = battleInfo.heroInfo[locationB].name;
	document.getElementById("heroLevel2").innerHTML = battleInfo.heroInfo[locationB].level;
	document.getElementById("heroIcon2").innerHTML = battleInfo.heroInfo[locationB].icon;
	document.getElementById("smallHeroIcon2").innerHTML = battleInfo.heroInfo[locationB].smallIcon;
	document.getElementById("hp2").innerHTML = ""+battleInfo.heroInfo[locationB].hp+"/"+battleInfo.heroInfo[1].hpMax;
	document.getElementById("mp2").innerHTML = ""+battleInfo.heroInfo[locationB].mp+"/"+battleInfo.heroInfo[1].mpMax;
	document.getElementById("heroForce2").innerHTML = battleInfo.heroInfo[locationB].force;
	document.getElementById("stategy2").innerHTML = battleInfo.heroInfo[locationB].stategy;
	document.getElementById("agility2").innerHTML = battleInfo.heroInfo[locationB].agility;
	document.getElementById("physique2").innerHTML = battleInfo.heroInfo[locationB].physique;
	////
	document.getElementById("rounds").innerHTML = battleInfo.rounds;
}

//进入战场
	function enterBattle(){
		
		$.ajaxPost('<%=path %>/enterBattle',{battleJobQueueId:$('#battleId').val()},function(data){
			//接数据
			var i = data.mine.location;
			battleInfo.mineId = i;
			battleInfo.heroInfo[i].name = data.mine.heroName;
			battleInfo.heroInfo[i].level = data.mine.level;
			battleInfo.heroInfo[i].icon = data.mine.heroIcon;
			battleInfo.heroInfo[i].smallIcon = data.mine.smallHeroIcon;
			battleInfo.heroInfo[i].hp = data.mine.hp;
			battleInfo.heroInfo[i].hpMax = data.mine.hpMax;
			battleInfo.heroInfo[i].mp = data.mine.mp;
			battleInfo.heroInfo[i].mpMax = data.mine.mpMax;
			battleInfo.heroInfo[i].force = data.mine.heroForce;
			battleInfo.heroInfo[i].stategy = data.mine.strategy;
			battleInfo.heroInfo[i].agility = data.mine.agility;
			battleInfo.heroInfo[i].physique = data.mine.physique;
			var j = data.target.location;
			battleInfo.targetId = j;
			battleInfo.heroInfo[j].name = data.target.heroName;
			battleInfo.heroInfo[j].level = data.target.level;
			battleInfo.heroInfo[j].icon = data.target.heroIcon;
			battleInfo.heroInfo[j].smallIcon = data.target.smallHeroIcon;
			battleInfo.heroInfo[j].hp = data.target.hp;
			battleInfo.heroInfo[j].hpMax = data.target.hpMax;
			battleInfo.heroInfo[j].mp = data.target.mp;
			battleInfo.heroInfo[j].mpMax = data.target.mpMax;
			battleInfo.heroInfo[j].force = data.target.heroForce;
			battleInfo.heroInfo[j].stategy = data.target.strategy;
			battleInfo.heroInfo[j].agility = data.target.agility;
			battleInfo.heroInfo[j].physique = data.target.physique;
			
			writeData();
				console.log("进入战场");
		});
	}
	//开启战场
function startBattle(){
				console.log("战斗开启!!!!!");
	beginSingleBattle( $('#battleId').val(), battleView, battleTurn, battleEnd, battleRoundTime, battleAutoAttack)
}
function connectComet(){
	cometd.configure({url:"http://168.168.1.61:8080/wok/cometd"});
	cometd.handshake();
	cometd.addListener('/meta/handshake', function(message){
		if(message.successful){
			console.log("连接comet成功");
			cometd.publish('/login',{charId:Number('${character.id}')});
		}
	});
}
function attack(){
	normalAttackForSingleBattle(Number($('#battleId').val()));
}
	function skillAttack(){
	//	console.log("技能攻击");
		skillForSingleBattle(Number($('#battleId').val()),this.value);
	}
function autoAttack(){
	autoAttackForSingleBattle(Number($('#battleId').val()));
}
	function escape(){
		escapeForSingleBattle(Number($('#battleId').val()));
	}

var s; 
function battleView(data){
	//console.log(data);
	switch (data.battleViewType){
	case 1://普通攻击
		attackView(data);
		break;
	case 2://技能攻击
		skillView(data);
		break;
	case 3://回合结束清算
		roundEnd(data);
		break;
	default:
		break;
	}
	s = setInterval("delay()","1000");//添加假的动画延时
}
function attackView(data){
	var i = data.battleViewInfo.attackPersonId;//攻击方Id
	var j = data.battleViewInfo.defencePersonId;//防御方Id
	var result = data.battleViewResult;//战斗结果
	var resultString = battleInfo.heroInfo[i].name+" 以动作资源"+data.battleViewInfo.attackPersonAction+"攻击 "+battleInfo.heroInfo[j].name;
	switch (result) {
	case 1:
		resultString+="   命中   ";
		if(data.battleViewInfo.defencePersonHurtType==2){//没扣血，没有受伤动作
			resultString+="   伤害 "+data.battleViewInfo.defencePersonHurt+"吸收";
			
		}else if(data.battleViewInfo.defencePersonHurtType==1){//扣血，又受伤动作
			var  hurt= data.battleViewInfo.defencePersonHurt;
			resultString+=battleInfo.heroInfo[j].name+"受伤动作"+data.battleViewInfo.defencePersonAction+"   伤害 "+hurt;
			//更新HP
			battleInfo.heroInfo[battleInfo.locationA].hp=data.battleViewInfo.hpUpdate[battleInfo.locationA];
			battleInfo.heroInfo[battleInfo.locationB].hp=data.battleViewInfo.hpUpdate[battleInfo.locationB];
		}
		break;
	case 2:
		resultString+="   暴击   ";
		if(data.battleViewInfo.defencePersonHurtType==2){//没扣血，没有受伤动作
			resultString=+"   暴击伤害 "+data.battleViewInfo.defencePersonHurt+"吸收";
			
		}else if(data.battleViewInfo.defencePersonHurtType==1){//扣血，又受伤动作
			var  hurt= data.battleViewInfo.defencePersonHurt;
			resultString+=battleInfo.heroInfo[j].name+"受伤动作"+data.battleViewInfo.defencePersonAction+"   暴击伤害 "+hurt;
			//更新HP
			battleInfo.heroInfo[battleInfo.locationA].hp=data.battleViewInfo.hpUpdate[battleInfo.locationA];
			battleInfo.heroInfo[battleInfo.locationB].hp=data.battleViewInfo.hpUpdate[battleInfo.locationB];
		}
		break;
		
	case 3:
		resultString+="   被闪避   ";
		break;
	case 4:
		resultString+="   未命中   ";
		break;
	case 5:
		resultString+="   被免疫   ";
		break;

	default:
		break;
	}
	
	console.log(resultString);
	writeData();//重绘本地数据
}
function skillView(data){
	var skillerId = data.battleViewInfo.skillerId;
	var targetId = data.battleViewInfo.targetId;
	var resultString = "";
	resultString+=battleInfo.heroInfo[skillerId].name+"以动作:"+data.battleViewInfo.skillerAction+"  特效:"+data.battleViewInfo.skillerAnimation
	+" 向 "+battleInfo.heroInfo[targetId].name +"  发动技能    结果:";
	var skillerEffectValue = "";//使用技能者的影响值，可能是伤害，也可能是治疗，看值大于0还是小于0
	var targetEffectValue = "";//技能目标者的影响值，可能是伤害，也可能是治疗，看值大于0还是小于0
	if(data.battleViewInfo.skillerEffectValue>0){
		skillerEffectValue+=battleInfo.heroInfo[skillerId].name+"受到治疗"+data.battleViewInfo.skillerEffectValue;
	}else if(data.battleViewInfo.skillerEffectValue<0){
		if(data.battleViewInfo.skillerEffectType==1){//1为普通伤害类型，2为吸收伤害类型
			skillerEffectValue+=battleInfo.heroInfo[skillerId].name+"受到伤害"+data.battleViewInfo.skillerEffectValue;
		}else if(data.battleViewInfo.skillerEffectType==2){
			skillerEffectValue+=battleInfo.heroInfo[skillerId].name+"受到伤害"+data.battleViewInfo.skillerEffectValue+"吸收";
		}
	}
	if(data.battleViewInfo.targetEffectValue>0){
		targetEffectValue+=battleInfo.heroInfo[targetId].name+"受到治疗"+data.battleViewInfo.targetEffectValue;
	}else if(data.battleViewInfo.targetEffectValue<0){
		if(data.battleViewInfo.targetEffectType==1){//1为普通伤害类型，2为吸收伤害类型
			//目标会有伤害动作
			targetEffectValue+=battleInfo.heroInfo[targetId].name+"受到伤害"+data.battleViewInfo.targetEffectValue+" 伤害动作"+data.battleViewInfo.targetEffectAction;
		}else if(data.battleViewInfo.targetEffectType==2){
			//伤害吸收，没有伤害动作
			targetEffectValue+=battleInfo.heroInfo[targetId].name+"受到伤害"+data.battleViewInfo.targetEffectValue+"吸收";
		}
	}
	resultString+=skillerEffectValue+"    "+targetEffectValue;
	console.log(resultString);
	//更新HP,MP
	battleInfo.heroInfo[battleInfo.locationA].hp=data.battleViewInfo.hpUpdate[battleInfo.locationA];
	battleInfo.heroInfo[battleInfo.locationB].hp=data.battleViewInfo.hpUpdate[battleInfo.locationB];
	battleInfo.heroInfo[battleInfo.locationA].mp=data.battleViewInfo.mpUpdate[battleInfo.locationA];
	battleInfo.heroInfo[battleInfo.locationB].mp=data.battleViewInfo.mpUpdate[battleInfo.locationB];
	writeData();//重绘本地数据
}
function roundEnd(data){
	//更新本地回合
	battleInfo.rounds =  data.battleViewInfo.round;
	var locationA = 0;
	var locationB = 1;
	//更新本地属性
	battleInfo.heroInfo[locationA].force =  data.battleViewInfo.heros[locationA].heroForce;
	battleInfo.heroInfo[locationA].strategy =  data.battleViewInfo.heros[locationA].strategy;
	battleInfo.heroInfo[locationA].physique =  data.battleViewInfo.heros[locationA].physique;
	battleInfo.heroInfo[locationA].agility =  data.battleViewInfo.heros[locationA].agility;
	battleInfo.heroInfo[locationA].hp =  data.battleViewInfo.heros[locationA].hp;
	battleInfo.heroInfo[locationA].mp =  data.battleViewInfo.heros[locationA].mp;
	battleInfo.heroInfo[locationB].force =  data.battleViewInfo.heros[locationB].heroForce;
	battleInfo.heroInfo[locationB].strategy =  data.battleViewInfo.heros[locationB].strategy;
	battleInfo.heroInfo[locationB].physique =  data.battleViewInfo.heros[locationB].physique;
	battleInfo.heroInfo[locationB].agility =  data.battleViewInfo.heros[locationB].agility;
	battleInfo.heroInfo[locationB].hp =  data.battleViewInfo.heros[locationB].hp;
	battleInfo.heroInfo[locationB].mp =  data.battleViewInfo.heros[locationB].mp;
	//显示伤害和治疗
	var resultString = "小回合清算:   ";
	var hurt1 = data.battleViewInfo.heros[locationA].hurt;
	var hurtType1 = data.battleViewInfo.heros[locationA].hurtType;
	if(hurt1>0){//为治疗
		resultString+=battleInfo.heroInfo[locationA].name+"受到治疗 "+hurt1;
	}else if(hurt1<0){//为伤害
		if(hurtType1==1){
			resultString+=battleInfo.heroInfo[locationA].name+"受到伤害 "+hurt1;
		}else if(hurtType1==2){
			resultString+=battleInfo.heroInfo[locationA].name+"受到伤害 "+hurt1+" 吸收";
		}
	}
	var hurt2 = data.battleViewInfo.heros[locationB].hurt;
	var hurtType2 = data.battleViewInfo.heros[locationB].hurtType;
	if(hurt2>0){//为治疗
		resultString+=";  "+battleInfo.heroInfo[locationB].name+"受到治疗 "+hurt2;
	}else if(hurt2<0){//为伤害
		if(hurtType2==1){
			resultString+=";  "+battleInfo.heroInfo[locationB].name+"受到伤害 "+hurt2;
		}else if(hurtType2==2){
			resultString+=";  "+battleInfo.heroInfo[locationB].name+"受到伤害 "+hurt2+" 吸收";
		}
	}
	
	console.log(resultString);
	//重绘
	writeData();
}


function delay(){//假设播放动画延时，延时1秒
	viewEndForSingleBattle(Number($('#battleId').val()));
	clearInterval(s);
}
//回合转换接口，即轮到自己操作时
	function battleTurn(data){
		var attackButton = document.getElementById("attackButton");
		var escapeButton = document.getElementById("escapeButton");
		if(data.canOperate){
			attackButton.disabled="";
			escapeButton.disabled="";
			var skills = data.operateSkill;
			createSkillButton(skills);
			//console.log(data);
		}else{
			document.getElementById("time").innerHTML = "";
			attackButton.disabled="disabled";
			escapeButton.disabled="disabled";
			var skills = document.getElementById("skillDiv").childNodes
			for ( var i = 0; i < skills.length; i++) {
				document.getElementById("skillDiv").removeChild(skills[i]);
				i--;
			}
		}
	}
	function createSkillButton(skills){
		var skillDiv = document.getElementById("skillDiv");
		for ( var i = 0; i < skills.length; i++) {
		    var button =	document.createElement("button");
		    button.id = "skill"+i;
		   // console.log(skills[i].skillName);
		    button.innerHTML=skills[i].skillName;
		    button.value=i;
		    button.onclick=skillAttack;
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
	//回合结束回调
function battleEnd(data){
	if(	data.isWin){
		console.log("胜利");
	}else{
		console.log("失败");
	}
}
	//回合计时回调
function battleRoundTime(data){
	document.getElementById("time").innerHTML = data;
	//console.log(data);
}
	function battleAutoAttack(data){
			var autoAttackButton = document.getElementById("autoAttackButton");
		if(data.autoAttack){
			autoAttackButton.innerHTML = "手动攻击";
		}else{
			autoAttackButton.innerHTML = "自动攻击";
		}
		console.log(data);
	}





////////接口部分///////////////////////
	
	//开启战场接口
function beginSingleBattle(battleJobQueueId,battleView,battleTurn,battleEnd,battleRoundTime,battleAutoAttack){

	battleSubScribeMine = $.cometd.subscribe('/battleSystem/'+battleJobQueueId,function(cometData){
		var battleMessageType = cometData.data.battleMessageType;
		var battleMessageData = cometData.data.battleMessageData;
		console.log(battleMessageData);
		switch (battleMessageType) {
		case 1:
			battleTurn(battleMessageData);
			break;
		case 2:
			battleEnd(battleMessageData);
			cometd.unsubscribe(battleSubScribe);
			cometd.unsubscribe(battleSubScribeMine);
			break;
		case 3:
			battleRoundTime(battleMessageData);
			break;
		case 4:
			battleAutoAttack(battleMessageData);
			break;
		case 5:
			battleView(battleMessageData);
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
				$.ajaxPost('<%=path %>/beginSingleBattle',{battleJobQueueId:battleJobQueueId},function(data){
					console.log("删除监听器");
					cometd.removeListener(battleListener);
				});
			}
		}
	});
}
//普通攻击接口
function normalAttackForSingleBattle(battleJobQueueId){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'1' });
}
//自动攻击接口
function autoAttackForSingleBattle(battleJobQueueId){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'2'});
}
//逃跑接口
function escapeForSingleBattle(battleJobQueueId){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'3'});
}
//释放技能接口
function skillForSingleBattle(battleJobQueueId,skillIndex){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'4',skillIndex:Number(skillIndex)});
}
//播放完动画接口
function viewEndForSingleBattle(){
	$.cometd.publish('/service', { battleId: Number($('#battleId').val()),channelType:'5'});
}
</script>
</head>
<body id="body" onload="init()">
<table><tr>
	<td><input id="battleId">
<button onclick="connectComet()">连接服务器</button>
<button id="enterBattle" onclick="enterBattle()">进入</button>
<button onclick="startBattle()">开启战斗</button></td>
</tr>
</table>
<div id="heroInfo">
<table border="">
	<tr><td colspan="2" align="center">当前回合</td><td colspan="2" align="center" id="rounds"></td></tr>
	<tr><td colspan="4" align="center">A位置武将</td></tr>
	<tr><td width="80px">武将名:</td><td id="heroName1"width="150px"></td><td width="80px">武将等级:</td><td id="heroLevel1" width="150px"></td></tr>
	<tr><td>武将图标</td><td id="heroIcon1"></td><td>武将小图标</td><td id="smallHeroIcon1"></td></tr>
	<tr><td>血</td><td id="hp1"></td><td>蓝</td><td id="mp1"></td></tr>
	<tr><td>武力</td><td id="heroForce1"></td><td>谋略</td><td id="stategy1"></td></tr>
	<tr><td>身法</td><td id="agility1"></td><td>体质</td><td id="physique1"></td></tr>
	<tr><td>buff</td><td id="buff1"></td><td>debuff</td><td id="debuff1"></td></tr>
	<tr><td colspan="4" align="center">B位置武将</td></tr>
	<tr><td>武将名:</td><td id="heroName2"></td><td>武将等级:</td><td id="heroLevel2"></td></tr>
	<tr><td>武将图标</td><td id="heroIcon2"></td><td>武将小图标</td><td id="smallHeroIcon2"></td></tr>
	<tr><td>血</td><td id="hp2"></td><td>蓝</td><td id="mp2"></td></tr>
	<tr><td>武力</td><td id="heroForce2"></td><td>谋略</td><td id="stategy2"></td></tr>
	<tr><td>身法</td><td id="agility2"></td><td>体质</td><td id="physique2"></td></tr>
	<tr><td>buff</td><td id="buff2"></td><td>debuff</td><td id="debuff2"></td></tr>
<tr><td>操作</td><td id="time"></td><td colspan="2"><button id="attackButton" onclick="attack()" disabled="disabled">攻击</button><button id="autoAttackButton" onclick="autoAttack()">自动攻击</button><button id="escapeButton" onclick="escape()" disabled="disabled">逃跑</button><button onclick="attack()">攻击</button></td></tr>
</table>
</div>
<div id="skillDiv"></div>
</body>
</html>