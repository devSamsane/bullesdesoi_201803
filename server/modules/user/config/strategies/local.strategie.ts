import * as passport from 'passport';
import * as passportLocal from 'passport-local';

import { User, UserModel } from '../../models/user';
import { SecurityHelper } from '../../../../lib/helpers/security.helper';

const LocalStrategy = passportLocal.Strategy;




  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (error: Error, user: UserModel) => {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(undefined, false, { message: 'Utilisateur non trouvé' });
      }
      SecurityHelper.comparePassword(user.password, password)
        .then(isValid => {
          if (isValid) {
            return done(undefined, user);
          }
          return done(undefined, false, { message: 'email ou mot de passe invalide(s)' });
        })
        .catch((err: Error) => {
          return done(err);
        });
    });
    }
  ));



