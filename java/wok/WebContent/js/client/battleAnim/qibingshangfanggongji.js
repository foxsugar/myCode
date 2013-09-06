/*
 * 骑兵上方攻击
 */
battlefield.animationFactory.qibingshangfanggongji = function(){
this.clip = [[3, 5, 176, 94], [7, 233, 177, 92], [14, 118, 170, 92], [193, 8, 175, 94], [206, 236, 178, 91], [219, 106, 172, 102], [383, 8, 178, 94], [401, 235, 179, 91], [413, 120, 185, 98], [582, 7, 173, 93], [595, 236, 179, 91], [622, 127, 184, 98], [774, 0, 180, 103], [782, 233, 178, 88], [833, 132, 181, 96], [979, 233, 179, 89], [979, 0, 181, 102], [1045, 132, 197, 98], [1172, 231, 178, 89], [1179, 6, 176, 99]];
this.frame = [
[
[17, 0, 0, false, false], 
[0, 4, -10, false, false]
], 
[
[17, 0, 0, false, false], 
[3, 5, -11, false, false]
], 
[
[17, 0, 0, false, false], 
[6, 2, -11, false, false]
], 
[
[17, 0, 0, false, false], 
[9, 5, -14, false, false]
], 
[
[17, 0, 0, false, false], 
[12, -3, -25, false, false]
], 
[
[17, 0, 0, false, false], 
[16, -5, -24, false, false]
], 
[
[17, 0, 0, false, false], 
[19, 1, -21, false, false]
], 
[
[17, 0, 0, false, false], 
[2, 7, -14, false, false]
], 
[
[17, 0, 0, false, false], 
[5, 8, -24, false, false]
], 
[
[17, 0, 0, false, false], 
[8, 3, -7, false, false]
], 
[
[17, 0, 0, false, false], 
[11, 3, -9, false, false]
], 
[
[17, 0, 0, false, false], 
[14, 4, -10, false, false]
], 
[
[17, 0, 0, false, false], 
[1, 5, -8, false, false]
], 
[
[17, 2, 2, false, false], 
[4, 9, -6, false, false]
], 
[
[17, 3, 2, false, false], 
[7, 8, -5, false, false]
], 
[
[17, 1, 1, false, false], 
[10, 7, -7, false, false]
], 
[
[17, -1, 0, false, false], 
[13, 4, -6, false, false]
], 
[
[17, 0, 0, false, false], 
[15, 2, -6, false, false]
], 
[
[17, 0, 0, false, false], 
[18, 2, -8, false, false]
]
];
this.coll = [[127, 54, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.attack = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11];
this.attackSpeed = 50;
this.move = [12, 13, 14, 15, 16, 17, 18];
this.moveSpeed = 40;
this.wait = [0];
this.waitSpeed = 50;
this.action = this.wait;
this.speed = this.waitSpeed;
/*
 *	在战场上的偏移 
 */
this.offsetX = -94;
this.offsetY = -48;
};
battlefield.animationFactory.qibingshangfanggongji.prototype = new Animation;