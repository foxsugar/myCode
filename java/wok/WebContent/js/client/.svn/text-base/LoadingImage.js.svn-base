/**
 * 等待加载界面
 */
var LoadingPanel = {};

LoadingPanel.openLoading = function(index,isGameLoading) {
	LoadingPanel.isGameLoading = !!isGameLoading;
	LoadingPanel.isOpen = false;//窗口绘制标识
	LoadingPanel.open(index);
	changeMap('cityMenuLayer');
};

LoadingPanel.closeLoading = function(index) {
	displayDestroy();
	exit(index);
	var object = gbox.getObject("levelMenu_2","loadingPanel");
	object.poly = [[0,0],[0,0],[0,0],[0,0]];
	changeMap('cityMenuLayer');
};

LoadingPanel.open = function(index) {
//	console.log('图片加载窗口已打开！！！！！！');
	isDrawUI[index] = true;
	LoadingPanel.isOpen = true;
	var sw = gbox.getScreenW();
	var sh = gbox.getScreenH();
	
	gbox.addObject({
				id : 'loadingPanel',
				x : 0,
				y : 0,
				group : 'levelMenu_2',
				tileset : 'logo',
				frame : 0,
				poly : [[0,0],[sw,0],[sw,sh],[0,sh]],
				initialize : function() {
				},
				first : function() {
				},
				myclick : function() {
					if(!LoadingPanel.isGameLoading){
						if(((1048 < lastTouchMoveX) && (lastTouchMoveX < 1048 + gbox.getImage("ty_an_17").width)) && 
							((212 < lastTouchMoveY) && (lastTouchMoveY < 212+gbox.getImage("ty_an_17").height)))
						{
							LoadingPanel.closeLoading(index);					   	    
						}else{
							//console.log('加载界面！！！！');
						}
					}
				},
				blit : function() {
					if (isDrawUI[index] && LoadingPanel.isOpen) {
						var loadingBG_X = 0;
						var loadingBG_Y = 0;
						var loadingBG_Image = 'logo';
						var loadingBarBG_X = 292;
						var loadingBarBG_Y = 453;
						var loadingBarBG_Image = 'jdt_02';
						var loadingBar_X = 326;
						var loadingBar_Y = 462;
						var loadingBar_Image = 'jdt_03';
						var bW = 0;
						var bH = 0;
						var text = '载入中... ';
						var tx = (sw - gbox.getTextWidth(text,24))/2;
						var ty = sh/2;
						
						if(!LoadingPanel.isGameLoading){
							loadingBG_Image = 'loading_03';
							bW = gbox.getImage(loadingBG_Image).width;
							bH = gbox.getImage(loadingBG_Image).height;
							loadingBG_X = (sw - bW)/2;
							loadingBG_Y = (sh - bH)/2;
							tx = loadingBG_X + (bW - gbox.getTextWidth(text,24))/2;
							ty = loadingBG_Y + bH/2;
							loadingBarBG_X = 425;
							loadingBarBG_Y = 495;
							loadingBarBG_Image = 'loading_01';
							loadingBar_X = 449;
							loadingBar_Y = 502;
							loadingBar_Image = 'loading_02';
						}
						//加载背景图
						gbox.drawImage(loadingBG_Image,loadingBG_X,loadingBG_Y);
						//加载文字
						gbox.drawString(text,tx,ty,'#FFFFFF',24);
						//进度条背景图
						gbox.drawImage(loadingBarBG_Image,loadingBarBG_X,loadingBarBG_Y);
						//显示区域宽度宽度
						var bw = Math.floor(((gbox.getImage(loadingBar_Image).width) * gbox.loader.completeImage) / gbox.loader.titalImage);
						//显示区域
						gbox.setClip(gbox.getBufferContext(),
								loadingBar_X,loadingBar_Y,bw,gbox.getImage(loadingBar_Image).height);
						//进度条图
						gbox.drawImage(loadingBar_Image,loadingBar_X,loadingBar_Y);
						//绘制显示区域
						gbox.restoreClip(gbox.getBufferContext());
						
						if(!LoadingPanel.isGameLoading){
							if(((1048 < touchMoveX) && (touchMoveX < 1048 + gbox.getImage("ty_an_17").width)) && 
								((212 < touchMoveY) && (touchMoveY < 212+gbox.getImage("ty_an_17").height)))
							{
							    gbox.drawImage('ty_an_17',1048,212);						   	    
							}else{
								gbox.drawImage('ty_an_18',1048,212);
							}
						}
					}
				}
			});
};

/**
 * 图片加载窗口
 */
var LoadingImage = function(){
	this.pollingThread  = false;//轮询对象
	this.pollingInterval = 50;//轮询等待间隔
	this.titalImage = 0;//总图片数
	this.completeImage = 0;//加载完成图片数
	this.waitingCount = 1;//轮询数量
	this.openLoadingPanel = true;//是否打开等待界面
	this.isGameLoading = false;//是否是游戏初始化加载
	/*
	 * 重置数据项 
	 */
	this.loadReset = function(){
		this.pollingThread = false;
		this.pollingInterval = 10;
		this.titalImage = 0;
		this.completeImage = 0;
		this.waitingCount = 1;
	};
	
	/*
	 * 监听，当图片加载轮询完成后执行
	 */
	this.onload = function(){};
	
	/*
	 * 游戏初始化加载图片方法
	 * @index
	 * @beforeLoadingFn 开始绘制加载进度条之前加载的图片
	 * @loadingFn   加载图片方法
	 * @openFn	   	图片加载完成后执行的方法
	 */
	this.gameLoading = function(index,beforeLoadingFn,loadingFn,openFn){
		var gameLoading = new LoadingImage();
		var _ = this;
		//重构引擎方法
		gbox.addImage = _.addImage;
		gbox.addScript =  _.addScript;
		gameLoading.load(
				index, 
				beforeLoadingFn, 
				function(){
					//开始加载图片资源
					_.load(index,
							loadingFn, 
							openFn,
							true,
							true
					);
				}, 
				false,
				true,
				false
		);
	}; 
	
	/*
	 * 加载图片方法
	 * @index
	 * @loadingFn  加载图片方法
	 * @openFn	   	图片加载完成后执行的方法
	 */
	this.load = function(index,loadingFn,openFn,openLoadingPanel,isGameLoading,isPoll){
		if(typeof(openLoadingPanel) != 'undefined')
			this.openLoadingPanel = openLoadingPanel;
		else
			this.openLoadingPanel = true;
		
		this.isGameLoading = !!isGameLoading;
		
		gbox.loader = this;
		//打开图片加载等待界面
		if(this.openLoadingPanel)
			LoadingPanel.openLoading(index,this.isGameLoading);
		//赋值 图片加载完成监听
		this.onload = openFn;
		//加载图片
		this._execution(loadingFn);
		//开始轮询，等待图片完成
		if(!isPoll)
			this._polling(index,openLoadingPanel);
	}; 
	
	/*
	 * 轮询方法，等待图片加载完成
	 */
	this._polling = function(index){
		var _ = this;
//		console.log('--------------  执行callback : ' + _.waitingCount + ' ------------------');
		//获取剩余图片数量
		var lr = _.getLoadRemaining();
//		console.log('--------------  ' + lr + ' 张图片正在加载中。。。  ------------------');
		//数量为0表示加载完成
		if(lr != 0){
			//回调自身
			_.pollingThread = window.setTimeout(function(){
				_._polling(index);
			},_.pollingInterval);
		}else{
			//关闭轮询
			if(_.pollingThread)
				window.clearTimeout(_.pollingThread);
			//关闭图片加载等待界面
			if(this.openLoadingPanel)
				LoadingPanel.closeLoading(index);
			//执行加载完成监听
			_._execution(_.onload);
		}
		_.waitingCount++;
	}; 
	
	/*
	 * 执行参数方法
	 */
	this._execution = function(fn){
		if(fn)
			fn();
	};
	
	this.addImage = function(id,src) {
		if (gbox._images[id])
			if (gbox._images[id].getAttribute("src")==src)
				return;
			else
				delete gbox._images[id];
		var loader = this.loader;
		if(loader)
			loader.titalImage++;
		gbox._images[id] = new Image();
		gbox._images[id].onload = function(){
//			console.log('--------------  图片:'+this.id+' 加载完成    ------------------');
			if(loader)
				loader.completeImage++;
		};
		gbox._images[id].setAttribute('id',id);
		gbox._images[id].src = src;
	};
	
	/*
	 * 获取剩余图片数量
	 */
	this.getLoadRemaining = function(){
		return  this.titalImage - this.completeImage;
	};
	
	/*
	 * 加载JavaScript文件
	 */
	this.addScript = function(src){
		var script= document.createElement('script');
		script.type = "text/javascript";
		var loader = this.loader;
		if(loader)
			loader.titalImage++;
		script.onload = function(){
//			console.log('---javascript文件:src = '+src+' ---- 加载完成 !!!');
			if(loader)
				loader.completeImage++;
		};
		script.src = src;
		document.getElementsByTagName('body')[0].appendChild(script);
	};
};