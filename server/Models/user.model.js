import { Schema, model, trusted } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [5, 'Name must be at least 5 characters'],
      lowercase: true,
      trim: true,
    },
    email: {
      // Changed to lowercase "email" for consistency
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill in a valid email address',
      ],
    },
    password: {
      // Changed to lowercase "password" for consistency
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'RESCUER'],
      default: 'USER',
    },
    location: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
      required: true,
      length: [10],
    },
    about: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Use function instead of arrow function for proper context binding
userSchema.pre('save', async function (next) {
  // Hash the password only if it's modified or new
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateJWTToken = async function () {
  try {
    return await jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  } catch (error) {
    throw new Error('Error generating JWT token');
  }
};

const User = model('User', userSchema);

export default User;
