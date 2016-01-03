This is a project to develop a Craft CMS on Docker using Containerazation with Docker-Compose


Reference this for reasons of Nginx
http://systemsarchitect.net/2013/03/28/apache2-vs-nginx-for-php-application/

We have to change the MYSQL Group by Settings due to Craft Version 2.5 not working correctly with these settings with update Mysql Version. When Craft Version 3 is released, then we can revert back these changes as it is no longer needed to change the mysql group by default.  Stored in Craft.cnf

Issue Documented here - https://craftcms.stackexchange.com/questions/12084/getting-this-sql-error-group-by-incompatible-with-sql-mode-only-full-group-by/12473
