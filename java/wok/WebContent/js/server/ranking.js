//////////////排行榜///////////////

var Ranking = {};
	
//建设值排行
Ranking.getBuildList=function(page,callBack){
	$.ajaxPost('getBuildList',{page:page},callBack);
};
//君主等级排行
Ranking.getLevelList=function(page,callBack){
	$.ajaxPost('getLevelList',{page:page},callBack);
};
//声望排行
Ranking.getReputationList=function(page,callBack){
	$.ajaxPost('getReputationList',{page:page},callBack);
};
//战力排行
Ranking.getFightingList=function(page,callBack){
	$.ajaxPost('getFightingList',{page:page},callBack);
};
//充值排行
Ranking.getRechargeList=function(page,callBack){
	$.ajaxPost('getRechargeList',{page:page},callBack);
};

//联盟排行
Ranking.getAllianceList=function(page,callBack){
	$.ajaxPost('getAllianceList',{page:page},callBack);
};
//武将排行
Ranking.getAllHeroList=function(page,callBack){
	$.ajaxPost('getAllHeroList',{page:page},callBack);
};

//我的充值排行
Ranking.getRechargeMap=function(callBack){
	$.ajaxPost('getRechargeMap',callBack);
};
//我的等级排行
Ranking.getLevelMap=function(callBack){
	$.ajaxPost('getLevelMap',callBack);
};
//我的声望排行
Ranking.getReputation=function(callBack){
	$.ajaxPost('getReputation',callBack);
};
//我的战力排行
Ranking.getfightingMap=function(callBack){
	$.ajaxPost('getfightingMap',callBack);
};
//我的建设值排行
Ranking.getBuildMap=function(callBack){
	$.ajaxPost('getBuildMap',callBack);
};
// 我的联盟排行
Ranking.getAllianceMap=function(callBack){
	$.ajaxPost('getAllianceMap',callBack);
};
//我的武将排行
Ranking.getAllUserHeroMap=function(page,callBack){
	$.ajaxPost('getAllUserHeroMap',{page:page},callBack);
};
//根据名称查找充值排行
Ranking.getRechargeByName=function(name,callBack){
	$.ajaxPost('getRechargeByName',{name:name},callBack);
};
// 根据名称查找建设排行
Ranking.getBuildByName=function(name,callBack){
	$.ajaxPost('getBuildByName',{name:name},callBack);
};
//根据名称查找等级排行
Ranking.getLevelByName=function(name,callBack){
	$.ajaxPost('getLevelByName',{name:name},callBack);
};
//根据名称查找声望排行
Ranking.getReputationByName=function(name,callBack){
	$.ajaxPost('getReputationByName',{name:name},callBack);
};
//根据名称查找战力排行
Ranking.getFightingByName=function(name,callBack){
	$.ajaxPost('getFightingByName',{name:name},callBack);
};
//根据名称查找联盟排行
Ranking.getAllianceByName=function(name,callBack){
	$.ajaxPost('getAllianceByName',{name:name},callBack);
};
//根据名称查看武将排行
Ranking.getAllHeroByName=function(name,page,callBack){
	$.ajaxPost('getAllHeroByName',{name:name,page:page},callBack);
};


//int x = document.getElementById("id");
//x.innerHTML="hello wrold"