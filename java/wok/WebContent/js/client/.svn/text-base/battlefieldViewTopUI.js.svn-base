/*
 * 最顶层窗口位置属性
 */
battlefield.topUI = {
	
	/*
	 * 根据数据产生界面
	 */
	create : function(){
		var soldierInfo = battlefield.model.soldierInfo;
		var roundNum = battlefield.model.roundNum;
		this._init();
		this.operationCtrl();
		//武将旗帜
		this.UI.selfHeroFlags = [
			new battlefield.topUI.Flag("",491,7),//右边1
			new battlefield.topUI.Flag("",411,7),//2
			new battlefield.topUI.Flag("",331,7),//3
			new battlefield.topUI.Flag("",251,7),//4
			new battlefield.topUI.Flag("",171,7),//5
		];
		this.UI.enemyHeroFlags = [
			new battlefield.topUI.Flag("",900,7),//左边1
			new battlefield.topUI.Flag("",980,7),//2
			new battlefield.topUI.Flag("",1060,7),//3
			new battlefield.topUI.Flag("",1140,7),//4
			new battlefield.topUI.Flag("",1220,7),//5
		];
		//当前激活的武将属性
		this.UI.activeHeroAttr = [
			new battlefield.topUI.Text("",53,631),//姓名
			new battlefield.topUI.Text("",53,649),//等级
			new battlefield.topUI.Text("",53,667),//兵力
			new battlefield.topUI.Text("",53,685),//攻击
			new battlefield.topUI.Text("",53,703),//防御
			new battlefield.topUI.Text("",53,721),//行动
		];
		//激活武将的技能
		var skills = this.UI.skills = new Array;
		skills.push(new battlefield.topUI.Image("",528,691));
		skills.push(new battlefield.topUI.Image("",577,691));
		skills.push(new battlefield.topUI.Image("",626,691));
		skills.push(new battlefield.topUI.Image("",675,691));
		skills.push(new battlefield.topUI.Image("",724,691));
		skills.push(new battlefield.topUI.Image("",773,691));
		skills.push(new battlefield.topUI.Image("",822,691));
		skills.push(new battlefield.topUI.Image("",871,691));
		
	
		
		var activeDebuff = this.UI.activeDebuff = new Array;
		//背景
		activeDebuff.push(new battlefield.topUI.Image("",0,372));
		activeDebuff.push(new battlefield.topUI.Image("",36,372));
		activeDebuff.push(new battlefield.topUI.Image("",72,372));
		activeDebuff.push(new battlefield.topUI.Image("",98,372));
		
		activeDebuff.push(new battlefield.topUI.Image("",3,375));
		activeDebuff.push(new battlefield.topUI.Image("",39,375));
		activeDebuff.push(new battlefield.topUI.Image("",75,375));
		activeDebuff.push(new battlefield.topUI.Image("",101,375));
	
		
		var activeBuff = this.UI.activeBuff = new Array;
		//背景
		activeBuff.push(new battlefield.topUI.Image("",0,408));
		activeBuff.push(new battlefield.topUI.Image("",36,408));
		activeBuff.push(new battlefield.topUI.Image("",72,408));
		activeBuff.push(new battlefield.topUI.Image("",98,408));
		//
		activeBuff.push(new battlefield.topUI.Image("",3,411));
		activeBuff.push(new battlefield.topUI.Image("",39,411));
		activeBuff.push(new battlefield.topUI.Image("",75,411));
		activeBuff.push(new battlefield.topUI.Image("",101,411));
	
		
		//目标武将属性
		this.UI.targetHeroAttr = [
			new battlefield.topUI.Text("",1345,201),//姓名
			new battlefield.topUI.Text("",1345,219),//等级
			new battlefield.topUI.Text("",1345,237),//兵力
			new battlefield.topUI.Text("",1345,255),//攻击
			new battlefield.topUI.Text("",1345,273),//防御
			new battlefield.topUI.Text("",1345,291),//行动
		];
		
		var targetDebuff = this.UI.targetDebuff = new Array;
		//背景
		targetDebuff.push(new battlefield.topUI.Image("",1227,105));
		targetDebuff.push(new battlefield.topUI.Image("",1263,105));
		targetDebuff.push(new battlefield.topUI.Image("",1299,105));
		targetDebuff.push(new battlefield.topUI.Image("",1335,105));
		//目标武将buff/debuff
		targetDebuff.push(new battlefield.topUI.Image("",1230,108));
		targetDebuff.push(new battlefield.topUI.Image("",1266,108));
		targetDebuff.push(new battlefield.topUI.Image("",1302,108));
		targetDebuff.push(new battlefield.topUI.Image("",1338,108));


		
		var targetBuff = this.UI.targetBuff = new Array;
		//背景
		targetBuff.push(new battlefield.topUI.Image("",1227,141));
		targetBuff.push(new battlefield.topUI.Image("",1263,141));
		targetBuff.push(new battlefield.topUI.Image("",1299,141));
		targetBuff.push(new battlefield.topUI.Image("",1335,141));
		
		targetBuff.push(new battlefield.topUI.Image("",1230,144));
		targetBuff.push(new battlefield.topUI.Image("",1266,144));
		targetBuff.push(new battlefield.topUI.Image("",1302,144));
		targetBuff.push(new battlefield.topUI.Image("",1338,144));

		
		var tooltip = this.UI.tooltip = new Array;
		tooltip.push(new battlefield.topUI.tooltip(0,0));//武将技能tooltip
		
		this.skillsCtrl();
		//更新回合数
		this.updateRoundNum();
		this.updateOrder();
		this.updateCharacter();
	},
	
	/*
	 * 初始化界面
	 */
	_init : function(){
		this.UI = {
			//已方君主
			selfCharacter : {
				icon : new battlefield.topUI.Image("",20,20),//头像
				backImage : new battlefield.topUI.Image("zc_tb_110",5,0),//背景图
				country : new battlefield.topUI.Text("",105,15),//国家
				level : new battlefield.topUI.Text("",22,29),//等级
			},
			//己方英雄旗号
			selfHeroFlagBack : {
				backImage : new battlefield.topUI.Image("zc_tb_12",144,40),//背景图
			},
			//回合数
			round : {
				backImage : new battlefield.topUI.Image("zc_tb_09",601,0),//背景图
				number : new battlefield.topUI.CenterImages([],706,42),//背景图
			},
			//敌方英雄旗号
			enemyHeroFlagBack  :  {
				backImage : new battlefield.topUI.Image("zc_tb_13",860,40),//背景图
			},
			//敌方君主
			enemyCharacter : {
				icon : new battlefield.topUI.Image("",1335,20),//头像
				backImage : new battlefield.topUI.Image("zc_tb_109",1313,0),//背景图
				country : new battlefield.topUI.Text("",1323,15),//国家
				level : new battlefield.topUI.Text("",1408,29),//等级
			},
			//目标英雄
			targetHeroBack : [
				new battlefield.topUI.Image("zc_tb_14",1227,177,.6),//背景图
				new battlefield.topUI.Image("",1232,196),//武将头像
				new battlefield.topUI.Image("zc_tb_62",1306,201),//姓名
				new battlefield.topUI.Image("zc_tb_55",1306,219),//等级
				new battlefield.topUI.Image("zc_tb_52",1306,237),//兵力
				new battlefield.topUI.Image("zc_tb_53",1306,255),//攻击
				new battlefield.topUI.Image("zc_tb_54",1306,273),//防御
				new battlefield.topUI.Image("zc_tb_56",1306,291),//行动
			],
			//已方当前激活武将
			activeHeroBack : [
				new battlefield.topUI.Image("",23,477),//武将头像
				new battlefield.topUI.Image("zc_tb_15",0,444,.6),//背景图
				new battlefield.topUI.Image("zc_tb_62",8,631),//姓名
				new battlefield.topUI.Image("zc_tb_55",8,649),//等级
				new battlefield.topUI.Image("zc_tb_52",8,667),//兵力
				new battlefield.topUI.Image("zc_tb_53",8,685),//攻击
				new battlefield.topUI.Image("zc_tb_54",8,703),//防御
				new battlefield.topUI.Image("zc_tb_56",8,721),//行动
				
			],
			//已方当前激活武将技能背景
			skillBack : {
				backImage : new battlefield.topUI.Image("zc_tb_57",488,686),//背景图
			},
			//已方当前激活武将技能
//			skills : [],
			//右下角通用操作
			operationsBack : {
				backImage : new battlefield.topUI.Image("zc_tb_08",1024,663),//背景图
			},
			operations : [
				new battlefield.topUI.Image("zc_tb_102",1145,673),//攻击
				new battlefield.topUI.Image("zc_tb_07",1218,673),//防御
				new battlefield.topUI.Image("zc_tb_106",1297,673),//自动
				new battlefield.topUI.Image("zc_tb_03",1370,673),//逃跑
			],
			//时间
			handleTime:{
			   time: new battlefield.topUI.EnlargeImages([],720,371,1),
			},
			//激活血 
			activeHeroBlood:{
				blood:new battlefield.topUI.ImageClip("",8,614,126,5),
			},
			//激活魔
			activeHeroMagic:{
				magic:new battlefield.topUI.ImageClip("",8,621,126,5),
			},//目标血
			targetHeroBlood:{
				blood:new battlefield.topUI.ImageClip("",1232,293,69,5),
			},
			//目标魔
			targetHeroMagic:{
				magic:new battlefield.topUI.ImageClip("",1232,300,69,5),
			},
		};
	},
	
	/*
	 * 时间显示 改变显示的图片
	 */
	showTime :function(time){
		if(time == 0){
			this.UI.handleTime.time.names = null;
		}else{
			var timeImages = battlefield.num2name.getRoundImages(time);
			this.UI.handleTime.time.names = timeImages;
			this.UI.handleTime.time.multiple = 1;
			/*
			 * 改变放大倍数
			 */
			setTimeout(function(){
				battlefield.topUI.UI.handleTime.time.multiple = 1.4;
				setTimeout(function(){
					battlefield.topUI.UI.handleTime.time.names = null;
					},500);
			},400);
		}
	},
	
	/*
	 * 更新激活方阵
	 */
	updateActive : function(data){
		var soldierInfo = battlefield.model.soldierInfo;
		var locationId = data.locationId;
		var opSkill = data.operateSkill;
		if(!soldierInfo){
			console("更新激活方阵 取不到数据1");
			return;
		}
		//取消上次激活方阵的状态
		if(typeof this.lastLoactionId =="number"){
			var lastActive = soldierInfo[this.lastLoactionId];
			if(lastActive){
				battlefield.anims.remove(lastActive.coord.x,lastActive.coord.y,"active");
			}
		}
		var active = soldierInfo[locationId];
		if(!active){
			console("更新激活方阵 取不到数据2");
			return;
		}
		var soldireAnim = battlefield.anims.getSoldier(active.coord.x,active.coord.y);
		if(soldireAnim){
			var a = new battlefield.anims.Active(soldireAnim);
			battlefield.anims.get(active.coord.x,active.coord.y).active = a;
			this.lastLoactionId = active.locationId;
		}
		//更新旗帜
		this.updateFlagLight(locationId);
		//更新激活属性
		this.updateActiveAttr(active);
		if(active.type == "mine"){
			this.updateSkill(active.skills,locationId,opSkill);
		}else{
		//	this.disableSkill();
		}
	},
	
	/*
	 * 更新激活武将的属性、buff/debuff
	 */
	updateActiveAttr : function(active){
		if(active.type == "mine"){
			this.UI.activeHeroBack[0].name = active.heroIcon;
			this.UI.activeHeroAttr[0].text = active.heroName;
			this.UI.activeHeroAttr[1].text = active.heroLevel;
			this.UI.activeHeroAttr[2].text = active.soldierAmount+"/" +active.soldierAmountMax;
			this.UI.activeHeroAttr[3].text = active.attack;
			this.UI.activeHeroAttr[4].text = active.defence;
			this.UI.activeHeroAttr[5].text = active.mobility;
			//血
			this.UI.activeHeroBlood.blood.name = "zc_tb_16";
			this.UI.activeHeroBlood.blood.w = (active.soldierAmount/active.soldierAmountMax)*126;
			//魔
			this.UI.activeHeroMagic.magic.name = "zc_tb_17";
			this.UI.activeHeroMagic.magic.w = (active.mp/active.mpMax)*126;
			//debuff
			for(var i=0;i<this.UI.activeDebuff.length/2;i++){
				var debuff = active.debuff[i];
				if(debuff){
					this.UI.activeDebuff[i].name = "jgf_zjm_3_";//背景
					this.UI.activeDebuff[i+4].name = debuff.buffIcon;//jgf_zjm_3_
				}else{
					this.UI.activeDebuff[i].name = null;//背景
					this.UI.activeDebuff[i+4].name =null;//jgf_zjm_3_
				}
			}
			//buff
			for(var i=0;i<this.UI.activeBuff.length/2;i++){
				var buff = active.buff[i];
				if(buff){
					this.UI.activeBuff[i].name = "jgf_zjm_3_";//背景
					this.UI.activeBuff[i+4].name = buff.buffIcon;
				}else{
					this.UI.activeBuff[i].name = null;//背景
					this.UI.activeBuff[i+4].name =null;//jgf_zjm_3_
				}
			}
		}
	},
	
	/**
	 * 更新目标方阵
	 * @param x,y 地块编号 
	 */
	updateTarget : function(x,y){
		var data = battlefield.model.soldierInfo;
		if(!data){
			return;
		}
		var anim = battlefield.anims.getSoldier(x,y);
		if(!anim){
			return;
		}
		var target = data[anim.locationId];
		if(!target){
			return;
		}
		this.UI.targetHeroBack[1].name = target.smallHeroIcon;
		this.UI.targetHeroAttr[0].text = target.heroName;
		this.UI.targetHeroAttr[1].text = target.heroLevel;
		this.UI.targetHeroAttr[2].text = target.soldierAmount+"/" +target.soldierAmountMax;
		this.UI.targetHeroAttr[3].text = target.attack;
		this.UI.targetHeroAttr[4].text = target.defence;
		this.UI.targetHeroAttr[5].text = target.mobility;
		//血
		this.UI.targetHeroBlood.blood.name = "zc_tb_19";
		this.UI.targetHeroBlood.blood.w = (target.soldierAmount/target.soldierAmountMax)*69;
		//魔
		this.UI.targetHeroMagic.magic.name = "zc_tb_20";
		this.UI.targetHeroMagic.magic.w = (target.mp/target.mpMax)*69;
		//debuff
		for(var i=0;i<this.UI.targetDebuff.length/2;i++){
			var debuff = target.debuff[i];
			if(debuff){
				this.UI.targetDebuff[i].name = "jgf_zjm_3_";//背景
				this.UI.targetDebuff[i+4].name = debuff.buffIcon;//jgf_zjm_3_
			}else{
				this.UI.targetDebuff[i].name = null;//背景
				this.UI.targetDebuff[i+4].name =null;//jgf_zjm_3_
			}
		}
		//buff
		for(var i=0;i<this.UI.targetBuff.length/2;i++){
			var buff = target.buff[i];
			if(buff){
				this.UI.targetBuff[i].name = "jgf_zjm_3_";//背景
				this.UI.targetBuff[i+4].name = buff.buffIcon;
			}else{
				this.UI.targetBuff[i].name = null;//背景
				this.UI.targetBuff[i+4].name =null;//jgf_zjm_3_
			}
		}
	},
	
	/**
	 * 更新回合数
	 * @param x,y 地块编号 
	 */
	updateRoundNum : function(){
		var num = battlefield.model.roundNum;
		console.log("回合数：" + num);
		var names = battlefield.num2name.getRoundImages(num);
		console.log("图片名：" + names[0]);
		this.UI.round.number.names = names;
	},
	
	/*
	 * 点亮某个旗帜
	 */
	updateFlagLight : function(locationId){
		var selfHeroFlags = this.UI.selfHeroFlags;
		var enemyHeroFlags = this.UI.enemyHeroFlags;
		for(var i=0;i<selfHeroFlags.length;i++){
			if(selfHeroFlags[i] && selfHeroFlags[i].locationId == this.lastFlag){
				selfHeroFlags[i].light = false;
			}
			if(selfHeroFlags[i] && selfHeroFlags[i].locationId == locationId){
				selfHeroFlags[i].light = true;
			}
		}
		
		for(var i=0;i<enemyHeroFlags.length;i++){
			if(enemyHeroFlags[i] && enemyHeroFlags[i].locationId == this.lastFlag){
				enemyHeroFlags[i].light = false;
			}
			if(enemyHeroFlags[i] && enemyHeroFlags[i].locationId == locationId){
				enemyHeroFlags[i].light = true;
			}
		}
		this.lastFlag = locationId;
	},
	
	/**
	 * 更新旗号
	 */
	updateOrder : function(){
		var order = battlefield.model.order;
		var soldierInfo =  battlefield.model.soldierInfo;
		if(!order || !soldierInfo){
			return;
		}
		var mineIndex = 0;
		var enemyIndex = 0;
		var selfHeroFlags = this.UI.selfHeroFlags;
		var enemyHeroFlags = this.UI.enemyHeroFlags;
		var soldier;
		var flag;
		for(var i=0;i<order.length;i++){
			soldier = soldierInfo[order[i]];
			if(soldier){
				if(soldier.type == "mine"){
					flag = selfHeroFlags[mineIndex++];
					flag.flag = soldier.flag;
					flag.locationId = soldier.locationId;
				}else if(soldier.type == "target"){
					flag = enemyHeroFlags[enemyIndex++];
					flag.flag = soldier.flag;
					flag.locationId = soldier.locationId;
				}
			}
		}
		//清空已死亡方阵的旗帜
		for(;mineIndex<5;mineIndex++){
			flag = selfHeroFlags[mineIndex++];
			delete flag.flag;
			delete flag.locationId;
		}
		for(;enemyIndex<5;enemyIndex++){
			flag = enemyHeroFlags[enemyIndex++];
			delete flag.flag;
			delete flag.locationId;
		}
	},
	
	/**
	 * 更新君主信息
	 */
	updateCharacter : function(){
		//己方君主
		if(battlefield.model.mineIcon){
			this.UI.selfCharacter.icon.name = battlefield.model.mineIcon;
			this.UI.selfCharacter.country.text = battlefield.model.mineCountry;
			this.UI.selfCharacter.level.text = battlefield.model.mineLevel;
		}
//		//己方君主
//		if(battlefield.model.mineIcon){
//			this.UI.enemyCharacter.icon.name = battlefield.model.mineIcon;
//			this.UI.enemyCharacter.country.text = battlefield.model.mineCountry;
//			this.UI.enemyCharacter.level.text = battlefield.model.mineLevel;
//		}
		//敌方君主
		if(battlefield.model.targetIcon){
			this.UI.enemyCharacter.icon.name = battlefield.model.targetIcon;
			this.UI.enemyCharacter.country.text = battlefield.model.targetCountry;
			this.UI.enemyCharacter.level.text = battlefield.model.targetLevel;
		}
	},
	
	/*
	 * 更新当前可操作技能
	 */
	updateSkill : function(heroSkill,locationId,operateSkill){
		var curSkills = this.UI.skills;
		battlefield.model.releaseSkillIndex = -1;
		$("#canvas").css("cursor","default");
		this.UI.tooltip[0].close();
		this.removeArrow();
		for(var i=0;i<curSkills.length;i++){
			if(heroSkill[i]){
				curSkills[i].name = heroSkill[i].skillIcon;
				curSkills[i].skillsData = heroSkill[i];
				curSkills[i].index = i;
				curSkills[i].disable = !operateSkill[i].canUse;//是否可用
				curSkills[i].cd = operateSkill[i].remainRound;//冷却时间
			}else{
				curSkills[i].name = null;
			}
		}
	},
	
	/*
	 * 当敌方操作时己方技能不可用
	 */
	disableSkill : function(){
		var curSkills = this.UI.skills;
		battlefield.model.releaseSkillIndex = -1;
		$("#canvas").css("cursor","default");
		this.removeArrow();
		for(var i=0;i<curSkills.length;i++){
			curSkills[i].disable = true;//是否可用
		}
	},
	
	/*
	 * 技能操作控制
	 */
	skillsCtrl : function(){
		for(var i=0; i<this.UI.skills.length; i++){
			var tooltip = this.UI.tooltip[0];
			this.UI.skills[i].onmouseover = function(){
					if(!this.isIn){
						this.isIn = true;
						if(this.skillsData)
							tooltip.open(this.skillsData,this.x,this.y);
					}
				};
				this.UI.skills[i].onmouseout = function(){
					if(this.isIn){
						tooltip.close();
						this.isDown = false;
						this.isIn = false;
					}
				};
				this.UI.skills[i].onmousedown = function(){
					$("#canvas").css("cursor","default");
					battlefield.model.releaseSkillIndex = -1;
					battlefield.topUI.removeArrow();
					this.isDown = true;
				};
				this.UI.skills[i].onmouseup = function(){
					if(this.isDown){
						var index = this.index;
						multiBattle.skillForMultiBattle(this.index,function(data){
							if(data.length > 0)
								$("#canvas").css("cursor","pointer");
							//设置当前释放技能索引
							battlefield.model.releaseSkillIndex = index;
							//绘制部队箭头
							for(var j=0;j<data.length;j++){
								var coord = battlefield.model.soldierInfo[data[j]].coord;
								var anim = battlefield.anims.get(coord.x,coord.y);
								if(anim && anim.soldier){
									var selectArrow = new battlefield.anims.Select(anim.soldier);
									anim.select = selectArrow;
								}
							}
							//保存
							battlefield.model.skillTarget = data;
						});
						this.isDown = false;
					}
				};
		}
	},
	
	/*
	 * 清除技能可选方阵的箭头
	 */
	 removeArrow : function(){
	 	var data = battlefield.model.skillTarget;
	 	if(!data){
	 		return;
	 	}
	 	if(!battlefield.model.soldierInfo){
	 		return;
	 	}
	 	for(var i=0;i<data.length;i++){
	 		var soldier = battlefield.model.soldierInfo[data[i]];
	 		if(soldier){
	 			var coord = soldier.coord;
	 			if(coord){
					var anim = battlefield.anims.get(coord.x,coord.y);
					anim.select = null;
	 			}
	 		}
	 	}
	 },
	 
	/*
	 * 右下角操作控制
	 */
	operationCtrl : function(){
		
		//攻击
		this.UI.operations[0].onmouseover = function(){
			if(!this.isIn){
				this.isIn = true;
				this.name = "zc_tb_101";
			}
		};
		
		this.UI.operations[0].onmouseout = function(){
			if(this.isIn){
				this.name = "zc_tb_102";
				this.isDown = false;
				this.isIn = false;
			}
		};
		
		this.UI.operations[0].onmousedown = function(){
			this.name = "zc_tb_103";
			this.x = this.x + 1;
			this.y = this.y + 1;
			$("#canvas").css("cursor","default");
			battlefield.model.releaseSkillIndex = -1;
			battlefield.topUI.removeArrow();
			this.isDown = true;
		};
		
		this.UI.operations[0].onmouseup = function(){
			if(this.isDown){
				this.x = this.x - 1;
				this.y = this.y - 1;
				this.name = "zc_tb_101";
				multiBattle.normalAttackForMultiBattle(function(data){
					if(data.length > 0)
						$("#canvas").css("cursor","pointer");
					//绘制部队箭头
					for(var j=0;j<data.length;j++){
						var coord = battlefield.model.soldierInfo[data[j]].coord;
						var anim = battlefield.anims.get(coord.x,coord.y);
						if(anim && anim.soldier){
							var selectArrow = new battlefield.anims.Select(anim.soldier);
							anim.select = selectArrow;
						}
					}
					//保存
					battlefield.model.skillTarget = data;
				});
				this.isDown = false;
			}
		};
		//防御
		this.UI.operations[1].onmouseover = function(){
			if(!this.isIn){
				this.isIn = true;
				this.name = "zc_tb_06";
			}
		};
		
		this.UI.operations[1].onmouseout = function(){
			if(this.isIn){
				this.name = "zc_tb_07";
				this.isDown = false;
				this.isIn = false;
			}
		};
		
		this.UI.operations[1].onmousedown = function(){
			this.name = "zc_tb_99";
			this.x = this.x + 1;
			this.y = this.y + 1;
			this.isDown = true;
		};
		
		this.UI.operations[1].onmouseup = function(){
				if(this.isDown){
				multiBattle.defenceForMultiBattle();
				this.x = this.x - 1;
				this.y = this.y - 1;
				this.isDown = false;
				this.name = "zc_tb_06";
				}
		};
		//自动
		this.UI.operations[2].onmouseover = function(){
			if(!this.isIn){
				this.isIn = true;
				if(this.isManul){
					this.name = "zc_tb_113";
				}else{
					this.name = "zc_tb_105";
				}
			}
		};
		
		this.UI.operations[2].onmouseout = function(){
			if(this.isIn){
				this.isDown = false;
				this.isIn = false;
				if(this.isManul){
					this.name = "zc_tb_114";
				}else{
					this.name = "zc_tb_106";
				}
			}
		};
		
		this.UI.operations[2].onmousedown = function(){
			if(this.isManul){
				this.name = "zc_tb_115";
			}else{
				this.name = "zc_tb_107";
			}
			
			this.x = this.x + 1;
			this.y = this.y + 1;
			this.isDown = true;
		};
		
		this.UI.operations[2].onmouseup = function(){
			console.log("mouse");
			if(this.isDown){
				var src = this;
				
				multiBattle.autoAttackForMultiBattle(function(data){
					src.x = src.x -1;
					src.y = src.y - 1;
						if(data){
							src.isManul = false;
							if (src.isIn){
								src.name = "zc_tb_105";
							}else{
								src.name = "zc_tb_106";
							}
							
						}else{
							src.isManul = true;
							if(src.isIn){
								src.name = "zc_tb_113";
							}else{
								src.name = "zc_tb_114";
							}
							
						
					}
				});
			}
		};
		//逃跑
		this.UI.operations[3].onmouseover = function(){
			if(!this.isIn){
				this.isIn = true;
				this.name = "zc_tb_02";
			}
		};
		
		this.UI.operations[3].onmouseout = function(){
			if(this.isIn){
				this.name = "zc_tb_03";
				this.isDown = false;
				this.isIn = false;
			}
		};
		
		this.UI.operations[3].onmousedown = function(){
			this.name = "zc_tb_04";
			this.x = this.x + 1;
			this.y = this.y + 1;
			this.isDown = true;
		};
		
		this.UI.operations[3].onmouseup = function(){
			if(this.isDown){
				this.x = this.x - 1;
				this.y = this.y - 1;
				this.name = "zc_tb_03";
				this.isDown = false;
			}
		};
	},
	
	
	/*
	 * 绘制最顶层UI
	 */
	draw : function(){
		for(var i in this.UI){
			var o = this.UI[i];
			if(o instanceof Array){
				for(var m=0;m<o.length;m++){
						o[m].draw();
					}
			}else{
				for(var j in o){
					if(o[j] instanceof Array){
						for(var n=0;n<o[j].length;n++){
							o[j][n].draw();
						}
					}else{
						o[j].draw();
					}
				}
			}
		}
	},


};

/*
 * 图片类
 */
battlefield.topUI.Image = function(name,x,y,alpha){
	this.name = name;
	this.x = x;
	this.y = y;
	this.draw = function(){
		if(this.name){
			var ctx = gbox.getBufferContext();
			var img = gbox.getImage(this.name);
			if(img){
				if(alpha){
					ctx.save();
					ctx.globalAlpha = alpha;
					ctx.drawImage(img,this.x,this.y);
					ctx.restore();
				}else{
					ctx.drawImage(img,this.x,this.y);
				}
				//技能 补丁
				if(this.disable){
					ctx.fillStyle = "rgba(0,0,0,0.7)";
					ctx.fillRect(this.x,this.y,img.width,img.height);
				}else if(this.cd){
					ctx.save();
					
					ctx.fillStyle = "rgba(192,0,0,0.2)";
					ctx.fillRect(this.x,this.y,img.width,img.height);
					
					ctx.textBaseline = "top";//文字顶部对齐
				    ctx.textAlign = "center";//居中对齐
					ctx.font = "30px 黑体";
					var xc = Math.floor(this.x+img.width/2);
					var yc = Math.floor(this.y+(img.height-30)/2);
					ctx.lineWidth = 3;
					ctx.strokeStyle = "black";
					ctx.strokeText(this.cd,xc,yc);
					ctx.fillStyle = "white";
					ctx.fillText(this.cd,xc,yc);
					ctx.restore();
				}
			}
		}
	};
	/**
	 * 裁剪图片
	 * @param {Object} name 图片名
	 * @param {Object} x  图片起点x
	 * @param {Object} y  图片起点y
	 * @param {Object} w 裁剪的宽度
	 * @param {Object} h  裁剪的高度
	 */
	battlefield.topUI.ImageClip = function(name, x, y, w, h){
		this.name = name;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.draw = function(){
			if (this.name) {
				var ctx = gbox.getBufferContext();
				ctx.save();
				var img = gbox.getImage(this.name);
				if (img) {
					ctx.rect(this.x, this.y, this.w, this.h);
					ctx.stroke();
					ctx.clip();
					var img = gbox.getImage(this.name);
					ctx.drawImage(img,this. x, this.y);
				}
				ctx.restore();
			}
		};
	}
	
	/*
	 * 点击测试
	 */
	this.hitTest = function(x,y){
		var img = gbox.getImage(this.name);
		if(!img){
			return false;
		}
		if(!this.endX){//endx endy 不可能为0
			this.endX = this.x + img.width;
			this.endY = this.y + img.height;
		}
		return (this.x<x && x<this.endX) && (this.y<y && y<this.endY);
	}
};

/*
 * 居中多个图片类(用于绘制数字图片)
 * x,y 为左右居中坐标
 */
battlefield.topUI.CenterImages = function(names,x,y){
	this.names = names;
	this.x = x;
	this.y = y;
	this.draw = function(){
		if(this.names){
			var imgs = new Array;
			var totalWidth = 0;
			for(var i = 0;i<this.names.length;i++){
				var img = gbox.getImage(this.names[i]);
				if(img){
					imgs.push(img);
					totalWidth += img.width;
				}
			}
			if(imgs.length==0){
				return;
			}
			var left = this.x - totalWidth/2;
			var ctx = gbox.getBufferContext();
			var index = 0;
			do{
				var img = imgs[index];
				ctx.drawImage(img,left,this.y);
				left += img.width;
				index++;
			}while(index<imgs.length);
		}
	};
};

/*
 * 放大图片
 */
battlefield.topUI.EnlargeImages = function(names,x,y,multiple){
	this.names = names;
	this.x = x;
	this.y = y;
	this.multiple = multiple;
	this.draw = function(){
		if(this.names){
			var imgs = new Array;
			var totalWidth = 0;
			for(var i = 0;i<this.names.length;i++){
				var img = gbox.getImage(this.names[i]);
				if(img){
					imgs.push(img);
					totalWidth += img.width;
				}
			}
			totalWidth *= this.multiple;
			if(imgs.length==0){
				return;
			}
			var left = this.x - totalWidth/2;
			var ctx = gbox.getBufferContext();
			
			var index = 0;
			do{
				var img = imgs[index];
				var top = this.y - img.width/2*this.multiple;
				ctx.drawImage(img,left>>0,top>>0,img.width*this.multiple,img.height*this.multiple);
				left += img.width*this.multiple;
				index++;
			}while(index<imgs.length);
		}
	};

};
	
/*
 * 文字类，单行居中绘制
 */
battlefield.topUI.Text = function(text,x,y,fontStyle){
	this.text = text;
	this.x = x;
	this.y = y;
	this.fontStyle = fontStyle;
	this.draw = function(){
		if(this.text){
			var ctx = gbox.getBufferContext();
			ctx.save();
			ctx.textBaseline = "top";//文字顶部对齐
		    ctx.textAlign = "left";//居左对齐
			ctx.fillStyle = "white";
			ctx.font = "14px 黑体";
			ctx.fillText(this.text,this.x,this.y);
		    ctx.restore();
		}
	}

};


/*
 * 旗帜类，单行居中绘制
 */
battlefield.topUI.Flag = function(flag,x,y){
	this.flag = flag;
	this.x = x;
	this.y = y;
	this.draw = function(){
		if(this.flag){
			var ctx = gbox.getBufferContext();
			ctx.save();
			if(this.light){
				var img = gbox.getImage(this.lightImage);
				ctx.drawImage(img,this.x,this.y);
			}else{
				var img = gbox.getImage(this.image);
				ctx.drawImage(img,this.x,this.y);
			}
			ctx.textBaseline = "top";//文字顶部对齐
		    ctx.textAlign = "left";//居左对齐
			ctx.fillStyle = "white";
			ctx.font = "黑体 16px";
			ctx.fillText(this.flag,this.x+11,this.y+17);
		    ctx.restore();
		}
	}
};
battlefield.topUI.Flag.prototype.image = "zc_tb_23";
battlefield.topUI.Flag.prototype.lightImage = "zc_tb_108";
//by sun 临时变量
var timeIndex =0;
/*
 * 技能tooltip UI
 */
battlefield.topUI.tooltip = function(x,y,skill){
	//绘制数据
	this.skill = !!skill;
	//绘制坐标
	this.x = x;
	this.y = y;
	//绘制标识
	this._isdraw = false;
	//绘制方法
	this.draw = function(){
		if(this.skill && this._isdraw){
			tooltip.drawSkill(gbox.getImage("toolTip"),gbox.getBufferContext(),
				this.x,this.y,this.skill
			);
		}
	};
	//settimeout对象
	this.setTimeOut;
	//打开tooltip，延迟500毫秒打开
	this.open = function(skill,x,y){
		var _ = this;
		_.skill = skill;
		if(x)
			_.x = x - 3;
		if(y){
			var h = tooltip.computSkill(gbox.getBufferContext(),skill).height;
			_.y = y - Number(h) - 5;
		}
		this.setTimeOut = window.setTimeout(function(){
			_._isdraw = true;
		},600);
	};
	//关闭tooltip方法
	this.close = function(){
		if(this.setTimeOut)
			window.clearTimeout(this.setTimeOut);
		this._isdraw = false;
		this.skill = false;
	};
};
