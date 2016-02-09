#Craft Boilerplate using Docker-Compose

This is a boilerplate setup that uses Docker-Compose to implement Craft CMS on a basic Nginx Server with Php and Mysql. In addition to this, two separate containers are used for development task runner purposes (Grunt/Bower/Gulp/etc). The point of this is to allow for a front-end developer to maximize his time by giving him/her a fully functioning Docker set up with proper containerization without having to attempt to configure their own machine. This has been enabled through changing the mounted volumes from vboxf to NFS see [NFS](#nfs). Gulp is enabled by default although, it is easy to implement other task runners see [Gulp.](#gulp)

##Installation
Clone the Project into a new folder to begin setup

    $ git clone https://github.com/Skilgarriff/docker-craft newProject

Open up the 'docker-compose.yml' file and enter in at least a root password for the mysql environment variables.

Open up /vendors/craft/db.php and change the 'database', 'user', 'password' variables to those you created in the last step.

##Usage
In order to use this project, you must have Docker, Docker-compose, and Docker-Machine installed. This can be done using the [Docker Toolbox](https://www.docker.com/docker-toolbox). There are more tools that help ease the use of this project, as well as make it more effective. To see a full setup visit [here](http://www.seankilgarriff.com/blog/docker).

To use this boilerplate, first build the docker containers from inside the directory of the project.

    $ docker-compose build

Next, run the containers.

    $ docker-compose up -d

Connect to the ip of the docker-machine, and then point your browser to the admin panel to begin the craft installation.

    'docker.machine.ip.address/admin'

Follow the on screen instructions, and once completed your containers should have Craft fully installed.

Upon start up of the containers, the developer container will run the gulp default task. If you wish to run tasks inside that container without the default task, you can either make edits to the entrypoint.sh script, or connect to the container by running:
    $ docker exec -it dev bash


 For a comprehensive tutorial see [this tutorial](http://www.SeanKilgarriff.com/blog/docker-craft). For Craft installation clarification see the official [Craft Documentation](https://craftcms.com/docs/installing)

##Features

###Bourbon, Neat, Bitters with 7-1 Sass.
This project has been built with Bourbon, Neat, Bitters and a 7-1 Sass file structure. Sass is not required to use this project, but these files have been provided to help jumpstart a project with the most customization possible. For further reference, you can investigate Bourbon, Neat, and Bitters: [here](http://bourbon.io/). The 7-1 format and boilerplate code can be found: [here](http://sass-guidelin.es/)

###Browser-Sync
Browser-Sync in this project through the developer container. When gulp watch is executed through gulp default, any changes to sass will automatically be injected into the server running on the nginx container, and any changes to html, images, or javascript will reload the browser window automatically. To connect to the Browser-Sync UI simply connect through port 3001 of whatever ip you would use to connect to docker-machine normally.

### Gulp

Gulp is run through the dev container. This allows for a consistent gulp and npm setup across all members of a team. Upon start up of the container, npm will install all packages listed in the package.json, and then will run gulp default. The container has been created with the name "dev", so that if you need to run commands inside the container it is as simple as:
    $ docker exec -it dev bash

That command then allows you to run separate gulp commands you may have. To optimize Gulp for speed, it is recommended not only to mount your volumes with nfs, but also to customize the mount settings for file watchers. By doing this, I changed my gulp watch response time from around 1 minute to around 50ms. There is currently a pull request to add this feature into the docker-machine-nfs script, so until that is merged you can edit the script yourself. [Reference](https://github.com/adlogix/docker-machine-nfs/pull/38)

##Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


##Notes

###Craft
This Craft setup comes with the bare-minimum required to start up. Some local/production configuration features have been borrowed from other Craft CMS boilerplates. These can both be referenced [here](https://github.com/imjakechapman/CraftCMS-Boilerplate) and [here](http://beliefagency.com/blog/beliefs-craftcms-boilerplate). I would recommend both of these if you are looking to further understand how to customize Craft.

### NFS

It is highly recommended that you change the mounted volumes to NFS. This drastically increases the speed by which the voluming syncing occurs. Without NFS, the mount will take significantly longer and slow the development process. Due to Dinghy not allowing maproot=0 (yet), there are issues running npm with Dinghy. Thus currently only [docker-machine-nfs](https://github.com/adlogix/docker-machine-nfs) can be recommend for mounting volumes with nfs. Further, see the notes on Gulp for increases file watching speed by customizing the docker-machine-nfs script.



## License

The code is available under the [MIT License](/LICENSE).
