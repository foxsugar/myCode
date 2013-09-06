/*
	* 基准点变形类
	* author:张建民
*/
function util(){
    var ctx;
    var img;
    var IMG_SRC;
    var interval;
    var pressed;
    
    function Transform(){
        //获取画布对象
        this.ctx = document.getElementById("canvas1").getContext("2d");
        //创建图像对象
        this.img=new Image();
        //指定图像源
        this.img.src=IMG_SRC;
        this.interval = null;
        //鼠标按钮状态
        this.pressed=false;
        this.init();
    }
    
    var delta;
    //初始化图形
    Transform.prototype.init=function(){
        //鼠标按钮状态
        this.pressed=false;
        //停止计时器
        if(this.interval) clearInterval(this.interval);
        //变化值
        this.delta = 0.06;
        //清空
        this.ctx.clearRect(0,0,250,300);
        //重绘
        this.paint();
    }
    
    var that;
    //绘制图像
    Transform.prototype.paint=function(){
        var that=this;
        var img=this.img
        if(img.complete)
            that.ctx.drawImage(img,0,0);
        else 
            var interval = setInterval(function(){
                if(img.complete){
                    that.ctx.drawImage(img,0,0);
                    clearInterval(interval);
                }
            },300);
    }
    
    var dx = 0;
    var dy = 0;
    var startx = 0;
    var starty = 0;
    var sc = 0;
    var angle = 0;
    
    //鼠标按钮按下后，开始变形
    Transform.prototype.transform = function(){
        //获取基准点
        this.dx=event.offsetX;
        this.dy=event.offsetY;
        //获取基准点
        this.startx=event.offsetX;
        this.starty=event.offsetY;
        //初始缩放比例
        this.sc=1;
        //初旋转角度
        this.angle=0;
        
        var that=this;
        if(document.getElementById("r1").checked)
            //鼠标按钮状态
            this.pressed=true;
        else if(document.getElementById("r2").checked)
            this.interval = setInterval(function(){that.scale()},50);
        else if((document.getElementById("r3").checked))
            this.interval = setInterval(function(){that.rotate()},50);
        else 
            this.interval = setInterval(function(){that.scaleAndRotate()},50);
    }
    
    var ddx = 0;
    var ddy = 0;
    
    //移动
    Transform.prototype.translate = function(){
        this.ddx=event.offsetX-this.startx;
        this.ddy=event.offsetY-this.starty;
        if(this.pressed){
            //清空
            this.ctx.clearRect(0,0,250,300);
            //保存状态
            this.ctx.save();
            //平移
            this.ctx.translate(this.ddx,this.ddy);
            //重绘
            this.paint();
            //绘制基准点
            this.ctx.fillStyle="red";
            this.ctx.fillRect(this.dx-5,this.dy-5,10,10);
            //恢复状态
            this.ctx.restore();
        }
    }
    
    
    //缩放变形
    Transform.prototype.scale = function(){
        //清空
        this.ctx.clearRect(0,0,250,300);
        //改变缩放比例
        this.sc=this.sc - this.delta;
        if(this.sc<0.2 || this.sc>2) 
            this.delta = -this.delta;
        //保存状态
        this.ctx.save();
        //以 (dx,dy) 为基准点进行 (sx,sy)比例缩放：transform(sx, 0, 0, sy, dx(1-sx), dy(1-sy))
        this.ctx.transform(this.sc, 0, 0, this.sc, this.dx*(1-this.sc), this.dy*(1-this.sc))
        //用新的变形矩阵重绘
        this.paint();
        //绘制基准点
        this.ctx.fillStyle="red";
        this.ctx.fillRect(this.dx-5,this.dy-5,10,10);
        //恢复状态
        this.ctx.restore();
    }
    
    var PI = 0;
    //旋转变形
    Transform.prototype.rotate = function(){
        //清空
        this.ctx.clearRect(0,0,250,300);
        //改变缩放比例
        var PI = Math.PI;
        this.angle=this.angle + PI/60;
        //保存状态
        this.ctx.save();
        //以 (dx,dy) 为基准点旋转角度 A：transform(cosA, sinA, -sinA, cosA, dx(1-cosA) + dysinA, dy(1-cosA) - dxsinA)
        this.ctx.transform(Math.cos(this.angle), Math.sin(this.angle), 
                -Math.sin(this.angle), Math.cos(this.angle), 
                this.dx*(1-Math.cos(this.angle)) + this.dy*Math.sin(this.angle), 
                this.dy*(1-Math.cos(this.angle)) - this.dx*Math.sin(this.angle))
        //用新的变形矩阵重绘
        this.paint();
        //绘制基准点
        this.ctx.fillStyle="red";
        this.ctx.fillRect(this.dx-5,this.dy-5,10,10);
        //恢复状态
        this.ctx.restore();
    }
    
    //即缩放又旋转变形,没有使用变形矩阵
    Transform.prototype.scaleAndRotate = function(){
        //清空
        this.ctx.clearRect(0,0,250,300);
        //改变缩放比例
        this.sc=this.sc - this.delta;
        if(this.sc<0.2 || this.sc>2) 
            this.delta = -this.delta;
        var PI = Math.PI;
        this.angle=this.angle + PI/60;
        //保存状态
        this.ctx.save();
        //先移动原点到基点
        this.ctx.translate(this.dx,this.dy);
        this.ctx.scale(this.sc,this.sc);
        this.ctx.rotate(this.angle);
        this.ctx.translate(-this.dx,-this.dy);
        //用新的变形矩阵重绘
        this.paint();
        //绘制基准点
        this.ctx.fillStyle="red";
        this.ctx.fillRect(this.dx-5,this.dy-5,10,10);
        //恢复状态
        this.ctx.restore();
    }
    
    var trans = new Transform();
    
    //==========================================
    var pos_x = 0;
    var pos_y = 0;
    var radius = 0;
    var w = 0;
    var h = 0;
    function Clip(){
        var canvas = document.getElementById("canvas3");
        this.ctx = canvas.getContext("2d");
        this.img=new Image();
        this.img.src=IMG_SRC;
        //移动方向
        this.delta=[3,3];
        //起始点
        this.pos_x = 225;
        this.pos_y = 120;
        //半径
        this.radius = 40;
        //画布的长和宽
        this.w = parseInt(canvas.getAttribute("width"));
        this.h = parseInt(canvas.getAttribute("height"));
    }
    
    Clip.prototype.draw1=function(){
        //碰撞检测
        if (this.pos_x < this.radius) {
            this.delta[0] = Math.random() % 4 + 5;
        } else if (this.pos_x > this.w - this.radius) {
            this.delta[0] = -(Math.random() % 4 + 5);
        }
        if (this.pos_y < this.radius) {
            this.delta[1] = Math.random() % 4 + 5;
        } else if (this.pos_y > this.h - this.radius) {
            this.delta[1] = -(Math.random() % 4 + 5);
        }
        this.pos_x += this.delta[0];
        this.pos_y += this.delta[1];

        this.ctx.clearRect(0, 0, this.w, this.h);
        //保存状态
        this.ctx.save()
        //移动变形
        this.ctx.translate(this.pos_x,this.pos_y);
        //设置裁剪区域
        this.ctx.beginPath();
        this.ctx.arc(0 ,0,this.radius,0,Math.PI*2,true);
        this.ctx.clip();         
        // 将图片画到画布上
        this.ctx.drawImage(this.img, -this.pos_x, -this.pos_y,this.w, this.h);
        //恢复状态
        this.ctx.restore();
    }
    
    Clip.prototype.draw2=function(){
        //碰撞检测
        if (this.pos_x < this.radius) {
            this.delta[0] = Math.random() % 4 + 5;
        } else if (this.pos_x > this.w - this.radius) {
            this.delta[0] = -(Math.random() % 4 + 5);
        }
        if (this.pos_y < this.radius) {
            this.delta[1] = Math.random() % 4 + 5;
        } else if (this.pos_y > this.h - this.radius) {
            this.delta[1] = -(Math.random() % 4 + 5);
        }
        this.pos_x += this.delta[0];
        this.pos_y += this.delta[1];

        this.ctx.clearRect(0, 0, this.w, this.h);
        //绘制灰色的半透明蒙版
        this.ctx.fillStyle="rgba(125,125,125,0.9)"
        this.ctx.fillRect(0, 0, this.w, this.h);
        //保存状态
        this.ctx.save()
        //移动坐标
        this.ctx.translate(this.pos_x,this.pos_y);
        //裁剪透明的圆形区域
        this.ctx.globalCompositeOperation = "xor";   
        this.ctx.fillStyle="white"
        this.ctx.beginPath();
        this.ctx.arc(0 ,0,this.radius,0,Math.PI*2,true);
        this.ctx.fill();       
        // 将图片画到蒙版的下面，即只露出透明区域
        this.ctx.globalCompositeOperation = "destination-over";   
        this.ctx.drawImage(this.img, -this.pos_x, -this.pos_y,this.w, this.h);
        //恢复状态
        this.ctx.restore();
    }

    var cl=new Clip();
    cl.interval=null;
    
    function move(id){      
        if(cl.interval)
            clearInterval(cl.interval)
        if(id==1){
            cl.ctx.clearRect(0, 0, 450, 300);    
            cl.interval=setInterval(function(){cl.draw1()},20);
        }
        else{
            cl.ctx.clearRect(0, 0, 450, 300);    
            cl.interval=setInterval(function(){cl.draw2()},20);
        }
    }

    function stop(){
        clearInterval(cl.interval)
    }
    
    var compositeTypes = [
        'source-over','source-in','source-out','source-atop',
        'destination-over','destination-in','destination-out','destination-atop',
        'lighter','darker','copy','xor'
    ];
    function drawComp(){
        for (i=0;i<compositeTypes.length;i++){
            var label = document.createTextNode(compositeTypes[i]);
            document.getElementById('lab'+i).appendChild(label);
            var ctx = document.getElementById('tut'+i).getContext('2d');

            // draw rectangle
            ctx.fillStyle = "#09f";
            ctx.fillRect(15,15,70,70);

            // set composite property
            ctx.globalCompositeOperation = compositeTypes[i];

            // draw circle
            ctx.fillStyle = "#f30";
            ctx.beginPath();
            ctx.arc(75,75,35,0,Math.PI*2,true);
            ctx.fill();
        }
    }
    drawComp();
}
