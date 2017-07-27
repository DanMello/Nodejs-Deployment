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
