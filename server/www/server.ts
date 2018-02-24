const chalk = require('chalk');
// import * as chalk from 'chalk';

import { properties } from './../config/helpers/app-properties';
import { Server } from './../config/app';

const app = Server.bootstrap().app;

const port = properties.server.port;
const host = properties.server.host;
const env = properties.env;
let isEnvEqual = false;

if (env !== process.env.NODE_ENV) {
  throw new Error ('Erreur de configuration environnement');
} else {
  isEnvEqual = true;
}

app.listen(port, host, () => {
  const server = `http://${host}:${port}`;

  console.log(chalk.white('---'));
  console.log(chalk.magenta(`Application:    ${properties.app.title}`));
  console.log(chalk.magenta(`Version:        ${properties.app.version}`));
  console.log();
  console.log(chalk.green(`Environnement:  ${process.env.NODE_ENV}`));
  console.log(chalk.green(`Equivalence:    ${isEnvEqual}`));
  console.log(chalk.green(`Serveur:        ${server}`));
  console.log(chalk.white('---'));
});
