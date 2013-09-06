function RectF(){
	var left = 0;
	var right = 0;
	var top = 0;
	var bottom = 0;
	var alpha = 1;
	var color = '#000000';
	//(float left, float top, float right, float bottom);	
	this.init = function( l,t,r,b,a,c ){
		this.left = l;
		this.top = t;
		this.right = r;
		this.bottom = b;
		this.alpha = a;
		this.color = c;
		//console.log("left ==== " + this.left + ", top ===== " + this.top + "right ==== " + this.right + ", bottom ===== " + this.bottom);
	}
	
	this.width = function(){
		return (this.right - this.left);
	}	
	
	this.height = function(){
		return (this.bottom - this.top);
	}
}

//这是两个函数用到的矩形对象
function Rect(x,y,width,height)
{
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
}

Rect.prototype.getX = function()
{
    return this.x;
}

Rect.prototype.getY = function()
{
    return this.y;
}

Rect.prototype.getWidth = function()
{
    return this.w;
}

Rect.prototype.getHeight = function()
{
    return this.h;
}

Rect.prototype.getLeft = function()
{
    return this.x;
}

Rect.prototype.getTop = function()
{
    return this.y;
}

Rect.prototype.getRight = function()
{
    return (this.x + this.w);
}

Rect.prototype.getBottom = function()
{
    return (this.y + this.h);
}

//----------------------------------------
