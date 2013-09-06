package com.crystalcg.gamedev.world;

import java.io.BufferedInputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.ClientError;
import com.crystalcg.gamedev.alliance.service.AllianceMemberService;
import com.crystalcg.gamedev.buildingFunction.service.GemstoneService;
import com.crystalcg.gamedev.friend.service.FriendService;
import com.crystalcg.gamedev.user.domain.Maincity;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.WorldCityCache;
import com.crystalcg.gamedev.util.cache.domain.StaticWorldCity;

@Controller
public class DataStore{
	
	private static final Logger logger = LoggerFactory.getLogger(DataStore.class);
	private static final int width = 1440;//屏幕宽
	private static final int height = 742;//屏幕高
	private static final int size = 4;//是基本单元（200*100）的1/4
	private static final int rx = ImageEntity.BASE_WIDTH/size;
	private static final int ry = ImageEntity.BASE_HEIGHT/size;
	private static int dx = 32800;//坐标原点x轴偏移的像素值

	private static ImageEntity[][] store;

	static {
		logger.info("start load map ...");
		read();
		logger.info("... end load map");
	}

	/**
	 * 读取地图背景图文件
	 */
	public static void read() {
		try {
			File root = new File(GemstoneService.class.getResource("/").getFile());
			File file = new File(root, "conf/imageLayer.data");
			DataInputStream di = new DataInputStream(new BufferedInputStream(
					new FileInputStream(file)));
			int xsize = di.readInt();
			int ysize = di.readInt();
			di.readUTF();
			store = new ImageEntity[xsize][ysize];
			ImageEntity e;
			for (int i = 0; i < xsize; i++) {
				for (int j = 0; j < ysize; j++) {
					e = new ImageEntity();
					e.read(di);
					if(e.getB()!=null || e.getF()!=null){//不存空对象
						store[i][j] = e;
					}
				}
			}
			di.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据左上点获取屏幕显示所需的背景图区域
	 * @param x
	 * @param y
	 * @return
	 */
	public List<ImageEntity> getEntity(int x, int y) {
		System.err.println("imageLeftTop : "+x+","+y);
		int b_x = x / ImageEntity.BASE_WIDTH - 3;
		if(b_x<0){
			b_x = 0;
		}
		int e_x = (x + width + ImageEntity.BASE_WIDTH - 1) / ImageEntity.BASE_WIDTH;
		if(e_x>=store.length){
			e_x = store.length - 1;
		}
		int b_y = y / ImageEntity.BASE_HEIGHT - 3;
		if(b_y<0){
			b_y = 0;
		}
		int e_y = (y + height + ImageEntity.BASE_HEIGHT - 1) / ImageEntity.BASE_HEIGHT;
		if(e_y>=store[0].length){
			
			e_y = store[0].length - 1;
		}
		if(b_x>e_x){
			b_x = e_x;
		}
		if(b_y>e_y){
			b_y = e_y;
		}
		List<ImageEntity> list = new LinkedList<ImageEntity>();
		ImageEntity temp;
		for(int i=b_x;i<e_x;i++){
			for(int j=b_y;j<e_y;j++){
				temp = store[i][j];
				if(temp != null){
					list.add(temp);
				}
			}
		}
		return list;
	}
	
	/**
	 * 拖动时获取数据
	 * @param x
	 * @param y
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "getWorldData")
	@ResponseBody
	public Object getWorldData(int x,int y,HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("请先登录");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		if(maincityService == null){
			return new ClientError("主城功能未加载");
		}
		Maincity city = maincityService.getMaincity(character.getId());
		if(city == null){
			return new ClientError("获取不到主城");
		}
		int sx = city.getX();
		int sy = city.getY();
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(x != -1 && y != -1){
			int cx = getCx(sx, sy);
			int cy = getCy(sx, sy);
			retMap.put("cityX", cx);
			retMap.put("cityY", cy);
		}
		retMap.put("image",getEntity(x, y));
		try {
			retMap.put("cityData", getData(x, y,retMap));
			retMap.put("radarData", getRadarData(x, y));
		} catch (SQLException e) {
			e.printStackTrace();
			retMap.put("error", "查询数据出错");
		}
		return retMap;
	}
	
	/**
	 * 点击进入世界时初始化
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "initWorld")
	@ResponseBody
	public Object initWorld(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("请先登录");
		}
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		if(maincityService == null){
			return new ClientError("主城功能未加载");
		}
		Maincity city = maincityService.getMaincity(character.getId());
		if(city == null){
			return new ClientError("获取不到主城");
		}
		int x = city.getX();
		int y = city.getY();
		return getWorldDataByCoordinate(x, y);
	}
	
	/**
	 * 根据城池坐标获取地图数据
	 * @param x
	 * @param y
	 * @return
	 */
	private Map<String,Object> getWorldDataByCoordinate(int x,int y){
		Map<String, Object> retMap = new HashMap<String,Object>();
		if(x > 0 && y > 0){
			int cx = getCx(x, y);
			int cy = getCy(x, y);
			retMap.put("cityX", cx);
			retMap.put("cityY", cy);
			System.err.println(cx/200+","+(cy/100));
			retMap.put("image",getEntity(cx-width/2, cy-height/2));
			try {
				retMap.put("cityData", getData(cx-width/2, cy-height/2,retMap));
				retMap.put("radarData", getRadarData(cx-width/2, cy-height/2));
			} catch (SQLException e) {
				e.printStackTrace();
				retMap.put("error", "查询数据出错");
			}
		}else{
			retMap.put("error", "该城市未添加到世界");
		}
		return retMap;
	}
	
	/**
	 * 获取系统城池
	 * @return
	 */
	@RequestMapping(value="getSystemCity")
	@ResponseBody
	public List<Map<String,Object>> getSystemCity(){
		return WorldCityCache.getAllCity();
	}
	
	/**
	 * 获取盟友
	 * @return
	 */
	@RequestMapping(value="world/getAlly")
	@ResponseBody
	public Object getAlly(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("请先登录");
		}
		AllianceMemberService allianceMemberService = (AllianceMemberService) ServiceLocator.getSpringBean("allianceMemberService");
		return allianceMemberService.getAllyLocation(character.getId());
	}
	
	/**
	 * 获取仇人
	 * @return
	 */
	@RequestMapping(value="world/getEnemy")
	@ResponseBody
	public Object getEnemy(HttpSession session){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		if(character == null){
			return new ClientError("请先登录");
		}
		FriendService friendService = (FriendService) ServiceLocator.getSpringBean("friendService");
		return friendService.getEnemyLocation(character.getId());
	}
	
	/**
	 * 根据id获取地图数据
	 * @param session
	 * @param id 城池id
	 * @param type 0:国都名城，1：玩家城池
	 * @return
	 */
	@RequestMapping(value="getWorldDataById")
	@ResponseBody
	public Object getWorldDataById(int id,int type){
		int x = 0;
		int y = 0;
		if(type == 0){//国都、名城
			StaticWorldCity city = WorldCityCache.getWorldCity(id);
			if(city == null){
				logger.error("未知的国都、名城");
			}else{
				x = city.getX();
				y = city.getY();
			}
		}else if(type == 1){//玩家城池
			MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
			if(maincityService == null){
				return new ClientError("主城功能未加载");
			}
			Maincity city = maincityService.getMaincity(id);
			if(city == null){
				return new ClientError("位置的城池");
			}else{
				x = city.getX();
				y = city.getY();
			}
		}else{
			logger.error("错误的城市类型");
		}
		return getWorldDataByCoordinate(x, y);
	}
	
	/**
	 * 雷达图数据
	 * @param x 左上点x
	 * @param y 左上点y
	 * @param level 缩放级别
	 * @throws SQLException 
	 */
	private Map<String,Object> getRadarData(int x,int y) throws SQLException{
		int scale = 3;//雷达图取3*3屏数据
		int startx = x-width;//雷达图左上点x
		int starty = y-height;//雷达图左上点y
		int tempx = startx+width*scale/2;
		int tempy1 = starty-width*scale/4;
		int tempy2 = starty+height*scale+width*scale/4;
		int bx = getX(tempx, tempy1);
		int ex = getX(tempx+ImageEntity.BASE_WIDTH-1,tempy2+ImageEntity.BASE_HEIGHT-1);
		int by = getY(tempx, tempy1);
		int ey = getY(tempx+ImageEntity.BASE_WIDTH-1,tempy2+ImageEntity.BASE_HEIGHT-1);
		String points = WorldDao.getRectAreaForRadar(bx, ex, by, ey);
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("startX", startx);
		retMap.put("startY", starty);
		retMap.put("width", width*scale);
		retMap.put("height", height*scale);
		retMap.put("points", points);
		return retMap;
	}
	
	private String getData(int x,int y,Map<String, Object> retMap) throws SQLException{
		int bx = getX(x+width/2, y-width/4);
		int ex = getX(x+width/2+ImageEntity.BASE_WIDTH-1,y+height+width/4+ImageEntity.BASE_HEIGHT-1);
		int by = getY(x+width/2, y-width/4);
		int ey = getY(x+width/2+ImageEntity.BASE_WIDTH-1,y+height+width/4+ImageEntity.BASE_HEIGHT-1);
		retMap.put("bx", getCx(bx, by));
		retMap.put("by", getCy(bx, by));
		retMap.put("ex", getCx(ex, ey));
		retMap.put("ey", getCy(ex, ey));
		String rs = WorldDao.getRectArea(bx, ex, by, ey);
		return rs;
	}
	
	private int getX(int cx,int cy){
		return ((cx-dx)/rx+cy/ry-1)/2;
	}
	
	private int getY(int cx,int cy){
		return (cy/ry-(cx-dx)/rx-1)/2;
	}
	
	public int getCx(int x,int y){
		return (x-y)*rx+dx;
	}
	
	public int getCy(int x,int y){
		return (x+y+1)*ry;
	}

	public static void main(String[] args){
		DataStore ds = new DataStore();
		int x1 = 99;
		int x2 = 104;
		System.out.println(ds.getCx(x1, x2));
		System.out.println(ds.getCy(x1, x2));
	}

}
