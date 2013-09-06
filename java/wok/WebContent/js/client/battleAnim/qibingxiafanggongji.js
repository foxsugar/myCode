/*
 * 骑兵下方攻击
 */
battlefield.animationFactory.qibingxiafanggongji = function(){
this.clip = [[2, 293, 177, 94], [4, 176, 181, 97], [18, 30, 176, 92], [208, 290, 178, 97], [215, 176, 175, 98], [219, 30, 175, 92], [408, 289, 179, 96], [418, 28, 178, 93], [603, 294, 179, 94], [620, 7, 173, 114], [622, 179, 172, 94], [789, 296, 180, 90], [818, 180, 185, 92], [825, 8, 180, 113], [995, 297, 179, 89], [1024, 184, 184, 92], [1058, 18, 197, 98], [1185, 295, 178, 93], [1218, 185, 181, 92], [412, 175, 187, 99]];
this.frame = [
[
[16, 0, 0, false, false], 
[2, 12, -8, false, false]
], 
[
[16, 0, 0, false, false], 
[5, 12, -8, false, false]
], 
[
[16, 0, 0, false, false], 
[7, 12, -9, false, false]
], 
[
[16, 0, 0, false, false], 
[9, 14, -30, false, false]
], 
[
[16, 0, 0, false, false], 
[13, 15, -29, false, false]
], 
[
[16, 0, 0, false, false], 
[1, 16, -13, false, false]
], 
[
[16, 0, 0, false, false], 
[4, 16, -14, false, false]
], 
[
[16, 0, 0, false, false], 
[19, 7, -14, false, false]
], 
[
[16, 0, 0, false, false], 
[10, 12, -10, false, false]
], 
[
[16, 0, 0, false, false], 
[12, 4, -8, false, false]
], 
[
[16, 0, 0, false, false], 
[15, 5, -8, false, false]
], 
[
[16, 0, 0, false, false], 
[18, 7, -8, false, false]
], 
[
[16, 0, 0, false, false], 
[0, 11, -10, false, false]
], 
[
[16, -1, -2, false, false], 
[3, 5, -14, false, false]
], 
[
[16, -3, -3, false, false], 
[6, 2, -16, false, false]
], 
[
[16, -1, -2, false, false], 
[8, 6, -12, false, false]
], 
[
[16, 0, 0, false, false], 
[11, 7, -10, false, false]
], 
[
[16, 2, -1, false, false], 
[14, 10, -8, false, false]
], 
[
[16, 0, 0, false, false], 
[17, 10, -9, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.attack = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11];
this.attackSpeed = 50;
this.move = [12, 13, 14, 15, 16, 17, 18];
this.moveSpeed = 40;
this.wait = [0];
this.waitSpeed = 50;
this.action = this.wait;
this.speed = this.waitSpeed;
/*
 *	在战场上的偏移 
 */
this.offsetX = -94;
this.offsetY = -48;
};
battlefield.animationFactory.qibingxiafanggongji.prototype = new Animation;