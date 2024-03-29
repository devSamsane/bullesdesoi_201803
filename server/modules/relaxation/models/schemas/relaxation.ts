import { Schema } from 'mongoose';

export let relaxationSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  seance: {
    type: Schema.Types.ObjectId,
    ref: 'Seance'
  },
  intitule: {
    type: String,
    required: true
  },
  intention: {
    type: String,
    required: true
  },
  consigne: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated: {
    type: Date
  }
});
