var MailFunction = {};

/**
 * 收件箱获取邮件列表
 */
MailFunction.getMailList = function(page,readStatus,callBack){
	$.ajaxPost('getMailList',{page:page,readStatus:readStatus},callBack);
};
/**
 * 发送邮件
 */
MailFunction.sendMail = function(addresseeName, title, content,callBack){
	$.ajaxPost('sendMail',{addresseeName:addresseeName, title:title, content:content},callBack);
};

/**
 * 获取邮件详情
 */
 MailFunction.getMailDetail = function(mailId,callBack){
	$.ajaxPost('getMailDetail',{mailId:mailId},callBack);
};
/**
 * 删除邮件
 */
MailFunction.deleteMail = function(mailIds,page,readStatus,callBack){
	$.ajaxPost('deleteMail',{mailIds:mailIds,page:page,readStatus:readStatus},callBack);
};
/**
 * 获取邮件附件
 */
MailFunction.obtainAttachment = function(mailId,callBack){
	$.ajaxPost('obtainAttachment',{mailId:mailId},callBack);
};