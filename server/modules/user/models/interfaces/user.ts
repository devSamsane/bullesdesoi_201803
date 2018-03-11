import { Types } from 'mongoose';

/**
 * Interface User
 * @export
 * @interface UserInterface
 */
export interface User {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phone: string;
  password: string;
  provider: string;
  providerData?: object;
  additionnalProviderData?: object;
  roles: string[];
  created: Date;
  updated?: Date;
  hasResetInProgress: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  status: string[];
  seances?: Types.ObjectId[];
}
