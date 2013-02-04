package noumena.game.saolchat.dwr;

import java.util.Vector;

import javax.servlet.http.HttpSession;
import javax.swing.text.AbstractDocument.Content;

import noumena.game.saolchat.dwr.dwrvo.ChatMsgVO;
import noumena.game.saolchat.dwr.dwrvo.DwrGetChatVO;
import noumena.game.saolchat.model.ChatCenter;
import noumena.game.saolchat.util.Util;

import org.directwebremoting.WebContextFactory;

public class DwrChat
{
	public static DwrGetChatVO startChat(int serverid, int shell)
	{
		DwrGetChatVO chats = new DwrGetChatVO();
		chats.setMaxIndex(ChatCenter.getChatCenter().getMaxIndex());
		
		HttpSession session = WebContextFactory.get().getSession();
		session.setAttribute("shell", shell);
		
		chats.setSessionId(session.getId());
		
		return chats;
	}
	
	public static DwrGetChatVO getChat(int serverid, Vector<Integer> channels, int index, int receiverid)
	{
		DwrGetChatVO chats = ChatCenter.getChatCenter().getChats(channels, index, receiverid);
		if (chats == null)
		{
			chats = new DwrGetChatVO();
			chats.setMaxIndex(index);
		}
		return chats;
	}
	
	public static DwrGetChatVO getAdminChat(int index)
	{
		DwrGetChatVO chats = ChatCenter.getChatCenter().getAdminChats(index);
		if (chats == null)
		{
			chats = new DwrGetChatVO();
			chats.setMaxIndex(index);
		}
		Vector<Object> msgs = new Vector<Object>();
		for (int i = 0 ; i < chats.getMsgs().size() ; i++)
		{
			msgs.add(chats.getMsgs().get(i));
		}
		Util.SortDwr(msgs);
		chats.getMsgs().clear();
		for (int i = 0 ; i < msgs.size() ; i++)
		{
			chats.getMsgs().add((ChatMsgVO) msgs.get(i));
		}
		return chats;
	}
	
	public static void sendChat(ChatMsgVO chatmsg)
	{
//		String content = chatmsg.getContent();
//		System.out.println(content);
		ChatCenter.getChatCenter().addChat(chatmsg);
	}
}
