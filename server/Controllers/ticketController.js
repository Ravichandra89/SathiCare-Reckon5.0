import Ticket from '../Models/ticket.model.js';
import AppError from '../utils/error.util.js';
import cloudinary from 'cloudinary';
import fs from 'fs';
import twilio from 'twilio';

const OTPs = {};

const createTicket = async (req, res, next) => {
  const { category, description, severity, phoneNumber, longitude, latitude, otp } = req.body;

  if (!category || !description || !severity || !phoneNumber || !longitude || !latitude) {
    return next(new AppError('All details are required', 400));
  }

  try {
    const storedOTP = OTPs[phoneNumber];
    if (!storedOTP || storedOTP.toString() !== otp.toString()) {
      return next(new AppError('Invalid OTP', 400));
    }

    delete OTPs[phoneNumber];

    let picturesArray = [];
    if (!req.files || req.files.length === 0) {
      return next(new AppError('At least one photo is required', 400));
    }

    for (const file of req.files) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: 'SathiCare',
        chunk_size: 50000000,
        resource_type: 'image',
      });

      if (result && result.public_id && result.secure_url) {
        picturesArray.push({ public_id: result.public_id, secure_url: result.secure_url });
      } else {
        return next(new AppError('Error uploading photo to cloudinary', 400));
      }

      fs.unlinkSync(file.path);
    }

    const ticket = await Ticket.create({
      category,
      description,
      severity,
      phoneNumber,
      pictures: picturesArray,
      longitude,
      latitude,
    });

    res.status(201).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const sendOTP = async (req, res, next) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    const message = await client.messages.create({
      body: `This is your OTP: ${otpCode}`,
      from: '+19863864770',
      to: '+91' + phoneNumber,
    });

    OTPs[phoneNumber] = otpCode.toString();

    //console.log(`OTP for ${phoneNumber}: ${otpCode}`);

    res.status(200).json({ message: 'OTP sent successfully', OTPs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

const getAllTicket = async (req, res, next) => {
  try {
    const result = await Ticket.find({});
    res.status(200).json({
      status: true,
      message: 'All Tickets',
      result,
    });
  } catch (error) {
    return next(new AppError(error));
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const id = req.params.id;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return next(new AppError('Ticket not found', 404));
    }

    await Ticket.findByIdAndUpdate(id, { status: 'Closed' });

    res.status(200).json({
      status: 'success',
      message: 'Ticket updated successfully',
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export { createTicket, getAllTicket, updateTicket, sendOTP };
