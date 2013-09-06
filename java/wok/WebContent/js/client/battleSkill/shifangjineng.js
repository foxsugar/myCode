//释放技能
battlefield.animationFactory.shifangjineng = function()
{
this.clip = [[6, 11, 250, 214], [9, 241, 162, 216], [189, 247, 169, 216], [277, 9, 198, 214], [379, 242, 170, 214], [491, 8, 162, 214], [671, 9, 148, 214], [836, 9, 155, 215]];
this.frame = [
[
[0, 1, 1, false, false]
], 
[
[3, 26, 2, false, false]
], 
[
[5, 48, 2, false, false]
], 
[
[6, 56, 2, false, false]
], 
[
[7, 50, 2, false, false]
], 
[
[1, 48, 1, false, false]
], 
[
[2, 43, 2, false, false]
], 
[
[4, 39, -7, false, false]
], 
[
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8];
this.speed = 80;
this.offsetX = -130;
this.offsetY = -165;
};
battlefield.animationFactory.shifangjineng.prototype = new Animation;
