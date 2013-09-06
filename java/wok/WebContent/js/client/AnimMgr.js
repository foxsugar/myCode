var FrameList = function(speed, frames)
{
	this.speed = speed;
	this.frames = frames;
	
	this.cnt = 0;
	this.time = new Date().getTime();
	
	this.reset = function()
	{
		this.cnt = 0;
		this.time = new Date().getTime();
	};
	
	this.clone = function(clone_mode)
	{
		if (!clone_mode)
		{
			return this;
		}
		return new FrameList(this.speed, this.frames.concat());
	};
};

var Actor = function(anim)
{
/*	this.image = null;
	this.frame = 0;
	this.action = null;
	this.anim = anim;
	
	this.nextFrame = function()
	{
		
	};
	
	this.draw = function(g, data)
	{
		data.tile = this.frame;
		data.anim = this.anim;
		
		AnimMgr.draw(gbox.getBufferContext(), data);
	};*/
};

var AnimMgr = new function()
{
	this.anims = [];
	
	this.addAnim = function(anim_id, data)
    {
		this.anims[anim_id] = data;
    };
    
	this.changeAction = function(obj, next, clone_mode)
	{
		if (obj.action == next)
		{
			return;
		}
		
		next.reset();
		obj.action = next.clone(clone_mode);
		obj.frame = next.frames[0];
	};
	
	this.getFrameID = function(action, frm_id)
	{
		return action.frames[frm_id];
	};
	
	this.nextFrame = function(action, once)
	{
		if (new Date().getTime() - action.time > action.speed)
		{
			action.cnt++;
			action.time = new Date().getTime();
		}
		if (once)
		{
			return action.frames[(action.cnt >= action.frames.length ? action.frames.length - 1 : action.cnt)];
		}
		action.cnt = Math.floor(action.cnt % action.frames.length);
		return action.frames[action.cnt];
	};
	
	this.isActionFinished = function(action)
	{
		return action.cnt >= action.frames.length;
	};
	
	/**
	 * 弧度(radians) = 角度(degrees) * Math.PI /180
	 * 角度(degrees) = 弧度(radians) * 180 / Math.PI
	 */
	this.draw = function(g, data)
	{
		if (g == null)
		{
			return;
		}
		
		var img = gbox.getImage(data.anim.image);
		var anim = data.anim;
		
		gbox._implicitsargs(data);
		g.save();
		g.globalAlpha = (data.alpha ? data.alpha : 1);
		
		var center_x = data.dx;
		var center_y = data.dy;
		
		if (data.rotate != undefined)
		{
			g.translate(center_x, center_y);
			g.rotate(data.rotate);
			
			data.dx = 0;
			data.dy = 0;
		}
		var frm = anim.frame[data.tile];
		for (var clp_id = 0; clp_id < frm.length; clp_id++)
		{
			var clp = anim.clip[frm[clp_id][0]];
			
			var cx = clp[0];
			var cy = clp[1];
			var cw = clp[2];
			var ch = clp[3];
			
			var dx = frm[clp_id][1];
			var dy = frm[clp_id][2];
			var fh = (frm[clp_id][3] ^ data.fliph);
			var fv = (frm[clp_id][4] ^ data.flipv);
			
			var pos_x = data.dx;
			var pos_y = data.dy;
			
			pos_x += dx * (data.fliph ? -1 : 1);
			pos_y += dy * (data.flipv ? -1 : 1);
			
			drawRegion(g, img, cx, cy, cw, ch, pos_x, pos_y, fh, fv);
		}
		g.restore();
	};
	
	var drawRegion = function(g, img, cx, cy, cw, ch, pos_x, pos_y, fh, fv)
	{
		g.save();
		g.scale((fh ? -1 : 1), (fv ? -1 : 1));
		drawImage(g, img, cx, cy, cw, ch, pos_x * (fh ? -1 : 1), pos_y * (fv ? -1 : 1), cw, ch);
		g.restore();
	};
	
	var drawImage = function(g, img, sx, sy, sw, sh, dx, dy, dw, dh)
	{
		if (!img || !g)
		{
			return;
		}
		if (sx < 0)
		{
			dx -= (dw / sw) * sx;
			sw += sx;
			sx = 0;
		}
		if (sy < 0)
		{
			dy -= (dh / sh) * sy;
			sh += sy;
			sy = 0;
		}
		if (sx + sw > img.width)
		{
			dw = (dw / sw) * (img.width - sx);
			sw = img.width - sx;
		}
		if (sy + sh > img.height)
		{
			dh = (dh / sh) * (img.height - sy);
			sh = img.height - sy;
		}
		try
		{
			if ((sh > 0) && (sw > 0) && (sx < img.width) && (sy < img.height))
			{
				g.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
			}
		} catch (e)
		{
			console.log("AnimMgr.drawImage() : " + e);
		}
	};
    
    this.isCollidedWith = function(obj_1, obj_2)
    {
    	return toys.topview.collides(obj_1, obj_2);
    };
    
    this.updatePolyWithAnim = function(obj)
    {
    	var frm_box = obj.anim.coll[obj.frame];
    	var box_l = frm_box[0];
		var box_u = frm_box[1];
		var box_r = frm_box[2] + box_l;
		var box_d = frm_box[3] + box_u;
		
		if (obj.fliph)
		{
			var tmp = box_l;
			box_l = box_r;
			box_r = tmp;
		}
		if (obj.flipv)
		{
			var tmp = box_u;
			box_u = box_d;
			box_d = tmp;
		}
		
		obj.poly = [
		             [obj.x + box_l, obj.y + box_u], 
		             [obj.x + box_r, obj.y + box_u], 
		             [obj.x + box_r, obj.y + box_d],
		             [obj.x + box_l, obj.y + box_d]
		];
    };
    
    this.updateCollWithAnim = function(obj)
    {
    	var frm_box = obj.anim.coll[obj.frame];
    	obj.colx = frm_box[0];
    	obj.coly = frm_box[1];
    	obj.colw = frm_box[2];
    	obj.colh = frm_box[3];
    	
    	if (obj.fliph)
		{
    		obj.colx = -(obj.colw + obj.colx);
		}
		if (obj.flipv)
		{
			obj.coly = -(obj.colh + obj.coly);
		}
    };
};

var myAni = function()
{
	this.anims = [];
	
	this.addAnim = function(anim_id, data)
    {
		this.anims[anim_id] = data;
    };
    
	this.changeAction = function(obj, next, clone_mode)
	{
		if (obj.action == next)
		{
			return;
		}
		
		next.reset();
		obj.action = next.clone(clone_mode);
		obj.frame = next.frames[0];
	};
	
	this.getFrameID = function(action, frm_id)
	{
		return action.frames[frm_id];
	};
	
	this.nextFrame = function(action, once)
	{
		if (new Date().getTime() - action.time > action.speed)
		{
			action.cnt++;
			action.time = new Date().getTime();
		}
		if (once)
		{
			return action.frames[(action.cnt >= action.frames.length ? action.frames.length - 1 : action.cnt)];
		}
		action.cnt = Math.floor(action.cnt % action.frames.length);
		return action.frames[action.cnt];
	};
	
	this.isActionFinished = function(action)
	{
		return action.cnt >= action.frames.length;
	};
	
	/**
	 * 弧度(radians) = 角度(degrees) * Math.PI /180
	 * 角度(degrees) = 弧度(radians) * 180 / Math.PI
	 */
	this.draw = function(g, data)
	{
		if (g == null)
		{
			return;
		}
		
		var img = gbox.getImage(data.anim.image);
		var anim = data.anim;
		
		gbox._implicitsargs(data);
		g.save();
		g.globalAlpha = (data.alpha ? data.alpha : 1);
		
		var center_x = data.dx;
		var center_y = data.dy;
		
		if (data.rotate != undefined)
		{
			g.translate(center_x, center_y);
			g.rotate(data.rotate);
			
			data.dx = 0;
			data.dy = 0;
		}
		var frm = anim.frame[data.tile];
		for (var clp_id = 0; clp_id < frm.length; clp_id++)
		{
			var clp = anim.clip[frm[clp_id][0]];
			
			var cx = clp[0];
			var cy = clp[1];
			var cw = clp[2];
			var ch = clp[3];
			
			var dx = frm[clp_id][1];
			var dy = frm[clp_id][2];
			var fh = (frm[clp_id][3] ^ data.fliph);
			var fv = (frm[clp_id][4] ^ data.flipv);
			
			var pos_x = data.dx;
			var pos_y = data.dy;
			
			pos_x += dx * (data.fliph ? -1 : 1);
			pos_y += dy * (data.flipv ? -1 : 1);
			
			drawRegion(g, img, cx, cy, cw, ch, pos_x, pos_y, fh, fv);
		}
		g.restore();
	};
	
	var drawRegion = function(g, img, cx, cy, cw, ch, pos_x, pos_y, fh, fv)
	{
		g.save();
		g.scale((fh ? -1 : 1), (fv ? -1 : 1));
		drawImage(g, img, cx, cy, cw, ch, pos_x * (fh ? -1 : 1), pos_y * (fv ? -1 : 1), cw, ch);
		g.restore();
	};
	
	var drawImage = function(g, img, sx, sy, sw, sh, dx, dy, dw, dh)
	{
		if (!img || !g)
		{
			return;
		}
		if (sx < 0)
		{
			dx -= (dw / sw) * sx;
			sw += sx;
			sx = 0;
		}
		if (sy < 0)
		{
			dy -= (dh / sh) * sy;
			sh += sy;
			sy = 0;
		}
		if (sx + sw > img.width)
		{
			dw = (dw / sw) * (img.width - sx);
			sw = img.width - sx;
		}
		if (sy + sh > img.height)
		{
			dh = (dh / sh) * (img.height - sy);
			sh = img.height - sy;
		}
		try
		{
			if ((sh > 0) && (sw > 0) && (sx < img.width) && (sy < img.height))
			{
				g.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
			}
		} catch (e)
		{
			console.log("AnimMgr.drawImage() : " + e);
		}
	};
    
    this.isCollidedWith = function(obj_1, obj_2)
    {
    	return toys.topview.collides(obj_1, obj_2);
    };
    
    this.updatePolyWithAnim = function(obj)
    {
    	var frm_box = obj.anim.coll[obj.frame];
    	var box_l = frm_box[0];
		var box_u = frm_box[1];
		var box_r = frm_box[2] + box_l;
		var box_d = frm_box[3] + box_u;
		
		if (obj.fliph)
		{
			var tmp = box_l;
			box_l = box_r;
			box_r = tmp;
		}
		if (obj.flipv)
		{
			var tmp = box_u;
			box_u = box_d;
			box_d = tmp;
		}
		
		obj.poly = [
		             [obj.x + box_l, obj.y + box_u], 
		             [obj.x + box_r, obj.y + box_u], 
		             [obj.x + box_r, obj.y + box_d],
		             [obj.x + box_l, obj.y + box_d]
		];
    };
    
    this.updateCollWithAnim = function(obj)
    {
    	var frm_box = obj.anim.coll[obj.frame];
    	obj.colx = frm_box[0];
    	obj.coly = frm_box[1];
    	obj.colw = frm_box[2];
    	obj.colh = frm_box[3];
    	
    	if (obj.fliph)
		{
    		obj.colx = -(obj.colw + obj.colx);
		}
		if (obj.flipv)
		{
			obj.coly = -(obj.colh + obj.coly);
		}
    };
};
