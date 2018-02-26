import { Document } from 'mongoose';

import { UserInterface } from './interfaces/user';

/**
 * Interface du model User pour la collection users
 * @export
 * @interface UserModelInterface
 * @extends {UserInterface}
 * @extends {Document}
 */
export interface UserModelInterface extends UserInterface, Document {

}
