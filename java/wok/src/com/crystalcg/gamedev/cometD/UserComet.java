package com.crystalcg.gamedev.cometD;

import java.util.Map;

import org.cometd.bayeux.server.ConfigurableServerChannel;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerSession;

import com.crystalcg.gamedev.util.ChangeToMap;
import com.crystalcg.gamedev.util.Const;



/**
 * comet推送类
 * @author jinganyang
 *
 */
public class UserComet {
	private GameComet gameComet;
	public boolean addServerChannel(String channelName){
		boolean result = gameComet.getBayeux().createIfAbsent(channelName, new ServerChannel.Initializer(){

			@Override
			public void configureChannel(ConfigurableServerChannel channel) {
				channel.setPersistent(true);
				
			}
			
		});
		if(result){
			return true;
		}else if(gameComet.getBayeux().getChannel(channelName)==null){
			return false;
		}else{
			return true;
		}
	}
	/**
	 * 删除服务器频道
	 * @param channelName
	 * @return
	 */
	public boolean removeServerChannel(String channelName){
		if(gameComet.getBayeux().getChannel(channelName)==null){
			return true;
		}else{
			gameComet.getBayeux().getChannel(channelName).remove();
			return true;
		}
	}
	/**
	 * 判断频道是否存在
	 * @param channelName
	 * @return
	 */
	public boolean ifChannelExist(String channelName){
		if(gameComet.getBayeux().getChannel(channelName)==null){
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 * 最基础的服务器推送，一般不直接用
	 * @param channelName 发送频道名
	 * @param data 发送数据
	 */
	public void publishToChannel(String channelName, Map<String, Object> data){
		if(gameComet.getBayeux().getChannel(channelName)==null){
			return;
		}else{
			gameComet.getBayeux().getChannel(channelName).publish(gameComet.getServerSession(), data, null);
		}
	}
	/**
	 * 最基础的服务器推送，一般不直接用
	 * @param channelName 发送频道名
	 * @param data 发送数据
	 */
	public void deliverToChannel(String channelName, int characterId, Map<String, Object> data){
		if(gameComet.getBayeux().getChannel(channelName)==null){
			return;
		}
		String sessionId = GameComet.CLIENT_CHARACTER_ID_MAP.get(characterId);
		if(sessionId==null){
			return;
		}
		ServerSession session = gameComet.getBayeux().getSession(sessionId);
		if(session==null){
			return;
		}
		if(gameComet.getBayeux().getChannel(channelName)==null){
			return;
		}
		session.deliver(session, channelName, data, null);
	}
	
	/**
	 * 向玩家游戏系统频道进行推送，用于所有玩家需要服务器主推的非战斗系统的数据
	 * @param channelType 推送信息的标识（1战斗信息提示，2邮件提示，3资源变化推送,4建筑队列；Const常量里COMETD块有对应常量）
	 * @param characterId 玩家角色Id
	 * @param data 需要发送的数据，MAP型，对象类型无法发送
	 */
	public void publishToGameChannel(int channelType, int characterId, Object data){
		CometThread cometThread = new CometThread(Const.COMET_CHANNEL_SYSTEM+characterId, ChangeToMap.changeToCometMap(channelType, data));
		CometThreadPool.addCometThread(cometThread);
//		publishToChannel(Const.COMET_CHANNEL_SYSTEM+characterId, ChangeToMap.changeToCometMap(channelType, data));
	}
	/**
	 * 向玩家游戏系统频道进行推送，只有选定的玩家能收到信息，用于所有玩家需要服务器主推的非战斗系统的数据
	 * @param channelType 推送信息的标识（1战斗信息提示，2邮件提示，3资源变化推送,4建筑队列；Const常量里COMETD块有对应常量）
	 * @param characterId 玩家角色Id
	 * @param data 需要发送的数据，MAP型，对象类型无法发送
	 */
	public void deliverToGameChannel(int channelType, int characterId, Object data){
		CometThread cometThread = new CometThread(Const.COMET_CHANNEL_SYSTEM+characterId, ChangeToMap.changeToCometMap(channelType, data), characterId);
		CometThreadPool.addCometThread(cometThread);
//		deliverToChannel(Const.COMET_CHANNEL_SYSTEM+characterId, characterId, ChangeToMap.changeToCometMap(channelType, data));
	}
	
	/**
	 * 向玩家战斗频道进行推送,订阅该频道的所有玩家都会受到信息，用于战斗方面，非战斗不用此方法
	 * @param channelType 推送信息的标识（1回合转换，2战斗结束，...Const常量里COMETD块有对应常量)
	 * @param characterId 玩家角色Id
	 * @param battleId 战场Id
	 * @param data 需要推送的数据，Map型，对象类型无法推送
	 */
	public void publishToBattleChannel(int channelType, String battleId, Object data){
		CometThread cometThread = new CometThread(Const.COMET_CHANNEL_BATTLE+battleId, ChangeToMap.changeToBattleCometMap(channelType, data));
		CometThreadPool.addCometThread(cometThread);
//		publishToChannel(Const.COMET_CHANNEL_BATTLE+battleId+(characterId==0?"":("/"+characterId)), ChangeToMap.changeToBattleCometMap(channelType, data));
	}
	/**
	 * 向玩家战斗频道进行推送,只有选定的玩家能收到信息，用于战斗方面，非战斗不用此方法
	 * @param channelType 推送信息的标识（1回合转换，2战斗结束，...Const常量里COMETD块有对应常量)
	 * @param characterId 玩家角色Id
	 * @param battleId 战场Id
	 * @param data 需要推送的数据，Map型，对象类型无法推送
	 */
	public void deliverToBattleChannel(int channelType, int characterId, String battleId, Object data){
		CometThread cometThread = new CometThread(Const.COMET_CHANNEL_BATTLE+battleId, ChangeToMap.changeToBattleCometMap(channelType, data),characterId);
		CometThreadPool.addCometThread(cometThread);
//		deliverToChannel(Const.COMET_CHANNEL_BATTLE+battleId, characterId, ChangeToMap.changeToBattleCometMap(channelType, data));
	}

	public GameComet getGameComet() {
		return gameComet;
	}

	public void setGameComet(GameComet gameComet) {
		this.gameComet = gameComet;
	}
	

}
