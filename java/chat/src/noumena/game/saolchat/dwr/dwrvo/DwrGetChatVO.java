package noumena.game.saolchat.dwr.dwrvo;

import java.util.Vector;

public class DwrGetChatVO
{
	private Vector<ChatMsgVO> msgs = new Vector<ChatMsgVO>();
	private int maxIndex;
	private String sessionId;

	public String getSessionId()
	{
		return sessionId;
	}
	public void setSessionId(String sessionId)
	{
		this.sessionId = sessionId;
	}
	public Vector<ChatMsgVO> getMsgs()
	{
		return msgs;
	}
	public void setMsgs(Vector<ChatMsgVO> msgs)
	{
		this.msgs = msgs;
	}
	public int getMaxIndex()
	{
		return maxIndex;
	}
	public void setMaxIndex(int maxIndex)
	{
		this.maxIndex = maxIndex;
	}
}
