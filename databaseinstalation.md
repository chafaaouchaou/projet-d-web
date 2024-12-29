connect as root
CREATE DATABASE cruciweb;
CREATE USER 'cruciwebuser'@'localhost' IDENTIFIED BY 'Fleshed7-Starring0-Catalyst5-Lining0-Enduring3';
GRANT ALL PRIVILEGES ON cruciweb.* TO 'cruciwebuser'@'localhost' 
FLUSH PRIVILEGES;

mysql -u cruciwebuser -p 
password = Fleshed7-Starring0-Catalyst5-Lining0-Enduring3
USE cruciweb;

SOURCE C:/Apache24/htdocs/projet-d-web/projet.sql;

SHOW TABLES;




