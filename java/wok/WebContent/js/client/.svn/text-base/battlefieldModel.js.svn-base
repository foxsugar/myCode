/*
 * 战场数据
 */
battlefield.model = {
	//战斗初始化时双方军团信息
	soldierInfo : null,
	roundNum : 0,
	order : [],
	mineCountry: null,
	mineIcon: null,
	mineLevel: 0,
	targetCountry: null,
	targetIcon: null,
	targetLevel: 0,
	//释放技能索引
	releaseSkillIndex : -1,
	//可选目标
	skillTarget : null
};

/**
 * 战斗初始化函数 根据battleJobQueueId得到双方军团信息
 * @param battleJobQueueId
 */
battlefield.model.doGetMultiBattleInfo = function (data) {
	if(!data){
		return;
	}
	//回合数
	battlefield.model.roundNum = data.roundNum;
	//行动力排行
	battlefield.model.order = data.order;
	//君主信息
	battlefield.model.mineCountry = data.mineCountry;
	battlefield.model.mineIcon = data.mineIcon;
	battlefield.model.mineLevel = data.mineLevel;
	battlefield.model.targetCountry = data.targetCountry;
	battlefield.model.targetIcon = data.targetIcon;
	battlefield.model.targetLevel = data.targetLevel;
	
	var array = battlefield.model.soldierInfo = [];
	for(var i=0;i<data.mine.length;i++){
		var el = data.mine[i];
		el.type = "mine";
		array[el.locationId] = el;
	}
	for(var i=0;i<data.target.length;i++){
		var el = data.target[i];
		el.type = "target";
		array[el.locationId] = el;
	}
	battlefield.enterBattlefield();
}

/**
 * 回合 battleRoundReady  （需要更新城防伤害[defenceWork] ，更新buff持续效果[buffEffect]， 需要更新军团信息[soldier]）
			battleMessageType为2 
 * @param data
 */
battlefield.model.battleStart = function (data){
	//更新回合数
	battlefield.model.roundNum = data.roundNum;
	battlefield.topUI.updateRoundNum();
	//行动力排行
	battlefield.model.order = data.order;
	battlefield.topUI.updateOrder();
	//城防伤害
	var defenceWork = data.defenceWork;
	//buff效果
	var buffEffect = data.buffEffect;
	//更新军团信息
	var  update = data.soldierUpdate;
	for(var i=0;i<update.length;i++){
		var updateEl = update[i];
		var localEl = battlefield.model.soldierInfo[updateEl.locationId];
		for(var j in updateEl){
			localEl[j] = updateEl[j];
		}
	}
}

/**
 * 操作界面—选择技能  battleTurn（是否可操作[canOperate]，技能信息[operateSkill]）
 * battleMessageType为3
 * @param data
 */
battlefield.model.battleTurn = function(data){
	battlefield.topUI.updateActive(data);
}

/**
 * 操作界面 –选择可以攻击的人  battleTargetSelect  （返回可攻击的人的数组）
	battleMessageType为4 

 */
battlefield.model.battleTargetSelect  = function (data){
}

/**
 * 操作界面 –剩余操作时间   battleTime 
	battleMessageType为5
 * @param data
 */
battlefield.model.battleTime = function (data){
	battlefield.topUI.showTime(data);
}

/**
 * 自动攻击 battleAutoAttack 
 * @param data
 */
battlefield.model.battleAutoAttack  = function (data){
}

/** 战斗展示
 * battleView  需要更新 军团兵数量[soldier.soldierAmount]
	battleMessageType为7 
 * @param data
 */
battlefield.model.battleView  = function (data){
	//技能变灰
	if(data.battleViewInfo.skillerId==battlefield.topUI.lastLoactionId){
		battlefield.topUI.disableSkill();
	}
	if(data.battleViewType == 1){//普通攻击
		var src = battlefield.model.soldierInfo[data.battleViewInfo.attackPersonId];
		var dest = battlefield.model.soldierInfo[data.battleViewInfo.defencePersonId];
		var resultType = data.battleViewResult;	
		//data.battleViewResult目标结果，1命中，2暴击，3闪避，4未命中，5免疫
		if(src.soldierType == 4 || src.soldierType == 5){//弓兵、车兵
			battlefield.anims.attack2Sequence(src.coord,dest.coord,battlefield.model.updateLocal,data);
		}else{//刀 枪 骑
			battlefield.anims.attack3Sequence(src.coord,dest.coord,battlefield.model.updateLocal,data);
		}
	}else if(data.battleViewType == 2){//技能攻击
		var src = battlefield.model.soldierInfo[data.battleViewInfo.skillerId];
		var dest = data.battleViewInfo.targets;
		battlefield.anims.attack1Sequence(src,dest,data.battleViewInfo.skillerAnimation,battlefield.model.updateLocal1,data);
	}
};

battlefield.model.updateUI = function(){
	//by sun如果更新的正式当前激活的军团
			console.log("updateEl.locationId = "+updateEl.locationId);
			console.log("battlefield.topUI.lastLoactionId = "+battlefield.topUI.lastLoactionId);
			if(updateEl.locationId==battlefield.topUI.lastLoactionId){
				var active = battlefield.model.soldierInfo[updateEl.locationId];
				console.log("===============================updateEl.locationId = "+updateEl.locationId);
				if(active.type == "mine"){
					console.log(updateEl);
					battlefield.topUI.updateActiveBuff(updateEl);
				}
			}

};

/*
 * 普通攻击
 */
battlefield.model.updateLocal = function(data){
	//更新本地数据
	var update = data.battleViewInfo;
	if(!update){
		return;
	}
	//更新攻击方属性
	var soldierInfo = battlefield.model.soldierInfo;
	var atk = update.attackerUpdate;
	var localAtk = soldierInfo[update.attackPersonId];
	for(var i in atk){
		localAtk[i] = atk[i];
	}
	//更新被攻击方属性
	if(update.isDefenceDead){
		var localSoldier = soldierInfo[update.defencePersonId];
		if(localSoldier){
			var coord = localSoldier.coord;
			battlefield.anims.remove(coord.x,coord.y,"all");
		}
		delete soldierInfo[update.defencePersonId];
	}else{
		var def = update.defencerUpdate;
		var localDef = soldierInfo[update.defencePersonId];
		for(var i in def){
			localDef[i] = def[i];
		}
	}
	battlefield.model.updateAttrUI();
};

/*
 * 技能攻击
 */
battlefield.model.updateLocal1 = function(data){
	//更新本地数据
	var update = data.battleViewInfo;
	if(!update){
		return;
	}
	//更新攻击方属性
	var soldierInfo = battlefield.model.soldierInfo;
	var localAtk = soldierInfo[update.skillerId];
	if(localAtk){
		localAtk.mp -= update.skillerExpend;
	}
	//更新被攻击方属性
	for(var i=0;i<update.targets.length;i++){
		var target = update.targets[i];
		var localSoldier = soldierInfo[target.locationId];
		if(!localSoldier){
			console.log("错误的兵种");
			continue;
		};
		if(target.isDead){
			var coord = localSoldier.coord;
			battlefield.anims.remove(coord.x,coord.y,"all");
			delete soldierInfo[target.locationId];
		}else{
			var info = target.targetInfo;
			for(var j in info){
				localSoldier[j] = info[j];
			}
		}
	}
	battlefield.model.updateAttrUI();
};

/*
 * 推送防御状态
 */
battlefield.model.battleDefence = function(data){
	//技能变灰
	if(data.locationId==battlefield.topUI.lastLoactionId){
		battlefield.topUI.disableSkill();
	}
	var defenceStatus = data.defenceStatus;
	var soldier = battlefield.model.soldierInfo[data.locationId];
	var coord = soldier.coord;
	var dikuai = battlefield.anims.get(coord.x,coord.y);
	
	if(defenceStatus==true){
		if(dikuai && dikuai.soldier){
			var defence =new battlefield.anims.Defence(dikuai.soldier);
			dikuai.defence = defence;
		}
	}else if(defenceStatus==false){
		if(dikuai&& dikuai.soldier){
			battlefield.anims.remove(coord.x,coord.y,"defence");
		}
	}
};

/*
 * 当数据改变时更新UI界面上的血、蓝 属性 buff
 */
battlefield.model.updateAttrUI = function(){
	if(typeof battlefield.topUI.lastLoactionId !="undefined"){
		var active = this.soldierInfo[battlefield.topUI.lastLoactionId];
		battlefield.topUI.updateActiveAttr(active);
	}
	var coord = battlefield.eventHandle.selected;
	if(coord){
		battlefield.topUI.updateTarget(coord.x,coord.y);
	}
}
