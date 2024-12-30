connect as root
CREATE DATABASE projet;
CREATE USER 'projet'@'localhost' IDENTIFIED BY 'tejorp';
GRANT ALL PRIVILEGES ON projet.* TO 'projet'@'localhost' 
FLUSH PRIVILEGES;

mysql -u projet -p 
password = tejorp
USE projet;

SOURCE /var/www/html/projet-d-web/projet.sql

SHOW TABLES;


SOURCE C:\Apache24\htdocs\projet-d-web\projet.sql

