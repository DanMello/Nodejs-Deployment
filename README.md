# first-nodejs-app-deployment
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