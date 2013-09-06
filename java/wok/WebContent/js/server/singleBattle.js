/////////////////////单挑相关//////////////////////////

//战场频道订阅
//var SingleBattle={
//		
//}
var singleBattle = {};
var battleSubScribe;
//var battleSubScribeMine;
var battleListener = null;

singleBattle.enterBattle =  function (battleJobQueueId,callBack){
	$.ajaxPost('enterBattle',{battleJobQueueId:battleJobQueueId},callBack);
};
singleBattle.beginSingleBattle = function (charId,battleJobQueueId,battleView,battleTurn,battleEnd,battleRoundTime,battleAutoAttack){

	battleSubScribe = $.cometd.subscribe('/battleSystem/'+battleJobQueueId,function(cometData){
//		battleView(cometData.data.battleMessageData);
		var battleMessageType = cometData.data.battleMessageType;
		var battleMessageData = cometData.data.battleMessageData;
		switch (battleMessageType) {
		case 1:
			battleTurn(battleMessageData);
			break;
		case 2:
			battleEnd(battleMessageData);
			$.cometd.unsubscribe(battleSubScribe);
//			cometd.unsubscribe(battleSubScribeMine);
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

	battleListener = $.cometd.addListener('/meta/subscribe', function(message){
		if(message.successful){
			console.log("收到订阅成功");
			console.log(message.subscription);
			if(message.subscription=='/battleSystem/'+battleJobQueueId){
				console.log("战斗开启");
				$.ajaxPost('beginSingleBattle',{battleJobQueueId:battleJobQueueId},function(data){
					if(battleListener){
						console.log("删除监听器");
						$.cometd.removeListener(battleListener);
					}else{
						console.log("删除监听失败");
					}
				});
			}
//			if(message.subscription=='/battleSystem/'+battleJobQueueId){
//				battleSubScribeMine = $.cometd.subscribe('/battleSystem/'+battleJobQueueId+"/"+charId,function(cometData){
//					var battleMessageType = cometData.data.battleMessageType;
//					var battleMessageData = cometData.data.battleMessageData;
//					console.log("服务器推");
//					switch (battleMessageType) {
//					case 1:
//						battleTurn(battleMessageData);
//						break;
//					case 2:
//						battleEnd(battleMessageData);
//						cometd.unsubscribe(battleSubScribe);
//						cometd.unsubscribe(battleSubScribeMine);
//						break;
//					case 3:
//						battleRoundTime(battleMessageData);
//						break;
//					case 4:
//						battleAutoAttack(battleMessageData);
//						break;
//					case 5:
//						battleView(battleMessageData);
//						break;
//
//					default:
//						break;
//					}
//				});
//			}
		}
	});
};
singleBattle.normalAttackForSingleBattle = function (battleJobQueueId,charId,actionId,targetId){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'1',charId:charId,actionId:actionId,targetId:targetId });
};
//自动攻击
singleBattle.autoAttackForSingleBattle = function (battleJobQueueId,charId){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'2',charId:charId});
};
singleBattle.escapeForSingleBattle = function (battleJobQueueId,charId){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'3',charId:charId});
};
//释放技能接口
singleBattle.skillForSingleBattle = function (battleJobQueueId,skillIndex){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'4',skillIndex:Number(skillIndex)});
};
//播放完动画接口
singleBattle.viewEndForSingleBattle = function (battleJobQueueId){
	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'5'});
};