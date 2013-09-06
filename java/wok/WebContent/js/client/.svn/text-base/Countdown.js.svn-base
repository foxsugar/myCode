/**
 * 倒计类 Countdown.js
 * 描述：倒计计时器，倒计数字事件归零计时，时器停止
 * @author 刘征
 */
var Countdown = function(startNumber,loopInterval,fn,onLoopStop,isStartNow){
	//构造方法传参，均为可选
	//起始数字  
	if(startNumber){
		this.startNumber = startNumber;
		this.countNumber = this.startNumber;
	}
	//时间间隔  为空则间隔为0
	if(loopInterval)
		this.loopInterval = loopInterval;
	//倒计循环中执行的方法
	if(fn)
		this.fn = fn;
	//倒计结束后的回调方法   
	if(onLoopStop)
		this.onLoopStop = onLoopStop;
	//是否初始化后就开始执行  默认为true
	if(typeof(isStartNow) != 'undefined')
		this.isStartNow = isStartNow;
	
	if(this.isStartNow){
		this.start();
	}
	//执行倒计集合计时器方法
	this.setCountList = function(list,loopInterval,fnList,thisLineStop,onLoopStop){
		this.startNumberList = list;
		this.loopInterval = loopInterval;
		this.thisLineStop = thisLineStop;
		if(fnList)
			this.fnList = fnList;
		//倒计结束后的回调方法   
		if(onLoopStop)
			this.onLoopStop = onLoopStop;
		this.startList();
	};
};
//类原型对象
var _p = Countdown.prototype;
	//倒计次数
	_p.loopCount = 0;
	//倒计起始数字
	_p.startNumber = 0;
	//每个时间间隔后 数字计算结果
	_p.countNumber = -1;
	//倒计时间间隔
	_p.loopInterval = 0;
	//倒计循环对象
	_p.loop = false;
	//是否开始循环
	_p.isStartNow = true;
	//倒计循环内执行函数
	_p.fn = function(){};
	//倒计结束回调
	_p.onLoopStop = function(){};
	//倒计方法
	_p.count = function(){
		if(this.countNumber > 0){
			this.countNumber -= this.loopInterval;
			this.loopCount ++;
			this.fn();
			if(this.countNumber <= 0){
				window.clearInterval(this.loop);
				this.onLoopStop();
			}
		}
	};
	//开始倒计
	_p.start = function(){
		var _ = this;
		this.loop = setInterval(function(){
			_.count();
		},this.loopInterval);
	};
	//停止方法
	_p.stop = function(){
		if(this.loop){
			window.clearInterval(this.loop);
		}
	};
	//起始数字与更改对象集合
	_p.startNumberList = [];
	//集合中单个数字变化后执行方法
	_p.fnList = function(mu){};
	//倒计循环内 减少集合数字的方法
	_p.countList = function(){
		var list = this.startNumberList;
		//停止判断标识
		var stop = true;
		//循环减小数组中每一个数字的值
		for(var i=0; i<list.length; i++){
			//如果该数字未归0
			if(list[i].startNumber > 0){
				//减小一次时间间隔
				list[i].startNumber -= this.loopInterval;
				//设置停止标识为false
				stop = false;
				//数字减小后执行的方法
				this.fnList(list[i]);
				//数字减小后归0或更小，则停止
				if(list[i].startNumber <= 0)
					this.thisLineStop(list[i]);//单个数字归0后执行的方法
			}
		}
		//所有数字都归0后，停止倒计循环
		if(stop){
			window.clearInterval(this.loop);
			//倒计循环停止后回调
			this.onLoopStop();
		}
	};
	//开始倒计集合循环
	_p.startList = function(){
		var _ = this;
		this.loop = setInterval(function(){
			_.countList();
		},this.loopInterval);
	};
	//集合中单个数字归零时的回调
	_p.thisLineStop = function(mu){};