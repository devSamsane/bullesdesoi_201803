import { Model } from 'mongoose';
import { UserModelInterface } from '../../modules/user/models/user';

/**
 * Interface Model servant d'interface à tous les models de l'application
 * @export
 * @interface ModelsInterface
 */
export interface ModelInterface {
  // Déclaration de l'interface du model User
  user: Model<UserModelInterface>;
}
