import { Schema } from 'mongoose';

export let seanceSchema: Schema = new Schema ({
  intention: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  rang: {
    type: Number,
    default: '1',
    required: true
  },
  updated: {
    type: Date
  }

});
