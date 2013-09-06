package com.crystalcg.gamedev.mail.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.mail.domain.Mail;
import com.crystalcg.gamedev.mail.mapper.MailMapper;

public class MailDao {
	
	private MailMapper mailMapper;
	
	public void sendMail(Mail mail){
		mailMapper.sendMail(mail);
	}
	public int getCount(Map<String, Object> param){
		return mailMapper.getCount(param);
	}
	public List<Map<String, Object>> getMailList(Map<String, Object> param){
		return mailMapper.getMailList(param);
	}
	public Mail getMailDetail(int charId,int mailId){
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("charId", charId);
		param.put("mailId", mailId);
		return mailMapper.getMailDetail(param);
	}
	
	public void deleteMail(Map<String,Object> param){
		mailMapper.deleteMail(param);
	}
	
	public void setRead(int mailId){
		mailMapper.setRead(mailId);
	}
	public void updateAttachment(int mailId){
		mailMapper.updateAttachment(mailId);
	}
	
	public MailMapper getMailMapper() {
		return mailMapper;
	}
	public void setMailMapper(MailMapper mailMapper) {
		this.mailMapper = mailMapper;
	}
}
