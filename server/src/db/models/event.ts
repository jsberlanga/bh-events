import mongoose, { Schema } from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  lastname: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    validate: {
      validator: (email: string) => {
        const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
      },
      message: 'Please enter a valid email address',
    },
    required: true,
    unique: true,
  },
  date: {
    type: Schema.Types.Date,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
