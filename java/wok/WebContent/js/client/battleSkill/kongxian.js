//控弦
battlefield.animationFactory.kongxian = function()
{
this.clip = [[273, 141, 1, 1], [-1, 6, 154, 176], [159, 6, 158, 183], [319, 4, 146, 186], [470, 17, 161, 159], [634, 14, 175, 160], [817, 16, 166, 163]];
this.frame = [
[
[1, 0, 0, false, false]
], 
[
[2, 1, 3, false, false]
], 
[
[3, 5, 4, false, false]
], 
[
[4, -1, 15, false, false]
], 
[
[5, -12, 16, false, false]
], 
[
[6, -1, 23, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5];
this.speed = 150;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -80;
 this.offsetY = -85;
};
battlefield.animationFactory.kongxian.prototype = new Animation;
