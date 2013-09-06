//箭阵
battlefield.animationFactory.jianzhen = function()
{
this.clip = [[31, 106, 53, 182], [121, 39, 148, 273], [287, 15, 140, 294], [434, 19, 227, 313], [700, 12, 215, 321], [941, 37, 280, 296], [1235, 47, 252, 284], [1515, 49, 259, 271], [1802, 47, 217, 278], [2037, 48, 206, 261], [2256, 47, 215, 267]];
this.frame = [
[
[0, 152, -187, false, false]
], 
[
[0, 138, -127, false, false]
], 
[
[1, 98, -100, false, false]
], 
[
[2, 85, -52, false, false]
], 
[
[3, 23, 10, false, false]
], 
[
[4, 22, 5, false, false]
], 
[
[5, 23, 34, false, false]
], 
[
[7, 287, 54, true, false]
], 
[
[6, 7, 46, false, false]
], 
[
[7, -2, 56, false, false]
], 
[
[8, 15, 57, false, false]
], 
[
[9, 23, 54, false, false]
], 
[
[10, 16, 52, false, false]
], 
[
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action =[1, 2, 3, 4, 4, 5, 5, 6, 6, 8, 9, 9, 10, 11, 11, 12, 12];
this.speed = 70;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -135;
 this.offsetY = -220;
};
battlefield.animationFactory.jianzhen.prototype = new Animation;