var socialDraw = true;
var socialFriendPage = true;
var sociaEnemyPage = false;
var findFriendDiv = null;
var findFriendValue;
var addFriendDiv = null;
var addFriendValue;
var messageType;//0：添加好友 1：查找好友
var messageDraw = false; //申请好友控制
var EnemyDefault = new Array();
var addPort = -1;//0是从君主加入好友，1是从社交加入好友
function doCharById(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	var temp = data;
	kingData = undefined;
	kingData = {
		  
			    militaryStrength:temp.militaryStrength,//武力
			    countryName:temp.countryName,//国家名称
			    abilityPoint:temp.abilityPoint,//潜能点
			    coordinate:temp.coordinate,//联盟
			    internalAffairs:temp.internalAffairs,//谋略
			    image:temp.image,//头像ICON
			    experienceLimit:temp.experienceLimit,//经验上限
			    cityExperienceLimit:temp.cityExperienceLimit,//城市经验上限
			    vipLevel:temp.vipLevel,//VIP等级
			    cityLevel:temp.cityLevel,//城市等级
			    allianceName:temp.allianceName,//武魂名字
			    level:temp.level,//君主等级
			    description:temp.description,//君主描述
			    name:temp.name,//君主名字
			    reputation:temp.reputation,//声望
			    cityExperience:temp.cityExperience,//城市经验
			    experience:temp.experience,//君主经验
			    ranking: temp.ranking,//排名
               };
	
	if(typeof(kingData) != "undefined"){
		kingInfo = new Array(new Array());
		kingInfo = [
		            ["" + kingData.name,"" + kingData.level],
		            ["" + kingData.cityLevel,"" + kingData.countryName],
		            ["" + kingData.allianceName,"" + kingData.ranking],
		            ["" + kingData.coordinate,"" + kingData.cityExperience]
		];
	}
	
	//SocialInfo(getClickObjectIndex(),com_group,com_layer);
	//changeMap(com_layer);
}
/*
 * 查找仇人
 */
function doSelectEnemy(data)
{
	if(typeof(data.error) != "undefined")
	{
		var message = data.error;
		var errorId = data.errorType;
		messageAlert(getClickObjectIndex(),message,errorId,com_group,com_layer);
    	changeMap(com_layer);	
		return;
	}
	enemyPage = data.page;
	enemyPages = data.pages;
	EnemyDefault.splice(0,EnemyDefault.length);	
	for(var i =0; i<data.friends.length; i++)
		{
				if(data.friends[i].selected)
				{
					EnemyDefault[i] = 
					{		
						friendId : data.friends[i].friendId,//君主ID		
						friendCountry : data.friends[i].friendCountry,//国家名称
						friendLeague : data.friends[i].friendLeague,//联盟
						friendLevel : data.friends[i].friendLevel,//等级
						friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
						friendName : data.friends[i].friendName,//君主名称
						id : data.friends[i].id,//id
						lineTime : data.friends[i].lineTime,//路程
						loginStatus : data.friends[i].loginStatus,//上线状态
						selected : data.friends[i].selected,//搜索ID
						color: "#0000ff"
				    };
				}
				else
				{
						EnemyDefault[i] = 
						{
							friendId : data.friends[i].friendId,//君主ID
							friendCountry : data.friends[i].friendCountry,//国家名称
							friendLeague : data.friends[i].friendLeague,//联盟
							friendLevel : data.friends[i].friendLevel,//等级
							friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
							friendName : data.friends[i].friendName,//君主名称
							id : data.friends[i].id,//id
							lineTime : data.friends[i].lineTime,//路程
							loginStatus : data.friends[i].loginStatus,//上线状态
							selected : data.friends[i].selected,//搜索ID
							color: "#000000"
						};
				}		
	 }
	 findFriendValue.value = "";
	 social(getClickObjectIndex(),com_group,com_layer);	              	
	 changeMap(com_layer);
}
/*
 * 该玩家是您的好友,确定添加仇人会将该玩家从好友列表中删除.
 * 弹出界面确定键按钮回调
 */
function doaddEnemyForOk(data)
{
	if(typeof(data.error) != "undefined")
	{
		var message = data.error;
		var errorId = data.errorType;
		messageAlert(getClickObjectIndex(),message,errorId,com_group,com_layer);
    	changeMap(com_layer);	
		return;
	}
	enemyPage = data.enemy.page;
	enemyPages = data.enemy.pages;
	EnemyDefault.splice(0,EnemyDefault.length);
	if(data.enemy.friends.length > 0)
	{
		for(var i =0; i<data.enemy.friends.length; i++)
		{
			EnemyDefault[i] = {
				friendId : data.enemy.friends[i].friendId,//君主ID
				friendCountry : data.enemy.friends[i].friendCountry,//国家名称
				friendLeague : data.enemy.friends[i].friendLeague,//联盟
				friendLevel : data.enemy.friends[i].friendLevel,//等级
				friendMaincityLevel : data.enemy.friends[i].friendMaincityLevel,//城池等级
				friendName : data.enemy.friends[i].friendName,//君主名称
				id : data.enemy.friends[i].id,//id
				lineTime : data.enemy.friends[i].lineTime,//路程
				loginStatus : data.enemy.friends[i].loginStatus,//上线状态
				selected : data.enemy.friends[i].selected,//搜索ID
				color: "#000000"
			};
		}	
	 }
	messageAlert(getClickObjectIndex(),getClickObjectIndex(),data.message,3,com_group,com_layer);
    changeMap(com_layer);
}
/*
 * "该玩家为您的仇人,点击确定添加为好友,同时将在仇人列表中删除该玩家"
 * 弹出界面确定键按钮回调
 */
function doaddFriendListForOk(data)
{
	if(typeof(data.error) != "undefined")
	{
		var message = data.error;
		var errorId = data.errorType;
		messageAlert(getClickObjectIndex(),message,errorId,com_group,com_layer);
    	changeMap(com_layer);	
		return;
	}
	
	messageAlert(getClickObjectIndex(),data.message,3,com_group,com_layer);
    changeMap(com_layer);	
}
/*
 *  查找好友
 */
function doSelectFriend(data)
{	
	if(typeof(data.error) != "undefined")
	{
		var message = data.error;
		var errorId = data.errorType;
		messageAlert(getClickObjectIndex(),message,errorId,com_group,com_layer);
    	changeMap(com_layer);	
		return;
	}
	getFriendsDefaultPage = data.page;
	getFriendsDefaultPages = data.pages;
	getFriendsDefaultArray.splice(0,getFriendsDefaultArray.length);
	if(data.friends.length > 0)
	{
		for(var i =0; i<data.friends.length; i++)
		{
             if(data.friends[i].selected)
				{
					getFriendsDefaultArray[i] = 
					{				
						friendCountry : data.friends[i].friendCountry,//国家名称
						friendLeague : data.friends[i].friendLeague,//联盟
						friendLevel : data.friends[i].friendLevel,//等级
						friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
						friendName : data.friends[i].friendName,//君主名称
						id : data.friends[i].id,//id
						lineTime : data.friends[i].lineTime,//路程
						loginStatus : data.friends[i].loginStatus,//上线状态
						selected : data.friends[i].selected,//搜索ID
						color: "#0000ff"
				    };
				}
				else
				{
						getFriendsDefaultArray[i] = 
						{
							
							friendCountry : data.friends[i].friendCountry,//国家名称
							friendLeague : data.friends[i].friendLeague,//联盟
							friendLevel : data.friends[i].friendLevel,//等级
							friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
							friendName : data.friends[i].friendName,//君主名称
							id : data.friends[i].id,//id
							lineTime : data.friends[i].lineTime,//路程
							loginStatus : data.friends[i].loginStatus,//上线状态
							selected : data.friends[i].selected,//搜索ID
							color: "#000000"
						};
				}	
		}	
	 }
	 findFriendValue.value = "";
	 console.log("com_layer = " + com_layer);
	 social(getClickObjectIndex(),com_group,com_layer);	              	
	 changeMap(com_layer);
}
/*
 * 删除好友
 */
function dodeleteFriend(data)
{
	if(typeof(data.error) != "undefined")
	{
		if(typeof(data.errorType) != "undefined" || typeof(data.userFriend) != "undefined")
		{
			getFriendsDefaultPage = data.userFriend.page;
			getFriendsDefaultPages = data.userFriend.pages;
			getFriendsDefaultArray.splice(0,getFriendsDefaultArray.length);
			if(data.friends.length > 0)
			{
				
				for(var i =0; i<data.friends.length; i++)
				{
					getFriendsDefaultArray[i] = {
						friendId : data.friends[i].friendId,//君主ID
						friendCountry : data.friends[i].friendCountry,//国家名称
						friendLeague : data.friends[i].friendLeague,//联盟
						friendLevel : data.friends[i].friendLevel,//等级
						friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
						friendName : data.friends[i].friendName,//君主名称
						id : data.friends[i].id,//id
						lineTime : data.friends[i].lineTime,//路程
						loginStatus : data.friends[i].loginStatus,//上线状态
						selected : data.friends[i].selected,//搜索ID
						color: "#000000"
					};
				}
				
			}
			social(getClickObjectIndex(),com_group,com_layer);
			changeMap(com_layer);
		}
		alert("系统提示：" + data.error);
		return;
	}
	getFriendsDefaultPage = data.page;
	getFriendsDefaultPages = data.pages;
	getFriendsDefaultArray.splice(0,getFriendsDefaultArray.length);
	if(data.friends.length > 0)
	{
		
		for(var i =0; i<data.friends.length; i++)
		{
			getFriendsDefaultArray[i] = {
				friendId : data.friends[i].friendId,//君主ID
				friendCountry : data.friends[i].friendCountry,//国家名称
				friendLeague : data.friends[i].friendLeague,//联盟
				friendLevel : data.friends[i].friendLevel,//等级
				friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
				friendName : data.friends[i].friendName,//君主名称
				id : data.friends[i].id,//id
				lineTime : data.friends[i].lineTime,//路程
				loginStatus : data.friends[i].loginStatus,//上线状态
				selected : data.friends[i].selected,//搜索ID
				color: "#000000"
			};
		}
		
	}
	social(getClickObjectIndex(),com_group,com_layer);
	changeMap(com_layer);
}
/*
 *  删除仇人
 */
function dodeleteEnemy(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	enemyPage = data.page;
	enemyPages = data.pages;
	if(data.friends.length > 0)
	{
		EnemyDefault.splice(0,EnemyDefault.length);
		for(var i =0; i<data.friends.length; i++)
		{
			EnemyDefault[i] = {
				friendId : data.friends[i].friendId,//君主ID
				friendCountry : data.friends[i].friendCountry,//国家名称
				friendLeague : data.friends[i].friendLeague,//联盟
				friendLevel : data.friends[i].friendLevel,//等级
				friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
				friendName : data.friends[i].friendName,//君主名称
				id : data.friends[i].id,//id
				lineTime : data.friends[i].lineTime,//路程
				loginStatus : data.friends[i].loginStatus,//上线状态
				selected : data.friends[i].selected,//搜索ID
				color: "#000000"
			};
		}	
	 }
}
/*
 * 仇人列表翻页
 */
function doEnemyByPage(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	enemyPage = data.page;
	enemyPages = data.pages;
	if(data.friends.length > 0)
	{
		EnemyDefault.splice(0,EnemyDefault.length);
		for(var i =0; i<data.friends.length; i++)
		{
			EnemyDefault[i] = {
				friendId : data.friends[i].friendId,//君主ID
				friendCountry : data.friends[i].friendCountry,//国家名称
				friendLeague : data.friends[i].friendLeague,//联盟
				friendLevel : data.friends[i].friendLevel,//等级
				friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
				friendName : data.friends[i].friendName,//君主名称
				id : data.friends[i].id,//id
				lineTime : data.friends[i].lineTime,//路程
				loginStatus : data.friends[i].loginStatus,//上线状态
				selected : data.friends[i].selected,//搜索ID
				color: "#000000"
			};
		}	
	 }
}
/*
 *  打开仇人默认接口
 */
var enemyPage = 1;
var ememyPages = 1;
function datagetEnemyDefault(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	enemyPage = data.page;
	enemyPages = data.pages;
	EnemyDefault.splice(0,EnemyDefault.length);
	if(data.friends.length > 0)
	{
		for(var i =0; i<data.friends.length; i++)
		{
			EnemyDefault[i] = {
				friendId : data.friends[i].friendId,//君主ID
				friendCountry : data.friends[i].friendCountry,//国家名称
				friendLeague : data.friends[i].friendLeague,//联盟
				friendLevel : data.friends[i].friendLevel,//等级
				friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
				friendName : data.friends[i].friendName,//君主名称
				id : data.friends[i].id,//id
				lineTime : data.friends[i].lineTime,//路程
				loginStatus : data.friends[i].loginStatus,//上线状态
				selected : data.friends[i].selected,//搜索ID
				color: "#000000"
			}
		}	
	 }
}
/*
 * 增加仇人
 */
function doaddEnemy(data)
{
	if(typeof(data.error) != "undefined")
	{
		var message = data.error;
		var errorId = data.errorType;
		messageType = 1;
		messageAlert(getClickObjectIndex(),message,errorId,com_group,com_layer);
    	changeMap(com_layer);
		return;
	}
	enemyPage = data.enemy.page;
	enemyPages = data.enemy.pages;
	if(data.enemy.friends.length > 0)
	{
		EnemyDefault.splice(0,EnemyDefault.length);
		for(var i =0; i<data.enemy.friends.length; i++)
		{
			EnemyDefault[i] = {
				friendId : data.enemy.friends[i].friendId,//君主ID
				friendCountry : data.enemy.friends[i].friendCountry,//国家名称
				friendLeague : data.enemy.friends[i].friendLeague,//联盟
				friendLevel : data.enemy.friends[i].friendLevel,//等级
				friendMaincityLevel : data.enemy.friends[i].friendMaincityLevel,//城池等级
				friendName : data.enemy.friends[i].friendName,//君主名称
				id : data.enemy.friends[i].id,//id
				lineTime : data.enemy.friends[i].lineTime,//路程
				loginStatus : data.enemy.friends[i].loginStatus,//上线状态
				selected : data.enemy.friends[i].selected,//搜索ID
				color: "#000000"
			};
		}	
	 }
	social(getClickObjectIndex(),com_group,com_layer);
	changeMap(com_layer);
}
/*
 *  好友列表回调翻页
 */
function dogetFriendsByPage(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	getFriendsDefaultPage = data.page;
	getFriendsDefaultPages = data.pages;
	if(data.friends.length > 0)
	{
		getFriendsDefaultArray.splice(0,getFriendsDefaultArray.length);
		for(var i =0; i<data.friends.length; i++)
		{
			getFriendsDefaultArray[i] = {
				friendId : data.friends[i].friendId,//君主ID
				friendCountry : data.friends[i].friendCountry,//国家名称
				friendLeague : data.friends[i].friendLeague,//联盟
				friendLevel : data.friends[i].friendLevel,//等级
				friendMaincityLevel : data.friends[i].friendMaincityLevel,//城池等级
				friendName : data.friends[i].friendName,//君主名称
				id : data.friends[i].id,//id
				lineTime : data.friends[i].lineTime,//路程
				loginStatus : data.friends[i].loginStatus,//上线状态
				selected : data.friends[i].selected,//搜索ID
				color: "#000000"
			};
		}
		
	}
	social(getClickObjectIndex(),com_group,com_layer);
	changeMap(com_layer);
}
/*
 *  拒绝好友申请回调
 */
function dorefuseFriend(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	friendListArray.splice(0,friendListArray.length);
	if(data.friendList.length > 0)
	{
			for(var i = 0; i<data.friendList.length; i++)
			{
				friendListArray[i] = {
					id : data.friendList[i].id,
					name : data.friendList[i].name + "正在向您申请好友"
				};
				
			}
	}
    friendListPage = data.page;
    friendListPages = data.pages;
	friendList(getClickObjectIndex(),com_group,com_layer);	
	changeMap(com_layer); 
}
/*
 *  好友列表翻页
 */
function dogetFriendListByPage(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	friendListArray.splice(0,friendListArray.length);
	if(data.friendList.length > 0)
	{
			for(var i = 0; i<data.friendList.length; i++)
			{
				friendListArray[i] = {
					id : data.friendList[i].id,
					name : data.friendList[i].name + "正在向您申请好友"
				};
				
			}
	}
    friendListPage = data.page;
    friendListPages = data.pages;
	friendList(getClickObjectIndex(),com_group,com_layer);	
	changeMap(com_layer); 
}
/*
 *  同意好友申请
 */
function doagreeFriend(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	friendListArray.splice(0,friendListArray.length);
	//if(data.friendApplyList.friendList.length > 0)
	{
			for(var i = 0; i<data.friendApplyList.friendList.length; i++)
			{
				friendListArray[i] = {
					id : data.friendApplyList.friendList[i].id,
					name : data.friendApplyList.friendList[i].name + "正在向您申请好友"
				};
				
			}
	}
    friendListPage = data.friendApplyList.page;
    friendListPages = data.friendApplyList.pages;
    friendList(getClickObjectIndex(),com_group,com_layer);	
    changeMap(com_layer); 
    //更新本地好友数据
    //data.friends下的数据同获取好友列表数据相同
    getFriendsDefaultPage = data.friends.page;
	getFriendsDefaultPages = data.friends.pages;
	getFriendsDefaultArray.splice(0,getFriendsDefaultArray.length);
	for(var i =0; i<data.friends.friends.length; i++)
	{
		getFriendsDefaultArray[i] = {
			friendId : data.friends.friends[i].friendId,//君主ID
			friendCountry : data.friends.friends[i].friendCountry,//国家名称
			friendLeague : data.friends.friends[i].friendLeague,//联盟
			friendLevel : data.friends.friends[i].friendLevel,//等级
			friendMaincityLevel : data.friends.friends[i].friendMaincityLevel,//城池等级
			friendName : data.friends.friends[i].friendName,//君主名称
			id : data.friends.friends[i].id,//id
			lineTime : data.friends.friends[i].lineTime,//路程
			loginStatus : data.friends.friends[i].loginStatus,//上线状态
			selected : data.friends.friends[i].selected,//搜索ID
			color: "#000000"
		};
	}
	social(getClickObjectIndex(),com_group,com_layer);
}
/*
 *  申请好友列表回调
 */
var friendListArray = new Array();
var friendListPage = 1;
var friendListPages = 1;
function datagetFriendListDefault(data)
{
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	friendListArray.splice(0,friendListArray.length);
	if(data.friendList.length > 0)
	{   
			for(var i = 0; i<data.friendList.length; i++)
			{
				friendListArray[i] = {
					id : data.friendList[i].id,
					name : data.friendList[i].name + "正在向您申请好友"
				};
				
			}
	}
    friendListPage = data.page;
    friendListPages = data.pages;
	friendList(getClickObjectIndex(),com_group,com_layer);	
	changeMap(com_layer); 
}
/*
 *  申请好友
 */
function doaddFriendList(data)
{
	if(typeof(data.error) != "undefined")
	{
		var message = data.error;
		var errorId = data.errorType;
		messageType = 0;
		messageAlert(getClickObjectIndex(),message,errorId,com_group,com_layer);
    	changeMap(com_layer);	
		return;
	}
	messageAlert(getClickObjectIndex(),data.message,3,com_group,com_layer);
    changeMap(com_layer);	
}
var social= function(index,_group,_layer)//社交
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	socialDraw = true;
	var bW = gbox.getImage('hy_zjm_01').width;
	var bH = gbox.getImage('hy_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 38;		
	gbox.addObject(
			{ 
				id : 'social0',
				group : 'levelMenu_2',
				tileset : 'hy_zjm_01',
				x : 0,
				y : 0,
				frame : 0,
				poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
				initialize : function()
				{	
                    if(findFriendDiv == null && !gbox._isIndwellDiv("findFriendDiv","input"))
					{
						findFriendDiv = addDivWindowBg(570,177);
						findFriendDiv.id = 'findFriendDiv';
						document.body.appendChild(findFriendDiv);
						findFriendValue = document.createElement("input");
						findFriendValue.style.id = 'findFriendValue';
						findFriendValue.style.backgroundColor = '#000000';
						findFriendValue.style.width = '100px';
						findFriendValue.style.color = '#ffffff';
						findFriendDiv.appendChild(findFriendValue);            
					}
					if(addFriendDiv == null && !gbox._isIndwellDiv("addFriendDiv","input"))
					{
						addFriendDiv = addDivWindowBg(420,578);
						addFriendDiv.id = 'addFriendDiv';
						document.body.appendChild(addFriendDiv);
						addFriendValue = document.createElement("input");
						addFriendValue.style.id = 'addFriendValue';
						addFriendValue.style.backgroundColor = '#000000';
						addFriendValue.style.width = '80px';
						addFriendValue.style.color = '#ffffff';
						addFriendDiv.appendChild(addFriendValue);            
					}				
				},
				first : function() 
				{	
					/*
					* 控制浏览器大小变化时DIV输入框自动适配屏幕
					*/
					adaptiveDiv(findFriendDiv,"findFriendDiv",570);
					adaptiveDiv(addFriendDiv,"addFriendDiv",427);
					/*======================================================*/	
				},
				myclick : function()
				{
					 socialMessageAlertCtr = false;
					 friendListCtr = false;
					 sendMailDraw = false;
                     queryUnionAlertCtr = false;
                     isSocialInfo = false;
                     if(gbox._isIndwellDiv("titleNameDiv","input"))
						{
							  document.body.removeChild(titleNameDiv);  
							  titleNameDiv = null;
							  document.body.removeChild(receiveNameDiv);  
							  receiveNameDiv = null;
						} 
				    if(gbox._isIndwellDiv("mailContentDiv","input"))
						{
							  document.body.removeChild(mailContentDiv);  
							  mailContentDiv = null;
						} 
				    if(gbox._isIndwellDiv("receiveNameDiv","input"))
						{
							  document.body.removeChild(receiveNameDiv);  
							  receiveNameDiv = null;
						} 
					if((((backdropX+30) < lastTouchMoveX) && (lastTouchMoveX < (backdropX+97))) && (((backdropY+10) < lastTouchMoveY) && (lastTouchMoveY < backdropY + 67)))
					 {
					 	socialFriendPage = true;
						sociaEnemyPage = false;
						findFriendValue.value = "";
				        addFriendValue.value = "";
						friend.getFriendsDefault(datagetFriendsDefault); 
					 }
					 if((((backdropX+110) < lastTouchMoveX) && (lastTouchMoveX < (backdropX+167))) && (((backdropY+10) < lastTouchMoveY) && (lastTouchMoveY < backdropY + 67)))
					 {
					 	socialFriendPage = false;
						sociaEnemyPage = true;
						findFriendValue.value = "";
				        addFriendValue.value = "";
				 		friend.getEnemyDefault(datagetEnemyDefault);
					 }
					 if(socialFriendPage)//好友
					 {
					 	//查找好友
					 	if(((lastTouchMoveX > 674) && (lastTouchMoveX < 696)) && ((lastTouchMoveY > 180) && (lastTouchMoveY<199)))//添加好友	
					 	{
					 		if(findFriendValue.value != null && findFriendValue.value!="")
					 		{
					 			friend.selectFriend(findFriendValue.value,doSelectFriend);
					 		}
					 		findFriendValue.value = "";
				            addFriendValue.value = "";
					 		  
					 	}
					 	//添加好友
					 	if(((lastTouchMoveX > 547) && (lastTouchMoveX < 632)) && ((lastTouchMoveY > 577) && (lastTouchMoveY<602)))//添加好友	
					 	{
					 		//addPort = 1;
					 		if(addFriendValue.value != null && addFriendValue.value!="")
					 		  friend.addFriendList(addFriendValue.value,doaddFriendList);
					 		findFriendValue.value = "";
				            //addFriendValue.value = "";
					 	}
					 	//处理好友申请
					 	if(((lastTouchMoveX > 638) && (lastTouchMoveX < 660)) && ((lastTouchMoveY > 580) && (lastTouchMoveY< 605)))//好友列表
					 	{
					 		friend.getFriendListDefault(datagetFriendListDefault);
					 		friendWarnData = false;
					 	}
					 	//翻页控制
					 	if(((1035 < lastTouchMoveX) && (lastTouchMoveX < 1051)) && ((582 < lastTouchMoveY) && (lastTouchMoveY < 601)))//控制向左翻页
			               {
			               	   if(getFriendsDefaultPage < getFriendsDefaultPages)
			               	   {
			               	   	  friend.getFriendsByPage(getFriendsDefaultPage + 1,dogetFriendsByPage);
			               	   	  getFriendsDefaultPage = getFriendsDefaultPage + 1;
			               	   }  	   
			               }
			           if(((962 < lastTouchMoveX) && (lastTouchMoveX < 977)) && ((582 < lastTouchMoveY) && (lastTouchMoveY < 601)))//控制向右翻页
			               {
			               	   if(getFriendsDefaultPage >= 2)
			               	   {
			               	   	   friend.getFriendsByPage(getFriendsDefaultPage - 1,dogetFriendsByPage);
			               	   	   getFriendsDefaultPage = getFriendsDefaultPage - 1;
			               	   }
			               	    
			               }
			           //删除好友
			           for(var i =0; i<getFriendsDefaultArray.length;i++)
						{
							if(((1077 < lastTouchMoveX) && (lastTouchMoveX < 1098)) && (((229 + i*33) < lastTouchMoveY) && (lastTouchMoveY < (250+ i*33))))
							{
								friend.deleteFriend(getFriendsDefaultPage,getFriendsDefaultArray[i].id,dodeleteFriend);
							}							
						}
					   //邮件
					   for(var i =0; i<getFriendsDefaultArray.length;i++)
						{
							if(((968 < lastTouchMoveX) && (lastTouchMoveX < 990)) && (((229 + i*33) < lastTouchMoveY) && (lastTouchMoveY < (251+ i*33))))
							{
								sendMailDraw = true;
								returnName = getFriendsDefaultArray[i].friendName;
					 	        sendMailPage(getClickObjectIndex(),_group,_layer,"social",'levelMenu_3');
							}							
						}
                       //私聊
					   for(var i =0; i<getFriendsDefaultArray.length;i++)
						{
							if(((1027 < lastTouchMoveX) && (lastTouchMoveX < 1049)) && (((229 + i*33) < lastTouchMoveY) && (lastTouchMoveY < (251+ i*33))))
							{
								console.log(">>>私聊 = " + getFriendsDefaultArray[i].id);
							}							
						}
					   //君主名称
					   for(var i =0; i<getFriendsDefaultArray.length;i++)
						{
							if(((343 < lastTouchMoveX) && (lastTouchMoveX < 487)) && (((225 + i*32) < lastTouchMoveY) && (lastTouchMoveY < (256+ i*32))))
							{								
								User.getCharacterById(getFriendsDefaultArray[i].friendId,doCharById);
								
							}							
						}					   
					 }
					 if(sociaEnemyPage)
					 {
					 	//君主名称
					 	for(var i =0; i<EnemyDefault.length;i++)
						{
							if(((343 < lastTouchMoveX) && (lastTouchMoveX < 487)) && (((225 + i*32) < lastTouchMoveY) && (lastTouchMoveY < (256+ i*32))))
							{
								//console.log(">>>君主名称 = " + getFriendsDefaultArray[i].id);
								User.getCharacterById(EnemyDefault[i].friendId,doCharById);
							}							
						}	
					 	//查找仇人
					 	if(((lastTouchMoveX > 674) && (lastTouchMoveX < 696)) && ((lastTouchMoveY > 180) && (lastTouchMoveY<199)))//添加好友	
					 	{
					 		if(findFriendValue.value != null && findFriendValue.value!="")
					 		{
					 			friend.selectEnemy(findFriendValue.value,doSelectEnemy);
					 		}
					 		findFriendValue.value = "";
				            addFriendValue.value = "";
					 		  
					 	}
					 	//增加仇人
					 	if(((lastTouchMoveX > 547) && (lastTouchMoveX < 632)) && ((lastTouchMoveY > 577) && (lastTouchMoveY<602)))//添加仇人
					 	{
					 		if(addFriendValue.value != null && addFriendValue.value!="")
					 	      friend.addEnemy(addFriendValue.value,doaddEnemy);
					 	    findFriendValue.value = "";
				            //addFriendValue.value = "";
					 	}
					 	//删除仇人
					 	for(var i =0; i<EnemyDefault.length;i++)
						{
							if(((1077 < lastTouchMoveX) && (lastTouchMoveX < 1098)) && (((229 + i*33) < lastTouchMoveY) && (lastTouchMoveY < (250+ i*33))))
							{
								friend.deleteEnemy(enemyPage,EnemyDefault[i].id,dodeleteEnemy);
							}							
						}
						//发送邮件
						for(var i =0; i<EnemyDefault.length;i++)
						{
							if(((954 < lastTouchMoveX) && (lastTouchMoveX < 976)) && (((229 + i*33) < lastTouchMoveY) && (lastTouchMoveY < (251+ i*33))))
							{
								sendMailDraw = true;
								returnName = EnemyDefault[i].friendName;
					 	        sendMailPage(getClickObjectIndex(),_group,_layer,"social",'levelMenu_3');
							}							
						}
						//仇人翻页
                        if(((1035 < lastTouchMoveX) && (lastTouchMoveX < 1051)) && ((582 < lastTouchMoveY) && (lastTouchMoveY < 601)))//控制向左翻页
			               {
			               	   if(enemyPage < enemyPages)
			               	   {
			               	   	  friend.getEnemyByPage(enemyPage + 1,doEnemyByPage);
			               	   	  enemyPage = enemyPage + 1;
			               	   }  	   
			               }
			           if(((962 < lastTouchMoveX) && (lastTouchMoveX < 977)) && ((582 < lastTouchMoveY) && (lastTouchMoveY < 601)))//控制向右翻页
			               {
			               	   if(enemyPage >= 2)
			               	   {
			               	   	   friend.getEnemyByPage(enemyPage - 1,doEnemyByPage);
			               	   	   enemyPage = enemyPage - 1;
			               	   }
			               	    
			               }					 	
					   }				 
						if(((exitButtonCoordinate.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height))){
								displayDestroy();
								exit(index);
								curGroup = 'cityMenu';
						}
						else {
			                 social(getClickObjectIndex(),_group,_layer);	              	
					         changeMap(_layer);
						}

				},
				blit : function()
				{
					
					 if(isDrawUI[index] && socialDraw)
					 {
					 	document.body.style.cursor='default';
					    gbox.drawImage('hy_zjm_01',backdropX,backdropY);
					    gbox.drawImage('ty_an_127',backdropX,backdropY);
					    gbox.drawImage('hy_zjm_04',backdropX+30,backdropY+10);
					    gbox.drawImage('hy_zjm_06',backdropX+110 ,backdropY+10);
					    gbox.drawImage('hy_zjm_43',(gbox.getImage('hy_zjm_01').width - gbox.getImage("hy_zjm_43").width)/2 + backdropX,backdropY);
					    //绘制查找好友
						gbox.drawImage('ty_an_76',675,180);
						if(((346 < touchMoveX) && (touchMoveX < 417)) && ((134 < touchMoveY) && (touchMoveY < 183)))
						{
							gbox.drawImage('hy_zjm_05',backdropX+30,backdropY+10);
						}
						if(((424 < touchMoveX) && (touchMoveX < 485)) && ((134 < touchMoveY) && (touchMoveY < 183)))
						{
							gbox.drawImage('hy_zjm_07',backdropX+110,backdropY+10);
						}
                        if(socialFriendPage)//好友
                        {
                        	gbox.drawImage('hy_zjm_02',backdropX+30,backdropY);
                        	gbox.drawText("好友名称：",500,182,5);
                        	var tzX = 547 + (84 - gbox.getImage('hy_zjm_07').width)/2;
						 	var tzY = 579 + (26 - gbox.getImage('hy_zjm_07').height)/2;
						 	//gbox.drawImage('hy_zjm_07',tzX,tzY);	
						 	//绘制同志图标						 	
						 	gbox.drawImage('hy_zjm_20',641,582);
						 	//绘制添加好友
						 	gbox.drawImage('ty_an_10',547,578);
							if(((touchMoveX > 547) && (touchMoveX < 632)) && ((touchMoveY > 577) && (touchMoveY<602)))//确定按钮	
							{
								gbox.drawImage('ty_an_09',547,578);
							 	
							}
							var fontW = gbox.getTextWidth("添加好友",14);
						 	var dx = 547 + (84 - fontW)/2;
							var dy = 578 + (26 - 14)/2;
							gbox.drawText("添加好友",dx,dy,10);				
							for(var i =0; i<getFriendsDefaultArray.length;i++)
							{
								if(((343 < touchMoveX) && (touchMoveX < 487)) && (((225 + i*32) < touchMoveY) && (touchMoveY < (256+ i*32))))
								{						
									document.body.style.cursor='hand';									
								}														
							}	
							//绘制好友信息
							for(var i=0; i<getFriendsDefaultArray.length; i++)
							{
								 var rW = 144;
								 var strW = gbox.getTextWidth(getFriendsDefaultArray[i].friendName,14);
								 var cntX = 343 + (rW - strW)/2;
								 gbox.drawText(getFriendsDefaultArray[i].friendName,cntX,234 + i*32,2);
								 //gbox.drawString( getFriendsDefaultArray[i].friendName,cntX,234 + i*32,getFriendsDefaultArray[i].color,14);								 					
								 var g = gbox.getBufferContext();
								 g.save();
								 g.lineWidth = 1;
							     g.strokeStyle = "#000000";
								 g.lineJoin = "round";
								 g.beginPath();
								 g.moveTo(cntX, 250 + i*32);
								 g.lineTo(cntX + strW + 10, 250 + i*32);
								 g.closePath();
								 g.stroke();
								 g.restore();
								 var rW = 57;
								 var strW = gbox.getTextWidth(getFriendsDefaultArray[i].friendCountry,14);
								 var cntX = 489 + (rW - strW)/2;
								 gbox.drawText(getFriendsDefaultArray[i].friendCountry,cntX,234 + i*32,2);
								 //gbox.drawString( getFriendsDefaultArray[i].friendCountry,cntX,234 + i*32,getFriendsDefaultArray[i].color,14);
								 var rW = 57;
								 var strW = gbox.getTextWidth(getFriendsDefaultArray[i].friendLevel,14);
								 var cntX = 551 + (rW - strW)/2;
								 gbox.drawText(getFriendsDefaultArray[i].friendLevel,cntX,234 + i*32,2);
								 //gbox.drawString( getFriendsDefaultArray[i].friendLevel,cntX,234 + i*32,getFriendsDefaultArray[i].color,14);
								 if(getFriendsDefaultArray[i].friendLeague == null)
								 {
								 	 var rW = 90;
									 var strW = gbox.getTextWidth("无",14);
									 var cntX = 610 + (rW - strW)/2;
									 gbox.drawText("无",cntX,234 + i*32,2);
									 //gbox.drawString("无",cntX,234 + i*32,getFriendsDefaultArray[i].color,14);
								 }
								 else
								 {
								 	 var rW = 90;
								 	 var strW = gbox.getTextWidth(getFriendsDefaultArray[i].friendLeague,14);
									 var cntX = 610 + (rW - strW)/2;
									 gbox.drawText(getFriendsDefaultArray[i].friendLeague,cntX,234 + i*32,2);
									 //gbox.drawString( getFriendsDefaultArray[i].friendLeague,cntX,234 + i*32,getFriendsDefaultArray[i].color,14);
								 }	 
								 var rW = 63;
								 var strW = gbox.getTextWidth(getFriendsDefaultArray[i].friendMaincityLevel,14);
								 var cntX = 704 + (rW - strW)/2;
								 gbox.drawText(getFriendsDefaultArray[i].friendMaincityLevel,cntX,234 + i*32,2);
								 //gbox.drawString( getFriendsDefaultArray[i].friendMaincityLevel,cntX,234 + i*32,getFriendsDefaultArray[i].color,14);
								 var rW = 82;
								 var strW = gbox.getTextWidth(changeTimeformat(getFriendsDefaultArray[i].lineTime*1000),14);
								 var cntX = 768 + (rW - strW)/2;
								 gbox.drawText(changeTimeformat(getFriendsDefaultArray[i].lineTime*1000),cntX,234 + i*32,2);
								 //gbox.drawString(changeTimeformat(getFriendsDefaultArray[i].lineTime*1000),cntX,234 + i*32,getFriendsDefaultArray[i].color,14);
								 var rW = 68;
								 var strW = gbox.getTextWidth(getFriendsDefaultArray[i].loginStatus,14);
								 var cntX = 868 + (rW - strW)/2;
								 gbox.drawText(getFriendsDefaultArray[i].loginStatus,cntX,234 + i*32,2);
								 //gbox.drawString(getFriendsDefaultArray[i].loginStatus,cntX,234 + i*32,getFriendsDefaultArray[i].color,14);
								 
								 gbox.drawImage('ty_an_18',1082,232 + i*32);
								 gbox.drawImage('ty_an_57',970, 230+i*32);
					             gbox.drawImage('ty_an_68',1028, 230+i*32);	
							}
							gbox.drawText(getFriendsDefaultPage + "/" + getFriendsDefaultPages,996,584,2);
							//gbox.drawString(getFriendsDefaultPage + "/" + getFriendsDefaultPages,996,584,'#000000',14);
							gbox.drawImage('ty_an_25',966, 582);
                            gbox.drawImage('ty_an_24',1036, 582);
                        }
                        if(sociaEnemyPage)
                        {                  
                        	gbox.drawImage('hy_zjm_03',backdropX+110,backdropY);
                            gbox.drawDanceString("添加名称：", 500, 182,14,'#000000','#FFFFFF');	
                            gbox.drawImage('ty_an_10',547,578);
						 	if(((touchMoveX > 547) && (touchMoveX < 632)) && ((touchMoveY > 577) && (touchMoveY<602)))//确定按钮	
							{
								gbox.drawImage('ty_an_09',547,578);						
							}
							var fontW = gbox.getTextWidth("添加仇人",14);
						 	var dx = 547 + (84 - fontW)/2;
							var dy = 578 + (26 - 14)/2;
							gbox.drawText("添加仇人", dx, dy,10);
							for(var i =0; i<EnemyDefault.length;i++)
							{
								if(((343 < touchMoveX) && (touchMoveX < 487)) && (((225 + i*32) < touchMoveY) && (touchMoveY < (256+ i*32))))
								{						
									document.body.style.cursor='hand';									
								}														
							}	
						 	for(var i=0; i<EnemyDefault.length; i++)
							{
								 var rW = 144;
								 var strW = gbox.getTextWidth(EnemyDefault[i].friendName,14);
								 var cntX = 343 + (rW - strW)/2;
								 gbox.drawText(EnemyDefault[i].friendName,cntX,234 + i*32,2);
								 //gbox.drawString( EnemyDefault[i].friendName,cntX,234 + i*32,EnemyDefault[i].color,14);
								 var g = gbox.getBufferContext();
								 g.save();
								 g.lineWidth = 1;
							     g.strokeStyle = "#000000";
								 g.lineJoin = "round";
								 g.beginPath();
								 g.moveTo(cntX, 250 + i*32);
								 g.lineTo(cntX + strW + 10, 250 + i*32);
								 g.closePath();
								 g.stroke();
								 g.restore();
								 var rW = 57;
								 var strW = gbox.getTextWidth(EnemyDefault[i].friendCountry,14);
								 var cntX = 489 + (rW - strW)/2;
								 gbox.drawText(EnemyDefault[i].friendCountry,cntX,234 + i*32,2);
								 //gbox.drawString( EnemyDefault[i].friendCountry,cntX,234 + i*32,EnemyDefault[i].color,14);
								 var rW = 57;
								 var strW = gbox.getTextWidth(EnemyDefault[i].friendLevel,14);
								 var cntX = 551 + (rW - strW)/2;
								 gbox.drawText(EnemyDefault[i].friendLevel,cntX,234 + i*32,2);
								 //gbox.drawString( EnemyDefault[i].friendLevel,cntX,234 + i*32,EnemyDefault[i].color,14);
								 if(EnemyDefault[i].friendLeague == null)
								 {
								 	 var rW = 90;
									 var strW = gbox.getTextWidth("无",14);
									 var cntX = 610 + (rW - strW)/2;
									 gbox.drawText("无",cntX,234 + i*32,2);
									 //gbox.drawString("无",cntX,234 + i*32,EnemyDefault[i].color,14);
								 }
								 else
								 {
								 	 var rW = 90;
								 	 var strW = gbox.getTextWidth(EnemyDefault[i].friendLeague,14);
									 var cntX = 610 + (rW - strW)/2;
									 gbox.drawText(EnemyDefault[i].friendLeague,cntX,234 + i*32,2);
									 //gbox.drawString( EnemyDefault[i].friendLeague,cntX,234 + i*32,EnemyDefault[i].color,14);
								 
								 }	 
								 var rW = 63;
								 var strW = gbox.getTextWidth(EnemyDefault[i].friendMaincityLevel,14);
								 var cntX = 704 + (rW - strW)/2;
								 gbox.drawText(EnemyDefault[i].friendMaincityLevel,cntX,234 + i*32,2);
								 //gbox.drawString( EnemyDefault[i].friendMaincityLevel,cntX,234 + i*32,EnemyDefault[i].color,14);
								 var rW = 82;
								 var strW = gbox.getTextWidth(changeTimeformat(EnemyDefault[i].lineTime*1000),14);
								 var cntX = 768 + (rW - strW)/2;
								 gbox.drawText(changeTimeformat(EnemyDefault[i].lineTime*1000),cntX,234 + i*32,2);
								 //gbox.drawString(changeTimeformat(EnemyDefault[i].lineTime*1000),cntX,234 + i*32,EnemyDefault[i].color,14);
								 var rW = 68;
								 var strW = gbox.getTextWidth(EnemyDefault[i].loginStatus,14);
								 var cntX = 868 + (rW - strW)/2;
								 gbox.drawText(EnemyDefault[i].loginStatus,cntX,234 + i*32,2);
								 //gbox.drawString(EnemyDefault[i].loginStatus,cntX,234 + i*32,EnemyDefault[i].color,14);								 
								 gbox.drawImage('ty_an_18',1082,234 + i*32);
								 gbox.drawImage('ty_an_57',954, 230+i*32);
					             gbox.drawImage('ty_an_68',997, 230+i*32);
					             gbox.drawImage('ty_an_62',1040, 230+i*32);	
					             gbox.drawText(enemyPage + "/" + enemyPages,996,584,2);
					             //gbox.drawString(enemyPage + "/" + enemyPages,996,584,'#000000',14);
							     gbox.drawImage('ty_an_25',966, 582);
                                 gbox.drawImage('ty_an_24',1036, 582);
							}	
                        }    
                        if(((exitButtonCoordinate.x < touchMoveX) && (touchMoveX < exitButtonCoordinate.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate.y < touchMoveY) && (touchMoveY < exitButtonCoordinate.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate.x,exitButtonCoordinate.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate.x,exitButtonCoordinate.y);	
						   }
				     }
				}
		 });
		 		 
};
var socialMessageError;
var socialMessageAlertCtr = false;
var messageAlert = function(index,str,id,com_group,com_layer)
{   
	var str = str;
	var errorType = id;
    if(com_group == 'cityMenu'){
		gbox.setRenderOrder([com_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([com_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;    
	socialMessageAlertCtr = true;
	var pW = gbox.getImage('ty_an_55').width;
	var pH = gbox.getImage('ty_an_55').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	gbox.addObject(
	{ 
		id : 'messageAlert',
		group : 'levelMenu_4',
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
            if(socialMessageAlertCtr)
            {
            	if(errorType == 0 || errorType == 3)
            	{
            		if(((lastTouchMoveX > (pX + 254)) && (lastTouchMoveX < (pX + 254 + gbox.getImage('ty_an_18').width))) && ((lastTouchMoveY > (pY + 2)) && (lastTouchMoveY<(pY + 2 + gbox.getImage('ty_an_18').height))))
		            {		  
		            	if(addPort == 0)
		            	{
		            		this.poly = [[0,0],[0,0],[0,0],[0,0]];
					        socialMessageAlertCtr = false;
		            		isSocialInfo = true;
		            		//SocialInfo(getClickObjectIndex(),com_group,com_layer);
	                        //changeMap(com_layer);
	                        addPort= -1;
		            	} 
		            	if(addPort == 1)
		            	{
		            		this.poly = [[0,0],[0,0],[0,0],[0,0]];
					        socialMessageAlertCtr = false;
					        addPort= -1;
		            	}	
		            	 			          
		            }
		            else
		            {
		            	messageAlert(getClickObjectIndex(),str,errorType,com_group,com_layer);
		    	        changeMap(com_layer);	
		            }
            	}
            	if(errorType == 1)
            	{
            		var cntX = pX + (gbox.getImage('ty_an_55').width -  gbox.getImage('ty_an_06').width)/2;
            		if(((lastTouchMoveX > (pX + 254)) && (lastTouchMoveX < (pX + 254 + gbox.getImage('ty_an_18').width))) && ((lastTouchMoveY > (pY + 2)) && (lastTouchMoveY<(pY + 2 + gbox.getImage('ty_an_18').height))))
		            {
					    if(addPort == 0)
		            	{
		            		this.poly = [[0,0],[0,0],[0,0],[0,0]];
					        socialMessageAlertCtr = false;
		            		isSocialInfo = true;
		            		//SocialInfo(getClickObjectIndex(),com_group,com_layer);
	                        //changeMap(com_layer);
	                        addPort= -1;
		            	} 
		            	else
		            	{
		            		this.poly = [[0,0],[0,0],[0,0],[0,0]];
					        socialMessageAlertCtr = false;
		            	}
		            }
		            else if(((lastTouchMoveX > cntX) && (lastTouchMoveX < (cntX + gbox.getImage('ty_an_06').width))) && ((lastTouchMoveY > (pY + 84)) && (lastTouchMoveY<(pY + 84 + gbox.getImage('ty_an_06').height))))
		            {		  		            	
		            	switch(messageType)
		            	{
		            		case 0:		                 
		            	     friend.addFriendListForOk(addFriendValue.value,doaddFriendListForOk);	          		
		            	     messageType = -1;
		            	     break;	
		            	    case 1:
		            	       friend.addEnemyForOk(addFriendValue.value,doaddEnemyForOk);
		            	     addFriendValue.value = "";
		            	     messageType = -1;
		            	     break;	            	    
		            	}
		            	
		            }
		            else
		            {
		            	messageAlert(getClickObjectIndex(),str,errorType,com_group,com_layer);
		    	        changeMap(com_layer);	
		            }
            	}
            	
            }
           
             
		},
		blit : function()
		{
			if(isDrawUI[index] && socialMessageAlertCtr)
			{
				var dialogX = pX;
				var dialogY = pY;
				//console.log("=" + errorType);
				switch(errorType)
				{
					case 0:
					case 3:
						 gbox.drawImage('ty_an_55',dialogX, dialogY);	
						 var rW = gbox.getImage('ty_an_55').width;
						 var strW = gbox.getBufferContext().measureText(str).width;
						 var cntX = dialogX + (rW - strW)/2;
						 if(strW > rW)
						 {
						 	 var tempText = studyLineDesc(gbox.getBufferContext(),str,180);
					         for(var i= 0;i<tempText.length;i++)
					           {
					           	   gbox.drawText(tempText[i],619, 339 + i*20,5);
							       //gbox.drawDanceString(tempText[i],619, 339 + i*20,12, '#000000','#ffffff');
						       }
						 }
						 else
						 {
						 	gbox.drawText(str,cntX,dialogY + 53,5);
						 	//gbox.drawDanceString(str,cntX,dialogY + 53,12,'#000000','#ffffff');
						 }
						 gbox.drawImage('ty_an_18',dialogX + 254, dialogY + 2);
						 if(((touchMoveX > (dialogX + 254)) && (touchMoveX < (dialogX + 254 + gbox.getImage('ty_an_18').width))) && ((touchMoveY > (dialogY + 2)) && (touchMoveY<(dialogY + 2 + gbox.getImage('ty_an_18').height))))
						 {
						 	 gbox.drawImage('ty_an_17',dialogX + 254, dialogY + 2);
						 }
					 break;
				    case 1:
					     gbox.drawImage('ty_an_55',dialogX, dialogY);	
						 var rW = gbox.getImage('ty_an_55').width;
						 var strW = gbox.getBufferContext().measureText(str).width;
						 var cntX = dialogX + (rW - strW)/2;
						 if(strW > rW)
						 {
						 	 var tempText = studyLineDesc(gbox.getBufferContext(),str,180);
					         for(var i= 0;i<tempText.length;i++)
					           {
					           	     gbox.drawText(tempText[i],619, 339 + i*20,5);
							       //gbox.drawDanceString(tempText[i],619, 339 + i*20,12, '#000000','#ffffff');
						       }
						 }
						 else
						 {
						 	 gbox.drawText(str,cntX,dialogY + 53,5);
						 	//gbox.drawDanceString(str,cntX,dialogY + 53,12,'#000000','#ffffff');
						 }
						 gbox.drawImage('ty_an_18',dialogX + 254, dialogY + 2);
						 if(((touchMoveX > (dialogX + 254)) && (touchMoveX < (dialogX + 254 + gbox.getImage('ty_an_18').width))) && ((touchMoveY > (dialogY + 2)) && (touchMoveY<(dialogY + 2 + gbox.getImage('ty_an_18').height))))
						 {
						 	 gbox.drawImage('ty_an_17',dialogX + 254, dialogY + 2);
						 }
						 var cntX = dialogX + (rW -  gbox.getImage('ty_an_06').width)/2;
						 gbox.drawImage('ty_an_08',cntX, dialogY + 84);
						 if(((touchMoveX > cntX) && (touchMoveX < (cntX + gbox.getImage('ty_an_06').width))) && ((touchMoveY > (dialogY + 84)) && (touchMoveY<(dialogY + 84 + gbox.getImage('ty_an_06').height))))
						  {
						  	 gbox.drawImage('ty_an_06',cntX, dialogY + 84);
						  }	
						 var strW = gbox.getBufferContext().measureText("确定").width;
						 var cntX = dialogX + (rW - strW)/2;
						 gbox.drawText("确定",cntX - 3,dialogY + 90,10);
						 //gbox.drawDanceString("确定",cntX - 3,dialogY + 90,14,'#000000','#ffffff');
											
					 break;
				}			
				
			}
		}		
	 });
};
var friendListCtr = false;
function friendList(index,_group,_layer)
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	friendListCtr = true;
	var pW = gbox.getImage('hy_zjm_11').width;
	var pH = gbox.getImage('hy_zjm_11').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;

	gbox.addObject(
	{ 
		id : 'hy_zjm_11',
		group : 'levelMenu_3',
		tileset : 'hy_zjm_11',
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
			if(friendListCtr)
			{		
				for(var i =0; i<friendListArray.length;i++)
				{
					if(((845 < lastTouchMoveX) && (lastTouchMoveX < 886)) && (((229 + i*33) < lastTouchMoveY) && (lastTouchMoveY < (250+ i*33))))
					{
						friend.agreeFriend(friendListPage,friendListArray[i].id,doagreeFriend);
					}
					if(((896 < lastTouchMoveX) && (lastTouchMoveX < 936)) && (((229+ i*33) < lastTouchMoveY) && (lastTouchMoveY < (250+ i*33))))
					{
						friend.refuseFriend(friendListPage,friendListArray[i].id,dorefuseFriend);
					}
					
				}
				if(((753 < lastTouchMoveX) && (lastTouchMoveX < 767)) && ((518 < lastTouchMoveY) && (lastTouchMoveY < 542)))//控制向左翻页
			               {
			               	   if(friendListPage < friendListPages)
			               	   {
			               	   	  friend.getFriendListByPage(friendListPage + 1,dogetFriendListByPage);
			               	   	  friendListPage = friendListPage + 1;
			               	   }  	   
			               }
			    if(((683 < lastTouchMoveX) && (lastTouchMoveX < 696)) && ((518 < lastTouchMoveY) && (lastTouchMoveY < 542)))//控制向右翻页
			               {
			               	   if(friendListPage >= 2)
			               	   {
			               	   	   friend.getFriendListByPage(friendListPage - 1,dogetFriendListByPage);
			               	   	   friendListPage = friendListPage - 1;
			               	   }
			               	    
			               }
			    if(((931 < lastTouchMoveX) && (lastTouchMoveX < 947)) && ((205 < lastTouchMoveY) && (lastTouchMoveY < 219)))
			    {
			    	this.poly = [[0,0],[0,0],[0,0],[0,0]];
					friendListCtr = false;
			    }
			    else
			    {
			    	friendList(getClickObjectIndex(),_group,_layer);	
			        changeMap(_layer);
			    }
				
			} 
		},
		blit : function()
		{
			if(friendListCtr)
			{			
				gbox.drawImage('hy_zjm_11',pX, pY+5);	
				for(var i =0; i<friendListArray.length;i++)
				{
					gbox.drawText(friendListArray[i].name,494, 237+i*32,5);
					//gbox.drawDanceString(friendListArray[i].name,498, 237+i*32,14, '#000000','#ffffff');
					gbox.drawImage('hy_zjm_12',846, 235+i*32);
					gbox.drawImage('hy_zjm_13',895, 235+i*32);	
				}
				gbox.drawImage('ty_an_18',933, 206);
				if(((931 < touchMoveX) && (touchMoveX < 947)) && ((205 < touchMoveY) && (touchMoveY < 219)))
				{
					gbox.drawImage('ty_an_17',933, 206);
				}	
				gbox.drawText(friendListPage + "/" + friendListPages,714, 527,5);
                //gbox.drawString(friendListPage + "/" + friendListPages,714,527,'#ffffff',12);  
                gbox.drawImage('ty_an_24',756, 522);
                gbox.drawImage('ty_an_25',685, 522);	  		   
			}
		}
	 });
}

var queryUnionAlertCtr = false;
var queryUnionAlert = function(str,id,com_group,com_layer)
{   
	var str = str;
	var errorType = id;
    if(com_group == 'cityMenu'){
		gbox.setRenderOrder([com_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([com_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	queryUnionAlertCtr = true;
	var pW = gbox.getImage('ty_an_55').width;
	var pH = gbox.getImage('ty_an_55').height;
	var pX = (gbox.getScreenW() - pW)/2;
	var pY = (gbox.getScreenH() - pH)/2;
	gbox.addObject(
	{ 
		id : 'queryUnionAlert',
		group : 'levelMenu_4',
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
            if(queryUnionAlertCtr)
            {
            	if(errorType == 0)
            	{
            		if(((lastTouchMoveX > (pX + 254)) && (lastTouchMoveX < (pX + 254 + gbox.getImage('ty_an_18').width))) && ((lastTouchMoveY > (pY + 2)) && (lastTouchMoveY<(pY + 2 + gbox.getImage('ty_an_18').height))))
		            {
					     this.poly = [[0,0],[0,0],[0,0],[0,0]];
					     queryUnionAlertCtr = false;
					     queryUnionInfo(getClickObjectIndex(),com_group,com_layer);
						 changeMap(com_layer);
		            }
		            else
		            {
		            	queryUnionAlert(str,0,com_group,com_layer);
		    	        changeMap(com_layer);	
		            }
            	}
            	
            }
           
             
		},
		blit : function()
		{
			if(queryUnionAlertCtr)
			{
				var dialogX = pX;
				var dialogY = pY;
				switch(errorType)
				{
					case 0:
						 gbox.drawImage('ty_an_55',dialogX, dialogY);	
						 var rW = gbox.getImage('ty_an_55').width;
						 var strW = gbox.getBufferContext().measureText(str).width;
						 var cntX = dialogX + (rW - strW)/2;
						 if(strW > rW)
						 {
						 	 var tempText = studyLineDesc(gbox.getBufferContext(),str,180);
					         for(var i= 0;i<tempText.length;i++)
					           {
					           	   gbox.drawText(tempText[i],619, 339 + i*20,10);
							       //gbox.drawDanceString(tempText[i],619, 339 + i*20,12, '#000000','#ffffff');
						       }
						 }
						 else
						 {
						 	gbox.drawText(str,cntX,dialogY + 53,10);
						 	//gbox.drawDanceString(str,cntX,dialogY + 53,12,'#000000','#ffffff');
						 }
						 gbox.drawImage('ty_an_18',dialogX + 254, dialogY + 2);
						 if(((touchMoveX > (dialogX + 254)) && (touchMoveX < (dialogX + 254 + gbox.getImage('ty_an_18').width))) && ((touchMoveY > (dialogY + 2)) && (touchMoveY<(dialogY + 2 + gbox.getImage('ty_an_18').height))))
						 {
						 	 gbox.drawImage('ty_an_17',dialogX + 254, dialogY + 2);
						 }
					 break;				   
				}			
				
			}
		}		
	 });
};
var isSocialInfo = false;
var SocialInfo = function(index,com_group,com_layer){
	if(com_group == 'cityMenu'){
		gbox.setRenderOrder([com_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([com_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	isSocialInfo = true;
	var bW = gbox.getImage('ckjz_zjm_01').width;
	var bH = gbox.getImage('ckjz_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var exitX = backdropX + bW - 20;
	var exitY = backdropY - 6;		    
		gbox.addObject(
			{ 
				id : 'SocialInfo',
				group : 'levelMenu_3',
				tileset : 'ckjz_zjm_01',
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
					socialMessageAlertCtr = false;
				    if(lastTouchMoveX > 494 && lastTouchMoveX < 579 && lastTouchMoveY > 487 && lastTouchMoveY < 514)
				    {
				    	//addPort = 0;
				    	//friend.addFriendList(kingData.name,doaddFriendList);
				    }
				    if(lastTouchMoveX > 855 && lastTouchMoveX < 941 && lastTouchMoveY > 487 && lastTouchMoveY < 514)
				    {
				    	// console.log("============" + kingData.name);
				    	// friend.addEnemy(kingData.name,doaddEnemy);
				    }
					if(lastTouchMoveX > exitX && lastTouchMoveX < (exitX + 23) && lastTouchMoveY > exitY && lastTouchMoveY < (exitY + 23)){
						displayDestroy();
						exit(index);
						socialMessageAlertCtr = false;
						social(getClickObjectIndex(),com_group,com_layer);	              	
	                    changeMap(com_layer);
					
					}
					else{
						SocialInfo(getClickObjectIndex(),com_group,com_layer);
						changeMap(com_layer);						
					}
				},
				blit : function()
				{					
					 if(isDrawUI[index] && isSocialInfo)
					 {
					 	
					    gbox.drawImage("ckjz_zjm_01",backdropX,backdropY);
					    var fontW = gbox.getTextWidth("加为好友",14);
                        var btnX = 496;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
						gbox.drawDanceString("加为好友", backX, backY,14,'#000000','#FFFFFF');
					    
                        var btnX = 585;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
						gbox.drawDanceString("联盟邀请", backX, backY,14,'#000000','#FFFFFF');
						
                        var btnX = 675;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
						gbox.drawDanceString("发动进攻", backX, backY,14,'#000000','#FFFFFF');
						
                        var btnX = 766;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
						gbox.drawDanceString("发送信息", backX, backY,14,'#000000','#FFFFFF');
						
                        var btnX = 857;
					    var btnY = 488;
					    var backX = btnX + (82 - fontW)/2 - 4;
						var backY = btnY + (25 - 14)/2;
						if(((btnX < touchMoveX) && (touchMoveX < (btnX + 82))) && ((btnY < touchMoveY) && (touchMoveY < (btnY + 25))))
				        {
				               gbox.drawImage('ty_an_09',btnX,btnY);               
				        }
						gbox.drawDanceString("标为仇人", backX, backY,14,'#000000','#FFFFFF');
						
				        if(typeof(kingInfo) != "undefined" && typeof(kingData) != "undefined"){
					        for(var i=0; i<4; i++){
					        	for(var j=0; j<2; j++){
					        		gbox.drawString("" + kingInfo[i][j],572 + (j * 168), 252 + (i*33),'#000000',16);
					        	}
					        }
					    if(typeof(gbox.getImage(kingData.image)) != "undefined")
					           gbox.drawImage(kingData.image,847,269); 				        
                        if(kingData.description!=null)
                        {
                        	gbox.drawTxtRect(kingData.description,500,396,410,70,16,'#ffffff','#000000');
                        }					     
				        }
				        
						   if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
						   {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_17',
									tile : 0,
									dx : exitX - 2,
									dy : exitY + 10,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							    });	
						   }
						   else
						   {
						   	    gbox.blitTile(gbox.getBufferContext(),
								{
									tileset : 'ty_an_18',
									tile : 0,
									dx : exitX - 2,
									dy : exitY + 10,
									fliph : this.fliph,
									flipv : this.flipv,
									camera : this.camera,
									alpha : 1.0
							    });	
						   }
					 }						
				}
			});

};