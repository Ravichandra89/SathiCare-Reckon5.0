import React from 'react';
import HomeLayout from '../Layout/HomeLayout';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-semibold">
            Welcome to <span className="text-yellow-500 font-bold">SathiCare</span>
          </h1>
          <p className="text-xl text-gray-200">
            Bridging Compassion and Action for Injured Animals. We are dedicated to rescuing and providing care for
            animals in need. Join us in making a difference in their lives.
          </p>
          <div className="space-x-6">
            <Link to="/signup">
              <button className="bg-yellow-500 rounded-lg hover:bg-yellow-600 transition ease-in-out duration-300 px-3 py-4">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default HomePage;
