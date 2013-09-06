package com.crystalcg.gamedev.mail.domain;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnore;

public class Mail {

	private int id;
	private int addresser; // '发件人id，系统：-1，拍卖行：-2',
	private String addresserName;
	private int addressee; // '收件人id',
	private String title; // '邮件标题',
	private String content;// '邮件正文',
	@JsonIgnore
	private int attachment1; // '附件1,道具ID，',
	@JsonIgnore
	private int attachmentType1;// '附件类型1',
	@JsonIgnore
	private int attachment2;
	@JsonIgnore
	private int attachmentType2;
	@JsonIgnore
	private int attachment3;
	@JsonIgnore
	private int attachmentType3;
	@JsonIgnore
	private int attachment4;
	@JsonIgnore
	private int attachmentType4;
	@JsonIgnore
	private int attachment5;
	@JsonIgnore
	private int attachmentType5;
	@JsonIgnore
	private int attachment6;
	@JsonIgnore
	private int attachmentType6;
	@JsonIgnore
	private int cash;//元宝
	private Date sendTime;// '发送时间',
	private int status; // '0未读，1已读',

	public Mail() {
		sendTime = new Date();
	}
//	public int getAddresserType(){
//		if(addresser>0){
//			return Const.MAIL_ADDRESSER_TYPE_CHARACTER;//1为玩家
//		}else{
//			return Const.MAIL_ADDRESSER_TYPE_SYSTEM;//0为系统
//		}
//	}
//	public int getHasAttachment(){
//		if(attachment1==0){
//			return Const.MAIL_HAS_NOT_ATTACHMENT;//没有附件，为0
//		}else{
//			return Const.MAIL_HAS_ATTACHMENT;//有附件，为1
//		}
//	}
	
	public int getId() {
		return id;
	}

	public int getAddresser() {
		return addresser;
	}

	public int getAddressee() {
		return addressee;
	}

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}

	public int getAttachment1() {
		return attachment1;
	}

	public int getAttachmentType1() {
		return attachmentType1;
	}

	public int getAttachment2() {
		return attachment2;
	}

	public int getAttachmentType2() {
		return attachmentType2;
	}

	public int getAttachment3() {
		return attachment3;
	}

	public int getAttachmentType3() {
		return attachmentType3;
	}

	public int getAttachment4() {
		return attachment4;
	}

	public int getAttachmentType4() {
		return attachmentType4;
	}

	public int getAttachment5() {
		return attachment5;
	}

	public int getAttachmentType5() {
		return attachmentType5;
	}

	public int getAttachment6() {
		return attachment6;
	}

	public int getAttachmentType6() {
		return attachmentType6;
	}

	public Date getSendTime() {
		return sendTime;
	}

	public int getStatus() {
		return status;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setAddresser(int addresser) {
		this.addresser = addresser;
	}

	public void setAddressee(int addressee) {
		this.addressee = addressee;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setAttachment1(int attachment1) {
		this.attachment1 = attachment1;
	}

	public void setAttachmentType1(int attachmentType1) {
		this.attachmentType1 = attachmentType1;
	}

	public void setAttachment2(int attachment2) {
		this.attachment2 = attachment2;
	}

	public void setAttachmentType2(int attachmentType2) {
		this.attachmentType2 = attachmentType2;
	}

	public void setAttachment3(int attachment3) {
		this.attachment3 = attachment3;
	}

	public void setAttachmentType3(int attachmentType3) {
		this.attachmentType3 = attachmentType3;
	}

	public void setAttachment4(int attachment4) {
		this.attachment4 = attachment4;
	}

	public void setAttachmentType4(int attachmentType4) {
		this.attachmentType4 = attachmentType4;
	}

	public void setAttachment5(int attachment5) {
		this.attachment5 = attachment5;
	}

	public void setAttachmentType5(int attachmentType5) {
		this.attachmentType5 = attachmentType5;
	}

	public void setAttachment6(int attachment6) {
		this.attachment6 = attachment6;
	}

	public void setAttachmentType6(int attachmentType6) {
		this.attachmentType6 = attachmentType6;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getCash() {
		return cash;
	}

	public void setCash(int cash) {
		this.cash = cash;
	}

	public String getAddresserName() {
		return addresserName;
	}

	public void setAddresserName(String addresserName) {
		this.addresserName = addresserName;
	}

}
