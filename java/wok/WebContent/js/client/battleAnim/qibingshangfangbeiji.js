/*
 * 骑兵上方被击
 */
battlefield.animationFactory.qibingshangfangbeiji = function(){
this.clip = [[20, 31, 176, 94], [24, 167, 191, 101], [232, 35, 171, 97], [249, 170, 199, 99], [433, 40, 171, 98], [493, 169, 205, 100], [638, 36, 175, 97], [736, 165, 208, 104], [842, 29, 177, 97], [976, 160, 208, 106], [1045, 27, 178, 97], [1234, 157, 197, 98], [1257, 22, 180, 98], [1459, 24, 184, 99]];
this.frame = [
[
[11, 0, 0, false, false], 
[0, 3, -10, false, false]
], 
[
[11, 0, 0, false, false], 
[2, 4, -13, false, false]
], 
[
[11, 0, 0, false, false], 
[4, 1, -13, false, false]
], 
[
[11, 0, 0, false, false], 
[6, -6, -14, false, false]
], 
[
[11, 0, 0, false, false], 
[8, -11, -15, false, false]
], 
[
[11, 0, 0, false, false], 
[10, -13, -17, false, false]
], 
[
[11, 0, 0, false, false], 
[12, -14, -14, false, false]
], 
[
[11, 0, 0, false, false], 
[13, -17, -12, false, false]
], 
[
[11, 0, 0, false, false], 
[1, -19, -10, false, false]
], 
[
[11, 0, 0, false, false], 
[3, -23, -9, false, false]
], 
[
[11, 0, 0, false, false], 
[5, -21, -10, false, false]
], 
[
[11, 0, 0, false, false], 
[7, -25, -11, false, false]
], 
[
[11, 0, 0, false, false], 
[9, -20, -11, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
this.speed = 25;
/*
 *	在战场上的偏移 
 */
this.offsetX = -94;
this.offsetY = -48;
};
battlefield.animationFactory.qibingshangfangbeiji.prototype = new Animation;