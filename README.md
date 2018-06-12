
ember-cli-deploy-ftp
==============================================================================

[ember-cli-deploy](http://ember-cli-deploy.github.io/ember-cli-deploy/)
wrapper for [ftp-deploy](https://github.com/rickbergfalk/ftp-deploy)


Installation
------------------------------------------------------------------------------

```
npm install ember-cli-deploy-ftp
```


Usage
------------------------------------------------------------------------------

Add e.g. the following snippet to your `config/deploy.js` file:
 
```js
ENV.ftp = {
  host: 'ftp.your-server.com',
  username: 'johndoe',
  password: process.env.FTP_PASSWORD,
};
```

### Options

- `host` – __required__: FTP host name or IP address
- `port` – __optional__: FTP server port (default: `21`)
- `username` – __optional__: FTP username (default: `anonymous`)
- `password` – __optional__: FTP password (default: `anonymous`)
- `remoteRoot` – __optional__: deploy target folder on the FTP server (default: `/`)
- `include` – __optional__: included files (default: `['*', '**/*']`)
- `exclude` – __optional__: excluded files (default: `[]`)


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
