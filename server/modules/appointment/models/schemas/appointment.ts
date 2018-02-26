import { Schema } from 'mongoose';


export let appointmentSchema = new Schema({
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  subject: {
    type: String,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});
