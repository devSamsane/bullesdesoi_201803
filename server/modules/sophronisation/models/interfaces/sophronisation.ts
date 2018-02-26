import { Types } from 'mongoose';

/**
 * Interface Sophronisation
 * @export
 * @interface SophronisationInterface
 */
export interface SophronisationInterface {
  user: Types.ObjectId;
  seance: Types.ObjectId;
  description: string;
  intention: string;
  type: string[];
  name: string;
  created: Date;
  updated: Date;
}
