//主城内建筑功能
var BuildingFunction = {};

/***** 民居 *****/
//初始化民居
BuildingFunction.initHouse = function (callBack) {
	$.ajaxPost('initHouse', callBack);
};
/**
 * 增加人口
 * speedType选择方式，0无选择，1点卷，2金锭，3道具
 * itemNo 选择使用道具编号，无0
 * confim是否确定当前操作，0弹出对话框，1确定操作
 */
BuildingFunction.addPeople = function (speedType,itemNo,confim,callBack) {
	$.ajaxPost('maincity/addPeople',{speedType:speedType,itemNo:itemNo,confim:confim}, callBack,true);
};

/**
 * 增加民心
 * speedType选择方式，0无选择，1点卷，2金锭，3道具
 * itemNo 选择使用道具编号，无0
 * confim是否确定当前操作，0弹出对话框，1确定操作
 */
BuildingFunction.addPopularSupport = function (speedType,itemNo,confim,callBack) {
	$.ajaxPost('maincity/addPopularSupport',{speedType:speedType,itemNo:itemNo,confim:confim}, callBack,true);
};




/***** 地窖 *****/
//初始化地窖界面
BuildingFunction.initCellar = function (callBack) {
	$.ajaxPost('initCellar', callBack);
};

//开启地窖资源保护
BuildingFunction.beginCellarProtect = function (protectionNo,callBack) {
	$.ajaxPost("beginCellarProtect", {protectionNo:protectionNo}, callBack);
};
	
//取消地窖资源保护
BuildingFunction.cancelCellarProtect = function (protectionNo,callBack) {
	$.ajaxPost('cancelCellarProtect',{protectionNo:protectionNo}, callBack);
};
//回调函数
BuildingFunction.getCellarProtect =function(protectionNo,callBack){
	$.ajaxPost('getCellarProtect',{protectionNo:protectionNo},callBack);
};

/*********国库********/
//获取所有物品
BuildingFunction.getAllArticles = function(callBack){
	$.ajaxPost('getAllArticles',callBack);
};
//获取所有装备
BuildingFunction.getAllEquipment = function(callBack){
	$.ajaxPost('getAllEquipment',callBack);
};
//获取所有道具
BuildingFunction.getAllUserItem = function(callBack){
	$.ajaxPost('getAllUserItem',callBack);
};
//获取所有材料
BuildingFunction.getAllMaterial = function(callBack){
	$.ajaxPost('getAllMaterial',callBack);
};
//获取所有任务物品
BuildingFunction.getAllQuests = function(callBack){
	$.ajaxPost('getAllQuests',callBack);
};
//丢弃国库内物品
BuildingFunction.deleteUserItem = function(id,itemType,callBack){
	$.ajaxPost('deleteUserItem',{id:id,itemType:itemType},callBack);
};
//出售国库内物品
BuildingFunction.sellItem = function(id,itemType,callBack){
	$.ajaxPost('sellItem',{id:id,itemType:itemType},callBack);
};
//整理国库内物品
BuildingFunction.tidyBag = function(callBack){
	$.ajaxPost('tidyBag',callBack);
};
//使用道具接口
BuildingFunction.useItem = function( id, amount, callBack){
	$.ajaxPost('useItem',{id:id,amount:amount},callBack);
};
/***********酒馆***********/
//初始化酒馆
BuildingFunction.initTavern = function(callBack){
	$.ajaxPost('initTavern',callBack);
};
//武将刷新
BuildingFunction.refreshTavernHero = function(callBack){
	$.ajaxPost('refreshTavernHero',callBack);
};
//招募武将
BuildingFunction.recruitHero = function(id,callBack){
	$.ajaxPost('recruitHero',{id:id},callBack);
};
/***************集市********************************/
//进入集市是调用的接口
BuildingFunction.getUserMarket = function(callBack){
	$.ajaxPost('getUserMarket',callBack);
};
//兑换资源接口
BuildingFunction.exchangeResource = function(choiceType,choiceAmount,exchangeType,callBack){
	$.ajaxPost('exchangeResource',{ choiceType:choiceType,choiceAmount:choiceAmount,exchangeType:exchangeType },callBack);
};
//出售资源接口
BuildingFunction.sellResource = function(foodAmount,woodAmount,stoneAmount,ironoreAmount,callBack){
	$.ajaxPost('sellResource',{ foodAmount:foodAmount,woodAmount:woodAmount,stoneAmount:stoneAmount,ironoreAmount:ironoreAmount },callBack);
};
/************教坊**************/
//初始化教坊
BuildingFunction.initCollege = function(callBack){
	$.ajaxPost('initCollege',callBack);
};
//获取已学技能
BuildingFunction.getLearnedSkill = function(userHeroId,callBack){
	$.ajaxPost('getLearnedSkill',{userHeroId:userHeroId},callBack);
};
//获取可学技能
BuildingFunction.getCanLearnSkill = function(userHeroId,callBack){
	$.ajaxPost('getCanLearnSkill',{userHeroId:userHeroId},callBack);
};
//获取不可学技能
BuildingFunction.getCannotLearnSkill = function(userHeroId,callBack){
	$.ajaxPost('getCannotLearnSkill',{userHeroId:userHeroId},callBack);
};
//学习技能 返回可学技能
BuildingFunction.learnSkill = function(userHeroId,heroSkillNo,callBack){
	$.ajaxPost('learnSkill',{userHeroId:userHeroId,heroSkillNo:heroSkillNo},callBack);
};

/*****************************加工坊.装备强化***********************************************/

///////////装备打造//////////////
//获取装备类型，材料等级等基本信息，进入装备打造界面时调用的接口
BuildingFunction.getEquipSubType = function(callBack){
	$.ajaxPost('getEquipSubType',callBack);
};
//通过装备类型获取可打造的装备接口
BuildingFunction.getEquipCanBeMade = function(equipmentType,callBack){
	$.ajaxPost('getEquipCanBeMade',{ equipmentType:equipmentType },callBack);
};
//获取打造信息
BuildingFunction.getEquipMadeInfo = function(planNo,materialLevel,callBack){
	$.ajaxPost('getEquipMadeInfo',{ planNo:planNo,materialLevel:materialLevel },callBack);
};
//打造操作
BuildingFunction.makeEquipment = function(planNo,materialLevel,produceAmount,callBack){
	$.ajaxPost('makeEquipment',{ planNo:planNo,materialLevel:materialLevel,produceAmount:produceAmount },callBack);
};

///////////强化//////////////
//进入装备强化界面调用的接口，返回装备位置和装备类型及对应参数
BuildingFunction.getEquipmentClass = function(callBack){
	$.ajaxPost('getEquipmentClass',callBack);
};
//根据装备位置和类型查看装备信息
BuildingFunction.getEquipmentByPositonAndType = function(equipPositon,equipType,callBack){
	$.ajaxPost('getEquipmentByPositonAndType',{equipPositon:equipPositon,equipType:equipType } ,callBack);
};
//获取所选装备的强化信息
BuildingFunction.getEquipmentStrengthenInfo = function(id,callBack){
	$.ajaxPost('getEquipmentStrengthenInfo',{id:id } ,callBack);
};
//强化装备
BuildingFunction.strengthenEquipment = function(id,callBack){
	$.ajaxPost('strengthenEquipment',{id:id } ,callBack);
};

//////////宝石合成/////////////
//进入宝石合成时调用的接口，返回包内宝石和成功率
BuildingFunction.getFuseInfo = function(callBack){
	$.ajaxPost('getFuseInfo' ,callBack);
};
//合成操作接口
BuildingFunction.fuse = function(ids,callBack){
	$.ajaxPost('fuse' ,{ids:ids }, callBack);
};
//进入材料合成时调用的接口，返回包内宝石和成功率
BuildingFunction.getMaterialFuseInfo = function(callBack){
	$.ajaxPost('getMaterialFuseInfo' ,callBack);
};
//合成操作接口
BuildingFunction.fuseMaterial = function(ids,callBack){
	$.ajaxPost('fuseMaterial' ,{ids:ids }, callBack);
};

/////////宝石镶嵌/////////////
//获取镶嵌信息
BuildingFunction.getEmbedStoneEquipmentClass = function(callBack){
	$.ajaxPost('getEmbedStoneEquipmentClass' , callBack);
};
//按位置和类型获取装备信息
BuildingFunction.getEmbedStoneEquipment = function(equipPositon,equipType,callBack){
	$.ajaxPost('getEmbedStoneEquipment' ,{equipPositon:equipPositon,equipType:equipType }, callBack);
};
//获取装备信息
BuildingFunction.getEquipmentInfo = function(equipmentId,callBack){
	$.ajaxPost('getEquipmentInfo' , {equipmentId:equipmentId} ,callBack);
};
//获取用户宝石
BuildingFunction.getUserGemStone = function(callBack){
	$.ajaxPost('getUserGemStone' , callBack);
};
//镶嵌操作
BuildingFunction.embedStone = function(equipmentId,stoneId,holeIndex,callBack){
	$.ajaxPost('embedStone' ,{equipmentId:equipmentId,stoneId:stoneId,holeIndex:holeIndex }, callBack);
};
//摘除操作
BuildingFunction.exciseStone = function(equipmentId,holeIndex,callBack){
	$.ajaxPost('exciseStone' ,{equipmentId:equipmentId,holeIndex:holeIndex }, callBack);
};

/***********************军机处************************/
//初始化
BuildingFunction.initPrivycouncil = function(callBack){
	$.ajaxPost('initPrivycouncil',callBack);
};
//获取描述
BuildingFunction.getMissionStatus = function(userHeroId,callBack){
	$.ajaxPost('getMissionStatus',{userHeroId:userHeroId } ,callBack);
};
//开启
BuildingFunction.beginMission = function(userHeroId,affairNo,hours,callBack){
	$.ajaxPost('beginMission',{userHeroId:userHeroId,affairNo:affairNo,hours:hours} ,callBack);
};
//结束
BuildingFunction.endMission = function(userHeroId,callBack){
	$.ajaxPost('endMission',{userHeroId:userHeroId } ,callBack);
};
/******************* 聚贤阁 *******************/
//初始化聚贤阁
BuildingFunction.initCentrestage = function(callBack){
	$.ajaxPost('initCentrestage' ,callBack);
};
//获取全部武将
BuildingFunction.getAllCentrestageUserHero = function(callBack){
	$.ajaxPost('getAllCentrestageUserHero',callBack);
};
//获取某一官职的武将
BuildingFunction.getRankUserHero = function(rankNo,callBack){
	$.ajaxPost('getRankUserHero',{rankNo:rankNo } ,callBack);
};
//获取全部官职 (任免界面)
BuildingFunction.getAllRank = function(userHeroId,callBack){
	$.ajaxPost('getAllRank',{userHeroId:userHeroId } ,callBack);
};
// 册封武将
BuildingFunction.appointUserHero = function(userHeroId,rankNo,callBack){
	$.ajaxPost('appointUserHero',{userHeroId:userHeroId,rankNo:rankNo } ,callBack);
};
// 免除武将官职
BuildingFunction.relieveHero = function(userHeroId,callBack){
	$.ajaxPost('relieveHero',{userHeroId:userHeroId } ,callBack);
};
/******************太医署**********************/
// 初始化太医署
BuildingFunction.initHospital = function(callBack){
	$.ajaxPost('initHospital',callBack);
};
// 治疗单个武将
BuildingFunction.cureUserHero = function(userHeroId,callBack){
	$.ajaxPost('cureUserHero',{userHeroId:userHeroId } ,callBack);
};
//全部治疗
BuildingFunction.cureAllUserHero = function(callBack){
	$.ajaxPost('cureAllUserHero',callBack);
};
/************兵营************/
//进入兵营界面
BuildingFunction.initBarracks = function(callBack){
	$.ajaxPost('initBarracks',callBack);
};
	
/**
 * 招募成功：返回新的新兵数量、总兵数量（不改变上限），新增或修改当前拥有兵种,修改资源
 * 招募失败：没有对应兵种、资源不足、达到上限
 */
BuildingFunction.recruitSoldier = function(soldierNo,amount,callBack){
	$.ajaxPost('recruitSoldier',{soldierNo:soldierNo,amount:amount},callBack);
};
/**
 * 遣散成功：返回新的新兵数量、总兵数量（不改变上限），删除或修改当前拥有兵种,修改资源
 * 遣散失败：没有对应兵种
 */
BuildingFunction.dismissSoldier = function(soldierNo,amount,callBack){
	$.ajaxPost('dismissSoldier',{soldierNo:soldierNo,amount:amount},callBack);
};
/**
 * 进阶成功：增加、删除或修改当前拥有兵种,修改资源
 * 进阶失败：没有对应兵种，资源不足
 */
BuildingFunction.upgradeSoldier = function(soldierNo,amount,callBack){
	$.ajaxPost('upgradeSoldier',{soldierNo:soldierNo,amount:amount},callBack);
};
/**
 * 进阶界面，每个单位消耗的资源
 */
BuildingFunction.upgradeSoldierResource = function(soldierNo,callBack){
	$.ajaxPost('upgradeSoldierResource',{soldierNo:soldierNo},callBack);
};
/**
 * 遣散界面，每个单位返回的资源
 */
BuildingFunction.dismissSoldierResource = function(soldierNo,callBack){
	$.ajaxPost('dismissSoldierResource',{soldierNo:soldierNo},callBack);
};
/**
 * 取消招募
 */
BuildingFunction.cancelRecruit = function(callBack){
	$.ajaxPost('cancelRecruit',callBack);
};
	
/**
 * 训练新兵
 */
BuildingFunction.recruitNewSoldier = function(amount,callBack){
	$.ajaxPost('recruitNewSoldier',{amount:amount},callBack);
};

/**
 * 练兵加速
 * soliderNo军种编号
 * speedType 加速类型1点卷，2：金锭3道具
 * itemNo 使用加速物品道具编号
 * confim：0弹出公共加速窗口，1：直接加速
 */
BuildingFunction.speedTrain = function(soliderNo,speedType,itemNo,confim,callBack){
	$.ajaxPost('speedTrain',{soliderNo:soliderNo,speedType:speedType,itemNo:itemNo,confim:confim},callBack);
};


/*****************城墙*******************/
//获取全部城防工事
BuildingFunction.getAllWallDefensen = function(callBack){
	$.ajaxPost('getAllWallDefensen',callBack);
};
//获取城防将领
BuildingFunction.getAllWallHeros = function(callBack){
	$.ajaxPost('getAllWallHeros',callBack);
};
//取消城防工事建造
BuildingFunction.removeWallDefensenQueues = function(callBack){
	$.ajaxPost('removeWallDefensenQueues',callBack);
};
//增加城防工事
BuildingFunction.addWallDefenseNum = function(defenceworksNo,num,callBack){
	$.ajaxPost('addWallDefenseNum',{defenceworksNo:defenceworksNo,num:num},callBack);
};
//保存城防将领
BuildingFunction.updateWallHeros = function(heroId,wallCombat,formationNo,callBack){
	$.ajaxPost('updateWallHeros',{heroId:heroId,wallCombat:wallCombat,formationNo:formationNo},callBack);
};
//计算城防战力
BuildingFunction.getHeroValue = function(heroId,callBack){
	$.ajaxPost('getHeroValue',{heroId:heroId},callBack);
};
/**
 * 城防建设加速
 * speedType	加速类型1：行军，2练兵,3建筑(具体可查看Const接口、SPEED_FUNCTION_*)
 * itemNo 使用加速物品道具编号
 */
BuildingFunction.speedWallDefense = function(speedType,itemNo,confim,callBack){
	$.ajaxPost('speedWallDefense',{speedType:speedType,itemNo:itemNo,confim:confim},callBack);
};















