//陷阱：灵蛇
battlefield.animationFactory.xianjing_lingshe = function()
{
this.clip = [[8, 55, 83, 84], [112, 47, 87, 101], [207, 42, 127, 122], [352, 24, 162, 139], [526, 7, 196, 172], [741, 16, 187, 174], [936, 21, 191, 162], [1151, 27, 187, 160]];
this.frame = [
[
[0, 17, 11, false, false]
], 
[
[1, 17, 2, false, false]
], 
[
[2, 1, -7, false, false]
], 
[
[3, -13, -18, false, false]
], 
[
[4, -26, -35, false, false]
], 
[
[5, -34, -25, false, false]
], 
[
[6, -32, -30, false, false]
], 
[
[7, -20, -27, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
this.speed = 70;
this.offsetX = -62;
this.offsetY = -60;
};
battlefield.animationFactory.xianjing_lingshe.prototype = new Animation;
