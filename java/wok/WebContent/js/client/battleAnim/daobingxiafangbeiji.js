/*
 * 刀兵下方被击
 */
battlefield.animationFactory.daobingxiafangbeiji = function(){
this.clip = [[12, 165, 176, 87], [17, 32, 157, 80], [36, 453, 175, 89], [45, 581, 176, 102], [20, 309, 196, 100], [215, 39, 159, 78], [220, 161, 176, 86], [247, 451, 175, 91], [259, 315, 147, 77], [273, 597, 171, 80], [418, 40, 163, 81], [467, 315, 174, 81], [439, 163, 190, 88], [503, 447, 175, 94], [625, 35, 168, 87], [693, 313, 175, 81], [682, 150, 184, 105], [743, 439, 175, 96], [832, 36, 173, 92], [937, 307, 175, 84], [910, 165, 208, 92], [997, 443, 175, 97], [1032, 32, 176, 93], [1163, 299, 175, 86], [1140, 163, 190, 99], [1226, 431, 175, 100], [1257, 38, 176, 90], [229, 351, 1, 1]];
this.frame = [
[
[9, 0, 0, false, false], 
[1, 8, -11, false, false]
], 
[
[9, 0, 0, false, false], 
[5, 5, -8, false, false]
], 
[
[9, 0, 0, false, false], 
[10, 4, -12, false, false]
], 
[
[9, 0, 0, false, false], 
[14, 3, -19, false, false]
], 
[
[9, 0, 0, false, false], 
[18, 3, -20, false, false]
], 
[
[9, 0, 0, false, false], 
[22, 1, -17, false, false]
], 
[
[9, 0, 0, false, false], 
[26, 0, -13, false, false]
], 
[
[9, 0, 0, false, false], 
[0, 0, -10, false, false]
], 
[
[9, 0, 0, false, false], 
[6, 0, -9, false, false]
], 
[
[9, 0, 0, false, false], 
[12, -8, -7, false, false]
], 
[
[9, 0, 0, false, false], 
[16, -4, -25, false, false]
], 
[
[9, 0, 0, false, false], 
[20, -5, -13, false, false]
], 
[
[9, 0, 0, false, false], 
[24, -4, -16, false, false]
], 
[
[9, 0, 0, false, false], 
[4, -7, -13, false, false]
], 
[
[9, 0, 0, false, false], 
[11, 1, -4, false, false]
], 
[
[9, 0, 0, false, false], 
[15, 1, -5, false, false]
], 
[
[9, 0, 0, false, false], 
[19, 1, -6, false, false]
], 
[
[9, 0, 0, false, false], 
[23, 0, -6, false, false]
], 
[
[9, 0, 0, false, false], 
[2, -1, -6, false, false]
], 
[
[9, 0, 0, false, false], 
[7, -2, -7, false, false]
], 
[
[9, 0, 0, false, false], 
[13, -2, -8, false, false]
], 
[
[9, 0, 0, false, false], 
[17, -2, -9, false, false]
], 
[
[9, 0, 0, false, false], 
[21, -3, -8, false, false]
], 
[
[9, 0, 0, false, false], 
[25, -3, -9, false, false]
], 
[
[9, 0, 0, false, false], 
[3, -3, -10, false, false]
], 
[
[9, 0, 0, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
this.speed = 25;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -87;
 this.offsetY = -38;
};
battlefield.animationFactory.daobingxiafangbeiji.prototype = new Animation;