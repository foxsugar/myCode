package noumena.game.saolchat.util;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.TreeSet;
import java.util.Vector;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

/**
 * @author YPP
 * Util提供了一些常用的工具方法
 *
 */
public class Util
{
	public static String[] cen = {"lawless_keyword",
		"16dy-图库", "16大", "18禁", "１８歲淫亂", "18歲淫亂", "21wuxia.loong3d.com",
		"222se图片", "33bbb走光", "3P", "3P炮图", "5173", "５１７３", "55sss偷拍区",
		"64事件", "64运动", "77bbb", "89事件", "89运动", "97sese", "999日本妹",
		"99bb", "a4u", "a4y", "admin", "adult", "aids", "AION", "ai滋",
		"alert", "amateur", "anal", "asiasex", "av貼圖", "a片", "Bao皮",
		"bastard", "Biao子", "bitch", "Bi样", "blow", "BlowJobs", "bong",
		"b样", "cao", "cao ni ma", "cao你", "cbi.loong3d.com", "cha你",
		"chinamz", "chinesenewsnet", "create", "cs", "DACN", "ＤＣ", "DC",
		"delete", "dick", "dog养", "dog養", "drop", "f u c k", "f_u_c_k",
		"fa 伦fa-lun-gong", "falco", "falun", "falundafa", "fa-lun-gong",
		"fa伦", "feltch", "ferry", "FLG", "fuck", "Fuck you", "ｇ", "g.m",
		"g。m", "game", "gamemaste", "gan ni ma", "gan你", "gcd", "gm",
		"GT劲舞团2", "g点", "g片", "hardcore", "hotsex", "H动漫", "incest",
		"insert", "j8", "japansweet", "jb", "jian你", "Ji女", "job",
		"Joyplay.loong3d.com", "kao", "kefu", "kiss", "k他命", "lihongzhi",
		"LUNA", "ｍ", "madelove", "Mai骚", "makelove", "makinglove",
		"master", "MKZ军魂", "MM屄", "mm美图", "netfriends.loong3d.com", "nmd",
		"nnd", "pcgg.loong3d.com", "penis", "petgirl",
		"popsoft.loong3d.com", "porn", "ppw.loong3d.com", "qh.loong3d.com",
		"RI NI MA", "SARS", "SD敢达", "server", "sex", "sf", "shit", "sm",
		"smsd.loong3d.com", "sm调教", "SM女王", "SM舔穴", "SM援交", "SNDA", "suck",
		"table", "Taiwan国", "TAOBAO", "teen", "teen sexy", "tengren",
		"tengwu", "Tibet独立", "Tit国", "tmd", "tnnd", "Ttmd", "tw", "tw18",
		"TX2", "ucg.loong3d.com", "update", "wetback", "wg", "xiao77",
		"xizang", "Ｘ到噴屎尿", "x到噴屎尿", "youxika", "ㄐ八", "ㄐ巴", "ㄐ掰", "ㄙㄞ你爸",
		"ㄙㄞ你公", "ㄙㄞ你老母", "ㄙㄞ你老师", "ㄙㄞ你母", "ㄙㄞ你娘", "阿扁", "阿扁万岁", "阿拉伯",
		"阿拉法特", "阿罗约", "阿弥陀佛", "阿沛阿旺晋美", "阿呀娃娃", "阿雅娃娃", "啊无卵", "啊呀娃娃",
		"啊雅娃娃", "挨球", "艾森豪威尔", "艾则孜", "艾滋", "艾滋病", "爱女人", "爱妻淫穴", "爱色cc",
		"爱图公园", "爱液", "爱液横流", "爱幼阁", "爱滋", "安非他命", "安拉", "安南", "按摩棒",
		"肮脏美学", "奥巴马", "奥马尔", "八九", "八九事件", "八九运动", "八老", "八路", "八仁乡",
		"巴仁乡", "扒屄", "扒光", "扒穴", "拔屄", "拔屄自拍", "拔出来", "掰穴", "掰穴打洞",
		"掰穴皮卡丘", "白痴", "白粉", "白虎嫩B", "白虎少妇", "白虎小穴", "白虎阴穴", "白浆四溅", "白烂",
		"白立朴", "白立樸", "白莲教", "白夢", "白梦", "白嫩骚妇", "白液四溅", "百克力", "班禅", "斑竹",
		"版主", "办理文凭", "办理证件", "辦理文憑", "辦理證件", "绑架", "膀胱", "包pi", "包二奶",
		"包皮", "保钓", "保釣", "保卫台湾", "鲍威尔", "暴动", "暴动、暴乱、暴行、", "暴動", "暴干",
		"暴奸", "暴力虐待", "暴乱", "暴亂", "暴乳", "暴徒", "暴行", "暴淫", "暴政", "爆操", "爆草",
		"爆草 ", "爆乳", "爆乳娘", "爆乳娘 ", "爆乳人妻", "爆炸", "北大三角地论坛", "北大三角地論壇",
		"北京xx网", "北京当局", "北京當局", "北美自由论坛", "北美自由論壇", "被操", "被插", "被干",
		"被幹", "本 拉登", "本拉丹", "本拉登", "本土无码", "笨蛋", "屄", "屄屄", "屄屄 ", "屄屄特写",
		"屄毛", "逼", "逼奸", "逼毛", "逼你老母", "逼痒", "逼样", "逼孕", "逼孕套", "比卵", "比水",
		"比样", "毕加索", "碧香亭", "碧香亭 ", "避孕", "避孕套", "鞭神", "鞭王", "变态", "婊",
		"婊zi", "婊子", "婊子养的", "宾馆女郎", "冰毒", "勃不起斯懦夫", "勃大精深", "勃起", "博讯",
		"博訊", "薄码", "薄一波", "不开化", "不爽不要钱", "布莱尔", "布朗", "布什", "步飞烟", "步非烟",
		"采花堂", "菜b", "菜逼", "蔡崇国", "蔡崇國", "蔡和森", "蔡启芳", "蔡庆林、", "蔡英文", "蚕头",
		"藏獨", "藏独", "藏独分裂", "藏独分子", "藏独会", "藏独势力", "藏妇会", "藏青会", "操",
		"操78", "操b", "操B指南", "操屄", "操逼", "操比", "操蛋", "操狗", "操黑", "操机掰",
		"操鸡", "操她", "操她妈", "操烂", "操两下", "操兩下", "操林", "操母狗", "操那吗B", "操那吗逼",
		"操那吗比", "操妳", "操妳妈", "操妳娘", "操妳全家", "操妳祖宗", "操尼", "操你", "操你爸",
		"操你老妈", "操你老母", "操你妈", "操你媽", "操你媽的", "操你奶奶", "操你娘", "操你全家",
		"操你爷爷", "操你祖宗", "操妻", "操射", "操神", "操爽", "操死", "操他", "操他妈", "操王",
		"操我", "操穴", "操穴喷水", "操肿", "曹刚川", "曹庆泽", "草尼", "草泥妈", "草泥媽", "草你",
		"草你妈", "草你娘", "草拟妈", "草芝麻", "草枝麻", "懆您妈", "懆您娘", "肏", "肏屄", "册老",
		"册那", "册那娘比", "册那娘饿比", "侧那", "厕奴", "厕所盗摄", "厕所偷拍", "测拿", "插b",
		"插暴", "插爆", "插逼", "插比", "插后庭", "插她", "插进", "插那吗B", "插那吗逼", "插那吗比",
		"插你", "插你爸", "插你老母", "插你妈", "插你奶奶", "插你娘", "插你全家", "插你爷爷", "插你祖宗",
		"插哦", "插入内射", "插死你", "插他", "插我", "插穴", "插穴手淫", "插穴止痒", "插阴", "插阴茎",
		"柴玲", "缠头", "產黨", "娼妓", "猖妓", "常委", "超毛大鲍", "朝天穴", "朝鲜族", "潮吹",
		"潮喷", "车仑", "车仑女干", "陈炳基", "陈伯达", "陈博志", "陈定南", "陈独秀", "陈建铭", "陈菊",
		"陈军", "陈良宇", "陈蒙", "陈慕华", "陈丕显", "陈破空", "陈水扁", "陈随便", "陈唐山", "陈天桥",
		"陈希同", "陈锡联", "陈宣良", "陈一谘", "陈毅", "陈永贵", "陈云", "陈至立", "陈总", "陈总统",
		"陳炳基", "陳軍", "陳蒙", "陳破空", "陳水扁", "陳小同", "陳毅", "陳雲", "陳總統", "成吉思汗",
		"成克杰", "成人", "成人A片", "成人bt", "成人百强", "成人导航", "成人电影", "成人電影",
		"成人黃色網站", "成人黄色网站", "成人论坛", "成人論壇", "成人漫画", "成人漫畫", "成人片", "成人情色",
		"成人情色网站", "成人情色網站", "成人社区", "成人社區", "成人贴图", "成人贴图网站", "成人貼圖",
		"成人貼圖網站", "成人图片", "成人图片网站", "成人圖片", "成人圖片網站", "成人网", "成人网站", "成人網",
		"成人網站", "成人文学", "成人文學", "成人午夜场", "成人小区", "成人小说", "成人小游戏", "成人小遊戲",
		"成人影視", "成人游戏", "成人遊戲", "成人娛樂網站", "成人娱乐网站", "成人之家", "成人自拍", "吃shi",
		"吃大便", "吃鸡巴", "吃精", "吃屎", "痴乳", "迟浩田", "持不同政见", "遲浩田", "耻辱轮奸",
		"赤壁", "赤匪", "赤化", "赤裸", "赤裸天使", "宠物小精灵", "抽插", "抽头", "筹码", "臭逼",
		"臭吊", "臭机", "臭机八", "臭鸡", "臭鸡巴", "臭西", "出售假币", "出售假幣", "出售枪支",
		"出售槍支", "出售手枪", "出售手槍", "処女", "处男", "处女", "处女开包", "处女膜", "豖者",
		"處男", "處女", "川岛芳子", "传销", "吹喇叭", "吹萧", "吹箫", "吹簫", "春光外泻",
		"春夏自由论坛", "春夏自由論壇", "春药", "春藥", "蠢猪", "戳b", "戳逼", "戳比", "戳那吗B",
		"戳那吗逼", "戳那吗比", "戳你", "次郎", "催情药", "催情藥", "错b", "错逼", "错比", "错那吗B",
		"错那吗逼", "错那吗比", "达芬奇", "达赖", "达赖喇嘛", "达賴", "达癞", "達赖", "達賴", "打 炮",
		"打倒", "打倒共产党", "打倒共產黨", "打倒中国", "打倒中国共产党", "打倒中华人民共和国", "打到共产党",
		"打到中国", "打飞机", "打炮", "打砲", "打手枪", "打手槍", "打野炮", "打砸抢烧杀", "大", "大b",
		"大j", "大j8", "大逼", "大比", "大便", "大波", "大波粉B", "大波骚妇", "大波骚妇 ",
		"大部队", "大参考", "大參考", "大承", "大城", "大乘", "大胆出位", "大胆出位 ", "大胆少女",
		"大吊", "大东亚", "大东亚共荣", "大东亚共荣圈", "大法", "大盖帽", "大蓋帽", "大鸡巴", "大鸡巴 ",
		"大纪元新闻网", "大纪园", "大紀元新聞網", "大紀園", "大力抽送", "大乱交", "大乱交 ", "大麻",
		"大奶美逼", "大奶骚女", "大奶头", "大乳", "大史紀", "大史記", "大湾乡", "大卫教", "大学骚乱",
		"大學騷亂", "大血比", "大跃进", "大躍進", "大中国论坛", "大中國論壇", "大中华论坛", "大中華論壇",
		"大众成人网", "大众成人网站", "大众色情成人网", "大众真人真事", "大眾成人網", "大眾成人網站",
		"大眾真人真事", "大字报", "呆比", "代理", "代练", "代練", "带练", "带套肛交", "待操", "逮捕",
		"戴海靜", "戴相龙", "戴相龍", "蛋清", "党卫兵", "党中央", "党主席", "荡妇", "荡女", "蕩妹",
		"导弹", "倒台", "盗撮", "道教", "的洞", "登辉", "登輝", "邓发", "邓力群", "邓小平",
		"邓笑贫", "邓颖超", "鄧小平", "鄧笑貧", "迪里夏提", "迪裏夏提", "抵制日货", "地藏", "地富反坏右",
		"地富反壞右", "地下教会", "地下教會", "地下刊物", "弟大物勃", "帝国之梦", "帝国主义", "帝國之夢",
		"点卡", "电视流氓", "電視流氓", "刁你", "叼你", "叼你妈", "雕死", "屌", "吊东西", "吊東西",
		"吊子", "钓鱼岛", "调教", "调教虐待", "爹娘", "丁关根", "丁關根", "丁香社区", "丁元", "丁子霖",
		"丁字裤翘臀", "丁字裤翘臀 ", "腚眼", "东北xx网", "东北独立", "东方红时空", "东方迷魂",
		"东南西北论谈", "东热空姐", "东社", "东条", "东条英机", "东突", "东突暴动", "东突独立", "东突组织",
		"东土耳其斯坦", "东西南北论坛", "东亚", "东亚病", "东亚病夫", "东亚共荣", "东一运", "东伊运",
		"东正教", "東北獨立", "東方紅時空", "東方迷魂", "東南西北論談", "東社", "東突", "東土耳其斯坦",
		"東西南北論壇", "東亞病", "東亞病夫", "東洋屄", "董必武", "董文华", "动乱", "动漫色图", "動",
		"動亂", "斗殴", "豆页", "毒贩", "毒龙舔脚", "毒龙舔脚 ", "獨", "獨裁", "獨夫", "獨立臺灣會",
		"獨立中文筆會", "独裁", "独夫", "独立", "独立台湾会", "独立中文笔会", "赌博", "赌马", "赌球",
		"杜冷丁", "杜鲁门", "杜正胜", "短信群发器", "短信群發器", "断网", "对日强硬", "對日強硬",
		"多党执政", "多人轮", "多人轮 ", "多人性愛", "多维", "堕淫", "屙民", "额尔德尼", "恶劣 ",
		"恶性事件", "饿b", "饿比", "恩格斯", "二b", "二道桥", "二道巷子", "二穴中出", "发浪", "发抡",
		"发仑", "发伦", "发沦", "发纶", "发轮", "发论", "发骚", "发正念", "発妻", "発射", "發倫",
		"發輪", "發論", "發正念", "法$$轮", "法$轮", "法@@轮", "法@轮", "法^^轮", "法^轮",
		"法~~轮", "法抡", "法仑", "法伦", "法沦", "法纶", "法轮", "法轮大法", "法轮功", "法倫",
		"法淪", "法輪", "法輪功", "法论", "法論", "法十轮十功", "法西斯", "法一轮", "法一輪",
		"凡人修仙传", "反党", "反黨", "反动", "反动派", "反動", "反封锁技术", "反封鎖技術", "反腐败论坛",
		"反腐敗論壇", "反革命", "反攻大陆", "反共", "反恐精英OL", "反人民", "反社会", "反政府", "贩毒",
		"梵高", "方励之", "方勵之", "房事", "仿真枪", "放荡", "放荡少妇", "放荡少妇宾馆", "放荡熟女",
		"放尿", "放屁", "飞扬论坛", "非典", "飛揚論壇", "扉之阴", "肥逼", "肥西", "斐得勒", "废物",
		"费良勇", "費良勇", "分裂", "分裂 ", "分裂国家", "分裂中国", "纷争", "焚尸", "粉屄", "粉红穴",
		"粉饰太平", "粉飾太平", "粉穴", "粪便", "糞", "丰唇艳姬", "风暴战区", "风骚", "风骚淫荡",
		"风骚欲女", "风水", "风艳阁", "风雨神州", "风雨神州论坛", "封从德", "封從德", "封殺", "封神榜",
		"疯狂抽送", "風騷", "風雨神州", "風雨神州論壇", "冯东海", "冯素英", "馮東海", "馮素英", "佛教",
		"佛展千手法", "佛祖", "夫妻3p", "夫妻p", "夫妻多p", "夫妻俱乐部", "夫妻乱交", "夫妻自拍",
		"夫妻作爱电影", "夫妻作愛電影", "夫妻做爱电影", "夫妻做愛電影", "服务管理", "浮夸风", "浮誇風",
		"福尔摩萨", "福摩萨", "辅助程序", "腐败", "付申奇", "复辟", "傅杰", "傅全有", "傅申奇",
		"傅志寰", "傅作义", "富兰克林", "復辟", "盖世太保", "干B", "干bi", "干x", "干x娘", "干爆",
		"干逼", "干比", "干到", "干的你", "干的爽", "干干", "干机", "干鸡", "干她", "干她妈",
		"干啦", "干勒", "干林", "干拎娘", "干妳", "干妳老母", "干妳妈", "干妳马", "干妳娘", "干尼",
		"干你", "干你老比", "干你老母", "干你良", "干你妈", "干你妈b", "干你妈逼", "干你娘", "干您",
		"干您娘", "干七八", "干全家", "干汝", "干入", "干爽", "干死", "干死客服", "干死你", "干他",
		"干他妈", "干它", "干牠", "干我", "干穴", "干一干", "干一家", "干一下", "幹", "幹B",
		"幹她", "幹妳", "幹你", "幹炮", "幹砲", "幹一下", "赣您娘", "灨你娘", "冈村宁次", "冈村秀树",
		"冈峦", "刚比", "刚比样子", "肛jiao", "肛屄", "肛交", "肛门", "肛门喷水", "肛门拳交",
		"肛門", "钢片", "高潮白浆", "高潮集锦", "高级逼", "高级逼 ", "高丽", "高丽棒子", "高丽朴",
		"高清性愛", "高文谦", "高文謙", "高校暴乱", "高校暴亂", "高校群体事件", "高校群體事件", "高校骚乱",
		"高校騷亂", "高薪养廉", "高薪養廉", "高治联", "高自联", "高自聯", "睪丸", "睾丸", "膏药旗",
		"搞", "搞b", "搞比", "搞她", "搞你", "搞死", "搞他", "戈万钧", "戈扬", "戈揚", "哥白尼",
		"哥伦布", "鸽派", "歌功颂德", "歌功頌德", "鴿派", "革命", "格老子", "个批", "给你爽",
		"根正苗红", "根正苗紅", "耿飚", "工力", "工自联", "工自聯", "工作室", "弓虽", "弓虽女干",
		"公安局", "公安厅", "公吿", "公告", "公媳乱", "公子冲", "公子开", "功法", "宫赤月", "共产",
		"共产党", "共产主义", "共產", "共產黨", "共铲党", "共鏟黨", "共党", "共黨", "共匪",
		"共匪、共军", "共狗", "共和", "共军", "共軍", "共荣圈", "勾魂少妇", "狗b", "狗比", "狗操",
		"狗操卖逼", "狗干", "狗幹", "狗狼养的", "狗卵", "狗娘", "狗娘养的", "狗屁", "狗日", "狗日的",
		"狗剩", "狗杂种", "古方米香", "古域", "谷牧", "顾顺章", "挂机", "掛", "拐卖", "关卓中",
		"观世音", "官方", "官方工作员", "官方管理者", "官商勾結", "關卓中", "管理员", "贯通两极法",
		"貫通兩極法", "灌满精液", "广闻", "廣聞", "龟儿子", "龟公", "龟奴", "龟头", "龟投", "龟种",
		"亀頭", "龜兒子", "龜頭", "龜種", "鬼吹灯", "鬼村", "鬼公", "鬼輪姦", "鬼畜轮奸", "滚那吗",
		"滚那吗B", "滚那吗错比", "滚那吗老比", "滚那吗瘟比", "棍棒", "郭伯雄", "郭罗基", "郭羅基", "郭平",
		"郭岩华", "郭岩華", "国产AV", "国产嫖娼", "国产嫖娼 ", "国产骚货", "国产偷拍", "国产无码",
		"国共合作", "国家安全", "国家分裂", "国家机密", "国家领导人", "国家文化部", "国家主席", "国家总理",
		"国军", "国民党", "国民党万岁", "国民政府", "国母 宋祖英", "国母 习夫人", "国内动态详情", "国权",
		"国外成人网站", "国务院", "国贼", "國共合作", "國家領導人", "國家主席", "國軍", "國民黨",
		"國民政府", "國權", "國外成人網站", "國務院", "國賊", "裹本", "骸卒", "海洛因", "海明威",
		"海战集结号", "含屌", "含鳥", "涵涵", "韩东方", "韩光", "韩国成人网站", "韩联潮", "韩天石",
		"韩正", "韩杼滨", "韓東方", "韓國成人網站", "韓聯潮", "汉奸", "豪乳", "好嫩", "好色cc",
		"郝伯村", "郝建秀", "何德普", "何勇", "和平演变", "和平演變", "河殇", "核工业基地", "核潜艇",
		"核武器", "贺国强", "贺龙", "赫鲁晓夫", "黑白无常", "黑屄", "黑逼", "黑鬼", "黑毛屄",
		"黑毛屄 ", "黑社会", "黑社會", "黑手党", "黑五类", "黑五類", "红灯区", "红色恐怖", "红卫兵",
		"红志", "红智", "宏法", "洪传", "洪傳", "洪兴", "洪吟", "洪哲胜", "洪哲勝", "洪志", "洪智",
		"紅色恐怖", "紅衛兵", "紅志", "紅智", "后面插进去射", "后庭", "後面插進去射", "狐臭", "胡海峰",
		"胡家天下 令家党", "胡紧掏", "胡锦涛", "胡锦滔", "胡锦淘", "胡緊掏", "胡錦滔", "胡錦濤", "胡錦淘",
		"胡景涛", "胡景濤", "胡静之 文革", "胡平", "胡启立", "胡乔木", "胡耀邦", "胡志明", "胡主席",
		"胡总书记", "胡總書記", "蝴蝶逼", "虎骑", "互舔淫穴", "互淫", "护法", "护士诱惑", "護法",
		"花花公子", "花柳", "花样性交", "华国锋", "华建敏", "华盛顿", "华通时事论坛", "华夏", "华夏文摘",
		"华语世界论坛", "华岳时事论坛", "華建敏", "華通時事論壇", "華夏文摘", "華語世界論壇", "華嶽時事論壇",
		"欢欢娱乐时空", "欢乐性今宵", "幻想世界", "换妻大会", "换妻杂交", "换妻杂交 ", "換妻", "皇军",
		"黃慈萍", "黃禍", "黃菊", "黃麗滿", "黃色電影", "黃色漫畫", "黃色圖片", "黃色網站", "黃色文學",
		"黃色小電影", "黃色小說", "黃色影視", "黃翔", "黄　菊", "黄慈萍", "黄大仙", "黄祸", "黄金圣水",
		"黄菊", "黄克诚", "黄丽满", "黄片", "黄色", "黄色电影", "黄色漫画", "黄色图片", "黄色网站",
		"黄色文学", "黄色小电影", "黄色小说", "黄色影视", "黄翔", "黄永生", "黄仲生", "回回", "回教",
		"回良玉", "回民暴动", "回民暴動", "回民吃猪肉", "回民出猪肉", "悔过书", "悔過書", "贿赂朱镕基",
		"昏药", "昏藥", "活动管理员", "活体解剖", "活体器官", "活體解剖", "活體器官", "火辣图片",
		"火辣写真", "火力风暴", "火拼", "火瀑 firefall", "机八", "机巴", "机叭", "机吧", "机掰",
		"机机歪歪", "机战", "鸡", "鸡8", "鸡八", "鸡巴", "鸡巴暴胀", "鸡叭", "鸡吧", "鸡芭",
		"鸡掰", "鸡鸡", "鸡奸", "鸡间", "鸡毛信文汇", "鸡女", "鸡歪", "鸡委", "鸡院", "姬胜德",
		"姬勝德", "积克馆", "基地组织", "基地组织、塔利班", "基地組織", "基督", "基督教", "機八", "機巴",
		"激插", "激插 ", "激情", "激情潮喷", "激情打炮", "激情电影", "激情電影", "激情交友", "激情聊天",
		"激情裸体", "激情视频", "激情視頻", "激情贴图", "激情小电影", "激情小電影", "激情小说",
		"激情性爱电影观看网", "激情性愛電影觀看網", "激凸走光", "積克館", "雞八", "雞巴", "雞掰", "雞雞",
		"雞奸", "雞間", "雞毛信文匯", "雞歪", "雞委", "鷄巴", "极品白虎", "极品波霸", "极品波神",
		"极品波神 ", "极品黑丝", "极品奶妹", "极限飚车", "集体性爱", "集体淫", "几八", "几巴", "几叭",
		"几芭", "幾巴", "纪登奎", "妓", "妓女", "妓院", "寂寞自摸", "佳靜安定片", "家宝 辞职",
		"家宝 影帝", "贾庆林", "贾廷安", "贾育台", "賈慶林", "賈廷安", "賈育台", "假阳具插穴", "奸",
		"奸暴", "奸她", "奸你", "奸情", "奸他", "奸污", "奸一奸", "奸淫", "奸淫电车", "奸幼",
		"尖阁列岛", "姦", "姦染", "姦淫", "监禁陵辱", "监听王", "监狱", "監聽王", "建国党", "建國黨",
		"剑网", "剑侠情缘", "贱", "贱b", "贱bi", "贱逼", "贱比", "贱货", "贱人", "贱种", "賤",
		"賤逼", "賤比", "賤種", "江core", "江八點", "江八条", "江流氓", "江罗", "江羅",
		"江绵恒 李嘉诚", "江绵恒内幕", "江綿恒", "江青", "江宋 绯闻", "江太上皇", "江戏子", "江系人马 中共",
		"江戲子", "江则民", "江泽慧", "江泽民", "江泽明", "江則民", "江澤慧", "江澤民", "江贼民",
		"江賊", "江賊民", "江折民", "江猪", "江猪媳", "江豬", "江豬媳", "江主席", "姜春云", "将则民",
		"僵贼民", "僵賊民", "薑春雲", "疆獨", "疆独", "讲法", "蒋介石", "蒋经国", "蒋中正", "講法",
		"降龙之剑", "將則民", "酱猪媳", "醬豬媳", "交换夫妻", "交配", "姣西", "脚交", "脚交 ", "叫床",
		"叫春", "叫鸡", "叫雞", "教养院", "教養院", "揭批书", "揭批書", "街头扒衣", "街头篮球",
		"她妈的", "她马的", "她奶奶的", "她娘", "解放军", "戒急用忍", "届中央政治局委", "金鳞岂是池中物",
		"金毛穴", "金枪不倒", "金日成", "金山", "金尧如", "金堯如", "金泽辰", "金正日", "紧缚凌辱",
		"紧穴", "锦涛", "锦涛 辞职", "锦涛 下台", "錦濤", "劲舞团", "近平 二婚", "近平 接班人",
		"近亲相奸", "近親相姦", "禁", "经典炮图", "经过", "经血", "茎候佳阴", "莖候佳陰", "經文",
		"精蟲", "精灵乐章", "精神病", "精水", "精童", "精童欲女", "精液", "精液浴", "精液榨取", "精子",
		"警奴", "靖国神社", "境外", "九城", "九霾", "九评", "九評", "九三", "九月三日", "久游",
		"酒店援交", "就去日", "就去色色", "就去诱惑", "就去诱惑 ", "拘留", "菊花洞", "菊花蕾", "巨屌",
		"巨灵神", "巨奶", "巨炮兵团", "巨炮兵团 ", "巨人", "巨乳", "巨乳俏女医", "巨乳素人", "巨骚",
		"瞿秋白", "撅起大白腚", "军长发威", "军国主义", "军妓", "軍長髮威", "卡斯特罗", "开苞", "开发",
		"开放杂志", "开网", "开心OL", "開放雜誌", "凯丰", "砍刀", "砍翻一条街", "砍死你", "看中國",
		"康生", "抗战英雄传", "尻", "靠", "靠爸", "靠北", "靠背", "靠么", "靠母", "靠你妈",
		"靠死你", "靠夭", "靠腰", "柯赐海", "可卡因", "克林顿", "客服", "客服人员", "客户服务", "嗑药",
		"坑爹网", "空姐性交", "恐怖主义", "抠穴", "口爆", "口爆 ", "口爆吞精", "口袋西游", "口圭",
		"口合", "口活", "口交", "口交放尿", "口肯", "口内爆射", "口射", "口淫", "哭么", "哭夭",
		"裤袜", "垮台", "胯下呻吟", "跨下呻吟", "快插", "快乐AV", "宽带影院网", "寬頻影院網", "狂操",
		"狂操 ", "狂草", "狂插", "狂干", "狂幹", "狂乳激揺", "邝锦文", "鄺錦文", "拉丹", "拉登",
		"拉机", "拉機", "拉开水晶棺说", "拉姆斯菲尔德", "拉皮条", "喇嘛", "来插我", "来干", "来爽我",
		"赖昌星", "览叫", "懒", "懒8", "懒八", "懒叫", "懒教", "懶叫", "懶趴", "烂", "烂b",
		"烂逼", "烂比", "烂货", "烂鸟", "烂人", "滥B", "滥逼", "滥比", "滥货", "滥交", "狼友",
		"浪妇", "浪叫", "浪女", "浪穴", "劳拉", "老b", "老百姓的钱包 牵挂", "老逼", "老比", "老二",
		"老虎机", "老江", "老卵", "老毛", "老毛子", "老冒子", "老帽子", "老母", "老少乱伦", "老土",
		"老味", "黎安友", "黎阳评", "黎陽評", "李长春", "李長春", "李大师", "李大師", "李大钊", "李丹",
		"李德生", "李登辉", "李登輝", "李登柱", "李贵鲜", "李弘志", "李红志", "李红痔", "李红智",
		"李宏志", "李洪宽", "李洪寬", "李洪志", "李洪智", "李紅痔", "李继耐", "李繼耐", "李俊毅",
		"李克强", "李兰菊", "李岚清", "李嵐清", "李蘭菊", "李老師", "李立三", "李录", "李祿", "李禄",
		"李錄", "李鹏", "李鹏 镇压", "李鵬", "李瑞环", "李瑞環", "李少民", "李淑娴", "李淑嫻",
		"李铁映", "李旺阳", "李旺陽", "李维汉", "李文斌", "李先念", "李小琳 LV", "李小朋", "李小鵬",
		"李雪峰", "李远哲", "李遠哲", "李月月鸟", "李月月鳥", "李至伦", "李志綏", "李总理", "李总统",
		"李總理", "李總統", "李作鹏", "里根", "丽春苑", "丽源 中国第一夫人", "丽媛离婚真相", "栗智",
		"连惠心", "连胜德", "连続失禁", "连战", "莲花逼", "連勝德", "連戰", "联总", "廉政大论坛",
		"廉政大論壇", "聯總", "炼功", "煉功", "梁光烈", "梁擎墩", "两岸关系", "两岸三地论坛", "两个中国",
		"两国论", "兩岸三地論壇", "兩個中國", "亮屄", "亮屄 ", "亮剑", "亮穴", "聊个斋", "廖承志",
		"廖锡龙", "廖錫龍", "列宁", "列寧", "林保华", "林保華", "林彪", "林伯渠", "林长盛", "林長盛",
		"林佳龙", "林肯", "林樵清", "林慎立", "林信义", "林益世", "林祖涵", "淋病", "凌辱", "淩鋒",
		"刘宾深", "刘宾雁", "刘伯承", "刘刚", "刘国凯", "刘华清", "刘俊国", "刘凯中", "刘澜涛",
		"刘丽英", "刘淇", "刘千石", "刘青", "刘山青", "刘少奇", "刘士贤", "刘文胜", "刘文雄", "刘晓波",
		"刘晓竹", "刘亦菲走穴青春靓丽，数名武警护驾显大牌", "刘亦菲走穴武警护驾超显大牌", "刘永川", "刘云山", "流蜜汁",
		"流亡", "流淫", "流淫水", "劉賓深", "劉賓雁", "劉剛", "劉國凱", "劉華清", "劉俊國", "劉凱中",
		"劉淇", "劉千石", "劉青", "劉山青", "劉少奇", "劉士賢", "劉文勝", "劉曉波", "劉曉竹", "劉永川",
		"劉雲山", "六 四", "六．四", "六合采", "六合彩", "六脉神剑", "六四", "六四民运", "六四民運",
		"六四事件", "六四学潮", "六四运动", "六月联盟", "龙神传说", "漏逼", "露B", "露屄", "露逼",
		"露点", "露毛", "露娜", "露穴", "露阴照", "卢福坦", "陆定一", "陆委会", "陸委會", "鹿城娱乐",
		"路易", "吕京花", "吕秀莲", "呂京花", "呂秀蓮", "旅馆自拍", "旅馆自拍 ", "卵子", "乱交",
		"乱伦", "乱伦熟女网", "亂倫", "抡功", "掄功", "仑功", "伦公", "伦功", "伦攻", "沦公",
		"沦功", "沦攻", "纶功", "轮暴", "轮操", "轮大", "轮干", "轮公", "轮功", "轮攻", "轮奸",
		"轮奸内射", "轮流干", "轮流执政", "轮盘赌", "轮子功", "倫公", "倫功", "倫攻", "淪公", "淪功",
		"淪攻", "輪", "輪大", "輪公", "輪功", "輪攻", "輪奸", "论公", "论功", "论攻", "論公",
		"論功", "論攻", "罗干", "罗礼诗", "罗荣桓", "羅幹", "羅禮詩", "裸聊", "裸露自拍", "裸陪",
		"裸陪 ", "裸体少妇", "妈b", "妈比", "妈的", "妈的b", "妈个b", "妈个比", "妈买批", "媽B",
		"媽的", "媽個比", "媽買批", "麻醉钢枪", "麻醉鋼槍", "麻醉枪", "麻醉槍", "麻醉药", "麻醉藥",
		"麻醉乙醚", "马大维", "马的", "马国瑞", "马加爵", "马克思", "马良骏", "马三家", "马时敏",
		"马英九", "玛雅网", "馬大維", "馬良駿", "馬三家", "馬時敏", "馬英九", "吗b", "吗逼", "吗比",
		"吗的", "吗个", "买春", "买春堂", "买钩子", "买卖枪支", "買賣", "買賣槍支", "売春婦", "卖b",
		"卖逼", "卖比", "卖勾子","卖钩子", "卖国", "卖屁股", "卖骚", "卖淫", "賣B", "賣國",
		"賣屁股", "賣淫", "馒头屄", "满洲国", "曼德拉", "毛鲍", "毛廁洞", "毛片", "毛一鲜", "毛泽东",
		"毛澤東", "毛贼东", "毛賊東", "毛主席", "冒险岛", "没有人权", "梅德韦杰夫", "梅毒", "梅花屄",
		"梅花屄 ", "美国参考", "美国之音", "美國參考", "美國之音", "美女", "美女 成人", "美女高潮",
		"美女吞精", "美女走光", "美乳", "美乳斗艳", "美乳美穴", "美骚妇", "美骚妇 ", "美少妇", "美体艳姿",
		"美腿", "美腿丝足", "美臀嫰穴", "美穴", "美幼", "妹妹骚图", "妹妹阴毛", "媚药少年", "魅惑巨乳",
		"猛操狂射", "猛插", "蒙獨", "蒙独", "蒙古鞑子", "蒙古獨立", "蒙古独立", "蒙汗药粉", "蒙汗藥粉",
		"梦雪 近平", "梦雪 情人", "梦雪 太子党", "梦遗", "咪咪图片", "迷幻药", "迷昏药", "迷昏藥",
		"迷魂药", "迷魂藥", "迷奸", "迷奸系列", "迷歼药", "迷殲藥", "迷药", "迷藥", "米开朗基罗",
		"米青", "秘唇", "秘裂", "密传", "密室淫行", "密穴", "密穴贴图", "密宗", "蜜洞", "蜜穴",
		"绵恒", "綿恒", "免费A片", "免费成人网站", "免费偷窥网", "免费作爱电影", "免費作愛電影",
		"缅甸果敢地区战事", "喵的", "民国", "民國", "民进党", "民進黨", "民警", "民联", "民聯", "民意",
		"民意论坛", "民意論壇", "民运", "民運", "民阵", "民陣", "民脂民膏 胡紧套", "民猪", "民豬",
		"民主", "民主潮", "民主墙", "民族", "民族分裂", "民族矛盾", "名将三国", "明慧", "明慧网",
		"明慧網", "明星淫图", "摸咪咪", "摸奶", "摸你", "摸你鸡巴", "摸你全身", "摸阴蒂", "摩洛客",
		"摩门教", "魔界", "魔力宝贝", "魔兽", "魔兽世界", "魔域", "莫伟强", "莫偉強", "墨索里尼",
		"默克尔", "谋杀", "母奸", "母女双飞", "母子奸情", "母子交欢", "木奉", "木犀地", "木子论坛",
		"木子論壇", "穆罕默德", "穆斯林", "拿破仑", "内挂", "内裤", "内射", "内射美妇", "内射美妇 ",
		"内衣", "那妈", "那吗B", "那吗逼", "那吗错比", "那吗老比", "那吗瘟比", "那娘错比", "那娘老比",
		"那娘瘟比", "纳粹", "奶大屄肥", "奶娘", "奶挺臀翘", "奶头", "奶頭", "奶罩", "奶子", "妳她妈的",
		"妳老母的", "妳妈的", "妳马的", "妳娘", "妳娘的", "男女交欢", "男女蒲典", "南大自由论坛",
		"南大自由論壇", "南华早报", "南蛮", "嫐屄", "嫩b", "嫩BB", "嫩BB ", "嫩鲍", "嫩鲍 ",
		"嫩鲍鱼", "嫩屄", "嫩逼", "嫩缝", "嫩奶", "嫩女", "嫩穴", "嫩穴肉缝", "尼克松", "倪育贤",
		"倪育賢", "倪志福", "你爸", "你大爷", "你她马的", "你就是sb", "你老母", "你姥姥", "你妈",
		"你妈逼", "你妈比", "你妈的", "你妈了妹", "你马的", "你们是我的狗", "你們是我的狗", "你奶",
		"你奶奶", "你娘", "你娘卡好", "你娘咧", "你全家", "你色吗", "你是鸡", "你是鸭", "你说我说论坛",
		"你說我說論壇", "你他妈的", "你他马的", "你它妈的", "你它马的", "你爷", "你祖宗", "娘b", "娘比",
		"娘饿比", "娘劈", "鸟仲", "鳥仲", "尿", "捏你鸡巴", "捏你奶子", "捏弄", "聂荣臻", "您",
		"牛顿", "牛头马面", "侬着冈峦", "侬着卵抛", "奴儿白克力", "奴隷调教", "奴畜抄", "努尔白克力",
		"努尔白克力  ", "女屄", "女干", "女干三亏", "女尻", "女马", "女馬", "女优", "虐奴",
		"欧美大乳", "欧美无套", "拍卖官", "派出所 ", "潘国平", "潘國平", "潘基文", "叛党", "叛国",
		"炮友", "炮友 ", "炮友之家", "跑跑卡丁车", "喷精", "噴精", "彭冲", "彭德怀", "彭丽 老公",
		"彭丽 主席夫人", "彭丽媛离婚", "彭丽媛幸福婚姻秘诀", "彭佩云", "彭真", "蓬浪", "批林批孔", "皮冒子",
		"皮帽子", "皮条", "皮条客", "屁蛋", "屁股", "屁精", "屁眼", "骗局", "騙局", "飘邈之旅",
		"嫖", "嫖娼", "嫖妓指南", "嫖客", "姘头", "品色堂", "品香堂", "品穴", "品穴 ",
		"平安内幕 家宝", "迫奸", "破处", "破处 ", "破處", "破坏", "破鞋", "仆", "仆街", "僕街",
		"普京", "普贤", "七 五", "七.五", "七五", "七五  ", "七五事件", "七月七日 ", "七月五日",
		"祁建", "祁培文", "齐墨", "奇淫宝鉴", "骑她", "骑你", "骑他", "齊墨", "起义", "千秋",
		"前凸后翘", "钱达", "钱国梁", "钱其琛", "錢達", "錢國梁", "錢其琛", "欠操", "欠干", "欠干 ",
		"欠幹", "欠骑", "欠人骑", "欠日", "強暴", "強姦", "強效失意藥", "強硬發言", "强暴", "强奸",
		"强奸处女", "强奸犯", "强奸你", "强效失意药", "强硬发言", "强制浣肠", "抢夺圣火", "抢劫", "抢粮记",
		"搶糧記", "乔冠华", "乔石", "喬石", "巧淫奸戏", "俏臀摄魄", "翘臀嫩逼", "翘臀嫩穴", "翘臀嫩穴 ",
		"窃听器", "窃听器材", "竊聽器", "竊聽器材", "亲美", "亲民党", "亲日", "侵犯", "侵害 ",
		"钦本立", "親美", "親民黨", "秦基伟", "秦晉", "秦晋", "秦伤", "秦真", "禽兽", "欽本立",
		"青楼", "青天白日", "青天白日旗", "氢弹", "轻舟快讯", "清晰内射", "清晰内射 ", "輕舟快訊", "情妇",
		"情婦", "情色", "情色导航", "情色天崖", "情色文学", "情色艺术天空", "情兽", "庆红", "慶紅",
		"穷逼", "窮逼", "邱会作", "邱太三", "曲线消魂", "區", "去她妈", "去妳的", "去妳妈", "去你的",
		"去你妈", "去死", "去他妈", "全国两会", "全国人大", "全國兩會", "全家死光光", "全裸", "全球使命",
		"泉泉", "拳交", "犬犬", "瘸腿帮", "裙内偷拍", "裙下风光", "群P", "群奸乱交", "群奸轮射",
		"群交", "群交亂舞", "群魔色舞", "群殴", "群阴会", "群英赋", "然得很", "然的", "冉英", "让你操",
		"惹比", "惹火身材", "惹火自拍", "惹火自拍 ", "热B", "热比", "热比娅", "热比娅大厦", "热舞派对",
		"热血", "热血江湖", "热站政论网", "熱比婭", "熱站政論網", "人大", "人大常委", "人大代表",
		"人大代表大会", "人代", "人民报", "人民報", "人民币", "人民大会堂", "人民代表", "人民代表大会",
		"人民代表大會", "人民內情真相", "人民真实", "人民真實", "人民之声论坛", "人民之聲論壇", "人妻",
		"人妻交换", "人妻色诱", "人妻熟女", "人妻榨乳", "人妻自拍", "人妻做爱", "人权", "人權", "人体摄影",
		"人性本色", "人渣", "任弼时", "任建新", "日b", "日本", "日本AV女优", "日本帝国", "日本灌肠",
		"日本妹", "日本人", "日本骚货", "日本熟母", "日本素人", "日本有码", "日屄", "日逼", "日比",
		"日穿", "日蛋", "日翻", "日她", "日九城", "日军", "日你", "日你爸", "日你老母", "日你妈",
		"日你媽", "日你奶奶", "日你娘", "日你全家", "日你爷爷", "日你祖宗", "日批", "日死", "日他",
		"日他娘", "日它", "日王", "荣毅仁", "柔阴术", "柔阴术 ", "肉棒", "肉逼", "肉便器", "肉唇",
		"肉洞", "肉缝", "肉感炮友", "肉沟", "肉棍", "肉棍干骚妇", "肉壶", "肉茎", "肉具", "肉蒲团",
		"肉丝裤袜", "肉箫", "肉穴", "肉淫器吞精", "肉欲", "如来", "乳霸", "乳霸 ", "乳爆", "乳此动人",
		"乳此丰满", "乳此丝袜", "乳房", "乳峰", "乳沟", "乳交", "乳尻", "乳尻 ", "乳射", "乳头",
		"乳頭", "乳腺", "乳晕", "乳罩", "入穴一游", "撒尿", "撒泡尿", "撒切尔", "萨达姆", "萨马兰奇",
		"萨斯", "塞福昂", "塞福昂• 艾则孜", "塞你", "塞你爸", "塞你公", "塞你老母", "塞你老师", "塞你母",
		"塞你娘", "赛她娘", "赛妳阿母", "赛妳娘", "赛你老母", "赛你娘", "赛他娘", "三K党", "三P",
		"三P ", "三八淫", "三反五反", "三个代表", "三股势力", "三国", "三级片", "三級片", "三民主义",
		"三民主義", "三陪", "三去车仑工力", "搔穴", "骚", "骚b", "骚B熟女", "骚棒", "骚包", "骚屄",
		"骚逼", "骚比", "骚洞", "骚妇掰B", "骚妇露逼", "骚棍", "骚货", "骚鸡", "骚姐姐", "骚浪美女",
		"骚浪人妻", "骚卵", "骚乱", "骚妈", "骚妹", "骚妹妹", "骚母", "骚女", "骚女叫春", "骚批",
		"骚妻", "骚乳", "骚水", "骚穴", "骚穴怒放", "骚姨妈", "騷逼", "騷貨", "騷浪", "扫肩神药",
		"掃肩神藥", "色97爱", "色爱 ", "色鬼", "色狐狸网址", "色界", "色狼", "色狼论坛", "色狼小说",
		"色猫", "色咪咪", "色迷城", "色魔", "色情", "色情服务", "色情服務", "色情工厂", "色情论坛",
		"色情网站", "色情網站", "色情小电影", "色情小電影", "色区", "色色", "色色成人", "色色婷婷",
		"色色五月天", "色书库", "色窝窝", "色诱", "色欲", "杀冒", "杀帽", "杀你全家", "杀你一家",
		"杀人", "沙僧", "莎士比亚", "傻 B", "傻b", "傻逼", "傻比", "傻吊", "傻鸟", "傻批",
		"傻子", "煞笔", "煞筆", "山本", "山本五十六", "山口组", "山西巷子", "山西行子", "陕西巷子",
		"伤亡", "上海帮", "上海幫", "上妳", "上你", "上山下乡", "韶关", "少妇偷情", "少关", "少女被插",
		"少数民族", "少修正", "邵家健", "舌头穴", "社会主义", "射精", "射了", "射了还说要", "射奶",
		"射你", "射屏", "射爽", "射爽 ", "射颜", "身寸", "身寸米青", "身份证生成器", "身份證生成器",
		"身体障害者", "身障", "深爱色色", "深圳", "神兵传奇", "神鬼传奇", "神汉", "神经病", "神魔大陆",
		"神婆", "神泣", "神兽", "神通加持法", "沈彤", "审查", "审判", "升达毕业证", "升達畢業證",
		"升天", "生奸内射", "生死格斗", "生徒胸触", "生肖外传", "省长", "圣母", "圣泉学淫", "圣战",
		"盛大", "盛华仁", "盛華仁", "盛雪", "尸虫", "湿了", "湿了还说不要", "湿了还说要", "湿身诱惑",
		"湿身诱惑 ", "湿穴", "十八摸", "十二之天", "十二之天贰新密传", "十六大", "石戈", "时代论坛",
		"时事论坛", "食精", "時代論壇", "時事論壇", "驶你爸", "驶你公", "驶你老母", "驶你老师", "驶你母",
		"驶你娘", "屎", "屎妳娘", "屎你娘", "世界经济导报", "世界經濟導報", "世维会", "市长", "市政府",
		"示】", "示威", "示威裙下", "事件", "事实独立", "事實獨立", "视频", "试衣间偷", "释迦牟尼",
		"释欲", "試衣間偷", "手淫", "首长", "兽奸", "兽交", "兽血沸腾", "兽欲", "獸", "獸交",
		"叔嫂肉欲", "熟妇", "熟妇人妻", "熟妇骚器", "熟母", "熟女", "熟女护士", "熟女乱伦", "熟女颜射",
		"甩比", "双龙入洞", "爽你", "爽死我了", "爽穴", "水扁", "丝袜", "丝袜高跟", "丝袜高跟 ",
		"丝袜写真", "丝袜淫妇", "丝袜淫妇 ", "丝袜足交", "丝诱", "司马晋", "司马璐", "司馬晉", "司馬璐",
		"私处", "私服", "私—服", "私人服务器", "斯大林", "斯蒂芬", "死全家", "死伤", "死伤无数",
		"四清", "四人帮", "宋楚瑜", "宋美龄", "宋庆龄", "宋任穷", "苏家屯", "苏兆征", "苏贞昌",
		"苏振华", "酥胸诱惑", "酥穴", "酥痒", "素人娘", "孙文", "孙逸仙", "孙中山", "他NND",
		"他ㄇㄉ", "他ㄇㄉ  ", "他爸爸", "他干", "他妈", "他妈ㄉ王八蛋", "他妈的", "他媽的", "他马的",
		"他吗的", "他奶奶", "他奶奶的", "他奶娘的", "他娘", "他娘的", "塔利班", "台獨", "台独",
		"台独分子", "台联", "台聯黨", "台湾", "台湾成人", "台湾党", "台湾岛国", "台湾帝国", "台湾獨立",
		"台湾独立", "台湾分裂", "台湾公投", "台湾共产党", "台湾共和国", "台湾国", "台湾建国",
		"台湾建国运动组织", "台湾民国", "台湾青年独立联盟", "台湾是主权国家", "台湾万岁", "台湾政论区",
		"台湾自由联盟", "台湾总统", "台灣獨立", "台灣狗", "台灣国", "台灣國", "台灣豬", "臺", "臺湾國",
		"臺灣成人", "臺灣獨立", "臺灣國", "臺灣建國運動組織", "臺灣青年獨立聯盟", "臺灣政論區", "臺灣自由聯盟",
		"太监", "太子党", "谭绍文", "谭震林", "谭政", "汤光中", "湯光中", "唐柏桥", "唐柏橋", "唐家璇",
		"唐捷", "唐骏", "逃窜", "桃园蜜洞", "淘宝", "特警", "特码", "特碼", "腾人", "腾仁", "腾任",
		"腾武", "腾讯", "滕人", "滕仁", "滕任", "滕文生", "滕武", "藤人", "藤仁", "藤任", "藤武",
		"提示", "提醒", "体奸", "体育帝国", "天安门", "天安门事件", "天安门屠杀", "天安門事件", "天朝",
		"天道", "天皇", "天神", "天天干贴图", "天天情色", "天下贰", "天阉", "天主教", "添水", "田弘茂",
		"田纪云", "舔B", "舔屄", "舔屄 ", "舔逼", "舔鸡巴", "舔脚", "舔屁眼", "挑拨", "跳大神",
		"通告", "通缉", "通缉犯", "通知", "同床", "同房", "同性恋", "同性戀", "童颜巨乳", "童屹",
		"统独", "统独论坛", "统战", "捅B", "捅逼", "捅比", "捅她", "捅你", "捅我", "統", "統獨",
		"統獨論壇", "統戰", "偷欢", "偷歡", "偷窥图片", "偷拍", "偷拍美穴", "偷拍美穴 ", "投毒",
		"投名状", "凸肉优", "突厥", "突袭风暴", "图库", "屠杀", "团结路", "推翻共产党", "推翻共產黨",
		"推广员", "退党", "退黨", "吞精", "吞精骚妹", "臀部", "脱内裤", "外 挂", "外$挂", "外，挂",
		"外,挂", "外.挂", "外。挂", "外/挂", "外@@挂", "外@挂", "外~~挂", "外··挂", "外·挂",
		"外••挂", "外•挂", "外挂", "外交论坛", "外交論壇", "外交与方略", "外交與方略", "外阴", "完蛋操",
		"完美国际", "完美世界", "玩逼", "玩穴", "万润南", "万王之王", "万维读者论坛", "万晓东", "万淫堂",
		"萬潤南", "萬維讀者論壇", "萬曉東", "汪东兴", "汪岷", "王八", "王八蛋", "王宝森", "王寶森",
		"王炳章", "王策", "王超华", "王超華", "王从吾", "王丹", "王辅臣", "王輔臣", "王刚", "王剛",
		"王涵万", "王涵萬", "王汉斌", "王鹤寿", "王洪文", "王沪宁", "王滬寧", "王稼祥", "王金平",
		"王军涛", "王軍濤", "王克", "王拉八", "王乐泉", "王乐犬", "王雷雷", "王力雄", "王瑞林",
		"王润生", "王潤生", "王若望", "王希哲", "王秀丽", "王秀麗", "王冶坪", "王兆国", "王者世界",
		"王震", "网爱", "网龙", "网特", "网易", "网站", "網特", "威而钢", "威而柔", "韦国清",
		"维护", "维稳", "维吾尔族", "维族", "维族人", "伟哥", "委员", "猥亵", "未来 习总", "尉健行",
		"慰安妇", "慰安婦", "慰春情", "魏京生", "魏新生", "温b", "温逼", "温比", "温家宝", "温馨",
		"温元凯", "温云松  平安", "温云松 马明哲", "温云松 摩根", "温云松 郑建源", "溫家寶", "溫元凱",
		"瘟b", "瘟比", "瘟加饱", "瘟假饱", "文革", "文化大革命", "文九天", "文殊", "文胸", "文字狱",
		"文字獄", "问道", "问鼎", "问天", "翁金珠", "窝窝客", "我x", "我爱插", "我愛插", "我操",
		"我草", "我的小傻瓜", "我干", "我奸", "我就去色", "我就色", "我考", "我靠", "我咧干", "我日",
		"我日你", "我要性交", "沃尔开西", "龌龊", "乌兰夫", "无产阶级", "无界", "无界浏览", "无界浏览器",
		"无码", "无码彩图", "无码长片", "无码精选", "无码炮图", "无码炮图 ", "无码丝袜", "无码丝袜 ",
		"无码体验", "无码无套", "无码无套 ", "无码淫漫", "无码淫女", "无码做爱", "无毛美少女", "无套内射",
		"无套自拍", "无网界", "无修正", "吳百益", "吳邦國", "吳方城", "吳官正", "吳弘達", "吳宏達",
		"吳仁華", "吳學燦", "吳學璨", "吳儀", "吴百益", "吴邦国", "吴德", "吴方城", "吴官正", "吴桂贤",
		"吴弘达", "吴宏达", "吴仁华", "吴学灿", "吴学璨", "吴仪", "吾尔开希", "吾爾開希", "無界",
		"無界流覽", "無界流覽器", "無碼H漫", "無碼電影", "無毛穴", "無網界", "五不", "五月天", "伍凡",
		"伍世文", "妩媚挑逗", "妩媚挑逗 ", "武警", "武力统一", "武力統一", "武林外传", "舞亲", "舞親",
		"務", "西藏", "西藏獨立", "西藏独立", "西藏分裂", "西藏喇嘛", "西藏天葬", "西哈努克", "西洋美女",
		"西游", "吸儲", "吸毒", "吸精", "吸精少女", "希拉克", "希特勒", "嘻游中国", "习 歌唱家 离婚",
		"习 慰问 刘翔", "习夫人唱出了一句大实话", "习近平", "习仲勋", "洗肠射尿", "洗脑", "洗腦", "系统",
		"系统公告", "系統", "侠义世界", "下贱", "下賤", "下流", "下流地带", "下三烂", "下三滥", "下身",
		"下体", "下體", "下阴", "下注", "下作", "夏赞忠", "仙剑", "先奸后杀", "嫌疑犯", "蘚鮑",
		"现代情色小说", "乡巴佬", "相奸", "想操", "想插", "想干", "想幹", "想和她做", "想日", "向导",
		"向忠发", "项怀诚", "项小吉", "項懷誠", "項小吉", "消防队", "消防隊", "消息", "销魂洞", "销售",
		"小b", "小B样", "小逼", "小比样", "小便", "小参考", "小參考", "小电影", "小電影", "小鸡鸡",
		"小姐", "小姐打飞机", "小嫩鸡", "小泉", "小泉纯一郎", "小犬蠢一狼", "小日本", "小穴", "肖強",
		"歇逼", "写真", "写真 ", "谢长廷", "谢非", "谢深山", "谢选骏", "谢中之", "謝長廷", "謝選駿",
		"謝中之", "辛灝年", "新党", "新观察论坛", "新觀察論壇", "新华举报", "新华路", "新华内情", "新华社",
		"新华通论坛", "新華舉報", "新華內情", "新華通論壇", "新疆獨立", "新疆独立", "新疆分裂", "新疆国",
		"新生网", "新生網", "新手辅导员", "新手指导员", "新唐人", "新闻出版总署", "新闻封锁", "新聞封鎖",
		"新义安", "新语丝", "新語絲", "信交", "星尘传说", "行房", "邢錚", "性爱", "性爱 图库",
		"性爱电影", "性爱擂台", "性爱视频", "性愛", "性愛插穴", "性愛電影", "性愛視頻", "性愛圖片", "性伴",
		"性病", "性感肉丝", "性感乳娘", "性感騷女", "性感妖娆", "性感诱惑", "性高潮", "性虎", "性虎色网",
		"性饥渴", "性交", "性交课", "性交图", "性交吞精", "性交吞精 ", "性交无码", "性交自拍",
		"性交自拍 ", "性免费电影", "性免費電影", "性奴", "性奴会", "性虐", "性虐待", "性器", "性情中人",
		"性生活", "性无能", "性息", "性佣", "性欲", "性战擂台", "性战擂台 ", "性之站", "胸部",
		"胸濤乳浪", "胸罩", "熊炎", "熊焱", "修炼", "修煉", "羞耻母", "徐邦秦", "徐才厚", "徐匡迪",
		"徐水良", "徐向前", "许财利", "许家屯", "许世友", "許家屯", "畜生", "薛伟", "薛偉", "穴海",
		"穴爽", "穴图", "穴淫", "学潮", "学联", "学生妹", "学运", "学自联", "學潮", "學聯",
		"學生妹", "學習班", "學運", "學自聯", "雪腿玉胯", "血b", "血逼", "血比", "血腥图片",
		"血腥圖片", "寻仙", "押大", "押小", "鸦片", "亚病", "亚历山大", "亚情", "亚洲情色网", "亚洲色",
		"亚洲性虐", "亚洲淫娃", "亚洲有码", "亚洲有码 ", "亞病", "严家其", "严家祺", "言论自由",
		"言論自由", "阎明复", "阎王", "颜骑", "颜庆章", "颜射", "颜射自拍", "閻明複", "顏射", "嚴家其",
		"嚴家祺", "艳妇淫女", "艳情小说", "艳乳", "艳乳 ", "艳舞淫业", "艳照", "央视内部晚会",
		"央視內部晚會", "扬振", "扬震", "羊缸缸", "羊杠杠", "羊杠子", "阳具", "阳萎", "阳痿", "阳物",
		"杨白冰", "杨得志", "杨怀安", "杨建利", "杨尚昆", "杨思敏", "杨巍", "杨勇", "杨月清", "杨振",
		"杨震", "杨周", "陽具", "陽萎", "陽痿", "楊懷安", "楊建利", "楊巍", "楊月清", "楊周",
		"妖怪A梦", "妖媚熟母", "姚文元", "姚依林", "姚月谦", "姚月謙", "搖頭丸", "摇头丸", "咬着龟头",
		"要色色", "要射了", "耶和华", "耶稣", "野合", "野鸡", "野雞", "野外性交", "叶剑英", "叶菊兰",
		"叶群", "夜话紫禁城", "夜話紫禁城", "夜总会", "一本道", "一边一国", "一党", "一党独裁", "一党专政",
		"一党专制", "一黨", "一贯道", "一夜欢", "一夜九次郎", "一夜情", "一夜性网", "一中一台", "伊宁事件",
		"伊斯兰", "伊苏战记", "遗精", "以茎制洞", "以莖制洞", "以色列", "义解", "亦凡", "异见人士",
		"异议人士", "易丹轩", "易丹軒", "易志熹", "異見人士", "異議人士", "義解", "阴屄", "阴部",
		"阴部特写", "阴唇", "阴道", "阴道图片", "阴缔", "阴蒂", "阴阜", "阴阜高耸", "阴核", "阴户",
		"阴茎", "阴茎插小穴", "阴精", "阴径", "阴具", "阴毛", "阴门", "阴囊", "陰唇", "陰道",
		"陰蒂", "陰戶", "陰莖", "陰徑", "陰具", "陰毛", "陰穴新玩法", "婬乱军团", "淫", "淫B",
		"淫の方程式", "淫逼", "淫痴", "淫虫", "淫荡", "淫荡贵妇", "淫蕩", "淫店", "淫东方", "淫洞",
		"淫妇", "淫妇自慰", "淫告白", "淫河", "淫秽", "淫穢", "淫货", "淫贱", "淫賤", "淫浆",
		"淫叫", "淫姐", "淫浪", "淫流", "淫驴屯", "淫驴屯 ", "淫乱", "淫乱工作", "淫乱熟女",
		"淫乱熟女 ", "淫乱诊所", "淫亂", "淫亂潮吹", "淫亂潮吹 ", "淫妹", "淫糜", "淫靡", "淫蜜",
		"淫魔", "淫母", "淫妞", "淫奴", "淫女", "淫女炮图", "淫虐", "淫妻", "淫妻交换", "淫腔",
		"淫情", "淫肉诱惑", "淫肉诱惑 ", "淫色", "淫色贴图", "淫声浪语", "淫师荡母", "淫师荡母 ", "淫湿",
		"淫兽学园", "淫兽学园 ", "淫书", "淫水", "淫水爱液", "淫水翻騰", "淫水横流", "淫水横溢",
		"淫水涟涟", "淫水丝袜", "淫水丝袜 ", "淫水四溅", "淫丝荡袜", "淫图", "淫娃", "淫西", "淫穴",
		"淫样", "淫液", "淫欲日本", "淫欲世家", "淫战群P", "淫汁", "银民吧", "银民吧 ", "尹庆民",
		"尹慶民", "隐窝窝", "应招", "应召", "罂粟", "應招", "應召", "永恒之塔", "由喜贵", "由喜貴",
		"游戏管理员", "游戏监督员", "游戏向导", "游戏指导员", "游行", "游行  ", "猶太豬", "遊行",
		"有容奶大", "又鸟女干", "幼逼", "幼妓", "幼交", "幼男", "幼男 ", "幼女", "幼圖", "幼香阁",
		"诱惑视频", "诱奸", "诱色uu", "于大海", "于浩成", "于永波", "于幼军", "余秋里", "余英时",
		"余英時", "於幼軍", "俞正声", "俞正聲", "舆论反制", "輿論反制", "宇明网", "宇明網", "玉女心经",
		"玉蒲团", "玉蒲团 玉女心经", "玉乳", "玉穴", "郁慕明", "浴尿", "浴室乱伦", "浴室自拍", "预言",
		"欲火", "欲女", "欲仙欲浪", "欲仙欲死", "御の二代目", "御龙在天", "原味丝袜", "原子弹", "員警",
		"圆满", "袁纯清", "援交", "援交薄码", "援交妹", "援交自拍", "援交自拍 ", "援助交际", "援助交易",
		"圓滿", "远程偷拍", "远志明", "遠程偷拍", "遠志明", "月经", "月卡", "岳武", "运动", "运营",
		"运营长", "运营官", "运营人", "运营商", "运营者", "运营组", "杂zhong", "杂种", "雜zhong",
		"雜種", "再奸", "在十月", "早泄", "早洩", "造爱", "造反", "则民", "择民", "泽民",
		"泽民 祖英", "則民", "擇民", "澤民", "贼民", "賊民", "曾培炎", "曾庆红", "曾慶紅", "曾志郎",
		"渣波波", "渣种", "渣種", "扎卡维", "扎针", "张伯笠", "张博雅", "张春桥", "张德江", "张钢",
		"张宏堡", "张健", "张立昌", "张林", "张丕林", "张廷发", "张万年", "张伟国", "张闻天", "张五常",
		"张小平", "张筱雨", "张昭富", "张震", "张志清", "張伯笠", "張德江", "張鋼", "張宏堡", "張健",
		"張立昌", "張林", "張丕林", "張萬年", "張偉國", "張五常", "張小平", "張昭富", "張志清",
		"章孝严", "章孝勇", "招鸡", "招妓", "找鸡", "找雞", "赵海青", "赵洪祝", "赵南", "赵品潞",
		"赵晓微", "赵紫阳", "趙海青", "趙南", "趙品潞", "趙曉微", "趙紫陽", "哲民", "贞操", "针刺",
		"针刺伤害案件", "针孔偷拍", "针扎", "侦探社北", "真理教", "真善忍", "真世界", "真主", "真主安拉",
		"偵探社北", "姫辱", "镇压", "鎮壓", "争鸣论坛", "征服", "征途", "爭鳴論壇", "正见网", "正見網",
		"正义党论坛", "正義黨論壇", "郑宝清", "郑义", "政变", "政府", "政府无能", "政协", "政協",
		"政治", "政治避难", "政治避難", "政治打击", "政治打擊", "政治反对派", "政治犯", "政治封锁",
		"政治封鎖", "政治局", "政治局常委", "政治迫害", "政治协商会议", "政治協商會議", "政治压迫", "政治壓迫",
		"鄭義", "支那", "知的障害", "知障", "指导员", "指环王", "制服美妇", "制服狩", "制服狩 ",
		"制服诱惑", "制服誘惑", "致死致残", "中功", "中共", "中共王储 近平", "中共中央", "中共中央政治局",
		"中国成人论坛", "中国分裂", "中国共产党", "中国垃圾", "中国民主党", "中国平安 云松 73.6亿",
		"中国人民解放军", "中国人民志愿军", "中国人权", "中国性爱城", "中国政府", "中国之春", "中国猪",
		"中國共產黨", "中國狗", "中國垃圾", "中國人民解放軍", "中國人民志願軍", "中國人權", "中國豬",
		"中华民国", "中华人民共和国", "中華民國", "中華人民共和國", "中南海", "中年美妇", "中文成人网站",
		"中文成人網站", "中文搜性网", "中宣部", "中央电视台", "中央政府", "中央政治局", "周恩来", "周恩來",
		"周六性吧", "周永康", "周永康 王小丫", "周永康 侄女婿", "周永康老婆", "周子玉", "周总理", "朱德",
		"朱巨", "朱立伦", "朱狨基", "朱容基", "朱镕基", "朱镕基罢饭", "朱镕基辞职", "朱云来 内幕",
		"朱云来被杀", "朱云来之死", "诛仙", "诸侯", "猪猡", "猪头", "主持人 梦雪 近平 电视台", "主席",
		"助理", "抓捕", "专用B", "专政", "专制", "專用B", "專政", "專制", "转法轮", "轉法輪",
		"卓伯源", "资本主义", "子宫", "子女任职名单", "子女任職名單", "紫黛", "自插小穴", "自焚",
		"自拍美穴", "自拍写真", "自杀手册", "自杀指南", "自殺手冊", "自殺指南", "自慰", "自慰抠穴",
		"自由门", "自由門", "自由亚洲", "自由亞洲", "自制手枪", "自製手槍", "宗教迫害", "宗教自由", "总理",
		"总书记", "纵火", "邹家华", "走光偷拍", "走私", "走向圆满", "走资帮", "走资派", "走資派",
		"足脚交", "祖宗", "钻插", "作爱", "作愛", "坐台", "坐庄", "做ai", "做爱", "做爱电影",
		"做爱图片", "做爱自拍", "做愛", "做愛", "操 ", "操你", "草", "草你", "你妈", "老母", "逼",
		"逼货"}; 
	
	private static Vector<String> censorwords = new Vector<String>();
	private static Vector<Integer> bannedIds = new Vector<Integer>();
	private static String getRootPath()
	{
		return Util.class.getResource("/").getPath();
	}

	public static String getCensorFilePath()
	{
		String path = Util.getRootPath();
		path += "../../assets/censor.txt";
		return path;
	}
	
	public static String getBannedFilePath()
	{
		String path = Util.getRootPath();
		path += "../../assets/banned.txt";
		return path;
	}
	
	public static String filterInvalidWords(String str)
	{
//		System.out.println(str);
		for (String censorword : censorwords)
		{
			str = str.replaceAll("(?i)" + censorword, "***");
		}
//		System.out.println(str);
		return str;
	}
	
	public static void main(String[] args) {
		init();
		System.out.println(filterInvalidWords("东亚的公告"));
	}
	
	public static void init()
	{
		
		//String censorpath = Util.getCensorFilePath();
		int size = cen.length;
		for(int i=0;i<size;i++){
			censorwords.add(cen[i]);
		}
		//String censorpath = "e://censor.txt";
	//	System.out.println(censorpath);
		//Util.censorwords.clear();
		//Util.censorwords.addAll(Util.cen);
		
		//System.out.println(cen);
		//System.out.println(censorwords);
		//System.out.println(censorwords.get(1).toString());
//		try
//		{
//			FileReader freader = new FileReader(censorpath);
//			BufferedReader breader = new BufferedReader(freader);
//			try
//			{
//				String censorword = breader.readLine();
//				while (censorword != null)
//				{
//					System.out.println(censorword);
//					Util.censorwords.add(censorword);
//					censorword = breader.readLine();
//				}
//			}
//			catch (IOException e)
//			{
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		catch (FileNotFoundException e)
//		{
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}

		Util.bannedIds.clear();
		Connection conn = null;
		PreparedStatement queryst = null;
		ResultSet rs = null;
		String querysql = "SELECT id,user_id,log_time,log_msg_text,success_flag FROM banlogs WHERE success_flag=1 ORDER BY log_time";
		try
		{
			conn = Util.getDBConn("java:comp/env/jdbc/Log");
			try
			{
				queryst = conn.prepareStatement(querysql);
				rs = queryst.executeQuery();
				while (rs.next())
				{
					Util.bannedIds.add(rs.getInt("user_id"));
				}
			}
			finally
			{
				if (rs != null)
				{
					rs.close();
				}
				if (queryst != null)
				{
					queryst.close();
				}
				if (conn != null)
				{
					conn.close();
				}
			}
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
//		String bannedpath = Util.getBannedFilePath();
//		try
//		{
//			FileReader freader = new FileReader(bannedpath);
//			BufferedReader breader = new BufferedReader(freader);
//			try
//			{
//				String bannedsid = breader.readLine();
//				while (bannedsid != null)
//				{
//					if (bannedsid.equals(""))
//					{
//						bannedsid = breader.readLine();
//						continue;
//					}
//					int bannedid = Integer.parseInt(bannedsid);
//					Util.bannedIds.add(bannedid);
//					bannedsid = breader.readLine();
//				}
//			}
//			catch (Exception e)
//			{
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		catch (FileNotFoundException e)
//		{
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}

	public static boolean isBanned(int id)
	{
		for (int bannedid : Util.bannedIds)
		{
			if (bannedid == id)
			{
				return true;
			}
		}
		return false;
	}

	/**
	 * ��һ������ת���ɰ���ָ����ʽ��ʾ���ַ�
	 * @param time Date������͵�ʱ��
	 * @param type
	 * 0 - ��ʾ����ʱ�䣬��ʽ����-��-�� ʱ���֣���
	 * 1 - ��ʾ��ʽ����-��-��
	 * 2 - ��ʾ��ʽ����-��
	 * 3 - ��ʾ��ʽ����-�� ʱ����
	 * @return ���ذ���Ҫ���ʽ���ַ�
	 */
	public static String date2Str(long time, int type)
	{
		Calendar cd = Calendar.getInstance();
		cd.setTimeInMillis(time);
		int year = cd.get(Calendar.YEAR);
		int month = cd.get(Calendar.MONTH) + 1;
		int day = cd.get(Calendar.DAY_OF_MONTH);
		int hour = cd.get(Calendar.HOUR_OF_DAY);
		int min = cd.get(Calendar.MINUTE);
		int sec = cd.get(Calendar.SECOND);
		String syear = Integer.toString(year);
		String smonth;
		if (month < 10)
		{
			smonth = String.format("0%d", month);
		}
		else
		{
			smonth = Integer.toString(month);
		}
		String sday;
		if (day < 10)
		{
			sday = String.format("0%d", day);
		}
		else
		{
			sday = Integer.toString(day);
		}
		String shour;
		if (hour < 10)
		{
			shour = String.format("0%d", hour);
		}
		else
		{
			shour = Integer.toString(hour);
		}
		String smin;
		if (min < 10)
		{
			smin = String.format("0%d", min);
		}
		else
		{
			smin = Integer.toString(min);
		}
		String ssec;
		if (sec < 10)
		{
			ssec = String.format("0%d", sec);
		}
		else
		{
			ssec = Integer.toString(sec);
		}
		
		switch (type)
		{
		case 0:
			//��-��-�� ʱ���֣���
			return syear + "-" + smonth + "-" + sday + " " + shour + ":" + smin + ":" + ssec;
		case 1:
			//��-��-��
			return syear + "-" + smonth + "-" + sday;
		case 2:
			//��-��
			return smonth + "-" + sday;
		case 3:
			//��-�� ʱ����
			return smonth + "-" + sday + " " + shour + ":" + smin;
		}
		return "";
	}
	
	public static void bannedUser(int kid)
	{
		Util.getBannedIds().add(kid);
	}
	
	public static void unbannedUser(int kid)
	{
		for (int i = 0 ; i < Util.getBannedIds().size() ; i++)
		{
			if (Util.getBannedIds().get(i) == kid)
			{
				Util.getBannedIds().remove(i);
				return;
			}
		}
	}
	
	public static Vector<Integer> getBannedIds()
	{
		return bannedIds;
	}

	public static void setBannedIds(Vector<Integer> bannedIds)
	{
		Util.bannedIds = bannedIds;
	}

	public static Vector<String> getCensorwords()
	{
		return censorwords;
	}

	public static void setCensorwords(Vector<String> censorwords)
	{
		Util.censorwords = censorwords;
	}
	
	public static Connection getDBConn(String dbName) throws SQLException
	{
		try
		{
			Context ctx = new InitialContext();
			DataSource ds = (DataSource) ctx.lookup(dbName);
			return ds.getConnection();
		}
		catch (Exception e)
		{
			throw new SQLException();
		}
	}

	public static void SortDwr(Vector<Object> list)
	{
		TreeSet hs = new TreeSet();
		
		for (int i = 0 ; i < list.size() ; i++)
		{
			hs.add(list.get(i));
		}
		list.clear();
		for (Object o : hs)
		{
			list.add(o);
		}
	}
}