package com.crystalcg.gamedev.chat;

public class Message implements Comparable<Message> {
	private byte type;//0： 世界，1：国家，2：联盟，3：私聊
	private int from;//发言人id：-1：系统
	private String fromName;//发言人名字
	private int to;//发送到的频道id
	private String toName;//私聊时对方的名字
	private String content;
	private long time;
	
	public Message(){
		this.time = System.currentTimeMillis();
	}
	
	public byte getType() {
		return type;
	}
	public int getFrom() {
		return from;
	}
	public String getFromName() {
		return fromName;
	}
	public int getTo() {
		return to;
	}
	public String getContent() {
		return content;
	}
	public void setType(byte type) {
		this.type = type;
	}
	public void setFrom(int from) {
		this.from = from;
	}
	public void setFromName(String fromName) {
		this.fromName = fromName;
	}
	public void setTo(int to) {
		this.to = to;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public long getTime() {
		return time;
	}

	@Override
	public int compareTo(Message o) {
		if(this.time<o.time){
			return -1;
		}else if(this.time>o.time){
			return 1;
		}else{
			return 0;
		}
	}

	@Override
	public String toString() {
		return "Message [type=" + type + ", from=" + from + ", fromName="
				+ fromName + ", to=" + to + ", content=" + content + ", time="
				+ time + "]";
	}

	public String getToName() {
		return toName;
	}

	public void setToName(String toName) {
		this.toName = toName;
	}

}
