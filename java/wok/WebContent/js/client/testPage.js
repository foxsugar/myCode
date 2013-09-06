var xxx = false;
var testBuild = function(index)
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
    var bW = 801;
	var bH = 486;
	isDrawUI[index] = true;
	
	gbox.addObject(
	{ 
		id : 'testpage',
		group : 'levelMenu_3',
		tileset : 'test',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [320,136], [1121,144], [1121,613],[317,611]],
		initialize : function()
		{	
		},
		
		first : function() 
		{	
		},
		myclick : function()
		{
             if((lastTouchMoveX > 479 && lastTouchMoveX < 499 )&& (lastTouchMoveY > 300 && lastTouchMoveY < 318))
             {
             	
             	//xxx = !xxx;
             	//if(xxx)
             	{
             console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
             		jishiList(getClickObjectIndex());
	                changeMap('cityMenuLayer');
	               
            	}

             }
             else
             {      
             	console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            	    testBuild(getClickObjectIndex());
			        changeMap('cityMenuLayer');

            }

		 
		},
		blit : function()
		{
			if(isDrawUI[index])
			{
			   var xqx = (gbox.getScreenW() - bW)/2;
			   var xqy = (gbox.getScreenH() - bH)/2;
			   gbox.drawImage('test',xqx,xqy);

			}
		}
	 });
}
var jishiList = function(index)
{
	gbox.setRenderOrder(['cityMenu','level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'test_List',
		group : 'levelMenu_3',
		tileset : 'test',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [407,309], [534,308], [534,500],[407,500]],
		initialize : function()
		{   	  
          var _item = new Array();
            _item[0] = "俞飞";
            _item[1] = "缪雷";
            _item[2] = "冯颜博";
            _item[3] = "孙文杰";
            _item[4] = "张咪咪";
            _item[5] = "韩南南";
            _item[6] = "宋佳杰";
            _item[7] = "徐中兴";
			
            var content = new Array(_item);
			testOffsetY = test_OffsetY = 0;
			testList.init( 'jishiButton', 'wjHit', 'wjHit','jishiButton',null, content, 390, 310, 1, 8, 34, 5, true, 20, 0 );		
		},
		first : function() 
		{	
		},
		myclick : function()
		{
            console.log("id ==== " + testList.getPageRectIndex(lastTouchMoveX,lastTouchMoveY));

       

            	//xxx = false;
	            //isDrawUI[index] = false;
				//clickObjectList[getClickObjectIndex()].poly= [[0,0],[0,0],[0,0],[0,0]];
				testBuild(getClickObjectIndex());
				changeMap('cityMenuLayer');	



		},
		blit : function()
		{
			if(isDrawUI[index])
			{
				gbox.drawImage('attributeNum',390,330);
                testList.paint( test_OffsetY, test_BeginSlip,test_Time );
			}

		}
	 });
}