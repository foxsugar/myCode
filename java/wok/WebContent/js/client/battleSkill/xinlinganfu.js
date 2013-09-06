//心灵安抚
battlefield.animationFactory.xinlinganfu = function()
{
this.clip = [[1, 1, 280, 202], [284, 2, 280, 201], [566, 3, 259, 202], [828, 5, 202, 201], [3, 214, 290, 169], [298, 212, 230, 170], [530, 211, 177, 169]];
this.frame = [
[
[0, 1, 1, false, false]
], 
[
[1, 9, 4, false, false]
], 
[
[2, 12, 5, false, false]
], 
[
[3, 42, 1, false, false]
], 
[
[4, 5, 10, false, false]
], 
[
[5, 30, 9, false, false]
], 
[
[6, 65, 11, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6];
this.speed = 150;
this.offsetX = -154;
this.offsetY = -125;
};
battlefield.animationFactory.xinlinganfu.prototype = new Animation;
