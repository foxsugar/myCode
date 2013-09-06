//毒矢
battlefield.animationFactory.dushi = function()
{
this.clip = [[83, 64, 174, 285], [287, 42, 177, 332], [667, 386, 1, 1], [477, 61, 200, 337], [694, 55, 252, 347], [957, 45, 284, 367], [1266, 46, 301, 366], [1580, 108, 171, 268], [1803, 134, 175, 239]];
this.frame = [
[
[0, 32, -147, false, false]
], 
[
[0, 29, -127, false, false]
], 
[
[3, 24, -132, false, false]
], 
[
[1, 36, -119, false, false]
], 
[
[4, -7, -130, false, false]
], 
[
[5, -28, -157, false, false]
], 
[
[6, -24, -164, false, false]
], 
[
[7, 39, -115, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action =[0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7];
this.speed = 70;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -122;
 this.offsetY = -80;
};
battlefield.animationFactory.dushi.prototype = new Animation;