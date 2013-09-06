/*
 * 图片动画类
 */
var Num2name = function(){
	
};

Num2name.prototype.size = 50;//伤害 增益 图片尺寸 50*50
Num2name.prototype.round = ["zc_tb_31","zc_tb_32","zc_tb_33","zc_tb_34","zc_tb_35","zc_tb_36","zc_tb_37","zc_tb_38","zc_tb_39","zc_tb_40","zc_tb_50",];//1,2,3,4,5,6,7,8,9,10,20

/*
 * 获取回合数
 */
Num2name.prototype.getRoundImages = function(number){
	var imgArray = new Array;
	if(number <= 10){
		imgArray.push(this.round[number-1]);
	}else if(number <= 19){
		imgArray.push(this.round[9]);
		imgArray.push(this.round[number%10 -1]);
	}else if(number == 20){
		imgArray.push(this.round[10]);
	}else if(number <30){
		imgArray.push(this.round[10]);
		imgArray.push(this.round[number%20 -1]);
	}else if(number == 30){
		imgArray.push(this.round[2]);
		imgArray.push(this.round[9]);
	}else{
		console.log("错误的回合数:"+number);
	}
	return imgArray;
}

/*
 * 获取增加 减少数字
 */
Num2name.prototype.getImages = function(number){
	var str = number.toString(10);
	var imgArray = new Array;
	for(var i=0;i<str.length;i++){
		imgArray.push(str.charAt(i)*this.size);
	}
	return imgArray;
}

battlefield.num2name = new Num2name;
