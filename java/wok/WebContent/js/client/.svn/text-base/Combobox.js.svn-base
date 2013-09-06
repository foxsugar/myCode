/**
 * 下拉框类
 * @author 刘征
 */
Combobox = function(){
	this.data = [];//data [{id:0,txt:'',obj:null},...]
	this.dataName = '';
	this.font_size = 14;
	this.selected = {id:0,txt:'',obj:null};
	//用来标识需要绘制
	this.isOpen;
	//用来标识是否需要创建
	this.isCreated = false;
	//用来标识是否当前选中项
	this.isShowSelected = true;
	//用来标识是否选项文字居中
	this.textCenter = false;
	this.index=0,
	this.id='',
	this.group='', 
	this.tileset = '',
	this.hover='',
	this.select,
	this.changeMap='',
	this.x=0,
	this.y=0,
	this.width = 0,
	this.height = 0,
	this.shoot=[],
	//初始化方法
	//index,id,group,changeMap,shoot,x,y,layout,[tileset,hover,select]
	this.info = function(index,id,group,changeMap,shoot,x,y,layout,tileset,hover,select){
		this.index = index;
		this.id = id;
		this.group = group;
		this.changeMap = changeMap;
		this.shoot = shoot;
		this.tileset = tileset;
		this.hover = hover;
		this.x = x;
		this.y = y;
		this.select = select;
		this.setComboboxLayout(layout);
	};
	this._layout = {
		//0:自定义,1:ty_an_96,2:ty_an_99,3:ty_an_102
		widthType : 0,
		isScrolling : false
	};
	this._layoutImage = {};
	
	this.setComboboxLayout = function(layout){
		this._layout = layout;
		this._setLayoutImageByWithType(this._layout.widthType);
		this.width = gbox.getImage(this._layoutImage.bg).width;
		this.height = gbox.getImage(this._layoutImage.bg).height;
	};
	this._setLayoutImageByWithType = function(withType){
		switch (withType) {
		case 1:
			this._layoutImage = {
					bg : 'ty_an_95',
					hover : 'ty_an_96',
					select : 'ty_an_97'
			};
			break;
		case 2:
			this._layoutImage = {
				bg : 'ty_an_98',
				hover : 'ty_an_99',
				select : 'ty_an_100'
			};
			break;
		case 3:
			this._layoutImage = {
				bg : 'ty_an_101',
				hover : 'ty_an_102',
				select : 'ty_an_103'
			};
			break;
		}
	};
	//获取数据
	this.setData = function(list,id,txt,isSetObj){
		var is = !!isSetObj;
		this.data = [];
		for(var i=0; i<list.length; i++){
			var line = list[i];
			var obj;
			if(is){
				obj = {
		    			id:line[id],
		    			txt:line[txt],
		    			obj:line
		    	};
			}else{
				obj = {
		    			id:line[id],
		    			txt:line[txt]
		    	};
			}
	    	
	    	this.data.push(obj);
		}
		this.selected = this.data[0];
	},
	this.closeCombobox = function(){
		//显示删除下拉框
		isDrawUI[this.index] = false;
		this.isOpen = false;	
		this.isCreated = false;
	    clickObjectList[this.index].poly= [[0,0],[0,0],[0,0],[0,0]];
	};
	/**
	 * 创建下拉框
	 * @param fn  function(){}
	 */
	this.createCombobox = function(fn){
		var _box = this;
		isDrawUI[_box.index] = true;
		_box.isOpen = true;
		_box.isCreated = true;
		gbox.setRenderOrder(_box.shoot);
		var length = _box.data.length;
		var x = _box.x;
		var y = _box.y;
		var width = _box.width;
		var height = _box.height;
		var _poly = [[x,y],[x+width,y],[x+width,y+(height*length)],[x,y+(height*length)]];
		
		gbox.addObject({
			id : _box.id,
			group : _box.group,
			x : 0,
			y : 0,
			tileset : _box._layoutImage.bg,
		    anim : null,
			action : null,
			frame : 0,
			poly : _poly,
			initialize : function(){},
			first : function(){},
			//单击事件
			myclick : function(){
				//为每一行添加单击事件
				for(var i=0; i<length; i++)
				{
					var _y = y + (i*height);
					if(((x < lastTouchMoveX) && (lastTouchMoveX < (x + width))) && 
							((_y < lastTouchMoveY) && (lastTouchMoveY < (_y + height))))
					{
						_box.selected = _box.data[i];
						isDrawUI[getClickObjectIndex()] = false;
						_box.isOpen = false;
						_box.isCreated = false;
					    clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
						fn();
					}
				}
			},
			blit : function(){
				if(isDrawUI[_box.index] && _box.isOpen){
				if(_box._layout.widthType==0){
					_box._layoutImage = {
							bg : _box.tileset,
							hover : _box.hover,
							select : _box.select||_box.hover
					};
				}else{
					_box._setLayoutImageByWithType(_box._layout.widthType);
				}
				for(var i=0; i<length; i++){
					//行高计算
					var _y = y + (i*height);
					//逐行渲染下拉框
					if(_box.selected.id == _box.data[i].id && _box.isShowSelected){
						gbox.blitTile(gbox.getBufferContext(),{
							tileset : _box._layoutImage.select,
							tile : 0,
							dx :x,
							dy :_y,
							fliph : window.fliph,
							flipv : window.flipv,
							camera : window.camera,
							alpha : 1.0
						});
					}else{
						gbox.blitTile(gbox.getBufferContext(),{
							tileset : _box._layoutImage.bg,
							tile : 0,
							dx :x,
							dy :_y,
							fliph : window.fliph,
							flipv : window.flipv,
							camera : window.camera,
							alpha : 1.0
						});
					}
					if(((x < touchMoveX) && (touchMoveX < (x + width))) && 
							((_y < touchMoveY) && (touchMoveY < (_y + height))))
					{
						gbox.blitTile(gbox.getBufferContext(),{
							tileset : _box._layoutImage.hover,
							tile : 0,
							dx :x,
							dy :_y,
							fliph : window.fliph,
							flipv : window.flipv,
							camera : window.camera,
							alpha : 1.0
						});
					}
					//文字
					var txtY = _y + (height - 14)/2;
					if(_box.textCenter){
						var tW = gbox.getTextWidth(_box.data[i].txt,_box.font_size);
						var txtX = x + (gbox.getImage(_box._layoutImage.bg).width - tW)/2;
						gbox.drawText("" + _box.data[i].txt,txtX,txtY,6);
					}else{
						gbox.drawText("" + _box.data[i].txt,x+3,txtY,6);
					}
				}
			}
		  }
		});
	};
};