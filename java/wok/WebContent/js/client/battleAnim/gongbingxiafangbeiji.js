/*
 * 弓兵下方被击
 */
battlefield.animationFactory.gongbingxiafangbeiji = function(){
this.clip = [[32, 133, 179, 125], [34, 12, 159, 98], [225, 15, 163, 94], [240, 132, 185, 124], [408, 13, 175, 96], [478, 124, 197, 117], [601, 4, 174, 115], [702, 130, 184, 109], [780, 4, 172, 110], [937, 130, 197, 113], [962, 2, 192, 114], [1169, 1, 184, 111], [1168, 119, 192, 125], [1440, 56, 177, 84], [1191, 66, 1, 1], [972, 205, 1, 1], [1199, 200, 1, 1]];
this.frame = [
[
[13, 0, 0, false, false], 
[1, 6, -16, false, false]
], 
[
[13, 0, 0, false, false], 
[2, 9, -13, false, false]
], 
[
[13, 0, 0, false, false], 
[4, -6, -19, false, false]
], 
[
[13, 0, 0, false, false], 
[6, -8, -23, false, false]
], 
[
[13, 0, 0, false, false], 
[8, -2, -23, false, false]
], 
[
[13, 0, 0, false, false], 
[10, -5, -30, false, false]
], 
[
[13, 0, 0, false, false], 
[11, -7, -21, false, false]
], 
[
[13, 0, 0, false, false], 
[0, 2, -20, false, false]
], 
[
[13, 0, 0, false, false], 
[3, -1, -20, false, false]
], 
[
[13, 0, 0, false, false], 
[5, -7, -18, false, false]
], 
[
[13, 0, 0, false, false], 
[7, -4, -16, false, false]
], 
[
[13, 0, 0, false, false], 
[9, -9, -28, false, false]
], 
[
[13, 0, 0, false, false], 
[12, -13, -36, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12, 12, 12, 12];
this.speed = 25;
/*
 *	在战场上的偏移 
 */
this.offsetX = -84;
this.offsetY = -43;
};
battlefield.animationFactory.gongbingxiafangbeiji.prototype = new Animation;