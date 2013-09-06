/**
  *聊天 
  *
  * Message对象属性：
  * byte type;//0： 世界，1：国家，2：联盟，3：私聊
  * int from;//发言人id：-1：系统
  * String fromName;//发言人名字
  * int to;//发送到的频道id
  * String content;
  * long time;
 */

var Chat = {};
Chat._fontSize = 8;//字体大小
Chat._bufferLimit = 50;//缓存的消息最大条数
Chat._classes = ["_world","_country","_alliance","_personal"];//发送频道的样式
Chat.init = function(){
	$(".chatDiv").css("left",$("#canvas").offset().left-1);
	$(window).resize(function(){
		$(".chatDiv").css("left",$("#canvas").offset().left-1);
	});
	var x = $("#channels ._channel");
	x.click(function(){
		x.each(function(){
			$(this).removeClass("selected");
		});
		$(this).addClass("selected");
		var id = parseInt($(this).attr("id").split("_")[1]);
		Chat._reciveChannel = id;
		Chat._showMessage();
		if(id >= 0){
			$("#send_channel").removeClass(Chat._classes[Chat._sendChannel]);
			$("#send_channel").addClass(Chat._classes[id]);
			Chat._sendChannel = id;
		}
	});
	$("#content_1").mCustomScrollbar({
		theme:"light-2",
		scrollButtons:{
			enable:true
		}
	});
	$("body").click(function(e){	
		$("#name_menu").hide();
	});
	$("div").scroll(function(e){	
		$("#name_menu").hide();
	});
	$("#send_msg").click(function(){
		Chat._sendMessage($("#msg_content").val());
	});
	$("#msg_content").keydown(function(e){//回车发送消息
		if(e.keyCode == 13){
			Chat._sendMessage($("#msg_content").val());
		} 
	});
	$("#chakan").click(function(){
		$("#name_menu").hide();
		displayDestroy();
		exit(getClickObjectIndex());
		switch(com_layer)
		{
			case 'cityMenuLayer':
				enterCityMenu('cityMenu');
				changeMap('cityMenuLayer');	
				break;
			case 'environsScreen_Layer':
				EnvironsScreen();
				changeMap('environsScreen_Layer');
				break;
			case 'worldScreen_Layer':
		 		WorldScreen();
		        changeMap('worldScreen_Layer');
				break;
			case 'jiagongfangScreen_Layer':
              	jiaGongfang();
                changeMap('jiagongfangScreen_Layer');
				break;
			case 'taiweifuScreen_Layer':
              	taiweifu();
         		changeMap('taiweifuScreen_Layer');	
				break;
			case 'jishiScreen_Layer':
              	jishiMenu();
                changeMap('jishiScreen_Layer');
				break;
			case 'jiuguanScreen_Layer':
             	jiuguan();
             	changeMap('jiuguanScreen_Layer');	
				break;
		}
		User.getCharacterById(Chat.characterId,doCharacterById);
	});
	$("#siliao").click(function(){
		$("#msg_content").val("/"+Chat.characterName+" ");
		$("#msg_content").focus();
	});
	$("#fuzhi").click(function(){
		
	});
	$("#tianjia").click(function(){
		friend.addFriendList(Chat.characterName,doaddFriendList);
	});
}
/*
 * 创建频道
 */
Chat._createChannel = function(type,name,msgLimit,bufferLimit,interval,fontColor){
 	return {
 		type : type,//频道类型 -1：全部 0：世界 1：国家 2：联盟 3：私聊 4：系统
 		name : name,//频道名
 		msgLimit : msgLimit,//消息长度限制
 		interval : interval,//消息发送间隔 （单位：秒）
 		fontColor : fontColor,//消息颜色值
 		buffer : new Array(),//消息缓存
 		_bufferLimit : bufferLimit,
 		add : function(message){
 			if(this.buffer.length < this._bufferLimit){
 				this.buffer.push(message);
 			}else{
 				this.buffer.shift();
 				this.buffer.push(message);
 			}
 		}
 	};
 };
Chat._channels = [];
Chat._channels[0] = Chat._createChannel(0,'【世界】',30,Chat._bufferLimit,20,qualityColor[2]);//蓝色字体
Chat._channels[1]= Chat._createChannel(1,'【国家】',30,Chat._bufferLimit,10,qualityColor[1]);//绿色字体
Chat._channels[2] = Chat._createChannel(2,'【联盟】',30,Chat._bufferLimit,3,qualityColor[3]);//紫色字体
Chat._channels[3] = Chat. _createChannel(3,'【私聊】',30,Chat._bufferLimit,1,qualityColor[5]);//红色字体
Chat._channels[4] = Chat._createChannel(4,'【系统】',30,Chat._bufferLimit,0,qualityColor[4]);//橙色字体
Chat._sendChannel = 0;//发送频道 默认世界
Chat._reciveChannel = -1;//接收频道 默认全部 
 /*
  * 向缓冲区添加消息
  */
Chat._appendMessage = function (msg) {
	msg = msg.data;
	var channel = Chat._channels[msg.type];
	msg.channel = channel;
	channel.add(msg);
	Chat._showMessage();
};
	
/*
 * 显示消息
 */
Chat._showMessage = function () {
	var tempBuffer;
	if(Chat._reciveChannel == -1){
		tempBuffer = [];
		for(var i = 0;i<=4;i++){
			tempBuffer = tempBuffer.concat(Chat._channels[i].buffer);
		}
	}else{
		if(Chat._reciveChannel == 3){
			tempBuffer = Chat._channels[Chat._reciveChannel].buffer.concat(Chat._channels[4].buffer);
		}else{
			tempBuffer = Chat._channels[Chat._reciveChannel].buffer.concat(Chat._channels[3].buffer).concat(Chat._channels[4].buffer);
		}
	}
	tempBuffer.sort(function(a,b){
			return a.time - b.time;
		});
	var str = '';
	for(var i = 0;i<tempBuffer.length;i++){
		var msg = tempBuffer[i];
		str += '<p style=\'color:'+msg.channel.fontColor+'\'>' +msg.channel.name ;
		var userName = $.cookie('userName');
		if(msg.type ==4){
			str += '<span class=\'charNameBlock\''+'></span>:' + msg.content +'</p>';
		}else if(msg.type ==3 && msg.sendName == userName){
			str += '发送至<span id=\''+msg.characterId+'\' class=\'charNameBlock\''+'>[' + msg.receiveUser+']</span>:' + msg.content +'</p>';
		}else{
			str += '<span id=\''+msg.characterId+'\' class=\'charNameBlock\''+'>[' + msg.sendName+']</span>:' + msg.content +'</p>';
		}
	}
	$('#content_1 .mCSB_container').html(str);
	$('#content_1').mCustomScrollbar('update');
    $('#content_1').mCustomScrollbar('scrollTo','bottom',{
 		 scrollInertia:400
	});
	$(".charNameBlock").click(function(e){
		Chat.characterId = this.id;
		var name = this.innerHTML;
		if(name && name.length>2){
			Chat.characterName = name.substring(1,name.length-1)
		}
		e.stopPropagation();
		$("#name_menu").css('top', e.pageY).css('left', e.pageX).show();
	});
};


Chat._sendMessage = function (content) {
	var type = Chat._sendChannel;
	//消息为空
	if (!content || !content.length) return;
	var sendName = $.cookie('userName');
	var characterId = $.cookie('8KHDKGwPQkS2tI8Cn0E7spP9DW');
	var aid = $.cookie('rSiUz1ET8J56acT9zGhBdplY1C');//alliceId
	var cid = $.cookie('Xsi8x1Ex84fza4T9zGhBdxlY1f');//country
	var flagOne = content.indexOf('/');
	var flagTwo = content.indexOf(' ');
	var receiveUser = 0;
	//私聊
	if(flagOne==0 && flagTwo>1){
		receiveUser = content.substring(1, flagTwo);
		content = content.substring(flagTwo+1);
		 $.cometd.publish('/gameSystem/chat', {
			 type: 3,
			 sendName: sendName,//消息发送者
             content: content,//发送内容
             characterId:characterId,
             receiveUser: receiveUser,//消息接收人
             time : new Date().getTime()
         });
		
	}else{
		cometd.publish('/gameSystem/chat', {
        	type: type,
        	content : content,
        	sendName : sendName,
        	characterId:characterId,
        	allianceId:aid,
        	countryId:cid,
        	time : new Date().getTime()
        });
	}
	$("#msg_content").val('');
};

Chat._fixdiv = function () {
	  //setInterval(Chat._getMessage, 2000);
};