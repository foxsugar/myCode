//社交相关功能接口
var friend = {};

/********************好友****************************/
//申请好友
friend.addFriendList = function(friendName,callBack) {
	$.ajaxPost("addFriendList",{friendName:friendName},callBack,true);
};
//申请好友,确定申请好友，用于确定键
friend.addFriendListForOk = function(friendName,callBack) {
	$.ajaxPost("addFriendListForOk",{friendName:friendName},callBack,true);
};
//获取好友申请列表，默认接口
friend.getFriendListDefault = function(callBack) {
	$.ajaxPost("getFriendListDefault",callBack);
};
//获取好友申请列表，翻页接口
friend.getFriendListByPage = function(page,callBack) {
	$.ajaxPost("getFriendListByPage",{page:page},callBack);
};
//同意申请好友
friend.agreeFriend = function(page,id,callBack) {
	$.ajaxPost("agreeFriend",{page:page,id:id},callBack,true);
};
//同意申请好友，确定同意，用于确定键
friend.agreeFriendForOk = function(page,id,callBack) {
	$.ajaxPost("agreeFriendForOk",{page:page,id:id},callBack,true);
};
//拒绝好友
friend.refuseFriend = function(page,id,callBack) {
	$.ajaxPost("refuseFriend",{page:page,id:id},callBack);
};
//获取好友信息，默认接口
friend.getFriendsDefault = function(callBack) {
	$.ajaxPost("getFriendsDefault",callBack);
};
//获取好友信息，翻页接口
friend.getFriendsByPage = function(page,callBack) {
	$.ajaxPost("getFriendsByPage",{page:page},callBack);
};
//查询好友
friend.selectFriend = function(name,callBack) {
	$.ajaxPost("selectFriend",{name:name},callBack,true);
};
//删除好友
friend.deleteFriend = function(page,id,callBack) {
	$.ajaxPost("deleteFriend",{page:page,id:id},callBack,true);
};

/*******************仇人*************************/
//添加仇人
friend.addEnemy = function(enemyName,callBack) {
	$.ajaxPost("addEnemy",{enemyName:enemyName},callBack,true);
};
//添加仇人,确定添加，用于确定键
friend.addEnemyForOk = function(enemyName,callBack) {
	$.ajaxPost("addEnemyForOk",{enemyName:enemyName},callBack,true);
};
//查找仇人
friend.selectEnemy = function(enemyName,callBack) {
	$.ajaxPost("selectEnemy",{enemyName:enemyName},callBack,true);
};
//删除仇人
friend.deleteEnemy = function(page,id,callBack) {
	$.ajaxPost("deleteEnemy",{page:page,id:id},callBack);
};
//获取仇人，默认接口
friend.getEnemyDefault = function(callBack) {
	$.ajaxPost("getEnemyDefault",callBack);
};
//获取仇人,翻页接口
friend.getEnemyByPage = function(page,callBack) {
	$.ajaxPost("getEnemyByPage",{page:page},callBack);
};