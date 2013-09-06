/**
 * MouseWheelPanel
 */
var MouseWheelPanelObj = MouseWheelPanelObj||{};
var MouseWheelPanel = function(){
	//绘制用canvas context对象
	this.context = false;
	this.setContext = function(context){
		this.context = context;
	};
	this.getContext = function(){
		return this.context;
	};
	//显示数据
	this.store = {
		//单选选中索引
		selectIndex : -1,
		//多选选中索引
		multipleChoiceIndex : [],
		//多选选中索引
		isMultipleChoice : false,
		//绘制起点
		x : 0,
		y : 0,
		//行高
		lineHeight : 0,
		//最多显示行数
		showLine : 0,
		//总行数
		totalLine : 0,
		//滚动速度  像素
		speed : 10,
		//标题栏高度(向上箭头)  像素
		titleHeight : 20,
		//显示区域
		area : false,
		//显示内容集合
		data : false
	};
	//滚动条数据
	this.scrollBar = {
		//向上箭头高度  像素
		upHeight:20,
		//向下箭头高度  像素
		downHeight : 20,
		//滚动条绘制起点
		x:0,
		y:0,
		//滚动条长度 像素
		barHeight : 0,
		//滚动条长度 像素
		barWidth : 20,
		//滚动条区域长度 像素
		height : 0,
		//滚动条区域宽度  像素
		width : 25
	};
	//滚动条拖动标识
	this.drag = {
			isNotUp : false,//鼠标左键是否已经弹起
			isCanDrag : false,//是否可拖动
			isDraging : false,//是否是拖动中
			x:0,//拖动坐标起点
			y:0
	};
	this.setTotalLine = function(totalLine){
		this.store.totalLine = totalLine;
	};
	//事件处理
	this.handlers = {
	    _mwp:this,
	    moveit:false,
		store : {
			x:0,
			y:0,
			eventArea : false,
		},
		//设置事件区域
		setEventArea : function(area){
			area.length ? this.store.eventArea = area : this.store.eventArea = false;
		},
		//设置鼠标移动坐标
		setMoveXY : function(x,y){
			x ? this.store.X = x : this.store.X = 0;
			y ? this.store.Y = y : this.store.Y = 0;
		},
		//鼠标是否在事件区域
		isInEventArea : function(){
			var re = false;
			//滚动区域	
			var ea = this.store.eventArea;
			//鼠标移动坐标
			var x = this.store.X;
			var y = this.store.Y;
			//若区域存在
			if(ea)
				if(ea[0]<x && x<ea[0]+ea[2] && ea[1]<y && y<ea[1]+ea[3])
					re = true;
			return re;
		},
		//鼠标滚动接口
		onMousewheel : function(event,delta){},
		//鼠标单击接口
		onMouseClick : function(event){},
		//鼠标按下接口
		onMouseDown : function(event){},
		//鼠标弹起接口
		onMouseUp : function(event){},
		//鼠标移动接口
		onMouseMove : function(event){},
		//鼠标滚动监听
		mousewheel :function(obj,event,delta){
			//若鼠标移动到触发区域内
			if(obj.handlers.isInEventArea())
				//执行鼠标滚动事件
				obj.handlers.onMousewheel(event,delta);
		},
		//鼠标单击监听
		mouseClick : function(obj,event){
			//若鼠标移动到触发区域内
			if(obj.handlers.isInEventArea())
				//执行鼠标单击事件
				obj.handlers.onMouseClick(event);
		},
		//鼠标按下监听
		mouseDown : function(obj,event){
			//若鼠标移动到触发区域内
			if(obj.handlers.isInEventArea())
				//执行鼠标单击事件
				obj.handlers.onMouseDown(event);
		},
		//鼠标弹起监听
		mouseUp : function(obj,event){
			//若鼠标移动到触发区域内
			if(obj.handlers.isInEventArea())
				//执行鼠标单击事件
				obj.handlers.onMouseUp(event);
		},
		//鼠标移动监听
		mouseMove : function(obj,event){
			//若鼠标移动到触发区域内
			if(obj.handlers.isInEventArea())
				//执行鼠标单击事件
				obj.handlers.onMouseMove(event);
		},
		eventTemp : {},
		//打开鼠标滚动事件
		//在打开的界面创建时调用，保证界面打开状态下area有值
		//@area 滚动触发区域数据格式 : [x,y,width,height]
		scrollOpen : function(area){
			var _ = this._mwp;
			this.eventTemp['mousewheel'] = function(event,delta){
				_.handlers.mousewheel(_,event,delta);
			};
			this.eventTemp['click'] = function(event){
				_.handlers.mouseClick(_,event);
			};
			this.eventTemp['mousedown'] = function(event){
				_.handlers.mouseDown(_,event);
			};
			this.eventTemp['mousemove'] = function(event){
				_.handlers.mouseMove(_,event);
			};
			this.eventTemp['mouseup'] = function(event){
				_.handlers.mouseUp(_,event);
			};
			//设置滚动触发区域
			this.setEventArea(area);
			//打开canvas滚动事件
			$('canvas').bind('mousewheel', this.eventTemp['mousewheel']);
			$('canvas').bind('click', this.eventTemp['click']);
			
			$('canvas').bind('mousedown', this.eventTemp['mousedown']);
			$('canvas').bind('mousemove', this.eventTemp['mousemove']);
			$('canvas').bind('mouseup', this.eventTemp['mouseup']);
			
		},
		scroll : function(x,y,mwfn,cfn,mdfn,mufn,mmfn){
			//设置鼠标移动位置
			this.setMoveXY(x,y);
			//设置滚动处理函数，默认参数为event,delta
			this.onMousewheel = mwfn;
			if(cfn)//单击事件
				this.onMouseClick = cfn;
			if(mdfn)//按下事件
				this.onMouseDown = mdfn;
			if(mufn)//弹起事件
				this.onMouseUp = mufn;
			if(mmfn)//移动事件
				this.onMouseMove = mmfn;
		},
		scrollClose : function(){
			//注销滚动触发区域
			this.store = {
				x:0,
				y:0,
				eventArea : false,
			};
			//删除canvas滚动事件监听
			$('canvas').unbind('mousewheel', this.eventTemp['mousewheel']);
			$('canvas').unbind('click', this.eventTemp['click']);
			$('canvas').unbind('mousedown', this.eventTemp['mousedown']);
			$('canvas').unbind('mousemove', this.eventTemp['mousemove']);
			$('canvas').unbind('mouseup', this.eventTemp['mouseup']);
		}
	};
	this.tool = {
			_mwp:this,
			moveonLine : function(x,y,color){
					var ctx = this._mwp.getContext();
					if(ctx){
						var ea = this._mwp.store.area;
						ctx.save();
						ctx.fillStyle = color;
						ctx.fillRect(x,y,ea[2],this._mwp.store.lineHeight);
						ctx.restore();
					}
			},
			line : function(x,y,w,h,color){
					var ctx = this._mwp.getContext();
					if(ctx){
						ctx.save();
						ctx.strokeStyle=color;
						ctx.beginPath();
						ctx.moveTo(x,y);
						if(w)
							ctx.lineTo(x+w,y);
						if(h)
							ctx.lineTo(x,y+h);
						ctx.stroke();
						ctx.restore();
					}
			},
			//判断X,Y是否在显示区域
			isInArea : function(x,y){
				var ea = this._mwp.store.area;
				if(ea[0]<x && x<ea[0]+ea[2] && ea[1]<y && y<ea[1]+ea[3]){
					return true;
				}else{
					return false;
				}
			},
			getIndexFormMultipleChoiceIndex : function(index){
				var re = -1;
				var mci = this._mwp.store.multipleChoiceIndex;
				for(var i=0; i<mci.length; i++){
					if(mci[i] == index){
						re = i;
						break;
					}
				}
				return re;
			},
			select : function(x,y,clickFn){
				var re = false;
				var index = 0;
				var _y = y - this._mwp.store.y;
				index = Math.floor(_y/this._mwp.store.lineHeight);
				var isClick = clickFn(index,x,y);
				if(!isClick){
					if(this._mwp.store.isMultipleChoice){
						//多选
							var ind = this.getIndexFormMultipleChoiceIndex(index);
							if(ind == -1){
								this._mwp.store.multipleChoiceIndex.push(index);
							}else{
								this._mwp.store.multipleChoiceIndex.splice(ind,1);
							}
							if(this._mwp.store.multipleChoiceIndex.length > 0)
								re = this._mwp.store.multipleChoiceIndex;
							else
								re = false;
						}else{
						//单选
							if(this._mwp.store.selectIndex == -1){
								this._mwp.store.selectIndex = index;
								re = this._mwp.store.selectIndex;
							}else{
								this._mwp.store.selectIndex = -1;
								re = false;
							}
						}
				}
				return re;
			},
			unSelect : function(selectIndex){
				if(this._mwp.store.isMultipleChoice){
					var ind = this.getIndexFormMultipleChoiceIndex(selectIndex);
					if(ind>=0)
						this._mwp.store.multipleChoiceIndex.splice(ind,1);
				}else{
					this._mwp.store.selectIndex = -1;
				}
			},
			unSelectAll : function(){
				if(this._mwp.store.isMultipleChoice){
					this._mwp.store.multipleChoiceIndex = [];
				}else{
					this._mwp.store.selectIndex = -1;
				}
			},
		};
	//绘制UI
	this.draw = {
		_mwp : this,
		//初始化UI
		info : function(context,area,data,showLine,lineHeight,titleHeight,barAreaWidth,barWidth,isMultipleChoice){
			this._mwp.context = context;
			this._mwp.store.area = area;//区域
			this._mwp.store.data = data;//显示数据
			this._mwp.store.showLine = showLine;//显示行数
			this._mwp.store.totalLine = data.length;//总行数
			this._mwp.store.lineHeight = lineHeight;//行高
			this._mwp.store.titleHeight = titleHeight;//表头高
			this._mwp.store.speed= 10;//滚动速度
			this._mwp.store.isMultipleChoice = !!isMultipleChoice;//多选标识
			this._mwp.store.multipleChoiceIndex = [];//多选
			this._mwp.store.selectIndex = -1;//单选
			this._mwp.handlers.scrollOpen(area);//设置事件
			
			this._mwp.scrollBar.width = barAreaWidth;
			this._mwp.scrollBar.barWidth = barWidth;
			
			this._mwp.scrollBar.upHeight = this._mwp.store.titleHeight;
			
			//显示区域设置(去掉表头和滚动区域的区域)
			this._mwp.store.area = [];
			this._mwp.store.area[0] = area[0];
			this._mwp.store.area[1] = area[1] + this._mwp.store.titleHeight;
			this._mwp.store.area[2] = area[2] - this._mwp.scrollBar.width;
			this._mwp.store.area[3] = area[3] - this._mwp.store.titleHeight;
			//绘制起点
			this._mwp.store.x = area[0];
			this._mwp.store.y = area[1] + this._mwp.store.titleHeight;
			//滚动条绘制起点
			this._mwp.scrollBar.x = area[0] + area[2] - this._mwp.scrollBar.width;
			this._mwp.scrollBar.y = area[1] + this._mwp.scrollBar.upHeight;
			
			this._mwp.scrollBar.barHeight = this.getScrollBarHeight();
			
		},
		//滚动事件
		scrollFn : function(event,delta){
			//滚动距离 像素
			var move = delta*this._mwp.store.speed;
			this._mwp.draw.moveList(move);
			//绘制滚动条
			this._mwp.draw.scrollBar(this._mwp.draw.getBarMoveY(move));
		},
		//滚动条单击事件
		scrollBarClick : function(x,y,e){
			var ea = this._mwp.store.area;
			if(ea[0]+ea[2]<x && x<ea[0]+ea[2]+this._mwp.scrollBar.width){
				if(ea[1]-this._mwp.scrollBar.upHeight<y && y<ea[1]){
					//向上箭头
					this.scrollFn(null,1);
				}else if(ea[1]+ea[3]-this._mwp.scrollBar.downHeight<y && y<ea[1]+ea[3]){
					//向下箭头
					this.scrollFn(null,-1);
				}else if(ea[1]<y && y<ea[1]+ea[3]-this._mwp.scrollBar.downHeight){
					//滚动条位置
					if(ea[1]<y && y<this._mwp.scrollBar.y){
						//点击滚动条上方
						var move = (this._mwp.scrollBar.y-y);
						this._mwp.scrollBar.y -= move;
						var ry = this._mwp.draw.getRealMoveY(move);
						this._mwp.draw.moveList(ry);
					}else 
					if(this._mwp.scrollBar.y+this._mwp.scrollBar.barHeight<y && 
							y<ea[1]+ea[3]-this._mwp.scrollBar.downHeight){
						//点击滚动条下方
						var move = (this._mwp.scrollBar.y-y+this._mwp.scrollBar.barHeight);
						this._mwp.scrollBar.y -= move;
						var ry = this._mwp.draw.getRealMoveY(move);
						this._mwp.draw.moveList(ry);
					}else{
						//点击滚动条上
					}
				}
			}
		},
		scrollBarDown : function(x,y,e){
			if(this._mwp.drag.isCanDrag){
				this._mwp.drag.isNotUp = true;
				this._mwp.drag.y = y;
			}
		},
		scrollBarUp : function(x,y,e){
			if(this._mwp.drag.isCanDrag){
				this._mwp.drag.isNotUp = false;
				this._mwp.drag.isDraging = false;
				this._mwp.drag.y = 0;
			}
		},
		scrollBarMove : function(x,y,e){
			var mx = (this._mwp.scrollBar.width - this._mwp.scrollBar.barWidth)/2;
			if((this._mwp.scrollBar.x+mx)<x && x<(this._mwp.scrollBar.x+mx+this._mwp.scrollBar.barWidth) &&
				this._mwp.scrollBar.y<y && y<(this._mwp.scrollBar.y+this._mwp.scrollBar.barHeight)){
				this._mwp.drag.isCanDrag = true;
				if(this._mwp.drag.isCanDrag && this._mwp.drag.isNotUp){
					this._mwp.drag.isDraging = true;
					var move = (this._mwp.drag.y - y);
					this._mwp.scrollBar.y -= move;
					var ry = this._mwp.draw.getRealMoveY(move);
					this._mwp.draw.moveList(ry);
					this._mwp.drag.y = y;
				}
			}else{
				this._mwp.drag.isCanDrag = false;
				this._mwp.drag.isNotUp = false;
			}
		},
		//绘制
		//@fn 显示区域内部绘制方法接口
		//@OutsetDrawFn 显示区域外部绘制接口
		clipArea : function(x,y,fn,OutsetDrawFn){
			var _ = this._mwp;
			_.draw.scrollBar(0);
			//鼠标滚动事件
			_.handlers.scroll(
					x,y,
					_.draw.scrollFn,
					function(e){//单击
						_.draw.scrollBarClick(x,y,e);
					},
					function(e){//按下
						_.draw.scrollBarDown(x,y,e);
					},
					function(e){//弹起
						_.draw.scrollBarUp(x,y,e);
					},
					function(e){//移动
						_.draw.scrollBarMove(x,y,e);
					}
			);
			
			var ctx = _.getContext();
			if(ctx){
				area = _.store.area;
				if(area){
					//设置绘制剪裁区域
					ctx.save();
					ctx.beginPath();
					ctx.moveTo(area[0],area[1]);
					ctx.lineTo(area[0]+area[2],area[1]);
					ctx.lineTo(area[0]+area[2],area[1]+area[3]);
					ctx.lineTo(area[0],area[1]+area[3]);
					ctx.closePath();
					ctx.clip();
					//绘制List内容方法
					fn(x,y,_.store,_.tool);
					ctx.restore();
					if(OutsetDrawFn)
						OutsetDrawFn(x,y,_.store,_.tool);
				}
			}
		},
		//计算滚动条长度
		getScrollBarHeight : function(){
			var maxBarH = this._mwp.store.area[3];
			var maxHeight = this._mwp.store.lineHeight * this._mwp.store.totalLine;
			var h = 0;
			if(maxHeight<=maxBarH){
				h = maxBarH-this._mwp.scrollBar.downHeight;
			}else{
				h = maxBarH/maxHeight * (maxBarH-this._mwp.scrollBar.downHeight);
			}
			return h;
		},
		//移动内容
		moveList : function(move){
			//内容最大长度
			var maxHeight = this._mwp.store.lineHeight * this._mwp.store.totalLine;
			//绘制高度加上滚动距离
			this._mwp.store.y += move;
			//最大绘制高度   
			var maxY = this._mwp.store.area[1];
			//最小绘制高度
			var minY = this._mwp.store.area[1] - maxHeight + (this._mwp.store.lineHeight * this._mwp.store.showLine);
			
			if(this._mwp.store.y <= minY)
				this._mwp.store.y = minY;
			if(this._mwp.store.y >= maxY)
				this._mwp.store.y = maxY;
		},
		//根据滚动条移动像素获取内容移动像素
		getRealMoveY : function(y){
			var ea = this._mwp.store.area;
			var maxBarH = ea[3];//显示内容长度
			var maxHeight = this._mwp.store.lineHeight * this._mwp.store.totalLine;//全部内容长度
			var barMaxHeight = maxBarH-this._mwp.scrollBar.downHeight;//滚动条活动区域长度
			var r = y/(barMaxHeight/maxHeight);
			return r;
		},
		//根据内容移动像素获取滚动条移动像素
		getBarMoveY : function(ry){
			var ea = this._mwp.store.area;
			var maxBarH = ea[3];//显示内容长度
			var maxHeight = this._mwp.store.lineHeight * this._mwp.store.totalLine;//全部内容长度
			var barMaxHeight = maxBarH-this._mwp.scrollBar.downHeight;//滚动条活动区域长度
			var r = (barMaxHeight/maxHeight)*ry;
			return r;
		},
		//计算滚动条高度限制
		getScrollBarYmove : function(barmove){
			var ea = this._mwp.store.area;
			var maxBarH = ea[3];
			this._mwp.scrollBar.y -= barmove;
			
			//最大绘制高度   
			var maxY = ea[1] - this._mwp.scrollBar.barHeight + maxBarH-this._mwp.scrollBar.downHeight;
			//最小绘制高度
			var minY = ea[1];
			
			if(this._mwp.scrollBar.y <= minY)
				this._mwp.scrollBar.y = minY;
			if(this._mwp.scrollBar.y >= maxY)
				this._mwp.scrollBar.y = maxY;
		},
		//绘制滚动条
		scrollBar : function(barmove){
			var barColor = '';
			var buttonColor = '#3e4145';
			var ctx = this._mwp.getContext();
			if(ctx){
				var ea = this._mwp.store.area;
				this._mwp.draw.getScrollBarYmove(barmove);
				ctx.save();
				ctx.fillStyle=buttonColor;
				ctx.fillRect(ea[0]+ea[2],ea[1]-this._mwp.store.titleHeight,this._mwp.scrollBar.width,this._mwp.store.titleHeight);
				ctx.fillStyle=buttonColor;
				ctx.fillRect(ea[0]+ea[2],ea[1]+ea[3]-this._mwp.scrollBar.downHeight,this._mwp.scrollBar.width,this._mwp.scrollBar.downHeight);
				var mx = (this._mwp.scrollBar.width - this._mwp.scrollBar.barWidth)/2;
				if(this._mwp.drag.isCanDrag){
					barColor = 'rgba(42,92,170,.9)';
					if(this._mwp.drag.isDraging)
						barColor = 'rgba(34,75,143,.7)';
				}else
					barColor = 'rgba(34,75,143,1)';
				ctx.fillStyle=barColor;
				ctx.fillRect(this._mwp.scrollBar.x+mx,this._mwp.scrollBar.y,this._mwp.scrollBar.barWidth,this._mwp.scrollBar.barHeight);
				
				ctx.drawImage(gbox.getImage('ty_tdt_07'),ea[0]+ea[2]+3,ea[1]-this._mwp.scrollBar.upHeight);
				ctx.drawImage(gbox.getImage('ty_tdt_09'),ea[0]+ea[2]+3,ea[1]+ea[3]-this._mwp.scrollBar.downHeight);
				
				ctx.restore();
			}
			
		}
	};
	this.clearSet = function(){
		this.context = false;
		this.store = {
			selectIndex : -1,
			multipleChoiceIndex : [],
			isMultipleChoice : false,
			x : 0,
			y : 0,
			lineHeight : 0,
			showLine : 0,
			totalLine : 0,
			speed : 10,
			titleHeight : 20,
			area : false,
			data : false
		};
		this.scrollBar = {
			upHeight:20,
			downHeight : 20,
			x:0,
			y:0,
			barHeight : 0,
			barWidth : 0,
			height : 0,
			width : 25
		};
		this.drag = {
				isNotUp : false,
				isCanDrag : false,
				isDraging : false,
				x:0,
				y:0
		};
		this.handlers.scrollClose();
	};
};

/**
 * new list 类
 */
var MouseWheelList = {};
MouseWheelList.store = {};
MouseWheelList.draw = {};
//滚动速度  像素
MouseWheelList.store.isMultipleChoice = false;
//绘制宽度起点
MouseWheelList.store.x = 0;
//绘制高度起点
MouseWheelList.store.y = 0;
//行高
MouseWheelList.store.lineHeight = 0;
//最多显示行数
MouseWheelList.store.line = 0;
//总行数
MouseWheelList.store.totalLine = 0;
//滚动速度  像素
MouseWheelList.store.speed = 10;
//标题栏高度(向上箭头)  像素
MouseWheelList.store.titleHeight = 20;
//向下箭头高度  像素
MouseWheelList.store.downHeight = 20;
//滚动条宽度  像素
MouseWheelList.store.scrollBarWidth = 20;
//滚动条宽度起点
MouseWheelList.store.scrollBarX = 0;
//滚动条高度起点
MouseWheelList.store.scrollBarY = 0;
//滚动条高度
MouseWheelList.store.scrollBarHeight = 0;
//滚动界面可视区域
MouseWheelList.store.drawArea = false;
//选中索引
MouseWheelList.store.selectIndex = -1;
//多选选中索引
MouseWheelList.store.multipleChoiceIndex = [];
//清楚List设置
MouseWheelList.clearSet = function(){
	MouseWheelList.store.x = 0;
	MouseWheelList.store.y = 0;
	MouseWheelList.store.scrollBarX = 0;
	MouseWheelList.store.scrollBarY = 0;
	MouseWheelList.store.titleHeight = 20;
	MouseWheelList.store.drawArea = false;
	MouseWheelList.store.selectIndex = -1;
	MouseWheelList.store.multipleChoiceIndex = [];
	MouseWheelHandler.scrollClose();
};
//滚动界面设置
MouseWheelList.draw.listSet = function(context,area,height,line,totalLine,titleHeight,isMultipleChoice){
	//设置context对象
	MouseWheelList.draw.setContext(context);
	//设置绘制区域
	MouseWheelHandler.scrollOpen(area);
	
	MouseWheelList.store.titleHeight = titleHeight||20;
	
	MouseWheelList.store.drawArea = [];
	MouseWheelList.store.drawArea[0] = area[0];
	MouseWheelList.store.drawArea[1] = area[1]+MouseWheelList.store.titleHeight;
	MouseWheelList.store.drawArea[2] = area[2]-MouseWheelList.store.scrollBarWidth;
	MouseWheelList.store.drawArea[3] = area[3]-MouseWheelList.store.titleHeight;
	
	MouseWheelList.store.x = area[0];
	MouseWheelList.store.y = area[1] + MouseWheelList.store.titleHeight;
	
	MouseWheelList.store.scrollBarX = area[0] + area[2] - MouseWheelList.store.scrollBarWidth + 5;
	MouseWheelList.store.scrollBarY = area[1] + MouseWheelList.store.titleHeight;
	MouseWheelList.store.lineHeight = height;
	MouseWheelList.store.line = line;
	MouseWheelList.store.totalLine = totalLine;
	MouseWheelList.setMultipleChoice(isMultipleChoice);
};

MouseWheelList.isInMultipleChoiceIndex = function(id){
	var re = false;
	var ch = MouseWheelList.store.multipleChoiceIndex;
	for(var i=0; i<ch.length; i++){
		if(ch[i] == id){
			re = true;
			break;
		}
	}
	return re;
};
MouseWheelList.setMultipleChoice = function(bl){
	MouseWheelList.store.isMultipleChoice = !!bl;
};
//滚动事件入口
MouseWheelList.listMove = function(x,y){
	MouseWheelList.draw.scrollBar(0);
	//鼠标滚动事件
	MouseWheelHandler.scroll(
			x,y,
			MouseWheelList.scrollFn,
			function(e){
				MouseWheelList.scrollBarClick(x,y,e);
			}
	);
};
//绘制内容
MouseWheelList.draw.clipArea = function(fn){
	var ctx = MouseWheelList.draw.context;
	var ea = MouseWheelList.store.drawArea;
	var x = MouseWheelList.store.x;
	var y = MouseWheelList.store.y;
	if(ea){
		//设置绘制剪裁区域
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(ea[0],ea[1]);
		ctx.lineTo(ea[0]+ea[2],ea[1]);
		ctx.lineTo(ea[0]+ea[2],ea[1]+ea[3]);
		ctx.lineTo(ea[0],ea[1]+ea[3]);
		ctx.closePath();
		ctx.clip();
		//绘制List内容方法
		fn(x,y);
		ctx.restore();
	}
};
//鼠标滚动滚动事件
//@event 事件对象
//@delta 滚动速度
MouseWheelList.scrollFn = function(event,delta){
	//滚动距离 像素
	var move = delta*MouseWheelList.store.speed;
	//内容最大长度
	var maxHeight = MouseWheelList.store.lineHeight * MouseWheelList.store.totalLine;
	//绘制高度加上滚动距离
	MouseWheelList.store.y += move;
	//最大绘制高度   
	var maxY = MouseWheelList.store.drawArea[1];
	//最小绘制高度
	var minY = MouseWheelList.store.drawArea[1] - maxHeight + MouseWheelList.store.lineHeight*MouseWheelList.store.line;
	
	if(MouseWheelList.store.y <= minY)
		MouseWheelList.store.y = minY;
	if(MouseWheelList.store.y >= maxY)
		MouseWheelList.store.y = maxY;
	//绘制滚动条
	MouseWheelList.draw.scrollBar(move);
};
//判断X,Y是否在事件触发区域
MouseWheelList.isListArea = function(x,y){
	var ea = MouseWheelHandler.store.eventArea;
	if(ea[0]<x && x<ea[0]+ea[2] && ea[1]<y && y<ea[1]+ea[3]){
		return true;
	}else{
		return false;
	}
};
//判断X,Y是否在内容绘制区域
MouseWheelList.isListClick = function(x,y){
	var ea = MouseWheelList.store.drawArea;
	if(ea[0]<x && x<ea[0]+ea[2] && ea[1]<y && y<ea[1]+ea[3]){
		return true;
	}else{
		return false;
	}
};
//滚动条单击事件
MouseWheelList.scrollBarClick = function(x,y,e){
	var ea = MouseWheelList.store.drawArea;
	if(ea[0]+ea[2]<x && x<ea[0]+ea[2]+MouseWheelList.store.scrollBarWidth){
		if(ea[1]-MouseWheelList.store.titleHeight<y && y<ea[1]){
			//向上箭头
			MouseWheelList.scrollFn(null,1);
		}else if(ea[1]+ea[3]-MouseWheelList.store.downHeight<y && y<ea[1]+ea[3]){
			//向下箭头
			MouseWheelList.scrollFn(null,-1);
		}else if(ea[1]<y && y<ea[1]+ea[3]-MouseWheelList.store.downHeight){
			//滚动条位置
			var maxBarH = MouseWheelList.store.drawArea[3];
			var maxHeight = MouseWheelList.store.lineHeight * MouseWheelList.store.totalLine;
			if(ea[1]<y && y<MouseWheelList.store.scrollBarY){
				//点击滚动条上方
				var _y = ((MouseWheelList.store.scrollBarY - y)/maxBarH) * maxHeight;
				MouseWheelList.scrollFn(null,_y/MouseWheelList.store.speed);
			}else 
			if(MouseWheelList.store.scrollBarY+MouseWheelList.store.scrollBarHeight<y && y<ea[1]+ea[3]-MouseWheelList.store.downHeight){
				//点击滚动条下方
				var _y = ((y-MouseWheelList.store.scrollBarY-MouseWheelList.store.scrollBarHeight)/maxBarH) * maxHeight;
				MouseWheelList.scrollFn(null,-(_y/MouseWheelList.store.speed));
			}else{
				//点击滚动条上
				var _y = ((y - MouseWheelList.store.scrollBarY)/maxBarH) * maxHeight;
				MouseWheelList.scrollFn(null,-(_y/MouseWheelList.store.speed));
			}
		}
	}
};
//滚动条拖动事件
MouseWheelList.scrollBarDrag = function(cx,cy,x,y,e){
	var maxBarH = MouseWheelList.store.drawArea[3];
	var maxHeight = MouseWheelList.store.lineHeight * MouseWheelList.store.totalLine;
	var dy = (cy - y);
	if(dy>0){
		var _y = ((MouseWheelList.store.scrollBarY - y)/maxBarH) * maxHeight;
		MouseWheelList.scrollFn(null,_y/MouseWheelList.store.speed);
	}else 
	if(dy<0){
		var _y = ((MouseWheelList.store.scrollBarY + y)/maxBarH) * maxHeight;
		MouseWheelList.scrollFn(null,-(_y/MouseWheelList.store.speed));
	}
};
//根据坐标返回内容索引
MouseWheelList.getLineIndex = function(x,y){
	var listIndex = 0;
	var _y = y - MouseWheelList.store.y;
	listIndex = Math.floor(_y/MouseWheelList.store.lineHeight);
	return listIndex;
};

MouseWheelList.listClick = function(x,y){
};

//绘制内容对象
MouseWheelList.draw.context = false;
MouseWheelList.draw.setContext = function(context){
	MouseWheelList.draw.context = context;
};
//绘制直线
MouseWheelList.draw.line = function(x,y,w,h,color){
	var ctx = MouseWheelList.draw.context;
	ctx.save();
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.moveTo(x,y);
	if(w)
		ctx.lineTo(x+w,y);
	if(h)
		ctx.lineTo(x,y+h);
	ctx.stroke();
	ctx.restore();
};

//设置滚动条宽度
MouseWheelList.draw.setScrollBarWidth = function(scrollBarWidth){
	MouseWheelList.draw.scrollBarWidth = scrollBarWidth;
};
//绘制滚动条
//@内容滚动距离
MouseWheelList.draw.scrollBar = function(move){
	var barColor = '#77787b';
	var buttonColor = '#3e4145';
	var ctx = MouseWheelList.draw.context;
	var ea = MouseWheelList.store.drawArea;
	MouseWheelList.store.scrollBarHeight = MouseWheelList.draw.getScrollBarHeight();
	MouseWheelList.draw.getScrollBarYmove(move);
	
	ctx.save();
	ctx.fillStyle=buttonColor;
	ctx.fillRect(ea[0]+ea[2]+5,ea[1]-MouseWheelList.store.titleHeight+2,MouseWheelList.store.scrollBarWidth-4,MouseWheelList.store.titleHeight-1);
	ctx.fillStyle=buttonColor;
	ctx.fillRect(ea[0]+ea[2]+5,ea[1]+ea[3]-MouseWheelList.store.downHeight,MouseWheelList.store.scrollBarWidth-4,MouseWheelList.store.downHeight);
	ctx.fillStyle=barColor;
	ctx.fillRect(MouseWheelList.store.scrollBarX,MouseWheelList.store.scrollBarY,16,MouseWheelList.store.scrollBarHeight);
	
	ctx.drawImage(gbox.getImage('ty_tdt_07'),ea[0]+ea[2]+3,ea[1]-MouseWheelList.store.titleHeight);
	ctx.drawImage(gbox.getImage('ty_tdt_09'),ea[0]+ea[2]+3,ea[1]+ea[3]-MouseWheelList.store.downHeight);
	
	ctx.restore();
};
//计算滚动条长度
MouseWheelList.draw.getScrollBarHeight = function(){
	var maxBarH = MouseWheelList.store.drawArea[3];
	var maxHeight = MouseWheelList.store.lineHeight * MouseWheelList.store.totalLine;
	var h = 0;
	if(maxHeight<=maxBarH){
		h = maxBarH-MouseWheelList.store.downHeight;
	}else{
		h = maxBarH/maxHeight * (maxBarH-MouseWheelList.store.downHeight);
	}
	return h;
};
//计算滚动条高度
MouseWheelList.draw.getScrollBarYmove = function(move){
	
	var maxBarH = MouseWheelList.store.drawArea[3];
	var maxHeight = MouseWheelList.store.lineHeight * MouseWheelList.store.totalLine;
	var ea = MouseWheelList.store.drawArea;
	
	var y = (move/maxHeight) * maxBarH;
	
	MouseWheelList.store.scrollBarY -= y;
	
	//最大绘制高度   
	var maxY = ea[1] - MouseWheelList.store.scrollBarHeight + maxBarH-MouseWheelList.store.downHeight;
	//最小绘制高度
	var minY = ea[1];
	
	if(MouseWheelList.store.scrollBarY <= minY)
		MouseWheelList.store.scrollBarY = minY;
	if(MouseWheelList.store.scrollBarY >= maxY)
		MouseWheelList.store.scrollBarY = maxY;
};
//绘制鼠标经过行样式
MouseWheelList.draw.moveonLine = function(x,y,color){
	var ctx = MouseWheelList.draw.context;
	var ea = MouseWheelList.store.drawArea;
	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(x,y,ea[2],25);
	ctx.restore();
};

/**
 * 鼠标滚动事件类
 * 作者:刘征
 * 时间:2013-8-16
 */
//类对象
var MouseWheelHandler = {};
//类数据对象
MouseWheelHandler.store = {};
//滚动触发区域数据格式 [x,y,width,height]
MouseWheelHandler.store.eventArea = false;
//当前鼠标移动X
MouseWheelHandler.store.X = touchMoveX;
//当前鼠标移动Y
MouseWheelHandler.store.Y = touchMoveY;
//当前鼠标点击X
MouseWheelHandler.store.clickX = lastTouchMoveX;
//当前鼠标点击Y
MouseWheelHandler.store.clickY = lastTouchMoveY;

//打开鼠标滚动事件
//在打开的界面创建时调用，保证界面打开状态下area有值
//@area 滚动触发区域数据格式 : [x,y,width,height]
MouseWheelHandler.scrollOpen = function(area){
	//设置滚动触发区域
	MouseWheelHandler.setEventArea(area);
	//打开canvas滚动事件
	$('canvas').bind('mousewheel', MouseWheelHandler.mousewheel);
	$('canvas').bind('mousedown', MouseWheelHandler.mouseDown);
	$('canvas').bind('mouseup', MouseWheelHandler.mouseUp);
	$('canvas').bind('click', MouseWheelHandler.mouseClick);
};

//设置鼠标滚动方法和移动坐标
//在绘制区域调用，传入鼠标移动坐标以及鼠标滚动事件处理方法
MouseWheelHandler.scroll = function(x,y,mwfn,cfn,mfn){
	//设置鼠标移动位置
	MouseWheelHandler.setMoveXY(x,y);
	//设置滚动处理函数，默认参数为event,delta
	MouseWheelHandler.onMousewheel = mwfn;
	if(cfn)//单击事件
		MouseWheelHandler.onMouseClick = cfn;
	if(mfn)//鼠标移动事件
		MouseWheelHandler.onMouseMove = mfn;
};

//鼠标滚动事件
//@event
//@delta 滚动速度，大于0为向上滚动，小于0为向下滚动
MouseWheelHandler.onMousewheel = function(event,delta){};
MouseWheelHandler.onMouseMove = function(e,cx,cy){};
MouseWheelHandler.onMouseClick = function(event){};

//关闭鼠标滚动事件
MouseWheelHandler.scrollClose = function(){
	//注销滚动触发区域
	MouseWheelHandler.store.eventArea = false;
	//清除鼠标位置
	MouseWheelHandler.store.X = 0;
	MouseWheelHandler.store.Y = 0;
	MouseWheelHandler.store.clickX = 0;
	MouseWheelHandler.store.clickY = 0;
	//删除canvas滚动事件监听
	$('canvas').unbind('mousewheel', MouseWheelHandler.mousewheel);
	$('canvas').unbind('mousedown', MouseWheelHandler.mouseDown);
	$('canvas').unbind('mousemove', MouseWheelHandler.mouseMove);
	$('canvas').unbind('mouseup', MouseWheelHandler.mouseUp);
	$('canvas').unbind('click', MouseWheelHandler.mouseClick);
};

//设置鼠标滚动事件触发区域
MouseWheelHandler.setEventArea = function(area){
	area.length ? MouseWheelHandler.store.eventArea = area : MouseWheelHandler.store.eventArea = false;
};

//设置鼠标移动坐标
MouseWheelHandler.setMoveXY = function(x,y){
	x ? MouseWheelHandler.store.X = x : MouseWheelHandler.store.X = 0;
	y ? MouseWheelHandler.store.Y = y : MouseWheelHandler.store.Y = 0;
};

//鼠标滚动监听
MouseWheelHandler.mousewheel = function(event,delta){
	//滚动区域	
	var ea = MouseWheelHandler.store.eventArea;
	//鼠标移动坐标
	var x = MouseWheelHandler.store.X;
	var y = MouseWheelHandler.store.Y;
	//若区域存在
	if(ea){
		//若鼠标移动到触发区域内
		if(ea[0]<x && x<ea[0]+ea[2] && ea[1]<y && y<ea[1]+ea[3]){
			//执行鼠标滚动事件
			MouseWheelHandler.onMousewheel(event,delta);
		}
	}
};
//鼠标移动监听
MouseWheelHandler.mouseMove = function(event,cx,cy){
	//滚动区域	
	var ea = MouseWheelHandler.store.eventArea;
	//鼠标移动坐标
	var x = MouseWheelHandler.store.X;
	var y = MouseWheelHandler.store.Y;
	//若区域存在
	if(ea){
		//若鼠标移动到触发区域内
		if(ea[0]<x && x<ea[0]+ea[2] && ea[1]<y && y<ea[1]+ea[3]){
			//执行鼠标滚动事件
			MouseWheelHandler.onMouseMove(event,cx,cy);
		}
	}
};
//鼠标点击监听
MouseWheelHandler.mouseClick = function(event){
	//滚动区域	
	var ea = MouseWheelHandler.store.eventArea;
	//鼠标移动坐标
	var x = MouseWheelHandler.store.X;
	var y = MouseWheelHandler.store.Y;
	//若区域存在
	if(ea){
		//若鼠标移动到触发区域内
		if(ea[0]<x && x<ea[0]+ea[2] && ea[1]<y && y<ea[1]+ea[3]){
			//执行鼠标滚动事件
			MouseWheelHandler.onMouseClick(event);
		}
	}
};
//鼠标点击监听
MouseWheelHandler.mouseDown = function(ev){
	//滚动区域	
	var ea = MouseWheelHandler.store.eventArea;
	//鼠标移动坐标
	var x = MouseWheelHandler.store.X;
	var y = MouseWheelHandler.store.Y;
	//若区域存在
	if(ea){
		//若鼠标移动到触发区域内
		if(ea[0]<x && x<ea[0]+ea[2] && ea[1]<y && y<ea[1]+ea[3]){
			//执行鼠标滚动事件
			$('canvas').bind('mousemove', function(e){
				MouseWheelHandler.mouseMove(e,ev.clientX,ev.clientY);
			});
		}
	}
};
//鼠标点击监听
MouseWheelHandler.mouseUp = function(event){
	$('canvas').unbind('mousemove', MouseWheelHandler.mouseMove);
};