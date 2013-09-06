var Hero = {};

/**
 * 获取全部武将
 */
Hero.getAllUserHero=function (callBack){
	$.ajaxPost('getAllUserHero',callBack);
}

/**
 * 根据id获取某个武将
 */
Hero.getUserHero=function(id,callBack){
	$.ajaxPost('getUserHero',{id:id},callBack);
}

/**
 * 武将改名
 */
Hero.modifyHeroName=function(id,name,callBack){
	$.ajaxPost('modifyHeroName',{id:id,name:name},callBack);
}

/**
 * 提升武将等级
 */
Hero.heroLevelup=function(id,callBack){
	$.ajaxPost('heroLevelup',{id:id},callBack);
}

/**
 * 为武将提升根骨
 */
Hero.addGift=function(id,callBack){
	$.ajaxPost('addGift',{id:id},callBack);
}

/**
 * 分配潜能点
 */
Hero.distributePoint=function(id,force, strategy, physique, agility,callBack){
	$.ajaxPost('distributePoint',{id:id,force:force, strategy:strategy, physique:physique, agility:agility},callBack);
}

/**
 * 洗髓
 */
Hero.resetPoint=function(id,callBack){
	$.ajaxPost('resetPoint',{id:id},callBack);
}

/**
 * 武将穿戴装备（如果该位置有装备则替换）
 */
Hero.addEquipment=function(id,equipId,page,callBack){
	$.ajaxPost('addEquipment',{id:id,equipId:equipId,page:page},callBack);
}

/**
 * 卸下装备
 */
Hero.removeEquipment=function(id,equipId,page,callBack){
	$.ajaxPost('removeEquipment',{id:id,equipId:equipId,page:page},callBack);
}

/**
 * 卸下全部装备
 */
Hero.removeAllEquipment=function(id,page,callBack){
	$.ajaxPost('removeAllEquipment',{id:id,page:page},callBack);
}
/**
 * 更新武将体力(治疗)
 */
Hero.cureHeroStamina=function(id,callBack){
	$.ajaxPost('cureHeroStamina',{id:id},callBack);
}
/**
 * 更新武将精力(治疗)
 */
Hero.updateHeroMp=function(id,callBack){
	$.ajaxPost('updateHeroMp',{id:id},callBack);
}

/**
 * 按页数获取装备
 */
Hero.getEquipmentPage=function(page,callBack){
	$.ajaxPost('getEquipmentPage',{page:page},callBack);
}

/**
 * 解雇武将
 */
Hero.fireHero=function(id,callBack){
	$.ajaxPost('fireHero',{id:id},callBack);
}
	
/**
 * 升级技能
 */
Hero.upgradeHeroSkill=function(heroId,skillNo,callBack){
	$.ajaxPost('upgradeHeroSkill',{heroId:heroId,skillNo:skillNo},callBack);
}
	
/**
 * 遗忘技能
 */
Hero.forgetHeroSkill=function(heroId,skillNo,callBack){
	$.ajaxPost('forgetHeroSkill',{heroId:heroId,skillNo:skillNo},callBack);
}
	
/**
 * 提升根骨弹出窗口
 */
Hero.getHeroGiftInfo=function(heroId,callBack){
	$.ajaxPost('getHeroGiftInfo',{heroId:heroId},callBack);
}

/**
 * 武将增加经验（！！仅限测试！！）
 */
Hero.addExp=function(id,exp,callBack){
	$.ajaxPost('addExp',{id:id,exp:exp},callBack);
}
