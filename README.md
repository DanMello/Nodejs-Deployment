# Nodejs-Deployment
## Configuration
The web servers contain the following configurations
### vmware
3 servers were made with vmware, one that runs nginx and two that run the nodejs-app
### SSH Key
The administrator and deploy users have different ssh keys, and password login to the servers have been disabled
### nginx
nginx is installed in another server and is being used as a load-balancer for my two servers
### Deploy User
A deploy user without sudo privileges, which is used to deploy the application
* **~/.bashrc** - Edited to put nvm command at the top of the file, because when you run pm2 deploy production you will run into an error of nvm not found. This happens because of this return statement, so you need to put the nvm command before this
```
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```
### Packages installed in the deploy user
* [nvm](https://github.com/creationix/nvm) - Used to easily install and manage versions of node-js
* [pm2](https://github.com/Unitech/pm2) - Used to pull latest from github and deploy to production across all servers
### Administrator User
The administrator users in the two web servers not the nginx server, were used to configure the following
* **pm2 startup** - If the web servers restarted, the nodejs-app would relaunch as well automatically
* **/etc/ssh/sshd_config** - Changed to disable password login to the server
### Considerations 
Use the full path to pm2 in the ecosystem.config.js file, because if you ever update pm2 you will get an error if you are not using the full path because the location of the global files for your nodejs-app will change
```
'post-deploy' : 'nvm install && npm install && /home/deploy/.nvm/versions/node/v6.11.1/bin/pm2 reload ecosystem.config.js --env production'
```
Also when scaling and adding more servers make sure they are configured the same and place the new servers first in the array inside the ecosystem.config.js, because when you run pm2 deploy production startup, you'll get an error if it runs into a server that has already created the directories. By putting the new servers first you'll be able to create the directories and by the time you get to your current servers you'll still get an error but the directories will at least get created and you'll be ready to move on to pm2 deploy production
```
host : ['new-servers-here', '172.16.60.129', '172.16.60.131']
``` 
