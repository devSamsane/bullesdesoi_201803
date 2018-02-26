import { Schema } from 'mongoose';

export let seanceSchema: Schema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
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
  },
  relaxations: [{
    type: Schema.Types.ObjectId,
    ref: 'Relaxation'
  }],
  sophronisations: [{
    type: Schema.Types.ObjectId,
    ref: 'Sophronisation'
  }]

});
