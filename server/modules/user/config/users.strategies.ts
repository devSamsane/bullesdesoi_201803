import * as path from 'path';
import * as passport from 'passport';
import * as express from 'express';

import { User, UserModel } from '../models/user';
import { Server } from '../../../lib/app';
import { properties } from '../../../lib/config/index';


module.exports = class StrategiesConfiguration {


  static initStrategiesConfiguration = (app: express.Application) => {

    passport.deserializeUser((id, done) => {
      User.findById({ _id: id }, '-password', (error: Error, user: UserModel) => {
        done(error, user);
      }
      );
    });

    passport.serializeUser<any, any>((user: UserModel, done) => {
      done(undefined, user.id);
    });

    // Initialisation des stratégies
    properties.files.server.strategies.forEach(strategiePath => {
      require(path.resolve(strategiePath))(properties);
    });

    app.use(passport.initialize());
    app.use(passport.session());

  }


};
