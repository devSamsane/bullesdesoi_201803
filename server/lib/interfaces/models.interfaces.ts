import { AppointmentModelInterface } from './../../modules/appointment/models/appointment';
import { SophronisationModelInterface } from './../../modules/sophronisation/models/sophronisation';
import { RelaxationModelInterface } from './../../modules/relaxation/models/relaxation';
import { Model } from 'mongoose';
import { UserModelInterface } from '../../modules/user/models/user';
import { SeanceModelInterface } from './../../modules/seance/models/seance';

/**
 * Interface Model servant d'interface à tous les models de l'application
 * @export
 * @interface ModelsInterface
 */
export interface ModelInterface {
  // Déclaration de l'interface du model User
  user: Model<UserModelInterface>;
  seance: Model<SeanceModelInterface>;
  relaxation: Model<RelaxationModelInterface>;
  sophronisation: Model<SophronisationModelInterface>;
  appointment: Model<AppointmentModelInterface>;
}
