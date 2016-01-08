#Craft Boilerplate using Docker-Compose

This is a boilerplate setup that uses Docker-Compose to implement Craft CMS on a basic Nginx Server with Php and Mysql. In addition to this, two seperate containers are used for development task runner purposes (Grunt/Bower/Gulp/etc). The point of this is to allow for a front-end developer to maximize his time by giving him/her a fully functioning Docker set up with proper containerization without having to attempt to configure their own machine. This has been enabled through changing the mounted volumes from vboxf to NFS see [NFS](#NFS). Grunt is enabled by default although, it is easy to implement other task runners.

##Installation

##Usage

##Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License


https://github.com/adlogix/docker-machine-nfs
Use this to mount the Virtual Machine with NFS as opposed to vboxf.

Reference this for reasons of Nginx
http://systemsarchitect.net/2013/03/28/apache2-vs-nginx-for-php-application/
https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations

We have to change the MYSQL Group by Settings due to Craft Version 2.5 not working correctly with these settings with update Mysql Version. When Craft Version 3 is released, then we can revert back these changes as it is no longer needed to change the mysql group by default.  Stored in Craft.cnf

Issue Documented here - https://craftcms.stackexchange.com/questions/12084/getting-this-sql-error-group-by-incompatible-with-sql-mode-only-full-group-by/12473

##Future Improvements

Have Craft Automatically installed and unzipped upon launch of the docker container.

Allow for automatic download of Bootstrap, Foundation, / choice of front end frameworks.

Look into how to run a script upon git download.

##Known Issues


##Notes

### NFS

It is highly recommended that you change the mounted volumes to NFS. You can read more about why this is important here: But, in a nutshell, this drastically increases the speed by which the volume syncing occurs. Without NFS the mount will take significantly longer. A easy way to change Docker-Machine to NFS mounted Volumes see this Repo: . For a full explanation see my local development set up here: .

https://github.com/codekitchen/dinghy

I use Grunt for my own personal use. If you follow my tutorial, this is likely something that you will be using as well. I have kept it outside of the idea of Docker Containerization, because I do not think that it is right to force a developer into a use of helper tools. That is, if you are developing a project in a group, you should add your grunt files to the git ignore, therefore the other developers are free to use tools that they may be more familiar with (ie gulp) This follows the idea that if it works on the server, then however you get the end files there is up to you, we shouldn't be forcing developers into standard tools but instead let them choose how they get the code where it needs to be.
