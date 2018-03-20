import { User, UserModel } from '../models/user';

import { SecurityHelper } from '../../../lib/helpers/security.helper';

export class UserService {

  /**
   *
   *
   * @static
   * @param {UserModel} userData
   * @returns
   * @memberof UserService
   */
  static storeUser(userData: UserModel) {
    const user: UserModel = new User(userData);
    return user.save();
  }

  /**
   *
   *
   * @static
   * @param {string} id
   * @returns
   * @memberof UserService
   */
  static getUserById(id: string) {
    return User.findById({ _id: String(id) }).exec();
  }

  /**
   *
   *
   * @static
   * @param {string} email
   * @returns
   * @memberof UserService
   */
  static getUserByEmail(email: string) {
    return User.findOne({ email: String(email) }).exec();
  }

  /**
   *
   *
   * @static
   * @param {UserModel} userToStore
   * @returns
   * @memberof UserService
   */
  static async signup(userToStore: UserModel) {
    userToStore.provider = 'local';
    userToStore.displayName = `${userToStore.firstName}, ${userToStore.lastName}`;

    if (userToStore.password) {
      console.log('password', userToStore);
      userToStore.password = await SecurityHelper.hashPassword(userToStore.password);
    }

    const user: UserModel = await this.storeUser(userToStore);

    user.password = '';
    return Promise.resolve(user);
  }


}
