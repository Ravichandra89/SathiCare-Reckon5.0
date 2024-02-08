import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [5, 'Name must be at least 5 characters'],
    lowercase: true,
    trim: true,
  },
  phone_Number: {
    type: Number,
    required: [true, 'Phone number is required'],
    minlength: [10, 'Phone number must be 10 digits long'],
    maxlength: [10, 'Phone number must be 10 digits long'], // Added maxlength
  },
  otp: {
    code: {
      type: Number,
      required: [true, 'OTP code is required'],
    },
    expiry: {
      type: Date,
      required: [true, 'OTP expiry timestamp is required'],
    },
  },
});

userSchema.methods.verify = async function (otp) {
  return this.otp.code === otp;
};

const User_ph = model('USER_PHONE_NUMBER', userSchema); // Moved this line after defining the schema

export default User_ph;
