var multiBattle = {};
multiBattle.battleJobQueueId = 0;
multiBattle.battleId = "";

//data.roundNum,//回合数
//data.mineIcon,//己方君主图标
//data.mineLevel,//己方君主等级
//data.mineCountry,//己方君主国家
//data.targetIcon,//对方，可能没有
//data.targetLevel,//对方，可能没有
//data.targetCountry,//对方，可能没有

//	data.target[i].locationId,	//位置Id，为本地数据的身份标识
//	data.target[i].mp,//军团mp
//	data.target[i].mpMax,	//mp最大值
//	data.target[i].soldierName,	//士兵名称
//	data.target[i].soldierType,	//士兵类型
//	data.target[i].heroName,	//武将名称
//	data.target[i].heroLevel,//武将等级
//	data.target[i].heroIcon,	//武将图标
//	data.target[i].smallHeroIcon,//武将小图标
//	data.target[i].soldierAmount,	//士兵数量
//	data.target[i].soldierAmountMax,	//士兵数量最大值
//	data.target[i].orderNum,	//出手顺序
//	data.target[i].locationX,	//X坐标
//	data.target[i].locationY,	//y坐标
//	data.target[i].criticalStrike,	//暴击率
//	data.target[i].dodge,	//闪避率
//	data.target[i].hit,	//命中率
//	data.target[i].defence,//防御	
//	data.target[i].attack,	//攻击
//	data.target[i].mobility,	//行动力
//	data.target[i].flag,//旗帜
//	data.target[i].buff,//增益效果
//	data.target[i].debuff,//减益效果
//	data.target[i].defenceStatus,//是否处于防御状态
// data.target[i].skills, 技能数组
					//	skills[i].skillName,
					//	skills[i].skillIcon,
					//	skills[i].name,
					//	skills[i].level,
					//	skills[i].needVnp,
					//	skills[i].coolDown,
					//	skills[i].description,
multiBattle.getMultiBattleInfo = function(callBack){
	$.ajaxPost('enterMultiBattle',{battleJobQueueId:multiBattle.battleJobQueueId},function(data){
		callBack(data);
		multiBattle.battleId = data.battleId;
	});
	
};

multiBattle.beginSingleBattle = function (){
	if(typeof(multiBattle.multiBattleSubScribeMine)!="undefined"){
		$.cometd.unsubscribe(multiBattle.multiBattleSubScribeMine);
	}
	multiBattle.multiBattleSubScribeMine = $.cometd.subscribe('/battleSystem/'+multiBattle.battleId,function(cometData){
		var battleMessageType = cometData.data.battleMessageType;
		var battleMessageData = cometData.data.battleMessageData;
		console.log(battleMessageType+"-----------"+new Date());
		console.log(battleMessageData);
		switch (battleMessageType) {
//		case 1:
//			//data.isNewRound是否是新回合
//			battleStart(battleMessageData);
//			break;
		case 2:
			//data.roundNum回合数
			//data.order//出手顺序,数组
				//order[i].locationId//军团位置Id，军团标识
				//order[i].orderNum//出手顺序编号
			//data.defenceWork城防伤害，目前为null
			//data.buffEffect持续性效果影响,数组
					//buffEffect[i].locationId//军团位置Id，军团标识
					//buffEffect[i].effectType//影响类型，1普通，2吸收
					//buffEffect[i].effectValue//影响值，带正负号
					//buffEffect[i].isDead//军团是否死亡
					
					
			//data.soldierUpdate//军团信息更新，数组
			//soldierUpdate[i].locationId//军团位置Id，军团标识
			//soldierUpdate[i].attack//军团攻击
			//soldierUpdate[i].defence//军团防御
			//soldierUpdate[i].dodge//军团闪避
			//soldierUpdate[i].criticalStrike//军团暴击
			//soldierUpdate[i].hit//军团命中
			//soldierUpdate[i].mobility//军团行动力
			//soldierUpdate[i].soldierAmount//军团当前兵数
			//soldierUpdate[i].buff//军团增益效果，数组
					//buff[i].description效果描述
					//buff[i].buffIcon效果图标
					//buff[i].buffAnomin效果动画，可能没用
					//buff[i].remainRound剩余回合数
			//soldierUpdate[i].debuff//军团减益效果，数组，结构同上
			battlefield.model.battleStart(battleMessageData);
			break;
		case 3:
			//data.locationId操作人id
			//data.operateSkill操作技能，数组
					//operateSkill[i].canUse技能是否可用
					//operateSkill[i].remainRound技能剩余冷却回合数
			battlefield.model.battleTurn(battleMessageData);
			break;
//		case 4:
//			//返回数组，即可攻击的locationId
//			battleTargetSelect(battleMessageData);
//			break;
		case 5:
			//数字，显示操作剩余时间
			battlefield.model.battleTime(battleMessageData);
//			battleTime(battleMessageData);
			break;
//		case 6:
//			//data.autoAttack自动攻击状态true 自动，false 手动
//			battleAutoAttack(battleMessageData);
//			break;
		case 7:
			//data.battleViewType//动画类型，1普通攻击，2技能攻击,按类型取数据
			
			/******以下为攻击，和技能的数据结构******/
				//1普通攻击数据
			//data.battleViewResult目标结果，1命中，2暴击，3闪避，4未命中，5免疫
			//data.battleViewInfo.attackPersonId攻击人id（locationId）
			//data.battleViewInfo.defencePersonId被攻击人id（locationId）
			//data.battleViewInfo.defencePersonHurtType伤害类型，1普通直接显示值，2吸收
			//data.battleViewInfo.defenceAmountHurt目标伤害值，可正可负
			//data.battleViewInfo.isDefenceDead被攻击人是否死亡
			
				//2技能攻击数据
			//data.battleViewInfo.skillName技能名称
			//data.battleViewInfo.skillerAnimation技能动画
			//data.battleViewInfo.skillerExpend技能消耗
			//data.battleViewInfo.skillerId施放技能人Id（locationId）
			//data.battleViewInfo.targets目标人，数组
											//targets[i].battleViewResult目标结果，1命中，5免疫，技能只有这两个状态
											//targets[i].locationId目标Id
											//targets[i].targetInfo目标信息，用于更新，结构同准备回合，军团更新数组元素相同，如果免疫状态，没有此字段
											//targets[i].battleHurtInfo目标伤害信息，如果免疫没有此字段
											//targets[i].battleHurtInfo.effectValue目标伤害值，可正可负
											//targets[i].battleHurtInfo.effectType目标伤害类型，1普通，直接显示值，2吸收
											//targets[i].battleHurtInfo.isDead目标是否死亡
									
			
			
			battlefield.model.battleView(battleMessageData);
			break;
		case 8:
			//data.locationId军团位置Id
			//data.defenceStatus防御状态
//			battleDefence(battleMessageData);
			battlefield.model.battleDefence(battleMessageData);
			break;
		case 9://战斗结束
			//data.isWin是否胜利
			//data.reward奖励
//			battleEnd(battleMessageData);
			console.log("战斗结束");
			battlefield.battleResult(battleMessageData.isWin);
			break;
	
		default:
			break;
		}
	});
	multiBattle.battleListener = $.cometd.addListener('/meta/subscribe', function(message){
		console.log("aaaaaaaaaaaaaa");
		if(message.successful){
			console.log("收到订阅成功");
			console.log(message.subscription);
			if(message.subscription=='/battleSystem/'+multiBattle.battleId){
				console.log("战斗开启");
				$.ajaxPost('beginMultiBattle',{battleJobQueueId:multiBattle.battleJobQueueId},function(data){
					console.log("删除监听器");
					$.cometd.removeListener(multiBattle.battleListener);
				});
			}
		}
	});
};
//普通攻击选择目标接口
multiBattle.normalAttackForMultiBattle = function (callBack){
	$.ajaxPost("normalAttackForMultiBattle",{battleJobQueueId:multiBattle.battleId},callBack,true);
//	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'10' });
};
//普通攻击攻击目标接口
multiBattle.attackTargetForMultiBattle = function (locationId,callBack){
	$.ajaxPost("attackTargetForMultiBattle",{battleJobQueueId:multiBattle.battleId,locationId:locationId},callBack,true);
//	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'11',locationId:locationId });
};
//自动攻击接口
multiBattle.autoAttackForMultiBattle = function (callBack){
	$.ajaxPost("autoAttackForMultiBattle",{battleJobQueueId:multiBattle.battleId},callBack,true);
//	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'12'});
};
//释放技能选择目标接口
multiBattle.skillForMultiBattle = function (skillIndex,callBack){
	$.ajaxPost("skillForMultiBattle",{skillIndex:skillIndex,battleJobQueueId:multiBattle.battleId},callBack,true);
//	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'15',skillIndex:Number(skillIndex)});
};
//释放技能攻击目标接口
multiBattle.skillAttackForMultiBattle = function (skillIndex,locationId,callBack){
	$.ajaxPost("skillAttackForMultiBattle",{battleJobQueueId:multiBattle.battleId,skillIndex:skillIndex,locationId:locationId},callBack,true);
//	$.cometd.publish('/service', { battleId: battleJobQueueId,channelType:'16',skillIndex:Number(skillIndex), locationId:locationId });
};
//防御接口
multiBattle.defenceForMultiBattle = function (){
	$.cometd.publish('/service', { battleId: multiBattle.battleId,channelType:'13'});
};
//逃跑接口
multiBattle.escapeForMultiBattle = function (){
	$.cometd.publish('/service', { battleId: multiBattle.battleId,channelType:'14'});
};
//播放完动画接口
multiBattle.viewEndForMultiBattle = function (){
	$.cometd.publish('/service', { battleId: Number($('#battleIdInput').val()),channelType:'17'});
};