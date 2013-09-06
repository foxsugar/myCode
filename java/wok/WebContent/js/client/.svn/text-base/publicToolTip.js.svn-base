//var itemInfoStr = new Array();
//var item;
//var toolTip = function(object,tempitem)
//{
//	//console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//	//console.log("==" + tempitem);
//	item = tempitem;
//	switch(item.itemType)
//	{
//		case 1: //装备
//
//			  var levelStr = "";
//		      switch(item.itemLevel){
//		        	case 1:
//		        	levelStr = "白色";
//		        	break;
//		        	case 2:
//		        	levelStr = "绿色";
//		        	break;
//		        	case 3:
//		        	levelStr = "蓝色";
//		        	break;
//		        	case 4:
//		        	levelStr = "紫色";
//		        	break;
//		        	case 5:
//		        	levelStr = "橙色";
//		        	break;        	        	        	
//		        }
//		        if(typeof(object.equipment) != "undefined")//强化界面特殊处理
//		        {
//		        	  itemInfoStr[0] = { slides: [
//								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
//											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "品级 ： " ,"res":levelStr, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "绑定 ： " ,"res":object.bindState == 0? "未绑定":"绑定", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "攻击 ： " ,"res":item.attack == 0?item.attack : object.equipment.strengthenAttack == 0 ?item.attack:item.attack + "(" + " + " + object.equipment.strengthenAttack + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "防御 ： " ,"res":item.defence == 0?item.defence: object.equipment.strengthenDefence == 0?item.defence:item.defence + "(" + " + " + object.equipment.strengthenDefence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "体力 ： " ,"res":item.stamina == 0?item.stamina: object.equipment.strengthenStamina == 0?item.stamina:item.stamina + "(" + " + " + object.equipment.strengthenStamina + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "敏捷 ： " ,"res":item.agility == 0?item.agility: object.equipment.strengthenAgility == 0?item.agility:item.agility + "(" + " + " + object.equipment.strengthenAgility + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "智力 ： " ,"res":item.intelligence == 0?item.intelligence:item.intelligence + "(" + " + " + object.equipment.strengthenIntelligence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "统帅 ： " ,"res":item.commandNum, "resColor": "#ffffff","color": "#ffffff"},	
//											  { "name": "装备等级 ： " ,"res":item.needLevel, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "强化等级 ： " ,"res":object.equipment.strengthLevel, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "价格 ： " ,"res":item.salePrice, "resColor": "#ffffff","color": "#ffffff"},		
//											  { "name": "插孔1 ： " ,"res":object.equipment.hole1, "resColor": "#ffffff","color": "#ffffff"},	
//											  { "name": "插孔2 ： " ,"res":object.equipment.hole2, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "插孔3 ： " ,"res":object.equipment.hole3, "resColor": "#ffffff","color": "#ffffff"},	
//								 ]};
//		        }
//		       
//		        if(typeof(object.strengthenAttack)!= "undefined")
//		        {
//		        	  itemInfoStr[0] = { slides: [
//								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
//											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "品级 ： " ,"res":levelStr, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "绑定 ： " ,"res":object.bindState == 0? "未绑定":"绑定", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "攻击 ： " ,"res":item.attack == 0?item.attack : object.strengthenAttack == 0 ?item.attack:item.attack + "(" + " + " + object.strengthenAttack + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "防御 ： " ,"res":item.defence == 0?item.defence: object.strengthenDefence == 0?item.defence:item.defence + "(" + " + " + object.strengthenDefence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "体力 ： " ,"res":item.stamina == 0?item.stamina: object.strengthenStamina == 0?item.stamina:item.stamina + "(" + " + " + object.strengthenStamina + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "敏捷 ： " ,"res":item.agility == 0?item.agility: object.strengthenAgility == 0?item.agility:item.agility + "(" + " + " + object.strengthenAgility + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "智力 ： " ,"res":item.intelligence == 0?item.intelligence:item.intelligence + "(" + " + " + object.strengthenIntelligence + ")", "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "统帅 ： " ,"res":item.commandNum, "resColor": "#ffffff","color": "#ffffff"},	
//											  { "name": "装备等级 ： " ,"res":item.needLevel, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "强化等级 ： " ,"res":object.strengthLevel, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "价格 ： " ,"res":item.salePrice, "resColor": "#ffffff","color": "#ffffff"},		
//											  { "name": "插孔1 ： " ,"res":object.hole1, "resColor": "#ffffff","color": "#ffffff"},	
//											  { "name": "插孔2 ： " ,"res":object.hole2, "resColor": "#ffffff","color": "#ffffff"},
//											  { "name": "插孔3 ： " ,"res":object.hole3, "resColor": "#ffffff","color": "#ffffff"},	
//								 ]};
//		        	
//		        }
//			  
//
//			    for(var a = 0; a<itemInfoStr[0].slides.length; a++)
//			    {
//			        
//			    	if(itemInfoStr[0].slides[a].res == 0)
//			    	{
//			    		itemInfoStr[0].slides.splice(a,1);
//			    		a = 0;
//			    	}
//			    	
//			    }
//		  break;
//		  case 2://道具
//		      
//			  itemInfoStr[0] = { slides: [
//								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
//											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
//											 	
//								 ]};
//
//			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
//			    {
//			        
//			    	if(itemInfoStr[0].slides[a].res == 0)
//			    	{
//			    		itemInfoStr[0].slides.splice(a,1);
//			    		a = 0;
//			    	}
//			    	
//			    }
//		  break;
//		  case 3://材料
//              
//			  itemInfoStr[0] = { slides: [
//								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
//											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
//											 	
//								 ]};
//
//			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
//			    {
//			        
//			    	if(itemInfoStr[0].slides[a].res == 0)
//			    	{
//			    		itemInfoStr[0].slides.splice(a,1);
//			    		a = 0;
//			    	}
//			    	
//			    }
//		 break;
//		 case 4://任务
//		      
//			  itemInfoStr[0] = { slides: [
//								 	          { "name": "名称 ： " ,"res":item.itemName, "resColor": "#ffffff","color": "#ffffff"},     
//											  { "name": "描述 ： " ,"res":item.itemDescription, "resColor": "#ffffff","color": "#ffffff"},
//											 	
//								 ]};
//
//			  for(var a = 0; a<itemInfoStr[0].slides.length; a++)
//			    {
//			        
//			    	if(itemInfoStr[0].slides[a].res == 0)
//			    	{
//			    		itemInfoStr[0].slides.splice(a,1);
//			    		a = 0;
//			    	}
//			    	
//			    }
//		 break;
//		 
//	}
//	return itemInfoStr[0];
//};