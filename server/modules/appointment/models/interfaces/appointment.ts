import { Types } from 'mongoose';


export interface AppointmentInterface {
  startDateTime: Date;
  endDateTime: Date;
  isConfirmed: boolean;
  subject?: string;
  user: Types.ObjectId;
}
