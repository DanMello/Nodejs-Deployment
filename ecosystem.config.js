module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'nodejs-app',
      script    : 'app.js',
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'deploy', 
      host : ['172.16.60.129', '172.16.60.131'],  // This is a local vmware server with an ssh authorized key and no password
      ref  : 'origin/master',
      repo : 'git@github.com:DanMello/first-nodejs-app-deployment.git',
      path : '/home/deploy/web/nodejs-app-production', 
      'post-deploy' : 'nvm install && npm install && /home/deploy/.nvm/versions/node/v6.11.1/bin/pm2 reload ecosystem.config.js --env production'
    }
  }
};