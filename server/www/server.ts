import { Server } from './../config/app';
import * as properties from '../config/properties/dev.properties';

const app = Server.bootstrap().app;

app.listen(properties.SERVER_PORT, properties.SERVER_HOST, () => {
  const server = `http://${properties.SERVER_HOST}:${properties.SERVER_PORT}`;

  console.log('---');
  console.log(properties.APP_TITLE);
  console.log();
  console.log(`Environnement:    ${process.env.NODE_ENV}`);
  console.log(`Serveur:          ${server}`);

  console.log('---');
});
