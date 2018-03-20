import mongoose = require('mongoose');
import { Model } from 'mongoose';
import * as chalk from 'chalk';

// import { ModelInterface } from './../interfaces/models.interfaces';

// import { UserInterface } from './../../modules/user/models/interfaces/user';
// import { SeanceInterface } from './../../modules/seance/models/interfaces/seance';

// import { UserModelInterface } from './../../modules/user/models/user';
// import { SeanceModelInterface } from './../../modules/seance/models/seance';

import { userSchema } from './../../modules/user/models/schemas/user';
import { seanceSchema } from './../../modules/seance/models/schemas/seance';
import { sophronisationSchema } from './../../modules/sophronisation/models/schemas/sophronisation';
import { relaxationSchema } from '../../modules/relaxation/models/schemas/relaxation';
import { appointmentSchema } from './../../modules/appointment/models/schemas/appointment';

import { Properties } from '../interfaces/properties.interface';
const properties: Properties = require('../config/index');
import { connection } from 'mongoose';

export class MongooseService {

  // Instance des models
  // private model: ModelInterface;
  // private uri = properties.config.db.uri;
  private uri: string = properties.config.db.uri;

  constructor() {
    // Instance par défaut
    // Initialisation comme un objet vide
    // this.model = Object();
  }

  public loadModels() {
    // tslint:disable-next-line: no-shadowed-variable
    const connection = mongoose.createConnection(this.uri);
    const User = connection.model('User', userSchema);
    const Seance = connection.model('Seance', seanceSchema);
    const Relaxation = connection.model('Relaxation', relaxationSchema);
    const Sophronisation = connection.model('Sophronisation', sophronisationSchema);
    const Appointment = connection.model('Appointment', appointmentSchema);
  }

  public connect(): any {
    return new Promise((resolve, reject) => {
      mongoose.Promise = properties.config.db.promise;
      const mongoOptions = { ...properties.config.db.options };
      // tslint:disable-next-line: strict-type-predicates
      mongoose.connect(this.uri, mongoOptions)
        .then(() => {
          // Activation du mode debug si nécessaire
          mongoose.set('debug', properties.config.db.debug);
          resolve(mongoose);
        })
        .catch(error => {
          console.error(chalk.red('Erreur: Echec de la connection à mongoDB'));
          console.error(error);

        reject(error);
        });
    });

  }

}

// (async () => {
//   // tslint:disable-next-line: no-shadowed-variable prefer-const
//   let connection: mongoose.Connection = mongoose.createConnection(properties.config.db.uri);
//   // tslint:disable: prefer-const
//   let User: mongoose.Model<UserModelInterface> = connection.model<UserModelInterface>('User', userSchema);
//   let Seance: mongoose.Model<SeanceModelInterface> = connection.model<SeanceModelInterface>('Seance', seanceSchema);
//   const u: UserInterface = ({
//     email: 'test@test.com',
//     firstName: 'test',
//     lastName: 'test2',
//     displayName: 'test test2',
//     phone: '066000000',
//     password: 'totototo',
//     provider: 'local',
//     roles: ['user'],
//     created: Date.now(),
//     hasResetInProgress: false,
//     status: 'active'
//   });
//   const s: SeanceInterface = ({
//     user: '5a945a1781f620166fe9dbab',
//     intention: 'intention',
//     rang: 2,
//     created: Date.now(),
//   });
//   await new User(u).save();
//   await new Seance(s).save();
// })();

