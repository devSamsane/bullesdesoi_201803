import { Schema, Error } from 'mongoose';
import * as argon2 from 'argon2';

export let userSchema: Schema = new Schema({
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true
    },
    lowercase: true,
    trim: true,
    default: '',
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  displayName: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  providerData: {},
  additionnalProviderData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date
  },
  hasResetInProgress: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  status: {
    type: [{
      type: String,
      enum: ['active', 'disabled']
    }],
    default: ['active']
  },
  seances: [{
    type: Schema.Types.ObjectId,
    ref: 'Seance'
  }]
});
