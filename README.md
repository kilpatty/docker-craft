#Craft Boilerplate using Docker-Compose

This is a boilerplate setup that uses Docker-Compose to implement Craft CMS on a basic Nginx Server with Php and Mysql. In addition to this, two separate containers are used for development task runner purposes (Grunt/Bower/Gulp/etc). The point of this is to allow for a front-end developer to maximize his time by giving him/her a fully functioning Docker set up with proper containerization without having to attempt to configure their own machine. This has been enabled through changing the mounted volumes from vboxf to NFS see [NFS](#nfs). Grunt is enabled by default although, it is easy to implement other task runners see [Grunt](#grunt)

##Installation
First create a new folder which the new project will be started.

    $ mkdir newProject

Move into that folder, and then clone the git into that folder.

    $ cd newProject
    $ git clone https://github.com/Skilgarriff/docker-craft

##Usage
In order to use this project, you must have Docker, Docker-compose, and Docker-Machine installed. This can be done using the [Docker Toolbox](https://www.docker.com/docker-toolbox). To see my full set up, see my tutorial [here](http://www.seankilgarriff.com/blog/docker).

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

## License

The MIT License (MIT)

Copyright (c) [2016] [Sean Kilgarriff]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

##Future Improvements

TODO: Add .gitignore

Have Craft Automatically installed and unzipped upon launch of the docker container.

Allow for automatic download of Bootstrap, Foundation, / choice of front end frameworks.

Look into how to run a script upon git download.

##Known Issues


##Notes

### NFS

It is highly recommended that you change the mounted volumes to NFS. You can read more about why this is important here: But, in a nutshell, this drastically increases the speed by which the volume syncing occurs. Without NFS the mount will take significantly longer. A easy way to change Docker-Machine to NFS mounted Volumes see this Repo: . For a full explanation see my local development set up here: .

https://github.com/codekitchen/dinghy

https://github.com/adlogix/docker-machine-nfs
Use this to mount the Virtual Machine with NFS as opposed to vboxf.

I use Grunt for my own personal use. If you follow my tutorial, this is likely something that you will be using as well. I have kept it outside of the idea of Docker Containerization, because I do not think that it is right to force a developer into a use of helper tools. That is, if you are developing a project in a group, you should add your grunt files to the git ignore, therefore the other developers are free to use tools that they may be more familiar with (ie gulp) This follows the idea that if it works on the server, then however you get the end files there is up to you, we shouldn't be forcing developers into standard tools but instead let them choose how they get the code where it needs to be.

Reference this for reasons of Nginx
http://systemsarchitect.net/2013/03/28/apache2-vs-nginx-for-php-application/
https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations

We have to change the MYSQL Group by Settings due to Craft Version 2.5 not working correctly with these settings with update Mysql Version. When Craft Version 3 is released, then we can revert back these changes as it is no longer needed to change the mysql group by default.  Stored in Craft.cnf

Issue Documented here - https://craftcms.stackexchange.com/questions/12084/getting-this-sql-error-group-by-incompatible-with-sql-mode-only-full-group-by/12473
