/*
 * 骑兵下方被击
 */
battlefield.animationFactory.qibingxiafangbeiji = function(){
this.clip = [[21, 129, 184, 94], [21, 12, 176, 92], [223, 18, 171, 91], [232, 130, 192, 93], [439, 20, 171, 89], [453, 125, 199, 93], [660, 20, 175, 90], [689, 133, 206, 94], [862, 23, 177, 91], [926, 131, 209, 95], [1072, 19, 178, 92], [1181, 126, 209, 95], [1279, 16, 180, 95], [1405, 134, 197, 98]];
this.frame = [
[
[13, 0, 0, false, false], 
[1, 11, -9, false, false]
], 
[
[13, 0, 0, false, false], 
[2, 7, -8, false, false]
], 
[
[13, 0, 0, false, false], 
[4, 5, -7, false, false]
], 
[
[13, 0, 0, false, false], 
[6, 2, -10, false, false]
], 
[
[13, 0, 0, false, false], 
[8, 4, -11, false, false]
], 
[
[13, 0, 0, false, false], 
[10, 5, -14, false, false]
], 
[
[13, 0, 0, false, false], 
[12, 6, -17, false, false]
], 
[
[13, 0, 0, false, false], 
[0, 6, -17, false, false]
], 
[
[13, 0, 0, false, false], 
[3, -1, -17, false, false]
], 
[
[13, 0, 0, false, false], 
[5, -4, -20, false, false]
], 
[
[13, 0, 0, false, false], 
[7, -6, -17, false, false]
], 
[
[13, 0, 0, false, false], 
[9, -7, -16, false, false]
], 
[
[13, 0, 0, false, false], 
[11, -8, -13, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12, 12, 12, 12, 12];
this.speed = 25;
/*
 *	在战场上的偏移 
 */
this.offsetX = -94;
this.offsetY = -48;
};
battlefield.animationFactory.qibingxiafangbeiji.prototype = new Animation;