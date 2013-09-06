////////// 联盟相关///////////////
var Alliance = {};
/*
 * 创建联盟
 */
Alliance.createAlliance=function(name,banner,introduction,callBack){
	$.ajaxPost('createAlliance',{name:name,banner:banner,introduction:introduction},callBack);
	};
/*
 * 进入君主联盟
 */
Alliance.initCharacterAlliance=function(callBack){
	$.ajaxPost('initCharacterAlliance',callBack);
	};
/*
 * 根据名称查询联盟
 */
Alliance.getAllAllianceByName=function(name,callBack){
	$.ajaxPost('getAllAllianceByName',{name:name},callBack);
	};
/*
 * 查询全部联盟
 */
Alliance.getAllAlliance=function(age,callBack){
	$.ajaxPost('getAllAlliance',{age:age},callBack);
	};
/*
 * 解散联盟
 */
Alliance.removeAlliance=function(callBack){
	$.ajaxPost('removeAlliance',callBack);
	};
/*
 *  确认解散
 */
Alliance.disbandAlliance=function(callBack){
	$.ajaxPost('disbandAlliance',callBack);
	};
/*
 * 取消解散
 */
Alliance.removedisbandAlliance=function(callBack){
	$.ajaxPost('removedisbandAlliance',callBack);
	};
/*
 *  修改信息
 */
Alliance.getAllianceInfo=function(callBack){
	$.ajaxPost('getAllianceInfo',callBack);
	};
/*
 * 保存修改信息
 */
Alliance.changeAllianceInfo=function(introduction,bulletin,callBack){
	$.ajaxPost('changeAllianceInfo',{introduction:introduction,bulletin:bulletin},callBack);
    };
/*
 * 联盟升级
 */
Alliance.allianceUpgradeInfo=function(callBack){
	$.ajaxPost('allianceUpgradeInfo',callBack);
	};
/*
 * 确认升级
 */
Alliance.allianceUpgrade=function(callBack){
	$.ajaxPost('allianceUpgrade',callBack);
    };
/*
 * 根据国家分页返回联盟
 */
Alliance.getAllianceByCountry=function(countryName,page,callBack){
	$.ajaxPost('getAllianceByCountry',{countryName:countryName,page:page},callBack);
	};
/*
 * 申请加入
 */
Alliance.applyAllianceApplication=function(allianceId,callBack){
	$.ajaxPost('applyAllianceApplication',{allianceId:allianceId},callBack);
	};
/*
 * 联盟查看申请成员列表
 */
Alliance.getAllAllianceApplication=function(page,callBack){
	$.ajaxPost('getAllAllianceApplication',{page:page},callBack);
	};
/*
 * 君主查询申请，邀请列表
 */
Alliance.getAllcharacterApplication=function(page,callBack){
	$.ajaxPost('getAllcharacterApplication',{page:page},callBack);
	};
/*
 * 君主同意邀请加入
 */
Alliance.agreedJoin=function(allianceId,callBack){
	$.ajaxPost('agreedJoin',{allianceId:allianceId},callBack);
	};
/*
 * 君主拒绝邀请加入
 */
Alliance.memberRefusedJoin=function(allianceId,callBack){
	$.ajaxPost('memberRefusedJoin',{allianceId:allianceId},callBack);
	};
/*
 * 批准成员加入
 */
Alliance.joinAllianceMember=function(memberId,callBack){
	$.ajaxPost('joinAllianceMember',{memberId:memberId},callBack);
	};
/*
 * 拒绝成员加入
 */
Alliance.refusedJoin=function(memberId,callBack){
	$.ajaxPost('refusedJoin',{memberId:memberId},callBack);
	};
/*
 * 根据名称查看联盟成员
 */
Alliance.getAllianceMemberByName=function(memberName,callBack){
	$.ajaxPost('getAllianceMemberByName',{memberName:memberName},callBack);
	};
/*
 * 分页查看联盟成员
 */
Alliance.getAllAllianceMember=function(allianceId,page,callBack){
	$.ajaxPost('getAllAllianceMember',{allianceId:allianceId,page:page},callBack);
	};
/*
 * 退出联盟
 */
Alliance.quitAlliance=function(callBack){
	$.ajaxPost('quitAlliance',callBack);
	};
/*
 *  删除成员
 */
Alliance.deleteAllianceMember=function(memberId,callBack){
	$.ajaxPost('deleteAllianceMember',{memberId:memberId},callBack);
	};
/*
 * 盟主禅让
 */
Alliance.chiefDemise=function(name,callBack){
	$.ajaxPost('chiefDemise',{name:name},callBack);
	};
/*
 * 联盟大事
 */
Alliance.getAllianceEvent=function(page,callBack){
	$.ajaxPost('getAllianceEvent',{page:page},callBack);
	};
/*
 * 邀请加入
 */
Alliance.inviteMemberByName=function(name,callBack){
	$.ajaxPost('inviteMemberByName',{name:name},callBack);
	};
/*
 * 官员任免
 */
Alliance.updatedPost=function(memberId,callBack){
	$.ajaxPost('updatedPost',{memberId:memberId},callBack);
	};
/*
 * 确定任免
 */
Alliance.appointment=function(memberId,position,callBack){
	$.ajaxPost('appointment',{memberId:memberId,position:position},callBack);
	};
/*
 * 捐献资源
 */
Alliance.donatedResources=function(money,food,wood,stone,ironore,cash,callBack){
	$.ajaxPost('donatedResources',{money:money,food:food,wood:wood,stone:stone,ironore:ironore,cash:cash,},callBack);
	};
/*
 * 捐献排行榜
 */
Alliance.getAllAianceContribute=function(page,callBack){
	$.ajaxPost('getAllAianceContribute',{page:page},callBack);
	};
/*
 * 查看联盟兵营
 */
Alliance.getAllianceBarrack=function(callBack){
	$.ajaxPost('getAllianceBarrack',callBack);
	};
/*
 * 根据兵种编号前缀返回兵种
 */
Alliance.getAllianceBarrackBySoldierNo=function(soldierNo,page,callBack){
	$.ajaxPost('getAllianceBarrackBySoldierNo',{soldierNo:soldierNo,page:page},callBack);
	};
/*
 * 捐献士兵
 */
Alliance.donatedSoidier=function(soldierNo,amount,wealth,callBack){
	$.ajaxPost('donatedSoidier',{soldierNo:soldierNo,amount:amount,wealth:wealth},callBack);
	};
/*
 * 提取士兵
 */
Alliance.extractSoldiers=function(soldierNo,amount,wealth,callBack){
	$.ajaxPost('extractSoldiers',{soldierNo:soldierNo,amount:amount,wealth:wealth},callBack);
	};
/*
 * 遣散士兵
 */
Alliance.disbandAllianceSolier=function(soldierNo,amount,wealth,callBack){
	$.ajaxPost('disbandAllianceSolier',{soldierNo:soldierNo,amount:amount,wealth:wealth},callBack);
	};
/*
 * 初始化联盟科技
 */
Alliance.initAllianceTechology=function(callBack){
	$.ajaxPost('initAllianceTechology',callBack);
	};
/*
 * 升级联盟科技
 */
Alliance.upgradeAllianceTechnology=function(gbulidingno,callBack){
	$.ajaxPost('upgradeAllianceTechnology',{gbulidingno:gbulidingno},callBack);
	};
/*
 * 初始化联盟福利
 */
Alliance.initAllianceWealth=function(callBack){
	$.ajaxPost('initAllianceWealth',callBack);
	};
/*
 * 联盟科技升级
 */
Alliance.upgradeAllianceTechnology=function(gbulidingno,callBack){
	$.ajaxPost('upgradeAllianceTechnology',{gbulidingno:gbulidingno},callBack);
};
/*
 *联盟市场
 */
Alliance.getAllianceShoping=function(page,callBack){
	$.ajaxPost('getAllianceShoping',{page:page},callBack);
};
/*
 * 购买物品
 */
Alliance.allianceShopingbuyItem=function(itemNo,callBack){
	$.ajaxPost('allianceShopingbuyItem',{itemNo:itemNo},callBack);
	};
/*
 * 领取俸禄
 * 
 */
Alliance.receiveSalary=function(num,callBack){
		$.ajaxPost('receiveSalary',{num:num},callBack);
	};
	
/*
* 提取设置
*/
Alliance.retrievalSetting=function(alliancePosition, amount, callBack){
	    $.ajaxPost('retrievalSetting',{alliancePosition:alliancePosition,amount:amount},callBack);
	};
	
/**
 * 是否与自己是同盟关系
 * targetId做对比的君主id
 */
Alliance.isAlliance = function(targetId,callBack) {
	$.ajaxPost("isAlliance",{targetId:targetId},callBack,true);
};

	