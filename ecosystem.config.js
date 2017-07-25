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
      key  : '/home/dan/web/nodejs-apps/first-nodejs-app-deployment/ssh/id_rsa_first-nodeapp',
      user : 'deploy',
      host : '172.16.60.129',  // This is a local vmware server
      ref  : 'origin/master',
      repo : 'https://github.com/DanMello/first-nodejs-app-deployment.git',
      path : '/home/deploy/web/nodejs-app-production',
      'post-deploy' : 'nvm install && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
