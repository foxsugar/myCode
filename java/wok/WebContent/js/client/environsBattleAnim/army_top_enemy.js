/**
 * 敌方部队动画，上方
 */
battlefield.animationFactory.army_top_enemy = function(){
this.clip = [[9, 159, 179, 82], [26, 27, 157, 82], [33, 302, 181, 92], [220, 24, 163, 82], [224, 154, 178, 82], [230, 294, 189, 90], [419, 21, 181, 83], [437, 145, 187, 92], [475, 295, 176, 88], [637, 23, 183, 83], [652, 142, 189, 92], [716, 299, 157, 82], [861, 21, 176, 83], [863, 145, 192, 92], [1059, 15, 165, 83], [1094, 139, 191, 91], [1249, 10, 168, 83], [1317, 137, 190, 91], [1450, 6, 175, 82], [1543, 132, 186, 91], [1672, 11, 178, 82]];
this.frame = [
[
[1, 33, 25, false, false]
], 
[
[3, 27, 25, false, false]
], 
[
[6, 10, 25, false, false]
], 
[
[9, 9, 25, false, false]
], 
[
[12, 16, 25, false, false]
], 
[
[14, 27, 25, false, false]
], 
[
[16, 25, 25, false, false]
], 
[
[18, 18, 26, false, false]
], 
[
[20, 16, 26, false, false]
], 
[
[0, 15, 26, false, false]
], 
[
[4, 15, 26, false, false]
], 
[
[7, 15, 16, false, false]
], 
[
[10, 15, 16, false, false]
], 
[
[13, 14, 16, false, false]
], 
[
[15, 14, 16, false, false]
], 
[
[17, 14, 16, false, false]
], 
[
[19, 17, 16, false, false]
], 
[
[2, 21, 16, false, false]
], 
[
[5, 13, 18, false, false]
], 
[
[8, 14, 19, false, false]
], 
[
[11, 33, 25, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.selected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
this.selectedSpeed = 50;
this.wait = [0];
this.waitSpeed = 50;
this.action = this.wait;
this.speed = this.waitSpeed;

this.offsetX = -85;
this.offsetY = -82;
};
battlefield.animationFactory.army_top_enemy.prototype = new Animation;