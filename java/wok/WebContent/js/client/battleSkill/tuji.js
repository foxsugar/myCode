battlefield.animationFactory.tuji = function()
{
this.clip = [[10, 45, 157, 167], [183, 44, 149, 169], [352, 51, 196, 159], [567, 59, 158, 152], [764, 62, 179, 151], [969, 61, 179, 182], [1170, 66, 152, 162]];
this.frame = [
[
[0, 14, -4, false, false]
], 
[
[1, 17, -9, false, false]
], 
[
[2, -3, -12, false, false]
], 
[
[3, 21, -11, false, false]
], 
[
[4, 6, -14, false, false]
], 
[
[5, 14, -10, false, false]
], 
[
[6, 20, 2, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6];
this.speed = 60;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -88;
 this.offsetY = -87;
};
battlefield.animationFactory.tuji.prototype = new Animation;