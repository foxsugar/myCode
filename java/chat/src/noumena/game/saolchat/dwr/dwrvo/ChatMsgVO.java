package noumena.game.saolchat.dwr.dwrvo;

public class ChatMsgVO implements Comparable<ChatMsgVO>
{
	private int serverId;
	private int senderId;
	private String senderName;
	private int channelId;
	private String content;
	private long time;
	private String uid;

	public long getTime()
	{
		return time;
	}
	public void setTime(long time)
	{
		this.time = time;
	}
	public int getServerId()
	{
		return serverId;
	}
	public int getSenderId()
	{
		return senderId;
	}
	public String getSenderName()
	{
		return senderName;
	}
	public int getChannelId()
	{
		return channelId;
	}
	public String getContent()
	{
		return content;
	}
	public void setServerId(int serverId)
	{
		this.serverId = serverId;
	}
	public void setSenderId(int senderId)
	{
		this.senderId = senderId;
	}
	public void setSenderName(String senderName)
	{
		this.senderName = senderName;
	}
	public void setChannelId(int channelId)
	{
		this.channelId = channelId;
	}
	public void setContent(String content)
	{
		this.content = content;
	}
	public String getUid()
	{
		return uid;
	}
	public void setUid(String uid)
	{
		this.uid = uid;
	}
	
	@Override
	public int compareTo(ChatMsgVO arg0)
	{
		if (this.getTime() == arg0.getTime())
		{
			return -1;
		}
		return (int) (arg0.getTime() - this.getTime());
	}	
}
