/* jshint node: true */
'use strict';

var BasePlugin = require('ember-cli-deploy-plugin');
var FtpDeploy = require('ftp-deploy');
var RSVP = require('rsvp');

module.exports = {
  name: 'ember-cli-deploy-ftp',

  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,

      requiredConfig: ['host'],

      defaultConfig: {
        port: 21,
        username: 'anonymous',
        password: 'anonymous',
        remoteRoot: '/',
      },

      upload: function(context) {
        var self = this;

        var ftpDeploy = new FtpDeploy();
        var deploy = RSVP.denodeify(ftpDeploy.deploy.bind(ftpDeploy));

        var host = this.readConfig('host');

        var config = {
          host: host,
          port: this.readConfig('port'),
          username: this.readConfig('username'),
          password: this.readConfig('password'),
          localRoot: context.distDir,
          remoteRoot: this.readConfig('remoteRoot'),
        };

        this.log('preparing to upload to FTP host `' + host + '`', { verbose: true });

        return deploy(config).then(function() {
          self.log('upload complete', { verbose: true });
        });
      },
    });

    return new DeployPlugin();
  }
};
