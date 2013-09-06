var iIndex = 0;
var iRectPoly = new Array(new Array());
var iSelected = new Array();
var selectPoly = new Array(new Array());
var isSelected = false;
var mailNum = 0; 
var mailArray = ["全部","未阅览","已阅览"];
var curPage = 0;
var tPage = 0;
var sendMailDraw = true;
var viewMailDraw = true;
var addresserName;
var addressertitle;
var addressercontent;
var mailIds = new Array();
var returnName = null;
var returnId;
var isInbox = false;
var revInboxGroup;
var revInboxLayer;
var Inbox = function(index,_group,_layer)//收件箱
{
	revInboxGroup = _group;
	revInboxLayer = _layer;
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	var bW = gbox.getImage('yj_zjm_01').width;
	var bH = gbox.getImage('yj_zjm_01').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('yj_zjm_04').width;
	var bH1 = gbox.getImage('yj_zjm_04').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;
	var inboxtempX3 = (gbox.getImage('yj_zjm_01').width - gbox.getImage("yj_zjm_17").width)/2 + backdropX;
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 20;	
	isDrawUI[index] = true;
	isInbox = true;
	gbox.addObject(
	{ 
		id : 'InboxBg',
		group : 'levelMenu_2',
		tileset : 'yj_zjm_01',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
		initialize : function()
		{
		},
		first : function() 
		{	
		},
		myclick : function()
		{
			if(((exitButtonCoordinate6.x < lastTouchMoveX) && (lastTouchMoveX < exitButtonCoordinate6.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate6.y < lastTouchMoveY) && (lastTouchMoveY < exitButtonCoordinate6.y+gbox.getImage("ty_an_17").height))){
				displayDestroy();
				mailData = new Array();
				exit(getClickObjectIndex());
				curGroup = 'cityMenu';
			}else
			{
			        for(var i = 0 ;i<mailData.length; i++)
			        {
			        		if(((622 < lastTouchMoveX) && (lastTouchMoveX < 803)) && ((190 + i*29 < lastTouchMoveY) && (lastTouchMoveY < 212 + i*29)))
		                    {		                        
		                    	returnId = i;		                    	
		                    	MailFunction.getMailDetail(mailData[i].id,doGetMailDetail);                 								 	
		                    }
			        }
					if(((790 < lastTouchMoveX) && (lastTouchMoveX < 874)) && ((574 < lastTouchMoveY) && (lastTouchMoveY < 598)))
                    {
                    	sendMailDraw = true;
					 	sendMailPage(getClickObjectIndex(),_group,_layer,"inbox",'levelMenu_2');
					 	changeMap(_layer);
                    }
				
					//选择品质控制
					if(((623 < lastTouchMoveX) && (lastTouchMoveX < 636)) && ((170 < lastTouchMoveY) && (lastTouchMoveY < 186)))
					 {
					 	if(mailNum < (mailArray.length - 1)){
					 	   mailNum = mailNum + 1;
					 	   MailFunction.getMailList(1,mailNum - 1,doMailList);
					 	   if(typeof(mailData) != "undefined"){	
					 	   	  curPage = 1;
					 	   }
					 	   else
					 		   alert("没有邮件数据！");
					 	}
					 	   
					 }
					if(((707 < lastTouchMoveX) && (lastTouchMoveX < 720)) && ((170 < lastTouchMoveY) && (lastTouchMoveY < 186)))
					 {
					 	if(mailNum > 0){
					 	   mailNum = mailNum - 1;				 	   
					 	   MailFunction.getMailList(1,mailNum - 1,doMailList);
					 	   if(typeof(mailData) != "undefined"){	
					 	   	  curPage = 1;
					 	   }
					 	   else
					 		   alert("没有邮件数据！");
					 	}
					 	
					 }
					 //翻页数字及按钮控制
	               if(((669 < lastTouchMoveX) && (lastTouchMoveX < 689)) && ((541 < lastTouchMoveY) && (lastTouchMoveY < 568)))//控制向右翻页
	               {
	               	   if(curPage < tPage){
		               	   MailFunction.getMailList(curPage + 1,mailNum - 1,doMailList);
		               	   curPage++;
	               	   }
	               }
	               if(((749 < lastTouchMoveX) && (lastTouchMoveX < 769)) && ((541 < lastTouchMoveY) && (lastTouchMoveY < 568)))//控制向左翻页
	               {
	               	   if(curPage >= 2){
		               	   MailFunction.getMailList(curPage - 1,mailNum - 1,doMailList); 
		               	   curPage--;      	   	
	               	   }
	               }	
	               	if(typeof(mailData) != "undefined"){			 				
						for(var i = 0 ; i<mailData.length;i++)
						{	
								if(gbox._mouseArea(selectPoly[i],lastTouchMoveX,lastTouchMoveY)){
									if(!iSelected[i]){
									    iSelected[i] = true;
									    mailIds.push(mailData[i].id);
									}else{
									    iSelected[i] = false;
									    mailIds.pop(mailData[i].id);
									}
								}else if(gbox._mouseArea(iRectPoly[i],lastTouchMoveX,lastTouchMoveY)){
									iIndex = i;
								}
							
						}
	               	}
					if(((580 < lastTouchMoveX) && (lastTouchMoveX < 598)) && ((170 < lastTouchMoveY) && (lastTouchMoveY < 188)))
					 {	
						if(typeof(mailData) != "undefined"){
							mailIds = new Array();
						 	if(!isSelected){
									for(var i = 0 ; i<mailData.length;i++)
									{
										iSelected[i] = true;
										mailIds.push(mailData[i].id);
									}	
								isSelected = true;
						 	}else{
									for(var i = 0 ; i<mailData.length;i++)
									{
										iSelected[i] = false;
										mailIds.pop(mailData[i].id);
									}
					 		    isSelected = false;
						 	}	
						}else
					 		alert("没有邮件数据！");
					 }			
		               if(((566 < lastTouchMoveX) && (lastTouchMoveX < 650)) && ((567 < lastTouchMoveY) && (lastTouchMoveY < 598)))
		               {
		            	   if(typeof(mailData) != "undefined"){
		            		   MailFunction.deleteMail(mailIds.toString(),curPage,mailNum - 1,doDeleteMail);
		            	   }else
		            		   alert("没有邮件数据！");
		               }
				Inbox(getClickObjectIndex(),_group,_layer);
				changeMap(_layer);				
			}
		},
		blit : function()
		{
				  if(isDrawUI[index] && isInbox)
				  {
	               gbox.drawImage('yj_zjm_01',backdropX,backdropY);
				   gbox.drawImage('yj_zjm_04',backdropX1,backdropY1 - 8);
				   gbox.drawImage('yj_zjm_17',inboxtempX3,backdropY);   
				   if(((exitButtonCoordinate6.x < touchMoveX) && (touchMoveX < exitButtonCoordinate6.x + gbox.getImage("ty_an_17").width)) && ((exitButtonCoordinate6.y < touchMoveY) && (touchMoveY < exitButtonCoordinate6.y+gbox.getImage("ty_an_17").height)))
						   {
						   	    gbox.drawImage('ty_an_17',exitButtonCoordinate6.x,exitButtonCoordinate6.y);						   	    
						   }
						   else
						   {
						   	    gbox.drawImage('ty_an_18',exitButtonCoordinate6.x,exitButtonCoordinate6.y);	
						   }			            	   
	               //绘制浏览邮件类型（全部，已浏览，未浏览）
	               var strW = gbox.getTextWidth("" + mailArray[mailNum],12);
	               var strX = 640 + (60 - strW)/2;
	               var strY = 169;
	               gbox.drawString("" + mailArray[mailNum],strX,strY,'#FFFFFF',12);
	               //绘制选择是否已读
	               gbox.drawImage('ty_an_24',707,166);	            
	               gbox.drawImage('ty_an_25',625,166);
				   if(isSelected){
                      gbox.drawImage('ty_an_12',575,164);							
				   }				   
					//绘制翻页数字及按钮
					gbox.drawDanceString(curPage + "/" + tPage,706, 547,12, '#000000','#ffffff');
					gbox.drawImage("ty_an_24",755,545);
					gbox.drawImage("ty_an_25",672,545);	
					if(typeof(mailData) != "undefined"){
					    for(var i=0; i< mailData.length; i++){
					    	if(typeof(mailData[i]) != "undefined"){	
								var rW = 290;
								var rH = 20;
								var rX = backdropX + (bW - rW)/2 - 5;
								var rY = (193 + i*29);
								iRectPoly[i] = [[rX,rY], [rX + rW, rY], [rX + rW,rY + rH],[rX,rY + rH]];
	                            var sW = gbox.getImage('ty_an_01').width;
								var sH = gbox.getImage('ty_an_01').height;
								var sX = rX + 6;	
								var sY = rY + 6;						
								selectPoly[i] = [[sX,sY], [sX + sW, sY], [sX + sW,sY + sH],[sX,sY + sH]];
								
								gbox.drawImage('ty_an_01',rX + 6,rY + (rH - gbox.getImage('ty_an_01').height)/2);		
								if(iSelected[i]){
	                               gbox.drawImage('ty_an_12',rX + 6,rY + (rH - gbox.getImage('ty_an_12').height)/2);							
								}
							    if(mailData[i].status == 0)//未读
							       gbox.drawImage('letter',rX + 6 + sW + 6,rY + (rH - gbox.getImage('letter').height)/2);
							    else if(mailData[i].status == 1)//已读
							       gbox.drawImage('noletter',rX + 6 + sW + 6,rY + (rH - gbox.getImage('noletter').height)/2);
							    
							    var lW = gbox.getImage('letter').width;
							    var pW = 0;
							    if(mailData[i].addresser == "系统" || mailData[i].addresser == "拍卖行"){
							       pW = gbox.getImage('system').width;
							       gbox.drawImage('system',rX + 6 + sW + 6 + lW + 6,rY + (rH - gbox.getImage('system').height)/2);
							    }else{
							       pW = gbox.getImage('player').width;
							       gbox.drawImage('player',rX + 6 + sW + 6 + lW + 6,rY + (rH - gbox.getImage('player').height)/2);
							    }
							    
							    Inbox.drawMailText(mailData[i].title,rX + 6 + sW + 6 + lW + 6 + pW + 6, rY + (rH - 12)/2,100,12);
							    //gbox.drawString("" + mailData[i].title,rX + 6 + sW + 6 + lW + 6 + pW + 6, rY + (rH - 12)/2,'#FFFFFF',12);
							    
							    var sendTimeW = gbox.getTextWidth("" + mailData[i].sendTime,12);
							    gbox.drawString("" + mailData[i].sendTime,rX + rW - sendTimeW, rY + (rH - 12)/2,'#FFFFFF',12);
							    
							    var attachmentW  = gbox.getImage('yj_zjm_23').width;
							    if(mailData[i].hasAttachment != 0)//有附件
							        gbox.drawImage('yj_zjm_23',rX + rW - sendTimeW - attachmentW - 6,rY + (rH - gbox.getImage('yj_zjm_23').height)/2);
							    
					    	}
																	    	
					    }	
					}
		            //绘制删除按钮加亮以及文字
		               if(((571 < touchMoveX) && (touchMoveX < 652)) && ((566 < touchMoveY) && (touchMoveY < 593)))
		               {
		               	    gbox.drawImage('ty_an_11',569,567);
		               }
		               //gbox.drawImage('yj_zjm_16',595,571);					    
		               var rW = gbox.getImage('ty_an_11').width;
					   var strW = gbox.getTextWidth("删 除",14);
					   var cntX = 569 + (rW - strW)/2;
				       gbox.drawDanceString("删 除",cntX, 574,14, '#000000','#ffffff');
		            //绘制写邮件按钮加亮以及文字
		               if(((786 < touchMoveX) && (touchMoveX < 869)) && ((566 < touchMoveY) && (touchMoveY < 591)))
		               {
		               	    gbox.drawImage('ty_an_11',785,567);
		               }
		               var rW = gbox.getImage('ty_an_11').width;
					   var strW = gbox.getTextWidth("写邮件",14);
					   var cntX = 785 + (rW - strW)/2;
				       gbox.drawDanceString("写邮件",cntX, 574,14, '#000000','#ffffff');		          					    				            
					 }	
				}		
	 });

}

/*
 * 绘制邮件列表中的邮件标题
 */
Inbox.drawMailText = function(text,x,y,width,fontSize){
	var dot = "...";
	var dotWidth = gbox.getTextWidth(dot,fontSize);
	var textWidth = gbox.getTextWidth(text,fontSize);
	if(textWidth<=width){
		gbox.drawString(text,x,y,"FFFFFF",fontSize);
	}else{
		var deltaWidth = 0;
		var length = text.length;
		var maxWidth = width - dotWidth;
		for(var i=0;i<length;i++){
			deltaWidth += gbox.getTextWidth(text.charAt(i));
			if(deltaWidth>maxWidth){
				var str = text.substring(0,i-1)+dot;
				gbox.drawString(str,x,y,"FFFFFF",fontSize);
			}				
		}
	}
};
	
var sendMailGroup;
var sendMailLayer;

var sendMailPage = function(index,_group,_layer,type,needGroup)//发件箱
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	    
	sendMailGroup = _group;
	sendMailLayer = _layer;
	var bW = gbox.getImage('yj_zjm_02').width;
	var bH = gbox.getImage('yj_zjm_02').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('yj_zjm_04').width;
	var bH1 = gbox.getImage('yj_zjm_04').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;
	var sendtempX3 = (gbox.getImage('yj_zjm_02').width - gbox.getImage("yj_zjm_08").width)/2 + backdropX;
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 20;	
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'sendMailPage',
		group : needGroup,
		tileset : 'yj_zjm_02',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
		initialize : function()
		{
			if(findFriendDiv != null)
			{				
				document.body.removeChild(findFriendDiv);  
				findFriendDiv = null;
			}
			if(receiveNameDiv == null && !gbox._isIndwellDiv("receiveNameDiv","input"))
				{
					var pnX = 642;
					var pnY = 190;
					receiveNameDiv = addDivWindowBg(pnX,pnY);
					receiveNameDiv.id = 'receiveNameDiv';
					document.body.appendChild(receiveNameDiv);
		            receiveName = document.createElement("input");
		            receiveName.style.id = 'namexxx';
		            receiveName.style.backgroundColor = '#000000';
		            receiveName.style.color = '#ffffff';
		            receiveName.style.width = '100px';
		            receiveName.value = "";
		            if(returnName != null)
		            {
		            	receiveName.value = returnName;
		            }
		            receiveNameDiv.appendChild(receiveName);
				}
			if(titleNameDiv == null && !gbox._isIndwellDiv("titleNameDiv","input"))
				{
					var pnX = 642;
					var pnY = 215;
					titleNameDiv = addDivWindowBg(pnX,pnY);
					titleNameDiv.id = 'titleNameDiv';
					document.body.appendChild(titleNameDiv);
		            titleName = document.createElement("input");
		            titleName.style.id = 'name';
		            titleName.style.backgroundColor = '#000000';
		            titleName.style.color = '#ffffff';
		            titleName.style.width = '150px';
		            titleName.value = "";
		            titleNameDiv.appendChild(titleName);
				}
             if(mailContentDiv == null && !gbox._isIndwellDiv("mailContentDiv","input"))
				{
					var pnX = 585;
					var pnY = 253;
					mailContentDiv = addDivWindowBg(pnX,pnY);
					mailContentDiv.id = 'mailContentDiv';
					document.body.appendChild(mailContentDiv);
					mailContent = document.createElement("textarea");
					mailContent.id = 'textarea1';
					mailContent.style.opacity="0.5";
					mailContent.style.backgroundColor = "#272120";
					mailContent.style.color = "#ffffff";
					mailContent.style.width = '270px';
					mailContent.style.height = '200px';
					mailContent.style.maxWidth = '270px';
					mailContent.style.maxHeight = '200px';
					mailContent.style.resize= 'none';
					mailContentDiv.appendChild(mailContent);

				}
		},
		first : function() 
		{	
			/*
			 * 控制浏览器大小变化时DIV输入框自动适配屏幕
			 */
			 adaptiveDiv(receiveNameDiv,"receiveNameDiv",642);
			 adaptiveDiv(titleNameDiv,"titleNameDiv",642);
			 adaptiveDiv(mailContentDiv,"mailContentDiv",585);
			/*======================================================*/	
		},
		myclick : function()
		{
			
			
			if(((696 < lastTouchMoveX) && (lastTouchMoveX < 778)) && ((567 < lastTouchMoveY) && (lastTouchMoveY < 593)))
			{
				var title = titleName.value;
				var addressee = receiveName.value;
				var content = mailContent.value;
				if(title == "" || addressee == "" || content == "")
				{
					alert("数据填写不完整");
				}
				else
				{
					 if(type == "inbox")
					   MailFunction.sendMail(addressee,title,content,doSendMail);
					 if(type == "social")
					   MailFunction.sendMail(addressee,title,content,doSocialSendMail);
				}
				returnName = null;
			}
			if(lastTouchMoveX > 792 && lastTouchMoveX < 873 && lastTouchMoveY > 572 && lastTouchMoveY < 598)
			{ 
				 
				 exit(getClickObjectIndex());
				 sendMailDraw = false;
				 returnName = null;
				 if(gbox._isIndwellDiv("titleNameDiv","input"))
						{
							  document.body.removeChild(titleNameDiv);  
							  titleNameDiv = null;
							  document.body.removeChild(receiveNameDiv);  
							  receiveNameDiv = null;
						} 
				 if(gbox._isIndwellDiv("mailContentDiv","input"))
						{
							  document.body.removeChild(mailContentDiv);  
							  mailContentDiv = null;
						} 	
				 if(gbox._isIndwellDiv("receiveNameDiv","input"))
						{
							  document.body.removeChild(receiveNameDiv);  
							  receiveNameDiv = null;
						} 
				 if(type == "inbox")
				 {
				 	 MailFunction.getMailList(1,3,doMailList);
					 Inbox(getClickObjectIndex(),_group,_layer);				
	                 changeMap(_layer);
				 }
				 if(type == "social")
				 {
				 	 social(getClickObjectIndex(),_group,_layer);	              	
	                 changeMap(_layer);
				 }
				
			}
			else if(lastTouchMoveX > 846 && lastTouchMoveX < 866 && lastTouchMoveY > 161 && lastTouchMoveY < 179)
			{				 
				 exit(getClickObjectIndex());
				 sendMailDraw = false;
				 returnName = null;
				 if(gbox._isIndwellDiv("titleNameDiv","input"))
						{
							  document.body.removeChild(titleNameDiv);  
							  titleNameDiv = null;
							  document.body.removeChild(receiveNameDiv);  
							  receiveNameDiv = null;
						} 
				 if(gbox._isIndwellDiv("mailContentDiv","input"))
						{
							  document.body.removeChild(mailContentDiv);  
							  mailContentDiv = null;
						} 
				if(gbox._isIndwellDiv("receiveNameDiv","input"))
						{
							  document.body.removeChild(receiveNameDiv);  
							  receiveNameDiv = null;
						} 	
				 if(type == "inbox")
				 {
				 	 MailFunction.getMailList(1,3,doMailList);
					 Inbox(getClickObjectIndex(),_group,_layer);				
	                 changeMap(_layer);
				 }
				 if(type == "social")
				 {
				 	 social(getClickObjectIndex(),_group,_layer);	              	
	                 changeMap(_layer);
				 }
			}
			else
			{
				if(type == "inbox")
				{
					sendMailPage(getClickObjectIndex(),_group,_layer,"inbox",'levelMenu_2');		
                    changeMap(_layer); 
				}
				if(type == "social")
				{
					sendMailPage(getClickObjectIndex(),_group,_layer,"social",'levelMenu_3');		
                    changeMap(_layer);
				}
				 	
			}	

		},
		blit : function()
		{
			if(isDrawUI[index] && sendMailDraw)
			{
				
				gbox.drawImage('yj_zjm_02',backdropX, backdropY); 
				gbox.drawImage('yj_zjm_04',backdropX1, backdropY1 - 8);
				gbox.drawImage('yj_zjm_08',sendtempX3, backdropY); 
				if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
					   {
					   	    gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'ty_an_17',
								tile : 0,
								dx : exitX - 2,
								dy : exitY + 6,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						    });	
					   }
					   else
					   {
					   	    gbox.blitTile(gbox.getBufferContext(),
							{
								tileset : 'ty_an_18',
								tile : 0,
								dx : exitX - 2,
								dy : exitY + 6,
								fliph : this.fliph,
								flipv : this.flipv,
								camera : this.camera,
								alpha : 1.0
						    });	
					   }
				if(((695 < touchMoveX) && (touchMoveX < 778)) && ((567 < touchMoveY) && (touchMoveY < 594)))
		               {
		               	    gbox.drawImage('ty_an_11',694,567);
		               }
		              
		        //gbox.drawImage('yj_zjm_07',715,572);
		        var rW = gbox.getImage('ty_an_11').width;
				var strW = gbox.getTextWidth("发 送",14);
				var cntX = 694 + (rW - strW)/2;
		        gbox.drawDanceString("发 送",cntX, 574,14, '#000000','#ffffff');
		        if(((786 < touchMoveX) && (touchMoveX < 869)) && ((567 < touchMoveY) && (touchMoveY < 594)))
		               {
		               	    gbox.drawImage('ty_an_11',785,567);
		               }
		        var rW = gbox.getImage('ty_an_11').width;
				var strW = gbox.getTextWidth("取 消",14);
				var cntX = 785 + (rW - strW)/2;
		        gbox.drawDanceString("取 消",cntX, 574,14, '#000000','#ffffff');	   				            
			}	
		}		
	 });

};
var viewMailPage = function(index,_group,_layer)//收件箱
{
	if(_group == 'cityMenu'){
		gbox.setRenderOrder([_group,'level_1','level_2','levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	}else
	    gbox.setRenderOrder([_group,'levelMenu_1','levelMenu_2','levelMenu_3','levelMenu_4','levelMenu_5']);
	sendMailGroup = _group;
	sendMailLayer = _layer;
	var bW = gbox.getImage('yj_zjm_03').width;
	var bH = gbox.getImage('yj_zjm_03').height;
	var backdropX = (gbox.getScreenW() - bW)/2;
	var backdropY = (gbox.getScreenH() - bH)/2;
	var bW1 = gbox.getImage('yj_zjm_04').width;
	var bH1 = gbox.getImage('yj_zjm_04').height;
	var backdropX1 = (gbox.getScreenW() - bW1)/2;
	var backdropY1 = (gbox.getScreenH() - bH1)/2;
	var viewtempX3 = (gbox.getImage('yj_zjm_03').width - gbox.getImage("yj_zjm_17").width)/2 + backdropX;
	var exitX = backdropX + bW - 35;
	var exitY = backdropY + 20;	
	isDrawUI[index] = true;
	gbox.addObject(
	{ 
		id : 'viewMailPage',
		group : 'levelMenu_2',
		tileset : 'yj_zjm_03',
		x : 0,
		y : 0,
		frame : 0,
		poly : [ [backdropX,backdropY], [backdropX + bW,backdropY], [backdropX + bW,backdropY + bH],[backdropX,backdropY + bH]],
		initialize : function()
		{
             if(viewNameDiv == null && !gbox._isIndwellDiv("viewNameDiv","input"))
				{
					var pnX = 585;
					var pnY = 253;
					viewNameDiv = addDivWindowBg(pnX,pnY);
					viewNameDiv.id = 'viewNameDiv';
					document.body.appendChild(viewNameDiv);
					viewName = document.createElement("textarea");
					viewName.id = 'textarea11';
					viewName.innerHTML = viewNameContent;
					viewName.style.opacity="0.5";
					viewName.style.backgroundColor = "#272120";
					viewName.style.color = "#ffffff";
					viewName.style.width = '270px';
					viewName.style.height = '200px';
					viewName.style.maxWidth = '270px';
					viewName.style.maxHeight = '200px';
					viewName.style.resize= 'none';
					viewName.disabled = 'disabled';
					viewNameDiv.appendChild(viewName);

				}
		},
		first : function() 
		{	
			/*
			* 控制浏览器大小变化时DIV输入框自动适配屏幕
			*/
			adaptiveDiv(viewNameDiv,"viewNameDiv",585);
			/*======================================================*/		
		},
		myclick : function()
		{
          
			if(lastTouchMoveX > 819 && lastTouchMoveX < 867 && lastTouchMoveY > 566 && lastTouchMoveY < 598)
			{ 
				 MailFunction.getMailList(1,3,doMailList);
				 document.body.removeChild(viewNameDiv);  
				 viewNameDiv = null;
				 viewMailDraw = false;
				 exit(getClickObjectIndex());
				 Inbox(getClickObjectIndex(),_group,_layer);					
                 changeMap(_layer);
			}
			else if(lastTouchMoveX > 767 && lastTouchMoveX < 818 && lastTouchMoveY > 566 && lastTouchMoveY < 595)
			{			
				 MailFunction.deleteMail(mailData[returnId].id,curPage,mailNum - 1,doDeleteMail);
				 document.body.removeChild(viewNameDiv);  
				 viewNameDiv = null;
				 viewMailDraw = false;
				 exit(getClickObjectIndex());
				 Inbox(getClickObjectIndex(),_group,_layer);					
                 changeMap(_layer);
			}
			else if(((569 < lastTouchMoveX) && (lastTouchMoveX < 653)) && ((569 < lastTouchMoveX) && (lastTouchMoveX < 652)))
			{
				MailFunction.obtainAttachment(mailData[returnId].id,doobtainAttachment);
				document.body.removeChild(viewNameDiv);  
				viewNameDiv = null;
				viewMailDraw = false;
				exit(getClickObjectIndex());
				Inbox(getClickObjectIndex(),_group,_layer);					
                changeMap(_layer);
			}
			else if(lastTouchMoveX > 846 && lastTouchMoveX < 866 && lastTouchMoveY > 161 && lastTouchMoveY < 179)
			{
				 MailFunction.getMailList(1,3,doMailList);
				 document.body.removeChild(viewNameDiv);  
				 viewNameDiv = null;
				 viewMailDraw = false;
				 exit(getClickObjectIndex());
				 Inbox(getClickObjectIndex(),_group,_layer);					
                 changeMap(_layer);
			}
			else
			{
				 viewMailPage(getClickObjectIndex(),_group,_layer);		
                 changeMap(_layer);	
			}	

		},
		blit : function()
		{
			if(isDrawUI[index] && viewMailDraw )
			{
				
				gbox.drawImage('yj_zjm_03',backdropX, backdropY);
				gbox.drawImage('yj_zjm_04',backdropX1, backdropY1 - 8);
				gbox.drawImage('yj_zjm_17',viewtempX3, backdropY); 
				if((((exitX - 2) < touchMoveX) && (touchMoveX < (exitX  + 14))) && ((( exitY + 10) < touchMoveY) && (touchMoveY < ( exitY + 25))))
					gbox.drawImage('ty_an_17',exitX - 2, exitY + 6);    
				else
				    gbox.drawImage('ty_an_18',exitX - 2, exitY + 6); 	  
				if(((768 < touchMoveX) && (touchMoveX < 817)) && ((567 < touchMoveY) && (touchMoveY < 592)))
		        {
		              gbox.drawImage('ty_an_07',767,567);
		        }
		        var rW = gbox.getImage('ty_an_07').width;
			    var strW = gbox.getTextWidth("删 除",14);
				var cntX = 767 + (rW - strW)/2;
				gbox.drawDanceString("删 除",cntX, 574,14, '#000000','#ffffff');
		        if(((569 < touchMoveX) && (touchMoveX < 653)) && ((567 < touchMoveY) && (touchMoveY < 597)))
		        {
		              gbox.drawImage('ty_an_11',569,567);
		         }
		        var rW = gbox.getImage('ty_an_11').width;
				var strW = gbox.getTextWidth("提取附件",14);
				var cntX = 569 + (rW - strW)/2;
		        gbox.drawDanceString("提取附件",cntX, 574,14, '#000000','#ffffff');
				if(((821 < touchMoveX) && (touchMoveX < 867)) && ((567 < touchMoveY) && (touchMoveY < 597)))
		        {
		              gbox.drawImage('ty_an_07',819,567);
		        }
		        //.drawImage('yj_zjm_12',828,571);
		        var rW = gbox.getImage('ty_an_07').width;
				var strW = gbox.getTextWidth("取 消",14);
				var cntX = 819 + (rW - strW)/2;
		        gbox.drawDanceString("取 消",cntX, 751,14, '#000000','#ffffff');	 
		        
		        gbox.drawString("" + addresserName,643,196,'#FFFFFF',12);	
		        Inbox.drawMailText(addressertitle,643,222,150,12);
		        for(var i =0; i<mailItem.length; i++)
		        {
		        	if(gbox.getImage(mailItem[i].item.itemIcon)!= null)
					{
						 gbox.drawImage(mailItem[i].item.itemIcon,583 + i*49,489);	
						 var drawColor;
                         switch(mailItem[i].toolTipInfo.quality)
						 {
							case 1:
								drawColor = '#FFFFFF';
								break;
							case 2:
								drawColor = '#08cc1a';
								break;
							case 3:
								drawColor = '#006cff';
								break;
							case 4:
								drawColor = '#dc00df';
								break;
							case 5:
								drawColor = '#e09900';
								break;
							case 6:
								drawColor = '#ff0000';
								break;
							}	 
							var rW = gbox.getImage(mailItem[i].item.itemIcon).width;
							var rH = gbox.getImage(mailItem[i].item.itemIcon).height;					
							gbox.strokeRect(gbox.getBufferContext(),{x:585 + i*49,y:491,w:rW - 3,h:rH -3,
						             globalAlpha:1,color:drawColor});							 	 	
					}
					else
					{
						gbox.drawString("无图",587,498 + i*45,'#FFFFFF',10);
					}
		        }
		        for(var i =0; i<mailItem.length; i++)
		        {
		        	if(((582 + i*50< touchMoveX) && (touchMoveX < 616 + i*50)) && ((488 < touchMoveY) && (touchMoveY < 522)))
		        	{
		        			//type类型 1 装备，2道具，3材料，4任务
			               	  switch(mailItem[i].type)
			               	  {
			               	  	 case 1:
			               	  	 if(touchMoveX !=0)
			               	  	   var mouseY = 0;
								   var tempH = tooltip.computEquipment(gbox.getBufferContext(),mailItem[i].toolTipInfo).height;
								   if((gbox.getScreenH() - touchMoveY) < tempH)	
								   {
										mouseY = gbox.getScreenH() - tempH;
								   }
								   else
								   {
										mouseY = touchMoveY;
								   }
			               	  	   tooltip.drawEquipment(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,mouseY,mailItem[i].toolTipInfo);
			               	  	   break;
			               	  	 case 2:
			               	  	 if(touchMoveX !=0)
			               	  	   tooltip.drawItem(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,lastTouchMoveY,mailItem[i].toolTipInfo);
			               	  	   break;
			               	  	 case 3:
			               	  	 if(touchMoveX !=0)
			               	  	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,lastTouchMoveY,mailItem[i].toolTipInfo);
			               	  	   break; 
			               	  	 case 4:
			               	  	 if(touchMoveX !=0)
			               	  	   tooltip.drawMaterial(gbox.getImage("toolTip"),gbox.getBufferContext(),lastTouchMoveX,lastTouchMoveY,mailItem[i].toolTipInfo);
			               	  	   break;               	  	   
			               	  }
		        	}
		        }
		      
			}	
		}		
	 });

}
function doSocialSendMail(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	if(data)
	{
		exit(getClickObjectIndex());	
		sendMailDraw = false;
		if(gbox._isIndwellDiv("titleNameDiv","input"))
		{
			document.body.removeChild(titleNameDiv);  
			titleNameDiv = null;
			document.body.removeChild(receiveNameDiv);  
			receiveNameDiv = null;
		} 
		if(gbox._isIndwellDiv("mailContentDiv","input"))
		{
			document.body.removeChild(mailContentDiv);  
			mailContentDiv = null;
		} 
		if(gbox._isIndwellDiv("receiveNameDiv","input"))
		{
			document.body.removeChild(receiveNameDiv);  
			receiveNameDiv = null;
		} 
		 social(getClickObjectIndex(),sendMailGroup,sendMailLayer);	              	
	     changeMap(sendMailLayer);	
	}
		
}
function doSendMail(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	if(data)
	{
		exit(getClickObjectIndex());	
		sendMailDraw = false;
		if(gbox._isIndwellDiv("titleNameDiv","input"))
		{
			document.body.removeChild(titleNameDiv);  
			titleNameDiv = null;
			document.body.removeChild(receiveNameDiv);  
			receiveNameDiv = null;
		} 
		if(gbox._isIndwellDiv("mailContentDiv","input"))
		{
			document.body.removeChild(mailContentDiv);  
			mailContentDiv = null;
		} 
		if(gbox._isIndwellDiv("receiveNameDiv","input"))
		{
			document.body.removeChild(receiveNameDiv);  
			receiveNameDiv = null;
		} 
		Inbox(getClickObjectIndex(),sendMailGroup,sendMailLayer);
		changeMap(sendMailLayer);		
	}
					
}
//邮件列表getMailList(page,status)
var mailId;
var mailTime;
var mailItem = new Array();
var viewNameContent;
function doGetMailDetail(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	addresserName = data.mail.addresserName;
    addressertitle = data.mail.title;
    mailTime = data.mail.sendTime;
    var mailDate = new Date(mailTime);
    var dateView = mailDate.getFullYear() + "年" + (mailDate.getMonth() + 1)+ "月" + mailDate.getDate() + "日" + mailDate.getHours() + "时" + mailDate.getMinutes() + "分";
    viewNameContent = data.mail.content + "("+ dateView + ")";
    mailId = data.mail.id;
    mailItem.splice(0,mailItem.length);
    for(var i = 0; i<data.attachment.items.length; i++)
    {
    	var temp = data.attachment.items[i];
    	switch(temp.type)
		{
			case 1://装备
					mailItem[i] = {
						dropAble : temp.dropAble,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellAble,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : 0,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//装备图标
						},
						toolTipInfo : 
						{
							agility : temp.toolTipInfo.agility,//敏捷
							equipmentDesc : temp.toolTipInfo.equipmentDesc,//描述
							equipmentName : temp.toolTipInfo.equipmentName,//名字
							equipmentType : temp.toolTipInfo.equipmentType,//1：武器，2：头盔，3：胸甲，4：护腿，5：腰
							heroForce : temp.toolTipInfo.heroForce,//武力
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							needLevel : temp.toolTipInfo.needLevel,//装备该物品的最低武将等级
							physique : temp.toolTipInfo.physique,//体质
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
							strategy : temp.toolTipInfo.strategy,//谋略
							strengthenAgility : temp.toolTipInfo.strengthenAgility,//身法强化附加值
							strengthenForce : temp.toolTipInfo.strengthenForce,//武力强化附加值					
							strengthenPhysique : temp.toolTipInfo.strengthenPhysique,//体质强化附加值
							strengthenStrategy : temp.toolTipInfo.strengthenStrategy,//谋虑强化附加值
							strengthenLevel : temp.toolTipInfo.strengthenLevel,//强化等级
							weaponType : temp.toolTipInfo.weaponType,//兵器方式							
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	mailItem[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	mailItem[i].toolTipInfo.isbag = true;
			        }
			        if(typeof(temp.toolTipInfo.stone1) != "undefined")
			        {
			        	mailItem[i].toolTipInfo.stone1 = true;
			        	mailItem[i].toolTipInfo.stoneName1 = temp.toolTipInfo.stone1.stoneName;
			        	mailItem[i].toolTipInfo.stoneNameDesc1 = temp.toolTipInfo.stone1.stoneNameDesc;
			        }
			        else
			        {
			        	mailItem[i].toolTipInfo.stone1 = false;
			        	mailItem[i].toolTipInfo.stoneName1 = "";
			        	mailItem[i].toolTipInfo.stoneNameDesc1 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone2) != "undefined")
			        {
			        	mailItem[i].toolTipInfo.stone2 = true;
			        	mailItem[i].toolTipInfo.stoneName2 = temp.toolTipInfo.stone2.stoneName;
			        	mailItem[i].toolTipInfo.stoneNameDesc2 = temp.toolTipInfo.stone2.stoneNameDesc;
			        }
			        else
			        {
			        	mailItem[i].toolTipInfo.stone2 = false;
			        	mailItem[i].toolTipInfo.stoneName2 = "";
			        	mailItem[i].toolTipInfo.stoneNameDesc2 = "";
			        }
			        if(typeof(temp.toolTipInfo.stone3) != "undefined")
			        {
			        	mailItem[i].toolTipInfo.stone3 = true;
			        	mailItem[i].toolTipInfo.stoneName3 = temp.toolTipInfo.stone3.stoneName;
			        	mailItem[i].toolTipInfo.stoneNameDesc3 = temp.toolTipInfo.stone3.stoneNameDesc;
			        }
			        else
			        {
			        	mailItem[i].toolTipInfo.stone3 = false;
			        	mailItem[i].toolTipInfo.stoneName3 = "";
			        	mailItem[i].toolTipInfo.stoneNameDesc3 = "";
			        }
			        //console.log("===" + mailItem[i][0]);
				    break;
				case 2://道具
					mailItem[i] = {
						amount : temp.amount,//总数
						batchUseable : temp.batchUseable,//批量使用
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : temp.useable,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//道具图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							itemName : temp.toolTipInfo.itemName,//名字
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	mailItem[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	mailItem[i].toolTipInfo.isbag = true;
			        }
					break;
				case 3://3.材料
					mailItem[i] = {
						amount : temp.amount,//总数
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						sellAble : temp.sellable,//是否可卖
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						useable : 0,//是否可以使用
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							isBound : temp.toolTipInfo.isBound,//绑定状态（0：未绑定，1：绑定）
							materialName : temp.toolTipInfo.materialName,//名字
							materialType : temp.toolTipInfo.materialType,//材料方式
							quality : temp.toolTipInfo.quality,//物品品级（1：白色，2：绿色，3：蓝色，4：紫色,5：橙色）
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	mailItem[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	mailItem[i].toolTipInfo.isbag = true;
			        }
					break;
				case 4://4.任务
					mailItem[i] = {
						amount : temp.amount,//总数
						dropAble : temp.dropable,//是否可丢弃，0不可丢弃，1可丢弃
						id : temp.id,//装备ID
						type : temp.type,//类型 1 装备，2道具，3材料，4任务
						item:
						{
							 itemIcon:temp.icon//材料图标
						},
						toolTipInfo : 
						{
							description : temp.toolTipInfo.description,//描述
							questsName : temp.toolTipInfo.questsName,//名称
						}
					};
					if(typeof(temp.toolTipInfo.isBop) != "undefined")
			        {
			        	mailItem[i].toolTipInfo.isbag = false;
			        }
			        else
			        {
			        	mailItem[i].toolTipInfo.isbag = true;
			        }
					break;
		   }     	
    }
    viewMailPage(getClickObjectIndex(),revInboxGroup,revInboxLayer);
	changeMap(revInboxLayer);
	viewMailDraw = true; 
}
function doMailList(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	selectPoly = new Array(new Array()); 
	iRectPoly = new Array(new Array());	
	iSelected = new Array();
	isSelected = false;	
	mailData = new Array();	
	tPage = data.pageCount;	
		
	if(tPage > 0 && curPage == 0)
	    curPage = 1;
	else 
	    curPage = curPage;
    if(data.mailList != null){
	    for(var i=0; i<data.mailList.length; i++){
	    	var temp = data.mailList[i];
			mailData[i] = {id:temp.id,//邮件id
				              addresser:temp.addresser,//发件人
				              title:temp.title,//邮件标题
				              sendTime:temp.sendTime,//邮件发送时间（即时到达，等于收件人接收时间），内容为：今天、昨天、更久
				              status:temp.status,//状态：0：未读，1：已读，-1：全部
				              hasAttachment:temp.hasAttachment//是否有附件：0：没有附件，非0：有附件
			};
	    }	
    }
    else
    	curPage = 0;

}
function doobtainAttachment(data)
{
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	if(data)
	{
        mailItem.splice(0,mailItem.length);
	}
}
//deleteMail
function doDeleteMail(data){
	if(typeof(data.error) != "undefined"){
		alert("系统提示：" + data.error);
		return;
	}
	selectPoly = new Array(new Array()); 
	iRectPoly = new Array(new Array());	
	iSelected = new Array();
	isSelected = false;	
	mailData = new Array();	
	tPage = data.pageCount;	
		
	if(tPage > 0 && curPage == 0)
	    curPage = 1;
	else 
	    curPage = curPage;
    if(data.mailList != null){
	    for(var i=0; i<data.mailList.length; i++){
	    	var temp = data.mailList[i];
			mailData[i] = {id:temp.id,//邮件id
				              addresser:temp.addresser,//发件人
				              title:temp.title,//邮件标题
				              sendTime:temp.sendTime,//邮件发送时间（即时到达，等于收件人接收时间），内容为：今天、昨天、更久
				              status:temp.status,//状态：0：未读，1：已读，-1：全部
				              hasAttachment:temp.hasAttachment//是否有附件：0：没有附件，非0：有附件
			};
	    }	
    }
    else
    	curPage = 0;	
    mailIds = new Array();
}

Array.prototype.del= function(n)
{     
  if(n<0)     
    return this;   
  else   
    return this.slice(0,n).concat(this.slice(n+1,this.length));   
    /**//* 
      concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。   
      　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)   
     　　　　　　组成的新数组，这中间，刚好少了第n项。   
      slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。   
    */ 
}