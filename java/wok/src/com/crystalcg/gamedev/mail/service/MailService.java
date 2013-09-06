package com.crystalcg.gamedev.mail.service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.Exception.AppException;
import com.crystalcg.gamedev.item.domain.UserEquipment;
import com.crystalcg.gamedev.item.domain.UserItem;
import com.crystalcg.gamedev.item.domain.UserMaterial;
import com.crystalcg.gamedev.item.domain.UserQuests;
import com.crystalcg.gamedev.item.service.UserItemService;
import com.crystalcg.gamedev.mail.dao.MailDao;
import com.crystalcg.gamedev.mail.domain.Mail;
import com.crystalcg.gamedev.user.domain.UserCharacter;
import com.crystalcg.gamedev.user.service.CharacterService;
import com.crystalcg.gamedev.util.ChangeArticleToToolTip;
import com.crystalcg.gamedev.util.Const;
import com.crystalcg.gamedev.util.ServiceLocator;

public class MailService {
	
	private MailDao mailDao;
	
	/**
	 * 发送邮件,收信人参数为用户名
	 * @param mail
	 */
	public void sendMail(Mail mail, String addresseeName) throws AppException{
		CharacterService characterService = (CharacterService) ServiceLocator.getSpringBean("characterService");
		int addresseeId = characterService.getCharacterIdByName(addresseeName);
		if(addresseeId==0){
			throw new AppException("不存在该玩家");
		}
		mail.setAddressee(addresseeId);
		mailDao.sendMail(mail);
	}
	/**
	 * 发送邮件方法
	 * @param addresseeId 收件人Id
	 * @param addresserId 发件人Id
	 * @param title 标题
	 * @param content 内容
	 */
	public void sendMail(int addresseeId, int addresserId, String title, String content){
		Mail mail = new Mail();
		mail.setAddresser(addresserId);
		mail.setTitle(title);
		mail.setContent(content);
		mail.setAddressee(addresseeId);
		mailDao.sendMail(mail);
	}
	/**
	 * 发送邮件，收信人参数为Id
	 * @param mail
	 * @throws AppException
	 */
	public void sendMail(Mail mail){
		mailDao.sendMail(mail);
	}
	
	public int getCount(Map<String, Object> param){
		return mailDao.getCount(param);
	}
	public List<Map<String, Object>> getMailList(Map<String, Object> param){
		return mailDao.getMailList(param);
	}
	/**
	 * 删除邮件
	 * @param characterId
	 * @param mailIds
	 */
	public void deleteMail(int characterId, int[] mailIds){
		Map<String,Object>	param = new HashMap<String, Object>();
		param.put("characterId", characterId);
		param.put("mailIds", mailIds);
		for(int id:mailIds){
			Mail mail = getMailDetail(characterId, id);
			if(mail==null){
				continue;
			}
			if(mail.getAttachment1()!=0){
				deleteAttachment(mail);
			}
		}
		mailDao.deleteMail(param);
	}
	/**
	 * 删除邮件附件
	 * @param mail
	 */
	private void deleteAttachment(Mail mail){
		String getAttachmentName = "getAttachment";
		String getAttachmentTypeName = "getAttachmentType";
		int length = 6;//换常量
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		try {
			for(int i=1;i<=length;i++){//反射获取获得附件的方法
				Method getAttachment = Mail.class.getMethod(getAttachmentName+i);
				Method getAttachmentType = Mail.class.getMethod(getAttachmentTypeName+i);
				int attachment = (Integer)getAttachment.invoke(mail);
				int attachmentType = (Integer)getAttachmentType.invoke(mail);
				if(attachment!=0&&attachmentType==Const.TYPE_EQUIPMENT){//id不为0，查找对应道具
					userItemService.deleteFromUserEquipment(attachment);
				}else if(attachment!=0){
					userItemService.deleteFromUserItem(attachment);
				}else{
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 获取信件详情
	 * @param charId
	 * @param mailId
	 * @return
	 */
	public Mail getMailDetail(int charId,int mailId){
		return mailDao.getMailDetail(charId, mailId);
	}
	/**
	 * 获取附件信息
	 * @param mail
	 */
	public Map<String, Object> getAttachment(Mail mail) throws AppException{
		List<Object> attachmentList = new ArrayList<Object>();
		String getAttachmentName = "getAttachment";
		String getAttachmentTypeName = "getAttachmentType";
		int length = 6;//换常量
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		try {
			Map<String, Object> articleInfo;
			for(int i=1;i<=length;i++){//反射获取获得附件的方法
				Method getAttachment = Mail.class.getMethod(getAttachmentName+i);
				Method getAttachmentType = Mail.class.getMethod(getAttachmentTypeName+i);
				int attachment = (Integer)getAttachment.invoke(mail);
				int attachmentType = (Integer)getAttachmentType.invoke(mail);
				if(attachment!=0){//id不为0，查找对应道具
					switch (attachmentType) {
					case Const.TYPE_EQUIPMENT:
						articleInfo = new HashMap<String,Object>();
						UserEquipment userEquipment = userItemService.getUserEquipmentById(attachment);
						articleInfo.put("icon", userEquipment.getEquipment().getIcon());
						articleInfo.put("type", userEquipment.getItemType());
						articleInfo.put("toolTipInfo", ChangeArticleToToolTip.changeEquipmentToToolTip(userEquipment));
						attachmentList.add(articleInfo);
						break;
					case Const.TYPE_ITEM:
						articleInfo = new HashMap<String,Object>();
						UserItem userItem = userItemService.getUserItemById(attachment);
						articleInfo.put("icon", userItem.getItem().getIcon());
						articleInfo.put("type", userItem.getItemType());
						articleInfo.put("amount", userItem.getItemAmount());
						articleInfo.put("toolTipInfo", ChangeArticleToToolTip.changeItemToToolTip(userItem));
						attachmentList.add(articleInfo);
						break;
					case Const.TYPE_MATERIAL:
						articleInfo = new HashMap<String,Object>();
						UserMaterial userMaterial = userItemService.getUserMaterialById(attachment);
						articleInfo.put("icon", userMaterial.getMaterial().getIcon());
						articleInfo.put("type", userMaterial.getItemType());
						articleInfo.put("amount", userMaterial.getItemAmount());
						articleInfo.put("toolTipInfo", ChangeArticleToToolTip.changeMaterialToToolTip(userMaterial));
						attachmentList.add(articleInfo);
						break;
					case Const.TYPE_QUESTS:
						articleInfo = new HashMap<String,Object>();
						UserQuests userQuests = userItemService.getUserQuestsById(attachment);
						articleInfo.put("icon", userQuests.getQuests().getIcon());
						articleInfo.put("type", userQuests.getItemType());
						articleInfo.put("amount", userQuests.getItemAmount());
						articleInfo.put("toolTipInfo", ChangeArticleToToolTip.changeQuestsToToolTip(userQuests));
						attachmentList.add(articleInfo);
						break;

					default:
						throw new AppException("附件物品类型错误");
					}
					
				}else{
					break;
				}
				
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Map<String, Object> retMap = new HashMap<String,Object>();
		retMap.put("cash", mail.getCash());
		retMap.put("items", attachmentList);
		return retMap;
	}
	/**
	 * 获取邮件
	 * @param mail
	 * @throws AppException
	 */
	public void obtainAttachment(Mail mail) throws AppException{
		if(mail.getAttachment1()==0&&mail.getCash()==0){
			throw new AppException("无附件可取");
		}
		UserItemService userItemService = (UserItemService) ServiceLocator.getSpringBean("userItemService");
		if(getAttachmentAmount(mail)>userItemService.getTreasuryRemain(mail.getAddressee())){
			throw new AppException("背包空间不足");
		}
		String getAttachmentName = "getAttachment";
		String getAttachmentTypeName = "getAttachmentType";
		int length = 6;//换常量
		CharacterService characterService = (CharacterService)ServiceLocator.getSpringBean("characterService");
		try {
			for(int i=1;i<=length;i++){//反射获取获得附件的方法
				Method getAttachment = Mail.class.getMethod(getAttachmentName+i);
				Method getAttachmentType = Mail.class.getMethod(getAttachmentTypeName+i);
				int attachment = (Integer)getAttachment.invoke(mail);
				int attachmentType = (Integer)getAttachmentType.invoke(mail);
				if(attachment!=0){//id不为0，更新附件位置
					userItemService.updateArticlePosition(attachment, attachmentType);
					
				}else{
					break;
				}
				
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(mail.getCash()!=0){//增加玩家元宝
			UserCharacter userCharacter = characterService.getCharacterById(mail.getAddressee());
			characterService.updateCash(userCharacter.getId(), userCharacter.getCash()+mail.getCash());
		}
		updateAttachment(mail.getId());//清空邮件附件信息
	}
	public int getAttachmentAmount(Mail mail){
		String getAttachmentName = "getAttachment";
		int length = 6;//换常量
		int amount = 0;
		try{
			
			for(int i=1;i<=length;i++){//反射获取获得附件的方法
				Method getAttachment = Mail.class.getMethod(getAttachmentName+i);
				int attachment = (Integer)getAttachment.invoke(mail);
				if(attachment!=0){//id不为0，更新附件位置
					amount++;
					
				}else{
					break;
				}
				
			}
		} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		return amount;
	}
	
	/**
	 * 设置邮件为已读
	 * @param mailId
	 */
	public void setRead(int mailId){
		mailDao.setRead(mailId);
	}
	/**
	 * 清空邮件附件信息
	 * @param mailId
	 */
	public void updateAttachment(int mailId){
		mailDao.updateAttachment(mailId);
	}
	
//	public List<Map<String,String>> getAddressee(int charId){
//		return characterService.getFriends(charId);
//	}
	
	public MailDao getMailDao() {
		return mailDao;
	}
	public void setMailDao(MailDao mailDao) {
		this.mailDao = mailDao;
	}
//	public static void main(String[] args){
//		Mail mail = new Mail();
//		mail.setAttachment1(1);
//		mail.setAttachment2(4);
//		mail.setAttachment3(7);
//		mail.setAttachment4(4);
//		mail.setAttachment5(0);
//		mail.setAttachment6(6);
//		getAttachment(mail);
//	}

}
