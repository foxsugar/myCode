
var HAFM_01_1_wait = new function()	//TODO
	{
		this.id = "HAFM_01_1_wait";
		this.group = 'levelMenu_2';
		this.tileset = "men_wait";		
		this.x = 300;
		this.y = 300;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = men_wait;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["men_wait"]);
		};
		this.first = function()
		{
		      
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["men_wait"]);
	    	return isFinished;
	    };
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			
			this.anim.image = "men_wait";
			var data = 
			{
				tileset : "men_wait",
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
		};
		
		this.clearGroup = function()
		{
			this.anim.action["men_wait"].cnt = 0;
		};
	};
	
	var liyuanba = new function()	//TODO
	{
		this.id = "liyuanba";
		this.group = 'levelMenu_2';
		this.tileset = "liyuanba";		
		this.x = 800;
		this.y = 300;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = liyuanba;		
		this.initialize = function()
		{
			
			AnimMgr.changeAction(this, this.anim.action["RIGHT_DOWN"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["RIGHT_DOWN"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "liyuanba";
			var data = 
			{
				tileset : "liyuanba",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["RIGHT_DOWN"].cnt = 0;
		};
	};
	
var skill_fire2 = new function()	//TODO
	{
		this.id = "skill_fire2";
		this.group = 'levelMenu_2';
		this.tileset = "skill_fire2";		
		this.x = 800;
		this.y = 300;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = common_fire;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["common"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["common"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "common_fire";
			var data = 
			{
				tileset : "skill_fire2",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["common"].cnt = 0;
		};
	};
	
var HAFF_01_2_wait = new function()	//TODO
	{
		
		this.id = "HAFF_01_2_wait";
		this.group = 'levelMenu_2';
		this.tileset = "woman_kill1";		
		this.x = 1150;
		this.y = 340;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = woman_skill1;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["kill1"]);
		};
		this.first = function()
		{
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["kill1"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woman_kill1";
			var data = 
			{
				tileset : "woman_kill1",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["kill1"].cnt = 0;
		};
	};
var woman_commonSkill = new function()	//TODO
	{
		this.id = "woman_commonSkill";
		this.group = 'levelMenu_2';
		this.tileset = "woman_commonSkill";		
		this.x = 650;
		this.y = 280;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = woman_commonSkill;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["commonSkill"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["commonSkill"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "woman_commonSkill";
			var data = 
			{
				tileset : "woman_commonSkill",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["commonSkill"].cnt = 0;
		};
	};
	
var effectAni = new function()	//TODO
	{
		this.id = "effectAni";
		this.group = 'levelMenu_2';
		this.tileset = "effectAni";		
		this.x = 950;
		this.y = 210;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = effectAni;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["effect"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["effect"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "effectAni";
			var data = 
			{
				tileset : "effectAni",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["effect"].cnt = 0;
		};
	};
	
	var effect0 = new function()
	{
		this.id = "effect0";
		this.group = 'levelMenu_2';
		this.tileset = "effect0";		
		this.x = 320;
		this.y = 350;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = effect0;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["effect0"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["effect0"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "effect0";
			var data = 
			{
				tileset : "effect0",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["effect0"].cnt = 0;
		};
	};
	
	var effect1 = new function()
	{
		this.id = "effect1";
		this.group = 'levelMenu_2';
		this.tileset = "effect1";		
		this.x = 950;
		this.y = 210;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = effect1;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["effect1"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["effect1"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "effect1";
			var data = 
			{
				tileset : "effect1",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["effect1"].cnt = 0;
		};
	};
	
	var effect2 = new function()
	{
		this.id = "effect2";
		this.group = 'levelMenu_2';
		this.tileset = "effect2";		
		this.x = 1030;
		this.y = 200;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = effect2;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["effect2"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["effect2"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "effect2";
			var data = 
			{
				tileset : "effect2",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["effect2"].cnt = 0;
		};
	};
	
	var effect3 = new function()
	{
		this.id = "effect3";
		this.group = 'levelMenu_2';
		this.tileset = "effect3";		
		this.x = 950;
		this.y = 210;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = effect3;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["effect3"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["effect3"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "effect3";
			var data = 
			{
				tileset : "effect2",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["effect3"].cnt = 0;
		};
	};
	
	var effect4 = new function()
	{
		this.id = "effect4";
		this.group = 'levelMenu_2';
		this.tileset = "effect4";		
		this.x = 950;
		this.y = 210;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = effect4;		
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["effect4"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
	    	isFinished = AnimMgr.isActionFinished(this.anim.action["effect4"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "effect4";
			var data = 
			{
				tileset : "effect2",
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
		};
		this.clearGroup = function()
		{
			this.anim.action["effect4"].cnt = 0;
		};
	};
	
	
	var char_loser = new function()
	{
		this.id = "char_loser";
		this.group = 'levelMenu_2';
		this.tileset = "char_loser";		
		this.x = 180;
		this.y = 290;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = char_loser;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["char_loser"]);
		};
		this.first = function()
		{
		
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished = AnimMgr.isActionFinished(this.anim.action["char_loser"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "char_loser";
			var data = 
			{
				tileset : "char_loser",
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
			//this.frame = help.decideFrameOnce(this.action);
		};
		this.clearGroup = function()
		{
			this.anim.action["char_loser"].cnt = 0;
		};
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["char_loser"].cnt = this.anim.action["char_loser"].frames.length;
		    	this.frame = this.anim.action["char_loser"].frames[this.anim.action["char_loser"].frames.length - 1];
		    }
		};
	};
	
	var defence_loser = new function()
	{
		
		this.id = "defence_loser";
		this.group = 'levelMenu_2';
		this.tileset = "defence_loser";		
		this.x = 1250;
		this.y = 300;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = defence_loser;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["defence_loser"]);
		};
		this.first = function()
		{
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished  = AnimMgr.isActionFinished(this.anim.action["defence_loser"]);
	    	return isFinished;
	    };		
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "defence_loser";
			var data = 
			{
				tileset : "defence_loser",
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
			//this.frame = help.decideFrameOnce(this.action);
		};
		this.clearGroup = function()
		{
			this.anim.action["defence_loser"].cnt = 0;
		};
		
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["defence_loser"].cnt = this.anim.action["defence_loser"].frames.length;
		    	this.frame = this.anim.action["defence_loser"].frames[this.anim.action["defence_loser"].frames.length - 1];
		    }
		};
	};	
	
var testAni = new function()
	{
		
		this.id = "testAni";
		this.group = 'levelMenu_2';
		this.tileset = "testAni";		
		this.x = 100;
		this.y = 100;
		this.isDrawAni = true;
		this.poly = [[], [], [], []];
		this.isVisible = false;
		this.frame = 0;
		this.action = null;
		this.anim = testAni;
		this.initialize = function()
		{
			AnimMgr.changeAction(this, this.anim.action["test"]);
		};
		this.first = function()
		{
		};
		this.myclick = function()
		{
		};
		this.aniFinished = function()
	    {
			isFinished  = AnimMgr.isActionFinished(this.anim.action["test"]);
	    	return isFinished;
	    };	
	    this.drawAni = function(isDraw)
	    {
	    	this.isDrawAni = isDraw;
	    };
		this.move = function(offsetX, offsetY)
		{
			this.x += offsetX;
			this.y += offsetY;
		};
		this.blit = function()
		{
			this.anim.image = "testAni";
			if(this.isDrawAni)
			{
				var data = 
				{
					tileset : "testAni",
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
			this.anim.action["test"].cnt = 0;
		};
		
		this.setLastFrame = function()
		{
		    if(this.aniFinished()){
		    	this.anim.action["test"].cnt = this.anim.action["test"].frames.length;
		    	this.frame = this.anim.action["test"].frames[this.anim.action["test"].frames.length - 1];
		    }
		};
	};	