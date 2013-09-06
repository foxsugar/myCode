/**
 * Created with JetBrains WebStorm.
 * User: xuzhongxing
 * Date: 13-7-4
 * Time: 下午5:52
 * To change this template use File | Settings | File Templates.
 */

/*
 * 6种品质对应的颜色值
 */
var qualityColor  = [
    "#ffffff",//白
    "#08cc1a",//绿
     "#006cff",//蓝
     "#dc00df",//紫
     "#e09900",//橙
     "#ff0000"//红
];
/*
 * tooltip信息
 */
var tooltip = {
    h1 : "18px 黑体 bolder",
    h1_fontSize : 18,
    h2 : "14px 楷体",
    h2_fontSize : 14,
    h2_color : "#ffda89",
    h2_space : 16,
    body : "12px 黑体",
    body_fontSize : 12,
    body_color_nomal : "#ffffff",
    body_color_good : "#08cc1a",
    body_color_bad : "#ff0000",
    border_color : "#aa7d52",
    back_color : "rgba(0,0,0,.7)",

    width : 222,//宽度
    padding_h : 15,//左右边距
    padding_v : 20,//上下边距
    line_space : 9,//行间距
    tab_space : 25//首行缩进
  };

tooltip. init_height =tooltip.padding_v*2 + tooltip.h1_fontSize + tooltip.body_fontSize + tooltip.line_space*2;//初始高度
tooltip.equipmentAttr = ["heroForce","strategy","physique","agility"];//装备属性字段名
tooltip.equipmentStones = ["stone1","stone2","stone3"];//装备所镶嵌宝石属性名
tooltip.weaponType = ["短柄","长柄","远程"];//武器类型
tooltip.equipmentType = ["头盔 防具","胸甲 防具","护腿 防具","靴子 防具","护腕 防具"];//装备类型
tooltip.heroType = ["无","仙师","天策","白羽"];//装备所需武将类型
tooltip.materialType = ["打造材料","图纸","宝石"];//材料类型
tooltip.buildingEffectType = [ //建筑物效果类型
    "",//0
    "",//1
    "",//2
    "",//3
    "",//4
    "铜币产量：",//5
    "",//6
    "士兵上限：",//7
    "人口上限：",//8
    "剩余交易量：",//9
    "存储物品上限：",//10
    "存储资源上限：",//11
    "保护资源上限：",//12
    "城防器具上限：",//13
    "减少刷新时间：",//14
    "铜币存储上限：",//15
    "药膏上限：",//16
    "自身行军时间减少：",//17
    "友军增援时间减少：",//18
    "科技研究时间减少：",//19
    "耐久度：",//20
    "允许采集物品等级：",//21
    "最大采集次数："//22
];
tooltip.buildingEffectValueType = [ //建筑物效果值类型
    "",//0
    "",//1
    "",//2
    "",//3
    "",//4
    "铜币/秒",//"铜币产量：",//5
    "",//6
    "",//"士兵上限：",//7
    "",//"人口上限：",//8
    "",//"剩余交易量：",//9
    "",//10
    "",//"存储物品上限：",//11
    "",//"保护资源上限：",//12
    "",//"城防器具上限：",//13
    "",//"减少刷新时间：",//14
    "",//"铜币存储：",//15
    "",//"药膏上限：",//16
    "%",//"自身行军时间减少：",//17
    "%",//"友军增援时间减少：",//18
    "%",//"科技研究时间减少：",//19
    "",//"耐久度",//20
    "级",//"允许采集物品x级",//21
    ""//"最大采集次数"//22
];

/*
 * 说明分行显示
 */
tooltip.multilineDesc = function(ctx,str){
    ctx.font = tooltip.body;
    var lineWidth = tooltip.width - tooltip.padding_h *2;
    var firstLineWidth = lineWidth - tooltip.tab_space;
    var begin = 0;
    var arr = new Array();
    if(ctx.measureText(str).width<firstLineWidth){
        arr.push(str);
    }else{
        var sumWidth=0;
        var width = firstLineWidth;
        for(var i=0;i<str.length;i++){
            sumWidth+=ctx.measureText(str.charAt(i)).width;
            if(sumWidth>width+5){//可以有5像素的越界
                arr.push(str.substring(begin,i));
                begin = i--;
                sumWidth = 0;
                if(width != lineWidth){
                    width = lineWidth;
                }
            }
        }
        arr.push(str.substring(begin,str.length));
    }
    return arr;
}

/*计算高度*/
tooltip.computEquipment = function(ctx,data){
    var height = tooltip.init_height + tooltip.line_space*3 +tooltip.body_fontSize*3 ;//除名字外前3行信息
    height += (tooltip.h2_fontSize + tooltip.line_space)*3;//3个块
    //信息
    for(var i= 0;i<tooltip.equipmentAttr.length;i++){
        if(data[tooltip.equipmentAttr[i]])
            height += (tooltip.body_fontSize + tooltip.line_space);
    }
    //宝石
    var isHasStone = false;
    for(var i= 0;i<tooltip.equipmentStones.length;i++){
        if(data[tooltip.equipmentStones[i]]){
            isHasStone = true;
            height += (tooltip.body_fontSize + tooltip.line_space);
        }
    }
    if(!isHasStone){
        height += (tooltip.body_fontSize + tooltip.line_space);
    }
    //说明
    var arr = tooltip.multilineDesc(ctx,data.equipmentDesc);
    height += arr.length * (tooltip.body_fontSize + tooltip.line_space) - tooltip.line_space;
    return {height:height,arr:arr,isHasStone:isHasStone};
}

/*
 * 绘制装备tooltip
 */
tooltip.drawEquipment = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    var obj = tooltip.computEquipment(ctx,data);
    var height = obj.height;
    var isHasStone = obj.isHasStone;
    var arr = obj.arr;
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);
    //绘制物品名+强化级别
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = qualityColor[data.quality -1] || qualityColor[0];
    ctx.font = tooltip.h1;
    var text = data.equipmentName;
    if(data.strengthenLevel){
        text += " +" + data.strengthenLevel;
    }
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;

    if(typeof  data.isBound != "undefined"){//用户背包内
        ctx.font = tooltip.body;
        text = "未绑定";
        if(data.isBound){
            ctx.fillStyle = tooltip.body_color_bad;
            text = "已绑定";
        }else{
            ctx.fillStyle = tooltip.body_color_good;
        }
        ctx.fillText(text,x+tooltip.width/2,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }else{//未获得的装备
        ctx.font = tooltip.body;
        var text = "装备绑定";
        if(data.isBop){
            ctx.fillStyle = tooltip.body_color_bad;
            text = "拾取绑定";
        }else{
            ctx.fillStyle = tooltip.body_color_good;
        }
        ctx.fillText(text,x+tooltip.width/2,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    //主模块
    ctx.textAlign = "left";
    if(data.equipmentType == 1){
        text = "类型： " +tooltip.weaponType[data.weaponType-1]+" 武器";
    }else{
        text = "类型： " +tooltip.equipmentType[data.equipmentType-2];
    }
    /*
    *绘制基本body，并且偏移posY
     */
    var fillBodyAndOffset = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;
        ctx.fillText(text,x+tooltip.padding_h,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    /*
     *绘制基本body，不偏移
     */
    var fillBody = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;
        ctx.fillText(text,x+tooltip.padding_h,y+posY);
    }
    fillBodyAndOffset();
    //需要武将等级
    if(typeof data.needLevel  != "undefined"){
        text = "需要等级： " +data.needLevel;
    }
    fillBodyAndOffset();
    //武将要求
    if(typeof data.weaponType  != "undefined"){
        text = "武将要求： " +tooltip.heroType[data.weaponType];
    }
    fillBodyAndOffset();
    //信息
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("信息",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    /*
     * 绘制强化附加的属性并且偏移
     */
    var drawAddAndOffset = function(){
        var offset = ctx.measureText(text).width;
        text = "(+"+data.strengthenForce+")";
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_good;
        ctx.fillText(text,x+tooltip.padding_h+offset+5,y+posY);//5px的间距
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    if(typeof  data.isBound != "undefined"){
        if(data.heroForce){
            text = "武力   +"+data.heroForce;
            if(data.strengthenForce){
                fillBody();
                drawAddAndOffset();
            }else{
                fillBodyAndOffset();
            }
        }
        if(data.agility){
            text = "身法   +"+data.agility;
            if(data.strengthenAgility){
                fillBody();
                drawAddAndOffset();
            }else{
                fillBodyAndOffset();
            }
        }
        if(data.strategy){
            text = "谋略   +"+data.strategy;
            if(data.strengthenStrategy){
                fillBody();
                drawAddAndOffset();
            }else{
                fillBodyAndOffset();
            }
        }
        if(data.physique){
            text = "体质   +"+data.physique;
            if(data.strengthenPhysique){
                fillBody();
                drawAddAndOffset();
            }else{
                fillBodyAndOffset();
            }
        }
    }
    //宝石
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("宝石",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    if(isHasStone){
        for(var i= 0;i<tooltip.equipmentStones.length;i++){
            var temp_stone = data[tooltip.equipmentStones[i]];
            if(temp_stone){
                text = temp_stone.stoneName + "     " + temp_stone.stoneNameDesc;
                fillBodyAndOffset();
            }
        }
    } else {
        text = "没有镶嵌宝石";
        fillBodyAndOffset();
    }
    //说明
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("说明",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    ctx.font = tooltip.body;
    ctx.fillStyle = tooltip.body_color_nomal;
    for(var i= 0;i<arr.length;i++){
        text = arr[i];
        if(i == 0){
            ctx.fillText(text,x+tooltip.padding_h+tooltip.tab_space,y+posY);
        }else{
            ctx.fillText(text,x+tooltip.padding_h,y+posY);
        }
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    ctx.restore();
}

tooltip.computItem = function(ctx,data){
    var height = tooltip.init_height;
    height += tooltip.h2_fontSize + tooltip.line_space;//说明标题
    //说明
    var arr = tooltip.multilineDesc(ctx,data.description);
    height += arr.length * (tooltip.body_fontSize + tooltip.line_space) - tooltip.line_space;
    return {height:height,arr:arr};
}

/*
 * 绘制消耗品tooltip
 */
tooltip.drawItem = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    /*计算高度*/
    var obj = tooltip.computItem(ctx,data);
    var height = obj.height;
    var arr = obj.arr;
    /*结束计算高度*
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);
    //绘制物品名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = qualityColor[data.quality -1] || qualityColor[0];
    ctx.font = tooltip.h1;
    var text = data.itemName;
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;

    if(typeof  data.isBound != "undefined"){//用户背包内
        ctx.font = tooltip.body;
        text = "未绑定";
        if(data.isBound){
            ctx.fillStyle = tooltip.body_color_bad;
            text = "已绑定";
        }else{
            ctx.fillStyle = tooltip.body_color_good;
        }
        ctx.fillText(text,x+tooltip.width/2,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }else{//未获得的装备
        ctx.font = tooltip.body;
        var text = "装备绑定";
        if(data.isBop){
            ctx.fillStyle = tooltip.body_color_bad;
            text = "拾取绑定";
        }else{
            ctx.fillStyle = tooltip.body_color_good;
        }
        ctx.fillText(text,x+tooltip.width/2,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
     //说明
    ctx.textAlign = "left";
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("说明",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    ctx.font = tooltip.body;
    ctx.fillStyle = tooltip.body_color_nomal;
    for(var i= 0;i<arr.length;i++){
        text = arr[i];
        if(i == 0){
            ctx.fillText(text,x+tooltip.padding_h+tooltip.tab_space,y+posY);
        }else{
            ctx.fillText(text,x+tooltip.padding_h,y+posY);
        }
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    ctx.restore();
}
/*
 * 计算高度
 */
tooltip.computMaterial = function(ctx,data){
    var height = tooltip.init_height;
    height += tooltip.body_fontSize + tooltip.line_space;//类型
    height += tooltip.h2_fontSize + tooltip.line_space;//说明标题
    //说明
    var arr = tooltip.multilineDesc(ctx,data.description);
    height += arr.length * (tooltip.body_fontSize + tooltip.line_space) - tooltip.line_space;
    return {height:height,arr:arr};
}

/*
 * 绘制材料tooltip
 */
tooltip.drawMaterial = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    /*计算高度*/
    var obj = tooltip.computMaterial(ctx,data);
    var height = obj.height;
    var arr = obj.arr;
    /*结束计算高度*/
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);
    //绘制物品名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = qualityColor[data.quality -1] || qualityColor[0];
    ctx.font = tooltip.h1;
    var text = data.materialName;
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;

    if(typeof  data.isBound != "undefined"){//用户背包内
        ctx.font = tooltip.body;
        text = "未绑定";
        if(data.isBound){
            ctx.fillStyle = tooltip.body_color_bad;
            text = "已绑定";
        }else{
            ctx.fillStyle = tooltip.body_color_good;
        }
        ctx.fillText(text,x+tooltip.width/2,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }else{//未获得的装备
        ctx.font = tooltip.body;
        var text = "装备绑定";
        if(data.isBop){
            ctx.fillStyle = tooltip.body_color_bad;
            text = "拾取绑定";
        }else{
            ctx.fillStyle = tooltip.body_color_good;
        }
        ctx.fillText(text,x+tooltip.width/2,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    ctx.textAlign = "left";
    //类型
    text = "类型：     " + tooltip.materialType[data.materialType - 1] ;
    ctx.font = tooltip.body;
    ctx.fillStyle = tooltip.body_color_nomal;
    ctx.fillText(text,x+tooltip.padding_h,y+posY);
    posY += tooltip.body_fontSize;
    posY += tooltip.line_space;
    //说明
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("说明",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    ctx.font = tooltip.body;
    ctx.fillStyle = tooltip.body_color_nomal;
    for(var i= 0;i<arr.length;i++){
        text = arr[i];
        if(i == 0){
            ctx.fillText(text,x+tooltip.padding_h+tooltip.tab_space,y+posY);
        }else{
            ctx.fillText(text,x+tooltip.padding_h,y+posY);
        }
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    ctx.restore();
}

/*
 * 计算高度
 */
tooltip.computHero=function(ctx,data){
    var height = tooltip.padding_v*2 + tooltip.h1_fontSize + tooltip.line_space;
    height += (tooltip.body_fontSize + tooltip.line_space)*6;
    height += (tooltip.h2_fontSize + tooltip.line_space)*2;
    return {height:height};
}
/*
 * 绘制武将tooltip
 */
tooltip.drawHero = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    /*计算高度*/
    var height = tooltip.computHero(ctx,data).height;
    /*结束计算高度*/
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);
    //绘制武将名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = qualityColor[data.quality -1] || qualityColor[0];
    ctx.font = tooltip.h1;
    var text = data.heroName;
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;

    ctx.textAlign = "left";
    //基本信息
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("基本",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    /*
     *绘制基本body，并且偏移posY
     */
    var fillBodyAndOffset = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;
        ctx.fillText(text,x+tooltip.padding_h,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    text = "等级：  " + data.level + "   " + tooltip.heroType[data.heroType -1];
    fillBodyAndOffset();
    text = "体力：  " + data.stamina + "/" + data.staminaMax;
    fillBodyAndOffset();
    text = "精力：  " + data.mp + "/" + data.mpMax;
    fillBodyAndOffset();
    text = "统率：  " + data.command;
    fillBodyAndOffset();
    //属性信息
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("属性",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    text = "武力：" + data.heroForce + "    谋略：" + data.strategy;
    fillBodyAndOffset();
    text = "身法：" + data.agility + "    体质：" + data.physique;
    fillBodyAndOffset();
    ctx.restore();
}

/*
 *计算高度
 */
tooltip.computSkill = function(ctx,data){
    var height = tooltip.init_height;
    height += (tooltip.body_fontSize + tooltip.line_space)*2;
    height += tooltip.h2_fontSize + tooltip.line_space;//说明标题
    //说明
    var arr = tooltip.multilineDesc(ctx,data.description);
    height += arr.length * (tooltip.body_fontSize + tooltip.line_space) - tooltip.line_space;
    return {height:height,arr:arr};
}
/*
 * 绘制技能tooltip
 */
tooltip.drawSkill = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    /*计算高度*/
    var obj = tooltip.computSkill(ctx,data);
    var height = obj.height;
    var arr = obj.arr;
    /*结束计算高度*/
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);
    //绘制技能名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = tooltip.h1;
    var text = data.name;
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;

    ctx.textAlign = "left";
    /*
     *绘制基本body，并且偏移posY
     */
    var fillBodyAndOffset = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;
        ctx.fillText(text,x+tooltip.padding_h,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    text = "等级： " + data.level + "级";
    fillBodyAndOffset();
    text = "消耗精力： " + data.needVnp;
    fillBodyAndOffset();
    text = "冷却时间： " + data.coolDown + "回合";
    fillBodyAndOffset();
    //说明
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("说明",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    ctx.font = tooltip.body;
    ctx.fillStyle = tooltip.body_color_nomal;
    for(var i= 0;i<arr.length;i++){
        text = arr[i];
        if(i == 0){
            ctx.fillText(text,x+tooltip.padding_h+tooltip.tab_space,y+posY);
        }else{
            ctx.fillText(text,x+tooltip.padding_h,y+posY);
        }
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    ctx.restore();
}

tooltip.computTech = function(ctx,data){
    var height = tooltip.padding_v*2 + tooltip.h1_fontSize + tooltip.line_space;//初始高度
    if(data.needTime &&  data.nextEffect){
        height += (tooltip.body_fontSize + tooltip.line_space)*5;
    }else{
        height += (tooltip.body_fontSize + tooltip.line_space)*4;
    }
    height += (tooltip.h2_fontSize + tooltip.line_space)*2;//说明标题
    return {height:height};
}

/*
 * 绘制科技tooltip
 */
tooltip.drawTech = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    /*计算高度*/
    var height = tooltip.computTech(ctx,data).height;
    /*结束计算高度*/
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);
    //绘制科技名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = tooltip.h1;
    var text = data.name;
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;

    ctx.textAlign = "left";
    /*
     *绘制基本body，并且偏移posY
     */
    var fillBodyAndOffset = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;
        ctx.fillText(text,x+tooltip.padding_h,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    text = "类型：     " + data.type;
    fillBodyAndOffset();
    text = "等级：     " + data.level + "级";
    fillBodyAndOffset();

    //效果
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("效果",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    text =  data.effect;
    fillBodyAndOffset();

    //升级
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("升级",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    if(data.needTime &&  data.nextEffect){
        text =  "消耗时间：    "+data.needTime;
        fillBodyAndOffset();
        text =  data.nextEffect;
        fillBodyAndOffset();
    }else{
        text =  "该科技已经升到最高等级";
        fillBodyAndOffset();
    }
    ctx.restore();
}

/*
 * 绘制单行简单文字tooltip
 */
tooltip.drawLineDesc = function (ctx,x,y,text){
    ctx.save();
    ctx.globalAlpha = 1;
    /*计算高度*/
    var height =  tooltip.body_fontSize + tooltip.line_space*2;
    ctx.font = tooltip.body;
    var width =  ctx.measureText(text).width + tooltip.padding_h;
    /*结束计算高度*/
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,width,height);
    //绘制说明
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = tooltip.body_color_nomal;
    ctx.fillText(text,x+width/2,y+tooltip.line_space);
    ctx.restore();
}

/*
 *计算建筑树高度
 */
tooltip.computBuildingTree = function(ctx,data){
    var height = tooltip.padding_v*2 + tooltip.h1_fontSize + tooltip.line_space;
    height += tooltip.h2_fontSize + tooltip.line_space;//说明标题
    //说明
    var arr = tooltip.multilineDesc(ctx,data.desc);
    height += arr.length * (tooltip.body_fontSize + tooltip.line_space) - tooltip.line_space;
    return {height:height,arr:arr};
}

/*
 * 绘制建筑树tooltip
 */
tooltip.drawBuildingTree = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    /*计算高度*/
    var obj = tooltip.computBuildingTree(ctx,data);
    var height = obj.height;
    var arr = obj.arr;
    /*结束计算高度*
     /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);
    //绘制建筑名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = qualityColor[data.quality -1] || qualityColor[0];
    ctx.font = tooltip.h1;
    var text = data.buildingName;
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;
    //说明
    ctx.textAlign = "left";
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("说明",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    ctx.font = tooltip.body;
    ctx.fillStyle = tooltip.body_color_nomal;
    for(var i= 0;i<arr.length;i++){
        text = arr[i];
        if(i == 0){
            ctx.fillText(text,x+tooltip.padding_h+tooltip.tab_space,y+posY);
        }else{
            ctx.fillText(text,x+tooltip.padding_h,y+posY);
        }
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    ctx.restore();
}

/*
 *
 */
tooltip.computBuilding = function(ctx,view){
    var height = tooltip.padding_v*2 + tooltip.h1_fontSize + tooltip.line_space;
    height += tooltip.body_fontSize + tooltip.line_space;//等级
    height += (tooltip.h2_fontSize + tooltip.line_space)*2;//说明标题
    //效果、效果值
    var count = 0;
    if(view.effect1 && view.value1){
        count ++;
    }
    if(view.effect2 && view.value2){
        count ++;
    }
    if(view.effect3 && view.value3){
        count ++;
    }
    if(view.effect4 && view.value4){
        count ++;
    }
    height += (tooltip.body_fontSize + tooltip.line_space)*count;

    //说明
    var arr = tooltip.multilineDesc(ctx,view.desc);
    height += arr.length * (tooltip.body_fontSize + tooltip.line_space ) - tooltip.line_space;
    return {height:height,arr:arr}
}
/*
 * 绘制建筑tooltip
 */
tooltip.drawBuilding = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    /*计算高度*/
    var view = data.view;
    var obj = tooltip.computBuilding(ctx,view);
    var height = obj.height;
    var arr = obj.arr;
    /*结束计算高度*/

    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);

    //绘制建筑名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = tooltip.h1;
    var text = view.name;
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;

    ctx.textAlign = "left";
    /*
     *绘制基本body，并且偏移posY
     */
    var fillBodyAndOffset = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;
        ctx.fillText(text,x+tooltip.padding_h,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    text = "等级： " + data.level + "级";
    fillBodyAndOffset();
    //效果
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("效果",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;


    var drawEffect = function(effect,value){
        if(!effect || !value){
            return;
        }
        var effectType = tooltip.buildingEffectValueType[view.effect1];
        if(effectType == "%"){
            value = value.toFixed(1);
        }else{
            value = value >>0;
        }
        text = tooltip.buildingEffectType[effect] + value + effectType;
        fillBodyAndOffset();
    }
    drawEffect(view.effect1,view.value1);
    drawEffect(view.effect2,view.value2);
    drawEffect(view.effect3,view.value3);
    drawEffect(view.effect4,view.value4);

    //说明
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("说明",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    ctx.font = tooltip.body;
    ctx.fillStyle = tooltip.body_color_nomal;
    for(var i= 0;i<arr.length;i++){
        text = arr[i];
        if(i == 0){
            ctx.fillText(text,x+tooltip.padding_h+tooltip.tab_space,y+posY);
        }else{
            ctx.fillText(text,x+tooltip.padding_h,y+posY);
        }
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    ctx.restore();
}
/*
 *计算升级tooltip高度
 */
tooltip.computUpgrade = function(ctx,data){
    /*计算高度*/
    var height = tooltip.padding_v*2 + tooltip.h1_fontSize + tooltip.line_space;
    if(data.flag == 1){
        height += tooltip.body_fontSize + tooltip.line_space;
        return {height:height};
    }
    height += (tooltip.h2_fontSize + tooltip.line_space)*2;//标题(信息、效果)
    var view = data.view;
    var count = 1;//时间
    //资源
    if(view.needWood){
        count ++;
    }
    if(view.needStone){
        count ++;
    }
    if(view.needIronore){
        count ++;
    }
    if(view.needMoney){
        count ++;
    }
    //效果、效果值

    if(view.effect1 && view.value1){
        count ++;
    }
    if(view.effect2 && view.value2){
        count ++;
    }
    if(view.effect3 && view.value3){
        count ++;
    }
    if(view.effect4 && view.value4){
        count ++;
    }
    height += (tooltip.body_fontSize + tooltip.line_space)*count;
    return {height:height};
    /*结束计算高度*/
}
/*
 * 绘制建筑升级tooltip
 */
tooltip.drawUpgrade = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    var view = data.view;
    var height = tooltip.computUpgrade(ctx,data).height;
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);

    //绘制建筑名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = tooltip.h1;
    var text = "升级";
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;

    ctx.textAlign = "left";

    /*
     *绘制基本body，并且偏移posY
     */
    var fillBodyAndOffset = function(offsetx,isEnough){
        ctx.font = tooltip.body;
        if(isEnough){
            ctx.fillStyle = tooltip.body_color_nomal;
        }else{
            ctx.fillStyle = tooltip.body_color_bad;
        }
        ctx.fillText(text,x+tooltip.padding_h+offsetx,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }

    if(data.flag == 1){
        console.log(data.flag);
        text = "该建筑物已经达到最高等级";
        fillBodyAndOffset(0,true);
        ctx.restore();
        return;
    }
    /*
     *绘制基本body，并且偏移posY
     */
    var fillAddAndOffset = function(offsetx){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_good;

        ctx.fillText(text,x+tooltip.padding_h+offsetx,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    /*
     *绘制基本body，不偏移
     */
    var fillBody = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;
        ctx.fillText(text,x+tooltip.padding_h,y+posY);
    }
    //信息
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("信息",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    var offset;
    if(view.needWood){
        text = "消耗木材：";
        ctx.font = tooltip.body;
        offset = ctx.measureText(text).width;
        fillBody();
        text = view.needWood;
        fillBodyAndOffset(offset,onlyWood>=view.needWood);
    }
    if(view.needStone){
        text = "消耗石料：";
        offset = ctx.measureText(text).width;
        fillBody();
        text =view.needStone;
        fillBodyAndOffset(offset,onlyStone>=view.needStone);
    }
    if(view.needIronore){
        text = "消耗铁矿：";
        offset = ctx.measureText(text).width;
        fillBody();
        text = view.needIronore;
        fillBodyAndOffset(offset,onlyIronore>=view.needIronore);
    }
    if(view.needMoney){
        text = "消耗铜币：";
        offset = ctx.measureText(text).width;
        fillBody();
        text = view.needMoney;
        fillBodyAndOffset(offset,onlyMoney>=view.needMoney);
    }
    var hh = view.upgradeTime/3600>>0;
    if(hh<10){
        hh = "0" + hh;
    }
    var mm = view.upgradeTime%3600/60>>0;
    if(mm < 10){
        mm = "0" + mm;
    }
    var ss = view.upgradeTime%60;
    if(ss < 10){
        ss = "0" + ss;
    }
    text = "消耗时间："+hh+":"+mm+":"+ss;

    fillBodyAndOffset(0,true);

    //效果
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("效果",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;


    var drawEffect = function(effect,value,nextValue){
        if(!effect || !value || !nextValue){
            return;
        }
        var effectType = tooltip.buildingEffectValueType[effect];
        if(effectType == "%"){
            value = value.toFixed(1);
        }else{
            value = value >>0;
        }
        text = tooltip.buildingEffectType[effect] + value + effectType +" ";
        ctx.font = tooltip.body;
        offset = ctx.measureText(text).width;
        fillBody();
        text = "(+"+(nextValue - value)+")";
        fillAddAndOffset(offset);
    }
    drawEffect(view.effect1,view.value1,view.nextValue1);
    drawEffect(view.effect2,view.value2,view.nextValue2);
    drawEffect(view.effect3,view.value3,view.nextValue3);
    drawEffect(view.effect4,view.value4,view.nextValue4);
    ctx.restore();
}
/*
 *计算拆除tooltip高度
 */
tooltip.computDemolish = function(ctx,data){
    /*计算高度*/
    var height = tooltip.padding_v*2 + tooltip.h1_fontSize + tooltip.line_space;
    if(data.flag == 2){
        height += tooltip.body_fontSize + tooltip.line_space;
        return {height:height};
    }
    height += (tooltip.h2_fontSize + tooltip.line_space)*2;//标题(信息 效果)
    var view = data.view;
    var count = 1;//时间
    //资源
    if(view.returnWood){
        count ++;
    }
    if(view.returnStone){
        count ++;
    }
    //效果、效果值
    if(view.effect1 && view.value1){
        count ++;
    }
    if(view.effect2 && view.value2){
        count ++;
    }
    if(view.effect3 && view.value3){
        count ++;
    }
    if(view.effect4 && view.value4){
        count ++;
    }
    height += (tooltip.body_fontSize + tooltip.line_space)*count;
    return {height:height};
    /*结束计算高度*/
}

/*
 * 绘制建筑拆除tooltip
 */
tooltip.drawDemolish = function (img,ctx,x,y,data){
    ctx.save();
    ctx.globalAlpha = 1;
    var view = data.view;
    var height = tooltip.computDemolish(ctx,data).height;
    /*绘制*/
    //绘制背景
    ctx.fillStyle = tooltip.back_color;
    ctx.fillRect(x,y,tooltip.width,height);
    //绘制边框
    ctx.strokeStyle = tooltip.border_color;
    ctx.strokeRect(x,y,tooltip.width,height);

    //绘制建筑名
    var posY = tooltip.padding_v;
    ctx.textBaseline = "top";//文字顶部对齐
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = tooltip.h1;
    var text = "拆除";
    ctx.fillText(text,x+tooltip.width/2,y+posY);
    posY += tooltip.h1_fontSize;
    posY += tooltip.line_space;
    ctx.textAlign = "left";

    /*
     *绘制基本body，并且偏移posY
     */
    var fillBodyAndOffset = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;

        ctx.fillText(text,x+tooltip.padding_h,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }

    if(data.flag == 2){
        console.log(data.flag);
        text = "该建筑物不能拆除";
        fillBodyAndOffset();
        ctx.restore();
        return;
    }
    /*
     *绘制基本body，并且偏移posY
     */
    var fillMinusAndOffset = function(offsetx){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_bad;

        ctx.fillText(text,x+tooltip.padding_h+offsetx,y+posY);
        posY += tooltip.body_fontSize;
        posY += tooltip.line_space;
    }
    /*
     *绘制基本body，不偏移
     */
    var fillBody = function(){
        ctx.font = tooltip.body;
        ctx.fillStyle = tooltip.body_color_nomal;
        ctx.fillText(text,x+tooltip.padding_h,y+posY);
    }
    //信息
    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("信息",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;
    var offset;
    if(view.returnWood){
        text = "返还木材：" + view.returnWood;
        fillBodyAndOffset();
    }
    if(view.returnStone){
        text = "返还石料：" + view.returnStone;
        fillBodyAndOffset();
    }
    var hh = view.demolishTime/3600>>0;
    if(hh<10){
        hh = "0" + hh;
    }
    var mm = view.demolishTime%3600/60>>0;
    if(mm < 10){
        mm = "0" + mm;
    }
    var ss = view.demolishTime%60;
    if(ss < 10){
        ss = "0" + ss;
    }
    text = "消耗时间："+hh+":"+mm+":"+ss;
    fillBodyAndOffset();

    //效果

    ctx.drawImage(img,x,y+posY+tooltip.h2_fontSize/2);
    ctx.font = tooltip.h2;
    ctx.fillStyle = tooltip.h2_color;
    ctx.fillText("效果",x+tooltip.padding_h+tooltip.h2_space,y+posY);
    posY += tooltip.h2_fontSize;
    posY += tooltip.line_space;


    var drawEffect = function(effect,value,lastValue){
        if(!effect || !value){
            return;
        }
        var effectType = tooltip.buildingEffectValueType[effect];
        if(effectType == "%"){
            value = value.toFixed(1);
        }else{
            value = value >>0;
        }
        text = tooltip.buildingEffectType[effect] + value + effectType+" ";
        ctx.font = tooltip.body;
        offset = ctx.measureText(text).width;
        fillBody();
        text = "(-"+(value-lastValue)+")";
        fillMinusAndOffset(offset);
    }
    drawEffect(view.effect1,view.value1,view.lastValue1);
    drawEffect(view.effect2,view.value2,view.lastValue2);
    drawEffect(view.effect3,view.value3,view.lastValue3);
    drawEffect(view.effect4,view.value4,view.lastValue4);
    ctx.restore();
}
///////////////////////////////测试//////////////////////////////
function draw1(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawEquipment (img,ctx,100,100,{"equipmentType":1,"strengthenStrategy":1,"strengthenPhysique":1,"strengthenLevel":1,"strategy":0,"needLevel":1000000000,"weaponType":1,"isBound":0,"equipmentDesc":"粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔粗麻编织制成的优质级民兵头盔","strengthenAgility":1,"agility":2,"equipmentName":"民兵头盔","quality":1,"physique":0,"strengthenForce":1,"heroForce":233});
        }
    }


}

function draw2(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawItem (img,ctx,100,100,{"itemName":"膏药","description":"使用后为医馆增加100膏药。","isBound":1});
        }
    }


}
function draw3(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawMaterial(img,ctx,100,100,{"materialName":"1级龙髓晶石","description":"谋略 +2","quality":1,"materialType":3,"isBound":0});
        }
    }


}

function draw4(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawHero(img,ctx,100,100,{"materialName":"1级龙髓晶石","description":"谋略 +2","quality":1,"materialType":3,"isBound":0});
        }
    }


}


function draw5(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawSkill(img,ctx,100,100,{"materialName":"1级龙髓晶石","description":"谋略 +2","quality":1,"materialType":3,"isBound":0});
        }
    }


}

function draw6(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawTech(img,ctx,100,100,{"name":"科技11","type":"内政","level":1,"effect":"没用的内政科技","needTime":"22:22:22","nextEffect":"还是没用"});
        }
    }
}

function draw7(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawLineDesc(ctx,100,100,"没用的内政科技");
        }
    }
}

function draw8(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawBuilding(img,ctx,100,100,{"location":26,"level":1,"flag":0,"view":{"name":"民居","img":"mj_1","desc":"民居影响城池的人口上限和人口增长速度，人口是税收和新兵的来源","effect1":8,"effect2":0,"effect3":0,"effect4":0,"value1":525.0,"value2":0.0,"value3":0.0,"value4":0.0,"lastValue1":0.0,"lastValue2":0.0,"lastValue3":0.0,"lastValue4":0.0,"nextValue1":650.0,"nextValue2":0.0,"nextValue3":0.0,"nextValue4":0.0,"needWood":152,"needStone":111,"needIronore":0,"needMoney":0,"upgradeTime":3,"returnWood":0,"returnStone":0,"demolishTime":0}});
        }
    }
}

function draw9(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawUpgrade(img,ctx,100,100,{"location":26,"level":1,"flag":1,"view":{"name":"民居","img":"mj_1","desc":"民居影响城池的人口上限和人口增长速度，人口是税收和新兵的来源","effect1":8,"effect2":0,"effect3":0,"effect4":0,"value1":525.0,"value2":0.0,"value3":0.0,"value4":0.0,"lastValue1":0.0,"lastValue2":0.0,"lastValue3":0.0,"lastValue4":0.0,"nextValue1":650.0,"nextValue2":0.0,"nextValue3":0.0,"nextValue4":0.0,"needWood":152,"needStone":111,"needIronore":0,"needMoney":0,"upgradeTime":3,"returnWood":0,"returnStone":0,"demolishTime":0}});
        }
    }
}
function draw10(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawDemolish(img,ctx,100,100,{"location":26,"level":1,"flag":2,"view":{"name":"民居","img":"mj_1","desc":"民居影响城池的人口上限和人口增长速度，人口是税收和新兵的来源","effect1":8,"effect2":0,"effect3":0,"effect4":0,"value1":525.0,"value2":0.0,"value3":0.0,"value4":0.0,"lastValue1":0.0,"lastValue2":0.0,"lastValue3":0.0,"lastValue4":0.0,"nextValue1":650.0,"nextValue2":0.0,"nextValue3":0.0,"nextValue4":0.0,"needWood":152,"needStone":111,"needIronore":0,"needMoney":0,"upgradeTime":3,"returnWood":0,"returnStone":0,"demolishTime":0}});
        }
    }
}

function draw11(){
    var c = document.getElementById("mycanvas");
    var ctx = c.getContext("2d");
    var bg = new Image();
    bg.src="2.jpg";
    bg.onload = function(){
        ctx.drawImage(bg,0,0);
        var img = new Image();
        img.src = "tooltip.png";
        img.onload = function(){
            tooltip.drawBuildingTree(img,ctx,100,100,{"buildingNo":"c0002_1","desc":"用于训练和遣散士兵，建造和升级兵营将提高士兵上限和士兵训练速度","buildingName":"兵营","isFull":false,"image":"by","isCanBuild":true});
        }
    }
}
