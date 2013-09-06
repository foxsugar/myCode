<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>test</title>
<script type="text/javascript" src="<%=path %>/js/client/jquery.js"></script>
<script type="text/javascript" src="<%=path %>/js/severDataInterface/dataCometd.js"></script>
<script type="text/javascript" src="<%=path %>/js/client/jquery.cometd.js"></script>
<script type="text/javascript">
	var cometd=$.cometd;
	var battleId;
	var mineId;
	var targetId;
	var battleSubScribe;
	function forwardLocal(){
		$("#box").animate({left:"30px",top:"50px"},5000);
	}
	function test2(){
		cometd.configure({url:"http://172.17.4.115:8080/wok/cometd"});
		cometd.handshake();
		subscript(test);
	}
	function getSessionId(){
			var cookies = document.cookie.split(";");
			for(var i=0;i<cookies.length;i++){
					var temp = cookies[i].split("=");
					if(temp[0]="JSESSIONID"){
							return temp[1];
						}
					
				}
		}
	function attack(){
		cometd.publish('/service', { battleId: battleId,channelType:'1',charId:Number('${character.charId}'),actionId:mineId,targetId:targetId });

	}
	function escape(){
		cometd.publish('/service', { battleId: battleId,channelType:'3',charId:Number('${character.charId}')});

	}
	function autoAttack(){
		cometd.publish('/service',{battleId:battleId,channelType:'2',charId:Number('${character.charId}')});
	}
	function test(){
		$.ajaxPost('<%=path %>/enterBattle',{battleJobQueueId:battleJobQueueId});
	}
	var temp;
	function testTime(){
		cometd.configure({url:"http://172.17.4.107:8080/wok/cometd"});
		cometd.handshake();
		var subscription1 = cometd.addListener('/meta/handshake', function(message) {
			if(message.successful){
				console.log("已连接服务器");
				var subscription2 = cometd.subscribe('/gameSystem/time',function(a){
					console.log(a.data.time);
				});
			}
		});
	}
	function subscript(test){
		var subscription1 = cometd.addListener('/meta/handshake', function(message) {
			if(message.successful){
				console.log("已连接服务器");
				cometd.addListener('/meta/subscribe', function(message){
					console.log("aaaaaaaaaaaaaa");
					if(message.successful){
						console.log("收到订阅成功");
	//					if(subscription=='/battleSystem/'+battleJobQueueId+'/'+charId){
//							$.ajaxPost('beginSingleBattle',{battleJobQueueId:battleJobQueueId});
	//					}
					}
				});
				var subscription2 = cometd.subscribe('/gameSystem/'+'${character.charId}',function(cometData){
					var systemType = cometData.data.systemType;
					switch (systemType) {
					case 1:
						var data = cometData.data.systemData;
						battleId = cometData.data.systemData.battleInfo;
						$.ajaxPost('<%=path %>/enterBattle',{battleJobQueueId:battleId},function(data){
							mineId = data.heroData.mine.id
							targetId = data.heroData.target.id;
							console.log("进入战场");
							battleSubScribe = cometd.subscribe('/battleSystem/'+cometData.data.systemData.battleInfo,function(cometData){
								console.log(cometData.data);
							});
							battleSubScribeMine = cometd.subscribe('/battleSystem/'+cometData.data.systemData.battleInfo+"/"+'${character.charId}',function(cometData){
								var battleMessageType = cometData.data.battleMessageType;
								var battleMessageData = cometData.data.battleMessageData;
								switch (battleMessageType) {
								case 1:
									if(battleMessageData.canOperate==true){
										var button1  = document.getElementById("attack");
										var button2  = document.getElementById("escape");
										button1.disabled="";
										button2.disabled="";
									}else{
										var button1  = document.getElementById("attack");
										var button2  = document.getElementById("escape");
										button1.disabled="disabled";
										button2.disabled="disabled";
									}
									console.log(battleMessageData);
									break;
								case 2:
									console.log("aaaaaaaaaa");
									console.log(battleMessageData);
									console.log("战斗结束");
									cometd.unsubscribe(battleSubScribe);
									break;
								case 3:
									console.log("剩余时间："+battleMessageData);
									break;
								case 4:
									if(battleMessageData.autoAttack==true){
										console.log("自动攻击");
										var autoButton = document.getElementById("autoAttack");
										autoButton.innerHtml = "自动攻击";
									}else{
										console.log("手动攻击");
										var autoButton = document.getElementById("autoAttack");
										autoButton.innerHtml = "手动攻击";
									}
									break;

								default:
									break;
								}
							});
							$.ajaxPost('<%=path %>/beginSingleBattle',{battleJobQueueId:battleId},function(){
								console.log("开始战斗");
							});
						});
						
						break;
					case 2:
				
						break;
					case 3:
					
						break;
					default:
						break;
					}
					temp=a.data.systemData.BattleInfo;
					//alert("可进入战场");
					//console.log("aaaaaaaaaaa");
				});
			}
		});
	}
	function configSoldier(){
		var param1 = new Array();
		param1.push($("#hero1").val());
		param1.push($("#hero2").val());
		param1.push($("#hero3").val());
		param1.push($("#hero4").val());
		param1.push($("#hero5").val());
		var paramString1 = "";
		for ( var i = 0; i < param1.length; i++) {
			paramString1+=param1[i];
			if(i+1!=param1.length){
				paramString1+=",";
			}
		}
		var param2 = new Array();
		param2.push($("#soldierId1").val());
		param2.push($("#soldierId2").val());
		param2.push($("#soldierId3").val());
		param2.push($("#soldierId4").val());
		param2.push($("#soldierId5").val());
		var paramString2 = "";
		for ( var i = 0; i < param2.length; i++) {
			paramString2+=param2[i];
			if(i+1!=param2.length){
				paramString2+=",";
			}
		}
		var param3 = new Array();
		param3.push($("#amount1").val());
		param3.push($("#amount2").val());
		param3.push($("#amount3").val());
		param3.push($("#amount4").val());
		param3.push($("#amount5").val());
		var paramString3 = "";
		for ( var i = 0; i < param3.length; i++) {
			paramString3+=param3[i];
			if(i+1!=param3.length){
				paramString3+=",";
			}
		}
		$.ajaxPost("<%=path%>/configSoldier",{userHeroIdList:paramString1,soldierIdList:paramString2,amountList:paramString3},callBack);
	}
	function callBack(){
		console.log(paramString);
	}
	function treatHero(){
		var param = new Array();
		param.push($("#hero1").val());
		param.push($("#hero2").val());
		param.push($("#hero3").val());
		param.push($("#hero4").val());
		param.push($("#hero5").val());
		var paramString = "";
		for ( var i = 0; i < param.length; i++) {
			paramString+=param[i];
			if(i+1!=param.length){
				paramString+=",";
			}
		}
		$.ajaxPost("<%=path%>/treatHero",{heroParamList:paramString},callBack);
	}
	function callBack(){
		console.log(paramString);
	}
	function test1(){
		alert("aaaaaaaaaa");
	}

	function selectBattleQueue(){
		$.ajaxPost("<%=path%>/selectBattleQueue",{searchType:$("#searchType").val(),page:$("#page").val()},function(data){
			console.log("剩余时间："+data);
		});
	}
	function comeBack(){
		console.log($("#battleJobQueueId").val());
		$.ajaxPost("<%=path%>/comeBackBattleQueue",{battleJobQueueId:$("#battleJobQueueId").val()},function(data){
			console.log("剩余时间："+data);
		});
	}
	function ttt(){
		$.ajaxPost("<%=path%>/RefreshServerTime",function(){
			console.log("aaaaaaaa");
			});

		}
	function testInt(){
		alert(parseInt(1.8));	
	}
	
</script>
</head>
<body>
	<button type="button" onclick="test2()">连接</button>
	<div id="box" style="background:#853;height:30px;width:30px;position:relative">停
</div>
<button onclick="javascript:window.location='<%=path%>/getUserArrayInfo'">阵</button> 
<button onclick="javascript:window.location='<%=path%>/getMonsterInfo'">怪</button> 
<button onclick="javascript:window.location='<%=path%>/getUserHeroForChoose'">换将</button> 
<button onclick="javascript:window.location='<%=path%>/getHeroSoldierInfo'">配兵</button> 
<input id="hero1" value="0">
<input id="hero2" value="0">
<input id="hero3" value="0">
<input id="hero4" value="0">
<input id="hero5" value="0">
<button onclick="treatHero()">医疗</button>
兵<input id="soldierId1" value="0">
<input id="soldierId2" value="0">
<input id="soldierId3" value="0">
<input id="soldierId4" value="0">
<input id="soldierId5" value="0">
数<input id="amount1" value="0">
<input id="amount2" value="0">
<input id="amount3" value="0">
<input id="amount4" value="0">
<input id="amount5" value="0">
<button onclick="configSoldier()">医疗</button>
<form action="<%=path%>/getMonsterInfoByMonsterId" method="post">
<input id="monsterId" name="monsterId">
<button type="submit">怪物奖励</button>
</form>
<form action="<%=path%>/getReadyToBattle" method="post">
战斗类型:<input id="battleType" name="battleType">
武将:<input id="heroList" name="heroList">
目标类型:<input id="targetType" name="targetType">
目标Id:<input id="targetId" name="targetId">
阵法Id:<input id="arrayId" name="arrayId">
<button type="submit">出征</button>
</form>
<input id="page" name="page">
<input id="searchType" name="searchType">
<button type="button" id="button2" onClick="selectBattleQueue()">军情</button>
<div id="div1">
	<button id="attack" onclick="attack()">普通攻击</button>
	<button id="autoAttack"  onclick="autoAttack()">自动攻击</button>
	<button id="escape" disabled="disabled"  onclick="escape()">逃跑</button>
</div>
<input id="battleJobQueueId" name="battleJobQueueId">
<button type="button" onclick="comeBack()">召回</button>
<button type="button" onclick="testTime()">时间测试</button>
<button type="button" onclick="ttt()">开始</button>
<button type="button" onclick="testInt()">开始</button>
</body>
</html>