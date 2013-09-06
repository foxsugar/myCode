package com.crystalcg.gamedev.mail.action;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.mail.domain.Mail;
import com.crystalcg.gamedev.mail.service.MailService;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.util.Const;

@Controller
public class MailAction {
	
	private MailService mailService;
	private int pageSize = 12;
	
	@RequestMapping(value="sendMail")
	public @ResponseBody boolean sendMail(HttpSession session,String addresseeName, String title, String content) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int charId = character.getId();
		Mail mail = new Mail();
		mail.setAddresser(charId);
		mail.setTitle(title);
		mail.setContent(content);
		mailService.sendMail(mail,addresseeName);
		return true;
	}
	
	@RequestMapping(value="getMailList")
	public @ResponseBody Object getMailList(HttpSession  session, int page, int readStatus){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int charId = character.getId();
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("addressee", charId);
		param.put("start", (page-1)*pageSize);
		param.put("pageSize", pageSize);
		param.put("status",readStatus);
		int count = mailService.getCount(param);
		int pageCount = (count+pageSize-1)/pageSize;
		if(page>pageCount){
			page = pageCount;
		}
		Map<String,Object> retMap = new HashMap<String,Object>();
		retMap.put("pageCount", pageCount);
		if(count>0){
			retMap.put("mailList",filterMailList(mailService.getMailList(param)));
		}
		return retMap;
	}
	
	@RequestMapping(value="deleteMail")
	@ResponseBody public Map<String,Object> deleteMail(HttpSession  session,int[] mailIds, int page, int readStatus){
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int characterId = character.getId();
 		mailService.deleteMail(characterId,mailIds);
		Map<String,Object> retMap = new HashMap<String, Object>();
		retMap.put("isSuccess", true);
		Map<String, Object> param2 = new HashMap<String, Object>();
		param2.put("addressee", characterId);
		param2.put("start", (page-1)*pageSize);
		param2.put("pageSize", pageSize);
		param2.put("status",readStatus);
		int count = mailService.getCount(param2);
		int pageCount = (count+pageSize-1)/pageSize;
		if(page>pageCount){
			page = pageCount;
		}
		retMap.put("pageCount", pageCount);
		retMap.put("page", page);
		if(count>0){
			retMap.put("mailList",filterMailList(mailService.getMailList(param2)));
		}
		return retMap;
	}
	
	@RequestMapping(value="getMailDetail")
	public @ResponseBody Map<String, Object> getMailDetail(int mailId,HttpSession  session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int charId = character.getId();
		Mail mail = mailService.getMailDetail(charId, mailId);
		if(mail==null){
			throw new AppException("邮件不存在");
		}
		if(mail.getStatus() == 0){
			mailService.setRead(mail.getId());
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("mail", mail);
		retMap.put("attachment", mailService.getAttachment(mail));
		return retMap;
	}
	@RequestMapping(value="obtainAttachment")
	public @ResponseBody boolean obtainAttachment(int mailId,HttpSession session) throws AppException{
		UserCharacter character = (UserCharacter) session.getAttribute("character");
		int charId = character.getId();
		Mail mail = mailService.getMailDetail(charId, mailId);
		if(mail==null){
			throw new AppException("邮件不存在");
		}
		mailService.obtainAttachment(mail);
		return true;
	}
//	@RequestMapping(value="getAddressee")
//	public @ResponseBody List<Map<String,String>> getAddressee(HttpSession  session){
//		UserCharacter character = (UserCharacter) session.getAttribute("character");
//		int charId = character.getId();
//		return mailService.getAddressee(charId);
//	}
	
	private List<Map<String,Object>>  filterMailList(List<Map<String,Object>> mailList){
		if(mailList==null||mailList.isEmpty()){
			return mailList;
		}
		int count = mailList.size();
		for(int i=0;i<count;i++){
			Map<String,Object> mail = mailList.get(i);
			int addresser = (Integer)mail.get("addresser");
			if(addresser == -1){
				mail.put("addresser", "系统");
			}else if(addresser == -2){
				mail.put("addresser", "拍卖行");
			}else{
				mail.put("addresser", "玩家");
			}
			int attachment1 = (Integer)mail.get("attachment1");
			int cash = (Integer)mail.get("cash");
			if(attachment1!=0||cash!=0){
				mail.put("hasAttachment", Const.MAIL_HAS_ATTACHMENT);
			}else{
				mail.put("hasAttachment", Const.MAIL_HAS_NOT_ATTACHMENT);
			}
			long sendTime = ((java.sql.Timestamp)mail.get("sendTime")).getTime();
			mail.put("sendTime", modifyTime(sendTime));
		}
		return mailList;
	}
	
	private String modifyTime(long time){
		Date paraTime = new Date(time);
		Calendar c = Calendar.getInstance();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

		Date tody = c.getTime();
		if(format.format(tody).equals(format.format(paraTime))){
			return "今天";
		}else{
			c.add(Calendar.DATE, -1);
			Date yestoday = c.getTime();
			if(format.format(yestoday).equals(format.format(paraTime))){
				return "昨天";
			}else{
				return "更早";
			}
		}
	}
	
	public MailService getMailService() {
		return mailService;
	}
	
	public void setMailService(MailService mailService) {
		this.mailService = mailService;
	}
	
}
