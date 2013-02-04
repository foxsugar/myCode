package noumena.game.saolchat.model;

import noumena.game.saolchat.dwr.dwrvo.ChatMsgVO;

public class ChatMsg implements Comparable<ChatMsg>
{
	private ChatMsgVO msgVO;
	private int index;
	private long time;
	public ChatMsgVO getMsgVO()
	{
		return msgVO;
	}
	public void setMsgVO(ChatMsgVO msgVO)
	{
		this.msgVO = msgVO;
	}
	public int getIndex()
	{
		return index;
	}
	public void setIndex(int index)
	{
		this.index = index;
	}
	public long getTime()
	{
		return time;
	}
	public void setTime(long time)
	{
		this.time = time;
	}
	@Override
	public int compareTo(ChatMsg o)
	{
		return this.index - o.getIndex();
	}
}
