<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>王者之战</title>
<base href="/wok/">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/client/jquery.js"></script>
<script type="text/javascript">
	var buffer = [];
	var bufferSize = 30;
	var point = 0;
	function appendMessage(msg) {
		var message = "";
		var index = msg.content.indexOf(" ");
		if (msg.content.indexOf("/") == 0 && index > 0) {
			msg.type = 3;
			msg.content = msg.content.substr(index);
		}
		if (msg.type == 0) {
			message = "[世界]";
		} else if (msg.type == 1) {
			message = "[国家]";
		} else if (msg.type == 2) {
			message = "[联盟]";
		} else if (msg.type == 3) {
			message = "[私聊]";
		}
		message += "<font color=\"yellow\">[" + msg.fromName + "]</font>" + ":" + msg.content + "<br />";
		if (point == bufferSize) {
			for ( var i = 0; i <= point - 2; i++) {
				buffer[i] = buffer[i + 1];
			}
			buffer[point - 1] = message;
		} else {
			buffer[point++] = message;
		}
		var message_array = "";
		for ( var i = 0; i < buffer.length; i++) {
			message_array += buffer[i];
		}
		var div_messages = document.getElementById("d_messages");
		div_messages.innerHTML = message_array;
		div_messages.scrollTop = div_messages.scrollHeight;
	}

	function getMessage() {
		$.ajaxPost("getMessage", function(data) {
			for ( var i = 0; i < data.length; i++) {
				appendMessage(data[i]);
			}
		});
	}

	function sendMessage() {
		var type = document.getElementById("type").value;
		var content = document.getElementById("content").value;
		var to = 0;
		$.ajaxPost('sendMessage', {
			type : type,
			content : content,
			to : to
		}, function(data) {
			if (data.isSuccess) {
				var msg = {
					fromName : "自己",
					content : content,
					type : type
				};
				appendMessage(msg);
			}
		});
	}
	document.onkeydown = function(e) {
		if (!e)
			e = window.event;
		if ((e.keyCode || e.which) == 13) {
			sendMessage();
		}
	};
	function fixdiv () {
		var div0=document.getElementById("div0");
		div0.style.top=document.body.scrollHeight-div0.offsetHeight-5+"px";
	};
	window.onscroll=fixdiv;
</script>
<style type="text/css">
.div0 {
	border: solid 1px black;
	width: 300px;
	position: absolute;
	left: 0px;
	background-color: #eeeeee;
}

.div1 {
	background-color: #757575;
	width: 300px;
	height: 186px;
	overflow: scroll;
	face-color：green;
　　	hightlight-color：red;
　　	3dlight-color：orange;
　　	darkshadow-color：blue;
　　	shadow-color：:yellow;
　　	arrow-color：purple;
　　	track-color：black; 
 	base-color:pink;
}
</style>
</head>
<body>
	<div class="div0" id="div0">
		<div id="d_messages" class="div1"></div>
		<select id="type" style="background: #757575">
			<option value="0">世界</option>
			<option value="1">国家</option>
			<option value="2">联盟</option>
		</select> <input id="content" style="background: #858585"/>
		<button type="button" onClick="sendMessage()">发送</button>
	</div>
	<script type="text/javascript">
		setInterval(getMessage, 2000);
		fixdiv();
	</script>
</body>
</html>