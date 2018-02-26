import { Document } from 'mongoose';

import { SophronisationInterface } from './interfaces/sophronisation';

/**
 * @export
 * @interface SophronisationModelInterface
 * @extends {SophronisationInterface}
 * @extends {Document}
 */
export interface SophronisationModelInterface extends SophronisationInterface, Document {

}
