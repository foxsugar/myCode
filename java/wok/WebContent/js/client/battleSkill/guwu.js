//鼓舞
battlefield.animationFactory.guwu = function(){
this.clip = [[2, 0, 238, 145], [244, 1, 263, 145], [512, 2, 259, 144], [775, 2, 225, 145], [2, 165, 236, 156], [244, 165, 249, 157], [502, 167, 230, 157], [737, 166, 263, 160]];
this.frame = [
[
[0, 1, 1, false, false]
], 
[
[1, -23, 3, false, false]
], 
[
[2, -11, 2, false, false]
], 
[
[3, -2, -2, false, false]
], 
[
[4, 8, 0, false, false]
], 
[
[5, -2, 0, false, false]
], 
[
[6, 1, -3, false, false]
], 
[
[7, -14, -1, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7];
this.speed = 110;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -130;
 this.offsetY = -100;
};
battlefield.animationFactory.guwu.prototype = new Animation;