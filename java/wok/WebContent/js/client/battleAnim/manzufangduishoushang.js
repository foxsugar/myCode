//蛮族方队受伤
battlefield.animationFactory.manzufangduishoushang = function(){
this.clip = [[2, 4, 181, 91], [188, 3, 175, 90], [366, 4, 187, 91], [553, 2, 189, 93], [745, 2, 199, 99], [1, 98, 208, 106], [211, 99, 208, 107], [422, 100, 207, 106], [632, 104, 211, 103], [2, 209, 209, 105], [213, 211, 208, 99], [423, 211, 209, 98], [647, 210, 262, 111]];
this.frame = [
[
[12, -37, 4, false, false], 
[0, 0, 0, false, false]
], 
[
[12, -37, 4, false, false], 
[1, 0, 1, false, false]
], 
[
[12, -37, 4, false, false], 
[2, -4, 1, false, false]
], 
[
[12, -37, 4, false, false], 
[3, -6, -3, false, false]
], 
[
[12, -37, 4, false, false], 
[4, -6, -8, false, false]
], 
[
[12, -37, 4, false, false], 
[5, -9, -18, false, false]
], 
[
[12, -37, 4, false, false], 
[6, -9, -17, false, false]
], 
[
[12, -37, 4, false, false], 
[7, -9, -16, false, false]
], 
[
[12, -37, 4, false, false], 
[8, -10, -13, false, false]
], 
[
[12, -37, 4, false, false], 
[9, -9, -12, false, false]
], 
[
[12, -37, 4, false, false], 
[10, -9, -7, false, false]
], 
[
[12, -37, 4, false, false], 
[11, -8, -8, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11, 11];
this.speed = 60;
/*
 *	在战场上的偏移 
 */
this.offsetX = -94;
this.offsetY = -48;
};
battlefield.animationFactory.manzufangduishoushang.prototype = new Animation;