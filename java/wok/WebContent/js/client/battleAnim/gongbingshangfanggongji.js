/*
 * 弓兵上方攻击
 */
battlefield.animationFactory.gongbingshangfanggongji = function(){
this.clip = [[1, 4, 171, 97], [176, 5, 168, 97], [345, 4, 161, 98], [508, 4, 163, 100], [674, 5, 161, 99], [836, 5, 177, 100], [1, 103, 167, 91], [171, 105, 165, 91], [338, 104, 167, 94], [509, 105, 160, 97], [673, 107, 169, 95], [844, 108, 170, 98], [834, 207, 190, 96], [2, 198, 160, 97], [168, 202, 159, 91], [333, 203, 172, 90], [512, 203, 162, 94], [1, 301, 176, 94], [192, 301, 180, 95], [378, 301, 170, 90], [554, 298, 169, 92], [737, 298, 160, 87], [1, 397, 177, 92], [188, 399, 172, 89], [365, 400, 162, 87], [552, 398, 168, 94], [736, 389, 183, 97]];
this.frame = [
[
[12, 0, 0, false, false], 
[0, -7, -14, false, false]
], 
[
[12, 0, 0, false, false], 
[1, 0, -14, false, false]
], 
[
[12, 0, 0, false, false], 
[2, 3, -17, false, false]
], 
[
[12, 0, 0, false, false], 
[3, -2, -18, false, false]
], 
[
[12, 0, 0, false, false], 
[4, -1, -17, false, false]
], 
[
[12, 0, 0, false, false], 
[5, -4, -19, false, false]
], 
[
[12, 0, 0, false, false], 
[6, -1, -9, false, false]
], 
[
[12, 0, 0, false, false], 
[7, 2, -9, false, false]
], 
[
[12, 0, 0, false, false], 
[8, -1, -11, false, false]
], 
[
[12, 0, 0, false, false], 
[9, 2, -14, false, false]
], 
[
[12, 0, 0, false, false], 
[10, -1, -12, false, false]
], 
[
[12, 0, 0, false, false], 
[11, 1, -15, false, false]
], 
[
[12, 0, 0, false, false], 
[13, 3, -11, false, false]
], 
[
[12, 0, 0, false, false], 
[14, 2, -10, false, false]
], 
[
[12, 0, 0, false, false], 
[15, -4, -5, false, false]
], 
[
[12, 0, 0, false, false], 
[16, 5, -3, false, false]
], 
[
[12, 0, 0, false, false], 
[17, -5, -11, false, false]
], 
[
[12, 0, 0, false, false], 
[18, -8, -9, false, false]
], 
[
[12, 0, 0, false, false], 
[19, 1, -5, false, false]
], 
[
[12, 0, 0, false, false], 
[20, 6, -9, false, false]
], 
[
[12, 0, 0, false, false], 
[21, 7, -10, false, false]
], 
[
[12, 0, 0, false, false], 
[22, 0, -9, false, false]
], 
[
[12, 0, 0, false, false], 
[23, -2, -8, false, false]
], 
[
[12, 0, 0, false, false], 
[24, 6, -4, false, false]
], 
[
[12, 0, 0, false, false], 
[25, 4, -3, false, false]
], 
[
[12, 0, 0, false, false], 
[26, -4, -10, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.attack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15, 15, 15];
this.attackSpeed = 60;
this.move = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
this.moveSpeed = 40;
this.wait =[0];
this.waitSpeed = 50;
this.action = this.wait;
this.speed = this.waitSpeed;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -84;
 this.offsetY = -43;
};
battlefield.animationFactory.gongbingshangfanggongji.prototype = new Animation;