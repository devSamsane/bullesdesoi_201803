const util = require('util');
const crypto = require('crypto');
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';

// Promisify fonctions
export const randomBytes = util.promisify(crypto.randomBytes);
export const signJWT = util.promisify(jwt.sign);


/**
 * Méthodes de création des tokens (Jwt et CSRF)
 * et d'extraction du Jwt
 * @export
 * @class SecurityHelper
 */
export class SecurityHelper {

  private static RSA_PRIVATE_KEY = fs.readFileSync('./server/lib/config/sslcerts/key.pem');
  private static RSA_PUBLIC_KEY = fs.readFileSync('./server/lib/config/sslcerts/cert.pem');
  private static SESSION_DURATION = 1000;

  public static async comparePassword(submitPassword: string, userPassword: string) {
    const isPasswordValid: boolean = await argon2.verify(userPassword, submitPassword);
    return isPasswordValid;
  }

  public static async hashPassword(password: string) {
    return await argon2.hash(password);
  }

  // Méthode de création du JWT
  public static async createSessionToken(userId: string) {
    return signJWT({}, this.RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: this.SESSION_DURATION,
      subject: userId
    });
  }

  // Méthode d'extraction du JWT
  public static async decodeJWT(encodedJWT: string) {

    // Récupération du payload
    const payload = await jwt.verify(encodedJWT, this.RSA_PUBLIC_KEY);

    // TODO: Supprimer le console log
    console.log('decoded JWT: ', payload);

    return payload;

  }

  // Méthode de création du token CSRF
  public static async createCsrfToken(sessionToken: string) {
    const hash = await argon2.hash(sessionToken);
    return hash;
  }

}
