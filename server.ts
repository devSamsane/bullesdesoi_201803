import app from './server/lib/app';
import { config } from './server/config/config';

// tslint:disable-next-line
const server = app.listen(config.port, config.host, (error) => {
  const defServer = `http://${config.host}:${config.port}`;
  if (error) {
    return console.log(error);
  }
  // TODO: Retirer le console.log(config)
  console.log(config);
  console.log('---');
  console.log(config.app.title);
  console.log();
  console.log(`Environnement: ${process.env.NODE_ENV}`);
  console.log(`Server:        ${defServer}`);
  console.log('---');
});

export default server;
