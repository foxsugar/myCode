package noumena.game.saolchat.util;

import noumena.game.saolchat.dwr.dwrvo.ChatMsgVO;
import noumena.mgsplus.logs.model.Logs;
import noumena.mgsplus.logs.bean.MgsplusLog;

public class LogMgsplusUtil
{
	public final static String LOG_CATLOG_SENDCHAT	= "sendchat";
	
	public static void wlog(Logs log)
	{
		MgsplusLog.addLog(log);
	}
	
	public static void wlog(int id, String catlog, int level, String msg)
	{
		Logs log = new Logs();
		log.setAppCodename("Saol");
		log.setLogMsg(msg);
		log.setUserId(id);
		log.setLogLevel(1);
		log.setSuccessFlag(1);
		MgsplusLog.addLog(log);
	}
	
	/**
	 * 聊天相关的日志
	 * @param chatvo		从客户端发过来的聊天内容
	 * @param index			在服务器端的序列
	 */

	public static void ChatLog(ChatMsgVO chatvo, int index)
	{
		Logs log = new Logs();
		log.setAppCodename("SAOLChat");
		log.setUserId(chatvo.getSenderId());
		log.setLogLevel(1);
		log.setCatalog(LOG_CATLOG_SENDCHAT);
		log.setLogMsgI(chatvo.getSenderId());
		log.setLogMsgIEx1(chatvo.getChannelId());
		log.setLogMsgIEx2(index);
		log.setLogMsg(chatvo.getSenderName());
		log.setLogMsgEx1(chatvo.getContent());
		log.setLogMsgEx2(chatvo.getUid());
		log.setSuccessFlag(1);
		MgsplusLog.addLog(log);
	}
}
