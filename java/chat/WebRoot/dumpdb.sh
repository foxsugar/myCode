#!/bin/bash
you1=saol150_chat_jingchu_$(date +%m%d%H%M)
you2=saol150_chat_zhongyuan_$(date +%m%d%H%M)

mysqldump -u root --default-character=utf8 --extended-insert=false --skip-quote chatlog_jingchu > /tmp/saolchat_jingchu_db.sql
mysqldump -u root --default-character=utf8 --extended-insert=false --skip-quote chatlog_zhongyuan > /tmp/saolchat_zhongyuan_db.sql

mv /tmp/saolchat_jingchu_db.sql /usr/saol150
mv /tmp/saolchat_zhongyuan_db.sql /usr/saol150

cd /usr/saol150
tar czvf "$you1".tgz saolchat_jingchu_db.sql
tar czvf "$you2".tgz saolchat_zhongyuan_db.sql

rm saolchat_jingchu_db.sql
rm saolchat_zhongyuan_db.sql
