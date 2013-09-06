package com.crystalcg.gamedev.world;

import java.awt.Point;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.commons.dbcp.BasicDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.EnemyNPCCache;
import com.crystalcg.gamedev.util.cache.WorldCityCache;
import com.crystalcg.gamedev.util.cache.WorldResourceCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticWorldCity;
import com.crystalcg.gamedev.util.cache.domain.StaticWorldResource;

public class WorldService {
	private static final Logger logger = LoggerFactory.getLogger(WorldService.class);
	private static final Map<Point, DataPack> RESOURCE_CACHE = new HashMap<Point, DataPack>();
	private static final Map<Point, StaticEnemyNPC> FORCE_CACHE = new HashMap<Point, StaticEnemyNPC>();
	private static int[] rx;
	private static int[] ry;
	private static int[] fx;
	private static int[] fy;
	private static Random r;
	
	private WorldService(){
		BasicDataSource dataSource = (BasicDataSource) ServiceLocator.getSpringBean("dataSource");
		List<StaticWorldResource> list_r = WorldResourceCache.getList();
		List<StaticEnemyNPC> list_f = EnemyNPCCache.getWorldList();
		Random rand = new Random();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int countr = 0;
		int countf = 0;
		String sql_countr = "select count(*) from world where cell_type=4";
		String sql_countf = "select count(*) from world where cell_type=5";
		String sql_r = "select x,y from world where cell_type=4";
		String sql_f = "select x,y from world where cell_type=5";
		try {
			conn = dataSource.getConnection();
			pstmt = conn.prepareStatement(sql_countr);
			rs = pstmt.executeQuery();
			if(rs.next()){
				countr = rs.getInt(1);
			}
			rs.close();
			pstmt.close();
			pstmt = conn.prepareStatement(sql_countf);
			rs = pstmt.executeQuery();
			if(rs.next()){
				countf = rs.getInt(1);
			}
			rs.close();
			pstmt.close();
			pstmt = conn.prepareStatement(sql_r);
			rs = pstmt.executeQuery();
			rx = new int[countr];
			ry = new int[countr];
			int size_r = list_r.size();
			for(int i=0;rs.next();i++){
				rx[i] = rs.getInt("x");
				ry[i] = rs.getInt("y");
				if(rand.nextDouble()<.1){//.2
					Point p = new Point();
					p.x = rx[i];
					p.y = ry[i];
					DataPack dp = new DataPack();
					StaticWorldResource sr = list_r.get(rand.nextInt(size_r));
					dp.setStaticWorldResource(sr);
					dp.setStatus(0);
					RESOURCE_CACHE.put(p, dp);
				}
			}
			
			rs.close();
			pstmt.close();
			
			pstmt = conn.prepareStatement(sql_f);
			rs = pstmt.executeQuery();
			fx = new int[countf];
			fy = new int[countf];
			int size_f = list_f.size();
			for(int i=0;rs.next();i++){
				fx[i] = rs.getInt("x");
				fy[i] = rs.getInt("y");
				if(rand.nextDouble()<.1){//.25
					Point p = new Point();
					p.x = fx[i];
					p.y = fy[i];
					StaticEnemyNPC sf = list_f.get(rand.nextInt(size_f));
					FORCE_CACHE.put(p, sf);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			try {
				if (rs != null) {
					rs.close();
				}
				if (pstmt != null) {
					pstmt.close();
				}
				if(conn != null){
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	public static DataPack getResource(int x,int y){
		Point p = new Point();
		p.x = x;
		p.y = y;
		return RESOURCE_CACHE.get(p);
	}
	
	public static StaticEnemyNPC getForce(int x,int y){
		Point p = new Point();
		p.x = x;
		p.y = y;
		return FORCE_CACHE.get(p);
	}
	
	/**
	 * 暂时只在名城周围刷新
	 * @param characterId
	 * @param country
	 * @return
	 */
	public static boolean divCoor(int characterId,int country){
		BasicDataSource dataSource = (BasicDataSource) ServiceLocator.getSpringBean("dataSource");
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int range = 80;//½边长
//		int limit = 99;
		int count = 0;
		int x = 0;//名城的坐标
		int y = 0;
		int resx = 0;//查询结果的坐标
		int resy = 0;
		List<StaticWorldCity> list = WorldCityCache.getRandomWorldCity(country);
		String sql_count = "select count(*) from world where x>? and x<? and y>? and y<?  and cell_type=1 and country=?";
		String sql_xy = "select x,y from world where x>? and x<? and y>? and y<? and cell_type=1 and country=? limit ?,1";
		String sql_update1 = "update world set cell_type=3,rel_id=? where x=? and y=?";
		String sql_update2 = "update user_main_city set x=?,y=? where character_id=?";
		try {
			conn = dataSource.getConnection();
			////选择名城，统计数量
			pstmt = conn.prepareStatement(sql_count);
			for(StaticWorldCity c : list){
				x = c.getX();
				y = c.getY();
				pstmt.setInt(1, x - range);
				pstmt.setInt(2, x + range);
				pstmt.setInt(3, y - range);
				pstmt.setInt(4, y + range);
				pstmt.setInt(5, country);
				rs = pstmt.executeQuery();
				if(rs.next()){
					count = rs.getInt(1);
					if(count != 0){//在该名城周围刷新
						break;
					}
				}
				rs.close();
			}
			if(count == 0){//名城周围已满
				return Boolean.FALSE;
			}
			pstmt.close();
			////查找x，y
			if(r == null){
				r = new Random();
			}
			pstmt = conn.prepareStatement(sql_xy);
			pstmt.setInt(1, x - range);
			pstmt.setInt(2, x + range);
			pstmt.setInt(3, y - range);
			pstmt.setInt(4, y + range);
			pstmt.setInt(5, country);
			pstmt.setInt(6, r.nextInt(count));
			rs = pstmt.executeQuery();
			if(rs.next()){
				resx = rs.getInt("x");
				resy = rs.getInt("y");
			}else{
				logger.error("该坐标已被占用");
				return Boolean.FALSE;
			}
			rs.close();
			pstmt.close();
			//////////////更新
			pstmt = conn.prepareStatement(sql_update1);//更新world
			pstmt.setInt(1, characterId);
			pstmt.setInt(2, resx);
			pstmt.setInt(3, resy);
			pstmt.execute();
			pstmt.close();
			
			pstmt = conn.prepareStatement(sql_update2);//更新主城
			pstmt.setInt(1, resx);
			pstmt.setInt(2, resy);
			pstmt.setInt(3, characterId);
			pstmt.execute();
			pstmt.close();
		} catch (SQLException e) {
			e.printStackTrace();
			return Boolean.FALSE;
		} finally{
			try {
				if (rs != null) {
					rs.close();
				}
				if (pstmt != null) {
					pstmt.close();
				}
				if(conn != null){
					conn.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return Boolean.TRUE;
	}
}

