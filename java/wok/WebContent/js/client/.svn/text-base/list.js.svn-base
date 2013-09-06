/*
	* 列表类
	* author:张建民
*/
function listClass(){
	 var isNumber = function(s){
		// 正则表达式对象
		var re = new RegExp("[0-9]", "");
		// 验证是否刚好匹配
		return re.test(s);
	};
	//判断输入的字符串是中文（可包含其它字符）
	var isChinese = function(s){
		// 正则表达式对象
		var re = new RegExp("[\\u4e00-\\u9fa5]", "");
		// 验证是否刚好匹配
		return re.test(s);
	};
	  this.init = function(  rectImg, hitImg, hit1Img, emptyImg, coverColor,itemArray, x, y, row, column, rectSpace, displayRow, isPhoto, barOffsetX, barOffsetY)
	  {
		  this._limit = itemArray.length;
	  	  this._moduleName = -1;
	  	  this.isItemCountZero = false;
		  this.maxSlipTime = 0;
		  this._isRadio = true;
		  this._passIndex = new Array();
		  this._passCnt = 0;
		  this.rectSelected = new Array();
		  this.isAllSelected = false;
	  	  this._rectImg = rectImg;
	  	  this._hitImg = hitImg;
	  	  
	  	  if(hit1Img == null || typeof(hit1Img) == 'undefined')
	  		this._hit1Img = hitImg;
	  	  else
	  		this._hit1Img = hit1Img;

	  	  this._emptyImg = emptyImg;
	  	  if(coverColor != null)
	  	       this._coverColor = coverColor;	  	       
		  this._itemContent = itemArray;
		  this.pageStartX = this._x = x + 20;
		  this.pageStartY = this._y = y + 20;
		  this._row = row;
		  this._column = column;
		  this._rectSpace = rectSpace;
		  this.entryW = this._rectSpace<<2;
		  this.entryH = this._rectSpace;
		  this.entryStartIndex = 0;
		  this.focusIndex = this.entryStartIndex;
		  this.entryStartX = this.pageStartX;
		  this.entryStartY = this.pageStartY;
		  this.pageEntryTotal = displayRow;
		  this.entryTotal = this._column;
		  this._isPhoto = isPhoto;
		  
		  this.clipRect = new RectF();		
		  this.slipBarRectF = new RectF();	
		  this.sliperRectF = new RectF();	
		  this.sliperDrawRectF = new RectF();
		  this.isChatItem = false;		 
		  this.isXqList = false;
		  this.createClipRect();
		  this.sliperW = 10;  
          this.factor = 0;
          this.isCenter = true;//自动居中
          this.fontSize = 14;
          this.fontColor = "#FFFFFF";
          this._isSpace = true;//有平均分配间距
          this.itemOffsetX = 0;//添加内容偏移量
          this.space = 0;//间距常量
          this.spaceBetween = 0;//间距变量
		  this.initSlipBar(this.clipRect.right - barOffsetX, this.clipRect.top - barOffsetY, this.clipRect.height());
		  this.setSliper(this.entryTotal*this.entryH, this.clipRect.height());
	  }
	  
//	  this.updateBar = function(index){
//	  	this.mouseUpIndex = index;
//	  }
	  
	  this.updateLevel = function(itemLevel){
	  	    this.itemLevel = itemLevel;
	  }
	  
	  this.update = function( iArray, cColor, column){
		  this._itemContent = iArray;
		  if(cColor != null)
	  	    this._coverColor = cColor;
	  	  this._column = column;
	  	  this.entryTotal = this._column;
	  }
	  
	  this.updateLocation = function( x,y,barOffsetY){
		  this.pageStartX = this._x = x + 20;
		  this.pageStartY = this._y = y + 20;
		  this.entryStartX = this.pageStartX;
		  this.entryStartY = this.pageStartY;
//		  if(typeof(this.sliperDrawRectF) != 'undefined')
//		     this.sliperDrawRectF.top = barOffsetY;
	  }
	 this.paint = function( offsetY, beginSlip, slipTime) {
		 if(isShowGuokuList){
	          gbox.setClip(gbox.getBufferContext(),
                      this.pageStartX,this.pageStartY,
                      this._rectSpace * this._row,
                      this._rectSpace * this._column);
		 }else{
	          gbox.setClip(gbox.getBufferContext(),
                      this.pageStartX,this.pageStartY,
                      gbox.getImage(this._rectImg).width * this._row + 10,
                      gbox.getImage(this._rectImg).height * this.pageEntryTotal);
		 }
			 
		 

                		  
		  this.move(offsetY, beginSlip, slipTime);
		  var index = this.entryStartIndex * this._row;
		  var scale = this._itemContent.length;
		  var tatalNum = this._itemContent[0].length;
		  //得到item总数
		  this.count = tatalNum;
		  for(var i=0; i < this.pageEntryTotal + 1; i++){
			  for(var j=0; j < this._row; j++){
			  		var x = this.entryStartX + (j * this.entryH);
				    var y = this.entryStartY + (i * this.entryH);  
					if(index < tatalNum){
						var object = this._itemContent[0][index];
						if(object instanceof Object && object.constructor==Object){
							this.drawImage(this._rectImg, x, y);
							if(typeof(object.item) != "undefined" && 
							   gbox.getImage(""+ object.item.itemIcon) != null){
							  	 var cX = x + (gbox.getImage(this._rectImg).width - gbox.getImage(object.item.itemIcon).width)/2;
							     var cY = y + (gbox.getImage(this._rectImg).height  - gbox.getImage(object.item.itemIcon).height)/2;
							    this.drawImage( "" + object.item.itemIcon, cX, cY);
							
							}
							else{
							  	 var cX = x + (gbox.getImage(this._rectImg).width - gbox.getImage("ty_an_128").width)/2;
							     var cY = y + (gbox.getImage(this._rectImg).height  - gbox.getImage("ty_an_128").height)/2;
							    this.drawImage( "ty_an_128", cX, cY);
							}
							
					           if(this._isRadio){
									//处理单选
								    if(this.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == index){
								    	if(this.rectSelected[index]){
								    		this.drawImage( this._hit1Img, x, y);	
								    	}else{
								    		this.drawImage( this._hitImg, x, y);	
								    	}			  	            
						            }
//								    else if(this.mouseUpIndex == index){
//						            	this.drawImage( this._emptyImg, x, y);
//						            }					        	   
					           }else{//处理多选
								    if(this.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == index){
								    	if(this.rectSelected[index]){
								    		this.drawImage( this._hit1Img, x, y);	
								    	}else{
								    		this.drawImage( this._hitImg, x, y);	
								    	}					  	            
						            }else if(this.rectSelected[index]){
						            	this.drawImage( this._emptyImg, x, y);
						            }					        	   
					           }
								
							    if(typeof(this._coverColor) != "undefined"){
									var rW = gbox.getImage(this._rectImg).width;
									var rH = gbox.getImage(this._rectImg).height;
									gbox.strokeRect(gbox.getBufferContext(),{x:x + 4,y:y + 4,w:rW - 8,h:rH -8,
						            globalAlpha:.4,color:this._coverColor[index]});
							    }
							if(typeof(object.amount) != "undefined" 
							          && object.amount > 0 || this.isItemCountZero){
								var rW = gbox.getImage(this._rectImg).width;
								var rH = gbox.getImage(this._rectImg).height;
								var strW = gbox.getTextWidth("" + object.amount,14);
								var cntX = x + (rW - strW);
							    var cntY = y + (rH - 14);
							    gbox.drawDanceString(object.amount, cntX,cntY,14,'#000000',this.fontColor);
								
							}	
//							console.log("我是对象！！！！");
						}
						else{

							this.drawImage(this._rectImg, x, y);
							 var scaleW = gbox.getImage(this._rectImg).width/scale;
					         var scaleH = gbox.getImage(this._rectImg).height;
					           if(this._isRadio){
									//处理单选
									if(this._moduleName == "juxiange")
									{
										if(!jsgRankCtr)//控制当聚贤阁中点出任命页面时屏蔽下层LIST绘制
										{
											if(this.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == index)
											{
										    	if(this.rectSelected[index])
										    	{
										    		this.drawImage( this._hit1Img, x, y);	
										    	}
										    	else
										    	{								    		
										    		this.drawImage( this._hitImg, x, y);								    			
										    	}						  	            
								            }
								            else if(this.mouseUpIndex == index)
								            {
								            	this.drawImage( this._emptyImg, x, y);
								            }	
										}
										
									}
									else
									{
										if(this.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == index)
										{
									    	if(this.rectSelected[index])
									    	{
									    		this.drawImage( this._hit1Img, x, y);	
									    	}
									    	else
									    	{								    		
									    		this.drawImage( this._hitImg, x, y);								    			
									    	}						  	            
							            }
							            else if(this.mouseUpIndex == index)
							            {
							            	this.drawImage( this._emptyImg, x, y);
							            }	
									}
								    				        	   
					           }else{//处理多选
								    if(this.getPageRectIndex(lastTouchMoveX,lastTouchMoveY) == index){
								    	if(this.rectSelected[index]){
								    		this.drawImage( this._hit1Img, x, y);	
								    	}else{
								    		this.drawImage( this._hitImg, x, y);	
								    	}						  	            
						            }else if(this.rectSelected[index]){
						            	this.drawImage( this._emptyImg, x, y);
						            }					        	   
					           }
						for(var a=0; a<scale; a++){
			                 //处理文字
			                 var objects = this._itemContent[a][index];
			                 
		                     //处理间距
		                     if(!this._isSpace && a > 0)
		                     {
		                    	var objW = 0;
		                    	var obj = this._itemContent[a-1][index];
								if(typeof(obj) != "undefined"){
				                    if(isChinese("" + obj) || isNumber("" + obj)){
				                    	objW = gbox.getTextWidth("" + obj,this.fontSize);
				                    }else{
										var subScale = eval(obj).length;
										for(var b=0; b<subScale; b++){
											if(gbox.getImage("" + obj[b]) != null){
												objW = gbox.getImage("" + obj[b]).width;
											}									  		
										}
				                    }
		                    	 }
		                    	 this.spaceBetween = -((-this.spaceBetween + scaleW) - objW - this.space);
		                     }else
		                         this.spaceBetween = 0;
						     if(this.isChatItem){
								 	var txtW = gbox.getTextWidth("" + objects,this.fontSize);								 	
				                    var txtX = 0;
				                  //文字是否居中
				                    if(this.isCenter)
				                    	txtX = (scaleW - txtW)/2;
				                    else
				                    	txtX = 0;
				                    
				                    
				                    var str_array = gbox.getStringsArray("" + objects, scaleW, this.fontSize);
				                    var txtY = (scaleH - (str_array.length * 20))/2;
				                    
						            if(typeof(this._coverColor) != "undefined"){	 
				                          var color = this.fontColor;
				                          if(a == 0){
				                          	color = this._coverColor[index];
				                          } 
				                          gbox.drawStringRect(str_array,x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY,scaleW,this.fontSize,color,'#000000');
			                              //gbox.drawString("" + objects, x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY ,color,this.fontSize);          	
									  
						            }else{    
						            	  gbox.drawStringRect(str_array,x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY,scaleW,this.fontSize,this.fontColor,'#000000');
			                              //gbox.drawString("" + objects, x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY ,this.fontColor,this.fontSize);          	

						            }
								  }else
								  {
									     if(isChinese("" + objects) || isNumber("" + objects)){
											 	//var txtW = gbox.getTextWidth(objects,this.fontSize);
											 	var txtW = gbox.getBufferContext().measureText(objects).width;			
							                    var txtX = 0; 
							                  //文字是否居中
							                    //console.log("scaleW = " + scaleW);
							                    if(this.isCenter)
							                    	txtX = (scaleW - txtW)/2;
							                    else
							                    	txtX = 0;
							                    
							                    
							                    var str_array = gbox.getStringsArray("" + objects, scaleW, this.fontSize);
							                    var txtY = (scaleH - (str_array.length * 20))/2;
							                    
									            if(typeof(this._coverColor) != "undefined"){	 
							                          var color = this.fontColor;
							                          if(a == 0){					                          	
							                          	color = this._coverColor[index];
							                          } 							                       
							                          //绘制多个数组文字绘制
							                           if(this._moduleName == "juxiange")
							                           {	                           	   
							                           	   var tempTxtX = 0;
							                           	   if(this.isCenter)
										                    	tempTxtX = (juxiangelistSpace[a] - txtW)/2;
										                   else
										                        tempTxtX = 0;								             
										                   var tempOffsetX = 0;
										                   for(var tempa =0; tempa<a; tempa++)
										                   {
										                   	   	tempOffsetX = tempOffsetX + juxiangelistSpace[tempa];
										                   } 
										                   var tempStartX = 576 + tempTxtX + tempOffsetX;			
										                   gbox.drawStringRect(str_array,tempStartX, y + txtY,scaleW,this.fontSize,color,'#000000');

							                           }    
							                           else
							                           {
							                           	    gbox.drawStringRect(str_array,x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY,scaleW,this.fontSize,color,'#000000');
							                           }
							                            
						                              //gbox.drawString("" + objects, x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY ,color,this.fontSize);          	
												  
									            }else{    
									            	  if(this._moduleName == "jiaofang")
									            	  {
									            	  	  var str_array1 = gbox.getStringsArray("" + objects, 330, this.fontSize);
									            	  	  var txtY1 = (scaleH - (str_array.length * 20))/2;
									            	  	  gbox.drawStringRect(str_array1,x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + 5,430,this.fontSize,this.fontColor,'#000000');  
									            	  }
									            	  else
									            	  {
									            	  	  gbox.drawStringRect(str_array,x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY,scaleW,this.fontSize,this.fontColor,'#000000');
									            	  }
         	

									            }
											  }else
											  {//处理图片											      
												  if(typeof("" + objects) != "undefined")
												  {
													  if(this.isXqList)
													  {
														    var subScale = eval(objects).length;
														  	for(var b=0; b<subScale; b++){
														  		var imgW = 0;
														  		var imgH = 0;
														  		var imgX = 0;
														  		var imgY = 0;
																 if(gbox.getImage("" + objects[b]) != null){
																 	imgW = gbox.getImage(objects[b]).width;
																 	imgH = gbox.getImage(objects[b]).height;
																 	var tmpW = imgW * subScale;
											                        // 图片是否居中
												                    if(this.isCenter)
												                    	imgX = (scaleW - tmpW)/2;
												                    else
												                    	imgX = 0;
												                    
											                        imgY = (scaleH - gbox.getImage(objects[b]).height)/2;
																    this.drawImage( "" + objects[b], x + imgX + (a * scaleW) + (b * imgW) + this.spaceBetween + this.itemOffsetX, y + imgY);
																
																}else{
																  	imgW = gbox.getImage("ty_an_128").width;
																  	imgH = gbox.getImage("ty_an_128").height;
																  	var tmpW = imgW * subScale;
																  	
											                        //图片是否居中
												                    if(this.isCenter)
												                    	imgX = (scaleW - tmpW)/2;
												                    else
												                    	imgX = 0;
												                    
												                    imgY = (scaleH - gbox.getImage("ty_an_128").height)/2;
																    this.drawImage( "ty_an_128", x + imgX + (a * scaleW) + (b * imgW) + this.spaceBetween + this.itemOffsetX, y + imgY);
																}
																
																if(typeof(this.itemLevel) != "undefined" &&
																   typeof(this.itemLevel[index]) != "undefined" &&
																   typeof(this.itemLevel[index][b]) != "undefined"){
																		var lX = x + imgX + (a * scaleW) + (b * imgW) + (imgW - 10)/2;
																		var lY = y + imgY + (imgH - 12)/2;
																		gbox.drawDanceString(this.itemLevel[index][b],lX,lY,14,'#000000','#FFFFFF');
//																		gbox.drawString(this.itemLevel[index][b],lX,lY,this.fontColor,14);
																	
																}
																							  		
														  	}
													  }else
													  {												
														  if(gbox.getImage("" + objects) != null)
														  {
															    var subScale = eval(objects).length;
															  	for(var b=0; b<subScale; b++){
															  		var imgW = 0;
															  		var imgH = 0;
															  		var imgX = 0;
															  		var imgY = 0;
																	 if(gbox.getImage(objects[b]) != null){
																	 	imgW = gbox.getImage(objects[b]).width;
																	 	imgH = gbox.getImage(objects[b]).height;
																	 	var tmpW = imgW * subScale;
												                        // 图片是否居中
													                    if(this.isCenter)
													                    	imgX = (scaleW - tmpW)/2;
													                    else
													                    	imgX = 0;
													                    
													                    
													                    //多列处理时绘制图片按钮
												                        imgY = (scaleH - gbox.getImage(objects[b]).height)/2;
												                        if(this._moduleName == "juxiange")
												                        {
												                        	 this.drawImage(objects[b], x + (juxiangelistSpace[juxiangelistSpace.length - 1] - tmpW)/2 + (a * scaleW) + (b * imgW) + this.spaceBetween + this.itemOffsetX, y + imgY);
												                        	 gbox.drawDanceString("任命",x + (juxiangelistSpace[juxiangelistSpace.length - 1] - tmpW)/2 + (a * scaleW) + (b * imgW) + this.spaceBetween + this.itemOffsetX + 10, y + imgY + 7,14,'#000000','#FFFFFF');
												                        }
												                        else
												                        {
												                        	 this.drawImage(objects[b], x + imgX + (a * scaleW) + (b * imgW) + this.spaceBetween + this.itemOffsetX, y + imgY);
												                        }
																	   
																	
																	}else{
																	  	imgW = gbox.getImage("ty_an_128").width;
																	  	imgH = gbox.getImage("ty_an_128").height;
																	  	var tmpW = imgW * subScale;
																	  	
												                        //图片是否居中
													                    if(this.isCenter)
													                    	imgX = (scaleW - tmpW)/2;
													                    else
													                    	imgX = 0;
													                    
													                    imgY = (scaleH - gbox.getImage("ty_an_128").height)/2;
																	    this.drawImage( "ty_an_128", x + imgX + (a * scaleW) + (b * imgW) + this.spaceBetween + this.itemOffsetX, y + imgY);
																	}
																	
																	if(typeof(this.itemLevel) != "undefined" &&
																	   typeof(this.itemLevel[index]) != "undefined" &&
																	   typeof(this.itemLevel[index][b]) != "undefined"){
																			var lX = x + imgX + (a * scaleW) + (b * imgW) + (imgW - 10)/2;
																			var lY = y + imgY + (imgH - 12)/2;
																			gbox.drawDanceString(this.itemLevel[index][b],lX,lY,14,'#000000','#FFFFFF');
//																			gbox.drawString(this.itemLevel[index][b],lX,lY,this.fontColor,14);
																		
																	}
																								  		
															  	}
														  }else{
															 	var txtW = gbox.getTextWidth("" + objects,this.fontSize);
											                    var txtX = 0;
											                  //文字是否居中
											                    if(this.isCenter)
											                    	txtX = (scaleW - txtW)/2;
											                    else
											                    	txtX = 0;
											                    
											                    
											                    var str_array = gbox.getStringsArray("" + objects, scaleW, this.fontSize);
											                    var txtY = (scaleH - (str_array.length * 20))/2;
											                    
													            if(typeof(this._coverColor) != "undefined"){	 
											                          var color = this.fontColor;
											                          if(a == 0){
											                          	color = this._coverColor[index];
											                          } 
											                          gbox.drawStringRect(str_array,x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY,scaleW,this.fontSize,color,'#000000');
										                              //gbox.drawString("" + objects, x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY ,color,this.fontSize);          	
																  
													            }else{    
													            	  gbox.drawStringRect(str_array,x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY,scaleW,this.fontSize,this.fontColor,'#000000');
										                              //gbox.drawString("" + objects, x + txtX + (a * scaleW) + this.spaceBetween + this.itemOffsetX, y + txtY ,this.fontColor,this.fontSize);          	

													            }
														  } 
													  }

	
												  }
											  }	
								  }

						}						
					}	
				}
				else{
					  var x = this.entryStartX + (j * this.entryH);
				      var y = this.entryStartY + (i * this.entryH);
					  this.drawImage(this._rectImg, x, y);	
					  
					  if(isShowGuokuList)
					  {
						    if(index > this._limit - 1){
							  	 var cX = x + (gbox.getImage(this._rectImg).width - gbox.getImage("ty_an_128").width)/2;
							     var cY = y + (gbox.getImage(this._rectImg).height  - gbox.getImage("ty_an_128").height)/2;
							     this.drawImage(this._emptyImg, cX, cY);
						    } 
					  }

				}
				  
				  if(index < (this._row * this._column) - 1)
					  index++;
		     }
		  }
		  gbox.restoreClip(gbox.getBufferContext());
          //gbox.setClip(gbox.getBufferContext(),0,0,1440,742);
          if(this.pageEntryTotal < this.entryTotal)
		     this.drawSlipBar();	                         	  	                         
	  }
	  
		this.getMaxEntryStartIndex = function(){
			if(this.entryTotal<=this.pageEntryTotal){
				return 0;
			}
			else{
				return this.entryTotal-this.pageEntryTotal;
			}
		}
		
		this.move = function(offsetY, beginSlip, slipTime){
			if (offsetY != 0) {
				if (offsetY > 0) {
					this.moveY(offsetY);
					if(beginSlip){
						if(slipTime==0){
							 offsetY--;
							 slipTime++;
						}
						else{
							slipTime++;
						}
						
						if(slipTime >= this.maxSlipTime){
							slipTime=0;
						}
						
						if(offsetY<0){
							offsetY=0;
							beginSlip=false;
						}
					}

				} else if (offsetY < 0) {
					this.moveY(offsetY);
					if(beginSlip){
						if(slipTime==0){
							offsetY+=1;
							 slipTime++;
						}
						else{
							slipTime++;
						}
							
						if(slipTime >= this.maxSlipTime){
							slipTime=0;
						}

						if(offsetY>0){
							offsetY=0;
							beginSlip=false;
						}
					}
				}
			}

		}

		
		this.moveY = function( offsetY ){
			if(offsetY>this.entryH/2)offsetY=this.entryH/2;
			if(offsetY<-this.entryH/2)offsetY=-this.entryH/2;

			this.entryStartY += offsetY;

			if(offsetY<0){
				if(this.entryStartIndex == this.getMaxEntryStartIndex() && this.entryStartY < this.pageStartY){
					this.entryStartY = this.pageStartY;
				}
				
				if(this.entryStartY<=this.pageStartY-this.entryH && this.entryStartIndex!=this.getMaxEntryStartIndex() ){
					this.entryStartY+=this.entryH;
					this.entryStartIndex++;
				}
			}
			else if(offsetY>0){
				if(this.entryStartIndex==0 && this.entryStartY>this.pageStartY){
					this.entryStartY = this.pageStartY;
				}
				
				if(this.entryStartY>=this.pageStartY && this.entryStartIndex!=0 ){
					this.entryStartY-=this.entryH;
					this.entryStartIndex--;
				}
			}
			
		}
		
		this.keyUp = function(){
	          if (this.entryTotal > 1) {
	              if (this.entryStartIndex > 0) {
	            	if (this.focusIndex / this._rectSpace <= this.entryStartIndex) {
	                	this.entryStartIndex--;
	                }
	              }
	              if (this.focusIndex >= this._rectSpace) {
	                this.focusIndex -= this._rectSpace;
	              }
	            }
		}
		
		this.keyDown = function(){
	          if (this.entryTotal > 1) {
	        	  var listBarH = this.slipBarRectF.height();
	              if ((this.entryTotal - (listBarH/this._rectSpace)) > this.entryStartIndex) {
	            	if (this.focusIndex / this._rectSpace >= this.entryStartIndex) {
	                	this.entryStartIndex++;
	                }
	            	this.focusIndex += this._rectSpace;
	              }
	            }
		}
		
		this.createClipRect = function(){
             this.clipRect.init(this.pageStartX,this.pageStartY,
                               this.pageStartX+this.entryW,
                               this.pageStartY+this.pageEntryTotal*this.entryH,
                               1,'#000000');
		}
		
		this.initSlipBar = function( sx, sy, sh ){
			this.imgW = gbox.getImage('ty_tdt_19').width;
			this.imgH = gbox.getImage('ty_tdt_19').height;
			this.listPoly = [ [sx,sy + this.imgH], [sx + (this.sliperW+2),sy + this.imgH], [sx + (this.sliperW+2),sy + sh - this.imgH],[sx,sy + sh - this.imgH]];

			this.upPoly = [ [sx,sy], [sx + (this.imgW+2),sy], [sx + (this.imgW+2),sy + this.imgH],[sx,sy + this.imgH]];
			this.downPoly = [ [sx,sy + sh - this.imgH], [sx + (this.imgW+2),sy + sh - this.imgH], [sx + (this.imgW+2),sy + sh],[sx,sy + sh]];
			this.slipBarRectF.init(sx, sy, sx+this.sliperW+2, sy+sh,1,'#000000');
			this.sliperRectF.init(this.slipBarRectF.left+1, this.slipBarRectF.top,this.slipBarRectF.right-1, 0,1,'#000000');
			this.sliperDrawRectF.init(this.sliperRectF.left,this.sliperRectF.top,this.sliperRectF.right,this.sliperRectF.bottom,this.sliperRectF.alpha,'#FFFF00');
		}
 		
		 this.setSliper = function( contentH, displayH ){
		 	 this.factor = contentH/this.slipBarRectF.height();
			 if(this.factor>=1){
				 this.sliperRectF.bottom=this.sliperRectF.top + displayH/this.factor;
			 }
			 else if(this.factor<1 && this.factor!=0){
				 this.sliperRectF.bottom=this.slipBarRectF.bottom;
			 }
			 else{ 
				 this.sliperRectF.bottom = this.sliperRectF.top;
			 }
		 }
 		
		 this.moveSliper = function(offsetY){
			 if(this.factor>=1){
				 this.sliperDrawRectF.top=this.sliperRectF.top + offsetY/this.factor;
				 this.sliperDrawRectF.bottom=this.sliperDrawRectF.top+this.sliperRectF.height();
			 }
			 else if(this.factor<1&& this.factor!=0){
				 this.sliperDrawRectF.top=this.sliperRectF.top;
				 this.sliperDrawRectF.bottom=this.sliperRectF.bottom;
			 }
			 else{
				 this.sliperDrawRectF.top=this.sliperRectF.top;
				 this.sliperDrawRectF.bottom=this.sliperDrawRectF.top+this.sliperRectF.height();
			 }
		 }

		 this.drawSlipBar = function() {

			 if(this.entryTotal==0){
				 return;
			 }
			 this.moveSliper(this.entryStartIndex*this.entryH+this.clipRect.top-this.entryStartY);

 			var rect = new Rect(this.slipBarRectF.left,this.slipBarRectF.top,this.slipBarRectF.width(),this.slipBarRectF.height());
 			gbox._roundRectanglePath(gbox.getBufferContext(),rect, 3,"#342D21","#CCCCCC",true);
   			var rect = new Rect(this.sliperDrawRectF.left + 2,this.sliperDrawRectF.top + 15,
		            6,this.sliperDrawRectF.height() - 30);
            gbox._roundRectanglePath(gbox.getBufferContext(),rect, 5,"#C48320","#000000",true);
             var jianTou_CX = (gbox.getImage('ty_tdt_01').width - gbox.getImage('ty_tdt_19').width)/2;
             gbox.drawImage('ty_tdt_16',this.slipBarRectF.left-9 + jianTou_CX,this.slipBarRectF.top + 3);
             if(gbox._mouseArea(this.upPoly,lastTouchMoveX,lastTouchMoveY)){ 
            	 gbox.drawImage('ty_tdt_17',this.slipBarRectF.left-9 + jianTou_CX,this.slipBarRectF.top + 3);
             }
             gbox.drawImage('ty_tdt_18',this.slipBarRectF.left-9 + jianTou_CX,this.slipBarRectF.top + this.slipBarRectF.height() - gbox.getImage('ty_tdt_19').height - 3);
             if(gbox._mouseArea(this.downPoly,lastTouchMoveX,lastTouchMoveY)){ 
            	 gbox.drawImage('ty_tdt_19',this.slipBarRectF.left-9 + jianTou_CX,this.slipBarRectF.top + this.slipBarRectF.height() - gbox.getImage('ty_tdt_19').height - 3);
             }
             
		 }
		
		
		  this.getPageCardIndex = function( x,  y ){
		 		var px = (gbox.getScreenW()- 667)/2;
				var py = (gbox.getScreenH() - 384)/2;
				var pbw = 138;
				var pbh = 60;
				for(var i=0; i<3; i++){
					var pbx = px + 667 - ((i * pbw) + pbw + 5);
					var pby = py;
					if(x > pbx && x < pbx + pbw &&
					   y > pby && y < pby + pbh){
						this.pageIndex = i;
						return true;
					}
			  }
				return false;
		  }
		  
		 this.getPageRectIndex = function( x, y ){
			  var rectW = gbox.getImage(this._rectImg).width;
			  var rectH = gbox.getImage(this._rectImg).height;
			  var tatalNum = this._itemContent[0].length;
			  var index = this.entryStartIndex * this._row;
			  var clipW = this._rectSpace<<2;
			  var clipH = this._rectSpace + rectH;
			  
			  // if(x > _x && x < _x + clipW &&
					  // y > _y && y < _y + clipH){
				  for(var i=0; i < this.pageEntryTotal + 1; i++){
					  for(var j=0; j < this._row; j++){
					  	
						  if(index < tatalNum){
						      var px = this.entryStartX + (j * this._rectSpace);
					    	  var py = this.entryStartY + (i * this._rectSpace);
								if(x > px && x < px + rectW &&
										   y > py && y < py + rectH){
									        this.focusIndex = index;
											return index;
								}
						  }else{
//							  this.focusIndex = -1;
							  return -1;
						  }
	
				    	  
							  if(++index >= (this._row * this._column))
								  break;
					  }
				  }
			  // }
//			  this.focusIndex = -1;
			  return -1;
		  }
	  this.drawImage = function( _img, _desX, _desY )
	  {
	  	gbox.blitTile(gbox.getBufferContext(),
		{
			tileset : _img,
			tile : 0,
			dx :_desX,
			dy :_desY,
			fliph : this.fliph,
			flipv : this.flipv,
			camera : this.camera,
			alpha : 1.0
		 }); 
	  };

	  this.radioHandle = function(index){
		  	this.mouseUpIndex = index;
		  	for(var i=0; i<this.rectSelected.length; i++)
	  		    this.rectSelected[i] = false;
		  	if(!this.rectSelected[index]){
		  		this.rectSelected[index] = true;
		  	}
	  }
	  
	  this.mulripleHandle = function(index){
		  this._isRadio = false;
			if(typeof(this._itemContent) != "undefined" && 
					typeof(this._itemContent[0]) != "undefined"){
				for(var i = 0 ; i<this._itemContent[0].length; i++)
				{	
					if(index == i){
						console.log("mmmmIndex ===== " + index);
						if(!this.rectSelected[i]){
							this.rectSelected[i] = true;
							this._passIndex[this._passCnt++] = i;
						}else{
							this.rectSelected[i] = false;
							for(var j=0; j<this._passIndex.length; j++){
								if(index == this._passIndex[j]){
									this._passIndex = this._passIndex.del(j);
									this._passCnt = this._passIndex.length;
								}
							}

						}
					
				    }
				}
			}else
		 		alert("没有数据！");
			console.log("mulriple_passIndex ===== " + this._passIndex.toString());		  	  
	  };

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
	  };
	  
	  this.entirelyHandle = function(){
		  this._isRadio = false;
			if(typeof(this._itemContent) != "undefined" && 
			   typeof(this._itemContent[0]) != "undefined" &&
			   this._itemContent[0].length > 0){
				
				this._passIndex = new Array();
				this._passCnt = 0;
				for(var i = 0 ; i<this._itemContent[0].length;i++)
				{
					this.rectSelected[i] = true;
					this._passIndex.push(i);
				}	
			}else
		 		alert("没有数据！");
			console.log("entirely_passIndex ===== " + this._passIndex.toString());			  	  
	  }; 
	  
	  this.entirelyHandle1 = function(){
		  this._isRadio = false;
			if(typeof(this._itemContent) != "undefined" && 
					typeof(this._itemContent[0]) != "undefined"){
				for(var j=0; j<this._passIndex.length; j++){
					this.rectSelected[this._passIndex[j]] = false;
				}
				this._passIndex = new Array();
				this._passCnt = 0;
			}else
		 		alert("没有数据！");
			console.log("entirely_passIndex ===== " + this._passIndex.toString());			  	  
	  }; 
}

