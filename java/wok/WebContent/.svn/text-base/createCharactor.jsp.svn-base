<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>创建角色</title>
<script type="text/javascript" src="js/prototype.js"></script>
<script type="text/javascript">
	function createCharacter(){
		new Ajax.Request("createCharacter",{
			method:"post",
			parameters:{characterName:$("characterName").value,sex:$("sex").value,image:$("image").value,country:$("country").value},
			onSuccess:function(x){
				var data = x.responseText.evalJSON(true);
				if(data.command=="characterExist"){
					alert("角色名已经存在！");
				}else if(data.command=="success"){
					window.location="main.jsp";
				}
			}
		});
	}
	function doCreateCharacter(data){
		if(data.command=="characterExist"){
			alert("角色名已经存在！");
		}else if(data.command=="success"){
			window.location="main.jsp";
		}
	}
</script>
</head>
<body>
创建角色
<hr />
	角色名：<input type="text" name="characterName" id="characterName" />
	<br />
	性别：
	<select name="sex" id="sex">
		<option value="0">男</option>
		<option value="1">女</option>
	</select>
	<br />
	头像：<input type="text" name="image" id="image"/>
	国家：
	<select name="country" id="country">
		<option value="1">隋</option>
		<option value="2">夏</option>
		<option value="3">魏</option>
	</select>
	<br />
	<button onClick="createCharacter()">提交</button>
	
</body>
</html>