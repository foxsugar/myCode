/*****登录后需要执行的函数，开启服务器推****/


var cometd=$.cometd;
var loginListener = null;

//cometd服务器地址
var cometd_url = location.protocol+"//"+location.host+"/wok/cometd";
//初始化cometd并开始和服务器握手
function initHandShake(){
	cometd.configure({
		url:cometd_url,
		autoBatch:true,
		appendMessageTypeToURL:false
		});
	cometd.handshake();
}

//批处理聊天频道的订阅
function _metaHandshake(message)
{
    if (message.successful)
    {
    	var pid = $.cookie('8KHDKGwPQkS2tI8Cn0E7spP9DW');//private 
    	var cid = $.cookie('Xsi8x1Ex84fza4T9zGhBdxlY1f');//country
    	var aid = $.cookie('rSiUz1ET8J56acT9zGhBdplY1C');//alliceId
    	cometd.batch(function(){
        	cometd.subscribe('/gameSystem/chat', Chat._appendMessage);
        	cometd.subscribe('/gameSystem/chat'+pid, Chat._appendMessage);
        	cometd.subscribe('/gameSystem/countryChat'+cid, Chat._appendMessage);
        	if(aid>0){
        	cometd.subscribe('/gameSystem/alliceChat'+aid, Chat._appendMessage);
        	}
        });
    }
}

initHandShake();
//开始监听meta数据频道数据
cometd.addListener('/meta/handshake', _metaHandshake);

 
function connectCometServer(charId,doBattleWarn,doMailWarn,doResourceChange,doBuildingQueue,friendWarn,handleGetSimpleUserinfo,resourceUpdate,messageProcess){
	initHandShake();
	cometd.onListenerException = function(exception, subscriptionHandle, isListener, message)
	{
	    console.log(exception);
	    console.log("error:"+message);
	    if (isListener)
	        this.removeListener(subscriptionHandle);
	    else
	        this.unsubscribe(subscriptionHandle);
	};
	cometd.addListener('/meta/handshake', function(message){
		if(message.successful){
			cometd.subscribe('/gameSystem/'+charId,function(cometData){
				var systemType = cometData.data.systemType;
				var data = cometData.data.systemData;
				switch (systemType) {
				case 1:
					//军情提示
					doBattleWarn(data);
					break;
				case 2:
					//邮件提示
					doMailWarn(data);
					break;
				case 3:
					//资源推送
					//console.log(data);
					doResourceChange(data);
					break;
				case 4:
					//建筑队列
					//console.log(data);
					doBuildingQueue(data);
					break;
				case 5:
					//好友申请
					friendWarn(data);
					break;
				case 6:
					//经验
					//console.log(data);
					handleGetSimpleUserinfo(data);
					break;
				case 7:
					//城郊资源
					console.log(data);
					resourceUpdate(data);
					break;
				case 8:
					//城郊资源
					console.log(data);
					messageProcess(data);
					break;
				default:
					break;
				}
			});
			loginListener = cometd.addListener('/meta/subscribe', function(message){
				if(message.successful){
					console.log("登录订阅成功");
					console.log(message.subscription);
					if(message.subscription=='/gameSystem/'+charId){
						console.log("登录成功，可发送资源");
						cometd.publish('/login',{charId:charId});
						if(loginListener){
							cometd.removeListener(loginListener);
							console.log("删除登录监听成功");
						}else{
							console.log("删除登录监听失败");
						}
					}
				}
			});
		}

//		cometd.subscribe('/gameSystem/time',function(cometData){
//			//刷新服务器时间
//			getServerTime(cometData.data.time);
//		});
	 });
}
