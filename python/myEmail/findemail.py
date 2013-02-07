#-*- coding: utf-8 -*-
'''
Created on Jan 8, 2013

@author: Administrator
'''
import re
import urllib2

def findMailByUrl(url):
    content = urllib2.urlopen(url).read()
    if content is not None:
        return matchEmail(content)
    
def findMailByTxt(fileUrl):
    content = open(fileUrl,"r").read()   
    print content 
    print content.__class__
    if content is not None:
        return matchEmail(content)
    
    
def matchEmail(str):
    if str is not None:
        return re.findall("\w+@\w+\.com", str)
##conunt = re.search("[a-z]\@[0-9]\.com","redalert@123.com").group()
#count = urllib2.urlopen('http://www.iteye.com/').read()
##print count
#file = open("d://mail.txt","r")
#reader = file.read()
##print reader
#
#m= re.search("\w+\@\w+\.com",reader)
#n= re.findall("\w+\@\w+\.com",reader)
#if m is not None:
#    print m.group()
#if n:
#    for i in range(len(n)):
#        print n[i]
    
if __name__ == "__main__":
    print findMailByUrl("http://tieba.baidu.com/p/1294844255")
    print findMailByTxt("d://b.txt")
    
