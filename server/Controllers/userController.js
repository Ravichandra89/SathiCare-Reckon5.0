import axios from 'axios';
import User from '../Models/user.Model.js';
import User_ph from '../Models/user_ph.model.js';
import AppError from '../utils/error.util.js';

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, role, location, phoneNumber, longitude, latitude, about } = req.body;

    // Validation
    if (!fullName || !email || !password || !location || !phoneNumber) {
      throw new AppError('All fields are required', 400);
    }

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new AppError('User already exists', 400);
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password, // Remember to hash password before saving
      role: role || 'RESCUER', // Set a default role if not provided,
      location,
      longitude,
      latitude,
      about,
      phoneNumber,
    });

    await user.save();

    // Generate JWT token
    const token = await user.generateJWTToken();
    // Set token in cookie
    res.cookie('token', token, cookieOptions);

    user.password = undefined; // Remove password from response
    res.status(201).json({
      status: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      throw new AppError('All fields are required', 400);
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Email or Password does not match', 401);
    }
    await user.save();

    // Generate JWT token
    const token = await user.generateJWTToken();
    // Set token in cookie
    res.cookie('token', token, cookieOptions);

    user.password = undefined; // Remove password from response
    res.status(200).json({
      status: true,
      message: 'User login successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// const login_with_Phone_Number = async (req, res, next) => {
//   try {
//     const { phone_number, otp } = req.body;

//     // Find user by phone number
//     const user = await User_ph.findOne({ phone_number }).select('+otp');

//     // Verify OTP
//     if (await user.verifyOTP(otp)) {
//       // Clear OTP from user document after successful verification
//       await User_ph.findOneAndUpdate({ phone_number }, { $unset: { otp: 1 } });

//       res.status(200).json({
//         status: true,
//         message: 'User login successfully',
//         user,
//       });
//     } else {
//       throw new AppError('Invalid OTP', 401);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export { register, login };
