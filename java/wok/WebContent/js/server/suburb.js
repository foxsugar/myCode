var suburb = {};
//城郊战斗信息订阅标识
suburb.battleSuburbInfo = null;
/**
 * 打开城郊UI
 * @param filedType
 * @param callBack
 */
suburb.openSuburbUi = function(callBack){
	$.ajaxPost('getUserFieldInfo',callBack);
	if(!suburb.battleSuburbInfo){
		//订阅战斗信息
	}
};
/**
 * 关闭城郊UI
 * @param filedType
 * @param callBack
 */
suburb.closeSuburbUi = function(callBack){
	$.ajaxPost('closeSuburbUi',callBack);
	if(suburb.battleSuburbInfo){
		//取消订阅战斗信息
		cometd.unsubcribe(suburb.battleSuburbInfo);
		suburb.battleSuburbInfo==null;
	}
};

/**
 * 获取玩家资源地块种植信息
 * @param callBack
 */
suburb.getPlanInfo = function(fieldType,callBack){
	$.ajaxPost('getPlanInfo',{fieldType:fieldType},callBack);
};
/**
 * 种植地块
 * @param fieldId
 * @param fieldType
 * @param growTime
 * @param callBack
 */
suburb.plantResource = function (fieldId, fieldType, growTime, callBack){
	$.ajaxPost('plantResource',{fieldId:fieldId,fieldType:fieldType,growTime:growTime},callBack);
};
/**
 * 收获地块
 * @param fieldId
 * @param fieldType
 * @param callBack
 */
suburb.harvestResource = function (fieldId, fieldType, callBack){
	$.ajaxPost('harvestResource',{fieldId:fieldId,fieldType:fieldType},callBack);
};
/**
 * 整地，即删除地块
 * @param fieldId
 * @param fieldType
 * @param callBack
 */
suburb.deleteResourceField = function (fieldId, fieldType, callBack){
	$.ajaxPost('deleteResourceField',{fieldId:fieldId,fieldType:fieldType},callBack);
};
/**
 * 一键收取
 * @param callBack
 */
suburb.easyHarvestResource = function (callBack){
	$.ajaxPost('easyHarvestResource',callBack);
};