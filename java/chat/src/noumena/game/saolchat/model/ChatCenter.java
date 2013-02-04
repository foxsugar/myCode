package noumena.game.saolchat.model;

import java.util.Collections;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Vector;

import noumena.game.saolchat.dwr.dwrvo.ChatMsgVO;
import noumena.game.saolchat.dwr.dwrvo.DwrGetChatVO;
import noumena.game.saolchat.util.LogMgsplusUtil;
import noumena.game.saolchat.util.Util;


public class ChatCenter
{
	private static ChatCenter chatCenter = new ChatCenter();
	private Hashtable<Integer, Vector<ChatMsg>> channels = new Hashtable<Integer, Vector<ChatMsg>>();
	private int maxIndex = 0;
	public static ChatCenter getChatCenter()
	{
		return chatCenter;
	}

	public int getMaxIndex()
	{
		return maxIndex;
	}

	public void setMaxIndex(int maxIndex)
	{
		this.maxIndex = maxIndex;
	}

	public void addChat(ChatMsgVO msgvo)
	{
		int senderid = msgvo.getSenderId();
		if (Util.isBanned(senderid))
		{
			return;
		}
		
		int channel = msgvo.getChannelId();
		Vector<ChatMsg> msgs = this.channels.get(channel);
		if (msgs == null)
		{
			msgs = new Vector<ChatMsg>();
			this.channels.put(channel, msgs);
		}
		ChatMsg chat = new ChatMsg();
		synchronized(this)
		{
			this.maxIndex ++;
			chat.setIndex(this.maxIndex);
		}
		chat.setMsgVO(msgvo);
		chat.setTime(System.currentTimeMillis());
		msgvo.setTime(System.currentTimeMillis());
		LogMgsplusUtil.ChatLog(msgvo, chat.getIndex());
		String content;
		content = Util.filterInvalidWords(chat.getMsgVO().getContent());
		if (content.length() > ChatCenter.CHAT_MAX_MSG_LENGTH)
		{
			content = content.substring(0, ChatCenter.CHAT_MAX_MSG_LENGTH);
		}
		content = content.replaceAll("'", "\\'");
		chat.getMsgVO().setContent(content);
		synchronized(msgs)
		{
			if (msgs.size() > ChatCenter.CHAT_MAX_MSG_PER_CHANNEL)
			{
				msgs.remove(0);
			}
			msgs.add(chat);
		}
	}

	public DwrGetChatVO getChats(Vector<Integer> channelids, int clientindex, int receiverid)
	{
		Vector<ChatMsg> newmsgs = new Vector<ChatMsg>();
		for (int channel : channelids)
		{
			Vector<ChatMsg> channelmsgs = this.channels.get(channel);
			if (channelmsgs == null)
			{
				continue;
			}
			for (int i = channelmsgs.size() -1; i >= 0; i --)
			{
				ChatMsg msg = channelmsgs.get(i);
				if (msg.getIndex() > clientindex)
				{
					if (receiverid != msg.getMsgVO().getSenderId())
					{
						newmsgs.add(channelmsgs.get(i));
					}
				}
				else
				{
					break;
				}
			}
		}
		
		Collections.sort(newmsgs);
		
		if (newmsgs.size() > ChatCenter.CHAT_MAX_MSG_PER_BATCH)
		{
			newmsgs.subList(ChatCenter.CHAT_MAX_MSG_PER_BATCH, newmsgs.size() - 1);
		}
		
		DwrGetChatVO getchatvo = new DwrGetChatVO();
		if (newmsgs.size() > 0)
		{
			getchatvo.setMaxIndex(newmsgs.get(newmsgs.size() - 1).getIndex());
			for (ChatMsg msg : newmsgs)
			{
				getchatvo.getMsgs().add(msg.getMsgVO());
			}
		}
		else
		{
			getchatvo.setMaxIndex(clientindex);
		}
		return getchatvo;
	}

	public DwrGetChatVO getAdminChats(int clientindex)
	{
		Vector<ChatMsg> newmsgs = new Vector<ChatMsg>();
		for (Enumeration<Vector<ChatMsg>> e = this.channels.elements() ; e.hasMoreElements() ;)
		{
			Vector<ChatMsg> channelmsgs = e.nextElement();
			if (channelmsgs == null)
			{
				continue;
			}
			for (int i = channelmsgs.size() -1; i >= 0; i --)
			{
				ChatMsg msg = channelmsgs.get(i);
				if (msg.getIndex() > clientindex)
				{
					newmsgs.add(channelmsgs.get(i));
				}
				else
				{
					break;
				}
			}
		}

		Collections.sort(newmsgs);
		
		DwrGetChatVO getchatvo = new DwrGetChatVO();
		if (newmsgs.size() > 0)
		{
			getchatvo.setMaxIndex(newmsgs.get(newmsgs.size() - 1).getIndex());
			for (ChatMsg msg : newmsgs)
			{
				getchatvo.getMsgs().add(msg.getMsgVO());
			}
		}
		else
		{
			getchatvo.setMaxIndex(clientindex);
		}
		
		return getchatvo;
	}

	private static final int CHAT_MAX_MSG_PER_BATCH = 5;
	
	private static final int CHAT_MAX_MSG_PER_CHANNEL = 500;
	
	private static final int CHAT_MAX_MSG_LENGTH = 200;
}
