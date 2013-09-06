///////科教馆////////


//////内政科技相关//////
var tech = {};
/////获取内政科技信息，打开科教馆内政界面调取的接口
tech.getUserInteriorForView= function(callBack){
	$.ajaxPost('getUserInteriorForView',callBack);
};
////内政科技升级
tech.levelUpInterior= function(techKey,callBack){
	$.ajaxPost('levelUpInterior',{techKey:techKey},callBack,true);
};
///内政科技降级
tech.levelDownInterior= function(techKey,callBack){
	$.ajaxPost('levelDownInterior',{techKey:techKey},callBack,true);
};
//时间到达后向服务器请求的接口
tech.getInteriorStudying= function(callBack){
	$.ajaxPost('getInteriorStudying',callBack);
};
////终止研究
tech.stopStudying= function(callBack){
	$.ajaxPost('stopStudying',callBack);
};
//////////////兵种科技/////////////////////
/*
 * 获取全部兵种科技
 */
tech.getAllSoldierTech= function(callBack){
	$.ajaxPost('getAllSoldierTech',callBack);
};
/*
 * 研究兵种科技
 */
tech.researchSoldierTech= function(techNo,callBack){
	$.ajaxPost('researchSoldierTech',{techNo:techNo},callBack,true);
};
/*
 * 降级兵种科技
 */
tech.demoteSoldierTech= function(techNo,callBack){
	$.ajaxPost('demoteSoldierTech',{techNo:techNo},callBack,true);
};
/*
 * 获得兵种科技
 */
tech.getSoldierTech= function(callBack){
	$.ajaxPost('getSoldierTech',callBack);
};

///////////////////////
/////////阵法科技///////
////////////////////////////

////获取阵法科技信息
tech.getFormationTechInfo = function (callBack){
	$.ajaxPost('getFormationTechInfo',callBack);
};
//按页获取阵法信息，翻页接口
tech.getFormationTechInfoByPage = function (page,callBack){
	$.ajaxPost('getFormationTechInfoByPage',{page:page},callBack);
};
//升级接口
tech.levelUpFormation = function (page,location,callBack){
	$.ajaxPost('levelUpFormation',{page:page,location:location},callBack);
};
//降级接口
tech.levelDownFormation = function (page,location,callBack){
	$.ajaxPost('levelDownFormation',{page:page,location:location},callBack);
};
//计时结束获取升级信息接口
tech.getFormationStudying = function (page,callBack){
	$.ajaxPost('getFormationStudying',{page:page},callBack);
};
/**
 * 科研加速
 * speedType 加速类型1点卷，2：金锭3道具
 * itemNo 使用加速物品道具编号
 * confim：0弹出公共加速窗口，1：直接加速
 */
tech.speedTech = function (speedType,itemNo,confim,callBack){
	$.ajaxPost('speedTech',{speedType:speedType,itemNo:itemNo,confim:confim},callBack);
};
