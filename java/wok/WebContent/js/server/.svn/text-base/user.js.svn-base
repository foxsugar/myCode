var User = {};

/**
 * 用户登录
 */
User.login=function (username,password,callBack){
	$.ajaxPost('login',{username:username,password:password},callBack);
};

/**
 * 获取君主和主城概要信息
 */
User.getUserInfo=function(callBack){
	$.ajaxPost('getUserInfo',callBack);
};

/**
 * 创建角色
 */
User.createCharacter=function(name,countryName,gender,image,callBack){
	$.ajaxPost('createCharacter',{name:name,countryName:countryName,gender:gender,image:image},callBack);
};

/**
 * 获取君主详细信息
 */
User.getCharacterInfo=function(callBack){
	$.ajaxPost('getCharacterInfo',callBack);
};

/**
 * 根据id获取某个君主的信息
 */
User.getCharacterById = function (id, callBack) {
	$.ajaxPost('getCharacterById',{id:id},callBack);
};

/**
 * 更新君主描述
 */
User.updateCharacterDescription=function(description,callBack){
	$.ajaxPost('updateCharacterDescription',{description:description},callBack);
};

/**
 * 修改潜能点、属性
 */
User.updateCharacterAttribute=function(addMilitaryStrength,addInternalAffairs,callBack){
	$.ajaxPost('updateCharacterAttribute',{addMilitaryStrength:addMilitaryStrength,addInternalAffairs:addInternalAffairs},callBack);
};

/**
 * 修改君主名
 */
User.updateCharacterName=function(name,callBack){
	$.ajaxPost('updateCharacterName',{name:name},callBack);
};

/**
 * 修改所属国家
 */
User.updateCharacterCountry=function(countryId,callBack){
	$.ajaxPost('updateCharacterCountry',{countryId:countryId},callBack);
};

/**
 * 修改君主头像
 */
User.updateCharacterImage=function(image,callBack){
	$.ajaxPost('updateCharacterImage',{image:image},callBack);
};

/**
 * 主城升级
 */
User.maincityLevelup=function(callBack){
	$.ajaxPost('maincityLevelup',callBack);
};

/**
 * 第一次进入世界
 */
User.initWorld=function(callBack){
	$.ajaxPost('initWorld',callBack);
}
;
/**
 * 获取世界信息
 */
User.getWorldData=function(x, y,callBack){
	$.ajaxPost('getWorldData',{x:x,y:y},callBack);
};
/**
 * 获取所有系统头像接口（含男和女）
 */
User.getSystemPic=function(callBack){
	$.ajaxPost('getSystemPic',callBack);
};
/**
 * 获取所有系统头像接口（只含本身性别）
 */
User.getAllSystemPic=function(callBack){
	$.ajaxPost('getAllSystemPic',callBack);
};
/**
 * 更新头像接口
 */
User.updateCharacterImage=function(imageName,callBack){
	$.ajaxPost('updateCharacterImage',{imageName:imageName},callBack);
};

/**
 *初始化目标君主targetId城郊
 */
User.initSuburbBattle=function(targetId,callBack){
	$.ajaxPost('initSuburbBattle',{targetId:targetId},callBack);
};
