#Boa:Frame:Frame1

import wx
import wx.richtext
from MyMail import MyMail
import os
def create(parent):
    return Frame1(parent)

[wxID_FRAME1, wxID_FRAME1BUTTON1, wxID_FRAME1BUTTON2, wxID_FRAME1CONTENT, 
 wxID_FRAME1PANEL1, wxID_FRAME1PASSWD, wxID_FRAME1RICHTEXTCTRL1, 
 wxID_FRAME1STATICTEXT1, wxID_FRAME1STATICTEXT2, wxID_FRAME1STATICTEXT3, 
 wxID_FRAME1STATICTEXT4, wxID_FRAME1STATICTEXT5, wxID_FRAME1SUBJECT, 
 wxID_FRAME1TO, wxID_FRAME1USER, 
] = [wx.NewId() for _init_ctrls in range(15)]

class Frame1(wx.Frame):
    
    attachment = [] 
    
    def _init_ctrls(self, prnt):
        # generated method, don't edit
        wx.Frame.__init__(self, id=wxID_FRAME1, name='', parent=prnt,
              pos=wx.Point(425, 207), size=wx.Size(815, 582),
              style=wx.DEFAULT_FRAME_STYLE, title='Frame1')
        self.SetClientSize(wx.Size(799, 544))

        self.panel1 = wx.Panel(id=wxID_FRAME1PANEL1, name='panel1', parent=self,
              pos=wx.Point(0, 0), size=wx.Size(799, 544),
              style=wx.TAB_TRAVERSAL)

        self.staticText1 = wx.StaticText(id=wxID_FRAME1STATICTEXT1,
              label='user', name='staticText1', parent=self.panel1,
              pos=wx.Point(48, 24), size=wx.Size(62, 14), style=0)

        self.staticText2 = wx.StaticText(id=wxID_FRAME1STATICTEXT2,
              label='passwd', name='staticText2', parent=self.panel1,
              pos=wx.Point(272, 24), size=wx.Size(62, 14), style=0)

        self.user = wx.TextCtrl(id=wxID_FRAME1USER, name='textCtrl1',
              parent=self.panel1, pos=wx.Point(104, 24), size=wx.Size(100, 22),
              style=0, value='')

        self.passwd = wx.TextCtrl(id=wxID_FRAME1PASSWD, name='textCtrl2',
              parent=self.panel1, pos=wx.Point(352, 24), size=wx.Size(100, 22),
              style=0, value='')

        self.staticText3 = wx.StaticText(id=wxID_FRAME1STATICTEXT3, label='to',
              name='staticText3', parent=self.panel1, pos=wx.Point(40, 64),
              size=wx.Size(62, 14), style=0)

        self.to = wx.TextCtrl(id=wxID_FRAME1TO, name='textCtrl3',
              parent=self.panel1, pos=wx.Point(104, 64), size=wx.Size(100, 22),
              style=0, value='')

        self.staticText4 = wx.StaticText(id=wxID_FRAME1STATICTEXT4,
              label='subject', name='staticText4', parent=self.panel1,
              pos=wx.Point(32, 104), size=wx.Size(62, 14), style=0)

        self.subject = wx.TextCtrl(id=wxID_FRAME1SUBJECT, name='textCtrl4',
              parent=self.panel1, pos=wx.Point(104, 104), size=wx.Size(100, 22),
              style=0, value='')

        self.content = wx.richtext.RichTextCtrl(id=wxID_FRAME1CONTENT,
              parent=self.panel1, pos=wx.Point(104, 360), size=wx.Size(200,
              100), style=wx.richtext.RE_MULTILINE, value='')

        self.staticText5 = wx.StaticText(id=wxID_FRAME1STATICTEXT5,
              label='content', name='staticText5', parent=self.panel1,
              pos=wx.Point(32, 360), size=wx.Size(62, 14), style=0)

        self.button1 = wx.Button(id=wxID_FRAME1BUTTON1, label='send',
              name='button1', parent=self.panel1, pos=wx.Point(608, 264),
              size=wx.Size(75, 24), style=0)
        self.button1.Bind(wx.EVT_BUTTON, self.OnButton1Button,
              id=wxID_FRAME1BUTTON1)

        self.button2 = wx.Button(id=wxID_FRAME1BUTTON2, label='button2',
              name='button2', parent=self.panel1, pos=wx.Point(24, 168),
              size=wx.Size(72, 24), style=0)
        self.button2.Bind(wx.EVT_BUTTON, self.OnButton2Button,
              id=wxID_FRAME1BUTTON2)

        self.richTextCtrl1 = wx.richtext.RichTextCtrl(id=wxID_FRAME1RICHTEXTCTRL1,
              parent=self.panel1, pos=wx.Point(104, 168), size=wx.Size(200, 56),
              style=wx.richtext.RE_MULTILINE, value='')

    def __init__(self, parent):
        self._init_ctrls(parent)

    def OnButton1Button(self, event):
        print 'user='+self.user.Value
        print 'passwd='+self.passwd.Value
        print 'to='+self.to.Value
        print 'subject='+self.subject.Value
        print 'content='+self.content.Value
        print 'attachment'+self.attachment[0]
        user = self.user.Value
        passwd = self.passwd.Value
        to = self.to.Value.split(",")
        subject = self.subject.Value
        content = self.content.Value
        attachment = self.attachment
        
        myMail = MyMail()
        myMail.setMsg(user, passwd, to, subject, content, attachment)
        myMail.send()
        event.Skip()

    def OnButton2Button(self, event):
        wildcard = "All files (*.*)|*.*"
        dialog = wx.FileDialog(None, "Choose a file", os.getcwd(),"", wildcard, wx.OPEN)
        if dialog.ShowModal() == wx.ID_OK:
            path = dialog.GetPath()
            self.attachment.append(path)
            attachmentpath = ""
            for x in range(len(self.attachment)):
                attachmentpath += self.attachment[x]+'\n'
                print attachmentpath
            self.richTextCtrl1.Value = attachmentpath
            
        dialog.Destroy()
        event.Skip()
    def getAttachementName(self ):
        name = ""
        if self.attachment is not None:
            size = len(self.attachment)
            att = self.attachment
            for x in range(size):
                name = name+att[x]
        return name
            
