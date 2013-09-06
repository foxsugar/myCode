//处刑
battlefield.animationFactory.chuxing = function()
{
this.clip = [[12, 230, 213, 205], [12, 15, 217, 193], [40, 462, 162, 102], [251, 15, 213, 190], [254, 230, 211, 208], [437, 206, 2, 1], [465, 103, 4, 2], [491, 233, 223, 200], [491, 16, 208, 187], [715, 15, 209, 193], [740, 238, 225, 195], [800, 434, 2, 1], [827, 209, 1, 1]];
this.frame = [
[
[1, 1, 1, false, false]
], 
[
[3, 1, 0, false, false]
], 
[
[8, 1, 7, false, false]
], 
[
[9, 2, 5, false, false]
], 
[
[0, 2, -4, false, false]
], 
[
[4, 2, -7, false, false]
], 
[
[7, 2, -12, false, false]
], 
[
[10, 2, -2, false, false]
], 
[
[2, 45, 47, false, false]
], 
[
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 9, 9, 9, 9];
this.speed = 70;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -125;
 this.offsetY = -100;
};
battlefield.animationFactory.chuxing.prototype = new Animation;
