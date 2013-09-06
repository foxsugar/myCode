package com.crystalcg.gamedev.mail.mapper;

import java.util.List;
import java.util.Map;

import com.crystalcg.gamedev.mail.domain.Mail;

public interface MailMapper {
	/**
	 * 发信
	 * @param mail
	 */
	void sendMail(Mail mail);
	/**
	 * 获取邮件数量
	 * @param charId
	 * @return
	 */
	int getCount(Map<String, Object> param);
	/**
	 * 获取邮件清单
	 * @param charId
	 * @return
	 */
	List<Map<String,Object>> getMailList(Map<String, Object> param);
	/**
	 * 删除邮件
	 * @param param
	 */
	void deleteMail(Map<String, Object> param);
	/**
	 * 获取邮件详情
	 * @param param
	 * @return
	 */
	Mail getMailDetail(Map<String, Object> param);
	/**
	 * 设置邮件为已读
	 * @param mailId
	 */
	void setRead(int mailId);
	/**
	 * 清空邮件附件
	 * @param mailId
	 */
	void updateAttachment(int mailId);
}
