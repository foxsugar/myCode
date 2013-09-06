//陷阱：地裂
battlefield.animationFactory.xianjing_dilie = function()
{
this.clip = [[10, 60, 111, 136], [152, 15, 168, 186], [334, 13, 210, 191], [557, 16, 197, 219], [781, 14, 243, 226], [1034, 8, 208, 232], [1255, 6, 207, 234], [1479, 6, 196, 234]];
this.frame = [
[
[0, 64, 44, false, false]
], 
[
[1, 30, 2, false, false]
], 
[
[2, 8, 1, false, false]
], 
[
[3, 11, 0, false, false]
], 
[
[4, -20, -1, false, false]
], 
[
[5, 6, -3, false, false]
], 
[
[6, 9, -6, false, false]
], 
[
[7, 13, -14, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 2, 3, 4, 5, 6, 6, 7];
this.speed = 70;
this.offsetX = -103;
this.offsetY = -133;
};
battlefield.animationFactory.xianjing_dilie.prototype = new Animation;
