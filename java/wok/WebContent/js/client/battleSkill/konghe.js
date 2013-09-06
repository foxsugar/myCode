//恐吓
battlefield.animationFactory.konghe = function()
{
this.clip = [[1, 2, 171, 177], [173, 3, 210, 205], [385, 2, 218, 212], [605, 2, 231, 213], [2, 210, 215, 239], [218, 218, 223, 241], [443, 216, 202, 243], [648, 218, 197, 228]];
this.frame = [
[
[0, -82, -69, false, false]
], 
[
[1, -105, -105, false, false]
], 
[
[2, -111, -111, false, false]
], 
[
[3, -107, -106, false, false]
], 
[
[4, -108, -115, false, false]
], 
[
[5, -112, -107, false, false]
], 
[
[6, -102, -109, false, false]
], 
[
[7, -87, -106, false, false]
], 
[
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 8];
this.speed = 90;
/*
 *	在战场上的偏移 
 */
 this.offsetX =0;
 this.offsetY = 0;
};
battlefield.animationFactory.konghe.prototype = new Animation;
