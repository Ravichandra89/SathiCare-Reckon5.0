import React from 'react';
import animalImage from '../image/IMG-20240207-WA0009.jpg'; // Import the image directly

const Card = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-6 pt-6">
        <img src={animalImage} alt="Animal" className="rounded-xl" /> {/* Use the imported image */}
      </figure>
      <div className="card-body items-center text-center px-6 py-4">
        <h2 className="card-title">Animal Rescue</h2> {/* Update the title */}
        <p>If a dog chews shoes, whose shoes does he choose?</p> {/* Update the content */}
        {/* Short description */}
        <p className="text-sm mb-1">Rescue animals deserve a loving home.</p> {/* Update the content */}
        {/* Status */}
        <p className="text-sm mb-1">
          Status: <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>Available
        </p>
        {/* Severity */}
        <p className="text-sm mb-2">
          Severity: <span className="text-red-500">High</span>
        </p>
        <div className="card-actions">
          <button className="btn btn-primary">Rescue Now</button> {/* Update the button text */}
        </div>
      </div>
    </div>
  );
};

export default Card;
