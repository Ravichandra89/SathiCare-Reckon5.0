import { Schema, model } from 'mongoose';

const ticketSchema = new Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  severity: {
    type: String,
    enum: ['High', 'Moderate', 'Normal', 'None'],
    default: 'None',
  },
  pictures: [
    {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Pending'],
    default: 'Open',
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number, // Define the longitude field as type Number
    required: true,
  },
  latitude: {
    type: Number, // Define the latitude field as type Number
    required: true,
  },
});

const Ticket = model('Ticket', ticketSchema);

export default Ticket;
