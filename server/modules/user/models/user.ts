import mongoose = require('mongoose');
import * as argon2 from 'argon2';
import { Document, Model } from 'mongoose';

import { User as UserInterface } from './interfaces/user';
import { userSchema } from './schemas/user';

export interface UserModel extends UserInterface, Document { }
export interface UserModelStatic extends Model<UserModel> {}



export const User = mongoose.model<UserModel, UserModelStatic>('User', userSchema);
