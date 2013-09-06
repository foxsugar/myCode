//车兵上方攻击
battlefield.animationFactory.chebingshangfanggongji = function()
{
this.clip = [[4, 83, 79, 74], [5, 4, 80, 70], [93, 81, 80, 76], [93, 3, 80, 70], [182, 82, 80, 75], [182, 5, 79, 69], [272, 7, 80, 67], [273, 83, 80, 76], [364, 85, 80, 70], [364, 7, 80, 66], [455, 8, 79, 65], [545, 8, 80, 64], [635, 9, 80, 64], [725, 4, 80, 73], [865, 13, 19, 20]];
this.frame = [
[
[1, 0, 0, false, false]
], 
[
[3, 0, 0, false, false]
], 
[
[5, 0, 2, false, false]
], 
[
[6, 0, 4, false, false]
], 
[
[9, 0, 5, false, false]
], 
[
[10, 1, 6, false, false]
], 
[
[11, 0, 6, false, false]
], 
[
[12, -1, 6, false, false]
], 
[
[13, -1, -2, false, false], 
[14, 125, 4, false, false]
], 
[
[0, 0, -4, false, false]
], 
[
[2, -1, -6, false, false]
], 
[
[4, -1, -5, false, false]
], 
[
[7, 0, -6, false, false]
], 
[
[8, 0, 1, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.attack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 13];
this.attackSpeed = 70;
this.wait = [0];
this.waitSpeed = 50;
this.action = this.wait;
this.speed = this.waitSpeed;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -50;
 this.offsetY = -50;
 //选择状态 等偏移
 this.offsetX1 = -43;
 this.offsetY1 = 6;
};
battlefield.animationFactory.chebingshangfanggongji.prototype = new Animation;
