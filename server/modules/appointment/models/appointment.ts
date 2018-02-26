import { Document } from 'mongoose';
import { AppointmentInterface } from './interfaces/appointment';

export interface AppointmentModelInterface extends AppointmentInterface, Document {

}
