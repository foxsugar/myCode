/*
 * 战场图片控制
 * anim:{
 * 		id：该动画的唯一标识
 * 		clip：在大图上的剪辑区域
 *		frame：每一帧的相对原点的偏移
 *      action：当前action
 * 		speed：当前action的速度
 *		actionName：序列名字（组成动画的帧）示例：normal（普通状态 如待机）、move（移动）、attack（攻击）等
 *		%actionName%Speed：播放速度
 *      name：gbox中的图片名
 * 		time：上次播放时间
 * 		cnt：总播放次数
 * 		ox：原始x
 * 		oy：原始y
 * 		x：坐标
 * 		y ：坐标
 *  	loop：是否可循环播放
 * 		visible：是否显示
 * 		flip：是否横向翻转
 * 		dx：目的x（移动）
 * 		dy：目的y（移动）
 * 		vx：x方向速度
 * 		vy：y方向速度
 * 		trigger：帧触发器（回调函数）
 * 		next： 此动画完成后，后续动画
 * }
 */
function Animation(rawObject){
	//帧计时器
	this.cnt = 0;
	//上一帧播放时间
	this.time = 0;
	//默认可循环
	this.loop = true;
	for(var i in rawObject){
		this[i] = rawObject[i];
	}
};

Animation.prototype.moveTime = 1000;//移动所需时间
	
/*
 * 移动动画
 */
Animation.prototype._move = function(){
	var anim = this;
	//同一时刻只有1个定时器
	if(this._moveInterval){
		clearInterval(this._moveInterval);
	}
	this._moveInterval = setInterval(function(){
		anim._packageMove();
	},1);
};

/*
 * 移动动画，为了实现平滑移动做了封装
 */
Animation.prototype._packageMove = function(){
	var now = new Date().getTime();
	if(!this._firstMoveTime){
		this._firstMoveTime = now;
		return;
	}
	var timeDiff = now - this._firstMoveTime;
	this._isMoveX = this.vx && ((this.vx>0 && this.x<this.dx)||(this.vx<0&&this.x>this.dx));
	this._isMoveY = this.vy && ((this.vy>0 && this.y<this.dy)||(this.vy<0&&this.y>this.dy));
	if(this._isMoveX){
		this.x = this.ox+Math.floor(timeDiff*this.vx+0.5);
	}
	if(this._isMoveY ){
		this.y = this.oy+Math.floor(timeDiff*this.vy+0.5);
	}
	//移动结束
	if(!this._isMoveX && !this._isMoveY && this._moveInterval){
		clearInterval(this._moveInterval);
		delete this._firstMoveTime;
		delete this._moveInterval;
		if(this.vx){
			this.x = this.dx;
		}
		if(this.vy){
			this.y = this.dy;
		}
		//移动到目的地后
		if(this.onarrive){
			this.onarrive();
		}
		console.log("clear "+this.name);
	}
}

/*
 * 判断帧数，移动位置  -1为动画已播放完，无后续帧
 */
Animation.prototype.decideFrame = function(){
	var length = this.action.length;
	var now = new Date().getTime();
	//首次播放
	if(!this.time || this.time == 0){
		this.time = now;
		return this.action[0];
	}else{
		//非首次播放
		var timeDiff = now - this.time;
		if(timeDiff > this.speed){
			this.cnt++;
			this.time = new Date().getTime();
		}
		//是否循环播放动画
		if(!this.loop && this.cnt>=length){
			this.visible = false;
			return -1;
		}else{
			return this.action[Math.floor(this.cnt%length)];
		}
	}
};
	
/*
 * 绘制动画
 */
Animation.prototype.draw = function(){
	if(!this.visible){//不可见
		return;
	}
	var i = this.decideFrame();
	if(i<0){
		if(this.onend){
			this.onend();
		}
		return;
	}
	var ctx = gbox.getBufferContext();
	if(this.flip){//翻转
		ctx.save();
		ctx.scale(-1,1);
	}
	var frameArray = this.frame[i];
	for(var j = 0;j<frameArray.length;j++){
		var clipId = frameArray[j][0];
		var dx;
		if(this.flip){
			dx = -2*this.x + frameArray[j][1];
		}else{
			dx = this.x + frameArray[j][1];
		}
		var dy = this.y + frameArray[j][2];
		
		var sx = this.clip[clipId][0];
		var sy = this.clip[clipId][1];
		var sw = this.clip[clipId][2];
		var sh = this.clip[clipId][3];
		ctx.drawImage(gbox.getImage(this.name),sx,sy,sw,sh,dx,dy,sw,sh);
	}
	if(this.dialog){
		this.dialog.draw();
	}
	if(this.flip){
		ctx.restore();
	}
};

/*
 * 开始动画
 */
Animation.prototype.start = function(){
	this.visible = true;
}

/*
 * 停止动画
 */
Animation.prototype.end = function(){
	this.visible = false;
}

/*
 * 改变帧序列
 */
Animation.prototype.changeAction = function(actionName,loop){
	var actionSpeed = actionName+"Speed";
	if(!this[actionName] || !this[actionSpeed]){
		return;
	}
	this.action = this[actionName];
	this.speed = this[actionSpeed];
	this.cnt = 0;
	this.time = 0;
	if(typeof loop =="boolean"){
		this.loop = loop;
		if(loop){
			this.start();
		}
	}
};

/**
 * 扩展动画的两个方法
 */
 
/*
 * 移动到
 */
Animation.prototype.moveTo = function(dx,dy){
	var offsetX = this.offsetX || 0;
	var offsetY = this.offsetY || 0;
	var coord = battlefield.eventHandle.transform(dx,dy);
	this.dx = coord.x+offsetX;
	this.dy = coord.y+offsetY;
	this.ox = this.x;
	this.oy = this.y;
	this.vx = (this.dx-this.ox)/this.moveTime;
	this.vy = (this.dy-this.oy)/this.moveTime;
	this._move();
};

/*
 * 改变位置
 */
Animation.prototype.changePosition = function(x,y){
	var offsetX = this.offsetX || 0;
	var offsetY = this.offsetY || 0;
	var coord = battlefield.eventHandle.transform(x,y);
	this.x = coord.x+offsetX;
	this.y = coord.y+offsetY;
};

