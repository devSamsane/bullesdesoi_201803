import mongoose = require('mongoose');
import { Model } from 'mongoose';
import * as chalk from 'chalk';

import { UserInterface } from './../../modules/user/models/interfaces/user';

import { ModelInterface } from './../interfaces/models.interfaces';
import { UserModelInterface } from './../../modules/user/models/user';

import { userSchema } from './../../modules/user/models/schemas/user';

import { properties } from './../config/index';
import { connection } from 'mongoose';

export class MongooseService {

  // Instance des models
  private model: ModelInterface;
  private uri = properties.config.db.uri;

  constructor() {
    // Instance par défaut
    // Initialisation comme un objet vide
    this.model = Object();
  }

  public loadModels() {
    // tslint:disable-next-line: no-shadowed-variable
    const connection = mongoose.createConnection(this.uri);
    const User = connection.model('User', userSchema);

  }

  public connect(): any {
    return new Promise((resolve, reject) => {
      mongoose.Promise = properties.config.db.promise;
      const mongoOptions: any = { ...properties.config.db.options };
      // tslint:disable-next-line: strict-type-predicates use-isnan
      mongoose.connect(this.uri, mongoOptions)
        .then(() => {
          // Activation du mode debug si nécessaire
          mongoose.set('debug', properties.config.db.debug);
        })
        .catch(error => {
          console.error(chalk.red('Erreur: Echec de la connection à mongoDB'));
          console.error(error);

        reject(error);
        });
    });

  }

}

(async () => {
  // tslint:disable-next-line: no-shadowed-variable prefer-const
  let connection: mongoose.Connection = mongoose.createConnection(properties.config.db.uri);
  // tslint:disable-next-line: prefer-const
  let User: mongoose.Model<UserModelInterface> = connection.model<UserModelInterface>('User', userSchema);
  const u: UserInterface = ({
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test2',
    createdAt: new Date()
  });
  await new User(u).save();
})();

