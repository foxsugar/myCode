//疑兵
battlefield.animationFactory.yibing = function()
{
this.clip = [[65, 40, 162, 111], [298, 52, 159, 113], [514, 56, 185, 120], [751, 53, 187, 123], [1000, 63, 189, 121], [1259, 63, 190, 121], [1511, 58, 187, 124], [1757, 62, 186, 102]];
this.frame = [
[
[0, 37, 38, false, false]
], 
[
[1, 38, 30, false, false]
], 
[
[2, 20, 19, false, false]
], 
[
[3, 23, 15, false, false]
], 
[
[4, 22, 17, false, false]
], 
[
[5, 21, 16, false, false]
], 
[
[6, 24, 17, false, false]
], 
[
[7, 23, 18, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
this.speed = 70;
this.offsetX = -115;
this.offsetY = -105;
};
battlefield.animationFactory.yibing.prototype = new Animation;
