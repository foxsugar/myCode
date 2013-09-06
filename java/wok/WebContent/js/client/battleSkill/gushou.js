//固守
battlefield.animationFactory.gushou = function()
{
this.clip = [[2, 3, 195, 153], [200, 3, 218, 171], [419, 3, 246, 179], [668, 4, 207, 175], [6, 172, 217, 191], [224, 184, 204, 185], [434, 185, 213, 177], [651, 188, 190, 196]];
this.frame = [
[
[0, -91, -72, false, false]
], 
[
[1, -104, -86, false, false]
], 
[
[2, -114, -87, false, false]
], 
[
[3, -98, -86, false, false]
], 
[
[4, -105, -96, false, false]
], 
[
[4, -105, -96, false, false]
], 
[
[6, -105, -88, false, false]
], 
[
[7, -90, -96, false, false]
], 
[
]
];
this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
this.action = [0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8];
this.speed = 90;
/*
 *	在战场上的偏移 
 */
 this.offsetX =0;
 this.offsetY = 0;
};
battlefield.animationFactory.gushou.prototype = new Animation;
