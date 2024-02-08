import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../Layout/HomeLayout';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createAccount } from '../Redux/Slices/authSlice';

const findCoordinates = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      throw new Error('Address not found');
    }
  } catch (error) {
    console.error('Error finding coordinates:', error);
    return null;
  }
};

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'RESCUER',
    location: '',
    phoneNumber: '',
    about: '',
    longitude: '1223232832',
    latitude: '82738273788',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      // const coordinates = await findCoordinates(signupData.location);

      // if (!coordinates) {
      //   throw new Error('Coordinates not found');
      // }

      // setSignupData({
      //   ...signupData,
      //   latitude: coordinates.latitude,
      //   longitude: coordinates.longitude,
      // });

      const { fullName, email, about, location, phoneNumber, longitude, latitude, password } = signupData;

      if (!fullName || !email || !about || !location || !phoneNumber || !longitude || !latitude || !password) {
        toast.error('Please fill all the details');
        return;
      }

      // console.log(signupData);

      const result = await dispatch(createAccount(signupData));

      console.log(result);

      // if (result) {
      //   toast.success('Account created successfully!');
      //   navigate('/');
      // } else {
      //   toast.error('Failed to create an account. Please try again.');
      // }
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error('Something went wrong! Please try again.');
    }
  };

  return (
    <HomeLayout>
      <div data-theme="dark" className="flex justify-center items-center min-h-screen px-5 py-5">
        <div className=" w-3/4 bg-gray-800 drop-shadow-xl border border-gray-700 rounded-md flex flex-col items-stretch px-8 py-8">
          <div className="mx-auto w-full md:w-3/4 lg:w-1/2 xl:w-2/3 md:p-6 py-6">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-purple-500 mb-4">Create Account</h1>
            <form
              className="mx-auto w-full sm:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col gap-4"
              onSubmit={handleForm}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-lg text-gray-300">
                  Organization Name
                </label>
                <input
                  required
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter Your Organization Name"
                  className="input input-bordered input-primary w-full text-lg placeholder-gray-400"
                  onChange={handleChange}
                  value={signupData.fullName}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-lg text-gray-300">
                  Email
                </label>
                <input
                  required
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  className="input input-bordered input-primary w-full text-lg  placeholder-gray-400"
                  onChange={handleChange}
                  value={signupData.email}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNo" className="text-lg text-gray-300">
                  Phone No
                </label>
                <input
                  required
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter Your Phone No"
                  className="input input-bordered input-primary w-full text-lg placeholder-gray-400"
                  onChange={handleChange}
                  value={signupData.phoneNumber}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-lg text-gray-300">
                  Password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  className="input input-bordered input-primary w-full text-lg placeholder-gray-400"
                  onChange={handleChange}
                  value={signupData.password}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="text-lg text-gray-300">
                  Detailed Location
                </label>
                <input
                  required
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter Detailed Location"
                  className="input input-bordered input-primary w-full text-lg  placeholder-gray-400"
                  onChange={handleChange}
                  value={signupData.location}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="about" className="text-lg text-gray-300">
                  About
                </label>
                <textarea
                  id="about"
                  required
                  name="about"
                  placeholder="About"
                  rows="4"
                  className="textarea textarea-bordered textarea-primary w-full text-lg  placeholder-gray-400"
                  onChange={handleChange}
                  value={signupData.about}
                />
              </div>
              <div className="flex items-center gap-2 justify-start pl-2">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox-xs checkbox-primary" />
                  </label>
                </div>
                <h3 className="flex items-center whitespace-nowrap text-lg ">
                  I agree to the
                  <span className="text-purple-500">&nbsp;Terms</span>
                  &nbsp;and
                  <span className="text-purple-500">&nbsp;Privacy Policy</span>.
                </h3>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center mt-6">
                <button className="btn btn-active btn-primary btn-block max-w-md lg:max-w-lg xl:max-w-xl text-lg">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SignupPage;
