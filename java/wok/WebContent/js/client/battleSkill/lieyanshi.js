//烈焰矢
battlefield.animationFactory.lieyanshi = function()
{
this.clip = [[69, 46, 198, 277], [337, 35, 193, 315], [629, 31, 216, 342], [899, 44, 230, 316], [1244, 49, 268, 306], [1570, 58, 313, 314], [1933, 90, 157, 256], [2161, 147, 178, 207], [2377, 156, 106, 171]];
this.frame = [
[
[0, 83, -172, false, false]
], 
[
[0, 72, -115, false, false]
], 
[
[1, 73, -116, false, false]
], 
[
[2, 53, -75, false, false]
], 
[
[3, 36, -52, false, false]
], 
[
[4, 14, -51, false, false]
], 
[
[5, 7, -48, false, false]
], 
[
[6, 83, -39, false, false]
], 
[
[7, 69, 16, false, false]
], 
[
[8, 93, 30, false, false]
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 9];
this.speed = 70;
/*
 *	在战场上的偏移 
 */
 this.offsetX = -145;
 this.offsetY = -135;
};
battlefield.animationFactory.lieyanshi.prototype = new Animation;
