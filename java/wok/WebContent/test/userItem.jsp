<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%String path = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<style type="text/css">
	.styleLightGreen{
	margin: 0px auto;
	margin-bottom:20px;
	border:1px solid #CCEFF5;
	background-color: #FAFCFD
}

.style1{
 float: left;
width: 800px;
height: 200px;
margin: 0px auto;
margin-bottom:20px;
border:1px solid #96C2F1;
background-color: #EFF7FF
}
.style1 h5{
margin: 1px;
background-color: #B2D3F5;
height: 24px;
}

.style2{
 float: left;
width: 800px;
height: 100px;
margin: 0px auto;
margin-bottom:20px;
border:1px solid #9BDF70;
background-color: #F0FBEB
}
.style2 h5{
margin: 1px;
background-color: #C2ECA7;
height: 24px;
}
.style3{
 float: left;
width: 800px;
height: 100px;
margin: 0px auto;
margin-bottom:20px;
border:1px solid #92B0DD;
background-color: #FFFFFf
}
.style3 h5{
margin: 1px;
background-color: #E2EAF8;
height: 24px;
}
.style5{
float:right;
width: 100px;
height: 100px;
margin: 0px auto;
margin-bottom:20px;
border:1px solid #FFCC00;
background-color: #FFFFF7
}
</style>
<script type="text/javascript" src="<%=path%>/js/prototype.js"></script>
<script type="text/javascript">
	var op_type = 0;
	function addItem2character(itemId){
		new Ajax.Request("<%=path%>/addItem2character",
				{
					parameters:{itemId:itemId},
					method:'post',
					onSuccess:function(res){
						alert(res.responseText);
					}
				});
	}
	function getAllUserItem(callBack){
		var sumData = new Array();
		new Ajax.Request("<%=path%>/getAllEquipment",
		{
			method:"post",
			onSuccess:function(x){
				var equipment = x.responseText.evalJSON(true);
				sumData["equipment"] = equipment;
				new Ajax.Request("<%=path%>/getAllMaterial",
				{
					method:"post",
					onSuccess:function(x){
						var material = x.responseText.evalJSON(true);
						sumData["material"] = material;
						new Ajax.Request("<%=path%>/getAllArticles",
						{
							method:"post",
							onSuccess:function(x){
								var articles = x.responseText.evalJSON(true);
								sumData["articles"] = articles;
								new Ajax.Request("<%=path%>/getAllMissionItem",
								{
									method:"post",
									onSuccess:function(x){
										var mission = x.responseText.evalJSON(true);
										sumData["mission"] = mission;
										callBack(sumData);
									}
								});
							}
						});
					}
				});
			}
		});
	}
	function doGetAllItem(data){
		$("userItem").innerHTML = data.equipment.length+","+data.material.length+","+data.articles.length+","+data.mission.length;
	}
	
	//function getAllUserItem(){
	//	new Ajax.Request("<%=path%>/getAllUserItem",
	//			{
	//				method:'post',
	//				onSuccess:function(x){
	//					var data = x.responseText.evalJSON(true);
	//					pude(data,"userItem");
	//				}
	//			});
	//}
	
	function pude(data,id){
		var str = "";
		for(var i=0;i<data.length;i++){
			str+=createImage(data[i]);
		}
		$(id).innerHTML = str+"<br>";
	}

	
	
	function createImage(userItem){
		var item = userItem.item;
		var str = "<img src='"+item.itemIcon+"' onerror=\"javascript:this.src='no_pic.png'\" title='"
		+item.itemName+"&#10"
		+item.itemDescription+"&#10"
		+"----------------------&#10"
		+"物品等级 "+item.itemLevel+"&#10"
		+"物品类型 "+item.itemType+"&#10"
		+"物品细分类型 "+item.itemSubType+"&#10";
		if(item.attack!=0||item.defence!=0||item.stamina!=0||item.agility!=0||item.intelligence!=0||item.commandNum!=0){
			str+="----------------------&#10";
		}
		if(item.attack!=0){
			str+="攻击 "+item.attack+"&#10";
		}
		if(item.defence!=0){
			str+="防御 "+item.defence+"&#10";
		}
		if(item.stamina!=0){
			str+="体力 "+item.stamina+"&#10";
		}
		if(item.agility!=0){
			str+="敏捷 "+item.agility+"&#10";
		}
		if(item.intelligence!=0){
			str+="智力 "+item.intelligence+"&#10";
		}
		if(item.commandNum!=0){
			str+="统率 "+item.commandNum+"&#10";
		}
		if(item.attack!=0||item.defence!=0||item.stamina!=0||item.agility!=0||item.intelligence!=0||item.commandNum!=0){
			str+="----------------------&#10";
		}
		str+="是否可使用 "+item.useAble+"&#10"
		+"是否可批量使用 "+item.packUseAble+"&#10"
		+"是否可堆叠 "+item.sumAble+"&#10"
		+"----------------------&#10";
		if(userItem.itemCounts>0){
			str+="数量 "+userItem.itemCounts+"&#10";
		}
		str+="强化级别 "+userItem.strengthLevel+"&#10";
		if(userItem.hole1!=0 || userItem.hole2!=0 || userItem.hole3!=0 || userItem.hole4!=0){
			str+="----------------------&#10";
		}
		if(userItem.hole1!=0){
			str+="插孔1 "+userItem.hole1+"&#10";
		}
		if(userItem.hole2!=0){
			str+="插孔2 "+userItem.hole2+"&#10";
		}
		if(userItem.hole3!=0){
			str+="插孔3 "+userItem.hole3+"&#10";
		}
		if(userItem.hole4!=0){
			str+="插孔4  "+userItem.hole4+"&#10";
		}
		if(userItem.hole1!=0 || userItem.hole2!=0 || userItem.hole3!=0 || userItem.hole4!=0){
			str+="----------------------&#10";
		}
		str+="物品所在位置 "+userItem.itemPosition+"&#10";
		if(userItem.heroUseId!=0){
			str+="武将ID "+userItem.heroUseId+"&#10";
		}
		str+="是否绑定 "+userItem.bindState+"&#10";
		str+="' onClick=clickImage("+userItem.userItemId+","+item.itemType+")>";
		return str;
		
	}
	function getAllEquipment(){
		new Ajax.Request("<%=path%>/getAllEquipment",
				{
					method:'post',
					onSuccess:function(x){
						var data = x.responseText.evalJSON(true);
						pude(data,"equipment");
					}
				});
	}
	function getAllArticles(){
		new Ajax.Request("<%=path%>/getAllArticles",
				{
					method:'post',
					onSuccess:function(x){
						var data = x.responseText.evalJSON(true);
						pude(data,"itemUsed");
					}
				});
	}
	function getAllMaterial(){
		new Ajax.Request("<%=path%>/getAllMaterial",
				{
					method:'post',
					onSuccess:function(x){
						var data = x.responseText.evalJSON(true);
						pude(data,"material");
					}
				});
	}
	function getAllMissionItem(){
		new Ajax.Request("<%=path%>/getAllMissionItem",
				{
					method:'post',
					onSuccess:function(x){
						var data = x.responseText.evalJSON(true);
						pude(data,"questItem");
					}
				});
	}

	function useDesign(){
		var makeCounts =$("makeCounts").value
		if(typeof(makeCounts)==undefined||makeCounts==""){
			makeCounts=-1;
		}
		new Ajax.Request("<%=path%>/makeEquipment",
				{
					parameters:{userItemIdForDesign:$("designSelect").value,makeCounts:makeCounts,userItemIdForSuccess:$("successItem").value},
					method:'post',
					onSuccess:function(res){
						alert(res.responseText);
					}
					
				});
	}
	
	function changeType(type){
		op_type = type;
	}
	
	function equipStrongFunc(){
		new Ajax.Request("<%=path%>/equipStrongFunc",
				{
					parameters:{userItemIdForEquip:$("q_equipId").value,userItemIdForStrong:$("q_stoneId").value},
					method:'post',
					onSuccess:function(x){
						var data = x.responseText.evalJSON(true);
						if(data.message == "success"){
							alert("强化成功");
							getAllUserItem();
							getAllEquipment();
							getAllMaterial();
						}else{
							alert(data.message);
						}
					}
					
				});
	}
	
	function embed(){
		new Ajax.Request("<%=path%>/embedStone",
				{
					parameters:{equipmentId:$("x_equipmentId").value,stoneId:$("x_stoneId").value,holeIndex:$("x_holeIndex").value},
					method:'post',
					onSuccess:function(x){
						var data = x.responseText.evalJSON(true);
						if(data.userItemId != undefined){
							alert("镶嵌成功");
							getAllUserItem();
							getAllEquipment();
							getAllMaterial();
						}else{
							alert(data.error);
						}
					}
					
				});
	}
	
	function clickImage(userItemId,itemType){
		if(op_type == 0){
			alert("请在右侧选择一种操作！");
		}else if(op_type == 1){
			
		}else if(op_type == 2){
			if(itemType==1){
				$("q_equipId").value=userItemId;
			}else if(itemType==3){
				$("q_stoneId").value=userItemId;
			}else{
				alert("选中的既不是装备也不是材料，不要乱点！！！");
			}
		}else if(op_type == 3){
			
		}else if(op_type == 4){
			if(itemType==1){
				$("x_equipmentId").value=userItemId;
			}else if(itemType==3){
				$("x_stoneId").value=userItemId;
			}else{
				alert("选中的既不是装备也不是材料，不要乱点！！！");
			}
		}
		
	}
	function OnSelectType(){
		new Ajax.Request("<%=path%>/getEquipCanBeMade",
				{
					parameters:{subType:$("EquipType").value},
					method:'post',
					onSuccess:function(x){
						var data = x.responseText.evalJSON(true);
						var equipSelect = $("equipSelect");
						var nodes = equipSelect.childNodes;
						var count = nodes.length;
						for(var j=0;j<count;j++){
							equipSelect.removeChild(equipSelect.firstChild);
						}
						var option;
						for(var i=0;i<data.length;i++){
							option = document.createElement("option");
							option.value=data[i].itemId;
							option.text=data[i].itemName;
							option.onclick=onSelectEquip;
							equipSelect.appendChild(option);
						}
					}
			
				});
	}
	function onSelectEquip(){
		new Ajax.Request("<%=path%>/getEquipMadeInfo",
				{
					parameters:{equipSign:$("equipSelect").value},
					method:'post',
					onSuccess:function(x){
						var data = x.responseText.evalJSON(true);
						var designSelect = $("designSelect");
						var nodes = designSelect.childNodes;
						var count = nodes.length;
						for(var j=0;j<count;j++){
							designSelect.removeChild(designSelect.firstChild);
						}
						var option;
						for(var i=0;i<data.userEquipDesign.length;i++){
							option = document.createElement("option");
							option.value=data.userEquipDesign[i].userItemId;
							option.text=data.userEquipDesign[i].itemName;
							designSelect.appendChild(option);
						}
						var successItem = $("successItem");
						var nodes = successItem.childNodes;
						var count = nodes.length;
						for(var j=0;j<count-1;j++){
							designSelect.removeChild(lastChild);
						}
						var option = document.createElement("option");
						option.value = data.successItem.userItemId;
						option.text=data.successItem.itemName;
						successItem.appendChild(option);
					}
				});
	}
	var need0;
	var need1;
	var need2;
	var need3;

	var have0;
	var have1;
	var have2;
	var have3;
	var maxCount;
	function onSelectDesign(){
			new Ajax.Request("<%=path%>/getMaxCount",
				{
					parameters:{userItemId:$("designSelect").value},
					method:'post',
					onSuccess:function(x){
					var data = x.responseText.evalJSON(true);
					$("material1").innerHTML ="需要"+data.need[0].itemName+":"+data.need[0].needItemCounts+"--------"+"玩家拥有:"+data.have[0];
					$("material2").innerHTML ="需要"+data.need[1].itemName+":"+data.need[1].needItemCounts+"--------"+"玩家拥有:"+data.have[1];
					$("material3").innerHTML ="需要"+data.need[2].itemName+":"+data.need[2].needItemCounts+"--------"+"玩家拥有:"+data.have[2];
					$("material4").innerHTML ="需要"+data.need[3].itemName+":"+data.need[3].needItemCounts+"--------"+"玩家拥有:"+data.have[3];
					need0 = data.need[0].needItemCounts;
					need1 = data.need[1].needItemCounts;
					need2 = data.need[2].needItemCounts;
					need3 = data.need[3].needItemCounts;
					have0 = data.have[0];
					have1 = data.have[1];
					have2 = data.have[2];
					have3 = data.have[3];
					maxCount = data.maxCounts;
					}
				});
	}

	function getSubType(){
		new Ajax.Request("<%=path%>/getEquipSubType",{
		method:'post',
		onSuccess:function(x){
								var data = x.responseText.evalJSON(true);
						var EquipType = $("EquipType");
						var nodes = EquipType.childNodes;
						var count = nodes.length;
						for(var j=0;j<count-1;j++){
							EquipType.removeChild(lastChild);
						}
						for(var i=0;i<data.equipSubType.length;i++){
							var option = document.createElement("option");
							option.value = data.equipSubType[i].value;
							option.text=data.equipSubType[i].name;
							option.onclick =OnSelectType; 
							EquipType.appendChild(option);
						}
		}
		});
	}
	function chooseMin(){
		if(maxCount<1){
			$("makeCounts").value =0;
			}
		$("makeCounts").value = 1;
	}
		function chooseMax(){
		$("makeCounts").value = maxCount;
	}
</script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>装备</title>
</head>
<body>
	<a href="<%=path%>/getAllItem">添加装备</a><br />
	<div class="styleLightGreen">
		<button onClick="getAllUserItem(doGetAllItem)">获取用户所有道具和装备</button>
		<div id="userItem">
		</div>
		<button onClick="getAllEquipment()">获取用户装备</button>
		<div id="equipment">
		</div>
		<button onclick="getAllArticles()">获取用户道具 </button>
		<div id="itemUsed"></div>
		<button onclick="getAllMaterial()">获取用户材料 </button>
		<div id="material"></div>
		<button onclick="getAllMissionItem()">获取用户任务物品 </button>
		<div id="questItem"></div>


	</div>
	<div class="style5">
		<input type="radio" name="type" value="1" onClick="changeType(1)" id="radio_dz"/><label for="radio_dz">打造</label><br />
		<input type="radio" name="type" value="2" onClick="changeType(2)" id="radio_qh"/><label for="radio_qh">强化</label><br />
		<input type="radio" name="type" value="3" onClick="changeType(3)" id="radio_hc"/><label for="radio_hc">宝石合成</label><br />
		<input type="radio" name="type" value="4" onClick="changeType(4)" id="radio_xq"/><label for="radio_xq">镶嵌</label><br />
	</div>
	<div class="style1">
		<h5>打造装备</h5>
		<table>
			<tr>
				<td><table>
					<tr><td><select name="EquipType" id="EquipType"></select> <button id="getSubType" onclick="getSubType()"> 获取</button>	</td></tr>
					<tr><td><select id="equipSelect"></select></td></tr>
					<tr><td><select id="designSelect"></select><select id="successItem"  ><option value="0" >无</option></select>  </td></tr>		
					<tr><td><input id="makeCounts"  value ="0" /><button onclick="useDesign()">制造装备</button></td></tr>
				</table></td>
				<td><table>
				<tr><td><div id="material1" ></div></td></tr>
				<tr><td><div id="material2"></div></td></tr>
				<tr><td><div id="material3"></div></td></tr>
				<tr><td><div id="material4"></div></td></tr>
				<tr><td><div id="material5"></div></td></tr>
				<tr><td><button onclick="chooseMin()">小</button><button onclick="chooseMax()">大</button></td></tr>
				</table></td>
			</tr>
		</table>
		</div>
	<div class="style2">
		<h5>装备强化</h5>
		装备：<input id="q_equipId" type="text" name="userItemIdForEquip" value="" />
		强化石：<input id="q_stoneId" type="text" name="userItemIdForStrong" value=""/>
		<button onclick="equipStrongFunc()">强化</button>
	</div>	
	<div class="style3">
		<h5>镶嵌宝石</h5>
		装备：<input id="x_equipmentId"  type="text"  value="" />
		插孔：<select id="x_holeIndex">
				<option value="1">插孔1</option>
				<option value="2">插孔2</option>
				<option value="3">插孔3</option>
			 </select>
		宝石：<input id="x_stoneId" type="text"  value="" />
		<button onclick="embed()">镶嵌</button>
	</div >	
	<div class="style1">
	<form action="<%=path%>/sellItemByAuction" method="post">
	ID<input id="userItemId" name="userItemId" type="text" >
	基价<input id="basePrice" name="basePrice" type="text">
	一口价<input id="fixedPrice" name="fixedPrice" type="text">
	保存时间<input id="savingTime" name="savingTime" type="text">
	<button id="sellItemByAuction" type="submit" >拍卖</button>
	</form>
	</div>
	<div class="style1">
	<form action="<%=path%>/cancelAuctionOperate" method="post">
	userItemId<input id="userItemId" name="userItemId" >
	<button id="cancelAuctionOperate" type="submit">取消</button>
	</form>
	</div>
	<div class="style1">
	<form action="<%=path%>/getItemInfoInAuction">
	类型<input id="itemType" name="itemType">
	子类型<input id="itemSubType" name="itemSubType">
	排序<input id="order" name="order">
	页数<input id="page" name="page">
	<button type="submit">查询</button>
	</form>
	</div>
	<div class="style1">
		<form action="<%=path%>/buyItemByAuction">
	物品Id<input id="userItemId" name="userItemId">
	底价<input id="bid" name="bid">
	<button type="submit">查询</button>
	</form>
	</div>
	<div class="style1">
	<button type="button" onclick="javascript:window.location='<%=path%>/getMyAuctionItem'">获得自己</button>
	</div>
	<div class="style1">
			<form action="<%=path%>/buyItemByFixePrice">
	物品Id<input id="userItemId" name="userItemId">
	<button type="submit">一口价拍卖</button>
	</form>
	</div>

</body>
</html>