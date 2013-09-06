/*
 * 战场命名空间
 */
var battlefield = {
	backgroundImage : "zc_tb_98",//战场背景图
	groupId : "battlefield"//gbox所需的group
};

battlefield.eventHandle = {
	
	dx : 363,//第一格偏移x
	dy : 70,//第一个偏移y
	rx : 104,//宽度半径
	ry : 35,//高度半径
	cw : 12,//x数量
	ch : 5,//y数量
	area : [],//侦听区域
	
	/*
	 * 添加侦听区域(简陋实现)
	 */
	addToArea : function(data,click){
		data.click = !!click;
		this.area.push(data);
	},
	
	createArea : function(){
		this.area = [];	
	},
	
	draw : function (){
		var ctx = gbox.getBufferContext();
		for(var i=0;i<this.ch;i++){
			for(var j=0;j<this.cw;j++){
				var coord = this.transform(j,i);
				var cx = coord.x;
				var cy = coord.y;
                ctx.beginPath();
                ctx.moveTo(cx-this.rx,cy);
                ctx.lineTo(cx,cy-this.ry);
                ctx.lineTo(cx+this.rx,cy);
                ctx.lineTo(cx,cy+this.ry);
                ctx.closePath();
                ctx.stroke();
                ctx.strokeText(j+","+i,cx,cy);
              }
		}
		if(this.selected){
			var x = this.selected.x;
			var y = this.selected.y;
		    var coord = this.transform(x,y);
		    var x = coord.x;
			var y = coord.y;
			var img = gbox.getImage("zc_tb_25");
			var ctx = gbox.getBufferContext();
			if(img){
				ctx.drawImage(img,x-this.rx,y-this.ry);
			}
		}
	},
	
	onmousemove : function(e){
		var offset = $("#canvas").offset();
	    var cx = e.pageX - offset.left;
	    var cy = e.pageY - offset.top;
	    var area = battlefield.eventHandle.area;
	    for(var i=0;i<area.length;i++){
	    	var el = area[i];
	    	if(el instanceof Array){
	    		for(var j=0;j<el.length;j++){
	    			var obj = el[j];
	    			if(obj.hitTest(cx,cy)){
	    				if(obj.onmouseover){
	    					obj.onmouseover();
	    				}
	    				return obj;
	    			}else{
	    				if(obj.onmouseout){
	    					obj.onmouseout();
	    				}
	    			}
	    		}
	    	}
	    }
		var coord = battlefield.eventHandle.getIndex(cx,cy);
		var x = coord.x;
		var y = coord.y;
		if(0<=x&&x<5&&0<=y&&y<5 || 7<=x&&x<12&&0<=y&&y<5){
			var s = battlefield.eventHandle.selected;
			if(!s || s.x!=x || s!=y){
				battlefield.topUI.updateTarget(x,y);
			}
			battlefield.eventHandle.selected = coord;
		}else{
			battlefield.eventHandle.selected = null;
		}
	},
	
	onmousedown : function(e){
		var offset = $("#canvas").offset();
	    var cx = e.pageX - offset.left;
	    var cy = e.pageY - offset.top;
	    var area = battlefield.eventHandle.area;
	    for(var i=0;i<area.length;i++){
	    	var el = area[i];
	    	if(!el.click){
	    		continue;
	    	}
	    	if(el instanceof Array){
	    		for(var j=0;j<el.length;j++){
	    			var obj = el[j];
	    			if(obj.hitTest(cx,cy)){
	    				if(obj.onmousedown){
	    					obj.onmousedown();
	    				}
	    				return obj;
	    			}
	    		}
	    	}
	    }
	    var coord = battlefield.eventHandle.selected;
	    if(coord){
	    	coord.isDown = true;
	    }
	},
	
	onmouseup : function(e){
		var offset = $("#canvas").offset();
	    var cx = e.pageX - offset.left;
	    var cy = e.pageY - offset.top;
	    var area = battlefield.eventHandle.area;
	    for(var i=0;i<area.length;i++){
	    	var el = area[i];
	    	if(!el.click){
	    		continue;
	    	}
	    	if(el instanceof Array){
	    		for(var j=0;j<el.length;j++){
	    			var obj = el[j];
	    			if(obj.hitTest(cx,cy)){
	    				if(obj.onmouseup){
	    					obj.onmouseup();
	    				}
	    				return obj;
	    			}
	    		}
	    	}
	    }
	    var coord = battlefield.eventHandle.selected;
	    if(coord && coord.isDown){
	    	var obj = battlefield.anims.get(coord.x,coord.y);
	    	if(obj && obj.soldier && obj.select){
	    		obj.select.onclick(obj.soldier.locationId);
	    	}
	    }
	},
	
	transform : function (x,y){
        return {x:(x-y)*this.rx+this.dx,y:(x+y)*this.ry+this.ry +this.dy};
    },

    inverseTransform : function (cx,cy){
        return {x:((cx-this.dx)/this.rx+(cy-this.ry-this.dy)/this.ry)/2,y:((cy-this.ry-this.dy)/this.ry-(cx-this.dx)/this.rx)/2};
    },
    
    getIndex : function (cx,cy){
    	var coord = this.inverseTransform(cx,cy);
        return {x:Math.floor(coord.x+0.5),y:Math.floor(coord.y+0.5)};
    },
    
};
