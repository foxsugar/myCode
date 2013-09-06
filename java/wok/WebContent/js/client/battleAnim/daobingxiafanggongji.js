/*
 * 刀兵下方攻击
 */
battlefield.animationFactory.daobingxiafanggongji = function(){
this.clip = [[10, 112, 160, 78], [12, 205, 153, 79], [18, 21, 157, 80], [196, 207, 153, 80], [205, 22, 157, 78], [359, 205, 154, 81], [373, 16, 155, 82], [531, 207, 154, 80], [546, 18, 159, 79], [693, 204, 153, 80], [717, 19, 160, 79], [849, 113, 171, 80]];
this.frame = [
[
[11, 0, 0, false, false], 
[2, 7, -11, false, false]
], 
[
[11, 0, 0, false, false], 
[4, 7, -9, false, false]
], 
[
[11, 0, 0, false, false], 
[6, 6, -13, false, false]
], 
[
[11, 0, 0, false, false], 
[8, 0, -10, false, false]
], 
[
[11, 0, 0, false, false], 
[10, -1, -10, false, false]
], 
[
[11, 0, 0, false, false], 
[0, -1, -9, false, false]
], 
[
[11, 0, 0, false, false], 
[1, 7, -9, false, false]
], 
[
[11, 0, 0, false, false], 
[3, 6, -9, false, false]
], 
[
[11, 0, 0, false, false], 
[5, 4, -10, false, false]
], 
[
[11, 0, 0, false, false], 
[7, 7, -11, false, false]
], 
[
[11, 0, 0, false, false], 
[9, 7, -10, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.attack = [0, 1, 2, 3, 4, 5];
this.attackSpeed = 95;
this.move =[6, 7, 8, 9, 10];
this.moveSpeed = 50;
this.wait = [0];
this.waitSpeed = 50;
this.action = this.wait;
this.speed = this.waitSpeed;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -87;
 this.offsetY = -38;
};
battlefield.animationFactory.daobingxiafanggongji.prototype = new Animation;