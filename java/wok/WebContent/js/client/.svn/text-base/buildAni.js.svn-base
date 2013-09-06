/*
 *  建筑动画实力类
 *  author:张建民
 */
var build_upLevel1 = new function()
{
	this.id = "build_upLevel1";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";	
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt1 ========== " + this.anim.action["buildUpLevel"].cnt);
			
			if(this.anim.action["buildUpLevel"].cnt == 0){
				console.log("frames.length1 ========== " + this.anim.action["buildUpLevel"].frames.length);
			}
			
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel2 = new function()
{
	this.id = "build_upLevel2";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt2 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};

var build_upLevel3 = new function()
{
	this.id = "build_upLevel3";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt3 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel4 = new function()
{
	this.id = "build_upLevel4";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt4 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel5 = new function()
{
	this.id = "build_upLevel5";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt5 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel6 = new function()
{
	this.id = "build_upLevel6";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt6 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel7 = new function()
{
	this.id = "build_upLevel7";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt7 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel8 = new function()
{
	this.id = "build_upLevel8";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt8 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel9 = new function()
{
	this.id = "build_upLevel9";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt9 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel10 = new function()
{
	this.id = "build_upLevel10";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt10 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel11 = new function()
{
	this.id = "build_upLevel11";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt11 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel12 = new function()
{
	this.id = "build_upLevel12";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt12 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel13 = new function()
{
	this.id = "build_upLevel13";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt13 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel14 = new function()
{
	this.id = "build_upLevel14";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt14 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel15 = new function()
{
	this.id = "build_upLevel15";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt15 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel16 = new function()
{
	this.id = "build_upLevel16";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt16 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel17 = new function()
{
	this.id = "build_upLevel17";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt17 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel18 = new function()
{
	this.id = "build_upLevel18";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt18 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel19 = new function()
{
	this.id = "build_upLevel19";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt19 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel20 = new function()
{
	this.id = "build_upLevel20";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt20 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel21 = new function()
{
	this.id = "build_upLevel21";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt21 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel22 = new function()
{
	this.id = "build_upLevel22";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt22 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel23 = new function()
{
	this.id = "build_upLevel23";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
		this.anim.action["buildUpLevel"].cnt = 0;
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt23 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel24 = new function()
{
	this.id = "build_upLevel24";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt24 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel25 = new function()
{
	this.id = "build_upLevel25";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt25 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);
		}
			//this.frame = help.decideFrameOnce(this.action);
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};
var build_upLevel26 = new function()
{
	this.id = "build_upLevel26";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt26 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);

		}
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};

var build_upLevel27 = new function()
{
	this.id = "build_upLevel27";
	this.group = 'level_2';
	this.tileset = "buildUpLevel";		
	this.x = 0;
	this.y = 0;
	this.poly = [[], [], [], []];
	this.isVisible = true;
	this.frame = 0;
	this.action = null;
	this.anim = buildUpLevel;
	
	this.initialize = function()
	{
		AnimMgr.changeAction(this, this.anim.action["buildUpLevel"]);
	};
	
	this.first = function()
	{
		if(this.aniFinished())
			this.isVisible = false;
	};
	
	this.myclick = function()
	{
	};
	
	this.aniFinished = function()
    {
		isFinished = AnimMgr.isActionFinished(this.anim.action["buildUpLevel"]);
	    return isFinished;
	};		
	
	this.move = function(offsetX, offsetY)
	{
		this.x = offsetX;
		this.y = offsetY;
	};
	
	this.blit = function()
	{
		this.anim.image = "buildUpLevel";
		if(this.isVisible)
		{
			console.log("AniCnt27 ========== " + this.anim.action["buildUpLevel"].cnt);
			var data = 
			{
				tileset : "buildUpLevel",
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,			
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = help.decideFrame(this.action);

		}
	};
	
	this.clearGroup = function()
	{
		this.anim.action["buildUpLevel"].cnt = 0;
	};
	
	this.setLastFrame = function()
	{
	    if(this.aniFinished()){
		    this.anim.action["buildUpLevel"].cnt = this.anim.action["buildUpLevel"].frames.length;
		    this.frame = this.anim.action["buildUpLevel"].frames[this.anim.action["buildUpLevel"].frames.length - 1];
		}
	};
};