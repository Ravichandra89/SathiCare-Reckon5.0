import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllTicket } from '../Redux/Slices/ticketSlice';
import HomeLayout from '../Layout/HomeLayout';
import Header from '../Components/Header';
import axios from 'axios';

const TicketDescription = () => {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const [isAccepted, setIsAccepted] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const ticketId = searchParam.get('v');

  useEffect(() => {
    dispatch(getAllTicket());
  }, []);

  const ticketList = useSelector((store) => store.ticketSlice.ticketList);
  const data = ticketList.find((ticket) => ticket._id === ticketId);

  useEffect(() => {
    setIsAccepted(data.status.toLowerCase() === 'open');
  }, [data.status]);

  console.log(data);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const address = data?.location || 'C-127,Ex-2nd,Kamla Nehru Nagar,Jodhpur,Rajasthan,India';
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        const response = await axios.get(url);
        const coordinates = response.data[0];
        if (coordinates) {
          setLatitude(coordinates.lat);
          setLongitude(coordinates.lon);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, []);

  const handleLocationClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleAccept = () => {
    // Implement logic for accepting the ticket
  };

  return (
    <HomeLayout>
      <Header />

      <div className="flex flex-col items-center justify-center">
        <div className="min-h-screen max-w-3xl w-full p-4 mt-4">
          <div className="carousel carousel-center space-x-4 bg-gray-200 rounded-lg max-h-[45vh] overflow-hidden">
            {data?.pictures.map((picture, index) => (
              <div key={index} className="carousel-item">
                <img src={picture.secure_url} className="w-full rounded-lg" alt={`animal-picture-${index}`} />
              </div>
            ))}
          </div>
          <div className="mt-4 bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between">
              <div className="text-gray-600 font-bold">Severity: {data?.severity}</div>
              <div className="text-gray-600 font-bold">Status: {data?.status}</div>
            </div>
            <h2 className="text-xl font-bold mt-2">{data?.description}</h2>
            <p className="text-gray-600">{data?.location}</p>
          </div>
          <div className="mt-4 flex justify-center">
            <button onClick={handleLocationClick} className="btn btn-blue mr-4">
              Locate in Google Maps
            </button>
            {isAccepted && (
              <button onClick={handleAccept} className="btn btn-blue mr-4 text-white bg-green-400">
                Accept
              </button>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default TicketDescription;
