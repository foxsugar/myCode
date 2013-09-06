var AuctionFunction = {};
//拍卖道具
AuctionFunction.sellItemByAuction = function (id,itemType,basePrice,fixedPrice,savingTime,amount, callBack){
	$.ajaxPost("sellItemByAuction", {id:id, itemType:itemType, basePrice:basePrice, fixedPrice:fixedPrice, savingTime:savingTime, amount:amount}, callBack);
};
//获取自己的拍卖信息
AuctionFunction.getMyAuctionItemInfo = function (callBack){
	$.ajaxPost("getMyAuctionItemInfo", callBack);
};
//按页码获取拍卖信息
AuctionFunction.getMyAuctionItemByPage = function (page,callBack){
	$.ajaxPost("getMyAuctionItemByPage", {page:page}, callBack);
};
//取消拍卖
AuctionFunction.cancelAuctionOperate = function (auctionId,page,callBack){
	$.ajaxPost("cancelAuctionOperate", {auctionId:auctionId,page:page}, callBack);
};
//获得拍卖信息
AuctionFunction.getAuctionInfo = function (callBack){
	$.ajaxPost("getAuctionInfo",  callBack);
};
//查询拍卖物品
AuctionFunction.getItemInfoInAuction = function (itemName,itemType,itemSubtype,quality,levelMax,levelMin,callBack){
	$.ajaxPost("getItemInfoInAuction",{itemName:itemName , itemType:itemType,itemSubtype:itemSubtype,quality:quality,levelMax:levelMax,levelMin:levelMin  } , callBack);
};
//按顺序查询拍卖行物品
AuctionFunction.getAuctionItemByOrder = function (order ,callBack){
	$.ajaxPost("getAuctionItemByOrder",{order:order  } , callBack);
};
//翻页查询
AuctionFunction.getAuctionItemByPage = function (page ,callBack){
	$.ajaxPost("getAuctionItemByPage",{page:page  } , callBack);
};
//竞价
AuctionFunction.buyItemByAuction = function (auctionId,bid,page ,callBack){
	$.ajaxPost("buyItemByAuction",{auctionId:auctionId,bid:bid,page:page  } , callBack);
};
//一口价购买
AuctionFunction.buyItemByFixePrice = function (auctionId,page ,callBack){
	$.ajaxPost("buyItemByFixePrice",{auctionId:auctionId,page:page  } , callBack);
};
//在竞拍页进行一口价拍卖接口
AuctionFunction.buyItemByFixedPriceInBidPage = function (auctionId,page ,callBack){
	$.ajaxPost("buyItemByFixedPriceInBidPage",{auctionId:auctionId,page:page  } , callBack);	
};
//获取自己的出价信息
AuctionFunction.getMyBidItemInfo = function (callBack){
	$.ajaxPost("getMyBidItemInfo", callBack);
};
//获取自己出价信息翻页
AuctionFunction.getMyBidItemByPage = function (page ,callBack){
	$.ajaxPost("getMyBidItemByPage",{page:page  } , callBack);
};
AuctionFunction.getEquipmentForAuction = function (callBack){
	$.ajaxPost("getEquipmentForAuction", callBack);
};
AuctionFunction.getItemForAuction = function (callBack){
	$.ajaxPost("getItemForAuction", callBack);
};
AuctionFunction.getMaterialForAuction = function (callBack){
	$.ajaxPost("getMaterialForAuction", callBack);
};