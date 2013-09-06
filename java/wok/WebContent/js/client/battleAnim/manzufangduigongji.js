//蛮族方队攻击
battlefield.animationFactory.manzufangduigongji = function(){
this.clip = [[1, 1, 184, 92], [188, 1, 187, 93], [379, 1, 194, 94], [577, 2, 192, 93], [2, 95, 180, 92], [189, 96, 180, 90], [377, 97, 179, 119], [568, 98, 204, 89], [3, 188, 197, 92], [203, 189, 198, 90], [400, 217, 186, 94], [591, 189, 180, 91], [2, 282, 182, 93], [188, 283, 183, 93], [559, 284, 229, 118]];
this.frame = [
[
[14, -20, -2, false, false], 
[0, 0, 0, false, false]
], 
[
[14, -20, -2, false, false], 
[1, 3, 0, false, false]
], 
[
[14, -18, -2, false, false], 
[2, 4, 1, false, false]
], 
[
[14, -14, -2, false, false], 
[3, 5, 2, false, false]
], 
[
[14, -12, -2, false, false], 
[4, 5, 3, false, false]
], 
[
[14, -15, -2, false, false], 
[5, 4, 3, false, false]
], 
[
[14, -22, -2, false, false], 
[6, 3, -24, false, false]
], 
[
[14, -27, -2, false, false], 
[7, -30, 2, false, false]
], 
[
[14, -28, -2, false, false], 
[8, -28, 3, false, false]
], 
[
[14, -29, -2, false, false], 
[9, -27, 2, false, false]
], 
[
[14, -29, -2, false, false], 
[10, -15, 0, false, false]
], 
[
[14, -30, -2, false, false], 
[11, -4, 2, false, false]
], 
[
[14, -25, -2, false, false], 
[12, -2, 2, false, false]
], 
[
[14, -26, -2, false, false], 
[13, 0, 3, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 13, 13];
this.speed = 80;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -84;
 this.offsetY = -38;
};
battlefield.animationFactory.manzufangduigongji.prototype = new Animation;