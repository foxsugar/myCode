/*
* 角色类
* author:张建民
*/
function roleClass(){
	this.init = function(index,group,name,file,img,sx,sy,dnArray,stepSize,way,isCommnad){
		
		var context = this;
		this.isShow = true;
		this.group = group;
		this.name = name;
		this.file = file;
		this.image = img;
		this.vx = 0;
		this.vy = 0;
		this.sX = sx;
		this.sY = sy;
		this.srcX = this.sX;
		this.srcY = this.sY;
		this.addX = 0;
		this.addY = 0;
		this.timeCnt = 0;
		this.moveCnt = 0;
		this.moveNode = 1;
		this.stepSize = stepSize;
		this.stepNum = 0;
		this.angleValue = 0;
		this.arrayX = new Array();    
		this.arrayX[0] = 0;
		this.arrayY = new Array(); 
		this.arrayY[0] = 0;
		this.desNode = dnArray;
		this.actionWay = way;
		this.isTop = true;
		this.isBottom = false;
		this.isCommnad = isCommnad;
		this.isRun = true;
		this.rDesX = this.sX;
		this.rDesY = this.sY;
	   //改变动画
		gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
		//gbox.setRenderOrder(['establishRole','cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
//	   isDrawUI[index] = true;
	   gbox.addObject(
	   { 
			id : 'role' + context.name,
			group : context.group,
			tileset : 'zjm_jztx_1',
			x : 0,
			y : 0,
			anim : context.file,
			action : null,
			frame : 0,
			poly : [ [0,0], [0,0], [0,0],[0,0]],
			initialize : function()
			{
				AnimMgr.changeAction(this, this.anim.action[context.actionWay],true);
				AnimMgr.updatePolyWithAnim(this);
			},
			first : function() 
			{	 
				if(context.isRun)
				   context.move(); 
			},
			myclick : function()
			{
			},
			blit : function()
			{	
			  if(/*isDrawUI[index] && */context.isShow)
			  {
			  	//console.log("1111111111111111111111111");
			  	context.draw();
			  }
				
			}
		});			
    };
    this.change = function(change_way){
	 	var context = this;
		var aniObj = gbox.getObject(context.group,'role' + context.name);	
		AnimMgr.changeAction(aniObj, aniObj.anim.action["" + change_way],true);
		AnimMgr.updatePolyWithAnim(aniObj);	   	
    };
    this.aniFinished = function()
    {
    	var context = this;
    	var aniObj = gbox.getObject(context.group,'role' + context.name);   	
    	return AnimMgr.isActionFinished(aniObj.anim.action["" + this.actionWay]);
    };
    this.draw = function(){
	 	var context = this;
		var aniObj = gbox.getObject(context.group,'role' + context.name);	    			
		aniObj.anim.image = context.image;
		var data = {
			tile : aniObj.frame,
	        dx : context.sX + context.vx,
			dy : context.sY + context.vy,
			fliph : aniObj.fliph,
			flipv : aniObj.flipv,
			camera : aniObj.camera,
			alpha : 1.0,
			anim : aniObj.anim
		};
		AnimMgr.draw(gbox.getBufferContext(), data);
		aniObj.frame = help.decideFrame(aniObj.action);
		
		var rPoly = new Array(new Array());
		
		if(typeof(aniObj.poly) != "undefined"){
			rPoly = [ [data.dx + aniObj.poly[0][0],data.dy + aniObj.poly[0][1]],
		              [data.dx + aniObj.poly[1][0],data.dy + aniObj.poly[1][1]], 
		              [data.dx + aniObj.poly[2][0],data.dy + aniObj.poly[2][1]],
		              [data.dx + aniObj.poly[3][0],data.dy + aniObj.poly[3][1]]
		            ];			
		}

		
		if(typeof(rPoly) != "undefined"){
			if(gbox._mouseArea(rPoly,touchMoveX,touchMoveY)){
				gbox.drawString(context.name,data.dx,data.dy,'#FFFF00',14);
			}			
		}
		

    };
    
    this.move = function(){
	 	var context = this;
		if( (++context.timeCnt%2) == 0){
			if(Math.round(context.moveCnt) < Math.round(context.stepNum)){
					context.vx = context.arrayX[context.moveCnt];
					context.vy = context.arrayY[context.moveCnt];
					context.moveCnt++;		
			}else
			{				
			if(!context.isCommnad){
				
				if(Math.round(context.moveCnt) == Math.round(context.stepNum)){
					context.addX +=context.vx;
					context.addY +=context.vy;
					context.sX = parseInt(context.srcX + context.addX);
					context.sY = parseInt(context.srcY + context.addY);
					var dX = context.desNode[context.moveNode][0];
					var dY = context.desNode[context.moveNode][1];
		
					context.vx = 0;
					context.vy = 0;
					context.getSeekArray(context.sX,context.sY,dX,dY);
									
					if(context.moveNode < (context.desNode.length-1) && context.isTop){
						context.moveNode++;
					}else{
						context.isBottom = true;
						context.isTop = false;
					}
								   
					if(context.moveNode > 0 && context.isBottom){
						context.moveNode--;
					}else{
						context.isTop = true;
						context.isBottom = false;
					}  														   
				}
			}
			}
		}    	
    };
    
    this.setDes = function(desX,desY){
    	var context = this;
    	context.rDesX = desX;
    	context.rDesY = desY;
    };
    
    this.command = function(){
    	
    	var context = this;
    	if(context.isRun){
	    	context.addX +=context.vx;
	    	context.addY +=context.vy;	    	
	    	context.sX = parseInt(this.srcX + context.addX);
	    	context.sY = parseInt(this.srcY + context.addY);
	    	var dX = context.rDesX;
	    	var dY = context.rDesY;
	    	context.vx = 0;
	    	context.vy = 0;
	    	context.getSeekArray(context.sX,context.sY,dX,dY);
    	}
    };
   
    this.getSeekArray = function(sX, sY, dX, dY){
	 	var context = this;
	 	var dx = sX - dX;//x偏移
	 	var dy = sY - dY;//y偏移
	     var R = Math.sqrt(dx*dx+dy*dy);
	     var desX = Math.abs(dx);
	     var desY = Math.abs(dy);
	     var sin = desY/R;
	     var cos = desX/R;	     
	     context.stepNum = Math.round(R/context.stepSize);
	     for(var i=0; i<context.stepNum; i++){
	
	        var tmpR = context.stepSize*i;
		     if(dX >= sX && dY >= sY){
		     	context.actionWay = "RIGHT_DOWN";
		        context.arrayX[i] = cos * tmpR;
		        context.arrayY[i] = sin * tmpR;
		     }else if(dX <= sX && dY >= sY){
		     	context.actionWay = "LEFT_DOWN";
		        context.arrayX[i] = -cos * tmpR;
		        context.arrayY[i] = sin * tmpR;	    
		     }else if(dX <= sX && dY <= sY){
		     	context.actionWay = "LEFT_UP";
		        context.arrayX[i] = -cos * tmpR;
		        context.arrayY[i] = -sin * tmpR;	        
		     }else if(dX >= sX && dY <= sY){
		     	context.actionWay = "RIGHT_UP";
		        context.arrayX[i] = cos * tmpR;
		        context.arrayY[i] = -sin * tmpR;	        
		     }  
	     }
	     
	     context.change(context.actionWay);
	     context.moveCnt = 0;//开始移动计数器                 
	     //console.log("角度 === " + angle);   	
    };
}