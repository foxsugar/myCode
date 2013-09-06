//冷月打击
battlefield.animationFactory.lengyuedaji = function()
{
this.clip = [[2, 2, 191, 198], [197, 3, 208, 197], [412, 3, 205, 201], [627, 5, 185, 199], [829, 7, 196, 183], [1041, 2, 219, 197], [1284, 18, 190, 174], [1477, 17, 192, 187]];
this.frame = [
[
[0, 47, 38, false, false]
], 
[
[1, 48, 38, false, false]
], 
[
[2, 42, 35, false, false]
], 
[
[3, 51, 32, false, false]
], 
[
[4, 49, 34, false, false]
], 
[
[5, 44, 26, false, false]
], 
[
[6, 61, 42, false, false]
], 
[
[7, 55, 48, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 0, 1, 1, 2, 2, 3, 4, 5];
this.speed = 70;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -145;
 this.offsetY = -150;
};
battlefield.animationFactory.lengyuedaji.prototype = new Animation;
