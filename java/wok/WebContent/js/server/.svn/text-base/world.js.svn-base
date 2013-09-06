var World={};
World.countryName=['无','隋','夏','魏','楚','梁','中立'];
World.terrainName=['草地','森林','山地','湖泊','沙漠','无'];
/**
 * 获取世界资源
 */
World.getWorldResource=function(x,y,callBack){
	$.ajaxPost('getWorldResource',{x:x,y:y},callBack);
};
/**
 * 获取世界怪物
 */
World.getWorldMonster=function(x,y,callBack){
	$.ajaxPost('getWorldMonster',{x:x,y:y},callBack);
};
/**
 * 获取世界国都
 */
World.getWorldCapital=function(id,callBack){
	$.ajaxPost('getWorldCapital',{id:id},callBack);
};
/**
 * 获取世界名城
 */
World.getWorldCity=function(id,callBack){
	$.ajaxPost('getWorldCity',{id:id},callBack);
};
/**
 * 获取系统城池
 * @return [{id,name,type,x,y},...]
 * type//1：国都，2：名城
 */
World.getSystemCity = function(callBack){
	$.ajaxPost('getSystemCity',callBack);
};
/** 
 * 获取盟友
 * [{id,x,y},...]
 */
World.getAlly = function(callBack){
	$.ajaxPost('world/getAlly',callBack);
};
/**
 * 获取仇人
 * [{id,x,y},...]
 */
World.getEnemy = function(callBack){
	$.ajaxPost('world/getEnemy',callBack);
};
/**
 * 根据id获取地图数据
 * id:国都名城id或者玩家城池id
 * type:0:国都名城，1：玩家城池
 */
World.getWorldDataById = function (id,type,callBack){
	$.ajaxPost('getWorldDataById',{id:id,type:type},callBack);
};
/**
 * 固定点（x,y）迁城
 */
World.moveCity = function (x,y,callBack){
	$.ajaxPost('maincity/moveCity',{x:x,y:y},callBack);
};
/**
 *随机迁城
 */
World.moveRandomCity = function (callBack){
	$.ajaxPost('maincity/moveRandomCity',callBack);
};
