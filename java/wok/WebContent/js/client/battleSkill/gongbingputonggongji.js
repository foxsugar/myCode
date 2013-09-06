//弓兵普通攻击
battlefield.animationFactory.gongbingputonggongji = function()
{
this.clip = [[5, 4, 113, 150], [127, 0, 114, 160], [241, 0, 120, 162], [361, 0, 115, 158], [479, 0, 112, 164], [0, 172, 103, 172], [102, 176, 99, 170], [194, 186, 100, 161], [294, 178, 103, 169], [400, 198, 97, 149], [491, 169, 103, 178]];
this.frame = [
[
[0, 36, 41, false, false]
], 
[
[1, 36, 44, false, false]
], 
[
[2, 34, 44, false, false]
], 
[
[3, 33, 44, false, false]
], 
[
[4, 37, 44, false, false]
], 
[
[5, 41, 28, false, false]
], 
[
[6, 45, 27, false, false]
], 
[
[7, 43, 36, false, false]
], 
[
[8, 42, 35, false, false]
], 
[
[9, 45, 57, false, false]
], 
[
[10, 41, 22, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [1, 2, 3, 4, 5, 6, 7, 8, 9];
this.speed = 90;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -90;
 this.offsetY = -160;
};
battlefield.animationFactory.gongbingputonggongji.prototype = new Animation;
