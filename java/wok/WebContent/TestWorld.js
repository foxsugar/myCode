/**
 * Created with JetBrains WebStorm.
 * User: xuzhongxing
 * Date: 13-6-14
 * Time: 下午1:40
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function(){
	User.initWorld(draw);
});

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var screenx = 1440;
var screeny = 742;
var cellWidth = 200;
var cellHeight = 100;
var dis  = 400;
var startx = 0;
var starty = 0;
var bx,by,ex,ey;
function draw (data){
	//test
		bx = data.bx;
		by = data.by;
		ex = data.ex;
		ey = data.ey;
	//end test~
	var cityX = data.cityX;
	var cityY = data.cityY;
	var imgs = data.image;
	var cities = eval(data.cityData);
	if(startx === 0){
		startx = cityX - screenx/2 - dis;
	}
	if(starty ===0){
		starty = cityY - screeny/2 - dis;
	}
	ctx.strokeStyle="rgba(255,0,0,.618)";
	for(var i=0;i<imgs.length;i++){
	    var obj = imgs[i];
	    var img = new Image();
	    img.src = "images/worldMap/"+obj.b+".jpg";
		img.coord_x = obj.x*cellWidth-startx;
		img.coord_y = obj.y*cellHeight-starty;
    	img.onload=function(){
		 ctx.drawImage(this,this.coord_x,this.coord_y);
		 ctx.strokeRect(this.coord_x,this.coord_y,this.width,this.height);
		}
	}
	setTimeout(function(){
			for(var i=0;i<cities.length;i++){
	    		var arr = cities[i];
	    		var img = new Image();
	    		if(arr[0] == 1){
	    		 	img.src = "images/worldMap/cityPoint.png";
	    		}else if(arr[0] == 3){
	    			img.src = "images/worldMap/"+arr[6]+"_l.png";
	    		}else if(arr[0] == 4){
	    		 	img.src = "images/worldMap/"+arr[4]+".png";
	    		}else if(arr[0] == 5){
	    			img.src = "images/worldMap/sjdt_zjm_31.png";
	    		}else if(arr[0] == 6 || arr[0] == 7 ){
	    			img.src = "images/worldMap/"+arr[5]+".png";
	    		}else{
	    			img.src =  "images/worldMap/circle1.png";
	    		}
		        img.coord_x = getCx(arr[1],arr[2])-startx;
		        img.coord_y = getCy(arr[1],arr[2])-starty;
	        	 img.onload=function(){
	       			 ctx.drawImage(this,this.coord_x-this.width/2,this.coord_y-this.height/2);
	          	 }
	   		 }
		 }
		 ,300);
		 setTimeout(function(){
			ctx.strokeStyle="black";
			ctx.strokeRect(dis+2,dis+2,1440,742);
			ctx.moveTo(dis+2,dis+2);
			ctx.lineTo(dis+1440,dis+742);
			ctx.moveTo(dis+1440,dis+2);
			ctx.lineTo(dis+2,dis+742);
			ctx.stroke();
			bx = bx - startx;
			by = by - starty;
			ex = ex - startx;
			ey = ey - starty;
			ctx.strokeStyle="yellow";
			ctx.moveTo(bx,by);
			ctx.lineTo(0,bx/2+by);
			ctx.moveTo(bx,by);
			ctx.lineTo(c.width,(c.width-bx)/2+by);
			ctx.moveTo(ex,ey);
			ctx.lineTo(0,ey-ex/2);
			ctx.moveTo(ex,ey);
			ctx.lineTo(c.width,ey-(c.width-ex)/2);
			ctx.stroke();
		}
		,400);
 }
 
 function dis1(){
 	var x = document.getElementById("x").value;
 	var y = document.getElementById("y").value;
 	startx += parseInt(x);
 	starty += parseInt(y);
 	ctx.fillStyle="white";
 	ctx.fillRect(0,0,c.width,c.height);
 	User.getWorldData(startx+dis,starty+dis,draw);
 }

function getCx(x,y){
	return (x-y)*50+32800;
}
	
function getCy(x,y){
	return (x+y+1)*25;
}