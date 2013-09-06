var tempX = 0;
var tempY = 0;
var roundX = -36;
var roundY = -36;
var generalDrawBg = true;
var heroArray = new Array();
var nameColorArray = new Array();
var ctrResh = true;
var wjListCtr = false;
var fangzhuCtr = false;
var heroInfo;
var drawInfo = false;
var forcePointAdd = 0;
var intelligencePointAdd = 0;
var agilityPointAdd = 0;
var staminaPointAdd = 0;
var id = -1;
var page = 0;
var pages = 0;
var pupCtr = true;
var removeCtr = true;
var generalsArray = new Array();
var generalsAttributeArray = new Array();
var weaponAtt;//武器
var headpiece;//头盔
var breastplate;//胸甲
var egguard;//护腿
var boots;//靴子
var cuff;//护腕
var muhonInfo; 
var isShowPromoteUI = true;
var promoteInfo;
var generalsChoiceMode = 0;//选择武将基本属性与技能切换按钮控制，0为基本信息，1为技能信息

//var generalsBodyEquip = new Array();

function generalsBodyEquip(temp,tempName)
{
	           tempName={
		                  userItemId:temp.id,//用户物品编号
				          itemType:temp.type,//1.装备， 2.道具，3.材料，4.任务
				          item:
				          {
				          	iconLarge:temp.icon,//物品图标名
				          },
		                  //对象，物品的通用属性
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
							type:temp.type						
						 }
	         }; 
	         if(typeof(temp.toolTipInfo.isBop) != "undefined")
				    {
					    tempName.toolTipInfo.isbag = false;
				    }
				    else
			        {
			        	tempName.toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			        	tempName.toolTipInfo.stone1 = true;
			        	tempName.toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
			        	tempName.toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
			        }
			        else
			        {
			        	tempName.toolTipInfo.stone1 = false;
			        	tempName.toolTipInfo.stoneName1 = "";
			        	tempName.toolTipInfo.stoneNameDesc1 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	tempName.toolTipInfo.stone2 = true;
			        	tempName.toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
			        	tempName.toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
			        }
			        else
			        {
			        	tempName.toolTipInfo.stone2 = false;
			        	tempName.toolTipInfo.stoneName2 = "";
			        	tempName.toolTipInfo.stoneNameDesc2 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	tempName.toolTipInfo.stone3 = true;
			        	tempName.toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
			        	tempName.toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
			        }
			        else
			        {
			        	tempName.toolTipInfo.stone3 = false;
			        	tempName.toolTipInfo.stoneName3 = "";
			        	tempName.toolTipInfo.stoneNameDesc3 = "";
			        } 
	     return tempName;
}
/*
 * 遗忘技能回调
 */
function doforgetHeroSkill(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	if(data.length == 0)
	 heroSkill.splice(0,heroSkill.length);
	else
	{
		heroSkill.splice(0,heroSkill.length);
		for(var i = 0 ; i<data.length; i++)
		{
			var temp = data[i];
			heroSkill[i] = {			
			curDescription : temp.toolTipInfo.description,
			icon : temp.icon,
			name : temp.toolTipInfo.name,
			needExp : temp.needExp,
			nextDescription : temp.nextDescription,
			skillNo : temp.skillNo,
			toolTipInfo: 
			{
				coolDown : temp.toolTipInfo.coolDown,
				description : temp.toolTipInfo.description,
				level : temp.toolTipInfo.level,
				name : temp.toolTipInfo.name,
				needVnp : temp.toolTipInfo.needVnp,
			}
		};
		}
	}
	
}
/*
 * 升级技能回调
 */
function doupgradeHeroSkill(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	heroSkill.splice(0,heroSkill.length);
	for(var i = 0 ; i<data.length; i++)
	{
		var temp = data[i];
		heroSkill[i] = {			
			curDescription : temp.toolTipInfo.description,
			icon : temp.icon,
			name : temp.toolTipInfo.name,
			needExp : temp.needExp,
			nextDescription : temp.nextDescription,
			skillNo : temp.skillNo,
			toolTipInfo: 
			{
				coolDown : temp.toolTipInfo.coolDown,
				description : temp.toolTipInfo.description,
				level : temp.toolTipInfo.level,
				name : temp.toolTipInfo.name,
				needVnp : temp.toolTipInfo.needVnp,
			}
		};
	}
}
function doupHeroGift(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	heroInfo = {
					commandNum:data.hero.command,
					intAgility:data.hero.agility,//身法 
					intAgilityAdd:data.hero.agilityAdd, //身法增值
					intAttack:data.hero.attack, //攻击力
					intCriticalStrike:data.hero.criticalStrike,
					intDefence:data.hero.defence,
					intMiss:data.hero.dodge,					
					exp:data.hero.exp,
					heroNeedExp:data.hero.expLimit,
					intForceAdd:data.hero.forceAdd,
					gift:data.hero.gift,
					intHeroForce:data.hero.heroForce,
					heroName:data.hero.heroName,
					heroSoulName:data.hero.heroSoul,
					heroTitle:data.hero.heroTitle,
					intHit:data.hero.hit,
					userHeroId:data.hero.id,  
					level:data.hero.level, 
					intCurrentMp:data.hero.mp,
					intMp:data.hero.mpMax,
					physique: data.hero.physique,//体质
					physiqueAdd:data.hero.physiqueAdd,
					heroPoint:data.hero.point,
					poolLimit : data.hero.poolLimit,//经验池上线
					quality:data.hero.quality,			
					heroIcon:data.hero.heroIcon,
					intCurrentHp:data.hero.stamina,
					intHp:data.hero.staminaMax, 
					intIntelligence:data.hero.strategy,  
					intIntelligenceAdd:data.hero.strategyAdd,
          			heroType : data.hero.heroType,
          			singleForce : data.hero.singleForce
		        };
    promoteInfo = {
		             amount:data.giftInfo.amount,
		             gift:data.giftInfo.gift,
		             heroName:data.giftInfo.heroName,
		             needItem:data.giftInfo.needItem,
		             successRate:data.giftInfo.successRate,
		                
	              };
}
function dogetHeroGiftInfo(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	
	promoteInfo = {
		             amount:data.amount,
		             gift:data.gift,
		             heroName:data.heroName,
		             needItem:data.needItem,
		             successRate:data.successRate,
		                
	              };
}
function dogetOffAllEquipMentForEquip(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
		heroInfo = undefined;
	heroInfo = {
					commandNum:data.command,
					intAgility:data.agility,//身法 
					intAgilityAdd:data.agilityAdd, //身法增值
					intAttack:data.attack, //攻击力
					intCriticalStrike:data.criticalStrike,
					intDefence:data.defence,
					intMiss:data.dodge,					
					exp:data.exp,
					heroNeedExp:data.expLimit,
					intForceAdd:data.forceAdd,
					gift:data.gift,
					intHeroForce:data.heroForce,
					heroName:data.heroName,
					heroSoulName:data.heroSoul,
					heroTitle:data.heroTitle,
					intHit:data.hit,
					userHeroId:data.id,  
					level:data.level, 
					intCurrentMp:data.mp,
					intMp:data.mpMax,
					physique: data.physique,//体质
					physiqueAdd:data.physiqueAdd,
					heroPoint:data.point,
					poolLimit : data.poolLimit,//经验池上线
					quality:data.quality,			
					heroIcon:data.heroIcon,
					intCurrentHp:data.stamina,
					intHp:data.staminaMax, 
					intIntelligence:data.strategy,  
					intIntelligenceAdd:data.strategyAdd,
          			heroType : data.heroType,
          			singleForce : data.singleForce
		        };
    page = data.equipmentPage.page;
    pages = data.equipmentPage.pages;
    generalsArray.splice(0,generalsArray.length);
    if(data.equipmentPage.equipments != null)
    {
    		for(var a = 0 ; a < data.equipmentPage.equipments.length; a++)
			{
			  var temp = data.equipmentPage.equipments[a];
			  generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
					          },
			                  //对象，物品的通用属性
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
								type:data.equipmentPage.equipments[a].type						
							 }
			  }; 
				    if(typeof(temp.toolTipInfo.isBop) != "undefined")
				    {
					  generalsArray[a].toolTipInfo.isbag = false;
				    }
				    else
			        {
			        	generalsArray[a].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			          generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			        	generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			        	generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			}
    }

}
function dogetOffEquipMentForEquip(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	generalsArray.splice(0,generalsArray.length);
	heroInfo = undefined;
	heroInfo = {
					commandNum:data.command,
					intAgility:data.agility,//身法 
					intAgilityAdd:data.agilityAdd, //身法增值
					intAttack:data.attack, //攻击力
					intCriticalStrike:data.criticalStrike,
					intDefence:data.defence,
					intMiss:data.dodge,					
					exp:data.exp,
					heroNeedExp:data.expLimit,
					intForceAdd:data.forceAdd,
					gift:data.gift,
					intHeroForce:data.heroForce,
					heroName:data.heroName,
					heroSoulName:data.heroSoul,
					heroTitle:data.heroTitle,
					intHit:data.hit,
					userHeroId:data.id,  
					level:data.level, 
					intCurrentMp:data.mp,
					intMp:data.mpMax,
					physique: data.physique,//体质
					physiqueAdd:data.physiqueAdd,
					heroPoint:data.point,
					poolLimit : data.poolLimit,//经验池上线
					quality:data.quality,			
					heroIcon:data.heroIcon,
					intCurrentHp:data.stamina,
					intHp:data.staminaMax, 
					intIntelligence:data.strategy,  
					intIntelligenceAdd:data.strategyAdd,
          			heroType : data.heroType,
          			singleForce : data.singleForce
		        };
    page = data.equipmentPage.page;
    pages = data.equipmentPage.pages;
    if(data.equipmentPage.equipments != null)
    {        
    	
    		for(var a = 0 ; a < data.equipmentPage.equipments.length; a++)
				{
				  var temp = data.equipmentPage.equipments[a];
				  generalsArray[a]={
					              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
						          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
						          item:
						          {
						          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
						          },
				                  //对象，物品的通用属性
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
									type:data.equipmentPage.equipments[a].type						
								 }
				  }; 
				    if(typeof(temp.toolTipInfo.isBop) != "undefined")
				    {
					  generalsArray[a].toolTipInfo.isbag = false;
				    }
				    else
			        {
			        	generalsArray[a].toolTipInfo.isbag = true;
			        }
			       if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			          generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			        	generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			        	generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
				}
    }
 
}
function doputOnEquipMentForEquip(data)
{

	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	generalsArray.splice(0,generalsArray.length);
	heroInfo = undefined;
	heroInfo = {
					commandNum:data.command,
					intAgility:data.agility,//身法 
					intAgilityAdd:data.agilityAdd, //身法增值
					intAttack:data.attack, //攻击力
					intCriticalStrike:data.criticalStrike,
					intDefence:data.defence,
					intMiss:data.dodge,					
					exp:data.exp,
					heroNeedExp:data.expLimit,
					intForceAdd:data.forceAdd,
					gift:data.gift,
					intHeroForce:data.heroForce,
					heroName:data.heroName,
					heroSoulName:data.heroSoul,
					heroTitle:data.heroTitle,
					intHit:data.hit,
					userHeroId:data.id,  
					level:data.level, 
					intCurrentMp:data.mp,
					intMp:data.mpMax,
					physique: data.physique,//体质
					physiqueAdd:data.physiqueAdd,
					heroPoint:data.point,
					poolLimit : data.poolLimit,//经验池上线
					quality:data.quality,			
					heroIcon:data.heroIcon,
					intCurrentHp:data.stamina,
					intHp:data.staminaMax, 
					intIntelligence:data.strategy,  
					intIntelligenceAdd:data.strategyAdd,
          			heroType : data.heroType,
          			singleForce : data.singleForce
		        };
    page = data.equipmentPage.page;
    pages = data.equipmentPage.pages;
    for(var a =0; a<data.equipmentPage.equipments.length; a++)
    if(data.equipmentPage.equipments != null)
    {
    	for(var a = 0 ; a < data.equipmentPage.equipments.length; a++)
    	{
    	  var temp = data.equipmentPage.equipments[a];
		  generalsArray[a]={
			              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
				          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
				          item:
				          {
				          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
				          },
		                  //对象，物品的通用属性
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
							type:data.equipmentPage.equipments[a].type						
						 }
		  }; 
				    if(typeof(temp.toolTipInfo.isBop) != "undefined")
				    {
					  generalsArray[a].toolTipInfo.isbag = false;
				    }
				    else
			        {
			        	generalsArray[a].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			          generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			        	generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			        	generalsArray[a]={
				              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
    }
    }
    weaponAtt = "";	
    headpiece = "";
    breastplate = "";
    egguard = "";
    boots = "";
    cuff = "";
   	for(var a =0; a<data.heroEquipments.length; a++)
   	{
   		var temp = data.heroEquipments[a]; 	
   		if(data.heroEquipments[a].toolTipInfo.equipmentType == 1)
   		{
   			 weaponAtt = generalsBodyEquip(temp,"weaponAtt");
   		}
		if(data.heroEquipments[a].toolTipInfo.equipmentType == 2)
   		{
   			 headpiece = generalsBodyEquip(temp,"headpiece");
   		}
   		if(data.heroEquipments[a].toolTipInfo.equipmentType == 3)
   		{
   			 breastplate =generalsBodyEquip(temp,"breastplate");
   		}	  
        if(data.heroEquipments[a].toolTipInfo.equipmentType == 4)
   		{
   			egguard = generalsBodyEquip(temp,"egguard");
   		}
   		if(data.heroEquipments[a].toolTipInfo.equipmentType == 5)
   		{
   			boots = generalsBodyEquip(temp,"boots");
   		}
   		if(data.heroEquipments[a].toolTipInfo.equipmentType == 6)
   		{
   			cuff = generalsBodyEquip(temp,"cuff");
   		}	
	}
	generalDrawBg = true;
}
function dogetUserEquipByPage(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	    page = data.page;
    pages = data.pages;
    generalsArray.splice(0,generalsArray.length);
    if(data.equipments != null)
    {
    	for(var a = 0 ; a < data.equipments.length; a++)
		{
		 var temp = data.equipments[a];
		  generalsArray[a]={
			              userItemId:data.equipments[a].id,//用户物品编号
				          itemType:data.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
				          item:
				          {
				          	itemIcon:data.equipments[a].icon,//物品图标名
				          },
		                  //对象，物品的通用属性
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
							type:data.equipments[a].type						
						 }
		  }; 
				    if(typeof(temp.toolTipInfo.isBop) != "undefined")
				    {
					  generalsArray[a].toolTipInfo.isbag = false;
				    }
				    else
			        {
			        	generalsArray[a].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			          generalsArray[a]={
				              userItemId:data.equipments[a].id,//用户物品编号
					          itemType:data.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipments[a].icon,//物品图标名
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
			        	generalsArray[a]={
				              userItemId:data.equipments[a].id,//用户物品编号
					          itemType:data.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipments[a].icon,//物品图标名
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
			        	generalsArray[a]={
				              userItemId:data.equipments[a].id,//用户物品编号
					          itemType:data.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipments[a].icon,//物品图标名
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
		}
    }
	
}
function dorecoverMp(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	heroInfo.intCurrentMp = data;	
}
function dorecoverHp(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	heroInfo.intCurrentHp = data;	
}
function doaresetHeroPoint(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	heroInfo = {
					commandNum:data.command,
					intAgility:data.agility,//身法 
					intAgilityAdd:data.agilityAdd, //身法增值
					intAttack:data.attack, //攻击力
					intCriticalStrike:data.criticalStrike,
					intDefence:data.defence,
					intMiss:data.dodge,					
					exp:data.exp,
					heroNeedExp:data.expLimit,
					intForceAdd:data.forceAdd,
					gift:data.gift,
					intHeroForce:data.heroForce,
					heroName:data.heroName,
					heroSoulName:data.heroSoul,
					heroTitle:data.heroTitle,
					intHit:data.hit,
					userHeroId:data.id,  
					level:data.level, 
					intCurrentMp:data.mp,
					intMp:data.mpMax,
					physique: data.physique,//体质
					physiqueAdd:data.physiqueAdd,
					heroPoint:data.point,
					poolLimit : data.poolLimit,//经验池上线
					quality:data.quality,			
					heroIcon:data.heroIcon,
					intCurrentHp:data.stamina,
					intHp:data.staminaMax, 
					intIntelligence:data.strategy,  
					intIntelligenceAdd:data.strategyAdd,
          			heroType : data.heroType,
          			singleForce : data.singleForce
		        };
}
function doaddPoint(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
		heroInfo = {
					commandNum:data.command,
					intAgility:data.agility,//身法 
					intAgilityAdd:data.agilityAdd, //身法增值
					intAttack:data.attack, //攻击力
					intCriticalStrike:data.criticalStrike,
					intDefence:data.defence,
					intMiss:data.dodge,					
					exp:data.exp,
					heroNeedExp:data.expLimit,
					intForceAdd:data.forceAdd,
					gift:data.gift,
					intHeroForce:data.heroForce,
					heroName:data.heroName,
					heroSoulName:data.heroSoul,
					heroTitle:data.heroTitle,
					intHit:data.hit,
					userHeroId:data.id,  
					level:data.level, 
					intCurrentMp:data.mp,
					intMp:data.mpMax,
					physique: data.physique,//体质
					physiqueAdd:data.physiqueAdd,
					heroPoint:data.point,
					poolLimit : data.poolLimit,//经验池上线
					quality:data.quality,			
					heroIcon:data.heroIcon,
					intCurrentHp:data.stamina,
					intHp:data.staminaMax, 
					intIntelligence:data.strategy,  
					intIntelligenceAdd:data.strategyAdd,
          			heroType : data.heroType,
          			singleForce : data.singleForce
		        };
}
function doupHeroLevel(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	heroInfo = {
					commandNum:data.command,
					intAgility:data.agility,//身法 
					intAgilityAdd:data.agilityAdd, //身法增值
					intAttack:data.attack, //攻击力
					intCriticalStrike:data.criticalStrike,
					intDefence:data.defence,
					intMiss:data.dodge,					
					exp:data.exp,
					heroNeedExp:data.expLimit,
					intForceAdd:data.forceAdd,
					gift:data.gift,
					intHeroForce:data.heroForce,
					heroName:data.heroName,
					heroSoulName:data.heroSoul,
					heroTitle:data.heroTitle,
					intHit:data.hit,
					userHeroId:data.id,  
					level:data.level, 
					intCurrentMp:data.mp,
					intMp:data.mpMax,
					physique: data.physique,//体质
					physiqueAdd:data.physiqueAdd,
					heroPoint:data.point,
					poolLimit : data.poolLimit,//经验池上线
					quality:data.quality,			
					heroIcon:data.heroIcon,
					intCurrentHp:data.stamina,
					intHp:data.staminaMax, 
					intIntelligence:data.strategy,  
					intIntelligenceAdd:data.strategyAdd,
          			heroType : data.heroType,
          			singleForce : data.singleForce
		        };  
}

function doupdateHeroName(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	if(data.status == "success")
	{
		for(var i =0; i<heroArray.length; i++)
		{
			if(heroInfo.userHeroId == heroArray[i].userHeroId)
			{
				heroArray[i].heroName = afreshNameText.value;
			}
		}
		heroInfo.heroName = afreshNameText.value;
        if(afreshNameDiv != null && gbox._isIndwellDiv("afreshNameDiv","input"))
        {                			
               document.body.removeChild(afreshNameDiv);  
			   afreshNameDiv = null;  
		}
	}
	for(var a = 0 ; a < heroArray.length; a++)
	{          
		       	switch(heroArray[a].quality)
			  	{
						case 1:
							nameColorArray[a] = '#FFFFFF';
						break;
						case 2:
							nameColorArray[a] = '#08cc1a';
						break;
						case 3:
							nameColorArray[a] = '#006cff';
						break;
						case 4:
							nameColorArray[a] = '#dc00df';
						break;
						case 5:
							nameColorArray[a] = '#e09900';
						break;
						case 6:
							nameColorArray[a] = '#ff0000';
						break;
						
				}	       	    
		}
	var _item1 = new Array();		
	for(var i = 0 ; i<heroArray.length; i++)
			{
				 _item1[i] = heroArray[i].heroName;
			}	
    isShowAuctionPorp = false;
    pupCtr = false;
    generalsSkillCtr = false;
    var content = new Array(_item1);
    wujiangList.update(content,nameColorArray,30);
	wjListCtr = true;   
}
function dofireUserHero(data)
{
	if(typeof(data.error) != "undefined")
	{		 
		 alert("系统提示：" + data.error);
		 return;
	}
	drawInfo = false; 
    wjId =  -1;
    heroInfo.singleForce = "";
	heroArray.splice(0,heroArray.length);
	heroArray = new Array();
	for(var a = 0 ; a < data.length; a++)
	{
				heroArray[a] = {
									 heroName:data[a].heroName,
					                 quality:data[a].quality,
					                 userHeroId:data[a].id,					
		                        };	
		       	switch(heroArray[a].quality)
			  	{
						case 1:
							nameColorArray[a] = '#FFFFFF';
						break;
						case 2:
							nameColorArray[a] = '#08cc1a';
						break;
						case 3:
							nameColorArray[a] = '#006cff';
						break;
						case 4:
							nameColorArray[a] = '#dc00df';
						break;
						case 5:
							nameColorArray[a] = '#e09900';
						break;
						case 6:
							nameColorArray[a] = '#ff0000';
						break;
				}	       	    
	  }
	var _item1 = new Array();		
	for(var i = 0 ; i<heroArray.length; i++)
			{
				 _item1[i] = heroArray[i].heroName;
			}			
    var content = new Array(_item1);
    wujiangList.mouseUpIndex = -1;
    wujiangList.init( 'wj_button', 'wj_hit', 'wj_hit','wj_hit',nameColorArray, content, 222, 185, 1, 30, 34, 12, true, 20, 0 );
	wjListCtr = true;
}
var heroSkill = new Array();

function dogetUserHero(data)
{
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	heroSkill.splice(0,heroSkill.length);
	for(var i = 0 ; i<data.skills.length; i++)
	{
		var temp = data.skills[i];
		heroSkill[i] = {			
			curDescription : data.skills[i].toolTipInfo.description,
			icon : data.skills[i].icon,
			name : data.skills[i].toolTipInfo.name,
			needExp : data.skills[i].needExp,
			nextDescription : data.skills[i].nextDescription,
			skillNo : data.skills[i].skillNo,
			toolTipInfo: 
			{
				coolDown : temp.toolTipInfo.coolDown,
				description : temp.toolTipInfo.description,
				level : temp.toolTipInfo.level,
				name : temp.toolTipInfo.name,
				needVnp : temp.toolTipInfo.needVnp,
			}
		};
	}
	heroInfo = undefined;
	heroInfo = {
					commandNum:data.command,
					intAgility:data.agility,//身法 
					intAgilityAdd:data.agilityAdd, //身法增值
					intAttack:data.attack, //攻击力
					intCriticalStrike:data.criticalStrike,
					intDefence:data.defence,
					intMiss:data.dodge,					
					exp:data.exp,
					heroNeedExp:data.expLimit,
					intForceAdd:data.forceAdd,
					gift:data.gift,
					intHeroForce:data.heroForce,
					heroName:data.heroName,
					heroSoulName:data.heroSoul,
					heroTitle:data.heroTitle,
					intHit:data.hit,
					userHeroId:data.id,  
					level:data.level, 
					intCurrentMp:data.mp,
					intMp:data.mpMax,
					physique: data.physique,//体质
					physiqueAdd:data.physiqueAdd,
					heroPoint:data.point,
					poolLimit : data.poolLimit,//经验池上线
					quality:data.quality,			
					heroIcon:data.heroIcon,
					intCurrentHp:data.stamina,
					intHp:data.staminaMax, 
					intIntelligence:data.strategy,  
					intIntelligenceAdd:data.strategyAdd,
					heroType : data.heroType,
					singleForce : data.singleForce
          			
		        };
    page = data.equipmentPage.page;
    pages = data.equipmentPage.pages;
    if(data.equipmentPage.equipments != null)
    {
    	
    	for(var a = 0 ; a < data.equipmentPage.equipments.length; a++)
		{
		  var temp = data.equipmentPage.equipments[a];
		  generalsArray[a]=
		            {
			              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
				          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
				          item:
				          {
				          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
				          },
		                  //对象，物品的通用属性
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
					  generalsArray[a].toolTipInfo.isbag = false;
				    }
				    else
			        {
			        	generalsArray[a].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			          generalsArray[a] = {
	        	              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			        	generalsArray[a] = {
	        	              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
			        	generalsArray[a] = {
	        	              userItemId:data.equipmentPage.equipments[a].id,//用户物品编号
					          itemType:data.equipmentPage.equipments[a].type,//1.装备， 2.道具，3.材料，4.任务
					          item:
					          {
					          	itemIcon:data.equipmentPage.equipments[a].icon,//物品图标名
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
	}
    }
	
	weaponAtt = "";	
    headpiece = "";
    breastplate = "";
    egguard = "";
    boots = "";
    cuff = "";
   	for(var a = 0; a<data.heroEquipments.length; a++)
   	{
   		var temp = data.heroEquipments[a]; 	
   		if(data.heroEquipments[a].toolTipInfo.equipmentType == 1)
   		{
   			 weaponAtt = generalsBodyEquip(temp,"weaponAtt");
   		}
		if(data.heroEquipments[a].toolTipInfo.equipmentType == 2)
   		{
   			 headpiece = generalsBodyEquip(temp,"headpiece");
   		}
   		if(data.heroEquipments[a].toolTipInfo.equipmentType == 3)
   		{
   			 breastplate =generalsBodyEquip(temp,"breastplate");
   		}	  
        if(data.heroEquipments[a].toolTipInfo.equipmentType == 4)
   		{
   			egguard = generalsBodyEquip(temp,"egguard");
   		}
   		if(data.heroEquipments[a].toolTipInfo.equipmentType == 5)
   		{
   			boots = generalsBodyEquip(temp,"boots");
   		}
   		if(data.heroEquipments[a].toolTipInfo.equipmentType == 6)
   		{
   			cuff = generalsBodyEquip(temp,"cuff");
   		}	
   	} 
	  generalDrawBg = true; 
	 	 
}
function dogetUserHeroInfo(data)//获取英雄列表
{
	
	if(typeof(data.error) != "undefined")
	{
				alert("系统提示：" + data.error);
				return;
	}
	for(var a = 0 ; a < data.length; a++)
	{
				heroArray[a] = {
									 heroName:data[a].heroName,
					                 quality:data[a].quality,
					                 userHeroId:data[a].id,					
		                        };	
		       	switch(heroArray[a].quality)
			  	{
						case 1:
							nameColorArray[a] = '#FFFFFF';
						break;
						case 2:
							nameColorArray[a] = '#08cc1a';
						break;
						case 3:
							nameColorArray[a] = '#006cff';
						break;
						case 4:
							nameColorArray[a] = '#dc00df';
						break;
						case 5:
							nameColorArray[a] = '#e09900';
						break;
						case 6:
							nameColorArray[a] = '#ff0000';
						break;
				}	       	    
	  }
	var _item = new Array();		
	for(var i = 0 ; i<heroArray.length; i++)
			{
				 _item[i] = heroArray[i].heroName;
			}		
    var content = new Array(_item);
	wjOffsetY = wj_OffsetY = 0;
	wujiangList.init( 'wj_button', 'wj_hit', 'wj_hit','wj_hit',nameColorArray, content, 222, 185, 1, 30, 34, 12, true, 20, 0 );
	wjListCtr = true;
}
var generalsItem= function(index,_group,_layer)//武将
{
	if(ctrResh)
	{
		Hero.getAllUserHero(dogetUserHeroInfo);
		ctrResh = false;
	}
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	generalDrawBg = true;
	tempX = (gbox.getScreenW() - gbox.getImage("wj_zjm_02").width)/2;
    tempY = (gbox.getScreenH() - gbox.getImage("wj_zjm_02").height)/2;
	gbox.addObject(
			{ 
				id : 'generalsItem0',
				group : 'levelMenu_2',
				tileset : 'wj_zjm_02',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [tempX,tempY], [tempX + gbox.getImage("wj_zjm_02").width,tempY], [tempX + gbox.getImage("wj_zjm_02").width,tempY+ gbox.getImage("wj_zjm_02").height],[tempX,tempY+ gbox.getImage("wj_zjm_02").height]],
				initialize : function()
				{	

				},
				first : function() 
				{	
				},
				myclick : function()
				{
					isShowAuctionPorp = false;
					isShowPromoteUI = false;
					pupCtr = false;
					generalsSkillCtr = false;
                    //基本属性与技能切换控制
                    if(lastTouchMoveX > 416 && lastTouchMoveX < 465 && lastTouchMoveY > 345 && lastTouchMoveY < 368)
                    {
                    	isShowAuctionPorp = false;
                    	 pupCtr = false;
                    	generalsChoiceMode = 0;
                    }
                    if(lastTouchMoveX > 468 && lastTouchMoveX < 518 && lastTouchMoveY > 345 && lastTouchMoveY < 368)
                    {
                    	isShowAuctionPorp = false;
                    	generalsChoiceMode = 1;
                    }
                    /////////////////////////////
                    if(generalsChoiceMode == 1)
                    {
                    	isShowPromoteUI = false;
                    }

					if(afreshNameDiv != null && gbox._isIndwellDiv("afreshNameDiv","input")){
				            document.body.removeChild(afreshNameDiv);  
				            afreshNameDiv = null;  
					}
					if(((exitButtonCoordinate5.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate5.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate5.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate5.y+gbox.getImage("ty_an_17").height)))
					{
						drawInfo = false;
						ctrList=false;
						generalDrawBg = false;
						wujiangList.mouseUpIndex = -1;
						exit(getClickObjectIndex());
						curGroup = 'cityMenu';
					}
					else if(lastTouchMoveX > 722 && lastTouchMoveX < 781 && lastTouchMoveY > 167 && lastTouchMoveY < 191)
					{
						if(drawInfo)
						{
							var btnTxt = new Array();
							btnTxt[0] = "确定";
							btnTxt[1] = "取消";
							isShowAuctionPorp = true;
							pupCtr = false;
							isShowPromoteUI = false;
				            afreshName(getClickObjectIndex(),"","确认修改名字吗？",btnTxt,0,20,_group,_layer);	
				            changeMap(_layer);
						}

					 }
					else if(((722 < lastTouchMoveX) && (lastTouchMoveX < 780)) && ((197 < lastTouchMoveY) && (lastTouchMoveY < 221)))
					{
						if(drawInfo)
						{
							Hero.heroLevelup(heroInfo.userHeroId,doupHeroLevel);
						}
					}
					else if(((623 < lastTouchMoveX) && (lastTouchMoveX < 707)) && ((438 < lastTouchMoveY) && (lastTouchMoveY < 460))&& (generalsChoiceMode == 0))
					{
						    if(drawInfo)
						    {
						    	Hero.distributePoint(heroInfo.userHeroId, forcePointAdd, intelligencePointAdd, staminaPointAdd, agilityPointAdd,doaddPoint);
						    	forcePointAdd = 0;
						    	intelligencePointAdd = 0;
						    	staminaPointAdd = 0;
						    	agilityPointAdd = 0;
						    }

					}
					/*
					 * 武将技能页掉出弹出框控制
					 */
					else if(((418 < lastTouchMoveX) && (lastTouchMoveX < 467)) && ((374 < lastTouchMoveY) && (lastTouchMoveY < 424))&& (generalsChoiceMode == 1))
					{
						if(heroSkill[0]!= "undefined" && heroSkill[0]!= "" && heroSkill[0]!= null)
						{
							 skillUI(getClickObjectIndex(),451,397,_group,_layer,0);
						     changeMap(_layer);
						}
						 
					}
					else if(((632 < lastTouchMoveX) && (lastTouchMoveX < 681)) && ((374 < lastTouchMoveY) && (lastTouchMoveY < 424))&& (generalsChoiceMode == 1))
					{
						if(heroSkill[1]!= "undefined" && heroSkill[1]!= "" && heroSkill[1]!= null)
						{
							 skillUI(getClickObjectIndex(),661,397,_group,_layer,1);
						     changeMap(_layer);
						}
						 
					}
					else if(((420 < lastTouchMoveX) && (lastTouchMoveX < 466)) && ((436 < lastTouchMoveY) && (lastTouchMoveY < 486))&& (generalsChoiceMode == 1))
					{
						if(heroSkill[2]!= "undefined" && heroSkill[2]!= "" && heroSkill[2]!= null)
						{
							 skillUI(getClickObjectIndex(),441,461,_group,_layer,2);
						     changeMap(_layer);
						}
						 
					}
					else if(((632 < lastTouchMoveX) && (lastTouchMoveX < 682)) && ((436 < lastTouchMoveY) && (lastTouchMoveY < 486))&& (generalsChoiceMode == 1))
					{
						if(heroSkill[3]!= "undefined" && heroSkill[3]!= "" && heroSkill[3]!= null)
						{
							 skillUI(getClickObjectIndex(),656,461,_group,_layer,3);
						     changeMap(_layer);
						}
						 
					}
					else if(((419 < lastTouchMoveX) && (lastTouchMoveX < 468)) && ((497 < lastTouchMoveY) && (lastTouchMoveY < 546))&& (generalsChoiceMode == 1))
					{
						if(heroSkill[4]!= "undefined" && heroSkill[4]!= "" && heroSkill[4]!= null)
						{
							 skillUI(getClickObjectIndex(),442,519,_group,_layer,4);
						     changeMap(_layer);
						}
						 
					}
					else if(((633 < lastTouchMoveX) && (lastTouchMoveX < 681)) && ((497 < lastTouchMoveY) && (lastTouchMoveY < 546))&& (generalsChoiceMode == 1))
					{
						if(heroSkill[5]!= "undefined" && heroSkill[5]!= "" && heroSkill[5]!= null)
						{
							 skillUI(getClickObjectIndex(),656,519,_group,_layer,5);
						     changeMap(_layer);
						}
						 
					}
					else if(((419 < lastTouchMoveX) && (lastTouchMoveX < 468)) && ((554 < lastTouchMoveY) && (lastTouchMoveY < 604))&& (generalsChoiceMode == 1))
					{
						if(heroSkill[6]!= "undefined" && heroSkill[6]!= "" && heroSkill[6]!= null)
						{
							 skillUI(getClickObjectIndex(),442,578,_group,_layer,6);
						     changeMap(_layer);
						}
						 
					}
					else if(((632 < lastTouchMoveX) && (lastTouchMoveX < 682)) && ((554 < lastTouchMoveY) && (lastTouchMoveY < 604))&& (generalsChoiceMode == 1))
					{
						if(heroSkill[7]!= "undefined" && heroSkill[7]!= "" && heroSkill[7]!= null)
						{
							 skillUI(getClickObjectIndex(),662,578,_group,_layer,7);
						     changeMap(_layer);
						}
						 
					}
					/*
					 * ///////////////////////////////////////////////////////
					 */
					else if(((567 < lastTouchMoveX) && (lastTouchMoveX < 584)) && ((386 < lastTouchMoveY) && (lastTouchMoveY < 401))&& (generalsChoiceMode == 0))
							{
								    if(heroInfo.heroPoint > 0 && drawInfo)
								    {
								    	forcePointAdd = forcePointAdd+1;
					                    heroInfo.intHeroForce = heroInfo.intHeroForce + 1;
					                    heroInfo.heroPoint = heroInfo.heroPoint - 1;
								    }
		                             isShowAuctionPorp = false;
		                             pupCtr = false;
		                             generalsSkillCtr = false;
							}
					else if(((587 < lastTouchMoveX) && (lastTouchMoveX < 599)) && ((387 < lastTouchMoveY) && (lastTouchMoveY < 401))&& (generalsChoiceMode == 0))
							{
								    if(forcePointAdd > 0 && drawInfo)
								    {
								    	forcePointAdd = forcePointAdd-1;
					                    heroInfo.intHeroForce = heroInfo.intHeroForce -1;
					                    heroInfo.heroPoint = heroInfo.heroPoint +1;
								    }
		                            isShowAuctionPorp = false;
		                             pupCtr = false;
		                             generalsSkillCtr = false;
							}
					else if(((737 < lastTouchMoveX) && (lastTouchMoveX < 755)) && ((386 < lastTouchMoveY) && (lastTouchMoveY < 403))&& (generalsChoiceMode == 0))
							{
								    if(heroInfo.heroPoint > 0 && drawInfo)
								    {
								    	intelligencePointAdd = intelligencePointAdd+1;
					                    heroInfo.intIntelligence = heroInfo.intIntelligence + 1;
					                    heroInfo.heroPoint = heroInfo.heroPoint - 1;
								    }
		                            isShowAuctionPorp = false;
		                             pupCtr = false;
		                             generalsSkillCtr = false;
							}
					else if(((758 < lastTouchMoveX) && (lastTouchMoveX < 774)) && ((386 < lastTouchMoveY) && (lastTouchMoveY < 403))&& (generalsChoiceMode == 0))
							{
								    if(intelligencePointAdd > 0 && drawInfo)
								    {
								    	intelligencePointAdd = intelligencePointAdd-1;
					                    heroInfo.intIntelligence = heroInfo.intIntelligence -1;
					                    heroInfo.heroPoint = heroInfo.heroPoint +1;
								    }
		                            isShowAuctionPorp = false;
		                             pupCtr = false;
		                             generalsSkillCtr = false;
							}
					else if(((567 < lastTouchMoveX) && (lastTouchMoveX < 582)) && ((414 < lastTouchMoveY) && (lastTouchMoveY < 430))&& (generalsChoiceMode == 0))
							{
								    if(heroInfo.heroPoint > 0 && drawInfo)
								    {
								    	agilityPointAdd = agilityPointAdd+1;
					                    heroInfo.intAgility = heroInfo.intAgility + 1;
					                    heroInfo.heroPoint = heroInfo.heroPoint - 1;
								    }
		
							}
					else if(((588 < lastTouchMoveX) && (lastTouchMoveX < 600)) && ((414 < lastTouchMoveY) && (lastTouchMoveY < 430))&& (generalsChoiceMode == 0))
							{
								    if(agilityPointAdd > 0 && drawInfo)
								    {
								    	agilityPointAdd = agilityPointAdd-1;
					                    heroInfo.intAgility = heroInfo.intAgility -1;
					                    heroInfo.heroPoint = heroInfo.heroPoint +1;
								    }
		
							}					
					 else if(((737 < lastTouchMoveX) && (lastTouchMoveX < 755)) && ((413 < lastTouchMoveY) && (lastTouchMoveY < 428))&& (generalsChoiceMode == 0))
							{
								    if(heroInfo.heroPoint > 0 && drawInfo)
								    {
								    	staminaPointAdd = staminaPointAdd+1;
					                    heroInfo.physique = heroInfo.physique + 1;
					                    heroInfo.heroPoint = heroInfo.heroPoint - 1;
								    }
		
							}
					 else if(((760 < lastTouchMoveX) && (lastTouchMoveX < 773)) && ((413 < lastTouchMoveY) && (lastTouchMoveY < 428))&& (generalsChoiceMode == 0))
							{
								    if(staminaPointAdd > 0 && drawInfo)
								    {
								    	staminaPointAdd = staminaPointAdd-1;
					                    heroInfo.physique = heroInfo.physique -1;
					                    heroInfo.heroPoint = heroInfo.heroPoint +1;
								    }
		                            isShowAuctionPorp = false;
		                             pupCtr = false;
		                             generalsSkillCtr = false;
							}
					else if(((718 < lastTouchMoveX) && (lastTouchMoveX < 769)) && ((436 < lastTouchMoveY) && (lastTouchMoveY < 464))&& (generalsChoiceMode == 0))
					{
						    if(drawInfo)
						    {
						    	Hero.resetPoint(heroInfo.userHeroId,doaresetHeroPoint);						    	
						    }

					}
					else if(((563 < lastTouchMoveX) && (lastTouchMoveX < 620)) && ((530 < lastTouchMoveY) && (lastTouchMoveY < 556))&& (generalsChoiceMode == 0))
					{
						    if(drawInfo)
						    {
						    	Hero.cureHeroStamina(heroInfo.userHeroId,dorecoverHp);						    	
						    }

					}
					else if(((767 < lastTouchMoveX) && (lastTouchMoveX < 824)) && ((530 < lastTouchMoveY) && (lastTouchMoveY < 556))&& (generalsChoiceMode == 0))
					{
						    if(drawInfo)
						    {
						    	Hero.updateHeroMp(heroInfo.userHeroId,dorecoverMp);						    	
						    }

					}
					else if(((728 < lastTouchMoveX) && (lastTouchMoveX < 777)) && ((243 < lastTouchMoveY) && (lastTouchMoveY < 271))&& (generalsChoiceMode == 0))
					{
						if(drawInfo)
						{
							var btnTxt = new Array();
							btnTxt[0] = "确定";
							btnTxt[1] = "取消";
							isShowPromoteUI = true;
							isShowAuctionPorp = false;
							pupCtr = false;
				            promoteUI(getClickObjectIndex(),_group,_layer);
				            Hero.getHeroGiftInfo(heroInfo.userHeroId,dogetHeroGiftInfo);
				            changeMap(_layer);
						}
					}
					else if(((420 < lastTouchMoveX) && (lastTouchMoveX < 502)) && ((313 < lastTouchMoveY) && (lastTouchMoveY < 336)))
					{
						if(wjId!=-1)
						{
							Hero.fireHero(heroInfo.userHeroId,dofireUserHero);
							fangzhuCtr = false;
						}						  
                       
					}
					else if(((1050 < lastTouchMoveX) && (lastTouchMoveX < 1063)) && ((597 < lastTouchMoveY) && (lastTouchMoveY < 611)))//控制向右翻页
                    {
               	        if(page < pages)
               	           Hero.getEquipmentPage(page + 1,dogetUserEquipByPage);
               	        id = -1;
               	        roundX = -35;	
	                    roundY = -35;
                    }
                    else if(((983 < lastTouchMoveX) && (lastTouchMoveX < 994)) && ((597 < lastTouchMoveY) && (lastTouchMoveY < 611)))//控制向左翻页
                    {
               	        if(page >= 2)
               	           Hero.getEquipmentPage(page - 1,dogetUserEquipByPage);
               	        id = -1;
               	        roundX = -35;	
	                    roundY = -35;
                    }
                    else if(((997 < lastTouchMoveX) && (lastTouchMoveX < 1047)) && ((185 < lastTouchMoveY) && (lastTouchMoveY < 229)))//卸装控制
                    {
                       
                       if(typeof(headpiece) != "undefined" && headpiece != "")
                       {
                       	    pupCtr = false;
                       	    generalsSkillCtr = false;
                       	    removeCtr = true;
                       	    removestageItemPup(index,1017,200,headpiece.userItemId,2,_group,_layer);
                       }
               	       
                    }
                    else if(((1079 < lastTouchMoveX) && (lastTouchMoveX < 1126)) && ((275 < lastTouchMoveY) && (lastTouchMoveY < 324)))//卸装控制
                    {
                       
                       if(typeof(weaponAtt) != "undefined" && weaponAtt != "")
                       {
                       	    pupCtr = false;
                       	    generalsSkillCtr = false;
                       	    removeCtr = true;
                       	    removestageItemPup(index,1103,296,weaponAtt.userItemId,1,_group,_layer);
                       }

                    }	
                    else if(((998 < lastTouchMoveX) && (lastTouchMoveX < 1042)) && ((247 < lastTouchMoveY) && (lastTouchMoveY < 293)))//卸装控制
                    {
                       if(typeof(breastplate) != "undefined" && breastplate != "")
                       {
                       	   pupCtr = false;
                       	   generalsSkillCtr = false;
                       	   removeCtr = true;
	               	       removestageItemPup(index,1017,269,breastplate.userItemId,3,_group,_layer);
                       }
                       
                    }	
                    else if(((998 < lastTouchMoveX) && (lastTouchMoveX < 1042)) && ((309 < lastTouchMoveY) && (lastTouchMoveY < 354)))//卸装控制
                    {
                       if(typeof(egguard) != "undefined" && egguard != "")
                       {
                       	   pupCtr = false;
                       	   generalsSkillCtr = false;
	                       removeCtr = true;
	               	       removestageItemPup(index,1017,331,egguard.userItemId,4,_group,_layer);
                       }

                    }
                    else if(((998 < lastTouchMoveX) && (lastTouchMoveX < 1042)) && ((371 < lastTouchMoveY) && (lastTouchMoveY < 417)))//卸装控制
                    {
                       if(typeof(boots) != "undefined" && boots != "")
                       {
                       	   pupCtr = false;
                       	   generalsSkillCtr = false;
	                       removeCtr = true;
               	           removestageItemPup(index,1017,388,boots.userItemId,5,_group,_layer);
                       }
                       
                    }
                    else if(((1060 < lastTouchMoveX) && (lastTouchMoveX < 1146)) && ((371 < lastTouchMoveY) && (lastTouchMoveY < 396)))
                    {
                           Hero.removeAllEquipment(heroInfo.userHeroId,page,dogetOffAllEquipMentForEquip);
                           weaponAtt = "";//武器
						   headpiece= "";//头盔
						   breastplate= "";//胸甲
						   egguard= "";//护腿
						   boots= "";//靴子
						   cuff= "";//护腕
                    }	
                    else if(((909 < lastTouchMoveX) && (lastTouchMoveX < 957)) && ((276 < lastTouchMoveY) && (lastTouchMoveY < 324)))//卸装控制
                    {
                       if(typeof(cuff) != "undefined" && cuff != "")
                       {
	                       removeCtr = true;
               	           removestageItemPup(index,929,297,cuff.userItemId,6,_group,_layer);
                       }
                       
                    }		
					else
					{
					 	generalsItem(getClickObjectIndex(),_group,_layer);
					    changeMap(_layer);
					}
					for(var a = 0; a < 4; a++)
           		       for(var b = 0; b<7; b++)
           		       {
           		       	 if(generalsArray[b + a*7] != "undefined" && (generalsArray.length > (b + a*7 )))
           		       	  {
           		       	  	  if((((894 + (b*gbox.getImage("ty_an_128").width)) < lastTouchMoveX) && (lastTouchMoveX < (927+ (b*gbox.getImage("ty_an_128").width)))) && (((450+ (a*gbox.getImage("ty_an_128").height)) < lastTouchMoveY) && (lastTouchMoveY < (484 + (a*gbox.getImage("ty_an_128").height)))))
	           		       	   {
	           		       	   	   isShowAuctionPorp = false;
	           		       	   	   generalsSkillCtr = false;
	           		       	   	   isShowPromoteUI = false;
	           		       	   	   roundX = 894 + (b*gbox.getImage("ty_an_128").width);	
	                    		   roundY = 450+ (a*gbox.getImage("ty_an_128").height);
	                    		   id = (b + a*7);
	                    		   pupCtr = true;
	                    		   removeCtr =  false;
	                    		   if(generalsArray[id].toolTipInfo.isBound == 1)
	                    		   {
	                    		   	  pupCtr = false;
	                    		   	  generalsSkillCtr = false;
	                    		      Hero.addEquipment(heroInfo.userHeroId,generalsArray[id].userItemId,page,doputOnEquipMentForEquip);
	                    		   }
	                    		   else
	                    		   {
	                    		   	    generalsItemPup(getClickObjectIndex(),_group,_layer);	              	
			                            changeMap(_layer);
	                    		   }
	                    		   
	           		       	   }
           		       	  }

           		       }
					
				},
				blit : function()
				{				
				     
					 if(isDrawUI[index] && generalDrawBg)
					 {
					 	var tempX1 = (gbox.getScreenW() - gbox.getImage("ty_an_130").width)/2;
                        var tempY1 = (gbox.getScreenH() - gbox.getImage("ty_an_130").height)/2;
					 	gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'wj_zjm_02',tile : 0,dx :tempX,dy :tempY,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
					    });
					    gbox.blitTile(gbox.getBufferContext(),
						{
							tileset : 'ty_an_130',tile : 0,dx :tempX1,dy :tempY1,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
					    });
					    gbox.drawImage('wj_zjm_03',(gbox.getImage('ty_an_130').width - gbox.getImage("wj_zjm_03").width)/2 + tempX,tempY1);
					    //////绘制战斗力
					    if(typeof(heroInfo) != "undefined")
					    {					    	
					    	gbox.drawText(heroInfo.singleForce,919,205,12);
					    }
					      
					    ////////绘制基本属性
                        if(generalsChoiceMode == 0)
                        {
                        	gbox.drawImage("wj_zjm_29",386,346);
						    var backX = 616 + (84 - 65)/2;
						    var backY = 436 + (26 - 20)/2;
						    gbox.drawImage("ty_an_10",backX,backY);
						    if(((624 < touchMoveX) && (touchMoveX < 707)) && ((439 < touchMoveY) && (touchMoveY < 464)))
						    {
						    	gbox.drawImage("ty_an_09",backX,backY);
						    }
						    var rW = gbox.getImage('ty_an_09').width;
							var strW = gbox.getTextWidth("确认加点",14);
						    var cntX = backX + (rW - strW)/2 - 1;
						    gbox.drawText("确认加点",cntX,445,10);
						    gbox.drawImage("ty_an_08",718,backY);
							if(((717 < touchMoveX) && (touchMoveX < 768)) && ((438 < touchMoveY) && (touchMoveY < 461)))
						    {
						    	gbox.drawImage("ty_an_06",718,backY);

						    }
						    var rW = gbox.getImage('ty_an_06').width;
							var strW = gbox.getTextWidth("洗髓",14);
							var cntX = 719 + (rW - strW)/2;
							gbox.drawText("洗髓",cntX,445,10);
							gbox.drawImage("ty_an_08",567,532);	
							gbox.drawImage("ty_an_08",771,532);	
							if(((566 < touchMoveX) && (touchMoveX < 615)) && ((532 < touchMoveY) && (touchMoveY < 555)))
						    {
						    	gbox.drawImage("ty_an_06",567,532);						    	
						    }
						    if(((771 < touchMoveX) && (touchMoveX < 821)) && ((530 < touchMoveY) && (touchMoveY < 555)))
						    {
						    	gbox.drawImage("ty_an_06",771,532);	
						    	
						    }
						    var rW = gbox.getImage('ty_an_06').width;
							var strW = gbox.getTextWidth("恢复",14);
							var cntX = 566 + (rW - strW)/2;
							gbox.drawText("恢复",cntX,538,10);
						    var rW = gbox.getImage('ty_an_06').width;
							var strW = gbox.getTextWidth("恢复",14);
							var cntX = 771 + (rW - strW)/2;
						    gbox.drawText("恢复",cntX,538,10);
						 	if(heroInfo!= "undefined" && drawInfo && heroInfo!= "" && heroInfo!= null)
					        {

							////////////////////////////////////////////////////////////////////////////基础属性绘制
							gbox.drawText(heroInfo.intHeroForce + (heroInfo.intForceAdd == 0 ? "":("(" + "+" +heroInfo.intForceAdd + ")")),496,390,7);
							gbox.drawText(heroInfo.intIntelligence + (heroInfo.intIntelligenceAdd == 0 ? "":("(" + "+" +heroInfo.intIntelligenceAdd + ")")),669,390,7);
                            gbox.drawText(heroInfo.intAgility + (heroInfo.intAgilityAdd == 0 ? "":("(" + "+" +heroInfo.intAgilityAdd + ")")),496,418,7);
                            gbox.drawText(heroInfo.physique + (heroInfo.physiqueAdd == 0 ? "":("(" + "+" +heroInfo.physiqueAdd + ")")),669,418,7);
                            gbox.drawText(heroInfo.heroPoint,496,446,7);
							///////////////////////////////////////////////////////////////////////////////////综合属性绘制
							gbox.drawText(heroInfo.intAttack,465,513,7);
                            gbox.drawText(heroInfo.intDefence,667,513,7);
                            gbox.drawText(heroInfo.intCurrentHp + "/" + heroInfo.intHp,465,540,7);
                            gbox.drawText(heroInfo.intCurrentMp + "/" + heroInfo.intMp,667,540,7);
							gbox.drawText(heroInfo.intCriticalStrike,465,565,7);
							gbox.drawText(heroInfo.intHit,667,565,7);
							gbox.drawText(heroInfo.intMiss,465,591,7);
							gbox.drawText(heroInfo.commandNum,667,591,7);
												
					    }
                        }
                        /////////////////////
                        //////////绘制技能属性
                        if(generalsChoiceMode == 1)
                        {
                        	 gbox.drawImage("wj_zjm_57",386,346);
                        	 for(var a =0; a<4; a++)
                        	   for(var b=0; b<2; b++)
                        	   {
	                        	 	if(heroSkill[b + a*2]!= "undefined" && heroSkill[b + a*2]!= "" && heroSkill[b + a*2]!= null)
	                        	 	{
	                        	 		gbox.drawImage(heroSkill[b + a*2].icon,421 + b*208,376 + a*61);
	                        	 		gbox.drawString(heroSkill[b + a*2].name,487 + b*211,395 + a*59,'#ffffff',8);
	                        	 	}
                        	   }                        	 
                        	 var lenSkill = 0;//Math.floor(heroSkill.length/2);
                        	 if(Math.floor(heroSkill.length%2) == 1)
                        	 {
                        	 	lenSkill = Math.floor(heroSkill.length/2) + 1;
                        	 }
                        	 else
                        	 {
                        	 	lenSkill = Math.floor(heroSkill.length/2);
                        	 }
                        	 for(var a =0; a<lenSkill; a++)
                        	 {
                        	   for(var b=0; b<2; b++)
                        	   {
                        	   	   if((((418 + (b*215)) < touchMoveX) && ((touchMoveX ) < (466 + (b*215)))) && (((373 + a*61) < touchMoveY) && (touchMoveY < (423 + a*61))))
		                        	 {
		                        	 	if(typeof(heroSkill[b+a*2]) != "undefined" && heroSkill[b+a*2] != "")
		                        	 	{
		                        	 		var mouseY = 0;
										    var tempH = tooltip.computSkill(gbox.getBufferContext(),heroSkill[b+a*2].toolTipInfo).height;
										    if((gbox.getScreenH() - touchMoveY) < tempH)	
										    {
										    	mouseY = gbox.getScreenH() - tempH;
										    }
										    else
										    {
										    	mouseY = touchMoveY;
										    }
			                        	 	tooltip.drawSkill(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,mouseY,heroSkill[b+a*2].toolTipInfo);
		                        	 	}		                        	 	
		                        	 }
                        	   }
                        	 }
                        }
                        /////////////////////
                        //绘制武将名称等属性
                        if(heroInfo!= "undefined" && drawInfo && heroInfo!= "" && heroInfo!= null)
                        {
                        	gbox.drawImage(heroInfo.heroIcon,408,168);
                        	if(heroInfo.heroType == 1)
                        	{
                        		gbox.drawImage("wj_zjm_81",407,166);
                        	}
							if(heroInfo.heroType == 2)
                        	{
                        		gbox.drawImage("wj_zjm_80",407,166);
                        	}
                        	if(heroInfo.heroType == 3)
                        	{
                        		gbox.drawImage("wj_zjm_79",407,166);
                        	}

                        	gbox.drawText(heroInfo.heroName,580,175,10,heroInfo.quality);
                            gbox.drawText(heroInfo.level,580,202,10);
                            gbox.drawText(heroInfo.exp + "/" + "" + heroInfo.heroNeedExp,580,228,10);
							gbox.drawText(heroInfo.gift,580,255,10);
							gbox.drawText(heroInfo.heroSoulName,580,280,10);
							if(heroInfo.heroTitle == null)
							     gbox.drawText("无",580,304,10);
								else
								 gbox.drawText( heroInfo.heroTitle,580,304,10);
                        }
						gbox.drawImage('ty_an_10',1062,372);
					    if(((1069 < touchMoveX) && (touchMoveX < 1152)) && ((383 < touchMoveY) && (touchMoveY < 411)))
					    {
					    	gbox.drawImage('ty_an_09',1062,372);
					    }
					    var rW = gbox.getImage('ty_an_09').width;
						var strW = gbox.getTextWidth("一键卸装",14);
						var cntX = 1062 + (rW - strW)/2 - 1;
						gbox.drawText("一键卸装",cntX,379,10);
						if(((exitButtonCoordinate5.x < touchMoveX) && (touchMoveX < exitButtonCoordinate5.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate5.y < touchMoveY) && (touchMoveY < exitButtonCoordinate5.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate5.x,exitButtonCoordinate5.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate5.x,exitButtonCoordinate5.y);	
						   }
						//绘制武将页卡
						gbox.drawImage('wj_zjm_08',415,346);
					    gbox.drawImage('wj_zjm_10',467,346);					   
					    if(generalsChoiceMode)
					    {
					    	gbox.drawImage('wj_zjm_09',467,344);
					    	
					    }
					    else
					    {
					    	gbox.drawImage('wj_zjm_07',414,344);
					    }
					    gbox.drawImage('ty_an_10',419,316);
					    if(((418 < touchMoveX) && (touchMoveX < 502)) && ((317 < touchMoveY) && (touchMoveY < 341)))
					    {
					    	gbox.drawImage('ty_an_09',419,316);
					    }
                        var rW = gbox.getImage('ty_an_09').width;
						var strW = gbox.getTextWidth("武将放逐",14);
						var cntX = 419 + (rW - strW)/2;
						gbox.drawText("武将放逐",cntX, 322,10);
                        gbox.drawImage('ty_an_08',728,167);
						if(((727 < touchMoveX) && (touchMoveX < 776)) && ((167 < touchMoveY) && (touchMoveY < 193)))
					    {
					    	gbox.drawImage('ty_an_06',728,167);
					    	
					    }
					    var rW = gbox.getImage('ty_an_06').width;
						var strW = gbox.getTextWidth("改名",14);
						var cntX = 728 + (rW - strW)/2;
                        gbox.drawText("改名",cntX, 173,10);
                        gbox.drawImage('ty_an_08',728,193);
						if(((727 < touchMoveX) && (touchMoveX < 776)) && ((197 < touchMoveY) && (touchMoveY < 219)))
					    {
					    	gbox.drawImage('ty_an_06',728,193);
					    	
					    }
                        var rW = gbox.getImage('ty_an_06').width;
						var strW = gbox.getTextWidth("升级",14);
						var cntX = 728 + (rW - strW)/2;
				        gbox.drawText("升级",cntX, 200,10);
						
						gbox.drawImage('ty_an_08',728,245);	
						if(((727 < touchMoveX) && (touchMoveX < 777)) && ((244 < touchMoveY) && (touchMoveY < 269)))
					    {
					    	gbox.drawImage('ty_an_06',728,245);					    	
					    }
					    gbox.drawImage('ty_an_08',728,219);
						if(((727 < touchMoveX) && (touchMoveX < 777)) && ((219 < touchMoveY) && (touchMoveY < 242)))
					    {
					    	gbox.drawImage('ty_an_06',728,219);		
					    }
					    var rW = gbox.getImage('ty_an_06').width;
						var strW = gbox.getTextWidth("增加",14);
						var cntX = 728 + (rW - strW)/2;
				        gbox.drawText("增加",cntX, 225,10);
				        
						var rW = gbox.getImage('ty_an_06').width;
				        var strW = gbox.getTextWidth("提升",14);
				        var cntX = 728 + (rW - strW)/2;
					    gbox.drawText("提升",cntX, 251,10);
					    gbox.drawImage('ty_an_08',728,271);
						if(((727 < touchMoveX) && (touchMoveX < 777)) && ((274 < touchMoveY) && (touchMoveY < 298)))
					    {
					    	gbox.drawImage('ty_an_06',728,271);
					    	
					    }
					    var rW = gbox.getImage('ty_an_06').width;
						var strW = gbox.getTextWidth("查看",14);
						var cntX = 728 + (rW - strW)/2;
						gbox.drawText("查看",cntX, 278,10);
					    for(var i = 0 ; i<4 ; i++)
					      for(var b = 0 ; b<7; b++)
					      {
					      	    gbox.drawImage('ty_an_128',894 + b*gbox.getImage("ty_an_128").width,450 + i*gbox.getImage("ty_an_128").height);
						    	gbox.drawImage('ty_an_129',roundX,roundY);
					      }
					    
					    if(generalDrawBg)
					    {
					       gbox.drawText(page + "/" + pages,1014, 599,4);					       				       
						   var len = Math.floor(generalsArray.length/7);
						   for(var a =0; a<len; a++)
							  for(var b =0; b<7; b++)
							  {
							  	try
							  	{
							  		gbox.blitTile(gbox.getBufferContext(),
									 {
										tileset : "" + generalsArray[b + a*7].item.itemIcon,tile : 0,dx :897 + (b*36),dy :453 + (a*36),fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									 });
									 var drawColor;
									 switch(generalsArray[b + a*7].toolTipInfo.quality)
									  	{											
												case 1:
													drawColor = '#FFFFFF';
												break;
												case 2:
													drawColor = '#08cc1a';
												break;
												case 3:
													drawColor = '#006cff';
												break;
												case 4:
													drawColor = '#dc00df';
												break;
												case 5:
													drawColor = '#e09900';
												break;
												case 6:
													drawColor = '#ff0000';
												break;
										}	 
									 var rW = gbox.getImage(generalsArray[b + a*7].item.itemIcon).width;
									 var rH = gbox.getImage(generalsArray[b + a*7].item.itemIcon).height;					
									 gbox.strokeRect(gbox.getBufferContext(),{x:897 + (b*36) + 1,y:453 + (a*36) + 1,w:rW - 3,h:rH -3,
						             globalAlpha:.4,color:drawColor});						            
									
							  	}
							  	catch(e)
						   	    {
						   	   	   
						   	    }
 
							  }
                            for(var i =0; i<(generalsArray.length - len*7); i++)
                            {
                            	try
                            	{
                            		gbox.drawImage(generalsArray[len*7 + i].item.itemIcon,897 + (i*36),453 + (len*36));
									 var drawColor1;
									 switch(generalsArray[len*7 + i].toolTipInfo.quality)
									  	{
												case 1:
													drawColor1 = '#FFFFFF';
												break;
												case 2:
													drawColor1 = '#08cc1a';
												break;
												case 3:
													drawColor1 = '#006cff';
												break;
												case 4:
													drawColor1 = '#dc00df';
												break;
												case 5:
													drawColor1 = '#e09900';
												break;
												case 6:
													drawColor1 = '#ff0000';
												break;
										}
									var rW = gbox.getImage(generalsArray[len*7 + i].item.itemIcon).width;
									var rH = gbox.getImage(generalsArray[len*7 + i].item.itemIcon).height;
									gbox.strokeRect(gbox.getBufferContext(),{x:897 + (i*36) + 1,y:453 + (len*36) + 1,w:rW - 3,h:rH -3,
						            globalAlpha:.4,color:drawColor1});
                            	}
                            	catch(e)
						   	    {
						   	   	  
						   	    } 
                            	 
                            } 
                            gbox.drawImage("ty_an_24",1055,596);
                            gbox.drawImage("ty_an_25",984,596);
						    for(var a = 0; a<7; a++)
						    {
						    	if((((897 + a*36)< touchMoveX) && (touchMoveX < (925 + a*38))) && ((452 < touchMoveY) && (touchMoveY < 484)))
							    {
							    	if(generalsArray[a] != "undefined"&& (generalsArray.length > a ))
							    	{		
							    	    var mouseY = 0;
							    		var tempH = tooltip.computEquipment(gbox.getBufferContext(),generalsArray[a].toolTipInfo).height;
							    		if((gbox.getScreenH() - touchMoveY) < tempH)	
							    		{
							    			mouseY = gbox.getScreenH() - tempH;
							    		}
							    		else
									    {
									    	mouseY = touchMoveY;
									    }
							    		tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,mouseY,generalsArray[a].toolTipInfo);	    						  	    							
							    	}
							    	
							    }  
						    } 
						    for(var a = 0; a<7; a++)
						    {
						    	if((((897 + a*36)< touchMoveX) && (touchMoveX < (925 + a*38))) && ((486 < touchMoveY) && (touchMoveY < 521)))
							    {
							    	if(generalsArray[a + 7] != "undefined"&& (generalsArray.length > (a +7 ) ))
							    	{
							    		var mouseY = 0;
							    		var tempH = tooltip.computEquipment(gbox.getBufferContext(),generalsArray[a + 7].toolTipInfo).height;
							    		if((gbox.getScreenH() - touchMoveY) < tempH)	
							    		{
							    			mouseY = gbox.getScreenH() - tempH;
							    		}
							    		 else
									    {
									    	mouseY = touchMoveY;
									    }
							    		tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,mouseY,generalsArray[a + 7].toolTipInfo);
							    	}
							    	
							    }  
						    }
						    for(var a = 0; a<7; a++)
						    {
						    	if((((897 + a*36)< touchMoveX) && (touchMoveX < (925 + a*38))) && ((524 < touchMoveY) && (touchMoveY < 555)))
							    {
							    	if(generalsArray[a + 14] != "undefined" && (generalsArray.length >  (a +14 ) ))
							    	{
							    		var mouseY = 0;
							    		var tempH = tooltip.computEquipment(gbox.getBufferContext(),generalsArray[a + 14].toolTipInfo).height;
							    		if((gbox.getScreenH() - touchMoveY) < tempH)	
							    		{
							    			mouseY = gbox.getScreenH() - tempH;
							    		}
							    		 else
									    {
									    	mouseY = touchMoveY;
									    }
							    		tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,mouseY,generalsArray[a + 14].toolTipInfo);
							    	}

							    }  
						    }
						    for(var a = 0; a<7; a++)
						    {
						    	if((((897 + a*36)< touchMoveX) && (touchMoveX < (925 + a*38))) && ((561 < touchMoveY) && (touchMoveY < 591)))
							    {
							    	if(generalsArray[a + 21] != "undefined"&& (generalsArray.length >  (a +21 )))
							    	{
							    		var mouseY = 0;
							    		var tempH = tooltip.computEquipment(gbox.getBufferContext(),generalsArray[a + 21].toolTipInfo).height;
							    		if((gbox.getScreenH() - touchMoveY) < tempH)	
							    		{
							    			mouseY = gbox.getScreenH() - tempH;
							    		}
							    		 else
									    {
									    	mouseY = touchMoveY;
									    }
							    		tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,mouseY,generalsArray[a + 21].toolTipInfo);
							    	}

							    }  
						    }             
					    }
					    if(drawInfo)
					    {
					    	if(typeof(weaponAtt) != "undefined" && weaponAtt != "")
					    	{					    	
							    try
							  	{
							  		gbox.blitTile(gbox.getBufferContext(),
									 {
										tileset : "" + weaponAtt.item.iconLarge,tile : 0,dx :1074,dy :284,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									 });
									 var drawColor;
                                     switch(weaponAtt.toolTipInfo.quality)
									  	{
												case 1:
													drawColor = '#FFFFFF';
												break;
												case 2:
													drawColor = '#08cc1a';
												break;
												case 3:
													drawColor = '#006cff';
												break;
												case 4:
													drawColor = '#dc00df';
												break;
												case 5:
													drawColor = '#e09900';
												break;
												case 6:
													drawColor = '#ff0000';
												break;
										}	 
									 var rW = gbox.getImage(weaponAtt.item.iconLarge).width;
									 var rH = gbox.getImage(weaponAtt.item.iconLarge).height;					
									 gbox.strokeRect(gbox.getBufferContext(),{x:1074 + 1,y:284 + 1,w:rW - 3,h:rH -3,
						             globalAlpha:.4,color:drawColor});
						             
							  	}
							  	catch(e)
						   	    {
						   	   	    //gbox.drawString("武器",1080,277,"#FFC961",10);
						   	    } 						   	
					    	}
					    	if(typeof(headpiece) != "undefined" && headpiece != "")
					    	{
							    try
							  	{
							  		 gbox.drawImage(headpiece.item.iconLarge,1004,188);
									 var drawColor;
                                     switch(headpiece.toolTipInfo.quality)
									  	{
												case 1:
													drawColor = '#FFFFFF';
												break;
												case 2:
													drawColor = '#08cc1a';
												break;
												case 3:
													drawColor = '#006cff';
												break;
												case 4:
													drawColor = '#dc00df';
												break;
												case 5:
													drawColor = '#e09900';
												break;
												case 6:
													drawColor = '#ff0000';
												break;
										}	 
									 var rW = gbox.getImage(headpiece.item.iconLarge).width;
									 var rH = gbox.getImage(headpiece.item.iconLarge).height;					
									 gbox.strokeRect(gbox.getBufferContext(),{x:1005 + 1,y:189 + 1,w:rW - 3,h:rH -3,
						             globalAlpha:.4,color:drawColor});
						            
									
							  	}
							  	catch(e)
						   	    {
						   	   	    //gbox.drawString("头盔",998,185,"#FFC961",10);
						   	    } 
						
					    	}
					    	if(typeof(breastplate) != "undefined" && breastplate != "")
					    	{
							    try
							  	{
							  		gbox.blitTile(gbox.getBufferContext(),
									 {
										tileset : "" + breastplate.item.iconLarge,tile : 0,dx :1004,dy :248,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									 });
									 var drawColor;
                                     switch(breastplate.toolTipInfo.quality)
									  	{
												case 1:
													drawColor = '#FFFFFF';
												break;
												case 2:
													drawColor = '#08cc1a';
												break;
												case 3:
													drawColor = '#006cff';
												break;
												case 4:
													drawColor = '#dc00df';
												break;
												case 5:
													drawColor = '#e09900';
												break;
												case 6:
													drawColor = '#ff0000';
												break;
										}	 
									 var rW = gbox.getImage(breastplate.item.iconLarge).width;
									 var rH = gbox.getImage(breastplate.item.iconLarge).height;					
									 gbox.strokeRect(gbox.getBufferContext(),{x:1005 + 1,y:249 + 1,w:rW - 3,h:rH -3,
						             globalAlpha:.4,color:drawColor});
									 
							  	}
							  	catch(e)
						   	    {
						   	   	    gbox.drawString("护甲",998,249,"#FFC961",10);
						   	    } 
					    	}
					    	if(typeof(egguard) != "undefined" && egguard != "")
					    	{
							    try
							  	{
							  		gbox.drawImage(egguard.item.iconLarge,1004,307);
									var drawColor;
                                    switch(egguard.toolTipInfo.quality)
									  	{
											case 1:
													drawColor = '#FFFFFF';
												break;
												case 2:
													drawColor = '#08cc1a';
												break;
												case 3:
													drawColor = '#006cff';
												break;
												case 4:
													drawColor = '#dc00df';
												break;
												case 5:
													drawColor = '#e09900';
												break;
												case 6:
													drawColor = '#ff0000';
												break;
										}	 
									 var rW = gbox.getImage(egguard.item.iconLarge).width;
									 var rH = gbox.getImage(egguard.item.iconLarge).height;					
									 gbox.strokeRect(gbox.getBufferContext(),{x:1004 + 1,y:307 + 1,w:rW - 3,h:rH -3,
						             globalAlpha:.4,color:drawColor});
									
							  	}
							  	catch(e)
						   	    {
						   	   	   gbox.drawString("护腿",998,310,"#FFC961",10);
						   	    } 
					    	}
					    	if(typeof(boots) != "undefined" && boots != "")
					    	{
							    try
							  	{
							  		gbox.blitTile(gbox.getBufferContext(),
									 {
										tileset : "" + boots.item.iconLarge,tile : 0,dx :1004,dy :369,fliph : this.fliph,flipv : this.flipv,camera : this.camera,alpha : 1.0
									 });
									var drawColor;
                                    switch(boots.toolTipInfo.quality)
									  	{
												case 1:
													drawColor = '#FFFFFF';
												break;
												case 2:
													drawColor = '#08cc1a';
												break;
												case 3:
													drawColor = '#006cff';
												break;
												case 4:
													drawColor = '#dc00df';
												break;
												case 5:
													drawColor = '#e09900';
												break;
												case 6:
													drawColor = '#ff0000';
												break;
										}	 
									 var rW = gbox.getImage(boots.item.iconLarge).width;
									 var rH = gbox.getImage(boots.item.iconLarge).height;					
									 gbox.strokeRect(gbox.getBufferContext(),{x:1004 + 1,y:369 + 1,w:rW - 3,h:rH -3,
						             globalAlpha:.4,color:drawColor});								
							  	}
							  	catch(e)
						   	    {
						   	   	   gbox.drawString("战靴",998,371,"#FFC961",10);
						   	    } 
					    	}
					    	if(typeof(cuff) != "undefined" && cuff != "")
					    	{
							    try
							  	{
							  		gbox.drawImage(cuff.item.iconLarge,934,285);
									var drawColor;
                                    switch(cuff.toolTipInfo.quality)
									  	{
												case 1:
													drawColor = '#FFFFFF';
												break;
												case 2:
													drawColor = '#08cc1a';
												break;
												case 3:
													drawColor = '#006cff';
												break;
												case 4:
													drawColor = '#dc00df';
												break;
												case 5:
													drawColor = '#e09900';
												break;
												case 6:
													drawColor = '#ff0000';
												break;
										}	 
									 var rW = gbox.getImage(cuff.item.iconLarge).width;
									 var rH = gbox.getImage(cuff.item.iconLarge).height;					
									 gbox.strokeRect(gbox.getBufferContext(),{x:933 + 1,y:286 + 1,w:rW - 3,h:rH -3,
						             globalAlpha:.4,color:drawColor});
									 
							  	}
							  	catch(e)
						   	    {
						   	   	   gbox.drawString("护腕",912,278,"#FFC961",10);
						   	    } 
					    	}
					    	//装备属性TOOLTIP
					    	if(typeof(weaponAtt) != "undefined" && weaponAtt != "")
					    	{
					    		if(((1071 < touchMoveX) && (touchMoveX < 1105)) && ((281 < touchMoveY) && (touchMoveY < 318)))
									 {
										tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,weaponAtt.toolTipInfo);
									 }
					    	}
					    	if(typeof(headpiece) != "undefined" && headpiece != "")
						    {
						       if(((1000 < touchMoveX) && (touchMoveX < 1036)) && ((185 < touchMoveY) && (touchMoveY < 221)))
							   {
								  tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,headpiece.toolTipInfo);
							    }
						    }	
						    if(typeof(breastplate) != "undefined" && breastplate != "")
						    {
						    	if(((1000 < touchMoveX) && (touchMoveX < 1036)) && ((245 < touchMoveY) && (touchMoveY < 281)))
								{
								   tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,breastplate.toolTipInfo);
								}
						    }
						    if(typeof(egguard) != "undefined" && egguard != "")
						    {
						    	 if(((1000 < touchMoveX) && (touchMoveX < 1036)) && ((304 < touchMoveY) && (touchMoveY < 339)))
								 {
									tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,egguard.toolTipInfo);
								 }
						    }
						    if(typeof(boots) != "undefined" && boots != "")
						    {
						    	 if(((1000 < touchMoveX) && (touchMoveX < 1036)) && ((365 < touchMoveY) && (touchMoveY < 401)))
								{
									tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,boots.toolTipInfo);
								}
						    }
						    if(typeof(cuff) != "undefined" && cuff != "")
						    {
						    	if(((930 < touchMoveX) && (touchMoveX < 965)) && ((280 < touchMoveY) && (touchMoveY < 317)))
								 {
									tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),touchMoveX,touchMoveY,cuff.toolTipInfo);
								 }
						    }
					    }
					  
				     }
				}
		 });
		 		 
};
/*
 * 提升根骨界面
 */
function promoteUI(index,_group,_layer)
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isShowPromoteUI = true;
	isShowAuctionPorp = false;
	
	
	var pW = gbox.getImage('wj_zjm_58').width;
	var pH = gbox.getImage('wj_zjm_58').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;

	gbox.addObject(
	{ 
		id : 'promote1',
		group : 'levelMenu_3',
		tileset : 'wj_zjm_58',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		initialize : function()
		{
			
		},
		first : function() 
		{	
					
		},
		myclick : function()
		{ 
			isShowAuctionPorp = false;
			
            if(((728 < lastTouchMoveX) && (lastTouchMoveX < 813)) && ((427 < lastTouchMoveY) && (lastTouchMoveY < 454)))
			{             
				Hero.addGift(heroInfo.userHeroId,doupHeroGift);
			}
			if(((795 < lastTouchMoveX) && (lastTouchMoveX < 817)) && ((284 < lastTouchMoveY) && (lastTouchMoveY < 298)))
			{	    
				exit(getClickObjectIndex());
				isShowPromoteUI = false;
					   
			}
			else
			{
				  promoteUI(getClickObjectIndex(),_group,_layer);	
			      changeMap(_layer); 
			}


		},
		blit : function()
		{
			if(isDrawUI[index] && isShowPromoteUI)
			{			
				var dialogX = pX;
				var dialogY = pY;
				var dialogW = gbox.getImage('wj_zjm_58').width;
				var dialogH = gbox.getImage('wj_zjm_58').height;				
				gbox.drawImage('wj_zjm_58',dialogX, dialogY);
				if((((801) < touchMoveX) && (touchMoveX < (816))) && (((281) < touchMoveY) && (touchMoveY < (297))))
				{						   	   
					gbox.drawImage('ty_an_17',803, 284);
				}
				else
				{
					gbox.drawImage('ty_an_18',803, 284);
				}
				if(((touchMoveX > 624) && (touchMoveX < 708)) && ((touchMoveY > 426) && (touchMoveY<454)))
				{	    
					gbox.drawImage('ty_an_09',625, 427);	   
				}
				var rW = gbox.getImage('ty_an_09').width;
				var strW = gbox.getTextWidth("商  城",14);
				var cntX = 625 + (rW - strW)/2;
				gbox.drawText("商  城",cntX, 434,10);
				if(((touchMoveX > 728) && (touchMoveX < 813)) && ((touchMoveY > 426) && (touchMoveY<454)))
			    {
                    gbox.drawImage('ty_an_09',730, 427);
			    }
			    var rW = gbox.getImage('ty_an_09').width;
				var strW = gbox.getTextWidth("提  升",14);
				var cntX = 730 + (rW - strW)/2;
				gbox.drawText("提  升",cntX, 434,10);
				if(typeof(promoteInfo) != "undefined")
				{				 
					 gbox.drawText(promoteInfo.heroName,692, 310,10);
					 gbox.drawText(promoteInfo.gift,697, 335,10);
					 gbox.drawText(promoteInfo.needItem,697, 359,10); 
					 gbox.drawText(promoteInfo.amount,697, 383,10);   	
					 gbox.drawText(promoteInfo.successRate,697, 406,10); 
				}
				 
							    		   
			}
		}
	 });
}
/*
 * 武将改名界面
 */
function afreshName(index,dValue,txt,bntTxt,offsetX,offsetY,_group,_layer)
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isShowAuctionPorp = true;
	var pW = gbox.getImage('wj_zjm_68').width;
	var pH = gbox.getImage('wj_zjm_68').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;

	gbox.addObject(
	{ 
		id : 'afreshName1',
		group : 'levelMenu_3',
		tileset : 'wj_zjm_68',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		initialize : function()
		{
			if(afreshNameDiv == null && !gbox._isIndwellDiv("afreshNameDiv","input"))
			{
				var pnX = (pX+(pW - 40)/2) + offsetX - 36;
				var pnY = (pY+(pH - 20)/2) +  offsetY;
				afreshNameDiv = addDivWindowBg(pnX,pnY);
				afreshNameDiv.id = 'afreshNameDiv';
				document.body.appendChild(afreshNameDiv);
	            afreshNameText = document.createElement("input");
	            afreshNameText.style.id = 'afreshNameText';
	            afreshNameText.style.backgroundColor = '#000000';
	            afreshNameText.style.width = '100px';
	            afreshNameText.style.color = '#ffffff';
	            afreshNameText.value = dValue;
	            afreshNameDiv.appendChild(afreshNameText);
			}
		},
		first : function() 
		{			
			/*
			 * 控制浏览器大小变化时DIV输入框自动适配屏幕
			 */
			adaptiveDiv(afreshNameDiv,"afreshNameDiv",(pX+(pW - 40)/2) + offsetX - 36);
			/*======================================================*/
		},
		myclick : function()
		{ 
			
            if(((682 < lastTouchMoveX) && (lastTouchMoveX < 767)) && ((414 < lastTouchMoveY) && (lastTouchMoveY < 439)))
            {
				    exit(getClickObjectIndex());
				    isShowAuctionPorp = false;
				    Hero.modifyHeroName(heroInfo.userHeroId,afreshNameText.value,doupdateHeroName);
				    if(afreshNameDiv != null && gbox._isIndwellDiv("afreshNameDiv","input")){
				            document.body.removeChild(afreshNameDiv);  
				            afreshNameDiv = null;  
					}
            }
            else
			{
			
				    afreshName(getClickObjectIndex(),"","修改名字",bntTxt,0,20,_group,_layer);	
					changeMap(_layer);	
			}	
		},
		blit : function()
		{
			if(isDrawUI[index] && isShowAuctionPorp)
			{
				
				var scale = bntTxt.length;
				var dialogX = pX;
				var dialogY = pY;
				var dialogW = gbox.getImage('wj_zjm_68').width;
				var dialogH = gbox.getImage('wj_zjm_68').height;
				
				gbox.drawImage('wj_zjm_68',dialogX, dialogY);
				if(((682 < touchMoveX) && (touchMoveX < 766)) && ((414 < touchMoveY) && (touchMoveY < 438)))
				{
					gbox.drawImage('ty_an_09',682, 413);
				}
				var rW = gbox.getImage('ty_an_09').width;
				var strW = gbox.getTextWidth("确定改名",14);
				var cntX = 682 + (rW - strW)/2;
				gbox.drawText("确定改名",cntX, 420,10);
    		   
			}
		}
	 });
}
/*
 * 技能页面弹出框
 * 
*/
var generalSkillFont = ["升级","遗忘","取消"];
var generalsSkillCtr = false;//控制武将技能界面弹出绘制
function skillUI(index,offsetX,offsetY,_group,_layer,id)
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	generalsSkillCtr = true;
	var pW = gbox.getImage('ty_an_95').width;
	var pH = gbox.getImage('ty_an_95').height * 3;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;

	gbox.addObject(
	{ 
		id : 'skillUI',
		group : 'levelMenu_3',
		tileset : 'ty_an_95',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [offsetX,offsetY], [offsetX + pW, offsetY], [offsetX + pW,offsetY + pH],[offsetX,offsetY + pH]],
		initialize : function()
		{
		
		},
		first : function() 
		{			
		},
		myclick : function()
		{ 
			
			 if(((offsetX < lastTouchMoveX) && (lastTouchMoveX < (offsetX +pW))) && ((offsetY < lastTouchMoveY) && (lastTouchMoveY < offsetY + 21)))
			 {
			 	Hero.upgradeHeroSkill(heroInfo.userHeroId,heroSkill[id].skillNo,doupgradeHeroSkill);
			    exit(getClickObjectIndex());
				generalsSkillCtr = false;
			 }
			 else if(((offsetX < lastTouchMoveX) && (lastTouchMoveX < (offsetX +pW))) && ((offsetY + 21 < lastTouchMoveY) && (lastTouchMoveY < offsetY + 42)))
			 {
			 	Hero.forgetHeroSkill(heroInfo.userHeroId,heroSkill[id].skillNo,doforgetHeroSkill);
			    exit(getClickObjectIndex());
				generalsSkillCtr = false;
			 }
			 else if(((offsetX < lastTouchMoveX) && (lastTouchMoveX < (offsetX +pW))) && ((offsetY + 42 < lastTouchMoveY) && (lastTouchMoveY < offsetY + 63)))
			 {
			 	console.log("取消");
			 	exit(getClickObjectIndex());
				generalsSkillCtr = false;
			 }
			 else
			 {
			 	skillUI(index,offsetX,offsetY,_group,_layer);	
			    changeMap(_layer); 
			 }
			
		},
		blit : function()
		{
			if(isDrawUI[index]&&generalsSkillCtr)
			{			
				for(var i=0; i<3; i++)
				{
					gbox.drawImage('ty_an_95',offsetX, offsetY + gbox.getImage("ty_an_95").height*i);
					if(((offsetX < touchMoveX) && (touchMoveX < offsetX + 62)) && ((offsetY + gbox.getImage("ty_an_95").height*i < touchMoveY) && (touchMoveY < (offsetY + gbox.getImage("ty_an_95").height*i + gbox.getImage("ty_an_95").height))))
					{
						gbox.drawImage('ty_an_96',offsetX, offsetY + gbox.getImage("ty_an_95").height*i);
					}
					var fontW = gbox.getTextWidth(generalSkillFont[i],10);
				 	var dx = offsetX + (62 - fontW)/2;
					var dy = offsetY + gbox.getImage("ty_an_95").height*i + (20 - 10)/2;
					gbox.drawText(generalSkillFont[i],dx,dy,10);
				}	    		   
			}
		}
	 });
}
/*
 *  当个卸装控制
 */
var removestageItemPup = function(index,tempx,tempy,owner,num,_group,_layer)//单个卸装
{
            if(drawInfo)
			 Hero.removeEquipment(heroInfo.userHeroId,owner,page,dogetOffEquipMentForEquip);
			if(num == 2)
			{
			   headpiece = "";
			}
			else if(num == 1)
			{
				weaponAtt = "";
			}
			else if(num == 3)
			{
				breastplate = "";
			}
			else if(num == 4)
			{
				egguard = "";
			}
			else if(num == 5)
			{
				boots = "";
			}
			else if(num == 6)
			{
				cuff = "";
			}
			owner = "";
};
/*
 * 武将佩戴装备弹出窗口，当装备未非绑定状态弹出的询问窗口
 */
var generalsItemPup = function(index,_group,_layer)//使用
{   
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	pupCtr = true;
	var pW = gbox.getImage('ty_an_55').width;
	var pH = gbox.getImage('ty_an_55').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	gbox.addObject(
	{ 
		id : 'Item1',
		group : 'levelMenu_3',
		tileset : 'ty_an_55',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [pX,pY], [pX + pW, pY], [pX + pW,pY + pH],[pX,pY + pH]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{

            if(((lastTouchMoveX > 616) && (lastTouchMoveX < 668)) && ((lastTouchMoveY > 394) && (lastTouchMoveY<421)))
            {
			       exit(getClickObjectIndex());
			       pupCtr = false;
			       generalsSkillCtr = false;
			       if(drawInfo)
			         Hero.addEquipment(heroInfo.userHeroId,generalsArray[id].userItemId,page,doputOnEquipMentForEquip);
            }
            else  if(((lastTouchMoveX > 769) && (lastTouchMoveX < 818)) && ((lastTouchMoveY > 394) && (lastTouchMoveY<421)))
            {
            	 exit(getClickObjectIndex());
			     pupCtr = false;
			     generalsSkillCtr = false;
            }
            else
            {
            	generalsItem(getClickObjectIndex(),_group,_layer);
			    changeMap(_layer);	
            }
             
		},
		blit : function()
		{
			if(isDrawUI[index] && pupCtr)
			{
				var dialogX = pX;
				var dialogY = pY;
				var dialogW = gbox.getImage('ty_an_55').width;
				var dialogH = gbox.getImage('ty_an_55').height;				
				gbox.drawImage('ty_an_55',dialogX, dialogY);
				var fontW = gbox.getTextWidth("使用后绑定该装备",14);
				var dx = dialogX + (274 - fontW)/2;
				var dy = dialogY + (119 - 14)/2;
				gbox.drawText("使用后绑定该装备",dx,dy,10);
				//ty_an_08
				gbox.drawImage('ty_an_08',617, 395);
				if(((touchMoveX > 616) && (touchMoveX < 668)) && ((touchMoveY > 394) && (touchMoveY<421)))
				{
					gbox.drawImage('ty_an_06',617, 395);
				}
				gbox.drawImage('ty_an_08',768, 395);
				if(((touchMoveX > 769) && (touchMoveX < 818)) && ((touchMoveY > 394) && (touchMoveY<421)))
				{
					gbox.drawImage('ty_an_06',768, 395);
				}
				var rW = gbox.getImage('ty_an_06').width;
				var strW = gbox.getTextWidth("确定",14);
				var cntX = 617 + (rW - strW)/2;
				gbox.drawText("确定",cntX,402,10);
				var rW = gbox.getImage('ty_an_06').width;
				var strW = gbox.getTextWidth("取消",14);
				var cntX = 769 + (rW - strW)/2;
				gbox.drawText("取消",cntX,402,10);
			}

		}		
	 });
}

var wjList = function(index,_group,_layer)//武将列表
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'wjList',
		group : 'levelMenu_2',
		tileset : 'wj_zjm_02',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [242,170], [366,167], [366,611],[228,611]],
		initialize : function()
		{

			
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			isShowAuctionPorp=false;
			if(wjId == -1)
			{
				drawInfo = false;
			}
			else
			{
			    drawInfo = true;
			}
			isShowAuctionPorp = true;
			if(afreshNameDiv != null && gbox._isIndwellDiv("afreshNameDiv","input")){
				            document.body.removeChild(afreshNameDiv);  
				            afreshNameDiv = null;  
			}
			generalsItem(getClickObjectIndex(),_group,_layer);
			changeMap(_layer);
		},
		blit : function()
		{
			if(isDrawUI[index] && generalDrawBg)
			{
				if(wjListCtr)
				{
				   wujiangList.paint( wj_OffsetY, wj_BeginSlip, wj_Time );
				}
			}
		}
		
		

		
	 });
}

/**
 * 根据武将状态获取武将状态描述
 * @param status Number
 */
var getGeneralStatus = function(status){
	//武将状态,0空闲,1出征,2修炼
	var statusText;
	switch (status) {
		case 0:
			statusText = '空闲';
			break;
		case 1:
			statusText = '出征';
			break;
		case 2:
			statusText = '修炼';
			break;
		default:
			statusText = '空闲';
			break;
	}
	return statusText;
};