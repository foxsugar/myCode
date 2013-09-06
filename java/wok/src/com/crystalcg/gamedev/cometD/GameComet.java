package com.crystalcg.gamedev.cometD;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.ConfigurableServerChannel;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerSession;
import org.cometd.server.AbstractService;
import org.cometd.server.authorizer.GrantAuthorizer;
import org.cometd.server.filter.DataFilterMessageListener;
import org.cometd.server.filter.JSONDataFilter;
import org.cometd.server.filter.NoMarkupFilter;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.building.service.BuildingService;
import com.crystalcg.gamedev.newChat.ChatConstants;
import com.crystalcg.gamedev.quest.service.QuestService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.user.service.MaincityService;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.QuestTargeType;
import com.crystalcg.gamedev.util.ServiceLocator;

/**
 * 创建comet服务，并配置comet服务
 * 
 * @author jinganyang
 * 
 */
public class GameComet extends AbstractService {

	private CometProcess cometProcess;
	public static final Map<String, Integer> CLIENT_SESSION_ID_MAP = new HashMap<String, Integer>(); // 玩家Id(charId)与sessionId映射关系Map，key为sessionId
	public static final Map<Integer, String> CLIENT_CHARACTER_ID_MAP = new HashMap<Integer, String>(); // 玩家Id(charId)与sessionId映射关系Map,key为characterId
	private CharacterService characterService;


	public GameComet(BayeuxServer bayeux) {
		
		super(bayeux, "gameComet");
		addService("/service", "processComet");
		addService("/login", "processLogin");
		getBayeux().createIfAbsent(ChatConstants.CHAT_CHANEL_NAME,new ConfigurableServerChannel.Initializer() {
					public void configureChannel(ConfigurableServerChannel channel) {
						DataFilterMessageListener noMarkup = new DataFilterMessageListener(new NoMarkupFilter(), new AllocateMessageFilter());
						channel.addListener(noMarkup);
						channel.addAuthorizer(GrantAuthorizer.GRANT_ALL);
					}
				});
		
		bayeux.addListener(new BayeuxServer.SessionListener() {

			@Override
			public void sessionRemoved(ServerSession arg0, boolean arg1) {
				// TODO Auto-generated method stub
				// 下线，掉线操作
				System.out.println("用户"+ CLIENT_SESSION_ID_MAP.get(arg0.getId())+ "下线了!!!    ");
				System.out.println("下线清除用户："+arg0.getAttribute("uerName"));
				if(ChatConstants.CLIENT_CHAT_MAP!=null && arg0.getAttribute("uerName")!=null){
				ChatConstants.CLIENT_CHAT_MAP.remove(arg0.getAttribute("uerName"));
				}
				if (CLIENT_SESSION_ID_MAP.get(arg0.getId()) == null) {
					return;
				}
				cometProcess.logoutProcess(CLIENT_SESSION_ID_MAP.get(arg0.getId()));
				CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
				characterService.updateLogoutTime(CLIENT_SESSION_ID_MAP.remove(arg0.getId()), new Date());
				CLIENT_CHARACTER_ID_MAP.remove(CLIENT_SESSION_ID_MAP.get(arg0.getId()));
				
				CLIENT_SESSION_ID_MAP.remove(arg0.getId());
				System.out.println("当前在线玩家数量:" + CLIENT_SESSION_ID_MAP.size()+ "  =========  玩家:" + CLIENT_SESSION_ID_MAP);

				// 此处和添加玩家下线操作相关代码
			}

			@Override
			public void sessionAdded(ServerSession arg0) {
			
			} 
		});

	}

	public void processLogin(ServerSession remote, String channelName,
			Map<String, Object> data, String messageId) {
		// 以后需要删除，登录不需要推送资源
		long charId = (Long) data.get("charId");
		int characterId = (int) charId;
		if (CLIENT_SESSION_ID_MAP.containsValue(characterId)) {
			CLIENT_SESSION_ID_MAP.remove(CLIENT_CHARACTER_ID_MAP.get(characterId));
		}
		if (CLIENT_CHARACTER_ID_MAP.get(characterId) != null) {
			CLIENT_CHARACTER_ID_MAP.remove(characterId);
		}
		CLIENT_SESSION_ID_MAP.put(remote.getId(), characterId);
		CLIENT_CHARACTER_ID_MAP.put(characterId, remote.getId());
		MaincityService maincityService = (MaincityService) ServiceLocator.getSpringBean("maincityService");
		Map<String, Object> resourceData = maincityService.getResourceForComet((int) characterId);
		UserComet userComet = (UserComet)ServiceLocator.getSpringBean("userComet");
		BuildingService buildingService = (BuildingService) ServiceLocator.getSpringBean("buildingService");
		//推送资源
		userComet.publishToGameChannel(Const.GAME_CHANNEL_RESOURCE_UPDATE, characterId, resourceData);
		//推建筑队列
		userComet.publishToGameChannel(Const.GAME_CHANNEL_BUILDING_QUEUE, characterId, buildingService.getBuildQueue(characterId));
		System.out.println("用户登录:" + CLIENT_SESSION_ID_MAP + "    " + "当前玩家:"+ CLIENT_SESSION_ID_MAP.size());
	}

	public void processComet(ServerSession remote, String channelName,
			Map<String, Object> data, String messageId) throws AppException {
		int characterId = CLIENT_SESSION_ID_MAP.get(remote.getId());
		int channelType = Integer.parseInt((String) data.get("channelType"));
		switch (channelType) {
		// 单挑处理
		case Const.BATTLE_CHANNEL_TYPE_ATTACK:
			cometProcess.battleAttackForSingleBattle(data, characterId);
			break;
		case Const.BATTLE_CHANNEL_TYPE_AUTOATTACK:
			cometProcess.battleAutoAttackForSingleBattle(data, characterId);
			break;
		case Const.BATTLE_CHANNEL_TYPE_ESCAPE:
			cometProcess.escapeForSingleBattle(data, characterId);
			break;
		case Const.BATTLE_CHANNEL_TYPE_SKILL:
			cometProcess.skillAttackForSingleBattle(data, characterId);
			break;
		case Const.BATTLE_CHANNEL_TYPE_HAS_READY:
			cometProcess.dropSingleDelay(data, characterId);
			break;
		// 讨伐处理
//		case Const.MULTIBATTLE_CHANNEL_TYPE_ATTACK:
//			cometProcess.battleAttackForMultiBattle(data, characterId);
//			break;
//		case Const.MULTIBATTLE_CHANNEL_TYPE_ATTACK_TARGET:
//			cometProcess.attackTargetForMultiBattle(data, characterId);
//			break;
		case Const.MULTIBATTLE_CHANNEL_TYPE_AUTOATTACK:
//			cometProcess.battleAutoAttackForMultiBattle(data, characterId);
			break;
		case Const.MULTIBATTLE_CHANNEL_TYPE_DEFENCE:
			cometProcess.battleDefenceForMultiBattle(data, characterId);
			break;
		case Const.MULTIBATTLE_CHANNEL_TYPE_ESCAPE:
			cometProcess.battleEscapeForMultiBattle(data, characterId);
			break;
//		case Const.MULTIBATTLE_CHANNEL_TYPE_SKILL:
//			cometProcess.battleSkillForMultiBattle(data, characterId);
//			break;
//		case Const.MULTIBATTLE_CHANNEL_TYPE_SKILL_TARGET:
//			cometProcess.skillAttackForMultiBattle(data, characterId);
//			break;
		case Const.MULTIBATTLE_CHANNEL_TYPE_HAS_READY:
			cometProcess.dropMultiDelay(data, characterId);
			break;
		default:
			break;
		}
	}
	
	public void battleMethod(ServerSession remote, Map<String, Object> data) {
		System.out.println("Sreceive: " + data);
	}

	public CometProcess getCometProcess() {
		return cometProcess;
	}

	public void setCometProcess(CometProcess cometProcess) {
		this.cometProcess = cometProcess;
	}
	public CharacterService getCharacterService() {
		return characterService;
	}



	public void setCharacterService(CharacterService characterService) {
		this.characterService = characterService;
	}
	/**
	 * 用于管理消息的发送
	 * @author liuxueliang
	 *
	 */
	class AllocateMessageFilter extends JSONDataFilter {
      
		@Override
		protected Object filterMap(ServerSession from, ServerChannel to, Map map) {
			if (map == null || map.isEmpty()) {
				return null;
			}
			int type = Integer.valueOf(map.get("type").toString()).intValue();
			String chanelId = ChatConstants.CHAT_CHANEL_NAME + map.get("characterId");
			String receiveUser = (map.get("receiveUser")==null?"":map.get("receiveUser").toString());
			String sendUser = map.get("sendName").toString();
			if (type == 4) {
				sendClientMessage(getBayeux(), chanelId, from, map,"该账号没有在系统频道发送消息的权限");
				return null;
			}
			if (type < 0 || type > 3) {
				sendClientMessage(getBayeux(), chanelId, from, map, "未知的频道");
				return null;
			}
			if (map.get("content") == null || "".equals(map.get("content").toString().trim())) {
				sendClientMessage(getBayeux(), chanelId, from, map, "请输入要发送的消息");
				return null;
			}
			//私聊频道
			if (type==3) {
				if(receiveUser==null || "".equals(receiveUser)){
					sendClientMessage(getBayeux(), chanelId, from, map,"消息发送失败，私聊需要输入消息接收者君主名称！");
					return null;
				}
				String receiveCID = ChatConstants.CLIENT_CHAT_MAP.get(receiveUser);
				UserCharacter uc = characterService.getCharacterByName(receiveUser);
			    if (receiveUser.equals(sendUser)) {
			    	sendClientMessage(getBayeux(), chanelId, from, map,"消息发送失败，不能给自己发送消息！");
					return null;
				}
				if (uc==null) {
					sendClientMessage(getBayeux(), chanelId, from, map,"消息发送失败，用户【"+receiveUser+"】不存在！");
					return null;
				}
				from.setAttribute("userName", receiveUser);
				if (receiveCID==null || "".equals(receiveCID)) {
					sendClientMessage(getBayeux(), chanelId, from, map,"消息发送失败，用户【"+receiveUser+"】不在线！");
					return null;
				}
				sendClientMessage(getBayeux(), chanelId, from, map,null);
				sendClientMessage(getBayeux(), ChatConstants.CHAT_CHANEL_NAME+receiveCID, from, map,null);
				return null;
			}
			
			//国家频道
			if(type==1){
				String countryId = map.get("countryId")==null?"0":map.get("countryId").toString();
				int cId = Integer.valueOf(countryId).intValue();
				if(cId>5 || cId<0){
					sendClientMessage(getBayeux(), chanelId, from, map,"对不起，您还未加入国家！");
					return null;
				}else {
					sendClientMessage(getBayeux(), ChatConstants.CHAT_COUNTRY_CHANEL+countryId, from, map,null);
					return null;
				}
			}
			
			//联盟频道
			if (type==2) {
				String allianceId = map.get("allianceId").toString();
				if ( "0".equals(allianceId)) {
					sendClientMessage(getBayeux(), chanelId, from, map,"对不起，您还未加入联盟！");
					return null;
				}else {
					sendClientMessage(getBayeux(), ChatConstants.CHAT_ALLICE_CHANEL+allianceId, from, map,null);
					return null;
				}
			 
			}
			if(type==0){
				//世界喊话任务
				QuestService questService = (QuestService)ServiceLocator.getSpringBean("questService");
				questService.updateQuestSchedule(QuestTargeType.USE_WORLD_CHAT, null, CLIENT_SESSION_ID_MAP.get(from.getId()));
			}
			
			return map;
		}

		/**
		 * 往客户端发消息
		 * 
		 * @param bs
		 * @param chanelId
		 * @param from
		 * @param map
		 */
		private void sendClientMessage(BayeuxServer bs, String chanelId,ServerSession from, Map map, String message) {
			if (message!=null) {
				map.put("content", message);
				map.put("type", 4);//用世界频道告诉提醒用户信息
				//map.remove("sendName");
				bs.getChannel(chanelId).publish(from, map, from.getId());
			}else {
				bs.getChannel(chanelId).publish(from, map, from.getId());
			}
		}

	}
}
