import { Document } from 'mongoose';

import { SeanceInterface } from './interfaces/seance';

/**
 * Interface du model Seance pour la collection seances
 * @export
 * @interface SeanceModelInterface
 * @extends {SeanceInterface}
 * @extends {Document}
 */
export interface SeanceModelInterface extends SeanceInterface, Document {

}
