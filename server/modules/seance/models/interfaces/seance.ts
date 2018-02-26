import { Types } from 'mongoose';
export interface SeanceInterface {
  user: Types.ObjectId;
  intention: string;
  rang: number;
  created: Date;
  updated?: Date;
  relaxations?: Types.ObjectId[];
  sophronisations?: Types.ObjectId[];
}
