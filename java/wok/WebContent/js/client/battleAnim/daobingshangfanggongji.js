/*
 * 刀兵上方攻击
 */
battlefield.animationFactory.daobingshangfanggongji = function(){
this.clip = [[11, 19, 157, 79], [14, 207, 153, 77], [17, 114, 160, 76], [186, 21, 157, 79], [190, 211, 153, 77], [358, 211, 154, 77], [359, 21, 155, 82], [527, 212, 154, 76], [530, 22, 159, 77], [699, 209, 154, 78], [708, 24, 160, 77], [850, 117, 171, 80]];
this.frame = [
[
[11, 0, 0, false, false], 
[0, 6, -9, false, false]
], 
[
[11, 0, 0, false, false], 
[3, 5, -9, false, false]
], 
[
[11, 0, 0, false, false], 
[6, 8, -12, false, false]
], 
[
[11, 0, 0, false, false], 
[8, 10, -7, false, false]
], 
[
[11, 0, 0, false, false], 
[10, 10, -7, false, false]
], 
[
[11, 0, 0, false, false], 
[2, 10, -6, false, false]
], 
[
[11, 0, 0, false, false], 
[1, 11, -7, false, false]
], 
[
[11, 0, 0, false, false], 
[4, 12, -6, false, false]
], 
[
[11, 0, 0, false, false], 
[5, 12, -7, false, false]
], 
[
[11, 0, 0, false, false], 
[7, 12, -6, false, false]
], 
[
[11, 0, 0, false, false], 
[9, 11, -9, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.move = [6, 7, 8, 9, 10];
this.moveSpeed = 50;
this.wait = [0];
this.waitSpeed = 50;
this.attack = [0, 1, 2, 3, 4, 5, 5, 5, 5];
this.attackSpeed = 65;
this.action = this.wait;
this.speed = this.waitSpeed;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -84;
 this.offsetY = -38;
};
battlefield.animationFactory.daobingshangfanggongji.prototype = new Animation;