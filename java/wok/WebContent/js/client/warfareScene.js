var listGameObj = null;
var fightCnt = 20;
var isRoleAni = true;
var testCnt = 0;
var skill1Ani,skill2Ani,skill3Ani,skill4Ani,skill5Ani,skill6Ani,skill7Ani,commonAni,magicAni,loserAni;
var object1 = undefined;
var object2 = undefined;
var startNotification = true;
var FIRE_WAIT = 100;
var FIRE_START = 101;
var FIRE_START = 102;
var leftState = FIRE_WAIT;
var rightState = FIRE_WAIT;
var warfareDataArray;
var isBattleFinish = false;
var timeCount = 0;
var isCharHurt = false;
var isOgreHurt = false;
var tmpHurt = undefined;
var isWarfaceScene = true;
var sendsMinekillObject;
var sendsTargetkillObject;
function dobattleRoundTime(data)
{
	//console.log(data);
	console.log("时间转换");
	timeCount = data;
}
var operateSkillArray = new Array();
function doBattleTurn(data)
{
	console.log("战斗轮转");
	warfareButtonCtr = data.canOperate;
	if(warfareButtonCtr)
	{
		operateSkillArray.splice(0,operateSkillArray.length);
		for(var i=0; i<data.operateSkill.length; i++)
		{
			operateSkillArray[i] = 
			{
				canUse : data.operateSkill[i].canUse,
				description : data.operateSkill[i].description,
				needMp : data.operateSkill[i].needMp,
				remainRound : data.operateSkill[i].remainRound,
				skillIcon : data.operateSkill[i].skillIcon,
				skillName : data.operateSkill[i].skillName,
			};
		}
	}
//	else
//	{		
//	}
}

function doBattleAutoAttack(data)
{
	isManual = data.autoAttack;
}

var isWin = undefined;
var userInfo = undefined;
var resourceReward = undefined;
var warHeroInfo = new Array();//[数组]:武将信息
var itemReward = undefined;//[数组]:道具奖励数组，没有为null，不画
function doBattleEnd(data)
{
	console.log(data);
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	isWin = data.isWin;
	//用户信息
//	var temp = data.userInfo;
//	userInfo = {
//			charName:temp.charName,//[字符串]:玩家名称
//			image:temp.image,//[字符串]:玩家头像
//			level:temp.level//[整数]:君主等级
//	};
//	
	//[数组]:武将信息
//	warHeroInfo = new Array();
//	for(var i=0; i<data.heroInfo.length; i++){
//		var heroArray = data.heroInfo[i];
//		warHeroInfo[i] = {
//				addExp:heroArray.addExp,//[整数]:获得经验
//				addExploit:heroArray.addExploit,//[整数]:获得功勋
//				healthValue:heroArray.healthValue,//[整数]:健康度
//				heroName:heroArray.heroName,//[字符串]:武将名字
//				level:heroArray.level,//[整数]:等级
//				soldierAmount:heroArray.soldierAmount,//[整数]:士兵数量，没有为null,不画
//				soldierName:heroArray.soldierName//[字符串]:士兵名字，没有为null，不画
//		};
//	}
	
	//道具奖励数组，没有为null，不画
//	itemReward = new Array();
//	if(data.itemReward != null && typeof(data.itemReward) != 'undefined')
//	{
//		for(var i=0; i<data.itemReward.length; i++){
//			var itemArray = data.itemReward[i];
//			itemReward[i] = {
//					itemDescription:itemArray.itemDescription,//[字符串]:道具描述
//					itemName:itemArray.itemName,//[字符串]:道具名称
//					smallItemIcon:itemArray.smallItemIcon,//[字符串]:道具图标
//					itemAmount:itemArray.itemAmount//[整数]:获得道具数量
//			};
//		}		
//	}

	//资源奖励，没有为null，不画
	resourceReward = undefined;
	if(data.resourceReward != null && typeof(data.resourceReward) != 'undefined')
	{
		var temp2 = data.resourceReward;
		resourceReward = {
				ferrum:temp2.ferrum,//[整数]:获得铁矿，为0时不画
				food:temp2.food,//[整数]:获得粮食，为0时不画
				stone:temp2.stone,//[整数]:获得石料，为0时不画
				wood:temp2.wood//[整数]:获得木材，为0时不画
		};		
	}

}
var battleViewType = -1;//无战斗数据
var attackPersonId;
var defencePersonId;
var battleViewResult;
var targethurt;
var targethurtType;
var minehurt;
var minehurtType;
var huiheId = 100;
function dobattleView(data)
{
	console.log("战斗");
	battleViewType = -1;//无战斗数据
	warfareDataArray = undefined;
	if(typeof(data.error) != "undefined")
	{
		alert("系统提示：" + data.error);
		return;
	}
	warfareDataArray = 
					    {
							battleViewType : "",
							battleViewResult : "",
							attackPersonAction : "",
							attackPersonId : "",
							defencePersonCurrentHp : "",
							defencePersonHurt : "",
							defencePersonId : "",
							defencePersonHurtType : "",
							
					    };
	battleViewType =data.battleViewType;
	console.log(data.battleViewType);
	battleViewResult = data.battleViewResult;
	
	switch(data.battleViewType)
	{
		case 1://普攻击
			    switch(battleViewResult)
			    {
			    	case 1:    	    
				    	warfareDataArray = 
					    {
							battleViewType : data.battleViewType,
							battleViewResult : data.battleViewResult,
							attackPersonAction : data.battleViewInfo.attackPersonAction,
							attackPersonId : data.battleViewInfo.attackPersonId,
							defencePersonCurrentHp : data.battleViewInfo.defencePersonCurrentHp,
							defencePersonHurt : data.battleViewInfo.defencePersonHurt,
							defencePersonId : data.battleViewInfo.defencePersonId,
							defencePersonHurtType : data.battleViewInfo.defencePersonHurtType,
					    };
					     mineDate.intHp = data.battleViewInfo.hpUpdate[0];
					     //mineDate.intMp =data.battleViewInfo.mpUpdate[0];				     
					     targetDate.intHp = data.battleViewInfo.hpUpdate[1];
					     //targetDate.intMp = data.battleViewInfo.mpUpdate[1];
					     
				    	break;
				    case 2:			    	    
				    	warfareDataArray = 
					    {
							battleViewType : data.battleViewType,
							battleViewResult : data.battleViewResult,
							attackPersonAction : data.battleViewInfo.attackPersonAction,
							attackPersonId : data.battleViewInfo.attackPersonId,
							defencePersonCurrentHp : data.battleViewInfo.defencePersonCurrentHp,
							defencePersonHurt : data.battleViewInfo.defencePersonHurt,
							defencePersonId : data.battleViewInfo.defencePersonId,
							defencePersonHurtType : data.battleViewInfo.defencePersonHurtType,
					    };
					     mineDate.intHp = data.battleViewInfo.hpUpdate[0];
					     mineDate.intMp = data.battleViewInfo.mpUpdate[0];
					     targetDate.intHp = data.battleViewInfo.hpUpdate[1];
					     targetDate.intMp = data.battleViewInfo.mpUpdate[1];
				    	break;
				    case 3:		
				        warfareDataArray.attackPersonAction = data.battleViewInfo.attackPersonAction;
				        warfareDataArray.attackPersonId = data.battleViewInfo.attackPersonId;	
				        warfareDataArray.defencePersonId = data.battleViewInfo.defencePersonId;	    	    
				    	warfareDataArray.defencePersonHurt = "被闪避";
				    	break;
				    case 4:        
				        warfareDataArray = 
					    {
							battleViewType : data.battleViewType,
							battleViewResult : data.battleViewResult,
							attackPersonAction : data.battleViewInfo.attackPersonAction,
							attackPersonId : data.battleViewInfo.attackPersonId,
							defencePersonCurrentHp : "",
							defencePersonHurt : "未命中",
							defencePersonId : data.battleViewInfo.defencePersonId,
							defencePersonHurtType : "",
					    };
				        break;
				    case 5:
				        warfareDataArray.attackPersonAction = data.battleViewInfo.attackPersonAction;
				        warfareDataArray.attackPersonId = data.battleViewInfo.attackPersonId;	
				        warfareDataArray.defencePersonId = data.battleViewInfo.defencePersonId;	    	    
				    	warfareDataArray.defencePersonHurt = "暴击";
				        break;
		    }
		   
		break;
		case 2://技能攻击
		 console.log("2222222222222222222222222");
		    mineDate.intHp = data.battleViewInfo.hpUpdate[0];
		    mineDate.intMp = data.battleViewInfo.mpUpdate[0];
		    targetDate.intHp = data.battleViewInfo.hpUpdate[1];
		    targetDate.intMp = data.battleViewInfo.mpUpdate[1];
		    
		    huiheId = data.battleViewInfo.skillerId;
		    
		    if(data.battleViewInfo.skillerId != data.battleViewInfo.targetId)
		    {
		    	
		    	if(data.battleViewInfo.skillerId == 0)
		    	{//我方
		    		huiheId = 0;
		    		console.log("我方 ————huiheId == " + huiheId);
		    		warfareDataArray.attackPersonId = 0;
		    		warfareDataArray.defencePersonId = 1;
		    		sendsMinekillObject = {
		    			skillName : data.battleViewInfo.skillName,
		    			mineEffectValue : data.battleViewInfo.skillerEffectValue,
		    			targetEffectValue: data.battleViewInfo.targetEffectValue,
		    		};
		    		mineDate.intHp = data.battleViewInfo.hpUpdate[0];
					mineDate.intMp = data.battleViewInfo.mpUpdate[0];
					targetDate.intHp = data.battleViewInfo.hpUpdate[1];
					targetDate.intMp = data.battleViewInfo.mpUpdate[1];
		    	   // console.log("sendsMinekillObject = " + sendsMinekillObject.effectValue);
		    	}
		    	else
		    	{//敌方   
		    		huiheId = 1;
		    		console.log("敌方 ————huiheId == " + huiheId);
		    		warfareDataArray.attackPersonId = 1;
		    		warfareDataArray.defencePersonId = 0;
		    		sendsTargetkillObject = {
		    			skillName : data.battleViewInfo.skillName,
		    			mineEffectValue : data.battleViewInfo.skillerEffectValue,
		    			targetEffectValue: data.battleViewInfo.targetEffectValue,
		    		};
		    		mineDate.intHp = data.battleViewInfo.hpUpdate[0];
					mineDate.intMp = data.battleViewInfo.mpUpdate[0];
					targetDate.intHp = data.battleViewInfo.hpUpdate[1];
					targetDate.intMp = data.battleViewInfo.mpUpdate[1];
		    		//console.log("sendsTargetkillObject = " + sendsTargetkillObject.effectValue);
		    	}
		    }
		    else
		    {
		    	
		    	if(data.battleViewInfo.skillerId == 0)
		    	{
		    		huiheId = -2;
		    		sendsMinekillObject = {
		    			skillName : data.battleViewInfo.skillName,
		    		};
		    	}	   
		    	else
		    	{
		    		huiheId = -1;
		    		sendsTargetkillObject = {
		    			skillName : data.battleViewInfo.skillName,
		    		};
		    	}
		    	   
		    }
		   
		break;
	   case 3://会合结果
	        
			targetDate.agility = data.battleViewInfo.heros[1].agility;
			targetDate.intHeroForce = data.battleViewInfo.heros[1].heroForce;
			targetDate.intHp = data.battleViewInfo.heros[1].hp;
			targetDate.intMp = data.battleViewInfo.heros[1].mp;
			targetDate.physique = data.battleViewInfo.heros[1].physique;
			targetDate.strategy = data.battleViewInfo.heros[1].strategy;
			targethurt = data.battleViewInfo.heros[1].hurt;
			targethurtType = data.battleViewInfo.heros[1].hurtType;
			mineDate.agility = data.battleViewInfo.heros[0].agility;
			mineDate.intHeroForce = data.battleViewInfo.heros[0].heroForce;
			mineDate.intHp = data.battleViewInfo.heros[0].hp;
			mineDate.intMp = data.battleViewInfo.heros[0].mp;
			mineDate.physique = data.battleViewInfo.heros[0].physique;
			mineDate.strategy = data.battleViewInfo.heros[0].strategy;
			targethurt = data.battleViewInfo.heros[1].hurt;
			targethurtType = data.battleViewInfo.heros[1].hurtType;
			minehurt = data.battleViewInfo.heros[0].hurt;
			minehurtType = data.battleViewInfo.heros[0].hurtType;
			mybuffList.splice(0,mybuffList.length);
			mydeBuffList.splice(0,mydeBuffList.length);
			targetbuffList.splice(0,targetbuffList.length);
			targetdeBuffList.splice(0,targetdeBuffList.length);
			for(var i = 0; i < data.battleViewInfo.heros[0].buffs.length; i++)
			{
				mybuffList[i] = {
					description:data.battleViewInfo.heros[0].buffs[i].description,//描述
					buffIcon:data.battleViewInfo.heros[0].buffs[i].buffIcon,//图标	
					buffAnomin:data.battleViewInfo.heros[0].buffs[i].buffAnomin,//特效
					remainRound:data.battleViewInfo.heros[0].buffs[i].remainRound ,//剩余回合
				};
			}
			for(var i = 0; i < data.battleViewInfo.heros[0].deBuffs.length; i++)
			{
				mydeBuffList[i] = {
					description:data.battleViewInfo.heros[0].deBuffs[i].description,//描述
					buffIcon:data.battleViewInfo.heros[0].deBuffs[i].buffIcon,//图标	
					buffAnomin:data.battleViewInfo.heros[0].deBuffs.buffAnomin,//特效
					remainRound:data.battleViewInfo.heros[0].deBuffs[i].remainRound ,//剩余回合
				};
			}
			for(var i = 0; i < data.battleViewInfo.heros[1].buffs.length; i++)
			{
				targetbuffList[i] = {
					description:data.battleViewInfo.heros[1].buffs[i].description,//描述
					buffIcon:data.battleViewInfo.heros[1].buffs[i].buffIcon,//图标	
					buffAnomin:data.battleViewInfo.heros[1].buffs[i].buffAnomin,//特效
					remainRound:data.battleViewInfo.heros[1].buffs[i].remainRound ,//剩余回合
				};
			}
			for(var i = 0; i < data.battleViewInfo.heros[1].deBuffs.length; i++)
			{
				targetdeBuffList[i] = {
					description:data.battleViewInfo.heros[1].deBuffs[i].description,//描述
					buffIcon:data.battleViewInfo.heros[1].deBuffs[i].buffIcon,//图标	
					buffAnomin:data.battleViewInfo.heros[1].deBuffs.buffAnomin,//特效
					remainRound:data.battleViewInfo.heros[1].deBuffs[i].remainRound ,//剩余回合
				};
			}
			singleBattle.viewEndForSingleBattle(junqingIdSend);
			
	   break;
	}
	

}

var isW;
var warfareScene = function(index)//战斗场景
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
    isDrawUI[index] = true;
    isRoleAni = false;
    isWarfaceScene = true;
    var winW = gbox.getImage("zc_tb_89").width;
    var winH = gbox.getImage("zc_tb_89").height;
    var winX = (gbox.getScreenW() - winW)/2;
	var winY = (gbox.getScreenH() - winH)/2;
    gbox.addObject(
			{ 
				id : 'warfareScene',
				group : 'levelMenu_2',
				tileset : 'warfareBg',
				x : 0,
				y : 0,
			    frame : 0,
	            action : null,
				poly : [ [0,0], [1440,0], [1440,742],[0,742]],
				initialize : function()
				{
					toys.topview.initialize(this, {});
				    if(startNotification)
				    {
				    	//console.log("charId ==" + charId);
				    	//console.log("junqingIdSend ==" + junqingIdSend);
				    	//console.log("aaaaaaaaaaaaaaaaaa1111111111111");
				    	singleBattle.beginSingleBattle(charId,junqingIdSend,dobattleView,doBattleTurn,doBattleEnd,dobattleRoundTime,doBattleAutoAttack);
				    	//console.log("aaaaaaaaaaaaaaaaaa1111111111111");
				    	startNotification = false;
				    } 
				  
                    (eval(target_wait)).group = 'levelMenu_2';
					skill_fire2.group = 'levelMenu_2';
					(eval(mine_wait)).group = 'levelMenu_2';
					skill_fire2.group= 'levelMenu_2';
					testAni.group= 'levelMenu_2';
					//drawChatDiv(185,515);
					if(gbox._isIndwellDiv("divWindowBg","input"))
					{
						document.body.removeChild(divWindowBg);
						divWindowBg = null;
				 	}
				},
				first : function() 
				{			   
					//console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
					//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
					switch(battleViewType)
					{
						case 1://普攻击
						    testAni.drawAni(false);
							if(gbox.getObject(eval(mine_wait).group,mine_wait) != null && typeof(warfareDataArray) != "undefined" && warfareDataArray.defencePersonId/*leftState == FIRE_START*/)
							{

								if(gbox.getObject('levelMenu_2',mine_wait).aniFinished())
								{
																	
									if(gbox.getObject(skill_fire2.group,"skill_fire2") == null)
									{
										skill_fire2.group = 'levelMenu_2';
										gbox.addObject(skill_fire2);
									}
										gbox.trashObject(gbox.getObject('levelMenu_2',mine_wait));
										eval(mine_wait).group = undefined;
										eval(mine_wait).clearGroup();
										
										if(gbox.getObject(eval(testAni).group,testAni) != null)
										{
											gbox.trashObject(gbox.getObject('levelMenu_3',testAni));
											(eval(testAni)).group = undefined;
											(eval(testAni)).clearGroup();
										}
							     }
														
							  }
							  else{
								if(gbox.getObject(eval(mine_wait).group,mine_wait) == null && gbox.getObject(skill_fire2.group,"skill_fire2") == null)
								{
															   	
									if(!isBattleFinish)
									{
										eval(mine_wait).group = 'levelMenu_2';
										eval(mine_wait).x = 250;
										eval(mine_wait).y = 300;
										gbox.addObject(eval(mine_wait));								         
														               									 
									}
								}
								else 
								{
									if(gbox.getObject(skill_fire2.group,"skill_fire2") != null)
									{
																   	 	 
									    if(gbox.getObject('levelMenu_2',"skill_fire2").aniFinished())
										{
											if(gbox.getObject(effect2.group,"effect2") == null)
											{
												effect2.group = 'levelMenu_2';
												gbox.addObject(effect2);									
											}
																	    
											if(gbox.getObject(eval(mine_wait).group,mine_wait) == null)
											{	
												eval(mine_wait).group = 'levelMenu_2';
												gbox.addObject(eval(mine_wait));
											}
											gbox.trashObject(gbox.getObject('levelMenu_2',"skill_fire2"));  
											skill_fire2.group = undefined;
											skill_fire2.clearGroup();	
											if(typeof(warfareDataArray)!= "undefined")
												tmpHurt = warfareDataArray.defencePersonHurt;					
											warfareDataArray = undefined;
											warfareScene(getClickObjectIndex());
											changeMap('cityMenuLayer'); 				
										}									
									}						   
									if(gbox.getObject(effect2.group,"effect2") != null)
										{
																	   
												isOgreHurt = true;
									            if(gbox.getObject('levelMenu_2',"effect2").aniFinished())
												{
																	 	
													gbox.trashObject(gbox.getObject('levelMenu_2',"effect2"));  
													effect2.group = undefined;
													effect2.clearGroup();
													singleBattle.viewEndForSingleBattle(junqingIdSend);
													isOgreHurt = false;
												}									
										}
									}
								}					
                                ////////////////////////////////////////////////////////////////
								if(gbox.getObject((eval(target_wait)).group,target_wait) != null  && typeof(warfareDataArray) != "undefined" && warfareDataArray.attackPersonId/*rightState == FIRE_START*/)
								{
									if(gbox.getObject('levelMenu_2',target_wait).aniFinished())
									{
										if(gbox.getObject(skill_fire2.group,"woman_commonSkill") == null)
										{
											woman_commonSkill.group = 'levelMenu_2';
											gbox.addObject(woman_commonSkill);
										}
										gbox.trashObject(gbox.getObject('levelMenu_2',target_wait));
										(eval(target_wait)).group = undefined;
										(eval(target_wait)).clearGroup();											      
									}
								}
							    else{
										if(gbox.getObject((eval(target_wait)).group,target_wait) == null && gbox.getObject(woman_commonSkill.group,"woman_commonSkill") == null)
										{
											if(!isBattleFinish){
												(eval(target_wait)).group = 'levelMenu_2';
												eval(target_wait).x = 1086;
												eval(target_wait).y = 280;
												gbox.addObject((eval(target_wait)));
											}
										}
										else 
										{
											if(gbox.getObject(skill_fire2.group,"woman_commonSkill") != null)
											{
									            if(gbox.getObject('levelMenu_2',"woman_commonSkill").aniFinished())
												{
									                            		 
									 				if(gbox.getObject(effect0.group,"effect0") == null)
													{
														effect0.group = 'levelMenu_2';
														gbox.addObject(effect0);
													}
									                            		 
													if(gbox.getObject((eval(target_wait)).group,target_wait) == null)
													{
														(eval(target_wait)).group = 'levelMenu_2';
														gbox.addObject((eval(target_wait)));
													}
														gbox.trashObject(gbox.getObject('levelMenu_2',"woman_commonSkill"));  
														woman_commonSkill.group = undefined;
														woman_commonSkill.clearGroup();
														if(typeof(warfareDataArray)!= "undefined")
														tmpHurt = warfareDataArray.defencePersonHurt;
														warfareDataArray = undefined;
												 }									
											  }
										if(gbox.getObject(effect0.group,"effect0") != null)
											{
												isCharHurt = true;
																	   
									            if(gbox.getObject('levelMenu_2',"effect0").aniFinished())
												{		
													gbox.trashObject(gbox.getObject('levelMenu_2',"effect0"));  
													singleBattle.viewEndForSingleBattle(junqingIdSend);
													effect0.group = undefined;
													effect0.clearGroup();
													isCharHurt = false;
												}									
											}
										}
								}	

						break;
						case 2://技能攻击
						   
						    switch(huiheId)
						    {
						    	case -1:
						    	    testAni.drawAni(true);
						    	    eval(mine_wait).group = 'levelMenu_2';
									eval(mine_wait).x = 250;
									eval(mine_wait).y = 300;
									gbox.addObject(eval(mine_wait));
									if(gbox.getObject(eval(testAni).group,testAni) != null)
									{
										gbox.trashObject(gbox.getObject('levelMenu_2',testAni));
										(eval(testAni)).group = undefined;
										(eval(testAni)).clearGroup();
									}else
									{
										(eval(testAni)).group = 'levelMenu_2';
										 eval(testAni).x = 943;
										 eval(testAni).y = 300;
										 gbox.addObject((eval(testAni)));
									}	
									(eval(target_wait)).group = 'levelMenu_2';
									eval(target_wait).x = 1086;
									eval(target_wait).y = 300;
									gbox.addObject((eval(target_wait)));	
						    	    break;
						    	case -2:
						    	    testAni.drawAni(true);
						    	    eval(mine_wait).group = 'levelMenu_2';
									eval(mine_wait).x = 250;
									eval(mine_wait).y = 300;
									gbox.addObject(eval(mine_wait));
									if(gbox.getObject(eval(testAni).group,testAni) != null)
									{
										gbox.trashObject(gbox.getObject('levelMenu_2',testAni));
										(eval(testAni)).group = undefined;
										(eval(testAni)).clearGroup();
									}else
									{
										(eval(testAni)).group = 'levelMenu_2';
										 eval(testAni).x = 250;
										 eval(testAni).y = 300;
										 gbox.addObject((eval(testAni)));
									}	
									(eval(target_wait)).group = 'levelMenu_2';
									eval(target_wait).x = 1086;
									eval(target_wait).y = 300;
									gbox.addObject((eval(target_wait)));	
						    	    break;
						    	case 0:
						    	case 1:
						    	    testAni.drawAni(false);
									if(gbox.getObject(eval(mine_wait).group,mine_wait) != null && typeof(warfareDataArray) != "undefined" && warfareDataArray.defencePersonId/*leftState == FIRE_START*/)
									{
		
										if(gbox.getObject('levelMenu_2',mine_wait).aniFinished())
										{
																			
											if(gbox.getObject(skill_fire2.group,"skill_fire2") == null)
											{
												skill_fire2.group = 'levelMenu_2';
												gbox.addObject(skill_fire2);
											}
												gbox.trashObject(gbox.getObject('levelMenu_2',mine_wait));
												eval(mine_wait).group = undefined;
												eval(mine_wait).clearGroup();
												
												if(gbox.getObject(eval(testAni).group,testAni) != null)
												{
													gbox.trashObject(gbox.getObject('levelMenu_3',testAni));
													(eval(testAni)).group = undefined;
													(eval(testAni)).clearGroup();
												}
									     }
																
									  }
									  else{
										if(gbox.getObject(eval(mine_wait).group,mine_wait) == null && gbox.getObject(skill_fire2.group,"skill_fire2") == null)
										{
																	   	
											if(!isBattleFinish)
											{
												eval(mine_wait).group = 'levelMenu_2';
												eval(mine_wait).x = 250;
												eval(mine_wait).y = 300;
												gbox.addObject(eval(mine_wait));								         
																               									 
											}
										}
										else 
										{
											if(gbox.getObject(skill_fire2.group,"skill_fire2") != null)
											{
																		   	 	 
											    if(gbox.getObject('levelMenu_2',"skill_fire2").aniFinished())
												{
													if(gbox.getObject(effect2.group,"effect2") == null)
													{
														effect2.group = 'levelMenu_2';
														gbox.addObject(effect2);									
													}
																			    
													if(gbox.getObject(eval(mine_wait).group,mine_wait) == null)
													{		
														eval(mine_wait).group = 'levelMenu_2';
														gbox.addObject(eval(mine_wait));	
													}
													gbox.trashObject(gbox.getObject('levelMenu_2',"skill_fire2"));  
													skill_fire2.group = undefined;
													skill_fire2.clearGroup();											
													warfareDataArray = undefined;
													warfareScene(getClickObjectIndex());
													changeMap('cityMenuLayer'); 				
												}									
											}					   
												if(gbox.getObject(effect2.group,"effect2") != null)
												{
																			   
														isOgreHurt = true;
											            if(gbox.getObject('levelMenu_2',"effect2").aniFinished())
														{
																			 	
															gbox.trashObject(gbox.getObject('levelMenu_2',"effect2"));  
															effect2.group = undefined;
															effect2.clearGroup();
															singleBattle.viewEndForSingleBattle(junqingIdSend);
															isOgreHurt = false;
														}									
												}
											}
										}						
		                                ////////////////////////////////////////////////////////////////
										if(gbox.getObject((eval(target_wait)).group,target_wait) != null  && typeof(warfareDataArray) != "undefined" && warfareDataArray.attackPersonId/*rightState == FIRE_START*/)
										{
											if(gbox.getObject('levelMenu_2',target_wait).aniFinished())
											{
												if(gbox.getObject(skill_fire2.group,"woman_commonSkill") == null)
												{
													woman_commonSkill.group = 'levelMenu_2';
													gbox.addObject(woman_commonSkill);
												}
												gbox.trashObject(gbox.getObject('levelMenu_2',target_wait));
												(eval(target_wait)).group = undefined;
												(eval(target_wait)).clearGroup();
												
												if(gbox.getObject(eval(testAni).group,testAni) != null)
												{
													gbox.trashObject(gbox.getObject('levelMenu_3',testAni));
													(eval(testAni)).group = undefined;
													(eval(testAni)).clearGroup();
												}
																	      
											}
										}
									    else{
												if(gbox.getObject((eval(target_wait)).group,target_wait) == null && gbox.getObject(woman_commonSkill.group,"woman_commonSkill") == null)
												{
													if(!isBattleFinish){
														(eval(target_wait)).group = 'levelMenu_2';
														eval(target_wait).x = 1086;
														eval(target_wait).y = 280;
														gbox.addObject((eval(target_wait)));
													}
												}
												else 
												{
													if(gbox.getObject(skill_fire2.group,"woman_commonSkill") != null)
													{
											            if(gbox.getObject('levelMenu_2',"woman_commonSkill").aniFinished())
														{
											                            		 
											 				if(gbox.getObject(effect0.group,"effect0") == null)
															{
																effect0.group = 'levelMenu_2';
																gbox.addObject(effect0);
															}
											                            		 
															if(gbox.getObject((eval(target_wait)).group,target_wait) == null)
															{
																(eval(target_wait)).group = 'levelMenu_2';
																gbox.addObject((eval(target_wait)));
															}
																gbox.trashObject(gbox.getObject('levelMenu_2',"woman_commonSkill"));  
																woman_commonSkill.group = undefined;
																woman_commonSkill.clearGroup();
																
																warfareDataArray = undefined;
														 }									
													  }
													if(gbox.getObject(effect0.group,"effect0") != null)
													{
														isCharHurt = true;
																			   
											            if(gbox.getObject('levelMenu_2',"effect0").aniFinished())
														{		
															gbox.trashObject(gbox.getObject('levelMenu_2',"effect0"));  
															singleBattle.viewEndForSingleBattle(junqingIdSend);
															effect0.group = undefined;
															effect0.clearGroup();
															isCharHurt = false;
														}									
													}
												}
										}	
						    	  
						    	break;
						    }
							console.log("技能攻击！！！");
						break;
					   case 3://会合结果
					       testAni.drawAni(false);
							if(gbox.getObject(eval(mine_wait).group,mine_wait) != null && typeof(warfareDataArray) != "undefined" && warfareDataArray.defencePersonId/*leftState == FIRE_START*/)
							{

								if(gbox.getObject('levelMenu_2',mine_wait).aniFinished())
								{
																	
									if(gbox.getObject(skill_fire2.group,"skill_fire2") == null)
									{
										skill_fire2.group = 'levelMenu_2';
										gbox.addObject(skill_fire2);
									}
										gbox.trashObject(gbox.getObject('levelMenu_2',mine_wait));
										eval(mine_wait).group = undefined;
										eval(mine_wait).clearGroup();
										
										if(gbox.getObject(eval(testAni).group,testAni) != null)
										{
											gbox.trashObject(gbox.getObject('levelMenu_3',testAni));
											(eval(testAni)).group = undefined;
											(eval(testAni)).clearGroup();
										}
							     }
														
							  }
							  else{
								if(gbox.getObject(eval(mine_wait).group,mine_wait) == null && gbox.getObject(skill_fire2.group,"skill_fire2") == null)
								{
															   	
									if(!isBattleFinish)
									{
										eval(mine_wait).group = 'levelMenu_2';
										eval(mine_wait).x = 250;
										eval(mine_wait).y = 300;
										gbox.addObject(eval(mine_wait));								         
														               									 
									}
								}
								else 
								{
									if(gbox.getObject(skill_fire2.group,"skill_fire2") != null)
									{
																   	 	 
									    if(gbox.getObject('levelMenu_2',"skill_fire2").aniFinished())
										{
											if(gbox.getObject(effect2.group,"effect2") == null)
											{
												effect2.group = 'levelMenu_2';
												gbox.addObject(effect2);									
											}
																	    
											if(gbox.getObject(eval(mine_wait).group,mine_wait) == null)
											{	
												eval(mine_wait).group = 'levelMenu_2';
												gbox.addObject(eval(mine_wait));
											}
											gbox.trashObject(gbox.getObject('levelMenu_2',"skill_fire2"));  
											skill_fire2.group = undefined;
											skill_fire2.clearGroup();								
											warfareDataArray = undefined;
											warfareScene(getClickObjectIndex());
											changeMap('cityMenuLayer'); 				
										}									
									}						   
										if(gbox.getObject(effect2.group,"effect2") != null)
										{
																	   
												isOgreHurt = true;
									            if(gbox.getObject('levelMenu_2',"effect2").aniFinished())
												{
																	 	
													gbox.trashObject(gbox.getObject('levelMenu_2',"effect2"));  
													effect2.group = undefined;
													effect2.clearGroup();
													singleBattle.viewEndForSingleBattle(junqingIdSend);
													isOgreHurt = false;
												}									
										}
									}
								}					
                                ////////////////////////////////////////////////////////////////
								if(gbox.getObject((eval(target_wait)).group,target_wait) != null  && typeof(warfareDataArray) != "undefined" && warfareDataArray.attackPersonId/*rightState == FIRE_START*/)
								{
									if(gbox.getObject('levelMenu_2',target_wait).aniFinished())
									{
										if(gbox.getObject(skill_fire2.group,"woman_commonSkill") == null)
										{
											woman_commonSkill.group = 'levelMenu_2';
											gbox.addObject(woman_commonSkill);
										}
										gbox.trashObject(gbox.getObject('levelMenu_2',target_wait));
										(eval(target_wait)).group = undefined;
										(eval(target_wait)).clearGroup();											      
									}
								}
							    else{
										if(gbox.getObject((eval(target_wait)).group,target_wait) == null && gbox.getObject(woman_commonSkill.group,"woman_commonSkill") == null)
										{
											if(!isBattleFinish){
												(eval(target_wait)).group = 'levelMenu_2';
												eval(target_wait).x = 1086;
												eval(target_wait).y = 280;
												gbox.addObject((eval(target_wait)));
											}
										}
										else 
										{
											if(gbox.getObject(skill_fire2.group,"woman_commonSkill") != null)
											{
									            if(gbox.getObject('levelMenu_2',"woman_commonSkill").aniFinished())
												{
									                            		 
									 				if(gbox.getObject(effect0.group,"effect0") == null)
													{
														effect0.group = 'levelMenu_2';
														gbox.addObject(effect0);
													}
									                            		 
													if(gbox.getObject((eval(target_wait)).group,target_wait) == null)
													{
														(eval(target_wait)).group = 'levelMenu_2';
														gbox.addObject((eval(target_wait)));
													}
														gbox.trashObject(gbox.getObject('levelMenu_2',"woman_commonSkill"));  
														woman_commonSkill.group = undefined;
														woman_commonSkill.clearGroup();
														
														warfareDataArray = undefined;
												 }									
											  }
										if(gbox.getObject(effect0.group,"effect0") != null)
											{
												isCharHurt = true;
																	   
									            if(gbox.getObject('levelMenu_2',"effect0").aniFinished())
												{		
													gbox.trashObject(gbox.getObject('levelMenu_2',"effect0"));  
													singleBattle.viewEndForSingleBattle(junqingIdSend);
													effect0.group = undefined;
													effect0.clearGroup();
													isCharHurt = false;
												}									
											}
										}
								}
					   break;
					   default:
						    testAni.drawAni(false);
							if(gbox.getObject(eval(mine_wait).group,mine_wait) != null && typeof(warfareDataArray) != "undefined" && warfareDataArray.defencePersonId/*leftState == FIRE_START*/)
							{

								if(gbox.getObject('levelMenu_2',mine_wait).aniFinished())
								{
																	
									if(gbox.getObject(skill_fire2.group,"skill_fire2") == null)
									{
										skill_fire2.group = 'levelMenu_2';
										gbox.addObject(skill_fire2);
									}
										gbox.trashObject(gbox.getObject('levelMenu_2',mine_wait));
										eval(mine_wait).group = undefined;
										eval(mine_wait).clearGroup();
										
										if(gbox.getObject(eval(testAni).group,testAni) != null)
										{
											gbox.trashObject(gbox.getObject('levelMenu_3',testAni));
											(eval(testAni)).group = undefined;
											(eval(testAni)).clearGroup();
										}
							     }
														
							  }
							  else{
								if(gbox.getObject(eval(mine_wait).group,mine_wait) == null && gbox.getObject(skill_fire2.group,"skill_fire2") == null)
								{
															   	
									if(!isBattleFinish)
									{
										eval(mine_wait).group = 'levelMenu_2';
										eval(mine_wait).x = 250;
										eval(mine_wait).y = 300;
										gbox.addObject(eval(mine_wait));								         
														               									 
									}
								}
								else 
								{
									if(gbox.getObject(skill_fire2.group,"skill_fire2") != null)
									{
																   	 	 
									    if(gbox.getObject('levelMenu_2',"skill_fire2").aniFinished())
										{
											if(gbox.getObject(effect2.group,"effect2") == null)
											{
												effect2.group = 'levelMenu_2';
												gbox.addObject(effect2);									
											}
																	    
											if(gbox.getObject(eval(mine_wait).group,mine_wait) == null)
											{	
												eval(mine_wait).group = 'levelMenu_2';
												gbox.addObject(eval(mine_wait));
											}
											gbox.trashObject(gbox.getObject('levelMenu_2',"skill_fire2"));  
											skill_fire2.group = undefined;
											skill_fire2.clearGroup();								
											warfareDataArray = undefined;
											warfareScene(getClickObjectIndex());
											changeMap('cityMenuLayer'); 				
										}									
									}						   
										if(gbox.getObject(effect2.group,"effect2") != null)
										{
																	   
												isOgreHurt = true;
									            if(gbox.getObject('levelMenu_2',"effect2").aniFinished())
												{
																	 	
													gbox.trashObject(gbox.getObject('levelMenu_2',"effect2"));  
													effect2.group = undefined;
													effect2.clearGroup();
													singleBattle.viewEndForSingleBattle(junqingIdSend);
													isOgreHurt = false;
												}									
										}
									}
								}					
                                ////////////////////////////////////////////////////////////////
								if(gbox.getObject((eval(target_wait)).group,target_wait) != null  && typeof(warfareDataArray) != "undefined" && warfareDataArray.attackPersonId/*rightState == FIRE_START*/)
								{
									if(gbox.getObject('levelMenu_2',target_wait).aniFinished())
									{
										if(gbox.getObject(skill_fire2.group,"woman_commonSkill") == null)
										{
											woman_commonSkill.group = 'levelMenu_2';
											gbox.addObject(woman_commonSkill);
										}
										gbox.trashObject(gbox.getObject('levelMenu_2',target_wait));
										(eval(target_wait)).group = undefined;
										(eval(target_wait)).clearGroup();											      
									}
								}
							    else{
										if(gbox.getObject((eval(target_wait)).group,target_wait) == null && gbox.getObject(woman_commonSkill.group,"woman_commonSkill") == null)
										{
											if(!isBattleFinish){
												(eval(target_wait)).group = 'levelMenu_2';
												eval(target_wait).x = 1086;
												eval(target_wait).y = 280;
												gbox.addObject((eval(target_wait)));
											}
										}
										else 
										{
											if(gbox.getObject(skill_fire2.group,"woman_commonSkill") != null)
											{
									            if(gbox.getObject('levelMenu_2',"woman_commonSkill").aniFinished())
												{
									                            		 
									 				if(gbox.getObject(effect0.group,"effect0") == null)
													{
														effect0.group = 'levelMenu_2';
														gbox.addObject(effect0);
													}
									                            		 
													if(gbox.getObject((eval(target_wait)).group,target_wait) == null)
													{
														(eval(target_wait)).group = 'levelMenu_2';
														gbox.addObject((eval(target_wait)));
													}
														gbox.trashObject(gbox.getObject('levelMenu_2',"woman_commonSkill"));  
														woman_commonSkill.group = undefined;
														woman_commonSkill.clearGroup();
														
														warfareDataArray = undefined;
												 }									
											  }
										if(gbox.getObject(effect0.group,"effect0") != null)
											{
												isCharHurt = true;
																	   
									            if(gbox.getObject('levelMenu_2',"effect0").aniFinished())
												{		
													gbox.trashObject(gbox.getObject('levelMenu_2',"effect0"));  
													singleBattle.viewEndForSingleBattle(junqingIdSend);
													effect0.group = undefined;
													effect0.clearGroup();
													isCharHurt = false;
												}									
											}
										}
								}
						   break;
					}
//					//处理战斗胜负结果
					if(typeof(isWin) != "undefined")
							{
								if(isWin)//将胜
								{
									targetDate.intHp = 0;
									if(gbox.getObject(eval(mine_wait).group,mine_wait) != null)
									{	
										gbox.getObject('levelMenu_2',mine_wait).move(-50,0);
										gbox.trashObject(gbox.getObject('levelMenu_2',target_wait));
										eval(target_wait).group = undefined;
										eval(target_wait).clearGroup();			
										gbox.trashObject(gbox.getObject('levelMenu_2',mine_wait));
										eval(mine_wait).group = undefined;
										eval(mine_wait).clearGroup();					
										(eval(defence_loser)).group = 'levelMenu_2';
										gbox.addObject((eval(defence_loser)));
									}
									
								}
								else//怪胜
								{
									mineDate.intHp = 0;
									if(gbox.getObject(eval(target_wait).group,target_wait) != null)
									{
										gbox.getObject('levelMenu_2',target_wait).move(100,0);
										gbox.trashObject(gbox.getObject('levelMenu_2',mine_wait));
										eval(mine_wait).group = undefined;
										eval(mine_wait).clearGroup();
										//(eval(char_loser)).group = 'levelMenu_2';
										//gbox.addObject((eval(char_loser)));
									}
								}	
								isW = isWin;
								isWin = undefined;
								isBattleFinish = true;
							}
							
							if(gbox.getObject(eval(char_loser).group,"char_loser") != null)
							{
								eval(char_loser).setLastFrame();
							}
							
							if(gbox.getObject(eval(defence_loser).group,"defence_loser") != null)
							{
								eval(defence_loser).setLastFrame();
							}
				},
				myclick : function()
				{
					//是否攻击
					if(lastTouchMoveX > 1205 && lastTouchMoveX < 1261 && lastTouchMoveY > 666 && lastTouchMoveY < 736)
					{
						if(warfareButtonCtr)
						{
							singleBattle.normalAttackForSingleBattle(junqingIdSend,charId,0,1);
						}
						   
					}
					
					//手动/自动
					if(lastTouchMoveX > 1265 && lastTouchMoveX < 1321 && lastTouchMoveY > 666 && lastTouchMoveY < 736)
					{
						singleBattle.autoAttackForSingleBattle(junqingIdSend,charId);
					}
					//释放技能
					if(warfareButtonCtr)
                        {
                        
                        	for(var i = 0 ; i<operateSkillArray.length; i++)
	                        {
	                        	if(lastTouchMoveX > 513 && lastTouchMoveX < (558 + i*51) && lastTouchMoveY > 686 && lastTouchMoveY < 738)
	                        	{
	                        		
	                        		if(operateSkillArray[i].canUse)
	                        		{
	                        			
	                        			singleBattle.skillForSingleBattle(junqingIdSend,i);
	                        			return;
	                        		}
	                        		  
	                        	}
	                      
	                        }
                        }
					//逃跑
					if(lastTouchMoveX > 1355 && lastTouchMoveX < 1411 && lastTouchMoveY > 666 && lastTouchMoveY < 736)
					{
						
						if(warfareButtonCtr)
						{
							warfareButtonCtr = false;
							singleBattle.escapeForSingleBattle(junqingIdSend,charId);
						}
						   
					}
					
					if(lastTouchMoveX > 983 && lastTouchMoveX < 1022 && 
							lastTouchMoveY > 178 && lastTouchMoveY < 202)
					{
						if(isBattleFinish)
						{
							   mydeBuffList.splice(0,mydeBuffList.length);
							   mybuffList.splice(0,mybuffList.length);
							   targetbuffList.splice(0,targetbuffList.length);
							   targetdeBuffList.splice(0,targetdeBuffList.length);
							   sendsMinekillObject= undefined;
							   sendsTargetkillObject= undefined;
		                       leftState = FIRE_WAIT;
		                       rightState = FIRE_WAIT;
		                       eval(char_loser).clearGroup();
		                       eval(defence_loser).clearGroup();
		                       gbox.clearGroup("levelMenu_2");
		                       
		                       warfareButtonCtr = true;
							   isWarfaceScene = false;
							   cometd.unsubscribe(battleSubScribe);
							   cometd.unsubscribe(battleSubScribeMine);
							   enterCityMenu(curGroup);
			                   changeMap('cityMenuLayer');	
						}
						 
					}
					else
					{
						warfareScene(getClickObjectIndex());
                        changeMap('cityMenuLayer'); 						
					}
                   
				},
				blit : function()
				{        
	
					if(isDrawUI[index] && isWarfaceScene)
                    {
	                    gbox.blitTile(gbox.getBufferContext(),
									{
										tileset : 'warfareBg',
										tile : 0,
										dx :0,
										dy :0,
										fliph : this.fliph,
										flipv : this.flipv,
										camera : this.camera,
										alpha : 1.0
									});	
	                    
					    
//					    
//					    
						switch(battleViewType)
						{
							case 2://技能攻击
						    	if(huiheId == 0)
						    	{//我方释放技能
						    	    if(typeof(sendsMinekillObject) != "undefined")
						    	    {
						    	    	gbox.drawString(sendsMinekillObject.skillName,250,280,'#FF0000',25);
							    		if(sendsMinekillObject.mineEffectValue > 0)
							    		{
							    			 gbox.drawString("技能收获:",250,600,'#FF0000',25);
		                                     drawNum(370,585,30,0,"" + sendsMinekillObject.mineEffectValue,anim_num,"num_1",this.tileset);
							    		}
		                                gbox.drawString("技能伤害:",953,600,'#FF0000',25);
		                                if(sendsMinekillObject.targetEffectValue < 0)
		                                 sendsMinekillObject.targetEffectValue = Math.abs(sendsMinekillObject.targetEffectValue);	         
		                                drawNum(1073,585,30,0,"" + sendsMinekillObject.targetEffectValue,anim_num,"num_2",this.tileset);
						    	    }
						    		
						    	}
						    	if(huiheId == -2)
						    	{
						    		//我方(自己给自己使用技能)
						    		gbox.drawString(sendsMinekillObject.skillName,250,280,'#FF0000',25);
						    	}
						    	if(huiheId == 1)
						    	{
						    		//敌人释放技能
						    		if(typeof(sendsTargetkillObject) != "undefined")
						    		{
						    			gbox.drawString(sendsTargetkillObject.skillName,953,280,'#FF0000',25);
							    		if(sendsTargetkillObject.mineEffectValue > 0)
							    		{
							    			gbox.drawString("技能收获:",953,600,'#FF0000',25);
							    		    drawNum(1073,585,30,0,"" + sendsTargetkillObject.mineEffectValue,anim_num,"num_1",this.tileset);
							    		}
		                                gbox.drawString("技能伤害:",250,600,'#FF0000',25);
		                                if(sendsTargetkillObject.targetEffectValue < 0)
		                                 sendsTargetkillObject.targetEffectValue = Math.abs(sendsTargetkillObject.targetEffectValue);	
		                                drawNum(370,585,30,0,"" + sendsTargetkillObject.targetEffectValue,anim_num,"num_2",this.tileset);
						    		}
						    		
						    	}
						    	if(huiheId == -1)
						    	{
						    		//敌人释放技能(敌人给自己使用技能)
						    		gbox.drawString(sendsTargetkillObject.skillName,953,280,'#FF0000',25);
						    	}
						    	
								
							break;
						}           
						/*
						 *  绘制本方UI
						 */
						if(typeof(gbox.getImage(mineImage)) != "undefined")
						{
							gbox.drawImage(mineImage,34,485);//绘制本方人物头像
						}
						
						gbox.drawImage('zc_tb_15',12,453);//绘制本方背景图片
						gbox.drawImage('zc_tb_62',22,641);
						gbox.drawString("" + mineDate.heroName,63, 641,'#E5D07B',11);//绘制名称
						gbox.drawImage('zc_tb_55',22,658);
						gbox.drawString("" + mineDate.level,63, 658,'#E5D07B',11);//绘制等级
						gbox.drawImage('zc_tb_61',22,673);
						gbox.drawString("" + mineDate.intHeroForce,63, 673,'#E5D07B',11);//绘制武力
						gbox.drawImage('zc_tb_58',22,690);
						gbox.drawString("" + mineDate.strategy,63, 690,'#E5D07B',11);//绘制谋略
						gbox.drawImage('zc_tb_59',22,705);
						gbox.drawString("" + mineDate.agility,63, 705,'#E5D07B',11);//绘制身法
						gbox.drawImage('zc_tb_60',22,722);
						gbox.drawString("" + mineDate.physique,63, 722,'#E5D07B',11);//绘制体质
						var bw = Math.floor(((130) * mineDate.intHp) / mineDate.intHpMax); 
					    gbox.setClip(gbox.getBufferContext(),20,623,bw,5);
					    gbox.drawImage("zc_tb_16",20,623);     
					    gbox.restoreClip(gbox.getBufferContext());					    
					    var bw = Math.floor(((130) * mineDate.intMp) / mineDate.intMpMax); 
					    gbox.setClip(gbox.getBufferContext(),20,630,bw,5);
					    gbox.drawImage("zc_tb_17",20,630);
					    gbox.restoreClip(gbox.getBufferContext());	
						/*
						 *  绘制敌方UI
						 */
						gbox.drawImage('zc_tb_14',1230,275);
						if(typeof(gbox.getImage(targetImage)) != "undefined")
						{
							gbox.drawImage(targetImage,1234,295);
						}
                        
                        gbox.drawImage('zc_tb_62',1313,300);
						gbox.drawString("" + targetDate.heroName,1359, 300,'#E5D07B',11);//绘制名称
						gbox.drawImage('zc_tb_55',1313,318);
						gbox.drawString("" + targetDate.level,1359, 318,'#E5D07B',11);//绘制等级
						gbox.drawImage('zc_tb_61',1313,336);
						gbox.drawString("" + targetDate.intHeroForce,1359, 336,'#E5D07B',11);//绘制武力
						gbox.drawImage('zc_tb_58',1313,354);
						gbox.drawString("" + targetDate.strategy,1359, 354,'#E5D07B',11);//绘制谋略
						gbox.drawImage('zc_tb_59',1313,372);
						gbox.drawString("" + targetDate.agility,1359, 372,'#E5D07B',11);//绘制身法
						gbox.drawImage('zc_tb_60',1313,390);
						gbox.drawString("" + targetDate.physique,1359, 390,'#E5D07B',11);//绘制体质
						
                        var bw = Math.floor(((70) * targetDate.intHp) / targetDate.intHpMax); 
					    gbox.setClip(gbox.getBufferContext(),1234,390,bw,5);
					    gbox.drawImage("zc_tb_19",1234,390);     
					    gbox.restoreClip(gbox.getBufferContext());					    
					    var bw = Math.floor(((70) * targetDate.intMp) / targetDate.intMpMax); 
					    gbox.setClip(gbox.getBufferContext(),1234,396,bw,5);
					    gbox.drawImage("zc_tb_20",1234,396);
					    gbox.restoreClip(gbox.getBufferContext());	
					    //////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////
                        /*
                         * 技能释放条
                         */
                         gbox.drawImage('zc_tb_57',475,685);
                         /*
                         * 绘制技能图
                         */            
                        if(warfareButtonCtr)
                        {
                        	for(var i = 0 ; i<operateSkillArray.length; i++)
	                        {    
	                        	if(typeof(gbox.getImage(operateSkillArray[i].skillIcon)) != "undefined")                   
	                        	   gbox.drawImage(operateSkillArray[i].skillIcon,513 + i*49,691);
	                        	if(operateSkillArray[i].remainRound != 0)
	                        	{
	                        		gbox.drawString(operateSkillArray[i].remainRound ,513 + i*51,685,'#ff0000',50);
	                        	}
	                        	
	                        }
                        }
                        else
                        {
                        	for(var i = 0 ; i<operateSkillArray.length; i++)
	                        {    
	                        	if(typeof(gbox.getImage(operateSkillArray[i].skillIcon)) != "undefined")                   
	                        	   gbox.drawImage(operateSkillArray[i].skillIcon,513 + i*49,691);                   
	                        	gbox.drawImage("prohibitClick",513 + i*49,691);
	                        	if(operateSkillArray[i].remainRound != 0)
	                        	{
	                        		gbox.drawString(operateSkillArray[i].remainRound ,513 + i*51,685,'#ff0000',50);
	                        	}
	                        	
	                        }
                        }
                        if(warfareButtonCtr)
                        {
                        	for(var i = 0 ; i<operateSkillArray.length; i++)
	                        {
	                        	if((((513 + i*49) < touchMoveX) && (touchMoveX < (560 + i*49))) && ((685 < touchMoveY) && (touchMoveY < 732)))
	                         	{
	                         		gbox.drawMessageObject(operateSkillTip(operateSkillArray[i]), 511 + i*49, 644, 100, 12, '#FFFFFF');
	                         	}
	                        }
                        }
                        /*
                         *  绘制BUFF图
                         */
                        for(var i =0; i<mybuffList.length; i++)
                        {	
                        	gbox.drawImage(mybuffList[i].buffIcon,15 + i*32,390);
                        }
                        for(var i =0; i<mydeBuffList.length; i++)
                        {
                        	gbox.drawImage(mydeBuffList[i].buffIcon,15 + i*32,422);
                        }
                        for(var i =0; i<mybuffList.length; i++)
                        {
                        	if((((15 + i*32) < touchMoveX) && (touchMoveX < (45 + i*32))) && ((390 < touchMoveY) && (touchMoveY < 420)))
                         	{
                         		gbox.drawMessageObject(buffDescriptionTip(mybuffList[i]), touchMoveX, touchMoveY, 100, 12, '#FFFFFF');
                         	}
                        }
                        for(var i =0; i<mydeBuffList.length; i++)
                        {
                        	if((((15 + i*32) < touchMoveX) && (touchMoveX < (45 + i*32))) && ((422 < touchMoveY) && (touchMoveY < 455)))
                         	{
                         		gbox.drawMessageObject(buffDescriptionTip(mydeBuffList[i]), touchMoveX, touchMoveY, 100, 12, '#FFFFFF');
                         	}
                        }
                        for(var i =0; i<targetbuffList.length; i++)
                        {
                        	gbox.drawImage(targetbuffList[i].buffIcon,1231 + i*32,216);
                        }
                        for(var i =0; i<targetdeBuffList.length; i++)
                        {
                        	gbox.drawImage(targetdeBuffList[i].buffIcon,1231 + i*32,247);
                        }
                        for(var i =0; i<targetbuffList.length; i++)
                        {
                        	if((((1231 + i*32) < touchMoveX) && (touchMoveX < (1261 + i*32))) && ((216 < touchMoveY) && (touchMoveY < 247)))
                         	{
                         		gbox.drawMessageObject(buffDescriptionTip(targetbuffList[i]), touchMoveX, touchMoveY, 100, 12, '#FFFFFF');
                         	}
                        }
                        for(var i =0; i<targetdeBuffList.length; i++)
                        {
                        	if((((1231 + i*32) < touchMoveX) && (touchMoveX < (1261 + i*32))) && ((249 < touchMoveY) && (touchMoveY < 280)))
                         	{
                         		gbox.drawMessageObject(buffDescriptionTip(targetdeBuffList[i]), touchMoveX, touchMoveY, 100, 12, '#FFFFFF');
                         	}
                        }
                        ////////////////////////////////////////////
						gbox.drawImage('zc_tb_08',1104,669);
						
						if(!warfareButtonCtr)
						{
							gbox.drawImage('zc_tb_100',1215,683);
							gbox.drawImage('zc_tb_01',1365,683);
						}
						
                        if(warfareButtonCtr)
                        {
                        	gbox.drawImage('timeBg',640,11);
                        	if(timeCount!=0)
                        	{
                        		var tzX = 0 + (1440 - gbox.getImage('zc_tb_' + (30 + timeCount)).width)/2;
                        	     gbox.drawImage('zc_tb_' + (30 + timeCount),tzX,65);
                        	}
                        	
                        }
                        
                       
                        if(isManual){
                        	gbox.drawImage('zc_tb_112',1290,678);
                        }

    					if(isBattleFinish)
    					{
    						gbox.drawImage('zc_tb_89',winX,winY);
                            gbox.blitTile(gbox.getBufferContext(),
							{
												tileset : 'ty_an_18',
												tile : 0,
												dx :1002,
												dy :184,
												fliph : this.fliph,
												flipv : this.flipv,
												camera : this.camera,
												alpha : 1.0
							});
    						
    						if(isW){
    							var titleX = winX + (winW - gbox.getImage("zc_tb_91").width)/2;
    							gbox.drawImage('zc_tb_90',0,0);
    							gbox.drawImage('zc_tb_91',titleX,winY);
    						}else{
    							var titleX = winX + (winW - gbox.getImage("zc_tb_93").width)/2;
    							gbox.drawImage('zc_tb_92',0,0);
    							gbox.drawImage('zc_tb_93',titleX,winY);
    						}
    						
    						
//    						gbox.drawImage('shortBg',915,550);
//    						var wX = 915 + (gbox.getImage("shortBg").width - gbox.getImage("inter").width)/2;
//    						var wY = 550 + (gbox.getImage("shortBg").height- gbox.getImage("inter").height)/2;
//    						gbox.drawImage('inter',wX,wY);
    					}
    					if(typeof(tmpHurt) != "undefined"){
    						
        					if(isOgreHurt)
        					{
        						if(tmpHurt < 0)
        						{
        							drawNum(1100,280,30,0,"" + Math.abs(tmpHurt),anim_num,"num_2",this.tileset);
        						}
        						else
        						{
        							gbox.drawString(tmpHurt,1100, 280,'#FF0000',25);
        						}
        						
        					}
        					else if(isCharHurt)
        					{
        						if(tmpHurt < 0)
        						{
        							drawNum(340,280,30,0,"" + Math.abs(tmpHurt),anim_num,"num_2",this.tileset);
        						}
        						else
        						{
        							gbox.drawString(tmpHurt,340, 280,'#FF0000',25);
        						}
        						
        					}    						
    					}

    					
                    }  
				}
			});  
	//绘制 聊天菜单 
//	 gbox.addObject(testAni);
    //chatMenu(85,515,'levelMenu_2');
};


var rewardInfoStr = new Array();
var rewardTip = function(object)
{
	rewardInfoStr[0] = { slides: [
								 	          { "name": "名称 ： " ,"res":object.itemName, "resColor": "#ffffff","color": "#ffffff"},     
											  { "name": "描述 ： " ,"res":object.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

	for(var a = 0; a<rewardInfoStr[0].slides.length; a++)
			    {
			        
			    	if(rewardInfoStr[0].slides[a].res == 0)
			    	{
			    		rewardInfoStr[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
	return rewardInfoStr[0];
};
var buffDescription = new Array();
var buffDescriptionTip = function(object)
{
	buffDescription[0] = { slides: [
								 	          
									{ "name": "描述 ： " ,"res":object.description, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

	for(var a = 0; a<buffDescription[0].slides.length; a++)
			    {
			        
			    	if(buffDescription[0].slides[a].res == 0)
			    	{
			    		buffDescription[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
	return buffDescription[0];
};
var skillNameDisplay = new Array();
var operateSkillTip = function(object)
{
	skillNameDisplay[0] = { slides: [
								 	          
									{ "name": "名称 ： " ,"res":object.skillName, "resColor": "#ffffff","color": "#ffffff"},
											 	
								 ]};

	for(var a = 0; a<skillNameDisplay[0].slides.length; a++)
			    {
			        
			    	if(skillNameDisplay[0].slides[a].res == 0)
			    	{
			    		skillNameDisplay[0].slides.splice(a,1);
			    		a = 0;
			    	}
			    	
			    }
	return skillNameDisplay[0];
}