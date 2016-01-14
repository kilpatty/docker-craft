#Craft Boilerplate using Docker-Compose

This is a boilerplate setup that uses Docker-Compose to implement Craft CMS on a basic Nginx Server with Php and Mysql. In addition to this, two separate containers are used for development task runner purposes (Grunt/Bower/Gulp/etc). The point of this is to allow for a front-end developer to maximize his time by giving him/her a fully functioning Docker set up with proper containerization without having to attempt to configure their own machine. This has been enabled through changing the mounted volumes from vboxf to NFS see [NFS](#nfs). Grunt is enabled by default although, it is easy to implement other task runners see [Grunt](#grunt)

##Installation
Clone the Project into a new folder to begin setup

    $ git clone https://github.com/Skilgarriff/docker-craft newProject

Open up the 'docker-compose.yml' file and enter in a username and password for the mysql environment variables.

Open up /vendors/craft/db.php and change the 'database', 'user', 'password' variables to those you created in the last step.

##Usage
In order to use this project, you must have Docker, Docker-compose, and Docker-Machine installed. This can be done using the [Docker Toolbox](https://www.docker.com/docker-toolbox). There are more tools that help ease the use of this project, as well as make it more effective. To see a full setup visit [here](http://www.seankilgarriff.com/blog/docker).

To use this boilerplate, first build the docker containers from inside the directory of the project.

    $ docker-compose build

Next, run the containers.

    $ docker-compose up -d

Connect to the ip of the docker-machine, and then point your browser to the admin panel to begin the craft installation.

    'docker.machine.ip.address/admin'

Follow the on screen instructions, and once completed your containers should have Craft fully installed. For a comprehensive tutorial see [this tutorial](http://www.SeanKilgarriff.com/blog/docker-craft). For Craft installation clarification see the official [Craft Documentation](https://craftcms.com/docs/installing)

##Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


##Future Improvements

Have Craft Automatically installed and unzipped upon launch of the docker container.

Allow for automatic download of Bootstrap, Foundation, / choice of front end frameworks.

Automatic script run at Github clone that installs everything.

Add php.ini

##Notes

###Craft
https://github.com/imjakechapman/CraftCMS-Boilerplate
http://beliefagency.com/blog/beliefs-craftcms-boilerplate

### NFS

It is highly recommended that you change the mounted volumes to NFS. This drastically increases the speed by which the voluming syncing occurs. Without NFS, the mount will take significantly longer and slow the development process. There are currently two recommended ways to change the volumes to NFS. The first is this project which can switch a current docker-machine setup. The repository for that project is [here](https://github.com/adlogix/docker-machine-nfs).

The second recommended method is to use [Dinghy](https://github.com/codekitchen/dinghy)
Both methods will achieve NFS voluming syncing, thus it is up to you to decide which you prefer.

### Grunt

TODO: Enter basic Grunt configuration and show how to customize it.

### Nginx

Nginx is used as the server as opposed to Apache2. Discussion surrounding this can be read [here](http://systemsarchitect.net/2013/03/28/apache2-vs-nginx-for-php-application/
) and [here](https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations).
A basic Nginx server configuration has been used for this project. To further customize this configuration, edit the file named 'default.conf' in /compose/nginx.

### MYSQL

We had to change the MYSQL 'Group by' settings due to Craft version 2.5 not working correctly with these settings with an updated Mysql version. When Craft Version 3 is released, then we can revert back these changes as it is no longer needed to change the mysql group by default. This change to the Mysql configuration is stored in Craft.cnf.

Issue Documented [here](https://craftcms.stackexchange.com/questions/12084/getting-this-sql-error-group-by-incompatible-with-sql-mode-only-full-group-by/12473)

## License

The code is available under the [MIT License](/LICENSE).
