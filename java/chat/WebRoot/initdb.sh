
cp -f assets/conf/*.xml /usr/local/tomcat/conf/Catalina/localhost

mysql -u root --default-character=utf8 < assets/dbscripts/createdb.sql
mysql -u root --default-character=utf8 < assets/dbscripts/chatlog.sql
