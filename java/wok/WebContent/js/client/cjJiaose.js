var rolename = null;
var sex= null;
var face= null;
var sexChoice = new Array();
sexChoice[0] = true;
sexChoice[1] = false;
var roleChoice = new Array();
var rolePicChoice = true;
var roleMapChoice = false;
var countryId = 3;
var facePic;
function doCreateCharacter(data){
		 
//        	gbox.setGroupHide('establishRole');
    charId = data.character.id;
	charName = data.character.name;
	charCountry = data.character.countryName;
	charImage = data.character.image;
	charLevel = data.character.level;
	charExp = data.character.experience;
	expLimit = data.character.experienceLimit;
	allianceName = data.character.allianceName;
	
	epoch = data.maincity.age;
	castleLevel = data.maincity.level;
	castleValue = data.maincity.experience;
    castleValueLimit = data.maincity.experienceLimit;
    realLevel = data.maincity.realLevel;
    damagedExperience = data.maincity.damagedExperience;
	connectCometServer(charId,doBattleWarn,doMailWarn,doResourceChange,doBuildingQueue,friendWarn,handleGetSimpleUserinfo,resourceUpdate);
	quest.getUserQuest(taskIndex.doGetUserQuestIndex);
	com_group = 'cityMenu';
	com_layer = 'cityMenuLayer';
	group_src = 'cityMenu';
	enterCityMenu(curGroup);
	changeMap('cityMenuLayer');	
}
var suiPoly = [[475,287],[494,281],[501,272],[500,262],[512,239],[536,223],[569,223],[555,199]
               ,[570,180],[619,173],[637,133],[609,103],[567,93],[567,77],[540,61],[555,32]
               ,[586,18],[674,36],[725,60],[741,81],[805,53],[845,60],[838,79],[805,95]
               ,[786,124],[757,140],[719,143],[698,148],[701,158],[723,168],[764,162]
               ,[759,182],[739,198],[756,209],[832,205],[845,190],[885,184],[929,177]
               ,[954,189],[944,216],[925,223],[906,240],[876,242],[867,250],[854,251]
               ,[835,274],[836,290],[822,295],[796,352],[774,364],[764,382],[750,378]
               ,[741,400],[667,406],[657,399],[598,411],[571,304],[527,239],[480,286]];
var xiaPoly = [[712,444],[798,393],[1036,375],[1242,338],[1242,351],[1159,375],[1292,390],[1285,404]
               ,[1212,423],[1148,495],[1286,506],[1361,311],[1152,301],[960,198],[908,242],[854,261]
               ,[768,383],[712,414],[712,438]];
var weiPoly = [[681,494],[802,484],[871,534],[899,538],[916,552],[955,530],[957,496],[1015,435],[1122,430]
               ,[1125,416],[1096,399],[1041,404],[1033,397],[952,391],[805,407],[681,470],[681,492]];
var chuPoly = [[98,446],[114,448],[124,460],[164,466],[188,484],[238,493],[235,484],[307,452]
               ,[339,476],[383,452],[482,498],[493,495],[513,506],[576,502],[625,472],[673,474]
               ,[682,498],[802,490],[862,541],[892,541],[886,571],[558,670],[294,641],[282,601]
               ,[199,595],[90,663],[83,643],[93,607],[161,563],[160,517],[93,525],[94,446]];
var liangPoly = [[213,325],[377,331],[377,312],[470,288],[535,338],[566,316],[575,366],[596,412]
               ,[589,438],[618,469],[576,497],[483,490],[383,444],[340,459],[311,443],[216,485]
               ,[103,435],[49,385],[52,348],[116,341],[213,331]];
function RoleMenu(_group)
{
	gbox.setRenderOrder([_group]);
	gbox.addObject(
			{ 
				id : 'roleBg', 
				group : 'establishRole',
				tileset : 'cj_zjm_08',
				x : 0,
				y : 0,
				frame : 0,
				
				poly : [ [0,0], [1420,0], [1419,737],[0,735]],
				initialize : function()
				{
					
					   divNameBg = addDivWindowBg(498,266);
					   divNameBg.id = "roleCreate";
					   document.body.appendChild(divNameBg);
                       divName = document.createElement("input");
                       divName.style.id = 'roleInput';
                       divName.style.backgroundColor = '#ffffff';
                       divName.style.width = '158px';
                       divName.style.color = '#ffffff';                 
                       divName.style.background = "transparent";
                       divName.style.border = "0px solid";
                       divName.style.outline = "none";
                       divNameBg.appendChild(divName);
                       for(var i=0; i<8; i++)
                       {
                       	  roleChoice[i] = false;
                       }				  	
					 
				},
				first : function() 
				{		
					/*
					 * 控制浏览器大小变化时DIV输入框自动适配屏幕
					 */
					adaptiveDiv(divNameBg,"roleCreate",498);
					/*======================================================*/	  
				},
				myclick : function()
				{
					if(rolePicChoice)
					{
						  //切换男女头像
						  if((lastTouchMoveX > 436 && lastTouchMoveX < 470 && lastTouchMoveY > 303 && lastTouchMoveY< 332))
	                      {
	                      	    sexChoice[1] = false;
	                      	    sexChoice[0] = !sexChoice[0];
	                      }
	                      if((lastTouchMoveX > 564 && lastTouchMoveX < 588 && lastTouchMoveY > 303 && lastTouchMoveY< 332))
	                      {
	                      	    sexChoice[0] = false;
	                      	    sexChoice[1] = !sexChoice[1];
	                      }
	                      //随机按钮选择头像
	                      if((lastTouchMoveX > 670 && lastTouchMoveX < 746 && lastTouchMoveY > 344 && lastTouchMoveY< 373))
	                      {
	                      	    var tempRandomNum = Math.round(Math.random()*7);
	                      	    roleChoice[tempRandomNum] = true;
	                      	    for(var i = 0; i<roleChoice.length; i++)
	                      	    {
	                      	    	if(i != tempRandomNum)
	                      	        {
	                      	        	roleChoice[i] = false;
	                      	        }
	                      	    }
	                      }
	                      //点击选择框选择头像
	                      for(var a =0 ; a<2; a++)
							  for(var b =0; b<4; b++)
							  {
							  	  if((lastTouchMoveX > (396 + b*84) && lastTouchMoveX < (478 + b*84) && lastTouchMoveY > (375 + a*84) && lastTouchMoveY< (458 + a*84)))
							  	  {
							  	  	     for(var i = 0; i<roleChoice.length; i++)
							  	  	     {
							  	  	     	if(i == (a*4 + b))
							  	  	     	{
							  	  	     		roleChoice[a*4 + b] = true;
							  	  	     	}
							  	  	     	else
							  	  	     	{
							  	  	     		roleChoice[i] = false;
							  	  	     	}						  	  
							  	  	     }
							  	  	    
							  	  }
							  	  
							  }	
					    if((lastTouchMoveX > 533 && lastTouchMoveX < 615 && lastTouchMoveY > 553 && lastTouchMoveY < 578))
	                     {
	                     	var headChoice = false;
	                     	var tempCnt = 0;
	                     	for(var i =0; i<roleChoice.length; i++)
	                     	{
	                     		if(!roleChoice[i])
	                     		{
	                     			tempCnt+=1;
	                     		}
	                     	}
	                     	if(tempCnt == roleChoice.length)
	                     	{
	                     		headChoice = false;
	                     	}
	                     	else
	                     	{
	                     		headChoice = true;
	                     	}
	                     	if(divName.value.length < 6 && divName.value != "" && divName.value != null)
	                     	{
	                     		 	if(headChoice)
	                     		 	{
	                     		 		rolePicChoice = false;
			                     	    roleMapChoice = true;
			                     	    divName.style.display = "none";
			                     	    countryId = 3;
	                     		 	}
	                     		 	else
	                     		 	{
	                     		 		alert("请选择头像");
	                     		 	}

	                     	}
	                     	else
	                     	{
	                     		if(divName.value.length > 6)
	                     		  alert("名称最大长度为6");
	                     		else
	                     		  alert("名字不能为空");
	                     	}
	                     	
	                     }    
					}
					if(roleMapChoice)
					{
						roleSpin.isVisible = false;
						if((lastTouchMoveX > 73 && lastTouchMoveX < 176 && lastTouchMoveY > 685 && lastTouchMoveY < 721))
						{
							rolePicChoice = true;
	                     	roleMapChoice = false;
	                     	divName.style.display = "block";
						}
						//countryId
						if (tool.pointInPoly([ lastTouchMoveX, lastTouchMoveY ], suiPoly))
						{
							 countryId = 0;
						}
						if (tool.pointInPoly([ lastTouchMoveX, lastTouchMoveY ], xiaPoly))
						{
							 countryId = 1;
						}
						if (tool.pointInPoly([ lastTouchMoveX, lastTouchMoveY ], weiPoly))
						{
							 countryId = 2;
						}
						if (tool.pointInPoly([ lastTouchMoveX, lastTouchMoveY ], chuPoly))
						{
							 countryId = 3;
						}
						if (tool.pointInPoly([ lastTouchMoveX, lastTouchMoveY ], liangPoly))
						{
							 countryId = 4;
						}
	                    if((lastTouchMoveX > 1256 && lastTouchMoveX < 1389 && lastTouchMoveY > 685 && lastTouchMoveY < 721))
	                     {
	                    	  rolename = divName.value;
						      if(sexChoice[0])
							   sex = 1;
							  else
							   sex = 0;
							  switch(countryId)
								 {
								    case 0:
								    	countryNameText = "隋";
								    	break;
								    case 1:
								    	countryNameText = "夏";
								    	break;
								    case 2:
								    	countryNameText = "魏";
								    	break;
								    case 3:
								    	countryNameText = "楚";
								    	break;
								    case 4:
								    	countryNameText = "梁";
								    	break;
								    	
								 }
							for(var i =0; i<roleChoice.length; i++)
							{
								if(roleChoice[i])
								{
									if(sexChoice[0])
									    facePic = 'zj_tx_m_0' + (i + 1);						
									else
									    facePic = 'zj_tx_f_0' + (i + 1);								
								}
							}
							//if(rolename.length < 6 && rolename != "" && rolename != null)
							{
								createCharacter(rolename,countryNameText,sex,facePic,doCreateCharacter);
							}									   
					   	    
					  
                     }
					}
                    
                      
				},
				blit : function()
				{
					gbox.blitFade(gbox.getBufferContext(),
								{
									alpha : 1
								});// 清屏
					if(roleMapChoice)
					{
						gbox.drawImage("cj_zjm_07",0,0);
						if((touchMoveX > 73 && touchMoveX < 176 && touchMoveY > 685 && touchMoveY < 721))
						{
							gbox.drawImage('cj_zjm_28',34,681);
						}
						//gbox.drawString("返   回",95, 688,"#FFFFFF",24);
						if((touchMoveX > 1256 && touchMoveX < 1389 && touchMoveY > 685 && touchMoveY < 721))
						{
							gbox.drawImage('cj_zjm_30',1255,681);
						}
						//gbox.drawString("登陆游戏",1247, 688,"#FFFFFF",24);
						for(var i =0; i<roleChoice.length; i++)
						{
							if(roleChoice[i])
							{
								if(sexChoice[0])
								    gbox.drawImage('zj_tx_m_0' + (i + 1),67,55);
								else
								    gbox.drawImage('zj_tx_f_0' + (i + 1),67,55);
							}
						}
						gbox.drawString(divName.value,96, 190,"#FFFFFF",14);
						if (tool.pointInPoly([ touchMoveX, touchMoveY ], suiPoly))
						{
							 gbox.drawImage('cj_zjm_04',544,28);
						}
						if (tool.pointInPoly([ touchMoveX, touchMoveY ], xiaPoly))
						{
							 gbox.drawImage('cj_zjm_06',771,201);
						}
						if (tool.pointInPoly([ touchMoveX, touchMoveY ], weiPoly))
						{
							 gbox.drawImage('cj_zjm_05',722,385);
						}
						if (tool.pointInPoly([ touchMoveX, touchMoveY ], chuPoly))
						{
							 gbox.drawImage('cj_zjm_01',147,447);
						}
						if (tool.pointInPoly([ touchMoveX, touchMoveY ], liangPoly))
						{
							 gbox.drawImage('cj_zjm_02',107,300);
						}
						switch(countryId)
						{
							case 0:
							  gbox.drawImage('zjm_45',97,154);
							  gbox.drawImage('cj_zjm_04',544,28);
							break;
							case 1:
							  gbox.drawImage('zjm_47',97,154);
							  gbox.drawImage('cj_zjm_06',771,201);
							break;
							case 2:
							  gbox.drawImage('zjm_46',97,154);
							  gbox.drawImage('cj_zjm_05',722,385);
							break;
							case 3:
							  gbox.drawImage('zjm_43',97,154);
							  gbox.drawImage('cj_zjm_01',147,447);
							break;
							case 4:
							  gbox.drawImage('zjm_44',97,154);
							  gbox.drawImage('cj_zjm_02',107,300);
							break;
						}
					}
					if(rolePicChoice)
					{
						if(sexChoice[0])//男性角色
						{
							gbox.drawImage("cj_zjm_08",0,0);
							gbox.drawImage("ty_an_12",440,308);
							for(var a =0 ; a<2; a++)
							  for(var b =0; b<4; b++)
							  {
							  	 gbox.drawImage('zj_tx_m_0'+(b+1+a*4),398 + b*84,378 + a*85);
							  	 if((touchMoveX > (396 + b*84) && touchMoveX < (478 + b*84) && touchMoveY > (375 + a*84) && touchMoveY < (458 + a*84)))
							  	  {
							  	  	    
							  	  	    gbox.drawImage('js_roleBright',391 + b*84,372 + a*84);
							  	  }
							  } 					  
						}
						if(sexChoice[1])//女性角色
						{
							gbox.drawImage("cj_zjm_09",0,0);
							gbox.drawImage("ty_an_12",568,308);
							for(var a =0 ; a<2; a++)
							  for(var b =0; b<4; b++)
							  {
							  	 gbox.drawImage('zj_tx_f_0'+(b+1+a*4),398 + b*84,378 + a*85);
							  	 if((touchMoveX > (396 + b*84) && touchMoveX < (478 + b*84) && touchMoveY > (375 + a*84) && touchMoveY < (458 + a*84)))
							  	  {
							  	  	    
							  	  	    gbox.drawImage('js_roleBright',391 + b*84,372 + a*84);
							  	  }
							  }
						}
						for(var i =0; i<roleChoice.length; i++)
						    {
						    	if(roleChoice[i])
						    	{
						    		//gbox.drawImage('roleKuang',391 + Math.floor(i%4)*84,Math.floor(i/4)*84 + 372);
						    		roleSpin.isVisible = true;
						    		roleSpin.move(368 + Math.floor(i%4)*84,Math.floor(i/4)*84 + 350);
						    		gbox.addObject(roleSpin);
						    	}
						    }   
						if((touchMoveX > 670 && touchMoveX < 744 && touchMoveY > 342 && touchMoveY < 372))
						{
							gbox.drawImage('cj_zjm_24',668,337);
						}						
						if((touchMoveX > 527 && touchMoveX < 637 && touchMoveY > 559 && touchMoveY < 586))
						{
							gbox.drawImage('cj_zjm_26',526,551);
						}					
					}	
				}
			  });
}
var roleSpin = new function()
	{
		this.id = "roleSpin";
		this.group = 'establishRole';
		this.tileset = "roleSpin";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = roleSpinData;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["roleSpinAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["roleSpinAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "roleSpin";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "roleSpin",
					tile : this.frame,
					dx : this.x,
					dy : this.y,
					fliph : this.fliph,
					flipv : this.flipv,
					camera : this.camera,
					alpha : 1.0,			
					anim : this.anim
				};
				AnimMgr.draw(gbox.getBufferContext(), data);
				this.frame = help.decideFrame(this.action);
			}
			//this.frame = help.decideFrameOnce(this.action);
		};
		this.clearGroup = function()
		{
			this.anim.action["roleSpinAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["roleSpinAction"].cnt = this.anim.action["roleSpinAction"].frames.length;
		    	this.frame = this.anim.action["roleSpinAction"].frames[this.anim.action["roleSpinAction"].frames.length - 1];
		    }
		};
	};
