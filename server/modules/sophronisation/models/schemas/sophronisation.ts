import { Schema } from 'mongoose';

export let sophronisationSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  intention: {
    type: String,
    required: true
  },
  type: {
    type: [{
      type: String,
      enum: ['présentation', 'futurisation', 'prétérisation', 'totalisation']
    }],
    required: true
  },
  name: {
    type: String,
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  seance: {
    type: Schema.Types.ObjectId,
    ref: 'Seance'
  }

});
