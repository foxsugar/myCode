var qualityNum = 0; 
var userOwnGoldNum =0;
var auctionDivName = new Array();
var auctionDiv = new Array();
var auctionPoly = new Array();
auctionPoly[0] = new Array();
auctionPoly[1] = new Array();
auctionPoly[2] = new Array();
auctionPoly[3] = new Array();
auctionPoly[4] = new Array();
var browseNameColor = new Array();
var jingNameColor = new Array();
var paiNameColor = new Array();
var radioIndex = 0;
var equipItemArray = new Array();
var equipValueArray = new Array();
var fakeItemArray = new Array();
var fakeValueArray = new Array();
var materialItemArray = new Array();
var materialValueArray = new Array();
var itemTypeArray = new Array();
var dataRef = true;
var queryIconArray = new Array();
var goodsLevelArray = new Array();
var equipmentNameArray = new Array();
var surplusTimeArray = new Array(); 
var sellPeopleArray = new Array();
var buyerNameArray = new Array();
var basePriceGoldArray = new Array();
var basePriceSilverArray = new Array();
var fixedPriceGoldArray = new Array();
var fixedPriceSilverArray = new Array();
var jstopTipDataArray = new Array();
var auctionIdArray = new Array();
var tempH = 0;
var currentPage = 0;
var totalPage = 0 ;
var liucontValue = 1;
var liuauctionIndex = 0;
var liuRectPoly = new Array();
var liuSelected = new Array();
var saleCount = new Array();
var auctionIndex;
var auctionGroup;
function doBuyItemByAuction(data)//竞价接口
{if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	currentPage = data.page;
	totalPage = data.pages;
	auctionIdArray.splice(0,auctionIdArray.length);
	basePriceGoldArray.splice(0,basePriceGoldArray.length);
	basePriceSilverArray.splice(0,basePriceSilverArray.length);
	queryIconArray.splice(0,queryIconArray.length);
	equipmentNameArray.splice(0,equipmentNameArray.length);
	goodsLevelArray.splice(0,goodsLevelArray.length);
	surplusTimeArray.splice(0,surplusTimeArray.length);
	sellPeopleArray.splice(0,sellPeopleArray.length);
	buyerNameArray.splice(0,buyerNameArray.length);
	jstopTipDataArray.splice(0,jstopTipDataArray.length);
	browseNameColor.splice(0,browseNameColor.length);
	if(totalPage !=0)
	for(var i = 0; i<data.ItemInfoInAuction.length; i++)
	{
		basePriceGoldArray[i]= data.ItemInfoInAuction[i].auctionInfo.basePrice;
        fixedPriceGoldArray[i] = data.ItemInfoInAuction[i].auctionInfo.fixedPrice;  
		auctionIdArray[i] = data.ItemInfoInAuction[i].auctionInfo.id;
	    var temp1 = data.ItemInfoInAuction[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.ItemInfoInAuction[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.ItemInfoInAuction[i].auctionInfo.remainTime;
		if(data.ItemInfoInAuction[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.ItemInfoInAuction[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.ItemInfoInAuction[i].auctionInfo.bidName;
		
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			       if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}   
		 if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	browseNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }    	
		}
		if(typeof(queryIconArray) != "undefined"){
		   liuauctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(liuauctionIndex == i){
				liuSelected[i] = true;
			}else
				liuSelected[i] = false;
		}		
		
	}
}
function doBuyItemByFixePrice(data)//一口价接口
{
    if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	currentPage = data.page;
	totalPage = data.pages;
	auctionIdArray.splice(0,auctionIdArray.length);
	basePriceGoldArray.splice(0,basePriceGoldArray.length);
	basePriceSilverArray.splice(0,basePriceSilverArray.length);
	queryIconArray.splice(0,queryIconArray.length);
	equipmentNameArray.splice(0,equipmentNameArray.length);
	goodsLevelArray.splice(0,goodsLevelArray.length);
	surplusTimeArray.splice(0,surplusTimeArray.length);
	sellPeopleArray.splice(0,sellPeopleArray.length);
	buyerNameArray.splice(0,buyerNameArray.length);
	jstopTipDataArray.splice(0,jstopTipDataArray.length);
	browseNameColor.splice(0,browseNameColor.length);
	if(totalPage !=0)
	for(var i = 0; i<data.ItemInfoInAuction.length; i++)
	{
		basePriceGoldArray[i]= data.ItemInfoInAuction[i].auctionInfo.basePrice;
        fixedPriceGoldArray[i] = data.ItemInfoInAuction[i].auctionInfo.fixedPrice; 
		auctionIdArray[i] = data.ItemInfoInAuction[i].auctionInfo.id;
	    var temp1 = data.ItemInfoInAuction[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.ItemInfoInAuction[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.ItemInfoInAuction[i].auctionInfo.remainTime;
		if(data.ItemInfoInAuction[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.ItemInfoInAuction[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.ItemInfoInAuction[i].auctionInfo.bidName;
		
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			       if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}   
		 if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
				browseNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];		
		     }
	     }
		if(typeof(queryIconArray) != "undefined"){
		   liuauctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(liuauctionIndex == i){
				liuSelected[i] = true;
			}else
				liuSelected[i] = false;
		}		
		
	}

}
function doGetAuctionItemByOrder(data)//排序数据
{
	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	currentPage = data.page;
	totalPage = data.pages;
	auctionIdArray.splice(0,auctionIdArray.length);
	basePriceGoldArray.splice(0,basePriceGoldArray.length);
	basePriceSilverArray.splice(0,basePriceSilverArray.length);
	queryIconArray.splice(0,queryIconArray.length);
	equipmentNameArray.splice(0,equipmentNameArray.length);
	goodsLevelArray.splice(0,goodsLevelArray.length);
	surplusTimeArray.splice(0,surplusTimeArray.length);
	sellPeopleArray.splice(0,sellPeopleArray.length);
	buyerNameArray.splice(0,buyerNameArray.length);
	jstopTipDataArray.splice(0,jstopTipDataArray.length);
	browseNameColor.splice(0,browseNameColor.length);
	if(totalPage !=0)
	for(var i = 0; i<data.ItemInfoInAuction.length; i++)
	{
		basePriceGoldArray[i]= data.ItemInfoInAuction[i].auctionInfo.basePrice;
        fixedPriceGoldArray[i] = data.ItemInfoInAuction[i].auctionInfo.fixedPrice; 
		auctionIdArray[i] = data.ItemInfoInAuction[i].auctionInfo.id;
	    var temp1 = data.ItemInfoInAuction[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.ItemInfoInAuction[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.ItemInfoInAuction[i].auctionInfo.remainTime;
		if(data.ItemInfoInAuction[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.ItemInfoInAuction[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.ItemInfoInAuction[i].auctionInfo.bidName;
		
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			       if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}   
		 if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
					browseNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];;
			 }		
		}
		if(typeof(queryIconArray) != "undefined"){
		   liuauctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(liuauctionIndex == i){
				liuSelected[i] = true;
			}else
				liuSelected[i] = false;
		}		
		
	}
}

var contValue = 0;
var auctionIndex = 0;
var aRectPoly = new Array();
var aSelected = new Array();
function doGetAuctionItemByPage(data)//翻页控制
{
	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	currentPage = data.page;
	totalPage = data.pages;
	auctionIdArray.splice(0,auctionIdArray.length);
	basePriceGoldArray.splice(0,basePriceGoldArray.length);
	basePriceSilverArray.splice(0,basePriceSilverArray.length);
	queryIconArray.splice(0,queryIconArray.length);
	equipmentNameArray.splice(0,equipmentNameArray.length);
	goodsLevelArray.splice(0,goodsLevelArray.length);
	surplusTimeArray.splice(0,surplusTimeArray.length);
	sellPeopleArray.splice(0,sellPeopleArray.length);
	buyerNameArray.splice(0,buyerNameArray.length);
	jstopTipDataArray.splice(0,jstopTipDataArray.length);
	browseNameColor.splice(0,browseNameColor.length);
	if(totalPage !=0)
	for(var i = 0; i<data.ItemInfoInAuction.length; i++)
	{
		basePriceGoldArray[i]= data.ItemInfoInAuction[i].auctionInfo.basePrice;
        fixedPriceGoldArray[i] = data.ItemInfoInAuction[i].auctionInfo.fixedPrice; 
		auctionIdArray[i] = data.ItemInfoInAuction[i].auctionInfo.id;
	    var temp1 = data.ItemInfoInAuction[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.ItemInfoInAuction[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.ItemInfoInAuction[i].auctionInfo.remainTime;
		if(data.ItemInfoInAuction[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.ItemInfoInAuction[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.ItemInfoInAuction[i].auctionInfo.bidName;
		
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			       if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}   
		 if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	browseNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }    	
		}
		if(typeof(queryIconArray) != "undefined"){
		   liuauctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(liuauctionIndex == i){
				liuSelected[i] = true;
			}else
				liuSelected[i] = false;
		}		
		
	}
}
function dogetItemInfoInAuctionorder(data)//浏览界面查询按钮
{
	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	browseNameColor.splice(0,browseNameColor.length);
	currentPage = data.page;
	totalPage = data.pages;
	jstopTipDataArray.splice(0,jstopTipDataArray.length);
	if(totalPage !=0)
	for(var i = 0; i<data.ItemInfoInAuction.length; i++)
	{		
		basePriceGoldArray[i]= data.ItemInfoInAuction[i].auctionInfo.basePrice;
        fixedPriceGoldArray[i] = data.ItemInfoInAuction[i].auctionInfo.fixedPrice; 
		auctionIdArray[i] = data.ItemInfoInAuction[i].auctionInfo.id;
		var temp1 = data.ItemInfoInAuction[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.ItemInfoInAuction[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.ItemInfoInAuction[i].auctionInfo.remainTime;
		if(data.ItemInfoInAuction[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.ItemInfoInAuction[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.ItemInfoInAuction[i].auctionInfo.bidName;
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								tyep:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}    
		   if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	browseNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }  	
		}	
	 
	if(typeof(queryIconArray) != "undefined"){
		auctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(auctionIndex == i){
				aSelected[i] = true;
			}else
				aSelected[i] = false;
		}		
		
	}

	goodsLevel = false;
	surplusTime = false;
	priceRanking = false;
	goodsLevelCtr = false;
	surplusTimeCtr = false;
	priceRankingCtr = false;
	sortCtr = true;
}
function dogetAuctionInfo(data)//用户拥有的元宝数
{
	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	userOwnGoldNum = data.cashUserHave;
	for(var i = 0 ;i<data.itemSubType.equipment.length; i++)
	{
		equipItemArray[i] = data.itemSubType.equipment[i].name;
		equipValueArray[i] = data.itemSubType.equipment[i].value;
	}
	for(var i = 0 ;i<data.itemSubType.item.length; i++)
	{
		fakeItemArray[i] = data.itemSubType.item[i].name;
		fakeValueArray[i] = data.itemSubType.item[i].value;
	}
	for(var i = 0 ;i<data.itemSubType.material.length; i++)
	{
		materialItemArray[i] = data.itemSubType.material[i].name;
		materialValueArray[i] = data.itemSubType.material[i].value;
	}
	for(var i = 0 ;i<data.itemType.length; i++)
	{
		itemTypeArray[i] = data.itemType[i].value;
	}
}

var browseBuild = function(index)
{
	gbox.setRenderOrder(['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	jishiItemCtr = true;
	var bW = gbox.getImage('pmh_zjm_01').width;
	var bH = gbox.getImage('pmh_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('ty_an_27').width;
	var bH1 = gbox.getImage('ty_an_27').height;
	var backdropX1 = (gbox.getScreenW() - bW)/2;
	var backdropY1 = (gbox.getScreenH() - bH)/2;
	var sW = 23;
	var sH = 81;
	gbox.addObject(
	{ 
		id : 'browsepage',
		group : 'levelMenu_3',
		tileset : 'pmh_zjm_02',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [318,123], [1118,123], [1117,619],[318,619]],
		initialize : function()
		{	
		  if(auctionDisplay)
		  {
		  	    isShowAuctionPorp = false;
		  		if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
				     document.body.removeChild(propAuctionNumbg);  
				     propAuctionNumbg = null;  
				}
			  	if(auctionDivName[0] == null && !gbox._isIndwellDiv("auctionGoldDiv1","input"))
				{
					var pnX = 410;
					var pnY = 297;
					auctionDivName[0] = addDivWindowBg(pnX,pnY);
					auctionDivName[0].id = 'auctionGoldDiv1';
					document.body.appendChild(auctionDivName[0]);
		            auctionDiv[0] = document.createElement("input");
		            auctionDiv[0].style.id = 'goldValue1';
		            auctionDiv[0].style.backgroundColor = '#000000';
		            auctionDiv[0].style.width = '40px';
		            auctionDiv[0].style.height = '20px';
		            auctionDiv[0].style.color = '#ffffff';
		            auctionDiv[0].value = 10;
		            auctionDivName[0].appendChild(auctionDiv[0]);
		            auctionPoly[0] = new Array();
		            auctionPoly[0] = [pnX,pnY,40,20];
				}
			   if(auctionDivName[1] == null && !gbox._isIndwellDiv("auctionGoldDiv2","input"))
				{
					var pnX = 410;
					var pnY = 335;
					auctionDivName[1] = addDivWindowBg(pnX,pnY);
					auctionDivName[1].id = 'auctionGoldDiv2';
					document.body.appendChild(auctionDivName[1]);
		            auctionDiv[1] = document.createElement("input");
		            auctionDiv[1].style.id = 'goldValue2';
		            auctionDiv[1].style.backgroundColor = '#000000';
		            auctionDiv[1].style.width = '40px';
		            auctionDiv[1].style.height = '20px';
		            auctionDiv[1].style.color = '#ffffff';
		            auctionDiv[1].value = 20;
		            auctionDivName[1].appendChild(auctionDiv[1]);
		            auctionPoly[1] = new Array();
		            auctionPoly[1] = [pnX,pnY,40,20];		            
				}
		  	 if(auctionDivName[4] == null && !gbox._isIndwellDiv("paidiplayPageNumDiv","input"))
				{
					var pnX = 987;
					var pnY = 555;
					var divoffsetX = (window.screen.width - 1440)/2;
					auctionDivName[4] = addDivWindowBg(pnX,pnY);
					auctionDivName[4].id = 'paidiplayPageNumDiv';
					document.body.appendChild(auctionDivName[4]);
		            auctionDiv[4] = document.createElement("input");
		            auctionDiv[4].style.id = 'paiPageNum';
		            auctionDiv[4].style.backgroundColor = '#000000';
		            auctionDiv[4].style.width = '30px';
		            auctionDiv[4].style.height = '20px';
		            auctionDiv[4].style.color = '#ffffff';
		            auctionDiv[4].value = 1;
		            auctionDivName[4].appendChild(auctionDiv[4]);
		            auctionPoly[4] = new Array();
		            auctionPoly[4] = [pnX,pnY,30,20];		            
				}
		  }
          if(jingpaiDisplay)
          {
          	 if(auctionDivName[5] == null && !gbox._isIndwellDiv("jingdiplayPageNumDiv","input"))
				{
					var pnX = 802;
					var pnY = 550;
					var divoffsetX = (window.screen.width - 1440)/2;
					auctionDivName[5] = addDivWindowBg(pnX,pnY);
					auctionDivName[5].id = 'jingdiplayPageNumDiv';
					document.body.appendChild(auctionDivName[5]);
		            auctionDiv[5] = document.createElement("input");
		            auctionDiv[5].style.id = 'jingName';
		            auctionDiv[5].style.backgroundColor = '#000000';
		            auctionDiv[5].style.width = '30px';
		            auctionDiv[5].style.height = '20px';
		            auctionDiv[5].style.color = '#ffffff';
		            auctionDiv[5].value = 1;
		            auctionDivName[5].appendChild(auctionDiv[5]);
		            auctionPoly[5] = new Array();
		            auctionPoly[5] = [pnX,pnY,30,20];		            
				}
          }
		  if(browseDisplay)
		  {

		        if(dataRef)
		        {		        	
					AuctionFunction.getAuctionInfo(dogetAuctionInfo);
					jishiList(getClickObjectIndex());
		        }
		  	      
		  	    dataRef = false;
			  	if(browseNameDiv == null && !gbox._isIndwellDiv("browseNameDiv","input"))
				{
					var pnX = 548;
					var pnY = 196;
					browseNameDiv = addDivWindowBg(pnX,pnY);
					browseNameDiv.id = 'browseNameDiv';
					document.body.appendChild(browseNameDiv);
		            browseName = document.createElement("input");
		            browseName.style.id = 'Name';
		            browseName.style.backgroundColor = '#000000';
		            browseName.style.width = '100px';
		            browseName.style.color = '#ffffff';
		            browseName.value == "";
		            browseNameDiv.appendChild(browseName);
				}
			   if(browseLevelDiv == null && !gbox._isIndwellDiv("browseLevelDiv","input"))
				{
					var pnX = 870;
					var pnY = 197;
					var divoffsetX = (window.screen.width - 1440)/2;
					browseLevelDiv = addDivWindowBg(pnX,pnY);
					browseLevelDiv.id = 'browseLevelDiv';
					document.body.appendChild(browseLevelDiv);
		            browseLevel = document.createElement("input");
		            browseLevel.style.id = 'Level';
		            browseLevel.style.backgroundColor = '#000000';
		            browseLevel.style.width = '30px';
		            browseLevel.value = "";
		            browseLevel.style.color = '#ffffff';
		            browseLevelDiv.appendChild(browseLevel);
				}
			  if(browseLevelDiv_2 == null && !gbox._isIndwellDiv("browseLevelDiv_2","input"))
				{
					var pnX = 930;
					var pnY = 197;
					var divoffsetX = (window.screen.width - 1440)/2;
					browseLevelDiv_2 = addDivWindowBg(pnX,pnY);
					browseLevelDiv_2.id = 'browseLevelDiv_2';
					document.body.appendChild(browseLevelDiv_2);
		            browseLevel_2 = document.createElement("input");
		            browseLevel_2.style.id = 'Level_2';
		            browseLevel_2.style.backgroundColor = '#000000';
		            browseLevel_2.style.width = '30px';
		            browseLevel_2.value = "";
		            browseLevel_2.style.color = '#ffffff';
		            browseLevelDiv_2.appendChild(browseLevel_2);
				}
			  if(auctionDivName[6] == null && !gbox._isIndwellDiv("diplayPageNumDiv","input"))
				{
					var pnX = 989;
					var pnY = 556;
					var divoffsetX = (window.screen.width - 1440)/2;
					auctionDivName[6] = addDivWindowBg(pnX,pnY);
					auctionDivName[6].id = 'diplayPageNumDiv';
					document.body.appendChild(auctionDivName[6]);
		            auctionDiv[6] = document.createElement("input");
		            auctionDiv[6].style.id = 'PageNum';
		            auctionDiv[6].style.backgroundColor = '#000000';
		            auctionDiv[6].style.width = '30px';
		            auctionDiv[6].style.height = '20px';
		            auctionDiv[6].style.color = '#ffffff';
		            auctionDivName[6].appendChild(auctionDiv[6]);
		            auctionPoly[6] = new Array();
		            auctionPoly[6] = [pnX,pnY,30,20];		            
				}
		  }
		  
		},
		
		first : function() 
		{	
			/*
			 * 控制浏览器大小变化时DIV输入框自动适配屏幕
			 */
			adaptiveDiv(auctionDivName[0],"auctionGoldDiv1",410);
			adaptiveDiv(auctionDivName[1],"auctionGoldDiv2",410);
			adaptiveDiv(auctionDivName[2],"auctionSilverDiv1",468);
			adaptiveDiv(auctionDivName[3],"auctionSilverDiv2",468);
			adaptiveDiv(auctionDivName[4],"paidiplayPageNumDiv",987);
			adaptiveDiv(auctionDivName[5],"jingdiplayPageNumDiv",802);
			adaptiveDiv(browseNameDiv,"browseNameDiv",548);
			adaptiveDiv(browseLevelDiv,"browseLevelDiv",870);
			adaptiveDiv(browseLevelDiv_2,"browseLevelDiv_2",930);
			adaptiveDiv(auctionDivName[6],"diplayPageNumDiv",989);
			/*======================================================*/
			if(browseDisplay)
			{
				browseLevel.value = browseLevel.value.replace(/\D/g,'');
			    browseLevel_2.value = browseLevel_2.value.replace(/\D/g,'');		    
			}
		    if(jingpaiDisplay)
		    {
		    	if(auctionDivName[5] != null && gbox._isIndwellDiv("jingdiplayPageNumDiv","input"))
		  	         auctionDiv[5].value = auctionDiv[5].value.replace(/\D/g,'');
		    }
		  	if(auctionDisplay)
		    {
		    	if(auctionDivName[0] != null && gbox._isIndwellDiv("auctionGoldDiv1","input")){
			    	auctionDiv[0].value = auctionDiv[0].value.replace(/\D/g,'');
			    	auctionDiv[1].value = auctionDiv[1].value.replace(/\D/g,'');
			  	    auctionDiv[4].value = auctionDiv[4].value.replace(/\D/g,'');
		    	}
		    			    	
		    }
			    for(var i=0; i<auctionPoly.length; i++){
			    	if(typeof(auctionPoly[i]) != "undefined" && typeof(auctionDiv[i]) != "undefined"){
                        auctionDiv[i].style.display="";
			    	}
			    }		    

		},
		myclick : function()
		{

			if(((340 < lastTouchMoveX) && (lastTouchMoveX < 406)) && ((119 < lastTouchMoveY) && (lastTouchMoveY < 185)))
			{
				exit(getClickObjectIndex());
				isPopupBuild = false;
                isShowpmh_List = false;
				browseDisplay = true;
				auctionDisplay = false;
				jingpaiDisplay = false;
				deleteArray();
				for(var a = 0 ; a<4; a++)
				{
		
					{
						browseButtonCtr[a] = false;
					}
				}	
				if(auctionDivName[5] != null && gbox._isIndwellDiv("jingdiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[5]);  
							  auctionDivName[5] = null;
						}
				if(auctionDivName[0] != null && gbox._isIndwellDiv("auctionGoldDiv1","input"))
						{
							  document.body.removeChild(auctionDivName[0]);  
							  auctionDivName[0] = null;
						}
				if(auctionDivName[1] != null && gbox._isIndwellDiv("auctionGoldDiv2","input"))
						{
							  document.body.removeChild(auctionDivName[1]);  
							  auctionDivName[1] = null;
						}
				if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
				            document.body.removeChild(propAuctionNumbg);  
				            propAuctionNumbg = null;  
					}						
				if(auctionDivName[4] != null && gbox._isIndwellDiv("paidiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[4]);  
							  auctionDivName[4] = null;
						}	
				AuctionFunction.getAuctionInfo(dogetAuctionInfo);	
				jishiList(getClickObjectIndex());
				jishiMenu();					
				changeMap('jishiScreen_Layer'); 
			}
			if(((476 < lastTouchMoveX) && (lastTouchMoveX < 530)) && ((119 < lastTouchMoveY) && (lastTouchMoveY < 185)))
			{
				exit(getClickObjectIndex());
				isPopupBuild = false;
                isShowpmh_List = false;				
				browseDisplay = false;
				auctionDisplay = true;
				jingpaiDisplay = false;
				deleteArray();
				if(gbox._isIndwellDiv("browseNameDiv","input"))
						{
							  document.body.removeChild(browseNameDiv);  
							  browseNameDiv = null;
						} 
				if(gbox._isIndwellDiv("browseLevelDiv","input"))
						{
							  document.body.removeChild(browseLevelDiv);  
							  browseLevelDiv = null;
						} 
			    if(gbox._isIndwellDiv("browseLevelDiv_2","input"))
						{
							  document.body.removeChild(browseLevelDiv_2);  
							  browseLevelDiv_2 = null;
						} 
				if(auctionDivName[6] != null && gbox._isIndwellDiv("diplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[6]);  
							  auctionDivName[6] = null;
						}
				if(auctionDivName[5] != null && gbox._isIndwellDiv("jingdiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[5]);  
							  auctionDivName[5] = null;
						} 
		        AuctionFunction.getMyAuctionItemInfo(doMyAuctionItemInfo);	
			}
			if(((407 < lastTouchMoveX) && (lastTouchMoveX < 467)) && ((122 < lastTouchMoveY) && (lastTouchMoveY < 178)))
			{
				exit(getClickObjectIndex());
				isPopupBuild = false;
                isShowpmh_List = false;				
				browseDisplay = false;
				auctionDisplay = false;
				jingpaiDisplay = true;
                deleteArray();
				if(gbox._isIndwellDiv("browseNameDiv","input"))
						{
							  document.body.removeChild(browseNameDiv);  
							  browseNameDiv = null;
						} 
				if(gbox._isIndwellDiv("browseLevelDiv","input"))
						{
							  document.body.removeChild(browseLevelDiv);  
							  browseLevelDiv = null;
						} 
			    if(gbox._isIndwellDiv("browseLevelDiv_2","input"))
						{
							  document.body.removeChild(browseLevelDiv_2);  
							  browseLevelDiv_2 = null;
						} 
				if(auctionDivName[6] != null && gbox._isIndwellDiv("diplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[6]);  
							  auctionDivName[6] = null;
						}
				if(gbox._isIndwellDiv("auctionGoldDiv1","input"))
						{
							  document.body.removeChild(auctionDivName[0]);  
							  auctionDivName[0] = null;
						}
				if(gbox._isIndwellDiv("auctionGoldDiv2","input"))
						{
							  document.body.removeChild(auctionDivName[1]);  
							  auctionDivName[1] = null;
						}
				if(gbox._isIndwellDiv("auctionSilverDiv1","input"))
						{
							  document.body.removeChild(auctionDivName[2]);  
							  auctionDivName[2] = null;
						}
				if(gbox._isIndwellDiv("auctionSilverDiv2","input"))
						{
							  document.body.removeChild(auctionDivName[3]);  
							  auctionDivName[3] = null;
						}
				if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
				            document.body.removeChild(propAuctionNumbg);  
				            propAuctionNumbg = null;  
					}												
				if(gbox._isIndwellDiv("paidiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[4]);  
							  auctionDivName[4] = null;
						}
				AuctionFunction.getMyBidItemInfo(doMyBidItem);
			}
			
            if(browseDisplay)
            {
            	if(typeof(queryIconArray) != "undefined"){
				
					for(var i = 0 ; i<queryIconArray.length;i++)
					{
						if(gbox._mouseArea(liuRectPoly[i],lastTouchMoveX,lastTouchMoveY)){
							liuSelected[i] = true;
							liuauctionIndex = i;
						}else
						    liuSelected[i] = false;
					}
				}
               if(((1016 < lastTouchMoveX) && (lastTouchMoveX < 1067)) && ((197 < lastTouchMoveY) && (lastTouchMoveY < 220)))
               {
               	    var itemName;
               	    var itemLevel;
               	    var levelMax;
               	    var itemType;
               	    var itemSubType;
            		if(browseName.value == "" || browseName.value == null)
            		{
            			itemName = "";
            		}
            		else
            		{
            			itemName = browseName.value;
            		}
            		itemLevel = qualityNum;
            		if(browseLevel_2.value == "" || browseLevel_2.value == null || typeof(browseLevel_2.value ) == "undefined")
            		{
            			levelMax = 0;
            		}
                    else
                    {
                    	levelMax = browseLevel_2.value;
                    }
                    if(browseLevel.value == "" || browseLevel.value == null || typeof(browseLevel.value ) == "undefined")
            		{
            			levelMin = 0;
            		}
                    else
                    {
            		    levelMin = browseLevel.value;
                    }
                    if(browseButtonCtr[0])
                       itemType = 0;
                    if(browseButtonCtr[1])
                       itemType =itemTypeArray[0];
                    else if(browseButtonCtr[2])
                            itemType =itemTypeArray[1];
                    else if(browseButtonCtr[3])
                            itemType =itemTypeArray[2];
                    if(typeof(jsindex_1) == "undefined" || jsindex_1 == -1)
                        itemSubType = 0;
                    else
                    {
                    	if(browseButtonCtr[1])
                         itemSubType = equipValueArray[jsindex_1];
                        if(browseButtonCtr[2])
                         itemSubType = fakeValueArray[jsindex_1]; 
                        if(browseButtonCtr[3])
                         itemSubType = materialValueArray[jsindex_1];
                        if(browseButtonCtr[0]) 
                         itemSubType = 0;                          
                         
                    }
                    deleteArray(); 
                    if(typeof(itemType) != "undefined")            
            		AuctionFunction.getItemInfoInAuction(itemName,itemType,itemSubType,itemLevel,levelMax,levelMin,dogetItemInfoInAuctionorder);
            		qualityNum = 0;
            		browseLevel_2.value = "";
            		browseLevel.value = "";
            		browseName.value = "";				
               }
               if(((919 < lastTouchMoveX) && (lastTouchMoveX < 999)) && ((582 < lastTouchMoveY) && (lastTouchMoveY < 609)))
               {
               	    var btnTxt = new Array();
					btnTxt[0] = "确定";
					btnTxt[1] = "取消";
					isShowAuctionPorp = true;
		            pricePorp(getClickObjectIndex(),"","确定修改竞价吗？",btnTxt,0,20);	
               }
               else 
			   {
							if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input"))
				   	   		{
					            document.body.removeChild(propAuctionNumbg);  
					            propAuctionNumbg = null;  
					        }
					        isShowAuctionPorp = false;
				}

               if(((811 < lastTouchMoveX) && (lastTouchMoveX < 827)) && ((555 < lastTouchMoveY) && (lastTouchMoveY < 569)))//控制向右翻页
               {
               	   if(currentPage < totalPage)
               	     AuctionFunction.getAuctionItemByPage(currentPage + 1,doGetAuctionItemByPage);
               }
               if(((726 < lastTouchMoveX) && (lastTouchMoveX < 747)) && ((555 < lastTouchMoveY) && (lastTouchMoveY < 569)))//控制向左翻页
               {
               	   if(currentPage >= 2)
               	     AuctionFunction.getAuctionItemByPage(currentPage - 1,doGetAuctionItemByPage);
               }
               if(((662 < lastTouchMoveX) && (lastTouchMoveX < 719)) && ((236 < lastTouchMoveY) && (lastTouchMoveY < 253)))
               {
               	    goodsLevelCtr = true;
               	    surplusTimeCtr = false;
               	    priceRankingCtr = false;
               	    //goodsLevel = true;
                    surplusTime = false;
                    priceRanking = false;
                    
               	    if(sortCtr)
               	    {
               	    	if(goodsLevelCtr)
               	           goodsLevel = !goodsLevel;
               	    	if(goodsLevel)
               	           AuctionFunction.getAuctionItemByOrder(4,doGetAuctionItemByOrder);
               	        else
               	           AuctionFunction.getAuctionItemByOrder(5,doGetAuctionItemByOrder);
               	    	
               	    }          	      

               }
               if(((722 < lastTouchMoveX) && (lastTouchMoveX < 812)) && ((236 < lastTouchMoveY) && (lastTouchMoveY < 253)))
               {
               	    goodsLevelCtr = false;
               	    surplusTimeCtr = true;
               	    priceRankingCtr = false;
                    goodsLevel = false;
                    //surplusTime = true;
                    priceRanking = false;
               	    if(sortCtr)
               	    {
               	    	if(surplusTimeCtr)
               	          surplusTime = !surplusTime;
               	    	if(surplusTime)
               	           AuctionFunction.getAuctionItemByOrder(0,doGetAuctionItemByOrder);
               	        else
               	           AuctionFunction.getAuctionItemByOrder(1,doGetAuctionItemByOrder);
               	    	
               	    }

               }
               if(((925 < lastTouchMoveX) && (lastTouchMoveX < 1099)) && ((236 < lastTouchMoveY) && (lastTouchMoveY < 253)))
               {
               	    goodsLevelCtr = false;
               	    surplusTimeCtr = false;
               	    priceRankingCtr = true;
                    goodsLevel = false;
                    surplusTime = false;
                    //priceRanking = true;
               	    if(sortCtr)
               	    {
               	    	if(priceRankingCtr)
               	           priceRanking = !priceRanking;
               	    	if(priceRanking)
               	           AuctionFunction.getAuctionItemByOrder(2,doGetAuctionItemByOrder);
               	        else
               	           AuctionFunction.getAuctionItemByOrder(3,doGetAuctionItemByOrder);
               	    	
               	    }    
               }
              if(((341 < lastTouchMoveX) && (lastTouchMoveX < 367)) && ((240 < lastTouchMoveY) && (lastTouchMoveY < 312)))
              {              	      
						jishiList(getClickObjectIndex());
					    changeMap('jishiScreen_Layer');							
              	        browseButtonCtr[0] = !browseButtonCtr[0];
						for(var a = 0 ; a<4; a++)
						{
							if(a != 0)
							{
								browseButtonCtr[a] = false;
							}
						}
              }
			  if(((344 < lastTouchMoveX) && (lastTouchMoveX < 364)) && ((324 < lastTouchMoveY) && (lastTouchMoveY < 396)))
					{
						jsindex_1 = -1;
						browseButtonCtr[1] = !browseButtonCtr[1];
						for(var a = 0 ; a<4; a++)
						{
							if(a != 1)
							{
								browseButtonCtr[a] = false;
							}
						}
					  if(browseButtonCtr[1])
					  {
				            var content = new Array(equipItemArray);
				            var listLen = content[0].length;
			                if(listLen < 15)
				              listLen = 15;	            
							testOffsetY = test_OffsetY = 0;
							testList.mouseUpIndex = -1;
							testList.update(content,null,listLen);	
							browseBuildIndex = 0;		
							console.log("browseBuildIndex == " + browseBuildIndex);		
					  }
					  else
					  {
					  	   	var _item = new Array();
				            var content = new Array(_item);
				            var listLen = content[0].length;
			                if(listLen < 15)
				              listLen = 15;	            
							testOffsetY = test_OffsetY = 0;
							testList.mouseUpIndex = -1;
							testList.update(content,null,listLen);	
							browseBuildIndex = 0;		
							console.log("browseBuildIndex == " + browseBuildIndex);	
					  }
			         
					}
					if(((344 < lastTouchMoveX) && (lastTouchMoveX < 364)) && ((408 < lastTouchMoveY) && (lastTouchMoveY < 480)))
					{
					    jsindex_1 = -1;
						browseButtonCtr[2] = !browseButtonCtr[2];
						for(var a = 0 ; a<4; a++)
						{
							if(a != 2)
							{
								browseButtonCtr[a] = false;
							}
						}
						if(browseButtonCtr[2])
						{
				            var content = new Array(fakeItemArray);
				            var listLen = content[0].length;
			                if(listLen < 15)
				            listLen = 15;		            
							testOffsetY = test_OffsetY = 0;
							testList.mouseUpIndex = -1;
						    testList.update(content,null,listLen);		
						    browseBuildIndex = 1;			
						    console.log("browseBuildIndex == " + browseBuildIndex);
						}
						else
						{
							var _item = new Array();
				            var content = new Array(_item);
				            var listLen = content[0].length;
			                if(listLen < 15)
				            listLen = 15;		            
							testOffsetY = test_OffsetY = 0;
							testList.mouseUpIndex = -1;
						    testList.update(content,null,listLen);		
						    browseBuildIndex = 1;			
						    console.log("browseBuildIndex == " + browseBuildIndex);
						}

					}
		            if(((344 < lastTouchMoveX) && (lastTouchMoveX < 364)) && ((491 < lastTouchMoveY) && (lastTouchMoveY < 565)))
					{
						jsindex_1 = -1;
						browseButtonCtr[3] = !browseButtonCtr[3];
						for(var a = 0 ; a<4; a++)
						{
							if(a != 3)
							{
								browseButtonCtr[a] = false;
							}
						}
					    if(browseButtonCtr[3])
					    {
					    	//var _item = new Array();
				            var content = new Array(materialItemArray);
				            var listLen = content[0].length;
				            if(listLen < 15)
				                listLen = 15;
							testOffsetY = test_OffsetY = 0;
							testList.mouseUpIndex = -1;
							testList.update(content,null,listLen);		
							browseBuildIndex = 2;	
							console.log("browseBuildIndex == " + browseBuildIndex);	
					    }
					    else
					    {
					    	var _item = new Array();
				            var content = new Array(_item);
				            var listLen = content[0].length;
				            if(listLen < 15)
				                listLen = 15;
							testOffsetY = test_OffsetY = 0;
							testList.mouseUpIndex = -1;
							testList.update(content,null,listLen);		
							browseBuildIndex = 2;	
							console.log("browseBuildIndex == " + browseBuildIndex);	
					    }
	
					 }
					//选择品质
					if(((715 < lastTouchMoveX) && (lastTouchMoveX < 728)) && ((199 < lastTouchMoveY) && (lastTouchMoveY < 217)))
					 {
					 	if(qualityNum < (qualityArray.length - 1))
					 	   qualityNum = qualityNum + 1;
					 	
					 }
					if(((775 < lastTouchMoveX) && (lastTouchMoveX < 793)) && ((199 < lastTouchMoveY) && (lastTouchMoveY < 217)))
					 {
					 	if(qualityNum > 0)
					 	   qualityNum = qualityNum - 1;
					 	
					 }
                    if(((1046 < lastTouchMoveX) && (lastTouchMoveX < 1092)) && ((552 < lastTouchMoveY) && (lastTouchMoveY < 575)))
					 {
					 	if(auctionDiv[6].value > 0 && auctionDiv[6].value <= totalPage)
					 	  AuctionFunction.getAuctionItemByPage(auctionDiv[6].value,doGetAuctionItemByPage);
					 	else
					 	  alert("跳转页数错误");
					 	
					 }
					if(((1012 < lastTouchMoveX) && (lastTouchMoveX < 1094)) && ((584 < lastTouchMoveY) && (lastTouchMoveY < 608)))
					{
					 	   var id;
					 	   id = auctionIdArray[liuauctionIndex];
                           if(id > 0 && currentPage > 0)
                           AuctionFunction.buyItemByFixePrice(id,currentPage,doBuyItemByFixePrice);
					}

		             		 				 

            }
            
			if(auctionDisplay)
		    {
		    		isPopupBuild = false;	
					isShowpmh_List = false;
				if(typeof(queryIconArray) != "undefined"){
				
					for(var i = 0 ; i<queryIconArray.length;i++)
					{
						if(gbox._mouseArea(aRectPoly[i],lastTouchMoveX,lastTouchMoveY)){
							aSelected[i] = true;
							auctionIndex = i;
						}else
							aSelected[i] = false;					
					}
				}
		             //拍卖物品按钮
		             if(((355 < lastTouchMoveX) && (lastTouchMoveX < 400)) && ((225 < lastTouchMoveY) && (lastTouchMoveY < 270)))
		             {
		    			  	if(typeof(queryIconArray) != "undefined"){
		    					auctionIndex = 0;
		    					for(var i = 0 ; i<queryIconArray.length;i++)
		    					{
		    						if(auctionIndex == i){
		    							aSelected[i] = true;
		    						}else
		    							aSelected[i] = false;
		    					}		
		    					
		    				}		            	 
		            	 
						popupButtonCtr[0] = true;
						popupButtonCtr[1] = false;
						popupButtonCtr[2] = false;							       	
			            popupBuild(index,'jishiScreen','jishiScreen_Layer');	
                        var poly = [ [75,250], [305,250], [305,450],[75,450]];
			            pmhList(index,poly, 75, 250, 4, 4, 50, 4, -15, group_src,'jishiScreen_Layer','levelMenu_4');
			            AuctionFunction.getEquipmentForAuction(doEquipmentForAuction);
						changeMap('jishiScreen_Layer');               	    
		             }    
		             
               if(((811 < lastTouchMoveX) && (lastTouchMoveX < 827)) && ((555 < lastTouchMoveY) && (lastTouchMoveY < 569)))//控制向右翻页
               {
               	   if(currentPage < totalPage)
               	     AuctionFunction.getMyAuctionItemByPage(currentPage + 1,doMyAuctionItemByPage);
               }
               if(((726 < lastTouchMoveX) && (lastTouchMoveX < 747)) && ((555 < lastTouchMoveY) && (lastTouchMoveY < 569)))//控制向左翻页
               {
               	   if(currentPage >= 2)
               	     AuctionFunction.getMyAuctionItemByPage(currentPage - 1,doMyAuctionItemByPage);
               }		             
		                 	
				  	     if(((428 < lastTouchMoveX) && (lastTouchMoveX < 446)) && ((394 < lastTouchMoveY) && (lastTouchMoveY < 412)))
				             {				             	
								radioButtonCtr[0] = true;
								for(var a = 0 ; a<3; a++)
								{
									if(a != 0)
									{
										radioButtonCtr[a] = false;
									}
								}
								radioIndex = 0;              	    
				             }else
				 			 if(((428 < lastTouchMoveX) && (lastTouchMoveX < 446)) && ((418 < lastTouchMoveY) && (lastTouchMoveY < 436)))
				             {				             	
								radioButtonCtr[1] = true;
								for(var a = 0 ; a<3; a++)
								{
									if(a != 1)
									{
										radioButtonCtr[a] = false;
									}
								}     
								radioIndex = 1;           	    
				             }else
				 			 if(((428 < lastTouchMoveX) && (lastTouchMoveX < 446)) && ((440 < lastTouchMoveY) && (lastTouchMoveY < 456)))
				             {				             	
								radioButtonCtr[2] = true;
								for(var a = 0 ; a<3; a++)
								{
									if(a != 2)
									{
										radioButtonCtr[a] = false;
									}
								}    
								radioIndex = 2;           	    
				             }else//开始拍卖
							   if(((386 < lastTouchMoveX) && (lastTouchMoveX < 470)) && ((538 < lastTouchMoveY) && (lastTouchMoveY < 564)))
				               {
								   if(typeof(gkData[pmhIndex]) != "undefined"){
									   var basePrice = auctionDiv[0].value;
									   var fixedPrice=auctionDiv[1].value;
									   
									   if(gkData[pmhIndex].type != 1){//判断不是装备类型
									   		contValue = contValue;
										    if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input"))
										       contValue = propAuctionNum.value;
										       
										   if(contValue > 1)    
										       AuctionFunction.sellItemByAuction(gkData[pmhIndex].id,gkData[pmhIndex].type, basePrice, fixedPrice, radioIndex, contValue, doSellItemByAuction);	
										   else
										       AuctionFunction.sellItemByAuction(gkData[pmhIndex].id, gkData[pmhIndex].type,basePrice, fixedPrice, radioIndex, 1, doSellItemByAuction);
									   }else
									       AuctionFunction.sellItemByAuction(gkData[pmhIndex].id, gkData[pmhIndex].type,basePrice, fixedPrice, radioIndex, 1, doSellItemByAuction);				   
				                   }else{
				     				  browseBuild(getClickObjectIndex());
				    			      changeMap('jishiScreen_Layer');
				    			  	if(typeof(queryIconArray) != "undefined"){
				    					auctionIndex = 0;
				    					for(var i = 0 ; i<queryIconArray.length;i++)
				    					{
				    						if(auctionIndex == i){
				    							aSelected[i] = true;
				    						}else
				    							aSelected[i] = false;
				    					}		
				    					
				    				}				    			      
				                	   alert("请先选择上拍物品！");
				                   }
				                	   
				                	   
				               }else//停止拍卖
				               if(((1012 < lastTouchMoveX) && (lastTouchMoveX < 1096)) && ((584 < lastTouchMoveY) && (lastTouchMoveY < 608)))
				               {
				               	    //if(typeof(userAuctionItem[auctionIndex]) != "undefined" &&
				               	     //  typeof(userAuctionItem[auctionIndex].auctionInfo) != "undefined"){
				               	       AuctionFunction.cancelAuctionOperate( auctionIdArray[auctionIndex],  currentPage, doCancelAuctionOperate);
				               	    //}
				               	    
				               }else//跳转页码
				               if(((1045 < lastTouchMoveX) && (lastTouchMoveX < 1092)) && ((553 < lastTouchMoveY) && (lastTouchMoveY < 575)))
				               {
                                    if(auctionDivName[4] != null && gbox._isIndwellDiv("paidiplayPageNumDiv","input")){
                      				    if(auctionDiv[4].value > totalPage){
                      				    	auctionDiv[4].value = totalPage;
				               	    		alert("已超过页码最大数量！");
				               	    	}              	
				               	          AuctionFunction.getMyAuctionItemByPage( auctionDiv[4].value, doMyAuctionItemByPage);
                                    }
				               }				                				               
		             }	
		    if(jingpaiDisplay)
		    {
				if(typeof(queryIconArray) != "undefined"){
					for(var i = 0 ; i<queryIconArray.length;i++)
					{
						if(gbox._mouseArea(aRectPoly[i],lastTouchMoveX,lastTouchMoveY)){
							aSelected[i] = true;
							auctionIndex = i;
						}else
							aSelected[i] = false;						
					}
				}
                //一口价
				if(((1012 < lastTouchMoveX) && (lastTouchMoveX < 1096)) && ((584 < lastTouchMoveY) && (lastTouchMoveY < 608)))
				{
				   //console.log("auctionIdArray[auctionIndex] = " + auctionIdArray[auctionIndex]);
				   AuctionFunction.buyItemByFixedPriceInBidPage(auctionIdArray[auctionIndex],currentPage,doBuyItemByFixedPriceInBidPage);

				}else//跳转页码
				if(((861 < lastTouchMoveX) && (lastTouchMoveX < 907)) && ((550 < lastTouchMoveY) && (lastTouchMoveY < 572)))
				{
                     if(auctionDivName[5] != null && gbox._isIndwellDiv("jingdiplayPageNumDiv","input")){
                      	if(auctionDiv[5].value > totalPage){
                      		auctionDiv[5].value = totalPage;
				            alert("已超过页码最大数量！");
				        }              	
				        AuctionFunction.getMyBidItemByPage( auctionDiv[5].value, doMyBidItemByPage);
                      }
				}else//刷新
				if(((1048 < lastTouchMoveX) && (lastTouchMoveX < 1095)) && ((547 < lastTouchMoveY) && (lastTouchMoveY < 571)))
				{
                      	if(totalPage > 0){
                      		AuctionFunction.getMyBidItemByPage( currentPage, doMyBidItemByPage);
				        }else{
		     				  browseBuild(getClickObjectIndex());
		    			      changeMap('jishiScreen_Layer');
				        	  alert("暂时没有数据！");
				        }
				        
                      
				}
								
               if(((720 < lastTouchMoveX) && (lastTouchMoveX < 736)) && ((555 < lastTouchMoveY) && (lastTouchMoveY < 569)))//控制向右翻页
               {
               	   if(currentPage < totalPage)
               	     AuctionFunction.getMyBidItemByPage(currentPage + 1,doMyBidItemByPage);
               }
               if(((640 < lastTouchMoveX) && (lastTouchMoveX < 656)) && ((555 < lastTouchMoveY) && (lastTouchMoveY < 569)))//控制向左翻页
               {
               	   if(currentPage >= 2)
               	     AuctionFunction.getMyBidItemByPage(currentPage - 1,doMyBidItemByPage);
               }					    	
		    }
            if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y + gbox.getImage("ty_an_17").height)))
			{
			    	jishiItemCtr = false;
					if(gbox._isIndwellDiv("browseNameDiv","input"))
						{
							  document.body.removeChild(browseNameDiv);  
							  browseNameDiv = null;
						} 
				    if(gbox._isIndwellDiv("browseLevelDiv","input"))
						{
							  document.body.removeChild(browseLevelDiv);  
							  browseLevelDiv = null;
						} 
					if(gbox._isIndwellDiv("browseLevelDiv_2","input"))
						{
							  document.body.removeChild(browseLevelDiv_2);  
							  browseLevelDiv_2 = null;
						} 
				   	if(auctionDivName[6] != null && gbox._isIndwellDiv("diplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[6]);  
							  auctionDivName[6] = null;
						}
					if(auctionDivName[5] != null && gbox._isIndwellDiv("jingdiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[5]);  
							  auctionDivName[5] = null;
						}
				if(gbox._isIndwellDiv("auctionGoldDiv1","input"))
						{
							  document.body.removeChild(auctionDivName[0]);  
							  auctionDivName[0] = null;
						}
				if(gbox._isIndwellDiv("auctionGoldDiv2","input"))
						{
							  document.body.removeChild(auctionDivName[1]);  
							  auctionDivName[1] = null;
						}
				if(gbox._isIndwellDiv("auctionSilverDiv1","input"))
						{
							  document.body.removeChild(auctionDivName[2]);  
							  auctionDivName[2] = null;
						}
				if(gbox._isIndwellDiv("auctionSilverDiv2","input"))
						{
							  document.body.removeChild(auctionDivName[3]);  
							  auctionDivName[3] = null;
						}	
				if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
				            document.body.removeChild(propAuctionNumbg);  
				            propAuctionNumbg = null;  				            
					}											
					if(gbox._isIndwellDiv("paidiplayPageNumDiv","input"))
						{
							  document.body.removeChild(auctionDivName[4]);  
							  auctionDivName[4] = null;
						}
					browseDisplay = false;
					auctionDisplay = false;
					jingpaiDisplay = false;
					jishiItemCtr = false;
					deleteArray();
					sortCtr = false;

					exit(getClickObjectIndex());
					jishiMenu();					
					changeMap('jishiScreen_Layer'); 
			}
			else
			{	
				  browseBuild(getClickObjectIndex());
			      changeMap('jishiScreen_Layer');
			}

		},
		

		blit : function()
		{
			
			if(auctionDisplay)
		    {
		      if(isDrawUI[index]&& jishiItemCtr)
				{
				   gbox.drawImage('pmh_zjm_02',backdropX,backdropY);
				   gbox.drawImage('ty_an_27',backdropX1-1,backdropY1+10);
				   gbox.drawImage('pmh_zjm_04',(gbox.getImage('pmh_zjm_02').width - gbox.getImage("pmh_zjm_04").width)/2 + backdropX,backdropY1);
		
				   gbox.drawImage('pmh_zjm_09',349,130);
				   gbox.drawImage('pmh_zjm_06',414,130);
				   gbox.drawImage('pmh_zjm_11',478,121);
				   if(radioButtonCtr[0])
	               {
	               	gbox.drawImage('ty_an_12',424,391);
	               }else
	               if(radioButtonCtr[1])
	               {
	               	gbox.drawImage('ty_an_12',424,415);
	               }else
	               if(radioButtonCtr[2])
	               {
	               	gbox.drawImage('ty_an_12',424,437);
	               }
	               
	               
				if(typeof(queryIconArray) != "undefined"){
				
					for(var i = 0 ; i<queryIconArray.length;i++)
					{
						if(gbox.getImage(""+ queryIconArray[i]) != null){
						     gbox.drawImage("" + queryIconArray[i],526,223 + i*37);
						}
						
						if(typeof(userAuctionItem[i]) != "undefined" &&
						   typeof(userAuctionItem[i].userItem) != "undefined"){
							if(userAuctionItem[i].userItem.itemCounts > 1){
								var rW = 30;
								var rH = 30;
								var strW = gbox.getTextWidth("" + userAuctionItem[i].userItem.itemCounts,8);
								var cntX = 525 + (rW - strW);
								var cntY = (223 + i*37) + (rH - 10);
								gbox.drawText(userAuctionItem[i].userItem.itemCounts,cntX,cntY,4);								
							}
						}
						var rW = 35;
						var rH = 35;					
						gbox.strokeRect(gbox.getBufferContext(),{x:526,y:221 + (i*37) + 1,w:rW - 3,h:rH -3,
						globalAlpha:.4,color:paiNameColor[i]});	
						var strW = gbox.getTextWidth(equipmentNameArray[i],14);
				        var cntX = 559 + (102 - strW)/2;
				        var cntY = 222 + (36 - 14)/2;
				        gbox.drawText(equipmentNameArray[i],cntX,cntY + i*37,5,jstopTipDataArray[i].toolTipInfo.quality);
						var strW = gbox.getTextWidth(goodsLevelArray[i],14);
				        var cntX = 657 + (67 - strW)/2;
				        var cntY = 222 + (36 - 14)/2;
				        gbox.drawText(goodsLevelArray[i],cntX,cntY + i*37,2);
				        var strW = gbox.getTextWidth(surplusTimeArray[i]+ "小时",14);
				        var cntX = 723 + (93 - strW)/2;
				        var cntY = 222 + (36 - 14)/2;
				        gbox.drawText(surplusTimeArray[i]+ "小时",cntX,cntY + i*37,2);
						var strW = gbox.getTextWidth(sellPeopleArray[i],14);
				        var cntX = 816 + (113 - strW)/2;
				        var cntY = 222 + (36 - 14)/2;	
				        gbox.drawText(sellPeopleArray[i],cntX,cntY + i*37,2);				
						gbox.drawText(basePriceGoldArray[i],1025,227 + i*37,2);
						gbox.drawImage("pmh_zjm_53",gbox.getBufferContext().measureText(basePriceGoldArray[i]).width + 1030,230+i*37);
						gbox.drawText(fixedPriceGoldArray[i],1025,241 + i*37,2);
						gbox.drawImage("pmh_zjm_53",gbox.getBufferContext().measureText(basePriceGoldArray[i]).width + 1030,244+i*37);											
						var rW = 575;
						var rH = 36;
						var rX = 525;
						var rY = (220 + i*37);
						aRectPoly[i] = [[rX,rY], [rX + rW, rY], [rX + rW,rY + rH],[rX,rY + rH]];
						if(aSelected[i]){
							var rect = new Rect(rX + 1, rY + 1,rW - 2,rH -2);
						    gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#00FFFF","#00FFFF",false);								
						}
						
						if(gbox._mouseArea(aRectPoly[i],touchMoveX,touchMoveY)){
							var rect = new Rect(rX + 1, rY + 1,rW - 2,rH -2);
						    gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#FFFF00","#FFFF00",false);		
						}
						gbox.drawImage("pmh_zjm_51",937,239 + i*37);
											
					}
					//绘制翻页数字及按钮
					gbox.drawText(currentPage + "/" + totalPage,767,557,10);
					gbox.drawImage("ty_an_25",739,556);
					gbox.drawImage("ty_an_24",808,556);
				}		               
		       //图标按钮
			   if(typeof(gkData[pmhIndex]) != "undefined" && 
			      typeof(gkData[pmhIndex].item) != "undefined"){
				   if(gbox.getImage(gkData[pmhIndex].item.itemIcon) != null){
				   	  gbox.drawImage(gkData[pmhIndex].item.itemIcon,360,235);
				   }
				   if(gkData[pmhIndex].type == 1)
				   {
				   	   gbox.drawText(gkData[pmhIndex].toolTipInfo.equipmentName,405,245,10,gkData[pmhIndex].toolTipInfo.quality);
				   }
				   if(gkData[pmhIndex].type == 2)
				   {
				   	   gbox.drawText(gkData[pmhIndex].toolTipInfo.itemName,405,245,10,gkData[pmhIndex].toolTipInfo.quality);
				   }
				   if(gkData[pmhIndex].type == 3 || gkData[pmhIndex].type == 4)
				   {
				   	   gbox.drawText(gkData[pmhIndex].toolTipInfo.materialName,405,245,10,gkData[pmhIndex].toolTipInfo.quality);
				   }

				   if(gkData[pmhIndex].type != 1){//判断不是装备类型
				   	   contValue = contValue;
					   if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input"))
					       contValue = propAuctionNum.value;
					    if(contValue > 1){   
							var rW = 50;
							var rH = 50;
							var strW = gbox.getTextWidth("" + contValue,12);
							var cntX = 354 + (rW - strW);
							var cntY = 227 + (rH - 14);
							gbox.drawText(contValue,cntX,cntY,4);
					    }			   
				   }
				   gbox.drawImage("pmh_zjm_53",456,304);
	               gbox.drawImage("pmh_zjm_53",456,343);   
	               if(((355 < touchMoveX) && (touchMoveX < 400)) && ((225 < touchMoveY) && (touchMoveY < 270)))
	               {	  
	               	   if(typeof(gkData[pmhIndex]) != "undefined"){
	               	   	    if(gkData[pmhIndex].type == 1)
	               	   	    {
	               	   	    	for(var i =0; i<2; i++)
					               {		       
					               	   if(gbox.intersectRect(auctionPoly[i][0], auctionPoly[i][1],auctionPoly[i][2], auctionPoly[i][3],touchMoveX + 15,touchMoveY + 15,tooltip.width,tooltip.computEquipment))
						               {
						               	  auctionDiv[i].style.display="none";
						               }
						               else
						               {
						               	  auctionDiv[i].style.display="block";
						               }
					               }
					            if(touchMoveX !=0)
	               	   	    	  tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + 15,touchMoveY + 15,gkData[pmhIndex].toolTipInfo);
	               	   	    }
	               	   	     
	               	   	    if(gkData[pmhIndex].type == 3 || gkData[pmhIndex].type == 4)
	               	   	    {
	               	   	    	for(var i =0; i<2; i++)
					               {		       
					               	   if(gbox.intersectRect(auctionPoly[i][0], auctionPoly[i][1],auctionPoly[i][2], auctionPoly[i][3],touchMoveX + 15,touchMoveY + 15,tooltip.width,tooltip.computEquipment))
						               {
						               	  auctionDiv[i].style.display="none";
						               }
						               else
						               {
						               	  auctionDiv[i].style.display="";
						               }
					               }
					            if(touchMoveX !=0)
					               tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + 15,touchMoveY + 15,gkData[pmhIndex].toolTipInfo);
	               	   	    }
	               	   	    
	               	   	    if(gkData[pmhIndex].type == 2)
	               	   	    {
	               	   	    	for(var i =0; i<2; i++)
					               {		       
					               	   if(gbox.intersectRect(auctionPoly[i][0], auctionPoly[i][1],auctionPoly[i][2], auctionPoly[i][3],touchMoveX + 15,touchMoveY + 15,tooltip.width,tooltip.windowEquipmentHeight))
						               {
						               	  auctionDiv[i].style.display="none";
						               }
						               else
						               {
						               	  auctionDiv[i].style.display="";
						               }
					               }
					            if(touchMoveX !=0)
					               tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + 15,touchMoveY + 15,gkData[pmhIndex].toolTipInfo);
	               	   	    }
	               	   	     
	               	   }             	   
	               }
	            			      
			   }	
			   
	               if(typeof(savingTimeInfo[radioIndex]) != "undefined"){
						var strW = gbox.getTextWidth("" + savingTimeInfo[radioIndex].needMoney,10);
						var cntX = 408;
						var cntY = 495;
						gbox.drawText(savingTimeInfo[radioIndex].needMoney,cntX,cntY,10);
			            gbox.drawImage("pmh_zjm_52",gbox.getBufferContext().measureText(savingTimeInfo[radioIndex].needMoney).width + cntX + 5,cntY - 2); 
						var strW = gbox.getTextWidth("" + resourcemoney,10);
						var cntX = 403;
						var cntY = 590;
						gbox.drawText(resourcemoney,cntX,cntY,10);
	               }	               
	               //绘制搜索按钮加亮以及文字
	               gbox.drawImage('ty_an_10',385,537);
	               if(((386 < touchMoveX) && (touchMoveX < 470)) && ((538 < touchMoveY) && (touchMoveY < 564)))
	               {
	               	    gbox.drawImage('ty_an_09',385,537);
	               }
	               var strW = gbox.getTextWidth("开始拍卖",14);
				   var cntX = 385 + (gbox.getImage("ty_an_09").width - strW)/2;
				   var cntY = 537 + (gbox.getImage("ty_an_09").height - 14)/2;
				   gbox.drawText("开始拍卖",cntX,cntY,10);
	               //绘制跳转按钮加亮以及文字
	               gbox.drawImage('ty_an_08',1044,554);
	               if(((1045 < touchMoveX) && (touchMoveX < 1092)) && ((553 < touchMoveY) && (touchMoveY < 575)))
	               {
	               	    gbox.drawImage('ty_an_06',1044,554);
	               }
	               var strW = gbox.getTextWidth("跳转",14);
				   var cntX = 1044 + (gbox.getImage("ty_an_06").width - strW)/2;
				   var cntY = 554 + (gbox.getImage("ty_an_06").height - 14)/2;
			       gbox.drawText("跳转",cntX,cntY,10);
	               //绘制停止拍卖按钮加亮以及文字
	               gbox.drawImage('ty_an_10',1013,584);
	               if(((1012 < touchMoveX) && (touchMoveX < 1096)) && ((584 < touchMoveY) && (touchMoveY < 608)))
	               {
	               	    gbox.drawImage('ty_an_09',1013,584);
	               }       
	               var strW = gbox.getTextWidth("开始拍卖",14);
				   var cntX = 1013 + (gbox.getImage("ty_an_09").width - strW)/2;
				   var cntY = 584 + (gbox.getImage("ty_an_09").height - 14)/2;
			       gbox.drawText("开始拍卖",cntX,cntY,10);
	               
	              
                   for(var i =0 ;i < 9; i++)
					   {
							if(((525 < touchMoveX) && (touchMoveX < 557)) && ((220 + i*37 < touchMoveY) && (touchMoveY < 254 + i*37)))
						     {
						     	if(typeof(jstopTipDataArray[i]) != "undefined")
						     	{		
						     		switch(jstopTipDataArray[i].toolTipInfo.type)
						     		{
						     			 case 1:
						     			    var mouseY = 0;
								    		var tempH = tooltip.computEquipment(gbox.getBufferContext(),jstopTipDataArray[i].toolTipInfo).height;
								    		if((gbox.getScreenH() - touchMoveY) < tempH)	
								    		{
								    			mouseY = gbox.getScreenH() - tempH;
								    		}
								    		else
										    {
										    	mouseY = touchMoveY;
										    }
										    if(touchMoveX !=0)
					               	  	      tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,mouseY,jstopTipDataArray[i].toolTipInfo);
					               	  	   break;
					               	  	 case 2:
					               	  	   if(touchMoveX !=0)
					               	  	      tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,jstopTipDataArray[i].toolTipInfo);
					               	  	   break;
					               	  	 case 3:
					               	  	   if(touchMoveX !=0) 
					               	  	      tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,jstopTipDataArray[i].toolTipInfo);
					               	  	   break; 
					               	  	 case 4:
					               	  	   if(touchMoveX !=0)
					               	  	      tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,jstopTipDataArray[i].toolTipInfo);
					               	  	   break; 
						     		}
						     	}
						     
						     }
					 }  
					     
				}
		    }
		    if(jingpaiDisplay)
		    {
		    	if(isDrawUI[index] && jishiItemCtr)
		    	{
		    	   gbox.drawImage('pmh_zjm_03',backdropX,backdropY);
		    	   gbox.drawImage('ty_an_27',backdropX1-2,backdropY1+10);
				   gbox.drawImage('pmh_zjm_04',(gbox.getImage('pmh_zjm_03').width - gbox.getImage("pmh_zjm_04").width)/2 + backdropX,backdropY1);
	               //元宝数
	               gbox.drawText(userOwnGoldNum,370,590,10);	               	                		
					gbox.drawImage("pmh_zjm_53",gbox.getBufferContext().measureText(userOwnGoldNum).width + 385,593); 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
				if(typeof(queryIconArray) != "undefined"){
				
					for(var i = 0 ; i<queryIconArray.length;i++)
					{
                      if(gbox.getImage(""+ queryIconArray[i]) != null)						
						 gbox.drawImage("" + queryIconArray[i],352,215 + i*37);
					  else
					     gbox.drawImage("pmh_zjm_40",350,215 + i*37);
						
						if(typeof(userAuctionItem[i]) != "undefined" &&
						   typeof(userAuctionItem[i].userItem) != "undefined"){
							if(userAuctionItem[i].userItem.itemCounts > 1){
								var rW = 30;
								var rH = 30;
								var strW = gbox.getTextWidth("" + userAuctionItem[i].userItem.itemCounts,8);
								var cntX = 350 + (rW - strW);
								var cntY = (216 + i*37) + (rH - 10);
								gbox.drawText(userAuctionItem[i].userItem.itemCounts,cntX,cntY,5);
							}
						}	
						var rW = 35;
						var rH = 35;					
						gbox.strokeRect(gbox.getBufferContext(),{x:349,y:211 + (i*37) + 1,w:rW - 3,h:rH -3,
						globalAlpha:.4,color:jingNameColor[i]});					
						var strW = gbox.getTextWidth(equipmentNameArray[i],14);
				        var cntX = 384 + (147 - strW)/2;
				        var cntY = 209 + (33 - 14)/2;
				        gbox.drawText(equipmentNameArray[i],cntX,cntY + i*37,5,jstopTipDataArray[i].toolTipInfo.quality);
				        
						var strW = gbox.getTextWidth(goodsLevelArray[i],14);
				        var cntX = 532 + (80 - strW)/2;
				        var cntY = 209 + (33 - 14)/2;
				        gbox.drawText(goodsLevelArray[i],cntX,cntY + i*37,2);
				        
                        var strW = gbox.getTextWidth(surplusTimeArray[i] + "小时",14);
				        var cntX = 611 + (145 - strW)/2;
				        var cntY = 209 + (33 - 14)/2;
				        gbox.drawText(surplusTimeArray[i] + "小时",cntX,cntY + i*37,2);
				        
                        var strW = gbox.getTextWidth(sellPeopleArray[i],14);
				        var cntX = 756 + (156 - strW)/2;
				        var cntY = 209 + (33 - 14)/2;
						gbox.drawText(sellPeopleArray[i],cntX,cntY + i*37,2);						
						gbox.drawText(basePriceGoldArray[i],1025,217 + i*37,2);
						gbox.drawImage("pmh_zjm_53",gbox.getBufferContext().measureText(basePriceGoldArray[i]).width + 1030,220+i*37);						
						gbox.drawText(fixedPriceGoldArray[i],1025,231 + i*37,2);
						gbox.drawImage("pmh_zjm_53",gbox.getBufferContext().measureText(basePriceGoldArray[i]).width + 1030,234+i*37);					
									
						var rW = 755;
						var rH = 36;
						var rX = 345;
						var rY = (209 + i*37);
						aRectPoly[i] = [[rX,rY], [rX + rW, rY], [rX + rW,rY + rH],[rX,rY + rH]];
						if(aSelected[i]){
							var rect = new Rect(rX + 1, rY + 1,rW - 2,rH -2);
						    gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#00FFFF","#00FFFF",false);								
						}
						
						if(gbox._mouseArea(aRectPoly[i],touchMoveX,touchMoveY)){
							var rect = new Rect(rX + 1, rY + 1,rW - 2,rH -2);
						    gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#FFFF00","#FFFF00",false);		
						}
						gbox.drawImage("pmh_zjm_51",937,229 + i*37);

											
					}
					//绘制翻页数字及按钮
					gbox.drawText(currentPage + "/" + totalPage,675,552,10);
					gbox.drawImage("ty_an_25",646,552);
					gbox.drawImage("ty_an_24",715,552);
				}
					 gbox.drawImage('pmh_zjm_09',347,133);
					 gbox.drawImage('pmh_zjm_12',485,133);
					 gbox.drawImage('pmh_zjm_05',410,124);
		              //绘制跳转按钮加亮以及文字
		             gbox.drawImage('ty_an_08',860,548);
		             if(((861 < touchMoveX) && (touchMoveX < 907)) && ((550 < touchMoveY) && (touchMoveY < 572)))
		               {
		               	    gbox.drawImage('ty_an_06',860,548);
		               }
		             var strW = gbox.getTextWidth("跳转",14);
				     var cntX = 860 + (gbox.getImage("ty_an_06").width - strW)/2;
				     var cntY = 548 + (gbox.getImage("ty_an_06").height - 14)/2;
				     gbox.drawText("跳转",cntX,cntY,10);
		               //绘制充值按钮加亮以及文字
		             gbox.drawImage('ty_an_08',459,583);
		             if(((458 < touchMoveX) && (touchMoveX < 506)) && ((578 < touchMoveY) && (touchMoveY < 604)))
		               {
		               	    gbox.drawImage('ty_an_06',459,583);
		               }
		             var strW = gbox.getTextWidth("充值",14);
				     var cntX = 459 + (gbox.getImage("ty_an_06").width - strW)/2;
				     var cntY = 583 + (gbox.getImage("ty_an_06").height - 14)/2;
				      gbox.drawText("充值",cntX,cntY,10);
		             //绘制刷新按钮加亮以及文字
		              gbox.drawImage('ty_an_10',923,583);
		             if(((922 < touchMoveX) && (touchMoveX < 1007)) && ((581 < touchMoveY) && (touchMoveY < 607)))
		               {
		               	    gbox.drawImage('ty_an_09',923,583);
		               }
		             var strW = gbox.getTextWidth("刷新",14);
				     var cntX = 923 + (gbox.getImage("ty_an_09").width - strW)/2;
				     var cntY = 583 + (gbox.getImage("ty_an_09").height - 14)/2;
				      gbox.drawText("刷新",cntX,cntY,10);
		            //绘制一口价按钮加亮以及文字
		             gbox.drawImage('ty_an_10',1018,583);
		              if(((1012 < touchMoveX) && (touchMoveX < 1096)) && ((584 < touchMoveY) && (touchMoveY < 608)))
		               {
		               	    gbox.drawImage('ty_an_09',1018,583);
		               }
		              var strW = gbox.getTextWidth("一口价",14);
				      var cntX = 1018 + (gbox.getImage("ty_an_09").width - strW)/2;
				      var cntY = 583 + (gbox.getImage("ty_an_09").height - 14)/2;
				      gbox.drawText("一口价",cntX,cntY,10);
                        for(var i =0 ;i < 9; i++)
					   {
							if(((350 < touchMoveX) && (touchMoveX < 382)) && ((211 + i*37 < touchMoveY) && (touchMoveY < 247 + i*37)))
						     {
						     	var tempOffset = 15;
						     	if(typeof(jstopTipDataArray[i]) != "undefined")
						     	{		
						     		switch(jstopTipDataArray[i].toolTipInfo.type)
						     		{
						     			 case 1:
						     			    var mouseY = 0;
								    		var tempH = tooltip.computEquipment(gbox.getBufferContext(),jstopTipDataArray[i].toolTipInfo).height;
								    		if((gbox.getScreenH() - touchMoveY) < tempH)	
								    		{
								    			mouseY = gbox.getScreenH() - tempH;
								    		}
								    		else
										    {
										    	mouseY = touchMoveY;
										    }
										    if(touchMoveX !=0)
					               	  	    tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,mouseY+ tempOffset,jstopTipDataArray[i].toolTipInfo);
					               	  	   break;
					               	  	 case 2:
						               	  	 if(touchMoveX !=0)
						               	  	   tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX+ tempOffset,touchMoveY+ tempOffset,jstopTipDataArray[i].toolTipInfo);
					               	  	   break;
					               	  	 case 3:
						               	  	 if(touchMoveX !=0)
						               	  	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX+ tempOffset,touchMoveY+ tempOffset,jstopTipDataArray[i].toolTipInfo);
					               	  	   break; 
					               	  	 case 4:
						               	  	 if(touchMoveX !=0)
						               	  	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX+ tempOffset,touchMoveY+ tempOffset,jstopTipDataArray[i].toolTipInfo);
					               	  	   break; 
						     		}
						     	}
						     
						     }
					 }
		    	}
		  	        
		    }
			if(browseDisplay)
			{
				if(isDrawUI[index] && jishiItemCtr)
				{
					
				   gbox.drawImage('pmh_zjm_01',backdropX,backdropY);
				   gbox.drawImage('ty_an_27',backdropX1,backdropY1 + 9);
				   gbox.drawImage('pmh_zjm_04',(gbox.getImage('pmh_zjm_01').width - gbox.getImage("pmh_zjm_04").width)/2 + backdropX,backdropY1);
				   gbox.drawImage('pmh_zjm_06',427,135);
				   gbox.drawImage('pmh_zjm_12',493,135);
				   gbox.drawImage('pmh_zjm_08',345,124);
	               if(browseButtonCtr[0])
	               {
	               	   gbox.drawImage('pmh_zjm_15',342,240);	               	   
	               }	              
	               if(browseButtonCtr[1])
	               {
	               	   
	               	   gbox.drawImage('pmh_zjm_16',342,324);	
	               }	               
	               if(browseButtonCtr[2])
	               {
	               	   gbox.drawImage('pmh_zjm_17',342,408);	
	               }	             
	               if(browseButtonCtr[3])
	               {
	               	   gbox.drawImage('pmh_zjm_18',342,492);
	               }	              
	               //绘制选择品质
	               //gbox.drawString("" + qualityArray[qualityNum],627,203,'#FFFFFF');
	               gbox.drawText(qualityArray[qualityNum],735,203,10);	               
	               //绘制选择品质左右选择按钮
	               if(qualityNum > 0)
	               {
	               	  
	               	   gbox.drawImage('ty_an_24',775,200);
	               }
	               if(qualityNum < (qualityArray.length - 1))
	               {
	               	    gbox.drawImage('ty_an_25',710,200);
	               }
	               //绘制搜索按钮加亮以及文字
	               gbox.drawImage('ty_an_08',1017,196);
	               if(((1019 < touchMoveX) && (touchMoveX < 1067)) && ((196 < touchMoveY) && (touchMoveY < 220)))
	               {
	               	    gbox.drawImage('ty_an_06',1017,196);
	               }
	               var strW = gbox.getTextWidth("搜索",14);
				   var cntX = 1016 + (gbox.getImage("ty_an_06").width - strW)/2;
				   var cntY = 196 + (gbox.getImage("ty_an_06").height - 14)/2;
				   gbox.drawText("搜索", cntX,cntY,10);
	               //绘制跳转按钮加亮以及文字
	               gbox.drawImage('ty_an_08',1044,553);
	               if(((1045 < touchMoveX) && (touchMoveX < 1092)) && ((553 < touchMoveY) && (touchMoveY < 575)))
	               {
	               	    gbox.drawImage('ty_an_06',1044,553);
	               }
	               var strW = gbox.getTextWidth("跳转",14);
				   var cntX = 1045 + (gbox.getImage("ty_an_06").width - strW)/2;
				   var cntY = 553 + (gbox.getImage("ty_an_06").height - 14)/2;
				   gbox.drawText("跳转", cntX,cntY,10);
	               //绘制充值按钮加亮以及文字
	               gbox.drawImage('ty_an_08',458,582);
	               if(((458 < touchMoveX) && (touchMoveX < 506)) && ((578 < touchMoveY) && (touchMoveY < 604)))
	               {
	               	    gbox.drawImage('ty_an_06',458,582);
	               }
	               var strW = gbox.getTextWidth("充值",14);
				   var cntX = 458 + (gbox.getImage("ty_an_06").width - strW)/2;
				   var cntY = 582 + (gbox.getImage("ty_an_06").height - 14)/2;
				   gbox.drawText("充值", cntX,cntY,10);
	               //绘制竞价按钮加亮以及文字
	               gbox.drawImage('ty_an_10',918,583);
	               if(((917 < touchMoveX) && (touchMoveX < 999)) && ((584 < touchMoveY) && (touchMoveY < 608)))
	               {
	               	    gbox.drawImage('ty_an_09',918,583);
	               }
	               var strW = gbox.getTextWidth("竞价",14);
				   var cntX = 918 + (gbox.getImage("ty_an_09").width - strW)/2;
				   var cntY = 583 + (gbox.getImage("ty_an_09").height - 14)/2;
				   gbox.drawText("竞价", cntX,cntY,10);
	               //绘制一口价按钮加亮以及文字
	               gbox.drawImage('ty_an_10',1013,583);
	               if(((1012 < touchMoveX) && (touchMoveX < 1096)) && ((584 < touchMoveY) && (touchMoveY < 608)))
	               {
	               	    gbox.drawImage('ty_an_09',1013,583);
	               }
	               var strW = gbox.getTextWidth("一口价",14);
				   var cntX = 1013 + (gbox.getImage("ty_an_09").width - strW)/2;
				   var cntY = 583 + (gbox.getImage("ty_an_09").height - 14)/2;
				   gbox.drawText("一口价", cntX,cntY,10);
	               //升序按钮
	               if(((662 < touchMoveX) && (touchMoveX < 721)) && ((235 < touchMoveY) && (touchMoveY < 255)))
	               {
	               	    gbox.drawImage('pmh_zjm_45',662,235);
	               }
	               if(((724 < touchMoveX) && (touchMoveX < 813)) && ((235 < touchMoveY) && (touchMoveY < 255)))
	               {
	               	    gbox.drawImage('pmh_zjm_47',721,235);
	               }
	               
	               if(((926 < touchMoveX) && (touchMoveX < 1100)) && ((235 < touchMoveY) && (touchMoveY < 255)))
	               {
	               	    gbox.drawImage('pmh_zjm_49',926,235);
	               }
	               //元宝数	               
	                gbox.drawText(userOwnGoldNum,370,590,10);
				    gbox.drawImage("pmh_zjm_53",gbox.getBufferContext().measureText(userOwnGoldNum).width + 385,593);
					for(var i = 0 ; i<queryIconArray.length;i++)
					{
						var rW = 35;
						var rH = 35;					
						gbox.strokeRect(gbox.getBufferContext(),{x:524,y:259 + (i*37) + 1,w:rW - 3,h:rH -3,
						globalAlpha:.4,color:browseNameColor[i]});	
						if(gbox.getImage(queryIconArray[i])!= "undefined")
						{
							 gbox.drawImage(queryIconArray[i],526,260 + i*37);
						}
						var fontW = gbox.getTextWidth(equipmentNameArray[i],14);
					   	var dx = 558 + (105 - fontW)/2;
						var dy = 257 + (37 - 14)/2;
						gbox.drawText(equipmentNameArray[i],dx,dy + i*37,5,jstopTipDataArray[i].toolTipInfo.quality);
						var fontW = gbox.getTextWidth(goodsLevelArray[i],14);
					   	var dx = 661 + (60 - fontW)/2;
						var dy = 257 + (37 - 14)/2;
                        gbox.drawText(goodsLevelArray[i],dx,dy + i*37,2);
                        var fontW = gbox.getTextWidth(surplusTimeArray[i]+ "小时",14);
					   	var dx = 722 + (93 - fontW)/2;
						var dy = 257 + (37 - 14)/2;
						gbox.drawText(surplusTimeArray[i]+ "小时",dx,dy + i*37,2);
						var fontW = gbox.getTextWidth(sellPeopleArray[i],14);
					   	var dx = 814 + (115 - fontW)/2;
						var dy = 257 + (37 - 14)/2;
                        gbox.drawText(sellPeopleArray[i],dx,dy + i*37,2);						
						if(buyerNameArray[i]!= null)
						{
							gbox.drawText(buyerNameArray[i],920,269 + i*37,2);							
						}
						gbox.drawText(basePriceGoldArray[i],1033,259 + i*37,2);						
						gbox.drawImage("pmh_zjm_53",gbox.getBufferContext().measureText(basePriceGoldArray[i]).width + 1038,265+i*37);
						gbox.drawText(fixedPriceGoldArray[i],1033,279 + i*37,2);	
						gbox.drawImage("pmh_zjm_53",gbox.getBufferContext().measureText(basePriceGoldArray[i]).width + 1038,282+i*37);					
						var rW = 575;
						var rH = 36;
						var rX = 525;
						var rY = (257 + i*37);
						liuRectPoly[i] = [[rX,rY], [rX + rW, rY], [rX + rW,rY + rH],[rX,rY + rH]];
						if(liuSelected[i]){
							var rect = new Rect(rX, rY,rW - 2,rH -2);
						    gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#00FFFF","#00FFFF",false);								
						}
						
						if(gbox._mouseArea(liuRectPoly[i],touchMoveX,touchMoveY)){
							var rect = new Rect(rX, rY,rW - 2,rH -2);
						    gbox._roundRectanglePath(gbox.getBufferContext(),rect, 0,"#FFFF00","#FFFF00",false);		
						}
						gbox.drawImage("pmh_zjm_51",937,274 + i*37);
					}
					//绘制翻页数字及按钮
					gbox.drawText(currentPage + "/" + totalPage,767,559,10);
					gbox.drawImage("ty_an_24",809,556);
					gbox.drawImage("ty_an_25",738,556);
					for(var i =0 ;i < 8; i++)
					{
						if(((525 < touchMoveX) && (touchMoveX < 556)) && ((257 + i*37 < touchMoveY) && (touchMoveY < 291 + i*37)))
					     {
					     	if(typeof(jstopTipDataArray[i]) != "undefined")
					     	{		
					     		var tempOffset = 15;
					     		switch(jstopTipDataArray[i].toolTipInfo.type)
					     		{
					     			 case 1:
					     			  var mouseY = 0;
								    		var tempH = tooltip.computEquipment(gbox.getBufferContext(),jstopTipDataArray[i].toolTipInfo).height;
								    		if((gbox.getScreenH() - touchMoveY) < tempH)	
								    		{
								    			mouseY = gbox.getScreenH() - tempH;
								    		}
								    		else
										    {
										    	mouseY = touchMoveY;
										    }
										    if(touchMoveX !=0)
				               	  	             tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,mouseY + tempOffset,jstopTipDataArray[i].toolTipInfo);
				               	  	   break;
				               	  	 case 2:
					               	  	 if(touchMoveX !=0)
					               	  	   tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,jstopTipDataArray[i].toolTipInfo);
				               	  	   break;
				               	  	 case 3:
					               	  	 if(touchMoveX !=0)
					               	  	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,jstopTipDataArray[i].toolTipInfo);
				               	  	   break; 
				               	  	 case 4:
					               	  	 if(touchMoveX !=0)
					               	  	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,jstopTipDataArray[i].toolTipInfo);
				               	  	   break; 
					     		}
					     	}
					     
					     }
					}
				}
			}
			if(isDrawUI[index]&& jishiItemCtr)
				   //if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
				    if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < (exitButtonCoordinate.x + gbox.getImage('ty_an_17').width))) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < (exitButtonCoordinate.y + gbox.getImage('ty_an_17').height))))
			        {
			        	gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);					
				   }
				   else
				   {
					    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
				   }
				

		}
	 });
}
var jishiList = function(index)
{
	gbox.setRenderOrder(['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'test_List',
		group : 'levelMenu_3',
		tileset : 'pmh_zjm_02',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [383,244], [501,244], [501,558],[383,558]],
		initialize : function()
		{  
		  if(browseDisplay)
		  {
		  	    var _item = new Array();
	            var content = new Array(_item);
	            var listLen = content[0].length;
	            if(listLen < 15)
		           listLen = 15;
				testOffsetY = test_OffsetY = 0;
				testList.mouseUpIndex = -1;
				testList.init( 'pmh_zjm_31', 'pmh_zjm_29','pmh_zjm_29', 'pmh_zjm_30',null, content, 367, 232, 1, listLen, 21, 15, true, -20, 0 );		
				browseBuildIndex = 0;		
				//console.log("browseBuildIndex == " + browseBuildIndex);	
		  } 	  

		},
		first : function() 
		{	
			if(browseDisplay)
			{
				
			}
		},
		myclick : function()
		{
			if(browseDisplay)
			{
				if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input"))
				{
					 document.body.removeChild(propAuctionNumbg);  
					 propAuctionNumbg = null;  						 
				}
					   
				browseBuild(index);
			    changeMap('jishiScreen_Layer');	
			}
			

		},
		blit : function()
		{
			if(browseDisplay)
			{
				if(isDrawUI[index] && jishiItemCtr)
					{
		                testList.paint( test_OffsetY, test_BeginSlip,test_Time );
					}
			}


		}
	 });
}


var popupBuild = function(index,_group,_layer)
{
	popupIndex = index;
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isPopupBuild = true;
	var bW = gbox.getImage('pmh_zjm_39').width;
	var bH = gbox.getImage('pmh_zjm_39').height;
	var backdropX = 30;
	var backdropY = 230;

	var sW = 23;
	var sH = 81;

	gbox.addObject(
	{ 
		id : 'popupPage',
		group : 'levelMenu_4',
		tileset : 'pmh_zjm_02',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
		initialize : function()
		{	
		},
		
		first : function() 
		{	
		},
		myclick : function()
		{
			if(auctionDisplay)
			{		    
				    isShowAuctionPorp = false;
					if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
					    document.body.removeChild(propAuctionNumbg);  
					    propAuctionNumbg = null; 						     
					}				
				if((((backdropX+4) < lastTouchMoveX) && (lastTouchMoveX < (backdropX+27))) && ((242 < lastTouchMoveY) && (lastTouchMoveY < (242 + sH))))
			        {
			        	pmhIndex = 0;
						popupButtonCtr[0] = true;
						for(var a = 0 ; a<3; a++)
						{
							if(a != 0)
							{
								popupButtonCtr[a] = false;
							}
						}
						AuctionFunction.getEquipmentForAuction(doEquipmentForAuction);
//						popupBuild(index,_group,_layer);
//				        changeMap(_layer);
					}else
			        if((((backdropX+4) < lastTouchMoveX) && (lastTouchMoveX < (backdropX+27)))  && ((313 < lastTouchMoveY) && (lastTouchMoveY < (313 + sH))))
			        {
			        	pmhIndex = 0;
						popupButtonCtr[1] = true;
						for(var a = 0 ; a<3; a++)
						{
							if(a != 1)
							{
								popupButtonCtr[a] = false;
							}
						}
						AuctionFunction.getMaterialForAuction(doMaterialForAuction);
//						popupBuild(index,_group,_layer);
//				        changeMap(_layer);
					}else
			        if((((backdropX+4) < lastTouchMoveX) && (lastTouchMoveX < (backdropX+27))) && ((386 < lastTouchMoveY) && (lastTouchMoveY < (386 + sH))))
			        {
			        	pmhIndex = 0;
						popupButtonCtr[2] = true;
						for(var a = 0 ; a<3; a++)
						{
							if(a != 2)
							{
								popupButtonCtr[a] = false;
							}
						}
						AuctionFunction.getItemForAuction(doBookForAuction);
//						popupBuild(index,_group,_layer);
//				        changeMap(_layer);
					 }
			        popupBuild(index,_group,_layer);
				    changeMap(_layer);
			}

			 
		},
		blit : function()
		{
			if(auctionDisplay)
			{
				if(isDrawUI[index] && isPopupBuild)
					{
					   gbox.drawImage('pmh_zjm_39',backdropX,backdropY);
					
		               //绘制功能选择键
		               if(popupButtonCtr[0])
		               {
		               	   gbox.drawImage('pmh_zjm_19',31,248);
		               }
		               
		               if(popupButtonCtr[1])
		               {
		               	   gbox.drawImage('pmh_zjm_20',31,318);
		               }
		              
		               if(popupButtonCtr[2])
		               {
		               	   gbox.drawImage('pmh_zjm_21',31,388);
		               }
		             
					}
			}

		}
	 });
}

//1装备getEquipmentForAuction
function doEquipmentForAuction(data){
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}	
gkListColor = new Array();
gkData = new Array();
gk_itemInfo = new Array(new Array);
for(var i=0; i<data.length; i++){
	var temp = data[i];
	var itemTmp = undefined;
	var itemName = undefined;
	switch(temp.itemType){
	case 1://1.装备
		itemTmp = data[i].equipment;
		itemName = data[i].equipment.equipmentName;
	    break;
	case 2://2.道具
		itemTmp = data[i].item;
		itemName = data[i].item.itemName;
		break;
	case 3://3.材料
		itemTmp = data[i].material;
		itemName = data[i].material.materialName;
		break;
	case 4://4.任务
		itemTmp = data[i].quests;
		itemName = data[i].quests.itemName;
		break;
	}
	gkData[i] = {
		                amount : 1,//总数
						id : temp.id,//装备ID
						type: temp.type,
						item:
						{
							 itemIcon:temp.icon//装备图标
						},
						toolTipInfo : 
						{
							agility : temp.toolTipInfo.agility,//敏捷
							equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp.toolTipInfo.equipmentName,//名字
							equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp.toolTipInfo.heroForce,//武力
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp.toolTipInfo.physique,//体质
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp.toolTipInfo.strategy,//谋略
							strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp.toolTipInfo.weaponType,//兵器方式
						}
					};      	
     if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
			         if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			          gkData[i] = {
			          	    amount : 1,//总数
	        	            id : temp.id,//装备ID
						    type: temp.type,
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								stone1:
								{
									stoneName : temp.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp.toolTipInfo.stone1.stoneNameDesc
								}
							}
					};
							
						
			        }
			       
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	gkData[i] = {
			        		amount : 1,//总数
	        	            id : temp.id,//装备ID
						    type: temp.type,
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								stone1:
								{
									stoneName : temp.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			       
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	gkData[i] = {
			        		amount : 1,//总数
	        	            id : temp.id,//装备ID
						    type: temp.type,
							item:
							{
								 itemIcon:temp.icon//装备图标
							},
							toolTipInfo : 
							{
								agility : temp.toolTipInfo.agility,//敏捷
								equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp.toolTipInfo.equipmentName,//名字
								equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp.toolTipInfo.heroForce,//武力
								isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp.toolTipInfo.physique,//体质
								quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp.toolTipInfo.strategy,//谋略
								strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp.toolTipInfo.weaponType,//兵器方式
								stone1:
								{
									stoneName : temp.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
	        switch(gkData[i].toolTipInfo.quality){
			        case 1:
						gkListColor[i] = '#FFFFFF';
						break;
					case 2:
						gkListColor[i] = '#08cc1a';
						break;
					case 3:
						gkListColor[i] = '#006cff';
						break;
					case 4:
						gkListColor[i] = '#dc00df';
						break;
					case 5:
						gkListColor[i] = '#e09900';
						break;
					case 6:
						gkListColor[i] = '#ff0000';
						break;
		}
	    //gk_itemInfo[i] = borwseguokuTip(gkData[i],gkData[i].item);
	    
    }
            
			var content = new Array(gkData);
            var listLen = content[0].length/4;
            if((content[0].length%4) != 0){
            	listLen = parseInt(content[0].length/4 + 1);
            }
            if(listLen < 4)
               listLen = 4;
            pmh_List.entryStartIndex = 0;
			pmh_List.update(content, gkListColor, listLen);
   
			
}
//2材料getMaterialForAuction 
function doMaterialForAuction(data){
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}	
gkListColor = new Array();
gkData = new Array();
gk_itemInfo = new Array(new Array);
for(var i=0; i<data.length; i++){
	var temp = data[i];
	var itemTmp = undefined;
	var itemName = undefined;
	switch(temp.itemType){
	case 1://1.装备
		itemTmp = data[i].equipment;
		itemName = data[i].equipment.equipmentName;
	    break;
	case 2://2.道具
		itemTmp = data[i].item;
		itemName = data[i].item.itemName;
		break;
	case 3://3.材料
		itemTmp = data[i].material;
		itemName = data[i].material.materialName;
		break;
	case 4://4.任务
		itemTmp = data[i].quests;
		itemName = data[i].quests.itemName;
		break;
	}
	
    
	gkData[i] = {
						amount : temp.amount,//总数
						id : temp.id,//装备ID
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp.type
						}
					};
      if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
	        switch(gkData[i].toolTipInfo.quality){
			        case 1:
						gkListColor[i] = '#FFFFFF';
						break;
					case 2:
						gkListColor[i] = '#08cc1a';
						break;
					case 3:
						gkListColor[i] = '#006cff';
						break;
					case 4:
						gkListColor[i] = '#dc00df';
						break;
					case 5:
						gkListColor[i] = '#e09900';
						break;
					case 6:
						gkListColor[i] = '#ff0000';
						break;
		}
	   // gk_itemInfo[i] = borwseguokuTip(gkData[i],gkData[i].item);
    }

			var content = new Array(gkData);
            var listLen = content[0].length/4;
            if((content[0].length%4) != 0){
            	listLen = parseInt(content[0].length/4 + 1);
            }
            if(listLen < 4)
               listLen = 4;
			pmh_List.entryStartIndex = 0;
			pmh_List.init('ty_an_128', 'hit','hit','hit', gkListColor,content, 45, 240, 6, listLen, 36, 5, true, -15, 0);
}

//4任务物品getBookForAuction 
function doBookForAuction(data){
if(typeof(data.error) != "undefined"){
	alert("系统提示：" + data.error);
	return;
}	
gkListColor = new Array();
gkData = new Array();
gk_itemInfo = new Array(new Array);
for(var i=0; i<data.length; i++){
	var temp = data[i];
	var itemTmp = undefined;
	var itemName = undefined;
	switch(temp.itemType){
	case 1://1.装备
		itemTmp = data[i].equipment;
		itemName = data[i].equipment.equipmentName;
	    break;
	case 2://2.道具
		itemTmp = data[i].item;
		itemName = data[i].item.itemName;
		break;
	case 3://3.材料
		itemTmp = data[i].material;
		itemName = data[i].material.materialName;
		break;
	case 4://4.任务
		itemTmp = data[i].quests;
		itemName = data[i].quests.itemName;
		break;
	}
	gkData[i] = {
						amount : temp.amount,//总数
						batchUseable : temp.batchUseable,//批量使用
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : temp.useable,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//道具图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp.toolTipInfo.itemName,//名字
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	gkData[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	gkData[i].toolTipInfo.isbag = true;
			        }
	    gk_itemInfo[i] = borwseguokuTip(gkData[i],gkData[i].item);
    }
       var content = new Array(gkData);
	    var listLen = content[0].length/10;
	    if((content[0].length%10) != 0){
	    	listLen = parseInt(content[0].length/10 + 1);
	    }
	    if(listLen < 10)
	        listLen = 10;   
	    else if(listLen > guokuLimit)
	    	listLen = guokuLimit;
	    guokuList.update(content, gkListColor, listLen);		
			var content = new Array(gkData);
            var listLen = content[0].length/4;
            if((content[0].length%4) != 0){
            	listLen = parseInt(content[0].length/4 + 1);
            }
            if(listLen < 4)
               listLen = 4;            
			pmh_List.entryStartIndex = 0;
			pmh_List.init('ty_an_128', 'hit','hit','hit', gkListColor,content, 45, 240, 6, listLen, 36, 5, true, -15, 0);
}

function auctionPorp(index,dValue,txt,bntTxt,offsetY)
{
	gbox.setRenderOrder(['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isShowAuctionPorp = true;
	var pW = gbox.getImage('ty_an_55').width;
	var pH = gbox.getImage('ty_an_55').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	gbox.addObject(
	{ 
		id : 'auctionPorp',
		group : 'levelMenu_4',
		tileset : 'ty_an_56',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		//poly : [[575,300], [870,300], [870,468],[575,468]],
		initialize : function()
		{
			if(propAuctionNumbg == null && !gbox._isIndwellDiv("propAuctionNumbg","input"))
			{
				var pnX = (pX+(pW - 40)/2);
				var pnY = (pY+(pH - 20)/2) +  offsetY;
				propAuctionNumbg = addDivWindowBg(pnX,pnY);
				propAuctionNumbg.id = 'propAuctionNumbg';
				document.body.appendChild(propAuctionNumbg);
	            propAuctionNum = document.createElement("input");
	            propAuctionNum.style.id = 'e_3';
	            propAuctionNum.style.backgroundColor = '#000000';
	            propAuctionNum.style.width = '40px';
	            propAuctionNum.style.color = '#ffffff';
	            propAuctionNum.value = dValue;
	            propAuctionNumbg.appendChild(propAuctionNum);            
			}		
			
				if(typeof(gkData[pmhIndex]) != "undefined" && gkData[pmhIndex].itemCounts >= 1){
					if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input"))
					    propAuctionNum.value = gkData[pmhIndex].amount;     
				} 	 				
		},
		first : function() 
		{	
			/*
			* 控制浏览器大小变化时DIV输入框自动适配屏幕
			*/
				adaptiveDiv(propAuctionNumbg,"propAuctionNumbg",(pX+(pW - 40)/2));
			/*======================================================*/		
			if(isShowAuctionPorp)
		    {
		    	if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input"))
                     propAuctionNum.value = propAuctionNum.value.replace(/\D/g,'');
		    }			
		},
		myclick : function()
		{ 
			 if(((617 < lastTouchMoveX) && (lastTouchMoveX < 668)) && ((391 < lastTouchMoveY) && (lastTouchMoveY < 422)))
              {			
					if(propAuctionNum.value > gkData[pmhIndex].amount){
						alert("系统提示：使用超过最大数量！");
		                auctionPorp(index,propAuctionNum.value,txt,bntTxt,offsetY);		
		                changeMap('jishiScreen_Layer');							
						return;
					}else if(propAuctionNum.value <= 0){
						alert("系统提示：使用数量不能为空或零！");
		                auctionPorp(index,propAuctionNum.value,txt,bntTxt,offsetY);		
		                changeMap('jishiScreen_Layer');							
						return;
					} 	
					exit(getClickObjectIndex());			    
					if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
				            document.body.removeChild(propAuctionNumbg);  
				            propAuctionNumbg = null;  				            
					}
				    isShowAuctionPorp = false;
					popupBuild(index,'jishiScreen','jishiScreen_Layer');
					changeMap('jishiScreen_Layer');	
			}else if(((768 < lastTouchMoveX) && (lastTouchMoveX < 821)) && ((391 < lastTouchMoveY) && (lastTouchMoveY < 422))){
				    exit(getClickObjectIndex());
					if(propAuctionNumbg != null && typeof(propAuctionNumbg) != "undefined" &&
					   gbox._isIndwellDiv("propAuctionNumbg","input")){
				            document.body.removeChild(propAuctionNumbg);  
				            propAuctionNumbg = null;				            
					} 
				    isShowAuctionPorp = false;
					popupBuild(index,'jishiScreen','jishiScreen_Layer');
					changeMap('jishiScreen_Layer');	
			}
			else{
                auctionPorp(index,propAuctionNum.value,txt,bntTxt,offsetY);		
                changeMap('jishiScreen_Layer');		
			}	
		},
		blit : function()
		{
			if(isDrawUI[index] && isShowAuctionPorp)
			{
				
				var scale = bntTxt.length;
				var dialogX = pX;
				var dialogY = pY;
				var dialogW = gbox.getImage('ty_an_55').width;
				var dialogH = gbox.getImage('ty_an_55').height;
				
				gbox.drawImage('ty_an_55',dialogX, dialogY);

				var txtArray = gbox.getStringsArray(txt,200,16);
				var txtW = gbox.stringArrayWidth(txtArray,16);
				var tX = dialogX + (dialogW - txtW)/2;
				var tY = dialogY + (dialogH - txtArray.length * 20)/2;
				for(var a=0; a<txtArray.length; a++){	
				   gbox.drawString(txtArray[a],tX - 20, tY + (20*a) - offsetY,"#FFFFFF",16);
				}
				
				
				var scaleW = (dialogW/scale);
				var imgW = gbox.getImage('ty_an_07').width;
				var imgH = gbox.getImage('ty_an_07').height;
				btnPoly = new Array(new Array()); 
				gbox.drawImage('ty_an_06',618,395);
				if(((617 < touchMoveX) && (touchMoveX < 668)) && ((391 < touchMoveY) && (touchMoveY < 422)))
				{
					gbox.drawImage('ty_an_07',618,395);	
				}
				gbox.drawString("确定",629,401,"#ffffff",14);//#FFC961
				gbox.drawImage('ty_an_06',769,395);
				if(((768 < touchMoveX) && (touchMoveX < 821)) && ((391 < touchMoveY) && (touchMoveY < 422)))
				{
					gbox.drawImage('ty_an_07',769,395);	
				}
				gbox.drawString("取消",780,401,"#ffffff",14);//#FFC961
				for(var i=0; i<bntTxt.length; i++){
					var imgX = dialogX + (scaleW - imgW)/2 + (scaleW * i);
					var imgY = dialogY + dialogH - imgH - offsetY;
					//gbox.drawImage('ty_an_07',imgX,imgY);
					btnPoly[i] = [ [imgX,imgY], [imgX + imgW, imgY], [imgX + imgW,imgY + imgH],[imgX,imgY + imgH]];
					if(gbox._mouseArea(btnPoly[i],touchMoveX,touchMoveY)){
					   //gbox.drawImage('ty_an_07',imgX,imgY);						
					}
					
//					var txtW = gbox.getTextWidth(bntTxt[i],16);
//					var txtX = imgX + (imgW - txtW)/2;
//					var txtY = imgY + (imgH - 16)/2;
//					gbox.drawString(bntTxt[i],txtX,txtY,"#ffffff",16);//#FFC961
				}				    		   
			}
		}
	 });
}
function pricePorp(index,dValue,txt,bntTxt,offsetX,offsetY)
{
	gbox.setRenderOrder(['jishiScreen','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isShowAuctionPorp = true;
	var pW = gbox.getImage('ty_an_55').width;
	var pH = gbox.getImage('ty_an_55').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	gbox.addObject(
	{ 
		id : 'pricePorp',
		group : 'levelMenu_4',
		tileset : 'ty_an_55',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		initialize : function()
		{
			if(propAuctionNumbg == null && !gbox._isIndwellDiv("propAuctionNumbg","input"))
			{
				var pnX = (pX+(pW - 40)/2) + offsetX - 10 ;
				var pnY = (pY+(pH - 20)/2) +  offsetY;
				var divoffsetX = (window.screen.width - 1440)/2;
				propAuctionNumbg = addDivWindowBg(pnX,pnY);
				propAuctionNumbg.id = 'propAuctionNumbg';
				document.body.appendChild(propAuctionNumbg);
	            propAuctionNum = document.createElement("input");
	            propAuctionNum.style.id = 'propAuction';
	            propAuctionNum.style.backgroundColor = '#000000';
	            propAuctionNum.style.width = '40px';
	            propAuctionNum.style.color = '#ffffff';
	            propAuctionNum.value = dValue;
	            propAuctionNumbg.appendChild(propAuctionNum);
			}		
		},
		first : function() 
		{	if(isShowAuctionPorp)
		    {
               propAuctionNum.value = propAuctionNum.value.replace(/\D/g,'');              
		    }			
		},
		myclick : function()
		{ 
			if(((617 < lastTouchMoveX) && (lastTouchMoveX < 668)) && ((391 < lastTouchMoveY) && (lastTouchMoveY < 422))){

                    var id;
					id = auctionIdArray[liuauctionIndex];
					var bid = Number(propAuctionNum.value);
					AuctionFunction.buyItemByAuction(id,bid,currentPage,doBuyItemByAuction);
					exit(getClickObjectIndex());			    
					if(propAuctionNumbg != null && gbox._isIndwellDiv("propAuctionNumbg","input")){
				            document.body.removeChild(propAuctionNumbg);  
				            propAuctionNumbg = null;  				            
					}
				    isShowAuctionPorp = false;
				 

			}else if(((768 < lastTouchMoveX) && (lastTouchMoveX < 821)) && ((391 < lastTouchMoveY) && (lastTouchMoveY < 422))){

				    exit(getClickObjectIndex());
					if(propAuctionNumbg != null && typeof(propAuctionNumbg) != "undefined" &&
					   gbox._isIndwellDiv("propAuctionNumbg","input")){
				            document.body.removeChild(propAuctionNumbg);  
				            propAuctionNumbg = null;
					} 
				    isShowAuctionPorp = false;
	
			}
			else
			{
			
                pricePorp(index,propAuctionNum.value,txt,bntTxt,offsetY,offsetY);		
                changeMap('jishiScreen_Layer');		
			}	
		},
		blit : function()
		{
			if(isDrawUI[index] && isShowAuctionPorp)
			{
				
				var scale = bntTxt.length;
				var dialogX = pX;
				var dialogY = pY;
				var dialogW = gbox.getImage('ty_an_55').width;
				var dialogH = gbox.getImage('ty_an_55').height;
				
				gbox.drawImage('ty_an_55',dialogX, dialogY);
				var txtArray = gbox.getStringsArray(txt,200,16);
				var txtW = gbox.stringArrayWidth(txtArray,16);
				var tX = dialogX + (dialogW - txtW)/2;
				var tY = dialogY + (dialogH - txtArray.length * 20)/2;
				for(var a=0; a<txtArray.length; a++){	
				   gbox.drawText(txtArray[a],tX - 20, tY + (20*a) - offsetY,10);
				}
				gbox.drawImage('pmh_zjm_53',740,390);
                gbox.drawImage('ty_an_08',618,395);	
				if(((617 < touchMoveX) && (touchMoveX < 668)) && ((391 < touchMoveY) && (touchMoveY < 422)))
				{
					gbox.drawImage('ty_an_06',618,395);	
				}
				gbox.drawText("确定",629,401,10);				
				gbox.drawImage('ty_an_08',769,395);	
				if(((768 < touchMoveX) && (touchMoveX < 821)) && ((391 < touchMoveY) && (touchMoveY < 422)))
				{
					gbox.drawImage('ty_an_06',769,395);	
				}
				gbox.drawText("取消",780,401,10);				    		   
			}
		}
	 });
}

//1.打开拍卖界面调用接口：getMyAuctionItemInfo 
var cashUserHave = 0;//为用户拥有的元宝数
var moneyUserHave = 0;//为用户拥有的铜币数
//var userMoneyRefresh = 0;/为用户铜币刷新；
var pages;//为用户在拍卖行拍卖的道具的页数，如果没有拍卖物品，则为0页
var auctionItemRefresh = 0;//为拍卖的道具数量刷新，若为0，删除道具
var savingTimeInfo = new Array();//保管时间种类数组
var userAuctionItem = new Array();//为用户在拍卖中拍卖自己道具的信息
function doMyAuctionItemInfo(data){
	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	paiNameColor.splice(0,paiNameColor.length);
	deleteArray();
	currentPage = data.page;
	totalPage = data.pages;
	for(var i=0; i<data.savingTimeInfo.length; i++){
			var temp = data.savingTimeInfo[i];
			savingTimeInfo[i] = {needMoney:temp.needMoney,
				                 value:temp.value
			};
		}
	if(data.userAuctionItem !=null)
	 for(var i = 0; i<data.userAuctionItem.length; i++)
	 {		
		basePriceGoldArray[i]= data.userAuctionItem[i].auctionInfo.basePrice;		
        fixedPriceGoldArray[i] = data.userAuctionItem[i].auctionInfo.fixedPrice
		auctionIdArray[i] = data.userAuctionItem[i].auctionInfo.id;
		var temp1 = data.userAuctionItem[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.userAuctionItem[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.userAuctionItem[i].auctionInfo.remainTime;
		if(data.userAuctionItem[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.userAuctionItem[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.userAuctionItem[i].auctionInfo.bidName;
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			         if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
			          jstopTipDataArray[i] = {
	        	            
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								}
							}
					};
							
						
			        }
			       
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			       
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		} 
		  if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	paiNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }  	    	
		}
	gkListColor = new Array();
	gkData = new Array();
	gk_itemInfo = new Array(new Array);		
	if(typeof(queryIconArray) != "undefined"){
		auctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(auctionIndex == i){
				aSelected[i] = true;
			}else
				aSelected[i] = false;
		}		
		
	}
}
function deleteArray()
{
	
	queryIconArray.splice(0,queryIconArray.length);
    goodsLevelArray.splice(0,goodsLevelArray.length);
    equipmentNameArray.splice(0,equipmentNameArray.length);
    surplusTimeArray.splice(0,surplusTimeArray.length); 
    sellPeopleArray.splice(0,sellPeopleArray.length);
    buyerNameArray.splice(0,buyerNameArray.length);
    basePriceGoldArray.splice(0,basePriceGoldArray.length);
    basePriceSilverArray.splice(0,basePriceSilverArray.length);
    fixedPriceGoldArray.splice(0,fixedPriceGoldArray.length);
    fixedPriceSilverArray.splice(0,fixedPriceSilverArray.length);
    jstopTipDataArray.splice(0,jstopTipDataArray.length);
    auctionIdArray.splice(0,auctionIdArray.length);
    saleCount.splice(0,saleCount.length);
    currentPage = 0;
    totalPage = 0;
}

//sellItemByAuction(userItemId, basePrice, fixedPrice, savingTime,  counts,callBack)
function doSellItemByAuction(data){//开始拍卖接口
	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	paiNameColor.splice(0,paiNameColor.length);
	deleteArray();
	currentPage = data.page;
	totalPage = data.pages;
	if(data.userAuctionItem !=null)
	for(var i = 0; i<data.userAuctionItem.length; i++)
	{
		
			basePriceGoldArray[i]= data.userAuctionItem[i].auctionInfo.basePrice;
           fixedPriceGoldArray[i] = data.userAuctionItem[i].auctionInfo.fixedPrice;
		
		auctionIdArray[i] = data.userAuctionItem[i].auctionInfo.id;
		var temp1 = data.userAuctionItem[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.userAuctionItem[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.userAuctionItem[i].auctionInfo.remainTime;
		if(data.userAuctionItem[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.userAuctionItem[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.userAuctionItem[i].auctionInfo.bidName;
		//jstopTipDataArray.splice(0,jstopTipDataArray.length);
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			         if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}    
		  if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	paiNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }  	 	
		}
	

	gkListColor = new Array();
	gkData = new Array();
	gk_itemInfo = new Array(new Array);		
	if(typeof(queryIconArray) != "undefined"){
		auctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(auctionIndex == i){
				aSelected[i] = true;
			}else
				aSelected[i] = false;
		}		
		
	}
}

//getMyAuctionItemByPage
function doMyAuctionItemByPage(data){//拍卖界面跳转翻页接口
	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	paiNameColor.splice(0,paiNameColor.length);
	deleteArray();
	currentPage = data.page;
	totalPage = data.pages;
	if(data.userAuctionItem !=null)
	 for(var i = 0; i<data.userAuctionItem.length; i++)
	 {		
		basePriceGoldArray[i]= data.userAuctionItem[i].auctionInfo.basePrice;		
        fixedPriceGoldArray[i] = data.userAuctionItem[i].auctionInfo.fixedPrice
		auctionIdArray[i] = data.userAuctionItem[i].auctionInfo.id;
		var temp1 = data.userAuctionItem[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.userAuctionItem[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.userAuctionItem[i].auctionInfo.remainTime;
		if(data.userAuctionItem[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.userAuctionItem[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.userAuctionItem[i].auctionInfo.bidName;
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			         if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
			          jstopTipDataArray[i] = {
	        	            
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								}
							}
					};
							
						
			        }
			       
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			       
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		} 
		  if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	paiNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }  	    	
		}
	gkListColor = new Array();
	gkData = new Array();
	gk_itemInfo = new Array(new Array);		
	if(typeof(queryIconArray) != "undefined"){
		auctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(auctionIndex == i){
				aSelected[i] = true;
			}else
				aSelected[i] = false;
		}		
		
	}
}
//cancelAuctionOperate( auctionId,  page, callBack)
function doCancelAuctionOperate(data){
		if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	paiNameColor.splice(0,paiNameColor.length);
	deleteArray();
	currentPage = data.page;
	totalPage = data.pages;
	if(data.userAuctionItem !=null)
	for(var i = 0; i<data.userAuctionItem.length; i++)
	{
		basePriceGoldArray[i]= data.userAuctionItem[i].auctionInfo.basePrice;			
       fixedPriceGoldArray[i] = data.userAuctionItem[i].auctionInfo.fixedPrice;		  
		auctionIdArray[i] = data.userAuctionItem[i].auctionInfo.id;
		var temp1 = data.userAuctionItem[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.userAuctionItem[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.userAuctionItem[i].auctionInfo.remainTime;
		if(data.userAuctionItem[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.userAuctionItem[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.userAuctionItem[i].auctionInfo.bidName;
		jstopTipDataArray.splice(0,jstopTipDataArray.length);
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			         {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		} 
		if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			      paiNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }  	    		   	
		}	
		
	if(typeof(queryIconArray) != "undefined"){
		auctionIndex = 0;
		for(var i = 0 ; i<queryIconArray.length;i++)
		{
			if(auctionIndex == i){
				aSelected[i] = true;
			}else
				aSelected[i] = false;
		}		
		
	}
}


//getMyBidItem
function doMyBidItem(data){//竞价开始界面

	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	if(typeof(data.warn) != "undefined")
    {
			alert("系统提示：" + data.warn);
	}
	userOwnGoldNum = data.cashUserHave;
	jingNameColor.splice(0,jingNameColor.length);
	jstopTipDataArray.splice(0,jstopTipDataArray.length);
	deleteArray();
	currentPage = data.page;
	totalPage = data.pages;
	if(totalPage !=0)
	for(var i = 0; i<data.myBidItem.length; i++)
	{
		basePriceGoldArray[i]= data.myBidItem[i].auctionInfo.basePrice;
        fixedPriceGoldArray[i] = data.myBidItem[i].auctionInfo.fixedPrice
		auctionIdArray[i] = data.myBidItem[i].auctionInfo.id;
		var temp1 = data.myBidItem[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.myBidItem[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.myBidItem[i].auctionInfo.remainTime;
		if(data.myBidItem[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.myBidItem[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.myBidItem[i].auctionInfo.bidName;
		
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								tyep:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}    
		   if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	jingNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 	
			 }  	
		}	
	if(typeof(queryIconArray) != "undefined"){
		auctionIndex = 0;
		for(var i = 0; i<queryIconArray.length; i++)
		{
			if(auctionIndex == i){
				aSelected[i] = true;
			}else
				aSelected[i] = false;
		}
	}
}
//getMyBidItemByPage( page,callBack)
function doMyBidItemByPage(data){//竞拍跳转

	if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	if(typeof(data.warn) != "undefined")
    {
			alert("系统提示：" + data.warn);
	}
	//userOwnGoldNum = data.cashUserHave;
	jingNameColor.splice(0,jingNameColor.length);
	jstopTipDataArray.splice(0,jstopTipDataArray.length);
	deleteArray();
	currentPage = data.page;
	totalPage = data.pages;
	if(totalPage !=0)
	for(var i = 0; i<data.myBidItem.length; i++)
	{
		basePriceGoldArray[i]= data.myBidItem[i].auctionInfo.basePrice;
        fixedPriceGoldArray[i] = data.myBidItem[i].auctionInfo.fixedPrice
		auctionIdArray[i] = data.myBidItem[i].auctionInfo.id;
		var temp1 = data.myBidItem[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.myBidItem[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.myBidItem[i].auctionInfo.remainTime;
		if(data.myBidItem[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.myBidItem[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.myBidItem[i].auctionInfo.bidName;
		
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							type:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								tyep:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}    
		   if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	jingNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }  	
		}
	if(typeof(queryIconArray) != "undefined"){
		auctionIndex = 0;
		for(var i = 0; i<queryIconArray.length; i++)
		{
			if(auctionIndex == i){
				aSelected[i] = true;
			}else
				aSelected[i] = false;
		}
	}
}

//buyItemByFixedPriceInBidPage( auctionId,  page, callBack)
function doBuyItemByFixedPriceInBidPage(data){//竞拍一口价
		if(typeof(data.error) != "undefined")
    {
			alert("系统提示：" + data.error);
			return;
	}
	if(typeof(data.warn) != "undefined")
    {
			alert("系统提示：" + data.warn);
	}

	userOwnGoldNum = data.cashUserHave
	
	deleteArray();
	currentPage = data.page;
	totalPage = data.pages;
	if(totalPage !=0)
	for(var i = 0; i<data.myBidItem.length; i++)
	{
		
			basePriceGoldArray[i]= data.myBidItem[i].auctionInfo.basePrice
           fixedPriceGoldArray[i] = data.myBidItem[i].auctionInfo.fixedPrice;
		
		auctionIdArray[i] = data.myBidItem[i].auctionInfo.id;
		var temp1 = data.myBidItem[i].itemInfo;
		var itemTmp = undefined;
		var itemName = undefined;
		switch(temp1.type){
		case 1://1.装备
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.equipmentName;
		    break;
		case 2://2.道具
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		case 3://3.材料
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.materialName;
			break;
		case 4://4.任务
			itemTmp = temp1.toolTipInfo;
			itemName = itemTmp.itemName;
			break;
		}
	
        queryIconArray[i] = temp1.icon;
		equipmentNameArray[i]= itemName;
		goodsLevelArray[i]= data.myBidItem[i].auctionInfo.needLevel;
		surplusTimeArray[i]= data.myBidItem[i].auctionInfo.remainTime;
		if(data.myBidItem[i].auctionInfo.remainTime == 0){
			surplusTimeArray[i] = "即将到期";
		}		
		sellPeopleArray[i] = data.myBidItem[i].auctionInfo.sellerName;
		buyerNameArray[i] = data.myBidItem[i].auctionInfo.bidName;
		//jstopTipDataArray.splice(0,jstopTipDataArray.length);
		switch(temp1.type)
		{
			case 1://装备
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							agility : temp1.toolTipInfo.agility,//敏捷
							equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp1.toolTipInfo.equipmentName,//名字
							equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp1.toolTipInfo.heroForce,//武力
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp1.toolTipInfo.physique,//体质
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp1.toolTipInfo.strategy,//谋略
							strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp1.toolTipInfo.weaponType,//兵器方式	
							tyep:temp1.type						
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp1.toolTipInfo.stone1) != "undefined")
			        {
				          jstopTipDataArray[i] = 
				          {
								toolTipInfo : 
								{
									agility : temp1.toolTipInfo.agility,//敏捷
									equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
									equipmentName : temp1.toolTipInfo.equipmentName,//名字
									equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
									heroForce : temp1.toolTipInfo.heroForce,//武力
									isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
									needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
									physique : temp1.toolTipInfo.physique,//体质
									quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
									strategy : temp1.toolTipInfo.strategy,//谋略
									strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
									strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
									strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
									strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
									strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
									weaponType : temp1.toolTipInfo.weaponType,//兵器方式
									type:temp1.type	,
									stone1:
									{
										stoneName : temp1.toolTipInfo.stone1.stoneName,
										stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
									}
								}
						  };							
			        }
			        if(typeof(temp1.toolTipInfo.stone2) != "undefined")
			        {
			        	jstopTipDataArray[i] = {	        	         
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								type:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								}
							}
					    };
			        }
			        if(typeof(temp1.toolTipInfo.stone3) != "undefined")
			        {
			        	jstopTipDataArray[i] = {
							toolTipInfo : 
							{
								agility : temp1.toolTipInfo.agility,//敏捷
								equipmentDesc : temp1.toolTipInfo.equipmentDesc,//描述
								equipmentName : temp1.toolTipInfo.equipmentName,//名字
								equipmentType : temp1.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
								heroForce : temp1.toolTipInfo.heroForce,//武力
								isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
								needLevel : temp1.toolTipInfo.needLevel,//装备该物品的最低武将等级
								physique : temp1.toolTipInfo.physique,//体质
								quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
								strategy : temp1.toolTipInfo.strategy,//谋略
								strengthenAgility : temp1.toolTipInfo.strengthenAgility,//身法强化附加值
								strengthenForce : temp1.toolTipInfo.strengthenForce,//武力强化附加值					
								strengthenPhysique : temp1.toolTipInfo.strengthenPhysique,//体质强化附加值
								strengthenStrategy : temp1.toolTipInfo.strengthenStrategy,//谋虑强化附加值
								strengthenLevel : temp1.toolTipInfo.strengthenLevel,//强化等级
								weaponType : temp1.toolTipInfo.weaponType,//兵器方式
								tyep:temp1.type	,
								stone1:
								{
									stoneName : temp1.toolTipInfo.stone1.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone1.stoneNameDesc
								},
								stone2:
								{
									stoneName : temp1.toolTipInfo.stone2.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone2.stoneNameDesc
								},
								stone3:
								{
									stoneName : temp1.toolTipInfo.stone3.stoneName,
									stoneNameDesc : temp1.toolTipInfo.stone3.stoneNameDesc
								}
							}
					    };
			        }
			        //console.log("===" + gkData[i][0]);
				    break;
				case 2://道具
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp1.toolTipInfo.itemName,//名字
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					jstopTipDataArray[i] = {
						toolTipInfo : 
						{
							description : temp1.toolTipInfo.description,//描述
							isBound : temp1.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp1.toolTipInfo.materialName,//名字
							materialType : temp1.toolTipInfo.materialType,//材料方式
							quality : temp1.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							type:temp1.type
						}
					};
					if(typeof(temp1.toolTipInfo.isBop) != "undefined")
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	jstopTipDataArray[i].toolTipInfo.isbag = true;
			        }
					break;
		}    
		   if(typeof(jstopTipDataArray[i].toolTipInfo.quality) != "undefined")
			 {
			 	jingNameColor[i] = qualityColor[jstopTipDataArray[i].toolTipInfo.quality - 1];
			 }  	
		}
	if(typeof(queryIconArray) != "undefined"){
		auctionIndex = 0;
		for(var i = 0; i<queryIconArray.length; i++)
		{
			if(auctionIndex == i){
				aSelected[i] = true;
			}else
				aSelected[i] = false;
		}
	}
}

//拍卖行列表
var pmhNum = 0;
var pmhList = function(index,_poly,dx,dy,row,column, rectSpace, displayRow,offsetX,_group,_layer,group)
{
	
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isPmhList = true;
	var currentGroup = group;
	gbox.addObject(
	{ 
        id : 'pmhList',
		group : ''+ currentGroup,
		tileset : 'ty_an_128',
		x : 0,
		y : 0,
		frame : 0,
		poly : _poly,
		initialize : function()
		{
			var content = new Array(gkData);
            var listLen = content[0].length/4;
            if((content[0].length%4) != 0){
            	listLen = parseInt(content[0].length/4 + 1);
            }
            if(listLen < 4)
                listLen = 4;   
//            else if(listLen > guokuLimit)
//            	listLen = guokuLimit;
            pmh_List.entryStartIndex = 0;
			pmh_List.init('ty_an_128', 'hit','hit','hit', gkListColor,content, 45, 240, 6, listLen, 36, 5, true, -15, 0);

			
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			popupBuild(getClickObjectIndex(),_group,_layer);
		},
		blit : function()
		{
			if(isDrawUI[index] && isPmhList)
			{				
				pmh_List.paint( pmh_OffsetY, pmh_BeginSlip, pmh_Time );
				var pmhListindex = pmh_List.getPageRectIndex(lastTouchMoveX,lastTouchMoveY);
				if(typeof(gkData[pmhListindex]) != "undefined" && pmhListindex != -1)
				{
					
					 var tempOffset = 15;
					 switch(gkData[pmhListindex].type)
					 {
					     	case 1:
					     	   for(var i =0; i<2; i++)
					               {		       
					               	   if(gbox.intersectRect(auctionPoly[i][0], auctionPoly[i][1],auctionPoly[i][2], auctionPoly[i][3],touchMoveX + 15,touchMoveY + 15,tooltip.width,tooltip.windowEquipmentHeight))
						               {
						               	  auctionDiv[i].style.display="none";
						               }
						               else
						               {
						               	  auctionDiv[i].style.display="";
						               }
					               }
				               	tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,gkData[pmhListindex].toolTipInfo);
				               	break;
				            case 2:
				                for(var i =0; i<2; i++)
					               {		       
					               	   if(gbox.intersectRect(auctionPoly[i][0], auctionPoly[i][1],auctionPoly[i][2], auctionPoly[i][3],touchMoveX + 15,touchMoveY + 15,tooltip.width,tooltip.windowEquipmentHeight))
						               {
						               	  auctionDiv[i].style.display="none";
						               }
						               else
						               {
						               	  auctionDiv[i].style.display="";
						               }
					               }
				               	tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,gkData[pmhListindex].toolTipInfo);
				               	break;
				            case 3:
				                for(var i =0; i<2; i++)
					               {		       
					               	   if(gbox.intersectRect(auctionPoly[i][0], auctionPoly[i][1],auctionPoly[i][2], auctionPoly[i][3],touchMoveX + 15,touchMoveY + 15,tooltip.width,tooltip.windowEquipmentHeight))
						               {
						               	  auctionDiv[i].style.display="none";
						               }
						               else
						               {
						               	  auctionDiv[i].style.display="";
						               }
					               }
				               	tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,gkData[pmhListindex].toolTipInfo);
				               	break; 
				            case 4:
				                 for(var i =0; i<2; i++)
					               {		       
					               	   if(gbox.intersectRect(auctionPoly[i][0], auctionPoly[i][1],auctionPoly[i][2], auctionPoly[i][3],touchMoveX + 15,touchMoveY + 15,tooltip.width,tooltip.windowEquipmentHeight))
						               {
						               	  auctionDiv[i].style.display="none";
						               }
						               else
						               {
						               	  auctionDiv[i].style.display="";
						               }
					               }
				               	tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX + tempOffset,touchMoveY + tempOffset,gkData[pmhListindex].toolTipInfo);
				               	 break; 
					  }	  
                }			   	   
			}
		}
	 });

};
