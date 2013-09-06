/*
 * 弓兵下方被击
 */
battlefield.animationFactory.gongbingxiafanggongji = function(){
this.clip = [[6, 406, 156, 79], [7, 311, 158, 79], [2, 109, 161, 88], [8, 6, 163, 96], [1, 199, 161, 95], [174, 109, 150, 83], [193, 406, 157, 78], [201, 310, 157, 79], [168, 200, 168, 96], [174, 6, 170, 97], [336, 109, 166, 88], [362, 405, 156, 78], [346, 6, 159, 98], [339, 200, 165, 99], [378, 304, 157, 80], [508, 110, 165, 88], [507, 200, 163, 99], [551, 401, 156, 79], [551, 306, 156, 79], [508, 6, 164, 101], [676, 110, 164, 94], [674, 5, 166, 103], [734, 308, 156, 78], [743, 398, 156, 79], [828, 213, 177, 85], [842, 4, 168, 106], [842, 111, 166, 95], [526, 236, 1, 1], [113, 36, 1, 1], [467, 265, 1, 1], [969, 162, 1, 1]];
this.frame = [
[
[24, 0, 0, false, false], 
[3, 5, -19, false, false]
], 
[
[24, 0, 0, false, false], 
[9, 2, -20, false, false]
], 
[
[24, 0, 0, false, false], 
[12, 8, -22, false, false]
], 
[
[24, 0, 0, false, false], 
[19, 3, -24, false, false]
], 
[
[24, 0, 0, false, false], 
[21, 4, -24, false, false]
], 
[
[24, 0, 0, false, false], 
[25, 7, -26, false, false]
], 
[
[24, 0, 0, false, false], 
[2, 5, -10, false, false]
], 
[
[24, 0, 0, false, false], 
[5, 10, -11, false, false]
], 
[
[24, 0, 0, false, false], 
[10, 2, -12, false, false]
], 
[
[24, 0, 0, false, false], 
[15, 6, -15, false, false]
], 
[
[24, 0, 0, false, false], 
[20, 6, -15, false, false]
], 
[
[24, 0, 0, false, false], 
[26, 3, -17, false, false]
], 
[
[24, 0, 0, false, false], 
[4, 7, -17, false, false]
], 
[
[24, 0, 0, false, false], 
[8, 6, -19, false, false]
], 
[
[24, 0, 0, false, false], 
[13, 6, -15, false, false]
], 
[
[24, 0, 0, false, false], 
[16, 5, -13, false, false]
], 
[
[24, 0, 0, false, false], 
[1, 8, -7, false, false]
], 
[
[24, 0, 0, false, false], 
[7, 8, -7, false, false]
], 
[
[24, 0, 0, false, false], 
[14, 8, -7, false, false]
], 
[
[24, 0, 0, false, false], 
[18, 9, -7, false, false]
], 
[
[24, 0, 0, false, false], 
[22, 10, -6, false, false]
], 
[
[24, 0, 0, false, false], 
[0, 11, -6, false, false]
], 
[
[24, 0, 0, false, false], 
[6, 10, -6, false, false]
], 
[
[24, 0, 0, false, false], 
[11, 10, -6, false, false]
], 
[
[24, 0, 0, false, false], 
[17, 9, -6, false, false]
], 
[
[24, 0, 0, false, false], 
[23, 9, -7, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.attack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 15, 15];
this.attackSpeed = 60;
this.move = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
this.moveSpeed = 40;
this.wait = [0];
this.waitSpeed = 50;
this.action = this.wait;
this.speed = this.waitSpeed;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -84;
 this.offsetY = -43;
};
battlefield.animationFactory.gongbingxiafanggongji.prototype = new Animation;