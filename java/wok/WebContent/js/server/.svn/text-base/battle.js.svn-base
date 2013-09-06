//////////////////////////////////////////////////////////
////////////////////所有战斗相关////////////////////////
//////////////////////////////////////////////////////////

var battle = {};

/******************练兵场相关************************/
//获取野外势力信息
battle.getMonsterInfo = function(forceLevel,page,callBack){
	$.ajaxPost("getMonsterInfo",{forceLevel:forceLevel,page:page},callBack);
};
//获取具体的野外势力信息
battle.getSpecificMonster = function(enemyNo,callBack){
	$.ajaxPost("getSpecificMonster",{enemyNo:enemyNo},callBack);
};
//获取敌对势力信息
battle.getEnemyInfo = function(page,callBack){
	$.ajaxPost("getEnemyInfo",{page:page},callBack);
};
//获取敌对势力奖励信息
battle.getBattleReward = function(enemyNo,callBack){
	$.ajaxPost("getBattleReward",{enemyNo:enemyNo},callBack);
};
//获取武将信息列表，用于选择要出征的武将
battle.getUserHeroForBattle = function(page,callBack){
	$.ajaxPost("getUserHeroForBattle",{page:page},callBack);
};
//获取选择后用于出征的武将信息
battle.getUserHeroInfoAfterSelect = function(ids,battleType,callBack){
	$.ajaxPost("getUserHeroInfoAfterSelect",{ids:ids,battleType:battleType},callBack);
};
//治疗选择的武将
battle.cureSelectUserHero = function(ids,callBack){
	$.ajaxPost("cureSelectUserHero",{ids:ids},callBack);
};
//获取用于阵法
battle.getUserFormations = function(callBack){
	$.ajaxPost("getUserFormations",callBack);
};
//获取用户武将配兵信息，用于配兵
battle.getHeroSoldierInfo = function(callBack){
	$.ajaxPost("getHeroSoldierInfo",callBack);
};
//配兵操作接口
battle.configSoldier = function(userHeroIds,soldierNos,amounts,callBack){
	$.ajaxPost("configSoldier",{userHeroIds:userHeroIds,soldierNos:soldierNos,amounts:amounts},callBack);
};
//配兵全部清空操作
battle.putOffAllSoldier = function(callBack){
	$.ajaxPost("putOffAllSoldier",callBack);
};
//配兵全部补满操作
battle.putOnAllSoldier = function(userHeroIds,soldierNos,callBack){
	$.ajaxPost("putOnAllSoldier",{userHeroIds:userHeroIds,soldierNos:soldierNos},callBack);
};
//出征操作接口
battle.getReadyToBattle = function(battleType,userHeroIdString,targetType,targetId,formationNo,callBack){
	$.ajaxPost("getReadyToBattle",{battleType:battleType,userHeroIdString:userHeroIdString,targetType:targetType,targetId:targetId,formationNo:formationNo},callBack);
};

/*******************军情相关*****************************************/
//获取军情队列默认接口
battle.selectBattleQueueDefault = function(callBack){
	$.ajaxPost("selectBattleQueueDefault",callBack);
};
//获取军情接口，按类型和页数
battle.selectBattleQueue = function(page,searchType,callBack){
	$.ajaxPost("selectBattleQueue",{page:page,searchType:searchType},callBack);
};
//召回部队
battle.callBackBattleQueue = function(battleJobQueueId,page,searchType,callBack){
	$.ajaxPost("callBackBattleQueue",{battleJobQueueId:battleJobQueueId,page:page,searchType:searchType},callBack);
};

//城郊撤退部队
battle.retreatBattleQueue = function(battleQueueId,callBack){
	$.ajaxPost("retreatBattleQueue",{battleQueueId:battleQueueId},callBack);
};

/**
 * 城郊开始发动攻击
 * 参战行军队伍1id：battleQueueId(如果是君主参战-君主id)
 * 参战行军队伍2id：battleQueueId2(如果是君主参战-君主id)
 */
battle.beginBattleAttack = function(battleQueueId,battleQueueId2,callBack){
	$.ajaxPost("beginBattleAttack",{battleQueueId:battleQueueId,battleQueueId2:battleQueueId2},function(data){
		callBack(data);
		multiBattle.battleJobQueueId = battleQueueId<0?battleQueueId2:battleQueueId;
		multiBattle.battleId = data.battleId;
	});
};
/**
 * 查看君主郊区等待军队队列信息列表
 * 被围攻君主id
 */
battle.getWaitBattleInfo = function(targetId,callBack){
	$.ajaxPost("getWaitBattleInfo",{targetId:targetId},callBack);
};

/**
 * 行军加速
 * speedType 加速类型1点卷，2：金锭3道具
 * itemNo 使用加速物品道具编号
 * confim：0弹出公共加速窗口，1：直接加速
 */
battle.speedUpBattleQueue = function(battleJobQueueId,page,searchType,speedType,itemNo,confim,callBack){
	$.ajaxPost("speedUpBattleQueue",{battleJobQueueId:battleJobQueueId,page:page,searchType:searchType,speedType:speedType,itemNo:itemNo,confim:confim},callBack);
};

/**
 *根据行军编号查看城郊军队的详细武将列表
 *battleQueueId 行军队伍id（如果要看君主（守城）的信息用负数君主ID即-君主id）
 *confim确认按钮，0默认和1确认  注意根据返回数据情况取值status，如果status为0则不再显示侦查菜单
 */
battle.getBattleHeros=function(battleQueueId,confim,callBack){
	$.ajaxPost('getBattleHeros',{battleQueueId:battleQueueId,confim:confim},callBack);
};
battle.getNeedBattleTime=function(targetId,callBack){
	$.ajaxPost('getNeedBattleTime',{targetId:targetId},callBack);
};

//采集按钮
battle.isCollection=function(x,y,callBack){
	$.ajaxPost("isCollection",{x:x,y:y},callBack);
};
//采集验证武将
battle.verificationHero=function(heroId,callBack){
	$.ajaxPost("verificationHero",{heroId:heroId},callBack);
};
//确认采集
battle.collection=function(heroId,x,y,callBack){
	$.ajaxPost("collection",{heroId:heroId,x:x,y:y},callBack);
};


