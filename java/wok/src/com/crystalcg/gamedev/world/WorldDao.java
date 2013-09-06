package com.crystalcg.gamedev.world;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.dbcp.BasicDataSource;

import com.crystalcg.gamedev.util.ServiceLocator;
import com.crystalcg.gamedev.util.cache.CityCache;
import com.crystalcg.gamedev.util.cache.WorldCityCache;
import com.crystalcg.gamedev.util.cache.domain.StaticEnemyNPC;
import com.crystalcg.gamedev.util.cache.domain.StaticWorldCity;
import com.crystalcg.gamedev.util.cache.domain.StaticWorldResource;

public class WorldDao {
	private static final char DOT = ',';
	private static final char LEFT = '[';
	private static final char RIGHT = ']';
	private static final char QM = '"';
	/**
	 * 获取区域内数据
	 * @param x1
	 * @param x2
	 * @param y1
	 * @param y2
	 * @return
	 * @throws SQLException
	 */
	public static String getRectArea(int x1,int x2,int y1,int y2) throws SQLException{
		BasicDataSource dataSource = (BasicDataSource) ServiceLocator.getSpringBean("dataSource");
		String sql = "select t1.*,t2.name,t3.level,t4.name aname from world t1 left join user_character t2 on t1.rel_id=t2.id " +
					 "left join user_main_city t3 on t1.rel_id=t3.character_id left join user_alliance t4 on t2.alliance_id = t4.id " +
					 "where t1.x>=? and t1.x<=? and t1.y>=? and t1.y<=?";
		StringBuilder sb = new StringBuilder();
		StringBuilder line = new StringBuilder();
		boolean isFirstLine = true;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int type;
		int lineType;
		try {
			conn = dataSource.getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, x1);
			pstmt.setInt(2, x2);
			pstmt.setInt(3, y1);
			pstmt.setInt(4, y2);
			rs = pstmt.executeQuery();
			sb.append(LEFT);
			while(rs.next()){
				type = rs.getInt("cell_type");//类型
				lineType = rs.getInt("line_type");
				switch (type) {
				case 0://空地
					break;
				case 1://建城点
					appendCityPoint(sb, rs, type);
					sb.append(DOT);
					break;
				case 2://城池占位点
					break;
				case 3://玩家城池
					if(appendUserCity(sb, rs, type)){
						sb.append(DOT);
					}
					break;
				case 4://资源刷新点
					if(appendResource(sb, rs, type)){
						sb.append(DOT);
					}
					break;
				case 5://野怪刷新点
					if(appendMonster(sb, rs, type)){
						sb.append(DOT);
					}
					break;
				case 6://国都
				case 7://名城
					if(appendWorldCity(sb, rs, type)){
						sb.append(DOT);
					}
					break;
				}
				if(lineType != 0){//国界线
					if(isFirstLine){
						isFirstLine = false;
					}else{
						line.append(DOT);
					}
					line.append(rs.getInt("x")).append(DOT)
					.append(rs.getInt("y")).append(DOT)
					.append(lineType);
				}
			}
			sb.append(LEFT)
			.append(line)
			.append(RIGHT).append(RIGHT);
			return sb.toString();
		} catch (SQLException e) {
			throw e;
		} finally {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
			if(conn != null){
				conn.close();
			}
		}
	}
	
	/**
	 * 建城点
	 * @param sb
	 * @param rs
	 * @throws SQLException 
	 */
	private static final void appendCityPoint(StringBuilder sb,ResultSet rs,int type) throws SQLException{
		sb.append(LEFT)
		.append(type).append(DOT)
		.append(rs.getInt("x")).append(DOT)
		.append(rs.getInt("y")).append(DOT)
		.append(rs.getInt("country")).append(DOT)
		.append(rs.getInt("terrain")).append(DOT)
		.append(rs.getInt("food")).append(DOT)
		.append(rs.getInt("wood")).append(DOT)
		.append(rs.getInt("stone")).append(DOT)
		.append(rs.getInt("ironore"))
		.append(RIGHT);
	}
	
	/**
	 * 玩家城池
	 * @param sb
	 * @param rs
	 * @throws SQLException 
	 */
	private static final boolean appendUserCity(StringBuilder sb,ResultSet rs,int type) throws SQLException{
		int level = rs.getInt("level");
		if(level == 0){
			return Boolean.FALSE;
		}
		sb.append(LEFT)
		.append(type).append(DOT)
		.append(rs.getInt("x")).append(DOT)
		.append(rs.getInt("y")).append(DOT)
		.append(rs.getInt("rel_id")).append(DOT)//君主id
		.append(QM).append(rs.getString("name")).append(QM).append(DOT)//君主名
		.append(level).append(DOT)//城池等级
		.append(CityCache.getAgeByLevel(level))//城池外观 1-5时代 对应 1-5编号的图片
		.append(RIGHT);
		return Boolean.TRUE;
	}
	
	/**
	 * 资源
	 * @param sb
	 * @param rs
	 * @throws SQLException 
	 */
	private static final boolean appendResource(StringBuilder sb,ResultSet rs,int type) throws SQLException{
		int x = rs.getInt("x");
		int y = rs.getInt("y");
		DataPack dp = WorldService.getResource(x, y);
		if(dp == null){
			return Boolean.FALSE;
		}
		StaticWorldResource sr = dp.getStaticWorldResource();
		sb.append(LEFT)
		.append(type).append(DOT)
		.append(x).append(DOT)
		.append(y).append(DOT)
		.append(QM).append(sr.getName()).append(QM).append(DOT)//资源名
		.append(sr.getImg())//外观图片编号
		.append(RIGHT);
		return Boolean.TRUE;
	}
	
	/**
	 * 野怪
	 * @param sb
	 * @param rs
	 * @throws SQLException 
	 */
	private static final boolean appendMonster(StringBuilder sb,ResultSet rs,int type) throws SQLException{
		int x = rs.getInt("x");
		int y = rs.getInt("y");
		StaticEnemyNPC sn = WorldService.getForce(x, y);
		if(sn == null){
			return Boolean.FALSE;
		}
		sb.append(LEFT)
		.append(type).append(DOT)
		.append(x).append(DOT)
		.append(y).append(DOT)
		.append(QM).append(sn.getEnemyName()).append(QM).append(DOT)//怪物名
		.append(QM).append(sn.getImg()).append(QM).append(DOT)
		.append(RIGHT);
		return Boolean.TRUE;
	}
	
	/**
	 * 获得国都、名城
	 * @param x
	 * @param y
	 * @param sb
	 * @throws SQLException
	 */
	private static boolean appendWorldCity(StringBuilder sb,ResultSet rs,int type) throws SQLException{
		int x = rs.getInt("x");
		int y = rs.getInt("y");
		StaticWorldCity sc = WorldCityCache.getWorldCity(x, y);
		if(sc == null){
			return Boolean.FALSE;
		}
		sb.append(LEFT)
		.append(type).append(DOT)
		.append(x).append(DOT)
		.append(y).append(DOT)
		.append(sc.getId()).append(DOT)
		.append(QM).append(sc.getName()).append(QM).append(DOT)//城池名
		.append(sc.getImg())//外观图片编号
		.append(RIGHT);
		return Boolean.TRUE;
	}
	

	/**
	 * 获取区域内数据
	 * @param x1
	 * @param x2
	 * @param y1
	 * @param y2
	 * @return
	 * @throws SQLException
	 */
	public static String getRectAreaForRadar(int x1,int x2,int y1,int y2) throws SQLException{
		BasicDataSource dataSource = (BasicDataSource) ServiceLocator.getSpringBean("dataSource");
		String sql = "select x,y,cell_type from world where x>=? and x<=? and y>=? and y<=? and cell_type>2";
		StringBuilder sb = new StringBuilder();
		boolean isFirstRow = true;
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn = dataSource.getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, x1);
			pstmt.setInt(2, x2);
			pstmt.setInt(3, y1);
			pstmt.setInt(4, y2);
			rs = pstmt.executeQuery();
			int x;
			int y;
			int type;
			sb.append(LEFT);
			while(rs.next()){
				x = rs.getInt("x");
				y = rs.getInt("y");
				type = rs.getInt("cell_type");
				if(type == 4 && WorldService.getResource(x, y) == null){
					continue;
				}
				if(type == 5 && WorldService.getForce(x, y) == null){
					continue;
				}
				if(isFirstRow){
					isFirstRow = false;
				}else{
					sb.append(DOT);
				}
				sb.append(rs.getInt("x")).append(DOT)
				.append(rs.getInt("y")).append(DOT)
				.append(rs.getInt("cell_type"));
			}
			sb.append(RIGHT);
			return sb.toString();
		} catch (SQLException e) {
			throw e;
		} finally {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
			if(conn != null){
				conn.close();
			}
		}
	}
	/**
	 * 根据国家和地块类型查询相关国家土地信息
	 * @param cell_type 地块类型：0空地，1建城点，2玩家城池占位，3玩家城池，4野城，5野城占位，6资源，7野怪，8名称，9名称占位，10国度，11国都占位
	 * @return
	 * @throws SQLException 
	 */
	public static List<DataEntity> getDataEntityByType(int cell_type,int country) throws SQLException{
		List<DataEntity> DataEntityList = new ArrayList<DataEntity>();
		BasicDataSource dataSource = (BasicDataSource) ServiceLocator.getSpringBean("dataSource");
		String sql = "select x,y,cell_type from world where  cell_type = ? and country = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn = dataSource.getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, cell_type);
			pstmt.setInt(2, country);
			rs = pstmt.executeQuery();
			DataEntity data = null;
			while(rs.next()){
				data = new DataEntity();
				data.setX(rs.getInt("x"));
				data.setY(rs.getInt("y"));
				data.setCt(rs.getInt("cell_type"));
				DataEntityList.add(data);
			}
		} catch (SQLException e) {
			throw e;
		} finally {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
			if(conn != null){
				conn.close();
			}
		}
		return DataEntityList;
	}
	/**
	 * 根据坐标获得土地地块使用信息
	 * @param x
	 * @param y
	 * @return
	 * @throws SQLException
	 */
	public static DataEntity getDataEntityByXY(int x,int y) throws SQLException{
		BasicDataSource dataSource = (BasicDataSource) ServiceLocator.getSpringBean("dataSource");
		String sql = "select x,y,cell_type,country from world where  x = ? and y = ?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		DataEntity data = null;
		try {
			conn = dataSource.getConnection();
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, x);
			pstmt.setInt(2, y);
			rs = pstmt.executeQuery();
			if(rs.next()){
				data = new DataEntity();
				data.setX(rs.getInt("x"));
				data.setY(rs.getInt("y"));
				data.setCt(rs.getInt("country"));
				data.setTp(rs.getInt("cell_type"));
			}
		} catch (SQLException e) {
			throw e;
		} finally {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
			if(conn != null){
				conn.close();
			}
		}
		return data;
	}
	/**
	 * 修改土地占有(cell_type)信息
	 * @param data
	 * @throws SQLException 
	 */
	public static void changeWorld(int x,int y,int cell_type,int characterId) throws SQLException{
		BasicDataSource dataSource = (BasicDataSource) ServiceLocator.getSpringBean("dataSource");
		String sql = "update world set cell_type=?,rel_id=? where x=? and y=?";
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn = dataSource.getConnection();
			pstmt = conn.prepareStatement(sql);//更新world
			pstmt.setInt(1, cell_type);
			pstmt.setInt(2, characterId);
			pstmt.setInt(3, x);
			pstmt.setInt(4, y);
			pstmt.execute();
			pstmt.close();
		} catch (SQLException e) {
			throw e;
		} finally {
			if (rs != null) {
				rs.close();
			}
			if (pstmt != null) {
				pstmt.close();
			}
			if(conn != null){
				conn.close();
			}
		}
	}
	
}
