//蛊惑
battlefield.animationFactory.guhuo = function()
{
this.clip = [[6, 5, 241, 208], [249, 5, 226, 210], [481, 5, 223, 223], [708, 6, 281, 223], [9, 220, 231, 226], [248, 226, 218, 218], [481, 235, 206, 211]];
this.frame = [
[
[0, -8, 4, false, false]
], 
[
[1, -10, 5, false, false]
], 
[
[2, -20, 9, false, false]
], 
[
[3, -40, 4, false, false]
], 
[
[4, -8, 1, false, false]
], 
[
[5, 3, 9, false, false]
], 
[
[6, -14, 18, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6];
this.speed = 180;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -100;
 this.offsetY = -150;
};
battlefield.animationFactory.guhuo.prototype = new Animation;
