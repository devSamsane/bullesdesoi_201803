const chalk = require('chalk');
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
const properties: Properties = require('./server/lib/config/index');

import { Server } from './server/lib/app';
import { Properties } from './server/lib/interfaces/properties.interface';

const app = Server.bootstrap().app;

const port: number = properties.server.port;
const host: string = properties.server.host;
const env: string = properties.env;
let isEnvEqual = false;
const secure: boolean = properties.server.secure.ssl;

if (env !== process.env.NODE_ENV) {
  throw new Error ('Erreur de configuration environnement');
} else {
  isEnvEqual = true;
}

// app.listen(port, host, () => {
//   const server = (secure ? 'https://' : 'http://') + host + ':' + port;
//   // const server = `http://${host}:${port}`;

//   console.log(chalk.white('---'));
//   console.log(chalk.magenta(`Application:    ${properties.app.title}`));
//   console.log(chalk.magenta(`Version:        ${properties.app.version}`));
//   console.log();
//   console.log(chalk.green(`Environnement:  ${process.env.NODE_ENV}`));
//   console.log(chalk.green(`Equivalence:    ${isEnvEqual}`));
//   console.log(chalk.green(`Serveur:        ${server}`));
//   console.log(chalk.green(`Database:       ${properties.config.db.uri}`));
//   console.log(chalk.white('---'));
// });

if (secure) {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync('./server/lib/config/sslcerts/key.pem'),
      cert: fs.readFileSync('./server/lib/config/sslcerts/cert.pem')
    },
    app
  );

  // launch an HTTPS Server. Note: this does NOT mean that the application is secure
  httpsServer.listen(3000, () =>
    console.log(
      'HTTPS Secure Server running at https://localhost:' +
        httpsServer.address().port
    )
  );
} else {
  // launch an HTTP Server
  const httpServer = app.listen(3000, () => {
    console.log(
      'HTTP Server running at https://localhost:' + httpServer.address().port
    );
  });
}
