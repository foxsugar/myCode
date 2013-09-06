/*
 * 一场战斗中用到的动画，动态的增加删除
 */
battlefield.anims = {
	mine_type2name : [
		null,
		"daobingshangfanggongji",
		"qiangbingshangfanggongji",
		"qibingshangfanggongji",
		"gongbingshangfanggongji",
		"chebingshangfanggongji",
	],
	target_type2name : [
		null,
		"daobingxiafanggongji",
		"qiangbingxiafanggongji",
		"qibingxiafanggongji",
		"gongbingxiafanggongji",
		"chebingxiafanggongji",
	]
};

/*
 * 初始化创建动画
 */
battlefield.anims.create = function(){
	var data = battlefield.model.soldierInfo;
	if(!data){
		return;
	}
	for(var i=0;i<data.length;i++){
		var el = data[i];
		if(!el){//数组中间的某个元素被删除
			continue;
		}
		var animName;
		var x;
		var y;
		if(el.type == "mine"){
			animName = this.mine_type2name[el.soldierType];
			x = el.locationX -1;
			y = el.locationY -1;
		}else if(el.type == "target"){
			animName = this.target_type2name[el.soldierType];
			x = 12-el.locationX;
			y = 5-el.locationY;
		}
		el.coord = {x:x,y:y};
		var anim = this.add("soldier",animName,x,y,true);
		anim.locationId = el.locationId;
		anim.start();
		var dialog = new this.Dialog(anim,el);
		anim.dialog = dialog;
	}
};

/*
 * 添加动画，保证参数顺序
 */
battlefield.anims.add = function(type,anim,x,y,loop,flip,dx,dy){
	if(!this.store){
		this.store = new Array;
		for(var i=0;i<battlefield.eventHandle.cw;i++){
		this.store[i] = new Array;
		}
	}
	var anim = anim instanceof Animation ?anim : battlefield.animationFactory.create(anim);
	if(!anim){
		console.log("没有加载动画："+anim);
		return;
	}
	var coord = battlefield.eventHandle.transform(x,y);
	if(dx&&dy){
		var dCoord = battlefield.eventHandle.transform(dx,dy);
		this._init(anim,coord.x,coord.y,loop,flip,dCoord.x,dCoord.y);
	}else{
		this._init(anim,coord.x,coord.y,loop,flip);
	}
	if(!this.store[x][y]){
		this.store[x][y] = new Object;
	}
	this.store[x][y][type] = anim;
	return anim;
}

/**
 * 获取某个地块
 */
battlefield.anims.get= function(x,y){
	if(!this.store){
		return null;
	} 
	if(!this.store[x]){
		return null;
	}
	if(!this.store[x][y]){
		this.store[x][y] = new Object;
	}
	return this.store[x][y];
}

/**
 * 获取某个地块的soldier
 */
battlefield.anims.getSoldier= function(x,y){
	if(this.store && this.store[x] && this.store[x][y] && this.store[x][y].soldier){
		return this.store[x][y].soldier;
	}else{
		return null;
	}
}

/*
 * 删除动画
 */
battlefield.anims.remove = function(x,y,type){
	if(this.store && this.store[x] && this.store[x][y]){
		if(type == "all"){
			delete this.store[x][y];
		}else{
			if(this.store[x][y][type]){
				delete this.store[x][y][type];
			}
		}
	}
}

/*
 * 初始化动画部分属性
 */
battlefield.anims._init = function(anim,x,y,loop,flip,dx,dy){
	//图片左上角相对菱形中心的偏移
	var offsetX = anim.offsetX || 0;
	var offsetY = anim.offsetY || 0;
	//原始起点坐标
	anim.ox = x + offsetX;
	anim.oy = y + offsetY;
	//绘制坐标
	anim.x = anim.ox;
	anim.y = anim.oy;
	//移动时的终点坐标
	anim.dx = dx + offsetX;
	anim.dy = dy + offsetY;
	//是否循环
	anim.loop = !!loop;
	//是否翻转
	anim.flip = !!flip;
	if(dx){
		anim.vx = (anim.dx-anim.ox)/anim.moveTime;
	}
	if(dy){
		anim.vy = (anim.dy-anim.oy)/anim.moveTime;
	}
	if(dx || dy){
		anim._move();
	}
};

/*
 * 绘制全部动画
 */
battlefield.anims.draw = function(){
	if(!this.store){
		return;
	}
	var count = this.store.length;
	for(var x=0;x<count;x++){
		var subArray = this.store[x];
		for(var y=0;y<subArray.length;y++){
			var as = subArray[y];
			if(as){
				if(as.active){//激活
					as.active.draw();
				}
				if(as.soldier){//兵种
					as.soldier.draw();
				}
				if(as.dialog){//信息框
					as.dialog.draw();
				}
				if(as.defence){//防御状态
					as.defence.draw();
				}
				if(as.skill){//技能特效
					as.skill.draw();
				}
				if(as.number){//数字、状态（暴击、未命中等）
					as.number.draw();
				}
				if(as.select){//选择提示箭头
					as.select.draw();
				}
			}
		}
	}
};

/*
 * 技能攻击动作序列
 * src {x,y} : 攻击方阵位置
 * dest {x,y} 被攻击方位置
 *  * animName : 被攻击方承受特效名
 */
battlefield.anims.attack1Sequence = function(src,targets,animName,callBack,data){
	var srcCoord = src.coord;
	var srcAnim = this.store[srcCoord.x][srcCoord.y].soldier;//攻击方现在是wait
	srcAnim.changeAction("wait",true);//修正切换帧序列错误
	var attackEffect = battlefield.animationFactory.create("shifangjineng");//攻击特效
	attackEffect.onend = function(){
		battlefield.anims.remove(srcCoord.x,srcCoord.y,"skill");
		console.log("删除攻击动画");
		for(var i=0;i<targets.length;i++){
			var target = targets[i];
			var dest = battlefield.model.soldierInfo[target.targetInfo.locationId];
			if(!dest){//错误的方阵
				console.log("错误的方阵");
				continue;
			}
			var coord = dest.coord;
			var destAnim = battlefield.anims.store[coord.x][coord.y].soldier;//被攻击方现在应该是wait
			destAnim.changeAction("wait",true);//修正切换帧序列错误
			var effectAnim = battlefield.animationFactory.create(animName);//被攻击特效
			if(src.type == dest.type){//向自己方阵释放（增益技能）
				console.log("技能特效：" + effectAnim.name + "("+coord.x+","+coord.y+")");
				battlefield.anims.add("skill",effectAnim,coord.x,coord.y,false).start();
				battlefield.anims.get(coord.x,coord.y).number = new battlefield.anims.Number(destAnim,target.battleViewResult,target.effectType,target.effectValue);
				if(i == 0){//数组的第一个动画回调
					effectAnim.onend = function(){
						callBack(data);
					}
				}
			}else{
				if(destAnim.name.indexOf("chebing") == 0){//车兵
					var diff = 5;
					if(coord.x < 5){
						destAnim.x -=diff;
						destAnim.y -=diff;
					}else{
						destAnim.x +=diff;
						destAnim.y +=diff;
					}
					console.log("技能特效：" + effectAnim.name + "("+coord.x+","+coord.y+")");
					battlefield.anims.add("skill",effectAnim,coord.x,coord.y,false).start();
					battlefield.anims.get(coord.x,coord.y).number = new battlefield.anims.Number(destAnim,target.battleViewResult,target.effectType,target.effectValue);
					//保存变量
					effectAnim.destAnim = destAnim;
					effectAnim.coord = coord;
					if(i == 0){//数组的第一个动画回调
						effectAnim.onend = function(){
							if(coord.x < 5){
								destAnim.x +=diff;
								destAnim.y +=diff;
							}else{
								destAnim.x -=diff;
								destAnim.y -=diff;
							}
							callBack(data);
						}
					}else{
						effectAnim.onend = function(){
							if(coord.x < 5){
								destAnim.x +=diff;
								destAnim.y +=diff;
							}else{
								destAnim.x -=diff;
								destAnim.y -=diff;
							}
						}
					}
				}else{
					var destBeAttack = battlefield.animationFactory.create(destAnim.name.replace("gongji","beiji"));//目标被攻击
					console.log("兵种被击动画：" + destBeAttack.name + "("+coord.x+","+coord.y+")");
					battlefield.anims.add("soldier",destBeAttack,coord.x,coord.y,false).start();
					console.log("技能特效：" + effectAnim.name + "("+coord.x+","+coord.y+")");
					battlefield.anims.add("skill",effectAnim,coord.x,coord.y,false).start();
					battlefield.anims.get(coord.x,coord.y).number = new battlefield.anims.Number(destBeAttack,target.battleViewResult,target.effectType,target.effectValue);
					//保存变量
					destBeAttack.destAnim = destAnim;
					destBeAttack.coord = coord;
					if(i == 0){//数组的第一个动画回调
						destBeAttack.onend = function(){
							console.log("技能特效完成，还原兵种动画：" + this.destAnim.name + "("+this.coord.x+","+this.coord.y+")");
							battlefield.anims.add("soldier",this.destAnim,this.coord.x,this.coord.y,true).start();
							callBack(data);
						}
					}else{
						destBeAttack.onend = function(){
							console.log("技能特效完成，还原兵种动画：" + this.destAnim.name + "("+this.coord.x+","+this.coord.y+")");
							battlefield.anims.add("soldier",this.destAnim,this.coord.x,this.coord.y,true).start();
						}
					}
				}
			}
		}
	};
	srcAnim.onend = function(){
		srcAnim.changeAction("wait",true);
	};
	this.add("skill",attackEffect,srcCoord.x,srcCoord.y,false).start();
	srcAnim.changeAction("attack",false);
};
	
/*
 * 远程攻击动作序列
 */
battlefield.anims.attack2Sequence = function(src,dest,callBack,data){
	var srcAnim = this.store[src.x][src.y].soldier;//攻击方现在是wait
	srcAnim.changeAction("wait",true);//修正切换帧序列错误
	var destAnim = this.store[dest.x][dest.y].soldier;//被攻击方现在是wait
	destAnim.changeAction("wait",true);//修正切换帧序列错误
	if(destAnim.name.indexOf("chebing") == 0){//车兵被击
		var diff = 5;
		srcAnim.onend = function(){
			srcAnim.changeAction("wait",true);
			if(dest.x < 5){
				destAnim.x +=diff;
				destAnim.y +=diff;
			}else{
				destAnim.x -=diff;
				destAnim.y -=diff;
			}
			if(srcAnim.name.indexOf("gong") == 0){
				var effectAnim = battlefield.animationFactory.create("gongbingputonggongji");
				battlefield.anims.add("skill",effectAnim,dest.x,dest.y,false).start();
				battlefield.anims.get(dest.x,dest.y).number = new battlefield.anims.Number(destAnim,data.battleViewResult,data.battleViewInfo.defencePersonHurtType,data.battleViewInfo.defenceAmountHurt);
				effectAnim.onend = function(){
					if(dest.x < 5){
						destAnim.x +=diff;
						destAnim.y +=diff;
					}else{
						destAnim.x -=diff;
						destAnim.y -=diff;
					}
					callBack(data);
				}
			}else{
				setTimeout(function(){
						if(dest.x < 5){
							destAnim.x +=diff;
							destAnim.y +=diff;
						}else{
							destAnim.x -=diff;
							destAnim.y -=diff;
						}
					callBack(data);
				},200);
			}
		};
	}else{
		var destBeAttack = battlefield.animationFactory.create(destAnim.name.replace("gongji","beiji"));//目标被攻击
		srcAnim.onend = function(){
			srcAnim.changeAction("wait",true);
			console.log("攻击动画改为待机动画");
			battlefield.anims.add("soldier",destBeAttack,dest.x,dest.y,false).start();
			if(srcAnim.name.indexOf("gong") == 0){
				var effectAnim = battlefield.animationFactory.create("gongbingputonggongji");
				battlefield.anims.add("skill",effectAnim,dest.x,dest.y,false).start();
			}
			battlefield.anims.get(dest.x,dest.y).number = new battlefield.anims.Number(destBeAttack,data.battleViewResult,data.battleViewInfo.defencePersonHurtType,data.battleViewInfo.defenceAmountHurt);
			destBeAttack.onend = function(){
				battlefield.anims.add("soldier",destAnim,dest.x,dest.y,true).start();
				callBack(data);
			}
		};
	}
	srcAnim.changeAction("attack",false);
};

/*
 * 近战攻击动作序列
 */
battlefield.anims.attack3Sequence = function(src,dest,callBack,data){
		console.log("普通攻击" + src + dest);
		var srcAnim = this.store[src.x][src.y].soldier;//攻击方现在是wait
		srcAnim.changeAction("wait",true);//修正切换帧序列错误
		var destAnim = this.store[dest.x][dest.y].soldier;//被攻击方现在是wait
		destAnim.changeAction("wait",true);//修正切换帧序列错误
		if(destAnim.name.indexOf("chebing") == 0){//车兵被击
			var diff = 5;
			srcAnim.onarrive = function(){
				this.changeAction("attack",false);
				setTimeout(function(){
					if(dest.x < 5){
						destAnim.x +=diff;
						destAnim.y +=diff;
					}else{
						destAnim.x -=diff;
						destAnim.y -=diff;
					}
					battlefield.anims.get(dest.x,dest.y).number = new battlefield.anims.Number(destAnim,data.battleViewResult,data.battleViewInfo.defencePersonHurtType,data.battleViewInfo.defenceAmountHurt);
					setTimeout(function(){
						if(dest.x < 5){
							destAnim.x +=diff;
							destAnim.y +=diff;
						}else{
							destAnim.x -=diff;
							destAnim.y -=diff;
						}
						callBack(data);
					},200);
				},200);
			}
		}else{
			var destBeAttack = battlefield.animationFactory.create(destAnim.name.replace("gongji","beiji"));//目标被攻击
			srcAnim.onarrive = function(){
				this.changeAction("attack",false);
				setTimeout(function(){
					battlefield.anims.add("soldier",destBeAttack,dest.x,dest.y,false).start();
					battlefield.anims.get(dest.x,dest.y).number = new battlefield.anims.Number(destBeAttack,data.battleViewResult,data.battleViewInfo.defencePersonHurtType,data.battleViewInfo.defenceAmountHurt);
					destBeAttack.onend = function(){
						battlefield.anims.add("soldier",destAnim,dest.x,dest.y,true).start();
						callBack(data);
					}
				},200);
			}
		}
		srcAnim.onend = function(){
			this.changePosition(src.x,src.y);
			this.changeAction("wait",true);
		}
		if(src.x < dest.x){
			srcAnim.moveTo(dest.x-1,dest.y);
		}else{
			srcAnim.moveTo(dest.x+1,dest.y);
		}
};
	
/*
 * 城墙攻击动作序列
 */
battlefield.anims.attack4Sequence = function(src,dest){
		
};

/*
 * 方阵上方信息框
 */
battlefield.anims.Dialog = function(parent,el){
	this.offsetX = 36;
	this.offsetY = -48;
	if(parent.offsetX1){
		this.offsetX +=parent.offsetX1;
	}
	if(parent.offsetY1){
		this.offsetY +=parent.offsetY1;
	}
	this.imageName = "zc_tb_10";
	this.draw = function(){
		var ctx = gbox.getBufferContext();
		var img = gbox.getImage(this.imageName);
		var x = parent.x + this.offsetX;
		var y = parent.y + this.offsetY;
		ctx.drawImage(img,x,y);
		ctx.textBaseline = "top";//文字顶部对齐
		ctx.textAlign = "center";//左右居中对齐
		ctx.fillStyle = "white";
		ctx.font = "黑体 16px";
		ctx.fillText(el.flag,x+14,y+9);
		ctx.fillText(el.soldierName,x+58,y+4);
		ctx.fillText(el.soldierAmount,x+58,y+22);
	}
}

/*
 * 防御状态
 */
battlefield.anims.Defence = function(parent){
	this.offsetX = 62;
	this.offsetY = -15;
	if(parent.offsetX1){
		this.offsetX +=parent.offsetX1;
	}
	if(parent.offsetY1){
		this.offsetY +=parent.offsetY1;
	}
	this.imageName = "zc_tb_118";//临时图片

	this.draw = function(){
		var ctx = gbox.getBufferContext();
		var img = gbox.getImage(this.imageName);
		var x = parent.x + this.offsetX;
		var y = parent.y + this.offsetY;
		ctx.drawImage(img,x,y);
	}
}

/*
 * 激活
 */
battlefield.anims.Active = function(parent){
	this.offsetX = -14;
 	this.offsetY = -42;
 	if(parent.offsetX1){
		this.offsetX +=parent.offsetX1;
	}
	if(parent.offsetY1){
		this.offsetY +=parent.offsetY1;
	}
	this.imageName = "zc_tb_116";//临时图片


	this.draw = function(){
		var ctx = gbox.getBufferContext();
		var img = gbox.getImage(this.imageName);
		var x = parent.x + this.offsetX;
		var y = parent.y + this.offsetY;
		ctx.drawImage(img,x,y);
	}
	
}


/*
 * 方阵上方选中箭头
 */
battlefield.anims.Select = function(parent){
	this.offsetX = 0;
	this.offsetY = -30;
	if(parent.offsetX1){
		this.offsetX +=parent.offsetX1;
	}
	if(parent.offsetY1){
		this.offsetY +=parent.offsetY1;
	}
	this.imageName = "zc_tb_28";
	this.draw = function(){
		var ctx = gbox.getBufferContext();
		var img = gbox.getImage(this.imageName);
		var x = parent.x + this.offsetX;
		var y = parent.y + this.offsetY;
		ctx.drawImage(img,x,y);
	};
	this.onclick = function(locationId){
		var skillIndex = battlefield.model.releaseSkillIndex;
		$("#canvas").css("cursor","default");
		console.log(skillIndex);
		if(skillIndex >= 0){
			//释放技能
			multiBattle.skillAttackForMultiBattle(battlefield.model.releaseSkillIndex,locationId,function(data){
				console.log('释放技能');
				console.log(data);
				if(data.error){
					return;
				}
				if(data){
					battlefield.model.releaseSkillIndex = -1;
					battlefield.topUI.removeArrow();
				}
			});
		}else{
			//普通攻击
			multiBattle.attackTargetForMultiBattle(locationId,function(data){
				console.log('普通攻击');
				console.log(data);
				if(data.error){
					return;
				}
				battlefield.topUI.removeArrow();
			});
		}
	};
};

/*
 * 状态 伤害 增益数字
 */
battlefield.anims.Number = function(parent,type1,type2,num){
	this.speed = 3;//2px每帧
	this.disY = 0;//当前y偏移
	this.disY_limit = 60;//y偏移最大值
	this.offsetX = 86;
	if(parent.offsetX1){
		this.offsetX +=parent.offsetX1;
	}
	this.plus = "num_1";
	this.minus = "num_2";
	//type1 目标结果，1命中，2暴击，3闪避，4未命中，5免疫
	this.rs2 = "zc_tb_85";
	this.rs3 = "zc_tb_83";
	this.rs4 = "zc_tb_87";
	this.rs5 = "zc_tb_86";
	this.rs6 = "zc_tb_84";//吸收
	
	switch(type1){
		case 2 : 
			if(type2==2){
				this.typeImage = gbox.getImage(this.rs6);
			}else{
				this.typeImage =gbox.getImage( this.rs2);
			}
			break;
		case 3 : this.typeImage =  gbox.getImage(this.rs3);break;
		case 4 : this.typeImage =  gbox.getImage(this.rs4);break;
		case 5 : this.typeImage =  gbox.getImage(this.rs5);break;
		case 1 : 
			if(type2==2){
				this.typeImage =  gbox.getImage(this.rs6);
			}
			break;
	}
	if(num>0){
		this.image = this.plus;
		this.imageSizes = battlefield.num2name.getImages(num);
	}else if(num<0){
		this.image = this.minus;
		this.imageSizes = battlefield.num2name.getImages(-num);
	}else{
		this.imageSizes = [];
	}
	//字符总体宽度
	this.totalWidth = this.imageSizes.length * battlefield.num2name.size;
	if(this.typeImage){
		this.totalWidth +=this.typeImage.width;
	}
	this.draw = function(){
		if(this.disY>this.disY_limit){
			return;
		}
		this.disY += this.speed;
		var left = parent.x +this.offsetX - this.totalWidth/2;
		var ctx = gbox.getBufferContext();
		if(this.typeImage){
			ctx.drawImage(this.typeImage,left,parent.y - this.disY-this.typeImage.height);
			left += this.typeImage.width;
		}
		var size = battlefield.num2name.size;
		for(var i=0;i<this.imageSizes.length;i++){
			var img = gbox.getImage(this.image);
			if(img){
				ctx.drawImage(img,this.imageSizes[i],0,size,size,
										left,parent.y - this.disY-size,size,size);
				left += size;
			}
		}
	}
}

