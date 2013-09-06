var listHelpObj = null;

var initHelp = function()
{
	listHelpObj = null;

	var strHelp = "达人教学：\n\n" //
			+ "１．点击屏幕绳套扔出，套到屏幕中跑过的牛为胜利。\n\n" //
			+ "２．每次扔出绳套的时间限时为３０秒，每次扔出绳套消费１金币。计时结束仍未操作将消费１金币，绳套自动扔出。\n\n" //
			+ "３．屏幕上方有每种牛的头像及套中后对应的报酬金钱数。当前出场牛的头像下方会有箭头指示。\n\n" //
			+ "４．套中价值越高的牛，所获得的经验值也会越多。可以从屏幕下方查看当前等级已获经验。\n\n"
			+ "５．玩家经验满后等级将会提升。做为升级奖励，升级后玩家将有一回合奖励双倍的机会。此时套中牛所获得金币以及经验都享有双倍待遇，但仅限一回合。\n"
			+ "如未套中，则失去奖励回合。";
	
	var font_size = 16;
	var font_h = font_size + 4;
	var help_array = splitString(strHelp, 16, font_size, font_h);
	
	var totalPage = help_array.length;
	var curPage = 0;

	var obj_help = new function() //TODO
	{
		this.id = "obj_help";
		this.group = GROUP_HELP;
		this.tileset = "tile_help";
		this.x = SCREEN_W / 2;
		this.y = SCREEN_H / 2;

		this.poly = [[], [], [], []];

		this.frame = 0;
		this.action = null;
		this.anim = animHelp;
		this.anim.image = "img_help";

		this.initialize = function()
		{
			toys.topview.initialize(this, {});
			AnimMgr.changeAction(this, this.anim.action["help"]);
		};
		this.first = function()
		{

		};
		this.myclick = function()
		{

		};
		this.blit = function()
		{
			//背景图
			var img = gbox.getImage("img_help_bg");
			gbox.blitAll(gbox.getBufferContext(), img,
			{
				dx : SCREEN_W / 2 - img.width / 2,
				dy : SCREEN_H / 2 - img.height / 2
			});

			//标题
			var data =
			{
				tile : AnimMgr.getFrameID(this.anim.action["help"], 0),
				dx : this.x,
				dy : this.y,
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);

			//页数
			var rect = this.anim.coll[AnimMgr.getFrameID(this.anim.action["box"], 2)];
			ImageNumber.drawNum(gbox.getBufferContext(), (curPage + 1) + "/" + totalPage, this.x + rect[0], this.y + rect[1], 1, "R" + "V", animNum_1);

			//内容框
			var g = gbox.getBufferContext();
			if (g != null)
			{
				g.save();
				g.lineWidth = 3;
				g.strokeStyle = "#FFFFFF";
				g.lineJoin = "round";
				g.beginPath();
				var rect = this.anim.coll[AnimMgr.getFrameID(this.anim.action["box"], 0)];

				g.moveTo(this.x + rect[0], this.y + rect[1] + rect[3]);
				g.lineTo(this.x + rect[0], this.y + rect[1] + 4);
				g.lineTo(this.x + rect[0] + 4, this.y + rect[1]);
				g.lineTo(this.x + rect[0] + rect[2] / 2 - rect[3] / 2, this.y + rect[1]);
				g.lineTo(this.x + rect[0] + rect[2] / 2 + rect[3] / 2, this.y + rect[1] + rect[3]);
				g.lineTo(this.x + rect[0] + rect[2], this.y + rect[1] + rect[3]);

				g.lineTo(this.x + rect[0] + rect[2], SCREEN_H - rect[3] - 10);
				g.lineTo(this.x + rect[0], SCREEN_H - rect[3] - 10);

				g.closePath();
				g.stroke();
				g.restore();
			}

			//内容文字
			var start_y = this.y + rect[1] + rect[3] + 10;
			for ( var i in help_array[curPage])
			{
				gbox.blitSystemText(gbox.getBufferContext(),
				{
					text : help_array[curPage][i],
					color : "#000000",
					font : "bold " + font_size + "px sans-serif",
					align : "center",
					x : SCREEN_W / 2 + 1,
					y : start_y + i * font_h + 1
				});
				
				gbox.blitSystemText(gbox.getBufferContext(),
				{
					text : help_array[curPage][i],
					color : "#FFFFFF",
					font : "bold " + font_size + "px sans-serif",
					align : "center",
					x : SCREEN_W / 2,
					y : start_y + i * font_h
				});
			}
		};
	};

	var btn_home = new function() //TODO
	{
		this.id = "btn_home";
		this.group = GROUP_HELP;
		this.tileset = "tile_help";
		this.x = SCREEN_W / 2;
		this.y = SCREEN_H;
		this.poly = [[], [], [], []];

		this.frame = 0;
		this.action = null;
		this.anim = animHelp;

		this.initialize = function()
		{
			toys.topview.initialize(this, {});

			AnimMgr.changeAction(this, this.anim.action["home"]);
			AnimMgr.updatePolyWithAnim(this);
		};
		this.first = function()
		{
		};
		this.myclick = function()
		{
			curPage = 0;
		};
		this.blit = function()
		{
			this.anim.image = "img_help";
			var data =
			{
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = AnimMgr.nextFrame(this.action);
		};
	};

	var btn_prev = new function() //TODO
	{
		this.id = "btn_prev";
		this.group = GROUP_HELP;
		this.tileset = "tile_help";
		this.x = SCREEN_W / 2;
		this.y = SCREEN_H;
		this.poly = [[], [], [], []];

		this.frame = 0;
		this.action = null;
		this.anim = animHelp;

		this.initialize = function()
		{
			toys.topview.initialize(this, {});

			AnimMgr.changeAction(this, this.anim.action["prev"]);
			AnimMgr.updatePolyWithAnim(this);
		};
		this.first = function()
		{
		};
		this.myclick = function()
		{
			curPage--;
			if (curPage < 0)
			{
				curPage = 0;
			}
		};
		this.blit = function()
		{
			this.anim.image = "img_help";
			var data =
			{
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = AnimMgr.nextFrame(this.action);
		};
	};

	var btn_next = new function() //TODO
	{
		this.id = "btn_next";
		this.group = GROUP_HELP;
		this.tileset = "tile_help";
		this.x = SCREEN_W / 2;
		this.y = SCREEN_H;
		this.poly = [[], [], [], []];

		this.frame = 0;
		this.action = null;
		this.anim = animHelp;

		this.initialize = function()
		{
			toys.topview.initialize(this, {});

			AnimMgr.changeAction(this, this.anim.action["next"]);
			AnimMgr.updatePolyWithAnim(this);
		};
		this.first = function()
		{
		};
		this.myclick = function()
		{
			curPage++;
			if (curPage > totalPage - 1)
			{
				curPage = totalPage - 1;
			}
		};
		this.blit = function()
		{
			this.anim.image = "img_help";
			var data =
			{
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = AnimMgr.nextFrame(this.action);
		};
	};

	var btn_end = new function() //TODO
	{
		this.id = "btn_end";
		this.group = GROUP_HELP;
		this.tileset = "tile_help";
		this.x = SCREEN_W / 2;
		this.y = SCREEN_H;
		this.poly = [[], [], [], []];

		this.frame = 0;
		this.action = null;
		this.anim = animHelp;

		this.initialize = function()
		{
			toys.topview.initialize(this, {});

			AnimMgr.changeAction(this, this.anim.action["end"]);
			AnimMgr.updatePolyWithAnim(this);
		};
		this.first = function()
		{
		};
		this.myclick = function()
		{
			curPage = totalPage - 1;
		};
		this.blit = function()
		{
			this.anim.image = "img_help";
			var data =
			{
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = AnimMgr.nextFrame(this.action);
		};
	};

	var cmd_back = new function() //TODO
	{
		this.id = "cmd_back";
		this.group = GROUP_HELP;
		this.tileset = "tile_command";
		this.x = SCREEN_W;
		this.y = SCREEN_H;
		this.poly = [[], [], [], []];

		this.frame = 0;
		this.action = null;
		this.anim = animCommand;

		this.initialize = function()
		{
			toys.topview.initialize(this, {});

			AnimMgr.changeAction(this, this.anim.action["resume"]);
			AnimMgr.updatePolyWithAnim(this);
		};
		this.first = function()
		{
		};
		this.myclick = function()
		{
			enterMenu();
		};
		this.blit = function()
		{
			this.anim.image = "img_command";
			var data =
			{
				tile : this.frame,
				dx : this.x,
				dy : this.y,
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			this.frame = AnimMgr.nextFrame(this.action);
		};
	};

	listHelpObj = [obj_help, cmd_back, btn_prev, btn_next];
};

var enterHelp = function()
{
	if (DEBUG)
	{
		console.log("\nenterHelp()");
	}

	if (listHelpObj != null)
	{
		for ( var i in listHelpObj)
		{
			gbox.addObject(listHelpObj[i]);
		}
	}

	gbox.setRenderOrder([GROUP_HELP, GROUP_BACK_CALL]);
	if (gbox.getGroupsInLayer(LAYER_HELP).length == 0)
	{
		gbox.setGroupsToLayer([GROUP_HELP], LAYER_HELP);
	}
	changeMap(LAYER_HELP);
};

var splitString = function(str, num_per_line, font_size, font_h)
{
	var array = gbox.wordWrap(str, num_per_line, "\n", true);
	
	for (var j in array)
	{
		var s = array[j];
		var blanks = num_per_line - s.length;
		for ( var i = 0; i < blanks; i++)
		{
			s += "　";
		}
		array[j] = s;
	}
	
	var rect = animHelp.coll[AnimMgr.getFrameID(animHelp.action["box"], 1)];
	var lines_per_page = Math.floor(rect[3] / font_h) - 1;
	var pages = Math.floor(array.length / lines_per_page);
	pages += (array.length % pages) > 0 ? 1 : 0;
	var ret = new Array();
	for ( var i = 0; i < pages; i++)
	{
		ret.push(array.splice(0, lines_per_page));
	}
	return ret;
};