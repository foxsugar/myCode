/*
 * 刀兵上方被击
 */
battlefield.animationFactory.daobingshangfangbeiji = function(){
this.clip = [[24, 32, 157, 79], [27, 161, 176, 98], [49, 320, 175, 97], [56, 470, 175, 86], [65, 601, 176, 82], [235, 35, 159, 80], [250, 159, 176, 99], [293, 318, 175, 96], [311, 608, 176, 82], [313, 465, 175, 84], [447, 45, 163, 81], [500, 158, 176, 100], [534, 314, 175, 94], [555, 606, 171, 80], [556, 453, 175, 83], [655, 31, 168, 86], [734, 161, 176, 100], [784, 314, 174, 93], [791, 443, 175, 83], [868, 29, 173, 91], [978, 165, 176, 100], [1044, 317, 175, 91], [1057, 434, 175, 83], [1107, 28, 176, 96], [1229, 172, 175, 99], [1254, 316, 175, 88], [1276, 430, 175, 83]];
this.frame = [
[
[13, 0, 0, false, false], 
[0, 5, -10, false, false]
], 
[
[13, 0, 0, false, false], 
[5, 5, -11, false, false]
], 
[
[13, 0, 0, false, false], 
[10, 0, -12, false, false]
], 
[
[13, 0, 0, false, false], 
[15, -5, -18, false, false]
], 
[
[13, 0, 0, false, false], 
[19, -9, -24, false, false]
], 
[
[13, 0, 0, false, false], 
[23, -13, -28, false, false]
], 
[
[13, 0, 0, false, false], 
[1, -15, -30, false, false]
], 
[
[13, 0, 0, false, false], 
[6, -15, -31, false, false]
], 
[
[13, 0, 0, false, false], 
[11, -15, -32, false, false]
], 
[
[13, 0, 0, false, false], 
[16, -15, -32, false, false]
], 
[
[13, 0, 0, false, false], 
[20, -15, -32, false, false]
], 
[
[13, 0, 0, false, false], 
[24, -14, -31, false, false]
], 
[
[13, 0, 0, false, false], 
[2, -14, -29, false, false]
], 
[
[13, 0, 0, false, false], 
[7, -14, -28, false, false]
], 
[
[13, 0, 0, false, false], 
[12, -14, -26, false, false]
], 
[
[13, 0, 0, false, false], 
[17, -13, -24, false, false]
], 
[
[13, 0, 0, false, false], 
[21, -13, -22, false, false]
], 
[
[13, 0, 0, false, false], 
[25, -13, -19, false, false]
], 
[
[13, 0, 0, false, false], 
[3, -13, -17, false, false]
], 
[
[13, 0, 0, false, false], 
[9, -13, -15, false, false]
], 
[
[13, 0, 0, false, false], 
[14, -13, -14, false, false]
], 
[
[13, 0, 0, false, false], 
[18, -13, -14, false, false]
], 
[
[13, 0, 0, false, false], 
[22, -13, -14, false, false]
], 
[
[13, 0, 0, false, false], 
[26, -13, -14, false, false]
], 
[
[13, 0, 0, false, false], 
[4, -14, -13, false, false]
], 
[
[13, 0, 0, false, false], 
[8, -14, -13, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 25, 25, 25, 25, 25];
this.speed = 25;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -84;
 this.offsetY = -38;
};
battlefield.animationFactory.daobingshangfangbeiji.prototype = new Animation;