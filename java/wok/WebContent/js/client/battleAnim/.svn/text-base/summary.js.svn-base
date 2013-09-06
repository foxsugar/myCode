/*
 * 动画工厂对象
 */
battlefield.animationFactory = {};
battlefield.animationFactory.create = function(name){
	if(!name || ! name in this || !this[name]){
		name = "shifangjineng";
	}
	var anim = new this[name];
	anim.name = name;
	return anim;
}