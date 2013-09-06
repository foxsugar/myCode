/*
 * 进入战场
 */
battlefield.enterBattlefield = function(){
	this.oldRenderOrder = gbox.getRenderOrder();
	this.oldGroups = gbox._groups;
	gbox.setGroups([this.groupId]);
	gbox.setRenderOrder([this.groupId]);
	gbox.addObject({
		group:battlefield.groupId,
		initialize:function(){
			battlefield.anims.create();
			battlefield.topUI.create();
			document.body.removeEventListener('mousedown', mouseDown);
			document.body.removeEventListener('mousemove', mouseMove);
			document.body.removeEventListener('mouseup', mouseUp);
			gbox._screen.removeEventListener('mousedown', mouseDown);
			gbox._screen.removeEventListener('mousemove', mouseMove);
			gbox._screen.removeEventListener('mouseup', mouseUp);
			gbox._screen.removeEventListener('DOMMouseScroll',scrollFunc); 
			$("#canvas").unbind();
			$("#canvas").mousemove(battlefield.eventHandle.onmousemove);
			$("#canvas").mousedown(battlefield.eventHandle.onmousedown);
			$("#canvas").mouseup(battlefield.eventHandle.onmouseup);
			battlefield.eventHandle.createArea();
			battlefield.eventHandle.addToArea(battlefield.topUI.UI.skills,true);
			battlefield.eventHandle.addToArea(battlefield.topUI.UI.targetDebuff);
			battlefield.eventHandle.addToArea(battlefield.topUI.UI.targetBuff);
			battlefield.eventHandle.addToArea(battlefield.topUI.UI.activeDebuff);
			battlefield.eventHandle.addToArea(battlefield.topUI.UI.activeBuff);
			battlefield.eventHandle.addToArea(battlefield.topUI.UI.operations,true);
			//开始战斗
			multiBattle.beginSingleBattle();
		},
		blit:function() {
			gbox.drawImage(battlefield.backgroundImage,0,0);
			battlefield.eventHandle.draw();
			battlefield.anims.draw();
			battlefield.topUI.draw();
//			
//				var anim2 = battlefield.anims.add("soldier","daobingxiafangbeiji",3,3,true);
//			anim2.start();
//			anim2.changeAction("attack",true);
//			
//			var anim = battlefield.anims.add("soldier","chebingshangfanggongji",1,1,true)
//			anim.start();
//			anim.changeAction("attack",true);
//			var anim1 = battlefield.anims.add("soldier","chebingxiafanggongji",2,2,true)
//			anim1.start();
//			anim1.changeAction("attack",true);
			
		}
	});
	$(".chatDiv").hide();
};
/*
 * 退出战场
 */
battlefield.exitBattlefield = function(){
	setupTouch();
	gbox.setGroups(this.oldGroups);
	gbox.setRenderOrder(this.oldRenderOrder);
	$(".chatDiv").show();
};