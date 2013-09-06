<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%String path = request.getContextPath(); %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="<%=path %>/js/client/jquery.js"></script>
<script type="text/javascript" src="<%=path %>/js/severDataInterface/dataCometd.js"></script>
<script type="text/javascript" src="<%=path %>/js/client/jquery.cometd.js"></script>
<script type="text/javascript">
	function postFunc(){
		var params = new Array();
		if($('#param1').val()!=-2){
			params.push({paramName:$('#param1Name').val(),paramValue:$('#param1').val()});
		}
		if($('#param2').val()!=-2){
			params.push({paramName:$('#param2Name').val(),paramValue:$('#param2').val()});
		}
		if($('#param3').val()!=-2){
			params.push({paramName:$('#param3Name').val(),paramValue:$('#param3').val()});
		}
		if($('#param4').val()!=-2){
			params.push({paramName:$('#param4Name').val(),paramValue:$('#param4').val()});
		}
		if($('#param5').val()!=-2){
			params.push({paramName:$('#param5Name').val(),paramValue:$('#param5').val()});
		}
		if($('#param6').val()!=-2){
			params.push({paramName:$('#param6Name').val(),paramValue:$('#param6').val()});
		}
		console.log(params);
		var param = new Object();
		for ( var i = 0; i < params.length; i++) {
			var array_element = params[i];
			console.log("param."+array_element.paramName+"="+array_element.paramValue);
			if(array_element.paramValue==null||typeof(array_element.paramValue)=="undefined"||array_element.paramValue==""){
				console.log("param."+array_element.paramName+'=	""');
				eval("param."+array_element.paramName+'=	""');
			}else{
				console.log(typeof(array_element.paramValue));
				eval("param."+array_element.paramName+"="+array_element.paramValue);
			}
		}
		console.log(param);
		var ajaxName = $('#ajaxName').val();
		$.ajaxPost("<%=path%>/"+ajaxName,param,function(a){
		});
	}
</script>
<title>Ajax测试页</title>
</head>
<body>
<table>
<tr><td>请求路径</td><td><input id="ajaxName" value="getUserInfo"></td></tr>
<tr><td>参数1名(没有不填)</td><td><input id="param1Name"></td></tr>
<tr><td>参数1值(没有填-2)</td><td><input id="param1" value="-2"></td></tr>
<tr><td>参数2名(没有不填)</td><td><input id="param2Name"></td></tr>
<tr><td>参数2值(没有填-2)</td><td><input id="param2" value="-2"></td></tr>
<tr><td>参数3名(没有不填)</td><td><input id="param3Name"></td></tr>
<tr><td>参数3值(没有填-2)</td><td><input id="param3" value="-2"></td></tr>
<tr><td>参数4名(没有不填)</td><td><input id="param4Name"></td></tr>
<tr><td>参数4值(没有填-2)</td><td><input id="param4" value="-2"></td></tr>
<tr><td>参数5名(没有不填)</td><td><input id="param5Name"></td></tr>
<tr><td>参数5值(没有填-2)</td><td><input id="param5" value="-2"></td></tr>
<tr><td>参数6名(没有不填)</td><td><input id="param6Name"></td></tr>
<tr><td>参数6值(没有填-2)</td><td><input id="param6" value="-2"></td></tr>
	<tr><td rowspan="2"><button onclick="postFunc()"> 发送ajax请求</button></td></tr>
	
	
	</table>
</body>
</html>