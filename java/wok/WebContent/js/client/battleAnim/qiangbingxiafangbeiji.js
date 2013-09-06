/*
 * 枪兵下方被击
 */
battlefield.animationFactory.qiangbingxiafangbeiji = function(){
this.clip = [[30, 20, 164, 79], [45, 117, 167, 106], [210, 19, 170, 85], [255, 109, 167, 106], [415, 16, 171, 86], [461, 114, 167, 106], [626, 20, 171, 88], [667, 119, 167, 106], [813, 15, 173, 89], [865, 140, 170, 83], [1008, 17, 172, 90], [1209, 11, 170, 94], [1396, 11, 169, 98]];
this.frame = [
[
[9, 0, 0, false, false], 
[0, -2, -10, false, false]
], 
[
[9, 0, 0, false, false], 
[2, -8, -16, false, false]
], 
[
[9, 0, 0, false, false], 
[4, -7, -18, false, false]
], 
[
[9, 0, 0, false, false], 
[6, -6, -20, false, false]
], 
[
[9, 0, 0, false, false], 
[8, -7, -23, false, false]
], 
[
[9, 0, 0, false, false], 
[10, -6, -24, false, false]
], 
[
[9, 0, 0, false, false], 
[11, -3, -26, false, false]
], 
[
[9, 0, 0, false, false], 
[12, -2, -26, false, false]
], 
[
[9, 0, 0, false, false], 
[1, 1, -26, false, false]
], 
[
[9, 0, 0, false, false], 
[3, 1, -26, false, false]
], 
[
[9, 0, 0, false, false], 
[3, 1, -26, false, false]
], 
[
[9, 0, 0, false, false], 
[3, 1, -26, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11, 11];
this.speed = 25;
/*
 *	在战场上的偏移 
 */
this.offsetX = -84;
this.offsetY = -38;
};
battlefield.animationFactory.qiangbingxiafangbeiji.prototype = new Animation;