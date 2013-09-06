//猛毒之牙
battlefield.animationFactory.mengduzhiya = function()
{
this.clip = [[2, 3, 176, 174], [182, 2, 187, 185], [372, 3, 239, 213], [621, 4, 254, 221], [13, 190, 237, 250], [255, 218, 239, 232], [504, 225, 186, 217]];
this.frame = [
[
[0, 1, 1, false, false]
], 
[
[1, -4, 0, false, false]
], 
[
[2, -33, -14, false, false]
], 
[
[3, -39, -26, false, false]
], 
[
[4, -30, -23, false, false]
], 
[
[5, -31, -26, false, false]
], 
[
[6, -8, -22, false, false]
], 
[
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 7];
this.speed = 80;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -85;
 this.offsetY = -115;
};
battlefield.animationFactory.mengduzhiya.prototype = new Animation;
