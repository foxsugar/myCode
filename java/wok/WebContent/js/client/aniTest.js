/**
 * 升级动画
 */
battlefield.animationFactory.buildUpLevel = function(){
	this.clip = [[9, 101, 211, 369], [222, 100, 212, 395], [442, 96, 207, 398], [659, 64, 195, 407], [890, 41, 233, 454], [1166, 26, 245, 469], [1429, 132, 156, 314]];
	this.frame = [
	[
	[0, 54, -45, false, false]
	], 
	[
	[1, 65, -51, false, false]
	], 
	[
	[2, 62, -34, false, false]
	], 
	[
	[3, 63, -72, false, false]
	], 
	[
	[4, 61, -97, false, false]
	], 
	[
	[5, 29, -110, false, false]
	], 
	[
	[6, 81, -2, false, false]
	]
	];
	this.coll = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

	this.action = [0, 1, 2, 3, 4, 5, 6];
	this.speed = 100;
	this.offsetX = 0;
	this.offsetY = 0;
};
battlefield.animationFactory.buildUpLevel.prototype = new Animation;