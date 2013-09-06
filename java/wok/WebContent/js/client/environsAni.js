/*
 *  城郊动画实力类
 */
var food0 = new function()
	{
		this.id = "food0";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food1 = new function()
	{
		this.id = "food1";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food2 = new function()
	{
		this.id = "food2";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food3 = new function()
	{
		this.id = "food3";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food4 = new function()
	{
		this.id = "food4";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food5 = new function()
	{
		this.id = "food5";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food6 = new function()
	{
		this.id = "food6";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food7 = new function()
	{
		this.id = "food7";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food8 = new function()
	{
		this.id = "food8";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food9 = new function()
	{
		this.id = "food9";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food10 = new function()
	{
		this.id = "food10";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var food11 = new function()
	{
		this.id = "food11";
		this.group = 'environsScreen';
		this.tileset = "foodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = foodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["foodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["foodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			
			this.anim.image = "foodAni";
			if(this.isVisible)
			{
				
				var data = 
				{
					tileset : "foodAni",
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
			this.anim.action["foodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["foodAniAction"].cnt = this.anim.action["foodAniAction"].frames.length;
		    	this.frame = this.anim.action["foodAniAction"].frames[this.anim.action["foodAniAction"].frames.length - 1];
		    }
		};
	};
var wood0 = new function()
	{
		this.id = "wood0";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood1 = new function()
	{
		this.id = "wood1";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood2 = new function()
	{
		this.id = "wood2";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood3 = new function()
	{
		this.id = "wood3";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood4 = new function()
	{
		this.id = "wood4";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood5 = new function()
	{
		this.id = "wood5";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood6 = new function()
	{
		this.id = "wood6";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood7 = new function()
	{
		this.id = "wood7";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood8 = new function()
	{
		this.id = "wood8";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood9 = new function()
	{
		this.id = "wood9";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood10 = new function()
	{
		this.id = "wood10";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var wood11 = new function()
	{
		this.id = "wood11";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};

var cityLevel = new function()
	{
		this.id = "cityLevel";
		this.group = 'levelMenu_1';
		this.tileset = "cityLevel";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = cityLevel;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["cityLevelAction"]);
		};
		this.first = function()
		{
		      var zim_an_bjX;
			  var tempOffset=0;
			  if(document.body.clientWidth > 1440)
					{
					      tempOffset = 1440;
					}
			  else
					{
					     tempOffset = document.body.clientWidth;
					}
			  if(tempOffset > 1200)
				{
					zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
				}
			  else
				{
					zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
				}
			  var offsetHeigth = 0;
			  if(document.body.clientHeight > gbox.getScreenH())
			  {
			       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
			  } 
			  else
			  {
			  	   offsetHeigth = 0;
			  }
			  var tempZim_an_bjX = -50;
              var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
              this.poly  = [[zim_an_bjX + gbox.getImage("zjm_an_bj").width + tempZim_an_bjX,zim_an_bjY - (gbox.getImage("zjm_an_cssj").height-gbox.getImage("zjm_an_bj").height)],
                           [zim_an_bjX + gbox.getImage("zjm_an_bj").width + tempZim_an_bjX+ gbox.getImage("zjm_an_cssj").width + 20,zim_an_bjY],
                           [zim_an_bjX + gbox.getImage("zjm_an_bj").width + tempZim_an_bjX+ gbox.getImage("zjm_an_cssj").width + 20,(zim_an_bjY + gbox.getImage("zjm_an_cssj").height + 20)],
                           [zim_an_bjX + gbox.getImage("zjm_an_bj").width + tempZim_an_bjX,(zim_an_bjY + gbox.getImage("zjm_an_cssj").height + 20)]];
		};
		this.myclick = function()
		{
			if(canLevelup){	
			    User.maincityLevelup(doMaincityLevelup);
			}
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["cityLevelAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			 var zim_an_bjX;
			  var tempOffset=0;
			  if(document.body.clientWidth > 1440)
					{
					      tempOffset = 1440;
					}
			  else
					{
					     tempOffset = document.body.clientWidth;
					}
			  if(tempOffset> 1200)
				{
					zim_an_bjX = (tempOffset - gbox.getImage("zjm_an_bj").width)/2 + document.body.scrollLeft ;
				}
			  else
				{
					zim_an_bjX = (1200 - gbox.getImage("zjm_an_bj").width)/2;
				}
			  var offsetHeigth = 0;
			  if(document.body.clientHeight > gbox.getScreenH())
			  {
			       offsetHeigth = document.body.clientHeight - gbox.getScreenH();
			  } 
			  else
			  {
			  	   offsetHeigth = 0;
			  }
			  var zim_an_bjY = document.body.clientHeight  - gbox.getImage("zjm_an_bj").height - offsetHeigth +  document.body.scrollTop ;
			 this.anim.image = "cityLevel";
			
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "cityLevel",
					tile : this.frame,
					dx : this.x + zim_an_bjX + gbox.getImage("zjm_an_bj").width+35 ,
				    dy : this.y + zim_an_bjY - (gbox.getImage("zjm_an_cssj").height-gbox.getImage("zjm_an_bj").height),
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
			this.anim.action["cityLevelAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["cityLevelAction"].cnt = this.anim.action["cityLevelAction"].frames.length;
		    	this.frame = this.anim.action["cityLevelAction"].frames[this.anim.action["cityLevelAction"].frames.length - 1];
		    }
		};
	};
var stone0 = new function()
	{
		this.id = "stone0";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone1 = new function()
	{
		this.id = "stone1";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone2 = new function()
	{
		this.id = "stone2";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone3 = new function()
	{
		this.id = "stone3";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone4 = new function()
	{
		this.id = "stone4";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone5 = new function()
	{
		this.id = "stone5";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone6 = new function()
	{
		this.id = "stone6";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone7 = new function()
	{
		this.id = "stone7";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone8 = new function()
	{
		this.id = "stone8";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone9 = new function()
	{
		this.id = "stone9";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone10 = new function()
	{
		this.id = "stone10";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var stone11 = new function()
	{
		this.id = "stone11";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
	
var ferrum0 = new function()
	{
		this.id = "ferrum0";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum1 = new function()
	{
		this.id = "ferrum1";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum2 = new function()
	{
		this.id = "ferrum2";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum3 = new function()
	{
		this.id = "ferrum3";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum4 = new function()
	{
		this.id = "ferrum4";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum5 = new function()
	{
		this.id = "ferrum5";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum6 = new function()
	{
		this.id = "ferrum6";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum7 = new function()
	{
		this.id = "ferrum7";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum8 = new function()
	{
		this.id = "ferrum8";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum9 = new function()
	{
		this.id = "ferrum9";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum10 = new function()
	{
		this.id = "ferrum10";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};
var ferrum11 = new function()
	{
		this.id = "ferrum11";
		this.group = 'environsScreen';
		this.tileset = "woodAni";		
		this.x = 0;
		this.y = 0;
		this.poly = [[], [], [], []];
		this.isVisible = true;
		this.frame = 0;
		this.action = null;
		this.anim = woodAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["woodAniAction"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["woodAniAction"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x = offsetX;
			this.y = offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woodAni";
			if(this.isVisible)
			{
				var data = 
				{
					tileset : "woodAni",
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
			this.anim.action["woodAniAction"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["woodAniAction"].cnt = this.anim.action["woodAniAction"].frames.length;
		    	this.frame = this.anim.action["woodAniAction"].frames[this.anim.action["woodAniAction"].frames.length - 1];
		    }
		};
	};