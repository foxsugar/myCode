var inith = 0;
var dynalist={//链表
	create:function() {
		return {
            first:null,//链表的第一个元素id
            last:null,//链表的最后一个元素id
            data:[],//链表数据
            dl:0,//链表长度
            gar:[],//废弃索引回收
			disconnect:function(obd) {//从链表指针链中删除，data中仍然存在
				if (this.data[obd].__first!=null)  this.data[this.data[obd].__first].__next=this.data[obd].__next; else this.first=this.data[obd].__next;
				if (this.data[obd].__next!=null)  this.data[this.data[obd].__next].__first=this.data[obd].__first; else this.last=this.data[obd].__first;
			},
			addObject:function(obj,prio) {
				var nid=this.gar.pop();//新的id，优先使用已回收的
				if (nid==null) {
					nid=this.dl;
					this.dl++;
				}
				if (this.first==null) { // First element
					obj.__next=null;
					obj.__first=null;
					this.first=nid;
					this.last=nid;
				} else { // Chain next
					var i=this.first;
					while (i!=null)//链表按照prio从小到大的顺序排列
						if (this.data[i].__prio>prio) break; else i=this.data[i].__next;
					if (i==null) { // if last, chain in queue
						obj.__next=null;
						obj.__first=this.last;								
						this.data[this.last].__next=nid;
						this.last=nid;								
					} else { // else reconnect objects
						obj.__first=this.data[i].__first;
						obj.__next=i;
						this.data[i].__first=nid;
						if (obj.__first!=null) this.data[obj.__first].__next=nid; else this.first=nid;
					}
					
				}
				obj.__prio=prio;
				obj.__id=nid;
				this.data[nid]=obj;
				return nid;
			},
			setPrio:function(obd,prio) {//设置索引为obd的元素的prio，并重新排序
				if (this.data[obd].__prio==prio) return;
				if (this.first!=this.last)
				if (this.data[obd].__prio<prio) {
					if (this.data[obd].__id!=this.last) {
						var i=this.data[obd].__next;
						while (i!=null)
							if (this.data[i].__prio>=prio) break; else i=this.data[i].__next;
						if ((i==null)||(this.data[i].__first!=this.data[obd].__id)) {
							// disconnect
							this.disconnect(obd);
							// Reconnect
							if (i==null) {
								this.data[this.last].__next=this.data[obd].__id;
								this.data[obd].__first=this.last;
								this.data[obd].__next=null;
								this.last=this.data[obd].__id;
							} else {
								this.data[obd].__first=this.data[i].__first;
								this.data[obd].__next=i;
								this.data[i].__first=this.data[obd].__id;
								if (this.data[obd].__first!=null) this.data[this.data[obd].__first].__next=this.data[obd].__id; else this.first=this.data[obd].__id;
							}
						}
					}
				} else {
					if (this.data[obd].__id!=this.first) {
						var i=this.data[obd].__first;
						while (i!=null)
							if (this.data[i].__prio<=prio) break; else i=this.data[i].__first;
						if ((i==null)||(this.data[i].__next!=this.data[obd].__id)) {
							// disconnect
							this.disconnect(obd);
							if (i==null) {
								this.data[this.first].__first=this.data[obd].__id;
								this.data[obd].__first=null;
								this.data[obd].__next=this.first;
								this.first=this.data[obd].__id;
							} else {
								this.data[obd].__first=i;
								this.data[obd].__next=this.data[i].__next;
								this.data[i].__next=this.data[obd].__id;
								if (this.data[obd].__next!=null) this.data[this.data[obd].__next].__first=this.data[obd].__id; else this.last=this.data[obd].__id;
							}
						}
					}
				}
				this.data[obd].__prio=prio;
			},
			remove:function(obd) {
				this.disconnect(obd);
				this.gar.push(this.data[obd].__id);
				delete this.data[this.data[obd].__id];
			}
		}
	}
}

// A special circular queue with some features useful for the resource loader
var cyclelist={
	create:function(size) {
		return {
			_head:0,
			_tail:0,
			_data:[],
			_size:(size?size:10),
			_total:0,
			_done:0,
			_current:null,
			getTotal:function(){return this._total}, // Number of elements to be "poped"
			getDone:function(){return this._done}, // Number of popped elements since the last empty
			getSize:function(){return this._size}, // The maximum number of elements in the queue
			isProcessing:function(){return this._current!=null}, // The last pop was not a null (i.e. the queue returned a valid object)
			isEnded:function(){return (this._head==this._tail)}, // There are other elements in the queue
			isBusy:function(){return this.isProcessing()||!this.isEnded()}, // There are elements in the queue/the last one pop returned an object that is being processed
			getCurrent:function(){return this._current}, // Return the last popped element
			push:function(d) {
				this._data[this._head]=d;
				this._head=(this._head+1)%this._size;
				this._total++;
			},
			pop:function() {
				if (this.isEnded()) {
					this._total=0;
					this._done=0;
					this._current=null;
				} else {
					this._current=this._data[this._tail];
					this._tail=(this._tail+1)%this._size;
					this._done++;
				}
				return this._current;
			}
		}
	}
}

// A simple circular cache handler
//var cachelist={
//	create:function(size) {
//		return {
//			_cache:{},
//			_queue:[],
//			_head:0,
//			_size:(size?size:10),
//			add:function(k,v) {
//				if (!this._cache[k]) {
//					if (this._queue[this._head])
//						delete this._cache[this._queue[this._head]];
//					this._queue[this._head]=k;
//					this._cache[k]={pos:this._head,value:v};
//					this._head=(this._head+1)%this._size;
//				} else this._cache[k].value=v;
//			},
//			read:function(k) {
//				return (this._cache[k]?this._cache[k].value:null);
//			},
//			clear:function() {
//				this._cache={};
//				this._queue=[];
//				this._head=0;
//			}
//		}
//	}
//}
 
/**
 * @namespace
 * Gamebox module allows multiple grouped objects to move simultaneously, it helps with collisions, #
 * rendering and moving objects. It also provides monospaced pixel-font rendering, keyboard handling,  
 * audio, double buffering and FSEs. Gamebox can also store and load data from cookies! 
 */
var gbox={
	//zz temp 
//	curentImage:'aaaa',
//	testMessage:'',
	//zz add 
	delta:0,//时间增量
	lastTime:0,//上一帧的绘制时间
	frames:0,
	totalTime:0,
	//zz		
	// CONSTANTS
//	ALIGN_CENTER:0,
//	ALIGN_MIDDLE:0,
//	ALIGN_RIGHT:1,
//	ALIGN_BOTTOM:1,
	COLOR_BLACK:'rgb(0,0,0)',
	COLOR_WHITE:'rgb(255,255,255)',
	ZINDEX_LAYER:-1,
//	PALETTES:{ // I think that some retrogamers will find these useful and/or inspiring
//		c64:{ // C64 palette, picked from http://pepto.de/projects/colorvic/
//			order:["black","white","red","cyan","purple","green","blue","yellow","orange","brown","lightred","darkgray","gray","lightgreen","lightblue","lightgray"],
//			colors:{ black:"#000000", white:"#FFFFFF", red:"#68372B", cyan:"#70A4B2", purple:"#6F3D86", green:"#588D43", blue:"#352879", yellow:"#B8C76F", orange:"#6F4F25", brown:"#433900", lightred:"#9A6759", darkgray:"#444444", gray:"#6C6C6C", lightgreen:"#9AD284", lightblue:"#6C5EB5", lightgray:"#959595"}
//		}
//	},
	
	// VARS
	_autoid:0,//图片没有id，自动创建
	_cb:null, // callback for loadAll()
//	_keyboard:[],
//	_keymap:{
//		up:38,
//		down:40,
//		right:39,
//		left:37,
//		a:90,
//		b:88,
//		c:67
//	},
//	_flagstype:{
//		experimental:"check",
//		noaudio:"check",
//		loadscreen:"list",
//		fse:"list"
//	},
//	_flags:{
//		experimental:false,
//		noaudio:false,
//		loadscreen:"normal",
//		fse:"none"
//	},
//两点间距离公式
//getSqrt:function(X1,X2, Y1, Y2){//取平方根
//	var temp_a = X1>X2 ? (X1-X2) : (X2-X1);// 横向间隔
//	var temp_b = Y1>Y2 ? (Y1-Y2) : (Y2-Y1);// 竖向间隔
//	return Math.sqrt((temp_a*temp_a)+(temp_b*temp_b));
//},



	// 接触碰撞
	intersectRect:function(x1, y1, width1, height1, x2, y2, width2, height2){
		return !(y2 + height2 < y1 || y2 > y1 + height1 || x2 + width2 < x1 || x2 > x1 + width1); 
	},

// 包含碰撞
//inclusionRect:function(x1, y1, width1, height1, x2, y2, width2, height2) {
//	if (y2 >= y1 && y2 + height2 <= y1 + height1 && x2 >= x1 && x2 + width2 <= x1 + width1) {
//		return true;
//	}
//
//	return false;
//},	
	/**
	 * 绘制图片
	 */
	drawImage:function( imgId,x, y ) {
		var img = gbox.getImage(imgId);
		if(img){
			var ctx = gbox.getBufferContext();
			ctx.drawImage(img,x>>0,y>>0);
		}else{
			console.log("无图："+imgId);
		}
	},
	/*
	 *  绘制需要调整透明度的图片
	 */
	drawAlphaImage:function( imgId,x,y,alpha ) {
		var img = gbox.getImage(imgId);
		if(img){
			
			var ctx = gbox.getBufferContext();
			ctx.globalAlpha = alpha;
			ctx.drawImage(img,x>>0,y>>0);
		}else{
			console.log("无图："+imgId);
		}
	},
	/**
	 * 上下左右居中绘制图片
	 */
	drawImageCenter:function( imgId,xMin, yMin, xMax, yMax ) {
		var img = gbox.getImage(imgId);
		if(img){
			var imageWidth = img.width;
			var imageHeight = img.height;
			var offsetX = (xMax - xMin - imageWidth)/2;
			var offsetY = (yMax - yMin - imageHeight)/2;
			var x = xMin+offsetX;
			var y = yMin+offsetY;
			var ctx = gbox.getBufferContext();
			ctx.drawImage(img,x>>0,y>>0);
		}else{
			console.log("无图："+imgId);
		}
	},
///*
// * 是否特殊字符
// */	  
//isExtraChar:function(s){
//	// 正则表达式对象
//	var re = new RegExp("[%-]", "");
//	// 验证是否刚好匹配
//	var yesorno = re.test(s);
//	if(yesorno){
//		 return true;
//	}
//	else{
//		 return false;
//	}
//},		  

//判断输入的字符串是否是中文（只能使中文不能包含其它字符）

// isOnlyChinese:function(s){
// // 正则表达式对象
// var re = new RegExp("^[\\u4e00-\\u9fa5]+$", "");
// // 验证是否刚好匹配
// var yesorno = re.test(s);
// if(yesorno){
//  return true;
// }
// else{
//  return false;
// }
//},	  
	  drawString:function( text, x, y, color,fontSize) {
	  	if(!fontSize){
	  		fontSize = 14;
	  	}
	  	gbox.blitSystemText(gbox.getBufferContext(),
		{
			text : text,
			color : color,
			font : 'bold '+fontSize+'px 楷体',
			x : x,
			y : y
											
		});
	  },
	  
	qualityColor  : [
		null,
	    "#ffffff",//白
	    "#08cc1a",//绿
	     "#006cff",//蓝
	     "#dc00df",//紫
	     "#e09900",//橙
	     "#ff0000"//红
	],
	
	
	  
	/**
	 * 绘制文字 
	 * User: xuzhongxing
 	 * Date: 13-8-30
 	 * Time: 下午4:18
	 */
	 drawText : function(text,x,y,fontIndex,quality){
	 	var font = this.fonts[fontIndex];
	 	if(typeof font == "undefined"){
	 		console.log("error : 未设置字体");
	 	}
	 	var ctx = gbox.getBufferContext();
	 	ctx.save();
		ctx.textBaseline = "top";//文字顶部对齐
		ctx.textAlign = "left";
        ctx.font = font.font;
        if(font.strokeStyle){
        	ctx.fillStyle = font.strokeStyle;
            ctx.fillText(text,x-1,y);
            ctx.fillText(text,x+1,y);
            ctx.fillText(text,x,y-1);
            ctx.fillText(text,x,y+1);
        }
        if(quality){
        	ctx.fillStyle = this.qualityColor[quality];
            ctx.fillText(text,x,y);
        }else if(font.fillStyle){
        	ctx.fillStyle = font.fillStyle;
            ctx.fillText(text,x,y);
        }
        ctx.restore();
	 },
	 
	 /**
	 * 绘制文字（自动换行） 
	 * User: xuzhongxing
 	 * Date: 13-8-30
 	 * Time: 下午4:18
	 */
	 drawLineBreakText : function(text,x,y,fontIndex,lineWidth){
	 	var font = this.fonts[fontIndex];
	 	if(typeof font == "undefined"){
	 		console.log("error : 未设置字体");
	 	}
	 	var ctx = gbox.getBufferContext();
		ctx.save();
	 	ctx.font = font.font;
	    var begin = 0;
	    var arr = new Array;
	    var widthX = font.getSize()/2;//允许的误差
	    lineWidth += widthX;
	    if(ctx.measureText(text).width<lineWidth){
	        arr.push(text);
	    }else{
	        var sumWidth=0;
	        for(var i=0;i<text.length;i++){
	            sumWidth+=ctx.measureText(text.charAt(i)).width;
	            if(sumWidth>lineWidth){
	                arr.push(text.substring(begin,i));
	                begin = i--;
	                sumWidth = 0;
	            }
	        }
	        arr.push(text.substring(begin,text.length));
	    }
		ctx.textBaseline = "top";//文字顶部对齐
		ctx.textAlign = "left";
		ctx.fillStyle = font.fillStyle;
		for(var i=0;i<arr.length;i++){
			ctx.fillText(arr[i],x,Math.floor(y+1.5*i*font.getSize()));
		}
        ctx.restore();
	 },
	 
	 /**
	  * 鼠标位置是否在矩形内
	  */
	  isInRect : function(x,y,id){
	  	var img = gbox.getImage(id);
	  	if(img){
	  		return x < touchMoveX && touchMoveX < (x+img.width) && y < touchMoveY && touchMoveY < (y+img.height);
	  	}else{
	  		return false;
	  	}
	  },
	 
	/*
	 * 获取字符串宽度
	 */
	getTextWidth:function(text,fontSize){
		var ctx = gbox.getBufferContext();
		ctx.save();
		ctx.font = fontSize+"px 黑体";
		var width = ctx.measureText(text).width;
		ctx.restore();
		return width;
	},
	
	_isIndwellDiv:function( id, tagName){
		var l=document.getElementById("" + id);
		if(l){
			var d=l.getElementsByTagName("" + tagName);
			if(d){
				return true;
			}else{
				return false;
			}
		}
		return false;
	},
	
	_mouseArea:function(poly,desX,desY)
	{
		if (tool.pointInPoly([ desX, desY ], poly))
		{
			return true;
		}
		return false;
	},

	_localflags:{},
	_fonts:{},
	_tiles:{},
	_images:{},
	_camera:{},
	_screen:0,
	_screenposition:0,
//	_keyboardpicker:0,
	_screenh:0,
	_screenw:0,
	_screenhh:0,
	_screenhw:0,
	_zoom:1,
	_canvas:{},
	_objects:{},
	_groups:[],

	//LAYER
	_layer:[],
	_groupsInLayer:[],
	_groupsShow:[],
	_objectIds:[],
	GROUP_ID:0,
	//END LAYER

	_renderorder:[],
	_groupplay:{},
	_actionqueue:["first","blit","after"], // initialize is executed once
	_mspf:0,
	_fps:0,
	_gametimer:0,
	_frameskip:0,
	_autoskip:{min:0,max:5,lowidle:0,hiidle:5}, // minimum frameskip, maximum frameskip, minimum idle time allowed for increasing frameskip, maximum idle time allowed for decreasing frameskip
	_fskid:0,
	_statbar:0,
	_border:0,
	_garbage:[],
	_zindexch:[],
	_framestart:0,

	
	_zindex:dynalist.create(),
	_db:false,
	_systemcookie:"__gboxsettings",
	_sessioncache:"",
	_breakcacheurl:function(a) {return a+(a.indexOf("?")==-1?"?":"&")+"_brc="+gbox._sessioncache; },
	_forcedidle:0,
	_gamewaiting:0,
	_canlog:false,
	_splash:{
		gaugeLittleColor:"rgb(255,240,0)",
		gaugeLittleBackColor:"rgb(255,255,255)",
		gaugeBorderColor:"rgb(0,0,0)",
		gaugeBackColor:"rgb(100,100,100)",
		gaugeColor:"rgb(255,240,0)",
		gaugeHeight:18,
		background:null,
		minimalTime:0,
		footnotes:null,
		footnotesSpacing:1
	},
	_minimalexpired:0, // 0: not triggered, 1: triggered, 2: done
	setCanLog:function(c) { this._canlog=c&&window.console; },
	canLog:function() { return this._canlog},
	log:function() {}, // Overridden if console is really available
	_safedrawimage:function(tox,img,sx,sy,sw,sh,dx,dy,dw,dh) {
		dw = sw;
		dh = sh;
		if (!img||!tox) return;
		if (sx<0) { dx-=(dw/sw)*sx;sw+=sx; sx=0; }
		if (sy<0) { dy-=(dh/sh)*sy;sh+=sy; sy=0; }
		if (sx+sw>img.width) { dw=(dw/sw)*(img.width-sx);sw=img.width-sx;}
		if (sy+sh>img.height) { dh=(dh/sh)*(img.height-sy);sh=img.height-sy;}
		try { if ((sh>0)&&(sw>0)&&(sx<img.width)&&(sy<img.height)) tox.drawImage(img, sx,sy,sw,sh,dx>>0,dy>>0,dw,dh); } catch(e){}
	},
 
	setScreenBorder:function(a) { this._border=a},
	 /**
  * Sets the gbox._forcedidle property.
  * @param {Boolean} f The value to write to gbox._forcedidle.
  */	  
	setForcedIdle:function(f) { this._forcedidle=f},
  
  /**
  * Initializes the screen to a certain width and height, applies zoom attributes, populates the 
  * body of the HTML document including the canvas element, sets an initial camera, creates a '_buffer'
  * canvas, sets keyboard event listeners, and many other initialization functions.
  * @param {Integer} w The width of the main canvas.
  * @param {Integer} h The height of the main canvas.
  */	
 
	initScreen:function(w,h) {
		 
		document.body.style.textAlign="TOP";
		document.body.style.height="100%";
		document.body.style.margin="0px";
		document.body.style.padding="0px";			
		document.getElementsByTagName("html")[0].style.height="100%";
		
		//var container=document.createElement("div");
		var container=document.getElementById("container");
		container.style.width="100%";
		container.style.height="100%";
		container.style.display="table";
		this._box=document.getElementById("box");//document.createElement("div");
		this._box.style.display="table-cell";
		this._box.style.width="100%";
		this._box.style.textAlign="TOP";

		this._box.style.verticalAlign="TOP";
		
		this._screen=document.getElementById("canvas");//document.createElement("canvas");
		 
       if (this._border) this._screen.style.border="1px solid black";
		this._screen.setAttribute('width',w);
		this._screen.style.width=(w*this._zoom)+"px";
		if(navigator.userAgent.toLowerCase().indexOf ('iphone') > 0 && window.devicePixelRatio==2){
			//this._screen.style.webkitTransform = "scale3d(2, 2, 0) translate3d(80px, "+ (h / 2) + "px, 0)";
		 //	this._screen.style.webkitTransform = "scale3d(1.8, 1.8, 0) translate3d(88px, 185px, 0)";
		   
		    inith = window.innerHeight;
		    if(inith==744)
		 	this._screen.style.webkitTransform = "scale3d(1.8, 1.8, 0) translate3d(88px, 165px, 0)";
		  	else
		    this._screen.style.webkitTransform = "scale3d(2, 2, 0) translate3d(80px, "+ (h / 2) + "px, 0)";  
			//this._screen.style.webkitTransform = "scale3d(1.8, 1.8, 0)";
			this._screen.setAttribute('height',h*2);
			this._screen.style.height=(h*this._zoom*2)+"px";
		}
		else{
		  if(ua.indexOf('m9') > 0 )
      {
        //this._screen.style.webkitTransform = "scale3d(0.8, 0.8, 0) translate3d(0px, 0px, 0)";
        //this._screen.style.webkitTransform = "scale3d(1.8, 1.8, 0) translate3d(0px, 0px, 0)";
			  this._screen.setAttribute('height',h*2);
			  this._screen.style.height=(h*this._zoom*2)+"px";
      }else{
			this._screen.setAttribute('height',h);
			this._screen.style.height=(h*this._zoom)+"px";
		}
		}
		
		this._screenh=h;
		this._screenw=w;
		this._screenhh=Math.floor(h/2);
		this._screenhw=Math.floor(w/2);
		this._camera.x=0;
		this._camera.y=0;
		this._camera.h=h;
		this._camera.w=w;
		// this._box.appendChild(this._screen);
		// container.appendChild(this._box);
		// document.body.appendChild(container);

		this.createCanvas("_buffer");
	 
		if (this._statbar) {
			this._statbar=document.createElement("div");
			if (this._border) this._statbar.style.border="1px solid black";
			this._statbar.style.margin="auto";
			this._statbar.style.backgroundColor="#ffffff";
			this._statbar.style.fontSize="10px";
			this._statbar.style.fontFamily="楷体";
			this._statbar.style.width=(w*this._zoom)+"px";
			this._box.appendChild(this._statbar);
		}
		 
		
		var d=new Date();
		gbox._sessioncache=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();

//		switch (gbox._flags.fse) { // Initialize FSEs
//			case "scanlines": {
//				gbox.createCanvas("-gbox-fse",{w:w,h:h});
//				gbox.getCanvasContext("-gbox-fse").save();
//				gbox.getCanvasContext("-gbox-fse").globalAlpha=0.2;
//				gbox.getCanvasContext("-gbox-fse").fillStyle = gbox.COLOR_BLACK;
//				for (var j=0;j<h;j+=2)
//					gbox.getCanvasContext("-gbox-fse").fillRect(0,j,w,1);
//				gbox.getCanvasContext("-gbox-fse").restore();
//				gbox._localflags.fse=true;
//				break;
//			}
//			case "lcd":{
//				gbox.createCanvas("-gbox-fse-old",{w:w,h:h});
//				gbox.createCanvas("-gbox-fse-new",{w:w,h:h});
//				gbox._localflags.fse=true;
//				break;
//			}
//		}
	},

  /**
  * Sets the gbox._db property. Turns on an off double buffering.
  * @param {Boolean} db The value to write to gbox._db. True enables double buffering, false disables.
  */	  
	setDoubleBuffering:function(db){this._db=db},
  
  /**
  * Writes text to the status bar, but only if the status bar is enabled.
  * @param {String} txt The text to write to the status bar.
  */	  
	setStatBar:function(txt){ if (gbox._statbar) this._statbar.innerHTML=(txt?txt:"&nbsp")},

  /**
  * Set the frames per second rate.
  * @param {Integer} f Total frames per second for the game to run at.
  */	  
	setFps:function(f){
		this._fps=f;
		this._mspf=Math.floor(1000/f)
	},
  
  /**
  * Get the frames per second rate (default is 25).
  * @returns {Integer} Returns the frames per second.
  */
	getFps:function() { return this._fps },
	setAutoskip:function(f){this._autoskip=f},
	setFrameskip:function(f){this._frameskip=f},
  
  /**
  * Get the screen height.
  * @returns {Integer} Screen height in pixels.
  */
	getScreenH:function(){return this._screenh},

  /**
  * Get the screen width.
  * @returns {Integer} Screen width in pixels.
  */
	getScreenW:function(){return this._screenw},
  
  /**
  * Get the screen half-height.
  * @returns {Integer} Screen half-height in pixels.
  */
	getScreenHH:function(){return this._screenhh},

  /**
  * Get the screen half-width.
  * @returns {Integer} Screen half-width in pixels.
  */
	getScreenHW:function(){return this._screenhw},
  
  /**
  * Sets the gbox._zoom parameter, only works before gbox.initScreen is called.
  * @param {Integer} z Zoom factor.
  */
	setZoom:function(z) { this._zoom=z},

  /**
  * Deprecated: gbox._cb is now set by passing it directly into gbox.loadAll(). Left in for backwards compatibility.
  * @param {String} cb The name of the function to be called once gbox.loadAll is completed.
  */
	setCallback:function(cb) { this._cb=cb; },

	_playobject:function(g,obj,a) {
		if(typeof(gbox._objects[g][obj]) != 'undefined')
		{
			if (gbox._objects[g][obj].initialize) {
			gbox._objects[g][obj].initialize(obj);
			delete gbox._objects[g][obj].initialize;
		    }
		    if (gbox._objects[g][obj][a]) gbox._objects[g][obj][a](obj,a);
		}
		
	},

	_nextframe:function(){
		gbox._framestart=gbox._mspf-(new Date().getTime()-gbox._framestart);
		if (gbox._autoskip)
			if ((gbox._framestart<gbox._autoskip.lowidle)&&(gbox._frameskip<gbox._autoskip.max)) gbox.setFrameskip(gbox._frameskip+1); else
			if ((gbox._framestart>gbox._autoskip.hiidle)&&(gbox._frameskip>gbox._autoskip.min)) gbox.setFrameskip(gbox._frameskip-1);
		 
		this._gametimer=setTimeout(gbox.go,(gbox._framestart<=0?1:gbox._framestart));		
	},
	/**
  * Apply FSEs to the screen. Is called each frame. 
  */
//  _applyfse:function(){
//	  switch (gbox._flags.fse) {
//		case "scanlines": {
//			gbox.getBufferContext().drawImage(gbox.getCanvas("-gbox-fse"),0,0);
//			break;
//		}
//		case "lcd":{
//			if (gbox._localflags.fselcdget&&gbox.getBuffer())
//				gbox.getCanvasContext("-gbox-fse-new").drawImage(gbox.getBuffer(),0,0);
//			gbox.getBufferContext().save();
//			gbox.getBufferContext().globalAlpha=0.5;
//			gbox.getBufferContext().drawImage(gbox.getCanvas("-gbox-fse-old"),0,0);
//			gbox.getBufferContext().restore();
//			if (gbox._localflags.fselcdget)
//				gbox.swapCanvas("-gbox-fse-new","-gbox-fse-old");
//			gbox._localflags.fselcdget=!gbox._localflags.fselcdget;	
//			break;
//		}
//	}
//  },
  /**
  * Register the code that have to be executed once the page is loaded. Usually contains game initialization, resources loading etc.
  */
  onLoad:function(code) {
 
  	this.addEventListener(window,'load',code);
  },
  /**
  * This function is called once per frame. This is where the basic rendering and processing of groups occurs.
  */
	go:function() {
		//zz add
		//console.log('frames');
		if(gbox.totalTime>200){
			gbox.totalTime = 0;
			gbox.frames=0;			
		}
		var now = (new Date()).getTime();
		gbox.delta = now-gbox.lastTime;
		gbox.lastTime = now;
		gbox.totalTime+=gbox.delta;
		gbox.frames++;
		//zz	
		if (gbox._loaderqueue.isBusy()) {
			if (gbox._gamewaiting==1) {
				 
				gbox._gamewaiting=true;
			}
			 
			if (gbox._gamewaiting) gbox._gamewaiting--;
			setTimeout(gbox.go,1000);
		} else {
			gbox._gamewaiting=3;
			gbox._framestart=now;
			var gr="";
			for (var g=0;g<gbox._renderorder.length;g++)
				if (gbox._groupplay[gbox._renderorder[g]])
					if (gbox._renderorder[g]==gbox.ZINDEX_LAYER) {
						var id;
						for (var i=0;i<gbox._actionqueue.length;i++) {
							id=gbox._zindex.first;
							while (id!=null) {
								if (gbox._groupplay[gbox._zindex.data[id].g])
									gbox._playobject(gbox._zindex.data[id].g,gbox._zindex.data[id].o,gbox._actionqueue[i]);
								id=gbox._zindex.data[id].__next;
							}
						}
					} else
						for (var i=0;i<gbox._actionqueue.length;i++)
							for (var obj in gbox._objects[gbox._renderorder[g]])
								gbox._playobject(gbox._renderorder[g],obj,gbox._actionqueue[i]);
			if (gbox._fskid>=gbox._frameskip) {
//				if (gbox._localflags.fse) gbox._applyfse();
				if (gbox._db) gbox.blitImageToScreen(gbox.getBuffer());
				gbox._fskid=0;
			} else gbox._fskid++;
			
			gbox.purgeGarbage();
	
			if (gbox._zindexch.length) {
				
				for (var i=0;i<gbox._zindexch.length;i++) {
					if (gbox._objects[gbox._zindexch[i].o.g][gbox._zindexch[i].o.o])
						if (gbox._objects[gbox._zindexch[i].o.g][gbox._zindexch[i].o.o].__zt==null)
							gbox._objects[gbox._zindexch[i].o.g][gbox._zindexch[i].o.o].__zt=gbox._zindex.addObject(gbox._zindexch[i].o,gbox._zindexch[i].z);
						else
							gbox._zindex.setPrio(gbox._objects[gbox._zindexch[i].o.g][gbox._zindexch[i].o.o].__zt,gbox._zindexch[i].z);
				}
				gbox._zindexch=[];
			}
 			if (gbox._forcedidle)
				this._gametimer=setTimeout(gbox._nextframe,gbox._forcedidle); // Wait for the browser
			else
				gbox._nextframe();
		}
	},
 
	setZindex:function(th,z) {
		if ((th.__zt==null)||(th.zindex!=z)) {
			th.zindex=z;
			this._zindexch.push({o:{g:th.group,o:th.id},z:z});
		}
	},

  

  /**
  * Saves data to a browser cookie as a key-value pair, which can be restored later using gbox.dataLoad. Only 
  * works if user has cookies enabled.
  * @param {String} k The key which identifies the value you are storing.
  * @param {String} v The value you wish to store. Needs to be a string!
  * @param {String} d A date offset, to be added to the current date. Defines the cookie's expiration date. By default this is set to 10 years.
  * @example
  * // (from Capman)
  * gbox.dataSave("capman-hiscore",maingame.hud.getNumberValue("score","value"));
  */
	dataSave:function(k,v,d) { 
		var date = new Date();
		date.setTime(date.getTime()+((d?d:365*10)*24*60*60*1000));
		document.cookie =this._systemcookie+"~"+k+"="+v+"; expires="+date.toGMTString()+"; path=/";
	},
  
  /**
  * Loads data from a browser cookie. Send it a key and it returns a value (if available). Only works if user has cookies enabled.
  * @param {String} k The key which identifies the value you are loading.
  * @param {String} a A switch to determine whether a string or a number is returned. By default a string is returned.
  * @returns {Object} A string or a number loaded from the cookie.
  * @example
  * hiscore = gbox.dataLoad("hiscore");
  */
	dataLoad:function(k,a) {
		var nameeq=this._systemcookie+"~"+k+"=";
		var ca = document.cookie.split(";");
		var rt;
		for (var i=0;i<ca.length;i++) {
			var c=ca[i];
			while (c.charAt(0)==' ') c=c.substring(1,c.length);
			if (c.indexOf(nameeq)==0) {
				rt=c.substring(nameeq.length,c.length);
				if (a&&a.number) return rt*1; else return rt;
			}
		}
		return null;
	},

  /**
  * Clears a value stored in a  key-value pair in a browser cookie. Sets value to "". Only works if user has cookies enabled.
  * @param {String} k The key which identifies the value you are clearing.
  */
	dataClear:function(k) { this.dataSave(k,"",-1) },
  
  /**
  * Gets the current camera object.
  * @returns {Object} The camera object.
  */
	getCamera:function() { return this._camera; },
  
  /**
  * Sets the y value of the current camera object.
  * @param {Integer} y The camera object's new y value.
  * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
  * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
  */
	setCameraY:function(y,viewdata) {
		this._camera.y=y;
		if (this._camera.y+this._camera.h>viewdata.h) this._camera.y=viewdata.h-this._screenh;
		if (this._camera.y<0) this._camera.y=0;
	},

  /**
  * Sets the x value of the current camera object.
  * @param {Integer} x The camera object's new x value.
  * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
  * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
  */  
	setCameraX:function(x,viewdata) {
		this._camera.x=x;
		if (this._camera.x+this._camera.w>viewdata.w) this._camera.x=viewdata.w-this._screenw;
		if (this._camera.x<0) this._camera.x=0;
	},
  
  /**
  * Centers the camera.
  * @param {Object} data An object containing x and y parameters -- typically the object you wish to center the camera on.
  * @param {Object} viewdata An object containing parameters h and w, which are a bounding box that the camera is
  * not supposed to leave. For example, to use your map as a bounding area for the camera, pass along {w: map.w, h: map.h}.
  * @example
  * // Center the camera on the player object
  * gbox.centerCamera(gbox.getObject('player', 'player_id'), {w: map.w, h: map.h});
  */
	centerCamera:function(data,viewdata) {
		this.setCameraX(data.x-this._screenhw,viewdata);
		this.setCameraY(data.y-this._screenhh,viewdata);
	},

  /**
  * Get an array containing the names of each group in the game, in order of rendering.
  * @returns {Array} An array of group names.
  * @example
  * grouplist = gbox.getGroups();
  * grouplist; // => ["background", "player", "enemy", "game"]	
  */
  getGroups:function() { return this._groups; },
  
  //LAYER
  /**
  * GET an array containing the names of each group in the layer requested,  in order of pushed in.
  * @returns {Array} An array of group names. 
  * @param {String} lid the id of the layer.
  */ 
  getGroupsInLayer:function(lid){
	  
	  for(var i in this._groupsInLayer )
	  {
		if(this._groupsInLayer[i][0] == lid)
		{
			var g = [];
			for(var j in this._groupsInLayer[i])
			{
				if(j>0)
					g.push(this._groupsInLayer[i][j]);
			}
			return g;
		}
	  }
	return [];
  },

 /**
  * Set groups to the layer.
  * @param {Array} g An array of strings of group names to push in the layer.
  */
	setGroupsToLayer:function(g,lid){
		for(var i in this._groupsInLayer)
		{
			if( this._groupsInLayer[i][0] == lid )
			{
				for(var j in this._objectIds)
				{
					for(var l in g)
						if(this._objectIds[j][0] == g[l])
						{
							delete this._objectIds[j];// = [];
							break;
						}
				}
				return;
			}
		}
		
		this._groupsInLayer.push([lid].concat(g));
	
	}, 
      
  /**
  * Add group to the layer in condition known the group name & layer name.
  * @param {String} lid the id of the layer that the group request to be pushed in.
  * @param {String} gid the id of the group request to push in the layer.
  */
	addGroupToLayer:function(gid,lid){
		this._groupsInLayer[lid].push(gid);
	},  	
  /**
  * Add group to the other group's layer .
  * @param {String} gido the id of the group in the layer that the new group request to be pushed in.
  * @param {String} gidn the id of the group request to push in the layer.
  */
	addGroupToLayer:function(gido,gidn){
		for(var i in this._groupsInLayer )
	  	{
			for(var j in this._groupsInLayer[i])
			{
				if(this._groupsInLayer[i][j] == gido)
					this._groupsInLayer[i].push(gidn);
			}
	 	}
	},
  /**
  * Get the the name(id) of the group belongs to.
  * @param {String} gid the id of the group in the layer.
  * @returns {String} the name(id) of the group belongs to. 
  */
	getGroupLayer:function(gid){
		for(var i in this._groupsInLayer )
	  	{
			for(var j in this._groupsInLayer[i])
			{
				if(this._groupsInLayer[i][j] == gid)
					return this._groupsInLayer[i][0];
			}
	 	}
	},

 /**
  * Defines the names of each layer in the game.
  * @param {Array} l An array of strings of layer names.
  */
	setLayers:function(l){
		this._layers=l;
	},
 /**
  * Control the group hide/show.
  * @param {String} gid id of the group to show/hide/getshow.
  */
	setGroupShow:function(gid){
		for(var i in this._groupsShow)
		{
			if(this._groupsShow[i][0]==gid)
			{
				this._groupsShow[i][1] = 1;
				return;
			}
		}
		this._groupsShow.push([gid,1]);	
	},
	
	setGroupHide:function(gid){
		for(var i in this._groupsShow)
		{
			if(this._groupsShow[i][0]==gid)
			{
				this._groupsShow[i][1] = 0;
				return;
			}
		}
		this._groupsShow.push([gid,0]);	
	},

	getGroupShow:function(gid){
		for(var i in this._groupsShow)
		{
			if(this._groupsShow[i][0]==gid)
			{
				return this._groupsShow[i][1];
			}
		}
		return 0;
	},
 /**
  * Control the layer hide/show.
  * @param {String} lid id of the layer to show/hide.
  */
	setLayerShow:function(lid){
		var g =	this.getGroupsInLayer(lid);
		for(var i in g)
		{
			this.setGroupShow(g[i]);
		}
	},

	setLayerHide:function(lid){
		var g =	this.getGroupsInLayer(lid);
		for(var i in g)
		{
			this.setGroupHide(g[i]);
		}
	},			     
 /**
  * Get the objects in the group.
  * @param {String} gid id of the group the objects in.
  * @param {String} lid id of the layer the objects in.
  * @returns {Array} the objects in the group. 
  */
	
	getObjectsInGroup:function(gid){
		var o = [];

		
		for(var i in this._objectIds)
		{
		
			if(this._objectIds[i][this.GROUP_ID] == gid)
			{
			
				for(var j in this._objectIds[i])
				{
				
					if(j>0)
					{
						var o1 = this.getObject(gid,this._objectIds[i][j]);
						
						o.push(o1);
					}
				}
			}
		}
		return o;
	},
	
	clearObjectIds:function()
	{
		_objectIds = [];
	},

  //END LAYER
  /**
  * Defines the names of each group in the game along with their rendering order.
  * @param {Array} g An array of strings of group names, in the order in which the groups should be rendered. So
  * g[0] will contain the first group to render, g[1] the second group to render, etc.
  */
	setGroups:function(g){
		this._groups=g;
		this._groupplay[gbox.ZINDEX_LAYER]=true;
		for (var i=0;i<g.length;i++)
			if (!this._objects[g[i]]) {
				this._objects[g[i]]={};
				this._groupplay[g[i]]=true;
				this._renderorder[i]=g[i];
			}
	},
  
  /**
  * A method of setting the render order of groups independently of gbox.setGroups. Sets gbox._renderorder, 
  * which by default is equivalent to gbox._groups. However, gbox._renderorder is what ultimately determines
  * the rendering order of groups. If you need to change your rendering order on the fly, use this function 
  * by passing it a reordered array of group names.
  * @param {Array} g An array of strings of group names, in the order in which the groups should be rendered. So
  * g[0] will contain the first group to render, g[1] the second group to render, etc.
  */
	setRenderOrder:function(g) { this._renderorder=g; },
	
	/*
	 * 获取渲染顺序
	 */
	getRenderOrder:function(){return this._renderorder},
  
  /**
  * If a group is disabled, this will enable the group.
  * @param {String} gid The id of the group.
  */
	playGroup:function(gid){this._groupplay[gid]=true;},

  /**
  * If a group is enabled, this will disable the group.
  * @param {String} gid The id of the group.
  */
	stopGroup:function(gid){this._groupplay[gid]=false;},
  
  /**
  * Toggles a group between enabled and disabled status.
  * @param {String} gid The id of the group.
  */
	toggleGroup:function(gid){this._groupplay[gid]=!this._groupplay[gid];},
  
  /**
  * Turns off all groups except for the one specified. 
  * @param {String} gid The id of the group.
  */
	soloGroup:function(gid) {
		for (var i=0;i<this._groups.length;i++)
			if (this._groups[i]==gid) this.playGroup(this._groups[i]); else this.stopGroup(this._groups[i]);
	},
  
  /**
  * Enables all groups, toggling any groups that are currently disabled.
  */
	playAllGroups:function() { for (var i=0;i<this._groups.length;i++) this.playGroup(this._groups[i]); },

  /**
  * Destroys all objects in a given group.
  * @param {String} gid The id of the group.
  */
	clearGroup:function(group) {
		console.log("111111111group ========== " + group);
		for (var obj in this._objects[group]) {
			if (this._objects[group][obj].__zt!=null) this._zindex.remove(this._objects[group][obj].__zt);
			delete this._objects[group][obj];
		}
	},
	playGroups:function(gid){for (var i=0;i<gid.length;i++)this.playGroup(gid[i])},
	stopGroups:function(gid){for (var i=0;i<gid.length;i++)this.stopGroup(gid[i])},
	toggleGroups:function(gid){for (var i=0;i<gid.length;i++)this.toggleGroup(gid[i])},
  
  /**
  * Given a group and an id for a particular object instance, this returns the instance requested.
  * <b>NOTE:</b> this does not return a copy of the object you've requested! Any modifications you make
  * to the object returned are directly modifying the object you requested.
  * @param {String} group The id of the group that contains the object.
  * @param {String} id The id of the instance of the object.
  * @returns {Object} The object requested.
  * @example
  * // Find the player and reduce health by half.
  * playertemp = gbox.getObject('player','player_id');
  * player.health = player.health/2;
  */ 
	getObject:function(group,id) {
		if(typeof(group)=='undefined')
			return null;

		return this._objects[group][id];
	},

   
	
	setSystemTextFont:function(data){
		if(data==null)
			this._screen.getContext("2d").font = 'normal 14px 楷体';
		else
			this._screen.getContext("2d").font = data.font;
	},

  /**
  * Deletes an object, keeping a record of its group and id in gbox._garbage.
  * @param {Object} obj The object you wish to delete.
  */  
	trashObject:function(obj) {
		if (!this._garbage[obj.group]) this._garbage[obj.group]={};
		this._garbage[obj.group][obj.id]=1;
		obj.__trashing=true;
	},

  /**
  * Clears the record held in gbox._garbage of what has been deleted. The "onpurge" method is called on the object before being deleted (for canvas deallocation etc.)
  */    
	purgeGarbage:function() {
		try
		{
		  for (var group in this._garbage){
			if(this._garbage[group] != "undefined"){
				for (var id in this._garbage[group]) {
					if(this._objects[group] != "undefined"){
						if (this._objects[group][id]["onpurge"]) this._objects[group][id].onpurge();
						if (this._objects[group][id].__zt!=null)
							this._zindex.remove(this._objects[group][id].__zt);
						delete this._objects[group][id];
					}
				}
			}
		}
		}
		catch(ex)
		{
			
		}
		

		gbox._garbage={};
	},
  
  /**
  * Deletes every object in a given group.
  * @param {String} group The group id.
  */    
	trashGroup:function(group) {
		if (!this._garbage[group]) this._garbage[group]={};
		for (var obj in this._objects[group])
			this._garbage[group][obj]=1;
	},
  
  /**
  * Returns whether an object is due to be trashed. Useful in cases you want to check if
  * an object is marked as trash before it is actually deleted.
  * @param {Object} o The object you're checking.
  * @returns {Boolean} True if the object is marked as trash.
  */      
	objectIsTrash:function(o) { return o.__trashing;},
  
  /**
  * Creates a new game object. Generally speaking you pass a fully-defined object as the parameter (including a group, id, tileset, and so on).
  * A group must be specified, or the program will crash. If no id is specified, then it will automatically provide 
  * an id of 'obj-XXXX' where 'XXXX' is an automatically incrementing integer. This is where the <i>initialize</i>, <i>first</i>, and <i>blit</i>
  * functions are defined, as well.
  * @param {Object} data The object you wish to create.
  * @returns {Object} The object you created.
  * @example
  * data = {
  *   group: 'player',
  *   id: 'player_id',
  *   tileset: 'player_tiles', 
  *   x: 0,
  *   y: 0,
  *   initialize: function() {
      this.x = 10;
      this.y = 10;
      },
  * };
  * gbox.addObject(data);
  */    
	addObject:function(data) {
		// Extras
		
		if (!data.id) {
			data.id="obj-"+this._autoid;
			this._autoid=(this._autoid+1)%1000;
		}
		if (data.tileset) {
			if (data.h==null) data.h=this._tiles[data.tileset].tileh;
			if (data.w==null) data.w=this._tiles[data.tileset].tilew;
			if (data.hw==null) data.hw=this._tiles[data.tileset].tilehw;
			if (data.hh==null) data.hh=this._tiles[data.tileset].tilehh;
		}
		this._objects[data.group][data.id]=data;

		if (data.zindex!=null)
			this.setZindex(this._objects[data.group][data.id],data.zindex);
		var exist = false;
		for(var i in this._objectIds)
		{
			if( this._objectIds[i][0] == data.group )
			{
				for(var j in this._objectIds[i])
				{
					if(this._objectIds[i][j] == data.id)
					{	
							this.sortAndCutObjectIds();
							return this._objects[data.group][data.id]; 
					}
				}
				this._objectIds[i].push(data.id);
				exist = true;
				break;
			}
		}
		if(!exist)
		{
			this._objectIds.push([data.group,data.id]);
		}	
		this.sortAndCutObjectIds();
		return this._objects[data.group][data.id];
	},
  
  sortNumber: function(a, b)
	{
		return b.length - a.length;
	},

  sortAndCutObjectIds:function()
  {
  	this._objectIds.sort(this.sortNumber);
  	for(var i=this._objectIds.length-1;i>=0;i--)
  	{
  		if(typeof(this._objectIds[i])=="undefined")
  		{
  			this._objectIds.pop();
  		}
  		else
  	  {
  				return;
  		}
  	}
  },
   /**
  * Returns whether a given group contains no objets.
  * @param {String} gid The group you're checking.
  * @returns {Boolean} True if the group contains no objects.
  */    
	groupIsEmpty:function(gid) { for (var i in this._objects[gid]) return false; return true; },
  
  /**
  * Creates a new canvas. By default, the width and height is the current gbox._screenw and gbox._screenh,
  * but it can also be set by passing in a data object with the appropriate parameters.
  * @param {String} id The id of the new canvas.
  * @param {Object} data (Optional) The height and width of the new canvas, contained in data.h and data.w parameters.
  * @example
  * gbox.createCanvas('newCanvas', {w: 640, h: 480});
  */    
	createCanvas:function(id,data) {
		this.deleteCanvas(id);
		var w=(data&&data.w?data.w:this._screenw);
		var h=(data&&data.h?data.h:this._screenh);
		this._canvas[id]=document.createElement("canvas");
		this._canvas[id].setAttribute('height',h);
		this._canvas[id].setAttribute('width',w);
		this._canvas[id].getContext("2d").save();
		this._canvas[id].getContext("2d").globalAlpha=0;
		this._canvas[id].getContext("2d").fillStyle = gbox.COLOR_BLACK;
		this._canvas[id].getContext("2d").fillRect(0,0,w,h);
		this._canvas[id].getContext("2d").restore();
	},
  /**
  * Swap two canvas using their ID.
  * @param {String} id The id of the first canvas.
  * @param {String} id The id of the second canvas.
  * @example
  * gbox.swapCanvas('canvas1','canvas2');
  */    
  swapCanvas:function(a,b) {
  	var swp=this._canvas[a];
  	this._canvas[a]=this._canvas[b];
  	this._canvas[b]=swp;
  },
  /**
  * Deletes a given canvas.
  * @param {String} id The id of the canvas to be deleted.
  */  
	deleteCanvas:function(id) {
		if (this._canvas[id]) delete this._canvas[id];	
	},
  
  /**
  * Checks to see if an image was successfully loaded.
  * @param {String} id The id of the image.
  * @returns {Boolean} True if the image has been loaded.
  */    
	imageIsLoaded:function(id){ return this._images[id]&&(this._images[id].getAttribute("wasloaded"))&&this._images[id].width },
  
  /**
  * Gets information about a loaded image.
  * @param {String} id The id of the image.
  * @returns {Object} A DOM Image element, including the URL and last modified date of the image, its ID, and whether it was loaded successfully.
  * @example
  * image = gbox.getImage('logo');
  * image; // => <img src=?"logo.png?_brc=5-7-2010-15-48-42" src_org=?"logo.png" id=?"logo" wasloaded=?"true">?
  */
	getImage:function(id){return this._images[id]},
  
  /**
  * Gets the buffer canvas (automatically created by gbox.initScreen).
  * @returns {Object} A DOM Canvas element, including the width and height of the canvas.
  */
	getBuffer:function(){return (gbox._fskid>=gbox._frameskip?(this._db?this.getCanvas("_buffer"):this._screen):null)},

  /**
  * Gets the buffer canvas context.
  * @returns {Object} A DOM Canvas context object.
  */
	getBufferContext:function(){ return (gbox._fskid>=gbox._frameskip?(this._db?this.getCanvasContext("_buffer"):this._screen.getContext("2d")):null) },
  
  /**
  * Gets a given canvas.
  * @param {Object} id The identifier of the canvas.
  * @returns {Object} A DOM Canvas element, including the width and height of the canvas.
  */
	getCanvas:function(id){return this._canvas[id]},
  
  /**
  * Gets the two-dimensional canvas context of a given canvas. The object it returns contains all the drawing functions for the canvas.
  * See <a href = "http://dev.w3.org/html5/spec/Overview.html#the-canvas-element">W3C</a> and
  * <a href = "https://developer.mozilla.org/en/canvas_tutorial/basic_usage">Mozilla Developer Center</a> for details.
  * @param {Object} id The identifier of the canvas.
  * @returns {Object} A DOM Canvas context object.
  */
	getCanvasContext:function(id){return this.getCanvas(id).getContext("2d");},
  
  /**
  * Adds an image file to the loader, assigning it to an ID. If adding an image to an existing ID, it checks to see if the file you're
  * adding is different than the one currently assigned to the ID. If it's different, it overwrites the old image. If it's the same, then
  * no action is taken.
  * @param {String} id The identifier of the image.
  * @param {String} filename The file name of the image.
  */
	addImage:function(id,filename) {
		if (this._images[id])
			if (this._images[id].getAttribute("src_org")==filename)
				return;
			else
				delete this._images[id];
	
		this._addtoloader({type:"image",id:id,filename:filename});
	},
  
  /**
  * Deletes an image currently in use. Does not delete the image file, but removes it from Akihabara's image list.
  * @param {String} id The identifier of the image.
  */
	deleteImage:function(id) {
		//console.log(">>>>>>>>>>>>>>>" + id);
		delete this._images[id];
	},
  
  /**
  * Creates a new Akihabara tileset, adding it to the engine.
  * @param {Object} t An object containing: <ul><li>id {String}: the new id of the tileset</li>
  * <li>image {String}: reference to the tileset image loaded</li>
  * <li>tileh {Integer}: height in pixels of the tiles</li>
  * <li>tilew {Integer}: width in pixels of the tiles</li>
  * <li>tilerow {Integer}: width in pixels of each row in the font image</li>
  * <li>gapx {Integer}: x-coord gap between tile columns, in pixels</li>
  * <li>gapy {Integer}: y-coord gap between tile rows, in pixels</li></ul>
  */
	addTiles:function(t) { 
		t.tilehh=Math.floor(t.tileh/2);
		t.tilehw=Math.floor(t.tilew/2);
		this._tiles[t.id]=t;
	},

  /**
  * Gets an Akihabara tileset, adding it to the engine.
  * @param {String} t The ID of a tileset.
  * @returns An object containing: <ul><li>id {String}: the new id of the tileset</li>
  * <li>image {String}: reference to the tileset image loaded</li>
  * <li>tileh {Integer}: height in pixels of the tiles</li>
  * <li>tilew {Integer}: width in pixels of the tiles</li>
  * <li>tilerow {Integer}: width in pixels of each row in the font image</li>
  * <li>gapx {Integer}: x-coord gap between tile columns, in pixels</li>
  * <li>gapy {Integer}: y-coord gap between tile rows, in pixels</li></ul>
  */
	getTiles:function(t) { return this._tiles[t] },
		
   /**
   	*	bigString: it is text to be splited
   	*	m: count of every line
   	*	b: return symbol
   	*	c: if return line forcely
    */
 	wordWrap:function(bigString, m, b, c){
			var i, j, s, r = bigString.split("\n");
			if(m > 0) 
			  for(i in r){
					for(s = r[i], r[i] = ""; s.length > m;
					j = c ? m : (j = s.substr(0, m).match(/\S*$/)).input.length - j[0].length
					|| m,
					r[i] += s.substr(0, j) + ((s = s.substr(j)).length ? b : "")
					){};
				r[i] += s;
			}
			var rr = r.join("\n");
			return rr.split("\n");
		},
  
  /**
  * Loads the initial splash screen and debugging font, then calls gbox._waitforloaded which adds to the game all the previously
  * defined resources. Once gbox._waitforloaded is done, it calls the callback function cb.
  * @params {String} cb The name of the function to be called when all assets are done loading.
  */
	loadAll:function(cb) {
		// Setup logger
		if (this._canlog) this.log=console.log;
		// Set the callback function, which is called after the resources are loaded.
		if (!this._cb) this._cb = cb;
		// Default stuff
		//this.addImage("_dbf","akihabara/debugfont.png");//zz remove
		if (this._splash.background) this.addImage("_splash",this._splash.background);
		//gbox.addFont({id:"_dbf",image:"_dbf",firstletter:" ",tileh:5,tilew:4,tilerow:16,gapx:0,gapy:0});//zz remove
		if (!gbox._splash.minimalTime)
			gbox._minimalexpired=2;
		this._waitforloaded();
	},
  
	_implicitsargs:function(data) {
		if (data.camera) {
			data.dx-=this._camera.x;
			data.dy-=this._camera.y;	
		}
		if (data.sourcecamera) {
			data.x=this._camera.x*(data.parallaxx?data.parallaxx:1);
			data.y=this._camera.y*(data.parallaxy?data.parallaxy:1);	
		}
	},
  
  
  setClip:function(tox, x, y, w, h){
        //保存状态
        tox.save();
        //设置裁剪区域
        tox.beginPath();
        tox.rect(x ,y, w, h);
        tox.clip();    	
  },
  
  restoreClip:function(tox){
  	//恢复状态
  	tox.restore();
  },
  /**
  * Draws a tile to a canvas context
  * @param {Object} tox The canvas context to be drawn on.
  * @param {Object} data An object containing data about the tile to be drawn, including:
  * <ul><li>tileset {String}: the id of the tileset</li>
  * <li>tile {Integer}: the index of the tile within the tileset to be drawn</li>
  * <li>dx {Integer}: x coordinate to draw the tile at</li>
  * <li>dy {Integer}: y coordinate to draw the tile at</li>
  * <li>fliph {Integer}: horizontal flip, either 1 or -1</li>
  * <li>flipv {Integer}: vertical flip, either 1 or -1</li>
  * <li>alpha {Float}: alpha value (0 is transparent, 1 is opaque)</li></ul>
  * @example
  * // from capman, draws an current object's tile, called from inside its blit function
  * gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,fliph:this.fliph,flipv:this.flipv,camera:this.camera,alpha:1});
  */
	blitTile:function(tox,data) {
		if (tox==null) return;
		var ts=this._tiles[data.tileset];
		var img=this.getImage(ts.image);
		this._implicitsargs(data);
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.translate((data.fliph?ts.tilew:0), (data.flipv?ts.tileh:0)); tox.scale((data.fliph?-1:1), (data.flipv?-1:1));
		this._safedrawimage(tox,img, ts.gapx+(ts.tilew*(data.tile%ts.tilerow)),ts.gapy+(ts.tileh*Math.floor(data.tile/ts.tilerow)),(data.w==null?ts.tilew:data.w),(data.h==null?ts.tileh:data.h),data.dx*(data.fliph?-1:1),data.dy*(data.flipv?-1:1),(data.w?data.w:ts.tilew),(data.h?data.h:ts.tileh));
		tox.restore();
	},

  /**
  * Draws an image to a canvas context
  * @param {Object} tox The canvas context to be drawn on.
  * @param {Object} image The image to draw. Must be a DOM Image element, typicallly accessed via gbox.getImage
  * @param {Object} data An object containing data about the tile to be drawn, including:
  * <ul><li>dx {Integer}: (required) x coordinate to draw the image at</li>
  * <li>dy {Integer}: (required) y coordinate to draw the image at</li>
  * <li>fliph {Integer}: horizontal flip, either 1 or -1</li>
  * <li>flipv {Integer}: vertical flip, either 1 or -1</li>
  * <li>alpha {Float}: alpha value (0 is transparent, 1 is opaque)</li></ul>
  * @example
  * // draw an image at (100,100)
  * gbox.blitAll(gbox.getBufferContext(),gbox.getImage("image_id"),{dx:100,dy:100});
  */
	blitAll:function(tox,image,data) {
		if (tox==null) return;
		this._implicitsargs(data);
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.translate((data.fliph?image.width:0), (data.flipv?image.height:0)); tox.scale((data.fliph?-1:1), (data.flipv?-1:1));
		this._safedrawimage(tox,image, 0,0, image.width,image.height,data.dx*(data.fliph?-1:1),data.dy*(data.flipv?-1:1),image.width,image.height);
		tox.restore();
	},
  
	blit:function(tox,image,data) {
		if (tox==null) return;
		this._implicitsargs(data);
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.translate((data.fliph?data.dw:0), (data.flipv?data.dh:0)); tox.scale((data.fliph?-1:1), (data.flipv?-1:1));
		this._safedrawimage(tox,image,(data.x?data.x:0), (data.y?data.y:0),(data.w?data.w:data.dw),(data.h?data.h:data.dh),data.dx*(data.fliph?-1:1),data.dy*(data.flipv?-1:1),data.dw,data.dh);
		tox.restore();
	},
 
	blitSystemText:function(tox,data) {
		if (tox==null) return;
		tox.save();
		tox.globalAlpha=(data.alpha?data.alpha:1);
		tox.fillStyle=data.color?data.color:'0';
		tox.font = data.font?data.font:'normal 16px 楷体';
		tox.textAlign =data.align?data.align:'left';
		tox.textBaseline = data.baseline?data.baseline:'top';
		//zz adject text y pos -2
		if(iphone)
			data.y-=2;
		tox.fillText(data.text,data.x,data.y);
		tox.restore();
	},

  blitPieChart:function(tox,data){
  	if (tox==null) return;
		tox.save();
		tox.globalAlpha=1;
		tox.fillStyle="#FF8000";
		tox.beginPath();
  	    tox.arc(data.x,data.y,data.radius,0,Math.PI*2,false);
  	    tox.closePath();
		tox.fill();
		tox.fillStyle="#00FFFF";
		tox.beginPath();
  	    tox.arc(data.x,data.y,data.radius,Math.PI*3/2,Math.PI*3/2+Math.PI*2*data.nValue/data.tValue,false);
  	    tox.lineTo(data.x,data.y);
  	    tox.closePath();
		tox.fill();		
		tox.restore();
  },
  /**
  * Clears a rectangular area of a canvas context.
  * @param {Object} image The canvas context to be drawn on.
  * @param {Object} data An object containing a set of data, including:
  * <ul><li>x {Integer}: (required) the x coordinate of the top-left corner of the rectangle</li>
  * <li>y {Integer}: (required) the y coordinate of the top-left corner of the rectangle</li>
  * <li>w {Integer}: the width of the box; defaults to canvas width</li>
  * <li>h {Integer}: the height the box; defaults to canvas height</li></ul>
  */
	blitClear:function(image,data) {
		if (image==null) return;
		if (data==null) data={x:0,y:0};
		this._implicitsargs(data);
		image.clearRect(data.x,data.y,(data.w==null?image.canvas.width:data.w),(data.h==null?image.canvas.height:data.h));
	},
  
  /**
  * Draws an image directly to the screen's current canvas context. Used internally in gbox.go(). Probably shouldn't be used otherwise.
  */
	blitImageToScreen:function(image) {		
	        this._screen.getContext("2d").drawImage(image,0,0);
	},
  
   /**
  * Draws a filled rectangle over an entire canvas context.
  * @param {Object} tox The canvas context to be filled.
  * @param {Object} data An object containing a set of data, including:
  * <ul><li>alpha {Float}: the alpha value of the rectangle; defaults to 1</li>
  * <li>color {Object}: the color of the box, formatted rgb(rValue, gValue, bValue); default black</li></ul>
  */
	blitFade:function(tox,data) { 
		if (tox) this.blitRect(tox,data);
	},
  
  /**
  * Draws a filled rectangle to a canvas context.
  * @param {Object} tox The canvas context to be drawn on.
  * @param {Object} data An object containing a set of data, including:
  * <ul><li>x {Integer}: (required) the x coordinate of the top-left corner of the rectangle</li>
  * <li>y {Integer}: (required) the y coordinate of the top-left corner of the rectangle</li>
  * <li>w {Integer}: (required) the width of the box</li>
  * <li>h {Integer}: (required) the height the box</li>
  * <li>alpha {Float}: the alpha value of the rectangle; defaults to 1</li>
  * <li>color {Object}: the color of the box, formatted rgb(rValue, gValue, bValue); default black</li></ul>
  */
	blitRect:function(tox,data) {
		if (tox==null) return;
		tox.save();
		tox.globalAlpha=(data.globalAlpha?data.globalAlpha:1);
		tox.fillStyle = (data.color?data.color:gbox.COLOR_WHITE);
		tox.fillRect(data.x,data.y,data.w,data.h);
		tox.restore();
	},
	strokeRect:function(tox,data) {
		if (tox==null) return;
		tox.save();
		tox.lineWidth = 2; 
		tox.globalAlpha=(data.globalAlpha?data.globalAlpha:1);
		tox.strokeStyle = (data.color?data.color:gbox.COLOR_BLACK);
		tox.strokeRect(data.x,data.y,data.w,data.h);
		tox.restore();
	},
    
	strokeLine:function(tox,sx,sy,dx,dy,color,width) {
		if (tox==null) return;
		tox.save();
		tox.moveTo(sx, sy);  
		tox.lineTo(dx, dy); 
		tox.strokeStyle = color;  
		tox.lineWidth = width;  
		tox.stroke(); 
		tox.restore();
		tox.closePath();
	},  
	
	dottedLine:function(ctx, x1, y1, x2, y2) {
	    var c=document.getElementById("canvas");
	    var ctx=c.getContext("2d");
	    
	    ctx.beginPath();
	    ctx.save();
	    if ( ctx.setLineDash !== undefined )   
	    	ctx.setLineDash([21,9,3,9]);
	    if ( ctx.mozDash !== undefined )       
	    	ctx.mozDash = [21,9,3,9];
	    ctx.globalAlpha = 1;
	    ctx.lineWidth="3";
	    ctx.strokeStyle="#FFFF00";
	    ctx.moveTo(x1,y1);
	    ctx.lineTo(x2,y2);
	    ctx.stroke();
	    ctx.restore();
	    ctx.closePath();
	},
	
//   _getTextWidth:function(txt,fontSize) {
//		var t = 0;
//		for (var j = 0; j < txt.length; j++) {
//			if (txt.charAt(j) != '#' && txt.charAt(j) != '@'
//					&& txt.charAt(j) != '^' && txt.charAt(j) != '$') {
//				t +=  this.getBufferContext().measureText(txt.charAt(j)).width;
//			}
//		}
//		return t;
//	},
		
  	stringArrayWidth:function(strArray,fontSize) {

		var max = 0;
		var t = 0;
		for (var i = 0; i < strArray.length; i++) {

			for (var j = 0; j < strArray[i].length; j++) {
				if (strArray[i].charAt(j) != '#' && strArray[i].charAt(j) != '@'
						&& strArray[i].charAt(j) != '^' && strArray[i].charAt(j) != '$')
					t += this.getBufferContext().measureText(strArray[i].charAt(j)).width;
					
			}
			max = max > t ? max : t;
			t = 0;
		}
		return max;
	},
    /**
     * 截取字符串数组
     * @param str
     * @param drawWidth
     * @return
     */
    getStringsArray:function(str, drawWidth,fontSize) {
      var begin = 0;
      var end = 0;
      var fsize = fontSize;
		if(isFirefox=navigator.userAgent.indexOf("Firefox")>0)
		{
			fsize = fontSize*2;
		}
      
      var lineWidth = -fsize;
      var line = 0;
      var vS = new Array();
      for (var i = 0; i < str.length; i++) {
        lineWidth += this.getBufferContext().measureText(str.charAt(i)).width;
        if (lineWidth >= drawWidth || str.charAt(i) == '\n') {
          end = i;
          vS.push( str.substring(begin, end) );
          begin = i;
          if (str.charAt(i) == '\n')
            begin++;
          line++;
          lineWidth = 0;
        }
      }
      if (end < str.length) {
        if (str.charAt(end) == '\n')
          end++;
        vS.push( str.substring(end, str.length) );
      }
      return vS;
    },
    
    drawRhomb:function(passImg,cx,cy)
    {
    	var w = this.getImage("" + passImg).width;
    	var h = this.getImage("" + passImg).height;
    	var g = this.getBufferContext();
    	g.save();
		g.lineWidth = 0.5;
		g.strokeStyle = "#c03f06";
		g.lineJoin = "round";
		g.beginPath();
		g.moveTo(cx - (w/2),cy);
		g.lineTo(cx,cy - (h/2));
		g.lineTo(cx + (w/2),cy);
		g.lineTo(cx,cy + (h/2));
		g.closePath();
		g.stroke();
		g.restore();
		
		var poly = [ [cx - (w/2),cy], [cx,cy - (h/2)], [cx + (w/2),cy],[cx,cy + (h/2)]];
		
		if(this._mouseArea(poly,touchMoveX,touchMoveY))
		{
			var imgX = cx - w/2;
			var imgY = cy - h/2;
			this.drawImage("" + passImg,imgX,imgY); 
		}
    },
    
    drawStringRect:function(str_array,rectX,rectY,lineWidth,font_size,color,bgColor){
    	if(str_array != null && typeof(str_array) != "undefined"){
	        var str_MaxWidth = this.stringArrayWidth(str_array, font_size);	
	        var rectW = str_MaxWidth + 20;		
	        var rectH = str_array.length * 20;					
			var rect = new Rect(rectX,rectY,rectW,rectH);
			//console.log("=====" + str_array.length);
			for(var i=0; i<str_array.length; i++){		
					this.drawDanceString(str_array[i],rect.getX(),rect.getY() + 5 + (i * 18),font_size,bgColor,color);
			}       		
    	}

	
},  
    
   drawDanceString:function(str, dx, dy,font,danceBgColor,danceFtColor) {//绘制描边字
	    var sx = dx;
	    var ry = dy;
	    this.drawString(str,sx - 1, ry - 1,danceBgColor,font);
	    this.drawString(str,sx - 1, ry,danceBgColor,font);
	    this.drawString(str,sx + 1, ry,danceBgColor,font);
	    this.drawString(str,sx, ry + 1,danceBgColor,font);
	    this.drawString(str,sx, ry - 1,danceBgColor,font);
	    this.drawString(str,sx + 1, ry + 1,danceBgColor,font);
	    this.drawString(str,sx, ry,danceFtColor,font);
   },
    
    drawTxtRect:function(str,x,y,LW,LH,font_size,color,bgColor){
    	LW = 290;
		if(typeof(str) != "undefined"){
            var str_array = gbox.getStringsArray("" + str, LW, font_size);
            var str_MaxWidth = this.stringArrayWidth(str_array, font_size);	
            var txtX = x + (LW - str_MaxWidth)/2;
            var txtY = y + (LH - (str_array.length * font_size))/2;
            
			gbox.drawStringRect(str_array,txtX, txtY, LW, font_size, color,bgColor);	
        }
    },
    _drawTxtRect:function(str,x,y,LW,LH,font_size,color,bgColor){
		if(typeof(str) != "undefined"){
            var str_array = gbox.getStringsArray("" + str, LW, font_size);
            var str_MaxWidth = this.stringArrayWidth(str_array, font_size);	
            var txtX = x + (LW - str_MaxWidth)/2;
            var txtY = y + (LH - (str_array.length * font_size))/2;
			gbox.drawStringRect(str_array,txtX, txtY, LW, font_size,color,bgColor);	
        }
    },
    pointTxtRect:function(str,x,y,LW,font_size,color,bgColor){
		if(typeof(str) != "undefined"){
            var str_array = gbox.getStringsArray("" + str, LW, font_size);
            var str_MaxWidth = this.stringArrayWidth(str_array, font_size);	
            var txtX = x;
            var txtY = y;
			gbox.drawStringRect(str_array,txtX, txtY, LW, font_size,color,bgColor);	
        }
    },
    drawMessageRect:function(str,rectX,rectY,lineWidth,font_size,color){
    	
        var fsize = font_size;
    	if(str != null && typeof(str) != "undefined"){
	        var str_array = this.getStringsArray(str, lineWidth, fsize);
	        var str_MaxWidth = this.stringArrayWidth(str_array, fsize) + 20;
	        var rectW = str_MaxWidth;		
	        var rectH = str_array.length * 20;					
			var rect = new Rect(rectX+15,rectY+15,rectW,rectH);
			this._roundRectanglePath(this.getBufferContext(),rect, 5,"#4A4C43","#BEA76E",true);
			for(var i=0; i<str_array.length; i++){
				    this.drawString(str_array[i],rect.getX() + 3,rect.getY() + 5 + (i * 20),color,fsize);
			}       		
    	}
	
    },
    
    drawMessage:function(str,rectX,rectY,lineWidth,font_size,color){
    	if(str != null && typeof(str) != "undefined"){
	        var str_array = str;
	        var str_MaxWidth = this.stringArrayWidth(str_array, font_size);	
	        var rectW = str_MaxWidth;	
	        var rectH = str_array.length * 20;					
			var rect = new Rect(rectX + 10,rectY + 20,rectW,rectH + 10);
			this._roundRectanglePath(this.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
			for(var i=0; i<str_array.length; i++){
				this.drawString(str_array[i],rect.getX() + 3,rect.getY() + 5 + (i * 20),color,font_size);
			}       		
    	}
    },
    
    drawMessageObject:function(str,rectX,rectY,lineWidth,font_size,color){
    	var rectW = 0;
    	var rectH = 0;
    	if(str != null && typeof(str) != "undefined"){
    		var str_array = new Array();
    		for(var a = 0 ;a<str.slides.length; a++)
    		{
    			str_array[a] = str.slides[a].name + str.slides[a].res;
    	
    		}
	        var str_MaxWidth = this.stringArrayWidth(str_array, font_size);	
	        rectW = str_MaxWidth + 20;	
	        rectH = str_array.length * 20; 			
			var rect = new Rect(rectX + 10,rectY + 20,rectW + 15,rectH + 10);
			this._roundRectanglePath(this.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
			for(var i=0; i<str_array.length; i++){
				
				this.drawString(str.slides[i].name,rect.getX() + 3,rect.getY() + 5 + (i * 20),str.slides[i].color,font_size);
				this.drawString(str.slides[i].res,rect.getX() + 5 + this.getTextWidth(str.slides[i].name,font_size),rect.getY() + 5 + (i * 20),str.slides[i].resColor,font_size);
			}  
		    for(var i=0; i<auctionPoly.length; i++){
		    	if(typeof(auctionPoly[i]) != "undefined" && typeof(auctionDiv[i]) != "undefined"){
		    		if(this.intersectRect(auctionPoly[i][0],auctionPoly[i][1],auctionPoly[i][2],auctionPoly[i][3],
		    		                      rectX + 10,rectY + 20,rectW + 15,rectH + 10)){
	                    auctionDiv[i].style.display="none";
		    		}else{
	                    auctionDiv[i].style.display="";
		    		}
		    	}
		    }	
    	}


    },
    zerodrawMessageObject:function(str,rectX,rectY,lineWidth,font_size,color,lengthxx){
    	
    	if(str != null && typeof(str) != "undefined"){
    		var str_array = new Array();
    		for(var a = 0 ;a<lengthxx; a++)
    		{
    	
    			str_array[a] = str[a].slides.name + str[a].slides.res;
    	
    		}
	        var str_MaxWidth = this.stringArrayWidth(str_array, font_size);	
	        var rectW = str_MaxWidth + 20;	
	        var rectH = str_array.length * 20;					
			var rect = new Rect(rectX + 10,rectY + 20,rectW,rectH + 10);
			this._roundRectanglePath(this.getBufferContext(),rect, 5,"#342D21","#FFFFFF",true);
			for(var i=0; i<str_array.length; i++){
				
				this.drawString(str[i].slides.name,rect.getX() + 3,rect.getY() + 5 + (i * 20),str[i].slides.color,font_size);
				this.drawString(str[i].slides.res,rect.getX() + 5 + this.getTextWidth(str[i].slides.name,font_size),rect.getY() + 5 + (i * 20),str[i].slides.resColor,font_size);
			}       		
    	}
	
    },
	/**
	 * 绘制圆角矩形,用arc和LineTo函数
	 */
	_roundRectanglePath:function(tox,rect,radius,bgColor,lineColor,type)
	{
		tox.save();
		if(isFirefox=navigator.userAgent.indexOf("Firefox")>0)
		{

		}
     	else
     	{    
    	    if ( tox.setLineDash !== undefined )   
    	    	tox.setLineDash([0,0,0,0]);
    	    if ( tox.mozDash !== undefined )       
    	    	tox.mozDash = [0,0,0,0];
     	}

	    
	        tox.lineWidth="1";
	        tox.globalAlpha=0.6;
	        tox.fillStyle= bgColor;
	        tox.strokeStyle = lineColor; 
	        tox.lineCap = "round";  
	        tox.lineJoin = "round"; 		
            tox.beginPath();            
		    tox.moveTo( rect.getX()+radius,rect.getY() );
		    tox.lineTo( rect.getRight()-radius,rect.getY() );
		    tox.arc( rect.getRight()-radius,rect.getY()+radius, radius, 3*Math.PI/2,2*Math.PI, false);
		    tox.lineTo( rect.getRight(),rect.getBottom()-radius);
		    tox.arc( rect.getRight()-radius,rect.getBottom()-radius, radius, 0, Math.PI/2, false);
		    tox.lineTo( rect.getX()+radius,rect.getBottom() );
		    tox.arc( rect.getX()+radius,rect.getBottom()-radius, radius, Math.PI/2, Math.PI, false);
		    tox.lineTo( rect.getX(),rect.getY()+radius);
		    tox.arc( rect.getX()+radius,rect.getY()+radius, radius,Math.PI, 3*Math.PI/2, false);
		    if(type)
		       tox.fill();  
            tox.stroke(); 
            tox.closePath();
            tox.restore();
	}, 
	roundRectanglePath:function(tox,rect,radius,bgColor,lineColor,type)
	{
			tox.save();
	        tox.globalAlpha=0.3;
	        tox.fillStyle= bgColor;
	        tox.strokeStyle = lineColor; 
	        tox.lineCap = "round";  
	        tox.lineJoin = "round"; 		
            tox.beginPath();            
		    tox.moveTo( rect.getX()+radius,rect.getY() );
		    tox.lineTo( rect.getRight()-radius,rect.getY() );
		    tox.arc( rect.getRight()-radius,rect.getY()+radius, radius, 3*Math.PI/2,2*Math.PI, false);
		    tox.lineTo( rect.getRight(),rect.getBottom()-radius);
		    tox.arc( rect.getRight()-radius,rect.getBottom()-radius, radius, 0, Math.PI/2, false);
		    tox.lineTo( rect.getX()+radius,rect.getBottom() );
		    tox.arc( rect.getX()+radius,rect.getBottom()-radius, radius, Math.PI/2, Math.PI, false);
		    tox.lineTo( rect.getX(),rect.getY()+radius);
		    tox.arc( rect.getX()+radius,rect.getY()+radius, radius,Math.PI, 3*Math.PI/2, false);
		    if(type)
		       tox.fill();
		    else
               tox.stroke(); 
            tox.closePath();
			tox.restore();
	},
	
	/**
	 * 绘制圆角矩形，用quadraticCurveTo和lineTo函数
	 */
	roundRectanglePath2:function(context,rect,radius)
	{
	    context.beginPath();
	    context.moveTo( rect.getX()+radius,rect.getY() );
	    context.lineTo( rect.getRight()-radius,rect.getY() );
	    context.quadraticCurveTo( rect.getRight(), rect.getY(), rect.getRight(), rect.getY() + radius);
	    context.lineTo( rect.getRight(),rect.getBottom()-radius);
	    context.quadraticCurveTo( rect.getRight(), rect.getBottom(), rect.getRight()-radius, rect.getBottom());
	    context.lineTo( rect.getX()+radius,rect.getBottom() );
	    context.quadraticCurveTo( rect.getX(), rect.getBottom(), rect.getX(), rect.getBottom()-radius);
	    context.lineTo( rect.getX(),rect.getY()+radius);
	    context.quadraticCurveTo( rect.getX(), rect.getY(), rect.getX()+radius, rect.getY());
	    context.closePath();
	},
  /**
  * Calculates a box collision between two collision boxes within a given tolerance. A higher tolerance means less precise collision.
  * @param {Object} o1 A collision box you're testing for collision. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>w {Integer}: (required) the width of the box</li>
  * <li>h {Integer}: (required) the height the box</li></ul>
  * @param {Object} o2 A collision box you're testing for collision. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>w {Integer}: (required) the width of the box</li>
  * <li>h {Integer}: (required) the height the box</li></ul>
  * @param {Integer} t The tolerance for the collision, in pixels. A value of 0 means pixel-perfect box collision. A value of 2 would mean that the
  * boxes could overlap by up to 2 pixels without being considered a collision.
  * @returns True if the two collision boxes are colliding within the given tolerance.
  */  
	collides:function(o1,o2,t) {
		if (!t) t=0;
		return !((o1.y+o1.h-1-t<o2.y+t) || (o1.y+t> o2.y+o2.h-1-t) || (o1.x+o1.w-1-t<o2.x+t) || (o1.x+t>o2.x+o2.w-1-t));
	},
  
  /**
  * Calculates a point-box collision between a point and a collision box within a given tolerance. A higher tolerance means less precise collision.
  * @param {Object} o1 A point you're testing for collision. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the point</li>
  * <li>y {Integer}: (required) the y coordinate of the point</li></ul>
  * @param {Object} o2 A collision box you're testing for collision. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>w {Integer}: (required) the width of the box</li>
  * <li>h {Integer}: (required) the height the box</li></ul>
  * @param {Integer} t The tolerance for the collision, in pixels. A value of 0 means pixel-perfect collision. A value of 2 would mean that the
  * point could exist within the outermost 2 pixels of the box without being considered a collision.
  * @returns True if the point is colliding with the box within the given tolerance.
  */  
	pixelcollides:function(o1,o2,t) {
		if (!t) t=0;
		return !((o1.y<o2.y+t) || (o1.y> o2.y+o2.h-1-t) || (o1.x<o2.x+t) || (o1.x>o2.x+o2.w-1-t));
	},
  
  /**
  * Determines whether an object is visible by seeing if it collides with the camera's viewport.
  * @param {Object} obj The object you're testing to see if it's visible. Must contain:
  * <ul><li>x {Integer}: (required) the x coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>y {Integer}: (required) the y coordinate of the object's origin; assumes the Akihabara default of top-left being the origin</li>
  * <li>w {Integer}: (required) the width of the object's collision box</li>
  * <li>h {Integer}: (required) the height the object's box</li></ul>
  * @returns True if the object's collision box is within the camera's viewport.
  */  
	objectIsVisible:function(obj) { return this.collides(obj,this._camera,0); },
	
	 
    setSplashSettings:function(a) { for (var n in a) this._splash[n]=a[n]; },
	 

	_xmlhttp:null,

	_loaderqueue:cyclelist.create(4000),
//	_loadercache:cachelist.create(4000),

	
	
	// Callback for loaded image
	_loaderimageloaded:function() {
		this.setAttribute('wasloaded',true);
		this.hheight=Math.floor(this.height/2);
		this.hwidth=Math.floor(this.width/2);
		

		gbox._loaderloaded();	
	},
	// Callback for loaded bundle
//	_loaderhmlhttploading:function(){
//		var rs=(typeof this.readyState != "undefined" ?this.readyState:gbox._xmlhttp.readyState);
//		var st=(typeof this.status != "undefined" ?this.status:gbox._xmlhttp.status);
//		var rt=(typeof this.responseText != "undefined" ?this.responseText:gbox._xmlhttp.responseText);
//		if(rs == 4 && (!st ||st == 200)) {
//			if (rt) {
//				if (!gbox._loaderqueue.getCurrent().call.skipCacheSave)
//					gbox._loadercache.add(gbox._loaderqueue.getCurrent().call.file,rt);
//				var pack=eval("("+rt+")");
//				gbox.readBundleData(pack,gbox._loaderqueue.getCurrent().call);
//				// Keep loading the other resources.
//				gbox._loaderloaded();
//			}	
//		}
//	},

	// Loader code
	_addtoloader:function(d) { // type:xx, data:yy
		gbox._loaderqueue.push(d);
	
		if (!gbox._loaderqueue.isProcessing())
		{
			
			gbox._loadnext();
		}
			
	},
	_loaderloaded:function() {
//		setTimeout(gbox._loadnext,100);引擎原写法
		gbox._loadnext();//修改 2013-5-30 徐忠兴
	},
	_loaderscript:function() {
		if (gbox._loaderqueue.getCurrent().call.onLoad) gbox._addtoloader({type:"exec-onl",func:gbox._loaderqueue.getCurrent().call.onLoad,call:gbox._loaderqueue.getCurrent().call});
		gbox._loadnext();
	},
	_loadnext:function() {
		var current=gbox._loaderqueue.pop();
		if (gbox._loaderqueue.isProcessing()) {
			switch (gbox._loaderqueue.getCurrent().type) {
				case "image":{
					gbox._images[current.id]=new Image();
//					var currentItem;
				 
					
//					curentImage = current.id; 
				 
					gbox._images[current.id].src= current.filename; 
		
					gbox._images[current.id].setAttribute('name',current.filename);
					gbox.addEventListener(gbox._images[current.id],'load', gbox._loaderimageloaded);
					
					gbox._images[current.id].setAttribute('src_org',current.filename);
					gbox._images[current.id].setAttribute('id',current.id);
					gbox._images[current.id].setAttribute('wasloaded',false);
					 
					break;
				}
				 
			}
		}
	
	},
	_waitforloaded:function() {
		var aul;
		if (gbox._loaderqueue.isBusy()||(gbox._minimalexpired!=2)) {
			var tox=gbox._screen.getContext("2d");
			tox.save();
			gbox.blitFade(tox,{alpha:1});
			if (!gbox._minimalexpired&&gbox._splashscreeniscompleted()) {
				gbox._minimalexpired=1;
				setTimeout(gbox._minimaltimeexpired,gbox._splash.minimalTime);
			}
			if (gbox._splash.loading) gbox._splash.loading(tox,gbox._loaderqueue.getDone(),gbox._loaderqueue.getTotal());
//			switch (gbox._flags.loadscreen) {
//				case "c64": {
//					var p=0;
//					var l=0;
//					while (p!=gbox.getScreenH()) {
//						l=10+Math.floor(Math.random()*gbox.getScreenH()/4);
//						if (p+l>gbox.getScreenH()) l=gbox.getScreenH()-p;
//						tox.fillStyle = gbox.PALETTES.c64.colors[gbox.PALETTES.c64.order[Math.floor(Math.random()*gbox.PALETTES.c64.order.length)]];
//						tox.fillRect(0,p,gbox.getScreenW(),l);
//						p+=l;
//					}
//					tox.fillStyle = gbox.PALETTES.c64.colors.lightblue;
//					tox.fillRect(Math.floor(gbox.getScreenW()/10),Math.floor(gbox.getScreenH()/10),gbox.getScreenW()-Math.floor(gbox.getScreenW()/5),gbox.getScreenH()-Math.floor(gbox.getScreenH()/5));
//					if (gbox._splash.minilogo&&gbox.imageIsLoaded("logo")) {
//						//var dw=gbox.getScreenW()/4;
//						//var dh=(gbox.getImage("logo").height*dw)/gbox.getImage("logo").width;
//						gbox.blit(tox,gbox.getImage(gbox._splash.minilogo),{w:gbox.getImage("logo").width,h:gbox.getImage("logo").height,dx:0,dy:0,dw:gbox.getImage("logo").width,dh:gbox.getImage("logo").height});//dx:(gbox.getScreenW()-dw)/2,dy:(gbox.getScreenH()-dh)/2,dw:dw,dh:dh});
//					}					
//					break;
//				}
//				default:{
					if (gbox._splash.background&&gbox.imageIsLoaded("_splash"))
						gbox.blit(tox,gbox.getImage("_splash"),{w:gbox.getImage("_splash").width,h:gbox.getImage("_splash").height,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH()});
					if (gbox._splash.minilogo&&gbox.imageIsLoaded("logo")) {
						var dw=gbox.getScreenW()/4;
						var dh=(gbox.getImage("logo").height*dw)/gbox.getImage("logo").width;
						gbox.blit(tox,gbox.getImage(gbox._splash.minilogo),{w:gbox.getImage("logo").width,h:gbox.getImage("logo").height,dx:(gbox.getScreenW() - gbox.getImage("logo").width)/2,dy:(gbox.getScreenH() - gbox.getImage("logo").height)/2,dw:gbox.getImage("logo").width,dh:gbox.getImage("logo").height});//dx:gbox.getScreenW()-dw-5,dy:gbox.getScreenH()-dh-5,dw:dw,dh:dh});
					}
					if (gbox._splash.footnotes&&gbox.imageIsLoaded("_dbf")) {
						if (!gbox.getCanvas("_footnotes")) {
							var fd=gbox.getFont("_dbf");
							gbox.createCanvas("_footnotes",{w:gbox.getScreenW()-5,h:(gbox._splash.footnotes.length)*(fd.tileh+gbox._splash.footnotesSpacing)});
							for (var i=0;i<gbox._splash.footnotes.length;i++)
								gbox.blitText(gbox.getCanvasContext("_footnotes"),{
												font:"_dbf",
												dx:0,
												dy:i*(fd.tileh+gbox._splash.footnotesSpacing),
												text:gbox._splash.footnotes[i]
											});
						}
						gbox.blitAll(tox,gbox.getCanvas("_footnotes"),{dx:5,dy:gbox.getScreenH()-gbox.getCanvas("_footnotes").height-5});
					}
					if (gbox._loaderqueue.isBusy()) 
					{
						gbox.drawLoadingBar(tox);
					}
//				}
//			}
			tox.restore();		
			gbox.setStatBar("Loading... ("+gbox._loaderqueue.getDone()+"/"+gbox._loaderqueue.getTotal()+")");
			setTimeout(gbox._waitforloaded,50);
		} else {
			gbox.deleteImage("_splash");
			gbox.setStatBar();
			gbox._cb();
		}
	},
	
	drawLoadingBar : function(tox)
	{
		var bw = Math.floor(((787) * gbox._loaderqueue.getDone()) / gbox._loaderqueue.getTotal());
		tox.globalAlpha = 1;
		tox.fillStyle = gbox._splash.gaugeBackColor;
        gbox.drawImage("jdt_02",292,Math.floor(((gbox.getScreenH() - gbox._splash.gaugeHeight) / 2))+92 ); 
	    
        gbox.setClip(gbox.getBufferContext(),
        		326,462,bw,18);
        
        gbox.drawImage("jdt_03",326,463); 
        
        gbox.restoreClip(gbox.getBufferContext());
		tox.font = 'normal 16px 楷体';
		tox.textAlign = 'left';
		tox.textBaseline = 'top';
		tox.fillText('加载中', 639, Math.floor(((gbox.getScreenH() - gbox._splash.gaugeHeight) / 2) - 20 + 90));
	},
	
//	clearCache:function() { this._loadercache.clear(); },
	
	// --- 
	// --- 
	// ---  BROWSER QUIRKS
	// --- 
	// --- 
	
	checkCanvasSupport:function() {
	  return !!document.createElement('canvas').getContext;
	},
	addEventListener:function(to,event,code) {

		if (to.addEventListener) to.addEventListener(event,code,false);
		else to.attachEvent('on'+event,code);
	},
	removeEventListener:function(to,event,code) {
		if (to.removeEventListener) to.removeEventListener(event,code,false);
		else to.detachEvent('on'+event,code);
	},
	XMLHttpFactories:[
		function () {return new XMLHttpRequest()},
		function () {return new ActiveXObject("Msxml2.XMLHTTP")},
		function () {return new ActiveXObject("Msxml3.XMLHTTP")},
		function () {return new ActiveXObject("Microsoft.XMLHTTP")}
	],
	createXmlHttpRequest:function() {
		var xmlhttp=false;
	   /* running locally on IE5.5, IE6, IE7 */                                              ; /*@cc_on
		 if(location.protocol=="file:"){
		  if(!xmlhttp)try{ xmlhttp=new ActiveXObject("MSXML2.XMLHTTP"); }catch(e){xmlhttp=false;}
		  if(!xmlhttp)try{ xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){xmlhttp=false;}
		 }                                                                                ; @cc_off @*/
	   /* IE7, Firefox, Safari, Opera...  */
		 if(!xmlhttp)try{ xmlhttp=new XMLHttpRequest(); }catch(e){xmlhttp=false;}
	   /* IE6 */
		 if(typeof ActiveXObject != "undefined"){
		  if(!xmlhttp)try{ xmlhttp=new ActiveXObject("MSXML2.XMLHTTP"); }catch(e){xmlhttp=false;}
		  if(!xmlhttp)try{ xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); }catch(e){xmlhttp=false;}
		 }
	   /* IceBrowser */
		 if(!xmlhttp)try{ xmlhttp=createRequest(); }catch(e){xmlhttp=false;}
		return xmlhttp;
	}

};
/**
 * @namespace
 * Toys module provides lots of common routines during the game developing: 
 * from effects for screen titles to HUD handling to platform/SHMUP/RPG oriented routines, 
 * like jumping characters, Z-Indexed objects, bullets, sparks, staff rolls, bonus screens, dialogues etc.
 */
var toys={

	 
	topview:{
	
		/**
		* Checks if an object checks that both objects are on the same Z plane and if so it calls gbox.collides.
		* @param {Object} fr The object which collision is being checked for. 
		* <ul>
		* <li>x{Integer}: (required)Objects x position</li>
		* <li>y{Integer}: (required)Objects y position</li>
		* <li>z{Integer}: (required)Objects z position</li>
		* <li>colx{Integer}: (required)The dimension of the collision box along the x axis</li>
		* <li>coly{Integer}: (required)The dimension of the collision box along the y axis</li>
		* <li>colh{Integer}: (required)Collision box height</li>
		* <li>colw{Integer}: (required)Collision box width</li>
		* </ul>
		* @param {Object} to The object that collision is being checked against.
		* <ul>
		* <li>x{Integer}: (required)Objects x position</li>
		* <li>y{Integer}: (required)Objects y position</li>
		* <li>z{Integer}: (required)Objects z position</li>
		* <li>colx{Integer}: (required)Collision x</li>
		* <li>coly{Integer}: (required)Collision y</li>
		* <li>colh{Integer}: (required)Collision box height</li>
		* <li>colw{Integer}: (required)Collision box width</li>
		* </ul>
		* @param {int} t This is the tollerance (or margin for error) on the collide function.
		*/
		collides:function(fr,to,t) { // Special collision. Counts also the Z
			if (Math.abs(fr.z,to.z)<5) return gbox.collides({x:fr.x+fr.colx,y:fr.y+fr.coly,h:fr.colh,w:fr.colw},{x:to.x+to.colx,y:to.y+to.coly,h:to.colh,w:to.colw},t); else return false;
		},
		
		/**
		* Checks for pixel collisions with an offset to the X and Y of the colidable using colx and coly.
		* @param {Object} fr The object which collision is being tested for.
		* @param {Object} to The object (or point) which collision is being tested against.
		* @param {int} t The tollerance of the collision algorithm.
		*/
		pixelcollides:function(fr,to,t) { // Special collision. Counts also the Z
			return gbox.pixelcollides(fr,{x:to.x+to.colx,y:to.y+to.coly,h:to.colh,w:to.colw},t);
		},
		
		/**
		* Initializes the game with the variables needed for topview and whatever else you feed in through data.
		* @param {Object} th Passes in the object being initialized.
		* @param {Object} data This is used to pass in everything that's being initiliized. If a value is not in Data then a default value is used instead. This can pass in values which do not have a default.
		* <ul>
		* <li>x{Integer}: x position of the object. (defaults to 0)</li>
		* <li>y{Integer}: y position of the object. (defaults to 0)</li>
		* <li>z{Integer}: z index of the object. (defaults to 0)</li>
		* <li>accx{Integer}: The starting x velociyt of the object. (defaults to 0)</li>
		* <li>accy{Integer}: The starting y velocity of the object. (defaults to 0)</li>
		* <li>accz{Integer}: The starting z velocity of the object. (defaults to 0)</li>
		* <li>frames{Object}: This is stores the animation frames for the objects in a map style structure. An empty map means the default image will display with no animation frames. (defaults to an empty map)</li>
		* <li>shadow: (defaults to null)</li> //incomplete
		* <li>maxacc{Integer}: (defaults to )4</li>
		* <li>controlmaxacc{Integer}: (defaults to 4)</li>
		* <li>responsive: (defaults to 0)</li>
		* <li>weapon: (defaults to 0)</li>
		* <li>camera{Boolean}: (defaults to true)</li>
		* <li>flipv{Boolean}: Notes if the object is flipped vertically(defaults to false)</li>
		* <li>fliph{Boolean}: Notes if the object is flipped horrizontally(defaults to false)</li>
		* <li>facing{Integer}: Stores the facing of the object. This is set with pre-defined Integer values from within Toys.(defaults to toys.FACE_DOWN)</li>
		* <ul>
		* <li>FACE_UP:0,</li>
		* <li>FACE_RIGHT:1,</li>
		* <li>FACE_DOWN:2,</li>
		* <li>FACE_LEFT:3,</li>
		* </ul>
		* <li>flipside{Boolean}: (defaults to true)</li>
		* <li>haspushing{Boolean}: (defaults to false)</li>
		* <li>frame: (default to 0)</li>
		* <li>colh{Integer}: (defaults to gbox.getTiles(th.tileset).tilehh)</li>
		* <li>colw{Integer}: (defaults to gbox.getTiles(th.tileset).tilew)</li>
		* <li>colx{Integer}: (defaults to 0)</li>
		* <li>staticspeed{Integer}: (defaults to 0)</li>
		* <li>nodiagonals{Boolean}: (defaults to false)</li>
		* <li>noreset: (defaults to false)</li>
		* </ul>
		*/
		initialize:function(th,data) {
			help.mergeWithModel(
				th,
				help.mergeWithModel(
					data,
					{
						x:0, y:0,
						z:0,
						accx:0, accy:0, accz:0,
						frames:{},
						shadow:null,
						maxacc:4, controlmaxacc:4,
						responsive:0, // Responsiveness
						weapon:0, // Weapon
						camera:true,
						flipv:false, fliph:false,
						facing:toys.FACE_DOWN,
						flipside:true,
						haspushing:false,
						frame:0,
						colh:gbox.getTiles(th.tileset).tilehh,
						colw:gbox.getTiles(th.tileset).tilew,
						colx:0,
						staticspeed:0,
						nodiagonals:false,
						noreset:false
					}
				)
			);
			if (th.coly==null) th.coly=gbox.getTiles(th.tileset).tileh-th.colh;
			th.colhh=Math.floor(th.colh/2);
			th.colhw=Math.floor(th.colw/2);
			
			toys.topview.spawn(th);
		},
		
		/**
		* Spawns a new object in the topview namespace. This also merges parameters in data into paramaters in th using help.copyModel.
    * This initializes some basic basic variables for the object and sets the Z index.
		* @param {Object} th References 'this' which is the object that called the method (generally).
		* <ul>
		* <li>y {Integer}: (required) The object's y position.</li>
		* <li>h {Integer}: (required) The object's height.</li>
		* </ul>
		* @param {Object} data This holds variables to be merged into th's stored info.
		*/
		spawn:function(th,data) {
			th.xpushing=toys.PUSH_NONE; // user is moving side
			th.vpushing=toys.PUSH_NONE; // user is moving side
			th.zpushing=toys.PUSH_NONE; // user is moving side
			th.counter=0; // self counter
			th.hittimer=0;
			th.killed=false;				
			help.copyModel(th,data);
			gbox.setZindex(th,th.y+th.h); // these object follows the z-index and uses ZINDEX_LAYER
		}
		
		}
}

/**
 * @namespace Help module provides some Javascript-specific functions, such object copying, randomizing functions, 
 * string/array handlers and the akihabaraInit function.
 */
var help={

 /**
 * Searches an object in an array filtering for one of their properties.
 * @param {Array} a The array.
 * @param {String} field The searched field.
 * @param {String} value The searched value.
 * @returns The found object, otherwise null.
 */
 searchObject:function(a,field,value) {
 	if (!a) return null; else
 	for (var i=0;i<a.length;a++) if (a[i][field]==value) return a[i];
 	return null;
 },


 /**
 * Generates numbers from st to ed, along with a skip value.
 * @param {Integer} st Starting number.
 * @param {Integer} ed Ending number.
 * @param {Integer} skip Number to increment by.
 * @returns An array containing the set of numbers from st to ed, incrementing by skip.
 */
	seq:function(st,ed,skip) {
		var ret=[];
		for (var i=st;i<ed;i+=(skip==null?1:skip)) ret.push(i);
		return ret;
	},

 /**
 * Multiplies two numbers together, returning the result, unless the first parameter is less than 2, in which case it returns 1.
 * @param {Float} v First value.
 * @param {Float} mul Second value.
 * @returns An integer, v*mul, unless v<2 in which case it returns 1.
 */
	// Handle a multiplier like counter. that means, 0=1 / 1=1 / 2=2*mul etc...
	multiplier:function(v,mul) {
		return (!v||(v<2)?1:v*(!mul?1:mul));
	},
	
 /**
 * Prepends a string with repeated instances of another string until it the result is greater than or equal to a desired length.
 * @param {String} str The string you wish to modify.
 * @param {Integer} len The desired length of your resultant string.
 * @param {String} pad The string you wish to prepend to str.
 * @returns A string whose length is no greater than len+pad.length, with pad prepending str repeatedly.
 */
	prepad:function(str,len,pad) {
		str+="";
		while (str.length<len) str=pad+str;
		return str;
	},
	
 /**
 * Postpends a string with repeated instances of another string until it the result is greater than or equal to a desired length.
 * @param {String} str The string you wish to modify.
 * @param {Integer} len The desired length of your resultant string.
 * @param {String} pad The string you wish to postpend to str.
 * @returns A string whose length is no greater than len+pad.length, with pad postpending str repeatedly.
 */
	postpad:function(str,len,pad) {
		str+="";
		while (str.length<len) str+=pad;
		return str;
	},

 /**
 * Tests to see if an object is being "jumped on" by another object. Only works for platformers, since it assumes accy>0 means you're falling onto something else.
 * @param {Object} th The object that is (possibly) being jumped on.
 * @param {Object} by The object doing the jumping-on.
 * @returns True if the two objects are overlapping enough and by.accy>0.
 */
	isSquished:function(th,by) {
		return ((by.accy>0)&&gbox.collides(th,by)&&(Math.abs(th.y-(by.y+by.h))<(th.h/2)))
	},
 
 /**
 * Generates uniformly distributed random integers between min and min+range, non-inclusive. So help.random(0,2) will only return 0 and 1, etc.
 * @param {Integer} min The minimum random value to be returned by the function.
 * @param {Integer} range The number of different values returned by the function.
 * @returns An integer between min (includive) and min+range (noninclusive).
 */
	random:function(min,range) {
		return min+Math.floor(Math.random()*range);
	},
 
 
  /**
 * Determines which frame of a given animation to display. Will loop an animation.
 * @param {Object} anim An object with parameters speed (the animation speed) and frames (the array representing the animation sequence).
 * @returns The particular animation frame to display during this step.
 */	
	decideFrame:function(anim) {
		var framelength = anim.frames.length;
//		anim.speed = 1/framelength;
//		console.log("anim.speed ======== " + anim.speed);
		if( new Date().getTime() - anim.time > anim.speed){
			anim.cnt++;
			anim.time = new Date().getTime();
		}
		return anim.frames[Math.floor(anim.cnt%anim.frames.length)];
	},
	
  
 /**
 * Determines which frame of a given animation to display. Will remain on the last frame when the animation has played once.
 * @param {Integer} cnt A global frame counter.
 * @param {Object} anim An object with parameters speed (the animation speed) and frames (the array representing the animation sequence).
 * @returns The particular animation frame to display during this step.
 */
	decideFrameOnce:function(anim) {
		if(new Date().getTime() - anim.time>anim.speed){
			anim.cnt++;
			anim.time = new Date().getTime();
		}
		return anim.frames[(anim.cnt>=anim.frames.length?anim.frames.length-1:anim.cnt)];
	},
  
 /**
 * Returns whether the animation was fully played at least once with decideFrame or fully with decideFrameOnce.
 * @param {Integer} cnt A global frame counter.
 * @param {Object} anim An object with parameters speed (the animation speed) and frames (the array representing the animation sequence).
 * @returns A boolean, true if the animation has been played at least once.
 */
 	isLastFrameOnce:function(cnt,anim) {
		return (cnt>=anim.frames.length*anim.speed);
	},

 /**
 * Given an incrementing value each step, this will return a value increasing from 0 until max/2, at which point it will decrement to 0, then go back up to max/2, in an endless cycle.
 * @param {Integer} counter A counter.
 * @param {Integer} max This determines the period of the function -- assuming counter is incrementing by one, a complete back-and-forth will take 'max' steps.
 * @returns An integer.
 */
	upAndDown:function(counter,max) {
		if ((counter%max)>(max/2)) return max-(counter%max); else return (counter%max);
	},
  
   
  
  /**
  * Limits a number to a certain range. If the number is below the minimum, the minimum is returned. If the number is above the maximum, the maximum is returned.
  * @param {Float} v A value.
  * @param {Float} min The minimum limit.
  * @param {Float} max The maximum limit.
  * @returns A value equal to v if min<v<max. Returns min if v<min, max if v>max.
  */	
	limit:function(v,min,max) {
		if (v<min) return min; else if (v>max) return max; else return v;
	},
 
  /**
  * Subtracts or adds 1 to a value, always converging to zero. For example, passing -3 yields -2, 5 yields 4, etc. Works best with integers.
  * @param {Integer} v A value.
  * @returns A value that is one closer to 0 on the number line than v.
  */	
	goToZero:function(v) { return (v?v-(v/Math.abs(v)):0); },
	
  /**
  * Merges two sets of parameters together without overwriting existing parameters. This merges from model to data, and if data and model share parameters, data's values remain intact.
  * @param {Object} data An object containing a set of parameters, the destination of the merge.
  * @param {Object} model An object containing a set of parameters, the source of the merge.
  * @returns A merged model where the values of 'data' remain untouched: only new parameters and values from 'model' make it in.
  * @example
  * dst = {a: 1, b: 2, c: "three"};
  * src = {c: "three", d: "four"};
  * merged = help.mergeWithModel(dst,src);
  * merged; // => {a: 1, b: 2, c: 3, d: "four"};
  */	
	mergeWithModel:function(data,model) {
		if (data==null) data={};
		if (model!=null)
			for (var i in model)
				if (data[i]==null) data[i]=model[i];
		return data;
	},
	
  /**
  * Merges two sets of parameters together overwriting any existing parameters. This merges model->data, and if data and model share parameters, data's are overwritten by model's.
  * @param {Object} data An object containing a set of parameters, the destination of the merge.
  * @param {Object} model An object containing a set of parameters, the source of the merge.
  * @returns A merged model where the values of 'model' take precedence over those of 'data'. The 'data' object is returned and will be an exact copy of 'model', plus any parameters that 'data' had before the merge that 'model' did not.
  * @example
  * dst = {a: 1, b: 2, c: "three"};
  * src = {c: "three", d: "four"};
  * merged = help.mergeWithModel(dst,src);
  * merged; // => {a: 1, b: 2, c: "three", d: "four"}
  */	
	copyModel:function(data,model) {
		if (data==null) data={};
		if (model!=null)
			for (var i in model) data[i]=model[i];
		return data;
	},

  /**
  * Creates a subset of an existing set of parameters.
  * @param {Object} obj An object containing a set of parameters, the source of the data.
  * @param {Array} attrs An array of strings, containing the names of parameters you wish to copy.
  * @returns A new set of parameters based on the subset specified.
  * @example
  * data = {a: 1, b: 2, c: "three"};
  * newdata = help.createModel(data, ["a", "c"]);
  * newdata; // => {a: 1, c: "three"}
  */	
	createModel:function(obj,attrs) {
		var ret={};
		for (var i=0;i<attrs.length;i++) ret[attrs[i]]=obj[attrs[i]];
		return ret;
	},
	
  /**
  * Creates a duplicate of an existing set of parameters.
  * @param {Object} model An object containing a set of parameters.
  * @returns A new object, equivalent to 'model'.
  * @example
  * data = {a: 1, b: 2, c: "three"};
  * newdata = help.cloneObject(data);
  * newdata; // => {a: 1, b: 2, c: "three"}
  */	
	cloneObject:function(model) {
		if (!model) return model;
		var data={};
		for (var i in model) data[i]=model[i];
		return data;
	},
	
   

  /**
  * Returns the Nth element in an array. If the array is shorter than N, it returns the last element of the array.
  * @param {Array} a An array.
  * @param {Integer} id An index to the array.
  * @returns If id > a.length, it returns a[a.length-1]. Otherwise returns a[id].
  */	
	getArrayCapped:function(a,id) {
		if (id>=a.length) return a[a.length-1]; else return a[id];
	},
	
  /**
  * Returns the element of a sorted array that have the highest value of one of the properties.
  * @param {Array} a An array.
  * @param {Integer} value The target value.
  * @param {String} field The property used to filter the array.
  * @returns The object with the highest target value, otherwise the first element of the array.
  */	
	getArrayIndexed:function(a,value,field) {
		if (a[0][field]==null) return a[0];
		var i=0;
		while ((value>a[i][field])&&(i!=a.length-1)) i++;
		return a[i];
	},
	
			
  /**
  * Converts a quantity of frames into a timestamp formatted "mm:ss:cs" (minutes, seconds, centiseconds). Calculated using the current frames per second.
  * @param {Integer} frames A quantity of frames.
  * @returns A string containing a timestamp formatted "mm:ss:cs", representing the length of time it would take to render that many frames.
  * @example
  * // Assuming 25 frames per second, Akihabara's default.
  * timestamp = help.framestotime(25);
  * timestamp; // => '00:01:00';
  * timestamp = help.framestotime(25 * 60);
  * timestamp; // => '01:00:00';  
  */	
	framestotime:function(frames) {
		var csec=Math.ceil(frames/gbox.getFps()*100);
		return this.prepad((Math.floor(csec/6000)%60),2,"0")+":"+this.prepad((Math.floor(csec/100)%60),2,"0")+":"+this.prepad(csec%100,2,"0");
		
	},
	
  /**
  * Reads the value of a query parameter from the URL of the web page. 
  * @param {String} name The name of the URL parameter.
  * @returns The value of the URL parameter, as a string.
  * @example
  * // If the URL is http://example.com/game.html?lives=3
  * player.lives = help.geturlparameter("lives");
  * player.lives; // => 3
  */	
	geturlparameter:function( name ) {
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
		return "";
	  else
		return results[1];
	},
	
  /**
  * Writes the contents of an object to a string. Useful for debugging.
  * @param {Object} Any object.
  * @returns A string containing all the contents of an object. If the object contains functions, the string will contain the code for those functions.
  */	
	objToStr:function(o) {
		var ret="";
		for (var n in o) ret+=n+":["+o[n]+"] ";
		return ret;
	},
	
  /**
  * Tests whether an object contains a given parameter.
  * @param {Object} A reference to a parameter of an object.
  * @returns True if the object contains that parameter, false if it does not.
  * @example
  * foo = {a: 1, b: 2};
  * help.isDefined(foo.a); // => true
  * help.isDefined(foo.c); // => false
  */	
	isDefined:function(v) {
		return ((typeof(v) !== 'undefined') || (v===null));
	},
	
  /**
  * Automatically configures a bunch of settings depending on the web browser and device that is viewing the game. Mostly sets the maximum number of audio channels and touch settings.
  */	
	getDeviceConfig:function() {
		var cap;
		if (navigator.userAgent.match(/nintendo wii/i))
			cap={iswii:true,height:window.innerHeight,doublebuffering:true} // Simulated double buffering has been resumed. Canvas on Opera for Wii has a strange sprite blinking effect - usually browsers render frames once ended and this is an exception.
		else if (navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/Android/i))
			cap={touch:true,width:320};			
		else if (navigator.userAgent.match(/iPad/i))
			cap={touch:true,width:768,forcedidle:10}; // Forced idle time is needed for correct framerate calculation.
		else
			cap={zoom:2};
		 
		return cap;
	},

  /**
  * This provides a number of configurations: fps, display zoom, dynamic frameskip, force touch parameters, etc. Many of these settings can
  * be set manually by passing an object with the parameters defined, or via URL parameters.
  * @param {Object} data An optional object containing parameters you wish to set. Works for data.zoom, data.splash, data.width, data.height, data.title, data.fps, and data.padmode.
  */	
	akihabaraInit:function(data) {
		if ((typeof data).toLowerCase() == "string") data={title:data};
		var device=this.getDeviceConfig();
		var footnotes=["MADE WITH AKIHABARA (C)2010 - GPL2/MIT","Project: www.kesiev.com/akihabara","Sources: github.com/kesiev/akihabara"];
		document.title=(data.title?data.title:"Akihabara");
		if (data.splash) {
			if (data.splash.footnotes) 
				for (var i=0;i<footnotes.length;i++) data.splash.footnotes.push(footnotes[i]);
			gbox.setSplashSettings(data.splash);
		}
		var screenwidth=(data.width?data.width:(data.portrait?240:320));
		//console.log("screenwidth = " + data.width);
		var screenheight=(data.height?data.height:(data.portrait?320:240));
//		if (device.iswii) {
//			gbox._keymap={
//				left:175,
//				right:176,
//				up:177,
//				down:178,
//				a:173,
//				b:172,
//				c:13
//			};
//			if(typeof(closedragmove)=='undefined')
//			document.onkeypress= function(e){ if (e.preventDefault) e.preventDefault(); return false};
//		}
		if (!data.splash||(data.splash.minilogo==null)) gbox.setSplashSettings({minilogo:"logo"});
		if (!data||!data.hardwareonly) {
			document.body.style.backgroundColor="#000000";
			gbox.setScreenBorder(false);
		}
		if (help.geturlparameter("statusbar")) gbox.setStatusBar(1);
		if (help.geturlparameter("db")||device.doublebuffering) gbox.setDoubleBuffering(true);
		if (help.geturlparameter("noautoskip")) gbox.setAutoskip(null);
		if (help.geturlparameter("zoom")) gbox.setZoom(help.geturlparameter("zoom")); else
	     	if (help.isDefined(data.zoom)) gbox.setZoom(data.zoom); else
			if (help.isDefined(device.zoom)) gbox.setZoom(device.zoom); else
			if (help.isDefined(device.width)) gbox.setZoom(device.width/screenwidth); else
			if (help.isDefined(device.height)) gbox.setZoom(device.height/screenheight);
			
		if (help.geturlparameter("fps")) gbox.setFps(help.geturlparameter("fps")*1);
			else gbox.setFps((data.fps?data.fps:25));
		if (help.geturlparameter("fskip")) gbox.setFrameskip(help.geturlparameter("fskip"));
		if (help.geturlparameter("forcedidle")) gbox.setForcedIdle(help.geturlparameter("forcedidle")*1);
			else if (help.isDefined(device.forcedidle)) gbox.setForcedIdle(device.forcedidle);
		if (!data||!data.hardwareonly) gbox.initScreen(screenwidth,screenheight);
 
		if (help.geturlparameter("showplayers")) gbox.setShowPlayers(help.geturlparameter("showplayers")=="yes");
	
			
		return device;
	}
}

/**
 * @namespace Tool module provides simple developing tools. Currently, this file only has a cel-composer: 
 * it can compose an image stacking a set of frames for animating objects, applying a 
 * number of filters to each frame.
 */
var tool={
	_images:[],
	_loadedflag:[],
	_data:{},
	_count:0,
	_countloaded:0,


	/**
	 * This function devide the poly given to segments 
	 * @param {Array} poly the poly given (array of points)
	 * @returns {Array} An array of segments in order of points in the poly
	 */ 
	resolvePoly:function(poly) {
		var segments = [];
		for(var i in poly)
		{
			if(i<poly.length-1)
				segments.push([poly[i],poly[i+1]]);
			else if(i==poly.length-1)
				segments.push([poly[i],poly[0]]);
		}
		return segments;
	},

	/**
	 * This function judge the point is or isn't in the poly given 
	 * @param {Array} poly the poly given (array of points) (PS:poly is the position to the point[0,0] not to the object [0,0])
	 * @param {Array} point the point request to judge
	 * @returns {Boolean} result of judgement
	 */ 
	pointInPoly:function(point,poly)
	{
		cn = 0;
		pts = poly.slice();
		pts.push([poly[0][0], poly[0][1]]);
		for (var i=0; i<poly.length; i++)
			if (((pts[i][1] <= point[1]) && (pts[i+1][1] > point[1])) || ((pts[i][1] > point[1]) && (pts[i+1][1] <= point[1])))
				if (point[0] < pts[i][0] + (point[1] - pts[i][1]) / (pts[i+1][1] - pts[i][1]) * (pts[i+1][0] - pts[i][0]))
		cn += 1;
		return cn % 2;
	},

	/**
	* This function documents that an image in an animation sequence is loaded and checks if the other images are loaded or not
	* @param {Object} id This is the object which is used as an id for keeping track of things related to this object in this function
	*/
	_loaded:function(id) {
		this._loadedflag[id]=true;
		tool._countloaded++;
		document.title=tool._countloaded+"/"+tool._count;
		for (var i=0;i<this._images.length;i++)
			if (!this._loadedflag[i]) document.title+=this._images[i].src+", ";
	},
	loadXmlFile:function(xmlFile){
  	var xmlDom = null;
  	if (window.ActiveXObject){
    	xmlDom = new ActiveXObject("Microsoft.XMLDOM");
    //xmlDom.loadXML(xmlFile);//如果用的是XML字符串
    	xmlDom.load(xmlFile);//如果用的是xml文件。
  	}else if (document.implementation && document.implementation.createDocument){
    	var xmlhttp = new window.XMLHttpRequest();
    	xmlhttp.open("GET", xmlFile, false);
    	xmlhttp.send(null);
    	xmlDom = xmlhttp.responseXML;
  	}else{
  	  xmlDom = null;
  	}
  	return xmlDom;
	},
	loadXMLDoc:function (dname) 
	{
		var xmlDoc;
		try //Internet Explorer
  		{
  			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  		}
		catch(e)
  		{
  			try{
  				var oXmlHttp = new XMLHttpRequest();
  				oXmlHttp.open( "GET", dname, false );
  				oXmlHttp.send(null) ;
  				
  				return oXmlHttp.responseXML;
  				}catch(e){
  					
	  					try //Firefox, Mozilla, Opera, etc.
	    				{
	    				xmlDoc=document.implementation.createDocument("","",null);
	    				}
  						catch(e) {/*alert(e.message)*/}
  			}
  		}
		try 
  		{
  			xmlDoc.async=false;
  			xmlDoc.load(dname);
  			return(xmlDoc);
  		}
		catch(e) {/*alert(e.message)*/}
		return(null);
	},



	/**
	* This checks that everything being kept track of with _count is loaded and depending on the result calls 
	*/
	_loadall:function() {
		if (tool._count!=tool._countloaded)
			setTimeout(tool._loadall,1000);
		else
			tool._allloaded();
	},
	
	/**
	* This makes the image cells for an animation and adds the load event listeners that the other stuff work to them. Calls loadall at the end.
	* @param {Object} data This is the created animation data being passed in to be used by the function.
	*/
	makecels:function(data) {
		this._data=data;
		var id=0;
		for (var r=0;r<data.rows.length;r++) {
			for (var i=0;i<data.rows[r].length;i++) {
				this._images[id]=new Image();
				gbox.addEventListener(this._images[id],'load', function(){tool._loaded(this.id)});
				this._images[id].setAttribute("id",id);
				this._images[id].src=data.rows[r][i].img;
				this._count++;
				id++;
			}
		}
		this._loadall();
	},
	
	/**
	* @function
    * Creates and initializes the Canvas element. Is called from makecels. This function requires that this._data have been instantiated prior to function call.
	*/
	_allloaded:function() {
		var data=this._data;
		var wid=0;
		var hei=0;
		var curwid=0;
		var id=0;
		for (var r=0;r<data.rows.length;r++) {
			hei+=this._images[id].height*1;
			curwid=0;
			for (var i=0;i<data.rows[r].length;i++) { curwid+=this._images[id].width*1; id++}
			if (wid<curwid) wid=curwid;
		}
		
		var cels=document.createElement("canvas");
		cels.style.border="1px solid red";
		cels.setAttribute('height',hei);
		cels.setAttribute('width',wid);
		document.body.appendChild(cels);
		var ctx=cels.getContext("2d");
	
		var curx=0;
		var cury=0;
		id=0;
		for (var r=0;r<data.rows.length;r++) {
			curx=0;
			for (var i=0;i<data.rows[r].length;i++) {
				ctx.drawImage(this._images[id],curx,cury);
				if (data.rows[r][i].filter) {
					if (data.rows[r][i].filter) {
						var imgd = ctx.getImageData(curx, cury, this._images[id].width, this._images[id].height);
						var pix = imgd.data;

						// Loop over each pixel and invert the color.
						for (var z = 0, n = pix.length; z < n; z += 4) {
							if (data.rows[r][i].filter.replace) {
								for (var w=0;w<data.rows[r][i].filter.replace.length;w++) {
									
									repl=data.rows[r][i].filter.replace[w].from;
									to=data.rows[r][i].filter.replace[w].to;
									if ((pix[z]==repl.r)&&(pix[z+1]==repl.g)&&(pix[z+2]==repl.b)&&(pix[z+3]==repl.a)) {
										pix[z  ] = to.r;
										pix[z+1] = to.g;
										pix[z+2] =to.b;
										pix[z+3] =to.a;
									}
								}
							}
							if (data.rows[r][i].filter.color&&(pix[z+3]!=0)) {
								pix[z  ] = data.rows[r][i].filter.color.r;
								pix[z+1] = data.rows[r][i].filter.color.g;
								pix[z+2] =data.rows[r][i].filter.color.b;
								pix[z+3] =data.rows[r][i].filter.color.a;
							}
							
							// i+3 is alpha (the fourth element)
						}
						ctx.putImageData(imgd, curx, cury);
					
					}
				}
				curx+=this._images[id].width*1;
				id++;
			}
			cury+=this._images[id-1].height*1;
		}
		
	},
	
	createImage : function(x,y,name){
		this.x = x;
		this.y = y;
		this.name = name;
	}

}
