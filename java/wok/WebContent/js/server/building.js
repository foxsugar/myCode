var Building = {};

/*
 * 获取主城建筑
 */
Building.getAllBuildings=function (callBack){
	$.ajaxPost('getAllBuildings',callBack);
	}
	
/*
 * 获取建筑树
 */
Building.getBuildingTree=function (callBack){
	$.ajaxPost('getBuildingTree',callBack);
	}
	
/*
 * 建造
 */
Building.build=function (buildingNo,location,callBack){
		$.ajaxPost('build',{buildingNo:buildingNo,location:location},callBack,true);
	};
	
/*
 * 升级
 */
Building.upgrade=function (location,callBack){
		$.ajaxPost('upgrade',{location:location},callBack,true);
	};
	
/*
 * 拆除
 */
Building.demolition=function (location,callBack){
		$.ajaxPost('demolition',{location:location},callBack,true);
	};
	
/*
 * 取消
 */
Building.cancel=function (location,callBack){
		$.ajaxPost('cancel',{location:location},callBack);
	};
	
	/*
 * 获取某地块建筑
 */
Building.getBuilding=function (location,callBack){
		$.ajaxPost('getBuilding',{location:location},callBack);
	};
	/*
	 * 
 * 获取建筑队列
 */
Building.getBuildingList=function (callBack){
		$.ajaxPost('getBuildingList',callBack);
	};
  /**
 	* 建筑加速升级
 	* location 建筑物在城池中的位置
	*speedType	加速类型1：行军，2练兵,3建筑(具体可查看Const接口、SPEED_FUNCTION_*)
	*itemNo 使用加速物品道具编号
	*
	*/
Building.speedBuild=function (location,speedType,itemNo,confim,callBack){
	$.ajaxPost('speedBuild',{location:location,speedType:speedType,itemNo:itemNo,confim:confim},callBack);
};
	
