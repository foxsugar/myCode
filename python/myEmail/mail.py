#coding=utf-8
#-*- coding: utf-8 -*-
'''
Created on Jan 21, 2013

@author: Administrator
'''

import smtplib,mimetypes
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.MIMEMultipart import MIMEMultipart  
from email.MIMEBase import MIMEBase  
from email.MIMEText import MIMEText  
from email.MIMEAudio import MIMEAudio  
from email.MIMEImage import MIMEImage  
from email.Encoders import encode_base64 
import os


msg = MIMEMultipart()
msg.set_charset('UTF-8')
msg['from'] = 'redalert3@126.com'
msg['to'] = 'sunxianping@kongzhong.com'
msg['Subject'] = '测试邮箱主题' #邮件主题


def getAttachment(filePath):
    contentType,encoding = mimetypes.guess_type(filePath)
    if contentType is None or encoding is not None:
        contentType = 'application/octet-stream'
    mainType, subType = contentType.split('/', 1)  
    file = open(filePath, 'rb')  
    if mainType == 'text':  
        print 'is text'
        attachment = MIMEText(file.read())  
#   elif mainType == 'message':  
#        attachment = email.message_from_file(file)  
    elif mainType == 'image':  
        attachment = MIMEImage(file.read(),_subType=subType)  
    elif mainType == 'audio':  
        attachment = MIMEAudio(file.read(),_subType=subType)  
    else:  
        attachment = MIMEBase(mainType, subType)
        #给没有类型的进行编码   
        attachment.set_payload(file.read())  
        encode_base64(attachment)  
  
    file.close() 
    attachment.add_header('Content-Disposition', 'attachment',filename=os.path.basename(filePath))  
    return attachment
        
#纯文本内容
text = MIMEText('测试邮件内容',_charset="utf-8")
msg.attach(text)

#图片附件
image = MIMEImage(open('d://b.jpg','rb').read())
msg.attach(image)



msg.attach(getAttachment('d://cn111.csv'))



def send():
    smtp = smtplib.SMTP()
    smtp.connect("smtp.126.com","25")
    smtp.login('redalert3','ilovejava,./')
    smtp.sendmail(msg['from'],msg['to'],msg.as_string())
    smtp.quit()

if __name__=="__main__":
    send()
    print 'ok'