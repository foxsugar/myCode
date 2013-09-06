var exitButtonCoordinate = //退出小x横纵坐标(二级菜单)包括 集市 城墙 国库 建造树 教坊 军机处 军情 军营 科教馆 民居 配兵 强化 社交 太医署 外务馆 出征
{
	 x: 1097,
	 y: 159
};
var exitButtonCoordinate2 = //退出小x横纵坐标包括 地窖
{
	 x: 1102,
	 y: 164
};
var exitButtonCoordinate3 = //退出小x横纵坐标(四级菜单)包括 联盟成员
{
	 x: 980,
	 y: 123
};
var exitButtonCoordinate4 = //退出小x横纵坐标包括 包括 宝石合成
{
	 x: 1065,
	 y: 162
};
var exitButtonCoordinate5 = //退出小x横纵坐标包括 包括 武将 武将招募
{
	 x: 1202,
	 y: 136
};
var exitButtonCoordinate6 = //退出小x横纵坐标包括 包括 邮件
{
	 x: 848,
	 y: 168
};
var exitButtonCoordinate7 = //退出小x横纵坐标包括 包括 君主 市场
{
	 x: 1098,
	 y: 145
};
var exitButtonCoordinateMiddle = //退出小x横纵坐标(弹出菜单)居中类型 包括 君主信息
{
	 x: 935,
	 y: 217
};
var myLianmengFont = ["联盟信息","联盟成员","联盟福利","联盟科技","联盟兵营","联盟活动","联盟市场"];
var countryName=['隋','夏','魏','楚','梁'];
var isDianjuan = true;
var isJinding = false;
var speedType = 1;
var upPeopleIndex = 0;
var isWaiwuguan = false;
var findUnionDiv = null;
var findUnionName;
var unionNameDiv = null;//联盟名字
var unionNameText;
var unionDescribeDiv = null;
var unionDesText;
var unionBulletinDiv = null;
var unionBulletinText;
var unionFlagDiv = null;//联盟旗帜
var unionFlagText;
var findUnionDiv = null;
var findUnionByName = null;//排行DIV
var findUnionName;
var isTempUnion = true;
var isEstablishUnion = true;
var isefoundUnion = true;

var isFrist = true;
var selectWorM = new Array();
selectWorM[0] = true;
selectWorM[1] = false;
var unionInformation = new Array();
unionInformation[0] = true;
unionInformation[1] = false;
unionInformation[2] = false;
var worldInformation = new Array();
worldInformation[0] = true;
worldInformation[1] = false;
worldInformation[2] = false;
worldInformation[3] = false;
worldInformation[4] = false;
var unionIndex = 0;
var worldIndex = 0;
var countryIndex = 0;
var worldForm = [[542,318,98],[640,318,50],[690,318,90],[780,318,70],[850,318,70],[920,318,80],[1000,318,85]];
var consumeIndex = 0;
var wealIndex = 0;
var isRegisterUnion = false;
var isUnion = true;
var shineiOffset = 1440 - 140;
var tempSoldierAmount = new Array();
var tempOldSoldierAmount = new Array();
var moveArray = new Array();
var com_group = 'cityMenu';
var com_layer = 'cityMenuLayer';
var kingData = undefined;
var kingInfo = new Array();
var cityData = undefined;
var cityInfo = new Array();
var xqIndex = -1;
var isManual = false;
var warfareButtonCtr = true;
var lotIndex = 0;//地块索引
var jxgListIndex = 0;
var isExit = false;
var _item = new Array();
var _zhuangbei = new Array();
var tempX = 0;
var drawArc = false;
var drawArc1 = false;
var obj;
var drawArcArray = new Array();//控制图片加亮效果
var cityBuildIndex = 2;
var houseBuildIndex = 2;
var divjyxunNum = null;
var divjunjichuNum = null;
var divjinjieNum = null;
var divQiansanNum = null;
var divNameBg;
var resourcesCtr = false;
var bulidingCtr  = false;
var chuzhengCtr = false;
var resCtr = false;
var taskItemName = new Array();
taskItemName[0] = 'wujiang';
taskItemName[1] = 'guozhan';
taskItemName[2] = 'guoku';
taskItemName[3] = 'shejiao';
taskItemName[4] = 'renwu1';
taskItemName[5] = 'paihang';
taskItemName[6] = 'shezhi';
var taskItemPic = new Array();
taskItemPic[0] = 'wujiangpic';
taskItemPic[1] = 'guozhanpic';
taskItemPic[2] = 'guokupic';
taskItemPic[3] = 'shejiaopic';
taskItemPic[4] = 'renwupic';
taskItemPic[5] = 'paihangpic';
taskItemPic[6] = 'shezhipic';
var isDrawTaskItem = new Array();
isDrawTaskItem[0] = false;
isDrawTaskItem[1] = false;
isDrawTaskItem[2] = false;
isDrawTaskItem[3] = false;
isDrawTaskItem[4] = false;
isDrawTaskItem[5] = false;
isDrawTaskItem[6] = false;
var roleBoolean = new Array();
roleBoolean[0] = false;
roleBoolean[1] = false;
roleBoolean[2] = false;
roleBoolean[3] = false;
roleBoolean[4] = false;
roleBoolean[5] = false;
roleBoolean[6] = false;
roleBoolean[7] = false;
var tempY = 0; //画底部任务条每个ITEM的间距
var tempX = 0;
var isDrawHouse  = new Array();
var initDate = 10;
var upgradeTimer = new Array();//更新升级时间
var isLevel = new Array();//判断是否点击升级
var addSpeed = new Array();//判断是否点击加速控制
var secNum = new Array();//每个建筑的升级时间计数
secNum[1] = 0;
secNum[2] = 0;
var timeInterval_2;
var initDate1 = 10;
var drawShengjiItem = true;
var isDrawUI = new Array();
var listState = -1;
var LIST_EQUIP = 100;
var equip_OffsetY = 0;
var equip_BeginSlip = false;
var equip_Time = 0;
var equipOffsetY = 0;
var wj_OffsetY = 0;
var wj_BeginSlip = false;
var wj_Time = 0;
var wjOffsetY = 0;
var wujiangList = new listClass();
var guokuList = new listClass();
var jjclist = new listClass();
var tyslist = new listClass();
var jxglist = new listClass();
var jxg2list = new listClass();
var jflist = new listClass();
var jfslist = new listClass();
var kjglist = new listClass();
//科教馆列表
var kjg_OffsetY = 0;
var kjg_BeginSlip = false;
var kjg_Time = 0;
var kjgOffsetY = 0;
//教坊技能列表
var jfs_OffsetY = 0;
var jfs_BeginSlip = false;
var jfs_Time = 0;
var jfsOffsetY = 0;
//教坊列表
var jf_OffsetY = 0;
var jf_BeginSlip = false;
var jf_Time = 0;
var jfOffsetY = 0;
//聚贤阁列表
var jxg_OffsetY = 0;
var jxg_BeginSlip = false;
var jxg_Time = 0;
var jxgOffsetY = 0;
//聚贤阁列表2
var jxg2_OffsetY = 0;
var jxg2_BeginSlip = false;
var jxg2_Time = 0;
var jxg2OffsetY = 0;
//太医署列表
var tys_OffsetY = 0;
var tys_BeginSlip = false;
var tys_Time = 0;
var tysOffsetY = 0;
//军机处列表
var jjc_OffsetY = 0;
var jjc_BeginSlip = false;
var jjc_Time = 0;
var jjcOffsetY = 0;
//军营列表
var jy_OffsetY = 0;
var jy_BeginSlip = false;
var jy_Time = 0;
var jyOffsetY = 0;
var jylist = new listClass();
//聊天列表
var chat_OffsetY = 0;
var chat_BeginSlip = false;
var chat_Time = 0;
var chatOffsetY = 0;
var chatlist = new listClass();
//宝石列表
var bs_OffsetY = 0;
var bs_BeginSlip = false;
var bs_Time = 0;
var bsOffsetY = 0;
var bsList = new listClass();
//镶嵌列表
var xq_OffsetY = 0;
var xq_BeginSlip = false;
var xq_Time = 0;
var xqOffsetY = 0;
var xqList = new listClass();
//强化列表
var qh_OffsetY = 0;
var qh_BeginSlip = false;
var qh_Time = 0;
var qhOffsetY = 0;
var qhList = new listClass();
//合成列表
var hecheng_OffsetY = 0;
var hecheng_BeginSlip = false;
var hecheng_Time = 0;
var hechengOffsetY = 0;
var hechengList = new listClass();
//下拉列表测试
var test_OffsetY = 0;
var test_BeginSlip = false;
var test_Time = 0;
var testOffsetY = 0;
var testList = new listClass();
//任务列表
var task_OffsetY = 0;
var task_BeginSlip = false;
var task_Time = 0;
var taskOffsetY = 0;
var tasklist = new listClass();
//无偿福利列表
var weal_OffsetY = 0;
var weal_BeginSlip = false;
var weal_Time = 0;
var wealOffsetY = 0;
var weallist = new listClass();
//消耗福利列表
var consume_OffsetY = 0;
var consume_BeginSlip = false;
var consume_Time = 0;
var consumeOffsetY = 0;
var consumelist = new listClass();
//国库列表
var gk_OffsetY = 0;
var gk_BeginSlip = false;
var gk_Time = 0;
var gkOffsetY = 0;
var gkList = new listClass();
//拍卖行列表
var pmh_OffsetY = 0;
var pmh_BeginSlip = false;
var pmh_Time = 0;
var pmhOffsetY = 0;
var pmh_List = new listClass();
//表情列表
var customFace_OffsetY = 0;
var customFace_BeginSlip = false;
var customFace_Time = 0;
var customFaceOffsetY = 0;
var customFacelist = new listClass();
//装备列表
var zhuangbeiList = new listClass();
var jf_list = 0;
var isBgMoving = false;
var isMapMoving = false;
var worldMapStartX = 0;
var worldMapStartY = 0;
var leftX = -100;
var rightX = 2000;
var upY = -100;
var downY = 2000;
var worldMapDropStartY = 100;
var fromMap = true;
var worldCol = 3;
var worldRow = 3;
var max_width = 1440;
var recordX = worldMapStartX; 
var recordY = worldMapStartY; 
var titleMapOffset = 77;
var hourseMapOffset = 80;
var cityWallLight = false;
var chatValue = 0;
var roleBoolean = new Array();
roleBoolean[0] = false;
roleBoolean[1] = false;
roleBoolean[2] = false;
roleBoolean[3] = false;
roleBoolean[4] = false;
roleBoolean[5] = false;
roleBoolean[6] = false;
roleBoolean[7] = false;
var divName;
var divNameBg;
var isDrawUI = new Array();
var manChioce = false;
var womanChioce = false;
var  geziX = 0;
var  geziY = 0;
var  roleX = -100;
var  roleY = -100;		 
var  rolerandom = -1;
var countryName = new Array();
countryName[0] = '隋';
countryName[1] = '夏';
countryName[2] = '魏';
countryName[3] = '楚';
countryName[4] = '梁';
var countryNameText;
var houseBuildIndex = new Array();
var buuldType = new Array();
var buildList =[
//tag, x1, y1, x2  y2, x3, y3, x4, y4,buildLevel,buildState,id
    ['build_empty','state_empty',722,63,802,100,722,140,645,102,0,0,0,'state_demolition_empty'],
    ['build_src','state_empty',0,0,1440,0,1440,742,0,742,0,0,1,'state_demolition_empty'],//城墙
	['build_empty','state_empty',722,63,802,100,722,140,645,102,0,0,2,'state_demolition_empty'],
	['build_empty','state_empty',843,120,924,159,845,200,764,161,0,0,3,'state_demolition_empty'],
	['build_empty','state_empty',1136,267,1216,306,1137,347,1059,307,0,0,4,'state_demolition_empty'],
	['build_empty','state_empty',1260,326,1339,365,1261,405,1183,368,0,0,5,'state_demolition_empty'],
	['build_empty','state_empty',1360,380,1436,418,1360,458,1285,420,0,0,6,'state_demolition_empty'],
	['build_empty','state_empty',614,114,693,153,613,194,534,155,0,0,7,'state_demolition_empty'],	
	['build_empty','state_empty',735,175,813,214,732,254,657,217,0,0,8,'state_demolition_empty'],		
    ['build_empty','state_empty',1030,321,1109,361,1028,402,951,362,0,0,9,'state_demolition_empty'],
    ['build_empty','state_empty',1151,382,1231,421,1151,461,1073,423,0,0,10,'state_demolition_empty'],
    ['build_empty','state_empty',423,197,500,237,421,248,343,238,0,0,11,'state_demolition_empty'],
    ['build_empty','state_empty',642,300,720,342,641,381,562,342,0,0,12,'state_demolition_empty'],
    ['build_empty','state_empty',820,393,898,432,819,472,741,434,0,0,13,'state_demolition_empty'],
    ['build_empty','state_empty',1044,502,1123,540,1044,583,966,543,0,0,14,'state_demolition_empty'],
    ['build_empty','state_empty',322,246,402,286,322,327,243,288,0,0,15,'state_demolition_empty'],
    ['build_empty','state_empty',430,299,508,339,429,378,350,339,0,0,16,'state_demolition_empty'],
    ['build_empty','state_empty',539,350,619,389,538,430,458,390,0,0,17,'state_demolition_empty'],
    ['build_empty','state_empty',715,446,792,485,718,524,639,484,0,0,18,'state_demolition_empty'],
    ['build_empty','state_empty',829,496,908,536,828,576,752,537,0,0,19,'state_demolition_empty'],
    ['build_empty','state_empty',939,552,1019,591,940,632,861,593,0,0,20,'state_demolition_empty'],
    ['build_empty','state_empty',220,295,298,335,217,375,140,336,0,0,21,'state_demolition_empty'],
    ['build_empty','state_empty',323,349,403,387,322,428,245,390,0,0,22,'state_demolition_empty'],
    ['build_empty','state_empty',432,402,510,443,429,482,354,443,0,0,23,'state_demolition_empty'],
    ['build_empty','state_empty',616,494,693,534,614,573,538,534,0,0,24,'state_demolition_empty'],
    ['build_empty','state_empty',721,547,799,589,723,626,646,589,0,0,25,'state_demolition_empty'],
    ['build_empty','state_empty',835,603,913,643,832,683,757,644,0,0,26,'state_demolition_empty'], 
    ['build_src','state_empty',1003,61,1299,181,1189,264,1003,149,0,0,27,'state_demolition_empty'],//太尉府
];
var buildingID = [
	10110003,10110006,10110004,10110007,
	10110005,10110008,10110010,10110014,
	10110009,10110015,10110016,10110011,
	10110012,10110013
];

//已建造建筑================================start
//建造属性
var res_Level = new Array();//资源等级
var build_Level = new Array();//等级
var buildName = new Array();//名称
var buildMoney = new Array();//金钱
var buildFood = new Array();//食物
var buildWood = new Array();//木材
var buildStone = new Array();//石材
var buildBronze = new Array();//青铜
var buildTime = new Array();//时间
var buildCommonDesc = new Array();//公共信息
var buildCurDesc = new Array();//当前信息

//升级属性
var upMoney = new Array();//金钱
var upFood = new Array();//食物
var upWood = new Array();//木材
var upStone = new Array();//石材
var upBronze = new Array();//青铜
var upTime = new Array();//时间
var upNeedBuildId = new Array();//依赖建筑ID
var upNeedLevel = new Array();//依赖建筑level
var upCanBuild = new Array();//升级能建造
var upBuilt = new Array();//升级已建造
var upNextDesc = new Array();//升级信息
//已建造建筑================================end

//建筑建造弹出框============================start
//建造属性
var buildingLevel = new Array();//等级
var buildingName = new Array();//名称
var buildingMoney = new Array();//金钱
var buildingFood = new Array();//食物
var buildingWood = new Array();//木材
var buildingStone = new Array();//石材
var buildingBronze = new Array();//青铜
var buildingTime = new Array();//时间
var buildingNeedBuildId = new Array();//依赖建筑ID
var buildingNeedLevel = new Array();//依赖建筑level


var buildingCommonDesc = new Array();//公共信息
var buildingCurDesc = new Array();//当前信息
//建筑建造弹出框============================end


var countryNameText = countryName[0];
/** 碰撞检测 */
var clickObjectList = [];
var build_index = new Array();
var build_time = new Array();
var upgrade_time = new Array();
var demolition_time = new Array();
var isFinish = false;
var build_cnt = new Array();
var upgrade_cnt = new Array();
var demolition_cnt = new Array();
//var build = new Array();
for(var i=0; i<27; i++){
	build_time[i] = '加载...';
	upgrade_time[i] = '加载...';
	demolition_time[i] = '加载...';
	build_cnt[i] = 0;
	upgrade_cnt[i] = 0;
	demolition_cnt[i] = 0;
}
var timeInterval = new Array();
var isAllBuildings = true;
var level_type = 0;
var drawGkItem = false;
var renwuCtr = false;
var bottonCtr = new Array();//国库按钮控制
var browseButtonCtr = new Array();
browseButtonCtr[0] = false;
browseButtonCtr[1] = false;
browseButtonCtr[2] = false;

var popupButtonCtr = new Array();
popupButtonCtr[0] = true;
popupButtonCtr[1] = false;
popupButtonCtr[2] = false;

var radioButtonCtr = new Array();
radioButtonCtr[0] = true;
radioButtonCtr[1] = false;
radioButtonCtr[2] = false;

//var positonID = new Array();
//var positonName = new Array();
var typeID = new Array();
//var typeName = new Array();
var itemName = new Array();
var userItemId = new Array();
var strengthLevel = new Array();
var itemIcon = new Array();
var itemLevel = new Array();
var qhListlevel = new Array();
var qhListColor = new Array();
var gkListColor = new Array();
var xqListColor = new Array();
var strengthenData = new Array();//强化装备信息
var stone = new Array(new Array(),new Array(),new Array());
var itemInfo = new Array();
var tempitemInfo = new Array();
var stone1Info = new Array();
var stone2Info = new Array();
var stone3Info = new Array();
var sroneLevels = new Array();
var baoshiArray = new Array();
var gk_itemInfo;
var bs_itemInfo;
var positionIndex = 0;
var typeIndex = 0;
var xq_positionIndex = 0;
var xq_typeIndex = 0;


var divPBNum = new Array();
var pbAuctionNum = new Array();
var divGFNum = null;
var gfAuctionNum = null;
var propAuctionNumbg = null;
var propAuctionNum;
var jyAuctionNum = null;
var jjcAuctionNum = null;
var jjAuctionNum = null;
var qsAuctionNum = null;
var propNumbg = null;
var propNum;
var equipmentNumbg;
var equipmentNum;
var Numbg = true;
var isDone_EquipmentByPositonAndType = false;
var isDone_StrengthenEquipment = false;
var isQianghuaList = false;
var isXiangqianList = false;
var gkData = new Array();//国库数据对象数组
var mailData = new Array();
var isInitRoleAni = true;
var isHoursebuilding = false;
var startTime;
var isShowBaoshiList = false;
var isShowDislog = false;
var isShowUsePorp = false;
var isShowAuctionPorp = false;

var displayGemstones = { slides: [  
                    { "drawGemstones": false, "id": ""},   
                    { "drawGemstones": false, "id": ""},   
                    { "drawGemstones": false, "id": ""},  
                    { "drawGemstones": false, "id": ""},  
                    { "drawGemstones": false, "id": ""}]   
        }; 

function objClone(myObj){
  if(typeof(myObj) != 'object') return myObj;
  if(myObj == null) return myObj;
  var myNewObj = new Object();
  for(var i in myObj)
  myNewObj[i] = objClone(myObj[i]);
  return myNewObj;
};
Array.prototype.clone=function()
{//为数组添加克隆自身方法，使用递归可用于多级数组
  var newArr=new Array();
  for(var i=0;i<=this.length-1;i++)
  {
      var itemi=this[i];
      if(itemi.length && itemi.push) itemi= itemi.clone();//数组对象，进行递归
      else if(typeof(itemi)=="object") itemi=objClone(itemi);//非数组对象，用上面的objClone方法克隆
      newArr.push(itemi);
  }
  return newArr;
 };
var holeIndex = 0;
var bsIndex = 0;
var popupIndex = 0;
var xqListIndex = 0;
var isShowGuokuList = false;

var demolition_upgrade = new Array();
var cancel_speed = new Array();
var testListDrg = false;
var guokuIndex = 0;
var pmhIndex = 0;

var auctionGoldDiv1 = null;
var auctionGoldValue1;
var auctionGoldDiv2 = null;
var auctionGoldValue2;
var auctionSilverDiv1 = null;
var auctionSilverValue1;
var auctionSilverDiv2 = null;
var auctionSilverValue2;
var browseNameDiv = null;
var browseName;
var browseLevelDiv = null;
var browseLevel;
var browseLevelDiv_2 = null;
var browseLevel_2;
var diplayPageNumDiv = null;
var diplayPageNum;
var jingdiplayPageNumDiv = null;
var jingdiplayPageNum;
var paidiplayPageNumDiv = null;
var paidiplayPageNum;
var afreshNameDiv = null;
var afreshNameText;
var receiveNameDiv = null;
var receiveName;
var titleNameDiv = null;
var titleName;
var viewNameDiv = null;
var viewName;
var mailContentDiv = null;
var mailContent;

var jzContentDiv = null;
var jzContent;

var worldRadarDiv = null;
var worldRadarName;

var browseBuildIndex = 0;
var qualityArray = new Array();
qualityArray[0] = "全部";
qualityArray[1] = "白色";
qualityArray[2] = "绿色";
qualityArray[3] = "蓝色";
qualityArray[4] = "紫色";
qualityArray[5] = "橙色";
var isPopupBuild = false;
var browseDisplay = true;
var auctionDisplay = false;
var jingpaiDisplay = false;

var goodsLevel = false;
var surplusTime = false;
var priceRanking = false;
var goodsLevelCtr = false;
var surplusTimeCtr = false;
var priceRankingCtr = false;
var sortCtr = false;

var goodsLevel = true;
var surplusTime = true;
var priceRanking = true;

var fillrectW ;
var fillrectH ;
var jsindex;
var jsindex_1;

var wjIndex = 0;
var wjId = -1;
Array.prototype.moveNum = function (dx) {
	    if (isNaN(dx) || dx > this.length) {
	        return false;
	    }
	    for (var i = 0, n = 0; i < this.length; i++) {
	        if (this[i] != this[dx]) {
	            this[n++] = this[i];
	        }
	    }
	    this.length -= 1;
	};
//打开兵营界面
var summaryData = undefined;//新/总 兵数/上限
var userSoldier = new Array();//用户所拥有的兵种
var techSoldier = new Array();//用户可招募、进阶到的兵种
var resourceData = undefined;//兵种相关的资源
Array.prototype.del= function(n)
{     
  console.log(n);
  if(n<0)     
    return this;   
  else   
    return this.slice(0,n).concat(this.slice(n+1,this.length));   
    /**//* 
      concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。   
      　　　　　　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)   
     　　　　　　组成的新数组，这中间，刚好少了第n项。   
      slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。   
    */   
};
/*
 *  处理自动适配DIV方法
 */
 function adaptiveDiv(divName,id,offset)
 {
 	if(divName != null && gbox._isIndwellDiv(id,"input"))
			{
				var divoffsetX = (document.body.clientWidth- 1440)/2 ;
				if(divoffsetX >=0 && document.body.clientWidth>1440)
				    divName.style.left=divoffsetX + offset;
				else
				    divName.style.left=offset;
			}
 }
//伪哈希表
function Hashtable()
{
    var has = new Array();
    this.Add = function(key,value)
    {
		if(has.length > 0)
		{
			for(var i =0 ;i < has.length;i++)
			{
				if(has[i][0] == key)
				{
					has[i][1] = value;
					return;
				}
			}
		}
		has.push(new Array(key, value));
    };
    this.removeValue = function(key)
	{
		if(has.length > 0)
		{
			var delIndex = -1;
			for(var i =0 ;i < has.length;i++)
			{
				if(has[i][0] == key)
				{
				    delIndex = i;
				}
			}
			if(delIndex != -1)
			{
			    has = has.del(delIndex);
			}
		}
	};
    this.getValue = function(key)
	{
		if(has.length > 0)
		{
			for(var i =0 ;i < has.length;i++)
			{
				if(has[i][0] == key)
				{
				   return has[i][1];
				}
			}
		}
		return null;
	};
    this.setValue = function(key,value)
	{
		if(has.length > 0)
		{
			for(var i =0 ;i < has.length;i++)
			{
			    if(has[i][0] == key)
				{
				   has[i][1] = value;
				}
			}
		}
	};
   this.getKey = function()
   {
		if(has.length > 0)
		{
			for(var i =0 ;i < has.length;i++)
			{
			    return has[i][0];
			}
	    }
	    return null;
	};
   this.Count = function()
	{
	    return has.length;
	};
   this.clear = function() 
   { 
   	    this.has = {}; 
   };
   return this;
}
var drawNum = function(x,y,pos_dx,pos_dy,string,obj,img_id,tileset)//绘制图片数字
{
	this.anim = obj;
	var tempPos_dx = pos_dx;
	
	for(var i = 0; i < string.length ; i++)
	{
		var chTem = string[i];
		if(chTem >= '0' && chTem <= '9')
		{
			
			this.anim.image = img_id;
			var data = 
			{	
				tileset : tileset,
				tile : chTem,
				dx : x + (this.anim.coll[chTem][2] + tempPos_dx) * i,
				dy : pos_dy === 0 ? y : y + (y + this.anim.coll[chTem][3] + pos_dy) * i,
				fliph : this.fliph,
				flipv : this.flipv,
				camera : this.camera,
				alpha : 1.0,		
				anim : this.anim
			};
			AnimMgr.draw(gbox.getBufferContext(), data);
			if(chTem == '1')
			{
				tempPos_dx = pos_dx - 2;
			}
			else
			{
				tempPos_dx = tempPos_dx + 2;
			}
		}
		else
		{
			console.log(">>Not number.<<");
			break;
		}
	}	
};


var combobox;//下拉框类 Combobox.js
var comboboxes;//下拉框数据对象集合
var DescriptiveText;//描述性文字类
function studyLineDesc(ctx,str,strWidth)//分行
{
    ctx.font = tooltip.body;
    var lineWidth = strWidth;
//  var firstLineWidth = lineWidth - tooltip.tab_space;
    var firstLineWidth = lineWidth;
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