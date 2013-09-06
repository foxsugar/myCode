/*
 * 进入战场
 */
battlefield.battleResult = function(isWin){
	this.oldRenderOrder = gbox.getRenderOrder();
	this.oldGroups = gbox._groups;
	gbox.setGroups([this.groupId]);
	gbox.setRenderOrder([this.groupId]);
	gbox.addObject({
		group:battlefield.groupId,
		initialize:function(){

		},
		blit:function() {
			//背景
			battlefield.battleResult.drawBg();
			//奖励
			battlefield.battleResult.drawReward();
			//人物及其他 
			battlefield.battleResult.drawMan(isWin);
			
		}
	});
	$(".chatDiv").hide();
};
//表格图片的位置
battlefield.battleResult.rw_x = 450;
battlefield.battleResult.rw_y = 200;

/*
 * 画背景
 */

battlefield.battleResult.drawBg = function (){
	var cxt = gbox.getBufferContext();
	cxt.globalAlpha=0.5;
	cxt.fillStyle="#000000";
	cxt.fillRect(0,0,1440,768);
	cxt.globalAlpha=1;
}

/*
 * 画奖励
 */
battlefield.battleResult.drawReward = function(){
	var x = battlefield.battleResult.rw_x;
	var y = battlefield.battleResult.rw_y;
	gbox.drawImage("zc_tb_89",x,y);
	//武将
	battlefield.battleResult.drawText("齐天大圣",x+145,y+100+25,"黑体 16px");
	//等级
	battlefield.battleResult.drawText("5",x+145+70,y+100,"黑体 16px");
	//健康度
	battlefield.battleResult.drawText("100",x+145+70+68,y+100,"黑体 16px");
	//兵种
	battlefield.battleResult.drawText("兵种",x+145+70+68*2,y+100,"黑体 16px");
	//数量
	battlefield.battleResult.drawText("50",x+145+70+68*3,y+100,"黑体 16px");
	//获得军功
	battlefield.battleResult.drawText("100",x+145+70+69*4,y+100,"黑体 16px");
	//获得经验
	battlefield.battleResult.drawText("50",x+145+70+72*5,y+100,"黑体 16px");
	
	//奖励或被抢夺
	battlefield.battleResult.drawText("50",x+158,y+260,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86,y+260,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86*2,y+260,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86*3,y+260,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86*4,y+260,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86*5,y+260,"黑体 16px");
	
	//战斗损失
	battlefield.battleResult.drawText("50",x+158,y+260+60,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86,y+260+60,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86*2,y+260+60,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86*3,y+260+60,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86*4,y+260+60,"黑体 16px");
	battlefield.battleResult.drawText("50",x+158+86*5,y+260+60,"黑体 16px");
}

/*
 * 画人物
 */
battlefield.battleResult.drawMan = function(isWin){
	var x = 0;
	var y = 0;
	if (isWin == true) {
		gbox.drawImage("zc_tb_90", x, y);
		gbox.drawImage("zc_tb_91", battlefield.battleResult.rw_x+290, battlefield.battleResult.rw_y);
		gbox.drawImage("zc_tb_95", battlefield.battleResult.rw_x+110, battlefield.battleResult.rw_y+225);
		//其他
		battlefield.battleResult.drawTextLeft("恭喜",battlefield.battleResult.rw_x+180,battlefield.battleResult.rw_y+355,"黑体 20px");
	}
	else if (isWin == false) {
			gbox.drawImage("zc_tb_92", x, y);
			gbox.drawImage("zc_tb_93", battlefield.battleResult.rw_x+290, battlefield.battleResult.rw_y);
			gbox.drawImage("zc_tb_94", battlefield.battleResult.rw_x+110, battlefield.battleResult.rw_y+225);
			//其他
			battlefield.battleResult.drawTextLeft("屡败屡战,屡战屡败",battlefield.battleResult.rw_x+180,battlefield.battleResult.rw_y+355,"黑体 20px");
	}else{
		return;
	}
}

battlefield.battleResult.drawText = function(text,x,y,font){
	var ctx = gbox.getBufferContext(); 
	ctx.save();
	ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";//居中对齐
	ctx.fillStyle = "white";
	ctx.font = "黑体 16px";
	ctx.fillText(text,x,y);
	ctx.restore();
}

battlefield.battleResult.drawTextLeft = function(text,x,y,font){
	var ctx = gbox.getBufferContext(); 
	ctx.save();
	ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "left";//居左对齐
	ctx.fillStyle = "white";
	ctx.font = "黑体 16px";
	ctx.fillText(text,x,y);
	ctx.restore();
}

/*
 * 退出战场
 */
battlefield.exitBattlefield = function(){
	setupTouch();
	gbox.setGroups(this.oldGroups);
	gbox.setRenderOrder(this.oldRenderOrder);
	$(".chatDiv").show();
};