'use strict';

const BasePlugin = require('ember-cli-deploy-plugin');
const FtpDeploy = require('ftp-deploy');

module.exports = {
  name: 'ember-cli-deploy-ftp',

  createDeployPlugin(options) {
    let DeployPlugin = BasePlugin.extend({
      name: options.name,

      requiredConfig: ['host'],

      defaultConfig: {
        port: 21,
        username: 'anonymous',
        password: 'anonymous',
        remoteRoot: '/',
        include: ['*', '**/*'],
        exclude: [],
        sftp: false
      },

      async upload(context) {
        let ftpDeploy = new FtpDeploy();

        let config = {
          host: this.readConfig('host'),
          port: this.readConfig('port'),
          user: this.readConfig('username'),
          password: this.readConfig('password'),
          localRoot: context.distDir,
          remoteRoot: this.readConfig('remoteRoot'),
          include: this.readConfig('include'),
          exclude: this.readConfig('exclude'),
          sftp: this.readConfig('sftp')
        };

        this.log(
          `preparing to upload to ${config.sftp ? 'sftp' : 'ftp'}://${
            config.user
          }@${config.host}${config.remoteRoot}`,
          {
            verbose: true,
          }
        );

        ftpDeploy.on('uploading', (data) => {
          this.log('uploading file `' + data.filename + '`', { verbose: true });
        });

        await ftpDeploy.deploy(config);

        this.log('upload complete', { verbose: true });
      },
    });

    return new DeployPlugin();
  },
};
