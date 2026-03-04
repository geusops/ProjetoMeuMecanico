CREATE USER 'db_admin'@'localhost' IDENTIFIED BY 'pass123';
## https://dev.mysql.com/doc/refman/8.4/en/create-role.html


grant all on meu_mecanico.* TO 'db_admin'@'localhost';
##https://dev.mysql.com/doc/refman/8.4/en/grant.html
