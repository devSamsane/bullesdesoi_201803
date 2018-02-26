import { Schema } from 'mongoose';

export let userSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  lastName: String
});

// TODO: à retirer
userSchema.pre('save', (next) => {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

