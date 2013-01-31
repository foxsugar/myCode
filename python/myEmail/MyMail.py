#coding=utf-8
'''
Created on Jan 22, 2013

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
from email.Encoders import encode_base64 
import os

class MyMail:
    user = ''
    passwd = ''
    to = []
    subject = ''
    content = ''
    attachment = []
    
    #根据路径拿到附件
    def getAttachment(self,filePath):
        contentType,encoding = mimetypes.guess_type(filePath)
        if contentType is None or encoding is not None:
            contentType = 'application/octet-stream'
        mainType, subType = contentType.split('/', 1)  
        
        try:
            file = open(filePath, 'rb')  
        except IOError,e:
            print e
            
        if mainType == 'text':  
            attachment = MIMEText(file.read())  
       # elif mainType == 'message':  
       #     attachment = email.message_from_file(file)  
        elif mainType == 'image':  
            attachment = MIMEImage(file.read(),_subType=subType)  
        elif mainType == 'audio':  
            attachment = MIMEAudio(file.read(),_subType=subType)  
        else:  
            attachment = MIMEBase(mainType, subType)
            # 
            attachment.set_payload(file.read())  
            encode_base64(attachment)  
        
        file.close() 
        attachment.add_header('Content-Disposition', 'attachment',filename=os.path.basename(filePath))  
        return attachment
  

    def splitMail(self,mail):
        a = mail.split('@')
        c = a[1].split('.')
        host = 'smtp.'+c[0]+'.com'
        return host
    def login(self,smtp,user,passwd):
        host = self.splitMail(user)
        port = '25'
        smtp.connect(host, port)
        smtp.login(user, passwd)
        
    def sendMail(self,fro,passwd,to,msg):
        smtp = smtplib.SMTP()
        self.login(smtp, fro, passwd)
        smtp.sendmail(msg['from'],msg['to'],msg)
        smtp.quit()
        
    def setMsg(self,user,passwd,to,subject,content,attachment):#attachment is file path
        self.user = user
        self.passwd = passwd
        self.to = to
        self.subject = subject
        self.content = content
        #附件放入list中
        if attachment is not None:
            for x in range(len(attachment)):
                self.attachment.append(self.getAttachment(attachment[x]))

    def send(self):
        
        try:
            smtp = smtplib.SMTP()
            self.login(smtp, self.user, self.passwd)
        except Exception,e:
            print e,"login faild"
        
        msg = MIMEMultipart()
        msg.set_charset('UTF-8')
        msg['from'] = self.user
        msg['Subject'] = self.subject
        #正文不为空
        if self.content is not None:
            content = MIMEText(self.content,_charset='utf-8')
            msg.attach(content)
        #附件不为空
        if self.attachment is not None:
            attachments = self.attachment
            for x in range(len(attachments)):
                msg.attach(attachments[x])
        
        try:
            smtp.sendmail(self.user, self.to, msg.as_string())
        except Exception,e:
            print e,"send faild"
            
        
         
            
    